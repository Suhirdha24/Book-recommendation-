const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI || "mongodb+srv://suhirdhasivakumar_db_user:SJvAszC8ct9tKdOp@cluster0.fnmm7ku.mongodb.net/?retryWrites=true&w=majority";
const DB_NAME = "ticket-booking-platform";

let db;
let client;

async function connectDB() {
  if (!db) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(DB_NAME);
    console.log(`Connected to MongoDB Atlas database: ${DB_NAME}`);
  }
  return db;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Amazon-Style Book Recommendation API', timestamp: new Date() });
});

// GET /api/metadata - Languages, Genres, Age Groups, Formats
app.get('/api/metadata', async (req, res) => {
  try {
    const database = await connectDB();
    const booksCol = database.collection('books');

    const languages = await booksCol.distinct('language');
    const allGenresNested = await booksCol.distinct('genres');
    const ageGroups = await booksCol.distinct('ageGroup');

    // Clean up genres (flatten and unique)
    const genresSet = new Set();
    allGenresNested.forEach(g => {
      if (Array.isArray(g)) g.forEach(item => genresSet.add(item));
      else if (typeof g === 'string') genresSet.add(g);
    });

    res.json({
      languages: languages.filter(Boolean).sort(),
      genres: Array.from(genresSet).filter(Boolean).sort(),
      ageGroups: ageGroups.filter(Boolean),
      formats: ["Paperback", "Hardcover", "Kindle", "Audiobook"]
    });
  } catch (error) {
    console.error("Error fetching metadata:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/books - Advanced search, filtering & pagination
app.get('/api/books', async (req, res) => {
  try {
    const database = await connectDB();
    const booksCol = database.collection('books');

    const {
      search,
      genre,
      language,
      ageGroup,
      format,
      minRating,
      maxPrice,
      sort,
      page = 1,
      limit = 24
    } = req.query;

    const query = {};

    // Search query
    if (search && search.trim() !== '') {
      const s = search.trim();
      const regex = new RegExp(s, 'i');
      query.$or = [
        { title: regex },
        { author: regex },
        { description: regex },
        { genres: regex },
        { language: regex }
      ];
    }

    // Genre filter
    if (genre && genre !== 'All' && genre !== 'all') {
      query.genres = { $in: [genre] };
    }

    // Language filter
    if (language && language !== 'All' && language !== 'all') {
      query.language = language;
    }

    // Age Group filter
    if (ageGroup && ageGroup !== 'All' && ageGroup !== 'all') {
      query.ageGroup = ageGroup;
    }

    // Format filter
    if (format && format !== 'All' && format !== 'all') {
      query.format = format;
    }

    // Rating filter
    if (minRating) {
      query.averageRating = { $gte: parseFloat(minRating) };
    }

    // Price filter
    if (maxPrice) {
      query.price = { $lte: parseFloat(maxPrice) };
    }

    // Sorting
    let sortOptions = { featured: -1, averageRating: -1, _id: -1 };
    if (sort === 'rating_desc') sortOptions = { averageRating: -1 };
    else if (sort === 'price_asc') sortOptions = { price: 1 };
    else if (sort === 'price_desc') sortOptions = { price: -1 };
    else if (sort === 'year_desc') sortOptions = { publishedYear: -1 };
    else if (sort === 'title_asc') sortOptions = { title: 1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalCount = await booksCol.countDocuments(query);
    const books = await booksCol.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    res.json({
      total: totalCount,
      page: parseInt(page),
      totalPages: Math.ceil(totalCount / parseInt(limit)),
      books
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/books/featured - Bestsellers, Trending & Editor's Picks
app.get('/api/books/featured', async (req, res) => {
  try {
    const database = await connectDB();
    const booksCol = database.collection('books');

    const bestsellers = await booksCol.find({ $or: [{ bestseller: true }, { averageRating: { $gte: 4.8 } }] }).limit(10).toArray();
    const trending = await booksCol.find({ trending: true }).limit(10).toArray();
    const multilingual = await booksCol.find({ language: { $ne: 'English' } }).limit(10).toArray();
    const forKids = await booksCol.find({ ageGroup: { $in: ['Kids', 'Pre-Teens'] } }).limit(10).toArray();

    res.json({
      bestsellers,
      trending,
      multilingual,
      forKids
    });
  } catch (error) {
    console.error("Error fetching featured books:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/recommendations - Smart Collaborative & Content-Based Recommendation Engine
app.get('/api/recommendations', async (req, res) => {
  try {
    const database = await connectDB();
    const booksCol = database.collection('books');

    const {
      currentBookId,
      preferredLanguage,
      preferredGenres,
      ageGroup,
      mood
    } = req.query;

    let targetBook = null;
    if (currentBookId) {
      try {
        targetBook = await booksCol.findOne({ _id: new ObjectId(currentBookId) });
      } catch (e) {
        targetBook = await booksCol.findOne({ isbn: currentBookId });
      }
    }

    const allBooks = await booksCol.find().toArray();

    // Recommendation Scoring Engine
    const scoredBooks = allBooks
      .filter(b => !targetBook || String(b._id) !== String(targetBook._id))
      .map(book => {
        let score = 0;

        // Similarity to current book being viewed
        if (targetBook) {
          // Genre overlap (3 points per matching genre)
          if (targetBook.genres && book.genres) {
            const matches = book.genres.filter(g => targetBook.genres.includes(g)).length;
            score += matches * 3.5;
          }
          // Same author bonus
          if (targetBook.author && book.author && targetBook.author.toLowerCase() === book.author.toLowerCase()) {
            score += 6;
          }
          // Same language bonus
          if (targetBook.language && book.language && targetBook.language === book.language) {
            score += 2;
          }
          // Same age group bonus
          if (targetBook.ageGroup && book.ageGroup && targetBook.ageGroup === book.ageGroup) {
            score += 2.5;
          }
        }

        // User preference matching
        if (preferredLanguage && book.language === preferredLanguage) {
          score += 4;
        }

        if (ageGroup && book.ageGroup === ageGroup) {
          score += 3.5;
        }

        if (preferredGenres) {
          const genList = preferredGenres.split(',').map(s => s.trim().toLowerCase());
          if (book.genres) {
            const matchCount = book.genres.filter(g => genList.includes(g.toLowerCase())).length;
            score += matchCount * 3;
          }
        }

        if (mood && book.moodTags) {
          const moodMatches = book.moodTags.filter(m => m.toLowerCase().includes(mood.toLowerCase())).length;
          score += moodMatches * 3;
        }

        // Quality rating weight
        score += (book.averageRating || 4.0) * 1.5;

        // Bestseller / trending nudge
        if (book.bestseller) score += 2;
        if (book.trending) score += 1.5;

        return { ...book, recommendationScore: Math.round(score * 10) / 10 };
      });

    scoredBooks.sort((a, b) => b.recommendationScore - a.recommendationScore);

    res.json({
      targetBookTitle: targetBook ? targetBook.title : null,
      recommendations: scoredBooks.slice(0, 16)
    });
  } catch (error) {
    console.error("Error generating recommendations:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/books/:id - Book details with reviews and similar recommendations
app.get('/api/books/:id', async (req, res) => {
  try {
    const database = await connectDB();
    const booksCol = database.collection('books');
    const reviewsCol = database.collection('reviews');

    const id = req.params.id;
    let book = null;

    if (ObjectId.isValid(id)) {
      book = await booksCol.findOne({ _id: new ObjectId(id) });
    }
    if (!book) {
      book = await booksCol.findOne({ $or: [{ isbn: id }, { title: id }] });
    }

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Fetch reviews for this book
    const reviews = await reviewsCol.find({
      $or: [
        { book: String(book._id) },
        { book: book._id },
        { bookTitle: book.title }
      ]
    }).sort({ createdAt: -1 }).toArray();

    // Fetch 8 similar books
    const similar = await booksCol.find({
      _id: { $ne: book._id },
      $or: [
        { genres: { $in: book.genres || [] } },
        { language: book.language },
        { ageGroup: book.ageGroup }
      ]
    }).limit(8).toArray();

    res.json({
      book,
      reviews,
      similar
    });
  } catch (error) {
    console.error("Error fetching book details:", error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/reviews - Add review
app.post('/api/reviews', async (req, res) => {
  try {
    const database = await connectDB();
    const reviewsCol = database.collection('reviews');
    const booksCol = database.collection('books');

    const { bookId, bookTitle, userName, rating, title, content } = req.body;

    if (!bookId || !rating || !content) {
      return res.status(400).json({ error: "bookId, rating, and content are required" });
    }

    const newReview = {
      book: bookId,
      bookTitle: bookTitle || "",
      userName: userName || "Verified Amazon Reader",
      rating: Number(rating),
      title: title || "Honest Feedback",
      content,
      likesCount: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await reviewsCol.insertOne(newReview);

    // Update book ratings count and recalculate average
    if (ObjectId.isValid(bookId)) {
      const allBookReviews = await reviewsCol.find({ book: bookId }).toArray();
      const avg = allBookReviews.reduce((sum, r) => sum + r.rating, 0) / allBookReviews.length;
      await booksCol.updateOne(
        { _id: new ObjectId(bookId) },
        {
          $set: {
            averageRating: Math.round(avg * 10) / 10,
            ratingsCount: (allBookReviews.length * 120) + allBookReviews.length
          }
        }
      );
    }

    res.status(201).json({ success: true, review: { ...newReview, _id: result.insertedId } });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`Amazon Book Recommendation Server running on http://localhost:${PORT}`);
  console.log(`===============================================`);
});

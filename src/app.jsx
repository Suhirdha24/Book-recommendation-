import React, { useState, useEffect } from 'react';
import './styles/amazon.css';
import AmazonHeader from './components/AmazonHeader';
import AmazonSubNav from './components/AmazonSubNav';
import HeroBanner from './components/HeroBanner';
import BookCarousel from './components/BookCarousel';
import FilterSidebar from './components/FilterSidebar';
import BookCard from './components/BookCard';
import BookDetailModal from './components/BookDetailModal';
import LookInsideModal from './components/LookInsideModal';
import RecommendationQuiz from './components/RecommendationQuiz';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import AuthModal from './components/AuthModal';
import AllMenuDrawer from './components/AllMenuDrawer';
import AmazonFooter from './components/AmazonFooter';
import { FaGlobeAsia, FaBookOpen, FaChild, FaSortAmountDown } from 'react-icons/fa';

const App = () => {
  // Books state
  const [catalogBooks, setCatalogBooks] = useState([]);
  const [totalCatalogCount, setTotalCatalogCount] = useState(0);
  const [bestsellerBooks, setBestsellerBooks] = useState([]);
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [multilingualBooks, setMultilingualBooks] = useState([]);
  const [kidsBooks, setKidsBooks] = useState([]);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('All');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [minRating, setMinRating] = useState(null);
  const [maxPrice, setMaxPrice] = useState(1200);
  const [sortBy, setSortBy] = useState('featured');

  // Modals and Drawers
  const [selectedBookDetail, setSelectedBookDetail] = useState(null);
  const [lookInsideBook, setLookInsideBook] = useState(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAllMenuOpen, setIsAllMenuOpen] = useState(false);

  // User Profile state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('bookverse_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('bookverse_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('bookverse_user');
      }
    } catch (e) {}
  }, [currentUser]);

  // Cart & Wishlist persistence
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('amz_books_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('amz_books_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('amz_books_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('amz_books_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  // Fetch Featured Shelves once on mount
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('/api/books/featured');
        if (res.ok) {
          const data = await res.json();
          setBestsellerBooks(data.bestsellers || []);
          setTrendingBooks(data.trending || []);
          setMultilingualBooks(data.multilingual || []);
          setKidsBooks(data.forKids || []);
        }
      } catch (e) {
        console.error("Error fetching featured shelves:", e);
      }
    };
    fetchFeatured();
  }, []);

  // Fetch Catalog Books whenever search or filters change
  useEffect(() => {
    const fetchCatalog = async () => {
      setIsLoadingCatalog(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery.trim()) params.append('search', searchQuery.trim());
        if (selectedCategory !== 'All') params.append('genre', selectedCategory);
        else if (selectedGenre !== 'All') {
          if (selectedGenre === 'Trending') params.append('sort', 'rating_desc');
          else if (selectedGenre === 'Bestseller') params.append('sort', 'rating_desc');
          else params.append('genre', selectedGenre);
        }
        if (selectedLanguage !== 'All') params.append('language', selectedLanguage);
        if (selectedAgeGroup !== 'All') params.append('ageGroup', selectedAgeGroup);
        if (selectedFormat !== 'All') params.append('format', selectedFormat);
        if (minRating) params.append('minRating', minRating);
        if (maxPrice < 1200) params.append('maxPrice', maxPrice);
        if (sortBy) params.append('sort', sortBy);
        params.append('limit', '50');

        const res = await fetch(`/api/books?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setCatalogBooks(data.books || []);
          setTotalCatalogCount(data.total || 0);
        }
      } catch (e) {
        console.error("Error fetching catalog books:", e);
      } finally {
        setIsLoadingCatalog(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchCatalog();
    }, 200);

    return () => clearTimeout(delayDebounce);
  }, [
    searchQuery,
    selectedCategory,
    selectedLanguage,
    selectedAgeGroup,
    selectedGenre,
    selectedFormat,
    minRating,
    maxPrice,
    sortBy
  ]);

  // Cart operations
  const handleAddToCart = (book, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => String(item._id) === String(book._id));
      if (existing) {
        return prev.map((item) =>
          String(item._id) === String(book._id)
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [
        ...prev,
        {
          _id: book._id,
          title: book.title,
          author: book.author,
          price: book.price,
          format: book.format || 'Paperback',
          coverImage: book.coverImage,
          quantity: qty
        }
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (bookId, newQty) => {
    setCart((prev) =>
      prev.map((item) =>
        String(item._id) === String(bookId) ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveFromCart = (bookId) => {
    setCart((prev) => prev.filter((item) => String(item._id) !== String(bookId)));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const wishlistIds = new Set(wishlist.map((b) => String(b._id)));

  const handleToggleWishlist = (book) => {
    const isPresent = wishlistIds.has(String(book._id));
    if (isPresent) {
      setWishlist((prev) => prev.filter((b) => String(b._id) !== String(book._id)));
    } else {
      setWishlist((prev) => [...prev, book]);
      setIsWishlistOpen(true);
    }
  };

  const handleRemoveFromWishlist = (bookId) => {
    setWishlist((prev) => prev.filter((b) => String(b._id) !== String(bookId)));
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLanguage('All');
    setSelectedAgeGroup('All');
    setSelectedGenre('All');
    setSelectedFormat('All');
    setMinRating(null);
    setMaxPrice(1200);
    setSortBy('featured');
  };

  const handleShowAllBooks = () => {
    handleResetFilters();
    setTimeout(() => {
      const el = document.getElementById('all-books-catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="amazon-app">
      {/* 1. Amazon Top Navigation Header */}
      <AmazonHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onResetToHome={handleResetFilters}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* 2. Sub-Navigation Bar (Age Groups, Languages, AI Matcher, All Books) */}
      <AmazonSubNav
        selectedAgeGroup={selectedAgeGroup}
        setSelectedAgeGroup={setSelectedAgeGroup}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onToggleAllMenu={() => setIsAllMenuOpen(true)}
        onShowAllBooks={handleShowAllBooks}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* 3. Hero Banner Carousel */}
      <HeroBanner
        onOpenQuiz={() => setIsQuizOpen(true)}
        onFilterLanguage={(lang) => setSelectedLanguage(lang)}
        onFilterAgeGroup={(age) => setSelectedAgeGroup(age)}
      />

      {/* 4. Quick Explore Chips Bar */}
      <div className="quick-bar-wrapper">
        <div className="quick-bar-card">
          {/* Language Row */}
          <div className="chip-row">
            <span className="chip-row-label">
              <FaGlobeAsia style={{ marginRight: 6 }} /> Language:
            </span>
            {['All', 'Tamil', 'Hindi', 'English', 'Spanish', 'French', 'German', 'Japanese'].map((lang) => (
              <button
                key={lang}
                className={`chip-btn ${selectedLanguage === lang ? 'active' : ''}`}
                onClick={() => setSelectedLanguage(lang)}
              >
                {lang === 'All' ? '🌐 All Languages' : lang}
              </button>
            ))}
          </div>

          {/* Age Group Row */}
          <div className="chip-row">
            <span className="chip-row-label">
              <FaChild style={{ marginRight: 6 }} /> Age Group:
            </span>
            {[
              { id: 'All', label: 'All Ages' },
              { id: 'Kids', label: '🧒 Kids (0-8 yrs)' },
              { id: 'Pre-Teens', label: '🎒 Pre-Teens (9-12 yrs)' },
              { id: 'Young Adult', label: '⚡ Young Adult (13-18 yrs)' },
              { id: 'Adults', label: '☕ Adults (18+ yrs)' },
              { id: 'All Ages', label: '🌿 Family & Seniors' }
            ].map((age) => (
              <button
                key={age.id}
                className={`chip-btn ${selectedAgeGroup === age.id ? 'active' : ''}`}
                onClick={() => setSelectedAgeGroup(age.id)}
              >
                {age.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Featured Shelves (Shown when not heavily filtered) */}
      {!searchQuery && selectedLanguage === 'All' && selectedAgeGroup === 'All' && selectedGenre === 'All' && (
        <>
          {/* Bestsellers Shelf */}
          <BookCarousel
            title="🏆 BookVerse Bestsellers &amp; Top Rated"
            subtitle="The most gifted, loved, and widely read books worldwide"
            books={bestsellerBooks}
            onSelectBook={(b) => setSelectedBookDetail(b)}
            onOpenLookInside={(b) => setLookInsideBook(b)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onSeeAll={() => setSelectedGenre('Bestseller')}
          />

          {/* Multilingual Masterpieces Shelf */}
          <BookCarousel
            title="🌐 World Literature in Every Language"
            subtitle="Explore acclaimed gems in Tamil, Hindi, Spanish, French, Japanese, and German"
            books={multilingualBooks}
            onSelectBook={(b) => setSelectedBookDetail(b)}
            onOpenLookInside={(b) => setLookInsideBook(b)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onSeeAll={() => setSelectedLanguage('Tamil')}
          />

          {/* Kids & Young Readers Shelf */}
          <BookCarousel
            title="🧒 Children & Young Readers Collection"
            subtitle="Bedtime classics, animal fables, magic, and moral wonder for young minds"
            books={kidsBooks}
            onSelectBook={(b) => setSelectedBookDetail(b)}
            onOpenLookInside={(b) => setLookInsideBook(b)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onSeeAll={() => setSelectedAgeGroup('Kids')}
          />
        </>
      )}

      {/* 6. Main Catalog Section (Amazon Left Sidebar Filters + Results Grid) */}
      <div className="catalog-wrapper" id="all-books-catalog">
        {/* Left Faceted Filters */}
        <FilterSidebar
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          selectedAgeGroup={selectedAgeGroup}
          setSelectedAgeGroup={setSelectedAgeGroup}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          selectedFormat={selectedFormat}
          setSelectedFormat={setSelectedFormat}
          minRating={minRating}
          setMinRating={setMinRating}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          onResetFilters={handleResetFilters}
        />

        {/* Right Catalog Main Content */}
        <main className="catalog-main">
          {/* Top Results & Sort Bar */}
          <div className="catalog-top-bar">
            <div className="catalog-results-info">
              Showing <strong>{catalogBooks.length}</strong> of <strong>{totalCatalogCount}</strong> results
              {selectedLanguage !== 'All' && <span> in <strong>{selectedLanguage}</strong></span>}
              {selectedAgeGroup !== 'All' && <span> for <strong>{selectedAgeGroup}</strong></span>}
              {searchQuery && <span> for "<strong>{searchQuery}</strong>"</span>}
            </div>

            <div className="catalog-sort-box">
              <FaSortAmountDown style={{ color: '#666' }} />
              <span>Sort by:</span>
              <select
                className="catalog-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="rating_desc">Avg. Customer Review</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="year_desc">Publication Date (Newest)</option>
              </select>
            </div>
          </div>

          {/* Book Cards Grid */}
          {isLoadingCatalog ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', background: '#fff', borderRadius: 8 }}>
              <h3 style={{ fontSize: 18, color: '#666' }}>Fetching books from MongoDB Atlas...</h3>
            </div>
          ) : catalogBooks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: 8 }}>
              <FaBookOpen style={{ fontSize: 48, color: '#ccc', marginBottom: 16 }} />
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: '#111' }}>
                No books matched your selected filters
              </h3>
              <p style={{ color: '#666', marginBottom: 20, fontSize: 14 }}>
                Try adjusting your language, age group, or price filters to discover more titles.
              </p>
              <button className="hero-btn-primary" onClick={handleResetFilters}>
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="catalog-books-grid">
              {catalogBooks.map((book) => (
                <BookCard
                  key={book._id || book.isbn || book.title}
                  book={book}
                  onSelectBook={(b) => setSelectedBookDetail(b)}
                  onOpenLookInside={(b) => setLookInsideBook(b)}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  isWishlisted={wishlistIds.has(String(book._id))}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* 7. Modals & Drawers */}
      {/* Book Detail Modal */}
      {selectedBookDetail && (
        <BookDetailModal
          book={selectedBookDetail}
          onClose={() => setSelectedBookDetail(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlistIds.has(String(selectedBookDetail._id))}
          onOpenLookInside={(b) => setLookInsideBook(b)}
          onSelectBook={(b) => setSelectedBookDetail(b)}
        />
      )}

      {/* Look Inside Modal */}
      {lookInsideBook && (
        <LookInsideModal
          book={lookInsideBook}
          onClose={() => setLookInsideBook(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* 30-Second AI Recommendation Quiz */}
      {isQuizOpen && (
        <RecommendationQuiz
          onClose={() => setIsQuizOpen(false)}
          onSelectBook={(b) => setSelectedBookDetail(b)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Wishlist / Reading Shelf Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistBooks={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={handleAddToCart}
        onSelectBook={(b) => setSelectedBookDetail(b)}
      />

      {/* All Categories & Navigation Menu Drawer */}
      <AllMenuDrawer
        isOpen={isAllMenuOpen}
        onClose={() => setIsAllMenuOpen(false)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onSelectGenre={(g) => {
          setSelectedGenre(g);
          document.getElementById('all-books-catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectLanguage={(l) => {
          setSelectedLanguage(l);
          document.getElementById('all-books-catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectAgeGroup={(a) => {
          setSelectedAgeGroup(a);
          document.getElementById('all-books-catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onShowAllCatalog={handleShowAllBooks}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* User Sign In, Registration & Reading Profile Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLogin={(user) => setCurrentUser(user)}
        onLogout={() => setCurrentUser(null)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* 8. Amazon Footer */}
      <AmazonFooter
        onScrollToTop={handleScrollToTop}
        onSelectLanguage={(lang) => {
          setSelectedLanguage(lang);
          handleScrollToTop();
        }}
      />
    </div>
  );
};

export default App;

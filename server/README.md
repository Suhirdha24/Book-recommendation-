# ⚡ BookVerse Backend API & MongoDB Atlas Documentation

This directory contains the REST API server and database scripts powering **BookVerse**, an Amazon-inspired multilingual book recommendation and e-commerce platform.

---

## 🛠️ Tech Stack & Architecture

* **Runtime**: [Node.js](https://nodejs.org/) (v18+)
* **Framework**: [Express.js](https://expressjs.com/)
* **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) (Cloud Cluster: `ticket-booking-platform`)
* **Driver**: Official `mongodb` Node.js Driver (`^6.12.0`)
* **Utilities**: `cors`, `dotenv`, custom Node.js DNS resolver (`dns.setServers(['8.8.8.8', '1.1.1.1'])` to guarantee cross-platform SRV record resolution).

---

## 🗄️ Database Collections & Schema Models

### 1. `books` Collection
Contains the catalog of 41 curated multilingual books across 7 languages and all age groups.

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | `ObjectId` | Unique document identifier |
| `title` | `String` | Book title (includes native scripts, e.g., *Ponniyin Selvan (பொன்னியின் செல்வன்)*) |
| `author` | `String` | Book author |
| `description` | `String` | Synopsis and story background |
| `coverImage` | `String` | High-resolution cover artwork URL |
| `isbn` | `String` | 13-digit ISBN |
| `genres` | `[String]` | Array of genre tags (e.g., `["Historical Fiction", "Classics"]`) |
| `publishedYear` | `Number` | Year first published |
| `publisher` | `String` | Publishing house |
| `pageCount` | `Number` | Total pages |
| `language` | `String` | Book language (`Tamil`, `Hindi`, `English`, `Spanish`, `French`, `German`, `Japanese`) |
| `ageGroup` | `String` | Reader demographic (`Kids`, `Pre-Teens`, `Young Adult`, `Adults`, `All Ages`) |
| `averageRating` | `Number` | Average star rating (1.0 – 5.0) |
| `ratingsCount` | `Number` | Total verified ratings |
| `price` | `Number` | Current discounted price in ₹ (INR) |
| `originalPrice` | `Number` | M.R.P. list price |
| `format` | `String` | Primary binding (`Paperback`, `Hardcover`, `Kindle`, `Audiobook`) |
| `inStock` | `Boolean` | Availability status |
| `bestseller` | `Boolean` | Bestseller banner flag |
| `trending` | `Boolean` | Trending shelf flag |
| `badge` | `String` | Product badge (e.g. `"#1 Best Seller"`, `"Editor's Choice"`) |
| `moodTags` | `[String]` | Mood indicators (e.g. `["Epic", "Adventurous", "Philosophical"]`) |
| `readingPace` | `String` | Reading tempo (`Fast-paced`, `Engrossing`, `Reflective`) |
| `quotes` | `[String]` | Notable quotes |
| `previewExcerpt` | `String` | Authentic first-chapter text for the "Look Inside" Kindle reader |

### 2. `orders` Collection
Records user purchases and live delivery stages.

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | `ObjectId` | Unique order identifier |
| `orderId` | `String` | Formatted order reference (e.g., `#BV-928174`) |
| `customer` | `Object` | Customer information (`name`, `email`, `phone`, `address`, `city`, `pincode`) |
| `items` | `[Object]` | Ordered line items (`bookId`, `title`, `author`, `price`, `quantity`, `format`, `coverImage`) |
| `subtotal` | `Number` | Items subtotal |
| `shippingFee` | `Number` | Delivery charge (`0` for Prime / orders above ₹499) |
| `total` | `Number` | Final charged amount |
| `paymentMethod` | `String` | Selected method (`Amazon Pay UPI`, `Credit/Debit Card`, `Cash on Delivery`) |
| `deliveryDate` | `String` | Target delivery window (e.g., `Tomorrow by 11:00 AM`) |
| `status` | `String` | Current delivery status (`Ordered`, `Shipped`, `Out for Delivery`, `Delivered`) |
| `createdAt` | `Date` | Timestamp of placement |

### 3. `users` Collection
Stores reader profiles, language/age preferences, and annual reading goals.

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | `ObjectId` | User ID |
| `name` | `String` | User full name |
| `email` | `String` | Unique email address |
| `preferredLanguage` | `String` | Default browsing language |
| `preferredAgeGroup` | `String` | Default age demographic |
| `readingGoal` | `Number` | Annual reading target (e.g., `12`) |
| `booksRead` | `Number` | Books completed this year |
| `joinedDate` | `String` | Member registration date |

### 4. `reviews` Collection
Stores customer book ratings, headlines, and reviews with automatic recalculation of book averages.

---

## 📡 REST API Reference

### Health & Metadata
* **`GET /api/health`**
  * Returns `{ status: 'ok', service: 'BookVerse Recommendation API', timestamp: '...' }`
* **`GET /api/metadata`**
  * Returns dynamic lists of languages, genres, age groups, and book formats.

### Books & Recommendations
* **`GET /api/books`**
  * Query parameters:
    * `search`: Text query matching title, author, description, genres, or language
    * `language`: Filter by language (e.g. `Tamil`, `Hindi`, `English`, `Japanese`)
    * `ageGroup`: Filter by demographic (`Kids`, `Pre-Teens`, `Young Adult`, `Adults`, `All Ages`)
    * `genre`: Filter by genre category
    * `format`: `Paperback` | `Hardcover` | `Kindle` | `Audiobook`
    * `minRating`: Minimum star rating (e.g. `4`)
    * `maxPrice`: Maximum price threshold
    * `sort`: `rating_desc` | `price_asc` | `price_desc` | `year_desc` | `title_asc`
    * `page`: Page index (default: `1`)
    * `limit`: Items per page (default: `24`)

* **`GET /api/books/:id`**
  * Returns detailed book profile, all customer reviews, and 8 similar recommendations.

* **`GET /api/books/featured`**
  * Returns 4 curated shelves: `bestsellers`, `trending`, `multilingual`, and `forKids`.

* **`GET /api/recommendations`**
  * Powered by a weighted hybrid recommendation algorithm evaluating:
    * Genre overlap (+3.5 pts/genre)
    * Same author (+6.0 pts)
    * Language match (+4.0 pts)
    * Age group match (+3.5 pts)
    * Mood tags match (+3.0 pts)
    * Star rating weight (+1.5x rating)

### Orders & Tracking
* **`GET /api/orders`**
  * Returns recent orders sorted descending by placement time. Supports optional `?email=user@example.com` filter.
* **`POST /api/orders`**
  * Accepts order payload with customer details, items, payment method, and pricing. Inserts into MongoDB Atlas.

### Authentication & Profiles
* **`POST /api/auth/login`**
  * Accepts `{ email }`. If the user does not exist yet, auto-provisions a friendly reader profile so the user never gets stuck.
* **`POST /api/auth/register`**
  * Accepts `{ name, email, preferredLanguage, preferredAgeGroup, readingGoal }`.

### Customer Reviews
* **`POST /api/reviews`**
  * Accepts `{ bookId, bookTitle, userName, rating, title, content }`.
  * Inserts the review and automatically recalculates the book's `averageRating` and `ratingsCount`.

---

## 🚀 Running & Verification Scripts

### Start the Server
```bash
node server.js
```
The server will start on port `5000` and connect to the MongoDB Atlas cluster.

### Seed Database
```bash
node seed_data.js
```
Seeds 41 curated books with multilingual titles, age groups, and descriptions into MongoDB Atlas.

### Inspect Database & Collections
```bash
node inspect_db.js
```
Displays count of books, orders, users, and reviews in the connected database.

```bash
node inspect_books.js
```
Lists sample books with title, language, and age group breakdown.

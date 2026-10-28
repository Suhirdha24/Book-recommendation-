# 📚 BookVerse — End-to-End Multilingual Book Recommendation & E-Commerce Platform

[![React](https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite%20-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/atlas)
[![Theme](https://img.shields.io/badge/Theme-Modern%20Midnight%20Sapphire-38bdf8?style=for-the-badge)](https://github.com/Suhirdha24/Book-recommendation-)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

**BookVerse** is a modern, Amazon-inspired book recommendation and e-commerce platform built for readers across **all generations** and **world languages**. Powered by a live cloud-hosted **MongoDB Atlas** cluster (`ticket-booking-platform`) and a robust **Node.js / Express** REST API, BookVerse combines sub-second Vite frontend performance with a custom **Modern Midnight Sapphire** design system.

---

## 🏗️ Architecture Overview

```mermaid
graph TD
    Client["💻 BookVerse Web App (React 18 + Vite)"]
    API["⚡ Backend REST API (Express.js on Port 5000)"]
    DB[("🍃 MongoDB Atlas Cloud Cluster (ticket-booking-platform)")]

    Client -->|"GET /api/books (Search, Filter, Sort)"| API
    Client -->|"GET /api/recommendations (AI Matcher)"| API
    Client -->|"GET /api/books/:id (Product & Reviews)"| API
    Client -->|"POST /api/orders & GET /api/orders (Track Packages)"| API
    Client -->|"POST /api/auth/login & register (Profiles)"| API
    Client -->|"POST /api/reviews (Verified Ratings)"| API

    API -->|"books Collection (41 Multilingual Titles)"| DB
    API -->|"orders Collection (Real-Time Purchases)"| DB
    API -->|"users Collection (Reading Goals & Prefs)"| DB
    API -->|"reviews Collection (Customer Feedback)"| DB
```

---

## 🌟 Key Highlights & Feature Suite

### 1. 🌌 Modern Midnight Sapphire Design System
* **Deep Obsidian & Slate Foundation** (`#090d16` & `#0f172a`): Elegant dark mode engineered for reading comfort and high visual contrast.
* **Luminous Sky Sapphire Accents** (`#38bdf8` & `#3b82f6`): Modern tech aesthetic with vibrant visual hierarchy.
* **Fluid Micro-Animations**: Smooth sliding drawers (`slideLeft`, `slideRight`), modal elevation, glowing badges, and responsive cards.

### 2. 🌐 World Literature in Every Language
Discover, read, and filter literary masterpieces in their original languages with native font rendering:
* **Tamil (தமிழ்)**: *Ponniyin Selvan*, *Thirukkural*, *Sivagamiyin Sabatham*
* **Hindi (हिन्दी)**: *Godaan*, *Gunahon Ka Devta*, *Madhushala*
* **English**: *The Way of Kings*, *Atomic Habits*, *Project Hail Mary*
* **Spanish (Español)**: *Cien Años de Soledad (One Hundred Years of Solitude)*
* **French (Français)**: *Le Petit Prince (The Little Prince)*
* **German (Deutsch)**: *Die Verwandlung (The Metamorphosis)*
* **Japanese (日本語)**: *ノルウェイの森 (Norwegian Wood)*

### 3. 🧒 Tailored for Every Age Group
Single-emoji smart pills and faceted filters to instantly discover age-appropriate titles:
* 🧒 **Kids (0–8 yrs)**: Bedtime picture books, Panchatantra fables, and animal adventures.
* 🎒 **Pre-Teens (9–12 yrs)**: Percy Jackson, Harry Potter, and middle-grade mysteries.
* ⚡ **Young Adult (13–18 yrs)**: Fantasy epics, coming-of-age journeys, and dystopian sci-fi.
* ☕ **Adults (18+ yrs)**: Literary fiction, philosophy, high fantasy, and self-mastery.
* 🌿 **All Ages / Family**: Wisdom classics and timeless family folklore.

### 4. ⚡ 30-Second AI Book Matcher Quiz
* An interactive recommendation engine pairing readers with their ideal next read based on:
  * Target age group
  * Preferred reading mood (Epic, Cozy, Inspiring, Dark & Mysterious)
  * Preferred language and book format

### 5. 📖 Kindle-Style "Look Inside" Preview Reader
* Click **"Look Inside"** on any book card to preview authentic first chapters and excerpts.
* Features adjustable typography, reading font toggle, and page navigation controls.

### 6. 🔍 Amazon Faceted Filter Sidebar & Live Search
* **Multilingual Text Search**: Instant search by title, author, description, or genre.
* **Dynamic Category Dropdown**: Filter by Fiction, Sci-Fi, Fantasy, Classics, Philosophy, Self-Help.
* **Faceted Sidebar**: Real-time filtering by star ratings (4★ & up), price range sliders, formats (Paperback, Hardcover, Kindle, Audiobook), and languages.

### 7. 🛒 Cart & Multi-Step Amazon-Style Checkout
* **Sliding Cart Drawer**: Instant item adjustments, quantity stepper, and real-time subtotal calculation.
* **Prime Fast Delivery**: Guaranteed *Tomorrow by 11:00 AM* delivery badge with free shipping thresholds.
* **3-Step Checkout Flow**:
  1. Shipping Address & House No. validation
  2. Payment Method selection (Amazon Pay UPI, Cards, COD)
  3. Order Summary & Price Breakdown
* **Order Confirmation Page**: Detailed receipt with Order ID (`#BV-XXXXXX`), estimated delivery, and direct package tracking options (no abrupt auto-redirects).

### 8. 📦 Live "Returns & Orders" Package Tracker
* View past and active orders across the platform.
* **4-Stage Visual Delivery Stepper**: `Ordered` ➔ `Shipped` ➔ `Out for Delivery` ➔ `Delivered`.
* **1-Click "Buy It Again"**: Re-order favorite books directly from order history.
* Synced in real-time with **MongoDB Atlas**.

### 9. 👤 User Profile & Reading Goals Dashboard
* **Reading Progress**: Track books read toward your yearly target (e.g., *6 of 15 books read*).
* **Language & Age Preferences**: Set your profile preferences to personalize home feed shelves.
* **1-Click Demo Login & Email Authentication**: Instant access without getting stuck on sign-in screens.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend UI** | React 18, Vite 8, React Icons (`react-icons/fa`) |
| **Styling & Design System** | Modern Vanilla CSS (`src/styles/amazon.css`), CSS Custom Properties, Glassmorphism |
| **Backend API** | Node.js, Express.js, CORS, Dotenv, Node DNS resolver |
| **Database** | MongoDB Atlas (Cloud Cluster: `ticket-booking-platform`) |
| **Collections** | `books` (Catalog), `orders` (Purchases), `users` (Profiles), `reviews` (Ratings) |
| **State Management** | React Hooks (`useState`, `useEffect`), LocalStorage persistence, REST API sync |

---

## 🔌 API Endpoints Reference

Base URL: `http://localhost:5000`

### 1. Books & Recommendations
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/books` | Advanced book search with query, language, ageGroup, format, minRating, maxPrice, sort, and pagination |
| `GET` | `/api/books/:id` | Detailed book information, user reviews, and similar recommendations |
| `GET` | `/api/books/featured` | Curated shelves: Bestsellers, Trending, Multilingual, and Kids |
| `GET` | `/api/metadata` | Dynamic list of available languages, genres, age groups, and book formats |
| `GET` | `/api/recommendations` | Smart recommendation engine based on current book similarity, language, and mood |
| `POST` | `/api/reviews` | Submit user book reviews and calculate real-time star averages |

### 2. Authentication & Profiles
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | User login (auto-provisions demo account if not found) |
| `POST` | `/api/auth/register` | Register new user with reading goals, language, and age group preferences |

### 3. Orders & Tracking
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/orders` | Retrieve past orders with delivery tracking and line items (optional `?email=...` filter) |
| `POST` | `/api/orders` | Record newly placed order with shipping address, delivery date, and payment status |

### 4. System Health
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | System status, API service name, and timestamp |

---

## 🚀 Quickstart Guide

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.x or later)
* [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/Suhirdha24/Book-recommendation-.git
cd Book-recommendation-
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Seed the Database (Optional / Already Cloud Seeded)
The cloud MongoDB Atlas cluster comes pre-seeded with 41 multilingual books across 7 languages and all age groups. To re-seed or verify:
```bash
cd server
node seed_data.js
cd ..
```

### 4. Run the Application

In two separate terminal windows:

**Terminal 1 — Backend API:**
```bash
cd server
node server.js
# Backend runs on http://localhost:5000
```

**Terminal 2 — Frontend App:**
```bash
npx vite --port 3000
# Frontend runs on http://localhost:3000
```

Open your browser and navigate to **`http://localhost:3000`**.

---

## 🌐 Deploy to Render

You can deploy BookVerse to [Render](https://render.com/) in two ways:

### Option 1: Full-Stack Web Service (Recommended)
Deploys both the Express backend API and serves the production React build from a single URL:
* **Service Type**: **Web Service**
* **Environment**: `Node`
* **Build Command**: `npm install && npm run build && cd server && npm install`
* **Start Command**: `node server/server.js`
* **Environment Variables**:
  * `PORT`: `5000`
  * `MONGODB_URI`: `mongodb+srv://suhirdhasivakumar_db_user:SJvAszC8ct9tKdOp@cluster0.fnmm7ku.mongodb.net/?retryWrites=true&w=majority`

*(A preconfigured `render.yaml` blueprint is included in the root directory for 1-click deployment).*

### Option 2: Static Site (Frontend Only)
* **Service Type**: **Static Site**
* **Build Command**: `npm install && npm run build` *(or simply `npm run build` — `prebuild` hook will auto-install dependencies)*
* **Publish Directory**: `dist`

---

## 📂 Project Directory Structure

```
Book-recommendation-/
├── server/
│   ├── server.js               # Express API, MongoDB Atlas models & routes
│   ├── seed_data.js            # Database seeder for 41 multilingual books
│   ├── inspect_db.js           # Database collections inspector script
│   ├── inspect_books.js        # Catalog inspector script
│   ├── package.json            # Backend dependencies
│   └── README.md               # Dedicated Backend API documentation
├── src/
│   ├── components/
│   │   ├── AmazonHeader.jsx    # Sticky navigation, search bar, language & orders
│   │   ├── AmazonSubNav.jsx    # Clean single-emoji age pills & quick languages
│   │   ├── AllMenuDrawer.jsx   # Amazon-style left navigation drawer
│   │   ├── HeroBanner.jsx      # Promotional age-tailored hero carousel
│   │   ├── BookCard.jsx        # Amazon book item card with Prime & star ratings
│   │   ├── BookCarousel.jsx    # Horizontal bestseller and multilingual shelves
│   │   ├── FilterSidebar.jsx   # Left faceted sidebar (price, formats, ratings)
│   │   ├── BookDetailModal.jsx # Full product page modal with reviews
│   │   ├── LookInsideModal.jsx # Kindle-style chapter preview reader
│   │   ├── RecommendationQuiz.jsx # 30-Second AI recommendation engine
│   │   ├── CartDrawer.jsx      # Multi-step checkout & order confirmation
│   │   ├── OrdersModal.jsx     # Returns & live package tracking stepper
│   │   ├── AuthModal.jsx       # User profile, reading goal & login
│   │   ├── WishlistDrawer.jsx  # Saved books drawer
│   │   └── AmazonFooter.jsx    # Amazon footer with language switcher
│   ├── styles/
│   │   └── amazon.css          # Modern Midnight Sapphire master design system
│   ├── app.jsx                 # Master application controller & state store
│   └── index.jsx               # React DOM root entrypoint
├── public/                     # Static assets and favicons
├── render.yaml                 # Render cloud deployment blueprint
├── package.json                # Project dependencies and build scripts
├── vite.config.mjs             # Vite configuration (ESM native)
└── README.md                   # Main project documentation
```

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to open an issue or submit a pull request on the [GitHub Repository](https://github.com/Suhirdha24/Book-recommendation-).

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

---
*Crafted with ❤️ for book lovers across every generation and language by [Suhirdha24](https://github.com/Suhirdha24).*

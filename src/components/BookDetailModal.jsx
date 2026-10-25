import React, { useState, useEffect } from 'react';
import {
  FaTimes,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingCart,
  FaBolt,
  FaHeart,
  FaRegHeart,
  FaBookOpen,
  FaShieldAlt,
  FaTruck,
  FaUndo,
  FaCheckCircle
} from 'react-icons/fa';

const BookDetailModal = ({
  book,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onOpenLookInside,
  onSelectBook
}) => {
  if (!book) return null;

  const [selectedFormat, setSelectedFormat] = useState(book.format || 'Paperback');
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  // Review submission form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoadingReviews(true);
      try {
        const res = await fetch(`/api/books/${book._id || book.isbn}`);
        if (res.ok) {
          const data = await res.json();
          if (data.reviews) setReviews(data.reviews);
          if (data.similar) setSimilarBooks(data.similar);
        }
      } catch (e) {
        console.error("Error fetching book details & reviews:", e);
      } finally {
        setIsLoadingReviews(false);
      }
    };
    fetchDetails();
  }, [book]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewContent.trim()) return;

    setIsSubmittingReview(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId: String(book._id),
          bookTitle: book.title,
          userName: reviewName.trim() || 'Verified Reader',
          rating: Number(reviewRating),
          title: reviewTitle.trim() || 'Honest Review',
          content: reviewContent.trim()
        })
      });

      if (res.ok) {
        const data = await res.json();
        setReviews([data.review, ...reviews]);
        setShowReviewForm(false);
        setReviewContent('');
        setReviewTitle('');
        setReviewSuccessMsg('Your review has been submitted and saved to the database! Thank you.');
        setTimeout(() => setReviewSuccessMsg(''), 5000);
      }
    } catch (e) {
      console.error("Error posting review:", e);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.4;
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) stars.push(<FaStar key={i} />);
      else if (i === fullStars + 1 && hasHalfStar) stars.push(<FaStarHalfAlt key={i} />);
      else stars.push(<FaRegStar key={i} />);
    }
    return stars;
  };

  const formatOptions = [
    { name: 'Paperback', price: book.price },
    { name: 'Hardcover', price: Math.round(book.price * 1.45) },
    { name: 'Kindle Edition', price: Math.round(book.price * 0.6) },
    { name: 'Audiobook', price: Math.round(book.price * 0.8) }
  ];

  const currentPrice = formatOptions.find(f => f.name === selectedFormat)?.price || book.price;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="book-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>

        {/* Modal 3-Column Grid */}
        <div className="modal-grid">
          {/* Col 1: Book Cover Image & Look Inside */}
          <div className="modal-cover-col">
            <img
              src={book.coverImage || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80'}
              alt={book.title}
              className="modal-cover-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80';
              }}
            />
            <button
              className="btn-look-inside-large"
              onClick={() => onOpenLookInside(book)}
            >
              <FaBookOpen />
              <span>Look Inside™ Excerpt</span>
            </button>
          </div>

          {/* Col 2: Book Details, Overview, Formats */}
          <div className="modal-info-col">
            <h1 className="modal-book-title">{book.title}</h1>
            <div className="modal-book-author">
              by <span style={{ color: '#007185', fontWeight: 700 }}>{book.author}</span> (Author)
            </div>

            {/* Tags */}
            <div className="book-tags-row" style={{ marginBottom: 12 }}>
              <span className="tag-badge lang">{book.language}</span>
              <span className="tag-badge age">{book.ageGroup}</span>
              {book.genres?.map(g => (
                <span key={g} className="tag-badge">{g}</span>
              ))}
            </div>

            {/* Ratings */}
            <div className="rating-row" style={{ marginBottom: 16 }}>
              <div className="stars-wrap">{renderStars(book.averageRating || 4.5)}</div>
              <span className="rating-num">{book.averageRating} out of 5</span>
              <span className="ratings-count">({(book.ratingsCount || 150).toLocaleString()} global ratings)</span>
            </div>

            {/* Formats Selection */}
            <div className="format-picker-box">
              {formatOptions.map(fmt => (
                <div
                  key={fmt.name}
                  className={`format-card ${selectedFormat === fmt.name ? 'active' : ''}`}
                  onClick={() => setSelectedFormat(fmt.name)}
                >
                  <div className="format-name">{fmt.name}</div>
                  <div className="format-price">₹{fmt.price}</div>
                </div>
              ))}
            </div>

            {/* Book Description / Synopsis */}
            <div className="modal-synopsis">
              <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>About the Book</h4>
              <p>{book.description}</p>
            </div>

            {/* Metadata Table */}
            <table className="meta-details-table">
              <tbody>
                <tr>
                  <td>Language</td>
                  <td>{book.language}</td>
                </tr>
                <tr>
                  <td>Age Group</td>
                  <td>{book.ageGroup}</td>
                </tr>
                <tr>
                  <td>Publisher</td>
                  <td>{book.publisher || 'Amazon Publishing Group'}</td>
                </tr>
                <tr>
                  <td>Publication Year</td>
                  <td>{book.publishedYear || 2021}</td>
                </tr>
                <tr>
                  <td>Page Count</td>
                  <td>{book.pageCount} pages</td>
                </tr>
                <tr>
                  <td>ISBN-13</td>
                  <td>{book.isbn || '978-0123456789'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Col 3: Amazon Buy Box */}
          <div className="modal-buy-box">
            <div className="buy-box-price">
              <span style={{ fontSize: 16, verticalAlign: 'super' }}>₹</span>
              {currentPrice}
            </div>

            <div className="stock-status">
              <FaCheckCircle style={{ marginRight: 6, fontSize: 14 }} /> In Stock
            </div>

            <div className="delivery-estimate">
              FREE delivery <strong>Tomorrow by 11 AM</strong>. Order within 4 hrs.
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
              <span>Quantity:</span>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #ccc' }}
              >
                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            <button
              className="btn-add-cart"
              style={{ padding: 10 }}
              onClick={() => {
                onAddToCart({ ...book, price: currentPrice, format: selectedFormat }, quantity);
              }}
            >
              <FaShoppingCart /> Add to Cart
            </button>

            <button
              className="btn-buy-now"
              onClick={() => {
                onAddToCart({ ...book, price: currentPrice, format: selectedFormat }, quantity);
                alert(`Order confirmed for ${quantity}x "${book.title}" (${selectedFormat})! Thank you for ordering on Amazon Books.`);
                onClose();
              }}
            >
              <FaBolt style={{ marginRight: 6 }} /> Buy Now (1-Click)
            </button>

            <button
              className={`btn-wishlist ${isWishlisted ? 'active' : ''}`}
              onClick={() => onToggleWishlist(book)}
              style={{ marginTop: 4 }}
            >
              {isWishlisted ? <FaHeart /> : <FaRegHeart />}
              <span>{isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}</span>
            </button>

            <div style={{ borderTop: '1px solid #eee', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12, color: '#666' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <FaShieldAlt style={{ color: '#007185' }} /> Secure transaction
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <FaTruck style={{ color: '#007185' }} /> Ships from Amazon Books Fulfillment
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <FaUndo style={{ color: '#007185' }} /> 7 Days Replacement Policy
              </div>
            </div>
          </div>
        </div>

        {/* Similar Books Row */}
        {similarBooks.length > 0 && (
          <div style={{ padding: '0 28px 24px' }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 14 }}>
              Customers who viewed this item also viewed
            </h3>
            <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 8 }}>
              {similarBooks.map(sim => (
                <div
                  key={sim._id}
                  onClick={() => onSelectBook(sim)}
                  style={{
                    minWidth: 140,
                    maxWidth: 150,
                    cursor: 'pointer',
                    textAlign: 'center',
                    padding: 8,
                    borderRadius: 6,
                    border: '1px solid #eee',
                    background: '#fff'
                  }}
                >
                  <img
                    src={sim.coverImage}
                    alt={sim.title}
                    style={{ width: '100%', height: 160, objectFit: 'contain', borderRadius: 4, marginBottom: 6 }}
                  />
                  <div style={{ fontSize: 12, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {sim.title}
                  </div>
                  <div style={{ fontSize: 11, color: '#666' }}>{sim.author}</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#B12704', marginTop: 4 }}>₹{sim.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="modal-reviews-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 className="reviews-header" style={{ marginBottom: 0 }}>Customer Reviews &amp; Ratings</h3>
            <button
              className="hero-btn-primary"
              style={{ fontSize: 13, padding: '8px 16px' }}
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              {showReviewForm ? 'Cancel Review' : 'Write a Customer Review'}
            </button>
          </div>

          {reviewSuccessMsg && (
            <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: 12, borderRadius: 6, marginBottom: 16, fontWeight: 600 }}>
              {reviewSuccessMsg}
            </div>
          )}

          {/* Interactive Review Form */}
          {showReviewForm && (
            <form
              onSubmit={handleReviewSubmit}
              style={{
                background: '#fff',
                padding: 20,
                borderRadius: 8,
                border: '1px solid #d5d9d9',
                marginBottom: 24,
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
              }}
            >
              <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Write your review for "{book.title}"</h4>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Overall Rating</label>
                <div style={{ display: 'flex', gap: 6, fontSize: 20, color: '#ffa41c', cursor: 'pointer' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} onClick={() => setReviewRating(star)}>
                      {star <= reviewRating ? <FaStar /> : <FaRegStar />}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Your Name / Pen Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh K. / BookLover"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 4, border: '1px solid #ccc', fontSize: 14 }}
                />
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Headline / Title</label>
                <input
                  type="text"
                  placeholder="What's most important to know?"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 4, border: '1px solid #ccc', fontSize: 14 }}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Written Review</label>
                <textarea
                  rows="4"
                  placeholder="What did you like or dislike? Who would you recommend this book to?"
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 4, border: '1px solid #ccc', fontSize: 14, fontFamily: 'inherit' }}
                />
              </div>

              <button
                type="submit"
                className="hero-btn-primary"
                disabled={isSubmittingReview}
              >
                {isSubmittingReview ? 'Submitting to MongoDB...' : 'Submit Review'}
              </button>
            </form>
          )}

          {/* Reviews List */}
          {reviews.length === 0 ? (
            <p style={{ color: '#666', fontStyle: 'italic' }}>
              No reviews yet for this title. Be the first to share your thoughts!
            </p>
          ) : (
            reviews.map((r, i) => (
              <div key={r._id || i} className="review-card">
                <div className="review-author-row">
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#ff9900', color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12 }}>
                    {(r.userName || 'U')[0].toUpperCase()}
                  </div>
                  <span className="review-author-name">{r.userName || 'Amazon Customer'}</span>
                  <span className="verified-badge">✓ Verified Purchase</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div className="stars-wrap">{renderStars(r.rating || 5)}</div>
                  <div className="review-title">{r.title}</div>
                </div>
                <p className="review-content">{r.content}</p>
                <div style={{ fontSize: 11, color: '#888', marginTop: 8 }}>
                  Reviewed on {new Date(r.createdAt || Date.now()).toLocaleDateString()} • {r.likesCount || 0} people found this helpful
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;

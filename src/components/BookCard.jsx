import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart, FaRegHeart, FaShoppingCart, FaBookOpen } from 'react-icons/fa';

const BookCard = ({
  book,
  onSelectBook,
  onOpenLookInside,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}) => {
  if (!book) return null;

  const {
    _id,
    title,
    author,
    coverImage,
    averageRating = 4.5,
    ratingsCount = 120,
    price = 399,
    originalPrice = 599,
    language = 'English',
    ageGroup = 'All Ages',
    format = 'Paperback',
    badge,
    bestseller
  } = book;

  // Star Rating Calculation
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.4;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} />);
      } else {
        stars.push(<FaRegStar key={i} />);
      }
    }
    return stars;
  };

  const discountPercent = originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const displayBadge = badge || (bestseller ? '#1 Best Seller' : null);

  return (
    <div className="book-card">
      {/* Badge */}
      {displayBadge && (
        <span className={`book-badge ${displayBadge.includes('Choice') ? 'choice' : displayBadge.includes('Kids') ? 'kids' : 'bestseller'}`}>
          {displayBadge}
        </span>
      )}

      {/* Book Cover Image & Look Inside Overlay */}
      <div className="book-card-image-wrap" onClick={() => onSelectBook(book)}>
        <img
          src={coverImage || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&auto=format&fit=crop&q=80'}
          alt={title}
          className="book-cover-img"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&auto=format&fit=crop&q=80';
          }}
        />
        <div
          className="look-inside-trigger"
          onClick={(e) => {
            e.stopPropagation();
            onOpenLookInside(book);
          }}
          title="Read Excerpt / Look Inside"
        >
          <FaBookOpen />
          <span>Look Inside</span>
        </div>
      </div>

      {/* Book Information */}
      <div className="book-info">
        <h3 className="book-title" onClick={() => onSelectBook(book)} title={title}>
          {title}
        </h3>

        <div className="book-author">
          by <strong>{author}</strong>
        </div>

        {/* Tags Row: Language & Age Group */}
        <div className="book-tags-row">
          <span className="tag-badge lang">{language}</span>
          <span className="tag-badge age">{ageGroup}</span>
          <span className="tag-badge">{format}</span>
        </div>

        {/* Rating Row */}
        <div className="rating-row">
          <div className="stars-wrap">{renderStars(averageRating)}</div>
          <span className="rating-num">{averageRating}</span>
          <span className="ratings-count">({ratingsCount?.toLocaleString()})</span>
        </div>

        {/* Price Row */}
        <div className="price-row">
          <span className="price-main">
            <span className="price-currency">₹</span>{price}
          </span>
          {originalPrice > price && (
            <span className="price-original">₹{originalPrice}</span>
          )}
          {discountPercent > 0 && (
            <span className="price-discount">Save {discountPercent}%</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="book-card-actions">
          <button
            className="btn-add-cart"
            onClick={() => onAddToCart(book)}
            title="Add to Cart"
          >
            <FaShoppingCart />
            <span>Add to Cart</span>
          </button>

          <button
            className={`btn-wishlist ${isWishlisted ? 'active' : ''}`}
            onClick={() => onToggleWishlist(book)}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            {isWishlisted ? <FaHeart /> : <FaRegHeart />}
            <span>{isWishlisted ? 'On Wishlist' : 'Add to Wishlist'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

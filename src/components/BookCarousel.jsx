import React, { useRef } from 'react';
import BookCard from './BookCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const BookCarousel = ({
  title,
  subtitle,
  books = [],
  onSelectBook,
  onOpenLookInside,
  onAddToCart,
  onToggleWishlist,
  wishlistIds = new Set(),
  onSeeAll
}) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!books || books.length === 0) return null;

  return (
    <section className="shelf-section">
      <div className="shelf-card">
        <div className="shelf-header">
          <div>
            <h2 className="shelf-title">{title}</h2>
            {subtitle && <p className="shelf-subtitle">{subtitle}</p>}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {onSeeAll && (
              <span className="shelf-link" onClick={onSeeAll}>
                See all deals &gt;
              </span>
            )}
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                onClick={() => scroll('left')}
                style={{
                  background: '#f0f2f2',
                  border: '1px solid #d5d9d9',
                  borderRadius: 4,
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label="Scroll Left"
              >
                <FaChevronLeft style={{ fontSize: 12 }} />
              </button>
              <button
                onClick={() => scroll('right')}
                style={{
                  background: '#f0f2f2',
                  border: '1px solid #d5d9d9',
                  borderRadius: 4,
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label="Scroll Right"
              >
                <FaChevronRight style={{ fontSize: 12 }} />
              </button>
            </div>
          </div>
        </div>

        <div className="shelf-scroll-container" ref={scrollRef}>
          {books.map((book) => (
            <BookCard
              key={book._id || book.isbn || book.title}
              book={book}
              onSelectBook={onSelectBook}
              onOpenLookInside={onOpenLookInside}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.has(String(book._id))}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookCarousel;

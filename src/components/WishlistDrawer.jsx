import React, { useState } from 'react';
import { FaTimes, FaHeart, FaBookOpen, FaShoppingCart, FaTrash, FaCheck } from 'react-icons/fa';

const WishlistDrawer = ({
  isOpen,
  onClose,
  wishlistBooks = [],
  onRemoveFromWishlist,
  onAddToCart,
  onSelectBook
}) => {
  const [activeTab, setActiveTab] = useState('want_to_read');
  const [shelfStatus, setShelfStatus] = useState({});

  if (!isOpen) return null;

  const updateStatus = (bookId, status) => {
    setShelfStatus(prev => ({ ...prev, [bookId]: status }));
  };

  const filteredBooks = wishlistBooks.filter(b => {
    const status = shelfStatus[b._id] || 'want_to_read';
    return status === activeTab;
  });

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title">
            <FaHeart style={{ color: '#ff6b81' }} />
            <span>My Reading Shelf &amp; Wishlist ({wishlistBooks.length})</span>
          </div>
          <button onClick={onClose} style={{ color: '#fff', fontSize: 18 }}><FaTimes /></button>
        </div>

        {/* Shelf Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #ddd', background: '#f8f9fa' }}>
          {[
            { id: 'want_to_read', label: 'Want to Read' },
            { id: 'reading', label: 'Currently Reading' },
            { id: 'completed', label: 'Completed' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '12px 6px',
                fontSize: 12,
                fontWeight: activeTab === tab.id ? 800 : 500,
                color: activeTab === tab.id ? '#b12704' : '#555',
                borderBottom: activeTab === tab.id ? '3px solid #b12704' : '3px solid transparent',
                background: 'transparent'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="drawer-content">
          {wishlistBooks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 10px' }}>
              <FaBookOpen style={{ fontSize: 44, color: '#ccc', marginBottom: 16 }} />
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Your shelf is empty</h3>
              <p style={{ fontSize: 13, color: '#666', marginBottom: 18 }}>
                Click the heart icon on any book to save it to your personal reading list!
              </p>
              <button className="hero-btn-primary" onClick={onClose}>
                Explore Books
              </button>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 10px', color: '#666' }}>
              No books currently marked as "{activeTab.replace('_', ' ')}".
            </div>
          ) : (
            filteredBooks.map((book) => (
              <div key={book._id} className="cart-item-card">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="cart-item-img"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    onSelectBook(book);
                    onClose();
                  }}
                />
                <div className="cart-item-info">
                  <h4
                    className="cart-item-title"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      onSelectBook(book);
                      onClose();
                    }}
                  >
                    {book.title}
                  </h4>
                  <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>by {book.author}</div>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                    <span className="tag-badge lang">{book.language}</span>
                    <span className="tag-badge age">{book.ageGroup}</span>
                  </div>
                  <div className="cart-item-price">₹{book.price}</div>

                  {/* Move to another shelf status */}
                  <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                    {activeTab !== 'reading' && (
                      <button
                        onClick={() => updateStatus(book._id, 'reading')}
                        style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: '#e3f2fd', color: '#0d47a1', fontWeight: 600 }}
                      >
                        Start Reading
                      </button>
                    )}
                    {activeTab !== 'completed' && (
                      <button
                        onClick={() => updateStatus(book._id, 'completed')}
                        style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: '#e8f5e9', color: '#2e7d32', fontWeight: 600 }}
                      >
                        Mark Completed
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
                    <button
                      className="btn-add-cart"
                      style={{ padding: '4px 10px', fontSize: 11 }}
                      onClick={() => onAddToCart(book)}
                    >
                      <FaShoppingCart /> Move to Cart
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(book._id)}
                      style={{ color: '#007185', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      <FaTrash style={{ fontSize: 11 }} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistDrawer;

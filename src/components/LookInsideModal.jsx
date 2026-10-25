import React, { useState } from 'react';
import { FaTimes, FaBookOpen, FaShoppingCart, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const LookInsideModal = ({ book, onClose, onAddToCart }) => {
  if (!book) return null;

  const [pageIndex, setPageIndex] = useState(0);

  const pages = [
    {
      title: "Title & Overview",
      content: (
        <div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, marginBottom: 8 }}>
            {book.title}
          </h2>
          <h4 style={{ color: '#666', fontStyle: 'italic', marginBottom: 20 }}>
            by {book.author}
          </h4>
          <div style={{ background: '#f9f9f9', padding: 16, borderLeft: '4px solid #febd69', borderRadius: 4, marginBottom: 20 }}>
            <p style={{ fontStyle: 'italic', color: '#444', fontSize: 15, lineHeight: 1.6 }}>
              <FaQuoteLeft style={{ marginRight: 8, color: '#febd69' }} />
              {book.quotes && book.quotes[0] ? book.quotes[0] : `“A must-read masterwork in ${book.language} literature.”`}
            </p>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: '#333' }}>
            {book.description}
          </p>
        </div>
      )
    },
    {
      title: "Sample Excerpt",
      content: (
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, color: '#232f3e' }}>
            Excerpt (Chapter 1)
          </h3>
          <div style={{ fontSize: 15, lineHeight: 1.8, color: '#222', background: '#fffef9', padding: 20, borderRadius: 6, border: '1px solid #eee', minHeight: 220 }}>
            <p style={{ whiteSpace: 'pre-line' }}>
              {book.previewExcerpt || `${book.title} opens with an unforgettable sequence that immerses the reader into a world crafted with precision and deep human emotion by ${book.author}...`}
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Publication & Details",
      content: (
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, color: '#232f3e' }}>
            Book Specifications
          </h3>
          <table style={{ width: '100%', fontSize: 14, borderCollapse: 'collapse' }}>
            <tbody>
              <tr><td style={{ padding: '8px 0', color: '#666' }}>Language</td><td style={{ fontWeight: 700 }}>{book.language}</td></tr>
              <tr><td style={{ padding: '8px 0', color: '#666' }}>Target Age Group</td><td style={{ fontWeight: 700 }}>{book.ageGroup}</td></tr>
              <tr><td style={{ padding: '8px 0', color: '#666' }}>Publisher</td><td style={{ fontWeight: 700 }}>{book.publisher || 'Amazon Publishing'}</td></tr>
              <tr><td style={{ padding: '8px 0', color: '#666' }}>Print Length</td><td style={{ fontWeight: 700 }}>{book.pageCount} pages</td></tr>
              <tr><td style={{ padding: '8px 0', color: '#666' }}>ISBN-13</td><td style={{ fontWeight: 700 }}>{book.isbn || '978-0123456789'}</td></tr>
              <tr><td style={{ padding: '8px 0', color: '#666' }}>Format</td><td style={{ fontWeight: 700 }}>{book.format || 'Paperback'}</td></tr>
            </tbody>
          </table>
        </div>
      )
    }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="quiz-modal"
        style={{ maxWidth: 740, padding: 0, overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div style={{ background: '#131921', color: '#fff', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <FaBookOpen style={{ color: '#febd69', fontSize: 18 }} />
            <span style={{ fontWeight: 800, fontSize: 15 }}>Look Inside™ | Sample Reader</span>
          </div>
          <button onClick={onClose} style={{ color: '#fff', fontSize: 18 }}><FaTimes /></button>
        </div>

        {/* Reader Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: 380, background: '#fdfcf7' }}>
          {/* Left Book Cover Column */}
          <div style={{ padding: 24, borderRight: '1px solid #ede8db', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f7f4ea' }}>
            <img
              src={book.coverImage}
              alt={book.title}
              style={{ width: 140, height: 210, objectFit: 'contain', borderRadius: 4, boxShadow: '0 6px 14px rgba(0,0,0,0.15)', marginBottom: 16 }}
            />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#B12704' }}>₹{book.price}</div>
              <div style={{ fontSize: 11, color: '#007600', fontWeight: 700 }}>In Stock</div>
            </div>
            <button
              className="btn-add-cart"
              style={{ width: '100%', marginTop: 12 }}
              onClick={() => {
                onAddToCart(book);
                onClose();
              }}
            >
              <FaShoppingCart /> Buy Now
            </button>
          </div>

          {/* Right Page Reader */}
          <div style={{ padding: 28, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1 }}>
              {pages[pageIndex].content}
            </div>

            {/* Pagination Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, paddingTop: 16, borderTop: '1px solid #ede8db' }}>
              <button
                onClick={() => setPageIndex(Math.max(0, pageIndex - 1))}
                disabled={pageIndex === 0}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 700,
                  color: pageIndex === 0 ? '#bbb' : '#007185',
                  cursor: pageIndex === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                <FaChevronLeft /> Previous Page
              </button>

              <span style={{ fontSize: 12, color: '#888' }}>
                Page {pageIndex + 1} of {pages.length}
              </span>

              <button
                onClick={() => setPageIndex(Math.min(pages.length - 1, pageIndex + 1))}
                disabled={pageIndex === pages.length - 1}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 700,
                  color: pageIndex === pages.length - 1 ? '#bbb' : '#007185',
                  cursor: pageIndex === pages.length - 1 ? 'not-allowed' : 'pointer'
                }}
              >
                Next Page <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookInsideModal;

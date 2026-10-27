import React from 'react';
import {
  FaTimes,
  FaUserCircle,
  FaBook,
  FaBolt,
  FaAward,
  FaFire,
  FaHeart,
  FaChevronRight,
  FaGlobe,
  FaChild,
  FaBoxOpen
} from 'react-icons/fa';

const AllMenuDrawer = ({
  isOpen,
  onClose,
  currentUser,
  onOpenAuth,
  onSelectGenre,
  onSelectLanguage,
  onSelectAgeGroup,
  onShowAllCatalog,
  onOpenQuiz,
  onOpenWishlist,
  onOpenOrders
}) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose} style={{ justifyContent: 'flex-start' }}>
      <div
        className="drawer-panel"
        style={{
          width: 360,
          animation: 'slideRight 0.25s ease',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header with User Greeting */}
        <div
          style={{
            background: '#232f3e',
            color: '#fff',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
          onClick={() => {
            onClose();
            onOpenAuth();
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <FaUserCircle style={{ fontSize: 28, color: '#febd69' }} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 800 }}>
                {currentUser ? `Hello, ${currentUser.name}` : 'Hello, sign in'}
              </div>
              <div style={{ fontSize: 11, color: '#febd69' }}>
                {currentUser ? 'View Account & Profile >' : 'Access your reading shelf >'}
              </div>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            style={{ color: '#fff', fontSize: 18 }}
          >
            <FaTimes />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="drawer-content" style={{ padding: 0 }}>
          {/* Main Action: View All Books */}
          <div style={{ padding: '16px 20px', borderBottom: '4px solid #f0f0f0', background: '#fff9e6' }}>
            <button
              onClick={() => {
                onClose();
                onShowAllCatalog();
              }}
              className="hero-btn-primary"
              style={{ width: '100%', fontSize: 14, padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <FaBook /> Browse All Books Catalog
            </button>
          </div>

          {/* Special Programs & Features */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #eee' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#111', marginBottom: 10 }}>
              Trending &amp; Programs
            </div>
            <div
              className="drawer-nav-row"
              onClick={() => {
                onClose();
                onOpenQuiz();
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#b12704', fontWeight: 700 }}>
                <FaBolt style={{ color: '#ff9900' }} /> 30-Sec Book Matcher (AI Quiz)
              </span>
              <FaChevronRight style={{ fontSize: 11, color: '#888' }} />
            </div>

            <div
              className="drawer-nav-row"
              onClick={() => {
                onClose();
                onSelectGenre('Bestseller');
                onShowAllCatalog();
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FaAward style={{ color: '#febd69' }} /> Bestsellers &amp; Top Rated
              </span>
              <FaChevronRight style={{ fontSize: 11, color: '#888' }} />
            </div>

            <div
              className="drawer-nav-row"
              onClick={() => {
                onClose();
                onSelectGenre('Trending');
                onShowAllCatalog();
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FaFire style={{ color: '#ff9900' }} /> Trending Reads
              </span>
              <FaChevronRight style={{ fontSize: 11, color: '#888' }} />
            </div>

            <div
              className="drawer-nav-row"
              onClick={() => {
                onClose();
                onOpenWishlist();
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FaHeart style={{ color: '#ff6b81' }} /> My Reading Shelf &amp; Wishlist
              </span>
              <FaChevronRight style={{ fontSize: 11, color: '#888' }} />
            </div>
          </div>

          {/* Shop by Age Group */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #eee' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#111', marginBottom: 10 }}>
              Shop by Age Group
            </div>
            {[
              { id: 'Kids', label: '🧒 Kids & Bedtime Tales (0-8 yrs)' },
              { id: 'Pre-Teens', label: '🎒 Pre-Teens & Magic (9-12 yrs)' },
              { id: 'Young Adult', label: '⚡ Young Adult & Dystopian (13-18 yrs)' },
              { id: 'Adults', label: '☕ Adults Fiction & Non-Fiction (18+)' },
              { id: 'All Ages', label: '🌿 Family & Timeless Classics' }
            ].map(age => (
              <div
                key={age.id}
                className="drawer-nav-row"
                onClick={() => {
                  onClose();
                  onSelectAgeGroup(age.id);
                  onShowAllCatalog();
                }}
              >
                <span>{age.label}</span>
                <FaChevronRight style={{ fontSize: 11, color: '#888' }} />
              </div>
            ))}
          </div>

          {/* Shop by Language */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #eee' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#111', marginBottom: 10 }}>
              Shop by Language
            </div>
            {[
              { code: 'Tamil', label: '🇮🇳 தமிழ் (Tamil Literature)' },
              { code: 'Hindi', label: '🇮🇳 हिन्दी (Hindi Literature)' },
              { code: 'English', label: '🇬🇧 English Bestsellers' },
              { code: 'Spanish', label: '🇪🇸 Español (Spanish Classics)' },
              { code: 'French', label: '🇫🇷 Français (French Literature)' },
              { code: 'German', label: '🇩🇪 Deutsch (German Philosophy)' },
              { code: 'Japanese', label: '🇯🇵 日本語 (Japanese Fiction)' }
            ].map(lang => (
              <div
                key={lang.code}
                className="drawer-nav-row"
                onClick={() => {
                  onClose();
                  onSelectLanguage(lang.code);
                  onShowAllCatalog();
                }}
              >
                <span>{lang.label}</span>
                <FaChevronRight style={{ fontSize: 11, color: '#888' }} />
              </div>
            ))}
          </div>

          {/* Shop by Genre */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #eee' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#111', marginBottom: 10 }}>
              Shop by Genre
            </div>
            {[
              'Sci-Fi',
              'Fantasy',
              'Mystery',
              'Romance',
              'Self-Help',
              'Classics',
              'Philosophy',
              'Children & Picture Books'
            ].map(genre => (
              <div
                key={genre}
                className="drawer-nav-row"
                onClick={() => {
                  onClose();
                  onSelectGenre(genre);
                  onShowAllCatalog();
                }}
              >
                <span>{genre}</span>
                <FaChevronRight style={{ fontSize: 11, color: '#888' }} />
              </div>
            ))}
          </div>

          {/* Help & Settings */}
          <div style={{ padding: '16px 20px 30px' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#111', marginBottom: 10 }}>
              Help &amp; Settings
            </div>
            <div
              className="drawer-nav-row"
              onClick={() => {
                onClose();
                if (onOpenOrders) onOpenOrders();
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#007185', fontWeight: 700 }}>
                <FaBoxOpen style={{ color: '#febd69' }} /> Your Orders &amp; Package Tracking
              </span>
              <FaChevronRight style={{ fontSize: 11, color: '#888' }} />
            </div>
            <div
              className="drawer-nav-row"
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
            >
              <span>{currentUser ? 'Your Profile Settings' : 'Sign In / Register'}</span>
            </div>
            <div
              className="drawer-nav-row"
              onClick={() => {
                onClose();
                alert('BookVerse Customer Care: 24/7 Support available at support@bookverse.com');
              }}
            >
              <span>Customer Service &amp; Help</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMenuDrawer;

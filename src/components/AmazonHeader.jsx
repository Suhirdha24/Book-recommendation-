import React, { useState } from 'react';
import {
  FaBook,
  FaSearch,
  FaMapMarkerAlt,
  FaGlobe,
  FaShoppingCart,
  FaHeart,
  FaChevronDown,
  FaTimes
} from 'react-icons/fa';

const languagesList = [
  { code: 'All', label: 'All Languages', flag: '🌐' },
  { code: 'English', label: 'English', flag: '🇬🇧' },
  { code: 'Tamil', label: 'தமிழ் (Tamil)', flag: '🇮🇳' },
  { code: 'Hindi', label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { code: 'Spanish', label: 'Español (Spanish)', flag: '🇪🇸' },
  { code: 'French', label: 'Français (French)', flag: '🇫🇷' },
  { code: 'German', label: 'Deutsch (German)', flag: '🇩🇪' },
  { code: 'Japanese', label: '日本語 (Japanese)', flag: '🇯🇵' }
];

const AmazonHeader = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedLanguage,
  setSelectedLanguage,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenQuiz,
  onResetToHome
}) => {
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState('New Delhi 110001');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [tempPincode, setTempPincode] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handlePincodeSubmit = (e) => {
    e.preventDefault();
    if (tempPincode.trim()) {
      setDeliveryLocation(`Delivery PIN ${tempPincode}`);
      setShowLocationModal(false);
      setTempPincode('');
    }
  };

  const currentLangObj = languagesList.find(l => l.code === selectedLanguage) || languagesList[0];

  return (
    <header className="amazon-header">
      <div className="header-top">
        {/* BookVerse Logo */}
        <div className="logo-container" onClick={onResetToHome} title="Return to BookVerse Home">
          <FaBook className="logo-icon" />
          <div className="logo-text">
            book<span className="logo-suffix">verse</span>
          </div>
        </div>

        {/* Deliver To Selector */}
        <div className="deliver-box" onClick={() => setShowLocationModal(true)}>
          <FaMapMarkerAlt className="deliver-icon" />
          <div>
            <div className="deliver-text-top">Deliver to</div>
            <div className="deliver-text-bold">{deliveryLocation}</div>
          </div>
        </div>

        {/* Global Multilingual Search Bar */}
        <form className="search-wrapper" onSubmit={handleSearchSubmit}>
          <select
            className="search-category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Select Search Category"
          >
            <option value="All">All Books</option>
            <option value="Fiction">Fiction</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Children & Picture Books">Children</option>
            <option value="Young Adult">Young Adult</option>
            <option value="Romance">Romance</option>
            <option value="Mystery">Mystery & Thriller</option>
            <option value="Self-Help">Self-Help</option>
            <option value="Classics">Classics</option>
            <option value="Philosophy">Philosophy</option>
          </select>

          <input
            type="text"
            className="search-input"
            placeholder="Search by title, author, genre, language (Tamil, Hindi, English...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button type="submit" className="search-btn" aria-label="Search">
            <FaSearch />
          </button>
        </form>

        {/* Right Navigation Controls */}
        <div className="header-actions">
          {/* Language Selector Dropdown */}
          <div style={{ position: 'relative' }}>
            <div
              className="nav-item"
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              title="Change Book Language"
            >
              <div className="lang-dropdown-btn">
                <span className="lang-flag">{currentLangObj.flag}</span>
                <span>{currentLangObj.code === 'All' ? 'LANG' : currentLangObj.code.slice(0, 3).toUpperCase()}</span>
                <FaChevronDown style={{ fontSize: 10, marginLeft: 2 }} />
              </div>
            </div>

            {showLangDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: 6,
                  background: '#ffffff',
                  color: '#111',
                  borderRadius: 6,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                  padding: '8px 0',
                  width: 220,
                  zIndex: 2000
                }}
              >
                <div style={{ padding: '6px 16px', fontSize: 12, fontWeight: 700, color: '#555', borderBottom: '1px solid #eee' }}>
                  Filter by Language
                </div>
                {languagesList.map((lang) => (
                  <div
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code);
                      setShowLangDropdown(false);
                    }}
                    style={{
                      padding: '8px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: selectedLanguage === lang.code ? 700 : 400,
                      backgroundColor: selectedLanguage === lang.code ? '#fff9f0' : 'transparent',
                      color: selectedLanguage === lang.code ? '#b12704' : '#111'
                    }}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Matcher Quiz Shortcut */}
          <div className="nav-item" onClick={onOpenQuiz} title="Personalized Recommendation Quiz">
            <div className="nav-line-1">Book Matcher</div>
            <div className="nav-line-2" style={{ color: '#febd69' }}>30s Quiz ⚡</div>
          </div>

          {/* Wishlist / Reading Shelf */}
          <div className="nav-item" onClick={onOpenWishlist} title="My Reading Shelf & Wishlist">
            <div className="nav-line-1">Your Lists</div>
            <div className="nav-line-2" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <FaHeart style={{ color: '#ff6b81' }} />
              <span>Shelf ({wishlistCount})</span>
            </div>
          </div>

          {/* Cart with Count Badge */}
          <div className="nav-item cart-box" onClick={onOpenCart} title="Shopping Cart">
            <div className="cart-icon-wrap">
              <FaShoppingCart />
              <span className="cart-badge">{cartCount}</span>
            </div>
            <div className="nav-line-2" style={{ marginTop: 8 }}>Cart</div>
          </div>
        </div>
      </div>

      {/* Pincode / Location Modal */}
      {showLocationModal && (
        <div className="modal-backdrop" onClick={() => setShowLocationModal(false)}>
          <div
            className="quiz-modal"
            style={{ maxWidth: 420 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#111' }}>Choose your location</h3>
              <button onClick={() => setShowLocationModal(false)}><FaTimes /></button>
            </div>
            <p style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>
              Delivery options and book speeds may vary based on your location.
            </p>
            <form onSubmit={handlePincodeSubmit}>
              <input
                type="text"
                placeholder="Enter 6-digit Pincode / City"
                value={tempPincode}
                onChange={(e) => setTempPincode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 6,
                  border: '1px solid #ccc',
                  fontSize: 14,
                  marginBottom: 14
                }}
              />
              <button
                type="submit"
                className="hero-btn-primary"
                style={{ width: '100%' }}
              >
                Apply Pincode
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default AmazonHeader;

import React, { useState } from 'react';
import { FaBars, FaBolt, FaFire, FaAward, FaChevronDown } from 'react-icons/fa';

const cleanAgeGroups = [
  { id: 'Kids', label: '🧒 Kids (0-8)' },
  { id: 'Pre-Teens', label: '🎒 Pre-Teens' },
  { id: 'Young Adult', label: '⚡ Young Adult' },
  { id: 'Adults', label: '☕ Adults (18+)' },
  { id: 'All Ages', label: '🌿 All Ages' }
];

const mainLanguages = [
  { code: 'Tamil', label: 'தமிழ்' },
  { code: 'Hindi', label: 'हिन्दी' },
  { code: 'English', label: 'English' }
];

const allLanguages = [
  { code: 'All', label: 'All Languages' },
  { code: 'Tamil', label: 'தமிழ் (Tamil)' },
  { code: 'Hindi', label: 'हिन्दी (Hindi)' },
  { code: 'English', label: 'English' },
  { code: 'Spanish', label: 'Español (Spanish)' },
  { code: 'French', label: 'Français (French)' },
  { code: 'German', label: 'Deutsch (German)' },
  { code: 'Japanese', label: '日本語 (Japanese)' }
];

const AmazonSubNav = ({
  selectedAgeGroup,
  setSelectedAgeGroup,
  selectedLanguage,
  setSelectedLanguage,
  selectedGenre,
  setSelectedGenre,
  onOpenQuiz
}) => {
  const [showLangMenu, setShowLangMenu] = useState(false);

  return (
    <nav className="sub-nav">
      <div className="sub-nav-container">
        {/* Left Section: All, Quiz, & Age Groups */}
        <div className="sub-nav-left">
          {/* All Toggle */}
          <button
            className={`sub-nav-item ${selectedAgeGroup === 'All' && selectedLanguage === 'All' && selectedGenre === 'All' ? 'active' : ''}`}
            onClick={() => {
              setSelectedAgeGroup('All');
              setSelectedLanguage('All');
              setSelectedGenre('All');
            }}
          >
            <FaBars style={{ marginRight: 6 }} />
            <span>All Books</span>
          </button>

          {/* AI Recommendation Matcher */}
          <button
            className="sub-nav-item highlight"
            onClick={onOpenQuiz}
            title="Personalized recommendations tailored to your age and taste"
          >
            <FaBolt style={{ marginRight: 4 }} />
            <span>30-Sec Book Matcher</span>
          </button>

          <span className="sub-nav-divider">|</span>

          {/* Clean Age Groups Filter */}
          <div className="sub-nav-group">
            {cleanAgeGroups.map((ag) => (
              <button
                key={ag.id}
                className={`sub-nav-item ${selectedAgeGroup === ag.id ? 'active' : ''}`}
                onClick={() => setSelectedAgeGroup(selectedAgeGroup === ag.id ? 'All' : ag.id)}
              >
                <span>{ag.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Section: Popular Languages, Bestsellers, Trending */}
        <div className="sub-nav-right">
          {/* Quick Language Links */}
          <div className="sub-nav-group">
            {mainLanguages.map((lang) => (
              <button
                key={lang.code}
                className={`sub-nav-item ${selectedLanguage === lang.code ? 'active' : ''}`}
                onClick={() => setSelectedLanguage(selectedLanguage === lang.code ? 'All' : lang.code)}
              >
                <span>{lang.label}</span>
              </button>
            ))}

            {/* More Languages Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                className={`sub-nav-item ${['Spanish', 'French', 'German', 'Japanese'].includes(selectedLanguage) ? 'active' : ''}`}
                onClick={() => setShowLangMenu(!showLangMenu)}
              >
                <span>{['Spanish', 'French', 'German', 'Japanese'].includes(selectedLanguage) ? selectedLanguage : 'More'}</span>
                <FaChevronDown style={{ fontSize: 9, marginLeft: 4 }} />
              </button>

              {showLangMenu && (
                <div
                  className="sub-nav-dropdown-menu"
                  onClick={() => setShowLangMenu(false)}
                >
                  {allLanguages.map((l) => (
                    <div
                      key={l.code}
                      className={`dropdown-option ${selectedLanguage === l.code ? 'selected' : ''}`}
                      onClick={() => setSelectedLanguage(l.code)}
                    >
                      {l.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <span className="sub-nav-divider">|</span>

          {/* Bestsellers & Trending */}
          <button
            className={`sub-nav-item ${selectedGenre === 'Bestseller' ? 'active' : ''}`}
            onClick={() => setSelectedGenre(selectedGenre === 'Bestseller' ? 'All' : 'Bestseller')}
          >
            <FaAward style={{ color: '#febd69', marginRight: 4 }} />
            <span>Bestsellers</span>
          </button>

          <button
            className={`sub-nav-item ${selectedGenre === 'Trending' ? 'active' : ''}`}
            onClick={() => setSelectedGenre(selectedGenre === 'Trending' ? 'All' : 'Trending')}
          >
            <FaFire style={{ color: '#ff9900', marginRight: 4 }} />
            <span>Trending</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AmazonSubNav;

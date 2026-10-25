import React from 'react';
import { FaBars, FaBolt, FaChild, FaUserGraduate, FaCoffee, FaFire, FaAward } from 'react-icons/fa';

const ageGroupsList = [
  { id: 'All', label: 'All Age Groups', icon: null },
  { id: 'Kids', label: '🧒 Kids (0-8 yrs)', icon: <FaChild /> },
  { id: 'Pre-Teens', label: '🎒 Pre-Teens (9-12)', icon: null },
  { id: 'Young Adult', label: '⚡ Young Adult (13-18)', icon: <FaUserGraduate /> },
  { id: 'Adults', label: '☕ Adults (18+)', icon: <FaCoffee /> },
  { id: 'All Ages', label: '🌿 Family & Seniors', icon: null }
];

const popularLanguages = [
  { code: 'Tamil', label: 'தமிழ் (Tamil)' },
  { code: 'Hindi', label: 'हिन्दी (Hindi)' },
  { code: 'English', label: 'English' },
  { code: 'Spanish', label: 'Español' },
  { code: 'French', label: 'Français' },
  { code: 'German', label: 'Deutsch' },
  { code: 'Japanese', label: '日本語' }
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
  return (
    <nav className="sub-nav">
      {/* All Toggle */}
      <div
        className={`sub-nav-item ${selectedAgeGroup === 'All' && selectedLanguage === 'All' && selectedGenre === 'All' ? 'active' : ''}`}
        onClick={() => {
          setSelectedAgeGroup('All');
          setSelectedLanguage('All');
          setSelectedGenre('All');
        }}
      >
        <FaBars style={{ marginRight: 4 }} />
        <span>All Books</span>
      </div>

      {/* AI Recommendation Matcher */}
      <div className="sub-nav-item highlight" onClick={onOpenQuiz} title="Get recommendations tailored to your age and taste">
        <FaBolt />
        <span>30-Sec Book Matcher</span>
      </div>

      {/* Age Groups Quick Filter */}
      {ageGroupsList.map((ag) => (
        <div
          key={ag.id}
          className={`sub-nav-item ${selectedAgeGroup === ag.id ? 'active' : ''}`}
          onClick={() => setSelectedAgeGroup(selectedAgeGroup === ag.id ? 'All' : ag.id)}
        >
          {ag.icon && <span style={{ marginRight: 2 }}>{ag.icon}</span>}
          <span>{ag.label}</span>
        </div>
      ))}

      {/* Divider */}
      <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 16 }}>|</span>

      {/* Language Quick Filter */}
      {popularLanguages.map((lang) => (
        <div
          key={lang.code}
          className={`sub-nav-item ${selectedLanguage === lang.code ? 'active' : ''}`}
          onClick={() => setSelectedLanguage(selectedLanguage === lang.code ? 'All' : lang.code)}
        >
          <span>{lang.label}</span>
        </div>
      ))}

      {/* Divider */}
      <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 16 }}>|</span>

      {/* Trending / Bestseller shortcut */}
      <div
        className={`sub-nav-item ${selectedGenre === 'Trending' ? 'active' : ''}`}
        onClick={() => setSelectedGenre(selectedGenre === 'Trending' ? 'All' : 'Trending')}
      >
        <FaFire style={{ color: '#ff9900' }} />
        <span>Trending</span>
      </div>

      <div
        className={`sub-nav-item ${selectedGenre === 'Bestseller' ? 'active' : ''}`}
        onClick={() => setSelectedGenre(selectedGenre === 'Bestseller' ? 'All' : 'Bestseller')}
      >
        <FaAward style={{ color: '#febd69' }} />
        <span>Bestsellers</span>
      </div>
    </nav>
  );
};

export default AmazonSubNav;

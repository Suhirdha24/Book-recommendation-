import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaTimes, FaUndo } from 'react-icons/fa';

const languagesList = [
  'All',
  'English',
  'Tamil',
  'Hindi',
  'Spanish',
  'French',
  'German',
  'Japanese'
];

const ageGroupsList = [
  'All',
  'Kids',
  'Pre-Teens',
  'Young Adult',
  'Adults',
  'All Ages'
];

const genresList = [
  'All',
  'Fiction',
  'Sci-Fi',
  'Fantasy',
  'Mystery',
  'Thriller',
  'Romance',
  'Children & Picture Books',
  'Self-Help',
  'Classics',
  'Philosophy',
  'Poetry',
  'Indian Literature',
  'Historical Fiction'
];

const formatsList = ['All', 'Paperback', 'Hardcover', 'Kindle', 'Audiobook'];

const FilterSidebar = ({
  selectedLanguage,
  setSelectedLanguage,
  selectedAgeGroup,
  setSelectedAgeGroup,
  selectedGenre,
  setSelectedGenre,
  selectedFormat,
  setSelectedFormat,
  minRating,
  setMinRating,
  maxPrice,
  setMaxPrice,
  onResetFilters
}) => {
  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar-header">
        <h3 className="filter-sidebar-title">Filters</h3>
        <button className="filter-clear-btn" onClick={onResetFilters} title="Reset all filters">
          <FaUndo style={{ marginRight: 4 }} /> Clear All
        </button>
      </div>

      {/* Customer Reviews Rating Filter */}
      <div className="filter-group">
        <h4 className="filter-group-title">Customer Reviews</h4>
        <div className="filter-list">
          {[4, 3].map((rating) => (
            <div
              key={rating}
              className={`rating-filter-item ${minRating === rating ? 'selected' : ''}`}
              onClick={() => setMinRating(minRating === rating ? null : rating)}
            >
              <div style={{ display: 'flex', color: '#ffa41c', fontSize: 13 }}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} style={{ color: i < rating ? '#ffa41c' : '#ddd' }} />
                ))}
              </div>
              <span style={{ fontSize: 12, fontWeight: minRating === rating ? 700 : 400 }}>
                &amp; Up
              </span>
            </div>
          ))}
          {minRating && (
            <span
              style={{ fontSize: 11, color: '#007185', cursor: 'pointer', marginTop: 4 }}
              onClick={() => setMinRating(null)}
            >
              Clear rating filter
            </span>
          )}
        </div>
      </div>

      {/* Language Filter */}
      <div className="filter-group">
        <h4 className="filter-group-title">Book Language</h4>
        <div className="filter-list">
          {languagesList.map((lang) => (
            <div
              key={lang}
              className={`filter-item ${selectedLanguage === lang ? 'selected' : ''}`}
              onClick={() => setSelectedLanguage(lang)}
            >
              <span>{lang === 'All' ? 'All Languages' : lang}</span>
              {selectedLanguage === lang && <span style={{ color: '#b12704' }}>✓</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Age Group Filter */}
      <div className="filter-group">
        <h4 className="filter-group-title">Age Group</h4>
        <div className="filter-list">
          {ageGroupsList.map((age) => (
            <div
              key={age}
              className={`filter-item ${selectedAgeGroup === age ? 'selected' : ''}`}
              onClick={() => setSelectedAgeGroup(age)}
            >
              <span>{age === 'All' ? 'All Age Groups' : age}</span>
              {selectedAgeGroup === age && <span style={{ color: '#b12704' }}>✓</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Genre Filter */}
      <div className="filter-group">
        <h4 className="filter-group-title">Department / Genre</h4>
        <div className="filter-list" style={{ maxHeight: 240, overflowY: 'auto' }}>
          {genresList.map((g) => (
            <div
              key={g}
              className={`filter-item ${selectedGenre === g ? 'selected' : ''}`}
              onClick={() => setSelectedGenre(g)}
            >
              <span>{g === 'All' ? 'All Genres' : g}</span>
              {selectedGenre === g && <span style={{ color: '#b12704' }}>✓</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Book Format */}
      <div className="filter-group">
        <h4 className="filter-group-title">Format</h4>
        <div className="filter-list">
          {formatsList.map((fmt) => (
            <div
              key={fmt}
              className={`filter-item ${selectedFormat === fmt ? 'selected' : ''}`}
              onClick={() => setSelectedFormat(fmt)}
            >
              <span>{fmt === 'All' ? 'All Formats' : fmt}</span>
              {selectedFormat === fmt && <span style={{ color: '#b12704' }}>✓</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Price Slider Filter */}
      <div className="filter-group">
        <h4 className="filter-group-title">Max Price: ₹{maxPrice}</h4>
        <input
          type="range"
          min="150"
          max="1200"
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#ff9900', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#666', marginTop: 4 }}>
          <span>₹150</span>
          <span>₹1200+</span>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;

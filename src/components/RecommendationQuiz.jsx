import React, { useState } from 'react';
import {
  FaTimes,
  FaBolt,
  FaChild,
  FaUserGraduate,
  FaCoffee,
  FaLeaf,
  FaArrowRight,
  FaArrowLeft,
  FaCheckCircle,
  FaMagic,
  FaShoppingCart
} from 'react-icons/fa';

const ageOptions = [
  { id: 'Kids', title: 'Kids (0-8 yrs)', desc: 'Picture books, bedtime tales, animal fables', icon: '🧒' },
  { id: 'Pre-Teens', title: 'Pre-Teens (9-12 yrs)', desc: 'Magic, mythology, school mysteries, wonder', icon: '🎒' },
  { id: 'Young Adult', title: 'Young Adults (13-18 yrs)', desc: 'Dystopian, coming of age, teen romance, fantasy', icon: '⚡' },
  { id: 'Adults', title: 'Adults (18+ yrs)', desc: 'Psychological thrillers, business, contemporary fiction', icon: '☕' },
  { id: 'All Ages', title: 'Family & Seniors (All Ages)', desc: 'Timeless epics, spiritual wisdom, classics', icon: '🌿' }
];

const languageOptions = [
  { id: 'All', title: 'Any Language', flag: '🌐' },
  { id: 'Tamil', title: 'தமிழ் (Tamil)', flag: '🇮🇳' },
  { id: 'Hindi', title: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { id: 'English', title: 'English', flag: '🇬🇧' },
  { id: 'Spanish', title: 'Español (Spanish)', flag: '🇪🇸' },
  { id: 'French', title: 'Français (French)', flag: '🇫🇷' },
  { id: 'German', title: 'Deutsch (German)', flag: '🇩🇪' },
  { id: 'Japanese', title: '日本語 (Japanese)', flag: '🇯🇵' }
];

const moodOptions = [
  { id: 'Mind-Bending', title: 'Mind-Bending & Sci-Fi', desc: 'Space travel, multiverse, big ideas', icon: '🚀' },
  { id: 'Fast-Paced', title: 'Thrilling & Mystery', desc: 'Plot twists, suspense, page-turners', icon: '🔍' },
  { id: 'Emotional', title: 'Romantic & Heartfelt', desc: 'Deep emotions, love, human connection', icon: '💖' },
  { id: 'Inspirational', title: 'Self-Growth & Success', desc: 'Habits, psychology, productivity', icon: '🧠' },
  { id: 'Magical', title: 'Magical & Fantasy', desc: 'Quests, ancient kingdoms, enchantment', icon: '🏰' },
  { id: 'Philosophical', title: 'Soulful & Philosophical', desc: 'Meditation, inner peace, truth', icon: '🧘' }
];

const RecommendationQuiz = ({ onClose, onSelectBook, onAddToCart }) => {
  const [step, setStep] = useState(1);
  const [selectedAge, setSelectedAge] = useState('Adults');
  const [selectedLang, setSelectedLang] = useState('All');
  const [selectedMood, setSelectedMood] = useState('Mind-Bending');
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchResults = async () => {
    setIsLoading(true);
    setStep(4);
    try {
      const url = `/api/recommendations?ageGroup=${encodeURIComponent(selectedAge)}&preferredLanguage=${selectedLang === 'All' ? '' : encodeURIComponent(selectedLang)}&mood=${encodeURIComponent(selectedMood)}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setRecommendations(data.recommendations || []);
      }
    } catch (e) {
      console.error("Error fetching quiz recommendations:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="quiz-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>

        {/* Quiz Steps Indicator */}
        {step <= 3 && (
          <div className="quiz-header">
            <div className="quiz-step-indicator">
              <div className={`step-dot ${step >= 1 ? 'active' : ''}`} />
              <div className={`step-dot ${step >= 2 ? 'active' : ''}`} />
              <div className={`step-dot ${step >= 3 ? 'active' : ''}`} />
            </div>
            <h2 className="quiz-title">
              <FaBolt style={{ color: '#ff9900', marginRight: 8 }} />
              Find Your Perfect Book in 30 Seconds
            </h2>
            <p className="quiz-subtitle">
              Answer 3 quick questions to unlock personalized recommendations across all languages and age groups.
            </p>
          </div>
        )}

        {/* STEP 1: Age Group */}
        {step === 1 && (
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>
              Step 1 of 3: Who are we recommending this book for?
            </h3>
            <div className="quiz-options-grid">
              {ageOptions.map((opt) => (
                <div
                  key={opt.id}
                  className={`quiz-option-card ${selectedAge === opt.id ? 'selected' : ''}`}
                  onClick={() => setSelectedAge(opt.id)}
                >
                  <span className="quiz-option-icon">{opt.icon}</span>
                  <div>
                    <div className="quiz-option-label">{opt.title}</div>
                    <div className="quiz-option-desc">{opt.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                className="hero-btn-primary"
                onClick={() => setStep(2)}
              >
                Next: Choose Language <FaArrowRight style={{ marginLeft: 6 }} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Language Preference */}
        {step === 2 && (
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>
              Step 2 of 3: Which language would you love to read in?
            </h3>
            <div className="quiz-options-grid">
              {languageOptions.map((opt) => (
                <div
                  key={opt.id}
                  className={`quiz-option-card ${selectedLang === opt.id ? 'selected' : ''}`}
                  onClick={() => setSelectedLang(opt.id)}
                >
                  <span className="quiz-option-icon">{opt.flag}</span>
                  <div>
                    <div className="quiz-option-label">{opt.title}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                className="hero-btn-secondary"
                style={{ color: '#111', borderColor: '#ccc' }}
                onClick={() => setStep(1)}
              >
                <FaArrowLeft style={{ marginRight: 6 }} /> Back
              </button>
              <button
                className="hero-btn-primary"
                onClick={() => setStep(3)}
              >
                Next: Select Vibe <FaArrowRight style={{ marginLeft: 6 }} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Mood & Vibe */}
        {step === 3 && (
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>
              Step 3 of 3: What reading vibe or mood are you craving?
            </h3>
            <div className="quiz-options-grid">
              {moodOptions.map((opt) => (
                <div
                  key={opt.id}
                  className={`quiz-option-card ${selectedMood === opt.id ? 'selected' : ''}`}
                  onClick={() => setSelectedMood(opt.id)}
                >
                  <span className="quiz-option-icon">{opt.icon}</span>
                  <div>
                    <div className="quiz-option-label">{opt.title}</div>
                    <div className="quiz-option-desc">{opt.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                className="hero-btn-secondary"
                style={{ color: '#111', borderColor: '#ccc' }}
                onClick={() => setStep(2)}
              >
                <FaArrowLeft style={{ marginRight: 6 }} /> Back
              </button>
              <button
                className="hero-btn-primary"
                onClick={fetchResults}
              >
                Show My Recommended Books ⚡
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Results */}
        {step === 4 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111', marginBottom: 6 }}>
                🎯 Top Recommendations For You
              </h2>
              <p style={{ fontSize: 13, color: '#666' }}>
                Curated for <strong>{selectedAge}</strong> readers in <strong>{selectedLang === 'All' ? 'All Languages' : selectedLang}</strong> matching your <strong>{selectedMood}</strong> vibe.
              </p>
            </div>

            {isLoading ? (
              <div style={{ padding: '40px 0', textAlign: 'center', fontSize: 16, color: '#555' }}>
                Computing personalized similarity scores...
              </div>
            ) : recommendations.length === 0 ? (
              <p style={{ textAlign: 'center', padding: 20, color: '#666' }}>
                No direct matches found. Try broadening your language or mood choices!
              </p>
            ) : (
              <div style={{ maxHeight: '60vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {recommendations.slice(0, 6).map((book, idx) => (
                  <div
                    key={book._id}
                    style={{
                      display: 'flex',
                      gap: 16,
                      background: '#fff',
                      border: '1px solid #d5d9d9',
                      borderRadius: 8,
                      padding: 12,
                      alignItems: 'center'
                    }}
                  >
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      style={{ width: 70, height: 100, objectFit: 'contain', borderRadius: 4, cursor: 'pointer' }}
                      onClick={() => {
                        onSelectBook(book);
                        onClose();
                      }}
                    />

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ background: '#e8f5e9', color: '#2e7d32', fontSize: 11, fontWeight: 800, padding: '2px 6px', borderRadius: 4 }}>
                          {99 - idx * 3}% Match
                        </span>
                        <span className="tag-badge lang">{book.language}</span>
                        <span className="tag-badge age">{book.ageGroup}</span>
                      </div>

                      <h4
                        style={{ fontSize: 15, fontWeight: 700, cursor: 'pointer', color: '#111', marginBottom: 2 }}
                        onClick={() => {
                          onSelectBook(book);
                          onClose();
                        }}
                      >
                        {book.title}
                      </h4>
                      <div style={{ fontSize: 12, color: '#666', marginBottom: 6 }}>
                        by {book.author} • ⭐ {book.averageRating}
                      </div>

                      <div style={{ fontSize: 16, fontWeight: 800, color: '#B12704' }}>
                        ₹{book.price}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <button
                        className="btn-add-cart"
                        onClick={() => onAddToCart(book)}
                      >
                        <FaShoppingCart /> Add
                      </button>
                      <button
                        className="hero-btn-secondary"
                        style={{ color: '#111', borderColor: '#ccc', fontSize: 11, padding: '4px 8px' }}
                        onClick={() => {
                          onSelectBook(book);
                          onClose();
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
              <button
                className="hero-btn-secondary"
                style={{ color: '#111', borderColor: '#ccc' }}
                onClick={() => setStep(1)}
              >
                🔄 Retake Recommendation Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationQuiz;

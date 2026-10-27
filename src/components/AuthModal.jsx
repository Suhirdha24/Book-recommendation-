import React, { useState } from 'react';
import {
  FaTimes,
  FaBook,
  FaUser,
  FaLock,
  FaEnvelope,
  FaHeart,
  FaShoppingCart,
  FaSignOutAlt,
  FaCheckCircle,
  FaGlobe,
  FaBolt,
  FaBoxOpen
} from 'react-icons/fa';

const AuthModal = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  onOpenWishlist,
  onOpenCart,
  onOpenOrders,
  ordersCount = 0,
  onOpenQuiz
}) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('English');
  const [preferredAgeGroup, setPreferredAgeGroup] = useState('Adults');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleDemoLogin = () => {
    const demoUser = {
      _id: 'user_demo_101',
      name: 'Suhirdha Sivakumar',
      email: 'suhirdha@example.com',
      preferredLanguage: 'Tamil',
      preferredAgeGroup: 'Adults',
      joinedDate: 'October 2026',
      readingGoal: 15,
      booksRead: 6
    };
    onLogin(demoUser);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      if (isRegisterMode) {
        if (!name.trim() || !email.trim()) {
          setErrorMsg('Please enter your name and email.');
          setIsLoading(false);
          return;
        }

        const newUser = {
          _id: 'user_' + Date.now(),
          name: name.trim(),
          email: email.trim(),
          preferredLanguage,
          preferredAgeGroup,
          joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          readingGoal: 12,
          booksRead: 0
        };

        // Try to persist to backend
        try {
          await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
          });
        } catch (err) {
          // Fallback to local
        }

        onLogin(newUser);
        onClose();
      } else {
        // Sign In
        if (!email.trim()) {
          setErrorMsg('Please enter your email.');
          setIsLoading(false);
          return;
        }

        // Try backend login or create user object
        let loggedUser = null;
        try {
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.trim(), password })
          });
          if (res.ok) {
            const data = await res.json();
            loggedUser = data.user;
          }
        } catch (err) {
          // fallback
        }

        if (!loggedUser) {
          loggedUser = {
            _id: 'user_' + Date.now(),
            name: email.split('@')[0],
            email: email.trim(),
            preferredLanguage: 'English',
            preferredAgeGroup: 'Adults',
            joinedDate: 'October 2026',
            readingGoal: 12,
            booksRead: 3
          };
        }

        onLogin(loggedUser);
        onClose();
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="quiz-modal"
        style={{ maxWidth: 460, padding: 0, overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div style={{ background: '#131921', color: '#fff', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FaBook style={{ color: '#febd69', fontSize: 20 }} />
            <span style={{ fontSize: 18, fontWeight: 800 }}>
              book<span style={{ color: '#febd69', fontStyle: 'italic' }}>verse</span>
            </span>
          </div>
          <button onClick={onClose} style={{ color: '#fff', fontSize: 18, cursor: 'pointer' }}>
            <FaTimes />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px 28px' }}>
          {currentUser ? (
            /* Logged-In Profile View */
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #eee' }}>
                <div style={{
                  width: 54,
                  height: 54,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #febd69, #f3a847)',
                  color: '#131921',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  fontWeight: 800
                }}>
                  {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
                </div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#111', display: 'flex', alignItems: 'center', gap: 6 }}>
                    {currentUser.name}
                    <FaCheckCircle style={{ color: '#007600', fontSize: 14 }} title="Verified Reader" />
                  </h3>
                  <div style={{ fontSize: 13, color: '#666' }}>{currentUser.email}</div>
                  <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>Member since {currentUser.joinedDate || '2026'}</div>
                </div>
              </div>

              {/* Reader Preferences Summary */}
              <div style={{ background: '#f8f9fa', padding: 14, borderRadius: 8, marginBottom: 18, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#555', textTransform: 'uppercase', marginBottom: 8 }}>
                  Reader Profile &amp; Preferences
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 13 }}>
                  <div>
                    <span style={{ color: '#777' }}>Language: </span>
                    <strong>{currentUser.preferredLanguage || 'English'}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#777' }}>Age Group: </span>
                    <strong>{currentUser.preferredAgeGroup || 'Adults'}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#777' }}>2026 Goal: </span>
                    <strong>{currentUser.readingGoal || 12} books</strong>
                  </div>
                  <div>
                    <span style={{ color: '#777' }}>Read so far: </span>
                    <strong>{currentUser.booksRead || 0} books</strong>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                <button
                  className="hero-btn-secondary"
                  style={{ width: '100%', color: '#111', borderColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                  onClick={() => {
                    onClose();
                    if (onOpenOrders) onOpenOrders();
                  }}
                >
                  <FaBoxOpen style={{ color: '#febd69' }} /> View Your Orders &amp; Tracking ({ordersCount})
                </button>

                <button
                  className="hero-btn-secondary"
                  style={{ width: '100%', color: '#111', borderColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                  onClick={() => {
                    onClose();
                    onOpenWishlist();
                  }}
                >
                  <FaHeart style={{ color: '#ff6b81' }} /> View My Reading Shelf
                </button>

                <button
                  className="hero-btn-secondary"
                  style={{ width: '100%', color: '#111', borderColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                  onClick={() => {
                    onClose();
                    onOpenCart();
                  }}
                >
                  <FaShoppingCart /> View My Shopping Cart
                </button>

                <button
                  className="hero-btn-secondary"
                  style={{ width: '100%', color: '#111', borderColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                  onClick={() => {
                    onClose();
                    onOpenQuiz();
                  }}
                >
                  <FaBolt style={{ color: '#f3a847' }} /> Take 30-Sec Book Matcher
                </button>
              </div>

              {/* Sign Out Button */}
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: '#fff',
                  border: '1px solid #d9534f',
                  color: '#d9534f',
                  borderRadius: 6,
                  fontWeight: 700,
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  cursor: 'pointer'
                }}
              >
                <FaSignOutAlt /> Sign Out
              </button>
            </div>
          ) : (
            /* Sign In / Register Form */
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6, color: '#111' }}>
                {isRegisterMode ? 'Create BookVerse Account' : 'Sign in to BookVerse'}
              </h2>
              <p style={{ fontSize: 13, color: '#666', marginBottom: 18 }}>
                {isRegisterMode
                  ? 'Get personalized multilingual recommendations tailored to your reading profile.'
                  : 'Access your reading shelf, wishlist, orders, and personalized picks.'}
              </p>

              {errorMsg && (
                <div style={{ background: '#fde8e8', color: '#c53030', padding: '10px 14px', borderRadius: 6, fontSize: 13, marginBottom: 16 }}>
                  {errorMsg}
                </div>
              )}

              {/* 1-Click Demo Login Banner */}
              {!isRegisterMode && (
                <div style={{ background: '#fff9e6', border: '1px solid #ffd814', padding: 12, borderRadius: 6, marginBottom: 18, textAlign: 'center' }}>
                  <div style={{ fontSize: 12, color: '#774a00', marginBottom: 6, fontWeight: 600 }}>
                    Instant evaluation? Use 1-Click Demo login:
                  </div>
                  <button
                    type="button"
                    onClick={handleDemoLogin}
                    className="hero-btn-primary"
                    style={{ fontSize: 13, padding: '7px 18px', width: '100%' }}
                  >
                    ⚡ Sign in with Demo Account
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {isRegisterMode && (
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                      Your Name
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        placeholder="First and last name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ width: '100%', padding: '9px 12px', borderRadius: 4, border: '1px solid #ccc', fontSize: 14 }}
                      />
                    </div>
                  </div>
                )}

                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 4, border: '1px solid #ccc', fontSize: 14 }}
                  />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 4, border: '1px solid #ccc', fontSize: 14 }}
                  />
                </div>

                {isRegisterMode && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                        Preferred Language
                      </label>
                      <select
                        value={preferredLanguage}
                        onChange={(e) => setPreferredLanguage(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: 4, border: '1px solid #ccc', fontSize: 13 }}
                      >
                        <option value="Tamil">Tamil (தமிழ்)</option>
                        <option value="Hindi">Hindi (हिन्दी)</option>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish (Español)</option>
                        <option value="French">French (Français)</option>
                        <option value="German">German (Deutsch)</option>
                        <option value="Japanese">Japanese (日本語)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                        Age Group
                      </label>
                      <select
                        value={preferredAgeGroup}
                        onChange={(e) => setPreferredAgeGroup(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: 4, border: '1px solid #ccc', fontSize: 13 }}
                      >
                        <option value="Kids">Kids (0-8 yrs)</option>
                        <option value="Pre-Teens">Pre-Teens (9-12 yrs)</option>
                        <option value="Young Adult">Young Adult (13-18 yrs)</option>
                        <option value="Adults">Adults (18+ yrs)</option>
                        <option value="All Ages">Family &amp; Seniors</option>
                      </select>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="hero-btn-primary"
                  style={{ width: '100%', padding: 11, fontSize: 14, marginBottom: 14 }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : isRegisterMode ? 'Create your BookVerse account' : 'Sign In'}
                </button>
              </form>

              <div style={{ borderTop: '1px solid #eee', paddingTop: 14, textAlign: 'center', fontSize: 13 }}>
                {isRegisterMode ? (
                  <span>
                    Already have an account?{' '}
                    <span
                      onClick={() => setIsRegisterMode(false)}
                      style={{ color: '#007185', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Sign In
                    </span>
                  </span>
                ) : (
                  <span>
                    New to BookVerse?{' '}
                    <span
                      onClick={() => setIsRegisterMode(true)}
                      style={{ color: '#007185', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Create your account
                    </span>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

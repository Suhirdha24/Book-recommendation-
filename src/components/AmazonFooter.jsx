import React from 'react';
import { FaBook, FaGlobe } from 'react-icons/fa';

const AmazonFooter = ({ onScrollToTop, onSelectLanguage }) => {
  return (
    <footer className="amazon-footer">
      {/* Back to top banner */}
      <div className="footer-back-to-top" onClick={onScrollToTop}>
        Back to top ↑
      </div>

      {/* Directory Columns */}
      <div className="footer-columns">
        <div>
          <h4 className="footer-col-title">Get to Know Us</h4>
          <ul className="footer-col-list">
            <li><a href="#about" onClick={(e) => e.preventDefault()}>About BookVerse</a></li>
            <li><a href="#careers" onClick={(e) => e.preventDefault()}>Careers &amp; Editorial</a></li>
            <li><a href="#press" onClick={(e) => e.preventDefault()}>Press Releases</a></li>
            <li><a href="#science" onClick={(e) => e.preventDefault()}>BookVerse Science &amp; AI Recommendation</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">Connect with Us</h4>
          <ul className="footer-col-list">
            <li><a href="#facebook" onClick={(e) => e.preventDefault()}>Facebook Book Club</a></li>
            <li><a href="#twitter" onClick={(e) => e.preventDefault()}>Twitter / X @BookVerse</a></li>
            <li><a href="#instagram" onClick={(e) => e.preventDefault()}>Instagram @BookVerseReads</a></li>
            <li><a href="#goodreads" onClick={(e) => e.preventDefault()}>Goodreads Community</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">Make Money with Us</h4>
          <ul className="footer-col-list">
            <li><a href="#sell" onClick={(e) => e.preventDefault()}>Sell on BookVerse</a></li>
            <li><a href="#kdp" onClick={(e) => e.preventDefault()}>BookVerse Author Publishing</a></li>
            <li><a href="#affiliate" onClick={(e) => e.preventDefault()}>Become an Affiliate</a></li>
            <li><a href="#advertise" onClick={(e) => e.preventDefault()}>Advertise Your Books</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">Let Us Help You</h4>
          <ul className="footer-col-list">
            <li><a href="#account" onClick={(e) => e.preventDefault()}>Your Account &amp; Orders</a></li>
            <li><a href="#returns" onClick={(e) => e.preventDefault()}>Returns &amp; Replacements</a></li>
            <li><a href="#protection" onClick={(e) => e.preventDefault()}>100% Purchase Protection</a></li>
            <li><a href="#help" onClick={(e) => e.preventDefault()}>Help &amp; Customer Care</a></li>
          </ul>
        </div>
      </div>

      {/* Language Bar in Footer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '20px 16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, color: '#febd69', fontSize: 16 }}>
          <FaBook /> book<span style={{ fontStyle: 'italic', color: '#fff' }}>verse</span>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', fontSize: 12 }}>
          <FaGlobe style={{ color: '#aaa', marginRight: 4 }} />
          {[
            { name: 'English', label: 'English' },
            { name: 'Tamil', label: 'தமிழ்' },
            { name: 'Hindi', label: 'हिन्दी' },
            { name: 'Spanish', label: 'Español' },
            { name: 'French', label: 'Français' },
            { name: 'German', label: 'Deutsch' },
            { name: 'Japanese', label: '日本語' }
          ].map(l => (
            <button
              key={l.name}
              onClick={() => onSelectLanguage(l.name)}
              style={{
                color: '#ddd',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '3px 8px',
                borderRadius: 4,
                fontSize: 12
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Footer Bottom Legal */}
      <div className="footer-bottom">
        <p>© 2026 BookVerse Multilingual Book Recommendation Inc. or its affiliates. Designed with rich recommendation AI for every age and language.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8, fontSize: 11 }}>
          <a href="#terms" onClick={(e) => e.preventDefault()} style={{ color: '#999' }}>Conditions of Use</a>
          <a href="#privacy" onClick={(e) => e.preventDefault()} style={{ color: '#999' }}>Privacy Notice</a>
          <a href="#interest" onClick={(e) => e.preventDefault()} style={{ color: '#999' }}>Interest-Based Ads</a>
        </div>
      </div>
    </footer>
  );
};

export default AmazonFooter;

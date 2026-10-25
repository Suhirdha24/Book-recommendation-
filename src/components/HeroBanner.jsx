import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaGlobeAsia, FaBookReader, FaMagic } from 'react-icons/fa';

const slides = [
  {
    id: 1,
    tag: 'GLOBAL MULTILINGUAL STORE',
    title: 'The World of Books in Every Language',
    desc: 'Explore rich literature in Tamil, Hindi, English, Spanish, French, German, and Japanese. Discover native voices, translations, and timeless classics.',
    bgImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&auto=format&fit=crop&q=80',
    primaryBtn: 'Explore Languages',
    secondaryBtn: 'View Tamil & Hindi Masterpieces',
    filterAction: 'multilingual',
    icon: <FaGlobeAsia />
  },
  {
    id: 2,
    tag: 'FOR EVERY GENERATION',
    title: 'Books Tailored for Every Age Group',
    desc: 'From illustrated bedtime tales for toddlers (0-8) to young adult adventures (13-18) and profound philosophy for lifelong readers.',
    bgImage: 'https://images.unsplash.com/photo-1507842229451-7f01be8610ce?w=1600&auto=format&fit=crop&q=80',
    primaryBtn: 'Browse by Age Group',
    secondaryBtn: 'Kids Corner & Bedtime Stories',
    filterAction: 'ageGroup',
    icon: <FaBookReader />
  },
  {
    id: 3,
    tag: 'AI RECOMMENDATION ENGINE',
    title: 'Find Your Next Favorite Read in 30 Seconds',
    desc: 'Our intelligent recommendation engine analyzes your favorite themes, reading pace, and preferred language to suggest books you will genuinely fall in love with.',
    bgImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1600&auto=format&fit=crop&q=80',
    primaryBtn: 'Take 30-Sec Quiz ⚡',
    secondaryBtn: 'See Top Bestsellers',
    filterAction: 'quiz',
    icon: <FaMagic />
  }
];

const HeroBanner = ({ onOpenQuiz, onFilterLanguage, onFilterAgeGroup }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleAction = (slide, type) => {
    if (slide.filterAction === 'quiz') {
      onOpenQuiz();
    } else if (slide.filterAction === 'multilingual') {
      if (type === 'primary') onFilterLanguage('All');
      else onFilterLanguage('Tamil');
    } else if (slide.filterAction === 'ageGroup') {
      if (type === 'primary') onFilterAgeGroup('Young Adult');
      else onFilterAgeGroup('Kids');
    }
  };

  return (
    <div className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.bgImage})` }}
        >
          <div className="hero-overlay" />
          <div className="hero-content">
            <span className="hero-tag">
              <span style={{ marginRight: 6 }}>{slide.icon}</span>
              {slide.tag}
            </span>
            <h1 className="hero-title">{slide.title}</h1>
            <p className="hero-desc">{slide.desc}</p>
            <div className="hero-actions">
              <button
                className="hero-btn-primary"
                onClick={() => handleAction(slide, 'primary')}
              >
                {slide.primaryBtn}
              </button>
              <button
                className="hero-btn-secondary"
                onClick={() => handleAction(slide, 'secondary')}
              >
                {slide.secondaryBtn}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button className="hero-nav-arrow left" onClick={handlePrev} aria-label="Previous Slide">
        <FaChevronLeft />
      </button>
      <button className="hero-nav-arrow right" onClick={handleNext} aria-label="Next Slide">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default HeroBanner;

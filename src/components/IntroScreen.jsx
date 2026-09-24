import React from 'react';

const PHASE_CARDS = [
  {
    id: 'wonder',
    emoji: '🤔',
    title: 'Wonder',
    subtitle: 'The Glitched Data Wall',
  },
  {
    id: 'story',
    emoji: '📖',
    title: 'Story & Learn',
    subtitle: '8 Panels + 5 Concept Cards',
  },
  {
    id: 'simulate',
    emoji: '🧪',
    title: 'Simulate',
    subtitle: '4 Interactive Stations',
  },
  {
    id: 'practice',
    emoji: '🎮',
    title: 'Practice',
    subtitle: '100 Challenges',
  },
  {
    id: 'reflect',
    emoji: '📓',
    title: 'Reflect',
    subtitle: 'Journal & Certificate',
  },
];

export default function IntroScreen({ onStart, onSelectPhase }) {
  return (
    <div className="intro-screen-layout">
      {/* Top Grade Pill */}
      <div className="grade-badge-pill">
        <span>✨ Grade 7 Math</span>
      </div>

      {/* Main Title & Subtitle */}
      <h1 className="hero-main-title">Bar, Line &amp; Pie Charts</h1>
      <h2 className="hero-subtitle">Reading, Building &amp; Choosing Data Displays</h2>

      {/* Intro Description Box */}
      <div className="hero-description-box">
        <p>
          Join the Global Data Explorers to repair the World Youth Festival Data Wall!
          Master single &amp; double bar charts, time-series line graphs, pie chart sector angles, and catch misleading graphs! 📊🌍
        </p>
      </div>

      {/* 5 Phase Cards Row */}
      <div className="phase-cards-row">
        {PHASE_CARDS.map((card) => (
          <div
            key={card.id}
            className="home-phase-card"
            onClick={() => onSelectPhase ? onSelectPhase(card.id) : onStart()}
          >
            <div className="phase-card-emoji">{card.emoji}</div>
            <h3 className="phase-card-title">{card.title}</h3>
            <span className="phase-card-subtitle">{card.subtitle}</span>
          </div>
        ))}
      </div>

      {/* Main CTA Button */}
      <button className="btn-begin-journey" onClick={onStart}>
        <span className="rocket-icon">🚀</span>
        <span>Begin Your Journey!</span>
      </button>

      {/* Bottom Feature Tags */}
      <div className="bottom-feature-tags">
        <div className="feature-tag-pill">
          <span>🎯 100 Questions</span>
        </div>
        <div className="feature-tag-pill">
          <span>📊 Bar, Line &amp; Pie</span>
        </div>
        <div className="feature-tag-pill">
          <span>🏆 Badges &amp; XP</span>
        </div>
      </div>
    </div>
  );
}

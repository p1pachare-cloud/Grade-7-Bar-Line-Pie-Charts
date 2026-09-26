import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, MapPin, Sparkles, BookOpen, CheckCircle, ZoomIn, X, Maximize2 } from 'lucide-react';
import Mascot from '../Mascot';
import ConceptCard from '../learn/ConceptCard';
import { STORY_PANELS, CONCEPT_CARDS } from '../../data/storyContent';
import { getStoryNarration } from '../../utils/narration';
import { narrate } from '../../utils/audio';

export default function StoryPhase({ onNext, audioEnabled, onConceptCardsSeen }) {
  const [panelIndex, setPanelIndex] = useState(0);
  const [activeConceptCard, setActiveConceptCard] = useState(null);
  const [completedConceptCards, setCompletedConceptCards] = useState({});
  const [imageZoomed, setImageZoomed] = useState(false);
  const [imgError, setImgError] = useState(false);

  const panel = STORY_PANELS[panelIndex];

  useEffect(() => {
    setImgError(false);
    setImageZoomed(false);
    narrate(getStoryNarration(panelIndex), audioEnabled);
  }, [panelIndex, audioEnabled]);

  const handleNextPanel = () => {
    if (panelIndex < STORY_PANELS.length - 1) {
      setPanelIndex((prev) => prev + 1);
    } else {
      onNext();
    }
  };

  const handlePrevPanel = () => {
    if (panelIndex > 0) {
      setPanelIndex((prev) => prev - 1);
    }
  };

  const handleOpenConceptCard = () => {
    if (panel.hasConceptCard && panel.conceptCardId) {
      setActiveConceptCard(CONCEPT_CARDS[panel.conceptCardId]);
    }
  };

  const handleCompleteConceptCard = (cardId) => {
    setCompletedConceptCards((prev) => {
      const updated = { ...prev, [cardId]: true };
      if (onConceptCardsSeen) {
        onConceptCardsSeen(Object.keys(updated).length >= 5);
      }
      return updated;
    });
  };

  const isCardCompleted = panel.conceptCardId && completedConceptCards[panel.conceptCardId];

  return (
    <div className="phase-container story-phase">
      <div className="glass-card phase-card">
        {/* Header with Panel Dots */}
        <div className="phase-header">
          <div className="phase-header-left">
            <span className="phase-tag">PHASE 2 — STORY &amp; LEARN</span>
            <h2>The Global Data Explorers Club</h2>
          </div>
          <div className="panel-dots">
            {STORY_PANELS.map((p, idx) => (
              <button
                key={p.id}
                className={`panel-dot ${idx === panelIndex ? 'active' : ''}`}
                onClick={() => setPanelIndex(idx)}
                title={`Panel ${idx + 1}: ${p.title}`}
                aria-label={`Panel ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Story Content Split */}
        <div className="story-content-wrapper">
          {/* Visual Scene Graphic */}
          <div className="story-visual-card">
            <div className="story-card-top-bar">
              <div className="story-location-badge">
                <MapPin size={16} />
                <span>{panel.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>
                  {panel.character}
                </span>
                {panel.image && !imgError && (
                  <button
                    className="zoom-image-pill-btn"
                    onClick={() => setImageZoomed(true)}
                    title="Click to enlarge image"
                    aria-label="Enlarge image"
                  >
                    <Maximize2 size={13} />
                    <span>Enlarge</span>
                  </button>
                )}
              </div>
            </div>

            <div className="visual-graphic-container">
              {panel.image && !imgError ? (
                <div
                  className="story-image-viewport"
                  onClick={() => setImageZoomed(true)}
                  title="Click to inspect in high resolution"
                >
                  <img
                    key={panel.image}
                    src={panel.image}
                    alt={panel.title}
                    className="story-panel-img"
                    onError={() => setImgError(true)}
                  />
                  <div className="story-image-hover-hint">
                    <ZoomIn size={15} />
                    <span>Click to expand</span>
                  </div>
                </div>
              ) : (
                <>
                  {panelIndex === 0 && (
                    <svg viewBox="0 0 320 200" width="100%" height="200">
                      <rect width="320" height="200" rx="12" fill="#0d0a2d" />
                      <circle cx="160" cy="100" r="60" fill="none" stroke="#7c5cbf" strokeWidth="2" strokeDasharray="4 4" />
                      {[
                        { x: 50, y: 50, label: 'John (Toronto)' },
                        { x: 160, y: 40, label: 'Mike (New York)' },
                        { x: 270, y: 50, label: 'Emma (Sydney)' },
                        { x: 70, y: 150, label: 'Liam (Cape Town)' },
                        { x: 160, y: 160, label: 'Sofia (Paris)' },
                        { x: 250, y: 150, label: 'Aisha (Cairo)' },
                      ].map((node, i) => (
                        <g key={i}>
                          <circle cx={node.x} cy={node.y} r="18" fill="#1b1547" stroke="#00e5ff" strokeWidth="2" />
                          <circle cx={node.x} cy={node.y - 4} r="6" fill="#ffd54f" />
                          <path d={`M ${node.x - 10} ${node.y + 12} Q ${node.x} ${node.y + 2} ${node.x + 10} ${node.y + 12}`} fill="#ff4081" />
                          <text x={node.x} y={node.y + 28} fill="white" fontSize="9" textAnchor="middle">{node.label.split(' ')[0]}</text>
                        </g>
                      ))}
                      <text x="160" y="105" fill="#00e5ff" fontSize="12" fontWeight="bold" textAnchor="middle">Global Data Call</text>
                    </svg>
                  )}

                  {panelIndex === 1 && (
                    <svg viewBox="0 0 320 200" width="100%" height="200">
                      <rect width="320" height="200" rx="12" fill="#09061d" />
                      <rect x="25" y="25" width="270" height="150" rx="8" fill="#14103c" stroke="#ff4081" strokeWidth="2" />
                      <text x="160" y="55" fill="#ffd54f" fontSize="14" fontWeight="bold" textAnchor="middle">⚡ DATA WALL GLITCHED ⚡</text>
                      <rect x="50" y="90" width="20" height="60" fill="#ef5350" />
                      <rect x="80" y="70" width="20" height="80" fill="#00e5ff" />
                      <line x1="120" y1="140" x2="200" y2="70" stroke="#ffd54f" strokeWidth="3" strokeDasharray="4 2" />
                      <circle cx="250" cy="110" r="30" fill="none" stroke="#00e676" strokeWidth="6" strokeDasharray="30 20 40 10" />
                    </svg>
                  )}

                  {panelIndex === 2 && (
                    <svg viewBox="0 0 320 200" width="100%" height="200">
                      <rect width="320" height="200" rx="12" fill="#0d0a2d" />
                      <text x="160" y="25" fill="#ffd54f" fontSize="12" fontWeight="bold" textAnchor="middle">Sydney Festival: Activity Counts</text>
                      <line x1="45" y1="160" x2="290" y2="160" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                      <line x1="45" y1="35" x2="45" y2="160" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                      <text x="35" y="50" fill="white" fontSize="10" textAnchor="end">40</text>
                      <text x="35" y="90" fill="white" fontSize="10" textAnchor="end">25</text>
                      <text x="35" y="125" fill="white" fontSize="10" textAnchor="end">15</text>
                      <rect x="65" y="45" width="40" height="115" fill="#00e5ff" rx="4" />
                      <text x="85" y="178" fill="white" fontSize="11" textAnchor="middle">Football (40)</text>
                      <rect x="125" y="88" width="40" height="72" fill="#ffc107" rx="4" />
                      <text x="145" y="178" fill="white" fontSize="11" textAnchor="middle">Dance (25)</text>
                      <rect x="185" y="117" width="40" height="43" fill="#ff4081" rx="4" />
                      <text x="205" y="178" fill="white" fontSize="11" textAnchor="middle">Chess (15)</text>
                      <rect x="245" y="74" width="40" height="86" fill="#00e676" rx="4" />
                      <text x="265" y="178" fill="white" fontSize="11" textAnchor="middle">Art (30)</text>
                    </svg>
                  )}

                  {panelIndex === 3 && (
                    <svg viewBox="0 0 320 200" width="100%" height="200">
                      <rect width="320" height="200" rx="12" fill="#0d0a2d" />
                      <text x="160" y="24" fill="#ffd54f" fontSize="12" fontWeight="bold" textAnchor="middle">Cape Town: Double Bar Comparison</text>
                      <rect x="80" y="34" width="12" height="12" fill="#00e5ff" rx="2" />
                      <text x="96" y="44" fill="white" fontSize="10">School 1</text>
                      <rect x="170" y="34" width="12" height="12" fill="#ffc107" rx="2" />
                      <text x="186" y="44" fill="white" fontSize="10">School 2</text>
                      <line x1="45" y1="160" x2="290" y2="160" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                      <line x1="45" y1="55" x2="45" y2="160" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                      <rect x="65" y="75" width="22" height="85" fill="#00e5ff" rx="2" />
                      <rect x="89" y="95" width="22" height="65" fill="#ffc107" rx="2" />
                      <text x="88" y="176" fill="white" fontSize="11" textAnchor="middle">Sports</text>
                      <rect x="145" y="65" width="22" height="95" fill="#00e5ff" rx="2" />
                      <rect x="169" y="80" width="22" height="80" fill="#ffc107" rx="2" />
                      <text x="168" y="176" fill="white" fontSize="11" textAnchor="middle">Music</text>
                      <rect x="225" y="105" width="22" height="55" fill="#00e5ff" rx="2" />
                      <rect x="249" y="70" width="22" height="90" fill="#ffc107" rx="2" />
                      <text x="248" y="176" fill="white" fontSize="11" textAnchor="middle">Science</text>
                    </svg>
                  )}

                  {panelIndex === 4 && (
                    <svg viewBox="0 0 320 200" width="100%" height="200">
                      <rect width="320" height="200" rx="12" fill="#0d0a2d" />
                      <text x="160" y="24" fill="#ffd54f" fontSize="12" fontWeight="bold" textAnchor="middle">Cairo: Stage Temperature Line Graph</text>
                      <line x1="45" y1="160" x2="295" y2="160" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                      <line x1="45" y1="35" x2="45" y2="160" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                      <polyline
                        points="60,130 110,85 160,60 210,100 260,140"
                        fill="none"
                        stroke="#00e5ff"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      {[{x:60,y:130,l:'10 AM'}, {x:110,y:85,l:'12 PM'}, {x:160,y:60,l:'2 PM'}, {x:210,y:100,l:'4 PM'}, {x:260,y:140,l:'6 PM'}].map((pt, i) => (
                        <g key={i}>
                          <circle cx={pt.x} cy={pt.y} r="5" fill="#ffc107" />
                          <text x={pt.x} y="178" fill="white" fontSize="10" textAnchor="middle">{pt.l}</text>
                        </g>
                      ))}
                      <text x="160" y="50" fill="#00e676" fontSize="11" fontWeight="bold" textAnchor="middle">Peak at 2 PM!</text>
                    </svg>
                  )}

                  {panelIndex === 5 && (
                    <svg viewBox="0 0 320 200" width="100%" height="200">
                      <rect width="320" height="200" rx="12" fill="#0d0a2d" />
                      <text x="160" y="24" fill="#ffd54f" fontSize="12" fontWeight="bold" textAnchor="middle">Paris: 200 Snack Votes (360° Total)</text>
                      <g transform="translate(160, 110)">
                        <circle cx="0" cy="0" r="65" fill="#0c0926" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                        <path d="M 0 0 L 0 -65 A 65 65 0 0 1 65 0 Z" fill="#00e5ff" />
                        <text x="30" y="-24" fill="#060517" fontSize="11" fontWeight="bold">90° (Crêpe)</text>
                        <path d="M 0 0 L 65 0 A 65 65 0 0 1 -38 52 Z" fill="#ffc107" />
                        <text x="10" y="35" fill="#060517" fontSize="11" fontWeight="bold">144° (Pretzel)</text>
                        <path d="M 0 0 L -38 52 A 65 65 0 0 1 -62 -20 Z" fill="#ff4081" />
                        <text x="-48" y="20" fill="white" fontSize="10" fontWeight="bold">72°</text>
                        <path d="M 0 0 L -62 -20 A 65 65 0 0 1 0 -65 Z" fill="#00e676" />
                        <text x="-36" y="-35" fill="#060517" fontSize="10" fontWeight="bold">54°</text>
                      </g>
                    </svg>
                  )}

                  {panelIndex === 6 && (
                    <svg viewBox="0 0 320 200" width="100%" height="200">
                      <rect width="320" height="200" rx="12" fill="#0d0a2d" />
                      <text x="160" y="24" fill="#ef5350" fontSize="12" fontWeight="bold" textAnchor="middle">⚠️ Mexico City: Trickster Chart Spotted!</text>
                      <line x1="55" y1="160" x2="280" y2="160" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                      <line x1="55" y1="45" x2="55" y2="160" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                      <text x="48" y="158" fill="#ef5350" fontSize="11" fontWeight="bold" textAnchor="end">50 (Broken Axis!)</text>
                      <text x="48" y="60" fill="white" fontSize="10" textAnchor="end">55</text>
                      <rect x="90" y="110" width="45" height="50" fill="#00e5ff" rx="3" />
                      <text x="112" y="100" fill="white" fontSize="11" textAnchor="middle">52 votes</text>
                      <rect x="180" y="55" width="45" height="105" fill="#ffc107" rx="3" />
                      <text x="202" y="45" fill="white" fontSize="11" textAnchor="middle">54 votes</text>
                      <text x="160" y="186" fill="#ef5350" fontSize="11" fontWeight="bold" textAnchor="middle">54 looks 2x bigger than 52 due to missing zero!</text>
                    </svg>
                  )}

                  {panelIndex === 7 && (
                    <svg viewBox="0 0 320 200" width="100%" height="200">
                      <rect width="320" height="200" rx="12" fill="#0d0a2d" />
                      <text x="160" y="30" fill="#00e676" fontSize="14" fontWeight="bold" textAnchor="middle">🎉 ALL CHARTS RESTORED! 🎉</text>
                      <g transform="translate(60, 60)">
                        <rect width="50" height="40" fill="#1b1547" stroke="#00e5ff" strokeWidth="1.5" rx="4" />
                        <rect x="8" y="15" width="8" height="20" fill="#00e5ff" />
                        <rect x="20" y="10" width="8" height="25" fill="#ffc107" />
                        <rect x="32" y="5" width="8" height="30" fill="#00e676" />
                      </g>
                      <g transform="translate(135, 60)">
                        <rect width="50" height="40" fill="#1b1547" stroke="#ffd54f" strokeWidth="1.5" rx="4" />
                        <polyline points="8,30 20,15 35,22 44,10" fill="none" stroke="#00e5ff" strokeWidth="2" />
                      </g>
                      <g transform="translate(210, 60)">
                        <rect width="50" height="40" fill="#1b1547" stroke="#ff4081" strokeWidth="1.5" rx="4" />
                        <circle cx="25" cy="20" r="14" fill="#0c0a2a" stroke="white" strokeWidth="1" />
                        <path d="M 25 20 L 25 6 A 14 14 0 0 1 39 20 Z" fill="#00e5ff" />
                      </g>
                      <text x="160" y="145" fill="white" fontSize="12" textAnchor="middle">Ready for the 4 Simulation Stations!</text>
                    </svg>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Narrative & Concept Card Button */}
          <div className="story-text-card">
            <div>
              <h3 className="story-panel-title">{panel.title}</h3>
              <p className="story-body-text">{panel.text}</p>
            </div>

            {/* Concept Card Callout */}
            {panel.hasConceptCard && (
              <div className="concept-card-callout-btn" onClick={handleOpenConceptCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <BookOpen size={24} color="#ffd54f" />
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#ffd54f' }}>
                      {CONCEPT_CARDS[panel.conceptCardId].title}
                    </h4>
                    <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>
                      {isCardCompleted ? 'Completed ✓ (Tap to review)' : 'Tap to unlock required Concept Card!'}
                    </span>
                  </div>
                </div>
                {isCardCompleted && <CheckCircle size={20} color="#00e676" />}
              </div>
            )}

            {/* Nav controls */}
            <div className="story-nav-buttons">
              <button
                className="btn btn-outline"
                onClick={handlePrevPanel}
                disabled={panelIndex === 0}
              >
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>

              <button className="btn btn-primary" onClick={handleNextPanel}>
                <span>{panelIndex === STORY_PANELS.length - 1 ? 'Enter Simulation Stations' : 'Next Panel'}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Modal when Concept Card is open */}
        {activeConceptCard && (
          <ConceptCard
            card={activeConceptCard}
            onClose={() => setActiveConceptCard(null)}
            onComplete={() => handleCompleteConceptCard(activeConceptCard.id)}
          />
        )}

        {/* Modal when Story Image is Enlarged */}
        {imageZoomed && panel.image && !imgError && (
          <div className="image-lightbox-backdrop" onClick={() => setImageZoomed(false)}>
            <div className="image-lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="image-lightbox-close"
                onClick={() => setImageZoomed(false)}
                aria-label="Close enlarged illustration"
              >
                <X size={24} />
              </button>
              <img
                src={panel.image}
                alt={panel.title}
                className="image-lightbox-img"
              />
              <div className="image-lightbox-footer">
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', color: '#ffd54f' }}>{panel.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>
                    {panel.location} • {panel.character}
                  </p>
                </div>
                <button className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '0.85rem' }} onClick={() => setImageZoomed(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

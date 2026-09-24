import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import Mascot from '../Mascot';
import { wonderNarration } from '../../utils/narration';
import { narrate } from '../../utils/audio';

export default function WonderPhase({ onNext, audioEnabled }) {
  const [selectedChart, setSelectedChart] = useState(null); // 'bar' | 'line' | 'pie'

  useEffect(() => {
    narrate(wonderNarration(), audioEnabled);
  }, [audioEnabled]);

  const handleSelect = (type) => {
    setSelectedChart(type);
  };

  const isLine = selectedChart === 'line';

  return (
    <div className="phase-container wonder-phase">
      <div className="glass-card phase-card">
        <div className="phase-header">
          <div>
            <span className="phase-tag">PHASE 1 — WONDER</span>
            <h2>The Glitched Data Wall Mystery</h2>
          </div>
          <Mascot mood={selectedChart ? (isLine ? 'celebrating' : 'thinking') : 'curious'} size="small" />
        </div>

        <div className="wonder-content-grid">
          {/* Visual Data Wall with 3 Unlabeled Charts */}
          <div className="wonder-visual-panel">
            <div className="wonder-wall-title">
              <Sparkles size={18} />
              <span>World Youth Festival — Live Data Wall</span>
            </div>

            <div className="wonder-charts-grid">
              {/* Option 1: Bar Chart */}
              <div
                className={`wonder-chart-choice-card ${selectedChart === 'bar' ? 'selected' : ''}`}
                onClick={() => handleSelect('bar')}
              >
                <div className="wonder-chart-preview">
                  <svg viewBox="0 0 100 80" width="90" height="72">
                    <line x1="10" y1="70" x2="90" y2="70" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                    <line x1="10" y1="10" x2="10" y2="70" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                    <rect x="18" y="35" width="12" height="35" fill="#00e5ff" rx="2" />
                    <rect x="36" y="20" width="12" height="50" fill="#ffc107" rx="2" />
                    <rect x="54" y="45" width="12" height="25" fill="#ff4081" rx="2" />
                    <rect x="72" y="15" width="12" height="55" fill="#00e676" rx="2" />
                  </svg>
                </div>
                <span className="wonder-chart-label">Chart A</span>
              </div>

              {/* Option 2: Line Graph */}
              <div
                className={`wonder-chart-choice-card ${selectedChart === 'line' ? 'selected' : ''}`}
                onClick={() => handleSelect('line')}
              >
                <div className="wonder-chart-preview">
                  <svg viewBox="0 0 100 80" width="90" height="72">
                    <line x1="10" y1="70" x2="90" y2="70" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                    <line x1="10" y1="10" x2="10" y2="70" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                    <polyline
                      points="16,58 35,40 55,50 75,20 88,28"
                      fill="none"
                      stroke="#00e5ff"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <circle cx="16" cy="58" r="3.5" fill="#ffc107" />
                    <circle cx="35" cy="40" r="3.5" fill="#ffc107" />
                    <circle cx="55" cy="50" r="3.5" fill="#ffc107" />
                    <circle cx="75" cy="20" r="3.5" fill="#ffc107" />
                    <circle cx="88" cy="28" r="3.5" fill="#ffc107" />
                  </svg>
                </div>
                <span className="wonder-chart-label">Chart B</span>
              </div>

              {/* Option 3: Pie Chart */}
              <div
                className={`wonder-chart-choice-card ${selectedChart === 'pie' ? 'selected' : ''}`}
                onClick={() => handleSelect('pie')}
              >
                <div className="wonder-chart-preview">
                  <svg viewBox="0 0 80 80" width="72" height="72">
                    <circle cx="40" cy="40" r="32" fill="#0d0a2d" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                    <path d="M 40 40 L 40 8 A 32 32 0 0 1 72 40 Z" fill="#00e5ff" />
                    <path d="M 40 40 L 72 40 A 32 32 0 0 1 50 71 Z" fill="#ffc107" />
                    <path d="M 40 40 L 50 71 A 32 32 0 0 1 12 56 Z" fill="#ff4081" />
                    <path d="M 40 40 L 12 56 A 32 32 0 0 1 40 8 Z" fill="#00e676" />
                  </svg>
                </div>
                <span className="wonder-chart-label">Chart C</span>
              </div>
            </div>
          </div>

          {/* Narrative & Prompt */}
          <div className="wonder-text-panel">
            <div className="wonder-narrative">
              <p>
                Mike in New York is staring at the festival's Data Wall. Three charts are glowing, but every label has vanished.
              </p>
              <p className="highlight-text">
                One chart shows how the crowd changed through the day. Which one is it?
              </p>
            </div>

            {selectedChart && (
              <div className="wonder-feedback-box">
                {isLine ? (
                  <p>
                    🎉 <strong>Spot on!</strong> Chart B is a <strong>Line Graph</strong>. Line graphs connect points across time to reveal rises, drops, and trends — exactly what is needed for crowd changes through the day!
                  </p>
                ) : (
                  <p>
                    💡 <strong>Great observation!</strong> But notice: {selectedChart === 'bar' ? 'bars compare distinct separate categories' : 'pie charts show shares of a fixed 100% whole'}. To track how something changes <em>over time</em>, a <strong>Line Graph (Chart B)</strong> is the champion display!
                  </p>
                )}
              </div>
            )}

            <button
              className="btn btn-primary next-phase-btn"
              onClick={onNext}
              disabled={!selectedChart}
            >
              <span>Explore Story &amp; Learn Phase</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

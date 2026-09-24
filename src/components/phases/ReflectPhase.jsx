import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, RotateCcw, Share2, Award } from 'lucide-react';
import Mascot from '../Mascot';
import { BADGES } from '../../utils/badgeEngine';
import { reflectNarration } from '../../utils/narration';
import { narrate } from '../../utils/audio';

export default function ReflectPhase({
  onRestart,
  audioEnabled,
  xp,
  worldScores,
  unlockedBadges = []
}) {
  const [reflectionText, setReflectionText] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    narrate(reflectNarration(), audioEnabled);
  }, [audioEnabled]);

  const handleSaveJournal = () => {
    setSaved(true);
  };

  const totalCorrect = worldScores.reduce((sum, ws) => sum + (ws || 0), 0);

  return (
    <div className="phase-container reflect-phase">
      <div className="glass-card phase-card">
        <div className="phase-header">
          <span className="phase-tag">PHASE 5 — REFLECT</span>
          <h2>Lesson Completion &amp; Data Journal</h2>
        </div>

        <div className="completion-certificate-card glass-card">
          <div className="cert-header">
            <Mascot mood="celebrating" size="large" />
            <div>
              <h1 className="cert-title">Global Data Explorer Champion!</h1>
              <p className="cert-subtitle">Bar, Line &amp; Pie Charts — Grade 7 Mathematics</p>
            </div>
          </div>

          <div className="cert-stats-row">
            <div className="cert-stat-box">
              <span className="stat-value">{xp}</span>
              <span className="stat-label">Total XP</span>
            </div>
            <div className="cert-stat-box">
              <span className="stat-value">{totalCorrect}/100</span>
              <span className="stat-label">Questions Correct</span>
            </div>
            <div className="cert-stat-box">
              <span className="stat-value">{unlockedBadges.length}/{BADGES.length}</span>
              <span className="stat-label">Badges Unlocked</span>
            </div>
          </div>

          {/* Badges Panel */}
          <div className="badges-grid-container">
            <h3>🏅 Badges Earned</h3>
            <div className="badges-flex-row">
              {BADGES.map((badge) => {
                const isUnlocked = unlockedBadges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`badge-chip-card ${isUnlocked ? 'badge-unlocked' : 'badge-locked'}`}
                    title={badge.description}
                  >
                    <span className="badge-icon">{badge.label.slice(0, 2)}</span>
                    <span className="badge-name">{badge.label.slice(3)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reflect Journal Prompt */}
          <div className="reflection-journal-box">
            <h3>📓 Data Explorer Reflection Journal</h3>
            <p>
              "Think of something in your own life you could measure for a week (like daily steps, study hours, or snack preferences). Which chart would you use to show it, and why?"
            </p>
            <textarea
              className="journal-textarea"
              rows="4"
              placeholder="Write your mathematical reflection here..."
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
            />
            <div className="journal-actions">
              <button
                className="btn btn-primary btn-sm"
                onClick={handleSaveJournal}
                disabled={!reflectionText.trim()}
              >
                <CheckCircle2 size={16} />
                <span>{saved ? 'Journal Saved! ✓' : 'Save Reflection'}</span>
              </button>
            </div>
          </div>

          <div className="reflect-footer-buttons">
            <button className="btn btn-outline" onClick={onRestart}>
              <RotateCcw size={18} />
              <span>Restart Journey</span>
            </button>
            <button className="btn btn-primary" onClick={() => window.print()}>
              <Share2 size={18} />
              <span>Share / Print Certificate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

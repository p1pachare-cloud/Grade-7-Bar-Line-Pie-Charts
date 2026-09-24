import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, Sparkles, ArrowRight } from 'lucide-react';
import Mascot from '../Mascot';

export default function FeedbackOverlay({
  isCorrect,
  explanation,
  xpEarned = 0,
  onContinue
}) {
  // Listen for Enter or Space to quickly advance
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onContinue();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onContinue]);

  if (isCorrect) {
    return (
      <div className="feedback-overlay-backdrop correct-backdrop-compact">
        <div className="feedback-modal-compact glass-card correct-card">
          <div className="feedback-compact-content">
            <div className="feedback-compact-indicator">
              <CheckCircle2 size={24} className="icon-correct-mini" />
              <span className="feedback-compact-title">Good! 🎉</span>
              {xpEarned > 0 && (
                <span className="mini-xp-pill">
                  <Sparkles size={14} />
                  +{xpEarned} XP
                </span>
              )}
            </div>
            <button className="btn btn-primary btn-compact-continue" onClick={onContinue} autoFocus>
              <span>Continue</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // When incorrect after attempts (review explanation)
  return (
    <div className="feedback-overlay-backdrop incorrect-bg">
      <div className="feedback-modal glass-card">
        <Mascot mood="thinking" size="medium" />

        <div className="feedback-status-header">
          <XCircle size={40} className="icon-incorrect" />
          <h2>Let's Review This Step ✨</h2>
        </div>

        {explanation && (
          <div className="explanation-box">
            <p>{explanation}</p>
          </div>
        )}

        <button className="btn btn-primary continue-btn" onClick={onContinue} autoFocus>
          <span>Continue</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}

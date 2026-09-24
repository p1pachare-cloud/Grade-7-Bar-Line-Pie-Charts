import React from 'react';
import { Lightbulb, Info } from 'lucide-react';

export default function HintOverlay({ hint1, hint2, explanation, attemptCount }) {
  if (attemptCount === 0) return null;

  return (
    <div className="hint-overlay-card glass-card">
      <div className="hint-header">
        <Lightbulb size={20} className="hint-icon" />
        <h4 style={{ color: '#ffd54f' }}>Data Explorer Scaffold (Attempt {attemptCount}/3)</h4>
      </div>

      {attemptCount >= 1 && hint1 && (
        <div className="hint-item">
          <strong>Hint 1:</strong> {hint1}
        </div>
      )}

      {attemptCount >= 2 && hint2 && (
        <div className="hint-item hint-level-2">
          <strong>Hint 2:</strong> {hint2}
        </div>
      )}

      {attemptCount >= 3 && explanation && (
        <div className="hint-item hint-explanation">
          <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span><strong>Solution Walkthrough:</strong> {explanation}</span>
        </div>
      )}
    </div>
  );
}

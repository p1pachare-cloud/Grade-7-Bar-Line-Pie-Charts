import React, { useState } from 'react';
import { X, CheckCircle, Lightbulb, BookOpen } from 'lucide-react';
import Mascot from '../Mascot';

export default function ConceptCard({ card, onClose, onComplete }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  if (!card) return null;

  const handleSelect = (opt) => {
    setSelectedAnswer(opt);
    const correct = opt === card.microCheck.correctAnswer;
    setIsCorrect(correct);
    if (correct && onComplete) {
      onComplete();
    }
  };

  return (
    <div className="concept-modal-backdrop" onClick={onClose}>
      <div className="concept-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="concept-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BookOpen size={24} color="#ffd54f" />
            <h3>{card.title}</h3>
          </div>
          <button className="home-btn" style={{ position: 'static' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Key Idea */}
        <div className="concept-formula-box">
          <Lightbulb size={20} color="#00e5ff" style={{ float: 'left', marginRight: '10px' }} />
          <strong>Core Concept:</strong> {card.keyIdea}
        </div>

        {/* Visual Diagram */}
        <div className="concept-diagram-box">
          {card.id === 'bar_charts' && (
            <svg viewBox="0 0 280 140" width="280" height="140">
              <line x1="40" y1="120" x2="260" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <line x1="40" y1="20" x2="40" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <text x="30" y="30" fill="white" fontSize="10" textAnchor="end">50</text>
              <text x="30" y="70" fill="white" fontSize="10" textAnchor="end">30</text>
              <text x="30" y="115" fill="white" fontSize="10" textAnchor="end">0</text>
              {/* Football bar (40) */}
              <rect x="65" y="45" width="35" height="75" fill="#00e5ff" rx="3" />
              <text x="82" y="135" fill="white" fontSize="11" textAnchor="middle">Footb.</text>
              {/* Dance bar (25) */}
              <rect x="115" y="75" width="35" height="45" fill="#ffc107" rx="3" />
              <text x="132" y="135" fill="white" fontSize="11" textAnchor="middle">Dance</text>
              {/* Art bar (30) */}
              <rect x="165" y="65" width="35" height="55" fill="#00e676" rx="3" />
              <text x="182" y="135" fill="white" fontSize="11" textAnchor="middle">Art</text>
              {/* Chess bar (15) */}
              <rect x="215" y="95" width="35" height="25" fill="#ff4081" rx="3" />
              <text x="232" y="135" fill="white" fontSize="11" textAnchor="middle">Chess</text>
            </svg>
          )}

          {card.id === 'double_bars' && (
            <svg viewBox="0 0 280 140" width="280" height="140">
              <line x1="40" y1="120" x2="260" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <line x1="40" y1="20" x2="40" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              {/* Legend */}
              <rect x="150" y="15" width="12" height="12" fill="#00e5ff" rx="2" />
              <text x="168" y="25" fill="white" fontSize="10">School A</text>
              <rect x="210" y="15" width="12" height="12" fill="#ffc107" rx="2" />
              <text x="228" y="25" fill="white" fontSize="10">School B</text>
              {/* Category 1 */}
              <rect x="60" y="45" width="18" height="75" fill="#00e5ff" rx="2" />
              <rect x="80" y="60" width="18" height="60" fill="#ffc107" rx="2" />
              <text x="79" y="135" fill="white" fontSize="10" textAnchor="middle">Sports</text>
              {/* Category 2 */}
              <rect x="120" y="30" width="18" height="90" fill="#00e5ff" rx="2" />
              <rect x="140" y="50" width="18" height="70" fill="#ffc107" rx="2" />
              <text x="139" y="135" fill="white" fontSize="10" textAnchor="middle">Music</text>
              {/* Category 3 */}
              <rect x="180" y="70" width="18" height="50" fill="#00e5ff" rx="2" />
              <rect x="200" y="40" width="18" height="80" fill="#ffc107" rx="2" />
              <text x="199" y="135" fill="white" fontSize="10" textAnchor="middle">Drama</text>
            </svg>
          )}

          {card.id === 'line_graphs' && (
            <svg viewBox="0 0 280 140" width="280" height="140">
              <line x1="40" y1="120" x2="260" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <line x1="40" y1="20" x2="40" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <polyline
                points="50,90 100,50 150,70 200,30 250,45"
                fill="none"
                stroke="#00e5ff"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="50" cy="90" r="4" fill="#ffd54f" />
              <circle cx="100" cy="50" r="4" fill="#ffd54f" />
              <circle cx="150" cy="70" r="4" fill="#ffd54f" />
              <circle cx="200" cy="30" r="4" fill="#ffd54f" />
              <circle cx="250" cy="45" r="4" fill="#ffd54f" />
              {/* Interpolation marker */}
              <line x1="125" y1="60" x2="125" y2="120" stroke="#ff4081" strokeDasharray="3 3" strokeWidth="2" />
              <circle cx="125" cy="60" r="4" fill="#ff4081" />
              <text x="125" y="135" fill="#ff4081" fontSize="10" textAnchor="middle">Estimate</text>
            </svg>
          )}

          {card.id === 'pie_charts' && (
            <svg viewBox="0 0 280 140" width="280" height="140">
              <g transform="translate(140, 70)">
                <circle cx="0" cy="0" r="55" fill="#0d0a2d" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                {/* 90 deg quarter */}
                <path d="M 0 0 L 0 -55 A 55 55 0 0 1 55 0 Z" fill="#00e5ff" />
                <text x="24" y="-20" fill="#060517" fontSize="11" fontWeight="bold">90° (25%)</text>
                {/* 180 deg half */}
                <path d="M 0 0 L 55 0 A 55 55 0 0 1 -55 0 Z" fill="#ffc107" />
                <text x="0" y="30" fill="#060517" fontSize="11" fontWeight="bold">180° (50%)</text>
                {/* 90 deg remainder */}
                <path d="M 0 0 L -55 0 A 55 55 0 0 1 0 -55 Z" fill="#00e676" />
                <text x="-36" y="-20" fill="#060517" fontSize="11" fontWeight="bold">90°</text>
              </g>
            </svg>
          )}

          {card.id === 'misleading_charts' && (
            <svg viewBox="0 0 280 140" width="280" height="140">
              <line x1="45" y1="120" x2="250" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <line x1="45" y1="20" x2="45" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <text x="38" y="118" fill="#ef5350" fontSize="10" fontWeight="bold" textAnchor="end">50 (⚠️ not 0)</text>
              <text x="38" y="45" fill="white" fontSize="10" textAnchor="end">55</text>
              {/* Bar 1: value 52 */}
              <rect x="75" y="80" width="40" height="40" fill="#00e5ff" rx="2" />
              <text x="95" y="70" fill="white" fontSize="10" textAnchor="middle">52</text>
              {/* Bar 2: value 54 */}
              <rect x="155" y="40" width="40" height="80" fill="#ffc107" rx="2" />
              <text x="175" y="30" fill="white" fontSize="10" textAnchor="middle">54</text>
              <text x="135" y="15" fill="#ef5350" fontSize="10" fontWeight="bold" textAnchor="middle">Looks 2x taller, but only 2 units more!</text>
            </svg>
          )}
        </div>

        {/* Rules */}
        <div>
          <h4 style={{ color: 'white', marginBottom: '8px' }}>Key Guidelines:</h4>
          <ul style={{ paddingLeft: '20px', lineHeight: '1.7', color: 'rgba(255,255,255,0.9)' }}>
            {card.rules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </div>

        {/* Micro-Check */}
        <div className="concept-microcheck-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffd54f', marginBottom: '8px' }}>
            <CheckCircle size={18} />
            <strong>Try It (Concept Check):</strong>
          </div>
          <p style={{ color: 'white', marginBottom: '10px' }}>{card.microCheck.question}</p>
          <div className="microcheck-options">
            {card.microCheck.options.map((opt, idx) => {
              let btnClass = 'microcheck-btn';
              if (selectedAnswer === opt) {
                btnClass += opt === card.microCheck.correctAnswer ? ' correct' : ' incorrect';
              }
              return (
                <button
                  key={idx}
                  className={btnClass}
                  onClick={() => handleSelect(opt)}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {selectedAnswer && (
            <p style={{ marginTop: '12px', fontSize: '0.95rem', color: isCorrect ? '#00e676' : '#ef5350' }}>
              {isCorrect ? `✓ ${card.microCheck.explanation}` : 'Try again! Check the key concept above.'}
            </p>
          )}
        </div>

        {/* Close / Completed button */}
        <button
          className="btn btn-primary"
          style={{ alignSelf: 'center', marginTop: '10px' }}
          onClick={onClose}
          disabled={!isCorrect}
        >
          <span>{isCorrect ? 'Understood! Continue Story' : 'Answer Question to Continue'}</span>
        </button>
      </div>
    </div>
  );
}

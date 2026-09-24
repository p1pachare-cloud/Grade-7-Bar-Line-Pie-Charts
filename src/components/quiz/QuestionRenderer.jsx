import React, { useState, useEffect } from 'react';
import HintOverlay from './HintOverlay';

export default function QuestionRenderer({ question, onSelectAnswer, attemptCount }) {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setSelectedOption(null);
  }, [question?.id]);

  if (!question) return null;

  const handleOptionClick = (opt) => {
    setSelectedOption(opt);
    onSelectAnswer(opt);
  };

  const vData = question.visualData || {};

  // Helper for pie sector drawing
  const getSectorPath = (cx, cy, r, startDeg, endDeg) => {
    const startRad = ((startDeg - 90) * Math.PI) / 180;
    const endRad = ((endDeg - 90) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="question-renderer-card glass-card">
      {/* Question Type Badge */}
      <div className="question-type-badge">
        <span>Question Type: {question.type.replace(/_/g, ' ').toUpperCase()}</span>
      </div>

      <h3 className="question-text-title">{question.questionText}</h3>

      {/* Visual Scaffold Container */}
      <div className="question-visual-scaffold">
        {/* Render Single Bar Chart */}
        {vData.chartType === 'bar' && vData.categories && (
          <svg viewBox="0 0 360 180" width="100%" height="180">
            <line x1="45" y1="145" x2="330" y2="145" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
            <line x1="45" y1="20" x2="45" y2="145" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
            {/* Gridlines */}
            {[0, 0.5, 1].map((ratio) => {
              const y = 20 + 125 * (1 - ratio);
              const val = Math.round(ratio * (vData.maxVal || 50));
              return (
                <g key={ratio}>
                  <line x1="45" y1={y} x2="330" y2={y} stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="38" y={y + 4} fill="rgba(255,255,255,0.7)" fontSize="10" textAnchor="end">{val}</text>
                </g>
              );
            })}
            {/* Bars */}
            {vData.categories.map((cat, idx) => {
              const count = vData.categories.length;
              const spacing = 270 / count;
              const x = 55 + idx * spacing + (spacing - 35) / 2;
              const barH = (cat.val / (vData.maxVal || 50)) * 125;
              const y = 145 - barH;
              return (
                <g key={idx}>
                  <rect x={x} y={y} width="32" height={barH} fill={cat.col || '#00e5ff'} rx="3" />
                  <text x={x + 16} y="162" fill="white" fontSize="10" textAnchor="middle">{cat.cat}</text>
                  <text x={x + 16} y={y - 5} fill="#ffd54f" fontSize="10" fontWeight="bold" textAnchor="middle">{cat.val}</text>
                </g>
              );
            })}
          </svg>
        )}

        {/* Render Double Bar Chart */}
        {vData.chartType === 'double_bar' && vData.categories && (
          <svg viewBox="0 0 360 190" width="100%" height="190">
            <line x1="45" y1="150" x2="330" y2="150" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
            <line x1="45" y1="35" x2="45" y2="150" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
            {/* Legend */}
            <rect x="110" y="10" width="10" height="10" fill="#00e5ff" rx="2" />
            <text x="125" y="19" fill="white" fontSize="10">{vData.seriesA || 'School A'}</text>
            <rect x="200" y="10" width="10" height="10" fill="#ffc107" rx="2" />
            <text x="215" y="19" fill="white" fontSize="10">{vData.seriesB || 'School B'}</text>
            {/* Gridlines */}
            {[0, 0.5, 1].map((ratio) => {
              const y = 35 + 115 * (1 - ratio);
              const val = Math.round(ratio * (vData.maxVal || 60));
              return (
                <g key={ratio}>
                  <line x1="45" y1={y} x2="330" y2={y} stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="38" y={y + 4} fill="rgba(255,255,255,0.7)" fontSize="10" textAnchor="end">{val}</text>
                </g>
              );
            })}
            {/* Double Bars */}
            {vData.categories.map((cat, idx) => {
              const spacing = 270 / vData.categories.length;
              const xCenter = 55 + idx * spacing + spacing / 2;
              const hA = (cat.valA / (vData.maxVal || 60)) * 115;
              const hB = (cat.valB / (vData.maxVal || 60)) * 115;
              return (
                <g key={idx}>
                  <rect x={xCenter - 18} y={150 - hA} width="16" height={hA} fill="#00e5ff" rx="2" />
                  <rect x={xCenter + 2} y={150 - hB} width="16" height={hB} fill="#ffc107" rx="2" />
                  <text x={xCenter} y="168" fill="white" fontSize="10" textAnchor="middle">{cat.cat}</text>
                </g>
              );
            })}
          </svg>
        )}

        {/* Render Line Graph */}
        {vData.chartType === 'line' && vData.points && (
          <svg viewBox="0 0 360 180" width="100%" height="180">
            <line x1="45" y1="145" x2="330" y2="145" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
            <line x1="45" y1="20" x2="45" y2="145" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
            {/* Gridlines */}
            {[0, 0.5, 1].map((ratio) => {
              const y = 20 + 125 * (1 - ratio);
              const val = Math.round(ratio * (vData.maxVal || 40));
              return (
                <g key={ratio}>
                  <line x1="45" y1={y} x2="330" y2={y} stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="38" y={y + 4} fill="rgba(255,255,255,0.7)" fontSize="10" textAnchor="end">{val}</text>
                </g>
              );
            })}
            {/* Joined Line */}
            {vData.points.map((pt, i) => {
              if (i === vData.points.length - 1) return null;
              const next = vData.points[i + 1];
              const spacing = 260 / (vData.points.length - 1);
              const x1 = 60 + i * spacing;
              const y1 = 145 - (pt.val / (vData.maxVal || 40)) * 125;
              const x2 = 60 + (i + 1) * spacing;
              const y2 = 145 - (next.val / (vData.maxVal || 40)) * 125;
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00e5ff" strokeWidth="3" strokeLinecap="round" />
              );
            })}
            {/* Points */}
            {vData.points.map((pt, idx) => {
              const spacing = 260 / (vData.points.length - 1);
              const x = 60 + idx * spacing;
              const y = 145 - (pt.val / (vData.maxVal || 40)) * 125;
              return (
                <g key={idx}>
                  <circle cx={x} cy={y} r="4.5" fill="#ffd54f" stroke="#14103c" strokeWidth="1.5" />
                  <text x={x} y={y - 8} fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">{pt.val}</text>
                  <text x={x} y="162" fill="rgba(255,255,255,0.8)" fontSize="10" textAnchor="middle">{pt.time}</text>
                </g>
              );
            })}
          </svg>
        )}

        {/* Render Pie Chart */}
        {vData.chartType === 'pie' && vData.sectors && (
          <svg viewBox="0 0 240 200" width="240" height="190">
            <g transform="translate(120, 100)">
              {(() => {
                let currentAngle = 0;
                return vData.sectors.map((sec, idx) => {
                  const deg = sec.angle || (sec.pct ? (sec.pct / 100) * 360 : 90);
                  const startA = currentAngle;
                  const endA = currentAngle + deg;
                  currentAngle += deg;
                  return (
                    <g key={idx}>
                      <path
                        d={getSectorPath(0, 0, 75, startA, endA)}
                        fill={sec.col || '#00e5ff'}
                        stroke="#0d0a2d"
                        strokeWidth="1.5"
                      />
                    </g>
                  );
                });
              })()}
              <circle cx="0" cy="0" r="5" fill="white" />
            </g>
          </svg>
        )}
      </div>

      {/* MCQ Options Grid */}
      <div className="mcq-options-grid">
        {question.options &&
          question.options.map((option, idx) => {
            const isSelected = selectedOption === option;
            return (
              <button
                key={idx}
                className={`mcq-option-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                <span className="option-letter">{String.fromCharCode(65 + idx)}.</span>
                <span className="option-text">{option}</span>
              </button>
            );
          })}
      </div>

      <HintOverlay
        hint1={question.hint1}
        hint2={question.hint2}
        explanation={question.explanation}
        attemptCount={attemptCount}
      />
    </div>
  );
}

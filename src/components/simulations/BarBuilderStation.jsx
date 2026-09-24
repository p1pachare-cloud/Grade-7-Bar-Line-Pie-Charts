import React, { useState, useEffect } from 'react';
import { CheckCircle2, RotateCcw, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import Mascot from '../Mascot';
import { stationANarration } from '../../utils/narration';
import { narrate } from '../../utils/audio';

const ROUNDS = [
  {
    round: 1,
    title: 'Round 1 — Festival Activities (Single Bar)',
    interval: 5,
    maxVal: 50,
    categories: [
      { name: 'Football', target: 40 },
      { name: 'Dance', target: 25 },
      { name: 'Chess', target: 15 },
      { name: 'Art', target: 30 },
    ]
  },
  {
    round: 2,
    title: 'Round 2 — Halfway Gridlines (Scale of 10)',
    interval: 10,
    maxVal: 60,
    categories: [
      { name: 'Robotics', target: 45 },
      { name: 'Music', target: 50 },
      { name: 'Drama', target: 25 },
      { name: 'Coding', target: 35 },
    ]
  },
  {
    round: 3,
    title: 'Round 3 — Double Bar Chart (School A vs School B)',
    interval: 10,
    maxVal: 60,
    isDouble: true,
    seriesA: 'School 1',
    seriesB: 'School 2',
    categories: [
      { name: 'Track', targetA: 30, targetB: 50 },
      { name: 'Swim', targetA: 40, targetB: 30 },
      { name: 'Tennis', targetA: 20, targetB: 40 }
    ]
  }
];

export default function BarBuilderStation({ audioEnabled, onComplete }) {
  const [roundIdx, setRoundIdx] = useState(0);
  const currentRound = ROUNDS[roundIdx];
  const [selectedInterval, setSelectedInterval] = useState(currentRound.interval);
  const [barValues, setBarValues] = useState(() => currentRound.categories.map(() => 0));
  const [barValuesB, setBarValuesB] = useState(() => currentRound.categories.map(() => 0));
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    narrate(stationANarration(), audioEnabled);
  }, [audioEnabled]);

  useEffect(() => {
    setSelectedInterval(currentRound.interval);
    setBarValues(currentRound.categories.map(() => 0));
    setBarValuesB(currentRound.categories.map(() => 0));
    setIsSubmitted(false);
    setIsCorrect(false);
  }, [roundIdx]);

  const handleAdjustBar = (idx, delta, isSeriesB = false) => {
    if (isSeriesB) {
      setBarValuesB((prev) => {
        const next = [...prev];
        const step = selectedInterval / 2;
        next[idx] = Math.max(0, Math.min(currentRound.maxVal, next[idx] + delta * step));
        return next;
      });
    } else {
      setBarValues((prev) => {
        const next = [...prev];
        const step = selectedInterval / 2;
        next[idx] = Math.max(0, Math.min(currentRound.maxVal, next[idx] + delta * step));
        return next;
      });
    }
  };

  const handleCheck = () => {
    let allRight = true;
    if (currentRound.isDouble) {
      for (let i = 0; i < currentRound.categories.length; i++) {
        if (barValues[i] !== currentRound.categories[i].targetA || barValuesB[i] !== currentRound.categories[i].targetB) {
          allRight = false;
          break;
        }
      }
    } else {
      for (let i = 0; i < currentRound.categories.length; i++) {
        if (barValues[i] !== currentRound.categories[i].target) {
          allRight = false;
          break;
        }
      }
    }

    setIsSubmitted(true);
    setIsCorrect(allRight);

    if (allRight && roundIdx === ROUNDS.length - 1) {
      onComplete();
    }
  };

  const handleNextRound = () => {
    if (roundIdx < ROUNDS.length - 1) {
      setRoundIdx((r) => r + 1);
    }
  };

  // SVG Chart Dimensions
  const chartWidth = 420;
  const chartHeight = 220;
  const paddingLeft = 45;
  const paddingBottom = 35;
  const paddingTop = 20;
  const graphH = chartHeight - paddingBottom - paddingTop;
  const graphW = chartWidth - paddingLeft - 20;

  const yTicks = [];
  for (let val = 0; val <= currentRound.maxVal; val += selectedInterval) {
    yTicks.push(val);
  }

  return (
    <div className="sim-station-layout">
      {/* Station Header */}
      <div className="sim-station-header">
        <div>
          <span className="round-badge">{currentRound.title}</span>
          <h3 style={{ color: 'white', marginTop: '6px', fontSize: '1.4rem' }}>
            Station A — Bar Builder (Interactive Manipulative)
          </h3>
        </div>

        {/* Interval Selector */}
        <div className="scale-selector-bar">
          <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>Scale Interval:</span>
          {[5, 10, 20].map((intVal) => (
            <button
              key={intVal}
              className={`scale-btn ${selectedInterval === intVal ? 'active' : ''}`}
              onClick={() => setSelectedInterval(intVal)}
            >
              {intVal}s
            </button>
          ))}
        </div>
      </div>

      {/* Workspace Split */}
      <div className="sim-workspace-split">
        {/* Left: Synchronized Data Table */}
        <div className="sim-table-card">
          <h4 style={{ color: '#ffd54f', marginBottom: '10px' }}>Target Data Table</h4>
          <table className="custom-data-table">
            <thead>
              <tr>
                <th>Category</th>
                {currentRound.isDouble ? (
                  <>
                    <th style={{ color: '#00e5ff' }}>{currentRound.seriesA}</th>
                    <th style={{ color: '#ffc107' }}>{currentRound.seriesB}</th>
                  </>
                ) : (
                  <th>Target Count</th>
                )}
                <th>Current Set</th>
              </tr>
            </thead>
            <tbody>
              {currentRound.categories.map((cat, idx) => {
                const isMatch = currentRound.isDouble
                  ? barValues[idx] === cat.targetA && barValuesB[idx] === cat.targetB
                  : barValues[idx] === cat.target;

                return (
                  <tr
                    key={idx}
                    className={hoveredIdx === idx ? 'highlighted' : ''}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <td><strong>{cat.name}</strong></td>
                    {currentRound.isDouble ? (
                      <>
                        <td>{cat.targetA}</td>
                        <td>{cat.targetB}</td>
                        <td style={{ color: isMatch ? '#00e676' : 'white' }}>
                          {barValues[idx]} / {barValuesB[idx]} {isMatch && '✓'}
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{cat.target}</td>
                        <td style={{ color: isMatch ? '#00e676' : 'white' }}>
                          {barValues[idx]} {isMatch && '✓'}
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Stepper buttons for accessibility */}
          <div style={{ marginTop: '16px' }}>
            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Nudge Bar Heights:</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
              {currentRound.categories.map((cat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.9rem', color: 'white' }}>{cat.name}:</span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button className="btn btn-outline btn-sm" onClick={() => handleAdjustBar(idx, -1)}>–</button>
                    <span style={{ minWidth: '32px', textAlign: 'center', fontWeight: 'bold' }}>{barValues[idx]}</span>
                    <button className="btn btn-outline btn-sm" onClick={() => handleAdjustBar(idx, 1)}>+</button>
                    {currentRound.isDouble && (
                      <>
                        <span style={{ color: 'rgba(255,255,255,0.4)' }}>|</span>
                        <button className="btn btn-outline btn-sm" onClick={() => handleAdjustBar(idx, -1, true)}>–</button>
                        <span style={{ minWidth: '32px', textAlign: 'center', fontWeight: 'bold', color: '#ffd54f' }}>{barValuesB[idx]}</span>
                        <button className="btn btn-outline btn-sm" onClick={() => handleAdjustBar(idx, 1, true)}>+</button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: SVG Bar Chart Interactive Canvas */}
        <div className="sim-chart-container">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="100%" height="240">
            {/* Gridlines */}
            {yTicks.map((tick) => {
              const y = paddingTop + graphH - (tick / currentRound.maxVal) * graphH;
              return (
                <g key={tick}>
                  <line x1={paddingLeft} y1={y} x2={chartWidth - 10} y2={y} stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="2 2" />
                  <text x={paddingLeft - 8} y={y + 4} fill="rgba(255,255,255,0.7)" fontSize="10" textAnchor="end">{tick}</text>
                </g>
              );
            })}

            {/* Axes */}
            <line x1={paddingLeft} y1={paddingTop + graphH} x2={chartWidth - 10} y2={paddingTop + graphH} stroke="white" strokeWidth="2" />
            <line x1={paddingLeft} y1={paddingTop} x2={paddingLeft} y2={paddingTop + graphH} stroke="white" strokeWidth="2" />

            {/* Bars */}
            {currentRound.categories.map((cat, idx) => {
              const catSpacing = graphW / currentRound.categories.length;
              const xCenter = paddingLeft + (idx + 0.5) * catSpacing;

              if (currentRound.isDouble) {
                const barW = Math.min(22, (catSpacing - 12) / 2);
                const hA = (barValues[idx] / currentRound.maxVal) * graphH;
                const hB = (barValuesB[idx] / currentRound.maxVal) * graphH;
                const yA = paddingTop + graphH - hA;
                const yB = paddingTop + graphH - hB;

                return (
                  <g key={idx} onMouseEnter={() => setHoveredIdx(idx)} onMouseLeave={() => setHoveredIdx(null)}>
                    {/* Bar A */}
                    <rect x={xCenter - barW - 2} y={yA} width={barW} height={hA} fill="#00e5ff" rx="2" />
                    {/* Bar B */}
                    <rect x={xCenter + 2} y={yB} width={barW} height={hB} fill="#ffc107" rx="2" />
                    <text x={xCenter} y={chartHeight - 12} fill="white" fontSize="10" textAnchor="middle">{cat.name}</text>
                  </g>
                );
              }

              const barW = Math.min(38, catSpacing - 18);
              const barH = (barValues[idx] / currentRound.maxVal) * graphH;
              const barY = paddingTop + graphH - barH;

              return (
                <g key={idx} onMouseEnter={() => setHoveredIdx(idx)} onMouseLeave={() => setHoveredIdx(null)}>
                  <rect
                    x={xCenter - barW / 2}
                    y={barY}
                    width={barW}
                    height={barH}
                    fill={hoveredIdx === idx ? '#ffd54f' : '#00e5ff'}
                    rx="3"
                    style={{ transition: 'all 0.15s ease' }}
                  />
                  {/* Value Tooltip above bar */}
                  {barValues[idx] > 0 && (
                    <text x={xCenter} y={barY - 6} fill="#ffd54f" fontSize="11" fontWeight="bold" textAnchor="middle">
                      {barValues[idx]}
                    </text>
                  )}
                  <text x={xCenter} y={chartHeight - 12} fill="white" fontSize="11" textAnchor="middle">{cat.name}</text>
                </g>
              );
            })}
          </svg>

          {/* Validation & Feedback Controls */}
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="btn btn-primary" onClick={handleCheck}>
              <CheckCircle2 size={18} />
              <span>Verify Bar Heights</span>
            </button>

            {isSubmitted && (
              <span style={{ color: isCorrect ? '#00e676' : '#ef5350', fontWeight: 'bold' }}>
                {isCorrect ? '🎉 Perfect Match!' : '❌ Some bars do not match the table. Check heights!'}
              </span>
            )}

            {isCorrect && roundIdx < ROUNDS.length - 1 && (
              <button className="btn btn-outline" onClick={handleNextRound}>
                <span>Next Round ({roundIdx + 2}/3)</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { CheckCircle2, RotateCcw, PieChart as PieIcon, ArrowRight, Calculator } from 'lucide-react';
import Mascot from '../Mascot';
import { stationCNarration } from '../../utils/narration';
import { narrate } from '../../utils/audio';

const SLICES = [
  { name: 'Crêpes', count: 50, percent: 25, targetAngle: 90, color: '#00e5ff' },
  { name: 'Pretzels', count: 80, percent: 40, targetAngle: 144, color: '#ffc107' },
  { name: 'Churros', count: 40, percent: 20, targetAngle: 72, color: '#ff4081' },
  { name: 'Fruit Cup', count: 30, percent: 15, targetAngle: 54, color: '#00e676' }
];

export default function PieSlicerStation({ audioEnabled, onComplete }) {
  const totalVotes = 200;
  const [currentSliceIdx, setCurrentSliceIdx] = useState(0);
  const [userRadiusAngle, setUserRadiusAngle] = useState(0);
  const [cutSlices, setCutSlices] = useState([]); // Array of { name, startAngle, endAngle, color }
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    narrate(stationCNarration(), audioEnabled);
  }, [audioEnabled]);

  const targetSlice = SLICES[currentSliceIdx];
  const previousEndAngle = cutSlices.length > 0 ? cutSlices[cutSlices.length - 1].endAngle : 0;
  const expectedEndAngle = previousEndAngle + (targetSlice ? targetSlice.targetAngle : 0);

  const handleCutSector = () => {
    if (!targetSlice) return;

    // Check if user set close to targetAngle (within 6 degrees)
    const isAngleClose = Math.abs(userRadiusAngle - targetSlice.targetAngle) <= 6;
    if (isAngleClose || userRadiusAngle === targetSlice.targetAngle) {
      const newEnd = previousEndAngle + targetSlice.targetAngle;
      setCutSlices((prev) => [
        ...prev,
        {
          name: targetSlice.name,
          startAngle: previousEndAngle,
          endAngle: newEnd,
          angle: targetSlice.targetAngle,
          color: targetSlice.color
        }
      ]);

      if (currentSliceIdx < SLICES.length - 1) {
        setCurrentSliceIdx((i) => i + 1);
        setUserRadiusAngle(0);
      } else {
        setIsFinished(true);
        onComplete();
      }
    }
  };

  const handleReset = () => {
    setCurrentSliceIdx(0);
    setUserRadiusAngle(0);
    setCutSlices([]);
    setIsFinished(false);
  };

  const remainingDegrees = 360 - cutSlices.reduce((sum, s) => sum + s.angle, 0);

  // SVG Helper to generate sector path
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
    <div className="sim-station-layout">
      {/* Header */}
      <div className="sim-station-header">
        <div>
          <span className="round-badge">Station C • Pictorial → Abstract</span>
          <h3 style={{ color: 'white', marginTop: '6px', fontSize: '1.4rem' }}>
            Station C — Pie Slicer &amp; Protractor Dial
          </h3>
        </div>

        <button className="btn btn-outline btn-sm" onClick={handleReset}>
          <RotateCcw size={16} />
          <span>Reset Slices</span>
        </button>
      </div>

      <div className="sim-workspace-split">
        {/* Table & Angle Calculator */}
        <div className="sim-table-card">
          <h4 style={{ color: '#ffd54f', marginBottom: '10px' }}>Snack Votes (Total = {totalVotes})</h4>
          <table className="custom-data-table">
            <thead>
              <tr>
                <th>Snack</th>
                <th>Votes</th>
                <th>Formula</th>
                <th>Target Angle</th>
              </tr>
            </thead>
            <tbody>
              {SLICES.map((slice, idx) => {
                const isCut = cutSlices.some((s) => s.name === slice.name);
                const isCurrent = idx === currentSliceIdx && !isFinished;
                return (
                  <tr
                    key={idx}
                    className={isCurrent ? 'highlighted' : ''}
                    style={{ background: isCut ? 'rgba(0, 230, 118, 0.12)' : undefined }}
                  >
                    <td>
                      <span style={{ color: slice.color, fontWeight: 'bold' }}>● </span>
                      <strong>{slice.name}</strong>
                    </td>
                    <td>{slice.count}</td>
                    <td style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>
                      ({slice.count}/200)×360°
                    </td>
                    <td style={{ fontWeight: 'bold', color: '#ffd54f' }}>
                      {slice.targetAngle}° {isCut && '✓'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Current Target Guidance Box */}
          {!isFinished && targetSlice && (
            <div style={{ marginTop: '16px', background: 'rgba(255,255,255,0.06)', padding: '14px', borderRadius: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00e5ff', marginBottom: '6px' }}>
                <Calculator size={18} />
                <strong>Current Sector to Cut: {targetSlice.name}</strong>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'white', margin: '4px 0' }}>
                Calculation: ({targetSlice.count} ÷ {totalVotes}) × 360° = <strong>{targetSlice.targetAngle}°</strong>
              </p>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                Rotate the Protractor Dial until angle reads <strong>{targetSlice.targetAngle}°</strong>, then press "Cut Slice"!
              </p>
            </div>
          )}

          {/* 360 Degree Counter */}
          <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', color: '#ffd54f', fontSize: '0.95rem' }}>
            <span>Remaining Circle:</span>
            <strong>{remainingDegrees}° left of 360°</strong>
          </div>
        </div>

        {/* SVG Protractor & Pie Canvas */}
        <div className="sim-chart-container">
          <svg viewBox="0 0 300 300" width="260" height="260">
            {/* Protractor outer ring */}
            <circle cx="150" cy="150" r="130" fill="#0d0a2e" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
            <circle cx="150" cy="150" r="115" fill="#14103c" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

            {/* Protractor degree tick marks */}
            {Array.from({ length: 12 }).map((_, i) => {
              const deg = i * 30;
              const rad = ((deg - 90) * Math.PI) / 180;
              const x1 = 150 + 120 * Math.cos(rad);
              const y1 = 150 + 120 * Math.sin(rad);
              const x2 = 150 + 130 * Math.cos(rad);
              const y2 = 150 + 130 * Math.sin(rad);
              const tx = 150 + 105 * Math.cos(rad);
              const ty = 150 + 105 * Math.sin(rad);
              return (
                <g key={i}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                  <text x={tx} y={ty + 3} fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle">{deg}°</text>
                </g>
              );
            })}

            {/* Cut Slices */}
            {cutSlices.map((s, idx) => (
              <path
                key={idx}
                d={getSectorPath(150, 150, 95, s.startAngle, s.endAngle)}
                fill={s.color}
                stroke="#060517"
                strokeWidth="1.5"
              />
            ))}

            {/* Active Preview Sector */}
            {!isFinished && userRadiusAngle > 0 && (
              <path
                d={getSectorPath(150, 150, 95, previousEndAngle, previousEndAngle + userRadiusAngle)}
                fill="rgba(0, 229, 255, 0.4)"
                stroke="#00e5ff"
                strokeWidth="2"
                strokeDasharray="4 2"
              />
            )}

            {/* Center Pivot Pin */}
            <circle cx="150" cy="150" r="6" fill="#ffd54f" stroke="#060517" strokeWidth="1.5" />
          </svg>

          {/* Dial Slider & Cut Button */}
          {!isFinished ? (
            <div style={{ marginTop: '16px', width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'white', fontSize: '0.95rem' }}>Dial Angle:</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#00e5ff' }}>
                  {userRadiusAngle}°
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="180"
                step="1"
                value={userRadiusAngle}
                onChange={(e) => setUserRadiusAngle(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#00e5ff', cursor: 'pointer' }}
              />

              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setUserRadiusAngle(targetSlice.targetAngle)}
                >
                  Snap to {targetSlice.targetAngle}°
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleCutSector}
                  disabled={userRadiusAngle === 0}
                >
                  <PieIcon size={18} />
                  <span>Cut Sector</span>
                </button>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: '18px', textAlign: 'center' }}>
              <h4 style={{ color: '#00e676', marginBottom: '8px' }}>🎉 Full 360° Pie Completed!</h4>
              <p style={{ color: 'white', fontSize: '0.9rem' }}>
                Every snack slice accurately calculated and cut. You mastered pie chart geometry!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

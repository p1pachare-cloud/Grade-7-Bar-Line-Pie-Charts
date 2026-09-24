import React, { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight, Activity, Crosshair, HelpCircle } from 'lucide-react';
import Mascot from '../Mascot';
import { stationBNarration } from '../../utils/narration';
import { narrate } from '../../utils/audio';

const TIME_POINTS = [
  { time: '8 AM', targetTemp: 15, x: 50 },
  { time: '10 AM', targetTemp: 22, x: 120 },
  { time: '12 PM', targetTemp: 30, x: 190 },
  { time: '2 PM', targetTemp: 34, x: 260 },
  { time: '4 PM', targetTemp: 26, x: 330 },
  { time: '6 PM', targetTemp: 18, x: 400 }
];

export default function TrendTrackerStation({ audioEnabled, onComplete }) {
  const [plottedPoints, setPlottedPoints] = useState([]);
  const [probeX, setProbeX] = useState(190);
  const [selectedSegment, setSelectedSegment] = useState(null); // idx of segment (0 to 4)
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    narrate(stationBNarration(), audioEnabled);
  }, [audioEnabled]);

  const maxTemp = 40;
  const chartHeight = 220;
  const paddingBottom = 40;
  const paddingTop = 20;
  const graphH = chartHeight - paddingBottom - paddingTop;

  const handlePlotAll = () => {
    setPlottedPoints(TIME_POINTS);
  };

  const handleTogglePlot = (pt) => {
    if (plottedPoints.find((p) => p.time === pt.time)) {
      setPlottedPoints((prev) => prev.filter((p) => p.time !== pt.time));
    } else {
      setPlottedPoints((prev) => [...prev, pt]);
    }
  };

  const allPlotted = plottedPoints.length === TIME_POINTS.length;

  // Calculate interpolated temperature at probeX
  // Find which two points probeX is between
  let interpolatedTemp = null;
  for (let i = 0; i < TIME_POINTS.length - 1; i++) {
    const p1 = TIME_POINTS[i];
    const p2 = TIME_POINTS[i + 1];
    if (probeX >= p1.x && probeX <= p2.x) {
      const ratio = (probeX - p1.x) / (p2.x - p1.x);
      interpolatedTemp = (p1.targetTemp + ratio * (p2.targetTemp - p1.targetTemp)).toFixed(1);
      break;
    }
  }

  const probeY = interpolatedTemp ? paddingTop + graphH - (parseFloat(interpolatedTemp) / maxTemp) * graphH : 0;

  // Steepest rise segment is from 8 AM to 10 AM (delta = +7) or 10 AM to 12 PM (delta = +8)!
  // 10 AM to 12 PM has delta = 8 (steepest rise!)
  const isSteepestCorrect = selectedSegment === 1; // 10 AM -> 12 PM

  const handleSubmit = () => {
    if (allPlotted && isSteepestCorrect) {
      setIsFinished(true);
      onComplete();
    }
  };

  return (
    <div className="sim-station-layout">
      {/* Station Header */}
      <div className="sim-station-header">
        <div>
          <span className="round-badge">Station B • Concrete → Pictorial</span>
          <h3 style={{ color: 'white', marginTop: '6px', fontSize: '1.4rem' }}>
            Station B — Trend Tracker &amp; Interpolation Probe
          </h3>
        </div>

        <button className="btn btn-outline btn-sm" onClick={handlePlotAll}>
          <Activity size={16} />
          <span>Auto-Plot Readings</span>
        </button>
      </div>

      <div className="sim-workspace-split">
        {/* Table & Controls */}
        <div className="sim-table-card">
          <h4 style={{ color: '#ffd54f', marginBottom: '10px' }}>Hourly Stage Readings</h4>
          <table className="custom-data-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Temp (°C)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {TIME_POINTS.map((pt, idx) => {
                const isPlotted = plottedPoints.some((p) => p.time === pt.time);
                return (
                  <tr
                    key={idx}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleTogglePlot(pt)}
                    className={isPlotted ? 'highlighted' : ''}
                  >
                    <td><strong>{pt.time}</strong></td>
                    <td style={{ color: '#00e5ff', fontWeight: 'bold' }}>{pt.targetTemp}°C</td>
                    <td>
                      <span style={{ color: isPlotted ? '#00e676' : 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
                        {isPlotted ? 'Plotted ✓' : 'Tap to Plot'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Interactive Probe Slider */}
          <div style={{ marginTop: '20px', background: 'rgba(255,255,255,0.05)', padding: '14px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.9rem', color: '#00e5ff', fontWeight: 'bold' }}>
                <Crosshair size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Interpolation Probe:
              </span>
              <span style={{ color: '#ffd54f', fontWeight: 'bold' }}>
                {interpolatedTemp ? `${interpolatedTemp}°C (Estimated)` : 'Move Slider'}
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="400"
              value={probeX}
              onChange={(e) => setProbeX(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#00e5ff', cursor: 'ew-resize' }}
            />
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
              Drag to probe estimated temperature between any two measured hours!
            </span>
          </div>
        </div>

        {/* Line Graph Canvas */}
        <div className="sim-chart-container">
          <svg viewBox="0 0 450 220" width="100%" height="230">
            {/* Gridlines */}
            {[0, 10, 20, 30, 40].map((temp) => {
              const y = paddingTop + graphH - (temp / maxTemp) * graphH;
              return (
                <g key={temp}>
                  <line x1="45" y1={y} x2="430" y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="36" y={y + 4} fill="rgba(255,255,255,0.7)" fontSize="10" textAnchor="end">{temp}°</text>
                </g>
              );
            })}

            {/* Axes */}
            <line x1="45" y1={paddingTop + graphH} x2="430" y2={paddingTop + graphH} stroke="white" strokeWidth="2" />
            <line x1="45" y1={paddingTop} x2="45" y2={paddingTop + graphH} stroke="white" strokeWidth="2" />

            {/* Segment highlight lines if plotted */}
            {allPlotted && TIME_POINTS.map((pt, i) => {
              if (i === TIME_POINTS.length - 1) return null;
              const nextPt = TIME_POINTS[i + 1];
              const y1 = paddingTop + graphH - (pt.targetTemp / maxTemp) * graphH;
              const y2 = paddingTop + graphH - (nextPt.targetTemp / maxTemp) * graphH;
              const isSelected = selectedSegment === i;

              return (
                <line
                  key={i}
                  x1={pt.x}
                  y1={y1}
                  x2={nextPt.x}
                  y2={y2}
                  stroke={isSelected ? '#ffd54f' : '#00e5ff'}
                  strokeWidth={isSelected ? 5 : 3.5}
                  strokeLinecap="round"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedSegment(i)}
                />
              );
            })}

            {/* Plotted Points */}
            {plottedPoints.map((pt, idx) => {
              const y = paddingTop + graphH - (pt.targetTemp / maxTemp) * graphH;
              return (
                <g key={idx}>
                  <circle cx={pt.x} cy={y} r="6" fill="#ffd54f" stroke="#14103c" strokeWidth="2" />
                  <text x={pt.x} y={y - 10} fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">
                    {pt.targetTemp}°
                  </text>
                  <text x={pt.x} y={chartHeight - 14} fill="rgba(255,255,255,0.8)" fontSize="10" textAnchor="middle">
                    {pt.time}
                  </text>
                </g>
              );
            })}

            {/* Vertical Interpolation Probe Line */}
            {allPlotted && (
              <g>
                <line x1={probeX} y1={paddingTop} x2={probeX} y2={paddingTop + graphH} stroke="#ff4081" strokeWidth="2" strokeDasharray="4 3" />
                {interpolatedTemp && (
                  <circle cx={probeX} cy={probeY} r="5" fill="#ff4081" />
                )}
              </g>
            )}
          </svg>

          {/* Trend Question & Submit */}
          <div style={{ marginTop: '16px', width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: 'rgba(255,255,255,0.06)', padding: '12px 18px', borderRadius: '8px' }}>
              <span style={{ color: '#ffd54f', fontWeight: 'bold' }}>Challenge: </span>
              <span style={{ color: 'white' }}>
                Tap the line segment that shows the <strong>steepest temperature rise</strong>!
              </span>
              {selectedSegment !== null && (
                <span style={{ display: 'block', marginTop: '4px', color: isSteepestCorrect ? '#00e676' : '#ef5350', fontSize: '0.9rem' }}>
                  {isSteepestCorrect ? '✓ Correct! 10 AM to 12 PM rose by 8°C (steepest climb).' : 'Not quite steepest! Check slope between 10 AM & 12 PM.'}
                </span>
              )}
            </div>

            <button
              className="btn btn-primary"
              style={{ alignSelf: 'center' }}
              onClick={handleSubmit}
              disabled={!allPlotted || !isSteepestCorrect}
            >
              <CheckCircle2 size={18} />
              <span>{isFinished ? 'Station B Completed! ✓' : 'Complete Station B'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

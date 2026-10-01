import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Activity,
  RotateCcw,
  Crosshair,
  TrendingUp,
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Mascot from '../Mascot';
import { stationBNarration } from '../../utils/narration';
import { narrate, cheer, celebrate } from '../../utils/audio';

const TIME_POINTS = [
  { time: '8 AM', targetTemp: 15, x: 55, minutes: 0 },
  { time: '10 AM', targetTemp: 22, x: 125, minutes: 120 },
  { time: '12 PM', targetTemp: 30, x: 195, minutes: 240 },
  { time: '2 PM', targetTemp: 34, x: 265, minutes: 360 },
  { time: '4 PM', targetTemp: 26, x: 335, minutes: 480 },
  { time: '6 PM', targetTemp: 18, x: 405, minutes: 600 }
];

const SEGMENTS = [
  {
    idx: 0,
    label: '8 AM – 10 AM',
    delta: 7,
    isRise: true,
    isSteepest: false,
    text: '+7°C rise',
    fullCalc: '22°C - 15°C = +7°C rise',
    hint: 'Line climbed by +7°C (from 15°C to 22°C). Good observation, but check between 10 AM and 12 PM for an even steeper rise!'
  },
  {
    idx: 1,
    label: '10 AM – 12 PM',
    delta: 8,
    isRise: true,
    isSteepest: true,
    text: '+8°C rise',
    fullCalc: '30°C - 22°C = +8°C climb (Steepest!)',
    hint: 'Spot on! The line climbed by 8°C (from 22°C to 30°C) in 2 hours. This is the steepest rise on the entire chart!'
  },
  {
    idx: 2,
    label: '12 PM – 2 PM',
    delta: 4,
    isRise: true,
    isSteepest: false,
    text: '+4°C rise',
    fullCalc: '34°C - 30°C = +4°C rise',
    hint: 'The stage is still warming (+4°C), but notice the slope is gentler and flattening out compared to 10 AM – 12 PM.'
  },
  {
    idx: 3,
    label: '2 PM – 4 PM',
    delta: -8,
    isRise: false,
    isSteepest: false,
    text: '-8°C drop',
    fullCalc: '26°C - 34°C = -8°C drop',
    hint: 'Watch out! The line is sloping downhill (-8°C). That is a temperature drop/fall, not a rise (going up)!'
  },
  {
    idx: 4,
    label: '4 PM – 6 PM',
    delta: -8,
    isRise: false,
    isSteepest: false,
    text: '-8°C drop',
    fullCalc: '18°C - 26°C = -8°C drop',
    hint: 'The evening cooldown is fast (-8°C), but this is a downward slope, not a rise!'
  }
];

export default function TrendTrackerStation({ audioEnabled, onComplete }) {
  const [plottedPoints, setPlottedPoints] = useState([]);
  const [probeX, setProbeX] = useState(195);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [isDraggingProbe, setIsDraggingProbe] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const svgRef = useRef(null);

  useEffect(() => {
    narrate(stationBNarration(), audioEnabled);
  }, [audioEnabled]);

  const maxTemp = 40;
  const chartWidth = 460;
  const chartHeight = 230;
  const paddingTop = 24;
  const graphH = 150;

  const yForTemp = (temp) => paddingTop + graphH - (temp / maxTemp) * graphH;

  const handlePlotAll = () => {
    setPlottedPoints(TIME_POINTS);
  };

  const handleResetPlot = () => {
    setPlottedPoints([]);
    setSelectedSegment(null);
    setIsFinished(false);
  };

  const handleTogglePlot = (pt) => {
    if (plottedPoints.find((p) => p.time === pt.time)) {
      setPlottedPoints((prev) => prev.filter((p) => p.time !== pt.time));
    } else {
      setPlottedPoints((prev) => [...prev, pt]);
    }
  };

  const allPlotted = plottedPoints.length === TIME_POINTS.length;

  // Calculate Interpolated temperature and exact time at probeX
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

  // Calculate approximate time string corresponding to probeX (55 = 8 AM, 405 = 6 PM, total 350px = 600 min)
  const probeMinutesFrom8AM = Math.round(((probeX - 55) / 350) * 600);
  const totalMins = 8 * 60 + Math.max(0, Math.min(600, probeMinutesFrom8AM));
  const probeH = Math.floor(totalMins / 60);
  const probeM = Math.round(totalMins % 60);
  const ampm = probeH >= 12 ? 'PM' : 'AM';
  const displayH = probeH > 12 ? probeH - 12 : probeH === 0 ? 12 : probeH;
  const probeTimeString = `${displayH}:${probeM < 10 ? '0' : ''}${probeM} ${ampm}`;

  const probeY = interpolatedTemp ? yForTemp(parseFloat(interpolatedTemp)) : 0;

  const isSteepestCorrect = selectedSegment === 1;

  // Pointer drag handler for SVG probe
  const updateProbeFromEvent = (clientX) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const svgX = ((clientX - rect.left) / rect.width) * chartWidth;
    const clampedX = Math.max(55, Math.min(405, Math.round(svgX)));
    setProbeX(clampedX);
  };

  const handlePointerDown = (e) => {
    // Only drag probe if clicking on probe area or SVG background
    if (e.target.tagName !== 'circle' && e.target.tagName !== 'button') {
      updateProbeFromEvent(e.clientX);
      setIsDraggingProbe(true);
    }
  };

  const handlePointerMove = (e) => {
    if (isDraggingProbe) {
      updateProbeFromEvent(e.clientX);
    }
  };

  const handlePointerUp = () => {
    setIsDraggingProbe(false);
  };

  const handleSelectSegment = (idx) => {
    setSelectedSegment(idx);
    if (idx === 1 && audioEnabled) {
      narrate([celebrate("Brilliant! 10 AM to 12 PM had the steepest rise of eight degrees! Station B complete!")]);
    } else if (idx !== 1 && audioEnabled) {
      narrate([cheer(SEGMENTS[idx].hint)]);
    }
  };

  const handleSubmit = () => {
    if (allPlotted && isSteepestCorrect) {
      setIsFinished(true);
      try {
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      // Advance after a brief celebration moment
      setTimeout(() => {
        onComplete();
      }, 700);
    }
  };

  return (
    <div
      className="sim-station-layout"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Station Header */}
      <div className="sim-station-header">
        <div>
          <span className="round-badge">Station B • Pictorial Manipulative</span>
          <h3 style={{ color: 'white', marginTop: '6px', fontSize: '1.4rem' }}>
            Station B — Trend Tracker &amp; Interpolation Probe
          </h3>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn btn-outline btn-sm"
            onClick={handlePlotAll}
            title="Auto-plot all 6 data points onto the line graph"
          >
            <Activity size={16} />
            <span>Auto-Plot Readings</span>
          </button>
          {plottedPoints.length > 0 && (
            <button
              className="btn btn-outline btn-sm"
              onClick={handleResetPlot}
              title="Reset plotted points to plot manually"
            >
              <RotateCcw size={16} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      <div className="sim-workspace-split">
        {/* Table & Probe Controls */}
        <div className="sim-table-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4 style={{ color: '#ffd54f', margin: 0 }}>Hourly Stage Readings</h4>
            <span style={{ fontSize: '0.8rem', color: allPlotted ? '#00e676' : '#ffd54f' }}>
              {plottedPoints.length} / {TIME_POINTS.length} Plotted
            </span>
          </div>

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
                    title="Click row to plot/unplot on the line graph"
                  >
                    <td><strong>{pt.time}</strong></td>
                    <td style={{ color: '#00e5ff', fontWeight: 'bold' }}>{pt.targetTemp}°C</td>
                    <td>
                      <span
                        style={{
                          color: isPlotted ? '#00e676' : 'rgba(255,255,255,0.5)',
                          fontSize: '0.85rem',
                          fontWeight: isPlotted ? 'bold' : 'normal'
                        }}
                      >
                        {isPlotted ? 'Plotted ✓' : '+ Tap to Plot'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Interactive Probe Slider */}
          <div style={{ marginTop: '18px', background: 'rgba(255,255,255,0.06)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(0, 229, 255, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.9rem', color: '#ff4081', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Crosshair size={16} />
                Time Probe ({probeTimeString}):
              </span>
              <span style={{ color: '#ffd54f', fontWeight: 'bold', fontSize: '1rem' }}>
                {interpolatedTemp ? `${interpolatedTemp}°C` : 'Drag to Probe'}
              </span>
            </div>
            <input
              type="range"
              min="55"
              max="405"
              value={probeX}
              onChange={(e) => setProbeX(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#ff4081', cursor: 'ew-resize' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
              <span>8 AM (15°C)</span>
              <span>Drag slider or chart to interpolate!</span>
              <span>6 PM (18°C)</span>
            </div>
          </div>
        </div>

        {/* Line Graph Canvas */}
        <div className="sim-chart-container">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            width="100%"
            height="230"
            style={{ cursor: isDraggingProbe ? 'ew-resize' : 'crosshair', userSelect: 'none' }}
            onPointerDown={handlePointerDown}
          >
            {/* Gridlines */}
            {[0, 10, 20, 30, 40].map((temp) => {
              const y = yForTemp(temp);
              return (
                <g key={temp}>
                  <line x1="45" y1={y} x2="435" y2={y} stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="38" y={y + 4} fill="rgba(255,255,255,0.7)" fontSize="10" fontWeight="bold" textAnchor="end">{temp}°</text>
                </g>
              );
            })}

            {/* Axes */}
            <line x1="45" y1={paddingTop + graphH} x2="435" y2={paddingTop + graphH} stroke="white" strokeWidth="2" />
            <line x1="45" y1={paddingTop} x2="45" y2={paddingTop + graphH} stroke="white" strokeWidth="2" />

            {/* Vertical column guides & click-to-plot strips */}
            {TIME_POINTS.map((pt, idx) => {
              const isPlotted = plottedPoints.some((p) => p.time === pt.time);
              const targetY = yForTemp(pt.targetTemp);

              return (
                <g key={idx}>
                  {/* Subtle column guide line */}
                  <line
                    x1={pt.x}
                    y1={paddingTop}
                    x2={pt.x}
                    y2={paddingTop + graphH}
                    stroke={isPlotted ? 'rgba(0, 229, 255, 0.2)' : 'rgba(255,255,255,0.06)'}
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />

                  {/* Vertical click column strip to plot easily */}
                  <rect
                    x={pt.x - 24}
                    y={paddingTop}
                    width={48}
                    height={graphH}
                    fill="transparent"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleTogglePlot(pt)}
                  />

                  {/* Ghost circle indicator if NOT yet plotted */}
                  {!isPlotted && (
                    <g
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleTogglePlot(pt)}
                      className="pulse-ghost-target"
                    >
                      <circle
                        cx={pt.x}
                        cy={targetY}
                        r="9"
                        fill="rgba(0, 229, 255, 0.15)"
                        stroke="#00e5ff"
                        strokeWidth="2"
                        strokeDasharray="3 2"
                      />
                      <circle cx={pt.x} cy={targetY} r="3" fill="#00e5ff" />
                      <text
                        x={pt.x}
                        y={targetY - 12}
                        fill="#00e5ff"
                        fontSize="9"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        + Plot {pt.targetTemp}°
                      </text>
                    </g>
                  )}

                  {/* Time label on X-axis */}
                  <text
                    x={pt.x}
                    y={chartHeight - 16}
                    fill={isPlotted ? '#ffd54f' : 'rgba(255,255,255,0.7)'}
                    fontSize="11"
                    fontWeight={isPlotted ? 'bold' : 'normal'}
                    textAnchor="middle"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleTogglePlot(pt)}
                  >
                    {pt.time}
                  </text>
                </g>
              );
            })}

            {/* Connecting line segments between contiguous plotted points */}
            {SEGMENTS.map((seg) => {
              const pt1 = TIME_POINTS[seg.idx];
              const pt2 = TIME_POINTS[seg.idx + 1];
              const p1Plotted = plottedPoints.some((p) => p.time === pt1.time);
              const p2Plotted = plottedPoints.some((p) => p.time === pt2.time);

              if (!p1Plotted || !p2Plotted) return null;

              const y1 = yForTemp(pt1.targetTemp);
              const y2 = yForTemp(pt2.targetTemp);
              const isSelected = selectedSegment === seg.idx;
              const isHovered = hoveredSegment === seg.idx;

              return (
                <g key={seg.idx}>
                  {/* Glowing background aura if selected */}
                  {isSelected && (
                    <line
                      x1={pt1.x}
                      y1={y1}
                      x2={pt2.x}
                      y2={y2}
                      stroke={seg.isSteepest ? '#00e676' : '#ffd54f'}
                      strokeWidth={10}
                      strokeLinecap="round"
                      opacity="0.4"
                    />
                  )}

                  {/* Visible Line Segment */}
                  <line
                    x1={pt1.x}
                    y1={y1}
                    x2={pt2.x}
                    y2={y2}
                    stroke={isSelected ? (seg.isSteepest ? '#00e676' : '#ffd54f') : isHovered ? '#ffd54f' : '#00e5ff'}
                    strokeWidth={isSelected ? 5.5 : isHovered ? 4.5 : 3.5}
                    strokeLinecap="round"
                  />

                  {/* Midpoint delta pill when selected or hovered */}
                  {(isSelected || isHovered) && (
                    <g transform={`translate(${(pt1.x + pt2.x) / 2}, ${(y1 + y2) / 2 - 14})`}>
                      <rect
                        x="-24"
                        y="-10"
                        width="48"
                        height="18"
                        rx="9"
                        fill="#14103c"
                        stroke={isSelected ? (seg.isSteepest ? '#00e676' : '#ffd54f') : '#00e5ff'}
                        strokeWidth="1.5"
                      />
                      <text
                        x="0"
                        y="3"
                        fill={seg.isRise ? '#00e676' : '#ff8a80'}
                        fontSize="9"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {seg.delta > 0 ? `+${seg.delta}°` : `${seg.delta}°`}
                      </text>
                    </g>
                  )}

                  {/* Transparent Wide Hit Line for effortless clicking */}
                  <line
                    x1={pt1.x}
                    y1={y1}
                    x2={pt2.x}
                    y2={y2}
                    stroke="transparent"
                    strokeWidth={32}
                    strokeLinecap="round"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleSelectSegment(seg.idx)}
                    onMouseEnter={() => setHoveredSegment(seg.idx)}
                    onMouseLeave={() => setHoveredSegment(null)}
                  />
                </g>
              );
            })}

            {/* Plotted Points (Gold and Glowing) */}
            {plottedPoints.map((pt, idx) => {
              const y = yForTemp(pt.targetTemp);
              return (
                <g
                  key={idx}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleTogglePlot(pt)}
                >
                  <circle cx={pt.x} cy={y} r="8" fill="rgba(255, 213, 79, 0.3)" />
                  <circle cx={pt.x} cy={y} r="5.5" fill="#ffd54f" stroke="#14103c" strokeWidth="2" />
                  <text x={pt.x} y={y - 9} fill="white" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                    {pt.targetTemp}°
                  </text>
                </g>
              );
            })}

            {/* Vertical Interpolation Probe Needle */}
            {allPlotted && (
              <g pointerEvents="none">
                <line
                  x1={probeX}
                  y1={paddingTop}
                  x2={probeX}
                  y2={paddingTop + graphH}
                  stroke="#ff4081"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                {interpolatedTemp && (
                  <g>
                    <circle cx={probeX} cy={probeY} r="8" fill="rgba(255, 64, 129, 0.35)" />
                    <circle cx={probeX} cy={probeY} r="5" fill="#ff4081" stroke="white" strokeWidth="1.5" />
                    {/* Tooltip bubble on probe */}
                    <g transform={`translate(${Math.max(80, Math.min(370, probeX))}, ${Math.max(paddingTop + 14, probeY - 20)})`} className="probe-tooltip-tag">
                      <rect x="-65" y="-12" width="130" height="20" rx="10" fill="#0d0a28" stroke="#ff4081" strokeWidth="1.5" />
                      <text x="0" y="2" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                        🕒 {probeTimeString} • {interpolatedTemp}°C
                      </text>
                    </g>
                  </g>
                )}
              </g>
            )}
          </svg>

          {/* Steepest Rise Challenge Box */}
          <div style={{ marginTop: '16px', width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: 'rgba(255,255,255,0.06)', padding: '12px 18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#ffd54f', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <TrendingUp size={16} />
                  Steepest Rise Challenge:
                </span>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
                  Tap a segment on the graph or choose below:
                </span>
              </div>

              {/* Segment Choice Buttons */}
              <div className="trend-segment-row">
                {SEGMENTS.map((seg) => {
                  const isSelected = selectedSegment === seg.idx;
                  return (
                    <button
                      key={seg.idx}
                      className={`trend-segment-btn ${isSelected ? (seg.isSteepest ? 'is-correct' : 'is-wrong') : ''}`}
                      onClick={() => handleSelectSegment(seg.idx)}
                      disabled={!allPlotted}
                      title={seg.text}
                    >
                      <span>{seg.label}</span>
                      <span className={seg.isRise ? 'seg-badge-rise' : 'seg-badge-fall'}>
                        {seg.delta > 0 ? `+${seg.delta}°C ↗` : `${seg.delta}°C ↘`}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback text */}
              {selectedSegment !== null && (
                <div
                  style={{
                    marginTop: '10px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: isSteepestCorrect ? 'rgba(0, 230, 118, 0.15)' : 'rgba(239, 83, 80, 0.15)',
                    border: `1px solid ${isSteepestCorrect ? '#00e676' : '#ef5350'}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <Mascot mood={isSteepestCorrect ? 'celebrating' : 'curious'} size="small" />
                  <div>
                    <strong style={{ color: isSteepestCorrect ? '#00e676' : '#ef5350', fontSize: '0.92rem' }}>
                      {isSteepestCorrect ? '✓ Excellent Job!' : 'Not quite steepest!'}
                    </strong>
                    <p style={{ color: 'white', fontSize: '0.86rem', margin: '2px 0 0 0' }}>
                      {SEGMENTS[selectedSegment].hint}
                    </p>
                  </div>
                </div>
              )}

              {!allPlotted && (
                <p style={{ color: '#ffd54f', fontSize: '0.82rem', marginTop: '8px', textAlign: 'center' }}>
                  💡 Tip: Tap the ghost circles on the chart or table rows to plot all 6 readings!
                </p>
              )}
            </div>

            {/* Complete Station Button */}
            <button
              className="btn btn-primary"
              style={{
                alignSelf: 'center',
                padding: '12px 32px',
                fontSize: '1rem',
                boxShadow: isSteepestCorrect ? '0 0 20px rgba(0, 230, 118, 0.5)' : undefined
              }}
              onClick={handleSubmit}
              disabled={!allPlotted || !isSteepestCorrect}
            >
              <CheckCircle2 size={20} />
              <span>
                {isFinished
                  ? 'Station B Completed! ✓'
                  : !allPlotted
                  ? 'Plot all 6 readings first'
                  : !isSteepestCorrect
                  ? 'Select steepest rise segment above'
                  : 'Complete Station B & Next Station →'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

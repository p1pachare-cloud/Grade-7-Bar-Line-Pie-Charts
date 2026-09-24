import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import Mascot from '../Mascot';
import { stationDNarration } from '../../utils/narration';
import { narrate } from '../../utils/audio';

const SCENARIOS = [
  { id: 1, text: "Ravi's daily step count recorded each day for 7 days", best: 'Line' },
  { id: 2, text: "How Priya splits her $50 weekly allowance across 4 expenses", best: 'Pie' },
  { id: 3, text: "Number of goals scored by 5 different soccer teams", best: 'Bar' },
  { id: 4, text: "Outdoor temperature checked every two hours from morning to evening", best: 'Line' },
  { id: 5, text: "Share of class votes for 4 president candidates (sums to 100%)", best: 'Pie' },
  { id: 6, text: "Comparing number of library books read by 4 friends", best: 'Bar' },
];

export default function ChartDoctorStation({ audioEnabled, onComplete, onPerfectStationD }) {
  const [part, setPart] = useState(1); // 1 = sorting scenarios, 2 = spot the trick
  const [buckets, setBuckets] = useState({ Bar: [], Line: [], Pie: [] });
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [selectedFlaw, setSelectedFlaw] = useState(null);
  const [flawConfirmed, setFlawConfirmed] = useState(false);

  useEffect(() => {
    narrate(stationDNarration(), audioEnabled);
  }, [audioEnabled]);

  const currentScenario = SCENARIOS[activeScenarioIdx];

  const handlePlaceInBucket = (bucketName) => {
    if (!currentScenario) return;

    if (currentScenario.best === bucketName) {
      setBuckets((prev) => ({
        ...prev,
        [bucketName]: [...prev[bucketName], currentScenario]
      }));

      if (activeScenarioIdx < SCENARIOS.length - 1) {
        setActiveScenarioIdx((i) => i + 1);
      } else {
        // Part 1 complete, move to Part 2!
        setPart(2);
      }
    } else {
      setHasError(true);
      if (onPerfectStationD) onPerfectStationD(false);
    }
  };

  const handleDiagnoseFlaw = (flaw) => {
    setSelectedFlaw(flaw);
    if (flaw === 'truncated_axis') {
      setFlawConfirmed(true);
      if (!hasError && onPerfectStationD) {
        onPerfectStationD(true);
      }
      onComplete();
    }
  };

  return (
    <div className="sim-station-layout">
      {/* Header */}
      <div className="sim-station-header">
        <div>
          <span className="round-badge">Station D • Abstract &amp; Critique</span>
          <h3 style={{ color: 'white', marginTop: '6px', fontSize: '1.4rem' }}>
            Station D — Chart Doctor (Chooser &amp; Trick Catcher)
          </h3>
        </div>

        <div style={{ color: '#ffd54f', fontWeight: 'bold' }}>
          Part {part} of 2: {part === 1 ? 'Categorize Scenarios' : 'Spot the Trickster Flaw'}
        </div>
      </div>

      {part === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Active Card to place */}
          <div style={{ background: 'rgba(124, 92, 191, 0.25)', border: '1.5px solid #00e5ff', padding: '20px', borderRadius: '14px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#00e5ff', fontWeight: 'bold', textTransform: 'uppercase' }}>
              Scenario {activeScenarioIdx + 1} of {SCENARIOS.length}:
            </span>
            <h4 style={{ color: 'white', fontSize: '1.25rem', marginTop: '8px' }}>
              "{currentScenario.text}"
            </h4>
            <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', display: 'block', marginTop: '6px' }}>
              Which chart format best displays this information? Tap a bucket below!
            </span>
          </div>

          {/* 3 Buckets */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {['Bar', 'Line', 'Pie'].map((bucketType) => (
              <div
                key={bucketType}
                className="glass-card"
                style={{
                  padding: '20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  border: '1.5px solid rgba(255,255,255,0.2)',
                  transition: 'all 0.2s ease',
                  background: 'rgba(20, 16, 60, 0.85)'
                }}
                onClick={() => handlePlaceInBucket(bucketType)}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
                  {bucketType === 'Bar' ? '📊' : bucketType === 'Line' ? '📈' : '🥧'}
                </div>
                <h4 style={{ color: '#ffd54f', fontSize: '1.2rem', marginBottom: '4px' }}>
                  {bucketType} Chart
                </h4>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
                  {bucketType === 'Bar' ? 'Discrete categories' : bucketType === 'Line' ? 'Change over time' : 'Share of 100% whole'}
                </span>

                {/* Placed cards count */}
                <div style={{ marginTop: '12px', fontSize: '0.85rem', color: '#00e676', fontWeight: 'bold' }}>
                  {buckets[bucketType].length} Placed ✓
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {part === 2 && (
        <div className="sim-workspace-split">
          {/* Flawed Chart Preview */}
          <div className="sim-chart-container">
            <h4 style={{ color: '#ef5350', marginBottom: '8px' }}>
              ⚠️ Trickster Chart on the Data Wall
            </h4>
            <svg viewBox="0 0 320 200" width="100%" height="200">
              <rect width="320" height="200" rx="8" fill="#0d0a2d" />
              <line x1="50" y1="160" x2="280" y2="160" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <line x1="50" y1="35" x2="50" y2="160" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              {/* Truncated axis */}
              <text x="44" y="158" fill="#ef5350" fontSize="11" fontWeight="bold" textAnchor="end">80</text>
              <text x="44" y="95" fill="white" fontSize="10" textAnchor="end">85</text>
              <text x="44" y="45" fill="white" fontSize="10" textAnchor="end">90</text>
              {/* Bars */}
              <rect x="80" y="110" width="40" height="50" fill="#00e5ff" rx="2" />
              <text x="100" y="100" fill="white" fontSize="11" textAnchor="middle">84</text>
              <text x="100" y="176" fill="white" fontSize="10" textAnchor="middle">Team A</text>
              <rect x="180" y="55" width="40" height="105" fill="#ffc107" rx="2" />
              <text x="200" y="45" fill="white" fontSize="11" textAnchor="middle">88</text>
              <text x="200" y="176" fill="white" fontSize="10" textAnchor="middle">Team B</text>
            </svg>
            <span style={{ fontSize: '0.85rem', color: '#ffd54f', marginTop: '8px' }}>
              Team B looks more than twice as tall as Team A! But values are 88 vs 84!
            </span>
          </div>

          {/* Diagnostic Selector */}
          <div className="sim-table-card">
            <h4 style={{ color: '#ffd54f', marginBottom: '10px' }}>Doctor's Diagnosis</h4>
            <p style={{ color: 'white', fontSize: '0.95rem', marginBottom: '14px' }}>
              What serious mathematical flaw makes this chart misleading?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { id: 'truncated_axis', text: 'Truncated Axis: y-axis starts at 80 instead of 0, exaggerating differences' },
                { id: 'uneven_scale', text: 'Uneven grid intervals along the horizontal axis' },
                { id: 'wrong_chart', text: 'Should have been a line graph instead of a bar chart' },
              ].map((flaw) => (
                <button
                  key={flaw.id}
                  className={`btn ${selectedFlaw === flaw.id ? (flaw.id === 'truncated_axis' ? 'btn-primary' : 'btn-outline') : 'btn-outline'}`}
                  style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '12px 18px', fontSize: '0.95rem' }}
                  onClick={() => handleDiagnoseFlaw(flaw.id)}
                >
                  <AlertTriangle size={18} style={{ flexShrink: 0, marginRight: '8px', color: flaw.id === 'truncated_axis' ? '#ffd54f' : '#ef5350' }} />
                  <span>{flaw.text}</span>
                </button>
              ))}
            </div>

            {flawConfirmed && (
              <div style={{ marginTop: '16px', color: '#00e676', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={20} />
                <span><strong>Diagnosis Verified!</strong> All 4 Stations are now complete!</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

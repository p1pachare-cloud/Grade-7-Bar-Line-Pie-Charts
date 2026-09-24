import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, CheckCircle, Zap, Scan, Beaker, ShieldCheck } from 'lucide-react';
import BarBuilderStation from '../simulations/BarBuilderStation';
import TrendTrackerStation from '../simulations/TrendTrackerStation';
import PieSlicerStation from '../simulations/PieSlicerStation';
import ChartDoctorStation from '../simulations/ChartDoctorStation';
import Mascot from '../Mascot';

const STATIONS = [
  {
    id: 0,
    name: 'Bar Builder',
    tag: 'Station A • Concrete',
    icon: <Zap size={18} />,
    desc: 'Drag bar tops, set scale intervals, and construct double bar charts.'
  },
  {
    id: 1,
    name: 'Trend Tracker',
    tag: 'Station B • Pictorial',
    icon: <Scan size={18} />,
    desc: 'Plot readings, interpolate with the Time Probe, and spot trends.'
  },
  {
    id: 2,
    name: 'Pie Slicer',
    tag: 'Station C • Abstract',
    icon: <Beaker size={18} />,
    desc: 'Turn the Protractor Dial, calculate sector angles, and cut 360° slices.'
  },
  {
    id: 3,
    name: 'Chart Doctor',
    tag: 'Station D • Critique',
    icon: <ShieldCheck size={18} />,
    desc: 'Sort data scenarios into Bar/Line/Pie and expose misleading charts.'
  }
];

export default function SimulatePhase({
  onNext,
  audioEnabled,
  onSimulationsComplete,
  onSpotterResult
}) {
  const [stationIdx, setStationIdx] = useState(0);
  const [completedStations, setCompletedStations] = useState([false, false, false, false]);

  const handleStationComplete = (index) => {
    const updated = [...completedStations];
    updated[index] = true;
    setCompletedStations(updated);

    if (index < 3) {
      setStationIdx(index + 1);
    } else {
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch (e) {}
      if (onSimulationsComplete) onSimulationsComplete();
    }
  };

  return (
    <div className="phase-container simulate-phase-curious">
      <div className="glass-card simulate-main-card">
        {/* Top Header */}
        <div className="simulate-phase-top-bar">
          <div className="simulate-title-group">
            <span className="phase-tag">PHASE 3 — SIMULATE</span>
            <h2 className="simulate-main-title">The Data Explorer Laboratory</h2>
            <p className="simulate-tagline">
              Experiment with hands-on bar dragging, interpolation probes, protractor dial sector slicing, and misleading chart critique!
            </p>
          </div>

          {/* 4 Laboratory Station Tabs Hub */}
          <div className="simulate-stations-hub">
            {STATIONS.map((st, i) => {
              const isActive = i === stationIdx;
              const isDone = completedStations[i];
              return (
                <div
                  key={st.id}
                  className={`station-hub-card ${isActive ? 'is-active-station' : ''} ${isDone ? 'is-station-done' : ''}`}
                  onClick={() => setStationIdx(i)}
                >
                  <div className="station-card-icon-row">
                    <span className="station-icon-badge">{st.icon}</span>
                    <span className="station-tag-label">{st.tag}</span>
                    {isDone && <CheckCircle size={16} className="done-check-icon" style={{ marginLeft: 'auto', color: '#00e676' }} />}
                  </div>
                  <h4 className="station-hub-name">{st.name}</h4>
                  <p className="station-hub-desc">{st.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Station Workspace */}
        <div className="simulation-active-stage">
          {stationIdx === 0 && (
            <BarBuilderStation
              audioEnabled={audioEnabled}
              onComplete={() => handleStationComplete(0)}
            />
          )}

          {stationIdx === 1 && (
            <TrendTrackerStation
              audioEnabled={audioEnabled}
              onComplete={() => handleStationComplete(1)}
            />
          )}

          {stationIdx === 2 && (
            <PieSlicerStation
              audioEnabled={audioEnabled}
              onComplete={() => handleStationComplete(2)}
            />
          )}

          {stationIdx === 3 && (
            <ChartDoctorStation
              audioEnabled={audioEnabled}
              onComplete={() => handleStationComplete(3)}
              onPerfectStationD={onSpotterResult}
            />
          )}
        </div>

        {/* All 4 Stations Mastered Celebration Banner */}
        {completedStations.every(Boolean) && (
          <div className="simulation-all-complete-banner curious-complete-banner">
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Mascot mood="celebrating" size="medium" />
              <div>
                <h3 style={{ color: 'white', fontSize: '1.4rem', marginBottom: '4px' }}>
                  🎉 All 4 Laboratory Stations Mastered!
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem' }}>
                  You conquered Bar Builder, Trend Tracker, Pie Slicer, and Chart Doctor. Ready for the 100-challenge Practice Phase?
                </p>
              </div>
            </div>
            <button className="btn btn-primary btn-lg" onClick={onNext}>
              <span>Enter Practice Phase (100 Challenges)</span>
              <ArrowRight size={22} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

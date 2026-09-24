import React from 'react';
import { Star, Lock, MapPin } from 'lucide-react';
import { worlds } from '../../data/questionBank';
import { calcStars, canUnlockWorld } from '../../utils/scoring';

export default function WorldMap({ worldScores = [], currentWorld = 0, onSelectWorld }) {
  return (
    <div className="world-map-wrapper">
      <div className="world-map-header">
        <MapPin size={20} />
        <h3>Global Landmark Challenge Map (10 Worlds)</h3>
      </div>

      <div className="world-scroll-container">
        {worlds.map((world, idx) => {
          const score = worldScores[idx];
          const stars = score !== null ? calcStars(score) : 0;
          const isUnlocked = idx === 0 || canUnlockWorld(worldScores[idx - 1]);
          const isActive = idx === currentWorld;

          return (
            <div
              key={world.id}
              className={`world-card-chip ${isActive ? 'active-world' : ''} ${isUnlocked ? 'unlocked' : 'locked'}`}
              onClick={() => isUnlocked && onSelectWorld(idx)}
            >
              <div className="world-num-badge">World {idx + 1}</div>

              <div className="world-landmark-title">{world.landmark}</div>
              <div className="world-country-name">{world.country}</div>

              {isUnlocked ? (
                <div className="world-stars-row">
                  {Array.from({ length: 3 }).map((_, s) => (
                    <Star
                      key={s}
                      size={14}
                      className={s < stars ? 'star-filled' : 'star-empty'}
                    />
                  ))}
                </div>
              ) : (
                <div className="world-lock-icon" style={{ marginTop: '6px' }}>
                  <Lock size={15} color="rgba(255,255,255,0.4)" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

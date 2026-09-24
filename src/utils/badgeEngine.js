export const BADGES = [
  {
    id: 'chart_rookie',
    label: '🏅 Chart Rookie',
    description: 'Complete Wonder & Story phases including Concept Cards',
    condition: (state) => state.phaseComplete?.wonder && state.phaseComplete?.story
  },
  {
    id: 'graph_builder',
    label: '🛠️ Graph Builder',
    description: 'Complete all 4 Simulation stations',
    condition: (state) => state.simStationsComplete && state.simStationsComplete.every(Boolean)
  },
  {
    id: 'data_champion',
    label: '🥇 Data Champion',
    description: 'Score ≥80% in the Practice Phase',
    condition: (state) => {
      const sum = (state.worldScores || []).reduce((acc, score) => acc + (score || 0), 0);
      return sum >= 80;
    }
  },
  {
    id: 'perfect_chart',
    label: '💎 Perfect Chart',
    description: 'Score a perfect 10/10 in any single world',
    condition: (state) => (state.worldScores || []).some((score) => score === 10)
  },
  {
    id: 'streak_star',
    label: '🔥 Streak Star',
    description: 'Achieve a streak of 10 consecutive correct answers',
    condition: (state) => (state.maxStreak || 0) >= 10
  },
  {
    id: 'sharp_eye',
    label: '🎯 Sharp Eye',
    description: 'Finish Station D with no wrong selections',
    condition: (state) => !!state.stationDPerfect
  },
  {
    id: 'angle_ace',
    label: '📐 Angle Ace',
    description: 'Answer 5 pie-angle questions on the first try',
    condition: (state) => (state.angleFirstTry || 0) >= 5
  },
  {
    id: 'trend_spotter',
    label: '📈 Trend Spotter',
    description: 'Answer 5 line-graph trend questions on the first try',
    condition: (state) => (state.trendFirstTry || 0) >= 5
  },
  {
    id: 'trick_catcher',
    label: '🕵️ Trick Catcher',
    description: 'Identify 5 misleading charts correctly',
    condition: (state) => (state.trickCaught || 0) >= 5
  },
  {
    id: 'global_explorer',
    label: '🌍 Global Explorer',
    description: 'Complete all 6 phases of the lesson',
    condition: (state) =>
      state.phaseComplete?.wonder &&
      state.phaseComplete?.story &&
      state.phaseComplete?.simulate &&
      state.phaseComplete?.practice &&
      state.phaseComplete?.reflect
  }
];

export function checkBadges(state) {
  const currentBadges = state.badges || [];
  const newlyUnlocked = [];

  for (const badge of BADGES) {
    if (!currentBadges.includes(badge.id)) {
      if (badge.condition(state)) {
        newlyUnlocked.push(badge.id);
      }
    }
  }

  return newlyUnlocked;
}

export function calcXP(attemptNumber, hintsUsed = 0, streak = 0) {
  let baseXP = 10;
  if (hintsUsed > 0) {
    baseXP = 5;
  } else if (attemptNumber === 2) {
    baseXP = 7;
  } else if (attemptNumber >= 3) {
    baseXP = 5;
  }

  // Streak bonus (+5 XP if streak is 5 or more)
  const streakBonus = streak >= 5 ? 5 : 0;
  return baseXP + streakBonus;
}

export function calcStars(score) {
  if (score === null || score === undefined || score < 5) return 0;
  if (score < 8) return 1;
  if (score < 10) return 2;
  return 3;
}

export function canUnlockWorld(prevWorldScore) {
  if (prevWorldScore === null || prevWorldScore === undefined) return false;
  return prevWorldScore >= 5;
}

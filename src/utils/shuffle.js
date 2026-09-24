export function shuffleArray(array) {
  if (!array || !Array.isArray(array)) return [];
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateSessionQuestions(bank) {
  if (!bank || !Array.isArray(bank)) return [];
  return bank.map((q) => {
    const originalOptions = q.options ? [...q.options] : [];
    // Ensure correctAnswer is included
    if (q.correctAnswer && !originalOptions.some(o => String(o).trim() === String(q.correctAnswer).trim())) {
      originalOptions.push(q.correctAnswer);
    }
    const shuffled = shuffleArray(originalOptions);

    return {
      ...q,
      options: shuffled
    };
  });
}

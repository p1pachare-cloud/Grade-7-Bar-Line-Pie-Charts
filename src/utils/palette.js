export const CATEGORICAL_PALETTE = [
  '#00e5ff', // Neon Cyan
  '#ffc107', // Gold / Amber
  '#ff4081', // Neon Pink / Magenta
  '#00e676', // Bright Emerald
  '#7c5cbf', // Violet / Purple
  '#ff7043', // Coral
  '#29b6f6', // Light Blue
  '#ab47bc'  // Purple-pink
];

export const DOUBLE_BAR_SERIES = [
  { name: 'Series A / School 1', color: '#00e5ff' },
  { name: 'Series B / School 2', color: '#ffc107' }
];

export function getPaletteColor(index) {
  return CATEGORICAL_PALETTE[index % CATEGORICAL_PALETTE.length];
}

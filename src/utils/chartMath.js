export function calcSectorAngle(frequency, total) {
  if (!total || total <= 0) return 0;
  return Math.round((frequency / total) * 360);
}

export function calcFrequencyFromAngle(angle, total) {
  if (!total || total <= 0) return 0;
  return Math.round((angle / 360) * total);
}

export function percentToAngle(percent) {
  return Math.round((percent / 100) * 360);
}

export function angleToPercent(angle) {
  return Math.round((angle / 360) * 100);
}

export function interpolateLine(x, x0, y0, x1, y1) {
  if (x1 === x0) return y0;
  return y0 + (y1 - y0) * ((x - x0) / (x1 - x0));
}

export function snapToInterval(value, interval, snapHalf = false) {
  const step = snapHalf ? interval / 2 : interval;
  return Math.round(value / step) * step;
}

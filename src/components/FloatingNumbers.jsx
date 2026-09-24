import React, { useMemo } from 'react';

const ICONS = ['📊', '📈', '🥧', '📐', '%', '°', '360°', '100%', '0', '50', 'x', 'y'];

export default function FloatingNumbers() {
  const items = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      text: ICONS[i % ICONS.length],
      left: `${(i * 5.5 + Math.random() * 4) % 94}%`,
      top: `${(i * 6.2 + Math.random() * 5) % 92}%`,
      animationDuration: `${16 + (i % 6) * 3}s`,
      animationDelay: `${(i % 5) * 1.5}s`,
      fontSize: `${2.2 + (i % 3) * 0.8}rem`
    }));
  }, []);

  return (
    <div className="floating-numbers" aria-hidden="true">
      {items.map((it) => (
        <span
          key={it.id}
          className="floating-number"
          style={{
            left: it.left,
            top: it.top,
            animationDuration: it.animationDuration,
            animationDelay: it.animationDelay,
            fontSize: it.fontSize
          }}
        >
          {it.text}
        </span>
      ))}
    </div>
  );
}

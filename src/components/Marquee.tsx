import React from 'react';

const ACCENTS = ['var(--blue)', 'var(--coral)', 'var(--sky)', 'var(--violet)', 'var(--amber)'];

// The track translates -50% and loops, so it renders two identical halves.
// Each half repeats the items three times to stay wider than any viewport,
// and accents key off the position within one item set so the halves match
// at the seam.
const SETS_PER_HALF = 3;

export function Marquee({ items }: { items: string[] }) {
  const track = Array.from({ length: SETS_PER_HALF * 2 }, () => items).flat();

  return (
    <div className="marquee border-y-2 border-ink bg-surface py-4" aria-hidden="true">
      <div className="marquee-track">
        {track.map((item, index) => {
          const posInSet = index % items.length;
          return (
            <span
              key={index}
              className="marquee-item font-mono text-xs font-medium uppercase tracking-[0.14em]"
            >
              {item}
              <span style={{ color: ACCENTS[posInSet % ACCENTS.length] }}>◆</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  dek?: string;
  accent?: string;
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  dek,
  accent = 'var(--blue)',
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className="mb-14 max-w-[62ch]">
      <p className={`eyebrow ${dark ? 'eyebrow--dark' : ''}`}>
        <span style={{ color: accent }} aria-hidden="true">◆</span>
        {eyebrow}
      </p>
      <h2 className="mt-4 text-[clamp(1.9rem,3.4vw,2.4rem)] font-semibold leading-[1.12] tracking-[-0.02em]">
        {title}
      </h2>
      {dek && (
        <p className={`mt-4 text-[1.125rem] leading-[1.65] ${dark ? 'text-muted-inv' : 'text-muted'}`}>
          {dek}
        </p>
      )}
    </div>
  );
}

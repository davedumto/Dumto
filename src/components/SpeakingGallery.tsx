'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const DWELL_MS = 4600;

export interface GalleryImage {
  src: string;
  alt: string;
  accent: string;
  /** CSS object-position; defaults to "center top" so heads never crop */
  pos?: string;
}

export function SpeakingGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

  // Mobile carousel autoplay state. The current card lives in a ref, kept in
  // sync from scroll events, so manual swipes don't need re-renders.
  const trackRef = useRef<HTMLDivElement>(null);
  const trackIndexRef = useRef(0);
  const resumeTimerRef = useRef<number | undefined>(undefined);
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackInView, setTrackInView] = useState(false);
  const [touching, setTouching] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  const playing = inView && !paused && !reducedMotion && images.length > 1;

  // `active` is a dependency on purpose: a manual jump restarts the dwell,
  // keeping the interval and the progress bar in sync.
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setActive((index) => (index + 1) % images.length);
    }, DWELL_MS);
    return () => clearInterval(id);
  }, [playing, images.length, active]);

  // focus behaves identically to pointerenter so keyboard users get the same thing
  const selectAndHold = (index: number) => {
    setActive(index);
    setPaused(true);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      ([entry]) => setTrackInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const trackPlaying = trackInView && !touching && !reducedMotion && images.length > 1;

  useEffect(() => {
    if (!trackPlaying) return;
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const cards = Array.from(track.children) as HTMLElement[];
      if (cards.length === 0) return;
      const next = (trackIndexRef.current + 1) % cards.length;
      trackIndexRef.current = next;
      setTrackIndex(next);
      const card = cards[next];
      track.scrollTo({
        left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2,
        behavior: 'smooth',
      });
    }, DWELL_MS);
    return () => clearInterval(id);
  }, [trackPlaying]);

  useEffect(() => () => window.clearTimeout(resumeTimerRef.current), []);

  // pause while the user's finger is down; resume a few seconds after release
  const holdTrack = () => {
    window.clearTimeout(resumeTimerRef.current);
    setTouching(true);
  };
  const releaseTrack = () => {
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => setTouching(false), 5000);
  };

  // keep the autoplay index in sync with wherever the user scrolled to
  const syncTrackIndex = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const center = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft + card.clientWidth / 2 - center);
      if (distance < best) {
        best = distance;
        nearest = index;
      }
    });
    trackIndexRef.current = nearest;
    setTrackIndex(nearest);
  };

  if (images.length === 0) return null;

  return (
    <>
      {/* Desktop: horizontal spread accordion */}
      <div
        ref={railRef}
        role="group"
        aria-label="Speaking engagement photos"
        className="gallery-rail hidden lg:flex"
        onPointerLeave={() => setPaused(false)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setPaused(false);
          }
        }}
      >
        {images.map((image, index) => {
          const expanded = index === active;
          return (
            <button
              key={image.src}
              type="button"
              className="gallery-slat"
              style={{ '--accent': image.accent } as React.CSSProperties}
              aria-expanded={expanded}
              aria-label={image.alt}
              onPointerEnter={() => selectAndHold(index)}
              onFocus={() => selectAndHold(index)}
              onClick={() => setActive(index)}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                style={{ objectPosition: image.pos ?? 'center top' }}
                priority={index === 0}
              />
              <span className="gallery-slat__closed" aria-hidden="true">
                <span className="font-mono text-xs font-medium">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="gallery-slat__dot" />
              </span>
              {playing && expanded && (
                <span
                  key={active}
                  className="gallery-progress"
                  style={{ animationDuration: `${DWELL_MS}ms` }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Below lg: horizontal swipe carousel with scroll snap; autoplays by
          swiping to the next card, pausing while the user is interacting */}
      <div
        ref={trackRef}
        className="no-scrollbar relative flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-4 pt-1 lg:hidden"
        onScroll={syncTrackIndex}
        onTouchStart={holdTrack}
        onTouchEnd={releaseTrack}
        onPointerDown={holdTrack}
        onPointerUp={releaseTrack}
        onPointerCancel={releaseTrack}
      >
        {images.map((image, index) => (
          <figure
            key={image.src}
            className="w-[76%] flex-none snap-center overflow-hidden rounded-[22px] border-2 border-ink sm:w-[46%] md:w-[38%]"
            style={{ boxShadow: `6px 6px 0 0 ${image.accent}`, '--accent': image.accent } as React.CSSProperties}
          >
            <div className="relative aspect-[4/5]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 640px) 46vw, 76vw"
                className="object-cover"
                style={{ objectPosition: image.pos ?? 'center top' }}
              />
              {trackPlaying && index === trackIndex && (
                <span
                  key={trackIndex}
                  className="gallery-progress"
                  style={{ animationDuration: `${DWELL_MS}ms` }}
                />
              )}
            </div>
            <figcaption className="flex items-center justify-between border-t-2 border-ink bg-surface px-4 py-3 font-mono text-xs font-medium uppercase tracking-[0.14em]">
              <span>{String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: image.accent }} />
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}

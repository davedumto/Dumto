'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BOOKING_EMAIL } from '../site';

const EASE: [number, number, number, number] = [0.22, 0.9, 0.24, 1];

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Newsletter', href: '#newsletter' },
  { label: 'Community', href: '#community' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => ({
      href: link.href,
      el: document.querySelector<HTMLElement>(link.href),
    }));

    const onScroll = () => {
      setScrolled(window.scrollY > 80);

      // Active section: the last one whose top has crossed the upper 40% of
      // the viewport; none while the hero is still on screen.
      const probeLine = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const section of sections) {
        if (section.el && section.el.getBoundingClientRect().top <= probeLine) {
          current = section.href;
        }
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.52, ease: EASE, delay },
  });

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 border-b-2 transition-colors duration-200 ${
          scrolled ? 'border-ink bg-paper' : 'border-transparent bg-transparent'
        }`}
      >
        <div className="container-page flex items-center justify-between py-4">
          {/* -my keeps the bigger mark from stretching the nav's height */}
          <a href="#top" className="flex items-center" aria-label="David Ejere, back to top">
            <Image
              src="/logo-wide.png"
              alt="David Ejere logo"
              width={196}
              height={48}
              priority
              className="-my-1 h-10 w-auto sm:h-12"
            />
          </a>
          <div className="hidden items-center gap-8 sm:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link text-sm ${activeSection === link.href ? 'nav-link--active' : ''}`}
                aria-current={activeSection === link.href ? 'true' : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a href={`mailto:${BOOKING_EMAIL}`} className="btn btn-primary px-5 py-3 text-sm">
            Book me
          </a>
        </div>
      </nav>

      <header id="top" className="relative flex min-h-screen items-center overflow-hidden pb-24 pt-28">
        <div className="container-page grid w-full items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Left — copy */}
          <div className="text-center lg:text-left">
            <motion.div {...reveal(0)}>
              <span className="chip">
                <span className="pulse-dot" />
                Inspiring audiences worldwide
              </span>
            </motion.div>

            <h1 className="mt-9 text-[clamp(3rem,7.5vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
              {/* per-line clip reveal: lines rise out of overflow-hidden wrappers */}
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
                >
                  David
                </motion.span>
              </span>
              <span className="block overflow-hidden px-2 pb-5 pt-2 lg:-ml-4">
                <motion.span
                  className="relative inline-block px-6 sm:px-8"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.23 }}
                >
                  {/* hand-drawn highlight box — the one place the geometry breaks */}
                  <svg
                    className="absolute inset-0 h-full w-full"
                    style={{ transform: 'rotate(-0.8deg)' }}
                    viewBox="0 0 330 126"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path d="M14 20 L310 10 L316 100 L8 112 Z" fill="var(--blue)" transform="translate(8 8)" />
                    <path d="M14 20 L310 10 L316 100 L8 112 Z" fill="var(--surface)" stroke="var(--ink)" strokeWidth="3" />
                  </svg>
                  <span className="relative">Ejere</span>
                </motion.span>
              </span>
            </h1>

            <motion.p
              {...reveal(0.45)}
              className="mx-auto mt-7 max-w-[46ch] text-lg text-muted sm:text-xl lg:mx-0"
            >
              Software Engineer turned public speaker and leadership expert,
              helping professionals unlock their potential.
            </motion.p>

            <motion.div
              {...reveal(0.6)}
              className="mt-11 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
            >
              <a href="#newsletter" className="btn btn-primary">
                Subscribe to newsletter <span aria-hidden="true">→</span>
              </a>
              <a href="#about" className="btn btn-secondary">
                More about me
              </a>
            </motion.div>
          </div>

          {/* Right — portrait, last in the entrance sequence */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
            className="relative mx-auto w-full max-w-[380px] lg:ml-auto lg:mr-2 lg:max-w-[440px]"
          >
            <div className="hero-portrait">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/hero-portrait.jpg"
                  alt="David Ejere, studio portrait"
                  fill
                  sizes="(min-width: 1024px) 440px, 90vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div {...reveal(1.0)} className="absolute inset-x-0 bottom-6 text-center">
          <a href="#about" className="font-mono text-xs font-medium tracking-[0.14em] text-label">
            SCROLL ↓
          </a>
        </motion.div>
      </header>
    </>
  );
}

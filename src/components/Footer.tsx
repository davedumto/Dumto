'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { SocialLinks } from './SocialLinks';
import { BOOKING_EMAIL } from '../site';

const EASE: [number, number, number, number] = [0.22, 0.9, 0.24, 1];

export function Footer() {
  return (
    <footer id="contact" className="border-t-2 border-ink bg-ink text-cream">
      <div className="container-page section">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.52, ease: EASE }}
        >
          <SectionHeading
            dark
            eyebrow="Contact"
            accent="var(--blue-lt)"
            title="Let's make your next event unforgettable."
            dek="Ready to transform your next event? Let's create an experience your audience won't stop talking about."
          />

          <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
            <a href={`mailto:${BOOKING_EMAIL}`} className="btn btn-inverse">
              Book me for your events <span aria-hidden="true">→</span>
            </a>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-inv">
                Follow me
              </span>
              <SocialLinks dark />
            </div>
          </div>
        </motion.div>

        <div className="mt-20 flex flex-col gap-3 border-t-2 border-cream/10 pt-8 font-mono text-xs tracking-[0.14em] text-muted-inv sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} DAVID EJERE · ALL RIGHTS RESERVED</span>
          <span>
            SPEAKING <span className="text-blue-lt" aria-hidden="true">◆</span> LEADERSHIP{' '}
            <span className="text-blue-lt" aria-hidden="true">◆</span> GROWTH
          </span>
        </div>
      </div>
    </footer>
  );
}

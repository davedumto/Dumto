'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { SpeakingGallery, type GalleryImage } from './SpeakingGallery';
import { CountUp } from './CountUp';
import { SocialLinks } from './SocialLinks';

const EASE: [number, number, number, number] = [0.22, 0.9, 0.24, 1];

const BIO =
  'With 5+ years of building software solutions and a deep passion for human potential, I transitioned into teaching leadership and personal development. I help professionals unlock their full potential by combining technical problem-solving mindsets with actionable leadership strategies that drive real transformation.';

// To add a photo: drop it in /public and add a row here. Accents just cycle
// through blue / coral / sky / amber / violet. Images crop anchored to the
// top by default; set `pos` for landscape shots where David is off-center.
const GALLERY: GalleryImage[] = [
  { src: '/panel-discussion.jpg', alt: 'David Ejere speaking on a panel discussion', accent: 'var(--blue)', pos: '30% top' },
  { src: '/podium-address.jpg', alt: 'David Ejere delivering a keynote from the podium', accent: 'var(--coral)', pos: '55% top' },
  { src: '/podium-gesture.jpg', alt: 'David Ejere speaking at the podium, hand raised', accent: 'var(--sky)', pos: '65% top' },
  { src: '/seminar-talk.jpg', alt: 'David Ejere speaking at a student seminar', accent: 'var(--amber)' },
  { src: '/stage-gesture.jpg', alt: 'David Ejere on stage, engaging the room', accent: 'var(--violet)' },
  { src: '/stage-full.jpg', alt: 'David Ejere addressing the audience on stage', accent: 'var(--blue)' },
  { src: '/DSC_0947.jpg', alt: 'David Ejere speaking at a leadership event', accent: 'var(--coral)' },
  { src: '/IMG_0960.jpg', alt: 'David Ejere presenting at a workshop', accent: 'var(--sky)' },
  { src: '/IMG_8463.jpg', alt: 'David Ejere engaging with the audience', accent: 'var(--amber)' },
  { src: '/front-row.jpg', alt: 'David Ejere seated in the front row at an event', accent: 'var(--violet)' },
];

const STATS = [
  { value: 30, suffix: '+', label: 'Speaking events', accent: 'var(--coral)' },
  { value: 5, suffix: '+', label: 'Years in tech', accent: 'var(--violet)' },
  { value: 1000, suffix: '+', label: 'Lives impacted', accent: 'var(--blue)' },
  { value: 5, suffix: '+', label: 'Countries reached', accent: 'var(--sky)' },
];

const SKILLS = ['Software Development', 'Leadership', 'Personal Development', 'Problem Solving'];

const revealProps = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.52, ease: EASE, delay },
});

export function About() {
  return (
    <section id="about" className="section">
      <div className="container-page">
        <motion.div {...revealProps()}>
          <SectionHeading
            eyebrow="About David"
            title="From shipping software to shaping leaders."
            dek={BIO}
          />
        </motion.div>

        <motion.div {...revealProps(0.06)}>
          <SpeakingGallery images={GALLERY} />
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-[30px]">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              {...revealProps(index * 0.06)}
              className="card card-hover p-6"
              style={{ '--card-accent': stat.accent } as React.CSSProperties}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-3xl font-medium sm:text-4xl">
                  <CountUp value={stat.value} />
                  {stat.suffix}
                </span>
                <span className="text-sm" style={{ color: stat.accent }} aria-hidden="true">◆</span>
              </div>
              <p className="mt-3 text-sm text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...revealProps()}
          className="mt-16 flex flex-col gap-10 border-t-2 border-ink pt-10 lg:flex-row lg:items-start lg:justify-between"
        >
          <div>
            <p className="eyebrow">
              <span className="text-blue" aria-hidden="true">◆</span>
              Expertise
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {SKILLS.map((skill) => (
                <span key={skill} className="chip">{skill}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow">
              <span className="text-coral" aria-hidden="true">◆</span>
              Connect with me
            </p>
            <div className="mt-4">
              <SocialLinks />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

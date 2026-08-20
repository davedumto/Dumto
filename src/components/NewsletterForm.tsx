'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from 'lucide-react';
import { toast } from 'sonner';
import { SectionHeading } from './SectionHeading';

const EASE: [number, number, number, number] = [0.22, 0.9, 0.24, 1];

const BENEFITS = [
  'The Professional Leadership Blueprint',
  'Weekly actionable strategies',
  'Real career transformation stories',
  'Access to exclusive workshops',
];

export function NewsletterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || 'Failed to subscribe';

        if (response.status === 409) {
          toast.warning('Already subscribed', {
            description: errorMessage,
          });
        } else {
          toast.error('Subscription failed', {
            description: errorMessage,
          });
        }
        return;
      }

      toast.success('Welcome to the newsletter!', {
        description: 'Check your inbox for your free webinar access link.',
      });

      setSubmitted(true);
      setName('');
      setEmail('');
      // Reset submission status after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      toast.error('Something went wrong', {
        description: 'Please try again later.',
      });
      console.error('Newsletter subscription error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="newsletter" className="section bg-ink text-cream">
      <div className="container-page">
        <SectionHeading
          dark
          eyebrow="Newsletter"
          accent="var(--blue-lt)"
          title="Get exclusive content, every week."
          dek="Join professionals who are transforming their careers with proven strategies from tech and leadership."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.52, ease: EASE }}
          className="dark-card overflow-hidden"
        >
          <div className="grid lg:grid-cols-5">
            {/* Left — the offer */}
            <div className="border-b-2 border-cream/10 p-8 lg:col-span-2 lg:border-b-0 lg:border-r-2 lg:p-12">
              <span className="chip chip--bright">
                <span className="pulse-dot" style={{ background: 'var(--ink)' }} />
                Free webinar
              </span>
              <h3 className="mt-6 text-[1.375rem] font-semibold leading-[1.35] tracking-[-0.02em]">
                Unlock Your Leadership Potential
              </h3>
              <p className="mt-4 leading-[1.6] text-muted-inv">
                Subscribe to get a free webinar pass and discover the proven system I use
                to help professionals transform their careers and step into influential
                leadership roles.
              </p>
              <ul className="mt-8 space-y-4">
                {BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="text-blue-lt" aria-hidden="true">◆</span>
                    <span className="text-cream/90">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — the form */}
            <div className="flex min-h-[400px] items-center p-8 lg:col-span-3 lg:p-12">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.52, ease: EASE }}
                  className="w-full py-12 text-center"
                >
                  <span
                    className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-cream/20"
                    style={{ boxShadow: '4px 4px 0 0 var(--blue-lt)' }}
                  >
                    <CheckCircleIcon className="h-8 w-8 text-blue-lt" />
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em]">You&apos;re in!</h3>
                  <p className="mt-3 text-muted-inv">
                    Check your inbox for &quot;Unlock Your Leadership Potential&quot;, your
                    career transformation starts now.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="w-full space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-inv"
                      >
                        Your name
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="John Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={loading}
                        className="input-dark disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-inv"
                      >
                        Email address
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        className="input-dark disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-inverse w-full disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <span className="pulse-dot" style={{ background: 'var(--ink)' }} />
                        Subscribing…
                      </>
                    ) : (
                      <>
                        Subscribe to newsletter <span aria-hidden="true">→</span>
                      </>
                    )}
                  </button>

                  <p className="text-center font-mono text-xs tracking-[0.05em] text-muted-inv">
                    Unsubscribe anytime with one click.
                  </p>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

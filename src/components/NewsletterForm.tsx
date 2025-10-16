'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from 'lucide-react';
import { toast } from 'sonner';
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
          toast.warning('Already Subscribed', {
            description: errorMessage,
          });
        } else {
          toast.error('Subscription Failed', {
            description: errorMessage,
          });
        }
        return;
      }
      
      toast.success('Welcome to the Newsletter! 🎉', {
        description: 'Check your inbox for your FREE webinar access link!',
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
  return <section id="newsletter" className="py-24 relative bg-gradient-to-br from-slate-50 via-blue-50 to-blue-100 dark:from-slate-900 dark:via-blue-900 dark:to-blue-800 transition-all duration-500 overflow-hidden">
      {/* Modern pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:20px_20px]"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-slate-900 via-blue-800 to-blue-900 dark:from-white dark:via-blue-200 dark:to-blue-100 bg-clip-text text-transparent mb-4">
            Get Exclusive Content
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Join professionals who are transforming their careers with proven strategies from tech and leadership.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="grid lg:grid-cols-5">
            {/* Left section - Content */}
            <div className="lg:col-span-2 p-8 lg:p-12 bg-gradient-to-br from-blue-600/90 to-blue-700/90 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center opacity-20"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-6">
                  <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
                  FREE WEBINAR
                </div>
                <h3 className="text-3xl font-black mb-4">Unlock Your Leadership Potential</h3>
                <p className="text-white/90 leading-relaxed mb-4">
                  Subscribe to get a free webinar pass and discover the proven system I use to help professionals transform their careers and step into influential leadership roles.
                </p>
                <div className="space-y-3">
                  {[
                    'The Professional Leadership Blueprint',
                    'Weekly actionable strategies', 
                    'Real career transformation stories',
                    'Access to exclusive workshops'
                  ].map((benefit, index) => (
                    <motion.div 
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 bg-blue-300 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-white/90">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right section - Form */}
            <div className="lg:col-span-3 p-8 lg:p-12 flex items-center justify-center min-h-[400px]">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-6">
                    <CheckCircleIcon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black bg-gradient-to-r from-slate-900 to-blue-800 dark:from-white dark:to-blue-200 bg-clip-text text-transparent mb-4">
                    You&apos;re In! 🚀
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300">
                    Check your inbox for &quot;Unlock Your Leadership Potential&quot; - your career transformation starts now!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 ">
                  <div className="grid sm:grid-cols-2 gap-6 ">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Your Name
                      </label>
                      <input 
                        id="name" 
                        type="text" 
                        placeholder="John Smith" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        required 
                        disabled={loading}
                        className="w-full px-4 py-4 backdrop-blur-xl bg-white/50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-300 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 disabled:opacity-60"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Email Address
                      </label>
                      <input 
                        id="email" 
                        type="email" 
                        placeholder="john@example.com" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        required 
                        disabled={loading}
                        className="w-full px-4 py-4 backdrop-blur-xl bg-white/50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-300 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 disabled:opacity-60"
                      />
                    </div>
                  </div>
                  
                  
                  <motion.button 
                    type="submit" 
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe to newsletter</span>
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          →
                        </motion.span>
                      </>
                    )}
                  </motion.button>
                  
                  <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  Unsubscribe anytime with one click.
                  </p>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
}
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Instagram, Linkedin, Github, Facebook } from 'lucide-react';
export function About() {
  // Replace with your actual bio
  const bio = 'With 4+ years of building software solutions and a deep passion for human potential, I transitioned into teaching leadership and personal development. I help professionals unlock their full potential by combining technical problem-solving mindsets with actionable leadership strategies that drive real transformation.';
  
  // Social media URLs
  const instagramUrl = 'https://www.instagram.com/dumtochukwu_/';
  const linkedinUrl = 'https://www.linkedin.com/in/david-ejere-5056161a1';
  const githubUrl = 'https://github.com/davedumto';
  const facebookUrl = 'https://www.facebook.com/profile.php?id=61550060649755';
  
  const handleInstagramClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const username = 'dumtochukwu_';
    
    const appUrl = `instagram://user?username=${username}`;
    const webUrl = instagramUrl;
    
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      const timeout = setTimeout(() => {
        window.open(webUrl, '_blank', 'noopener,noreferrer');
      }, 500);
      
      window.location.href = appUrl;
      
      window.addEventListener('blur', () => {
        clearTimeout(timeout);
      }, { once: true });
    } else {
      window.open(webUrl, '_blank', 'noopener,noreferrer');
    }
  };
  return <section id="about" className="py-24 relative bg-white dark:bg-slate-900 transition-all duration-500 overflow-hidden">
      {/* Modern grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-slate-900 via-blue-800 to-blue-900 dark:from-white dark:via-blue-200 dark:to-blue-100 bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-700 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Modern image section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative group">
              {/* Modern card with glassmorphism */}
              <div className="backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
                  <Image 
                    src="/dumto.jpg" 
                    alt="David Ejere - Public Speaker & Leadership Expert" 
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
              
              {/* Floating stats cards */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute -bottom-8 -right-8 backdrop-blur-xl bg-white/80 dark:bg-black/80 border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white">30+</div>
                    <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Speaking Events</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {bio}
            </p>

            {/* Modern skill badges */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Expertise Areas</h3>
              <div className="flex flex-wrap gap-3">
                {['Software Development', 'Leadership', 'Personal Development', 'Problem Solving'].map((skill, index) => (
                  <motion.span 
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 backdrop-blur-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Achievement metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                { number: '4+', label: 'Years in Tech' },
                { number: '1K+', label: 'Lives Impacted' },
                { number: '5+', label: 'Countries Reached' }
              ].map((metric, index) => (
                <motion.div 
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    {metric.number}
                  </div>
                  <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="pt-8 border-t border-slate-200 dark:border-slate-700"
            >
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <span className="text-slate-600 dark:text-slate-400 font-medium text-sm">
                  Connect with me:
                </span>
                <div className="flex gap-4">
                  <motion.a 
                    href={instagramUrl} 
                    onClick={handleInstagramClick}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-xl hover:from-pink-500/20 hover:to-purple-500/20 transition-all duration-300 group"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5 text-pink-600 dark:text-pink-400 group-hover:text-pink-500" />
                  </motion.a>
                  <motion.a 
                    href={linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl hover:from-blue-500/20 hover:to-blue-600/20 transition-all duration-300 group"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400 group-hover:text-blue-500" />
                  </motion.a>
                  <motion.a 
                    href={githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-gradient-to-r from-slate-500/10 to-slate-600/10 border border-slate-500/20 rounded-xl hover:from-slate-500/20 hover:to-slate-600/20 transition-all duration-300 group"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-500" />
                  </motion.a>
                  <motion.a 
                    href={facebookUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-gradient-to-r from-blue-600/10 to-blue-700/10 border border-blue-600/20 rounded-xl hover:from-blue-600/20 hover:to-blue-700/20 transition-all duration-300 group"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5 text-blue-700 dark:text-blue-500 group-hover:text-blue-600" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>;
}
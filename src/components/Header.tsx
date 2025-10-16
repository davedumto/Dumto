'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const name = 'David Ejere';
  const title = 'Public Speaker & Leadership Expert';

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-blue-100 dark:from-slate-900 dark:via-blue-900 dark:to-blue-800 transition-all duration-500">
      {/* Theme Toggle Button */}
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 p-3 backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <Moon className="h-5 w-5 text-slate-700 dark:text-slate-300" />
        ) : (
          <Sun className="h-5 w-5 text-amber-500" />
        )}
      </motion.button>
      
      {/* Modern geometric background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-blue-600/20 dark:from-blue-500/10 dark:to-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-blue-300/20 to-blue-500/20 dark:from-blue-600/10 dark:to-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-blue-400/20 dark:from-blue-700/10 dark:to-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Modern badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            Inspiring Audiences Worldwide
          </motion.div>

          {/* Modern typography */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight"
          >
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-blue-900 dark:from-white dark:via-blue-200 dark:to-blue-100 bg-clip-text text-transparent">
              {name.split(' ')[0]}
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-400 dark:via-blue-300 dark:to-blue-200 bg-clip-text text-transparent">
              {name.split(' ')[1]}
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 text-xl sm:text-2xl text-slate-600 dark:text-slate-300 font-light max-w-3xl mx-auto leading-relaxed"
          >
            {title}
          </motion.p>

          {/* Modern CTA buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a 
              href="#newsletter"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                Sign Up For Newsletter
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </span>
            </motion.a>
            
            <motion.a 
              href="#about"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-2 border-blue-500 dark:border-blue-400 text-slate-700 dark:text-slate-300 font-semibold rounded-2xl hover:bg-white/20 dark:hover:bg-black/20 hover:border-blue-600 dark:hover:border-blue-300 transition-all duration-300"
            >
              Learn More
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-slate-600 dark:text-slate-400"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="p-2 backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-full"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 7l5 5 5-5M7 13l5 5 5-5" 
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </header>
  );
}
'use client';

import React from 'react';
import { Instagram, Linkedin, Github, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
export function Footer() {
  // Replace with your actual email and social media URLs
  const email = 'davidejerespeaks@gmail.com';
  const instagramUrl = 'https://www.instagram.com/dumtochukwu_/';
  const linkedinUrl = 'https://www.linkedin.com/in/david-ejere-5056161a1';
  const githubUrl = 'https://github.com/davedumto';
  const facebookUrl = 'https://www.facebook.com/profile.php?id=61550060649755';

  const handleInstagramClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const username = 'dumtochukwu_'; // Extract username from URL
    
    // Try to open Instagram app first
    const appUrl = `instagram://user?username=${username}`;
    const webUrl = instagramUrl;
    
    // Create a temporary link to test if the app opens
    const tempLink = document.createElement('a');
    tempLink.href = appUrl;
    
    // For mobile devices, try app URL first
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // Set a timeout to fallback to web if app doesn't open
      const timeout = setTimeout(() => {
        window.open(webUrl, '_blank', 'noopener,noreferrer');
      }, 500);
      
      // Try to open the app
      window.location.href = appUrl;
      
      // If we're still here after attempting to open the app, clear the timeout
      window.addEventListener('blur', () => {
        clearTimeout(timeout);
      }, { once: true });
    } else {
      // For desktop, just open web version
      window.open(webUrl, '_blank', 'noopener,noreferrer');
    }
  };
  return <footer id="contact" className="relative py-24 overflow-hidden bg-slate-900 dark:bg-black">
      {/* Modern mesh gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 dark:from-black dark:via-blue-900 dark:to-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(30,64,175,0.1),transparent_50%)]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-white via-blue-200 to-blue-100 bg-clip-text text-transparent mb-6">
            Let&apos;s Work Together
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Ready to transform your next event? Let&apos;s create an unforgettable experience for your audience.
          </p>
          
          {/* Modern CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.a 
              href={`mailto:${email}`}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
            >
              <span>Book me for your events</span>
              {/* <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span> */}
            </motion.a>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-4"
            >
              <span className="text-slate-400 font-medium">and Follow me:</span>
              <div className="flex gap-3">
                <motion.a 
                  href={instagramUrl} 
                  onClick={handleInstagramClick}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6 text-white" />
                </motion.a>
                <motion.a 
                  href={linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6 text-white" />
                </motion.a>
                <motion.a 
                  href={githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github className="h-6 w-6 text-white" />
                </motion.a>
                <motion.a 
                  href={facebookUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6 text-white" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>


        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-slate-400 text-sm"
            >
              &copy; {new Date().getFullYear()} David Ejere. All rights reserved.
            </motion.div>

          </div>
        </div>
      </div>
    </footer>;
}
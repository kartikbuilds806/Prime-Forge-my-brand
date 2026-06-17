"use client";

import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { motion, useScroll } from 'framer-motion';

export function FloatingCTAs() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.4, type: 'spring' }}
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-4"
      >
      {/* Scroll to top */}
      {showTopBtn && (
        <button 
          onClick={scrollToTop}
          className="w-12 h-12 bg-surface border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center text-text-heading hover:bg-white/10 transition-all shadow-lg animate-fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/918533925291" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-text-heading hover:bg-green-600 hover:scale-110 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Phone Button */}
      <a 
        href="tel:+918533925291" 
        className="w-14 h-14 bg-surface border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center text-text-heading hover:bg-white/10 hover:scale-110 transition-all shadow-lg"
        aria-label="Call Us"
      >
        <Phone className="w-6 h-6" />
      </a>
    </motion.div>
    </>
  );
}

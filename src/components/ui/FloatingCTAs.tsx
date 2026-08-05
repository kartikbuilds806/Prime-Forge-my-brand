"use client";

import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { motion, useScroll } from 'framer-motion';

export function FloatingCTAs({ children }: { children?: React.ReactNode }) {
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
        transition={{ delay: 1, duration: 0.4, type: 'spring' }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col gap-2.5 md:gap-4 items-end"
      >
      {/* Scroll to top */}
      {showTopBtn && (
        <button 
          onClick={scrollToTop}
          className="w-10 h-10 md:w-12 md:h-12 bg-surface/90 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center text-text-heading hover:bg-white/10 active:scale-90 transition-all shadow-lg animate-fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      )}

      {/* Projected Chatbot Button */}
      {children}

      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/918533925291" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 active:scale-90 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
      </a>

      {/* Phone Button */}
      <a 
        href="tel:+918533925291" 
        className="w-12 h-12 md:w-14 md:h-14 bg-surface/90 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center text-text-heading hover:bg-white/10 active:scale-90 transition-all shadow-lg"
        aria-label="Call Us"
      >
        <Phone className="w-5 h-5 md:w-6 md:h-6" />
      </a>
    </motion.div>
    </>
  );
}

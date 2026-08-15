'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Calendar, Rocket } from 'lucide-react';

export function MobileBottomDock() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden pointer-events-auto w-auto max-w-[calc(100vw-7rem)]"
        >
          <div className="bg-zinc-950/95 dark:bg-zinc-950/95 bg-white/95 backdrop-blur-2xl border border-black/10 dark:border-white/15 rounded-full p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.6)] flex items-center gap-2">
            {/* Book Call */}
            <Link
              href="/book-a-call"
              className="py-2.5 px-4 rounded-full bg-white/10 dark:bg-white/10 bg-black/5 border border-black/10 dark:border-white/15 text-text-heading font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              <span>Book Call</span>
            </Link>

            {/* Start Project CTA */}
            <Link
              href="/start-a-project"
              className="py-2.5 px-4 rounded-full bg-accent text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform whitespace-nowrap shrink-0"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Start Project</span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

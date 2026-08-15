'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      className={`transform-gpu will-change-transform ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

export function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      className={`transform-gpu will-change-transform ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.5, delay, ease: 'easeOut' }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

export function FadeLeft({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      className={`transform-gpu will-change-transform ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

export function FadeRight({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      className={`transform-gpu will-change-transform ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: { opacity: 0, x: 50 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

export function ScaleIn({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      className={`transform-gpu will-change-transform ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      className={`transform-gpu ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } }
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = "", whileHover, transition }: { children: React.ReactNode, className?: string, whileHover?: any, transition?: any }) {
  return (
    <motion.div
      className={`transform-gpu will-change-transform ${className}`}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
      }}
      whileHover={whileHover}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}

export function MobileStaggerContainer({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shouldAnimate = isMobile && !prefersReducedMotion;

  return (
    <motion.div
      className={`transform-gpu ${className}`}
      initial={shouldAnimate ? "hidden" : "visible"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: shouldAnimate ? 0.09 : 0 } }
      }}
    >
      {children}
    </motion.div>
  );
}

export function MobileStaggerItem({ children, className = "", whileHover, transition }: { children: React.ReactNode, className?: string, whileHover?: any, transition?: any }) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shouldAnimate = isMobile && !prefersReducedMotion;

  return (
    <motion.div
      className={`transform-gpu will-change-transform ${className}`}
      variants={{
        hidden: shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0, transition: { duration: shouldAnimate ? 0.45 : 0, ease: [0.22, 1, 0.36, 1] } }
      }}
      whileHover={whileHover}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

export function MobileStackContainer({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`relative overflow-visible ${className}`}>
      {children}
    </div>
  );
}

export function MobileStackCard({
  children,
  index,
  totalCards,
  className = ""
}: {
  children: React.ReactNode;
  index: number;
  totalCards: number;
  className?: string;
}) {
  const topPx = 76 + index * 20;
  const zIndex = (index + 1) * 10;

  return (
    <div
      style={{
        '--stack-top': `${topPx}px`,
        '--stack-z': zIndex,
      } as React.CSSProperties}
      className={`mobile-stack-card ${className}`}
    >
      <div className="shadow-[0_-10px_35px_rgba(0,0,0,0.8)] rounded-3xl">
        {children}
      </div>
    </div>
  );
}


'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [animationCompleted, setAnimationCompleted] = useState(false)

  return (
    <AnimatePresence mode="wait" onExitComplete={() => setAnimationCompleted(false)}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        onAnimationComplete={() => setAnimationCompleted(true)}
        style={animationCompleted ? { transform: 'none' } : undefined}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

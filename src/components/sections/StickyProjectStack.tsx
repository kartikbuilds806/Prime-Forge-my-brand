'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { GlowCard } from '@/components/ui/GlowCard';
import { Button } from '@/components/ui/Button';
import { Sparkles } from 'lucide-react';

export interface FullStackProject {
  title: string;
  badge: string;
  status: string;
  desc: string;
  tech: string[];
  url: string;
  glow: string;
  caseStudy: {
    problem: string;
    solution: string;
    highlights: string[];
  };
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    ai: string;
    pipelineSteps: { title: string; desc: string }[];
  };
}

interface StickyProjectStackProps {
  projects: FullStackProject[];
  onOpenModal: (project: FullStackProject) => void;
  onPreviewApp: (name: string, url: string) => void;
}

function DeckCardItem({
  project,
  index,
  total,
  scrollYProgress,
  onOpenModal,
  onPreviewApp,
  shouldReduceMotion,
}: {
  project: FullStackProject;
  index: number;
  total: number;
  scrollYProgress: any;
  onOpenModal: (project: FullStackProject) => void;
  onPreviewApp: (name: string, url: string) => void;
  shouldReduceMotion: boolean | null;
}) {
  // Define exact scroll keyframes for card entrance & stack receding
  // Total scroll range is 0 to 1
  const segment = 1 / Math.max(total - 1, 1);
  
  // Card 0 is already at top; Card i (i > 0) enters during [(i - 0.8) * segment, i * segment]
  const enterStart = index === 0 ? 0 : Math.max(0, (index - 0.8) * segment);
  const enterEnd = index === 0 ? 0 : index * segment;

  // Receding keyframes: when later cards (i+1, i+2) enter
  const exitStep1 = Math.min(1, (index + 1) * segment);
  const exitStep2 = Math.min(1, (index + 2) * segment);

  // 1. translateY transform:
  // Before entrance: 100vh (below viewport)
  // At entrance: 0px (active top card)
  // After exitStep1 (when next card covers): -20px (peeking above)
  // After exitStep2 (when second next card covers): -40px (peeking higher above)
  const translateY = useTransform(
    scrollYProgress,
    index === 0
      ? [0, exitStep1, exitStep2]
      : [enterStart, enterEnd, exitStep1, exitStep2],
    index === 0
      ? ['0px', '-20px', '-40px']
      : ['100vh', '0px', '-20px', '-40px']
  );

  // 2. scale transform:
  // Active: 1.0
  // Next card covers: 0.95
  // Second next card covers: 0.90
  const scale = useTransform(
    scrollYProgress,
    index === 0
      ? [0, exitStep1, exitStep2]
      : [enterStart, enterEnd, exitStep1, exitStep2],
    index === 0
      ? [1, 0.95, 0.90]
      : [1, 1, 0.95, 0.90]
  );

  // 3. opacity transform:
  // Before entrance: 0 (invisible below)
  // Active: 1.0
  // Receding behind: 0.75 (peeking visibly)
  // Far receding behind: 0.55
  const opacity = useTransform(
    scrollYProgress,
    index === 0
      ? [0, exitStep1, exitStep2]
      : [enterStart, enterEnd, exitStep1, exitStep2],
    index === 0
      ? [1, 0.75, 0.55]
      : [0, 1, 0.75, 0.55]
  );

  if (shouldReduceMotion) {
    return (
      <div className="mb-8">
        <GlowCard
          glowColor={project.glow}
          className="p-6 md:p-10 flex flex-col justify-between bg-zinc-950/95 backdrop-blur-2xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9)] rounded-3xl"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-accent tracking-wider uppercase">
                {project.badge}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {project.status}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {project.title}
            </h3>

            <p className="text-zinc-300 text-sm leading-relaxed mb-6">
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((tech, tIdx) => (
                <span key={tIdx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              onClick={() => onPreviewApp(project.title, project.url)}
              variant="primary"
              className="w-full justify-center text-center font-bold py-3 text-xs sm:text-sm"
            >
              Preview App On Screen
            </Button>

            <button
              onClick={() => onOpenModal(project)}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-xs sm:text-sm transition-all text-center flex items-center justify-center gap-1.5"
            >
              <span>Case Study & Arch</span>
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            </button>
          </div>
        </GlowCard>
      </div>
    );
  }

  return (
    <motion.div
      style={{
        translateY,
        scale,
        opacity,
        zIndex: index + 10,
      }}
      className="absolute top-0 left-0 right-0 w-full transform-gpu will-change-transform translate-z-0"
    >
      <GlowCard
        glowColor={project.glow}
        className="p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-zinc-950/95 backdrop-blur-2xl border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.95)] rounded-3xl min-h-[420px]"
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-accent tracking-wider uppercase">
              {project.badge}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {project.status}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            {project.title}
          </h3>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((tech, tIdx) => (
              <span
                key={tIdx}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            onClick={() => onPreviewApp(project.title, project.url)}
            variant="primary"
            className="w-full justify-center text-center font-bold py-3 text-xs sm:text-sm"
          >
            Preview App On Screen
          </Button>

          <button
            onClick={() => onOpenModal(project)}
            className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-xs sm:text-sm transition-all text-center flex items-center justify-center gap-1.5"
          >
            <span>Case Study & Arch</span>
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          </button>
        </div>
      </GlowCard>
    </motion.div>
  );
}

export function StickyProjectStack({
  projects,
  onOpenModal,
  onPreviewApp,
}: StickyProjectStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  if (shouldReduceMotion) {
    return (
      <div className="space-y-8 w-full">
        {projects.map((project, idx) => (
          <DeckCardItem
            key={idx}
            project={project}
            index={idx}
            total={projects.length}
            scrollYProgress={scrollYProgress}
            onOpenModal={onOpenModal}
            onPreviewApp={onPreviewApp}
            shouldReduceMotion={true}
          />
        ))}
      </div>
    );
  }

  return (
    /* OUTER SCROLL TRACK: Provides scroll runway (100vh per project card) */
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${projects.length * 100}vh` }}
    >
      {/* SINGLE STICKY VIEWPORT: The ONLY sticky element on screen */}
      <div className="sticky top-[95px] w-full max-w-4xl mx-auto h-[480px] sm:h-[520px] overflow-visible">
        {/* ABSOLUTELY POSITIONED CARDS: Occupy the exact same box */}
        {projects.map((project, idx) => (
          <DeckCardItem
            key={idx}
            project={project}
            index={idx}
            total={projects.length}
            scrollYProgress={scrollYProgress}
            onOpenModal={onOpenModal}
            onPreviewApp={onPreviewApp}
            shouldReduceMotion={false}
          />
        ))}
      </div>
    </div>
  );
}

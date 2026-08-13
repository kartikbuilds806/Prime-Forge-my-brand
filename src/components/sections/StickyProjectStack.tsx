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

function StackedCardItem({
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
  // Calculate scroll range when the NEXT card slides over this card
  const step = 1 / total;
  const start = index * step;
  const end = (index + 1) * step;

  // GPU-accelerated transforms: Scale down slightly & dim opacity as next card covers
  const rawScale = useTransform(scrollYProgress, [start, end], [1, 0.94]);
  const rawOpacity = useTransform(scrollYProgress, [start, end], [1, 0.45]);

  const scale = shouldReduceMotion || index === total - 1 ? 1 : rawScale;
  const opacity = shouldReduceMotion || index === total - 1 ? 1 : rawOpacity;

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
    <div className="h-[110vh] sm:h-[120vh] relative flex flex-col items-center justify-start">
      <motion.div
        style={{
          scale,
          opacity,
          top: `calc(90px + ${index * 14}px)`,
          zIndex: index + 10,
        }}
        className="sticky w-full max-w-4xl transform-gpu will-change-transform translate-z-0"
      >
        <GlowCard
          glowColor={project.glow}
          className="p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-zinc-950/95 backdrop-blur-2xl border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.95)] rounded-3xl min-h-[420px] transition-shadow duration-300"
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
    </div>
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

  return (
    <div ref={containerRef} className="relative w-full">
      {projects.map((project, idx) => (
        <StackedCardItem
          key={idx}
          project={project}
          index={idx}
          total={projects.length}
          scrollYProgress={scrollYProgress}
          onOpenModal={onOpenModal}
          onPreviewApp={onPreviewApp}
          shouldReduceMotion={shouldReduceMotion}
        />
      ))}
    </div>
  );
}

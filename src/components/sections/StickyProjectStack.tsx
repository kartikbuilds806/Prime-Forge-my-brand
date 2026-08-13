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
  const enterStart = index === 0 ? 0 : Math.max(0.02, (index - 1) * (1 / (total - 0.5)) + 0.05);
  const enterEnd = index === 0 ? 0 : index * (1 / (total - 0.5));
  
  const recede1 = Math.min(0.98, (index + 1) * (1 / (total - 0.5)));
  const recede2 = Math.min(1.0, (index + 2) * (1 / (total - 0.5)));

  // 1. translateY mapping: cards enter from below and peeks upward when covered
  const translateY = useTransform(
    scrollYProgress,
    index === 0
      ? [0, recede1, recede2]
      : [0, enterStart, enterEnd, recede1, recede2],
    index === 0
      ? ['0px', '-24px', '-48px']
      : ['100vh', '100vh', '0px', '-24px', '-48px']
  );

  // 2. scale mapping: active card is 1.0, receding cards scale to 0.95 and 0.90
  const scale = useTransform(
    scrollYProgress,
    index === 0
      ? [0, recede1, recede2]
      : [0, enterStart, enterEnd, recede1, recede2],
    index === 0
      ? [1, 0.95, 0.90]
      : [1, 1, 1, 0.95, 0.90]
  );

  // 3. opacity mapping: peeks visibly at 0.75 and 0.55
  const opacity = useTransform(
    scrollYProgress,
    index === 0
      ? [0, recede1, recede2]
      : [0, enterStart, enterEnd, recede1, recede2],
    index === 0
      ? [1, 0.75, 0.55]
      : [0, 0, 1, 0.75, 0.55]
  );

  if (shouldReduceMotion) {
    return (
      <div className="mb-8">
        <GlowCard
          glowColor={project.glow}
          className="p-6 md:p-8 flex flex-col justify-between bg-zinc-950/95 backdrop-blur-2xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9)] rounded-3xl"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-accent tracking-wider uppercase">
                {project.badge}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {project.status}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {project.title}
            </h3>

            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
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
              className="w-full justify-center text-center font-bold py-2.5 text-xs sm:text-sm"
            >
              Preview App On Screen
            </Button>

            <button
              onClick={() => onOpenModal(project)}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-xs sm:text-sm transition-all text-center flex items-center justify-center gap-1.5"
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
        className="p-6 sm:p-8 md:p-8 flex flex-col justify-between bg-zinc-950/95 backdrop-blur-2xl border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.95)] rounded-3xl h-[380px] sm:h-[400px]"
      >
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-accent tracking-wider uppercase">
              {project.badge}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {project.status}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {project.title}
          </h3>

          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-zinc-300 font-medium"
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
            className="w-full justify-center text-center font-bold py-2.5 text-xs sm:text-sm"
          >
            Preview App On Screen
          </Button>

          <button
            onClick={() => onOpenModal(project)}
            className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-xs sm:text-sm transition-all text-center flex items-center justify-center gap-1.5"
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
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="sticky top-[115px] w-full max-w-4xl mx-auto h-[400px] sm:h-[440px] overflow-visible">
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

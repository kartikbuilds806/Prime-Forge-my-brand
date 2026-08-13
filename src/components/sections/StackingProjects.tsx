'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

interface StackingProjectsProps {
  projects: FullStackProject[];
  onOpenModal: (project: FullStackProject) => void;
  onPreviewApp: (name: string, url: string) => void;
}

function Card({
  project,
  i,
  progress,
  range,
  targetScale,
  onOpenModal,
  onPreviewApp,
}: {
  project: FullStackProject;
  i: number;
  progress: any;
  range: number[];
  targetScale: number;
  onOpenModal: (project: FullStackProject) => void;
  onPreviewApp: (name: string, url: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-screen flex items-center justify-center sticky top-0 px-2 sm:px-4"
    >
      <motion.div
        style={{
          scale,
          top: `calc(10% + ${i * 25}px)`,
        }}
        className="relative w-full max-w-4xl rounded-3xl transition-shadow duration-300"
      >
        <GlowCard
          glowColor={project.glow}
          className="p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-zinc-950/95 backdrop-blur-2xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.95)] rounded-3xl min-h-[440px]"
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

          <div className="mt-auto pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
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

export function StackingProjects({ projects, onOpenModal, onPreviewApp }: StackingProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={containerRef} className="relative mt-8">
      {projects.map((project, i) => {
        const targetScale = 1 - (projects.length - i) * 0.04;
        return (
          <Card
            key={i}
            project={project}
            i={i}
            progress={scrollYProgress}
            range={[i * (1 / projects.length), 1]}
            targetScale={targetScale}
            onOpenModal={onOpenModal}
            onPreviewApp={onPreviewApp}
          />
        );
      })}
    </div>
  );
}

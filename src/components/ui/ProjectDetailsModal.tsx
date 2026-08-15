'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Monitor, Layers, FileText, CheckCircle2, Cpu, Database, Zap, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface ProjectDetailsData {
  title: string;
  category: string;
  status: string;
  description: string;
  url: string;
  tech: string[];
  metrics: {
    speed: string;
    conversion: string;
    lighthouse: string;
  };
  caseStudy?: {
    problem: string;
    solution: string;
    highlights: string[];
  };
  architecture?: {
    frontend: string;
    backend: string;
    database: string;
    ai: string;
    pipelineSteps: { title: string; desc: string }[];
  };
}

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'preview' | 'casestudy' | 'architecture';
  project: ProjectDetailsData | null;
}

export function ProjectDetailsModal({ isOpen, onClose, initialTab = 'casestudy', project }: ProjectDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'casestudy' | 'architecture'>(initialTab);
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, project]);

  // Reset iframe loading when project or tab changes
  useEffect(() => {
    setIsIframeLoading(true);
  }, [activeTab, project]);

  // Lock background body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  // Fallback defaults for caseStudy and architecture if missing
  const caseStudy = project.caseStudy || {
    problem: "Traditional sites suffer from slow template overhead, high bounce rates, and zero real-time client conversion triggers.",
    solution: `Custom-engineered ${project.title} platform utilizing Next.js 16 and sub-second asset optimization to deliver high-converting user experience.`,
    highlights: [
      "Sub-second page load speeds verified on Google PageSpeed",
      "Full mobile-first responsiveness and dark mode compatibility",
      "Streamlined call-to-action pipeline converting cold traffic into leads"
    ]
  };

  const architecture = project.architecture || {
    frontend: "Next.js 16 App Router · React 19 · Tailwind CSS v4",
    backend: "Next.js Server Actions & Edge Middleware",
    database: "Supabase PostgreSQL Database & Storage",
    ai: "Google Gemini API & Vector RAG Pipeline",
    pipelineSteps: [
      { title: "Client UI Layer", desc: "React 19 Server Components with Lenis smooth momentum scrolling." },
      { title: "Server Actions", desc: "Type-safe server actions replacing heavy REST overhead." },
      { title: "Database & Storage", desc: "Supabase real-time database and vector store for sub-100ms queries." },
      { title: "AI & Optimization Engine", desc: "Gemini API integrations + automatic AEO/GEO indexing." }
    ]
  };

  return (
    <AnimatePresence>
      <div 
        onClick={onClose}
        data-lenis-prevent
        className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-2xl flex items-end sm:items-center justify-center p-0 sm:p-6 md:p-8 animate-fade-in"
      >
        <motion.div 
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl h-[92vh] sm:h-[88vh] max-h-[850px] bg-zinc-950 border border-white/20 rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.95)]"
        >
          {/* Mobile Drag Handle Indicator */}
          <div className="w-12 h-1.5 bg-zinc-700/80 rounded-full mx-auto my-1.5 sm:hidden shrink-0" />

          {/* Modal Header */}
          <div className="bg-zinc-900 p-3 sm:px-5 sm:py-4 border-b border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-base sm:text-lg shrink-0">
                  {project.title.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="text-sm sm:text-lg font-bold text-white leading-tight truncate">{project.title}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-blue-500/10 border border-blue-500/30 text-blue-400 uppercase tracking-wider shrink-0">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-zinc-400 truncate max-w-[180px] sm:max-w-sm">{project.url}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 sm:hidden">
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/10 text-zinc-300 hover:bg-red-500/20 hover:text-red-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Tab Switcher & Desktop Controls */}
            <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
              <div className="flex items-center overflow-x-auto no-scrollbar bg-black/60 p-1 rounded-xl border border-white/10 max-w-full">
                <button
                  onClick={() => setActiveTab('casestudy')}
                  className={`px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 shrink-0 transition-all ${
                    activeTab === 'casestudy'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Case Study</span>
                </button>

                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 shrink-0 transition-all ${
                    activeTab === 'architecture'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Architecture</span>
                </button>

                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 shrink-0 transition-all ${
                    activeTab === 'preview'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Live Preview</span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white hover:bg-white/20 transition-colors font-medium"
                >
                  <span>Visit Live App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/10 text-zinc-300 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                  aria-label="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Modal Body with Isolated Native Scrolling */}
          <div 
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="flex-1 overflow-y-auto min-h-0 p-5 sm:p-8 bg-zinc-950 text-white"
          >
            {/* TAB 1: CASE STUDY */}
            {activeTab === 'casestudy' && (
              <div className="space-y-8 animate-fade-in max-w-4xl mx-auto pb-4">
                {/* Verified Performance Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-xl">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-400 font-medium">Load Speed</div>
                      <div className="text-2xl font-black text-emerald-400">{project.metrics.speed}</div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-xl">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-400 font-medium">Conversion Increase</div>
                      <div className="text-2xl font-black text-amber-400">{project.metrics.conversion}</div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-xl">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-400 font-medium">PageSpeed Score</div>
                      <div className="text-2xl font-black text-blue-400">{project.metrics.lighthouse}</div>
                    </div>
                  </div>
                </div>

                {/* Executive Summary */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/30 via-zinc-900 to-zinc-950 border border-blue-500/20 space-y-3">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Project Overview
                  </h4>
                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Problem vs Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/20 space-y-3">
                    <h4 className="text-base font-bold text-red-400 uppercase tracking-wider text-xs">The Problem & Friction</h4>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {caseStudy.problem}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-3">
                    <h4 className="text-base font-bold text-emerald-400 uppercase tracking-wider text-xs">The PrimeForge Solution</h4>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {caseStudy.solution}
                    </p>
                  </div>
                </div>

                {/* Strategic Highlights */}
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white uppercase tracking-wider text-xs">Key Deliverables & Growth Metrics</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {caseStudy.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-zinc-200">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SYSTEM ARCHITECTURE */}
            {activeTab === 'architecture' && (
              <div className="space-y-8 animate-fade-in max-w-4xl mx-auto pb-4">
                <div className="p-6 rounded-2xl bg-zinc-900 border border-white/15">
                  <div className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">SYSTEM TECH STACK & INTEGRATIONS</div>
                  <h4 className="text-xl font-bold text-white mb-6">Full-Stack Data & AI Pipeline</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xs text-zinc-400 mb-1 flex items-center gap-1.5">
                        <Monitor className="w-3.5 h-3.5 text-blue-400" />
                        Frontend
                      </div>
                      <div className="text-sm font-bold text-white">{architecture.frontend}</div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xs text-zinc-400 mb-1 flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                        Backend
                      </div>
                      <div className="text-sm font-bold text-white">{architecture.backend}</div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xs text-zinc-400 mb-1 flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5 text-purple-400" />
                        Database
                      </div>
                      <div className="text-sm font-bold text-white">{architecture.database}</div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xs text-zinc-400 mb-1 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        AI & Automation
                      </div>
                      <div className="text-sm font-bold text-white">{architecture.ai}</div>
                    </div>
                  </div>
                </div>

                {/* Architecture Pipeline Steps */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Step-by-Step Architectural Flow</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {architecture.pipelineSteps.map((step, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group hover:border-blue-500/50 transition-all">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                            0{idx + 1}
                          </span>
                          <h5 className="text-base font-bold text-white">{step.title}</h5>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed pl-10">
                          {step.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: LIVE PREVIEW IFRAME WITH SKELETON LOADER */}
            {activeTab === 'preview' && (
              <div className="w-full h-full min-h-[500px] rounded-2xl overflow-hidden border border-white/15 bg-white relative animate-fade-in">
                {isIframeLoading && (
                  <div className="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center gap-4 z-10">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center animate-pulse">
                      <Zap className="w-6 h-6 animate-bounce" />
                    </div>
                    <div className="text-xs font-semibold text-zinc-400 tracking-wide animate-pulse">
                      Rendering Sub-Second Staging App...
                    </div>
                  </div>
                )}
                <iframe
                  src={project.url}
                  title={project.title}
                  onLoad={() => setIsIframeLoading(false)}
                  className="w-full h-full border-none min-h-[500px]"
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

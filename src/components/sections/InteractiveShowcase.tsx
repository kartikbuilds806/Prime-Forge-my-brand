'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProjectDetailsModal, ProjectDetailsData } from '@/components/ui/ProjectDetailsModal';

const showcaseProjects: (ProjectDetailsData & {
  id: string;
  previewGradient: string;
  accentColor: string;
})[] = [
  {
    id: 'onepath-saas',
    title: 'OnePath',
    category: 'Productivity & Goal Systems',
    status: 'In Development',
    metrics: { speed: '0.2s', conversion: '+210%', lighthouse: '99/100' },
    description: 'A full-stack productivity SaaS built around single-goal commitment — users can only pursue one active goal at a time, forcing focus over context-switching.',
    previewGradient: 'from-blue-900/40 via-zinc-900 to-black',
    accentColor: '#3b82f6',
    tech: ['Next.js 16', 'Supabase', 'Gemini API', 'Framer Motion'],
    url: 'https://one-path-saas.vercel.app/',
    caseStudy: {
      problem: "Productive procrastinators context-switch across dozens of tasks without ever completing their main revenue-generating goal.",
      solution: "Engineered OnePath — a single-goal commitment platform enforcing focus, AI coaching via Gemini, real-time partner accountability, and a monochrome motion-restrained UI.",
      highlights: [
        "Single-goal commitment constraint algorithm preventing context switching",
        "AI Coaching Agent powered by Google Gemini API",
        "Real-time partner accountability chat backed by Supabase WebSocket subscriptions",
        "Monochrome high-contrast design system optimized for low distraction"
      ]
    },
    architecture: {
      frontend: "Next.js 16 App Router · Tailwind CSS v4 · Framer Motion",
      backend: "Next.js Server Actions & Edge Route Handlers",
      database: "Supabase PostgreSQL Database & Real-time WebSockets",
      ai: "Google Gemini 2.5 Flash API for AI Goal Coaching",
      pipelineSteps: [
        { title: "Single-Goal Enforcer", desc: "Prevents creation of secondary active goals until current milestone completes." },
        { title: "Gemini AI Coach", desc: "Analyzes daily check-in logs and generates personalized focus feedback." },
        { title: "Supabase Realtime Sync", desc: "Live message broadcasts between accountability partners." },
        { title: "Vercel Edge Deployment", desc: "Sub-100ms global latency rendering across edge nodes." }
      ]
    }
  },
  {
    id: 'protein-coach-ai',
    title: 'Protein Coach AI',
    category: 'AI-Powered Fitness Web App',
    status: 'Live Production',
    metrics: { speed: '0.3s', conversion: '+195%', lighthouse: '100/100' },
    description: 'A full-stack nutrition tracking app where users input meals and get AI-generated protein breakdowns and daily coaching feedback.',
    previewGradient: 'from-emerald-900/40 via-zinc-900 to-black',
    accentColor: '#10b981',
    tech: ['Next.js', 'Supabase', 'OpenAI API', 'Tailwind v4'],
    url: 'https://protein-coach-tracker-g6cx.vercel.app/',
    caseStudy: {
      problem: "Fitness enthusiasts struggle to track real daily protein intake accurately without tedious manual spreadsheet overhead.",
      solution: "Engineered Protein Coach AI — a smart nutrition logger with automated AI meal parsing, daily macro coaching, and instant visual progress feedback.",
      highlights: [
        "Instant AI meal breakdown powered by OpenAI API",
        "Real-time macro target tracking backed by Supabase storage",
        "Sub-second mobile loading speed verified on Google PageSpeed",
        "Interactive daily coaching summary and trend analytics"
      ]
    },
    architecture: {
      frontend: "Next.js App Router · Tailwind CSS v4 · Lucide React",
      backend: "Next.js Server Actions & OpenAI Route API",
      database: "Supabase Relational Database",
      ai: "OpenAI GPT Vision & Meal Parsing Engine",
      pipelineSteps: [
        { title: "Meal Input Parser", desc: "Extracts nutritional macros from natural text or image descriptions." },
        { title: "OpenAI Coaching Engine", desc: "Generates personalized daily macro feedback and calorie advice." },
        { title: "Supabase Log Storage", desc: "Stores daily user logs with sub-100ms database query latency." },
        { title: "Vercel Edge Deployment", desc: "Delivers sub-0.3s page load speeds globally." }
      ]
    }
  },
  {
    id: 'luxury-real-estate',
    title: 'Sterling Real Estate Platform',
    category: 'Luxury Real Estate',
    status: 'Delivered Studio Build',
    metrics: { speed: '0.3s', conversion: '+184%', lighthouse: '100/100' },
    description: 'Ultra-luxury real estate platform with 60fps property walkthroughs, instant booking scheduler for property viewings, and integrated AEO search optimization.',
    previewGradient: 'from-blue-900/40 via-zinc-900 to-black',
    accentColor: '#3b82f6',
    tech: ['Next.js 16', 'Cal.com Embed', 'AEO/GEO', 'Supabase'],
    url: 'https://a2-realtor.netlify.app/',
    caseStudy: {
      problem: "High-ticket real estate buyers bounce from slow property listings that take 5+ seconds to render high-resolution photos.",
      solution: "Developed Sterling Luxury Platform with instant client side rendering, 60fps interactive property video tours, and integrated Cal.com scheduling.",
      highlights: [
        "Instant property walkthrough gallery with progressive image loading",
        "Cal.com calendar embedding for direct VIP client viewing calls",
        "AEO (Answer Engine Optimization) meta tags tailored for Siri & voice queries",
        "Lighthouse score 100/100 across Performance, Accessibility, and Best Practices"
      ]
    },
    architecture: {
      frontend: "Next.js 16 · Framer Motion 60fps · Lucide React",
      backend: "Cal.com Webhook Integration & Server Actions",
      database: "Supabase Relational Database",
      ai: "Generative Engine Optimization (GEO) & Schema Graphing",
      pipelineSteps: [
        { title: "Property Media Pipeline", desc: "Automated WebP image compression & cloud storage delivery." },
        { title: "Cal.com VIP Scheduler", desc: "Direct calendar sync for high-net-worth buyer appointments." },
        { title: "Lead Scoring API", desc: "Evaluates buyer budget criteria before confirming viewings." },
        { title: "AEO Knowledge Graph", desc: "Structures listings for voice assistant discovery." }
      ]
    }
  },
];

export function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [modalProject, setModalProject] = useState<ProjectDetailsData | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<'preview' | 'casestudy' | 'architecture'>('casestudy');

  const activeProject = showcaseProjects[activeTab];

  const handleOpenModal = (project: ProjectDetailsData, tab: 'preview' | 'casestudy' | 'architecture') => {
    setModalProject(project);
    setModalInitialTab(tab);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-surface/30 border-y border-black/5 dark:border-white/10">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>INTERACTIVE CLIENT SHOWCASE</span>
          </div>
          <h2 className="heading-serif text-4xl md:text-6xl text-text-heading mb-6">
            Engineered to <span className="text-accent italic">Dominate</span>
          </h2>
          <p className="text-text-body text-lg max-w-2xl mx-auto">
            Switch between live interactive project showcases to explore performance scores, visual architecture, and verified client growth metrics.
          </p>
        </div>

        {/* Tab Buttons (Horizontal Scrollable on Mobile) */}
        <div className="flex items-center overflow-x-auto no-scrollbar justify-start md:justify-center gap-2.5 mb-8 md:mb-12 w-full px-2">
          {showcaseProjects.map((project, idx) => (
            <button
              key={project.id}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2.5 sm:px-5 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 shrink-0 ${
                activeTab === idx
                  ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] scale-105 font-bold'
                  : 'bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-white/15'
              }`}
            >
              <Monitor className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{project.title}</span>
            </button>
          ))}
        </div>

        {/* Active Project Mockup Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#121216] border border-white/15 rounded-3xl p-5 sm:p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl text-white"
          >
            {/* Left Column: Project Details & Metrics */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-block px-3 py-1 rounded-md bg-white/10 text-zinc-200 text-xs font-semibold border border-white/15">
                {activeProject.category}
              </div>
              <h3 className="heading-serif text-3xl md:text-4xl text-white font-bold">
                {activeProject.title}
              </h3>
              <p className="text-zinc-300 text-base leading-relaxed">
                {activeProject.description}
              </p>

              {/* Verified Metrics Badges */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-center">
                  <div className="text-xs text-zinc-400">Load Speed</div>
                  <div className="text-lg font-extrabold text-emerald-400">{activeProject.metrics.speed}</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-center">
                  <div className="text-xs text-zinc-400">Conversion</div>
                  <div className="text-lg font-extrabold text-amber-400">{activeProject.metrics.conversion}</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-center">
                  <div className="text-xs text-zinc-400">PageSpeed</div>
                  <div className="text-lg font-extrabold text-blue-400">{activeProject.metrics.lighthouse}</div>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {activeProject.tech.map((tag, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-3 flex-wrap">
                <Button 
                  onClick={() => handleOpenModal(activeProject, 'casestudy')} 
                  variant="primary" 
                  icon
                >
                  View Case Study
                </Button>

                <button
                  onClick={() => handleOpenModal(activeProject, 'architecture')}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-sm font-semibold transition-all flex items-center gap-1.5"
                >
                  <span>Explore Architecture</span>
                  <ArrowUpRight className="w-4 h-4 text-blue-400" />
                </button>
              </div>
            </div>

            {/* Right Column: 3D Browser Interactive Mockup */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-zinc-950 group">
                {/* Browser Top Bar */}
                <div className="bg-zinc-900 px-4 py-3 flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="px-4 py-1 rounded-md bg-black/60 text-zinc-400 text-xs font-mono border border-white/5 truncate max-w-[240px]">
                    {activeProject.url}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">100% SECURE</span>
                  </div>
                </div>

                {/* Mockup Canvas Screen (Clickable to open Live Preview) */}
                <div 
                  onClick={() => handleOpenModal(activeProject, 'preview')}
                  className={`p-5 sm:p-8 md:p-12 min-h-[340px] md:min-h-[400px] flex flex-col justify-between bg-gradient-to-br ${activeProject.previewGradient} relative cursor-pointer group-hover:opacity-95 transition-opacity`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-300 bg-black/60 px-3 py-1 rounded-full border border-white/10">
                      PRIMEFORGE LIVE STAGING
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Live Interactive Preview
                    </div>
                  </div>

                  <div className="space-y-4 my-8">
                    <h4 className="text-3xl md:text-5xl font-black text-white tracking-tight group-hover:text-blue-300 transition-colors">
                      {activeProject.title}
                    </h4>
                    <p className="text-zinc-200 text-sm md:text-base max-w-md">
                      Interactive, production-ready full-stack experience engineered for conversion and speed.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-xs text-zinc-300 font-medium">Click screen to open live app modal</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal(activeProject, 'architecture');
                      }}
                      className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 transition-colors"
                    >
                      Explore Architecture <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        isOpen={!!modalProject}
        onClose={() => setModalProject(null)}
        initialTab={modalInitialTab}
        project={modalProject}
      />
    </section>
  );
}

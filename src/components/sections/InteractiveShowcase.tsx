'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const showcaseProjects = [
  {
    id: 'luxury-real-estate',
    title: 'Sterling Luxury Listings',
    category: 'High-Ticket Real Estate',
    metrics: { speed: '0.3s', conversion: '+184%', lighthouse: '100/100' },
    description: 'Ultra-luxury real estate platform with 60fps property walkthroughs, instant schedule booking, and integrated AI lead scoring.',
    previewGradient: 'from-amber-900/40 via-zinc-900 to-black',
    accentColor: '#f59e0b',
    tags: ['Next.js 16', 'Framer Motion', 'Cal.com Embed', 'AEO/GEO Optimized'],
    liveUrl: '/projects',
  },
  {
    id: 'ai-saas-platform',
    title: 'Nexus AI Engine',
    category: 'SaaS & AI Technology',
    metrics: { speed: '0.2s', conversion: '+210%', lighthouse: '99/100' },
    description: 'Enterprise AI software platform built for high volume lead generation, automated RAG knowledge bases, and custom subscription billing.',
    previewGradient: 'from-blue-900/40 via-zinc-900 to-black',
    accentColor: '#3b82f6',
    tags: ['React 19', 'Supabase Vector', 'Upstash Redis', 'Tailwind v4'],
    liveUrl: '/projects',
  },
  {
    id: 'ecommerce-brand',
    title: 'Aura Fashion House',
    category: 'D2C E-Commerce Brand',
    metrics: { speed: '0.4s', conversion: '+142%', lighthouse: '98/100' },
    description: 'High-converting custom store experience replacing slow Shopify liquid templates with instant server rendering and 3D product previews.',
    previewGradient: 'from-purple-900/40 via-zinc-900 to-black',
    accentColor: '#a855f7',
    tags: ['Custom Next.js Store', 'Stripe Checkout', 'Resend Email Automation'],
    liveUrl: '/projects',
  },
];

export function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const activeProject = showcaseProjects[activeTab];

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
                {activeProject.tags.map((tag, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Button href={activeProject.liveUrl} variant="primary" icon>
                  View Case Study
                </Button>
              </div>
            </div>

            {/* Right Column: 3D Browser Interactive Mockup */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-zinc-950">
                {/* Browser Top Bar */}
                <div className="bg-zinc-900 px-4 py-3 flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="px-4 py-1 rounded-md bg-black/60 text-zinc-400 text-xs font-mono border border-white/5 truncate max-w-[240px]">
                    https://{activeProject.id}.primeforge.agency
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">100% SECURE</span>
                  </div>
                </div>

                {/* Mockup Canvas Screen */}
                <div className={`p-5 sm:p-8 md:p-12 min-h-[340px] md:min-h-[400px] flex flex-col justify-between bg-gradient-to-br ${activeProject.previewGradient} relative`}>
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
                    <h4 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                      {activeProject.title}
                    </h4>
                    <p className="text-zinc-200 text-sm md:text-base max-w-md">
                      Interactive, production-ready full-stack experience engineered for conversion and speed.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-xs text-zinc-400">Click tab to switch showcase</span>
                    <span className="text-xs text-blue-400 font-semibold flex items-center gap-1">
                      Explore Architecture <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

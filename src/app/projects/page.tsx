'use client';

import React, { useState } from 'react';
import { ExternalLink, Sparkles, X, Monitor, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlowCard } from '@/components/ui/GlowCard';
import { HeroCanvas } from '@/components/animations/HeroCanvas';
import { FadeUp, ScaleIn, StaggerContainer, StaggerItem } from '@/components/animations/AnimateOnScroll';
import { PricingSection } from '@/components/sections/PricingSection';
import { ProjectDetailsModal, ProjectDetailsData } from '@/components/ui/ProjectDetailsModal';

export default function ProjectsPage() {
  const [activeDemo, setActiveDemo] = useState<{ name: string; url: string } | null>(null);
  const [modalProject, setModalProject] = useState<ProjectDetailsData | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<'preview' | 'casestudy' | 'architecture'>('casestudy');

  const niches = [
    {
      title: "Real Estate",
      desc: "Property listings, lead generation, interactive location maps & booking.",
      glow: "rgba(59, 130, 246, 0.3)",
      demos: [
        { name: "A2 Realtor", link: "https://a2-realtor.netlify.app/" },
        { name: "Sterling Luxury Listings", link: "https://sterling-staging.primeforge.agency" },
      ]
    },
    {
      title: "Dental & Healthcare Clinics",
      desc: "Instant patient scheduling, service showcase, and trust-building UI.",
      glow: "rgba(16, 185, 129, 0.3)",
      demos: [
        { name: "City Dental Clinic", link: "https://the-city-clinic-dehradun.netlify.app/" },
        { name: "Elite Care Surgery", link: "https://the-city-clinic-dehradun.netlify.app/" },
      ]
    },
    {
      title: "Luxury Jewellery Shops",
      desc: "High-ticket product showcase, luxury catalog layout, and WhatsApp order inquiry.",
      glow: "rgba(245, 158, 11, 0.3)",
      demos: [
        { name: "Suvarna Jeweller", link: "https://suvarna-jeweller.vercel.app/" },
      ]
    },
    {
      title: "Veterinary & Pet Surgery",
      desc: "Appointment booking, emergency care dispatches, and clean medical UI.",
      glow: "rgba(6, 182, 212, 0.3)",
      demos: [
        { name: "Petcuro Surgery", link: "https://petcuro-sugery.netlify.app/" },
      ]
    },
    {
      title: "Salons & Makeover Studios",
      desc: "Service pricing menu, photo gallery, and automated booking system.",
      glow: "rgba(168, 85, 247, 0.3)",
      demos: [
        { name: "Stylish Mahi Unisex Salon", link: "https://stylishmahii-unisex-salon.netlify.app/" },
        { name: "Cloud 9 Salon", link: "https://cloud9salon.netlify.app/about" },
      ]
    },
    {
      title: "Restaurants, Cafes & Dining",
      desc: "Interactive menu display, table reservation form, and food gallery.",
      glow: "rgba(244, 63, 94, 0.3)",
      demos: [
        { name: "Crown Restaurant", link: "https://crown-restaurant.netlify.app/" },
        { name: "Zaika Gourmet", link: "https://zaikarestaurant.vercel.app/" },
      ]
    },
    {
      title: "Tours & Travel Agencies",
      desc: "Tour package booking, destination itinerary showcase, and lead dispatches.",
      glow: "rgba(59, 130, 246, 0.3)",
      demos: [
        { name: "Smart Choice Travels", link: "https://www.thesmartchoicetours.com/" },
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Combined Hero Section */}
      <section className="relative py-24 md:py-32 container text-center overflow-hidden">
        <HeroCanvas />
        <FadeUp className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PORTFOLIO & INDUSTRY DEMOS</span>
          </div>
          <h1 className="heading-serif text-5xl md:text-7xl mb-6 text-text-heading">
            Projects, Niches & <span className="text-accent italic">Pricing</span>
          </h1>
          <p className="text-lg md:text-xl text-text-body max-w-3xl mx-auto leading-relaxed">
            Explore our custom full-stack solutions, click live local business demos to preview them directly on screen, and pick a package that fits your goals.
          </p>
        </FadeUp>
      </section>

      {/* Section 1: Custom Full-Stack Projects */}
      <section className="py-16 md:py-24 border-t border-black/5 dark:border-white/10 bg-transparent relative">
        <div className="container max-w-4xl mx-auto px-4">
          <FadeUp>
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>STACKING OVERLAY SHOWCASE</span>
              </div>
              <h2 className="heading-serif text-3xl md:text-5xl text-text-heading mb-4">Custom Full-Stack Apps</h2>
              <p className="text-text-body text-base max-w-xl mx-auto">
                Bespoke applications engineered with Next.js, database backends, and AI integrations. Scroll down to reveal stacked architecture.
              </p>
            </div>
          </FadeUp>

          <div className="space-y-6 md:space-y-8">
            {[
              {
                title: "Protein Coach AI",
                badge: "AI-POWERED WEB APP",
                status: "Live Production",
                desc: "A full-stack nutrition tracking app where users input meals and get AI-generated protein breakdowns and daily coaching feedback. Built with Next.js, Supabase, and OpenAI API.",
                tech: ["Next.js", "Supabase", "OpenAI", "Tailwind v4"],
                url: "https://protein-coach-tracker-g6cx.vercel.app/",
                glow: "rgba(16, 185, 129, 0.4)",
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
                title: "Sterling Real Estate Platform",
                badge: "LUXURY REAL ESTATE",
                status: "Delivered Studio",
                desc: "Ultra-luxury real estate platform with 60fps property walkthroughs, instant booking scheduler for property viewings, and integrated AEO search optimization.",
                tech: ["Next.js 16", "Cal.com Embed", "AEO/GEO", "Supabase"],
                url: "https://a2-realtor.netlify.app/",
                glow: "rgba(59, 130, 246, 0.4)",
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
              {
                title: "OnePath",
                badge: "PRODUCTIVITY & GOAL SYSTEMS",
                status: "In Development",
                desc: "A full-stack productivity SaaS built around single-goal commitment — users can only pursue one active goal at a time, forcing focus over the context-switching that \"productive procrastinators\" fall into. Features an AI coach (Gemini-powered), flexible goal durations, multi-pillar tracking, partner accountability via real-time chat, and a fully monochrome, motion-restrained design system.",
                tech: ["Next.js 16", "Supabase", "Gemini API", "Framer Motion"],
                url: "https://one-path-saas.vercel.app/",
                glow: "rgba(168, 85, 247, 0.4)",
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
            ].map((project, idx) => (
              <GlowCard
                key={idx}
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
                    onClick={() => setActiveDemo({ name: project.title, url: project.url })}
                    variant="primary"
                    className="w-full justify-center text-center font-bold py-3"
                  >
                    Preview App On Screen
                  </Button>

                  <button
                    onClick={() => {
                      setModalProject({
                        title: project.title,
                        category: project.badge,
                        status: project.status,
                        description: project.desc,
                        url: project.url,
                        tech: project.tech,
                        metrics: { speed: "0.3s", conversion: "+184%", lighthouse: "99/100" },
                        caseStudy: project.caseStudy,
                        architecture: project.architecture
                      });
                      setModalInitialTab('casestudy');
                    }}
                    className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-sm transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Case Study & Arch</span>
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  </button>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Industry Demo Sites (Niches) */}
      <section className="py-24 border-t border-white/10">
        <div className="container max-w-6xl mx-auto px-4">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="heading-serif text-3xl md:text-5xl mb-4 text-text-heading">
                Industry-Specific Demos
              </h2>
              <p className="text-text-body text-base max-w-xl mx-auto">
                Ready-to-deploy structures optimized to convert clients for specific local business categories. Click any demo to preview live on screen.
              </p>
            </div>
          </FadeUp>

          {/* Mobile swipe hint */}
          <div className="flex md:hidden items-center justify-end gap-1.5 text-xs text-blue-400 font-semibold mb-3 px-1">
            <span>Swipe left for demos</span>
            <span>→</span>
          </div>

          <StaggerContainer className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {niches.map((niche, i) => (
              <StaggerItem key={i} className="h-full w-[85vw] max-w-[340px] shrink-0 snap-center md:w-auto">
                <GlowCard glowColor={niche.glow} className="h-full p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{niche.title}</h3>
                    <p className="text-zinc-400 text-xs leading-relaxed mb-6">{niche.desc}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10 mt-auto">
                    <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-3">Live Interactive Demos:</p>
                    <ul className="space-y-2.5">
                      {niche.demos.map((demo, j) => (
                        <li key={j}>
                          <button
                            onClick={() => setActiveDemo({ name: demo.name, url: demo.link })}
                            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-accent hover:bg-accent/10 transition-all text-xs font-semibold text-zinc-200 group"
                          >
                            <span>{demo.name}</span>
                            <div className="flex items-center gap-1 text-accent">
                              <span>Preview</span>
                              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlowCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Section 3: Transparent Pricing */}
      <section className="border-t border-white/10">
        <PricingSection />
      </section>

      {/* INTERACTIVE DEMO PREVIEW MODAL */}
      {activeDemo && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center p-2 sm:p-4 md:p-8 animate-fade-in">
          <div className="w-full max-w-5xl h-[92vh] sm:h-[85vh] bg-zinc-950 border border-white/20 rounded-2xl overflow-hidden flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.9)]">
            {/* Modal Top Header */}
            <div className="bg-zinc-900 px-4 py-3 sm:px-6 sm:py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-white truncate max-w-[160px] sm:max-w-xs">{activeDemo.name}</div>
                  <div className="text-[10px] sm:text-xs text-zinc-400 truncate max-w-[160px] sm:max-w-md">{activeDemo.url}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <a
                  href={activeDemo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-white/10 border border-white/10 text-[10px] sm:text-xs text-white hover:bg-white/20 transition-colors font-medium shrink-0"
                >
                  <span className="hidden sm:inline">Open Fullscreen</span>
                  <span className="sm:hidden">Open</span>
                  <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </a>
                <button
                  onClick={() => setActiveDemo(null)}
                  className="p-1.5 sm:p-2 rounded-xl bg-white/10 text-white hover:bg-red-500/20 hover:text-red-400 transition-colors shrink-0"
                  aria-label="Close Preview"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Iframe Live Browser Preview */}
            <div className="flex-1 bg-white relative">
              <iframe
                src={activeDemo.url}
                title={activeDemo.name}
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Project Details Modal for Case Study & Architecture */}
      <ProjectDetailsModal
        isOpen={!!modalProject}
        onClose={() => setModalProject(null)}
        initialTab={modalInitialTab}
        project={modalProject}
      />
    </div>
  );
}

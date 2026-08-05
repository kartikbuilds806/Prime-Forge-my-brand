'use client';

import React, { useState } from 'react';
import { ExternalLink, Sparkles, X, Monitor, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlowCard } from '@/components/ui/GlowCard';
import { HeroCanvas } from '@/components/animations/HeroCanvas';
import { FadeUp, ScaleIn, StaggerContainer, StaggerItem } from '@/components/animations/AnimateOnScroll';
import { PricingSection } from '@/components/sections/PricingSection';

export default function ProjectsPage() {
  const [activeDemo, setActiveDemo] = useState<{ name: string; url: string } | null>(null);

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
      <section className="py-16 border-t border-black/5 dark:border-white/10 bg-black/5 dark:bg-black/40">
        <div className="container max-w-6xl mx-auto px-4">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="heading-serif text-3xl md:text-5xl text-text-heading mb-4">Custom Full-Stack Apps</h2>
              <p className="text-text-body text-base max-w-xl mx-auto">
                Bespoke applications engineered with Next.js, database backends, and AI integrations.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Protein Coach */}
            <StaggerItem className="h-full">
              <GlowCard className="h-full p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-accent tracking-wider uppercase">
                      AI-Powered Web App
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Live Production
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Protein Coach AI
                  </h3>
                  
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    A full-stack nutrition tracking app where users input meals and get AI-generated protein breakdowns and daily coaching feedback. Built with Next.js, Supabase, and OpenAI API.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {["Next.js", "Supabase", "OpenAI", "Tailwind v4"].map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <Button
                    onClick={() => setActiveDemo({ name: "Protein Coach AI", url: "https://protein-coach-tracker-g6cx.vercel.app/" })}
                    variant="primary"
                    className="w-full justify-center text-center font-bold"
                  >
                    Preview App On Screen
                  </Button>
                </div>
              </GlowCard>
            </StaggerItem>

            {/* Sterling Luxury Real Estate */}
            <StaggerItem className="h-full">
              <GlowCard className="h-full p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-accent tracking-wider uppercase">
                      Luxury Real Estate
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/30 text-blue-400">
                      <Zap className="w-3 h-3" /> Delivered Studio
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Sterling Real Estate Platform
                  </h3>
                  
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    Ultra-luxury real estate platform with 60fps property walkthroughs, instant booking scheduler for property viewings, and integrated AEO search optimization.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {["Next.js 16", "Cal.com Embed", "AEO/GEO", "Supabase"].map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <Button
                    onClick={() => setActiveDemo({ name: "Sterling Real Estate", url: "https://a2-realtor.netlify.app/" })}
                    variant="primary"
                    className="w-full justify-center text-center font-bold"
                  >
                    Preview Platform On Screen
                  </Button>
                </div>
              </GlowCard>
            </StaggerItem>
          </StaggerContainer>
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

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {niches.map((niche, i) => (
              <StaggerItem key={i} className="h-full">
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
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in">
          <div className="w-full max-w-5xl h-[85vh] bg-zinc-950 border border-white/20 rounded-2xl overflow-hidden flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.9)]">
            {/* Modal Top Header */}
            <div className="bg-zinc-900 px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-accent" />
                <div>
                  <div className="text-sm font-bold text-white">{activeDemo.name}</div>
                  <div className="text-xs text-zinc-400 truncate max-w-[280px] md:max-w-md">{activeDemo.url}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={activeDemo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-xs text-white hover:bg-white/20 transition-colors font-medium"
                >
                  <span>Open Fullscreen</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setActiveDemo(null)}
                  className="p-2 rounded-xl bg-white/10 text-white hover:bg-red-500/20 hover:text-red-400 transition-colors"
                >
                  <X className="w-5 h-5" />
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
    </div>
  );
}

import React from 'react';
import { Button } from '@/components/ui/Button';
import { GlowCard } from '@/components/ui/GlowCard';
import { HeroCanvas } from '@/components/animations/HeroCanvas';
import Image from 'next/image';
import { FadeUp, ScaleIn } from '@/components/animations/AnimateOnScroll';
import { Sparkles, ShieldCheck, Zap, Award } from 'lucide-react';

export const metadata = {
  title: 'About Us | PrimeForge — Web Design & SEO Agency',
  description: 'Founded on coding excellence and complete transparency. We engineer digital experiences that dominate SEO and turn traffic into booked revenue.',
};

export default function AboutPage() {
  const coreValues = [
    { title: "Performance First", desc: "Sub-second load times engineered with Next.js 16 for maximum client conversion." },
    { title: "Conversion Focused", desc: "Every button, headline, and layout is strategically placed to turn visitors into leads." },
    { title: "Total Transparency", desc: "Zero hidden fees. See your 48-hour live demo before making any payment." },
    { title: "Search & AI Dominance", desc: "We write clean code optimized for Google AND AI engines like ChatGPT & Perplexity." }
  ];

  const stats = [
    { label: "Delivered Platforms", value: "50+", icon: <Award className="w-4 h-4 text-blue-400" /> },
    { label: "On-Time Delivery", value: "100%", icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> },
    { label: "Average Speed Score", value: "99/100", icon: <Zap className="w-4 h-4 text-amber-400" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Hero */}
      <section className="relative pt-24 pb-16 md:pt-28 md:pb-20 container overflow-hidden">
        <HeroCanvas />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          <div className="max-w-2xl">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OUR STORY & PHILOSOPHY</span>
              </div>
              <h1 className="heading-serif text-5xl md:text-7xl text-text-heading mb-6">
                The PrimeForge <span className="text-accent italic">Story.</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-text-body text-lg md:text-xl leading-relaxed">
                Founded by <strong>Kartik Sharma</strong>, PrimeForge was built on a simple realization: local businesses were being overcharged for slow, bloated template websites that failed to generate actual clients. We decided to do things differently — engineering high-speed custom digital assets that dominate search results and scale business revenue.
              </p>
            </FadeUp>

            {/* Metric Pills */}
            <FadeUp delay={0.3} className="grid grid-cols-3 gap-3 sm:gap-4 pt-8">
              {stats.map((stat, i) => (
                <div key={i} className="p-3 sm:p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-center">
                  <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs text-text-body mb-1">
                    {stat.icon}
                    <span className="truncate">{stat.label}</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-text-heading">{stat.value}</div>
                </div>
              ))}
            </FadeUp>
          </div>

          <FadeUp delay={0.3} className="shrink-0 mt-4 md:mt-0">
            <Button href="/start-a-project" variant="primary" icon>Start Your Project</Button>
          </FadeUp>
        </div>
      </section>

      {/* Founder Spotlight (Middle Section) */}
      <section className="py-12 md:py-16 container max-w-6xl mx-auto px-4 relative z-10">
        <FadeUp className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-widest mb-3">
            LEADERSHIP & VISION
          </div>
          <h2 className="heading-serif text-3xl md:text-5xl text-text-heading">
            Driven by <span className="text-accent italic">Engineering Excellence</span>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Founder Bio Card */}
          <FadeUp delay={0.1} className="lg:col-span-6 space-y-6">
            <GlowCard className="p-6 md:p-8">
              <h3 className="heading-serif text-2xl md:text-3xl text-white mb-4">
                Personalized Attention for Every Client
              </h3>
              <p className="text-zinc-300 text-base leading-relaxed mb-6">
                "We don't hand your project off to junior developers or outsourcing hubs. I oversee every line of code, UI component, and SEO structure to ensure your site outperforms 99% of competitors."
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-lg">Kartik Sharma</p>
                  <p className="text-xs text-blue-400 font-medium">Founder & Director, PrimeForge</p>
                </div>
                <Button href="/contact" variant="secondary" className="text-xs py-2 px-4 text-white">
                  Get in Touch
                </Button>
              </div>
            </GlowCard>
          </FadeUp>

          {/* Centered Founder Image Card */}
          <ScaleIn delay={0.2} className="lg:col-span-6 h-[450px] md:h-[520px]">
            <div className="w-full h-full relative rounded-3xl overflow-hidden border border-white/15 flex flex-col justify-end p-6 md:p-8 group shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-zinc-900">
              {/* Full Background Image */}
              <Image 
                src="/my-image.jpeg" 
                alt="Kartik Sharma - Founder of PrimeForge" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                priority
              />
              
              {/* Gradient Overlay for Readable Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

              {/* Founder Information Badge */}
              <div className="relative z-20 p-5 md:p-6 bg-black/70 backdrop-blur-xl rounded-2xl border border-white/15 shadow-2xl">
                <div className="text-xs font-bold text-accent tracking-widest uppercase mb-1 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                  FOUNDER & DIRECTOR
                </div>
                <div className="text-2xl md:text-3xl font-black text-white tracking-tight mb-0.5">Kartik Sharma</div>
                <p className="text-xs text-zinc-300 font-medium">Lead Full-Stack Architect & Digital Strategist</p>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* Core Principles Grid (Bottom Section) */}
      <section className="py-16 md:py-24 container max-w-6xl mx-auto px-4 relative z-10">
        <FadeUp className="text-center mb-12">
          <h2 className="heading-serif text-3xl md:text-5xl text-text-heading mb-4">
            Our Core <span className="text-accent">Principles</span>
          </h2>
          <p className="text-text-body text-base md:text-lg max-w-xl mx-auto">
            The standard we uphold across every project we launch.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreValues.map((value, idx) => (
            <FadeUp key={idx} delay={idx * 0.1}>
              <GlowCard className="p-6 md:p-8 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </span>
                  <h3 className="heading-serif text-xl md:text-2xl text-white">{value.title}.</h3>
                </div>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed pl-11">{value.desc}</p>
              </GlowCard>
            </FadeUp>
          ))}
        </div>
      </section>
    </div>
  );
}

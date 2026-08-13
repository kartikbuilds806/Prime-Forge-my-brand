'use client';

import React, { useRef } from 'react';
import { PhoneCall, Monitor, CheckCircle2, CreditCard, Rocket, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { GlowCard } from '@/components/ui/GlowCard';
import { FadeUp } from '@/components/animations/AnimateOnScroll';

const processSteps = [
  {
    step: '01',
    title: 'Strategy Briefing',
    subtitle: 'Contact & Book Call',
    desc: 'We map out your business goals, target audience, technical requirements, and competitive positioning.',
    icon: <PhoneCall className="w-6 h-6 text-blue-400" />,
    glow: 'rgba(59, 130, 246, 0.4)',
  },
  {
    step: '02',
    title: '48-Hour Live Demo',
    subtitle: 'Prototype Showcase',
    desc: 'See a live interactive demo of your new custom website or AI agent pipeline within 48 hours.',
    icon: <Monitor className="w-6 h-6 text-purple-400" />,
    glow: 'rgba(168, 85, 247, 0.4)',
  },
  {
    step: '03',
    title: 'Design & Code Approval',
    subtitle: 'Zero Risk Review',
    desc: 'We tweak and refine every pixel and component until you are 100% satisfied with the live prototype.',
    icon: <CheckCircle2 className="w-6 h-6 text-emerald-400" />,
    glow: 'rgba(16, 185, 129, 0.4)',
  },
  {
    step: '04',
    title: 'Payment & Core Engineering',
    subtitle: 'Lock In Project',
    desc: 'Payment is processed only after prototype approval to finalize database backends and AI APIs.',
    icon: <CreditCard className="w-6 h-6 text-amber-400" />,
    glow: 'rgba(245, 158, 11, 0.4)',
  },
  {
    step: '05',
    title: 'Final Global Handover',
    subtitle: 'Domain & Launch',
    desc: 'We point your domain, activate SEO & GEO indexing, and hand over your revenue-generating digital infrastructure.',
    icon: <Rocket className="w-6 h-6 text-cyan-400" />,
    glow: 'rgba(6, 182, 212, 0.4)',
  },
];

function ProcessStepCard({
  item,
  index,
  total,
  scrollYProgress,
}: {
  item: typeof processSteps[0];
  index: number;
  total: number;
  scrollYProgress: any;
}) {
  const enterStart = index === 0 ? 0 : Math.max(0.02, (index - 1) * (1 / (total - 0.5)) + 0.04);
  const enterEnd = index === 0 ? 0 : index * (1 / (total - 0.5));
  
  const recede1 = Math.min(0.98, (index + 1) * (1 / (total - 0.5)));
  const recede2 = Math.min(1.0, (index + 2) * (1 / (total - 0.5)));

  const translateY = useTransform(
    scrollYProgress,
    index === 0
      ? [0, recede1, recede2]
      : [0, enterStart, enterEnd, recede1, recede2],
    index === 0
      ? ['0px', '-22px', '-44px']
      : ['100vh', '100vh', '0px', '-22px', '-44px']
  );

  const scale = useTransform(
    scrollYProgress,
    index === 0
      ? [0, recede1, recede2]
      : [0, enterStart, enterEnd, recede1, recede2],
    index === 0
      ? [1, 0.95, 0.90]
      : [1, 1, 1, 0.95, 0.90]
  );

  const opacity = useTransform(
    scrollYProgress,
    index === 0
      ? [0, recede1, recede2]
      : [0, enterStart, enterEnd, recede1, recede2],
    index === 0
      ? [1, 0.75, 0.55]
      : [0, 0, 1, 0.75, 0.55]
  );

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
        glowColor={item.glow}
        className="p-6 sm:p-8 flex flex-col justify-between bg-zinc-950/95 backdrop-blur-2xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9)] rounded-3xl h-[280px] sm:h-[300px]"
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-black font-mono text-zinc-400">{item.step}</span>
            <div className="p-3 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
              {item.icon}
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{item.title}</h3>
          <div className="text-xs font-semibold text-blue-400 mb-3">{item.subtitle}</div>
          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-zinc-400">
          <span>STEP {item.step} OF 05</span>
          <span className="text-emerald-400">PrimeForge Engineering Pipeline</span>
        </div>
      </GlowCard>
    </motion.div>
  );
}

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section className="py-24 relative bg-surface/30 border-t border-black/5 dark:border-white/10">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>3D STACKING PIPELINE</span>
            </div>
            <h2 className="heading-serif text-4xl md:text-6xl text-text-heading mb-4">
              How We <span className="text-accent italic">Work</span>
            </h2>
            <p className="text-text-body text-base md:text-lg max-w-2xl mx-auto">
              A transparent, risk-free 5-step engineering pipeline from initial briefing to live revenue generation. Scroll down to reveal stacked steps.
            </p>
          </FadeUp>
        </div>

        {shouldReduceMotion ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processSteps.map((item) => (
              <GlowCard key={item.step} glowColor={item.glow} className="p-6 bg-zinc-950/95 border border-white/20 rounded-3xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-mono text-zinc-400">{item.step}</span>
                  <div className="p-2.5 rounded-xl bg-white/10">{item.icon}</div>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                <div className="text-xs font-semibold text-blue-400 mb-2">{item.subtitle}</div>
                <p className="text-zinc-300 text-xs leading-relaxed">{item.desc}</p>
              </GlowCard>
            ))}
          </div>
        ) : (
          <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: `${processSteps.length * 80}vh` }}
          >
            <div className="sticky top-[120px] w-full max-w-3xl mx-auto h-[280px] sm:h-[300px] overflow-visible">
              {processSteps.map((item, idx) => (
                <ProcessStepCard
                  key={item.step}
                  item={item}
                  index={idx}
                  total={processSteps.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

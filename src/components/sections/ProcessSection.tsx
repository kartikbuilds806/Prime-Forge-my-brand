'use client';

import React, { useState } from 'react';
import { PhoneCall, Monitor, CheckCircle2, CreditCard, Rocket, Sparkles } from 'lucide-react';
import { GlowCard } from '@/components/ui/GlowCard';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/animations/AnimateOnScroll';

const processSteps = [
  {
    step: '01',
    title: 'Strategy Briefing',
    subtitle: 'Contact & Book Call',
    desc: 'We map out your business goals, target audience, and competitive positioning.',
    icon: <PhoneCall className="w-6 h-6 text-blue-400" />,
    glow: 'rgba(59, 130, 246, 0.3)',
  },
  {
    step: '02',
    title: '48-Hour Live Demo',
    subtitle: 'Prototype Showcase',
    desc: 'See a live interactive demo of your new custom website within 48 hours.',
    icon: <Monitor className="w-6 h-6 text-purple-400" />,
    glow: 'rgba(168, 85, 247, 0.3)',
  },
  {
    step: '03',
    title: 'Design Approval',
    subtitle: 'Zero Risk Review',
    desc: 'We tweak and refine every pixel until you are 100% satisfied with the demo.',
    icon: <CheckCircle2 className="w-6 h-6 text-emerald-400" />,
    glow: 'rgba(16, 185, 129, 0.3)',
  },
  {
    step: '04',
    title: 'Payment & Build',
    subtitle: 'Lock In Project',
    desc: 'Payment is processed only after design approval to finalize core engineering.',
    icon: <CreditCard className="w-6 h-6 text-amber-400" />,
    glow: 'rgba(245, 158, 11, 0.3)',
  },
  {
    step: '05',
    title: 'Final Handover',
    subtitle: 'Domain & Launch',
    desc: 'We point your domain, activate SEO indexing, and hand over your revenue platform.',
    icon: <Rocket className="w-6 h-6 text-cyan-400" />,
    glow: 'rgba(6, 182, 212, 0.3)',
  },
];

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 relative overflow-hidden bg-transparent border-t border-black/5 dark:border-white/10">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE 5-STEP PIPELINE</span>
            </div>
            <h2 className="heading-serif text-4xl md:text-6xl text-text-heading mb-4">
              How We <span className="text-accent italic">Work</span>
            </h2>
            <p className="text-text-body text-base md:text-lg max-w-2xl mx-auto">
              A transparent, risk-free 5-step engineering pipeline from initial briefing to live client generation.
            </p>
          </FadeUp>
        </div>

        {/* Mobile swipe hint */}
        <div className="flex md:hidden items-center justify-end gap-1.5 text-xs text-blue-400 font-semibold mb-3 px-1">
          <span>Swipe left to view steps</span>
          <span>→</span>
        </div>

        {/* Steps Pipeline Grid */}
        <StaggerContainer className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-5 md:gap-4 relative">
          {processSteps.map((item, idx) => (
            <StaggerItem key={item.step} className="h-full w-[78vw] max-w-[290px] shrink-0 snap-center md:w-auto">
              <div onClick={() => setActiveStep(idx)} className="h-full">
                <GlowCard
                  glowColor={item.glow}
                  className={`h-full p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                    activeStep === idx ? 'border-blue-500/60 shadow-[0_0_25px_rgba(59,130,246,0.3)]' : ''
                  }`}
                >
                <div>
                  {/* Step Number & Icon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black font-mono text-zinc-400">{item.step}</span>
                    <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <div className="text-xs font-semibold text-blue-400 mb-3">{item.subtitle}</div>
                  <p className="text-zinc-300 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </GlowCard>
            </div>
          </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Mobile Swipe Indicators */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-4">
          {processSteps.map((_, idx) => (
            <div key={idx} className={`h-1.5 rounded-full transition-all ${idx === 0 ? 'w-5 bg-blue-500' : 'w-1.5 bg-text-body/30'}`} />
          ))}
          <span className="text-[10px] text-text-body/60 font-medium ml-2">Swipe process →</span>
        </div>
      </div>
    </section>
  );
}

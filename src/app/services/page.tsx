import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';
import { GlowCard } from '@/components/ui/GlowCard';
import { HeroCanvas } from '@/components/animations/HeroCanvas';
import { ServicesShowcase } from '@/components/sections/ServicesShowcase';
import { AIAgentsShowcase } from '@/components/sections/AIAgentsShowcase';
import { FadeUp } from '@/components/animations/AnimateOnScroll';

export const metadata = {
  title: 'Services | PrimeForge — Web Design & SEO Agency',
  description: 'Premium digital solutions engineered to convert visitors into paying clients. Custom websites, landing pages, SEO, AEO, GEO, and AI Chatbots.',
};

export default function ServicesPage() {
  const comparison = [
    { feature: "Code Quality", us: "100% Custom Coded (React/Next.js)", them: "Cheap Templates (Elementor/Wix)" },
    { feature: "Delivery Speed", us: "2-5 Days (48h Live Demo)", them: "3-6 Weeks" },
    { feature: "Search Visibility", us: "SEO + AEO + GEO Optimized", them: "Basic SEO Only" },
    { feature: "AI Integration", us: "Custom AI Chatbots & Agents", them: "Not Offered" },
    { feature: "Risk Factor", us: "Free demo first, pay after approval", them: "Pay heavy deposits upfront" },
    { feature: "Design Revisions", us: "Unlimited during demo phase", them: "Strictly limited (1-2 rounds)" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-16 md:pt-28 md:pb-32 container text-center overflow-hidden">
        <HeroCanvas />
        <FadeUp className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FULL-STACK CAPABILITIES</span>
          </div>
          <h1 className="heading-serif text-5xl md:text-7xl mb-6 text-text-heading">
            What We <span className="text-accent italic">Can Do For You</span>
          </h1>
          <p className="text-lg md:text-xl text-text-body max-w-3xl mx-auto leading-relaxed">
            Premium digital solutions engineered to eliminate friction, dominate search results, and convert traffic into booked revenue.
          </p>
        </FadeUp>
      </section>

      {/* Main Capabilities Showcase */}
      <ServicesShowcase />

      {/* Autonomous AI Agents & Workflows Suite */}
      <AIAgentsShowcase />

      {/* Comparison Matrix */}
      <section className="py-24 container max-w-5xl mx-auto px-4">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="heading-serif text-4xl md:text-5xl mb-4 text-text-heading">
              Why We <span className="text-accent italic">Outperform</span> Others
            </h2>
            <p className="text-text-body text-base md:text-lg">See how PrimeForge custom engineering compares to traditional agencies.</p>
          </div>
        </FadeUp>

        <GlowCard className="p-4 sm:p-6 md:p-8">
          {/* Mobile Card List (< md) */}
          <div className="space-y-4 md:hidden">
            {comparison.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">{item.feature}</div>
                <div className="flex items-start gap-2 text-emerald-400 font-semibold text-sm">
                  <Check className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-500 block">PrimeForge</span>
                    <span>{item.us}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-zinc-400 text-xs pt-1 border-t border-white/5">
                  <X className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-500 block">Others</span>
                    <span>{item.them}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table (>= md) */}
          <table className="hidden md:table w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-zinc-400">
                <th className="pb-4">Feature</th>
                <th className="pb-4 text-accent font-bold">PrimeForge Engine</th>
                <th className="pb-4 text-zinc-500">Other Agencies / Freelancers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {comparison.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 font-medium text-white">{item.feature}</td>
                  <td className="py-4 text-emerald-400 font-semibold flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>{item.us}</span>
                  </td>
                  <td className="py-4 text-zinc-400 flex items-center gap-2">
                    <X className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{item.them}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlowCard>
      </section>
    </div>
  );
}

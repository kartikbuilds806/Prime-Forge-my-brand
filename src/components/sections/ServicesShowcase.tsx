'use client';

import React from 'react';
import { MonitorSmartphone, MousePointerClick, CalendarDays, Search, Bot, Wrench, Sparkles, ArrowUpRight } from 'lucide-react';
import { GlowCard } from '@/components/ui/GlowCard';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/animations/AnimateOnScroll';

const servicesList = [
  {
    id: 'web-dev',
    category: 'CORE ENGINEERING',
    title: 'Custom Website Development',
    desc: 'High-performance, bespoke Next.js websites custom-coded to position your brand as the #1 leader in your market.',
    highlight: 'Sub-second speed & zero template bloat.',
    icon: <MonitorSmartphone className="w-6 h-6 text-blue-400" />,
    glow: 'rgba(59, 130, 246, 0.3)',
    href: '/services#website-development',
  },
  {
    id: 'landing-pages',
    category: 'CONVERSION FUNNELS',
    title: 'High-Converting Landing Pages',
    desc: 'Hyper-focused single-page funnels engineered with persuasion psychology to turn paid ad traffic into booked clients.',
    highlight: '+140% average conversion lift.',
    icon: <MousePointerClick className="w-6 h-6 text-purple-400" />,
    glow: 'rgba(168, 85, 247, 0.3)',
    href: '/services#landing-pages',
  },
  {
    id: 'booking-systems',
    category: 'WORKFLOW AUTOMATION',
    title: 'Automated Booking Systems',
    desc: 'Seamless calendar scheduling embedded directly on your site, eliminating manual back-and-forth messaging.',
    highlight: '24/7 self-service client scheduling.',
    icon: <CalendarDays className="w-6 h-6 text-emerald-400" />,
    glow: 'rgba(16, 185, 129, 0.3)',
    href: '/services#booking-systems',
  },
  {
    id: 'seo-aeo-geo',
    category: 'AI SEARCH DOMINANCE',
    title: 'SEO / AEO / GEO Optimization',
    desc: 'Technical optimization ensuring your brand is indexed and recommended by Google AND AI engines like ChatGPT & Perplexity.',
    highlight: 'Ranks on traditional & AI search engines.',
    icon: <Search className="w-6 h-6 text-amber-400" />,
    glow: 'rgba(245, 158, 11, 0.3)',
    href: '/services#seo-optimization',
  },
  {
    id: 'ai-chatbots',
    category: 'AI AGENTS',
    title: 'AI Chatbots & Voice Agents',
    desc: 'Custom-trained intelligent AI agents that qualify incoming leads, answer client FAQs, and book calls around the clock.',
    highlight: 'Zero dropped leads while you sleep.',
    icon: <Bot className="w-6 h-6 text-cyan-400" />,
    glow: 'rgba(6, 182, 212, 0.3)',
    href: '/services#ai-agents',
  },
  {
    id: 'maintenance',
    category: 'CONTINUOUS GROWTH',
    title: 'Platform Maintenance & QA',
    desc: 'Proactive speed audits, security updates, and instant content edits to keep your platform running at peak performance.',
    highlight: '100/100 PageSpeed & 99.9% uptime.',
    icon: <Wrench className="w-6 h-6 text-rose-400" />,
    glow: 'rgba(244, 63, 94, 0.3)',
    href: '/services#maintenance',
  },
];

export function ServicesShowcase() {
  return (
    <section className="py-24 relative overflow-hidden bg-surface/30 border-y border-black/5 dark:border-white/10">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HIGH-IMPACT CAPABILITIES</span>
            </div>
            <h2 className="heading-serif text-4xl md:text-6xl text-text-heading mb-4">
              What We Can <span className="text-accent italic">Do For You</span>
            </h2>
            <p className="text-text-body text-base md:text-lg max-w-2xl mx-auto">
              Precision digital solutions engineered to eliminate friction, capture high-ticket leads, and grow your revenue.
            </p>
          </FadeUp>
        </div>

        {/* Services Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service) => (
            <StaggerItem key={service.id} className="h-full">
              <GlowCard
                glowColor={service.glow}
                className="h-full p-6 md:p-8 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Top Category Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300 px-2.5 py-1 rounded-full bg-white/10 border border-white/15">
                      {service.category}
                    </span>
                    <div className="p-3 rounded-2xl bg-white/10 border border-white/15 group-hover:scale-110 group-hover:border-blue-400/40 transition-all duration-300">
                      {service.icon}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-zinc-300 text-xs leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                {/* Bottom Highlight Pill */}
                <div className="pt-4 border-t border-white/10 mt-auto flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {service.highlight}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

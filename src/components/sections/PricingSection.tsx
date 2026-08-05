'use client';

import React from 'react';
import { Check, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlowCard } from '@/components/ui/GlowCard';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/animations/AnimateOnScroll';

interface FeatureItem {
  name: string;
}

interface PricingPlan {
  id: string;
  badge: string;
  price: string;
  period: string;
  subtitle: string;
  features: FeatureItem[];
  ctaText: string;
  ctaHref: string;
  featured: boolean;
}

export function PricingSection() {
  const plans: PricingPlan[] = [
    {
      id: 'starter',
      badge: 'STARTER',
      price: '$100',
      period: '/ project',
      subtitle: 'Essential high-speed digital foundation for local businesses.',
      features: [
        { name: 'Custom Website Design' },
        { name: 'Basic SEO Setup' },
        { name: 'Responsive Mobile Layout' },
        { name: 'Contact Form Integration' },
        { name: 'Fast Load PageSpeed' },
        { name: '2 Free Revisions' },
      ],
      ctaText: 'Start Basic Build',
      ctaHref: '/start-a-project?plan=starter',
      featured: false,
    },
    {
      id: 'medium',
      badge: 'MOST POPULAR',
      price: '$200',
      period: '/ project',
      subtitle: 'High-converting platform with AI search optimization & booking.',
      features: [
        { name: 'Everything in Starter' },
        { name: 'AI Search Optimization (ChatGPT/Perplexity)' },
        { name: 'Chatbot Booking System' },
        { name: 'Enhanced Local SEO' },
        { name: 'Lead Capture Funnel' },
        { name: '3 Free Revisions' },
      ],
      ctaText: 'Choose Medium Plan',
      ctaHref: '/start-a-project?plan=medium',
      featured: true,
    },
    {
      id: 'advanced',
      badge: 'BEST VALUE',
      price: '$400',
      period: '/ project',
      subtitle: 'Complete AI-powered growth package for market domination.',
      features: [
        { name: 'Everything in Medium' },
        { name: 'GEO Content Optimization' },
        { name: 'AI Voice Agent Integration' },
        { name: 'Advanced Conversion Funnels' },
        { name: 'Automated Lead CRM Sync' },
        { name: 'Priority Developer Support' },
        { name: '5+ Free Revisions' },
      ],
      ctaText: 'Scale My Agency',
      ctaHref: '/start-a-project?plan=advanced',
      featured: false,
    },
  ];

  return (
    <div className="flex flex-col w-full py-16 md:py-24">
      {/* SECTION HEADER */}
      <div className="container text-center mb-12">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRANSPARENT PRICING</span>
          </div>
          <h2 className="heading-serif text-4xl md:text-6xl mb-4 text-text-heading">
            Simple Pricing For <span className="text-accent italic">Growing Businesses</span>
          </h2>
          <p className="text-text-body text-base md:text-lg max-w-2xl mx-auto">
            Choose the perfect website package for your business. Designed to convert visitors into booked revenue.
          </p>
        </FadeUp>
      </div>

      {/* CARDS GRID */}
      <div className="container max-w-6xl mx-auto px-4">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <StaggerItem key={plan.id} className="h-full">
              <GlowCard
                glowColor={plan.featured ? 'rgba(37, 99, 235, 0.4)' : 'rgba(255, 255, 255, 0.15)'}
                className={`h-full p-6 md:p-8 flex flex-col justify-between relative ${
                  plan.featured ? 'border-accent/60 shadow-[0_0_40px_rgba(37,99,235,0.25)]' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-white text-[10px] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(37,99,235,0.6)]">
                    {plan.badge}
                  </div>
                )}

                <div>
                  {/* Top Row */}
                  <div className="flex justify-between items-center mb-3">
                    {!plan.featured && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  {/* Price Header */}
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-4xl md:text-5xl font-black text-white tracking-tight">{plan.price}</span>
                    <span className="text-zinc-400 text-xs font-medium">{plan.period}</span>
                  </div>

                  <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                    {plan.subtitle}
                  </p>

                  <div className="h-px bg-white/10 w-full mb-6" />

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-xs text-zinc-300">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                        </div>
                        <span>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="pt-2 mt-auto">
                  <Button
                    href={plan.ctaHref}
                    variant={plan.featured ? 'primary' : 'secondary'}
                    className="w-full justify-center text-center font-bold py-3 text-xs tracking-wider uppercase"
                    icon={plan.featured}
                  >
                    {plan.ctaText}
                  </Button>
                </div>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom Trust Row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" /> 48-Hour Live Demo
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Payment Only After Approval
          </div>
        </div>
      </div>
    </div>
  );
}

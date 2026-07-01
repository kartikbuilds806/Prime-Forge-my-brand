"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, MessageSquare, Bot, PhoneCall, Zap, Brain, Smartphone, ShieldCheck, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/animations/AnimateOnScroll';

interface FeatureItem {
  name: string;
  desc: string;
}

interface PricingPlan {
  id: string;
  badge: string;
  price: string;
  description: string;
  features: FeatureItem[];
  ctaText: string;
  ctaHref: string;
  featured: boolean;
}

interface AdditionalService {
  id: string;
  title: string;
  price: string;
  description: string;
  icon: React.ReactNode;
}

export function PricingSection() {
  const plans: PricingPlan[] = [
    {
      id: 'starter',
      badge: 'Starter',
      price: '$100',
      description: 'Perfect for businesses that need a clean and professional website to establish an online presence.',
      features: [
        { name: 'Website Design', desc: 'Custom, unique layout representing your brand.' },
        { name: 'Basic SEO Setup', desc: 'Get found by local clients searching on Google.' },
        { name: 'Responsive Design', desc: 'Perfect layout on any screen size or device.' },
        { name: 'Mobile-Friendly Layout', desc: 'Tap-to-call buttons and easy thumb navigation.' },
        { name: 'Contact Form', desc: 'Allow visitors to reach you 24/7.' },
        { name: 'Fast Loading Pages', desc: 'Lightning-fast speed to keep visitors on your site.' },
        { name: '2 Free Revisions', desc: 'We adjust the site to match your exact vision.' },
      ],
      ctaText: 'Get Started',
      ctaHref: '/start-a-project?plan=starter',
      featured: false,
    },
    {
      id: 'medium',
      badge: 'Most Popular',
      price: '$200',
      description: 'Ideal for businesses that want to generate more leads and improve online visibility.',
      features: [
        { name: 'Everything Included In Basic', desc: 'All the essential foundation features.' },
        { name: 'AI Search Optimization', desc: 'Help your business appear in AI-powered search experiences like ChatGPT.' },
        { name: 'Chatbot Booking Form', desc: 'Automate appointment scheduling directly on your site.' },
        { name: 'Social Media Integration', desc: 'Connect your profiles to build trust and show activity.' },
        { name: 'Enhanced SEO Structure', desc: 'Rank higher for highly competitive local search terms.' },
        { name: 'Lead Capture Optimization', desc: 'Pop-ups and call-to-actions placed to get you leads.' },
        { name: '3 Free Revisions', desc: 'More freedom to fine-tune copy and layouts.' },
      ],
      ctaText: 'Choose Medium',
      ctaHref: '/start-a-project?plan=medium',
      featured: true,
    },
    {
      id: 'advanced',
      badge: 'Best Value',
      price: '$400',
      description: 'A complete growth package designed for businesses ready to leverage AI and automation.',
      features: [
        { name: 'Everything Included In Medium', desc: 'All standard and optimization features.' },
        { name: 'GEO Content Optimization', desc: 'Be recommended when users ask AI engines for top local services.' },
        { name: 'Voice Agent Integration', desc: 'AI-powered phone assistant to qualify leads and answer calls.' },
        { name: 'Optional Video Content Integration', desc: 'Embed client video testimonials and engaging video intros.' },
        { name: 'Advanced Conversion Optimization', desc: 'Tailored funnel design to maximize customer inquiries.' },
        { name: 'Business Automation Ready', desc: 'Sync new leads directly to your CRM, email list, or spreadsheet.' },
        { name: 'Priority Support', desc: 'Direct line to our developers for any urgent requests.' },
        { name: '5+ Free Revisions', desc: 'Comprehensive iterations until it is absolutely perfect.' },
      ],
      ctaText: 'Scale My Business',
      ctaHref: '/start-a-project?plan=advanced',
      featured: false,
    },
  ];

  const trustBadges = [
    { label: 'Mobile Responsive', icon: <Smartphone className="w-4 h-4 text-accent" /> },
    { label: 'Fast Delivery', icon: <Zap className="w-4 h-4 text-accent" /> },
    { label: 'SEO Friendly', icon: <Check className="w-4 h-4 text-accent" /> },
    { label: 'Business Focused', icon: <ShieldCheck className="w-4 h-4 text-accent" /> },
    { label: 'Secure Hosting Ready', icon: <HelpCircle className="w-4 h-4 text-accent" /> },
  ];

  const additionalServices: AdditionalService[] = [
    {
      id: 'whatsapp-chatbot',
      title: 'WhatsApp Chatbot',
      price: '$50',
      description: 'Automate customer communication directly through WhatsApp.',
      icon: <MessageSquare className="w-6 h-6 text-accent" />,
    },
    {
      id: 'website-chatbot',
      title: 'Website Chatbot Integration',
      price: '$50',
      description: 'Add an intelligent AI chatbot directly to your website.',
      icon: <Bot className="w-6 h-6 text-accent" />,
    },
    {
      id: 'voice-agent',
      title: 'Voice Agent',
      price: '$100',
      description: 'AI-powered voice assistant for customer support and lead qualification.',
      icon: <PhoneCall className="w-6 h-6 text-accent" />,
    },
    {
      id: 'ai-automation',
      title: 'AI Automation',
      price: '$150',
      description: 'Automate repetitive business processes and save valuable time.',
      icon: <Zap className="w-6 h-6 text-accent" />,
    },
    {
      id: 'custom-ai-agent',
      title: 'Custom Business AI Agent',
      price: '$200',
      description: 'A personalized AI system tailored specifically for your business operations and workflows.',
      icon: <Brain className="w-6 h-6 text-accent" />,
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* SECTION HEADER */}
      <section className="py-16 md:py-24 container text-center">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-black/10 dark:border-white/10 mb-6 mx-auto">
            <span className="text-xs font-semibold text-accent tracking-widest uppercase">Transparent Pricing</span>
          </div>
          <h2 className="heading-serif text-4xl md:text-6xl mb-6 text-text-heading">
            Simple Pricing For <span className="text-accent italic">Growing Businesses</span>
          </h2>
          <p className="text-lg md:text-xl text-text-body max-w-3xl mx-auto leading-relaxed">
            Choose the perfect website package for your business. Every plan is designed to help you establish a strong online presence and attract more customers.
          </p>
        </FadeUp>
      </section>

      {/* PRICING CARDS SECTION */}
      <section className="pb-16 container">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
          {plans.map((plan) => (
            <StaggerItem
              key={plan.id}
              className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                plan.featured
                  ? 'bg-white/[0.04] backdrop-blur-xl border-2 border-accent shadow-[0_4px_24px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] md:scale-102 z-10'
                  : 'glass-card'
              } ${plan.id === 'advanced' ? 'md:col-span-2 lg:col-span-1 md:max-w-sm md:mx-auto lg:w-full lg:max-w-none' : ''}`}
              whileHover={
                plan.featured
                  ? { y: -6, scale: 1.03, borderColor: 'rgba(37, 99, 235, 0.8)' }
                  : { y: -6, scale: 1.01, borderColor: 'rgba(37, 99, 235, 0.4)' }
              }
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-white text-[10px] font-bold uppercase tracking-wider shadow-[0_4px_12px_rgba(37,99,235,0.4)]">
                  {plan.badge}
                </div>
              )}

              <div>
                {/* Header */}
                <div className="flex justify-between items-center mb-5">
                  {!plan.featured && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-body/60 px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                      {plan.badge}
                    </span>
                  )}
                  {plan.featured && <div />} {/* Spacer */}
                </div>

                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl font-extrabold text-text-heading tracking-tight">{plan.price}</span>
                  <span className="text-text-body text-xs font-medium">/ project</span>
                </div>

                <p className="text-text-body text-xs mb-5 leading-relaxed">
                  {plan.description}
                </p>

                <hr className="border-black/10 dark:border-white/10 mb-5" />

                {/* Features */}
                <ul className="space-y-2.5 mb-6 text-left">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="p-0.5 rounded-full bg-accent/10 mt-0.5 shrink-0">
                        <Check className="w-3.5 h-3.5 text-accent" />
                      </div>
                      <div>
                        <span className="text-text-heading text-xs font-semibold block">{feature.name}</span>
                        <span className="text-text-body text-[11px] leading-normal">{feature.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <div className="mt-auto pt-2">
                <Button
                  href={plan.ctaHref}
                  variant={plan.featured ? 'primary' : 'secondary'}
                  className="w-full justify-center text-center font-bold py-2.5 text-sm"
                  icon={plan.featured}
                >
                  {plan.ctaText}
                </Button>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* CONVERSION ENHANCEMENTS */}
      <section className="py-12 container max-w-4xl mx-auto text-center border-t border-black/5 dark:border-white/5">
        <FadeUp>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-8">
            {trustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-black/5 dark:border-white/5 text-xs font-semibold text-text-heading/95">
                {badge.icon}
                <span>{badge.label}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-text-body italic">
            Need something custom?{' '}
            <a href="/contact" className="text-accent hover:underline font-semibold transition-colors">
              Contact us for a personalized solution.
            </a>
          </p>
        </FadeUp>
      </section>

      {/* ADDITIONAL SERVICES SECTION */}
      <section className="py-16 md:py-24 container bg-surface/20 border-t border-black/5 dark:border-white/5 w-full">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h3 className="heading-serif text-3xl md:text-4xl mb-4 text-text-heading">
                Additional Services
              </h3>
              <p className="text-text-body text-lg max-w-2xl mx-auto">
                Enhance your website with powerful AI and automation solutions.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, i) => (
              <StaggerItem
                key={service.id}
                className="glass-card p-6 flex flex-col justify-between"
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  borderColor: 'rgba(37, 99, 235, 0.4)',
                  boxShadow: '0 10px 20px -10px rgba(37, 99, 235, 0.15)',
                }}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 shrink-0">
                    {service.icon}
                  </div>
                  <h4 className="text-text-heading text-lg font-bold mb-2">{service.title}</h4>
                  <p className="text-text-body text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto pt-2 border-t border-black/5 dark:border-white/5">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-2xl font-bold text-text-heading">{service.price}</span>
                    <span className="text-text-body text-xs">/ addon</span>
                  </div>
                  <a
                    href={`/contact?addon=${service.id}`}
                    className="text-xs font-bold text-accent hover:underline flex items-center gap-1"
                  >
                    Inquire
                  </a>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}

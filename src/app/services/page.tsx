import React from 'react';
import { Check, X, MessageSquare, Bot, PhoneCall, Brain, Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlowCard } from '@/components/ui/GlowCard';
import { HeroCanvas } from '@/components/animations/HeroCanvas';
import { ServicesShowcase } from '@/components/sections/ServicesShowcase';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/animations/AnimateOnScroll';

export const metadata = {
  title: 'Services | PrimeForge — Web Design & SEO Agency',
  description: 'Premium digital solutions engineered to convert visitors into paying clients. Custom websites, landing pages, SEO, AEO, GEO, and AI Chatbots.',
};

interface AdditionalService {
  id: string;
  title: string;
  price: string;
  description: string;
  icon: React.ReactNode;
}

export default function ServicesPage() {
  const additionalServices: AdditionalService[] = [
    {
      id: 'whatsapp-chatbot',
      title: 'WhatsApp Chatbot',
      price: '$50',
      description: 'Automate customer communication and lead capture directly through WhatsApp.',
      icon: <MessageSquare className="w-6 h-6 text-accent" />,
    },
    {
      id: 'website-chatbot',
      title: 'Website Chatbot Integration',
      price: '$50',
      description: 'Add an intelligent AI chatbot trained on your business data directly to your website.',
      icon: <Bot className="w-6 h-6 text-accent" />,
    },
    {
      id: 'voice-agent',
      title: 'Voice Agent',
      price: '$100',
      description: 'AI-powered voice assistant for 24/7 phone support and lead qualification.',
      icon: <PhoneCall className="w-6 h-6 text-accent" />,
    },
    {
      id: 'ai-automation',
      title: 'AI Automation',
      price: '$150',
      description: 'Automate repetitive workflows, CRM entry, and lead dispatches seamlessly.',
      icon: <Zap className="w-6 h-6 text-accent" />,
    },
    {
      id: 'custom-ai-agent',
      title: 'Custom Business AI Agent',
      price: '$200',
      description: 'A personalized AI system tailored specifically for your business operations.',
      icon: <Brain className="w-6 h-6 text-accent" />,
    },
  ];

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
      <section className="relative py-24 md:py-32 container text-center overflow-hidden">
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

      {/* Additional Add-On Services */}
      <section className="py-24 border-t border-black/5 dark:border-white/10 w-full bg-black/5 dark:bg-black/40">
        <div className="container max-w-6xl mx-auto px-4">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="heading-serif text-4xl md:text-5xl mb-4 text-text-heading">
                AI & Automation <span className="text-accent italic">Add-Ons</span>
              </h2>
              <p className="text-text-body text-base md:text-lg max-w-2xl mx-auto">
                Supercharge your digital platform with specialized AI agents, WhatsApp bots, and automated lead dispatchers.
              </p>
            </div>
          </FadeUp>

          {/* Mobile swipe hint */}
          <div className="flex md:hidden items-center justify-end gap-1.5 text-xs text-blue-400 font-semibold mb-3 px-1">
            <span>Swipe left to view add-ons</span>
            <span>→</span>
          </div>

          <StaggerContainer className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-4">
            {additionalServices.map((service) => (
              <StaggerItem key={service.id} className="h-full w-[75vw] max-w-[270px] shrink-0 snap-center md:w-auto">
                <GlowCard className="h-full p-6 flex flex-col justify-between">
                  <div>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 w-fit mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">{service.title}</h3>
                    <div className="text-xs font-bold text-accent mb-3">{service.price}</div>
                    <p className="text-zinc-400 text-xs leading-relaxed">{service.description}</p>
                  </div>
                  <div className="pt-4 mt-auto">
                    <Button href={`/start-a-project?addon=${service.id}`} variant="secondary" className="w-full justify-center text-xs">
                      Add to Project
                    </Button>
                  </div>
                </GlowCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

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

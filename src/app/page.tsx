'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/animations/AnimateOnScroll';
import { CheckCircle2, ChevronDown, MonitorSmartphone, MousePointerClick, CalendarDays, Search, Bot, Wrench, Star, Sparkles } from 'lucide-react';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { HeroCanvas } from '@/components/animations/HeroCanvas';
import { InteractiveShowcase } from '@/components/sections/InteractiveShowcase';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ServicesShowcase } from '@/components/sections/ServicesShowcase';
import { AIAgentsShowcase } from '@/components/sections/AIAgentsShowcase';
import { LogoMarquee } from '@/components/sections/LogoMarquee';
import { GlowCard } from '@/components/ui/GlowCard';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const testimonials = [
    {
      quote: "Before hiring PrimeForge, our clinic website looked like a basic template. Within weeks of launching the custom Next.js build, our online patient bookings increased by 140%.",
      name: "Dr. Ananya Sharma",
      role: "Founder & Chief Surgeon",
      company: "City Dental Clinic, Dehradun",
      rating: 5
    },
    {
      quote: "The aesthetics, sub-second load times, and custom property filters perfectly match the multi-million dollar luxury real estate listings we sell. Best decision for our brand.",
      name: "Vikramaditya R.",
      role: "Managing Director",
      company: "Sterling Luxury Real Estate",
      rating: 5
    },
    {
      quote: "The automated WhatsApp inquiry flow and Cal.com integration completely revolutionized how our team handles tour bookings. Zero dropped leads while we sleep.",
      name: "Rahul Verma",
      role: "Head of Operations",
      company: "Smart Choice Tours & Travels",
      rating: 5
    },
    {
      quote: "PrimeForge delivered a 48-hour live demo that completely blew away every legacy agency proposal we received. Their attention to detail and performance optimization is unmatched.",
      name: "Siddharth Mehta",
      role: "Co-Founder",
      company: "Suvarna Luxury Jewellers",
      rating: 5
    }
  ];

  const faqs = [
    {
      q: "Do you use templates or are the websites custom coded?",
      a: "Every website we build is 100% custom coded. We do not rely on cheap templates or builders like Elementor that end up crashing or taking 10 seconds to load. We write clean, optimized code using modern frameworks like React and Next.js to ensure your site is lightning fast and totally unique to your brand."
    },
    {
      q: "How long does it take to deliver a premium website?",
      a: "Most business websites are delivered within 2 to 5 business days. You get a free live demo within 48 hours of our first call."
    },
    {
      q: "Do you do SEO?",
      a: "Yes — we do traditional SEO, AEO (Answer Engine Optimization for voice search and AI assistants), and GEO (Generative Engine Optimization so your business appears in ChatGPT and Perplexity results)."
    },
    {
      q: "What if I am not satisfied with the design?",
      a: "We offer unlimited revisions during the demo phase. You only pay once you are 100% happy with what you see."
    },
    {
      q: "How do I pay?",
      a: "Payment is processed only after design approval. We accept bank transfer, UPI, and international payments via Wise or Stripe."
    },
    {
      q: "Do you build chatbots and automations?",
      a: "Yes. We build AI chatbots trained on your business, voice agents, and basic workflow automations to help your business run on autopilot."
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-28 md:pb-32 flex flex-col items-center justify-center text-center px-4 min-h-[85vh] overflow-hidden">
        {/* Interactive Kinetic Particle Grid Canvas */}
        <HeroCanvas />

        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-primary -z-20 pointer-events-none transition-colors duration-500"></div>
        
        {/* Dark Mode Glows */}
        <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_80%_40%,_rgba(37,99,235,0.4)_0%,_rgba(30,64,175,0.2)_30%,_transparent_70%)] -z-10 pointer-events-none"></div>
        <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_20%_80%,_rgba(30,64,175,0.1)_0%,_transparent_50%)] -z-10 pointer-events-none"></div>
        
        {/* Light Mode Glows (Subtle) */}
        <div className="absolute inset-0 block dark:hidden bg-[radial-gradient(circle_at_80%_40%,_rgba(37,99,235,0.15)_0%,_rgba(37,99,235,0.05)_40%,_transparent_70%)] -z-10 pointer-events-none"></div>
        
        <div className="container max-w-4xl mx-auto flex flex-col items-center justify-center text-center w-full relative z-10">
          <FadeIn delay={0} className="flex justify-center w-full">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-surface border border-black/10 dark:border-white/10 mb-6 sm:mb-8 mx-auto shadow-lg backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs sm:text-sm font-medium text-text-heading/80">ACCEPTING NEW PROJECTS</span>
            </div>
          </FadeIn>

          <h1 className="heading-serif text-3xl sm:text-5xl md:text-7xl leading-tight mb-6 text-center flex flex-col items-center justify-center gap-1 sm:gap-2 w-full mx-auto tracking-tight">
            <FadeUp delay={0.1} className="w-full text-center flex justify-center">
              <span>Give Your Brand the</span>
            </FadeUp>
            <FadeUp delay={0.2} className="w-full text-center flex justify-center">
              <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-emerald-400 bg-clip-text text-transparent italic">Digital Infrastructure</span>
            </FadeUp>
            <FadeUp delay={0.3} className="w-full text-center flex justify-center">
              <span>It Deserves.</span>
            </FadeUp>
          </h1>

          <FadeUp delay={0.4} className="w-full flex justify-center">
            <p className="text-base sm:text-lg md:text-xl text-text-body max-w-2xl mx-auto mb-8 sm:mb-10 text-center leading-relaxed">
              Zero templates. Zero bloated plugins. Just custom high-speed web apps, AI agents, and modern search optimization.
            </p>
          </FadeUp>

          <FadeUp delay={0.5} className="w-full flex justify-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mx-auto">
              <Button href="/start-a-project" variant="primary" icon className="w-full sm:w-auto justify-center">Start a Project</Button>
              <Button href="/book-a-call" variant="secondary" className="w-full sm:w-auto justify-center">Book a Call</Button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Infinite Client Logo Marquee */}
      <LogoMarquee />

      {/* Interactive Before & After Proof Engine */}
      <BeforeAfterSlider />

      {/* 3D Browser Interactive Showcase */}
      <InteractiveShowcase />

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24 container">
        <FadeUp>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="heading-serif text-3xl sm:text-4xl md:text-5xl mb-4">
              Why <span className="text-accent">Choose Us?</span>
            </h2>
            <p className="text-text-body text-base sm:text-lg">No technical jargon. Just results that speak for themselves.</p>
          </div>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {[
            { title: "Lightning-Fast Launch", desc: "Stop waiting months. We deploy your high-performance, custom-coded site in days so you can start capturing leads immediately." },
            { title: "Unfair ROI Advantage", desc: "Agency-level premium aesthetics at a fraction of the cost. We cut the overhead to deliver a digital asset that pays for itself." },
            { title: "Flawless Mobile Experience", desc: "Over 70% of your traffic is on mobile. We engineer pixel-perfect responsiveness so you never lose a client to a clunky layout." },
            { title: "Engineered to Convert", desc: "We don't just build pretty brochures. Every button, layout, and word is strategically placed to turn cold traffic into booked revenue." },
          ].map((feature, i) => (
            <StaggerItem 
              key={i} 
              className="glass-card p-5 sm:p-8"
              whileHover={{ y: -6, scale: 1.02, borderColor: "rgba(59,130,246,0.5)" }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <h3 className="text-text-heading text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-text-body text-sm sm:text-base">{feature.desc}</p>
            </StaggerItem>
          ))}
          <StaggerItem className="md:col-span-2 glass-card p-5 sm:p-8 text-center flex flex-col items-center">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎧</div>
            <h3 className="text-text-heading text-lg sm:text-xl font-semibold mb-2">Free Consultation</h3>
            <p className="text-text-body text-sm sm:text-base">Expert advice on your digital strategy, no strings attached.</p>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Top 1% Capabilities Showcase */}
      <ServicesShowcase />

      {/* Autonomous AI Agents & Workflows Suite */}
      <AIAgentsShowcase />

      {/* Top 1% Interactive Process Pipeline */}
      <ProcessSection />

      {/* Pricing Teaser Banner */}
      <section id="pricing" className="py-16 sm:py-24 relative overflow-hidden border-t border-black/5 dark:border-white/10">
        <div className="container max-w-5xl mx-auto px-4">
          <GlowCard className="p-8 md:p-12 text-center relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TRANSPARENT INVESTMENT PACKAGES</span>
            </div>
            <h2 className="heading-serif text-3xl md:text-5xl text-white mb-4">
              Simple Pricing For <span className="text-accent italic">Growing Businesses</span>
            </h2>
            <p className="text-zinc-300 text-base md:text-lg max-w-2xl mx-auto mb-8">
              Bespoke packages custom-engineered to convert visitors into booked revenue. Free live demo within 48 hours — pay only after design approval.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href="/projects#pricing" variant="primary" icon className="font-bold py-3.5 px-6 text-sm">
                Explore Packages & Pricing ($100 - $400)
              </Button>
              <Button href="/book-a-call" variant="secondary" className="font-bold py-3.5 px-6 text-sm text-white">
                Book Strategy Call
              </Button>
            </div>
          </GlowCard>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 overflow-hidden relative">
        <div className="container mb-12 sm:mb-16 text-center relative z-10">
          <FadeUp>
            <h2 className="heading-serif text-3xl sm:text-4xl md:text-5xl mb-4">Client <span className="text-accent">Success</span></h2>
            <p className="text-text-body text-base sm:text-lg">Don't just take our word for it.</p>
          </FadeUp>
        </div>

        {/* Endless scrolling marquee */}
        <div className="relative w-full flex overflow-x-hidden">
          {/* Left/Right fading gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none"></div>
          
          <motion.div 
            className="flex gap-4 sm:gap-6 px-4 sm:px-6 shrink-0"
            animate={{ x: [0, -1920] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            {[...testimonials, ...testimonials].map((testimonial, i) => (
              <div key={i} className="w-[280px] sm:w-[350px] md:w-[450px] shrink-0 glass-card p-5 sm:p-8">
                <div className="flex gap-1 text-yellow-500 mb-4 sm:mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />)}
                </div>
                <p className="text-text-heading text-sm sm:text-lg italic mb-4 sm:mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="text-text-heading font-bold text-xs sm:text-base">{testimonial.name}</p>
                  <p className="text-text-body text-[11px] sm:text-xs font-medium">{testimonial.role} — <span className="text-blue-400 font-semibold">{testimonial.company}</span></p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 container max-w-3xl mx-auto px-4">
        <FadeUp>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="heading-serif text-3xl sm:text-4xl md:text-5xl mb-4">FAQ</h2>
            <p className="text-text-body text-base sm:text-lg">Everything you need to know about working with PrimeForge.</p>
          </div>
        </FadeUp>

        <StaggerContainer className="space-y-3 sm:space-y-4">
          {[
            { q: "Do you use templates or are the websites custom coded?", a: "We never use generic templates. Every single website is custom-designed and hard-coded from scratch using Next.js and React. This guarantees unparalleled speed, security, and a unique premium aesthetic that templates simply cannot match." },
            { q: "How long does it take to deliver a premium website?", a: "Most agency projects take 2-4 weeks from the strategy call to the final live launch. We work fast without compromising on the high-end quality." },
            { q: "Do you do SEO?", a: "Yes. Technical SEO is baked into our code by default. We also offer advanced AEO (Answer Engine Optimization) so AI bots like ChatGPT recommend your business, and GEO (Generative Engine Optimization) for AI search summaries." },
            { q: "What if I am not satisfied with the design?", a: "We build a live demo before we ask for payment. If you don't like it, we iterate until you do. You have zero risk." },
            { q: "How do I pay?", a: "We use a milestone-based system. You only pay once you've seen and approved the initial design concepts." },
            { q: "Do you build chatbots and automations?", a: "Absolutely. We can integrate custom AI agents trained specifically on your business data to handle customer inquiries 24/7." }
          ].map((faq, i) => (
            <StaggerItem key={i}>
              <div className="bg-surface border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => toggleFaq(i)}
                  className="w-full text-left px-5 py-4 sm:px-8 sm:py-6 flex items-center justify-between hover:bg-black/5 dark:bg-white/5 transition-colors focus:outline-none"
                >
                  <span className="text-text-heading font-medium text-sm sm:text-lg pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 sm:w-6 sm:h-6 text-accent transition-transform duration-300 shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0 sm:px-8 sm:pb-6 text-text-body text-xs sm:text-base leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* CTA Banner */}
      <section className="py-24 container">
        <ScaleIn>
          <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A8A]/30 border border-blue-900/50 rounded-[32px] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px]"></div>
            
            <div className="relative z-10">
              <h2 className="heading-serif text-4xl md:text-5xl mb-6 text-white">Ready to scale your business?</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
                Let's engineer a digital experience that converts visitors into high-paying clients.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href="/start-a-project" variant="primary" icon>Start Your Project</Button>
                <Button href="/book-a-call" variant="secondary" className="!text-white !border-white/20 hover:!bg-white/10 hover:!text-white">Book a Strategy Call</Button>
              </div>
            </div>
          </div>
        </ScaleIn>
      </section>
    </div>
  );
}

"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, ChevronDown, MonitorSmartphone, MousePointerClick, CalendarDays, Search, Bot, Wrench, Star } from 'lucide-react';
import { FadeUp, FadeIn, FadeLeft, ScaleIn, StaggerContainer, StaggerItem } from '@/components/animations/AnimateOnScroll';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const testimonials = [
    {
      quote: "Before hiring PrimeForge, my store looked like a cheap template. Within weeks of launching the new design, our conversion rate practically doubled.",
      name: "Happy Customer",
      rating: 5
    },
    {
      quote: "The best web development and quality service providers in town. The built-in booking system completely changed how we handle appointments.",
      name: "Satisfied Client",
      rating: 5
    },
    {
      quote: "The owner is very soft spoken and kind in nature. Great experience! The aesthetics, the smoothness exactly match the multi-million dollar properties I sell.",
      name: "Premium Client",
      rating: 5
    }
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

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
      <section className="relative pt-32 pb-32 flex flex-col items-center justify-center text-center px-4 min-h-[90vh]">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-primary -z-20 pointer-events-none transition-colors duration-500"></div>
        
        {/* Dark Mode Glows */}
        <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_80%_40%,_rgba(37,99,235,0.4)_0%,_rgba(30,64,175,0.2)_30%,_transparent_70%)] -z-10 pointer-events-none"></div>
        <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_20%_80%,_rgba(30,64,175,0.1)_0%,_transparent_50%)] -z-10 pointer-events-none"></div>
        
        {/* Light Mode Glows (Subtle) */}
        <div className="absolute inset-0 block dark:hidden bg-[radial-gradient(circle_at_80%_40%,_rgba(37,99,235,0.15)_0%,_rgba(37,99,235,0.05)_40%,_transparent_70%)] -z-10 pointer-events-none"></div>
        
        <div className="container max-w-4xl mx-auto flex flex-col items-center justify-center text-center w-full">
          <FadeIn delay={0} className="flex justify-center w-full">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-black/10 dark:border-white/10 mb-8 mx-auto">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm font-medium text-text-heading/80">ACCEPTING NEW PROJECTS</span>
            </div>
          </FadeIn>

          <h1 className="heading-serif text-5xl md:text-7xl leading-tight mb-6 text-center flex flex-col items-center justify-center gap-2 w-full mx-auto">
            <FadeUp delay={0.1} className="w-full text-center flex justify-center">
              <span>We build websites that</span>
            </FadeUp>
            <FadeUp delay={0.2} className="w-full text-center flex justify-center">
              <span className="text-accent italic">bring you clients,</span>
            </FadeUp>
            <FadeUp delay={0.3} className="w-full text-center flex justify-center">
              <span>not just traffic.</span>
            </FadeUp>
          </h1>

          <FadeUp delay={0.4} className="w-full flex justify-center">
            <p className="text-lg md:text-xl text-text-body max-w-2xl mx-auto mb-10 text-center">
              Helping ambitious businesses dominate their niche with premium, high-converting digital experiences.
            </p>
          </FadeUp>

          <FadeUp delay={0.5} className="w-full flex justify-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mx-auto">
              <Button href="/start-a-project" variant="primary" icon>Start a Project</Button>
              <Button href="/book-a-call" variant="secondary">Book a Call</Button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-20 border-y border-black/5 dark:border-white/5 bg-surface/30 overflow-hidden">
        <FadeUp>
          <div className="container mb-12 text-center">
            <h2 className="heading-serif text-3xl md:text-4xl">What Our Customers Say</h2>
          </div>
        </FadeUp>
        
        <FadeIn delay={0.2}>
          <div className="relative w-full flex overflow-x-hidden group">
          <div className="flex w-max animate-marquee space-x-6 px-6 group-hover:[animation-play-state:paused]">
            {duplicatedTestimonials.map((testimonial, i) => (
              <div key={i} className="w-[350px] bg-surface border border-black/10 dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between shrink-0">
                <div>
                  <div className="flex gap-1 mb-4 text-yellow-500">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-text-heading text-lg italic mb-6">"{testimonial.quote}"</p>
                </div>
                <p className="text-text-body font-medium">{testimonial.name}</p>
              </div>
            ))}
          </div>
          </div>
        </FadeIn>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 container">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="heading-serif text-4xl md:text-5xl mb-4">
              Why <span className="text-accent">Choose Us?</span>
            </h2>
            <p className="text-text-body text-lg">No technical jargon. Just results that speak for themselves.</p>
          </div>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[
            { title: "Lightning-Fast Launch", desc: "Stop waiting months. We deploy your high-performance, custom-coded site in days so you can start capturing leads immediately." },
            { title: "Unfair ROI Advantage", desc: "Agency-level premium aesthetics at a fraction of the cost. We cut the overhead to deliver a digital asset that pays for itself." },
            { title: "Flawless Mobile Experience", desc: "Over 70% of your traffic is on mobile. We engineer pixel-perfect responsiveness so you never lose a client to a clunky layout." },
            { title: "Engineered to Convert", desc: "We don't just build pretty brochures. Every button, layout, and word is strategically placed to turn cold traffic into booked revenue." },
          ].map((feature, i) => (
            <StaggerItem 
              key={i} 
              className="bg-surface border border-black/10 dark:border-white/10 rounded-2xl p-8 transition-colors"
              whileHover={{ y: -6, scale: 1.02, borderColor: "rgba(59,130,246,0.5)" }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <h3 className="text-text-heading text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-text-body">{feature.desc}</p>
            </StaggerItem>
          ))}
          <StaggerItem className="md:col-span-2 bg-gradient-to-br from-surface to-accent/10 border border-black/10 dark:border-white/10 rounded-2xl p-8 text-center flex flex-col items-center">
            <div className="text-4xl mb-4">🎧</div>
            <h3 className="text-text-heading text-xl font-semibold mb-2">Free Consultation</h3>
            <p className="text-text-body">Expert advice on your digital strategy, no strings attached.</p>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-surface/30 border-y border-black/5 dark:border-white/5">
        <div className="container">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="heading-serif text-4xl md:text-5xl mb-4">
                What We Can <span className="text-accent">Do For You</span>
              </h2>
              <p className="text-text-body text-lg">No technical jargon. Just clear solutions that get you measurable results.</p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { 
                icon: <MonitorSmartphone className="w-8 h-8 text-accent" />, 
                title: "Business Website Development", 
                what: "A complete, professionally designed website customized for your brand.",
                result: "Establishes a powerful online presence that makes you look like the top choice in your local area."
              },
              { 
                icon: <MousePointerClick className="w-8 h-8 text-accent" />, 
                title: "High-Converting Landing Pages", 
                what: "A single page highly focused on getting visitors to take one specific action.",
                result: "Reduces bounce rates and dramatically increases your ad campaign ROI."
              },
              { 
                icon: <CalendarDays className="w-8 h-8 text-accent" />, 
                title: "Booking System Integration", 
                what: "Automated calendar scheduling embedded directly on your site.",
                result: "Saves you hours of manual messaging and secures appointments instantly."
              },
              { 
                icon: <Search className="w-8 h-8 text-accent" />, 
                title: "SEO / AEO / GEO Optimization", 
                what: "Technical setup to make sure Google AND AI engines like ChatGPT and Perplexity find and recommend your website.",
                result: "Brings you free, organic traffic from people already searching for your services."
              },
              { 
                icon: <Bot className="w-8 h-8 text-accent" />, 
                title: "AI Chatbots & Voice Agents", 
                what: "Intelligent chatbots and voice assistants trained on your business data.",
                result: "Answer client queries 24/7 and capture leads even while you sleep."
              },
              { 
                icon: <Wrench className="w-8 h-8 text-accent" />, 
                title: "Maintenance & Support", 
                what: "Ongoing updates, security checks, and content edits whenever needed.",
                result: "Keeps your site running fast and secure, giving you zero technical headaches."
              }
            ].map((service, i) => (
              <StaggerItem 
                key={i} 
                className="bg-surface border border-black/10 dark:border-white/10 rounded-2xl p-8 transition-all duration-300"
                whileHover={{ y: -6, scale: 1.02, borderColor: "rgba(59,130,246,0.5)" }}
              >
                <div className="w-16 h-16 bg-black/50 rounded-xl flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-text-heading text-2xl font-serif mb-4">{service.title}</h3>
                <div className="space-y-3 text-sm">
                  <p><strong className="text-text-heading">What it is:</strong> <span className="text-text-body">{service.what}</span></p>
                  <p><strong className="text-accent">The Result:</strong> <span className="text-text-body">{service.result}</span></p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 container max-w-3xl mx-auto">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="heading-serif text-4xl md:text-5xl mb-4">
              How We <span className="text-accent">Work</span>
            </h2>
            <p className="text-text-body text-lg">A transparent, risk-free 5-step process from our first chat to your live website.</p>
          </div>
        </FadeUp>

        <div className="relative border-l-2 border-black/10 dark:border-white/10 ml-6 md:ml-12 pl-12 space-y-8">
          {[
            { step: "1", icon: "📞", title: "Contact / Book Call", desc: "We discuss your goals, target audience, and specific requirements." },
            { step: "2", icon: "🖥️", title: "Get Free Demo Website", desc: "Within 48 hours, see a live demo of what your site could look like." },
            { step: "3", icon: "👍", title: "Approve Design", desc: "You review the demo. We refine and tweak it until it perfectly matches your vision." },
            { step: "4", icon: "💳", title: "Payment", desc: "Once you are 100% satisfied, we process the payment to lock in the final build." },
            { step: "5", icon: "🚀", title: "Final Delivery", desc: "We launch your website, connect your domain, and you start getting clients." },
          ].map((item, i) => (
            <FadeLeft 
              key={i} 
              delay={i * 0.1}
              className="relative"
            >
              <div className="absolute -left-[69px] w-10 h-10 bg-[#3B82F6] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.6)] z-10">
                {item.step}
              </div>
              <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center hover:border-white/10 transition-colors shadow-lg">
                <div className="text-4xl shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-white text-xl font-medium mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </FadeLeft>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 overflow-hidden relative">
        <div className="container mb-16 text-center relative z-10">
          <FadeUp>
            <h2 className="heading-serif text-4xl md:text-5xl mb-4">Client <span className="text-accent">Success</span></h2>
            <p className="text-text-body text-lg">Don't just take our word for it.</p>
          </FadeUp>
        </div>

        {/* Endless scrolling marquee */}
        <div className="relative w-full flex overflow-x-hidden">
          {/* Left/Right fading gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary to-transparent z-10"></div>
          
          <motion.div 
            className="flex gap-6 px-6 shrink-0"
            animate={{ x: [0, -1920] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            {[...testimonials, ...testimonials].map((testimonial, i) => (
              <div key={i} className="w-[350px] md:w-[450px] shrink-0 bg-surface border border-black/5 dark:border-white/5 rounded-2xl p-8 shadow-lg">
                <div className="flex gap-1 text-yellow-500 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-text-heading text-lg italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="text-text-heading font-medium">{testimonial.name}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 container max-w-3xl mx-auto">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="heading-serif text-4xl md:text-5xl mb-4">FAQ</h2>
            <p className="text-text-body text-lg">Everything you need to know about working with PrimeForge.</p>
          </div>
        </FadeUp>

        <StaggerContainer className="space-y-4">
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
                  className="w-full text-left px-8 py-6 flex items-center justify-between hover:bg-black/5 dark:bg-white/5 transition-colors focus:outline-none"
                >
                  <span className="text-text-heading font-medium text-lg pr-8">{faq.q}</span>
                  <ChevronDown className={`w-6 h-6 text-accent transition-transform duration-300 shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
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
                      <div className="px-8 pb-6 pt-0 text-text-body leading-relaxed">
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

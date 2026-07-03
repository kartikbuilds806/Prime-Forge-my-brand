import React from 'react';
import { MonitorSmartphone, MousePointerClick, CalendarDays, Search, Bot, Wrench, Check, X, MessageSquare, PhoneCall, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FadeUp, ScaleIn, StaggerContainer, StaggerItem } from '@/components/animations/AnimateOnScroll';

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
  const services = [
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

  const comparison = [
    { feature: "Code Quality", us: "100% Custom Coded (React/Next.js)", them: "Cheap Templates (Elementor/Wix)" },
    { feature: "Delivery Time", us: "2-5 Days", them: "3-6 Weeks" },
    { feature: "Search Visibility", us: "SEO + AEO + GEO Optimized", them: "Basic SEO Only" },
    { feature: "AI Integration", us: "Custom AI Chatbots included", them: "Not Offered" },
    { feature: "Risk Factor", us: "Free demo first, pay after approval", them: "Pay hefty deposits upfront" },
    { feature: "Design Revisions", us: "Unlimited during demo phase", them: "Strictly limited (1-2 rounds)" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-24 container text-center">
        <FadeUp>
          <h1 className="heading-serif text-5xl md:text-6xl mb-6">
            What We <span className="text-accent italic">Can Do For You</span>
          </h1>
          <p className="text-lg md:text-xl text-text-body max-w-2xl mx-auto">
            Premium digital solutions engineered to convert visitors into paying clients.
          </p>
        </FadeUp>
      </section>

      {/* Services Grid */}
      <section className="py-12 container">
        <StaggerContainer className="flex overflow-x-auto pb-6 gap-6 snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-x-visible md:pb-0 max-w-5xl mx-auto w-full">
          {services.map((service, i) => (
            <StaggerItem 
              key={i} 
              className="glass-card p-8 w-[85vw] max-w-[350px] shrink-0 snap-start md:w-auto md:max-w-none md:shrink"
              whileHover={{ y: -6, scale: 1.02, borderColor: "rgba(59,130,246,0.5)" }}
            >
              <div className="w-16 h-16 bg-black/50 rounded-xl flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-text-heading text-2xl font-serif mb-4">{service.title}</h3>
              <div className="space-y-4 text-base">
                <p><strong className="text-text-heading block mb-1">What it is:</strong> <span className="text-text-body leading-relaxed">{service.what}</span></p>
                <p><strong className="text-accent block mb-1">The Result:</strong> <span className="text-text-body leading-relaxed">{service.result}</span></p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-surface/20 border-t border-black/5 dark:border-white/5 w-full">
        <div className="container max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="heading-serif text-4xl md:text-5xl mb-4 text-text-heading">
                Additional Services
              </h2>
              <p className="text-text-body text-lg max-w-2xl mx-auto">
                Enhance your website with powerful AI and automation solutions.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="flex overflow-x-auto pb-6 gap-6 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-x-visible md:pb-0 w-full">
            {additionalServices.map((service) => (
              <StaggerItem
                key={service.id}
                className="glass-card p-6 flex flex-col justify-between w-[85vw] max-w-[350px] shrink-0 snap-start md:w-auto md:max-w-none md:shrink"
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
                  <h4 className="text-text-heading text-lg font-serif font-bold mb-2">{service.title}</h4>
                  <p className="text-text-body text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
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

      {/* Comparison Section */}
      <section className="py-24 container max-w-4xl mx-auto">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="heading-serif text-4xl md:text-5xl mb-4">
              PrimeForge vs <span className="text-accent">Everyone Else</span>
            </h2>
            <p className="text-text-body text-lg">Why settling for average agencies costs you more in the long run.</p>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="w-full overflow-x-auto pb-4">
            <div className="min-w-[650px] md:min-w-full bg-surface border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-3 border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                <div className="p-6 font-semibold text-text-heading/60">Feature</div>
                <div className="p-6 font-bold text-accent bg-accent/10 border-x border-accent/20">PrimeForge</div>
                <div className="p-6 font-semibold text-text-heading/60 text-center">Standard Agencies</div>
              </div>
              
              {comparison.map((item, i) => (
                <div key={i} className={`grid grid-cols-3 ${i !== comparison.length - 1 ? 'border-b border-black/5 dark:border-white/5' : ''}`}>
                  <div className="p-6 text-text-heading font-medium flex items-center">{item.feature}</div>
                  <div className="p-6 text-text-heading flex items-center gap-3 bg-accent/5 border-x border-accent/10">
                    <Check className="w-5 h-5 text-accent shrink-0" />
                    <span className="font-medium">{item.us}</span>
                  </div>
                  <div className="p-6 text-text-body flex items-center gap-3 justify-center text-center">
                    <X className="w-5 h-5 text-red-500 shrink-0" />
                    <span>{item.them}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        <div className="mt-16 text-center">
          <Button href="/start-a-project" variant="primary" icon>Start Your Project Today</Button>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, Sparkles, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlowCard } from '@/components/ui/GlowCard';
import { HeroCanvas } from '@/components/animations/HeroCanvas';
import { FadeUp, FadeLeft, ScaleIn } from '@/components/animations/AnimateOnScroll';

export const metadata = {
  title: 'Contact Us | PrimeForge — Web Design & SEO Agency',
  description: 'Get in touch with PrimeForge. We are ready to help you build a high-converting website.',
};

export default function ContactPage() {
  return (
    <div className="flex flex-col container pt-24 pb-16 md:pt-28 md:pb-32 relative overflow-hidden min-h-screen">
      <HeroCanvas />
      
      <FadeUp className="relative z-10 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>DIRECT CONNECT</span>
        </div>
        <h1 className="heading-serif text-5xl md:text-7xl mb-6 text-text-heading">
          Let's Start a <span className="text-accent italic">Conversation</span>
        </h1>
        <p className="text-lg md:text-xl text-text-body max-w-2xl mx-auto leading-relaxed">
          Whether you need a complete website overhaul or a highly optimized landing page, Kartik & the team are ready to deliver.
        </p>
      </FadeUp>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10">
        {/* Direct Contact Options */}
        <FadeLeft>
          <GlowCard className="p-8 md:p-12 h-full">
            <h2 className="text-2xl text-white font-bold mb-8">Direct Channels</h2>
          
            <div className="space-y-4 sm:space-y-6">
              <a href="https://wa.me/918630070729" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 sm:gap-5 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/50 transition-all group overflow-hidden">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-0.5">Fastest Response</p>
                  <p className="text-sm sm:text-base md:text-lg text-white font-bold group-hover:text-emerald-400 transition-colors break-words">Chat on WhatsApp (+91 8630070729)</p>
                </div>
              </a>

              <a href="tel:+918533925291" className="flex items-center gap-4 sm:gap-5 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-accent transition-all group overflow-hidden">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-zinc-400 font-medium mb-0.5">Call Us Directly</p>
                  <p className="text-sm sm:text-base md:text-lg text-white font-bold group-hover:text-accent transition-colors">+91 8533925291</p>
                </div>
              </a>

              <a href="mailto:primeforge7@gmail.com" className="flex items-center gap-4 sm:gap-5 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-accent transition-all group overflow-hidden">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-zinc-400 font-medium mb-0.5">Email Team</p>
                  <p className="text-sm sm:text-base md:text-lg text-white font-bold group-hover:text-purple-400 transition-colors break-all">primeforge7@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4 sm:gap-5 p-4 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-800 text-zinc-300 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-zinc-400 font-medium mb-0.5">Agency Studio Location</p>
                  <p className="text-sm sm:text-base md:text-lg text-white font-bold break-words">Dehradun, Uttarakhand, IN</p>
                </div>
              </div>
            </div>
          </GlowCard>
        </FadeLeft>

        {/* Booking CTA */}
        <ScaleIn delay={0.2}>
          <GlowCard glowColor="rgba(37, 99, 235, 0.3)" className="p-8 md:p-12 flex flex-col justify-center h-full">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold w-fit mb-6">
              <Calendar className="w-4 h-4" />
              <span>Strategy Session</span>
            </div>
            
            <h2 className="text-3xl text-white font-bold mb-4">Prefer to schedule?</h2>
            <p className="text-zinc-300 mb-8 text-base leading-relaxed">
              Book a free strategy session at a time that works best for you. We will discuss your goals, timeline, and custom design options.
            </p>
            <Button href="/book-a-call" variant="primary" className="w-full justify-center" icon>
              Open Booking Calendar
            </Button>
            
            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <p className="text-zinc-400 text-xs mb-4">Ready to bypass the call and initiate your build?</p>
              <Button href="/start-a-project" variant="secondary" className="w-full justify-center text-white">
                Submit Project Request
              </Button>
            </div>
          </GlowCard>
        </ScaleIn>
      </div>
    </div>
  );
}

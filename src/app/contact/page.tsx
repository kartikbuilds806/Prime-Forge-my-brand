import React from 'react';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FadeUp, FadeLeft, ScaleIn } from '@/components/animations/AnimateOnScroll';

export const metadata = {
  title: 'Contact Us | PrimeForge — Web Design & SEO Agency',
  description: 'Get in touch with PrimeForge. We are ready to help you build a high-converting website.',
};

export default function ContactPage() {
  return (
    <div className="flex flex-col container py-24">
      <FadeUp>
        <div className="text-center mb-16">
          <h1 className="heading-serif text-5xl md:text-6xl mb-6">
            Let's Start a <span className="text-accent italic">Conversation</span>
          </h1>
          <p className="text-lg md:text-xl text-text-body max-w-2xl mx-auto">
            Whether you need a complete website overhaul or a highly optimized landing page, our team is ready to deliver.
          </p>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Direct Contact Options */}
        <FadeLeft>
          <div className="bg-surface border border-black/10 dark:border-white/10 rounded-[32px] p-8 md:p-12 h-full">
            <h2 className="text-2xl text-text-heading font-serif mb-8">Direct Contact</h2>
          
          <div className="space-y-8">
            <a href="tel:+918533925291" className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center text-text-heading group-hover:bg-accent group-hover:border-accent transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-text-body mb-1">Call us directly</p>
                <p className="text-xl text-text-heading font-medium group-hover:text-accent transition-colors">+91 8533925291</p>
              </div>
            </a>

            <a href="https://wa.me/918533925291" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center text-text-heading group-hover:bg-green-500 group-hover:border-green-500 transition-colors">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-text-body mb-1">Chat on WhatsApp (Fastest)</p>
                <p className="text-xl text-text-heading font-medium group-hover:text-green-500 transition-colors">+91 8533925291</p>
              </div>
            </a>

            <a href="mailto:primeforge7@gmail.com" className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center text-text-heading group-hover:bg-blue-500 group-hover:border-blue-500 transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-text-body mb-1">Email us</p>
                <p className="text-xl text-text-heading font-medium group-hover:text-blue-500 transition-colors">primeforge7@gmail.com</p>
              </div>
            </a>

            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center text-text-heading">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-text-body mb-1">Location</p>
                <p className="text-xl text-text-heading font-medium">Dehradun, Uttarakhand, IN</p>
              </div>
            </div>
            </div>
          </div>
        </FadeLeft>

        {/* Booking CTA */}
        <ScaleIn delay={0.2}>
          <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A8A]/30 border border-blue-900/50 rounded-[32px] p-8 md:p-12 flex flex-col justify-center relative overflow-hidden h-full">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px]"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-3xl text-white font-serif mb-4">Prefer to schedule?</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Book a free strategy session at a time that works best for you. We'll discuss your goals and how we can help you achieve them.
            </p>
            <Button href="/book-a-call" variant="primary" className="w-full" icon>
              Open Booking Calendar
            </Button>
            
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-gray-300 text-sm mb-4">Ready to bypass the call and dive right in?</p>
              <Button href="/start-a-project" variant="secondary" className="w-full !text-white !border-white/20 hover:!bg-white/10 hover:!text-white">
                Submit Project Request
              </Button>
            </div>
          </div>
          </div>
        </ScaleIn>
      </div>
    </div>
  );
}

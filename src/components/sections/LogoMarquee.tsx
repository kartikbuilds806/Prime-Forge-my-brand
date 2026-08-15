'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Sparkles, HeartPulse, ShieldCheck, Compass, Gem, Stethoscope } from 'lucide-react';

interface ClientBrand {
  name: string;
  category: string;
  icon: React.ReactNode;
}

const clientBrands: ClientBrand[] = [
  { name: 'Sterling Luxury Listings', category: 'Luxury Real Estate', icon: <Building2 className="w-5 h-5 text-blue-400" /> },
  { name: 'OnePath SaaS', category: 'Productivity & AI Systems', icon: <Sparkles className="w-5 h-5 text-purple-400" /> },
  { name: 'Protein Coach AI', category: 'AI Fitness Tech', icon: <HeartPulse className="w-5 h-5 text-emerald-400" /> },
  { name: 'Suvarna Jewellers', category: 'High-Ticket D2C Retail', icon: <Gem className="w-5 h-5 text-amber-400" /> },
  { name: 'City Dental Clinic', category: 'Healthcare & Surgery', icon: <Stethoscope className="w-5 h-5 text-cyan-400" /> },
  { name: 'Petcuro Surgery', category: 'Veterinary Emergency', icon: <ShieldCheck className="w-5 h-5 text-green-400" /> },
  { name: 'Smart Choice Tours', category: 'Travel & Expeditions', icon: <Compass className="w-5 h-5 text-rose-400" /> },
];

export function LogoMarquee() {
  const duplicatedBrands = [...clientBrands, ...clientBrands, ...clientBrands];

  return (
    <section className="py-12 relative overflow-hidden border-y border-black/5 dark:border-white/10 bg-transparent">
      <div className="container max-w-6xl mx-auto px-4 mb-6 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-text-body/60">
          Trusted Digital Infrastructure Engineered For Industry Leaders
        </p>
      </div>

      {/* Endless Scrolling Marquee */}
      <div className="relative w-full flex overflow-x-hidden">
        {/* Left & Right Gradient Shadows */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-4 sm:gap-6 px-4 shrink-0"
          animate={{ x: [0, -1920] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 35 }}
        >
          {duplicatedBrands.map((brand, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-blue-500/50 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0 cursor-default group shadow-sm"
            >
              <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 group-hover:scale-110 transition-transform">
                {brand.icon}
              </div>
              <div>
                <div className="text-sm font-bold text-text-heading group-hover:text-blue-500 transition-colors">
                  {brand.name}
                </div>
                <div className="text-[10px] text-text-body font-medium">
                  {brand.category}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

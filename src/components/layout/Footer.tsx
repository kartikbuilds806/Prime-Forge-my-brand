import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/5 pt-16 pb-8 overflow-hidden">
      {/* Premium Footer Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-blue-600/15 blur-[140px] -z-10 pointer-events-none translate-y-1/2"></div>
      <div className="container flex flex-col items-center justify-center text-center">
        <Link href="/" className="flex items-center gap-2 group mb-8">
          <div className="w-8 h-8 bg-white text-primary rounded flex items-center justify-center font-bold text-xl group-hover:bg-accent group-hover:text-white transition-colors">
            P
          </div>
          <span className="font-serif text-xl tracking-wide text-white">PrimeForge</span>
        </Link>
        
        <nav className="flex flex-wrap items-center justify-center gap-6 mb-12">
          {['Services', 'Niches', 'About', 'Contact', 'Start a Project'].map((link) => (
            <Link 
              key={link} 
              href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium text-text-body hover:text-white transition-colors"
            >
              {link}
            </Link>
          ))}
        </nav>

        <p className="text-sm text-text-body/60">
          © 2026 PrimeForge. All rights reserved. Let's build something great.
        </p>
      </div>
    </footer>
  );
}

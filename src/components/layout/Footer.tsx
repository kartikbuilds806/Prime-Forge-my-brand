import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative bg-[#020617] border-t border-white/5 pt-16 pb-8 overflow-hidden z-0">
      {/* Exact Premium Deep Blue Radial Gradient from Image */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_100%,_rgba(37,99,235,0.3)_0%,_rgba(30,64,175,0.15)_40%,_transparent_80%)] -z-10 pointer-events-none"></div>
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

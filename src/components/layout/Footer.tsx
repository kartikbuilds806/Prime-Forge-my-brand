import React from 'react';
import Link from 'next/link';
import { MessageCircle, Phone, Mail, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
    { name: 'X (Twitter)', url: 'https://x.com', icon: '🐦' },
    { name: 'Instagram', url: 'https://instagram.com', icon: '📸' },
    { name: 'YouTube', url: 'https://youtube.com', icon: '▶️' },
    { name: 'GitHub', url: 'https://github.com', icon: '💻' },
  ];

  return (
    <footer className="relative bg-primary border-t border-black/5 dark:border-white/10 pt-16 pb-12 overflow-hidden z-0 transition-colors duration-500">
      {/* Radial Background Accent */}
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_80%_100%,_rgba(37,99,235,0.25)_0%,_rgba(30,64,175,0.1)_40%,_transparent_80%)] -z-10 pointer-events-none" />

      <div className="container max-w-6xl mx-auto px-4">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-black/5 dark:border-white/10">
          
          {/* Column 1: Brand & Mission (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-9 h-9 bg-text-heading text-primary rounded-xl flex items-center justify-center font-extrabold text-xl group-hover:bg-accent group-hover:text-text-heading transition-colors">
                P
              </div>
              <span className="font-serif text-2xl tracking-wide text-text-heading font-bold">PrimeForge</span>
            </Link>
            <p className="text-sm text-text-body leading-relaxed max-w-sm">
              Custom Next.js 16 web applications, autonomous Gemini AI agents, and modern search optimization built for ambitious brands.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Studio Location: Dehradun, Uttarakhand, India</span>
            </div>
          </div>

          {/* Column 2: Direct Contact Channels (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-text-heading/80 mb-2">Direct Contact</div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://wa.me/918630070729"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-text-body hover:text-emerald-400 transition-colors font-medium group"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp: +91 8630070729</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+918533925291"
                  className="flex items-center gap-2.5 text-text-body hover:text-blue-400 transition-colors font-medium group"
                >
                  <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Call: +91 8533925291</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:primeforge7@gmail.com"
                  className="flex items-center gap-2.5 text-text-body hover:text-purple-400 transition-colors font-medium group"
                >
                  <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>primeforge7@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-text-heading/80 mb-2">Navigation</div>
            <ul className="space-y-2 text-sm">
              {['Home', 'Services', 'Projects', 'Track Status', 'About', 'Contact'].map((item) => {
                const path = item === 'Home' ? '/' : item === 'Track Status' ? '/track' : `/${item.toLowerCase().replace(/\s+/g, '-')}`;
                return (
                  <li key={item}>
                    <Link href={path} className="text-text-body hover:text-text-heading transition-colors font-medium">
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Social Channels (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-text-heading/80 mb-2">Follow & Connect</div>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium text-text-body hover:text-accent hover:border-accent transition-all group"
                >
                  <span>{social.icon}</span>
                  <span>{social.name}</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-accent transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Operational Status */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-body/70">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>© {new Date().getFullYear()} PrimeForge Studio. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/start-a-project" className="hover:text-text-heading transition-colors font-semibold">
              Start a Project
            </Link>
            <span>·</span>
            <Link href="/book-a-call" className="hover:text-text-heading transition-colors font-semibold">
              Book Strategy Call
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

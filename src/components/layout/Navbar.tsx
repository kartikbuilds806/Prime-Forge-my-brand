"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [mobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Niches', path: '/niches' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.header 
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileMenuOpen ? 'glass border-b border-black/5 dark:border-black/5 dark:border-white/5 py-4' : 'bg-transparent py-6'}`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group z-50">
          <div className="w-8 h-8 bg-text-heading text-primary rounded flex items-center justify-center font-bold text-xl group-hover:bg-accent group-hover:text-text-heading transition-colors">
            P
          </div>
          <span className="font-serif text-xl tracking-wide text-text-heading">PrimeForge</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path}
              className={`text-sm font-medium transition-colors hover:text-text-heading ${pathname === link.path ? 'text-text-heading border-b-2 border-accent pb-1' : 'text-text-body'}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Button href="/book-a-call" variant="secondary">Book a Call</Button>
          <Button href="/start-a-project" variant="primary">Start a Project</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4 z-50">
          <ThemeToggle />
          <button 
            className="text-text-heading p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-primary/95 backdrop-blur-xl border-b border-black/5 dark:border-white/5 h-screen md:hidden flex flex-col pt-8 pb-24 px-6 overflow-y-auto"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.path}
                  className={`text-2xl font-serif transition-colors ${pathname === link.path ? 'text-accent' : 'text-text-heading hover:text-text-heading/80'}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            
            <div className="flex flex-col gap-4 mt-12">
              <Button href="/book-a-call" variant="secondary" className="w-full justify-center">Book a Call</Button>
              <Button href="/start-a-project" variant="primary" className="w-full justify-center">Start a Project</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

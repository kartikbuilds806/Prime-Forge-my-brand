import React from 'react';
import { Button } from '@/components/ui/Button';
import { FadeUp, ScaleIn, StaggerContainer, StaggerItem } from '@/components/animations/AnimateOnScroll';

export const metadata = {
  title: 'Full Stack Projects | PrimeForge — Web Design & SEO Agency',
  description: 'Real products built from scratch — designed, developed, and deployed. See examples of our custom full-stack solutions.',
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-24 container text-center">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-black/10 dark:border-white/10 mb-6 mx-auto">
            <span className="text-xs font-semibold text-accent tracking-widest uppercase">Our Portfolio</span>
          </div>
          <h1 className="heading-serif text-5xl md:text-6xl mb-6 text-text-heading">
            Full Stack <span className="text-accent italic">Projects</span>
          </h1>
          <p className="text-lg md:text-xl text-text-body max-w-2xl mx-auto">
            Real products built from scratch — designed, developed, and deployed.
          </p>
        </FadeUp>
      </section>

      {/* Projects Grid Section */}
      <section className="pb-24 container">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Protein Coach */}
          <StaggerItem
            className="bg-surface border border-black/10 dark:border-white/10 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative"
            whileHover={{ y: -6, scale: 1.02, borderColor: "rgba(59,130,246,0.5)" }}
          >
            <div>
              {/* Status Badge */}
              <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-text-heading/85">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span>Live</span>
              </div>

              <span className="text-xs font-bold text-accent tracking-wider uppercase block mb-2">
                AI-Powered Web App
              </span>
              
              <h3 className="text-text-heading text-2xl font-serif mb-4 pr-16">
                Protein Coach
              </h3>
              
              <p className="text-text-body text-sm leading-relaxed mb-6">
                A full-stack nutrition tracking app where users input meals and get AI-generated protein breakdowns and daily coaching feedback. Built with Next.js, Supabase, and OpenAI API.
              </p>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["Next.js", "Supabase", "OpenAI", "Tailwind CSS"].map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-text-body font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto">
              <Button href="#" variant="secondary" className="w-full justify-center text-center">
                View Project
              </Button>
            </div>
          </StaggerItem>

          {/* Portfolio & Agency Sites */}
          <StaggerItem
            className="bg-surface border border-black/10 dark:border-white/10 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative"
            whileHover={{ y: -6, scale: 1.02, borderColor: "rgba(59,130,246,0.5)" }}
          >
            <div>
              {/* Status Badge */}
              <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-text-heading/85">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Delivered</span>
              </div>

              <span className="text-xs font-bold text-accent tracking-wider uppercase block mb-2">
                Client Projects
              </span>
              
              <h3 className="text-text-heading text-2xl font-serif mb-4 pr-24">
                Portfolio & Agency Sites
              </h3>
              
              <p className="text-text-body text-sm leading-relaxed mb-6">
                Designed and developed multiple full-stack portfolio and agency websites for clients across different niches — each with custom CMS, contact forms, Supabase backends, and full SEO/AEO setup.
              </p>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["Next.js", "Sanity CMS", "Supabase", "Vercel"].map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-text-body font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto">
              <Button href="#" variant="secondary" className="w-full justify-center text-center">
                View Projects
              </Button>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-black/5 dark:border-white/5 bg-surface/30">
        <ScaleIn>
          <div className="container text-center">
            <h2 className="heading-serif text-3xl md:text-4xl mb-6 text-text-heading">Have a custom project idea?</h2>
            <p className="text-text-body text-lg mb-8 max-w-xl mx-auto">
              We specialize in custom web apps, integrations, and high-converting platforms tailored to your business needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/start-a-project" variant="primary" icon>Start Your Project</Button>
              <Button href="/book-a-call" variant="secondary">Book a Call</Button>
            </div>
          </div>
        </ScaleIn>
      </section>
    </div>
  );
}

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FadeUp, ScaleIn, StaggerContainer, StaggerItem } from '@/components/animations/AnimateOnScroll';
import { PricingSection } from '@/components/sections/PricingSection';

export const metadata = {
  title: 'Our Projects, Niches & Pricing | PrimeForge — Web Design & SEO Agency',
  description: 'View our custom full-stack solutions, ready-to-deploy local business demo niches, and transparent pricing packages in one unified showcase.',
};

export default function ProjectsPage() {
  const niches = [
    {
      title: "Real Estate",
      desc: "Property listings, lead generation, and location maps.",
      demos: [
        { name: "AGS Realtors", link: "#" },
        { name: "Tandon Realtors", link: "#" },
        { name: "Ruddy PI Estate", link: "#" },
      ]
    },
    {
      title: "Dental Clinics",
      desc: "Appointment booking, service showcase, trust-building UI.",
      demos: [
        { name: "Elite Dental Care", link: "#" },
        { name: "The City Clinic", link: "#" },
        { name: "V-Care Clinic", link: "#" },
      ]
    },
    {
      title: "Jewellery Shops",
      desc: "Product showcase, premium UI, catalog layout.",
      demos: [
        { name: "Suvarna Jeweller", link: "#" },
      ]
    },
    {
      title: "Pet Clinics",
      desc: "Appointment booking, service details, clean UI.",
      demos: [
        { name: "Petcuro Surgery", link: "#" },
      ]
    },
    {
      title: "Salons & Makeover",
      desc: "Service pricing, booking system, image gallery.",
      demos: [
        { name: "Stylish Mahi Unisex", link: "#" },
        { name: "Cloud 9 Salon", link: "#" },
        { name: "Ridhi Makeover", link: "#" },
      ]
    },
    {
      title: "Restaurants & Cafes",
      desc: "Menu display, table booking, food gallery.",
      demos: [
        { name: "Zaika Cafe", link: "#" },
        { name: "Crown Restaurant", link: "#" },
        { name: "Zaika Vercel", link: "#" },
      ]
    },
    {
      title: "Travellers / Tours",
      desc: "Tour packages, booking forms, destination showcase.",
      demos: [
        { name: "Smart Choice Travels", link: "#" },
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Combined Hero Section */}
      <section className="py-24 container text-center">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-black/10 dark:border-white/10 mb-6 mx-auto">
            <span className="text-xs font-semibold text-accent tracking-widest uppercase">Our Capabilities</span>
          </div>
          <h1 className="heading-serif text-5xl md:text-7xl mb-6 text-text-heading">
            Projects, Niches & <span className="text-accent italic">Pricing</span>
          </h1>
          <p className="text-lg md:text-xl text-text-body max-w-3xl mx-auto leading-relaxed">
            See examples of our custom full-stack solutions, browse our ready-to-deploy local business demo niches, and select a pricing package that fits your goals.
          </p>
        </FadeUp>
      </section>

      {/* Section 1: Custom Full-Stack Projects */}
      <section className="py-16 border-t border-black/5 dark:border-white/5 bg-surface/10">
        <div className="container">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="heading-serif text-3xl md:text-4xl text-text-heading mb-4">Custom Full-Stack Apps</h2>
              <p className="text-text-body text-sm max-w-xl mx-auto">
                Bespoke applications engineered with Next.js, database backends, and integrations.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="flex overflow-x-auto pb-6 gap-6 snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-x-visible md:pb-0 max-w-5xl mx-auto w-full">
            {/* Protein Coach */}
            <StaggerItem
              className="glass-card p-8 flex flex-col justify-between relative w-[85vw] max-w-[350px] shrink-0 snap-start md:w-auto md:max-w-none md:shrink"
              whileHover={{ y: -6, scale: 1.02, borderColor: "rgba(59,130,246,0.5)" }}
            >
              <div>
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
              className="glass-card p-8 flex flex-col justify-between relative w-[85vw] max-w-[350px] shrink-0 snap-start md:w-auto md:max-w-none md:shrink"
              whileHover={{ y: -6, scale: 1.02, borderColor: "rgba(59,130,246,0.5)" }}
            >
              <div>
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
        </div>
      </section>

      {/* Section 2: Industry Demo Sites (Niches) */}
      <section className="py-24 border-t border-black/5 dark:border-white/5">
        <div className="container">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="heading-serif text-3xl md:text-4xl mb-4 text-text-heading">
                Industry-Specific Demos
              </h2>
              <p className="text-text-body text-sm max-w-xl mx-auto">
                Ready-to-deploy structures optimized to convert clients for specific local business categories.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="flex overflow-x-auto pb-6 gap-6 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-x-visible md:pb-0 w-full">
            {niches.map((niche, i) => (
              <StaggerItem 
                key={i} 
                className="glass-card p-8 flex flex-col h-full transition-all w-[85vw] max-w-[350px] shrink-0 snap-start md:w-auto md:max-w-none md:shrink"
                whileHover={{ y: -6, scale: 1.02, borderColor: "rgba(59,130,246,0.5)" }}
              >
                <h3 className="text-text-heading text-2xl font-serif mb-3">{niche.title}</h3>
                <p className="text-text-body mb-6 flex-grow">{niche.desc}</p>
                
                <div className="pt-6 border-t border-black/10 dark:border-white/10">
                  <p className="text-xs font-bold tracking-wider text-text-heading/50 uppercase mb-3">Live Demos:</p>
                  <ul className="space-y-3">
                    {niche.demos.map((demo, j) => (
                      <li key={j}>
                        <a href={demo.link} className="inline-flex items-center gap-2 text-accent hover:text-text-heading transition-colors group">
                          <span className="font-medium text-xs">{demo.name}</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Section 3: Transparent Pricing & Addons */}
      <section className="border-t border-black/5 dark:border-white/5">
        <PricingSection />
      </section>

      {/* Final Action CTA */}
      <section className="py-24 border-t border-black/5 dark:border-white/5 bg-surface/30">
        <ScaleIn>
          <div className="container text-center">
            <h2 className="heading-serif text-3xl md:text-4xl mb-6 text-text-heading">Have a custom project idea?</h2>
            <p className="text-text-body text-lg mb-8 max-w-xl mx-auto">
              We specialize in custom web apps, custom API integrations, and high-converting portals tailored to your business operations.
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

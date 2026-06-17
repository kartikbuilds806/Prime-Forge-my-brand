import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FadeUp, ScaleIn, StaggerContainer, StaggerItem } from '@/components/animations/AnimateOnScroll';

export const metadata = {
  title: 'Niches & Portfolio | PrimeForge — Web Design & SEO Agency',
  description: 'Industry-Specific Demo Sites. Real examples showing exactly what you\'ll get based on your business type.',
};

export default function NichesPage() {
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
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-24 container text-center">
        <FadeUp>
          <h1 className="heading-serif text-5xl md:text-6xl mb-6">
            Industry-Specific <span className="text-accent italic">Demo Sites</span>
          </h1>
          <p className="text-lg md:text-xl text-text-body max-w-2xl mx-auto">
            Real examples showing exactly what you'll get based on your business type.
          </p>
        </FadeUp>
      </section>

      {/* Niches Grid */}
      <section className="pb-24 container">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {niches.map((niche, i) => (
            <StaggerItem 
              key={i} 
              className="bg-surface border border-white/10 rounded-2xl p-8 flex flex-col h-full transition-colors"
              whileHover={{ y: -6, scale: 1.02, borderColor: "rgba(59,130,246,0.5)" }}
            >
              <h3 className="text-white text-2xl font-serif mb-3">{niche.title}</h3>
              <p className="text-text-body mb-6 flex-grow">{niche.desc}</p>
              
              <div className="pt-6 border-t border-white/10">
                <p className="text-xs font-bold tracking-wider text-white/50 uppercase mb-3">Demos:</p>
                <ul className="space-y-3">
                  {niche.demos.map((demo, j) => (
                    <li key={j}>
                      <a href={demo.link} className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors group">
                        <span className="font-medium">{demo.name}</span>
                        <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-white/5 bg-surface/30">
        <ScaleIn>
          <div className="container text-center">
            <h2 className="heading-serif text-3xl md:text-4xl mb-6 text-white">Don't see your niche?</h2>
            <p className="text-text-body text-lg mb-8 max-w-xl mx-auto">
              We build high-converting websites for any local business. Book a call to discuss your specific industry requirements.
            </p>
            <Button href="/book-a-call" variant="primary">Book a Free Call</Button>
          </div>
        </ScaleIn>
      </section>
    </div>
  );
}

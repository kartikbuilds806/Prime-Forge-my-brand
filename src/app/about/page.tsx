import React from 'react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { FadeUp, ScaleIn } from '@/components/animations/AnimateOnScroll';

export const metadata = {
  title: 'About Us | PrimeForge — Web Design & SEO Agency',
  description: 'Founded on the principles of coding excellence and complete transparency. We engineer digital experiences that completely dominate SEO and turn traffic into booked revenue.',
};

export default function AboutPage() {
  const coreValues = [
    { title: "Performance First", desc: "Lightning-fast load times for maximum conversion." },
    { title: "Conversion Focused", desc: "Every element is designed to turn visitors into leads." },
    { title: "Total Transparency", desc: "No hidden fees. You see the demo before paying." },
    { title: "Premium Quality", desc: "We write clean, modern code that outranks competitors." }
  ];

  return (
    <div className="container py-24 md:py-32">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-20">
        <div className="max-w-2xl">
          <FadeUp>
            <h4 className="text-accent text-sm font-bold tracking-widest uppercase mb-4">Our Mission</h4>
            <h1 className="heading-serif text-5xl md:text-6xl text-white mb-6">The PrimeForge Story.</h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-text-body text-xl leading-relaxed">
              Founded by Kartik Sharma, PrimeForge was built on a simple realization: local businesses were being overcharged by agencies for slow, bloated template websites that failed to generate actual clients. We decided to do things differently, engineering digital experiences that completely dominate SEO and turn traffic into booked revenue.
            </p>
          </FadeUp>
        </div>
        <FadeUp delay={0.3} className="shrink-0 mt-2 md:mt-0">
          <Button href="/start-a-project" variant="primary">Hire now</Button>
        </FadeUp>
      </div>

      {/* Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left Column - List */}
        <div className="flex flex-col">
          {coreValues.map((value, idx) => (
            <FadeUp key={idx} delay={idx * 0.1}>
              <div className="py-8 border-b border-white/10 first:pt-0">
                <h3 className="heading-serif text-3xl text-white mb-3">{value.title}.</h3>
                <p className="text-text-body text-lg">{value.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Right Column - Image */}
        <ScaleIn>
          <div className="relative rounded-[32px] overflow-hidden min-h-[400px] lg:min-h-full border border-white/10">
            <Image 
              src="/about-working.png" 
              alt="Professional working at PrimeForge" 
              fill
              className="object-cover"
            />
          </div>
        </ScaleIn>
      </div>
    </div>
  );
}

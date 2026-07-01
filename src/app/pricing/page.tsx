import React from 'react';
import { PricingSection } from '@/components/sections/PricingSection';

export const metadata = {
  title: 'Pricing | PrimeForge — Web Design & SEO Agency',
  description: 'Simple, transparent, outcome-focused website packages and AI automation addon services tailored for growing small and medium-sized businesses.',
};

export default function PricingPage() {
  return (
    <div className="flex flex-col pt-12 md:pt-20">
      <PricingSection />
    </div>
  );
}

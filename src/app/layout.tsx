import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrimeForge — Web Design & SEO Agency",
  description: "Custom web design, SEO, AEO, GEO, AI chatbots and automations for local businesses.",
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingCTAs } from "@/components/ui/FloatingCTAs";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { PageTransition } from "@/components/animations/PageTransition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "PrimeForge",
              "description":
                "Custom web design, SEO, AEO, GEO, AI chatbots and automations for local businesses.",
              "founder": { "@type": "Person", "name": "Kartik Sharma" },
              "telephone": "+918533925291",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Dehradun",
                "addressRegion": "Uttarakhand",
                "addressCountry": "IN",
              },
              "url": "https://primeforge.agency",
              "sameAs": [],
              "priceRange": "$$",
              "openingHours": "Mo-Fr 09:00-18:00",
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#0A0A0A] text-[#A1A1AA] pt-[88px] flex flex-col min-h-screen`}
      >
        <ScrollProgress />
        <Navbar />
        <main className="flex-grow">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
        <FloatingCTAs />
      </body>
    </html>
  );
}

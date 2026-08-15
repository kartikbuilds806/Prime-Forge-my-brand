import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "PrimeForge — Web Design & SEO Agency",
  description: "Custom web design, SEO, AEO, GEO, AI chatbots and automations for local businesses.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chatbot/ChatWidget";
import { MobileBottomDock } from "@/components/layout/MobileBottomDock";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { PageTransition } from "@/components/animations/PageTransition";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "ProfessionalService",
                  "@id": "https://primeforge.agency/#organization",
                  "name": "PrimeForge",
                  "description": "Custom Next.js 16 web development studio, AI Agents, AEO, GEO, and automated workflow solutions.",
                  "url": "https://primeforge.agency",
                  "founder": {
                    "@type": "Person",
                    "name": "Kartik Sharma",
                    "jobTitle": "Lead Full-Stack Architect & Founder"
                  },
                  "telephone": "+918533925291",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Dehradun",
                    "addressRegion": "Uttarakhand",
                    "addressCountry": "IN"
                  },
                  "priceRange": "$$",
                  "knowsAbout": [
                    "Next.js 16 Development",
                    "React 19",
                    "Generative Engine Optimization (GEO)",
                    "Answer Engine Optimization (AEO)",
                    "Google Gemini API RAG Architecture",
                    "Supabase Vector Store",
                    "AI Agents & Automation"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://primeforge.agency/#website",
                  "url": "https://primeforge.agency",
                  "name": "PrimeForge Digital Studio",
                  "publisher": {
                    "@id": "https://primeforge.agency/#organization"
                  }
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "OnePath Productivity SaaS",
                  "operatingSystem": "Web",
                  "applicationCategory": "ProductivityApplication",
                  "url": "https://one-path-saas.vercel.app/",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                  }
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "Are PrimeForge websites custom coded or template based?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Every site built by PrimeForge is 100% custom coded with Next.js 16 and React 19. We do not use WordPress or Elementor templates."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What is GEO and AEO optimization?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "AEO (Answer Engine Optimization) structures your website for Siri and Perplexity AI voice queries. GEO (Generative Engine Optimization) ensures your business gets cited inside ChatGPT, Claude, and Google Gemini search results."
                      }
                    }
                  ]
                }
              ]
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-primary text-text-body flex flex-col min-h-screen`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LenisProvider>
            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            <main className="flex-grow">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer />
            <ChatWidget />
            <MobileBottomDock />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

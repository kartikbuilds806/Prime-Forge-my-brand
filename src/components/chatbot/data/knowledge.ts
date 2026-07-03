/**
 * PrimeForge Static Knowledge Base (Phase 1)
 * Purpose: Decoupled business facts for the AI context.
 * Limitation: Placed in-memory. Phase 2 will swap/augment this with vector search (RAG) if the corpus grows.
 */

export interface Service {
  name: string;
  description: string;
  whatsIncluded: string[];
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
}

export interface Addon {
  name: string;
  price: string;
  description: string;
}

export interface Niche {
  industry: string;
  exampleClients: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ContactInfo {
  whatsapp: string;
  phone: string;
  bookCallUrl: string;
  startProjectUrl: string;
}

export interface PrimeForgeKnowledge {
  services: Service[];
  pricingTiers: PricingTier[];
  addons: Addon[];
  niches: Niche[];
  process: string[];
  faq: FAQ[];
  contact: ContactInfo;
}

export const knowledge: PrimeForgeKnowledge = {
  services: [
    {
      name: "Business Website Development",
      description: "Custom-coded, high-performance business websites tailored for conversion and clean aesthetics.",
      whatsIncluded: ["100% custom codebase", "Responsive design", "AEO/SEO optimized", "Fast loading times"]
    },
    {
      name: "High-Converting Landing Pages",
      description: "Single-page campaign sites focused on getting visitors to take a single high-value action.",
      whatsIncluded: ["Conversion-optimized UI", "Fast speed", "Lead capture forms", "Analytics integration"]
    },
    {
      name: "Booking System Integration",
      description: "Automated scheduling system directly embedded on your site to schedule client calls instantly.",
      whatsIncluded: ["Cal.com/Calendly embedding", "Zero scheduling headaches", "Automated email confirmations"]
    },
    {
      name: "SEO / AEO / GEO Optimization",
      description: "Search Engine, Answer Engine (ChatGPT/Perplexity), and Generative Engine Optimization.",
      whatsIncluded: ["Schema markup coding", "Technical page speed indexing", "AI engine recommendation audit"]
    },
    {
      name: "AI Chatbots & Voice Agents",
      description: "Intelligent chatbot systems and voice lead qualifiers trained on business data.",
      whatsIncluded: ["Lead-qualification pipelines", "24/7 client query answering", "Custom AI backend actions"]
    },
    {
      name: "Maintenance & Support",
      description: "Ongoing support, security audit, page speed updates, and content additions.",
      whatsIncluded: ["Zero tech headaches", "Performance monitoring", "Fast revision cycles"]
    }
  ],
  pricingTiers: [
    {
      name: "Starter Package",
      price: "$100",
      description: "Essential premium layout for small businesses wanting a solid, fast digital presence.",
      features: [
        "1 Custom-designed page",
        "Fully responsive layout",
        "Standard SEO setup",
        "Free demo before paying",
        "Fast 2-5 days delivery"
      ]
    },
    {
      name: "Popular Package",
      price: "$200",
      description: "Comprehensive multi-page custom build ideal for growing local brands and service businesses.",
      features: [
        "Up to 5 Custom pages",
        "Advanced SEO & Schema structure",
        "Booking calendar integration",
        "Free demo before paying",
        "2-5 Days delivery"
      ]
    },
    {
      name: "Advanced Package",
      price: "$400",
      description: "Bespoke full-stack web application with databases, dashboard modules, or specialized logic.",
      features: [
        "Unlimited custom pages",
        "Custom database & dashboard features",
        "AI Chatbot integrations",
        "Premium support & edits",
        "2-5 Days delivery"
      ]
    }
  ],
  addons: [
    {
      name: "WhatsApp Chatbot",
      price: "$50 / addon",
      description: "Automated client communication directly on WhatsApp."
    },
    {
      name: "Website Chatbot Integration",
      price: "$50 / addon",
      description: "Intelligent AI assistant directly embedded on your website."
    },
    {
      name: "Voice Agent",
      price: "$100 / addon",
      description: "AI-powered voice assistant for customer support and lead qualification."
    },
    {
      name: "AI Automation",
      price: "$150 / addon",
      description: "Automate repetitive business workflows and save hours of manual operations."
    },
    {
      name: "Custom Business AI Agent",
      price: "$200 / addon",
      description: "Personalized AI system tailored specifically for your operational workflows."
    }
  ],
  niches: [
    {
      industry: "Real Estate",
      exampleClients: ["Elite Home Sales", "Modern Living Rentals"]
    },
    {
      industry: "Medical & Dental",
      exampleClients: ["Apex Dental Care", "Vibrant Health Clinic"]
    },
    {
      industry: "Local Services",
      exampleClients: ["Precision Plumbing", "Superior Roofers", "Elite Cleaning Services"]
    },
    {
      industry: "Fitness & Personal Training",
      exampleClients: ["Peak Athletics", "Ironclad Fitness Studio"]
    },
    {
      industry: "E-commerce & Retail",
      exampleClients: ["Curated Shop", "Sleek Apparel"]
    },
    {
      industry: "SaaS & Startup",
      exampleClients: ["SaaSFlow AI", "Priime Analytics"]
    }
  ],
  process: [
    "1. Contact: You reach out with your requirements and ideas.",
    "2. Free Demo: We build a working homepage prototype within 48 hours for you to test.",
    "3. Design Review: You review the live prototype and request edits.",
    "4. Payment: You pay only after approving the design and build prototype.",
    "5. Delivery: We deliver and launch the final custom site on your domain."
  ],
  faq: [
    {
      question: "Why custom code instead of WordPress, Elementor, or Wix?",
      answer: "WordPress and Elementor sites are bloated, slow, and hard to secure. Custom React/Next.js code is lightning-fast (which dramatically improves conversion rates and Google SEO rankings), clean, and won't get hacked."
    },
    {
      question: "How does the 'Free Demo' work?",
      answer: "We do not ask for any upfront deposits. You explain what you need, we build a fully working homepage demo on a preview URL within 24-48 hours. If you love it, we proceed. If not, you walk away paying absolutely zero."
    },
    {
      question: "What is your typical delivery timeline?",
      answer: "Most custom websites and landing pages are fully developed, optimized, and launched in just 2 to 5 days."
    },
    {
      question: "Who owns the website and code after launch?",
      answer: "You own 100% of the custom code and files. There are no vendor lock-ins or monthly fees."
    }
  ],
  contact: {
    whatsapp: "https://wa.me/918533925291",
    phone: "tel:+918533925291",
    bookCallUrl: "/book-a-call",
    startProjectUrl: "/start-a-project"
  }
};

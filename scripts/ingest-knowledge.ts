/**
 * Ingestion Script (Phase 2 RAG)
 * Purpose: Embeds sanitized background context chunks and upserts them into Supabase.
 * Exclusions: Filters out developer contact info, Botpress, and AI behavior instructions.
 * Connection: Bypasses RLS by using SUPABASE_SERVICE_ROLE_KEY.
 * Execution: run via `npx tsx scripts/ingest-knowledge.ts`
 */

import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// 1. Manually parse .env.local variables to avoid dependency creep
try {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envLines = fs.readFileSync(envPath, 'utf8').split('\n');
    envLines.forEach(line => {
      const match = line.trim().match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^['"]|['"]$/g, ''); // strip optional quotes
        process.env[key] = value;
      }
    });
    console.log("Loaded variables from .env.local successfully.");
  } else {
    console.warn("Warning: .env.local not found at project root.");
  }
} catch (e) {
  console.error("Failed to parse .env.local:", e);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const geminiApiKey = process.env.GEMINI_API_KEY;

if (!supabaseUrl || !serviceRoleKey || !geminiApiKey) {
  console.error("Error: Missing credentials in environment. Ensure NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and GEMINI_API_KEY are configured.");
  process.exit(1);
}

// 2. Initialize Supabase client with service_role to bypass RLS checks
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
});

// 3. Structured Sanitized Chunks (Strictly excluding RLS rules, bot guards, and Botpress tech references)
interface IngestChunk {
  content: string;
  source: string;
  section: string;
}

const chunks: IngestChunk[] = [
  // --- RESUME PROJECT CHUNKS ---
  {
    source: "resume",
    section: "Protein Coach Project",
    content: "Protein Coach is a custom full-stack web application developed by Kartik Sharma. It features a custom nutrition tracker that lets users log their meals and receive real-time AI-generated protein analytics and coaching tips. Built with Next.js (App Router), Supabase (Auth, Database), OpenAI API, and Tailwind CSS."
  },
  {
    source: "resume",
    section: "PrimeForge Platform",
    content: "The PrimeForge developer workspace includes a live tracking system at `/track` where clients monitor project timeline updates by entering their email address. It is connected to a passcode-gated admin control panel at `/admin` that updates status states in Supabase. Developed with Next.js, Tailwind CSS v4, and Upstash Redis rate-limiting."
  },
  {
    source: "resume",
    section: "Smart Choice Tours & Client Sites",
    content: "Smart Choice Tours is a premium booking and search-optimized client site built by Kartik. It features Cal.com calendar integrations, responsive card grids, technical schema markup, and speed audits scoring over 95/100 on Google PageSpeed Insights. Built with Next.js, Sanity CMS, and Vercel hosting."
  },
  {
    source: "resume",
    section: "Kartik Sharma Technical Skills",
    content: "Kartik Sharma is the lead developer of PrimeForge. Technical skills include full-stack React and Next.js (App Router, Server Actions, Route Handlers), TypeScript, Tailwind CSS, SQL databases (Supabase, Postgres, pgvector), Serverless APIs, Upstash Redis caching, Resend email systems, and building custom business AI chatbots and voice qualifiers."
  },

  // --- ROADMAP PROCESS CHUNKS ---
  {
    source: "process-guide",
    section: "Phase 1 — Intake & Strategy",
    content: "Phase 1: Intake & Strategy. We align on business objectives, target audience, and required integrations (e.g. booking calendars, WhatsApp flows). We configure the Git workspace, initialized codebase repository, and compile strategy blueprints. Zero upfront payment is required."
  },
  {
    source: "process-guide",
    section: "Phase 2 — Interactive Mockup",
    content: "Phase 2: Interactive Mockup. Within 48 hours of intake, we develop a live homepage mockup prototype on a staging URL. The client interacts with the live layout to review typography, transitions, and copy. Edits are processed until 100% satisfied. Payment is requested only after design approval."
  },
  {
    source: "process-guide",
    section: "Phase 3 — Core Engineering",
    content: "Phase 3: Core Engineering. We code all layout pages using high-performance custom Next.js code. We build Supabase tables, set up secure backend routes, write form handlers, and implement custom AI chatbot features. Desktop layouts and mobile swiping optimizations are verified."
  },
  {
    source: "process-guide",
    section: "Phase 4 — SEO & Speed Audits",
    content: "Phase 4: SEO, AEO, GEO & Speed Audits. We optimize all pages to score above 95/100 on audits. We insert JSON-LD schema structures, write microdata markups, and configure rate-limit security. This ensures Google and AI answer engines (ChatGPT, Gemini, Perplexity) easily index and recommend your business."
  },
  {
    source: "process-guide",
    section: "Phase 5 — Delivery & Handover",
    content: "Phase 5: Delivery & Launch. We link your custom domain, deploy production builds to Vercel hosting, perform site handovers, and transfer 100% ownership of code files to the client."
  },

  // --- STRATEGY GUIDE CHUNKS ---
  {
    source: "strategy-guide",
    section: "Discovery Session Objectives",
    content: "Our discovery calls cover three crucial items: 1. Deep understanding of the client's business model and target customer. 2. Definition of the website's key conversion goals (e.g., booking calls, capturing leads, click-to-call links). 3. Alignment on core features (automated calendars, WhatsApp bots, database dashboards). We focus on building digital assets that convert traffic into booked revenue."
  }
];

// 4. Generate Embeddings & Upsert to Supabase
async function getEmbedding(text: string): Promise<number[]> {
  const model = "models/text-embedding-004";
  const url = `https://generativelanguage.googleapis.com/v1beta/${model}:embedContent?key=${geminiApiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: { parts: [{ text }] },
      taskType: "RETRIEVAL_DOCUMENT"
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Embedding request failed: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  return data.embedding.values;
}

async function runIngestion() {
  console.log(`Starting knowledge base ingestion. Total chunks to process: ${chunks.length}`);

  try {
    // A: Clear the table first to avoid duplicate chunks on reruns (safe at this data volume)
    console.log("Clearing existing records in knowledge_chunks table...");
    const { error: deleteError } = await supabase
      .from('knowledge_chunks')
      .delete()
      .neq('id', 0); // deletes all rows

    if (deleteError) {
      console.warn("Delete warning (table might be empty or missing):", deleteError.message);
    }

    // B: Embed and insert each chunk
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      console.log(`[${i + 1}/${chunks.length}] Embedding chunk: "${chunk.section}"...`);
      
      const embedding = await getEmbedding(chunk.content);

      const { error: insertError } = await supabase
        .from('knowledge_chunks')
        .insert({
          content: chunk.content,
          source: chunk.source,
          section: chunk.section,
          embedding
        });

      if (insertError) {
        throw new Error(`Failed to insert chunk: ${insertError.message}`);
      }
    }

    console.log("🎉 Success! Knowledge base ingestion completed successfully.");
    process.exit(0);

  } catch (error) {
    console.error("❌ Ingestion script failed:", error);
    process.exit(1);
  }
}

runIngestion();

/**
 * Chatbot API Endpoint (Phase 2)
 * Purpose: Streams completions from Google Gemini API using SSE fetch stream-parsing.
 * Rate limiting: Checked per-IP via Upstash Redis.
 * Models: Calls gemini-2.5-flash-lite with fallback to gemini-2.5-flash.
 * Status checks: Dynamically queries client_requests using trackProjectAction.
 * RAG database: Embeds user queries using text-embedding-004 and retrieves similarity chunks via Supabase match_knowledge_chunks.
 */

import { chatRatelimit } from '@/lib/chat-rate-limit';
import { knowledge } from '@/components/chatbot/data/knowledge';
import { trackProjectAction } from '@/app/actions/trackProject';
import { getEmbedding } from '@/lib/gemini-embeddings';
import { createClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';

export const runtime = 'nodejs';

// Initialize Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const systemInstructionText = `
You are the AI Chat Assistant representing PrimeForge, a premium custom web design and SEO agency.
Answer client questions confidently using ONLY the facts provided in the knowledge base below.
Do not make up facts, timelines, or features not listed. If asked about something out of scope, politely redirect them back to PrimeForge's web design, SEO, and AI automation topics, phrasing the redirection in the user's current language.

CRITICAL PRICING RULE: We do NOT publish or quote flat-rate prices or specific dollar amounts. Never state any pricing figures (e.g. do NOT say $100, $200, $400, etc.) under any circumstances, even if asked directly or repeatedly. If the user asks about cost or pricing, explain our Pricing Policy approach (custom quotes based on client goals) and redirect them to Book a Call (/book-a-call), WhatsApp (https://wa.me/918630070729), or Start a Project (/start-a-project), ensuring the redirection matches the user's current language register.

Keep your tone direct, outcome-focused, warm, and confident (plain-spoken, not corporate-stiff). Use "we", "our", and "PrimeForge" to refer to the studio.
When appropriate (e.g. if the user asks about starting, pricing, features, or timeline), politely suggest booking a call or starting a project in their language.

KNOWLEDGE BASE:
${JSON.stringify(knowledge, null, 2)}
`;

export async function POST(req: Request) {
  // 1. Rate Limiting Check
  if (chatRatelimit) {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "127.0.0.1";
    try {
      const { success, limit, remaining, reset } = await chatRatelimit.limit(ip);
      if (!success) {
        return new Response(JSON.stringify({ error: "Too many messages. Please wait a minute and try again." }), {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          }
        });
      }
    } catch (e) {
      console.error("Rate limiter error:", e);
    }
  }

  // 2. Parse payload
  let messages: any[] = [];
  try {
    const body = await req.json();
    messages = body.messages || [];
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
  }

  if (!messages || messages.length === 0) {
    return new Response(JSON.stringify({ error: "Messages array is required" }), { status: 400 });
  }

  const lastUserMessage = messages[messages.length - 1]?.content || "";

  // Dynamic language detection
  const hinglishKeywords = /\b(kya|aap|hai|hain|ho|ko|se|btao|mujh|mujhe|bhai|mausam|kaisa|kab|tak|toh|na|aur|bhi|krte|karte|kar|kr|ke|ki|tha|thi|hu|hoon|yaar|gaya|gaye|rha|raha|krna|karna|shuru|liye|bata|batao|karta|karte)\b/i;
  const isHinglish = hinglishKeywords.test(lastUserMessage);

  const languageInstruction = isHinglish 
    ? `
CRITICAL LANGUAGE DIRECTIVE:
- The user is speaking in Hinglish (Hindi-English mix in Roman script).
- You MUST respond strictly in natural, conversational Hinglish (Roman script, tech-founder style). Do NOT respond in pure English or pure Hindi.
- Translate any English facts from the KNOWLEDGE BASE or from the Relevant Background Context (retrieved vector/RAG chunks) into natural Hinglish. For example, instead of saying "We offer premium custom web design" in English, say "Hum premium custom web design aur SEO services offer karte hain".
- Keep technical English words (like "custom website", "web design", "SEO", "landing page", "Google PageSpeed", "WhatsApp", etc.) in English, but write the surrounding grammar in Romanized Hindi.
- Every single sentence of your response must be in Hinglish. Do not leak English grammar or sentences.
`
    : `
CRITICAL LANGUAGE DIRECTIVE:
- The user is speaking in English.
- You MUST respond strictly in 100% pure, premium, professional English.
- Do NOT use any Hinglish or Hindi words under any circumstances (do NOT use words like "Bhai", "Hum", "hai", "yaar", etc.).
- Every single sentence of your response must be in English.
`;

  // 3. Dynamic Status Check Integration (Task 1)
  const isStatusQuery = /status|track|progress|update|how\s+far|milestone/i.test(lastUserMessage);
  let statusContext = "";

  if (isStatusQuery) {
    // Scan history backwards to extract a client email
    let clientEmail = "";
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
    
    for (let i = messages.length - 1; i >= 0; i--) {
      const match = messages[i].content.match(emailRegex);
      if (match) {
        clientEmail = match[0];
        break;
      }
    }

    if (clientEmail) {
      console.log("Chatbot performing dynamic status lookup for:", clientEmail);
      const trackingResult = await trackProjectAction(clientEmail);
      
      if (trackingResult.success && trackingResult.data) {
        const data = trackingResult.data;
        const currentStepName = data.steps?.[data.currentStepIndex]?.name || "Intake";
        const currentStepDesc = data.steps?.[data.currentStepIndex]?.description || "";
        const latestLog = data.logs && data.logs.length > 0 ? data.logs[0].message : "Workspace setup.";
        
        statusContext = `
## Client Project Status (Verified Database Record)
A project was found associated with email "${clientEmail}":
- Client Name: ${data.request.full_name}
- Business Name: ${data.request.business_name || "N/A"}
- Service Category: ${data.request.service_needed}
- Project Progress: ${data.progressPercent}% Complete
- Active Step: "${currentStepName}" (${currentStepDesc})
- Latest Developer Status Log: "${latestLog}"
- Live Staging link: ${data.stagingUrl || "Not deployed yet"}
- Figma Mockup link: ${data.mockupUrl || "Not created yet"}

Explain these details conversationally to the client. You MUST write this explanation strictly in the active language of the user's query (e.g., if they asked in English, explain in 100% pure English; if they asked in Hinglish, explain in Hinglish). Highlight the completion percentage and the latest developer log. If a staging/mockup link is listed, provide it.
`;
      } else {
        statusContext = `
## Client Project Status (Not Found)
The client requested progress for email "${clientEmail}", but no record exists in our system. Inform them politely that no request was found under "${clientEmail}" and suggest they check the spelling or start a new project intake. You MUST write this response strictly in the active language of the user's query (e.g., in English if they asked in English; in Hinglish if they asked in Hinglish).
`;
      }
    } else {
      statusContext = `
## Client Project Status (Missing Email)
The client is asking about project tracking, milestones, or progress, but has not provided their email yet. Politely ask them to state the email address associated with their request so we can check their live status. You MUST write this response strictly in the active language of the user's query.
`;
    }
  }

  // 4. RAG Database Retrieval Integration (Task 2)
  let ragContext = "";

  // Skip similarity lookup if this is a tracking status request
  if (!isStatusQuery && lastUserMessage.trim().length > 3) {
    try {
      // Generate query embedding using text-embedding-004
      const queryEmbedding = await getEmbedding(lastUserMessage, true);

      // Query Supabase match RPC function
      const { data: chunks, error: rpcError } = await supabase.rpc('match_knowledge_chunks', {
        query_embedding: queryEmbedding,
        match_count: 4
      });

      if (rpcError) {
        console.error("Supabase RPC search failed:", rpcError);
      } else if (chunks && chunks.length > 0) {
        // filter for strong cosine similarities (> 0.65 threshold)
        const relevantChunks = chunks.filter((c: any) => c.similarity > 0.65);
        if (relevantChunks.length > 0) {
          const chunkTexts = relevantChunks.map((c: any) => 
            `[Source: ${c.source}, Section: ${c.section}]\n${c.content}`
          );
          
          ragContext = `
## Relevant Background Context
The following background details were retrieved semantically from our vector database. Use them to answer the client's question accurately:
${chunkTexts.join('\n\n')}
`;
        }
      }
    } catch (e) {
      console.error("RAG retrieval pipeline error (this is bypassed safely):", e);
    }
  }

  // 5. Combine System Instructions
  const combinedSystemInstruction = `
${languageInstruction}
${systemInstructionText}
${statusContext}
${ragContext}
`;

  // 6. Map messages array to Gemini contents shape:
  // Role: user -> user, assistant/model -> model
  const contents = messages.map((m: any) => ({
    role: m.role === "assistant" || m.role === "model" ? "model" : "user",
    parts: [{ text: m.content || "" }]
  }));

  const payload = {
    contents,
    systemInstruction: {
      parts: [{ text: combinedSystemInstruction }]
    },
    generationConfig: {
      responseMimeType: "text/plain"
    }
  };

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Missing GEMINI_API_KEY environment variable");
    return new Response(JSON.stringify({ error: "API Key not configured" }), { status: 500 });
  }

  // 7. Call Gemini stream endpoint with fallback
  let response: Response;
  const urlLite = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:streamGenerateContent?alt=sse&key=${apiKey}`;
  const urlFlash = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`;

  try {
    response = await fetch(urlLite, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn("Gemini 2.5 Flash Lite failed, attempting fallback to Gemini 2.5 Flash. Error:", errorText);
      
      response = await fetch(urlFlash, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }
  } catch (e) {
    console.error("Network error during Gemini request, attempting fallback...", e);
    try {
      response = await fetch(urlFlash, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (fallbackError) {
      console.error("All Gemini API fallbacks failed:", fallbackError);
      return new Response(JSON.stringify({ error: "Generative AI service is currently unavailable" }), { status: 500 });
    }
  }

  if (!response.ok) {
    const errBody = await response.text();
    console.error("Gemini request failed:", response.status, errBody);
    return new Response(JSON.stringify({ error: "Generative API returned error state" }), { status: response.status });
  }

  // 8. Pipe stream from Gemini SSE to custom output stream
  const stream = new ReadableStream({
    async start(controller) {
      if (!response.body) {
        controller.close();
        return;
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let parserBuffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          parserBuffer += decoder.decode(value, { stream: true });
          const lines = parserBuffer.split("\n");
          parserBuffer = lines.pop() || "";

          for (const line of lines) {
            const cleanLine = line.trim();
            if (!cleanLine) continue;

            if (cleanLine.startsWith("data: ")) {
              try {
                const rawJson = cleanLine.substring(6);
                const data = JSON.parse(rawJson);
                const token = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
                if (token) {
                  controller.enqueue(new TextEncoder().encode(token));
                }
              } catch (parseError) {
                // Ignore incomplete line parse failures or heartbeat data
              }
            }
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
    }
  });
}

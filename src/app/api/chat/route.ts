/**
 * Chatbot API Endpoint (Phase 1)
 * Purpose: Streams completions from Google Gemini API using SSE fetch stream-parsing.
 * Rate limiting: Checked per-IP via Upstash Redis.
 * Models: Calls gemini-2.5-flash-lite with fallback to gemini-2.5-flash.
 */

import { chatRatelimit } from '@/lib/chat-rate-limit';
import { knowledge } from '@/components/chatbot/data/knowledge';
import { headers } from 'next/headers';

export const runtime = 'nodejs';

const systemInstructionText = `
You are the AI Chat Assistant representing PrimeForge, a premium custom web design and SEO agency.
Answer client questions confidently using ONLY the facts provided in the knowledge base below.
Do not make up facts, timelines, or features not listed. If asked about something out of scope or custom, instruct them to Book a Call.

CRITICAL PRICING RULE: We do NOT publish or quote flat-rate prices or specific dollar amounts. Never state any pricing figures (e.g. do NOT say $100, $200, $400, etc.) under any circumstances, even if asked directly or repeatedly. If the user asks about cost or pricing, explain our Pricing Policy approach (custom quotes based on client goals) and redirect them to Book a Call (/book-a-call), WhatsApp (https://wa.me/918533925291), or Start a Project (/start-a-project).

Keep your tone direct, outcome-focused, warm, and confident (plain-spoken, not corporate-stiff). Use "we", "our", and "PrimeForge" to refer to the studio.
When appropriate (e.g. if the user asks about starting, pricing, features, or timeline), politely suggest booking a call or starting a project.

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

  // 3. Map messages array to Gemini contents shape:
  // Role: user -> user, assistant/model -> model
  const contents = messages.map((m: any) => ({
    role: m.role === "assistant" || m.role === "model" ? "model" : "user",
    parts: [{ text: m.content || "" }]
  }));

  const payload = {
    contents,
    systemInstruction: {
      parts: [{ text: systemInstructionText }]
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

  // 4. Call Gemini stream endpoint with fallback
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

  // 5. Pipe stream from Gemini SSE to custom output stream
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

/**
 * Gemini Embeddings Utility (Phase 2)
 * Purpose: Connects to Google's text-embedding-004 API to generate 768-dimensional float vectors.
 * Task Types: Uses RETRIEVAL_DOCUMENT for stored chunks and RETRIEVAL_QUERY for search matching.
 */

export async function getEmbedding(text: string, isQuery = false): Promise<number[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY in environment variables.");
  }

  const model = "models/embedding-001";
  const url = `https://generativelanguage.googleapis.com/v1beta/${model}:embedContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: {
        parts: [{ text }]
      },
      taskType: isQuery ? "RETRIEVAL_QUERY" : "RETRIEVAL_DOCUMENT"
    })
  });

  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(`Google Gemini Embeddings API returned error state ${response.status}: ${errorMsg}`);
  }

  const result = await response.json();
  const values = result.embedding?.values;

  if (!values || !Array.isArray(values) || values.length !== 768) {
    throw new Error(`Embedding result did not return expected 768 dimensions. Got: ${values?.length}`);
  }

  return values;
}

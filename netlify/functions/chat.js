const MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-1.5-flash-latest",
];

const TRANSIENT_STATUSES = new Set([500, 502, 503, 504]);

async function callModel(model, apiKey, prompt) {
  const body = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
    },
  };
  if (model === "gemini-2.5-flash") {
    body.generationConfig.thinkingConfig = { thinkingBudget: 0 };
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
  const data = await response.json().catch(() => ({}));
  return { response, data };
}

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "Missing GEMINI_API_KEY" }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const { prompt } = payload;
  if (typeof prompt !== "string" || !prompt.trim()) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing prompt" }) };
  }

  let lastResponse;
  let lastData;

  for (let m = 0; m < MODELS.length; m++) {
    const model = MODELS[m];
    // one retry for transient upstream errors on the same model
    for (let attempt = 0; attempt < 2; attempt++) {
      if (attempt > 0) await new Promise((r) => setTimeout(r, 600));
      try {
        const { response, data } = await callModel(model, apiKey, prompt);
        lastResponse = response;
        lastData = data;

        if (response.ok) {
          const candidate = data.candidates?.[0];
          const text = candidate?.content?.parts?.[0]?.text ?? "";
          return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, model }),
          };
        }

        // 429 = this model's quota is exhausted; jump to next model immediately
        if (response.status === 429) break;
        // transient = retry same model
        if (TRANSIENT_STATUSES.has(response.status)) continue;
        // anything else (400 bad key, 403, etc.) = don't bother trying other models
        return {
          statusCode: response.status,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ error: data, model }),
        };
      } catch (err) {
        lastResponse = { status: 502 };
        lastData = { error: String(err) };
      }
    }
  }

  return {
    statusCode: lastResponse?.status || 502,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ error: lastData, exhausted: true }),
  };
}

import axios from "axios";


export const generateAIResponse = async ({ businessName, category, city, services }) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in environment");
  }
  const prompt = `
You are an expert website copywriter and SEO strategist.
Based on the business details below, write compelling website content that can be used
for the homepage. The output must be in valid JSON format only.

Business Name: ${businessName}
Category: ${category}
City: ${city}
Services: ${services.join(", ")}

Generate content in this JSON structure:
{
  "headline": "SEO-optimized, catchy headline for the website",
  "description": "Engaging description highlighting services and trustworthiness",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4"]
}
  `;

  const url = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent";

  const payload = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 400
    }
  };

  try {
    const res = await axios.post(`${url}?key=${process.env.GEMINI_API_KEY}`, payload, {
      headers: { "Content-Type": "application/json" },
      timeout: 20000
    });

    const text =
      res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      res.data?.candidates?.[0]?.content?.[0]?.text ||
      "";

    if (!text.trim()) {
      throw new Error("Empty response text from Gemini model");
    }

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return { raw: text };
  } catch (err) {
    console.error("❌ Gemini raw error:", err.response?.data || err.message || err);
    const msg = err.response?.data || err.message || err;
    throw new Error(`Gemini request failed: ${JSON.stringify(msg)}`);
  }
};
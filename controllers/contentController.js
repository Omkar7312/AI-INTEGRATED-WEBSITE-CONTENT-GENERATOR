import { generateAIResponse } from "../services/aiService.js";

export const generateContent = async (req, res) => {
  try {
    const { businessName, category, city, services } = req.body;
    if (!businessName || !category || !city || !services || !Array.isArray(services)) {
      return res.status(400).json({ error: "businessName, category, city and services (array) are required" });
    }

    const optimizedPrompt = `
You are a professional website copywriter and SEO specialist.
Given the business details below, produce ONLY a single valid JSON object (no surrounding explanation) with three fields:
- headline: a concise attention-grabbing headline (max 12 words).
- description: a short meta description suitable for search results (max 160 characters).
- keywords: an array of 5-8 short keyword phrases (each 1-4 words), prioritized for SEO.

Business details:
Business Name: ${businessName}
Category: ${category}
City: ${city}
Services: ${services.join(", ")}

Requirements:
- Do not include any additional fields or commentary.
- Ensure the JSON is parseable.
- Keep description under 160 characters.
- Keep headline natural and persuasive.

Example output:
{
  "headline": "Trusted Home Painters in Boston — BrightCoats",
  "description": "BrightCoats provides professional interior and exterior painting services in Boston. Quality workmanship, free estimates, and fast timelines.",
  "keywords": ["home painters Boston", "interior painting Boston", "exterior painting", "residential painters", "painting company Boston"]
}
`;

    const aiResponse = await generateAIResponse({ businessName, category, city, services, prompt: optimizedPrompt });
    return res.status(200).json(aiResponse);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: String(err.message || err) });
  }
};

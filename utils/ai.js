

const { GoogleGenerativeAI } = require('@google/generative-ai');

async function askGemini(question) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in .env');
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.0-flash-lite"];

  const prompt = `Answer the following question in exactly ONE word. Do not include any punctuation, explanation, or extra text. Just one word.\n\nQuestion: ${question}`;

  let lastError = null;
  for (const modelName of models) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text().trim().split(/\s+/)[0].replace(/[^a-zA-Z0-9]/g, "");
      return text;
    } catch (err) {
      lastError = err;
      continue;
    }
  }
  throw lastError || new Error("All AI models failed.");
}

module.exports = { askGemini };

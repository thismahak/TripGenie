import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // ✅ WORKS HERE
});

export async function getVisaInfo({ nationality, destination, tripType }) {
  const prompt = `
You are a helpful AI travel assistant.

A user from ${nationality} is planning a ${tripType} trip to ${destination}.

Reply with:
1. Do they need a visa?
2. What type of visa?
3. Documents required
4. Allowed stay duration
5. Warnings or tips
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

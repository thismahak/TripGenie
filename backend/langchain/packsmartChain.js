// /server/langchain/packsmartChain.js
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import dotenv from "dotenv";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-1.5-flash", // You can switch to 1.5-flash too
  temperature: 0.7,
  maxOutputTokens: 1024,
});

const prompt = ChatPromptTemplate.fromTemplate(
  `You are a smart travel assistant helping a traveler pack.

Destination: {destination}
Trip Duration: {durationDays} days
Season: {season}
Activities: {activities}

List what the traveler should pack, grouped by:
- Clothing (based on season)
- Toiletries & Personal Care
- Electronics
- Activity-specific gear
- Travel tips (local culture, customs)

`
);

export const packingChain = RunnableSequence.from([prompt, model]);

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import dotenv from "dotenv";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash", // same as visaChain
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0.7,
});

const prompt = ChatPromptTemplate.fromTemplate(`
You are a travel expert. A user wants to visit {destination} for a {tripType} trip.

Provide:
1. Top 5 tourist attractions (with short one-liner descriptions)
2. Popular local foods or restaurants
3. Best areas or types of hotels to stay
4. Any local festivals/events (if applicable)

Respond in markdown-style bullet points.
`);

export const exploreChain = RunnableSequence.from([prompt, model]);

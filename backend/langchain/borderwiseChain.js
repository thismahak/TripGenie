import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import dotenv from "dotenv";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
  model: "models/gemini-1.0-pro",
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0.6,
  maxOutputTokens: 1024,
});

const prompt = ChatPromptTemplate.fromTemplate(
  `You are a helpful AI travel assistant.

A user from {nationality} is planning a {tripType} trip to {destination}.

Reply with:
1. Do they need a visa?
2. What type of visa?
3. Documents usually required
4. Allowed entry duration
5. Any warnings or extra tips

`
);

export const visaChain = RunnableSequence.from([prompt, model]);

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import dotenv from "dotenv";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-pro",
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0.6,
  maxOutputTokens: 1024,

  safetySettings: [
    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
  ],
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

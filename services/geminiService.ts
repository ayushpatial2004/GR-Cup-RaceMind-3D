import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { type Driver, type TrackTurn } from "../types";

// Fix: Adhere to Gemini API guidelines for initialization by passing the environment variable directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export async function getCoachingNotes(turn: TrackTurn, driver: Driver): Promise<string> {
  const prompt = `
    You are RaceMind, an expert AI race coach for professional GR Cup drivers.
    Your task is to provide a concise, actionable, and encouraging cognitive rehearsal cue.

    Driver Profile:
    - Name: ${driver.DRIVER}
    - Car Number: ${driver.NUMBER}
    - Finishing Position: ${driver.POS}
    - Fastest Lap Time: ${driver.FL_TIME}

    Focus Area: ${turn}

    Instruction:
    Generate a 2-3 sentence cognitive walkthrough for this driver at this specific turn. Focus on one key aspect: braking point, apex, or exit strategy.
    The tone should be professional, direct, and confidence-building. Do not use pleasantries like "Hello" or "Good luck". Start directly with the advice.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the AI coach.");
  }
}

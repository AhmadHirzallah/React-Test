
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getSecurityTip(): Promise<{ text: string; author: string }> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Give me a short, witty, and useful cyber-security tip for a login page greeting.",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING, description: "The security tip text." },
              author: { type: Type.STRING, description: "A fictional humorous expert name." }
            },
            required: ["text", "author"]
          }
        }
      });
      
      const jsonStr = response.text.trim();
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error("Gemini Error:", error);
      return {
        text: "Keep your password longer than your grocery list.",
        author: "The Nexus Guardian"
      };
    }
  }
}

export const geminiService = new GeminiService();

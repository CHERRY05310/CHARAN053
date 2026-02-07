
import { GoogleGenAI, Type, Chat } from "@google/genai";
import { ThreatAnalysis } from "./types";

export const analyzeThreat = async (type: 'url' | 'email' | 'sms', content: string): Promise<ThreatAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are the core of SafeClick Intelligence Engine. Analyze the provided ${type} content for elite-level social engineering patterns.
    Perform multi-layer analysis including:
    1. Psychological Trigger Detection (Scarcity, Authority, Fear, Social Proof).
    2. Linguistic Manipulation (Urgency, Guilt, Flattery).
    3. Behavioral Risk Profiling.
    
    ${type === 'url' ? `
    SPECIFIC URL REQUIREMENTS:
    - Identify Homograph attacks (e.g., usage of non-Latin characters that look like Latin ones).
    - Identify Typosquatting variations (e.g., 'g00gle.com' vs 'google.com').
    - Analyze TLD reputation and subdomain legitimacy.
    - Check for common phishing URL structures (e.g., login-verification.site).
    ` : ''}

    Return a structured JSON with:
    - riskScore (0-100)
    - threatLevel (Low, Medium, High, Critical)
    - confidenceLevel (percentage)
    - category (detailed attack type)
    - linguisticManipulation (array of detected phrases/patterns)
    - psychologicalTriggers (array of detected triggers)
    - explanation (professional security breakdown)
    - recommendation (actionable steps)
    - indicators (array of technical flags, e.g., "Homograph Detected: 'а' (U+0430)", "Typosquatting of 'paypal.com'")
    - behavioralRiskIndex (0-100 score of how likely a human would fall for this)
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: content,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: { type: Type.NUMBER },
            threatLevel: { type: Type.STRING },
            confidenceLevel: { type: Type.NUMBER },
            category: { type: Type.STRING },
            linguisticManipulation: { type: Type.ARRAY, items: { type: Type.STRING } },
            psychologicalTriggers: { type: Type.ARRAY, items: { type: Type.STRING } },
            explanation: { type: Type.STRING },
            recommendation: { type: Type.STRING },
            indicators: { type: Type.ARRAY, items: { type: Type.STRING } },
            behavioralRiskIndex: { type: Type.NUMBER },
          },
          required: ["riskScore", "threatLevel", "confidenceLevel", "category", "explanation", "recommendation", "indicators"]
        }
      }
    });

    return JSON.parse(response.text || "{}") as ThreatAnalysis;
  } catch (error) {
    console.error("Analysis Error:", error);
    throw new Error("Intelligence core offline.");
  }
};

export const searchThreatIntelligence = async (query: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Search for real-time cyber threats and phishing patterns matching: ${query}. Focus on technical indicators, geographic trends, and psychological tactics.`,
      config: { tools: [{ googleSearch: {} }] },
    });
    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    return { text: "Intelligence search failed.", sources: [] };
  }
};

export const startSecurityChat = (): Chat => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: `You are the SafeClick SOC AI Analyst, an elite digital forensics and social engineering expert.
      Your tone is calm, precise, authoritative, and strictly professional. Avoid conversational filler.
      
      When analyzing content (URLs, Emails, Headers, SMS), follow this MANDATORY structured response format:
      
      ### [VERDICT]
      - **Risk Level**: [LOW/MEDIUM/HIGH/CRITICAL]
      - **Classification**: [Attack Type]
      - **Confidence**: [X%]
      
      ### [FORENSIC_SUMMARY]
      [Provide a concise 2-sentence technical summary of the threat]
      
      ### [THREAT_INDICATORS]
      - [Technical Indicator 1]
      - [Technical Indicator 2]
      
      ### [BEHAVIORAL_LOG]
      - **Psychological Trigger**: [e.g., Urgency, Authority]
      - **Linguistic Pattern**: [Detected phrases]
      - **Manipulation Index**: [X/10]
      
      ### [RECOMMENDED_ACTIONS]
      1. [Primary action]
      2. [Secondary verification]
      
      If the input is just general conversation, maintain your identity but skip the structured blocks unless analysis is requested.`,
    },
  });
};

export const analyzeVideoForThreats = async (videoBase64: string, mimeType: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: {
        parts: [
          { inlineData: { data: videoBase64, mimeType } },
          { text: `Perform an elite cybersecurity audit of this video. 
          Return the analysis strictly in the following format:
          [VERDICT]: (One of: CRITICAL, SUSPICIOUS, or SECURE)
          [CONFIDENCE]: (0-100%)
          [VISUAL_INTEGRITY]: (Explain deepfake/AI indicators)
          [PSYCHOLOGICAL_ANALYSIS]: (Explain coercion/impersonation tactics)
          [TECHNICAL_FLAGS]: (List any meta-data or behavioral anomalies)` }
        ]
      }
    });
    return response.text;
  } catch (error) {
    throw new Error("Video lab error.");
  }
};

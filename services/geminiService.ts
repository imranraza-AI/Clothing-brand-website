import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Helper to get AI instance (singleton-ish pattern to avoid re-creating if not needed, but safe to recreate)
const getAi = () => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY not set in environment");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// 1. Chatbot: gemini-3-pro-preview
export const sendChatMessage = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
  const ai = getAi();
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    history: history,
    config: {
      systemInstruction: "You are Valvaire's expert personal stylist. Your tone is premium, helpful, minimal, and fashion-forward. You help users find clothes, match outfits, and answer questions about fabric and care. Keep answers concise and elegant.",
    },
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};

// 2. Fast Response (Style Advice): gemini-2.5-flash-lite
export const getQuickStyleAdvice = async (productName: string) => {
  const ai = getAi();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-lite-latest',
    contents: `Give me a one-sentence style tip for wearing a "${productName}". Keep it chic and practical.`,
  });
  return response.text;
};

// 3. Image Editing: gemini-2.5-flash-image
export const editImage = async (base64Image: string, prompt: string) => {
  const ai = getAi();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/png',
            data: base64Image,
          },
        },
        {
          text: `Edit this image: ${prompt}. Return the image only.`,
        },
      ],
    },
  });

  // Extract image
  // The response might contain an image in inlineData
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null; // No image returned
};

// 4. Video Generation (Text/Image to Video): veo-3.1-fast-generate-preview
export const generateVideo = async (prompt: string, aspectRatio: '16:9' | '9:16' = '16:9', base64Image?: string) => {
  const ai = getAi();
  
  // We need to handle the operation loop manually
  let operation;
  
  if (base64Image) {
      // Image to Video
      operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt || "Animate this fashion item naturally.",
        image: {
            imageBytes: base64Image,
            mimeType: 'image/png',
        },
        config: {
            numberOfVideos: 1,
            aspectRatio: aspectRatio,
            resolution: '720p',
        }
      });
  } else {
      // Text to Video
      operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
            numberOfVideos: 1,
            aspectRatio: aspectRatio,
            resolution: '720p',
        }
      });
  }

  // Poll for completion
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5s
    operation = await ai.operations.getVideosOperation({operation: operation});
  }

  const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!videoUri) return null;

  // Fetch the actual video bytes using the key
  const finalUrl = `${videoUri}&key=${process.env.API_KEY}`;
  return finalUrl;
};

import { GoogleGenAI, Type } from "@google/genai";
import { DesignFormData, DesignSuggestion, FengShuiResult } from '../types';

// ✅ FIX: dùng đúng env của Vite + fallback rõ ràng
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("❌ Missing VITE_GEMINI_API_KEY. Check Vercel Environment Variables.");
}

const ai = new GoogleGenAI({ apiKey });

// Helper giữ nguyên
const parseDataUrl = (dataUrl: string) => {
  const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) return null;

  return {
    mimeType: matches[1],
    data: matches[2]
  };
};

export const generateArchitecturalDesigns = async (data: DesignFormData): Promise<DesignSuggestion[]> => {
  const prompt = `Bạn là một Kiến trúc sư trưởng giàu kinh nghiệm tại Việt Nam. 
Khách hàng có nhu cầu thiết kế một công trình với các thông tin sau:
- Loại hình: ${data.houseType || 'Chưa xác định'}
- Kích thước khu đất: Rộng ${data.width || '?'}m x Dài ${data.length || '?'}m
- Số tầng: ${data.floors || '?'}
- Phong cách mong muốn: ${data.style || 'Hiện đại'}
- Ngân sách dự kiến: ${data.budget || 'Chưa xác định'}

Hãy phân tích chuyên sâu và đưa ra 3 phương án thiết kế kiến trúc mặt tiền khác nhau...

Trả về JSON gồm 3 object: title, description, budgetBadge.`;

  const contents: any[] = [{ text: prompt }];

  if (data.image) {
    const parsedImage = parseDataUrl(data.image);
    if (parsedImage) {
      contents.unshift({
        inlineData: parsedImage
      });
    }
  }

  try {
    const response = await ai.models.generateContent({
      // ✅ FIX: model ổn định hơn
      model: "gemini-1.5-pro",
      contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              budgetBadge: { type: Type.STRING }
            },
            required: ["title", "description", "budgetBadge"]
          }
        }
      }
    });

    const result = JSON.parse(response.text || "[]");

    return result.map((item: any, index: number) => ({
      id: `opt-${index + 1}`,
      imageUrl: getPlaceholderImage(data.style, index),
      title: item.title,
      description: item.description,
      budgetBadge: item.budgetBadge,
    }));

  } catch (error) {
    console.error("❌ Gemini error:", error);
    throw new Error("Không thể tạo phương án thiết kế lúc này.");
  }
};

export const analyzeFengShui = async (data: DesignFormData): Promise<FengShuiResult> => {
  const year = data.birthDate ? new Date(data.birthDate).getFullYear() : 1990;

  const prompt = `Bạn là chuyên gia phong thủy...`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            direction: { type: Type.STRING },
            elements: { type: Type.STRING },
            advice: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["direction", "elements", "advice"]
        }
      }
    });

    return JSON.parse(response.text || "{}");

  } catch (error) {
    console.error("❌ FengShui error:", error);
    throw new Error("Không thể phân tích phong thủy.");
  }
};

export const editDesign = async (designId: string, prompt: string): Promise<DesignSuggestion> => {
  const systemPrompt = `Bạn là một Kiến trúc sư...`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: systemPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            budgetBadge: { type: Type.STRING }
          },
          required: ["title", "description", "budgetBadge"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");

    return {
      id: designId,
      imageUrl: `https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?...${Date.now()}`,
      title: result.title || "Phương án đã tinh chỉnh",
      description: result.description || "Đã cập nhật",
      budgetBadge: result.budgetBadge || "Đã cập nhật",
    };

  } catch (error) {
    console.error("❌ Edit error:", error);
    throw new Error("Không thể chỉnh sửa phương án.");
  }
};

const getPlaceholderImage = (style: string, index: number) => {
  const images = [
    `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9`,
    `https://images.unsplash.com/photo-1600607687939-ce8a6c25118c`,
    `https://images.unsplash.com/photo-1600585154340-be6161a56a0c`,
    `https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3`,
    `https://images.unsplash.com/photo-1512917774080-9991f1c4c750`
  ];

  return images[index % images.length];
};

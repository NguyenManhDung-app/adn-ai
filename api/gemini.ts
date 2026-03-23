import { DesignFormData, DesignSuggestion, FengShuiResult } from '../types';

// Helper giữ nguyên
const parseDataUrl = (dataUrl: string) => {
  const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) return null;

  return {
    mimeType: matches[1],
    data: matches[2]
  };
};

// 🧠 GỌI BACKEND (KHÔNG gọi Gemini trực tiếp nữa)
const callAPI = async (prompt: string) => {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();

  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

  return JSON.parse(text);
};

export const generateArchitecturalDesigns = async (data: DesignFormData): Promise<DesignSuggestion[]> => {
  const prompt = `Bạn là một Kiến trúc sư trưởng giàu kinh nghiệm tại Việt Nam...`;

  try {
    const result = await callAPI(prompt);

    return result.map((item: any, index: number) => ({
      id: `opt-${index + 1}`,
      imageUrl: getPlaceholderImage(data.style, index),
      title: item.title,
      description: item.description,
      budgetBadge: item.budgetBadge,
    }));

  } catch (error) {
    console.error("❌ Error:", error);
    throw new Error("Không thể tạo phương án thiết kế.");
  }
};

export const analyzeFengShui = async (data: DesignFormData): Promise<FengShuiResult> => {
  const year = data.birthDate ? new Date(data.birthDate).getFullYear() : 1990;

  const prompt = `Bạn là chuyên gia phong thủy...`;

  try {
    return await callAPI(prompt);

  } catch (error) {
    console.error("❌ Error:", error);
    throw new Error("Không thể phân tích phong thủy.");
  }
};

export const editDesign = async (designId: string, prompt: string): Promise<DesignSuggestion> => {
  const systemPrompt = `Bạn là một Kiến trúc sư...`;

  try {
    const result = await callAPI(systemPrompt);

    return {
      id: designId,
      imageUrl: `https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?...${Date.now()}`,
      title: result.title || "Phương án đã tinh chỉnh",
      description: result.description || "Đã cập nhật",
      budgetBadge: result.budgetBadge || "Đã cập nhật",
    };

  } catch (error) {
    console.error("❌ Error:", error);
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
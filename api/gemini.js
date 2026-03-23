import { DesignFormData, DesignSuggestion, FengShuiResult } from '../types';

const callAPI = async (prompt: string) => {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("API không trả về dữ liệu");
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

export const generateArchitecturalDesigns = async (data: DesignFormData): Promise<DesignSuggestion[]> => {
  const prompt = `Bạn là một Kiến trúc sư trưởng giàu kinh nghiệm tại Việt Nam...`;

  const result = await callAPI(prompt);

  return result.map((item: any, index: number) => ({
    id: `opt-${index + 1}`,
    imageUrl: getPlaceholderImage(data.style, index),
    title: item.title,
    description: item.description,
    budgetBadge: item.budgetBadge,
  }));
};

export const analyzeFengShui = async (data: DesignFormData): Promise<FengShuiResult> => {
  const prompt = `Bạn là chuyên gia phong thủy...`;
  return await callAPI(prompt);
};

export const editDesign = async (designId: string, prompt: string): Promise<DesignSuggestion> => {
  const result = await callAPI(prompt);

  return {
    id: designId,
    imageUrl: `https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?${Date.now()}`,
    title: result.title || "Phương án đã tinh chỉnh",
    description: result.description || "Đã cập nhật",
    budgetBadge: result.budgetBadge || "Đã cập nhật",
  };
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
import { GoogleGenAI, Type } from "@google/genai";
import { DesignFormData, DesignSuggestion, FengShuiResult } from '../types';

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to extract base64 data and mime type from data URL
const parseDataUrl = (dataUrl: string) => {
  const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return null;
  }
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

Hãy phân tích chuyên sâu và đưa ra 3 phương án thiết kế kiến trúc mặt tiền khác nhau, bám sát nhu cầu thực tế, khả thi về mặt thi công và ngân sách. 
Nếu có ảnh hiện trạng khu đất đính kèm, hãy phân tích bối cảnh xung quanh (hướng nắng, công trình lân cận, đặc điểm khu đất) để đưa ra giải pháp thiết kế tối ưu nhất.

Với mỗi phương án, hãy cung cấp:
1. Tiêu đề phương án (ngắn gọn, hấp dẫn, thể hiện rõ ý tưởng).
2. Mô tả chi tiết (khoảng 3-4 câu): Phân tích cách bố trí hình khối, vật liệu sử dụng (kính, gỗ, đá, v.v.), giải pháp lấy sáng/thông gió tự nhiên, và điểm nhấn kiến trúc phù hợp với kích thước ${data.width}x${data.length}m.
3. Đánh giá ngân sách (phù hợp với mức ${data.budget} hay cần điều chỉnh, phân bổ chi phí cơ bản).

Trả về kết quả dưới dạng mảng JSON gồm 3 đối tượng, mỗi đối tượng có các trường: title, description, budgetBadge.`;

  const contents: any[] = [{ text: prompt }];

  if (data.image) {
    const parsedImage = parseDataUrl(data.image);
    if (parsedImage) {
      contents.unshift({
        inlineData: {
          mimeType: parsedImage.mimeType,
          data: parsedImage.data
        }
      });
    }
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: contents,
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
    console.error("Error generating designs:", error);
    // Fallback if API fails
    throw new Error("Không thể tạo phương án thiết kế lúc này. Vui lòng thử lại sau.");
  }
};

export const analyzeFengShui = async (data: DesignFormData): Promise<FengShuiResult> => {
  const year = data.birthDate ? new Date(data.birthDate).getFullYear() : 1990;
  
  const prompt = `Bạn là một chuyên gia Phong thủy kiến trúc (Huyền Không Phi Tinh và Bát Trạch) tại Việt Nam.
Gia chủ sinh năm: ${year} (Dương lịch).
Loại hình nhà: ${data.houseType || 'Chưa xác định'}, kích thước ${data.width || '?'}m x ${data.length || '?'}m.

Hãy phân tích phong thủy chi tiết và sát với thực tế thi công cho gia chủ này:
1. Xác định cung mệnh, ngũ hành bản mệnh.
2. Hướng nhà/hướng cửa chính tốt nhất (Sinh Khí, Diên Niên, Thiên Y, Phục Vị).
3. Đưa ra 3-4 lời khuyên thiết thực về:
   - Màu sắc mặt tiền và vật liệu tương sinh/tương hợp (ví dụ: dùng đá ốp màu gì, sơn tường màu gì).
   - Cách bố trí cổng, cửa chính, ban công để đón tài lộc, hóa giải sát khí (nếu có).
   - Lưu ý về tỷ lệ hình khối kiến trúc theo ngũ hành.

Trả về kết quả dưới dạng JSON với các trường:
- direction: Hướng tốt (ví dụ: "Đông Nam (Sinh Khí) / Chính Nam (Diên Niên)")
- elements: Ngũ hành bản mệnh (ví dụ: "Mộc (Đại Lâm Mộc)")
- advice: Mảng các chuỗi (string), mỗi chuỗi là một lời khuyên chi tiết, mang tính ứng dụng cao trong thiết kế.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
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
    console.error("Error analyzing feng shui:", error);
    throw new Error("Không thể phân tích phong thủy lúc này.");
  }
};

export const editDesign = async (designId: string, prompt: string): Promise<DesignSuggestion> => {
  const systemPrompt = `Bạn là một Kiến trúc sư. Khách hàng yêu cầu chỉnh sửa phương án thiết kế với nội dung: "${prompt}".
Hãy đưa ra mô tả cho phương án đã được cập nhật, giải thích rõ những thay đổi về hình khối, vật liệu hoặc công năng để đáp ứng yêu cầu trên.
Trả về JSON gồm: title, description, budgetBadge.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
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
      imageUrl: `https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&cachebuster=${Date.now()}`,
      title: result.title || "Phương án đã tinh chỉnh",
      description: result.description || "Đã cập nhật theo yêu cầu.",
      budgetBadge: result.budgetBadge || "Đã cập nhật",
    };
  } catch (error) {
    console.error("Error editing design:", error);
    throw new Error("Không thể chỉnh sửa phương án lúc này.");
  }
};

const getPlaceholderImage = (style: string, index: number) => {
  // Map styles to appropriate Unsplash keywords
  let keyword = 'modern+house';
  if (style === 'Tối giản') keyword = 'minimalist+house';
  if (style === 'Tân cổ điển') keyword = 'classic+house+architecture';
  if (style === 'Nhiệt đới') keyword = 'tropical+house';
  if (style === 'Sang trọng') keyword = 'luxury+mansion';
  
  // Use different seeds/images based on index
  const images = [
    `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
    `https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
    `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
    `https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
    `https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`
  ];
  return images[index % images.length];
};

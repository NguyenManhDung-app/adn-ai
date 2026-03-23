import { DesignFormData, DesignSuggestion, FengShuiResult } from '../types';

export const generateArchitecturalDesigns = async (data: DesignFormData): Promise<DesignSuggestion[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'opt-1',
          imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          title: `Phương án 1: ${data.style || 'Hiện đại'} Tối Ưu`,
          description: `Mặt tiền đề xuất theo phong cách ${data.style || 'hiện đại'}, tối ưu ánh sáng tự nhiên và thông gió cho ${data.houseType || 'ngôi nhà'}. Phù hợp công trình có diện tích ${data.width}x${data.length}m.`,
          budgetBadge: data.budget || 'Dự kiến: 1-2 tỷ',
        },
        {
          id: 'opt-2',
          imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          title: `Phương án 2: ${data.style || 'Sang trọng'} Mở Rộng`,
          description: `Gợi ý phương án sử dụng vật liệu cao cấp, tạo điểm nhấn mặt tiền ấn tượng. Thiết kế tập trung vào không gian mở và mảng xanh.`,
          budgetBadge: data.budget || 'Dự kiến: 2-3 tỷ',
        },
        {
          id: 'opt-3',
          imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          title: `Phương án 3: ${data.style || 'Nhiệt đới'} Giao Hòa`,
          description: `Định hướng sơ bộ kết hợp hài hòa giữa kiến trúc và thiên nhiên. Phù hợp với nhu cầu không gian sống thư giãn, gần gũi.`,
          budgetBadge: data.budget || 'Dự kiến: 3-5 tỷ',
        }
      ]);
    }, 2500);
  });
};

export const analyzeFengShui = async (data: DesignFormData): Promise<FengShuiResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const year = data.birthDate ? new Date(data.birthDate).getFullYear() : 1990;
      resolve({
        direction: 'Đông Nam / Chính Nam',
        elements: 'Mộc sinh Hỏa',
        advice: [
          `Dựa trên năm sinh ${year}, định hướng sơ bộ hướng nhà đón sinh khí tốt nhất là Đông Nam hoặc Chính Nam.`,
          `Màu sắc mặt tiền đề xuất: Các tone màu ấm, kết hợp vật liệu gỗ hoặc đá tự nhiên để cân bằng năng lượng.`,
          `Bố trí không gian: Nên ưu tiên khoảng lùi vừa đủ làm minh đường tụ thủy, giúp gia đạo bình an, đón tài lộc.`
        ]
      });
    }, 1500);
  });
};

export const editDesign = async (designId: string, prompt: string): Promise<DesignSuggestion> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: designId,
        imageUrl: `https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&cachebuster=${Date.now()}`,
        title: `Phương án đã tinh chỉnh`,
        description: `Mặt tiền đã được cập nhật dựa trên yêu cầu: "${prompt}". Đây là gợi ý phương án mới phù hợp công trình của bạn.`,
        budgetBadge: 'Đã cập nhật',
      });
    }, 2000);
  });
};

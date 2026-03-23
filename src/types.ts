export type HouseType = 'Nhà phố' | 'Biệt thự' | 'Nhà vườn' | 'Nhà cấp 4' | 'Nhà 2 mặt tiền';
export type DesignStyle = 'Hiện đại' | 'Tối giản' | 'Tân cổ điển' | 'Nhiệt đới' | 'Sang trọng';

export interface DesignFormData {
  image: string | null;
  birthDate: string;
  houseType: HouseType | '';
  width: string;
  length: string;
  floors: string;
  style: DesignStyle | '';
  budget: string;
}

export interface DesignSuggestion {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  budgetBadge: string;
}

export interface FengShuiResult {
  direction: string;
  elements: string;
  advice: string[];
}

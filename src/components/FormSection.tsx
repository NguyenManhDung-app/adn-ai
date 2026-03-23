import React from 'react';
import { Upload, Calendar, Ruler, Layers, Home, Palette, DollarSign } from 'lucide-react';
import { DesignFormData, HouseType, DesignStyle } from '../types';
import { HOUSE_TYPES, DESIGN_STYLES, BUDGET_RANGES, COMPANY } from '../constants';

interface FormSectionProps {
  formData: DesignFormData;
  setFormData: React.Dispatch<React.SetStateAction<DesignFormData>>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export default function FormSection({ formData, setFormData, onSubmit, isLoading }: FormSectionProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const inputClass = "w-full bg-surfaceAlt border border-white/5 rounded-xl px-4 py-3.5 text-textMain focus:ring-1 focus:ring-primary focus:neon-border outline-none transition-all placeholder:text-textMute";
  const labelClass = "block text-sm font-medium text-textSoft mb-2 flex items-center gap-2";

  const getSelectClass = (value: string) => {
    const baseClass = "w-full rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-primary focus:neon-border outline-none transition-all appearance-none";
    if (!value) {
      return `${baseClass} bg-surfaceAlt border border-white/5 text-textMute`;
    }
    return `${baseClass} bg-surfaceAlt border border-primary/50 text-primary font-medium shadow-[0_0_8px_rgba(0,255,204,0.15)]`;
  };

  return (
    <div className="bg-surface rounded-3xl p-6 md:p-10 neon-border shadow-2xl relative overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-sans font-bold mb-8 text-textMain relative z-10 flex items-center gap-3">
        <span className="w-1.5 h-6 bg-primary rounded-full neon-box"></span>
        Thông tin công trình
      </h2>
      
      <form onSubmit={onSubmit} className="space-y-8 relative z-10">
        {/* Image Upload */}
        <div>
          <label className={labelClass}>
            Ảnh khu đất / hiện trạng <span className="text-accent neon-text-accent">*</span>
          </label>
          <div className="mt-1 flex justify-center border border-white/10 border-dashed rounded-2xl hover:neon-border transition-colors bg-surfaceAlt/30 group relative overflow-hidden min-h-[200px]">
            {formData.image ? (
              <div className="relative w-full h-full p-2 flex items-center justify-center">
                <img src={formData.image} alt="Preview" className="max-w-full max-h-[500px] object-contain rounded-xl" />
                <div className="absolute inset-0 flex items-center justify-center bg-bg/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm m-2 rounded-xl">
                  <span className="text-white font-medium bg-primary/20 px-4 py-2 rounded-full neon-border">Thay đổi ảnh</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-center py-12">
                <div className="w-16 h-16 mx-auto rounded-full bg-surfaceAlt border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:neon-border transition-all duration-300">
                  <Upload className="h-8 w-8 text-textMute group-hover:text-primary group-hover:neon-text transition-colors" />
                </div>
                <div className="flex flex-col text-sm text-textSoft">
                  <span className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primarySoft hover:neon-text focus-within:outline-none transition-colors">
                    Tải ảnh lên
                  </span>
                  <p className="mt-1">hoặc kéo thả vào đây</p>
                </div>
                <p className="text-xs text-textMute">PNG, JPG, GIF lên đến 10MB</p>
              </div>
            )}
            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" onChange={handleImageUpload} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          {/* Birth Date */}
          <div>
            <label className={labelClass}>
              <Calendar className="w-4 h-4 text-primary" /> Ngày sinh gia chủ <span className="text-accent neon-text-accent">*</span>
            </label>
            <input
              type="date"
              required
              className={inputClass}
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            />
          </div>

          {/* House Type */}
          <div>
            <label className={labelClass}>
              <Home className="w-4 h-4 text-primary" /> Loại hình
            </label>
            <div className="relative">
              <select
                className={getSelectClass(formData.houseType)}
                value={formData.houseType}
                onChange={(e) => setFormData({ ...formData, houseType: e.target.value as HouseType })}
              >
                <option value="" disabled style={{ backgroundColor: '#0a0a0a', color: '#a3a3a3' }}>Chọn loại hình</option>
                {HOUSE_TYPES.map(type => <option key={type} value={type} style={{ backgroundColor: '#141414', color: '#ffffff' }}>{type}</option>)}
              </select>
              <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 ${formData.houseType ? 'text-primary' : 'text-textMute'}`}>
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          {/* Dimensions */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className={labelClass}>
                <Ruler className="w-4 h-4 text-primary" /> Ngang (m)
              </label>
              <input
                type="number"
                placeholder="Ví dụ: 5"
                className={inputClass}
                value={formData.width}
                onChange={(e) => setFormData({ ...formData, width: e.target.value })}
              />
            </div>
            <div className="flex-1">
              <label className={labelClass}>Dài (m)</label>
              <input
                type="number"
                placeholder="Ví dụ: 20"
                className={inputClass}
                value={formData.length}
                onChange={(e) => setFormData({ ...formData, length: e.target.value })}
              />
            </div>
          </div>

          {/* Floors */}
          <div>
            <label className={labelClass}>
              <Layers className="w-4 h-4 text-primary" /> Số tầng
            </label>
            <input
              type="number"
              placeholder="Ví dụ: 3"
              className={inputClass}
              value={formData.floors}
              onChange={(e) => setFormData({ ...formData, floors: e.target.value })}
            />
          </div>

          {/* Style */}
          <div>
            <label className={labelClass}>
              <Palette className="w-4 h-4 text-primary" /> Phong cách định hướng
            </label>
            <div className="relative">
              <select
                className={getSelectClass(formData.style)}
                value={formData.style}
                onChange={(e) => setFormData({ ...formData, style: e.target.value as DesignStyle })}
              >
                <option value="" disabled style={{ backgroundColor: '#0a0a0a', color: '#a3a3a3' }}>Chọn phong cách</option>
                {DESIGN_STYLES.map(style => <option key={style} value={style} style={{ backgroundColor: '#141414', color: '#ffffff' }}>{style}</option>)}
              </select>
              <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 ${formData.style ? 'text-primary' : 'text-textMute'}`}>
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className={labelClass}>
              <DollarSign className="w-4 h-4 text-primary" /> Ngân sách dự kiến
            </label>
            <div className="relative">
              <select
                className={getSelectClass(formData.budget)}
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              >
                <option value="" disabled style={{ backgroundColor: '#0a0a0a', color: '#a3a3a3' }}>Chọn ngân sách</option>
                {BUDGET_RANGES.map(range => <option key={range} value={range} style={{ backgroundColor: '#141414', color: '#ffffff' }}>{range}</option>)}
              </select>
              <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 ${formData.budget ? 'text-primary' : 'text-textMute'}`}>
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-primary hover:bg-primarySoft text-bg font-bold py-4 px-6 rounded-xl neon-box transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Nhận phân tích miễn phí
          </button>
          <a
            href={COMPANY.website}
            target="_blank"
            rel="noreferrer"
            className="flex-1 sm:flex-none text-center bg-surfaceAlt hover:bg-surface neon-border text-textMain font-medium py-4 px-8 rounded-xl transition-all duration-300"
          >
            Nhận Tư Vấn Từ KTS
          </a>
        </div>
      </form>
    </div>
  );
}

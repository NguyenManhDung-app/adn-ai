import { Wand2, Image as ImageIcon, MessageSquareText } from 'lucide-react';
import { DesignSuggestion } from '../types';
import { COMPANY } from '../constants';

interface DesignResultViewProps {
  suggestions: DesignSuggestion[];
  selectedDesign: string | null;
  onSelectDesign: (id: string) => void;
  isEditing: boolean;
  editPrompt: string;
  setEditPrompt: (val: string) => void;
  onEditDesign: () => void;
}

export default function DesignResultView({
  suggestions,
  selectedDesign,
  onSelectDesign,
  isEditing,
  editPrompt,
  setEditPrompt,
  onEditDesign
} : DesignResultViewProps) {
  const selectedSuggestion = suggestions.find(s => s.id === selectedDesign);

  return (
    <div className="mb-24">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-surfaceAlt neon-border-accent mb-6">
          <ImageIcon className="w-8 h-8 text-accent neon-text-accent" />
        </div>
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-textMain tracking-tight mb-4 neon-text">Phương Án Mặt Tiền Đề Xuất</h2>
        <p className="text-textSoft max-w-2xl mx-auto font-light text-lg">Lựa chọn phương án phù hợp nhất với sở thích của bạn để tiếp tục tinh chỉnh hoặc nhận tư vấn chuyên sâu.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className={`group rounded-3xl overflow-hidden bg-surface border transition-all duration-500 cursor-pointer shadow-2xl flex flex-col ${
              selectedDesign === suggestion.id
                ? 'neon-border scale-[1.02] -translate-y-2'
                : 'border-white/5 hover:neon-border hover:-translate-y-1'
            }`}
            onClick={() => onSelectDesign(suggestion.id)}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10"></div>
              <img
                src={suggestion.imageUrl}
                alt={suggestion.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-5 left-5 z-20">
                <span className="px-4 py-1.5 rounded-full bg-surface/80 backdrop-blur-md neon-border text-xs font-bold text-textMain shadow-lg tracking-wider uppercase">
                  {suggestion.budgetBadge}
                </span>
              </div>
              {selectedDesign === suggestion.id && (
                <div className="absolute inset-0 border-2 border-primary neon-box rounded-3xl pointer-events-none z-20 transition-all duration-300"></div>
              )}
            </div>
            <div className="p-8 flex-1 flex flex-col relative z-20 bg-gradient-to-b from-surface/50 to-surface">
              <h3 className="text-2xl font-sans font-bold text-textMain mb-4 group-hover:text-primary group-hover:neon-text transition-colors">{suggestion.title}</h3>
              <p className="text-textSoft text-base leading-relaxed mb-8 line-clamp-3 font-light flex-1">{suggestion.description}</p>
              <button
                className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 tracking-wide uppercase ${
                  selectedDesign === suggestion.id
                    ? 'bg-primary text-bg neon-box'
                    : 'bg-surfaceAlt text-textMain border border-white/10 group-hover:bg-primary/20 group-hover:neon-border'
                }`}
              >
                {selectedDesign === suggestion.id ? 'Đang Chọn Phương Án Này' : 'Chọn Phương Án Này'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedSuggestion && (
        <div className="bg-surface rounded-3xl p-8 md:p-12 neon-border shadow-2xl mt-16 animate-in fade-in slide-in-from-bottom-12 duration-700 relative overflow-hidden">
          <div className="flex items-center gap-4 mb-10 relative z-10">
            <Wand2 className="w-8 h-8 text-primary neon-text" />
            <h3 className="text-3xl font-sans font-bold text-textMain neon-text">Tinh Chỉnh Phương Án</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
            <div className="rounded-2xl overflow-hidden neon-border aspect-[4/3] shadow-2xl group relative">
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay pointer-events-none"></div>
              <img
                src={selectedSuggestion.imageUrl}
                alt="Selected"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="flex flex-col justify-between">
              <div className="bg-surfaceAlt/50 p-8 rounded-2xl neon-border mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <MessageSquareText className="w-6 h-6 text-primary neon-text mt-1 flex-shrink-0" />
                  <p className="text-textSoft leading-relaxed font-light text-lg">
                    Bạn có thể yêu cầu AI điều chỉnh chi tiết mặt tiền, màu sắc, vật liệu hoặc thêm bớt các yếu tố kiến trúc.
                  </p>
                </div>
                <textarea
                  className="w-full h-36 bg-surface border border-white/10 rounded-2xl p-5 text-textMain focus:ring-1 focus:ring-primary focus:neon-border outline-none transition-all resize-none mb-6 font-light placeholder:text-textMute text-lg"
                  placeholder="Ví dụ: đổi màu sơn mặt tiền, thêm lam trang trí, thay vật liệu ban công..."
                  value={editPrompt}
                  onChange={(e) => setEditPrompt(e.target.value)}
                ></textarea>
                <button
                  onClick={onEditDesign}
                  disabled={isEditing || !editPrompt.trim()}
                  className="w-full bg-primary hover:bg-primarySoft text-bg font-bold py-4 px-6 rounded-2xl neon-box transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide text-lg uppercase"
                >
                  {isEditing ? 'ĐANG CẬP NHẬT...' : 'CẬP NHẬT PHƯƠNG ÁN'}
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent flex-1 neon-box"></div>
                  <span className="text-xs font-bold text-textMute uppercase tracking-widest">Hoặc nhận tư vấn thực tế</span>
                  <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent flex-1 neon-box"></div>
                </div>
                <div className="flex flex-col sm:flex-row gap-5">
                  <a
                    href={COMPANY.zaloLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-zalo hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 text-center tracking-wide hover:-translate-y-1 uppercase"
                  >
                    Nhận Tư Vấn Từ KTS
                  </a>
                  <a
                    href={`tel:${COMPANY.hotline}`}
                    className="flex-1 bg-surfaceAlt hover:bg-white/10 neon-border text-textMain font-bold py-4 px-6 rounded-2xl transition-all duration-300 text-center tracking-wide hover:-translate-y-1 uppercase"
                  >
                    GỌI TƯ VẤN NGAY
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

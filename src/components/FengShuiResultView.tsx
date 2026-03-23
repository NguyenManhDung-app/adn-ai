import { Compass, Wind, Droplets, Flame, Mountain, TreePine } from 'lucide-react';
import { FengShuiResult } from '../types';

interface FengShuiResultViewProps {
  result: FengShuiResult;
}

export default function FengShuiResultView({ result }: FengShuiResultViewProps) {
  // Simple logic to pick an icon based on elements string (for visual flair)
  const getElementIcon = (elementsStr: string) => {
    const str = elementsStr.toLowerCase();
    if (str.includes('thủy')) return <Droplets className="w-8 h-8 text-primary neon-text" />;
    if (str.includes('hỏa')) return <Flame className="w-8 h-8 text-accent neon-text-accent" />;
    if (str.includes('thổ')) return <Mountain className="w-8 h-8 text-amber-500" />;
    if (str.includes('mộc')) return <TreePine className="w-8 h-8 text-emerald-400" />;
    if (str.includes('kim')) return <Wind className="w-8 h-8 text-slate-300" />;
    return <Compass className="w-8 h-8 text-primary neon-text" />;
  };

  return (
    <div className="mb-20">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-surfaceAlt neon-border mb-6">
          <Compass className="w-8 h-8 text-primary neon-text" />
        </div>
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-textMain tracking-tight mb-4 neon-text">Định Hướng Phong Thủy Sơ Bộ</h2>
        <p className="text-textSoft max-w-2xl mx-auto font-light text-lg">Phân tích dựa trên thông tin gia chủ, mang đến sự hài hòa giữa không gian sống và các yếu tố tự nhiên.</p>
      </div>

      <div className="bg-surface rounded-3xl p-6 md:p-10 neon-border shadow-2xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="p-8 rounded-2xl bg-surfaceAlt neon-border relative overflow-hidden group transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
              <Compass className="w-16 h-16 text-primary neon-text" />
            </div>
            <h4 className="text-xs font-bold text-primary neon-text uppercase tracking-widest mb-3">Hướng Nhà Đề Xuất</h4>
            <p className="text-3xl font-sans font-bold text-textMain">{result.direction}</p>
          </div>
          
          <div className="p-8 rounded-2xl bg-surfaceAlt neon-border-accent relative overflow-hidden group transition-colors">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
              {getElementIcon(result.elements)}
            </div>
            <h4 className="text-xs font-bold text-accent neon-text-accent uppercase tracking-widest mb-3">Yếu Tố Ngũ Hành</h4>
            <p className="text-3xl font-sans font-bold text-textMain">{result.elements}</p>
          </div>
        </div>
        
        <div className="lg:col-span-2 p-8 md:p-10 rounded-2xl bg-surfaceAlt neon-border relative">
          <h4 className="text-xl font-sans font-bold text-textMain mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-primary neon-box"></span>
            Lời khuyên từ chuyên gia
          </h4>
          <ul className="space-y-6">
            {result.advice.map((item, idx) => (
              <li key={idx} className="flex gap-4 text-textSoft leading-relaxed font-light text-lg">
                <span className="text-primary mt-1 flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary neon-box mt-2"></div>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

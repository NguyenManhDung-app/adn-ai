import { Sparkles, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surfaceAlt neon-border text-textSoft text-sm font-medium mb-8 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="neon-text">Kiến tạo không gian sống hoàn mỹ</span>
        </div>
        
        <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight mb-8 text-textMain leading-[1.1]">
          Kiến Tạo <span className="text-primary italic neon-text">Tương Lai</span>
        </h1>
        
        <p className="text-lg md:text-xl text-textSoft mb-12 leading-relaxed max-w-2xl mx-auto font-light">
          Khám phá giải pháp không gian tối ưu, kết hợp hài hòa giữa thẩm mỹ hiện đại và nguyên lý phong thủy Á Đông, được cá nhân hóa cho riêng bạn.
        </p>
      </div>
    </section>
  );
}

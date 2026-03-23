import { LayoutTemplate, Compass, Users } from 'lucide-react';

export default function InfoCard() {
  const features = [
    {
      icon: <LayoutTemplate className="w-6 h-6 text-primary neon-text" />,
      title: 'Gợi ý mặt tiền',
      desc: 'Nhận 3 phương án mặt tiền đề xuất phù hợp với loại hình và phong cách bạn chọn.'
    },
    {
      icon: <Compass className="w-6 h-6 text-accent neon-text-accent" />,
      title: 'Phân tích phong thủy',
      desc: 'Định hướng sơ bộ về hướng nhà, màu sắc và bố trí không gian theo tuổi gia chủ.'
    },
    {
      icon: <Users className="w-6 h-6 text-primary neon-text" />,
      title: 'Kết nối đội ngũ tư vấn',
      desc: 'Đội ngũ kiến trúc sư chuyên nghiệp sẵn sàng hỗ trợ khách hàng hoàn thiện hồ sơ thực tế.'
    }
  ];

  return (
    <div className="bg-surface rounded-3xl p-6 md:p-10 neon-border shadow-2xl h-full flex flex-col justify-center relative overflow-hidden">
      <h3 className="text-2xl md:text-3xl font-sans font-bold mb-10 text-textMain relative z-10 flex items-center gap-3">
        <span className="w-1.5 h-6 bg-accent rounded-full neon-box-accent"></span>
        Tư Vấn Sơ Bộ
      </h3>
      
      <div className="space-y-10 relative z-10">
        {features.map((feature, idx) => (
          <div key={idx} className="flex gap-5 group">
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-surfaceAlt border border-white/5 flex items-center justify-center group-hover:neon-border transition-all duration-300">
              {feature.icon}
            </div>
            <div>
              <h4 className="text-lg font-bold text-textMain mb-2 group-hover:neon-text transition-all">{feature.title}</h4>
              <p className="text-textSoft leading-relaxed">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-14 p-8 rounded-2xl bg-surfaceAlt neon-border relative overflow-hidden">
        <p className="text-textSoft italic relative z-10 font-sans text-lg leading-relaxed">
          "Chúng tôi tin rằng mỗi công trình là một tác phẩm nghệ thuật mang đậm dấu ấn cá nhân, kết hợp hài hòa giữa công năng, thẩm mỹ và phong thủy."
        </p>
      </div>
    </div>
  );
}

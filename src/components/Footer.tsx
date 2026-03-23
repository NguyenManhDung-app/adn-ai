export default function Footer() {
  return (
    <footer className="border-t border-primary/20 neon-box bg-surface/50 backdrop-blur-md py-16 mt-auto relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl font-sans font-bold tracking-tight text-textMain mb-4">
          A.D.N <span className="text-primary neon-text">AI</span>
        </h2>
        <p className="text-sm text-textSoft uppercase tracking-widest font-bold mb-12">
          Kiến Trúc • Nội Thất • Phong Thủy
        </p>
        
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="w-12 h-px bg-primary/50 neon-box"></div>
          <div className="w-2 h-2 rounded-full bg-primary neon-box"></div>
          <div className="w-12 h-px bg-primary/50 neon-box"></div>
        </div>
        
        <div className="text-xs text-textMute tracking-wider font-light">
          &copy; {new Date().getFullYear()} A.D.N KIẾN TRÚC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

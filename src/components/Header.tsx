import { COMPANY } from '../constants';

interface HeaderProps {
  onReset: () => void;
}

export default function Header({ onReset }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-bg/80 border-b border-primary/20 neon-box transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={onReset}>
          <div className="flex flex-col">
            <span className="text-2xl font-serif font-semibold tracking-tight text-primary neon-text group-hover:text-primarySoft transition-colors">A.D.N AI</span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-textSoft mt-0.5 group-hover:text-primary/70 transition-colors">
              KIẾN TRÚC • NỘI THẤT • XÂY DỰNG
            </span>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a
            href={COMPANY.zaloLink}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 rounded-full bg-surface transition-all duration-300 tracking-wide font-bold uppercase text-xs border border-[#0068FF] hover:bg-[#0068FF] hover:text-white"
            style={{ color: '#0068FF', boxShadow: '0 0 10px rgba(0, 104, 255, 0.3)' }}
          >
            Nhận Tư Vấn Từ KTS
          </a>
        </nav>
      </div>
    </header>
  );
}

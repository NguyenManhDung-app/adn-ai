import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  message: string;
}

export default function LoadingOverlay({ message }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 backdrop-blur-md">
      <div className="bg-surface/90 p-10 rounded-3xl border border-white/10 shadow-2xl max-w-sm w-full mx-4 text-center flex flex-col items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full animate-pulse"></div>
          <Loader2 className="w-14 h-14 text-primary animate-spin relative z-10" />
        </div>
        <h3 className="text-2xl font-serif font-semibold text-textMain mb-3 tracking-wide">A.D.N AI</h3>
        <p className="text-textSoft text-base leading-relaxed font-light">{message}</p>
      </div>
    </div>
  );
}

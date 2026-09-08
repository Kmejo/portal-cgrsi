import React from 'react';
import { ArrowUp, MessageSquare } from 'lucide-react';

interface FloatingWidgetsProps {
  onBackToTop: () => void;
}

export const FloatingWidgets: React.FC<FloatingWidgetsProps> = ({ onBackToTop }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* WhatsApp Floating Action Button */}
      <a
        href="https://wa.me/5352800000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        title="Atención inmediata vía WhatsApp"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all focus:outline-none"
      >
        <span className="absolute right-full mr-3 hidden sm:group-hover:inline-flex items-center whitespace-nowrap bg-[#1a212a] text-white font-heading text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-md pointer-events-none transition-all border border-gray-700">
          Atención WhatsApp (+53 5 280 0000)
        </span>
        <MessageSquare className="w-6 h-6 fill-current" />
      </a>

      {/* Back To Top Floating Action Button */}
      <button
        onClick={onBackToTop}
        aria-label="Volver al inicio"
        title="Volver arriba"
        className="w-12 h-12 rounded-full bg-[#d35400] hover:bg-[#a23f00] text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all focus:outline-none group border border-white/20"
      >
        <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
};

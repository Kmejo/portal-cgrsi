import React from 'react';
import { SiteContent } from '../../types';
import {
  Sliders,
  Calendar,
  ShieldCheck,
  Leaf,
  Scale,
  ArrowUp,
  Sparkles,
} from 'lucide-react';

interface AboutSectionProps {
  about: SiteContent['about'];
  onBackToTop: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  about,
  onBackToTop,
}) => {
  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'tune':
        return <Sliders className="w-5 h-5 text-[#fc7127]" />;
      case 'calendar_month':
        return <Calendar className="w-5 h-5 text-[#fc7127]" />;
      case 'health_and_safety':
        return <ShieldCheck className="w-5 h-5 text-[#fc7127]" />;
      default:
        return <Leaf className="w-5 h-5 text-[#fc7127]" />;
    }
  };

  return (
    <section
      id="nosotros"
      className="w-full bg-[#2f3640] text-white py-20 relative overflow-hidden border-b border-gray-700"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Identity Concept & Pillars (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#d35400] rotate-45 shrink-0" />
              <span className="font-heading font-bold text-xs uppercase text-[#fc7127] tracking-[0.16em]">
                {about.overline}
              </span>
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
              {about.title}
            </h2>

            <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed">
              {about.description}
            </p>

            {/* 4 Corporate Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {about.pillars.map((pillar) => (
                <div
                  key={pillar.id}
                  className="p-4 bg-[#1a212a] rounded-lg border border-gray-700/80 shadow-sm hover:border-[#fc7127]/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    {getPillarIcon(pillar.icon)}
                    <h4 className="font-heading font-bold text-sm text-white">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="font-sans text-xs text-gray-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Quality Blueprint Plate (6 cols) */}
          <div className="lg:col-span-6 bg-[#1a212a] p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-700 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <span className="font-heading font-bold text-xs uppercase text-[#fc7127] tracking-wider">
                Trazabilidad de Calidad CGR
              </span>
              <span className="font-mono text-xs text-gray-400">
                {about.mercantileRegistry}
              </span>
            </div>

            {/* Quality Metric Bar Graphs */}
            <div className="space-y-4">
              {about.qualityMetrics.map((qm) => (
                <div key={qm.id} className="space-y-1.5">
                  <div className="flex justify-between font-sans text-xs text-gray-300">
                    <span>{qm.label}</span>
                    <span className="font-mono font-bold text-[#fc7127]">
                      {qm.valueString}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#2f3640] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#d35400] to-[#fc7127] rounded-full"
                      style={{ width: `${qm.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Legal Mercantile Seal */}
            <div className="p-4 bg-[#2f3640] rounded-lg border border-gray-700 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#d35400] text-white flex items-center justify-center shrink-0 shadow-md">
                <Scale className="w-5 h-5" />
              </div>
              <p className="font-sans text-xs text-gray-300 leading-relaxed">
                Constituida conforme a la legislación mercantil para Sociedades de Responsabilidad Limitada Unipersonales (S.U.R.L.) especializadas en el sector técnico e industrial en Cuba.
              </p>
            </div>
          </div>
        </div>

        {/* Back to top anchor */}
        <div className="mt-12 flex justify-end pt-4 border-t border-gray-700">
          <button
            onClick={onBackToTop}
            className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-gray-400 hover:text-[#fc7127] transition-colors"
          >
            <ArrowUp className="w-4 h-4 text-[#fc7127]" />
            <span>Volver al Inicio</span>
          </button>
        </div>
      </div>
    </section>
  );
};

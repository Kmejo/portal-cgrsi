import React from 'react';
import { SiteContent } from '../../types';
import { Download, Wrench, CheckCircle2, ShieldCheck, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  content: SiteContent['hero'];
  onExploreServices: () => void;
  onExploreCatalog: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  content,
  onExploreServices,
  onExploreCatalog,
}) => {
  return (
    <section
      id="inicio"
      className="relative w-full bg-[#f9f9f9] overflow-hidden pt-32 pb-16 lg:pb-24 border-b border-gray-200"
    >
      {/* Precision Technical Micro-Grid Ambient */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#1a212a 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Narrative Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Hexagonal Marker & Overline */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-sm bg-[#d35400] text-white shadow-sm shrink-0">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <polygon points="12,1 22,6.8 22,17.2 12,23 2,17.2 2,6.8" />
                </svg>
              </span>
              <span className="font-heading font-bold text-xs uppercase tracking-[0.16em] text-[#d35400]">
                {content.badgeOverline}
              </span>
              <span className="w-8 h-[2px] bg-[#fc7127]" />
              <span className="font-sans font-semibold text-[11px] uppercase tracking-wider text-gray-500 hidden sm:inline">
                {content.standardLabel}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#1a212a] leading-[1.15] tracking-tight">
              {content.titleMain}
              <span className="text-[#d35400] underline decoration-[#fc7127]/40 decoration-4 underline-offset-4">
                {content.titleHighlight}
              </span>
            </h1>

            {/* Subtitle / Value Proposition */}
            <p className="font-sans text-base sm:text-lg text-gray-700 max-w-2xl leading-relaxed">
              {content.description}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#d35400] hover:bg-[#a23f00] text-white rounded font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg"
              >
                <Wrench className="w-4 h-4" />
                <span>Explorar Servicios</span>
              </button>

              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#2f3640] hover:bg-[#1a212a] text-white rounded font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg border border-gray-700"
              >
                <Download className="w-4 h-4 text-[#fc7127]" />
                <span>Descargar Catálogo 2025</span>
              </button>
            </div>

            {/* Key Performance & Trust Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-gray-200/80">
              {content.metrics.map((metric) => (
                <div
                  key={metric.id}
                  className="p-4 bg-white rounded border border-gray-200 shadow-sm hover:border-[#d35400]/40 transition-colors"
                >
                  <span
                    className={`font-heading font-extrabold text-2xl lg:text-3xl block leading-none ${
                      metric.highlightColor === 'secondary'
                        ? 'text-[#d35400]'
                        : 'text-[#1a212a]'
                    }`}
                  >
                    {metric.value}
                  </span>
                  <span className="font-sans text-[11px] font-bold text-gray-600 uppercase tracking-wide mt-1.5 block">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Media Display (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-[#2f3640] border border-gray-700">
              {/* Main Machine Facility Photographic View */}
              <img
                src={content.heroImage}
                alt="Inspección industrial de alta exigencia en CGR Soluciones Integrales"
                className="w-full h-[460px] object-cover mix-blend-luminosity opacity-95 transition-transform duration-700 hover:scale-105"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a212a] via-[#1a212a]/40 to-transparent pointer-events-none" />

              {/* Live Status Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#2f3640]/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-600 text-white">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
                    <span className="font-heading font-bold text-xs uppercase tracking-wider text-white">
                      {content.workshopStatus}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#fc7127] font-semibold uppercase tracking-wider">
                    {content.workshopLocation}
                  </span>
                </div>
                <p className="font-sans text-xs text-gray-300 mt-1.5 leading-relaxed">
                  {content.workshopNotice}
                </p>
              </div>
            </div>

            {/* Geometric Chamfered Certification Stamp */}
            <div className="hidden sm:flex absolute -top-3 -right-3 bg-[#d35400] text-white px-3.5 py-1.5 rounded shadow-lg items-center gap-2 border border-white/20">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span className="font-heading text-[10px] uppercase font-bold tracking-widest">
                CGR Soluciones Técnicas
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

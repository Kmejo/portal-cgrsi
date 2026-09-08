import React, { useState } from 'react';
import { ServiceItem } from '../../types';
import { TechnicalModal } from './TechnicalModal';
import {
  Wrench,
  Cpu,
  Flame,
  Truck,
  CheckCircle2,
  FileText,
  ArrowRight,
  ArrowUp,
} from 'lucide-react';

interface ServicesSectionProps {
  services: ServiceItem[];
  onRequestQuote: (serviceTitle: string) => void;
  onBackToTop: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onRequestQuote,
  onBackToTop,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'precision_manufacturing':
        return <Wrench className="w-7 h-7" />;
      case 'account_tree':
        return <Cpu className="w-7 h-7" />;
      case 'hardware':
        return <Flame className="w-7 h-7" />;
      default:
        return <Truck className="w-7 h-7" />;
    }
  };

  return (
    <section id="servicios" className="w-full bg-[#f3f3f3] py-20 border-b border-gray-200">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-[#d35400] rounded-full" />
              <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#d35400]">
                División de Ingeniería Especializada
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#1a212a]">
              Servicios Técnicos Industriales
            </h2>
            <p className="font-sans text-sm sm:text-base text-gray-600">
              Soluciones operativas llave en mano con metodologías predictivas, personal certificado y equipamiento calibrado.
            </p>
          </div>

          <button
            onClick={() => onRequestQuote('Diagnóstico Técnico General')}
            className="inline-flex items-center gap-2 font-heading font-bold text-xs uppercase tracking-wider text-[#d35400] hover:text-[#a23f00] transition-colors self-start md:self-auto"
          >
            <span>Solicitar Diagnóstico Técnico</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Technical Cards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => {
            const isDark = service.theme === 'dark';

            return (
              <div
                key={service.id}
                className={`p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden ${
                  isDark
                    ? 'bg-[#2f3640] text-white'
                    : 'bg-white text-[#1b1b1b] border border-gray-200'
                }`}
              >
                {/* Structural Chamfer Accent for Dark Cards */}
                {isDark && (
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#d35400]" />
                )}

                <div>
                  {/* Top Bar with Icon & Standard Code */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        isDark
                          ? 'bg-white/10 text-[#fc7127]'
                          : 'bg-[#1a212a] text-[#fc7127]'
                      }`}
                    >
                      {getServiceIcon(service.icon)}
                    </div>
                    <span
                      className={`font-mono text-[11px] uppercase tracking-widest px-2.5 py-1 rounded font-bold ${
                        isDark
                          ? 'bg-[#1a212a] text-gray-300'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {service.code} // {service.standard}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3
                    className={`font-heading font-bold text-lg sm:text-xl mb-2.5 ${
                      isDark ? 'text-white' : 'text-[#1a212a]'
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`font-sans text-xs sm:text-sm leading-relaxed mb-5 ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {service.description}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="space-y-2.5 font-sans text-xs sm:text-sm mb-6">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isDark ? 'text-[#fc7127]' : 'text-[#d35400]'
                          }`}
                        />
                        <span className={isDark ? 'text-gray-200' : 'text-gray-800'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* View Technical Procedure Sheet Button */}
                <button
                  onClick={() => setSelectedService(service)}
                  className={`w-full py-2.5 px-4 rounded font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm ${
                    isDark
                      ? 'bg-[#d35400] hover:bg-[#a23f00] text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-[#1a212a]'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Ver Ficha Técnica</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Back to top anchor */}
        <div className="mt-12 flex justify-end pt-4 border-t border-gray-300/80">
          <button
            onClick={onBackToTop}
            className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-gray-600 hover:text-[#d35400] transition-colors"
          >
            <ArrowUp className="w-4 h-4 text-[#d35400]" />
            <span>Volver al Inicio</span>
          </button>
        </div>
      </div>

      {/* Technical Sheet Modal */}
      {selectedService && (
        <TechnicalModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onSelectForQuote={onRequestQuote}
        />
      )}
    </section>
  );
};

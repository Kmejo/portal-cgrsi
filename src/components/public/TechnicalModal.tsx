import React from 'react';
import { ServiceItem } from '../../types';
import { X, CheckCircle2, FileText, ArrowRight, Shield } from 'lucide-react';

interface TechnicalModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectForQuote: (serviceTitle: string) => void;
}

export const TechnicalModal: React.FC<TechnicalModalProps> = ({
  service,
  onClose,
  onSelectForQuote,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#1a212a]/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-xl w-full rounded-xl shadow-2xl p-6 sm:p-8 space-y-5 border border-gray-200 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#d35400] rounded-sm" />
              <span className="font-mono text-xs font-bold text-[#d35400] tracking-wider uppercase">
                {service.code} // {service.standard}
              </span>
            </div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-[#1a212a]">
              Ficha Técnica: {service.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description & Scope points */}
        <div className="space-y-4 text-sm text-gray-700">
          <p className="leading-relaxed bg-gray-50 p-3 rounded border border-gray-200/60 font-sans text-xs sm:text-sm">
            {service.description}
          </p>

          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#1a212a] mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#d35400]" />
              <span>{service.technicalSpecs.scopeTitle}</span>
            </h4>
            <ul className="space-y-2 font-sans text-xs sm:text-sm">
              {service.technicalSpecs.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d35400] shrink-0 mt-0.5" />
                  <span className="text-gray-800">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Standards & Compliance Seal */}
          <div className="p-3 bg-[#1a212a] text-white rounded flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#fc7127] shrink-0" />
            <div className="text-[11px] leading-tight">
              <span className="font-bold text-[#fc7127] uppercase tracking-wider block">
                Certificación Operativa S.U.R.L.
              </span>
              <span>Procedimiento ejecutado bajo protocolos estandarizados con entrega de informe técnico rubricado.</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-2 flex flex-wrap justify-end gap-2 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded font-heading font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Cerrar
          </button>
          <button
            onClick={() => {
              onSelectForQuote(service.title);
              onClose();
            }}
            className="px-5 py-2 bg-[#d35400] hover:bg-[#a23f00] text-white rounded font-heading font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-sm"
          >
            <span>Solicitar este Servicio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

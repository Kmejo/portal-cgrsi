import React from 'react';
import { SiteContent } from '../../types';
import {
  MapPin,
  Clock,
  Truck,
  ShieldAlert,
  ArrowUp,
  ArrowRight,
} from 'lucide-react';

interface LocationSectionProps {
  location: SiteContent['location'];
  onScheduleVisit: () => void;
  onBackToTop: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  location,
  onScheduleVisit,
  onBackToTop,
}) => {
  return (
    <section id="ubicacion" className="w-full bg-[#eeeeee] py-20 border-b border-gray-300">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#d35400]">
            Infraestructura & Despliegue
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#1a212a]">
            Ubicación y Cobertura Operativa
          </h2>
          <p className="font-sans text-sm sm:text-base text-gray-600">
            Sede central de ingeniería, talleres de maquinado y bases logísticas estratégicas para atención a proyectos en toda la isla.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive Map Visual (8 cols) */}
          <div className="lg:col-span-8 rounded-xl overflow-hidden shadow-md bg-white border border-gray-200 flex flex-col justify-between">
            <div
              className="w-full h-[380px] bg-cover bg-center relative"
              style={{ backgroundImage: `url(${location.mapImageUrl})` }}
            >
              {/* Map Floating Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm p-4 bg-[#1a212a]/95 backdrop-blur-md rounded-lg text-white shadow-xl border border-gray-700">
                <div className="flex items-center gap-2 mb-1.5">
                  <MapPin className="w-4 h-4 text-[#fc7127]" />
                  <span className="font-heading font-bold text-xs uppercase tracking-wider text-white">
                    Sede Central & Taller CGR
                  </span>
                </div>
                <p className="font-sans text-xs text-gray-300 leading-relaxed">
                  {location.address}, {location.city}.
                </p>
              </div>
            </div>

            {/* Bases & Speed of Response Strip */}
            <div className="p-4 bg-white border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 text-xs font-sans">
                {location.bases.map((base) => (
                  <span key={base.id} className="flex items-center gap-1.5 text-gray-700">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        base.type.includes('Occidental')
                          ? 'bg-[#d35400]'
                          : 'bg-[#2f3640]'
                      }`}
                    />
                    <strong className="font-semibold">{base.name}</strong>
                  </span>
                ))}
              </div>
              <span className="font-mono text-[11px] text-[#d35400] font-bold uppercase tracking-wider">
                Tiempos de respuesta: ≤ 24h a nivel nacional
              </span>
            </div>
          </div>

          {/* Operation & Logistics Details (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-200 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-lg text-[#1a212a]">
                Detalles de Operación
              </h3>

              {/* Office & Workshop Hours */}
              <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-200/80 space-y-1">
                <div className="flex items-center gap-2 text-[#d35400] mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="font-heading font-bold text-xs uppercase tracking-wider">
                    Horario de Talleres & Oficina
                  </span>
                </div>
                <p className="font-sans text-xs text-gray-800 font-semibold">
                  {location.scheduleWeekday}
                </p>
                <p className="font-sans text-xs text-gray-500">
                  {location.scheduleSaturday}
                </p>
              </div>

              {/* Contingency Watch 24/7 */}
              <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-200/80 space-y-1">
                <div className="flex items-center gap-2 text-[#d35400] mb-1">
                  <ShieldAlert className="w-4 h-4" />
                  <span className="font-heading font-bold text-xs uppercase tracking-wider">
                    Guardia de Contingencia
                  </span>
                </div>
                <p className="font-sans text-xs text-gray-800 font-semibold">
                  Servicio 24 Horas / 365 Días
                </p>
                <p className="font-sans text-xs text-gray-500">
                  {location.contingencyNotice}
                </p>
              </div>

              {/* Heavy Crane Logistics */}
              <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-200/80 space-y-1">
                <div className="flex items-center gap-2 text-[#d35400] mb-1">
                  <Truck className="w-4 h-4" />
                  <span className="font-heading font-bold text-xs uppercase tracking-wider">
                    Acceso y Descarga Pesada
                  </span>
                </div>
                <p className="font-sans text-xs text-gray-600">
                  {location.craneNotice}
                </p>
              </div>
            </div>

            <button
              onClick={onScheduleVisit}
              className="w-full py-3 px-4 bg-[#1a212a] hover:bg-[#2f3640] text-white rounded font-heading font-bold text-xs uppercase tracking-wider text-center transition-all shadow flex items-center justify-center gap-2"
            >
              <span>Coordinar Visita Técnica</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#fc7127]" />
            </button>
          </div>
        </div>

        {/* Back to top anchor */}
        <div className="mt-12 flex justify-end pt-4 border-t border-gray-300">
          <button
            onClick={onBackToTop}
            className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-gray-600 hover:text-[#d35400] transition-colors"
          >
            <ArrowUp className="w-4 h-4 text-[#d35400]" />
            <span>Volver al Inicio</span>
          </button>
        </div>
      </div>
    </section>
  );
};

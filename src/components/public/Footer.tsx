import React from 'react';
import { CgrLogo } from '../CgrLogo';
import {
  ChevronRight,
  ShieldCheck,
  MapPin,
  Globe,
  Share2,
  Camera,
  MessageSquare,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#1a212a] text-white border-t border-gray-800">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Certification */}
          <div className="space-y-4">
            <div className="bg-white p-2.5 rounded inline-block shadow-md">
              <CgrLogo size="sm" />
            </div>
            <p className="font-sans text-xs text-gray-400 leading-relaxed">
              Soluciones técnicas industriales, automatización, ingeniería civil y suministros de alta exigencia para proyectos estratégicos corporativos y estatales.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-gray-300">
              <ShieldCheck className="w-5 h-5 text-[#fc7127] shrink-0" />
              <span className="font-sans font-medium">
                Certificación de Calidad & Respaldo Técnico DIN/ISO
              </span>
            </div>
          </div>

          {/* Column 2: Fast Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2 font-sans text-xs text-gray-400">
              <li>
                <button
                  onClick={() => onNavigate('inicio')}
                  className="flex items-center gap-1 hover:text-[#fc7127] transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#fc7127]" />
                  <span>Inicio Corporativo</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('nosotros')}
                  className="flex items-center gap-1 hover:text-[#fc7127] transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#fc7127]" />
                  <span>Perfil Institucional & Pilares</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('servicios')}
                  className="flex items-center gap-1 hover:text-[#fc7127] transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#fc7127]" />
                  <span>Servicios de Ingeniería</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('productos')}
                  className="flex items-center gap-1 hover:text-[#fc7127] transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#fc7127]" />
                  <span>Catálogo de Suministros</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="flex items-center gap-1 hover:text-[#fc7127] transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#fc7127]" />
                  <span>Casos de Éxito & Blog</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contacto')}
                  className="flex items-center gap-1 hover:text-[#fc7127] transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#fc7127]" />
                  <span>Plataforma de Cotización</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Fiscal Address & Sede */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Dirección Fiscal & Sede
            </h4>
            <p className="font-sans text-xs text-gray-400 leading-relaxed">
              Calle Industrial No. 402, Zona de Desarrollo Empresarial, La Habana, Cuba.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <MapPin className="w-4 h-4 text-[#fc7127]" />
              <button
                onClick={() => onNavigate('ubicacion')}
                className="hover:text-white underline text-left"
              >
                Ver mapa y coordenadas de acceso
              </button>
            </div>
            <div className="mt-3 p-3 bg-[#2f3640] rounded-lg border border-gray-700 space-y-1 text-xs">
              <span className="font-heading font-bold text-[10px] uppercase text-[#fc7127] block">
                Canales Directos
              </span>
              <p className="font-mono text-gray-200">Centralita: +53 7 830 0000</p>
              <p className="font-mono text-gray-400">Guardia Técnica: +53 5 280 0000</p>
            </div>
          </div>

          {/* Column 4: Official Networks */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Conectividad y Redes
            </h4>
            <p className="font-sans text-xs text-gray-400 leading-relaxed">
              Siga nuestras licitaciones, reportes técnicos y avances de obra en plataformas oficiales.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
                className="w-9 h-9 rounded-lg bg-[#2f3640] hover:bg-[#d35400] flex items-center justify-center text-white transition-colors"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                title="Facebook"
                className="w-9 h-9 rounded-lg bg-[#2f3640] hover:bg-[#d35400] flex items-center justify-center text-white transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                title="Instagram"
                className="w-9 h-9 rounded-lg bg-[#2f3640] hover:bg-[#d35400] flex items-center justify-center text-white transition-colors"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/5352800000"
                target="_blank"
                rel="noreferrer"
                title="WhatsApp Comercial"
                className="w-9 h-9 rounded-lg bg-[#2f3640] hover:bg-[#25D366] flex items-center justify-center text-white transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-sans">
          <p>© 2025 CGR Soluciones Integrales S.U.R.L. Todos los derechos reservados. Registro Mercantil Oficial #94820-CU.</p>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="hover:text-gray-300 transition-colors">Términos y Condiciones</span>
            <span className="text-gray-700">|</span>
            <span className="hover:text-gray-300 transition-colors">Privacidad y Cumplimiento Legal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

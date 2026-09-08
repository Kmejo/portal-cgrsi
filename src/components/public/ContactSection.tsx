import React, { useState, useEffect } from 'react';
import { QuoteRequest } from '../../types';
import {
  Send,
  Phone,
  MessageSquare,
  Mail,
  Building,
  CheckCircle2,
  ArrowUp,
  Share2,
  Youtube,
  Globe,
  Camera,
} from 'lucide-react';

interface ContactSectionProps {
  initialService?: string;
  initialMessage?: string;
  onSubmitQuote: (quote: Omit<QuoteRequest, 'id' | 'date' | 'status'>) => void;
  onBackToTop: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService = 'Mantenimiento Mecánico e Industrial',
  initialMessage = '',
  onSubmitQuote,
  onBackToTop,
}) => {
  const [clientName, setClientName] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [serviceType, setServiceType] = useState(initialService);
  const [clientMessage, setClientMessage] = useState(initialMessage);
  const [ndaAgreed, setNdaAgreed] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) {
      setServiceType(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    if (initialMessage) {
      setClientMessage(initialMessage);
    }
  }, [initialMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitQuote({
      clientName,
      clientCompany,
      clientPhone,
      clientEmail,
      serviceType,
      message: clientMessage,
      ndaAgreed,
    });

    setSubmitted(true);
    setTimeout(() => {
      setClientName('');
      setClientCompany('');
      setClientPhone('');
      setClientEmail('');
      setClientMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contacto" className="w-full bg-white py-20 border-b border-gray-200">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Cotización Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#f9f9f9] p-6 sm:p-10 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div className="space-y-1.5">
              <span className="font-heading font-bold text-xs uppercase text-[#d35400] tracking-wider">
                Atención Empresarial B2B
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1a212a]">
                Solicitud de Cotización
              </h2>
              <p className="font-sans text-xs sm:text-sm text-gray-600">
                Complete los datos de su requerimiento. Un ingeniero especialista de CGR responderá en un plazo máximo de 12 horas hábiles.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-sans text-xs uppercase font-bold text-gray-700">
                    Nombre y Apellidos *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ing. Carlos Menéndez"
                    className="w-full h-10 px-3.5 bg-white border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#d35400]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-sans text-xs uppercase font-bold text-gray-700">
                    Empresa / Razón Social *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    placeholder="Empresa Mixta / Entidad Estatal"
                    className="w-full h-10 px-3.5 bg-white border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#d35400]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-sans text-xs uppercase font-bold text-gray-700">
                    Teléfono de Contacto *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+53 5 XXX XXXX"
                    className="w-full h-10 px-3.5 bg-white border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#d35400]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-sans text-xs uppercase font-bold text-gray-700">
                    Correo Corporativo *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="contacto@empresa.cu"
                    className="w-full h-10 px-3.5 bg-white border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#d35400]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-sans text-xs uppercase font-bold text-gray-700">
                  Tipo de Servicio o Suministro Requerido *
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full h-10 px-3.5 bg-white border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#d35400]"
                >
                  <option value="Mantenimiento Mecánico e Industrial">Mantenimiento Mecánico e Industrial</option>
                  <option value="Montaje y Automatización de Procesos">Montaje y Automatización de Procesos</option>
                  <option value="Ingeniería Estructural y Soldadura Homologada">Ingeniería Estructural y Soldadura Homologada</option>
                  <option value="Suministro Técnico & Logística Industrial">Suministro Técnico & Logística Industrial</option>
                  <option value="Cotización de Productos del Catálogo">Cotización de Productos del Catálogo</option>
                  <option value="Consultoría / Proyecto Integral">Consultoría / Proyecto Integral</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-sans text-xs uppercase font-bold text-gray-700">
                  Detalle del Requerimiento Técnico / Alcance *
                </label>
                <textarea
                  required
                  rows={4}
                  value={clientMessage}
                  onChange={(e) => setClientMessage(e.target.value)}
                  placeholder="Indique parámetros de operación, especificaciones de los equipos, plazos deseados y normas requeridas..."
                  className="w-full p-3.5 bg-white border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#d35400]"
                />
              </div>

              {/* NDA Toggle */}
              <div className="flex items-center gap-2.5 text-gray-700 font-sans">
                <input
                  type="checkbox"
                  id="nda-agree"
                  checked={ndaAgreed}
                  onChange={(e) => setNdaAgreed(e.target.checked)}
                  className="w-4 h-4 rounded text-[#d35400] focus:ring-[#d35400] accent-[#d35400]"
                />
                <label htmlFor="nda-agree" className="text-xs select-none">
                  Solicito acuerdo de confidencialidad técnico previo al intercambio de planos.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#d35400] hover:bg-[#a23f00] text-white rounded font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Solicitud Formal de Cotización</span>
              </button>

              {submitted && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded text-center text-xs font-semibold text-emerald-800 flex items-center justify-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>¡Solicitud recibida! Se ha generado el ticket técnico y notificado a nuestros ingenieros.</span>
                </div>
              )}
            </form>
          </div>

          {/* Direct Contact & Social Channels (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Immediate Contact Panel */}
            <div className="bg-[#1a212a] text-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-800 space-y-5">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#fc7127]" />
                <h3 className="font-heading font-bold text-lg text-white">
                  Contacto Inmediato
                </h3>
              </div>
              <p className="font-sans text-xs text-gray-300 leading-relaxed">
                Comuníquese directamente con nuestra jefatura técnica y despachos logísticos.
              </p>

              <div className="space-y-3.5 font-sans text-xs">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#fc7127] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-heading text-[10px] uppercase text-gray-400 block font-bold">
                      Centralita Comercial
                    </span>
                    <a href="tel:+5378300000" className="text-white font-mono font-bold hover:text-[#fc7127]">
                      +53 7 830 0000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 text-[#fc7127] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-heading text-[10px] uppercase text-gray-400 block font-bold">
                      WhatsApp Operaciones
                    </span>
                    <a
                      href="https://wa.me/5352800000"
                      target="_blank"
                      rel="noreferrer"
                      className="text-white font-mono font-bold hover:text-[#fc7127]"
                    >
                      +53 5 280 0000 (Chat Activo)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#fc7127] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-heading text-[10px] uppercase text-gray-400 block font-bold">
                      Correo Electrónico Oficial
                    </span>
                    <a href="mailto:contacto@cgrsoluciones.cu" className="text-white font-semibold hover:text-[#fc7127]">
                      contacto@cgrsoluciones.cu
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building className="w-4 h-4 text-[#fc7127] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-heading text-[10px] uppercase text-gray-400 block font-bold">
                      Atención a Licitaciones
                    </span>
                    <span className="text-white font-semibold">
                      licitaciones@cgrsoluciones.cu
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Social Channels Plate */}
            <div className="bg-[#f9f9f9] p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div>
                <span className="font-heading font-bold text-xs uppercase text-[#d35400] tracking-wider block mb-1">
                  Comunidad & Transparencia
                </span>
                <h3 className="font-heading font-bold text-base sm:text-lg text-[#1a212a]">
                  Síganos en nuestras redes oficiales
                </h3>
                <p className="font-sans text-xs text-gray-600 mt-1">
                  Reportes técnicos, videos de intervenciones mecánicas y novedades en insumos industriales.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 p-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors group"
                >
                  <div className="w-8 h-8 rounded bg-[#1a212a] text-white flex items-center justify-center group-hover:bg-[#d35400] transition-colors">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading font-bold text-xs text-[#1a212a]">LinkedIn</span>
                    <span className="text-[10px] text-gray-500 uppercase">Perfil Corporativo</span>
                  </div>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 p-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors group"
                >
                  <div className="w-8 h-8 rounded bg-[#1a212a] text-white flex items-center justify-center group-hover:bg-[#d35400] transition-colors">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading font-bold text-xs text-[#1a212a]">Facebook</span>
                    <span className="text-[10px] text-gray-500 uppercase">@cgrsoluciones</span>
                  </div>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 p-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors group"
                >
                  <div className="w-8 h-8 rounded bg-[#1a212a] text-white flex items-center justify-center group-hover:bg-[#d35400] transition-colors">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading font-bold text-xs text-[#1a212a]">Instagram</span>
                    <span className="text-[10px] text-gray-500 uppercase">@cgr.ingenieria</span>
                  </div>
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 p-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors group"
                >
                  <div className="w-8 h-8 rounded bg-[#1a212a] text-white flex items-center justify-center group-hover:bg-[#d35400] transition-colors">
                    <Youtube className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading font-bold text-xs text-[#1a212a]">YouTube</span>
                    <span className="text-[10px] text-gray-500 uppercase">Canal de Montajes</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/5352800000"
                  target="_blank"
                  rel="noreferrer"
                  className="col-span-1 sm:col-span-2 flex items-center gap-3 p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 rounded bg-[#25D366] text-white flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading font-bold text-xs text-emerald-900">Canal Oficial WhatsApp CGR</span>
                    <span className="text-[10px] text-emerald-700">Consultas técnicas y pedidos directos en tiempo real (+53 5 280 0000)</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Back to top anchor */}
        <div className="mt-12 flex justify-end pt-4 border-t border-gray-200">
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

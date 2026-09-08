import React, { useState } from 'react';
import { QuoteRequest } from '../../types';
import {
  Inbox,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  Clock,
  Archive,
  ShieldCheck,
  Search,
} from 'lucide-react';

interface AdminQuoteInboxProps {
  quotes: QuoteRequest[];
  onUpdateQuoteStatus: (id: string, status: QuoteRequest['status']) => void;
}

export const AdminQuoteInbox: React.FC<AdminQuoteInboxProps> = ({
  quotes,
  onUpdateQuoteStatus,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [search, setSearch] = useState('');

  const filtered = quotes.filter((q) => {
    const matchStatus = filterStatus === 'todos' || q.status === filterStatus;
    const matchSearch =
      q.clientName.toLowerCase().includes(search.toLowerCase()) ||
      q.clientCompany.toLowerCase().includes(search.toLowerCase()) ||
      q.serviceType.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const getStatusBadge = (status: QuoteRequest['status']) => {
    switch (status) {
      case 'Pendiente':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'En Revisión':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Cotizado':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Archivado':
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-[#1a212a] flex items-center gap-2">
            <Inbox className="w-5 h-5 text-[#d35400]" />
            <span>Bandeja de Solicitudes de Cotización B2B ({quotes.length})</span>
          </h2>
          <p className="font-sans text-xs text-gray-500 mt-1">
            Gestión técnica y comercial de requerimientos ingresados por entidades estatales, industrias y clientes corporativos.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por cliente o empresa..."
              className="pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:ring-1 focus:ring-[#d35400]"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 font-semibold text-gray-700"
          >
            <option value="todos">Todos los Estados</option>
            <option value="Pendiente">Pendientes</option>
            <option value="En Revisión">En Revisión</option>
            <option value="Cotizado">Cotizados</option>
            <option value="Archivado">Archivados</option>
          </select>
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border border-gray-200 text-gray-500 text-xs font-sans">
            No se encontraron cotizaciones con el filtro seleccionado.
          </div>
        ) : (
          filtered.map((quote) => (
            <div
              key={quote.id}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 hover:border-gray-300 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-100 pb-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getStatusBadge(
                      quote.status
                    )}`}
                  >
                    {quote.status.replace('_', ' ')}
                  </span>
                  <h3 className="font-heading font-bold text-base text-[#1a212a]">
                    {quote.clientCompany}
                  </h3>
                  <span className="text-xs text-gray-500 font-sans">
                    — {quote.clientName}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-sans text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {quote.date}
                  </span>
                  {quote.ndaAgreed && (
                    <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      NDA Solicitado
                    </span>
                  )}
                </div>
              </div>

              {/* Service Requested & Message */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#d35400] block">
                  Requerimiento: {quote.serviceType}
                </span>
                <p className="font-sans text-xs sm:text-sm text-gray-700 bg-gray-50 p-3.5 rounded-lg border border-gray-200/80 leading-relaxed whitespace-pre-line">
                  {quote.message}
                </p>
              </div>

              {/* Contact Info & Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-gray-100">
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-600">
                  <a
                    href={`mailto:${quote.clientEmail}`}
                    className="flex items-center gap-1.5 hover:text-[#d35400]"
                  >
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <span>{quote.clientEmail}</span>
                  </a>
                  <a
                    href={`tel:${quote.clientPhone}`}
                    className="flex items-center gap-1.5 hover:text-[#d35400]"
                  >
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span>{quote.clientPhone}</span>
                  </a>
                </div>

                {/* Status Switcher Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateQuoteStatus(quote.id, 'En Revisión')}
                    className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded text-xs font-heading font-bold uppercase transition-colors"
                  >
                    En Revisión
                  </button>
                  <button
                    onClick={() => onUpdateQuoteStatus(quote.id, 'Cotizado')}
                    className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded text-xs font-heading font-bold uppercase transition-colors"
                  >
                    Cotizado
                  </button>
                  <button
                    onClick={() => onUpdateQuoteStatus(quote.id, 'Archivado')}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-heading font-bold uppercase transition-colors"
                  >
                    Archivar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

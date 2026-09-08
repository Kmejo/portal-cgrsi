import React, { useState } from 'react';
import { VersionSnapshot, SiteContent } from '../../types';
import {
  GitBranch,
  RotateCcw,
  Plus,
  CheckCircle2,
  Clock,
  User,
  Layers,
  ArrowRight,
  ShieldCheck,
  Eye,
  FileCode,
} from 'lucide-react';

interface AdminVersionControlProps {
  snapshots: VersionSnapshot[];
  currentContent: SiteContent;
  onCreateSnapshot: (versionTag: string, message: string, changes: string[]) => void;
  onRestoreSnapshot: (snapshot: VersionSnapshot) => void;
}

export const AdminVersionControl: React.FC<AdminVersionControlProps> = ({
  snapshots,
  currentContent,
  onCreateSnapshot,
  onRestoreSnapshot,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newVersionTag, setNewVersionTag] = useState('v1.2.0');
  const [newCommitMessage, setNewCommitMessage] = useState('');
  const [newChanges, setNewChanges] = useState('');
  const [inspectingSnapshot, setInspectingSnapshot] = useState<VersionSnapshot | null>(
    null
  );

  const canManage = true;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const changesArray = newChanges
      .split('\n')
      .map((c) => c.trim())
      .filter(Boolean);

    onCreateSnapshot(
      newVersionTag,
      newCommitMessage || 'Actualización de contenidos del portal',
      changesArray.length > 0
        ? changesArray
        : ['Ajustes generales en contenidos del portal corporativo']
    );

    setShowCreateModal(false);
    setNewCommitMessage('');
    setNewChanges('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-[#1a212a] flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-[#d35400]" />
            <span>Control de Versiones Avanzado & Rollback</span>
          </h2>
          <p className="font-sans text-xs text-gray-500 mt-1">
            Historial de versiones auditadas, trazabilidad de autoría y reversión instantánea ante desvíos operativos.
          </p>
        </div>

        {canManage && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 bg-[#d35400] hover:bg-[#a23f00] text-white rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Snapshot de Versión</span>
          </button>
        )}
      </div>

      {/* Snapshots Timeline Grid */}
      <div className="space-y-4">
        {snapshots.map((snap) => (
          <div
            key={snap.id}
            className={`p-6 rounded-xl border transition-all ${
              snap.isActive
                ? 'bg-orange-50/20 border-[#d35400] shadow-sm'
                : 'bg-white border-gray-200 shadow-sm hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <span
                  className={`font-mono text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                    snap.isActive
                      ? 'bg-[#d35400] text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {snap.versionNumber}
                </span>

                {snap.isActive && (
                  <span className="text-xs font-bold text-[#d35400] flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Versión Activa en Producción
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500 font-sans">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  {snap.timestamp}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  {snap.author}
                </span>
              </div>
            </div>

            <p className="font-heading font-semibold text-sm text-[#1a212a] mb-3">
              "{snap.commitMessage}"
            </p>

            <div className="space-y-1 mb-4">
              <span className="text-[11px] font-bold uppercase text-gray-500 block">
                Resumen de Cambios:
              </span>
              <ul className="list-disc pl-5 space-y-0.5 text-xs text-gray-700 font-sans">
                {snap.changesSummary.map((ch, idx) => (
                  <li key={idx}>{ch}</li>
                ))}
              </ul>
            </div>

            {/* Version Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <button
                onClick={() => setInspectingSnapshot(snap)}
                className="text-xs font-bold text-gray-600 hover:text-[#1a212a] flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-gray-400" />
                <span>Inspeccionar Contenido de Versión</span>
              </button>

              {canManage && !snap.isActive && (
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        `¿Confirmas restaurar el portal a la versión ${snap.versionNumber}? Los contenidos actuales se sustituirán de inmediato.`
                      )
                    ) {
                      onRestoreSnapshot(snap);
                    }
                  }}
                  className="px-4 py-1.5 bg-[#1a212a] hover:bg-[#2f3640] text-white rounded font-heading font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#fc7127]" />
                  <span>Restaurar (Rollback)</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Snapshot Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-xl shadow-2xl p-6 border border-gray-200 space-y-4">
            <h3 className="font-heading font-bold text-base text-[#1a212a] flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-[#d35400]" />
              <span>Generar Nuevo Snapshot de Producción</span>
            </h3>
            <p className="text-xs text-gray-500">
              Captura el estado completo de textos, catálogo, imágenes y blog para preservarlo en el historial inmutable.
            </p>

            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-700">
                  Etiqueta de Versión
                </label>
                <input
                  type="text"
                  required
                  value={newVersionTag}
                  onChange={(e) => setNewVersionTag(e.target.value)}
                  placeholder="v1.2.0"
                  className="w-full h-9 px-3 bg-gray-50 border border-gray-300 rounded text-xs font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-700">
                  Mensaje del Commit / Despliegue *
                </label>
                <input
                  type="text"
                  required
                  value={newCommitMessage}
                  onChange={(e) => setNewCommitMessage(e.target.value)}
                  placeholder="Ej: Inclusión de rodamientos DIN 625 y revisión de teléfonos de guardia..."
                  className="w-full h-9 px-3 bg-gray-50 border border-gray-300 rounded text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-700">
                  Puntos Clave del Cambio (Uno por línea)
                </label>
                <textarea
                  rows={3}
                  value={newChanges}
                  onChange={(e) => setNewChanges(e.target.value)}
                  placeholder="Ajuste de textos en Hero&#10;Actualización de 2 fichas de servicio"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded text-xs font-sans"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded text-xs font-heading font-bold uppercase"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#d35400] text-white rounded text-xs font-heading font-bold uppercase hover:bg-[#a23f00] shadow"
                >
                  Guardar Snapshot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Snapshot Content Inspector Modal */}
      {inspectingSnapshot && (
        <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-xl shadow-2xl p-6 border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h4 className="font-heading font-bold text-base text-[#1a212a]">
                  Inspección de Snapshot: {inspectingSnapshot.versionNumber}
                </h4>
                <span className="text-xs text-gray-500">
                  Creado el {inspectingSnapshot.timestamp} por {inspectingSnapshot.author}
                </span>
              </div>
              <button
                onClick={() => setInspectingSnapshot(null)}
                className="text-xs text-gray-500 hover:text-gray-900 font-bold"
              >
                Cerrar
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-700">
              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                <span className="font-bold uppercase block mb-1 text-[#d35400]">
                  Título Hero en esta versión:
                </span>
                <p className="font-sans">
                  {inspectingSnapshot.data.hero.titleMain}{' '}
                  <strong>{inspectingSnapshot.data.hero.titleHighlight}</strong>
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                <span className="font-bold uppercase block mb-1 text-[#d35400]">
                  Servicios Registrados ({inspectingSnapshot.data.services.length}):
                </span>
                <ul className="list-disc pl-5 space-y-0.5">
                  {inspectingSnapshot.data.services.map((s) => (
                    <li key={s.id}>
                      {s.code}: {s.title} ({s.standard})
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                <span className="font-bold uppercase block mb-1 text-[#d35400]">
                  Productos en Catálogo ({inspectingSnapshot.data.products.length}):
                </span>
                <ul className="list-disc pl-5 space-y-0.5">
                  {inspectingSnapshot.data.products.map((p) => (
                    <li key={p.id}>
                      {p.sku} — {p.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t">
              <button
                onClick={() => setInspectingSnapshot(null)}
                className="px-4 py-2 bg-[#1a212a] text-white rounded text-xs font-heading font-bold uppercase"
              >
                Cerrar Inspección
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

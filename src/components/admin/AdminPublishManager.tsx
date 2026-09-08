import React, { useState, useRef } from 'react';
import { SiteContent } from '../../types';
import { INITIAL_SITE_CONTENT } from '../../data/initialContent';
import {
  Upload,
  Download,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  FileJson,
  Copy,
  ExternalLink,
  Layers,
  Sparkles,
  RefreshCw,
  Eye,
  Check,
  Zap,
  Globe,
  Archive,
  ArrowRight,
} from 'lucide-react';

interface AdminPublishManagerProps {
  draftContent: SiteContent;
  publishedContent: SiteContent;
  autoPublish: boolean;
  onToggleAutoPublish: (val: boolean) => void;
  onPublishChanges: () => void;
  onDiscardDraft: () => void;
  onImportData: (data: SiteContent) => void;
  onResetDefaultData: () => void;
  onCreateSnapshot: (versionTag: string, msg: string, changes: string[]) => void;
}

export const AdminPublishManager: React.FC<AdminPublishManagerProps> = ({
  draftContent,
  publishedContent,
  autoPublish,
  onToggleAutoPublish,
  onPublishChanges,
  onDiscardDraft,
  onImportData,
  onResetDefaultData,
  onCreateSnapshot,
}) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const [showJsonViewer, setShowJsonViewer] = useState(false);
  const [snapshotName, setSnapshotName] = useState('');
  const [showSnapshotSuccess, setShowSnapshotSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check differences between draft and published
  const isDraftDifferent =
    JSON.stringify(draftContent) !== JSON.stringify(publishedContent);

  const detectChangedSections = () => {
    const changes: string[] = [];
    if (JSON.stringify(draftContent.hero) !== JSON.stringify(publishedContent.hero)) {
      changes.push('Sección Inicio / Hero');
    }
    if (
      JSON.stringify(draftContent.services) !==
      JSON.stringify(publishedContent.services)
    ) {
      changes.push(
        `Servicios Industriales (${draftContent.services.length} elementos)`
      );
    }
    if (
      JSON.stringify(draftContent.products) !==
      JSON.stringify(publishedContent.products)
    ) {
      changes.push(
        `Catálogo de Productos (${draftContent.products.length} suministros)`
      );
    }
    if (
      JSON.stringify(draftContent.about) !== JSON.stringify(publishedContent.about)
    ) {
      changes.push('Nosotros & Certificaciones');
    }
    if (
      JSON.stringify(draftContent.location) !==
      JSON.stringify(publishedContent.location)
    ) {
      changes.push('Ubicación & Bases Operativas');
    }
    if (JSON.stringify(draftContent.blog) !== JSON.stringify(publishedContent.blog)) {
      changes.push(`Blog Técnico (${draftContent.blog.length} artículos)`);
    }
    return changes;
  };

  const changedSections = detectChangedSections();

  // Export JSON file
  const handleExportJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(draftContent, null, 2));
    const downloadAnchor = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0, 10);
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `cgr_soluciones_integrales_datos_${dateStr}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Copy JSON to clipboard
  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(draftContent, null, 2));
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Handle JSON File Import
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    setImportSuccess(null);

    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);

        // Validate basic schema
        if (
          !parsed.hero ||
          !parsed.services ||
          !parsed.products ||
          !parsed.about ||
          !parsed.location ||
          !parsed.blog
        ) {
          throw new Error(
            'El archivo JSON no contiene la estructura requerida (faltan secciones como hero, services, products, etc.).'
          );
        }

        onImportData(parsed);
        setImportSuccess(
          `Datos cargados con éxito: ${parsed.services.length} servicios, ${parsed.products.length} productos y ${parsed.blog.length} artículos.`
        );
        setTimeout(() => setImportSuccess(null), 5000);
      } catch (err: any) {
        setImportError(err.message || 'Error al procesar el archivo JSON.');
      }
    };
    reader.readAsText(file);
    // Reset file input value to allow re-upload of same file
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCreateFastSnapshot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!snapshotName.trim()) return;
    onCreateSnapshot(
      `v-${Date.now().toString().slice(-4)}`,
      snapshotName.trim(),
      changedSections.length > 0
        ? changedSections
        : ['Punto de restauración manual de datos']
    );
    setSnapshotName('');
    setShowSnapshotSuccess(true);
    setTimeout(() => setShowSnapshotSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#d35400] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
            Alternativa Directa de Gestión
          </span>
          <h2 className="font-heading font-extrabold text-2xl text-[#1a212a] mt-1.5 flex items-center gap-2">
            <Globe className="w-6 h-6 text-[#d35400]" />
            <span>Centro de Gestión & Publicación de Datos</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-gray-500 mt-1 max-w-3xl leading-relaxed">
            Administración unificada del ciclo de publicación para CGR Soluciones Integrales S.U.R.L. Modifique datos en borrador, sincronice con el sitio público en vivo o descargue respaldos portables en formato JSON sin depender de esquemas complejos de usuarios.
          </p>
        </div>

        {/* Live Status Pill */}
        <div className="shrink-0 flex items-center">
          {isDraftDifferent ? (
            <div className="bg-amber-50 border border-amber-300 px-4 py-2 rounded-xl flex items-center gap-2 text-amber-900 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              <div>
                <span className="text-xs font-heading font-bold uppercase block">
                  Borrador con Cambios
                </span>
                <span className="text-[11px] text-amber-700">
                  {changedSections.length} sección(es) por publicar
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-300 px-4 py-2 rounded-xl flex items-center gap-2 text-emerald-900 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <div>
                <span className="text-xs font-heading font-bold uppercase block">
                  Publicación al Día
                </span>
                <span className="text-[11px] text-emerald-700">
                  Sitio público sincronizado
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Publishing Controls Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
          <div>
            <h3 className="font-heading font-bold text-lg text-[#1a212a] flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#d35400]" />
              <span>Control de Publicación en Tiempo Real</span>
            </h3>
            <p className="font-sans text-xs text-gray-500 mt-0.5">
              Decida si los cambios aplicados en el editor se transfieren de inmediato a los visitantes o se conservan como borrador.
            </p>
          </div>

          {/* Auto-publish toggle */}
          <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg border border-gray-200">
            <span className="text-xs font-sans font-semibold text-gray-700">
              Auto-Publicar al Guardar
            </span>
            <button
              onClick={() => onToggleAutoPublish(!autoPublish)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                autoPublish ? 'bg-[#d35400]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  autoPublish ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Changes summary if pending */}
        {isDraftDifferent ? (
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-heading font-bold text-sm text-amber-900">
                  Modificaciones listas en borrador pendientes de publicar
                </h4>
                <p className="font-sans text-xs text-amber-800">
                  Los siguientes módulos han sido editados y no son visibles aún para los clientes en el portal público:
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {changedSections.map((sec, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-white border border-amber-300 text-amber-900 rounded-md text-xs font-mono font-bold"
                    >
                      • {sec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-amber-200">
              <button
                onClick={onPublishChanges}
                className="px-5 py-2.5 bg-[#d35400] hover:bg-[#a23f00] text-white rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span>Publicar Cambios al Sitio Público Ahora</span>
              </button>

              <button
                onClick={onDiscardDraft}
                className="px-4 py-2.5 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4 text-gray-500" />
                <span>Descartar Borrador</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-heading font-bold text-sm text-emerald-900">
                  El portal público está 100% actualizado
                </h4>
                <p className="font-sans text-xs text-emerald-700">
                  No hay discrepancias entre los datos de trabajo y lo que observan las empresas y clientes industriales.
                </p>
              </div>
            </div>

            <button
              onClick={onPublishChanges}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Forzar Sincronización</span>
            </button>
          </div>
        )}
      </div>

      {/* Backup & Portable Data Management (Export / Import JSON) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export JSON Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-[#1a212a]">
                Exportar Copia de Respaldo (JSON)
              </h3>
              <p className="font-sans text-xs text-gray-500">
                Descargue el paquete de datos íntegro para resguardo externo.
              </p>
            </div>
          </div>

          <p className="font-sans text-xs text-gray-600 leading-relaxed bg-gray-50 p-3.5 rounded-lg border border-gray-100">
            Contiene la estructura completa: catálogo de insumos técnicos, especificaciones DIN/ASME, contenido del blog corporativo, información legal S.U.R.L. y coordenadas operativas.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleExportJson}
              className="px-4 py-2.5 bg-[#1a212a] hover:bg-[#2f3640] text-white rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <FileJson className="w-4 h-4 text-[#fc7127]" />
              <span>Descargar Archivo JSON</span>
            </button>

            <button
              onClick={handleCopyJson}
              className="px-3.5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              {copySuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gray-600" />
                  <span>Copiar al Portapapeles</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Import JSON Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-50 text-[#d35400] flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-[#1a212a]">
                Importar o Restaurar Datos desde JSON
              </h3>
              <p className="font-sans text-xs text-gray-500">
                Cargue un archivo previamente exportado para actualizar el portal.
              </p>
            </div>
          </div>

          <p className="font-sans text-xs text-gray-600 leading-relaxed bg-gray-50 p-3.5 rounded-lg border border-gray-100">
            El sistema verificará la integridad del archivo antes de aplicarlo. Podrá previsualizarlo antes de publicar en producción.
          </p>

          <div>
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
              id="json-upload-input"
            />
            <label
              htmlFor="json-upload-input"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-dashed border-[#d35400]/50 hover:border-[#d35400] text-[#d35400] rounded-lg font-heading font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Seleccionar Archivo JSON</span>
            </label>
          </div>

          {importSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{importSuccess}</span>
            </div>
          )}

          {importError && (
            <div className="p-3 bg-red-50 border border-red-300 rounded-lg text-xs text-red-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{importError}</span>
            </div>
          )}
        </div>
      </div>

      {/* Snapshot & Default Reset Utilities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fast Snapshot Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h3 className="font-heading font-bold text-base text-[#1a212a] flex items-center gap-2">
            <Archive className="w-5 h-5 text-[#d35400]" />
            <span>Crear Punto de Control de Datos</span>
          </h3>
          <p className="font-sans text-xs text-gray-500">
            Guarde un punto seguro en el historial antes de realizar ediciones masivas.
          </p>

          <form onSubmit={handleCreateFastSnapshot} className="space-y-3">
            <input
              type="text"
              value={snapshotName}
              onChange={(e) => setSnapshotName(e.target.value)}
              placeholder="Ej: Catálogo actualizado - Válvulas y Soldadura Mayo 2025"
              className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-800 focus:ring-1 focus:ring-[#d35400]"
            />
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={!snapshotName.trim()}
                className="px-4 py-2 bg-[#2f3640] hover:bg-[#1a212a] disabled:opacity-50 text-white rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-colors"
              >
                Crear Punto de Control
              </button>
              {showSnapshotSuccess && (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Guardado en historial
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Factory Reset Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h3 className="font-heading font-bold text-base text-[#1a212a] flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-gray-600" />
            <span>Restablecer a Datos de Fábrica CGR</span>
          </h3>
          <p className="font-sans text-xs text-gray-500">
            Restaura los contenidos originales oficiales de la empresa con las especificaciones predeterminadas.
          </p>

          <div className="pt-3">
            <button
              onClick={() => {
                if (
                  window.confirm(
                    '¿Desea restablecer todos los contenidos del portal a los datos originales de CGR Soluciones Integrales S.U.R.L.?'
                  )
                ) {
                  onResetDefaultData();
                }
              }}
              className="px-4 py-2 bg-gray-100 hover:bg-red-50 hover:text-red-700 text-gray-700 border border-gray-300 hover:border-red-300 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer Datos Originales</span>
            </button>
          </div>
        </div>
      </div>

      {/* JSON Live Viewer Drawer */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <button
          onClick={() => setShowJsonViewer(!showJsonViewer)}
          className="w-full p-4 text-left font-heading font-bold text-xs uppercase tracking-wider text-gray-700 hover:bg-gray-50 flex items-center justify-between border-b border-gray-100"
        >
          <div className="flex items-center gap-2">
            <FileJson className="w-4 h-4 text-[#d35400]" />
            <span>Auditoría de Esquema JSON en Vivo</span>
          </div>
          <span className="text-xs text-[#d35400]">
            {showJsonViewer ? 'Ocultar Código JSON' : 'Ver Código JSON Completo'}
          </span>
        </button>

        {showJsonViewer && (
          <div className="p-4 bg-[#1a212a] text-gray-200 overflow-x-auto max-h-96 text-[11px] font-mono leading-relaxed">
            <pre>{JSON.stringify(draftContent, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

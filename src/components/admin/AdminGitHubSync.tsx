import React, { useState } from 'react';
import {
  GitPullRequest,
  GitBranch,
  GitCommit,
  FolderGit2,
  FileCode,
  CheckCircle2,
  ArrowUpRight,
  Download,
  Terminal,
  ExternalLink,
  Save,
  Code2,
  RefreshCw,
} from 'lucide-react';

interface AdminGitHubSyncProps {
  onPushSuccess: (commitMsg: string) => void;
}

export const AdminGitHubSync: React.FC<AdminGitHubSyncProps> = ({
  onPushSuccess,
}) => {
  const [selectedBranch, setSelectedBranch] = useState('main');
  const [selectedFile, setSelectedFile] = useState('src/data/initialContent.ts');
  const [commitMessage, setCommitMessage] = useState('');
  const [isPushing, setIsPushing] = useState(false);
  const [pushStatus, setPushStatus] = useState<string | null>(null);

  const isReadOnly = false;

  // Virtual source files representation
  const [virtualFiles, setVirtualFiles] = useState<Record<string, string>>({
    'src/data/initialContent.ts': `// CGR Soluciones Integrales S.U.R.L. - Repositorio de Contenidos Oficiales
export const INITIAL_CONTENT = {
  portalName: "CGR Soluciones Integrales S.U.R.L.",
  version: "1.1.0",
  standards: ["DIN 31051", "ISO 9001:2015", "ASME Section IX"],
  deploymentRegion: "Cuba (Occidente, Centro, Oriente)"
};`,
    'src/utils/imageCompressor.ts': `// Compresor de imágenes en Canvas HTML5 nativo sin dependencias externas
export async function processAndCompressImage(file: File, options: any) {
  // WebP bicubic scaling and metadata generator
  return { cloudUri: "cgr://cloud-storage/..." };
}`,
    'metadata.json': `{
  "name": "CGR Soluciones Integrales S.U.R.L.",
  "description": "Portal empresarial industrial con panel administrativo, control de versiones y compresión interna de imágenes.",
  "requestFramePermissions": ["notifications"]
}`,
    'package.json': `{
  "name": "cgr-soluciones-portal",
  "private": true,
  "version": "1.1.0",
  "dependencies": {
    "react": "^19.0.0",
    "lucide-react": "^1.16.0"
  }
}`,
  });

  const handleCommitPush = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commitMessage.trim()) return;

    setIsPushing(true);
    setTimeout(() => {
      setIsPushing(false);
      setPushStatus(
        `Commit #${Math.floor(100000 + Math.random() * 900000)} enviado con éxito a la rama ${selectedBranch}.`
      );
      onPushSuccess(commitMessage);
      setCommitMessage('');
      setTimeout(() => setPushStatus(null), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Repo Status */}
      <div className="bg-[#1a212a] text-white p-6 sm:p-8 rounded-xl border border-gray-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-[#fc7127]" />
            <span className="font-heading font-bold text-xs uppercase text-[#fc7127] tracking-wider">
              Integración de Código Fuente & GitHub
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
            cgr-soluciones / portal-empresarial-cgr
          </h2>
          <p className="font-sans text-xs text-gray-300">
            Conexión bidireccional directa para sincronizar archivos fuente, componentes React y esquemas de datos desde la nube.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-[#2f3640] px-3.5 py-1.5 rounded-lg border border-gray-700">
            <GitBranch className="w-4 h-4 text-[#fc7127]" />
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="bg-transparent text-xs font-mono text-white font-bold focus:outline-none cursor-pointer"
            >
              <option value="main">main (production)</option>
              <option value="staging">staging</option>
              <option value="feature/b2b-catalog">feature/b2b-catalog</option>
            </select>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-mono font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            CI/CD Activo
          </span>
        </div>
      </div>

      {/* Grid: File Explorer + In-App Code Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* File Explorer Tree (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <span className="font-heading font-bold text-xs uppercase text-gray-600 tracking-wider">
              Archivos del Repositorio
            </span>
            <span className="font-mono text-[10px] text-gray-400">
              {Object.keys(virtualFiles).length} archivos
            </span>
          </div>

          <div className="space-y-1">
            {Object.keys(virtualFiles).map((filePath) => {
              const isSelected = selectedFile === filePath;
              return (
                <button
                  key={filePath}
                  onClick={() => setSelectedFile(filePath)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left text-xs font-mono transition-all ${
                    isSelected
                      ? 'bg-[#1a212a] text-white font-bold shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <FileCode
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? 'text-[#fc7127]' : 'text-gray-400'
                      }`}
                    />
                    <span className="truncate">{filePath}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Clone Snippet */}
          <div className="pt-4 border-t border-gray-100 space-y-2">
            <span className="text-[10px] font-bold uppercase text-gray-500 block">
              Comando de Clonación Git:
            </span>
            <div className="p-2 bg-gray-900 text-gray-300 rounded font-mono text-[11px] flex items-center justify-between select-all">
              <span>git clone https://github.com/cgr-soluciones/portal.git</span>
            </div>
          </div>
        </div>

        {/* Code Editor & Commit Form (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#d35400]" />
              <span className="font-mono font-bold text-xs text-[#1a212a]">
                {selectedFile}
              </span>
            </div>
            <span className="text-[10px] font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              TypeScript / JSON
            </span>
          </div>

          {/* Code Textarea */}
          <div className="relative font-mono text-xs">
            <textarea
              rows={10}
              disabled={isReadOnly}
              value={virtualFiles[selectedFile]}
              onChange={(e) =>
                setVirtualFiles({
                  ...virtualFiles,
                  [selectedFile]: e.target.value,
                })
              }
              className="w-full p-4 bg-gray-950 text-emerald-400 rounded-lg border border-gray-800 font-mono text-xs focus:ring-1 focus:ring-[#d35400] outline-none leading-relaxed"
            />
          </div>

          {/* Commit & Push Form */}
          {!isReadOnly ? (
            <form
              onSubmit={handleCommitPush}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3"
            >
              <div className="flex items-center gap-2">
                <GitCommit className="w-4 h-4 text-[#d35400]" />
                <h4 className="font-heading font-bold text-xs uppercase text-gray-800 tracking-wider">
                  Commit y Despliegue Remoto en GitHub
                </h4>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  required
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                  placeholder="Mensaje de commit: Ej: Actualización de parámetros técnicos..."
                  className="flex-1 h-10 px-3 bg-white border border-gray-300 rounded text-xs text-gray-900 focus:ring-1 focus:ring-[#d35400]"
                />
                <button
                  type="submit"
                  disabled={isPushing}
                  className="px-5 h-10 bg-[#1a212a] hover:bg-[#2f3640] text-white rounded font-heading font-bold text-xs uppercase tracking-wider transition-all shadow flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
                >
                  {isPushing ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-[#fc7127]" />
                  ) : (
                    <GitPullRequest className="w-4 h-4 text-[#fc7127]" />
                  )}
                  <span>{isPushing ? 'Sincronizando...' : 'Hacer Push a GitHub'}</span>
                </button>
              </div>

              {pushStatus && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{pushStatus}</span>
                </div>
              )}
            </form>
          ) : (
            <div className="p-3 bg-amber-50 rounded border border-amber-200 text-xs text-amber-800 font-medium">
              El rol actual de Auditor B2B no cuenta con credenciales para realizar commits directos al repositorio central.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { CgrLogo } from '../CgrLogo';
import {
  Globe,
  Bell,
  ExternalLink,
  GitBranch,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Upload,
} from 'lucide-react';

interface AdminHeaderProps {
  onExitAdmin: () => void;
  unreadCount: number;
  onOpenNotifications: () => void;
  onCreateSnapshot: () => void;
  onPublishNow?: () => void;
  hasPendingChanges?: boolean;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onExitAdmin,
  unreadCount,
  onOpenNotifications,
  onCreateSnapshot,
  onPublishNow,
  hasPendingChanges = false,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#1a212a] text-white border-b border-gray-800 shadow-md">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand & Admin Breadcrumb */}
        <div className="flex items-center gap-3 sm:gap-4">
          <CgrLogo variant="dark" size="sm" showTagline={false} />
          <div className="h-6 w-[1px] bg-gray-700 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-xs uppercase tracking-wider text-white">
              Gestión de Datos & Publicación
            </span>
            <span className="hidden md:inline font-mono text-[10px] text-[#fc7127] bg-[#2f3640] px-2 py-0.5 rounded border border-gray-700">
              CGR Portal
            </span>
          </div>
        </div>

        {/* Right: Publishing Status, Fast Publish & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Publication Status Badge */}
          <div className="hidden md:flex items-center gap-2 pr-2 border-r border-gray-800">
            {hasPendingChanges ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Borrador con Cambios
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Publicación al Día
              </span>
            )}
          </div>

          {/* Quick Publish Button if changes pending */}
          {hasPendingChanges && onPublishNow && (
            <button
              onClick={onPublishNow}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#d35400] hover:bg-[#a23f00] text-white text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-md animate-pulse"
              title="Publicar las modificaciones de datos al sitio público"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Publicar en Vivo</span>
            </button>
          )}

          {/* Create Version Snapshot Shortcut */}
          <button
            onClick={onCreateSnapshot}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2f3640] text-gray-200 border border-gray-700 hover:bg-gray-800 text-xs font-heading font-bold uppercase tracking-wider transition-all"
            title="Crear un punto de control del portal en el historial"
          >
            <GitBranch className="w-3.5 h-3.5 text-[#fc7127]" />
            <span>Punto de Control</span>
          </button>

          {/* Push Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg bg-[#2f3640] hover:bg-gray-800 text-gray-300 hover:text-white transition-colors"
            title="Centro de Alertas del Sistema"
          >
            <Bell className="w-4 h-4 text-[#fc7127]" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#d35400] text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Return to Public Portal */}
          <button
            onClick={onExitAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2f3640] hover:bg-[#1a212a] border border-gray-700 hover:border-gray-600 text-white text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-sm"
            title="Ver la vista pública del portal"
          >
            <span>Ver Portal</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#fc7127]" />
          </button>
        </div>
      </div>
    </header>
  );
};


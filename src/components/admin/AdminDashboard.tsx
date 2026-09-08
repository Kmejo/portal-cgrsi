import React, { useState } from 'react';
import {
  SiteContent,
  StoredImage,
  VersionSnapshot,
  PushNotification,
  QuoteRequest,
} from '../../types';
import { AdminHeader } from './AdminHeader';
import { AdminPublishManager } from './AdminPublishManager';
import { AdminContentEditor } from './AdminContentEditor';
import { AdminImageStorage } from './AdminImageStorage';
import { AdminVersionControl } from './AdminVersionControl';
import { AdminGitHubSync } from './AdminGitHubSync';
import { AdminPushNotifications } from './AdminPushNotifications';
import { AdminQuoteInbox } from './AdminQuoteInbox';
import {
  Globe,
  Sliders,
  HardDrive,
  GitBranch,
  FolderGit2,
  Bell,
  Inbox,
  CheckCircle2,
  AlertTriangle,
  Download,
} from 'lucide-react';

interface AdminDashboardProps {
  draftContent: SiteContent;
  publishedContent: SiteContent;
  onUpdateDraftContent: (content: SiteContent) => void;
  autoPublish: boolean;
  onToggleAutoPublish: (val: boolean) => void;
  onPublishChanges: () => void;
  onDiscardDraft: () => void;
  onImportData: (data: SiteContent) => void;
  onResetDefaultData: () => void;
  onExitAdmin: () => void;
  cloudImages: StoredImage[];
  onAddCloudImage: (img: StoredImage) => void;
  onDeleteCloudImage: (id: string) => void;
  snapshots: VersionSnapshot[];
  onCreateSnapshot: (versionTag: string, msg: string, changes: string[]) => void;
  onRestoreSnapshot: (snap: VersionSnapshot) => void;
  notifications: PushNotification[];
  onSendNotification: (
    notif: Omit<PushNotification, 'id' | 'timestamp' | 'isRead'>
  ) => void;
  onMarkNotificationAsRead: (id: string) => void;
  onMarkAllNotificationsAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  quotes: QuoteRequest[];
  onUpdateQuoteStatus: (id: string, status: QuoteRequest['status']) => void;
  onGitHubPush: (msg: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  draftContent,
  publishedContent,
  onUpdateDraftContent,
  autoPublish,
  onToggleAutoPublish,
  onPublishChanges,
  onDiscardDraft,
  onImportData,
  onResetDefaultData,
  onExitAdmin,
  cloudImages,
  onAddCloudImage,
  onDeleteCloudImage,
  snapshots,
  onCreateSnapshot,
  onRestoreSnapshot,
  notifications,
  onSendNotification,
  onMarkNotificationAsRead,
  onMarkAllNotificationsAsRead,
  onDeleteNotification,
  quotes,
  onUpdateQuoteStatus,
  onGitHubPush,
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'publish'
    | 'editor'
    | 'cloud_images'
    | 'versions'
    | 'github'
    | 'notifications'
    | 'inbox'
  >('publish');

  const unreadNotifs = notifications.filter((n) => !n.isRead).length;
  const pendingQuotes = quotes.filter((q) => q.status === 'pendiente').length;
  const isDraftDifferent =
    JSON.stringify(draftContent) !== JSON.stringify(publishedContent);

  const navItems = [
    {
      id: 'publish',
      label: 'Gestión & Publicación',
      icon: Globe,
      badge: isDraftDifferent ? 'Pendiente' : 'Al Día',
      badgeColor: isDraftDifferent ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800',
      description: 'Publicación en vivo y backups JSON',
    },
    {
      id: 'editor',
      label: 'Editor de Contenido',
      icon: Sliders,
      description: 'Edición en tiempo real de secciones',
    },
    {
      id: 'cloud_images',
      label: 'Almacenamiento Cloud',
      icon: HardDrive,
      badge: `${cloudImages.length}`,
      badgeColor: 'bg-orange-100 text-[#d35400]',
      description: 'Compresión WebP & metadatos',
    },
    {
      id: 'versions',
      label: 'Control de Versiones',
      icon: GitBranch,
      description: 'Snapshots & Rollback',
    },
    {
      id: 'github',
      label: 'Sincronización GitHub',
      icon: FolderGit2,
      description: 'Gestión de código fuente',
    },
    {
      id: 'notifications',
      label: 'Notificaciones Push',
      icon: Bell,
      badge: unreadNotifs > 0 ? `${unreadNotifs}` : undefined,
      badgeColor: 'bg-red-100 text-red-700',
      description: 'Alertas para editores',
    },
    {
      id: 'inbox',
      label: 'Bandeja Cotizaciones',
      icon: Inbox,
      badge: pendingQuotes > 0 ? `${pendingQuotes}` : undefined,
      badgeColor: 'bg-blue-100 text-blue-700',
      description: 'Requerimientos B2B entrantes',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f5f7] flex flex-col font-sans">
      {/* Top Fixed Header */}
      <AdminHeader
        onExitAdmin={onExitAdmin}
        unreadCount={unreadNotifs}
        onOpenNotifications={() => setActiveTab('notifications')}
        onCreateSnapshot={() => setActiveTab('versions')}
        onPublishNow={onPublishChanges}
        hasPendingChanges={isDraftDifferent}
      />

      <div className="flex-1 max-w-[1520px] w-full mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row gap-6">
        {/* Left Vertical Navigation Menu */}
        <aside className="w-full md:w-64 shrink-0 space-y-3">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 space-y-1">
            <span className="font-heading font-bold text-[10px] uppercase text-gray-400 tracking-wider px-3 py-1.5 block">
              Módulos de Gestión
            </span>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-all ${
                    isActive
                      ? 'bg-[#1a212a] text-white shadow-sm font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-[#fc7127]' : 'text-gray-500'
                      }`}
                    />
                    <span className="text-xs font-heading font-bold uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-[#d35400] text-white' : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Publication Status Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-3">
            <span className="font-heading font-bold text-[10px] uppercase text-gray-400 tracking-wider block">
              Estado de Producción
            </span>

            {isDraftDifferent ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-amber-800 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <span>Borrador con cambios pendientes</span>
                </div>
                <button
                  onClick={onPublishChanges}
                  className="w-full py-2 bg-[#d35400] hover:bg-[#a23f00] text-white rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Publicar en Vivo
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Portal Sincronizado</span>
                </div>
                <p className="text-[11px] text-gray-500">
                  Los datos públicos coinciden exactamente con el borrador de trabajo.
                </p>
              </div>
            )}

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
              <span className="text-gray-500">Publicación directa:</span>
              <span
                className={`font-mono font-bold uppercase ${
                  autoPublish ? 'text-[#d35400]' : 'text-gray-600'
                }`}
              >
                {autoPublish ? 'Activa' : 'Manual'}
              </span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {activeTab === 'publish' && (
            <AdminPublishManager
              draftContent={draftContent}
              publishedContent={publishedContent}
              autoPublish={autoPublish}
              onToggleAutoPublish={onToggleAutoPublish}
              onPublishChanges={onPublishChanges}
              onDiscardDraft={onDiscardDraft}
              onImportData={onImportData}
              onResetDefaultData={onResetDefaultData}
              onCreateSnapshot={onCreateSnapshot}
            />
          )}

          {activeTab === 'editor' && (
            <AdminContentEditor
              content={draftContent}
              onUpdateContent={onUpdateDraftContent}
              cloudImages={cloudImages}
            />
          )}

          {activeTab === 'cloud_images' && (
            <AdminImageStorage
              images={cloudImages}
              onAddImage={onAddCloudImage}
              onDeleteImage={onDeleteCloudImage}
            />
          )}

          {activeTab === 'versions' && (
            <AdminVersionControl
              snapshots={snapshots}
              currentContent={draftContent}
              onCreateSnapshot={onCreateSnapshot}
              onRestoreSnapshot={onRestoreSnapshot}
            />
          )}

          {activeTab === 'github' && (
            <AdminGitHubSync onPushSuccess={onGitHubPush} />
          )}

          {activeTab === 'notifications' && (
            <AdminPushNotifications
              notifications={notifications}
              onSendNotification={onSendNotification}
              onMarkAsRead={onMarkNotificationAsRead}
              onMarkAllAsRead={onMarkAllNotificationsAsRead}
              onDeleteNotification={onDeleteNotification}
            />
          )}

          {activeTab === 'inbox' && (
            <AdminQuoteInbox
              quotes={quotes}
              onUpdateQuoteStatus={onUpdateQuoteStatus}
            />
          )}
        </main>
      </div>
    </div>
  );
};

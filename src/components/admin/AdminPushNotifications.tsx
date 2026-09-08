import React, { useState, useEffect } from 'react';
import { PushNotification } from '../../types';
import {
  Bell,
  BellRing,
  Send,
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  Clock,
  Trash2,
  Volume2,
} from 'lucide-react';

interface AdminPushNotificationsProps {
  notifications: PushNotification[];
  onSendNotification: (
    notif: Omit<PushNotification, 'id' | 'timestamp' | 'isRead'>
  ) => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
}

export const AdminPushNotifications: React.FC<AdminPushNotificationsProps> = ({
  notifications,
  onSendNotification,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
}) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [browserPermission, setBrowserPermission] = useState<string>('default');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<PushNotification['type']>('info');
  const [category, setCategory] = useState<PushNotification['category']>('sistema');
  const [sentNotice, setSentNotice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setBrowserPermission(Notification.permission);
    }
  }, []);

  const handleRequestPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        setBrowserPermission(permission);
        if (permission === 'granted') {
          new Notification('CGR Soluciones Integrales S.U.R.L.', {
            body: '¡Notificaciones push activadas correctamente para el panel de editores!',
            icon: '/favicon.ico',
          });
        }
      } catch (err) {
        console.error('Error solicitando permisos de notificación:', err);
      }
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    onSendNotification({
      title,
      message,
      type,
      author: 'Sistema de Gestión',
      category,
    });

    // Native browser push if permitted
    if (
      typeof window !== 'undefined' &&
      'Notification' in window &&
      Notification.permission === 'granted'
    ) {
      new Notification(`[CGR Alert] ${title}`, {
        body: message,
      });
    }

    setSentNotice(true);
    setTitle('');
    setMessage('');
    setTimeout(() => setSentNotice(false), 3000);
  };

  const filteredNotifications = notifications.filter((n) =>
    filter === 'all' ? true : !n.isRead
  );

  const getTypeIcon = (t: PushNotification['type']) => {
    switch (t) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-rose-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Browser Permission Bar */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BellRing className="w-5 h-5 text-[#d35400]" />
            <h2 className="font-heading font-extrabold text-xl text-[#1a212a]">
              Sistema de Notificaciones Push para Editores
            </h2>
          </div>
          <p className="font-sans text-xs text-gray-500">
            Alertas automáticas en tiempo real ante solicitudes de cotización B2B, cambios en catálogo, despliegues y control de versiones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {browserPermission === 'granted' ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Notificaciones del Navegador Activas
            </span>
          ) : (
            <button
              onClick={handleRequestPermission}
              className="px-4 py-2 bg-[#1a212a] hover:bg-[#2f3640] text-white rounded-lg font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm"
            >
              <Bell className="w-4 h-4 text-[#fc7127]" />
              <span>Habilitar Push en Navegador</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid: Broadcast Form (5 cols) + Notification Feed (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Send Push Notification Form (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Send className="w-4 h-4 text-[#d35400]" />
            <h3 className="font-heading font-bold text-sm text-[#1a212a] uppercase tracking-wider">
              Emitir Alerta a la Red de Editores
            </h3>
          </div>

          <form onSubmit={handleSend} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-700">
                Título de la Notificación *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Aprobación de Planos de Taller..."
                className="w-full h-9 px-3 bg-gray-50 border border-gray-300 rounded text-xs text-gray-900 focus:bg-white focus:ring-1 focus:ring-[#d35400]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-700">
                  Tipo / Urgencia
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full h-9 px-2.5 bg-gray-50 border border-gray-300 rounded text-xs"
                >
                  <option value="info">Informativa</option>
                  <option value="success">Éxito / Despliegue</option>
                  <option value="warning">Advertencia Operativa</option>
                  <option value="error">Urgente / Bloqueo</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-700">
                  Categoría
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full h-9 px-2.5 bg-gray-50 border border-gray-300 rounded text-xs"
                >
                  <option value="sistema">Sistema General</option>
                  <option value="publicacion">Publicación y Catálogo</option>
                  <option value="cotizacion">Cotizaciones & Clientes</option>
                  <option value="almacen">Almacenamiento de Imágenes</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-700">
                Mensaje Detallado *
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describa la acción requerida o el motivo del aviso..."
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded text-xs text-gray-900 focus:bg-white focus:ring-1 focus:ring-[#d35400]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#d35400] hover:bg-[#a23f00] text-white rounded font-heading font-bold text-xs uppercase tracking-wider transition-all shadow flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enviar Notificación Push</span>
            </button>

            {sentNotice && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-xs font-semibold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Notificación enviada a todos los dispositivos conectados.</span>
              </div>
            )}
          </form>
        </div>

        {/* Push Notification Feed (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-xs uppercase text-gray-700 tracking-wider">
                Bandeja de Alertas ({filteredNotifications.length})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  filter === 'all'
                    ? 'bg-[#1a212a] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  filter === 'unread'
                    ? 'bg-[#1a212a] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                No leídas
              </button>

              <button
                onClick={onMarkAllAsRead}
                className="text-[11px] text-[#d35400] hover:underline font-semibold ml-2"
              >
                Marcar leídas
              </button>
            </div>
          </div>

          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center text-gray-400 font-sans text-xs">
                No hay notificaciones pendientes.
              </div>
            ) : (
              filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3.5 rounded-lg border transition-all flex items-start justify-between gap-3 ${
                    notif.isRead
                      ? 'bg-gray-50/70 border-gray-200 text-gray-600'
                      : 'bg-orange-50/30 border-[#d35400]/40 text-[#1a212a]'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 shrink-0">{getTypeIcon(notif.type)}</div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="font-heading font-bold text-xs text-[#1a212a]">
                          {notif.title}
                        </h4>
                        {!notif.isRead && (
                          <span className="w-2 h-2 rounded-full bg-[#d35400]" />
                        )}
                      </div>
                      <p className="font-sans text-xs text-gray-600 leading-relaxed">
                        {notif.message}
                      </p>
                      <div className="flex items-center gap-3 text-[10px] text-gray-400 pt-1">
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3" />
                          {notif.timestamp}
                        </span>
                        <span>• Por {notif.author}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {!notif.isRead && (
                      <button
                        onClick={() => onMarkAsRead(notif.id)}
                        className="text-[10px] font-bold text-[#d35400] hover:underline px-2 py-1"
                      >
                        Leída
                      </button>
                    )}
                    <button
                      onClick={() => onDeleteNotification(notif.id)}
                      className="p-1 text-gray-400 hover:text-red-500 rounded"
                      title="Eliminar notificación"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

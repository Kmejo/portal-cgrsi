/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  SiteContent,
  StoredImage,
  VersionSnapshot,
  PushNotification,
  QuoteRequest,
} from './types';
import {
  INITIAL_SITE_CONTENT,
  INITIAL_CLOUD_IMAGES,
  INITIAL_SNAPSHOTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_QUOTES,
} from './data/initialContent';

// Public Components
import { Header } from './components/public/Header';
import { HeroSection } from './components/public/HeroSection';
import { ServicesSection } from './components/public/ServicesSection';
import { ProductsSection } from './components/public/ProductsSection';
import { AboutSection } from './components/public/AboutSection';
import { LocationSection } from './components/public/LocationSection';
import { BlogSection } from './components/public/BlogSection';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';
import { FloatingWidgets } from './components/public/FloatingWidgets';

// Admin Components
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  // Application View Mode ('public' | 'admin')
  const [viewMode, setViewMode] = useState<'public' | 'admin'>('public');

  // Core Data Management State (Dual-stage publication engine)
  const [publishedContent, setPublishedContent] =
    useState<SiteContent>(INITIAL_SITE_CONTENT);
  const [draftContent, setDraftContent] =
    useState<SiteContent>(INITIAL_SITE_CONTENT);
  const [autoPublish, setAutoPublish] = useState<boolean>(true);

  // Storage, History, Notifications & Inbound Requests
  const [cloudImages, setCloudImages] =
    useState<StoredImage[]>(INITIAL_CLOUD_IMAGES);
  const [snapshots, setSnapshots] =
    useState<VersionSnapshot[]>(INITIAL_SNAPSHOTS);
  const [notifications, setNotifications] =
    useState<PushNotification[]>(INITIAL_NOTIFICATIONS);
  const [quotes, setQuotes] = useState<QuoteRequest[]>(INITIAL_QUOTES);

  // Active public section tracking
  const [activeSection, setActiveSection] = useState<string>('inicio');

  // Interactive preselect for Contact section
  const [quoteService, setQuoteService] = useState<string>(
    'Mantenimiento Mecánico e Industrial'
  );
  const [quoteMessage, setQuoteMessage] = useState<string>('');

  // Subtle web audio synthesizer chime for push notification feedback
  const playPushChime = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08); // A5
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.36);
    } catch {
      // Audio Context might wait for user interaction, fail silently
    }
  }, []);

  // Smooth scroll handler
  const handleNavigateSection = useCallback(
    (sectionId: string) => {
      setActiveSection(sectionId);
      if (viewMode === 'admin') {
        setViewMode('public');
      }

      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    },
    [viewMode]
  );

  const handleBackToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('inicio');
  }, []);

  // Send Push Notification Helper
  const handleSendNotification = useCallback(
    (notif: Omit<PushNotification, 'id' | 'timestamp' | 'isRead'>) => {
      const newNotif: PushNotification = {
        id: 'notif-' + Date.now(),
        title: notif.title,
        message: notif.message,
        type: notif.type,
        timestamp: 'Justo ahora',
        isRead: false,
        author: notif.author || 'Sistema CGR',
        category: notif.category || 'sistema',
      };

      setNotifications((prev) => [newNotif, ...prev]);
      playPushChime();

      // Trigger browser Notification if permitted
      if (
        typeof window !== 'undefined' &&
        'Notification' in window &&
        Notification.permission === 'granted'
      ) {
        new Notification(`[CGR Alerta] ${notif.title}`, {
          body: notif.message,
        });
      }
    },
    [playPushChime]
  );

  // Quote Submission Handler
  const handleSubmitQuote = (
    data: Omit<QuoteRequest, 'id' | 'date' | 'status'>
  ) => {
    const newQuote: QuoteRequest = {
      id: 'quote-' + Date.now(),
      ...data,
      date: 'Hoy',
      status: 'Pendiente',
    };
    setQuotes((prev) => [newQuote, ...prev]);

    // Push notification to management
    handleSendNotification({
      title: `Nueva Cotización B2B: ${data.clientCompany}`,
      message: `${data.clientName} solicita cotización para "${data.serviceType}". Correo: ${data.clientEmail}.`,
      type: 'info',
      author: 'Portal Público CGR',
      category: 'cotizacion',
    });
  };

  // Draft Content Update
  const handleUpdateDraftContent = (updated: SiteContent) => {
    setDraftContent(updated);
    if (autoPublish) {
      setPublishedContent(updated);
      handleSendNotification({
        title: 'Publicación Automática en Vivo',
        message:
          'Las modificaciones de datos se han propagado inmediatamente al portal público.',
        type: 'success',
        author: 'Gestor de Contenido',
        category: 'publicacion',
      });
    } else {
      handleSendNotification({
        title: 'Borrador de Datos Guardado',
        message:
          'Se guardaron los cambios en borrador. Pulse "Publicar en Vivo" para actualizar el portal para los clientes.',
        type: 'info',
        author: 'Editor Técnico',
        category: 'publicacion',
      });
    }
  };

  // Explicit Publish Draft to Production
  const handlePublishChanges = () => {
    setPublishedContent(JSON.parse(JSON.stringify(draftContent)));
    handleSendNotification({
      title: 'Portal Actualizado en Producción',
      message:
        'Todos los cambios en catálogo, especificaciones y textos están en vivo para los clientes.',
      type: 'success',
      author: 'Centro de Publicación',
      category: 'publicacion',
    });
  };

  // Discard Draft
  const handleDiscardDraft = () => {
    setDraftContent(JSON.parse(JSON.stringify(publishedContent)));
    handleSendNotification({
      title: 'Borrador Descartado',
      message:
        'Los datos de trabajo se sincronizaron con la versión actualmente publicada en producción.',
      type: 'warning',
      author: 'Centro de Publicación',
      category: 'publicacion',
    });
  };

  // Import JSON Backup
  const handleImportData = (imported: SiteContent) => {
    setDraftContent(imported);
    if (autoPublish) {
      setPublishedContent(imported);
    }
    handleSendNotification({
      title: 'Copia de Respaldo Restaurada',
      message: `Se cargó satisfactoriamente el archivo JSON con ${imported.services.length} servicios y ${imported.products.length} productos.`,
      type: 'success',
      author: 'Importador JSON',
      category: 'sistema',
    });
  };

  // Reset to Factory Default Data
  const handleResetDefaultData = () => {
    setDraftContent(INITIAL_SITE_CONTENT);
    setPublishedContent(INITIAL_SITE_CONTENT);
    handleSendNotification({
      title: 'Datos de Fábrica Restablecidos',
      message:
        'El catálogo y parámetros institucionales volvieron a las especificaciones iniciales homologadas.',
      type: 'warning',
      author: 'Sistema CGR',
      category: 'sistema',
    });
  };

  // Snapshot Creation
  const handleCreateSnapshot = (
    versionTag: string,
    commitMsg: string,
    changes: string[]
  ) => {
    const deactivated = snapshots.map((s) => ({ ...s, isActive: false }));

    const newSnapshot: VersionSnapshot = {
      id: 'snap-' + Date.now(),
      versionNumber: versionTag,
      timestamp: 'Hoy',
      author: 'Ingeniería y Operaciones CGR',
      commitMessage: commitMsg,
      changesSummary: changes,
      isActive: true,
      data: JSON.parse(JSON.stringify(draftContent)),
    };

    setSnapshots([newSnapshot, ...deactivated]);

    handleSendNotification({
      title: `Nuevo Punto de Control: ${versionTag}`,
      message: `Punto de restauración generado: "${commitMsg}"`,
      type: 'success',
      author: 'Control de Versiones',
      category: 'sistema',
    });
  };

  // Rollback to Snapshot
  const handleRestoreSnapshot = (snap: VersionSnapshot) => {
    const restoredData = JSON.parse(JSON.stringify(snap.data));
    setDraftContent(restoredData);
    setPublishedContent(restoredData);

    const updatedSnapshots = snapshots.map((s) => ({
      ...s,
      isActive: s.id === snap.id,
    }));
    setSnapshots(updatedSnapshots);

    handleSendNotification({
      title: `Rollback a Versión ${snap.versionNumber}`,
      message: `El portal fue restaurado al estado del snapshot "${snap.commitMessage}".`,
      type: 'warning',
      author: 'Control de Versiones',
      category: 'sistema',
    });
  };

  // Add Cloud Image
  const handleAddCloudImage = (newImg: StoredImage) => {
    setCloudImages((prev) => [newImg, ...prev]);
    handleSendNotification({
      title: `Imagen Comprimida y Almacenada: ${newImg.name}`,
      message: `WebP optimizado (${newImg.width}x${newImg.height}) con -${newImg.compressionRatio}% de ahorro.`,
      type: 'success',
      author: 'Almacenamiento Cloud',
      category: 'almacen',
    });
  };

  // Delete Cloud Image
  const handleDeleteCloudImage = (id: string) => {
    setCloudImages((prev) => prev.filter((img) => img.id !== id));
  };

  // GitHub Push
  const handleGitHubPush = (commitMsg: string) => {
    handleSendNotification({
      title: 'Despliegue GitHub Realizado',
      message: `Archivos sincronizados con la rama principal: "${commitMsg}"`,
      type: 'info',
      author: 'Sincronizador GitHub',
      category: 'sistema',
    });
  };

  // Pre-fill quote for a specific service or product
  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setQuoteService(serviceTitle);
    setQuoteMessage(
      `Estimados ingenieros de CGR: Requerimos evaluar la contratación del servicio "${serviceTitle}". Rogamos coordinar inspección técnica en planta.`
    );
    handleNavigateSection('contacto');
  };

  const handleSelectProductForQuote = (sku: string, title: string) => {
    setQuoteService('Cotización de Productos del Catálogo');
    setQuoteMessage(
      `Deseamos solicitar oferta técnico-económica y tiempos de entrega para el suministro: ${title} (SKU: ${sku}).`
    );
    handleNavigateSection('contacto');
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-white text-[#1a212a] selection:bg-[#d35400] selection:text-white">
      {viewMode === 'admin' ? (
        /* ================= ADMIN DATA & PUBLISHING PANEL ================= */
        <AdminDashboard
          draftContent={draftContent}
          publishedContent={publishedContent}
          onUpdateDraftContent={handleUpdateDraftContent}
          autoPublish={autoPublish}
          onToggleAutoPublish={setAutoPublish}
          onPublishChanges={handlePublishChanges}
          onDiscardDraft={handleDiscardDraft}
          onImportData={handleImportData}
          onResetDefaultData={handleResetDefaultData}
          onExitAdmin={() => setViewMode('public')}
          cloudImages={cloudImages}
          onAddCloudImage={handleAddCloudImage}
          onDeleteCloudImage={handleDeleteCloudImage}
          snapshots={snapshots}
          onCreateSnapshot={handleCreateSnapshot}
          onRestoreSnapshot={handleRestoreSnapshot}
          notifications={notifications}
          onSendNotification={handleSendNotification}
          onMarkNotificationAsRead={(id) =>
            setNotifications((prev) =>
              prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
            )
          }
          onMarkAllNotificationsAsRead={() =>
            setNotifications((prev) =>
              prev.map((n) => ({ ...n, isRead: true }))
            )
          }
          onDeleteNotification={(id) =>
            setNotifications((prev) => prev.filter((n) => n.id !== id))
          }
          quotes={quotes}
          onUpdateQuoteStatus={(id, status) =>
            setQuotes((prev) =>
              prev.map((q) => (q.id === id ? { ...q, status } : q))
            )
          }
          onGitHubPush={handleGitHubPush}
        />
      ) : (
        /* ================= PUBLIC PORTAL VIEW ================= */
        <>
          {/* Header */}
          <Header
            currentSection={activeSection}
            onNavigate={handleNavigateSection}
            onOpenAdmin={() => setViewMode('admin')}
            onOpenNotifications={() => setViewMode('admin')}
            onQuoteClick={() => handleNavigateSection('contacto')}
            unreadNotificationsCount={unreadCount}
          />

          {/* Main Public Sections */}
          <main>
            {/* Inicio / Hero */}
            <HeroSection
              hero={publishedContent.hero}
              onNavigate={handleNavigateSection}
            />

            {/* Servicios Industriales */}
            <ServicesSection
              services={publishedContent.services}
              onSelectService={handleSelectServiceForQuote}
              onBackToTop={handleBackToTop}
            />

            {/* Catálogo de Productos */}
            <ProductsSection
              products={publishedContent.products}
              onQuoteProduct={handleSelectProductForQuote}
              onBackToTop={handleBackToTop}
            />

            {/* Nosotros & Identidad */}
            <AboutSection
              about={publishedContent.about}
              onBackToTop={handleBackToTop}
            />

            {/* Ubicación & Despliegue Operativo */}
            <LocationSection
              location={publishedContent.location}
              onScheduleVisit={() => handleNavigateSection('contacto')}
              onBackToTop={handleBackToTop}
            />

            {/* Blog & Casos de Éxito */}
            <BlogSection
              posts={publishedContent.blog}
              onBackToTop={handleBackToTop}
            />

            {/* Solicitud de Cotización & Contactos */}
            <ContactSection
              initialService={quoteService}
              initialMessage={quoteMessage}
              onSubmitQuote={handleSubmitQuote}
              onBackToTop={handleBackToTop}
            />
          </main>

          {/* Footer */}
          <Footer onNavigate={handleNavigateSection} />

          {/* Floating Action Buttons */}
          <FloatingWidgets onBackToTop={handleBackToTop} />
        </>
      )}
    </div>
  );
}

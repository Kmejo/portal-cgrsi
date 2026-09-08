import React, { useState } from 'react';
import { CgrLogo } from '../CgrLogo';
import { PushNotification } from '../../types';
import {
  Phone,
  Mail,
  Clock,
  Globe,
  Share2,
  Bell,
  Sliders,
  Menu,
  X,
  ArrowRight,
} from 'lucide-react';

interface HeaderProps {
  unreadNotificationsCount: number;
  onOpenAdmin: () => void;
  onOpenNotifications: () => void;
  onQuoteClick: () => void;
  currentSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  unreadNotificationsCount,
  onOpenAdmin,
  onOpenNotifications,
  onQuoteClick,
  currentSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'productos', label: 'Catálogo & Suministros' },
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'ubicacion', label: 'Ubicación' },
    { id: 'blog', label: 'Blog Técnico' },
    { id: 'contacto', label: 'Contacto' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-[0_2px_12px_rgba(0,0,0,0.08)] bg-white">
      {/* Top Corporate Strip */}
      <div className="bg-[#1a212a] text-white py-1.5 px-4 sm:px-8 border-b border-gray-800">
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px] sm:text-xs">
          {/* Direct Communication Channels */}
          <div className="flex flex-wrap items-center gap-4 text-gray-300">
            <a
              href="tel:+5378300000"
              className="flex items-center gap-1.5 hover:text-[#fc7127] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#fc7127]" />
              <span className="font-mono font-medium">+53 7 830 0000 / +53 5 280 0000</span>
            </a>
            <a
              href="mailto:contacto@cgrsoluciones.cu"
              className="hidden sm:flex items-center gap-1.5 hover:text-[#fc7127] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#fc7127]" />
              <span>contacto@cgrsoluciones.cu</span>
            </a>
            <div className="hidden md:flex items-center gap-1.5 text-gray-400">
              <Clock className="w-3.5 h-3.5 text-[#fc7127]" />
              <span>Lun - Vie: 8:00 AM - 5:30 PM (Guardia 24h)</span>
            </div>
          </div>

          {/* Social and Quick Actions */}
          <div className="flex items-center gap-4">
            <span className="text-gray-400 hidden xl:inline">Red Corporativa S.U.R.L.</span>
            <div className="flex items-center gap-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn Corporativo"
                className="w-5 h-5 rounded flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://wa.me/5352800000"
                target="_blank"
                rel="noreferrer"
                title="WhatsApp Despacho"
                className="w-5 h-5 rounded flex items-center justify-center text-[#25D366] hover:bg-gray-800 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Quick Admin Access Button */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#2f3640] hover:bg-[#d35400] text-white transition-all text-[11px] font-semibold tracking-wide border border-gray-700 shadow-sm"
              title="Acceso a la Gestión de Datos & Publicación del Portal"
            >
              <Sliders className="w-3.5 h-3.5 text-[#fc7127]" />
              <span>Gestión de Contenido</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-white/95 backdrop-blur-md px-4 sm:px-8 border-b border-gray-200">
        <div className="h-20 max-w-[1360px] mx-auto flex items-center justify-between gap-4">
          {/* Corporate Brand Logo */}
          <button
            onClick={() => handleNavClick('inicio')}
            className="flex items-center text-left focus:outline-none focus:ring-2 focus:ring-[#d35400] rounded"
          >
            <CgrLogo size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded ${
                    isActive
                      ? 'bg-[#1a212a] text-white shadow-sm'
                      : 'text-gray-700 hover:text-[#1a212a] hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTA & Admin Utilities */}
          <div className="flex items-center gap-2.5">
            {/* Push Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg text-gray-700 hover:text-[#d35400] hover:bg-gray-100 transition-colors"
              title="Notificaciones Push del Portal"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#d35400] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Request Quote Button */}
            <button
              onClick={onQuoteClick}
              className="hidden sm:inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#d35400] hover:bg-[#a23f00] text-white rounded font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-[0_2px_8px_rgba(211,84,0,0.25)] hover:shadow-[0_4px_12px_rgba(211,84,0,0.35)]"
            >
              <span>Solicitar Cotización</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Admin Toggle Shortcut */}
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg bg-[#2f3640] hover:bg-[#1a212a] text-white transition-colors"
              title="Abrir Panel de Control"
            >
              <Sliders className="w-4 h-4 text-[#fc7127]" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#1a212a]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-gray-200 shadow-xl px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded font-heading font-semibold text-sm uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'bg-[#1a212a] text-white'
                    : 'text-gray-800 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onQuoteClick();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-[#d35400] text-white rounded font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2"
            >
              <span>Solicitar Cotización Formal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-[#2f3640] text-white rounded font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Sliders className="w-4 h-4 text-[#fc7127]" />
              <span>Abrir Panel de Administración</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

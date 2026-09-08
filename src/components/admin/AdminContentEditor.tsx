import React, { useState } from 'react';
import { SiteContent, StoredImage } from '../../types';
import {
  Save,
  Plus,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sliders,
  Layers,
  Wrench,
  Package,
  BookOpen,
  MapPin,
  ExternalLink,
} from 'lucide-react';

interface AdminContentEditorProps {
  content: SiteContent;
  onUpdateContent: (updated: SiteContent) => void;
  cloudImages: StoredImage[];
}

export const AdminContentEditor: React.FC<AdminContentEditorProps> = ({
  content,
  onUpdateContent,
  cloudImages,
}) => {
  const [activeSection, setActiveSection] = useState<
    'hero' | 'services' | 'products' | 'about' | 'location' | 'blog'
  >('hero');

  const [formData, setFormData] = useState<SiteContent>(content);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [imagePickerTarget, setImagePickerTarget] = useState<{
    type: 'hero' | 'product' | 'blog';
    index?: number;
  } | null>(null);

  const isReadOnly = false;

  // Synchronize internal state when content changes externally
  React.useEffect(() => {
    setFormData(content);
  }, [content]);

  const handleSave = () => {
    onUpdateContent(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleSelectCloudImage = (img: StoredImage) => {
    if (!imagePickerTarget) return;

    if (imagePickerTarget.type === 'hero') {
      setFormData({
        ...formData,
        hero: {
          ...formData.hero,
          heroImage: img.dataUrl,
        },
      });
    } else if (
      imagePickerTarget.type === 'product' &&
      typeof imagePickerTarget.index === 'number'
    ) {
      const nextProducts = [...formData.products];
      nextProducts[imagePickerTarget.index] = {
        ...nextProducts[imagePickerTarget.index],
        imageUrl: img.dataUrl,
        inCloudStorage: true,
      };
      setFormData({ ...formData, products: nextProducts });
    } else if (
      imagePickerTarget.type === 'blog' &&
      typeof imagePickerTarget.index === 'number'
    ) {
      const nextBlog = [...formData.blog];
      nextBlog[imagePickerTarget.index] = {
        ...nextBlog[imagePickerTarget.index],
        coverImageUrl: img.dataUrl,
      };
      setFormData({ ...formData, blog: nextBlog });
    }

    setImagePickerTarget(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-[#1a212a] flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#d35400]" />
            <span>Gestor de Contenidos en Tiempo Real</span>
          </h2>
          <p className="font-sans text-xs text-gray-500 mt-1">
            Modifica textos, parámetros de ingeniería, catálogo y artículos técnicos con actualización instantánea.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded border border-emerald-200 flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ¡Guardado en Vivo!
            </span>
          )}

          {!isReadOnly ? (
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-[#d35400] hover:bg-[#a23f00] text-white rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Cambios</span>
            </button>
          ) : (
            <span className="text-xs text-amber-800 bg-amber-50 px-3 py-1.5 rounded border border-amber-200 flex items-center gap-1 font-medium">
              <AlertCircle className="w-4 h-4" />
              Modo Auditoría (Solo Lectura)
            </span>
          )}
        </div>
      </div>

      {/* Section Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'hero', label: 'Inicio / Hero', icon: Layers },
          { id: 'services', label: 'Servicios Industriales', icon: Wrench },
          { id: 'products', label: 'Catálogo de Suministros', icon: Package },
          { id: 'blog', label: 'Blog & Casos de Éxito', icon: BookOpen },
          { id: 'about', label: 'Nosotros & Identidad', icon: FileText },
          { id: 'location', label: 'Ubicación & Bases', icon: MapPin },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap border ${
                isActive
                  ? 'bg-[#1a212a] text-white border-[#1a212a] shadow-sm'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#fc7127]' : 'text-gray-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: HERO / INICIO */}
      {activeSection === 'hero' && (
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h3 className="font-heading font-bold text-base text-[#1a212a] border-b border-gray-100 pb-3">
            Configuración de Sección Hero / Portada
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-700">
                Insignia / Overline
              </label>
              <input
                type="text"
                disabled={isReadOnly}
                value={formData.hero.badgeOverline}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, badgeOverline: e.target.value },
                  })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded text-xs text-gray-900 focus:bg-white focus:ring-1 focus:ring-[#d35400]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-700">
                Norma / Certificación Técnica
              </label>
              <input
                type="text"
                disabled={isReadOnly}
                value={formData.hero.standardLabel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, standardLabel: e.target.value },
                  })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded text-xs text-gray-900 focus:bg-white focus:ring-1 focus:ring-[#d35400]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-700">
                Título Principal (Prefijo)
              </label>
              <input
                type="text"
                disabled={isReadOnly}
                value={formData.hero.titleMain}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, titleMain: e.target.value },
                  })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded text-xs text-gray-900 focus:bg-white focus:ring-1 focus:ring-[#d35400]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-700">
                Título Resaltado (Cobre)
              </label>
              <input
                type="text"
                disabled={isReadOnly}
                value={formData.hero.titleHighlight}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, titleHighlight: e.target.value },
                  })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded text-xs text-gray-900 focus:bg-white focus:ring-1 focus:ring-[#d35400]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-gray-700">
              Descripción Corporativa
            </label>
            <textarea
              rows={3}
              disabled={isReadOnly}
              value={formData.hero.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hero: { ...formData.hero, description: e.target.value },
                })
              }
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded text-xs text-gray-900 focus:bg-white focus:ring-1 focus:ring-[#d35400]"
            />
          </div>

          {/* Workshop Live Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-700">
                Estado Taller en Vivo
              </label>
              <input
                type="text"
                disabled={isReadOnly}
                value={formData.hero.workshopStatus}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, workshopStatus: e.target.value },
                  })
                }
                className="w-full h-9 px-3 bg-white border border-gray-300 rounded text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-700">
                Ubicación del Taller
              </label>
              <input
                type="text"
                disabled={isReadOnly}
                value={formData.hero.workshopLocation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, workshopLocation: e.target.value },
                  })
                }
                className="w-full h-9 px-3 bg-white border border-gray-300 rounded text-xs"
              />
            </div>
            <div className="space-y-1 sm:col-span-3">
              <label className="text-xs font-bold uppercase text-gray-700">
                Aviso Operativo de Brigadas
              </label>
              <input
                type="text"
                disabled={isReadOnly}
                value={formData.hero.workshopNotice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, workshopNotice: e.target.value },
                  })
                }
                className="w-full h-9 px-3 bg-white border border-gray-300 rounded text-xs"
              />
            </div>
          </div>

          {/* Hero Media Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-700">
              Imagen Principal de Portada
            </label>
            <div className="flex items-center gap-4">
              <img
                src={formData.hero.heroImage}
                alt="Hero preview"
                className="w-24 h-16 object-cover rounded border border-gray-300"
              />
              {!isReadOnly && (
                <button
                  onClick={() => setImagePickerTarget({ type: 'hero' })}
                  className="px-4 py-2 bg-[#1a212a] text-white rounded font-heading text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#2f3640]"
                >
                  <ImageIcon className="w-4 h-4 text-[#fc7127]" />
                  <span>Seleccionar de la Nube Interna</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: SERVICIOS */}
      {activeSection === 'services' && (
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-heading font-bold text-base text-[#1a212a]">
              Gestión de Servicios de Ingeniería ({formData.services.length})
            </h3>
          </div>

          <div className="space-y-6">
            {formData.services.map((service, index) => (
              <div
                key={service.id}
                className="p-5 rounded-lg border border-gray-200 bg-gray-50/70 space-y-4 relative"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase text-gray-600">
                      Código
                    </label>
                    <input
                      type="text"
                      disabled={isReadOnly}
                      value={service.code}
                      onChange={(e) => {
                        const updated = [...formData.services];
                        updated[index].code = e.target.value;
                        setFormData({ ...formData, services: updated });
                      }}
                      className="w-full h-8 px-2.5 bg-white border border-gray-300 rounded text-xs font-mono font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase text-gray-600">
                      Norma DIN/ISO/ASME
                    </label>
                    <input
                      type="text"
                      disabled={isReadOnly}
                      value={service.standard}
                      onChange={(e) => {
                        const updated = [...formData.services];
                        updated[index].standard = e.target.value;
                        setFormData({ ...formData, services: updated });
                      }}
                      className="w-full h-8 px-2.5 bg-white border border-gray-300 rounded text-xs font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase text-gray-600">
                      Tema Visual
                    </label>
                    <select
                      disabled={isReadOnly}
                      value={service.theme}
                      onChange={(e) => {
                        const updated = [...formData.services];
                        updated[index].theme = e.target.value as 'light' | 'dark';
                        setFormData({ ...formData, services: updated });
                      }}
                      className="w-full h-8 px-2.5 bg-white border border-gray-300 rounded text-xs font-sans"
                    >
                      <option value="light">Claro (Blanco / Acero)</option>
                      <option value="dark">Oscuro (Grafito #2F3640)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-gray-600">
                    Título del Servicio
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={service.title}
                    onChange={(e) => {
                      const updated = [...formData.services];
                      updated[index].title = e.target.value;
                      setFormData({ ...formData, services: updated });
                    }}
                    className="w-full h-9 px-3 bg-white border border-gray-300 rounded text-xs font-heading font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-gray-600">
                    Descripción del Alcance
                  </label>
                  <textarea
                    rows={2}
                    disabled={isReadOnly}
                    value={service.description}
                    onChange={(e) => {
                      const updated = [...formData.services];
                      updated[index].description = e.target.value;
                      setFormData({ ...formData, services: updated });
                    }}
                    className="w-full p-2.5 bg-white border border-gray-300 rounded text-xs font-sans"
                  />
                </div>

                {/* Features list */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase text-gray-600 block">
                    Puntos Clave Destacados (3 viñetas)
                  </label>
                  {service.features.map((feat, fIndex) => (
                    <input
                      key={fIndex}
                      type="text"
                      disabled={isReadOnly}
                      value={feat}
                      onChange={(e) => {
                        const updated = [...formData.services];
                        updated[index].features[fIndex] = e.target.value;
                        setFormData({ ...formData, services: updated });
                      }}
                      className="w-full h-8 px-2.5 bg-white border border-gray-300 rounded text-xs"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: PRODUCTOS */}
      {activeSection === 'products' && (
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-heading font-bold text-base text-[#1a212a]">
              Líneas del Catálogo Técnico ({formData.products.length})
            </h3>
            {!isReadOnly && (
              <button
                onClick={() => {
                  const newProduct = {
                    id: 'prod-' + Date.now(),
                    sku: 'CGR-NEW-' + Math.floor(1000 + Math.random() * 9000),
                    category: 'valvulas' as const,
                    standard: 'DIN / ISO',
                    title: 'Nuevo Equipo o Suministro Industrial',
                    description: 'Descripción técnica y parámetros de tolerancia.',
                    specsSummary: 'Presión: 300 PSI · Garantía 2 Años',
                    imageUrl: cloudImages[0]?.dataUrl || formData.products[0].imageUrl,
                    stockStatus: 'In Stock' as const,
                    inCloudStorage: true,
                  };
                  setFormData({
                    ...formData,
                    products: [...formData.products, newProduct],
                  });
                }}
                className="px-3.5 py-1.5 bg-[#1a212a] hover:bg-[#2f3640] text-white rounded font-heading font-bold text-xs uppercase flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-[#fc7127]" />
                <span>Añadir Producto</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formData.products.map((product, pIdx) => (
              <div
                key={product.id}
                className="p-5 rounded-lg border border-gray-200 bg-gray-50/60 space-y-3 relative"
              >
                {!isReadOnly && (
                  <button
                    onClick={() => {
                      const next = formData.products.filter((_, i) => i !== pIdx);
                      setFormData({ ...formData, products: next });
                    }}
                    className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 rounded"
                    title="Eliminar producto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                <div className="flex items-center gap-3">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-20 h-16 object-cover rounded border border-gray-300 shrink-0"
                  />
                  {!isReadOnly && (
                    <button
                      onClick={() =>
                        setImagePickerTarget({ type: 'product', index: pIdx })
                      }
                      className="text-xs text-[#d35400] font-bold hover:underline flex items-center gap-1"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Cambiar Imagen de Nube</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-500">
                      SKU
                    </label>
                    <input
                      type="text"
                      disabled={isReadOnly}
                      value={product.sku}
                      onChange={(e) => {
                        const updated = [...formData.products];
                        updated[pIdx].sku = e.target.value;
                        setFormData({ ...formData, products: updated });
                      }}
                      className="w-full h-8 px-2 bg-white border border-gray-300 rounded text-xs font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-500">
                      Norma
                    </label>
                    <input
                      type="text"
                      disabled={isReadOnly}
                      value={product.standard}
                      onChange={(e) => {
                        const updated = [...formData.products];
                        updated[pIdx].standard = e.target.value;
                        setFormData({ ...formData, products: updated });
                      }}
                      className="w-full h-8 px-2 bg-white border border-gray-300 rounded text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-500">
                    Título del Producto
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={product.title}
                    onChange={(e) => {
                      const updated = [...formData.products];
                      updated[pIdx].title = e.target.value;
                      setFormData({ ...formData, products: updated });
                    }}
                    className="w-full h-8 px-2.5 bg-white border border-gray-300 rounded text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-500">
                    Especificaciones
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={product.specsSummary}
                    onChange={(e) => {
                      const updated = [...formData.products];
                      updated[pIdx].specsSummary = e.target.value;
                      setFormData({ ...formData, products: updated });
                    }}
                    className="w-full h-8 px-2 bg-white border border-gray-300 rounded text-xs font-mono"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: BLOG */}
      {activeSection === 'blog' && (
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-heading font-bold text-base text-[#1a212a]">
              Artículos Técnicos & Casos ({formData.blog.length})
            </h3>
            {!isReadOnly && (
              <button
                onClick={() => {
                  const newPost = {
                    id: 'blog-' + Date.now(),
                    title: 'Nuevo Caso de Estudio Industrial',
                    slug: 'nuevo-caso-estudio-' + Date.now(),
                    summary: 'Resumen ejecutivo del proyecto y resultados obtenidos en planta.',
                    content: '### Alcance Técnico\nDetalle de la metodología y normas aplicadas.',
                    author: 'Ing. Carlos Menéndez',
                    authorRole: 'Director de Ingeniería',
                    date: 'Hoy',
                    category: 'Ingeniería' as const,
                    tags: ['Industria', 'Procedimiento'],
                    coverImageUrl: cloudImages[0]?.dataUrl || formData.blog[0].coverImageUrl,
                    readTime: '4 min',
                    isPublished: true,
                  };
                  setFormData({ ...formData, blog: [newPost, ...formData.blog] });
                }}
                className="px-3.5 py-1.5 bg-[#1a212a] hover:bg-[#2f3640] text-white rounded font-heading font-bold text-xs uppercase flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-[#fc7127]" />
                <span>Nuevo Artículo</span>
              </button>
            )}
          </div>

          <div className="space-y-6">
            {formData.blog.map((post, bIdx) => (
              <div
                key={post.id}
                className="p-5 rounded-lg border border-gray-200 bg-gray-50/70 space-y-4 relative"
              >
                {!isReadOnly && (
                  <button
                    onClick={() => {
                      const next = formData.blog.filter((_, i) => i !== bIdx);
                      setFormData({ ...formData, blog: next });
                    }}
                    className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 rounded"
                    title="Eliminar artículo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                <div className="flex items-center gap-3">
                  <img
                    src={post.coverImageUrl}
                    alt={post.title}
                    className="w-24 h-16 object-cover rounded border border-gray-300 shrink-0"
                  />
                  {!isReadOnly && (
                    <button
                      onClick={() =>
                        setImagePickerTarget({ type: 'blog', index: bIdx })
                      }
                      className="text-xs text-[#d35400] font-bold hover:underline flex items-center gap-1"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Cambiar Portada de Nube</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[11px] font-bold uppercase text-gray-600">
                      Título
                    </label>
                    <input
                      type="text"
                      disabled={isReadOnly}
                      value={post.title}
                      onChange={(e) => {
                        const updated = [...formData.blog];
                        updated[bIdx].title = e.target.value;
                        setFormData({ ...formData, blog: updated });
                      }}
                      className="w-full h-8 px-2.5 bg-white border border-gray-300 rounded text-xs font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase text-gray-600">
                      Categoría
                    </label>
                    <select
                      disabled={isReadOnly}
                      value={post.category}
                      onChange={(e) => {
                        const updated = [...formData.blog];
                        updated[bIdx].category = e.target.value as any;
                        setFormData({ ...formData, blog: updated });
                      }}
                      className="w-full h-8 px-2 bg-white border border-gray-300 rounded text-xs"
                    >
                      <option value="Mantenimiento">Mantenimiento</option>
                      <option value="Normativa">Normativa</option>
                      <option value="Ingeniería">Ingeniería</option>
                      <option value="Casos de Éxito">Casos de Éxito</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-gray-600">
                    Contenido Técnico (Markdown)
                  </label>
                  <textarea
                    rows={4}
                    disabled={isReadOnly}
                    value={post.content}
                    onChange={(e) => {
                      const updated = [...formData.blog];
                      updated[bIdx].content = e.target.value;
                      setFormData({ ...formData, blog: updated });
                    }}
                    className="w-full p-2.5 bg-white border border-gray-300 rounded text-xs font-mono"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: NOSOTROS */}
      {activeSection === 'about' && (
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h3 className="font-heading font-bold text-base text-[#1a212a] border-b border-gray-100 pb-3">
            Identidad Corporativa, Pilares y Registro S.U.R.L.
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-gray-700">
              Título Institucional
            </label>
            <input
              type="text"
              disabled={isReadOnly}
              value={formData.about.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  about: { ...formData.about, title: e.target.value },
                })
              }
              className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded text-xs font-bold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-gray-700">
              Narrativa de la Marca (Grafito & Cobre)
            </label>
            <textarea
              rows={3}
              disabled={isReadOnly}
              value={formData.about.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  about: { ...formData.about, description: e.target.value },
                })
              }
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded text-xs"
            />
          </div>

          {/* Quality Metrics */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase text-gray-700 block">
              Métricas de Trazabilidad y Calidad (%)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {formData.about.qualityMetrics.map((qm, qIdx) => (
                <div key={qm.id} className="p-3 bg-gray-50 rounded border border-gray-200">
                  <span className="text-[11px] text-gray-600 block mb-1">{qm.label}</span>
                  <input
                    type="number"
                    disabled={isReadOnly}
                    value={qm.percentage}
                    onChange={(e) => {
                      const nextQm = [...formData.about.qualityMetrics];
                      const val = parseFloat(e.target.value) || 0;
                      nextQm[qIdx].percentage = val;
                      nextQm[qIdx].valueString = `${val}%`;
                      setFormData({
                        ...formData,
                        about: { ...formData.about, qualityMetrics: nextQm },
                      });
                    }}
                    className="w-full h-8 px-2 bg-white border border-gray-300 rounded text-xs font-mono font-bold"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: UBICACIÓN */}
      {activeSection === 'location' && (
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h3 className="font-heading font-bold text-base text-[#1a212a] border-b border-gray-100 pb-3">
            Dirección, Teléfonos y Despliegue Operativo
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-700">
                Dirección Fiscal / Sede Central
              </label>
              <input
                type="text"
                disabled={isReadOnly}
                value={formData.location.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, address: e.target.value },
                  })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-700">
                Ciudad / Provincia
              </label>
              <input
                type="text"
                disabled={isReadOnly}
                value={formData.location.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, city: e.target.value },
                  })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-700">
                Teléfono Centralita
              </label>
              <input
                type="text"
                disabled={isReadOnly}
                value={formData.location.phonePrimary}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, phonePrimary: e.target.value },
                  })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded text-xs font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-700">
                Guardia Técnica 24h
              </label>
              <input
                type="text"
                disabled={isReadOnly}
                value={formData.location.phoneEmergency}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, phoneEmergency: e.target.value },
                  })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded text-xs font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* Internal Cloud Image Picker Modal */}
      {imagePickerTarget && (
        <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-xl shadow-2xl p-6 border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h4 className="font-heading font-bold text-sm text-[#1a212a] flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#d35400]" />
                <span>Seleccionar Imagen desde CGR Cloud Storage</span>
              </h4>
              <button
                onClick={() => setImagePickerTarget(null)}
                className="text-xs text-gray-500 hover:text-gray-900"
              >
                Cancelar
              </button>
            </div>

            <p className="text-xs text-gray-500">
              Imágenes internas almacenadas de manera escalable y comprimidas automáticamente:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto p-1">
              {cloudImages.map((img) => (
                <button
                  key={img.id}
                  onClick={() => handleSelectCloudImage(img)}
                  className="group relative rounded-lg overflow-hidden border border-gray-200 hover:border-[#d35400] transition-all p-1 bg-gray-50 text-left"
                >
                  <img
                    src={img.dataUrl}
                    alt={img.altText}
                    className="w-full h-24 object-cover rounded"
                  />
                  <div className="mt-1">
                    <span className="font-mono text-[10px] text-gray-700 line-clamp-1 font-bold">
                      {img.name}
                    </span>
                    <span className="text-[9px] text-[#d35400] font-mono block">
                      -{img.compressionRatio}%
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

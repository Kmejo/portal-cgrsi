import React, { useState, useRef } from 'react';
import { StoredImage } from '../../types';
import {
  processAndCompressImage,
  formatBytes,
} from '../../utils/imageCompressor';
import {
  UploadCloud,
  HardDrive,
  Cpu,
  Layers,
  CheckCircle,
  Copy,
  Trash2,
  Download,
  Search,
  Filter,
  Sparkles,
  Tag,
  AlertTriangle,
} from 'lucide-react';

interface AdminImageStorageProps {
  images: StoredImage[];
  onAddImage: (newImg: StoredImage) => void;
  onDeleteImage: (id: string) => void;
}

export const AdminImageStorage: React.FC<AdminImageStorageProps> = ({
  images,
  onAddImage,
  onDeleteImage,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [quality, setQuality] = useState(82);
  const [maxDimension, setMaxDimension] = useState(1920);
  const [category, setCategory] = useState('Maquinaria');
  const [altText, setAltText] = useState('');
  const [tagsInput, setTagsInput] = useState('Industrial, CGR');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todos');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const isReadOnly = false;

  // Metrics calculation
  const totalOriginalBytes = images.reduce((acc, img) => acc + img.originalSize, 0);
  const totalCompressedBytes = images.reduce((acc, img) => acc + img.compressedSize, 0);
  const totalSavedBytes = Math.max(0, totalOriginalBytes - totalCompressedBytes);
  const averageRatio =
    images.length > 0
      ? (
          images.reduce((acc, img) => acc + img.compressionRatio, 0) /
          images.length
        ).toFixed(1)
      : '0';

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    setIsProcessing(true);
    try {
      const tags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const processed = await processAndCompressImage(file, {
        maxWidth: maxDimension,
        maxHeight: maxDimension,
        quality: quality / 100,
        format: 'image/webp',
        category,
        altText: altText || file.name,
        tags,
      });

      onAddImage(processed);
      setAltText('');
    } catch (err) {
      console.error(err);
      alert('Error al comprimir y almacenar la imagen internamente.');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCopyUri = (uri: string, id: string) => {
    navigator.clipboard.writeText(uri);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredImages = images.filter((img) => {
    const matchesCategory =
      categoryFilter === 'Todos' || img.category === categoryFilter;
    const matchesSearch =
      img.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.altText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#1a212a] text-[#fc7127] flex items-center justify-center shrink-0">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-2xl text-[#1a212a]">
              {images.length}
            </span>
            <span className="text-xs text-gray-500 font-bold uppercase block">
              Activos en Cloud Interno
            </span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#2f3640] text-emerald-400 flex items-center justify-center shrink-0">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-2xl text-emerald-600">
              {formatBytes(totalSavedBytes)}
            </span>
            <span className="text-xs text-gray-500 font-bold uppercase block">
              Espacio & Ancho de Banda Ahorrado
            </span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#d35400] text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-2xl text-[#d35400]">
              -{averageRatio}%
            </span>
            <span className="text-xs text-gray-500 font-bold uppercase block">
              Tasa Media de Compresión
            </span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gray-100 text-gray-800 flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-2xl text-gray-800">
              WebP Pro
            </span>
            <span className="text-xs text-gray-500 font-bold uppercase block">
              Formato Sin Dependencias Externas
            </span>
          </div>
        </div>
      </div>

      {/* Upload and Compression Box */}
      {!isReadOnly && (
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="font-heading font-bold text-base text-[#1a212a] flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-[#d35400]" />
                <span>Carga Directa & Compresor Automático en Canvas</span>
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Convierte automáticamente archivos pesados (PNG/JPEG/TIFF) en formato WebP comprimido con asignación de URI interna escalable.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-700">
                Categoría Industrial
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-9 px-3 bg-gray-50 border border-gray-300 rounded text-xs"
              >
                <option value="Maquinaria">Maquinaria & Taller</option>
                <option value="Válvulas">Válvulas & Piping</option>
                <option value="Transmisión">Transmisión & Rodamientos</option>
                <option value="Motores">Motores Eléctricos</option>
                <option value="EPP">Seguridad Industrial EPP</option>
                <option value="General">General / Infraestructura</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-700">
                Resolución Máxima
              </label>
              <select
                value={maxDimension}
                onChange={(e) => setMaxDimension(Number(e.target.value))}
                className="w-full h-9 px-3 bg-gray-50 border border-gray-300 rounded text-xs"
              >
                <option value={1920}>Full HD (1920px)</option>
                <option value={1200}>Catálogo Estándar (1200px)</option>
                <option value={800}>Miniatura Rápida (800px)</option>
              </select>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold uppercase text-gray-700">
                <span>Calidad WebP</span>
                <span className="font-mono text-[#d35400]">{quality}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="95"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#d35400] mt-2"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-700">
                Etiquetas / Tags
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Válvula, Acero, DIN..."
                className="w-full h-9 px-3 bg-gray-50 border border-gray-300 rounded text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-gray-700">
              Texto Alternativo (ALT) para Accesibilidad y Metadatos
            </label>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Ej: Montaje de reductor planetario en fábrica de cemento..."
              className="w-full h-9 px-3 bg-gray-50 border border-gray-300 rounded text-xs"
            />
          </div>

          {/* Drag & Drop Zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 hover:border-[#d35400] rounded-xl p-8 text-center cursor-pointer transition-all bg-gray-50/60 hover:bg-orange-50/20 group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <div className="w-12 h-12 rounded-full bg-[#1a212a] text-white flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-6 h-6 text-[#fc7127]" />
            </div>
            <p className="font-heading font-bold text-sm text-[#1a212a]">
              {isProcessing
                ? 'Procesando y comprimiendo con WebP Canvas...'
                : 'Arrastra una imagen aquí o haz clic para examinar'}
            </p>
            <p className="font-sans text-xs text-gray-500 mt-1">
              Se procesa en memoria local con compresión bicúbica, reduciendo más del 80% del peso sin pérdida perceptible.
            </p>
          </div>
        </div>
      )}

      {/* Cloud Library Explorer */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-[#d35400]" />
            <h3 className="font-heading font-bold text-base text-[#1a212a]">
              Repositorio de Medios en la Nube CGR ({filteredImages.length})
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Filter */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre o tag..."
                className="pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded text-gray-800 focus:ring-1 focus:ring-[#d35400]"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1 overflow-x-auto">
              {['Todos', 'Maquinaria', 'Válvulas', 'Transmisión', 'Motores', 'EPP'].map(
                (c) => (
                  <button
                    key={c}
                    onClick={() => setCategoryFilter(c)}
                    className={`px-2.5 py-1 rounded text-[11px] font-heading font-bold uppercase ${
                      categoryFilter === c
                        ? 'bg-[#1a212a] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {c}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow"
            >
              <div>
                <div className="relative h-44 bg-gray-900 overflow-hidden">
                  <img
                    src={img.dataUrl}
                    alt={img.altText}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-emerald-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase shadow">
                    -{img.compressionRatio}%
                  </span>
                  <span className="absolute top-2.5 right-2.5 bg-[#1a212a]/90 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded shadow">
                    {img.width}x{img.height}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-xs text-[#1a212a] truncate block max-w-[200px]">
                      {img.name}
                    </span>
                    <span className="font-mono text-[10px] text-gray-500">
                      {formatBytes(img.compressedSize)}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-600 line-clamp-1 italic">
                    "{img.altText}"
                  </p>

                  {/* Internal URI Box */}
                  <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-200 text-[10px] font-mono text-gray-600">
                    <span className="truncate mr-2">{img.cloudUri}</span>
                    <button
                      onClick={() => handleCopyUri(img.cloudUri, img.id)}
                      className="text-[#d35400] hover:text-[#a23f00] shrink-0 font-sans font-bold flex items-center gap-1"
                      title="Copiar URI interna"
                    >
                      {copiedId === img.id ? (
                        <span className="text-emerald-600 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Copiado
                        </span>
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1">
                    {img.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="p-4 pt-0 flex items-center justify-between border-t border-gray-200/60 mt-2">
                <a
                  href={img.dataUrl}
                  download={img.name}
                  className="text-xs text-gray-600 hover:text-[#1a212a] flex items-center gap-1 font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar</span>
                </a>

                {!isReadOnly && (
                  <button
                    onClick={() => onDeleteImage(img.id)}
                    className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Eliminar</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

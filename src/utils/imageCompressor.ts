import { StoredImage } from '../types';

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0
  format?: 'image/webp' | 'image/jpeg' | 'image/png';
  category?: string;
  altText?: string;
  tags?: string[];
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export async function processAndCompressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<StoredImage> {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.82,
    format = 'image/webp',
    category = 'General',
    altText = '',
    tags = [],
  } = options;

  return new Promise((resolve, reject) => {
    const originalSize = file.size;
    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        // Calculate clamped aspect ratio dimensions
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        // Render to offscreen canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('No se pudo inicializar el contexto 2D de canvas'));
          return;
        }

        // High quality bicubic smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to selected format (WebP by default)
        const dataUrl = canvas.toDataURL(format, quality);

        // Calculate compressed byte size from Base64
        const head = `data:${format};base64,`;
        const base64Data = dataUrl.startsWith(head) ? dataUrl.slice(head.length) : dataUrl;
        const compressedSize = Math.round((base64Data.length * 3) / 4);

        // Savings percentage
        const compressionRatio = Math.max(
          0,
          parseFloat((((originalSize - compressedSize) / originalSize) * 100).toFixed(1))
        );

        // Clean filename and generate internal cloud storage URI
        const cleanName = file.name
          .toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/\.[^/.]+$/, '') + '.webp';

        const cloudUri = `cgr://cloud-storage/${category.toLowerCase()}/${cleanName}`;

        const storedImage: StoredImage = {
          id: 'img-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
          name: cleanName,
          cloudUri,
          originalSize,
          compressedSize,
          compressionRatio,
          width,
          height,
          mimeType: format,
          altText: altText || `${cleanName.replace(/_/g, ' ')} optimizado en CGR Cloud`,
          tags: tags.length > 0 ? tags : ['Industrial', category],
          category,
          uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          dataUrl,
        };

        resolve(storedImage);
      };

      img.onerror = () => {
        reject(new Error('Error al cargar la imagen para procesamiento'));
      };

      if (typeof readerEvent.target?.result === 'string') {
        img.src = readerEvent.target.result;
      }
    };

    reader.onerror = () => reject(new Error('Error al leer el archivo en disco'));
    reader.readAsDataURL(file);
  });
}

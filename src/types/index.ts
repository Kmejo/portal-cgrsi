// CGR Soluciones Integrales S.U.R.L. - Definiciones de Tipos del Sistema

export interface MetricItem {
  id: string;
  value: string;
  label: string;
  highlightColor?: 'primary' | 'secondary';
}

export interface ServiceItem {
  id: string;
  code: string;
  standard: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  theme: 'light' | 'dark';
  technicalSpecs: {
    scopeTitle: string;
    points: string[];
  };
}

export interface ProductItem {
  id: string;
  sku: string;
  category: 'valvulas' | 'transmision' | 'motores' | 'epp' | 'todos';
  standard: string;
  title: string;
  description: string;
  specsSummary: string;
  imageUrl: string;
  stockStatus: 'In Stock' | 'Bajo Pedido' | 'Urgente';
  inCloudStorage?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  category: 'Ingeniería' | 'Mantenimiento' | 'Normativa' | 'Casos de Éxito';
  tags: string[];
  coverImageUrl: string;
  readTime: string;
  isPublished: boolean;
}

export interface CorporatePillar {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface QualityMetric {
  id: string;
  label: string;
  valueString: string;
  percentage: number;
}

export interface LocationBase {
  id: string;
  name: string;
  city: string;
  type: 'Occidental (Sede)' | 'Sub-base Central' | 'Base Oriental';
  status: 'Activa 24/7' | 'Operativa';
}

export interface QuoteRequest {
  id: string;
  clientName: string;
  clientCompany: string;
  clientPhone: string;
  clientEmail: string;
  serviceType: string;
  message: string;
  ndaAgreed: boolean;
  status: 'Pendiente' | 'En Revisión' | 'Cotizado' | 'Archivado';
  date: string;
}

export interface StoredImage {
  id: string;
  name: string;
  cloudUri: string; // e.g. cgr://storage-bucket/valves-high-pressure.webp
  originalSize: number; // bytes
  compressedSize: number; // bytes
  compressionRatio: number; // percentage reduction
  width: number;
  height: number;
  mimeType: string;
  altText: string;
  tags: string[];
  category: string;
  uploadedAt: string;
  dataUrl: string; // Base64 or Blob internal representation
}

export interface PushNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  category?: 'sistema' | 'publicacion' | 'cotizacion' | 'almacen';
  actionUrl?: string;
  author?: string;
}

export interface SiteContent {
  hero: {
    badgeOverline: string;
    standardLabel: string;
    titleMain: string;
    titleHighlight: string;
    description: string;
    heroImage: string;
    workshopStatus: string;
    workshopLocation: string;
    workshopNotice: string;
    metrics: MetricItem[];
  };
  services: ServiceItem[];
  products: ProductItem[];
  about: {
    overline: string;
    title: string;
    description: string;
    mercantileRegistry: string;
    pillars: CorporatePillar[];
    qualityMetrics: QualityMetric[];
  };
  location: {
    address: string;
    city: string;
    phonePrimary: string;
    phoneEmergency: string;
    email: string;
    mapImageUrl: string;
    scheduleWeekday: string;
    scheduleSaturday: string;
    contingencyNotice: string;
    craneNotice: string;
    bases: LocationBase[];
  };
  blog: BlogPost[];
}

export interface VersionSnapshot {
  id: string;
  versionNumber: string;
  timestamp: string;
  author: string;
  commitMessage: string;
  changesSummary: string[];
  data: SiteContent;
  isActive: boolean;
}

export interface GitHubFile {
  path: string;
  name: string;
  type: 'file' | 'dir';
  content?: string;
  language: string;
  status: 'synced' | 'modified' | 'staged';
}

export interface GitHubCommit {
  sha: string;
  message: string;
  author: string;
  timestamp: string;
  branch: string;
}

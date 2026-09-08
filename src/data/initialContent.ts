import { SiteContent, VersionSnapshot, PushNotification, StoredImage, GitHubFile, GitHubCommit } from '../types';

export const INITIAL_SITE_CONTENT: SiteContent = {
  hero: {
    badgeOverline: 'Respaldo Integral S.U.R.L.',
    standardLabel: 'ISO 9001 / DIN Normas',
    titleMain: 'Ingeniería, Mantenimiento y ',
    titleHighlight: 'Soluciones Integrales para la Industria',
    description: 'Especialistas en proyectos técnicos, suministro industrial de alta exigencia, montaje electro-mecánico y consultoría operativa con estrictos estándares de precisión y seguridad continua.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQjm8Cp2chVUklbLVVt_5ijdRvvR0naHydb73FxFQJ9MPgfgpPpX4y-6dX9in2SOxzNpEINZ3UiysQSZ47qMIPm3EQIdHghTXJaMBoNSVo655URQc2CKO4Y_5pBY4m3kEnEKVVoFb43FAdePrZpnkoICjKnoUfK5g27IIPwchMRzx2z8rALq90o4xs5915SjR1bu3totn1VEssrmjJPWohL1nRF5C5MMHSbAFo9t0lC--NT8fLvxce',
    workshopStatus: 'Taller Central Activo',
    workshopLocation: 'Habana - Región Industrial',
    workshopNotice: 'Disponibilidad de brigadas para intervención electromecánica y soldadura técnica.',
    metrics: [
      { id: 'm1', value: '+15', label: 'Años de Trayectoria', highlightColor: 'primary' },
      { id: 'm2', value: '100%', label: 'Cobertura Nacional', highlightColor: 'secondary' },
      { id: 'm3', value: 'DIN/ISO', label: 'Normas Certificadas', highlightColor: 'primary' },
      { id: 'm4', value: '24/7', label: 'Soporte Operativo', highlightColor: 'secondary' },
    ],
  },
  services: [
    {
      id: 'serv-1',
      code: 'SER-01',
      standard: 'DIN 31051',
      title: 'Mantenimiento Mecánico e Industrial',
      description: 'Mantenimiento preventivo, predictivo y correctivo de maquinaria pesada, sistemas de transmisión y líneas de producción continua para evitar paradas no programadas.',
      icon: 'precision_manufacturing',
      theme: 'light',
      features: [
        'Alineación láser de ejes y análisis vibracional predictivo',
        'Overhaul integral de reductores, bombas y cajas de engranaje',
        'Termografía y balances dinámicos en sitio',
      ],
      technicalSpecs: {
        scopeTitle: 'Alcance y Metodología Operativa:',
        points: [
          'Inspección acústica con ultrasonido estructural y vibrómetro triaxial FFT.',
          'Protocolo de alineación de ejes con tolerancia angular < 0.05 mm/m.',
          'Restauración de huelgos dimensionales mediante metalización y alesado in situ.',
          'Emisión de reporte técnico de entrega con firma de ingeniero colegiado responsable.',
        ],
      },
    },
    {
      id: 'serv-2',
      code: 'SER-02',
      standard: 'IEC 61131',
      title: 'Montaje y Automatización de Procesos',
      description: 'Diseño integral, montaje en campo y programación de sistemas SCADA, PLC, variadores de frecuencia y sensórica de instrumentación para control industrial exacto.',
      icon: 'account_tree',
      theme: 'dark',
      features: [
        'Fabricación y certificación de tableros de potencia y control',
        'Calibración de lazos PID y redes de comunicación Modbus/Profinet',
        'Modernización y migración tecnológica de maquinaria obsoleta',
      ],
      technicalSpecs: {
        scopeTitle: 'Normativas y Protocolos de Integración:',
        points: [
          'Diseño de diagramas unifilares y esquemas eléctricos en formato ePLAN.',
          'Programación estructurada de PLC Siemens S7-1200/1500 y Allen Bradley CompactLogix.',
          'Puesta en servicio de variadores de frecuencia y arrancadores suaves con supresores de armónicos.',
          'Pruebas FAT (Factory Acceptance Test) y SAT (Site Acceptance Test) documentadas.',
        ],
      },
    },
    {
      id: 'serv-3',
      code: 'SER-03',
      standard: 'AWS D1.1 & ASME',
      title: 'Ingeniería Estructural y Soldadura Homologada',
      description: 'Cálculo, ensamblaje y montaje de estructuras metálicas portantes, tuberías de proceso a presión (piping), silos de almacenamiento y calderería pesada.',
      icon: 'hardware',
      theme: 'dark',
      features: [
        'Soldadores calificados bajo normas ASME IX y AWS D1.1',
        'Ensayos No Destructivos (END): Ultrasonido, Líquidos Penetrantes',
        'Tratamientos anticorrosivos industriales con esquemas epóxicos',
      ],
      technicalSpecs: {
        scopeTitle: 'Capacidades de Taller y Ensayos:',
        points: [
          'Soldaduras SMAW, GMAW (MIG/MAG) y GTAW (TIG) con WPS/PQR calificados.',
          'Inspección por Líquidos Penetrantes (PT) y Partículas Magnéticas (MT) Nivel II.',
          'Chapa de acero estructural ASTM A36, A572 Gr. 50 y tubería ASTM A106 / A53.',
          'Tratamiento térmico post-soldadura (PWHT) para eliminación de tensiones residuales.',
        ],
      },
    },
    {
      id: 'serv-4',
      code: 'SER-04',
      standard: 'LOGÍSTICA B2B',
      title: 'Suministro Técnico & Logística Industrial',
      description: 'Cadena de distribución garantizada para repuestos críticos, consumibles técnicos certificados, aceros especiales y herramientas industriales de alta demanda.',
      icon: 'local_shipping',
      theme: 'light',
      features: [
        'Homologación de fabricantes internacionales y trazabilidad de origen',
        'Stock de seguridad en almacén fiscal para entregas urgentes',
        'Documentación de calidad: certificados de colada 3.1 y calibración',
      ],
      technicalSpecs: {
        scopeTitle: 'Garantía de Cadena de Suministro:',
        points: [
          'Inspección de calidad al arribo con control dimensional y certificados de material 3.1.',
          'Gestión de stock de partes críticas bajo modelo consignación o almacén dedicado.',
          'Embalaje marítimo y terrestre con protección anticorrosiva para almacenaje prolongado.',
          'Trazabilidad completa con código QR y ficha técnica asociada por partida.',
        ],
      },
    },
  ],
  products: [
    {
      id: 'prod-1',
      sku: 'CGR-VLV-4820',
      category: 'valvulas',
      standard: 'ANSI 150/300',
      title: 'Válvulas y Tuberías de Alta Presión',
      description: 'Válvulas de compuerta, retención, globo y mariposa en acero al carbono A216 WCB y acero inoxidable 316.',
      specsSummary: 'Rango: 1/2" hasta 24" · Presión max: 600 PSI',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD9v7lQPyv3H61mXM9N3k4G_UGtSpRH1DHTyGVMGywZd5-lA05Cv_miplgm8KdUkOlc-nl_QqIzCzolkcn8Fg0YmXLmX9ezHPCTx2TppTvfMs2mWLUDfBTp9cvo0GVnUxiuSLZTEBVN0BZRSQm72O9ow98dOVkgSJ8lYl5LI99JJVm1gzfr-QvKlpj9UUDPRKBhQFj0ETiUw8_t2rvzfHhXPQaiUArnL5UjQPqFRNgp1wqxGGhLEho',
      stockStatus: 'In Stock',
      inCloudStorage: true,
    },
    {
      id: 'prod-2',
      sku: 'CGR-ROD-9104',
      category: 'transmision',
      standard: 'ISO / DIN 625',
      title: 'Rodamientos y Transmisión de Potencia',
      description: 'Rodamientos cónicos, de rodillos oscilantes, chumaceras tipo puente y poleas sincrónicas para servicio severo.',
      specsSummary: 'Tolerancia: P6/P5 · Grasa alta temp. -40°C a +180°C',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI8-J_deQPVvO7rGz0GpVUanrmF4KeBM6u73Y1UykS8JpBsxK9cFVphhWTU5EtNcVYTtUEdnWEv7qDcC-ME5-m55fShT6INoF3EifYhSa4DQ6afGkznomWESuqo6wcWGiduGjnLXjZ_6T1UEIAkknzNYyDFLDTaHc1s_qiF2JwCX8ji3Bivepws6PNRqGFEGmG_XxrYgVfbNUrzsDcRFxg06C89yhlruVsCG_gMKMf1JvA9puIjwhH',
      stockStatus: 'In Stock',
      inCloudStorage: true,
    },
    {
      id: 'prod-3',
      sku: 'CGR-MOT-3341',
      category: 'motores',
      standard: 'IEC IE3 Premium',
      title: 'Motores Eléctricos y Reductores',
      description: 'Motores trifásicos asíncronos jaula de ardilla, reductores helicoidales y coronas sin fin de alto torque.',
      specsSummary: 'Potencias: 0.75 kW a 160 kW · Protección IP55 / IP66',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaNB106mpdiMlmosiHeEiluP9F-FMokgGdH0UoMMOIFNsrTtB4Z_gPjl8Q5ZRqGq9KHaC4xPtYnANiRVy_I6SB75x3cUYjFfwhH4zSsesaR2HCWI0HdAXCeTsvgWrLhjqZQ8MIVnFReHMBPVWgn9THQfvp1m2xb2eddDucN6XWId9uWBMjKHrhnEDburW_J8QAzC6SUr-l1nbZDDco8N0zBeO8s1nIQ0RsPZ1viCG0LhXLmXZ2e3gM',
      stockStatus: 'In Stock',
      inCloudStorage: true,
    },
    {
      id: 'prod-4',
      sku: 'CGR-EPP-7720',
      category: 'epp',
      standard: 'CE / OSHA / EN 397',
      title: 'Equipos de Protección Personal (EPP)',
      description: 'Línea de seguridad para planta y obra: cascos dieléctricos, arneses anti-caída, protección respiratoria y auditiva certificada.',
      specsSummary: 'Homologación OSHA · Material dieléctrico hasta 20kV',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmZuvSJX8lqbmuiVOkaEaGDOutOOEDi1uSwlYRPX_PBqhaZeAsUoPu1NAii0YFdAjxUv70MHhHPaDoFZRXIsuQSEyMEZjJHy1gbTbGXw_x6L9I159eRLfEJDBRc9h5dSiyYPtWr-U6kqBGQotOxGt7jb8y_i8rgpmE8EfiEIJCcWeABSFxiI-7iYqcQecYJD55qQ4r3wmWS9L7NdMX4ZGMaL3yKrpie28V_lms2d5ydOEed3F9fwg_',
      stockStatus: 'In Stock',
      inCloudStorage: true,
    },
  ],
  about: {
    overline: 'Identidad Corporativa CGR',
    title: 'La Robustez del Grafito y la Energía Dinámica del Cobre',
    description: 'Nuestra insignia hexagonal no es decorativa: simboliza la tuerca, la estabilidad estructural y la cohesión molecular del acero. En CGR Soluciones Integrales S.U.R.L., el Gris Grafito (#2F3640) representa la fiabilidad inquebrantable de la ingeniería pesada, mientras que el Cobre Industrial (#D35400) evoca la conductividad, la proactividad térmica y la capacidad resolutiva inmediata en cada obra.',
    mercantileRegistry: 'REG-MERC: #94820-CU',
    pillars: [
      { id: 'p1', title: 'Precisión Técnica', description: 'Tolerancias rigurosas según planos y especificaciones DIN/ISO.', icon: 'tune' },
      { id: 'p2', title: 'Cumplimiento Estricto', description: 'Cronogramas de obra auditados y penalización por desvío de hitos.', icon: 'calendar_month' },
      { id: 'p3', title: 'Seguridad Integral', description: 'Cero incidentes laborales como meta innegociable en todo montaje.', icon: 'health_and_safety' },
      { id: 'p4', title: 'Sostenibilidad', description: 'Eficiencia energética y gestión responsable de residuos metalúrgicos.', icon: 'eco' },
    ],
    qualityMetrics: [
      { id: 'qm1', label: 'Efectividad en Montajes y Puesta en Marcha', valueString: '99.4%', percentage: 99.4 },
      { id: 'qm2', label: 'Conformidad en Suministros Homologados', valueString: '98.9%', percentage: 98.9 },
      { id: 'qm3', label: 'Respuesta Técnica en Emergencias Críticas', valueString: '< 4 Horas', percentage: 95.0 },
    ],
  },
  location: {
    address: 'Calle Industrial No. 402, Zona de Desarrollo Empresarial',
    city: 'La Habana, Cuba',
    phonePrimary: '+53 7 830 0000',
    phoneEmergency: '+53 5 280 0000',
    email: 'contacto@cgrsoluciones.cu',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJL2hlei0kxeZEUnc2Hna3fd0ZxjICFc-VyVpCAadc2Gb3Fx4DauzwbtKRu9DybRzmQTUv4zcD-qM5n1FyIqtPl2YllHxKS3lMRpv7zZjndYAkM7w-0IvMdDu8r5A_cisi4A9SRJbhOnIGDsvYIwmguHv7efAswSrmuJIDUz1j5h3E1TNQLkYM41_NXvWqSz7VLcXWzzXrlDUN3mO1COKppLvKL7oXztqM4ASng1T33-VA_LWbaS-H',
    scheduleWeekday: 'Lunes a Viernes: 08:00 - 17:30',
    scheduleSaturday: 'Sábados (Mantenimiento): 08:00 - 13:00',
    contingencyNotice: 'Servicio 24 Horas / 365 Días para contratos vigentes.',
    craneNotice: 'Patio de maniobras habilitado para camiones pesados y grúas de hasta 40T.',
    bases: [
      { id: 'b1', name: 'Base Occidental (Sede Central)', city: 'La Habana', type: 'Occidental (Sede)', status: 'Activa 24/7' },
      { id: 'b2', name: 'Sub-base Central', city: 'Cienfuegos', type: 'Sub-base Central', status: 'Operativa' },
      { id: 'b3', name: 'Base Oriental', city: 'Moa / Holguín', type: 'Base Oriental', status: 'Operativa' },
    ],
  },
  blog: [
    {
      id: 'blog-1',
      title: 'Mantenimiento Predictivo en Reductores Industriales de Gran Torque',
      slug: 'mantenimiento-predictivo-reductores-gran-torque',
      summary: 'Caso técnico sobre la detección temprana de fisuras en flancos de engranajes utilizando análisis espectral FFT y demodulación de envolvente.',
      content: `### Introducción a la Dinámica Vibracional
En líneas de molienda continua y cementeras, los reductores planetarios y de ejes paralelos trabajan bajo cargas dinámicas pulsantes severas. Una falla intempestiva suele ocasionar pérdidas que superan los $40,000 USD por hora de parada no planificada.

### Protocolo Aplicado por CGR
1. **Instalación de sensores triaxiales piezoeléctricos** de alta frecuencia (hasta 10 kHz).
2. **Filtrado pasa-altos y técnica de Envolvente:** Para aislar impactos repetitivos por picado (*pitting*) en piñones.
3. **Termografía infrarroja combinada:** Verificación de gradientes térmicos en rodamientos cónicos.

### Resultados Cuantificables
El diagnóstico evitó el colapso catastrófico de una corona dentada de 1.8 metros de diámetro, permitiendo planificar el cambio programado durante la ventana de mantenimiento trimestral sin afectar las metas productivas.`,
      author: 'Ing. Carlos Menéndez',
      authorRole: 'Director de Ingeniería',
      date: '14 Mayo 2025',
      category: 'Mantenimiento',
      tags: ['Predictivo', 'Vibraciones', 'DIN 31051', 'Reductores'],
      coverImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaNB106mpdiMlmosiHeEiluP9F-FMokgGdH0UoMMOIFNsrTtB4Z_gPjl8Q5ZRqGq9KHaC4xPtYnANiRVy_I6SB75x3cUYjFfwhH4zSsesaR2HCWI0HdAXCeTsvgWrLhjqZQ8MIVnFReHMBPVWgn9THQfvp1m2xb2eddDucN6XWId9uWBMjKHrhnEDburW_J8QAzC6SUr-l1nbZDDco8N0zBeO8s1nIQ0RsPZ1viCG0LhXLmXZ2e3gM',
      readTime: '6 min lectura',
      isPublished: true,
    },
    {
      id: 'blog-2',
      title: 'Homologación de Procedimientos de Soldadura AWS D1.1 en Estructuras Pesadas',
      slug: 'homologacion-procedimientos-soldadura-aws-d1-1',
      summary: 'Requisitos esenciales para la calificación de soldadores y especificaciones WPS/PQR en uniones críticas sometidas a fatiga mecánica.',
      content: `### Marco Normativo y Exigencias Estructurales
La norma estructural AWS D1.1 rige el diseño, ejecución e inspección de uniones soldadas en aceros al carbono y de baja aleación. En proyectos de calderería pesada y torres de proceso, cada junta debe contar con trazabilidad íntegra de material base y consumibles.

### Proceso de Calificación
- Ensayos de doblado de cara y raíz guiados según código.
- Evaluación radiográfica y por ultrasonido phased array (PAUT) para verificar la ausencia de inclusiones de escoria y faltas de fusión.
- Calificación de operadores para posiciones 3G y 4G con procesos combinados GTAW + SMAW.`,
      author: 'Ing. Roberto Valdés',
      authorRole: 'Inspector END Nivel II',
      date: '28 Abril 2025',
      category: 'Normativa',
      tags: ['Soldadura', 'AWS D1.1', 'ASME', 'Control de Calidad'],
      coverImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD9v7lQPyv3H61mXM9N3k4G_UGtSpRH1DHTyGVMGywZd5-lA05Cv_miplgm8KdUkOlc-nl_QqIzCzolkcn8Fg0YmXLmX9ezHPCTx2TppTvfMs2mWLUDfBTp9cvo0GVnUxiuSLZTEBVN0BZRSQm72O9ow98dOVkgSJ8lYl5LI99JJVm1gzfr-QvKlpj9UUDPRKBhQFj0ETiUw8_t2rvzfHhXPQaiUArnL5UjQPqFRNgp1wqxGGhLEho',
      readTime: '5 min lectura',
      isPublished: true,
    },
    {
      id: 'blog-3',
      title: 'Migración de Automatismos Obsoletos hacia Arquitecturas SCADA Seguras',
      slug: 'migracion-automatismos-arquitecturas-scada',
      summary: 'Estrategias para modernizar controladores lógicos programables antiguos sin interrumpir la operación continua de plantas industriales.',
      content: `### El Desafío de la Obsolescencia
Muchos complejos industriales aún operan con autómatas descatalogados cuyos repuestos no están disponibles en el mercado. CGR diseña pasarelas de comunicación industriales que permiten integrar islas de control legadas en plataformas SCADA unificadas.

### Beneficios Inmediatos
- Monitoreo en tiempo real de variables de proceso (presión, flujo, amperaje).
- Registro histórico de alarmas y mantenimiento preventivo condicionado a horas de servicio.
- Acceso remoto cifrado con arquitectura zero-trust.`,
      author: 'Lic. Elena Ramos',
      authorRole: 'Especialista de Sistemas',
      date: '02 Abril 2025',
      category: 'Ingeniería',
      tags: ['SCADA', 'PLC', 'Automatización', 'Industria 4.0'],
      coverImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQjm8Cp2chVUklbLVVt_5ijdRvvR0naHydb73FxFQJ9MPgfgpPpX4y-6dX9in2SOxzNpEINZ3UiysQSZ47qMIPm3EQIdHghTXJaMBoNSVo655URQc2CKO4Y_5pBY4m3kEnEKVVoFb43FAdePrZpnkoICjKnoUfK5g27IIPwchMRzx2z8rALq90o4xs5915SjR1bu3totn1VEssrmjJPWohL1nRF5C5MMHSbAFo9t0lC--NT8fLvxce',
      readTime: '7 min lectura',
      isPublished: true,
    },
  ],
};

export const INITIAL_NOTIFICATIONS: PushNotification[] = [
  {
    id: 'notif-1',
    title: 'Nueva Solicitud de Cotización B2B',
    message: 'Empresa Minera Moa Nickel ha solicitado cotización urgente para válvulas ANSI 300 y reductor helicoidal.',
    timestamp: 'Hace 10 minutos',
    type: 'warning',
    isRead: false,
    category: 'cotizacion',
    actionUrl: '#contacto',
    author: 'Sistema CRM',
  },
  {
    id: 'notif-2',
    title: 'Compresión y Almacenamiento Exitoso',
    message: 'Se procesaron 4 imágenes industriales internas reduciendo un 72.4% el ancho de banda.',
    timestamp: 'Hace 45 minutos',
    type: 'success',
    isRead: false,
    category: 'almacen',
    author: 'CGR Cloud Storage',
  },
  {
    id: 'notif-3',
    title: 'Control de Versiones: v1.1.0 Desplegada',
    message: 'Se publicó el catálogo ampliado 2025 en producción.',
    timestamp: 'Hace 2 horas',
    type: 'info',
    isRead: true,
    category: 'publicacion',
    author: 'Git Engine',
  },
];

export const INITIAL_STORED_IMAGES: StoredImage[] = [
  {
    id: 'img-1',
    name: 'planta_inspeccion_industrial.webp',
    cloudUri: 'cgr://cloud-storage/maquinaria/planta_inspeccion_industrial.webp',
    originalSize: 4120000,
    compressedSize: 420000,
    compressionRatio: 89.8,
    width: 1920,
    height: 1080,
    mimeType: 'image/webp',
    altText: 'Ingeniero industrial inspeccionando tuberías de grafito y válvulas de alta presión',
    tags: ['Taller', 'Inspección', 'Ingeniería', 'Grafito'],
    category: 'Infraestructura',
    uploadedAt: '2025-05-10 09:30',
    dataUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQjm8Cp2chVUklbLVVt_5ijdRvvR0naHydb73FxFQJ9MPgfgpPpX4y-6dX9in2SOxzNpEINZ3UiysQSZ47qMIPm3EQIdHghTXJaMBoNSVo655URQc2CKO4Y_5pBY4m3kEnEKVVoFb43FAdePrZpnkoICjKnoUfK5g27IIPwchMRzx2z8rALq90o4xs5915SjR1bu3totn1VEssrmjJPWohL1nRF5C5MMHSbAFo9t0lC--NT8fLvxce',
  },
  {
    id: 'img-2',
    name: 'valvula_compuerta_ansi.webp',
    cloudUri: 'cgr://cloud-storage/catalogo/valvula_compuerta_ansi.webp',
    originalSize: 2850000,
    compressedSize: 310000,
    compressionRatio: 89.1,
    width: 1200,
    height: 900,
    mimeType: 'image/webp',
    altText: 'Válvula de compuerta industrial y acople bridado en mesa de ajuste',
    tags: ['Válvula', 'ANSI', 'Acero', '600 PSI'],
    category: 'Válvulas',
    uploadedAt: '2025-05-11 14:15',
    dataUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD9v7lQPyv3H61mXM9N3k4G_UGtSpRH1DHTyGVMGywZd5-lA05Cv_miplgm8KdUkOlc-nl_QqIzCzolkcn8Fg0YmXLmX9ezHPCTx2TppTvfMs2mWLUDfBTp9cvo0GVnUxiuSLZTEBVN0BZRSQm72O9ow98dOVkgSJ8lYl5LI99JJVm1gzfr-QvKlpj9UUDPRKBhQFj0ETiUw8_t2rvzfHhXPQaiUArnL5UjQPqFRNgp1wqxGGhLEho',
  },
  {
    id: 'img-3',
    name: 'rodamientos_precision_din.webp',
    cloudUri: 'cgr://cloud-storage/catalogo/rodamientos_precision_din.webp',
    originalSize: 3100000,
    compressedSize: 340000,
    compressionRatio: 89.0,
    width: 1200,
    height: 900,
    mimeType: 'image/webp',
    altText: 'Rodamientos industriales de rodillos cónicos para transmisiones severas',
    tags: ['Rodamientos', 'Transmisión', 'ISO', 'DIN 625'],
    category: 'Transmisión',
    uploadedAt: '2025-05-12 11:20',
    dataUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI8-J_deQPVvO7rGz0GpVUanrmF4KeBM6u73Y1UykS8JpBsxK9cFVphhWTU5EtNcVYTtUEdnWEv7qDcC-ME5-m55fShT6INoF3EifYhSa4DQ6afGkznomWESuqo6wcWGiduGjnLXjZ_6T1UEIAkknzNYyDFLDTaHc1s_qiF2JwCX8ji3Bivepws6PNRqGFEGmG_XxrYgVfbNUrzsDcRFxg06C89yhlruVsCG_gMKMf1JvA9puIjwhH',
  },
  {
    id: 'img-4',
    name: 'motor_electrico_ie3.webp',
    cloudUri: 'cgr://cloud-storage/catalogo/motor_electrico_ie3.webp',
    originalSize: 3800000,
    compressedSize: 390000,
    compressionRatio: 89.7,
    width: 1200,
    height: 900,
    mimeType: 'image/webp',
    altText: 'Motor eléctrico trifásico acoplado a reductor planetario en base metálica',
    tags: ['Motor', 'Reductor', 'IEC IE3', 'Trifásico'],
    category: 'Motores',
    uploadedAt: '2025-05-13 16:40',
    dataUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaNB106mpdiMlmosiHeEiluP9F-FMokgGdH0UoMMOIFNsrTtB4Z_gPjl8Q5ZRqGq9KHaC4xPtYnANiRVy_I6SB75x3cUYjFfwhH4zSsesaR2HCWI0HdAXCeTsvgWrLhjqZQ8MIVnFReHMBPVWgn9THQfvp1m2xb2eddDucN6XWId9uWBMjKHrhnEDburW_J8QAzC6SUr-l1nbZDDco8N0zBeO8s1nIQ0RsPZ1viCG0LhXLmXZ2e3gM',
  },
];

export const INITIAL_VERSION_SNAPSHOTS: VersionSnapshot[] = [
  {
    id: 'snap-v1.1.0',
    versionNumber: 'v1.1.0 (Producción Actual)',
    timestamp: '2025-05-14 10:15',
    author: 'Ingeniería y Operaciones CGR',
    commitMessage: 'Actualización general de catálogo técnico 2025 y ficha de soldadura homologada.',
    changesSummary: [
      'Incorporación de 4 productos certificados con trazabilidad 3.1',
      'Actualización de bases operativas con despliegue en Cienfuegos y Moa',
      'Nuevo caso de estudio de mantenimiento predictivo en cementeras',
    ],
    data: INITIAL_SITE_CONTENT,
    isActive: true,
  },
  {
    id: 'snap-v1.0.0',
    versionNumber: 'v1.0.0 (Lanzamiento)',
    timestamp: '2025-04-01 08:00',
    author: 'CGR Soluciones Integrales S.U.R.L.',
    commitMessage: 'Publicación inicial del portal corporativo CGR Soluciones Integrales S.U.R.L.',
    changesSummary: [
      'Diseño institucional con paleta Grafito y Cobre',
      'Formulario formal de cotización y canales de contingencia 24/7',
    ],
    data: {
      ...INITIAL_SITE_CONTENT,
      hero: {
        ...INITIAL_SITE_CONTENT.hero,
        titleHighlight: 'Soluciones Técnicas para la Industria Nacional',
      },
    },
    isActive: false,
  },
];

export const INITIAL_GITHUB_FILES: GitHubFile[] = [
  {
    path: 'src/App.tsx',
    name: 'App.tsx',
    type: 'file',
    language: 'typescript',
    status: 'synced',
    content: `// Componente Principal de Portal Empresarial CGR Soluciones Integrales S.U.R.L.
import React from 'react';
export default function App() {
  // Configuración de rutas y sincronización de contenido en tiempo real
}`,
  },
  {
    path: 'src/data/initialContent.ts',
    name: 'initialContent.ts',
    type: 'file',
    language: 'typescript',
    status: 'synced',
    content: `// Repositorio de contenidos maestros y especificaciones DIN/ISO`,
  },
  {
    path: 'src/utils/imageCompressor.ts',
    name: 'imageCompressor.ts',
    type: 'file',
    language: 'typescript',
    status: 'synced',
    content: `// Compresor de imágenes canvas client-side con soporte WebP de alta densidad`,
  },
  {
    path: 'index.html',
    name: 'index.html',
    type: 'file',
    language: 'html',
    status: 'synced',
    content: `<!doctype html>
<html lang="es">
<head>
  <title>CGR Soluciones Integrales S.U.R.L.</title>
</head>
<body>...</body>
</html>`,
  },
  {
    path: 'metadata.json',
    name: 'metadata.json',
    type: 'file',
    language: 'json',
    status: 'synced',
    content: JSON.stringify({
      name: "CGR Soluciones Integrales S.U.R.L.",
      version: "1.1.0",
      architecture: "Full-Stack Corporate Portal",
    }, null, 2),
  },
];

export const INITIAL_GITHUB_COMMITS: GitHubCommit[] = [
  {
    sha: '8f94a21',
    message: 'feat(cms): sincronización en tiempo real de catálogo y compresión automática de imágenes WebP',
    author: 'carlos-menendez-cgr',
    timestamp: 'Hace 35 min',
    branch: 'main',
  },
  {
    sha: 'e419b02',
    message: 'refactor(design): ajuste de identidad visual con gris grafito #2F3640 y cobre industrial #D35400',
    author: 'elena-ramos-cgr',
    timestamp: 'Hace 3 horas',
    branch: 'main',
  },
  {
    sha: '1b89c77',
    message: 'feat(rbac): matriz de roles de usuario para admin, editor y auditor externo',
    author: 'carlos-menendez-cgr',
    timestamp: 'Ayer',
    branch: 'main',
  },
];

export const INITIAL_QUOTES: import('../types').QuoteRequest[] = [
  {
    id: 'quote-101',
    clientName: 'Ing. Armando Sotolongo',
    clientCompany: 'Empresa de Níquel Comandante Ernesto Che Guevara (Moa)',
    clientPhone: '+53 5 284 9912',
    clientEmail: 'a.sotolongo@moanickel.cu',
    serviceType: 'Mantenimiento Mecánico e Industrial',
    message: 'Requerimos evaluación in situ para alineación láser de tren de laminación y cambio de sellos mecánicos en bombas de alta presión bajo norma API 682.',
    ndaAgreed: true,
    status: 'Pendiente',
    date: 'Hoy, 09:30 AM',
  },
  {
    id: 'quote-102',
    clientName: 'Lic. Beatriz Quintana',
    clientCompany: 'Cervecería Bucanero S.A. (Holguín)',
    clientPhone: '+53 5 391 0023',
    clientEmail: 'b.quintana@bucanero.com.cu',
    serviceType: 'Montaje y Automatización de Procesos',
    message: 'Proyecto de automatización de línea de embotellado. Solicitamos cotización para suministro de controladores PLC y actuadores neumáticos con certificación de grado alimenticio.',
    ndaAgreed: true,
    status: 'En Revisión',
    date: 'Ayer, 04:15 PM',
  },
  {
    id: 'quote-103',
    clientName: 'Ing. Marcos Leyva',
    clientCompany: 'Fábrica de Cemento Cienfuegos',
    clientPhone: '+53 5 882 1109',
    clientEmail: 'mleyva@cementocfg.cu',
    serviceType: 'Cotización de Productos del Catálogo',
    message: 'Solicitud formal para 12 unidades de Válvula de Compuerta ANSI Clase 600 y 4 juegos de rodamientos de rodillos cónicos DIN 625.',
    ndaAgreed: false,
    status: 'Cotizado',
    date: '10 Mayo 2025',
  },
];

// Convenience Aliases
export const INITIAL_CONTENT = INITIAL_SITE_CONTENT;
export const INITIAL_CLOUD_IMAGES = INITIAL_STORED_IMAGES;
export const INITIAL_SNAPSHOTS = INITIAL_VERSION_SNAPSHOTS;


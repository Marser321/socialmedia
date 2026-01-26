import { Servicio } from '@/types';

export const MOCK_SERVICES: Servicio[] = [
  {
    id: '1',
    nombre: 'Desarrollo Web',
    descripcion: 'Experiencias digitales inmersivas que convierten.',
    descripcion_corta: 'Web de alto impacto',
    pilar: 'tech',
    icono: 'Monitor',
    precio_base: 1500,
    tipo_pago: 'unico',
    caracteristicas: ['Diseño 3D Interactivo', 'SEO Técnico Avanzado', 'CMS Headless'],
    tecnologias: ['Next.js 14', 'React Three Fiber', 'Tailwind CSS', 'Supabase'],
    orden: 1
  },
  {
    id: '2',
    nombre: 'E-commerce',
    descripcion: 'Ventas globales 24/7 con arquitectura escalable.',
    descripcion_corta: 'Tiendas Online',
    pilar: 'tech',
    icono: 'ShoppingCart',
    precio_base: 3500,
    tipo_pago: 'unico',
    caracteristicas: ['Pasarela de Pagos Global', 'Gestión de Inventario', 'Recuperación de Carritos'],
    tecnologias: ['Shopify Plus', 'Stripe Connect', 'DatoCMS', 'Redis'],
    orden: 2
  },
  {
    id: '3',
    nombre: 'Apps a Medida',
    descripcion: 'Ecosistemas móviles nativos de alto rendimiento.',
    descripcion_corta: 'Desarrollo Apps',
    pilar: 'tech',
    icono: 'Smartphone',
    precio_base: 5000,
    tipo_pago: 'unico',
    caracteristicas: ['iOS & Android Nativo', 'Offline First', 'Biometría Avanzada'],
    tecnologias: ['React Native / Expo', 'Firebase', 'Node.js', 'PostgreSQL'],
    orden: 3
  },
  {
    id: '4',
    nombre: 'Automatización AI',
    descripcion: 'Tu negocio operando en piloto automático 24/7.',
    descripcion_corta: 'Automatización 360',
    pilar: 'tech',
    icono: 'Layers',
    precio_base: 800,
    tipo_pago: 'mensual',
    caracteristicas: ['Workflows Multi-etapa', 'Agents Autónomos', 'Integración CRM'],
    tecnologias: ['Zapier Enterprise', 'Make', 'OpenAI API', 'LangChain'],
    orden: 4
  },
  {
    id: '5',
    nombre: 'Social Growth',
    descripcion: 'Dominio total de la atención en redes sociales.',
    descripcion_corta: 'Viral Marketing',
    pilar: 'growth',
    icono: 'Share2',
    precio_base: 600,
    tipo_pago: 'mensual',
    caracteristicas: ['Estrategia Viral', 'Edición Formato Reels', 'Analytics Predictivo'],
    tecnologias: ['Metricool', 'CapCut Pro', 'Canva Enterprise', 'Meta Ads Manager'],
    orden: 5
  },
  {
    id: '6',
    nombre: 'Producción Media',
    descripcion: 'Narrativa cinematográfica para marcas audaces.',
    descripcion_corta: 'Video High-End',
    pilar: 'media',
    icono: 'Video',
    precio_base: 1200,
    tipo_pago: 'unico',
    caracteristicas: ['Guión + Storyboard', 'Color Grading HDR', 'Sound Design Inmersivo'],
    tecnologias: ['DaVinci Resolve', 'Cinema 4D', 'Red Camera', 'Unreal Engine'],
    orden: 6
  },
];

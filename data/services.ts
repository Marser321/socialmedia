import { Servicio } from '@/types';

export const MOCK_SERVICES: Servicio[] = [
  {
    id: '1',
    nombre: 'Ecosistema Web',
    descripcion: 'No es una web, es tu mejor vendedor. Diseño psicológico que convierte visitantes fríos en fanáticos de tu marca.',
    descripcion_corta: 'Funnel de Ventas',
    pilar: 'tech',
    icono: 'Monitor',
    precio_base: 2500,
    tipo_pago: 'unico',
    caracteristicas: ['Neuro-Diseño (CRO)', 'Copywriting Persuasivo', 'Velocidad Instantánea'],
    tecnologias: ['Next.js 14', 'Supabase', 'Framer Motion', 'Vercel Analytics'],
    orden: 1
  },
  {
    id: '4',
    nombre: 'Agentes IA 24/7',
    descripcion: 'Clona a tu mejor vendedor. Responde, califica y agenda citas en WhatsApp mientras duermes o viajas.',
    descripcion_corta: 'Agendamiento IA',
    pilar: 'tech',
    icono: 'Layers',
    precio_base: 1200,
    tipo_pago: 'mensual',
    caracteristicas: ['Cierre de Ventas IA', 'Sincronización CRM', 'Reactiva Base de Datos'],
    tecnologias: ['n8n Workflow', 'OpenAI GPT-4o', 'WhatsApp API', 'Supabase'],
    orden: 2
  },
  {
    id: '5',
    nombre: 'Traffic Acquisition',
    descripcion: 'Inundamos tu embudo con tráfico cualificado. Dejamos de "probar suerte" y empezamos a escalar con datos.',
    descripcion_corta: 'Paid Media',
    pilar: 'growth',
    icono: 'Share2',
    precio_base: 1500,
    tipo_pago: 'mensual',
    caracteristicas: ['Meta Ads Sniper', 'Google High-Intent', 'Retargeting Omnicanal'],
    tecnologias: ['Meta Ads Manager', 'Google Analytics 4', 'Looker Studio', 'Pixels API'],
    orden: 3
  },
  {
    id: '2',
    nombre: 'E-commerce Empire',
    descripcion: 'Arquitectura para marcas que facturan >$50k. Checkout optimizado, upsells automáticos y lealtad programada.',
    descripcion_corta: 'Tiendas Premium',
    pilar: 'tech',
    icono: 'ShoppingCart',
    precio_base: 4500,
    tipo_pago: 'unico',
    caracteristicas: ['Headless Shopify', 'Checkout 1-Clic', 'LTV Maximizer'],
    tecnologias: ['Shopify Plus', 'Hydrogen', 'Sanity CMS', 'Klaviyo'],
    orden: 4
  },
  {
    id: '6',
    nombre: 'Cinema Branding',
    descripcion: 'Contenido que detiene el scroll. Producción documental que eleva tu percepción de valor a la estratosfera.',
    descripcion_corta: 'Video High-End',
    pilar: 'media',
    icono: 'Video',
    precio_base: 2800,
    tipo_pago: 'unico',
    caracteristicas: ['Storytelling Visual', 'Color Grading Cine', 'Formato Viral'],
    tecnologias: ['DaVinci Resolve', 'Red Camera', 'Sound Design', 'After Effects'],
    orden: 5
  },
];

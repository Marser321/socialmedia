import { Servicio } from '@/types';

export const MOCK_SERVICES: Servicio[] = [
  {
    id: '1',
    nombre: 'Web High-Ticket',
    descripcion: 'Diseño estratégico optimizado para convertir tráfico frío en pacientes o clientes.',
    descripcion_corta: 'Funnel de Ventas',
    pilar: 'tech',
    icono: 'Monitor',
    precio_base: 2500,
    tipo_pago: 'unico',
    caracteristicas: ['Optimización de Conversión (CRO)', 'Copywriting Persuasivo', 'Integración CRM'],
    tecnologias: ['Next.js 14', 'Supabase', 'Framer Motion', 'Vercel Analytics'],
    orden: 1
  },
  {
    id: '4',
    nombre: 'WhatsApp Automation',
    descripcion: 'Sistema inteligente que califica y agenda leads en menos de 5 minutos, 24/7.',
    descripcion_corta: 'Agendamiento IA',
    pilar: 'tech',
    icono: 'Layers',
    precio_base: 1200,
    tipo_pago: 'mensual',
    caracteristicas: ['Chatbot con IA (GPT-4)', 'Integración Calendario', 'Recuperación de Carritos'],
    tecnologias: ['n8n Workflow', 'OpenAI API', 'WhatsApp Business API', 'Supabase'],
    orden: 2
  },
  {
    id: '5',
    nombre: 'Traffic & Growth',
    descripcion: 'Campañas de publicidad de alta precisión para alimentar tu sistema de ventas.',
    descripcion_corta: 'Paid Media',
    pilar: 'growth',
    icono: 'Share2',
    precio_base: 1000,
    tipo_pago: 'mensual',
    caracteristicas: ['Meta Ads (Facebook/IG)', 'Google Ads Search', 'Retargeting Dinámico'],
    tecnologias: ['Meta Ads Manager', 'Google Analytics 4', 'Looker Studio', 'Pixels API'],
    orden: 3
  },
  {
    id: '2',
    nombre: 'E-commerce Scale',
    descripcion: 'Infraestructura de ventas para marcas que facturan más de $10k/mes.',
    descripcion_corta: 'Tiendas Premium',
    pilar: 'tech',
    icono: 'ShoppingCart',
    precio_base: 4500,
    tipo_pago: 'unico',
    caracteristicas: ['Arquitectura Headless', 'Checkout Personalizado', 'Upsells Automáticos'],
    tecnologias: ['Shopify Plus', 'Hydrogen', 'Sanity CMS', 'Klaviyo'],
    orden: 4
  },
  {
    id: '6',
    nombre: 'Content Studio',
    descripcion: 'Producción audiovisual diseñada para detener el scroll y generar deseo.',
    descripcion_corta: 'Video High-End',
    pilar: 'media',
    icono: 'Video',
    precio_base: 1500,
    tipo_pago: 'unico',
    caracteristicas: ['Guión de Ventas', 'Edición Ritmo Rápido', 'Formato Vertical 4K'],
    tecnologias: ['DaVinci Resolve', 'Sony Cinema Line', 'Adobe After Effects', 'CapCut Pro'],
    orden: 5
  },
];

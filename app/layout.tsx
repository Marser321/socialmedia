import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { SmoothScroll } from '@/components/providers/SmoothScroll';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nexo Agency | Arquitectura Digital para Líderes de Industria',
  description: 'Transformamos negocios en autoridades digitales mediante ingeniería de software premium, automatización con IA y ecosistemas de conversión de alto impacto.',
  keywords: ['Agencia Web de Lujo', 'Automatización IA para Empresas', 'Desarrollo Next.js Premium', 'Nexo Agency', 'Growth Engineering', 'Ecosistemas Digitales'],
  openGraph: {
    title: 'Nexo Agency | Arquitectura Digital de Alto Rendimiento',
    description: 'Dejarás de competir por precio para convertirte en la única opción lógica. Ingeniería digital para el mercado moderno.',
    url: 'https://nexo-agency.com',
    siteName: 'Nexo Agency',
    locale: 'es_LA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexo Agency',
    description: 'Arquitectura Digital que Domina Mercados.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  'name': 'Nexo Agency',
  'description': 'Agencia líder en arquitectura digital, automatización con IA y desarrollo web premium.',
  'url': 'https://nexo-agency.com',
  'logo': 'https://nexo-agency.com/logo.png',
  'address': {
    '@type': 'PostalAddress',
    'addressCountry': 'AR',
  },
  'priceRange': '$$$',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-white text-black px-4 py-2 rounded-full font-bold shadow-2xl transition-all"
          >
            Saltar al contenido
          </a>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}

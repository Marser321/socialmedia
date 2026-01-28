import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { SmoothScroll } from '@/components/providers/SmoothScroll';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nexo Agency | Arquitectura Digital & Ecosistemas de Conversión',
  description: 'Transformamos negocios en autoridades digitales. Desarrollo Web High-Ticket, Automatización con IA y Estrategias de Crecimiento para el mercado moderno.',
  keywords: ['Agencia Web', 'Automatización IA', 'High Ticket', 'Desarrollo Web Premium', 'Nexo Agency', 'Growth Partner', 'Ecosistemas Digitales'],
  openGraph: {
    title: 'Nexo Agency | Arquitectura Digital',
    description: 'Dejarás de competir por precio para convertirte en la única opción lógica.',
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
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}

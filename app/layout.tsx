import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nexo | Transformación Digital & Creatividad',
  description: 'Agencia híbrida de desarrollo web, automatización y producción audiovisual.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased selection:bg-cyan-500/30`}>
        <a href="#content" className="sr-only focus:not-sr-only">Skip to content</a>
        {children}
      </body>
    </html>
  );
}

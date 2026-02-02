# SEO Master Skill: SEO Técnico de Alto Rendimiento

**Objetivo**: Dominar los motores de búsqueda mediante arquitectura técnica impecable en Next.js.

## Metadatos Dinámicos
- Cada archivo `page.tsx` debe exportar un objeto `metadata` dinámico.
- Debe incluir obligatoriamente:
  - `title` descriptivo y optimizado.
  - `description` técnica y persuasiva.
  - `openGraph`: Configuración completa para compartir en redes (imágenes, títulos, descripciones).

## Semántica Estricta
- Utilizar exclusivamente etiquetas HTML semánticas:
  - `<header>` para navegación.
  - `<main>` para el contenido principal.
  - `<article>` o `<section>` para bloques de contenido.
  - **H1 Único**: Solo debe existir un `<h1>` por página, conteniendo la palabra clave principal.

## Performance y Core Vitals
- **Imágenes**: Uso obligatorio de `next/image` con propiedades `priority` cuando sea necesario.
- **Formato**: Formato `.webp` por defecto para optimización de peso.
- **Restricción de Peso**: Rechazar o requerir optimización para cualquier imagen que supere los **200kb**.
- **Fuentes**: Optimización de fuentes de Google para evitar Layout Shifts.

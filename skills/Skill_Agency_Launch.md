---
description: Checklist and protocol for launching the Agency App to Production (Vercel + Supabase).
---

# Skill: Agency Launch Protocol

## Objetivo
Asegurar un lanzamiento libre de errores, optimizado para SEO y configurado correctamente en Vercel y Supabase.

## Checklist de Pre-Lanzamiento

### 1. Configuración de Entorno (Environment Variables)
- [ ] **Supabase**:
    - [ ] Verificar `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` en `.env.local`.
    - [ ] Asegurar que las políticas RLS (Row Level Security) estén activas en Supabase.
- [ ] **Vercel**:
    - [ ] Agregar las variables de entorno en Project Settings > Environment Variables.

### 2. SEO & Metadatos
- [ ] **Metadata Base** (`layout.tsx`):
    - [ ] Title Template: `%s | Nexo Agency`.
    - [ ] Description: "Agencia de Automatización AI & Desarrollo Web High-Ticket."
    - [ ] Open Graph Images (OG Image).
- [ ] **Robots.txt & Sitemap**:
    - [ ] Verificar `public/robots.txt`.
    - [ ] (Opcional) Generar `sitemap.xml` dinámico.

### 3. Performance & QA
- [ ] **Linting**: Ejecutar `npm run lint` y corregir errores 0/0.
- [ ] **Build Check**: Ejecutar `npm run build` localmente para asegurar que no hay errores de compilación.
- [ ] **Imágenes**: Verificar que todas las imágenes usan `next/image` y tienen `alt` text.

### 4. Deploy (Vercel)
- [ ] Conectar repo GitHub a Vercel.
- [ ] Configurar Root Directory (si no es root).
- [ ] Ejecutar Deploy.
- [ ] Verificar dominio personalizado (DNS Records).

## Comando de Verificación Final
Antes de notificar al usuario, ejecuta:
```bash
npm run build && npm run lint
```
Si todo pasa, el proyecto está listo para `vercel --prod` (si tienes CLI) o push a main.

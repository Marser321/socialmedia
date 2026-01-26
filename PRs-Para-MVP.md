# Resumen y PRs para MVP UX y DB Leads

## PRs listos para abrir en GitHub

### PR #1: MVP UX
- **Rama:** feat/mvp-ux
- **Título:** MVP UX: SearchBar, ThemeToggle, Skip-to-content, Bookmark
- **Resumen:** Implementar funcionalidades de UX para el MVP.
- **Archivos clave:**
  - `components/ui/SearchBar.tsx`
  - `components/ui/ThemeToggle.tsx`
  - `components/layout/Navbar.tsx` (integración de UI)
  - `components/sections/ServicesCatalog.tsx` (uso de MOCK_SERVICES, bookmarks)
  - `app/layout.tsx` (skip-to-content)
  - `app/globals.css` (sr-only utils)
  - `app/page.tsx` (id="content")
  - `data/services.ts` (MOCK_SERVICES)

**Qué hacer después del merge:**
1. Verificar UX localmente:
   - Theme toggle cambia y persiste.
   - SearchBar filtra servicios.
   - Skip-to-content enfoca contenido principal.
   - Bookmarks persisten en localStorage.
2. Desplegar a staging y validar responsivo.
3. Merge a main y borrar rama feat/mvp-ux.

---

### PR #2: MVP DB Leads
- **Rama:** feat/mvp-db-leads
- **Título:** MVP DB: Leads (contact form) + seeds
- **Resumen:** Conectar ContactForm a Supabase, crear tabla leads, seeds.
- **Archivos clave:**
  - `lib/supabase.ts` (función addLead)
  - `components/sections/ContactForm.tsx` (envío a addLead)
  - `supabase/seed.sql` (tabla leads + seed)
  - `supabase/config.toml` (setup local)

**Qué hacer después del merge:**
1. Probar envío de lead localmente:
   - Enviar formulario con datos de prueba.
   - Ver en Supabase Studio que aparece el registro.
2. Validar que se muestra confirmación en UI.
3. Merge a main y borrar rama feat/mvp-db-leads.

---

## Cómo abrir los PRs (sin GitHub CLI)

Si no tienes gh CLI:

1. **Entrar al repositorio en GitHub**
   - Ve a: https://github.com/Marser321/socialmedia
   - Haz fork si no tienes permisos de escritura.

2. **Crear PR #1 (UX)**
   - Click en "Compare & pull request"
   - Base: main
   - Head: feat/mvp-ux
   - Title: MVP UX: SearchBar, ThemeToggle, Skip-to-content, Bookmark
   - Description: copiar el contenido del PR skeleton.

3. **Crear PR #2 (DB Leads)**
   - Click en "Compare & pull request"
   - Base: main
   - Head: feat/mvp-db-leads
   - Title: MVP DB: Leads (contact form) + seeds
   - Description: copiar el contenido del PR skeleton.

---

## Checklist rápida de validación post-merge

- [ ] Theme toggle funciona en todas las secciones
- [ ] SearchBar filtra servicios correctamente
- [ ] Skip-to-content enfoca contenido principal
- [ ] Bookmarks se guardan y persisten
- [ ] ContactForm envía leads a Supabase
- [ ] Leads aparecen en Supabase Studio
- [ ] UI muestra confirmación de envío
- [ ] Sin errores en consola
- [ ] Responsive en móvil OK

---

## Próximo paso (tras merges)

Una vez aprobados ambos PRs:
1. **Fase 3:** Pruebas automatizadas (Playwright/Cypress)
2. **Fase 4:** Preparación de entorno de staging
3. **Fase 5:** Roadmap de funcionalidades adicionales

---

*Generado automáticamente para MVP UX y DB Leads.*
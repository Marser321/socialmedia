# Nexo Agency - Plataforma de Transformación Digital

Plataforma "Service-as-a-Software" desarrollada con Next.js 15, Tailwind CSS y Framer Motion.

## 🚀 Tecnologías

- **Framework**: Next.js 15 (App Router)
- **Estilos**: Tailwind CSS + Shadcn/UI
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Backend (Opcional)**: Supabase

## 🛠️ Instalación Local

1. Clonar el repositorio:
```bash
git clone <tu-repositorio>
cd nexo-agency
```

2. Instalar dependencias:
```bash
npm install
# o
pnpm install
```

3. Configurar variables de entorno:
Crear un archivo `.env.local` basado en el ejemplo (ver abajo).

4. Iniciar servidor de desarrollo:
```bash
npm run dev
```

Visita `http://localhost:3000`.

## 📦 Despliegue en Vercel (Recomendado)

La forma más sencilla de desplegar este proyecto es usando [Vercel](https://vercel.com).

1. Sube tu código a GitHub/GitLab/Bitbucket.
2. Importa el proyecto en Vercel.
3. Vercel detectará automáticamente Next.js.
4. **IMPORTANTE**: Agrega las variables de entorno en el panel de Vercel (Settings > Environment Variables).
5. Dale click a "Deploy".

## 🔑 Variables de Entorno

Si conectas Supabase, necesitarás:

```env
NEXT_PUBLIC_SUPABASE_URL=usar_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=usar_key_anonima
```

## 📂 Estructura del Proyecto

- `/app`: Rutas y layouts (App Router).
- `/components`: Componentes de UI y secciones.
  - `/sections`: Bloques principales (Hero, Servicios, etc).
  - `/ui`: Componentes base (Shadcn).
- `/lib`: Utilidades y configuraciones (Supabase).
- `/types`: Definiciones de TypeScript.

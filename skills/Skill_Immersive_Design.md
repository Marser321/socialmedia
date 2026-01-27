---
description: Aesthetic guidelines for implementing "Portfolio Quality" designs (Glassmorphism, Neon, Fluid Typography).
---

# Skill: Immersive Design (Aesthetics)

## Objetivo
Transformar interfaces planas en experiencias "Inmersivas" y "Premium". El sitio debe sentirse como una App Nativa, no como una página web.

## Sistema de Diseño "Nexo Premium"

### 1. Glassmorphism 2.0 (The "Deep" Glass)
No usar el glassmorphism básico de 2021. Usar multicapa.
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2); /* Depth */
}
/* Noise Texture Overlay */
.noise {
  background-image: url('/noise.png');
  opacity: 0.03;
  mix-blend-mode: overlay;
}
```

### 2. Neon & Glow (Directional Lighting)
Usar gradientes radiales para simular luces de estudio.
```tsx
{/* Background Glow */}
<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />
```

### 3. Tipografía "Editorial"
Usar tamaños masivos para headers, pero con `tracking-tighter` (-0.02em a -0.05em).
- **H1**: `text-6xl md:text-8xl font-black tracking-tighter`.
- **Gradient Text**: Usar con moderación, solo para palabras clave.

## Reglas de Composición
1.  **Espacio Negativo**: Si tienes duda, añade mas `padding`. El lujo es espacio.
2.  **Micro-Bordes**: Todos los elementos oscuros deben tener un borde sutil (`border-white/10`) para definirse del fondo.
3.  **Sombras de Color**: Nunca usar sombras negras puras (`#000`). Usar sombras tintadas del color primario (ej. `shadow-blue-500/20`).

## Checklist de Calidad Visual
- [ ] ¿Hay suficiente contraste? (Accesibilidad).
- [ ] ¿Se ve "plano"? (Añadir texturas o gradientes sutiles).
- [ ] ¿Los bordes son suaves? (Antialiasing).

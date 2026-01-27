---
description: Standard for implementing "Wow" animations, scroll effects, and micro-interactions using Framer Motion.
---

# Skill: Visual Engineering (Wow Effects)

## Objetivo
Implementar animaciones de "Grado Portfolio" que causen impacto visual ("Wow Effect") sin sacrificar rendimiento (60fps constantes).

## Tech Stack Estricto
- **Core**: `framer-motion` (v11+).
- **Utils**: `clsx`, `tailwind-merge`.
- **Optimization**: `will-change`, `transform: translate3d`.

## Catálogo de Efectos (Copy-Paste Ready)

### 1. The "Reveal" (Textos y Cards)
Usar para titulos y contenido principal.
```tsx
<motion.div
  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} // Custom Quint Out
>
  {children}
</motion.div>
```

### 2. Scroll Parallax (Backgrounds)
Usar para dar profundidad a secciones.
```tsx
const { scrollYProgress } = useScroll({ target: containerRef });
const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
```

### 3. Magnetic Button (Micro-interaction)
Atrae el cursor suavemente.
```tsx
// Usar componente <Magnetic> wrapper que calcula mouse position
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  Click Me
</motion.button>
```

## Reglas de Performance (CRÍTICO)
1.  **Layout Thrashing**: NUNCA animar `width`, `height`, `top`, `left`. Solo `transform` y `opacity`.
2.  **Orquestación**: Usar `staggerChildren` en lugar de retrasos manuales (hardcoded delays).
3.  **Reduce Motion**: Respetar `prefers-reduced-motion` con `useReducedMotion()`.

## Checklist de Verificación
- [ ] ¿La animación bloquea la lectura? (Si sí, acelerarla).
- [ ] ¿Se caen los FPS al hacer scroll rápido? (Usar `will-change`).
- [ ] ¿Funciona en Móvil? (Simplificar efectos complejos en < 768px).

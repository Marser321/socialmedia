---
description: Metacognitive protocol for the agent to analyze its own patterns and generate new skills.
---

# Skill Improver Protocol

## Propósito
Este skill permite al Agente "Antigravity" analizar su propio flujo de trabajo, detectar ineficiencias o patrones repetitivos, y generar nuevas "Skills" (archivos .md) para automatizar futuras tareas.

## Trigger (Cuándo usar)
1.  Al finalizar una **Tarea Compleja** (más de 5 pasos).
2.  Si el usuario repite una instrucción de corrección más de 2 veces.
3.  Cuando el usuario solicita explícitamente: "Crea una Skill para X".

## Proceso de Razonamiento (Loop de Innovación)

1.  **Captura de Contexto**:
    *   ¿Qué acabo de hacer?
    *   ¿Qué herramientas usé?
    *   ¿Hubo fricción o errores?

2.  **Análisis de Patrones**:
    *   *Ejemplo*: "Siempre que creo un componente UI, olvido exportarlo en el `index.ts` de la carpeta."
    *   *Solución*: Crear una regla o workflow que incluya la exportación.

3.  **Generación de la Skill (.md)**:
    *   Define el nombre: `SKILL_[Nombre_Verbo].md`.
    *   Estructura estándar:
        *   **Meta**: Qué logra esta skill.
        *   **Prompt**: Cómo invocarla.
        *   **Pasos**: Checklist exacto.
        *   **Casos Borde**: Qué evitar.

## Estructura de Salida (Markdown Template)

Cuando generes una nueva skill, usa este formato:

```markdown
---
description: [Descripción breve para el sistema]
---

# [Nombre de la Skill]

## Contexto
[Por qué existe esta skill]

## Workflow
1. [Paso 1]
2. [Paso 2]

## Reglas de Calidad (Sanity Checks)
- [ ] Check 1
- [ ] Check 2
```

## Comandos de Auto-Mejora

Si detectas una oportunidad de mejora, propón al usuario:
> "He notado que repetimos [X]. ¿Te gustaría que cree una Skill `SKILL_X.md` para automatizar esto la próxima vez?"

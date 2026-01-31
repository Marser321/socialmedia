# Skill: Lead Magnet Architect

## Propósito
Automatizar la creación de activos de alto valor (Lead Magnets) que posicionen al cliente como autoridad y disparen la captación de prospectos.

## Razonamiento Estratégico
Un buen Lead Magnet no solo pide el email; resuelve un problema específico e inmediato. Este arquitecto utiliza IA para estructurar el contenido y componentes de UI premium para la entrega.

## Flujo de Trabajo

### 1. Extracción de ADN de Marca
- Analizar el nicho del cliente.
- Identificar el "Pain Point" #1.
- Seleccionar el formato: Guía PDF, Quiz Interactivo, Calculadora de ROI, Checklist de Auditoría.

### 2. Generación de Contenido (IA Prompt)
```text
Crea una estructura de [Formato] para un cliente de [Nicho]. 
Objetivo: Resolver [Problema]. 
Tono: Profesional pero disruptivo (Vibe Nexo).
Incluye 5 puntos clave y un CTA agresivo al final.
```

### 3. Implementación en Nexo Ecosystem
- **Mini-Landing**: Crear una ruta `/magnets/[slug]` con un formulario minimalista.
- **Supabase**: Registrar la descarga/interacción en la tabla `leads` con el tag `source: magnet_name`.
- **Entrega**: Redirigir a una página de agradecimiento con el recurso o enviarlo vía Email/WhatsApp (n8n).

## Casos Borde y Sinergias
- **Sinergia**: Conectar con `Skill_Upsell_Intelligence` para ofrecer el servicio completo tras la descarga.
- **Caso Borde**: Si el lead no descarga tras suscribirse, n8n dispara un recordatorio magnético a las 24h.

---
description: Architecture standard for connecting Next.js forms to Supabase and automating via n8n to WhatsApp.
---

# Skill: Automation Architecture (Web -> Supabase -> n8n -> WA)

## Objetivo
Estandarizar el flujo de datos desde la captación del lead hasta la notificación instantánea en WhatsApp.

## Diagrama de Flujo
1. **User** llena formulario en Web (Next.js).
2. **Next.js** guarda lead en **Supabase** (Table: `leads`).
3. **Supabase** dispara Webhook (Database Webhook) o **n8n** hace polling.
4. **n8n** procesa el lead:
    - Valida datos.
    - (Opcional) Enriquece con Clearbit/Apollo.
    - Envía mensaje a **WhatsApp API** (Business).
5. **n8n** actualiza estado en Supabase (`status: contacted`).

## Implementación Técnica

### 1. Supabase Schema
La tabla `leads` debe tener al menos:
```sql
create table public.leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  phone text,
  company text,
  status text default 'new'::text,
  service_interest text
);
```

### 2. Next.js Server Action
Usar Server Actions para seguridad y speed.
```typescript
// actions/submit-lead.ts
'use server'
import { createClient } from '@/utils/supabase/server'

export async function submitLead(formData: FormData) {
  const supabase = createClient()
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    // ...
  }
  const { error } = await supabase.from('leads').insert(data)
  if (error) throw error
}
```

### 3. n8n Workflow
- **Trigger**: Supabase Row Insert.
- **Node 1**: HTTP Request (WhatsApp API / Twilio).
    - Body: "Hola {name}, recibimos tu solicitud sobre {service}. Un consultor te contactará en 5 min."
- **Node 2**: CRM Update (HubSpot/Slack).

## Reglas de Oro
- **Fail-Safe**: Si Supabase falla, el front debe gaurdar en LocalStorage y reintentar o mostrar error amigable.
- **Privacidad**: Nunca enviar datos sensibles planos en logs.

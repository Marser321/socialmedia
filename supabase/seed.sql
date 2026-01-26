-- Seed script to ensure leads table exists for local development
CREATE TABLE IF NOT EXISTS public.leads (
  id bigserial PRIMARY KEY,
  nombre text NOT NULL,
  email text NOT NULL,
  telefono text,
  empresa text,
  servicios_interes text[],
  plan_seleccionado text,
  mensaje text,
  created_at timestamptz DEFAULT now()
);

-- Optional: ensure an index on email for quick lookups
CREATE INDEX IF NOT EXISTS leads_email_idx ON public.leads (email);

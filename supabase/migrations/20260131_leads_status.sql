-- Add status column to leads table
DO $$ BEGIN
    CREATE TYPE lead_status AS ENUM ('nuevo', 'en_proceso', 'cerrado', 'descartado');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS status lead_status DEFAULT 'nuevo';

-- Create Enums
DO $$ BEGIN
    CREATE TYPE pilar_type AS ENUM ('tech', 'media', 'growth');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE tipo_pago_type AS ENUM ('mensual', 'unico', 'ambos');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre text NOT NULL,
    descripcion text,
    descripcion_corta text,
    pilar pilar_type DEFAULT 'tech',
    icono text,
    precio_base numeric,
    tipo_pago tipo_pago_type DEFAULT 'mensual',
    caracteristicas text[] DEFAULT '{}',
    tecnologias text[] DEFAULT '{}',
    orden integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Pricing Plans Table
CREATE TABLE IF NOT EXISTS public.pricing_plans (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    description text,
    features text[] DEFAULT '{}',
    monthly_price text,
    one_time_price text,
    monthly_label text,
    one_time_label text,
    highlight boolean DEFAULT false,
    orden integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Projects Table (Ensure consistency)
CREATE TABLE IF NOT EXISTS public.projects (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    description text,
    category text, -- web, app, foto, etc.
    image_url text,
    video_url text,
    external_link text,
    featured boolean DEFAULT false,
    orden integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public Read Services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public Read Pricing" ON public.pricing_plans FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);

-- Admin write access (simplified for now, ideally tied to auth.uid())
CREATE POLICY "Admin All Access Services" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access Pricing" ON public.pricing_plans FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access Projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');

-- Create site_settings table for global content
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on site_settings"
ON public.site_settings FOR SELECT
TO public
USING (true);

-- Allow authenticated admin write access
CREATE POLICY "Allow admin write access on site_settings"
ON public.site_settings FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Initial Hero Settings
INSERT INTO public.site_settings (key, value)
VALUES (
    'hero_content',
    '{
        "badge": "Growth Partner Certificado",
        "title": "Arquitectura Digital que Domina Mercados.",
        "subtitle": "Diseñamos ecosistemas de conversión y automatizamos tu crecimiento. Dejarás de competir por precio para convertirte en la única opción lógica.",
        "image_url": "/images/stitch-hero-v2.png",
        "system_status": "System Active: Scaling"
    }'::jsonb
) ON CONFLICT (key) DO NOTHING;

-- Simplificación de copy y servicios según feedback
UPDATE services 
SET nombre = 'Ecosistema Web',
    descripcion = 'No es una web, es tu mejor vendedor. Diseño estratégico que convierte visitantes en fanáticos de tu marca.',
    caracteristicas = ARRAY['Diseño de Conversión', 'Textos Persuasivos', 'Velocidad Extrema'],
    tecnologias = ARRAY[]::text[]
WHERE id = '1';

UPDATE services 
SET nombre = 'Agentes IA 24/7',
    descripcion = 'Tu mejor vendedor, clonado. Atiende, califica y agenda citas en WhatsApp mientras duermes.',
    caracteristicas = ARRAY['Cierre de Ventas IA', 'Sincronización Total', 'Reactiva Clientes'],
    tecnologias = ARRAY[]::text[]
WHERE id = '4';

UPDATE services 
SET nombre = 'Traffic Acquisition',
    descripcion = 'Inundamos tu embudo con tráfico de alta calidad. Dejamos de adivinar y empezamos a ganar.',
    caracteristicas = ARRAY['Ads de Alta Precisión', 'Google High-Intent', 'Retargeting Inteligente'],
    tecnologias = ARRAY[]::text[]
WHERE id = '5';

UPDATE services 
SET nombre = 'E-commerce Empire',
    descripcion = 'Para marcas que buscan dominar. Checkout optimizado, ventas automáticas y lealtad programada.',
    caracteristicas = ARRAY['Tienda de Alto Nivel', 'Checkout 1-Clic', 'Ventas Recurrentes'],
    tecnologias = ARRAY[]::text[]
WHERE id = '2';

UPDATE services 
SET nombre = 'Cinema Branding',
    descripcion = 'Contenido que detiene el scroll. Producción visual que eleva tu marca a otro nivel.',
    caracteristicas = ARRAY['Historias que Venden', 'Calidad Cine', 'Formato Viral'],
    tecnologias = ARRAY[]::text[]
WHERE id = '6';

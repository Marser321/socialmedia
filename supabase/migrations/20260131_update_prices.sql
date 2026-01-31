-- Actualización de precios según feedback visual
UPDATE pricing_plans 
SET monthly_price = '800', 
    monthly_label = 'Desde · Infraestructura',
    one_time_label = 'Desde · MVP Desarrollo'
WHERE name = 'Apps a Medida';

UPDATE pricing_plans 
SET monthly_label = 'Desde · ' || monthly_label,
    one_time_label = 'Desde · ' || one_time_label
WHERE name != 'Apps a Medida';

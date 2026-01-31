'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { supabase } from '@/lib/supabase';

const SERVICES_PRICING = [
    {
        name: 'Web & Landing',
        description: 'Presencia digital de alto impacto y velocidad.',
        features: ['Diseño UX/UI Premium', 'SEO Técnico Optimizado', 'Dominio y Hosting (1 año)', 'Integración de Analytics'],
        monthly: { price: '150', label: 'Mantenimiento + SEO' },
        oneTime: { price: '1,500', label: 'Desarrollo Completo' },
        highlight: false
    },
    {
        name: 'E-commerce',
        description: 'Tiendas online diseñadas para convertir.',
        features: ['Catálogo Ilimitado', 'Pasarela de Pagos', 'Panel de Administración', 'Recuperación de Carritos'],
        monthly: { price: '300', label: 'Gestión + Soporte' },
        oneTime: { price: '3,500', label: 'Desarrollo Tienda' },
        highlight: true
    },
    {
        name: 'Apps a Medida',
        description: 'Soluciones nativas para iOS y Android.',
        features: ['Desarrollo Cross-Platform', 'Notificaciones Push', 'Base de Datos Real-time', 'Panel Super Admin'],
        monthly: { price: '800', label: 'Desde · Infraestructura' },
        oneTime: { price: '5,000+', label: 'Desde · MVP Desarrollo' },
        highlight: false
    },
    {
        name: 'Automatización AI',
        description: 'Optimiza flujos y ahorra horas de trabajo.',
        features: ['Chatbots IA (GPT-4)', 'Conexión CRM', 'Email Marketing Auto', 'Dashboard de Métricas'],
        monthly: { price: '200', label: 'Suscripción + Update' },
        oneTime: { price: '800', label: 'Setup Inicial' },
        highlight: false
    },
    {
        name: 'Social Growth',
        description: 'Estrategias virales y contenido de valor.',
        features: ['Calendario de Contenidos', 'Edición de Reels/TikTok', 'Gestión de Comunidad', 'Reportes de Crecimiento'],
        monthly: { price: '600', label: 'Gestión Mensual' },
        oneTime: { price: '500', label: 'Auditoría + Estrategia' },
        highlight: true
    },
    {
        name: 'Producción Media',
        description: 'Contenido audiovisual de calidad cinematográfica.',
        features: ['Guión y Storyboard', 'Grabación 4K', 'Edición y Color Grading', 'Drones y FPV'],
        monthly: { price: '800', label: 'Pack Recurrente' },
        oneTime: { price: '1,200', label: 'Proyecto Único' },
        highlight: false
    }
];

export function PricingTable() {
    const [isMonthly, setIsMonthly] = React.useState(true);
    const [pricingPlans, setPricingPlans] = React.useState<any[]>([]);

    React.useEffect(() => {
        const fetchPricing = async () => {
            const { data, error } = await supabase
                .from('pricing_plans')
                .select('*')
                .order('orden', { ascending: true });

            if (!error && data && data.length > 0) {
                setPricingPlans(data);
            } else {
                // Fallback to internal map if DB is empty
                const fallback = [
                    {
                        name: 'Web & Landing',
                        description: 'Presencia digital de alto impacto y velocidad.',
                        features: ['Diseño UX/UI Premium', 'SEO Técnico Optimizado', 'Dominio y Hosting (1 año)', 'Integración de Analytics'],
                        monthly: { price: '150', label: 'Desde · Mantenimiento + SEO' },
                        oneTime: { price: '1,500', label: 'Desde · Desarrollo Completo' },
                        highlight: false
                    },
                    {
                        name: 'E-commerce',
                        description: 'Tiendas online diseñadas para convertir.',
                        features: ['Catálogo Ilimitado', 'Pasarela de Pagos', 'Panel de Administración', 'Recuperación de Carritos'],
                        monthly: { price: '300', label: 'Desde · Gestión + Soporte' },
                        oneTime: { price: '3,500', label: 'Desde · Desarrollo Tienda' },
                        highlight: true
                    },
                    {
                        name: 'Apps a Medida',
                        description: 'Soluciones nativas para iOS y Android.',
                        features: ['Desarrollo Cross-Platform', 'Notificaciones Push', 'Base de Datos Real-time', 'Panel Super Admin'],
                        monthly: { price: '800', label: 'Desde · Infraestructura' },
                        oneTime: { price: '5,000+', label: 'Desde · MVP Desarrollo' },
                        highlight: false
                    },
                    {
                        name: 'Automatización AI',
                        description: 'Optimiza flujos y ahorra horas de trabajo.',
                        features: ['Chatbots IA (GPT-4)', 'Conexión CRM', 'Email Marketing Auto', 'Dashboard de Métricas'],
                        monthly: { price: '200', label: 'Desde · Suscripción + Update' },
                        oneTime: { price: '800', label: 'Desde · Setup Inicial' },
                        highlight: false
                    },
                    {
                        name: 'Social Growth',
                        description: 'Estrategias virales y contenido de valor.',
                        features: ['Calendario de Contenidos', 'Edición de Reels/TikTok', 'Gestión de Comunidad', 'Reportes de Crecimiento'],
                        monthly: { price: '600', label: 'Desde · Gestión Mensual' },
                        oneTime: { price: '500', label: 'Desde · Auditoría + Estrategia' },
                        highlight: true
                    },
                    {
                        name: 'Producción Media',
                        description: 'Contenido audiovisual de calidad cinematográfica.',
                        features: ['Guión y Storyboard', 'Grabación 4K', 'Edición y Color Grading', 'Drones y FPV'],
                        monthly: { price: '800', label: 'Desde · Pack Recurrente' },
                        oneTime: { price: '1,200', label: 'Desde · Proyecto Único' },
                        highlight: false
                    }
                ];
                setPricingPlans(fallback);
            }
        };

        fetchPricing();
    }, []);

    return (
        <section id="pricing" className="py-32 bg-background relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase">
                            Servicios <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse">Flexibles</span>
                        </h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
                            Desde desarrollos puntuales hasta acompañamiento continuo. Tú eliges cómo trabajar.
                        </p>
                    </motion.div>

                    <div className="flex items-center justify-center gap-6 mt-12 bg-white/5 w-fit mx-auto px-8 py-4 rounded-full border border-white/10 backdrop-blur-sm">
                        <Label htmlFor="pricing-mode" className={cn("text-lg cursor-pointer transition-colors font-bold tracking-tight", isMonthly ? "text-cyan-400" : "text-white/40")}>
                            Modalidad Mensual
                        </Label>
                        <Switch
                            id="pricing-mode"
                            checked={!isMonthly}
                            onCheckedChange={(c) => setIsMonthly(!c)}
                            className="scale-125 data-[state=checked]:bg-violet-600 data-[state=unchecked]:bg-cyan-500"
                        />
                        <Label htmlFor="pricing-mode" className={cn("text-lg cursor-pointer transition-colors font-bold tracking-tight", !isMonthly ? "text-violet-400" : "text-white/40")}>
                            Pago Único
                        </Label>
                    </div>
                    <p className="text-white/30 text-xs mt-3 font-medium tracking-wider uppercase">
                        {isMonthly ? 'Mantenimiento, Gestión y Soporte' : 'Desarrollo, Setup y Proyectos'}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                    {pricingPlans.map((service, index) => {
                        const priceData = isMonthly
                            ? (service.monthly || { price: service.monthly_price, label: service.monthly_label })
                            : (service.oneTime || { price: service.one_time_price, label: service.one_time_label });

                        return (
                            <motion.div
                                key={service.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className={cn(
                                    "relative p-8 rounded-3xl border backdrop-blur-md transition-all duration-500 group flex flex-col",
                                    service.highlight
                                        ? "bg-white/10 border-violet-500/50 shadow-[0_0_50px_-10px_rgba(124,58,237,0.4)] z-10"
                                        : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-xl"
                                )}
                            >
                                {service.highlight && (
                                    <div className="absolute -top-4 left-8 bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-1 rounded-full text-[10px] font-black tracking-widest text-white shadow-lg uppercase">
                                        Más Popular
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{service.name}</h3>
                                    <p className="text-white/60 text-sm leading-relaxed min-h-[40px] font-light">{service.description}</p>
                                </div>

                                <div className="mb-8 pb-8 border-b border-white/10">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xl font-bold text-white/40 mr-1">Desde</span>
                                        <span className={cn(
                                            "text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br transition-all duration-300",
                                            isMonthly ? "from-cyan-400 to-blue-500" : "from-violet-400 to-purple-500"
                                        )}>
                                            ${priceData.price}
                                        </span>
                                    </div>
                                    <p className="text-white/40 text-xs font-bold uppercase tracking-wider mt-1">
                                        {priceData.label}
                                    </p>
                                </div>

                                <div className="space-y-4 mb-8 flex-grow">
                                    {service.features.map((feature: string) => (
                                        <div key={feature} className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-white/10 text-cyan-400">
                                                <Check className="w-3 h-3 stroke-[3]" />
                                            </div>
                                            <span className="text-white/80 text-sm font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    className={cn(
                                        "w-full h-12 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 mt-auto",
                                        service.highlight
                                            ? "bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white shadow-lg border-0"
                                            : "bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/30"
                                    )}
                                >
                                    <span className="flex items-center gap-2">
                                        <Zap className="w-4 h-4 fill-current" />
                                        {isMonthly ? 'Suscribirse' : 'Cotizar Proyecto'}
                                    </span>
                                </Button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

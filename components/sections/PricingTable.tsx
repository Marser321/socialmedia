'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils'; // Ensure utility exists or replace with clsx/tailwind-merge

const PLANS = {
    monthly: [
        {
            name: 'Despegue',
            price: '299',
            description: 'Esenciales para iniciar tu presencia digital.',
            features: ['2 Redes Sociales', '8 Posts/mes', 'Reporte Mensual', 'Soporte Email'],
            highlight: false
        },
        {
            name: 'Crecimiento',
            price: '699',
            description: 'Para negocios que buscan escalar rápido.',
            features: ['4 Redes Sociales', '20 Posts/mes', '1 Video/mes', 'Ads Management', 'Soporte Prioritario'],
            highlight: true
        },
        {
            name: 'Dominio',
            price: '1,499',
            description: 'Tu departamento de marketing externo.',
            features: ['Todo Ilimitado', 'Producción Semanal', 'Estrategia SEO', 'Gestor Dedicado', 'Soporte 24/7'],
            highlight: false
        }
    ],
    oneTime: [
        {
            name: 'Landing Page',
            price: '1,500',
            description: 'Web de alto impacto para captar leads.',
            features: ['Diseño UX/UI', 'Copywriting', 'SEO Básico', 'Formulario Leads'],
            highlight: false
        },
        {
            name: 'E-commerce',
            price: '3,500',
            description: 'Vende tus productos online 24/7.',
            features: ['Catálogo ilimitado', 'Pasarela de Pagos', 'Panel Admin', 'Integración Envíos'],
            highlight: true
        },
        {
            name: 'App a Medida',
            price: '5,000+',
            description: 'Software exclusivo para tu negocio.',
            features: ['iOS & Android', 'Panel Super Admin', 'Notificaciones Push', 'Bases de Datos'],
            highlight: false
        }
    ]
};

export function PricingTable() {
    const [isMonthly, setIsMonthly] = React.useState(true);

    return (
        <section id="planes" className="py-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase">
                            Planes <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse">Flexibles</span>
                        </h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
                            Desde startups hasta corporativos. Elige la potencia que tu negocio necesita para escalar.
                        </p>
                    </motion.div>

                    <div className="flex items-center justify-center gap-6 mt-8">
                        <Label htmlFor="pricing-mode" className={cn("text-lg cursor-pointer transition-colors font-medium", !isMonthly ? "text-white/40" : "text-white")}>
                            Mensual (Growth)
                        </Label>
                        <Switch
                            id="pricing-mode"
                            checked={!isMonthly}
                            onCheckedChange={(c) => setIsMonthly(!c)}
                            className="scale-125 data-[state=checked]:bg-cyan-500 data-[state=unchecked]:bg-violet-600"
                        />
                        <Label htmlFor="pricing-mode" className={cn("text-lg cursor-pointer transition-colors font-medium", isMonthly ? "text-white/40" : "text-white")}>
                            Pago Único (Tech)
                        </Label>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {(isMonthly ? PLANS.monthly : PLANS.oneTime).map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                                "relative p-8 rounded-3xl border backdrop-blur-md transition-all duration-500 group hover:-translate-y-2",
                                plan.highlight
                                    ? "bg-white/10 border-violet-500/50 shadow-[0_0_50px_-10px_rgba(124,58,237,0.4)] z-10 scale-105"
                                    : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-xl"
                            )}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-1.5 rounded-full text-xs font-black tracking-widest text-white shadow-lg uppercase">
                                    Recomendado
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{plan.name}</h3>
                                <p className="text-white/60 text-sm leading-relaxed min-h-[40px] font-light">{plan.description}</p>
                            </div>

                            <div className="flex items-baseline gap-1 mb-8 pb-8 border-b border-white/10">
                                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">${plan.price}</span>
                                {isMonthly && <span className="text-white/40 font-medium">/mes</span>}
                            </div>

                            <div className="space-y-5 mb-10">
                                {plan.features.map((feature) => (
                                    <div key={feature} className="flex items-start gap-3">
                                        <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                                            plan.highlight ? "bg-cyan-500 text-black shadow-[0_0_10px_rgba(34,211,238,0.5)]" : "bg-white/10 text-white/50")}>
                                            <Check className="w-3 h-3 stroke-[3]" />
                                        </div>
                                        <span className="text-white/80 text-sm font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Button
                                className={cn(
                                    "w-full h-14 rounded-xl text-base font-bold tracking-wide transition-all duration-300",
                                    plan.highlight
                                        ? "bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] border-0"
                                        : "bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/30"
                                )}
                            >
                                {plan.highlight ? (
                                    <span className="flex items-center gap-2">
                                        <Zap className="w-4 h-4 fill-current" /> EMPEZAR AHORA
                                    </span>
                                ) : 'Consultar Plan'}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

'use client';

import { motion } from 'framer-motion';
import { Mail, Database, MessageSquare, Calendar, DollarSign, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Automations() {
    const steps = [
        { icon: Mail, label: 'Lead entra por Web', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
        { icon: Database, label: 'CRM Automático', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
        { icon: MessageSquare, label: 'WhatsApp Bienvenida', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
        { icon: Calendar, label: 'Agenda Cita', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
        { icon: DollarSign, label: 'Cierre Venta', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
    ];

    return (
        <section id="automatizacion" className="py-24 bg-black/40 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase relative inline-block">
                            Tu Negocio en <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 animate-pulse">Piloto Automático</span>
                        </h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
                            Diseñamos flujos inteligentes que trabajan <span className="text-white font-semibold">24/7 sin descanso</span>. Elimina el error humano.
                        </p>
                    </motion.div>
                </div>

                <div className="relative max-w-6xl mx-auto py-12">
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -translate-y-1/2 hidden md:block overflow-hidden rounded-full">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 blur-[2px]"
                            initial={{ x: '-100%' }}
                            whileInView={{ x: '100%' }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, type: "spring" }}
                                className="flex flex-col items-center group relative"
                            >
                                <div className={cn(
                                    "w-20 h-20 rounded-2xl flex items-center justify-center border backdrop-blur-xl mb-6 relative transition-all duration-500 z-10",
                                    step.bg, step.border,
                                    "group-hover:scale-110 group-hover:-translate-y-2 shadow-lg"
                                )}>
                                    <div className={cn("absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl", step.bg)} />
                                    <step.icon className={cn("w-9 h-9 relative z-10 transition-transform duration-500 group-hover:rotate-12", step.color)} />

                                    {/* Arrow for mobile */}
                                    {index < steps.length - 1 && (
                                        <ArrowRight className="md:hidden absolute -bottom-10 text-white/20 w-6 h-6 rotate-90" />
                                    )}
                                </div>
                                <span className={cn("text-base font-bold text-center tracking-wide transition-colors duration-300 group-hover:text-white", step.color.replace('text-', 'text-'))}>
                                    {step.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

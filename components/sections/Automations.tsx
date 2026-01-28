'use client';

import { motion } from 'framer-motion';
import { Mail, Database, MessageSquare, Calendar, DollarSign, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Automations() {
    const steps = [
        { icon: Mail, label: 'Captura Validada', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', shadow: 'shadow-blue-500/20' },
        { icon: Database, label: 'Nurture Intelligence', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20', shadow: 'shadow-violet-500/20' },
        { icon: MessageSquare, label: 'Conversión Directa', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', shadow: 'shadow-green-500/20' },
        { icon: Calendar, label: 'Agenda Calificada', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', shadow: 'shadow-orange-500/20' },
        { icon: DollarSign, label: 'Revenue System', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', shadow: 'shadow-cyan-500/20' },
    ];

    return (
        <section id="automatizacion" className="py-32 bg-black relative overflow-hidden">
            {/* Technical Circuit Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M 0 50 L 50 50 M 50 0 L 50 50 M 50 50 L 100 50 M 50 50 L 50 100" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
                            <circle cx="50" cy="50" r="1.5" fill="white" fillOpacity="0.4" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#circuit)" />
                </svg>
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-500/10 blur-[120px] rounded-full" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            <span className="text-sm font-bold text-white uppercase tracking-widest">Infraestructura de Escalamiento</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
                            Ecosistema <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-500">Autónomo</span>
                        </h2>
                        <p className="text-xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
                            No es magia, es ingeniería. Implementamos <span className="text-white font-medium">sistemas de revenue operation</span> que nutren a tus leads mientras duermes.
                        </p>
                    </motion.div>
                </div>

                <div className="relative max-w-7xl mx-auto py-20 px-4">
                    {/* Pulsing Connection Line (Desktop) */}
                    <div className="absolute top-1/2 left-10 right-10 h-[2px] -translate-y-[4.5rem] hidden xl:block">
                        <svg className="w-full h-full overflow-visible">
                            <motion.path
                                d="M 0 1 L 1000 1"
                                fill="none"
                                stroke="url(#lineGradient)"
                                strokeWidth="2"
                                strokeDasharray="10 20"
                                initial={{ strokeDashoffset: 100 }}
                                animate={{ strokeDashoffset: 0 }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            />
                            <defs>
                                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                                className="flex flex-col items-center group"
                            >
                                <div className={cn(
                                    "w-28 h-28 rounded-[2.5rem] flex items-center justify-center border backdrop-blur-3xl mb-8 relative transition-all duration-700 z-10",
                                    step.bg, step.border, step.shadow,
                                    "group-hover:scale-110 group-hover:-translate-y-4 group-hover:rotate-[10deg] shadow-2xl"
                                )}>
                                    <div className={cn("absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-40 transition-opacity duration-700 blur-2xl", step.bg)} />
                                    <step.icon className={cn("w-12 h-12 relative z-10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[-10deg]", step.color)} />

                                    {/* Connection Node Indicator */}
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-background border-2 border-current rounded-full z-20" style={{ color: `var(--${step.color.split('-')[1]}-500)` }} />
                                </div>

                                <div className="text-center group-hover:translate-y-[-0.5rem] transition-transform duration-500">
                                    <h3 className={cn("text-lg font-black tracking-tight mb-2 uppercase", step.color)}>
                                        {step.label.split(' ')[0]}
                                    </h3>
                                    <p className="text-white/40 text-xs font-bold leading-tight tracking-widest uppercase">
                                        {step.label.split(' ').slice(1).join(' ')}
                                    </p>
                                </div>

                                {/* Mobile/Tablet Connector */}
                                {index < steps.length - 1 && (
                                    <div className="xl:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/10">
                                        <ArrowRight className="w-6 h-6 rotate-90" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

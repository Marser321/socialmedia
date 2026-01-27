'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Database, MessageSquare, FileSpreadsheet, Mail, ArrowRight, AlertTriangle, MessageCircleOff, Hourglass, FileWarning } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

export function ProblemSolution() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const problemY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
    const problemScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
    const problemOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

    return (
        <div ref={containerRef} className="relative w-full">
            {/* 1. LAYER A: PROBLEM (Sticky Bottom Layer) */}
            <motion.div
                style={{ y: problemY, scale: problemScale, opacity: problemOpacity }}
                className="sticky top-0 z-0 h-screen w-full overflow-hidden bg-[#1A0505] flex items-center justify-center"
            >
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
                <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-sm text-red-400">
                            <span className="flex h-2 w-2 rounded-full bg-red-500 mr-2 animate-pulse" />
                            Situación Actual
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                            Atrapado en el <span className="text-red-500">Autoempleo</span>
                        </h2>
                        <p className="text-xl text-white/60 leading-relaxed max-w-lg">
                            Tu negocio no escala porque eres el cuello de botella. Vives apagando fuegos, contestando WhatsApps y perdiendo vida entre hojas de cálculo.
                            <br /><span className="text-red-400 font-medium mt-2 block">Eso no es libertad, es una jaula dorada.</span>
                        </p>
                        <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                            <ProblemItem icon={FileSpreadsheet} label="Excel Caos" />
                            <ProblemItem icon={MessageCircleOff} label="Leads Fríos" />
                            <ProblemItem icon={Hourglass} label="Sin Tiempo" />
                        </div>
                    </motion.div>

                    {/* Visual Metaphor Chaos - Distinct Icons */}
                    <div className="relative aspect-square flex items-center justify-center">
                        <div className="absolute inset-0 bg-red-500/10 blur-[100px] rounded-full" />
                        <div className="relative grid grid-cols-2 gap-4 animate-[spin_60s_linear_infinite] opacity-60 hover:opacity-100 transition-opacity">
                            <ChaosCard icon={FileWarning} delay={0} />
                            <ChaosCard icon={MessageCircleOff} delay={1} />
                            <ChaosCard icon={Hourglass} delay={2} />
                            <ChaosCard icon={AlertTriangle} delay={3} />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* 2. LAYER B: SOLUTION (Physical Scroll Overlay) */}
            <div className="relative z-10 h-screen w-full overflow-hidden bg-[#022c22] flex items-center justify-center shadow-[0_-50px_100px_rgba(0,0,0,0.5)] border-t border-emerald-900/50">
                {/* Brighter Green Background for 'Wow' effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-[#064e3b] to-emerald-950 opacity-90" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30" />

                {/* Top fade for smooth entry */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

                {/* Central Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400">
                            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 shadow-[0_0_10px_#10b981]" />
                            Nexo System v2.0
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                            Libertad <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Absoluta</span>
                        </h2>
                        <p className="text-xl text-white/80 leading-relaxed max-w-lg">
                            Construimos la infraestructura digital que trabaja por ti. Tu negocio factura, nutre leads y cierra ventas mientras tú recuperas tu vida.
                        </p>

                        <div className="grid grid-cols-3 gap-4 border-t border-emerald-500/20 pt-8">
                            <SolutionItem icon={Zap} label="Instantáneo" delay={0.4} />
                            <SolutionItem icon={Database} label="Centralizado" delay={0.5} />
                            <SolutionItem icon={MessageSquare} label="Autónomo" delay={0.6} />
                        </div>

                        <Button
                            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-full px-8 py-6 text-lg group"
                        >
                            Solicitar Auditoría
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </motion.div>

                    {/* Visual Metaphor Order */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
                        whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                        viewport={{ margin: "-100px" }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative aspect-square flex items-center justify-center perspective-1000"
                    >
                        <div className="absolute inset-0 bg-emerald-500/30 blur-[100px] rounded-full" />
                        <div className="relative w-full max-w-md bg-black/80 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-8 shadow-2xl shadow-emerald-900/40">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500 text-[10px] flex items-center justify-center font-bold text-black/50">OK</div>
                                </div>
                                <div className="text-xs font-mono text-emerald-400">SYSTEM: OPTIMIZED</div>
                            </div>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                                        <div className="flex-1 h-2 bg-emerald-900/30 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "100%" }}
                                                transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity, repeatDelay: 2 }}
                                                className="h-full bg-emerald-500"
                                            />
                                        </div>
                                        <span className="text-xs text-emerald-400 font-mono">100%</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-end">
                                <div>
                                    <div className="text-sm text-white/40 mb-1">Crecimiento Mensual</div>
                                    <div className="text-3xl font-bold text-white">$24,500</div>
                                </div>
                                <div className="text-emerald-400 text-sm font-bold bg-emerald-400/10 px-2 py-1 rounded border border-emerald-500/20">+240%</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="absolute top-[95vh] left-1/2 -translate-x-1/2 text-white/20 text-sm font-mono z-20 pointer-events-none mix-blend-difference">
                SCROLL TO EVOLVE
            </div>
        </div>
    );
}

function ChaosCard({ icon: Icon, delay }: { icon: React.ElementType, delay: number }) {
    return (
        <div className="w-32 h-32 bg-red-950/20 border border-red-500/20 rounded-2xl flex items-center justify-center animate-pulse" style={{ animationDelay: `${delay}s` }}>
            <Icon className="w-8 h-8 text-red-500" />
        </div>
    );
}

function ProblemItem({ icon: Icon, label }: { icon: React.ElementType, label: string }) {
    return (
        <div className="flex flex-col items-center gap-3 text-white/40 group">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:border-red-500/30 transition-colors">
                <Icon className="w-6 h-6 group-hover:text-red-400 transition-colors" />
            </div>
            <span className="text-xs uppercase tracking-wider font-medium">{label}</span>
        </div>
    );
}

function SolutionItem({ icon: Icon, label, delay }: { icon: React.ElementType, label: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="flex flex-col items-center gap-3 text-emerald-100 group"
        >
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <Icon className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="text-xs uppercase tracking-wider font-bold text-emerald-400/80">{label}</span>
        </motion.div>
    );
}

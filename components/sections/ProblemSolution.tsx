'use client';

import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Database, MessageSquare, Clock, FileSpreadsheet, Mail, PhoneMissed, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ProblemSolution() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    // MASK ANIMATION: 0% -> 150% (Full Reveal)
    // Starts at 10% scroll, finishes at 80% scroll
    const maskSize = useTransform(scrollYProgress, [0.1, 0.8], [0, 150]);
    const clipPath = useMotionTemplate`circle(${maskSize}% at 50% 50%)`;

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* LAYER A: PROBLEM (Base Layer) */}
                <div className="absolute inset-0 bg-[#0F0505] flex items-center justify-center z-0">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
                    <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-sm text-red-400">
                                <span className="flex h-2 w-2 rounded-full bg-red-500 mr-2 animate-pulse" />
                                Situación Actual
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                                El <span className="text-red-500">Caos</span> Operativo
                            </h2>
                            <p className="text-xl text-white/60 leading-relaxed max-w-lg">
                                Tu negocio depende 100% de ti. Leads perdidos en WhatsApp, seguimiento manual en Excel y horas quemadas en tareas repetitivas.
                            </p>
                            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                                <ProblemItem icon={FileSpreadsheet} label="Excel Manual" />
                                <ProblemItem icon={PhoneMissed} label="Ventas Perdidas" />
                                <ProblemItem icon={Mail} label="Lento" />
                            </div>
                        </div>
                        {/* Visual Metaphor Chaos */}
                        <div className="relative aspect-square flex items-center justify-center">
                            <div className="absolute inset-0 bg-red-500/10 blur-[100px] rounded-full" />
                            <div className="relative grid grid-cols-2 gap-4 animate-[spin_40s_linear_infinite] opacity-50 grayscale hover:grayscale-0 transition-all">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-32 h-32 bg-red-950/20 border border-red-500/20 rounded-2xl flex items-center justify-center animate-pulse">
                                        <Clock className="w-8 h-8 text-red-500" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* LAYER B: SOLUTION (Overlay Layer) */}
                <motion.div
                    style={{ clipPath }}
                    className="absolute inset-0 bg-[#020D08] flex items-center justify-center z-10"
                >
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
                    {/* Glow effect matching mask center roughly */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

                    <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-20">
                        <div className="space-y-8">
                            <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400">
                                <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 shadow-[0_0_10px_#10b981]" />
                                Nexo System v2.0
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                                Libertad <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Escalable</span>
                            </h2>
                            <p className="text-xl text-white/80 leading-relaxed max-w-lg">
                                Implementamos ecosistemas de automatización que capturan, nutren y cierran ventas 24/7. Recupera 20h a la semana.
                            </p>

                            <div className="grid grid-cols-3 gap-4 border-t border-emerald-500/20 pt-8">
                                <SolutionItem icon={Zap} label="Instantáneo" delay={0} />
                                <SolutionItem icon={Database} label="Centralizado" delay={0.1} />
                                <SolutionItem icon={MessageSquare} label="Autónomo" delay={0.2} />
                            </div>

                            <Button className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-full px-8 py-6 text-lg group">
                                Ver Demo
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>

                        {/* Visual Metaphor Order */}
                        <div className="relative aspect-square flex items-center justify-center">
                            <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full" />
                            <div className="relative w-full max-w-md bg-black/80 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-8 shadow-2xl shadow-emerald-900/40">
                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <div className="text-xs font-mono text-emerald-400">STATUS: ONLINE</div>
                                </div>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                            <div className="flex-1 h-2 bg-emerald-900/30 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: "100%" }}
                                                    transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity, repeatDelay: 2 }}
                                                    className="h-full bg-emerald-500"
                                                />
                                            </div>
                                            <span className="text-xs text-emerald-400 font-mono">DONE</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-end">
                                    <div>
                                        <div className="text-sm text-white/40 mb-1">Total Revenue</div>
                                        <div className="text-3xl font-bold text-white">$24,500</div>
                                    </div>
                                    <div className="text-emerald-400 text-sm font-bold bg-emerald-400/10 px-2 py-1 rounded">+240%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
            {/* Scroll Indicator at bottom of track to signal end */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 text-sm font-mono z-0">
                SCROLL TO CONTINUE
            </div>
        </section>
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

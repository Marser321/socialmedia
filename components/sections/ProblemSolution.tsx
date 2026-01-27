'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Database, MessageSquare, FileSpreadsheet, Mail, ArrowRight, AlertTriangle, MessageCircleOff, Hourglass, FileWarning } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

export function ProblemSolution() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // 10k Dollar Transitions: Interpolations
    const problemScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.8]);
    const problemBlur = useTransform(scrollYProgress, [0, 0.4], ["blur(0px)", "blur(10px)"]);
    const problemOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const problemZ = useTransform(scrollYProgress, [0, 0.4], [0, -500]);

    // Liquid Wipe ClipPath: Circle expanding from center
    const revealClipPath = useTransform(
        scrollYProgress,
        [0.2, 0.6],
        ["circle(0% at 50% 50%)", "circle(150% at 50% 50%)"]
    );

    // Dynamic Text "SCROLL TO EVOLVE"
    const textLetterSpacing = useTransform(scrollYProgress, [0, 0.2], ["0.1em", "1.5em"]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [0.4, 1, 0]);
    const textScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.2]);

    return (
        <div ref={containerRef} className="relative w-full h-[300vh] bg-black">
            {/* STICKY CONTAINER: Frame for the transition */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* 1. LAYER A: PROBLEM (Receding 3D) */}
                <motion.div
                    style={{
                        scale: problemScale,
                        filter: problemBlur,
                        opacity: problemOpacity,
                        z: problemZ,
                        perspective: "1000px"
                    }}
                    className="absolute inset-0 z-0 bg-[#0A0000] flex items-center justify-center p-4 md:p-8"
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
                    <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-sm text-red-500/80 font-mono tracking-widest"
                            >
                                <span className="flex h-2 w-2 rounded-full bg-red-500 mr-2 animate-pulse" />
                                LEGACY SYSTEM DETECTED
                            </motion.div>
                            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
                                El <span className="text-red-600">Caos</span> <br />
                                <span className="text-white/40">Te Consume.</span>
                            </h2>
                            <p className="text-xl text-white/50 leading-relaxed max-w-lg font-light">
                                Tu negocio depende 100% de tu tiempo. Leads perdidos, procesos manuales y escalabilidad nula. Estás construyendo un autoempleo, no un imperio.
                            </p>
                        </div>

                        {/* 3D Chaos Parallax */}
                        <div className="relative aspect-square">
                            <ChaosGroup scrollYProgress={scrollYProgress} />
                        </div>
                    </div>
                </motion.div>

                {/* 2. LAYER B: SOLUTION (Liquid ClipPath Reveal) */}
                <motion.div
                    style={{ clipPath: revealClipPath }}
                    className="absolute inset-0 z-10 bg-[#022c22] flex items-center justify-center border-t border-emerald-500/10 shadow-[0_-50px_100px_rgba(16,185,129,0.1)]"
                >
                    {/* Premium Background for Solution */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#064e3b_0%,#022c22_100%)]" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

                    <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-8"
                        >
                            <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs text-emerald-400 font-mono tracking-[0.3em] uppercase">
                                <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-3 shadow-[0_0_12px_#10b981]" />
                                Next-Gen Infrastructure
                            </div>
                            <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-[0.85]">
                                Libertad <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500">
                                    Escalable.
                                </span>
                            </h2>
                            <p className="text-xl text-emerald-100/60 leading-relaxed max-w-lg">
                                Convertimos tu operación en un motor autónomo. Automatización de punta a punta para que dejes de trabajar EN tu negocio y empieces a trabajar SOBRE él.
                            </p>

                            <Button
                                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-emerald-500 hover:bg-white text-black font-black rounded-full px-10 py-8 text-xl group transition-all duration-500"
                            >
                                ESCALAR AHORA
                                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </motion.div>

                        {/* Order Metaphor Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 50, rotateY: -10 }}
                            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="relative perspective-2000"
                        >
                            <div className="absolute -inset-10 bg-emerald-500/20 blur-[120px] rounded-full animate-pulse" />
                            <SystemPulseCard />
                        </motion.div>
                    </div>
                </motion.div>

                {/* MAGNETIC PROGRESS INDICATOR */}
                <motion.div
                    style={{
                        letterSpacing: textLetterSpacing,
                        opacity: textOpacity,
                        scale: textScale,
                        mixBlendMode: "difference"
                    }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white font-mono text-xs uppercase tracking-[0.5em] pointer-events-none whitespace-nowrap z-50"
                >
                    Scroll To Evolve
                </motion.div>
            </div>
        </div>
    );
}

function ChaosGroup({ scrollYProgress }: { scrollYProgress: any }) {
    // Independent parallax for chaos elements
    const y1 = useTransform(scrollYProgress, [0, 0.4], [0, -200]);
    const x1 = useTransform(scrollYProgress, [0, 0.4], [0, -100]);
    const r1 = useTransform(scrollYProgress, [0, 0.4], [0, 45]);

    const y2 = useTransform(scrollYProgress, [0, 0.4], [0, 150]);
    const x2 = useTransform(scrollYProgress, [0, 0.4], [0, 120]);
    const r2 = useTransform(scrollYProgress, [0, 0.4], [0, -30]);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <motion.div style={{ x: x1, y: y1, rotate: r1 }} className="absolute top-10 left-10">
                <ChaosCard icon={FileWarning} delay={0} />
            </motion.div>
            <motion.div style={{ x: x2, y: y2, rotate: r2 }} className="absolute bottom-10 right-10">
                <ChaosCard icon={MessageCircleOff} delay={0.2} />
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-red-600/10 blur-[80px] rounded-full" />
            <ChaosCard icon={Hourglass} delay={0.4} size="lg" />
        </div>
    );
}

function SystemPulseCard() {
    return (
        <div className="relative w-full max-w-md bg-[#0A0A0A]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />

            <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                <div className="space-y-1">
                    <div className="text-[10px] font-mono text-emerald-500/60 uppercase tracking-widest">Core Status</div>
                    <div className="text-white font-bold tracking-tight">System Optimized</div>
                </div>
                <div className="h-4 w-4 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981]" />
            </div>

            <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex justify-between text-[10px] text-white/40 uppercase font-mono">
                            <span>Process {i}</span>
                            <span>100%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity, repeatDelay: 3 }}
                                className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 flex items-end justify-between">
                <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">Efficiency Gain</p>
                    <p className="text-4xl font-black text-white">+84%</p>
                </div>
                <div className="text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 text-xs font-mono">
                    READY TO SCALE
                </div>
            </div>
        </div>
    );
}

function ChaosCard({ icon: Icon, delay, size = "md" }: { icon: React.ElementType, delay: number, size?: "md" | "lg" }) {
    return (
        <div className={`${size === 'lg' ? 'w-48 h-48' : 'w-32 h-32'} bg-red-950/10 border border-red-900/20 rounded-3xl flex items-center justify-center animate-pulse backdrop-blur-sm group hover:border-red-500/50 transition-colors`} style={{ animationDelay: `${delay}s` }}>
            <Icon className={`${size === 'lg' ? 'w-12 h-12' : 'w-8 h-8'} text-red-600/60 group-hover:text-red-500 transition-colors`} />
        </div>
    );
}

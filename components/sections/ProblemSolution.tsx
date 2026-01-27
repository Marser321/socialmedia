'use client';

import { motion, useScroll, useTransform, useVelocity, useSpring } from 'framer-motion';
import { Zap, Database, MessageSquare, FileSpreadsheet, Mail, ArrowRight, AlertTriangle, MessageCircleOff, Hourglass, FileWarning } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef, useMemo } from 'react';

export function ProblemSolution() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // 10k Dollar Transitions: Interpolations
    // "Freeze" the problem layer: Keep it fully visible (1 opacity, 1 scale)
    // while the green solution layer CLIP PATH expands over it.
    // We only fade it out at the very end (0.9 to 1.0) when it's fully covered.
    const problemScale = useTransform(scrollYProgress, [0, 0.9], [1, 1]);
    const problemBlur = useTransform(scrollYProgress, [0, 0.9], ["blur(0px)", "blur(0px)"]);
    const problemOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 1]);

    // Slight Z push to ensure it stays behind properly
    const problemZ = useTransform(scrollYProgress, [0, 1], [0, 0]);

    // Liquid Wipe ClipPath: Circle expanding from center
    // AGGRESSIVE EXPANSION: Go to 250% to ensure corners are covered immediately.
    // Start at 0 to feel instant.
    const revealClipPath = useTransform(
        scrollYProgress,
        [0, 0.9],
        ["circle(0% at 50% 50%)", "circle(250% at 50% 50%)"]
    );

    // Light Sweep overlay during reveal
    const sweepX = useTransform(scrollYProgress, [0.1, 0.5], ["-100%", "200%"]);
    const sweepOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.4, 0.6], [0, 1, 1, 0]);

    // Staggered Solution Content
    // Adjusted timing to match the new faster scroll
    const solTitleY = useTransform(scrollYProgress, [0.2, 0.6], [100, 0]);
    const solTitleOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

    const solParaY = useTransform(scrollYProgress, [0.3, 0.7], [100, 0]);
    const solParaOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

    const solBtnY = useTransform(scrollYProgress, [0.4, 0.8], [50, 0]);
    const solBtnOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);

    // 3D Card Parallax
    const cardRotateX = useTransform(scrollYProgress, [0.1, 0.5], [5, -5]);
    const cardRotateY = useTransform(scrollYProgress, [0.1, 0.5], [10, -10]);

    // Kinetic Magnetic Text
    const scrollVelocity = useVelocity(scrollYProgress);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const textSkewX = useTransform(smoothVelocity, [-0.005, 0, 0.005], [-25, 0, 25]);

    const textLetterSpacing = useTransform(scrollYProgress, [0, 0.2], ["0.1em", "1.5em"]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [0.4, 1, 0]);
    const textScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.2]);

    return (
        <div ref={containerRef} className="relative w-full h-[150vh] bg-black">
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
                    className="absolute inset-0 z-0 bg-gradient-to-b from-[#1a0505] to-[#0A0000] flex items-center justify-center p-4 md:p-8"
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

                {/* 2. LAYER B: SOLUTION (Static "Portal" Reveal) */}
                <motion.div
                    style={{
                        clipPath: revealClipPath,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    }}
                    className="z-10 bg-[#022c22] flex items-center justify-center border-t border-emerald-500/10 shadow-[0_-50px_100px_rgba(16,185,129,0.1)]"
                >
                    {/* Light Sweep Effect */}
                    <motion.div
                        style={{ x: sweepX, opacity: sweepOpacity }}
                        className="absolute inset-0 pointer-events-none z-50 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent skew-x-12"
                    />

                    {/* Premium Background for Solution */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#064e3b_0%,#022c22_100%)]" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

                    <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-20">
                        <div className="space-y-8">
                            <motion.div
                                style={{ opacity: solTitleOpacity, y: solTitleY }}
                                className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs text-emerald-400 font-mono tracking-[0.3em] uppercase"
                            >
                                <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-3 shadow-[0_0_12px_#10b981]" />
                                Next-Gen Infrastructure
                            </motion.div>
                            <motion.h2
                                style={{ opacity: solTitleOpacity, y: solTitleY }}
                                className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-[0.85]"
                            >
                                Libertad <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500">
                                    Escalable.
                                </span>
                            </motion.h2>
                            <motion.p
                                style={{ opacity: solParaOpacity, y: solParaY }}
                                className="text-xl text-emerald-100/60 leading-relaxed max-w-lg"
                            >
                                Convertimos tu operación en un motor autónomo. Automatización de punta a punta para que dejes de trabajar EN tu negocio y empieces a trabajar SOBRE él.
                            </motion.p>

                            <motion.div style={{ opacity: solBtnOpacity, y: solBtnY }}>
                                <Button
                                    onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="bg-emerald-500 hover:bg-white text-black font-black rounded-full px-10 py-8 text-xl group transition-all duration-500"
                                >
                                    ESCALAR AHORA
                                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                </Button>
                            </motion.div>
                        </div>

                        {/* Order Metaphor Card */}
                        <motion.div
                            style={{ rotateX: cardRotateX, rotateY: cardRotateY, perspective: 1000 }}
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
                        skewX: textSkewX,
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

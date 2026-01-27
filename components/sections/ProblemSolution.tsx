'use client';

import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Database, MessageSquare, Clock, FileSpreadsheet, Mail, PhoneMissed } from 'lucide-react';

export function ProblemSolution() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    // Background Color Transition: Red (Problem) -> Emerald (Solution)
    const bgColor = useTransform(scrollYProgress, [0, 0.45, 1],
        ['rgba(20, 0, 0, 1)', 'rgba(0, 20, 10, 1)', 'rgba(2, 44, 34, 1)'] // Brighter Emerald (emerald-950/900 mix)
    );
    const background = useMotionTemplate`linear-gradient(to bottom, ${bgColor}, #020617)`;

    // Parallax elements
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <motion.section
            ref={containerRef}
            style={{ background }}
            className="relative min-h-[300vh] py-24"
        >
            {/* Persistent Background Depth */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,transparent,white,transparent)] pointer-events-none" />

            <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden">
                <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">

                    {/* LEFT: Dynamic Text */}
                    <div className="z-10 relative h-[300px] flex items-center">
                        {/* PROBLEM STATE */}
                        <motion.div
                            style={{
                                opacity: useTransform(scrollYProgress, [0, 0.35, 0.45], [1, 1, 0]),
                                y: useTransform(scrollYProgress, [0, 0.35, 0.45], [0, 0, -20]),
                                scale: useTransform(scrollYProgress, [0, 0.35, 0.45], [1, 1, 0.95]),
                                filter: useTransform(scrollYProgress, [0.35, 0.45], ["blur(0px)", "blur(10px)"])
                            }}
                            className="bg-red-950/20 border border-red-500/20 backdrop-blur-md p-8 rounded-3xl w-full absolute top-0 left-0 shadow-[0_0_60px_rgba(239,68,68,0.1)]"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400 mb-6 drop-shadow-sm">
                                ¿Tu Negocio te Posee?
                            </h2>
                            <p className="text-lg text-red-100/80 leading-relaxed font-light">
                                Leads olvidados en WhatsApp, seguimiento manual en Excel y horas perdidas apagando fuegos.
                                <br /><span className="text-white font-medium mt-2 block">No tienes un negocio, tienes un autoempleo costoso.</span>
                            </p>
                            <div className="flex gap-6 mt-8 opacity-90">
                                <div className="flex flex-col items-center gap-2">
                                    <FileSpreadsheet className="w-8 h-8 text-red-500" />
                                    <span className="text-xs text-red-400">Caos Manual</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <PhoneMissed className="w-8 h-8 text-red-500" />
                                    <span className="text-xs text-red-400">Ventas Perdidas</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <Mail className="w-8 h-8 text-red-500" />
                                    <span className="text-xs text-red-400">Lento</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* SOLUTION STATE */}
                        <motion.div
                            style={{
                                opacity: useTransform(scrollYProgress, [0.45, 0.55, 1], [0, 1, 1]),
                                y: useTransform(scrollYProgress, [0.45, 0.55], [20, 0]),
                                scale: useTransform(scrollYProgress, [0.45, 0.55], [0.95, 1]),
                                filter: useTransform(scrollYProgress, [0.45, 0.55], ["blur(10px)", "blur(0px)"])
                            }}
                            className="bg-emerald-950/30 border border-emerald-500/30 backdrop-blur-md p-8 rounded-3xl shadow-[0_0_80px_rgba(16,185,129,0.2)] w-full absolute top-0 left-0"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 mb-6 drop-shadow-sm">
                                Libertad Escalable
                            </h2>
                            <p className="text-lg text-emerald-100/80 leading-relaxed font-light">
                                Implementamos Ecosistemas de Automatización que capturan, nutren y cierran ventas 24/7.
                                <br /><span className="text-white font-medium mt-2 block">Recupera 20h/semana y enfócate en crecer.</span>
                            </p>
                            <div className="flex gap-6 mt-8 opacity-100">
                                <div className="flex flex-col items-center gap-2">
                                    <Zap className="w-8 h-8 text-emerald-400 fill-emerald-400/20" />
                                    <span className="text-xs text-emerald-400">Instantáneo</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <Database className="w-8 h-8 text-emerald-400 fill-emerald-400/20" />
                                    <span className="text-xs text-emerald-400">Centralizado</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <MessageSquare className="w-8 h-8 text-emerald-400 fill-emerald-400/20" />
                                    <span className="text-xs text-emerald-400">Autónomo</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT: Visual Metaphor */}
                    <div className="relative h-[400px] w-full flex items-center justify-center perspective-1000">
                        {/* Chaos State */}
                        <motion.div
                            style={{
                                opacity: useTransform(scrollYProgress, [0, 0.35, 0.45], [1, 1, 0]),
                                rotate: useTransform(scrollYProgress, [0, 0.35, 0.45], [0, 20, 90]),
                                scale: useTransform(scrollYProgress, [0, 0.35, 0.45], [1, 0.8, 0.4]),
                                filter: useTransform(scrollYProgress, [0.35, 0.45], ["blur(0px)", "blur(20px)"])
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div className="relative w-80 h-80">
                                <div className="absolute inset-0 bg-red-500/10 rounded-full blur-[100px]" />
                                <div className="relative z-10 grid grid-cols-2 gap-4 animate-[spin_60s_linear_infinite] opacity-60">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-32 h-32 bg-red-900/40 rounded-3xl border border-red-500/20 flex items-center justify-center animate-pulse shadow-lg shadow-red-900/20">
                                            <Clock className="w-12 h-12 text-red-500" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Order State */}
                        <motion.div
                            style={{
                                opacity: useTransform(scrollYProgress, [0.45, 0.55, 1], [0, 1, 1]),
                                scale: useTransform(scrollYProgress, [0.45, 0.55], [0.8, 1]),
                                filter: useTransform(scrollYProgress, [0.45, 0.55], ["blur(10px)", "blur(0px)"])
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div className="relative w-[450px] h-[350px]">
                                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-[120px]" />
                                <div className="relative z-10 w-full h-full bg-black/80 backdrop-blur-2xl rounded-3xl border border-emerald-500/40 flex flex-col items-center justify-center p-8 shadow-[0_0_50px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/20">
                                    <div className="w-full flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_#22c55e]" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <div className="text-xs text-emerald-400 font-mono tracking-widest uppercase">Nexo System v2.0</div>
                                        </div>
                                    </div>
                                    <div className="space-y-6 w-full">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center gap-4">
                                                <div className="text-xs text-white/30 font-mono w-16 text-right">0{i}:00 PM</div>
                                                <div className="h-3 bg-emerald-950/50 rounded-full flex-1 overflow-hidden border border-emerald-500/10">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: '100%' }}
                                                        transition={{ duration: 1.5, delay: i * 0.4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                                                        className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                                                    />
                                                </div>
                                                <div className="text-xs text-emerald-400 font-bold">Done</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-8 flex items-center justify-between w-full px-4 pt-4 border-t border-white/5">
                                        <div className="text-sm text-white/50">Eficiencia</div>
                                        <div className="flex items-center gap-2">
                                            <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                            <span className="text-2xl text-white font-bold font-mono tracking-tighter">350%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

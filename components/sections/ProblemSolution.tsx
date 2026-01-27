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
    const bgColor = useTransform(scrollYProgress, [0, 0.4, 1],
        ['rgba(20, 0, 0, 1)', 'rgba(0, 10, 5, 1)', 'rgba(0, 20, 10, 1)']
    );
    const background = useMotionTemplate`linear-gradient(to bottom, ${bgColor}, #000)`;

    // Parallax elements
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <motion.section
            ref={containerRef}
            style={{ background }}
            className="relative min-h-[200vh] py-12"
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
                                opacity: useTransform(scrollYProgress, [0, 0.45, 0.55], [1, 1, 0]),
                                y: useTransform(scrollYProgress, [0, 0.45, 0.55], [0, 0, -20]),
                                scale: useTransform(scrollYProgress, [0, 0.45, 0.55], [1, 1, 0.95]),
                                filter: useTransform(scrollYProgress, [0.45, 0.55], ["blur(0px)", "blur(10px)"])
                            }}
                            className="bg-red-950/10 border border-red-500/10 backdrop-blur-md p-8 rounded-3xl w-full absolute top-0 left-0"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400 mb-6 drop-shadow-sm">
                                El Caos Operativo
                            </h2>
                            <p className="text-lg text-red-100/70 leading-relaxed font-light">
                                Excel infinito, leads perdidos en DMs, y tú haciendo tareas de $10/h.
                                <br /><span className="text-white font-medium">Estás perdiendo dinero cada minuto.</span>
                            </p>
                            <div className="flex gap-4 mt-8 opacity-70">
                                <FileSpreadsheet className="w-8 h-8 text-red-500" />
                                <PhoneMissed className="w-8 h-8 text-red-500" />
                                <Mail className="w-8 h-8 text-red-500" />
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
                            className="bg-emerald-950/10 border border-emerald-500/20 backdrop-blur-md p-8 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.1)] w-full absolute top-0 left-0"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 mb-6 drop-shadow-sm">
                                La Máquina Perfecta
                            </h2>
                            <p className="text-lg text-emerald-100/70 leading-relaxed font-light">
                                Automatización que trabaja mientras duermes. Leads cualificados, respuestas inmediatas.
                                <br /><span className="text-white font-medium">Escala sin contratar a más gente.</span>
                            </p>
                            <div className="flex gap-4 mt-8 opacity-80">
                                <Zap className="w-8 h-8 text-emerald-400" />
                                <Database className="w-8 h-8 text-emerald-400" />
                                <MessageSquare className="w-8 h-8 text-emerald-400" />
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT: Visual Metaphor */}
                    <div className="relative h-[400px] w-full flex items-center justify-center perspective-1000">
                        {/* Chaos State */}
                        <motion.div
                            style={{
                                opacity: useTransform(scrollYProgress, [0, 0.45, 0.55], [1, 1, 0]),
                                rotate: useTransform(scrollYProgress, [0, 0.45, 0.55], [0, 45, 90]),
                                scale: useTransform(scrollYProgress, [0, 0.45, 0.55], [1, 0.5, 0.4]),
                                filter: useTransform(scrollYProgress, [0.45, 0.55], ["blur(0px)", "blur(20px)"])
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div className="relative w-72 h-72">
                                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-[80px]" />
                                <div className="relative z-10 grid grid-cols-2 gap-4 animate-[spin_60s_linear_infinite]">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-28 h-28 bg-red-900/40 rounded-2xl border border-red-500/30 flex items-center justify-center animate-pulse shadow-lg shadow-red-900/20">
                                            <Clock className="w-10 h-10 text-red-500" />
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
                            <div className="relative w-96 h-96">
                                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-[100px]" />
                                <div className="relative z-10 w-full h-full bg-black/60 backdrop-blur-xl rounded-2xl border border-emerald-500/30 flex flex-col items-center justify-center p-8 shadow-2xl shadow-emerald-900/20 ring-1 ring-emerald-500/20">
                                    <div className="w-full flex justify-between items-center mb-8">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                        </div>
                                        <div className="text-xs text-emerald-400 font-mono tracking-widest">SYSTEM_ONLINE</div>
                                    </div>
                                    <div className="space-y-4 w-full">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="h-3 bg-emerald-950/50 rounded-full w-full overflow-hidden border border-emerald-500/10">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: '100%' }}
                                                    transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                                                    className="h-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-8 flex items-center gap-3 text-white">
                                        <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                                            <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                                        </div>
                                        <div>
                                            <span className="text-sm text-white/50 uppercase tracking-wider block">Efficiency</span>
                                            <span className="text-3xl font-bold font-mono">350%</span>
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

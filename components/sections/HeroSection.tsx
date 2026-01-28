'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { m, useScroll, useTransform, LazyMotion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const loadFeatures = () =>
    import('framer-motion').then((res) => res.domAnimation);

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <LazyMotion features={loadFeatures}>
            <section ref={containerRef} className="relative h-[120vh] overflow-hidden flex flex-col items-center pt-32">
                {/* Background Gradients (Glow) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10" />

                <m.div
                    style={{ opacity }}
                    className="container px-4 md:px-6 relative z-10 text-center mb-12"
                >
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white backdrop-blur-xl mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                            Growth Partner Certificado
                        </div>
                    </m.div>

                    <m.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6 max-w-5xl mx-auto"
                    >
                        Arquitectura Digital que <br />
                        <span className="text-white">Domina Mercados.</span>
                    </m.h1>

                    <m.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="mx-auto max-w-[700px] text-lg md:text-xl text-white/70 mb-8 leading-relaxed font-light"
                    >
                        Diseñamos ecosistemas de conversión y automatizamos tu crecimiento.
                        Dejarás de competir por precio para convertirte en la <span className="text-white font-medium">única opción lógica</span>.
                    </m.p>

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center gap-6"
                    >
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <m.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Iniciar Proyecto <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400 opacity-0 group-hover:opacity-10 transition-opacity" />
                            </m.button>

                            <m.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 rounded-full font-bold text-lg border border-white/10 hover:bg-white/5 backdrop-blur-sm transition-colors text-white"
                            >
                                Ver Inversión
                            </m.button>
                        </div>
                        <p className="text-xs text-white/40 font-light tracking-wide">
                            *Aceptamos solo 4 nuevos partners por trimestre para garantizar <span className="text-emerald-400 font-medium">calidad obsesiva.</span>
                        </p>
                    </m.div>
                </m.div>

                {/* Hero Image with Scroll Effect */}
                <m.div
                    style={{ y, scale }}
                    className="relative w-full max-w-5xl mx-auto px-4 perspective-2000"
                >
                    <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 shadow-2xl glass-panel group bg-[#0A0A0A]">
                        {/* Subtle Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

                        <Image
                            src="/images/stitch-hero-v2.png"
                            alt="Stitch Creative Studio Interface"
                            fill
                            className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                        />

                        {/* Floating Pulse Dot */}
                        <div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                            <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest">System Active: Scaling</span>
                        </div>
                    </div>

                    {/* Visual Depth Glow behind image */}
                    <div className="absolute -inset-4 bg-emerald-500/5 blur-[60px] -z-10 rounded-full opacity-50" />
                </m.div>

                {/* Scroll Indicator */}
                <m.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
                </m.div>
            </section>
        </LazyMotion>
    );
}

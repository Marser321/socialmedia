'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

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
        <section ref={containerRef} className="relative h-[120vh] overflow-hidden flex flex-col items-center pt-32">
            {/* Background Gradients (Glow) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10" />

            <motion.div
                style={{ opacity }}
                className="container px-4 md:px-6 relative z-10 text-center mb-12"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white backdrop-blur-xl mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                        Agencia Certificada en Automatización
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6 max-w-5xl mx-auto"
                >
                    Transformamos Tráfico en <br />
                    <span className="text-white">Dinero en el Banco.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mx-auto max-w-[700px] text-lg md:text-xl text-white/70 mb-8 leading-relaxed"
                >
                    No somos otra agencia de "diseño bonito". Somos ingenieros de conversión.
                    Creamos sistemas de venta automatizados y webs que venden por ti 24/7.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Button size="lg" className="h-12 px-8 text-base bg-white text-black hover:bg-white/90 rounded-full transition-all hover:scale-105">
                        Agendar Auditoría (15 min)
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 text-base border-white/20 hover:bg-white/10 rounded-full backdrop-blur-sm">
                        Ver Casos de Éxito
                        <Sparkles className="ml-2 h-4 w-4" />
                    </Button>
                </motion.div>
            </motion.div>

            {/* Hero Image with Scroll Effect */}
            <motion.div
                style={{ y, scale }}
                className="relative w-full max-w-6xl mx-auto px-4 perspective-1000"
            >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl glass-panel group">
                    {/* Overlay Gradient on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 z-10" />

                    <Image
                        src="/images/stitch-hero.png"
                        alt="Stitch Creative Studio Interface"
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    />

                    {/* Floating UI Elements (Parallax) */}
                    <motion.div
                        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
                        className="absolute bottom-8 left-8 z-20 bg-black/50 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center gap-4"
                    >
                        <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0 animate-pulse" />
                        <div>
                            <p className="text-xs text-white/60 uppercase tracking-widest">Revenue</p>
                            <p className="text-xl font-bold text-white">$24,500</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
            >
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
            </motion.div>
        </section>
    );
}

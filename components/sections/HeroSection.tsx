'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle } from 'lucide-react';

export function HeroSection() {
    return (
        <section className="relative min-h-[85vh] w-full overflow-hidden flex items-center justify-center py-20">
            {/* Background Video Placeholder or Animation */}
            <div className="absolute inset-0 z-0 bg-background">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/40 via-background to-background" />
                {/* Animated Grid Background */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

                {/* Floating Light Orbs */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-1/4 left-1/3 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px]"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-sm font-medium text-cyan-100">Agencia Digital de Nueva Generación</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
                        No solo te hacemos ver bien,{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-brand animate-pulse">
                            te ayudamos a operar mejor
                        </span>
                        .
                    </h1>

                    <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
                        Fusionamos diseño de alto impacto con automatización inteligente para escalar tu negocio sin esfuerzo.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                        <Button
                            size="lg"
                            className="w-full sm:w-auto bg-white text-black hover:bg-white/90 rounded-full h-12 px-8 text-base font-medium transition-transform hover:scale-105"
                        >
                            Descubre tu Solución
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full sm:w-auto h-12 px-8 rounded-full border-white/10 text-white hover:bg-white/5 backdrop-blur-sm"
                        >
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Ver Showreel
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0 animate-pulse" />
            </motion.div>
        </section>
    );
}

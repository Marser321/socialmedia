'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] -z-0" />

            <div className="max-w-xl w-full text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-[12rem] font-black leading-none tracking-tighter text-white/5 select-none">
                        404
                    </h1>
                </motion.div>

                <div className="space-y-6 -mt-20">
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                        Has entrado en <span className="text-violet-500">el Vacío</span>
                    </h2>
                    <p className="text-white/40 text-lg font-medium max-w-md mx-auto">
                        Esta ruta no existe en nuestro ecosistema. El servidor ha buscado en todas las capas pero no encontró nada.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <Button
                            asChild
                            variant="outline"
                            className="bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-full h-14 px-8"
                        >
                            <Link href="/">
                                <Home className="w-5 h-5 mr-2" />
                                Volver al Inicio
                            </Link>
                        </Button>
                        <Button
                            onClick={() => window.history.back()}
                            className="bg-white text-black hover:bg-white/90 rounded-full h-14 px-8 font-bold"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Regresar
                        </Button>
                    </div>
                </div>
            </div>

            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-soft-light" />
        </div>
    );
}

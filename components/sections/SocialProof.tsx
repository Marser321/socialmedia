'use client';

import { motion } from 'framer-motion';

const BRANDS = [
    'Stellar.ai', 'Lumina Digital', 'Vortex Media', 'Onyx Systems', 'Aura Creative', 'Prisma Collective', 'Neon Dynamics', 'Nova Labs'
];

export function SocialProof() {
    return (
        <section className="py-12 border-y border-white/5 bg-black/20 overflow-hidden relative group">
            <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />

            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="flex items-center gap-3 shrink-0">
                    <div className="h-px w-8 bg-emerald-500/50 hidden md:block" />
                    <p className="text-white/40 text-[10px] font-mono uppercase tracking-[0.3em] font-medium">
                        Empresas que confían en Nexo
                    </p>
                </div>

                <div className="flex-1 overflow-hidden">
                    <motion.div
                        className="flex gap-16 items-center min-w-max"
                        animate={{ x: [0, -1200] }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                        {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
                            <motion.span
                                key={i}
                                className="text-2xl font-bold text-white/10 uppercase tracking-tighter hover:text-emerald-400/50 transition-all duration-500 cursor-default flex items-center gap-2 group/brand"
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-white/5 group-hover/brand:bg-emerald-500/50 transition-colors" />
                                {brand}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Subtle bottom glow */}
            <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-3/4 h-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
        </section>
    );
}

'use client';

import { motion } from 'framer-motion';

const BRANDS = [
    'TechFlow', 'Nebula Inc.', 'Quantum', 'CyberSystems', 'AstroMarketing', 'FutureScale'
];

export function SocialProof() {
    return (
        <section className="py-10 border-y border-white/5 bg-black/40 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

            <div className="container mx-auto px-4 flex items-center justify-center">
                <p className="text-white/30 text-xs font-mono uppercase tracking-widest sm:mr-8 mb-4 sm:mb-0 text-center sm:text-left">
                    Confían en nosotros:
                </p>

                <div className="flex-1 overflow-hidden mask-linear-gradient">
                    <motion.div
                        className="flex gap-12 items-center min-w-max"
                        animate={{ x: [0, -1000] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    >
                        {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
                            <span key={i} className="text-xl font-bold text-white/20 uppercase tracking-tighter hover:text-white/40 transition-colors cursor-default">
                                {brand}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

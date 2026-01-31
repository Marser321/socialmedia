'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceInfographicCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    steps: {
        label: string;
        details: string;
    }[];
    pilar: 'tech' | 'media' | 'growth';
}

export function ServiceInfographicCard({ title, description, icon: Icon, steps, pilar }: ServiceInfographicCardProps) {
    const pilarColors = {
        tech: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
        media: 'text-violet-400 border-violet-500/20 bg-violet-500/5',
        growth: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
    };

    return (
        <div className={cn(
            "p-8 rounded-[2rem] border backdrop-blur-3xl transition-all duration-500 group relative overflow-hidden",
            pilarColors[pilar]
        )}>
            {/* Ambient Background Glow */}
            <div className={cn(
                "absolute -top-10 -right-10 w-40 h-40 blur-[80px] opacity-20 pointer-events-none transition-all duration-700 group-hover:scale-150",
                pilar === 'tech' ? 'bg-blue-600' : pilar === 'media' ? 'bg-violet-600' : 'bg-emerald-600'
            )} />

            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight uppercase">{title}</h3>
                </div>

                <p className="text-white/50 text-sm font-light leading-relaxed mb-10">
                    {description}
                </p>

                {/* Vertical Process Steps */}
                <div className="space-y-8 relative">
                    {/* Connecting Line */}
                    <div className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-white/20 via-white/10 to-transparent" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex gap-4 relative"
                        >
                            <div className="w-[23px] h-[23px] rounded-full bg-background border border-white/20 flex items-center justify-center shrink-0 mt-1 z-10 group-hover:border-current transition-colors">
                                <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-1">{step.label}</h4>
                                <p className="text-[11px] text-white/30 font-medium leading-tight">{step.details}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

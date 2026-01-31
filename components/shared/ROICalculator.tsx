'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, Zap, DollarSign, ArrowRight } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ROICalculator() {
    const [leads, setLeads] = React.useState(100);
    const [conversion, setConversion] = React.useState(2);
    const [ticket, setTicket] = React.useState(500);

    const currentRevenue = leads * (conversion / 100) * ticket;
    const projectedRevenue = leads * ((conversion * 2.5) / 100) * ticket; // Assuming 2.5x conversion lift with Nexo
    const lift = projectedRevenue - currentRevenue;

    return (
        <div className="w-full max-w-4xl mx-auto p-8 md:p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5 opacity-50" />

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                {/* Inputs */}
                <div className="space-y-10">
                    <div>
                        <h3 className="text-3xl font-black text-white mb-2 tracking-tight uppercase">
                            Calculadora <span className="text-blue-400">ROI</span>
                        </h3>
                        <p className="text-white/40 text-sm font-medium leading-relaxed">
                            Descubre el impacto financiero de automatizar tu ecosistema de ventas con Nexo.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* Leads */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <StatLabel icon={Users} label="Leads Mensuales" />
                                <span className="text-2xl font-black text-white">{leads}</span>
                            </div>
                            <Slider
                                value={[leads]}
                                onValueChange={(v) => setLeads(v[0])}
                                max={5000}
                                step={50}
                                className="py-4"
                            />
                        </div>

                        {/* Conversion */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <StatLabel icon={TrendingUp} label="Conversión Actual (%)" />
                                <span className="text-2xl font-black text-white">{conversion}%</span>
                            </div>
                            <Slider
                                value={[conversion]}
                                onValueChange={(v) => setConversion(v[0])}
                                max={20}
                                step={0.5}
                                className="py-4"
                            />
                        </div>

                        {/* Ticket */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <StatLabel icon={DollarSign} label="Ticket Promedio ($)" />
                                <span className="text-2xl font-black text-white">${ticket}</span>
                            </div>
                            <Slider
                                value={[ticket]}
                                onValueChange={(v) => setTicket(v[0])}
                                max={10000}
                                step={100}
                                className="py-4"
                            />
                        </div>
                    </div>
                </div>

                {/* Results Card */}
                <div className="relative">
                    <motion.div
                        layout
                        className="p-8 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-[0_20px_50px_-10px_rgba(37,99,235,0.5)] border border-white/20 relative overflow-hidden"
                    >
                        {/* Decorative Background Icons */}
                        <Zap className="absolute -top-6 -right-6 w-32 h-32 opacity-10 rotate-12" />

                        <div className="relative z-10 space-y-8">
                            <div>
                                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Impacto Potencial con Nexo</p>
                                <h4 className="text-5xl font-black tracking-tighter">
                                    +${lift.toLocaleString()}
                                    <span className="text-xl text-white/40 ml-2">/mes</span>
                                </h4>
                            </div>

                            <div className="h-px bg-white/10 w-full" />

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">Revenue Actual</p>
                                    <p className="text-xl font-bold opacity-50">${currentRevenue.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">Revenue Optimizado</p>
                                    <p className="text-xl font-bold">${projectedRevenue.toLocaleString()}</p>
                                </div>
                            </div>

                            <Button className="w-full h-14 bg-white text-blue-600 hover:bg-white/90 font-black text-lg rounded-2xl group/btn transition-all duration-300">
                                Desbloquear Crecimiento
                                <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </motion.div>

                    {/* Badge */}
                    <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-black shadow-xl rotate-3 border border-emerald-400/50">
                        2.5x LIFT IA ESTIMADO
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatLabel({ icon: Icon, label }: { icon: any, label: string }) {
    return (
        <div className="flex items-center gap-2 text-white/60">
            <Icon className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
        </div>
    );
}

'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';

export function ROICalculator() {
    const [hours, setHours] = React.useState([10]);
    const hourlyRate = 25; // Promedio estimado de costo por hora

    const weeklySavings = hours[0] * hourlyRate;
    const monthlySavings = weeklySavings * 4;
    const yearlySavings = monthlySavings * 12;
    const timeRecovered = hours[0] * 4; // Horas al mes

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-violet-900/5" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-12 items-center">

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Calculadora de ROI</h3>
                                <p className="text-white/60">¿Cuánto te cuesta NO automatizar?</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between text-white/80 font-medium">
                                    <span>Horas manuales / semana</span>
                                    <span className="text-cyan-400">{hours[0]} hrs</span>
                                </div>
                                <Slider
                                    value={hours}
                                    onValueChange={setHours}
                                    max={60}
                                    step={1}
                                    className="py-4"
                                />
                                <p className="text-xs text-white/40">Basado en un costo operativo promedio de ${hourlyRate}/hr</p>
                            </div>

                            <div className="pt-4">
                                <Button className="w-full bg-gradient-brand hover:opacity-90 text-white shadow-lg shadow-violet-500/25">
                                    <Wallet className="w-4 h-4 mr-2" />
                                    Empezar a Ahorrar
                                </Button>
                            </div>
                        </div>

                        <div className="bg-black/20 rounded-2xl p-8 border border-white/5 space-y-6">
                            <div className="text-center">
                                <p className="text-white/50 text-sm uppercase tracking-wider mb-1">Ahorro Mensual Estimado</p>
                                <motion.div
                                    key={monthlySavings}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-5xl font-bold text-white"
                                >
                                    ${monthlySavings.toLocaleString()}
                                </motion.div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                                <div className="text-center">
                                    <p className="text-white/50 text-xs uppercase mb-1">Anual</p>
                                    <p className="text-xl font-bold text-green-400">${yearlySavings.toLocaleString()}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-white/50 text-xs uppercase mb-1">Tiempo/Mes</p>
                                    <p className="text-xl font-bold text-cyan-400">{timeRecovered} hrs</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

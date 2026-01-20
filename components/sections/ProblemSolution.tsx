'use client';

import { motion } from 'framer-motion';
import { FileSpreadsheet, Mail, PhoneMissed, Clock, Zap, Database, MessageSquare } from 'lucide-react';

export function ProblemSolution() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <section className="py-12 md:py-16 bg-black/50 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-background to-background pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        El Costo del <span className="text-red-500 text-glow">Caos</span> vs El Valor del <span className="text-green-500 text-glow">Orden</span>
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        La diferencia entre sobrevivir y escalar está en tu stack tecnológico.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                    {/* Problem Column (The Old Way) */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="p-8 rounded-3xl bg-red-950/5 border border-red-900/10 backdrop-blur-sm group hover:bg-red-950/10 transition-colors duration-500"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20 group-hover:animate-pulse">
                                <Clock className="w-6 h-6 text-red-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Manual & Lento</h3>
                        </div>

                        <div className="space-y-4">
                            <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 0.98, opacity: 0.8 }}
                                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 cursor-not-allowed"
                            >
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#1D6F42]/20 text-[#1D6F42]">
                                    <FileSpreadsheet className="w-6 h-6 opacity-50" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">Excel Infinito</h4>
                                    <p className="text-xs text-red-400">Datos desactualizados</p>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 0.98, opacity: 0.8 }}
                                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 cursor-not-allowed"
                            >
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-yellow-500/20 text-yellow-500">
                                    <Mail className="w-6 h-6 animate-[wiggle_1s_ease-in-out_infinite]" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">Emails Manuales</h4>
                                    <p className="text-xs text-red-400">Olvidar seguimientos</p>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 0.98, opacity: 0.8 }}
                                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 cursor-not-allowed"
                            >
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-red-500/20 text-red-500">
                                    <PhoneMissed className="w-6 h-6 animate-pulse" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">Leads Perdidos</h4>
                                    <p className="text-xs text-red-400">Sin respuesta</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Solution Column (The Nexo Way) */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="p-8 rounded-3xl bg-green-950/5 border border-green-900/20 backdrop-blur-sm relative group hover:bg-green-950/10 transition-colors duration-500"
                    >
                        <div className="absolute inset-0 bg-green-500/5 blur-3xl -z-10 opacity-50" />

                        <div className="flex items-center gap-4 mb-8">
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                            >
                                <Zap className="w-6 h-6 text-green-500" />
                            </motion.div>
                            <h3 className="text-2xl font-bold text-white">Automático & Escalable</h3>
                        </div>

                        <div className="space-y-4">
                            <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, x: 10 }}
                                className="flex items-center gap-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 shadow-lg shadow-black/20 cursor-pointer group/item"
                            >
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-blue-500/20 text-blue-400">
                                    <motion.div
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <Database className="w-6 h-6" />
                                    </motion.div>
                                </div>
                                <div>
                                    <h4 className="text-white font-medium group-hover/item:text-blue-400 transition-colors">Airtable / CRM</h4>
                                    <p className="text-xs text-green-400">Base de datos centralizada</p>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, x: 10 }}
                                className="flex items-center gap-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 shadow-lg shadow-black/20 cursor-pointer group/item"
                            >
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-orange-500/20 text-orange-400">
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <Zap className="w-6 h-6" />
                                    </motion.div>
                                </div>
                                <div>
                                    <h4 className="text-white font-medium group-hover/item:text-orange-400 transition-colors">Zapier / Make</h4>
                                    <p className="text-xs text-green-400">Procesos autónomos</p>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, x: 10 }}
                                className="flex items-center gap-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 shadow-lg shadow-black/20 cursor-pointer group/item"
                            >
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-green-500/20 text-green-400">
                                    <motion.div
                                        animate={{ y: [0, -3, 0] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    >
                                        <MessageSquare className="w-6 h-6" />
                                    </motion.div>
                                </div>
                                <div>
                                    <h4 className="text-white font-medium group-hover/item:text-green-400 transition-colors">WhatsApp Bot</h4>
                                    <p className="text-xs text-green-400">Atención 24/7 (IA)</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

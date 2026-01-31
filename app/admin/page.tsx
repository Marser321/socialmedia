'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    ArrowUpRight,
    Zap,
    TrendingUp,
    Calendar,
    MessageSquare,
    CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stats = [
    { name: 'Leads Totales', value: '128', change: '+12%', icon: Users, color: 'text-blue-500' },
    { name: 'Conversión', value: '4.8%', change: '+0.5%', icon: Zap, color: 'text-violet-500' },
    { name: 'Servicios Activos', value: '18', change: 'Estable', icon: CheckCircle2, color: 'text-cyan-500' },
    { name: 'Revenue Est.', value: '$45.2k', change: '+18%', icon: TrendingUp, color: 'text-emerald-500' },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-black tracking-tighter text-white uppercase mb-2">
                    Panel de <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-500">Control</span>
                </h1>
                <p className="text-white/40 font-medium">Bienvenido, Ingeniero. Aquí tienes el estado actual de tu ecosistema.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="bg-white/5 border-white/5 hover:border-violet-500/30 transition-all group overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/10 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-violet-600/20 transition-colors" />
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-bold tracking-wider text-white/40 uppercase">
                                    {stat.name}
                                </CardTitle>
                                <stat.icon className={cn("w-4 h-4", stat.color)} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                                    <ArrowUpRight className="w-3 h-3" />
                                    {stat.change} este mes
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Leads */}
                <Card className="lg:col-span-2 bg-black border-white/5">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6">
                        <div className="space-y-1">
                            <CardTitle className="text-xl font-bold text-white">Últimos Leads</CardTitle>
                            <p className="text-xs text-white/40 font-medium">Clientes potenciales que buscan auditorías.</p>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-6">
                            {[1, 2, 3, 4].map((lead) => (
                                <div key={lead} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-violet-600/10 flex items-center justify-center text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-all">
                                            <MessageSquare className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white">Desarrollo E-commerce Pro</div>
                                            <div className="text-xs text-white/40">juan.perez@tienda.com • Hace 2 horas</div>
                                        </div>
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                                        Pendiente
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* System Activity */}
                <Card className="bg-black border-white/5 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent pointer-events-none" />
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-violet-500" />
                            Actividad System
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10">
                        {[
                            { t: 'Update en Servicios', d: 'Se modificó el precio de Landing Web', h: 'hace 5 min' },
                            { t: 'Nuevo Lead', d: 'Arquitectura IA solicitada por "EcoTech"', h: 'hace 20 min' },
                            { t: 'Backup Completado', d: 'Snapshot semanal de base de datos', h: 'hace 1h' },
                        ].map((item, i) => (
                            <div key={i} className="relative pl-6 border-l border-white/10 pb-2">
                                <div className="absolute left-0 top-0 -translate-x-1/2 w-2 h-2 bg-violet-600 rounded-full" />
                                <div className="text-xs font-bold text-white mb-0.5">{item.t}</div>
                                <div className="text-[11px] text-white/40 mb-1">{item.d}</div>
                                <div className="text-[9px] text-violet-400/60 uppercase font-bold tracking-widest">{item.h}</div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}

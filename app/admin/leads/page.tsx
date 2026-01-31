'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Mail,
    Phone,
    Building2,
    MessageSquare,
    Calendar,
    Search,
    Download
} from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';

export default function LeadsAdmin() {
    const [leads, setLeads] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    const fetchLeads = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setLeads(data);
        }
        setLoading(false);
    };

    React.useEffect(() => {
        fetchLeads();
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-white uppercase mb-2">
                        Dashboard de <span className="text-violet-500">Leads</span>
                    </h1>
                    <p className="text-white/40 font-medium">Gestiona las solicitudes de tus futuros clientes.</p>
                </div>

                <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold px-6">
                    <Download className="w-5 h-5 mr-2" />
                    Exportar CSV
                </Button>
            </div>

            <div className="bg-black/50 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl">
                <div className="p-6 border-b border-white/5">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <Input placeholder="Buscar leads por nombre, email o empresa..." className="bg-white/5 border-white/10 pl-10 rounded-full h-10 w-full" />
                    </div>
                </div>

                <Table>
                    <TableHeader className="bg-white/[0.02]">
                        <TableRow className="border-white/5 hover:bg-transparent uppercase tracking-widest text-[10px] font-black">
                            <TableHead className="text-white/60 pl-8">Cliente</TableHead>
                            <TableHead className="text-white/60">Contacto</TableHead>
                            <TableHead className="text-white/60">Interés</TableHead>
                            <TableHead className="text-white/60">Fecha</TableHead>
                            <TableHead className="text-right pr-8">Mensaje</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence mode="popLayout">
                            {leads.map((lead, i) => (
                                <motion.tr
                                    key={lead.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="border-white/5 hover:bg-white/[0.02] group"
                                >
                                    <TableCell className="pl-8">
                                        <div className="space-y-0.5">
                                            <div className="text-sm font-bold text-white uppercase tracking-tight">{lead.nombre}</div>
                                            <div className="flex items-center gap-1.5 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                                                <Building2 className="w-3 h-3 text-violet-500" />
                                                {lead.empresa || 'Independiente'}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs text-white/60">
                                                <Mail className="w-3 h-3" />
                                                {lead.email}
                                            </div>
                                            {lead.telefono && (
                                                <div className="flex items-center gap-2 text-xs text-white/60">
                                                    <Phone className="w-3 h-3" />
                                                    {lead.telefono}
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {lead.servicios_interes?.map((s: string) => (
                                                <span key={s} className="px-1.5 py-0.5 rounded-md bg-violet-600/10 text-violet-400 text-[8px] font-black uppercase tracking-widest border border-violet-500/20">
                                                    {s}
                                                </span>
                                            ))}
                                            {lead.plan_seleccionado && (
                                                <span className="px-1.5 py-0.5 rounded-md bg-blue-600/10 text-blue-400 text-[8px] font-black uppercase tracking-widest border border-blue-500/20">
                                                    {lead.plan_seleccionado}
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-tighter">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {new Date(lead.created_at).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-8">
                                        <Button variant="ghost" size="icon" className="text-white/20 hover:text-white transition-all">
                                            <MessageSquare className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </TableBody>
                </Table>
                {leads.length === 0 && !loading && (
                    <div className="py-20 text-center">
                        <Users className="w-12 h-12 text-white/10 mx-auto mb-4" />
                        <p className="text-white/40 font-medium tracking-tight">Aún no has recibido leads. ¡Sigue moviendo el ecosistema!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

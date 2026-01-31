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
    Download,
    Filter,
    CheckCircle2,
    Clock,
    XCircle,
    Eye,
    TrendingUp,
    Inbox
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
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

export default function LeadsAdmin() {
    const [leads, setLeads] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [statusFilter, setStatusFilter] = React.useState('all');
    const [selectedLead, setSelectedLead] = React.useState<any | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

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

    const updateLeadStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase
            .from('leads')
            .update({ status: newStatus })
            .eq('id', id);

        if (!error) {
            fetchLeads();
            if (selectedLead?.id === id) {
                setSelectedLead({ ...selectedLead, status: newStatus });
            }
        }
    };

    const filteredLeads = leads.filter(lead => {
        const matchesSearch =
            lead.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (lead.empresa || '').toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: leads.length,
        new: leads.filter(l => l.status === 'nuevo' || !l.status).length,
        inProgress: leads.filter(l => l.status === 'en_proceso').length,
        closed: leads.filter(l => l.status === 'cerrado').length
    };

    const exportToCSV = () => {
        const headers = ['Nombre', 'Email', 'Teléfono', 'Empresa', 'Interés', 'Plan', 'Fecha', 'Status'];
        const rows = filteredLeads.map(l => [
            l.nombre,
            l.email,
            l.telefono || '-',
            l.empresa || 'Independiente',
            (l.servicios_interes || []).join('; '),
            l.plan_seleccionado || '-',
            new Date(l.created_at).toLocaleDateString(),
            l.status || 'nuevo'
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `nexo_leads_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-white uppercase mb-2">
                        Portal de <span className="text-violet-500">Conversión</span>
                    </h1>
                    <p className="text-white/40 font-medium tracking-tight">Arquitectura de gestión para tus futuros activos (Leads).</p>
                </div>

                <Button
                    onClick={exportToCSV}
                    className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold px-6 h-12 transition-all active:scale-95"
                >
                    <Download className="w-5 h-5 mr-2" />
                    Exportar Inteligencia (.CSV)
                </Button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Leads', val: stats.total, icon: Inbox, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                    { label: 'Sin Atender', val: stats.new, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10' },
                    { label: 'En Negociación', val: stats.inProgress, icon: TrendingUp, color: 'text-violet-400', bg: 'bg-violet-400/10' },
                    { label: 'Cerrados', val: stats.closed, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
                ].map((stat) => (
                    <motion.div
                        key={stat.label}
                        whileHover={{ y: -5 }}
                        className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4 group transition-all hover:bg-white/[0.07]"
                    >
                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", stat.bg, stat.color)}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{stat.label}</div>
                            <div className="text-2xl font-black text-white">{stat.val}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="bg-black/50 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl">
                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row gap-4 justify-between bg-white/[0.02]">
                    <div className="relative flex-1 max-w-xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <Input
                            placeholder="Buscar por nombre, email, empresa..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white/5 border-white/10 pl-12 rounded-2xl h-12 w-full text-white placeholder:text-white/20 focus:border-violet-500/50"
                        />
                    </div>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full md:w-[180px] bg-white/5 border-white/10 h-12 rounded-2xl text-white">
                            <Filter className="w-4 h-4 mr-2 text-white/40" />
                            <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0A0A0A] border-white/10 text-white">
                            <SelectItem value="all">Todos los estados</SelectItem>
                            <SelectItem value="nuevo">Nuevos</SelectItem>
                            <SelectItem value="en_proceso">En Proceso</SelectItem>
                            <SelectItem value="cerrado">Cerrados</SelectItem>
                            <SelectItem value="descartado">Descartados</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-white/[0.02]">
                            <TableRow className="border-white/5 hover:bg-transparent uppercase tracking-widest text-[10px] font-black">
                                <TableHead className="text-white/60 pl-8 h-12">Lead / Empresa</TableHead>
                                <TableHead className="text-white/60">Canal de Contacto</TableHead>
                                <TableHead className="text-white/60">Interés / Plan</TableHead>
                                <TableHead className="text-right pr-8">Status / Acción</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence mode="popLayout">
                                {filteredLeads.map((lead, i) => (
                                    <motion.tr
                                        key={lead.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2, delay: i * 0.03 }}
                                        className="border-white/5 hover:bg-white/[0.02] group cursor-pointer transition-colors"
                                        onClick={() => {
                                            setSelectedLead(lead);
                                            setIsDetailsOpen(true);
                                        }}
                                    >
                                        <TableCell className="pl-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-violet-600/20 flex items-center justify-center text-violet-400 font-black">
                                                    {lead.nombre.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="space-y-0.5">
                                                    <div className="text-sm font-bold text-white uppercase tracking-tight group-hover:text-violet-400 transition-colors uppercase">{lead.nombre}</div>
                                                    <div className="flex items-center gap-1.5 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                                                        <Building2 className="w-3 h-3 text-white/20" />
                                                        {lead.empresa || 'Independiente'}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-[11px] text-white/60 font-medium">
                                                    <Mail className="w-3.5 h-3.5 text-violet-500/50" />
                                                    {lead.email}
                                                </div>
                                                {lead.telefono && (
                                                    <div className="flex items-center gap-2 text-[11px] text-white/60 font-medium">
                                                        <Phone className="w-3.5 h-3.5 text-cyan-500/50" />
                                                        {lead.telefono}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1.5">
                                                {lead.servicios_interes?.map((s: string) => (
                                                    <span key={s} className="px-2 py-0.5 rounded-full bg-white/5 text-white/60 text-[8px] font-black uppercase tracking-[0.1em] border border-white/10">
                                                        {s}
                                                    </span>
                                                ))}
                                                {lead.plan_seleccionado && (
                                                    <span key={lead.plan_seleccionado} className="px-2 py-0.5 rounded-full bg-violet-600/20 text-violet-400 text-[8px] font-black uppercase tracking-[0.1em] border border-violet-500/30">
                                                        {lead.plan_seleccionado}
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-8">
                                            <div className="flex items-center justify-end gap-3">
                                                <div className={cn(
                                                    "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                                    lead.status === 'nuevo' || !lead.status ? "bg-amber-400/10 text-amber-400 border-amber-400/20" :
                                                        lead.status === 'en_proceso' ? "bg-violet-400/10 text-violet-400 border-violet-400/20" :
                                                            lead.status === 'cerrado' ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20" :
                                                                "bg-white/5 text-white/30 border-white/10"
                                                )}>
                                                    {lead.status || 'nuevo'}
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="w-8 h-8 rounded-full bg-white/5 text-white/40 hover:text-white"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </div>

                {filteredLeads.length === 0 && (
                    <div className="py-32 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/[0.02] border border-white/5 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
                        >
                            <Inbox className="w-10 h-10 text-white/10" />
                        </motion.div>
                        <h3 className="text-white font-bold text-lg mb-1">Sin coincidencias astronómicas</h3>
                        <p className="text-white/40 text-sm max-w-xs mx-auto">Prueba ajustando tus parámetros de búsqueda o filtros de estado.</p>
                    </div>
                )}
            </div>

            {/* Lead Details Modal */}
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="bg-[#0A0A0A] border-white/10 text-white max-w-2xl backdrop-blur-3xl p-0 overflow-hidden shadow-[0_0_100px_rgba(139,92,246,0.15)]">
                    {selectedLead && (
                        <>
                            <div className="relative h-32 w-full bg-gradient-to-br from-violet-600/20 to-transparent p-8 flex items-end">
                                <div className="absolute top-4 right-4 text-[10px] font-black uppercase opacity-20 tracking-[0.3em]">Lead ID: {selectedLead.id}</div>
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center text-3xl font-black shadow-2xl">
                                        {selectedLead.nombre.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black uppercase tracking-tighter text-white">{selectedLead.nombre}</h2>
                                        <p className="text-violet-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                            <Building2 className="w-3.5 h-3.5" />
                                            {selectedLead.empresa || 'Entidad Independiente'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 space-y-8">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-white/30">Email de Contacto</Label>
                                            <div className="flex items-center gap-3 text-white font-bold">
                                                <Mail className="w-4 h-4 text-violet-500" />
                                                {selectedLead.email}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-white/30">Teléfono / WhatsApp</Label>
                                            <div className="flex items-center gap-3 text-white font-bold">
                                                <Phone className="w-4 h-4 text-cyan-500" />
                                                {selectedLead.telefono || 'No proporcionado'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-white/30">Fecha de Captación</Label>
                                            <div className="flex items-center gap-3 text-white font-bold">
                                                <Calendar className="w-4 h-4 text-white/40" />
                                                {new Date(selectedLead.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-white/30">Estado del Pipeline</Label>
                                            <Select value={selectedLead.status || 'nuevo'} onValueChange={(val) => updateLeadStatus(selectedLead.id, val)}>
                                                <SelectTrigger className="w-full bg-white/5 border-white/10 rounded-xl font-bold">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#0A0A0A] border-white/10 text-white">
                                                    <SelectItem value="nuevo">Nuevo Prospecto</SelectItem>
                                                    <SelectItem value="en_proceso">En Negociación</SelectItem>
                                                    <SelectItem value="cerrado">Ganado / Cerrado</SelectItem>
                                                    <SelectItem value="descartado">Perdido / Descartado</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/30">Alcance del Proyecto / Intereses</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedLead.servicios_interes?.map((s: string) => (
                                            <span key={s} className="px-3 py-1.5 rounded-xl bg-violet-600/10 text-violet-400 text-[10px] font-black uppercase tracking-widest border border-violet-500/20">
                                                {s}
                                            </span>
                                        ))}
                                        {selectedLead.plan_seleccionado && (
                                            <span className="px-3 py-1.5 rounded-xl bg-cyan-600/10 text-cyan-400 text-[10px] font-black uppercase tracking-widest border border-cyan-500/20">
                                                {selectedLead.plan_seleccionado}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <MessageSquare className="w-12 h-12" />
                                    </div>
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-4">Brief / Mensaje del Cliente</Label>
                                    <p className="text-white/80 text-sm leading-relaxed italic font-medium">
                                        "{selectedLead.mensaje || 'Sin mensaje adicional.'}"
                                    </p>
                                </div>
                            </div>

                            <DialogFooter className="bg-white/[0.02] p-6 border-t border-white/5">
                                <Button
                                    className="w-full bg-white text-black hover:bg-white/90 rounded-xl font-black uppercase tracking-widest h-12"
                                    onClick={() => {
                                        const msg = encodeURIComponent(`Hola ${selectedLead.nombre}, te contacto desde Nexo DigitalAgency sobre tu solicitud de ${selectedLead.servicios_interes?.[0] || 'nuestros servicios'}.`);
                                        window.open(`https://wa.me/${selectedLead.telefono?.replace(/\D/g, '')}?text=${msg}`, '_blank');
                                    }}
                                >
                                    <Phone className="w-5 h-5 mr-3" />
                                    Acción Inmediata (WhatsApp)
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

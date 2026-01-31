'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Pencil,
    Trash2,
    MoreHorizontal,
    Search,
    Filter,
    Layers,
    ExternalLink
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import { Pilar, Servicio } from '@/types';
import { cn } from '@/lib/utils';

export default function ServicesAdmin() {
    const [services, setServices] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [editingService, setEditingService] = React.useState<any | null>(null);

    const fetchServices = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('orden', { ascending: true });

        if (!error && data) {
            setServices(data);
        }
        setLoading(false);
    };

    React.useEffect(() => {
        fetchServices();
    }, []);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Helper to parse comma separated strings into arrays
        const parseArray = (val: string) => val ? val.split(',').map(s => s.trim()).filter(s => s !== '') : [];

        const serviceData = {
            nombre: formData.get('nombre'),
            descripcion: formData.get('descripcion'),
            descripcion_corta: formData.get('descripcion_corta'),
            pilar: formData.get('pilar'),
            icono: formData.get('icono'),
            precio_base: formData.get('precio_base') ? parseFloat(formData.get('precio_base') as string) : null,
            tipo_pago: formData.get('tipo_pago'),
            caracteristicas: parseArray(formData.get('caracteristicas') as string),
            tecnologias: parseArray(formData.get('tecnologias') as string),
            orden: parseInt(formData.get('orden') as string || '0'),
            updated_at: new Date().toISOString()
        };

        console.log('🚀 Intentando guardar servicio:', serviceData);

        let error;
        try {
            if (editingService) {
                const { error: err } = await supabase
                    .from('services')
                    .update(serviceData)
                    .eq('id', editingService.id);
                error = err;
            } else {
                const { error: err } = await supabase
                    .from('services')
                    .insert([serviceData]);
                error = err;
            }

            if (error) {
                console.error('❌ Error de Supabase:', error);
                alert(`Error al guardar: ${error.message}\nVerifica los permisos RLS o el formato de los datos.`);
            } else {
                console.log('✅ Servicio guardado con éxito');
                setIsDialogOpen(false);
                setEditingService(null);
                fetchServices();
            }
        } catch (err: any) {
            console.error('💥 Error inesperado:', err);
            alert(`Error inesperado: ${err.message}`);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este servicio?')) return;

        try {
            const { error } = await supabase
                .from('services')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('❌ Error al eliminar:', error);
                alert(`No se pudo eliminar: ${error.message}`);
            } else {
                fetchServices();
            }
        } catch (err: any) {
            alert(`Error crítico al eliminar: ${err.message}`);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-white uppercase mb-2">
                        Catálogo de <span className="text-violet-500">Servicios</span>
                    </h1>
                    <p className="text-white/40 font-medium">Gestiona tu oferta de arquitectura digital y ecosistemas.</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            className="bg-white text-black hover:bg-white/90 rounded-xl font-bold px-6 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:scale-105 active:scale-95"
                            onClick={() => setEditingService(null)}
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Añadir Servicio
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#0A0A0A] border-white/10 text-white max-w-2xl backdrop-blur-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black uppercase tracking-tight">
                                {editingService ? 'Editar' : 'Nuevo'} <span className="text-violet-500">Servicio</span>
                            </DialogTitle>
                            <DialogDescription className="text-white/40 font-medium">
                                Completa los campos para actualizar la oferta pública de Nexo.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSave} className="space-y-6 pt-4">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Nombre del Servicio</Label>
                                    <Input name="nombre" defaultValue={editingService?.nombre} className="bg-white/5 border-white/10 rounded-xl focus:border-violet-500/50" required />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Pilar</Label>
                                    <Select name="pilar" defaultValue={editingService?.pilar || 'tech'}>
                                        <SelectTrigger className="bg-white/5 border-white/10 rounded-xl">
                                            <SelectValue placeholder="Seleccionar pilar" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#0A0A0A] border-white/10 text-white">
                                            <SelectItem value="tech">Technology</SelectItem>
                                            <SelectItem value="media">Media & Content</SelectItem>
                                            <SelectItem value="growth">Growth & SEO</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Descripción Larga</Label>
                                    <Input name="descripcion" defaultValue={editingService?.descripcion} className="bg-white/5 border-white/10 rounded-xl focus:border-violet-500/50" required />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Descripción Corta (Cards)</Label>
                                    <Input name="descripcion_corta" defaultValue={editingService?.descripcion_corta} className="bg-white/5 border-white/10 rounded-xl focus:border-violet-500/50" required />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Tipo de Pago</Label>
                                    <Select name="tipo_pago" defaultValue={editingService?.tipo_pago || 'mensual'}>
                                        <SelectTrigger className="bg-white/5 border-white/10 rounded-xl">
                                            <SelectValue placeholder="Tipo de pago" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#0A0A0A] border-white/10 text-white">
                                            <SelectItem value="mensual">Mensual (Suscripción)</SelectItem>
                                            <SelectItem value="unico">Pago Único (Proyecto)</SelectItem>
                                            <SelectItem value="ambos">Ambos / Híbrido</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Características (Separadas por coma)</Label>
                                    <Input name="caracteristicas" defaultValue={editingService?.caracteristicas?.join(', ')} placeholder="Ej: Auditoría Pro, Soporte 24/7, Dashboard IA" className="bg-white/5 border-white/10 rounded-xl focus:border-violet-500/50" />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Tecnologías (Separadas por coma)</Label>
                                    <Input name="tecnologias" defaultValue={editingService?.tecnologias?.join(', ')} placeholder="Ej: Next.js, Supabase, n8n, OpenAI" className="bg-white/5 border-white/10 rounded-xl focus:border-violet-500/50" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Icono (Lucide name)</Label>
                                    <Input name="icono" defaultValue={editingService?.icono || 'Monitor'} className="bg-white/5 border-white/10 rounded-xl focus:border-violet-500/50" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Precio Base ($)</Label>
                                    <Input name="precio_base" type="number" defaultValue={editingService?.precio_base} className="bg-white/5 border-white/10 rounded-xl focus:border-violet-500/50" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Orden Visual</Label>
                                    <Input name="orden" type="number" defaultValue={editingService?.orden || 0} className="bg-white/5 border-white/10 rounded-xl focus:border-violet-500/50" />
                                </div>
                            </div>
                            <DialogFooter className="bg-white/[0.02] -mx-6 -mb-6 p-6 border-t border-white/5 mt-8">
                                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="text-white/40 hover:text-white">Cancelar</Button>
                                <Button type="submit" className="bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold px-8 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                                    {editingService ? 'Actualizar Servicio' : 'Crear Arquitectura de Servicio'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Table */}
            <div className="bg-black/50 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <Input placeholder="Filtrar servicios..." className="bg-white/5 border-white/10 pl-10 rounded-full h-10" />
                    </div>
                    <Button variant="ghost" size="sm" className="text-white/40 hover:text-white">
                        <Filter className="w-4 h-4 mr-2" />
                        Filtros
                    </Button>
                </div>

                <div className="p-0">
                    <Table>
                        <TableHeader className="bg-white/[0.02]">
                            <TableRow className="border-white/5 hover:bg-transparent uppercase tracking-widest text-[10px] font-black">
                                <TableHead className="text-white/60 pl-8">Icono</TableHead>
                                <TableHead className="text-white/60">Servicio</TableHead>
                                <TableHead className="text-white/60">Pilar</TableHead>
                                <TableHead className="text-white/60">Precio Basé</TableHead>
                                <TableHead className="text-white/60">Orden</TableHead>
                                <TableHead className="text-right pr-8">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence mode="popLayout">
                                {services.map((service, i) => (
                                    <motion.tr
                                        key={service.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="border-white/5 hover:bg-white/[0.02] group"
                                    >
                                        <TableCell className="pl-8">
                                            <div className="w-10 h-10 rounded-xl bg-violet-600/10 flex items-center justify-center text-violet-500">
                                                <Layers className="w-5 h-5" />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-0.5">
                                                <div className="text-sm font-bold text-white uppercase tracking-tight">{service.nombre}</div>
                                                <div className="text-[11px] text-white/40 font-medium truncate max-w-[200px]">{service.descripcion_corta}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className={cn(
                                                "px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                                service.pilar === 'tech' ? "bg-blue-500/10 text-blue-400" :
                                                    service.pilar === 'media' ? "bg-violet-500/10 text-violet-400" :
                                                        "bg-emerald-500/10 text-emerald-400"
                                            )}>
                                                {service.pilar}
                                            </span>
                                        </TableCell>
                                        <TableCell className="font-mono text-xs font-bold text-white/80">
                                            {service.precio_base ? `$${service.precio_base}` : '—'}
                                        </TableCell>
                                        <TableCell className="text-xs font-bold text-white/40">{service.orden}</TableCell>
                                        <TableCell className="text-right pr-8">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="w-8 h-8 text-white/20 hover:text-white hover:bg-white/10 transition-all"
                                                    onClick={() => {
                                                        setEditingService(service);
                                                        setIsDialogOpen(true);
                                                    }}
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="w-8 h-8 text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-all"
                                                    onClick={() => handleDelete(service.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                    {services.length === 0 && !loading && (
                        <div className="py-20 text-center">
                            <div className="inline-flex p-4 rounded-3xl bg-white/5 text-white/20 mb-4">
                                <Layers className="w-12 h-12" />
                            </div>
                            <p className="text-white/40 font-medium tracking-tight">No se encontraron servicios en la base de datos.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

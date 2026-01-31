'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Pencil,
    Trash2,
    Search,
    Briefcase,
    ExternalLink,
    Star
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
import { cn } from '@/lib/utils';

export default function PortfolioAdmin() {
    const [projects, setProjects] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [editingProject, setEditingProject] = React.useState<any | null>(null);

    const fetchProjects = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('orden', { ascending: true });

        if (!error && data) {
            setProjects(data);
        }
        setLoading(false);
    };

    React.useEffect(() => {
        fetchProjects();
    }, []);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const projectData = {
            title: formData.get('title'),
            description: formData.get('description'),
            category: formData.get('category'),
            image_url: formData.get('image_url'),
            external_link: formData.get('external_link'),
            featured: formData.get('featured') === 'true',
            orden: parseInt(formData.get('orden') as string || '0'),
        };

        let error;
        if (editingProject) {
            const { error: err } = await supabase
                .from('projects')
                .update(projectData)
                .eq('id', editingProject.id);
            error = err;
        } else {
            const { error: err } = await supabase
                .from('projects')
                .insert([projectData]);
            error = err;
        }

        if (!error) {
            setIsDialogOpen(false);
            setEditingProject(null);
            fetchProjects();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este proyecto?')) return;
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (!error) {
            fetchProjects();
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-white uppercase mb-2">
                        Gestión de <span className="text-violet-500">Portfolio</span>
                    </h1>
                    <p className="text-white/40 font-medium">Muestra tus mejores casos de éxito al mundo.</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            className="bg-white text-black hover:bg-white/90 rounded-xl font-bold px-6 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:scale-105 active:scale-95"
                            onClick={() => setEditingProject(null)}
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Nuevo Proyecto
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#0A0A0A] border-white/10 text-white max-w-2xl backdrop-blur-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black uppercase tracking-tight">
                                {editingProject ? 'Editar' : 'Nuevo'} <span className="text-violet-500">Proyecto</span>
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSave} className="space-y-6 pt-4">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2 space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Título</Label>
                                    <Input name="title" defaultValue={editingProject?.title} className="bg-white/5 border-white/10 rounded-xl" required />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Categoría</Label>
                                    <Select name="category" defaultValue={editingProject?.category || 'web'}>
                                        <SelectTrigger className="bg-white/5 border-white/10 rounded-xl">
                                            <SelectValue placeholder="Seleccionar categoría" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#0A0A0A] border-white/10 text-white">
                                            <SelectItem value="web">Web Development</SelectItem>
                                            <SelectItem value="app">Mobile App</SelectItem>
                                            <SelectItem value="automatizacion">AI Automation</SelectItem>
                                            <SelectItem value="video">Production</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Destacado</Label>
                                    <Select name="featured" defaultValue={editingProject?.featured?.toString() || 'false'}>
                                        <SelectTrigger className="bg-white/5 border-white/10 rounded-xl">
                                            <SelectValue placeholder="¿Destacar?" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#0A0A0A] border-white/10 text-white">
                                            <SelectItem value="true">Sí (Featured)</SelectItem>
                                            <SelectItem value="false">No</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Descripción</Label>
                                    <Input name="description" defaultValue={editingProject?.description} className="bg-white/5 border-white/10 rounded-xl" />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">URL Imagen</Label>
                                    <Input name="image_url" defaultValue={editingProject?.image_url} className="bg-white/5 border-white/10 rounded-xl" placeholder="https://..." />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Link Externo</Label>
                                    <Input name="external_link" defaultValue={editingProject?.external_link} className="bg-white/5 border-white/10 rounded-xl" placeholder="https://..." />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Orden</Label>
                                    <Input name="orden" type="number" defaultValue={editingProject?.orden || 0} className="bg-white/5 border-white/10 rounded-xl" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold px-8 w-full">Guardar Caso de Éxito</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-black/50 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl">
                <Table>
                    <TableHeader className="bg-white/[0.02]">
                        <TableRow className="border-white/5 hover:bg-transparent uppercase tracking-widest text-[10px] font-black">
                            <TableHead className="text-white/60 pl-8 w-[100px]">Preview</TableHead>
                            <TableHead className="text-white/60">Proyecto</TableHead>
                            <TableHead className="text-white/60">Categoría</TableHead>
                            <TableHead className="text-white/60">Estado</TableHead>
                            <TableHead className="text-right pr-8">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence mode="popLayout">
                            {projects.map((project, i) => (
                                <motion.tr
                                    key={project.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="border-white/5 hover:bg-white/[0.02] group"
                                >
                                    <TableCell className="pl-8">
                                        <div className="w-12 h-12 rounded-lg bg-white/5 overflow-hidden border border-white/10">
                                            {project.image_url ? (
                                                <img src={project.image_url} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-white/20">
                                                    <Briefcase className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-0.5">
                                            <div className="text-sm font-bold text-white uppercase tracking-tight flex items-center gap-2">
                                                {project.title}
                                                {project.featured && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                                            </div>
                                            <div className="text-[11px] text-white/40 font-medium line-clamp-1">{project.description}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/40 text-[9px] font-black uppercase tracking-widest border border-white/5">
                                            {project.category}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className={cn("w-1.5 h-1.5 rounded-full", project.featured ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-white/20")} />
                                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">
                                                {project.featured ? 'Featured' : 'Draft'}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-8">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="w-8 h-8 text-white/20 hover:text-white"
                                                onClick={() => {
                                                    setEditingProject(project);
                                                    setIsDialogOpen(true);
                                                }}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="w-8 h-8 text-white/20 hover:text-red-400"
                                                onClick={() => handleDelete(project.id)}
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
            </div>
        </div>
    );
}

'use client';

// @Jules: Consider implementing a drag-and-drop reordering system for pricing plans
// to replace the manual 'orden' input in the next iteration.

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Pencil,
    Trash2,
    Search,
    Filter,
    DollarSign,
    CheckCircle2,
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
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

export default function PricingAdmin() {
    const [plans, setPlans] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [editingPlan, setEditingPlan] = React.useState<any | null>(null);

    // @Jules: Ensure form validation for prices (regex) is added here once
    // the business logic for multi-currency is defined.

    const fetchPlans = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('pricing_plans')
            .select('*')
            .order('orden', { ascending: true });

        if (!error && data) {
            setPlans(data);
        }
        setLoading(false);
    };

    React.useEffect(() => {
        fetchPlans();
    }, []);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const planData = {
            name: formData.get('name'),
            description: formData.get('description'),
            monthly_price: formData.get('monthly_price'),
            one_time_price: formData.get('one_time_price'),
            monthly_label: formData.get('monthly_label'),
            one_time_label: formData.get('one_time_label'),
            highlight: formData.get('highlight') === 'on',
            orden: parseInt(formData.get('orden') as string || '0'),
            features: (formData.get('features') as string).split(',').map(f => f.trim()).filter(f => f !== '')
        };

        let error;
        if (editingPlan) {
            const { error: err } = await supabase
                .from('pricing_plans')
                .update(planData)
                .eq('id', editingPlan.id);
            error = err;
        } else {
            const { error: err } = await supabase
                .from('pricing_plans')
                .insert([planData]);
            error = err;
        }

        if (!error) {
            setIsDialogOpen(false);
            setEditingPlan(null);
            fetchPlans();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este plan de precios?')) return;
        const { error } = await supabase
            .from('pricing_plans')
            .delete()
            .eq('id', id);

        if (!error) {
            fetchPlans();
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-white uppercase mb-2">
                        Estructura de <span className="text-violet-500">Precios</span>
                    </h1>
                    <p className="text-white/40 font-medium">Gestiona los planes y modalidades de inversión de Nexo.</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            className="bg-white text-black hover:bg-white/90 rounded-xl font-bold px-6 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                            onClick={() => setEditingPlan(null)}
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Nuevo Plan
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#0A0A0A] border-white/10 text-white max-w-2xl backdrop-blur-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black uppercase tracking-tight">
                                {editingPlan ? 'Editar' : 'Nuevo'} <span className="text-violet-500">Plan de Precios</span>
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSave} className="space-y-6 pt-4">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2 space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Nombre del Plan</Label>
                                    <Input name="name" defaultValue={editingPlan?.name} className="bg-white/5 border-white/10 rounded-xl" required />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Descripción</Label>
                                    <Input name="description" defaultValue={editingPlan?.description} className="bg-white/5 border-white/10 rounded-xl" required />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Precio Mensual ($)</Label>
                                    <Input name="monthly_price" defaultValue={editingPlan?.monthly_price} className="bg-white/5 border-white/10 rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Etiqueta Mensual</Label>
                                    <Input name="monthly_label" defaultValue={editingPlan?.monthly_label} className="bg-white/5 border-white/10 rounded-xl" placeholder="Ej: Mantenimiento + SEO" />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Precio Pago Único ($)</Label>
                                    <Input name="one_time_price" defaultValue={editingPlan?.one_time_price} className="bg-white/5 border-white/10 rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Etiqueta Único</Label>
                                    <Input name="one_time_label" defaultValue={editingPlan?.one_time_label} className="bg-white/5 border-white/10 rounded-xl" placeholder="Ej: Desarrollo Completo" />
                                </div>

                                <div className="col-span-2 space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Características (Separadas por coma)</Label>
                                    <Input name="features" defaultValue={editingPlan?.features?.join(', ')} className="bg-white/5 border-white/10 rounded-xl" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Destacado</Label>
                                    <Switch name="highlight" defaultChecked={editingPlan?.highlight} className="data-[state=checked]:bg-violet-600" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Orden</Label>
                                    <Input name="orden" type="number" defaultValue={editingPlan?.orden || 0} className="bg-white/5 border-white/10 rounded-xl" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold px-8 w-full">Guardar Plan</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-black/50 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl">
                <Table>
                    <TableHeader className="bg-white/[0.02]">
                        <TableRow className="border-white/5 hover:bg-transparent uppercase tracking-widest text-[10px] font-black">
                            <TableHead className="text-white/60 pl-8">Plan</TableHead>
                            <TableHead className="text-white/60">Precios</TableHead>
                            <TableHead className="text-white/60">Status</TableHead>
                            <TableHead className="text-right pr-8">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {plans.map((plan) => (
                            <TableRow key={plan.id} className="border-white/5 hover:bg-white/[0.01]">
                                <TableCell className="pl-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center",
                                            plan.highlight ? "bg-violet-600/20 text-violet-500" : "bg-white/5 text-white/40"
                                        )}>
                                            <Star className={cn("w-5 h-5", plan.highlight && "fill-current")} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white uppercase">{plan.name}</div>
                                            <div className="text-[11px] text-white/40">{plan.description}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-bold text-cyan-400/80">M: ${plan.monthly_price}</span>
                                        <span className="text-xs font-bold text-violet-400/80">U: ${plan.one_time_price}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {plan.highlight && (
                                        <span className="bg-white/10 text-white text-[9px] font-black uppercase tracking-tighter px-2 py-1 rounded-full">Destacado</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right pr-8">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="w-8 h-8 text-white/20 hover:text-white"
                                            onClick={() => {
                                                setEditingPlan(plan);
                                                setIsDialogOpen(true);
                                            }}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="w-8 h-8 text-white/20 hover:text-red-400"
                                            onClick={() => handleDelete(plan.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

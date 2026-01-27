"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { submitLead } from '@/actions/submit-lead';
import type { Lead } from '@/types';
import { Send, CheckCircle } from 'lucide-react';

export function ContactForm() {
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [nombre, setNombre] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [telefono, setTelefono] = React.useState('');
    const [empresa, setEmpresa] = React.useState('');
    const [interes, setInteres] = React.useState('web');
    const [mensaje, setMensaje] = React.useState('');
    const [submitting, setSubmitting] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        const lead: Lead = {
            nombre,
            email,
            telefono: telefono || undefined,
            empresa: empresa || undefined,
            servicios_interes: [interes],
            mensaje: mensaje || undefined,
        } as Lead;

        try {
            const result = await submitLead(lead);
            if (!result.success) {
                console.error(result.error);
                // Simple UX feedback
                setSubmitting(false);
                return;
            }
            setIsSubmitted(true);
        } catch (err) {
            console.error(err);
            setSubmitting(false);
        }
    };

    return (
        <section id="contacto" className="py-24 relative">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="bg-[#0F0F1A]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">

                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-white mb-4">¿Listo para Escalar?</h2>
                        <p className="text-white/60">Cuéntanos sobre tu proyecto y construyamos el futuro.</p>
                    </div>

                    {isSubmitted ? (
                        <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">¡Mensaje Recibido!</h3>
                            <p className="text-white/60">Nuestro equipo analizará tu caso y te contactará en menos de 24h.</p>
                            <Button
                                onClick={() => setIsSubmitted(false)}
                                variant="link"
                                className="mt-6 text-cyan-400"
                            >
                                Enviar otro mensaje
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-white/80">Nombre</Label>
                                    <Input id="name" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="John Doe" className="bg-white/5 border-white/10 text-white focus:border-violet-500" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-white/80">Email</Label>
                                    <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="john@empresa.com" className="bg-white/5 border-white/10 text-white focus:border-violet-500" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="type" className="text-white/80">Interés Principal</Label>
                                <select id="type" value={interes} onChange={(e) => setInteres(e.target.value)} className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-violet-500">
                                    <option value="web" className="bg-[#0F0F1A]">Desarrollo Web / App</option>
                                    <option value="media" className="bg-[#0F0F1A]">Producción Audiovisual</option>
                                    <option value="auto" className="bg-[#0F0F1A]">Automatización</option>
                                    <option value="full" className="bg-[#0F0F1A]">Solución Completa</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-white/80">Mensaje</Label>
                                <Textarea id="message" value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder="Detalles de tu proyecto..." className="min-h-[120px] bg-white/5 border-white/10 text-white focus:border-violet-500" />
                            </div>

                            <Button type="submit" className="w-full h-12 bg-white text-black hover:bg-white/90 font-medium text-lg mt-4" disabled={submitting}>
                                {submitting ? 'Enviando...' : 'Enviar Solicitud'}
                                <Send className="w-4 h-4 ml-2" />
                            </Button>
                        </form>
                    )}

                </div>
            </div>
        </section>
    );
}

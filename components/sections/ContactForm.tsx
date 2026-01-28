"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { submitLead } from '@/actions/submit-lead';
import type { Lead } from '@/types';
import { Send, CheckCircle, Sparkles } from 'lucide-react';

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

        const leadData: Lead = {
            nombre,
            email,
            telefono: telefono || undefined,
            empresa: empresa || undefined,
            servicios_interes: [interes],
            mensaje: mensaje || undefined
        };

        // Format the message for WhatsApp
        const waMessage = `Hola Nexo! 👋 Quiero escalar mi negocio.\n\n` +
            `*Nombre:* ${nombre}\n` +
            `*Email:* ${email}\n` +
            `*Prioridad:* ${interes}\n` +
            `*Detalles:* ${mensaje || 'Sin detalles adicionales'}`;

        const waNumber = "5491136515838";
        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

        try {
            // Save to DB in background or await? "MVP DB" implies we want it saved.
            // We await to ensure we capture the lead before redirecting off page (though _blank opens new tab).
            const result = await submitLead(leadData);

            if (!result.success) {
                console.error("Failed to save lead:", result.error);
                // We proceed to WhatsApp anyway as fallback
            }

            // Redirect to WhatsApp
            window.open(waUrl, '_blank');
            setIsSubmitted(true);
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="contacto" className="py-24 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <div className="bg-[#0A0A0A]/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 md:p-16 shadow-2xl relative overflow-hidden">
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 p-8 text-emerald-500/10">
                        <Sparkles className="w-24 h-24" />
                    </div>

                    <div className="grid lg:grid-cols-5 gap-16 items-start">
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6">
                                    ¿Listo para <span className="text-emerald-500">Escalar?</span>
                                </h2>
                                <p className="text-lg text-white/60 leading-relaxed">
                                    No somos una agencia más. Somos tu partner tecnológico.
                                    <br /><br />
                                    Cuéntanos tu cuello de botella y te construiremos la solución.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-white/40">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                                    <span className="text-sm font-mono uppercase tracking-widest">Respuesta en {`<`} 24h</span>
                                </div>
                                <div className="flex items-center gap-4 text-white/40">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                                    <span className="text-sm font-mono uppercase tracking-widest">Auditoría Gratuita</span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            {isSubmitted ? (
                                <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-10 h-10 text-emerald-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">¡Mensaje Recibido!</h3>
                                    <p className="text-white/60">Nuestro equipo analizará tu caso y te contactará pronto.</p>
                                    <Button
                                        onClick={() => setIsSubmitted(false)}
                                        variant="link"
                                        className="mt-6 text-emerald-400"
                                    >
                                        Enviar otro mensaje
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-xs font-mono uppercase tracking-widest text-white/40">Nombre</Label>
                                            <Input id="name" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej. Mario" className="bg-white/5 border-white/10 text-white focus:border-emerald-500/50 h-12 rounded-xl" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-xs font-mono uppercase tracking-widest text-white/40">Email Corporativo</Label>
                                            <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="mario@empresa.com" className="bg-white/5 border-white/10 text-white focus:border-emerald-500/50 h-12 rounded-xl" required />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="type" className="text-xs font-mono uppercase tracking-widest text-white/40">Tu Prioridad</Label>
                                        <select id="type" value={interes} onChange={(e) => setInteres(e.target.value)} className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50 appearance-none">
                                            <option value="web" className="bg-[#0A0A0A]">Automatización de Ventas</option>
                                            <option value="media" className="bg-[#0A0A0A]">Desarrollo Web High-Ticket</option>
                                            <option value="auto" className="bg-[#0A0A0A]">IA & Chatbots</option>
                                            <option value="full" className="bg-[#0A0A0A]">Solución Full Infrastructure</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="text-xs font-mono uppercase tracking-widest text-white/40">¿Cómo podemos ayudarte?</Label>
                                        <Textarea id="message" value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder="Breve descripción de tu negocio y objetivos..." className="min-h-[120px] bg-white/5 border-white/10 text-white focus:border-emerald-500/50 rounded-xl py-4" />
                                    </div>

                                    <Button type="submit" className="w-full h-14 bg-emerald-500 text-black hover:bg-emerald-400 font-bold text-lg rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]" disabled={submitting}>
                                        {submitting ? 'Analizando...' : 'Solicitar Auditoría Gratuita'}
                                        <Send className="w-4 h-4 ml-2" />
                                    </Button>
                                    <p className="text-[10px] text-center text-white/20 uppercase tracking-[0.2em]">Respuesta garantizada en menos de 24 horas laborables</p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

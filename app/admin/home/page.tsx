'use client';

import * as React from 'react';
import { Save, Layout, Image as ImageIcon, Type, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

export default function HomeSettingsAdmin() {
    const [loading, setLoading] = React.useState(true);
    const [saving, setSaving] = React.useState(false);
    const [content, setContent] = React.useState({
        badge: '',
        title: '',
        subtitle: '',
        image_url: '',
        system_status: ''
    });

    const fetchSettings = async () => {
        setLoading(true);
        const { data } = await supabase
            .from('site_settings')
            .select('value')
            .eq('key', 'hero_content')
            .single();

        if (data) {
            setContent(data.value);
        }
        setLoading(false);
    };

    React.useEffect(() => {
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        console.log('🚀 Guardando configuración de Hero:', content);

        const { error } = await supabase
            .from('site_settings')
            .upsert({
                key: 'hero_content',
                value: content,
                updated_at: new Date().toISOString()
            }, { onConflict: 'key' });

        if (error) {
            console.error('❌ Error de Supabase:', error);
            alert(`Error al guardar: ${error.message}`);
        } else {
            console.log('✅ Configuración guardada correctamente');
            alert('Configuración guardada correctamente.');
        }
        setSaving(false);
    };

    if (loading) return <div className="p-8 text-white/40">Cargando configuración...</div>;

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-4xl font-black tracking-tighter text-white uppercase mb-2">
                    Configuración <span className="text-violet-500">Home</span>
                </h1>
                <p className="text-white/40 font-medium">Personaliza el mensaje principal y el impacto visual de tu agencia.</p>
            </div>

            <div className="grid gap-8">
                {/* Hero Section Card */}
                <div className="bg-black/50 border border-white/5 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                    <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                        <Layout className="w-5 h-5 text-violet-500" />
                        <h2 className="text-xl font-bold text-white uppercase tracking-tight">Sección Hero</h2>
                    </div>

                    <div className="grid gap-6">
                        <div className="space-y-2">
                            <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                                <Sparkles className="w-3 h-3" /> Badge Superior
                            </Label>
                            <Input
                                value={content.badge}
                                onChange={(e) => setContent({ ...content, badge: e.target.value })}
                                className="bg-white/5 border-white/10 rounded-xl"
                                placeholder="Growth Partner Certificado"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                                <Type className="w-3 h-3" /> Título Principal
                            </Label>
                            <Input
                                value={content.title}
                                onChange={(e) => setContent({ ...content, title: e.target.value })}
                                className="bg-white/5 border-white/10 rounded-xl text-lg font-bold"
                                placeholder="Arquitectura Digital que Domina Mercados."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Subtítulo / Bajada</Label>
                            <Textarea
                                value={content.subtitle}
                                onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                                className="bg-white/5 border-white/10 rounded-xl min-h-[100px] resize-none"
                                placeholder="Diseñamos ecosistemas de conversión..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                                    <ImageIcon className="w-3 h-3" /> URL Imagen Dashboard
                                </Label>
                                <Input
                                    value={content.image_url}
                                    onChange={(e) => setContent({ ...content, image_url: e.target.value })}
                                    className="bg-white/5 border-white/10 rounded-xl"
                                    placeholder="/images/stitch-hero-v2.png"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Status del Sistema</Label>
                                <Input
                                    value={content.system_status}
                                    onChange={(e) => setContent({ ...content, system_status: e.target.value })}
                                    className="bg-white/5 border-white/10 rounded-xl"
                                    placeholder="System Active: Scaling"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold px-12 h-14 shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all hover:scale-105 active:scale-95"
                    >
                        {saving ? 'Guardando...' : (
                            <>
                                <Save className="w-5 h-5 mr-2" />
                                Guardar Configuración
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}

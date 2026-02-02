'use client';

import { ArrowRight, Activity, Code, Layout, Cpu } from 'lucide-react';
import { m, useScroll, useTransform, LazyMotion, useSpring, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect, Fragment } from 'react';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

const loadFeatures = () =>
    import('framer-motion').then((res) => res.domAnimation);

const FALLBACK_CONTENT = {
    badge: 'Limited Availability: Q1 slots open',
    title: 'Arquitectura Digital <br />que Domina Mercados.',
    subtitle: 'Ingeniería de software de alto rendimiento y ecosistemas de IA diseñados para convertir marcas en autoridades indiscutibles.',
};

const FLOATING_PANELS = [
    {
        id: 1,
        title: 'Authority Branding',
        icon: Layout,
        image: '/Users/mariomorera/.gemini/antigravity/brain/bc650a79-0ccf-4c81-a1ce-7e8320dbbebb/hero_panel_branding_1770038387297.png',
        className: 'top-[10%] -left-[5%] md:left-[5%] w-48 md:w-72',
        rotate: -6,
        delay: 0.2
    },
    {
        id: 2,
        title: 'AI Automation',
        icon: Cpu,
        image: '/Users/mariomorera/.gemini/antigravity/brain/bc650a79-0ccf-4c81-a1ce-7e8320dbbebb/hero_panel_ai_nodes_1770038631182.png',
        className: 'top-[40%] -right-[10%] md:right-[5%] w-56 md:w-80',
        rotate: 4,
        delay: 0.4
    },
    {
        id: 3,
        title: 'Strategic Growth',
        icon: Activity,
        image: '/Users/mariomorera/.gemini/antigravity/brain/bc650a79-0ccf-4c81-a1ce-7e8320dbbebb/hero_panel_dashboard_v2_1770038995663.png',
        className: 'bottom-[5%] left-[10%] md:left-[20%] w-52 md:w-72',
        rotate: -2,
        delay: 0.6
    }
];

function FloatingPanel({ panel, mouseX, mouseY }: { panel: typeof FLOATING_PANELS[0], mouseX: any, mouseY: any }) {
    const ref = useRef<HTMLDivElement>(null);

    // Parallax effect based on mouse position
    const moveX = useSpring(useTransform(mouseX, [-0.5, 0.5], [panel.id * 10, panel.id * -10]), { damping: 20 });
    const moveY = useSpring(useTransform(mouseY, [-0.5, 0.5], [panel.id * 8, panel.id * -8]), { damping: 20 });
    const rotateZ = useSpring(useTransform(mouseX, [-0.5, 0.5], [panel.rotate - 2, panel.rotate + 2]), { damping: 20 });

    return (
        <m.div
            ref={ref}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: panel.delay, ease: [0.16, 1, 0.3, 1] }}
            style={{ x: moveX, y: moveY, rotateZ }}
            className={cn(
                "absolute z-20 liquid-glass rounded-2xl overflow-hidden aspect-[16/10] shadow-2xl transition-all duration-700 hover:scale-105 hover:z-30 group",
                panel.className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-transparent z-10" />
            <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <panel.icon className="w-3 h-3 text-emerald-500" />
                <span className="text-[8px] font-mono text-white/70 uppercase tracking-widest">{panel.title}</span>
            </div>
            <Image
                src={panel.image}
                alt={panel.title}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                sizes="30vw"
            />
            {/* Gloss highlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </m.div>
    );
}

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dynamicContent, setDynamicContent] = useState(FALLBACK_CONTENT);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    useEffect(() => {
        const fetchHero = async () => {
            const { data } = await supabase
                .from('site_settings')
                .select('value')
                .eq('key', 'hero_content')
                .single();

            if (data?.value) {
                setDynamicContent(data.value);
            }
        };
        fetchHero();
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const containerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const containerY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

    return (
        <LazyMotion features={loadFeatures}>
            <section
                ref={containerRef}
                onMouseMove={handleMouseMove}
                className="relative min-h-screen lg:h-[110vh] overflow-hidden flex flex-col items-center justify-center pt-20 bg-mesh noise-overlay"
            >
                {/* Background Decor */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                    <m.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px]"
                    />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" />
                </div>

                <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center">
                    <m.div
                        style={{ opacity: containerOpacity, y: containerY }}
                        className="text-center mb-12 max-w-4xl"
                    >
                        <m.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-[10px] font-bold text-emerald-500 backdrop-blur-xl mb-8 tracking-[0.3em] uppercase">
                                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 mr-3 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                {dynamicContent.badge || 'Engineering Success'}
                            </div>
                        </m.div>

                        <m.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.85] uppercase"
                        >
                            {dynamicContent.title.split('<br />').map((text, i) => (
                                <Fragment key={i}>
                                    <span className={cn(i === 1 && "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-white/40")}>
                                        {text}
                                    </span>
                                    {i < dynamicContent.title.split('<br />').length - 1 && <br />}
                                </Fragment>
                            ))}
                        </m.h1>

                        <m.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="mx-auto max-w-[700px] text-lg md:text-xl text-white/40 mb-12 leading-relaxed font-light italic"
                        >
                            "{dynamicContent.subtitle}"
                        </m.p>

                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col sm:flex-row gap-6 justify-center"
                        >
                            <button
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="group liquid-glass px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest text-white border-white/20 hover:border-emerald-500/50 transition-all duration-500 shadow-[0_0_30px_rgba(16,185,129,0.1)] active:scale-95"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    Iniciar Despliegue <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500 text-emerald-400" />
                                </span>
                            </button>

                            <button
                                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest border border-white/5 hover:bg-white/5 transition-all duration-500 text-white/40 hover:text-white"
                            >
                                Ver Ecosistemas
                            </button>
                        </m.div>
                    </m.div>

                    {/* Interactive Composition Area */}
                    <div className="relative w-full h-[400px] md:h-[600px] max-w-6xl pointer-events-none lg:pointer-events-auto">
                        {FLOATING_PANELS.map((panel) => (
                            <FloatingPanel key={panel.id} panel={panel} mouseX={mouseX} mouseY={mouseY} />
                        ))}

                        {/* Center Focal Point (Ambient Glow) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] opacity-40 mix-blend-screen" />
                    </div>
                </div>

                {/* Technical status lines */}
                <div className="absolute bottom-12 left-12 hidden xl:block">
                    <div className="flex flex-col gap-2 font-mono text-[10px] text-white/20 uppercase tracking-[0.2em]">
                        <div className="flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-white/10" />
                            System Architecture: 0.5.4v
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-white/10" />
                            Core Engine: Pulse
                        </div>
                    </div>
                </div>
            </section>
        </LazyMotion>
    );
}

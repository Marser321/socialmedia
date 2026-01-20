'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { ServiceModal } from '@/components/shared/ServiceModal';
import { Servicio } from '@/types';
import { Layers, Monitor, Smartphone, Video, Share2, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// MOCK DATA
const SAMPLE_SERVICES: Servicio[] = [
    {
        id: '1', nombre: 'Desarrollo Web', descripcion: 'Experiencias digitales inmersivas que convierten.', descripcion_corta: 'Web de alto impacto', pilar: 'tech', icono: 'Monitor', precio_base: 1500, tipo_pago: 'unico', orden: 1,
        caracteristicas: ['Diseño 3D Interactivo', 'SEO Técnico Avanzado', 'CMS Headless'],
        tecnologias: ['Next.js 14', 'React Three Fiber', 'Tailwind CSS', 'Supabase']
    },
    {
        id: '2', nombre: 'Automatización', descripcion: 'Tu negocio operando en piloto automático 24/7.', descripcion_corta: 'Automatización 360', pilar: 'tech', icono: 'Layers', precio_base: 800, tipo_pago: 'mensual', orden: 2,
        caracteristicas: ['Workflows Multi-etapa', 'Sincronización Bidireccional', 'Bots con IA Generativa'],
        tecnologias: ['Zapier Enterprise', 'Make (Integromat)', 'OpenAI API', 'Python Scripts']
    },
    {
        id: '3', nombre: 'Producción Video', descripcion: 'Narrativa cinematográfica para marcas audaces.', descripcion_corta: 'Video Marketing', pilar: 'media', icono: 'Video', precio_base: 1200, tipo_pago: 'unico', orden: 3,
        caracteristicas: ['Guión + Storyboard', 'Color Grading HDR', 'Sound Design Inmersivo'],
        tecnologias: ['DaVinci Resolve Studio', 'Adobe Premiere Pro', 'After Effects', 'Cinema 4D']
    },
    {
        id: '4', nombre: 'Growth Social', descripcion: 'Dominio total de la atención en redes sociales.', descripcion_corta: 'Redes Sociales', pilar: 'growth', icono: 'Share2', precio_base: 600, tipo_pago: 'mensual', orden: 4,
        caracteristicas: ['Estrategia Viral', 'Edición Formato Reels', 'Analytics Predictivo'],
        tecnologias: ['Metricool', 'CapCut Pro', 'Canva Enterprise', 'Meta Ads Manager']
    },
    {
        id: '5', nombre: 'Apps a Medida', descripcion: 'Ecosistemas móviles nativos de alto rendimiento.', descripcion_corta: 'Desarrollo Apps', pilar: 'tech', icono: 'Smartphone', precio_base: 5000, tipo_pago: 'unico', orden: 5,
        caracteristicas: ['iOS & Android Nativo', 'Offline First', 'Biometría Avanzada'],
        tecnologias: ['React Native / Expo', 'Firebase', 'Node.js', 'PostgreSQL']
    },
];

const iconMap: Record<string, React.ReactNode> = {
    Monitor: <Monitor className="w-8 h-8" />,
    Layers: <Layers className="w-8 h-8" />,
    Video: <Video className="w-8 h-8" />,
    Share2: <Share2 className="w-8 h-8" />,
    Smartphone: <Smartphone className="w-8 h-8" />,
};

// Map service IDs to specific background images
const startBackgroundMap: Record<string, string> = {
    '1': 'tech',
    '2': 'automation',
    '3': 'media',
    '4': 'growth',
    '5': 'mobile',
};

export function ServicesCatalog() {
    const [selectedService, setSelectedService] = React.useState<Servicio | null>(null);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [isAtStart, setIsAtStart] = React.useState(true);
    const [isAtEnd, setIsAtEnd] = React.useState(false);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    // Detección de elemento activo para cambiar el fondo
    const handleScroll = React.useCallback(() => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const center = container.scrollLeft + container.clientWidth / 2;

        setIsAtStart(container.scrollLeft <= 10);
        setIsAtEnd(container.scrollLeft + container.clientWidth >= container.scrollWidth - 10);

        const children = Array.from(container.children) as HTMLElement[];
        let closestIndex = activeIndex;
        let closestDistance = Infinity;

        children.forEach((child, index) => {
            const childCenter = child.offsetLeft + child.offsetWidth / 2;
            const distance = Math.abs(center - childCenter);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        if (closestIndex !== activeIndex) {
            setActiveIndex(closestIndex);
        }
    }, [activeIndex]);

    // Scroll vertical passthrough (Anti-Trap V3)
    React.useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const onWheel = (e: WheelEvent) => {
            if (e.deltaY === 0) return;

            const isEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
            const isStart = el.scrollLeft <= 2;

            // Si intenta ir más allá del final -> dejar al navegador hacer scroll vertical
            if (isEnd && e.deltaY > 0) return;
            // Si intenta ir antes del principio -> dejar al navegador hacer scroll vertical
            if (isStart && e.deltaY < 0) return;

            // En el medio -> scroll horizontal
            e.preventDefault();
            el.scrollBy({
                left: e.deltaY,
                behavior: 'auto'
            });
        };

        el.addEventListener('wheel', onWheel, { passive: false });
        // Asegurar que el evento scroll llame a handleScroll
        el.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            el.removeEventListener('wheel', onWheel);
            el.removeEventListener('scroll', handleScroll);
        };
    }, [activeIndex, handleScroll]);

    const activeService = SAMPLE_SERVICES[activeIndex] || SAMPLE_SERVICES[0];
    const backgroundImage = startBackgroundMap[activeService.id] || 'tech';

    const scrollLeft = () => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <section id="servicios" className="py-12 md:py-24 bg-background relative overflow-hidden min-h-[90vh] flex flex-col justify-center">

            {/* Dynamic Image Background */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={backgroundImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 z-0 pointer-events-none"
                >
                    <Image
                        src={`/images/backgrounds/${backgroundImage}.png`}
                        alt={`${activeService.nombre} background`}
                        fill
                        className="object-cover opacity-40 mix-blend-screen mask-image-gradient"
                        priority
                    />
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
                    {/* Gradients to fade edges */}
                    <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Content Container */}
            <div className="container mx-auto px-4 mb-8 md:mb-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase relative z-10">
                        ECOSISTEMA <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400 animate-gradient-x bg-[length:200%_auto]">DIGITAL</span>
                    </h2>
                    <p className="text-xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto">
                        Fusionamos <span className="font-semibold text-blue-300">creatividad estratégica</span> con <span className="font-semibold text-emerald-300">ingeniería de software</span>.
                        Explora nuestros módulos de alto rendimiento diseñados para escalar.
                    </p>
                </motion.div>
            </div>

            {/* Scroll Container - Increased padding to prevent clipping */}
            <div className="relative w-full z-20 group/scroll">

                {/* Navigation Hints (Desktop) */}
                <button
                    onClick={scrollLeft}
                    className={cn(
                        "hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-30 transition-all duration-300 items-center justify-center hover:scale-110",
                        isAtStart ? "opacity-0 pointer-events-none" : "opacity-100"
                    )}
                >
                    <ChevronLeft className="w-12 h-12 text-white/40 hover:text-white" />
                </button>
                <button
                    onClick={scrollRight}
                    className={cn(
                        "hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-30 transition-all duration-300 items-center justify-center hover:scale-110",
                        isAtEnd ? "opacity-0 pointer-events-none" : "opacity-100"
                    )}
                >
                    <ChevronRight className="w-12 h-12 text-white/40 hover:text-white" />
                </button>

                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto py-12 snap-x snap-mandatory gap-6 px-4 md:px-[calc(50vw-200px)] hide-scrollbar items-center"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {SAMPLE_SERVICES.map((service, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <motion.div
                                key={service.id}
                                className="snap-center shrink-0 w-[85vw] sm:w-[350px] md:w-[400px] first:pl-0 last:pr-0"
                                animate={{
                                    scale: isActive ? 1 : 0.9,
                                    opacity: isActive ? 1 : 0.4,
                                    filter: isActive ? 'blur(0px)' : 'blur(2px)',
                                    y: isActive ? 0 : 20
                                }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <AnimatedCard
                                    onClick={() => setSelectedService(service)}
                                    className={cn(
                                        "h-[450px] flex flex-col justify-between group/card transition-all duration-500",
                                        isActive ? "border-white/20 bg-white/5 shadow-2xl" : "border-transparent bg-transparent shadow-none"
                                    )}
                                    gradientColor={
                                        service.pilar === 'tech' ? 'from-blue-600/30 to-cyan-500/30' :
                                            service.pilar === 'media' ? 'from-violet-600/30 to-purple-500/30' :
                                                'from-emerald-500/30 to-teal-500/30'
                                    }
                                >
                                    <div>
                                        <div className={cn(
                                            "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-3",
                                            service.pilar === 'tech' ? 'bg-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.3)]' :
                                                service.pilar === 'media' ? 'bg-violet-500/20 shadow-[0_0_20px_rgba(124,58,237,0.3)]' : 'bg-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                                        )}>
                                            {iconMap[service.icono] || <Layers className="w-8 h-8" />}
                                        </div>

                                        <h3 className="text-3xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight leading-none filter drop-shadow-sm">
                                            {service.nombre}
                                        </h3>
                                        <p className="text-white/80 font-medium leading-relaxed mb-6 text-base border-l-2 border-white/20 pl-3">
                                            {service.descripcion}
                                        </p>

                                        <div className="space-y-2">
                                            {service.caracteristicas.slice(0, 3).map((feature, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm text-white/50">
                                                    <div className={cn("w-1.5 h-1.5 rounded-full",
                                                        service.pilar === 'tech' ? 'bg-blue-400' :
                                                            service.pilar === 'media' ? 'bg-violet-400' : 'bg-emerald-400'
                                                    )} />
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                                        <span className={cn(
                                            "text-xs font-bold uppercase tracking-widest px-2 py-1 rounded",
                                            service.pilar === 'tech' ? 'bg-blue-500/10 text-blue-400' :
                                                service.pilar === 'media' ? 'bg-violet-500/10 text-violet-400' : 'bg-emerald-500/10 text-emerald-400'
                                        )}>
                                            {service.pilar}
                                        </span>
                                        <div className="flex items-center gap-1 text-white/40 group-hover/card:text-white transition-all">
                                            <span className="text-sm">Explorar</span>
                                            <ChevronRight className="w-4 h-4 group-hover/card:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </AnimatedCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <ServiceModal
                isOpen={!!selectedService}
                onClose={() => setSelectedService(null)}
                service={selectedService}
            />
        </section>
    );
}

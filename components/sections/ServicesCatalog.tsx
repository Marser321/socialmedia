'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ServiceModal } from '@/components/shared/ServiceModal';
import { Servicio } from '@/types';
import { Layers, Monitor, Smartphone, Video, Share2, ChevronRight, ChevronLeft, ShoppingCart, Bookmark } from 'lucide-react';
import { MOCK_SERVICES } from '@/data/services';
import { cn } from '@/lib/utils';


const iconMap: Record<string, React.ReactNode> = {
    Monitor: <Monitor className="w-8 h-8" />,
    ShoppingCart: <ShoppingCart className="w-8 h-8" />,
    Layers: <Layers className="w-8 h-8" />,
    Video: <Video className="w-8 h-8" />,
    Share2: <Share2 className="w-8 h-8" />,
    Smartphone: <Smartphone className="w-8 h-8" />,
};

export function ServicesCatalog() {
    const [bookmarks, setBookmarks] = React.useState<string[]>(() => {
        if (typeof window === 'undefined') return [] as string[];
        try {
            const raw = localStorage.getItem('nexo_bookmarks');
            return raw ? (JSON.parse(raw) as string[]) : [];
        } catch {
            return [];
        }
    });

    React.useEffect(() => {
        if (typeof window === 'undefined') return;
        localStorage.setItem('nexo_bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);

    const toggleBookmark = (id: string) => {
        setBookmarks((prev) => (prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]));
    };
    const [selectedService, setSelectedService] = React.useState<Servicio | null>(null);
    // Track mouse position for spotlight effect
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const scrollRef = React.useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    };

    const scrollRight = () => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    };

    return (
        <section id="servicios" className="py-24 bg-background relative overflow-hidden min-h-screen flex flex-col justify-center">

            {/* Ambient Background */}
            <div className="absolute inset-0 bg-background">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full border border-blue-500/20">
                        Nuestras Capacidades
                    </div>
                    <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase relative z-10">
                        ecosistema <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400 animate-gradient-x bg-[length:200%_auto]">digital</span>
                    </h2>
                    <p className="text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
                        Módulos de alto rendimiento diseñados para integrarse y escalar.
                    </p>
                </motion.div>
            </div>

            {/* Scroll Container */}
            <div className="relative w-full z-20 group/scroll pl-4 md:pl-[10vw]">

                {/* Navigation Buttons */}
                <div className="flex justify-end gap-2 pr-4 md:pr-[10vw] mb-4">
                    <button onClick={scrollLeft} className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button onClick={scrollRight} className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                </div>

                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto pb-12 snap-x snap-mandatory gap-6 px-4 pr-[20vw] hide-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {MOCK_SERVICES.map((service, index) => (
                        <motion.div
                            key={service.id}
                            className="snap-start shrink-0 w-[300px] md:w-[400px]"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div
                                className="group/card relative h-[500px] bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
                                onMouseMove={handleMouseMove}
                            >
                                {/* Spotlight Effect */}
                                <div
                                    className="pointer-events-none absolute -inset-px opacity-0 group-hover/card:opacity-100 transition duration-300"
                                    style={{
                                        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`
                                    }}
                                />

                                <div className="p-8 h-full flex flex-col relative z-10">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className={cn(
                                            "w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-all duration-500 group-hover/card:scale-110",
                                            service.pilar === 'tech' ? 'bg-blue-500/20 text-blue-400' :
                                                service.pilar === 'media' ? 'bg-violet-500/20 text-violet-400' : 'bg-emerald-500/20 text-emerald-400'
                                        )}>
                                            {iconMap[service.icono]}
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); toggleBookmark(service.id); }}
                                            className="p-2 rounded-full hover:bg-white/10 transition-colors"
                                        >
                                            <Bookmark className={cn("w-5 h-5", bookmarks.includes(service.id) ? "fill-yellow-400 text-yellow-400" : "text-white/40")} />
                                        </button>
                                    </div>

                                    <h3 className="text-3xl font-bold text-white mb-2 group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-white group-hover/card:to-white/70 transition-all">
                                        {service.nombre}
                                    </h3>

                                    <p className="text-white/60 mb-8 line-clamp-3">
                                        {service.descripcion}
                                    </p>

                                    <div className="mt-auto space-y-4">
                                        <div className="flex flex-wrap gap-2">
                                            {service.caracteristicas.slice(0, 2).map((feature, i) => (
                                                <span key={i} className="text-xs px-2 py-1 rounded border border-white/10 text-white/50 bg-white/5">
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-white/40 uppercase tracking-wider">Desde</span>
                                                <span className="text-xl font-bold text-white">${service.precio_base}</span>
                                            </div>
                                            <button
                                                onClick={() => setSelectedService(service)}
                                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/card:bg-white group-hover/card:text-black transition-all"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
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

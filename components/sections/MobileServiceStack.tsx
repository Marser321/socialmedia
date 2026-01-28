'use client';

import { motion } from 'framer-motion';
import { Servicio } from '@/types';
import { MOCK_SERVICES } from '@/data/services';
import { cn } from '@/lib/utils';
import { Layers, Monitor, Smartphone, Video, Share2, ShoppingCart, ChevronRight, Bookmark } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
    Monitor: <Monitor className="w-6 h-6" />,
    ShoppingCart: <ShoppingCart className="w-6 h-6" />,
    Layers: <Layers className="w-6 h-6" />,
    Video: <Video className="w-6 h-6" />,
    Share2: <Share2 className="w-6 h-6" />,
    Smartphone: <Smartphone className="w-6 h-6" />,
};

interface MobileServiceStackProps {
    bookmarks: string[];
    toggleBookmark: (id: string) => void;
    onSelect: (service: Servicio) => void;
}

export function MobileServiceStack({ bookmarks, toggleBookmark, onSelect }: MobileServiceStackProps) {
    return (
        <div className="flex flex-col gap-6 px-4 pb-24 md:hidden">
            {MOCK_SERVICES.map((service, index) => (
                <MobileCard
                    key={service.id}
                    service={service}
                    index={index}
                    isBookmarked={bookmarks.includes(service.id)}
                    toggleBookmark={toggleBookmark}
                    onSelect={() => onSelect(service)}
                />
            ))}
        </div>
    );
}

function MobileCard({
    service,
    index,
    isBookmarked,
    toggleBookmark,
    onSelect
}: {
    service: Servicio;
    index: number;
    isBookmarked: boolean;
    toggleBookmark: (id: string) => void;
    onSelect: () => void;
}) {
    // Determine theme colors
    const isTech = service.pilar === 'tech';
    const isMedia = service.pilar === 'media';
    const isGrowth = service.pilar === 'growth';

    const borderColor = isTech ? 'border-blue-500/30' : isMedia ? 'border-violet-500/30' : 'border-emerald-500/30';
    const bgColor = isTech ? 'bg-blue-500/5' : isMedia ? 'bg-violet-500/5' : 'bg-emerald-500/5';
    const textColor = isTech ? 'text-blue-400' : isMedia ? 'text-violet-400' : 'text-emerald-400';
    const glowColor = isTech ? 'shadow-blue-500/10' : isMedia ? 'shadow-violet-500/10' : 'shadow-emerald-500/10';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1 }}
            className={cn(
                "relative rounded-3xl border overflow-hidden backdrop-blur-md",
                borderColor,
                // Solid dark background for contrast, tinted by pillar color
                isTech ? "bg-slate-950/80" : isMedia ? "bg-fuchsia-950/80" : "bg-emerald-950/80",
                "shadow-lg", glowColor
            )}
        >
            {/* Static Background Glow - Moved to bottom and reduced opacity to avoid text conflict */}
            <div className={cn(
                "absolute -bottom-10 -right-10 w-48 h-48 rounded-full blur-[80px] opacity-15 pointer-events-none",
                isTech ? "bg-blue-500" : isMedia ? "bg-violet-500" : "bg-emerald-500"
            )} />

            <div className="p-6 relative z-10 flex flex-col gap-4">
                {/* Header: Icon + Bookmark */}
                <div className="flex justify-between items-start">
                    <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center border backdrop-blur-md",
                        borderColor,
                        isTech ? "bg-blue-500/10" : isMedia ? "bg-violet-500/10" : "bg-emerald-500/10",
                        textColor
                    )}>
                        {iconMap[service.icono]}
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); toggleBookmark(service.id); }}
                        className="p-2 -mr-2 text-white/40 hover:text-white transition-colors"
                    >
                        <Bookmark className={cn("w-5 h-5", isBookmarked && "fill-yellow-400 text-yellow-400")} />
                    </button>
                </div>

                {/* Content */}
                <div>
                    <h3 className="text-2xl font-black text-white mb-2 leading-tight">{service.nombre}</h3>
                    <p className="text-gray-200 text-sm leading-relaxed font-medium">{service.descripcion}</p>
                </div>

                {/* Features (Wrap) */}
                <div className="flex flex-wrap gap-2">
                    {service.caracteristicas.slice(0, 3).map((f, i) => (
                        <span key={i} className="text-[10px] font-bold tracking-wide uppercase px-2 py-1 rounded bg-black/40 border border-white/10 text-white/70">
                            {f}
                        </span>
                    ))}
                </div>

                {/* Footer: Price + Action */}
                <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between">
                    <div>
                        <div className="text-[10px] uppercase text-white/50 tracking-wider font-bold">Inversión</div>
                        <div className={cn("text-xl font-black text-white")}>${service.precio_base}</div>
                    </div>
                    <button
                        onClick={onSelect}
                        className={cn(
                            "flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-black transition-transform active:scale-95 shadow-lg",
                            isTech ? "bg-blue-400 shadow-blue-500/20" : isMedia ? "bg-violet-400 shadow-violet-500/20" : "bg-emerald-400 shadow-emerald-500/20"
                        )}
                    >
                        Ver Detalles
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

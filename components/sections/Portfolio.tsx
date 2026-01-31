'use client';

import * as React from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

const CATEGORIES = ['Todos', 'E-commerce', 'Apps', 'Contenido'];

const PROJECTS = [
    {
        id: 1,
        title: 'Neon Market',
        category: 'E-commerce',
        image: '/portfolio/1.png',
        desc: 'Plataforma de ventas con estética futurista y UX de alta conversión.',
        metric: '+240% Ventas',
        color: 'from-blue-500/20'
    },
    {
        id: 2,
        title: 'Lumina App',
        category: 'Apps',
        image: '/portfolio/2.png',
        desc: 'Suite de productividad inteligente optimizada para gestión de equipos.',
        metric: '10k+ Usuarios',
        color: 'from-violet-500/20'
    },
    {
        id: 3,
        title: 'TecnoFest 2024',
        category: 'Contenido',
        image: '/portfolio/3.png',
        desc: 'Estrategia viral y cobertura 360° para el evento tecnológico más grande.',
        metric: '5M Views',
        color: 'from-fuchsia-500/20'
    },
    {
        id: 4,
        title: 'Alpha Bank',
        category: 'Fintech',
        image: '/portfolio/4.png',
        desc: 'Rediseño total de la banca digital priorizando seguridad y elegancia.',
        metric: '-40% Churn',
        color: 'from-emerald-500/20'
    },
];

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 20 });

    const rectRef = React.useRef<{ width: number; height: number; left: number; top: number } | null>(null);

    const onMouseEnter = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        rectRef.current = {
            width: rect.width,
            height: rect.height,
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    }, []);

    const onMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!rectRef.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            rectRef.current = {
                width: rect.width,
                height: rect.height,
                left: rect.left + window.scrollX,
                top: rect.top + window.scrollY
            };
        }
        const rect = rectRef.current;
        const x = (e.pageX - rect.left) / rect.width - 0.5;
        const y = (e.pageY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    }, [mouseX, mouseY]);

    const onMouseLeave = React.useCallback(() => {
        mouseX.set(0);
        mouseY.set(0);
        rectRef.current = null;
    }, [mouseX, mouseY]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ rotateX, rotateY, perspective: 1000 }}
            className="group relative"
        >
            <AnimatedCard className="aspect-[16/10] overflow-hidden bg-black/40 border-white/5 group-hover:border-white/20 transition-colors duration-500">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={cn("absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent", project.color)} />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
                            <span className="text-white/80 text-xs font-bold uppercase tracking-widest">{project.category}</span>
                        </div>
                        <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-black px-3 py-1 rounded-full">
                            {project.metric}
                        </div>
                    </div>

                    <h3 className="text-3xl font-black text-white mb-2 tracking-tighter group-hover:translate-x-2 transition-transform duration-500">
                        {project.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm group-hover:text-white/80 transition-colors">
                        {project.desc}
                    </p>

                    <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-full group/btn"
                            onClick={() => {
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Ver Detalles <ArrowUpRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            </AnimatedCard>
        </motion.div>
    );
}

interface DBProject {
    id: number;
    title: string;
    category: string;
    image_url: string;
    description: string;
    metric?: string;
    metric_color?: string;
}

export function Portfolio() {
    const [activeCategory, setActiveCategory] = React.useState('Todos');
    const [dbProjects, setDbProjects] = React.useState<any[]>([]);

    React.useEffect(() => {
        const fetchProjects = async () => {
            const { data } = await supabase
                .from('projects')
                .select('*')
                .order('orden', { ascending: true });

            if (data && data.length > 0) {
                const mapped = data.map((p) => ({
                    id: p.id,
                    title: p.title,
                    category: p.category,
                    image: p.image_url,
                    desc: p.description,
                    metric: p.featured ? 'Featured' : 'New',
                    color: 'from-blue-500/20'
                }));
                setDbProjects(mapped);
            }
        };

        fetchProjects();
    }, []);

    const allProjects = [...PROJECTS, ...dbProjects];

    const filteredProjects = activeCategory === 'Todos'
        ? allProjects
        : allProjects.filter(p => p.category === activeCategory);

    return (
        <section id="portfolio" className="py-32 bg-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
                        >
                            Nuestro Trabajo
                        </motion.span>
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
                            Casos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">Éxito Nexo</span>
                        </h2>
                        <p className="text-xl text-white/40 font-light leading-relaxed max-w-xl">
                            No solo creamos interfaces, construimos <span className="text-white font-medium">motores de crecimiento</span> digital que dominan el mercado.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 bg-white/5 p-1.5 rounded-2xl backdrop-blur-xl border border-white/5">
                        {CATEGORIES.map((cat) => (
                            <Button
                                key={cat}
                                variant={'ghost'}
                                size="sm"
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "rounded-xl transition-all duration-300",
                                    activeCategory === cat
                                        ? 'bg-white/10 text-white shadow-xl'
                                        : 'text-white/40 hover:text-white hover:bg-white/5'
                                )}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project as any} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

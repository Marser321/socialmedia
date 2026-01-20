'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { ArrowUpRight } from 'lucide-react';

const CATEGORIES = ['Todos', 'Web', 'Media', 'Apps'];

const PROJECTS = [
    { id: 1, title: 'Neon Market', category: 'Web', image: '/portfolio/1.jpg', desc: 'E-commerce Futurista' },
    { id: 2, title: 'Lumina App', category: 'Apps', image: '/portfolio/2.jpg', desc: 'Gestión Inteligente' },
    { id: 3, title: 'TecnoFest', category: 'Media', image: '/portfolio/3.jpg', desc: 'Cobertura Evento' },
    { id: 4, title: 'Alpha Bank', category: 'Web', image: '/portfolio/4.jpg', desc: 'Banca Digital' },
];

export function Portfolio() {
    const [activeCategory, setActiveCategory] = React.useState('Todos');

    const filteredProjects = activeCategory === 'Todos'
        ? PROJECTS
        : PROJECTS.filter(p => p.category === activeCategory);

    return (
        <section id="portfolio" className="py-24 bg-background relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
                            Casos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 animate-pulse">Éxito</span>
                        </h2>
                        <p className="text-xl text-white/60 font-light leading-relaxed">
                            Transformación digital real. Resultados tangibles para empresas visionarias.
                        </p>
                    </div>

                    <div className="flex gap-2 bg-white/5 p-1 rounded-full backdrop-blur-sm border border-white/10">
                        {CATEGORIES.map((cat) => (
                            <Button
                                key={cat}
                                variant={'ghost'}
                                size="sm"
                                onClick={() => setActiveCategory(cat)}
                                className={activeCategory === cat ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <AnimatedCard className="aspect-video group relative overflow-hidden bg-white/5">
                                    {/* Placeholder for Image */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 to-black group-hover:scale-105 transition-transform duration-700" />

                                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                                        <span className="text-cyan-400 text-sm font-medium mb-2 uppercase tracking-wider">{project.category}</span>
                                        <h3 className="text-3xl font-bold text-white mb-1 group-hover:translate-x-2 transition-transform">{project.title}</h3>
                                        <p className="text-white/60 mb-6">{project.desc}</p>

                                        <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                                            <ArrowUpRight className="text-white w-5 h-5" />
                                        </div>
                                    </div>
                                </AnimatedCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

'use client';

import { ROICalculator } from '@/components/shared/ROICalculator';
import { ServiceInfographicCard } from '@/components/shared/ServiceInfographicCard';
import { Monitor, Layers, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function InteractiveValue() {
    return (
        <section className="py-32 bg-black relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-28">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-8xl font-bold text-white mb-8 uppercase tracking-tight leading-[0.9]"
                    >
                        Ingeniería que <span className="text-emerald-500">Domina</span>
                    </motion.h2>
                    <p className="text-xl text-white/40 max-w-3xl mx-auto font-light leading-relaxed">
                        No fabricamos código; construimos sistemas de rentabilidad probada. Nuestra ingeniería es el motor que impulsa tu autoridad digital.
                    </p>
                </div>

                <div className="mb-32">
                    <ROICalculator />
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <ServiceInfographicCard
                        pilar="tech"
                        title="Ecosistema Web"
                        description="De una simple web a un canal de ventas 24/7."
                        icon={Monitor}
                        steps={[
                            { label: "Análisis CRO", details: "Mapeamos el comportamiento del usuario." },
                            { label: "Arquitectura", details: "Estructura de alta velocidad y conversión." },
                            { label: "Optimización", details: "Iteración constante basada en datos." }
                        ]}
                    />
                    <ServiceInfographicCard
                        pilar="media"
                        title="Cinema Branding"
                        description="Elevamos la percepción de valor de tu marca."
                        icon={Layers}
                        steps={[
                            { label: "DNA Story", details: "Descubrimos la esencia de tu marca." },
                            { label: "Producción", details: "Calidad cinematográfica que detiene el scroll." },
                            { label: "Distribucción", details: "Contenido optimizado para cada canal." }
                        ]}
                    />
                    <ServiceInfographicCard
                        pilar="growth"
                        title="Traffic Ads"
                        description="Escala masiva con precisión quirúrgica."
                        icon={Share2}
                        steps={[
                            { label: "Targeting IA", details: "IA para encontrar a tu cliente ideal." },
                            { label: "Creative", details: "Ads que no parecen anuncios." },
                            { label: "Scaling", details: "Aumentamos el presupuesto con ROI positivo." }
                        ]}
                    />
                </div>
            </div>
        </section>
    );
}

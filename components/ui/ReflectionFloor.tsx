'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

type Pilar = 'tech' | 'media' | 'growth' | null;

interface ReflectionFloorProps {
    pilar: Pilar;
}

export function ReflectionFloor({ pilar }: ReflectionFloorProps) {
    return (
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] overflow-hidden pointer-events-none z-0">
            {/* Base Grid - Always visible but subtle */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

            <AnimatePresence mode="wait">
                {pilar === 'tech' && <TechEffect key="tech" />}
                {pilar === 'media' && <MediaEffect key="media" />}
                {pilar === 'growth' && <GrowthEffect key="growth" />}
            </AnimatePresence>

            {/* Fade out at the bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent h-full w-full" />
        </div>
    );
}

interface Line {
    id: number;
    left: string;
    duration: number;
    delay: number;
}

function TechEffect() {
    // "The Circuit Matrix" - Digital rain/circuit lines
    const [lines, setLines] = useState<Line[]>([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLines([...Array(20)].map((_, i) => ({
            id: i,
            left: `${5 + i * 5}%`,
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 2
        })));
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
        >
            {/* Blue tint */}
            <div className="absolute inset-0 bg-blue-500/5 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            {/* Moving Grid Lines */}
            <div className="absolute inset-x-0 top-0 h-full overflow-hidden perspective-grid">
                {lines.map((line) => (
                    <motion.div
                        key={line.id}
                        className="absolute top-0 w-[1px] bg-gradient-to-b from-blue-500/0 via-blue-400/50 to-blue-500/0"
                        style={{
                            left: line.left,
                            height: '100%',
                        }}
                        initial={{ y: '-100%', opacity: 0 }}
                        animate={{
                            y: ['-100%', '100%'],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: line.duration,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: line.delay
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
}

function MediaEffect() {
    // "The Creative Studio" - Volumetric Spotlights
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
        >
            {/* Main Center Spotlight */}
            <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[60%] h-[150%] bg-violet-500/10 blur-[100px] rounded-[100%]" />

            {/* Dancing Lights */}
            <motion.div
                className="absolute top-0 left-1/4 w-[200px] h-[400px] bg-fuchsia-500/20 blur-[80px]"
                animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 0.8, 1],
                    x: [0, 50, -50, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
            />
            <motion.div
                className="absolute top-0 right-1/4 w-[200px] h-[400px] bg-violet-600/20 blur-[80px]"
                animate={{
                    rotate: [0, -10, 10, 0],
                    scale: [1, 0.8, 1.2, 1],
                    x: [0, -50, 50, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
            />
        </motion.div>
    );
}

interface Particle {
    id: number;
    left: string;
    yTarget: number;
    duration: number;
    delay: number;
}

function GrowthEffect() {
    // "The Market Graph" - Rising Particles/Bars
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setParticles([...Array(15)].map((_, i) => ({
            id: i,
            left: `${10 + Math.random() * 80}%`,
            yTarget: -300 - Math.random() * 200,
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2
        })));
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
        >
            {/* Emerald tint */}
            <div className="absolute inset-0 bg-emerald-500/5 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            {/* Rising Particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute bottom-0 w-1 h-1 rounded-full bg-emerald-400"
                    style={{
                        left: p.left,
                    }}
                    initial={{ y: 0, opacity: 0, scale: 0 }}
                    animate={{
                        y: p.yTarget,
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: p.delay
                    }}
                />
            ))}

            {/* Abstract Bar Graph */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end gap-2 h-[200px] px-20 opacity-20 mask-image-linear-to-t">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-16 bg-gradient-to-t from-emerald-500 to-transparent rounded-t-lg"
                        initial={{ height: '10%' }}
                        animate={{ height: ['20%', '80%', '40%', '60%'] }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            repeatType: 'mirror',
                            delay: i * 0.2
                        }}
                    />
                ))}
                {/* Masking the top of bars smoothly */}
                <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent" />
            </div>
        </motion.div>
    );
}

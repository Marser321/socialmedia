'use client';

import { motion, useScroll, useTransform, useVelocity, useSpring, MotionValue } from 'framer-motion';
import { Zap, Database, MessageSquare, FileSpreadsheet, Mail, ArrowRight, AlertTriangle, MessageCircleOff, Hourglass, FileWarning } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef, useMemo, useState, useEffect, ElementType } from 'react';

export function ProblemSolution() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mobile Detection
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // --- DESKTOP ANIMATIONS (Original High-End) ---
    // Clip Path Circle Reveal
    const desktopClipPath = useTransform(scrollYProgress, [0, 1], ["circle(0% at 50% 50%)", "circle(250% at 50% 50%)"]);

    // --- MOBILE ANIMATIONS (Performance Optimized) ---
    // Instead of ClipPath, use Opacity + Scale for a smooth "Focus" effect
    // 0 -> 0.4: Red visible. 0.4 -> 0.6: Crossfade. 0.6 -> 1: Green Visible.
    const mobileOpacityRed = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
    const mobileScaleRed = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]); // Slight shrink

    const mobileOpacityGreen = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
    const mobileScaleGreen = useTransform(scrollYProgress, [0.3, 1], [1.1, 1]); // Zoom in

    // Select based on device
    const problemOpacityDesktop = useTransform(scrollYProgress, [0, 1], [1, 1]);
    const problemScaleDesktop = useTransform(scrollYProgress, [0, 1], [1, 1]);
    const problemBlurDesktop = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(0px)"]);

    const revealClipPath = isMobile ? undefined : desktopClipPath;
    const problemOpacity = isMobile ? mobileOpacityRed : problemOpacityDesktop;
    const problemScale = isMobile ? mobileScaleRed : problemScaleDesktop;
    const problemBlur = isMobile ? "blur(0px)" : problemBlurDesktop;

    const solutionOpacity = isMobile ? mobileOpacityGreen : undefined;
    const solutionScale = isMobile ? mobileScaleGreen : undefined;

    // Slight Z push to ensure it stays behind properly
    const problemZ = useTransform(scrollYProgress, [0, 1], [0, 0]);

    // Light Sweep overlay during reveal
    const sweepX = useTransform(scrollYProgress, [0.1, 0.5], ["-100%", "200%"]);
    const sweepOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.4, 0.6], [0, 1, 1, 0]);

    // Simplified Solution Content timings for better persistence
    const solTitleY = useTransform(scrollYProgress, [0.2, 0.5, 0.9], [150, 0, 0]);
    const solTitleOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.9], [0, 1, 1]);

    const solParaY = useTransform(scrollYProgress, [0.3, 0.6, 0.9], [150, 0, 0]);
    const solParaOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.9], [0, 1, 1]);

    const solBtnY = useTransform(scrollYProgress, [0.4, 0.7, 0.9], [100, 0, 0]);
    const solBtnOpacity = useTransform(scrollYProgress, [0.4, 0.6, 0.9], [0, 1, 1]);

    // 3D Card Parallax
    const cardRotateX = useTransform(scrollYProgress, [0.1, 0.6], [10, 0]);
    const cardRotateY = useTransform(scrollYProgress, [0.1, 0.6], [20, 0]);

    // Kinetic Magnetic Text
    const scrollVelocity = useVelocity(scrollYProgress);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const textSkewX = useTransform(smoothVelocity, [-0.005, 0, 0.005], [-25, 0, 25]);

    const textLetterSpacing = useTransform(scrollYProgress, [0, 0.2], ["0.1em", "1.5em"]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [0.4, 1, 0]);
    const textScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.2]);

    return (
        <div ref={containerRef} className="relative w-full md:h-[160dvh] bg-[#022c22] mb-[-1px]">
            {/* STICKY CONTAINER: Frame for the transition (Desktop only) */}
            <div className="relative md:sticky md:top-0 md:h-[100dvh] w-full overflow-hidden">

                {/* 1. LAYER A: PROBLEM (Receding 3D) */}
                <motion.div
                    style={isMobile ? {
                        scale: 1,
                        filter: "blur(0px)",
                        opacity: 1,
                        z: 0,
                        transform: 'none'
                    } : {
                        scale: problemScale,
                        filter: problemBlur,
                        opacity: problemOpacity,
                        z: problemZ,
                        perspective: "1000px",
                        willChange: "transform"
                    }}
                    className="relative md:absolute inset-0 z-0 bg-gradient-to-b from-[#1a0505] to-[#0A0000] flex items-center justify-center p-4 md:p-8 min-h-[90vh] md:min-h-0"
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
                    <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-sm text-red-500/80 font-mono tracking-widest"
                            >
                                <span className="flex h-2 w-2 rounded-full bg-red-500 mr-2 animate-pulse" />
                                LEGACY SYSTEM DETECTED
                            </motion.div>
                            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
                                El <span className="text-red-600">Caos</span> <br />
                                <span className="text-white/40">Manual.</span>
                            </h2>
                            <p className="text-xl text-white/50 leading-relaxed max-w-lg font-light">
                                Tu operación te esclaviza. Leads que se pierden y procesos que dependen 100% de tu tiempo. No tienes un imperio, tienes un autoempleo agotador.
                            </p>
                        </div>

                        <div className="relative aspect-square max-w-[300px] md:max-w-none mx-auto md:mx-0">
                            <ChaosGroup scrollYProgress={scrollYProgress} isMobile={isMobile} />
                        </div>
                    </div>
                </motion.div>

                {/* 2. LAYER B: SOLUTION (Static "Portal" Reveal) */}
                <motion.div
                    style={isMobile ? {
                        clipPath: 'none',
                        opacity: 1,
                        transform: 'none',
                        position: 'relative'
                    } : {
                        clipPath: revealClipPath,
                        opacity: solutionOpacity, // Mobile Only
                        scale: solutionScale, // Mobile Only
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        willChange: isMobile ? "opacity, transform" : "clip-path"
                    }}
                    className="relative md:absolute z-10 bg-[#022c22] flex items-center justify-center border-t border-emerald-500/10 shadow-[0_-50px_100px_rgba(16,185,129,0.1)] min-h-[100vh] md:min-h-0 py-20 md:py-0"
                >
                    {/* Light Sweep Effect */}
                    <motion.div
                        style={{ x: sweepX, opacity: sweepOpacity }}
                        className="absolute inset-0 pointer-events-none z-50 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent skew-x-12"
                    />

                    {/* Premium Background for Solution */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#064e3b_0%,#022c22_100%)]" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

                    <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-20">
                        <div className="space-y-6 md:space-y-8">
                            <motion.div
                                style={isMobile ? {} : { opacity: solTitleOpacity, y: solTitleY }}
                                className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs text-emerald-400 font-mono tracking-[0.3em] uppercase"
                            >
                                <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-3 shadow-[0_0_12px_#10b981]" />
                                Next-Gen Infrastructure
                            </motion.div>
                            <motion.h2
                                style={isMobile ? {} : { opacity: solTitleOpacity, y: solTitleY }}
                                className="text-5xl md:text-9xl font-black tracking-tighter text-white leading-[0.85]"
                            >
                                Libertad <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500">
                                    Escalable.
                                </span>
                            </motion.h2>
                            <motion.p
                                style={isMobile ? {} : { opacity: solParaOpacity, y: solParaY }}
                                className="text-xl text-emerald-50 leading-relaxed max-w-lg"
                            >
                                Convertimos tu operación en un motor autónomo. Automatización de punta a punta para que dejes de trabajar EN tu negocio y empieces a trabajar SOBRE él.
                            </motion.p>

                            <motion.div style={isMobile ? {} : { opacity: solBtnOpacity, y: solBtnY }}>
                                <Button
                                    onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="bg-emerald-500 hover:bg-white text-black font-black rounded-full px-10 py-8 text-xl group transition-all duration-500 w-full md:w-auto"
                                >
                                    ESCALAR AHORA
                                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                </Button>
                            </motion.div>
                        </div>

                        {/* Order Metaphor Card */}
                        <motion.div
                            style={isMobile ? {} : { rotateX: cardRotateX, rotateY: cardRotateY, perspective: 1000 }}
                            className="relative perspective-2000 mt-8 md:mt-0"
                        >
                            <div className="absolute -inset-10 bg-emerald-500/20 blur-[120px] rounded-full animate-pulse" />
                            {/* Scale down on mobile to fit */}
                            <div className="origin-top-left md:origin-center scale-90 md:scale-100">
                                <SystemPulseCard />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* MAGNETIC PROGRESS INDICATOR */}
                <motion.div
                    style={{
                        letterSpacing: textLetterSpacing,
                        opacity: textOpacity,
                        scale: textScale,
                        skewX: textSkewX,
                        mixBlendMode: "difference"
                    }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white font-mono text-xs uppercase tracking-[0.5em] pointer-events-none whitespace-nowrap z-50"
                >
                    Scroll To Evolve
                </motion.div>
            </div>
        </div>
    );
}

const DEBRIS_COUNT = 8;
const MOBILE_DEBRIS_COUNT = 4; // Reduced for performance

interface DebrisData {
    id: number;
    xStart: number;
    yStart: number;
    xEnd: number;
    yEnd: number;
    rStart: number;
    rEnd: number;
    scaleStart: number;
    scaleEnd: number;
    Icon: ElementType;
    size: "md" | "lg";
    zDepth: number;
}

function ChaosGroup({ scrollYProgress, isMobile }: { scrollYProgress: MotionValue<number>, isMobile: boolean }) {
    const [debris, setDebris] = useState<DebrisData[]>([]);

    useEffect(() => {
        const count = isMobile ? MOBILE_DEBRIS_COUNT : DEBRIS_COUNT;
        const newDebris = Array.from({ length: count }).map((_, i) => ({
            id: i,
            xStart: (Math.random() - 0.5) * (isMobile ? 300 : 600), // Tighter spread on mobile
            yStart: (Math.random() - 0.5) * (isMobile ? 400 : 400),
            xEnd: (Math.random() - 0.5) * (isMobile ? 600 : 1200),
            yEnd: (Math.random() - 0.5) * (isMobile ? 800 : 1200),
            rStart: Math.random() * 360,
            rEnd: Math.random() * 720 * (Math.random() > 0.5 ? 1 : -1),
            scaleStart: isMobile ? (0.4 + Math.random() * 0.3) : (0.5 + Math.random() * 0.5), // Smaller on mobile
            scaleEnd: Math.random() * 0.5,
            Icon: [FileWarning, MessageCircleOff, Hourglass, AlertTriangle, Database, Zap, FileSpreadsheet][i % 7],
            size: ((isMobile ? Math.random() > 0.8 : Math.random() > 0.7) ? "lg" : "md") as "md" | "lg",
            zDepth: Math.random() * 500
        }));
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDebris(newDebris);
    }, [isMobile]); // Re-run whenever isMobile changes

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <div className="relative w-full h-full flex items-center justify-center pointer-events-none" style={{ perspective: "1000px" }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full animate-pulse" />

            {debris.map((item) => (
                <DebrisItem key={item.id} item={item} scrollYProgress={scrollYProgress} />
            ))}
        </div>
    );
}

function DebrisItem({ item, scrollYProgress }: { item: DebrisData, scrollYProgress: MotionValue<number> }) {
    const x = useTransform(scrollYProgress, [0, 1], [item.xStart, item.xEnd]);
    const y = useTransform(scrollYProgress, [0, 1], [item.yStart, item.yEnd]);
    const rotate = useTransform(scrollYProgress, [0, 1], [item.rStart, item.rEnd]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [item.scaleStart, item.scaleStart * 1.5, item.scaleEnd]);
    const z = useTransform(scrollYProgress, [0, 1], [0, item.zDepth]); // Fly towards/away camera

    return (
        <motion.div
            style={{ x, y, rotate, scale, z, position: 'absolute' }}
            className="will-change-transform"
        >
            <div className={`${item.size === 'lg' ? 'w-20 h-20' : 'w-12 h-12'} bg-red-950/40 border border-red-500/30 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-2xl`}>
                <item.Icon className="text-red-500/80 w-1/2 h-1/2" />
            </div>
        </motion.div>
    );
}

function SystemPulseCard() {
    return (
        <div className="relative w-full max-w-md bg-[#0A0A0A]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />

            <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                <div className="space-y-1">
                    <div className="text-[10px] font-mono text-emerald-500/60 uppercase tracking-widest">Core Status</div>
                    <div className="text-white font-bold tracking-tight">System Optimized</div>
                </div>
                <div className="h-4 w-4 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981]" />
            </div>

            <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex justify-between text-[10px] text-white/40 uppercase font-mono">
                            <span>Process {i}</span>
                            <span>100%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity, repeatDelay: 3 }}
                                className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 flex items-end justify-between">
                <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">Efficiency Gain</p>
                    <p className="text-4xl font-black text-white">+84%</p>
                </div>
                <div className="text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 text-xs font-mono">
                    READY TO SCALE
                </div>
            </div>
        </div>
    );
}

function ChaosCard({ icon: Icon, delay, size = "md" }: { icon: React.ElementType, delay: number, size?: "md" | "lg" }) {
    return (
        <div className={`${size === 'lg' ? 'w-48 h-48' : 'w-32 h-32'} bg-red-950/10 border border-red-900/20 rounded-3xl flex items-center justify-center animate-pulse backdrop-blur-sm group hover:border-red-500/50 transition-colors`} style={{ animationDelay: `${delay}s` }}>
            <Icon className={`${size === 'lg' ? 'w-12 h-12' : 'w-8 h-8'} text-red-600/60 group-hover:text-red-500 transition-colors`} />
        </div>
    );
}

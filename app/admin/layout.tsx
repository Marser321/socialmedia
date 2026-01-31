'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Briefcase,
    DollarSign,
    Users,
    Settings,
    LogOut,
    ExternalLink,
    Search,
    Bell,
    Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Home Config', icon: Settings, href: '/admin/home' },
    { name: 'Servicios', icon: Layers, href: '/admin/services' },
    { name: 'Portfolio', icon: Briefcase, href: '/admin/portfolio' },
    { name: 'Precios', icon: DollarSign, href: '/admin/pricing' },
    { name: 'Leads', icon: Users, href: '/admin/leads' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden">
            {/* Sidebar */}
            <aside className="w-72 bg-black border-r border-white/5 flex flex-col z-50">
                <div className="p-8">
                    <Link href="/admin" className="flex items-center gap-2 group">
                        <span className="text-2xl font-black tracking-tighter text-white">
                            NEXO
                            <span className="text-violet-500">.</span>
                            <span className="text-[10px] ml-1 text-white/40 uppercase tracking-widest font-bold">Admin</span>
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group relative",
                                    isActive
                                        ? "text-white bg-white/5 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]"
                                        : "text-white/40 hover:text-white hover:bg-white/[0.02]"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-nav"
                                        className="absolute left-0 w-1 h-6 bg-violet-600 rounded-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <item.icon className={cn("w-5 h-5", isActive ? "text-violet-500" : "group-hover:text-violet-400 transition-colors")} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 mt-auto space-y-2 border-t border-white/5">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/[0.02] transition-all group"
                    >
                        <ExternalLink className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                        Ver Sitio Público
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all group"
                    >
                        <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                {/* Header */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/50 backdrop-blur-xl z-40">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative w-96 group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-violet-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Buscar en el panel..."
                                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="text-white/40 hover:text-white relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-violet-600 rounded-full shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
                        </Button>
                        <div className="w-px h-6 bg-white/10 mx-2" />
                        <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-blue-500 p-px">
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-black text-xs">
                                    M
                                </div>
                            </div>
                            <span className="text-xs font-bold tracking-tight">Mario Morera</span>
                        </div>
                    </div>
                </header>

                {/* Dashboard Viewport */}
                <div className="flex-1 overflow-y-auto p-8 relative">
                    {/* Ambient Glow */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="relative z-10"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}

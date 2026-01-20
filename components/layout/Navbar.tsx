'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
    { name: 'Servicios', href: '#servicios' },
    { name: 'Planes', href: '#planes' },
    { name: 'Automatización', href: '#automatizacion' },
    { name: 'Portfolio', href: '#portfolio' },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled
                    ? 'py-4 bg-background/80 backdrop-blur-md border-b border-white/5 shadow-lg'
                    : 'py-6 bg-transparent'
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-shadow duration-300">
                        <span className="text-white font-bold text-lg">N</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white group-hover:text-glow transition-all">
                        Nexo
                    </span>
                </Link>

                {/* Desktop Nav - Absolutely Centered */}
                <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 group-hover:w-full transition-all duration-300" />
                        </Link>
                    ))}
                </nav>

                {/* CTA & Mobile Menu */}
                <div className="flex items-center gap-4">
                    <Button
                        className="hidden md:flex bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-full px-6 backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
                    >
                        <Rocket className="w-4 h-4 mr-2" />
                        Agenda tu Demo
                    </Button>

                    {/* Mobile Menu Trigger */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden text-white">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-2xl border-white/10">
                            <div className="flex flex-col gap-8 mt-8">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-lg font-medium text-white/80 hover:text-white hover:translate-x-2 transition-all"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <Button className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white rounded-full">
                                    Empezar Proyecto
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}

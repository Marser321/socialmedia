'use client';

import * as React from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Mail, Rocket } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const router = useRouter();

    const [isRegistering, setIsRegistering] = React.useState(false);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isRegistering) {
                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: 'Admin User',
                        },
                    },
                });
                if (signUpError) throw signUpError;
                setError('Registro exitoso. Revisa tu email o intenta loguear si las confirmaciones están desactivadas.');
                setLoading(false);
            } else {
                const { error: authError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (authError) throw authError;
                router.push('/admin');
            }
        } catch (err: any) {
            console.error('Auth error:', err);
            setError(err.message === 'Invalid login credentials' ? 'Credenciales inválidas' : err.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10 px-4"
            >
                <Card className="bg-black/40 border-white/10 backdrop-blur-xl shadow-2xl">
                    <CardHeader className="text-center space-y-4">
                        <div className="flex justify-center mb-2">
                            <div className="relative">
                                <div className="absolute inset-0 bg-violet-600 blur-lg opacity-50" />
                                <div className="relative bg-black border border-white/20 p-3 rounded-2xl">
                                    <Rocket className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </div>
                        <CardTitle className="text-3xl font-black text-white tracking-tighter uppercase">
                            {isRegistering ? 'Crear' : 'Admin'} <span className="text-violet-500">Nexo</span>
                        </CardTitle>
                        <CardDescription className="text-white/60 font-medium">
                            {isRegistering ? 'Configura tu acceso administrativo.' : 'Acceso restringido para el equipo de arquitectura.'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAuth} className="space-y-6">
                            <div className="space-y-4">
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-violet-500 transition-colors" />
                                    <Input
                                        type="email"
                                        placeholder="tu-email@ejemplo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-violet-500/50 transition-all rounded-xl"
                                        required
                                    />
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-violet-500 transition-colors" />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-violet-500/50 transition-all rounded-xl"
                                        required
                                    />
                                </div>
                            </div>

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-white/70 text-sm font-medium text-center bg-white/5 py-2 rounded-lg border border-white/10"
                                >
                                    {error}
                                </motion.p>
                            )}

                            <div className="space-y-4">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 bg-white text-black hover:bg-white/90 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.98]"
                                >
                                    {loading ? 'Procesando...' : (isRegistering ? 'Crear Cuenta' : 'Entrar al Panel')}
                                </Button>

                                <button
                                    type="button"
                                    onClick={() => setIsRegistering(!isRegistering)}
                                    className="w-full text-xs text-white/40 hover:text-white transition-colors"
                                >
                                    {isRegistering ? '¿Ya tienes cuenta? Ingresa aquí' : '¿Configurar nuevo acceso? Haz clic aquí'}
                                </button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}

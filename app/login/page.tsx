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

    React.useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                router.push('/admin');
            }
        };
        checkUser();
    }, [router]);

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (err: any) {
            console.error('Google Auth error:', err);
            setError(err.message);
            setLoading(false);
        }
    };

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
                        emailRedirectTo: `${window.location.origin}/auth/callback`,
                        data: {
                            full_name: 'Admin User',
                        },
                    },
                });
                if (signUpError) throw signUpError;
                setError('Registro iniciado. REVISA TU EMAIL para confirmar la cuenta (mira en SPAM).');
                setLoading(false);
            } else {
                const { error: authError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (authError) {
                    if (authError.message.includes('Email not confirmed')) {
                        throw new Error('EMAIL NO CONFIRMADO. Por favor, revisa tu bandeja de entrada o spam para activar tu cuenta.');
                    }
                    throw authError;
                }
                router.push('/admin');
            }
        } catch (err: any) {
            console.error('Auth error:', err);
            setError(err.message === 'Invalid login credentials' ? 'Correo o contraseña incorrectos' : err.message);
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
                    <CardContent className="space-y-6">
                        <Button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            variant="outline"
                            className="w-full h-12 bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl font-bold flex items-center justify-center gap-3 transition-all"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continuar con Google
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0A0A0A] px-2 text-white/30 font-mono">o usar email</span></div>
                        </div>

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
                                    className="text-white/90 text-xs font-medium text-center bg-violet-600/20 py-3 px-4 rounded-xl border border-violet-500/30 leading-relaxed"
                                >
                                    {error}
                                </motion.p>
                            )}

                            <div className="space-y-4">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 bg-white text-black hover:bg-white/90 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[0.98]"
                                >
                                    {loading ? 'Procesando...' : (isRegistering ? 'Crear Cuenta' : 'Entrar al Panel')}
                                </Button>

                                <button
                                    type="button"
                                    onClick={() => setIsRegistering(!isRegistering)}
                                    className="w-full text-xs text-white/40 hover:text-white transition-colors py-2"
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

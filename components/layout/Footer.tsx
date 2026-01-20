import Link from 'next/link';
import { Instagram, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-black py-12 border-t border-white/10 text-white/60">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="space-y-4">
                        <h3 className="text-white font-bold text-xl">Nexo</h3>
                        <p className="text-sm">Agencia de Transformación Digital.</p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Servicios</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">Desarrollo Web</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Automatización</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Producción Media</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Empresa</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">Sobre Nosotros</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Carreras</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Contacto</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Síguenos</h4>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-cyan-400 transition-colors"><Instagram className="w-5 h-5" /></Link>
                            <Link href="#" className="hover:text-blue-400 transition-colors"><Linkedin className="w-5 h-5" /></Link>
                            <Link href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></Link>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 text-center text-xs">
                    © {new Date().getFullYear()} Nexo Digital Agency. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}

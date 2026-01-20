'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import { Servicio } from "@/types";

interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    service: Servicio | null;
}

export function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
    if (!service) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] bg-[#0F0F1A] border-white/10 text-white backdrop-blur-xl">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="border-violet-500/50 text-violet-300 capitalize">
                            {service.pilar}
                        </Badge>
                        {service.precio_base && (
                            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                                Desde ${service.precio_base}
                            </Badge>
                        )}
                    </div>
                    <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        {service.nombre}
                    </DialogTitle>
                    <DialogDescription className="text-white/90 text-lg mt-4 leading-relaxed font-light tracking-wide">
                        {service.descripcion}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 space-y-4">
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                        Características del Servicio
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.caracteristicas.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm text-white/70">
                                <div className="mt-1 w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                                    <Check className="w-2.5 h-2.5 text-green-400" />
                                </div>
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {service.tecnologias && service.tecnologias.length > 0 && (
                    <div className="py-5 border-t border-white/10 bg-white/5 -mx-6 px-6 mt-4">
                        <h4 className="text-sm font-bold text-blue-300 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                            Software & Tecnología
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {service.tecnologias.map((tech, idx) => (
                                <Badge key={idx} variant="secondary" className="bg-white/5 hover:bg-white/10 text-white/90 border border-white/10 px-3 py-1">
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                        <p className="text-sm text-white/60 mt-3 leading-relaxed">
                            Ponemos a tu disposición este stack de <span className="text-white/80 font-medium">nivel empresarial</span>.
                            Nuestros workflows ya configurados aseguran integración directa y resultados profesionales.
                        </p>
                    </div>
                )}

                <DialogFooter className="flex-col sm:flex-row gap-3">
                    <Button variant="outline" onClick={onClose} className="border-white/10 hover:bg-white/5 text-white">
                        Cerrar
                    </Button>
                    <Button className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white border-0 shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                        Contratar Servicio
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

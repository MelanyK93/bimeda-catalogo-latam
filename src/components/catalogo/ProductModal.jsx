import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Package, MapPin, Pill, Syringe } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProductModal({ producto, isOpen, onClose }) {
  if (!producto) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {producto.imagen_url ? (
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-6 flex items-center justify-center">
                  <img 
                    src={producto.imagen_url} 
                    alt={producto.nombre}
                    className="max-h-64 object-contain"
                  />
                </div>
              ) : (
                <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-xl p-6 flex items-center justify-center h-64">
                  <Package className="w-24 h-24 text-blue-400" />
                </div>
              )}

              <div>
                <DialogHeader className="mb-4">
                  <DialogTitle className="text-2xl font-bold text-slate-800 mb-2">
                    {producto.nombre}
                  </DialogTitle>
                  {producto.categoria && (
                    <Badge className="w-fit bg-blue-600 text-white">
                      {producto.categoria}
                    </Badge>
                  )}
                </DialogHeader>

                {producto.presentacion && (
                  <div className="flex items-center gap-2 text-slate-600 mb-4">
                    <Syringe className="w-4 h-4" />
                    <span className="text-sm font-medium">{producto.presentacion}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <Pill className="w-5 h-5 text-blue-600" />
                  Descripción / Composición
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {producto.descripcion}
                </p>
              </div>

              {producto.especies && producto.especies.length > 0 && (
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3">Especies</h3>
                  <div className="flex flex-wrap gap-2">
                    {producto.especies.map((especie, idx) => (
                      <Badge 
                        key={idx}
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        {especie}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {producto.paises && producto.paises.length > 0 && (
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Disponibilidad por País
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {producto.paises.map((pais, idx) => (
                      <Badge 
                        key={idx}
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {pais}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {producto.ficha_tecnica && (
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Información Técnica</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {producto.ficha_tecnica}
                  </p>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
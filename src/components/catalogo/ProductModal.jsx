import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, MapPin, Pill, Syringe, Download, FileText, Image as ImageIcon, File } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const REGIONES = [
  { key: "materiales_mexico", label: "México", color: "bg-red-500" },
  { key: "materiales_camcar", label: "CAMCAR", color: "bg-rose-500" },
  { key: "materiales_suramerica", label: "Suramérica", color: "bg-red-600" },
  { key: "materiales_brasil", label: "Brasil", color: "bg-red-700" },
];

const TIPOS_MATERIAL = [
  { key: "ficha_tecnica", label: "Ficha Técnica", icon: FileText },
  { key: "flyer", label: "Material Publicitario", icon: File },
  { key: "material_apoyo", label: "Material de Apoyo", icon: FileText },
  { key: "logotipo", label: "Logotipo", icon: ImageIcon },
];

export default function ProductModal({ producto, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("info");

  if (!producto) return null;

  const tieneMateriales = REGIONES.some(region => 
    producto[region.key] && Object.keys(producto[region.key]).length > 0
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="info">Información del Producto</TabsTrigger>
                <TabsTrigger value="materiales">
                  <Download className="w-4 h-4 mr-2" />
                  Material de Producto
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info">
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
                    <div className="bg-gradient-to-br from-red-100 to-rose-100 rounded-xl p-6 flex items-center justify-center h-64">
                      <Package className="w-24 h-24 text-red-400" />
                    </div>
                  )}

                  <div>
                    <DialogHeader className="mb-4">
                      <DialogTitle className="text-2xl font-bold text-slate-800 mb-2">
                        {producto.nombre}
                      </DialogTitle>
                      {producto.categoria && (
                        <Badge className="w-fit bg-red-600 text-white">
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
                      <Pill className="w-5 h-5 text-red-600" />
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
                            className="bg-red-50 text-red-700 border-red-200"
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
                        <MapPin className="w-5 h-5 text-red-600" />
                        Disponibilidad por País
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {producto.paises.map((pais, idx) => (
                          <Badge 
                            key={idx}
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200"
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
              </TabsContent>

              <TabsContent value="materiales">
                {!tieneMateriales ? (
                  <div className="text-center py-16">
                    <Download className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      No hay materiales disponibles
                    </h3>
                    <p className="text-slate-600">
                      Este producto aún no tiene materiales de venta cargados.
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {REGIONES.map((region) => {
                      const materiales = producto[region.key];
                      if (!materiales || Object.keys(materiales).length === 0) return null;

                      return (
                        <Card key={region.key} className="border-2 border-slate-200">
                          <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${region.color}`} />
                              <CardTitle className="text-lg">{region.label}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {TIPOS_MATERIAL.map((tipo) => {
                              const url = materiales[tipo.key];
                              if (!url) return null;

                              const Icon = tipo.icon;
                              const fileName = url.split('/').pop();

                              return (
                                <a
                                  key={tipo.key}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block"
                                >
                                  <div className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-red-50 rounded-lg border border-slate-200 hover:border-red-300 transition-all group">
                                    <Icon className="w-5 h-5 text-slate-500 group-hover:text-red-600 transition-colors" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-slate-800 group-hover:text-red-600 transition-colors">
                                        {tipo.label}
                                      </p>
                                      <p className="text-xs text-slate-500 truncate">{fileName}</p>
                                    </div>
                                    <Download className="w-4 h-4 text-slate-400 group-hover:text-red-600 transition-colors" />
                                  </div>
                                </a>
                              );
                            })}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>💡 Tip:</strong> Haz clic en cualquier material para descargarlo. Los materiales están organizados por región para tu comodidad.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
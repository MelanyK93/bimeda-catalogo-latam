
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Package, MapPin } from "lucide-react";

export default function ProductCard({ producto, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-red-300 bg-white/90 backdrop-blur-sm overflow-hidden h-full"
        onClick={onClick}
      >
        <div className="relative">
          {producto.imagen_url ? (
            <div className="h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
              <img 
                src={producto.imagen_url} 
                alt={producto.nombre}
                className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ) : (
            <div className="h-48 bg-gradient-to-br from-red-100 to-rose-100 flex items-center justify-center">
              <Package className="w-16 h-16 text-red-400" />
            </div>
          )}
          
          {producto.categoria && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-red-600 text-white shadow-lg">
                {producto.categoria}
              </Badge>
            </div>
          )}
        </div>

        <CardHeader className="pb-3">
          <h3 className="font-bold text-lg text-slate-800 group-hover:text-red-600 transition-colors line-clamp-2">
            {producto.nombre}
          </h3>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-sm text-slate-600 line-clamp-2">
            {producto.descripcion}
          </p>

          {producto.especies && producto.especies.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {producto.especies.slice(0, 3).map((especie, idx) => (
                <Badge 
                  key={idx} 
                  variant="outline" 
                  className="text-xs bg-red-50 text-red-700 border-red-200"
                >
                  {especie}
                </Badge>
              ))}
              {producto.especies.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{producto.especies.length - 3}
                </Badge>
              )}
            </div>
          )}

          {producto.paises && producto.paises.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="w-3 h-3" />
              <span>{producto.paises.length} {producto.paises.length === 1 ? 'país' : 'países'}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

import React from "react";
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const paises = [
  { nombre: "México", bandera: "🇲🇽", url: null },
  { nombre: "Guatemala", bandera: "🇬🇹", url: null },
  { nombre: "El Salvador", bandera: "🇸🇻", url: null },
  { nombre: "Honduras", bandera: "🇭🇳", url: null },
  { nombre: "Nicaragua", bandera: "🇳🇮", url: null },
  { nombre: "Costa Rica", bandera: "🇨🇷", url: null },
  { nombre: "Panamá", bandera: "🇵🇦", url: null },
  { nombre: "Colombia", bandera: "🇨🇴", url: null },
  { nombre: "Ecuador", bandera: "🇪🇨", url: null },
  { nombre: "Perú", bandera: "🇵🇪", url: null },
  { nombre: "Bolivia", bandera: "🇧🇴", url: null },
  { nombre: "Paraguay", bandera: "🇵🇾", url: null },
  { nombre: "Uruguay", bandera: "🇺🇾", url: null },
  { nombre: "Venezuela", bandera: "🇻🇪", url: null },
  { nombre: "Argentina", bandera: "🇦🇷", url: null },
  { nombre: "Brasil", bandera: "🇧🇷", url: null },
];

export default function DescargaCatalogo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-rose-50 p-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
              Descargar Catálogo por País
            </h1>
            <p className="text-slate-600 text-lg">
              Selecciona el país para descargar el catálogo de productos disponibles
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {paises.map((pais, index) => (
              <motion.div
                key={pais.nombre}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * index }}
              >
                <Card className="bg-white/80 border-2 border-transparent hover:border-red-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                    <span className="text-4xl">{pais.bandera}</span>
                    <h3 className="font-semibold text-slate-800 text-sm">{pais.nombre}</h3>
                    <Button
                      size="sm"
                      disabled={!pais.url}
                      onClick={() => pais.url && window.open(pais.url, "_blank")}
                      className="w-full bg-red-600 hover:bg-red-700 text-white disabled:opacity-40"
                    >
                      <FileDown className="w-4 h-4 mr-1" />
                      {pais.url ? "Descargar" : "Próximamente"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
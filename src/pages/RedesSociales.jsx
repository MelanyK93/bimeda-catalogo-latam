import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Globe, MapPin, Facebook, Instagram, Linkedin, Youtube, Mail, Phone } from "lucide-react";

const regiones = [
  {
    nombre: "Bimeda México",
    pais: "México",
    descripcion: "Oficinas centrales y distribución para México",
    website: "https://www.bimeda.mx",
    color: "from-red-500 to-red-600",
    redes: [
      { nombre: "Facebook", url: "https://www.facebook.com/BimedaMexico", icon: Facebook },
      { nombre: "Instagram", url: "https://www.instagram.com/bimedamexico", icon: Instagram },
      { nombre: "LinkedIn", url: "https://www.linkedin.com/company/bimeda", icon: Linkedin },
    ],
    contacto: {
      email: "info@bimeda.mx",
      telefono: "+52 (55) 1234-5678"
    }
  },
  {
    nombre: "Bimeda CAMCAR",
    pais: "Centroamérica y Caribe",
    descripcion: "Guatemala, Honduras, El Salvador, Nicaragua, Costa Rica, Panamá y Caribe",
    website: "https://bimeda.gt",
    color: "from-rose-500 to-rose-600",
    redes: [
      { nombre: "Facebook", url: "https://www.facebook.com/BimedaCAMCAR", icon: Facebook },
      { nombre: "Instagram", url: "https://www.instagram.com/bimedacamcar", icon: Instagram },
    ],
    contacto: {
      email: "info@bimeda.gt",
      telefono: "+502 1234-5678"
    }
  },
  {
    nombre: "Bimeda Suramérica",
    pais: "América del Sur",
    descripcion: "Colombia, Ecuador, Perú, Venezuela, Bolivia, Paraguay, Uruguay, Argentina",
    website: "https://www.bimedasuramerica.com",
    color: "from-red-600 to-red-700",
    redes: [
      { nombre: "Facebook", url: "https://www.facebook.com/BimedaSuramerica", icon: Facebook },
      { nombre: "Instagram", url: "https://www.instagram.com/bimedasuramerica", icon: Instagram },
      { nombre: "LinkedIn", url: "https://www.linkedin.com/company/bimeda-suramerica", icon: Linkedin },
      { nombre: "YouTube", url: "https://www.youtube.com/@bimedasuramerica", icon: Youtube },
    ],
    contacto: {
      email: "info@bimedasuramerica.com",
      telefono: "+57 (1) 234-5678"
    }
  },
  {
    nombre: "Bimeda Brasil",
    pais: "Brasil",
    descripcion: "Oficinas y distribución para todo Brasil",
    website: "https://www.bimeda.com.br",
    color: "from-red-700 to-red-800",
    redes: [
      { nombre: "Facebook", url: "https://www.facebook.com/BimedaBrasil", icon: Facebook },
      { nombre: "Instagram", url: "https://www.instagram.com/bimedabrasil", icon: Instagram },
      { nombre: "LinkedIn", url: "https://www.linkedin.com/company/bimeda-brasil", icon: Linkedin },
    ],
    contacto: {
      email: "contato@bimeda.com.br",
      telefono: "+55 (11) 1234-5678"
    }
  },
];

export default function RedesSociales() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-rose-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
            Redes Sociales y Contacto
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Conéctate con Bimeda en tu región. Síguenos en nuestras redes sociales y mantente actualizado.
          </p>
        </motion.div>

        {/* Regiones Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {regiones.map((region, index) => (
            <motion.div
              key={region.nombre}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/90 backdrop-blur-sm border-2 border-slate-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl overflow-hidden h-full">
                <div className={`h-2 bg-gradient-to-r ${region.color}`} />
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <CardTitle className="text-2xl font-bold text-slate-800 mb-1">
                        {region.nombre}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">{region.pais}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">{region.descripcion}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Website */}
                  <div>
                    <a
                      href={region.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      Visitar sitio web
                    </a>
                  </div>

                  {/* Redes Sociales */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700 mb-3">Redes Sociales</h3>
                    <div className="flex flex-wrap gap-2">
                      {region.redes.map((red) => {
                        const Icon = red.icon;
                        return (
                          <a
                            key={red.nombre}
                            href={red.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all"
                            >
                              <Icon className="w-4 h-4 mr-2" />
                              {red.nombre}
                            </Button>
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {/* Contacto */}
                  <div className="pt-4 border-t border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-700 mb-3">Contacto</h3>
                    <div className="space-y-2">
                      <a
                        href={`mailto:${region.contacto.email}`}
                        className="flex items-center gap-2 text-sm text-slate-600 hover:text-red-600 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        {region.contacto.email}
                      </a>
                      <a
                        href={`tel:${region.contacto.telefono.replace(/\s/g, '')}`}
                        className="flex items-center gap-2 text-sm text-slate-600 hover:text-red-600 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        {region.contacto.telefono}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-red-600 to-red-700 border-0 text-white">
            <CardContent className="p-8 text-center">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691343752dd769d27639030b/956eafb9a_Bimeda_Logo_white-text.png"
                alt="Bimeda"
                className="h-12 mx-auto mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">Bimeda - Salud Animal</h3>
              <p className="text-red-100 max-w-2xl mx-auto">
                Productos veterinarios de calidad para el cuidado y bienestar de los animales en toda Latinoamérica.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
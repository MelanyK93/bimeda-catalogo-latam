import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Search, Globe } from "lucide-react";
import { motion } from "framer-motion";

const especies = [
  { nombre: "Bovinos", icon: "🐄", color: "from-amber-400 to-orange-500" },
  { nombre: "Equinos", icon: "🐴", color: "from-blue-400 to-indigo-500" },
  { nombre: "Porcinos", icon: "🐷", color: "from-pink-400 to-rose-500" },
  { nombre: "Ovinos", icon: "🐑", color: "from-slate-300 to-slate-500" },
  { nombre: "Caninos", icon: "🐕", color: "from-yellow-400 to-amber-500" },
  { nombre: "Felinos", icon: "🐈", color: "from-purple-400 to-violet-500" },
  { nombre: "Aves", icon: "🐔", color: "from-red-400 to-orange-500" },
  { nombre: "Caprinos", icon: "🐐", color: "from-green-400 to-emerald-500" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-green-600 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block mb-6">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto border-4 border-white/30 shadow-2xl">
                <span className="text-5xl font-bold">B</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Catálogo Digital Bimeda
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Productos veterinarios de calidad para distribuidores y vendedores
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Catalogo")}>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl text-lg px-8 py-6">
                  <Package className="w-5 h-5 mr-2" />
                  Ver Catálogo Completo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl("Busqueda")}>
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 text-lg px-8 py-6">
                  <Search className="w-5 h-5 mr-2" />
                  Búsqueda Avanzada
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(248, 250, 252)"/>
          </svg>
        </div>
      </div>

      {/* Especies Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
              Productos por Especie
            </h2>
            <p className="text-slate-600 text-lg">
              Encuentra productos específicos para cada tipo de animal
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
            {especies.map((especie, index) => (
              <motion.div
                key={especie.nombre}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link to={`${createPageUrl("Catalogo")}?especie=${especie.nombre}`}>
                  <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 bg-white/80 backdrop-blur-sm overflow-hidden">
                    <CardContent className="p-6 text-center">
                      <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${especie.color} flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {especie.icon}
                      </div>
                      <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors">
                        {especie.nombre}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
              <CardContent className="p-6">
                <Package className="w-12 h-12 mb-3 opacity-80" />
                <h3 className="text-3xl font-bold mb-1">100+</h3>
                <p className="text-blue-100">Productos disponibles</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl">
              <CardContent className="p-6">
                <Globe className="w-12 h-12 mb-3 opacity-80" />
                <h3 className="text-3xl font-bold mb-1">11</h3>
                <p className="text-green-100">Países en Latinoamérica</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
              <CardContent className="p-6">
                <Search className="w-12 h-12 mb-3 opacity-80" />
                <h3 className="text-3xl font-bold mb-1">14</h3>
                <p className="text-purple-100">Categorías de productos</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
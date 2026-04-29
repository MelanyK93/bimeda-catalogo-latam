import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Search, Globe, FileDown, ChevronDown, Zap, Shield, Star } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const especies = [
  { nombre: "Bovinos", icon: "🐄", color: "from-amber-400 to-orange-500" },
  { nombre: "Equinos", icon: "🐴", color: "from-red-400 to-rose-500" },
  { nombre: "Porcinos", icon: "🐷", color: "from-pink-400 to-rose-500" },
  { nombre: "Ovinos", icon: "🐑", color: "from-slate-300 to-slate-500" },
  { nombre: "Caninos", icon: "🐕", color: "from-yellow-400 to-amber-500" },
  { nombre: "Felinos", icon: "🐈", color: "from-purple-400 to-violet-500" },
  { nombre: "Aves", icon: "🐔", color: "from-red-400 to-orange-500" },
  { nombre: "Caprinos", icon: "🐐", color: "from-green-400 to-emerald-500" },
];

const stats = [
  { label: "Productos", value: "100+", icon: Package, desc: "disponibles en el catálogo" },
  { label: "Países", value: "11", icon: Globe, desc: "en Latinoamérica" },
  { label: "Categorías", value: "14", icon: Star, desc: "de productos especializados" },
];

const features = [
  { icon: Zap, title: "Acceso Rápido", desc: "Encuentra cualquier producto en segundos con nuestra búsqueda avanzada." },
  { icon: Shield, title: "Calidad Garantizada", desc: "Productos veterinarios certificados y avalados por Bimeda." },
  { icon: Globe, title: "Cobertura Regional", desc: "Materiales y fichas técnicas organizados por país y región." },
];

export default function Home() {
  const [activeEspecie, setActiveEspecie] = useState(null);
  const [countedStats, setCountedStats] = useState([0, 0, 0]);

  useEffect(() => {
    const timers = stats.map((stat, i) => {
      const target = parseInt(stat.value);
      if (isNaN(target)) return null;
      let start = 0;
      const step = Math.ceil(target / 40);
      const interval = setInterval(() => {
        start += step;
        if (start >= target) {
          setCountedStats(prev => { const n = [...prev]; n[i] = target; return n; });
          clearInterval(interval);
        } else {
          setCountedStats(prev => { const n = [...prev]; n[i] = start; return n; });
        }
      }, 30);
      return interval;
    });
    return () => timers.forEach(t => t && clearInterval(t));
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-rose-700">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl"
            animate={{ scale: [1, 1.15, 1], rotate: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-rose-900/30 blur-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, -15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-red-800/20 blur-3xl"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691343752dd769d27639030b/956eafb9a_Bimeda_Logo_white-text.png"
              alt="Bimeda"
              className="h-16 md:h-20 mx-auto drop-shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium tracking-wide">
              Catálogo Digital de Productos Veterinarios
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-5 leading-tight tracking-tight">
              Todo lo que<br />
              <span className="text-amber-300">necesitas,</span><br />
              en un solo lugar.
            </h1>
            <p className="text-lg md:text-xl text-red-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Accede a fichas técnicas, materiales de apoyo y información detallada de todos nuestros productos para Latinoamérica.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link to={createPageUrl("Catalogo")}>
              <Button size="lg" className="bg-white text-red-600 hover:bg-amber-50 shadow-2xl text-base font-bold px-8 py-6 rounded-2xl group">
                <Package className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Ver Catálogo
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to={createPageUrl("Busqueda")}>
              <Button size="lg" className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/25 hover:bg-white/20 text-base font-bold px-8 py-6 rounded-2xl">
                <Search className="w-5 h-5 mr-2" />
                Búsqueda Avanzada
              </Button>
            </Link>
            <Link to={createPageUrl("DescargaCatalogo")}>
              <Button size="lg" className="bg-amber-400 hover:bg-amber-500 text-amber-900 font-bold text-base px-8 py-6 rounded-2xl shadow-xl">
                <FileDown className="w-5 h-5 mr-2" />
                Descargar por País
              </Button>
            </Link>
          </motion.div>

          {/* Stats inline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-10 md:gap-20"
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-black text-white">
                  {countedStats[i]}{stat.value.includes("+") ? "+" : ""}
                </p>
                <p className="text-xs md:text-sm text-red-200 mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-white/50" />
        </motion.div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L480 40L960 60L1440 20V80H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-3">
              Diseñado para tu equipo de ventas
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Toda la información que necesitas, organizada y al alcance de un clic.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group p-8 rounded-3xl border-2 border-slate-100 hover:border-red-200 hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ESPECIES ── */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-3">
              Explora por Especie
            </h2>
            <p className="text-slate-500 text-lg">
              Selecciona una especie para ver los productos indicados
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
            {especies.map((especie, i) => (
              <motion.div
                key={especie.nombre}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                whileHover={{ y: -6 }}
              >
                <Link to={`${createPageUrl("Catalogo")}?especie=${especie.nombre}`}>
                  <div className="relative group cursor-pointer rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
                    <div className={`absolute inset-0 bg-gradient-to-br ${especie.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    <div className="p-6 text-center">
                      <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${especie.color} flex items-center justify-center text-3xl md:text-4xl shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        {especie.icon}
                      </div>
                      <h3 className="font-bold text-base md:text-lg text-slate-800 group-hover:text-red-600 transition-colors">
                        {especie.nombre}
                      </h3>
                      <div className="mt-2 flex items-center justify-center gap-1 text-xs text-slate-400 group-hover:text-red-500 transition-colors">
                        <span>Ver productos</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-rose-700 p-10 md:p-16 text-center shadow-2xl"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-rose-900/30 blur-2xl" />
            </div>
            <div className="relative z-10">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691343752dd769d27639030b/956eafb9a_Bimeda_Logo_white-text.png"
                alt="Bimeda"
                className="h-10 mx-auto mb-6 opacity-90"
              />
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                ¿Listo para explorar<br />el catálogo completo?
              </h2>
              <p className="text-red-100 text-lg mb-8 max-w-xl mx-auto">
                Accede a toda la información de productos, materiales de apoyo y fichas técnicas por región.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={createPageUrl("Catalogo")}>
                  <Button size="lg" className="bg-white text-red-600 hover:bg-amber-50 font-bold text-base px-10 py-6 rounded-2xl shadow-xl group">
                    <Package className="w-5 h-5 mr-2" />
                    Ver Catálogo
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to={createPageUrl("DescargaCatalogo")}>
                  <Button size="lg" className="bg-amber-400 hover:bg-amber-500 text-amber-900 font-bold text-base px-10 py-6 rounded-2xl shadow-xl">
                    <FileDown className="w-5 h-5 mr-2" />
                    Descargar por País
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
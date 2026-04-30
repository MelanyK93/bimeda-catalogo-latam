import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

import ProductCard from "../components/catalogo/ProductCard";
import ProductModal from "../components/catalogo/ProductModal";

export default function Catalogo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEspecie, setSelectedEspecie] = useState("all");
  const [selectedCategoria, setSelectedCategoria] = useState("all");
  const [selectedPais, setSelectedPais] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const especieParam = urlParams.get("especie");
  const productoParam = urlParams.get("producto");

  useEffect(() => {
    if (especieParam) {
      setSelectedEspecie(especieParam);
    }
  }, [especieParam]);

  const { data: productos, isLoading } = useQuery({
    queryKey: ['productos'],
    queryFn: () => base44.entities.Producto.list('-created_date'),
    initialData: [],
  });

  useEffect(() => {
    if (productoParam && productos.length > 0) {
      const found = productos.find(p => p.id === productoParam);
      if (found) {
        setSelectedProduct(found);
        setShowModal(true);
      }
    }
  }, [productoParam, productos]);

  const filteredProducts = productos.filter(producto => {
    const matchesSearch = producto.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         producto.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEspecie = selectedEspecie === "all" || 
                          producto.especies?.includes(selectedEspecie);
    
    const matchesCategoria = selectedCategoria === "all" || 
                            producto.categoria === selectedCategoria;
    
    const matchesPais = selectedPais === "all" || 
                       producto.paises?.includes(selectedPais);

    return matchesSearch && matchesEspecie && matchesCategoria && matchesPais;
  });

  const handleProductClick = (producto) => {
    setSelectedProduct(producto);
    setShowModal(true);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedEspecie("all");
    setSelectedCategoria("all");
    setSelectedPais("all");
  };

  const activeFiltersCount = [selectedEspecie, selectedCategoria, selectedPais].filter(f => f !== "all").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-rose-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            Catálogo de Productos
          </h1>
          <p className="text-slate-500">
            Explora nuestra línea completa de productos veterinarios
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-6 mb-8 border border-slate-100">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            <Select value={selectedEspecie} onValueChange={setSelectedEspecie}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Todas las especies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las especies</SelectItem>
                <SelectItem value="Bovinos">Bovinos</SelectItem>
                <SelectItem value="Equinos">Equinos</SelectItem>
                <SelectItem value="Porcinos">Porcinos</SelectItem>
                <SelectItem value="Ovinos">Ovinos</SelectItem>
                <SelectItem value="Caprinos">Caprinos</SelectItem>
                <SelectItem value="Caninos">Caninos</SelectItem>
                <SelectItem value="Felinos">Felinos</SelectItem>
                <SelectItem value="Aves">Aves</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCategoria} onValueChange={setSelectedCategoria}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="Antibióticos">Antibióticos</SelectItem>
                <SelectItem value="Antiinflamatorios">Antiinflamatorios</SelectItem>
                <SelectItem value="Desparasitantes">Desparasitantes</SelectItem>
                <SelectItem value="Vitaminas y Minerales">Vitaminas y Minerales</SelectItem>
                <SelectItem value="Hormonales">Hormonales</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPais} onValueChange={setSelectedPais}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Todos los países" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los países</SelectItem>
                <SelectItem value="México">México</SelectItem>
                <SelectItem value="Brasil">Brasil</SelectItem>
                <SelectItem value="Argentina">Argentina</SelectItem>
                <SelectItem value="Colombia">Colombia</SelectItem>
                <SelectItem value="Perú">Perú</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {activeFiltersCount > 0 && (
            <div className="mt-4 flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-600">Filtros activos:</span>
              <Badge variant="secondary">{activeFiltersCount}</Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="ml-auto text-slate-600 hover:text-slate-800"
              >
                <X className="w-4 h-4 mr-1" />
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>

        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600">
            Mostrando <span className="font-semibold text-slate-800">{filteredProducts.length}</span> producto{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-96 animate-pulse shadow-sm" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No se encontraron productos</h3>
            <p className="text-slate-600 mb-4">Intenta ajustar los filtros de búsqueda</p>
            <Button onClick={clearFilters} variant="outline">
              Limpiar filtros
            </Button>
          </div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06 } }
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((producto) => (
                <ProductCard
                  key={producto.id}
                  producto={producto}
                  onClick={() => handleProductClick(producto)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <ProductModal
        producto={selectedProduct}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
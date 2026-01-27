import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, X, Filter } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

import ProductCard from "../components/catalogo/ProductCard";
import ProductModal from "../components/catalogo/ProductModal";

export default function Busqueda() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEspecies, setSelectedEspecies] = useState([]);
  const [selectedCategorias, setSelectedCategorias] = useState([]);
  const [selectedPaises, setSelectedPaises] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { data: productos, isLoading } = useQuery({
    queryKey: ['productos'],
    queryFn: () => base44.entities.Producto.list('-created_date'),
    initialData: [],
  });

  const especies = ["Bovinos", "Equinos", "Porcinos", "Ovinos", "Caprinos", "Caninos", "Felinos", "Aves"];
  const categorias = ["Antibióticos", "Antiinflamatorios", "Desparasitantes", "Vitaminas y Minerales", "Hormonales"];
  const paises = ["México", "Guatemala", "El Salvador", "Nicaragua", "Panamá", "Costa Rica", "Honduras", "Brasil", "Argentina", "Colombia", "Perú", "Ecuador", "Uruguay"];

  const toggleSelection = (item, selectedArray, setSelectedArray) => {
    if (selectedArray.includes(item)) {
      setSelectedArray(selectedArray.filter(i => i !== item));
    } else {
      setSelectedArray([...selectedArray, item]);
    }
  };

  const filteredProducts = productos.filter(producto => {
    const matchesSearch = producto.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         producto.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEspecies = selectedEspecies.length === 0 || 
                           selectedEspecies.some(e => producto.especies?.includes(e));
    
    const matchesCategorias = selectedCategorias.length === 0 || 
                             selectedCategorias.includes(producto.categoria);
    
    const matchesPaises = selectedPaises.length === 0 || 
                         selectedPaises.some(p => producto.paises?.includes(p));

    return matchesSearch && matchesEspecies && matchesCategorias && matchesPaises;
  });

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedEspecies([]);
    setSelectedCategorias([]);
    setSelectedPaises([]);
  };

  const totalFilters = selectedEspecies.length + selectedCategorias.length + selectedPaises.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-rose-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            Búsqueda Avanzada
          </h1>
          <p className="text-slate-600">
            Utiliza filtros múltiples para encontrar productos específicos
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
              <CardHeader className="border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filtros
                  </CardTitle>
                  {totalFilters > 0 && (
                    <Badge variant="secondary">{totalFilters}</Badge>
                  )}
                </div>
                {totalFilters > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="w-full mt-2 text-slate-600"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Limpiar todo
                  </Button>
                )}
              </CardHeader>
              <CardContent className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                {/* Search */}
                <div>
                  <Label className="text-sm font-semibold text-slate-700 mb-2 block">
                    Búsqueda por texto
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                {/* Especies */}
                <div>
                  <Label className="text-sm font-semibold text-slate-700 mb-3 block">
                    Especies
                  </Label>
                  <div className="space-y-2">
                    {especies.map((especie) => (
                      <div key={especie} className="flex items-center space-x-2">
                        <Checkbox
                          id={`especie-${especie}`}
                          checked={selectedEspecies.includes(especie)}
                          onCheckedChange={() => toggleSelection(especie, selectedEspecies, setSelectedEspecies)}
                        />
                        <label
                          htmlFor={`especie-${especie}`}
                          className="text-sm text-slate-700 cursor-pointer"
                        >
                          {especie}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Categorías */}
                <div>
                  <Label className="text-sm font-semibold text-slate-700 mb-3 block">
                    Categorías
                  </Label>
                  <div className="space-y-2">
                    {categorias.map((categoria) => (
                      <div key={categoria} className="flex items-center space-x-2">
                        <Checkbox
                          id={`categoria-${categoria}`}
                          checked={selectedCategorias.includes(categoria)}
                          onCheckedChange={() => toggleSelection(categoria, selectedCategorias, setSelectedCategorias)}
                        />
                        <label
                          htmlFor={`categoria-${categoria}`}
                          className="text-sm text-slate-700 cursor-pointer"
                        >
                          {categoria}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Países */}
                <div>
                  <Label className="text-sm font-semibold text-slate-700 mb-3 block">
                    Países
                  </Label>
                  <div className="space-y-2">
                    {paises.map((pais) => (
                      <div key={pais} className="flex items-center space-x-2">
                        <Checkbox
                          id={`pais-${pais}`}
                          checked={selectedPaises.includes(pais)}
                          onCheckedChange={() => toggleSelection(pais, selectedPaises, setSelectedPaises)}
                        />
                        <label
                          htmlFor={`pais-${pais}`}
                          className="text-sm text-slate-700 cursor-pointer"
                        >
                          {pais}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200">
              <p className="text-slate-600">
                Mostrando <span className="font-semibold text-slate-800">{filteredProducts.length}</span> resultado{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl h-96 animate-pulse" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200"
              >
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">No se encontraron productos</h3>
                <p className="text-slate-600 mb-4">Intenta ajustar los filtros de búsqueda</p>
                <Button onClick={clearAllFilters} variant="outline">
                  Limpiar todos los filtros
                </Button>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((producto) => (
                  <ProductCard
                    key={producto.id}
                    producto={producto}
                    onClick={() => {
                      setSelectedProduct(producto);
                      setShowModal(true);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <ProductModal
        producto={selectedProduct}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
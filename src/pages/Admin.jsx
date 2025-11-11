import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Search, Edit, Trash2, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import ProductForm from "../components/admin/ProductForm";

export default function Admin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  const queryClient = useQueryClient();

  const { data: productos, isLoading } = useQuery({
    queryKey: ['productos'],
    queryFn: () => base44.entities.Producto.list('-created_date'),
    initialData: [],
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Producto.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] });
      setShowForm(false);
      setEditingProduct(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Producto.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] });
      setShowForm(false);
      setEditingProduct(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Producto.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] });
      setDeletingProduct(null);
      toast.success('Producto eliminado exitosamente');
    },
  });

  const handleSave = async (data) => {
    if (editingProduct) {
      await updateMutation.mutateAsync({ id: editingProduct.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  const handleEdit = (producto) => {
    setEditingProduct(producto);
    setShowForm(true);
  };

  const handleDelete = (producto) => {
    setDeletingProduct(producto);
  };

  const confirmDelete = async () => {
    if (deletingProduct) {
      await deleteMutation.mutateAsync(deletingProduct.id);
    }
  };

  const filteredProducts = productos.filter(producto =>
    producto.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              Administrar Productos
            </h1>
            <p className="text-slate-600">
              Crea, edita y elimina productos del catálogo
            </p>
          </div>
          {!showForm && (
            <Button
              onClick={() => {
                setEditingProduct(null);
                setShowForm(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nuevo Producto
            </Button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {showForm ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ProductForm
                producto={editingProduct}
                onSave={handleSave}
                onCancel={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Search */}
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg mb-6">
                <CardContent className="p-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      placeholder="Buscar productos por nombre o descripción..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                  <p className="text-sm text-slate-600 mt-3">
                    Total: <span className="font-semibold">{filteredProducts.length}</span> producto{filteredProducts.length !== 1 ? 's' : ''}
                  </p>
                </CardContent>
              </Card>

              {/* Products Table */}
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead className="w-20">Imagen</TableHead>
                        <TableHead>Producto</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Especies</TableHead>
                        <TableHead>Países</TableHead>
                        <TableHead className="w-32 text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        Array(5).fill(0).map((_, i) => (
                          <TableRow key={i}>
                            <TableCell colSpan={6}>
                              <div className="h-16 bg-slate-100 animate-pulse rounded" />
                            </TableCell>
                          </TableRow>
                        ))
                      ) : filteredProducts.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-12">
                            <Package className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                            <p className="text-slate-500">No hay productos para mostrar</p>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredProducts.map((producto) => (
                          <TableRow key={producto.id} className="hover:bg-slate-50/50">
                            <TableCell>
                              {producto.imagen_url ? (
                                <img
                                  src={producto.imagen_url}
                                  alt={producto.nombre}
                                  className="w-16 h-16 object-contain rounded bg-slate-100"
                                />
                              ) : (
                                <div className="w-16 h-16 bg-slate-100 rounded flex items-center justify-center">
                                  <Package className="w-6 h-6 text-slate-400" />
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-semibold text-slate-800">{producto.nombre}</p>
                                <p className="text-sm text-slate-500 line-clamp-1">{producto.descripcion}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              {producto.categoria && (
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                  {producto.categoria}
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {producto.especies?.slice(0, 2).map((esp, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {esp}
                                  </Badge>
                                ))}
                                {producto.especies?.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{producto.especies.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {producto.paises?.slice(0, 2).map((pais, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {pais}
                                  </Badge>
                                ))}
                                {producto.paises?.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{producto.paises.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-2 justify-end">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEdit(producto)}
                                  className="hover:bg-blue-100 hover:text-blue-600"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete(producto)}
                                  className="hover:bg-red-100 hover:text-red-600"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingProduct} onOpenChange={() => setDeletingProduct(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El producto "{deletingProduct?.nombre}" será eliminado permanentemente del catálogo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
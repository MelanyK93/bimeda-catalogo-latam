import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Upload, Loader2, Save, Image as ImageIcon, FileText } from "lucide-react";
import { toast } from "sonner";
import MaterialesRegion from "./MaterialesRegion";

const ESPECIES = ["Bovinos", "Equinos", "Porcinos", "Ovinos", "Caprinos", "Caninos", "Felinos", "Aves", "Pollos", "Pavos", "Camélidos", "Lechones", "Terneros", "Bezerros", "Conejos", "Hamster", "Hurones", "Cuyos"];
const CATEGORIAS = ["Antibióticos", "Antiinflamatorios", "Desparasitantes", "Endectocida", "Ectoparasiticida", "Vitaminas y Minerales", "Hormonales", "Intramamarios", "Reconstituyentes y Rehidratantes", "Desinfectante - Bioseguridad", "Control ambiental", "Condroprotector", "Nutracéuticos", "Antisépticos"];
const PAISES = ["México", "Guatemala", "Argentina", "Bolivia", "Colombia", "Ecuador", "Paraguay", "Perú", "Uruguay", "Venezuela", "Brasil"];

export default function ProductForm({ producto, onSave, onCancel }) {
  const [formData, setFormData] = useState(producto || {
    nombre: "",
    descripcion: "",
    imagen_url: "",
    especies: [],
    categoria: "",
    paises: [],
    presentacion: "",
    ficha_tecnica: "",
    materiales_mexico: {},
    materiales_camcar: {},
    materiales_suramerica: {},
    materiales_brasil: {}
  });
  
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field, item) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field]?.includes(item) 
        ? prev[field].filter(i => i !== item)
        : [...(prev[field] || []), item]
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Por favor selecciona una imagen válida');
      return;
    }

    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      handleChange('imagen_url', file_url);
      toast.success('Imagen subida exitosamente');
    } catch (error) {
      toast.error('Error al subir la imagen');
      console.error(error);
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.descripcion) {
      toast.error('El nombre y la descripción son obligatorios');
      return;
    }

    setSaving(true);
    try {
      await onSave(formData);
      toast.success(producto ? 'Producto actualizado' : 'Producto creado');
    } catch (error) {
      toast.error('Error al guardar el producto');
      console.error(error);
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="flex items-center gap-2">
            {producto ? 'Editar Producto' : 'Nuevo Producto'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="basico" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="basico">Información Básica</TabsTrigger>
              <TabsTrigger value="materiales">
                <FileText className="w-4 h-4 mr-2" />
                Materiales de Venta
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basico" className="space-y-6">
              {/* Imagen */}
              <div>
                <Label className="text-sm font-semibold text-slate-700 mb-2 block">
                  Imagen del Producto
                </Label>
                {formData.imagen_url ? (
                  <div className="relative">
                    <img 
                      src={formData.imagen_url} 
                      alt="Preview"
                      className="w-full h-48 object-contain bg-slate-100 rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => handleChange('imagen_url', '')}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors">
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      {uploading ? (
                        <Loader2 className="w-12 h-12 mx-auto mb-3 text-slate-400 animate-spin" />
                      ) : (
                        <ImageIcon className="w-12 h-12 mx-auto mb-3 text-slate-400" />
                      )}
                      <p className="text-slate-600 font-medium">
                        {uploading ? 'Subiendo imagen...' : 'Click para subir imagen'}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">PNG, JPG hasta 10MB</p>
                    </label>
                  </div>
                )}
              </div>

              {/* Nombre */}
              <div>
                <Label htmlFor="nombre" className="text-sm font-semibold text-slate-700 mb-2 block">
                  Nombre del Producto *
                </Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => handleChange('nombre', e.target.value)}
                  placeholder="Ej: Bimectin LA 3.5%"
                  required
                />
              </div>

              {/* Descripción */}
              <div>
                <Label htmlFor="descripcion" className="text-sm font-semibold text-slate-700 mb-2 block">
                  Descripción / Composición *
                </Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => handleChange('descripcion', e.target.value)}
                  placeholder="Ej: Ivermectina al 3.5% de larga acción"
                  rows={3}
                  required
                />
              </div>

              {/* Categoría */}
              <div>
                <Label className="text-sm font-semibold text-slate-700 mb-2 block">
                  Categoría
                </Label>
                <Select value={formData.categoria} onValueChange={(value) => handleChange('categoria', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIAS.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Presentación */}
              <div>
                <Label htmlFor="presentacion" className="text-sm font-semibold text-slate-700 mb-2 block">
                  Presentación
                </Label>
                <Input
                  id="presentacion"
                  value={formData.presentacion}
                  onChange={(e) => handleChange('presentacion', e.target.value)}
                  placeholder="Ej: Inyectable, Oral, Pasta, Pour-on"
                />
              </div>

              {/* Especies */}
              <div>
                <Label className="text-sm font-semibold text-slate-700 mb-3 block">
                  Especies
                </Label>
                <div className="flex flex-wrap gap-2">
                  {ESPECIES.map((especie) => (
                    <Badge
                      key={especie}
                      variant={formData.especies?.includes(especie) ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        formData.especies?.includes(especie) 
                          ? 'bg-red-600 hover:bg-red-700' 
                          : 'hover:bg-slate-100'
                      }`}
                      onClick={() => toggleArrayItem('especies', especie)}
                    >
                      {especie}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Países */}
              <div>
                <Label className="text-sm font-semibold text-slate-700 mb-3 block">
                  Países donde está disponible
                </Label>
                <div className="flex flex-wrap gap-2">
                  {PAISES.map((pais) => (
                    <Badge
                      key={pais}
                      variant={formData.paises?.includes(pais) ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        formData.paises?.includes(pais) 
                          ? 'bg-red-600 hover:bg-red-700' 
                          : 'hover:bg-slate-100'
                      }`}
                      onClick={() => toggleArrayItem('paises', pais)}
                    >
                      {pais}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Ficha Técnica */}
              <div>
                <Label htmlFor="ficha_tecnica" className="text-sm font-semibold text-slate-700 mb-2 block">
                  Información Técnica Adicional
                </Label>
                <Textarea
                  id="ficha_tecnica"
                  value={formData.ficha_tecnica}
                  onChange={(e) => handleChange('ficha_tecnica', e.target.value)}
                  placeholder="Información técnica adicional, indicaciones, dosis, etc."
                  rows={4}
                />
              </div>
            </TabsContent>

            <TabsContent value="materiales" className="space-y-6">
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Materiales de Apoyo para Ventas:</strong> Sube fichas técnicas, publicidad para WhatsApp, flyers y logotipos por región para que tu equipo de ventas tenga acceso rápido a los materiales.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <MaterialesRegion
                  region="México"
                  materiales={formData.materiales_mexico}
                  onChange={(value) => handleChange('materiales_mexico', value)}
                />
                
                <MaterialesRegion
                  region="CAMCAR"
                  materiales={formData.materiales_camcar}
                  onChange={(value) => handleChange('materiales_camcar', value)}
                />
                
                <MaterialesRegion
                  region="Suramérica"
                  materiales={formData.materiales_suramerica}
                  onChange={(value) => handleChange('materiales_suramerica', value)}
                />
                
                <MaterialesRegion
                  region="Brasil"
                  materiales={formData.materiales_brasil}
                  onChange={(value) => handleChange('materiales_brasil', value)}
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Buttons */}
          <div className="flex gap-3 pt-6 mt-6 border-t border-slate-200">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={saving}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={saving || uploading}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {producto ? 'Actualizar' : 'Crear'} Producto
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
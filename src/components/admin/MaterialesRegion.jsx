import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, FileText, Image, File, Loader2, Download } from "lucide-react";
import { toast } from "sonner";

const TIPOS_ARCHIVO = [
  { key: "ficha_tecnica", label: "Ficha Técnica", icon: FileText, accept: ".pdf,.doc,.docx" },
  { key: "flyer", label: "Material Publicitario (flyers, lonas, folletos, etc.)", icon: File, accept: ".pdf,image/*" },
  { key: "logotipo", label: "Logotipo Producto", icon: Image, accept: "image/*" },
];

export default function MaterialesRegion({ region, materiales = {}, onChange }) {
  const [uploading, setUploading] = useState({});

  const handleFileUpload = async (tipo, file) => {
    if (!file) return;

    setUploading(prev => ({ ...prev, [tipo]: true }));
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      onChange({
        ...materiales,
        [tipo]: file_url
      });
      toast.success(`${TIPOS_ARCHIVO.find(t => t.key === tipo)?.label} subido`);
    } catch (error) {
      toast.error('Error al subir el archivo');
      console.error(error);
    }
    setUploading(prev => ({ ...prev, [tipo]: false }));
  };

  const handleRemove = (tipo) => {
    const updated = { ...materiales };
    delete updated[tipo];
    onChange(updated);
    toast.success('Archivo eliminado');
  };

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{region}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {TIPOS_ARCHIVO.map((tipo) => {
          const Icon = tipo.icon;
          const url = materiales?.[tipo.key];
          const isUploading = uploading[tipo.key];

          return (
            <div key={tipo.key} className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                {tipo.label}
              </Label>
              
              {url ? (
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <Icon className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span className="text-sm text-slate-700 flex-1 truncate">
                    {url.split('/').pop()}
                  </span>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0"
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-slate-200"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </a>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(tipo.key)}
                    className="h-8 w-8 hover:bg-red-100 hover:text-red-600 flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="file"
                    id={`${region}-${tipo.key}`}
                    accept={tipo.accept}
                    onChange={(e) => handleFileUpload(tipo.key, e.target.files?.[0])}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor={`${region}-${tipo.key}`}
                    className="flex items-center gap-3 p-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-red-400 hover:bg-red-50 transition-all cursor-pointer"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
                        <span className="text-sm text-slate-600">Subiendo...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 text-slate-400" />
                        <span className="text-sm text-slate-600">
                          Subir {tipo.label}
                        </span>
                      </>
                    )}
                  </label>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
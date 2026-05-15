import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, Upload, Loader2, Images } from "lucide-react";
import { toast } from "sonner";

export default function GaleriaUploader({ imagenes = [], onChange }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);
    try {
      const uploads = await Promise.all(
        files.map(file => base44.integrations.Core.UploadFile({ file }))
      );
      const newUrls = uploads.map(r => r.file_url);
      onChange([...imagenes, ...newUrls]);
      toast.success(`${newUrls.length} imagen(es) subida(s)`);
    } catch (error) {
      toast.error("Error al subir imágenes");
    }
    setUploading(false);
    e.target.value = "";
  };

  const removeImage = (idx) => {
    onChange(imagenes.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <Label className="text-sm font-semibold text-slate-700 mb-3 block flex items-center gap-2">
        <Images className="w-4 h-4" />
        Galería de Imágenes
        <span className="text-xs font-normal text-slate-500">({imagenes.length} foto{imagenes.length !== 1 ? "s" : ""})</span>
      </Label>

      {imagenes.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          {imagenes.map((url, idx) => (
            <div key={idx} className="relative group rounded-lg overflow-hidden border border-slate-200">
              <img
                src={url}
                alt={`Galería ${idx + 1}`}
                className="w-full h-24 object-contain bg-slate-50"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-slate-400 transition-colors">
        <input
          type="file"
          id="galeria-upload"
          accept="image/*"
          multiple
          onChange={handleUpload}
          className="hidden"
          disabled={uploading}
        />
        <label htmlFor="galeria-upload" className="cursor-pointer flex flex-col items-center gap-2">
          {uploading ? (
            <Loader2 className="w-8 h-8 text-slate-400 animate-spin" />
          ) : (
            <Upload className="w-8 h-8 text-slate-400" />
          )}
          <p className="text-sm text-slate-600 font-medium">
            {uploading ? "Subiendo..." : "Agregar fotos a la galería"}
          </p>
          <p className="text-xs text-slate-500">Puedes seleccionar varias imágenes a la vez</p>
        </label>
      </div>
    </div>
  );
}
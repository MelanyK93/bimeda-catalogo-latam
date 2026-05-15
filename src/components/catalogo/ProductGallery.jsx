import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, ChevronLeft, ChevronRight, X, Images } from "lucide-react";

export default function ProductGallery({ imagenPrincipal, galeria = [], nombreProducto }) {
  const todasLasImagenes = [
    ...(imagenPrincipal ? [imagenPrincipal] : []),
    ...galeria,
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (todasLasImagenes.length === 0) return null;

  const activeUrl = todasLasImagenes[activeIdx];

  const handleDownload = async (url, idx) => {
    const res = await fetch(url);
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${nombreProducto.replace(/\s+/g, "_")}_foto_${idx + 1}.jpg`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const prev = () => setActiveIdx(i => (i - 1 + todasLasImagenes.length) % todasLasImagenes.length);
  const next = () => setActiveIdx(i => (i + 1) % todasLasImagenes.length);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div
        className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl overflow-hidden cursor-zoom-in"
        onClick={() => setLightboxOpen(true)}
      >
        <img
          src={activeUrl}
          alt={`${nombreProducto} - foto ${activeIdx + 1}`}
          className="w-full h-64 object-contain p-4"
        />
        {todasLasImagenes.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow transition-all"
            >
              <ChevronLeft className="w-4 h-4 text-slate-700" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow transition-all"
            >
              <ChevronRight className="w-4 h-4 text-slate-700" />
            </button>
          </>
        )}
        <div className="absolute bottom-2 right-2 bg-black/40 text-white text-xs px-2 py-0.5 rounded-full">
          {activeIdx + 1} / {todasLasImagenes.length}
        </div>
      </div>

      {/* Thumbnails */}
      {todasLasImagenes.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {todasLasImagenes.map((url, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`flex-shrink-0 w-14 h-14 rounded-lg border-2 overflow-hidden transition-all ${
                idx === activeIdx ? "border-red-500" : "border-slate-200 hover:border-slate-400"
              }`}
            >
              <img src={url} alt="" className="w-full h-full object-contain bg-slate-50" />
            </button>
          ))}
        </div>
      )}

      {/* Download buttons */}
      <div className="space-y-2">
        <Button
          size="sm"
          variant="outline"
          className="w-full border-red-200 text-red-700 hover:bg-red-50 hover:border-red-400"
          onClick={() => handleDownload(activeUrl, activeIdx)}
        >
          <Download className="w-4 h-4 mr-2" />
          Descargar foto actual
        </Button>

        {todasLasImagenes.length > 1 && (
          <Button
            size="sm"
            variant="outline"
            className="w-full border-slate-200 text-slate-700 hover:bg-slate-50"
            onClick={() => todasLasImagenes.forEach((url, idx) => handleDownload(url, idx))}
          >
            <Images className="w-4 h-4 mr-2" />
            Descargar todas ({todasLasImagenes.length} fotos)
          </Button>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/30 rounded-full p-2"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
          {todasLasImagenes.length > 1 && (
            <>
              <button
                className="absolute left-4 text-white bg-white/20 hover:bg-white/30 rounded-full p-2"
                onClick={(e) => { e.stopPropagation(); prev(); }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                className="absolute right-4 text-white bg-white/20 hover:bg-white/30 rounded-full p-2"
                onClick={(e) => { e.stopPropagation(); next(); }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          <img
            src={activeUrl}
            alt={nombreProducto}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
            <span className="text-white/70 text-sm">{activeIdx + 1} / {todasLasImagenes.length}</span>
            <button
              className="text-white bg-red-600 hover:bg-red-700 rounded-lg px-3 py-1 text-sm flex items-center gap-1"
              onClick={(e) => { e.stopPropagation(); handleDownload(activeUrl, activeIdx); }}
            >
              <Download className="w-3 h-3" />
              Descargar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
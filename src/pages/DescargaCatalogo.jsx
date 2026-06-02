import React, { useEffect, useState, useRef } from "react";
import { FileDown, Upload, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";

const PAISES = [
  { nombre: "México", bandera: "🇲🇽" },
  { nombre: "Guatemala", bandera: "🇬🇹" },
  { nombre: "El Salvador", bandera: "🇸🇻" },
  { nombre: "Honduras", bandera: "🇭🇳" },
  { nombre: "Nicaragua", bandera: "🇳🇮" },
  { nombre: "Costa Rica", bandera: "🇨🇷" },
  { nombre: "Panamá", bandera: "🇵🇦" },
  { nombre: "Colombia", bandera: "🇨🇴" },
  { nombre: "Ecuador", bandera: "🇪🇨" },
  { nombre: "Perú", bandera: "🇵🇪" },
  { nombre: "Bolivia", bandera: "🇧🇴" },
  { nombre: "Paraguay", bandera: "🇵🇾" },
  { nombre: "Uruguay", bandera: "🇺🇾" },
  { nombre: "Venezuela", bandera: "🇻🇪" },
  { nombre: "Argentina", bandera: "🇦🇷" },
  { nombre: "Brasil", bandera: "🇧🇷" },
];

export default function DescargaCatalogo() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const isAdmin = user?.role === "admin";
  const [catalogos, setCatalogos] = useState([]);
  const [uploading, setUploading] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const fileInputRefs = useRef({});

  const fetchCatalogos = async () => {
    const data = await base44.entities.CatalogoPais.list();
    setCatalogos(data);
  };

  useEffect(() => {
    fetchCatalogos();
  }, []);

  const getCatalogo = (pais) => catalogos.find((c) => c.pais === pais);

  const handleUpload = async (pais, file) => {
    if (!file) return;
    setUploading(pais);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    const existing = getCatalogo(pais);
    if (existing) {
      await base44.entities.CatalogoPais.update(existing.id, { url: file_url });
    } else {
      await base44.entities.CatalogoPais.create({ pais, url: file_url });
    }
    await fetchCatalogos();
    setUploading(null);
  };

  const handleDelete = async (pais) => {
    const existing = getCatalogo(pais);
    if (!existing) return;
    setDeleting(pais);
    await base44.entities.CatalogoPais.delete(existing.id);
    await fetchCatalogos();
    setDeleting(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-rose-50 p-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
              {t("download_title")}
            </h1>
            <p className="text-slate-600 text-lg">
              {isAdmin ? t("download_subtitle_admin") : t("download_subtitle_user")}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {PAISES.map((pais, index) => {
              const catalogo = getCatalogo(pais.nombre);
              const isUploading = uploading === pais.nombre;
              const isDeleting = deleting === pais.nombre;

              return (
                <motion.div
                  key={pais.nombre}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <Card className="bg-white/80 border-2 border-transparent hover:border-red-200 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                      <span className="text-4xl">{pais.bandera}</span>
                      <h3 className="font-semibold text-slate-800 text-sm">{pais.nombre}</h3>

                      {/* Download button */}
                      <Button
                        size="sm"
                        disabled={!catalogo}
                        onClick={() => catalogo && window.open(catalogo.url, "_blank")}
                        className="w-full bg-red-600 hover:bg-red-700 text-white disabled:opacity-40"
                      >
                        <FileDown className="w-4 h-4 mr-1" />
                        {catalogo ? t("download_btn") : t("download_unavailable")}
                      </Button>

                      {/* Admin: upload/delete buttons */}
                      {isAdmin && (
                        <div className="flex gap-2 w-full">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            ref={(el) => (fileInputRefs.current[pais.nombre] = el)}
                            onChange={(e) => handleUpload(pais.nombre, e.target.files[0])}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={isUploading}
                            onClick={() => fileInputRefs.current[pais.nombre]?.click()}
                            className="flex-1 border-slate-300 text-slate-700 text-xs"
                          >
                            {isUploading ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Upload className="w-3 h-3 mr-1" />
                            )}
                            {catalogo ? t("download_replace") : t("download_upload")}
                          </Button>

                          {catalogo && (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={isDeleting}
                              onClick={() => handleDelete(pais.nombre)}
                              className="border-red-200 text-red-500 hover:bg-red-50 px-2"
                            >
                              {isDeleting ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Trash2 className="w-3 h-3" />
                              )}
                            </Button>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
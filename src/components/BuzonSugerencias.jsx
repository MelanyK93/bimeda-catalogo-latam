import React, { useState } from "react";
import { MessageSquarePlus, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";

export default function BuzonSugerencias() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [form, setForm] = useState({ nombre: "", mensaje: "", tipo: "Sugerencia" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.mensaje.trim()) return;
    setLoading(true);
    await base44.entities.Sugerencia.create(form);
    setLoading(false);
    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      setOpen(false);
      setForm({ nombre: "", mensaje: "", tipo: "Sugerencia" });
    }, 2000);
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!open && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 font-medium text-sm"
            >
              <MessageSquarePlus className="w-5 h-5" />
              Sugerencias
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquarePlus className="w-6 h-6 text-white" />
                  <div>
                    <h2 className="text-white font-bold text-lg">Buzón de Sugerencias</h2>
                    <p className="text-red-100 text-xs">Tu opinión nos ayuda a mejorar</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {enviado ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">¡Gracias!</h3>
                    <p className="text-slate-500 text-sm">Tu mensaje fue enviado correctamente.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label className="text-slate-700 text-sm font-medium">Nombre (opcional)</Label>
                      <Input
                        placeholder="Tu nombre"
                        value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-slate-700 text-sm font-medium">Tipo</Label>
                      <Select value={form.tipo} onValueChange={(v) => setForm({ ...form, tipo: v })}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sugerencia">Sugerencia</SelectItem>
                          <SelectItem value="Comentario">Comentario</SelectItem>
                          <SelectItem value="Reporte de error">Reporte de error</SelectItem>
                          <SelectItem value="Otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-slate-700 text-sm font-medium">Mensaje *</Label>
                      <Textarea
                        placeholder="Escribe tu sugerencia o comentario..."
                        value={form.mensaje}
                        onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                        className="mt-1 min-h-[100px] resize-none"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading || !form.mensaje.trim()}
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      {loading ? "Enviando..." : "Enviar"}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Building2, Home, Bed, Hotel,
  Wifi, Wind, ChefHat, Waves, Car, Flame, Tv, Coffee, Zap, Shield,
  Plus, Trash2, CheckCircle2, Loader2,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import type { LogementType, Equipement, LogementInsert } from "../types/logement";
import { TYPE_LABELS, EQUIPEMENT_LABELS } from "../types/logement";

interface LogementFormProps {
  onClose: () => void;
}

const TYPE_ICONS: Record<LogementType, React.ReactNode> = {
  hotel:        <Hotel className="w-5 h-5" />,
  appartement:  <Building2 className="w-5 h-5" />,
  airbnb:       <Home className="w-5 h-5" />,
  chambre_hote: <Bed className="w-5 h-5" />,
};

const EQUIPEMENTS_LIST: { id: Equipement; icon: React.ReactNode }[] = [
  { id: "wifi",           icon: <Wifi className="w-4 h-4" /> },
  { id: "climatisation",  icon: <Wind className="w-4 h-4" /> },
  { id: "cuisine",        icon: <ChefHat className="w-4 h-4" /> },
  { id: "piscine",        icon: <Waves className="w-4 h-4" /> },
  { id: "parking",        icon: <Car className="w-4 h-4" /> },
  { id: "eau_chaude",     icon: <Flame className="w-4 h-4" /> },
  { id: "tv",             icon: <Tv className="w-4 h-4" /> },
  { id: "petit_dejeuner", icon: <Coffee className="w-4 h-4" /> },
  { id: "generatrice",    icon: <Zap className="w-4 h-4" /> },
  { id: "securite",       icon: <Shield className="w-4 h-4" /> },
];

const INITIAL_FORM: LogementInsert = {
  titre: "", description: "", type: "hotel",
  prix_par_nuit: null, adresse: "", ville: "Kara",
  capacite: 1, equipements: [], images: [""],
  contact_nom: "", contact_telephone: "", contact_email: "",
};

const INPUT = "w-full bg-white border border-black/25 rounded-xl px-4 py-2.5 text-black text-sm placeholder:text-black/30 focus:outline-none focus:border-[#006A4E] transition-colors";

export default function LogementForm({ onClose }: LogementFormProps) {
  const [form, setForm]             = useState<LogementInsert>(INITIAL_FORM);
  const [step, setStep]             = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess]   = useState(false);
  const [error, setError]           = useState<string | null>(null);

  const updateField = <K extends keyof LogementInsert>(key: K, value: LogementInsert[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleEquipement = (eq: Equipement) =>
    setForm((prev) => ({
      ...prev,
      equipements: prev.equipements.includes(eq)
        ? prev.equipements.filter((e) => e !== eq)
        : [...prev.equipements, eq],
    }));

  const updateImage = (index: number, value: string) => {
    const updated = [...form.images];
    updated[index] = value;
    setForm((prev) => ({ ...prev, images: updated }));
  };

  const canGoStep2 = form.type && form.titre.trim().length >= 3;
  const canSubmit  = form.contact_nom.trim().length >= 2 && form.contact_telephone.trim().length >= 8;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const { error: sbError } = await supabase.from("logements").insert([{
        ...form,
        images: form.images.filter((url) => url.trim() !== ""),
        approuve: false,
        disponible: true,
      }]);
      if (sbError) throw sbError;
      setIsSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl bg-white border border-black/20 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.12)] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.07]">
            <div>
              <h2 className="font-clash font-bold text-black text-base">Proposer un logement</h2>
              <p className="text-black/40 text-xs mt-0.5">Étape {step} sur 3</p>
            </div>
            <button onClick={onClose} className="text-black/30 hover:text-black transition-colors p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-[2px] bg-black/[0.05]">
            <motion.div
              className="h-full"
              style={{ background: "#006A4E" }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Contenu */}
          <div className="px-6 py-5 max-h-[65vh] overflow-y-auto">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-10 gap-4"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(0,106,78,0.08)", border: "1px solid rgba(0,106,78,0.2)" }}>
                  <CheckCircle2 className="w-8 h-8" style={{ color: "#006A4E" }} />
                </div>
                <h3 className="font-clash font-bold text-black text-xl">Logement soumis !</h3>
                <p className="text-black/50 text-sm max-w-xs">
                  Votre logement a été soumis avec succès. Il sera visible après validation par notre équipe sous 24h.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-6 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-85"
                  style={{ background: "#006A4E" }}
                >
                  Fermer
                </button>
              </motion.div>
            ) : (
              <>
                {/* Étape 1 */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                    <div>
                      <label className="block text-black/60 text-xs font-medium mb-3">
                        Type de logement <span style={{ color: "#CE1126" }}>*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {(Object.keys(TYPE_LABELS) as LogementType[]).map((t) => (
                          <button
                            key={t}
                            onClick={() => updateField("type", t)}
                            className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all duration-200 text-left ${
                              form.type === t
                                ? "border-[#006A4E]/40 text-black"
                                : "border-black/20 text-black/40 hover:border-black/40"
                            }`}
                            style={form.type === t ? { background: "rgba(0,106,78,0.06)" } : {}}
                          >
                            <span style={form.type === t ? { color: "#006A4E" } : {}}>
                              {TYPE_ICONS[t]}
                            </span>
                            <span className="text-sm font-medium">{TYPE_LABELS[t]}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-black/60 text-xs font-medium mb-2">
                        Nom du logement <span style={{ color: "#CE1126" }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={form.titre}
                        onChange={(e) => updateField("titre", e.target.value)}
                        placeholder="Ex : Hôtel Palace Kara, Villa Ahmed..."
                        className={INPUT}
                      />
                    </div>

                    <div>
                      <label className="block text-black/60 text-xs font-medium mb-2">Description</label>
                      <textarea
                        value={form.description}
                        onChange={(e) => updateField("description", e.target.value)}
                        placeholder="Décrivez votre logement : emplacement, ambiance, points forts..."
                        rows={3}
                        className={`${INPUT} resize-none`}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Étape 2 */}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-black/60 text-xs font-medium mb-2">Prix / nuit (FCFA)</label>
                        <input
                          type="number"
                          value={form.prix_par_nuit ?? ""}
                          onChange={(e) => updateField("prix_par_nuit", e.target.value ? Number(e.target.value) : null)}
                          placeholder="Ex : 15 000"
                          min={0}
                          className={INPUT}
                        />
                      </div>
                      <div>
                        <label className="block text-black/60 text-xs font-medium mb-2">Capacité (personnes)</label>
                        <input
                          type="number"
                          value={form.capacite}
                          onChange={(e) => updateField("capacite", Number(e.target.value))}
                          min={1} max={50}
                          className={INPUT}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-black/60 text-xs font-medium mb-2">Adresse</label>
                      <input
                        type="text"
                        value={form.adresse}
                        onChange={(e) => updateField("adresse", e.target.value)}
                        placeholder="Quartier, rue, point de repère..."
                        className={INPUT}
                      />
                    </div>

                    <div>
                      <label className="block text-black/60 text-xs font-medium mb-3">Équipements</label>
                      <div className="grid grid-cols-2 gap-2">
                        {EQUIPEMENTS_LIST.map(({ id, icon }) => (
                          <button
                            key={id}
                            onClick={() => toggleEquipement(id)}
                            className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all duration-200 text-sm ${
                              form.equipements.includes(id)
                                ? "border-[#006A4E]/40 text-black"
                                : "border-black/20 text-black/40 hover:border-black/40"
                            }`}
                            style={form.equipements.includes(id) ? { background: "rgba(0,106,78,0.06)" } : {}}
                          >
                            <span style={form.equipements.includes(id) ? { color: "#006A4E" } : {}}>{icon}</span>
                            {EQUIPEMENT_LABELS[id]}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-black/60 text-xs font-medium mb-2">Photos (URLs) — max 5</label>
                      <div className="space-y-2">
                        {form.images.map((url, i) => (
                          <div key={i} className="flex gap-2">
                            <input
                              type="url"
                              value={url}
                              onChange={(e) => updateImage(i, e.target.value)}
                              placeholder={`https://... (photo ${i + 1})`}
                              className={INPUT}
                            />
                            {form.images.length > 1 && (
                              <button
                                onClick={() => removeImageField(i)}
                                className="text-black/25 hover:text-red-500 transition-colors p-2"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                        {form.images.length < 5 && (
                          <button
                            onClick={addImageField}
                            className="flex items-center gap-1.5 text-xs transition-colors mt-1"
                            style={{ color: "#006A4E" }}
                          >
                            <Plus className="w-3.5 h-3.5" /> Ajouter une photo
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Étape 3 */}
                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                    <p className="text-black/50 text-sm">
                      Renseignez vos coordonnées. Les visiteurs vous contacteront directement.
                    </p>

                    <div>
                      <label className="block text-black/60 text-xs font-medium mb-2">
                        Votre nom <span style={{ color: "#CE1126" }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={form.contact_nom}
                        onChange={(e) => updateField("contact_nom", e.target.value)}
                        placeholder="Nom complet ou nom de l'établissement"
                        className={INPUT}
                      />
                    </div>

                    <div>
                      <label className="block text-black/60 text-xs font-medium mb-2">
                        Téléphone <span style={{ color: "#CE1126" }}>*</span>
                      </label>
                      <input
                        type="tel"
                        value={form.contact_telephone}
                        onChange={(e) => updateField("contact_telephone", e.target.value)}
                        placeholder="+228 XX XX XX XX"
                        className={INPUT}
                      />
                    </div>

                    <div>
                      <label className="block text-black/60 text-xs font-medium mb-2">Email (optionnel)</label>
                      <input
                        type="email"
                        value={form.contact_email}
                        onChange={(e) => updateField("contact_email", e.target.value)}
                        placeholder="contact@exemple.com"
                        className={INPUT}
                      />
                    </div>

                    <div className="rounded-xl p-3 text-xs text-black/50"
                      style={{ background: "rgba(0,106,78,0.05)", border: "1px solid rgba(0,106,78,0.15)" }}>
                      Votre logement sera{" "}
                      <span className="font-medium" style={{ color: "#006A4E" }}>vérifié par notre équipe</span>{" "}
                      avant d&apos;être publié. Vous serez contacté en cas de besoin.
                    </div>

                    {error && (
                      <div className="rounded-xl p-3 text-xs text-red-600"
                        style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
                        {error}
                      </div>
                    )}
                  </motion.div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          {!isSuccess && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-black/[0.07]">
              <button
                onClick={() => step > 1 ? setStep((s) => (s - 1) as 1 | 2 | 3) : onClose()}
                className="text-black/40 hover:text-black text-sm transition-colors"
              >
                {step === 1 ? "Annuler" : "← Retour"}
              </button>

              {step < 3 ? (
                <button
                  onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3)}
                  disabled={step === 1 && !canGoStep2}
                  className="text-white font-semibold px-6 py-2 rounded-full text-sm transition-opacity hover:opacity-85 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ background: "#006A4E" }}
                >
                  Suivant →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                  className="flex items-center gap-2 text-white font-semibold px-6 py-2 rounded-full text-sm transition-opacity hover:opacity-85 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ background: "#006A4E" }}
                >
                  {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Envoi...</> : "Publier mon logement"}
                </button>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

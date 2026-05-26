"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Building2,
  Home,
  Bed,
  Hotel,
  Wifi,
  Wind,
  ChefHat,
  Waves,
  Car,
  Flame,
  Tv,
  Coffee,
  Zap,
  Shield,
  Plus,
  Trash2,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import type { LogementType, Equipement, LogementInsert } from "../types/logement";
import { TYPE_LABELS, EQUIPEMENT_LABELS } from "../types/logement";

interface LogementFormProps {
  onClose: () => void;
}

const TYPE_ICONS: Record<LogementType, React.ReactNode> = {
  hotel: <Hotel className="w-6 h-6" />,
  appartement: <Building2 className="w-6 h-6" />,
  airbnb: <Home className="w-6 h-6" />,
  chambre_hote: <Bed className="w-6 h-6" />,
};

const EQUIPEMENTS_LIST: { id: Equipement; icon: React.ReactNode }[] = [
  { id: "wifi", icon: <Wifi className="w-4 h-4" /> },
  { id: "climatisation", icon: <Wind className="w-4 h-4" /> },
  { id: "cuisine", icon: <ChefHat className="w-4 h-4" /> },
  { id: "piscine", icon: <Waves className="w-4 h-4" /> },
  { id: "parking", icon: <Car className="w-4 h-4" /> },
  { id: "eau_chaude", icon: <Flame className="w-4 h-4" /> },
  { id: "tv", icon: <Tv className="w-4 h-4" /> },
  { id: "petit_dejeuner", icon: <Coffee className="w-4 h-4" /> },
  { id: "generatrice", icon: <Zap className="w-4 h-4" /> },
  { id: "securite", icon: <Shield className="w-4 h-4" /> },
];

const INITIAL_FORM: LogementInsert = {
  titre: "",
  description: "",
  type: "hotel",
  prix_par_nuit: null,
  adresse: "",
  ville: "Kara",
  capacite: 1,
  equipements: [],
  images: [""],
  contact_nom: "",
  contact_telephone: "",
  contact_email: "",
};

export default function LogementForm({ onClose }: LogementFormProps) {
  const [form, setForm] = useState<LogementInsert>(INITIAL_FORM);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = <K extends keyof LogementInsert>(key: K, value: LogementInsert[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleEquipement = (eq: Equipement) => {
    setForm((prev) => ({
      ...prev,
      equipements: prev.equipements.includes(eq)
        ? prev.equipements.filter((e) => e !== eq)
        : [...prev.equipements, eq],
    }));
  };

  const updateImage = (index: number, value: string) => {
    const updated = [...form.images];
    updated[index] = value;
    setForm((prev) => ({ ...prev, images: updated }));
  };

  const addImageField = () => {
    if (form.images.length < 5) {
      setForm((prev) => ({ ...prev, images: [...prev.images, ""] }));
    }
  };

  const removeImageField = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const canGoStep2 = form.type && form.titre.trim().length >= 3;
const canSubmit =
    form.contact_nom.trim().length >= 2 &&
    form.contact_telephone.trim().length >= 8;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        ...form,
        images: form.images.filter((url) => url.trim() !== ""),
        approuve: false,
        disponible: true,
      };

      const { error: sbError } = await supabase.from("logements").insert([payload]);

      if (sbError) throw sbError;

      setIsSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Une erreur est survenue.";
      setError(message);
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
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
            <div>
              <h2 className="font-gilroy text-white text-lg">Proposer un logement</h2>
              <p className="text-white/40 text-xs mt-0.5">Étape {step} sur 3</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-0.5 bg-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-eorange to-festival-yellow"
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Contenu */}
          <div className="px-6 py-5 max-h-[65vh] overflow-y-auto">
            {isSuccess ? (
              /* Succès */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-8 gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="font-gilroy text-white text-xl">Logement soumis !</h3>
                <p className="text-white/50 text-sm max-w-xs">
                  Votre logement a été soumis avec succès. Il sera visible après validation par notre équipe sous 24h.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 bg-eorange/10 border border-eorange/30 text-eorange px-6 py-2 rounded-full text-sm font-semibold hover:bg-eorange/20 transition-all"
                >
                  Fermer
                </button>
              </motion.div>
            ) : (
              <>
                {/* Étape 1 : Type + Titre + Description */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="block text-white/70 text-xs font-medium mb-3">
                        Type de logement <span className="text-eorange">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {(Object.keys(TYPE_LABELS) as LogementType[]).map((t) => (
                          <button
                            key={t}
                            onClick={() => updateField("type", t)}
                            className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all duration-200 text-left ${
                              form.type === t
                                ? "border-eorange/60 bg-eorange/10 text-white"
                                : "border-white/8 bg-white/3 text-white/50 hover:border-white/20"
                            }`}
                          >
                            <span className={form.type === t ? "text-eorange" : ""}>
                              {TYPE_ICONS[t]}
                            </span>
                            <span className="text-sm font-medium">{TYPE_LABELS[t]}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/70 text-xs font-medium mb-2">
                        Nom du logement <span className="text-eorange">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.titre}
                        onChange={(e) => updateField("titre", e.target.value)}
                        placeholder="Ex : Hôtel Palace Kara, Villa Ahmed..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-eorange/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-white/70 text-xs font-medium mb-2">Description</label>
                      <textarea
                        value={form.description}
                        onChange={(e) => updateField("description", e.target.value)}
                        placeholder="Décrivez votre logement : emplacement, ambiance, points forts..."
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-eorange/50 transition-colors resize-none"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Étape 2 : Détails + Équipements + Photos */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-white/70 text-xs font-medium mb-2">
                          Prix / nuit (FCFA)
                        </label>
                        <input
                          type="number"
                          value={form.prix_par_nuit ?? ""}
                          onChange={(e) =>
                            updateField("prix_par_nuit", e.target.value ? Number(e.target.value) : null)
                          }
                          placeholder="Ex : 15000"
                          min={0}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-eorange/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 text-xs font-medium mb-2">
                          Capacité (personnes)
                        </label>
                        <input
                          type="number"
                          value={form.capacite}
                          onChange={(e) => updateField("capacite", Number(e.target.value))}
                          min={1}
                          max={50}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-eorange/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/70 text-xs font-medium mb-2">Adresse</label>
                      <input
                        type="text"
                        value={form.adresse}
                        onChange={(e) => updateField("adresse", e.target.value)}
                        placeholder="Quartier, rue, point de repère..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-eorange/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-white/70 text-xs font-medium mb-2">Équipements</label>
                      <div className="grid grid-cols-2 gap-2">
                        {EQUIPEMENTS_LIST.map(({ id, icon }) => (
                          <button
                            key={id}
                            onClick={() => toggleEquipement(id)}
                            className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all duration-200 text-sm ${
                              form.equipements.includes(id)
                                ? "border-eorange/50 bg-eorange/10 text-white"
                                : "border-white/8 bg-white/3 text-white/40 hover:border-white/20"
                            }`}
                          >
                            <span className={form.equipements.includes(id) ? "text-eorange" : ""}>
                              {icon}
                            </span>
                            {EQUIPEMENT_LABELS[id]}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Photos */}
                    <div>
                      <label className="block text-white/70 text-xs font-medium mb-2">
                        Photos (URLs) — max 5
                      </label>
                      <div className="space-y-2">
                        {form.images.map((url, i) => (
                          <div key={i} className="flex gap-2">
                            <input
                              type="url"
                              value={url}
                              onChange={(e) => updateImage(i, e.target.value)}
                              placeholder={`https://... (photo ${i + 1})`}
                              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-eorange/50 transition-colors"
                            />
                            {form.images.length > 1 && (
                              <button
                                onClick={() => removeImageField(i)}
                                className="text-white/30 hover:text-red-400 transition-colors p-2"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                        {form.images.length < 5 && (
                          <button
                            onClick={addImageField}
                            className="flex items-center gap-1.5 text-white/40 hover:text-eorange text-xs transition-colors mt-1"
                          >
                            <Plus className="w-3.5 h-3.5" /> Ajouter une photo
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Étape 3 : Contact */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5"
                  >
                    <p className="text-white/50 text-sm">
                      Renseignez vos coordonnées. Les visiteurs vous contacteront directement.
                    </p>

                    <div>
                      <label className="block text-white/70 text-xs font-medium mb-2">
                        Votre nom <span className="text-eorange">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.contact_nom}
                        onChange={(e) => updateField("contact_nom", e.target.value)}
                        placeholder="Nom complet ou nom de l'établissement"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-eorange/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-white/70 text-xs font-medium mb-2">
                        Téléphone <span className="text-eorange">*</span>
                      </label>
                      <input
                        type="tel"
                        value={form.contact_telephone}
                        onChange={(e) => updateField("contact_telephone", e.target.value)}
                        placeholder="+228 XX XX XX XX"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-eorange/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-white/70 text-xs font-medium mb-2">Email (optionnel)</label>
                      <input
                        type="email"
                        value={form.contact_email}
                        onChange={(e) => updateField("contact_email", e.target.value)}
                        placeholder="contact@exemple.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-eorange/50 transition-colors"
                      />
                    </div>

                    <div className="bg-eorange/5 border border-eorange/20 rounded-xl p-3 text-xs text-white/50">
                      Votre logement sera <span className="text-eorange font-medium">vérifié par notre équipe</span> avant d&apos;être publié. Vous serez contacté en cas de besoin.
                    </div>

                    {error && (
                      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-xs">
                        {error}
                      </div>
                    )}
                  </motion.div>
                )}
              </>
            )}
          </div>

          {/* Footer navigation */}
          {!isSuccess && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-white/8">
              <button
                onClick={() => step > 1 ? setStep((s) => (s - 1) as 1 | 2 | 3) : onClose()}
                className="text-white/50 hover:text-white text-sm transition-colors"
              >
                {step === 1 ? "Annuler" : "← Retour"}
              </button>

              {step < 3 ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3)}
                  disabled={step === 1 && !canGoStep2}
                  className="bg-eorange text-black font-semibold px-6 py-2 rounded-full text-sm hover:bg-eorange/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Suivant →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                  className="flex items-center gap-2 bg-eorange text-black font-semibold px-6 py-2 rounded-full text-sm hover:bg-eorange/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    "Publier mon logement"
                  )}
                </motion.button>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

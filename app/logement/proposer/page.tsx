"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Hotel, Building2, Home, Bed,
  Wifi, Wind, ChefHat, Waves, Car, Flame, Tv, Coffee,
  Zap, Shield, Plus, Trash2, CheckCircle2, Loader2, ImagePlus, X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { supabase } from "../../lib/supabase";
import { getSession } from "../../lib/auth";
import { alertNouveauLogement } from "../../lib/brevo";
import type { LogementType, Equipement, LogementInsert } from "../../types/logement";
import { TYPE_LABELS, EQUIPEMENT_LABELS } from "../../types/logement";

const TYPE_META: { id: LogementType; icon: React.ReactNode; desc: string }[] = [
  { id: "hotel",        icon: <Hotel className="w-5 h-5" />,     desc: "Établissement hôtelier" },
  { id: "appartement",  icon: <Building2 className="w-5 h-5" />, desc: "Meublé ou non-meublé" },
  { id: "airbnb",       icon: <Home className="w-5 h-5" />,      desc: "Location courte durée" },
  { id: "chambre_hote", icon: <Bed className="w-5 h-5" />,       desc: "Chez l'habitant" },
];

const EQUIPEMENTS: { id: Equipement; icon: React.ReactNode }[] = [
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

const STEPS = ["Type", "Détails", "Équipements", "Contact"];

const INITIAL: LogementInsert = {
  titre: "", description: "", type: "hotel",
  prix_par_nuit: null, adresse: "", ville: "Kara",
  capacite: 1, equipements: [], images: [""],
  contact_nom: "", contact_telephone: "", contact_email: "",
};

const INPUT_CLS = "w-full bg-white border border-black/25 hover:border-black/40 focus:border-[#006A4E] rounded-xl px-4 py-3 text-black text-sm placeholder:text-black/25 outline-none transition-all duration-200";

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[13px] font-medium text-black/50 mb-2">
      {children}
      {required && <span className="ml-1" style={{ color: "#CE1126" }}>*</span>}
    </label>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-clash font-bold text-black text-xl">{children}</h2>;
}

export default function ProposerLogementPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [userId, setUserId]           = useState<string | null>(null);
  const [step, setStep]               = useState(0);
  const [form, setForm]               = useState<LogementInsert>(INITIAL);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess]     = useState(false);
  const [error, setError]             = useState<string | null>(null);
  const [uploading, setUploading]     = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  useEffect(() => {
    getSession().then(session => {
      if (!session) router.replace("/auth?redirect=/logement/proposer");
      else { setUserId(session.user.id); setAuthChecked(true); }
    });
  }, [router]);

  const set = <K extends keyof LogementInsert>(key: K, value: LogementInsert[K]) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length || !userId) return;
    if (uploadedImages.length + files.length > 5) {
      alert("Maximum 5 photos."); return;
    }
    setUploading(true);
    const urls: string[] = [];
    for (const file of files) {
      const ext  = file.name.split(".").pop();
      const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from("logements").upload(path, file, { upsert: false });
      if (upErr) { console.error(upErr); continue; }
      const { data } = supabase.storage.from("logements").getPublicUrl(path);
      urls.push(data.publicUrl);
    }
    const next = [...uploadedImages, ...urls];
    setUploadedImages(next);
    set("images", next);
    setUploading(false);
    e.target.value = "";
  };

  const removeImage = (url: string) => {
    const next = uploadedImages.filter(u => u !== url);
    setUploadedImages(next);
    set("images", next);
  };

  const toggleEq = (eq: Equipement) =>
    set("equipements", form.equipements.includes(eq)
      ? form.equipements.filter(e => e !== eq)
      : [...form.equipements, eq]);

  const updateImage = (i: number, val: string) => {
    const next = [...form.images]; next[i] = val; set("images", next);
  };

  const canNext = [
    () => !!form.type,
    () => form.titre.trim().length >= 3,
    () => true,
    () => form.contact_nom.trim().length >= 2 && form.contact_telephone.trim().length >= 8,
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true); setError(null);
    try {
      const { error: err } = await supabase.from("logements").insert([{
        ...form,
        images: form.images.filter(u => u.trim() !== ""),
        approuve: false, disponible: true, user_id: userId,
      }]);
      if (err) throw err;
      await alertNouveauLogement(form.titre, form.type, form.ville);
      setIsSuccess(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!authChecked) return (
    <PageShell>
      <div className="flex justify-center items-center py-32">
        <Loader2 className="w-7 h-7 animate-spin" style={{ color: "#006A4E" }} />
      </div>
    </PageShell>
  );

  if (isSuccess) return (
    <PageShell>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center py-20 gap-6 max-w-sm mx-auto"
      >
        <div className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: "rgba(0,106,78,0.08)", border: "1px solid rgba(0,106,78,0.2)" }}>
          <CheckCircle2 className="w-9 h-9" style={{ color: "#006A4E" }} />
        </div>
        <div>
          <h2 className="font-clash font-bold text-black text-2xl mb-2">Soumission envoyée</h2>
          <p className="text-black/45 text-sm leading-relaxed">
            Votre logement est en attente de validation. Notre équipe l&apos;examinera sous 24 h.
          </p>
        </div>
      </motion.div>
    </PageShell>
  );

  return (
    <PageShell>
      <div className="max-w-2xl mx-auto">

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="font-clash font-bold text-black text-3xl md:text-4xl mb-2">
            Proposer un logement
          </h1>
          <p className="text-black/40 text-sm">
            Renseignez les informations de votre bien. Il sera visible après validation.
          </p>
        </motion.div>

        {/* Stepper */}
        <div className="flex items-center gap-0 mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300"
                  style={
                    i < step
                      ? { background: "#006A4E", color: "white" }
                      : i === step
                      ? { background: "rgba(0,106,78,0.08)", color: "#006A4E", border: "1px solid rgba(0,106,78,0.4)" }
                      : { background: "rgba(0,0,0,0.04)", color: "rgba(0,0,0,0.2)", border: "1px solid rgba(0,0,0,0.06)" }
                  }
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span className="text-[10px] whitespace-nowrap transition-colors duration-300"
                  style={{ color: i === step ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.2)" }}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px mx-2 mb-4 transition-all duration-300"
                  style={{ background: i < step ? "rgba(0,106,78,0.4)" : "rgba(0,0,0,0.07)" }} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)]">

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
              className="p-6 md:p-8"
            >
              {/* Étape 0 : Type */}
              {step === 0 && (
                <div className="space-y-6">
                  <SectionTitle>Quel type de logement proposez-vous ?</SectionTitle>
                  <div className="grid grid-cols-2 gap-3">
                    {TYPE_META.map(({ id, icon, desc }) => (
                      <button
                        key={id}
                        onClick={() => set("type", id)}
                        className="flex flex-col gap-2 p-4 rounded-xl border text-left transition-all duration-200"
                        style={form.type === id
                          ? { borderColor: "rgba(0,106,78,0.4)", background: "rgba(0,106,78,0.05)" }
                          : { borderColor: "rgba(0,0,0,0.07)", background: "white" }}
                      >
                        <span style={{ color: form.type === id ? "#006A4E" : "rgba(0,0,0,0.25)" }}>{icon}</span>
                        <span className="text-sm font-medium" style={{ color: form.type === id ? "#000" : "rgba(0,0,0,0.5)" }}>
                          {TYPE_LABELS[id]}
                        </span>
                        <span className="text-[11px] text-black/30">{desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Étape 1 : Détails */}
              {step === 1 && (
                <div className="space-y-5">
                  <SectionTitle>Informations sur le logement</SectionTitle>
                  <div>
                    <Label required>Nom du logement</Label>
                    <input className={INPUT_CLS} value={form.titre} onChange={e => set("titre", e.target.value)} placeholder="Ex : Villa Ahmed, Hôtel Palace Kara…" />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <textarea className={`${INPUT_CLS} resize-none`} value={form.description} onChange={e => set("description", e.target.value)} placeholder="Décrivez votre logement : emplacement, ambiance, points forts…" rows={4} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Prix / nuit (FCFA)</Label>
                      <input className={INPUT_CLS} type="number" value={form.prix_par_nuit ?? ""} onChange={e => set("prix_par_nuit", e.target.value ? Number(e.target.value) : null)} placeholder="15 000" min={0} />
                    </div>
                    <div>
                      <Label>Capacité (personnes)</Label>
                      <input className={INPUT_CLS} type="number" value={form.capacite} onChange={e => set("capacite", Number(e.target.value))} min={1} max={50} />
                    </div>
                  </div>
                  <div>
                    <Label>Adresse / Quartier</Label>
                    <input className={INPUT_CLS} value={form.adresse} onChange={e => set("adresse", e.target.value)} placeholder="Quartier, rue, point de repère…" />
                  </div>
                  <div>
                    <Label>Photos — max 5</Label>

                    {/* Aperçu des images uploadées */}
                    {uploadedImages.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {uploadedImages.map(url => (
                          <div key={url} className="relative w-20 h-20 rounded-xl overflow-hidden group border border-black/10">
                            <img src={url} alt="" className="w-full h-full object-cover" />
                            <button
                              onClick={() => removeImage(url)}
                              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            >
                              <X className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Zone d'upload */}
                    {uploadedImages.length < 5 && (
                      <label className="flex flex-col items-center justify-center gap-2 w-full py-8 rounded-xl border-2 border-dashed border-black/20 hover:border-[#006A4E]/50 cursor-pointer transition-colors">
                        {uploading
                          ? <Loader2 className="w-6 h-6 animate-spin text-black/30" />
                          : <ImagePlus className="w-6 h-6 text-black/30" />}
                        <span className="text-sm text-black/40">
                          {uploading ? "Envoi en cours…" : "Cliquer pour ajouter des photos"}
                        </span>
                        <span className="text-xs text-black/25">{uploadedImages.length}/5 — JPG, PNG, WEBP</span>
                        <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} disabled={uploading} />
                      </label>
                    )}
                  </div>
                </div>
              )}

              {/* Étape 2 : Équipements */}
              {step === 2 && (
                <div className="space-y-6">
                  <SectionTitle>Quels équipements proposez-vous ?</SectionTitle>
                  <p className="text-black/35 text-sm -mt-2">Sélectionnez tout ce qui s&apos;applique.</p>
                  <div className="grid grid-cols-2 gap-2">
                    {EQUIPEMENTS.map(({ id, icon }) => {
                      const active = form.equipements.includes(id);
                      return (
                        <button
                          key={id}
                          onClick={() => toggleEq(id)}
                          className="flex items-center gap-3 p-3.5 rounded-xl border text-sm text-left transition-all duration-200"
                          style={active
                            ? { borderColor: "rgba(0,106,78,0.4)", background: "rgba(0,106,78,0.05)", color: "#000" }
                            : { borderColor: "rgba(0,0,0,0.07)", background: "white", color: "rgba(0,0,0,0.35)" }}
                        >
                          <span style={{ color: active ? "#006A4E" : "rgba(0,0,0,0.25)" }}>{icon}</span>
                          {EQUIPEMENT_LABELS[id]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Étape 3 : Contact */}
              {step === 3 && (
                <div className="space-y-5">
                  <SectionTitle>Vos coordonnées</SectionTitle>
                  <p className="text-black/35 text-sm -mt-2">
                    Les visiteurs vous contacteront directement.
                  </p>
                  <div>
                    <Label required>Nom / Nom de l&apos;établissement</Label>
                    <input className={INPUT_CLS} value={form.contact_nom} onChange={e => set("contact_nom", e.target.value)} placeholder="Votre nom complet ou raison sociale" />
                  </div>
                  <div>
                    <Label required>Téléphone</Label>
                    <input className={INPUT_CLS} type="tel" value={form.contact_telephone} onChange={e => set("contact_telephone", e.target.value)} placeholder="+228 XX XX XX XX" />
                  </div>
                  <div>
                    <Label>Email (optionnel)</Label>
                    <input className={INPUT_CLS} type="email" value={form.contact_email} onChange={e => set("contact_email", e.target.value)} placeholder="contact@exemple.com" />
                  </div>
                  <div className="rounded-xl p-4 text-[12px] text-black/40 leading-relaxed"
                    style={{ background: "rgba(0,106,78,0.04)", border: "1px solid rgba(0,106,78,0.12)" }}>
                    Votre logement sera <span className="font-medium" style={{ color: "#006A4E" }}>examiné par notre équipe</span> avant publication. Délai habituel : 24 h.
                  </div>
                  {error && (
                    <div className="rounded-xl p-3 text-xs text-red-600"
                      style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}>
                      {error}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 md:px-8 py-4 border-t border-black/[0.06]">
            <button
              onClick={() => step > 0 ? setStep(s => s - 1) : undefined}
              disabled={step === 0}
              className="text-sm transition-colors disabled:opacity-20 disabled:cursor-default text-black/40 hover:text-black"
            >
              ← Retour
            </button>

            {step < STEPS.length - 1 ? (
              <button
                onClick={() => canNext[step]() && setStep(s => s + 1)}
                disabled={!canNext[step]()}
                className="flex items-center gap-2 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-opacity hover:opacity-85 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ background: "#006A4E" }}
              >
                Continuer <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canNext[3]() || isSubmitting}
                className="flex items-center gap-2 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-opacity hover:opacity-85 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ background: "#006A4E" }}
              >
                {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Envoi…</> : "Publier mon logement"}
              </button>
            )}
          </div>
        </div>

      </div>
    </PageShell>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white font-clash">
      <Navbar />
      <main className="flex-grow pt-28 pb-20 px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}

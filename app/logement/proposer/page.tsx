"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Hotel, Building2, Home, Bed,
  Wifi, Wind, ChefHat, Waves, Car, Flame, Tv, Coffee,
  Zap, Shield, Plus, Trash2, CheckCircle2, Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { supabase } from "../../lib/supabase";
import { getSession } from "../../lib/auth";
import type { LogementType, Equipement, LogementInsert } from "../../types/logement";
import { TYPE_LABELS, EQUIPEMENT_LABELS } from "../../types/logement";

/* ─── Types ────────────────────────────────────────────────── */

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

/* ─── Helpers UI ────────────────────────────────────────────── */

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[13px] font-medium text-white/50 mb-2">
      {children}
      {required && <span className="text-eorange ml-1">*</span>}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full bg-white/[0.04] border border-white/[0.08] hover:border-white/20 focus:border-eorange/60 focus:bg-white/[0.06] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none transition-all duration-200 ${props.className ?? ""}`}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full bg-white/[0.04] border border-white/[0.08] hover:border-white/20 focus:border-eorange/60 focus:bg-white/[0.06] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none transition-all duration-200 resize-none"
    />
  );
}

/* ─── Page ──────────────────────────────────────────────────── */

export default function ProposerLogementPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [userId, setUserId]           = useState<string | null>(null);

  const [step, setStep]           = useState(0);
  const [form, setForm]           = useState<LogementInsert>(INITIAL);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError]         = useState<string | null>(null);

  /* Vérification de la session au montage */
  useEffect(() => {
    getSession().then(session => {
      if (!session) {
        router.replace("/auth?redirect=/logement/proposer");
      } else {
        setUserId(session.user.id);
        setAuthChecked(true);
      }
    });
  }, [router]);

  const set = <K extends keyof LogementInsert>(key: K, value: LogementInsert[K]) =>
    setForm(prev => ({ ...prev, [key]: value }));

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
    setIsSubmitting(true);
    setError(null);
    try {
      const payload = {
        ...form,
        images: form.images.filter(u => u.trim() !== ""),
        approuve: false,
        disponible: true,
        user_id: userId,
      };
      const { error: err } = await supabase.from("logements").insert([payload]);
      if (err) throw err;
      setIsSuccess(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* Gate : en attente de vérification auth */
  if (!authChecked) {
    return (
      <PageShell>
        <div className="flex justify-center items-center py-32">
          <Loader2 className="w-7 h-7 text-eorange animate-spin" />
        </div>
      </PageShell>
    );
  }

  /* ─── Succès ─────────────────────────────────────────────── */
  if (isSuccess) {
    return (
      <PageShell>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center py-20 gap-6 max-w-sm mx-auto"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-white text-2xl mb-2">Soumission envoyée</h2>
            <p className="text-white/40 text-sm leading-relaxed">
              Votre logement est en attente de validation. Notre équipe l&apos;examinera sous 24 h. Vous serez contacté si besoin.
            </p>
          </div>
          <Link
            href="/logement"
            className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.10] text-white/70 hover:text-white rounded-full px-6 py-2.5 text-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Voir les logements
          </Link>
        </motion.div>
      </PageShell>
    );
  }

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
          <h1 className="text-white text-3xl md:text-4xl mb-2">
            Proposer un logement
          </h1>
          <p className="text-white/35 text-sm">
            Renseignez les informations de votre bien. Il sera visible après validation.
          </p>
        </motion.div>

        {/* Stepper */}
        <div className="flex items-center gap-0 mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                    i < step
                      ? "bg-eorange text-black"
                      : i === step
                      ? "bg-white/10 text-white border border-eorange/60"
                      : "bg-white/[0.04] text-white/20 border border-white/[0.06]"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span className={`text-[10px] whitespace-nowrap transition-colors duration-300 ${i === step ? "text-white/60" : "text-white/20"}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-2 mb-4 transition-all duration-300 ${i < step ? "bg-eorange/50" : "bg-white/[0.06]"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Card formulaire */}
        <div className="bg-[#131313] border border-white/[0.06] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.5)]">

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
              className="p-6 md:p-8"
            >
              {/* ── Étape 0 : Type ── */}
              {step === 0 && (
                <div className="space-y-6">
                  <SectionTitle>Quel type de logement proposez-vous ?</SectionTitle>
                  <div className="grid grid-cols-2 gap-3">
                    {TYPE_META.map(({ id, icon, desc }) => (
                      <button
                        key={id}
                        onClick={() => set("type", id)}
                        className={`flex flex-col gap-2 p-4 rounded-xl border text-left transition-all duration-200 ${
                          form.type === id
                            ? "border-eorange/50 bg-eorange/[0.07]"
                            : "border-white/[0.06] bg-white/[0.02] hover:border-white/20"
                        }`}
                      >
                        <span className={form.type === id ? "text-eorange" : "text-white/30"}>
                          {icon}
                        </span>
                        <span className={`text-sm font-medium ${form.type === id ? "text-white" : "text-white/50"}`}>
                          {TYPE_LABELS[id]}
                        </span>
                        <span className="text-[11px] text-white/25">{desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Étape 1 : Détails ── */}
              {step === 1 && (
                <div className="space-y-5">
                  <SectionTitle>Informations sur le logement</SectionTitle>

                  <div>
                    <Label required>Nom du logement</Label>
                    <Input
                      value={form.titre}
                      onChange={e => set("titre", e.target.value)}
                      placeholder="Ex : Villa Ahmed, Hôtel Palace Kara…"
                    />
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={form.description}
                      onChange={e => set("description", e.target.value)}
                      placeholder="Décrivez votre logement : emplacement, ambiance, points forts…"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Prix / nuit (FCFA)</Label>
                      <Input
                        type="number"
                        value={form.prix_par_nuit ?? ""}
                        onChange={e => set("prix_par_nuit", e.target.value ? Number(e.target.value) : null)}
                        placeholder="15 000"
                        min={0}
                      />
                    </div>
                    <div>
                      <Label>Capacité (personnes)</Label>
                      <Input
                        type="number"
                        value={form.capacite}
                        onChange={e => set("capacite", Number(e.target.value))}
                        min={1}
                        max={50}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Adresse / Quartier</Label>
                    <Input
                      value={form.adresse}
                      onChange={e => set("adresse", e.target.value)}
                      placeholder="Quartier, rue, point de repère…"
                    />
                  </div>

                  {/* Photos */}
                  <div>
                    <Label>Photos (URL) — max 5</Label>
                    <div className="space-y-2">
                      {form.images.map((url, i) => (
                        <div key={i} className="flex gap-2">
                          <Input
                            type="url"
                            value={url}
                            onChange={e => updateImage(i, e.target.value)}
                            placeholder={`https://… (photo ${i + 1})`}
                          />
                          {form.images.length > 1 && (
                            <button
                              onClick={() => set("images", form.images.filter((_, j) => j !== i))}
                              className="text-white/20 hover:text-white/50 transition-colors p-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      {form.images.length < 5 && (
                        <button
                          onClick={() => set("images", [...form.images, ""])}
                          className="flex items-center gap-1.5 text-white/30 hover:text-white/60 text-xs transition-colors mt-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> Ajouter une photo
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Étape 2 : Équipements ── */}
              {step === 2 && (
                <div className="space-y-6">
                  <SectionTitle>Quels équipements proposez-vous ?</SectionTitle>
                  <p className="text-white/30 text-sm -mt-2">Sélectionnez tout ce qui s&apos;applique.</p>
                  <div className="grid grid-cols-2 gap-2">
                    {EQUIPEMENTS.map(({ id, icon }) => {
                      const active = form.equipements.includes(id);
                      return (
                        <button
                          key={id}
                          onClick={() => toggleEq(id)}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border text-sm text-left transition-all duration-200 ${
                            active
                              ? "border-eorange/40 bg-eorange/[0.06] text-white"
                              : "border-white/[0.06] bg-white/[0.02] text-white/35 hover:border-white/15 hover:text-white/60"
                          }`}
                        >
                          <span className={active ? "text-eorange" : ""}>{icon}</span>
                          {EQUIPEMENT_LABELS[id]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── Étape 3 : Contact ── */}
              {step === 3 && (
                <div className="space-y-5">
                  <SectionTitle>Vos coordonnées</SectionTitle>
                  <p className="text-white/30 text-sm -mt-2">
                    Les visiteurs vous contacteront directement. Ces informations ne seront pas affichées publiquement en dehors du site Evala.
                  </p>

                  <div>
                    <Label required>Nom / Nom de l&apos;établissement</Label>
                    <Input
                      value={form.contact_nom}
                      onChange={e => set("contact_nom", e.target.value)}
                      placeholder="Votre nom complet ou raison sociale"
                    />
                  </div>

                  <div>
                    <Label required>Téléphone</Label>
                    <Input
                      type="tel"
                      value={form.contact_telephone}
                      onChange={e => set("contact_telephone", e.target.value)}
                      placeholder="+228 XX XX XX XX"
                    />
                  </div>

                  <div>
                    <Label>Email (optionnel)</Label>
                    <Input
                      type="email"
                      value={form.contact_email}
                      onChange={e => set("contact_email", e.target.value)}
                      placeholder="contact@exemple.com"
                    />
                  </div>

                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-[12px] text-white/30 leading-relaxed">
                    Votre logement sera <span className="text-white/60">examiné par notre équipe</span> avant publication. Délai habituel : 24 h.
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-xs">
                      {error}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Footer navigation */}
          <div className="flex items-center justify-between px-6 md:px-8 py-4 border-t border-white/[0.05]">
            <button
              onClick={() => step > 0 ? setStep(s => s - 1) : undefined}
              className={`text-sm transition-colors ${
                step === 0
                  ? "text-white/10 cursor-default"
                  : "text-white/40 hover:text-white"
              }`}
              disabled={step === 0}
            >
              ← Retour
            </button>

            {step < STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => canNext[step]() && setStep(s => s + 1)}
                disabled={!canNext[step]()}
                className="flex items-center gap-2 bg-eorange hover:bg-eorange/90 text-black text-sm font-semibold px-6 py-2.5 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Continuer <ArrowRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={!canNext[3]() || isSubmitting}
                className="flex items-center gap-2 bg-eorange hover:bg-eorange/90 text-black text-sm font-semibold px-6 py-2.5 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Envoi…</>
                  : "Publier mon logement"
                }
              </motion.button>
            )}
          </div>
        </div>

      </div>
    </PageShell>
  );
}

/* ─── Sous-composants ───────────────────────────────────────── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-white text-xl">{children}</h2>;
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex min-h-screen flex-col text-white font-poppins"
      style={{
        backgroundImage: "url('/images/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative z-0 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-black/85 pt-28 pb-20 px-4">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

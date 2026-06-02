"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, MapPin, Phone, Mail, User,
  ChevronRight, Check, Loader2, Plus, X, ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { supabase } from "../../lib/supabase";
import { alertNouvelleOffre } from "../../lib/brevo";
import type { TypeContrat, DomaineEmploi } from "../../types/emploi";

type StepId = 1 | 2 | 3;

interface FormData {
  type_contrat: TypeContrat | "";
  domaine: DomaineEmploi | "";
  titre: string;
  description: string;
  lieu: string;
  salaire: string;
  date_debut: string;
  date_fin: string;
  competences: string[];
  contact_nom: string;
  contact_telephone: string;
  contact_email: string;
}

const CONTRATS: { id: TypeContrat; label: string; desc: string }[] = [
  { id: "mission",      label: "Mission ponctuelle", desc: "Durée limitée au festival" },
  { id: "prestation",   label: "Prestation / Service", desc: "Prestation rémunérée" },
  { id: "benevolat",    label: "Bénévolat",   desc: "Mission volontaire" },
  { id: "journalier",   label: "Journalier",  desc: "Rémunéré à la journée" },
  { id: "temps_partiel",label: "Temps partiel", desc: "Quelques heures par jour" },
];

const DOMAINES: { id: DomaineEmploi; label: string }[] = [
  { id: "securite",      label: "Sécurité" },
  { id: "restauration",  label: "Restauration" },
  { id: "logistique",    label: "Logistique" },
  { id: "communication", label: "Communication" },
  { id: "animation",     label: "Animation" },
  { id: "transport",     label: "Transport" },
  { id: "sante",         label: "Santé" },
  { id: "artisanat",     label: "Artisanat" },
  { id: "technique",     label: "Technique" },
  { id: "administration",label: "Administration" },
  { id: "autre",         label: "Autre" },
];

const STEPS = [
  { id: 1 as StepId, label: "Type" },
  { id: 2 as StepId, label: "Détails" },
  { id: 3 as StepId, label: "Contact" },
];

/* ── Input helpers ── */
const inputClass = "w-full bg-white border border-black/25 rounded-xl px-4 py-3 text-black text-sm placeholder-black/25 focus:outline-none focus:border-[#006A4E] transition-colors";
const inputIconClass = "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/25";
const labelClass = "block text-black/45 text-xs mb-1.5 font-medium";

export default function ProposerEmploiPage() {
  const router = useRouter();
  const [step, setStep] = useState<StepId>(1);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [competenceInput, setCompetenceInput] = useState("");

  const [form, setForm] = useState<FormData>({
    type_contrat: "", domaine: "", titre: "", description: "",
    lieu: "", salaire: "", date_debut: "", date_fin: "",
    competences: [], contact_nom: "", contact_telephone: "", contact_email: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push("/auth?redirect=/emplois/proposer");
      else setIsAuthChecking(false);
    });
  }, [router]);

  const set = (key: keyof FormData, value: string | string[]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const addCompetence = () => {
    const v = competenceInput.trim();
    if (v && !form.competences.includes(v)) set("competences", [...form.competences, v]);
    setCompetenceInput("");
  };

  const removeCompetence = (c: string) =>
    set("competences", form.competences.filter((x) => x !== c));

  const canNext = () => {
    if (step === 1) return form.type_contrat !== "" && form.domaine !== "";
    if (step === 2) return form.titre.trim() !== "" && form.description.trim() !== "" && form.lieu.trim() !== "";
    return form.contact_nom.trim() !== "" && form.contact_telephone.trim() !== "";
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const { error } = await supabase.from("offres_emploi").insert([{
        titre: form.titre.trim(),
        description: form.description.trim(),
        type_contrat: form.type_contrat as TypeContrat,
        domaine: form.domaine as DomaineEmploi,
        lieu: form.lieu.trim(),
        salaire: form.salaire.trim() || null,
        date_debut: form.date_debut || null,
        date_fin: form.date_fin || null,
        competences: form.competences,
        contact_nom: form.contact_nom.trim(),
        contact_telephone: form.contact_telephone.trim(),
        contact_email: form.contact_email.trim() || null,
        approuve: false,
        active: true,
        user_id: sessionData.session?.user.id ?? null,
      }]);
      if (error) throw error;
      await alertNouvelleOffre(form.titre, form.domaine, form.lieu);
      setSubmitted(true);
    } catch (err) {
      console.error("Erreur soumission offre:", err);
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Auth loading ── */
  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex gap-2">
          {["#CE1126", "#FFCD00", "#006A4E"].map((c, i) => (
            <motion.div key={i} className="w-2 h-2 rounded-full"
              style={{ background: c }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    );
  }

  /* ── Confirmation ── */
  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col font-poppins bg-white">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-4 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl overflow-hidden border border-black/[0.07] shadow-[0_4px_24px_rgba(0,0,0,0.08)] max-w-md w-full"
          >
            {/* Header vert */}
            <div className="px-10 pt-10 pb-8 text-center" style={{ background: "#006A4E" }}>
              <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-5">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-bold text-white text-2xl mb-2">Offre soumise !</h2>
              <p className="text-white/60 text-sm leading-relaxed">
                Votre offre sera visible après validation par notre équipe.
              </p>
            </div>

            {/* Zigzag */}
            <svg width="100%" height="10" viewBox="0 0 90 10" preserveAspectRatio="none" className="block">
              <polygon points="0,0 15,10 30,0" fill="#CE1126" />
              <polygon points="30,0 45,10 60,0" fill="#FFCD00" />
              <polygon points="60,0 75,10 90,0" fill="#CE1126" />
              <polygon points="0,10 15,0 0,0" fill="#006A4E" />
              <polygon points="15,10 30,0 45,10" fill="#FFCD00" />
              <polygon points="45,10 60,0 75,10" fill="#006A4E" />
              <polygon points="75,10 90,0 90,10" fill="#FFCD00" />
            </svg>

            {/* Corps */}
            <div className="px-10 py-8 bg-white flex flex-col gap-3">
              <Link href="/emplois"
                className="block w-full py-3 rounded-xl text-white font-semibold text-sm text-center hover:opacity-90 transition-opacity"
                style={{ background: "#006A4E" }}>
                Voir les offres
              </Link>
              <Link href="/dashboard"
                className="block w-full py-3 rounded-xl text-sm text-center font-medium text-black/50 hover:text-black transition-colors"
                style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
                Mon tableau de bord
              </Link>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  /* ── Formulaire ── */
  return (
    <div className="flex min-h-screen flex-col font-poppins bg-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Retour + Titre */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} className="mb-10">
            <Link href="/emplois"
              className="inline-flex items-center gap-1.5 text-black/35 hover:text-black text-xs transition-colors duration-200 mb-6">
              <ArrowLeft className="w-3.5 h-3.5" />
              Retour aux offres
            </Link>
            <h1 className="font-bold text-black leading-tight mb-2"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)" }}>
              Publier une{" "}
              <em className="not-italic" style={{ color: "#CE1126" }}>offre d&apos;emploi</em>
            </h1>
            <p className="text-black/40 text-sm">Votre offre sera visible après validation par notre équipe.</p>
          </motion.div>

          {/* Stepper */}
          <div className="flex items-center justify-center gap-0 mb-10">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300"
                    style={
                      step > s.id
                        ? { background: "#006A4E", color: "#fff" }
                        : step === s.id
                        ? { background: "rgba(0,106,78,0.1)", color: "#006A4E", border: "1px solid rgba(0,106,78,0.3)" }
                        : { background: "rgba(0,0,0,0.04)", color: "rgba(0,0,0,0.3)", border: "1px solid rgba(0,0,0,0.08)" }
                    }
                  >
                    {step > s.id ? <Check className="w-4 h-4" /> : s.id}
                  </div>
                  <span className="mt-1 text-[10px] font-medium"
                    style={{ color: step >= s.id ? "#006A4E" : "rgba(0,0,0,0.3)" }}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-14 h-px mx-2 mb-4 transition-all duration-300"
                    style={{ background: step > s.id ? "#006A4E" : "rgba(0,0,0,0.08)" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-black/[0.07] shadow-[0_4px_24px_rgba(0,0,0,0.07)] overflow-hidden bg-white">
            <AnimatePresence mode="wait">

              {/* ── Étape 1 : Type & Domaine ── */}
              {step === 1 && (
                <motion.div key="step1"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                  className="p-7 md:p-10">

                  {/* Header */}
                  <div className="flex items-center gap-2.5 mb-7">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(206,17,38,0.08)" }}>
                      <Briefcase className="w-4 h-4" style={{ color: "#CE1126" }} />
                    </div>
                    <h2 className="font-semibold text-black text-base">Type de contrat</h2>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                    {CONTRATS.map((c) => (
                      <button key={c.id} onClick={() => set("type_contrat", c.id)}
                        className="p-4 rounded-2xl border text-left transition-all duration-200"
                        style={
                          form.type_contrat === c.id
                            ? { border: "1px solid rgba(206,17,38,0.4)", background: "rgba(206,17,38,0.06)" }
                            : { border: "1px solid rgba(0,0,0,0.08)", background: "transparent" }
                        }
                      >
                        <div className="font-semibold text-sm mb-1"
                          style={{ color: form.type_contrat === c.id ? "#CE1126" : "#000" }}>
                          {c.label}
                        </div>
                        <div className="text-xs text-black/40">{c.desc}</div>
                      </button>
                    ))}
                  </div>

                  {/* Séparateur tricolore */}
                  <div className="flex h-px overflow-hidden rounded-full mb-6">
                    <div className="w-16" style={{ background: "#CE1126" }} />
                    <div className="w-16" style={{ background: "#FFCD00" }} />
                    <div className="flex-1" style={{ background: "linear-gradient(to right, #006A4E, transparent)" }} />
                  </div>

                  <h2 className="font-semibold text-black text-base mb-4">Domaine</h2>
                  <div className="flex flex-wrap gap-2">
                    {DOMAINES.map((d) => (
                      <button key={d.id} onClick={() => set("domaine", d.id)}
                        className="px-4 py-1.5 rounded-full text-sm border transition-all duration-200"
                        style={
                          form.domaine === d.id
                            ? { background: "#006A4E", color: "#fff", border: "1px solid #006A4E" }
                            : { background: "transparent", color: "rgba(0,0,0,0.55)", border: "1px solid rgba(0,0,0,0.1)" }
                        }
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── Étape 2 : Détails ── */}
              {step === 2 && (
                <motion.div key="step2"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                  className="p-7 md:p-10 space-y-5">

                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(0,106,78,0.08)" }}>
                      <Briefcase className="w-4 h-4" style={{ color: "#006A4E" }} />
                    </div>
                    <h2 className="font-semibold text-black text-base">Informations sur l&apos;offre</h2>
                  </div>

                  <div>
                    <label className={labelClass}>Intitulé du poste *</label>
                    <input type="text" value={form.titre}
                      onChange={(e) => set("titre", e.target.value)}
                      placeholder="ex : Agent de sécurité, Cuisinier..."
                      className={inputClass} />
                  </div>

                  <div>
                    <label className={labelClass}>Description *</label>
                    <textarea value={form.description}
                      onChange={(e) => set("description", e.target.value)}
                      placeholder="Décrivez les responsabilités, les conditions de travail..."
                      rows={4} className={`${inputClass} resize-none`} />
                  </div>

                  <div>
                    <label className={labelClass}>Lieu *</label>
                    <div className="relative">
                      <MapPin className={inputIconClass} />
                      <input type="text" value={form.lieu}
                        onChange={(e) => set("lieu", e.target.value)}
                        placeholder="ex : Kara, Togo"
                        className={`${inputClass} pl-10`} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Rémunération (optionnel)</label>
                    <input type="text" value={form.salaire}
                      onChange={(e) => set("salaire", e.target.value)}
                      placeholder="ex : 50 000 FCFA / mois"
                      className={inputClass} />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Date de début</label>
                      <input type="date" value={form.date_debut}
                        onChange={(e) => set("date_debut", e.target.value)}
                        className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Date de fin</label>
                      <input type="date" value={form.date_fin}
                        onChange={(e) => set("date_fin", e.target.value)}
                        className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Compétences requises</label>
                    <div className="flex gap-2">
                      <input type="text" value={competenceInput}
                        onChange={(e) => setCompetenceInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCompetence(); } }}
                        placeholder="ex : permis B, HACCP..."
                        className={`${inputClass} flex-1`} />
                      <button onClick={addCompetence}
                        className="px-4 py-3 rounded-xl border transition-colors"
                        style={{ background: "rgba(0,106,78,0.07)", border: "1px solid rgba(0,106,78,0.2)", color: "#006A4E" }}>
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    {form.competences.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {form.competences.map((c) => (
                          <span key={c}
                            className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full"
                            style={{ background: "rgba(0,106,78,0.07)", border: "1px solid rgba(0,106,78,0.18)", color: "#006A4E" }}>
                            {c}
                            <button onClick={() => removeCompetence(c)} className="ml-0.5 hover:opacity-60 transition-opacity">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* ── Étape 3 : Contact ── */}
              {step === 3 && (
                <motion.div key="step3"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                  className="p-7 md:p-10 space-y-5">

                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(138,109,0,0.09)" }}>
                      <User className="w-4 h-4" style={{ color: "#8a6d00" }} />
                    </div>
                    <h2 className="font-semibold text-black text-base">Vos coordonnées</h2>
                  </div>

                  <div>
                    <label className={labelClass}>Nom / Entreprise *</label>
                    <div className="relative">
                      <User className={inputIconClass} />
                      <input type="text" value={form.contact_nom}
                        onChange={(e) => set("contact_nom", e.target.value)}
                        placeholder="Votre nom ou raison sociale"
                        className={`${inputClass} pl-10`} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Téléphone *</label>
                    <div className="relative">
                      <Phone className={inputIconClass} />
                      <input type="tel" value={form.contact_telephone}
                        onChange={(e) => set("contact_telephone", e.target.value)}
                        placeholder="+228 90 00 00 00"
                        className={`${inputClass} pl-10`} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Email (optionnel)</label>
                    <div className="relative">
                      <Mail className={inputIconClass} />
                      <input type="email" value={form.contact_email}
                        onChange={(e) => set("contact_email", e.target.value)}
                        placeholder="contact@exemple.com"
                        className={`${inputClass} pl-10`} />
                    </div>
                  </div>

                  {/* Récapitulatif */}
                  <div className="rounded-2xl overflow-hidden border border-black/[0.07] mt-4">
                    <div className="px-5 py-4" style={{ background: "#006A4E" }}>
                      <p className="text-white/70 text-xs font-medium uppercase">Récapitulatif</p>
                    </div>
                    <svg width="100%" height="8" viewBox="0 0 90 8" preserveAspectRatio="none" className="block">
                      <polygon points="0,0 15,8 30,0" fill="#CE1126" />
                      <polygon points="30,0 45,8 60,0" fill="#FFCD00" />
                      <polygon points="60,0 75,8 90,0" fill="#006A4E" />
                      <polygon points="0,8 15,0 0,0" fill="#006A4E" />
                      <polygon points="15,8 30,0 45,8" fill="#FFCD00" />
                      <polygon points="45,8 60,0 75,8" fill="#CE1126" />
                      <polygon points="75,8 90,0 90,8" fill="#006A4E" />
                    </svg>
                    <div className="px-5 py-4 bg-white space-y-2 text-sm">
                      {[
                        { label: "Poste",   value: form.titre || "—" },
                        { label: "Lieu",    value: form.lieu || "—" },
                        { label: "Contrat", value: form.type_contrat ? form.type_contrat.toUpperCase() : "—" },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between">
                          <span className="text-black/40">{item.label}</span>
                          <span className="text-black font-medium text-xs">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Navigation */}
            <div className="px-7 md:px-10 pb-7 md:pb-10 pt-2 flex items-center justify-between gap-3 border-t border-black/[0.05]">
              {step > 1 ? (
                <button onClick={() => setStep((s) => (s - 1) as StepId)}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-black/50 hover:text-black transition-all duration-200"
                  style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)" }}>
                  Retour
                </button>
              ) : <div />}

              {step < 3 ? (
                <button
                  onClick={() => canNext() && setStep((s) => (s + 1) as StepId)}
                  disabled={!canNext()}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={canNext()
                    ? { background: "#CE1126", color: "#fff" }
                    : { background: "rgba(0,0,0,0.04)", color: "rgba(0,0,0,0.2)", border: "1px solid rgba(0,0,0,0.06)", cursor: "not-allowed" }
                  }
                >
                  Continuer
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canNext() || isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={canNext() && !isSubmitting
                    ? { background: "#006A4E", color: "#fff" }
                    : { background: "rgba(0,0,0,0.04)", color: "rgba(0,0,0,0.2)", border: "1px solid rgba(0,0,0,0.06)", cursor: "not-allowed" }
                  }
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" />Envoi...</>
                  ) : (
                    <><Check className="w-4 h-4" />Publier l&apos;offre</>
                  )}
                </button>
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

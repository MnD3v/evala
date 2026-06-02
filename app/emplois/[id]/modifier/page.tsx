"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, Plus, X } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { supabase } from "@/app/lib/supabase";
import { getSession } from "@/app/lib/auth";
import type { TypeContrat, DomaineEmploi } from "@/app/types/emploi";

const INPUT = "w-full bg-white border border-black/25 hover:border-black/40 focus:border-[#006A4E] rounded-xl px-4 py-3 text-black text-sm placeholder:text-black/25 outline-none transition-all duration-200";

const CONTRATS: { id: TypeContrat; label: string; desc: string }[] = [
  { id: "mission",      label: "Mission ponctuelle", desc: "Durée limitée au festival" },
  { id: "prestation",   label: "Prestation / Service", desc: "Prestation rémunérée" },
  { id: "benevolat",    label: "Bénévolat",   desc: "Mission volontaire" },
  { id: "journalier",   label: "Journalier",  desc: "Rémunéré à la journée" },
  { id: "temps_partiel",label: "Temps partiel", desc: "Quelques heures par jour" },
];

const DOMAINES: { id: DomaineEmploi; label: string }[] = [
  { id: "securite", label: "Sécurité" }, { id: "restauration", label: "Restauration" },
  { id: "logistique", label: "Logistique" }, { id: "communication", label: "Communication" },
  { id: "animation", label: "Animation" }, { id: "transport", label: "Transport" },
  { id: "sante", label: "Santé" }, { id: "artisanat", label: "Artisanat" },
  { id: "technique", label: "Technique" }, { id: "administration", label: "Administration" },
  { id: "autre", label: "Autre" },
];

export default function ModifierOffrePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newCompetence, setNewCompetence] = useState("");
  const [form, setForm] = useState({
    titre: "", description: "", type_contrat: "mission" as TypeContrat,
    domaine: "animation" as DomaineEmploi, lieu: "", salaire: "",
    date_debut: "", date_fin: "", competences: [] as string[],
    contact_nom: "", contact_telephone: "", contact_email: "",
  });

  useEffect(() => {
    const load = async () => {
      const session = await getSession();
      if (!session) { router.replace("/auth"); return; }
      const { data } = await supabase.from("offres_emploi").select("*").eq("id", id).eq("user_id", session.user.id).single();
      if (!data) { router.replace("/dashboard"); return; }
      setForm({
        titre: data.titre ?? "", description: data.description ?? "",
        type_contrat: data.type_contrat, domaine: data.domaine,
        lieu: data.lieu ?? "", salaire: data.salaire ?? "",
        date_debut: data.date_debut ?? "", date_fin: data.date_fin ?? "",
        competences: data.competences ?? [],
        contact_nom: data.contact_nom ?? "", contact_telephone: data.contact_telephone ?? "",
        contact_email: data.contact_email ?? "",
      });
      setIsLoading(false);
    };
    load();
  }, [id, router]);

  const set = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));
  const addCompetence = () => {
    if (!newCompetence.trim()) return;
    setForm(prev => ({ ...prev, competences: [...prev.competences, newCompetence.trim()] }));
    setNewCompetence("");
  };
  const removeCompetence = (i: number) => setForm(prev => ({ ...prev, competences: prev.competences.filter((_, j) => j !== i) }));

  const handleSubmit = async () => {
    setIsSubmitting(true); setError(null);
    try {
      const { error: err } = await supabase.from("offres_emploi").update({
        titre: form.titre, description: form.description, type_contrat: form.type_contrat,
        domaine: form.domaine, lieu: form.lieu, salaire: form.salaire || null,
        date_debut: form.date_debut || null, date_fin: form.date_fin || null,
        competences: form.competences, contact_nom: form.contact_nom,
        contact_telephone: form.contact_telephone, contact_email: form.contact_email || null,
      }).eq("id", id);
      if (err) throw err;
      setIsSuccess(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <PageShell><div className="flex justify-center py-32"><Loader2 className="w-7 h-7 animate-spin" style={{ color: "#006A4E" }} /></div></PageShell>;

  if (isSuccess) return (
    <PageShell>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center py-20 gap-5 max-w-sm mx-auto">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(0,106,78,0.08)", border: "1px solid rgba(0,106,78,0.2)" }}>
          <CheckCircle2 className="w-8 h-8" style={{ color: "#006A4E" }} />
        </div>
        <h2 className="font-clash font-bold text-black text-2xl">Offre mise à jour !</h2>
        <button onClick={() => router.push("/dashboard")} className="text-sm font-medium px-6 py-2.5 rounded-full text-white" style={{ background: "#006A4E" }}>
          Retour au dashboard
        </button>
      </motion.div>
    </PageShell>
  );

  return (
    <PageShell>
      <div className="max-w-xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-clash font-bold text-black text-3xl mb-1">Modifier l'offre</h1>
          <p className="text-black/40 text-sm">{form.titre}</p>
        </motion.div>

        <div className="bg-white border border-black/[0.07] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="p-6 md:p-8 space-y-6">

            {/* Type de mission */}
            <div>
              <label className="block text-[13px] font-medium text-black/50 mb-3">Type de mission</label>
              <div className="grid grid-cols-2 gap-2">
                {CONTRATS.map(c => (
                  <button key={c.id} onClick={() => set("type_contrat", c.id)}
                    className="flex flex-col gap-0.5 p-3 rounded-xl border text-left text-sm transition-all duration-200"
                    style={form.type_contrat === c.id ? { borderColor: "rgba(0,106,78,0.4)", background: "rgba(0,106,78,0.05)" } : { borderColor: "rgba(0,0,0,0.08)", color: "rgba(0,0,0,0.4)" }}>
                    <span className="font-medium" style={{ color: form.type_contrat === c.id ? "#000" : undefined }}>{c.label}</span>
                    <span className="text-xs text-black/35">{c.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Domaine */}
            <div>
              <label className="block text-[13px] font-medium text-black/50 mb-3">Domaine</label>
              <div className="grid grid-cols-3 gap-2">
                {DOMAINES.map(d => (
                  <button key={d.id} onClick={() => set("domaine", d.id)}
                    className="p-2.5 rounded-xl border text-sm text-center transition-all duration-200"
                    style={form.domaine === d.id ? { borderColor: "rgba(0,106,78,0.4)", background: "rgba(0,106,78,0.05)", color: "#000", fontWeight: 600 } : { borderColor: "rgba(0,0,0,0.08)", color: "rgba(0,0,0,0.4)" }}>
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div><label className="block text-[13px] font-medium text-black/50 mb-2">Titre <span style={{ color: "#CE1126" }}>*</span></label><input className={INPUT} value={form.titre} onChange={e => set("titre", e.target.value)} /></div>
            <div><label className="block text-[13px] font-medium text-black/50 mb-2">Description</label><textarea className={`${INPUT} resize-none`} value={form.description} onChange={e => set("description", e.target.value)} rows={3} /></div>
            <div><label className="block text-[13px] font-medium text-black/50 mb-2">Lieu</label><input className={INPUT} value={form.lieu} onChange={e => set("lieu", e.target.value)} /></div>
            <div><label className="block text-[13px] font-medium text-black/50 mb-2">Rémunération (optionnel)</label><input className={INPUT} value={form.salaire} onChange={e => set("salaire", e.target.value)} placeholder="Ex : 5 000 FCFA/jour" /></div>

            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-[13px] font-medium text-black/50 mb-2">Date début</label><input className={INPUT} type="date" value={form.date_debut} onChange={e => set("date_debut", e.target.value)} /></div>
              <div><label className="block text-[13px] font-medium text-black/50 mb-2">Date fin</label><input className={INPUT} type="date" value={form.date_fin} onChange={e => set("date_fin", e.target.value)} /></div>
            </div>

            {/* Compétences */}
            <div>
              <label className="block text-[13px] font-medium text-black/50 mb-2">Compétences requises</label>
              <div className="flex gap-2 mb-2">
                <input className={INPUT} value={newCompetence} onChange={e => setNewCompetence(e.target.value)} onKeyDown={e => e.key === "Enter" && addCompetence()} placeholder="Ex : Secourisme, Permis B…" />
                <button onClick={addCompetence} className="p-3 rounded-xl border border-black/10 hover:border-black/40 text-black/40 hover:text-black transition-all"><Plus className="w-4 h-4" /></button>
              </div>
              {form.competences.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {form.competences.map((c, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm"
                      style={{ background: "rgba(0,106,78,0.07)", color: "#006A4E" }}>
                      {c}
                      <button onClick={() => removeCompetence(i)}><X className="w-3 h-3 opacity-60 hover:opacity-100" /></button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div><label className="block text-[13px] font-medium text-black/50 mb-2">Nom contact</label><input className={INPUT} value={form.contact_nom} onChange={e => set("contact_nom", e.target.value)} /></div>
            <div><label className="block text-[13px] font-medium text-black/50 mb-2">Téléphone</label><input className={INPUT} value={form.contact_telephone} onChange={e => set("contact_telephone", e.target.value)} /></div>
            <div><label className="block text-[13px] font-medium text-black/50 mb-2">Email</label><input className={INPUT} type="email" value={form.contact_email} onChange={e => set("contact_email", e.target.value)} /></div>

            {error && <div className="rounded-xl p-3 text-xs text-red-600" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}>{error}</div>}
          </div>

          <div className="flex justify-end px-6 md:px-8 py-4 border-t border-black/[0.06]">
            <button onClick={handleSubmit} disabled={!form.titre.trim() || isSubmitting}
              className="flex items-center gap-2 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-opacity hover:opacity-85 disabled:opacity-30"
              style={{ background: "#006A4E" }}>
              {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Enregistrement…</> : "Enregistrer les modifications"}
            </button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white font-clash">
      <Navbar /><main className="flex-grow pt-28 pb-20 px-4">{children}</main><Footer />
    </div>
  );
}

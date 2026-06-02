"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Hotel, Building2, Home, Bed,
  Wifi, Wind, ChefHat, Waves, Car, Flame, Tv, Coffee, Zap, Shield,
  Plus, Trash2, CheckCircle2, Loader2,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { supabase } from "@/app/lib/supabase";
import { getSession } from "@/app/lib/auth";
import type { LogementType, Equipement } from "@/app/types/logement";
import { TYPE_LABELS, EQUIPEMENT_LABELS } from "@/app/types/logement";

const TYPE_ICONS: Record<LogementType, React.ReactNode> = {
  hotel: <Hotel className="w-5 h-5" />, appartement: <Building2 className="w-5 h-5" />,
  airbnb: <Home className="w-5 h-5" />, chambre_hote: <Bed className="w-5 h-5" />,
};
const EQUIPEMENTS: { id: Equipement; icon: React.ReactNode }[] = [
  { id: "wifi", icon: <Wifi className="w-4 h-4" /> }, { id: "climatisation", icon: <Wind className="w-4 h-4" /> },
  { id: "cuisine", icon: <ChefHat className="w-4 h-4" /> }, { id: "piscine", icon: <Waves className="w-4 h-4" /> },
  { id: "parking", icon: <Car className="w-4 h-4" /> }, { id: "eau_chaude", icon: <Flame className="w-4 h-4" /> },
  { id: "tv", icon: <Tv className="w-4 h-4" /> }, { id: "petit_dejeuner", icon: <Coffee className="w-4 h-4" /> },
  { id: "generatrice", icon: <Zap className="w-4 h-4" /> }, { id: "securite", icon: <Shield className="w-4 h-4" /> },
];

const INPUT = "w-full bg-white border border-black/25 hover:border-black/40 focus:border-[#006A4E] rounded-xl px-4 py-3 text-black text-sm placeholder:text-black/25 outline-none transition-all duration-200";

export default function ModifierLogementPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    titre: "", description: "", type: "hotel" as LogementType,
    prix_par_nuit: "", adresse: "", ville: "Kara", capacite: "1",
    equipements: [] as Equipement[], images: [""],
    contact_nom: "", contact_telephone: "", contact_email: "",
  });

  useEffect(() => {
    const load = async () => {
      const session = await getSession();
      if (!session) { router.replace("/auth"); return; }
      const { data } = await supabase.from("logements").select("*").eq("id", id).eq("user_id", session.user.id).single();
      if (!data) { router.replace("/dashboard"); return; }
      setForm({
        titre: data.titre ?? "", description: data.description ?? "",
        type: data.type, prix_par_nuit: data.prix_par_nuit?.toString() ?? "",
        adresse: data.adresse ?? "", ville: data.ville ?? "Kara",
        capacite: data.capacite?.toString() ?? "1",
        equipements: data.equipements ?? [], images: data.images?.length ? data.images : [""],
        contact_nom: data.contact_nom ?? "", contact_telephone: data.contact_telephone ?? "",
        contact_email: data.contact_email ?? "",
      });
      setIsLoading(false);
    };
    load();
  }, [id, router]);

  const set = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));
  const toggleEq = (eq: Equipement) => setForm(prev => ({
    ...prev,
    equipements: prev.equipements.includes(eq) ? prev.equipements.filter(e => e !== eq) : [...prev.equipements, eq],
  }));
  const updateImage = (i: number, val: string) => {
    const next = [...form.images]; next[i] = val;
    setForm(prev => ({ ...prev, images: next }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true); setError(null);
    try {
      const { error: err } = await supabase.from("logements").update({
        titre: form.titre, description: form.description, type: form.type,
        prix_par_nuit: form.prix_par_nuit ? Number(form.prix_par_nuit) : null,
        adresse: form.adresse, ville: form.ville, capacite: Number(form.capacite),
        equipements: form.equipements,
        images: form.images.filter(u => u.trim() !== ""),
        contact_nom: form.contact_nom, contact_telephone: form.contact_telephone,
        contact_email: form.contact_email,
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
        <h2 className="font-clash font-bold text-black text-2xl">Logement mis à jour !</h2>
        <button onClick={() => router.push("/dashboard")} className="text-sm font-medium px-6 py-2.5 rounded-full text-white transition-opacity hover:opacity-85" style={{ background: "#006A4E" }}>
          Retour au dashboard
        </button>
      </motion.div>
    </PageShell>
  );

  return (
    <PageShell>
      <div className="max-w-xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-clash font-bold text-black text-3xl mb-1">Modifier le logement</h1>
          <p className="text-black/40 text-sm">{form.titre}</p>
        </motion.div>

        <div className="bg-white border border-black/[0.07] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="p-6 md:p-8 space-y-6">
            {/* Type */}
            <div>
              <label className="block text-[13px] font-medium text-black/50 mb-3">Type</label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(TYPE_LABELS) as LogementType[]).map(t => (
                  <button key={t} onClick={() => set("type", t)}
                    className="flex items-center gap-2.5 p-3 rounded-xl border text-left text-sm transition-all duration-200"
                    style={form.type === t ? { borderColor: "rgba(0,106,78,0.4)", background: "rgba(0,106,78,0.05)", color: "#000" } : { borderColor: "rgba(0,0,0,0.08)", color: "rgba(0,0,0,0.4)" }}>
                    <span style={{ color: form.type === t ? "#006A4E" : undefined }}>{TYPE_ICONS[t]}</span>
                    {TYPE_LABELS[t]}
                  </button>
                ))}
              </div>
            </div>
            {/* Titre */}
            <div><label className="block text-[13px] font-medium text-black/50 mb-2">Nom <span style={{ color: "#CE1126" }}>*</span></label><input className={INPUT} value={form.titre} onChange={e => set("titre", e.target.value)} /></div>
            <div><label className="block text-[13px] font-medium text-black/50 mb-2">Description</label><textarea className={`${INPUT} resize-none`} value={form.description} onChange={e => set("description", e.target.value)} rows={3} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-[13px] font-medium text-black/50 mb-2">Prix / nuit (FCFA)</label><input className={INPUT} type="number" value={form.prix_par_nuit} onChange={e => set("prix_par_nuit", e.target.value)} min={0} /></div>
              <div><label className="block text-[13px] font-medium text-black/50 mb-2">Capacité</label><input className={INPUT} type="number" value={form.capacite} onChange={e => set("capacite", e.target.value)} min={1} /></div>
            </div>
            <div><label className="block text-[13px] font-medium text-black/50 mb-2">Adresse</label><input className={INPUT} value={form.adresse} onChange={e => set("adresse", e.target.value)} /></div>
            {/* Équipements */}
            <div>
              <label className="block text-[13px] font-medium text-black/50 mb-3">Équipements</label>
              <div className="grid grid-cols-2 gap-2">
                {EQUIPEMENTS.map(({ id: eq, icon }) => (
                  <button key={eq} onClick={() => toggleEq(eq)}
                    className="flex items-center gap-2 p-2.5 rounded-xl border text-sm transition-all duration-200"
                    style={form.equipements.includes(eq) ? { borderColor: "rgba(0,106,78,0.4)", background: "rgba(0,106,78,0.05)", color: "#000" } : { borderColor: "rgba(0,0,0,0.08)", color: "rgba(0,0,0,0.4)" }}>
                    <span style={{ color: form.equipements.includes(eq) ? "#006A4E" : undefined }}>{icon}</span>
                    {EQUIPEMENT_LABELS[eq]}
                  </button>
                ))}
              </div>
            </div>
            {/* Photos */}
            <div>
              <label className="block text-[13px] font-medium text-black/50 mb-2">Photos (URL)</label>
              <div className="space-y-2">
                {form.images.map((url, i) => (
                  <div key={i} className="flex gap-2">
                    <input className={INPUT} type="url" value={url} onChange={e => updateImage(i, e.target.value)} placeholder={`https://… (photo ${i + 1})`} />
                    {form.images.length > 1 && <button onClick={() => setForm(prev => ({ ...prev, images: prev.images.filter((_, j) => j !== i) }))} className="text-black/20 hover:text-red-500 p-2"><Trash2 className="w-4 h-4" /></button>}
                  </div>
                ))}
                {form.images.length < 5 && <button onClick={() => setForm(prev => ({ ...prev, images: [...prev.images, ""] }))} className="flex items-center gap-1.5 text-xs mt-1" style={{ color: "#006A4E" }}><Plus className="w-3.5 h-3.5" /> Ajouter une photo</button>}
              </div>
            </div>
            {/* Contact */}
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

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { supabase } from "@/app/lib/supabase";
import { getSession } from "@/app/lib/auth";
import { CATEGORIE_BOUTIQUE_LABELS } from "@/app/types/boutique";
import type { CategorieBoutique } from "@/app/types/boutique";

const INPUT = "w-full bg-white border border-black/25 hover:border-black/40 focus:border-[#006A4E] rounded-xl px-4 py-3 text-black text-sm placeholder:text-black/25 outline-none transition-all duration-200";

export default function ModifierBoutiquePage() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const [boutiqueId, setBoutiqueId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    nom: "", description: "", categorie: "tissage" as CategorieBoutique,
    image_couverture: "", localite: "Kara",
  });

  useEffect(() => {
    const load = async () => {
      const session = await getSession();
      if (!session) { router.replace("/auth"); return; }
      const { data } = await supabase.from("boutiques").select("*").eq("slug", slug).eq("user_id", session.user.id).single();
      if (!data) { router.replace("/dashboard"); return; }
      setBoutiqueId(data.id);
      setForm({ nom: data.nom, description: data.description ?? "", categorie: data.categorie, image_couverture: data.image_couverture ?? "", localite: data.localite });
      setIsLoading(false);
    };
    load();
  }, [slug, router]);

  const set = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    if (!boutiqueId) return;
    setIsSubmitting(true); setError(null);
    try {
      const { error: err } = await supabase.from("boutiques").update({
        nom: form.nom, description: form.description, categorie: form.categorie,
        image_couverture: form.image_couverture, localite: form.localite,
      }).eq("id", boutiqueId);
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
        <h2 className="font-clash font-bold text-black text-2xl">Boutique mise à jour !</h2>
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
          <h1 className="font-clash font-bold text-black text-3xl mb-1">Modifier la boutique</h1>
          <p className="text-black/40 text-sm">{form.nom}</p>
        </motion.div>

        <div className="bg-white border border-black/[0.07] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="p-6 md:p-8 space-y-6">
            <div><label className="block text-[13px] font-medium text-black/50 mb-2">Nom <span style={{ color: "#CE1126" }}>*</span></label><input className={INPUT} value={form.nom} onChange={e => set("nom", e.target.value)} /></div>
            <div>
              <label className="block text-[13px] font-medium text-black/50 mb-3">Catégorie</label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(CATEGORIE_BOUTIQUE_LABELS) as CategorieBoutique[]).map(cat => (
                  <button key={cat} onClick={() => set("categorie", cat)}
                    className="flex items-center gap-2 p-3 rounded-xl border text-left text-sm transition-all duration-200"
                    style={form.categorie === cat ? { borderColor: "rgba(0,106,78,0.4)", background: "rgba(0,106,78,0.05)", color: "#000" } : { borderColor: "rgba(0,0,0,0.08)", color: "rgba(0,0,0,0.4)" }}>
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: form.categorie === cat ? "#006A4E" : "rgba(0,0,0,0.15)" }} />
                    {CATEGORIE_BOUTIQUE_LABELS[cat]}
                  </button>
                ))}
              </div>
            </div>
            <div><label className="block text-[13px] font-medium text-black/50 mb-2">Description</label><textarea className={`${INPUT} resize-none`} value={form.description} onChange={e => set("description", e.target.value)} rows={4} /></div>
            <div><label className="block text-[13px] font-medium text-black/50 mb-2">Localité</label><input className={INPUT} value={form.localite} onChange={e => set("localite", e.target.value)} /></div>
            <div><label className="block text-[13px] font-medium text-black/50 mb-2">Image de couverture (URL)</label><input className={INPUT} type="url" value={form.image_couverture} onChange={e => set("image_couverture", e.target.value)} /></div>
            {error && <div className="rounded-xl p-3 text-xs text-red-600" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}>{error}</div>}
          </div>
          <div className="flex justify-end px-6 md:px-8 py-4 border-t border-black/[0.06]">
            <button onClick={handleSubmit} disabled={!form.nom.trim() || isSubmitting}
              className="flex items-center gap-2 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-opacity hover:opacity-85 disabled:opacity-30"
              style={{ background: "#006A4E" }}>
              {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Enregistrement…</> : <>Enregistrer <ArrowRight className="w-4 h-4" /></>}
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

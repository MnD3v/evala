"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle2, Plus, Trash2 } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { supabase } from "@/app/lib/supabase";
import { getSession } from "@/app/lib/auth";
import { CATEGORIE_BOUTIQUE_LABELS } from "@/app/types/boutique";
import type { CategorieProduit } from "@/app/types/boutique";

const INPUT = "w-full bg-white border border-black/25 hover:border-black/40 focus:border-[#006A4E] rounded-xl px-4 py-3 text-black text-sm placeholder:text-black/25 outline-none transition-all duration-200";

export default function ModifierProduitPage() {
  const router        = useRouter();
  const { slug, id }  = useParams<{ slug: string; id: string }>();

  const [authChecked,  setAuthChecked]  = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess,    setIsSuccess]    = useState(false);
  const [error,        setError]        = useState<string | null>(null);

  const [form, setForm] = useState({
    nom: "", description: "", prix: "",
    categorie: "tissage" as CategorieProduit,
    images: [""],
    disponible: true,
  });

  useEffect(() => {
    const load = async () => {
      const session = await getSession();
      if (!session) { router.replace("/auth"); return; }

      const { data: produit } = await supabase
        .from("produits")
        .select("*")
        .eq("id", id)
        .eq("user_id", session.user.id)
        .single();

      if (!produit) { router.replace(`/boutique/${slug}`); return; }

      setForm({
        nom:         produit.nom ?? "",
        description: produit.description ?? "",
        prix:        produit.prix?.toString() ?? "",
        categorie:   produit.categorie ?? "tissage",
        images:      produit.images?.length ? produit.images : [""],
        disponible:  produit.disponible ?? true,
      });
      setAuthChecked(true);
    };
    load();
  }, [id, slug, router]);

  const set = (key: string, value: string | boolean) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const updateImage = (i: number, val: string) => {
    const next = [...form.images]; next[i] = val;
    setForm(prev => ({ ...prev, images: next }));
  };

  const handleSubmit = async () => {
    if (!form.nom.trim()) return;
    setIsSubmitting(true); setError(null);
    try {
      const { error: err } = await supabase.from("produits").update({
        nom:         form.nom,
        description: form.description || null,
        prix:        form.prix ? parseInt(form.prix) : null,
        categorie:   form.categorie,
        images:      form.images.filter(u => u.trim() !== ""),
        disponible:  form.disponible,
      }).eq("id", id);
      if (err) throw err;
      setIsSuccess(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!authChecked) return (
    <PageShell>
      <div className="flex justify-center py-32">
        <Loader2 className="w-7 h-7 animate-spin" style={{ color: "#006A4E" }} />
      </div>
    </PageShell>
  );

  if (isSuccess) return (
    <PageShell>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center py-20 gap-6 max-w-sm mx-auto">
        <div className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: "rgba(0,106,78,0.08)", border: "1px solid rgba(0,106,78,0.2)" }}>
          <CheckCircle2 className="w-9 h-9" style={{ color: "#006A4E" }} />
        </div>
        <div>
          <h2 className="font-clash font-bold text-black text-2xl mb-2">Produit mis à jour !</h2>
          <p className="text-black/50 text-sm">Les modifications sont enregistrées.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => router.push("/dashboard")}
            className="px-5 py-2.5 rounded-full text-sm border border-black/10 text-black/60 hover:border-black/40 transition-colors">
            Tableau de bord
          </button>
          <button onClick={() => router.push(`/boutique/${slug}`)}
            className="px-5 py-2.5 rounded-full text-sm text-white transition-opacity hover:opacity-85"
            style={{ background: "#006A4E" }}>
            Voir ma boutique
          </button>
        </div>
      </motion.div>
    </PageShell>
  );

  return (
    <PageShell>
      <div className="max-w-xl mx-auto">

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-clash font-bold text-black text-3xl md:text-4xl mb-2">Modifier le produit</h1>
          <p className="text-black/40 text-sm">Mettez à jour les informations de votre création.</p>
        </motion.div>

        <div className="bg-white border border-black/[0.07] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="p-6 md:p-8 space-y-6">

            {/* Nom */}
            <div>
              <label className="block text-[13px] font-medium text-black/50 mb-2">
                Nom du produit <span style={{ color: "#CE1126" }}>*</span>
              </label>
              <input className={INPUT} value={form.nom}
                onChange={e => set("nom", e.target.value)}
                placeholder="Ex : Pagne kente, Collier en perles…" />
            </div>

            {/* Catégorie */}
            <div>
              <label className="block text-[13px] font-medium text-black/50 mb-3">Catégorie</label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(CATEGORIE_BOUTIQUE_LABELS) as CategorieProduit[]).map(cat => (
                  <button key={cat} onClick={() => set("categorie", cat)}
                    className="flex items-center gap-2 p-3 rounded-xl border text-left text-sm transition-all duration-200"
                    style={form.categorie === cat
                      ? { borderColor: "rgba(0,106,78,0.4)", background: "rgba(0,106,78,0.05)", color: "#000" }
                      : { borderColor: "rgba(0,0,0,0.08)", color: "rgba(0,0,0,0.4)" }}>
                    <span className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: form.categorie === cat ? "#006A4E" : "rgba(0,0,0,0.15)" }} />
                    {CATEGORIE_BOUTIQUE_LABELS[cat]}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[13px] font-medium text-black/50 mb-2">Description</label>
              <textarea className={`${INPUT} resize-none`} value={form.description}
                onChange={e => set("description", e.target.value)}
                placeholder="Matériaux, dimensions, technique de fabrication…" rows={3} />
            </div>

            {/* Prix */}
            <div>
              <label className="block text-[13px] font-medium text-black/50 mb-2">Prix (FCFA)</label>
              <input className={INPUT} type="number" value={form.prix}
                onChange={e => set("prix", e.target.value)}
                placeholder="Ex : 5 000" min={0} />
            </div>

            {/* Disponibilité */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-black/[0.07] bg-gray-50/50">
              <div>
                <p className="text-sm font-medium text-black">Disponible à la vente</p>
                <p className="text-xs text-black/40 mt-0.5">Désactivez si le produit est épuisé.</p>
              </div>
              <button
                onClick={() => set("disponible", !form.disponible)}
                className="relative w-11 h-6 rounded-full transition-colors duration-200"
                style={{ background: form.disponible ? "#006A4E" : "rgba(0,0,0,0.15)" }}
              >
                <span className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                  style={{ transform: form.disponible ? "translateX(20px)" : "translateX(0)" }} />
              </button>
            </div>

            {/* Photos */}
            <div>
              <label className="block text-[13px] font-medium text-black/50 mb-2">Photos (URL) — max 4</label>
              <div className="space-y-2">
                {form.images.map((url, i) => (
                  <div key={i} className="flex gap-2">
                    <input className={INPUT} type="url" value={url}
                      onChange={e => updateImage(i, e.target.value)}
                      placeholder={`https://… (photo ${i + 1})`} />
                    {form.images.length > 1 && (
                      <button onClick={() => setForm(prev => ({ ...prev, images: prev.images.filter((_, j) => j !== i) }))}
                        className="text-black/20 hover:text-red-500 transition-colors p-2">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                {form.images.length < 4 && (
                  <button onClick={() => setForm(prev => ({ ...prev, images: [...prev.images, ""] }))}
                    className="flex items-center gap-1.5 text-xs transition-colors mt-1" style={{ color: "#006A4E" }}>
                    <Plus className="w-3.5 h-3.5" /> Ajouter une photo
                  </button>
                )}
              </div>
            </div>

            {error && (
              <div className="rounded-xl p-3 text-xs text-red-600"
                style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}>
                {error}
              </div>
            )}
          </div>

          <div className="flex justify-end px-6 md:px-8 py-4 border-t border-black/[0.06]">
            <button
              onClick={handleSubmit}
              disabled={!form.nom.trim() || isSubmitting}
              className="flex items-center gap-2 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-opacity hover:opacity-85 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: "#006A4E" }}
            >
              {isSubmitting
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Enregistrement…</>
                : <>Enregistrer <ArrowRight className="w-4 h-4" /></>}
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
      <Navbar />
      <main className="flex-grow pt-28 pb-20 px-4">{children}</main>
      <Footer />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Plus, ShoppingBag, Package, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { supabase } from "@/app/lib/supabase";
import { getSession } from "@/app/lib/auth";
import type { Boutique, Produit } from "@/app/types/boutique";
import { CATEGORIE_BOUTIQUE_LABELS } from "@/app/types/boutique";

export default function BoutiqueDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [boutique, setBoutique]   = useState<Boutique | null>(null);
  const [produits, setProduits]   = useState<Produit[]>([]);
  const [isOwner, setIsOwner]     = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [{ data: b }, session] = await Promise.all([
        supabase.from("boutiques").select("*").eq("slug", slug).single(),
        getSession(),
      ]);

      if (!b) { setIsLoading(false); return; }
      setBoutique(b as Boutique);
      setIsOwner(session?.user?.id === (b as Boutique).user_id);

      const { data: p } = await supabase
        .from("produits")
        .select("*")
        .eq("boutique_id", (b as Boutique).id)
        .eq("disponible", true)
        .order("created_at", { ascending: false });

      setProduits((p as Produit[]) ?? []);
      setIsLoading(false);
    };
    load();
  }, [slug]);

  if (isLoading) return (
    <div className="min-h-screen bg-white font-clash flex items-center justify-center">
      <Loader2 className="w-7 h-7 animate-spin" style={{ color: "#006A4E" }} />
    </div>
  );

  if (!boutique) return (
    <div className="min-h-screen bg-white font-clash flex items-center justify-center">
      <p className="text-black/40">Boutique introuvable.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-clash">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[50vh] min-h-[340px] max-h-[480px] overflow-hidden bg-black">
        {boutique.image_couverture ? (
          <img src={boutique.image_couverture} alt={boutique.nom} className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0a1a0f 0%, #1a0a0a 100%)" }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-10 max-w-6xl mx-auto w-full left-0 right-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold text-white mb-3"
              style={{ background: "rgba(0,106,78,0.5)", border: "1px solid rgba(0,106,78,0.4)" }}>
              {CATEGORIE_BOUTIQUE_LABELS[boutique.categorie]}
            </div>
            <h1 className="font-clash font-bold text-white text-4xl md:text-5xl leading-none mb-3">{boutique.nom}</h1>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" style={{ color: "#006A4E" }} />
              <span className="text-white/50 text-sm">{boutique.localite}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contenu */}
      <div className="container mx-auto px-6 md:px-8 max-w-6xl py-14">

        {/* Description + actions */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-14">
          {boutique.description && (
            <p className="text-black/55 text-base leading-relaxed max-w-2xl">{boutique.description}</p>
          )}
          {isOwner && (
            <Link
              href={`/boutique/${slug}/ajouter`}
              className="inline-flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-full shrink-0 transition-opacity hover:opacity-85"
              style={{ background: "#006A4E" }}
            >
              <Plus className="w-4 h-4" />
              Ajouter un produit
            </Link>
          )}
        </div>

        {/* Produits */}
        {produits.length === 0 ? (
          <div className="flex flex-col items-center text-center py-20 gap-5">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(0,106,78,0.06)", border: "1px solid rgba(0,106,78,0.15)" }}>
              <Package className="w-6 h-6" style={{ color: "#006A4E" }} />
            </div>
            <p className="text-black/40 text-sm">Aucun produit pour l'instant.</p>
            {isOwner && (
              <Link
                href={`/boutique/${slug}/ajouter`}
                className="inline-flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-opacity hover:opacity-85"
                style={{ background: "#006A4E" }}
              >
                <Plus className="w-4 h-4" />
                Publier mon premier produit
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {produits.map((produit, i) => (
              <motion.div
                key={produit.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group rounded-2xl border border-black/[0.07] hover:border-black/[0.14] hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] transition-all duration-300 bg-white overflow-hidden"
              >
                {/* Image produit */}
                <div className="relative h-40 bg-black/[0.03] overflow-hidden">
                  {produit.images?.[0] ? (
                    <img src={produit.images[0]} alt={produit.nom} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8 text-black/10" />
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-clash font-bold text-black text-sm mb-1 line-clamp-2">{produit.nom}</h3>
                  {produit.description && (
                    <p className="text-black/40 text-xs leading-relaxed line-clamp-2 mb-2">{produit.description}</p>
                  )}
                  {produit.prix && (
                    <p className="font-clash font-bold text-base" style={{ color: "#006A4E" }}>
                      {produit.prix.toLocaleString("fr-FR")} <span className="text-xs font-normal text-black/40">FCFA</span>
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

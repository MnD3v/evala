"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, MapPin, ArrowRight, Store, Loader2 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { supabase } from "@/app/lib/supabase";
import type { Boutique } from "@/app/types/boutique";
import { CATEGORIE_BOUTIQUE_LABELS } from "@/app/types/boutique";

const CATEGORIE_COLORS: Record<string, string> = {
  tissage: "#CE1126", poterie: "#8a6d00", sculpture: "#006A4E",
  bijoux: "#CE1126", gastronomie: "#8a6d00", maroquinerie: "#006A4E",
  peinture: "#CE1126", autre: "#555",
};

export default function BoutiquePage() {
  const [boutiques, setBoutiques] = useState<Boutique[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("boutiques")
      .select("*")
      .eq("approuve", true)
      .eq("actif", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setBoutiques((data as Boutique[]) ?? []);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white font-clash">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden bg-black pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_50%,rgba(0,106,78,0.2),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_60%,rgba(255,205,0,0.06),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(0,106,78,0.4), transparent)" }} />

        <div className="container relative z-10 mx-auto px-6 md:px-8 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="w-4 h-4" style={{ color: "#006A4E" }} />
              <span className="text-white/50 text-xs uppercase tracking-widest">Artisanat local</span>
            </div>
            <h1 className="font-clash font-bold text-white text-5xl md:text-6xl leading-none mb-4">
              Boutique artisanale
            </h1>
            <p className="text-white/50 text-base max-w-xl mb-8">
              Créations authentiques des artisans de Kara et de la région Kabyè.
            </p>
            <Link
              href="/boutique/creer"
              className="inline-flex items-center gap-2 text-white text-sm font-semibold px-6 py-3 rounded-full transition-opacity hover:opacity-85"
              style={{ background: "#006A4E" }}
            >
              <Store className="w-4 h-4" />
              Ouvrir ma boutique
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Contenu */}
      <div className="container mx-auto px-6 md:px-8 max-w-6xl py-16">

        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#006A4E" }} />
          </div>
        ) : boutiques.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center py-24 gap-5"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(0,106,78,0.06)", border: "1px solid rgba(0,106,78,0.15)" }}>
              <ShoppingBag className="w-6 h-6" style={{ color: "#006A4E" }} />
            </div>
            <p className="text-black/50 text-sm">Aucune boutique pour l'instant.</p>
            <Link
              href="/boutique/creer"
              className="inline-flex items-center gap-2 text-white text-sm font-semibold px-6 py-3 rounded-full transition-opacity hover:opacity-85"
              style={{ background: "#006A4E" }}
            >
              Soyez le premier à ouvrir une boutique
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {boutiques.map((boutique, i) => (
              <motion.div
                key={boutique.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link
                  href={`/boutique/${boutique.slug}`}
                  className="group block rounded-2xl border border-black/[0.07] hover:border-black/[0.14] hover:shadow-[0_6px_24px_rgba(0,0,0,0.07)] transition-all duration-300 bg-white overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-44 bg-black/[0.04] overflow-hidden">
                    {boutique.image_couverture ? (
                      <img src={boutique.image_couverture} alt={boutique.nom} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ShoppingBag className="w-10 h-10 text-black/10" />
                      </div>
                    )}
                    <div
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold text-white"
                      style={{ background: CATEGORIE_COLORS[boutique.categorie] ?? "#555" }}
                    >
                      {CATEGORIE_BOUTIQUE_LABELS[boutique.categorie]}
                    </div>
                  </div>

                  {/* Infos */}
                  <div className="p-5">
                    <h3 className="font-clash font-bold text-black text-lg mb-1">{boutique.nom}</h3>
                    <div className="flex items-center gap-1.5 mb-3">
                      <MapPin className="w-3.5 h-3.5" style={{ color: "#006A4E" }} />
                      <span className="text-black/45 text-sm">{boutique.localite}</span>
                    </div>
                    {boutique.description && (
                      <p className="text-black/50 text-sm leading-relaxed line-clamp-2">{boutique.description}</p>
                    )}
                    <div className="flex items-center gap-1.5 mt-4 text-sm font-medium" style={{ color: "#006A4E" }}>
                      <span>Voir la boutique</span>
                      <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import type { Produit } from "../types/boutique";

export default function BoutiqueEvala() {
  const [produits, setProduits] = useState<Produit[]>([]);

  useEffect(() => {
    supabase
      .from("produits")
      .select("*")
      .eq("disponible", true)
      .order("created_at", { ascending: false })
      .limit(6)
      .then(({ data }) => setProduits((data as Produit[]) ?? []));
  }, []);

  return (
    <section id="boutique" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_50%,rgba(0,106,78,0.04),transparent)] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 md:px-8 max-w-6xl">

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="flex flex-col items-center text-center mb-14"
        >
          <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "#006A4E" }}>
            Artisanat local
          </p>
          <h2 className="text-4xl md:text-5xl font-clash font-bold text-black leading-tight mb-4">
            Boutique <em className="not-italic" style={{ color: "#006A4E" }}>artisanale</em>
          </h2>
          <p className="text-black/60 text-base max-w-lg leading-relaxed">
            Découvrez et achetez des créations authentiques des artisans de Kara et de la région Kabyè.
          </p>
        </motion.div>

        {/* Séparateur tricolore */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="flex items-center gap-0 mb-12 origin-left overflow-hidden rounded-full"
          style={{ height: "2px" }}
        >
          <div className="w-24" style={{ background: "#006A4E" }} />
          <div className="w-24" style={{ background: "#FFCD00" }} />
          <div className="flex-1" style={{ background: "linear-gradient(to right, #CE1126, transparent)" }} />
        </motion.div>

        {/* Produits + CTAs côte à côte */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-start">

          {/* Grille produits — 4 max sur une ligne */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {produits.slice(0, 4).map((produit, i) => (
              <motion.div
                key={produit.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                className="group rounded-2xl border border-black/[0.07] hover:border-black/[0.14] hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] transition-all duration-300 bg-white overflow-hidden"
              >
                <div className="relative h-36 bg-black/[0.03] overflow-hidden">
                  {produit.images?.[0] ? (
                    <img src={produit.images[0]} alt={produit.nom} loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8 text-black/10" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-clash font-bold text-black text-sm leading-snug line-clamp-1">{produit.nom}</h3>
                  {produit.prix && (
                    <p className="font-clash font-bold text-base mt-1" style={{ color: "#006A4E" }}>
                      {produit.prix.toLocaleString("fr-FR")}{" "}
                      <span className="text-xs font-normal text-black/40">FCFA</span>
                    </p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* État vide */}
            {produits.length === 0 && (
              <div className="col-span-4 flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-black/10 gap-3">
                <ShoppingBag className="w-8 h-8 text-black/15" />
                <p className="text-black/35 text-sm">Aucun produit pour l'instant.</p>
              </div>
            )}
          </div>

          {/* Colonne droite : voir plus + ouvrir boutique */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            className="flex flex-col gap-3"
          >
            <Link
              href="/boutique"
              className="group flex items-center justify-between gap-3 px-5 py-4 rounded-2xl font-semibold transition-opacity hover:opacity-85"
              style={{ background: "#00FF7F", color: "#111" }}
            >
              <span>Voir tous les produits</span>
              <ArrowRight className="w-4 h-4 -rotate-45 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>

            <Link
              href="/boutique/creer"
              className="group flex flex-col gap-1 px-5 py-4 rounded-2xl transition-opacity hover:opacity-85"
              style={{ background: "#006A4E" }}
            >
              <div className="flex items-center justify-between">
                <p className="text-white font-clash font-bold text-base">Ouvrir ma boutique</p>
                <ArrowRight className="w-4 h-4 text-white -rotate-45 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </div>
              <p className="text-white/55 text-sm">Vendez vos créations artisanales sur Evala.tg</p>
            </Link>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

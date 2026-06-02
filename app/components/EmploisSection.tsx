"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import type { OffreEmploi } from "../types/emploi";
import EmploiCard from "./EmploiCard";

export default function EmploisSection() {
  const [offres, setOffres]       = useState<OffreEmploi[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const { data, error } = await supabase
          .from("offres_emploi")
          .select("*")
          .eq("approuve", true)
          .eq("active", true)
          .order("created_at", { ascending: false })
          .limit(6);
        if (error) throw error;
        setOffres((data as OffreEmploi[]) ?? []);
      } catch (err) {
        console.error("Erreur chargement offres:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOffres();
  }, []);

  return (
    <section id="emplois" className="relative overflow-hidden bg-gray-50 py-24 md:py-32">

      {/* Fond radial jaune */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_85%_50%,rgba(255,205,0,0.07),transparent)] pointer-events-none" />

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
            Opportunités
          </p>
          <h2 className="text-4xl md:text-5xl font-clash font-bold text-black leading-tight mb-4">
            Emplois <em className="not-italic" style={{ color: "#006A4E" }}>autour du festival</em>
          </h2>
          <p className="text-black/60 text-base max-w-lg leading-relaxed mb-6">
            Sécurité, restauration, animation, logistique — participez à Evala 2026 en rejoignant une équipe ou en publiant une offre.
          </p>
          <Link
            href="/emplois/proposer"
            className="inline-flex items-center gap-2 text-base font-normal px-8 py-5 rounded-full transition-opacity duration-200 hover:opacity-85"
            style={{ background: "#00FF7F", color: "#111", border: "none" }}
          >
            <span>Publier une offre</span>
            <ArrowRight className="w-4 h-4 -rotate-45" />
          </Link>
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

        {/* Contenu */}
        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#CE1126" }} />
          </div>
        ) : offres.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center py-24 gap-5"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(206,17,38,0.06)", border: "1px solid rgba(206,17,38,0.15)" }}>
              <Briefcase className="w-6 h-6" style={{ color: "#CE1126" }} />
            </div>
            <p className="text-black text-base">Aucune offre disponible pour l'instant.</p>
            <Link
              href="/emplois/proposer"
              className="inline-flex items-center gap-2 text-base transition-colors duration-200"
              style={{ color: "#CE1126" }}
            >
              <span>Soyez le premier à publier une offre</span>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {offres.map((offre, i) => (
              <EmploiCard key={offre.id} offre={offre} index={i} />
            ))}
          </div>
        )}

        {/* Voir toutes */}
        {!isLoading && offres.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            className="mt-12 flex justify-center"
          >
            <Link
              href="/emplois"
              className="group inline-flex items-center gap-2.5 text-base font-normal px-8 py-5 rounded-full transition-opacity duration-200 hover:opacity-85"
              style={{ background: "#00FF7F", color: "#111", border: "none" }}
            >
              <span>Voir toutes les offres</span>
              <ArrowRight className="w-4 h-4 -rotate-45" />
            </Link>
          </motion.div>
        )}

      </div>
    </section>
  );
}

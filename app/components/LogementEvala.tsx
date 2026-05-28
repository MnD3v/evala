"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import type { Logement } from "../types/logement";
import LogementCard from "./LogementCard";

export default function LogementEvala() {
  const [logements, setLogements] = useState<Logement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogements = async () => {
      const { data, error } = await supabase
        .from("logements")
        .select("*")
        .eq("approuve", true)
        .eq("disponible", true)
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) {
        console.error("Erreur chargement logements:", error.message, error.code, error.details);
      } else {
        setLogements((data as Logement[]) ?? []);
      }
      setIsLoading(false);
    };
    fetchLogements();
  }, []);

  return (
    <section id="logements" className="relative overflow-hidden bg-white py-24 md:py-32">

      {/* Fond radial vert */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_15%_50%,rgba(0,106,78,0.04),transparent)] pointer-events-none" />

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
            Hébergement
          </p>
          <h2 className="text-4xl md:text-5xl font-clash font-bold text-black leading-tight mb-4">
            Logements <em className="not-italic" style={{ color: "#006A4E" }}>pour le festival</em>
          </h2>
          <p className="text-black/60 text-base max-w-lg leading-relaxed mb-6">
            Hôtels, appartements meublés, Airbnb ou chambres chez l'habitant — trouvez votre hébergement à Kara pendant Evala.
          </p>
          <Link
            href="/logement/proposer"
            className="inline-flex items-center gap-2 text-sm font-normal px-8 py-5 rounded-full transition-opacity duration-200 hover:opacity-85"
            style={{ background: "#00FF7F", color: "#111", border: "none" }}
          >
            <span>Proposer mon logement</span>
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
          <div className="w-24" style={{ background: "#CE1126" }} />
          <div className="w-24" style={{ background: "#FFCD00" }} />
          <div className="flex-1" style={{ background: "linear-gradient(to right, #006A4E, transparent)" }} />
        </motion.div>

        {/* Contenu */}
        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#006A4E" }} />
          </div>
        ) : logements.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center py-24 gap-5"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(0,106,78,0.06)", border: "1px solid rgba(0,106,78,0.15)" }}>
              <Home className="w-6 h-6" style={{ color: "#006A4E" }} />
            </div>
            <p className="text-black text-sm">Aucun logement disponible pour l'instant.</p>
            <Link
              href="/logement/proposer"
              className="inline-flex items-center gap-2 text-sm transition-colors duration-200"
              style={{ color: "#006A4E" }}
            >
              <span>Soyez le premier à proposer un logement</span>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {logements.map((logement, i) => (
              <LogementCard key={logement.id} logement={logement} index={i} />
            ))}
          </div>
        )}

        {/* Voir tous */}
        {!isLoading && logements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            className="mt-12 flex justify-center"
          >
            <Link
              href="/logement"
              className="group inline-flex items-center gap-2.5 text-sm font-normal px-8 py-5 rounded-full transition-opacity duration-200 hover:opacity-85"
              style={{ background: "#00FF7F", color: "#111", border: "none" }}
            >
              <span>Voir tous les logements</span>
              <ArrowRight className="w-4 h-4 -rotate-45" />
            </Link>
          </motion.div>
        )}

      </div>
    </section>
  );
}

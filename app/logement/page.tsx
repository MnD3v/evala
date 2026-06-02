"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Home, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import LogementCard from "../components/LogementCard";
import { supabase } from "../lib/supabase";
import type { Logement, LogementType } from "../types/logement";

type FilterType = "tous" | LogementType;

const FILTERS: { id: FilterType; label: string }[] = [
  { id: "tous",         label: "Tous" },
  { id: "hotel",        label: "Hôtels" },
  { id: "appartement",  label: "Appartements" },
  { id: "airbnb",       label: "Airbnb" },
  { id: "chambre_hote", label: "Chambres d'hôte" },
];

export default function LogementsPage() {
  const [logements, setLogements] = useState<Logement[]>([]);
  const [filter, setFilter]       = useState<FilterType>("tous");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("logements")
      .select("*")
      .eq("approuve", true)
      .eq("disponible", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setLogements((data as Logement[]) ?? []);
        setIsLoading(false);
      });
  }, []);

  const filtered = filter === "tous" ? logements : logements.filter(l => l.type === filter);

  return (
    <div className="flex min-h-screen flex-col bg-white font-clash">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden bg-black pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_50%,rgba(0,106,78,0.18),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(0,106,78,0.4), transparent)" }} />

        <div className="container relative z-10 mx-auto px-6 md:px-8 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-4">
              <Home className="w-4 h-4" style={{ color: "#006A4E" }} />
              <span className="text-white/50 text-xs uppercase tracking-widest">Hébergement · Kara</span>
            </div>
            <h1 className="font-clash font-bold text-white text-5xl md:text-6xl leading-none mb-4">
              Logements Evala
            </h1>
            <p className="text-white/50 text-base max-w-xl mb-8">
              Hôtels, appartements, Airbnb et chambres chez l'habitant — tous les hébergements disponibles à Kara pendant le festival.
            </p>
            <Link
              href="/logement/proposer"
              className="inline-flex items-center gap-2 text-white text-sm font-semibold px-6 py-3 rounded-full transition-opacity hover:opacity-85"
              style={{ background: "#006A4E" }}
            >
              <Plus className="w-4 h-4" />
              Proposer mon logement
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Contenu */}
      <main className="flex-grow container mx-auto px-6 md:px-8 max-w-6xl py-14">

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border"
              style={filter === f.id
                ? { background: "#006A4E", color: "white", borderColor: "#006A4E" }
                : { background: "white", color: "rgba(0,0,0,0.5)", borderColor: "rgba(0,0,0,0.15)" }}
            >
              {f.label}
            </button>
          ))}
          {!isLoading && (
            <span className="ml-auto text-black/35 text-sm">
              {filtered.length} logement{filtered.length > 1 ? "s" : ""}
            </span>
          )}
        </motion.div>

        {/* Grille */}
        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-7 h-7 animate-spin" style={{ color: "#006A4E" }} />
          </div>
        ) : filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center py-24 gap-5">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(0,106,78,0.07)", border: "1px solid rgba(0,106,78,0.15)" }}>
              <Home className="w-6 h-6" style={{ color: "#006A4E" }} />
            </div>
            <p className="text-black/45 text-sm">Aucun logement disponible pour l'instant.</p>
            <Link href="/logement/proposer"
              className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full text-white transition-opacity hover:opacity-85"
              style={{ background: "#006A4E" }}>
              <Plus className="w-4 h-4" />
              Proposer le premier logement
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((logement, i) => (
              <LogementCard key={logement.id} logement={logement} index={i} />
            ))}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

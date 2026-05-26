"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Home, Loader2 } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import LogementCard from "../components/LogementCard";
import { supabase } from "../lib/supabase";
import type { Logement, LogementType } from "../types/logement";

type FilterType = "tous" | LogementType;

const FILTERS: { id: FilterType; label: string }[] = [
  { id: "tous", label: "Tous" },
  { id: "hotel", label: "Hôtels" },
  { id: "appartement", label: "Appartements" },
  { id: "airbnb", label: "Airbnb" },
  { id: "chambre_hote", label: "Chambres d'hôte" },
];

export default function LogementsPage() {
  const [logements, setLogements] = useState<Logement[]>([]);
  const [filter, setFilter] = useState<FilterType>("tous");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const { data, error } = await supabase
          .from("logements")
          .select("*")
          .eq("approuve", true)
          .eq("disponible", true)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setLogements((data as Logement[]) ?? []);
      } catch (err) {
        console.error("Erreur chargement logements:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, []);

  const filtered =
    filter === "tous" ? logements : logements.filter((l) => l.type === filter);

  return (
    <div
      className="flex min-h-screen flex-col text-white font-poppins relative"
      style={{
        backgroundImage: "url('/images/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative z-0">
        <Navbar />

        <main className="flex-grow">
          <section className="relative overflow-hidden bg-black/90 pt-28 pb-20">
            {/* Fond */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-b from-black via-eorange/3 to-black" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-eorange/5 rounded-full blur-3xl" />
            </div>

            <div className="container relative z-10 mx-auto px-4">
              {/* En-tête */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-12 text-center"
              >

                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Logements <span className="text-eorange">Evala</span>
                </h1>
                <div className="w-16 h-0.5 bg-gradient-to-r from-eorange to-festival-yellow rounded-full mx-auto mb-5" />
                <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto">
                  Tous les hébergements disponibles à Kara pendant le festival — hôtels, appartements, Airbnb et chambres chez l&apos;habitant.
                </p>

                {!isLoading && (
                  <p className="text-white/30 text-sm mt-3">
                    {filtered.length} logement{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
                  </p>
                )}
              </motion.div>

              {/* CTA Proposer */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
              >
                <Link href="/logement/proposer">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 bg-eorange hover:bg-eorange/90 text-black font-gilroy font-bold px-7 py-3 rounded-full transition-all shadow-lg shadow-eorange/20 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Proposer mon logement
                  </motion.span>
                </Link>
                <p className="text-white/30 text-xs max-w-xs text-center">
                  Votre logement sera visible après validation par notre équipe.
                </p>
              </motion.div>

              {/* Filtres */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="flex flex-wrap items-center justify-center gap-2 mb-8"
              >
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                      filter === f.id
                        ? "bg-eorange text-black border-eorange"
                        : "bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </motion.div>

              {/* Grille */}
              {isLoading ? (
                <div className="flex justify-center items-center py-24">
                  <Loader2 className="w-8 h-8 text-eorange animate-spin" />
                </div>
              ) : filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center text-center py-24 gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <Home className="w-7 h-7 text-white/30" />
                  </div>
                  <p className="text-white/40 text-sm">
                    Aucun logement disponible pour l&apos;instant.
                  </p>
                  <Link href="/logement/proposer" className="text-eorange text-sm hover:underline">
                    Soyez le premier à en proposer un !
                  </Link>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
                  {filtered.map((logement, i) => (
                    <LogementCard key={logement.id} logement={logement} index={i} />
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

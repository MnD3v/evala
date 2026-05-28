"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

/* ── Cartes placeholder — à remplacer par les vraies données ── */
const PLACEHOLDER_LUTTEURS = Array.from({ length: 8 });


function formatCanton(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function CantonPage() {
  const { canton } = useParams<{ canton: string }>();
  const cantonName = formatCanton(canton);

  return (
    <div className="min-h-screen bg-white font-clash">
      <Navbar />

      {/* ── Hero ── */}
      <div className="relative h-[60vh] min-h-[400px] max-h-[560px] overflow-hidden">
        <Image
          src="/images/a-propos.png"
          alt={`Lutteurs du canton de ${cantonName}`}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-12 max-w-6xl mx-auto w-full left-0 right-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4" style={{ color: "#CE1126" }} />
              <span className="text-white/50 text-xs uppercase tracking-widest">Canton</span>
            </div>

            <h1 className="font-clash font-bold text-white text-5xl md:text-7xl leading-none mb-5">
              {cantonName}
            </h1>

            <div className="flex h-[3px] rounded-full overflow-hidden w-36">
              <div className="w-1/3" style={{ background: "#CE1126" }} />
              <div className="w-1/3" style={{ background: "#FFCD00" }} />
              <div className="w-1/3" style={{ background: "#006A4E" }} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Contenu ── */}
      <div className="container mx-auto px-6 md:px-8 max-w-6xl py-20">

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-black/50 text-sm mb-12"
        >
          {PLACEHOLDER_LUTTEURS.length} lutteurs enregistrés · Canton de {cantonName}
        </motion.p>

        {/* Grille lutteurs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {PLACEHOLDER_LUTTEURS.map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
              className="group rounded-2xl border border-black/[0.07] hover:border-black/[0.14] hover:shadow-[0_6px_24px_rgba(0,0,0,0.07)] transition-all duration-300 bg-white overflow-hidden flex flex-col"
            >
              {/* Photo placeholder */}
              <div
                className="relative h-44 overflow-hidden shrink-0 flex items-center justify-center"
                style={{ background: "linear-gradient(160deg, #141414 0%, #1e1010 60%, #0f0f0f 100%)" }}
              >
                {/* Point d'interrogation */}
                <span
                  className="font-clash font-bold select-none"
                  style={{ fontSize: "72px", lineHeight: 1, color: "rgba(255,255,255,0.07)" }}
                >
                  ?
                </span>

                {/* Numéro */}
                <div className="absolute bottom-3 left-4 font-clash font-bold text-5xl leading-none select-none" style={{ color: "rgba(255,255,255,0.06)" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>

              </div>

              {/* Infos */}
              <div className="p-4 flex flex-col gap-3 flex-1">
                {/* Nom */}
                <div>
                  <div className="h-4 w-3/4 rounded-full mb-2" style={{ background: "rgba(0,0,0,0.07)" }} />
                  <div className="h-3 w-1/2 rounded-full" style={{ background: "rgba(0,0,0,0.04)" }} />
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <Footer />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

/* ── Cantons de la région de Kara (à vérifier/compléter) ── */
const CANTONS = [
  "Lassa",
  "Pya",
  "Kpawa",
  "Tchitchao",
  "Landa-Pozanda",
  "Léon",
  "Pagouda",
  "Kouméa",
  "Bohou",
];

export default function ProfilsLutteurs() {
  return (
    <section id="lutteurs" className="relative overflow-hidden bg-white py-24 md:py-32">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_85%_50%,rgba(206,17,38,0.03),transparent)] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 md:px-8 max-w-6xl">

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="flex flex-col items-center text-center mb-14"
        >
          <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "#CE1126" }}>
            Les combattants
          </p>
          <h2 className="text-4xl md:text-5xl font-clash font-bold text-black leading-tight mb-4">
            Lutteurs par <em className="not-italic" style={{ color: "#CE1126" }}>canton</em>
          </h2>
          <p className="text-black/60 text-base max-w-lg leading-relaxed">
            Chaque canton engage ses guerriers pour défendre son honneur. Découvrez les lutteurs de chaque communauté.
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
          <div className="w-24" style={{ background: "#CE1126" }} />
          <div className="w-24" style={{ background: "#FFCD00" }} />
          <div className="flex-1" style={{ background: "linear-gradient(to right, #006A4E, transparent)" }} />
        </motion.div>

        {/* Grille cantons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CANTONS.map((canton, i) => (
            <motion.div
              key={canton}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            >
              <Link
                href={`/lutteurs/${canton.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}`}
                className="group flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border border-black/[0.07] hover:border-black/[0.15] hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] transition-all duration-300 bg-white"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(206,17,38,0.07)" }}
                  >
                    <MapPin className="w-4 h-4" style={{ color: "#CE1126" }} />
                  </div>
                  <span className="font-medium text-black text-[15px]">{canton}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 transition-opacity duration-200 group-hover:opacity-70" style={{ color: "#CE1126" }}>
                  <span className="text-[13px]">Voir les lutteurs</span>
                  <ArrowRight className="w-3.5 h-3.5 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

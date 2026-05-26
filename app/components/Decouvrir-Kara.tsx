"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { locations } from "../data/locations";

export default function DecouvrirKaraClient() {
  return (
    <section id="decouvrir" className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_20%,rgba(206,17,38,0.04),transparent)] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8 relative z-10 max-w-6xl">

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-14"
        >
          <p className="text-xs font-medium uppercase mb-4" style={{ color: "#CE1126" }}>
            Tourisme
          </p>
          <h2 className="text-4xl md:text-5xl font-fjalla font-bold text-black leading-tight">
            Découvrir <em className="not-italic" style={{ color: "#006A4E" }}>la région de Kara</em>
          </h2>
        </motion.div>

        {/* Séparateur tricolore */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-center gap-0 mb-14 origin-left overflow-hidden rounded-full"
          style={{ height: "2px" }}
        >
          <div className="w-24" style={{ background: "#CE1126" }} />
          <div className="w-24" style={{ background: "#FFCD00" }} />
          <div className="flex-1" style={{ background: "linear-gradient(to right, #006A4E, transparent)" }} />
        </motion.div>

        {/* Grille */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {locations.map((location, i) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/decouvrir/${location.id}`}
                  className="group relative block rounded-2xl overflow-hidden h-[320px] shadow-[0_4px_24px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_36px_rgba(0,0,0,0.25)] transition-all duration-500"
                >
                  {/* Image plein format */}
                  <img
                    src={location.mainImage}
                    alt={location.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />

                  {/* Overlay dégradé bas */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Contenu bas */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col items-center text-center">
                    <h3 className="font-fjalla text-white text-xl leading-snug mb-3">
                      {location.name}
                    </h3>
                    <span className="inline-flex items-center gap-2 text-white text-xs font-medium px-4 py-1.5 rounded-full border border-white/50 group-hover:bg-white group-hover:text-black transition-all duration-300">
                      Découvrir
                      <ArrowRight className="w-3 h-3 -rotate-45" />
                    </span>
                  </div>
                </Link>
              </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

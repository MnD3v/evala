"use client";

import { motion } from "framer-motion";
import { Radio, Bell } from "lucide-react";

export default function LiveStream() {
  return (
    <section className="relative py-28 overflow-hidden bg-gray-50" id="live">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_50%,rgba(206,17,38,0.03),transparent)] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8 relative z-10 max-w-6xl">

        {/* En-tête */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-sm font-medium uppercase mb-5" style={{ color: "#CE1126" }}>
            <Radio className="w-3.5 h-3.5" />
            <span>Diffusion</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-clash font-bold text-black mb-4">Suivre en direct</h2>
          <p className="text-black text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Vivez l'intensité des combats en temps réel, depuis n'importe où dans le monde.
          </p>
        </motion.div>

        {/* Placeholder vidéo */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }}>
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-white border border-black/[0.06] shadow-sm">
            {/* Bande tricolore en haut */}
            <div className="absolute top-0 left-0 right-0 flex h-1">
              <div className="flex-1" style={{ background: "#CE1126" }} />
              <div className="flex-1" style={{ background: "#FFCD00" }} />
              <div className="flex-1" style={{ background: "#006A4E" }} />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(206,17,38,0.04),transparent_70%)]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(206,17,38,0.08)", border: "1px solid rgba(206,17,38,0.15)" }}>
                <svg className="w-7 h-7" fill="#CE1126" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-black text-sm font-medium">La diffusion débutera lors des cérémonies</p>
            </div>
          </div>
        </motion.div>

        {/* Bannière info */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }} className="mt-8 flex items-start gap-4 bg-white border border-black/[0.06] rounded-2xl px-6 py-5 shadow-sm">
          <div className="mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,205,0,0.12)", border: "1px solid rgba(255,205,0,0.3)" }}>
            <Bell className="w-4 h-4" style={{ color: "#FFCD00" }} />
          </div>
          <div>
            <p className="text-black text-sm font-medium mb-0.5">Diffusion à venir</p>
            <p className="text-black text-sm leading-relaxed">
              Les détails de la diffusion en direct du Festival Evala 2026 seront communiqués prochainement. Suivez-nous pour être notifié dès l'ouverture du live.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

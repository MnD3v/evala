"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";

export default function Programme() {
  return (
    <section className="py-20 bg-white relative overflow-hidden" id="programme">

      <div className="container mx-auto px-6 md:px-8 relative max-w-6xl">

        {/* En-tête section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="mb-14 text-center"
        >
          <p className="text-[10px] font-medium uppercase mb-4" style={{ color: "#006A4E" }}>
            Programme
          </p>
          <h2 className="font-clash font-bold text-black leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Festival Evala{" "}
            <em className="not-italic" style={{ color: "#006A4E" }}>2026</em>
          </h2>
        </motion.div>

        {/* Carte "À venir" */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="max-w-xl mx-auto"
        >
          <div className="rounded-2xl overflow-hidden border border-black/[0.07] shadow-[0_4px_24px_rgba(0,0,0,0.07)]">

            {/* En-tête vert */}
            <div className="px-8 pt-8 pb-6" style={{ background: "#006A4E" }}>
              <p className="text-[10px] uppercase font-medium text-white/55 mb-3">Programme officiel</p>
              <h3 className="font-bold text-white leading-tight mb-2"
                style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)" }}>
                Evala 2026
              </h3>
              <p className="text-white/55 text-xs">Juillet 2026 · Région de la Kozah</p>
            </div>

            {/* Zigzag */}
            <svg width="100%" height="12" viewBox="0 0 90 12" preserveAspectRatio="none">
              <polygon points="0,0 15,12 30,0" fill="#CE1126" />
              <polygon points="30,0 45,12 60,0" fill="#FFCD00" />
              <polygon points="60,0 75,12 90,0" fill="#CE1126" />
              <polygon points="0,12 15,0 0,0" fill="#006A4E" />
              <polygon points="15,12 30,0 45,12" fill="#FFCD00" />
              <polygon points="45,12 60,0 75,12" fill="#006A4E" />
              <polygon points="75,12 90,0 90,12" fill="#FFCD00" />
            </svg>

            {/* Corps */}
            <div className="px-8 py-7 bg-white">

              {/* Icônes */}
              <div className="flex items-center gap-4 mb-7">
                {[
                  { Icon: Calendar, color: "#CE1126", bg: "rgba(206,17,38,0.07)", label: "Dates" },
                  { Icon: Clock,    color: "#8a6d00", bg: "rgba(255,205,0,0.10)", label: "Horaires" },
                  { Icon: MapPin,   color: "#006A4E", bg: "rgba(0,106,78,0.07)",  label: "Lieux" },
                ].map(({ Icon, color, bg, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1.5">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: bg }}>
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <span className="text-[10px] text-black/35 uppercase font-medium">{label}</span>
                  </div>
                ))}
              </div>

              <p className="text-black/55 text-sm leading-relaxed mb-6">
                Le programme complet du Festival Evala 2026 sera annoncé prochainement — dates des combats, cérémonies, sites et accès.
              </p>

              {/* Badge "À venir" tricolore */}
              <div className="inline-flex items-center gap-0 rounded-full overflow-hidden border border-black/[0.06]">
                <span className="px-3 py-1.5 text-[11px] font-semibold text-white" style={{ background: "#CE1126" }}>À</span>
                <span className="px-3 py-1.5 text-[11px] font-semibold text-black" style={{ background: "#FFCD00" }}>ve</span>
                <span className="px-3 py-1.5 text-[11px] font-semibold text-white" style={{ background: "#006A4E" }}>nir</span>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

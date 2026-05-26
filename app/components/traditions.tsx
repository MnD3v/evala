"use client";

import { motion } from "framer-motion";

const traditions = [
  {
    header: "#CE1126",
    roman: "I",
    title: "Spiritualité Kabyè",
    description: "Le Festival Evala est avant tout un rituel sacré, une connexion profonde avec les ancêtres et les traditions ancestrales des Kabyè du Togo.",
    details: [
      { label: "Ancêtres", value: "Évocalion des esprits" },
      { label: "Prêtres", value: "Tchotcho & Lakoussa" },
    ],
  },
  {
    header: "#006A4E",
    roman: "II",
    title: "Rite Initiatique",
    description: "Un rite de passage essentiel pour les jeunes hommes Kabyè, marquant leur entrée dans l'âge adulte et leur place dans la société traditionnelle.",
    details: [
      { label: "Âge", value: "18 ans minimum" },
      { label: "Cycle", value: "Tous les 3 ans" },
    ],
  },
  {
    header: "#8a6d00",
    roman: "III",
    title: "Unité Communautaire",
    description: "Un moment de rassemblement qui renforce les liens entre les villages Kabyè et célèbre l'identité culturelle de la région de Kozah au Togo.",
    details: [
      { label: "Cantons", value: "Pya, Lassa, Tchitchao…" },
      { label: "Région", value: "Kozah, Kara" },
    ],
  },
  {
    header: "#CE1126",
    roman: "IV",
    title: "Transmission Culturelle",
    description: "Une tradition vivante qui perpétue les valeurs, les techniques de lutte et la sagesse des générations précédentes des Kabyè.",
    details: [
      { label: "Origine", value: "Depuis 1785" },
      { label: "Inscription", value: "Patrimoine UNESCO" },
    ],
  },
];

export default function Traditions() {
  return (
    <section className="py-20 bg-white" id="traditions">
      <div className="container mx-auto px-6 md:px-8 max-w-6xl">

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="text-[10px] font-medium uppercase mb-4" style={{ color: "#006A4E" }}>
            Traditions
          </p>
          <h2 className="font-fjalla font-bold text-black leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Les piliers du{" "}
            <em className="not-italic" style={{ color: "#006A4E" }}>festival</em>
          </h2>
        </motion.div>

        {/* Séparateur tricolore */}
        <div className="flex h-[2px] overflow-hidden rounded-full mb-14">
          <div className="w-16" style={{ background: "#CE1126" }} />
          <div className="w-16" style={{ background: "#FFCD00" }} />
          <div className="flex-1" style={{ background: "linear-gradient(to right, #006A4E, transparent)" }} />
        </div>

        {/* Grille de cartes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {traditions.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.09 }} viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-black/[0.07] shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
            >
              {/* En-tête coloré */}
              <div className="px-6 pt-6 pb-5" style={{ background: t.header }}>
                <p className="font-bold text-white/20 text-3xl leading-none mb-3 select-none">
                  {t.roman}
                </p>
                <h3 className="font-bold text-white leading-tight"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)" }}>
                  {t.title}
                </h3>
              </div>

              {/* Zigzag */}
              <svg width="100%" height="10" viewBox="0 0 90 10" preserveAspectRatio="none" className="block">
                <polygon points="0,0 15,10 30,0" fill="#CE1126" />
                <polygon points="30,0 45,10 60,0" fill="#FFCD00" />
                <polygon points="60,0 75,10 90,0" fill="#006A4E" />
                <polygon points="0,10 15,0 0,0" fill={t.header} />
                <polygon points="15,10 30,0 45,10" fill="#FFCD00" />
                <polygon points="45,10 60,0 75,10" fill="#CE1126" />
                <polygon points="75,10 90,0 90,10" fill="#006A4E" />
              </svg>

              {/* Corps blanc */}
              <div className="px-5 py-5 bg-white flex flex-col gap-4">
                <p className="text-black/55 text-sm leading-relaxed">{t.description}</p>

                {/* Détails */}
                <div className="flex flex-col gap-2.5 pt-1">
                  {t.details.map((d, j) => (
                    <div key={j} className="flex gap-2">
                      <div className="w-0.5 rounded-full flex-shrink-0 mt-0.5 self-stretch"
                        style={{ background: t.header }} />
                      <div>
                        <p className="text-[9px] uppercase font-medium text-black/35 mb-0.5">{d.label}</p>
                        <p className="text-black text-xs font-semibold">{d.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

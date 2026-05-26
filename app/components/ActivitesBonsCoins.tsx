"use client";

import { motion } from "framer-motion";
import { Utensils, Music, Coffee, ShoppingBag, Waves, Camera } from "lucide-react";

const activites = [
  {
    icon: <Utensils className="w-6 h-6" />,
    color: "#006A4E",
    bg: "rgba(0,106,78,0.08)",
    titre: "Restaurants & Maquis",
    description: "Savourez la cuisine Kabyè authentique — fufu, gari foto, tchoukoutou — dans les maquis et restaurants locaux de Kara.",
    tags: ["Cuisine locale", "Terrasse", "Ambiance"],
  },
  {
    icon: <Music className="w-6 h-6" />,
    color: "#CE1126",
    bg: "rgba(206,17,38,0.07)",
    titre: "Soirées & Animation",
    description: "Chants traditionnels Kabyè, percussions et danses rituelles animent les nuits du festival dans toute la région.",
    tags: ["Musique live", "Danses", "Nuit"],
  },
  {
    icon: <Coffee className="w-6 h-6" />,
    color: "#8a6d00",
    bg: "rgba(255,205,0,0.10)",
    titre: "Bars & Tchoukoutou",
    description: "Le tchoukoutou, bière de mil traditionnelle des Kabyè, se déguste dans les cabarets au cœur des villages.",
    tags: ["Bière locale", "Cabarets", "Convivialité"],
  },
  {
    icon: <ShoppingBag className="w-6 h-6" />,
    color: "#006A4E",
    bg: "rgba(0,106,78,0.08)",
    titre: "Marchés & Artisanat",
    description: "Sculptures, tissages, poteries et bijoux traditionnels — le marché central de Kara regorge d'artisanat Kabyè.",
    tags: ["Artisanat", "Souvenirs", "Grand marché"],
  },
  {
    icon: <Waves className="w-6 h-6" />,
    color: "#CE1126",
    bg: "rgba(206,17,38,0.07)",
    titre: "Nature & Randonnées",
    description: "Les massifs Kabyè offrent des sentiers de trek époustouflants avec vue sur les villages perchés et vallées verdoyantes.",
    tags: ["Trek", "Massifs", "Panorama"],
  },
  {
    icon: <Camera className="w-6 h-6" />,
    color: "#8a6d00",
    bg: "rgba(255,205,0,0.10)",
    titre: "Sites Culturels",
    description: "Visitez les villages initiateurs, les lieux de cérémonie et les sites historiques qui racontent l'histoire du peuple Kabyè.",
    tags: ["Patrimoine", "Villages", "Histoire"],
  },
];

export default function ActivitesBonsCoins() {
  return (
    <section id="activites" className="py-24 md:py-32 bg-white relative overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(0,106,78,0.04),transparent)] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 md:px-8 max-w-6xl">

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-14"
        >
          <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "#006A4E" }}>
            À faire
          </p>
          <h2 className="text-4xl md:text-5xl font-fjalla font-bold text-black leading-tight mb-4">
            Activités & <em className="not-italic" style={{ color: "#006A4E" }}>Bons coins</em>
          </h2>
          <p className="text-black/60 text-base max-w-lg leading-relaxed">
            Restaurants, soirées, marchés, nature — tout ce qu'il faut vivre autour du festival Evala à Kara.
          </p>
        </motion.div>

        {/* Séparateur tricolore */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-center gap-0 mb-12 origin-left overflow-hidden rounded-full"
          style={{ height: "2px" }}
        >
          <div className="w-24" style={{ background: "#006A4E" }} />
          <div className="w-24" style={{ background: "#FFCD00" }} />
          <div className="flex-1" style={{ background: "linear-gradient(to right, #CE1126, transparent)" }} />
        </motion.div>

        {/* Grille */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activites.map((a, i) => (
            <motion.div
              key={a.titre}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-black/[0.07] p-6 hover:border-black/[0.14] hover:shadow-[0_6px_24px_rgba(0,0,0,0.07)] transition-all duration-300 bg-white"
            >
              {/* Icône */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: a.bg, color: a.color }}>
                {a.icon}
              </div>

              <h3 className="font-fjalla font-bold text-black text-lg mb-2">{a.titre}</h3>
              <p className="text-black/55 text-sm leading-relaxed mb-4">{a.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {a.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-1 rounded-full"
                    style={{ background: a.bg, color: a.color }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

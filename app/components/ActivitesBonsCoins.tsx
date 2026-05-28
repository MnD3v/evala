"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Utensils, Music, Coffee, ShoppingBag, Waves, Camera, Sparkles, ExternalLink } from "lucide-react";
import { client } from "@/sanity/client";
import type { SanityDocument } from "next-sanity";

/* ── Mapping catégorie → icône + couleurs ── */
const CATEGORIE_CONFIG: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  restaurants:    { icon: <Utensils className="w-6 h-6" />,   color: "#006A4E", bg: "rgba(0,106,78,0.08)" },
  soirees:        { icon: <Music className="w-6 h-6" />,      color: "#CE1126", bg: "rgba(206,17,38,0.07)" },
  bars:           { icon: <Coffee className="w-6 h-6" />,     color: "#8a6d00", bg: "rgba(255,205,0,0.10)" },
  marches:        { icon: <ShoppingBag className="w-6 h-6" />,color: "#006A4E", bg: "rgba(0,106,78,0.08)" },
  nature:         { icon: <Waves className="w-6 h-6" />,      color: "#CE1126", bg: "rgba(206,17,38,0.07)" },
  sites_culturels:{ icon: <Camera className="w-6 h-6" />,     color: "#8a6d00", bg: "rgba(255,205,0,0.10)" },
  autre:          { icon: <Sparkles className="w-6 h-6" />,   color: "#006A4E", bg: "rgba(0,106,78,0.08)" },
};

const QUERY = `*[_type == "activite" && actif == true] | order(ordre asc) {
  _id,
  titre,
  categorie,
  body,

  lien,
  publishedAt,
  ordre,
  "image": image.asset->url
}`;

interface Activite extends SanityDocument {
  titre: string;
  categorie: string;
  body?: { _type: string; children?: { text: string }[] }[];

  lien?: string;
  publishedAt?: string;
  ordre?: number;
  image: string;
}

/** Extrait le premier paragraphe de texte d'un body PortableText */
function extractExcerpt(body?: Activite["body"]): string {
  if (!body) return "";
  for (const block of body) {
    if (block._type === "block" && block.children) {
      const text = block.children.map((c) => c.text).join("").trim();
      if (text) return text.length > 160 ? text.slice(0, 157) + "…" : text;
    }
  }
  return "";
}


export default function ActivitesBonsCoins() {
  const [activites, setActivites] = useState<Activite[]>([]);

  useEffect(() => {
    client.fetch<Activite[]>(QUERY)
      .then((data) => setActivites(data ?? []))
      .catch(() => {});
  }, []);

  if (!activites.length) return null;

  return (
    <section id="activites" className="py-24 md:py-32 bg-white relative overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(0,106,78,0.04),transparent)] pointer-events-none" />

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
            À faire
          </p>
          <h2 className="text-4xl md:text-5xl font-clash font-bold text-black leading-tight mb-4">
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
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="flex items-center gap-0 mb-12 origin-left overflow-hidden rounded-full"
          style={{ height: "2px" }}
        >
          <div className="w-24" style={{ background: "#006A4E" }} />
          <div className="w-24" style={{ background: "#FFCD00" }} />
          <div className="flex-1" style={{ background: "linear-gradient(to right, #CE1126, transparent)" }} />
        </motion.div>

        {/* Grille */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activites.map((a, i) => {
            const config = CATEGORIE_CONFIG[a.categorie] ?? CATEGORIE_CONFIG.autre;
            return (
              <motion.div
                key={a._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                className="group rounded-2xl border border-black/[0.07] hover:border-black/[0.14] hover:shadow-[0_6px_24px_rgba(0,0,0,0.07)] transition-all duration-300 bg-white overflow-hidden flex flex-col"
              >
                {/* Image principale (obligatoire) */}
                <div className="relative h-44 overflow-hidden shrink-0">
                  <img
                    src={a.image}
                    alt={a.titre}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  {/* Badge numéro de classement */}
                  {a.ordre !== undefined && (
                    <div className="absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                      style={{ background: config.color }}>
                      {a.ordre}
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  {/* Icône + date */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: config.bg, color: config.color }}>
                      {config.icon}
                    </div>
                    {a.publishedAt && (
                      <span className="text-[11px] text-black/35">
                        {new Date(a.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    )}
                  </div>

                  <h3 className="font-clash font-bold text-black text-lg mb-2">{a.titre}</h3>

                  {/* Extrait du body */}
                  {extractExcerpt(a.body) && (
                    <p className="text-black/55 text-sm leading-relaxed mb-4 flex-1">
                      {extractExcerpt(a.body)}
                    </p>
                  )}

                  {/* Lien Google Maps */}
                  {a.lien && (
                    <a href={a.lien} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-70 mt-auto"
                      style={{ color: config.color }}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Voir sur Google Maps
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

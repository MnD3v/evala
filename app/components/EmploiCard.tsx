"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Calendar, Tag } from "lucide-react";
import type { OffreEmploi, TypeContrat, DomaineEmploi } from "../types/emploi";

const CONTRAT_LABELS: Record<TypeContrat, string> = {
  mission:      "Mission ponctuelle",
  prestation:   "Prestation / Service",
  benevolat:    "Bénévolat",
  journalier:   "Journalier",
  temps_partiel:"Temps partiel",
};

const DOMAINE_LABELS: Record<DomaineEmploi, string> = {
  securite:       "Sécurité",
  restauration:   "Restauration",
  logistique:     "Logistique",
  communication:  "Communication",
  animation:      "Animation",
  transport:      "Transport",
  sante:          "Santé",
  artisanat:      "Artisanat",
  technique:      "Technique",
  administration: "Administration",
  autre:          "Autre",
};

const CONTRAT_STYLE: Record<TypeContrat, { color: string; bg: string; border: string }> = {
  mission:      { color: "#006A4E", bg: "rgba(0,106,78,0.08)",   border: "rgba(0,106,78,0.25)" },
  prestation:   { color: "#CE1126", bg: "rgba(206,17,38,0.07)",  border: "rgba(206,17,38,0.22)" },
  benevolat:    { color: "#006A4E", bg: "rgba(0,106,78,0.08)",   border: "rgba(0,106,78,0.25)" },
  journalier:   { color: "#8a6d00", bg: "rgba(255,205,0,0.12)",  border: "rgba(255,205,0,0.35)" },
  temps_partiel:{ color: "#8a6d00", bg: "rgba(255,205,0,0.12)",  border: "rgba(255,205,0,0.35)" },
};

// Couleur tournante des tags de compétences
const TAG_STYLES = [
  { color: "#CE1126", bg: "rgba(206,17,38,0.07)",  border: "rgba(206,17,38,0.18)" },
  { color: "#8a6d00", bg: "rgba(255,205,0,0.10)",  border: "rgba(255,205,0,0.28)" },
  { color: "#006A4E", bg: "rgba(0,106,78,0.07)",   border: "rgba(0,106,78,0.18)" },
];

interface EmploiCardProps {
  offre: OffreEmploi;
  index: number;
}

export default function EmploiCard({ offre, index }: EmploiCardProps) {
  const contratStyle = CONTRAT_STYLE[offre.type_contrat];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      className="group flex flex-col rounded-2xl overflow-hidden bg-white hover:bg-gray-50 border border-black/[0.07] hover:border-black/[0.12] transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.05)] h-full"
    >
      {/* En-tête */}
      <div className="p-5 flex-grow">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-black font-semibold text-base leading-snug flex-1">
            {offre.titre}
          </h3>
          <span
            className="shrink-0 text-xs font-medium px-2.5 py-1 rounded-full border"
            style={{ color: contratStyle.color, background: contratStyle.bg, borderColor: contratStyle.border }}
          >
            {CONTRAT_LABELS[offre.type_contrat]}
          </span>
        </div>

        {/* Domaine */}
        <div className="flex items-center gap-1.5 mb-3">
          <Tag className="w-3.5 h-3.5" style={{ color: "#CE1126" }} />
          <span className="text-xs font-medium" style={{ color: "#CE1126" }}>
            {DOMAINE_LABELS[offre.domaine]}
          </span>
        </div>

        {/* Description */}
        <p className="text-black text-base leading-relaxed line-clamp-3 mb-4">
          {offre.description}
        </p>

        {/* Infos */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-black">
            <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: "#006A4E" }} />
            <span className="truncate">{offre.lieu}</span>
          </div>
          {offre.salaire && (
            <div className="flex items-center gap-2 text-xs text-black">
              <span className="w-3.5 h-3.5 shrink-0 text-center font-bold" style={{ color: "#FFCD00", textShadow: "0 0 1px rgba(0,0,0,0.3)" }}>
                ₣
              </span>
              <span>{offre.salaire}</span>
            </div>
          )}
          {offre.date_debut && (
            <div className="flex items-center gap-2 text-xs text-black">
              <Calendar className="w-3.5 h-3.5 shrink-0" style={{ color: "#CE1126" }} />
              <span>Début : {offre.date_debut}</span>
            </div>
          )}
        </div>

        {/* Compétences */}
        {offre.competences.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {offre.competences.slice(0, 4).map((c, i) => {
              const s = TAG_STYLES[i % TAG_STYLES.length];
              return (
                <span
                  key={i}
                  className="text-xs px-2 py-0.5 rounded-full border"
                  style={{ color: s.color, background: s.bg, borderColor: s.border }}
                >
                  {c}
                </span>
              );
            })}
            {offre.competences.length > 4 && (
              <span className="text-xs px-2 py-0.5 rounded-full text-black" style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)" }}>
                +{offre.competences.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Pied de carte */}
      <div className="px-5 pb-5 pt-3 flex items-center justify-between" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        <div className="text-black text-xs truncate max-w-[55%]">
          {offre.contact_nom}
        </div>
        <a
          href={`tel:${offre.contact_telephone}`}
          className="inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1.5 transition-all duration-200"
          style={{ color: "#CE1126", background: "rgba(206,17,38,0.07)", border: "1px solid rgba(206,17,38,0.2)" }}
        >
          <Phone className="w-3 h-3" />
          Appeler
        </a>
      </div>
    </motion.div>
  );
}

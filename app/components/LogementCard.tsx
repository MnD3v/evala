"use client";

import { motion } from "framer-motion";
import {
  Wifi, Wind, ChefHat, Waves, Car, Flame,
  Tv, Coffee, Zap, Shield, Users, Phone, MapPin,
} from "lucide-react";
import Link from "next/link";
import type { Logement, Equipement } from "../types/logement";
import { TYPE_LABELS } from "../types/logement";

const EQUIPEMENT_ICONS: Record<Equipement, React.ReactNode> = {
  wifi:           <Wifi className="w-3.5 h-3.5" />,
  climatisation:  <Wind className="w-3.5 h-3.5" />,
  cuisine:        <ChefHat className="w-3.5 h-3.5" />,
  piscine:        <Waves className="w-3.5 h-3.5" />,
  parking:        <Car className="w-3.5 h-3.5" />,
  eau_chaude:     <Flame className="w-3.5 h-3.5" />,
  tv:             <Tv className="w-3.5 h-3.5" />,
  petit_dejeuner: <Coffee className="w-3.5 h-3.5" />,
  generatrice:    <Zap className="w-3.5 h-3.5" />,
  securite:       <Shield className="w-3.5 h-3.5" />,
};

const EQUIPEMENT_LABELS: Record<Equipement, string> = {
  wifi:           "Wifi",
  climatisation:  "Clim",
  cuisine:        "Cuisine",
  piscine:        "Piscine",
  parking:        "Parking",
  eau_chaude:     "Eau chaude",
  tv:             "TV",
  petit_dejeuner: "Petit-déj.",
  generatrice:    "Groupe élec.",
  securite:       "Sécurité",
};

const TYPE_COLOR: Record<string, { dot: string; text: string; header: string }> = {
  hotel:        { dot: "#555", text: "#555", header: "#1a1a1a" },
  appartement:  { dot: "#555", text: "#555", header: "#1a1a1a" },
  airbnb:       { dot: "#555", text: "#555", header: "#1a1a1a" },
  chambre_hote: { dot: "#555", text: "#555", header: "#1a1a1a" },
};

interface LogementCardProps {
  logement: Logement;
  index: number;
}

export default function LogementCard({ logement, index }: LogementCardProps) {
  const {
    titre, type, prix_par_nuit, adresse, ville,
    capacite, equipements, images,
    contact_nom, contact_telephone,
  } = logement;

  const imageUrl = images?.[0] ?? null;
  const visibleEquipements = equipements?.slice(0, 3) ?? [];
  const extraCount = Math.max(0, (equipements?.length ?? 0) - 3);
  const typeColor = TYPE_COLOR[type] ?? TYPE_COLOR.appartement;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
    >
      <Link
        href={`/logement/${logement.id}`}
        className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-black/[0.07] hover:border-black/[0.14] transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.1)] cursor-pointer"
      >
        {/* ── En-tête coloré ── */}
        <div className="relative" style={{ background: typeColor.header }}>

          {/* Image ou placeholder */}
          {imageUrl ? (
            <div className="relative h-44 overflow-hidden">
              <img
                src={imageUrl}
                alt={titre}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04] mix-blend-multiply opacity-70"
              />
              <div className="absolute inset-0" style={{ background: `${typeColor.header}99` }} />
            </div>
          ) : (
            <div className="h-44 flex items-center justify-center">
              <MapPin className="w-10 h-10 text-white/30" />
            </div>
          )}

          {/* Badge type */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-2.5 py-1"
            style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="text-[11px] font-medium text-white">{TYPE_LABELS[type]}</span>
          </div>

          {/* Prix en haut à droite */}
          {prix_par_nuit && (
            <div className="absolute top-3 right-3 rounded-xl px-3 py-1.5 text-right"
              style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)" }}>
              <span className="text-white font-bold text-sm leading-none">
                {prix_par_nuit.toLocaleString("fr-FR")}
              </span>
              <span className="text-white/70 text-[10px] ml-1">FCFA/nuit</span>
            </div>
          )}
        </div>


        {/* ── Corps blanc ── */}
        <div className="flex flex-col flex-1 px-5 pt-4 pb-5 gap-3.5 bg-white">

          {/* Titre */}
          <h3 className="font-bold text-black text-[15px] leading-snug line-clamp-2">
            {titre}
          </h3>

          {/* Localisation + capacité */}
          <div className="flex items-center justify-between text-[12px] text-black/50">
            <div className="flex items-center gap-1.5 min-w-0">
              <MapPin className="w-3 h-3 shrink-0" style={{ color: "#CE1126" }} />
              <span className="truncate">{adresse || ville}</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <Users className="w-3 h-3" style={{ color: "#006A4E" }} />
              <span>{capacite} pers.</span>
            </div>
          </div>

          {/* Équipements */}
          {visibleEquipements.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              {visibleEquipements.map((eq) => (
                <div
                  key={eq}
                  title={EQUIPEMENT_LABELS[eq]}
                  className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px]"
                  style={{ background: "rgba(0,106,78,0.07)", color: "#006A4E" }}
                >
                  {EQUIPEMENT_ICONS[eq]}
                  <span>{EQUIPEMENT_LABELS[eq]}</span>
                </div>
              ))}
              {extraCount > 0 && (
                <span className="text-black/35 text-[11px]">+{extraCount}</span>
              )}
            </div>
          )}

          {/* Séparateur tricolore */}
          <div className="h-px mt-auto bg-black/[0.07]" />

          {/* Contact + Appeler */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-black text-[12px] font-semibold">{contact_nom}</p>
              <p className="text-black/40 text-[11px]">{contact_telephone}</p>
            </div>
            <button
              onClick={(e) => { e.preventDefault(); window.open(`tel:${contact_telephone}`, "_blank"); }}
              className="flex items-center gap-1.5 text-[12px] font-medium rounded-full px-3.5 py-1.5 transition-all duration-200 hover:bg-black hover:text-white"
              style={{ color: "#111", background: "transparent", border: "2px solid #111" }}
            >
              <Phone className="w-3 h-3" />
              Appeler
            </button>
          </div>

        </div>
      </Link>
    </motion.div>
  );
}

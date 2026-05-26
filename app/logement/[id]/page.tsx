"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Wifi, Wind, ChefHat, Waves, Car, Flame,
  Tv, Coffee, Zap, Shield, MapPin, Users,
  Phone, Mail, ArrowLeft, ChevronLeft, ChevronRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { supabase } from "../../lib/supabase";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import type { Logement, Equipement } from "../../types/logement";
import { TYPE_LABELS, EQUIPEMENT_LABELS } from "../../types/logement";

const EQUIPEMENT_ICONS: Record<Equipement, React.ReactNode> = {
  wifi:           <Wifi className="w-4 h-4" />,
  climatisation:  <Wind className="w-4 h-4" />,
  cuisine:        <ChefHat className="w-4 h-4" />,
  piscine:        <Waves className="w-4 h-4" />,
  parking:        <Car className="w-4 h-4" />,
  eau_chaude:     <Flame className="w-4 h-4" />,
  tv:             <Tv className="w-4 h-4" />,
  petit_dejeuner: <Coffee className="w-4 h-4" />,
  generatrice:    <Zap className="w-4 h-4" />,
  securite:       <Shield className="w-4 h-4" />,
};

const TYPE_COLOR: Record<string, { dot: string; text: string; bg: string; border: string }> = {
  hotel:        { dot: "#CE1126", text: "#CE1126", bg: "rgba(206,17,38,0.06)",  border: "rgba(206,17,38,0.18)" },
  appartement:  { dot: "#006A4E", text: "#006A4E", bg: "rgba(0,106,78,0.06)",  border: "rgba(0,106,78,0.18)" },
  airbnb:       { dot: "#8a6d00", text: "#8a6d00", bg: "rgba(255,205,0,0.08)", border: "rgba(255,205,0,0.3)" },
  chambre_hote: { dot: "#CE1126", text: "#CE1126", bg: "rgba(206,17,38,0.06)",  border: "rgba(206,17,38,0.18)" },
};

export default function LogementDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [logement, setLogement] = useState<Logement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (!id) return;
    supabase
      .from("logements")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) { router.push("/logement"); return; }
        setLogement(data as Logement);
        setIsLoading(false);
      });
  }, [id, router]);

  if (isLoading) {
    return (
      <div className="font-poppins">
        <Navbar />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="flex gap-2">
            {["#CE1126", "#FFCD00", "#006A4E"].map((c, i) => (
              <motion.div key={i} className="w-2 h-2 rounded-full"
                style={{ background: c }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!logement) return null;

  const images = logement.images?.filter(Boolean) ?? [];
  const typeColor = TYPE_COLOR[logement.type] ?? TYPE_COLOR.hotel;
  const hasMultipleImages = images.length > 1;

  return (
    <div className="font-poppins bg-white">
      <Navbar />

      <main className="min-h-screen">

        {/* ── Hero image ── */}
        <div className="relative w-full overflow-hidden bg-gray-100" style={{ height: "55vh", minHeight: 360 }}>
          {images.length > 0 ? (
            <>
              <motion.img
                key={imgIndex}
                src={images[imgIndex]}
                alt={logement.titre}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />

              {hasMultipleImages && (
                <>
                  <button onClick={() => setImgIndex(i => (i - 1 + images.length) % images.length)}
                    className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition-all duration-200">
                    <ChevronLeft className="w-4 h-4 text-black" />
                  </button>
                  <button onClick={() => setImgIndex(i => (i + 1) % images.length)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition-all duration-200">
                    <ChevronRight className="w-4 h-4 text-black" />
                  </button>
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, i) => (
                      <button key={i} onClick={() => setImgIndex(i)}
                        className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                        style={{ background: i === imgIndex ? "#fff" : "rgba(255,255,255,0.4)", transform: i === imgIndex ? "scale(1.3)" : "scale(1)" }}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Compteur */}
              {hasMultipleImages && (
                <div className="absolute top-5 right-5 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full">
                  {imgIndex + 1} / {images.length}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gray-50">
              <MapPin className="w-12 h-12 text-black/20" />
              <span className="text-black/30 text-sm">Aucune photo disponible</span>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {hasMultipleImages && (
          <div className="border-b border-black/[0.06]">
            <div className="container mx-auto px-6 md:px-8 max-w-5xl">
              <div className="flex gap-2 py-3 overflow-x-auto">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setImgIndex(i)}
                    className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden transition-all duration-200"
                    style={{ outline: i === imgIndex ? `2px solid #006A4E` : "2px solid transparent", outlineOffset: 2, opacity: i === imgIndex ? 1 : 0.5 }}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Contenu ── */}
        <div className="container mx-auto px-6 md:px-8 max-w-5xl py-10">

          {/* Retour */}
          <Link href="/logement"
            className="inline-flex items-center gap-1.5 text-black/35 hover:text-black text-xs transition-colors duration-200 mb-8">
            <ArrowLeft className="w-3.5 h-3.5" />
            Tous les logements
          </Link>

          <div className="grid lg:grid-cols-[1fr_300px] gap-12">

            {/* ── Gauche ── */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

              {/* Badge type */}
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full mb-4"
                style={{ background: typeColor.bg, color: typeColor.text, border: `1px solid ${typeColor.border}` }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: typeColor.dot }} />
                {TYPE_LABELS[logement.type]}
              </span>

              {/* Titre */}
              <h1 className="font-bold text-black leading-tight mb-4"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)" }}>
                {logement.titre}
              </h1>

              {/* Localisation + capacité */}
              <div className="flex flex-wrap gap-4 text-sm text-black/50 mb-8">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#CE1126" }} />
                  {logement.adresse || logement.ville}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#006A4E" }} />
                  {logement.capacite} personne{logement.capacite > 1 ? "s" : ""}
                </span>
              </div>

              {/* Ligne de séparation */}
              <div className="h-px bg-black/[0.06] mb-8" />

              {/* Description */}
              {logement.description && (
                <>
                  <h2 className="text-sm font-semibold text-black mb-3">À propos</h2>
                  <p className="text-black/60 text-sm leading-relaxed mb-8">{logement.description}</p>
                  <div className="h-px bg-black/[0.06] mb-8" />
                </>
              )}

              {/* Équipements */}
              {logement.equipements?.length > 0 && (
                <>
                  <h2 className="text-sm font-semibold text-black mb-5">Ce que propose ce logement</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {logement.equipements.map((eq) => (
                      <div key={eq} className="flex items-center gap-3 text-sm text-black/70">
                        <span style={{ color: "#006A4E" }}>{EQUIPEMENT_ICONS[eq]}</span>
                        {EQUIPEMENT_LABELS[eq]}
                      </div>
                    ))}
                  </div>
                </>
              )}

            </motion.div>

            {/* ── Sidebar ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:sticky lg:top-28 h-fit"
            >
              <div className="rounded-2xl border border-black/[0.09] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)]">

                {/* Prix */}
                <div className="px-6 py-7 border-b border-black/[0.07]">
                  {logement.prix_par_nuit ? (
                    <div className="flex items-end gap-2">
                      <span className="font-bold text-black leading-none"
                        style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)" }}>
                        {logement.prix_par_nuit.toLocaleString("fr-FR")}
                      </span>
                      <div className="mb-1">
                        <span className="text-sm font-medium text-black/70">FCFA</span>
                        <span className="text-xs text-black/35 ml-1">/ nuit</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-black/40 italic">Prix sur demande</p>
                  )}
                </div>

                {/* Contact info */}
                <div className="px-6 py-5 border-b border-black/[0.07]">
                  <p className="text-[10px] uppercase font-medium text-black/35 mb-2">Proposé par</p>
                  <p className="font-semibold text-black text-sm">{logement.contact_nom}</p>
                  <p className="text-black/40 text-xs mt-0.5">{logement.contact_telephone}</p>
                </div>

                {/* Actions */}
                <div className="px-6 py-5 flex flex-col gap-2.5">
                  <a href={`tel:${logement.contact_telephone}`}
                    className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
                    style={{ background: "#006A4E" }}>
                    <Phone className="w-4 h-4" />
                    Appeler
                  </a>

                  <a href={`https://wa.me/${logement.contact_telephone.replace(/\D/g, "")}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all duration-200 hover:opacity-90"
                    style={{ background: "rgba(0,106,78,0.07)", color: "#006A4E", border: "1px solid rgba(0,106,78,0.18)" }}>
                    <FaWhatsapp className="w-4 h-4" />
                    WhatsApp
                  </a>

                  {logement.contact_email && (
                    <a href={`mailto:${logement.contact_email}`}
                      className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium text-black/50 hover:text-black transition-colors duration-200"
                      style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
                      <Mail className="w-4 h-4" />
                      Envoyer un email
                    </a>
                  )}
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

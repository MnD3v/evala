"use client";

import { motion } from "framer-motion";
import { FaWhatsapp, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { KabyeGeometric } from "./EvalaIllustrations";

const contacts = [
  {
    icon: <FaWhatsapp className="w-5 h-5" />,
    label: "WhatsApp",
    value: "+228 90 77 88 80",
    href: "https://wa.me/22890778880",
    color: "#006A4E",
    bg: "rgba(0,106,78,0.06)",
    border: "rgba(0,106,78,0.18)",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: "tg.evala@gmail.com",
    href: "mailto:tg.evala@gmail.com",
    color: "#CE1126",
    bg: "rgba(206,17,38,0.05)",
    border: "rgba(206,17,38,0.18)",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: "Téléphone",
    value: "+228 98 78 45 89",
    href: "tel:+22898784589",
    color: "#8a6d00",
    bg: "rgba(255,205,0,0.07)",
    border: "rgba(255,205,0,0.3)",
  },
];

const socials = [
  { icon: <FaFacebook className="w-4 h-4" />,  href: "https://facebook.com/evala",  label: "Facebook",  hoverColor: "#1877F2" },
  { icon: <FaInstagram className="w-4 h-4" />, href: "https://instagram.com/evala", label: "Instagram", hoverColor: "#CE1126" },
  { icon: <FaYoutube className="w-4 h-4" />,   href: "https://youtube.com/evala",   label: "YouTube",   hoverColor: "#CE1126" },
  { icon: <FaWhatsapp className="w-4 h-4" />,  href: "https://wa.me/22890778880",   label: "WhatsApp",  hoverColor: "#006A4E" },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-white relative overflow-hidden">

      {/* Bande tricolore haut */}
      <div className="flex h-[3px]">
        <div className="flex-1" style={{ background: "#CE1126" }} />
        <div className="flex-1" style={{ background: "#FFCD00" }} />
        <div className="flex-1" style={{ background: "#006A4E" }} />
      </div>

      {/* Motifs décoratifs */}
      <div className="absolute top-10 right-10 opacity-[0.05] pointer-events-none hidden md:block">
        <KabyeGeometric size={80} color="#006A4E" />
      </div>
      <div className="absolute bottom-10 left-8 opacity-[0.04] pointer-events-none hidden md:block">
        <KabyeGeometric size={60} color="#CE1126" />
      </div>

      <div className="container mx-auto px-6 md:px-8 max-w-6xl py-20 md:py-28">

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="mb-14 text-center"
        >
          <p className="text-[10px] font-medium uppercase mb-4" style={{ color: "#006A4E" }}>
            Contact
          </p>
          <h2 className="font-clash font-bold text-black leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Une question sur<br />
            <em className="not-italic" style={{ color: "#006A4E" }}>le festival ?</em>
          </h2>
          <p className="text-black/55 text-sm leading-relaxed max-w-md">
            L'équipe du Festival Evala est disponible pour répondre à toutes vos questions — hébergement, programme, accréditations ou partenariats.
          </p>
        </motion.div>

        {/* Séparateur tricolore */}
        <div className="flex h-[2px] overflow-hidden rounded-full mb-14">
          <div className="w-16" style={{ background: "#CE1126" }} />
          <div className="w-16" style={{ background: "#FFCD00" }} />
          <div className="flex-1" style={{ background: "linear-gradient(to right, #006A4E, transparent)" }} />
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-start">

          {/* ── Contacts ── */}
          <div className="flex flex-col gap-4">
            {contacts.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                className="group flex items-center gap-5 p-5 rounded-2xl transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)]"
                style={{ border: `1px solid ${c.border}`, background: c.bg }}
              >
                {/* Icône */}
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                  style={{ background: `${c.color}15`, color: c.color }}>
                  {c.icon}
                </div>

                {/* Texte */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase font-medium mb-0.5" style={{ color: c.color }}>{c.label}</p>
                  <p className="text-black font-semibold text-sm truncate">{c.value}</p>
                </div>

                {/* Flèche */}
                <ArrowUpRight
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0"
                  style={{ color: c.color }}
                />
              </motion.a>
            ))}

            {/* Réseaux sociaux */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              className="flex items-center gap-3 pt-4"
            >
              <span className="text-xs text-black/30 uppercase font-medium">Suivez-nous</span>
              <div className="h-px flex-1 bg-black/[0.06]" />
              <div className="flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full bg-black/[0.04] border border-black/[0.07] flex items-center justify-center text-black/50 hover:scale-110 transition-all duration-200"
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = s.hoverColor; (e.currentTarget as HTMLAnchorElement).style.borderColor = s.hoverColor + "40"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = ""; (e.currentTarget as HTMLAnchorElement).style.borderColor = ""; }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Carte / Localisation ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            className="rounded-2xl overflow-hidden border border-black/[0.07]"
          >
            {/* En-tête carte */}
            <div className="px-6 pt-6 pb-5" style={{ background: "#006A4E" }}>
              {/* Zigzag décoratif en bas */}
              <p className="text-[10px] uppercase font-medium text-white/60 mb-2">Localisation</p>
              <h3 className="font-bold text-white text-xl leading-tight mb-1">
                Kara, Togo
              </h3>
              <p className="text-white/55 text-xs">Région de la Kozah · Massif sud Kabyè</p>
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

            {/* Infos lieu */}
            <div className="px-6 py-5 bg-white">
              <div className="flex flex-col gap-4">
                {[
                  { label: "Ville principale", value: "Kara (Lama-Kara)", color: "#CE1126" },
                  { label: "Cantons concernés", value: "Pya, Lassa, Tchitchao, Lama, Soumdina…", color: "#006A4E" },
                  { label: "Période du festival", value: "Juillet 2026", color: "#8a6d00" },
                  { label: "Stade de la finale", value: "Stade Municipal de Kara", color: "#CE1126" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: item.color }} />
                    <div>
                      <p className="text-[10px] text-black/35 uppercase font-medium mb-0.5">{item.label}</p>
                      <p className="text-black text-sm font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import {
  WrestlersDuo, Likpaya, Ahouye, KabyeDog,
  TchotchoBroom, KabyeGeometric,
} from "../components/EvalaIllustrations";

/* ─── Données ───────────────────────────────────────────────────── */

const TIMELINE = [
  {
    era: "Origines ancestrales",
    period: "Temps immémoriaux",
    color: "#2C1A0E",
    accent: "#8a6d00",
    heading: "Une pratique née avant l'écriture",
    body: [
      "La lutte est au cœur de la culture Kabyè bien avant toute trace écrite. Elle n'est pas un sport mais un rite de passage sacré : le jeune homme de 18 ans (l'évalou) affronte ses pairs pour quitter l'enfance et entrer dans la classe des adultes.",
      "Ce passage s'accomplit sous le regard des ancêtres, des sages (sosa) et de toute la communauté. Échouer n'est pas une honte — refuser de se battre l'est.",
    ],
    illustration: (
      <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: "4/5", maxWidth: 320 }}>
        <Image src="/images/a-propos.png" alt="Lutte traditionnelle Kabyè" fill className="object-cover object-center" />
      </div>
    ),
  },
  {
    era: "Le duel fondateur",
    period: "1785",
    color: "#CE1126",
    accent: "#CE1126",
    heading: "Tchablime contre Fawokézié — la légende naît",
    body: [
      "Les premières luttes enregistrées opposèrent Tchablime de Kpédaw — stature herculéenne de plus de 2 mètres — à Fawokézié de Kolidè, qui ne mesurait que 1,40 m. Ce fut le myrmidon qui terrassa le colosse, déclenchant le virus de la compétition dans toute la Kozah.",
      "Avant ces confrontations inter-villages, la lutte se pratiquait uniquement au sein des communautés pour régler des conflits. Ce duel fondateur la projette dans une dimension collective et identitaire.",
    ],
    quote: {
      text: "Le chien est fort, vigoureux, résistant, endurant, rusé et plus intelligent. L'homme en mangeant sa chair dans sa tendre jeunesse acquerrait sans doute beaucoup de vertus.",
      source: "W. B. Kao, 2001",
    },
  },
  {
    era: "Modernisation",
    period: "Vers 1940",
    color: "#006A4E",
    accent: "#006A4E",
    heading: "Les confrontations inter-villages s'organisent",
    body: [
      "À partir des années 1940, les luttes évoluent : les villages d'un même canton commencent à s'affronter de manière organisée. Des règles émergent, les arènes se structurent, et la compétition acquiert une dimension géographique plus large.",
      "C'est à cette époque que l'Evala passe d'un rituel strictement intra-communautaire à un événement fédérateur de toute la région de la Kozah.",
    ],
  },
  {
    era: "Reconnaissance nationale",
    period: "1967",
    color: "#CE1126",
    accent: "#CE1126",
    heading: "L'impulsion du Général Eyadéma",
    body: [
      "À partir de 1967, sous l'impulsion du Général Gnassingbé Eyadéma lui-même originaire de la région Kabyè, les Evala deviennent une compétition nationale structurée sur huit jours. Le prestige de la lutte s'étend au-delà des frontières de la Kozah.",
      "Le dimanche suivant les finales, la compétition « Super Évala » réunit au Stade Municipal de Kara tous les champions des cantons. Le festival acquiert alors sa forme moderne, spectaculaire et médiatisée.",
    ],
    illustration: <KabyeGeometric size={80} color="#CE1126" />,
  },
  {
    era: "Patrimoine vivant",
    period: "Aujourd'hui",
    color: "#006A4E",
    accent: "#006A4E",
    heading: "Un rite sacré devenu spectacle universel",
    body: [
      "L'Evala s'est imposé comme l'un des festivals culturels les plus emblématiques d'Afrique de l'Ouest. Il attire chaque année des visiteurs du monde entier qui viennent assister aux combats de lutte, aux cérémonies rituelles, aux danses et aux chants traditionnels.",
      "Inscrit au patrimoine culturel du Togo, l'Evala perpétue la transmission des valeurs Kabyè : courage, respect, humilité et appartenance communautaire. La bière de sorgho tchoukoutou coule dans les arènes, le tambour résonne dans les collines — la Kozah vit.",
    ],
  },
];

const CYCLE = [
  { year: "1re année", name: "Senzéha",    title: "Le Bleu",     color: "#CE1126", desc: "Le nouvel évalou goûte pour la première fois la viande de chien au pied du rocher sacré. Il reçoit son collier de fer likpaya — signe de son état d'homme nouveau." },
  { year: "2e année",  name: "Houndouyou", title: "Le Junior",   color: "#8a6d00", desc: "Il reçoit des ordres des seniors et les fait exécuter par les bleus. Il mange sur le rocher de l'ahouyé — lieu sacré de la communauté." },
  { year: "3e année",  name: "Kayiyou",    title: "Le Champion", color: "#006A4E", desc: "Il clôture le cycle évatou, donne les ordres, et c'est dans ce groupe que sort le champion de chaque communauté." },
];

const AGE_CLASSES = [
  { range: "0 – 17 ans",  name: "Biya",         role: "Enfance",    color: "#8a6d00",  desc: "Les enfants dépendants de leurs parents, en apprentissage de la vie familiale et agricole." },
  { range: "18 – 30 ans", name: "Évalou",        role: "Initiation", color: "#CE1126",  desc: "Les jeunes initiés qui entrent dans la classe des adultes par l'épreuve de la lutte. C'est ici que naît l'Evala." },
  { range: "35 – 50 ans", name: "Akanda",        role: "Notables",   color: "#006A4E",  desc: "Les adultes accomplis qui siègent au conseil et guident la communauté en tant que conseillers." },
  { range: "60 ans +",    name: "Sosa / Kibala", role: "Sages",      color: "#2C1A0E",  desc: "Les anciens qui invoquent les dieux, forment le conseil des sosa et rendent la justice coutumière." },
];

/* ─── Page ──────────────────────────────────────────────────────── */

export default function AboutEvalaPage() {
  return (
    <div className="font-poppins bg-white">
      <Navbar />

      <main>

        {/* ══ HERO — image a-propos.png ══ */}
        <div className="relative h-[75vh] min-h-[480px] max-h-[700px] overflow-hidden">
          <Image
            src="/images/a-propos.png"
            alt="Evala — lutte traditionnelle Kabyè"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

          {/* Motif décoratif */}
          <div className="absolute top-8 right-10 opacity-[0.15] pointer-events-none hidden md:block">
            <KabyeGeometric size={90} color="#FFCD00" />
          </div>

          {/* Contenu hero */}
          <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-12 max-w-5xl mx-auto w-full left-0 right-0">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[10px] font-medium uppercase text-white/50 mb-4 tracking-widest">
                Héritage & Culture · Kabyè · Togo
              </p>
              <h1 className="font-clash text-white leading-tight mb-4"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}>
                Qu'est-ce que{" "}
                <em className="not-italic" style={{ color: "#FFCD00" }}>l'Evala ?</em>
              </h1>
              <p className="text-white/60 text-sm leading-relaxed max-w-xl">
                Cérémonie rituelle multiséculaire, l'Evala consacre le passage à l'âge adulte et affirme l'identité culturelle du peuple Kabyè, ancrée dans la région de la Kozah, au nord du Togo.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── Zigzag tricolore ── */}
        <svg width="100%" height="14" viewBox="0 0 90 14" preserveAspectRatio="none" className="block">
          <polygon points="0,0 15,14 30,0" fill="#CE1126" />
          <polygon points="30,0 45,14 60,0" fill="#FFCD00" />
          <polygon points="60,0 75,14 90,0" fill="#CE1126" />
          <polygon points="0,14 15,0 0,0" fill="#006A4E" />
          <polygon points="15,14 30,0 45,14" fill="#FFCD00" />
          <polygon points="45,14 60,0 75,14" fill="#006A4E" />
          <polygon points="75,14 90,0 90,14" fill="#FFCD00" />
        </svg>

        {/* ══ STATS ══ */}
        <div className="container mx-auto px-6 md:px-8 max-w-4xl">
          <div className="grid grid-cols-3 border-b border-black/[0.06] divide-x divide-black/[0.06] mb-20">
            {[
              { value: "1785", unit: "première lutte",  label: "Tchablime vs Fawokézié", color: "#CE1126" },
              { value: "3",    unit: "ans de cycle",    label: "senzéha → houndouyou → kayiyou", color: "#006A4E" },
              { value: "18",   unit: "ans",             label: "âge d'entrée en initiation", color: "#8a6d00" },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                className="flex flex-col gap-1 py-8 px-4 md:px-8">
                <span className="font-bold leading-none" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", color: s.color }}>{s.value}</span>
                <p className="text-sm font-medium text-black">{s.unit}</p>
                <p className="text-xs text-black/45">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ══ TIMELINE HISTORIQUE ══ */}
        <div className="container mx-auto px-6 md:px-8 max-w-4xl mb-20">

          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            className="flex items-center gap-3 mb-12"
          >
            <p className="text-[10px] font-medium uppercase tracking-widest" style={{ color: "#CE1126" }}>Frise historique</p>
            <div className="h-px flex-1" style={{ background: "rgba(206,17,38,0.15)" }} />
          </motion.div>

          {/* Ligne verticale + entrées */}
          <div className="relative">
            {/* Ligne centrale sur desktop */}
            <div className="hidden md:block absolute left-[140px] top-0 bottom-0 w-px bg-black/[0.07]" />

            <div className="flex flex-col gap-0">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.05 }}
                  viewport={{ once: true, margin: "-60px" }}
                  className="relative flex flex-col md:flex-row gap-6 pb-14 last:pb-0"
                >
                  {/* Colonne gauche — période */}
                  <div className="md:w-[140px] md:pr-8 md:text-right shrink-0 flex md:flex-col items-center md:items-end gap-3 md:gap-1">
                    <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: item.accent }}>
                      {item.era}
                    </span>
                    <span className="font-bold text-black/20 text-sm whitespace-nowrap">
                      {item.period}
                    </span>
                  </div>

                  {/* Point sur la timeline */}
                  <div className="hidden md:flex absolute left-[140px] -translate-x-1/2 top-0 flex-col items-center">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm mt-0.5"
                      style={{ background: item.color }} />
                  </div>

                  {/* Contenu droite */}
                  <div className="flex-1 md:pl-8">
                    <h3 className="font-clash text-black font-bold mb-3"
                      style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>
                      {item.heading}
                    </h3>

                    {item.body.map((p, j) => (
                      <p key={j} className="text-black/65 text-sm leading-relaxed mb-3 last:mb-0">{p}</p>
                    ))}

                    {/* Illustration si dispo */}
                    {item.illustration && (
                      <div className="mt-5 opacity-80">{item.illustration}</div>
                    )}

                    {/* Citation si dispo */}
                    {item.quote && (
                      <div className="mt-5 pl-5 border-l-2 border-black/10 relative">
                        <div className="absolute -top-1 right-0 opacity-[0.08]">
                          <KabyeDog className="w-14" color="#2C1A0E" />
                        </div>
                        <span className="text-4xl leading-none block mb-1" style={{ color: item.accent, opacity: 0.25 }}>"</span>
                        <p className="italic text-black/60 text-sm leading-relaxed mb-2">{item.quote.text}</p>
                        <p className="text-xs text-black/30">— {item.quote.source}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ CYCLE INITIATIQUE ══ */}
        <div style={{ background: "#F9F9F9" }} className="border-t border-black/[0.05]">
          <div className="container mx-auto px-6 md:px-8 max-w-4xl py-16 md:py-20">

            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              className="flex items-center gap-3 mb-10"
            >
              <div className="opacity-60"><Likpaya size={20} color="#006A4E" /></div>
              <p className="text-[10px] font-medium uppercase tracking-widest" style={{ color: "#006A4E" }}>Le cycle initiatique</p>
              <div className="h-px flex-1" style={{ background: "rgba(0,106,78,0.15)" }} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              className="font-clash font-bold text-black mb-10"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
            >
              Trois années pour devenir champion
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-5">
              {CYCLE.map((c, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                  className="bg-white rounded-2xl border border-black/[0.07] p-6 shadow-sm"
                >
                  <div className="w-8 h-1 rounded-full mb-4" style={{ background: c.color }} />
                  <p className="text-[10px] uppercase font-semibold mb-1" style={{ color: c.color }}>{c.year}</p>
                  <p className="font-bold text-black text-lg mb-0.5">{c.name}</p>
                  <p className="text-xs text-black/40 italic mb-3">{c.title}</p>
                  <p className="text-black/60 text-sm leading-relaxed">{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ CLASSES D'ÂGE ══ */}
        <div className="container mx-auto px-6 md:px-8 max-w-4xl py-16 md:py-20">

          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            className="flex items-center gap-3 mb-10"
          >
            <p className="text-[10px] font-medium uppercase tracking-widest" style={{ color: "#8a6d00" }}>Organisation sociale</p>
            <div className="h-px flex-1" style={{ background: "rgba(138,109,0,0.2)" }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            className="font-clash font-bold text-black mb-10"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
          >
            Les quatre classes d'âge de la société Kabyè
          </motion.h2>

          <div className="flex flex-col divide-y divide-black/[0.05] border border-black/[0.07] rounded-2xl overflow-hidden bg-white shadow-sm">
            {AGE_CLASSES.map((a, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                className="flex items-start gap-6 px-7 py-5"
              >
                <div className="shrink-0 w-20 text-right pt-0.5">
                  <p className="text-[10px] text-black/35 leading-tight">{a.range}</p>
                </div>
                <div className="w-px self-stretch rounded-full" style={{ background: a.color, opacity: 0.3 }} />
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-1">
                    <p className="font-bold text-black text-base">{a.name}</p>
                    <p className="text-[10px] uppercase font-semibold" style={{ color: a.color }}>{a.role}</p>
                  </div>
                  <p className="text-black/55 text-sm leading-relaxed">{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ══ CITATION ══ */}
        <div className="container mx-auto px-6 md:px-8 max-w-4xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            className="relative overflow-hidden rounded-2xl" style={{ background: "#006A4E" }}
          >
            <div className="absolute inset-0 opacity-[0.07]" style={{
              backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
              backgroundSize: "20px 20px",
            }} />
            <div className="absolute right-6 bottom-0 opacity-[0.10] pointer-events-none">
              <Ahouye className="w-36" />
            </div>
            <div className="absolute left-6 top-6 opacity-[0.15] pointer-events-none">
              <TchotchoBroom color="#FFCD00" size={60} />
            </div>
            <div className="px-8 py-10 relative z-10">
              <span className="text-7xl leading-none select-none block mb-2" style={{ color: "#FFCD00", opacity: 0.5 }}>"</span>
              <p className="text-lg md:text-xl text-white italic leading-relaxed mb-5">
                En pays Kabyè, la valeur d'un homme ne se proclame pas — elle se prouve sur la terre battue, devant les ancêtres et la communauté tout entière.
              </p>
              <div className="flex items-center gap-3">
                <div className="h-px w-8" style={{ background: "#FFCD00", opacity: 0.5 }} />
                <span className="text-white/45 text-xs uppercase tracking-widest">Tradition orale Kabyè</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ══ INFOS PRATIQUES ══ */}
        <div className="container mx-auto px-6 md:px-8 max-w-4xl mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Localisation", value: "Kara, Togo",    color: "#CE1126" },
              { label: "Période",      value: "Juillet",        color: "#006A4E" },
              { label: "Durée",        value: "8 jours",        color: "#8a6d00" },
              { label: "Finale",       value: "Stade de Kara",  color: "#CE1126" },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                className="rounded-xl border border-black/[0.07] px-4 py-4 bg-white shadow-sm"
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <MapPin className="w-3 h-3" style={{ color: item.color }} />
                  <p className="text-[9px] uppercase font-medium text-black/35">{item.label}</p>
                </div>
                <p className="text-black font-semibold text-sm">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>


      </main>

      <Footer />
    </div>
  );
}

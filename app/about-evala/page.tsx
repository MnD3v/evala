"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import {
  WrestlersDuo, Likpaya, Ahouye, KabyeDog,
  TchotchoBroom, KabyeGeometric,
} from "../components/EvalaIllustrations";

const ageClasses = [
  { range: "0 – 17 ans",  name: "Biya",         role: "Enfance",    color: "#8a6d00",  desc: "Les enfants dépendants de leurs parents, en apprentissage de la vie familiale et agricole." },
  { range: "18 – 30 ans", name: "Évalou",        role: "Initiation", color: "#CE1126",  desc: "Les jeunes initiés qui entrent dans la classe des adultes par l'épreuve de la lutte. C'est ici que naît l'Evala." },
  { range: "35 – 50 ans", name: "Akanda",        role: "Notables",   color: "#006A4E",  desc: "Les adultes accomplis qui siègent au conseil et guident la communauté en tant que conseillers." },
  { range: "60 ans +",    name: "Sosa / Kibala", role: "Sages",      color: "#2C1A0E",  desc: "Les anciens qui invoquent les dieux, forment le conseil des sosa et rendent la justice coutumière." },
];

const cycle = [
  { year: "1re année", name: "Senzéha",    title: "Le Bleu",     color: "#CE1126", desc: "Le nouvel évalou goûte pour la première fois la viande de chien au pied du rocher sacré. Il reçoit son collier de fer likpaya — signe de son état d'homme nouveau." },
  { year: "2e année",  name: "Houndouyou", title: "Le Junior",   color: "#8a6d00", desc: "Il reçoit des ordres des seniors et les fait exécuter par les bleus. Il mange sur le rocher de l'ahouyé — lieu sacré de la communauté." },
  { year: "3e année",  name: "Kayiyou",    title: "Le Champion", color: "#006A4E", desc: "Il clôture le cycle évatou, donne les ordres, et c'est dans ce groupe que sort le champion de chaque communauté." },
];

export default function AboutEvalaPage() {
  return (
    <div className="font-poppins bg-white">
      <Navbar />

      <main>

        {/* ── En-tête vert ── */}
        <div className="relative overflow-hidden" style={{ background: "#006A4E" }}>

          {/* Motifs décoratifs fond */}
          <div className="absolute top-8 right-12 opacity-[0.08] pointer-events-none select-none hidden md:block">
            <KabyeGeometric size={90} color="#fff" />
          </div>
          <div className="absolute bottom-8 left-10 opacity-[0.06] pointer-events-none select-none hidden md:block">
            <KabyeGeometric size={70} color="#FFCD00" />
          </div>

          {/* Watermark lutteurs */}
          <div className="absolute bottom-0 right-0 w-64 md:w-80 opacity-[0.07] pointer-events-none select-none">
            <WrestlersDuo />
          </div>

          <div className="container mx-auto px-6 md:px-8 max-w-4xl pt-16 pb-14 relative z-10">

            {/* Retour */}
            <Link href="/#about"
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-xs transition-colors duration-200 mb-10">
              <ArrowLeft className="w-3.5 h-3.5" />
              Retour
            </Link>

            <p className="text-[10px] font-medium uppercase text-white/50 mb-5">
              Héritage & Culture · Kabyè · Togo
            </p>
            <h1 className="font-bold text-white leading-[0.92] mb-6"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
              Qu'est-ce que<br />
              <em className="not-italic" style={{ color: "#FFCD00" }}>l'Evala ?</em>
            </h1>
            <p className="text-white/60 text-sm leading-relaxed max-w-lg">
              Cérémonie rituelle à dimension multiple, l'Evala consacre le passage de l'adolescence à l'âge adulte et affirme l'identité culturelle du peuple Kabyè. Une institution multiséculaire ancrée dans la région de la Kozah, au nord du Togo.
            </p>

          </div>
        </div>

        {/* ── Zigzag ── */}
        <svg width="100%" height="14" viewBox="0 0 90 14" preserveAspectRatio="none" className="block">
          <polygon points="0,0 15,14 30,0" fill="#CE1126" />
          <polygon points="30,0 45,14 60,0" fill="#FFCD00" />
          <polygon points="60,0 75,14 90,0" fill="#CE1126" />
          <polygon points="0,14 15,0 0,0" fill="#006A4E" />
          <polygon points="15,14 30,0 45,14" fill="#FFCD00" />
          <polygon points="45,14 60,0 75,14" fill="#006A4E" />
          <polygon points="75,14 90,0 90,14" fill="#FFCD00" />
        </svg>

        {/* ── Corps ── */}
        <div className="container mx-auto px-6 md:px-8 max-w-4xl py-14">

          {/* Évalou parchment + illustration */}
          <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }} viewport={{ once: true }}
              className="rounded-xl overflow-hidden max-w-xs w-full" style={{ background: "#F7EDD8" }}>
              <div className="h-[5px]" style={{ background: "repeating-linear-gradient(90deg, #CE1126 0, #CE1126 22px, #FFCD00 22px, #FFCD00 44px, #006A4E 44px, #006A4E 66px)" }} />
              <div className="px-7 py-8 text-center">
                <p className="text-[10px] uppercase mb-5 font-medium" style={{ color: "#8B6520" }}>en langue Kabyè</p>
                <p className="italic leading-none mb-5" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", color: "#2C1A0E" }}>Évalou</p>
                <div className="flex items-center gap-3 justify-center mb-5">
                  <div className="h-px flex-1" style={{ background: "#8B6520", opacity: 0.25 }} />
                  <span style={{ color: "#8B6520", opacity: 0.5, fontSize: "0.6rem" }}>✦</span>
                  <div className="h-px flex-1" style={{ background: "#8B6520", opacity: 0.25 }} />
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#4A2E10" }}>
                  Le jeune homme de 18 ans qui vient<br />d'entrer dans les rites initiatiques de la lutte.
                </p>
              </div>
              <div className="h-[5px]" style={{ background: "repeating-linear-gradient(90deg, #006A4E 0, #006A4E 22px, #FFCD00 22px, #FFCD00 44px, #CE1126 44px, #CE1126 66px)" }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}
              className="flex flex-col gap-4">
              <div className="flex items-center gap-6">
                <div className="opacity-30"><Likpaya size={44} color="#8B6520" /></div>
                <WrestlersDuo className="w-48 md:w-60" opacity={0.9} />
                <div className="opacity-30"><Likpaya size={44} color="#8B6520" /></div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 border-t border-b border-black/[0.06] divide-x divide-black/[0.06] mb-14">
            {[
              { value: "1785", unit: "première lutte",  label: "Tchablime vs Fawokézié", color: "#CE1126" },
              { value: "3",    unit: "années de cycle", label: "senzéha → houndouyou → kayiyou", color: "#006A4E" },
              { value: "18",   unit: "ans",             label: "âge de l'entrée en initiation", color: "#8a6d00" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }}
                className="flex flex-col gap-1 py-8 px-4 md:px-8">
                <span className="font-bold leading-none" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", color: s.color }}>{s.value}</span>
                <p className="text-sm font-medium text-black">{s.unit}</p>
                <p className="text-xs text-black/45">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* ── Section : Origines ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="mb-14">

            <div className="rounded-2xl overflow-hidden border border-black/[0.07] shadow-[0_2px_12px_rgba(0,0,0,0.05)] mb-10">
              <div className="px-7 pt-7 pb-6" style={{ background: "#CE1126" }}>
                <p className="text-[10px] uppercase font-medium text-white/50 mb-2">Aux origines</p>
                <h2 className="font-bold text-white leading-tight"
                  style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}>
                  1785 — Le premier duel fondateur
                </h2>
              </div>
              <svg width="100%" height="10" viewBox="0 0 90 10" preserveAspectRatio="none" className="block">
                <polygon points="0,0 15,10 30,0" fill="#CE1126" />
                <polygon points="30,0 45,10 60,0" fill="#FFCD00" />
                <polygon points="60,0 75,10 90,0" fill="#006A4E" />
                <polygon points="0,10 15,0 0,0" fill="#CE1126" />
                <polygon points="15,10 30,0 45,10" fill="#FFCD00" />
                <polygon points="45,10 60,0 75,10" fill="#CE1126" />
                <polygon points="75,10 90,0 90,10" fill="#006A4E" />
              </svg>
              <div className="px-7 py-7 bg-white">
                <p className="text-black/70 text-sm leading-relaxed mb-4">
                  Les premières luttes enregistrées en pays Kabyè opposèrent <span style={{ color: "#CE1126" }} className="font-medium">Tchablime de Kpédaw</span> — stature herculéenne de plus de 2 mètres — à <span style={{ color: "#CE1126" }} className="font-medium">Fawokézié de Kolidè</span>, qui ne mesurait que 1,40 m. Ce fut le myrmidon qui terrassa le colosse, déclenchant le virus de la compétition dans toute la Kozah.
                </p>
                <p className="text-black/70 text-sm leading-relaxed">
                  Avant les compétitions inter-villages, la lutte se pratiquait uniquement au sein des villages pour régler des conflits interpersonnels. C'est vers 1940 qu'elle devint moderne, avec les confrontations entre villages d'un même canton.
                </p>

                {/* Citation KabyeDog */}
                <div className="mt-6 pl-6 border-l-2 border-black/10 relative">
                  <div className="absolute -top-2 right-0 opacity-[0.10]">
                    <KabyeDog className="w-16" color="#2C1A0E" />
                  </div>
                  <span className="text-5xl leading-none block mb-2" style={{ color: "#CE1126", opacity: 0.2 }}>"</span>
                  <p className="italic text-black/70 text-sm leading-relaxed mb-2">
                    Le chien est fort, vigoureux, résistant, endurant, rusé et plus intelligent. L'homme en mangeant sa chair dans sa tendre jeunesse acquerrait sans doute beaucoup de vertus.
                  </p>
                  <p className="text-xs text-black/30">— W. B. Kao, 2001</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Section : Cycle initiatique ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="mb-14">

            <div className="rounded-2xl overflow-hidden border border-black/[0.07] shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
              <div className="px-7 pt-7 pb-6" style={{ background: "#006A4E" }}>
                <div className="flex items-center gap-2.5 mb-2">
                  <p className="text-[10px] uppercase font-medium text-white/50">Le cycle initiatique</p>
                  <div className="opacity-40"><Likpaya size={18} color="#fff" /></div>
                </div>
                <h2 className="font-bold text-white leading-tight"
                  style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}>
                  Trois années pour devenir champion
                </h2>
              </div>
              <svg width="100%" height="10" viewBox="0 0 90 10" preserveAspectRatio="none" className="block">
                <polygon points="0,0 15,10 30,0" fill="#CE1126" />
                <polygon points="30,0 45,10 60,0" fill="#FFCD00" />
                <polygon points="60,0 75,10 90,0" fill="#006A4E" />
                <polygon points="0,10 15,0 0,0" fill="#006A4E" />
                <polygon points="15,10 30,0 45,10" fill="#FFCD00" />
                <polygon points="45,10 60,0 75,10" fill="#CE1126" />
                <polygon points="75,10 90,0 90,10" fill="#006A4E" />
              </svg>
              <div className="bg-white">
                <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/[0.06]">
                  {cycle.map((c, i) => (
                    <div key={i} className="flex flex-col px-7 py-7">
                      <div className="w-7 h-[3px] mb-4 rounded-full" style={{ background: c.color }} />
                      <p className="text-[10px] uppercase font-medium mb-1" style={{ color: c.color }}>{c.year}</p>
                      <p className="font-bold text-black text-lg mb-1">{c.name}</p>
                      <p className="text-xs text-black/40 mb-3 italic">{c.title}</p>
                      <p className="text-black/60 text-sm leading-relaxed">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Section : Classes d'âge ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="mb-14">

            <div className="rounded-2xl overflow-hidden border border-black/[0.07] shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
              <div className="px-7 pt-7 pb-6" style={{ background: "#8a6d00" }}>
                <p className="text-[10px] uppercase font-medium text-white/50 mb-2">Organisation sociale</p>
                <h2 className="font-bold text-white leading-tight"
                  style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}>
                  Les quatre classes d'âge de la société Kabyè
                </h2>
              </div>
              <svg width="100%" height="10" viewBox="0 0 90 10" preserveAspectRatio="none" className="block">
                <polygon points="0,0 15,10 30,0" fill="#CE1126" />
                <polygon points="30,0 45,10 60,0" fill="#FFCD00" />
                <polygon points="60,0 75,10 90,0" fill="#006A4E" />
                <polygon points="0,10 15,0 0,0" fill="#8a6d00" />
                <polygon points="15,10 30,0 45,10" fill="#FFCD00" />
                <polygon points="45,10 60,0 75,10" fill="#CE1126" />
                <polygon points="75,10 90,0 90,10" fill="#006A4E" />
              </svg>
              <div className="bg-white flex flex-col divide-y divide-black/[0.05]">
                {ageClasses.map((a, i) => (
                  <div key={i} className="flex items-start gap-6 px-7 py-5">
                    <div className="flex-shrink-0 w-20 text-right">
                      <p className="text-[10px] text-black/35 leading-tight">{a.range}</p>
                    </div>
                    <div className="w-px self-stretch rounded-full" style={{ background: a.color, opacity: 0.3 }} />
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-1">
                        <p className="font-bold text-black text-base">{a.name}</p>
                        <p className="text-[10px] uppercase font-medium" style={{ color: a.color }}>{a.role}</p>
                      </div>
                      <p className="text-black/55 text-sm leading-relaxed">{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Citation verte ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl mb-14" style={{ background: "#006A4E" }}>
            <div className="absolute inset-0 opacity-[0.07]" style={{
              backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
              backgroundSize: "20px 20px",
            }} />
            <div className="absolute right-6 bottom-0 opacity-[0.10] pointer-events-none select-none">
              <Ahouye className="w-40" />
            </div>
            <div className="absolute left-6 top-6 opacity-[0.15] pointer-events-none select-none">
              <TchotchoBroom color="#FFCD00" size={70} />
            </div>
            <div className="px-8 py-10 relative z-10">
              <span className="text-7xl leading-none select-none block mb-2" style={{ color: "#FFCD00", opacity: 0.5 }}>"</span>
              <p className="text-lg md:text-xl text-white italic leading-relaxed mb-5">
                En pays Kabyè, la valeur d'un homme ne se proclame pas — elle se prouve sur la terre battue, devant les ancêtres et la communauté tout entière.
              </p>
              <div className="flex items-center gap-3">
                <div className="h-px w-8" style={{ background: "#FFCD00", opacity: 0.5 }} />
                <span className="text-white/45 text-xs uppercase">Tradition orale Kabyè</span>
              </div>
            </div>
          </motion.div>

          {/* ── L'Evala aujourd'hui ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="mb-14">

            <div className="flex items-center gap-3 mb-6">
              <p className="text-[10px] font-medium uppercase" style={{ color: "#CE1126" }}>L'Evala aujourd'hui</p>
              <div className="h-px flex-1" style={{ background: "rgba(206,17,38,0.15)" }} />
            </div>

            <p className="text-black/70 text-sm leading-relaxed mb-4">
              Depuis l'impulsion du Général Eyadéma à partir de 1967, les Evala ont évolué en compétitions inter-villages sur huit jours. Le dimanche suivant les finales, la compétition <span className="font-semibold text-black">« Super Évala »</span> réunit au Stade Municipal de Kara tous les champions des cantons.
            </p>
            <p className="text-black/70 text-sm leading-relaxed">
              Aujourd'hui, la lutte dépasse la simple dimension identitaire pour offrir le spectacle d'un savoir-faire et d'un mode de vie — ponctuée de danses, de chants traditionnels et du <em>tchoukoutou</em>, bière de sorgho emblématique des arènes.
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Localisation", value: "Kara, Togo",  color: "#CE1126" },
                { label: "Période",      value: "Juillet",      color: "#006A4E" },
                { label: "Durée",        value: "8 jours",      color: "#8a6d00" },
                { label: "Finale",       value: "Stade de Kara", color: "#CE1126" },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-black/[0.07] px-4 py-4 bg-white">
                  <div className="flex items-center gap-1.5 mb-2">
                    <MapPin className="w-3 h-3" style={{ color: item.color }} />
                    <p className="text-[9px] uppercase font-medium text-black/35">{item.label}</p>
                  </div>
                  <p className="text-black font-semibold text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Source */}
          <p className="text-[10px] text-black/25 italic mb-10">
            Source : N'Dah N'Dati & Abaï Bafei — <em>Les Evala en pays Kabiyè à l'épreuve de la modernité</em>, Akofena, Varia n°11, Vol.2, 2024
          </p>

          {/* Bouton retour */}
          <Link href="/#about"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
            style={{ color: "#006A4E" }}>
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>

        </div>
      </main>

      <Footer />
    </div>
  );
}

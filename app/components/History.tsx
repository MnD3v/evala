"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";

const events = [
  { year: "2023", label: "Participation record",   description: "Une édition marquée par une affluence exceptionnelle. Les cérémonies traditionnelles ont été particulièrement riches avec la présence de dignitaires de toute la région.", champion: { name: "— — —", canton: "— — —", note: "Information à venir" }, cancelled: false },
  { year: "2022", label: "Signe de l'innovation",  description: "Introduction de nouvelles cérémonies tout en respectant les traditions ancestrales. Une édition qui a su allier modernité et héritage.", champion: { name: "— — —", canton: "— — —", note: "Information à venir" }, cancelled: false },
  { year: "2021", label: "Retour triomphal",        description: "Retour des Evala après la pandémie. Accent particulier sur la transmission des valeurs traditionnelles et le renouveau du lien communautaire.", champion: { name: "— — —", canton: "— — —", note: "Information à venir" }, cancelled: false },
  { year: "2020", label: "Année suspendue",         description: "En raison de la pandémie de COVID-19, les Evala n'ont pas pu se tenir. Cette année a été consacrée à la préservation et à la documentation de l'héritage culturel.", champion: null, cancelled: true },
  { year: "2019", label: "Édition historique",      description: "Participation exceptionnelle, visiteurs internationaux et médias du monde entier. Les Evala s'affirment comme une référence culturelle africaine.", champion: { name: "— — —", canton: "— — —", note: "Information à venir" }, cancelled: false },
  { year: "2018", label: "Édition du renouveau",    description: "Introduction de nouvelles technologies pour la retransmission des combats, tout en préservant l'authenticité des rituels traditionnels.", champion: { name: "— — —", canton: "— — —", note: "Information à venir" }, cancelled: false },
];

// Couleurs drapeau togolais pour les années
const DOT_COLORS = ["#CE1126", "#FFCD00", "#006A4E", "#CE1126", "#FFCD00", "#006A4E"];

export default function History() {
  return (
    <section id="histoire" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_60%,rgba(0,106,78,0.04),transparent)] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8 relative z-10 max-w-6xl">

        {/* En-tête */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="mb-16 text-center">
          <p className="text-xs font-medium tracking-[0.25em] uppercase mb-4" style={{ color: "#006A4E" }}>Mémoire</p>
          <h2 className="text-4xl md:text-5xl font-fjalla font-bold text-black leading-tight mb-5">
            Histoire<br /><em className="not-italic" style={{ color: "#006A4E" }}>& Tradition</em>
          </h2>
          <p className="text-black text-base leading-relaxed max-w-xl mx-auto">
            Les Evala sont bien plus qu'une compétition — un rite initiatique sacré transmis de génération en génération, tissé de chants, de danses et de cérémonies rituelles qui perpétuent l'héritage du peuple Kabyè.
          </p>
        </motion.div>

        {/* Séparateur drapeau */}
        <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="flex items-center gap-4 mb-16 origin-left">
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, #CE1126, #FFCD00, #006A4E, transparent)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#FFCD00" }} />
          <div className="w-1 h-1 rounded-full" style={{ background: "#006A4E" }} />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-0 top-2 bottom-2 w-px" style={{ background: "linear-gradient(to bottom, #CE1126, #FFCD00, #006A4E, transparent)" }} />
          <div className="space-y-0">
            {events.map((event, i) => (
              <motion.div key={event.year} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }} className="relative pl-10 pb-12 last:pb-0">
                <div
                  className="absolute left-0 top-1.5 w-2 h-2 rounded-full -translate-x-[3.5px]"
                  style={{ background: event.cancelled ? "#d1d5db" : DOT_COLORS[i], border: `1px solid ${event.cancelled ? "#d1d5db" : DOT_COLORS[i]}` }}
                />

                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-2xl text-black leading-none">{event.year}</span>
                  <span className="text-xs tracking-wide" style={{ color: event.cancelled ? "#6b7280" : DOT_COLORS[i] }}>{event.label}</span>
                </div>

                <p className="text-black text-sm leading-relaxed mb-4">{event.description}</p>

                {!event.cancelled && event.champion && (
                  <div className="flex items-center gap-3 bg-gray-50 border border-black/[0.05] rounded-xl px-4 py-3">
                    <Trophy className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#FFCD00" }} />
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-black text-xs font-medium truncate">{event.champion.name}</span>
                      <span className="text-black text-xs">·</span>
                      <span className="text-black text-xs truncate">{event.champion.canton}</span>
                    </div>
                    <span className="ml-auto text-black text-[11px] flex-shrink-0">{event.champion.note}</span>
                  </div>
                )}

                {event.cancelled && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-black/[0.05]">
                    <span className="text-black text-xs tracking-wide">Édition annulée — COVID-19</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lien */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="mt-16">
          <Link href="/histoire" className="group inline-flex items-center gap-2.5 text-black hover:text-black text-sm font-medium transition-colors duration-200">
            <span>Voir toute l'histoire</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

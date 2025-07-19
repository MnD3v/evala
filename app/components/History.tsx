"use client";


import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Trophy } from "lucide-react";

export default function History() {
  const eventsHistory = [
    {
      year: "2023",
      eventDescription: "Une édition marquée par une participation record et une affluence exceptionnelle. Les cérémonies traditionnelles ont été particulièrement riches avec la présence de dignitaires de toute la région.",
      champion: {
        name: "- - -",
        canton: "- - -",
        details: "Information à venir",
        photo: null,
      },
      hasHighlights: true
    },
    {
      year: "2022",
      eventDescription: "Une édition placée sous le signe de l'innovation avec l'introduction de nouvelles cérémonies tout en respectant les traditions ancestrales.",
      champion: {
        name: "- - -",
        canton: "- - -",
        details: "Information à venir",
        photo: null,
      },
      hasHighlights: true
    },
    {
      year: "2021",
      eventDescription: "Retour triomphal des Evala après la pandémie. Cette édition a été marquée par un retour aux sources avec un accent particulier sur la transmission des valeurs traditionnelles.",
      champion: {
        name: "- - -",
        canton: "- - -",
        details: "Information à venir",
        photo: null,
      },
      hasHighlights: true
    },
    {
      year: "2020",
      eventDescription: "En raison de la pandémie de COVID-19, les Evala n'ont pas pu se tenir. Cette année a été consacrée à la préservation et à la documentation de notre héritage culturel.",
      champion: {
        name: "-",
        canton: "-",
        details: "Annulé en raison de la pandémie de COVID-19",
        photo: null,
      },
      hasHighlights: false
    },
    {
      year: "2019",
      eventDescription: "Une édition historique qui a vu une participation exceptionnelle. Les cérémonies ont attiré des visiteurs internationaux et des médias du monde entier.",
      champion: {
        name: "- - -",
        canton: "- - -",
        details: "Information à venir",
        photo: null,
      },
      hasHighlights: true
    },
    {
      year: "2018",
      eventDescription: "L'édition du renouveau qui a vu l'introduction de nouvelles technologies pour la retransmission des combats, tout en préservant l'authenticité des rituels traditionnels.",
      champion: {
        name: "- - -",
        canton: "- - -",
        details: "Information à venir",
        photo: null,
      },
      hasHighlights: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <section id="histoire" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-gilroy mb-4 text-evala tracking-wider">
            Histoire & Tradition
          </h2>
          <div className="w-24 h-1 bg-evala mx-auto mb-8"></div>
        </motion.div>

        {/* Description de la cérémonie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <p className="text-lg text-gray-300 mb-8 leading-relaxed font-montserrat">
            Les Evala sont bien plus qu'une simple compétition de lutte traditionnelle. C'est un rite initiatique sacré qui marque le passage à l'âge adulte des jeunes Kabyè. Pendant une semaine intense, les initiés, appelés "Evala", s'affrontent dans des combats qui symbolisent leur courage, leur force et leur détermination. Cette tradition ancestrale, transmise de génération en génération, est accompagnée de chants, de danses et de cérémonies rituelles qui renforcent les liens communautaires et perpétuent l'héritage culturel du peuple Kabyè.
          </p>
        </motion.div>

        {/* Liste des années */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {eventsHistory.map((event, index) => (
            <motion.div
              key={event.year}
              variants={itemVariants}
              className={`relative pl-8 pb-12 ${
                index !== eventsHistory.length - 1 ? "border-l-2 border-evala/20" : ""
              }`}
            >
              <motion.div
                className="absolute -left-3 top-0 w-6 h-6 bg-black border-2 border-evala rounded-full"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="absolute inset-0.5 bg-evala/20 rounded-full"></div>
              </motion.div>

              <div>
                {/* Année et Description */}
                <div className="mb-6">
                  <h3 className="text-4xl font-gilroy text-evala mb-4">
                    {event.year}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {event.eventDescription}
                  </p>
                  {event.hasHighlights && (
                    <Link
                      href={`/moments-forts/${event.year}`}
                      className="inline-flex items-center gap-2 text-sm bg-evala/10 text-evala hover:bg-evala/20 px-4 py-2 rounded-full transition-all duration-300"
                    >
                      <Play className="w-4 h-4" />
                      <span>Voir les moments forts {event.year}</span>
                    </Link>
                  )}
                </div>

                {/* Informations du Champion */}
                <div className="border-t border-evala/10 pt-6">
                  <div className="flex items-center gap-2 text-evala mb-3">
                    <Trophy className="w-5 h-5" />
                    <span className="font-gilroy text-lg">Champion</span>
                  </div>
                  <div className="flex items-start gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl text-white font-gilroy">
                          {event.champion.name}
                        </h4>
                        <span className="text-sm text-gray-400 bg-black/40 px-3 py-1 rounded">
                          {event.champion.canton}
                        </span>
                      </div>
                      <p className="text-gray-400">
                        {event.champion.details}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/histoire"
            className="inline-block text-evala hover:text-evala-dark transition-colors"
          >
            Voir plus d'histoire →
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 
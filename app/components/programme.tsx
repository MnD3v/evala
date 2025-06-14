"use client";

import { motion } from "framer-motion";

const cantons = [
  {
    date: "19 Juillet",
    canton: "Pya",
    debut: "14h",
    nombreCombats: 16,
    localisation: "Au nord de Tcharié, non loin de la montagne sacrée",
    coordinates: { lat: 9.7667, lng: 1.1333 }
  },
  {
    date: "20 Juillet",
    canton: "Tchitchao",
    debut: "14h",
    nombreCombats: 16,
    localisation: "À l'est de Kara, près de la rivière Kara",
    coordinates: { lat: 9.7167, lng: 1.1833 }
  },
  {
    date: "21 Juillet",
    canton: "Lama",
    debut: "14h",
    nombreCombats: 16,
    localisation: "Au sud de Kara, dans la vallée de Lama",
    coordinates: { lat: 9.6833, lng: 1.1667 }
  },
  {
    date: "22 Juillet",
    canton: "Soumdina",
    debut: "14h",
    nombreCombats: 16,
    localisation: "À l'ouest de Kara, près des collines de Soumdina",
    coordinates: { lat: 9.7333, lng: 1.1000 }
  },
  {
    date: "23 Juillet",
    canton: "Landa",
    debut: "14h",
    nombreCombats: 16,
    localisation: "Au nord-est de Kara, dans la plaine de Landa",
    coordinates: { lat: 9.8000, lng: 1.2000 }
  },
  {
    date: "24 Juillet",
    canton: "Demi-Finales",
    debut: "14h",
    nombreCombats: 24,
    localisation: "Stade de Kara",
    confrontations: [
      "Pya vs Tcharié",
      "Lama vs Tchitchao"
    ],
    coordinates: { lat: 9.6500, lng: 1.0833 }
  },
  {
    date: "25 Juillet",
    canton: "Grande Finale",
    debut: "14h",
    nombreCombats: 32,
    localisation: "Stade Municipal de Kara",
    confrontations: ["Vainqueur Demi-finale 1 vs Vainqueur Demi-finale 2"],
    coordinates: { lat: 9.7500, lng: 1.1500 }
  }
];

export default function Programme() {
  return (
    <section className="py-16 md:py-24 bg-black relative overflow-hidden" id="programme">
      {/* Motif d'arrière-plan */}
      <div className="absolute inset-0 opacity-5 bg-pattern"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Titre de la section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-display mb-4 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red bg-clip-text text-transparent">
            Programme des Combats
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red mx-auto mb-4"></div>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Du 19 au 25 Juillet - Les combats traditionnels des Evala
          </p>
        </motion.div>

        {/* Grille des cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cantons.map((canton, index) => (
            <motion.div
              key={canton.date}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-festival-red/50 transition-all duration-300"
            >
              <div className="text-festival-red text-xl font-display mb-4">{canton.date}</div>
              
              <h3 className="text-2xl font-display text-white mb-4">
                {canton.canton}
              </h3>

              <div className="space-y-3 text-gray-300 mb-6">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-festival-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Début: {canton.debut}</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-festival-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Nombre de combats: {canton.nombreCombats}</span>
                </div>

                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-festival-red mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">{canton.localisation}</span>
                </div>

                {canton.confrontations && (
                  <div className="mt-4 p-4 bg-white/5 rounded-xl">
                    <h4 className="text-festival-red font-display mb-2">Confrontations</h4>
                    {canton.confrontations.map((match, idx) => (
                      <div key={idx} className="text-white text-sm py-2 border-b border-white/10 last:border-0">
                        {match}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 text-sm border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300 text-white">
                  Voir la géolocalisation
                </button>
                <button className="flex-1 px-4 py-2 text-sm bg-festival-red rounded-full hover:bg-festival-red/80 transition-all duration-300 text-white">
                  Histoire du canton
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
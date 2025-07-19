"use client";

import { motion } from "framer-motion";

const logements = [
  {
    title: "Hôtels",
    description: "Découvrez notre sélection d'hôtels confortables à Kara",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    title: "Appartements",
    description: "Location d'appartements meublés pour votre séjour",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    title: "Maisons d'hôtes",
    description: "Séjournez chez l'habitant pour une expérience authentique",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    title: "Auberges",
    description: "Options économiques pour les petits budgets",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  }
];

export default function Logement() {
  return (
    <div className="font-poppins min-h-screen bg-black py-24">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-6 bg-gradient-to-r from-festival-red to-white bg-clip-text font-gilroy text-4xl text-transparent md:text-5xl">
            Hébergement
          </h1>
          <div className="mx-auto mb-6 h-1 w-24 bg-gradient-to-r from-festival-red to-white"></div>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            Trouvez l'hébergement idéal pour votre séjour pendant le festival Evala
          </p>
        </motion.div>

        {/* Grille des options de logement */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {logements.map((logement, index) => (
            <motion.div
              key={logement.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-[30px] bg-gradient-to-br from-gray-900 to-black p-8 shadow-xl ring-1 ring-gray-800/10"
            >
              {/* Icône avec cercle lumineux */}
              <div className="relative mb-6">
                <div className="absolute -inset-1 rounded-full bg-festival-red/20 blur-lg transition-all duration-300 group-hover:bg-festival-red/30"></div>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-black text-festival-red ring-1 ring-gray-800/10">
                  {logement.icon}
                </div>
              </div>

              {/* Contenu */}
              <h3 className="mb-3 text-xl font-bold text-white">{logement.title}</h3>
              <p className="text-gray-400">{logement.description}</p>

              {/* Bouton */}
              <div className="mt-6">
                <button className="inline-flex items-center space-x-2 text-festival-red transition-colors duration-300 hover:text-white">
                  <span>Bientôt disponible</span>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>

              {/* Effet de bordure au survol */}
              <div className="absolute inset-0 rounded-[30px] ring-1 ring-inset ring-gray-800/10 transition-all duration-300 group-hover:ring-festival-red/20"></div>
            </motion.div>
          ))}
        </div>

        {/* Message d'information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 rounded-2xl bg-gradient-to-r from-festival-red/10 to-transparent p-8 text-center"
        >
          <p className="text-gray-400">
            Cette section est en cours de développement. Bientôt, vous pourrez réserver votre hébergement directement sur notre plateforme.
          </p>
        </motion.div>
      </div>
    </div>
  );
} 
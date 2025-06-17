"use client";

import { motion } from "framer-motion";

const attractions = [
  {
    title: "Sites Culturels",
    description: "Découvrez les lieux historiques et culturels de la région de Kara",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    )
  },
  {
    title: "Nature & Aventure",
    description: "Explorez les merveilles naturelles et les activités de plein air",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  },
  {
    title: "Artisanat Local",
    description: "Visitez les marchés et ateliers d'artisanat traditionnel",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )
  },
  {
    title: "Gastronomie",
    description: "Savourez la cuisine locale et les spécialités régionales",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

export default function Tourisme() {
  return (
    <div className=" font-poppins min-h-screen bg-black py-24">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-6 bg-gradient-to-r from-festival-red to-white bg-clip-text font-gilroy text-4xl text-transparent md:text-5xl">
            Tourisme
          </h1>
          <div className="mx-auto mb-6 h-1 w-24 bg-gradient-to-r from-festival-red to-white"></div>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            Explorez les richesses culturelles et naturelles de la région de Kara
          </p>
        </motion.div>

        {/* Grille des attractions touristiques */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {attractions.map((attraction, index) => (
            <motion.div
              key={attraction.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-[30px] bg-gradient-to-br from-gray-900 to-black p-8 shadow-xl ring-1 ring-gray-800/10"
            >
              {/* Icône avec cercle lumineux */}
              <div className="relative mb-6">
                <div className="absolute -inset-1 rounded-full bg-festival-red/20 blur-lg transition-all duration-300 group-hover:bg-festival-red/30"></div>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-black text-festival-red ring-1 ring-gray-800/10">
                  {attraction.icon}
                </div>
              </div>

              {/* Contenu */}
              <h3 className="mb-3 text-xl font-bold text-white">{attraction.title}</h3>
              <p className="text-gray-400">{attraction.description}</p>

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
            Cette section est en cours de développement. Bientôt, vous pourrez découvrir tous les attraits touristiques de la région.
          </p>
        </motion.div>
      </div>
    </div>
  );
} 
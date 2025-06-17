"use client";

import { motion } from "framer-motion";

const bonsPlans = [
  {
    title: "Réductions Festival",
    description: "Profitez de réductions exclusives sur les billets et les pass festival",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
    )
  },
  {
    title: "Packages Groupes",
    description: "Offres spéciales pour les groupes et les familles",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    title: "Offres Partenaires",
    description: "Découvrez les offres exclusives de nos partenaires locaux",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "Bons Plans Transport",
    description: "Solutions de transport économiques pour votre séjour",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v6a2 2 0 002 2h2" />
      </svg>
    )
  }
];

export default function BonsPlans() {
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
            Bons Plans
          </h1>
          <div className="mx-auto mb-6 h-1 w-24 bg-gradient-to-r from-festival-red to-white"></div>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            Découvrez nos meilleures offres pour profiter pleinement du festival
          </p>
        </motion.div>

        {/* Grille des bons plans */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {bonsPlans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-[30px] bg-gradient-to-br from-gray-900 to-black p-8 shadow-xl ring-1 ring-gray-800/10"
            >
              {/* Icône avec cercle lumineux */}
              <div className="relative mb-6">
                <div className="absolute -inset-1 rounded-full bg-festival-red/20 blur-lg transition-all duration-300 group-hover:bg-festival-red/30"></div>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-black text-festival-red ring-1 ring-gray-800/10">
                  {plan.icon}
                </div>
              </div>

              {/* Contenu */}
              <h3 className="mb-3 text-xl font-bold text-white">{plan.title}</h3>
              <p className="text-gray-400">{plan.description}</p>

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
            Cette section est en cours de développement. Bientôt, vous pourrez accéder à toutes nos offres spéciales.
          </p>
        </motion.div>
      </div>
    </div>
  );
} 
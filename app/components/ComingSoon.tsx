"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ComingSoonProps {
  title: string;
  description?: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <section className="font-poppins min-h-screen bg-black flex items-center justify-center relative overflow-hidden py-20">
      {/* Fond décoratif */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-festival-red/5 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-festival-red/20 via-transparent to-transparent opacity-40"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-gilroy mb-6 bg-gradient-to-r from-festival-red to-white bg-clip-text text-transparent">
            {title}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-festival-red to-white mx-auto mb-8"></div>
          <p className="text-gray-300 max-w-2xl mx-auto mb-12 text-lg">
            {description || "Cette section est en cours de développement. Revenez bientôt pour découvrir notre contenu exclusif !"}
          </p>

          {/* Animation de chargement */}
          <div className="flex justify-center mb-12">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-festival-red/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-festival-red rounded-full animate-spin" style={{ borderTopColor: 'transparent', animationDuration: '2s' }}></div>
            </div>
          </div>

          {/* Bouton de retour */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href="/"
              className="inline-flex items-center space-x-2 bg-black hover:bg-gray-900 text-festival-red font-semibold py-4 px-8 rounded-full border-2 border-festival-red transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
            >
              <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <span>Retour à l'accueil</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 
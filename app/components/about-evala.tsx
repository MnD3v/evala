"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutEvala() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-black to-black/95 relative overflow-hidden font-poppins">
      <div className="absolute inset-0 opacity-5 bg-pattern"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-gilroy mb-4 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red bg-clip-text text-transparent">
            Qu'est-ce que l'Evala ?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red mx-auto mb-4"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden"
          >
            {/* Contenu initial */}
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-base md:text-xl text-gray-300 leading-relaxed mb-6">
                Les Évala sont des rites initiatiques ancestraux pratiqués en pays Kabyè, dans la région de Kara, au nord du Togo. 
                Ces rites, marqués principalement par la lutte traditionnelle, représentent le passage sacré à l'âge adulte pour les jeunes de 18 à 20 ans.
                Le mot "Évalou" (singulier d'Évala) désigne le jeune homme qui a commencé les rites traditionnels de la lutte.
              </p>

              {/* Aperçu des sections */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-12">
                <div className="text-center p-4 rounded-xl bg-white/5">
                  <h3 className="text-festival-red font-gilroy text-lg mb-2">Origines</h3>
                  <p className="text-sm text-gray-400">L'histoire remonte au XIIIe siècle, avec le légendaire combat entre Tchablime de Kpédaw et Fawokézié de Kolidè</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5">
                  <h3 className="text-festival-red font-gilroy text-lg mb-2">Tradition</h3>
                  <p className="text-sm text-gray-400">Une lutte traditionnelle entre deux jeunes garçons dont la finalité est de mettre à terre son adversaire</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5">
                  <h3 className="text-festival-red font-gilroy text-lg mb-2">Spiritualité</h3>
                  <p className="text-sm text-gray-400">Un rite supervisé par les sages et le grand prêtre "Tchodjo", avec des sacrifices et des cérémonies sacrées</p>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-gray-300">
                  Evala est la toute première initiation à la vie d'homme de l'adolescent Kabiyé. Avant d'être soumis à ces rites, 
                  ces jeunes sont longtemps préparés psychologiquement et physiquement. En pays Kabyè, un jeune qui se dérobe à 
                  cette initiation subit des représailles des sages, de ses parents et de la société entière.
                </p>

                <p className="text-gray-300">
                  La finalité première de cette opération est de former le jeune adolescent à être endurant, courageux et à développer 
                  le sens du stoïcisme. L'aspect culturel de l'événement est rehaussé par les sacrifices que l'adolescent doit consentir : 
                  jeûne, abstinence sexuelle et scarifications qui sont les signes extérieurs du guerrier.
                </p>

                <p className="text-gray-300">
                  L'aspect traditionnel de la cérémonie se révèle par la présence des sages de la communauté qui veillent au respect 
                  des règlements, assurant la direction et l'arbitrage des tournois. Les dates sont fixées après consultation des oracles 
                  et l'autorisation du grand prêtre "Tchodjo". Après les luttes, les prêtres traditionnels effectuent une tournée dans 
                  les lieux sacrés pour remercier les ancêtres.
                </p>
              </div>

              {/* Bouton En savoir plus */}
              <div className="text-center mt-8">
                <Link 
                  href="/about-evala"
                  className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-festival-red to-festival-red/80 rounded-full text-white font-medium text-lg transition-all duration-300 hover:scale-105"
                >
                  <span>Histoire complète</span>
                  <svg 
                    className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Effet de dégradé */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 
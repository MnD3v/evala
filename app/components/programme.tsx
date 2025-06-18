"use client";

import { motion } from "framer-motion";

export default function Programme() {
  return (
    <>
      <section className="py-16 md:py-24 bg-black relative overflow-hidden" id="programme">
        {/* Motif d'arrière-plan */}
        <div className="absolute inset-0 opacity-5 bg-pattern"></div>

        <div className="container  mx-auto px-4 relative z-10">
          {/* Titre de la section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center font-poppins mb-12 flex flex-col justify-center items-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold  text-eorange leading-tight">
              Programme des 
            </h2>
            <img src="/icons/logo.png" alt="" className="h-12 md:h-16 "/>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold mb-4 bg-gradient-to-r text-eorange">
              2025
            </h2>

            <div className="w-24 h-px bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red mx-auto mb-4"></div>
            <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
              Les cérémonies débuteront le{" "}
              <span className="font-gilroy text-lg md:text-xl lg:text-2xl text-evala text-red-600 inline-block transform hover:scale-105 transition-transform duration-300">
                19 juillet 2025
              </span>
            </p>
          </motion.div>

          {/* Message d'information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-black/30 backdrop-blur-sm border border-festival-red/20 rounded-3xl p-8 text-center space-y-8">
              <div>
                <h3 className="text-xl md:text-2xl font-gilroy   inline-flex items-center justify-center gap-2">
                  Programme en cours de finalisation
                </h3>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-black/20 px-6 rounded-xl border border-white/5 hover:border-festival-red/20 transition-colors duration-300">
                  <div className="flex flex-col items-center justify-center text-festival-red mb-3">
                    <svg className="w-5 h-5 " fill="none" stroke="#FF9933" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="font-gilroy text-lg">Horaires</h4>
                  </div>
                  <p className="text-gray-300">
                    Les dates et horaires exacts des combats seront déterminés selon les traditions et annoncés par le grand prêtre "Tchodjo".
                  </p>
                </div>

                <div className="bg-black/20 p-6 rounded-xl border border-white/5 hover:border-festival-red/20 transition-colors duration-300">
                  <div className="flex flex-col items-center justify-center text-festival-red mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="#FF9933" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h4 className="font-gilroy text-lg">Lieux</h4>
                  </div>
                  <p className="text-gray-300">
                    Les lieux exacts des cérémonies dans chaque village seront communiqués par les autorités traditionnelles.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-sm text-gray-400 italic">
                  Restez informés : le programme détaillé des luttes par village sera annoncé prochainement
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
} 
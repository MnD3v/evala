"use client";

import { motion } from "framer-motion";

export default function LiveStream() {
  return (
    <section className="relative py-24 overflow-hidden" id="live">
      {/* Fond décoratif */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-evala/20 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-gilroy mb-6 text-evala">
            Suivez En Direct
          </h2>
          <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto font-montserrat">
            Ne manquez rien des combats d'Evala, même à distance. Vivez l'intensité des luttes en temps réel.
          </p>
        </motion.div>

        {/* Conteneur du live stream */}
        <div className="relative max-w-5xl mx-auto">
          {/* Message d'attente */}
          <div className="bg-black/30 backdrop-blur-sm border border-festival-red/20 rounded-2xl p-8 text-center">
            <h3 className="text-xl md:text-2xl font-gilroy text-festival-red mb-4 inline-flex items-center justify-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Diffusion à venir
            </h3>
            <p className="text-gray-300 mb-4">
              La diffusion en direct des combats sera disponible pendant la période des cérémonies.
            </p>
            <p className="text-sm text-gray-400">
              Les détails de la diffusion seront communiqués prochainement.
            </p>
          </div>

          {/* Placeholder pour le stream */}
          <div className="mt-8 relative bg-black aspect-video overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-black/90 flex items-center justify-center">
              {/* Bordure décorative */}
              <div className="absolute inset-0 border-[3px] border-evala/30"></div>
              <div className="absolute inset-[6px] border border-evala/20"></div>
              
              {/* Coins décoratifs */}
              <div className="absolute top-0 left-0 w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-evala"></div>
                <div className="absolute top-0 left-0 w-[3px] h-full bg-evala"></div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute top-0 right-0 w-full h-[3px] bg-evala"></div>
                <div className="absolute top-0 right-0 w-[3px] h-full bg-evala"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16">
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-evala"></div>
                <div className="absolute bottom-0 left-0 w-[3px] h-full bg-evala"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16">
                <div className="absolute bottom-0 right-0 w-full h-[3px] bg-evala"></div>
                <div className="absolute bottom-0 right-0 w-[3px] h-full bg-evala"></div>
              </div>

              {/* Icône centrale */}
              <div className="w-24 h-24 rounded-full border-2 border-evala flex items-center justify-center bg-evala/5">
                <svg className="w-12 h-12 text-evala" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Message sous le frame */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-400 text-lg font-gilroy tracking-wide">
              La diffusion commencera pendant les cérémonies
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 
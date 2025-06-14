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
          <h2 className="text-6xl font-[var(--font-cinzel)] mb-6 text-evala">
            Suivez En Direct
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-montserrat">
            Ne manquez rien des combats d'Evala, même à distance. Vivez l'intensité des luttes en temps réel.
          </p>
        </motion.div>

        {/* Conteneur du live stream */}
        <div className="relative max-w-5xl mx-auto">
          {/* Indicateur EN DIRECT */}
          <div className="absolute -top-4 left-4 z-20 flex items-center space-x-2 bg-evala px-4 py-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span className="text-white font-semibold tracking-wider text-sm">EN DIRECT</span>
          </div>

          {/* Iframe YouTube avec overlay */}
          <div className="relative bg-black aspect-video overflow-hidden">
            {/* Overlay permanent */}
            <div className="absolute inset-0 bg-black z-10 flex items-center justify-center">
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

              {/* Contenu centré */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-24 h-24 mb-6">
                  {/* Cercle de fond */}
                  <div className="absolute inset-0 rounded-full border-2 border-evala bg-evala/5"></div>
                  {/* Conteneur de l'icône parfaitement centré */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-12 h-12 text-evala" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                <p className="text-evala text-3xl font-display tracking-wider text-center">
                  19 juillet à 14h
                </p>
              </div>
            </div>

            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/live_stream?channel=VOTRE_ID_CHAINE"
              title="Evala en direct"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>

          {/* Informations du programme */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/40 backdrop-blur-sm p-6">
              <h3 className="text-evala font-display text-xl mb-2">Prochain Combat</h3>
              <p className="text-white">Finale - Village de Pya vs Tcharè</p>
              <p className="text-gray-400">15:00 GMT</p>
            </div>
            <div className="bg-black/40 backdrop-blur-sm p-6">
              <h3 className="text-evala font-display text-xl mb-2">Statistiques</h3>
              <p className="text-white">12 Combats</p>
              <p className="text-gray-400">4 Villages</p>
            </div>
            <div className="bg-black/40 backdrop-blur-sm p-6">
              <h3 className="text-evala font-display text-xl mb-2">Programme</h3>
              <p className="text-white">Phases Finales</p>
              <p className="text-gray-400">Jour 5/6</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
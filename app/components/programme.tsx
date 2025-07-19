"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Info } from 'lucide-react';

interface Rencontre {
  competition: string;
  lieu: string;
  heure: string;
  observations: string;
}

interface JourProgramme {
  date: string;
  rencontres: Rencontre[];
}

const programme: JourProgramme[] = [
  {
    "date": "Vendredi 04 Juillet 2025 (KEMEBA)",
    "rencontres": [
      {
        "competition": "Descente du souverain sacrificateur (Tchotchoro)",
        "lieu": "PYA-LAO",
        "heure": "Dans la soirée",
        "observations": ""
      }
    ]
  },
  {
    "date": "Vendredi 18 Juillet 2025 (KEMEBA)",
    "rencontres": [
      {
        "competition": "Préliminaires dans tous les Ahon (sanctuaires)",
        "lieu": "EPP Yadé-Poulou / EPP Yadé-Sodé",
        "heure": "05H / 09H",
        "observations": "1/8 de finale"
      },
      {
        "competition": "FYA : LAO-HAUT contre LAO-BAS",
        "lieu": "EPP Kagnalada",
        "heure": "09H",
        "observations": "Ouverture officielle des luttes Evala"
      }
    ]
  },
  {
    "date": "Samedi 19 Juillet 2025 (MAZA)",
    "rencontres": [
      {"competition": "Préliminaires Walde bas contre Pyadé bas", "lieu": "Platoulidé", "heure": "10H", "observations": "1/4 de finale"},
      {"competition": "SARAKAWA : EPP de Sarakawa", "lieu": "EPP de Sarakawa", "heure": "09H", "observations": "Préliminaires et éliminatoires"},
      {"competition": "YAKE / PREFECTURE DE DOUFELGOU : Terrain cantonal", "lieu": "Terrain cantonal", "heure": "12H30", "observations": "Préliminaires et éliminatoires"},
      {"competition": "YADÉ : Agbandé contre Kayadé", "lieu": "EPP Kayadé", "heure": "09H", "observations": "1/4 de finale"},
      {"competition": "YADÉ : Amoulamidé contre Sodé/Pansawda", "lieu": "EPP Yadé-Sud", "heure": "08H", "observations": "1/4 de finale"},
      {"competition": "YADÉ : Kpetoudé-Poulou contre Adassi", "lieu": "EPP Yadé-Kpédzé", "heure": "09H", "observations": "1/4 de finale"},
      {"competition": "YADÉ : Yaoudé-Kadayo contre Pou", "lieu": "Noyou (Pouda)", "heure": "10H", "observations": "1/4 de finale"},
      {"competition": "YADÉ : Amoulamidé-Sodé/Pansawda contre Agbandé-Kayadé", "lieu": "EPP Yadé Kayadé", "heure": "15H", "observations": "1/4 de finale"},
      {"competition": "TCITCHAO : Kséki-Namboura-Sénidé contre Agbaladé-Fandjoé", "lieu": "Kpanouwyo", "heure": "07H", "observations": "1/4 de finale"},
      {"competition": "TCITCHAO : Kézédé-Sénidé-Agbaladé contre Bouodé-N'zédégué-Kéméné", "lieu": "Kazangbiyo (terrain annexe)", "heure": "08H", "observations": "1/4 de finale"},
      {"competition": "TCITCHAO : Loumbo-Kéméné contre Akélo-Tchéhilidé-Kéméné", "lieu": "Kazangbiyo", "heure": "09H", "observations": "1/4 de finale"},
      {"competition": "TCITCHAO : Bouodé contre Kété", "lieu": "Kazangbiyo", "heure": "10H", "observations": "1/4 de finale"},
      {"competition": "TCITCHAO : Yokodé contre Lohou", "lieu": "EPP Centrale", "heure": "07H", "observations": "1/4 de finale"},
      {"competition": "TCITCHAO : Yokodé-Lohou contre Fatou", "lieu": "Bayéda", "heure": "08H", "observations": "1/4 de finale"},
      {"competition": "TCITCHAO : Yokodé-Lohou-Foutandou contre Senidé", "lieu": "Kazangbiyo", "heure": "09H", "observations": "1/4 de finale"},
      {"competition": "TCITCHAO : Yokodé-Lohou-Poutandou-Saboudé contre Kotédo", "lieu": "Kaligbonnda", "heure": "10H", "observations": "1/4 de finale"}
    ]
  },
  {
    "date": "Lundi 21 Juillet 2025 (HODO)",
    "rencontres": [
      {"competition": "Kiglièbing contre Hazé-Lohou", "lieu": "EPP Centrale de Tchitchao", "heure": "11H", "observations": "2ème 1/2 finale"},
      {"competition": "BOHOU : Tchouryoul-Kolidé contre Walde-haut-Pyadé-haut", "lieu": "EPP de Konozosi", "heure": "10H", "observations": "1/4 de finale"},
      {"competition": "BOHOU : Pouwrouda-Poulou-haut contre Poulou-bas-Pandé", "lieu": "EPP de Tchamédé", "heure": "10H", "observations": "1/4 de finale"},
      {"competition": "BOHOU : Komandé-Poude-Waldé-Tchéhilidé contre Pyadé-Hékada-Louwdé-Kolidé", "lieu": "EPP de Bohou-haut", "heure": "10H", "observations": "1/4 de finale"},
      {"competition": "TCITCHAO : Bou-Patoou contre Kigbièbing-Lohou-Hazé", "lieu": "Terrain Cantonal de Gnama", "heure": "09H", "observations": "Finale"},
      {"competition": "SARAKAWA : Kpéssidé-Haut contre Kpéssidé-Bas", "lieu": "EPP Kpéssidé", "heure": "09H", "observations": "1/4 de finale"},
      {"competition": "BOHOU : Tchouryoul-Kolidé-haut contre Walde-haut-Pyadé-haut", "lieu": "CEG 1 Yadé-Bohou", "heure": "11H", "observations": "1ère 1/2 finale"},
      {"competition": "SOUINDINA : Danse à Soumdina haut", "lieu": "Somdina EPP Kaédé et Marché Pdah", "heure": "10H", "observations": ""},
      {"competition": "LASSA : Danse à Atifoudou", "lieu": "Atifoudou", "heure": "10H", "observations": ""},
      {"competition": "PYA : Danse à PYA-HODO", "lieu": "Place du marché de Pya-Hodo et Terrain CEG de Pya-Hodo", "heure": "15H30", "observations": ""},
      {"competition": "Villages de (Kadjak, Koudah, Awidina et Pitah) entre eux", "lieu": "Divers", "heure": "16H30", "observations": ""},
      {"competition": "TCHARE : Danse des EVALA à TCHARE", "lieu": "Place du marché", "heure": "12H", "observations": ""},
      {"competition": "LAMA : Eliminatoires à Lama-Bas, danse à Lama-Haut", "lieu": "Lama", "heure": "Divers", "observations": ""},
      {"competition": "YADÉ : Préliminaires et autres matches", "lieu": "EPP Yadé-Poulou", "heure": "14H", "observations": "2ème 1/2 finale (Yadé-Haut)"},
      {"competition": "SARAKAWA : Matches divers", "lieu": "EPP Sara", "heure": "07H et 09H", "observations": ""}
    ]
  },
  {
    "date": "Mardi 22 Juillet 2025 (PYA)",
    "rencontres": [
      {"competition": "LASSA : Préliminaires et finales", "lieu": "Terrain cantonal à côté du marché", "heure": "11H", "observations": "Finale"},
      {"competition": "YADÉ-Haut contre Yadé-Bas", "lieu": "EPP de Pya-Hodo", "heure": "08H", "observations": "1/4 de finale"},
      {"competition": "Autres matches PYA, SARAKAWA, LAMA, TCHARE etc.", "lieu": "Voir programme papier", "heure": "toute la journée", "observations": "1/4 de finale et préliminaires"}
    ]
  },
  {
    "date": "Mercredi 23 Juillet 2025 (CELA)",
    "rencontres": [
      {"competition": "Matches divers : PYA, SOUMDINA, KOUMBA, LASSA, TCHARE, BOHOU, DJAMDE, etc.", "lieu": "Voir programme papier", "heure": "08H à 17H", "observations": "1/2 finales et finales"}
    ]
  },
  {
    "date": "Jeudi 24 Juillet 2025 (SARAKAWA)",
    "rencontres": [
      {"competition": "KAASI vs DEWA contre Landa", "lieu": "Ecole Evangélique de Landa", "heure": "09H", "observations": "2ème 1/2 finale"},
      {"competition": "FYA finales", "lieu": "Terrain Cantonal", "heure": "09H30", "observations": "Finale"},
      {"competition": "Autres finales TCHARE, SOUMDINA, etc.", "lieu": "Divers lieux", "heure": "09H à 15H", "observations": ""}
    ]
  },
  {
    "date": "Vendredi 25 Juillet 2025 (KEMEBA)",
    "rencontres": [
      {"competition": "Doufelgou finale", "lieu": "Terrain Cantonal de Kouméa", "heure": "08H", "observations": "Finale"},
      {"competition": "Autres finales LAMA, DJAMDE, LASSA, TCHARE", "lieu": "Terrains cantonaux divers", "heure": "09H à 15H", "observations": ""}
    ]
  },
  {
    "date": "Samedi 26 Juillet 2025 (MAZA)",
    "rencontres": [
      {"competition": "SOUINDINA finale", "lieu": "Terrain officiel de Sotédé", "heure": "09H", "observations": "Finale"}
    ]
  },
  {
    "date": "Dimanche 27 Juillet 2025 (KUDJUKA)",
    "rencontres": [
      {"competition": "Lassa-Bas contre Lassa-Haut", "lieu": "Terrain cantonal à l'IEPP Atodo", "heure": "10H30", "observations": "Finale et clôture officielle des luttes"},
      {"competition": "Danse des Evala", "lieu": "Domicile du Père de la Nation", "heure": "", "observations": "Apothéose"}
    ]
  }
];

export default function Programme() {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-black via-black/95 to-black relative overflow-hidden" id="programme">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/images/bg-pattern.png')] opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-evala/5 via-transparent to-evala/5"></div>
      
      {/* Content Container */}
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <span className="px-6 py-2 rounded-full bg-evala/10 text-evala text-sm font-medium border border-evala/20">
              Programme Officiel
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-gilroy text-white mb-4"
          >
            Festival <span className="text-evala">Evala 2025</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Du 04 au 27 Juillet 2025 • Région de la Kara
          </motion.p>
              </div>

        {/* Programme Content */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {programme.map((jour, index) => (
                <motion.div
                  key={jour.date}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-evala/20 transition-all duration-300"
                >
                  <div
                    className="p-6 cursor-pointer group"
                    onClick={() => setSelectedDay(selectedDay === jour.date ? null : jour.date)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl md:text-2xl font-gilroy text-white group-hover:text-evala transition-colors">{jour.date}</h3>
                        <p className="text-gray-400 text-sm mt-1">{jour.rencontres.length} événements</p>
                      </div>
                      <motion.div
                        animate={{ rotate: selectedDay === jour.date ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-evala/10 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-evala"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                    </svg>
                      </motion.div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {selectedDay === jour.date && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-white/10"
                      >
                        {jour.rencontres.map((rencontre, rIndex) => (
                          <div
                            key={rIndex}
                            className="p-6 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                              <div>
                                <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                                  <Calendar className="w-4 h-4" />
                                  <span>Compétition</span>
                                </div>
                                <p className="text-white font-medium">{rencontre.competition}</p>
                              </div>
                              <div>
                                <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                                  <MapPin className="w-4 h-4" />
                                  <span>Lieu</span>
                                </div>
                                <p className="text-white">{rencontre.lieu}</p>
                              </div>
                              <div>
                                <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                                  <Clock className="w-4 h-4" />
                                  <span>Heure</span>
                </div>
                                <p className="text-white">{rencontre.heure}</p>
                  </div>
                              {rencontre.observations && (
                                <div>
                                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                                    <Info className="w-4 h-4" />
                                    <span>Observations</span>
                </div>
                                  <p className="text-evala">{rencontre.observations}</p>
              </div>
                              )}
              </div>
            </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
          </motion.div>
          </AnimatePresence>
        </div>
        </div>
      </section>
  );
} 
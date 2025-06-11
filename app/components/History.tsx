"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function History() {
  const champions = [
    {
      year: "2023",
      champion: "Koffi Sama",
      canton: "Pya",
      details: "Victoire mémorable après un combat intense de 45 minutes",
      photo: "/images/Champion-1.png" // À remplacer par la vraie photo
    },
    {
      year: "2022",
      champion: "Essowavana Pali",
      canton: "Tchitchao",
      details: "Champion pour la deuxième fois consécutive",
        photo: "/images/Champion-2.png" // À remplacer par la vraie photo
     
    },
    {
      year: "2021",
      champion: "Essowavana Pali",
      canton: "Tchitchao",
      details: "Premier titre après trois finales",
      photo: "/images/Champion-3.png"
    },
    {
      year: "2020",
      champion: "-",
      canton: "-",
      details: "Annulé en raison de la pandémie de COVID-19",
      photo: null
    },
    {
      year: "2019",
      champion: "Komlan Agbéko",
      canton: "Kouméa",
      details: "Plus jeune champion de l'histoire des Evala",
      photo: "/images/Champion-5.png"
    },
    {
      year: "2018",
      champion: "Yawo Dzidula",
      canton: "Pya",
      details: "Champion après un parcours sans défaite",
      photo: "/images/Champion-6.png"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <section id="histoire" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display mb-4 text-evala tracking-wider">
            Palmarès des Champions
          </h2>
          <div className="w-24 h-1 bg-evala mx-auto mb-8"></div>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto font-montserrat">
            L'histoire s'écrit à travers leurs victoires
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {champions.map((champion, index) => (
            <motion.div
              key={champion.year}
              variants={itemVariants}
              className={`relative pl-8 pb-12 ${
                index !== champions.length - 1 ? "border-l-2 border-evala/20" : ""
              }`}
            >
              <motion.div
                className="absolute -left-3 top-0 w-6 h-6 bg-black border-2 border-evala rounded-full"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="absolute inset-0.5 bg-evala/20 rounded-full"></div>
              </motion.div>

              <div className="bg-black/20 rounded-lg p-6 ml-6">
                <div className="flex items-start gap-6">
                  {champion.photo && (
                    <div className="flex-shrink-0">
                      <div className="w-[70px] h-[70px] relative rounded-lg overflow-hidden border-2 border-evala/50">
                        <Image
                          src={champion.photo}
                          alt={`Champion ${champion.year} - ${champion.champion}`}
                          className="object-cover"
                          height={70}
                          width={70  }
                       
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-2xl font-display text-evala">
                        {champion.year}
                      </h3>
                      <span className="text-sm text-gray-400 bg-black/40 px-3 py-1 rounded">
                        {champion.canton}
                      </span>
                    </div>
                    
                    <h4 className="text-xl text-white mb-2 font-display">
                      {champion.champion}
                    </h4>
                    
                    <p className="text-gray-400">
                      {champion.details}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="#"
            className="inline-block text-evala hover:text-evala-dark transition-colors"
          >
            Voir plus d'histoire →
          </a>
        </motion.div>
      </div>
    </section>
  );
} 
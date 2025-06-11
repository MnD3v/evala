"use client";

import { motion } from "framer-motion";

const traditions = [
  {
    title: "Spiritualité",
    description: "Les Evala sont avant tout un rituel sacré, une connexion profonde avec les ancêtres et les traditions ancestrales."
  },
  {
    title: "Initiation",
    description: "Un rite de passage essentiel pour les jeunes hommes, marquant leur entrée dans l'âge adulte et leur place dans la société."
  },
  {
    title: "Unité",
    description: "Un moment de rassemblement qui renforce les liens entre les villages et célèbre l'identité culturelle de la région."
  },
  {
    title: "Transmission",
    description: "Une tradition vivante qui perpétue les valeurs, les techniques et la sagesse des générations précédentes."
  }
];

export default function Traditions() {
  return (
    <section className="py-24 bg-black" id="traditions">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white">
            Traditions
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mt-6">
            Les piliers fondamentaux qui font des Evala une tradition unique et sacrée
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {traditions.map((tradition, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <h3 className="text-2xl md:text-3xl font-display text-evala mb-4">
                {tradition.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {tradition.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
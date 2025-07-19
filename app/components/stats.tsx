"use client";

import { motion } from "framer-motion";

const stats = [
  {
    number: "1000+",
    label: "Participants",
    description: "Lutteurs chaque année"
  },
  {
    number: "7",
    label: "Jours",
    description: "De festivités intenses"
  },
  {
    number: "50+",
    label: "Villages",
    description: "Représentés"
  },
  {
    number: "10K+",
    label: "Spectateurs",
    description: "Chaque édition"
  }
];

export default function Stats() {
  return (
    <section className="py-24 bg-black" id="stats">
      <div className="container mx-auto px-4">
        {/* Grille des statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <span className="block text-5xl md:text-6xl lg:text-7xl font-gilroy text-evala mb-2">{stat.number}</span>
              <span className="block text-xl md:text-2xl font-gilroy text-white mb-1">{stat.label}</span>
              <span className="block text-base text-gray-400">{stat.description}</span>
            </motion.div>
          ))}
        </div>

        {/* Section L'Essence des Evala */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-gilroy text-white">
            L'Essence des <span className="text-evala">Evala</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mt-8">
            Découvrez les aspects fondamentaux qui font des Evala une tradition unique et sacrée
          </p>
        </motion.div>
      </div>
    </section>
  );
} 
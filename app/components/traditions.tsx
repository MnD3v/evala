"use client";

import { motion } from "framer-motion";

const traditions = [
  {
    title: "Spiritualité Kabyè",
    description: "Le Festival Evala est avant tout un rituel sacré, une connexion profonde avec les ancêtres et les traditions ancestrales des Kabyè du Togo."
  },
  {
    title: "Rite Initiatique",
    description: "Un rite de passage essentiel pour les jeunes hommes Kabyè, marquant leur entrée dans l'âge adulte et leur place dans la société traditionnelle."
  },
  {
    title: "Unité Communautaire",
    description: "Un moment de rassemblement qui renforce les liens entre les villages Kabyè et célèbre l'identité culturelle de la région de Kozah au Togo."
  },
  {
    title: "Transmission Culturelle",
    description: "Une tradition vivante qui perpétue les valeurs, les techniques de lutte traditionnelle et la sagesse des générations précédentes des Kabyè."
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-gilroy text-white">
            Traditions du Festival Evala
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mt-6">
            Les piliers fondamentaux qui font du Festival Evala une tradition unique et sacrée des Kabyè au Togo
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
              <h3 className="text-xl md:text-2xl lg:text-3xl font-gilroy text-evala mb-4">
                {tradition.title}
              </h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                {tradition.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
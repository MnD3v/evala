"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 text-red-500">Qu'est-ce que l'Evala ?</h2>
            <p className="text-lg text-gray-300 mb-6">
              L'Evala est une lutte traditionnelle pratiquée par les Kabyè au Togo, constituant une étape cruciale dans l'initiation des jeunes hommes. Cette tradition ancestrale, plus qu'un simple sport, représente un rite de passage marquant la transition vers l'âge adulte.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              Chaque année, dans la région de la Kara au nord du Togo, les jeunes lutteurs s'affrontent dans une démonstration de force, de courage et d'habileté, sous les yeux de leur communauté. Ces combats sont accompagnés de chants, de danses et de cérémonies traditionnelles.
            </p>
            <p className="text-lg text-gray-300">
              L'Evala est bien plus qu'une compétition sportive : c'est une célébration de la culture Kabyè, un moment de transmission des valeurs et un événement qui renforce les liens communautaires.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[500px]"
          >
            <img
              src="/images/evala_illustration.png"
              alt="Lutteurs Evala en action"
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-50 rounded-lg"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

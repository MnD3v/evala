"use client";

import { motion } from "framer-motion";

export default function Schedule() {
  const events = [
    {
      day: "Jour 1",
      title: "Cérémonie d'ouverture",
      description: "Rituels d'ouverture et présentation des lutteurs",
      time: "8h00"
    },
    {
      day: "Jour 2-4",
      title: "Phases éliminatoires",
      description: "Combats de qualification entre les différents villages",
      time: "9h00"
    },
    {
      day: "Jour 5",
      title: "Demi-finales",
      description: "Affrontements entre les meilleurs lutteurs",
      time: "10h00"
    },
    {
      day: "Jour 6",
      title: "Grande Finale",
      description: "Finales et cérémonie de clôture",
      time: "15h00"
    }
  ];

  return (
    <section className="py-20 bg-gray-900" id="programme">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-title warrior-title text-5xl md:text-7xl mb-6">PROGRAMME DES COMBATS</h2>
          <p className="font-body text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Ne manquez aucun des affrontements légendaires
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.day}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-8 border border-gray-700 hover:border-red-500 transition-colors group"
            >
              <div className="font-title text-red-500 text-2xl mb-2 tracking-wider">{event.day}</div>
              <h3 className="font-subtitle text-2xl mb-3 text-white tracking-wide group-hover:text-red-500 transition-colors">
                {event.title}
              </h3>
              <p className="description-text text-gray-300 mb-4">
                {event.description}
              </p>
              <div className="font-body text-sm font-semibold text-gray-400 tracking-wider">
                Début : {event.time}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
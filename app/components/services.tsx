"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    title: "Logement",
    description: "Trouvez l'hébergement idéal pendant le festival : hôtels, gîtes, et hébergements chez l'habitant.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    href: "/logement"
  },
  {
    title: "Tourisme",
    description: "Découvrez les sites touristiques de la région : visites guidées, excursions et activités culturelles.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    href: "/tourisme"
  },
  {
    title: "Bons Plans Evala",
    description: "Les meilleures offres pour profiter du festival : packages, réductions et offres spéciales.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    href: "/bonsplans"
  }
];

export default function Services() {
  return (
    <section className="py-24 relative overflow-hidden" id="services">
      {/* Fond décoratif */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-gilroy mb-6 bg-gradient-to-r from-festival-red to-white bg-clip-text text-transparent">
            Vous souhaitez quelque chose ?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-festival-red to-white mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Découvrez nos services pour rendre votre expérience Evala inoubliable
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={service.href} className="block group">
                <div className="bg-black/40 backdrop-blur-sm border border-festival-red/20 rounded-2xl p-8 transition-all duration-300 hover:border-festival-red/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] relative overflow-hidden">
                  {/* Effet de survol */}
                  <div className="absolute inset-0 bg-gradient-to-r from-festival-red/0 via-festival-red/5 to-festival-red/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  
                  <div className="relative z-10">
                    <div className="text-festival-red mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-gilroy text-white mb-4 group-hover:text-festival-red transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

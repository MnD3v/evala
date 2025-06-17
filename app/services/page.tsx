"use client";

import { motion } from "framer-motion";
import ServiceCard from "../components/ServiceCard";

const services = [
  {
    title: "Logement",
    description: "Trouvez l'hébergement idéal pour votre séjour pendant le festival Evala. Des options pour tous les budgets.",
    imagePath: "/images/logement.jpg",
    link: "/logement"
  },
  {
    title: "Tourisme",
    description: "Découvrez les merveilles de la région de Kara et ses environs. Sites touristiques, culture et traditions.",
    imagePath: "/images/tourisme.jpg",
    link: "/tourisme"
  },
  {
    title: "Bons Plans",
    description: "Les meilleures offres et recommandations pour profiter pleinement de votre expérience Evala.",
    imagePath: "/images/bonsplans.jpg",
    link: "/bonsplans"
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-24">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 bg-gradient-to-r from-festival-red to-white bg-clip-text font-gilroy text-4xl text-transparent md:text-5xl">
            Nos Services
          </h2>
          <div className="mx-auto mb-6 h-1 w-24 bg-gradient-to-r from-festival-red to-white"></div>
          <p className="mx-auto max-w-2xl text-gray-400">
            Découvrez nos services pour rendre votre expérience Evala inoubliable
          </p>
        </motion.div>

        {/* Grille des services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 
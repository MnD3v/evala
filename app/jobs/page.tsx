"use client";

import { motion } from "framer-motion";
import JobRegistration from "../components/JobRegistration";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import GradientBackground from "../components/GradientBackground";

interface JobOffer {
  title: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
  status: "open" | "closed";
}

const jobOffers: JobOffer[] = [];

export default function JobsPage() {
  return (
    <div className="flex min-h-screen flex-col text-white font-poppins relative">
      {/* Fond avec gradient */}
      <GradientBackground />

      {/* Contenu principal */}
      <div className="relative z-10">
        <Navbar />
        
        <main>
          {/* En-tête de la page avec effet parallaxe */}
          <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
            {/* Image de fond avec overlay */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-black/60 z-10"></div>
              <div className="absolute inset-0 bg-[url('/images/evala-hero.jpg')] bg-cover bg-center bg-fixed"></div>
            </div>

            {/* Cercles décoratifs */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-festival-red/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-festival-yellow/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

            {/* Contenu de l'en-tête */}
            <div className="container mx-auto px-4 relative z-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <motion.h1 
                  className="text-5xl md:text-7xl font-gilroy mb-6 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red bg-clip-text text-transparent"
                  animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  Emplois Festival Evala
                </motion.h1>
                <motion.div 
                  className="w-24 h-1 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red mx-auto mb-8"
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Saisissez l'opportunité de faire partie du plus grand festival de lutte traditionnelle au Togo et vivez une expérience professionnelle unique au cœur de notre culture.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Liste des offres d'emploi */}
          {jobOffers.length > 0 && (
            <section className="py-24 relative overflow-hidden">
              {/* Fond décoratif */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-festival-red/5 via-transparent to-transparent"></div>
              </div>

              <div className="container mx-auto px-4 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl font-poppins text-white mb-4">
                    Offres Disponibles
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red mx-auto"></div>
                </motion.div>

                <div className="grid gap-8 max-w-4xl mx-auto">
                  {jobOffers.map((job, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-black/40 backdrop-blur-sm border border-festival-red/20 rounded-xl p-8 hover:border-festival-red/40 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-poppins text-white mb-2">{job.title}</h3>
                          <div className="flex gap-4 text-sm text-gray-400">
                            <span>{job.type}</span>
                            <span>•</span>
                            <span>{job.location}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          job.status === "open" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                        }`}>
                          {job.status === "open" ? "Ouvert" : "Fermé"}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-4">{job.description}</p>
                      <div className="space-y-2">
                        <h4 className="text-white font-semibold">Prérequis :</h4>
                        <ul className="list-disc list-inside text-gray-400 space-y-1">
                          {job.requirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Section d'inscription avec Google Form */}
          <JobRegistration />
        </main>

        <Footer />
      </div>
    </div>
  );
} 
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface JobOffer {
  title: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
  status: "open" | "closed";
}

const jobOffers: JobOffer[] = [
  {
    title: "Photographe Festival Evala",
    type: "Temporaire",
    location: "Région de Kozah, Togo",
    description: "Nous recherchons un photographe passionné pour capturer les moments forts du Festival Evala. Le candidat idéal doit avoir une expérience en photographie d'événements culturels.",
    requirements: [
      "Expérience en photographie d'événements",
      "Matériel photographique professionnel",
      "Disponibilité pendant toute la durée du festival",
      "Sensibilité à la culture Kabyè"
    ],
    status: "open"
  }
];

export default function JobsPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Intégrer avec Sanity pour sauvegarder les candidatures
    console.log("Formulaire soumis:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="min-h-screen bg-black">
      {/* En-tête de la page */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6">
              Emplois Festival Evala
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Rejoignez l'équipe du plus grand festival de lutte traditionnelle au Togo et contribuez à la préservation de notre patrimoine culturel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Liste des offres d'emploi */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display text-white mb-12 text-center">Offres Disponibles</h2>
          <div className="grid gap-8 max-w-4xl mx-auto">
            {jobOffers.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 border border-evala/20 rounded-xl p-6 hover:border-evala/40 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-display text-white mb-2">{job.title}</h3>
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

      {/* Formulaire d'inscription */}
      <section className="py-16 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-display text-white mb-4">
                Rejoindre Notre Base de Données
              </h2>
              <p className="text-gray-400">
                Inscrivez-vous dans notre base de données pour être informé des futures opportunités du Festival Evala.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-400 mb-2">
                    Nom Complet
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-evala focus:border-transparent text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-evala focus:border-transparent text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-evala focus:border-transparent text-white"
                />
              </div>

              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-400 mb-2">
                  Compétences
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-evala focus:border-transparent text-white"
                  placeholder="Ex: Photographie, Vidéo, Communication..."
                />
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-400 mb-2">
                  Expérience
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-evala focus:border-transparent text-white"
                  placeholder="Ex: 3 ans en photographie événementielle..."
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Message (Optionnel)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-evala focus:border-transparent text-white resize-none"
                  placeholder="Parlez-nous de votre motivation..."
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-evala rounded-lg hover:bg-evala/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-evala transition-all duration-300"
                >
                  Soumettre ma Candidature
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>
    </main>
  );
} 
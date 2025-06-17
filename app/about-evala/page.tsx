"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import GradientBackground from "../components/GradientBackground";

export default function AboutEvalaPage() {
  return (
    <div className="flex min-h-screen flex-col text-white font-poppins relative">
      <GradientBackground />
      <Navbar />
      
      <main className="flex-grow">
        {/* En-tête avec effet parallaxe */}
        <div className="relative h-[40vh] overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/evala-hero.jpg')] bg-cover bg-center bg-no-repeat"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-5xl md:text-7xl font-gilroy text-center bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red bg-clip-text text-transparent">
              L'Histoire des Evala
            </h1>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Introduction */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="prose prose-lg prose-invert max-w-none"
            >
              <h2 className="text-3xl font-gilroy text-festival-red mb-6">Une Tradition Millénaire</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Les Évala sont des rites initiatiques ancestraux pratiqués en pays Kabyè, dans la région de Kara, au nord du Togo. 
                Ces cérémonies, marquées principalement par la lutte traditionnelle, représentent le passage sacré à l'âge adulte 
                pour les jeunes hommes de 18 à 20 ans.
              </p>
              <p className="text-xl text-gray-300 leading-relaxed">
                Le terme "Évalou" (singulier d'Évala) désigne le jeune initié qui entreprend ce voyage spirituel et physique. 
                Cette tradition se déroule chaque année au mois de juillet dans la préfecture de la Kozah, à 423 km au nord de Lomé.
              </p>
            </motion.section>

            {/* Origines */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="prose prose-lg prose-invert max-w-none"
            >
              <h2 className="text-3xl font-gilroy text-festival-red mb-6">Les Origines Historiques</h2>
              <p className="text-gray-300">
                L'histoire des Evala remonte au XIIIe siècle, avec le légendaire combat entre Tchablime du village de Kpédaw et 
                Fawokézié de Kolidè. Cette lutte historique, opposant deux lutteurs aux styles très différents, a donné naissance 
                aux compétitions inter-villages qui perdurent jusqu'à aujourd'hui.
              </p>
              <p className="text-gray-300">
                Cette tradition s'est transmise de génération en génération, devenant un pilier de l'identité culturelle Kabyè. 
                Les techniques de lutte, les rituels et les cérémonies ont été préservés avec une grande fidélité, témoignant 
                de l'importance de cet héritage culturel.
              </p>
            </motion.section>

            {/* Signification Spirituelle */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="prose prose-lg prose-invert max-w-none"
            >
              <h2 className="text-3xl font-gilroy text-festival-red mb-6">La Dimension Spirituelle</h2>
              <p className="text-gray-300">
                Evala représente bien plus qu'une simple compétition sportive. C'est la première étape cruciale dans l'initiation 
                à la vie d'homme de l'adolescent Kabiyé. Les jeunes sont préparés psychologiquement et physiquement pour cette 
                épreuve qui forge leur caractère, développant l'endurance, le courage et le stoïcisme.
              </p>
              <p className="text-gray-300">
                L'aspect culturel est renforcé par des sacrifices personnels significatifs : jeûne, abstinence et scarifications, 
                qui sont les signes extérieurs du guerrier. La participation est considérée comme obligatoire dans la société Kabyè, 
                sous peine d'exclusion sociale.
              </p>
            </motion.section>

            {/* Préparation et Rituels */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="prose prose-lg prose-invert max-w-none"
            >
              <h2 className="text-3xl font-gilroy text-festival-red mb-6">Préparation et Rituels</h2>
              <p className="text-gray-300">
                Avant les combats, les jeunes lutteurs suivent une préparation rigoureuse qui combine entraînement physique 
                et spirituel. Cette période inclut des rituels de purification, des prières aux ancêtres et l'apprentissage 
                des techniques de lutte traditionnelles.
              </p>
              <p className="text-gray-300">
                Les cérémonies sont supervisées par les sages de la communauté, qui veillent au respect des règlements 
                et assurent l'arbitrage. Les dates sont fixées après consultation des oracles et l'autorisation du 
                grand prêtre "Tchodjo", gardien des traditions.
              </p>
            </motion.section>

            {/* Déroulement des Cérémonies */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="prose prose-lg prose-invert max-w-none"
            >
              <h2 className="text-3xl font-gilroy text-festival-red mb-6">Le Festival Culturel</h2>
              <p className="text-gray-300">
                Les Evala se déroulent sur une période de huit jours, du deuxième au troisième samedi de juillet. 
                Chaque canton organise ses propres cérémonies, créant une atmosphère festive qui englobe toute la région.
              </p>
              <p className="text-gray-300">
                Au-delà des luttes, l'événement s'accompagne d'un riche programme culturel : soirées traditionnelles, 
                concerts, chants, danses et contes, transformant la ville de Kara et ses environs en un véritable 
                festival de la culture Kabyè.
              </p>
              <p className="text-gray-300">
                Les prêtres traditionnels effectuent une tournée dans les lieux sacrés pour remercier les ancêtres 
                d'avoir permis la cérémonie, maintenant ainsi le lien entre le monde des vivants et celui des esprits.
              </p>
            </motion.section>

            {/* Importance Contemporaine */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="prose prose-lg prose-invert max-w-none"
            >
              <h2 className="text-3xl font-gilroy text-festival-red mb-6">L'Héritage Moderne</h2>
              <p className="text-gray-300">
                Aujourd'hui, les Evala sont devenus un événement majeur qui attire des visiteurs du monde entier, 
                contribuant au développement touristique et économique de la région. Tout en préservant leur essence 
                traditionnelle, les cérémonies s'adaptent aux temps modernes, créant un pont unique entre passé et présent.
              </p>
              <p className="text-gray-300">
                Cette tradition continue de jouer un rôle crucial dans la préservation de l'identité culturelle Kabyè, 
                transmettant aux nouvelles générations les valeurs de courage, de respect et d'appartenance communautaire.
              </p>
            </motion.section>
          </div>

          {/* Bouton de retour */}
          <div className="text-center mt-16">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-festival-red rounded-full text-white font-medium transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 
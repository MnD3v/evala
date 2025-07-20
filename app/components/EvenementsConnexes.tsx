"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, MapPin, Users, Ticket } from "lucide-react";
import { useState, useEffect } from "react";

// Composant pour gérer les images avec fallback
const ImageWithFallback = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (imageError || !src) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-evala/20 to-yellow-500/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-evala/20 rounded-full flex items-center justify-center mb-4 mx-auto">
            <Calendar className="w-8 h-8 text-evala" />
          </div>
          <p className="text-white/80 text-sm">Image à venir</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-evala/20 to-yellow-500/20 flex items-center justify-center z-20">
          <div className="w-8 h-8 border-2 border-evala border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className || ''}`}
        onError={handleError}
        onLoad={handleLoad}
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={false}
        unoptimized={true}
      />
    </div>
  );
};

const evenements = [
  {
    id: 1,
    nom: "Foire des Evala",
    description: "Un événement majeur célébrant la tradition de la lutte Evala avec des compétitions, des expositions culturelles et des spectacles traditionnels.",
    date: "15-20 Juillet 2024",
    lieu: "Kara, Togo",
    participants: "500+ lutteurs",
    image: "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2FChatGPT%20Image%2019%20juil.%202025%2C%2007_16_38.png?alt=media&token=596c16c3-5038-4b86-b2a5-2ef62a7fe245",
    highlights: [
      "Compétitions de lutte traditionnelle",
      "Expositions d'artisanat local",
      "Spectacles de danse traditionnelle",
      "Marché des produits locaux"
    ]
  },
  {
    id: 2,
    nom: "Festival de Dèdè Evala Africa",
    description: "Festival international célébrant la lutte Evala et la culture africaine, rassemblant des lutteurs de toute l'Afrique de l'Ouest.",
    date: "10-15 Août 2024",
    lieu: "Lomé, Togo",
    participants: "1000+ participants",
    image: "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2Fferevalaa.png?alt=media&token=c0a13b1d-d5ca-4a22-8e80-e9e1bf8058ef",
    highlights: [
      "Tournoi international de lutte",
      "Conférences sur la culture africaine",
      "Concerts de musique traditionnelle",
      "Ateliers de formation pour jeunes"
    ]
  },
  {
    id: 3,
    nom: "Miss Evala",
    description: "Concours de beauté célébrant la femme togolaise et la culture Evala, mettant en valeur l'élégance, l'intelligence et l'attachement aux traditions.",
    date: "5-10 Septembre 2024",
    lieu: "Kara, Togo",
    participants: "30+ candidates",
    image: "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2Fmiss.jpeg?alt=media&token=e0b84eb0-ddd3-4cc2-93e6-a794f8da3015",
    highlights: [
      "Défilé en tenues traditionnelles",
      "Épreuves de culture générale",
      "Présentation des traditions Evala",
      "Gala de couronnement"
    ]
  },
  {
    id: 4,
    nom: "Art & Evala : L'Exposition",
    description: "Une exposition artistique unique mettant en lumière la richesse culturelle de la lutte Evala à travers différentes formes d'art contemporain et traditionnel.",
    date: "1-30 Août 2024",
    lieu: "Musée National, Lomé",
    participants: "25+ artistes",
    image: "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2Fc7472002-1a27-4207-8a5f-0b20fed52360.jpg?alt=media&token=54ab3ec4-dbae-4b6f-87bc-20daf9778662",
    highlights: [
      "Peintures et sculptures contemporaines",
      "Installations artistiques immersives",
      "Art traditionnel Kabyè",
      "Performances artistiques live"
    ]
  }
];

export default function EvenementsConnexes() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Rendu côté serveur sans animations
  if (!mounted) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-b from-black/50 to-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {/* En-tête de section */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-evala via-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Événements Connexes
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-evala to-yellow-500 rounded-full mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Découvrez les grands événements qui célèbrent la tradition de la lutte Evala 
              et la richesse culturelle togolaise à travers l'année.
            </p>
          </div>

          {/* Grille des événements */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {evenements.map((evenement) => (
              <div key={evenement.id} className="group">
                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 hover:border-evala/30 transition-all duration-500 hover:shadow-2xl hover:shadow-evala/20">
                  {/* Image de l'événement */}
                  <div className="relative mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-evala/20 to-yellow-500/20 aspect-video">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                    <ImageWithFallback
                      src={evenement.image}
                      alt={evenement.nom}
                    />
                  </div>

                  {/* Contenu de l'événement */}
                  <div className="space-y-4">
                    {/* Titre */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-evala transition-colors duration-300">
                      {evenement.nom}
                    </h3>

                    {/* Informations principales */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Calendar className="w-4 h-4 text-evala" />
                        <span>{evenement.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-300">
                        <MapPin className="w-4 h-4 text-yellow-500" />
                        <span>{evenement.lieu}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Users className="w-4 h-4 text-orange-500" />
                        <span>{evenement.participants}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed">
                      {evenement.description}
                    </p>

                    {/* Points forts */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-evala flex items-center">
                        <Ticket className="w-5 h-5 mr-2" />
                        Points forts
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {evenement.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-evala to-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-300 text-sm">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bouton d'action */}
              
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section d'appel à l'action */}
          <div className="text-center mt-16 md:mt-20">
            <div className="bg-gradient-to-r from-evala/10 to-yellow-500/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Rejoignez la Célébration !
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Ne manquez pas ces événements exceptionnels qui perpétuent la tradition 
                de la lutte Evala et célèbrent notre patrimoine culturel.
              </p>
           
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Rendu côté client avec animations
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-black/50 to-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-evala via-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Événements Connexes
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-evala to-yellow-500 rounded-full mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Découvrez les grands événements qui célèbrent la tradition de la lutte Evala 
            et la richesse culturelle togolaise à travers l'année.
          </p>
        </motion.div>

        {/* Grille des événements */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {evenements.map((evenement, index) => (
            <motion.div
              key={evenement.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 hover:border-evala/30 transition-all duration-500 hover:shadow-2xl hover:shadow-evala/20">
                {/* Image de l'événement */}
                <div className="relative mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-evala/20 to-yellow-500/20 aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                  <ImageWithFallback
                    src={evenement.image}
                    alt={evenement.nom}
                  />
                </div>

                {/* Contenu de l'événement */}
                <div className="space-y-4">
                  {/* Titre */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-evala transition-colors duration-300">
                    {evenement.nom}
                  </h3>

                  {/* Informations principales */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Calendar className="w-4 h-4 text-evala" />
                      <span>{evenement.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <MapPin className="w-4 h-4 text-yellow-500" />
                      <span>{evenement.lieu}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Users className="w-4 h-4 text-orange-500" />
                      <span>{evenement.participants}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed">
                    {evenement.description}
                  </p>

                  {/* Points forts */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-evala flex items-center">
                      <Ticket className="w-5 h-5 mr-2" />
                      Points forts
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {evenement.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-gradient-to-r from-evala to-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-300 text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Section d'appel à l'action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16 md:mt-20"
        >
          <div className="bg-gradient-to-r from-evala/10 to-yellow-500/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Rejoignez la Célébration !
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Ne manquez pas ces événements exceptionnels qui perpétuent la tradition 
              de la lutte Evala et célèbrent notre patrimoine culturel.
            </p>
      
          </div>
        </motion.div>
      </div>
    </section>
  );
}
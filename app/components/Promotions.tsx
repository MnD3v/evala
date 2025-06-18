"use client"

import { motion } from 'framer-motion';
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const PROMOTIONS_QUERY = `*[
  _type == "promotion" && 
  defined(slug.current) && 
  publishedAt != null && 
  isActive == true &&
  dateTime(now()) >= dateTime(startDate) &&
  dateTime(now()) <= dateTime(endDate)
]|order(publishedAt desc)[0...6]{
  _id,
  title,
  slug,
  startDate,
  endDate,
  mainImage{
    asset->{url}
  },
  author->{
    name
  },
  publishedAt,
  body
}`;

export default function Promotions() {
  const [promotions, setPromotions] = useState<SanityDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPromotions, setTotalPromotions] = useState(0);

  useEffect(() => {
    // Requête pour les promotions affichées
    client.fetch(PROMOTIONS_QUERY)
      .then((data) => {
        setPromotions(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des promotions :", error);
        setIsLoading(false);
      });

    // Requête pour compter le total des promotions
    client.fetch(`count(*[
      _type == "promotion" && 
      defined(slug.current) && 
      publishedAt != null && 
      isActive == true &&
      dateTime(now()) >= dateTime(startDate) &&
      dateTime(now()) <= dateTime(endDate)
    ])`)
      .then((total) => {
        setTotalPromotions(total);
      })
      .catch((error) => {
        console.error("Erreur lors du comptage des promotions :", error);
      });
  }, []);

  if (promotions.length === 0 && !isLoading) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-24" id="promotions">
      {/* Fond avec effets avancés */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-festival-red/5 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-festival-red/20 via-transparent to-transparent opacity-40"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        {/* En-tête de section avec animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-6">
          
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-gilroy font-bold relative">
              <span className="font-gilroy">
                Promotions en Cours
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
            </h2>
       
          </div>
          <div className="relative mx-auto mb-4 md:mb-6 h-px w-20 md:w-24 overflow-hidden rounded-full bg-white">
          
          </div>
          <p className="mx-auto max-w-2xl text-gray-400 text-base md:text-lg">
            Découvrez nos offres spéciales et événements du moment
          </p>
        </motion.div>

        {/* Grille des promotions avec effet de masonry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000 max-w-6xl mx-auto">
          {promotions.map((promo, index) => (
            <motion.div
              key={promo._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative w-full max-w-[320px] mx-auto"
            >
              <Link href={`/promotions/${promo.slug.current}`}>
                <div className="relative">
                  {/* Carte principale avec effet subtil */}
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                    className="relative flex h-[320px] transform-gpu flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black p-5 transition-all duration-300 border border-white/5 shadow-lg"
                  >
                    {/* Image de fond avec effets */}
                    <div className="absolute inset-0 z-0">
                      {promo.mainImage?.asset?.url ? (
                        <>
                          <Image
                            src={promo.mainImage.asset.url}
                            alt={promo.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105 brightness-75"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                        </>
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-festival-red/50 to-black"></div>
                      )}
                    </div>

                    {/* Contenu */}
                    <div className="relative z-10 flex h-full flex-col justify-between">
                      {/* Badge de date */}
                      <div className="relative">
                        <div className="inline-flex items-center gap-2 rounded-full bg-black/40 px-2.5 md:px-3 py-1 md:py-1.5 backdrop-blur-sm border border-white/10">
                          <span className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-festival-red"></span>
                          <span className="text-[10px] md:text-xs font-medium text-white">
                            {format(new Date(promo.startDate), 'dd MMMM yyyy', { locale: fr })}
                          </span>
                        </div>
                      </div>

                      {/* Contenu principal */}
                      <div className="space-y-3 md:space-y-4">
                        {/* Titre */}
                        <div className="relative">
                          <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-festival-red transition-colors duration-300 line-clamp-2">
                            {promo.title}
                          </h3>
                          <div className="mt-2 h-0.5 w-10 md:w-12 bg-festival-red/50 group-hover:bg-festival-red transition-colors duration-300"></div>
                        </div>

                        {/* Bouton */}
                        <div className="flex items-center justify-between rounded-full bg-black/40 p-2.5 md:p-3 backdrop-blur-sm border border-white/5 group-hover:border-festival-red/20 transition-colors duration-300">
                          <span className="text-xs md:text-sm text-white/90 font-medium">Voir l'offre</span>
                          <div className="h-4 w-4 md:h-5 md:w-5 rounded-full bg-festival-red/10 p-1">
                            <svg
                              className="h-full w-full text-festival-red transform transition-transform duration-300 group-hover:translate-x-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bouton "Voir toutes les promotions" simplifié */}
        {totalPromotions > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link href="/promotions" className="inline-block">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 md:gap-3 rounded-full border border-festival-red bg-black/40 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold text-festival-red transition-all duration-300 hover:bg-festival-red/5"
              >
                <span>Voir les {totalPromotions - 6} autres promotions</span>
                <svg
                  className="h-4 w-4 md:h-5 md:w-5 transform transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
} 
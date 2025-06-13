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
      {/* Fond avec effet de lueur */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-festival-red/5 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-festival-red/20 via-transparent to-transparent opacity-40"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 bg-gradient-to-r from-festival-red to-white bg-clip-text font-display text-4xl text-transparent md:text-5xl">
            Promotions en Cours
          </h2>
          <div className="mx-auto mb-6 h-1 w-24 bg-gradient-to-r from-festival-red to-white"></div>
          <p className="mx-auto max-w-2xl text-gray-400">
            Découvrez nos offres spéciales et événements du moment
          </p>
        </motion.div>

        {/* Grille des promotions */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {promotions.map((promo, index) => (
            <motion.div
              key={promo._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <Link href={`/promotions/${promo.slug.current}`}>
                <div className="group relative">
                  {/* Carte principale */}
                  <div className="relative flex h-[400px] transform-gpu flex-col overflow-hidden rounded-[40px] bg-gradient-to-br from-black to-gray-900 p-6 transition-all duration-500 hover:scale-[1.02]">
                    {/* Image de fond avec effet parallaxe */}
                    <div className="absolute inset-0 z-0">
                      {promo.mainImage?.asset?.url ? (
                        <>
                          <Image
                            src={promo.mainImage.asset.url}
                            alt={promo.title}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-125"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                        </>
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-festival-red to-black opacity-50"></div>
                      )}
                    </div>

                    {/* Contenu */}
                    <div className="relative z-10 flex h-full flex-col justify-between">
                      {/* En-tête */}
                      <div>
                        {/* Badge de date flottant */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-festival-red/30 bg-black/30 px-4 py-2 backdrop-blur-md">
                          <span className="h-2 w-2 animate-pulse rounded-full bg-festival-red"></span>
                          <span className="text-sm font-medium text-white">
                            {format(new Date(promo.startDate), 'dd MMMM yyyy', { locale: fr })}
                          </span>
                        </div>
                      </div>

                      {/* Pied de carte */}
                      <div className="space-y-6">
                        {/* Titre avec effet de soulignement */}
                        <div className="relative">
                          <h3 className="text-3xl font-bold text-white">
                            {promo.title}
                          </h3>
                          <div className="mt-2 h-1 w-12 bg-festival-red transition-all duration-300 group-hover:w-full"></div>
                        </div>

                        {/* Informations et bouton */}
                        <div className="flex items-center justify-between">
                          {/* Auteur avec avatar */}
                          {promo.author && (
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-festival-red/20 backdrop-blur-sm">
                                <svg className="h-5 w-5 text-festival-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium text-gray-300">{promo.author.name}</span>
                            </div>
                          )}

                          {/* Bouton avec effet de glissement */}
                          <div className="relative overflow-hidden rounded-full bg-festival-red p-3 transition-transform duration-300 group-hover:scale-105">
                            <svg
                              className="h-6 w-6 transform text-white transition-transform duration-300 group-hover:translate-x-1"
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
                            <div className="absolute inset-0 -translate-x-full transform bg-white opacity-20 transition-transform duration-300 group-hover:translate-x-0"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Effet de brillance au survol */}
                    <div className="pointer-events-none absolute -inset-px rounded-[40px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute inset-0 bg-gradient-to-t from-festival-red/20 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bouton "Voir toutes les promotions" */}
        {totalPromotions > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link href="/promotions" className="inline-block">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center space-x-2 rounded-full border-2 border-festival-red bg-black px-8 py-4 font-semibold text-festival-red transition-all duration-300 hover:bg-gray-900 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              >
                <span>Voir les {totalPromotions - 6} autres promotions</span>
                <svg
                  className="h-5 w-5"
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
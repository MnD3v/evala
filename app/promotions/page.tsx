"use client"
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { useEffect, useState } from "react";
import PromotionCard from "@/app/components/PromotionCard";
import { motion } from "framer-motion";

const PROMOTIONS_QUERY = `*[
  _type == "promotion" && 
  defined(slug.current) && 
  publishedAt != null && 
  isActive == true &&
  dateTime(now()) >= dateTime(startDate) &&
  dateTime(now()) <= dateTime(endDate)
]|order(publishedAt desc){
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
  publishedAt
}`;

const options = { next: { revalidate: 30 } };

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Promotions() {
  const [promotions, setPromotions] = useState<SanityDocument[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    client.fetch<SanityDocument[]>(PROMOTIONS_QUERY, {}, options)
      .then((data) => {
        setPromotions(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des promotions :", error);
        setError(error instanceof Error ? error.message : "Une erreur est survenue lors du chargement des promotions.");
        setIsLoading(false);
      });
  }, []);

  const displayedPromotions = showAll ? promotions : promotions.slice(0, 6);
  const hasMorePromotions = promotions.length > 6;

  return (
    <section className="font-poppins min-h-screen bg-black py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold text-white mb-4"
          >
            Nos Promotions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Découvrez nos offres spéciales et événements
          </motion.p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-6">Une erreur est survenue lors du chargement des promotions.</p>
            <button
              onClick={() => {
                setError(null);
                setIsLoading(true);
                client.fetch<SanityDocument[]>(PROMOTIONS_QUERY, {}, options)
                  .then((data) => {
                    setPromotions(data);
                    setIsLoading(false);
                  })
                  .catch((error) => {
                    console.error("Erreur lors du chargement des promotions :", error);
                    setError(error instanceof Error ? error.message : "Une erreur est survenue lors du chargement des promotions.");
                    setIsLoading(false);
                  });
              }}
              className="bg-black hover:bg-gray-900 text-red-500 font-semibold py-4 px-8 rounded-full border-2 border-red-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] inline-flex items-center space-x-2"
            >
              <span>Réessayer</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        ) : promotions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Aucune promotion disponible pour le moment.</p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {displayedPromotions.map((promotion) => (
              <PromotionCard key={promotion._id} promotion={promotion} />
            ))}
          </motion.div>
        )}

        {/* Load More Button */}
        {hasMorePromotions && !isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-black hover:bg-gray-900 text-red-500 font-semibold py-4 px-8 rounded-full border-2 border-red-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] inline-flex items-center space-x-2"
            >
              <span>{showAll ? "Voir moins de promotions" : "Charger plus de promotions"}</span>
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
} 
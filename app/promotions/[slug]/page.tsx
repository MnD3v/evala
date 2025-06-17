"use client"

import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import { use } from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import GradientBackground from "@/app/components/GradientBackground";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const PROMOTION_QUERY = `*[_type == "promotion" && slug.current == $slug][0]{
  _id,
  title,
  body,
  mainImage{
    asset->{url}
  },
  author->{
    name,
    image{
      asset->{url}
    }
  },
  startDate,
  endDate,
  publishedAt
}`;

export default function PromotionPage({ params }: Props) {
  const { slug } = use(params);
  const [promotion, setPromotion] = useState<SanityDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    client
      .fetch(PROMOTION_QUERY, { slug })
      .then((data) => {
        setPromotion(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching promotion:", err);
        setError("Une erreur est survenue lors du chargement de la promotion.");
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error || !promotion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
        <h1 className="text-2xl font-bold mb-4">
          {error || "Promotion non trouvée"}
        </h1>
        <button
          onClick={() => window.history.back()}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-colors"
        >
          Retour
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col font-poppins relative">
      <GradientBackground />
      <div className="relative z-10">
        <Navbar />
        <article className="font-poppins min-h-screen bg-black py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {promotion.title}
                </h1>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-400">
                  {promotion.author && (
                    <div className="flex items-center gap-2">
                      {promotion.author.image?.asset?.url && (
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={promotion.author.image.asset.url}
                            alt={promotion.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <span>{promotion.author.name}</span>
                    </div>
                  )}
                  <span className="hidden md:block">•</span>
                  <div className="flex flex-col md:flex-row items-center gap-2">
                    <span>
                      Du {format(new Date(promotion.startDate), 'dd MMMM yyyy', { locale: fr })}
                    </span>
                    <span>au</span>
                    <span>
                      {format(new Date(promotion.endDate), 'dd MMMM yyyy', { locale: fr })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Image */}
              {promotion.mainImage?.asset?.url && (
                <div className="relative w-full h-[400px] mb-12 rounded-xl overflow-hidden">
                  <Image
                    src={promotion.mainImage.asset.url}
                    alt={promotion.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Content */}
              <div className="prose prose-lg prose-invert max-w-none">
                <PortableText value={promotion.body} />
              </div>

              {/* Back Button */}
              <div className="mt-12 text-center">
                <button
                  onClick={() => window.history.back()}
                  className="bg-black hover:bg-gray-900 text-red-500 font-semibold py-4 px-8 rounded-full border-2 border-red-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] inline-flex items-center space-x-2"
                >
                  <svg
                    className="w-5 h-5 rotate-180"
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
                  <span>Retour aux promotions</span>
                </button>
              </div>
            </motion.div>
          </div>
        </article>
        <Footer />
      </div>
    </div>
  );
} 
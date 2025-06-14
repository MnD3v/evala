import { type SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface PromotionCardProps {
  promotion: SanityDocument;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function PromotionCard({ promotion }: PromotionCardProps) {
  return (
    <motion.div variants={item}>
      <Link href={`/promotions/${promotion.slug.current}`} className="block w-full max-w-[270px]">
        <div className="group relative">
          {/* Carte principale */}
          <div className="relative flex h-[300px] transform-gpu flex-col overflow-hidden rounded-[40px] bg-gradient-to-br from-black to-gray-900 p-3 transition-all duration-500 hover:scale-[1.02]">
            {/* Image de fond avec effet parallaxe */}
            <div className="absolute inset-0 z-0">
              {promotion.mainImage?.asset?.url ? (
                <>
                  <Image
                    src={promotion.mainImage.asset.url}
                    alt={promotion.title}
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
                    {format(new Date(promotion.startDate), 'dd MMMM yyyy', { locale: fr })}
                  </span>
                </div>
              </div>

              {/* Pied de carte */}
              <div className="space-y-6">
                {/* Titre avec effet de soulignement */}
                <div className="relative">
                  <h3 className="text-lg font-bold text-white line-clamp-2">
                    {promotion.title}
                  </h3>
                  <div className="mt-2 h-0.5 w-8 bg-festival-red transition-all duration-300 group-hover:w-full"></div>
                </div>

                {/* Informations et bouton */}
                <div className="flex items-center justify-end">
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
  );
} 
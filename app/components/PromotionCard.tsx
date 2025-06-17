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
        <div className="group relative perspective-1000">
          {/* Carte principale avec effet 3D */}
          <motion.div 
            whileHover={{ 
              rotateX: 5,
              rotateY: 5,
              scale: 1.05,
              transition: { duration: 0.4 }
            }}
            className="relative flex h-[300px] transform-gpu flex-col overflow-hidden rounded-[30px] bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 transition-all duration-500 preserve-3d shadow-[0_0_15px_rgba(0,0,0,0.6)] border border-white/5"
          >
            {/* Image de fond avec effet parallaxe et grain */}
            <div className="absolute inset-0 z-0">
              {promotion.mainImage?.asset?.url ? (
                <>
                  <Image
                    src={promotion.mainImage.asset.url}
                    alt={promotion.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-125 filter brightness-75"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent mix-blend-overlay"></div>
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-overlay"></div>
                </>
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-festival-red to-black opacity-50"></div>
              )}
            </div>

            {/* Contenu avec effet de profondeur */}
            <div className="relative z-10 flex h-full flex-col justify-between transform-gpu translate-z-20">
              {/* En-tête avec badge flottant */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-festival-red/20 to-white/5 px-4 py-2 backdrop-blur-xl border border-white/10 shadow-lg">
                  <span className="h-2 w-2 animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-festival-red to-red-400"></span>
                  <span className="text-sm font-medium text-white">
                    {format(new Date(promotion.startDate), 'dd MMMM yyyy', { locale: fr })}
                  </span>
                </div>
              </div>

              {/* Pied de carte avec effets de survol */}
              <div className="space-y-6">
                {/* Titre avec effet de soulignement animé */}
                <div className="relative">
                  <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 line-clamp-2 group-hover:from-festival-red group-hover:to-red-300 transition-all duration-500">
                    {promotion.title}
                  </h3>
                  <div className="relative h-0.5 w-12 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-festival-red via-red-400 to-festival-red group-hover:animate-[shimmer_2s_linear_infinite] transition-all duration-500"></div>
                  </div>
                </div>

                {/* Bouton avec effet de glissement et brillance */}
                <div className="relative overflow-hidden rounded-full bg-gradient-to-r from-festival-red to-red-600 p-3 transition-all duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  <div className="relative flex items-center justify-between">
                    <span className="text-white font-medium">Voir l'offre</span>
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
                  </div>
                </div>
              </div>
            </div>

            {/* Effets de brillance et de bordure au survol */}
            <div className="pointer-events-none absolute -inset-px rounded-[30px] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-festival-red/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100"></div>
              <div className="absolute inset-0 rounded-[30px] bg-gradient-to-r from-festival-red/0 via-festival-red/40 to-festival-red/0 opacity-0 group-hover:opacity-100 blur"></div>
            </div>
          </motion.div>

          {/* Ombre portée avec effet de flou */}
          <div className="absolute -inset-4 bg-festival-red/20 rounded-[40px] blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-30"></div>
        </div>
      </Link>
    </motion.div>
  );
} 
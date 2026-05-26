"use client"

import { motion } from 'framer-motion';
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowRight, Tag } from "lucide-react";

const PROMOTIONS_QUERY = `*[
  _type == "promotion" &&
  defined(slug.current) &&
  isActive == true
]|order(_createdAt desc)[0...6]{
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
  const [isLoading, setIsLoading]   = useState(true);
  const [total, setTotal]           = useState(0);

  useEffect(() => {
    client.fetch(PROMOTIONS_QUERY)
      .then((data) => { setPromotions(data); setIsLoading(false); })
      .catch(() => setIsLoading(false));

    client.fetch(`count(*[_type == "promotion" && defined(slug.current) && isActive == true])`)
      .then(setTotal)
      .catch(() => {});
  }, []);


  return (
    <section id="promotions" className="relative overflow-hidden bg-gray-50 py-24 md:py-32">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(255,205,0,0.07),transparent)] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 md:px-8 max-w-6xl">

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-14"
        >
          <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "#006A4E" }}>
            Offres & Deals
          </p>
          <h2 className="text-4xl md:text-5xl font-fjalla font-bold text-black leading-tight mb-4">
            Promotions <em className="not-italic" style={{ color: "#006A4E" }}>en cours</em>
          </h2>
          <p className="text-black/60 text-base max-w-lg leading-relaxed">
            Offres spéciales, réductions et événements à saisir autour du festival Evala.
          </p>
        </motion.div>

        {/* Séparateur tricolore */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-center gap-0 mb-12 origin-left overflow-hidden rounded-full"
          style={{ height: "2px" }}
        >
          <div className="w-24" style={{ background: "#FFCD00" }} />
          <div className="w-24" style={{ background: "#006A4E" }} />
          <div className="flex-1" style={{ background: "linear-gradient(to right, #CE1126, transparent)" }} />
        </motion.div>

        {/* Grille */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-[280px] rounded-2xl bg-black/[0.04] animate-pulse" />
            ))}
          </div>
        ) : promotions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center py-20 gap-4"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(255,205,0,0.1)", border: "1px solid rgba(255,205,0,0.3)" }}>
              <Tag className="w-6 h-6" style={{ color: "#8a6d00" }} />
            </div>
            <p className="text-black/50 text-sm">Aucune promotion active pour le moment.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {promotions.map((promo, i) => (
              <motion.div
                key={promo._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/promotions/${promo.slug.current}`}
                  className="group relative block rounded-2xl overflow-hidden h-[280px] shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.18)] transition-all duration-500"
                >
                  {/* Image */}
                  {promo.mainImage?.asset?.url ? (
                    <Image
                      src={promo.mainImage.asset.url}
                      alt={promo.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                  ) : (
                    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #006A4E, #FFCD00)" }} />
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Badge date */}
                  {promo.endDate && (
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full px-3 py-1 backdrop-blur-sm" style={{ background: "rgba(255,205,0,0.85)" }}>
                      <Tag className="w-3 h-3 text-black" />
                      <span className="text-[11px] font-semibold text-black">
                        jusqu'au {format(new Date(promo.endDate), 'dd MMM', { locale: fr })}
                      </span>
                    </div>
                  )}

                  {/* Contenu bas */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-fjalla text-white text-lg leading-snug mb-3 line-clamp-2">
                      {promo.title}
                    </h3>
                    <span className="inline-flex items-center gap-2 text-white text-xs font-medium px-4 py-1.5 rounded-full border border-white/50 group-hover:bg-white group-hover:text-black transition-all duration-300">
                      Voir l'offre
                      <ArrowRight className="w-3 h-3 -rotate-45" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Voir toutes */}
        {total > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
          >
            <Link
              href="/promotions"
              className="inline-flex items-center gap-2 text-sm font-normal px-8 py-5 rounded-full transition-opacity duration-200 hover:opacity-85"
              style={{ background: "#00FF7F", color: "#111" }}
            >
              <span>Voir toutes les promotions</span>
              <ArrowRight className="w-4 h-4 -rotate-45" />
            </Link>
          </motion.div>
        )}

      </div>
    </section>
  );
}

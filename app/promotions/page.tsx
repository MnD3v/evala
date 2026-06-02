"use client";

import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Tag, Loader2, ChevronDown } from "lucide-react";
import PromotionCard from "@/app/components/PromotionCard";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

const PROMOTIONS_QUERY = `*[
  _type == "promotion" &&
  defined(slug.current) &&
  publishedAt != null &&
  isActive == true &&
  dateTime(now()) >= dateTime(startDate) &&
  dateTime(now()) <= dateTime(endDate)
]|order(publishedAt desc){
  _id, title, slug, startDate, endDate,
  mainImage{ asset->{url} },
  author->{ name },
  publishedAt
}`;

const options = { next: { revalidate: 30 } };

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<SanityDocument[]>([]);
  const [showAll, setShowAll]       = useState(false);
  const [isLoading, setIsLoading]   = useState(true);
  const [error, setError]           = useState<string | null>(null);

  const load = () => {
    setIsLoading(true); setError(null);
    client.fetch<SanityDocument[]>(PROMOTIONS_QUERY, {}, options)
      .then(data => { setPromotions(data); setIsLoading(false); })
      .catch(e => { setError("Erreur de chargement."); setIsLoading(false); console.error(e); });
  };

  useEffect(() => { load(); }, []);

  const displayed = showAll ? promotions : promotions.slice(0, 6);

  return (
    <div className="min-h-screen bg-white font-clash">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden bg-black pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_50%,rgba(206,17,38,0.18),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(206,17,38,0.4), transparent)" }} />
        <div className="container relative z-10 mx-auto px-6 md:px-8 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4" style={{ color: "#CE1126" }} />
              <span className="text-white/50 text-xs uppercase tracking-widest">Offres & Événements</span>
            </div>
            <h1 className="font-clash font-bold text-white text-5xl md:text-6xl leading-none mb-4">Promotions</h1>
            <p className="text-white/50 text-base max-w-xl">
              Découvrez les offres spéciales et événements autour du festival Evala.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contenu */}
      <main className="container mx-auto px-6 md:px-8 max-w-6xl py-16">
        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-7 h-7 animate-spin" style={{ color: "#CE1126" }} />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center py-24 gap-4">
            <p className="text-black/45 text-sm">{error}</p>
            <button onClick={load} className="text-sm font-medium px-5 py-2.5 rounded-full text-white" style={{ background: "#CE1126" }}>
              Réessayer
            </button>
          </div>
        ) : promotions.length === 0 ? (
          <div className="flex flex-col items-center py-24 gap-3">
            <Tag className="w-8 h-8 text-black/20" />
            <p className="text-black/40 text-sm">Aucune promotion disponible pour le moment.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayed.map((promotion, i) => (
                <motion.div
                  key={promotion._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <PromotionCard promotion={promotion} />
                </motion.div>
              ))}
            </div>

            {promotions.length > 6 && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 text-sm font-semibold px-8 py-4 rounded-full border border-black/15 text-black/60 hover:border-black/30 hover:text-black transition-all"
                >
                  {showAll ? "Voir moins" : "Voir toutes les promotions"}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

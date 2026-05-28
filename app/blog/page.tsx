"use client"

import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { useEffect, useState } from "react";
import BlogCard from "@/app/components/BlogCard";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const POSTS_QUERY = `*[
  _type == "post" && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage{
    asset->{url}
  }
}`;

const options = { next: { revalidate: 30 } };

export default function Blog() {
  const [posts, setPosts]     = useState<SanityDocument[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const load = () => {
    setIsLoading(true);
    setError(null);
    client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options)
      .then((data) => { setPosts(data); setIsLoading(false); })
      .catch((err)  => {
        setError(err instanceof Error ? err.message : "Erreur de chargement.");
        setIsLoading(false);
      });
  };

  useEffect(() => { load(); }, []);

  const displayed    = showAll ? posts : posts.slice(0, 6);
  const hasMore      = posts.length > 6;

  return (
    <section className="bg-white py-24 md:py-32 relative overflow-hidden" id="blog">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(255,205,0,0.05),transparent)] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8 max-w-6xl relative z-10">

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="flex flex-col items-center text-center mb-14"
        >
            <p className="text-[10px] font-medium uppercase mb-4" style={{ color: "#006A4E" }}>
              Actualités & Culture
            </p>
            <h2 className="text-4xl md:text-5xl font-clash font-bold text-black leading-tight">
              Le blog <em className="not-italic" style={{ color: "#006A4E" }}>d'Evala</em>
            </h2>
        </motion.div>

        {/* Séparateur tricolore */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="flex items-center gap-0 mb-14 origin-left overflow-hidden rounded-full"
          style={{ height: "2px" }}
        >
          <div className="w-24" style={{ background: "#CE1126" }} />
          <div className="w-24" style={{ background: "#FFCD00" }} />
          <div className="flex-1" style={{ background: "linear-gradient(to right, #006A4E, transparent)" }} />
        </motion.div>

        {/* États */}
        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#CE1126" }} />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center py-20 gap-5">
            <p className="text-black text-sm">Une erreur est survenue lors du chargement des articles.</p>
            <button
              onClick={load}
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full border transition-colors duration-200"
              style={{ color: "#CE1126", borderColor: "rgba(206,17,38,0.25)", background: "rgba(206,17,38,0.05)" }}
            >
              Réessayer
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-black text-sm">Aucun article disponible pour le moment.</p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {displayed.map((post, i) => (
              <BlogCard key={post._id} post={post} index={i} />
            ))}
          </motion.div>
        )}

        {/* Voir plus */}
        {hasMore && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            className="mt-12 flex justify-center"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2.5 text-sm font-semibold px-6 py-3 rounded-full border transition-all duration-200"
              style={{ color: "#006A4E", borderColor: "rgba(0,106,78,0.25)", background: "rgba(0,106,78,0.05)" }}
            >
              {showAll ? "Voir moins d'articles" : "Voir tous les articles"}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
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

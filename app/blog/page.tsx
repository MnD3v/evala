"use client"
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { useEffect, useState } from "react";
import BlogCard from "@/app/components/BlogCard";
import { motion } from "framer-motion";

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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Blog() {
  const [posts, setPosts] = useState<SanityDocument[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options)
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des posts :", error);
        setIsLoading(false);
      });
  }, []);

  const displayedPosts = showAll ? posts : posts.slice(0, 6);
  const hasMorePosts = posts.length > 6;

  return (
    <section className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold text-white mb-4"
          >
            Notre Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Découvrez nos derniers articles, conseils et actualités
          </motion.p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}

        {/* Posts Grid */}
        {!isLoading && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {displayedPosts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </motion.div>
        )}

        {/* Load More Button */}
        {hasMorePosts && !isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-black hover:bg-gray-900 text-green-500 font-semibold py-4 px-8 rounded-full border-2 border-green-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] inline-flex items-center space-x-2"
            >
              <span>{showAll ? "Voir moins d'articles" : "Charger plus d'articles"}</span>
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
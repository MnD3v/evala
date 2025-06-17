import Link from "next/link";
import Image from "next/image";
import { type SanityDocument } from "next-sanity";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface BlogCardProps {
  post: SanityDocument;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <Link
        href={`/blog/${post.slug.current}`}
        className="group block bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 hover:bg-black/30 hover:border-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] relative"
      >
        {/* Image Container */}
        {post.mainImage?.asset?.url && (
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={post.mainImage.asset.url}
              alt={post.title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110 brightness-90"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            
            {/* Category Badge */}
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium border border-white/20">
              Blog
            </div>
          </div>
        )}

        {/* Content Container */}
        <div className="p-6 relative">
          {/* Shine Effect */}
          <div className="absolute inset-0 -left-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000 ease-out" />

          {/* Date */}
          <p className="text-sm text-gray-400 mb-3 font-medium font-poppins">
            {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>

          {/* Title */}
          <h2 className="text-xl font-bold mb-4 line-clamp-2 text-white group-hover:text-red-400 transition-colors duration-300 font-bricolage">
            {post.title}
          </h2>

          {/* Description if available */}
          {post.excerpt && (
            <p className="text-gray-400 mb-4 line-clamp-3 font-poppins">
              {post.excerpt}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-red-400 font-semibold group-hover:text-red-300 transition-colors duration-300 font-poppins">
              Lire l'article
            </span>
            
            {/* Animated Arrow */}
            <ArrowRight
              className="w-6 h-6 text-red-400 transform group-hover:translate-x-2 transition-transform duration-300"
            />
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-red-500/50 via-red-400/50 to-red-500/50 w-0 group-hover:w-full transition-all duration-700 ease-out" />
        </div>
      </Link>
    </motion.div>
  );
} 
import Link from "next/link";
import Image from "next/image";
import { type SanityDocument } from "next-sanity";
import { motion } from "framer-motion";

const ACCENTS = [
  { header: "#006A4E", label: "rgba(255,255,255,0.18)", text: "#fff" },
  { header: "#CE1126", label: "rgba(255,255,255,0.18)", text: "#fff" },
  { header: "#8a6d00", label: "rgba(255,255,255,0.18)", text: "#fff" },
];

interface BlogCardProps {
  post: SanityDocument;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const accent = ACCENTS[index % 3];

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("fr-FR", {
        day: "numeric", month: "long", year: "numeric",
      })
    : null;

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={`/blog/${post.slug.current}`}
        className="group block rounded-2xl overflow-hidden border border-black/[0.07] hover:border-black/[0.14] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] transition-all duration-400"
      >
        {/* ── En-tête coloré ── */}
        <div className="relative" style={{ background: accent.header }}>

          {/* Image */}
          <div className="relative overflow-hidden" style={{ height: "200px" }}>
            {post.mainImage?.asset?.url ? (
              <Image
                src={post.mainImage.asset.url}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-600 ease-out group-hover:scale-[1.05] mix-blend-multiply opacity-60"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl font-bold text-white/10 select-none">
                  {post.title?.[0] ?? "E"}
                </span>
              </div>
            )}
            <div className="absolute inset-0" style={{ background: `${accent.header}88` }} />
          </div>

          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span
              className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.2)", color: "#fff", backdropFilter: "blur(6px)" }}
            >
              Article
            </span>
          </div>
        </div>

        {/* ── Zigzag tricolore ── */}
        <svg width="100%" height="10" viewBox="0 0 90 10" preserveAspectRatio="none" className="block">
          <polygon points="0,0 15,10 30,0" fill="#CE1126" />
          <polygon points="30,0 45,10 60,0" fill="#FFCD00" />
          <polygon points="60,0 75,10 90,0" fill="#006A4E" />
          <polygon points="0,10 15,0 0,0" fill={accent.header} />
          <polygon points="15,10 30,0 45,10" fill="#FFCD00" />
          <polygon points="45,10 60,0 75,10" fill="#CE1126" />
          <polygon points="75,10 90,0 90,10" fill="#006A4E" />
        </svg>

        {/* ── Corps blanc ── */}
        <div className="px-5 pt-4 pb-5 bg-white flex flex-col gap-3">

          {/* Date */}
          {date && (
            <p className="text-[10px] uppercase font-medium text-black/35">{date}</p>
          )}

          {/* Titre */}
          <h2 className="font-bold text-black leading-snug line-clamp-3 group-hover:opacity-80 transition-opacity duration-200"
            style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)" }}>
            {post.title}
          </h2>

          {/* Séparateur + lien */}
          <div className="flex items-center gap-2 pt-2"
            style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex h-px w-8 overflow-hidden rounded-full">
              <div className="flex-1" style={{ background: "#CE1126" }} />
              <div className="flex-1" style={{ background: "#FFCD00" }} />
              <div className="flex-1" style={{ background: "#006A4E" }} />
            </div>
            <span className="text-xs font-medium transition-all duration-200 group-hover:translate-x-0.5"
              style={{ color: accent.header }}>
              Lire l'article →
            </span>
          </div>

        </div>
      </Link>
    </motion.div>
  );
}

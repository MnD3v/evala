"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

const galleryImages = [
  { id: 1, src: "/images/evala1.jpg",     alt: "Combat d'Evala",         description: "Deux lutteurs s'affrontent dans un combat traditionnel" },
  { id: 2, src: "/images/evala2.jpg",     alt: "Préparation Evala",       description: "Rituel de préparation avant le combat" },
  { id: 3, src: "/images/evala3.jpg",     alt: "Victoire Evala",          description: "Célébration de la victoire" },
  { id: 4, src: "/images/evala4.jpg",     alt: "Spectateurs Evala",       description: "La foule encourageant les lutteurs" },
  { id: 5, src: "/images/evala5.jpg",     alt: "Tradition Evala",         description: "Cérémonie traditionnelle" },
  { id: 6, src: "/images/evala6.jpg",     alt: "Festival Evala",          description: "Vue d'ensemble du festival" },
  { id: 7, src: "/images/evala-2022.jpg", alt: "Festival Evala 2022",     description: "Édition 2022 — Kara" },
  { id: 8, src: "/images/evala-2023.jpg", alt: "Festival Evala 2023",     description: "Édition 2023 — Kara" },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white font-clash">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden bg-black pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(255,205,0,0.1),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,205,0,0.3), transparent)" }} />
        <div className="container relative z-10 mx-auto px-6 md:px-8 max-w-6xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Camera className="w-4 h-4" style={{ color: "#FFCD00" }} />
              <span className="text-white/50 text-xs uppercase tracking-widest">Festival Evala · Kara, Togo</span>
            </div>
            <h1 className="font-clash font-bold text-white text-5xl md:text-6xl leading-none mb-4">
              Galerie photos
            </h1>
            <p className="text-white/50 text-base max-w-xl mx-auto">
              Les moments forts du festival Evala — combats, cérémonies, victoires et traditions ancestrales.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Grille */}
      <main className="container mx-auto px-6 md:px-8 max-w-6xl py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {galleryImages.map((image, i) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                href={`/gallery/${image.id}`}
                className="group relative block overflow-hidden rounded-2xl border border-black/[0.07] hover:shadow-[0_6px_24px_rgba(0,0,0,0.1)] transition-all duration-300"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h3 className="font-clash font-bold text-white text-lg leading-tight">{image.alt}</h3>
                    <p className="text-white/70 text-sm mt-1">{image.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

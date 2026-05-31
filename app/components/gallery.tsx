"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const images = [
  { id: 1, src: "/images/evala1.jpg",      caption: "Combat traditionnel",        year: "Kara" },
  { id: 2, src: "/images/evala2.jpg",      caption: "Rituel de préparation",      year: "Kara" },
  { id: 3, src: "/images/evala3.jpg",      caption: "Célébration de la victoire", year: "Kara" },
  { id: 4, src: "/images/evala4.jpg",      caption: "La foule des cérémonies",    year: "Kara" },
  { id: 5, src: "/images/evala-2022.jpg",  caption: "Festival Evala 2022",        year: "2022" },
  { id: 6, src: "/images/evala-2023.jpg",  caption: "Festival Evala 2023",        year: "2023" },
];

const ROMAN_COLORS = ["#CE1126", "#FFCD00", "#006A4E", "#CE1126", "#FFCD00", "#006A4E", "#CE1126"];
const roman = ["I", "II", "III", "IV", "V", "VI", "VII"];

function PhotoCard({ image, index, className = "" }: { image: (typeof images)[0]; index: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      className={`group relative overflow-hidden rounded-xl bg-gray-100 ${className}`}
    >
      <span
        className="absolute top-3 left-3 z-20 text-xs select-none leading-none font-bold drop-shadow-sm"
        style={{ color: ROMAN_COLORS[index] }}
      >
        {roman[index]}
      </span>
      <Image src={image.src} alt={image.caption} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
        <p className="text-white/90 text-sm italic leading-snug">{image.caption}</p>
        <p className="text-white/50 text-xs mt-0.5 uppercase">{image.year}</p>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <section className="py-24 md:py-32 bg-gray-50 relative overflow-hidden" id="galerie">

      <div className="container mx-auto px-6 md:px-8 relative z-10 max-w-6xl">

        {/* En-tête */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }} className="flex flex-col items-center text-center mb-14">
          <p className="text-xs font-medium uppercase mb-4" style={{ color: "#006A4E" }}>Photographie</p>
          <h2 className="text-4xl md:text-5xl font-clash font-bold text-black leading-tight mb-6">
            L'âme du festival <em className="not-italic" style={{ color: "#006A4E" }}>en images</em>
          </h2>
          <Link href="/gallery" className="group inline-flex items-center gap-2 text-sm font-normal px-8 py-5 rounded-full transition-opacity duration-200 hover:opacity-85" style={{ background: "#00FF7F", color: "#111" }}>
            <span>Voir toute la galerie</span>
            <ArrowRight className="w-4 h-4 -rotate-45" />
          </Link>
        </motion.div>

        {/* Grille éditoriale */}
        <div className="grid grid-cols-2 md:grid-cols-12 grid-rows-[auto] gap-2 md:gap-3">

          <div className="col-span-2 md:col-span-5 md:row-span-2 relative h-[280px] md:h-auto min-h-0 md:min-h-[520px]">
            <PhotoCard image={images[0]} index={0} className="absolute inset-0 h-full w-full" />
          </div>

          <div className="col-span-1 md:col-span-4 relative h-[180px] md:h-[252px]">
            <PhotoCard image={images[1]} index={1} className="absolute inset-0 h-full w-full" />
          </div>

          <div className="col-span-1 md:col-span-3 relative h-[180px] md:h-[252px]">
            <PhotoCard image={images[2]} index={2} className="absolute inset-0 h-full w-full" />
          </div>

          <div className="col-span-1 md:col-span-3 relative h-[180px] md:h-[256px]">
            <PhotoCard image={images[3]} index={3} className="absolute inset-0 h-full w-full" />
          </div>

          <div className="col-span-1 md:col-span-4 relative h-[180px] md:h-[256px]">
            <PhotoCard image={images[4]} index={4} className="absolute inset-0 h-full w-full" />
          </div>

          <div className="col-span-2 md:col-span-12 relative h-[200px] md:h-[260px]">
            <PhotoCard image={images[5]} index={5} className="absolute inset-0 h-full w-full" />
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }} className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <p className="text-3xl md:text-5xl text-white/10 tracking-[0.3em] uppercase select-none">Evala</p>
            </motion.div>
          </div>

        </div>

        {/* Bande tricolore + caption */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true, margin: "0px 0px -80px 0px" }} className="mt-8 flex flex-col items-center gap-3">
          <div className="flex w-24 h-0.5 overflow-hidden rounded-full">
            <div className="flex-1" style={{ background: "#CE1126" }} />
            <div className="flex-1" style={{ background: "#FFCD00" }} />
            <div className="flex-1" style={{ background: "#006A4E" }} />
          </div>
          <p className="text-center text-black text-xs uppercase">
            Festival Evala — Kara, Togo
          </p>
        </motion.div>

      </div>
    </section>
  );
}

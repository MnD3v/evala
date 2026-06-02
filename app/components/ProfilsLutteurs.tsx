"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProfilsLutteurs() {
  return (
    <section id="lutteurs" className="relative overflow-hidden bg-white py-24 md:py-32">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_85%_50%,rgba(206,17,38,0.03),transparent)] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 md:px-8 max-w-6xl">

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="flex flex-col items-center text-center mb-14"
        >
          <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "#CE1126" }}>
            Les combattants
          </p>
          <h2 className="text-4xl md:text-5xl font-clash font-bold text-black leading-tight mb-4">
            Lutteurs par <em className="not-italic" style={{ color: "#CE1126" }}>canton</em>
          </h2>
          <p className="text-black/60 text-base max-w-lg leading-relaxed">
            Chaque canton engage ses guerriers pour défendre son honneur. Découvrez les lutteurs de chaque communauté.
          </p>
        </motion.div>

        {/* Séparateur tricolore */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="flex items-center gap-0 mb-12 origin-left overflow-hidden rounded-full"
          style={{ height: "2px" }}
        >
          <div className="w-24" style={{ background: "#CE1126" }} />
          <div className="w-24" style={{ background: "#FFCD00" }} />
          <div className="flex-1" style={{ background: "linear-gradient(to right, #006A4E, transparent)" }} />
        </motion.div>

        {/* Card unique */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="max-w-2xl mx-auto"
        >
          <Link href="/lutteurs" className="group block relative overflow-hidden rounded-3xl" style={{ aspectRatio: "16/7" }}>

            {/* Image de fond */}
            <Image
              src="https://i.ibb.co/6JrL21w3/Chat-GPT-Image-31-mai-2026-02-27-27-1.png"
              alt="Lutteurs Evala"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
            />

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

            {/* Frise tricolore bas */}
            <div className="absolute bottom-0 left-0 right-0 flex h-[3px]">
              <div className="w-1/3" style={{ background: "#CE1126" }} />
              <div className="w-1/3" style={{ background: "#FFCD00" }} />
              <div className="w-1/3" style={{ background: "#006A4E" }} />
            </div>

            {/* Contenu */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
              <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Kara · Togo</p>
              <h3 className="font-clash font-bold text-white text-3xl md:text-4xl leading-tight mb-4">
                Découvrir les lutteurs
              </h3>
              <div className="flex items-center gap-2 text-white/70 group-hover:text-white transition-colors duration-300">
                <span className="text-base">Explorer par canton</span>
                <ArrowRight className="w-4 h-4 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </div>
            </div>

          </Link>
        </motion.div>

      </div>
    </section>
  );
}

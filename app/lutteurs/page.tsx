"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

const CANTONS = [
  "Lassa",
  "Pya",
  "Kpawa",
  "Tchitchao",
  "Landa-Pozanda",
  "Léon",
  "Pagouda",
  "Kouméa",
  "Bohou",
];

function toSlug(name: string) {
  return name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "-");
}

export default function LutteursPage() {
  return (
    <div className="min-h-screen bg-white font-clash">
      <Navbar />

      {/* ── Hero ── */}
      <div className="relative h-[55vh] min-h-[380px] max-h-[520px] overflow-hidden">
        <Image
          src="/images/a-propos.png"
          alt="Lutteurs Evala"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-12 max-w-6xl mx-auto w-full left-0 right-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Les combattants · Kara, Togo</p>
            <h1 className="font-clash font-bold text-white text-5xl md:text-6xl leading-none mb-5">
              Lutteurs par canton
            </h1>
            <div className="flex h-[3px] rounded-full overflow-hidden w-36">
              <div className="w-1/3" style={{ background: "#CE1126" }} />
              <div className="w-1/3" style={{ background: "#FFCD00" }} />
              <div className="w-1/3" style={{ background: "#006A4E" }} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Contenu ── */}
      <div className="container mx-auto px-6 md:px-8 max-w-6xl py-16 md:py-20">

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-black/40 text-sm mb-10"
        >
          {CANTONS.length} cantons · Région de la Kozah
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CANTONS.map((canton, i) => (
            <motion.div
              key={canton}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
            >
              <Link
                href={`/lutteurs/${toSlug(canton)}`}
                className="group flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border border-black/[0.07] hover:border-black/[0.15] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 bg-white"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(206,17,38,0.07)" }}
                  >
                    <MapPin className="w-4 h-4" style={{ color: "#CE1126" }} />
                  </div>
                  <span className="font-medium text-black">{canton}</span>
                </div>
                <div
                  className="flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: "#CE1126" }}
                >
                  <span className="text-[13px]">Voir les lutteurs</span>
                  <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>

      <Footer />
    </div>
  );
}

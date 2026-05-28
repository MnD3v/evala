"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function AboutEvala() {
  return (
    <section id="about" className="relative py-12 md:py-16 overflow-hidden" style={{ background: "linear-gradient(135deg, #006A51 0%, #0B6C83 100%)" }}>

      {/* ── Lion décoratif bas-gauche ── */}
      <div className="hidden md:block absolute bottom-0 left-0 w-64 md:w-80 opacity-30 pointer-events-none select-none" style={{ filter: "brightness(0) invert(1)" }}>
        <Image src="/images/lion.svg" alt="" aria-hidden="true" width={320} height={320} className="w-full" />
      </div>
      <div className="container mx-auto px-6 md:px-8 max-w-6xl">

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* ── Texte ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          >

            <h2
              className="font-clash font-bold leading-tight mb-6 text-white"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
            >
              Qu'est-ce que{" "}
              <span style={{ color: "#FFCD00" }}>l'Evala ?</span>
            </h2>

            <p className="text-white/75 text-base leading-relaxed mb-4">
              L'Evala est une <strong className="text-white font-semibold">cérémonie rituelle d'initiation à l'âge adulte</strong> chez le <strong className="text-white font-semibold">peuple Kabyè</strong> du nord du Togo. Chaque année, les jeunes hommes de 18 ans s'affrontent dans des <strong className="text-white font-semibold">combats de lutte traditionnelle</strong> pour prouver leur valeur et entrer dans la <strong className="text-white font-semibold">classe des adultes</strong>.
            </p>
            <p className="text-white/75 text-base leading-relaxed mb-10">
              Bien plus qu'un sport, l'Evala est un <strong className="text-white font-semibold">rite sacré multiséculaire</strong> qui célèbre <strong className="text-white font-semibold">l'identité, la force et la cohésion</strong> du peuple Kabyè, inscrit au <strong className="text-white font-semibold">patrimoine culturel du Togo</strong>.
            </p>

            <Link
              href="/about-evala"
              className="inline-flex items-center gap-2 text-sm font-normal px-8 py-5 rounded-full transition-opacity duration-200 hover:opacity-85"
              style={{ background: "#00FF7F", color: "#111" }}
            >
              <span>Voir plus</span>
              <ArrowRight className="w-4 h-4 -rotate-45" />
            </Link>
          </motion.div>

          {/* ── Image ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <Image
                src="/images/a-propos.png"
                alt="Evala — lutte traditionnelle Kabyè"
                fill
                priority
                className="object-cover object-center"
              />
            </div>

            {/* Accent décoratif */}
            <div
              className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl -z-10"
              style={{ background: "#FFCD00", opacity: 0.5 }}
            />
            <div
              className="absolute -top-4 -right-4 w-16 h-16 rounded-xl -z-10"
              style={{ background: "#006A4E", opacity: 0.25 }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

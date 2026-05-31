"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    src: "/images/evala-2024.png",
    kenBurns: {
      initial: { scale: 1.12, x: "2%",  y: "1%" },
      animate: { scale: 1.22, x: "-2%", y: "-1%" },
    },
  },
  {
    src: "/images/hero-bg2.png",
    kenBurns: {
      initial: { scale: 1.15, x: "-3%", y: "-2%" },
      animate: { scale: 1.06, x: "3%",  y: "2%" },
    },
  },
];

const LETTERS = [
  { char: "E", color: "#CE1126" },
  { char: "V", color: "#FFCD00" },
  { char: "A", color: "#006A4E" },
  { char: "L", color: "#FFCD00" },
  { char: "A", color: "#CE1126" },
];

const SLIDE_DURATION = 6000;

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">

      {/* ── Slides : Ken Burns + crossfade ── */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            animate={{ opacity: i === current ? 1 : 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              initial={slide.kenBurns.initial}
              animate={i === current ? slide.kenBurns.animate : slide.kenBurns.initial}
              transition={{ duration: SLIDE_DURATION / 1000 + 1.5, ease: "easeInOut" }}
            >
              <Image
                src={slide.src}
                alt="Festival Evala"
                fill
                priority
                className="object-cover object-center"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* ── Overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/60 via-amber-950/20 to-black/50 mix-blend-multiply" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_38%,rgba(0,0,0,0.65))]" />

      {/* ── Grain cinématique (statique) ── */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* ── Contenu principal ── */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 text-center">

        {/* Titre EVALA */}
        <div className="flex mb-4" style={{ clipPath: "inset(-20% -5% -20% -5%)" }}>
          {LETTERS.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.07 }}
              className="font-mercado font-bold text-[22vw] md:text-[18vw] lg:text-[14vw] leading-[1.1] tracking-[-0.12em]"
              style={{
                color: letter.color,
                textShadow: `0 0 60px ${letter.color}60, 0 4px 32px rgba(0,0,0,0.6)`,
              }}
            >
              {letter.char}
            </motion.span>
          ))}
        </div>

        {/* Séparateur */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="w-28 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-7 origin-center"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="text-white/75 text-base md:text-lg max-w-xl leading-relaxed mb-10 px-2"
        >
          Le plus grand festival de lutte traditionnelle au Togo.
          Cérémonies ancestrales et combats épiques dans la région de Kara.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#programme"
            className="inline-flex items-center gap-2.5 text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-colors duration-200"
            style={{ background: "transparent", border: "4px solid white" }}
          >
            Programme 2026
          </a>
          <a
            href="#live"
            className="inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 transition-opacity duration-200 hover:opacity-90 group"
            style={{ background: "#111" }}
          >
            <span className="text-white text-sm font-medium tracking-wide uppercase">
              Suivre en direct
            </span>
            <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-evala shrink-0 group-hover:scale-105 transition-transform duration-200">
              <motion.span
                className="absolute inset-0 rounded-full bg-evala"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
              />
              <svg className="w-4 h-4 text-white relative ml-0.5" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 2.5l9 5.5-9 5.5V2.5z" />
              </svg>
            </span>
          </a>
        </motion.div>

      </div>

    </section>
  );
}

"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";


const SLIDES = [
  {
    src: "/images/evala-2024.png",
    kenBurns: {
      initial: { scale: 1.15, x: "3%",  y: "2%" },
      animate: { scale: 1.28, x: "-3%", y: "-2%" },
    },
  },
  {
    src: "/images/hero-bg2.png",
    kenBurns: {
      initial: { scale: 1.2,  x: "-4%", y: "-3%" },
      animate: { scale: 1.08, x: "4%",  y: "3%" },
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

// Positions fixes pour éviter les erreurs d'hydration
const PARTICLES = [
  { left: "8%",  bottom: "12%", size: 3, delay: 0,   dur: 5.5 },
  { left: "17%", bottom: "8%",  size: 2, delay: 1.2, dur: 4.2 },
  { left: "25%", bottom: "20%", size: 4, delay: 0.5, dur: 6.1 },
  { left: "33%", bottom: "5%",  size: 2, delay: 2.1, dur: 5.0 },
  { left: "41%", bottom: "15%", size: 3, delay: 0.8, dur: 4.8 },
  { left: "50%", bottom: "10%", size: 2, delay: 1.7, dur: 6.3 },
  { left: "58%", bottom: "22%", size: 4, delay: 0.3, dur: 4.5 },
  { left: "66%", bottom: "7%",  size: 2, delay: 2.5, dur: 5.8 },
  { left: "74%", bottom: "18%", size: 3, delay: 1.0, dur: 4.9 },
  { left: "82%", bottom: "12%", size: 2, delay: 0.6, dur: 5.2 },
  { left: "90%", bottom: "25%", size: 3, delay: 1.9, dur: 6.0 },
  { left: "14%", bottom: "28%", size: 2, delay: 3.1, dur: 4.3 },
];

const SLIDE_DURATION = 6000; // ms par slide

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [current, setCurrent]     = useState(0);
  const [flashing, setFlashing]   = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlashing(true);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % SLIDES.length);
        setFlashing(false);
      }, 300);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imgY           = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY       = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-black">

      {/* ── Couche 1 : Ken Burns + crossfade cinématique ── */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              initial={SLIDES[current].kenBurns.initial}
              animate={SLIDES[current].kenBurns.animate}
              transition={{ duration: SLIDE_DURATION / 1000 + 1, ease: "easeInOut" }}
            >
              <Image
                src={SLIDES[current].src}
                alt="Festival Evala"
                fill
                priority={current === 0}
                className="object-cover object-center"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Flash de transition entre slides ── */}
      <AnimatePresence>
        {flashing && (
          <motion.div
            className="absolute inset-0 bg-white pointer-events-none z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* ── Flash d'impact à l'entrée ── */}
      <motion.div
        className="absolute inset-0 bg-white pointer-events-none z-50"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      {/* ── Color grade dramatique feu ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/65 via-amber-950/25 to-black/55 mix-blend-multiply" />

      {/* ── Voile sombre ── */}
      <div className="absolute inset-0 bg-black/38" />

      {/* ── Gradient narratif haut/bas ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/75" />

      {/* ── Vignette circulaire ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_38%,rgba(0,0,0,0.72))]" />

      {/* ── Orbes de chaleur ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-[650px] h-[650px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(220,38,38,0.32) 0%, transparent 65%)" }}
          animate={{ x: [0, 70, 0], y: [0, 55, 0], scale: [1, 1.22, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[750px] h-[750px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(251,146,60,0.28) 0%, transparent 65%)" }}
          animate={{ x: [0, -55, 0], y: [0, -45, 0], scale: [1, 1.18, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(234,179,8,0.18) 0%, transparent 65%)" }}
          animate={{ scale: [1, 1.35, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── Particules de poussière ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-300/35"
            style={{ width: p.size, height: p.size, left: p.left, bottom: p.bottom }}
            animate={{ y: [0, -280], opacity: [0, 0.7, 0], x: [0, i % 2 === 0 ? 25 : -25] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeOut" }}
          />
        ))}
      </div>


      {/* ── Grain cinématique ── */}
      <div
        className="absolute inset-0 opacity-[0.055] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* ── Contenu principal ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 text-center"
      >



        {/* Titre EVALA — reveal avec impact */}
        <div className="flex overflow-hidden mb-4">
          {LETTERS.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: 140, opacity: 0, scale: 1.4 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.38 + i * 0.08 }}
              className="font-newsport font-bold italic text-[22vw] md:text-[18vw] lg:text-[14vw] leading-none tracking-tight"
              style={{
                color: letter.color,
                textShadow: `0 0 60px ${letter.color}60, 0 4px 32px rgba(0,0,0,0.6)`,
              }}
            >
              {letter.char}
            </motion.span>
          ))}
        </div>

        {/* Séparateur animé */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="w-28 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-7 origin-center"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/75 text-base md:text-lg max-w-xl leading-relaxed mb-10 px-2"
        >
          Le plus grand festival de lutte traditionnelle au Togo.
          Cérémonies ancestrales et combats épiques dans la région de Kara.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.25 }}
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


      </motion.div>


    </section>
  );
}

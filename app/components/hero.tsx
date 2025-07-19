"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Composant séparé pour les particules
const ParticlesEffect = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    style: {
      left: string;
      top: string;
      animationDelay: string;
      animationDuration: string;
    };
  }>>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${5 + Math.random() * 5}s`,
        },
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <>
      {particles.map(({ id, style }) => (
        <div
          key={id}
          className="absolute w-1 h-1 bg-evala/30 rounded-full animate-float"
          style={style}
        />
      ))}
    </>
  );
};

export default function Hero() {
  const [isClient, setIsClient] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen bg-black/30 overflow-hidden">
      {/* Background avec effet de particules */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-yellow-500/5 to-black/50 z-10"></div>
        {isClient && <ParticlesEffect />}
      </div>

      {/* Cercles décoratifs avec nouveaux effets */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: "spring", stiffness: 75, damping: 15 }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-evala/10 via-yellow-500/10 to-evala/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-yellow-500/10 via-evala/10 to-yellow-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.8, 0.6, 0.8],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 relative z-30 min-h-screen flex items-center">
        <div className="text-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className=""
          >
            <div className="relative flex items-center justify-center">
              <motion.span
                initial={{ opacity: 0, rotateY: -180, scale: 0.5 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-mercado text-[6rem] md:text-[10rem] text-[#339999] -mr-2 md:-mr-4"
              >
                E
              </motion.span>
              <motion.span
                initial={{ opacity: 0, rotateY: -180, scale: 0.5 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-mercado text-[6rem] md:text-[10rem] text-[#669933] -mr-2 md:-mr-4"
              >
                V
              </motion.span>
              <motion.span
                initial={{ opacity: 0, rotateY: -180, scale: 0.5 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="font-mercado text-[6rem] md:text-[10rem] text-[#FF9933] -mr-2 md:-mr-4"
              >
                A
              </motion.span>
              <motion.span
                initial={{ opacity: 0, rotateY: -180, scale: 0.5 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="font-mercado text-[6rem] md:text-[10rem] text-[#FF3333] -mr-2 md:-mr-4"
              >
                L
              </motion.span>
              <motion.span
                initial={{ opacity: 0, rotateY: -180, scale: 0.5 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="font-mercado text-[6rem] md:text-[10rem] text-[#FF9933]"
              >
                A
              </motion.span>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute -inset-2 bg-gradient-to-r from-evala/20 via-yellow-500/20 to-evala/20 blur-2xl -z-10 rounded-full"
              ></motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-2xl md:text-4xl lg:text-3xl text-white font-gilroy tracking-wide -mb-2"
            >
              Festival de
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-2xl md:text-4xl lg:text-3xl text-orange-500 font-gilroy tracking-t -mb-2"
            >
              Lutte Traditionnelle
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-2xl md:text-4xl lg:text-3xl text-white font-gilroy tracking-tighter"
            >
              Togolaise
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base md:text-lg lg:text-xl  font-poppins text-white max-w-3xl mx-auto my-12 leading-tight tracking-tighter "
            >
              Découvrez le Festival Evala 2025, le plus grand événement de lutte traditionnelle au Togo. Rite initiatique sacré des Kabyè, cérémonies ancestrales, et combats épiques dans la région de Kara.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <a
              href="#programme"
              className="group relative overflow-hidden px-8 py-4 text-xl font-gilroy tracking-wider uppercase w-full md:w-auto text-center border-2 border-white rounded-full"
            >
              <span className="relative z-10 text-white text-base md:text-lg">
                Programme Evala 2025
              </span>
              <div className="absolute inset-0 bg-white/10 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100 rounded-full"></div>
            </a>

            <a
              href="#live"
              className="group relative overflow-hidden px-8 py-4 text-xl font-gilroy tracking-wider uppercase w-full md:w-auto text-center border-2 border-evala rounded-full bg-evala"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                <span className="text-base md:text-lg">Suivre en Direct</span>
              </span>
              <div className="absolute inset-0 bg-white/10 transform scale-x-0 transition-transform duration-300 origin-right group-hover:scale-x-100 rounded-full"></div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 


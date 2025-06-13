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
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
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
      <div className="container mx-auto px-4 relative z-30 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <motion.h1 
                className="text-[6rem] md:text-[12rem] lg:text-[16rem] font-display text-transparent bg-clip-text bg-gradient-to-r from-evala via-yellow-500 to-evala leading-none tracking-tighter mb-4"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                EVALA
              </motion.h1>
              <div className="absolute -inset-2 bg-gradient-to-r from-evala/20 via-yellow-500/20 to-evala/20 blur-2xl -z-10 rounded-full"></div>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-2xl md:text-3xl lg:text-4xl text-white font-display tracking-wide mb-8"
            >
              La Tradition de la Lutte Togolaise
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Plongez au cœur d'une tradition millénaire où force, honneur et spiritualité se rencontrent dans des combats épiques
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
              className="group relative bg-transparent overflow-hidden px-8 py-4 text-xl font-display tracking-wider uppercase w-full md:w-auto text-center"
            >
              <span className="relative z-10 text-white">Voir le Programme</span>
              <div className="absolute inset-0 bg-evala transform transition-transform duration-300 group-hover:scale-110"></div>
            </a>
            
            <a
              href="#live"
              className="group relative overflow-hidden px-8 py-4 text-xl font-display tracking-wider uppercase w-full md:w-auto text-center border-2 border-evala/30"
            >
              <span className="relative z-10 text-white transition-colors duration-300 group-hover:text-black">Suivre en Direct</span>
              <div className="absolute inset-0 bg-white transform origin-left -translate-x-full transition-transform duration-300 group-hover:translate-x-0"></div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 
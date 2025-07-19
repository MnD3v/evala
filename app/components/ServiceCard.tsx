"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  imagePath: string;
  link: string;
  index: number;
}

export default function ServiceCard({ title, description, imagePath, link, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative w-full max-w-[350px] perspective-2000"
    >
      <Link href={link}>
        <div className="relative">
          {/* Effet de halo lumineux */}
          <div className="absolute -inset-1 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red opacity-0 group-hover:opacity-75 blur-2xl transition-all duration-700 -z-10"></div>

          {/* Carte principale avec effet 3D */}
          <motion.div
            whileHover={{
              rotateX: 10,
              rotateY: 5,
              scale: 1.02,
              transition: { duration: 0.4 }
            }}
            className="relative flex h-[400px] transform-gpu flex-col overflow-hidden rounded-[40px] bg-gradient-to-br from-black via-gray-900 to-black p-6 transition-all duration-500 preserve-3d border border-white/10 shadow-[0_0_25px_rgba(0,0,0,0.8)]"
          >
            {/* Image de fond avec effets */}
            <div className="absolute inset-0 z-0">
              <Image
                src={imagePath}
                alt={title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-2 filter brightness-[0.7]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90"></div>
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
            </div>

            {/* Contenu avec effet de profondeur */}
            <div className="relative z-10 flex h-full flex-col justify-between transform-gpu translate-z-30">
              {/* Icône flottante */}
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 bg-gradient-to-br from-festival-red to-festival-yellow rounded-full opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative h-full w-full rounded-full bg-black/30 p-4 backdrop-blur-xl border border-white/10 shadow-lg">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-festival-red/20 to-festival-yellow/20"></div>
                  <svg
                    className="h-full w-full text-white transform transition-transform duration-500 group-hover:rotate-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>

              {/* Texte et bouton */}
              <div className="space-y-6">
                {/* Titre avec animation */}
                <div className="relative">
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 group-hover:from-festival-red group-hover:to-festival-yellow transition-all duration-500">
                    {title}
                  </h3>
                  <div className="relative h-0.5 w-16 mt-3 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red group-hover:animate-[shimmer_2s_linear_infinite] transition-all duration-500"></div>
                  </div>
                </div>

                {/* Description avec animation de fondu */}
                <p className="text-gray-300 transform transition-all duration-500 group-hover:text-white">
                  {description}
                </p>

                {/* Bouton avec effet de brillance */}
                <div className="relative overflow-hidden rounded-full bg-gradient-to-r from-festival-red/10 to-festival-yellow/10 p-4 backdrop-blur-sm group-hover:from-festival-red/20 group-hover:to-festival-yellow/20 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  <div className="relative flex items-center justify-between">
                    <span className="text-white font-medium">En savoir plus</span>
                    <div className="relative h-6 w-6 rounded-full bg-gradient-to-br from-festival-red to-festival-yellow p-1">
                      <svg
                        className="h-full w-full text-white transform transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Effets de bordure lumineux */}
            <div className="pointer-events-none absolute -inset-px rounded-[40px] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-festival-red/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100"></div>
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-r from-festival-red/0 via-festival-yellow/30 to-festival-red/0 opacity-0 group-hover:opacity-100 blur"></div>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
} 
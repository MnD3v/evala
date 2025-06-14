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
      className="group relative w-full max-w-[350px]"
    >
      <Link href={link}>
        <div className="group relative">
          {/* Carte principale */}
          <div className="relative flex h-[400px] transform-gpu flex-col overflow-hidden rounded-[40px] bg-gradient-to-br from-black to-gray-900 transition-all duration-500 hover:scale-[1.02]">
            {/* Image de fond avec effet parallaxe */}
            <div className="absolute inset-0 z-0">
              <Image
                src={imagePath}
                alt={title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
            </div>

            {/* Contenu */}
            <div className="relative z-10 flex h-full flex-col justify-end p-6">
              {/* Titre et description */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">
                  {title}
                </h3>
                <div className="h-0.5 w-12 bg-festival-red transition-all duration-300 group-hover:w-full"></div>
                <p className="text-gray-300">
                  {description}
                </p>
                
                {/* Bouton avec effet de glissement */}
                <div className="mt-6 inline-flex items-center space-x-2 text-festival-red">
                  <span className="font-medium">Découvrir</span>
                  <div className="relative overflow-hidden rounded-full bg-festival-red/10 p-2">
                    <svg
                      className="h-5 w-5 transform text-festival-red transition-transform duration-300 group-hover:translate-x-1"
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

            {/* Effet de brillance au survol */}
            <div className="pointer-events-none absolute -inset-px rounded-[40px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-t from-festival-red/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 
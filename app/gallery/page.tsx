"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    src: "/images/evala1.jpg",
    alt: "Combat d'Evala",
    description: "Deux lutteurs s'affrontent dans un combat traditionnel"
  },
  {
    id: 2,
    src: "/images/evala2.jpg",
    alt: "Préparation Evala",
    description: "Rituel de préparation avant le combat"
  },
  {
    id: 3,
    src: "/images/evala3.jpg",
    alt: "Victoire Evala",
    description: "Célébration de la victoire"
  },
  {
    id: 4,
    src: "/images/evala4.jpg",
    alt: "Spectateurs Evala",
    description: "La foule encourageant les lutteurs"
  },
  {
    id: 5,
    src: "/images/evala5.jpg",
    alt: "Tradition Evala",
    description: "Cérémonie traditionnelle"
  },
  {
    id: 6,
    src: "/images/evala6.jpg",
    alt: "Festival Evala",
    description: "Vue d'ensemble du festival"
  }
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-black font-sans">
      {/* Header avec bouton retour */}
      <div className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link 
            href="/"
            className="flex items-center text-white hover:text-red-500 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 mr-2" />
            <span>Retour à l'accueil</span>
          </Link>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl md:text-6xl font-[var(--font-cinzel)] mb-12 text-red-600">
          Galerie Photo
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image) => (
            <Link
              key={image.id}
              href={`/gallery/${image.id}`}
              className="group relative overflow-hidden rounded-2xl shadow-xl transform transition duration-500 hover:-translate-y-2"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white font-teko text-xl mb-1">{image.alt}</h3>
                    <p className="text-gray-200 text-sm font-montserrat line-clamp-2">{image.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 
"use client";

import Image from 'next/image';
import Link from 'next/link';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  description: string;
}

const galleryImages: GalleryImage[] = [
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

export default function Gallery() {
  return (
    <>
      <section className="py-16 px-4 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-gilroy text-evala ">
              Galerie Photo
            </h2>
            <Link
              href="/gallery"
              className="px-6 py-2 bg-red-600 text-white rounded-full font-montserrat text-sm hover:bg-red-700 transition-colors"
            >
              Voir tout
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {galleryImages.map((image) => (
              <Link
                key={image.id}
                href={`/gallery/${image.id}`}
                className="relative group overflow-visible rounded-2xl shadow-2xl transform transition-all duration-500 hover:-translate-y-2 hover:shadow-red-500/20"
              >
                {/* Cadre décoratif avec effet de base et transition au hover */}
                <div className="absolute -inset-2 bg-gradient-to-r from-gray-500/0 via-gray-500/20 to-gray-500/0 rounded-2xl transition-all duration-500 blur-sm group-hover:from-red-500/0 group-hover:via-red-500/30 group-hover:to-red-500/0"></div>
                
                {/* Coins décoratifs avec transition de couleur et forme */}
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-gray-400 rounded-tr-xl transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:border-red-500 group-hover:rounded-tr-2xl"></div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-gray-400 rounded-bl-xl transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:border-red-500 group-hover:rounded-bl-2xl"></div>
                
                {/* Points décoratifs avec transition de taille et couleur */}
                <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-gray-400 rounded-full transition-all duration-500 group-hover:w-2 group-hover:h-2 group-hover:bg-red-500"></div>
                <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-gray-400 rounded-full transition-all duration-500 group-hover:w-2 group-hover:h-2 group-hover:bg-red-500"></div>

                <div className="aspect-w-16 aspect-h-9 relative h-[250px] md:h-[300px] bg-gradient-to-br from-black/5 to-black/20 rounded-2xl p-1">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                      className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-white font-teko text-xl md:text-2xl mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{image.alt}</h3>
                        <p className="text-gray-200 text-xs md:text-sm font-montserrat opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">{image.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
} 
"use client";

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';

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
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black font-poppins">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden mt-20 md:mt-32">
        <div className="absolute inset-0 bg-black/60 z-10" />
   
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 font-gilroy">
            Galerie <span className="text-evala">Photos</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
            Découvrez les moments forts du Festival Evala à travers notre collection de photos
          </p>
        </div>
      </div>
      
      {/* Gallery Grid */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
            {galleryImages.map((image) => (
              <Link
                key={image.id}
                href={`/gallery/${image.id}`}
                className="group relative block overflow-hidden rounded-xl bg-black shadow-xl transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl w-full max-w-md mx-auto"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-transform duration-500">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      {image.alt}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      {image.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 
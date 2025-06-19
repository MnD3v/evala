"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';
import { use } from 'react';
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

export default function GalleryImagePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const imageId = parseInt(resolvedParams.id);
  const image = galleryImages.find(img => img.id === imageId);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && imageId > 1) {
      router.push(`/gallery/${imageId - 1}`);
    } else if (e.key === 'ArrowRight' && imageId < galleryImages.length) {
      router.push(`/gallery/${imageId + 1}`);
    } else if (e.key === 'Escape') {
      router.push('/gallery');
    }
  }, [imageId, router]);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (e.deltaY > 0 && imageId < galleryImages.length) {
      router.push(`/gallery/${imageId + 1}`);
    } else if (e.deltaY < 0 && imageId > 1) {
      router.push(`/gallery/${imageId - 1}`);
    }
  }, [imageId, router]);

  useEffect(() => {
    if (!image) {
      router.push('/gallery');
      return;
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [image, router, handleKeyDown, handleWheel]);

  if (!image) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black font-poppins">
      {/* Image Container */}
      <div className="relative min-h-screen bg-black/95">
        {/* Close Button */}
        <Link
          href="/gallery"
          className="fixed top-6 right-4 md:right-8 z-50 p-2 bg-black/50 hover:bg-black/80 rounded-full transition-all duration-300 hover:scale-110"
        >
          <X className="w-6 h-6 text-white" />
        </Link>

        {/* Navigation Buttons */}
        <div className="fixed top-1/2 -translate-y-1/2 w-full z-40 px-4 pointer-events-none">
          <div className="container mx-auto flex justify-between">
            {imageId > 1 && (
              <Link
                href={`/gallery/${imageId - 1}`}
                className="pointer-events-auto p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all duration-300 hover:scale-110 hover:-translate-x-2"
              >
                <ChevronLeft className="w-8 h-8" />
                <span className="sr-only">Image précédente</span>
              </Link>
            )}
            {imageId < galleryImages.length && (
              <Link
                href={`/gallery/${imageId + 1}`}
                className="pointer-events-auto p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all duration-300 hover:scale-110 hover:translate-x-2 ml-auto"
              >
                <ChevronRight className="w-8 h-8" />
                <span className="sr-only">Image suivante</span>
              </Link>
            )}
          </div>
        </div>

        {/* Main Image */}
        <div className="container mx-auto px-4 py-16 min-h-screen flex flex-col items-center justify-center">
          <div className="relative w-full max-w-6xl aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
              quality={100}
            />
          </div>
          
          {/* Image Info */}
          <div className="mt-8 text-center max-w-2xl mx-auto bg-black/50 backdrop-blur-sm p-6 rounded-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{image.alt}</h2>
            <p className="text-gray-300 text-lg leading-relaxed">{image.description}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

"use client";

import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { use } from 'react';
import Footer from '@/app/components/footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

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
  const resolvedParams = use(params);
  const imageId = parseInt(resolvedParams.id);
  const initialSlide = imageId - 1;

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

        <style jsx global>{`
          .swiper-button-next,
          .swiper-button-prev {
            color: white;
            background: rgba(0, 0, 0, 0.5);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            transition: all 0.3s ease;
          }

          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            background: rgba(0, 0, 0, 0.8);
            transform: scale(1.1);
          }

          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 24px;
          }
        `}</style>

        {/* Swiper */}
        <div className="h-screen w-full flex items-center justify-center">
          <Swiper
            modules={[Navigation, Keyboard, Mousewheel]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            keyboard={{ enabled: true }}
            mousewheel={{ forceToAxis: true }}
            initialSlide={initialSlide}
            className="w-full h-full"
            onSlideChange={(swiper) => {
              const newId = swiper.activeIndex + 1;
              window.history.replaceState(null, '', `/gallery/${newId}`);
            }}
          >
            {galleryImages.map((image) => (
              <SwiperSlide key={image.id} className="flex flex-col items-center justify-center p-4">
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <Footer />
    </div>
  );
}

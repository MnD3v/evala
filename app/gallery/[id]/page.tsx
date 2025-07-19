"use client";

import Image from 'next/image';
import { use } from 'react';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, Mousewheel } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';

const galleryImages = [
  {
    id: 1,
    src: "/images/evala1.jpg",
    alt: "Combat d'Evala",
    description: "Deux lutteurs s'affrontent dans un combat traditionnel lors du festival Evala. Cette cérémonie ancestrale marque le passage à l'âge adulte des jeunes Kabyè.",
    category: "Combat",
    date: "Juillet 2024"
  },
  {
    id: 2,
    src: "/images/evala2.jpg",
    alt: "Préparation Evala",
    description: "Rituel de préparation avant le combat. Les participants se concentrent et reçoivent les bénédictions des anciens avant d'entrer dans l'arène sacrée.",
    category: "Rituel",
    date: "Juillet 2024"
  },
  {
    id: 3,
    src: "/images/evala3.jpg",
    alt: "Victoire Evala",
    description: "Célébration de la victoire après un combat mémorable. La joie et la fierté se lisent sur tous les visages de la communauté rassemblée.",
    category: "Célébration",
    date: "Juillet 2024"
  },
  {
    id: 4,
    src: "/images/evala4.jpg",
    alt: "Spectateurs Evala",
    description: "La foule en liesse encourage les lutteurs. L'atmosphère est électrique et toute la communauté participe à cette célébration traditionnelle.",
    category: "Ambiance",
    date: "Juillet 2024"
  },
  {
    id: 5,
    src: "/images/evala5.jpg",
    alt: "Tradition Evala",
    description: "Cérémonie traditionnelle marquant l'importance culturelle de l'événement. Les rites ancestraux sont respectés et transmis aux nouvelles générations.",
    category: "Tradition",
    date: "Juillet 2024"
  },
  {
    id: 6,
    src: "/images/evala6.jpg",
    alt: "Festival Evala",
    description: "Vue d'ensemble du festival dans toute sa splendeur. Des milliers de personnes se rassemblent pour célébrer cette tradition séculaire unique au Togo.",
    category: "Festival",
    date: "Juillet 2024"
  }
];

export default function GalleryImagePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const imageId = parseInt(resolvedParams.id);
  const initialSlide = imageId - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black font-poppins">
      <Navbar />

      {/* Image Container */}
      <div className="relative min-h-screen pt-24 md:pt-32">
        <style jsx global>{`
          .swiper-button-next,
          .swiper-button-prev {
            color: white;
            background: linear-gradient(135deg, #ff6b35, #ff8c42);
            width: 70px;
            height: 70px;
            border-radius: 50%;
            transition: all 0.4s ease;
            border: 3px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(255, 107, 53, 0.3);
            z-index: 10;
          }

          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            background: linear-gradient(135deg, #ff8c42, #ffad5a);
            transform: scale(1.1) rotate(5deg);
            border-color: rgba(255, 255, 255, 0.4);
            box-shadow: 0 12px 40px rgba(255, 107, 53, 0.5);
          }

          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 22px;
            font-weight: bold;
          }

          .swiper-slide {
            transform: translateZ(0);
            backface-visibility: hidden;
            will-change: transform;
          }

          .swiper-wrapper {
            transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
          }

          .swiper-container {
            overflow: hidden;
          }
        `}</style>

        {/* Swiper */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto overflow-hidden">
            <Swiper
              modules={[Navigation, Keyboard, Mousewheel]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              keyboard={{ enabled: true }}
              mousewheel={{ forceToAxis: true }}
              initialSlide={initialSlide}
              speed={600}
              allowTouchMove={true}
              grabCursor={true}
              className="w-full"
              style={{ height: 'auto', overflow: 'visible' }}
              onSlideChange={(swiper) => {
                const newId = swiper.activeIndex + 1;
                window.history.replaceState(null, '', `/gallery/${newId}`);
              }}
            >
              {galleryImages.map((image, index) => (
                <SwiperSlide key={image.id} className="pb-16">
                  <motion.div 
                    className="w-full"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    {/* Conteneur principal avec effet glassmorphism */}
                    <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-lg rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
                      {/* Effet de lumière en arrière-plan */}
                      <div className="absolute inset-0 bg-gradient-to-r from-evala/10 via-yellow-500/5 to-evala/10 animate-pulse"></div>
                      
                      {/* Header avec informations */}
                      <div className="relative z-10 p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                          <div className="mb-4 md:mb-0">
                            <motion.div 
                              className="inline-flex items-center px-4 py-2 bg-evala/20 rounded-full backdrop-blur-sm border border-evala/30 mb-3"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.4 }}
                            >
                              <span className="text-evala text-sm font-medium">{image.category}</span>
                            </motion.div>
                            <motion.h1 
                              className="text-3xl md:text-5xl font-gilroy text-white mb-2"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              {image.alt}
                            </motion.h1>
                            <motion.p 
                              className="text-gray-400 text-sm"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 }}
                            >
                              {image.date}
                            </motion.p>
                          </div>
                          
                          {/* Compteur stylisé */}
                          <motion.div 
                            className="flex items-center space-x-2"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 }}
                          >
                            <div className="flex space-x-1">
                              {galleryImages.map((_, idx) => (
                                <div
                                  key={idx}
                                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    idx === index ? 'bg-evala w-8' : 'bg-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-white/70 text-sm ml-3">
                              {image.id} / {galleryImages.length}
                            </span>
                          </motion.div>
                        </div>

                        {/* Image principale avec effet */}
                        <motion.div 
                          className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl mb-8 group"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4, duration: 0.6 }}
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 1024px"
                            priority
                            quality={100}
                          />
                          {/* Overlay gradient au hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* Effet de brillance */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        </motion.div>
                        
                        {/* Description avec style moderne */}
                        <motion.div 
                          className="relative"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          {/* Ligne décorative */}
                          <div className="flex items-center mb-6">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-evala/50 to-transparent"></div>
                            <div className="px-4">
                              <div className="w-2 h-2 bg-evala rounded-full"></div>
                            </div>
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-evala/50 to-transparent"></div>
                          </div>
                          
                          <div className="bg-gradient-to-r from-black/40 via-black/60 to-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                            <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light text-center">
                              {image.description}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

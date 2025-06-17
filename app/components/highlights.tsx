"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

interface VideoData {
  id: string;
  title: string;
  description: string;
}

export default function Highlights() {
  const videos: VideoData[] = [
    { 
      id: "_P5OPljtW6k", 
      title: "Evala 2023",
      description: "Les moments forts de la cérémonie Evala 2023"
    },
    { 
      id: "ckNJSboZqvk", 
      title: "Lutte traditionnelle",
      description: "Combat traditionnel entre deux lutteurs Evala"
    },
    { 
      id: "CcMCZrCmjNQ", 
      title: "Festival Evala",
      description: "Ambiance festive et traditions lors du festival"
    },
    { 
      id: "UyTzqznlAGQ", 
      title: "Moments forts",
      description: "Les temps forts de la compétition Evala"
    },
    { 
      id: "Q-vfi6xsQQU", 
      title: "Célébration Evala",
      description: "Célébration et remise des prix aux vainqueurs"
    },
  ];

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videoHistory, setVideoHistory] = useState<string[]>([]);

  const closeVideo = useCallback(() => {
    setSelectedVideo(null);
    setVideoHistory([]);
  }, []);

  const handleVideoSelect = (videoId: string) => {
    if (selectedVideo) {
      setVideoHistory([...videoHistory, selectedVideo]);
    }
    setSelectedVideo(videoId);
  };

  const handleBack = () => {
    if (videoHistory.length > 0) {
      const previousVideo = videoHistory[videoHistory.length - 1];
      setSelectedVideo(previousVideo);
      setVideoHistory(videoHistory.slice(0, -1));
    }
  };

  // Gestionnaire de la touche Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeVideo();
      }
    };

    if (selectedVideo) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [selectedVideo, closeVideo]);

  return (
    <section className="py-16 md:py-24 bg-black relative overflow-hidden font-poppins">
      <div className="absolute inset-0 opacity-5 bg-pattern"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-gilroy mb-4 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red bg-clip-text text-transparent">
            Moments Forts
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red mx-auto mb-4"></div>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            Découvrez les moments les plus intenses et émouvants des cérémonies Evala à travers ces vidéos sélectionnées
          </p>
        </motion.div>

        {selectedVideo ? (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeVideo();
              }
            }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl aspect-video"
            >
              <div className="absolute -top-12 right-0 flex items-center gap-4">
                {videoHistory.length > 0 && (
                  <button
                    onClick={handleBack}
                    className="text-white hover:text-festival-red transition-colors flex items-center gap-2"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Retour</span>
                  </button>
                )}
                <button
                  onClick={closeVideo}
                  className="text-white hover:text-festival-red transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <iframe
                className="w-full h-full rounded-xl"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              onClick={() => handleVideoSelect(video.id)}
              className="relative group overflow-visible rounded-2xl shadow-2xl transform transition-all duration-500 hover:-translate-y-2 hover:shadow-red-500/20 cursor-pointer"
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
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-full bg-festival-red flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <h3 className="text-white font-gilroy text-xl md:text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{video.title}</h3>
                      </div>
                      <p className="text-gray-200 text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">{video.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
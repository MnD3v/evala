"use client";

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { locations } from '../../data/locations';
import Navbar from '../../components/navbar';

export default function LocationDetailPage({ params }: { params: { id: string } }) {
  const locationId = parseInt(params.id);
  const location = locations.find(loc => loc.id === locationId);

  if (!location) {
    notFound();
  }

  const getLocationCategory = (name: string) => {
    if (name.includes('Campement')) return 'Histoire';
    if (name.includes('Hotel')) return 'Hébergement';
    if (name.includes('Kouka')) return 'Nature';
    if (name.includes('Monument')) return 'Patrimoine';
    if (name.includes('Palais')) return 'Culture';
    if (name.includes('FOURNEAUX')) return 'Industrie';
    return 'Tourisme';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black font-poppins">
      <Navbar />

      {/* Header avec bouton retour */}

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8 ">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Conteneur principal avec effet glassmorphism */}
            <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-lg rounded-3xl border border-white/20 overflow-hidden shadow-2xl mt-20">
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
                      <span className="text-evala text-sm font-medium">{getLocationCategory(location.name)}</span>
                    </motion.div>
                    <motion.h1 
                      className="text-3xl md:text-5xl font-gilroy text-white mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {location.name}
                    </motion.h1>
                    <motion.p 
                      className="text-gray-400 text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Région de Kara, Togo
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
                      {locations.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            idx === locationId - 1 ? 'bg-evala w-8' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-white/70 text-sm ml-3">
                      {locationId} / {locations.length}
                    </span>
                  </motion.div>
                </div>

                {/* Image principale */}
                <motion.div 
                  className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl mb-8 group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <img
                    src={location.mainImage}
                    alt={location.name}
                    className="object-cover object-center w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay gradient au hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Effet de brillance */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </motion.div>
                
                {/* Description avec style moderne */}
                <motion.div 
                  className="relative mb-8"
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
                  
                  <div className="bg-gradient-to-r from-black/40 via-black/60 to-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light text-center">
                      {location.description}
                    </p>
                  </div>
                </motion.div>

                {/* Galerie d'images */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <h2 className="text-2xl md:text-3xl font-gilroy text-white mb-6 text-center">
                    Galerie <span className="text-evala">Photos</span>
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {location.images.map((image, index) => (
                      <motion.div
                        key={index}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl group cursor-pointer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <img
                          src={image}
                          alt={`${location.name} - Image ${index + 1}`}
                          className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-110"
                        />
                        
                        {/* Overlay avec compteur */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/70 text-white text-sm">
                            {index + 1} / {location.images.length}
                          </div>
                        </div>

                        {/* Effet de brillance */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Navigation vers autres destinations */}
                <motion.div
                  className="mt-12 pt-8 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    {locationId > 1 && (
                      <Link
                        href={`/decouvrir/${locationId - 1}`}
                        className="group flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300"
                      >
                        <ArrowLeft className="w-4 h-4 text-evala" />
                        <span className="text-white group-hover:text-evala transition-colors">
                          Destination précédente
                        </span>
                      </Link>
                    )}
                    
                    <Link 
                      href="/#decouvrir"
                      className="px-8 py-3 bg-evala text-white rounded-full hover:bg-evala/80 transition-colors font-medium"
                    >
                      Voir toutes les destinations
                    </Link>
                    
                    {locationId < locations.length && (
                      <Link
                        href={`/decouvrir/${locationId + 1}`}
                        className="group flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300"
                      >
                        <span className="text-white group-hover:text-evala transition-colors">
                          Destination suivante
                        </span>
                        <ArrowLeft className="w-4 h-4 text-evala rotate-180" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 
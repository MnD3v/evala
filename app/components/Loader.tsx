"use client";

import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  isLoading?: boolean;
}

export default function Loader({ isLoading = true }: LoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-gradient-to-br from-black via-orange-900/20 to-black flex items-center justify-center z-50 overflow-hidden"
        >
          {/* Particules de poussière flottantes */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-600/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                  opacity: [0, 0.7, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Cercles décoratifs représentant les spectateurs */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-evala/10 to-yellow-600/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-yellow-600/10 to-evala/10 rounded-full blur-3xl"
            />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Container principal */}
            <div className="relative flex flex-col items-center px-4">
              
              {/* Arène de lutte traditionnelle */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 mb-6 md:mb-8">
                {/* Sol de l'arène - terre battue */}
                <motion.div
                  className="absolute inset-2 md:inset-4 rounded-full"
                  style={{
                    background: "radial-gradient(circle, #8B4513 0%, #654321 50%, #3E2723 100%)",
                    boxShadow: "inset 0 4px 20px rgba(0,0,0,0.5), 0 0 40px rgba(139, 69, 19, 0.3)",
                  }}
                  animate={{
                    boxShadow: [
                      "inset 0 4px 20px rgba(0,0,0,0.5), 0 0 40px rgba(139, 69, 19, 0.3)",
                      "inset 0 4px 20px rgba(0,0,0,0.3), 0 0 60px rgba(139, 69, 19, 0.5)",
                      "inset 0 4px 20px rgba(0,0,0,0.5), 0 0 40px rgba(139, 69, 19, 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Motifs traditionnels sur le bord */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 md:w-4 md:h-4 bg-gradient-to-r from-evala to-yellow-600 rounded-sm"
                    style={{
                      top: "50%",
                      left: "50%",
                      transformOrigin: "0 0",
                    }}
                    animate={{
                      rotate: [i * 45, i * 45 + 360],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                ))}

                {/* Lutteur 1 - Position gauche */}
                <motion.div
                  className="absolute w-10 h-12 md:w-16 md:h-20 left-8 md:left-16 top-1/2 transform -translate-y-1/2"
                  animate={{
                    x: [0, 15, 0],
                    rotate: [0, -15, 0],
                    scale: [1, 0.95, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* Corps du lutteur */}
                  <div className="relative w-full h-full">
                    {/* Tête */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-b from-yellow-800 to-yellow-900 rounded-full" />
                    {/* Torse */}
                    <div className="absolute top-2 md:top-3 left-1/2 transform -translate-x-1/2 w-5 h-6 md:w-8 md:h-10 bg-gradient-to-b from-evala to-orange-700 rounded-lg" />
                    {/* Bras gauche */}
                    <motion.div 
                      className="absolute top-2 md:top-4 left-0 md:left-1 w-2 h-5 md:w-3 md:h-8 bg-gradient-to-b from-evala to-orange-700 rounded-full"
                      animate={{ rotate: [-20, 20, -20] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    {/* Bras droit */}
                    <motion.div 
                      className="absolute top-2 md:top-4 right-0 md:right-1 w-2 h-5 md:w-3 md:h-8 bg-gradient-to-b from-evala to-orange-700 rounded-full"
                      animate={{ rotate: [20, -20, 20] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    />
                    {/* Jambes */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-5 md:w-6 md:h-8 bg-gradient-to-b from-yellow-800 to-yellow-900 rounded-b-lg" />
                  </div>
                </motion.div>

                {/* Lutteur 2 - Position droite */}
                <motion.div
                  className="absolute w-10 h-12 md:w-16 md:h-20 right-8 md:right-16 top-1/2 transform -translate-y-1/2"
                  animate={{
                    x: [0, -15, 0],
                    rotate: [0, 15, 0],
                    scale: [1, 0.95, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  {/* Corps du lutteur */}
                  <div className="relative w-full h-full">
                    {/* Tête */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-b from-yellow-800 to-yellow-900 rounded-full" />
                    {/* Torse */}
                    <div className="absolute top-2 md:top-3 left-1/2 transform -translate-x-1/2 w-5 h-6 md:w-8 md:h-10 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-lg" />
                    {/* Bras gauche */}
                    <motion.div 
                      className="absolute top-2 md:top-4 left-0 md:left-1 w-2 h-5 md:w-3 md:h-8 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-full"
                      animate={{ rotate: [20, -20, 20] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    />
                    {/* Bras droit */}
                    <motion.div 
                      className="absolute top-2 md:top-4 right-0 md:right-1 w-2 h-5 md:w-3 md:h-8 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-full"
                      animate={{ rotate: [-20, 20, -20] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
                    />
                    {/* Jambes */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-5 md:w-6 md:h-8 bg-gradient-to-b from-yellow-800 to-yellow-900 rounded-b-lg" />
                  </div>
                </motion.div>

                {/* Effet de choc au centre */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                >
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-evala/60 to-yellow-600/60 rounded-full blur-sm" />
                </motion.div>
              </div>

              {/* Logo EVALA animé */}
              <motion.div
                className="mb-4 md:mb-6"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="relative flex items-center justify-center">
                  <motion.span
                    className="font-mercado text-4xl md:text-6xl text-evala mr-1"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(255, 107, 53, 0.5)",
                        "0 0 20px rgba(255, 107, 53, 0.8)",
                        "0 0 10px rgba(255, 107, 53, 0.5)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    E
                  </motion.span>
                  <motion.span
                    className="font-mercado text-4xl md:text-6xl text-yellow-500 mr-1"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(255, 193, 7, 0.5)",
                        "0 0 20px rgba(255, 193, 7, 0.8)",
                        "0 0 10px rgba(255, 193, 7, 0.5)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.2,
                    }}
                  >
                    V
                  </motion.span>
                  <motion.span
                    className="font-mercado text-4xl md:text-6xl text-orange-500 mr-1"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(255, 152, 0, 0.5)",
                        "0 0 20px rgba(255, 152, 0, 0.8)",
                        "0 0 10px rgba(255, 152, 0, 0.5)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.4,
                    }}
                  >
                    A
                  </motion.span>
                  <motion.span
                    className="font-mercado text-4xl md:text-6xl text-red-500 mr-1"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(239, 68, 68, 0.5)",
                        "0 0 20px rgba(239, 68, 68, 0.8)",
                        "0 0 10px rgba(239, 68, 68, 0.5)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.6,
                    }}
                  >
                    L
                  </motion.span>
                  <motion.span
                    className="font-mercado text-4xl md:text-6xl text-orange-500"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(255, 152, 0, 0.5)",
                        "0 0 20px rgba(255, 152, 0, 0.8)",
                        "0 0 10px rgba(255, 152, 0, 0.5)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.8,
                    }}
                  >
                    A
                  </motion.span>
                </div>
              </motion.div>

              {/* Texte de chargement */}
              <motion.div
                className="text-center px-4"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.h3 
                  className="text-lg md:text-2xl font-gilroy bg-gradient-to-r from-evala via-yellow-500 to-orange-500 bg-clip-text text-transparent mb-2"
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                >
                  Préparation du Combat
                </motion.h3>
                
                <motion.p 
                  className="text-gray-400 text-xs md:text-sm mb-4 font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Les lutteurs s'échauffent dans l'arène sacrée...
                </motion.p>

                {/* Barre de progression stylisée */}
                <div className="w-48 md:w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto">
                  <motion.div
                    className="h-full bg-gradient-to-r from-evala via-yellow-500 to-orange-500 rounded-full"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>

              {/* Éléments traditionnels décoratifs */}
              <div className="absolute -bottom-6 md:-bottom-10 left-0 right-0 flex justify-center space-x-4 md:space-x-8">
                {/* Tambours traditionnels */}
                <motion.div
                  className="w-4 h-5 md:w-6 md:h-8 bg-gradient-to-b from-yellow-800 to-yellow-900 rounded-full"
                  animate={{
                    scaleY: [1, 0.9, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="w-4 h-5 md:w-6 md:h-8 bg-gradient-to-b from-yellow-800 to-yellow-900 rounded-full"
                  animate={{
                    scaleY: [1, 0.9, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.25,
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 
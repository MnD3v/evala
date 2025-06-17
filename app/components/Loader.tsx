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
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative"
          >
            {/* Cercles décoratifs en arrière-plan */}
            <div className="absolute -inset-10">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-0 right-0 w-32 h-32 bg-festival-red/20 rounded-full blur-2xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute bottom-0 left-0 w-32 h-32 bg-festival-yellow/20 rounded-full blur-2xl"
              />
            </div>

            {/* Container du loader */}
            <div className="relative flex flex-col items-center">
              {/* Animation des lutteurs */}
              <div className="relative w-32 h-32">
                {/* Arène stylisée */}
                <motion.div
                  className="absolute inset-0 border-4 border-festival-yellow/30 rounded-full"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Premier lutteur */}
                <motion.div
                  className="absolute w-8 h-12 bg-gradient-to-b from-festival-red to-festival-yellow"
                  style={{
                    clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
                    left: "20%",
                    top: "30%",
                  }}
                  animate={{
                    x: [0, 10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Deuxième lutteur */}
                <motion.div
                  className="absolute w-8 h-12 bg-gradient-to-b from-festival-yellow to-festival-red"
                  style={{
                    clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
                    right: "20%",
                    top: "30%",
                  }}
                  animate={{
                    x: [0, -10, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Texte "Chargement" avec animation */}
              <motion.div
                className="mt-8 text-center"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.h3 
                  className="text-xl font-semibold bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red bg-clip-text text-transparent"
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
                  Chargement
                </motion.h3>
                <motion.p 
                  className="mt-2 text-sm text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Préparation de votre expérience Evala...
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 
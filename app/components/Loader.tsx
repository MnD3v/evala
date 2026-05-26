"use client";

import { motion, AnimatePresence } from "framer-motion";

const LETTERS = [
  { char: "E", color: "#CE1126" },
  { char: "V", color: "#FFCD00" },
  { char: "A", color: "#006A4E" },
  { char: "L", color: "#FFCD00" },
  { char: "A", color: "#CE1126" },
];

interface LoaderProps {
  isLoading?: boolean;
}

export default function Loader({ isLoading = true }: LoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50"
        >
          {/* Lettres */}
          <div className="flex items-end gap-0.5 md:gap-1 mb-10">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                className="font-newsport italic leading-none select-none"
                style={{
                  color: letter.color,
                  fontSize: "clamp(4rem, 16vw, 11rem)",
                }}
                /* Apparition initiale */
                initial={{ opacity: 0, y: 50 }}
                animate={[
                  /* Phase 1 : entrée */
                  {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.7,
                      delay: i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                  /* Phase 2 : vague douce en boucle (démarre après l'entrée) */
                  {
                    y: [0, -12, 0],
                    transition: {
                      duration: 1.8,
                      delay: 0.6 + i * 0.12,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  },
                ]}
              >
                {letter.char}
              </motion.span>
            ))}
          </div>

          {/* Barre tricolore */}
          <motion.div
            className="flex overflow-hidden rounded-full"
            style={{ width: 80, height: 2 }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex-1" style={{ background: "#CE1126" }} />
            <div className="flex-1" style={{ background: "#FFCD00" }} />
            <div className="flex-1" style={{ background: "#006A4E" }} />
          </motion.div>

          {/* Texte discret */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.35, 0.35, 0] }}
            transition={{ duration: 2.5, delay: 1, repeat: Infinity, ease: "easeInOut" }}
            className="mt-6 text-black/40 text-[11px] uppercase"
          >
            Chargement
          </motion.p>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

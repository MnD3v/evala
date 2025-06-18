"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Accueil", href: "/" },
    { name: "Programme", href: "#programme" },
    { name: "Galerie", href: "#galerie" },
    { name: "Contact", href: "#contact" },
  ];

  // Fonction de gestion du clic sur un lien
  const handleMenuClick = (href: string) => (e: React.MouseEvent) => {
    if (href === "/") {
      // Accueil : toujours router vers la home
      if (pathname !== "/") {
        e.preventDefault();
        router.push("/");
      }
      setIsMobileMenuOpen(false);
      return;
    }
    if (pathname === "/") {
      // Sur la home : scroll natif
      setIsMobileMenuOpen(false);
      return;
    } else {
      // Sur une autre page : router vers /#section
      e.preventDefault();
      router.push(`/${href}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/90 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 md:h-32">
            {/* Logo */}
            <motion.a
              href="/"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-white flex items-center"
            >
              <img src="/icons/logo.png" alt="Evala" className="h-10 md:h-14 mr-3" />
            </motion.a>

            {/* Navigation desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href === "/" ? "/" : `/${item.href}`}
                  className="text-gray-300 hover:text-evala transition-colors text-sm uppercase tracking-wider"
                  whileHover={{ y: -2 }}
                  onClick={handleMenuClick(item.href)}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* Bouton menu mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-sm md:hidden pt-20"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col space-y-6">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href === "/" ? "/" : `/${item.href}`}
                    className="text-gray-300 hover:text-evala transition-colors text-lg text-center"
                    onClick={handleMenuClick(item.href)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 
"use client";

import Navbar from "./components/navbar";
import Hero from "./components/hero";
import EmploisSection from "./components/EmploisSection";
import Gallery from "./components/gallery";
import LiveStream from "./components/live-stream";
import Footer from "./components/footer";
import Programme from "./components/programme";
import Promotions from "./components/Promotions";
import Blog from "./blog/page";
import Contact from "./components/contact";
import Loader from "./components/Loader";
import AboutEvala from "./components/about-evala";
import EvenementsConnexes from "./components/EvenementsConnexes";
// import Highlights from "./components/highlights";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import DecouvrirKaraClient from "./components/Decouvrir-Kara";
import LogementEvala from "./components/LogementEvala";
import ActivitesBonsCoins from "./components/ActivitesBonsCoins";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un temps de chargement pour une meilleure UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="flex min-h-screen flex-col text-gray-900 font-poppins relative bg-white"
    >
      <AnimatePresence>
        {isLoading ? (
          <Loader key="loader" />
        ) : (
          <>
            <div className="relative z-0">
              {/* <DecorativeEvala /> */}
              <Navbar />
              <main className="flex-grow">
                <Hero />
                <LogementEvala />
                <AboutEvala />
                <EmploisSection />
                {/* <Services /> */}
                <Programme />
                <EvenementsConnexes />

                <Promotions />
                <ActivitesBonsCoins />
                <LiveStream />
                {/* <Highlights /> */}
                {/* <Traditions /> */}
                <Gallery />
                <DecouvrirKaraClient />
                <Blog />
                <Contact />
              </main>
              <Footer />
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

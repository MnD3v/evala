"use client";

import Navbar from "./components/navbar";
import Hero from "./components/hero";
import JobRegistration from "./components/JobRegistration";
import Gallery from "./components/gallery";
import LiveStream from "./components/live-stream";
import History from "./components/History";
import Footer from "./components/footer";
import GradientBackground from "./components/GradientBackground";
import Traditions from "./components/traditions";
import Programme from "./components/programme";
import Promotions from "./components/Promotions";
import Blog from "./blog/page";
import Contact from "./components/contact";
import Loader from "./components/Loader";
import DecorativeEvala from "./components/DecorativeEvala";
import AboutEvala from "./components/about-evala";
import Highlights from "./components/highlights";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

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
    <div className="flex min-h-screen flex-col text-white font-sans relative">
      <AnimatePresence>
        {isLoading ? (
          <Loader key="loader" />
        ) : (
          <>
            <GradientBackground />
            <div className="relative z-0">
              <DecorativeEvala />
              <Navbar />
              <main className="flex-grow">
                <Hero />
                <JobRegistration />
                {/* <Services /> */}
                <Programme />
                <Promotions />
                <LiveStream />
                <AboutEvala />
                <Highlights />
                {/* <Traditions /> */}
                <Gallery />
                <History />
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

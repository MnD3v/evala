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
import Blog from "./blog/page";
import Loader from "./components/Loader";
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
              <Navbar />
              <main className="flex-grow">
                <Hero />
                <JobRegistration />
                <Programme />
                <LiveStream />
                <Traditions />
                <Gallery />
                <History />
                <Blog />
              </main>
              <Footer />
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

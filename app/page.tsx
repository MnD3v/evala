import { Metadata } from "next";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Gallery from "./components/gallery";
import LiveStream from "./components/live-stream";
import History from "./components/History";
import Footer from "./components/footer";
import GradientBackground from "./components/GradientBackground";
import Traditions from "./components/traditions";
import Programme from "./components/programme";
import Blog from "./blog/page";

export const metadata: Metadata = {
  title: "Evala - Fête traditionnelle du Togo",
  description: "Découvrez les Evala, une fête traditionnelle majeure du Togo, célébrant l'initiation des jeunes Kabyè à travers la lutte traditionnelle",
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col text-white font-sans relative">
      <GradientBackground />
      <div className="relative z-0">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <Programme />
          <LiveStream />
          <Traditions />
          <Gallery />
          <History />
          <Blog />
        </main>
        <Footer />
      </div>
    </div>
  );
}

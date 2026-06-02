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
import AboutEvala from "./components/about-evala";
import EvenementsConnexes from "./components/EvenementsConnexes";
import LogementEvala from "./components/LogementEvala";
import ActivitesBonsCoins from "./components/ActivitesBonsCoins";
import WaveDivider from "./components/WaveDivider";
import ProfilsLutteurs from "./components/ProfilsLutteurs";
import BoutiqueEvala from "./components/BoutiqueEvala";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col text-gray-900 font-clash relative bg-white">
      <div className="relative z-0">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <ProfilsLutteurs />
          <WaveDivider color="#CE1126" />
          <LogementEvala />
          <WaveDivider color="#FFCD00" />
          <AboutEvala />
          <Programme />
          <EmploisSection />
          <WaveDivider color="#CE1126" />
          <EvenementsConnexes />
          <Promotions />
          <ActivitesBonsCoins />
          <WaveDivider />
          <LiveStream />
          <BoutiqueEvala />
          <WaveDivider color="#CE1126" />
          <Gallery />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

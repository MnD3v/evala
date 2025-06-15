import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import { GlobalStateProvider } from "./context/GlobalStateContext";

const inter = Inter({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
export const metadata: Metadata = {
  title: "Evala - Festival traditionnel Kabyè",
  description: "Découvrez le festival Evala, un rituel sacré de passage à l'âge adulte dans la tradition Kabyè. Luttes traditionnelles, cérémonies et célébrations culturelles au nord du Togo.",
  openGraph: {
    type: 'website',
    url: 'https://www.evala.tg',
    title: 'Evala - Festival traditionnel Kabyè',
    description: 'Découvrez le festival Evala, un rituel sacré de passage à l\'âge adulte dans la tradition Kabyè. Luttes traditionnelles, cérémonies et célébrations culturelles au nord du Togo.',
    images: [
      {
       url: 'https://i.ibb.co/Xk4J6ZnW/Group-6.png',
        width: 1200,
        height: 630,
        alt: 'Evala - Festival traditionnel Kabyè',
      },
    ],
  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.className} ${cinzel.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <GlobalStateProvider>
          {children}
        </GlobalStateProvider>
      </body>
    </html>
  );
}

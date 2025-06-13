import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import { GlobalStateProvider } from "./context/GlobalStateContext";

const inter = Inter({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });

export const metadata: Metadata = {
  title: "Evala - Festival traditionnel Kabyè",
  description: "Découvrez le festival Evala, un rituel sacré de passage à l'âge adulte dans la tradition Kabyè. Luttes traditionnelles, cérémonies et célébrations culturelles au nord du Togo.",
  keywords: "Evala, Kabyè, Togo, lutte traditionnelle, festival, culture africaine, Kozah, rite initiatique",
  authors: [{ name: "Evala Team" }],
  creator: "Evala Team",
  publisher: "Evala Team",
  openGraph: {
    title: "Evala - Festival traditionnel Kabyè",
    description: "Découvrez le festival Evala, un rituel sacré de passage à l'âge adulte dans la tradition Kabyè. Luttes traditionnelles, cérémonies et célébrations culturelles au nord du Togo.",
    url: "https://evala.tg",
    siteName: "Evala Festival",
    images: [
      {
        url: "https://drive.google.com/file/d/1maQJa2-GmnT2hrVDk83u-yTydCrRpZsI/view",
        width: 1200,
        height: 630,
        alt: "Festival Evala - Lutte traditionnelle Kabyè",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evala - Festival traditionnel Kabyè",
    description: "Découvrez le festival Evala, un rituel sacré de passage à l'âge adulte dans la tradition Kabyè. Luttes traditionnelles, cérémonies et célébrations culturelles au nord du Togo.",
    images: ["https://drive.google.com/file/d/1maQJa2-GmnT2hrVDk83u-yTydCrRpZsI/view"],
    creator: "@evala_festival",
    site: "@evala_festival",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#EF4444", // Rouge festival
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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

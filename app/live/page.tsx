"use client";

import Link from "next/link";


export default function LivePage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* En-tête */}
      <div className="bg-black/80 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="text-white hover:text-evala transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-evala rounded-full animate-pulse"></div>
            <span className="text-white font-semibold">EN DIRECT</span>
          </div>
        </div>
      </div>

      {/* Conteneur vidéo centré verticalement */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-7xl aspect-video px-4">
          <iframe
            src="https://www.youtube.com/embed/live_stream?channel=VOTRE_ID_CHAINE&autoplay=1"
            title="Evala en direct"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
} 
"use client";

import Link from "next/link";
import { locations } from "../data/locations";

export default function DecouvrirKaraClient() {
  return (
    <section id="decouvrir" className="py-20 bg-gradient-to-b from-black via-black/95 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-evala/5 via-transparent to-evala/5"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-6 py-2 rounded-full bg-evala/10 text-evala text-sm font-medium border border-evala/20">
              Tourisme
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-gilroy text-white mb-4">
            Découvrir <span className="text-evala">la Kara</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explorez les merveilles de la région de la Kara, berceau des traditions et de la culture togolaise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location) => (
            <Link 
              key={location.id}
              href={`/decouvrir/${location.id}`}
              className="group cursor-pointer block"
            >
              <div className="relative h-[300px] rounded-2xl overflow-hidden">
                <img
                  src={location.mainImage}
                  alt={location.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-gilroy text-white mb-2">{location.name}</h3>
                  <p className="text-gray-300 text-sm">
                    {location.description.slice(0, 100)}...
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


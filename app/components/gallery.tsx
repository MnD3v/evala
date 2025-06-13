"use client";

import Image from 'next/image';
import Link from 'next/link';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  description: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/images/evala1.jpg",
    alt: "Combat d'Evala",
    description: "Deux lutteurs s'affrontent dans un combat traditionnel"
  },
  {
    id: 2,
    src: "/images/evala2.jpg",
    alt: "Préparation Evala",
    description: "Rituel de préparation avant le combat"
  },
  {
    id: 3,
    src: "/images/evala3.jpg",
    alt: "Victoire Evala",
    description: "Célébration de la victoire"
  },
  {
    id: 4,
    src: "/images/evala4.jpg",
    alt: "Spectateurs Evala",
    description: "La foule encourageant les lutteurs"
  },
  {
    id: 5,
    src: "/images/evala5.jpg",
    alt: "Tradition Evala",
    description: "Cérémonie traditionnelle"
  },
  {
    id: 6,
    src: "/images/evala6.jpg",
    alt: "Festival Evala",
    description: "Vue d'ensemble du festival"
  }
];

export default function Gallery() {
  return (
    <>
      <section className="py-16 px-4 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-6xl font-[var(--font-cinzel)] mb-8 text-red-600 text-center">
            Qu'est ce que Evala ?
          </h2>
          
          <div className="max-w-4xl mx-auto text-white/90 space-y-8 font-montserrat">
            <p className="text-base md:text-lg leading-relaxed text-center">
              Les Evala constituent un rituel sacré de passage à l'âge adulte, profondément ancré dans la tradition Kabyè 
              de la préfecture de Kozah, au nord du Togo.
            </p>

            <div className="relative space-y-6">
              {/* Ligne verticale décorative */}
              <div className="absolute left-[21px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-red-500/50 via-red-500/20 to-red-500/50"></div>

              {/* Étapes */}
              <div className="relative pl-12 hover:pl-16 transition-all duration-300 group">
                <div className="absolute left-0 top-3 w-11 h-11 rounded-full bg-black border-2 border-red-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-red-500 font-bold">01</span>
                </div>
                <div className="bg-gradient-to-r from-black/60 to-black/40 backdrop-blur-sm p-6 rounded-2xl border-l-4 border-red-500">
                  <h3 className="text-red-500 font-display text-xl mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    Préparation Spirituelle
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Les jeunes initiés commencent par des rituels de purification et une préparation spirituelle intense. 
                    Ils reçoivent les enseignements des anciens sur les valeurs traditionnelles et l'histoire de leur peuple.
                  </p>
                </div>
              </div>

              <div className="relative pl-12 hover:pl-16 transition-all duration-300 group">
                <div className="absolute left-0 top-3 w-11 h-11 rounded-full bg-black border-2 border-red-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-red-500 font-bold">02</span>
                </div>
                <div className="bg-gradient-to-r from-black/60 to-black/40 backdrop-blur-sm p-6 rounded-2xl border-l-4 border-red-500">
                  <h3 className="text-red-500 font-display text-xl mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    Entraînement Physique
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Un entraînement rigoureux de plusieurs mois forge leur corps et leur esprit. Les techniques de lutte 
                    traditionnelle sont transmises par d'anciens champions, qui partagent leur expérience et leur sagesse.
                  </p>
                </div>
              </div>

              <div className="relative pl-12 hover:pl-16 transition-all duration-300 group">
                <div className="absolute left-0 top-3 w-11 h-11 rounded-full bg-black border-2 border-red-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-red-500 font-bold">03</span>
                </div>
                <div className="bg-gradient-to-r from-black/60 to-black/40 backdrop-blur-sm p-6 rounded-2xl border-l-4 border-red-500">
                  <h3 className="text-red-500 font-display text-xl mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    Épreuves de Courage
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Les candidats affrontent des épreuves physiques et mentales qui testent leur courage, leur endurance et leur détermination. 
                    Ces défis transformateurs forgent leur caractère et leur résilience.
                  </p>
                </div>
              </div>

              <div className="relative pl-12 hover:pl-16 transition-all duration-300 group">
                <div className="absolute left-0 top-3 w-11 h-11 rounded-full bg-black border-2 border-red-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-red-500 font-bold">04</span>
                </div>
                <div className="bg-gradient-to-r from-black/60 to-black/40 backdrop-blur-sm p-6 rounded-2xl border-l-4 border-red-500">
                  <h3 className="text-red-500 font-display text-xl mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    Consécration
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Le festival culmine avec une semaine de combats rituels, accompagnés de danses et chants traditionnels. 
                    Les participants qui triomphent sont célébrés et reconnus comme des hommes accomplis par toute la communauté.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mt-12 p-6 bg-gradient-to-r from-red-500/10 to-transparent rounded-2xl border-l-4 border-red-500">
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-black rounded-full border-2 border-red-500 flex items-center justify-center">
                <span className="text-red-500 text-2xl">"</span>
              </div>
              <p className="text-sm text-gray-300 italic">
                "À travers les Evala, les jeunes garçons ne deviennent pas seulement des hommes, 
                ils deviennent les gardiens de notre héritage culturel, perpétuant une tradition millénaire 
                qui forge le caractère et unit la communauté."
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bebas text-red-600 tracking-wider">
              Galerie Photo
            </h2>
            <Link
              href="/gallery"
              className="px-6 py-2 bg-red-600 text-white rounded-full font-montserrat text-sm hover:bg-red-700 transition-colors"
            >
              Voir tout
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {galleryImages.map((image) => (
              <Link
                key={image.id}
                href={`/gallery/${image.id}`}
                className="relative group overflow-visible rounded-2xl shadow-2xl transform transition-all duration-500 hover:-translate-y-2 hover:shadow-red-500/20"
              >
                {/* Cadre décoratif avec effet de base et transition au hover */}
                <div className="absolute -inset-2 bg-gradient-to-r from-gray-500/0 via-gray-500/20 to-gray-500/0 rounded-2xl transition-all duration-500 blur-sm group-hover:from-red-500/0 group-hover:via-red-500/30 group-hover:to-red-500/0"></div>
                
                {/* Coins décoratifs avec transition de couleur et forme */}
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-gray-400 rounded-tr-xl transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:border-red-500 group-hover:rounded-tr-2xl"></div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-gray-400 rounded-bl-xl transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:border-red-500 group-hover:rounded-bl-2xl"></div>
                
                {/* Points décoratifs avec transition de taille et couleur */}
                <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-gray-400 rounded-full transition-all duration-500 group-hover:w-2 group-hover:h-2 group-hover:bg-red-500"></div>
                <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-gray-400 rounded-full transition-all duration-500 group-hover:w-2 group-hover:h-2 group-hover:bg-red-500"></div>

                <div className="aspect-w-16 aspect-h-9 relative h-[250px] md:h-[300px] bg-gradient-to-br from-black/5 to-black/20 rounded-2xl p-1">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                      className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-white font-teko text-xl md:text-2xl mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{image.alt}</h3>
                        <p className="text-gray-200 text-xs md:text-sm font-montserrat opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">{image.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
} 
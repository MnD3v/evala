"use client";

import Link from "next/link";

export default function JobRegistration() {
    return (
        <section className="w-full py-16 bg-gradient-to-b from-black to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white font-poppins mb-4">
                        Opportunités de Job
                    </h2>
                    <p className="text-lg text-gray-300 font-poppins mb-8 max-w-2xl mx-auto">
                        Vous êtes à la recherche d'un job Evala ? Inscrivez-vous dans notre base de données de talents. 
                        Nous mettons en relation les entreprises partenaires d'Evala avec des profils qualifiés qui correspondent à leurs besoins.
                    </p>
                    <Link 
                        href="https://docs.google.com/forms/d/e/1FAIpQLSd_eKJwvNu87OUjfhqlCnYNZe9CfMvpPxfzx56RSsKIaWMgsg/viewform?usp=dialog"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center px-12 py-6 text-lg font-medium text-white rounded-xl transition-all duration-500 overflow-hidden"
                    >
                        {/* Effet de liquide animé */}
                        <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-red-800 to-red-900 animate-gradient-x"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/30 via-transparent to-transparent animate-pulse"></div>
                        
                        {/* Effet de splash */}
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,_var(--tw-gradient-stops))] from-red-500/40 via-transparent to-transparent animate-splash"></div>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,_var(--tw-gradient-stops))] from-red-500/40 via-transparent to-transparent animate-splash-delayed"></div>
                        </div>

                        {/* Effet de brillance */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine"></div>

                        {/* Contenu du bouton */}
                        <div className="relative flex items-center space-x-3 px-6 py-3 rounded-lg border-2 border-red-500/50 backdrop-blur-sm group-hover:border-red-400 transition-all duration-300">
                            <span className="relative z-10 font-poppins font-semibold tracking-wide">
                                Déposer mon profil
                            </span>
                            <svg 
                                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                                />
                            </svg>
                        </div>

                        {/* Effet de hover */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                </div>
            </div>
        </section>
    );
} 
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
                    <div className="relative inline-block">
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                        <Link 
                            href="https://docs.google.com/forms/d/e/1FAIpQLSd_eKJwvNu87OUjfhqlCnYNZe9CfMvpPxfzx56RSsKIaWMgsg/viewform?usp=dialog"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex items-center gap-2 px-8 py-4 bg-black rounded-xl leading-none border-2 border-red-500/20 hover:border-red-500/50 transition-all duration-300"
                        >
                            <span className="relative bg-gradient-to-b from-red-600 to-red-800 bg-clip-text text-transparent text-xl font-bold font-poppins">
                                Déposer mon profil
                            </span>
                            <svg
                                className="w-5 h-5 text-red-500 transform transition-transform duration-300 ease-out group-hover:translate-x-1"
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
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/20 to-red-900/20 blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
} 
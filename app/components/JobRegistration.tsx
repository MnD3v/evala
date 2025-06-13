"use client";

export default function JobRegistration() {
    return (
        <section className="relative py-20 overflow-hidden">
            {/* Cercles décoratifs */}
            <div className="absolute top-0 right-0 -mr-20 w-80 h-80 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red rounded-full opacity-20 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 -ml-20 w-80 h-80 bg-gradient-to-r from-festival-yellow via-festival-red to-festival-yellow rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display mb-6 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red bg-clip-text text-transparent">
                        Inscrivez-vous dans notre base de talents
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red mx-auto mb-8"></div>
                    <p className="text-xl text-gray-300 mb-8">
                        Rejoignez notre base de données de talents et soyez mis en relation avec les entreprises partenaires des Evala
                    </p>
                </div>

                <div className="max-w-lg mx-auto">
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSd_eKJwvNu87OUjfhqlCnYNZe9CfMvpPxfzx56RSsKIaWMgsg/viewform?usp=dialog"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <div className="relative bg-black/30 backdrop-blur-sm border border-white/10 p-8 rounded-xl hover:border-festival-yellow/30 transition-all duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-semibold bg-gradient-to-r from-white via-festival-yellow to-white bg-clip-text text-transparent">
                                    Formulaire d'inscription
                                </h3>
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-festival-red to-festival-yellow p-[2px]">
                                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                        <svg className="w-6 h-6 text-festival-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-400 mb-4">
                                Remplissez le formulaire pour rejoindre notre base de données de talents
                            </p>
                            <div className="flex items-center text-sm text-gray-500">
                                <span>Temps estimé: 5 minutes</span>
                                <span className="mx-2">•</span>
                                <span>Google Forms</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
} 
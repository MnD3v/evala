"use client";

export default function JobRegistration() {
    return (
        <section className="relative py-20 overflow-hidden">
            {/* Cercles décoratifs */}
            <div className="absolute top-0 right-0 -mr-20 w-80 h-80 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red rounded-full opacity-20 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 -ml-20 w-80 h-80 bg-gradient-to-r from-festival-yellow via-festival-red to-festival-yellow rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-poppins font-bold  text-eorange m-4">
                        Job EVALA
                    </h2>
                    <div className="w-24 h-px bg-eorange mx-auto mb-8"></div>
                    <p className="text-base md:text-lg text-gray-300 mb-8">
                        Rejoignez notre base de données de talents et <span className="font-bold">soyez mis en relation avec les entreprises partenaires</span> des Evala
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
                        <div className="relative text-black bg-white backdrop-blur-sm border border-white/10 p-8 rounded-[3rem] hover:border-festival-yellow/30 transition-all duration-300">
                            <div className="flex items-center justify-between mb-6">
                               <div style={{ maxWidth: 'calc(100vw - 180px)' }}>
                               <h3 className="text-2xl font-bold  text-orange-700">
                                    Formulaire d'inscription
                                </h3>
                               </div>
                              
                            </div>
                            <p className="text-black/50 mb-4">
                                Remplissez le formulaire pour rejoindre notre base de données de talents
                            </p>
                            <div className="flex items-center text-base text-black">
                          <p>
                          <span className="text-black font-gilroy">Google Forms</span>
                            <span className="mx-2 text-black">•</span>

                                <span className="text-black">Temps estimé: 5 '</span>
                          </p>
                                
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
} 
"use client";

import { motion } from 'framer-motion'
import React from 'react'
import { FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa'

const Contact = () => {
    const contacts = [
        {
            icon: <FaWhatsapp className="text-4xl text-red-500" />,
            title: "WhatsApp",
            description: "+228 92 87 10 01",
            link: "https://wa.me/22892871001"
        },
        {
            icon: <FaEnvelope className="text-4xl text-red-500" />,
            title: "Email",
            description: "tg.evala@gmail.com",  
            link: "mailto:tg.evala@gmail.com"
        },
        {
            icon: <FaPhone className="text-4xl text-red-500" />,
            title: "Téléphone",
            description: "+228 98 78 45 89",
            link: "tel:+22898784589"
        }
    ]

    return (
        <section className="py-20 relative overflow-hidden" id="contact">
            {/* Motif d'arrière-plan avec animation */}
            <motion.div 
                className="absolute inset-0 opacity-5"
                animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                    duration: 50,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear"
                }}
            >
                <div className="w-full h-full" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }}></div>
            </motion.div>

            <div className="container mx-auto px-4 relative z-10">
                {/* En-tête de section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-gilroy mb-4 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                        Contactez-nous
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 mx-auto mb-6"></div>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Notre équipe est disponible pour répondre à toutes vos questions sur le festival Evala
                    </p>
                </motion.div>

                {/* Grille de contacts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {contacts.map((contact, index) => (
                        <motion.div
                            key={contact.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 rounded-2xl transition-all duration-300 group-hover:opacity-100 opacity-0 bg-gradient-to-r from-red-500/5 via-yellow-500/5 to-red-500/5"></div>
                            
                            <a
                                href={contact.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-8 rounded-2xl bg-black/20 backdrop-blur-sm border border-red-500/20 relative z-10 
                                         transition-all duration-300 hover:-translate-y-2 hover:border-red-500/40 
                                         group-hover:shadow-[0_0_2rem_-0.5rem_rgba(239,68,68,0.2)]
                                         after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-r after:from-red-500/0 after:via-yellow-500/5 after:to-red-500/0 after:opacity-0 after:transition-opacity after:duration-500 group-hover:after:opacity-100"
                            >
                                <div className="inline-block p-3 mb-6 rounded-xl border border-red-500/20 group-hover:border-red-500/40 transition-all duration-300
                                            group-hover:shadow-[0_0_1rem_-0.25rem_rgba(239,68,68,0.3)]">
                                    {contact.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-white">
                                    {contact.title}
                                </h3>
                                <p className="text-gray-300 mb-4">
                                    {contact.description}
                                </p>
                                <div className="flex items-center text-sm text-gray-400 group-hover:text-white transition-colors duration-300">
                                    <span>Contacter</span>
                                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Contact
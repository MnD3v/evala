"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Festival Evala",
      links: [
        { label: "Programme", href: "/#programme" },
        { label: "Traditions", href: "/#traditions" },
        { label: "Histoire", href: "/#histoire" },
        { label: "Galerie", href: "/#galerie" },
      ],
    },
    {
      title: "Informations",
      links: [
        { label: "Hébergement", href: "/hebergement" },
        { label: "Transport", href: "/transport" },
        { label: "Emplois", href: "/jobs" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "WhatsApp: +228 92 87 10 01", href: "https://wa.me/22892871001" },
        { label: "Email: tg.evala@gmail.com", href: "mailto:tg.evala@gmail.com" },
        { label: "Tél: +228 98 78 45 89", href: "tel:+22898784589" },
      ],
    },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "https://facebook.com/evala", label: "Facebook" },
    { icon: FaInstagram, href: "https://instagram.com/evala", label: "Instagram" },
    { icon: FaYoutube, href: "https://youtube.com/evala", label: "YouTube" },
    { icon: FaWhatsapp, href: "https://wa.me/22892871001", label: "WhatsApp" },
  ];

  return (
    <footer className="bg-black relative overflow-hidden">
      {/* Cercles décoratifs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-festival-red/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-festival-yellow/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Logo et description */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-mercado mb-6 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red bg-clip-text text-transparent"
            animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            EVALA
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Le Festival Evala, un rite initiatique sacré des Kabyè, célèbre la tradition de la lutte togolaise dans la région de Kozah.
          </p>
        </div>

        {/* Sections de liens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-festival-red transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Réseaux sociaux */}
        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-festival-red transition-colors duration-300"
              aria-label={social.label}
            >
              <social.icon className="w-6 h-6" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          <p>© {currentYear} Festival Evala. Tous droits réservés.</p>
          <p className="mt-2">
            Développé avec passion par{" "}
            <a
              href="https://equilibre.tg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-festival-red hover:text-festival-yellow transition-colors duration-300"
            >
              Equilibre
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
} 
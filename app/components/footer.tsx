"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Festival Evala",
      color: "#CE1126",
      links: [
        { label: "Programme",  href: "/#programme" },
        { label: "Traditions", href: "/#traditions" },
        { label: "Histoire",   href: "/#histoire" },
        { label: "Galerie",    href: "/#galerie" },
      ],
    },
    {
      title: "Informations",
      color: "#006A4E",
      links: [
        { label: "Hébergement", href: "/hebergement" },
        { label: "Transport",   href: "/transport" },
        { label: "Emplois",     href: "/jobs" },
        { label: "Blog",        href: "/blog" },
      ],
    },
    {
      title: "Contact",
      color: "#FFCD00",
      links: [
        { label: "WhatsApp: +228 90 77 88 80", href: "https://wa.me/22890778880" },
        { label: "Email: tg.evala@gmail.com",  href: "mailto:tg.evala@gmail.com" },
        { label: "Tél: +228 98 78 45 89",      href: "tel:+22898784589" },
      ],
    },
  ];

  const socialLinks = [
    { icon: FaFacebook,  href: "https://facebook.com/evala",  label: "Facebook",  hoverColor: "#1877F2" },
    { icon: FaInstagram, href: "https://instagram.com/evala", label: "Instagram", hoverColor: "#CE1126" },
    { icon: FaYoutube,   href: "https://youtube.com/evala",   label: "YouTube",   hoverColor: "#CE1126" },
    { icon: FaWhatsapp,  href: "https://wa.me/22890778880",   label: "WhatsApp",  hoverColor: "#006A4E" },
  ];

  return (
    <footer className="bg-gray-50 relative overflow-hidden">

      {/* Bande tricolore en haut */}
      <div className="flex h-1">
        <div className="flex-1" style={{ background: "#CE1126" }} />
        <div className="flex-1" style={{ background: "#FFCD00" }} />
        <div className="flex-1" style={{ background: "#006A4E" }} />
      </div>

      <div className="container mx-auto px-6 md:px-8 py-16 relative z-10 max-w-6xl">

        {/* Logo */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            className="mb-4"
          >
            <span className="font-mercado font-bold text-4xl md:text-5xl tracking-[-0.06em]" style={{ color: "#006A4E" }}>E</span>
            <span className="font-mercado font-bold text-4xl md:text-5xl tracking-[-0.06em]" style={{ color: "#FFCD00" }}>V</span>
            <span className="font-mercado font-bold text-4xl md:text-5xl tracking-[-0.06em]" style={{ color: "#CE1126" }}>A</span>
            <span className="font-mercado font-bold text-4xl md:text-5xl tracking-[-0.06em]" style={{ color: "#006A4E" }}>L</span>
            <span className="font-mercado font-bold text-4xl md:text-5xl tracking-[-0.06em]" style={{ color: "#FFCD00" }}>A</span>
          </motion.div>
          <div className="flex justify-center mb-6">
            <div className="flex w-16 h-0.5 overflow-hidden rounded-full">
              <div className="flex-1" style={{ background: "#CE1126" }} />
              <div className="flex-1" style={{ background: "#FFCD00" }} />
              <div className="flex-1" style={{ background: "#006A4E" }} />
            </div>
          </div>
          <p className="text-black max-w-2xl mx-auto text-sm leading-relaxed">
            Le Festival Evala, un rite initiatique sacré des Kabyè, célèbre la tradition de la lutte togolaise dans la région de Kozah.
          </p>
        </div>

        {/* Liens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold mb-4" style={{ color: section.color }}>{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-black hover:text-black transition-colors duration-200 text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Réseaux sociaux */}
        <div className="flex justify-center space-x-5 mb-10">
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-black/[0.04] border border-black/[0.06] flex items-center justify-center text-black transition-all duration-200 hover:scale-110"
              aria-label={social.label}
              style={{} as React.CSSProperties}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = social.hoverColor; (e.currentTarget as HTMLAnchorElement).style.borderColor = social.hoverColor + "40"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = ""; (e.currentTarget as HTMLAnchorElement).style.borderColor = ""; }}
            >
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-black text-xs">
          <p>© {currentYear} Festival Evala. Tous droits réservés.</p>
          <p className="mt-1.5">
            Développé avec passion par{" "}
            <a href="https://equilibre.tg" target="_blank" rel="noopener noreferrer" style={{ color: "#CE1126" }} className="hover:opacity-70 transition-opacity duration-200">
              Equilibre
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}

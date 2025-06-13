"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "À propos",
      links: [
        { label: "Notre histoire", href: "/about" },
        { label: "Notre équipe", href: "/team" },
        { label: "Nos valeurs", href: "/values" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Développement web", href: "/services#web" },
        { label: "Design UI/UX", href: "/services#design" },
        { label: "Marketing digital", href: "/services#marketing" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "Nous contacter", href: "/contact" },
        { label: "Support", href: "/support" },
        { label: "FAQ", href: "/faq" },
      ],
    },
  ];

  const socialLinks = [
    { label: "Facebook", href: "#", icon: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" },
    { label: "Twitter", href: "#", icon: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" },
    { label: "Instagram", href: "#", icon: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c2.088 0 2.33.008 3.158.045.764.035 1.18.163 1.457.27.367.143.63.314.905.59.276.275.447.538.59.905.107.277.235.693.27 1.457.037.828.045 1.07.045 3.158s-.008 2.33-.045 3.158c-.035.764-.163 1.18-.27 1.457-.143.367-.314.63-.59.905-.275.276-.538.447-.905.59-.277.107-.693.235-1.457.27-.828.037-1.07.045-3.158.045s-2.33-.008-3.158-.045c-.764-.035-1.18-.163-1.457-.27-.367-.143-.63-.314-.905-.59-.276-.275-.447-.538-.59-.905-.107-.277-.235-.693-.27-1.457-.037-.828-.045-1.07-.045-3.158s.008-2.33.045-3.158c.035-.764.163-1.18.27-1.457.143-.367.314-.63.59-.905.275-.276.538-.447.905-.59.277-.107.693-.235 1.457-.27.828-.037 1.07-.045 3.158-.045V4z" },
  ];

  return (
    <footer className="bg-black text-white py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold font-bricolage">EVALA</span>
            </Link>
            <p className="text-gray-400 mb-6 font-sans">
              Créons ensemble des expériences numériques exceptionnelles.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300 font-sans"
                  aria-label={social.label}
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4 font-bricolage">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-green-400 transition-colors duration-300 font-sans"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0 font-sans">
              © {currentYear} EVALA. Tous droits réservés.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-300 font-sans"
              >
                Politique de confidentialité
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-300 font-sans"
              >
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 
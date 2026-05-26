"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, LogOut, User, LayoutDashboard } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { Session } from "@supabase/supabase-js";

export default function Navbar() {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession]               = useState<Session | null>(null);
  const pathname = usePathname();
  const router   = useRouter();

  /* Scroll */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Session Supabase */
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);


  const menuItems = [
    { name: "Accueil",    href: "/" },
    { name: "Programme",  href: "#programme" },
    { name: "Galerie",    href: "#galerie" },
    { name: "Contact",    href: "#contact" },
  ];

  const handleMenuClick = (href: string) => (e: React.MouseEvent) => {
    if (href === "/") {
      if (pathname !== "/") { e.preventDefault(); router.push("/"); }
      setIsMobileMenuOpen(false);
      return;
    }
    if (pathname !== "/") { e.preventDefault(); router.push(`/${href}`); }
    setIsMobileMenuOpen(false);
  };

  /* Nom affiché — initiales pour l'avatar */
  //const displayName = session?.user?.user_metadata?.full_name as string | undefined;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <motion.a
              href="/"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-white flex items-center"
            >
              <span className="font-newsport italic text-2xl md:text-3xl tracking-wide">
                <span style={{ color: "#006A4E" }}>E</span>
                <span style={{ color: "#FFCD00" }}>V</span>
                <span style={{ color: "#CE1126" }}>A</span>
                <span style={{ color: "#006A4E" }}>L</span>
                <span style={{ color: "#FFCD00" }}>A</span>
              </span>
            </motion.a>

            {/* Navigation desktop */}
            <div className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href === "/" ? "/" : `/${item.href}`}
                  className={`transition-colors text-sm uppercase ${isScrolled ? "text-black hover:text-evala" : "text-white/80 hover:text-white"}`}
                  whileHover={{ y: -2 }}
                  onClick={handleMenuClick(item.href)}
                >
                  {item.name}
                </motion.a>
              ))}

              {/* Auth zone */}
              {session ? (
                /* ── Connecté : icône → dashboard ── */
                <Link
                  href="/dashboard"
                  className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 border ${isScrolled ? "bg-black/[0.04] hover:bg-black/[0.09] border-black/[0.08]" : "bg-white/10 hover:bg-white/20 border-white/20"}`}
                >
                  <User className={`w-4 h-4 ${isScrolled ? "text-black" : "text-white"}`} />
                </Link>
              ) : (
                /* ── Non connecté : bouton Se connecter ── */
                <Link href="/auth">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-200 cursor-pointer border ${isScrolled ? "bg-black/[0.04] hover:bg-black/[0.08] border-black/[0.08] text-black" : "bg-white/10 hover:bg-white/15 border-white/20 text-white"}`}
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    Se connecter
                  </motion.span>
                </Link>
              )}
            </div>

            {/* Bouton menu mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white md:hidden pt-20"
          >
            <div className="container mx-auto px-6 md:px-8 py-8 max-w-6xl">
              <div className="flex flex-col space-y-6">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href === "/" ? "/" : `/${item.href}`}
                    className="text-black hover:text-evala transition-colors text-lg text-center"
                    onClick={handleMenuClick(item.href)}
                  >
                    {item.name}
                  </a>
                ))}

                {/* Auth mobile */}
                <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
                  {session ? (
                    <>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 text-black text-base"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Tableau de bord
                      </Link>
                      <button
                        onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }}
                        className="flex items-center justify-center gap-2 text-red-400/70 text-base"
                      >
                        <LogOut className="w-4 h-4" />
                        Se déconnecter
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/auth"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 text-black text-base"
                    >
                      <LogIn className="w-4 h-4" />
                      Se connecter
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

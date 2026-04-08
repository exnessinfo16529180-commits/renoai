"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "О продукте",    href: "#flow" },
  { label: "Как работает",  href: "#dashboard" },
  { label: "Безопасность",  href: "#trust" },
  { label: "Тарифы",        href: "#audience" },
];

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Navigation({ scrollY }: { scrollY: number }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = scrollY > 50;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.3s, border-color 0.3s",
        background: isScrolled ? "rgba(5,46,22,0.9)" : "transparent",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
        borderBottom: isScrolled ? "1px solid rgba(255,255,255,0.1)" : "none",
      }}
    >
      <nav style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
              Reno<span style={{ color: "#6ee7b7" }}>AI</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden-mobile" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden-mobile">
            <Link href={`${BASE}/project`}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glow-button"
                style={{ fontSize: 14, padding: "10px 22px" }}
              >
                Начать проект
              </motion.button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="show-mobile"
            style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 8 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: "rgba(5,46,22,0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "24px 20px", display: "flex", flexDirection: "column", gap: 20 }}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", textDecoration: "none" }}
                >
                  {link.label}
                </motion.a>
              ))}
              <Link href={`${BASE}/project`} onClick={() => setIsMenuOpen(false)}>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="glow-button"
                  style={{ width: "100%", marginTop: 8, fontSize: 15 }}
                >
                  Начать проект
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 1024px) { .hidden-mobile { display: flex !important; } .show-mobile { display: none !important; } }
        @media (max-width: 1023px) { .hidden-mobile { display: none !important; } .show-mobile { display: block !important; } }
      `}</style>
    </motion.header>
  );
}

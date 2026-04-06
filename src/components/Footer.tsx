"use client";

import { motion } from "framer-motion";

const footerLinks = [
  {
    label: "О проекте",
    href: "#about",
  },
  {
    label: "Как работает",
    href: "#how-it-works",
  },
  {
    label: "Условия",
    href: "#",
  },
  {
    label: "Конфиденциальность",
    href: "#",
  },
];

const socialLinks = [
  {
    label: "Telegram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M21.5 4.5L2.5 11.5L9.5 13.5M21.5 4.5L9.5 13.5M21.5 4.5L16.5 19.5L9.5 13.5"
          stroke="#9BA8A3"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="#9BA8A3" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="5" stroke="#9BA8A3" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="#9BA8A3" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 13.85 2.51 15.58 3.39 17.07L2 22L7.12 20.65C8.57 21.49 10.23 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
          stroke="#9BA8A3"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 9C8.5 9 9 11 11 13C13 15 15 15.5 15 15.5"
          stroke="#9BA8A3"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      className="relative py-14 px-6"
      style={{
        background: "#081512",
        borderTop: "1px solid rgba(30,74,62,0.35)",
      }}
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(200,155,60,0.2), transparent)",
        }}
      />

      <div className="max-w-lg mx-auto flex flex-col items-center gap-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-2"
        >
          {/* Logo mark */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-1"
            style={{
              background: "rgba(18,60,51,0.6)",
              border: "1px solid rgba(200,155,60,0.2)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L22 7.5V16.5L12 22L2 16.5V7.5L12 2Z"
                stroke="#C89B3C"
                strokeWidth="1.5"
                fill="rgba(200,155,60,0.08)"
              />
              <circle cx="12" cy="12" r="3" fill="#C89B3C" opacity="0.7" />
            </svg>
          </div>
          <span
            className="text-xl font-bold tracking-tight"
            style={{ color: "#F5F7F6", letterSpacing: "-0.02em" }}
          >
            Reno<span style={{ color: "#C89B3C" }}>AI</span>
          </span>
          <p className="text-xs text-center" style={{ color: "#9BA8A3" }}>
            AI-платформа нового поколения для ремонта
          </p>
        </motion.div>

        {/* Nav links */}
        <motion.nav
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-3"
        >
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm transition-colors duration-200"
              style={{ color: "#9BA8A3" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C89B3C")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9BA8A3")}
            >
              {link.label}
            </a>
          ))}
        </motion.nav>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="flex items-center gap-4"
        >
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{
                background: "rgba(13,36,32,0.6)",
                border: "1px solid rgba(30,74,62,0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(18,60,51,0.8)";
                e.currentTarget.style.borderColor = "rgba(200,155,60,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(13,36,32,0.6)";
                e.currentTarget.style.borderColor = "rgba(30,74,62,0.4)";
              }}
            >
              {social.icon}
            </a>
          ))}
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-1"
        >
          <a
            href="mailto:hello@renoai.kz"
            className="text-sm transition-colors duration-200"
            style={{ color: "#9BA8A3" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C89B3C")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9BA8A3")}
          >
            hello@renoai.kz
          </a>
        </motion.div>

        {/* Divider */}
        <div
          className="w-full h-px"
          style={{ background: "rgba(30,74,62,0.25)" }}
        />

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="text-xs text-center"
          style={{ color: "rgba(155,168,163,0.45)" }}
        >
          © {new Date().getFullYear()} RenoAI. Все права защищены.
        </motion.p>
      </div>
    </footer>
  );
}

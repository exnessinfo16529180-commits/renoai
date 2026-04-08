"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";

const footerLinks = {
  product: {
    title: "Продукт",
    links: [
      { label: "Как работает",      href: "#flow" },
      { label: "Тарифы",            href: "#audience" },
      { label: "Для бригад",        href: "#audience" },
      { label: "Для застройщиков",  href: "#audience" },
    ],
  },
  support: {
    title: "Поддержка",
    links: [
      { label: "Помощь",         href: "#" },
      { label: "Безопасность",   href: "#trust" },
      { label: "Документы",      href: "#" },
      { label: "Контакты",       href: "#" },
    ],
  },
};

const socials = [
  { Icon: MessageCircle, label: "Telegram",  href: "#" },
  { Icon: Phone,         label: "WhatsApp",  href: "#" },
];

export default function SiteFooter() {
  return (
    <footer
      style={{
        background: "#052e16",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "48px 20px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 48,
        }}
        className="footer-grid"
      >
        {/* Brand */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ marginBottom: 16 }}
          >
            <span style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>
              Reno<span style={{ color: "#6ee7b7" }}>AI</span>
            </span>
          </motion.div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: 260, marginBottom: 20 }}>
            AI-платформа для ремонта и дизайна интерьера.
            От идеи до заселения за 30 дней.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {socials.map(({ Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  color: "rgba(255,255,255,0.5)",
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onHoverStart={(e) => {
                  const el = e.target as HTMLElement;
                  el.style.color = "#6ee7b7";
                  el.style.borderColor = "rgba(52,211,153,0.3)";
                }}
                onHoverEnd={(e) => {
                  const el = e.target as HTMLElement;
                  el.style.color = "rgba(255,255,255,0.5)";
                  el.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Product links */}
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 16 }}>
            {footerLinks.product.title}
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {footerLinks.product.links.map((l) => (
              <li key={l.label}>
                <a href={l.href} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support links */}
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 16 }}>
            {footerLinks.support.title}
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {footerLinks.support.links.map((l) => (
              <li key={l.label}>
                <a href={l.href} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 16 }}>Контакты</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            <li style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
              <Mail size={14} color="#6ee7b7" />
              hello@renoai.kz
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
              <Phone size={14} color="#6ee7b7" />
              +7 (777) 000-00-00
            </li>
            <li style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
              <MapPin size={14} color="#6ee7b7" style={{ marginTop: 2, flexShrink: 0 }} />
              Алматы, пр. Назарбаева, 1
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "20px 20px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>© 2025 RenoAI. Все права защищены.</p>
        <div style={{ display: "flex", gap: 24 }}>
          {["Политика конфиденциальности", "Условия использования"].map((t) => (
            <a key={t} href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
              {t}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 479px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

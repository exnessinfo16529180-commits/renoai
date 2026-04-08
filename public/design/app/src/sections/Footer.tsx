import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  product: {
    title: 'Продукт',
    links: [
      { label: 'Как работает', href: '#flow' },
      { label: 'Тарифы', href: '#audience' },
      { label: 'Для бригад', href: '#audience' },
      { label: 'Для застройщиков', href: '#audience' },
    ],
  },
  support: {
    title: 'Поддержка',
    links: [
      { label: 'Помощь', href: '#' },
      { label: 'Безопасность', href: '#trust' },
      { label: 'Документы', href: '#' },
      { label: 'Контакты', href: '#' },
    ],
  },
};

const socialLinks = [
  { icon: MessageCircle, label: 'Telegram', href: '#' },
  { icon: Phone, label: 'WhatsApp', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative bg-emerald-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="col-span-2 lg:col-span-2">
            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="text-2xl font-bold text-white">
                Reno<span className="text-emerald-400">AI</span>
              </span>
            </motion.a>
            <p className="text-white/50 text-sm mb-6 max-w-xs leading-relaxed">
              AI-платформа для ремонта и дизайна интерьера. 
              От идеи до заселения за 30 дней.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{footerLinks.product.title}</h4>
            <ul className="space-y-3">
              {footerLinks.product.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{footerLinks.support.title}</h4>
            <ul className="space-y-3">
              {footerLinks.support.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="text-white font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/50 text-sm">
                <Mail className="w-4 h-4 text-emerald-400" />
                hello@renoai.ru
              </li>
              <li className="flex items-center gap-2 text-white/50 text-sm">
                <Phone className="w-4 h-4 text-emerald-400" />
                +7 (999) 000-00-00
              </li>
              <li className="flex items-start gap-2 text-white/50 text-sm">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5" />
                Москва, ул. Примерная, 1
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2024 RenoAI. Все права защищены.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

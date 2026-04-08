import { motion } from 'framer-motion';
import { Home, Wrench, Building, ArrowRight, CheckCircle2 } from 'lucide-react';

const audiences = [
  {
    icon: Home,
    title: 'Владельцы квартир',
    description: 'Сделайте ремонт быстро, качественно и без переплат',
    accent: 'emerald',
    benefits: [
      'Сэкономьте до 30% на ремонте',
      'Контроль качества на каждом этапе',
      'Прозрачная смета без скрытых расходов',
    ],
    cta: 'Начать проект',
  },
  {
    icon: Wrench,
    title: 'Бригады и мастера',
    description: 'Получайте стабильные заказы от проверенных клиентов',
    accent: 'amber',
    benefits: [
      'Постоянный поток заказов',
      'Гарантированная оплата через эскроу',
      'Рейтинговая система продвижения',
    ],
    cta: 'Стать подрядчиком',
  },
  {
    icon: Building,
    title: 'Застройщики',
    description: 'Массовое управление ремонтными проектами',
    accent: 'blue',
    benefits: [
      'Массовое управление проектами',
      'Интеграция с вашей CRM',
      'Аналитика и отчётность',
    ],
    cta: 'Для бизнеса',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function AudienceCards() {
  return (
    <section id="audience" className="relative py-20 lg:py-32 bg-emerald-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(31,122,92,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(212,168,83,0.1)_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Для кого создан{' '}
            <span className="text-gradient">RenoAI</span>
          </h2>
          <p className="text-lg text-white/60">
            Платформа объединяет всех участников ремонта в одной экосистеме
          </p>
        </motion.div>

        {/* Audience Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {audiences.map((audience, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div className="glass-card-hover p-8 h-full flex flex-col">
                {/* Accent Border */}
                <div className={`absolute inset-x-0 top-0 h-1 rounded-t-2xl ${
                  audience.accent === 'emerald' ? 'bg-emerald-500' :
                  audience.accent === 'amber' ? 'bg-amber-400' :
                  'bg-blue-500'
                }`} />

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  audience.accent === 'emerald' ? 'bg-emerald-500/20' :
                  audience.accent === 'amber' ? 'bg-amber-500/20' :
                  'bg-blue-500/20'
                }`}>
                  <audience.icon className={`w-7 h-7 ${
                    audience.accent === 'emerald' ? 'text-emerald-400' :
                    audience.accent === 'amber' ? 'text-amber-400' :
                    'text-blue-400'
                  }`} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {audience.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 mb-6 leading-relaxed">
                  {audience.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-3 mb-8 flex-1">
                  {audience.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        audience.accent === 'emerald' ? 'text-emerald-400' :
                        audience.accent === 'amber' ? 'text-amber-400' :
                        'text-blue-400'
                      }`} />
                      <span className="text-white/70 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                    audience.accent === 'emerald'
                      ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30'
                      : audience.accent === 'amber'
                      ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/30'
                      : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30'
                  }`}
                >
                  {audience.cta}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

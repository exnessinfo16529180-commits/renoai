import { motion } from 'framer-motion';
import { Shield, CreditCard, BadgeCheck, Lock, Eye, FileCheck } from 'lucide-react';

const trustFeatures = [
  {
    icon: Shield,
    title: 'Эскроу-счёт',
    description: 'Ваши деньги хранятся на защищённом счёте до завершения работ. Бригада получает оплату только после вашего подтверждения.',
    color: 'emerald',
  },
  {
    icon: CreditCard,
    title: 'Оплата по факту',
    description: 'Платите только за выполненные этапы. Никаких предоплат за невыполненную работу — контролируйте каждый шаг.',
    color: 'amber',
  },
  {
    icon: BadgeCheck,
    title: 'Проверенные бригады',
    description: 'Все мастера проходят строгую верификацию, имеют подтверждённое портфолио и реальные отзывы клиентов.',
    color: 'blue',
  },
];

const additionalFeatures = [
  { icon: Lock, text: 'SSL-шифрование данных' },
  { icon: Eye, text: 'Прозрачная смета' },
  { icon: FileCheck, text: 'Юридическая поддержка' },
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

export default function TrustSection() {
  return (
    <section id="trust" className="relative py-20 lg:py-32 bg-emerald-950">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(31,122,92,0.1)_0%,transparent_50%)]" />

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
            Ваши деньги{' '}
            <span className="text-gradient">под защитой</span>
          </h2>
          <p className="text-lg text-white/60">
            Мы создали систему, которая защищает вас на каждом этапе ремонта
          </p>
        </motion.div>

        {/* Trust Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12"
        >
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div className="glass-card-hover p-8 h-full">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  feature.color === 'emerald' ? 'bg-emerald-500/20' :
                  feature.color === 'amber' ? 'bg-amber-500/20' :
                  'bg-blue-500/20'
                }`}>
                  <feature.icon className={`w-7 h-7 ${
                    feature.color === 'emerald' ? 'text-emerald-400' :
                    feature.color === 'amber' ? 'text-amber-400' :
                    'text-blue-400'
                  }`} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Glow */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  feature.color === 'emerald' ? 'shadow-glow' :
                  feature.color === 'amber' ? 'shadow-[0_0_20px_rgba(212,168,83,0.2)]' :
                  'shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                }`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 lg:gap-8"
        >
          {additionalFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-white/50"
            >
              <feature.icon className="w-5 h-5 text-emerald-400" />
              <span className="text-sm">{feature.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

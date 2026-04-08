import { motion } from 'framer-motion';
import { 
  Upload, Palette, Sparkles, Sliders, Calculator, 
  Wallet, Package, Users, CheckCircle 
} from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Загрузите фото или план',
    description: 'Перетащите фото квартиры или загрузите планировку. AI проанализирует пространство.',
    color: 'from-emerald-500/20 to-emerald-600/10',
  },
  {
    number: '02',
    icon: Palette,
    title: 'Выберите стиль',
    description: 'Минимализм, скандинавский, лофт, классика — выберите направление дизайна.',
    color: 'from-blue-500/20 to-blue-600/10',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'AI создаёт дизайн',
    description: 'Нейросеть генерирует 3 варианта интерьера с расстановкой мебели за 2 минуты.',
    color: 'from-purple-500/20 to-purple-600/10',
  },
  {
    number: '04',
    icon: Sliders,
    title: 'Настройте детали',
    description: 'Меняйте материалы, цвета, мебель и декор в один клик в визуальном редакторе.',
    color: 'from-pink-500/20 to-pink-600/10',
  },
  {
    number: '05',
    icon: Calculator,
    title: 'Получите смету',
    description: 'Детальный расчёт материалов, работ и мебели с ценами от поставщиков.',
    color: 'from-amber-500/20 to-amber-600/10',
  },
  {
    number: '06',
    icon: Wallet,
    title: 'Выберите бюджет',
    description: 'Сравните три варианта: Эконом / Стандарт / Премиум с разными материалами.',
    color: 'from-green-500/20 to-green-600/10',
  },
  {
    number: '07',
    icon: Package,
    title: 'Материалы и магазины',
    description: 'Цены в строительных магазинах, сравнение, заказ с доставкой на объект.',
    color: 'from-cyan-500/20 to-cyan-600/10',
  },
  {
    number: '08',
    icon: Users,
    title: 'Выберите бригаду',
    description: 'Проверенные мастера с рейтингом, отзывами и портфолио выполненных работ.',
    color: 'from-orange-500/20 to-orange-600/10',
  },
  {
    number: '09',
    icon: CheckCircle,
    title: 'Контролируйте проект',
    description: 'Таймлайн работ, фотоотчёты с объекта, оплата по завершённым этапам.',
    color: 'from-emerald-500/20 to-emerald-600/10',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function FlowSteps() {
  return (
    <section id="flow" className="relative py-20 lg:py-32 bg-emerald-900 grid-pattern">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Весь ремонт —{' '}
            <span className="text-gradient">в одной системе</span>
          </h2>
          <p className="text-lg text-white/60">
            9 шагов от загрузки фото до заселения. AI берёт на себя всю рутину.
          </p>
        </motion.div>
      </div>

      {/* Steps Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div className="glass-card-hover p-6 lg:p-8 h-full">
                {/* Gradient Background */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Number and Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-bold text-white/10 group-hover:text-emerald-500/30 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                      <step.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Border Glow on Hover */}
                <div className="absolute inset-0 rounded-2xl border border-emerald-500/0 group-hover:border-emerald-500/30 transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Connecting Line (Desktop) */}
      <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent pointer-events-none" />
    </section>
  );
}

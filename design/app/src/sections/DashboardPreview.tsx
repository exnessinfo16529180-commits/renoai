import { motion } from 'framer-motion';
import { 
  LayoutDashboard, FileText, Package, Users, MessageSquare,
  TrendingUp, Clock, CheckCircle2, Circle
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Проекты', active: true },
  { icon: FileText, label: 'Смета', active: false },
  { icon: Package, label: 'Материалы', active: false },
  { icon: Users, label: 'Бригада', active: false },
  { icon: MessageSquare, label: 'Чат', active: false },
];

const milestones = [
  { label: 'Дизайн', completed: true },
  { label: 'Смета', completed: true },
  { label: 'Материалы', completed: true },
  { label: 'Ремонт', completed: false, current: true },
  { label: 'Приёмка', completed: false },
];

const recentPhotos = [
  '/images/room-before.jpg',
  '/images/room-after.jpg',
  '/images/style-minimal.jpg',
  '/images/style-scandi.jpg',
];

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="relative py-20 lg:py-32 bg-gradient-to-b from-emerald-900 to-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ваш проект в{' '}
              <span className="text-gradient">личном кабинете</span>
            </h2>
            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              Отслеживайте прогресс, управляйте бюджетом, общайтесь с бригадой. 
              Вся информация о ремонте всегда под рукой.
            </p>

            {/* Features List */}
            <div className="space-y-4">
              {[
                'Прогресс ремонта в реальном времени',
                'Детальная смета с актуальными ценами',
                'Фотоотчёты с каждого этапа',
                'Прямой чат с бригадой',
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-white/80">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="glass-card overflow-hidden"
            >
              {/* Dashboard Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 text-center text-xs text-white/40">
                  RenoAI Dashboard
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="flex">
                {/* Sidebar */}
                <div className="w-14 lg:w-16 border-r border-white/10 py-4 hidden sm:block">
                  {sidebarItems.map((item, index) => (
                    <div
                      key={index}
                      className={`flex flex-col items-center py-3 px-2 cursor-pointer transition-colors ${
                        item.active ? 'text-emerald-400' : 'text-white/40 hover:text-white/60'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                    </div>
                  ))}
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 lg:p-6">
                  {/* Project Status Card */}
                  <div className="glass-card p-4 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-white font-semibold mb-1">Ремонт в процессе</h4>
                        <p className="text-white/50 text-sm">2-комнатная квартира, 65 м²</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-400">65%</div>
                        <div className="text-white/50 text-xs">готово</div>
                      </div>
                    </div>
                    <Progress value={65} className="h-2 bg-white/10" />
                  </div>

                  {/* Milestones */}
                  <div className="glass-card p-4 mb-4">
                    <h4 className="text-white font-semibold mb-4 text-sm">Этапы проекта</h4>
                    <div className="flex items-center justify-between">
                      {milestones.map((milestone, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                            milestone.completed
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : milestone.current
                              ? 'bg-amber-500/20 text-amber-400 border-2 border-amber-400/50'
                              : 'bg-white/10 text-white/30'
                          }`}>
                            {milestone.completed ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </div>
                          <span className={`text-xs ${
                            milestone.completed || milestone.current
                              ? 'text-white/70'
                              : 'text-white/40'
                          }`}>
                            {milestone.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="glass-card p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-semibold text-sm">Бюджет проекта</h4>
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-2xl font-bold text-white">1 247 000 ₽</span>
                      <span className="text-white/50 text-sm mb-1">/ 1 850 000 ₽</span>
                    </div>
                    <div className="flex gap-4 text-xs text-white/50">
                      <span>Материалы: 680 000 ₽</span>
                      <span>Работы: 567 000 ₽</span>
                    </div>
                  </div>

                  {/* Recent Photos */}
                  <div className="glass-card p-4">
                    <h4 className="text-white font-semibold mb-3 text-sm">Последние фото</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {recentPhotos.map((photo, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-lg overflow-hidden bg-white/5"
                        >
                          <img
                            src={photo}
                            alt={`Photo ${index + 1}`}
                            className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next Task */}
                  <div className="mt-4 glass-card p-4 border-l-4 border-amber-400">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-amber-400" />
                      <div>
                        <p className="text-white/50 text-xs">Следующая задача</p>
                        <p className="text-white font-medium text-sm">Укладка плитки в ванной — завтра, 9:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-emerald-500/10 rounded-3xl blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

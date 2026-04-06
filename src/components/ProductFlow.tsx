"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// Demo screens simulating the RenoAI product experience
const screens = [
  {
    id: "upload",
    label: "Загрузка",
    title: "Загрузите планировку",
    content: <UploadScreen />,
  },
  {
    id: "questionnaire",
    label: "Анкета",
    title: "Ваши предпочтения",
    content: <QuestionnaireScreen />,
  },
  {
    id: "processing",
    label: "AI",
    title: "AI обрабатывает",
    content: <ProcessingScreen />,
  },
  {
    id: "design",
    label: "Дизайн",
    title: "Ваш дизайн готов",
    content: <DesignScreen />,
  },
  {
    id: "estimate",
    label: "Смета",
    title: "Предварительная смета",
    content: <EstimateScreen />,
  },
  {
    id: "suppliers",
    label: "Материалы",
    title: "Подобранные материалы",
    content: <SuppliersScreen />,
  },
  {
    id: "brigade",
    label: "Бригада",
    title: "Проверенные бригады",
    content: <BrigadeScreen />,
  },
];

function UploadScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 p-6">
      <div
        className="w-full aspect-[4/3] rounded-2xl flex flex-col items-center justify-center gap-3 border-2 border-dashed"
        style={{ borderColor: "rgba(200,155,60,0.3)", background: "rgba(18,60,51,0.2)" }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 4L16 20M16 4L10 10M16 4L22 10"
            stroke="#C89B3C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 24H26"
            stroke="#C89B3C"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>
        <p className="text-sm text-center" style={{ color: "#9BA8A3" }}>
          Перетащите файл или нажмите
          <br />
          <span style={{ color: "#C89B3C" }}>выбрать файл</span>
        </p>
        <p className="text-xs" style={{ color: "rgba(155,168,163,0.5)" }}>
          JPG, PNG, PDF, DWG
        </p>
      </div>
      <div className="w-full flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: "rgba(30,74,62,0.4)" }} />
        <span className="text-xs" style={{ color: "#9BA8A3" }}>или</span>
        <div className="flex-1 h-px" style={{ background: "rgba(30,74,62,0.4)" }} />
      </div>
      <button
        className="w-full py-3 rounded-xl text-sm font-semibold"
        style={{
          background: "linear-gradient(135deg, #C89B3C, #B8892C)",
          color: "#081512",
        }}
      >
        Загрузить планировку
      </button>
    </div>
  );
}

function QuestionnaireScreen() {
  const styles = ["Скандинавский", "Минимализм", "Лофт", "Классика", "Модерн", "Эклектика"];
  return (
    <div className="flex flex-col gap-4 p-5 h-full">
      <p className="text-sm font-medium" style={{ color: "#F5F7F6" }}>
        Выберите стиль интерьера
      </p>
      <div className="grid grid-cols-2 gap-2">
        {styles.map((s, i) => (
          <div
            key={s}
            className="py-2.5 px-3 rounded-xl text-xs font-medium text-center"
            style={{
              background: i === 1 ? "rgba(200,155,60,0.2)" : "rgba(13,36,32,0.6)",
              border: `1px solid ${i === 1 ? "rgba(200,155,60,0.5)" : "rgba(30,74,62,0.4)"}`,
              color: i === 1 ? "#C89B3C" : "#9BA8A3",
            }}
          >
            {s}
          </div>
        ))}
      </div>
      <div className="mt-2">
        <p className="text-xs mb-2" style={{ color: "#9BA8A3" }}>
          Предпочтительный бюджет
        </p>
        <div
          className="w-full h-8 rounded-xl flex items-center px-3"
          style={{ background: "rgba(13,36,32,0.6)", border: "1px solid rgba(30,74,62,0.4)" }}
        >
          <span className="text-sm" style={{ color: "#F5F7F6" }}>
            2 500 000 — 4 000 000 ₸
          </span>
        </div>
      </div>
      <button
        className="mt-auto w-full py-3 rounded-xl text-sm font-semibold"
        style={{ background: "linear-gradient(135deg, #C89B3C, #B8892C)", color: "#081512" }}
      >
        Запустить AI
      </button>
    </div>
  );
}

function ProcessingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-6">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-full border-2"
          style={{ borderColor: "rgba(200,155,60,0.2)", borderTopColor: "#C89B3C" }}
        />
        <svg
          className="absolute inset-0 m-auto w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 2L14.09 8.26L21 9L15.5 14L17.18 21L12 17.77L6.82 21L8.5 14L3 9L9.91 8.26L12 2Z"
            fill="#C89B3C"
            opacity="0.8"
          />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-base font-semibold mb-2" style={{ color: "#F5F7F6" }}>
          AI анализирует пространство
        </p>
        <p className="text-xs" style={{ color: "#9BA8A3" }}>
          Обработка планировки и генерация дизайна...
        </p>
      </div>
      <div className="w-full space-y-2">
        {["Анализ планировки", "Подбор мебели", "Генерация 3D"].map((step, i) => (
          <div key={step} className="flex items-center gap-3">
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
              className="w-2 h-2 rounded-full"
              style={{ background: "#C89B3C" }}
            />
            <span className="text-xs" style={{ color: "#9BA8A3" }}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DesignScreen() {
  return (
    <div className="flex flex-col h-full">
      {/* Design preview placeholder */}
      <div
        className="flex-1 flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, #0D2420 0%, #1A4A3A 50%, #0F3D2E 100%)",
          minHeight: "140px",
        }}
      >
        {/* Stylized room sketch */}
        <svg width="140" height="100" viewBox="0 0 140 100" fill="none">
          {/* Floor */}
          <path d="M10 80L70 95L130 80V40L70 55L10 40V80Z" fill="rgba(18,60,51,0.5)" />
          {/* Wall left */}
          <path d="M10 40L70 55L70 15L30 5L10 40Z" fill="rgba(18,60,51,0.7)" />
          {/* Wall right */}
          <path d="M130 40L70 55L70 15L110 5L130 40Z" fill="rgba(15,61,46,0.6)" />
          {/* Window */}
          <rect x="80" y="10" width="30" height="20" rx="2" fill="rgba(200,155,60,0.15)" stroke="rgba(200,155,60,0.3)" strokeWidth="1" />
          <line x1="95" y1="10" x2="95" y2="30" stroke="rgba(200,155,60,0.3)" strokeWidth="0.5" />
          {/* Sofa */}
          <rect x="25" y="65" width="45" height="15" rx="4" fill="rgba(30,74,62,0.8)" />
          <rect x="27" y="60" width="41" height="8" rx="3" fill="rgba(30,74,62,0.9)" />
          {/* Table */}
          <ellipse cx="80" cy="78" rx="15" ry="8" fill="rgba(200,155,60,0.2)" stroke="rgba(200,155,60,0.3)" strokeWidth="1" />
          {/* Gold accent */}
          <circle cx="70" cy="55" r="3" fill="#C89B3C" opacity="0.5" />
        </svg>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold" style={{ color: "#F5F7F6" }}>
            Скандинавский стиль
          </p>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(200,155,60,0.15)",
              color: "#C89B3C",
              border: "1px solid rgba(200,155,60,0.2)",
            }}
          >
            Готово
          </span>
        </div>
        <div className="flex gap-2">
          {["Вариант 1", "Вариант 2", "Вариант 3"].map((v, i) => (
            <div
              key={v}
              className="flex-1 py-1.5 text-xs text-center rounded-lg"
              style={{
                background: i === 0 ? "rgba(200,155,60,0.15)" : "rgba(13,36,32,0.6)",
                border: `1px solid ${i === 0 ? "rgba(200,155,60,0.3)" : "rgba(30,74,62,0.3)"}`,
                color: i === 0 ? "#C89B3C" : "#9BA8A3",
              }}
            >
              {v}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EstimateScreen() {
  const items = [
    { name: "Демонтаж и подготовка", price: "180 000 ₸" },
    { name: "Черновые работы", price: "420 000 ₸" },
    { name: "Чистовые материалы", price: "680 000 ₸" },
    { name: "Мебель и декор", price: "950 000 ₸" },
  ];
  return (
    <div className="flex flex-col gap-3 p-5 h-full">
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "#9BA8A3" }}>
              {item.name}
            </span>
            <span className="text-xs font-medium" style={{ color: "#F5F7F6" }}>
              {item.price}
            </span>
          </div>
        ))}
      </div>
      <div
        className="h-px"
        style={{ background: "rgba(30,74,62,0.4)" }}
      />
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold" style={{ color: "#F5F7F6" }}>
          Итого
        </span>
        <span className="text-base font-bold" style={{ color: "#C89B3C" }}>
          2 230 000 ₸
        </span>
      </div>
      <p className="text-xs" style={{ color: "rgba(155,168,163,0.6)" }}>
        * Предварительная оценка. Точная стоимость после замера.
      </p>
      <button
        className="mt-auto w-full py-2.5 rounded-xl text-xs font-semibold"
        style={{ background: "linear-gradient(135deg, #C89B3C, #B8892C)", color: "#081512" }}
      >
        Скачать смету PDF
      </button>
    </div>
  );
}

function SuppliersScreen() {
  const suppliers = [
    { name: "Керамогранит Porcelanosa", cat: "Напольные покрытия", price: "от 8 900 ₸/м²" },
    { name: "Кухня Leicht", cat: "Кухонный гарнитур", price: "от 420 000 ₸" },
    { name: "Сантехника Hansgrohe", cat: "Ванная комната", price: "от 65 000 ₸" },
  ];
  return (
    <div className="flex flex-col gap-3 p-5 h-full">
      {suppliers.map((s) => (
        <div
          key={s.name}
          className="p-3 rounded-xl"
          style={{
            background: "rgba(13,36,32,0.6)",
            border: "1px solid rgba(30,74,62,0.4)",
          }}
        >
          <p className="text-xs font-medium mb-0.5" style={{ color: "#F5F7F6" }}>
            {s.name}
          </p>
          <p className="text-xs mb-1" style={{ color: "#9BA8A3" }}>
            {s.cat}
          </p>
          <p className="text-xs font-semibold" style={{ color: "#C89B3C" }}>
            {s.price}
          </p>
        </div>
      ))}
      <p className="text-xs text-center" style={{ color: "rgba(155,168,163,0.6)" }}>
        +24 позиции в каталоге
      </p>
    </div>
  );
}

function BrigadeScreen() {
  const brigades = [
    { name: "Бригада «Артур»", rating: "4.9", jobs: "47 объектов", badge: "Топ" },
    { name: "Бригада «Мастер»", rating: "4.8", jobs: "31 объект", badge: null },
    { name: "Бригада «Престиж»", rating: "4.7", jobs: "28 объектов", badge: null },
  ];
  return (
    <div className="flex flex-col gap-3 p-5 h-full">
      {brigades.map((b) => (
        <div
          key={b.name}
          className="p-3 rounded-xl flex items-center gap-3"
          style={{
            background: "rgba(13,36,32,0.6)",
            border: "1px solid rgba(30,74,62,0.4)",
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(18,60,51,0.8)", border: "1px solid rgba(200,155,60,0.2)" }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="6" r="3" stroke="#C89B3C" strokeWidth="1.2" />
              <path d="M3 15C3 12.2386 5.68629 10 9 10C12.3137 10 15 12.2386 15 15" stroke="#C89B3C" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-xs font-medium" style={{ color: "#F5F7F6" }}>
                {b.name}
              </p>
              {b.badge && (
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                  style={{ background: "rgba(200,155,60,0.2)", color: "#C89B3C" }}
                >
                  {b.badge}
                </span>
              )}
            </div>
            <p className="text-xs" style={{ color: "#9BA8A3" }}>
              ★ {b.rating} · {b.jobs}
            </p>
          </div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="#C89B3C" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
          </svg>
        </div>
      ))}
    </div>
  );
}

export default function ProductFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeScreen, setActiveScreen] = useState(0);

  return (
    <section
      ref={ref}
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "#081512" }}
    >
      {/* Background ambience */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(18,60,51,0.2) 0%, transparent 100%)",
        }}
      />

      <div className="relative max-w-lg mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p
            className="text-xs font-medium tracking-widest uppercase mb-4"
            style={{ color: "#C89B3C" }}
          >
            Продукт
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: "#F5F7F6", letterSpacing: "-0.02em" }}
          >
            Весь процесс в
            <br />
            <span style={{ color: "#9BA8A3", fontWeight: 400 }}>одном приложении</span>
          </h2>
          <p className="text-sm" style={{ color: "#9BA8A3" }}>
            От загрузки планировки до выбора бригады
          </p>
        </motion.div>

        {/* Phone mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          {/* Screen tabs */}
          <div className="flex gap-1.5 flex-wrap justify-center mb-6">
            {screens.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveScreen(i)}
                className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-200"
                style={{
                  background:
                    activeScreen === i
                      ? "linear-gradient(135deg, #C89B3C, #B8892C)"
                      : "rgba(13,36,32,0.6)",
                  color: activeScreen === i ? "#081512" : "#9BA8A3",
                  border:
                    activeScreen === i
                      ? "1px solid #C89B3C"
                      : "1px solid rgba(30,74,62,0.4)",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Phone frame */}
          <div
            className="w-72 phone-frame relative"
            style={{ height: "560px" }}
          >
            {/* Status bar */}
            <div
              className="px-5 py-3 flex items-center justify-between"
              style={{
                background: "rgba(8,21,18,0.9)",
                borderBottom: "1px solid rgba(30,74,62,0.3)",
              }}
            >
              <span className="text-xs font-medium" style={{ color: "#9BA8A3" }}>
                9:41
              </span>
              <div
                className="flex items-center gap-1"
                style={{ color: "#C89B3C" }}
              >
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <rect x="0" y="6" width="2" height="4" rx="0.5" fill="#C89B3C" />
                  <rect x="3" y="4" width="2" height="6" rx="0.5" fill="#C89B3C" />
                  <rect x="6" y="2" width="2" height="8" rx="0.5" fill="#C89B3C" />
                  <rect x="9" y="0" width="2" height="10" rx="0.5" fill="#C89B3C" opacity="0.4" />
                </svg>
              </div>
            </div>

            {/* App header */}
            <div
              className="px-5 py-3 flex items-center justify-between"
              style={{ borderBottom: "1px solid rgba(30,74,62,0.2)" }}
            >
              <div>
                <p
                  className="text-xs font-bold"
                  style={{ color: "#F5F7F6", letterSpacing: "-0.01em" }}
                >
                  Reno<span style={{ color: "#C89B3C" }}>AI</span>
                </p>
              </div>
              <span className="text-xs" style={{ color: "#9BA8A3" }}>
                {screens[activeScreen].title}
              </span>
            </div>

            {/* Screen content */}
            <div className="flex-1 overflow-hidden" style={{ height: "460px" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreen}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="h-full"
                >
                  {screens[activeScreen].content}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full"
              style={{ background: "rgba(155,168,163,0.3)" }}
            />
          </div>

          {/* Navigation hint */}
          <p className="mt-6 text-xs text-center" style={{ color: "rgba(155,168,163,0.5)" }}>
            Нажмите на вкладки для просмотра экранов
          </p>
        </motion.div>
      </div>
    </section>
  );
}

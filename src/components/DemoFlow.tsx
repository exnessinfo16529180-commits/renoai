"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Data ───────────────────────────────────────────────────────────────────

const STYLES = [
  { id: "scan", name: "Скандинавский", short: "Свет и тепло",
    bg: "linear-gradient(135deg, #E8E0D0 0%, #D5C9B0 100%)", text: "#6B5B45" },
  { id: "mini", name: "Минимализм",   short: "Чисто, воздух",
    bg: "linear-gradient(135deg, #EDEAE5 0%, #DDD8D0 100%)", text: "#7A7570" },
  { id: "loft", name: "Лофт",         short: "Металл, бетон",
    bg: "linear-gradient(135deg, #28231E 0%, #3A322A 100%)", text: "#C89B3C" },
  { id: "clas", name: "Классика",     short: "Элегантность",
    bg: "linear-gradient(135deg, #F0E8D0 0%, #E0D0A8 100%)", text: "#7A6020" },
  { id: "mode", name: "Современный",  short: "Сталь и стекло",
    bg: "linear-gradient(135deg, #1E2535 0%, #2A3348 100%)", text: "#6EB0DC" },
  { id: "japa", name: "Японди",       short: "Природа, покой",
    bg: "linear-gradient(135deg, #D5CFC5 0%, #C8C0B0 100%)", text: "#5A5040" },
];

const ROOMS = ["Гостиная", "Спальня", "Кухня", "Вся квартира"];
const LEVELS = ["Бюджетно", "Баланс", "Премиум"];

const AI_STEPS = [
  "Анализ планировки",
  "Генерация концепций",
  "Подбор материалов",
  "Расчёт сметы",
];

const DESIGNS = [
  { id: 1, name: "Скандинавский свет",   desc: "Светлые тона, натуральное дерево",
    wall: "#F0EBE0", floor: "#C8B898", sofa: "#E0D8C8", accent: "#8B7B60" },
  { id: 2, name: "Минималистичный",      desc: "Чистые линии, нейтральные оттенки",
    wall: "#EDEBE7", floor: "#D0CDC6", sofa: "#E8E5E0", accent: "#A0A0A0" },
  { id: 3, name: "Тёплый современный",   desc: "Тёплые акценты, фактурность",
    wall: "#D8D0C0", floor: "#8B7355", sofa: "#C0B8A8", accent: "#C89B3C" },
];

const ESTIMATE = [
  { label: "Демонтаж и вывоз",     price: "180 000" },
  { label: "Черновые работы",      price: "420 000" },
  { label: "Чистовые материалы",   price: "680 000" },
  { label: "Мебель и декор",       price: "950 000" },
];

const SWATCHES = [
  { name: "Паркет",  color: "#C8B898" },
  { name: "Стены",   color: "#F0EBE0" },
  { name: "Акцент",  color: "#C89B3C" },
  { name: "Текстиль",color: "#D0C8B8" },
];

const TITLES = [
  "Загрузите планировку",
  "Выберите стиль",
  "Ваши предпочтения",
  "AI создаёт дизайн",
  "Выберите вариант",
  "Предварительная смета",
];

// ─── SVG Room Preview ───────────────────────────────────────────────────────

function RoomSVG({ d }: { d: typeof DESIGNS[0] }) {
  return (
    <svg viewBox="0 0 280 170" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Back wall */}
      <rect x="0" y="0" width="280" height="125" fill={d.wall} />
      {/* Floor */}
      <path d="M0 125 L280 125 L280 170 L0 170Z" fill={d.floor} />
      {/* Floor planks */}
      {[20,60,100,140,180,220,260].map(x => (
        <line key={x} x1={x} y1="125" x2={x - 30} y2="170"
          stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      ))}
      {/* Left accent wall stripe */}
      <rect x="0" y="0" width="32" height="125" fill={d.accent} opacity="0.1" />
      {/* Window */}
      <rect x="105" y="18" width="70" height="55" rx="2"
        fill="rgba(190,225,255,0.25)" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
      <line x1="140" y1="18" x2="140" y2="73" stroke="rgba(0,0,0,0.07)" strokeWidth="0.7" />
      <line x1="105" y1="45" x2="175" y2="45" stroke="rgba(0,0,0,0.07)" strokeWidth="0.7" />
      {/* Light rays */}
      <path d="M105 73 L75 125 M140 73 L140 125 M175 73 L205 125"
        stroke="rgba(255,250,200,0.12)" strokeWidth="10" />
      {/* Sofa */}
      <rect x="45" y="90" width="105" height="28" rx="5" fill={d.sofa} />
      <rect x="47" y="82" width="101" height="13" rx="4" fill={d.sofa} />
      <rect x="45" y="90" width="12" height="28" rx="3" fill={d.accent} opacity="0.25" />
      <rect x="138" y="90" width="12" height="28" rx="3" fill={d.accent} opacity="0.25" />
      {/* Cushions */}
      <rect x="58"  y="84" width="22" height="9" rx="2" fill={d.accent} opacity="0.2" />
      <rect x="84"  y="84" width="22" height="9" rx="2" fill={d.accent} opacity="0.15" />
      <rect x="110" y="84" width="22" height="9" rx="2" fill={d.accent} opacity="0.2" />
      {/* Coffee table */}
      <ellipse cx="200" cy="117" rx="26" ry="10" fill={d.sofa}
        stroke="rgba(0,0,0,0.06)" strokeWidth="0.8" />
      {/* Rug */}
      <ellipse cx="97" cy="128" rx="52" ry="7" fill={d.accent} opacity="0.1" />
      {/* Plant */}
      <rect x="228" y="98" width="7" height="24" rx="1.5" fill={d.accent} opacity="0.35" />
      <circle cx="231" cy="93" r="13" fill="#5A8040" opacity="0.45" />
      <circle cx="224" cy="97" r="9" fill="#4A6E35" opacity="0.38" />
      {/* Small table lamp */}
      <rect x="246" y="93" width="5" height="12" rx="1" fill={d.accent} opacity="0.4" />
      <ellipse cx="248" cy="92" rx="8" ry="4" fill={d.accent} opacity="0.25" />
    </svg>
  );
}

// ─── Step 1: Upload ──────────────────────────────────────────────────────────

function StepUpload({ onNext }: { onNext: () => void }) {
  const [state, setState] = useState<"idle" | "uploading" | "done">("idle");
  const [progress, setProgress] = useState(0);

  const handleTap = () => {
    if (state !== "idle") return;
    setState("uploading");
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 7 + 3;
      if (p >= 100) {
        clearInterval(iv);
        setProgress(100);
        setTimeout(() => setState("done"), 350);
      } else {
        setProgress(p);
      }
    }, 70);
  };

  return (
    <div className="flex flex-col gap-5">
      <AnimatePresence mode="wait">
        {state === "done" ? (
          <motion.div key="done"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-6"
          >
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(76,175,130,0.15)", border: "1px solid rgba(76,175,130,0.4)" }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M5 14L11 20L23 8" stroke="#4CAF82" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
            <div className="text-center">
              <p className="text-base font-semibold" style={{ color: "#F5F7F6" }}>Файл принят</p>
              <p className="text-sm mt-1" style={{ color: "#9BA8A3" }}>план_квартиры.pdf · 2.4 MB</p>
            </div>
          </motion.div>
        ) : (
          <motion.button key="upload"
            onClick={handleTap}
            disabled={state === "uploading"}
            className="w-full rounded-2xl py-12 flex flex-col items-center gap-4 transition-all border-2 border-dashed"
            style={{
              borderColor: state === "uploading" ? "rgba(200,155,60,0.4)" : "rgba(200,155,60,0.22)",
              background: "rgba(13,36,32,0.45)",
            }}
          >
            {state === "idle" ? (
              <>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(18,60,51,0.7)", border: "1px solid rgba(200,155,60,0.22)" }}>
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path d="M13 4V19M13 4L7.5 9.5M13 4L18.5 9.5"
                      stroke="#C89B3C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 21H22" stroke="#C89B3C" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium" style={{ color: "#F5F7F6" }}>Нажмите для загрузки</p>
                  <p className="text-xs mt-1" style={{ color: "#9BA8A3" }}>JPG, PNG, PDF, DWG</p>
                </div>
              </>
            ) : (
              <div className="w-full px-6 flex flex-col items-center gap-3">
                <div className="w-full h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(30,74,62,0.5)" }}>
                  <motion.div className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #C89B3C, #D4A84B)",
                      width: `${progress}%`,
                    }} />
                </div>
                <p className="text-sm" style={{ color: "#9BA8A3" }}>
                  Загрузка {Math.round(progress)}%
                </p>
              </div>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      <button onClick={onNext} disabled={state !== "done"}
        className="w-full py-4 rounded-2xl text-sm font-semibold transition-all"
        style={{
          background: state === "done"
            ? "linear-gradient(135deg, #C89B3C, #B8892C)" : "rgba(30,74,62,0.3)",
          color: state === "done" ? "#081512" : "#9BA8A3",
        }}>
        Далее →
      </button>
    </div>
  );
}

// ─── Step 2: Style ───────────────────────────────────────────────────────────

function StepStyle({ onNext }: { onNext: () => void }) {
  const [sel, setSel] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        {STYLES.map((s) => (
          <button key={s.id} onClick={() => setSel(s.id)}
            className="rounded-2xl overflow-hidden transition-all"
            style={{
              border: `2px solid ${sel === s.id ? "#C89B3C" : "rgba(30,74,62,0.4)"}`,
              boxShadow: sel === s.id ? "0 0 18px rgba(200,155,60,0.18)" : "none",
            }}
          >
            <div className="h-14" style={{ background: s.bg }} />
            <div className="px-3 py-2" style={{ background: "rgba(13,36,32,0.85)" }}>
              <p className="text-xs font-semibold text-left"
                style={{ color: s.text === "#C89B3C" ? "#C89B3C" : "#F5F7F6" }}>
                {s.name}
              </p>
              <p className="text-[10px] text-left mt-0.5" style={{ color: "#9BA8A3" }}>
                {s.short}
              </p>
            </div>
          </button>
        ))}
      </div>
      <button onClick={() => sel && onNext()} disabled={!sel}
        className="w-full py-4 rounded-2xl text-sm font-semibold transition-all"
        style={{
          background: sel ? "linear-gradient(135deg, #C89B3C, #B8892C)" : "rgba(30,74,62,0.3)",
          color: sel ? "#081512" : "#9BA8A3",
        }}>
        Далее →
      </button>
    </div>
  );
}

// ─── Step 3: Preferences ────────────────────────────────────────────────────

function StepPrefs({ onNext }: { onNext: () => void }) {
  const [room, setRoom] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const ready = room && level;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs font-medium tracking-wide uppercase mb-3"
          style={{ color: "#9BA8A3" }}>Тип помещения</p>
        <div className="grid grid-cols-2 gap-2">
          {ROOMS.map((r) => (
            <button key={r} onClick={() => setRoom(r)}
              className="py-3 rounded-xl text-sm font-medium transition-all"
              style={{
                background: room === r ? "rgba(200,155,60,0.14)" : "rgba(13,36,32,0.6)",
                border: `1px solid ${room === r ? "rgba(200,155,60,0.5)" : "rgba(30,74,62,0.4)"}`,
                color: room === r ? "#C89B3C" : "#9BA8A3",
              }}>
              {r}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium tracking-wide uppercase mb-3"
          style={{ color: "#9BA8A3" }}>Уровень отделки</p>
        <div className="flex flex-col gap-2">
          {LEVELS.map((l, i) => {
            const icons = ["◆", "◆◆", "◆◆◆"];
            return (
              <button key={l} onClick={() => setLevel(l)}
                className="py-3 px-4 rounded-xl text-sm font-medium transition-all flex items-center gap-3"
                style={{
                  background: level === l ? "rgba(200,155,60,0.14)" : "rgba(13,36,32,0.6)",
                  border: `1px solid ${level === l ? "rgba(200,155,60,0.5)" : "rgba(30,74,62,0.4)"}`,
                  color: level === l ? "#C89B3C" : "#9BA8A3",
                }}>
                <span className="text-xs" style={{ color: "rgba(200,155,60,0.6)" }}>
                  {icons[i]}
                </span>
                {l}
              </button>
            );
          })}
        </div>
      </div>

      <button onClick={() => ready && onNext()} disabled={!ready}
        className="w-full py-4 rounded-2xl text-sm font-semibold transition-all"
        style={{
          background: ready ? "linear-gradient(135deg, #C89B3C, #B8892C)" : "rgba(30,74,62,0.3)",
          color: ready ? "#081512" : "#9BA8A3",
        }}>
        Запустить AI →
      </button>
    </div>
  );
}

// ─── Step 4: AI Processing ──────────────────────────────────────────────────

function StepProcessing({ onNext }: { onNext: () => void }) {
  const [done, setDone] = useState(0);
  const onNextRef = useRef(onNext);
  onNextRef.current = onNext;

  useEffect(() => {
    const timers = AI_STEPS.map((_, i) =>
      setTimeout(() => setDone(i + 1), (i + 1) * 950)
    );
    const fin = setTimeout(() => onNextRef.current(), AI_STEPS.length * 950 + 700);
    return () => { timers.forEach(clearTimeout); clearTimeout(fin); };
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      {/* Pulsing orb */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="absolute w-full h-full rounded-full"
          style={{ background: "radial-gradient(circle, rgba(200,155,60,0.35) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
          className="absolute w-16 h-16 rounded-full border-2"
          style={{ borderColor: "rgba(200,155,60,0.12)", borderTopColor: "#C89B3C" }}
        />
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="relative z-10">
          <path d="M12 2L14.09 8.26L21 9L15.5 14L17.18 21L12 17.77L6.82 21L8.5 14L3 9L9.91 8.26L12 2Z"
            fill="#C89B3C" opacity="0.9" />
        </svg>
      </div>

      {/* Progress steps */}
      <div className="w-full space-y-3.5">
        {AI_STEPS.map((s, i) => (
          <motion.div key={s}
            initial={{ opacity: 0.25 }}
            animate={{ opacity: done > i ? 1 : done === i ? 0.7 : 0.25 }}
            className="flex items-center gap-3"
          >
            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: done > i ? "rgba(76,175,130,0.18)" : "rgba(30,74,62,0.4)",
                border: `1px solid ${done > i ? "rgba(76,175,130,0.5)" : "rgba(30,74,62,0.4)"}`,
              }}>
              {done > i ? (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5L4.5 7.5L8 3" stroke="#4CAF82" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : done === i ? (
                <motion.div animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-2 h-2 rounded-full" style={{ background: "#C89B3C" }} />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "rgba(155,168,163,0.25)" }} />
              )}
            </div>
            <span className="text-sm" style={{ color: done > i ? "#F5F7F6" : "#9BA8A3" }}>
              {s}
            </span>
          </motion.div>
        ))}
      </div>

      <p className="text-xs" style={{ color: "rgba(155,168,163,0.5)" }}>
        Обычно занимает 3–5 минут в реальном проекте
      </p>
    </div>
  );
}

// ─── Step 5: Design Results ──────────────────────────────────────────────────

function StepResults({ onNext }: { onNext: () => void }) {
  const [sel, setSel] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {DESIGNS.map((d) => (
        <button key={d.id} onClick={() => setSel(d.id)}
          className="w-full rounded-2xl overflow-hidden text-left transition-all"
          style={{
            border: `2px solid ${sel === d.id ? "#C89B3C" : "rgba(30,74,62,0.4)"}`,
            boxShadow: sel === d.id ? "0 0 24px rgba(200,155,60,0.18)" : "none",
          }}
        >
          {/* Room preview */}
          <div className="h-32 overflow-hidden" style={{ background: d.wall }}>
            <RoomSVG d={d} />
          </div>
          {/* Info row */}
          <div className="px-4 py-3 flex items-center justify-between"
            style={{ background: "rgba(13,36,32,0.88)" }}>
            <div>
              <p className="text-sm font-semibold" style={{ color: "#F5F7F6" }}>{d.name}</p>
              <p className="text-xs mt-0.5" style={{ color: "#9BA8A3" }}>{d.desc}</p>
            </div>
            {sel === d.id && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 ml-3"
                style={{ background: "rgba(200,155,60,0.18)", border: "1px solid #C89B3C" }}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M2 5.5L4.5 8L9 3" stroke="#C89B3C" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </motion.div>
            )}
          </div>
        </button>
      ))}

      <button onClick={() => sel !== null && onNext()} disabled={sel === null}
        className="w-full py-4 rounded-2xl text-sm font-semibold mt-1 transition-all"
        style={{
          background: sel !== null ? "linear-gradient(135deg, #C89B3C, #B8892C)" : "rgba(30,74,62,0.3)",
          color: sel !== null ? "#081512" : "#9BA8A3",
        }}>
        Просмотреть смету →
      </button>
    </div>
  );
}

// ─── Step 6: Estimate ────────────────────────────────────────────────────────

function StepEstimate({ onClose }: { onClose: () => void }) {
  const total = ESTIMATE.reduce((s, i) => s + parseInt(i.price.replace(/\s/g, "")), 0);

  return (
    <div className="flex flex-col gap-4">
      {/* Line items */}
      <div className="rounded-2xl overflow-hidden"
        style={{ background: "rgba(13,36,32,0.6)", border: "1px solid rgba(30,74,62,0.4)" }}>
        <div className="px-4 py-4 space-y-3">
          {ESTIMATE.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-sm" style={{ color: "#9BA8A3" }}>{item.label}</span>
              <span className="text-sm font-medium tabular-nums" style={{ color: "#F5F7F6" }}>
                {item.price} ₸
              </span>
            </div>
          ))}
        </div>
        <div className="h-px" style={{ background: "rgba(30,74,62,0.5)" }} />
        <div className="px-4 py-3 flex items-center justify-between">
          <span className="text-sm font-bold" style={{ color: "#F5F7F6" }}>Итого</span>
          <span className="text-xl font-bold tabular-nums" style={{ color: "#C89B3C" }}>
            {total.toLocaleString("ru-RU")} ₸
          </span>
        </div>
      </div>

      {/* Material swatches */}
      <div>
        <p className="text-xs mb-2.5" style={{ color: "#9BA8A3" }}>Подобранные материалы</p>
        <div className="flex gap-3">
          {SWATCHES.map((m) => (
            <div key={m.name} className="flex flex-col items-center gap-1.5">
              <div className="w-11 h-11 rounded-xl"
                style={{ background: m.color, border: "1px solid rgba(0,0,0,0.08)" }} />
              <span className="text-[9px]" style={{ color: "rgba(155,168,163,0.6)" }}>
                {m.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs leading-relaxed" style={{ color: "rgba(155,168,163,0.45)" }}>
        * Предварительная оценка. Точная стоимость после замера специалиста.
      </p>

      <button onClick={onClose}
        className="w-full py-4 rounded-2xl text-sm font-bold transition-all active:scale-95"
        style={{
          background: "linear-gradient(135deg, #C89B3C, #B8892C)",
          color: "#081512",
          boxShadow: "0 8px 30px rgba(200,155,60,0.3)",
        }}>
        Начать реальный проект →
      </button>
    </div>
  );
}

// ─── Main DemoFlow Modal ─────────────────────────────────────────────────────

export default function DemoFlow({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const next = useCallback(() => setStep((s) => Math.min(s + 1, TITLES.length - 1)), []);

  // Lock scroll while demo is open
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = prev; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ background: "rgba(4,12,10,0.82)", backdropFilter: "blur(10px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        className="w-full sm:max-w-sm flex flex-col"
        style={{
          background: "#081512",
          borderRadius: "28px 28px 0 0",
          maxHeight: "92dvh",
          border: "1px solid rgba(30,74,62,0.55)",
          borderBottom: "none",
          boxShadow: "0 -20px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Drag handle */}
        <div className="pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1 rounded-full" style={{ background: "rgba(155,168,163,0.2)" }} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3">
          <div>
            <p className="text-[9px] font-semibold tracking-[0.25em] uppercase mb-0.5"
              style={{ color: "#C89B3C" }}>
              ДЕМО — шаг {step + 1} из {TITLES.length}
            </p>
            <p className="text-base font-semibold" style={{ color: "#F5F7F6", letterSpacing: "-0.01em" }}>
              {TITLES[step]}
            </p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{ background: "rgba(30,74,62,0.45)", border: "1px solid rgba(30,74,62,0.5)" }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2.5 2.5L10.5 10.5M10.5 2.5L2.5 10.5"
                stroke="#9BA8A3" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Progress bar segments */}
        <div className="flex gap-1 px-5 pb-4">
          {TITLES.map((_, i) => (
            <motion.div key={i}
              className="flex-1 h-1 rounded-full"
              animate={{ background: i <= step ? "#C89B3C" : "rgba(30,74,62,0.4)" }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.22 }}
            >
              {step === 0 && <StepUpload onNext={next} />}
              {step === 1 && <StepStyle onNext={next} />}
              {step === 2 && <StepPrefs onNext={next} />}
              {step === 3 && <StepProcessing onNext={next} />}
              {step === 4 && <StepResults onNext={next} />}
              {step === 5 && <StepEstimate onClose={onClose} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

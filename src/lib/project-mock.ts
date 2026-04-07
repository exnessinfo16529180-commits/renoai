// ────────────────────────────────────────────────────────────────────────────
// RenoAI Mock Data
// All data here is structured to be replaced by real API responses later.
// Each section is marked with an AI_INTEGRATION_POINT comment.
// ────────────────────────────────────────────────────────────────────────────

export interface StyleOption {
  id: string;
  name: string;
  description: string;
  tags: string[];
  palette: string[];
}

// ┌── AI_INTEGRATION_POINT ─────────────────────────────────────────────────
// │ Replace with: GET /api/styles — returns style catalog from CMS/DB
// └─────────────────────────────────────────────────────────────────────────
export const STYLES: StyleOption[] = [
  {
    id: "modern",
    name: "Современный",
    description: "Чистые линии, функциональность и сдержанная элегантность",
    tags: ["светлый", "геометрия", "металл"],
    palette: ["#F5F1EB", "#2C2C2C", "#8B7355", "#6B8CAE"],
  },
  {
    id: "scandinavian",
    name: "Скандинавский",
    description: "Натуральные материалы, тепло и уют северного дома",
    tags: ["дерево", "уют", "природа"],
    palette: ["#FAF8F4", "#C8B99A", "#7A9E7E", "#8B8680"],
  },
  {
    id: "minimal",
    name: "Минимализм",
    description: "Максимум пространства, минимум лишнего. Свобода в простоте",
    tags: ["простота", "пространство", "воздух"],
    palette: ["#FFFFFF", "#1A1A1A", "#E8E4DE", "#9E9E9E"],
  },
  {
    id: "loft",
    name: "Лофт",
    description: "Индустриальная эстетика: кирпич, металл, открытые конструкции",
    tags: ["кирпич", "металл", "брутализм"],
    palette: ["#1E1810", "#8B4513", "#4A4A4A", "#D4845A"],
  },
  {
    id: "neoclassic",
    name: "Неоклассика",
    description: "Классические пропорции в современном исполнении",
    tags: ["лепнина", "симметрия", "благородство"],
    palette: ["#F5F0E8", "#C4B5A0", "#8A9E8A", "#C8A96E"],
  },
  {
    id: "luxury",
    name: "Luxury",
    description: "Глубина тёмных оттенков, мрамор, золото и шёлк",
    tags: ["мрамор", "золото", "эксклюзив"],
    palette: ["#08081A", "#1A1830", "#C8A84B", "#F0EEE8"],
  },
];

// ────────────────────────────────────────────────────────────────────────────

export interface DesignConcept {
  id: string;
  title: string;
  subtitle: string;
  style: string;
  mood: string;
  budgetLabel: string;
  highlights: string[];
  accentColor: string;
  bgGradient: string;
}

// ┌── AI_INTEGRATION_POINT ─────────────────────────────────────────────────
// │ Replace with: POST /api/generate-concepts
// │ Input:  { file, style, preferences }
// │ Output: DesignConcept[] with real generated images
// └─────────────────────────────────────────────────────────────────────────
export const CONCEPTS: DesignConcept[] = [
  {
    id: "concept-a",
    title: "Светлый минимум",
    subtitle: "Открытое пространство с тёплыми акцентами",
    style: "Современный",
    mood: "Спокойствие",
    budgetLabel: "В рамках бюджета",
    highlights: ["Светлый дуб", "Белые стены", "Скрытое освещение"],
    accentColor: "#C8A87A",
    bgGradient: "linear-gradient(135deg, #F5F1EB 0%, #E8DDD0 50%, #D4C4B0 100%)",
  },
  {
    id: "concept-b",
    title: "Тёмный контраст",
    subtitle: "Глубокие тона с золотыми деталями",
    style: "Неоклассика",
    mood: "Статус",
    budgetLabel: "Немного выше",
    highlights: ["Тёмный орех", "Арки", "Латунные акценты"],
    accentColor: "#C89B3C",
    bgGradient: "linear-gradient(135deg, #1A1510 0%, #2A2018 50%, #3A2E20 100%)",
  },
  {
    id: "concept-c",
    title: "Северное сияние",
    subtitle: "Скандинавская лёгкость и натуральные материалы",
    style: "Скандинавский",
    mood: "Уют",
    budgetLabel: "Оптимально",
    highlights: ["Берёза", "Льняной текстиль", "Зелёные акценты"],
    accentColor: "#7A9E7E",
    bgGradient: "linear-gradient(135deg, #F0EDE8 0%, #E0D8C8 50%, #C8C0B0 100%)",
  },
];

// ────────────────────────────────────────────────────────────────────────────

export interface StoreOption {
  id: string;
  name: string;
  tagline: string;
  rating: number;
  priceLevel: 1 | 2 | 3;
  estimate: string;
  deliveryDays: string;
  badge?: string;
}

// ┌── AI_INTEGRATION_POINT ─────────────────────────────────────────────────
// │ Replace with: POST /api/stores/match
// │ Input:  { concept, budget, location }
// │ Output: StoreOption[] ranked by match score
// └─────────────────────────────────────────────────────────────────────────
export const STORES: StoreOption[] = [
  {
    id: "store-leroy",
    name: "Leroy Merlin",
    tagline: "Полный ассортимент для вашего проекта",
    rating: 4.7,
    priceLevel: 2,
    estimate: "от 1 900 000 ₸",
    deliveryDays: "3–7 дней",
    badge: "Рекомендуем",
  },
  {
    id: "store-ikea",
    name: "ИКЕА",
    tagline: "Мебель и аксессуары под ваш стиль",
    rating: 4.5,
    priceLevel: 1,
    estimate: "от 900 000 ₸",
    deliveryDays: "5–10 дней",
  },
  {
    id: "store-decor",
    name: "Décor Premium",
    tagline: "Эксклюзивные материалы и дизайнерские решения",
    rating: 4.9,
    priceLevel: 3,
    estimate: "от 3 800 000 ₸",
    deliveryDays: "7–14 дней",
    badge: "Премиум",
  },
];

// ────────────────────────────────────────────────────────────────────────────

export interface DeliverySlot {
  id: string;
  date: string;
  dayLabel: string;
  times: { id: string; label: string; available: boolean }[];
}

export const DELIVERY_SLOTS: DeliverySlot[] = [
  {
    id: "d1",
    date: "Пн, 14 апр",
    dayLabel: "Пн",
    times: [
      { id: "d1-1", label: "09:00–12:00", available: true },
      { id: "d1-2", label: "13:00–17:00", available: true },
      { id: "d1-3", label: "17:00–21:00", available: false },
    ],
  },
  {
    id: "d2",
    date: "Вт, 15 апр",
    dayLabel: "Вт",
    times: [
      { id: "d2-1", label: "09:00–12:00", available: false },
      { id: "d2-2", label: "13:00–17:00", available: true },
      { id: "d2-3", label: "17:00–21:00", available: true },
    ],
  },
  {
    id: "d3",
    date: "Ср, 16 апр",
    dayLabel: "Ср",
    times: [
      { id: "d3-1", label: "09:00–12:00", available: true },
      { id: "d3-2", label: "13:00–17:00", available: true },
      { id: "d3-3", label: "17:00–21:00", available: true },
    ],
  },
  {
    id: "d4",
    date: "Чт, 17 апр",
    dayLabel: "Чт",
    times: [
      { id: "d4-1", label: "09:00–12:00", available: true },
      { id: "d4-2", label: "13:00–17:00", available: false },
      { id: "d4-3", label: "17:00–21:00", available: true },
    ],
  },
];

// ────────────────────────────────────────────────────────────────────────────

export interface RenovationTeam {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  reviewCount: number;
  estimate: string;
  duration: string;
  description: string;
  badges: string[];
}

// ┌── AI_INTEGRATION_POINT ─────────────────────────────────────────────────
// │ Replace with: POST /api/teams/match
// │ Input:  { scope, roomType, budget, location }
// │ Output: RenovationTeam[] ranked by match + availability
// └─────────────────────────────────────────────────────────────────────────
export const TEAMS: RenovationTeam[] = [
  {
    id: "team-alfa",
    name: "Alfa Interiors",
    specialization: "Дизайнерский ремонт под ключ",
    rating: 4.9,
    reviewCount: 142,
    estimate: "от 28 000 ₸/м²",
    duration: "45–60 дней",
    description:
      "Специализируемся на современных стилях. Работаем с авторскими проектами, используем BIM-технологии для точных расчётов.",
    badges: ["Топ-команда", "Гарантия 2 года"],
  },
  {
    id: "team-master",
    name: "МастерDom",
    specialization: "Полный цикл ремонтных работ",
    rating: 4.7,
    reviewCount: 318,
    estimate: "от 18 000 ₸/м²",
    duration: "40–55 дней",
    description:
      "Более 10 лет опыта. Работаем с любыми стилями, строгий контроль качества на каждом этапе.",
    badges: ["Популярный выбор"],
  },
  {
    id: "team-luxury",
    name: "LuxReno Studio",
    specialization: "Luxury и премиум-класс",
    rating: 5.0,
    reviewCount: 67,
    estimate: "от 55 000 ₸/м²",
    duration: "60–90 дней",
    description:
      "Работаем исключительно с материалами премиум-класса. Персональный куратор проекта, еженедельные отчёты.",
    badges: ["Премиум", "Персональный куратор"],
  },
];

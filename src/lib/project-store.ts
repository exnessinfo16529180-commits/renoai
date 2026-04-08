import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ProjectType = "new" | "renovation";
export type Scope = "full" | "room";
export type RoomType = "kitchen" | "bedroom" | "living" | "bathroom" | "kids" | "other";
export type Tones = "warm" | "neutral" | "cool";
export type Budget = "minimum" | "medium" | "premium";
export type StyleId = "modern" | "scandinavian" | "minimal" | "loft" | "neoclassic" | "luxury";

export interface UploadedFile {
  name: string;
  type: string;
  size: number;
}

export interface EstimateItem {
  label: string;
  amount: number;
}

export interface Estimate {
  total: number;
  breakdown: EstimateItem[];
  currency: string;
}

export interface ProjectData {
  currentStep: number;

  // ── New flow state ───────────────────────────────────────────────────────
  /** Multiple uploaded floor plan / photo files */
  images: UploadedFile[];
  /** Auto-generated cost estimate (populated at Step 5) */
  estimate: Estimate | null;
  /** Selected contractor id (mirrors selectedTeam) */
  selectedContractor: string | null;
  /** Renovation progress 0–100 */
  progress: number;

  // ── Legacy / extended fields ──────────────────────────────────────────────
  projectType: ProjectType | null;
  scope: Scope | null;
  roomType: RoomType | null;
  /** Single file kept for backwards compat; images[] is canonical */
  uploadedFile: UploadedFile | null;
  atmosphere: string | null;
  tones: Tones | null;
  budget: Budget | null;
  wishes: string;
  selectedStyle: StyleId | null;
  selectedConcept: string | null;
  selectedStore: string | null;
  selectedDelivery: string | null;
  selectedTeam: string | null;
  /** Partner residential complex pre-selected from the landing page */
  selectedComplex: string | null;
}

interface ProjectActions {
  setStep: (step: number) => void;
  update: (partial: Partial<ProjectData>) => void;
  reset: () => void;
}

export type ProjectState = ProjectData & ProjectActions;

const initial: ProjectData = {
  currentStep: 1,
  images: [],
  estimate: null,
  selectedContractor: null,
  progress: 0,
  projectType: null,
  scope: null,
  roomType: null,
  uploadedFile: null,
  atmosphere: null,
  tones: null,
  budget: null,
  wishes: "",
  selectedStyle: null,
  selectedConcept: null,
  selectedStore: null,
  selectedDelivery: null,
  selectedTeam: null,
  selectedComplex: null,
};

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      ...initial,
      setStep: (step) => set({ currentStep: step }),
      update: (partial) => set(partial),
      reset: () => set(initial),
    }),
    { name: "renoai-project-v1" }
  )
);

export const TOTAL_STEPS = 9;

export const STEP_LABELS: Record<number, string> = {
  1: "Загрузка",
  2: "Стиль",
  3: "Визуализация",
  4: "Кастомизация",
  5: "Смета",
  6: "Бюджет",
  7: "Материалы",
  8: "Подрядчики",
  9: "Прогресс",
};

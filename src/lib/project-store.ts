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

export interface ProjectData {
  currentStep: number;
  projectType: ProjectType | null;
  scope: Scope | null;
  roomType: RoomType | null;
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
}

interface ProjectActions {
  setStep: (step: number) => void;
  update: (partial: Partial<ProjectData>) => void;
  reset: () => void;
}

export type ProjectState = ProjectData & ProjectActions;

const initial: ProjectData = {
  currentStep: 1,
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

export const TOTAL_STEPS = 12;

export const STEP_LABELS: Record<number, string> = {
  1: "Тип проекта",
  2: "Объём работ",
  3: "Загрузка",
  4: "Анализ",
  5: "Стиль",
  6: "Генерация",
  7: "Концепции",
  8: "Материалы",
  9: "Доставка",
  10: "Команда",
  11: "Итог",
  12: "Договор",
};

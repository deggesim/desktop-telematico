/** Stato di sola interfaccia: nulla qui viene persistito. */

import { create } from "zustand";
import type { AppError } from "@shared/types";

type UiStore = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  errors: AppError[];
  pushError: (e: AppError) => void;
  dismissError: (index: number) => void;
};

export const useUiStore = create<UiStore>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  closeSidebar: () => set({ sidebarOpen: false }),
  errors: [],
  pushError: (e) => set((s) => ({ errors: [...s.errors, e] })),
  dismissError: (index) =>
    set((s) => ({ errors: s.errors.filter((_, i) => i !== index) })),
}));

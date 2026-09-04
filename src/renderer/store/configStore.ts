/**
 * Stato della configurazione applicativa, specchio di quanto persiste il main.
 * Ogni setter passa dall'IPC: il file su disco resta la verità, lo store è
 * la copia che React osserva.
 */

import { create } from "zustand";
import type { AppConfig, Language, UserProfile } from "@shared/types";
import { changeLanguage } from "../i18n";

type ConfigStore = {
  config: AppConfig | null;
  loaded: boolean;
  load: () => Promise<void>;
  patch: (p: Partial<AppConfig>) => Promise<void>;
  setProfile: (p: UserProfile) => Promise<void>;
  setLanguage: (l: Language) => Promise<void>;
  completeFirstRun: (
    workspacePath: string,
    profile: UserProfile,
  ) => Promise<void>;
  resetFirstRun: () => Promise<void>;
};

export const useConfigStore = create<ConfigStore>((set, get) => ({
  config: null,
  loaded: false,

  load: async () => {
    const config = await window.electronAPI.configGetAll();
    await changeLanguage(config.language);
    set({ config, loaded: true });
  },

  patch: async (p) => {
    const config = await window.electronAPI.configSet(p);
    set({ config });
  },

  setProfile: async (profile) => {
    await get().patch({ profile });
  },

  setLanguage: async (language) => {
    await changeLanguage(language);
    await get().patch({ language });
  },

  completeFirstRun: async (workspacePath, profile) => {
    await window.electronAPI.workspaceEnsure(workspacePath);
    await get().patch({ workspacePath, profile, firstRunCompleted: true });
  },

  // "Esci" non chiude l'app: riporta al primo avvio per rifare solo la scelta
  // Entratel/Fisconline. La cartella di lavoro già scelta resta in config.
  resetFirstRun: async () => {
    await get().patch({ profile: null, firstRunCompleted: false });
  },
}));

/** Profilo attivo. `null` finché il primo avvio non è stato completato. */
export const useProfile = (): UserProfile | null =>
  useConfigStore((s) => s.config?.profile ?? null);

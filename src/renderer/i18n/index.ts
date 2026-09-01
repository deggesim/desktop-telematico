/**
 * Localizzazione. Italiano predefinito, inglese seconda lingua.
 *
 * Aggiungere una lingua = aggiungere il codice in LANGUAGES (shared/domain/profile.ts),
 * il file JSON in locales/ e una riga in `resources`. Nient'altro cambia:
 * il selettore in header si popola da LANGUAGES.
 *
 * I dizionari sono importati staticamente. Sono piccoli e l'applicazione è
 * desktop: il lazy loading aggiungerebbe uno stato di caricamento senza
 * risolvere alcun problema reale. Se le lingue diventano molte, il punto in
 * cui intervenire è questo file e solo questo.
 */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  type Language,
} from "@shared/domain/profile";
import it from "./locales/it.json";
import en from "./locales/en.json";

const resources: Record<Language, { translation: typeof it }> = {
  it: { translation: it },
  en: { translation: en as typeof it },
};

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: [...LANGUAGES],
  interpolation: { escapeValue: false },
  returnNull: false,
});

export const changeLanguage = async (lng: Language): Promise<void> => {
  await i18n.changeLanguage(lng);
  document.documentElement.lang = lng;
};

export default i18n;

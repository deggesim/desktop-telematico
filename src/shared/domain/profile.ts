/**
 * Profilo utente. La scelta al primo avvio governa tutta la navigazione.
 *
 * Nome canonico: i requisiti usano tre grafie diverse per lo stesso profilo
 * (Fisconline, Fileinternet, Fiscoline) e il manuale chiama il modulo
 * "Applicazione FILE INTERNET". In codice e in UI usiamo **Fisconline**;
 * l'allineamento formale è la domanda aperta sul naming.
 */
export const USER_PROFILES = ["entratel", "fisconline"] as const;
export type UserProfile = (typeof USER_PROFILES)[number];

export const isUserProfile = (v: unknown): v is UserProfile =>
  typeof v === "string" && (USER_PROFILES as readonly string[]).includes(v);

/** Lingue supportate. Italiano predefinito, inglese seconda lingua. */
export const LANGUAGES = ["it", "en"] as const;
export type Language = (typeof LANGUAGES)[number];
export const DEFAULT_LANGUAGE: Language = "it";

export const isLanguage = (v: unknown): v is Language =>
  typeof v === "string" && (LANGUAGES as readonly string[]).includes(v);

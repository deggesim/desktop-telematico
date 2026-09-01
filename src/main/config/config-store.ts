/**
 * Configurazione applicativa su file JSON in userData.
 *
 * JSON e non SQLite: la config va letta prima che la finestra esista e prima
 * che il modulo nativo sia caricato, e deve restare leggibile a mano in
 * assistenza. SQLite resta per lo Storico, che è l'unico dato tabellare.
 */

import { app } from "electron";
import fs from "fs";
import path from "path";
import type { AppConfig } from "../../shared/types.js";
import { DEFAULT_LANGUAGE } from "../../shared/domain/profile.js";

const CONFIG_FILE = "config.json";

const defaults = (): AppConfig => ({
  workspacePath: "",
  profile: null,
  securityEnvPath: "",
  archivePath: "",
  language: DEFAULT_LANGUAGE,
  proxy: {
    enabled: false,
    http: { host: "", port: null },
    https: { host: "", port: null },
    socks: { host: "", port: null },
    authEnabled: false,
    username: "",
    // Default del Desktop attuale
    noProxyHosts: ["localhost", "127.0.0.1"],
  },
  firstRunCompleted: false,
});

const configPath = (): string =>
  path.join(app.getPath("userData"), CONFIG_FILE);

let cache: AppConfig | null = null;

/** Merge superficiale + merge del solo sotto-oggetto proxy: basta e non nasconde errori. */
const merge = (base: AppConfig, patch: Partial<AppConfig>): AppConfig => ({
  ...base,
  ...patch,
  proxy: patch.proxy ? { ...base.proxy, ...patch.proxy } : base.proxy,
});

export const loadConfig = (): AppConfig => {
  if (cache) return cache;
  const file = configPath();
  if (!fs.existsSync(file)) {
    cache = defaults();
    return cache;
  }
  try {
    const raw = JSON.parse(fs.readFileSync(file, "utf8")) as Partial<AppConfig>;
    cache = merge(defaults(), raw);
  } catch (err) {
    // Config illeggibile: si riparte dai default invece di impedire l'avvio.
    console.error("[config] file illeggibile, uso i default:", err);
    cache = defaults();
  }
  return cache;
};

export const saveConfig = (patch: Partial<AppConfig>): AppConfig => {
  const next = merge(loadConfig(), patch);
  fs.mkdirSync(path.dirname(configPath()), { recursive: true });
  fs.writeFileSync(configPath(), JSON.stringify(next, null, 2), "utf8");
  cache = next;
  return next;
};

export const resetConfig = (): AppConfig => {
  cache = null;
  const next = defaults();
  fs.writeFileSync(configPath(), JSON.stringify(next, null, 2), "utf8");
  cache = next;
  return next;
};

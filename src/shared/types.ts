/**
 * Tipi condivisi tra main, preload e renderer.
 * Unica definizione del contratto IPC: `ElectronAPI` è ciò che il preload
 * espone su `window.electronAPI`.
 */

import type { Language, UserProfile } from "./domain/profile.js";

export type { Language, UserProfile };

/** Configurazione persistita. Il primo avvio è "config incompleta". */
export type AppConfig = {
  /** Cartella di lavoro. Obbligatoria al primo avvio. */
  workspacePath: string;
  /** Profilo utente. Obbligatorio al primo avvio. */
  profile: UserProfile | null;
  /** Cartella dell'ambiente di sicurezza. Configurabile da Impostazioni. */
  securityEnvPath: string;
  /** Cartella Archivio, indipendente e configurabile (Manuale cap. 2). */
  archivePath: string;
  language: Language;
  proxy: ProxyConfig;
  /** true dopo che il dialogo di primo avvio è stato completato */
  firstRunCompleted: boolean;
};

/**
 * Proxy. Replica il modello del Desktop attuale (per schema, con esclusioni).
 * Il requisito parla di «eventuale proxy locale», che è meno di così:
 * la semplificazione è una domanda aperta, quindi teniamo il modello ampio.
 */
export type ProxyConfig = {
  enabled: boolean;
  http: ProxyEndpoint;
  https: ProxyEndpoint;
  socks: ProxyEndpoint;
  authEnabled: boolean;
  username: string;
  /** Host esclusi. Il default del Desktop attuale include localhost e 127.0.0.1 */
  noProxyHosts: string[];
};

export type ProxyEndpoint = { host: string; port: number | null };

/** Esito dell'ispezione di una cartella candidata ad ambiente di sicurezza. */
export type SecurityEnvStatus = {
  path: string;
  exists: boolean;
  /** La guida impone di rinominare con timestamp una cartella non vuota */
  empty: boolean;
  /** Quali degli artefatti noti sono presenti */
  files: Record<string, boolean>;
};

/** Stato dell'area di lavoro e delle sue sotto-cartelle. */
export type WorkspaceStatus = {
  path: string;
  exists: boolean;
  writable: boolean;
  missingSubdirs: string[];
};

/** Riga dello Storico (Manuale cap. 10). */
export type StoricoRow = {
  id: number;
  /** Sicurezza | Controllo | Autentica | Firma */
  operazione: StoricoOperazione;
  /** ISO 8601 */
  timestamp: string;
  fileName: string;
  /** Hash identificativo del file, calcolato alla predisposizione */
  fileHash: string;
  esito: string;
  protocollo: string | null;
  dettaglio: string | null;
};

export const STORICO_OPERAZIONI = [
  "sicurezza",
  "controllo",
  "autentica",
  "firma",
] as const;
export type StoricoOperazione = (typeof STORICO_OPERAZIONI)[number];

export type StoricoQuery = {
  operazione?: StoricoOperazione;
  /** ISO date, estremi inclusi */
  dataDa?: string;
  dataA?: string;
  limit?: number;
  offset?: number;
};

export type StoricoResult = { rows: StoricoRow[]; total: number };

/** Informazioni mostrate in Impostazioni > Informazioni. */
export type AppInfo = {
  appVersion: string;
  electronVersion: string;
  chromeVersion: string;
  nodeVersion: string;
  /** process.platform: "win32" | "darwin" | "linux" | ... */
  platform: string;
  arch: string;
  workspacePath: string;
  /**
   * Moduli di controllo installati. Vuoto finché non esiste il servizio che li
   * espone: è una delle voci bloccanti.
   */
  moduliControllo: ModuloControllo[];
  /**
   * Componenti di business installate. «Per ora non applicabile» secondo il
   * requisito, ma la tabella deve comunque esporre i sei campi.
   */
  componentiBusiness: ComponenteBusiness[];
};

export type ModuloControllo = {
  nome: string;
  versione: string;
  dataAggiornamento: string;
};

export type ComponenteBusiness = {
  nome: string;
  funzionalita: string;
  versione: string;
  dataAggiornamento: string;
  classeJar: string;
  firmato: boolean;
};

export type LogLevel = "debug" | "info" | "warn" | "error";
export type LogEntry = {
  ts: string;
  level: LogLevel;
  scope: string;
  message: string;
};

/** Errore applicativo spinto dal main al renderer. */
export type AppError = { code: string; message: string; detail?: string };

/** Contratto esposto dal preload su window.electronAPI. */
export type ElectronAPI = {
  // Push: ritornano la funzione di unsubscribe
  onAppError: (cb: (e: AppError) => void) => () => void;

  // Configurazione
  configGetAll: () => Promise<AppConfig>;
  configSet: (patch: Partial<AppConfig>) => Promise<AppConfig>;
  configReset: () => Promise<AppConfig>;

  // Dialoghi nativi
  dialogSelectDirectory: (titleKey?: string) => Promise<string | null>;
  dialogSelectFiles: (options?: {
    multiple?: boolean;
    extensions?: string[];
  }) => Promise<string[]>;

  // Area di lavoro
  workspaceEnsure: (root: string) => Promise<WorkspaceStatus>;
  workspaceStat: (root: string) => Promise<WorkspaceStatus>;

  // Ambiente di sicurezza
  securityEnvInspect: (dir: string) => Promise<SecurityEnvStatus>;

  // Storico
  storicoList: (q: StoricoQuery) => Promise<StoricoResult>;
  storicoInsert: (row: Omit<StoricoRow, "id">) => Promise<number>;

  // Log
  logAppend: (entry: Omit<LogEntry, "ts">) => Promise<void>;
  logRead: (maxLines?: number) => Promise<LogEntry[]>;

  // Applicazione
  appGetInfo: () => Promise<AppInfo>;
  appOpenExternal: (url: string) => Promise<void>;
  appQuit: () => Promise<void>;
};

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

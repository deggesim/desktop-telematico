/**
 * Nomi dei canali IPC, in un posto solo.
 *
 * Convenzione: `dominio:azione`. I canali push (main → renderer) stanno in
 * PUSH_CHANNELS e nel preload diventano `on<Nome>` che restituisce la funzione
 * di unsubscribe.
 */

export const IPC = {
  // Configurazione applicativa (primo avvio, workspace, profilo, lingua, proxy)
  configGetAll: "config:getAll",
  configSet: "config:set",
  configReset: "config:reset",

  // Dialoghi nativi — un browser non può farlo, ed è il motivo per cui
  // l'applicazione è Electron e non una web app.
  dialogSelectDirectory: "dialog:selectDirectory",
  dialogSelectFiles: "dialog:selectFiles",

  // File system dell'area di lavoro
  workspaceEnsure: "workspace:ensure",
  workspaceStat: "workspace:stat",

  // Ambiente di sicurezza (per ora sola ispezione: nessuna operazione crittografica
  // finché il cliente non decide dove gira il codice che apre i keystore)
  securityEnvInspect: "securityEnv:inspect",

  // Storico su SQLite locale
  storicoList: "storico:list",
  storicoInsert: "storico:insert",

  // Log frontend
  logAppend: "log:append",
  logRead: "log:read",

  // Applicazione
  appGetInfo: "app:getInfo",
  appOpenExternal: "app:openExternal",
  appQuit: "app:quit",
} as const;

export const PUSH = {
  appError: "app:error",
} as const;

export type IpcChannel = (typeof IPC)[keyof typeof IPC];
export type PushChannel = (typeof PUSH)[keyof typeof PUSH];

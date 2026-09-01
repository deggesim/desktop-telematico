/**
 * Registrazione di tutti gli handler IPC.
 *
 * Deve girare PRIMA di createWindow, così ogni `ipcMain.handle` è in piedi
 * quando il renderer manda la sua prima chiamata.
 */

import { app, BrowserWindow, dialog, ipcMain, shell } from "electron";
import { IPC } from "../../shared/ipc-channels.js";
import type {
  AppConfig,
  AppInfo,
  LogEntry,
  StoricoQuery,
  StoricoRow,
} from "../../shared/types.js";
import { loadConfig, resetConfig, saveConfig } from "../config/config-store.js";
import { insertStorico, listStorico } from "../db/db.js";
import { appendLog, readLog } from "../logger.js";
import { inspectSecurityEnv } from "../services/security-env.js";
import { ensureWorkspace, statWorkspace } from "../services/workspace.js";

/** Solo http(s): mai aprire file:// o schemi arbitrari da input del renderer. */
const isSafeExternalUrl = (url: string): boolean => {
  try {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
};

const buildAppInfo = (): AppInfo => ({
  appVersion: app.getVersion(),
  electronVersion: process.versions.electron,
  chromeVersion: process.versions.chrome,
  nodeVersion: process.versions.node,
  platform: process.platform,
  arch: process.arch,
  workspacePath: loadConfig().workspacePath,
  // Vuoti finché non esiste il servizio che li espone: sono voci bloccanti,
  // non dimenticanze. La tabella in Impostazioni > Informazioni mostra
  // comunque le sei colonne richieste dal requisito.
  moduliControllo: [],
  componentiBusiness: [],
});

export const registerIpcHandlers = (): void => {
  ipcMain.handle(IPC.configGetAll, (): AppConfig => loadConfig());
  ipcMain.handle(IPC.configSet, (_e, patch: Partial<AppConfig>): AppConfig =>
    saveConfig(patch),
  );
  ipcMain.handle(IPC.configReset, (): AppConfig => resetConfig());

  ipcMain.handle(
    IPC.dialogSelectDirectory,
    async (e, title?: string): Promise<string | null> => {
      const win = BrowserWindow.fromWebContents(e.sender);
      const opts: Electron.OpenDialogOptions = {
        properties: ["openDirectory", "createDirectory"],
        ...(title ? { title } : {}),
      };
      const res = win
        ? await dialog.showOpenDialog(win, opts)
        : await dialog.showOpenDialog(opts);
      return res.canceled || res.filePaths.length === 0
        ? null
        : res.filePaths[0]!;
    },
  );

  ipcMain.handle(
    IPC.dialogSelectFiles,
    async (
      e,
      options?: { multiple?: boolean; extensions?: string[] },
    ): Promise<string[]> => {
      const win = BrowserWindow.fromWebContents(e.sender);
      const properties: Electron.OpenDialogOptions["properties"] =
        options?.multiple ? ["openFile", "multiSelections"] : ["openFile"];
      const opts: Electron.OpenDialogOptions = {
        properties,
        ...(options?.extensions?.length
          ? { filters: [{ name: "File", extensions: options.extensions }] }
          : {}),
      };
      const res = win
        ? await dialog.showOpenDialog(win, opts)
        : await dialog.showOpenDialog(opts);
      return res.canceled ? [] : res.filePaths;
    },
  );

  ipcMain.handle(IPC.workspaceEnsure, (_e, root: string) =>
    ensureWorkspace(root),
  );
  ipcMain.handle(IPC.workspaceStat, (_e, root: string) => statWorkspace(root));

  ipcMain.handle(IPC.securityEnvInspect, (_e, dir: string) =>
    inspectSecurityEnv(dir),
  );

  ipcMain.handle(IPC.storicoList, (_e, q: StoricoQuery) => listStorico(q));
  ipcMain.handle(IPC.storicoInsert, (_e, row: Omit<StoricoRow, "id">) =>
    insertStorico(row),
  );

  ipcMain.handle(IPC.logAppend, (_e, entry: Omit<LogEntry, "ts">) => {
    appendLog(entry.level, entry.scope, entry.message);
  });
  ipcMain.handle(IPC.logRead, (_e, maxLines?: number) => readLog(maxLines));

  ipcMain.handle(IPC.appGetInfo, (): AppInfo => buildAppInfo());
  ipcMain.handle(
    IPC.appOpenExternal,
    async (_e, url: string): Promise<void> => {
      if (!isSafeExternalUrl(url)) throw new Error("url.nonConsentito");
      await shell.openExternal(url);
    },
  );
  ipcMain.handle(IPC.appQuit, () => app.quit());
};

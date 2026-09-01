/**
 * Entry point del main process — Desktop Telematico Entrate.
 *
 * Impostazione di sicurezza: contextIsolation on, nodeIntegration off,
 * sandbox on, nessuna navigazione fuori dall'app, nessuna finestra secondaria
 * aperta dal renderer. I link esterni passano da shell.openExternal via IPC.
 */

import { app, BrowserWindow, shell } from "electron";
import { is } from "@electron-toolkit/utils";
import path from "path";
import { fileURLToPath } from "url";
import { closeDb } from "./db/db.js";
import { registerIpcHandlers } from "./ipc/register-handlers.js";
import { appendLog } from "./logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let mainWindow: BrowserWindow | null = null;

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 1024,
    minHeight: 700,
    show: false,
    autoHideMenuBar: true,
    // Fondo chiaro: il design kit è light-only (il tema scuro del kit copre
    // otto variabili della navbar e non è un tema).
    backgroundColor: "#ffffff",
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  mainWindow.once("ready-to-show", () => mainWindow?.show());

  // Nessuna finestra secondaria: i link esterni vanno al browser di sistema.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:") || url.startsWith("http:"))
      shell.openExternal(url);
    return { action: "deny" };
  });

  // Nessuna navigazione fuori dall'applicazione.
  mainWindow.webContents.on("will-navigate", (event, url) => {
    const rendererUrl = process.env["ELECTRON_RENDERER_URL"];
    const consentito = rendererUrl
      ? url.startsWith(rendererUrl)
      : url.startsWith("file:");
    if (!consentito) event.preventDefault();
  });

  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

// Istanza singola: due processi che scrivono lo stesso ambiente di sicurezza
// o lo stesso SQLite sono una corruzione che l'utente non sa diagnosticare.
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (!mainWindow) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  });

  app.whenReady().then(() => {
    // Prima gli handler, poi la finestra: il renderer chiama config:getAll
    // al primo render.
    registerIpcHandlers();
    createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });
}

app.on("window-all-closed", () => {
  closeDb();
  if (process.platform !== "darwin") app.quit();
});

process.on("uncaughtException", (err) => {
  appendLog("error", "main", `uncaughtException: ${err.stack ?? err.message}`);
});

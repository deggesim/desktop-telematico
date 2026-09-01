import { contextBridge, ipcRenderer } from "electron";
import { IPC, PUSH } from "../shared/ipc-channels.js";
import type {
  AppConfig,
  AppError,
  AppInfo,
  ElectronAPI,
  LogEntry,
  SecurityEnvStatus,
  StoricoQuery,
  StoricoResult,
  StoricoRow,
  WorkspaceStatus,
} from "../shared/types.js";
// Output forzato a CJS da electron.vite.config.ts (il preload con sandbox:true richiede CJS)

const api: ElectronAPI = {
  onAppError: (cb: (e: AppError) => void) => {
    const listener = (_event: Electron.IpcRendererEvent, data: AppError) =>
      cb(data);
    ipcRenderer.on(PUSH.appError, listener);
    return () => ipcRenderer.removeListener(PUSH.appError, listener);
  },

  configGetAll: (): Promise<AppConfig> => ipcRenderer.invoke(IPC.configGetAll),
  configSet: (patch: Partial<AppConfig>): Promise<AppConfig> =>
    ipcRenderer.invoke(IPC.configSet, patch),
  configReset: (): Promise<AppConfig> => ipcRenderer.invoke(IPC.configReset),

  dialogSelectDirectory: (title?: string): Promise<string | null> =>
    ipcRenderer.invoke(IPC.dialogSelectDirectory, title),
  dialogSelectFiles: (options?: {
    multiple?: boolean;
    extensions?: string[];
  }): Promise<string[]> => ipcRenderer.invoke(IPC.dialogSelectFiles, options),

  workspaceEnsure: (root: string): Promise<WorkspaceStatus> =>
    ipcRenderer.invoke(IPC.workspaceEnsure, root),
  workspaceStat: (root: string): Promise<WorkspaceStatus> =>
    ipcRenderer.invoke(IPC.workspaceStat, root),

  securityEnvInspect: (dir: string): Promise<SecurityEnvStatus> =>
    ipcRenderer.invoke(IPC.securityEnvInspect, dir),

  storicoList: (q: StoricoQuery): Promise<StoricoResult> =>
    ipcRenderer.invoke(IPC.storicoList, q),
  storicoInsert: (row: Omit<StoricoRow, "id">): Promise<number> =>
    ipcRenderer.invoke(IPC.storicoInsert, row),

  logAppend: (entry: Omit<LogEntry, "ts">): Promise<void> =>
    ipcRenderer.invoke(IPC.logAppend, entry),
  logRead: (maxLines?: number): Promise<LogEntry[]> =>
    ipcRenderer.invoke(IPC.logRead, maxLines),

  appGetInfo: (): Promise<AppInfo> => ipcRenderer.invoke(IPC.appGetInfo),
  appOpenExternal: (url: string): Promise<void> =>
    ipcRenderer.invoke(IPC.appOpenExternal, url),
  appQuit: (): Promise<void> => ipcRenderer.invoke(IPC.appQuit),
};

contextBridge.exposeInMainWorld("electronAPI", api);

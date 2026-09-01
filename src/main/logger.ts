/**
 * Log frontend su file, esposto dalla voce Strumenti > Log frontend.
 * Rotazione a dimensione: un solo file .1 di backup, che è quanto serve
 * per una postazione utente.
 */

import fs from "fs";
import path from "path";
import { app } from "electron";
import type { LogEntry, LogLevel } from "../shared/types.js";

const MAX_BYTES = 2 * 1024 * 1024;

const logFile = (): string =>
  path.join(app.getPath("userData"), "logs", "frontend.log");

const rotateIfNeeded = (file: string): void => {
  try {
    if (fs.statSync(file).size < MAX_BYTES) return;
    fs.renameSync(file, `${file}.1`);
  } catch {
    // Il file non esiste ancora: niente da ruotare.
  }
};

export const appendLog = (
  level: LogLevel,
  scope: string,
  message: string,
): void => {
  const file = logFile();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  rotateIfNeeded(file);
  const entry: LogEntry = {
    ts: new Date().toISOString(),
    level,
    scope,
    message,
  };
  fs.appendFileSync(file, `${JSON.stringify(entry)}\n`, "utf8");
};

export const readLog = (maxLines = 500): LogEntry[] => {
  const file = logFile();
  if (!fs.existsSync(file)) return [];
  const lines = fs.readFileSync(file, "utf8").split("\n").filter(Boolean);
  return lines.slice(-maxLines).flatMap((l) => {
    try {
      return [JSON.parse(l) as LogEntry];
    } catch {
      return [];
    }
  });
};

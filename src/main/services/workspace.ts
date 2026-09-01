/**
 * Area di lavoro: creazione e verifica delle sotto-cartelle documentate.
 *
 * Il Desktop attuale è un modello a stati sul file system: le funzionalità
 * spostano i file tra queste cartelle e li rinominano aggiungendo il
 * protocollo telematico. Replicare la struttura è il prerequisito di tutto
 * il resto — o va esplicitamente sostituita, ma è una decisione da prendere,
 * non da subire.
 */

import fs from "fs";
import path from "path";
import { WORKSPACE_SUBDIRS } from "../../shared/domain/constants.js";
import type { WorkspaceStatus } from "../../shared/types.js";

const DOCUMENTI_DIR = "Documenti";

const subdirPaths = (root: string): string[] =>
  WORKSPACE_SUBDIRS.map((s) => path.join(root, DOCUMENTI_DIR, s));

export const statWorkspace = (root: string): WorkspaceStatus => {
  if (!root)
    return { path: root, exists: false, writable: false, missingSubdirs: [] };
  const exists = fs.existsSync(root);
  let writable = false;
  if (exists) {
    try {
      fs.accessSync(root, fs.constants.W_OK);
      writable = true;
    } catch {
      writable = false;
    }
  }
  const missingSubdirs = subdirPaths(root).filter((p) => !fs.existsSync(p));
  return { path: root, exists, writable, missingSubdirs };
};

/** Crea la struttura mancante. Idempotente. */
export const ensureWorkspace = (root: string): WorkspaceStatus => {
  if (!root) throw new Error("workspace.pathVuoto");
  for (const p of subdirPaths(root)) fs.mkdirSync(p, { recursive: true });
  return statWorkspace(root);
};

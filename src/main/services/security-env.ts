/**
 * Ambiente di sicurezza — SOLA ISPEZIONE.
 *
 * Qui non c'è, e per ora non deve esserci, alcuna operazione crittografica.
 * Il modello attuale è interamente locale: chiavi RSA 4096, firma
 * SHA256withRSA, PKCS#12 su cartella scelta dall'utente, e la chiave privata
 * non lascia mai la postazione. Spostare quelle operazioni lato server
 * cambierebbe il modello di sicurezza, non solo l'architettura.
 *
 * Finché il cliente non risponde per iscritto su (a) dove gira il codice che
 * apre i keystore e (b) su quale canale transita la password di protezione,
 * questo modulo si limita a dire cosa c'è sul disco. È la domanda aperta #2.
 */

import fs from "fs";
import path from "path";
import { SECURITY_FILES } from "../../shared/domain/constants.js";
import type { SecurityEnvStatus } from "../../shared/types.js";

export const inspectSecurityEnv = (dir: string): SecurityEnvStatus => {
  const exists = Boolean(dir) && fs.existsSync(dir);
  const entries = exists ? fs.readdirSync(dir) : [];
  const files: Record<string, boolean> = {};
  for (const name of Object.values(SECURITY_FILES))
    files[name] = entries.some((e) => e.toUpperCase() === name.toUpperCase());
  return { path: dir, exists, empty: exists && entries.length === 0, files };
};

/**
 * La guida impone: se la cartella scelta non è vuota, va rinominata
 * aggiungendo un timestamp (es. `Ambiente_sicurezza_1547083116289`) prima di
 * sovrascriverla. Il nome nuovo viene restituito al chiamante.
 */
export const archiveNonEmptyDir = (dir: string): string => {
  const target = `${dir}_${Date.now()}`;
  fs.renameSync(dir, target);
  fs.mkdirSync(dir, { recursive: true });
  return path.basename(target);
};

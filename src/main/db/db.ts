/**
 * SQLite locale per lo Storico.
 *
 * Il Desktop attuale usa un Apache Derby embedded. Qui SQLite via
 * better-sqlite3: sincrono, nessun server, e già nello stack.
 * La migrazione dei dati Derby esistenti NON è nel perimetro finché il
 * cliente non risponde (domanda aperta sul destino dei dati locali).
 */

import Database from "better-sqlite3";
import path from "path";
import { app } from "electron";
import type {
  StoricoQuery,
  StoricoResult,
  StoricoRow,
} from "../../shared/types.js";

let _db: Database.Database | null = null;

const initSchema = (db: Database.Database): void => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS storico (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      operazione  TEXT NOT NULL,
      timestamp   TEXT NOT NULL,
      file_name   TEXT NOT NULL,
      file_hash   TEXT NOT NULL,
      esito       TEXT NOT NULL,
      protocollo  TEXT,
      dettaglio   TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_storico_ts ON storico (timestamp);
    CREATE INDEX IF NOT EXISTS idx_storico_op ON storico (operazione, timestamp);
    CREATE INDEX IF NOT EXISTS idx_storico_hash ON storico (file_hash);
  `);
};

export const getDb = (): Database.Database => {
  if (_db) return _db;
  const file = path.join(app.getPath("userData"), "desktop-telematico.db");
  _db = new Database(file);
  _db.pragma("journal_mode = WAL");
  initSchema(_db);
  return _db;
};

export const closeDb = (): void => {
  _db?.close();
  _db = null;
};

type StoricoDbRow = {
  id: number;
  operazione: string;
  timestamp: string;
  file_name: string;
  file_hash: string;
  esito: string;
  protocollo: string | null;
  dettaglio: string | null;
};

const toStoricoRow = (r: StoricoDbRow): StoricoRow => ({
  id: r.id,
  operazione: r.operazione as StoricoRow["operazione"],
  timestamp: r.timestamp,
  fileName: r.file_name,
  fileHash: r.file_hash,
  esito: r.esito,
  protocollo: r.protocollo,
  dettaglio: r.dettaglio,
});

export const listStorico = (q: StoricoQuery): StoricoResult => {
  const db = getDb();
  const where: string[] = [];
  const params: Record<string, string | number> = {};
  if (q.operazione) {
    where.push("operazione = @operazione");
    params.operazione = q.operazione;
  }
  if (q.dataDa) {
    where.push("timestamp >= @dataDa");
    params.dataDa = q.dataDa;
  }
  if (q.dataA) {
    where.push("timestamp <= @dataA");
    params.dataA = q.dataA;
  }
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const total = (
    db.prepare(`SELECT COUNT(*) AS n FROM storico ${clause}`).get(params) as {
      n: number;
    }
  ).n;

  const rows = db
    .prepare(
      `SELECT * FROM storico ${clause} ORDER BY timestamp DESC LIMIT @limit OFFSET @offset`,
    )
    .all({
      ...params,
      limit: q.limit ?? 50,
      offset: q.offset ?? 0,
    }) as StoricoDbRow[];

  return { rows: rows.map(toStoricoRow), total };
};

export const insertStorico = (row: Omit<StoricoRow, "id">): number => {
  const info = getDb()
    .prepare(
      `INSERT INTO storico (operazione, timestamp, file_name, file_hash, esito, protocollo, dettaglio)
       VALUES (@operazione, @timestamp, @fileName, @fileHash, @esito, @protocollo, @dettaglio)`,
    )
    .run({
      ...row,
      protocollo: row.protocollo ?? null,
      dettaglio: row.dettaglio ?? null,
    });
  return Number(info.lastInsertRowid);
};

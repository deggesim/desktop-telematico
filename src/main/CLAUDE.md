# src/main — main process

Processo Node di Electron. Qui vive tutto ciò che il renderer non può fare:
disco, dialoghi nativi, SQLite, log.

| File | Cosa fa |
| --- | --- |
| `main.ts` | Entry point. Finestra 1280×860, `contextIsolation` + `sandbox` attivi, `nodeIntegration` off. Blocca navigazione fuori dall'app e finestre secondarie. Istanza singola. Registra gli handler IPC **prima** di creare la finestra: il renderer chiama `config:getAll` al primo render. |
| `ipc/register-handlers.ts` | Tutti gli `ipcMain.handle`, uno per canale di `shared/ipc-channels.ts`. `appOpenExternal` accetta solo http/https. |
| `config/config-store.ts` | Configurazione su `userData/config.json`. JSON e non SQLite: va letta prima che esistano finestra e modulo nativo, e deve restare leggibile a mano in assistenza. |
| `db/db.ts` | SQLite (better-sqlite3) per lo **Storico**. Tabella `storico` con indici su timestamp, operazione e hash file. Il Desktop attuale usa Derby: la migrazione non è nel perimetro finché il cliente non risponde. |
| `services/workspace.ts` | Crea e verifica la struttura dell'area di lavoro: `Documenti/` con le sette sotto-cartelle documentate. Idempotente. |
| `services/security-env.ts` | **Sola ispezione** dell'ambiente di sicurezza. Nessuna operazione crittografica finché il cliente non decide dove gira il codice che apre i keystore. `archiveNonEmptyDir` implementa la regola della guida: cartella non vuota → rinomina con timestamp. |
| `logger.ts` | Log frontend su file JSONL in `userData/logs/`, rotazione a 2 MB con un solo backup. |

## Regole

- Ogni nuovo canale IPC: prima il nome in `shared/ipc-channels.ts`, poi il tipo in `ElectronAPI` (`shared/types.ts`), poi handler qui e passacarte nel preload. Tre file, sempre in quest'ordine.
- Qui si usa `process.env`, mai `import.meta.env`.
- Import con estensione `.js` esplicita: `package.json` ha `"type": "module"` e i self-check girano sotto `node` senza loader.
- Nessun path assoluto hardcoded. Tutto passa da `app.getPath("userData")` o dalla config.

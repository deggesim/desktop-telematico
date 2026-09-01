# CLAUDE.md

Guida per Claude Code (claude.ai/code) quando lavora in questo repository.

## Project Overview

Front end **Electron + React** della nuova applicazione desktop **Desktop Telematico Entrate** (Agenzia delle entrate / Sogei). Sostituisce il client Java esistente. Due profili utente, **Entratel** e **Fisconline**, scelti al primo avvio: la scelta governa tutta la navigazione.

**Lingua dell'interfaccia**: italiano predefinito, inglese seconda lingua, architettura predisposta per lingue ulteriori (requisito esplicito).
**Lingua del codice e dei commenti**: italiano per i commenti di dominio, inglese per i nomi tecnici standard.
**Code language**: TypeScript strict. `.ts` per main/preload/shared, `.tsx` per i componenti React.
**Stato**: scheletro. Le ~26 schermate del perimetro sono stub che dichiarano fonte e stato della specifica.

## Commands

Vedi `package.json`. Le parti non ovvie:

- `npm run rebuild:native` è **obbligatorio dopo ogni `npm install`** — `better-sqlite3` va compilato contro la versione di Node di Electron. Senza, l'app crasha all'apertura dello Storico.
- `npm run selfcheck` esegue i self-check assert-based (validatori di dominio, invarianti del modello di navigazione). Non serve nulla in esecuzione.
- Se compaiono errori TypeScript in `npm run dev`, fermarsi e lanciare `npm run typecheck` per la lista completa prima di ripartire.
- `npm run build:electron` è l'unico script che produce un distribuibile; `npm run build` è il solo bundle Vite. `build:win` / `build:mac` / `build:linux` per il singolo target.

## Development Tips

### Common Gotchas

- **Rebuild nativo dimenticato**: dopo `npm install`, sempre `npm run rebuild:native`.
- **Non importare il CSS del pacchetto `bootstrap`**: il design kit *è* Bootstrap 5.3.8 ricompilato con le variabili dell'Agenzia. Caricare entrambi produce sovrascritture silenziose. Il pacchetto `bootstrap` è in dependencies solo perché `react-bootstrap` lo richiede come peer.
- **Non caricare `js/bootstrap.bundle.min.js` del kit**: `react-bootstrap` reimplementa i componenti imperativi. Il bundle con auto-init sugli attributi `data-bs-*` produrrebbe doppia inizializzazione sugli stessi nodi. Per questo il file non è nemmeno vendorizzato.
- **`data-th` sulle celle**: la tabella adattiva del kit stampa l'intestazione in `::before` sotto il breakpoint. `AdaptiveTable` lo mette da solo; scrivendo una tabella a mano, va messo.
- **Componenti custom del kit = solo CSS**: stepper, wizard, progress-step, table-adaptive, tree-view, chip, callout non hanno JS. Le classi di stato le applica l'applicazione. I wrapper stanno in `src/renderer/components/ds/`.
- **`import.meta.env` nel renderer, `process.env` in main e preload.** Il renderer non ha `process`.
- **HashRouter, non BrowserRouter**: in produzione il renderer è caricato da `file://`.
- **ESLint gira al commit**: husky + lint-staged (`.husky/pre-commit` → `npx lint-staged`). Staging di un `.ts`/`.tsx` lancia il lint **di tutto il progetto**; uscita non-zero aborta il commit. Bypass d'emergenza: `git commit --no-verify`.
- **Aggiungere un self-check**: nominarlo `*.selfcheck.ts` sotto `src/shared/` e `scripts/run-selfchecks.mjs` lo raccoglie da solo. Asserire all'import: un throw esce non-zero.
- **Messaggi di commit multi-riga in PowerShell**: `git commit -m @'…'@` fallisce in questo ambiente. Scrivere il messaggio su file e usare `git commit -F <path>`.

### Code Style Notes

- **Arrow function ovunque**, niente `function`. Niente `class`: factory function che restituiscono oggetti.
- Preferire la libreria standard alle astrazioni, riusare i pattern esistenti prima di scriverne di nuovi, nessuna feature speculativa.
- Il design kit è **light-only**. Il suo "tema scuro" copre otto variabili della navbar e non è un tema: non costruirci sopra una dark mode.
- Ogni costante di dominio va in `src/shared/domain/constants.ts` **con la fonte** (documento e capitolo). Un numero senza fonte in questo progetto è un'assunzione travestita.

## Architecture

```
Primo avvio: cartella di lavoro + profilo (Entratel | Fisconline), obbligatori.
             La config vive in userData/config.json, non in SQLite: va letta
             prima che esistano finestra e modulo nativo.
                       |
                       v
   shared/domain/navigation.ts  ← sorgente unica: aree, funzionalità, profili,
                                   stato della specifica, fonte documentale
                       |
        +--------------+---------------+----------------+
        |              |               |                |
    AppSidebar     HomePage        routes.tsx      SpecMatrixPage
    (menu)         (card)          (rotte generate) (/stato-specifiche)
                                        |
                                   StubPage per ogni funzionalità
                                   non ancora implementata
                                        |
                       sostituita registrandola in IMPLEMENTED
                                   (routes.tsx)

Renderer  --IPC (preload, contextBridge)-->  Main
  |                                            |
  |  config, dialoghi nativi, workspace,       +-- config-store.ts   (JSON)
  |  ambiente di sicurezza (sola ispezione),   +-- db/db.ts          (SQLite: Storico)
  |  storico, log, info applicazione           +-- services/workspace.ts
  |                                            +-- services/security-env.ts
  |                                            +-- logger.ts
  v
lib/rest/  contract.ts (bozza del contratto REST) → mock-adapter.ts
           Le schermate parlano solo con `restClient`. Quando arriverà
           l'ambiente di simulazione si aggiunge http-adapter.ts e si cambia
           la scelta in lib/rest/index.ts. Nessuna schermata si accorge.
```

### Catalogo per layer

- `src/main/CLAUDE.md` — main process
- `src/renderer/CLAUDE.md` — renderer
- `src/shared/CLAUDE.md` — tipi e dominio condivisi

## Key Design Decisions (Do Not Change)

- **Il modello di navigazione è dato, non sparso.** Aree, funzionalità, profili che le vedono, stato della specifica e fonte documentale stanno tutti in `shared/domain/navigation.ts`. Menu, card, rotte e matrice delle specifiche si generano da lì. Non aggiungere una rotta a mano.
- **Nessuna operazione crittografica nel codice, per ora.** Il modello attuale è interamente locale: PKCS#12 su cartella scelta dall'utente, RSA 4096, SHA256withRSA, chiave privata che non lascia la postazione. Spostare quelle operazioni lato server cambierebbe il modello di sicurezza, non l'architettura. `services/security-env.ts` si limita a ispezionare il disco finché il cliente non risponde per iscritto su dove gira il codice che apre i keystore e su quale canale transita la password di protezione.
- **Design kit vendorizzato e mai modificato.** Sta in `src/renderer/vendor/ds-agenzia-entrate/`, verbatim. Le personalizzazioni sono override in `styles/global.css`. Il kit non ha SCSS né sourcemap utili: la ricompilazione non è possibile.
- **Il catalogo componenti (`/catalogo`) è un artefatto di progetto, non una demo.** Il kit non ha esempi HTML: quella pagina è la nostra ricostruzione del markup atteso, ed è la libreria su cui poggiano tutte le schermate. Fatta bene una volta; non reinterpretare un componente dentro una singola schermata.
- **Le voci «per ora non attiva» compaiono disabilitate.** È la scelta reversibile finché il cliente non decide fra disabilitata, pagina vuota o assente.
- **Nome canonico del secondo profilo: Fisconline.** I requisiti usano tre grafie (Fisconline, Fileinternet, Fiscoline) e il manuale dice "Applicazione FILE INTERNET".
- **Password di protezione: massimo 15 caratteri.** I documenti si contraddicono (20 al cap. 5.1.2 della guida, 15 al 6.2 e nel manuale). Adottato il più restrittivo: una password accettata in creazione e rifiutata al cambio è il fallimento peggiore. Cambiare solo `constants.ts` quando il cliente risponde.
- **Storico su SQLite**, non Derby. La migrazione dei dati locali esistenti non è nel perimetro finché il cliente non risponde.
- **Sicurezza della finestra**: `contextIsolation: true`, `nodeIntegration: false`, `sandbox: true`, nessuna navigazione fuori dall'app, nessuna finestra secondaria. I link esterni passano da `shell.openExternal` via IPC, con whitelist http/https.
- **Istanza singola**: due processi che scrivono lo stesso ambiente di sicurezza o lo stesso SQLite corrompono dati che l'utente non sa diagnosticare.
- **Packaging per Windows, macOS e Linux a 64 bit**, `perMachine: false` su Windows: il piano cliente prevede test su VM **senza privilegi di amministratore**.
- **Banner mock sempre visibile** finché `VITE_REST_MODE` è `mock`. Un collaudo su dati finti non dichiarati è il modo più rapido di perdere credibilità.

## Punti aperti che bloccano lo sviluppo

Tenuti qui perché ogni decisione architetturale presa senza di essi è provvisoria. Il dettaglio, con le domande formulate per il cliente, è in `docs/domande-aperte.md`.

1. **Il prototipo** — otto rimandi nel documento di requisiti, mai consegnato. Blocca impianto di navigazione, Visualizza Esito, moduli di controllo, aggiornamento e disinstallazione.
2. **Dove girano le operazioni crittografiche** e su quale canale transita la password di protezione dei PKCS#12.
3. **Contratto dei servizi REST** e ambiente di simulazione. La bozza dal lato consumatore è in `src/renderer/lib/rest/contract.ts`.
4. **Elenco dei tipi e delle categorie di documento**, o l'API che lo espone: tre menu a tendina dinamici della card Documenti dipendono da qui.
5. **Documentazione o esempi HTML del design kit**, e i termini di licenza del layer Sogei e dei loghi istituzionali.

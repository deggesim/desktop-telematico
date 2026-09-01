# Desktop Telematico Entrate — front end

Front end Electron + React della nuova applicazione desktop dell'Agenzia delle
entrate, in sostituzione del client Java esistente. Due profili utente,
**Entratel** e **Fisconline**, scelti al primo avvio.

Stato: **scheletro**. Toolchain, scocca applicativa, design system integrato,
localizzazione e modello di navigazione sono completi; le schermate di
dettaglio sono segnaposto che dichiarano fonte e stato della specifica.

## Requisiti

- Node.js 22 o superiore
- Su Windows: build tools per moduli nativi (`better-sqlite3`)

## Avvio

```bash
npm install
npm run rebuild:native   # obbligatorio dopo ogni npm install
npm run dev
```

## Script

| Comando                                 | Cosa fa                                                        |
| --------------------------------------- | -------------------------------------------------------------- |
| `npm run dev`                           | Applicazione in sviluppo con hot reload                        |
| `npm run typecheck`                     | Type check dei due progetti TS (main+preload, renderer)        |
| `npm run lint`                          | ESLint su tutto il progetto                                    |
| `npm run selfcheck`                     | Self-check assert-based di validatori e modello di navigazione |
| `npm run format`                        | Prettier in scrittura                                          |
| `npm run build`                         | Bundle Vite (non produce un distribuibile)                     |
| `npm run build:electron`                | Bundle + installer per la piattaforma corrente                 |
| `npm run build:win` / `:mac` / `:linux` | Installer per il singolo target                                |

Lint e format girano automaticamente al commit (husky + lint-staged).

## Struttura

```
src/
  main/       processo Electron: config, SQLite, dialoghi nativi, file system, log
  preload/    ponte contextBridge, un passacarte per canale IPC
  renderer/   interfaccia React
    components/ds/    wrapper dei componenti CSS-only del design kit
    pages/            schermate
    vendor/           design system 5.2.2 vendorizzato, non modificare
  shared/     tipi, contratto IPC, costanti di dominio, modello di navigazione
```

## Due pagine utili durante il cantiere

- **`/catalogo`** — catalogo dei componenti del design system. Il kit non
  contiene esempi HTML né documentazione: questa pagina è la ricostruzione del
  markup atteso, dedotta dai selettori, e vale come richiesta puntuale a Sogei.
- **`/stato-specifiche`** — matrice delle schermate con lo stato della
  specifica e la fonte documentale di ciascuna. Si genera dal codice, quindi
  non può divergere da esso.

## Convenzioni

Sono in `CLAUDE.md`, insieme alle decisioni architetturali da non cambiare e
ai punti aperti che oggi bloccano lo sviluppo. `docs/domande-aperte.md`
contiene le domande formulate per il cliente.

## Design system

Il kit `ds-agenzia-entrate-ui-developer-kit-5.2.2` è vendorizzato in
`src/renderer/vendor/ds-agenzia-entrate/` e non va modificato. Provenienza,
esclusioni e punti aperti (licenza, documentazione, dark mode, accessibilità)
sono nel README di quella cartella.

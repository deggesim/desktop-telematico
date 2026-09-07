# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Due profili scelti al primo avvio, che governano l'intera navigazione:

- **Entratel** — intermediari abilitati (commercialisti, CAF, professionisti) che trasmettono documenti fiscali telematicamente all'Agenzia delle entrate, spesso per conto di terzi (vedi "Invio per conto terzi", campo Progressivo sede). Operano da una postazione singola con un ambiente di sicurezza per operatore, non condivisa tra più operatori sulla stessa installazione.
- **Fisconline** — contribuenti privati che trasmettono documenti in proprio. Nome canonico adottato in codice; i requisiti usano tre grafie diverse (Fisconline, Fileinternet, Fiscoline) e il manuale parla di "Applicazione FILE INTERNET".

## Product Purpose

Sostituire il client Java/Swing esistente ("Desktop Telematico") con un front end Electron + React che permette di preparare, controllare, firmare e inviare documenti fiscali telematici all'Agenzia delle entrate, gestire l'ambiente di sicurezza (certificati, password di protezione), consultare le ricevute e lo storico delle operazioni. Successo = parità funzionale con il client esistente più conformità al design system istituzionale, su Windows, macOS e Linux a 64 bit.

## Positioning

Non è un prodotto in concorrenza sul mercato: è il client telematico mandatorio per l'Agenzia delle entrate, quindi non compete su differenziazione ma su conformità e affidabilità. La riscrittura ha due motivazioni esplicite e concorrenti:

- **Tecnica**: eliminare dipendenze obsolete e non più mantenibili (Java/Swing, Apache Derby embedded) e supportare installazioni senza privilegi amministrativi (`perMachine: false` in electron-builder.yml, richiesto dai test su VM del cliente).
- **Di conformità**: allinearsi al design system istituzionale dell'Agenzia (`ds-agenzia-entrate`, vendorizzato) e ai suoi requisiti di accessibilità.

## Operating Context

- Primo avvio obbligatorio: scelta cartella di lavoro e profilo (Entratel | Fisconline); la configurazione vive in `userData/config.json`, letta prima che esistano finestra e modulo nativo.
- Le operazioni crittografiche restano interamente locali: PKCS#12 su cartella scelta dall'utente, RSA 4096, SHA256withRSA, chiave privata che non lascia la postazione — finché il cliente non risponde per iscritto su dove gira il codice che apre i keystore (domanda aperta #2).
- Istanza singola per postazione: due processi che scrivono lo stesso ambiente di sicurezza o lo stesso SQLite (Storico) corromperebbero dati che l'utente non saprebbe diagnosticare.
- Storico delle operazioni migrato da Apache Derby a SQLite locale; la migrazione dei dati locali esistenti (aree di lavoro, archivi, utenze) non è nel perimetro finché il cliente non risponde (domanda aperta #12).
- Ambiente aziendale/pubblica amministrazione: pacchetti a 64 bit per Windows, macOS, Linux; test previsti su VM senza privilegi di amministratore.
- Link esterni (assistenza, area riservata, manuale PDF) passano da `shell.openExternal` via IPC con whitelist http/https, mai in una finestra secondaria.

## Capabilities and Constraints

- ~26 schermate raggruppate in aree: Sicurezza, Documenti, Ricevute (solo Entratel), Impostazioni, Strumenti, Moduli di controllo, Applicazione, Help. Il modello di navigazione (`shared/domain/navigation.ts`) è la sorgente unica: ogni schermata dichiara stato funzionale, stato della specifica (completa / parziale / assente) e fonte documentale.
- Contratto REST verso i servizi ancora in bozza (`src/renderer/lib/rest/contract.ts`); ambiente di simulazione non consegnato (domanda aperta #4). Le schermate parlano solo con `restClient`.
- Password di protezione PKCS#12: massimo **15 caratteri** (adottato il valore più restrittivo tra i due presenti nei documenti, 15 vs 20 — domanda aperta #10).
- Elenco tipi/categorie di documento non disponibile: dipende dai moduli di controllo installati, ancora da definire (domanda aperta #5); tre menu a tendina dinamici della card Documenti restano scocca finché non arriva.
- Il prototipo citato otto volte nel documento di requisiti non è mai stato consegnato (domanda aperta #1): blocca la specifica di Visualizza Esito, moduli di controllo, aggiornamento e disinstallazione applicazione.
- Manuale disponibile copre solo il profilo Entratel; nessuna funzionalità è oggi dichiarata esclusiva di Fisconline (domanda aperta #7).
- Voci "per ora non attiva" compaiono disabilitate (scelta reversibile finché il cliente non decide — domanda aperta #9).

## Brand Commitments

- Design system istituzionale `ds-agenzia-entrate-ui-developer-kit-5.2.2`, vendorizzato verbatim in `src/renderer/vendor/`, mai modificato. Termini di licenza del layer Sogei e dei loghi istituzionali non ancora chiariti (domanda aperta #6).
- Banner "dati mock" sempre visibile finché `VITE_REST_MODE` è `mock`: un collaudo su dati finti non dichiarati comprometterebbe la credibilità istituzionale del client.
- Nome canonico del secondo profilo: **Fisconline** (non Fileinternet/Fiscoline), scelta già adottata in codice.

## Evidence on Hand

- `guida.pdf`, `Manuale_Utente_Entrate.pdf` (il requisito lo cita come `Manuale_Utente_Entratel.pdf`, stesso documento) e il documento di requisiti sono le fonti primarie; ogni funzionalità in `navigation.ts` cita capitolo e paragrafo.
- Nessun prototipo, esempio HTML/SCSS del design kit, o elenco tipi/categorie documento è stato consegnato: vanno trattati come assenti, non dedotti.
- `docs/domande-aperte.md` tiene l'elenco vivo delle 15 domande al cliente e le incoerenze già risolte in codice da confermare formalmente.

## Product Principles

1. **Il modello di navigazione è dato, non sparso** — aree, funzionalità, profili, stato della specifica e fonte stanno tutti in `navigation.ts`; menu, card, rotte e matrice si generano da lì.
2. **Un numero senza fonte è un'assunzione travestita** — ogni costante di dominio cita documento e capitolo; i conflitti tra documenti si risolvono con la scelta più restrittiva, annotata e reversibile.
3. **Nessuna funzionalità non specificata si finge completa** — una schermata a specifica assente resta uno stub dichiarato, mai un'implementazione indovinata sul prototipo mancante.
4. **La sicurezza resta locale finché non arriva risposta scritta** — nessuna operazione crittografica lato server, nessun canale per la password di protezione, finché il cliente non chiarisce il modello.
5. **Conformità prima di differenziazione** — il client non compete sul mercato: il metro di successo è l'allineamento al design system istituzionale, alla parità funzionale col client Java e all'accessibilità richiesta alla Pubblica Amministrazione.

## Accessibility & Inclusion

Standard di riferimento: **AgID / Legge Stanca, conformità WCAG 2.1 livello AA** (software per la Pubblica Amministrazione italiana). Skip link e attributi ARIA sui wrapper dei componenti CSS-only del kit (`components/ds/`) sono già stati aggiunti a questo scopo, poiché il kit stesso non dichiara conformità e non gestisce ARIA nei suoi componenti custom. Resta aperto (domanda #14) chi firma la dichiarazione di accessibilità finale e con quale verifica.

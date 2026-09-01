# Design System Agenzia delle entrate — 5.2.2 (vendorizzato)

Origine: `ds-agenzia-entrate-ui-developer-kit-5.2.2.zip`, consegnato dal cliente
il 20/08/2026 nella cartella di documentazione di progetto.

## Cosa contiene questa cartella

| Percorso | Origine | Note |
| --- | --- | --- |
| `css/agenzia-entrate.css` | kit, invariato | Bootstrap 5.3.8 ricompilato con le variabili dell'Agenzia + layer Sogei (~690 classi, 33 componenti custom) |
| `css/bootstrap-icons.css` | kit, invariato | 2078 glifi |
| `css/fonts/` | kit, invariato | Titillium Web, Roboto Mono, Lora, Bootstrap Icons — tutti locali, nessuna CDN |
| `img/` | kit, invariato | Loghi istituzionali AE, loghi SPID e CIE |

## Cosa NON è stato vendorizzato, e perché

- `js/bootstrap.bundle.min.js` — **escluso deliberatamente.** Il renderer usa
  `react-bootstrap`, che reimplementa in React i componenti imperativi
  (modal, dropdown, collapse, offcanvas, toast, tooltip, popover, tab).
  Caricare anche il bundle Bootstrap con auto-init sugli attributi `data-bs-*`
  produrrebbe doppia inizializzazione sugli stessi nodi.
  I componenti **CSS-only** del layer Sogei (stepper, wizard, progress-step,
  table-adaptive, tree-view, chip, callout) non hanno alcun JS nel kit: il loro
  comportamento è scritto da noi in `src/renderer/components/ds/`.

## Regole d'uso

1. **Non modificare i file di questa cartella.** Sono il distribuito Sogei
   verbatim: qualunque personalizzazione va fatta per override in
   `src/renderer/styles/global.css`. Il kit non ha sorgenti SCSS e le sourcemap
   sono prive di contenuto, quindi la ricompilazione non è possibile.
2. **Il kit non ha namespace**: sovrascrive `.card`, `.btn`, `.table`. Non
   caricare altre distribuzioni Bootstrap nella stessa pagina.
3. **Aggiornamento di versione**: sostituire l'intera cartella con il nuovo
   distribuito, aggiornare questa tabella e rieseguire la pagina di catalogo
   (`/catalogo`) per verificare le regressioni di markup.

## Punti aperti sul kit (tracciati verso il cliente)

- Nessuna documentazione e nessun esempio HTML: il markup atteso dai 33
  componenti custom è ricostruito leggendo i selettori. La pagina `/catalogo`
  è la nostra ricostruzione di riferimento e vale anche come richiesta puntuale
  a Sogei.
- Nessun sorgente SCSS, sourcemap senza contenuto.
- Nessuna licenza nel distribuito per il layer Sogei; presenti i loghi
  istituzionali. Da chiarire formalmente prima del rilascio.
- Dark mode inesistente (un solo blocco tema scuro limitato a otto variabili
  della navbar). L'applicazione è light-only.
- Nessuno skip link: lo forniamo noi in `components/layout/SkipLink.tsx`.
- Il layer custom usa `:has()`, `conic-gradient`, `@property` e
  `text-wrap: balance`. Da verificare sulla webview target quando la matrice
  dei sistemi operativi sarà definita.

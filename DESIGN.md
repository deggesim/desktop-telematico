---
name: Desktop Telematico Entrate
description: Client Electron + React per l'invio telematico di documenti fiscali all'Agenzia delle entrate, sul design system istituzionale Sogei.
colors:
  primario: "#004080"
  primario-hover: "#00366d"
  secondario: "#eb641f"
  bianco-carta: "#ffffff"
  grigio-sportello: "#f4f5f6"
  grigio-confine: "#ced4da"
  inchiostro: "#1a1a1a"
  verde-conformita: "#008055"
  rosso-anomalia: "#cc334d"
  ambra-attenzione: "#995c00"
  blu-informativo: "#0066cc"
typography:
  display:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "2.5rem"
    fontWeight: 600
    lineHeight: 1.2
  headline:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.2
  title:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "Titillium Web, system-ui, -apple-system, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Titillium Web, system-ui, -apple-system, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875em"
    fontWeight: 600
    letterSpacing: "normal"
rounded:
  sm: "0.25rem"
  md: "0.25rem"
  lg: "1rem"
  pill: "50rem"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "3rem"
components:
  button-primary:
    backgroundColor: "{colors.primario}"
    textColor: "{colors.bianco-carta}"
    rounded: "{rounded.sm}"
    padding: "0.375rem 0.75rem"
  button-primary-hover:
    backgroundColor: "{colors.primario-hover}"
    textColor: "{colors.bianco-carta}"
  button-outline-primary:
    backgroundColor: "transparent"
    textColor: "{colors.primario}"
    rounded: "{rounded.sm}"
  card:
    backgroundColor: "{colors.bianco-carta}"
    textColor: "{colors.inchiostro}"
    rounded: "{rounded.md}"
    padding: "1rem"
  chip:
    backgroundColor: "{colors.grigio-sportello}"
    textColor: "{colors.inchiostro}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.75rem"
  form-control:
    backgroundColor: "{colors.bianco-carta}"
    textColor: "{colors.inchiostro}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 0.75rem"
---

# Design System: Desktop Telematico Entrate

## Overview

**Creative North Star: "Lo Sportello Telematico"**

Il sistema visivo non è una scelta di prodotto: è il design kit istituzionale `ds-agenzia-entrate-ui-developer-kit-5.2.2`, vendorizzato verbatim e mai modificato ([[product-brief]] in PRODUCT.md). Il tono che ne risulta è quello di uno sportello pubblico digitale — l'utente arriva per completare un adempimento fiscale, non per essere intrattenuto. Ogni schermata è procedurale: un modulo, una validazione, una ricevuta. Non c'è spazio per decorazione, illustrazione o narrazione di prodotto; la fiducia si costruisce con coerenza e prevedibilità, non con espressività.

La coppia tipografica lo rende esplicito: titoli in **Lora** (serif, peso 600) sopra un corpo in **Titillium Web** (sans-serif). È una scelta istituzionale precisa — il serif nei titoli dà autorità da documento ufficiale, il sans-serif nel corpo resta leggibile nelle form dense. Il colore fa lo stesso lavoro: il blu profondo (#004080) è l'unico colore ad alta presenza (header, footer, bottoni primari); l'arancione istituzionale (#eb641f) compare come accento raro, mai come sfondo esteso.

Nessun anti-riferimento visivo è stato confermato dal cliente: questo file non registra un rifiuto esplicito del vecchio client Java/Swing o di un'estetica da prodotto SaaS, per quanto entrambi siano plausibili. Se emergerà una risposta formale, va aggiunta qui.

**Key Characteristics:**
- Piatto per default: nessuna ombra decorativa, la profondità è quasi sempre un bordo, non un box-shadow.
- Raggi minimi e costanti (0.25rem) tranne pillole (chip, indice dello stepper) e badge di stato.
- Serif nei titoli, sans-serif nel corpo: gerarchia tipografica, non gerarchia di famiglia unica.
- Un solo colore ad alta saturazione visibile per volta: il blu è la superficie, l'arancione è il segnale.
- Light-only: il "tema scuro" del kit copre otto variabili della navbar, non è una dark mode da estendere.

## Colors

Palette a bassa saturazione con due soli colori a piena intensità (blu istituzionale, arancione istituzionale); il resto è neutro o semantico, riservato a stato e feedback.

### Primary
- **Blu Istituzionale** (`#004080`): colore di marchio dell'Agenzia. Header (barra di navigazione), footer, bottoni primari, focus ring dei campi form (`rgba(0,64,128,.25)`), bordo attivo della sidebar.
- **Blu Istituzionale — Hover** (`#00366d`): stato hover/active dei bottoni primari, unico scurimento ammesso del blu di marchio.

### Secondary
- **Arancione Istituzionale** (`#eb641f`): accento raro. **Attenzione**: nel kit `.text-secondary` / `secondary` è questo arancione, non un grigio — per il testo attenuato si usa sempre `text-body-secondary` (vedi Do's and Don'ts).

### Neutral
- **Bianco Carta** (`#ffffff`): sfondo di pagina, card, sidebar, campi form.
- **Grigio Sportello** (`#f4f5f6`): sfondo delle barre header (`header-top-light`, `header-light`) e dell'intestazione delle card (`card-header`).
- **Grigio Confine** (`#ced4da`): bordo di default di campi form e divisori.
- **Inchiostro** (`#1a1a1a`): colore testo di corpo. Non è nero puro: più morbido su schermo denso di testo normativo.

### Semantic
- **Verde Conformità** (`#008055`): esiti positivi, validazioni superate.
- **Rosso Anomalia** (`#cc334d`): errori bloccanti, esiti negativi.
- **Ambra Attenzione** (`#995c00`): avvisi non bloccanti — importante: il controllo di congruenza del codice fiscale in Autentica Singolo produce un avviso non bloccante, mai un errore (vedi PRODUCT.md, Capabilities and Constraints).
- **Blu Informativo** (`#0066cc`): link e messaggi informativi neutri; coincide con `--bs-link-color`.

### Named Rules
**La Regola del Colore Raro.** L'arancione istituzionale non è mai uno sfondo esteso né un colore di stato: compare come chip attivo, evidenziazione puntuale o bordo. La sua rarità è ciò che lo rende un segnale, non un accento decorativo.

## Typography

**Display/Headline/Title Font:** Lora (serif, con fallback Georgia)
**Body/Label Font:** Titillium Web (sans-serif, con fallback di sistema)
**Monospace:** Roboto Mono — riservato a hash e identificativi tecnici (es. l'hash del file nello Storico).

**Character:** un serif istituzionale per l'intestazione di ogni pagina/sezione, un sans-serif ad alta leggibilità per moduli e tabelle dense. La coppia comunica "documento ufficiale" nei titoli e "modulo da compilare" nel corpo, senza mai passare al serif in un campo interattivo.

### Hierarchy
- **Display** (peso 600, 2.5rem, line-height 1.2): riservato al titolo `h1` di pagina, uno per schermata.
- **Headline** (peso 600, 2rem, line-height 1.2): sezioni di primo livello dentro una pagina lunga.
- **Title** (peso 600, 1.5rem–1.25rem, line-height 1.2): intestazioni di card e di blocco form (`PageHeader` usa `h3`/`.h3`, 1.75rem, per il titolo di pagina corrente).
- **Body** (peso 400, 1rem, line-height 1.5): testo di form, tabelle, callout.
- **Label** (peso 600, 0.875em): badge di stato e testo dei bottoni. La variante maiuscola (`sidebar-title`, `callout-title`, 1rem, `text-transform: uppercase`) è l'etichetta "da intestazione di sezione", non da corpo.

### Named Rules
**La Regola del Serif Solo nei Titoli.** Lora compare esclusivamente in `h1`–`h6`. Nessun campo form, bottone o testo di corpo passa al serif: è un segnale di intestazione, non un'estetica da applicare liberamente.

## Layout

Impaginazione a tre fasce fissa in `app-shell` (override applicativo, non del kit): header, corpo con sidebar da 260px a larghezza fissa, footer sempre in fondo anche a contenuto corto. Il corpo scrolla in `app-main`, la sidebar scrolla indipendentemente.

Container Bootstrap standard (`container-fluid`), gutter che cresce da 2rem a 3rem oltre `md`, fino a 6rem su `xxl`. Non ci sono breakpoint custom: si usano quelli di Bootstrap 5 (`sm` 576px, `md` 768px, `lg` 992px, `xl` 1200px, `xxl` 1400px). Le card delle aree (`FeatureCard`) sono disposte in griglia responsive standard, non in un layout custom.

Il vincolo di finestra minima non è ancora confermato (domanda aperta #11 in `docs/domande-aperte.md`): il kit usa `:has()`, `conic-gradient` e `@property`, quindi la webview minima supportata condiziona quali browser engine reggono il layout.

## Elevation & Depth

Il sistema è **piatto per default**: le card non hanno `box-shadow` (`--bs-card-box-shadow` è vuoto), la profondità è quasi sempre resa con un bordo (`border-color` neutro o semantico) o con uno sfondo leggermente diverso (`grigio-sportello` per intestazioni). L'unica eccezione osservata è lo stepper orizzontale (`.stepper-expand-*`), che usa `box-shadow: 0 0.5rem 1rem rgba(0,0,0,.15)` per staccarsi visivamente come barra di avanzamento fissa.

### Named Rules
**La Regola del Bordo, non dell'Ombra.** Se un elemento deve separarsi dallo sfondo, prima si prova un bordo o un cambio di superficie; l'ombra è riservata a elementi di navigazione/avanzamento che devono leggersi come sospesi sopra il contenuto (stepper), non come default di ogni contenitore.

## Shapes

Raggio quasi costante: `0.25rem` per bottoni, card, campi form, badge — lo stesso valore usato da `--bs-border-radius`, `-sm` e `-lg` nel kit, che li ha deliberatamente appiattiti l'uno sull'altro invece di scalarli come fa Bootstrap di default. Le uniche forme distinte sono le **pillole** (`border-radius: 50rem`) per chip e indice dello stepper, e i raggi larghi (`1rem`, `2rem`) riservati a contenitori speciali non ancora usati nelle schermate implementate. Bordi sempre `solid`, spessore `1px`.

## Components

### Buttons
- **Shape:** raggio 0.25rem, coerente con card e campi form.
- **Primary:** sfondo Blu Istituzionale (#004080), testo bianco; hover/active #00366d con `box-shadow: inset 0 3px 5px rgba(0,0,0,.125)`.
- **Outline:** bordo e testo Blu Istituzionale, sfondo trasparente — usato per azioni secondarie nell'header (es. "Esci").
- **Link:** `btn btn-link`, per azioni terziarie in barre strette (link di assistenza in header e footer).
- **Disabled:** opacità .65, `pointer-events: none` — nessun cambio di colore oltre l'opacità.

### Chips
- **Style:** sfondo Grigio Sportello, raggio pillola, padding ridotto (`0.25rem 0.75rem`).
- **State:** `.chip-active` per lo stato selezionato (es. il profilo attivo nell'header: "Profilo: Entratel"). Reso come `<button>` se interattivo, altrimenti `<span>` — mai un div, per restare raggiungibile da tastiera.

### Cards / Containers
- **Corner Style:** 0.25rem.
- **Background:** Bianco Carta; intestazione (`card-header`) Grigio Sportello.
- **Shadow Strategy:** nessuna — vedi Elevation & Depth. La profondità è il bordo grigio confine.
- **Border:** 1px solid Grigio Confine di default.
- **Internal Padding:** 1rem (`--bs-card-spacer-x/y`).

### Inputs / Fields
- **Style:** bordo 1px grigio scuro (#6c757d, più scuro del bordo Grigio Confine usato altrove), raggio 0.25rem, sfondo Bianco Carta.
- **Focus:** bordo Blu Istituzionale attenuato (#80a0c0) più `box-shadow: 0 0 0 .25rem rgba(0,64,128,.25)` — un alone blu, non un cambio di sfondo.
- **Error / Disabled:** non ancora osservato in una schermata implementata; da documentare quando la prima form con validazione visibile atterra nel codice.

### Callouts
- **Style:** bordo sinistro colorato per variante (blu conformità primaria, verde successo, rosso danger) con etichetta (`callout-title`) sovrapposta al bordo superiore, maiuscola, colorata come il bordo. Variante `callout-simple` toglie il bordo e allarga il rientro — per note meno enfatiche nello stesso flusso.
- **Uso:** avvisi non bloccanti (es. anomalia sul codice fiscale), messaggi di esito, nota informativa in una form.

### Stepper / Wizard
- **Stepper:** lista orizzontale (`<ol>`) di step con indice numerico in cerchio (`.stepper-index`), passo corrente marcato con `aria-current="step"` — senza quell'attributo il CSS non riesce ad attenuare gli altri step. Unico componente con `box-shadow` proprio (vedi Elevation & Depth).
- **Wizard:** riga Bootstrap (`.wizard.row`) con barra di avanzamento (`.progress`) per step, stato applicato dall'app (`wizard-step-done|-doing|-todo`), mai dal kit.

### Navigation
- **Header:** due fasce — `header-top-light` (grigio sportello, link di servizio: assistenza, selettore lingua) sopra `header-light` (navbar con logo, nome app, profilo attivo, uscita).
- **Sidebar:** `sidebar-light` (sfondo bianco), voci `nav-link` peso 400, voce attiva peso 600 — nessun cambio di colore, solo di peso, per lo stato attivo in tema chiaro.
- **Footer:** `footer-dark`, sfondo Blu Istituzionale, testo bianco — unico punto dell'interfaccia dove il blu di marchio è sfondo esteso invece che accento.

### Tabelle adattive (componente firma)
`table-adaptive-<breakpoint>` collassa ogni riga in una scheda sotto il breakpoint, stampando l'intestazione in `::before` da un attributo `data-th` su ogni cella — non è opzionale: senza `data-th` la tabella è illeggibile su finestra stretta, non solo esteticamente diversa. Ordinamento, filtro e paginazione non sono nel kit: li implementa chi li usa (es. Storico, paginato a 10 dall'applicazione).

## Do's and Don'ts

### Do:
- **Do** usare `text-body-secondary` per il testo attenuato — mai `text-secondary`, che nel kit è l'arancione istituzionale, non un grigio.
- **Do** applicare `data-th` su ogni cella del corpo quando si scrive una `AdaptiveTable` a mano.
- **Do** marcare lo step corrente di uno Stepper con `aria-current="step"`: è il selettore che il CSS usa per attenuare gli altri.
- **Do** passare dai wrapper in `components/ds/` per ogni componente CSS-only del kit (Callout, Chip, Stepper, Wizard, AdaptiveTable); un nuovo componente si aggiunge lì e si mostra in `/catalogo`, non si reinterpreta dentro una schermata.
- **Do** usare componenti imperativi (modal, dropdown, toast, offcanvas, tooltip) solo tramite `react-bootstrap`.

### Don't:
- **Don't** modificare `src/renderer/vendor/ds-agenzia-entrate/`: è vendorizzato verbatim, senza sorgenti SCSS né sourcemap utili — non è ricompilabile.
- **Don't** aggiungere `box-shadow` decorativo a card o contenitori generici: la profondità di questo sistema è il bordo, non l'ombra (eccetto lo stepper).
- **Don't** usare attributi `data-bs-*`: il bundle JS del kit non è caricato, react-bootstrap reimplementa i componenti imperativi e la doppia inizializzazione romperebbe lo stato.
- **Don't** costruire una dark mode sopra il "tema scuro" del kit: copre otto variabili della navbar, non è un sistema di temi.
- **Don't** importare il CSS del pacchetto `bootstrap`: il kit è già Bootstrap 5.3.8 ricompilato con le variabili dell'Agenzia; caricare entrambi produce sovrascritture silenziose.

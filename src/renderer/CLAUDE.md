# src/renderer — interfaccia

React 19 + react-router (HashRouter) + Zustand + react-bootstrap sopra il
design system 5.2.2 dell'Agenzia.

| Cartella | Contenuto |
| --- | --- |
| `components/layout/` | `AppShell` (skip link, header, sidebar, main, footer), `AppHeader` (logo, nome, profilo, uscita, lingua, assistenza), `AppFooter`, `AppSidebar`, `SkipLink`. |
| `components/ds/` | Wrapper dei componenti **CSS-only** del kit: `Callout`, `Chip`, `Stepper`, `Wizard`, `AdaptiveTable`, più `PageHeader` e `SpecBadge`. Il markup di ciascuno è ricostruito dai selettori del CSS ed è commentato nel file. |
| `components/` | `FeatureCard` (card di area con i link alle funzionalità), `FirstRunDialog`, `MockModeBanner`. |
| `pages/` | `HomePage`, `AreaPage`, `StubPage`, `CatalogPage` (`/catalogo`), `SpecMatrixPage` (`/stato-specifiche`), `NotFoundPage`. |
| `store/` | `configStore` (specchio della config persistita, ogni setter passa dall'IPC), `uiStore` (solo interfaccia, niente persistenza). |
| `i18n/` | i18next con `locales/it.json` e `locales/en.json`. Le due lingue hanno le stesse chiavi: se ne aggiungi una, aggiungila a entrambe. |
| `lib/rest/` | `contract.ts` (bozza del contratto REST), `mock-adapter.ts`, `index.ts` (selezione adapter). Le schermate importano solo `restClient`. |
| `vendor/ds-agenzia-entrate/` | Design kit verbatim. **Non modificare**: vedi il suo README. |
| `styles/global.css` | Solo override, ognuno con il motivo scritto. |

## Regole

- `import.meta.env`, mai `process.env`.
- Non importare il CSS del pacchetto `bootstrap`: il kit **è** Bootstrap ricompilato.
- Per il testo attenuato usare `text-body-secondary`, non `text-secondary`: nel kit `secondary` è l'arancione istituzionale, non il grigio.
- Componenti imperativi (modal, dropdown, toast, offcanvas, tooltip): `react-bootstrap`. Mai attributi `data-bs-*`, il bundle JS del kit non è caricato.
- Le rotte non si scrivono a mano: si generano da `shared/domain/navigation.ts` in `routes.tsx`. Per implementare una schermata, registrarla in `IMPLEMENTED` — lo stub sparisce da solo.

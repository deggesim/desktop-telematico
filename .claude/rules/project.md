# Regole di progetto

## Stile

- Arrow function ovunque. Niente `function`, niente `class`: factory function che restituiscono oggetti.
- Nomi in italiano per il dominio (`profiloUtente`, `ambienteSicurezza`), in inglese per i termini tecnici standard (`handler`, `store`, `adapter`).
- Commenti che spiegano il **perché**, non il cosa. Un commento che ripete la riga sotto va cancellato.
- Ogni costante di dominio cita documento e capitolo. Un numero senza fonte è un'assunzione travestita.

## Confini

- `src/shared/` non importa Electron né React.
- Il renderer usa `import.meta.env`; main e preload usano `process.env`.
- Il renderer non tocca il file system: passa sempre dall'IPC.
- Nessuna operazione crittografica finché la domanda #2 in `docs/domande-aperte.md` è aperta.

## Design system

- `src/renderer/vendor/` è verbatim: non modificarlo mai. Le personalizzazioni sono override in `styles/global.css`, ognuno commentato.
- Componenti imperativi: `react-bootstrap`. Mai attributi `data-bs-*`.
- Componenti CSS-only del kit: passare dai wrapper in `components/ds/`. Se ne serve uno nuovo, aggiungerlo lì e mostrarlo in `/catalogo` — non reinterpretarlo dentro una schermata.
- Testo attenuato: `text-body-secondary`. Nel kit `secondary` è l'arancione istituzionale.

## Aggiungere una schermata

1. Riga in `src/shared/domain/navigation.ts` con `state`, `spec`, `source` e le note aperte.
2. Chiavi `feature.<id>.title` e `.description` in **entrambi** i file di `i18n/locales/`.
3. Nient'altro: rotta, voce di menu, link in card e riga nella matrice si generano da soli. La schermata parte come stub.
4. Quando la implementi davvero, registrala in `IMPLEMENTED` in `routes.tsx`.

## Prima di committare

`npm run typecheck && npm run lint && npm run selfcheck`. Il commit lancia già lint e format, ma il type check no.

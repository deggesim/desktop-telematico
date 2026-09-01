# src/shared — tipi e dominio condivisi

Importabile da main, preload e renderer. Nessuna dipendenza da Electron o da React.

| File | Contenuto |
| --- | --- |
| `types.ts` | `AppConfig`, `ProxyConfig`, `WorkspaceStatus`, `SecurityEnvStatus`, `StoricoRow`, `AppInfo` e soprattutto **`ElectronAPI`**: l'unica definizione del contratto IPC, quella che il preload espone su `window.electronAPI`. |
| `ipc-channels.ts` | Nomi dei canali, convenzione `dominio:azione`. |
| `domain/profile.ts` | `UserProfile` (entratel \| fisconline) e `Language`. Il nome canonico del secondo profilo è **Fisconline**. |
| `domain/constants.ts` | Costanti estratte dai documenti: sotto-cartelle dell'area di lavoro, catena delle estensioni, limiti di dimensione, soglie, formati di campo, regole dei quattro segreti, artefatti dell'ambiente di sicurezza, severità del diagnostico. **Ogni valore cita la sua fonte.** I conflitti fra documenti sono marcati `@conflitto`. |
| `domain/validators.ts` | Validatori puri dei formati documentati. Usati sia dalle form sia come guardie lato main. |
| `domain/navigation.ts` | **Sorgente unica** di aree, funzionalità, profili che le vedono, stato funzionale, stato della specifica e fonte documentale. Da qui si generano menu, card, rotte e matrice delle specifiche. |
| `*.selfcheck.ts` | Self-check assert-based, eseguiti da `npm run selfcheck`. Asseriscono all'import. |

## Regole

- Una costante di dominio senza fonte è un'assunzione travestita: scrivere sempre documento e capitolo.
- Quando il cliente risponde a una domanda aperta, il cambiamento deve toccare `constants.ts` (o `navigation.ts`) e il relativo self-check, non le schermate.
- Aggiungere un self-check: nominarlo `*.selfcheck.ts` qui sotto e `scripts/run-selfchecks.mjs` lo raccoglie da solo. È escluso dal progetto TS del renderer (`tsconfig.web.json`) perché è codice Node.

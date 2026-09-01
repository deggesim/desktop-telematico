# Icone dell'applicazione

`electron-builder.yml` si aspetta qui:

| File | Piattaforma | Formato |
| --- | --- | --- |
| `icon.ico` | Windows | ICO multi-risoluzione, almeno 256×256 |
| `icon.icns` | macOS | ICNS |
| `icon.png` | Linux | PNG 512×512 |

Non ancora presenti: servono l'icona ufficiale dell'applicazione e la conferma
dei diritti d'uso dei marchi istituzionali. Finché mancano, `npm run build:electron`
usa l'icona di default di Electron.

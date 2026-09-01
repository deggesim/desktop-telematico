// Esegue ogni *.selfcheck.js compilato sotto .selfcheck-out (vedi `npm run selfcheck`).
// Un file invece di una lista di path in package.json così aggiungere un
// self-check lo fa raccogliere automaticamente invece di ignorarlo in silenzio.
import { globSync } from "node:fs";
import { pathToFileURL } from "node:url";

const files = globSync(".selfcheck-out/**/*.selfcheck.js").sort();

if (files.length === 0) {
  console.error(
    "Nessun self-check compilato in .selfcheck-out — tsc -p tsconfig.selfcheck.json è stato eseguito?",
  );
  process.exit(1);
}

// Ogni self-check asserisce all'import e lancia in caso di fallimento, uscendo non-zero.
for (const file of files) await import(pathToFileURL(file).href);

console.log(`\n${files.length} self-check superati`);

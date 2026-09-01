/** Self-check del modello di navigazione: invarianti che il router dà per buone. */

import assert from "node:assert/strict";
import {
  ALL_FEATURES,
  AREAS,
  areasFor,
  primaryAreasFor,
  secondaryAreasFor,
} from "./navigation.js";

// Id e path devono essere unici: il router li usa come chiavi.
const ids = ALL_FEATURES.map((f) => f.id);
assert.equal(new Set(ids).size, ids.length, "id di funzionalità duplicati");
const paths = ALL_FEATURES.map((f) => f.path);
assert.equal(
  new Set(paths).size,
  paths.length,
  "path di funzionalità duplicati",
);

// Ogni path di funzionalità deve stare sotto il path della sua area.
for (const area of AREAS)
  for (const f of area.features)
    assert.ok(
      f.path.startsWith(`${area.path}/`),
      `${f.id}: il path ${f.path} non sta sotto ${area.path}`,
    );

// Home Entratel: menu Sicurezza, Documenti, Ricevute (requisito).
assert.deepEqual(
  primaryAreasFor("entratel").map((a) => a.id),
  ["sicurezza", "documenti", "ricevute"],
);

// Home Fisconline: menu Sicurezza, Documenti. Nessuna Ricevute.
assert.deepEqual(
  primaryAreasFor("fisconline").map((a) => a.id),
  ["sicurezza", "documenti"],
);

// Le accessorie sono le stesse per entrambi i profili (requisito).
assert.deepEqual(
  secondaryAreasFor("entratel").map((a) => a.id),
  secondaryAreasFor("fisconline").map((a) => a.id),
);

// La card Sicurezza è identica nei due profili: quattro funzioni comuni.
const sicurezzaE = areasFor("entratel").find((a) => a.id === "sicurezza");
const sicurezzaF = areasFor("fisconline").find((a) => a.id === "sicurezza");
assert.ok(sicurezzaE);
assert.ok(sicurezzaF);
assert.deepEqual(
  sicurezzaE.features.map((f) => f.id),
  sicurezzaF.features.map((f) => f.id),
);
assert.equal(sicurezzaE.features.length, 4);

// Fisconline non vede Annulla, Controlla fornitura, Autentica: sono solo Entratel.
const docF = areasFor("fisconline").find((a) => a.id === "documenti");
assert.ok(docF);
for (const assente of [
  "annulla",
  "controlla-fornitura",
  "autentica-singolo",
  "autentica-multiplo",
])
  assert.ok(
    !docF.features.some((f) => f.id === assente),
    `${assente} non deve comparire per Fisconline`,
  );

console.log("navigation.selfcheck: OK");

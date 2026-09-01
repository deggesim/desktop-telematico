/**
 * Self-check dei validatori di dominio. Asserisce all'import: un throw esce
 * non-zero e fa fallire `npm run selfcheck`.
 *
 * Ogni caso qui dentro cita il documento da cui viene il valore atteso, così
 * quando il cliente risponde a una domanda aperta si vede subito cosa cambia.
 */

import assert from "node:assert/strict";
import {
  validateAbi,
  validateConto,
  validateIban,
  validatePasswordProtezione,
  validatePincode,
  validatePinRevoca,
  validateProgressivoSede,
  validateProtocolloFile,
  validateDimensioneAutenticaSingolo,
} from "./validators.js";
import { FIELD_FORMATS, SECRET_RULES } from "./constants.js";

// Protocollo file: 17 cifre esatte (Manuale cap. 8)
assert.equal(validateProtocolloFile("12345678901234567").ok, true);
assert.equal(validateProtocolloFile("1234567890123456").ok, false);
assert.equal(validateProtocolloFile("1234567890123456a").ok, false);

// Progressivo sede: 3 cifre, default "000" (guida.pdf cap. 5.1)
assert.equal(
  validateProgressivoSede(FIELD_FORMATS.progressivoSedeDefault).ok,
  true,
);
assert.equal(validateProgressivoSede("00").ok, false);

// Pincode: 16 Entratel, 10 Fisconline — l'unica altra differenza tra le due
// form di Genera Ambiente è il campo Progressivo sede.
assert.equal(validatePincode("A1B2C3D4E5F6G7H8", "entratel").ok, true);
assert.equal(validatePincode("A1B2C3D4E5", "entratel").ok, false);
assert.equal(validatePincode("A1B2C3D4E5", "fisconline").ok, true);
assert.equal(validatePincode("A1B2C3D4E5F6G7H8", "fisconline").ok, false);

// PIN di revoca: 15-20 alfanumerici (guida.pdf cap. 5)
assert.equal(validatePinRevoca("A".repeat(15)).ok, true);
assert.equal(validatePinRevoca("A".repeat(20)).ok, true);
assert.equal(validatePinRevoca("A".repeat(14)).ok, false);
assert.equal(validatePinRevoca("A".repeat(21)).ok, false);

// Password di protezione: 8-15 (scelta prudenziale, vedi @conflitto).
// Se il cliente conferma 20, cambia SOLO constants.ts e questa riga.
assert.equal(validatePasswordProtezione("A".repeat(8)).ok, true);
assert.equal(validatePasswordProtezione("A".repeat(15)).ok, true);
assert.equal(validatePasswordProtezione("A".repeat(7)).ok, false);
assert.equal(
  validatePasswordProtezione("A".repeat(16)).ok,
  false,
  "16 caratteri: rifiutato finché vale il limite di 15 del cap. 6.2",
);
assert.equal(SECRET_RULES.passwordProtezioneMaxGuida512, 20);

// Coordinate bancarie (Manuale cap. 8, sezione condizionale di Autentica)
assert.equal(validateAbi("01234").ok, true);
assert.equal(validateAbi("0123").ok, false);
assert.equal(
  validateConto("000012345-67").ok,
  true,
  "punto, trattino e spazio ammessi",
);
assert.equal(
  validateConto("00001234567").ok,
  false,
  "11 caratteri: sotto i 12 richiesti",
);
const IBAN_IT = "IT60X0542811101000000123456"; // 27 caratteri
assert.equal(IBAN_IT.length, FIELD_FORMATS.ibanLunghezza);
assert.equal(validateIban(IBAN_IT).ok, true);
assert.equal(validateIban(IBAN_IT.slice(0, 26)).ok, false);

// Limiti dimensione di Autentica singolo file (Manuale cap. 8):
// 3 MB in generale, 5 MB se il file e' gia' stato controllato.
assert.equal(
  validateDimensioneAutenticaSingolo(3 * 1024 * 1024, false).ok,
  true,
);
assert.equal(
  validateDimensioneAutenticaSingolo(3 * 1024 * 1024 + 1, false).ok,
  false,
);
assert.equal(
  validateDimensioneAutenticaSingolo(5 * 1024 * 1024, true).ok,
  true,
);
assert.equal(
  validateDimensioneAutenticaSingolo(5 * 1024 * 1024 + 1, true).ok,
  false,
);

console.log("validators.selfcheck: OK");

/**
 * Validatori dei formati di campo documentati. Puri, senza dipendenze:
 * usati sia dal renderer (validazione form) sia dal main (guardie IPC),
 * e coperti da validators.selfcheck.ts.
 */

import { FIELD_FORMATS, SECRET_RULES, SIZE_LIMITS } from "./constants.js";
import type { UserProfile } from "./profile.js";

export type ValidationResult = { ok: true } | { ok: false; code: string };

const ok: ValidationResult = { ok: true };
const fail = (code: string): ValidationResult => ({ ok: false, code });

const onlyDigits = (v: string): boolean => /^[0-9]+$/.test(v);

/** Protocollo telematico del file: 17 cifre. */
export const validateProtocolloFile = (v: string): ValidationResult =>
  onlyDigits(v) && v.length === FIELD_FORMATS.protocolloFileCifre
    ? ok
    : fail("protocollo.formato");

/** Progressivo documento: 6 cifre. */
export const validateProgressivoDocumento = (v: string): ValidationResult =>
  onlyDigits(v) && v.length === FIELD_FORMATS.progressivoDocumentoCifre
    ? ok
    : fail("progressivoDocumento.formato");

/** Progressivo sede: 3 cifre. Campo presente solo per il profilo Entratel. */
export const validateProgressivoSede = (v: string): ValidationResult =>
  onlyDigits(v) && v.length === FIELD_FORMATS.progressivoSedeCifre
    ? ok
    : fail("progressivoSede.formato");

/**
 * Pincode della busta virtuale.
 * Entratel 16 alfanumerici, Fisconline 10 caratteri.
 */
export const validatePincode = (
  v: string,
  profile: UserProfile,
): ValidationResult => {
  const atteso =
    profile === "entratel"
      ? SECRET_RULES.pincodeEntratelLunghezza
      : SECRET_RULES.pincodeFisconlineLunghezza;
  if (v.length !== atteso) return fail("pincode.lunghezza");
  return /^[A-Za-z0-9]+$/.test(v) ? ok : fail("pincode.caratteri");
};

/** PIN di revoca: 15-20 caratteri, lettere e numeri non accentati. */
export const validatePinRevoca = (v: string): ValidationResult => {
  if (
    v.length < SECRET_RULES.pinRevocaMin ||
    v.length > SECRET_RULES.pinRevocaMax
  )
    return fail("pinRevoca.lunghezza");
  return /^[A-Za-z0-9]+$/.test(v) ? ok : fail("pinRevoca.caratteri");
};

/**
 * Password di protezione dei PKCS#12.
 * Limite superiore prudenziale a 15 — vedi @conflitto in constants.ts.
 */
export const validatePasswordProtezione = (v: string): ValidationResult =>
  v.length >= SECRET_RULES.passwordProtezioneMin &&
  v.length <= SECRET_RULES.passwordProtezioneMax
    ? ok
    : fail("passwordProtezione.lunghezza");

/** Coordinate bancarie (sezione condizionale di Autentica). */
export const validateAbi = (v: string): ValidationResult =>
  onlyDigits(v) && v.length === FIELD_FORMATS.abiCifre
    ? ok
    : fail("abi.formato");

export const validateCab = (v: string): ValidationResult =>
  onlyDigits(v) && v.length === FIELD_FORMATS.cabCifre
    ? ok
    : fail("cab.formato");

/** Conto corrente: 12 alfanumerici, ammessi punto, trattino e spazio. */
export const validateConto = (v: string): ValidationResult =>
  v.length === FIELD_FORMATS.contoLunghezza && /^[A-Za-z0-9.\- ]+$/.test(v)
    ? ok
    : fail("conto.formato");

export const validateCin = (v: string): ValidationResult =>
  /^[A-Za-z]$/.test(v) ? ok : fail("cin.formato");

export const validateIban = (v: string): ValidationResult =>
  v.length === FIELD_FORMATS.ibanLunghezza && /^[A-Za-z0-9]+$/.test(v)
    ? ok
    : fail("iban.formato");

/** Nome utenza locale: alfanumerici più punto e trattino basso (Manuale cap. 2.6). */
export const validateNomeUtenzaLocale = (v: string): ValidationResult =>
  v.length > 0 && /^[A-Za-z0-9._]+$/.test(v) ? ok : fail("utenzaLocale.nome");

export const validatePasswordUtenzaLocale = (v: string): ValidationResult =>
  v.length >= SECRET_RULES.utenzaLocalePasswordMin &&
  v.length <= SECRET_RULES.utenzaLocalePasswordMax
    ? ok
    : fail("utenzaLocale.password");

/** Limite dimensione per Autentica singolo file. */
export const validateDimensioneAutenticaSingolo = (
  bytes: number,
  giaControllato: boolean,
): ValidationResult => {
  const max = giaControllato
    ? SIZE_LIMITS.autenticaSingoloControllato
    : SIZE_LIMITS.autenticaSingolo;
  return bytes <= max ? ok : fail("file.troppoGrande");
};

/** Limite dimensione complessiva per Autentica più file. */
export const validateDimensioneAutenticaMultiplo = (
  bytesTotali: number,
): ValidationResult =>
  bytesTotali <= SIZE_LIMITS.autenticaMultiplo ? ok : fail("file.troppoGrande");

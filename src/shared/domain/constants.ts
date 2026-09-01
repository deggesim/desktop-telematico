/**
 * Costanti di dominio estratte dai documenti del cliente.
 *
 * Fonti (indicate riga per riga): guida.pdf per l'ambiente di sicurezza,
 * Manuale_Utente_Entrate.pdf per documenti e ricevute,
 * EvoluzioneDesktopTelematico_FrontEnd.docx per il perimetro funzionale.
 *
 * Ogni valore qui dentro è già scritto in un documento consegnato: NON sono
 * assunzioni. Dove i documenti si contraddicono il conflitto è marcato con
 * `@conflitto` e il valore scelto è quello prudenziale.
 */

/** Sotto-cartelle dell'area di lavoro (Manuale cap. 2). Modello a stati sul file system. */
export const WORKSPACE_SUBDIRS = [
  "controllati",
  "firmati",
  "da inviare",
  "esiti",
  "inviati",
  "ricevute",
  "compresse",
  "ricezione",
] as const;
export type WorkspaceSubdir = (typeof WORKSPACE_SUBDIRS)[number];

/**
 * Catena delle estensioni del flusso telematico (Manuale cap. 8-9).
 * file telematico → dgn/dcm → ccf → invio → rcc → p7m/rel → pdf
 */
export const FILE_EXTENSIONS = {
  diagnostico: "dgn",
  controllato: "dcm",
  autenticato: "ccf",
  ricevutaCifrata: "rcc",
  ricevutaFirmata: "p7m",
  ricevutaInChiaro: "rel",
  stampa: "pdf",
  annullamento: "txt",
} as const;

/** Limiti di dimensione file, in byte (Manuale cap. 8). */
export const SIZE_LIMITS = {
  /** Autentica singolo file: 3 MB in generale */
  autenticaSingolo: 3 * 1024 * 1024,
  /** Autentica singolo file: 2 MB per alcune tipologie documentali */
  autenticaSingoloRidotto: 2 * 1024 * 1024,
  /** Autentica singolo file già controllato: 5 MB */
  autenticaSingoloControllato: 5 * 1024 * 1024,
  /** Autentica più file: 5 MB complessivi, solo file già controllati */
  autenticaMultiplo: 5 * 1024 * 1024,
} as const;

/** Soglie di elaborazione e paginazione (Manuale cap. 9). */
export const THRESHOLDS = {
  /** Apri ricevute: massimo file per elaborazione */
  apriRicevuteMaxFile: 50,
  /** Visualizza singole ricevute: elementi per pagina */
  ricevutePerPagina: 10,
} as const;

/** Formati di campo (guida.pdf cap. 5, Manuale cap. 8). */
export const FIELD_FORMATS = {
  /** Protocollo telematico del file */
  protocolloFileCifre: 17,
  /** Progressivo documento all'interno della fornitura */
  progressivoDocumentoCifre: 6,
  /** Progressivo sede: solo profilo Entratel, default "000" */
  progressivoSedeCifre: 3,
  progressivoSedeDefault: "000",
  abiCifre: 5,
  cabCifre: 5,
  contoLunghezza: 12,
  cinLunghezza: 1,
  ibanLunghezza: 27,
} as const;

/**
 * Regole dei quattro segreti dell'ambiente di sicurezza.
 * Sono distinti e NON vanno confusi in interfaccia (guida.pdf cap. 5.1.2, 6.2).
 */
export const SECRET_RULES = {
  /** Pincode dalla busta virtuale: 16 alfanumerici Entratel, 10 caratteri Fisconline */
  pincodeEntratelLunghezza: 16,
  pincodeFisconlineLunghezza: 10,
  /** PIN di revoca: 15-20, lettere e numeri non accentati */
  pinRevocaMin: 15,
  pinRevocaMax: 20,
  /**
   * Password di protezione dei PKCS#12.
   * @conflitto guida.pdf cap. 5.1.2 dice max 20, cap. 6.2 e il manuale dicono max 15.
   * Adottiamo 15 (il più restrittivo) finché il cliente non risponde: una password
   * accettata in creazione e rifiutata al cambio è il fallimento peggiore dei due.
   * Domanda #10 dell'elenco aperto.
   */
  passwordProtezioneMin: 8,
  passwordProtezioneMax: 15,
  passwordProtezioneMaxGuida512: 20,
  /** Utenza locale dell'applicazione (Manuale cap. 2.6) */
  utenzaLocalePasswordMin: 8,
  utenzaLocalePasswordMax: 15,
} as const;

/** Artefatti su disco dell'ambiente di sicurezza (guida.pdf cap. 5). */
export const SECURITY_FILES = {
  /** PKCS#12 con certificato e chiave di firma */
  firma: "UTEF.P12",
  /** PKCS#12 con certificato e chiave di cifra */
  cifra: "UTEC.P12",
  /** Keystore Java con entrambe le coppie, creato a fine importazione */
  keystore: "UTENTE.KS",
  /** Richiesta di certificazione PKCS#10, codice documento PKS10 */
  richiesta: "req.ccc",
  /** Ricevuta con le chiavi pubbliche validate dall'Agenzia */
  risposta: "certif.in",
} as const;

/** Parametri crittografici in uso oggi (guida.pdf cap. 5). */
export const CRYPTO_PARAMS = {
  rsaKeySize: 4096,
  signatureAlgorithm: "SHA256withRSA",
  formats: ["PKCS#7 Signed Data", "PKCS#7 Enveloped Data"],
  ca: "CA Agenzia delle Entrate",
} as const;

/**
 * Severità del diagnostico, notazione ad asterischi (Manuale cap. 8).
 * È la base della resa visiva di Visualizza Esito.
 */
export const DIAGNOSTIC_SEVERITY = {
  "***": "scarto dell'intera fornitura",
  "**": "scarto della singola richiesta",
  "*": "anomalia non bloccante",
} as const;
export type DiagnosticSeverity = keyof typeof DIAGNOSTIC_SEVERITY;

/** Codici di errore citati nei documenti. L'elenco completo manca (domanda aperta). */
export const KNOWN_ERROR_CODES = {
  "88": "Timeout nel download di certif.in — NON rigenerare l'ambiente di sicurezza",
  "03": "Errore citato nella guida senza descrizione estesa",
  "05": "Errore citato nella guida senza descrizione estesa",
} as const;

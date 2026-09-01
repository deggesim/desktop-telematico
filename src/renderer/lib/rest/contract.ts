/**
 * BOZZA del contratto dei servizi REST fra front end e business logic.
 *
 * Scritta dal lato di chi consuma. Nel piano cliente la definizione dei
 * servizi corre dal 14 al 30 settembre 2026, mentre l'integrazione parte il
 * 12 ottobre: senza una bozza scritta prima non si può costruire nulla oltre
 * la scocca. Questo file è la proposta da mettere sul tavolo, non un accordo.
 *
 * Regola: il front end programma SOLO contro questi tipi. Quando arriva il
 * contratto vero cambia questo file e l'adapter, non le schermate.
 */

/** Voce di un menu a tendina a elenco dinamico. */
export type TipoDocumento = {
  codice: string;
  descrizione: string;
  /** Modulo di controllo che espone questo tipo. È il motivo per cui l'elenco è dinamico. */
  moduloControllo: string;
  /** Limite in byte per l'autenticazione, se diverso dal default di 3 MB */
  limiteAutenticaBytes?: number;
};

export type CategoriaDocumento = { codice: string; descrizione: string };

/** Severità del diagnostico, notazione ad asterischi del manuale. */
export type EsitoSeverita = "***" | "**" | "*";

export type AnomaliaDiagnostica = {
  severita: EsitoSeverita;
  codice: string;
  descrizione: string;
  /** Progressivo del documento nella fornitura, 6 cifre */
  progressivoDocumento?: string;
  riga?: number;
};

export type EsitoControllo = {
  fileName: string;
  /** true se il file è stato prodotto: .dcm controllato + .dgn diagnostico */
  controllato: boolean;
  anomalie: AnomaliaDiagnostica[];
  fileDiagnostico: string | null;
  fileControllato: string | null;
};

export type EsitoAutentica = {
  fileName: string;
  fileAutenticato: string | null;
  /**
   * Avviso NON bloccante: il codice fiscale del record di testa non coincide
   * con l'utente che autentica. L'utente può procedere, ma l'invio comporta
   * scarto automatico. Non trasformarlo in errore bloccante.
   */
  avvisoCongruenzaCodiceFiscale: boolean;
  /** Riepilogo versamenti, presente solo se il file contiene saldi positivi */
  coordinateBancarieRichieste: boolean;
};

export type EsitoInvio = {
  fileName: string;
  protocollo: string;
  /** La trasmissione sperimentale genera sempre una ricevuta di scarto */
  sperimentale: boolean;
};

export type Ricevuta = {
  protocollo: string;
  fileName: string;
  dataElaborazione: string;
  esito: string;
  /** Percorso del PDF una volta prodotto */
  filePdf: string | null;
};

export type ModuloControlloDisponibile = {
  nome: string;
  versione: string;
  installato: boolean;
  dataAggiornamento: string;
};

/**
 * Superficie dei servizi consumati dal front end.
 * Ogni metodo corrisponde a una chiamata al middleware.
 */
export type RestClient = {
  /** Popola le tre tendine dinamiche della card Documenti. Voce bloccante. */
  listTipiDocumento: () => Promise<TipoDocumento[]>;
  listCategorieDocumento: () => Promise<CategoriaDocumento[]>;
  /** Riconoscimento automatico del tipo dal file selezionato, come oggi */
  riconosciTipoDocumento: (filePath: string) => Promise<TipoDocumento | null>;

  controllaSingolo: (filePath: string, tipo: string) => Promise<EsitoControllo>;
  controllaFornitura: (
    filePaths: string[],
    tipo: string,
  ) => Promise<EsitoControllo[]>;

  autenticaSingolo: (filePath: string) => Promise<EsitoAutentica>;
  autenticaMultiplo: (filePaths: string[]) => Promise<EsitoAutentica[]>;

  firmaFile: (
    filePath: string,
  ) => Promise<{ fileName: string; fileFirmato: string }>;
  inviaFile: (filePaths: string[]) => Promise<EsitoInvio[]>;

  listRicevute: (params: { offset: number; limit: number }) => Promise<{
    rows: Ricevuta[];
    total: number;
  }>;

  listModuliControllo: () => Promise<ModuloControlloDisponibile[]>;
};

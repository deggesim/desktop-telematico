/**
 * Adapter mock del contratto REST.
 *
 * Serve a far girare le schermate prima che i servizi esistano. I dati sono
 * palesemente finti e marcati come tali: nessun valore qui dentro va usato
 * come specifica. La latenza simulata esiste perché gli stati di caricamento
 * vanno progettati adesso, non quando il backend rallenta in collaudo.
 */

import type {
  CategoriaDocumento,
  EsitoAutentica,
  EsitoControllo,
  EsitoInvio,
  ModuloControlloDisponibile,
  RestClient,
  Ricevuta,
  TipoDocumento,
} from "./contract";

const delay = (ms = 250): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const TIPI: TipoDocumento[] = [
  {
    codice: "MOCK-01",
    descrizione: "[mock] Dichiarazione redditi PF",
    moduloControllo: "mock-rpf",
  },
  {
    codice: "MOCK-02",
    descrizione: "[mock] Modello F24",
    moduloControllo: "mock-f24",
  },
  {
    codice: "MOCK-03",
    descrizione: "[mock] Comunicazione IVA",
    moduloControllo: "mock-iva",
  },
];

const CATEGORIE: CategoriaDocumento[] = [
  { codice: "MOCK-A", descrizione: "[mock] Dichiarazioni" },
  { codice: "MOCK-B", descrizione: "[mock] Versamenti" },
];

const baseName = (p: string): string => p.split(/[\\/]/).pop() ?? p;

export const createMockRestClient = (): RestClient => ({
  listTipiDocumento: async () => {
    await delay();
    return TIPI;
  },

  listCategorieDocumento: async () => {
    await delay();
    return CATEGORIE;
  },

  riconosciTipoDocumento: async () => {
    await delay(120);
    return TIPI[0] ?? null;
  },

  controllaSingolo: async (filePath): Promise<EsitoControllo> => {
    await delay(600);
    return {
      fileName: baseName(filePath),
      controllato: true,
      anomalie: [
        {
          severita: "*",
          codice: "MOCK-001",
          descrizione: "[mock] Anomalia non bloccante di esempio",
          progressivoDocumento: "000001",
        },
      ],
      fileDiagnostico: `${filePath}.dgn`,
      fileControllato: `${filePath}.dcm`,
    };
  },

  controllaFornitura: async (filePaths) => {
    await delay(800);
    return filePaths.map((p) => ({
      fileName: baseName(p),
      controllato: true,
      anomalie: [],
      fileDiagnostico: `${p}.dgn`,
      fileControllato: `${p}.dcm`,
    }));
  },

  autenticaSingolo: async (filePath): Promise<EsitoAutentica> => {
    await delay(500);
    return {
      fileName: baseName(filePath),
      fileAutenticato: `${filePath}.ccf`,
      avvisoCongruenzaCodiceFiscale: false,
      coordinateBancarieRichieste: false,
    };
  },

  autenticaMultiplo: async (filePaths) => {
    await delay(700);
    return filePaths.map((p) => ({
      fileName: baseName(p),
      fileAutenticato: `${p}.ccf`,
      avvisoCongruenzaCodiceFiscale: false,
      coordinateBancarieRichieste: false,
    }));
  },

  firmaFile: async (filePath) => {
    await delay(400);
    return { fileName: baseName(filePath), fileFirmato: `${filePath}.p7m` };
  },

  inviaFile: async (filePaths): Promise<EsitoInvio[]> => {
    await delay(900);
    return filePaths.map((p, i) => ({
      fileName: baseName(p),
      protocollo: String(10000000000000000 + i),
      sperimentale: true,
    }));
  },

  listRicevute: async ({ offset, limit }) => {
    await delay();
    const all: Ricevuta[] = Array.from({ length: 23 }, (_, i) => ({
      protocollo: String(10000000000000000 + i),
      fileName: `[mock] fornitura-${String(i + 1).padStart(3, "0")}.ccf`,
      dataElaborazione: new Date(2026, 8, 1 + (i % 20)).toISOString(),
      esito: i % 5 === 0 ? "[mock] Scarto" : "[mock] Accettata",
      filePdf: null,
    }));
    return { rows: all.slice(offset, offset + limit), total: all.length };
  },

  listModuliControllo: async (): Promise<ModuloControlloDisponibile[]> => {
    await delay();
    return TIPI.map((t) => ({
      nome: t.moduloControllo,
      versione: "0.0.0-mock",
      installato: true,
      dataAggiornamento: "2026-09-01",
    }));
  },
});

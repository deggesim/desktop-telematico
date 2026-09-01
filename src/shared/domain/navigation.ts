/**
 * Modello di navigazione: aree (menu + card) e funzionalità.
 *
 * È la sorgente unica da cui derivano menu, card della home, rotte del router
 * e pagine stub. Aggiungere una schermata significa aggiungere una riga qui:
 * la rotta e la voce di menu seguono.
 *
 * Ogni funzionalità porta con sé lo **stato della specifica** e la **fonte**.
 * Questa è, di fatto, la matrice delle schermate da mandare al cliente: la
 * pagina /stato-specifiche la stampa direttamente da qui.
 */

import type { UserProfile } from "./profile.js";

/** Quanto è specificata la schermata nei documenti consegnati. */
export type SpecStatus =
  /** Campi, etichette e validazioni note dai manuali: implementabile subito */
  | "completa"
  /** Parte nota, parte da dedurre o da chiedere */
  | "parziale"
  /** Rimanda al prototipo, che non è stato consegnato */
  | "assente";

/**
 * Stato funzionale dichiarato dal requisito.
 * `non-attiva` = il documento dice "per ora non attiva".
 * `non-applicabile` = il documento dice "per ora non applicabile".
 *
 * Come renderle in UI (voce disabilitata / pagina vuota / voce assente) è una
 * domanda aperta al cliente: finché non risponde le mostriamo disabilitate,
 * che è la scelta reversibile.
 */
export type FeatureState = "attiva" | "non-attiva" | "non-applicabile";

export type Feature = {
  /** Identificatore stabile: chiave i18n (`feature.<id>`) e segmento di rotta */
  id: string;
  /** Path completo della rotta, con hash router */
  path: string;
  profiles: readonly UserProfile[];
  state: FeatureState;
  spec: SpecStatus;
  /** Documento e capitolo da cui viene la specifica */
  source: string;
  /** Note di implementazione e punti aperti, in italiano, mostrate nello stub */
  note?: string;
};

export type Area = {
  id: string;
  path: string;
  /** Classe Bootstrap Icons del kit */
  icon: string;
  profiles: readonly UserProfile[];
  /** Le aree principali sono anche card in home; le accessorie no */
  primary: boolean;
  features: readonly Feature[];
};

const ENTRAMBI = ["entratel", "fisconline"] as const;
const SOLO_ENTRATEL = ["entratel"] as const;
// Nessuna funzionalita' e' oggi esclusiva di Fisconline: il manuale del
// profilo File Internet non e' stato consegnato. Quando arrivera', qui servira'
// anche un SOLO_FISCONLINE.

export const AREAS: readonly Area[] = [
  {
    id: "sicurezza",
    path: "/sicurezza",
    icon: "bi-shield-lock",
    profiles: ENTRAMBI,
    primary: true,
    features: [
      {
        id: "genera-ambiente",
        path: "/sicurezza/genera-ambiente",
        profiles: ENTRAMBI,
        state: "attiva",
        spec: "completa",
        source:
          "guida.pdf cap. 5.1 (titolo reale: «Funzione Imposta Ambiente»)",
        note: "L'unica differenza tra i due profili è il campo Progressivo sede (solo Entratel) e la lunghezza del pincode.",
      },
      {
        id: "importa-certificati",
        path: "/sicurezza/importa-certificati",
        profiles: ENTRAMBI,
        state: "attiva",
        spec: "parziale",
        source: "guida.pdf cap. 5.3",
        note: "Il capitolo non ha screenshot: le etichette dei tre campi vanno dedotte per analogia e confermate.",
      },
      {
        id: "visualizza-certificati",
        path: "/sicurezza/visualizza-certificati",
        profiles: ENTRAMBI,
        state: "attiva",
        spec: "completa",
        source: "guida.pdf cap. 6.1",
        note: "Il requisito chiede per ora solo la form iniziale.",
      },
      {
        id: "cambia-password",
        path: "/sicurezza/cambia-password",
        profiles: ENTRAMBI,
        state: "attiva",
        spec: "completa",
        source: "guida.pdf cap. 6.2 (il requisito cita erroneamente il 6.1)",
        note: "Per ora solo la form iniziale. Qui vale il conflitto sulla lunghezza massima della password: 15 o 20.",
      },
    ],
  },
  {
    id: "documenti",
    path: "/documenti",
    icon: "bi-file-earmark-text",
    profiles: ENTRAMBI,
    primary: true,
    features: [
      {
        id: "annulla",
        path: "/documenti/annulla",
        profiles: SOLO_ENTRATEL,
        state: "attiva",
        spec: "parziale",
        source: "Desktop Telematico esistente, schermata iniziale",
        note: "Il menu a tendina Categoria documento è a elenco dinamico: dipende dai moduli di controllo installati. Senza il servizio che espone l'elenco la maschera resta una scocca.",
      },
      {
        id: "controlla-singolo",
        path: "/documenti/controlla/singolo",
        profiles: ENTRAMBI,
        state: "attiva",
        spec: "parziale",
        source: "Manuale cap. 8",
        note: "Stessa schermata per Entratel e Fisconline. Tendina Tipo di documento a elenco dinamico.",
      },
      {
        id: "controlla-fornitura",
        path: "/documenti/controlla/fornitura",
        profiles: SOLO_ENTRATEL,
        state: "attiva",
        spec: "parziale",
        source: "Manuale cap. 8",
        note: "Tendina Seleziona tipo documento a elenco dinamico.",
      },
      {
        id: "visualizza-richieste-annullamento",
        path: "/documenti/visualizza-richieste-annullamento",
        profiles: SOLO_ENTRATEL,
        state: "non-attiva",
        spec: "assente",
        source: "requisito: «per ora non attiva»",
      },
      {
        id: "visualizza-esito",
        path: "/documenti/visualizza-esito",
        profiles: ENTRAMBI,
        state: "attiva",
        spec: "assente",
        source: "prototipo, sezione Visualizza Documenti > Diagnostici",
        note: "Il prototipo non è stato consegnato. I tre livelli di severità del diagnostico — (***) (**) (*) — sono la base naturale della resa visiva.",
      },
      {
        id: "visualizza-contenuto-file",
        path: "/documenti/visualizza-contenuto-file",
        profiles: ENTRAMBI,
        state: "non-attiva",
        spec: "assente",
        source: "requisito: «per ora non attiva»",
      },
      {
        id: "autentica-singolo",
        path: "/documenti/autentica/singolo",
        profiles: SOLO_ENTRATEL,
        state: "attiva",
        spec: "completa",
        source: "Manuale cap. 8",
        note: "Sezione Coordinate bancarie condizionale, attiva solo con versamenti a saldo positivo. Il controllo di congruenza sul codice fiscale produce un avviso NON bloccante: non trasformarlo in errore.",
      },
      {
        id: "autentica-multiplo",
        path: "/documenti/autentica/multiplo",
        profiles: SOLO_ENTRATEL,
        state: "attiva",
        spec: "completa",
        source: "Manuale cap. 8",
        note: "Massimo 5 MB complessivi e solo file già controllati.",
      },
      {
        id: "firma-file",
        path: "/documenti/firma-file",
        profiles: ENTRAMBI,
        state: "attiva",
        spec: "parziale",
        source: "Manuale cap. 8",
        note: "La validazione del nome file contro lo standard di nomenclatura è dichiarata bloccante, ma la regola non è scritta in nessun documento: da chiedere.",
      },
      {
        id: "invia-file",
        path: "/documenti/invia-file",
        profiles: ENTRAMBI,
        state: "attiva",
        spec: "completa",
        source: "Manuale cap. 8",
        note: "Invio per conto terzi: prevale il manuale, due campi (Utente e Sede). La trasmissione sperimentale genera sempre una ricevuta di scarto: l'avviso deve restare visibile.",
      },
    ],
  },
  {
    id: "ricevute",
    path: "/ricevute",
    icon: "bi-receipt",
    profiles: SOLO_ENTRATEL,
    primary: true,
    features: [
      {
        id: "apri-ricevute",
        path: "/ricevute/apri",
        profiles: SOLO_ENTRATEL,
        state: "attiva",
        spec: "completa",
        source: "Manuale cap. 9",
        note: "Massimo 50 file per elaborazione.",
      },
      {
        id: "visualizza-stampa-ricevute",
        path: "/ricevute/visualizza-stampa",
        profiles: SOLO_ENTRATEL,
        state: "attiva",
        spec: "completa",
        source: "Manuale cap. 9",
        note: "Paginazione a 10. Oggi la stampa passa da Acrobat Reader installato: nel nuovo front end serve un visualizzatore PDF interno, voce di lavoro a sé.",
      },
    ],
  },
  {
    id: "impostazioni",
    path: "/impostazioni",
    icon: "bi-gear",
    profiles: ENTRAMBI,
    primary: false,
    features: [
      {
        id: "configurazione-workspace",
        path: "/impostazioni/workspace",
        profiles: ENTRAMBI,
        state: "attiva",
        spec: "completa",
        source: "requisito + Manuale cap. 2.6.2",
        note: "Modifica tipo utente, path area di lavoro, path ambiente di sicurezza.",
      },
      {
        id: "configurazione-proxy",
        path: "/impostazioni/proxy",
        profiles: ENTRAMBI,
        state: "attiva",
        spec: "parziale",
        source: "Manuale cap. 5",
        note: "Oggi è per schema (HTTP, HTTPS, SOCKS) con autenticazione e lista di esclusioni. Il requisito parla di «eventuale proxy locale», che è meno: da chiarire se si replica o si semplifica.",
      },
      {
        id: "informazioni",
        path: "/impostazioni/informazioni",
        profiles: ENTRAMBI,
        state: "attiva",
        spec: "parziale",
        source: "requisito",
        note: "L'elenco delle componenti di business è «per ora non applicabile» ma deve comunque riportare sei campi: nome, funzionalità, versione, data di aggiornamento, nome della classe jar, modulo firmato o no.",
      },
    ],
  },
  {
    id: "strumenti",
    path: "/strumenti",
    icon: "bi-tools",
    profiles: ENTRAMBI,
    primary: false,
    features: [
      {
        id: "log-frontend",
        path: "/strumenti/log-frontend",
        profiles: ENTRAMBI,
        state: "attiva",
        spec: "parziale",
        source: "requisito",
      },
      {
        id: "log-backend",
        path: "/strumenti/log-backend",
        profiles: ENTRAMBI,
        state: "non-applicabile",
        spec: "assente",
        source: "requisito: «per ora non applicabile»",
      },
      {
        id: "storico",
        path: "/strumenti/storico",
        profiles: ENTRAMBI,
        state: "attiva",
        spec: "completa",
        source: "Manuale cap. 10 + Desktop Telematico esistente",
        note: "Oggi legge da un Apache Derby embedded. Ricerca per tipo operazione (Sicurezza, Controllo, Autentica, Firma) e intervallo di date; tra i campi c'è un hash del file calcolato alla predisposizione. Qui usiamo SQLite locale. Richiede un date picker, che il design kit non fornisce.",
      },
    ],
  },
  {
    id: "moduli-controllo",
    path: "/moduli-controllo",
    icon: "bi-puzzle",
    profiles: ENTRAMBI,
    primary: false,
    features: [
      {
        id: "installa-disinstalla-moduli",
        path: "/moduli-controllo/installa-disinstalla",
        profiles: ENTRAMBI,
        state: "attiva",
        spec: "assente",
        source: "prototipo, funzione omonima",
        note: "Il prototipo non è stato consegnato. È anche la funzione che popola i tre menu a tendina dinamici della card Documenti.",
      },
    ],
  },
  {
    id: "applicazione",
    path: "/applicazione",
    icon: "bi-arrow-repeat",
    profiles: ENTRAMBI,
    primary: false,
    features: [
      {
        id: "aggiornamento-applicazione",
        path: "/applicazione/aggiornamento",
        profiles: ENTRAMBI,
        state: "attiva",
        spec: "assente",
        source: "prototipo",
      },
      {
        id: "disinstalla-applicazione",
        path: "/applicazione/disinstalla",
        profiles: ENTRAMBI,
        state: "attiva",
        spec: "assente",
        source: "prototipo",
      },
    ],
  },
  {
    id: "help",
    path: "/help",
    icon: "bi-question-circle",
    profiles: ENTRAMBI,
    primary: false,
    features: [
      {
        id: "assistenza",
        path: "/help/assistenza",
        profiles: ENTRAMBI,
        state: "attiva",
        spec: "completa",
        source: "Manuale cap. 11-12, menu Web del Desktop esistente",
        note: "Link esterni: sito di Assistenza, area riservata del portale, Manuale Utente in PDF. Gli esterni si aprono con shell.openExternal, mai nella BrowserWindow.",
      },
    ],
  },
] as const;

/** Aree visibili al profilo indicato. */
export const areasFor = (profile: UserProfile): Area[] =>
  AREAS.filter((a) => a.profiles.includes(profile)).map((a) => ({
    ...a,
    features: a.features.filter((f) => f.profiles.includes(profile)),
  }));

/** Aree principali: sono anche card in home (Sicurezza, Documenti, Ricevute). */
export const primaryAreasFor = (profile: UserProfile): Area[] =>
  areasFor(profile).filter((a) => a.primary);

/** Aree accessorie: Impostazioni, Strumenti, Moduli di controllo, Applicazione, Help. */
export const secondaryAreasFor = (profile: UserProfile): Area[] =>
  areasFor(profile).filter((a) => !a.primary);

/** Tutte le funzionalità, appiattite. Usato dal router e dalla matrice specifiche. */
export const ALL_FEATURES: readonly Feature[] = AREAS.flatMap(
  (a) => a.features,
);

export const findFeature = (path: string): Feature | undefined =>
  ALL_FEATURES.find((f) => f.path === path);

export const findArea = (featureId: string): Area | undefined =>
  AREAS.find((a) => a.features.some((f) => f.id === featureId));

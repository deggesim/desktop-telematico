/**
 * Link esterni usati da header, footer e menu Help.
 *
 * Sono gli indirizzi pubblici dell'Agenzia. Vanno confermati con il cliente
 * insieme al link del Manuale Utente in PDF, che nel Desktop attuale è locale
 * e qui è ancora un segnaposto.
 *
 * Aprirli SEMPRE con window.electronAPI.appOpenExternal: la BrowserWindow non
 * naviga fuori dall'applicazione.
 */

export const LINK_ASSISTENZA = "https://assistenza.agenziaentrate.gov.it/";
export const LINK_AREA_RISERVATA =
  "https://www.agenziaentrate.gov.it/portale/area-riservata";

/** TODO cliente: il manuale va distribuito con l'applicazione o linkato online? */
export const LINK_MANUALE = "https://www.agenziaentrate.gov.it/portale/";

/**
 * Selettore dell'adapter REST.
 *
 * Oggi c'è solo il mock: i servizi non esistono ancora e il contratto non è
 * firmato. Quando arriverà l'ambiente di simulazione si aggiunge
 * `http-adapter.ts` e si sceglie qui in base a `VITE_REST_MODE`.
 * Le schermate non devono accorgersene: importano `restClient` e basta.
 */

import type { RestClient } from "./contract";
import { createMockRestClient } from "./mock-adapter";

const mode = import.meta.env["VITE_REST_MODE"] ?? "mock";

export const restClient: RestClient = createMockRestClient();

/** true quando le schermate stanno lavorando su dati finti: la UI lo dichiara. */
export const isMockMode = mode === "mock";

export type { RestClient };

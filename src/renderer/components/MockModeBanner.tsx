/**
 * Banner permanente finché il front end gira sui mock.
 *
 * Non è decorazione: un collaudo fatto su dati finti senza che nessuno se ne
 * accorga è il modo più rapido di perdere credibilità. Sparisce da solo
 * quando `VITE_REST_MODE` non è più "mock".
 */

import { isMockMode } from "../lib/rest";

export const MockModeBanner = () => {
  if (!isMockMode) return null;
  return (
    <div
      className="alert alert-warning rounded-0 mb-0 py-2 text-center"
      role="status"
    >
      <i className="bi bi-exclamation-triangle me-2" aria-hidden="true" />
      <strong>Dati simulati.</strong> I servizi REST non sono ancora
      disponibili: ogni valore mostrato proviene dall&apos;adapter mock.
    </div>
  );
};

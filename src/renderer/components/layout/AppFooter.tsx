/**
 * Footer di tutte le pagine (requisito): logo e nome dell'Agenzia in caratteri
 * più piccoli, stringa identificativa dell'ente, ancoraggio all'assistenza.
 */

import { useTranslation } from "react-i18next";
import logoAeBianco from "@ds/img/agenzia_entrate_bianco.svg";
import { LINK_ASSISTENZA, LINK_MANUALE } from "../../lib/external-links";

export const AppFooter = () => {
  const { t } = useTranslation();

  const openExternal = (url: string) => () => {
    void window.electronAPI.appOpenExternal(url);
  };

  return (
    <footer>
      <div className="footer-dark py-3">
        <div className="container-fluid d-flex flex-wrap align-items-center gap-3">
          <img src={logoAeBianco} alt={t("app.agency")} height={28} />
          <small className="mb-0">{t("app.agencyDetails")}</small>
          <div className="ms-auto d-flex gap-3">
            <button
              type="button"
              className="btn btn-link btn-sm p-0"
              onClick={openExternal(LINK_ASSISTENZA)}
            >
              {t("footer.support")}
            </button>
            <button
              type="button"
              className="btn btn-link btn-sm p-0"
              onClick={openExternal(LINK_MANUALE)}
            >
              {t("footer.manual")}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

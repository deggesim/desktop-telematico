/**
 * Header di tutte le pagine (requisito, sezione «Layout delle pagine»):
 * logo dell'Agenzia, nome applicazione, profilo attivo, uscita, lingua.
 * Più l'ancoraggio al link di assistenza, come nel Desktop esistente.
 *
 * Markup allineato al design kit: `header > .header-top-light` (barra alta con
 * i link di servizio) seguito da `nav.navbar.header-light`.
 */

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LANGUAGES, type Language } from "@shared/domain/profile";
import logoAe from "@ds/img/agenzia_entrate.svg";
import { useConfigStore, useProfile } from "../../store/configStore";
import { LINK_ASSISTENZA } from "../../lib/external-links";

export const AppHeader = () => {
  const { t, i18n } = useTranslation();
  const profile = useProfile();
  const setLanguage = useConfigStore((s) => s.setLanguage);

  const onExit = () => {
    void window.electronAPI.appQuit();
  };

  const onOpenSupport = () => {
    void window.electronAPI.appOpenExternal(LINK_ASSISTENZA);
  };

  return (
    <header>
      <div className="header-top-light">
        <div className="container-fluid d-flex align-items-center justify-content-end gap-3 py-1">
          <button
            type="button"
            className="btn btn-link btn-sm"
            onClick={onOpenSupport}
          >
            <i className="bi bi-life-preserver me-1" aria-hidden="true" />
            {t("header.support")}
          </button>

          <label className="visually-hidden" htmlFor="language-select">
            {t("header.languageAria")}
          </label>
          <select
            id="language-select"
            className="form-select form-select-sm w-auto"
            value={i18n.language}
            onChange={(e) => void setLanguage(e.target.value as Language)}
          >
            {LANGUAGES.map((lng) => (
              <option key={lng} value={lng}>
                {t(`language.${lng}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <nav className="navbar navbar-expand header-light">
        <div className="container-fluid gap-3">
          <Link
            className="navbar-brand header-item d-flex align-items-center gap-3"
            to="/"
          >
            <img
              src={logoAe}
              alt={t("app.agency")}
              className="logo"
              height={40}
            />
            <span className="h1 mb-0 fs-5">{t("app.name")}</span>
          </Link>

          <div className="d-flex align-items-center gap-3 ms-auto">
            {profile && (
              <span className="chip chip-active" aria-live="polite">
                {t("header.profileLabel")}: {t(`profile.${profile}`)}
              </span>
            )}
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={onExit}
              aria-label={t("header.exitAria")}
            >
              <i className="bi bi-box-arrow-right me-1" aria-hidden="true" />
              {t("header.exit")}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

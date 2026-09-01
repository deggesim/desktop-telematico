/**
 * Menu di navigazione laterale. Le voci sono le aree visibili al profilo
 * attivo: principali (che in home sono anche card) e accessorie.
 *
 * Markup del kit: `.sidebar.sidebar-light` con `.sidebar-header > .sidebar-title`
 * e un `nav.nav` di `.nav-link`. La classe `.active` la mette il router.
 */

import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { primaryAreasFor, secondaryAreasFor } from "@shared/domain/navigation";
import type { UserProfile } from "@shared/types";

type Props = { profile: UserProfile };

export const AppSidebar = ({ profile }: Props) => {
  const { t } = useTranslation();
  const primary = primaryAreasFor(profile);
  const secondary = secondaryAreasFor(profile);

  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    `nav-link${isActive ? " active" : ""}`;

  return (
    <div className="sidebar sidebar-light">
      <div className="sidebar-header">
        <span className="sidebar-title">{t("header.menu")}</span>
      </div>
      <nav className="nav flex-column" aria-label={t("header.menu")}>
        <NavLink to="/" end className={linkClass}>
          <i className="bi bi-house-door me-2" aria-hidden="true" />
          {t("header.home")}
        </NavLink>

        {primary.map((area) => (
          <NavLink key={area.id} to={area.path} className={linkClass}>
            <i className={`bi ${area.icon} me-2`} aria-hidden="true" />
            {t(`area.${area.id}.title`)}
          </NavLink>
        ))}

        <hr className="nav-divider" />

        {secondary.map((area) => (
          <NavLink key={area.id} to={area.path} className={linkClass}>
            <i className={`bi ${area.icon} me-2`} aria-hidden="true" />
            {t(`area.${area.id}.title`)}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

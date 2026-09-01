/**
 * Card di un'area, con dentro i link alle sue funzionalità.
 * È la resa richiesta dal requisito: «Queste voci di menu devono essere
 * rappresentate anche tramite card».
 */

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Area } from "@shared/domain/navigation";
import { SpecBadge, StateBadge } from "./ds/SpecBadge";

export const FeatureCard = ({ area }: { area: Area }) => {
  const { t } = useTranslation();

  return (
    <div className="card h-100">
      <div className="card-body">
        <i className={`bi ${area.icon} card-icon-bg`} aria-hidden="true" />
        <h2 className="card-title h5">
          <Link to={area.path} className="stretched-link-none">
            {t(`area.${area.id}.title`)}
          </Link>
        </h2>
        <p className="card-text text-body-secondary">
          {t(`area.${area.id}.description`)}
        </p>

        <ul className="list-unstyled mb-0 d-grid gap-2">
          {area.features.map((f) => (
            <li
              key={f.id}
              className="d-flex align-items-center gap-2 flex-wrap"
            >
              {f.state === "attiva" ? (
                <Link to={f.path} className="card-link">
                  {t(`feature.${f.id}.title`)}
                </Link>
              ) : (
                <span
                  className="text-body-secondary"
                  title={t("state.notActiveHint")}
                >
                  {t(`feature.${f.id}.title`)}
                </span>
              )}
              <StateBadge state={f.state} />
              <SpecBadge spec={f.spec} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

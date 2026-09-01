/**
 * Home profilata. Il requisito chiede menu + card tematiche, in parte
 * speculari: le aree principali diventano card, le accessorie una lista.
 *
 * Entratel vede Sicurezza, Documenti, Ricevute. Fisconline vede Sicurezza e
 * Documenti. La differenza è dichiarata in shared/domain/navigation.ts, non qui.
 */

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { primaryAreasFor, secondaryAreasFor } from "@shared/domain/navigation";
import { FeatureCard } from "../components/FeatureCard";
import { PageHeader } from "../components/ds/PageHeader";
import { useProfile } from "../store/configStore";

export const HomePage = () => {
  const { t } = useTranslation();
  const profile = useProfile();
  if (!profile) return null;

  return (
    <>
      <PageHeader
        title={t("home.welcome")}
        description={`${t("header.profileLabel")}: ${t(`profile.${profile}`)}`}
      />

      <h2 className="h5 mb-3">{t("home.mainAreas")}</h2>
      <div className="row row-cols-1 row-cols-lg-3 g-4 mb-5">
        {primaryAreasFor(profile).map((area) => (
          <div className="col" key={area.id}>
            <FeatureCard area={area} />
          </div>
        ))}
      </div>

      <h2 className="h5 mb-3">{t("home.accessoryAreas")}</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
        {secondaryAreasFor(profile).map((area) => (
          <div className="col" key={area.id}>
            <Link
              to={area.path}
              className="card card-simple h-100 text-decoration-none"
            >
              <div className="card-body d-flex align-items-start gap-3">
                <i className={`bi ${area.icon} fs-4`} aria-hidden="true" />
                <div>
                  <span className="card-title h6 d-block mb-1">
                    {t(`area.${area.id}.title`)}
                  </span>
                  <span className="card-text small text-body-secondary">
                    {t(`area.${area.id}.description`)}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

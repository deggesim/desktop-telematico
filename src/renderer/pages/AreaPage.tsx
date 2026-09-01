/** Pagina di area: elenco delle sue funzionalità per il profilo attivo. */

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Area } from "@shared/domain/navigation";
import { PageHeader } from "../components/ds/PageHeader";
import { SpecBadge, StateBadge } from "../components/ds/SpecBadge";
import { useProfile } from "../store/configStore";

export const AreaPage = ({ area }: { area: Area }) => {
  const { t } = useTranslation();
  const profile = useProfile();
  if (!profile) return null;

  const features = area.features.filter((f) => f.profiles.includes(profile));

  return (
    <>
      <PageHeader
        title={t(`area.${area.id}.title`)}
        description={t(`area.${area.id}.description`)}
        crumbs={[
          { label: t("header.home"), to: "/" },
          { label: t(`area.${area.id}.title`) },
        ]}
      />

      <div className="row row-cols-1 row-cols-md-2 g-3">
        {features.map((f) => (
          <div className="col" key={f.id}>
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title h6 d-flex align-items-center gap-2 flex-wrap">
                  {f.state === "attiva" ? (
                    <Link to={f.path}>{t(`feature.${f.id}.title`)}</Link>
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
                </h2>
                <p className="card-text small text-body-secondary mb-0">
                  {t(`feature.${f.id}.description`)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

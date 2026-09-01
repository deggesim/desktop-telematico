/**
 * Pagina segnaposto di una funzionalità non ancora implementata.
 *
 * Non è una pagina vuota: dichiara la fonte della specifica, il suo stato e le
 * note aperte. Chi apre lo stub sa subito se manca il codice o se manca la
 * risposta del cliente — che è la distinzione che conta durante questo cantiere.
 */

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Feature } from "@shared/domain/navigation";
import { findArea } from "@shared/domain/navigation";
import { Callout } from "../components/ds/Callout";
import { PageHeader } from "../components/ds/PageHeader";
import { SpecBadge, StateBadge } from "../components/ds/SpecBadge";

export const StubPage = ({ feature }: { feature: Feature }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const area = findArea(feature.id);

  return (
    <>
      <PageHeader
        title={t(`feature.${feature.id}.title`)}
        description={t(`feature.${feature.id}.description`)}
        crumbs={
          area
            ? [
                { label: t("header.home"), to: "/" },
                { label: t(`area.${area.id}.title`), to: area.path },
                { label: t(`feature.${feature.id}.title`) },
              ]
            : undefined
        }
        actions={
          <>
            <StateBadge state={feature.state} />
            <SpecBadge spec={feature.spec} />
          </>
        }
      />

      <Callout variant="primary" title={t("stub.heading")}>
        <dl className="row mb-0">
          <dt className="col-sm-3">{t("stub.sourceLabel")}</dt>
          <dd className="col-sm-9">{feature.source}</dd>
          {feature.note && (
            <>
              <dt className="col-sm-3">{t("stub.noteLabel")}</dt>
              <dd className="col-sm-9 mb-0">{feature.note}</dd>
            </>
          )}
        </dl>
      </Callout>

      <button
        type="button"
        className="btn btn-outline-primary mt-4"
        onClick={() => void navigate(-1)}
      >
        <i className="bi bi-arrow-left me-1" aria-hidden="true" />
        {t("stub.back")}
      </button>
    </>
  );
};

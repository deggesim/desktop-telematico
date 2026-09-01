/**
 * Badge dello stato della specifica. Visibile in sviluppo, nascosto in
 * produzione: serve al team e al cliente durante il cantiere, non all'utente
 * finale. Il flag è `VITE_SHOW_SPEC_BADGES`, default acceso in dev.
 */

import { useTranslation } from "react-i18next";
import type { FeatureState, SpecStatus } from "@shared/domain/navigation";

export const specBadgesVisible =
  (import.meta.env["VITE_SHOW_SPEC_BADGES"] ?? String(import.meta.env.DEV)) ===
  "true";

const SPEC_CLASS: Record<SpecStatus, string> = {
  completa: "text-bg-success",
  parziale: "text-bg-warning",
  assente: "text-bg-danger",
};

const STATE_CLASS: Record<FeatureState, string> = {
  attiva: "text-bg-light",
  "non-attiva": "text-bg-secondary",
  "non-applicabile": "text-bg-secondary",
};

export const SpecBadge = ({ spec }: { spec: SpecStatus }) => {
  const { t } = useTranslation();
  if (!specBadgesVisible) return null;
  return (
    <span className={`badge ${SPEC_CLASS[spec]}`} title={t(`spec.${spec}Help`)}>
      {t("spec.label")}: {t(`spec.${spec}`)}
    </span>
  );
};

export const StateBadge = ({ state }: { state: FeatureState }) => {
  const { t } = useTranslation();
  if (state === "attiva") return null;
  return (
    <span className={`badge ${STATE_CLASS[state]}`}>{t(`state.${state}`)}</span>
  );
};

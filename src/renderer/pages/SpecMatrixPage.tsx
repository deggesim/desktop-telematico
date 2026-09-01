/**
 * Matrice delle schermate con lo stato della specifica.
 *
 * Non è una pagina di prodotto: è lo strumento di governo del cantiere, e
 * insieme la richiesta al cliente in forma leggibile. Si genera interamente
 * da shared/domain/navigation.ts, quindi non può divergere dal codice.
 */

import { useTranslation } from "react-i18next";
import {
  AREAS,
  ALL_FEATURES,
  type SpecStatus,
} from "@shared/domain/navigation";
import { AdaptiveTable, type Column } from "../components/ds/AdaptiveTable";
import { PageHeader } from "../components/ds/PageHeader";

type Row = {
  id: string;
  areaId: string;
  profiles: string;
  state: string;
  spec: SpecStatus;
  source: string;
  note: string;
};

export const SpecMatrixPage = () => {
  const { t } = useTranslation();

  const rows: Row[] = AREAS.flatMap((area) =>
    area.features.map((f) => ({
      id: f.id,
      areaId: area.id,
      profiles: f.profiles.map((p) => t(`profile.${p}`)).join(", "),
      state: t(`state.${f.state}`),
      spec: f.spec,
      source: f.source,
      note: f.note ?? "",
    })),
  );

  const count = (s: SpecStatus): number =>
    ALL_FEATURES.filter((f) => f.spec === s).length;

  const columns: Column<Row>[] = [
    {
      key: "feature",
      header: t("specMatrix.colFeature"),
      render: (r) => t(`feature.${r.id}.title`),
    },
    {
      key: "area",
      header: t("specMatrix.colArea"),
      render: (r) => t(`area.${r.areaId}.title`),
    },
    {
      key: "profiles",
      header: t("specMatrix.colProfiles"),
      render: (r) => r.profiles,
    },
    { key: "state", header: t("specMatrix.colState"), render: (r) => r.state },
    {
      key: "spec",
      header: t("specMatrix.colSpec"),
      render: (r) => (
        <span
          className={`badge ${
            r.spec === "completa"
              ? "text-bg-success"
              : r.spec === "parziale"
                ? "text-bg-warning"
                : "text-bg-danger"
          }`}
        >
          {t(`spec.${r.spec}`)}
        </span>
      ),
    },
    {
      key: "source",
      header: t("specMatrix.colSource"),
      render: (r) => r.source,
    },
    {
      key: "note",
      header: t("specMatrix.colNote"),
      render: (r) => (
        <span className="small text-body-secondary">{r.note}</span>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title={t("specMatrix.title")}
        description={t("specMatrix.subtitle")}
        crumbs={[
          { label: t("header.home"), to: "/" },
          { label: t("specMatrix.title") },
        ]}
      />

      <p className="lead">
        {t("specMatrix.totals", {
          completa: count("completa"),
          parziale: count("parziale"),
          assente: count("assente"),
          total: ALL_FEATURES.length,
        })}
      </p>

      <AdaptiveTable
        columns={columns}
        rows={rows}
        rowKey={(r) => r.id}
        caption={t("specMatrix.title")}
        breakpoint="lg"
      />
    </>
  );
};

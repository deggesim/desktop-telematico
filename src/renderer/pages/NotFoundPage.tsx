import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/ds/PageHeader";

export const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader
        title={t("common.notFound")}
        description={t("common.notFoundHelp")}
      />
      <Link className="btn btn-primary" to="/">
        {t("common.backHome")}
      </Link>
    </>
  );
};

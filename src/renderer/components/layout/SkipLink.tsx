/**
 * Skip link. Il design kit non ne fornisce uno, ma per la PA è atteso:
 * lo scriviamo noi e lo teniamo qui, non nel CSS vendorizzato.
 */

import { useTranslation } from "react-i18next";

export const SkipLink = () => {
  const { t } = useTranslation();
  return (
    <a href="#main-content" className="skip-link">
      {t("a11y.skipToContent")}
    </a>
  );
};

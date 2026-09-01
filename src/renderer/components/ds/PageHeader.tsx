/** Titolo di pagina con breadcrumb. Il breadcrumb è del kit (Bootstrap). */

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";

export type Crumb = { label: string; to?: string };

type Props = {
  title: string;
  description?: string;
  crumbs?: readonly Crumb[];
  actions?: ReactNode;
};

export const PageHeader = ({ title, description, crumbs, actions }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="mb-4">
      {crumbs && crumbs.length > 0 && (
        <nav aria-label={t("a11y.breadcrumb")}>
          <ol className="breadcrumb">
            {crumbs.map((c) => (
              <li
                key={c.label}
                className={`breadcrumb-item${c.to ? "" : " active"}`}
                {...(c.to ? {} : { "aria-current": "page" as const })}
              >
                {c.to ? <Link to={c.to}>{c.label}</Link> : c.label}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className="d-flex flex-wrap align-items-start gap-3">
        <div>
          <h1 className="h3 mb-1">{title}</h1>
          {description && (
            <p className="text-body-secondary mb-0">{description}</p>
          )}
        </div>
        {actions && <div className="ms-auto d-flex gap-2">{actions}</div>}
      </div>
    </div>
  );
};

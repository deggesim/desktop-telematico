/**
 * Callout — componente CSS-only del layer Sogei.
 * Markup atteso: `.callout.callout-<variant>` con un `.callout-title` dentro.
 * `.callout-simple` toglie il bordo laterale.
 */

import type { ReactNode } from "react";

export type CalloutVariant = "primary" | "success" | "danger";

type Props = {
  variant?: CalloutVariant;
  title: string;
  simple?: boolean;
  children: ReactNode;
};

export const Callout = ({
  variant = "primary",
  title,
  simple,
  children,
}: Props) => (
  <div
    className={`callout callout-${variant}${simple ? " callout-simple" : ""}`}
    role="note"
  >
    <div className="callout-title">{title}</div>
    {children}
  </div>
);

/**
 * Chip — CSS-only. `.chip` più `.chip-active` per lo stato selezionato.
 * Reso come <button> quando è cliccabile, altrimenti come <span>: il kit
 * non impone il tag, ma un chip interattivo deve essere raggiungibile da tastiera.
 */

import type { ReactNode } from "react";

type Props = {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

export const Chip = ({ active, onClick, children }: Props) => {
  const className = `chip btn btn-sm${active ? " chip-active" : ""}`;
  if (!onClick) return <span className={className}>{children}</span>;
  return (
    <button
      type="button"
      className={className}
      aria-pressed={active}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

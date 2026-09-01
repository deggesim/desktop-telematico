/**
 * Tabella adattiva — il kit fornisce solo il CSS. Due vincoli non ovvi:
 * 1. il contenitore porta `.table-adaptive-<bp>`, la tabella dentro ha `.table`;
 * 2. OGNI cella del corpo deve avere `data-th` con l'intestazione, perché sotto
 *    il breakpoint il CSS la stampa in `::before`. Dimenticarlo produce una
 *    tabella illeggibile su finestra stretta, non un difetto estetico.
 *
 * Ordinamento, filtro e paginazione NON sono nel kit: chi ne ha bisogno li
 * implementa sopra questo componente.
 */

import type { ReactNode } from "react";

export type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
};

type Props<T> = {
  columns: readonly Column<T>[];
  rows: readonly T[];
  rowKey: (row: T) => string;
  caption: string;
  /** Breakpoint sotto il quale la tabella collassa in schede */
  breakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  empty?: ReactNode;
};

export const AdaptiveTable = <T,>({
  columns,
  rows,
  rowKey,
  caption,
  breakpoint = "md",
  empty,
}: Props<T>) => (
  <div className={`table-adaptive-${breakpoint} table-responsive`}>
    <table className="table">
      <caption className="visually-hidden">{caption}</caption>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key} scope="col">
              {c.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 && empty ? (
          <tr>
            <td colSpan={columns.length}>{empty}</td>
          </tr>
        ) : (
          rows.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((c) => (
                <td key={c.key} data-th={c.header}>
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

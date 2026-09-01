/**
 * Rotte, derivate dal modello di navigazione.
 *
 * Nessuna rotta scritta a mano per le funzionalità: si generano da AREAS, così
 * aggiungere una schermata è una riga in shared/domain/navigation.ts. Quando
 * una schermata viene implementata davvero, si sostituisce il suo StubPage con
 * il componente reale nella mappa IMPLEMENTED.
 *
 * HashRouter e non BrowserRouter: in produzione il renderer è caricato da
 * file://, dove i path assoluti non risolvono.
 */

import type { ComponentType } from "react";
import { AREAS, ALL_FEATURES } from "@shared/domain/navigation";
import { AreaPage } from "./pages/AreaPage";
import { CatalogPage } from "./pages/CatalogPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SpecMatrixPage } from "./pages/SpecMatrixPage";
import { StubPage } from "./pages/StubPage";

/**
 * Schermate già implementate, per id di funzionalità.
 * Vuota per ora: tutto passa da StubPage, che dichiara stato e fonte.
 */
const IMPLEMENTED: Record<string, ComponentType> = {};

export type RouteDef = { path: string; element: React.ReactElement };

export const areaRoutes: RouteDef[] = AREAS.map((area) => ({
  path: area.path,
  element: <AreaPage area={area} />,
}));

export const featureRoutes: RouteDef[] = ALL_FEATURES.map((feature) => {
  const Implemented = IMPLEMENTED[feature.id];
  return {
    path: feature.path,
    element: Implemented ? <Implemented /> : <StubPage feature={feature} />,
  };
});

export const toolingRoutes: RouteDef[] = [
  { path: "/catalogo", element: <CatalogPage /> },
  { path: "/stato-specifiche", element: <SpecMatrixPage /> },
];

export const homeRoute: RouteDef = { path: "/", element: <HomePage /> };
export const notFoundRoute: RouteDef = { path: "*", element: <NotFoundPage /> };

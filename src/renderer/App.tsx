/**
 * Radice dell'applicazione.
 *
 * Tre stati, in quest'ordine: configurazione in caricamento, primo avvio da
 * completare, applicazione. Nessuna rotta è raggiungibile prima che profilo e
 * cartella di lavoro esistano — è il requisito, non una scelta di comodo.
 */

import { useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppShell } from "./components/layout/AppShell";
import { FirstRunDialog } from "./components/FirstRunDialog";
import { useConfigStore } from "./store/configStore";
import { useUiStore } from "./store/uiStore";
import {
  areaRoutes,
  featureRoutes,
  homeRoute,
  notFoundRoute,
  toolingRoutes,
} from "./routes";

const App = () => {
  const { t } = useTranslation();
  const load = useConfigStore((s) => s.load);
  const loaded = useConfigStore((s) => s.loaded);
  const config = useConfigStore((s) => s.config);
  const pushError = useUiStore((s) => s.pushError);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => window.electronAPI.onAppError(pushError), [pushError]);

  if (!loaded)
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <span className="spinner-border me-2" aria-hidden="true" />
        {t("common.loading")}
      </div>
    );

  const firstRunPending = !config?.firstRunCompleted || !config.profile;
  if (firstRunPending) return <FirstRunDialog />;

  const routes = [...areaRoutes, ...featureRoutes, ...toolingRoutes];

  return (
    <HashRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={homeRoute.element} />
          {routes.map((r) => (
            <Route key={r.path} path={r.path} element={r.element} />
          ))}
          <Route path={notFoundRoute.path} element={notFoundRoute.element} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;

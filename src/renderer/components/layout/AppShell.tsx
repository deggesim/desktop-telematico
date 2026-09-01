/**
 * Impaginazione comune: skip link, header, sidebar, contenuto, footer.
 * Ogni pagina renderizza dentro <Outlet />.
 */

import { Outlet } from "react-router-dom";
import { AppFooter } from "./AppFooter";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import { SkipLink } from "./SkipLink";
import { MockModeBanner } from "../MockModeBanner";
import { useProfile } from "../../store/configStore";

export const AppShell = () => {
  const profile = useProfile();

  return (
    <div className="app-shell">
      <SkipLink />
      <AppHeader />
      <MockModeBanner />
      <div className="app-body">
        {profile && <AppSidebar profile={profile} />}
        <main id="main-content" className="app-main" tabIndex={-1}>
          <div className="container-fluid py-4">
            <Outlet />
          </div>
        </main>
      </div>
      <AppFooter />
    </div>
  );
};

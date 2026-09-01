import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Design kit vendorizzato. È Bootstrap 5.3.8 ricompilato: non importare
// anche il CSS del pacchetto bootstrap, si sovrascriverebbero a vicenda.
import "@ds/css/agenzia-entrate.css";
import "@ds/css/bootstrap-icons.css";
import "./i18n";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

/**
 * Catalogo dei componenti del design system 5.2.2.
 *
 * Il kit non contiene un solo esempio HTML e non ha documentazione: il markup
 * atteso da ogni componente è ricostruito leggendo i selettori del CSS. Questa
 * pagina è quella ricostruzione, resa visibile.
 *
 * Ha due usi, entrambi concreti:
 * 1. è la libreria di riferimento su cui poggiano tutte le schermate, così che
 *    lo stesso componente non venga reinterpretato trenta volte;
 * 2. è la richiesta puntuale da mandare a Sogei — «è questo il markup che vi
 *    aspettate?» — molto più efficace di una domanda generica.
 */

import { useState } from "react";
import { Modal, Toast, ToastContainer } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { AdaptiveTable, type Column } from "../components/ds/AdaptiveTable";
import { Callout } from "../components/ds/Callout";
import { Chip } from "../components/ds/Chip";
import { PageHeader } from "../components/ds/PageHeader";
import { Stepper } from "../components/ds/Stepper";
import { Wizard } from "../components/ds/Wizard";

type DemoRow = { id: string; nome: string; tipo: string; esito: string };

const DEMO_ROWS: DemoRow[] = [
  {
    id: "1",
    nome: "fornitura-001.ccf",
    tipo: "Modello F24",
    esito: "Accettata",
  },
  {
    id: "2",
    nome: "fornitura-002.ccf",
    tipo: "Dichiarazione PF",
    esito: "Scarto",
  },
];

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mb-5">
    <h2 className="h5 border-bottom pb-2 mb-3">{title}</h2>
    {children}
  </section>
);

export const CatalogPage = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [chip, setChip] = useState("uno");

  const columns: Column<DemoRow>[] = [
    { key: "nome", header: "Nome file", render: (r) => r.nome },
    { key: "tipo", header: "Tipo documento", render: (r) => r.tipo },
    { key: "esito", header: "Esito", render: (r) => r.esito },
  ];

  return (
    <>
      <PageHeader
        title={t("catalog.title")}
        description={t("catalog.subtitle")}
        crumbs={[
          { label: t("header.home"), to: "/" },
          { label: t("catalog.title") },
        ]}
      />

      <Section title={t("catalog.sections.typography")}>
        <h1 className="h1">Titolo H1</h1>
        <h2 className="h2">Titolo H2</h2>
        <h3 className="h3">Titolo H3</h3>
        <p>
          Testo corrente in Titillium Web. <code>Roboto Mono</code> per il
          monospazio, Lora per i testi lunghi.
        </p>
        <div className="d-flex flex-wrap gap-2">
          {["primary", "secondary", "success", "danger", "warning", "info"].map(
            (v) => (
              <span key={v} className={`badge text-bg-${v}`}>
                {v}
              </span>
            ),
          )}
        </div>
      </Section>

      <Section title={t("catalog.sections.buttons")}>
        <div className="d-flex flex-wrap gap-2">
          <button type="button" className="btn btn-primary">
            Primario
          </button>
          <button type="button" className="btn btn-secondary">
            Secondario
          </button>
          <button type="button" className="btn btn-outline-primary">
            Outline
          </button>
          <button type="button" className="btn btn-link">
            Link
          </button>
          <button type="button" className="btn btn-primary" disabled>
            Disabilitato
          </button>
        </div>
      </Section>

      <Section title={t("catalog.sections.forms")}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label" htmlFor="demo-text">
              Campo di testo
            </label>
            <input
              id="demo-text"
              className="form-control"
              placeholder="Testo"
            />
            <div className="form-text">Testo di aiuto sotto al campo.</div>
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="demo-select">
              Menu a tendina
            </label>
            <select id="demo-select" className="form-select">
              <option>Prima voce</option>
              <option>Seconda voce</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="demo-invalid">
              Campo non valido
            </label>
            <input
              id="demo-invalid"
              className="form-control is-invalid"
              defaultValue="abc"
            />
            <div className="invalid-feedback">
              Il protocollo deve essere di 17 cifre.
            </div>
          </div>
          <div className="col-md-6">
            <fieldset className="tree-view">
              <legend className="form-label">
                Tree view (solo indentazione CSS)
              </legend>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="tv-1" />
                <label className="form-check-label" htmlFor="tv-1">
                  Cartella
                </label>
              </div>
            </fieldset>
          </div>
        </div>
      </Section>

      <Section title={t("catalog.sections.cards")}>
        <div className="row row-cols-1 row-cols-md-3 g-3">
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title h6">Card standard</h3>
                <p className="card-text">Variante di base.</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card card-simple h-100">
              <div className="card-body">
                <h3 className="card-title h6">Card simple</h3>
                <p className="card-text">Senza bordo marcato.</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card card-md-horizontal h-100">
              <div className="card-body">
                <h3 className="card-title h6">Card orizzontale</h3>
                <p className="card-text">Layout affiancato da md in su.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title={t("catalog.sections.callout")}>
        <div className="d-grid gap-3">
          <Callout variant="primary" title="Informazione">
            Callout primario.
          </Callout>
          <Callout variant="success" title="Operazione riuscita">
            Callout success.
          </Callout>
          <Callout variant="danger" title="Attenzione">
            Callout danger.
          </Callout>
          <Callout variant="primary" title="Semplice" simple>
            Variante callout-simple.
          </Callout>
        </div>
      </Section>

      <Section title={t("catalog.sections.chips")}>
        <div className="d-flex flex-wrap gap-2">
          {["uno", "due", "tre"].map((c) => (
            <Chip key={c} active={chip === c} onClick={() => setChip(c)}>
              {c}
            </Chip>
          ))}
        </div>
      </Section>

      <Section title={t("catalog.sections.stepper")}>
        <Stepper
          label="Esempio stepper"
          current={1}
          steps={[
            { id: "a", title: "Dati utente" },
            { id: "b", title: "Ambiente" },
            { id: "c", title: "Conferma" },
          ]}
        />
      </Section>

      <Section title={t("catalog.sections.wizard")}>
        <Wizard
          label="Esempio wizard"
          current={1}
          steps={[
            { id: "a", title: "Prepara", text: "Scelta cartella" },
            { id: "b", title: "Genera", text: "Creazione chiavi" },
            { id: "c", title: "Invia", text: "Richiesta certificazione" },
          ]}
        />
      </Section>

      <Section title={t("catalog.sections.table")}>
        <AdaptiveTable
          columns={columns}
          rows={DEMO_ROWS}
          rowKey={(r) => r.id}
          caption="Tabella di esempio"
        />
        <p className="form-text mt-2">
          Ogni cella del corpo porta <code>data-th</code>: senza, sotto il
          breakpoint la tabella perde le intestazioni.
        </p>
      </Section>

      <Section title={t("catalog.sections.feedback")}>
        <div className="d-flex flex-wrap gap-2 mb-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Apri modal
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowToast(true)}
          >
            Mostra toast
          </button>
        </div>
        <div className="alert alert-info mb-0" role="alert">
          Alert informativo di Bootstrap, ricompilato con i colori
          dell&apos;Agenzia.
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title as="h3" className="h5">
              Titolo del modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Il modal arriva da react-bootstrap: il bundle JS del kit non è
            caricato, così non c&apos;è doppia inizializzazione sugli attributi
            data-bs-*.
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowModal(false)}
            >
              {t("common.close")}
            </button>
          </Modal.Footer>
        </Modal>

        <ToastContainer position="bottom-end" className="p-3">
          <Toast
            show={showToast}
            onClose={() => setShowToast(false)}
            delay={4000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Notifica</strong>
            </Toast.Header>
            <Toast.Body>Operazione completata.</Toast.Body>
          </Toast>
        </ToastContainer>
      </Section>
    </>
  );
};

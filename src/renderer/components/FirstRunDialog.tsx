/**
 * Finestra di dialogo di primo avvio (requisito).
 *
 * Due impostazioni, entrambe obbligatorie: cartella di lavoro e tipo di
 * profilo. Non è chiudibile — senza queste due risposte l'applicazione non ha
 * né dove scrivere né quali funzionalità mostrare.
 *
 * La cartella si sceglie con un selettore nativo via IPC: è una delle cose che
 * un browser non può fare, ed è parte del motivo per cui questa applicazione
 * è Electron.
 */

import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { USER_PROFILES, type UserProfile } from "@shared/domain/profile";
import { useConfigStore } from "../store/configStore";

export const FirstRunDialog = () => {
  const { t } = useTranslation();
  const completeFirstRun = useConfigStore((s) => s.completeFirstRun);
  const savedWorkspacePath = useConfigStore((s) => s.config?.workspacePath ?? "");

  const [workspacePath, setWorkspacePath] = useState(savedWorkspacePath);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onBrowse = async () => {
    const picked = await window.electronAPI.dialogSelectDirectory(
      t("firstRun.workspaceLabel"),
    );
    if (!picked) return;
    const status = await window.electronAPI.workspaceStat(picked);
    if (status.exists && !status.writable) {
      setError(t("firstRun.errorWorkspaceNotWritable"));
      return;
    }
    setError(null);
    setWorkspacePath(picked);
  };

  const onConfirm = async () => {
    if (!workspacePath) return setError(t("firstRun.errorWorkspaceRequired"));
    if (!profile) return setError(t("firstRun.errorProfileRequired"));
    setBusy(true);
    try {
      await completeFirstRun(workspacePath, profile);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal show backdrop="static" keyboard={false} centered size="lg">
      <Modal.Header>
        <Modal.Title as="h1" className="h4">
          {t("firstRun.title")}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-body-secondary">{t("firstRun.intro")}</p>

        <fieldset className="mb-4">
          <label className="form-label" htmlFor="workspace-path">
            {t("firstRun.workspaceLabel")} <span aria-hidden="true">*</span>
          </label>
          <div className="input-group">
            <input
              id="workspace-path"
              type="text"
              className="form-control"
              value={workspacePath}
              placeholder={t("firstRun.workspacePlaceholder")}
              readOnly
              aria-describedby="workspace-help"
            />
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => void onBrowse()}
            >
              <i className="bi bi-folder2-open me-1" aria-hidden="true" />
              {t("firstRun.browse")}
            </button>
          </div>
          <div id="workspace-help" className="form-text">
            {t("firstRun.workspaceHelp")}
          </div>
        </fieldset>

        <fieldset>
          <legend className="form-label">
            {t("firstRun.profileLabel")} <span aria-hidden="true">*</span>
          </legend>
          <div className="form-text mb-2">{t("firstRun.profileHelp")}</div>
          {USER_PROFILES.map((p) => (
            <div className="form-check form-check-card mb-2" key={p}>
              <input
                className="form-check-input"
                type="radio"
                name="profile"
                id={`profile-${p}`}
                checked={profile === p}
                onChange={() => setProfile(p)}
              />
              <label className="form-check-label" htmlFor={`profile-${p}`}>
                <strong>{t(`profile.${p}`)}</strong>
                <span className="d-block small text-body-secondary">
                  {p === "entratel"
                    ? t("firstRun.profileEntratelHelp")
                    : t("firstRun.profileFisconlineHelp")}
                </span>
              </label>
            </div>
          ))}
        </fieldset>

        {error && (
          <div className="alert alert-danger mt-3 mb-0" role="alert">
            {error}
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => void onConfirm()}
          disabled={busy}
        >
          {t("firstRun.confirm")}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

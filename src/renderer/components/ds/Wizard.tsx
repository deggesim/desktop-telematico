/**
 * Wizard — CSS-only.
 *
 * Markup dedotto dai selettori: `.wizard` imposta `--bs-gutter-x: 0` e
 * `list-style:none`, cioè è una **row di Bootstrap resa come lista**: `<ul>`
 * con `.wizard.row` e figli `<li class="wizard-step col">`. La barra di
 * avanzamento è una `.progress > .progress-bar` dentro ogni passo, e il
 * pallino `.wizard-dot` è posizionato in assoluto rispetto al passo.
 * La variante verticale non usa row/col.
 *
 * Le classi di stato — `wizard-step-done`, `-doing`, `-todo` — le applica
 * l'applicazione: il kit non contiene un solo file JS scritto da Sogei.
 */

export type WizardStep = { id: string; title: string; text?: string };

type Props = {
  steps: readonly WizardStep[];
  current: number;
  label: string;
  vertical?: boolean;
};

const stepStateClass = (index: number, current: number): string => {
  if (index < current) return "wizard-step-done";
  if (index === current) return "wizard-step-doing";
  return "wizard-step-todo";
};

export const Wizard = ({ steps, current, label, vertical }: Props) => (
  <nav aria-label={label}>
    <ul className={vertical ? "wizard-vertical" : "wizard row"}>
      {steps.map((step, i) => (
        <li
          key={step.id}
          className={`wizard-step ${vertical ? "" : "col"} ${stepStateClass(i, current)}`}
          {...(i === current ? { "aria-current": "step" as const } : {})}
        >
          <div className="progress">
            <div className="progress-bar" />
          </div>
          <span className="wizard-dot">
            <span className="wizard-icon" aria-hidden="true" />
          </span>
          <span className="wizard-title">{step.title}</span>
          {step.text && <span className="wizard-text">{step.text}</span>}
        </li>
      ))}
    </ul>
  </nav>
);

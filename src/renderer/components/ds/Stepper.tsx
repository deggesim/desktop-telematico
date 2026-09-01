/**
 * Stepper — CSS-only nel kit: le classi di stato le applica l'applicazione.
 *
 * Markup dedotto dai selettori: `.stepper` è `display:flex` con
 * `list-style:none`, quindi è una **lista** (`<ol>`), non un `<div>`; i figli
 * sono `<li class="step">`. Lo step corrente si marca con
 * `aria-current="step"`, perché il CSS usa `.step:not([aria-current])` per
 * attenuare gli altri: senza quell'attributo tutti gli step sembrano attivi.
 */

export type Step = { id: string; title: string };

type Props = {
  steps: readonly Step[];
  /** Indice dello step corrente, 0-based */
  current: number;
  label: string;
};

export const Stepper = ({ steps, current, label }: Props) => (
  <nav aria-label={label}>
    <ol className="stepper stepper-expand-md">
      {steps.map((step, i) => (
        <li
          key={step.id}
          className="step"
          {...(i === current ? { "aria-current": "step" as const } : {})}
        >
          <span className="stepper-index">{i + 1}</span>
          <span className="step-title">{step.title}</span>
        </li>
      ))}
    </ol>
  </nav>
);

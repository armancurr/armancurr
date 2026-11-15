import type { JSX } from "solid-js";

import { PatternField } from "./pattern-field";

/** Small seed-of-life seal used as the plate's crest. */
export function Seal(props: { class?: string }) {
  const petals = Array.from({ length: 6 }, (_, i) => {
    const t = -Math.PI / 2 + (Math.PI * i) / 3;
    return [12 + 5 * Math.cos(t), 12 + 5 * Math.sin(t)];
  });
  return (
    <svg
      aria-hidden="true"
      class={props.class}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="0.6"
    >
      <circle cx="12" cy="12" r="10.6" />
      <circle cx="12" cy="12" r="5" />
      {petals.map(([x, y]) => (
        <circle cx={x} cy={y} r="5" />
      ))}
    </svg>
  );
}

export function Divider() {
  return (
    <div aria-hidden="true" class="divider">
      <span />
      <svg viewBox="0 0 30 12" fill="none" stroke="currentColor" stroke-width="0.7">
        <circle cx="9" cy="6" r="5" />
        <circle cx="15" cy="6" r="5" />
        <circle cx="21" cy="6" r="5" />
      </svg>
      <span />
    </div>
  );
}

/** The page: a black plate framed by the geometric field. */
export function Plate(props: { children: JSX.Element; caption?: string }) {
  return (
    <div class="page">
      <PatternField />
      <div class="grain" aria-hidden="true" />
      <main class="plate">
        <span class="corner tl" aria-hidden="true" />
        <span class="corner tr" aria-hidden="true" />
        <span class="corner bl" aria-hidden="true" />
        <span class="corner br" aria-hidden="true" />
        <div class="plate-inner">
          <Seal class="seal" />
          {props.children}
          {props.caption && <p class="caption">{props.caption}</p>}
        </div>
      </main>
    </div>
  );
}

import { createSignal, For, onCleanup, onMount } from "solid-js";

import { FIGURES, type Figure, R } from "../lib/geometry";

type Placed = {
  key: string;
  x: number;
  y: number;
  scale: number;
  rotate: number;
  opacity: number;
  delay: number;
  spin: "" | "spin-cw" | "spin-ccw";
  figure: Figure;
};

/* Every figure is built once; placements only reference them. */
const library = FIGURES.map((make) => make());

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function layout(width: number, height: number): Placed[] {
  const rand = mulberry32(1618);
  const cell = Math.min(240, Math.max(150, width / 7));
  const rowStep = cell * 0.88;
  const cols = Math.ceil(width / cell) + 2;
  const rows = Math.ceil(height / rowStep) + 2;
  const cx = width / 2;
  const cy = height / 2;
  const reach = Math.hypot(cx, cy);
  const placed: Placed[] = [];
  let bag: number[] = [];
  let previous = -1;

  const nextFigure = () => {
    if (bag.length === 0) {
      bag = library.map((_, i) => i).sort(() => rand() - 0.5);
      if (bag[bag.length - 1] === previous) bag.unshift(bag.pop() as number);
    }
    previous = bag.pop() as number;
    return previous;
  };

  for (let row = -1; row < rows; row++) {
    for (let col = -1; col < cols; col++) {
      const skip = rand() < 0.08;
      const index = nextFigure();
      const x = (col + (row % 2 ? 0.5 : 0)) * cell + (rand() - 0.5) * cell * 0.24;
      const y = row * rowStep + (rand() - 0.5) * cell * 0.24;
      const large = rand() < 0.14;
      const radius = cell * (large ? 0.85 + rand() * 0.3 : 0.4 + rand() * 0.18);
      const spinRoll = rand();
      if (skip) continue;

      placed.push({
        key: `${row}:${col}`,
        x,
        y,
        scale: radius / R,
        rotate: Math.round(rand() * 24) * 15,
        opacity: large ? 0.22 + rand() * 0.12 : 0.34 + rand() * 0.3,
        delay: 0.1 + (Math.hypot(x - cx, y - cy) / reach) * 1.8 + rand() * 0.3,
        spin: spinRoll < 0.06 ? "spin-cw" : spinRoll < 0.12 ? "spin-ccw" : "",
        figure: library[index],
      });
    }
  }

  return placed;
}

/** Faint compass construction tying the whole field to the page centre. */
function construction(width: number, height: number) {
  const cx = width / 2;
  const cy = height / 2;
  const reach = Math.hypot(cx, cy);
  const step = Math.min(240, Math.max(150, width / 7));
  const parts: string[] = [];
  for (let r = step; r < reach + step; r += step) {
    parts.push(`M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`);
  }
  for (let i = 0; i < 24; i++) {
    const t = (Math.PI * 2 * i) / 24;
    parts.push(`M${cx} ${cy}L${cx + reach * Math.cos(t)} ${cy + reach * Math.sin(t)}`);
  }
  return parts.join("");
}

export function PatternField() {
  const [size, setSize] = createSignal({ width: 0, height: 0 });
  const [drawing, setDrawing] = createSignal(true);

  let field!: HTMLDivElement;

  onMount(() => {
    // The field is sized in lvh, so mobile toolbars sliding in and out don't relayout it.
    const observer = new ResizeObserver(() => {
      const next = { width: field.clientWidth, height: field.clientHeight };
      const current = size();
      if (next.width !== current.width || next.height !== current.height) setSize(next);
    });
    observer.observe(field);
    const settle = window.setTimeout(() => setDrawing(false), 6500);

    onCleanup(() => {
      observer.disconnect();
      window.clearTimeout(settle);
    });
  });

  const figures = () => {
    const { width, height } = size();
    return width ? layout(width, height) : [];
  };

  return (
    <div ref={field} aria-hidden="true" class="pattern-field" classList={{ drawing: drawing() }}>
      <svg
        width={size().width}
        height={size().height}
        viewBox={`0 0 ${size().width} ${size().height}`}
        fill="none"
      >
        <path class="construction" d={construction(size().width, size().height)} />
        <For each={figures()}>
          {(item) => (
            <g
              transform={`translate(${item.x.toFixed(1)} ${item.y.toFixed(1)}) rotate(${item.rotate}) scale(${item.scale.toFixed(4)})`}
              opacity={item.opacity.toFixed(2)}
              style={{ "--delay": `${item.delay.toFixed(2)}s` }}
              stroke-width={(0.85 / item.scale).toFixed(3)}
            >
              <g class={item.spin}>
                {item.figure.faint && (
                  <path class="figure faint" d={item.figure.faint} pathLength="1" />
                )}
                <path class="figure" d={item.figure.main} pathLength="1" />
              </g>
            </g>
          )}
        </For>
      </svg>
    </div>
  );
}

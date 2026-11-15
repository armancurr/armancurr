/*
 * Compass-and-straightedge figures, each drawn in a local space centred on the
 * origin with an outer radius of R. Every figure returns SVG path data: `main`
 * is the figure itself, `faint` its construction lines (drawn lighter).
 */

export const R = 100;

export type Figure = { main: string; faint?: string };

type Point = [number, number];

const TAU = Math.PI * 2;
const PHI = (1 + Math.sqrt(5)) / 2;

const n = (v: number) => (Math.abs(v) < 1e-9 ? "0" : v.toFixed(2));

function circle(cx: number, cy: number, r: number) {
  return `M${n(cx - r)} ${n(cy)}a${n(r)} ${n(r)} 0 1 0 ${n(2 * r)} 0a${n(r)} ${n(r)} 0 1 0 ${n(-2 * r)} 0`;
}

function line([x1, y1]: Point, [x2, y2]: Point) {
  return `M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}`;
}

function polyline(points: Point[], closed = false) {
  const [first, ...rest] = points;
  return `M${n(first[0])} ${n(first[1])}${rest.map(([x, y]) => `L${n(x)} ${n(y)}`).join("")}${closed ? "Z" : ""}`;
}

/** Points along a circular arc; angles in radians, y pointing down. */
function arcPoints(cx: number, cy: number, r: number, from: number, to: number): Point[] {
  const steps = Math.max(6, Math.ceil((Math.abs(to - from) * r) / 6));
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = from + ((to - from) * i) / steps;
    return [cx + r * Math.cos(t), cy + r * Math.sin(t)] as Point;
  });
}

function polar(r: number, angle: number): Point {
  return [r * Math.cos(angle), r * Math.sin(angle)];
}

/** n points evenly around a circle, the first at the top. */
function ring(count: number, r: number, offset = 0): Point[] {
  return Array.from({ length: count }, (_, i) =>
    polar(r, -Math.PI / 2 + offset + (TAU * i) / count),
  );
}

function hexLattice(step: number, maxDist: number): Point[] {
  const points: Point[] = [];
  const span = Math.ceil(maxDist / step) + 1;
  for (let q = -span; q <= span; q++) {
    for (let r = -span; r <= span; r++) {
      const x = step * (q + r / 2);
      const y = step * ((Math.sqrt(3) / 2) * r);
      if (Math.hypot(x, y) <= maxDist + 1e-6) points.push([x, y]);
    }
  }
  return points;
}

export function seedOfLife(): Figure {
  const a = R / 2;
  const centres = [[0, 0] as Point, ...ring(6, a)];
  return {
    main: centres.map(([x, y]) => circle(x, y, a)).join("") + circle(0, 0, R),
  };
}

export function flowerOfLife(): Figure {
  const a = R / 3;
  return {
    main: hexLattice(a, 2 * a)
      .map(([x, y]) => circle(x, y, a))
      .join(""),
    faint: circle(0, 0, R) + circle(0, 0, R * 1.04),
  };
}

export function metatronsCube(): Figure {
  const r = R / 5;
  const centres: Point[] = [[0, 0], ...ring(6, 2 * r), ...ring(6, 4 * r)];
  const lines: string[] = [];
  for (let i = 0; i < centres.length; i++) {
    for (let j = i + 1; j < centres.length; j++) lines.push(line(centres[i], centres[j]));
  }
  return {
    main: centres.map(([x, y]) => circle(x, y, r)).join(""),
    faint: lines.join(""),
  };
}

export function starPolygon(points: number, skip: number): () => Figure {
  return () => {
    const tips = ring(points, R);
    const edges = tips.map((p, i) => line(p, tips[(i + skip) % points]));
    return {
      main: edges.join(""),
      faint: circle(0, 0, R) + circle(0, 0, R * Math.cos((Math.PI * skip) / points)),
    };
  };
}

/** Hexagram with petal arcs: each arc is the circle around one tip, through the centre. */
export function curvedHexad(): Figure {
  const tips = ring(6, R);
  const petals = tips.map(([x, y], i) => {
    const theta = -Math.PI / 2 + (TAU * i) / 6;
    return polyline(arcPoints(x, y, R, theta + (2 * Math.PI) / 3, theta + (4 * Math.PI) / 3));
  });
  const star = [0, 2, 4, 1, 3, 5].map((i) => tips[i]);
  return {
    main:
      polyline(star.slice(0, 3), true) +
      polyline(star.slice(3), true) +
      petals.join("") +
      circle(0, 0, R),
    faint: tips.map((p, i) => line(p, tips[(i + 3) % 6])).join("") + polyline(tips, true),
  };
}

/** A faceted star tetrahedron seen from above. */
export function merkaba(): Figure {
  const tips = ring(6, R);
  const inner = ring(6, R / Math.sqrt(3), Math.PI / 6);
  const up = [tips[0], tips[2], tips[4]];
  const down = [tips[1], tips[3], tips[5]];
  return {
    main: polyline(up, true) + polyline(down, true),
    faint:
      tips.map((p) => line([0, 0], p)).join("") +
      inner.map((p) => line([0, 0], p)).join("") +
      polyline(inner, true),
  };
}

export function goldenSpiral(): Figure {
  const h = R * 1.04;
  let rect = { x: (-h * PHI) / 2, y: -h / 2, w: h * PHI, h };
  const squares: string[] = [];
  const spiral: Point[] = [];

  for (let i = 0; i < 11; i++) {
    const { x, y, w, h: rh } = rect;
    const side = i % 4;
    const s = side % 2 === 0 ? rh : w;
    let sq: { x: number; y: number };
    let centre: Point;
    let from: number;

    if (side === 0) {
      sq = { x, y };
      centre = [x + s, y + s];
      from = Math.PI;
      rect = { x: x + s, y, w: w - s, h: rh };
    } else if (side === 1) {
      sq = { x, y };
      centre = [x, y + s];
      from = (3 * Math.PI) / 2;
      rect = { x, y: y + s, w, h: rh - s };
    } else if (side === 2) {
      sq = { x: x + w - s, y };
      centre = [x + w - s, y];
      from = 0;
      rect = { x, y, w: w - s, h: rh };
    } else {
      sq = { x, y: y + rh - s };
      centre = [x + s, y + rh - s];
      from = Math.PI / 2;
      rect = { x, y, w, h: rh - s };
    }

    squares.push(
      polyline(
        [
          [sq.x, sq.y],
          [sq.x + s, sq.y],
          [sq.x + s, sq.y + s],
          [sq.x, sq.y + s],
        ],
        true,
      ),
    );
    const arc = arcPoints(centre[0], centre[1], s, from, from + Math.PI / 2);
    spiral.push(...(spiral.length ? arc.slice(1) : arc));
  }

  const hw = (h * PHI) / 2;
  const hh = h / 2;
  return {
    main: polyline(spiral) + circle(0, 0, R),
    faint:
      squares.join("") +
      line([-hw, -hh], [hw, hh]) +
      line([-hw, hh], [hw, -hh]) +
      line([-R, 0], [R, 0]) +
      line([0, -R], [0, R]),
  };
}

/** Two sets of concentric rings whose centres sit on each other's circles. */
export function twinRings(): Figure {
  const offset = R * 0.3;
  const radii = Array.from({ length: 7 }, (_, i) => (R - offset) * ((i + 1) / 7));
  return {
    main: radii.map((r) => circle(-offset, 0, r) + circle(offset, 0, r)).join(""),
    faint: line([-R, 0], [R, 0]),
  };
}

export function sierpinski(): Figure {
  const triangles: string[] = [];
  const walk = (a: Point, b: Point, c: Point, depth: number) => {
    triangles.push(polyline([a, b, c], true));
    if (depth === 0) return;
    const ab: Point = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const bc: Point = [(b[0] + c[0]) / 2, (b[1] + c[1]) / 2];
    const ca: Point = [(c[0] + a[0]) / 2, (c[1] + a[1]) / 2];
    walk(a, ab, ca, depth - 1);
    walk(ab, b, bc, depth - 1);
    walk(ca, bc, c, depth - 1);
  };
  const [a, b, c] = ring(3, R * 0.94);
  walk(a, b, c, 4);
  return {
    main: triangles.join(""),
    faint: circle(0, 0, R * 0.94) + circle(0, 0, R * 0.47) + circle(0, 0, R),
  };
}

/** Circles of radius R/2 whose centres walk a ring of radius R/2. */
export function lotus(count: number): () => Figure {
  return () => ({
    main: ring(count, R / 2)
      .map(([x, y]) => circle(x, y, R / 2))
      .join(""),
  });
}

/** Nested S-curves inside a circle. */
export function waves(): Figure {
  const curves: string[] = [];
  for (let i = 1; i < 7; i++) {
    const a = (R * i) / 7;
    const b = R - a;
    const top = arcPoints(0, -R + a, a, -Math.PI / 2, Math.PI / 2);
    const bottom = arcPoints(0, a, b, -Math.PI / 2, -(3 * Math.PI) / 2);
    curves.push(polyline([...top, ...bottom.slice(1)]));
  }
  return { main: curves.join("") + circle(0, 0, R) };
}

/** An armillary sphere: tilted great circles around a small core. */
export function armillary(): Figure {
  const ellipses = [0, 60, 120].map((deg) => {
    const t = (deg * Math.PI) / 180;
    const pts = Array.from({ length: 73 }, (_, i) => {
      const u = (TAU * i) / 72;
      const x = R * Math.cos(u);
      const y = R * 0.32 * Math.sin(u);
      return [x * Math.cos(t) - y * Math.sin(t), x * Math.sin(t) + y * Math.cos(t)] as Point;
    });
    return polyline(pts, true);
  });
  return {
    main: ellipses.join("") + circle(0, 0, R) + circle(0, 0, R * 0.08),
    faint: circle(0, 0, R * 0.5),
  };
}

export const FIGURES: Array<() => Figure> = [
  flowerOfLife,
  starPolygon(12, 5),
  metatronsCube,
  goldenSpiral,
  lotus(24),
  merkaba,
  twinRings,
  starPolygon(9, 4),
  curvedHexad,
  waves,
  sierpinski,
  seedOfLife,
  armillary,
  starPolygon(7, 3),
  lotus(12),
  starPolygon(8, 3),
];

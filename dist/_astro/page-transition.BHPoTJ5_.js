import { a as S } from "./index.9MVAkNgL.js";
var Qt = { exports: {} },
  gt = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var gn;
function lr() {
  if (gn) return gt;
  gn = 1;
  var t = Symbol.for("react.transitional.element"),
    e = Symbol.for("react.fragment");
  function n(s, i, o) {
    var r = null;
    if (
      (o !== void 0 && (r = "" + o),
      i.key !== void 0 && (r = "" + i.key),
      "key" in i)
    ) {
      o = {};
      for (var a in i) a !== "key" && (o[a] = i[a]);
    } else o = i;
    return (
      (i = o.ref),
      { $$typeof: t, type: s, key: r, ref: i !== void 0 ? i : null, props: o }
    );
  }
  return ((gt.Fragment = e), (gt.jsx = n), (gt.jsxs = n), gt);
}
var yn;
function ur() {
  return (yn || ((yn = 1), (Qt.exports = lr())), Qt.exports);
}
var bt = ur();
const Rs = S.createContext({});
function cr(t) {
  const e = S.useRef(null);
  return (e.current === null && (e.current = t()), e.current);
}
const Be = typeof window < "u",
  hr = Be ? S.useLayoutEffect : S.useEffect,
  Ie = S.createContext(null);
function je(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function Oe(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
const z = (t, e, n) => (n > e ? e : n < t ? t : n);
let Ne = () => {};
const X = {},
  Ls = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function ks(t) {
  return typeof t == "object" && t !== null;
}
const Fs = (t) => /^0[^.\s]+$/u.test(t);
function Ue(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const W = (t) => t,
  fr = (t, e) => (n) => e(t(n)),
  Lt = (...t) => t.reduce(fr),
  wt = (t, e, n) => {
    const s = e - t;
    return s === 0 ? 1 : (n - t) / s;
  };
class We {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return (je(this.subscriptions, e), () => Oe(this.subscriptions, e));
  }
  notify(e, n, s) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1) this.subscriptions[0](e, n, s);
      else
        for (let o = 0; o < i; o++) {
          const r = this.subscriptions[o];
          r && r(e, n, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const $ = (t) => t * 1e3,
  G = (t) => t / 1e3;
function Bs(t, e) {
  return e ? t * (1e3 / e) : 0;
}
const Is = (t, e, n) =>
    (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t,
  dr = 1e-7,
  mr = 12;
function pr(t, e, n, s, i) {
  let o,
    r,
    a = 0;
  do ((r = e + (n - e) / 2), (o = Is(r, s, i) - t), o > 0 ? (n = r) : (e = r));
  while (Math.abs(o) > dr && ++a < mr);
  return r;
}
function kt(t, e, n, s) {
  if (t === e && n === s) return W;
  const i = (o) => pr(o, 0, 1, t, n);
  return (o) => (o === 0 || o === 1 ? o : Is(i(o), e, s));
}
const js = (t) => (e) => (e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2),
  Os = (t) => (e) => 1 - t(1 - e),
  Ns = kt(0.33, 1.53, 0.69, 0.99),
  Ke = Os(Ns),
  Us = js(Ke),
  Ws = (t) =>
    (t *= 2) < 1 ? 0.5 * Ke(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))),
  $e = (t) => 1 - Math.sin(Math.acos(t)),
  Ks = Os($e),
  $s = js($e),
  gr = kt(0.42, 0, 1, 1),
  yr = kt(0, 0, 0.58, 1),
  Gs = kt(0.42, 0, 0.58, 1),
  vr = (t) => Array.isArray(t) && typeof t[0] != "number",
  _s = (t) => Array.isArray(t) && typeof t[0] == "number",
  Tr = {
    linear: W,
    easeIn: gr,
    easeInOut: Gs,
    easeOut: yr,
    circIn: $e,
    circInOut: $s,
    circOut: Ks,
    backIn: Ke,
    backInOut: Us,
    backOut: Ns,
    anticipate: Ws,
  },
  xr = (t) => typeof t == "string",
  vn = (t) => {
    if (_s(t)) {
      Ne(t.length === 4);
      const [e, n, s, i] = t;
      return kt(e, n, s, i);
    } else if (xr(t)) return Tr[t];
    return t;
  },
  It = [
    "setup",
    "read",
    "resolveKeyframes",
    "preUpdate",
    "update",
    "preRender",
    "render",
    "postRender",
  ];
function Pr(t, e) {
  let n = new Set(),
    s = new Set(),
    i = !1,
    o = !1;
  const r = new WeakSet();
  let a = { delta: 0, timestamp: 0, isProcessing: !1 };
  function l(u) {
    (r.has(u) && (c.schedule(u), t()), u(a));
  }
  const c = {
    schedule: (u, h = !1, f = !1) => {
      const m = f && i ? n : s;
      return (h && r.add(u), m.has(u) || m.add(u), u);
    },
    cancel: (u) => {
      (s.delete(u), r.delete(u));
    },
    process: (u) => {
      if (((a = u), i)) {
        o = !0;
        return;
      }
      ((i = !0),
        ([n, s] = [s, n]),
        n.forEach(l),
        n.clear(),
        (i = !1),
        o && ((o = !1), c.process(u)));
    },
  };
  return c;
}
const Sr = 40;
function Hs(t, e) {
  let n = !1,
    s = !0;
  const i = { delta: 0, timestamp: 0, isProcessing: !1 },
    o = () => (n = !0),
    r = It.reduce((g, b) => ((g[b] = Pr(o)), g), {}),
    {
      setup: a,
      read: l,
      resolveKeyframes: c,
      preUpdate: u,
      update: h,
      preRender: f,
      render: d,
      postRender: m,
    } = r,
    v = () => {
      const g = X.useManualTiming ? i.timestamp : performance.now();
      ((n = !1),
        X.useManualTiming ||
          (i.delta = s ? 1e3 / 60 : Math.max(Math.min(g - i.timestamp, Sr), 1)),
        (i.timestamp = g),
        (i.isProcessing = !0),
        a.process(i),
        l.process(i),
        c.process(i),
        u.process(i),
        h.process(i),
        f.process(i),
        d.process(i),
        m.process(i),
        (i.isProcessing = !1),
        n && e && ((s = !1), t(v)));
    },
    y = () => {
      ((n = !0), (s = !0), i.isProcessing || t(v));
    };
  return {
    schedule: It.reduce((g, b) => {
      const P = r[b];
      return (
        (g[b] = (w, R = !1, A = !1) => (n || y(), P.schedule(w, R, A))),
        g
      );
    }, {}),
    cancel: (g) => {
      for (let b = 0; b < It.length; b++) r[It[b]].cancel(g);
    },
    state: i,
    steps: r,
  };
}
const {
  schedule: V,
  cancel: q,
  state: L,
  steps: te,
} = Hs(typeof requestAnimationFrame < "u" ? requestAnimationFrame : W, !0);
let Nt;
function Ar() {
  Nt = void 0;
}
const j = {
    now: () => (
      Nt === void 0 &&
        j.set(
          L.isProcessing || X.useManualTiming ? L.timestamp : performance.now(),
        ),
      Nt
    ),
    set: (t) => {
      ((Nt = t), queueMicrotask(Ar));
    },
  },
  zs = (t) => (e) => typeof e == "string" && e.startsWith(t),
  Ge = zs("--"),
  br = zs("var(--"),
  _e = (t) => (br(t) ? wr.test(t.split("/*")[0].trim()) : !1),
  wr =
    /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  dt = {
    test: (t) => typeof t == "number",
    parse: parseFloat,
    transform: (t) => t,
  },
  Vt = { ...dt, transform: (t) => z(0, 1, t) },
  jt = { ...dt, default: 1 },
  Tt = (t) => Math.round(t * 1e5) / 1e5,
  He = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Vr(t) {
  return t == null;
}
const Mr =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  ze = (t, e) => (n) =>
    !!(
      (typeof n == "string" && Mr.test(n) && n.startsWith(t)) ||
      (e && !Vr(n) && Object.prototype.hasOwnProperty.call(n, e))
    ),
  Xs = (t, e, n) => (s) => {
    if (typeof s != "string") return s;
    const [i, o, r, a] = s.match(He);
    return {
      [t]: parseFloat(i),
      [e]: parseFloat(o),
      [n]: parseFloat(r),
      alpha: a !== void 0 ? parseFloat(a) : 1,
    };
  },
  Cr = (t) => z(0, 255, t),
  ee = { ...dt, transform: (t) => Math.round(Cr(t)) },
  et = {
    test: ze("rgb", "red"),
    parse: Xs("red", "green", "blue"),
    transform: ({ red: t, green: e, blue: n, alpha: s = 1 }) =>
      "rgba(" +
      ee.transform(t) +
      ", " +
      ee.transform(e) +
      ", " +
      ee.transform(n) +
      ", " +
      Tt(Vt.transform(s)) +
      ")",
  };
function Dr(t) {
  let e = "",
    n = "",
    s = "",
    i = "";
  return (
    t.length > 5
      ? ((e = t.substring(1, 3)),
        (n = t.substring(3, 5)),
        (s = t.substring(5, 7)),
        (i = t.substring(7, 9)))
      : ((e = t.substring(1, 2)),
        (n = t.substring(2, 3)),
        (s = t.substring(3, 4)),
        (i = t.substring(4, 5)),
        (e += e),
        (n += n),
        (s += s),
        (i += i)),
    {
      red: parseInt(e, 16),
      green: parseInt(n, 16),
      blue: parseInt(s, 16),
      alpha: i ? parseInt(i, 16) / 255 : 1,
    }
  );
}
const me = { test: ze("#"), parse: Dr, transform: et.transform },
  Ft = (t) => ({
    test: (e) =>
      typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
    parse: parseFloat,
    transform: (e) => `${e}${t}`,
  }),
  Y = Ft("deg"),
  _ = Ft("%"),
  x = Ft("px"),
  Er = Ft("vh"),
  Rr = Ft("vw"),
  Tn = {
    ..._,
    parse: (t) => _.parse(t) / 100,
    transform: (t) => _.transform(t * 100),
  },
  ot = {
    test: ze("hsl", "hue"),
    parse: Xs("hue", "saturation", "lightness"),
    transform: ({ hue: t, saturation: e, lightness: n, alpha: s = 1 }) =>
      "hsla(" +
      Math.round(t) +
      ", " +
      _.transform(Tt(e)) +
      ", " +
      _.transform(Tt(n)) +
      ", " +
      Tt(Vt.transform(s)) +
      ")",
  },
  E = {
    test: (t) => et.test(t) || me.test(t) || ot.test(t),
    parse: (t) =>
      et.test(t) ? et.parse(t) : ot.test(t) ? ot.parse(t) : me.parse(t),
    transform: (t) =>
      typeof t == "string"
        ? t
        : t.hasOwnProperty("red")
          ? et.transform(t)
          : ot.transform(t),
    getAnimatableNone: (t) => {
      const e = E.parse(t);
      return ((e.alpha = 0), E.transform(e));
    },
  },
  Lr =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function kr(t) {
  return (
    isNaN(t) &&
    typeof t == "string" &&
    (t.match(He)?.length || 0) + (t.match(Lr)?.length || 0) > 0
  );
}
const Ys = "number",
  qs = "color",
  Fr = "var",
  Br = "var(",
  xn = "${}",
  Ir =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Mt(t) {
  const e = t.toString(),
    n = [],
    s = { color: [], number: [], var: [] },
    i = [];
  let o = 0;
  const a = e
    .replace(
      Ir,
      (l) => (
        E.test(l)
          ? (s.color.push(o), i.push(qs), n.push(E.parse(l)))
          : l.startsWith(Br)
            ? (s.var.push(o), i.push(Fr), n.push(l))
            : (s.number.push(o), i.push(Ys), n.push(parseFloat(l))),
        ++o,
        xn
      ),
    )
    .split(xn);
  return { values: n, split: a, indexes: s, types: i };
}
function Zs(t) {
  return Mt(t).values;
}
function Js(t) {
  const { split: e, types: n } = Mt(t),
    s = e.length;
  return (i) => {
    let o = "";
    for (let r = 0; r < s; r++)
      if (((o += e[r]), i[r] !== void 0)) {
        const a = n[r];
        a === Ys
          ? (o += Tt(i[r]))
          : a === qs
            ? (o += E.transform(i[r]))
            : (o += i[r]);
      }
    return o;
  };
}
const jr = (t) =>
  typeof t == "number" ? 0 : E.test(t) ? E.getAnimatableNone(t) : t;
function Or(t) {
  const e = Zs(t);
  return Js(t)(e.map(jr));
}
const Z = { test: kr, parse: Zs, createTransformer: Js, getAnimatableNone: Or };
function ne(t, e, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6
      ? t + (e - t) * 6 * n
      : n < 1 / 2
        ? e
        : n < 2 / 3
          ? t + (e - t) * (2 / 3 - n) * 6
          : t
  );
}
function Nr({ hue: t, saturation: e, lightness: n, alpha: s }) {
  ((t /= 360), (e /= 100), (n /= 100));
  let i = 0,
    o = 0,
    r = 0;
  if (!e) i = o = r = n;
  else {
    const a = n < 0.5 ? n * (1 + e) : n + e - n * e,
      l = 2 * n - a;
    ((i = ne(l, a, t + 1 / 3)), (o = ne(l, a, t)), (r = ne(l, a, t - 1 / 3)));
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(o * 255),
    blue: Math.round(r * 255),
    alpha: s,
  };
}
function $t(t, e) {
  return (n) => (n > 0 ? e : t);
}
const M = (t, e, n) => t + (e - t) * n,
  se = (t, e, n) => {
    const s = t * t,
      i = n * (e * e - s) + s;
    return i < 0 ? 0 : Math.sqrt(i);
  },
  Ur = [me, et, ot],
  Wr = (t) => Ur.find((e) => e.test(t));
function Pn(t) {
  const e = Wr(t);
  if (!e) return !1;
  let n = e.parse(t);
  return (e === ot && (n = Nr(n)), n);
}
const Sn = (t, e) => {
    const n = Pn(t),
      s = Pn(e);
    if (!n || !s) return $t(t, e);
    const i = { ...n };
    return (o) => (
      (i.red = se(n.red, s.red, o)),
      (i.green = se(n.green, s.green, o)),
      (i.blue = se(n.blue, s.blue, o)),
      (i.alpha = M(n.alpha, s.alpha, o)),
      et.transform(i)
    );
  },
  pe = new Set(["none", "hidden"]);
function Kr(t, e) {
  return pe.has(t) ? (n) => (n <= 0 ? t : e) : (n) => (n >= 1 ? e : t);
}
function $r(t, e) {
  return (n) => M(t, e, n);
}
function Xe(t) {
  return typeof t == "number"
    ? $r
    : typeof t == "string"
      ? _e(t)
        ? $t
        : E.test(t)
          ? Sn
          : Hr
      : Array.isArray(t)
        ? Qs
        : typeof t == "object"
          ? E.test(t)
            ? Sn
            : Gr
          : $t;
}
function Qs(t, e) {
  const n = [...t],
    s = n.length,
    i = t.map((o, r) => Xe(o)(o, e[r]));
  return (o) => {
    for (let r = 0; r < s; r++) n[r] = i[r](o);
    return n;
  };
}
function Gr(t, e) {
  const n = { ...t, ...e },
    s = {};
  for (const i in n)
    t[i] !== void 0 && e[i] !== void 0 && (s[i] = Xe(t[i])(t[i], e[i]));
  return (i) => {
    for (const o in s) n[o] = s[o](i);
    return n;
  };
}
function _r(t, e) {
  const n = [],
    s = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < e.values.length; i++) {
    const o = e.types[i],
      r = t.indexes[o][s[o]],
      a = t.values[r] ?? 0;
    ((n[i] = a), s[o]++);
  }
  return n;
}
const Hr = (t, e) => {
  const n = Z.createTransformer(e),
    s = Mt(t),
    i = Mt(e);
  return s.indexes.var.length === i.indexes.var.length &&
    s.indexes.color.length === i.indexes.color.length &&
    s.indexes.number.length >= i.indexes.number.length
    ? (pe.has(t) && !i.values.length) || (pe.has(e) && !s.values.length)
      ? Kr(t, e)
      : Lt(Qs(_r(s, i), i.values), n)
    : $t(t, e);
};
function ti(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number"
    ? M(t, e, n)
    : Xe(t)(t, e);
}
const zr = (t) => {
    const e = ({ timestamp: n }) => t(n);
    return {
      start: (n = !0) => V.update(e, n),
      stop: () => q(e),
      now: () => (L.isProcessing ? L.timestamp : j.now()),
    };
  },
  ei = (t, e, n = 10) => {
    let s = "";
    const i = Math.max(Math.round(e / n), 2);
    for (let o = 0; o < i; o++)
      s += Math.round(t(o / (i - 1)) * 1e4) / 1e4 + ", ";
    return `linear(${s.substring(0, s.length - 2)})`;
  },
  Gt = 2e4;
function Ye(t) {
  let e = 0;
  const n = 50;
  let s = t.next(e);
  for (; !s.done && e < Gt; ) ((e += n), (s = t.next(e)));
  return e >= Gt ? 1 / 0 : e;
}
function Xr(t, e = 100, n) {
  const s = n({ ...t, keyframes: [0, e] }),
    i = Math.min(Ye(s), Gt);
  return {
    type: "keyframes",
    ease: (o) => s.next(i * o).value / e,
    duration: G(i),
  };
}
const Yr = 5;
function ni(t, e, n) {
  const s = Math.max(e - Yr, 0);
  return Bs(n - t(s), e - s);
}
const C = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: 0.3,
    visualDuration: 0.3,
    restSpeed: { granular: 0.01, default: 2 },
    restDelta: { granular: 0.005, default: 0.5 },
    minDuration: 0.01,
    maxDuration: 10,
    minDamping: 0.05,
    maxDamping: 1,
  },
  ie = 0.001;
function qr({
  duration: t = C.duration,
  bounce: e = C.bounce,
  velocity: n = C.velocity,
  mass: s = C.mass,
}) {
  let i,
    o,
    r = 1 - e;
  ((r = z(C.minDamping, C.maxDamping, r)),
    (t = z(C.minDuration, C.maxDuration, G(t))),
    r < 1
      ? ((i = (c) => {
          const u = c * r,
            h = u * t,
            f = u - n,
            d = ge(c, r),
            m = Math.exp(-h);
          return ie - (f / d) * m;
        }),
        (o = (c) => {
          const h = c * r * t,
            f = h * n + n,
            d = Math.pow(r, 2) * Math.pow(c, 2) * t,
            m = Math.exp(-h),
            v = ge(Math.pow(c, 2), r);
          return ((-i(c) + ie > 0 ? -1 : 1) * ((f - d) * m)) / v;
        }))
      : ((i = (c) => {
          const u = Math.exp(-c * t),
            h = (c - n) * t + 1;
          return -ie + u * h;
        }),
        (o = (c) => {
          const u = Math.exp(-c * t),
            h = (n - c) * (t * t);
          return u * h;
        })));
  const a = 5 / t,
    l = Jr(i, o, a);
  if (((t = $(t)), isNaN(l)))
    return { stiffness: C.stiffness, damping: C.damping, duration: t };
  {
    const c = Math.pow(l, 2) * s;
    return { stiffness: c, damping: r * 2 * Math.sqrt(s * c), duration: t };
  }
}
const Zr = 12;
function Jr(t, e, n) {
  let s = n;
  for (let i = 1; i < Zr; i++) s = s - t(s) / e(s);
  return s;
}
function ge(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const Qr = ["duration", "bounce"],
  to = ["stiffness", "damping", "mass"];
function An(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function eo(t) {
  let e = {
    velocity: C.velocity,
    stiffness: C.stiffness,
    damping: C.damping,
    mass: C.mass,
    isResolvedFromDuration: !1,
    ...t,
  };
  if (!An(t, to) && An(t, Qr))
    if (t.visualDuration) {
      const n = t.visualDuration,
        s = (2 * Math.PI) / (n * 1.2),
        i = s * s,
        o = 2 * z(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(i);
      e = { ...e, mass: C.mass, stiffness: i, damping: o };
    } else {
      const n = qr(t);
      ((e = { ...e, ...n, mass: C.mass }), (e.isResolvedFromDuration = !0));
    }
  return e;
}
function _t(t = C.visualDuration, e = C.bounce) {
  const n =
    typeof t != "object"
      ? { visualDuration: t, keyframes: [0, 1], bounce: e }
      : t;
  let { restSpeed: s, restDelta: i } = n;
  const o = n.keyframes[0],
    r = n.keyframes[n.keyframes.length - 1],
    a = { done: !1, value: o },
    {
      stiffness: l,
      damping: c,
      mass: u,
      duration: h,
      velocity: f,
      isResolvedFromDuration: d,
    } = eo({ ...n, velocity: -G(n.velocity || 0) }),
    m = f || 0,
    v = c / (2 * Math.sqrt(l * u)),
    y = r - o,
    p = G(Math.sqrt(l / u)),
    T = Math.abs(y) < 5;
  (s || (s = T ? C.restSpeed.granular : C.restSpeed.default),
    i || (i = T ? C.restDelta.granular : C.restDelta.default));
  let g;
  if (v < 1) {
    const P = ge(p, v);
    g = (w) => {
      const R = Math.exp(-v * p * w);
      return (
        r - R * (((m + v * p * y) / P) * Math.sin(P * w) + y * Math.cos(P * w))
      );
    };
  } else if (v === 1) g = (P) => r - Math.exp(-p * P) * (y + (m + p * y) * P);
  else {
    const P = p * Math.sqrt(v * v - 1);
    g = (w) => {
      const R = Math.exp(-v * p * w),
        A = Math.min(P * w, 300);
      return (
        r - (R * ((m + v * p * y) * Math.sinh(A) + P * y * Math.cosh(A))) / P
      );
    };
  }
  const b = {
    calculatedDuration: (d && h) || null,
    next: (P) => {
      const w = g(P);
      if (d) a.done = P >= h;
      else {
        let R = P === 0 ? m : 0;
        v < 1 && (R = P === 0 ? $(m) : ni(g, P, w));
        const A = Math.abs(R) <= s,
          I = Math.abs(r - w) <= i;
        a.done = A && I;
      }
      return ((a.value = a.done ? r : w), a);
    },
    toString: () => {
      const P = Math.min(Ye(b), Gt),
        w = ei((R) => b.next(P * R).value, P, 30);
      return P + "ms " + w;
    },
    toTransition: () => {},
  };
  return b;
}
_t.applyToOptions = (t) => {
  const e = Xr(t, 100, _t);
  return (
    (t.ease = e.ease),
    (t.duration = $(e.duration)),
    (t.type = "keyframes"),
    t
  );
};
function ye({
  keyframes: t,
  velocity: e = 0,
  power: n = 0.8,
  timeConstant: s = 325,
  bounceDamping: i = 10,
  bounceStiffness: o = 500,
  modifyTarget: r,
  min: a,
  max: l,
  restDelta: c = 0.5,
  restSpeed: u,
}) {
  const h = t[0],
    f = { done: !1, value: h },
    d = (A) => (a !== void 0 && A < a) || (l !== void 0 && A > l),
    m = (A) =>
      a === void 0
        ? l
        : l === void 0 || Math.abs(a - A) < Math.abs(l - A)
          ? a
          : l;
  let v = n * e;
  const y = h + v,
    p = r === void 0 ? y : r(y);
  p !== y && (v = p - h);
  const T = (A) => -v * Math.exp(-A / s),
    g = (A) => p + T(A),
    b = (A) => {
      const I = T(A),
        O = g(A);
      ((f.done = Math.abs(I) <= c), (f.value = f.done ? p : O));
    };
  let P, w;
  const R = (A) => {
    d(f.value) &&
      ((P = A),
      (w = _t({
        keyframes: [f.value, m(f.value)],
        velocity: ni(g, A, f.value),
        damping: i,
        stiffness: o,
        restDelta: c,
        restSpeed: u,
      })));
  };
  return (
    R(0),
    {
      calculatedDuration: null,
      next: (A) => {
        let I = !1;
        return (
          !w && P === void 0 && ((I = !0), b(A), R(A)),
          P !== void 0 && A >= P ? w.next(A - P) : (!I && b(A), f)
        );
      },
    }
  );
}
function no(t, e, n) {
  const s = [],
    i = n || X.mix || ti,
    o = t.length - 1;
  for (let r = 0; r < o; r++) {
    let a = i(t[r], t[r + 1]);
    if (e) {
      const l = Array.isArray(e) ? e[r] || W : e;
      a = Lt(l, a);
    }
    s.push(a);
  }
  return s;
}
function so(t, e, { clamp: n = !0, ease: s, mixer: i } = {}) {
  const o = t.length;
  if ((Ne(o === e.length), o === 1)) return () => e[0];
  if (o === 2 && e[0] === e[1]) return () => e[1];
  const r = t[0] === t[1];
  t[0] > t[o - 1] && ((t = [...t].reverse()), (e = [...e].reverse()));
  const a = no(e, s, i),
    l = a.length,
    c = (u) => {
      if (r && u < t[0]) return e[0];
      let h = 0;
      if (l > 1) for (; h < t.length - 2 && !(u < t[h + 1]); h++);
      const f = wt(t[h], t[h + 1], u);
      return a[h](f);
    };
  return n ? (u) => c(z(t[0], t[o - 1], u)) : c;
}
function io(t, e) {
  const n = t[t.length - 1];
  for (let s = 1; s <= e; s++) {
    const i = wt(0, e, s);
    t.push(M(n, 1, i));
  }
}
function ro(t) {
  const e = [0];
  return (io(e, t.length - 1), e);
}
function oo(t, e) {
  return t.map((n) => n * e);
}
function ao(t, e) {
  return t.map(() => e || Gs).splice(0, t.length - 1);
}
function xt({
  duration: t = 300,
  keyframes: e,
  times: n,
  ease: s = "easeInOut",
}) {
  const i = vr(s) ? s.map(vn) : vn(s),
    o = { done: !1, value: e[0] },
    r = oo(n && n.length === e.length ? n : ro(e), t),
    a = so(r, e, { ease: Array.isArray(i) ? i : ao(e, i) });
  return {
    calculatedDuration: t,
    next: (l) => ((o.value = a(l)), (o.done = l >= t), o),
  };
}
const lo = (t) => t !== null;
function qe(t, { repeat: e, repeatType: n = "loop" }, s, i = 1) {
  const o = t.filter(lo),
    a = i < 0 || (e && n !== "loop" && e % 2 === 1) ? 0 : o.length - 1;
  return !a || s === void 0 ? o[a] : s;
}
const uo = { decay: ye, inertia: ye, tween: xt, keyframes: xt, spring: _t };
function si(t) {
  typeof t.type == "string" && (t.type = uo[t.type]);
}
class Ze {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((e) => {
      this.resolve = e;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  then(e, n) {
    return this.finished.then(e, n);
  }
}
const co = (t) => t / 100;
class Je extends Ze {
  constructor(e) {
    (super(),
      (this.state = "idle"),
      (this.startTime = null),
      (this.isStopped = !1),
      (this.currentTime = 0),
      (this.holdTime = null),
      (this.playbackSpeed = 1),
      (this.stop = () => {
        const { motionValue: n } = this.options;
        (n && n.updatedAt !== j.now() && this.tick(j.now()),
          (this.isStopped = !0),
          this.state !== "idle" && (this.teardown(), this.options.onStop?.()));
      }),
      (this.options = e),
      this.initAnimation(),
      this.play(),
      e.autoplay === !1 && this.pause());
  }
  initAnimation() {
    const { options: e } = this;
    si(e);
    const {
      type: n = xt,
      repeat: s = 0,
      repeatDelay: i = 0,
      repeatType: o,
      velocity: r = 0,
    } = e;
    let { keyframes: a } = e;
    const l = n || xt;
    l !== xt &&
      typeof a[0] != "number" &&
      ((this.mixKeyframes = Lt(co, ti(a[0], a[1]))), (a = [0, 100]));
    const c = l({ ...e, keyframes: a });
    (o === "mirror" &&
      (this.mirroredGenerator = l({
        ...e,
        keyframes: [...a].reverse(),
        velocity: -r,
      })),
      c.calculatedDuration === null && (c.calculatedDuration = Ye(c)));
    const { calculatedDuration: u } = c;
    ((this.calculatedDuration = u),
      (this.resolvedDuration = u + i),
      (this.totalDuration = this.resolvedDuration * (s + 1) - i),
      (this.generator = c));
  }
  updateTime(e) {
    const n = Math.round(e - this.startTime) * this.playbackSpeed;
    this.holdTime !== null
      ? (this.currentTime = this.holdTime)
      : (this.currentTime = n);
  }
  tick(e, n = !1) {
    const {
      generator: s,
      totalDuration: i,
      mixKeyframes: o,
      mirroredGenerator: r,
      resolvedDuration: a,
      calculatedDuration: l,
    } = this;
    if (this.startTime === null) return s.next(0);
    const {
      delay: c = 0,
      keyframes: u,
      repeat: h,
      repeatType: f,
      repeatDelay: d,
      type: m,
      onUpdate: v,
      finalKeyframe: y,
    } = this.options;
    (this.speed > 0
      ? (this.startTime = Math.min(this.startTime, e))
      : this.speed < 0 &&
        (this.startTime = Math.min(e - i / this.speed, this.startTime)),
      n ? (this.currentTime = e) : this.updateTime(e));
    const p = this.currentTime - c * (this.playbackSpeed >= 0 ? 1 : -1),
      T = this.playbackSpeed >= 0 ? p < 0 : p > i;
    ((this.currentTime = Math.max(p, 0)),
      this.state === "finished" &&
        this.holdTime === null &&
        (this.currentTime = i));
    let g = this.currentTime,
      b = s;
    if (h) {
      const A = Math.min(this.currentTime, i) / a;
      let I = Math.floor(A),
        O = A % 1;
      (!O && A >= 1 && (O = 1),
        O === 1 && I--,
        (I = Math.min(I, h + 1)),
        !!(I % 2) &&
          (f === "reverse"
            ? ((O = 1 - O), d && (O -= d / a))
            : f === "mirror" && (b = r)),
        (g = z(0, 1, O) * a));
    }
    const P = T ? { done: !1, value: u[0] } : b.next(g);
    o && (P.value = o(P.value));
    let { done: w } = P;
    !T &&
      l !== null &&
      (w =
        this.playbackSpeed >= 0
          ? this.currentTime >= i
          : this.currentTime <= 0);
    const R =
      this.holdTime === null &&
      (this.state === "finished" || (this.state === "running" && w));
    return (
      R && m !== ye && (P.value = qe(u, this.options, y, this.speed)),
      v && v(P.value),
      R && this.finish(),
      P
    );
  }
  then(e, n) {
    return this.finished.then(e, n);
  }
  get duration() {
    return G(this.calculatedDuration);
  }
  get time() {
    return G(this.currentTime);
  }
  set time(e) {
    ((e = $(e)),
      (this.currentTime = e),
      this.startTime === null ||
      this.holdTime !== null ||
      this.playbackSpeed === 0
        ? (this.holdTime = e)
        : this.driver &&
          (this.startTime = this.driver.now() - e / this.playbackSpeed),
      this.driver?.start(!1));
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    this.updateTime(j.now());
    const n = this.playbackSpeed !== e;
    ((this.playbackSpeed = e), n && (this.time = G(this.currentTime)));
  }
  play() {
    if (this.isStopped) return;
    const { driver: e = zr, startTime: n } = this.options;
    (this.driver || (this.driver = e((i) => this.tick(i))),
      this.options.onPlay?.());
    const s = this.driver.now();
    (this.state === "finished"
      ? (this.updateFinished(), (this.startTime = s))
      : this.holdTime !== null
        ? (this.startTime = s - this.holdTime)
        : this.startTime || (this.startTime = n ?? s),
      this.state === "finished" &&
        this.speed < 0 &&
        (this.startTime += this.calculatedDuration),
      (this.holdTime = null),
      (this.state = "running"),
      this.driver.start());
  }
  pause() {
    ((this.state = "paused"),
      this.updateTime(j.now()),
      (this.holdTime = this.currentTime));
  }
  complete() {
    (this.state !== "running" && this.play(),
      (this.state = "finished"),
      (this.holdTime = null));
  }
  finish() {
    (this.notifyFinished(),
      this.teardown(),
      (this.state = "finished"),
      this.options.onComplete?.());
  }
  cancel() {
    ((this.holdTime = null),
      (this.startTime = 0),
      this.tick(0),
      this.teardown(),
      this.options.onCancel?.());
  }
  teardown() {
    ((this.state = "idle"),
      this.stopDriver(),
      (this.startTime = this.holdTime = null));
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0));
  }
  sample(e) {
    return ((this.startTime = 0), this.tick(e, !0));
  }
  attachTimeline(e) {
    return (
      this.options.allowFlatten &&
        ((this.options.type = "keyframes"),
        (this.options.ease = "linear"),
        this.initAnimation()),
      this.driver?.stop(),
      e.observe(this)
    );
  }
}
function ho(t) {
  for (let e = 1; e < t.length; e++) t[e] ?? (t[e] = t[e - 1]);
}
const nt = (t) => (t * 180) / Math.PI,
  ve = (t) => {
    const e = nt(Math.atan2(t[1], t[0]));
    return Te(e);
  },
  fo = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
    rotate: ve,
    rotateZ: ve,
    skewX: (t) => nt(Math.atan(t[1])),
    skewY: (t) => nt(Math.atan(t[2])),
    skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2,
  },
  Te = (t) => ((t = t % 360), t < 0 && (t += 360), t),
  bn = ve,
  wn = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]),
  Vn = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]),
  mo = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX: wn,
    scaleY: Vn,
    scale: (t) => (wn(t) + Vn(t)) / 2,
    rotateX: (t) => Te(nt(Math.atan2(t[6], t[5]))),
    rotateY: (t) => Te(nt(Math.atan2(-t[2], t[0]))),
    rotateZ: bn,
    rotate: bn,
    skewX: (t) => nt(Math.atan(t[4])),
    skewY: (t) => nt(Math.atan(t[1])),
    skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2,
  };
function xe(t) {
  return t.includes("scale") ? 1 : 0;
}
function Pe(t, e) {
  if (!t || t === "none") return xe(e);
  const n = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, i;
  if (n) ((s = mo), (i = n));
  else {
    const a = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    ((s = fo), (i = a));
  }
  if (!i) return xe(e);
  const o = s[e],
    r = i[1].split(",").map(go);
  return typeof o == "function" ? o(r) : r[o];
}
const po = (t, e) => {
  const { transform: n = "none" } = getComputedStyle(t);
  return Pe(n, e);
};
function go(t) {
  return parseFloat(t.trim());
}
const mt = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
  ],
  pt = new Set(mt),
  Mn = (t) => t === dt || t === x,
  yo = new Set(["x", "y", "z"]),
  vo = mt.filter((t) => !yo.has(t));
function To(t) {
  const e = [];
  return (
    vo.forEach((n) => {
      const s = t.getValue(n);
      s !== void 0 &&
        (e.push([n, s.get()]), s.set(n.startsWith("scale") ? 1 : 0));
    }),
    e
  );
}
const st = {
  width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0" }) =>
    t.max - t.min - parseFloat(e) - parseFloat(n),
  height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0" }) =>
    t.max - t.min - parseFloat(e) - parseFloat(n),
  top: (t, { top: e }) => parseFloat(e),
  left: (t, { left: e }) => parseFloat(e),
  bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
  right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
  x: (t, { transform: e }) => Pe(e, "x"),
  y: (t, { transform: e }) => Pe(e, "y"),
};
st.translateX = st.x;
st.translateY = st.y;
const it = new Set();
let Se = !1,
  Ae = !1,
  be = !1;
function ii() {
  if (Ae) {
    const t = Array.from(it).filter((s) => s.needsMeasurement),
      e = new Set(t.map((s) => s.element)),
      n = new Map();
    (e.forEach((s) => {
      const i = To(s);
      i.length && (n.set(s, i), s.render());
    }),
      t.forEach((s) => s.measureInitialState()),
      e.forEach((s) => {
        s.render();
        const i = n.get(s);
        i &&
          i.forEach(([o, r]) => {
            s.getValue(o)?.set(r);
          });
      }),
      t.forEach((s) => s.measureEndState()),
      t.forEach((s) => {
        s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
      }));
  }
  ((Ae = !1), (Se = !1), it.forEach((t) => t.complete(be)), it.clear());
}
function ri() {
  it.forEach((t) => {
    (t.readKeyframes(), t.needsMeasurement && (Ae = !0));
  });
}
function xo() {
  ((be = !0), ri(), ii(), (be = !1));
}
class Qe {
  constructor(e, n, s, i, o, r = !1) {
    ((this.state = "pending"),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.unresolvedKeyframes = [...e]),
      (this.onComplete = n),
      (this.name = s),
      (this.motionValue = i),
      (this.element = o),
      (this.isAsync = r));
  }
  scheduleResolve() {
    ((this.state = "scheduled"),
      this.isAsync
        ? (it.add(this), Se || ((Se = !0), V.read(ri), V.resolveKeyframes(ii)))
        : (this.readKeyframes(), this.complete()));
  }
  readKeyframes() {
    const {
      unresolvedKeyframes: e,
      name: n,
      element: s,
      motionValue: i,
    } = this;
    if (e[0] === null) {
      const o = i?.get(),
        r = e[e.length - 1];
      if (o !== void 0) e[0] = o;
      else if (s && n) {
        const a = s.readValue(n, r);
        a != null && (e[0] = a);
      }
      (e[0] === void 0 && (e[0] = r), i && o === void 0 && i.set(e[0]));
    }
    ho(e);
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete(e = !1) {
    ((this.state = "complete"),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e),
      it.delete(this));
  }
  cancel() {
    this.state === "scheduled" && (it.delete(this), (this.state = "pending"));
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const Po = (t) => t.startsWith("--");
function So(t, e, n) {
  Po(e) ? t.style.setProperty(e, n) : (t.style[e] = n);
}
const Ao = Ue(() => window.ScrollTimeline !== void 0),
  bo = {};
function wo(t, e) {
  const n = Ue(t);
  return () => bo[e] ?? n();
}
const oi = wo(() => {
    try {
      document
        .createElement("div")
        .animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch {
      return !1;
    }
    return !0;
  }, "linearEasing"),
  vt = ([t, e, n, s]) => `cubic-bezier(${t}, ${e}, ${n}, ${s})`,
  Cn = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: vt([0, 0.65, 0.55, 1]),
    circOut: vt([0.55, 0, 1, 0.45]),
    backIn: vt([0.31, 0.01, 0.66, -0.59]),
    backOut: vt([0.33, 1.53, 0.69, 0.99]),
  };
function ai(t, e) {
  if (t)
    return typeof t == "function"
      ? oi()
        ? ei(t, e)
        : "ease-out"
      : _s(t)
        ? vt(t)
        : Array.isArray(t)
          ? t.map((n) => ai(n, e) || Cn.easeOut)
          : Cn[t];
}
function Vo(
  t,
  e,
  n,
  {
    delay: s = 0,
    duration: i = 300,
    repeat: o = 0,
    repeatType: r = "loop",
    ease: a = "easeOut",
    times: l,
  } = {},
  c = void 0,
) {
  const u = { [e]: n };
  l && (u.offset = l);
  const h = ai(a, i);
  Array.isArray(h) && (u.easing = h);
  const f = {
    delay: s,
    duration: i,
    easing: Array.isArray(h) ? "linear" : h,
    fill: "both",
    iterations: o + 1,
    direction: r === "reverse" ? "alternate" : "normal",
  };
  return (c && (f.pseudoElement = c), t.animate(u, f));
}
function li(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function Mo({ type: t, ...e }) {
  return li(t) && oi()
    ? t.applyToOptions(e)
    : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e);
}
class Co extends Ze {
  constructor(e) {
    if ((super(), (this.finishedTime = null), (this.isStopped = !1), !e))
      return;
    const {
      element: n,
      name: s,
      keyframes: i,
      pseudoElement: o,
      allowFlatten: r = !1,
      finalKeyframe: a,
      onComplete: l,
    } = e;
    ((this.isPseudoElement = !!o),
      (this.allowFlatten = r),
      (this.options = e),
      Ne(typeof e.type != "string"));
    const c = Mo(e);
    ((this.animation = Vo(n, s, i, c, o)),
      c.autoplay === !1 && this.animation.pause(),
      (this.animation.onfinish = () => {
        if (((this.finishedTime = this.time), !o)) {
          const u = qe(i, this.options, a, this.speed);
          (this.updateMotionValue ? this.updateMotionValue(u) : So(n, s, u),
            this.animation.cancel());
        }
        (l?.(), this.notifyFinished());
      }));
  }
  play() {
    this.isStopped ||
      (this.animation.play(),
      this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {}
  }
  stop() {
    if (this.isStopped) return;
    this.isStopped = !0;
    const { state: e } = this;
    e === "idle" ||
      e === "finished" ||
      (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(),
      this.isPseudoElement || this.cancel());
  }
  commitStyles() {
    this.isPseudoElement || this.animation.commitStyles?.();
  }
  get duration() {
    const e = this.animation.effect?.getComputedTiming?.().duration || 0;
    return G(Number(e));
  }
  get time() {
    return G(Number(this.animation.currentTime) || 0);
  }
  set time(e) {
    ((this.finishedTime = null), (this.animation.currentTime = $(e)));
  }
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(e) {
    (e < 0 && (this.finishedTime = null), (this.animation.playbackRate = e));
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return Number(this.animation.startTime);
  }
  set startTime(e) {
    this.animation.startTime = e;
  }
  attachTimeline({ timeline: e, observe: n }) {
    return (
      this.allowFlatten &&
        this.animation.effect?.updateTiming({ easing: "linear" }),
      (this.animation.onfinish = null),
      e && Ao() ? ((this.animation.timeline = e), W) : n(this)
    );
  }
}
const ui = { anticipate: Ws, backInOut: Us, circInOut: $s };
function Do(t) {
  return t in ui;
}
function Eo(t) {
  typeof t.ease == "string" && Do(t.ease) && (t.ease = ui[t.ease]);
}
const Dn = 10;
class Ro extends Co {
  constructor(e) {
    (Eo(e),
      si(e),
      super(e),
      e.startTime && (this.startTime = e.startTime),
      (this.options = e));
  }
  updateMotionValue(e) {
    const {
      motionValue: n,
      onUpdate: s,
      onComplete: i,
      element: o,
      ...r
    } = this.options;
    if (!n) return;
    if (e !== void 0) {
      n.set(e);
      return;
    }
    const a = new Je({ ...r, autoplay: !1 }),
      l = $(this.finishedTime ?? this.time);
    (n.setWithVelocity(a.sample(l - Dn).value, a.sample(l).value, Dn),
      a.stop());
  }
}
const En = (t, e) =>
  e === "zIndex"
    ? !1
    : !!(
        typeof t == "number" ||
        Array.isArray(t) ||
        (typeof t == "string" &&
          (Z.test(t) || t === "0") &&
          !t.startsWith("url("))
      );
function Lo(t) {
  const e = t[0];
  if (t.length === 1) return !0;
  for (let n = 0; n < t.length; n++) if (t[n] !== e) return !0;
}
function ko(t, e, n, s) {
  const i = t[0];
  if (i === null) return !1;
  if (e === "display" || e === "visibility") return !0;
  const o = t[t.length - 1],
    r = En(i, e),
    a = En(o, e);
  return !r || !a ? !1 : Lo(t) || ((n === "spring" || li(n)) && s);
}
function we(t) {
  ((t.duration = 0), t.type);
}
const Fo = new Set(["opacity", "clipPath", "filter", "transform"]),
  Bo = Ue(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Io(t) {
  const {
    motionValue: e,
    name: n,
    repeatDelay: s,
    repeatType: i,
    damping: o,
    type: r,
  } = t;
  if (!(e?.owner?.current instanceof HTMLElement)) return !1;
  const { onUpdate: l, transformTemplate: c } = e.owner.getProps();
  return (
    Bo() &&
    n &&
    Fo.has(n) &&
    (n !== "transform" || !c) &&
    !l &&
    !s &&
    i !== "mirror" &&
    o !== 0 &&
    r !== "inertia"
  );
}
const jo = 40;
class Oo extends Ze {
  constructor({
    autoplay: e = !0,
    delay: n = 0,
    type: s = "keyframes",
    repeat: i = 0,
    repeatDelay: o = 0,
    repeatType: r = "loop",
    keyframes: a,
    name: l,
    motionValue: c,
    element: u,
    ...h
  }) {
    (super(),
      (this.stop = () => {
        (this._animation && (this._animation.stop(), this.stopTimeline?.()),
          this.keyframeResolver?.cancel());
      }),
      (this.createdAt = j.now()));
    const f = {
        autoplay: e,
        delay: n,
        type: s,
        repeat: i,
        repeatDelay: o,
        repeatType: r,
        name: l,
        motionValue: c,
        element: u,
        ...h,
      },
      d = u?.KeyframeResolver || Qe;
    ((this.keyframeResolver = new d(
      a,
      (m, v, y) => this.onKeyframesResolved(m, v, f, !y),
      l,
      c,
      u,
    )),
      this.keyframeResolver?.scheduleResolve());
  }
  onKeyframesResolved(e, n, s, i) {
    this.keyframeResolver = void 0;
    const {
      name: o,
      type: r,
      velocity: a,
      delay: l,
      isHandoff: c,
      onUpdate: u,
    } = s;
    ((this.resolvedAt = j.now()),
      ko(e, o, r, a) ||
        ((X.instantAnimations || !l) && u?.(qe(e, s, n)),
        (e[0] = e[e.length - 1]),
        we(s),
        (s.repeat = 0)));
    const f = {
        startTime: i
          ? this.resolvedAt
            ? this.resolvedAt - this.createdAt > jo
              ? this.resolvedAt
              : this.createdAt
            : this.createdAt
          : void 0,
        finalKeyframe: n,
        ...s,
        keyframes: e,
      },
      d =
        !c && Io(f)
          ? new Ro({ ...f, element: f.motionValue.owner.current })
          : new Je(f);
    (d.finished.then(() => this.notifyFinished()).catch(W),
      this.pendingTimeline &&
        ((this.stopTimeline = d.attachTimeline(this.pendingTimeline)),
        (this.pendingTimeline = void 0)),
      (this._animation = d));
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(e, n) {
    return this.finished.finally(e).then(() => {});
  }
  get animation() {
    return (
      this._animation || (this.keyframeResolver?.resume(), xo()),
      this._animation
    );
  }
  get duration() {
    return this.animation.duration;
  }
  get time() {
    return this.animation.time;
  }
  set time(e) {
    this.animation.time = e;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(e) {
    this.animation.speed = e;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(e) {
    return (
      this._animation
        ? (this.stopTimeline = this.animation.attachTimeline(e))
        : (this.pendingTimeline = e),
      () => this.stop()
    );
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    (this._animation && this.animation.cancel(),
      this.keyframeResolver?.cancel());
  }
}
const No = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function Uo(t) {
  const e = No.exec(t);
  if (!e) return [,];
  const [, n, s, i] = e;
  return [`--${n ?? s}`, i];
}
function ci(t, e, n = 1) {
  const [s, i] = Uo(t);
  if (!s) return;
  const o = window.getComputedStyle(e).getPropertyValue(s);
  if (o) {
    const r = o.trim();
    return Ls(r) ? parseFloat(r) : r;
  }
  return _e(i) ? ci(i, e, n + 1) : i;
}
function tn(t, e) {
  return t?.[e] ?? t?.default ?? t;
}
const hi = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    ...mt,
  ]),
  Wo = { test: (t) => t === "auto", parse: (t) => t },
  fi = (t) => (e) => e.test(t),
  di = [dt, x, _, Y, Rr, Er, Wo],
  Rn = (t) => di.find(fi(t));
function Ko(t) {
  return typeof t == "number"
    ? t === 0
    : t !== null
      ? t === "none" || t === "0" || Fs(t)
      : !0;
}
const $o = new Set(["brightness", "contrast", "saturate", "opacity"]);
function Go(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow") return t;
  const [s] = n.match(He) || [];
  if (!s) return t;
  const i = n.replace(s, "");
  let o = $o.has(e) ? 1 : 0;
  return (s !== n && (o *= 100), e + "(" + o + i + ")");
}
const _o = /\b([a-z-]*)\(.*?\)/gu,
  Ve = {
    ...Z,
    getAnimatableNone: (t) => {
      const e = t.match(_o);
      return e ? e.map(Go).join(" ") : t;
    },
  },
  Ln = { ...dt, transform: Math.round },
  Ho = {
    rotate: Y,
    rotateX: Y,
    rotateY: Y,
    rotateZ: Y,
    scale: jt,
    scaleX: jt,
    scaleY: jt,
    scaleZ: jt,
    skew: Y,
    skewX: Y,
    skewY: Y,
    distance: x,
    translateX: x,
    translateY: x,
    translateZ: x,
    x,
    y: x,
    z: x,
    perspective: x,
    transformPerspective: x,
    opacity: Vt,
    originX: Tn,
    originY: Tn,
    originZ: x,
  },
  en = {
    borderWidth: x,
    borderTopWidth: x,
    borderRightWidth: x,
    borderBottomWidth: x,
    borderLeftWidth: x,
    borderRadius: x,
    radius: x,
    borderTopLeftRadius: x,
    borderTopRightRadius: x,
    borderBottomRightRadius: x,
    borderBottomLeftRadius: x,
    width: x,
    maxWidth: x,
    height: x,
    maxHeight: x,
    top: x,
    right: x,
    bottom: x,
    left: x,
    padding: x,
    paddingTop: x,
    paddingRight: x,
    paddingBottom: x,
    paddingLeft: x,
    margin: x,
    marginTop: x,
    marginRight: x,
    marginBottom: x,
    marginLeft: x,
    backgroundPositionX: x,
    backgroundPositionY: x,
    ...Ho,
    zIndex: Ln,
    fillOpacity: Vt,
    strokeOpacity: Vt,
    numOctaves: Ln,
  },
  zo = {
    ...en,
    color: E,
    backgroundColor: E,
    outlineColor: E,
    fill: E,
    stroke: E,
    borderColor: E,
    borderTopColor: E,
    borderRightColor: E,
    borderBottomColor: E,
    borderLeftColor: E,
    filter: Ve,
    WebkitFilter: Ve,
  },
  mi = (t) => zo[t];
function pi(t, e) {
  let n = mi(t);
  return (
    n !== Ve && (n = Z),
    n.getAnimatableNone ? n.getAnimatableNone(e) : void 0
  );
}
const Xo = new Set(["auto", "none", "0"]);
function Yo(t, e, n) {
  let s = 0,
    i;
  for (; s < t.length && !i; ) {
    const o = t[s];
    (typeof o == "string" && !Xo.has(o) && Mt(o).values.length && (i = t[s]),
      s++);
  }
  if (i && n) for (const o of e) t[o] = pi(n, i);
}
class qo extends Qe {
  constructor(e, n, s, i, o) {
    super(e, n, s, i, o, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: n, name: s } = this;
    if (!n || !n.current) return;
    super.readKeyframes();
    for (let l = 0; l < e.length; l++) {
      let c = e[l];
      if (typeof c == "string" && ((c = c.trim()), _e(c))) {
        const u = ci(c, n.current);
        (u !== void 0 && (e[l] = u),
          l === e.length - 1 && (this.finalKeyframe = c));
      }
    }
    if ((this.resolveNoneKeyframes(), !hi.has(s) || e.length !== 2)) return;
    const [i, o] = e,
      r = Rn(i),
      a = Rn(o);
    if (r !== a)
      if (Mn(r) && Mn(a))
        for (let l = 0; l < e.length; l++) {
          const c = e[l];
          typeof c == "string" && (e[l] = parseFloat(c));
        }
      else st[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: n } = this,
      s = [];
    for (let i = 0; i < e.length; i++) (e[i] === null || Ko(e[i])) && s.push(i);
    s.length && Yo(e, s, n);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: s } = this;
    if (!e || !e.current) return;
    (s === "height" && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = st[s](
        e.measureViewportBox(),
        window.getComputedStyle(e.current),
      )),
      (n[0] = this.measuredOrigin));
    const i = n[n.length - 1];
    i !== void 0 && e.getValue(s, i).jump(i, !1);
  }
  measureEndState() {
    const { element: e, name: n, unresolvedKeyframes: s } = this;
    if (!e || !e.current) return;
    const i = e.getValue(n);
    i && i.jump(this.measuredOrigin, !1);
    const o = s.length - 1,
      r = s[o];
    ((s[o] = st[n](e.measureViewportBox(), window.getComputedStyle(e.current))),
      r !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = r),
      this.removedTransforms?.length &&
        this.removedTransforms.forEach(([a, l]) => {
          e.getValue(a).set(l);
        }),
      this.resolveNoneKeyframes());
  }
}
function Zo(t, e, n) {
  if (t instanceof EventTarget) return [t];
  if (typeof t == "string") {
    let s = document;
    const i = n?.[t] ?? s.querySelectorAll(t);
    return i ? Array.from(i) : [];
  }
  return Array.from(t);
}
const gi = (t, e) => (e && typeof t == "number" ? e.transform(t) : t);
function Jo(t) {
  return ks(t) && "offsetHeight" in t;
}
const kn = 30,
  Qo = (t) => !isNaN(parseFloat(t));
class ta {
  constructor(e, n = {}) {
    ((this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (s) => {
        const i = j.now();
        if (
          (this.updatedAt !== i && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(s),
          this.current !== this.prev &&
            (this.events.change?.notify(this.current), this.dependents))
        )
          for (const o of this.dependents) o.dirty();
      }),
      (this.hasAnimated = !1),
      this.setCurrent(e),
      (this.owner = n.owner));
  }
  setCurrent(e) {
    ((this.current = e),
      (this.updatedAt = j.now()),
      this.canTrackVelocity === null &&
        e !== void 0 &&
        (this.canTrackVelocity = Qo(this.current)));
  }
  setPrevFrameValue(e = this.current) {
    ((this.prevFrameValue = e), (this.prevUpdatedAt = this.updatedAt));
  }
  onChange(e) {
    return this.on("change", e);
  }
  on(e, n) {
    this.events[e] || (this.events[e] = new We());
    const s = this.events[e].add(n);
    return e === "change"
      ? () => {
          (s(),
            V.read(() => {
              this.events.change.getSize() || this.stop();
            }));
        }
      : s;
  }
  clearListeners() {
    for (const e in this.events) this.events[e].clear();
  }
  attach(e, n) {
    ((this.passiveEffect = e), (this.stopPassiveEffect = n));
  }
  set(e) {
    this.passiveEffect
      ? this.passiveEffect(e, this.updateAndNotify)
      : this.updateAndNotify(e);
  }
  setWithVelocity(e, n, s) {
    (this.set(n),
      (this.prev = void 0),
      (this.prevFrameValue = e),
      (this.prevUpdatedAt = this.updatedAt - s));
  }
  jump(e, n = !0) {
    (this.updateAndNotify(e),
      (this.prev = e),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      n && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect());
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(e) {
    (this.dependents || (this.dependents = new Set()), this.dependents.add(e));
  }
  removeDependent(e) {
    this.dependents && this.dependents.delete(e);
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    const e = j.now();
    if (
      !this.canTrackVelocity ||
      this.prevFrameValue === void 0 ||
      e - this.updatedAt > kn
    )
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, kn);
    return Bs(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  start(e) {
    return (
      this.stop(),
      new Promise((n) => {
        ((this.hasAnimated = !0),
          (this.animation = e(n)),
          this.events.animationStart && this.events.animationStart.notify());
      }).then(() => {
        (this.events.animationComplete &&
          this.events.animationComplete.notify(),
          this.clearAnimation());
      })
    );
  }
  stop() {
    (this.animation &&
      (this.animation.stop(),
      this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation());
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    (this.dependents?.clear(),
      this.events.destroy?.notify(),
      this.clearListeners(),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect());
  }
}
function ht(t, e) {
  return new ta(t, e);
}
const { schedule: nn } = Hs(queueMicrotask, !1),
  K = { x: !1, y: !1 };
function yi() {
  return K.x || K.y;
}
function ea(t) {
  return t === "x" || t === "y"
    ? K[t]
      ? null
      : ((K[t] = !0),
        () => {
          K[t] = !1;
        })
    : K.x || K.y
      ? null
      : ((K.x = K.y = !0),
        () => {
          K.x = K.y = !1;
        });
}
function vi(t, e) {
  const n = Zo(t),
    s = new AbortController(),
    i = { passive: !0, ...e, signal: s.signal };
  return [n, i, () => s.abort()];
}
function Fn(t) {
  return !(t.pointerType === "touch" || yi());
}
function na(t, e, n = {}) {
  const [s, i, o] = vi(t, n),
    r = (a) => {
      if (!Fn(a)) return;
      const { target: l } = a,
        c = e(l, a);
      if (typeof c != "function" || !l) return;
      const u = (h) => {
        Fn(h) && (c(h), l.removeEventListener("pointerleave", u));
      };
      l.addEventListener("pointerleave", u, i);
    };
  return (
    s.forEach((a) => {
      a.addEventListener("pointerenter", r, i);
    }),
    o
  );
}
const Ti = (t, e) => (e ? (t === e ? !0 : Ti(t, e.parentElement)) : !1),
  sn = (t) =>
    t.pointerType === "mouse"
      ? typeof t.button != "number" || t.button <= 0
      : t.isPrimary !== !1,
  sa = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
function ia(t) {
  return sa.has(t.tagName) || t.tabIndex !== -1;
}
const Ut = new WeakSet();
function Bn(t) {
  return (e) => {
    e.key === "Enter" && t(e);
  };
}
function re(t, e) {
  t.dispatchEvent(
    new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }),
  );
}
const ra = (t, e) => {
  const n = t.currentTarget;
  if (!n) return;
  const s = Bn(() => {
    if (Ut.has(n)) return;
    re(n, "down");
    const i = Bn(() => {
        re(n, "up");
      }),
      o = () => re(n, "cancel");
    (n.addEventListener("keyup", i, e), n.addEventListener("blur", o, e));
  });
  (n.addEventListener("keydown", s, e),
    n.addEventListener("blur", () => n.removeEventListener("keydown", s), e));
};
function In(t) {
  return sn(t) && !yi();
}
function oa(t, e, n = {}) {
  const [s, i, o] = vi(t, n),
    r = (a) => {
      const l = a.currentTarget;
      if (!In(a)) return;
      Ut.add(l);
      const c = e(l, a),
        u = (d, m) => {
          (window.removeEventListener("pointerup", h),
            window.removeEventListener("pointercancel", f),
            Ut.has(l) && Ut.delete(l),
            In(d) && typeof c == "function" && c(d, { success: m }));
        },
        h = (d) => {
          u(
            d,
            l === window ||
              l === document ||
              n.useGlobalTarget ||
              Ti(l, d.target),
          );
        },
        f = (d) => {
          u(d, !1);
        };
      (window.addEventListener("pointerup", h, i),
        window.addEventListener("pointercancel", f, i));
    };
  return (
    s.forEach((a) => {
      ((n.useGlobalTarget ? window : a).addEventListener("pointerdown", r, i),
        Jo(a) &&
          (a.addEventListener("focus", (c) => ra(c, i)),
          !ia(a) && !a.hasAttribute("tabindex") && (a.tabIndex = 0)));
    }),
    o
  );
}
function xi(t) {
  return ks(t) && "ownerSVGElement" in t;
}
function aa(t) {
  return xi(t) && t.tagName === "svg";
}
const k = (t) => !!(t && t.getVelocity),
  la = [...di, E, Z],
  ua = (t) => la.find(fi(t)),
  Pi = S.createContext({
    transformPagePoint: (t) => t,
    isStatic: !1,
    reducedMotion: "never",
  });
function ca(t = !0) {
  const e = S.useContext(Ie);
  if (e === null) return [!0, null];
  const { isPresent: n, onExitComplete: s, register: i } = e,
    o = S.useId();
  S.useEffect(() => {
    if (t) return i(o);
  }, [t]);
  const r = S.useCallback(() => t && s && s(o), [o, s, t]);
  return !n && s ? [!1, r] : [!0];
}
const Si = S.createContext({ strict: !1 }),
  jn = {
    animation: [
      "animate",
      "variants",
      "whileHover",
      "whileTap",
      "exit",
      "whileInView",
      "whileFocus",
      "whileDrag",
    ],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"],
  },
  ft = {};
for (const t in jn) ft[t] = { isEnabled: (e) => jn[t].some((n) => !!e[n]) };
function ha(t) {
  for (const e in t) ft[e] = { ...ft[e], ...t[e] };
}
const fa = new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport",
]);
function Ht(t) {
  return (
    t.startsWith("while") ||
    (t.startsWith("drag") && t !== "draggable") ||
    t.startsWith("layout") ||
    t.startsWith("onTap") ||
    t.startsWith("onPan") ||
    t.startsWith("onLayout") ||
    fa.has(t)
  );
}
let Ai = (t) => !Ht(t);
function da(t) {
  typeof t == "function" && (Ai = (e) => (e.startsWith("on") ? !Ht(e) : t(e)));
}
try {
  da(require("@emotion/is-prop-valid").default);
} catch {}
function ma(t, e, n) {
  const s = {};
  for (const i in t)
    (i === "values" && typeof t.values == "object") ||
      ((Ai(i) ||
        (n === !0 && Ht(i)) ||
        (!e && !Ht(i)) ||
        (t.draggable && i.startsWith("onDrag"))) &&
        (s[i] = t[i]));
  return s;
}
const Xt = S.createContext({});
function Yt(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function Ct(t) {
  return typeof t == "string" || Array.isArray(t);
}
const rn = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit",
  ],
  on = ["initial", ...rn];
function qt(t) {
  return Yt(t.animate) || on.some((e) => Ct(t[e]));
}
function bi(t) {
  return !!(qt(t) || t.variants);
}
function pa(t, e) {
  if (qt(t)) {
    const { initial: n, animate: s } = t;
    return {
      initial: n === !1 || Ct(n) ? n : void 0,
      animate: Ct(s) ? s : void 0,
    };
  }
  return t.inherit !== !1 ? e : {};
}
function ga(t) {
  const { initial: e, animate: n } = pa(t, S.useContext(Xt));
  return S.useMemo(() => ({ initial: e, animate: n }), [On(e), On(n)]);
}
function On(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const Dt = {};
function ya(t) {
  for (const e in t) ((Dt[e] = t[e]), Ge(e) && (Dt[e].isCSSVariable = !0));
}
function wi(t, { layout: e, layoutId: n }) {
  return (
    pt.has(t) ||
    t.startsWith("origin") ||
    ((e || n !== void 0) && (!!Dt[t] || t === "opacity"))
  );
}
const va = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
  },
  Ta = mt.length;
function xa(t, e, n) {
  let s = "",
    i = !0;
  for (let o = 0; o < Ta; o++) {
    const r = mt[o],
      a = t[r];
    if (a === void 0) continue;
    let l = !0;
    if (
      (typeof a == "number"
        ? (l = a === (r.startsWith("scale") ? 1 : 0))
        : (l = parseFloat(a) === 0),
      !l || n)
    ) {
      const c = gi(a, en[r]);
      if (!l) {
        i = !1;
        const u = va[r] || r;
        s += `${u}(${c}) `;
      }
      n && (e[r] = c);
    }
  }
  return ((s = s.trim()), n ? (s = n(e, i ? "" : s)) : i && (s = "none"), s);
}
function an(t, e, n) {
  const { style: s, vars: i, transformOrigin: o } = t;
  let r = !1,
    a = !1;
  for (const l in e) {
    const c = e[l];
    if (pt.has(l)) {
      r = !0;
      continue;
    } else if (Ge(l)) {
      i[l] = c;
      continue;
    } else {
      const u = gi(c, en[l]);
      l.startsWith("origin") ? ((a = !0), (o[l] = u)) : (s[l] = u);
    }
  }
  if (
    (e.transform ||
      (r || n
        ? (s.transform = xa(e, t.transform, n))
        : s.transform && (s.transform = "none")),
    a)
  ) {
    const { originX: l = "50%", originY: c = "50%", originZ: u = 0 } = o;
    s.transformOrigin = `${l} ${c} ${u}`;
  }
}
const ln = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
function Vi(t, e, n) {
  for (const s in e) !k(e[s]) && !wi(s, n) && (t[s] = e[s]);
}
function Pa({ transformTemplate: t }, e) {
  return S.useMemo(() => {
    const n = ln();
    return (an(n, e, t), Object.assign({}, n.vars, n.style));
  }, [e]);
}
function Sa(t, e) {
  const n = t.style || {},
    s = {};
  return (Vi(s, n, t), Object.assign(s, Pa(t, e)), s);
}
function Aa(t, e) {
  const n = {},
    s = Sa(t, e);
  return (
    t.drag &&
      t.dragListener !== !1 &&
      ((n.draggable = !1),
      (s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none"),
      (s.touchAction =
        t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`)),
    t.tabIndex === void 0 &&
      (t.onTap || t.onTapStart || t.whileTap) &&
      (n.tabIndex = 0),
    (n.style = s),
    n
  );
}
const ba = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
  wa = { offset: "strokeDashoffset", array: "strokeDasharray" };
function Va(t, e, n = 1, s = 0, i = !0) {
  t.pathLength = 1;
  const o = i ? ba : wa;
  t[o.offset] = x.transform(-s);
  const r = x.transform(e),
    a = x.transform(n);
  t[o.array] = `${r} ${a}`;
}
function Mi(
  t,
  {
    attrX: e,
    attrY: n,
    attrScale: s,
    pathLength: i,
    pathSpacing: o = 1,
    pathOffset: r = 0,
    ...a
  },
  l,
  c,
  u,
) {
  if ((an(t, a, c), l)) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  ((t.attrs = t.style), (t.style = {}));
  const { attrs: h, style: f } = t;
  (h.transform && ((f.transform = h.transform), delete h.transform),
    (f.transform || h.transformOrigin) &&
      ((f.transformOrigin = h.transformOrigin ?? "50% 50%"),
      delete h.transformOrigin),
    f.transform &&
      ((f.transformBox = u?.transformBox ?? "fill-box"), delete h.transformBox),
    e !== void 0 && (h.x = e),
    n !== void 0 && (h.y = n),
    s !== void 0 && (h.scale = s),
    i !== void 0 && Va(h, i, o, r, !1));
}
const Ci = () => ({ ...ln(), attrs: {} }),
  Di = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function Ma(t, e, n, s) {
  const i = S.useMemo(() => {
    const o = Ci();
    return (
      Mi(o, e, Di(s), t.transformTemplate, t.style),
      { ...o.attrs, style: { ...o.style } }
    );
  }, [e]);
  if (t.style) {
    const o = {};
    (Vi(o, t.style, t), (i.style = { ...o, ...i.style }));
  }
  return i;
}
const Ca = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view",
];
function un(t) {
  return typeof t != "string" || t.includes("-")
    ? !1
    : !!(Ca.indexOf(t) > -1 || /[A-Z]/u.test(t));
}
function Da(t, e, n, { latestValues: s }, i, o = !1) {
  const a = (un(t) ? Ma : Aa)(e, s, i, t),
    l = ma(e, typeof t == "string", o),
    c = t !== S.Fragment ? { ...l, ...a, ref: n } : {},
    { children: u } = e,
    h = S.useMemo(() => (k(u) ? u.get() : u), [u]);
  return S.createElement(t, { ...c, children: h });
}
function Nn(t) {
  const e = [{}, {}];
  return (
    t?.values.forEach((n, s) => {
      ((e[0][s] = n.get()), (e[1][s] = n.getVelocity()));
    }),
    e
  );
}
function cn(t, e, n, s) {
  if (typeof e == "function") {
    const [i, o] = Nn(s);
    e = e(n !== void 0 ? n : t.custom, i, o);
  }
  if (
    (typeof e == "string" && (e = t.variants && t.variants[e]),
    typeof e == "function")
  ) {
    const [i, o] = Nn(s);
    e = e(n !== void 0 ? n : t.custom, i, o);
  }
  return e;
}
function Wt(t) {
  return k(t) ? t.get() : t;
}
function Ea({ scrapeMotionValuesFromProps: t, createRenderState: e }, n, s, i) {
  return { latestValues: Ra(n, s, i, t), renderState: e() };
}
function Ra(t, e, n, s) {
  const i = {},
    o = s(t, {});
  for (const f in o) i[f] = Wt(o[f]);
  let { initial: r, animate: a } = t;
  const l = qt(t),
    c = bi(t);
  e &&
    c &&
    !l &&
    t.inherit !== !1 &&
    (r === void 0 && (r = e.initial), a === void 0 && (a = e.animate));
  let u = n ? n.initial === !1 : !1;
  u = u || r === !1;
  const h = u ? a : r;
  if (h && typeof h != "boolean" && !Yt(h)) {
    const f = Array.isArray(h) ? h : [h];
    for (let d = 0; d < f.length; d++) {
      const m = cn(t, f[d]);
      if (m) {
        const { transitionEnd: v, transition: y, ...p } = m;
        for (const T in p) {
          let g = p[T];
          if (Array.isArray(g)) {
            const b = u ? g.length - 1 : 0;
            g = g[b];
          }
          g !== null && (i[T] = g);
        }
        for (const T in v) i[T] = v[T];
      }
    }
  }
  return i;
}
const Ei = (t) => (e, n) => {
  const s = S.useContext(Xt),
    i = S.useContext(Ie),
    o = () => Ea(t, e, s, i);
  return n ? o() : cr(o);
};
function hn(t, e, n) {
  const { style: s } = t,
    i = {};
  for (const o in s)
    (k(s[o]) ||
      (e.style && k(e.style[o])) ||
      wi(o, t) ||
      n?.getValue(o)?.liveStyle !== void 0) &&
      (i[o] = s[o]);
  return i;
}
const La = Ei({ scrapeMotionValuesFromProps: hn, createRenderState: ln });
function Ri(t, e, n) {
  const s = hn(t, e, n);
  for (const i in t)
    if (k(t[i]) || k(e[i])) {
      const o =
        mt.indexOf(i) !== -1
          ? "attr" + i.charAt(0).toUpperCase() + i.substring(1)
          : i;
      s[o] = t[i];
    }
  return s;
}
const ka = Ei({ scrapeMotionValuesFromProps: Ri, createRenderState: Ci }),
  Fa = Symbol.for("motionComponentSymbol");
function at(t) {
  return (
    t &&
    typeof t == "object" &&
    Object.prototype.hasOwnProperty.call(t, "current")
  );
}
function Ba(t, e, n) {
  return S.useCallback(
    (s) => {
      (s && t.onMount && t.onMount(s),
        e && (s ? e.mount(s) : e.unmount()),
        n && (typeof n == "function" ? n(s) : at(n) && (n.current = s)));
    },
    [e],
  );
}
const fn = (t) => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
  Ia = "framerAppearId",
  Li = "data-" + fn(Ia),
  ki = S.createContext({});
function ja(t, e, n, s, i) {
  const { visualElement: o } = S.useContext(Xt),
    r = S.useContext(Si),
    a = S.useContext(Ie),
    l = S.useContext(Pi).reducedMotion,
    c = S.useRef(null);
  ((s = s || r.renderer),
    !c.current &&
      s &&
      (c.current = s(t, {
        visualState: e,
        parent: o,
        props: n,
        presenceContext: a,
        blockInitialAnimation: a ? a.initial === !1 : !1,
        reducedMotionConfig: l,
      })));
  const u = c.current,
    h = S.useContext(ki);
  u &&
    !u.projection &&
    i &&
    (u.type === "html" || u.type === "svg") &&
    Oa(c.current, n, i, h);
  const f = S.useRef(!1);
  S.useInsertionEffect(() => {
    u && f.current && u.update(n, a);
  });
  const d = n[Li],
    m = S.useRef(
      !!d &&
        !window.MotionHandoffIsComplete?.(d) &&
        window.MotionHasOptimisedAnimation?.(d),
    );
  return (
    hr(() => {
      u &&
        ((f.current = !0),
        (window.MotionIsMounted = !0),
        u.updateFeatures(),
        u.scheduleRenderMicrotask(),
        m.current && u.animationState && u.animationState.animateChanges());
    }),
    S.useEffect(() => {
      u &&
        (!m.current && u.animationState && u.animationState.animateChanges(),
        m.current &&
          (queueMicrotask(() => {
            window.MotionHandoffMarkAsComplete?.(d);
          }),
          (m.current = !1)));
    }),
    u
  );
}
function Oa(t, e, n, s) {
  const {
    layoutId: i,
    layout: o,
    drag: r,
    dragConstraints: a,
    layoutScroll: l,
    layoutRoot: c,
    layoutCrossfade: u,
  } = e;
  ((t.projection = new n(
    t.latestValues,
    e["data-framer-portal-id"] ? void 0 : Fi(t.parent),
  )),
    t.projection.setOptions({
      layoutId: i,
      layout: o,
      alwaysMeasureLayout: !!r || (a && at(a)),
      visualElement: t,
      animationType: typeof o == "string" ? o : "both",
      initialPromotionConfig: s,
      crossfade: u,
      layoutScroll: l,
      layoutRoot: c,
    }));
}
function Fi(t) {
  if (t) return t.options.allowProjection !== !1 ? t.projection : Fi(t.parent);
}
function oe(t, { forwardMotionProps: e = !1 } = {}, n, s) {
  n && ha(n);
  const i = un(t) ? ka : La;
  function o(a, l) {
    let c;
    const u = { ...S.useContext(Pi), ...a, layoutId: Na(a) },
      { isStatic: h } = u,
      f = ga(a),
      d = i(a, h);
    if (!h && Be) {
      Ua();
      const m = Wa(u);
      ((c = m.MeasureLayout),
        (f.visualElement = ja(t, d, u, s, m.ProjectionNode)));
    }
    return bt.jsxs(Xt.Provider, {
      value: f,
      children: [
        c && f.visualElement
          ? bt.jsx(c, { visualElement: f.visualElement, ...u })
          : null,
        Da(t, a, Ba(d, f.visualElement, l), d, h, e),
      ],
    });
  }
  o.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const r = S.forwardRef(o);
  return ((r[Fa] = t), r);
}
function Na({ layoutId: t }) {
  const e = S.useContext(Rs).id;
  return e && t !== void 0 ? e + "-" + t : t;
}
function Ua(t, e) {
  S.useContext(Si).strict;
}
function Wa(t) {
  const { drag: e, layout: n } = ft;
  if (!e && !n) return {};
  const s = { ...e, ...n };
  return {
    MeasureLayout:
      e?.isEnabled(t) || n?.isEnabled(t) ? s.MeasureLayout : void 0,
    ProjectionNode: s.ProjectionNode,
  };
}
function Ka(t, e) {
  if (typeof Proxy > "u") return oe;
  const n = new Map(),
    s = (o, r) => oe(o, r, t, e),
    i = (o, r) => s(o, r);
  return new Proxy(i, {
    get: (o, r) =>
      r === "create"
        ? s
        : (n.has(r) || n.set(r, oe(r, void 0, t, e)), n.get(r)),
  });
}
function Bi({ top: t, left: e, right: n, bottom: s }) {
  return { x: { min: e, max: n }, y: { min: t, max: s } };
}
function $a({ x: t, y: e }) {
  return { top: e.min, right: t.max, bottom: e.max, left: t.min };
}
function Ga(t, e) {
  if (!e) return t;
  const n = e({ x: t.left, y: t.top }),
    s = e({ x: t.right, y: t.bottom });
  return { top: n.y, left: n.x, bottom: s.y, right: s.x };
}
function ae(t) {
  return t === void 0 || t === 1;
}
function Me({ scale: t, scaleX: e, scaleY: n }) {
  return !ae(t) || !ae(e) || !ae(n);
}
function tt(t) {
  return (
    Me(t) ||
    Ii(t) ||
    t.z ||
    t.rotate ||
    t.rotateX ||
    t.rotateY ||
    t.skewX ||
    t.skewY
  );
}
function Ii(t) {
  return Un(t.x) || Un(t.y);
}
function Un(t) {
  return t && t !== "0%";
}
function zt(t, e, n) {
  const s = t - n,
    i = e * s;
  return n + i;
}
function Wn(t, e, n, s, i) {
  return (i !== void 0 && (t = zt(t, i, s)), zt(t, n, s) + e);
}
function Ce(t, e = 0, n = 1, s, i) {
  ((t.min = Wn(t.min, e, n, s, i)), (t.max = Wn(t.max, e, n, s, i)));
}
function ji(t, { x: e, y: n }) {
  (Ce(t.x, e.translate, e.scale, e.originPoint),
    Ce(t.y, n.translate, n.scale, n.originPoint));
}
const Kn = 0.999999999999,
  $n = 1.0000000000001;
function _a(t, e, n, s = !1) {
  const i = n.length;
  if (!i) return;
  e.x = e.y = 1;
  let o, r;
  for (let a = 0; a < i; a++) {
    ((o = n[a]), (r = o.projectionDelta));
    const { visualElement: l } = o.options;
    (l && l.props.style && l.props.style.display === "contents") ||
      (s &&
        o.options.layoutScroll &&
        o.scroll &&
        o !== o.root &&
        ut(t, { x: -o.scroll.offset.x, y: -o.scroll.offset.y }),
      r && ((e.x *= r.x.scale), (e.y *= r.y.scale), ji(t, r)),
      s && tt(o.latestValues) && ut(t, o.latestValues));
  }
  (e.x < $n && e.x > Kn && (e.x = 1), e.y < $n && e.y > Kn && (e.y = 1));
}
function lt(t, e) {
  ((t.min = t.min + e), (t.max = t.max + e));
}
function Gn(t, e, n, s, i = 0.5) {
  const o = M(t.min, t.max, i);
  Ce(t, e, n, o, s);
}
function ut(t, e) {
  (Gn(t.x, e.x, e.scaleX, e.scale, e.originX),
    Gn(t.y, e.y, e.scaleY, e.scale, e.originY));
}
function Oi(t, e) {
  return Bi(Ga(t.getBoundingClientRect(), e));
}
function Ha(t, e, n) {
  const s = Oi(t, n),
    { scroll: i } = e;
  return (i && (lt(s.x, i.offset.x), lt(s.y, i.offset.y)), s);
}
const _n = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  ct = () => ({ x: _n(), y: _n() }),
  Hn = () => ({ min: 0, max: 0 }),
  D = () => ({ x: Hn(), y: Hn() }),
  De = { current: null },
  Ni = { current: !1 };
function za() {
  if (((Ni.current = !0), !!Be))
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"),
        e = () => (De.current = t.matches);
      (t.addEventListener("change", e), e());
    } else De.current = !1;
}
const Xa = new WeakMap();
function Ya(t, e, n) {
  for (const s in e) {
    const i = e[s],
      o = n[s];
    if (k(i)) t.addValue(s, i);
    else if (k(o)) t.addValue(s, ht(i, { owner: t }));
    else if (o !== i)
      if (t.hasValue(s)) {
        const r = t.getValue(s);
        r.liveStyle === !0 ? r.jump(i) : r.hasAnimated || r.set(i);
      } else {
        const r = t.getStaticValue(s);
        t.addValue(s, ht(r !== void 0 ? r : i, { owner: t }));
      }
  }
  for (const s in n) e[s] === void 0 && t.removeValue(s);
  return e;
}
const zn = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete",
];
class qa {
  scrapeMotionValuesFromProps(e, n, s) {
    return {};
  }
  constructor(
    {
      parent: e,
      props: n,
      presenceContext: s,
      reducedMotionConfig: i,
      blockInitialAnimation: o,
      visualState: r,
    },
    a = {},
  ) {
    ((this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.KeyframeResolver = Qe),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(),
          this.renderInstance(
            this.current,
            this.renderState,
            this.props.style,
            this.projection,
          ));
      }),
      (this.renderScheduledAt = 0),
      (this.scheduleRender = () => {
        const f = j.now();
        this.renderScheduledAt < f &&
          ((this.renderScheduledAt = f), V.render(this.render, !1, !0));
      }));
    const { latestValues: l, renderState: c } = r;
    ((this.latestValues = l),
      (this.baseTarget = { ...l }),
      (this.initialValues = n.initial ? { ...l } : {}),
      (this.renderState = c),
      (this.parent = e),
      (this.props = n),
      (this.presenceContext = s),
      (this.depth = e ? e.depth + 1 : 0),
      (this.reducedMotionConfig = i),
      (this.options = a),
      (this.blockInitialAnimation = !!o),
      (this.isControllingVariants = qt(n)),
      (this.isVariantNode = bi(n)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(e && e.current)));
    const { willChange: u, ...h } = this.scrapeMotionValuesFromProps(
      n,
      {},
      this,
    );
    for (const f in h) {
      const d = h[f];
      l[f] !== void 0 && k(d) && d.set(l[f]);
    }
  }
  mount(e) {
    ((this.current = e),
      Xa.set(e, this),
      this.projection && !this.projection.instance && this.projection.mount(e),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((n, s) => this.bindToMotionValue(s, n)),
      Ni.current || za(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === "never"
          ? !1
          : this.reducedMotionConfig === "always"
            ? !0
            : De.current),
      this.parent && this.parent.children.add(this),
      this.update(this.props, this.presenceContext));
  }
  unmount() {
    (this.projection && this.projection.unmount(),
      q(this.notifyUpdate),
      q(this.render),
      this.valueSubscriptions.forEach((e) => e()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent && this.parent.children.delete(this));
    for (const e in this.events) this.events[e].clear();
    for (const e in this.features) {
      const n = this.features[e];
      n && (n.unmount(), (n.isMounted = !1));
    }
    this.current = null;
  }
  bindToMotionValue(e, n) {
    this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)();
    const s = pt.has(e);
    s && this.onBindTransform && this.onBindTransform();
    const i = n.on("change", (r) => {
      ((this.latestValues[e] = r),
        this.props.onUpdate && V.preRender(this.notifyUpdate),
        s && this.projection && (this.projection.isTransformDirty = !0),
        this.scheduleRender());
    });
    let o;
    (window.MotionCheckAppearSync &&
      (o = window.MotionCheckAppearSync(this, e, n)),
      this.valueSubscriptions.set(e, () => {
        (i(), o && o(), n.owner && n.stop());
      }));
  }
  sortNodePosition(e) {
    return !this.current ||
      !this.sortInstanceNodePosition ||
      this.type !== e.type
      ? 0
      : this.sortInstanceNodePosition(this.current, e.current);
  }
  updateFeatures() {
    let e = "animation";
    for (e in ft) {
      const n = ft[e];
      if (!n) continue;
      const { isEnabled: s, Feature: i } = n;
      if (
        (!this.features[e] &&
          i &&
          s(this.props) &&
          (this.features[e] = new i(this)),
        this.features[e])
      ) {
        const o = this.features[e];
        o.isMounted ? o.update() : (o.mount(), (o.isMounted = !0));
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  measureViewportBox() {
    return this.current
      ? this.measureInstanceViewportBox(this.current, this.props)
      : D();
  }
  getStaticValue(e) {
    return this.latestValues[e];
  }
  setStaticValue(e, n) {
    this.latestValues[e] = n;
  }
  update(e, n) {
    ((e.transformTemplate || this.props.transformTemplate) &&
      this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = e),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = n));
    for (let s = 0; s < zn.length; s++) {
      const i = zn[s];
      this.propEventSubscriptions[i] &&
        (this.propEventSubscriptions[i](),
        delete this.propEventSubscriptions[i]);
      const o = "on" + i,
        r = e[o];
      r && (this.propEventSubscriptions[i] = this.on(i, r));
    }
    ((this.prevMotionValues = Ya(
      this,
      this.scrapeMotionValuesFromProps(e, this.prevProps, this),
      this.prevMotionValues,
    )),
      this.handleChildMotionValue && this.handleChildMotionValue());
  }
  getProps() {
    return this.props;
  }
  getVariant(e) {
    return this.props.variants ? this.props.variants[e] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode
      ? this
      : this.parent
        ? this.parent.getClosestVariantNode()
        : void 0;
  }
  addVariantChild(e) {
    const n = this.getClosestVariantNode();
    if (n)
      return (
        n.variantChildren && n.variantChildren.add(e),
        () => n.variantChildren.delete(e)
      );
  }
  addValue(e, n) {
    const s = this.values.get(e);
    n !== s &&
      (s && this.removeValue(e),
      this.bindToMotionValue(e, n),
      this.values.set(e, n),
      (this.latestValues[e] = n.get()));
  }
  removeValue(e) {
    this.values.delete(e);
    const n = this.valueSubscriptions.get(e);
    (n && (n(), this.valueSubscriptions.delete(e)),
      delete this.latestValues[e],
      this.removeValueFromRenderState(e, this.renderState));
  }
  hasValue(e) {
    return this.values.has(e);
  }
  getValue(e, n) {
    if (this.props.values && this.props.values[e]) return this.props.values[e];
    let s = this.values.get(e);
    return (
      s === void 0 &&
        n !== void 0 &&
        ((s = ht(n === null ? void 0 : n, { owner: this })),
        this.addValue(e, s)),
      s
    );
  }
  readValue(e, n) {
    let s =
      this.latestValues[e] !== void 0 || !this.current
        ? this.latestValues[e]
        : (this.getBaseTargetFromProps(this.props, e) ??
          this.readValueFromInstance(this.current, e, this.options));
    return (
      s != null &&
        (typeof s == "string" && (Ls(s) || Fs(s))
          ? (s = parseFloat(s))
          : !ua(s) && Z.test(n) && (s = pi(e, n)),
        this.setBaseTarget(e, k(s) ? s.get() : s)),
      k(s) ? s.get() : s
    );
  }
  setBaseTarget(e, n) {
    this.baseTarget[e] = n;
  }
  getBaseTarget(e) {
    const { initial: n } = this.props;
    let s;
    if (typeof n == "string" || typeof n == "object") {
      const o = cn(this.props, n, this.presenceContext?.custom);
      o && (s = o[e]);
    }
    if (n && s !== void 0) return s;
    const i = this.getBaseTargetFromProps(this.props, e);
    return i !== void 0 && !k(i)
      ? i
      : this.initialValues[e] !== void 0 && s === void 0
        ? void 0
        : this.baseTarget[e];
  }
  on(e, n) {
    return (
      this.events[e] || (this.events[e] = new We()),
      this.events[e].add(n)
    );
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
  scheduleRenderMicrotask() {
    nn.render(this.render);
  }
}
class Ui extends qa {
  constructor() {
    (super(...arguments), (this.KeyframeResolver = qo));
  }
  sortInstanceNodePosition(e, n) {
    return e.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(e, n) {
    return e.style ? e.style[n] : void 0;
  }
  removeValueFromRenderState(e, { vars: n, style: s }) {
    (delete n[e], delete s[e]);
  }
  handleChildMotionValue() {
    this.childSubscription &&
      (this.childSubscription(), delete this.childSubscription);
    const { children: e } = this.props;
    k(e) &&
      (this.childSubscription = e.on("change", (n) => {
        this.current && (this.current.textContent = `${n}`);
      }));
  }
}
function Wi(t, { style: e, vars: n }, s, i) {
  const o = t.style;
  let r;
  for (r in e) o[r] = e[r];
  i?.applyProjectionStyles(o, s);
  for (r in n) o.setProperty(r, n[r]);
}
function Za(t) {
  return window.getComputedStyle(t);
}
class Ja extends Ui {
  constructor() {
    (super(...arguments), (this.type = "html"), (this.renderInstance = Wi));
  }
  readValueFromInstance(e, n) {
    if (pt.has(n)) return this.projection?.isProjecting ? xe(n) : po(e, n);
    {
      const s = Za(e),
        i = (Ge(n) ? s.getPropertyValue(n) : s[n]) || 0;
      return typeof i == "string" ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return Oi(e, n);
  }
  build(e, n, s) {
    an(e, n, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return hn(e, n, s);
  }
}
const Ki = new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust",
]);
function Qa(t, e, n, s) {
  Wi(t, e, void 0, s);
  for (const i in e.attrs) t.setAttribute(Ki.has(i) ? i : fn(i), e.attrs[i]);
}
class tl extends Ui {
  constructor() {
    (super(...arguments),
      (this.type = "svg"),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = D));
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if (pt.has(n)) {
      const s = mi(n);
      return (s && s.default) || 0;
    }
    return ((n = Ki.has(n) ? n : fn(n)), e.getAttribute(n));
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return Ri(e, n, s);
  }
  build(e, n, s) {
    Mi(e, n, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(e, n, s, i) {
    Qa(e, n, s, i);
  }
  mount(e) {
    ((this.isSVGTag = Di(e.tagName)), super.mount(e));
  }
}
const el = (t, e) =>
  un(t) ? new tl(e) : new Ja(e, { allowProjection: t !== S.Fragment });
function Et(t, e, n) {
  const s = t.getProps();
  return cn(s, e, n !== void 0 ? n : s.custom, t);
}
const Ee = (t) => Array.isArray(t);
function nl(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, ht(n));
}
function sl(t) {
  return Ee(t) ? t[t.length - 1] || 0 : t;
}
function il(t, e) {
  const n = Et(t, e);
  let { transitionEnd: s = {}, transition: i = {}, ...o } = n || {};
  o = { ...o, ...s };
  for (const r in o) {
    const a = sl(o[r]);
    nl(t, r, a);
  }
}
function rl(t) {
  return !!(k(t) && t.add);
}
function Re(t, e) {
  const n = t.getValue("willChange");
  if (rl(n)) return n.add(e);
  if (!n && X.WillChange) {
    const s = new X.WillChange("auto");
    (t.addValue("willChange", s), s.add(e));
  }
}
function $i(t) {
  return t.props[Li];
}
const ol = (t) => t !== null;
function al(t, { repeat: e, repeatType: n = "loop" }, s) {
  const i = t.filter(ol),
    o = e && n !== "loop" && e % 2 === 1 ? 0 : i.length - 1;
  return i[o];
}
const ll = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
  ul = (t) => ({
    type: "spring",
    stiffness: 550,
    damping: t === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  cl = { type: "keyframes", duration: 0.8 },
  hl = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  fl = (t, { keyframes: e }) =>
    e.length > 2
      ? cl
      : pt.has(t)
        ? t.startsWith("scale")
          ? ul(e[1])
          : ll
        : hl;
function dl({
  when: t,
  delay: e,
  delayChildren: n,
  staggerChildren: s,
  staggerDirection: i,
  repeat: o,
  repeatType: r,
  repeatDelay: a,
  from: l,
  elapsed: c,
  ...u
}) {
  return !!Object.keys(u).length;
}
const dn =
  (t, e, n, s = {}, i, o) =>
  (r) => {
    const a = tn(s, t) || {},
      l = a.delay || s.delay || 0;
    let { elapsed: c = 0 } = s;
    c = c - $(l);
    const u = {
      keyframes: Array.isArray(n) ? n : [null, n],
      ease: "easeOut",
      velocity: e.getVelocity(),
      ...a,
      delay: -c,
      onUpdate: (f) => {
        (e.set(f), a.onUpdate && a.onUpdate(f));
      },
      onComplete: () => {
        (r(), a.onComplete && a.onComplete());
      },
      name: t,
      motionValue: e,
      element: o ? void 0 : i,
    };
    (dl(a) || Object.assign(u, fl(t, u)),
      u.duration && (u.duration = $(u.duration)),
      u.repeatDelay && (u.repeatDelay = $(u.repeatDelay)),
      u.from !== void 0 && (u.keyframes[0] = u.from));
    let h = !1;
    if (
      ((u.type === !1 || (u.duration === 0 && !u.repeatDelay)) &&
        (we(u), u.delay === 0 && (h = !0)),
      (X.instantAnimations || X.skipAnimations) &&
        ((h = !0), we(u), (u.delay = 0)),
      (u.allowFlatten = !a.type && !a.ease),
      h && !o && e.get() !== void 0)
    ) {
      const f = al(u.keyframes, a);
      if (f !== void 0) {
        V.update(() => {
          (u.onUpdate(f), u.onComplete());
        });
        return;
      }
    }
    return a.isSync ? new Je(u) : new Oo(u);
  };
function ml({ protectedKeys: t, needsAnimating: e }, n) {
  const s = t.hasOwnProperty(n) && e[n] !== !0;
  return ((e[n] = !1), s);
}
function Gi(t, e, { delay: n = 0, transitionOverride: s, type: i } = {}) {
  let { transition: o = t.getDefaultTransition(), transitionEnd: r, ...a } = e;
  s && (o = s);
  const l = [],
    c = i && t.animationState && t.animationState.getState()[i];
  for (const u in a) {
    const h = t.getValue(u, t.latestValues[u] ?? null),
      f = a[u];
    if (f === void 0 || (c && ml(c, u))) continue;
    const d = { delay: n, ...tn(o || {}, u) },
      m = h.get();
    if (
      m !== void 0 &&
      !h.isAnimating &&
      !Array.isArray(f) &&
      f === m &&
      !d.velocity
    )
      continue;
    let v = !1;
    if (window.MotionHandoffAnimation) {
      const p = $i(t);
      if (p) {
        const T = window.MotionHandoffAnimation(p, u, V);
        T !== null && ((d.startTime = T), (v = !0));
      }
    }
    (Re(t, u),
      h.start(
        dn(u, h, f, t.shouldReduceMotion && hi.has(u) ? { type: !1 } : d, t, v),
      ));
    const y = h.animation;
    y && l.push(y);
  }
  return (
    r &&
      Promise.all(l).then(() => {
        V.update(() => {
          r && il(t, r);
        });
      }),
    l
  );
}
function Le(t, e, n = {}) {
  const s = Et(t, e, n.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: i = t.getDefaultTransition() || {} } = s || {};
  n.transitionOverride && (i = n.transitionOverride);
  const o = s ? () => Promise.all(Gi(t, s, n)) : () => Promise.resolve(),
    r =
      t.variantChildren && t.variantChildren.size
        ? (l = 0) => {
            const {
              delayChildren: c = 0,
              staggerChildren: u,
              staggerDirection: h,
            } = i;
            return pl(t, e, l, c, u, h, n);
          }
        : () => Promise.resolve(),
    { when: a } = i;
  if (a) {
    const [l, c] = a === "beforeChildren" ? [o, r] : [r, o];
    return l().then(() => c());
  } else return Promise.all([o(), r(n.delay)]);
}
function pl(t, e, n = 0, s = 0, i = 0, o = 1, r) {
  const a = [],
    l = t.variantChildren.size,
    c = (l - 1) * i,
    u = typeof s == "function",
    h = u ? (f) => s(f, l) : o === 1 ? (f = 0) => f * i : (f = 0) => c - f * i;
  return (
    Array.from(t.variantChildren)
      .sort(gl)
      .forEach((f, d) => {
        (f.notify("AnimationStart", e),
          a.push(
            Le(f, e, { ...r, delay: n + (u ? 0 : s) + h(d) }).then(() =>
              f.notify("AnimationComplete", e),
            ),
          ));
      }),
    Promise.all(a)
  );
}
function gl(t, e) {
  return t.sortNodePosition(e);
}
function yl(t, e, n = {}) {
  t.notify("AnimationStart", e);
  let s;
  if (Array.isArray(e)) {
    const i = e.map((o) => Le(t, o, n));
    s = Promise.all(i);
  } else if (typeof e == "string") s = Le(t, e, n);
  else {
    const i = typeof e == "function" ? Et(t, e, n.custom) : e;
    s = Promise.all(Gi(t, i, n));
  }
  return s.then(() => {
    t.notify("AnimationComplete", e);
  });
}
function _i(t, e) {
  if (!Array.isArray(e)) return !1;
  const n = e.length;
  if (n !== t.length) return !1;
  for (let s = 0; s < n; s++) if (e[s] !== t[s]) return !1;
  return !0;
}
const vl = on.length;
function Hi(t) {
  if (!t) return;
  if (!t.isControllingVariants) {
    const n = t.parent ? Hi(t.parent) || {} : {};
    return (t.props.initial !== void 0 && (n.initial = t.props.initial), n);
  }
  const e = {};
  for (let n = 0; n < vl; n++) {
    const s = on[n],
      i = t.props[s];
    (Ct(i) || i === !1) && (e[s] = i);
  }
  return e;
}
const Tl = [...rn].reverse(),
  xl = rn.length;
function Pl(t) {
  return (e) =>
    Promise.all(e.map(({ animation: n, options: s }) => yl(t, n, s)));
}
function Sl(t) {
  let e = Pl(t),
    n = Xn(),
    s = !0;
  const i = (l) => (c, u) => {
    const h = Et(t, u, l === "exit" ? t.presenceContext?.custom : void 0);
    if (h) {
      const { transition: f, transitionEnd: d, ...m } = h;
      c = { ...c, ...m, ...d };
    }
    return c;
  };
  function o(l) {
    e = l(t);
  }
  function r(l) {
    const { props: c } = t,
      u = Hi(t.parent) || {},
      h = [],
      f = new Set();
    let d = {},
      m = 1 / 0;
    for (let y = 0; y < xl; y++) {
      const p = Tl[y],
        T = n[p],
        g = c[p] !== void 0 ? c[p] : u[p],
        b = Ct(g),
        P = p === l ? T.isActive : null;
      P === !1 && (m = y);
      let w = g === u[p] && g !== c[p] && b;
      if (
        (w && s && t.manuallyAnimateOnMount && (w = !1),
        (T.protectedKeys = { ...d }),
        (!T.isActive && P === null) ||
          (!g && !T.prevProp) ||
          Yt(g) ||
          typeof g == "boolean")
      )
        continue;
      const R = Al(T.prevProp, g);
      let A = R || (p === l && T.isActive && !w && b) || (y > m && b),
        I = !1;
      const O = Array.isArray(g) ? g : [g];
      let rt = O.reduce(i(p), {});
      P === !1 && (rt = {});
      const { prevResolvedValues: mn = {} } = T,
        ar = { ...mn, ...rt },
        pn = (F) => {
          ((A = !0),
            f.has(F) && ((I = !0), f.delete(F)),
            (T.needsAnimating[F] = !0));
          const H = t.getValue(F);
          H && (H.liveStyle = !1);
        };
      for (const F in ar) {
        const H = rt[F],
          Zt = mn[F];
        if (d.hasOwnProperty(F)) continue;
        let Jt = !1;
        (Ee(H) && Ee(Zt) ? (Jt = !_i(H, Zt)) : (Jt = H !== Zt),
          Jt
            ? H != null
              ? pn(F)
              : f.add(F)
            : H !== void 0 && f.has(F)
              ? pn(F)
              : (T.protectedKeys[F] = !0));
      }
      ((T.prevProp = g),
        (T.prevResolvedValues = rt),
        T.isActive && (d = { ...d, ...rt }),
        s && t.blockInitialAnimation && (A = !1),
        A &&
          (!(w && R) || I) &&
          h.push(...O.map((F) => ({ animation: F, options: { type: p } }))));
    }
    if (f.size) {
      const y = {};
      if (typeof c.initial != "boolean") {
        const p = Et(t, Array.isArray(c.initial) ? c.initial[0] : c.initial);
        p && p.transition && (y.transition = p.transition);
      }
      (f.forEach((p) => {
        const T = t.getBaseTarget(p),
          g = t.getValue(p);
        (g && (g.liveStyle = !0), (y[p] = T ?? null));
      }),
        h.push({ animation: y }));
    }
    let v = !!h.length;
    return (
      s &&
        (c.initial === !1 || c.initial === c.animate) &&
        !t.manuallyAnimateOnMount &&
        (v = !1),
      (s = !1),
      v ? e(h) : Promise.resolve()
    );
  }
  function a(l, c) {
    if (n[l].isActive === c) return Promise.resolve();
    (t.variantChildren?.forEach((h) => h.animationState?.setActive(l, c)),
      (n[l].isActive = c));
    const u = r(l);
    for (const h in n) n[h].protectedKeys = {};
    return u;
  }
  return {
    animateChanges: r,
    setActive: a,
    setAnimateFunction: o,
    getState: () => n,
    reset: () => {
      ((n = Xn()), (s = !0));
    },
  };
}
function Al(t, e) {
  return typeof e == "string" ? e !== t : Array.isArray(e) ? !_i(e, t) : !1;
}
function Q(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  };
}
function Xn() {
  return {
    animate: Q(!0),
    whileInView: Q(),
    whileHover: Q(),
    whileTap: Q(),
    whileDrag: Q(),
    whileFocus: Q(),
    exit: Q(),
  };
}
class J {
  constructor(e) {
    ((this.isMounted = !1), (this.node = e));
  }
  update() {}
}
class bl extends J {
  constructor(e) {
    (super(e), e.animationState || (e.animationState = Sl(e)));
  }
  updateAnimationControlsSubscription() {
    const { animate: e } = this.node.getProps();
    Yt(e) && (this.unmountControls = e.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: e } = this.node.getProps(),
      { animate: n } = this.node.prevProps || {};
    e !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
    (this.node.animationState.reset(), this.unmountControls?.());
  }
}
let wl = 0;
class Vl extends J {
  constructor() {
    (super(...arguments), (this.id = wl++));
  }
  update() {
    if (!this.node.presenceContext) return;
    const { isPresent: e, onExitComplete: n } = this.node.presenceContext,
      { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || e === s) return;
    const i = this.node.animationState.setActive("exit", !e);
    n &&
      !e &&
      i.then(() => {
        n(this.id);
      });
  }
  mount() {
    const { register: e, onExitComplete: n } = this.node.presenceContext || {};
    (n && n(this.id), e && (this.unmount = e(this.id)));
  }
  unmount() {}
}
const Ml = { animation: { Feature: bl }, exit: { Feature: Vl } };
function Rt(t, e, n, s = { passive: !0 }) {
  return (t.addEventListener(e, n, s), () => t.removeEventListener(e, n));
}
function Bt(t) {
  return { point: { x: t.pageX, y: t.pageY } };
}
const Cl = (t) => (e) => sn(e) && t(e, Bt(e));
function Pt(t, e, n, s) {
  return Rt(t, e, Cl(n), s);
}
const zi = 1e-4,
  Dl = 1 - zi,
  El = 1 + zi,
  Xi = 0.01,
  Rl = 0 - Xi,
  Ll = 0 + Xi;
function B(t) {
  return t.max - t.min;
}
function kl(t, e, n) {
  return Math.abs(t - e) <= n;
}
function Yn(t, e, n, s = 0.5) {
  ((t.origin = s),
    (t.originPoint = M(e.min, e.max, t.origin)),
    (t.scale = B(n) / B(e)),
    (t.translate = M(n.min, n.max, t.origin) - t.originPoint),
    ((t.scale >= Dl && t.scale <= El) || isNaN(t.scale)) && (t.scale = 1),
    ((t.translate >= Rl && t.translate <= Ll) || isNaN(t.translate)) &&
      (t.translate = 0));
}
function St(t, e, n, s) {
  (Yn(t.x, e.x, n.x, s ? s.originX : void 0),
    Yn(t.y, e.y, n.y, s ? s.originY : void 0));
}
function qn(t, e, n) {
  ((t.min = n.min + e.min), (t.max = t.min + B(e)));
}
function Fl(t, e, n) {
  (qn(t.x, e.x, n.x), qn(t.y, e.y, n.y));
}
function Zn(t, e, n) {
  ((t.min = e.min - n.min), (t.max = t.min + B(e)));
}
function At(t, e, n) {
  (Zn(t.x, e.x, n.x), Zn(t.y, e.y, n.y));
}
function U(t) {
  return [t("x"), t("y")];
}
const Yi = ({ current: t }) => (t ? t.ownerDocument.defaultView : null),
  Jn = (t, e) => Math.abs(t - e);
function Bl(t, e) {
  const n = Jn(t.x, e.x),
    s = Jn(t.y, e.y);
  return Math.sqrt(n ** 2 + s ** 2);
}
class qi {
  constructor(
    e,
    n,
    {
      transformPagePoint: s,
      contextWindow: i = window,
      dragSnapToOrigin: o = !1,
      distanceThreshold: r = 3,
    } = {},
  ) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        const f = ue(this.lastMoveEventInfo, this.history),
          d = this.startEvent !== null,
          m = Bl(f.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
        if (!d && !m) return;
        const { point: v } = f,
          { timestamp: y } = L;
        this.history.push({ ...v, timestamp: y });
        const { onStart: p, onMove: T } = this.handlers;
        (d ||
          (p && p(this.lastMoveEvent, f),
          (this.startEvent = this.lastMoveEvent)),
          T && T(this.lastMoveEvent, f));
      }),
      (this.handlePointerMove = (f, d) => {
        ((this.lastMoveEvent = f),
          (this.lastMoveEventInfo = le(d, this.transformPagePoint)),
          V.update(this.updatePoint, !0));
      }),
      (this.handlePointerUp = (f, d) => {
        this.end();
        const { onEnd: m, onSessionEnd: v, resumeAnimation: y } = this.handlers;
        if (
          (this.dragSnapToOrigin && y && y(),
          !(this.lastMoveEvent && this.lastMoveEventInfo))
        )
          return;
        const p = ue(
          f.type === "pointercancel"
            ? this.lastMoveEventInfo
            : le(d, this.transformPagePoint),
          this.history,
        );
        (this.startEvent && m && m(f, p), v && v(f, p));
      }),
      !sn(e))
    )
      return;
    ((this.dragSnapToOrigin = o),
      (this.handlers = n),
      (this.transformPagePoint = s),
      (this.distanceThreshold = r),
      (this.contextWindow = i || window));
    const a = Bt(e),
      l = le(a, this.transformPagePoint),
      { point: c } = l,
      { timestamp: u } = L;
    this.history = [{ ...c, timestamp: u }];
    const { onSessionStart: h } = n;
    (h && h(e, ue(l, this.history)),
      (this.removeListeners = Lt(
        Pt(this.contextWindow, "pointermove", this.handlePointerMove),
        Pt(this.contextWindow, "pointerup", this.handlePointerUp),
        Pt(this.contextWindow, "pointercancel", this.handlePointerUp),
      )));
  }
  updateHandlers(e) {
    this.handlers = e;
  }
  end() {
    (this.removeListeners && this.removeListeners(), q(this.updatePoint));
  }
}
function le(t, e) {
  return e ? { point: e(t.point) } : t;
}
function Qn(t, e) {
  return { x: t.x - e.x, y: t.y - e.y };
}
function ue({ point: t }, e) {
  return {
    point: t,
    delta: Qn(t, Zi(e)),
    offset: Qn(t, Il(e)),
    velocity: jl(e, 0.1),
  };
}
function Il(t) {
  return t[0];
}
function Zi(t) {
  return t[t.length - 1];
}
function jl(t, e) {
  if (t.length < 2) return { x: 0, y: 0 };
  let n = t.length - 1,
    s = null;
  const i = Zi(t);
  for (; n >= 0 && ((s = t[n]), !(i.timestamp - s.timestamp > $(e))); ) n--;
  if (!s) return { x: 0, y: 0 };
  const o = G(i.timestamp - s.timestamp);
  if (o === 0) return { x: 0, y: 0 };
  const r = { x: (i.x - s.x) / o, y: (i.y - s.y) / o };
  return (r.x === 1 / 0 && (r.x = 0), r.y === 1 / 0 && (r.y = 0), r);
}
function Ol(t, { min: e, max: n }, s) {
  return (
    e !== void 0 && t < e
      ? (t = s ? M(e, t, s.min) : Math.max(t, e))
      : n !== void 0 && t > n && (t = s ? M(n, t, s.max) : Math.min(t, n)),
    t
  );
}
function ts(t, e, n) {
  return {
    min: e !== void 0 ? t.min + e : void 0,
    max: n !== void 0 ? t.max + n - (t.max - t.min) : void 0,
  };
}
function Nl(t, { top: e, left: n, bottom: s, right: i }) {
  return { x: ts(t.x, n, i), y: ts(t.y, e, s) };
}
function es(t, e) {
  let n = e.min - t.min,
    s = e.max - t.max;
  return (
    e.max - e.min < t.max - t.min && ([n, s] = [s, n]),
    { min: n, max: s }
  );
}
function Ul(t, e) {
  return { x: es(t.x, e.x), y: es(t.y, e.y) };
}
function Wl(t, e) {
  let n = 0.5;
  const s = B(t),
    i = B(e);
  return (
    i > s
      ? (n = wt(e.min, e.max - s, t.min))
      : s > i && (n = wt(t.min, t.max - i, e.min)),
    z(0, 1, n)
  );
}
function Kl(t, e) {
  const n = {};
  return (
    e.min !== void 0 && (n.min = e.min - t.min),
    e.max !== void 0 && (n.max = e.max - t.min),
    n
  );
}
const ke = 0.35;
function $l(t = ke) {
  return (
    t === !1 ? (t = 0) : t === !0 && (t = ke),
    { x: ns(t, "left", "right"), y: ns(t, "top", "bottom") }
  );
}
function ns(t, e, n) {
  return { min: ss(t, e), max: ss(t, n) };
}
function ss(t, e) {
  return typeof t == "number" ? t : t[e] || 0;
}
const Gl = new WeakMap();
class _l {
  constructor(e) {
    ((this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = D()),
      (this.latestPointerEvent = null),
      (this.latestPanInfo = null),
      (this.visualElement = e));
  }
  start(e, { snapToCursor: n = !1, distanceThreshold: s } = {}) {
    const { presenceContext: i } = this.visualElement;
    if (i && i.isPresent === !1) return;
    const o = (h) => {
        const { dragSnapToOrigin: f } = this.getProps();
        (f ? this.pauseAnimation() : this.stopAnimation(),
          n && this.snapToCursor(Bt(h).point));
      },
      r = (h, f) => {
        const { drag: d, dragPropagation: m, onDragStart: v } = this.getProps();
        if (
          d &&
          !m &&
          (this.openDragLock && this.openDragLock(),
          (this.openDragLock = ea(d)),
          !this.openDragLock)
        )
          return;
        ((this.latestPointerEvent = h),
          (this.latestPanInfo = f),
          (this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          U((p) => {
            let T = this.getAxisMotionValue(p).get() || 0;
            if (_.test(T)) {
              const { projection: g } = this.visualElement;
              if (g && g.layout) {
                const b = g.layout.layoutBox[p];
                b && (T = B(b) * (parseFloat(T) / 100));
              }
            }
            this.originPoint[p] = T;
          }),
          v && V.postRender(() => v(h, f)),
          Re(this.visualElement, "transform"));
        const { animationState: y } = this.visualElement;
        y && y.setActive("whileDrag", !0);
      },
      a = (h, f) => {
        ((this.latestPointerEvent = h), (this.latestPanInfo = f));
        const {
          dragPropagation: d,
          dragDirectionLock: m,
          onDirectionLock: v,
          onDrag: y,
        } = this.getProps();
        if (!d && !this.openDragLock) return;
        const { offset: p } = f;
        if (m && this.currentDirection === null) {
          ((this.currentDirection = Hl(p)),
            this.currentDirection !== null && v && v(this.currentDirection));
          return;
        }
        (this.updateAxis("x", f.point, p),
          this.updateAxis("y", f.point, p),
          this.visualElement.render(),
          y && y(h, f));
      },
      l = (h, f) => {
        ((this.latestPointerEvent = h),
          (this.latestPanInfo = f),
          this.stop(h, f),
          (this.latestPointerEvent = null),
          (this.latestPanInfo = null));
      },
      c = () =>
        U(
          (h) =>
            this.getAnimationState(h) === "paused" &&
            this.getAxisMotionValue(h).animation?.play(),
        ),
      { dragSnapToOrigin: u } = this.getProps();
    this.panSession = new qi(
      e,
      {
        onSessionStart: o,
        onStart: r,
        onMove: a,
        onSessionEnd: l,
        resumeAnimation: c,
      },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: u,
        distanceThreshold: s,
        contextWindow: Yi(this.visualElement),
      },
    );
  }
  stop(e, n) {
    const s = e || this.latestPointerEvent,
      i = n || this.latestPanInfo,
      o = this.isDragging;
    if ((this.cancel(), !o || !i || !s)) return;
    const { velocity: r } = i;
    this.startAnimation(r);
    const { onDragEnd: a } = this.getProps();
    a && V.postRender(() => a(s, i));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: e, animationState: n } = this.visualElement;
    (e && (e.isAnimationBlocked = !1),
      this.panSession && this.panSession.end(),
      (this.panSession = void 0));
    const { dragPropagation: s } = this.getProps();
    (!s &&
      this.openDragLock &&
      (this.openDragLock(), (this.openDragLock = null)),
      n && n.setActive("whileDrag", !1));
  }
  updateAxis(e, n, s) {
    const { drag: i } = this.getProps();
    if (!s || !Ot(e, i, this.currentDirection)) return;
    const o = this.getAxisMotionValue(e);
    let r = this.originPoint[e] + s[e];
    (this.constraints &&
      this.constraints[e] &&
      (r = Ol(r, this.constraints[e], this.elastic[e])),
      o.set(r));
  }
  resolveConstraints() {
    const { dragConstraints: e, dragElastic: n } = this.getProps(),
      s =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : this.visualElement.projection?.layout,
      i = this.constraints;
    (e && at(e)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : e && s
        ? (this.constraints = Nl(s.layoutBox, e))
        : (this.constraints = !1),
      (this.elastic = $l(n)),
      i !== this.constraints &&
        s &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        U((o) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(o) &&
            (this.constraints[o] = Kl(s.layoutBox[o], this.constraints[o]));
        }));
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: n } = this.getProps();
    if (!e || !at(e)) return !1;
    const s = e.current,
      { projection: i } = this.visualElement;
    if (!i || !i.layout) return !1;
    const o = Ha(s, i.root, this.visualElement.getTransformPagePoint());
    let r = Ul(i.layout.layoutBox, o);
    if (n) {
      const a = n($a(r));
      ((this.hasMutatedConstraints = !!a), a && (r = Bi(a)));
    }
    return r;
  }
  startAnimation(e) {
    const {
        drag: n,
        dragMomentum: s,
        dragElastic: i,
        dragTransition: o,
        dragSnapToOrigin: r,
        onDragTransitionEnd: a,
      } = this.getProps(),
      l = this.constraints || {},
      c = U((u) => {
        if (!Ot(u, n, this.currentDirection)) return;
        let h = (l && l[u]) || {};
        r && (h = { min: 0, max: 0 });
        const f = i ? 200 : 1e6,
          d = i ? 40 : 1e7,
          m = {
            type: "inertia",
            velocity: s ? e[u] : 0,
            bounceStiffness: f,
            bounceDamping: d,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...o,
            ...h,
          };
        return this.startAxisValueAnimation(u, m);
      });
    return Promise.all(c).then(a);
  }
  startAxisValueAnimation(e, n) {
    const s = this.getAxisMotionValue(e);
    return (
      Re(this.visualElement, e),
      s.start(dn(e, s, 0, n, this.visualElement, !1))
    );
  }
  stopAnimation() {
    U((e) => this.getAxisMotionValue(e).stop());
  }
  pauseAnimation() {
    U((e) => this.getAxisMotionValue(e).animation?.pause());
  }
  getAnimationState(e) {
    return this.getAxisMotionValue(e).animation?.state;
  }
  getAxisMotionValue(e) {
    const n = `_drag${e.toUpperCase()}`,
      s = this.visualElement.getProps(),
      i = s[n];
    return (
      i ||
      this.visualElement.getValue(e, (s.initial ? s.initial[e] : void 0) || 0)
    );
  }
  snapToCursor(e) {
    U((n) => {
      const { drag: s } = this.getProps();
      if (!Ot(n, s, this.currentDirection)) return;
      const { projection: i } = this.visualElement,
        o = this.getAxisMotionValue(n);
      if (i && i.layout) {
        const { min: r, max: a } = i.layout.layoutBox[n];
        o.set(e[n] - M(r, a, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag: e, dragConstraints: n } = this.getProps(),
      { projection: s } = this.visualElement;
    if (!at(n) || !s || !this.constraints) return;
    this.stopAnimation();
    const i = { x: 0, y: 0 };
    U((r) => {
      const a = this.getAxisMotionValue(r);
      if (a && this.constraints !== !1) {
        const l = a.get();
        i[r] = Wl({ min: l, max: l }, this.constraints[r]);
      }
    });
    const { transformTemplate: o } = this.visualElement.getProps();
    ((this.visualElement.current.style.transform = o ? o({}, "") : "none"),
      s.root && s.root.updateScroll(),
      s.updateLayout(),
      this.resolveConstraints(),
      U((r) => {
        if (!Ot(r, e, null)) return;
        const a = this.getAxisMotionValue(r),
          { min: l, max: c } = this.constraints[r];
        a.set(M(l, c, i[r]));
      }));
  }
  addListeners() {
    if (!this.visualElement.current) return;
    Gl.set(this.visualElement, this);
    const e = this.visualElement.current,
      n = Pt(e, "pointerdown", (l) => {
        const { drag: c, dragListener: u = !0 } = this.getProps();
        c && u && this.start(l);
      }),
      s = () => {
        const { dragConstraints: l } = this.getProps();
        at(l) && l.current && (this.constraints = this.resolveRefConstraints());
      },
      { projection: i } = this.visualElement,
      o = i.addEventListener("measure", s);
    (i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()),
      V.read(s));
    const r = Rt(window, "resize", () => this.scalePositionWithinConstraints()),
      a = i.addEventListener(
        "didUpdate",
        ({ delta: l, hasLayoutChanged: c }) => {
          this.isDragging &&
            c &&
            (U((u) => {
              const h = this.getAxisMotionValue(u);
              h &&
                ((this.originPoint[u] += l[u].translate),
                h.set(h.get() + l[u].translate));
            }),
            this.visualElement.render());
        },
      );
    return () => {
      (r(), n(), o(), a && a());
    };
  }
  getProps() {
    const e = this.visualElement.getProps(),
      {
        drag: n = !1,
        dragDirectionLock: s = !1,
        dragPropagation: i = !1,
        dragConstraints: o = !1,
        dragElastic: r = ke,
        dragMomentum: a = !0,
      } = e;
    return {
      ...e,
      drag: n,
      dragDirectionLock: s,
      dragPropagation: i,
      dragConstraints: o,
      dragElastic: r,
      dragMomentum: a,
    };
  }
}
function Ot(t, e, n) {
  return (e === !0 || e === t) && (n === null || n === t);
}
function Hl(t, e = 10) {
  let n = null;
  return (Math.abs(t.y) > e ? (n = "y") : Math.abs(t.x) > e && (n = "x"), n);
}
class zl extends J {
  constructor(e) {
    (super(e),
      (this.removeGroupControls = W),
      (this.removeListeners = W),
      (this.controls = new _l(e)));
  }
  mount() {
    const { dragControls: e } = this.node.getProps();
    (e && (this.removeGroupControls = e.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || W));
  }
  unmount() {
    (this.removeGroupControls(), this.removeListeners());
  }
}
const is = (t) => (e, n) => {
  t && V.postRender(() => t(e, n));
};
class Xl extends J {
  constructor() {
    (super(...arguments), (this.removePointerDownListener = W));
  }
  onPointerDown(e) {
    this.session = new qi(e, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Yi(this.node),
    });
  }
  createPanHandlers() {
    const {
      onPanSessionStart: e,
      onPanStart: n,
      onPan: s,
      onPanEnd: i,
    } = this.node.getProps();
    return {
      onSessionStart: is(e),
      onStart: is(n),
      onMove: s,
      onEnd: (o, r) => {
        (delete this.session, i && V.postRender(() => i(o, r)));
      },
    };
  }
  mount() {
    this.removePointerDownListener = Pt(this.node.current, "pointerdown", (e) =>
      this.onPointerDown(e),
    );
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    (this.removePointerDownListener(), this.session && this.session.end());
  }
}
const Kt = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
function rs(t, e) {
  return e.max === e.min ? 0 : (t / (e.max - e.min)) * 100;
}
const yt = {
    correct: (t, e) => {
      if (!e.target) return t;
      if (typeof t == "string")
        if (x.test(t)) t = parseFloat(t);
        else return t;
      const n = rs(t, e.target.x),
        s = rs(t, e.target.y);
      return `${n}% ${s}%`;
    },
  },
  Yl = {
    correct: (t, { treeScale: e, projectionDelta: n }) => {
      const s = t,
        i = Z.parse(t);
      if (i.length > 5) return s;
      const o = Z.createTransformer(t),
        r = typeof i[0] != "number" ? 1 : 0,
        a = n.x.scale * e.x,
        l = n.y.scale * e.y;
      ((i[0 + r] /= a), (i[1 + r] /= l));
      const c = M(a, l, 0.5);
      return (
        typeof i[2 + r] == "number" && (i[2 + r] /= c),
        typeof i[3 + r] == "number" && (i[3 + r] /= c),
        o(i)
      );
    },
  };
let os = !1;
class ql extends S.Component {
  componentDidMount() {
    const {
        visualElement: e,
        layoutGroup: n,
        switchLayoutGroup: s,
        layoutId: i,
      } = this.props,
      { projection: o } = e;
    (ya(Zl),
      o &&
        (n.group && n.group.add(o),
        s && s.register && i && s.register(o),
        os && o.root.didUpdate(),
        o.addEventListener("animationComplete", () => {
          this.safeToRemove();
        }),
        o.setOptions({
          ...o.options,
          onExitComplete: () => this.safeToRemove(),
        })),
      (Kt.hasEverUpdated = !0));
  }
  getSnapshotBeforeUpdate(e) {
    const {
        layoutDependency: n,
        visualElement: s,
        drag: i,
        isPresent: o,
      } = this.props,
      { projection: r } = s;
    return (
      r &&
        ((r.isPresent = o),
        (os = !0),
        i || e.layoutDependency !== n || n === void 0 || e.isPresent !== o
          ? r.willUpdate()
          : this.safeToRemove(),
        e.isPresent !== o &&
          (o
            ? r.promote()
            : r.relegate() ||
              V.postRender(() => {
                const a = r.getStack();
                (!a || !a.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const { projection: e } = this.props.visualElement;
    e &&
      (e.root.didUpdate(),
      nn.postRender(() => {
        !e.currentAnimation && e.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    const {
        visualElement: e,
        layoutGroup: n,
        switchLayoutGroup: s,
      } = this.props,
      { projection: i } = e;
    i &&
      (i.scheduleCheckAfterUnmount(),
      n && n.group && n.group.remove(i),
      s && s.deregister && s.deregister(i));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function Ji(t) {
  const [e, n] = ca(),
    s = S.useContext(Rs);
  return bt.jsx(ql, {
    ...t,
    layoutGroup: s,
    switchLayoutGroup: S.useContext(ki),
    isPresent: e,
    safeToRemove: n,
  });
}
const Zl = {
  borderRadius: {
    ...yt,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius",
    ],
  },
  borderTopLeftRadius: yt,
  borderTopRightRadius: yt,
  borderBottomLeftRadius: yt,
  borderBottomRightRadius: yt,
  boxShadow: Yl,
};
function Jl(t, e, n) {
  const s = k(t) ? t : ht(t);
  return (s.start(dn("", s, e, n)), s.animation);
}
const Ql = (t, e) => t.depth - e.depth;
class tu {
  constructor() {
    ((this.children = []), (this.isDirty = !1));
  }
  add(e) {
    (je(this.children, e), (this.isDirty = !0));
  }
  remove(e) {
    (Oe(this.children, e), (this.isDirty = !0));
  }
  forEach(e) {
    (this.isDirty && this.children.sort(Ql),
      (this.isDirty = !1),
      this.children.forEach(e));
  }
}
function eu(t, e) {
  const n = j.now(),
    s = ({ timestamp: i }) => {
      const o = i - n;
      o >= e && (q(s), t(o - e));
    };
  return (V.setup(s, !0), () => q(s));
}
const Qi = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
  nu = Qi.length,
  as = (t) => (typeof t == "string" ? parseFloat(t) : t),
  ls = (t) => typeof t == "number" || x.test(t);
function su(t, e, n, s, i, o) {
  i
    ? ((t.opacity = M(0, n.opacity ?? 1, iu(s))),
      (t.opacityExit = M(e.opacity ?? 1, 0, ru(s))))
    : o && (t.opacity = M(e.opacity ?? 1, n.opacity ?? 1, s));
  for (let r = 0; r < nu; r++) {
    const a = `border${Qi[r]}Radius`;
    let l = us(e, a),
      c = us(n, a);
    if (l === void 0 && c === void 0) continue;
    (l || (l = 0),
      c || (c = 0),
      l === 0 || c === 0 || ls(l) === ls(c)
        ? ((t[a] = Math.max(M(as(l), as(c), s), 0)),
          (_.test(c) || _.test(l)) && (t[a] += "%"))
        : (t[a] = c));
  }
  (e.rotate || n.rotate) && (t.rotate = M(e.rotate || 0, n.rotate || 0, s));
}
function us(t, e) {
  return t[e] !== void 0 ? t[e] : t.borderRadius;
}
const iu = tr(0, 0.5, Ks),
  ru = tr(0.5, 0.95, W);
function tr(t, e, n) {
  return (s) => (s < t ? 0 : s > e ? 1 : n(wt(t, e, s)));
}
function cs(t, e) {
  ((t.min = e.min), (t.max = e.max));
}
function N(t, e) {
  (cs(t.x, e.x), cs(t.y, e.y));
}
function hs(t, e) {
  ((t.translate = e.translate),
    (t.scale = e.scale),
    (t.originPoint = e.originPoint),
    (t.origin = e.origin));
}
function fs(t, e, n, s, i) {
  return (
    (t -= e),
    (t = zt(t, 1 / n, s)),
    i !== void 0 && (t = zt(t, 1 / i, s)),
    t
  );
}
function ou(t, e = 0, n = 1, s = 0.5, i, o = t, r = t) {
  if (
    (_.test(e) && ((e = parseFloat(e)), (e = M(r.min, r.max, e / 100) - r.min)),
    typeof e != "number")
  )
    return;
  let a = M(o.min, o.max, s);
  (t === o && (a -= e),
    (t.min = fs(t.min, e, n, a, i)),
    (t.max = fs(t.max, e, n, a, i)));
}
function ds(t, e, [n, s, i], o, r) {
  ou(t, e[n], e[s], e[i], e.scale, o, r);
}
const au = ["x", "scaleX", "originX"],
  lu = ["y", "scaleY", "originY"];
function ms(t, e, n, s) {
  (ds(t.x, e, au, n ? n.x : void 0, s ? s.x : void 0),
    ds(t.y, e, lu, n ? n.y : void 0, s ? s.y : void 0));
}
function ps(t) {
  return t.translate === 0 && t.scale === 1;
}
function er(t) {
  return ps(t.x) && ps(t.y);
}
function gs(t, e) {
  return t.min === e.min && t.max === e.max;
}
function uu(t, e) {
  return gs(t.x, e.x) && gs(t.y, e.y);
}
function ys(t, e) {
  return (
    Math.round(t.min) === Math.round(e.min) &&
    Math.round(t.max) === Math.round(e.max)
  );
}
function nr(t, e) {
  return ys(t.x, e.x) && ys(t.y, e.y);
}
function vs(t) {
  return B(t.x) / B(t.y);
}
function Ts(t, e) {
  return (
    t.translate === e.translate &&
    t.scale === e.scale &&
    t.originPoint === e.originPoint
  );
}
class cu {
  constructor() {
    this.members = [];
  }
  add(e) {
    (je(this.members, e), e.scheduleRender());
  }
  remove(e) {
    if (
      (Oe(this.members, e),
      e === this.prevLead && (this.prevLead = void 0),
      e === this.lead)
    ) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(e) {
    const n = this.members.findIndex((i) => e === i);
    if (n === 0) return !1;
    let s;
    for (let i = n; i >= 0; i--) {
      const o = this.members[i];
      if (o.isPresent !== !1) {
        s = o;
        break;
      }
    }
    return s ? (this.promote(s), !0) : !1;
  }
  promote(e, n) {
    const s = this.lead;
    if (e !== s && ((this.prevLead = s), (this.lead = e), e.show(), s)) {
      (s.instance && s.scheduleRender(),
        e.scheduleRender(),
        (e.resumeFrom = s),
        n && (e.resumeFrom.preserveOpacity = !0),
        s.snapshot &&
          ((e.snapshot = s.snapshot),
          (e.snapshot.latestValues = s.animationValues || s.latestValues)),
        e.root && e.root.isUpdating && (e.isLayoutDirty = !0));
      const { crossfade: i } = e.options;
      i === !1 && s.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((e) => {
      const { options: n, resumingFrom: s } = e;
      (n.onExitComplete && n.onExitComplete(),
        s && s.options.onExitComplete && s.options.onExitComplete());
    });
  }
  scheduleRender() {
    this.members.forEach((e) => {
      e.instance && e.scheduleRender(!1);
    });
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function hu(t, e, n) {
  let s = "";
  const i = t.x.translate / e.x,
    o = t.y.translate / e.y,
    r = n?.z || 0;
  if (
    ((i || o || r) && (s = `translate3d(${i}px, ${o}px, ${r}px) `),
    (e.x !== 1 || e.y !== 1) && (s += `scale(${1 / e.x}, ${1 / e.y}) `),
    n)
  ) {
    const {
      transformPerspective: c,
      rotate: u,
      rotateX: h,
      rotateY: f,
      skewX: d,
      skewY: m,
    } = n;
    (c && (s = `perspective(${c}px) ${s}`),
      u && (s += `rotate(${u}deg) `),
      h && (s += `rotateX(${h}deg) `),
      f && (s += `rotateY(${f}deg) `),
      d && (s += `skewX(${d}deg) `),
      m && (s += `skewY(${m}deg) `));
  }
  const a = t.x.scale * e.x,
    l = t.y.scale * e.y;
  return ((a !== 1 || l !== 1) && (s += `scale(${a}, ${l})`), s || "none");
}
const ce = ["", "X", "Y", "Z"],
  fu = 1e3;
let du = 0;
function he(t, e, n, s) {
  const { latestValues: i } = e;
  i[t] && ((n[t] = i[t]), e.setStaticValue(t, 0), s && (s[t] = 0));
}
function sr(t) {
  if (((t.hasCheckedOptimisedAppear = !0), t.root === t)) return;
  const { visualElement: e } = t.options;
  if (!e) return;
  const n = $i(e);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: i, layoutId: o } = t.options;
    window.MotionCancelOptimisedAnimation(n, "transform", V, !(i || o));
  }
  const { parent: s } = t;
  s && !s.hasCheckedOptimisedAppear && sr(s);
}
function ir({
  attachResizeListener: t,
  defaultParent: e,
  measureScroll: n,
  checkIsScrollRoot: s,
  resetTransform: i,
}) {
  return class {
    constructor(r = {}, a = e?.()) {
      ((this.id = du++),
        (this.animationId = 0),
        (this.animationCommitId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          ((this.projectionUpdateScheduled = !1),
            this.nodes.forEach(gu),
            this.nodes.forEach(xu),
            this.nodes.forEach(Pu),
            this.nodes.forEach(yu));
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = r),
        (this.root = a ? a.root || a : this),
        (this.path = a ? [...a.path, a] : []),
        (this.parent = a),
        (this.depth = a ? a.depth + 1 : 0));
      for (let l = 0; l < this.path.length; l++)
        this.path[l].shouldResetTransform = !0;
      this.root === this && (this.nodes = new tu());
    }
    addEventListener(r, a) {
      return (
        this.eventHandlers.has(r) || this.eventHandlers.set(r, new We()),
        this.eventHandlers.get(r).add(a)
      );
    }
    notifyListeners(r, ...a) {
      const l = this.eventHandlers.get(r);
      l && l.notify(...a);
    }
    hasListeners(r) {
      return this.eventHandlers.has(r);
    }
    mount(r) {
      if (this.instance) return;
      ((this.isSVG = xi(r) && !aa(r)), (this.instance = r));
      const { layoutId: a, layout: l, visualElement: c } = this.options;
      if (
        (c && !c.current && c.mount(r),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        this.root.hasTreeAnimated && (l || a) && (this.isLayoutDirty = !0),
        t)
      ) {
        let u,
          h = 0;
        const f = () => (this.root.updateBlockedByResize = !1);
        (V.read(() => {
          h = window.innerWidth;
        }),
          t(r, () => {
            const d = window.innerWidth;
            d !== h &&
              ((h = d),
              (this.root.updateBlockedByResize = !0),
              u && u(),
              (u = eu(f, 250)),
              Kt.hasAnimatedSinceResize &&
                ((Kt.hasAnimatedSinceResize = !1), this.nodes.forEach(Ss)));
          }));
      }
      (a && this.root.registerSharedNode(a, this),
        this.options.animate !== !1 &&
          c &&
          (a || l) &&
          this.addEventListener(
            "didUpdate",
            ({
              delta: u,
              hasLayoutChanged: h,
              hasRelativeLayoutChanged: f,
              layout: d,
            }) => {
              if (this.isTreeAnimationBlocked()) {
                ((this.target = void 0), (this.relativeTarget = void 0));
                return;
              }
              const m =
                  this.options.transition || c.getDefaultTransition() || Vu,
                { onLayoutAnimationStart: v, onLayoutAnimationComplete: y } =
                  c.getProps(),
                p = !this.targetLayout || !nr(this.targetLayout, d),
                T = !h && f;
              if (
                this.options.layoutRoot ||
                this.resumeFrom ||
                T ||
                (h && (p || !this.currentAnimation))
              ) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0));
                const g = { ...tn(m, "layout"), onPlay: v, onComplete: y };
                ((c.shouldReduceMotion || this.options.layoutRoot) &&
                  ((g.delay = 0), (g.type = !1)),
                  this.startAnimation(g),
                  this.setAnimationOrigin(u, T));
              } else
                (h || Ss(this),
                  this.isLead() &&
                    this.options.onExitComplete &&
                    this.options.onExitComplete());
              this.targetLayout = d;
            },
          ));
    }
    unmount() {
      (this.options.layoutId && this.willUpdate(),
        this.root.nodes.remove(this));
      const r = this.getStack();
      (r && r.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        this.eventHandlers.clear(),
        q(this.updateProjection));
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return (
        this.isAnimationBlocked ||
        (this.parent && this.parent.isTreeAnimationBlocked()) ||
        !1
      );
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0),
        this.nodes && this.nodes.forEach(Su),
        this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: r } = this.options;
      return r && r.getProps().transformTemplate;
    }
    willUpdate(r = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (window.MotionCancelOptimisedAnimation &&
          !this.hasCheckedOptimisedAppear &&
          sr(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let u = 0; u < this.path.length; u++) {
        const h = this.path[u];
        ((h.shouldResetTransform = !0),
          h.updateScroll("snapshot"),
          h.options.layoutRoot && h.willUpdate(!1));
      }
      const { layoutId: a, layout: l } = this.options;
      if (a === void 0 && !l) return;
      const c = this.getTransformTemplate();
      ((this.prevTransformTemplateValue = c
        ? c(this.latestValues, "")
        : void 0),
        this.updateSnapshot(),
        r && this.notifyListeners("willUpdate"));
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        (this.unblockUpdate(),
          this.clearAllSnapshots(),
          this.nodes.forEach(xs));
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Ps);
        return;
      }
      ((this.animationCommitId = this.animationId),
        this.isUpdating
          ? ((this.isUpdating = !1),
            this.nodes.forEach(Tu),
            this.nodes.forEach(mu),
            this.nodes.forEach(pu))
          : this.nodes.forEach(Ps),
        this.clearAllSnapshots());
      const a = j.now();
      ((L.delta = z(0, 1e3 / 60, a - L.timestamp)),
        (L.timestamp = a),
        (L.isProcessing = !0),
        te.update.process(L),
        te.preRender.process(L),
        te.render.process(L),
        (L.isProcessing = !1));
    }
    didUpdate() {
      this.updateScheduled ||
        ((this.updateScheduled = !0), nn.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      (this.nodes.forEach(vu), this.sharedNodes.forEach(Au));
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0),
        V.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      V.postRender(() => {
        this.isLayoutDirty
          ? this.root.didUpdate()
          : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot ||
        !this.instance ||
        ((this.snapshot = this.measure()),
        this.snapshot &&
          !B(this.snapshot.measuredBox.x) &&
          !B(this.snapshot.measuredBox.y) &&
          (this.snapshot = void 0));
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) &&
          !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let l = 0; l < this.path.length; l++) this.path[l].updateScroll();
      const r = this.layout;
      ((this.layout = this.measure(!1)),
        (this.layoutCorrected = D()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners("measure", this.layout.layoutBox));
      const { visualElement: a } = this.options;
      a &&
        a.notify(
          "LayoutMeasure",
          this.layout.layoutBox,
          r ? r.layoutBox : void 0,
        );
    }
    updateScroll(r = "measure") {
      let a = !!(this.options.layoutScroll && this.instance);
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === r &&
          (a = !1),
        a && this.instance)
      ) {
        const l = s(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: r,
          isRoot: l,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : l,
        };
      }
    }
    resetTransform() {
      if (!i) return;
      const r =
          this.isLayoutDirty ||
          this.shouldResetTransform ||
          this.options.alwaysMeasureLayout,
        a = this.projectionDelta && !er(this.projectionDelta),
        l = this.getTransformTemplate(),
        c = l ? l(this.latestValues, "") : void 0,
        u = c !== this.prevTransformTemplateValue;
      r &&
        this.instance &&
        (a || tt(this.latestValues) || u) &&
        (i(this.instance, c),
        (this.shouldResetTransform = !1),
        this.scheduleRender());
    }
    measure(r = !0) {
      const a = this.measurePageBox();
      let l = this.removeElementScroll(a);
      return (
        r && (l = this.removeTransform(l)),
        Mu(l),
        {
          animationId: this.root.animationId,
          measuredBox: a,
          layoutBox: l,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      const { visualElement: r } = this.options;
      if (!r) return D();
      const a = r.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(Cu))) {
        const { scroll: c } = this.root;
        c && (lt(a.x, c.offset.x), lt(a.y, c.offset.y));
      }
      return a;
    }
    removeElementScroll(r) {
      const a = D();
      if ((N(a, r), this.scroll?.wasRoot)) return a;
      for (let l = 0; l < this.path.length; l++) {
        const c = this.path[l],
          { scroll: u, options: h } = c;
        c !== this.root &&
          u &&
          h.layoutScroll &&
          (u.wasRoot && N(a, r), lt(a.x, u.offset.x), lt(a.y, u.offset.y));
      }
      return a;
    }
    applyTransform(r, a = !1) {
      const l = D();
      N(l, r);
      for (let c = 0; c < this.path.length; c++) {
        const u = this.path[c];
        (!a &&
          u.options.layoutScroll &&
          u.scroll &&
          u !== u.root &&
          ut(l, { x: -u.scroll.offset.x, y: -u.scroll.offset.y }),
          tt(u.latestValues) && ut(l, u.latestValues));
      }
      return (tt(this.latestValues) && ut(l, this.latestValues), l);
    }
    removeTransform(r) {
      const a = D();
      N(a, r);
      for (let l = 0; l < this.path.length; l++) {
        const c = this.path[l];
        if (!c.instance || !tt(c.latestValues)) continue;
        Me(c.latestValues) && c.updateSnapshot();
        const u = D(),
          h = c.measurePageBox();
        (N(u, h),
          ms(a, c.latestValues, c.snapshot ? c.snapshot.layoutBox : void 0, u));
      }
      return (tt(this.latestValues) && ms(a, this.latestValues), a);
    }
    setTargetDelta(r) {
      ((this.targetDelta = r),
        this.root.scheduleUpdateProjection(),
        (this.isProjectionDirty = !0));
    }
    setOptions(r) {
      this.options = {
        ...this.options,
        ...r,
        crossfade: r.crossfade !== void 0 ? r.crossfade : !0,
      };
    }
    clearMeasurements() {
      ((this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1));
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== L.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(r = !1) {
      const a = this.getLead();
      (this.isProjectionDirty || (this.isProjectionDirty = a.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = a.isTransformDirty),
        this.isSharedProjectionDirty ||
          (this.isSharedProjectionDirty = a.isSharedProjectionDirty));
      const l = !!this.resumingFrom || this !== a;
      if (
        !(
          r ||
          (l && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          this.parent?.isProjectionDirty ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return;
      const { layout: u, layoutId: h } = this.options;
      if (!(!this.layout || !(u || h))) {
        if (
          ((this.resolvedRelativeTargetAt = L.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          const f = this.getClosestProjectingParent();
          f && f.layout && this.animationProgress !== 1
            ? ((this.relativeParent = f),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = D()),
              (this.relativeTargetOrigin = D()),
              At(
                this.relativeTargetOrigin,
                this.layout.layoutBox,
                f.layout.layoutBox,
              ),
              N(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (
          !(!this.relativeTarget && !this.targetDelta) &&
          (this.target ||
            ((this.target = D()), (this.targetWithTransforms = D())),
          this.relativeTarget &&
          this.relativeTargetOrigin &&
          this.relativeParent &&
          this.relativeParent.target
            ? (this.forceRelativeParentToResolveTarget(),
              Fl(this.target, this.relativeTarget, this.relativeParent.target))
            : this.targetDelta
              ? (this.resumingFrom
                  ? (this.target = this.applyTransform(this.layout.layoutBox))
                  : N(this.target, this.layout.layoutBox),
                ji(this.target, this.targetDelta))
              : N(this.target, this.layout.layoutBox),
          this.attemptToResolveRelativeTarget)
        ) {
          this.attemptToResolveRelativeTarget = !1;
          const f = this.getClosestProjectingParent();
          f &&
          !!f.resumingFrom == !!this.resumingFrom &&
          !f.options.layoutScroll &&
          f.target &&
          this.animationProgress !== 1
            ? ((this.relativeParent = f),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = D()),
              (this.relativeTargetOrigin = D()),
              At(this.relativeTargetOrigin, this.target, f.target),
              N(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
      }
    }
    getClosestProjectingParent() {
      if (
        !(
          !this.parent ||
          Me(this.parent.latestValues) ||
          Ii(this.parent.latestValues)
        )
      )
        return this.parent.isProjecting()
          ? this.parent
          : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
        this.layout
      );
    }
    calcProjection() {
      const r = this.getLead(),
        a = !!this.resumingFrom || this !== r;
      let l = !0;
      if (
        ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (l = !1),
        a &&
          (this.isSharedProjectionDirty || this.isTransformDirty) &&
          (l = !1),
        this.resolvedRelativeTargetAt === L.timestamp && (l = !1),
        l)
      )
        return;
      const { layout: c, layoutId: u } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating ||
          (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(c || u))
      )
        return;
      N(this.layoutCorrected, this.layout.layoutBox);
      const h = this.treeScale.x,
        f = this.treeScale.y;
      (_a(this.layoutCorrected, this.treeScale, this.path, a),
        r.layout &&
          !r.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((r.target = r.layout.layoutBox), (r.targetWithTransforms = D())));
      const { target: d } = r;
      if (!d) {
        this.prevProjectionDelta &&
          (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      (!this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (hs(this.prevProjectionDelta.x, this.projectionDelta.x),
          hs(this.prevProjectionDelta.y, this.projectionDelta.y)),
        St(this.projectionDelta, this.layoutCorrected, d, this.latestValues),
        (this.treeScale.x !== h ||
          this.treeScale.y !== f ||
          !Ts(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !Ts(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners("projectionUpdate", d)));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(r = !0) {
      if ((this.options.visualElement?.scheduleRender(), r)) {
        const a = this.getStack();
        a && a.scheduleRender();
      }
      this.resumingFrom &&
        !this.resumingFrom.instance &&
        (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      ((this.prevProjectionDelta = ct()),
        (this.projectionDelta = ct()),
        (this.projectionDeltaWithTransform = ct()));
    }
    setAnimationOrigin(r, a = !1) {
      const l = this.snapshot,
        c = l ? l.latestValues : {},
        u = { ...this.latestValues },
        h = ct();
      ((!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !a));
      const f = D(),
        d = l ? l.source : void 0,
        m = this.layout ? this.layout.source : void 0,
        v = d !== m,
        y = this.getStack(),
        p = !y || y.members.length <= 1,
        T = !!(v && !p && this.options.crossfade === !0 && !this.path.some(wu));
      this.animationProgress = 0;
      let g;
      ((this.mixTargetDelta = (b) => {
        const P = b / 1e3;
        (As(h.x, r.x, P),
          As(h.y, r.y, P),
          this.setTargetDelta(h),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (At(f, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            bu(this.relativeTarget, this.relativeTargetOrigin, f, P),
            g && uu(this.relativeTarget, g) && (this.isProjectionDirty = !1),
            g || (g = D()),
            N(g, this.relativeTarget)),
          v &&
            ((this.animationValues = u), su(u, c, this.latestValues, P, T, p)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = P));
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0));
    }
    startAnimation(r) {
      (this.notifyListeners("animationStart"),
        this.currentAnimation?.stop(),
        this.resumingFrom?.currentAnimation?.stop(),
        this.pendingAnimation &&
          (q(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = V.update(() => {
          ((Kt.hasAnimatedSinceResize = !0),
            this.motionValue || (this.motionValue = ht(0)),
            (this.currentAnimation = Jl(this.motionValue, [0, 1e3], {
              ...r,
              velocity: 0,
              isSync: !0,
              onUpdate: (a) => {
                (this.mixTargetDelta(a), r.onUpdate && r.onUpdate(a));
              },
              onStop: () => {},
              onComplete: () => {
                (r.onComplete && r.onComplete(), this.completeAnimation());
              },
            })),
            this.resumingFrom &&
              (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0));
        })));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      const r = this.getStack();
      (r && r.exitAnimationComplete(),
        (this.resumingFrom =
          this.currentAnimation =
          this.animationValues =
            void 0),
        this.notifyListeners("animationComplete"));
    }
    finishAnimation() {
      (this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(fu),
        this.currentAnimation.stop()),
        this.completeAnimation());
    }
    applyTransformsToTarget() {
      const r = this.getLead();
      let {
        targetWithTransforms: a,
        target: l,
        layout: c,
        latestValues: u,
      } = r;
      if (!(!a || !l || !c)) {
        if (
          this !== r &&
          this.layout &&
          c &&
          rr(this.options.animationType, this.layout.layoutBox, c.layoutBox)
        ) {
          l = this.target || D();
          const h = B(this.layout.layoutBox.x);
          ((l.x.min = r.target.x.min), (l.x.max = l.x.min + h));
          const f = B(this.layout.layoutBox.y);
          ((l.y.min = r.target.y.min), (l.y.max = l.y.min + f));
        }
        (N(a, l),
          ut(a, u),
          St(this.projectionDeltaWithTransform, this.layoutCorrected, a, u));
      }
    }
    registerSharedNode(r, a) {
      (this.sharedNodes.has(r) || this.sharedNodes.set(r, new cu()),
        this.sharedNodes.get(r).add(a));
      const c = a.options.initialPromotionConfig;
      a.promote({
        transition: c ? c.transition : void 0,
        preserveFollowOpacity:
          c && c.shouldPreserveFollowOpacity
            ? c.shouldPreserveFollowOpacity(a)
            : void 0,
      });
    }
    isLead() {
      const r = this.getStack();
      return r ? r.lead === this : !0;
    }
    getLead() {
      const { layoutId: r } = this.options;
      return r ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: r } = this.options;
      return r ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: r } = this.options;
      if (r) return this.root.sharedNodes.get(r);
    }
    promote({ needsReset: r, transition: a, preserveFollowOpacity: l } = {}) {
      const c = this.getStack();
      (c && c.promote(this, l),
        r && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        a && this.setOptions({ transition: a }));
    }
    relegate() {
      const r = this.getStack();
      return r ? r.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: r } = this.options;
      if (!r) return;
      let a = !1;
      const { latestValues: l } = r;
      if (
        ((l.z ||
          l.rotate ||
          l.rotateX ||
          l.rotateY ||
          l.rotateZ ||
          l.skewX ||
          l.skewY) &&
          (a = !0),
        !a)
      )
        return;
      const c = {};
      l.z && he("z", r, c, this.animationValues);
      for (let u = 0; u < ce.length; u++)
        (he(`rotate${ce[u]}`, r, c, this.animationValues),
          he(`skew${ce[u]}`, r, c, this.animationValues));
      r.render();
      for (const u in c)
        (r.setStaticValue(u, c[u]),
          this.animationValues && (this.animationValues[u] = c[u]));
      r.scheduleRender();
    }
    applyProjectionStyles(r, a) {
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) {
        r.visibility = "hidden";
        return;
      }
      const l = this.getTransformTemplate();
      if (this.needsReset) {
        ((this.needsReset = !1),
          (r.visibility = ""),
          (r.opacity = ""),
          (r.pointerEvents = Wt(a?.pointerEvents) || ""),
          (r.transform = l ? l(this.latestValues, "") : "none"));
        return;
      }
      const c = this.getLead();
      if (!this.projectionDelta || !this.layout || !c.target) {
        (this.options.layoutId &&
          ((r.opacity =
            this.latestValues.opacity !== void 0
              ? this.latestValues.opacity
              : 1),
          (r.pointerEvents = Wt(a?.pointerEvents) || "")),
          this.hasProjected &&
            !tt(this.latestValues) &&
            ((r.transform = l ? l({}, "") : "none"), (this.hasProjected = !1)));
        return;
      }
      r.visibility = "";
      const u = c.animationValues || c.latestValues;
      this.applyTransformsToTarget();
      let h = hu(this.projectionDeltaWithTransform, this.treeScale, u);
      (l && (h = l(u, h)), (r.transform = h));
      const { x: f, y: d } = this.projectionDelta;
      ((r.transformOrigin = `${f.origin * 100}% ${d.origin * 100}% 0`),
        c.animationValues
          ? (r.opacity =
              c === this
                ? (u.opacity ?? this.latestValues.opacity ?? 1)
                : this.preserveOpacity
                  ? this.latestValues.opacity
                  : u.opacityExit)
          : (r.opacity =
              c === this
                ? u.opacity !== void 0
                  ? u.opacity
                  : ""
                : u.opacityExit !== void 0
                  ? u.opacityExit
                  : 0));
      for (const m in Dt) {
        if (u[m] === void 0) continue;
        const { correct: v, applyTo: y, isCSSVariable: p } = Dt[m],
          T = h === "none" ? u[m] : v(u[m], c);
        if (y) {
          const g = y.length;
          for (let b = 0; b < g; b++) r[y[b]] = T;
        } else
          p ? (this.options.visualElement.renderState.vars[m] = T) : (r[m] = T);
      }
      this.options.layoutId &&
        (r.pointerEvents = c === this ? Wt(a?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      (this.root.nodes.forEach((r) => r.currentAnimation?.stop()),
        this.root.nodes.forEach(xs),
        this.root.sharedNodes.clear());
    }
  };
}
function mu(t) {
  t.updateLayout();
}
function pu(t) {
  const e = t.resumeFrom?.snapshot || t.snapshot;
  if (t.isLead() && t.layout && e && t.hasListeners("didUpdate")) {
    const { layoutBox: n, measuredBox: s } = t.layout,
      { animationType: i } = t.options,
      o = e.source !== t.layout.source;
    i === "size"
      ? U((u) => {
          const h = o ? e.measuredBox[u] : e.layoutBox[u],
            f = B(h);
          ((h.min = n[u].min), (h.max = h.min + f));
        })
      : rr(i, e.layoutBox, n) &&
        U((u) => {
          const h = o ? e.measuredBox[u] : e.layoutBox[u],
            f = B(n[u]);
          ((h.max = h.min + f),
            t.relativeTarget &&
              !t.currentAnimation &&
              ((t.isProjectionDirty = !0),
              (t.relativeTarget[u].max = t.relativeTarget[u].min + f)));
        });
    const r = ct();
    St(r, n, e.layoutBox);
    const a = ct();
    o ? St(a, t.applyTransform(s, !0), e.measuredBox) : St(a, n, e.layoutBox);
    const l = !er(r);
    let c = !1;
    if (!t.resumeFrom) {
      const u = t.getClosestProjectingParent();
      if (u && !u.resumeFrom) {
        const { snapshot: h, layout: f } = u;
        if (h && f) {
          const d = D();
          At(d, e.layoutBox, h.layoutBox);
          const m = D();
          (At(m, n, f.layoutBox),
            nr(d, m) || (c = !0),
            u.options.layoutRoot &&
              ((t.relativeTarget = m),
              (t.relativeTargetOrigin = d),
              (t.relativeParent = u)));
        }
      }
    }
    t.notifyListeners("didUpdate", {
      layout: n,
      snapshot: e,
      delta: a,
      layoutDelta: r,
      hasLayoutChanged: l,
      hasRelativeLayoutChanged: c,
    });
  } else if (t.isLead()) {
    const { onExitComplete: n } = t.options;
    n && n();
  }
  t.options.transition = void 0;
}
function gu(t) {
  t.parent &&
    (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty),
    t.isSharedProjectionDirty ||
      (t.isSharedProjectionDirty = !!(
        t.isProjectionDirty ||
        t.parent.isProjectionDirty ||
        t.parent.isSharedProjectionDirty
      )),
    t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
}
function yu(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
}
function vu(t) {
  t.clearSnapshot();
}
function xs(t) {
  t.clearMeasurements();
}
function Ps(t) {
  t.isLayoutDirty = !1;
}
function Tu(t) {
  const { visualElement: e } = t.options;
  (e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"),
    t.resetTransform());
}
function Ss(t) {
  (t.finishAnimation(),
    (t.targetDelta = t.relativeTarget = t.target = void 0),
    (t.isProjectionDirty = !0));
}
function xu(t) {
  t.resolveTargetDelta();
}
function Pu(t) {
  t.calcProjection();
}
function Su(t) {
  t.resetSkewAndRotation();
}
function Au(t) {
  t.removeLeadSnapshot();
}
function As(t, e, n) {
  ((t.translate = M(e.translate, 0, n)),
    (t.scale = M(e.scale, 1, n)),
    (t.origin = e.origin),
    (t.originPoint = e.originPoint));
}
function bs(t, e, n, s) {
  ((t.min = M(e.min, n.min, s)), (t.max = M(e.max, n.max, s)));
}
function bu(t, e, n, s) {
  (bs(t.x, e.x, n.x, s), bs(t.y, e.y, n.y, s));
}
function wu(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0;
}
const Vu = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  ws = (t) =>
    typeof navigator < "u" &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().includes(t),
  Vs = ws("applewebkit/") && !ws("chrome/") ? Math.round : W;
function Ms(t) {
  ((t.min = Vs(t.min)), (t.max = Vs(t.max)));
}
function Mu(t) {
  (Ms(t.x), Ms(t.y));
}
function rr(t, e, n) {
  return (
    t === "position" || (t === "preserve-aspect" && !kl(vs(e), vs(n), 0.2))
  );
}
function Cu(t) {
  return t !== t.root && t.scroll?.wasRoot;
}
const Du = ir({
    attachResizeListener: (t, e) => Rt(t, "resize", e),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  fe = { current: void 0 },
  or = ir({
    measureScroll: (t) => ({ x: t.scrollLeft, y: t.scrollTop }),
    defaultParent: () => {
      if (!fe.current) {
        const t = new Du({});
        (t.mount(window), t.setOptions({ layoutScroll: !0 }), (fe.current = t));
      }
      return fe.current;
    },
    resetTransform: (t, e) => {
      t.style.transform = e !== void 0 ? e : "none";
    },
    checkIsScrollRoot: (t) => window.getComputedStyle(t).position === "fixed",
  }),
  Eu = {
    pan: { Feature: Xl },
    drag: { Feature: zl, ProjectionNode: or, MeasureLayout: Ji },
  };
function Cs(t, e, n) {
  const { props: s } = t;
  t.animationState &&
    s.whileHover &&
    t.animationState.setActive("whileHover", n === "Start");
  const i = "onHover" + n,
    o = s[i];
  o && V.postRender(() => o(e, Bt(e)));
}
class Ru extends J {
  mount() {
    const { current: e } = this.node;
    e &&
      (this.unmount = na(
        e,
        (n, s) => (Cs(this.node, s, "Start"), (i) => Cs(this.node, i, "End")),
      ));
  }
  unmount() {}
}
class Lu extends J {
  constructor() {
    (super(...arguments), (this.isActive = !1));
  }
  onFocus() {
    let e = !1;
    try {
      e = this.node.current.matches(":focus-visible");
    } catch {
      e = !0;
    }
    !e ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !0),
      (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !1),
      (this.isActive = !1));
  }
  mount() {
    this.unmount = Lt(
      Rt(this.node.current, "focus", () => this.onFocus()),
      Rt(this.node.current, "blur", () => this.onBlur()),
    );
  }
  unmount() {}
}
function Ds(t, e, n) {
  const { props: s } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled) return;
  t.animationState &&
    s.whileTap &&
    t.animationState.setActive("whileTap", n === "Start");
  const i = "onTap" + (n === "End" ? "" : n),
    o = s[i];
  o && V.postRender(() => o(e, Bt(e)));
}
class ku extends J {
  mount() {
    const { current: e } = this.node;
    e &&
      (this.unmount = oa(
        e,
        (n, s) => (
          Ds(this.node, s, "Start"),
          (i, { success: o }) => Ds(this.node, i, o ? "End" : "Cancel")
        ),
        { useGlobalTarget: this.node.props.globalTapTarget },
      ));
  }
  unmount() {}
}
const Fe = new WeakMap(),
  de = new WeakMap(),
  Fu = (t) => {
    const e = Fe.get(t.target);
    e && e(t);
  },
  Bu = (t) => {
    t.forEach(Fu);
  };
function Iu({ root: t, ...e }) {
  const n = t || document;
  de.has(n) || de.set(n, {});
  const s = de.get(n),
    i = JSON.stringify(e);
  return (
    s[i] || (s[i] = new IntersectionObserver(Bu, { root: t, ...e })),
    s[i]
  );
}
function ju(t, e, n) {
  const s = Iu(e);
  return (
    Fe.set(t, n),
    s.observe(t),
    () => {
      (Fe.delete(t), s.unobserve(t));
    }
  );
}
const Ou = { some: 0, all: 1 };
class Nu extends J {
  constructor() {
    (super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1));
  }
  startObserver() {
    this.unmount();
    const { viewport: e = {} } = this.node.getProps(),
      { root: n, margin: s, amount: i = "some", once: o } = e,
      r = {
        root: n ? n.current : void 0,
        rootMargin: s,
        threshold: typeof i == "number" ? i : Ou[i],
      },
      a = (l) => {
        const { isIntersecting: c } = l;
        if (
          this.isInView === c ||
          ((this.isInView = c), o && !c && this.hasEnteredView)
        )
          return;
        (c && (this.hasEnteredView = !0),
          this.node.animationState &&
            this.node.animationState.setActive("whileInView", c));
        const { onViewportEnter: u, onViewportLeave: h } = this.node.getProps(),
          f = c ? u : h;
        f && f(l);
      };
    return ju(this.node.current, r, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u") return;
    const { props: e, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(Uu(e, n)) && this.startObserver();
  }
  unmount() {}
}
function Uu({ viewport: t = {} }, { viewport: e = {} } = {}) {
  return (n) => t[n] !== e[n];
}
const Wu = {
    inView: { Feature: Nu },
    tap: { Feature: ku },
    focus: { Feature: Lu },
    hover: { Feature: Ru },
  },
  Ku = { layout: { ProjectionNode: or, MeasureLayout: Ji } },
  $u = { ...Ml, ...Wu, ...Eu, ...Ku },
  Es = Ka($u, el);
function Xu({ children: t, className: e = "", stagger: n = !1 }) {
  const s = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.3,
          ease: "easeOut",
          staggerChildren: n ? 0.1 : 0,
        },
      },
      exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
    },
    i = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      },
    };
  return bt.jsx(Es.div, {
    variants: s,
    initial: "hidden",
    animate: "visible",
    exit: "exit",
    className: e,
    children: n ? bt.jsx(Es.div, { variants: i, children: t }) : t,
  });
}
export { Xu as default };

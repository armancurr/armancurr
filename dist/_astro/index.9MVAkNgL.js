var m = { exports: {} },
  o = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var N;
function Z() {
  if (N) return o;
  N = 1;
  var E = Symbol.for("react.transitional.element"),
    Y = Symbol.for("react.portal"),
    x = Symbol.for("react.fragment"),
    I = Symbol.for("react.strict_mode"),
    L = Symbol.for("react.profiler"),
    U = Symbol.for("react.consumer"),
    k = Symbol.for("react.context"),
    b = Symbol.for("react.forward_ref"),
    q = Symbol.for("react.suspense"),
    D = Symbol.for("react.memo"),
    C = Symbol.for("react.lazy"),
    w = Symbol.iterator;
  function z(t) {
    return t === null || typeof t != "object"
      ? null
      : ((t = (w && t[w]) || t["@@iterator"]),
        typeof t == "function" ? t : null);
  }
  var A = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    h = Object.assign,
    S = {};
  function a(t, e, n) {
    ((this.props = t),
      (this.context = e),
      (this.refs = S),
      (this.updater = n || A));
  }
  ((a.prototype.isReactComponent = {}),
    (a.prototype.setState = function (t, e) {
      if (typeof t != "object" && typeof t != "function" && t != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, t, e, "setState");
    }),
    (a.prototype.forceUpdate = function (t) {
      this.updater.enqueueForceUpdate(this, t, "forceUpdate");
    }));
  function g() {}
  g.prototype = a.prototype;
  function y(t, e, n) {
    ((this.props = t),
      (this.context = e),
      (this.refs = S),
      (this.updater = n || A));
  }
  var v = (y.prototype = new g());
  ((v.constructor = y), h(v, a.prototype), (v.isPureReactComponent = !0));
  var O = Array.isArray,
    i = { H: null, A: null, T: null, S: null, V: null },
    H = Object.prototype.hasOwnProperty;
  function R(t, e, n, r, s, f) {
    return (
      (n = f.ref),
      { $$typeof: E, type: t, key: e, ref: n !== void 0 ? n : null, props: f }
    );
  }
  function G(t, e) {
    return R(t.type, e, void 0, void 0, void 0, t.props);
  }
  function T(t) {
    return typeof t == "object" && t !== null && t.$$typeof === E;
  }
  function K(t) {
    var e = { "=": "=0", ":": "=2" };
    return (
      "$" +
      t.replace(/[=:]/g, function (n) {
        return e[n];
      })
    );
  }
  var j = /\/+/g;
  function d(t, e) {
    return typeof t == "object" && t !== null && t.key != null
      ? K("" + t.key)
      : e.toString(36);
  }
  function P() {}
  function B(t) {
    switch (t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw t.reason;
      default:
        switch (
          (typeof t.status == "string"
            ? t.then(P, P)
            : ((t.status = "pending"),
              t.then(
                function (e) {
                  t.status === "pending" &&
                    ((t.status = "fulfilled"), (t.value = e));
                },
                function (e) {
                  t.status === "pending" &&
                    ((t.status = "rejected"), (t.reason = e));
                },
              )),
          t.status)
        ) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw t.reason;
        }
    }
    throw t;
  }
  function _(t, e, n, r, s) {
    var f = typeof t;
    (f === "undefined" || f === "boolean") && (t = null);
    var u = !1;
    if (t === null) u = !0;
    else
      switch (f) {
        case "bigint":
        case "string":
        case "number":
          u = !0;
          break;
        case "object":
          switch (t.$$typeof) {
            case E:
            case Y:
              u = !0;
              break;
            case C:
              return ((u = t._init), _(u(t._payload), e, n, r, s));
          }
      }
    if (u)
      return (
        (s = s(t)),
        (u = r === "" ? "." + d(t, 0) : r),
        O(s)
          ? ((n = ""),
            u != null && (n = u.replace(j, "$&/") + "/"),
            _(s, e, n, "", function (X) {
              return X;
            }))
          : s != null &&
            (T(s) &&
              (s = G(
                s,
                n +
                  (s.key == null || (t && t.key === s.key)
                    ? ""
                    : ("" + s.key).replace(j, "$&/") + "/") +
                  u,
              )),
            e.push(s)),
        1
      );
    u = 0;
    var p = r === "" ? "." : r + ":";
    if (O(t))
      for (var c = 0; c < t.length; c++)
        ((r = t[c]), (f = p + d(r, c)), (u += _(r, e, n, f, s)));
    else if (((c = z(t)), typeof c == "function"))
      for (t = c.call(t), c = 0; !(r = t.next()).done; )
        ((r = r.value), (f = p + d(r, c++)), (u += _(r, e, n, f, s)));
    else if (f === "object") {
      if (typeof t.then == "function") return _(B(t), e, n, r, s);
      throw (
        (e = String(t)),
        Error(
          "Objects are not valid as a React child (found: " +
            (e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return u;
  }
  function l(t, e, n) {
    if (t == null) return t;
    var r = [],
      s = 0;
    return (
      _(t, r, "", "", function (f) {
        return e.call(n, f, s++);
      }),
      r
    );
  }
  function W(t) {
    if (t._status === -1) {
      var e = t._result;
      ((e = e()),
        e.then(
          function (n) {
            (t._status === 0 || t._status === -1) &&
              ((t._status = 1), (t._result = n));
          },
          function (n) {
            (t._status === 0 || t._status === -1) &&
              ((t._status = 2), (t._result = n));
          },
        ),
        t._status === -1 && ((t._status = 0), (t._result = e)));
    }
    if (t._status === 1) return t._result.default;
    throw t._result;
  }
  var $ =
    typeof reportError == "function"
      ? reportError
      : function (t) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var e = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof t == "object" &&
                t !== null &&
                typeof t.message == "string"
                  ? String(t.message)
                  : String(t),
              error: t,
            });
            if (!window.dispatchEvent(e)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", t);
            return;
          }
          console.error(t);
        };
  function Q() {}
  return (
    (o.Children = {
      map: l,
      forEach: function (t, e, n) {
        l(
          t,
          function () {
            e.apply(this, arguments);
          },
          n,
        );
      },
      count: function (t) {
        var e = 0;
        return (
          l(t, function () {
            e++;
          }),
          e
        );
      },
      toArray: function (t) {
        return (
          l(t, function (e) {
            return e;
          }) || []
        );
      },
      only: function (t) {
        if (!T(t))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return t;
      },
    }),
    (o.Component = a),
    (o.Fragment = x),
    (o.Profiler = L),
    (o.PureComponent = y),
    (o.StrictMode = I),
    (o.Suspense = q),
    (o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i),
    (o.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (t) {
        return i.H.useMemoCache(t);
      },
    }),
    (o.cache = function (t) {
      return function () {
        return t.apply(null, arguments);
      };
    }),
    (o.cloneElement = function (t, e, n) {
      if (t == null)
        throw Error(
          "The argument must be a React element, but you passed " + t + ".",
        );
      var r = h({}, t.props),
        s = t.key,
        f = void 0;
      if (e != null)
        for (u in (e.ref !== void 0 && (f = void 0),
        e.key !== void 0 && (s = "" + e.key),
        e))
          !H.call(e, u) ||
            u === "key" ||
            u === "__self" ||
            u === "__source" ||
            (u === "ref" && e.ref === void 0) ||
            (r[u] = e[u]);
      var u = arguments.length - 2;
      if (u === 1) r.children = n;
      else if (1 < u) {
        for (var p = Array(u), c = 0; c < u; c++) p[c] = arguments[c + 2];
        r.children = p;
      }
      return R(t.type, s, void 0, void 0, f, r);
    }),
    (o.createContext = function (t) {
      return (
        (t = {
          $$typeof: k,
          _currentValue: t,
          _currentValue2: t,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (t.Provider = t),
        (t.Consumer = { $$typeof: U, _context: t }),
        t
      );
    }),
    (o.createElement = function (t, e, n) {
      var r,
        s = {},
        f = null;
      if (e != null)
        for (r in (e.key !== void 0 && (f = "" + e.key), e))
          H.call(e, r) &&
            r !== "key" &&
            r !== "__self" &&
            r !== "__source" &&
            (s[r] = e[r]);
      var u = arguments.length - 2;
      if (u === 1) s.children = n;
      else if (1 < u) {
        for (var p = Array(u), c = 0; c < u; c++) p[c] = arguments[c + 2];
        s.children = p;
      }
      if (t && t.defaultProps)
        for (r in ((u = t.defaultProps), u)) s[r] === void 0 && (s[r] = u[r]);
      return R(t, f, void 0, void 0, null, s);
    }),
    (o.createRef = function () {
      return { current: null };
    }),
    (o.forwardRef = function (t) {
      return { $$typeof: b, render: t };
    }),
    (o.isValidElement = T),
    (o.lazy = function (t) {
      return { $$typeof: C, _payload: { _status: -1, _result: t }, _init: W };
    }),
    (o.memo = function (t, e) {
      return { $$typeof: D, type: t, compare: e === void 0 ? null : e };
    }),
    (o.startTransition = function (t) {
      var e = i.T,
        n = {};
      i.T = n;
      try {
        var r = t(),
          s = i.S;
        (s !== null && s(n, r),
          typeof r == "object" &&
            r !== null &&
            typeof r.then == "function" &&
            r.then(Q, $));
      } catch (f) {
        $(f);
      } finally {
        i.T = e;
      }
    }),
    (o.unstable_useCacheRefresh = function () {
      return i.H.useCacheRefresh();
    }),
    (o.use = function (t) {
      return i.H.use(t);
    }),
    (o.useActionState = function (t, e, n) {
      return i.H.useActionState(t, e, n);
    }),
    (o.useCallback = function (t, e) {
      return i.H.useCallback(t, e);
    }),
    (o.useContext = function (t) {
      return i.H.useContext(t);
    }),
    (o.useDebugValue = function () {}),
    (o.useDeferredValue = function (t, e) {
      return i.H.useDeferredValue(t, e);
    }),
    (o.useEffect = function (t, e, n) {
      var r = i.H;
      if (typeof n == "function")
        throw Error(
          "useEffect CRUD overload is not enabled in this build of React.",
        );
      return r.useEffect(t, e);
    }),
    (o.useId = function () {
      return i.H.useId();
    }),
    (o.useImperativeHandle = function (t, e, n) {
      return i.H.useImperativeHandle(t, e, n);
    }),
    (o.useInsertionEffect = function (t, e) {
      return i.H.useInsertionEffect(t, e);
    }),
    (o.useLayoutEffect = function (t, e) {
      return i.H.useLayoutEffect(t, e);
    }),
    (o.useMemo = function (t, e) {
      return i.H.useMemo(t, e);
    }),
    (o.useOptimistic = function (t, e) {
      return i.H.useOptimistic(t, e);
    }),
    (o.useReducer = function (t, e, n) {
      return i.H.useReducer(t, e, n);
    }),
    (o.useRef = function (t) {
      return i.H.useRef(t);
    }),
    (o.useState = function (t) {
      return i.H.useState(t);
    }),
    (o.useSyncExternalStore = function (t, e, n) {
      return i.H.useSyncExternalStore(t, e, n);
    }),
    (o.useTransition = function () {
      return i.H.useTransition();
    }),
    (o.version = "19.1.0"),
    o
  );
}
var M;
function J() {
  return (M || ((M = 1), (m.exports = Z())), m.exports);
}
var V = J();
export { V as a, J as r };

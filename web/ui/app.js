function ZS(u, r) {
  for (var o = 0; o < r.length; o++) {
    const c = r[o];
    if (typeof c != "string" && !Array.isArray(c)) {
      for (const f in c)
        if (f !== "default" && !(f in u)) {
          const d = Object.getOwnPropertyDescriptor(c, f);
          d && Object.defineProperty(u, f, d.get ? d : {
            enumerable: !0,
            get: () => c[f]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(u, Symbol.toStringTag, { value: "Module" }));
}
function KS(u) {
  return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
}
var If = { exports: {} }, dr = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ig;
function JS() {
  if (Ig) return dr;
  Ig = 1;
  var u = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function o(c, f, d) {
    var m = null;
    if (d !== void 0 && (m = "" + d), f.key !== void 0 && (m = "" + f.key), "key" in f) {
      d = {};
      for (var p in f)
        p !== "key" && (d[p] = f[p]);
    } else d = f;
    return f = d.ref, {
      $$typeof: u,
      type: c,
      key: m,
      ref: f !== void 0 ? f : null,
      props: d
    };
  }
  return dr.Fragment = r, dr.jsx = o, dr.jsxs = o, dr;
}
var Fg;
function $S() {
  return Fg || (Fg = 1, If.exports = JS()), If.exports;
}
var y = $S(), Ff = { exports: {} }, de = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pg;
function IS() {
  if (Pg) return de;
  Pg = 1;
  var u = Symbol.for("react.transitional.element"), r = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), d = Symbol.for("react.consumer"), m = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), N = Symbol.for("react.view_transition"), q = Symbol.iterator;
  function H(T) {
    return T === null || typeof T != "object" ? null : (T = q && T[q] || T["@@iterator"], typeof T == "function" ? T : null);
  }
  var B = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, j = Object.assign, Q = {};
  function Z(T, L, te) {
    this.props = T, this.context = L, this.refs = Q, this.updater = te || B;
  }
  Z.prototype.isReactComponent = {}, Z.prototype.setState = function(T, L) {
    if (typeof T != "object" && typeof T != "function" && T != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, T, L, "setState");
  }, Z.prototype.forceUpdate = function(T) {
    this.updater.enqueueForceUpdate(this, T, "forceUpdate");
  };
  function ae() {
  }
  ae.prototype = Z.prototype;
  function ie(T, L, te) {
    this.props = T, this.context = L, this.refs = Q, this.updater = te || B;
  }
  var W = ie.prototype = new ae();
  W.constructor = ie, j(W, Z.prototype), W.isPureReactComponent = !0;
  var se = Array.isArray;
  function ee() {
  }
  var he = { H: null, A: null, T: null, S: null }, Fe = Object.prototype.hasOwnProperty;
  function _e(T, L, te) {
    var ne = te.ref;
    return {
      $$typeof: u,
      type: T,
      key: L,
      ref: ne !== void 0 ? ne : null,
      props: te
    };
  }
  function ze(T, L) {
    return _e(T.type, L, T.props);
  }
  function I(T) {
    return typeof T == "object" && T !== null && T.$$typeof === u;
  }
  function bt(T) {
    var L = { "=": "=0", ":": "=2" };
    return "$" + T.replace(/[=:]/g, function(te) {
      return L[te];
    });
  }
  var ot = /\/+/g;
  function Ke(T, L) {
    return typeof T == "object" && T !== null && T.key != null ? bt("" + T.key) : L.toString(36);
  }
  function V(T) {
    switch (T.status) {
      case "fulfilled":
        return T.value;
      case "rejected":
        throw T.reason;
      default:
        switch (typeof T.status == "string" ? T.then(ee, ee) : (T.status = "pending", T.then(
          function(L) {
            T.status === "pending" && (T.status = "fulfilled", T.value = L);
          },
          function(L) {
            T.status === "pending" && (T.status = "rejected", T.reason = L);
          }
        )), T.status) {
          case "fulfilled":
            return T.value;
          case "rejected":
            throw T.reason;
        }
    }
    throw T;
  }
  function ue(T, L, te, ne, Re) {
    var Ne = typeof T;
    (Ne === "undefined" || Ne === "boolean") && (T = null);
    var De = !1;
    if (T === null) De = !0;
    else
      switch (Ne) {
        case "bigint":
        case "string":
        case "number":
          De = !0;
          break;
        case "object":
          switch (T.$$typeof) {
            case u:
            case r:
              De = !0;
              break;
            case A:
              return De = T._init, ue(
                De(T._payload),
                L,
                te,
                ne,
                Re
              );
          }
      }
    if (De)
      return Re = Re(T), De = ne === "" ? "." + Ke(T, 0) : ne, se(Re) ? (te = "", De != null && (te = De.replace(ot, "$&/") + "/"), ue(Re, L, te, "", function(wn) {
        return wn;
      })) : Re != null && (I(Re) && (Re = ze(
        Re,
        te + (Re.key == null || T && T.key === Re.key ? "" : ("" + Re.key).replace(
          ot,
          "$&/"
        ) + "/") + De
      )), L.push(Re)), 1;
    De = 0;
    var P = ne === "" ? "." : ne + ":";
    if (se(T))
      for (var fe = 0; fe < T.length; fe++)
        ne = T[fe], Ne = P + Ke(ne, fe), De += ue(
          ne,
          L,
          te,
          Ne,
          Re
        );
    else if (fe = H(T), typeof fe == "function")
      for (T = fe.call(T), fe = 0; !(ne = T.next()).done; )
        ne = ne.value, Ne = P + Ke(ne, fe++), De += ue(
          ne,
          L,
          te,
          Ne,
          Re
        );
    else if (Ne === "object") {
      if (typeof T.then == "function")
        return ue(
          V(T),
          L,
          te,
          ne,
          Re
        );
      throw L = String(T), Error(
        "Objects are not valid as a React child (found: " + (L === "[object Object]" ? "object with keys {" + Object.keys(T).join(", ") + "}" : L) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return De;
  }
  function re(T, L, te) {
    if (T == null) return T;
    var ne = [], Re = 0;
    return ue(T, ne, "", "", function(Ne) {
      return L.call(te, Ne, Re++);
    }), ne;
  }
  function Se(T) {
    if (T._status === -1) {
      var L = T._result, te = L();
      te.then(
        function(ne) {
          (T._status === 0 || T._status === -1) && (T._status = 1, T._result = ne, te.status === void 0 && (te.status = "fulfilled", te.value = ne));
        },
        function(ne) {
          (T._status === 0 || T._status === -1) && (T._status = 2, T._result = ne, te.status === void 0 && (te.status = "rejected", te.reason = ne));
        }
      ), T._status === -1 && (T._status = 0, T._result = te);
    }
    if (T._status === 1) return T._result.default;
    throw T._result;
  }
  var Ee = typeof reportError == "function" ? reportError : function(T) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var L = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof T == "object" && T !== null && typeof T.message == "string" ? String(T.message) : String(T),
        error: T
      });
      if (!window.dispatchEvent(L)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", T);
      return;
    }
    console.error(T);
  };
  function et(T) {
    var L = he.T, te = {};
    te.types = L !== null ? L.types : null, he.T = te;
    try {
      var ne = T(), Re = he.S;
      Re !== null && Re(te, ne), typeof ne == "object" && ne !== null && typeof ne.then == "function" && ne.then(ee, Ee);
    } catch (Ne) {
      Ee(Ne);
    } finally {
      L !== null && te.types !== null && (L.types = te.types), he.T = L;
    }
  }
  function Nn(T) {
    var L = he.T;
    if (L !== null) {
      var te = L.types;
      te === null ? L.types = [T] : te.indexOf(T) === -1 && te.push(T);
    } else et(Nn.bind(null, T));
  }
  var fl = {
    map: re,
    forEach: function(T, L, te) {
      re(
        T,
        function() {
          L.apply(this, arguments);
        },
        te
      );
    },
    count: function(T) {
      var L = 0;
      return re(T, function() {
        L++;
      }), L;
    },
    toArray: function(T) {
      return re(T, function(L) {
        return L;
      }) || [];
    },
    only: function(T) {
      if (!I(T))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return T;
    }
  };
  return de.Activity = v, de.Children = fl, de.Component = Z, de.Fragment = o, de.Profiler = f, de.PureComponent = ie, de.StrictMode = c, de.Suspense = S, de.ViewTransition = N, de.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = he, de.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(T) {
      return he.H.useMemoCache(T);
    }
  }, de.addTransitionType = Nn, de.cache = function(T) {
    return function() {
      return T.apply(null, arguments);
    };
  }, de.cacheSignal = function() {
    return null;
  }, de.cloneElement = function(T, L, te) {
    if (T == null)
      throw Error(
        "The argument must be a React element, but you passed " + T + "."
      );
    var ne = j({}, T.props), Re = T.key;
    if (L != null)
      for (Ne in L.key !== void 0 && (Re = "" + L.key), L)
        !Fe.call(L, Ne) || Ne === "key" || Ne === "__self" || Ne === "__source" || Ne === "ref" && L.ref === void 0 || (ne[Ne] = L[Ne]);
    var Ne = arguments.length - 2;
    if (Ne === 1) ne.children = te;
    else if (1 < Ne) {
      for (var De = Array(Ne), P = 0; P < Ne; P++)
        De[P] = arguments[P + 2];
      ne.children = De;
    }
    return _e(T.type, Re, ne);
  }, de.createContext = function(T) {
    return T = {
      $$typeof: m,
      _currentValue: T,
      _currentValue2: T,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, T.Provider = T, T.Consumer = {
      $$typeof: d,
      _context: T
    }, T;
  }, de.createElement = function(T, L, te) {
    var ne, Re = {}, Ne = null;
    if (L != null)
      for (ne in L.key !== void 0 && (Ne = "" + L.key), L)
        Fe.call(L, ne) && ne !== "key" && ne !== "__self" && ne !== "__source" && (Re[ne] = L[ne]);
    var De = arguments.length - 2;
    if (De === 1) Re.children = te;
    else if (1 < De) {
      for (var P = Array(De), fe = 0; fe < De; fe++)
        P[fe] = arguments[fe + 2];
      Re.children = P;
    }
    if (T && T.defaultProps)
      for (ne in De = T.defaultProps, De)
        Re[ne] === void 0 && (Re[ne] = De[ne]);
    return _e(T, Ne, Re);
  }, de.createRef = function() {
    return { current: null };
  }, de.forwardRef = function(T) {
    return { $$typeof: p, render: T };
  }, de.isValidElement = I, de.lazy = function(T) {
    return {
      $$typeof: A,
      _payload: { _status: -1, _result: T },
      _init: Se
    };
  }, de.memo = function(T, L) {
    return {
      $$typeof: x,
      type: T,
      compare: L === void 0 ? null : L
    };
  }, de.startTransition = et, de.unstable_useCacheRefresh = function() {
    return he.H.useCacheRefresh();
  }, de.use = function(T) {
    return he.H.use(T);
  }, de.useActionState = function(T, L, te) {
    return he.H.useActionState(T, L, te);
  }, de.useCallback = function(T, L) {
    return he.H.useCallback(T, L);
  }, de.useContext = function(T) {
    return he.H.useContext(T);
  }, de.useDebugValue = function() {
  }, de.useDeferredValue = function(T, L) {
    return he.H.useDeferredValue(T, L);
  }, de.useEffect = function(T, L) {
    return he.H.useEffect(T, L);
  }, de.useEffectEvent = function(T) {
    return he.H.useEffectEvent(T);
  }, de.useId = function() {
    return he.H.useId();
  }, de.useImperativeHandle = function(T, L, te) {
    return he.H.useImperativeHandle(T, L, te);
  }, de.useInsertionEffect = function(T, L) {
    return he.H.useInsertionEffect(T, L);
  }, de.useLayoutEffect = function(T, L) {
    return he.H.useLayoutEffect(T, L);
  }, de.useMemo = function(T, L) {
    return he.H.useMemo(T, L);
  }, de.useOptimistic = function(T, L) {
    return he.H.useOptimistic(T, L);
  }, de.useReducer = function(T, L, te) {
    return he.H.useReducer(T, L, te);
  }, de.useRef = function(T) {
    return he.H.useRef(T);
  }, de.useState = function(T) {
    return he.H.useState(T);
  }, de.useSyncExternalStore = function(T, L, te) {
    return he.H.useSyncExternalStore(
      T,
      L,
      te
    );
  }, de.useTransition = function() {
    return he.H.useTransition();
  }, de.version = "19.3.0", de;
}
var Wg;
function Md() {
  return Wg || (Wg = 1, Ff.exports = IS()), Ff.exports;
}
var z = Md();
const FS = /* @__PURE__ */ KS(z), xr = /* @__PURE__ */ ZS({
  __proto__: null,
  default: FS
}, [z]);
var Pf = { exports: {} }, hr = {}, Wf = { exports: {} }, ed = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ev;
function PS() {
  return ev || (ev = 1, (function(u) {
    function r(V, ue) {
      var re = V.length;
      V.push(ue);
      e: for (; 0 < re; ) {
        var Se = re - 1 >>> 1, Ee = V[Se];
        if (0 < f(Ee, ue))
          V[Se] = ue, V[re] = Ee, re = Se;
        else break e;
      }
    }
    function o(V) {
      return V.length === 0 ? null : V[0];
    }
    function c(V) {
      if (V.length === 0) return null;
      var ue = V[0], re = V.pop();
      if (re !== ue) {
        V[0] = re;
        e: for (var Se = 0, Ee = V.length, et = Ee >>> 1; Se < et; ) {
          var Nn = 2 * (Se + 1) - 1, fl = V[Nn], T = Nn + 1, L = V[T];
          if (0 > f(fl, re))
            T < Ee && 0 > f(L, fl) ? (V[Se] = L, V[T] = re, Se = T) : (V[Se] = fl, V[Nn] = re, Se = Nn);
          else if (T < Ee && 0 > f(L, re))
            V[Se] = L, V[T] = re, Se = T;
          else break e;
        }
      }
      return ue;
    }
    function f(V, ue) {
      var re = V.sortIndex - ue.sortIndex;
      return re !== 0 ? re : V.id - ue.id;
    }
    if (u.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      u.unstable_now = function() {
        return d.now();
      };
    } else {
      var m = Date, p = m.now();
      u.unstable_now = function() {
        return m.now() - p;
      };
    }
    var S = [], x = [], A = 1, v = null, N = 3, q = !1, H = !1, B = !1, j = !1, Q = typeof setTimeout == "function" ? setTimeout : null, Z = typeof clearTimeout == "function" ? clearTimeout : null, ae = typeof setImmediate < "u" ? setImmediate : null;
    function ie(V) {
      for (var ue = o(x); ue !== null; ) {
        if (ue.callback === null) c(x);
        else if (ue.startTime <= V)
          c(x), ue.sortIndex = ue.expirationTime, r(S, ue);
        else break;
        ue = o(x);
      }
    }
    function W(V) {
      if (B = !1, ie(V), !H)
        if (o(S) !== null)
          H = !0, se || (se = !0, I());
        else {
          var ue = o(x);
          ue !== null && Ke(W, ue.startTime - V);
        }
    }
    var se = !1, ee = -1, he = 5, Fe = -1;
    function _e() {
      return j ? !0 : !(u.unstable_now() - Fe < he);
    }
    function ze() {
      if (j = !1, se) {
        var V = u.unstable_now();
        Fe = V;
        var ue = !0;
        try {
          e: {
            H = !1, B && (B = !1, Z(ee), ee = -1), q = !0;
            var re = N;
            try {
              t: {
                for (ie(V), v = o(S); v !== null && !(v.expirationTime > V && _e()); ) {
                  var Se = v.callback;
                  if (typeof Se == "function") {
                    v.callback = null, N = v.priorityLevel;
                    var Ee = Se(
                      v.expirationTime <= V
                    );
                    if (V = u.unstable_now(), typeof Ee == "function") {
                      v.callback = Ee, ie(V), ue = !0;
                      break t;
                    }
                    v === o(S) && c(S), ie(V);
                  } else c(S);
                  v = o(S);
                }
                if (v !== null) ue = !0;
                else {
                  var et = o(x);
                  et !== null && Ke(
                    W,
                    et.startTime - V
                  ), ue = !1;
                }
              }
              break e;
            } finally {
              v = null, N = re, q = !1;
            }
            ue = void 0;
          }
        } finally {
          ue ? I() : se = !1;
        }
      }
    }
    var I;
    if (typeof ae == "function")
      I = function() {
        ae(ze);
      };
    else if (typeof MessageChannel < "u") {
      var bt = new MessageChannel(), ot = bt.port2;
      bt.port1.onmessage = ze, I = function() {
        ot.postMessage(null);
      };
    } else
      I = function() {
        Q(ze, 0);
      };
    function Ke(V, ue) {
      ee = Q(function() {
        V(u.unstable_now());
      }, ue);
    }
    u.unstable_IdlePriority = 5, u.unstable_ImmediatePriority = 1, u.unstable_LowPriority = 4, u.unstable_NormalPriority = 3, u.unstable_Profiling = null, u.unstable_UserBlockingPriority = 2, u.unstable_cancelCallback = function(V) {
      V.callback = null;
    }, u.unstable_forceFrameRate = function(V) {
      0 > V || 125 < V ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : he = 0 < V ? Math.floor(1e3 / V) : 5;
    }, u.unstable_getCurrentPriorityLevel = function() {
      return N;
    }, u.unstable_next = function(V) {
      switch (N) {
        case 1:
        case 2:
        case 3:
          var ue = 3;
          break;
        default:
          ue = N;
      }
      var re = N;
      N = ue;
      try {
        return V();
      } finally {
        N = re;
      }
    }, u.unstable_requestPaint = function() {
      j = !0;
    }, u.unstable_runWithPriority = function(V, ue) {
      switch (V) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          V = 3;
      }
      var re = N;
      N = V;
      try {
        return ue();
      } finally {
        N = re;
      }
    }, u.unstable_scheduleCallback = function(V, ue, re) {
      var Se = u.unstable_now();
      switch (typeof re == "object" && re !== null ? (re = re.delay, re = typeof re == "number" && 0 < re ? Se + re : Se) : re = Se, V) {
        case 1:
          var Ee = -1;
          break;
        case 2:
          Ee = 250;
          break;
        case 5:
          Ee = 1073741823;
          break;
        case 4:
          Ee = 1e4;
          break;
        default:
          Ee = 5e3;
      }
      return Ee = re + Ee, V = {
        id: A++,
        callback: ue,
        priorityLevel: V,
        startTime: re,
        expirationTime: Ee,
        sortIndex: -1
      }, re > Se ? (V.sortIndex = re, r(x, V), o(S) === null && V === o(x) && (B ? (Z(ee), ee = -1) : B = !0, Ke(W, re - Se))) : (V.sortIndex = Ee, r(S, V), H || q || (H = !0, se || (se = !0, I()))), V;
    }, u.unstable_shouldYield = _e, u.unstable_wrapCallback = function(V) {
      var ue = N;
      return function() {
        var re = N;
        N = ue;
        try {
          return V.apply(this, arguments);
        } finally {
          N = re;
        }
      };
    };
  })(ed)), ed;
}
var tv;
function WS() {
  return tv || (tv = 1, Wf.exports = PS()), Wf.exports;
}
var td = { exports: {} }, Ut = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nv;
function e1() {
  if (nv) return Ut;
  nv = 1;
  var u = Md();
  function r(A) {
    var v = "https://react.dev/errors/" + A;
    if (1 < arguments.length) {
      v += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var N = 2; N < arguments.length; N++)
        v += "&args[]=" + encodeURIComponent(arguments[N]);
    }
    return "Minified React error #" + A + "; visit " + v + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o() {
  }
  var c = {
    d: {
      f: o,
      r: function() {
        throw Error(r(522));
      },
      D: o,
      C: o,
      L: o,
      m: o,
      X: o,
      S: o,
      M: o
    },
    p: 0,
    findDOMNode: null
  }, f = Symbol.for("react.portal"), d = Symbol.for("react.recoverable"), m = Symbol.for("react.optimistic_key");
  function p(A, v, N) {
    var q = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: f,
      key: q == null ? null : q === m ? m : "" + q,
      children: A,
      containerInfo: v,
      implementation: N
    };
  }
  var S = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function x(A, v) {
    if (A === "font") return "";
    if (typeof v == "string")
      return v === "use-credentials" ? v : "";
  }
  return Ut.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c, Ut.browser = function(A) {
    return { $$typeof: d, _reason: A };
  }, Ut.createPortal = function(A, v) {
    var N = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!v || v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11)
      throw Error(r(299));
    return p(A, v, null, N);
  }, Ut.flushSync = function(A) {
    var v = S.T, N = c.p;
    try {
      if (S.T = null, c.p = 2, A) return A();
    } finally {
      S.T = v, c.p = N, c.d.f();
    }
  }, Ut.preconnect = function(A, v) {
    typeof A == "string" && (v ? (v = v.crossOrigin, v = typeof v == "string" ? v === "use-credentials" ? v : "" : void 0) : v = null, c.d.C(A, v));
  }, Ut.prefetchDNS = function(A) {
    typeof A == "string" && c.d.D(A);
  }, Ut.preinit = function(A, v) {
    if (typeof A == "string" && v && typeof v.as == "string") {
      var N = v.as, q = x(N, v.crossOrigin), H = typeof v.integrity == "string" ? v.integrity : void 0, B = typeof v.fetchPriority == "string" ? v.fetchPriority : void 0;
      N === "style" ? c.d.S(
        A,
        typeof v.precedence == "string" ? v.precedence : void 0,
        {
          crossOrigin: q,
          integrity: H,
          fetchPriority: B
        }
      ) : N === "script" && c.d.X(A, {
        crossOrigin: q,
        integrity: H,
        fetchPriority: B,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0
      });
    }
  }, Ut.preinitModule = function(A, v) {
    if (typeof A == "string")
      if (typeof v == "object" && v !== null) {
        if (v.as == null || v.as === "script") {
          var N = x(
            v.as,
            v.crossOrigin
          );
          c.d.M(A, {
            crossOrigin: N,
            integrity: typeof v.integrity == "string" ? v.integrity : void 0,
            nonce: typeof v.nonce == "string" ? v.nonce : void 0,
            fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0
          });
        }
      } else v == null && c.d.M(A);
  }, Ut.preload = function(A, v) {
    if (typeof A == "string" && typeof v == "object" && v !== null && typeof v.as == "string") {
      var N = v.as, q = x(N, v.crossOrigin);
      c.d.L(A, N, {
        crossOrigin: q,
        integrity: typeof v.integrity == "string" ? v.integrity : void 0,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0,
        type: typeof v.type == "string" ? v.type : void 0,
        fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0,
        referrerPolicy: typeof v.referrerPolicy == "string" ? v.referrerPolicy : void 0,
        imageSrcSet: typeof v.imageSrcSet == "string" ? v.imageSrcSet : void 0,
        imageSizes: typeof v.imageSizes == "string" ? v.imageSizes : void 0,
        media: typeof v.media == "string" ? v.media : void 0
      });
    }
  }, Ut.preloadModule = function(A, v) {
    if (typeof A == "string")
      if (v) {
        var N = x(v.as, v.crossOrigin);
        c.d.m(A, {
          as: typeof v.as == "string" && v.as !== "script" ? v.as : void 0,
          crossOrigin: N,
          integrity: typeof v.integrity == "string" ? v.integrity : void 0,
          nonce: typeof v.nonce == "string" ? v.nonce : void 0,
          fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0
        });
      } else c.d.m(A);
  }, Ut.requestFormReset = function(A) {
    c.d.r(A);
  }, Ut.unstable_batchedUpdates = function(A, v) {
    return A(v);
  }, Ut.useFormState = function(A, v, N) {
    return S.H.useFormState(A, v, N);
  }, Ut.useFormStatus = function() {
    return S.H.useHostTransitionStatus();
  }, Ut.version = "19.3.0", Ut;
}
var lv;
function Qv() {
  if (lv) return td.exports;
  lv = 1;
  function u() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (r) {
        console.error(r);
      }
  }
  return u(), td.exports = e1(), td.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var av;
function t1() {
  if (av) return hr;
  av = 1;
  var u = WS(), r = Md(), o = Qv();
  function c(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function f(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function d(e) {
    for (var t = e, n = t; n && !n.alternate; )
      t = n, (t.flags & 4098) !== 0 && (e = t.return), n = t.return;
    for (; t.return; ) t = t.return;
    return t.tag === 3 ? e : null;
  }
  function m(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function S(e) {
    if (d(e) !== e)
      throw Error(c(188));
  }
  function x(e) {
    var t = e.alternate;
    if (!t) {
      if (t = d(e), t === null) throw Error(c(188));
      return t !== e ? null : e;
    }
    for (var n = e, l = t; ; ) {
      var a = n.return;
      if (a === null) break;
      var i = a.alternate;
      if (i === null) {
        if (l = a.return, l !== null) {
          n = l;
          continue;
        }
        break;
      }
      if (a.child === i.child) {
        for (i = a.child; i; ) {
          if (i === n) return S(a), e;
          if (i === l) return S(a), t;
          i = i.sibling;
        }
        throw Error(c(188));
      }
      if (n.return !== l.return) n = a, l = i;
      else {
        for (var s = !1, h = a.child; h; ) {
          if (h === n) {
            s = !0, n = a, l = i;
            break;
          }
          if (h === l) {
            s = !0, l = a, n = i;
            break;
          }
          h = h.sibling;
        }
        if (!s) {
          for (h = i.child; h; ) {
            if (h === n) {
              s = !0, n = i, l = a;
              break;
            }
            if (h === l) {
              s = !0, l = i, n = a;
              break;
            }
            h = h.sibling;
          }
          if (!s) throw Error(c(189));
        }
      }
      if (n.alternate !== l) throw Error(c(190));
    }
    if (n.tag !== 3) throw Error(c(188));
    return n.stateNode.current === n ? e : t;
  }
  function A(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = A(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  function v(e, t, n, l, a, i) {
    for (; e !== null; ) {
      if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && n(e, l, a, i) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && v(
        e.child,
        t,
        n,
        l,
        a,
        i
      ))
        return !0;
      e = e.sibling;
    }
    return !1;
  }
  function N(e) {
    for (e = e.return; e !== null; ) {
      if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
      e = e.return;
    }
    return null;
  }
  function q(e) {
    var t = !1;
    for (e = e.return; e !== null && (e.tag === 4 && (t = !0), !(e.tag === 3 || e.tag === 5 || e.tag === 27)); )
      e = e.return;
    return t;
  }
  function H(e) {
    var t = [null, null], n = N(e);
    return n === null || B(
      t,
      e,
      n.child,
      { foundSelf: !1 }
    ), t;
  }
  function B(e, t, n, l) {
    for (; n !== null; ) {
      if (n === t) l.foundSelf = !0;
      else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
        if (l.foundSelf) return e[1] = n, !0;
        e[0] = n;
      } else if ((n.tag !== 22 || n.memoizedState === null) && B(
        e,
        t,
        n.child,
        l
      ))
        return !0;
      n = n.sibling;
    }
    return !1;
  }
  function j(e) {
    switch (e.tag) {
      case 5:
      case 27:
      case 6:
        return e.stateNode;
      case 3:
        return e.stateNode.containerInfo;
      default:
        throw Error(c(559));
    }
  }
  var Q = null, Z = null;
  function ae(e, t, n) {
    return e === n ? !0 : e === t ? (Q = e, !0) : !1;
  }
  function ie(e, t, n) {
    return e === n ? (Z = e, !1) : e === t ? (Z !== null && (Q = e), !0) : !1;
  }
  function W(e) {
    if (e === null) return null;
    do
      e = e === null ? null : e.return;
    while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
    return e || null;
  }
  function se(e, t, n) {
    for (var l = 0, a = e; a; a = n(a)) l++;
    a = 0;
    for (var i = t; i; i = n(i)) a++;
    for (; 0 < l - a; ) e = n(e), l--;
    for (; 0 < a - l; ) t = n(t), a--;
    for (; l--; ) {
      if (e === t || t !== null && e === t.alternate)
        return e;
      e = n(e), t = n(t);
    }
    return null;
  }
  var ee = Object.assign, he = Symbol.for("react.element"), Fe = Symbol.for("react.transitional.element"), _e = Symbol.for("react.portal"), ze = Symbol.for("react.fragment"), I = Symbol.for("react.strict_mode"), bt = Symbol.for("react.profiler"), ot = Symbol.for("react.consumer"), Ke = Symbol.for("react.context"), V = Symbol.for("react.forward_ref"), ue = Symbol.for("react.suspense"), re = Symbol.for("react.suspense_list"), Se = Symbol.for("react.memo"), Ee = Symbol.for("react.lazy"), et = Symbol.for("react.activity"), Nn = Symbol.for("react.legacy_hidden"), fl = Symbol.for("react.memo_cache_sentinel"), T = Symbol.for("react.view_transition"), L = Symbol.for("react.recoverable"), te = Symbol.iterator;
  function ne(e) {
    return e === null || typeof e != "object" ? null : (e = te && e[te] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Re = Symbol.for("react.client.reference");
  function Ne(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Re ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case ze:
        return "Fragment";
      case bt:
        return "Profiler";
      case I:
        return "StrictMode";
      case ue:
        return "Suspense";
      case re:
        return "SuspenseList";
      case et:
        return "Activity";
      case T:
        return "ViewTransition";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case _e:
          return "Portal";
        case Ke:
          return e.displayName || "Context";
        case ot:
          return (e._context.displayName || "Context") + ".Consumer";
        case V:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case Se:
          return t = e.displayName || null, t !== null ? t : Ne(e.type) || "Memo";
        case Ee:
          t = e._payload, e = e._init;
          try {
            return Ne(e(t));
          } catch {
          }
      }
    return null;
  }
  var De = Array.isArray, P = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, fe = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, wn = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, li = [], je = -1;
  function Zt(e) {
    return { current: e };
  }
  function me(e) {
    0 > je || (e.current = li[je], li[je] = null, je--);
  }
  function Le(e, t) {
    je++, li[je] = e.current, e.current = t;
  }
  var ct = Zt(null), zn = Zt(null), Dn = Zt(null), en = Zt(null);
  function Ta(e, t) {
    switch (Le(Dn, t), Le(zn, e), Le(ct, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? ig(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = ig(t), e = ug(t, e);
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    me(ct), Le(ct, e);
  }
  function Qn() {
    me(ct), me(zn), me(Dn);
  }
  function ai(e) {
    var t = e.memoizedState;
    t !== null && (Ji._currentValue = t.memoizedState, Le(en, e)), t = ct.current;
    var n = ug(t, e.type);
    t !== n && (Le(zn, e), Le(ct, n));
  }
  function xa(e) {
    zn.current === e && (me(ct), me(zn)), en.current === e && (me(en), Ji._currentValue = wn);
  }
  var pn, Zn;
  function kt(e) {
    if (pn === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        pn = t && t[1] || "", Zn = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + pn + e + Zn;
  }
  var _a = !1;
  function jl(e, t) {
    if (!e || _a) return "";
    _a = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var k = function() {
                throw Error();
              };
              if (Object.defineProperty(k.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(k, []);
                } catch (X) {
                  var _ = X;
                }
                Reflect.construct(e, [], k);
              } else {
                try {
                  k.call();
                } catch (X) {
                  _ = X;
                }
                k = !1;
                try {
                  var D = Object.getOwnPropertyDescriptor(
                    e.prototype,
                    "props"
                  );
                  Object.defineProperty(e.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), k = !0, new e();
                } finally {
                  k && (D !== void 0 ? Object.defineProperty(e.prototype, "props", D) : delete e.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (X) {
                _ = X;
              }
              (k = e()) && typeof k.catch == "function" && k.catch(function() {
              });
            }
          } catch (X) {
            if (X && _ && typeof X.stack == "string")
              return [X.stack, _.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var a = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      a && a.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var i = l.DetermineComponentFrameRoot(), s = i[0], h = i[1];
      if (s && h) {
        var b = s.split(`
`), R = h.split(`
`);
        for (a = l = 0; l < b.length && !b[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; a < R.length && !R[a].includes(
          "DetermineComponentFrameRoot"
        ); )
          a++;
        if (l === b.length || a === R.length)
          for (l = b.length - 1, a = R.length - 1; 1 <= l && 0 <= a && b[l] !== R[a]; )
            a--;
        for (; 1 <= l && 0 <= a; l--, a--)
          if (b[l] !== R[a]) {
            if (l !== 1 || a !== 1)
              do
                if (l--, a--, 0 > a || b[l] !== R[a]) {
                  var M = `
` + b[l].replace(" at new ", " at ");
                  return e.displayName && M.includes("<anonymous>") && (M = M.replace("<anonymous>", e.displayName)), M;
                }
              while (1 <= l && 0 <= a);
            break;
          }
      }
    } finally {
      _a = !1, Error.prepareStackTrace = n;
    }
    return (n = e ? e.displayName || e.name : "") ? kt(n) : "";
  }
  function ii(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return kt(e.type);
      case 16:
        return kt("Lazy");
      case 13:
        return e.child !== t && t !== null ? kt("Suspense Fallback") : kt("Suspense");
      case 19:
        return kt("SuspenseList");
      case 0:
      case 15:
        return jl(e.type, !1);
      case 11:
        return jl(e.type.render, !1);
      case 1:
        return jl(e.type, !0);
      case 31:
        return kt("Activity");
      case 30:
        return kt("ViewTransition");
      default:
        return "";
    }
  }
  function ui(e) {
    try {
      var t = "", n = null;
      do
        t += ii(e, n), n = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var Kn = Object.prototype.hasOwnProperty, Ul = u.unstable_scheduleCallback, kl = u.unstable_cancelCallback, Nr = u.unstable_shouldYield, wr = u.unstable_requestPaint, Lt = u.unstable_now, mu = u.unstable_getCurrentPriorityLevel, ri = u.unstable_ImmediatePriority, dl = u.unstable_UserBlockingPriority, Mn = u.unstable_NormalPriority, zr = u.unstable_LowPriority, pu = u.unstable_IdlePriority, Dr = u.log, Mr = u.unstable_setDisableYieldValue, Ll = null, St = null;
  function tn(e) {
    if (typeof Dr == "function" && Mr(e), St && typeof St.setStrictMode == "function")
      try {
        St.setStrictMode(Ll, e);
      } catch {
      }
  }
  var tt = Math.clz32 ? Math.clz32 : vu, Hl = Math.log, gu = Math.LN2;
  function vu(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Hl(e) / gu | 0) | 0;
  }
  var oi = 256, Aa = 262144, Bl = 4194304;
  function Jn(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & -e;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Gl(e, t, n) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var a = 0, i = e.suspendedLanes, s = e.pingedLanes;
    e = e.warmLanes;
    var h = l & 134217727;
    return h !== 0 ? (l = h & ~i, l !== 0 ? a = Jn(l) : (s &= h, s !== 0 ? a = Jn(s) : n || (n = h & ~e, n !== 0 && (a = Jn(n))))) : (h = l & ~i, h !== 0 ? a = Jn(h) : s !== 0 ? a = Jn(s) : n || (n = l & ~e, n !== 0 && (a = Jn(n)))), a === 0 ? 0 : t !== 0 && t !== a && (t & i) === 0 && (i = a & -a, n = t & -t, i >= n || i === 32 && (n & 4194048) !== 0) ? t : a;
  }
  function Oa(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Yl(e, t) {
    (t & 8) !== 0 && (t |= t & 32);
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var l = 31 - tt(n), a = 1 << l;
        t |= e[l], n &= ~a;
      }
    return t;
  }
  function xc(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function jr() {
    var e = Bl;
    return Bl <<= 1, (Bl & 62914560) === 0 && (Bl = 4194304), e;
  }
  function Pe(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function gn(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function _c(e, t, n, l, a, i) {
    var s = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var h = e.entanglements, b = e.expirationTimes, R = e.hiddenUpdates;
    for (n = s & ~n; 0 < n; ) {
      var M = 31 - tt(n), k = 1 << M;
      h[M] = 0, b[M] = -1;
      var _ = R[M];
      if (_ !== null)
        for (R[M] = null, M = 0; M < _.length; M++) {
          var D = _[M];
          D !== null && (D.lane &= -536870913);
        }
      n &= ~k;
    }
    l !== 0 && yu(e, l, 0), i !== 0 && a === 0 && e.tag !== 0 && (e.suspendedLanes |= i & ~(s & ~t));
  }
  function yu(e, t, n) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - tt(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | n & 261930;
  }
  function ci(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var l = 31 - tt(n), a = 1 << l;
      a & t | e[l] & t && (e[l] |= t), n &= ~a;
    }
  }
  function bu(e, t) {
    var n = t & -t;
    return n = (n & 42) !== 0 ? 1 : si(n), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n;
  }
  function si(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Su(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Ur() {
    var e = fe.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Vg(e.type));
  }
  function kr(e, t) {
    var n = fe.p;
    try {
      return fe.p = e, t();
    } finally {
      fe.p = n;
    }
  }
  var jn = Math.random().toString(36).slice(2), Je = "__reactFiber$" + jn, Rt = "__reactProps$" + jn, Un = "__reactContainer$" + jn, $n = "__reactEvents$" + jn, Ac = "__reactListeners$" + jn, fi = "__reactHandles$" + jn, Eu = "__reactResources$" + jn, Ra = "__reactMarker$" + jn, Ca = "__reactLoad$" + jn;
  function Na(e) {
    delete e[Je], delete e[Rt], delete e[Ac], delete e[fi];
  }
  function vn(e) {
    var t;
    if (t = e[Je]) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[Un] || n[Je]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = xg(e); e !== null; ) {
            if (n = e[Je]) return n;
            e = xg(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function In(e) {
    if (e = e[Je] || e[Un]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Fn(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(c(33));
  }
  function nn(e) {
    var t = e[Eu];
    return t || (t = e[Eu] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function nt(e) {
    e[Ra] = !0;
  }
  function ln(e) {
    e[Ca] = void 0;
  }
  var Lr = /* @__PURE__ */ new Set(), wa = {};
  function hl(e, t) {
    ml(e, t), ml(e + "Capture", t);
  }
  function ml(e, t) {
    for (wa[e] = t, e = 0; e < t.length; e++)
      Lr.add(t[e]);
  }
  var Hr = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Tu = {}, xu = {};
  function Oc(e) {
    return Kn.call(xu, e) ? !0 : Kn.call(Tu, e) ? !1 : Hr.test(e) ? xu[e] = !0 : (Tu[e] = !0, !1);
  }
  var Ce = !1;
  function Br() {
    var e = Ce;
    return Ce = !1, e;
  }
  function di(e, t, n) {
    if (Oc(t))
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var l = t.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, n);
      }
  }
  function za(e, t, n) {
    if (n === null) e.removeAttribute(t);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, n);
    }
  }
  function Kt(e, t, n, l) {
    if (l === null) e.removeAttribute(n);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, l);
    }
  }
  function Ct(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Y(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function g(e, t, n) {
    var l = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var a = l.get, i = l.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return a.call(this);
        },
        set: function(s) {
          n = "" + s, i.call(this, s);
        }
      }), Object.defineProperty(e, t, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return n;
        },
        setValue: function(s) {
          n = "" + s;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function C(e) {
    if (!e._valueTracker) {
      var t = Y(e) ? "checked" : "value";
      e._valueTracker = g(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function G(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), l = "";
    return e && (l = Y(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== n ? (t.setValue(e), !0) : !1;
  }
  var K = /[\n"\\]/g;
  function J(e) {
    return e.replace(
      K,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function oe(e, t, n, l, a, i, s, h) {
    e.name = "", s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.type = s : e.removeAttribute("type"), t != null ? s === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Ct(t)) : e.value !== "" + Ct(t) && (e.value = "" + Ct(t)) : s !== "submit" && s !== "reset" || e.removeAttribute("value"), t != null ? s === "number" && e.value == t ? Qe(e, Ct(e.value)) : Qe(e, Ct(t)) : n != null ? Qe(e, Ct(n)) : l != null && e.removeAttribute("value"), a == null && i != null && (e.defaultChecked = !!i), a != null && (e.checked = a && typeof a != "function" && typeof a != "symbol"), h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? e.name = "" + Ct(h) : e.removeAttribute("name");
  }
  function Be(e, t, n, l, a, i, s, h) {
    if (i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (e.type = i), t != null || n != null) {
      if (!(i !== "submit" && i !== "reset" || t != null)) {
        C(e);
        return;
      }
      n = n != null ? "" + Ct(n) : "", t = t != null ? "" + Ct(t) : n, h || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? a, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = h ? e.checked : !!l, e.defaultChecked = !!l, s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (e.name = s), C(e);
  }
  function Qe(e, t) {
    e.defaultValue !== "" + t && (e.defaultValue = "" + t);
  }
  function st(e, t, n, l) {
    if (e = e.options, t) {
      t = {};
      for (var a = 0; a < n.length; a++)
        t["$" + n[a]] = !0;
      for (n = 0; n < e.length; n++)
        a = t.hasOwnProperty("$" + e[n].value), e[n].selected !== a && (e[n].selected = a), a && l && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + Ct(n), t = null, a = 0; a < e.length; a++) {
        if (e[a].value === n) {
          e[a].selected = !0, l && (e[a].defaultSelected = !0);
          return;
        }
        t !== null || e[a].disabled || (t = e[a]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Nt(e, t, n) {
    if (t != null && (t = "" + Ct(t), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + Ct(n) : "";
  }
  function hi(e, t, n, l) {
    if (t == null) {
      if (l != null) {
        if (n != null) throw Error(c(92));
        if (De(l)) {
          if (1 < l.length) throw Error(c(93));
          l = l[0];
        }
        n = l;
      }
      n == null && (n = ""), t = n;
    }
    n = Ct(t), e.defaultValue = n, l = e.textContent, l === n && l !== "" && l !== null && (e.value = l), C(e);
  }
  function it(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Gr = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Rc(e, t, n) {
    var l = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Gr.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function Pd(e, t, n) {
    if (t != null && typeof t != "object")
      throw Error(c(62));
    if (e = e.style, n != null) {
      for (var l in n)
        !n.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "", Ce = !0);
      for (var a in t)
        l = t[a], t.hasOwnProperty(a) && n[a] !== l && (Rc(e, a, l), Ce = !0);
    } else
      for (var i in t)
        t.hasOwnProperty(i) && Rc(e, i, t[i]);
  }
  function Cc(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var pb = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["maskType", "mask-type"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), gb = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Yr(e) {
    return gb.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Pn() {
  }
  var Nc = null;
  function wc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var mi = null, pi = null;
  function Wd(e) {
    var t = In(e);
    if (t && (e = t.stateNode)) {
      var n = e[Rt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (oe(
            e,
            n.value,
            n.defaultValue,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name
          ), t = n.name, n.type === "radio" && t != null) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (n = n.querySelectorAll(
              'input[name="' + J(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < n.length; t++) {
              var l = n[t];
              if (l !== e && l.form === e.form) {
                var a = l[Rt] || null;
                if (!a) throw Error(c(90));
                oe(
                  l,
                  a.value,
                  a.defaultValue,
                  a.defaultValue,
                  a.checked,
                  a.defaultChecked,
                  a.type,
                  a.name
                );
              }
            }
            for (t = 0; t < n.length; t++)
              l = n[t], l.form === e.form && G(l);
          }
          break e;
        case "textarea":
          Nt(e, n.value, n.defaultValue);
          break e;
        case "select":
          t = n.value, t != null && st(e, !!n.multiple, t, !1);
      }
    }
  }
  var zc = !1;
  function eh(e, t, n) {
    if (zc) return e(t, n);
    zc = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (zc = !1, (mi !== null || pi !== null) && (qo(), mi && (t = mi, e = pi, pi = mi = null, Wd(t), e)))
        for (t = 0; t < e.length; t++) Wd(e[t]);
    }
  }
  function _u(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var l = n[Rt] || null;
    if (l === null) return null;
    n = l[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (l = !l.disabled) || (e = e.type, l = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !l;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function")
      throw Error(
        c(231, t, typeof n)
      );
    return n;
  }
  var pl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Dc = !1;
  if (pl)
    try {
      var Au = {};
      Object.defineProperty(Au, "passive", {
        get: function() {
          Dc = !0;
        }
      }), window.addEventListener("test", Au, Au), window.removeEventListener("test", Au, Au);
    } catch {
      Dc = !1;
    }
  var ql = null, Mc = null, qr = null;
  function th() {
    if (qr) return qr;
    var e, t = Mc, n = t.length, l, a = "value" in ql ? ql.value : ql.textContent, i = a.length;
    for (e = 0; e < n && t[e] === a[e]; e++) ;
    var s = n - e;
    for (l = 1; l <= s && t[n - l] === a[i - l]; l++) ;
    return qr = a.slice(e, 1 < l ? 1 - l : void 0);
  }
  function Vr(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Xr() {
    return !0;
  }
  function nh() {
    return !1;
  }
  function Yt(e) {
    function t(n, l, a, i, s) {
      this._reactName = n, this._targetInst = a, this.type = l, this.nativeEvent = i, this.target = s, this.currentTarget = null;
      for (var h in e)
        e.hasOwnProperty(h) && (n = e[h], this[h] = n ? n(i) : i[h]);
      return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? Xr : nh, this.isPropagationStopped = nh, this;
    }
    return ee(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Xr);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Xr);
      },
      persist: function() {
      },
      isPersistent: Xr
    }), t;
  }
  var Vl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Qr = Yt(Vl), Ou = ee({}, Vl, { view: 0, detail: 0 }), vb = Yt(Ou), jc, Uc, Ru, Zr = ee({}, Ou, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Lc,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Ru && (Ru && e.type === "mousemove" ? (jc = e.screenX - Ru.screenX, Uc = e.screenY - Ru.screenY) : Uc = jc = 0, Ru = e), jc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Uc;
    }
  }), lh = Yt(Zr), yb = ee({}, Zr, { dataTransfer: 0 }), bb = Yt(yb), Sb = ee({}, Ou, { relatedTarget: 0 }), kc = Yt(Sb), Eb = ee({}, Vl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Tb = Yt(Eb), xb = ee({}, Vl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), _b = Yt(xb), Ab = ee({}, Vl, { data: 0 }), ah = Yt(Ab), Ob = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Rb = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Cb = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Nb(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Cb[e]) ? !!t[e] : !1;
  }
  function Lc() {
    return Nb;
  }
  var wb = ee({}, Ou, {
    key: function(e) {
      if (e.key) {
        var t = Ob[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Vr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Rb[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Lc,
    charCode: function(e) {
      return e.type === "keypress" ? Vr(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Vr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), zb = Yt(wb), Db = ee({}, Zr, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), ih = Yt(Db), Mb = ee({}, Vl, { submitter: 0 }), jb = Yt(Mb), Ub = ee({}, Ou, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Lc
  }), kb = Yt(Ub), Lb = ee({}, Vl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Hb = Yt(Lb), Bb = ee({}, Zr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Gb = Yt(Bb), Yb = ee({}, Vl, {
    newState: 0,
    oldState: 0,
    source: 0
  }), qb = Yt(Yb), Vb = [9, 13, 27, 32], Hc = pl && "CompositionEvent" in window, Cu = null;
  pl && "documentMode" in document && (Cu = document.documentMode);
  var Xb = pl && "TextEvent" in window && !Cu, uh = pl && (!Hc || Cu && 8 < Cu && 11 >= Cu), rh = " ", oh = !1;
  function ch(e, t) {
    switch (e) {
      case "keyup":
        return Vb.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function sh(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var gi = !1;
  function Qb(e, t) {
    switch (e) {
      case "compositionend":
        return sh(t);
      case "keypress":
        return t.which !== 32 ? null : (oh = !0, rh);
      case "textInput":
        return e = t.data, e === rh && oh ? null : e;
      default:
        return null;
    }
  }
  function Zb(e, t) {
    if (gi)
      return e === "compositionend" || !Hc && ch(e, t) ? (e = th(), qr = Mc = ql = null, gi = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return uh && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Kb = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function fh(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Kb[e.type] : t === "textarea";
  }
  function dh(e, t, n, l) {
    mi ? pi ? pi.push(l) : pi = [l] : mi = l, t = Jo(t, "onChange"), 0 < t.length && (n = new Qr(
      "onChange",
      "change",
      null,
      n,
      l
    ), e.push({ event: n, listeners: t }));
  }
  var Nu = null, wu = null;
  function Jb(e) {
    Wp(e, 0);
  }
  function Kr(e) {
    var t = Fn(e);
    if (G(t)) return e;
  }
  function hh(e, t) {
    if (e === "change") return t;
  }
  var mh = !1;
  if (pl) {
    var Bc;
    if (pl) {
      var Gc = "oninput" in document;
      if (!Gc) {
        var ph = document.createElement("div");
        ph.setAttribute("oninput", "return;"), Gc = typeof ph.oninput == "function";
      }
      Bc = Gc;
    } else Bc = !1;
    mh = Bc && (!document.documentMode || 9 < document.documentMode);
  }
  function gh() {
    Nu && (Nu.detachEvent("onpropertychange", vh), wu = Nu = null);
  }
  function vh(e) {
    if (e.propertyName === "value" && Kr(wu)) {
      var t = [];
      dh(
        t,
        wu,
        e,
        wc(e)
      ), eh(Jb, t);
    }
  }
  function $b(e, t, n) {
    e === "focusin" ? (gh(), Nu = t, wu = n, Nu.attachEvent("onpropertychange", vh)) : e === "focusout" && gh();
  }
  function Ib(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Kr(wu);
  }
  function Fb(e, t) {
    if (e === "click") return Kr(t);
  }
  function Pb(e, t) {
    if (e === "input" || e === "change")
      return Kr(t);
  }
  function Wb(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var an = typeof Object.is == "function" ? Object.is : Wb;
  function zu(e, t) {
    if (an(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), l = Object.keys(t);
    if (n.length !== l.length) return !1;
    for (l = 0; l < n.length; l++) {
      var a = n[l];
      if (!Kn.call(t, a) || !an(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  function Yc(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function yh(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function bh(e, t) {
    var n = yh(e);
    e = 0;
    for (var l; n; ) {
      if (n.nodeType === 3) {
        if (l = e + n.textContent.length, e <= t && l >= t)
          return { node: n, offset: t - e };
        e = l;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = yh(n);
    }
  }
  function Sh(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Sh(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Eh(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Yc(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Yc(e.document);
    }
    return t;
  }
  function qc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var e0 = pl && "documentMode" in document && 11 >= document.documentMode, vi = null, Vc = null, Du = null, Xc = !1;
  function Th(e, t, n) {
    var l = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Xc || vi == null || vi !== Yc(l) || (l = vi, "selectionStart" in l && qc(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), Du && zu(Du, l) || (Du = l, l = Jo(Vc, "onSelect"), 0 < l.length && (t = new Qr(
      "onSelect",
      "select",
      null,
      t,
      n
    ), e.push({ event: t, listeners: l }), t.target = vi)));
  }
  function Da(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var yi = {
    animationend: Da("Animation", "AnimationEnd"),
    animationiteration: Da("Animation", "AnimationIteration"),
    animationstart: Da("Animation", "AnimationStart"),
    transitionrun: Da("Transition", "TransitionRun"),
    transitionstart: Da("Transition", "TransitionStart"),
    transitioncancel: Da("Transition", "TransitionCancel"),
    transitionend: Da("Transition", "TransitionEnd")
  }, Qc = {}, xh = {};
  pl && (xh = document.createElement("div").style, "AnimationEvent" in window || (delete yi.animationend.animation, delete yi.animationiteration.animation, delete yi.animationstart.animation), "TransitionEvent" in window || delete yi.transitionend.transition);
  function Ma(e) {
    if (Qc[e]) return Qc[e];
    if (!yi[e]) return e;
    var t = yi[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in xh)
        return Qc[e] = t[n];
    return e;
  }
  var _h = Ma("animationend"), Ah = Ma("animationiteration"), Oh = Ma("animationstart"), t0 = Ma("transitionrun"), n0 = Ma("transitionstart"), l0 = Ma("transitioncancel"), Rh = Ma("transitionend"), Ch = /* @__PURE__ */ new Map(), Zc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Zc.push("scrollEnd");
  function kn(e, t) {
    Ch.set(e, t), hl(t, [e]);
  }
  var a0 = 0;
  function gl(e, t) {
    if (e.name != null && e.name !== "auto") return e.name;
    if (t.autoName !== null) return t.autoName;
    e = Gn.identifierPrefix;
    var n = a0++;
    return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
  }
  function Nh(e) {
    if (e == null || typeof e == "string")
      return e;
    var t = null, n = Hi;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var a = e[n[l]];
        if (a != null) {
          if (a === "none") return "none";
          t = t == null ? a : t + (" " + a);
        }
      }
    return t ?? e.default;
  }
  function vl(e, t) {
    return e = Nh(e), t = Nh(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
  }
  var Jr = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, yn = [], bi = 0, Kc = 0;
  function $r() {
    for (var e = bi, t = Kc = bi = 0; t < e; ) {
      var n = yn[t];
      yn[t++] = null;
      var l = yn[t];
      yn[t++] = null;
      var a = yn[t];
      yn[t++] = null;
      var i = yn[t];
      if (yn[t++] = null, l !== null && a !== null) {
        var s = l.pending;
        s === null ? a.next = a : (a.next = s.next, s.next = a), l.pending = a;
      }
      i !== 0 && wh(n, a, i);
    }
  }
  function Ir(e, t, n, l) {
    yn[bi++] = e, yn[bi++] = t, yn[bi++] = n, yn[bi++] = l, Kc |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function Jc(e, t, n, l) {
    return Ir(e, t, n, l), Fr(e);
  }
  function ja(e, t) {
    return Ir(e, null, null, t), Fr(e);
  }
  function wh(e, t, n) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n);
    for (var a = !1, i = e.return; i !== null; )
      i.childLanes |= n, l = i.alternate, l !== null && (l.childLanes |= n), i.tag === 22 && (e = i.stateNode, e === null || e._visibility & 1 || (a = !0)), e = i, i = i.return;
    return e.tag === 3 ? (i = e.stateNode, a && t !== null && (a = 31 - tt(n), e = i.hiddenUpdates, l = e[a], l === null ? e[a] = [t] : l.push(t), t.lane = n | 536870912), i) : null;
  }
  function Fr(e) {
    if (50 < er)
      throw er = 0, Yo = null, Error(c(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Si = {};
  function i0(e, t, n, l) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Jt(e, t, n, l) {
    return new i0(e, t, n, l);
  }
  function $c(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function yl(e, t) {
    var n = e.alternate;
    return n === null ? (n = Jt(
      e.tag,
      t,
      e.key,
      e.mode
    ), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 1206910976, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
  }
  function zh(e, t) {
    e.flags &= 1206910978;
    var n = e.alternate;
    return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Pr(e, t, n, l, a, i) {
    var s = 0;
    if (l = e, typeof l == "function") $c(l) && (s = 1);
    else if (typeof l == "string")
      s = MS(
        e,
        n,
        ct.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (l) {
        case et:
          return e = Jt(31, n, t, a), e.elementType = et, e.lanes = i, e;
        case ze:
          return Ua(n.children, a, i, t);
        case I:
          s = 8, a |= 24;
          break;
        case bt:
          return e = Jt(12, n, t, a | 2), e.elementType = bt, e.lanes = i, e;
        case ue:
          return e = Jt(13, n, t, a), e.elementType = ue, e.lanes = i, e;
        case re:
          return e = Jt(19, n, t, a), e.elementType = re, e.lanes = i, e;
        case Nn:
        case T:
          return e = a | 32, e = Jt(30, n, t, e), e.elementType = T, e.lanes = i, e.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, e;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case Ke:
                s = 10;
                break e;
              case ot:
                s = 9;
                break e;
              case V:
                s = 11;
                break e;
              case Se:
                s = 14;
                break e;
              case Ee:
                s = 16, l = null;
                break e;
            }
          s = 29, n = Error(
            c(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = Jt(s, n, t, a), t.elementType = e, t.type = l, t.lanes = i, t;
  }
  function Ua(e, t, n, l) {
    return e = Jt(7, e, l, t), e.lanes = n, e;
  }
  function Ic(e, t, n) {
    return e = Jt(6, e, null, t), e.lanes = n, e;
  }
  function Dh(e) {
    var t = Jt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Fc(e, t, n) {
    return t = Jt(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = n, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var Mh = /* @__PURE__ */ new WeakMap();
  function bn(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = Mh.get(e);
      return n !== void 0 ? n : (t = {
        value: e,
        source: t,
        stack: ui(t)
      }, Mh.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: ui(t)
    };
  }
  var Ei = [], Ti = 0, Wr = null, Mu = 0, Sn = [], En = 0, Xl = null, Wn = 1, el = "";
  function bl(e, t) {
    Ei[Ti++] = Mu, Ei[Ti++] = Wr, Wr = e, Mu = t;
  }
  function jh(e, t, n) {
    Sn[En++] = Wn, Sn[En++] = el, Sn[En++] = Xl, Xl = e;
    var l = Wn;
    e = el;
    var a = 32 - tt(l) - 1;
    l &= ~(1 << a), n += 1;
    var i = 32 - tt(t) + a;
    if (30 < i) {
      var s = a - a % 5;
      i = (l & (1 << s) - 1).toString(32), l >>= s, a -= s, Wn = 1 << 32 - tt(t) + a | n << a | l, el = i + e;
    } else
      Wn = 1 << i | n << a | l, el = e;
  }
  function eo(e) {
    e.return !== null && (bl(e, 1), jh(e, 1, 0));
  }
  function Pc(e) {
    for (; e === Wr; )
      Wr = Ei[--Ti], Ei[Ti] = null, Mu = Ei[--Ti], Ei[Ti] = null;
    for (; e === Xl; )
      Xl = Sn[--En], Sn[En] = null, el = Sn[--En], Sn[En] = null, Wn = Sn[--En], Sn[En] = null;
  }
  function Uh(e, t) {
    Sn[En++] = Wn, Sn[En++] = el, Sn[En++] = Xl, Wn = t.id, el = t.overflow, Xl = e;
  }
  var Et = null, $e = null, be = !1, Ql = null, Tn = !1, Wc = Error(c(519));
  function Zl(e) {
    var t = Error(
      c(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw ju(bn(t, e)), Wc;
  }
  function kh(e) {
    var t = e.stateNode, n = e.type, l = e.memoizedProps;
    switch (t[Je] = e, t[Rt] = l, n) {
      case "dialog":
        xe("cancel", t), xe("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        xe("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < nr.length; n++)
          xe(nr[n], t);
        break;
      case "source":
        xe("error", t);
        break;
      case "img":
      case "image":
      case "link":
        xe("error", t), xe("load", t);
        break;
      case "details":
        xe("toggle", t);
        break;
      case "input":
        xe("invalid", t), Be(
          t,
          l.value,
          l.defaultValue,
          l.checked,
          l.defaultChecked,
          l.type,
          l.name,
          !0
        );
        break;
      case "select":
        xe("invalid", t);
        break;
      case "textarea":
        xe("invalid", t), hi(t, l.value, l.defaultValue, l.children);
    }
    n = l.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || l.suppressHydrationWarning === !0 || lg(t.textContent, n) ? (l.popover != null && (xe("beforetoggle", t), xe("toggle", t)), l.onScroll != null && xe("scroll", t), l.onScrollEnd != null && xe("scrollend", t), l.onClick != null && (t.onclick = Pn), t = !0) : t = !1, t || Zl(e, !0);
  }
  function to(e) {
    for (Et = e.return; Et; )
      switch (Et.tag) {
        case 5:
        case 31:
        case 13:
          Tn = !1;
          return;
        case 27:
        case 3:
          Tn = !0;
          return;
        default:
          Et = Et.return;
      }
  }
  function xi(e) {
    if (e !== Et) return !1;
    if (!be) return to(e), be = !0, !1;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || wf(e.type, e.memoizedProps)), n = !n), n && $e && Zl(e), to(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
      $e = Tg(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
      $e = Tg(e);
    } else
      t === 27 ? (t = $e, oa(e.type) ? (e = Bf, Bf = null, $e = e) : $e = t) : $e = Et ? _n(e.stateNode.nextSibling) : null;
    return !0;
  }
  function ka() {
    $e = Et = null, be = !1;
  }
  function es() {
    var e = Ql;
    return e !== null && (Ft === null ? Ft = e : Ft.push.apply(
      Ft,
      e
    ), Ql = null), e;
  }
  function ju(e) {
    Ql === null ? Ql = [e] : Ql.push(e);
  }
  var ts = Zt(null), La = null, Sl = null;
  function Kl(e, t, n) {
    Le(ts, t._currentValue), t._currentValue = n;
  }
  function El(e) {
    e._currentValue = ts.current, me(ts);
  }
  function no(e, t, n) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function ns(e, t, n, l) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null; ) {
      var i = a.dependencies;
      if (i !== null) {
        var s = a.child;
        i = i.firstContext;
        e: for (; i !== null; ) {
          var h = i;
          i = a;
          for (var b = 0; b < t.length; b++)
            if (h.context === t[b]) {
              i.lanes |= n, h = i.alternate, h !== null && (h.lanes |= n), no(
                i.return,
                n,
                e
              ), l || (s = null);
              break e;
            }
          i = h.next;
        }
      } else if (a.tag === 18) {
        if (s = a.return, s === null) throw Error(c(341));
        s.lanes |= n, i = s.alternate, i !== null && (i.lanes |= n), no(s, n, e), s = null;
      } else
        a.tag === 13 && a.memoizedState !== null && a.memoizedState.dehydrated === null ? (a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), no(
          a.return,
          n,
          e
        ), s = a.child, s = s !== null ? s.sibling : null) : s = a.child;
      if (s !== null) s.return = a;
      else
        for (s = a; s !== null; ) {
          if (s === e) {
            s = null;
            break;
          }
          if (a = s.sibling, a !== null) {
            a.return = s.return, s = a;
            break;
          }
          s = s.return;
        }
      a = s;
    }
  }
  function Ha(e, t, n, l) {
    e = null;
    for (var a = t, i = !1; a !== null; ) {
      if (!i) {
        if ((a.flags & 524288) !== 0) i = !0;
        else if ((a.flags & 262144) !== 0) break;
      }
      if (a.tag === 10) {
        var s = a.alternate;
        if (s === null) throw Error(c(387));
        if (s = s.memoizedProps, s !== null) {
          var h = a.type;
          an(a.pendingProps.value, s.value) || (e !== null ? e.push(h) : e = [h]);
        }
      } else if (a === en.current) {
        if (s = a.alternate, s === null) throw Error(c(387));
        s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e !== null ? e.push(Ji) : e = [Ji]);
      }
      a = a.return;
    }
    return e !== null && ns(
      t,
      e,
      n,
      l
    ), t.flags |= 262144, e !== null;
  }
  function lo(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!an(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Ba(e) {
    La = e, Sl = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function wt(e) {
    return Lh(La, e);
  }
  function ao(e, t) {
    return La === null && Ba(e), Lh(e, t);
  }
  function Lh(e, t) {
    var n = t._currentValue;
    if (t = { context: t, memoizedValue: n, next: null }, Sl === null) {
      if (e === null) throw Error(c(308));
      Sl = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Sl = Sl.next = t;
    return n;
  }
  var u0 = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(n, l) {
        e.push(l);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(n) {
        return n();
      });
    };
  }, r0 = u.unstable_scheduleCallback, o0 = u.unstable_NormalPriority, dt = {
    $$typeof: Ke,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function ls() {
    return {
      controller: new u0(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Uu(e) {
    e.refCount--, e.refCount === 0 && r0(o0, function() {
      e.controller.abort();
    });
  }
  function Hh(e, t) {
    if ((e.pendingLanes & 4194048) !== 0) {
      var n = e.transitionTypes;
      for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
        var l = t[e];
        n.indexOf(l) === -1 && n.push(l);
      }
    }
  }
  var ku = null;
  function c0(e) {
    var t = e.transitionTypes;
    return e.transitionTypes = null, t;
  }
  var Lu = null, as = 0, Ga = 0, _i = null;
  function s0(e, t) {
    if (Lu === null) {
      var n = Lu = [];
      as = 0, Ga = Ef(), _i = {
        status: "pending",
        value: void 0,
        then: function(l) {
          n.push(l);
        }
      };
    }
    return as++, t.then(Bh, Bh), t;
  }
  function Bh() {
    if (--as === 0 && (ku = null, Lu !== null)) {
      _i !== null && (_i.status = "fulfilled");
      var e = Lu;
      Lu = null, Ga = 0, _i = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function f0(e, t) {
    var n = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(a) {
        n.push(a);
      }
    };
    return e.then(
      function() {
        l.status = "fulfilled", l.value = t;
        for (var a = 0; a < n.length; a++) (0, n[a])(t);
      },
      function(a) {
        for (l.status = "rejected", l.reason = a, a = 0; a < n.length; a++)
          (0, n[a])(void 0);
      }
    ), l;
  }
  var Gh = P.S;
  P.S = function(e, t) {
    if (Dp = Lt(), typeof t == "object" && t !== null && typeof t.then == "function" && s0(e, t), ku !== null)
      for (var n = qi; n !== null; )
        Hh(n, ku), n = n.next;
    if (n = e.types, n !== null) {
      for (var l = qi; l !== null; )
        Hh(l, n), l = l.next;
      if (Ga !== 0) {
        l = ku, l === null && (l = ku = []);
        for (var a = 0; a < n.length; a++) {
          var i = n[a];
          l.indexOf(i) === -1 && l.push(i);
        }
      }
    }
    Gh !== null && Gh(e, t);
  };
  var Ya = Zt(null);
  function is() {
    var e = Ya.current;
    return e !== null ? e : Ze.pooledCache;
  }
  function io(e, t) {
    t === null ? Le(Ya, Ya.current) : Le(Ya, t.pool);
  }
  function Yh() {
    var e = is();
    return e === null ? null : { parent: dt._currentValue, pool: e };
  }
  var Ai = Error(c(460)), us = Error(c(474)), uo = Error(c(542)), ro = { then: function() {
  } };
  function qh(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Vh(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Pn, Pn), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Qh(e), e === void 0 && !("reason" in t) ? Error(c(600)) : e;
      default:
        if (typeof t.status == "string") t.then(Pn, Pn);
        else {
          if (e = Ze, e !== null && 100 < e.shellSuspendCounter)
            throw Error(c(482));
          e = t, e.status = "pending", e.then(
            function(l) {
              if (t.status === "pending") {
                var a = t;
                a.status = "fulfilled", a.value = l;
              }
            },
            function(l) {
              if (t.status === "pending") {
                var a = t;
                a.status = "rejected", a.reason = l;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, Qh(e), e;
        }
        throw Va = t, Ai;
    }
  }
  function qa(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (Va = n, Ai) : n;
    }
  }
  var Va = null;
  function Xh() {
    if (Va === null) throw Error(c(459));
    var e = Va;
    return Va = null, e;
  }
  function Qh(e) {
    if (e === Ai || e === uo)
      throw Error(c(483));
  }
  var Oi = null, Hu = 0;
  function oo(e) {
    var t = Hu;
    return Hu += 1, Oi === null && (Oi = []), Vh(Oi, e, t);
  }
  function Jl(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function co(e, t) {
    throw t.$$typeof === he ? Error(c(525)) : (e = Object.prototype.toString.call(t), Error(
      c(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Zh(e) {
    function t(O, E) {
      if (e) {
        var w = O.deletions;
        w === null ? (O.deletions = [E], O.flags |= 16) : w.push(E);
      }
    }
    function n(O, E) {
      if (!e) return null;
      for (; E !== null; )
        t(O, E), E = E.sibling;
      return null;
    }
    function l(O) {
      for (var E = /* @__PURE__ */ new Map(); O !== null; )
        O.key === null ? E.set(O.index, O) : E.set(O.key, O), O = O.sibling;
      return E;
    }
    function a(O, E) {
      return O = yl(O, E), O.index = 0, O.sibling = null, O;
    }
    function i(O, E, w) {
      return O.index = w, e ? (w = O.alternate, w !== null ? (w = w.index, w < E ? (O.flags |= 2, E) : w) : (O.flags |= 134217730, E)) : (O.flags |= 1048576, E);
    }
    function s(O) {
      return e && O.alternate === null && (O.flags |= 134217730), O;
    }
    function h(O, E, w, U) {
      return E === null || E.tag !== 6 ? (E = Ic(w, O.mode, U), E.return = O, E) : (E = a(E, w), E.return = O, E);
    }
    function b(O, E, w, U) {
      var $ = w.type;
      return $ === ze ? (O = M(
        O,
        E,
        w.props.children,
        U,
        w.key
      ), Jl(O, w), O) : E !== null && (E.elementType === $ || typeof $ == "object" && $ !== null && $.$$typeof === Ee && qa($) === E.type) ? (E = a(E, w.props), Jl(E, w), E.return = O, E) : (E = Pr(
        w.type,
        w.key,
        w.props,
        null,
        O.mode,
        U
      ), Jl(E, w), E.return = O, E);
    }
    function R(O, E, w, U) {
      return E === null || E.tag !== 4 || E.stateNode.containerInfo !== w.containerInfo || E.stateNode.implementation !== w.implementation ? (E = Fc(w, O.mode, U), E.return = O, E) : (E = a(E, w.children || []), E.return = O, E);
    }
    function M(O, E, w, U, $) {
      return E === null || E.tag !== 7 ? (E = Ua(
        w,
        O.mode,
        U,
        $
      ), E.return = O, E) : (E = a(E, w), E.return = O, E);
    }
    function k(O, E, w) {
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
        return E = Ic(
          "" + E,
          O.mode,
          w
        ), E.return = O, E;
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case Fe:
            return w = Pr(
              E.type,
              E.key,
              E.props,
              null,
              O.mode,
              w
            ), Jl(w, E), w.return = O, w;
          case _e:
            return E = Fc(
              E,
              O.mode,
              w
            ), E.return = O, E;
          case Ee:
            return E = qa(E), k(O, E, w);
        }
        if (De(E) || ne(E))
          return E = Ua(
            E,
            O.mode,
            w,
            null
          ), E.return = O, E;
        if (typeof E.then == "function")
          return k(O, oo(E), w);
        if (E.$$typeof === Ke)
          return k(
            O,
            ao(O, E),
            w
          );
        co(O, E);
      }
      return null;
    }
    function _(O, E, w, U) {
      var $ = E !== null ? E.key : null;
      if (typeof w == "string" && w !== "" || typeof w == "number" || typeof w == "bigint")
        return $ !== null ? null : h(O, E, "" + w, U);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case Fe:
            return w.key === $ ? b(O, E, w, U) : null;
          case _e:
            return w.key === $ ? R(O, E, w, U) : null;
          case Ee:
            return w = qa(w), _(O, E, w, U);
        }
        if (De(w) || ne(w))
          return $ !== null ? null : M(O, E, w, U, null);
        if (typeof w.then == "function")
          return _(
            O,
            E,
            oo(w),
            U
          );
        if (w.$$typeof === Ke)
          return _(
            O,
            E,
            ao(O, w),
            U
          );
        co(O, w);
      }
      return null;
    }
    function D(O, E, w, U, $) {
      if (typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint")
        return O = O.get(w) || null, h(E, O, "" + U, $);
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case Fe:
            return O = O.get(
              U.key === null ? w : U.key
            ) || null, b(E, O, U, $);
          case _e:
            return O = O.get(
              U.key === null ? w : U.key
            ) || null, R(E, O, U, $);
          case Ee:
            return U = qa(U), D(
              O,
              E,
              w,
              U,
              $
            );
        }
        if (De(U) || ne(U))
          return O = O.get(w) || null, M(E, O, U, $, null);
        if (typeof U.then == "function")
          return D(
            O,
            E,
            w,
            oo(U),
            $
          );
        if (U.$$typeof === Ke)
          return D(
            O,
            E,
            w,
            ao(E, U),
            $
          );
        co(E, U);
      }
      return null;
    }
    function X(O, E, w, U) {
      for (var $ = null, Oe = null, le = E, ce = E = 0, pt = null; le !== null && ce < w.length; ce++) {
        le.index > ce ? (pt = le, le = null) : pt = le.sibling;
        var we = _(
          O,
          le,
          w[ce],
          U
        );
        if (we === null) {
          le === null && (le = pt);
          break;
        }
        e && le && we.alternate === null && t(O, le), E = i(we, E, ce), Oe === null ? $ = we : Oe.sibling = we, Oe = we, le = pt;
      }
      if (ce === w.length)
        return n(O, le), be && bl(O, ce), $;
      if (le === null) {
        for (; ce < w.length; ce++)
          le = k(O, w[ce], U), le !== null && (E = i(
            le,
            E,
            ce
          ), Oe === null ? $ = le : Oe.sibling = le, Oe = le);
        return be && bl(O, ce), $;
      }
      for (le = l(le); ce < w.length; ce++)
        pt = D(
          le,
          O,
          ce,
          w[ce],
          U
        ), pt !== null && (e && (we = pt.alternate, we !== null && le.delete(we.key === null ? ce : we.key)), E = i(
          pt,
          E,
          ce
        ), Oe === null ? $ = pt : Oe.sibling = pt, Oe = pt);
      return e && le.forEach(function(ha) {
        return t(O, ha);
      }), be && bl(O, ce), $;
    }
    function F(O, E, w, U) {
      if (w == null) throw Error(c(151));
      for (var $ = null, Oe = null, le = E, ce = E = 0, pt = null, we = w.next(); le !== null && !we.done; ce++, we = w.next()) {
        le.index > ce ? (pt = le, le = null) : pt = le.sibling;
        var ha = _(O, le, we.value, U);
        if (ha === null) {
          le === null && (le = pt);
          break;
        }
        e && le && ha.alternate === null && t(O, le), E = i(ha, E, ce), Oe === null ? $ = ha : Oe.sibling = ha, Oe = ha, le = pt;
      }
      if (we.done)
        return n(O, le), be && bl(O, ce), $;
      if (le === null) {
        for (; !we.done; ce++, we = w.next())
          we = k(O, we.value, U), we !== null && (E = i(we, E, ce), Oe === null ? $ = we : Oe.sibling = we, Oe = we);
        return be && bl(O, ce), $;
      }
      for (le = l(le); !we.done; ce++, we = w.next())
        we = D(le, O, ce, we.value, U), we !== null && (e && (pt = we.alternate, pt !== null && le.delete(
          pt.key === null ? ce : pt.key
        )), E = i(we, E, ce), Oe === null ? $ = we : Oe.sibling = we, Oe = we);
      return e && le.forEach(function(QS) {
        return t(O, QS);
      }), be && bl(O, ce), $;
    }
    function ge(O, E, w, U) {
      if (typeof w == "object" && w !== null && w.type === ze && w.key === null && w.props.ref === void 0 && (w = w.props.children), typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case Fe:
            e: {
              for (var $ = w.key; E !== null; ) {
                if (E.key === $) {
                  if ($ = w.type, $ === ze) {
                    if (E.tag === 7) {
                      n(
                        O,
                        E.sibling
                      ), U = a(
                        E,
                        w.props.children
                      ), Jl(U, w), U.return = O, O = U;
                      break e;
                    }
                  } else if (E.elementType === $ || typeof $ == "object" && $ !== null && $.$$typeof === Ee && qa($) === E.type) {
                    n(
                      O,
                      E.sibling
                    ), U = a(E, w.props), Jl(U, w), U.return = O, O = U;
                    break e;
                  }
                  n(O, E);
                  break;
                } else t(O, E);
                E = E.sibling;
              }
              w.type === ze ? (U = Ua(
                w.props.children,
                O.mode,
                U,
                w.key
              ), Jl(U, w), U.return = O, O = U) : (U = Pr(
                w.type,
                w.key,
                w.props,
                null,
                O.mode,
                U
              ), Jl(U, w), U.return = O, O = U);
            }
            return s(O);
          case _e:
            e: {
              for ($ = w.key; E !== null; ) {
                if (E.key === $)
                  if (E.tag === 4 && E.stateNode.containerInfo === w.containerInfo && E.stateNode.implementation === w.implementation) {
                    n(
                      O,
                      E.sibling
                    ), U = a(E, w.children || []), U.return = O, O = U;
                    break e;
                  } else {
                    n(O, E);
                    break;
                  }
                else t(O, E);
                E = E.sibling;
              }
              U = Fc(w, O.mode, U), U.return = O, O = U;
            }
            return s(O);
          case Ee:
            return w = qa(w), ge(
              O,
              E,
              w,
              U
            );
        }
        if (De(w))
          return X(
            O,
            E,
            w,
            U
          );
        if (ne(w)) {
          if ($ = ne(w), typeof $ != "function") throw Error(c(150));
          return w = $.call(w), F(
            O,
            E,
            w,
            U
          );
        }
        if (typeof w.then == "function")
          return ge(
            O,
            E,
            oo(w),
            U
          );
        if (w.$$typeof === Ke)
          return ge(
            O,
            E,
            ao(O, w),
            U
          );
        co(O, w);
      }
      return typeof w == "string" && w !== "" || typeof w == "number" || typeof w == "bigint" ? (w = "" + w, E !== null && E.tag === 6 ? (n(O, E.sibling), U = a(E, w), U.return = O, O = U) : (n(O, E), U = Ic(w, O.mode, U), U.return = O, O = U), s(O)) : n(O, E);
    }
    return function(O, E, w, U) {
      try {
        Hu = 0;
        var $ = ge(
          O,
          E,
          w,
          U
        );
        return Oi = null, $;
      } catch (le) {
        if (le === Ai || le === uo) throw le;
        var Oe = Jt(29, le, null, O.mode);
        return Oe.lanes = U, Oe.return = O, Oe;
      } finally {
      }
    };
  }
  var Xa = Zh(!0), Kh = Zh(!1), $l = !1;
  function rs(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function os(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Il(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Fl(e, t, n) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (Ue & 2) !== 0) {
      var a = l.pending;
      return a === null ? t.next = t : (t.next = a.next, a.next = t), l.pending = t, t = Fr(e), wh(e, null, n), t;
    }
    return Ir(e, l, t, n), Fr(e);
  }
  function Bu(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, n |= l, t.lanes = n, ci(e, n);
    }
  }
  function cs(e, t) {
    var n = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, n === l)) {
      var a = null, i = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var s = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          i === null ? a = i = s : i = i.next = s, n = n.next;
        } while (n !== null);
        i === null ? a = i = t : i = i.next = t;
      } else a = i = t;
      n = {
        baseState: l.baseState,
        firstBaseUpdate: a,
        lastBaseUpdate: i,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  var ss = !1;
  function Gu() {
    if (ss) {
      var e = _i;
      if (e !== null) throw e;
    }
  }
  function Yu(e, t, n, l) {
    ss = !1;
    var a = e.updateQueue;
    $l = !1;
    var i = a.firstBaseUpdate, s = a.lastBaseUpdate, h = a.shared.pending;
    if (h !== null) {
      a.shared.pending = null;
      var b = h, R = b.next;
      b.next = null, s === null ? i = R : s.next = R, s = b;
      var M = e.alternate;
      M !== null && (M = M.updateQueue, h = M.lastBaseUpdate, h !== s && (h === null ? M.firstBaseUpdate = R : h.next = R, M.lastBaseUpdate = b));
    }
    if (i !== null) {
      var k = a.baseState;
      s = 0, M = R = b = null, h = i;
      do {
        var _ = h.lane & -536870913, D = _ !== h.lane;
        if (D ? (Ae & _) === _ : (l & _) === _) {
          _ !== 0 && _ === Ga && (ss = !0), M !== null && (M = M.next = {
            lane: 0,
            tag: h.tag,
            payload: h.payload,
            callback: null,
            next: null
          });
          e: {
            var X = e, F = h;
            _ = t;
            var ge = n;
            switch (F.tag) {
              case 1:
                if (X = F.payload, typeof X == "function") {
                  k = X.call(ge, k, _);
                  break e;
                }
                k = X;
                break e;
              case 3:
                X.flags = X.flags & -65537 | 128;
              case 0:
                if (X = F.payload, _ = typeof X == "function" ? X.call(ge, k, _) : X, _ == null) break e;
                k = ee({}, k, _);
                break e;
              case 2:
                $l = !0;
            }
          }
          _ = h.callback, _ !== null && (e.flags |= 64, D && (e.flags |= 8192), D = a.callbacks, D === null ? a.callbacks = [_] : D.push(_));
        } else
          D = {
            lane: _,
            tag: h.tag,
            payload: h.payload,
            callback: h.callback,
            next: null
          }, M === null ? (R = M = D, b = k) : M = M.next = D, s |= _;
        if (h = h.next, h === null) {
          if (h = a.shared.pending, h === null)
            break;
          D = h, h = D.next, D.next = null, a.lastBaseUpdate = D, a.shared.pending = null;
        }
      } while (!0);
      M === null && (b = k), a.baseState = b, a.firstBaseUpdate = R, a.lastBaseUpdate = M, i === null && (a.shared.lanes = 0), aa |= s, e.lanes = s, e.memoizedState = k;
    }
  }
  function Jh(e, t) {
    if (typeof e != "function")
      throw Error(c(191, e));
    e.call(t);
  }
  function $h(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++)
        Jh(n[e], t);
  }
  var Pl = Zt(null), so = Zt(0);
  function Ih(e, t) {
    e = Ol, Le(so, e), Le(Pl, t), Ol = e | t.baseLanes;
  }
  function fs() {
    Le(so, Ol), Le(Pl, Pl.current);
  }
  function ds() {
    Ol = so.current, me(Pl), me(so);
  }
  var zt = Zt(null), Ht = null;
  function Wl(e) {
    var t = e.alternate;
    Le(Dt, Dt.current & 1), Le(zt, e), Ht === null && (t === null || Pl.current !== null || t.memoizedState !== null) && (Ht = e);
  }
  function hs(e) {
    Le(Dt, Dt.current), Le(zt, e), Ht === null && (Ht = e);
  }
  function Fh(e) {
    e.tag === 22 ? (Le(Dt, Dt.current), Le(zt, e), Ht === null && (Ht = e)) : ea();
  }
  function ea() {
    Le(Dt, Dt.current), Le(zt, zt.current);
  }
  function un(e) {
    me(zt), Ht === e && (Ht = null), me(Dt);
  }
  var Dt = Zt(0);
  function qu(e, t) {
    Le(zt, zt.current), Le(Dt, t);
  }
  function ms(e) {
    me(Dt), me(zt), Ht === e && (Ht = null);
  }
  function fo(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || Lf(n) || Hf(n)))
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== "independent") {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var Tl = 0, pe = null, Xe = null, ht = null, ho = !1, Ri = !1, Qa = !1, mo = 0, Vu = 0, Ci = null, d0 = 0;
  function ut() {
    throw Error(c(321));
  }
  function ps(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!an(e[n], t[n])) return !1;
    return !0;
  }
  function gs(e, t, n, l, a, i) {
    return Tl = i, pe = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, P.H = e === null || e.memoizedState === null ? jm : Um, Qa = !1, i = n(l, a), Qa = !1, Ri && (i = Wh(
      t,
      n,
      l,
      a
    )), Ph(e), i;
  }
  function Ph(e) {
    P.H = Eo;
    var t = Xe !== null && Xe.next !== null;
    if (Tl = 0, ht = Xe = pe = null, ho = !1, Vu = 0, Ci = null, t) throw Error(c(300));
    e === null || mt || (e = e.dependencies, e !== null && lo(e) && (mt = !0));
  }
  function Wh(e, t, n, l) {
    pe = e;
    var a = 0;
    do {
      if (Ri && (Ci = null), Vu = 0, Ri = !1, 25 <= a) throw Error(c(301));
      if (a += 1, ht = Xe = null, e.updateQueue != null) {
        var i = e.updateQueue;
        i.lastEffect = null, i.events = null, i.stores = null, i.memoCache != null && (i.memoCache.index = 0);
      }
      P.H = S0, i = t(n, l);
    } while (Ri);
    return i;
  }
  function h0() {
    var e = P.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Xu(t) : t, e = e.useState()[0], (Xe !== null ? Xe.memoizedState : null) !== e && (pe.flags |= 1024), t;
  }
  function vs() {
    var e = mo !== 0;
    return mo = 0, e;
  }
  function ys(e, t, n) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
  }
  function bs(e) {
    if (ho) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      ho = !1;
    }
    Tl = 0, ht = Xe = pe = null, Ri = !1, Vu = mo = 0, Ci = null;
  }
  function qt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return ht === null ? pe.memoizedState = ht = e : ht = ht.next = e, ht;
  }
  function ft() {
    if (Xe === null) {
      var e = pe.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Xe.next;
    var t = ht === null ? pe.memoizedState : ht.next;
    if (t !== null)
      ht = t, Xe = e;
    else {
      if (e === null)
        throw pe.alternate === null ? Error(c(467)) : Error(c(310));
      Xe = e, e = {
        memoizedState: Xe.memoizedState,
        baseState: Xe.baseState,
        baseQueue: Xe.baseQueue,
        queue: Xe.queue,
        next: null
      }, ht === null ? pe.memoizedState = ht = e : ht = ht.next = e;
    }
    return ht;
  }
  function po() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Xu(e) {
    var t = Vu;
    return Vu += 1, Ci === null && (Ci = []), e = Vh(Ci, e, t), t = pe, (ht === null ? t.memoizedState : ht.next) === null && (t = t.alternate, P.H = t === null || t.memoizedState === null ? jm : Um), e;
  }
  function go(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Xu(e);
      if (e.$$typeof === L) return;
      if (e.$$typeof === Ke) return wt(e);
    }
    throw Error(c(438, String(e)));
  }
  function Ss(e) {
    var t = null, n = pe.updateQueue;
    if (n !== null && (t = n.memoCache), t == null) {
      var l = pe.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(a) {
          return a.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = po(), pe.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
      for (n = t.data[t.index] = Array(e), l = 0; l < e; l++)
        n[l] = fl;
    return t.index++, n;
  }
  function xl(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function vo(e) {
    var t = ft();
    return Es(t, Xe, e);
  }
  function Es(e, t, n) {
    var l = e.queue;
    if (l === null) throw Error(c(311));
    l.lastRenderedReducer = n;
    var a = e.baseQueue, i = l.pending;
    if (i !== null) {
      if (a !== null) {
        var s = a.next;
        a.next = i.next, i.next = s;
      }
      t.baseQueue = a = i, l.pending = null;
    }
    if (i = e.baseState, a === null) e.memoizedState = i;
    else {
      t = a.next;
      var h = s = null, b = null, R = t, M = !1;
      do {
        var k = R.lane & -536870913;
        if (k !== R.lane ? (Ae & k) === k : (Tl & k) === k) {
          var _ = R.revertLane;
          if (_ === 0)
            b !== null && (b = b.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: R.action,
              hasEagerState: R.hasEagerState,
              eagerState: R.eagerState,
              next: null
            }), k === Ga && (M = !0);
          else if ((Tl & _) === _) {
            R = R.next, _ === Ga && (M = !0);
            continue;
          } else
            k = {
              lane: 0,
              revertLane: R.revertLane,
              gesture: null,
              action: R.action,
              hasEagerState: R.hasEagerState,
              eagerState: R.eagerState,
              next: null
            }, b === null ? (h = b = k, s = i) : b = b.next = k, pe.lanes |= _, aa |= _;
          k = R.action, Qa && n(i, k), i = R.hasEagerState ? R.eagerState : n(i, k);
        } else
          _ = {
            lane: k,
            revertLane: R.revertLane,
            gesture: R.gesture,
            action: R.action,
            hasEagerState: R.hasEagerState,
            eagerState: R.eagerState,
            next: null
          }, b === null ? (h = b = _, s = i) : b = b.next = _, pe.lanes |= k, aa |= k;
        R = R.next;
      } while (R !== null && R !== t);
      if (b === null ? s = i : b.next = h, !an(i, e.memoizedState) && (mt = !0, M && (n = _i, n !== null)))
        throw n;
      e.memoizedState = i, e.baseState = s, e.baseQueue = b, l.lastRenderedState = i;
    }
    return a === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Ts(e) {
    var t = ft(), n = t.queue;
    if (n === null) throw Error(c(311));
    n.lastRenderedReducer = e;
    var l = n.dispatch, a = n.pending, i = t.memoizedState;
    if (a !== null) {
      n.pending = null;
      var s = a = a.next;
      do
        i = e(i, s.action), s = s.next;
      while (s !== a);
      an(i, t.memoizedState) || (mt = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
    }
    return [i, l];
  }
  function em(e, t, n) {
    var l = pe, a = ft(), i = be;
    if (i) {
      if (n === void 0) throw Error(c(407));
      n = n();
    } else n = t();
    var s = !an(
      (Xe || a).memoizedState,
      n
    );
    if (s && (a.memoizedState = n, mt = !0), a = a.queue, As(lm.bind(null, l, a, e), [
      e
    ]), e = a.getSnapshot !== t || s || ht !== null && (ht.memoizedState.tag & 1) !== 0, Ni(
      e ? 9 : 8,
      { destroy: void 0 },
      nm.bind(null, l, a, n, t),
      null
    ), e) {
      if (l.flags |= 2048, Ze === null) throw Error(c(349));
      i || (Tl & 127) !== 0 || tm(l, t, n);
    }
    return n;
  }
  function tm(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = pe.updateQueue, t === null ? (t = po(), pe.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function nm(e, t, n, l) {
    t.value = n, t.getSnapshot = l, am(t) && im(e);
  }
  function lm(e, t, n) {
    return n(function() {
      am(t) && im(e);
    });
  }
  function am(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !an(e, n);
    } catch {
      return !0;
    }
  }
  function im(e) {
    var t = ja(e, 2);
    t !== null && Pt(t, e, 2);
  }
  function xs(e) {
    var t = qt();
    if (typeof e == "function") {
      var n = e;
      if (e = n(), Qa) {
        tn(!0);
        try {
          n();
        } finally {
          tn(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: xl,
      lastRenderedState: e
    }, t;
  }
  function um(e, t, n, l) {
    return e.baseState = n, Es(
      e,
      Xe,
      typeof l == "function" ? l : xl
    );
  }
  function m0(e, t, n, l, a) {
    if (So(e)) throw Error(c(485));
    if (e = t.action, e !== null) {
      var i = {
        payload: a,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(s) {
          i.listeners.push(s);
        }
      };
      P.T !== null ? n(!0) : i.isTransition = !1, l(i), n = t.pending, n === null ? (i.next = t.pending = i, rm(t, i)) : (i.next = n.next, t.pending = n.next = i);
    }
  }
  function rm(e, t) {
    var n = t.action, l = t.payload, a = e.state;
    if (t.isTransition) {
      var i = P.T, s = {};
      s.types = i !== null ? i.types : null, P.T = s;
      try {
        var h = n(a, l), b = P.S;
        b !== null && b(s, h), om(e, t, h);
      } catch (R) {
        _s(e, t, R);
      } finally {
        i !== null && s.types !== null && (i.types = s.types), P.T = i;
      }
    } else
      try {
        i = n(a, l), om(e, t, i);
      } catch (R) {
        _s(e, t, R);
      }
  }
  function om(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(l) {
        cm(e, t, l);
      },
      function(l) {
        return _s(e, t, l);
      }
    ) : cm(e, t, n);
  }
  function cm(e, t, n) {
    t.status = "fulfilled", t.value = n, sm(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, rm(e, n)));
  }
  function _s(e, t, n) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = n, sm(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function sm(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function fm(e, t) {
    return t;
  }
  function dm(e, t) {
    if (be) {
      var n = Ze.formState;
      if (n !== null) {
        e: {
          var l = pe;
          if (be) {
            if ($e) {
              t: {
                for (var a = $e, i = Tn; a.nodeType !== 8; ) {
                  if (!i) {
                    a = null;
                    break t;
                  }
                  if (a = _n(
                    a.nextSibling
                  ), a === null) {
                    a = null;
                    break t;
                  }
                }
                i = a.data, a = i === "F!" || i === "F" ? a : null;
              }
              if (a) {
                $e = _n(
                  a.nextSibling
                ), l = a.data === "F!";
                break e;
              }
            }
            Zl(l);
          }
          l = !1;
        }
        l && (t = n[0]);
      }
    }
    return n = qt(), n.memoizedState = n.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: fm,
      lastRenderedState: t
    }, n.queue = l, n = zm.bind(
      null,
      pe,
      l
    ), l.dispatch = n, l = xs(!1), i = ws.bind(
      null,
      pe,
      !1,
      l.queue
    ), l = qt(), a = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = a, n = m0.bind(
      null,
      pe,
      a,
      i,
      n
    ), a.dispatch = n, l.memoizedState = e, [t, n, !1];
  }
  function hm(e) {
    var t = ft();
    return mm(t, Xe, e);
  }
  function mm(e, t, n) {
    if (t = Es(
      e,
      t,
      fm
    )[0], e = vo(xl)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = Xu(t);
      } catch (s) {
        throw s === Ai ? uo : s;
      }
    else l = t;
    t = ft();
    var a = t.queue, i = a.dispatch;
    return n !== t.memoizedState && (pe.flags |= 2048, Ni(
      9,
      { destroy: void 0 },
      p0.bind(null, a, n),
      null
    )), [l, i, e];
  }
  function p0(e, t) {
    e.action = t;
  }
  function pm(e) {
    var t = ft(), n = Xe;
    if (n !== null)
      return mm(t, n, e);
    ft(), t = t.memoizedState, n = ft();
    var l = n.queue.dispatch;
    return n.memoizedState = e, [t, l, !1];
  }
  function Ni(e, t, n, l) {
    return e = { tag: e, create: n, deps: l, inst: t, next: null }, t = pe.updateQueue, t === null && (t = po(), pe.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (l = n.next, n.next = e, e.next = l, t.lastEffect = e), e;
  }
  function gm() {
    return ft().memoizedState;
  }
  function yo(e, t, n, l) {
    var a = qt();
    pe.flags |= e, a.memoizedState = Ni(
      1 | t,
      { destroy: void 0 },
      n,
      l === void 0 ? null : l
    );
  }
  function bo(e, t, n, l) {
    var a = ft();
    l = l === void 0 ? null : l;
    var i = a.memoizedState.inst;
    Xe !== null && l !== null && ps(l, Xe.memoizedState.deps) ? a.memoizedState = Ni(t, i, n, l) : (pe.flags |= e, a.memoizedState = Ni(
      1 | t,
      i,
      n,
      l
    ));
  }
  function vm(e, t) {
    yo(8390656, 8, e, t);
  }
  function As(e, t) {
    bo(2048, 8, e, t);
  }
  function g0(e) {
    pe.flags |= 4;
    var t = pe.updateQueue;
    if (t === null)
      t = po(), pe.updateQueue = t, t.events = [e];
    else {
      var n = t.events;
      n === null ? t.events = [e] : n.push(e);
    }
  }
  function ym(e) {
    var t = ft().memoizedState;
    return g0({ ref: t, nextImpl: e }), function() {
      if ((Ue & 2) !== 0) throw Error(c(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function bm(e, t) {
    return bo(4, 2, e, t);
  }
  function Sm(e, t) {
    return bo(4, 4, e, t);
  }
  function Em(e, t) {
    if (typeof t == "function") {
      e = e();
      var n = t(e);
      return function() {
        typeof n == "function" ? n() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function Tm(e, t, n) {
    n = n != null ? n.concat([e]) : null, bo(4, 4, Em.bind(null, t, e), n);
  }
  function Os() {
  }
  function xm(e, t) {
    var n = ft();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    return t !== null && ps(t, l[1]) ? l[0] : (n.memoizedState = [e, t], e);
  }
  function _m(e, t) {
    var n = ft();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    if (t !== null && ps(t, l[1]))
      return l[0];
    if (l = e(), Qa) {
      tn(!0);
      try {
        e();
      } finally {
        tn(!1);
      }
    }
    return n.memoizedState = [l, t], l;
  }
  function Rs(e, t, n) {
    return n === void 0 || (Tl & 1073741824) !== 0 && (Ae & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = jp(), pe.lanes |= e, aa |= e, n);
  }
  function Am(e, t, n, l) {
    return an(n, t) ? n : Pl.current !== null ? (e = Rs(e, n, l), an(e, t) || (mt = !0), e) : (Tl & 106) === 0 || (Tl & 1073741824) !== 0 && (Ae & 261930) === 0 ? (mt = !0, e.memoizedState = n) : (e = jp(), pe.lanes |= e, aa |= e, t);
  }
  function Om(e, t, n, l, a) {
    var i = fe.p;
    fe.p = i !== 0 && 8 > i ? i : 8;
    var s = P.T, h = {};
    h.types = s !== null ? s.types : null, P.T = h, ws(e, !1, t, n);
    try {
      var b = a(), R = P.S;
      if (R !== null && R(h, b), b !== null && typeof b == "object" && typeof b.then == "function") {
        var M = f0(
          b,
          l
        );
        Qu(
          e,
          t,
          M,
          sn(e)
        );
      } else
        Qu(
          e,
          t,
          l,
          sn(e)
        );
    } catch (k) {
      Qu(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: k },
        sn()
      );
    } finally {
      fe.p = i, s !== null && h.types !== null && (s.types = h.types), P.T = s;
    }
  }
  function v0() {
  }
  function Cs(e, t, n, l) {
    if (e.tag !== 5) throw Error(c(476));
    var a = Rm(e).queue;
    Om(
      e,
      a,
      t,
      wn,
      n === null ? v0 : function() {
        return Cm(e), n(l);
      }
    );
  }
  function Rm(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: wn,
      baseState: wn,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: xl,
        lastRenderedState: wn
      },
      next: null
    };
    var n = {};
    return t.next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: xl,
        lastRenderedState: n
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Cm(e) {
    var t = Rm(e);
    t.next === null && (t = e.alternate.memoizedState), Qu(
      e,
      t.next.queue,
      {},
      sn()
    );
  }
  function Ns() {
    return wt(Ji);
  }
  function Nm() {
    return ft().memoizedState;
  }
  function wm() {
    return ft().memoizedState;
  }
  function y0(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = sn();
          e = Il(n);
          var l = Fl(t, e, n);
          l !== null && (Pt(l, t, n), Bu(l, t, n)), t = { cache: ls() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function b0(e, t, n) {
    var l = sn();
    n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, So(e) ? Dm(t, n) : (n = Jc(e, t, n, l), n !== null && (Pt(n, e, l), Mm(n, t, l)));
  }
  function zm(e, t, n) {
    var l = sn();
    Qu(e, t, n, l);
  }
  function Qu(e, t, n, l) {
    var a = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (So(e)) Dm(t, a);
    else {
      var i = e.alternate;
      if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null))
        try {
          var s = t.lastRenderedState, h = i(s, n);
          if (a.hasEagerState = !0, a.eagerState = h, an(h, s))
            return Ir(e, t, a, 0), Ze === null && $r(), !1;
        } catch {
        } finally {
        }
      if (n = Jc(e, t, a, l), n !== null)
        return Pt(n, e, l), Mm(n, t, l), !0;
    }
    return !1;
  }
  function ws(e, t, n, l) {
    if (l = {
      lane: 2,
      revertLane: Ef(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, So(e)) {
      if (t) throw Error(c(479));
    } else
      t = Jc(
        e,
        n,
        l,
        2
      ), t !== null && Pt(t, e, 2);
  }
  function So(e) {
    var t = e.alternate;
    return e === pe || t !== null && t === pe;
  }
  function Dm(e, t) {
    Ri = ho = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Mm(e, t, n) {
    if ((n & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, n |= l, t.lanes = n, ci(e, n);
    }
  }
  var Eo = {
    readContext: wt,
    use: go,
    useCallback: ut,
    useContext: ut,
    useEffect: ut,
    useImperativeHandle: ut,
    useLayoutEffect: ut,
    useInsertionEffect: ut,
    useMemo: ut,
    useReducer: ut,
    useRef: ut,
    useState: ut,
    useDebugValue: ut,
    useDeferredValue: ut,
    useTransition: ut,
    useSyncExternalStore: ut,
    useId: ut,
    useHostTransitionStatus: ut,
    useFormState: ut,
    useActionState: ut,
    useOptimistic: ut,
    useMemoCache: ut,
    useCacheRefresh: ut,
    useEffectEvent: ut
  }, jm = {
    readContext: wt,
    use: go,
    useCallback: function(e, t) {
      return qt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: wt,
    useEffect: vm,
    useImperativeHandle: function(e, t, n) {
      n = n != null ? n.concat([e]) : null, yo(
        4194308,
        4,
        Em.bind(null, t, e),
        n
      );
    },
    useLayoutEffect: function(e, t) {
      return yo(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      yo(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var n = qt();
      t = t === void 0 ? null : t;
      var l = e();
      if (Qa) {
        tn(!0);
        try {
          e();
        } finally {
          tn(!1);
        }
      }
      return n.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, n) {
      var l = qt();
      if (n !== void 0) {
        var a = n(t);
        if (Qa) {
          tn(!0);
          try {
            n(t);
          } finally {
            tn(!1);
          }
        }
      } else a = t;
      return l.memoizedState = l.baseState = a, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: a
      }, l.queue = e, e = e.dispatch = b0.bind(
        null,
        pe,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = qt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = xs(e);
      var t = e.queue, n = zm.bind(null, pe, t);
      return t.dispatch = n, [e.memoizedState, n];
    },
    useDebugValue: Os,
    useDeferredValue: function(e, t) {
      var n = qt();
      return Rs(n, e, t);
    },
    useTransition: function() {
      var e = xs(!1);
      return e = Om.bind(
        null,
        pe,
        e.queue,
        !0,
        !1
      ), qt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, n) {
      var l = pe, a = qt();
      if (be) {
        if (n === void 0)
          throw Error(c(407));
        n = n();
      } else {
        if (n = t(), Ze === null)
          throw Error(c(349));
        (Ae & 127) !== 0 || tm(l, t, n);
      }
      a.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return a.queue = i, vm(lm.bind(null, l, i, e), [
        e
      ]), l.flags |= 2048, Ni(
        9,
        { destroy: void 0 },
        nm.bind(
          null,
          l,
          i,
          n,
          t
        ),
        null
      ), n;
    },
    useId: function() {
      var e = qt(), t = Ze.identifierPrefix;
      if (be) {
        var n = el, l = Wn;
        n = (l & ~(1 << 32 - tt(l) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = mo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
      } else
        n = d0++, t = "_" + t + "r_" + n.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Ns,
    useFormState: dm,
    useActionState: dm,
    useOptimistic: function(e) {
      var t = qt();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = n, t = ws.bind(
        null,
        pe,
        !0,
        n
      ), n.dispatch = t, [e, t];
    },
    useMemoCache: Ss,
    useCacheRefresh: function() {
      return qt().memoizedState = y0.bind(
        null,
        pe
      );
    },
    useEffectEvent: function(e) {
      var t = qt(), n = { impl: e };
      return t.memoizedState = n, function() {
        if ((Ue & 2) !== 0)
          throw Error(c(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, Um = {
    readContext: wt,
    use: go,
    useCallback: xm,
    useContext: wt,
    useEffect: As,
    useImperativeHandle: Tm,
    useInsertionEffect: bm,
    useLayoutEffect: Sm,
    useMemo: _m,
    useReducer: vo,
    useRef: gm,
    useState: function() {
      return vo(xl);
    },
    useDebugValue: Os,
    useDeferredValue: function(e, t) {
      var n = ft();
      return Am(
        n,
        Xe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = vo(xl)[0], t = ft().memoizedState;
      return [
        typeof e == "boolean" ? e : Xu(e),
        t
      ];
    },
    useSyncExternalStore: em,
    useId: Nm,
    useHostTransitionStatus: Ns,
    useFormState: hm,
    useActionState: hm,
    useOptimistic: function(e, t) {
      var n = ft();
      return um(n, Xe, e, t);
    },
    useMemoCache: Ss,
    useCacheRefresh: wm,
    useEffectEvent: ym
  }, S0 = {
    readContext: wt,
    use: go,
    useCallback: xm,
    useContext: wt,
    useEffect: As,
    useImperativeHandle: Tm,
    useInsertionEffect: bm,
    useLayoutEffect: Sm,
    useMemo: _m,
    useReducer: Ts,
    useRef: gm,
    useState: function() {
      return Ts(xl);
    },
    useDebugValue: Os,
    useDeferredValue: function(e, t) {
      var n = ft();
      return Xe === null ? Rs(n, e, t) : Am(
        n,
        Xe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Ts(xl)[0], t = ft().memoizedState;
      return [
        typeof e == "boolean" ? e : Xu(e),
        t
      ];
    },
    useSyncExternalStore: em,
    useId: Nm,
    useHostTransitionStatus: Ns,
    useFormState: pm,
    useActionState: pm,
    useOptimistic: function(e, t) {
      var n = ft();
      return Xe !== null ? um(n, Xe, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    },
    useMemoCache: Ss,
    useCacheRefresh: wm,
    useEffectEvent: ym
  };
  function zs(e, t, n, l) {
    t = e.memoizedState, n = n(l, t), n = n == null ? t : ee({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var Ds = {
    enqueueSetState: function(e, t, n) {
      e = e._reactInternals;
      var l = sn(), a = Il(l);
      a.payload = t, n != null && (a.callback = n), t = Fl(e, a, l), t !== null && (Pt(t, e, l), Bu(t, e, l));
    },
    enqueueReplaceState: function(e, t, n) {
      e = e._reactInternals;
      var l = sn(), a = Il(l);
      a.tag = 1, a.payload = t, n != null && (a.callback = n), t = Fl(e, a, l), t !== null && (Pt(t, e, l), Bu(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var n = sn(), l = Il(n);
      l.tag = 2, t != null && (l.callback = t), t = Fl(e, l, n), t !== null && (Pt(t, e, n), Bu(t, e, n));
    }
  };
  function km(e, t, n, l, a, i, s) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, i, s) : t.prototype && t.prototype.isPureReactComponent ? !zu(n, l) || !zu(a, i) : !0;
  }
  function Lm(e, t, n, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, l), t.state !== e && Ds.enqueueReplaceState(t, t.state, null);
  }
  function Za(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var l in t)
        l !== "ref" && (n[l] = t[l]);
    }
    if (e = e.defaultProps) {
      n === t && (n = ee({}, n));
      for (var a in e)
        n[a] === void 0 && (n[a] = e[a]);
    }
    return n;
  }
  function Hm(e) {
    Jr(e);
  }
  function Bm(e) {
    console.error(e);
  }
  function Gm(e) {
    Jr(e);
  }
  function To(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function Ym(e, t, n) {
    try {
      var l = e.onCaughtError;
      l(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Ms(e, t, n) {
    return n = Il(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      To(e, t);
    }, n;
  }
  function qm(e) {
    return e = Il(e), e.tag = 3, e;
  }
  function Vm(e, t, n, l) {
    var a = n.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var i = l.value;
      e.payload = function() {
        return a(i);
      }, e.callback = function() {
        Ym(t, n, l);
      };
    }
    var s = n.stateNode;
    s !== null && typeof s.componentDidCatch == "function" && (e.callback = function() {
      Ym(t, n, l), typeof a != "function" && (ia === null ? ia = /* @__PURE__ */ new Set([this]) : ia.add(this));
      var h = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: h !== null ? h : ""
      });
    });
  }
  function E0(e, t, n, l, a) {
    if (n.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = n.alternate, t !== null && Ha(
        t,
        n,
        a,
        !0
      ), n = zt.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
          case 19:
            return Ht === null ? Vo() : n.alternate === null && rt === 0 && (rt = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, l === ro ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), yf(e, l, a)), !1;
          case 22:
            return n.flags |= 65536, l === ro ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : n.add(l)), yf(e, l, a)), !1;
        }
        throw Error(c(435, n.tag));
      }
      return yf(e, l, a), Vo(), !1;
    }
    if (be)
      return t = zt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = a, l !== Wc && (e = Error(c(422), { cause: l }), ju(bn(e, n)))) : (l !== Wc && (t = Error(c(423), {
        cause: l
      }), ju(
        bn(t, n)
      )), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, l = bn(l, n), a = Ms(
        e.stateNode,
        l,
        a
      ), cs(e, a), rt !== 4 && (rt = 2)), !1;
    var i = Error(c(520), { cause: l });
    if (i = bn(i, n), Wu === null ? Wu = [i] : Wu.push(i), rt !== 4 && (rt = 2), t === null) return !0;
    l = bn(l, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Ms(n.stateNode, l, e), cs(n, e), !1;
        case 1:
          if (t = n.type, i = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || i !== null && typeof i.componentDidCatch == "function" && (ia === null || !ia.has(i))))
            return n.flags |= 65536, a &= -a, n.lanes |= a, a = qm(a), Vm(
              a,
              e,
              n,
              l
            ), cs(n, a), !1;
          break;
        case 22:
          if (n.memoizedState !== null)
            return n.flags |= 65536, !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var js = Error(c(461)), mt = !1;
  function vt(e, t, n, l) {
    t.child = e === null ? Kh(t, null, n, l) : Xa(
      t,
      e.child,
      n,
      l
    );
  }
  function Xm(e, t, n, l, a) {
    n = n.render;
    var i = t.ref;
    if ("ref" in l) {
      var s = {};
      for (var h in l)
        h !== "ref" && (s[h] = l[h]);
    } else s = l;
    return Ba(t), l = gs(
      e,
      t,
      n,
      s,
      i,
      a
    ), h = vs(), e !== null && !mt ? (ys(e, t, a), _l(e, t, a)) : (be && h && eo(t), t.flags |= 1, vt(e, t, l, a), t.child);
  }
  function Qm(e, t, n, l, a) {
    if (e === null) {
      var i = n.type;
      return typeof i == "function" && !$c(i) && i.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = i, Zm(
        e,
        t,
        i,
        l,
        a
      )) : (e = Pr(
        n.type,
        null,
        l,
        t,
        t.mode,
        a
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (i = e.child, !qs(e, a)) {
      var s = i.memoizedProps;
      if (n = n.compare, n = n !== null ? n : zu, n(s, l) && e.ref === t.ref)
        return _l(e, t, a);
    }
    return t.flags |= 1, e = yl(i, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Zm(e, t, n, l, a) {
    if (e !== null) {
      var i = e.memoizedProps;
      if (zu(i, l) && e.ref === t.ref)
        if (mt = !1, t.pendingProps = l = i, qs(e, a))
          (e.flags & 131072) !== 0 && (mt = !0);
        else
          return t.lanes = e.lanes, _l(e, t, a);
    }
    return Us(
      e,
      t,
      n,
      l,
      a
    );
  }
  function Km(e, t, n, l) {
    var a = l.children, i = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (i = i !== null ? i.baseLanes | n : n, e !== null) {
          for (l = t.child = e.child, a = 0; l !== null; )
            a = a | l.lanes | l.childLanes, l = l.sibling;
          l = a & ~i;
        } else l = 0, t.child = null;
        return Jm(
          e,
          t,
          i,
          n,
          l
        );
      }
      if ((n & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && io(
          t,
          i !== null ? i.cachePool : null
        ), i !== null ? Ih(t, i) : fs(), Fh(t);
      else
        return l = t.lanes = 536870912, Jm(
          e,
          t,
          i !== null ? i.baseLanes | n : n,
          n,
          l
        );
    } else
      i !== null ? (io(t, i.cachePool), Ih(t, i), ea(), t.memoizedState = null) : (e !== null && io(t, null), fs(), ea());
    return vt(e, t, a, n), t.child;
  }
  function Zu(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Jm(e, t, n, l, a) {
    var i = is();
    return i = i === null ? null : { parent: dt._currentValue, pool: i }, t.memoizedState = {
      baseLanes: n,
      cachePool: i
    }, e !== null && io(t, null), fs(), Fh(t), e !== null && Ha(e, t, l, !0), t.childLanes = a, null;
  }
  function xo(e, t) {
    return t = _o(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function $m(e, t, n) {
    return Xa(t, e.child, null, n), e = xo(t, t.pendingProps), e.flags |= 2, un(t), t.memoizedState = null, e;
  }
  function T0(e, t, n) {
    var l = t.pendingProps, a = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (be) {
        if (l.mode === "hidden")
          return e = xo(t, l), t.lanes = 536870912, e.memoizedState = { baseLanes: 0, cachePool: null }, Zu(null, e);
        if (hs(t), (e = $e) ? (e = Eg(
          e,
          Tn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Xl !== null ? { id: Wn, overflow: el } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = Dh(e), n.return = t, t.child = n, Et = t, $e = null)) : e = null, e === null) throw Zl(t);
        return t.lanes = 536870912, null;
      }
      return xo(t, l);
    }
    var i = e.memoizedState;
    if (i !== null) {
      var s = i.dehydrated;
      if (hs(t), a)
        if (t.flags & 256)
          t.flags &= -257, t = $m(
            e,
            t,
            n
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(c(558));
      else if (mt || Ha(e, t, n, !1), a = (n & e.childLanes) !== 0, mt || a) {
        if (Pl.current === null) {
          if (l = Ze, l !== null && (s = bu(l, n), s !== 0 && s !== i.retryLane))
            throw i.retryLane = s, ja(e, s), Pt(l, e, s), js;
          Vo();
        }
        t = $m(
          e,
          t,
          n
        );
      } else
        e = i.treeContext, $e = _n(s.nextSibling), Et = t, be = !0, Ql = null, Tn = !1, e !== null && Uh(t, e), t = xo(t, l), t.flags |= 134221824;
      return t;
    }
    return e = yl(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function wi(e, t) {
    var n = t.ref;
    if (n === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(c(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function Us(e, t, n, l, a) {
    return Ba(t), n = gs(
      e,
      t,
      n,
      l,
      void 0,
      a
    ), l = vs(), e !== null && !mt ? (ys(e, t, a), _l(e, t, a)) : (be && l && eo(t), t.flags |= 1, vt(e, t, n, a), t.child);
  }
  function Im(e, t, n, l, a, i) {
    return Ba(t), t.updateQueue = null, n = Wh(
      t,
      l,
      n,
      a
    ), Ph(e), l = vs(), e !== null && !mt ? (ys(e, t, i), _l(e, t, i)) : (be && l && eo(t), t.flags |= 1, vt(e, t, n, i), t.child);
  }
  function Fm(e, t, n, l, a) {
    if (Ba(t), t.stateNode === null) {
      var i = Si, s = n.contextType;
      typeof s == "object" && s !== null && (i = wt(s)), i = new n(l, i), t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = Ds, t.stateNode = i, i._reactInternals = t, i = t.stateNode, i.props = l, i.state = t.memoizedState, i.refs = {}, rs(t), s = n.contextType, i.context = typeof s == "object" && s !== null ? wt(s) : Si, i.state = t.memoizedState, s = n.getDerivedStateFromProps, typeof s == "function" && (zs(
        t,
        n,
        s,
        l
      ), i.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (s = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), s !== i.state && Ds.enqueueReplaceState(i, i.state, null), Yu(t, l, i, a), Gu(), i.state = t.memoizedState), typeof i.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      i = t.stateNode;
      var h = t.memoizedProps, b = Za(n, h);
      i.props = b;
      var R = i.context, M = n.contextType;
      s = Si, typeof M == "object" && M !== null && (s = wt(M));
      var k = n.getDerivedStateFromProps;
      M = typeof k == "function" || typeof i.getSnapshotBeforeUpdate == "function", h = t.pendingProps !== h, M || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (h || R !== s) && Lm(
        t,
        i,
        l,
        s
      ), $l = !1;
      var _ = t.memoizedState;
      i.state = _, Yu(t, l, i, a), Gu(), R = t.memoizedState, h || _ !== R || $l ? (typeof k == "function" && (zs(
        t,
        n,
        k,
        l
      ), R = t.memoizedState), (b = $l || km(
        t,
        n,
        b,
        l,
        _,
        R,
        s
      )) ? (M || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = R), i.props = l, i.state = R, i.context = s, l = b) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      i = t.stateNode, os(e, t), s = t.memoizedProps, M = Za(n, s), i.props = M, k = t.pendingProps, _ = i.context, R = n.contextType, b = Si, typeof R == "object" && R !== null && (b = wt(R)), h = n.getDerivedStateFromProps, (R = typeof h == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (s !== k || _ !== b) && Lm(
        t,
        i,
        l,
        b
      ), $l = !1, _ = t.memoizedState, i.state = _, Yu(t, l, i, a), Gu();
      var D = t.memoizedState;
      s !== k || _ !== D || $l || e !== null && e.dependencies !== null && lo(e.dependencies) ? (typeof h == "function" && (zs(
        t,
        n,
        h,
        l
      ), D = t.memoizedState), (M = $l || km(
        t,
        n,
        M,
        l,
        _,
        D,
        b
      ) || e !== null && e.dependencies !== null && lo(e.dependencies)) ? (R || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(l, D, b), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(
        l,
        D,
        b
      )), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || s === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = D), i.props = l, i.state = D, i.context = b, l = M) : (typeof i.componentDidUpdate != "function" || s === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return i = l, wi(e, t), l = (t.flags & 128) !== 0, i || l ? (i = t.stateNode, n = l && typeof n.getDerivedStateFromError != "function" ? null : i.render(), t.flags |= 1, e !== null && l ? (t.child = Xa(
      t,
      e.child,
      null,
      a
    ), t.child = Xa(
      t,
      null,
      n,
      a
    )) : vt(e, t, n, a), t.memoizedState = i.state, e = t.child) : e = _l(
      e,
      t,
      a
    ), e;
  }
  function Pm(e, t, n, l) {
    return ka(), t.flags |= 256, vt(e, t, n, l), t.child;
  }
  var ks = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Ls(e) {
    return { baseLanes: e, cachePool: Yh() };
  }
  function Hs(e, t, n) {
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= cn), e;
  }
  function Wm(e, t, n) {
    var l = t.pendingProps, a = !1, i = (t.flags & 128) !== 0, s;
    if ((s = i) || (s = e !== null && e.memoizedState === null ? !1 : (Dt.current & 2) !== 0), s && (a = !0, t.flags &= -129), s = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (be) {
        if (a ? Wl(t) : ea(), (e = $e) ? (e = Eg(
          e,
          Tn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Xl !== null ? { id: Wn, overflow: el } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = Dh(e), n.return = t, t.child = n, Et = t, $e = null)) : e = null, e === null) throw Zl(t);
        return Hf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      return i = l.children, l = l.fallback, a ? (ea(), a = t.mode, i = _o(
        { mode: "hidden", children: i },
        a
      ), l = Ua(
        l,
        a,
        n,
        null
      ), i.return = t, l.return = t, i.sibling = l, t.child = i, l = t.child, l.memoizedState = Ls(n), l.childLanes = Hs(
        e,
        s,
        n
      ), t.memoizedState = ks, Zu(null, l)) : (Wl(t), Bs(t, i));
    }
    var h = e.memoizedState;
    if (h !== null) {
      var b = h.dehydrated;
      if (b !== null)
        return x0(
          e,
          t,
          i,
          s,
          l,
          b,
          h,
          n
        );
    }
    return a ? (ea(), a = l.fallback, i = t.mode, h = e.child, b = h.sibling, l = yl(h, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = h.subtreeFlags & 1206910976, b !== null ? a = yl(b, a) : (a = Ua(
      a,
      i,
      n,
      null
    ), a.flags |= 2), a.return = t, l.return = t, l.sibling = a, t.child = l, Zu(null, l), l = t.child, a = e.child.memoizedState, a === null ? a = Ls(n) : (i = a.cachePool, i !== null ? (h = dt._currentValue, i = i.parent !== h ? { parent: h, pool: h } : i) : i = Yh(), a = {
      baseLanes: a.baseLanes | n,
      cachePool: i
    }), l.memoizedState = a, l.childLanes = Hs(
      e,
      s,
      n
    ), t.memoizedState = ks, Zu(e.child, l)) : (Wl(t), n = e.child, e = n.sibling, n = yl(n, {
      mode: "visible",
      children: l.children
    }), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
  }
  function Bs(e, t) {
    return t = _o(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function _o(e, t) {
    return e = Jt(22, e, null, t), e.lanes = 0, e;
  }
  function Ao(e, t, n) {
    return Xa(t, e.child, null, n), e = Bs(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function x0(e, t, n, l, a, i, s, h) {
    if (n)
      return t.flags & 256 ? (Wl(t), t.flags &= -257, Ao(
        e,
        t,
        h
      )) : t.memoizedState !== null ? (ea(), t.child = e.child, t.flags |= 128, null) : (ea(), i = a.fallback, s = t.mode, a = _o(
        { mode: "visible", children: a.children },
        s
      ), i = Ua(
        i,
        s,
        h,
        null
      ), i.flags |= 2, a.return = t, i.return = t, a.sibling = i, t.child = a, Xa(t, e.child, null, h), a = t.child, a.memoizedState = Ls(h), a.childLanes = Hs(
        e,
        l,
        h
      ), t.memoizedState = ks, Zu(null, a));
    if (Wl(t), Hf(i)) {
      if (l = i.nextSibling && i.nextSibling.dataset, l) var b = l.dgst;
      return l = b, l !== "" && (a = Error(c(419)), a.stack = "", a.digest = l, ju({ value: a, source: null, stack: null })), Ao(
        e,
        t,
        h
      );
    }
    if (mt || Ha(e, t, h, !1), l = (h & e.childLanes) !== 0, mt || l) {
      if (Pl.current !== null)
        return Ao(
          e,
          t,
          h
        );
      if (l = Ze, l !== null && (a = bu(
        l,
        h
      ), a !== 0 && a !== s.retryLane))
        throw s.retryLane = a, ja(e, a), Pt(l, e, a), js;
      return Lf(i) || Vo(), Ao(
        e,
        t,
        h
      );
    }
    return Lf(i) ? (t.flags |= 192, t.child = e.child, null) : (e = s.treeContext, $e = _n(i.nextSibling), Et = t, be = !0, Ql = null, Tn = !1, e !== null && Uh(t, e), t = Bs(
      t,
      a.children
    ), t.flags |= 134221824, t);
  }
  function ep(e, t, n) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), no(e.return, t, n);
  }
  function tp(e) {
    for (var t = null; e !== null; ) {
      var n = e.alternate;
      n !== null && fo(n) === null && (t = e), e = e.sibling;
    }
    return t;
  }
  function Oo(e, t, n, l, a, i) {
    var s = e.memoizedState;
    s === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: n,
      tailMode: a,
      treeForkCount: i
    } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = l, s.tail = n, s.tailMode = a, s.treeForkCount = i);
  }
  function Gs(e) {
    var t = e.child;
    for (e.child = null; t !== null; ) {
      var n = t.sibling;
      t.sibling = e.child, e.child = t, t = n;
    }
  }
  function Ys(e, t, n) {
    var l = t.pendingProps, a = l.revealOrder, i = l.tail;
    l = l.children;
    var s = Dt.current;
    if (t.flags & 128)
      return qu(t, s), null;
    var h = (s & 2) !== 0;
    if (h ? (s = s & 1 | 2, t.flags |= 128) : s &= 1, qu(t, s), a === "backwards" && e !== null ? (Gs(e), vt(e, t, l, n), Gs(e)) : vt(e, t, l, n), l = be ? Mu : 0, !h && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && ep(e, n, t);
        else if (e.tag === 19)
          ep(e, n, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t)
            break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (a) {
      case "backwards":
        n = tp(t.child), n === null ? (a = t.child, t.child = null) : (a = n.sibling, n.sibling = null, Gs(t)), Oo(
          t,
          !0,
          a,
          null,
          i,
          l
        );
        break;
      case "unstable_legacy-backwards":
        for (n = null, a = t.child, t.child = null; a !== null; ) {
          if (e = a.alternate, e !== null && fo(e) === null) {
            t.child = a;
            break;
          }
          e = a.sibling, a.sibling = n, n = a, a = e;
        }
        Oo(
          t,
          !0,
          n,
          null,
          i,
          l
        );
        break;
      case "together":
        Oo(
          t,
          !1,
          null,
          null,
          void 0,
          l
        );
        break;
      case "independent":
        t.memoizedState = null;
        break;
      default:
        n = tp(t.child), n === null ? (a = t.child, t.child = null) : (a = n.sibling, n.sibling = null), Oo(
          t,
          !1,
          a,
          n,
          i,
          l
        );
    }
    return t.child;
  }
  function np(e, t, n) {
    var l = t.pendingProps;
    return Kl(t, t.type, l.value), vt(e, t, l.children, n), t.child;
  }
  function _l(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), aa |= t.lanes, (n & t.childLanes) === 0)
      if (e !== null) {
        if (Ha(
          e,
          t,
          n,
          !1
        ), (n & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(c(153));
    if (t.child !== null) {
      for (e = t.child, n = yl(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        e = e.sibling, n = n.sibling = yl(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function qs(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && lo(e)));
  }
  function _0(e, t, n) {
    switch (t.tag) {
      case 3:
        Ta(t, t.stateNode.containerInfo), Kl(t, dt, e.memoizedState.cache), ka();
        break;
      case 27:
      case 5:
        ai(t);
        break;
      case 4:
        Ta(t, t.stateNode.containerInfo);
        break;
      case 10:
        Kl(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, hs(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null) {
          if (l.dehydrated !== null)
            return Wl(t), t.flags |= 128, null;
          l = Ha(
            e,
            t,
            n,
            !1
          );
          var a = t.child.childLanes;
          return l || (n & a) !== 0 ? Wm(e, t, n) : (Wl(t), e = _l(
            e,
            t,
            n
          ), e !== null ? e.sibling : null);
        }
        Wl(t);
        break;
      case 19:
        if (t.flags & 128)
          return Ys(
            e,
            t,
            n
          );
        if (a = (e.flags & 128) !== 0, l = (n & t.childLanes) !== 0, l || (Ha(
          e,
          t,
          n,
          !1
        ), l = (n & t.childLanes) !== 0), a) {
          if (l)
            return Ys(
              e,
              t,
              n
            );
          t.flags |= 128;
        }
        if (a = t.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), qu(t, Dt.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, Km(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        Kl(t, dt, e.memoizedState.cache);
    }
    return _l(e, t, n);
  }
  function lp(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        mt = !0;
      else {
        if (!qs(e, n) && (t.flags & 128) === 0)
          return mt = !1, _0(
            e,
            t,
            n
          );
        mt = (e.flags & 131072) !== 0;
      }
    else
      mt = !1, be && (t.flags & 1048576) !== 0 && jh(t, Mu, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = qa(t.elementType), t.type = e, typeof e == "function")
            $c(e) ? (l = Za(e, l), t.tag = 1, t = Fm(
              null,
              t,
              e,
              l,
              n
            )) : (t.tag = 0, t = Us(
              null,
              t,
              e,
              l,
              n
            ));
          else {
            if (e != null) {
              var a = e.$$typeof;
              if (a === V) {
                t.tag = 11, t = Xm(
                  null,
                  t,
                  e,
                  l,
                  n
                );
                break e;
              } else if (a === Se) {
                t.tag = 14, t = Qm(
                  null,
                  t,
                  e,
                  l,
                  n
                );
                break e;
              } else if (a === Ke) {
                t.tag = 10, t.type = e, t = np(
                  null,
                  t,
                  n
                );
                break e;
              }
            }
            throw t = Ne(e) || e, Error(c(306, t, ""));
          }
        }
        return t;
      case 0:
        return Us(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 1:
        return l = t.type, a = Za(
          l,
          t.pendingProps
        ), Fm(
          e,
          t,
          l,
          a,
          n
        );
      case 3:
        e: {
          if (Ta(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(c(387));
          l = t.pendingProps;
          var i = t.memoizedState;
          a = i.element, os(e, t), Yu(t, l, null, n);
          var s = t.memoizedState;
          if (l = s.cache, Kl(t, dt, l), l !== i.cache && ns(
            t,
            [dt],
            n,
            !0
          ), Gu(), l = s.element, i.isDehydrated)
            if (i = {
              element: l,
              isDehydrated: !1,
              cache: s.cache
            }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
              t = Pm(
                e,
                t,
                l,
                n
              );
              break e;
            } else if (l !== a) {
              a = bn(
                Error(c(424)),
                t
              ), ju(a), t = Pm(
                e,
                t,
                l,
                n
              );
              break e;
            } else {
              switch (e = t.stateNode.containerInfo, e.nodeType) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for ($e = _n(e.firstChild), Et = t, be = !0, Ql = null, Tn = !0, n = Kh(
                t,
                null,
                l,
                n
              ), t.child = n; n; )
                n.flags = n.flags & -3 | 134221824, n = n.sibling;
            }
          else {
            if (ka(), l === a) {
              t = _l(
                e,
                t,
                n
              );
              break e;
            }
            vt(e, t, l, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return wi(e, t), e === null ? (n = Cg(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = n : be || (t.stateNode = rg(
          t.type,
          t.pendingProps,
          Dn.current,
          t
        )) : t.memoizedState = Cg(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return ai(t), e === null && be && (l = t.stateNode = _g(
          t.type,
          t.pendingProps,
          Dn.current
        ), Et = t, Tn = !0, a = $e, oa(t.type) ? (Bf = a, $e = _n(l.firstChild)) : $e = a), vt(
          e,
          t,
          t.pendingProps.children,
          n
        ), wi(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && be && ((a = l = $e) && (l = yS(
          l,
          t.type,
          t.pendingProps,
          Tn
        ), l !== null ? (t.stateNode = l, Et = t, $e = _n(l.firstChild), Tn = !1, a = !0) : a = !1), a || Zl(t)), ai(t), a = t.type, i = t.pendingProps, s = e !== null ? e.memoizedProps : null, l = i.children, wf(a, i) ? l = null : s !== null && wf(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = gs(
          e,
          t,
          h0,
          null,
          null,
          n
        ), Ji._currentValue = a), wi(e, t), vt(e, t, l, n), t.child;
      case 6:
        return e === null && be && ((e = n = $e) && (n = bS(
          n,
          t.pendingProps,
          Tn
        ), n !== null ? (t.stateNode = n, Et = t, $e = null, e = !0) : e = !1), e || Zl(t)), null;
      case 13:
        return Wm(e, t, n);
      case 4:
        return Ta(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = Xa(
          t,
          null,
          l,
          n
        ) : vt(e, t, l, n), t.child;
      case 11:
        return Xm(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 7:
        return l = t.pendingProps, wi(e, t), vt(e, t, l, n), t.child;
      case 8:
        return vt(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 12:
        return vt(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 10:
        return np(e, t, n);
      case 9:
        return a = t.type._context, l = t.pendingProps.children, Ba(t), a = wt(a), l = l(a), t.flags |= 1, vt(e, t, l, n), t.child;
      case 14:
        return Qm(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 15:
        return Zm(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 19:
        return Ys(e, t, n);
      case 31:
        return T0(e, t, n);
      case 22:
        return Km(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        return Ba(t), l = wt(dt), e === null ? (a = is(), a === null && (a = Ze, i = ls(), a.pooledCache = i, i.refCount++, i !== null && (a.pooledCacheLanes |= n), a = i), t.memoizedState = { parent: l, cache: a }, rs(t), Kl(t, dt, a)) : ((e.lanes & n) !== 0 && (os(e, t), Yu(t, null, null, n), Gu()), a = e.memoizedState, i = t.memoizedState, a.parent !== l ? (a = { parent: l, cache: l }, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Kl(t, dt, l)) : (l = i.cache, Kl(t, dt, l), l !== a.cache && ns(
          t,
          [dt],
          n,
          !0
        ))), vt(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 30:
        return t.stateNode === null && (t.stateNode = {
          autoName: null,
          paired: null,
          clones: null,
          ref: null
        }), l = t.pendingProps, l.name != null && l.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : be && eo(t), e !== null && e.memoizedProps.name !== l.name ? t.flags |= 4194816 : wi(e, t), vt(e, t, l.children, n), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(c(156, t.tag));
  }
  function Al(e) {
    e.flags |= 4;
  }
  function Vs(e, t, n, l, a) {
    var i;
    if ((i = (e.mode & 32) !== 0) && (i = n === null ? Dg(t, l) : Dg(t, l) && (l.src !== n.src || l.srcSet !== n.srcSet)), i) {
      if (e.flags |= 16777216, (a & 335544128) === a)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Hp()) e.flags |= 8192;
        else
          throw Va = ro, us;
    } else e.flags &= -16777217;
  }
  function ap(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Mg(t))
      if (Hp()) e.flags |= 8192;
      else
        throw Va = ro, us;
  }
  function Ro(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? jr() : 536870912, e.lanes |= t, Ui |= t);
  }
  function Ku(e, t) {
    if (!be)
      switch (e.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var n = e.tail, l = null; n !== null; )
            n.alternate !== null && (l = n), n = n.sibling;
          l === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null;
          break;
        default:
          for (t = e.tail, n = null; t !== null; )
            t.alternate !== null && (n = t), t = t.sibling;
          n === null ? e.tail = null : n.sibling = null;
      }
  }
  function Ie(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, l = 0;
    if (t)
      for (var a = e.child; a !== null; )
        n |= a.lanes | a.childLanes, l |= a.subtreeFlags & 1206910976, l |= a.flags & 1206910976, a.return = e, a = a.sibling;
    else
      for (a = e.child; a !== null; )
        n |= a.lanes | a.childLanes, l |= a.subtreeFlags, l |= a.flags, a.return = e, a = a.sibling;
    return e.subtreeFlags |= l, e.childLanes = n, t;
  }
  function A0(e, t, n) {
    var l = t.pendingProps;
    switch (Pc(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ie(t), null;
      case 1:
        return Ie(t), null;
      case 3:
        return n = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), El(dt), Qn(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (xi(t) ? Al(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, es())), Ie(t), null;
      case 26:
        var a = t.type, i = t.memoizedState;
        return e === null ? (Al(t), i !== null ? (Ie(t), ap(t, i)) : (Ie(t), Vs(
          t,
          a,
          null,
          l,
          n
        ))) : i ? i !== e.memoizedState ? (Al(t), Ie(t), ap(t, i)) : (Ie(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && Al(t), Ie(t), Vs(
          t,
          a,
          e,
          l,
          n
        )), null;
      case 27:
        if (xa(t), n = Dn.current, a = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Al(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(c(166));
            return Ie(t), t.subtreeFlags &= -33554433, null;
          }
          e = ct.current, xi(t) ? kh(t) : (e = _g(a, l, n), t.stateNode = e, Al(t));
        }
        return Ie(t), t.subtreeFlags &= -33554433, null;
      case 5:
        if (xa(t), a = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Al(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(c(166));
            return Ie(t), t.subtreeFlags &= -33554433, null;
          }
          if (i = ct.current, xi(t))
            kh(t);
          else {
            var s = ar(
              Dn.current
            );
            switch (i) {
              case 1:
                i = s.createElementNS(
                  "http://www.w3.org/2000/svg",
                  a
                );
                break;
              case 2:
                i = s.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  a
                );
                break;
              default:
                switch (a) {
                  case "svg":
                    i = s.createElementNS(
                      "http://www.w3.org/2000/svg",
                      a
                    );
                    break;
                  case "math":
                    i = s.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      a
                    );
                    break;
                  case "script":
                    i = s.createElement("div"), i.innerHTML = "<script><\/script>", i = i.removeChild(
                      i.firstChild
                    );
                    break;
                  case "select":
                    i = typeof l.is == "string" ? s.createElement("select", {
                      is: l.is
                    }) : s.createElement("select"), l.multiple ? i.multiple = !0 : l.size && (i.size = l.size);
                    break;
                  default:
                    i = typeof l.is == "string" ? s.createElement(a, { is: l.is }) : s.createElement(a);
                }
            }
            i[Je] = t, i[Rt] = l;
            e: for (s = t.child; s !== null; ) {
              if (s.tag === 5 || s.tag === 6)
                i.appendChild(s.stateNode);
              else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
                s.child.return = s, s = s.child;
                continue;
              }
              if (s === t) break e;
              for (; s.sibling === null; ) {
                if (s.return === null || s.return === t)
                  break e;
                s = s.return;
              }
              s.sibling.return = s.return, s = s.sibling;
            }
            t.stateNode = i;
            e: switch (jt(i, a, l), a) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!l.autoFocus;
                break e;
              case "img":
                l = !0;
                break e;
              default:
                l = !1;
            }
            l && Al(t);
          }
        }
        return Ie(t), t.subtreeFlags &= -33554433, Vs(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          n
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== l && Al(t);
        else {
          if (typeof l != "string" && t.stateNode === null)
            throw Error(c(166));
          if (e = Dn.current, xi(t)) {
            if (e = t.stateNode, n = t.memoizedProps, l = null, a = Et, a !== null)
              switch (a.tag) {
                case 27:
                case 5:
                  l = a.memoizedProps;
              }
            e[Je] = t, e = !!(e.nodeValue === n || l !== null && l.suppressHydrationWarning === !0 || lg(e.nodeValue, n)), e || Zl(t, !0);
          } else
            e = ar(e).createTextNode(
              l
            ), e[Je] = t, t.stateNode = e;
        }
        return Ie(t), null;
      case 31:
        if (n = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = xi(t), n !== null) {
            if (e === null) {
              if (!l) throw Error(c(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(557));
              e[Je] = t;
            } else
              ka(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ie(t), e = !1;
          } else
            n = es(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
          if (!e)
            return t.flags & 256 ? (un(t), t) : (un(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(c(558));
        }
        return Ie(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (a = xi(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!a) throw Error(c(318));
              if (a = t.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(c(317));
              a[Je] = t;
            } else
              ka(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ie(t), a = !1;
          } else
            a = es(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
          if (!a)
            return t.flags & 256 ? (un(t), t) : (un(t), null);
        }
        return un(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = l !== null, e = e !== null && e.memoizedState !== null, n && (l = t.child, a = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (a = l.alternate.memoizedState.cachePool.pool), i = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (i = l.memoizedState.cachePool.pool), i !== a && (l.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Ro(t, t.updateQueue), Ie(t), null);
      case 4:
        return Qn(), e === null && Af(t.stateNode.containerInfo), t.flags |= 67108864, Ie(t), null;
      case 10:
        return El(t.type), Ie(t), null;
      case 19:
        if (ms(t), l = t.memoizedState, l === null) return Ie(t), null;
        if (a = (t.flags & 128) !== 0, i = l.rendering, i === null)
          if (a) Ku(l, !1);
          else {
            if (rt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (i = fo(e), i !== null) {
                  for (t.flags |= 128, Ku(l, !1), e = i.updateQueue, t.updateQueue = e, Ro(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; )
                    zh(n, e), n = n.sibling;
                  return qu(
                    t,
                    Dt.current & 1 | 2
                  ), be && bl(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && Lt() > Bo && (t.flags |= 128, a = !0, Ku(l, !1), t.lanes = 4194304);
          }
        else {
          if (!a)
            if (e = fo(i), e !== null) {
              if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Ro(t, e), Ku(l, !0), l.tail === null && l.tailMode !== "collapsed" && l.tailMode !== "visible" && !i.alternate && !be)
                return Ie(t), null;
            } else
              2 * Lt() - l.renderingStartTime > Bo && n !== 536870912 && (t.flags |= 128, a = !0, Ku(l, !1), t.lanes = 4194304);
          l.isBackwards ? (i.sibling = t.child, t.child = i) : (e = l.last, e !== null ? e.sibling = i : t.child = i, l.last = i);
        }
        if (l.tail !== null) {
          e = l.tail;
          e: {
            for (n = e; n !== null; ) {
              if (n.alternate !== null) {
                n = !1;
                break e;
              }
              n = n.sibling;
            }
            n = !0;
          }
          return l.rendering = e, l.tail = e.sibling, l.renderingStartTime = Lt(), e.sibling = null, i = Dt.current, i = a ? i & 1 | 2 : i & 1, l.tailMode === "visible" || l.tailMode === "collapsed" || !n || be ? qu(t, i) : (n = i, Le(zt, t), Le(Dt, n), Ht === null && (Ht = t)), be && bl(t, l.treeForkCount), e;
        }
        return Ie(t), null;
      case 22:
      case 23:
        return un(t), ds(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (Ie(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ie(t), n = t.updateQueue, n !== null && Ro(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== n && (t.flags |= 2048), e !== null && me(Ya), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), El(dt), Ie(t), null;
      case 25:
        return null;
      case 30:
        return t.flags |= 33554432, Ie(t), null;
    }
    throw Error(c(156, t.tag));
  }
  function O0(e, t) {
    switch (Pc(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return El(dt), Qn(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return xa(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (un(t), t.alternate === null)
            throw Error(c(340));
          ka();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (un(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(c(340));
          ka();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return ms(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
      case 4:
        return Qn(), null;
      case 10:
        return El(t.type), null;
      case 22:
      case 23:
        return un(t), ds(), e !== null && me(Ya), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return El(dt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function ip(e, t) {
    switch (Pc(t), t.tag) {
      case 3:
        El(dt), Qn();
        break;
      case 26:
      case 27:
      case 5:
        xa(t);
        break;
      case 4:
        Qn();
        break;
      case 31:
        t.memoizedState !== null && un(t);
        break;
      case 13:
        un(t);
        break;
      case 19:
        ms(t);
        break;
      case 10:
        El(t.type);
        break;
      case 22:
      case 23:
        un(t), ds(), e !== null && me(Ya);
        break;
      case 24:
        El(dt);
    }
  }
  function Ju(e, t) {
    try {
      var n = t.updateQueue, l = n !== null ? n.lastEffect : null;
      if (l !== null) {
        var a = l.next;
        n = a;
        do {
          if ((n.tag & e) === e) {
            l = void 0;
            var i = n.create, s = n.inst;
            l = i(), s.destroy = l;
          }
          n = n.next;
        } while (n !== a);
      }
    } catch (h) {
      Ye(t, t.return, h);
    }
  }
  function ta(e, t, n) {
    try {
      var l = t.updateQueue, a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var i = a.next;
        l = i;
        do {
          if ((l.tag & e) === e) {
            var s = l.inst, h = s.destroy;
            if (h !== void 0) {
              s.destroy = void 0, a = t;
              var b = n, R = h;
              try {
                R();
              } catch (M) {
                Ye(
                  a,
                  b,
                  M
                );
              }
            }
          }
          l = l.next;
        } while (l !== i);
      }
    } catch (M) {
      Ye(t, t.return, M);
    }
  }
  function up(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        $h(t, n);
      } catch (l) {
        Ye(e, e.return, l);
      }
    }
  }
  function rp(e, t, n) {
    n.props = Za(
      e.type,
      e.memoizedProps
    ), n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (l) {
      Ye(e, t, l);
    }
  }
  function tl(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var l = e.stateNode;
            break;
          case 30:
            var a = e.stateNode, i = gl(e.memoizedProps, a);
            (a.ref === null || a.ref.name !== i) && (a.ref = mg(i)), l = a.ref;
            break;
          case 7:
            if (e.stateNode === null) {
              var s = new fn(e);
              v(
                e.child,
                !1,
                gS,
                s,
                void 0,
                void 0
              ), e.stateNode = s;
            }
            l = e.stateNode;
            break;
          default:
            l = e.stateNode;
        }
        typeof n == "function" ? e.refCleanup = n(l) : n.current = l;
      }
    } catch (h) {
      Ye(e, t, h);
    }
  }
  function Mt(e, t) {
    var n = e.ref, l = e.refCleanup;
    if (n !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (a) {
          Ye(e, t, a);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (a) {
          Ye(e, t, a);
        }
      else n.current = null;
  }
  function Co(e, t) {
    if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null)
      for (var n = 0; n < t.length; n++)
        Sg(
          e.stateNode,
          t[n]
        );
  }
  function op(e) {
    for (var t = e.return; t !== null && (Qs(t) && Sg(e.stateNode, t.stateNode), !Xs(t)); )
      t = t.return;
  }
  function $u(e) {
    for (var t = e.return; t !== null && (Qs(t) && vS(e.stateNode, t.stateNode), !Xs(t)); )
      t = t.return;
  }
  function Xs(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 27;
  }
  function Qs(e) {
    return e && e.tag === 7 && e.stateNode !== null;
  }
  function Zs(e) {
    var t = e.type, n = e.memoizedProps, l = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && l.focus();
          break e;
        case "img":
          n.src ? l.src = n.src : n.srcSet && (l.srcset = n.srcSet);
      }
    } catch (a) {
      Ye(e, e.return, a);
    }
  }
  function Ks(e, t, n) {
    try {
      var l = e.stateNode;
      P0(l, e.type, n, t), l[Rt] = t;
    } catch (a) {
      Ye(e, e.return, a);
    }
  }
  function cp(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && oa(e.type) || e.tag === 4;
  }
  function Js(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || cp(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && oa(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function $s(e, t, n, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      a = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(a, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(a), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Pn)), Co(e, l), Ce = !0;
    else if (a !== 4 && (a === 27 && (Co(e, l), l = null, oa(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null))
      for ($s(
        e,
        t,
        n,
        l
      ), e = e.sibling; e !== null; )
        $s(
          e,
          t,
          n,
          l
        ), e = e.sibling;
  }
  function No(e, t, n, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      a = e.stateNode, t ? n.insertBefore(a, t) : n.appendChild(a), Co(e, l), Ce = !0;
    else if (a !== 4 && (a === 27 && (Co(e, l), l = null, oa(e.type) && (n = e.stateNode)), e = e.child, e !== null))
      for (No(
        e,
        t,
        n,
        l
      ), e = e.sibling; e !== null; )
        No(
          e,
          t,
          n,
          l
        ), e = e.sibling;
  }
  function sp(e) {
    var t = e.stateNode, n = e.memoizedProps;
    try {
      for (var l = e.type, a = t.attributes; a.length; )
        t.removeAttributeNode(a[0]);
      jt(t, l, n), t[Je] = e, t[Rt] = n;
    } catch (i) {
      Ye(e, e.return, i);
    }
  }
  var wo = !1, rn = null;
  function fp(e) {
    (e.tag === 30 || (e.subtreeFlags & 33554432) !== 0) && (wo = !0);
  }
  var nl = null;
  function dp() {
    var e = nl;
    return nl = null, e;
  }
  var $t = 0;
  function zi(e, t, n, l, a) {
    return $t = 0, hp(
      e.child,
      t,
      n,
      l,
      a
    );
  }
  function hp(e, t, n, l, a) {
    for (var i = !1; e !== null; ) {
      if (e.tag === 5) {
        var s = e.stateNode;
        if (l !== null) {
          var h = Mf(s);
          l.push(h), h.view && (i = !0);
        } else
          i || Mf(s).view && (i = !0);
        wo = !0, dg(
          s,
          $t === 0 ? t : t + "_" + $t,
          n
        ), $t++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && a || hp(
        e.child,
        t,
        n,
        l,
        a
      ) && (i = !0));
      e = e.sibling;
    }
    return i;
  }
  function ll(e, t) {
    for (; e !== null; )
      e.tag === 5 ? hg(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && t || ll(
        e.child,
        t
      )), e = e.sibling;
  }
  function zo(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if ((e.tag !== 22 || e.memoizedState === null) && (zo(e), e.tag === 30 && (e.flags & 18874368) !== 0 && e.stateNode.paired)) {
          var t = e.memoizedProps;
          if (t.name == null || t.name === "auto")
            throw Error(c(544));
          var n = t.name;
          t = vl(t.default, t.share), t !== "none" && (zi(
            e,
            n,
            t,
            null,
            !1
          ) || ll(e.child, !1));
        }
        e = e.sibling;
      }
  }
  function Is(e, t) {
    if (e.tag === 30) {
      var n = e.stateNode, l = e.memoizedProps, a = gl(l, n), i = vl(
        l.default,
        n.paired ? l.share : l.enter
      );
      i !== "none" ? zi(e, a, i, null, !1) ? (zo(e), n.paired || t || Bi(e, l.onEnter)) : ll(e.child, !1) : zo(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        Is(e, t), e = e.sibling;
    else zo(e);
  }
  function Fs(e) {
    if (rn !== null && rn.size !== 0) {
      var t = rn;
      if ((e.subtreeFlags & 18874368) !== 0)
        for (e = e.child; e !== null; ) {
          if (e.tag !== 22 || e.memoizedState === null) {
            if (e.tag === 30 && (e.flags & 18874368) !== 0) {
              var n = e.memoizedProps, l = n.name;
              if (l != null && l !== "auto") {
                var a = t.get(l);
                if (a !== void 0) {
                  var i = vl(
                    n.default,
                    n.share
                  );
                  if (i !== "none" && (zi(
                    e,
                    l,
                    i,
                    null,
                    !1
                  ) ? (i = e.stateNode, a.paired = i, i.paired = a, Bi(e, n.onShare)) : ll(e.child, !1)), t.delete(l), t.size === 0) break;
                }
              }
            }
            Fs(e);
          }
          e = e.sibling;
        }
    }
  }
  function Ps(e) {
    if (e.tag === 30) {
      var t = e.memoizedProps, n = gl(t, e.stateNode), l = rn !== null ? rn.get(n) : void 0, a = vl(
        t.default,
        l !== void 0 ? t.share : t.exit
      );
      a !== "none" && (zi(e, n, a, null, !1) ? l !== void 0 ? (a = e.stateNode, l.paired = a, a.paired = l, rn.delete(n), Bi(e, t.onShare)) : Bi(e, t.onExit) : ll(e.child, !1)), rn !== null && Fs(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        Ps(e), e = e.sibling;
    else
      rn !== null && Fs(e);
  }
  function mp(e) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var t = e.memoizedProps, n = gl(t, e.stateNode);
        t = vl(t.default, t.update), e.flags &= -5, t !== "none" && zi(
          e,
          n,
          t,
          e.memoizedState = [],
          !1
        );
      } else
        (e.subtreeFlags & 33554432) !== 0 && mp(e);
      e = e.sibling;
    }
  }
  function Ws(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if (e.tag !== 22 || e.memoizedState === null) {
          if (e.tag === 30 && (e.flags & 18874368) !== 0) {
            var t = e.stateNode;
            t.paired !== null && (t.paired = null, ll(e.child, !1));
          }
          Ws(e);
        }
        e = e.sibling;
      }
  }
  function Do(e) {
    if (e.tag === 30)
      e.stateNode.paired = null, ll(e.child, !1), Ws(e);
    else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        Do(e), e = e.sibling;
    else Ws(e);
  }
  function pp(e) {
    for (e = e.child; e !== null; )
      e.tag === 30 ? ll(e.child, !1) : (e.subtreeFlags & 33554432) !== 0 && pp(e), e = e.sibling;
  }
  function ef(e, t, n, l, a, i, s) {
    for (var h = !1; t !== null; ) {
      if (t.tag === 5) {
        var b = t.stateNode;
        if (i !== null && $t < i.length) {
          var R = i[$t], M = Mf(b);
          (R.view || M.view) && (h = !0);
          var k;
          if (k = (e.flags & 4) === 0)
            if (M.clip) k = !0;
            else {
              k = R.rect;
              var _ = M.rect;
              k = k.y !== _.y || k.x !== _.x || k.height !== _.height || k.width !== _.width;
            }
          k && (e.flags |= 4), M.abs ? M = !R.abs : (R = R.rect, M = M.rect, M = R.height !== M.height || R.width !== M.width), M && (e.flags |= 32);
        } else e.flags |= 32;
        (e.flags & 4) !== 0 && dg(
          b,
          $t === 0 ? n : n + "_" + $t,
          a
        ), h && (e.flags & 4) !== 0 || (nl === null && (nl = []), nl.push(
          b,
          $t === 0 ? l : l + "_" + $t,
          t.memoizedProps
        )), $t++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && s ? e.flags |= t.flags & 32 : ef(
        e,
        t.child,
        n,
        l,
        a,
        i,
        s
      ) && (h = !0));
      t = t.sibling;
    }
    return h;
  }
  function gp(e, t) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var n = e.memoizedProps, l = e.stateNode, a = gl(n, l), i = vl(n.default, n.update), s;
        s = e.memoizedState, e.memoizedState = null, l = e;
        var h = e.child;
        $t = 0, a = ef(
          l,
          h,
          a,
          a,
          i,
          s,
          !1
        ), (e.flags & 4) !== 0 && a && Bi(e, n.onUpdate);
      } else
        (e.subtreeFlags & 33554432) !== 0 && gp(e);
      e = e.sibling;
    }
  }
  var Tt = !1, He = !1, al = !1, tf = !1, vp = typeof WeakSet == "function" ? WeakSet : Set, xt = null, il = !1, Iu = !1, Mo = !1, nf = !1;
  function R0(e, t, n) {
    if (e = e.containerInfo, Cf = $i, e = Eh(e), qc(e)) {
      if ("selectionStart" in e)
        var l = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          l = (l = e.ownerDocument) && l.defaultView || window;
          var a = l.getSelection && l.getSelection();
          if (a && a.rangeCount !== 0) {
            l = a.anchorNode;
            var i = a.anchorOffset, s = a.focusNode;
            a = a.focusOffset;
            try {
              l.nodeType, s.nodeType;
            } catch {
              l = null;
              break e;
            }
            var h = 0, b = -1, R = -1, M = 0, k = 0, _ = e, D = null;
            t: for (; ; ) {
              for (var X; _ !== l || i !== 0 && _.nodeType !== 3 || (b = h + i), _ !== s || a !== 0 && _.nodeType !== 3 || (R = h + a), _.nodeType === 3 && (h += _.nodeValue.length), (X = _.firstChild) !== null; )
                D = _, _ = X;
              for (; ; ) {
                if (_ === e) break t;
                if (D === l && ++M === i && (b = h), D === s && ++k === a && (R = h), (X = _.nextSibling) !== null) break;
                _ = D, D = _.parentNode;
              }
              _ = X;
            }
            l = b === -1 || R === -1 ? null : { start: b, end: R };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Nf = { focusedElem: e, selectionRange: l }, $i = !1, n = (n & 335544064) === n, xt = t, t = n ? 9270 : 1024; xt !== null; ) {
      if (e = xt, n && (l = e.deletions, l !== null))
        for (i = 0; i < l.length; i++)
          n && Ps(l[i]);
      if (e.alternate === null && (e.flags & 2) !== 0)
        n && fp(e), jo(n);
      else {
        if (e.tag === 22) {
          if (l = e.alternate, e.memoizedState !== null) {
            l !== null && l.memoizedState === null && n && Ps(l), jo(n);
            continue;
          } else if (l !== null && l.memoizedState !== null) {
            n && fp(e), jo(n);
            continue;
          }
        }
        l = e.child, (e.subtreeFlags & t) !== 0 && l !== null ? (l.return = e, xt = l) : (n && mp(e), jo(n));
      }
    }
    rn = null;
  }
  function jo(e) {
    for (; xt !== null; ) {
      var t = xt, n = e, l = t.alternate, a = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((a & 1024) !== 0 && l !== null) {
            n = void 0, a = l.memoizedProps, l = l.memoizedState;
            var i = t.stateNode;
            try {
              var s = Za(
                t.type,
                a
              );
              n = i.getSnapshotBeforeUpdate(
                s,
                l
              ), i.__reactInternalSnapshotBeforeUpdate = n;
            } catch (h) {
              Ye(t, t.return, h);
            }
          }
          break;
        case 3:
          if ((a & 1024) !== 0) {
            if (l = t.stateNode.containerInfo, n = l.nodeType, n === 9)
              kf(l);
            else if (n === 1)
              switch (l.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  kf(l);
                  break;
                default:
                  l.textContent = "";
              }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        case 30:
          n && l !== null && (n = gl(
            l.memoizedProps,
            l.stateNode
          ), a = t.memoizedProps, a = vl(a.default, a.update), a !== "none" && zi(
            l,
            n,
            a,
            l.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((a & 1024) !== 0) throw Error(c(163));
      }
      if (l = t.sibling, l !== null) {
        l.return = t.return, xt = l;
        break;
      }
      xt = t.return;
    }
  }
  function yp(e, t, n) {
    var l = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        ul(e, n), l & 4 && Ju(5, n);
        break;
      case 1:
        if (ul(e, n), l & 4)
          if (e = n.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (s) {
              Ye(n, n.return, s);
            }
          else {
            var a = Za(
              n.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                a,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (s) {
              Ye(
                n,
                n.return,
                s
              );
            }
          }
        l & 64 && up(n), l & 512 && tl(n, n.return);
        break;
      case 3:
        if (ul(e, n), l & 64 && (e = n.updateQueue, e !== null)) {
          if (t = null, n.child !== null)
            switch (n.child.tag) {
              case 27:
              case 5:
                t = n.child.stateNode;
                break;
              case 1:
                t = n.child.stateNode;
            }
          try {
            $h(e, t);
          } catch (s) {
            Ye(n, n.return, s);
          }
        }
        break;
      case 27:
        t === null && l & 4 && sp(n);
      case 26:
      case 5:
        ul(e, n), t === null && l & 4 && Zs(n), l & 512 && tl(n, n.return);
        break;
      case 12:
        ul(e, n);
        break;
      case 31:
        ul(e, n), l & 4 && Tp(e, n);
        break;
      case 13:
        ul(e, n), l & 4 && xp(e, n), l & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = B0.bind(
          null,
          n
        ), SS(e, n))));
        break;
      case 22:
        if (l = n.memoizedState !== null || Tt, !l) {
          var i = t !== null && t.memoizedState !== null || He;
          t = Tt, a = He, Tt = l, (He = i) && !a ? (l = 2, (n.subtreeFlags & 8772) !== 0 && (l |= 1), Bn(
            e,
            n,
            l
          )) : ul(e, n), Tt = t, He = a;
        }
        break;
      case 30:
        ul(e, n), l & 512 && tl(n, n.return);
        break;
      case 7:
        l & 512 && tl(n, n.return);
      default:
        ul(e, n);
    }
  }
  function lf(e, t) {
    for (e = e.child; e !== null; )
      bp(e, t), e = e.sibling;
  }
  function bp(e, t) {
    switch (e.tag) {
      case 5:
      case 26:
        try {
          var n = e.stateNode;
          if (t) {
            var l = n.style;
            typeof l.setProperty == "function" ? l.setProperty("display", "none", "important") : l.display = "none";
          } else {
            var a = e.stateNode, i = e.memoizedProps.style, s = i != null && i.hasOwnProperty("display") ? i.display : null;
            a.style.display = s == null || typeof s == "boolean" ? "" : ("" + s).trim();
          }
        } catch (b) {
          Ye(e, e.return, b);
        }
        af(e, t);
        break;
      case 6:
        try {
          e.stateNode.nodeValue = t ? "" : e.memoizedProps, Ce = !0;
        } catch (b) {
          Ye(e, e.return, b);
        }
        break;
      case 18:
        try {
          var h = e.stateNode;
          t ? fg(h, !0) : fg(e.stateNode, !1);
        } catch (b) {
          Ye(e, e.return, b);
        }
        break;
      case 22:
      case 23:
        e.memoizedState === null && lf(e, t);
        break;
      default:
        lf(e, t);
    }
  }
  function af(e, t) {
    if (e.subtreeFlags & 67108864)
      for (e = e.child; e !== null; ) {
        e: {
          var n = e, l = t;
          switch (n.tag) {
            case 4:
              bp(n, l);
              break e;
            case 22:
              n.memoizedState === null && af(n, l);
              break e;
            default:
              af(n, l);
          }
        }
        e = e.sibling;
      }
  }
  function Sp(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Sp(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Na(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var lt = null, It = !1;
  function Ln(e, t, n) {
    for (n = n.child; n !== null; )
      Ep(e, t, n), n = n.sibling;
  }
  function Ep(e, t, n) {
    if (St && typeof St.onCommitFiberUnmount == "function")
      try {
        St.onCommitFiberUnmount(Ll, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        He || Mt(n, t), Ln(
          e,
          t,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !He && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        He || Mt(n, t), $u(n);
        var l = lt, a = It;
        oa(n.type) && (lt = n.stateNode, It = !1), Ln(
          e,
          t,
          n
        ), Ag(
          n.stateNode,
          n.type,
          n.memoizedProps
        ), lt = l, It = a;
        break;
      case 5:
        He || Mt(n, t), $u(n);
      case 6:
        if (n.tag === 6 && $u(n), l = lt, a = It, lt = null, Ln(
          e,
          t,
          n
        ), lt = l, It = a, lt !== null)
          if (It)
            try {
              (lt.nodeType === 9 ? lt.body : lt.nodeName === "HTML" ? lt.ownerDocument.body : lt).removeChild(n.stateNode), Ce = !0;
            } catch (i) {
              Ye(
                n,
                t,
                i
              );
            }
          else
            try {
              lt.removeChild(n.stateNode), Ce = !0;
            } catch (i) {
              Ye(
                n,
                t,
                i
              );
            }
        break;
      case 18:
        lt !== null && (It ? (e = lt, sg(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          n.stateNode
        ), Ii(e)) : sg(lt, n.stateNode));
        break;
      case 4:
        l = lt, a = It, lt = n.stateNode.containerInfo, It = !0, Ln(
          e,
          t,
          n
        ), lt = l, It = a;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ta(2, n, t), He || ta(4, n, t), Ln(
          e,
          t,
          n
        );
        break;
      case 1:
        He || (Mt(n, t), l = n.stateNode, typeof l.componentWillUnmount == "function" && rp(
          n,
          t,
          l
        )), Ln(
          e,
          t,
          n
        );
        break;
      case 21:
        Ln(
          e,
          t,
          n
        );
        break;
      case 22:
        He = (l = He) || n.memoizedState !== null, Ln(
          e,
          t,
          n
        ), He = l;
        break;
      case 30:
        Mt(n, t), Ln(
          e,
          t,
          n
        );
        break;
      case 7:
        He || Mt(n, t), Ln(
          e,
          t,
          n
        );
        break;
      default:
        Ln(
          e,
          t,
          n
        );
    }
  }
  function Tp(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Ii(e);
      } catch (n) {
        Ye(t, t.return, n);
      }
    }
  }
  function xp(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Ii(e);
      } catch (n) {
        Ye(t, t.return, n);
      }
  }
  function C0(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new vp()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new vp()), t;
      default:
        throw Error(c(435, e.tag));
    }
  }
  function Uo(e, t) {
    var n = C0(e);
    t.forEach(function(l) {
      if (!n.has(l)) {
        n.add(l);
        var a = G0.bind(null, e, l);
        l.then(a, a);
      }
    });
  }
  function Vt(e, t, n) {
    var l = t.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var i = l[a], s = e, h = t, b = h;
        e: for (; b !== null; ) {
          switch (b.tag) {
            case 27:
              if (oa(b.type)) {
                lt = b.stateNode, It = !1;
                break e;
              }
              break;
            case 5:
              lt = b.stateNode, It = !1;
              break e;
            case 3:
            case 4:
              lt = b.stateNode.containerInfo, It = !0;
              break e;
          }
          b = b.return;
        }
        if (lt === null) throw Error(c(160));
        Ep(s, h, i), lt = null, It = !1, s = i.alternate, s !== null && (s.return = null), i.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        _p(t, e, n), t = t.sibling;
  }
  var Hn = null;
  function _p(e, t, n) {
    var l = e.alternate, a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (a & 4 && (l = e.updateQueue, l = l !== null ? l.events : null, l !== null))
          for (var i = 0; i < l.length; i++) {
            var s = l[i];
            s.ref.impl = s.nextImpl;
          }
        Vt(t, e, n), Xt(e), a & 4 && (ta(3, e, e.return), Ju(3, e), ta(5, e, e.return));
        break;
      case 1:
        Vt(t, e, n), Xt(e), a & 512 && (He || l === null || Mt(l, l.return)), a & 64 && Tt && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
        break;
      case 26:
        if (i = Hn, Vt(t, e, n), Xt(e), a & 512 && (He || l === null || Mt(l, l.return)), a & 4)
          if (a = l !== null ? l.memoizedState : null, n = e.memoizedState, l === null)
            if (n === null)
              if (e.stateNode === null)
                if (Tt)
                  e.stateNode = rg(
                    e.type,
                    e.memoizedProps,
                    t.containerInfo,
                    e
                  );
                else {
                  e: {
                    t = e.type, n = e.memoizedProps, a = i.ownerDocument || i;
                    t: switch (t) {
                      case "title":
                        l = a.getElementsByTagName("title")[0], (!l || l[Ra] || l[Je] || l.namespaceURI === "http://www.w3.org/2000/svg" || l.hasAttribute("itemprop")) && (l = a.createElement(t), a.head.insertBefore(
                          l,
                          a.querySelector("head > title")
                        )), jt(l, t, n), l[Je] = e, nt(l), t = l;
                        break e;
                      case "link":
                        if (i = zg(
                          "link",
                          "href",
                          a
                        ).get(t + (n.href || ""))) {
                          for (s = 0; s < i.length; s++)
                            if (l = i[s], l.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && l.getAttribute("rel") === (n.rel == null ? null : n.rel) && l.getAttribute("title") === (n.title == null ? null : n.title) && l.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                              i.splice(s, 1);
                              break t;
                            }
                        }
                        l = a.createElement(t), jt(l, t, n), a.head.appendChild(l);
                        break;
                      case "meta":
                        if (i = zg(
                          "meta",
                          "content",
                          a
                        ).get(t + (n.content || ""))) {
                          for (s = 0; s < i.length; s++)
                            if (l = i[s], l.getAttribute("content") === (n.content == null ? null : "" + n.content) && l.getAttribute("name") === (n.name == null ? null : n.name) && l.getAttribute("property") === (n.property == null ? null : n.property) && l.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && l.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                              i.splice(s, 1);
                              break t;
                            }
                        }
                        l = a.createElement(t), jt(l, t, n), a.head.appendChild(l);
                        break;
                      default:
                        throw Error(c(468, t));
                    }
                    l[Je] = e, nt(l), t = l;
                  }
                  e.stateNode = t;
                }
              else
                Tt || Vf(i, e.type, e.stateNode);
            else
              e.stateNode = wg(
                i,
                n,
                e.memoizedProps
              );
          else
            a !== n ? (a === null ? (t = l.stateNode, t === null || He || t.parentNode.removeChild(t)) : a.count--, n === null ? Tt || Vf(i, e.type, e.stateNode) : wg(i, n, e.memoizedProps)) : n === null && e.stateNode !== null && Ks(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        break;
      case 27:
        Vt(t, e, n), Xt(e), a & 512 && (He || l === null || Mt(l, l.return)), l !== null && a & 4 && Ks(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (i = al, al = !1, Vt(t, e, n), al = i, Xt(e), a & 512 && (He || l === null || Mt(l, l.return)), e.flags & 32) {
          t = e.stateNode;
          try {
            it(t, ""), Ce = !0;
          } catch (M) {
            Ye(e, e.return, M);
          }
        }
        a & 4 && e.stateNode != null && (t = e.memoizedProps, Ks(
          e,
          t,
          l !== null ? l.memoizedProps : t
        )), a & 1024 && (tf = !0);
        break;
      case 6:
        if (Vt(t, e, n), Xt(e), a & 4) {
          if (e.stateNode === null)
            throw Error(c(162));
          t = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = t, Ce = !0;
          } catch (M) {
            Ye(e, e.return, M);
          }
        }
        break;
      case 3:
        if (Ce = !1, Io = null, i = Hn, Hn = ir(t.containerInfo), Vt(t, e, n), Hn = i, Xt(e), a & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Ii(t.containerInfo);
          } catch (M) {
            Ye(e, e.return, M);
          }
        tf && (tf = !1, Ap(e)), Ce = !1;
        break;
      case 4:
        a = al, al = Tt, l = Br(), i = Hn, Hn = ir(
          e.stateNode.containerInfo
        ), Vt(t, e, n), Xt(e), Hn = i, Ce && Iu && (Mo = !0), Ce = l, al = a;
        break;
      case 12:
        Vt(t, e, n), Xt(e);
        break;
      case 31:
        Vt(t, e, n), Xt(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Uo(e, t)));
        break;
      case 13:
        Vt(t, e, n), Xt(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (Ho = Lt()), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Uo(e, t)));
        break;
      case 22:
        i = e.memoizedState !== null, s = l !== null && l.memoizedState !== null;
        var h = Tt, b = He, R = al;
        Tt = h || i, al = R || i, He = b || s, Vt(t, e, n), He = b, al = R, Tt = h, Xt(e), a & 8192 && (t = e.stateNode, t._visibility = i ? t._visibility & -2 : t._visibility | 1, !i || l === null || s || Tt || He || (t = s || He, n = Tt, l = He, Tt = i || Tt, He = t, na(e, 2), Tt = n, He = l), !i && al || lf(e, i)), a & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, Uo(e, n))));
        break;
      case 19:
        Vt(t, e, n), Xt(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Uo(e, t)));
        break;
      case 30:
        a & 512 && (He || l === null || Mt(l, l.return)), a = Br(), i = Iu, s = (n & 335544064) === n, h = e.memoizedProps, Iu = s && vl(
          h.default,
          h.update
        ) !== "none", Vt(t, e, n), Xt(e), s && l !== null && Ce && (e.flags |= 4), Iu = i, Ce = a;
        break;
      case 21:
        break;
      case 7:
        a & 512 && (He || l === null || Mt(l, l.return)), l && l.stateNode !== null && (l.stateNode._fragmentFiber = e);
      default:
        Vt(t, e, n), Xt(e);
    }
  }
  function Xt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, l = e.return; l !== null; ) {
          if (cp(l)) {
            n = l;
            break;
          }
          l = l.return;
        }
        l = null;
        for (var a = e.return; a !== null; ) {
          if (Qs(a)) {
            var i = a.stateNode;
            l === null ? l = [i] : l.push(i);
          }
          if (Xs(a)) break;
          a = a.return;
        }
        var s = l;
        if (n == null) throw Error(c(160));
        switch (n.tag) {
          case 27:
            var h = n.stateNode, b = Js(e);
            No(
              e,
              b,
              h,
              s
            );
            break;
          case 5:
            var R = n.stateNode;
            n.flags & 32 && (it(R, ""), n.flags &= -33);
            var M = Js(e);
            No(
              e,
              M,
              R,
              s
            );
            break;
          case 3:
          case 4:
            var k = n.stateNode.containerInfo, _ = Js(e);
            $s(
              e,
              _,
              k,
              s
            );
            break;
          default:
            throw Error(c(161));
        }
      } catch (D) {
        Ye(e, e.return, D);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Ap(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Ap(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, $i = !0, t.reset(), $i = !1), e = e.sibling;
      }
  }
  function Di(e, t) {
    if (t.subtreeFlags & 9270)
      for (t = t.child; t !== null; )
        Op(t, e), t = t.sibling;
    else gp(t);
  }
  function Op(e, t) {
    var n = e.alternate;
    if (n === null) Is(e, !1);
    else
      switch (e.tag) {
        case 3:
          if (nf = il = !1, dp(), Di(t, e), !il && !Mo) {
            if (e = nl, e !== null)
              for (var l = 0; l < e.length; l += 3) {
                n = e[l];
                var a = e[l + 1];
                hg(n, e[l + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + a + ")"
                  }
                );
              }
            e = t.containerInfo, e = e.nodeType === 9 ? e.documentElement : e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "" && (e.style.viewTransitionName = "none", e.animate(
              { opacity: [0, 0], pointerEvents: ["none", "none"] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition-group(root)"
              }
            ), e.animate(
              { width: [0, 0], height: [0, 0] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition"
              }
            )), nf = !0;
          }
          nl = null;
          break;
        case 5:
          Di(t, e);
          break;
        case 4:
          l = il, il = !1, Di(t, e), il && (Mo = !0), il = l;
          break;
        case 22:
          e.memoizedState === null && (n.memoizedState !== null ? Is(e, !1) : Di(t, e));
          break;
        case 30:
          l = il, a = dp(), il = !1, Di(t, e), il && (e.flags |= 4);
          var i = e.memoizedProps, s = e.stateNode;
          t = gl(i, s), s = gl(n.memoizedProps, s);
          var h = vl(i.default, i.update);
          h === "none" ? t = !1 : (i = n.memoizedState, n.memoizedState = null, n = e.child, $t = 0, t = ef(
            e,
            n,
            t,
            s,
            h,
            i,
            !0
          ), $t !== (i === null ? 0 : i.length) && (e.flags |= 32)), (e.flags & 4) !== 0 && t ? (Bi(
            e,
            e.memoizedProps.onUpdate
          ), nl = a) : a !== null && (a.push.apply(a, nl), nl = a), il = (e.flags & 32) !== 0 ? !0 : l;
          break;
        default:
          Di(t, e);
      }
  }
  function ul(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        yp(e, t.alternate, t), t = t.sibling;
  }
  function na(e, t) {
    for (e = e.child; e !== null; ) {
      var n = e, l = t;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ta(4, n, n.return), na(
            n,
            l
          );
          break;
        case 1:
          Mt(n, n.return);
          var a = n.stateNode;
          typeof a.componentWillUnmount == "function" && rp(
            n,
            n.return,
            a
          ), na(
            n,
            l
          );
          break;
        case 27:
          (l & 2) !== 0 && Ag(
            n.stateNode,
            n.type,
            n.memoizedProps
          );
        case 5:
          Mt(n, n.return), n.tag !== 5 && n.tag !== 27 || $u(n), na(
            n,
            l
          );
          break;
        case 6:
          $u(n);
          break;
        case 26:
          Mt(n, n.return), a = n.stateNode, n.memoizedState !== null || a === null || He || a.parentNode.removeChild(a), na(
            n,
            l
          );
          break;
        case 22:
          n.memoizedState === null && na(
            n,
            l
          );
          break;
        case 30:
          Mt(n, n.return), na(
            n,
            l
          );
          break;
        case 7:
          Mt(n, n.return);
        default:
          na(
            n,
            l
          );
      }
      e = e.sibling;
    }
  }
  function Bn(e, t, n) {
    for (n = (t.subtreeFlags & 8772) !== 0 ? n : n & -2, t = t.child; t !== null; ) {
      var l = t.alternate, a = e, i = t, s = i.flags, h = (n & 1) !== 0;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Bn(
            a,
            i,
            n
          ), Ju(4, i);
          break;
        case 1:
          if (Bn(
            a,
            i,
            n
          ), l = i, a = l.stateNode, typeof a.componentDidMount == "function")
            try {
              a.componentDidMount();
            } catch (M) {
              Ye(l, l.return, M);
            }
          if (l = i, a = l.updateQueue, a !== null) {
            var b = l.stateNode;
            try {
              var R = a.shared.hiddenCallbacks;
              if (R !== null)
                for (a.shared.hiddenCallbacks = null, a = 0; a < R.length; a++)
                  Jh(R[a], b);
            } catch (M) {
              Ye(l, l.return, M);
            }
          }
          h && s & 64 && up(i), tl(i, i.return);
          break;
        case 27:
          (n & 2) !== 0 && sp(i);
        case 5:
          i.tag !== 5 && i.tag !== 27 || op(i), Bn(
            a,
            i,
            n
          ), h && l === null && s & 4 && Zs(i), tl(i, i.return);
          break;
        case 6:
          op(i);
          break;
        case 26:
          b = i.stateNode, i.memoizedState !== null || b === null || Tt || Vf(
            ir(b.ownerDocument),
            i.type,
            b
          ), Bn(
            a,
            i,
            n
          ), h && l === null && s & 4 && Zs(i), tl(i, i.return);
          break;
        case 12:
          Bn(
            a,
            i,
            n
          );
          break;
        case 31:
          Bn(
            a,
            i,
            n
          ), h && s & 4 && Tp(a, i);
          break;
        case 13:
          Bn(
            a,
            i,
            n
          ), h && s & 4 && xp(a, i);
          break;
        case 22:
          i.memoizedState === null && Bn(
            a,
            i,
            n
          ), tl(i, i.return);
          break;
        case 30:
          Bn(
            a,
            i,
            n
          ), tl(i, i.return);
          break;
        case 7:
          tl(i, i.return);
        default:
          Bn(
            a,
            i,
            n
          );
      }
      t = t.sibling;
    }
  }
  function uf(e, t) {
    var n = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Uu(n));
  }
  function rf(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Uu(e));
  }
  function xn(e, t, n, l) {
    var a = (n & 335544064) === n;
    if (t.subtreeFlags & (a ? 10262 : 10256))
      for (t = t.child; t !== null; )
        Rp(
          e,
          t,
          n,
          l
        ), t = t.sibling;
    else a && pp(t);
  }
  function Rp(e, t, n, l) {
    var a = (n & 335544064) === n;
    a && t.alternate === null && t.return !== null && t.return.alternate !== null && Do(t);
    var i = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        xn(
          e,
          t,
          n,
          l
        ), i & 2048 && Ju(9, t);
        break;
      case 1:
        xn(
          e,
          t,
          n,
          l
        );
        break;
      case 3:
        xn(
          e,
          t,
          n,
          l
        ), a && nf && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), i & 2048 && (i = null, t.alternate !== null && (i = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== i && (t.refCount++, i != null && Uu(i)));
        break;
      case 12:
        if (i & 2048) {
          xn(
            e,
            t,
            n,
            l
          ), i = t.stateNode;
          try {
            var s = t.memoizedProps, h = s.id, b = s.onPostCommit;
            typeof b == "function" && b(
              h,
              t.alternate === null ? "mount" : "update",
              i.passiveEffectDuration,
              -0
            );
          } catch (R) {
            Ye(t, t.return, R);
          }
        } else
          xn(
            e,
            t,
            n,
            l
          );
        break;
      case 31:
        xn(
          e,
          t,
          n,
          l
        );
        break;
      case 13:
        xn(
          e,
          t,
          n,
          l
        );
        break;
      case 23:
        break;
      case 22:
        s = t.stateNode, h = t.alternate, t.memoizedState !== null ? (a && h !== null && h.memoizedState === null && Do(h), s._visibility & 2 ? xn(
          e,
          t,
          n,
          l
        ) : Fu(
          e,
          t
        )) : (a && h !== null && h.memoizedState !== null && Do(t), s._visibility & 2 ? xn(
          e,
          t,
          n,
          l
        ) : (s._visibility |= 2, Mi(
          e,
          t,
          n,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        ))), i & 2048 && uf(h, t);
        break;
      case 24:
        xn(
          e,
          t,
          n,
          l
        ), i & 2048 && rf(t.alternate, t);
        break;
      case 30:
        a && (i = t.alternate, i !== null && (ll(i.child, !0), ll(t.child, !0))), xn(
          e,
          t,
          n,
          l
        );
        break;
      default:
        xn(
          e,
          t,
          n,
          l
        );
    }
  }
  function Mi(e, t, n, l, a) {
    for (a = a && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var i = e, s = t, h = n, b = l, R = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          Mi(
            i,
            s,
            h,
            b,
            a
          ), Ju(8, s);
          break;
        case 23:
          break;
        case 22:
          var M = s.stateNode;
          s.memoizedState !== null ? M._visibility & 2 ? Mi(
            i,
            s,
            h,
            b,
            a
          ) : Fu(
            i,
            s
          ) : (M._visibility |= 2, Mi(
            i,
            s,
            h,
            b,
            a
          )), a && R & 2048 && uf(
            s.alternate,
            s
          );
          break;
        case 24:
          Mi(
            i,
            s,
            h,
            b,
            a
          ), a && R & 2048 && rf(s.alternate, s);
          break;
        default:
          Mi(
            i,
            s,
            h,
            b,
            a
          );
      }
      t = t.sibling;
    }
  }
  function Fu(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e, l = t, a = l.flags;
        switch (l.tag) {
          case 22:
            Fu(n, l), a & 2048 && uf(
              l.alternate,
              l
            );
            break;
          case 24:
            Fu(n, l), a & 2048 && rf(l.alternate, l);
            break;
          default:
            Fu(n, l);
        }
        t = t.sibling;
      }
  }
  var Ka = 8192;
  function Ja(e, t, n) {
    if (e.subtreeFlags & Ka)
      for (e = e.child; e !== null; )
        Cp(
          e,
          t,
          n
        ), e = e.sibling;
  }
  function Cp(e, t, n) {
    switch (e.tag) {
      case 26:
        Ja(
          e,
          t,
          n
        ), e.flags & Ka && (e.memoizedState !== null ? jS(
          n,
          Hn,
          e.memoizedState,
          e.memoizedProps
        ) : (e = e.stateNode, (t & 335544128) === t && Ug(n, e)));
        break;
      case 5:
        Ja(
          e,
          t,
          n
        ), e.flags & Ka && (e = e.stateNode, (t & 335544128) === t && Ug(n, e));
        break;
      case 3:
      case 4:
        var l = Hn;
        Hn = ir(e.stateNode.containerInfo), Ja(
          e,
          t,
          n
        ), Hn = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = Ka, Ka = 16777216, Ja(
          e,
          t,
          n
        ), Ka = l) : Ja(
          e,
          t,
          n
        ));
        break;
      case 30:
        if ((e.flags & Ka) !== 0 && (l = e.memoizedProps.name, l != null && l !== "auto")) {
          var a = e.stateNode;
          a.paired = null, rn === null && (rn = /* @__PURE__ */ new Map()), rn.set(l, a);
        }
        Ja(
          e,
          t,
          n
        );
        break;
      default:
        Ja(
          e,
          t,
          n
        );
    }
  }
  function Np(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Pu(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          xt = l, zp(
            l,
            e
          );
        }
      Np(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        wp(e), e = e.sibling;
  }
  function wp(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Pu(e), e.flags & 2048 && ta(9, e, e.return);
        break;
      case 3:
        Pu(e);
        break;
      case 12:
        Pu(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, ko(e)) : Pu(e);
        break;
      default:
        Pu(e);
    }
  }
  function ko(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          xt = l, zp(
            l,
            e
          );
        }
      Np(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          ta(8, t, t.return), ko(t);
          break;
        case 22:
          n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, ko(t));
          break;
        default:
          ko(t);
      }
      e = e.sibling;
    }
  }
  function zp(e, t) {
    for (; xt !== null; ) {
      var n = xt;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          ta(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var l = n.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Uu(n.memoizedState.cache);
      }
      if (l = n.child, l !== null) l.return = n, xt = l;
      else
        e: for (n = e; xt !== null; ) {
          l = xt;
          var a = l.sibling, i = l.return;
          if (Sp(l), l === n) {
            xt = null;
            break e;
          }
          if (a !== null) {
            a.return = i, xt = a;
            break e;
          }
          xt = i;
        }
    }
  }
  var N0 = {
    getCacheForType: function(e) {
      var t = wt(dt), n = t.data.get(e);
      return n === void 0 && (n = e(), t.data.set(e, n)), n;
    },
    cacheSignal: function() {
      return wt(dt).controller.signal;
    }
  }, w0 = typeof WeakMap == "function" ? WeakMap : Map, Ue = 0, Ze = null, Te = null, Ae = 0, Ge = 0, on = null, la = !1, ji = !1, of = !1, Ol = 0, rt = 0, aa = 0, $a = 0, Lo = 0, cn = 0, Ui = 0, Wu = null, Ft = null, cf = !1, Ho = 0, Dp = 0, Bo = 1 / 0, Go = null, ia = null, at = 0, Gn = null, Ia = null, rl = 0, sf = 0, ff = null, Mp = null, ki = null, Li = null, Hi = null, er = 0, Yo = null;
  function sn() {
    return (Ue & 2) !== 0 && Ae !== 0 ? Ae & -Ae : P.T !== null ? Ef() : Ur();
  }
  function jp() {
    if (cn === 0)
      if ((Ae & 536870912) === 0 || be) {
        var e = Aa;
        Aa <<= 1, (Aa & 3932160) === 0 && (Aa = 262144), cn = e;
      } else cn = 536870912;
    return e = zt.current, e !== null && (e.flags |= 32), cn;
  }
  function Bi(e, t) {
    if (t != null) {
      var n = e.stateNode, l = n.ref;
      l === null && (l = n.ref = mg(
        gl(e.memoizedProps, n)
      )), Li === null && (Li = []), Li.push(t.bind(null, l));
    }
  }
  function Pt(e, t, n) {
    (e === Ze && (Ge === 2 || Ge === 9) || e.cancelPendingCommit !== null) && (Gi(e, 0), ua(
      e,
      Ae,
      cn,
      !1
    )), gn(e, n), ((Ue & 2) === 0 || e !== Ze) && (e === Ze && ((Ue & 2) === 0 && ($a |= n), rt === 4 && ua(
      e,
      Ae,
      cn,
      !1
    )), ol(e));
  }
  function Up(e, t, n) {
    if ((Ue & 6) !== 0) throw Error(c(327));
    var l = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Oa(e, t), a = l ? M0(e, t) : hf(e, t, !0), i = l;
    do {
      if (a === 0) {
        ji && !l && ua(e, t, 0, !1);
        break;
      } else {
        if (n = e.current.alternate, i && !z0(n)) {
          a = hf(e, t, !1), i = !1;
          continue;
        }
        if (a === 2) {
          if (i = t, e.errorRecoveryDisabledLanes & i)
            var s = 0;
          else
            s = e.pendingLanes & -536870913, s = s !== 0 ? s : s & 536870912 ? 536870912 : 0;
          if (s !== 0) {
            t = s;
            e: {
              var h = e;
              a = Wu;
              var b = h.current.memoizedState.isDehydrated;
              if (b && (Gi(h, s).flags |= 256), s = hf(
                h,
                s,
                !1
              ), s !== 2 && s !== 6) {
                if (of && !b) {
                  h.errorRecoveryDisabledLanes |= i, $a |= i, a = 4;
                  break e;
                }
                i = Ft, Ft = a, i !== null && (Ft === null ? Ft = i : Ft.push.apply(
                  Ft,
                  i
                ));
              }
              a = s;
            }
            if (i = !1, a !== 2) continue;
          }
        }
        if (a === 1) {
          Gi(e, 0), ua(e, t, 0, !0);
          break;
        }
        e: {
          switch (l = e, i = a, i) {
            case 0:
            case 1:
              throw Error(c(345));
            case 4:
              if ((t & 4194048) !== t && (t & 62914560) !== t)
                break;
            case 6:
              ua(
                l,
                t,
                cn,
                !la
              );
              break e;
            case 2:
              Ft = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(c(329));
          }
          if ((t & 62914560) === t && (a = Ho + 300 - Lt(), 10 < a)) {
            if (ua(
              l,
              t,
              cn,
              !la
            ), Gl(l, 0, !0) !== 0) break e;
            rl = t, l.timeoutHandle = Df(
              kp.bind(
                null,
                l,
                n,
                Ft,
                Go,
                cf,
                t,
                cn,
                $a,
                Ui,
                la,
                i,
                "Throttled",
                -0,
                0
              ),
              a
            );
            break e;
          }
          kp(
            l,
            n,
            Ft,
            Go,
            cf,
            t,
            cn,
            $a,
            Ui,
            la,
            i,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    ol(e);
  }
  function kp(e, t, n, l, a, i, s, h, b, R, M, k, _, D) {
    e.timeoutHandle = -1;
    var X = t.subtreeFlags, F = (i & 335544064) === i;
    if (k = null, (F || X & 8192 || (X & 16785408) === 16785408) && (k = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: Pn
    }, rn = null, Cp(
      t,
      i,
      k
    ), F && (X = k, F = e.containerInfo, F = (F.nodeType === 9 ? F : F.ownerDocument).__reactViewTransition, F != null && (X.count++, X.waitingForViewTransition = !0, X = or.bind(X), F.finished.then(X, X))), X = (i & 62914560) === i ? Ho - Lt() : (i & 4194048) === i ? Dp - Lt() : 0, X = US(
      k,
      X
    ), X !== null)) {
      rl = i, e.cancelPendingCommit = X(
        Xp.bind(
          null,
          e,
          t,
          i,
          n,
          l,
          a,
          s,
          h,
          b,
          R,
          M,
          k,
          null,
          _,
          D
        )
      ), ua(e, i, s, !R);
      return;
    }
    Xp(
      e,
      t,
      i,
      n,
      l,
      a,
      s,
      h,
      b,
      R,
      M,
      k
    );
  }
  function z0(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var l = 0; l < n.length; l++) {
          var a = n[l], i = a.getSnapshot;
          a = a.value;
          try {
            if (!an(i(), a)) return !1;
          } catch {
            return !1;
          }
        }
      if (n = t.child, t.subtreeFlags & 16384 && n !== null)
        n.return = t, t = n;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function ua(e, t, n, l) {
    t = Yl(e, t), t &= ~Lo, t &= ~$a, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var a = t; 0 < a; ) {
      var i = 31 - tt(a), s = 1 << i;
      l[i] = -1, a &= ~s;
    }
    n !== 0 && yu(e, n, t);
  }
  function qo() {
    return (Ue & 6) === 0 ? (tr(0), !1) : !0;
  }
  function df() {
    if (Te !== null) {
      if (Ge === 0)
        var e = Te.return;
      else
        e = Te, Sl = La = null, bs(e), Oi = null, Hu = 0, e = Te;
      for (; e !== null; )
        ip(e.alternate, e), e = e.return;
      Te = null;
    }
  }
  function Gi(e, t) {
    var n = e.timeoutHandle;
    return n !== -1 && (e.timeoutHandle = -1, tS(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), rl = 0, df(), Ze = e, Te = n = yl(e.current, null), Ae = t, Ge = 0, on = null, la = !1, ji = Oa(e, t), of = !1, Ui = cn = Lo = $a = aa = rt = 0, Ft = Wu = null, cf = !1, Ol = Yl(e, t), $r(), n;
  }
  function Lp(e, t) {
    pe = null, P.H = Eo, t === Ai || t === uo ? (t = Xh(), Ge = 3) : t === us ? (t = Xh(), Ge = 4) : Ge = t === js ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, on = t, Te === null && (rt = 1, To(
      e,
      bn(t, e.current)
    ));
  }
  function Hp() {
    var e = zt.current;
    return e === null ? !0 : (Ae & 4194048) === Ae ? Ht === null : (Ae & 62914560) === Ae || (Ae & 536870912) !== 0 ? e === Ht : !1;
  }
  function Bp() {
    var e = P.H;
    return P.H = Eo, e === null ? Eo : e;
  }
  function Gp() {
    var e = P.A;
    return P.A = N0, e;
  }
  function Vo() {
    rt = 4, la || (Ae & 4194048) !== Ae && zt.current !== null || (ji = !0), (aa & 134217727) === 0 && ($a & 134217727) === 0 || Ze === null || ua(
      Ze,
      Ae,
      cn,
      !1
    );
  }
  function hf(e, t, n) {
    var l = Ue;
    Ue |= 2;
    var a = Bp(), i = Gp();
    (Ze !== e || Ae !== t) && (Go = null, Gi(e, t)), t = !1;
    var s = rt;
    e: do
      try {
        if (Ge !== 0 && Te !== null) {
          var h = Te, b = on;
          switch (Ge) {
            case 8:
              df(), s = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              zt.current === null && (t = !0);
              var R = Ge;
              if (Ge = 0, on = null, Yi(e, h, b, R), n && ji) {
                s = 0;
                break e;
              }
              break;
            default:
              R = Ge, Ge = 0, on = null, Yi(e, h, b, R);
          }
        }
        D0(), s = rt;
        break;
      } catch (M) {
        Lp(e, M);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Sl = La = null, Ue = l, P.H = a, P.A = i, Te === null && (Ze = null, Ae = 0, $r()), s;
  }
  function D0() {
    for (; Te !== null; ) Yp(Te);
  }
  function M0(e, t) {
    var n = Ue;
    Ue |= 2;
    var l = Bp(), a = Gp();
    Ze !== e || Ae !== t ? (Go = null, Bo = Lt() + 500, Gi(e, t)) : ji = Oa(
      e,
      t
    );
    e: do
      try {
        if (Ge !== 0 && Te !== null) {
          t = Te;
          var i = on;
          t: switch (Ge) {
            case 1:
              Ge = 0, on = null, Yi(e, t, i, 1);
              break;
            case 2:
            case 9:
              if (qh(i)) {
                Ge = 0, on = null, qp(t);
                break;
              }
              t = function() {
                Ge !== 2 && Ge !== 9 || Ze !== e || (Ge = 7), ol(e);
              }, i.then(t, t);
              break e;
            case 3:
              Ge = 7;
              break e;
            case 4:
              Ge = 5;
              break e;
            case 7:
              qh(i) ? (Ge = 0, on = null, qp(t)) : (Ge = 0, on = null, Yi(e, t, i, 7));
              break;
            case 5:
              var s = null;
              switch (Te.tag) {
                case 26:
                  s = Te.memoizedState;
                case 5:
                case 27:
                  var h = Te;
                  if (s ? Mg(s) : h.stateNode.complete) {
                    Ge = 0, on = null;
                    var b = h.sibling;
                    if (b !== null) Te = b;
                    else {
                      var R = h.return;
                      R !== null ? (Te = R, Xo(R)) : Te = null;
                    }
                    break t;
                  }
              }
              Ge = 0, on = null, Yi(e, t, i, 5);
              break;
            case 6:
              Ge = 0, on = null, Yi(e, t, i, 6);
              break;
            case 8:
              df(), rt = 6;
              break e;
            default:
              throw Error(c(462));
          }
        }
        j0();
        break;
      } catch (M) {
        Lp(e, M);
      }
    while (!0);
    return Sl = La = null, P.H = l, P.A = a, Ue = n, Te !== null ? 0 : (Ze = null, Ae = 0, $r(), rt);
  }
  function j0() {
    for (; Te !== null && !Nr(); )
      Yp(Te);
  }
  function Yp(e) {
    var t = lp(e.alternate, e, Ol);
    e.memoizedProps = e.pendingProps, t === null ? Xo(e) : Te = t;
  }
  function qp(e) {
    var t = e, n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Im(
          n,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Ae
        );
        break;
      case 11:
        t = Im(
          n,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Ae
        );
        break;
      case 5:
        bs(t);
        var l = t;
        l === Et && (be ? (to(l), l.tag === 5 && l.stateNode != null && ($e = l.stateNode)) : (to(l), be = !0));
      default:
        ip(n, t), t = Te = zh(t, Ol), t = lp(n, t, Ol);
    }
    e.memoizedProps = e.pendingProps, t === null ? Xo(e) : Te = t;
  }
  function Yi(e, t, n, l) {
    Sl = La = null, bs(t), Oi = null, Hu = 0;
    var a = t.return;
    try {
      if (E0(
        e,
        a,
        t,
        n,
        Ae
      )) {
        rt = 1, To(
          e,
          bn(n, e.current)
        ), Te = null;
        return;
      }
    } catch (i) {
      if (a !== null) throw Te = a, i;
      rt = 1, To(
        e,
        bn(n, e.current)
      ), Te = null;
      return;
    }
    t.flags & 32768 ? (be || l === 1 ? e = !0 : ji || (Ae & 536870912) !== 0 ? e = !1 : (la = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = zt.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Vp(t, e)) : Xo(t);
  }
  function Xo(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Vp(
          t,
          la
        );
        return;
      }
      e = t.return;
      var n = A0(
        t.alternate,
        t,
        Ol
      );
      if (n !== null) {
        Te = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        Te = t;
        return;
      }
      Te = t = e;
    } while (t !== null);
    rt === 0 && (rt = 5);
  }
  function Vp(e, t) {
    do {
      var n = O0(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, Te = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        Te = e;
        return;
      }
      Te = e = n;
    } while (e !== null);
    rt = 6, Te = null;
  }
  function Xp(e, t, n, l, a, i, s, h, b, R, M, k) {
    e.cancelPendingCommit = null;
    do
      Qo();
    while (at !== 0);
    if ((Ue & 6) !== 0) throw Error(c(327));
    if (t !== null) {
      if (t === e.current) throw Error(c(177));
      e === Ze && (Te = Ze = null, Ae = 0), Ia = t, Gn = e, rl = n, ff = a, Mp = l, U0(
        e,
        t,
        n,
        s,
        h,
        b,
        k
      );
    }
  }
  function U0(e, t, n, l, a, i, s) {
    var h = t.lanes | t.childLanes;
    if (sf = h, h |= Kc, _c(
      e,
      n,
      h,
      l,
      a,
      i
    ), Li = null, (n & 335544064) === n ? (Hi = c0(e), l = 10262) : (Hi = null, l = 10256), (t.subtreeFlags & l) !== 0 || (t.flags & l) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Y0(Mn, function() {
      return vf(), null;
    })) : (e.callbackNode = null, e.callbackPriority = 0), wo = !1, l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
      l = P.T, P.T = null, a = fe.p, fe.p = 2, i = Ue, Ue |= 4;
      try {
        R0(e, t, n);
      } finally {
        Ue = i, fe.p = a, P.T = l;
      }
    }
    at = 1, wo ? ki = rS(
      s,
      e.containerInfo,
      Hi,
      mf,
      pf,
      L0,
      gf,
      vf,
      k0
    ) : (mf(), pf(), gf());
  }
  function k0(e) {
    if (at !== 0) {
      var t = Gn.onRecoverableError;
      t(e, { componentStack: null });
    }
  }
  function L0() {
    at === 3 && (at = 0, Op(Ia, Gn), at = 4);
  }
  function mf() {
    if (at === 1) {
      at = 0;
      var e = Gn, t = Ia, n = rl, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = P.T, P.T = null;
        var a = fe.p;
        fe.p = 2;
        var i = Ue;
        Ue |= 4;
        try {
          Iu = Mo = !1, _p(t, e, n), n = Nf;
          var s = Eh(e.containerInfo), h = n.focusedElem, b = n.selectionRange;
          if (s !== h && h && h.ownerDocument && Sh(
            h.ownerDocument.documentElement,
            h
          )) {
            if (b !== null && qc(h)) {
              var R = b.start, M = b.end;
              if (M === void 0 && (M = R), "selectionStart" in h)
                h.selectionStart = R, h.selectionEnd = Math.min(
                  M,
                  h.value.length
                );
              else {
                var k = h.ownerDocument || document, _ = k && k.defaultView || window;
                if (_.getSelection) {
                  var D = _.getSelection(), X = h.textContent.length, F = Math.min(b.start, X), ge = b.end === void 0 ? F : Math.min(b.end, X);
                  !D.extend && F > ge && (s = ge, ge = F, F = s);
                  var O = bh(
                    h,
                    F
                  ), E = bh(
                    h,
                    ge
                  );
                  if (O && E && (D.rangeCount !== 1 || D.anchorNode !== O.node || D.anchorOffset !== O.offset || D.focusNode !== E.node || D.focusOffset !== E.offset)) {
                    var w = k.createRange();
                    w.setStart(O.node, O.offset), D.removeAllRanges(), F > ge ? (D.addRange(w), D.extend(E.node, E.offset)) : (w.setEnd(E.node, E.offset), D.addRange(w));
                  }
                }
              }
            }
            for (k = [], D = h; D = D.parentNode; )
              D.nodeType === 1 && k.push({
                element: D,
                left: D.scrollLeft,
                top: D.scrollTop
              });
            for (typeof h.focus == "function" && h.focus(), h = 0; h < k.length; h++) {
              var U = k[h];
              U.element.scrollLeft = U.left, U.element.scrollTop = U.top;
            }
          }
          $i = !!Cf, Nf = Cf = null;
        } finally {
          Ue = i, fe.p = a, P.T = l;
        }
      }
      e.current = t, at = 2;
    }
  }
  function pf() {
    if (at === 2) {
      at = 0;
      var e = Gn, t = Ia, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = P.T, P.T = null;
        var l = fe.p;
        fe.p = 2;
        var a = Ue;
        Ue |= 4;
        try {
          yp(e, t.alternate, t);
        } finally {
          Ue = a, fe.p = l, P.T = n;
        }
      }
      at = 3;
    }
  }
  function gf() {
    if (at === 4 || at === 3) {
      at = 0;
      var e = ki;
      ki = null, wr();
      var t = Gn, n = Ia, l = rl, a = Mp, i = (l & 335544064) === l ? 10262 : 10256;
      if ((n.subtreeFlags & i) !== 0 || (n.flags & i) !== 0 ? at = 5 : (at = 0, Ia = Gn = null, Qp(t, t.pendingLanes)), i = t.pendingLanes, i === 0 && (ia = null), Su(l), n = n.stateNode, St && typeof St.onCommitFiberRoot == "function")
        try {
          St.onCommitFiberRoot(
            Ll,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        n = P.T, i = fe.p, fe.p = 2, P.T = null;
        try {
          for (var s = t.onRecoverableError, h = 0; h < a.length; h++) {
            var b = a[h];
            s(b.value, {
              componentStack: b.stack
            });
          }
        } finally {
          P.T = n, fe.p = i;
        }
      }
      if (a = Li, s = Hi, Hi = null, a !== null && (Li = null, s === null && (s = []), e !== null))
        for (b = 0; b < a.length; b++)
          n = (0, a[b])(
            s
          ), n !== void 0 && e.finished.finally(n);
      (rl & 3) !== 0 && Qo(), ol(t), i = t.pendingLanes, (l & 261930) !== 0 && (i & 42) !== 0 ? t === Yo ? er++ : (er = 0, Yo = t) : (er = 0, Yo = null), tr(0);
    }
  }
  function Qp(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Uu(t)));
  }
  function Qo() {
    return ki !== null && (ki.skipTransition(), ki = null), mf(), pf(), gf(), vf();
  }
  function vf() {
    if (at !== 5) return !1;
    var e = Gn, t = sf;
    sf = 0;
    var n = Su(rl), l = P.T, a = fe.p;
    try {
      fe.p = 32 > n ? 32 : n, P.T = null, n = ff, ff = null;
      var i = Gn, s = rl;
      if (at = 0, Ia = Gn = null, rl = 0, (Ue & 6) !== 0) throw Error(c(331));
      var h = Ue;
      if (Ue |= 4, wp(i.current), Rp(
        i,
        i.current,
        s,
        n
      ), Ue = h, tr(0, !1), St && typeof St.onPostCommitFiberRoot == "function")
        try {
          St.onPostCommitFiberRoot(Ll, i);
        } catch {
        }
      return !0;
    } finally {
      fe.p = a, P.T = l, Qp(e, t);
    }
  }
  function Zp(e, t, n) {
    t = bn(n, t), t = Ms(e.stateNode, t, 2), e = Fl(e, t, 2), e !== null && (gn(e, 2), ol(e));
  }
  function Ye(e, t, n) {
    if (e.tag === 3)
      Zp(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Zp(
            t,
            e,
            n
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (ia === null || !ia.has(l))) {
            e = bn(n, e), n = qm(2), l = Fl(t, n, 2), l !== null && (Vm(
              n,
              l,
              t,
              e
            ), gn(l, 2), ol(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function yf(e, t, n) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new w0();
      var a = /* @__PURE__ */ new Set();
      l.set(t, a);
    } else
      a = l.get(t), a === void 0 && (a = /* @__PURE__ */ new Set(), l.set(t, a));
    a.has(n) || (of = !0, a.add(n), e = H0.bind(null, e, t, n), t.then(e, e));
  }
  function H0(e, t, n) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Ze === e && (Ae & n) === n && ((rt === 4 || rt === 3 && (Ae & 62914560) === Ae && 300 > Lt() - Ho) && (Ue & 2) === 0 ? Gi(e, 0) : Lo |= n, Ui === Ae && (Ui = 0)), ol(e);
  }
  function Kp(e, t) {
    t === 0 && (t = jr()), e = ja(e, t), e !== null && (gn(e, t), ol(e));
  }
  function B0(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), Kp(e, n);
  }
  function G0(e, t) {
    var n = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var l = e.stateNode, a = e.memoizedState;
        a !== null && (n = a.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(c(314));
    }
    l !== null && l.delete(t), Kp(e, n);
  }
  function Y0(e, t) {
    return Ul(e, t);
  }
  var qi = null, Vi = null, bf = !1, Zo = !1, Sf = !1, ra = 0;
  function ol(e) {
    e !== Vi && e.next === null && (Vi === null ? qi = Vi = e : Vi = Vi.next = e), Zo = !0, bf || (bf = !0, V0());
  }
  function tr(e, t) {
    if (!Sf && Zo) {
      Sf = !0;
      do
        for (var n = !1, l = qi; l !== null; ) {
          if (e !== 0) {
            var a = l.pendingLanes;
            if (a === 0) var i = 0;
            else {
              var s = l.suspendedLanes, h = l.pingedLanes;
              i = (1 << 31 - tt(42 | e) + 1) - 1, i &= a & ~(s & ~h), i = i & 201326741 ? i & 201326741 | 1 : i ? i | 2 : 0;
            }
            i !== 0 && (n = !0, Fp(l, i));
          } else
            i = Ae, i = Gl(
              l,
              l === Ze ? i : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (i & 3) === 0 || Oa(l, i) || (n = !0, Fp(l, i));
          l = l.next;
        }
      while (n);
      Sf = !1;
    }
  }
  function q0() {
    Jp();
  }
  function Jp() {
    Zo = bf = !1;
    var e = 0;
    ra !== 0 && eS() && (e = ra);
    for (var t = Lt(), n = null, l = qi; l !== null; ) {
      var a = l.next, i = $p(l, t);
      i === 0 ? (l.next = null, n === null ? qi = a : n.next = a, a === null && (Vi = n)) : (n = l, (e !== 0 || (i & 3) !== 0) && (Zo = !0)), l = a;
    }
    at !== 0 && at !== 5 || tr(e), ra !== 0 && (ra = 0);
  }
  function $p(e, t) {
    for (var n = e.suspendedLanes, l = e.pingedLanes, a = e.expirationTimes, i = e.pendingLanes & -62914561; 0 < i; ) {
      var s = 31 - tt(i), h = 1 << s, b = a[s];
      b === -1 ? ((h & n) === 0 || (h & l) !== 0) && (a[s] = xc(h, t)) : b <= t && (e.expiredLanes |= h), i &= ~h;
    }
    if (t = Ze, n = Ae, n = Gl(
      e,
      e === t ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, n === 0 || e === t && (Ge === 2 || Ge === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && kl(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((n & 3) === 0 || Oa(e, n)) {
      if (t = n & -n, t === e.callbackPriority) return t;
      switch (l !== null && kl(l), Su(n)) {
        case 2:
        case 8:
          n = dl;
          break;
        case 32:
          n = Mn;
          break;
        case 268435456:
          n = pu;
          break;
        default:
          n = Mn;
      }
      return l = Ip.bind(null, e), n = Ul(n, l), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return l !== null && l !== null && kl(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Ip(e, t) {
    if (at !== 0 && at !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if (Qo() && e.callbackNode !== n)
      return null;
    var l = Ae;
    return l = Gl(
      e,
      e === Ze ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (Up(e, l, t), $p(e, Lt()), e.callbackNode != null && e.callbackNode === n ? Ip.bind(null, e) : null);
  }
  function Fp(e, t) {
    if (Qo()) return null;
    Up(e, t, !0);
  }
  function V0() {
    nS(function() {
      (Ue & 6) !== 0 ? Ul(
        ri,
        q0
      ) : Jp();
    });
  }
  function Ef() {
    if (ra === 0) {
      var e = Ga;
      e === 0 && (e = oi, oi <<= 1, (oi & 261888) === 0 && (oi = 256)), ra = e;
    }
    return ra;
  }
  function Pp(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Yr(e);
  }
  function X0(e, t, n, l, a) {
    if (t === "submit" && n && n.stateNode === a) {
      var i = Pp(
        (a[Rt] || null).action
      ), s = l.submitter;
      s && (t = (t = s[Rt] || null) ? Pp(t.formAction) : s.getAttribute("formAction"), t !== null && (i = t, s = null));
      var h = new Qr(
        "action",
        "action",
        null,
        l,
        a
      );
      e.push({
        event: h,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (ra !== 0) {
                  var b = new FormData(a, s);
                  Cs(
                    n,
                    {
                      pending: !0,
                      data: b,
                      method: a.method,
                      action: i
                    },
                    null,
                    b
                  );
                }
              } else
                typeof i == "function" && (h.preventDefault(), b = new FormData(a, s), Cs(
                  n,
                  {
                    pending: !0,
                    data: b,
                    method: a.method,
                    action: i
                  },
                  i,
                  b
                ));
            },
            currentTarget: a
          }
        ]
      });
    }
  }
  for (var Tf = 0; Tf < Zc.length; Tf++) {
    var xf = Zc[Tf], Q0 = xf.toLowerCase(), Z0 = xf[0].toUpperCase() + xf.slice(1);
    kn(
      Q0,
      "on" + Z0
    );
  }
  kn(_h, "onAnimationEnd"), kn(Ah, "onAnimationIteration"), kn(Oh, "onAnimationStart"), kn("dblclick", "onDoubleClick"), kn("focusin", "onFocus"), kn("focusout", "onBlur"), kn(t0, "onTransitionRun"), kn(n0, "onTransitionStart"), kn(l0, "onTransitionCancel"), kn(Rh, "onTransitionEnd"), ml("onMouseEnter", ["mouseout", "mouseover"]), ml("onMouseLeave", ["mouseout", "mouseover"]), ml("onPointerEnter", ["pointerout", "pointerover"]), ml("onPointerLeave", ["pointerout", "pointerover"]), hl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), hl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), hl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), hl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), hl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), hl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var nr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), K0 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(nr)
  );
  function Wp(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var l = e[n], a = l.event;
      l = l.listeners;
      e: {
        var i = void 0;
        if (t)
          for (var s = l.length - 1; 0 <= s; s--) {
            var h = l[s], b = h.instance, R = h.currentTarget;
            if (h = h.listener, b !== i && a.isPropagationStopped())
              break e;
            i = h, a.currentTarget = R;
            try {
              i(a);
            } catch (M) {
              Jr(M);
            }
            a.currentTarget = null, i = b;
          }
        else
          for (s = 0; s < l.length; s++) {
            if (h = l[s], b = h.instance, R = h.currentTarget, h = h.listener, b !== i && a.isPropagationStopped())
              break e;
            i = h, a.currentTarget = R;
            try {
              i(a);
            } catch (M) {
              Jr(M);
            }
            a.currentTarget = null, i = b;
          }
      }
    }
  }
  function xe(e, t) {
    var n = t[$n];
    n === void 0 && (n = t[$n] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    n.has(l) || (eg(t, e, 2, !1), n.add(l));
  }
  function _f(e, t, n) {
    var l = 0;
    t && (l |= 4), eg(
      n,
      e,
      l,
      t
    );
  }
  var Ko = "_reactListening" + Math.random().toString(36).slice(2);
  function Af(e) {
    if (!e[Ko]) {
      e[Ko] = !0, Lr.forEach(function(n) {
        n !== "selectionchange" && (K0.has(n) || _f(n, !1, e), _f(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Ko] || (t[Ko] = !0, _f("selectionchange", !1, t));
    }
  }
  function eg(e, t, n, l) {
    switch (Vg(t)) {
      case 2:
        var a = BS;
        break;
      case 8:
        a = GS;
        break;
      default:
        a = Qf;
    }
    n = a.bind(
      null,
      t,
      n,
      e
    ), a = void 0, !Dc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (a = !0), l ? a !== void 0 ? e.addEventListener(t, n, {
      capture: !0,
      passive: a
    }) : e.addEventListener(t, n, !0) : a !== void 0 ? e.addEventListener(t, n, {
      passive: a
    }) : e.addEventListener(t, n, !1);
  }
  function Of(e, t, n, l, a) {
    var i = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var s = l.tag;
        if (s === 3 || s === 4) {
          var h = l.stateNode.containerInfo;
          if (h === a) break;
          if (s === 4)
            for (s = l.return; s !== null; ) {
              var b = s.tag;
              if ((b === 3 || b === 4) && s.stateNode.containerInfo === a)
                return;
              s = s.return;
            }
          for (; h !== null; ) {
            if (s = vn(h), s === null) return;
            if (b = s.tag, b === 5 || b === 6 || b === 26 || b === 27) {
              l = i = s;
              continue e;
            }
            h = h.parentNode;
          }
        }
        l = l.return;
      }
    eh(function() {
      var R = i, M = wc(n), k = [];
      e: {
        var _ = Ch.get(e);
        if (_ !== void 0) {
          var D = Qr, X = e;
          switch (e) {
            case "keypress":
              if (Vr(n) === 0) break e;
            case "keydown":
            case "keyup":
              D = zb;
              break;
            case "focusin":
              X = "focus", D = kc;
              break;
            case "focusout":
              X = "blur", D = kc;
              break;
            case "beforeblur":
            case "afterblur":
              D = kc;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              D = lh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              D = bb;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              D = kb;
              break;
            case _h:
            case Ah:
            case Oh:
              D = Tb;
              break;
            case Rh:
              D = Hb;
              break;
            case "scroll":
            case "scrollend":
              D = vb;
              break;
            case "wheel":
              D = Gb;
              break;
            case "copy":
            case "cut":
            case "paste":
              D = _b;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              D = ih;
              break;
            case "submit":
              D = jb;
              break;
            case "toggle":
            case "beforetoggle":
              D = qb;
          }
          var F = (t & 4) !== 0, ge = !F && (e === "scroll" || e === "scrollend"), O = F ? _ !== null ? _ + "Capture" : null : _;
          F = [];
          for (var E = R, w; E !== null; ) {
            var U = E;
            if (w = U.stateNode, U = U.tag, U !== 5 && U !== 26 && U !== 27 || w === null || O === null || (U = _u(E, O), U != null && F.push(
              lr(E, U, w)
            )), ge) break;
            E = E.return;
          }
          0 < F.length && (_ = new D(
            _,
            X,
            null,
            n,
            M
          ), k.push({ event: _, listeners: F }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (D = e === "mouseover" || e === "pointerover", _ = e === "mouseout" || e === "pointerout", D && n !== Nc && (X = n.relatedTarget || n.fromElement) && (vn(X) || X[Un]))
            break e;
          (_ || D) && (X = M.window === M ? M : (D = M.ownerDocument) ? D.defaultView || D.parentWindow : window, _ ? (D = n.relatedTarget || n.toElement, _ = R, D = D ? vn(D) : null, D !== null && (ge = d(D), F = D.tag, D !== ge || F !== 5 && F !== 27 && F !== 6) && (D = null)) : (_ = null, D = R), _ !== D && (F = lh, U = "onMouseLeave", O = "onMouseEnter", E = "mouse", (e === "pointerout" || e === "pointerover") && (F = ih, U = "onPointerLeave", O = "onPointerEnter", E = "pointer"), ge = _ == null ? X : Fn(_), w = D == null ? X : Fn(D), X = new F(
            U,
            E + "leave",
            _,
            n,
            M
          ), X.target = ge, X.relatedTarget = w, U = null, vn(M) === R && (F = new F(
            O,
            E + "enter",
            D,
            n,
            M
          ), F.target = w, F.relatedTarget = ge, U = F), ge = U, F = _ && D ? se(
            _,
            D,
            J0
          ) : null, _ !== null && tg(
            k,
            X,
            _,
            F,
            !1
          ), D !== null && ge !== null && tg(
            k,
            ge,
            D,
            F,
            !0
          )));
        }
        e: {
          if (_ = R ? Fn(R) : window, D = _.nodeName && _.nodeName.toLowerCase(), D === "select" || D === "input" && _.type === "file")
            var $ = hh;
          else if (fh(_))
            if (mh)
              $ = Pb;
            else {
              $ = Ib;
              var Oe = $b;
            }
          else
            D = _.nodeName, !D || D.toLowerCase() !== "input" || _.type !== "checkbox" && _.type !== "radio" ? R && Cc(R.elementType) && ($ = hh) : $ = Fb;
          if ($ && ($ = $(e, R))) {
            dh(
              k,
              $,
              n,
              M
            );
            break e;
          }
          Oe && Oe(e, _, R);
        }
        switch (Oe = R ? Fn(R) : window, e) {
          case "focusin":
            (fh(Oe) || Oe.contentEditable === "true") && (vi = Oe, Vc = R, Du = null);
            break;
          case "focusout":
            Du = Vc = vi = null;
            break;
          case "mousedown":
            Xc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Xc = !1, Th(k, n, M);
            break;
          case "selectionchange":
            if (e0) break;
          case "keydown":
          case "keyup":
            Th(k, n, M);
        }
        var le;
        if (Hc)
          e: {
            switch (e) {
              case "compositionstart":
                var ce = "onCompositionStart";
                break e;
              case "compositionend":
                ce = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ce = "onCompositionUpdate";
                break e;
            }
            ce = void 0;
          }
        else
          gi ? ch(e, n) && (ce = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (ce = "onCompositionStart");
        ce && (uh && n.locale !== "ko" && (gi || ce !== "onCompositionStart" ? ce === "onCompositionEnd" && gi && (le = th()) : (ql = M, Mc = "value" in ql ? ql.value : ql.textContent, gi = !0)), Oe = Jo(R, ce), 0 < Oe.length && (ce = new ah(
          ce,
          e,
          null,
          n,
          M
        ), k.push({ event: ce, listeners: Oe }), le ? ce.data = le : (le = sh(n), le !== null && (ce.data = le)))), (le = Xb ? Qb(e, n) : Zb(e, n)) && (ce = Jo(R, "onBeforeInput"), 0 < ce.length && (Oe = new ah(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          M
        ), k.push({
          event: Oe,
          listeners: ce
        }), Oe.data = le)), X0(
          k,
          e,
          R,
          n,
          M
        );
      }
      Wp(k, t);
    });
  }
  function lr(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function Jo(e, t) {
    for (var n = t + "Capture", l = []; e !== null; ) {
      var a = e, i = a.stateNode;
      if (a = a.tag, a !== 5 && a !== 26 && a !== 27 || i === null || (a = _u(e, n), a != null && l.unshift(
        lr(e, a, i)
      ), a = _u(e, t), a != null && l.push(
        lr(e, a, i)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function J0(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function tg(e, t, n, l, a) {
    for (var i = t._reactName, s = []; n !== null && n !== l; ) {
      var h = n, b = h.alternate, R = h.stateNode;
      if (h = h.tag, b !== null && b === l) break;
      h !== 5 && h !== 26 && h !== 27 || R === null || (b = R, a ? (R = _u(n, i), R != null && s.unshift(
        lr(n, R, b)
      )) : a || (R = _u(n, i), R != null && s.push(
        lr(n, R, b)
      ))), n = n.return;
    }
    s.length !== 0 && e.push({ event: t, listeners: s });
  }
  var $0 = /\r\n?/g, I0 = /\u0000|\uFFFD/g;
  function ng(e) {
    return (typeof e == "string" ? e : "" + e).replace($0, `
`).replace(I0, "");
  }
  function lg(e, t) {
    return t = ng(t), ng(e) === t;
  }
  function qe(e, t, n, l, a, i) {
    switch (n) {
      case "children":
        if (typeof l == "string")
          t === "body" || t === "textarea" && l === "" || it(e, l);
        else if (typeof l == "number" || typeof l == "bigint")
          t !== "body" && it(e, "" + l);
        else return;
        break;
      case "className":
        za(e, "class", l);
        break;
      case "tabIndex":
        za(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        za(e, n, l);
        break;
      case "style":
        Pd(e, l, i);
        return;
      case "data":
        if (t !== "object") {
          za(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (t !== "a" || n !== "href")) {
          e.removeAttribute(n);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(n);
          break;
        }
        l = Yr(l), e.setAttribute(n, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          e.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof i == "function" && (n === "formAction" ? (t !== "input" && qe(e, t, "name", a.name, a, null), qe(
            e,
            t,
            "formEncType",
            a.formEncType,
            a,
            null
          ), qe(
            e,
            t,
            "formMethod",
            a.formMethod,
            a,
            null
          ), qe(
            e,
            t,
            "formTarget",
            a.formTarget,
            a,
            null
          )) : (qe(e, t, "encType", a.encType, a, null), qe(e, t, "method", a.method, a, null), qe(e, t, "target", a.target, a, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(n);
          break;
        }
        l = Yr(l), e.setAttribute(n, l);
        break;
      case "onClick":
        l != null && (e.onclick = Pn);
        return;
      case "onScroll":
        l != null && xe("scroll", e);
        return;
      case "onScrollEnd":
        l != null && xe("scrollend", e);
        return;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(c(61));
          if (n = l.__html, n != null) {
            if (a.children != null) throw Error(c(60));
            i?.__html !== n && (e.innerHTML = n);
          }
        }
        break;
      case "multiple":
        e.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        e.muted = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        n = Yr(l), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          n
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(n, l) : e.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "credentialless":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        l && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
        break;
      case "capture":
      case "download":
        l === !0 ? e.setAttribute(n, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(n, l) : e.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? e.setAttribute(n, l) : e.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? e.removeAttribute(n) : e.setAttribute(n, l);
        break;
      case "popover":
        xe("beforetoggle", e), xe("toggle", e), di(e, "popover", l);
        break;
      case "xlinkActuate":
        Kt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        Kt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        Kt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        Kt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        Kt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        Kt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        Kt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        Kt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        Kt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        di(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N")
          n = pb.get(n) || n, di(e, n, l);
        else return;
    }
    Ce = !0;
  }
  function Rf(e, t, n, l, a, i) {
    switch (n) {
      case "style":
        Pd(e, l, i);
        return;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(c(61));
          if (n = l.__html, n != null) {
            if (a.children != null) throw Error(c(60));
            i?.__html !== n && (e.innerHTML = n);
          }
        }
        break;
      case "children":
        if (typeof l == "string") it(e, l);
        else if (typeof l == "number" || typeof l == "bigint")
          it(e, "" + l);
        else return;
        break;
      case "onScroll":
        l != null && xe("scroll", e);
        return;
      case "onScrollEnd":
        l != null && xe("scrollend", e);
        return;
      case "onClick":
        l != null && (e.onclick = Pn);
        return;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        return;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!wa.hasOwnProperty(n))
          e: {
            if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), i = n.slice(2, a ? n.length - 7 : void 0), t = e[Rt] || null, t = t != null ? t[n] : null, typeof t == "function" && e.removeEventListener(i, t, a), typeof l == "function")) {
              typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(i, l, a);
              break e;
            }
            Ce = !0, n in e ? e[n] = l : l === !0 ? e.setAttribute(n, "") : di(e, n, l);
          }
        return;
    }
    Ce = !0;
  }
  function jt(e, t, n) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        xe("error", e), xe("load", e);
        var l = !1, a = !1, i;
        for (i in n)
          if (n.hasOwnProperty(i)) {
            var s = n[i];
            if (s != null)
              switch (i) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  a = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(c(137, t));
                default:
                  qe(e, t, i, s, n, null);
              }
          }
        a && qe(e, t, "srcSet", n.srcSet, n, null), l && qe(e, t, "src", n.src, n, null);
        return;
      case "input":
        xe("invalid", e);
        var h = i = s = a = null, b = null, R = null;
        for (l in n)
          if (n.hasOwnProperty(l)) {
            var M = n[l];
            if (M != null)
              switch (l) {
                case "name":
                  a = M;
                  break;
                case "type":
                  s = M;
                  break;
                case "checked":
                  b = M;
                  break;
                case "defaultChecked":
                  R = M;
                  break;
                case "value":
                  i = M;
                  break;
                case "defaultValue":
                  h = M;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (M != null)
                    throw Error(c(137, t));
                  break;
                default:
                  qe(e, t, l, M, n, null);
              }
          }
        Be(
          e,
          i,
          h,
          b,
          R,
          s,
          a,
          !1
        );
        return;
      case "select":
        xe("invalid", e), l = s = i = null;
        for (a in n)
          if (n.hasOwnProperty(a) && (h = n[a], h != null))
            switch (a) {
              case "value":
                i = h;
                break;
              case "defaultValue":
                s = h;
                break;
              case "multiple":
                l = h;
              default:
                qe(e, t, a, h, n, null);
            }
        t = i, n = s, e.multiple = !!l, t != null ? st(e, !!l, t, !1) : n != null && st(e, !!l, n, !0);
        return;
      case "textarea":
        xe("invalid", e), i = a = l = null;
        for (s in n)
          if (n.hasOwnProperty(s) && (h = n[s], h != null))
            switch (s) {
              case "value":
                l = h;
                break;
              case "defaultValue":
                a = h;
                break;
              case "children":
                i = h;
                break;
              case "dangerouslySetInnerHTML":
                if (h != null) throw Error(c(91));
                break;
              default:
                qe(e, t, s, h, n, null);
            }
        hi(e, l, a, i);
        return;
      case "option":
        for (b in n)
          if (n.hasOwnProperty(b) && (l = n[b], l != null))
            switch (b) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                qe(e, t, b, l, n, null);
            }
        return;
      case "dialog":
        xe("beforetoggle", e), xe("toggle", e), xe("cancel", e), xe("close", e);
        break;
      case "iframe":
      case "object":
        xe("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < nr.length; l++)
          xe(nr[l], e);
        break;
      case "image":
        xe("error", e), xe("load", e);
        break;
      case "details":
        xe("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        xe("error", e), xe("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (R in n)
          if (n.hasOwnProperty(R) && (l = n[R], l != null))
            switch (R) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(c(137, t));
              default:
                qe(e, t, R, l, n, null);
            }
        return;
      default:
        if (Cc(t)) {
          for (M in n)
            n.hasOwnProperty(M) && (l = n[M], l !== void 0 && Rf(
              e,
              t,
              M,
              l,
              n,
              void 0
            ));
          return;
        }
    }
    for (h in n)
      n.hasOwnProperty(h) && (l = n[h], l != null && qe(e, t, h, l, n, null));
  }
  var F0 = {};
  function P0(e, t, n, l) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var a = null, i = null, s = null, h = null, b = null, R = null, M = null;
        for (D in n) {
          var k = n[D];
          if (n.hasOwnProperty(D) && k != null)
            switch (D) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                b = k;
              default:
                l.hasOwnProperty(D) || qe(e, t, D, null, l, k);
            }
        }
        for (var _ in l) {
          var D = l[_];
          if (k = n[_], l.hasOwnProperty(_) && (D != null || k != null))
            switch (_) {
              case "type":
                D !== k && (Ce = !0), i = D;
                break;
              case "name":
                D !== k && (Ce = !0), a = D;
                break;
              case "checked":
                D !== k && (Ce = !0), R = D;
                break;
              case "defaultChecked":
                D !== k && (Ce = !0), M = D;
                break;
              case "value":
                D !== k && (Ce = !0), s = D;
                break;
              case "defaultValue":
                D !== k && (Ce = !0), h = D;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (D != null)
                  throw Error(c(137, t));
                break;
              default:
                D !== k && qe(
                  e,
                  t,
                  _,
                  D,
                  l,
                  k
                );
            }
        }
        oe(
          e,
          s,
          h,
          b,
          R,
          M,
          i,
          a
        );
        return;
      case "select":
        D = s = h = _ = null;
        for (i in n)
          if (b = n[i], n.hasOwnProperty(i) && b != null)
            switch (i) {
              case "value":
                break;
              case "multiple":
                D = b;
              default:
                l.hasOwnProperty(i) || qe(
                  e,
                  t,
                  i,
                  null,
                  l,
                  b
                );
            }
        for (a in l)
          if (i = l[a], b = n[a], l.hasOwnProperty(a) && (i != null || b != null))
            switch (a) {
              case "value":
                i !== b && (Ce = !0), _ = i;
                break;
              case "defaultValue":
                i !== b && (Ce = !0), h = i;
                break;
              case "multiple":
                i !== b && (Ce = !0), s = i;
              default:
                i !== b && qe(
                  e,
                  t,
                  a,
                  i,
                  l,
                  b
                );
            }
        t = h, n = s, l = D, _ != null ? st(e, !!n, _, !1) : !!l != !!n && (t != null ? st(e, !!n, t, !0) : st(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        D = _ = null;
        for (h in n)
          if (a = n[h], n.hasOwnProperty(h) && a != null && !l.hasOwnProperty(h))
            switch (h) {
              case "value":
                break;
              case "children":
                break;
              default:
                qe(e, t, h, null, l, a);
            }
        for (s in l)
          if (a = l[s], i = n[s], l.hasOwnProperty(s) && (a != null || i != null))
            switch (s) {
              case "value":
                a !== i && (Ce = !0), _ = a;
                break;
              case "defaultValue":
                a !== i && (Ce = !0), D = a;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (a != null) throw Error(c(91));
                break;
              default:
                a !== i && qe(e, t, s, a, l, i);
            }
        Nt(e, _, D);
        return;
      case "option":
        for (var X in n)
          if (_ = n[X], n.hasOwnProperty(X) && _ != null && !l.hasOwnProperty(X))
            switch (X) {
              case "selected":
                e.selected = !1;
                break;
              default:
                qe(
                  e,
                  t,
                  X,
                  null,
                  l,
                  _
                );
            }
        for (b in l)
          if (_ = l[b], D = n[b], l.hasOwnProperty(b) && _ !== D && (_ != null || D != null))
            switch (b) {
              case "selected":
                _ !== D && (Ce = !0), e.selected = _ && typeof _ != "function" && typeof _ != "symbol";
                break;
              default:
                qe(
                  e,
                  t,
                  b,
                  _,
                  l,
                  D
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var F in n)
          _ = n[F], n.hasOwnProperty(F) && _ != null && !l.hasOwnProperty(F) && qe(e, t, F, null, l, _);
        for (R in l)
          if (_ = l[R], D = n[R], l.hasOwnProperty(R) && _ !== D && (_ != null || D != null))
            switch (R) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (_ != null)
                  throw Error(c(137, t));
                break;
              default:
                qe(
                  e,
                  t,
                  R,
                  _,
                  l,
                  D
                );
            }
        return;
      default:
        if (Cc(t)) {
          for (var ge in n)
            _ = n[ge], n.hasOwnProperty(ge) && _ !== void 0 && !l.hasOwnProperty(ge) && Rf(
              e,
              t,
              ge,
              void 0,
              l,
              _
            );
          for (M in l)
            _ = l[M], D = n[M], !l.hasOwnProperty(M) || _ === D || _ === void 0 && D === void 0 || Rf(
              e,
              t,
              M,
              _,
              l,
              D
            );
          return;
        }
    }
    for (var O in n)
      _ = n[O], n.hasOwnProperty(O) && _ != null && !l.hasOwnProperty(O) && qe(e, t, O, null, l, _);
    for (k in l)
      _ = l[k], D = n[k], !l.hasOwnProperty(k) || _ === D || _ == null && D == null || qe(e, t, k, _, l, D);
  }
  function ag(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function W0() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), l = 0; l < n.length; l++) {
        var a = n[l], i = a.transferSize, s = a.initiatorType, h = a.duration;
        if (i && h && ag(s)) {
          for (s = 0, h = a.responseEnd, l += 1; l < n.length; l++) {
            var b = n[l], R = b.startTime;
            if (R > h) break;
            var M = b.transferSize, k = b.initiatorType;
            M && ag(k) && (b = b.responseEnd, s += M * (b < h ? 1 : (h - R) / (b - R)));
          }
          if (--l, t += 8 * (i + s) / (a.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Cf = null, Nf = null;
  function ar(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function ig(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function ug(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function rg(e, t, n, l) {
    return n = ar(
      n
    ).createElement(e), n[Je] = l, n[Rt] = t, jt(n, e, t), nt(n), n;
  }
  function wf(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var zf = null;
  function eS() {
    var e = window.event;
    return e && e.type === "popstate" ? e === zf ? !1 : (zf = e, !0) : (zf = null, !1);
  }
  var Df = typeof setTimeout == "function" ? setTimeout : void 0, tS = typeof clearTimeout == "function" ? clearTimeout : void 0, og = typeof Promise == "function" ? Promise : void 0, cg = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Df, nS = typeof queueMicrotask == "function" ? queueMicrotask : typeof og < "u" ? function(e) {
    return og.resolve(null).then(e).catch(lS);
  } : Df;
  function lS(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function oa(e) {
    return e === "head";
  }
  function sg(e, t) {
    var n = t, l = 0;
    do {
      var a = n.nextSibling;
      if (e.removeChild(n), a && a.nodeType === 8)
        if (n = a.data, n === "/$" || n === "/&") {
          if (l === 0) {
            e.removeChild(a), Ii(t);
            return;
          }
          l--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          l++;
        else if (n === "html")
          Gf(
            e.ownerDocument.documentElement
          );
        else if (n === "head") {
          n = e.ownerDocument.head, Gf(n);
          for (var i = n.firstChild; i; ) {
            var s = i.nextSibling, h = i.nodeName;
            i[Ra] || h === "SCRIPT" || h === "STYLE" || h === "LINK" && i.rel.toLowerCase() === "stylesheet" || n.removeChild(i), i = s;
          }
        } else
          n === "body" && Gf(e.ownerDocument.body);
      n = a;
    } while (n);
    Ii(t);
  }
  function fg(e, t) {
    var n = e;
    e = 0;
    do {
      var l = n.nextSibling;
      if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), l && l.nodeType === 8)
        if (n = l.data, n === "/$") {
          if (e === 0) break;
          e--;
        } else
          n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
      n = l;
    } while (n);
  }
  function dg(e, t, n) {
    if (t = CSS.escape(t) !== t ? "r-" + btoa(t).replace(/=/g, "") : t, e.style.viewTransitionName = t, n != null && (e.style.viewTransitionClass = n), n = getComputedStyle(e), n.display === "inline") {
      if (t = e.getClientRects(), t.length === 1) var l = 1;
      else
        for (var a = l = 0; a < t.length; a++) {
          var i = t[a];
          0 < i.width && 0 < i.height && l++;
        }
      l === 1 && (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + n.paddingTop, e.marginBottom = "-" + n.paddingBottom);
    }
  }
  function hg(e, t) {
    e = e.style, t = t.style;
    var n = t != null ? t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null : null;
    e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t != null ? t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n != null ? e.margin = n : (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t)));
  }
  function aS(e, t, n) {
    return n = n.ownerDocument.defaultView, {
      rect: e,
      abs: t.position === "absolute" || t.position === "fixed",
      clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
      view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth
    };
  }
  function Mf(e) {
    var t = e.getBoundingClientRect(), n = getComputedStyle(e);
    return aS(t, n, e);
  }
  function iS(e) {
    return e.documentElement.clientHeight;
  }
  function uS(e) {
    this.addEventListener("load", e), this.addEventListener("error", e);
  }
  function rS(e, t, n, l, a, i, s, h, b) {
    var R = t.nodeType === 9 ? t : t.ownerDocument;
    try {
      var M = R.startViewTransition({
        update: function() {
          var _ = R.defaultView, D = _.navigation && _.navigation.transition, X = R.fonts.status;
          l();
          var F = [];
          if (X === "loaded" && (iS(R), R.fonts.status === "loading" && F.push(R.fonts.ready)), X = F.length, e !== null)
            for (var ge = e.suspenseyImages, O = 0, E = 0; E < ge.length; E++) {
              var w = ge[E];
              if (!w.complete) {
                var U = w.getBoundingClientRect();
                if (0 < U.bottom && 0 < U.right && U.top < _.innerHeight && U.left < _.innerWidth) {
                  if (O += jg(w), O > Fo) {
                    F.length = X;
                    break;
                  }
                  w = new Promise(
                    uS.bind(w)
                  ), F.push(w);
                }
              }
            }
          if (0 < F.length)
            return _ = Promise.race([
              Promise.all(F),
              new Promise(function($) {
                return setTimeout($, 500);
              })
            ]).then(a, a), (D ? Promise.allSettled([D.finished, _]) : _).then(i, i);
          if (a(), D)
            return D.finished.then(
              i,
              i
            );
          i();
        },
        types: n
      });
      R.__reactViewTransition = M;
      var k = [];
      return M.ready.then(
        function() {
          for (var _ = R.documentElement.getAnimations({
            subtree: !0
          }), D = 0; D < _.length; D++) {
            var X = _[D], F = X.effect, ge = F.pseudoElement;
            if (ge != null && ge.startsWith("::view-transition")) {
              k.push(X), X = F.getKeyframes();
              for (var O = ge = void 0, E = !0, w = 0; w < X.length; w++) {
                var U = X[w], $ = U.width;
                if (ge === void 0) ge = $;
                else if (ge !== $) {
                  E = !1;
                  break;
                }
                if ($ = U.height, O === void 0) O = $;
                else if (O !== $) {
                  E = !1;
                  break;
                }
                delete U.width, delete U.height, U.transform === "none" && delete U.transform;
              }
              E && ge !== void 0 && O !== void 0 && (F.setKeyframes(X), E = getComputedStyle(
                F.target,
                F.pseudoElement
              ), E.width !== ge || E.height !== O) && (E = X[0], E.width = ge, E.height = O, E = X[X.length - 1], E.width = ge, E.height = O, F.setKeyframes(X));
            }
          }
          s();
        },
        function(_) {
          R.__reactViewTransition === M && (R.__reactViewTransition = null);
          try {
            if (typeof _ == "object" && _ !== null)
              switch (_.name) {
                case "InvalidStateError":
                  (_.message === "View transition was skipped because document visibility state is hidden." || _.message === "Skipping view transition because document visibility state has become hidden." || _.message === "Skipping view transition because viewport size changed." || _.message === "Transition was aborted because of invalid state") && (_ = null);
              }
            _ !== null && b(_);
          } finally {
            l(), a(), s();
          }
        }
      ), M.finished.finally(function() {
        for (var _ = 0; _ < k.length; _++)
          k[_].cancel();
        R.__reactViewTransition === M && (R.__reactViewTransition = null), h();
      }), M;
    } catch {
      return l(), a(), s(), null;
    }
  }
  function Fa(e, t) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
  }
  Fa.prototype.animate = function(e, t) {
    return t = typeof t == "number" ? { duration: t } : ee({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
  }, Fa.prototype.getAnimations = function() {
    for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), l = [], a = 0; a < n.length; a++) {
      var i = n[a].effect;
      i !== null && i.target === e && i.pseudoElement === t && l.push(n[a]);
    }
    return l;
  }, Fa.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function mg(e) {
    return {
      name: e,
      group: new Fa("group", e),
      imagePair: new Fa("image-pair", e),
      old: new Fa("old", e),
      new: new Fa("new", e)
    };
  }
  function fn(e) {
    this._fragmentFiber = e, this._observers = this._eventListeners = null;
  }
  fn.prototype.addEventListener = function(e, t, n) {
    var l = null, a = null;
    if (!(n != null && typeof n != "boolean" && (l = n.signal || null, l !== null && l.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var i = this._eventListeners;
      if (gg(i, e, t, n) === -1) {
        var s = this, h = t;
        n != null && typeof n != "boolean" && n.once === !0 && (h = function(b) {
          s.removeEventListener(
            e,
            t,
            n
          ), typeof t == "function" ? t.call(this, b) : t.handleEvent(b);
        }), l !== null && (a = s.removeEventListener.bind(
          s,
          e,
          t,
          n
        ), l.addEventListener("abort", a, { once: !0 }), a = l.removeEventListener.bind(l, "abort", a)), l = Xi(n), i.push({
          type: e,
          listener: t,
          optionsOrUseCapture: n,
          attachedListener: h,
          cleanup: a
        }), v(
          this._fragmentFiber.child,
          !1,
          oS,
          e,
          h,
          l
        );
      }
      this._eventListeners = i;
    }
  };
  function oS(e, t, n, l) {
    return j(e).addEventListener(
      t,
      n,
      l
    ), !1;
  }
  fn.prototype.removeEventListener = function(e, t, n) {
    var l = this._eventListeners;
    if (l !== null && (t = gg(
      l,
      e,
      t,
      n
    ), t !== -1)) {
      var a = l[t];
      n = a.attachedListener;
      var i = a.cleanup;
      a = Xi(a.optionsOrUseCapture), v(
        this._fragmentFiber.child,
        !1,
        cS,
        e,
        n,
        a
      ), l.splice(t, 1), i !== null && i();
    }
  };
  function cS(e, t, n, l) {
    return j(e).removeEventListener(
      t,
      n,
      l
    ), !1;
  }
  function Xi(e) {
    return e != null && typeof e != "boolean" && (e.once === !0 || e.signal instanceof AbortSignal) ? { capture: e.capture, passive: e.passive } : e;
  }
  function pg(e) {
    return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
  }
  function gg(e, t, n, l) {
    if (e.length === 0) return -1;
    l = pg(l);
    for (var a = 0; a < e.length; a++) {
      var i = e[a];
      if (i.type === t && i.listener === n && pg(i.optionsOrUseCapture) === l)
        return a;
    }
    return -1;
  }
  fn.prototype.dispatchEvent = function(e) {
    var t = N(
      this._fragmentFiber
    );
    if (t === null) return !0;
    t = j(t);
    var n = this._eventListeners;
    if (n !== null && 0 < n.length || !e.bubbles) {
      var l = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
      if (n)
        for (var a = 0; a < n.length; a++) {
          var i = n[a];
          l.addEventListener(
            i.type,
            i.attachedListener,
            Xi(i.optionsOrUseCapture)
          );
        }
      if (t.appendChild(l), e = l.dispatchEvent(e), n)
        for (a = 0; a < n.length; a++)
          i = n[a], l.removeEventListener(
            i.type,
            i.attachedListener,
            Xi(i.optionsOrUseCapture)
          );
      return t.removeChild(l), e;
    }
    return t.dispatchEvent(e);
  }, fn.prototype.focus = function(e) {
    v(
      this._fragmentFiber.child,
      !0,
      vg,
      e,
      void 0,
      void 0
    );
  };
  function vg(e, t) {
    return e.tag === 6 ? !1 : (e = j(e), ES(e, t));
  }
  fn.prototype.focusLast = function(e) {
    var t = [];
    v(
      this._fragmentFiber.child,
      !0,
      jf,
      t,
      void 0,
      void 0
    );
    for (var n = t.length - 1; 0 <= n && !vg(t[n], e); n--) ;
  };
  function jf(e, t) {
    return t.push(e), !1;
  }
  fn.prototype.blur = function() {
    var e = N(
      this._fragmentFiber
    );
    e !== null && (e = j(e), e = ar(e).activeElement, e !== null && v(
      this._fragmentFiber.child,
      !1,
      sS,
      e,
      void 0,
      void 0
    ));
  };
  function sS(e, t) {
    return e.tag === 6 ? !1 : (e = j(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
  }
  fn.prototype.observeUsing = function(e) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), v(
      this._fragmentFiber.child,
      !1,
      fS,
      e,
      void 0,
      void 0
    );
  };
  function fS(e, t) {
    return e.tag === 6 || (e = j(e), t.observe(e)), !1;
  }
  fn.prototype.unobserveUsing = function(e) {
    var t = this._observers;
    if (t !== null && t.has(e)) {
      t.delete(e), v(
        this._fragmentFiber.child,
        !1,
        dS,
        e,
        void 0,
        void 0
      );
      for (var n = t = 0; n < Yn.length; n++) {
        var l = Yn[n];
        l.fragmentInstance === this && l.observer === e ? e.unobserve(l.instance) : Yn[t++] = l;
      }
      Yn.length = t;
    }
  };
  function dS(e, t) {
    return e.tag === 6 || (e = j(e), t.unobserve(e)), !1;
  }
  var Yn = [], Uf = !1;
  function hS(e, t, n) {
    Yn.push({
      fragmentInstance: e,
      observer: t,
      instance: n
    }), Uf || (Uf = !0, TS(function() {
      Uf = !1;
      var l = Yn;
      Yn = [];
      for (var a = 0; a < l.length; a++) {
        var i = l[a];
        i.observer.unobserve(i.instance);
      }
    }));
  }
  fn.prototype.getClientRects = function() {
    var e = [];
    return v(
      this._fragmentFiber.child,
      !1,
      mS,
      e,
      void 0,
      void 0
    ), e;
  };
  function mS(e, t) {
    if (e.tag === 6) {
      e = e.stateNode;
      var n = e.ownerDocument.createRange();
      n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
    } else
      e = j(e), t.push.apply(t, e.getClientRects());
    return !1;
  }
  fn.prototype.getRootNode = function(e) {
    var t = N(
      this._fragmentFiber
    );
    return t === null ? this : j(t).getRootNode(e);
  }, fn.prototype.compareDocumentPosition = function(e) {
    var t = N(
      this._fragmentFiber
    );
    if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var n = [];
    v(
      this._fragmentFiber.child,
      !1,
      jf,
      n,
      void 0,
      void 0
    );
    var l = j(t);
    if (n.length === 0) {
      if (n = l, q(this._fragmentFiber)) {
        e: {
          for (t = this._fragmentFiber.return; t !== null; ) {
            if (t.tag === 4) {
              t = t.stateNode.containerInfo;
              break e;
            }
            if (t.tag === 3 || t.tag === 5 || t.tag === 27)
              break;
            t = t.return;
          }
          t = null;
        }
        t != null && (n = t);
      }
      t = this._fragmentFiber;
      var a = l = n.compareDocumentPosition(e);
      return n === e ? a = Node.DOCUMENT_POSITION_CONTAINS : l & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = H(t)[1], n === null ? a = Node.DOCUMENT_POSITION_PRECEDING : (e = j(n).compareDocumentPosition(
        e
      ), a = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), a |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    t = j(n[0]), a = j(n[n.length - 1]);
    var i = q(this._fragmentFiber) ? t.parentElement : l;
    if (i == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    l = i.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, i = i.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var s = t.compareDocumentPosition(e), h = a.compareDocumentPosition(e), b = s & Node.DOCUMENT_POSITION_CONTAINED_BY || h & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return h = l && i && s & Node.DOCUMENT_POSITION_FOLLOWING && h & Node.DOCUMENT_POSITION_PRECEDING, t = l && t === e || i && a === e || b || h ? Node.DOCUMENT_POSITION_CONTAINED_BY : !l && t === e || !i && a === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : s, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || pS(
      t,
      this._fragmentFiber,
      n[0],
      n[n.length - 1],
      e
    ) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function pS(e, t, n, l, a) {
    var i = vn(a);
    if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (n = !!i)
        e: {
          for (; i !== null; ) {
            if (i.tag === 7 && (i === t || i.alternate === t)) {
              n = !0;
              break e;
            }
            i = i.return;
          }
          n = !1;
        }
      return n;
    }
    if (e & Node.DOCUMENT_POSITION_CONTAINS) {
      if (i === null)
        return i = a.ownerDocument, a === i || a === i.documentElement || a === i.body;
      e: {
        for (i = t, t = N(t); i !== null; ) {
          if (!(i.tag !== 5 && i.tag !== 3 && i.tag !== 27 || i !== t && i.alternate !== t)) {
            i = !0;
            break e;
          }
          i = i.return;
        }
        i = !1;
      }
      return i;
    }
    return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!i) && !(t = i === n) && (t = se(
      n,
      i,
      W
    ), t === null ? t = !1 : (v(
      t,
      !0,
      ae,
      i,
      n
    ), i = Q, Q = null, t = i !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!i) && !(t = i === l) && (t = se(
      l,
      i,
      W
    ), t === null ? t = !1 : (v(
      t,
      !0,
      ie,
      i,
      l
    ), i = Q, Z = Q = null, t = i !== null)), t) : !1;
  }
  function yg(e, t) {
    var n = e.ownerDocument.createRange();
    n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(
      window.scrollX + e.left,
      t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight
    );
  }
  fn.prototype.scrollIntoView = function(e) {
    if (typeof e == "object") throw Error(c(566));
    var t = [];
    v(
      this._fragmentFiber.child,
      !1,
      jf,
      t,
      void 0,
      void 0
    );
    var n = e !== !1;
    if (t.length === 0) {
      var l = H(
        this._fragmentFiber
      );
      if (l = n ? l[1] || l[0] || N(this._fragmentFiber) : l[0] || l[1], l === null) return;
      if (l.tag === 6) {
        e = j(l), yg(e, n);
        return;
      }
      if (l = j(l), l.nodeType !== 9) {
        if (l.nodeType === 11) {
          n = "host" in l ? l.host : null, n !== null && n.scrollIntoView(e);
          return;
        }
        l.scrollIntoView(e);
      }
    }
    for (l = n ? t.length - 1 : 0; l !== (n ? -1 : t.length); ) {
      var a = t[l];
      a.tag === 6 ? (a = j(a), yg(a, n)) : j(a).scrollIntoView(e), l += n ? -1 : 1;
    }
  };
  function gS(e, t) {
    return e = j(e), bg(e, t), !1;
  }
  function bg(e, t) {
    e.reactFragments == null && (e.reactFragments = /* @__PURE__ */ new Set()), e.reactFragments.add(t);
  }
  function Sg(e, t) {
    var n = t._eventListeners;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var a = n[l];
        e.addEventListener(
          a.type,
          a.attachedListener,
          Xi(a.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(i) {
      for (var s = 0, h = 0; h < Yn.length; h++) {
        var b = Yn[h];
        (b.fragmentInstance !== t || b.observer !== i || b.instance !== e) && (Yn[s++] = b);
      }
      Yn.length = s, i.observe(e);
    }), bg(e, t));
  }
  function vS(e, t) {
    var n = t._eventListeners;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var a = n[l];
        e.removeEventListener(
          a.type,
          a.attachedListener,
          Xi(a.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(i) {
      typeof i.rootMargin == "string" ? hS(
        t,
        i,
        e
      ) : i.unobserve(e);
    }), e.reactFragments != null && e.reactFragments.delete(t));
  }
  function kf(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (t = t.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          kf(n), Na(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(n);
    }
  }
  function yS(e, t, n, l) {
    for (; e.nodeType === 1; ) {
      var a = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[Ra])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (i = e.getAttribute("rel"), i === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (i !== a.rel || e.getAttribute("href") !== (a.href == null || a.href === "" ? null : a.href) || e.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin) || e.getAttribute("title") !== (a.title == null ? null : a.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (i = e.getAttribute("src"), (i !== (a.src == null ? null : a.src) || e.getAttribute("type") !== (a.type == null ? null : a.type) || e.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin)) && i && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var i = a.name == null ? null : "" + a.name;
        if (a.type === "hidden" && e.getAttribute("name") === i)
          return e;
      } else return e;
      if (e = _n(e.nextSibling), e === null) break;
    }
    return null;
  }
  function bS(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = _n(e.nextSibling), e === null)) return null;
    return e;
  }
  function Eg(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = _n(e.nextSibling), e === null)) return null;
    return e;
  }
  function Lf(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Hf(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function SS(e, t) {
    var n = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || n.readyState !== "loading")
      t();
    else {
      var l = function() {
        t(), n.removeEventListener("DOMContentLoaded", l);
      };
      n.addEventListener("DOMContentLoaded", l), e._reactRetry = l;
    }
  }
  function _n(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var Bf = null;
  function Tg(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0)
            return _n(e.nextSibling);
          t--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function xg(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (t === 0) return e;
          t--;
        } else n !== "/$" && n !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function ES(e, t) {
    function n() {
      l = !0;
    }
    if (e.ownerDocument.activeElement === e) return !0;
    var l = !1;
    try {
      e.ownerDocument.addEventListener("focus", n, !0), (e.focus || HTMLElement.prototype.focus).call(e, t);
    } finally {
      e.ownerDocument.removeEventListener("focus", n, !0);
    }
    return l;
  }
  function TS(e) {
    cg(function() {
      cg(function(t) {
        return e(t);
      });
    });
  }
  function _g(e, t, n) {
    switch (t = ar(n), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(c(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(c(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(c(454));
        return e;
      default:
        throw Error(c(451));
    }
  }
  function Ag(e, t, n) {
    for (var l in n) {
      var a = n[l];
      n.hasOwnProperty(l) && a != null && qe(e, t, l, null, F0, a);
    }
    n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === Pn && (e.onclick = null), Na(e);
  }
  function Gf(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Na(e);
  }
  var An = /* @__PURE__ */ new Map(), Og = /* @__PURE__ */ new Set();
  function ir(e) {
    if (typeof e.getRootNode == "function") {
      var t = e.getRootNode();
      if (t.nodeType === 9 || t.nodeType === 11) return t;
    }
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Rl = fe.d;
  fe.d = {
    f: xS,
    r: _S,
    D: AS,
    C: OS,
    L: RS,
    m: CS,
    X: wS,
    S: NS,
    M: zS
  };
  function xS() {
    var e = Rl.f(), t = qo();
    return e || t;
  }
  function _S(e) {
    var t = In(e);
    t !== null && t.tag === 5 && t.type === "form" ? Cm(t) : Rl.r(e);
  }
  var Qi = typeof document > "u" ? null : document;
  function Rg(e, t, n) {
    var l = Qi;
    if (l && typeof t == "string" && t) {
      var a = J(t);
      a = 'link[rel="' + e + '"][href="' + a + '"]', typeof n == "string" && (a += '[crossorigin="' + n + '"]'), Og.has(a) || (Og.add(a), e = { rel: e, crossOrigin: n, href: t }, l.querySelector(a) === null && (t = l.createElement("link"), jt(t, "link", e), nt(t), l.head.appendChild(t)));
    }
  }
  function AS(e) {
    Rl.D(e), Rg("dns-prefetch", e, null);
  }
  function OS(e, t) {
    Rl.C(e, t), Rg("preconnect", e, t);
  }
  function RS(e, t, n) {
    Rl.L(e, t, n);
    var l = Qi;
    if (l && e && t) {
      var a = 'link[rel="preload"][as="' + J(t) + '"]';
      t === "image" && n && n.imageSrcSet ? (a += '[imagesrcset="' + J(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (a += '[imagesizes="' + J(
        n.imageSizes
      ) + '"]')) : a += '[href="' + J(e) + '"]';
      var i = a;
      switch (t) {
        case "style":
          i = Zi(e);
          break;
        case "script":
          i = Ki(e);
      }
      if (!(An.has(i) || (e = ee(
        {
          rel: "preload",
          href: t === "image" && n && n.imageSrcSet ? void 0 : e,
          as: t
        },
        n
      ), An.set(i, e), l.querySelector(a) !== null || t === "style" && l.querySelector(ur(i)) || t === "script" && l.querySelector(rr(i))))) {
        var s = l.createElement("link");
        jt(s, "link", e), t === "style" && (s[Ca] = !0, s.onload = s.onerror = function() {
          ln(s);
        }), nt(s), l.head.appendChild(s);
      }
    }
  }
  function CS(e, t) {
    Rl.m(e, t);
    var n = Qi;
    if (n && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", a = 'link[rel="modulepreload"][as="' + J(l) + '"][href="' + J(e) + '"]', i = a;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          i = Ki(e);
      }
      if (!An.has(i) && (e = ee({ rel: "modulepreload", href: e }, t), An.set(i, e), n.querySelector(a) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(rr(i)))
              return;
        }
        l = n.createElement("link"), jt(l, "link", e), nt(l), n.head.appendChild(l);
      }
    }
  }
  function NS(e, t, n) {
    Rl.S(e, t, n);
    var l = Qi;
    if (l && e) {
      var a = nn(l).hoistableStyles, i = Zi(e);
      t = t || "default";
      var s = a.get(i);
      if (!s) {
        var h = { loading: 0, preload: null };
        if (s = l.querySelector(
          ur(i)
        ))
          h.loading = 5;
        else {
          e = ee(
            { rel: "stylesheet", href: e, "data-precedence": t },
            n
          ), (n = An.get(i)) && Yf(e, n);
          var b = s = l.createElement("link");
          nt(b), jt(b, "link", e), b._p = new Promise(function(R, M) {
            b.onload = R, b.onerror = M;
          }), b.addEventListener("load", function() {
            h.loading |= 1;
          }), b.addEventListener("error", function() {
            h.loading |= 2;
          }), h.loading |= 4, $o(s, t, l);
        }
        s = {
          type: "stylesheet",
          instance: s,
          count: 1,
          state: h
        }, a.set(i, s);
      }
    }
  }
  function wS(e, t) {
    Rl.X(e, t);
    var n = Qi;
    if (n && e) {
      var l = nn(n).hoistableScripts, a = Ki(e), i = l.get(a);
      i || (i = n.querySelector(rr(a)), i || (e = ee({ src: e, async: !0 }, t), (t = An.get(a)) && qf(e, t), i = n.createElement("script"), nt(i), jt(i, "link", e), n.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, l.set(a, i));
    }
  }
  function zS(e, t) {
    Rl.M(e, t);
    var n = Qi;
    if (n && e) {
      var l = nn(n).hoistableScripts, a = Ki(e), i = l.get(a);
      i || (i = n.querySelector(rr(a)), i || (e = ee({ src: e, async: !0, type: "module" }, t), (t = An.get(a)) && qf(e, t), i = n.createElement("script"), nt(i), jt(i, "link", e), n.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, l.set(a, i));
    }
  }
  function Cg(e, t, n, l) {
    var a = (a = Dn.current) ? ir(a) : null;
    if (!a) throw Error(c(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (n = Zi(n.href), t = nn(
          a
        ).hoistableStyles, l = t.get(n), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, t.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          e = Zi(n.href);
          var i = nn(
            a
          ).hoistableStyles, s = i.get(e);
          if (s || (a = a.ownerDocument || a, s = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, i.set(e, s), (i = a.querySelector(
            ur(e)
          )) ? i._p || (s.instance = i, s.state.loading = 5) : (i = An.get(e), i || (i = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, An.set(e, i)), DS(
            a,
            e,
            i,
            s.state
          ))), t && l === null)
            throw Error(c(528, ""));
          return s;
        }
        if (t && l !== null)
          throw Error(c(529, ""));
        return null;
      case "script":
        return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Ki(n), t = nn(
          a
        ).hoistableScripts, l = t.get(n), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, t.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(c(444, e));
    }
  }
  function Zi(e) {
    return 'href="' + J(e) + '"';
  }
  function ur(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Ng(e) {
    return ee({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function DS(e, t, n, l) {
    if (t = e.querySelector(
      'link[rel="preload"][as="style"][' + t + "]"
    )) {
      if (t[Ca] !== !0) {
        l.loading = 1;
        return;
      }
    } else
      t = e.createElement("link"), t[Ca] = !0, t.onload = t.onerror = ln.bind(null, t), jt(t, "link", n), nt(t), e.head.appendChild(t);
    l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    });
  }
  function Ki(e) {
    return '[src="' + J(e) + '"]';
  }
  function rr(e) {
    return "script[async]" + e;
  }
  function wg(e, t, n) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + J(n.href) + '"]'
          );
          if (l)
            return t.instance = l, nt(l), l;
          var a = ee({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), nt(l), jt(l, "style", a), $o(l, n.precedence, e), t.instance = l;
        case "stylesheet":
          a = Zi(n.href);
          var i = e.querySelector(
            ur(a)
          );
          if (i)
            return t.state.loading |= 4, t.instance = i, nt(i), i;
          l = Ng(n), (a = An.get(a)) && Yf(l, a), i = (e.ownerDocument || e).createElement("link"), nt(i);
          var s = i;
          return s._p = new Promise(function(h, b) {
            s.onload = h, s.onerror = b;
          }), jt(i, "link", l), t.state.loading |= 4, $o(i, n.precedence, e), t.instance = i;
        case "script":
          return i = Ki(n.src), (a = e.querySelector(
            rr(i)
          )) ? (t.instance = a, nt(a), a) : (l = n, (a = An.get(i)) && (l = ee({}, n), qf(l, a)), e = e.ownerDocument || e, a = e.createElement("script"), nt(a), jt(a, "link", l), e.head.appendChild(a), t.instance = a);
        case "void":
          return null;
        default:
          throw Error(c(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, $o(l, n.precedence, e));
    return t.instance;
  }
  function $o(e, t, n) {
    for (var l = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), a = l.length ? l[l.length - 1] : null, i = a, s = 0; s < l.length; s++) {
      var h = l[s];
      if (h.dataset.precedence === t) i = h;
      else if (i !== a) break;
    }
    i ? i.parentNode.insertBefore(e, i.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function Yf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function qf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Io = null;
  function zg(e, t, n) {
    if (Io === null) {
      var l = /* @__PURE__ */ new Map(), a = Io = /* @__PURE__ */ new Map();
      a.set(n, l);
    } else
      a = Io, l = a.get(n), l || (l = /* @__PURE__ */ new Map(), a.set(n, l));
    if (l.has(e)) return l;
    for (l.set(e, null), n = n.getElementsByTagName(e), a = 0; a < n.length; a++) {
      var i = n[a];
      if (!(i[Ra] || i[Je] || e === "link" && i.getAttribute("rel") === "stylesheet") && i.namespaceURI !== "http://www.w3.org/2000/svg") {
        var s = i.getAttribute(t) || "";
        s = e + s;
        var h = l.get(s);
        h ? h.push(i) : l.set(s, [i]);
      }
    }
    return l;
  }
  function Vf(e, t, n) {
    e = e.ownerDocument || e, e.head.insertBefore(
      n,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function MS(e, t, n) {
    if (n === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        switch (t.rel) {
          case "stylesheet":
            return e = t.disabled, typeof t.precedence == "string" && e == null;
          default:
            return !0;
        }
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function Dg(e, t) {
    return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
  }
  function Mg(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function jg(e) {
    return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function Ug(e, t) {
    typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += jg(t), e.suspenseyImages.push(t)), e = kS.bind(e), t.decode().then(e, e));
  }
  function jS(e, t, n, l) {
    if (n.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var a = Zi(l.href), i = t.querySelector(
          ur(a)
        );
        if (i) {
          t = i._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = or.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = i, nt(i);
          return;
        }
        i = t.ownerDocument || t, l = Ng(l), (a = An.get(a)) && Yf(l, a), i = i.createElement("link"), nt(i);
        var s = i;
        s._p = new Promise(function(h, b) {
          s.onload = h, s.onerror = b;
        }), jt(i, "link", l), n.instance = i;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++, n = or.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
    }
  }
  var Fo = 0;
  function US(e, t) {
    return e.stylesheets && e.count === 0 && Wo(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
      var l = setTimeout(function() {
        if (e.stylesheets && Wo(e, e.stylesheets), e.unsuspend) {
          var i = e.unsuspend;
          e.unsuspend = null, i();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Fo === 0 && (Fo = 62500 * W0());
      var a = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Wo(e, e.stylesheets), e.unsuspend)) {
            var i = e.unsuspend;
            e.unsuspend = null, i();
          }
        },
        (e.imgBytes > Fo ? 50 : 800) + t
      );
      return e.unsuspend = n, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(a);
      };
    } : null;
  }
  function kg(e) {
    if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
      if (e.stylesheets) Wo(e, e.stylesheets);
      else if (e.unsuspend) {
        var t = e.unsuspend;
        e.unsuspend = null, t();
      }
    }
  }
  function or() {
    this.count--, kg(this);
  }
  function kS() {
    this.imgCount--, kg(this);
  }
  var Po = null;
  function Wo(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Po = /* @__PURE__ */ new Map(), t.forEach(LS, e), Po = null, or.call(e));
  }
  function LS(e, t) {
    if (!(t.state.loading & 4)) {
      var n = Po.get(e);
      if (n) var l = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), Po.set(e, n);
        for (var a = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), i = 0; i < a.length; i++) {
          var s = a[i];
          (s.nodeName === "LINK" || s.getAttribute("media") !== "not all") && (n.set(s.dataset.precedence, s), l = s);
        }
        l && n.set(null, l);
      }
      a = t.instance, s = a.getAttribute("data-precedence"), i = n.get(s) || l, i === l && n.set(null, a), n.set(s, a), this.count++, l = or.bind(this), a.addEventListener("load", l), a.addEventListener("error", l), i ? i.parentNode.insertBefore(a, i.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(a, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Ji = {
    $$typeof: Ke,
    Provider: null,
    Consumer: null,
    _currentValue: wn,
    _currentValue2: wn,
    _threadCount: 0
  };
  function HS(e, t, n, l, a, i, s, h, b) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Pe(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Pe(0), this.hiddenUpdates = Pe(null), this.identifierPrefix = l, this.onUncaughtError = a, this.onCaughtError = i, this.onRecoverableError = s, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = b, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Lg(e, t, n, l, a, i, s, h, b, R, M, k) {
    return e = new HS(
      e,
      t,
      n,
      s,
      b,
      R,
      M,
      k,
      h
    ), t = 1, i === !0 && (t |= 24), i = Jt(3, null, null, t), e.current = i, i.stateNode = e, t = ls(), t.refCount++, e.pooledCache = t, t.refCount++, i.memoizedState = {
      element: l,
      isDehydrated: n,
      cache: t
    }, rs(i), e;
  }
  function Hg(e) {
    return e ? (e = Si, e) : Si;
  }
  function Bg(e, t, n, l, a, i) {
    a = Hg(a), l.context === null ? l.context = a : l.pendingContext = a, l = Il(t), l.payload = { element: n }, i = i === void 0 ? null : i, i !== null && (l.callback = i), n = Fl(e, l, t), n !== null && (Pt(n, e, t), Bu(n, e, t));
  }
  function Gg(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Xf(e, t) {
    Gg(e, t), (e = e.alternate) && Gg(e, t);
  }
  function Yg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = ja(e, 67108864);
      t !== null && Pt(t, e, 67108864), Xf(e, 67108864);
    }
  }
  function qg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = sn();
      t = si(t);
      var n = ja(e, t);
      n !== null && Pt(n, e, t), Xf(e, t);
    }
  }
  var $i = !0;
  function BS(e, t, n, l) {
    var a = P.T;
    P.T = null;
    var i = fe.p;
    try {
      fe.p = 2, Qf(e, t, n, l);
    } finally {
      fe.p = i, P.T = a;
    }
  }
  function GS(e, t, n, l) {
    var a = P.T;
    P.T = null;
    var i = fe.p;
    try {
      fe.p = 8, Qf(e, t, n, l);
    } finally {
      fe.p = i, P.T = a;
    }
  }
  function Qf(e, t, n, l) {
    if ($i) {
      var a = Zf(l);
      if (a === null)
        Of(
          e,
          t,
          l,
          ec,
          n
        ), Xg(e, l);
      else if (qS(
        a,
        e,
        t,
        n,
        l
      ))
        l.stopPropagation();
      else if (Xg(e, l), t & 4 && -1 < YS.indexOf(e)) {
        for (; a !== null; ) {
          var i = In(a);
          if (i !== null)
            switch (i.tag) {
              case 3:
                if (i = i.stateNode, i.current.memoizedState.isDehydrated) {
                  var s = Jn(i.pendingLanes);
                  if (s !== 0) {
                    var h = i;
                    for (h.pendingLanes |= 2, h.entangledLanes |= 2; s; ) {
                      var b = 1 << 31 - tt(s);
                      h.entanglements[1] |= b, s &= ~b;
                    }
                    ol(i), (Ue & 6) === 0 && (Bo = Lt() + 500, tr(0));
                  }
                }
                break;
              case 31:
              case 13:
                h = ja(i, 2), h !== null && Pt(h, i, 2), qo(), Xf(i, 2);
            }
          if (i = Zf(l), i === null && Of(
            e,
            t,
            l,
            ec,
            n
          ), i === a) break;
          a = i;
        }
        a !== null && l.stopPropagation();
      } else
        Of(
          e,
          t,
          l,
          null,
          n
        );
    }
  }
  function Zf(e) {
    return e = wc(e), Kf(e);
  }
  var ec = null;
  function Kf(e) {
    if (ec = null, e = vn(e), e !== null) {
      var t = d(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (e = m(t), e !== null) return e;
          e = null;
        } else if (n === 31) {
          if (e = p(t), e !== null) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ec = e, null;
  }
  function Vg(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "fullscreenerror":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "resize":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (mu()) {
          case ri:
            return 2;
          case dl:
            return 8;
          case Mn:
          case zr:
            return 32;
          case pu:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Jf = !1, ca = null, sa = null, fa = null, cr = /* @__PURE__ */ new Map(), sr = /* @__PURE__ */ new Map(), da = [], YS = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Xg(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        ca = null;
        break;
      case "dragenter":
      case "dragleave":
        sa = null;
        break;
      case "mouseover":
      case "mouseout":
        fa = null;
        break;
      case "pointerover":
      case "pointerout":
        cr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        sr.delete(t.pointerId);
    }
  }
  function fr(e, t, n, l, a, i) {
    return e === null || e.nativeEvent !== i ? (e = {
      blockedOn: t,
      domEventName: n,
      eventSystemFlags: l,
      nativeEvent: i,
      targetContainers: [a]
    }, t !== null && (t = In(t), t !== null && Yg(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, a !== null && t.indexOf(a) === -1 && t.push(a), e);
  }
  function qS(e, t, n, l, a) {
    switch (t) {
      case "focusin":
        return ca = fr(
          ca,
          e,
          t,
          n,
          l,
          a
        ), !0;
      case "dragenter":
        return sa = fr(
          sa,
          e,
          t,
          n,
          l,
          a
        ), !0;
      case "mouseover":
        return fa = fr(
          fa,
          e,
          t,
          n,
          l,
          a
        ), !0;
      case "pointerover":
        var i = a.pointerId;
        return cr.set(
          i,
          fr(
            cr.get(i) || null,
            e,
            t,
            n,
            l,
            a
          )
        ), !0;
      case "gotpointercapture":
        return i = a.pointerId, sr.set(
          i,
          fr(
            sr.get(i) || null,
            e,
            t,
            n,
            l,
            a
          )
        ), !0;
    }
    return !1;
  }
  function Qg(e) {
    var t = vn(e.target);
    if (t !== null) {
      var n = d(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = m(n), t !== null) {
            e.blockedOn = t, kr(e.priority, function() {
              qg(n);
            });
            return;
          }
        } else if (t === 31) {
          if (t = p(n), t !== null) {
            e.blockedOn = t, kr(e.priority, function() {
              qg(n);
            });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function tc(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Zf(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var l = new n.constructor(
          n.type,
          n
        );
        Nc = l, n.target.dispatchEvent(l), Nc = null;
      } else
        return t = In(n), t !== null && Yg(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function Zg(e, t, n) {
    tc(e) && n.delete(t);
  }
  function VS() {
    Jf = !1, ca !== null && tc(ca) && (ca = null), sa !== null && tc(sa) && (sa = null), fa !== null && tc(fa) && (fa = null), cr.forEach(Zg), sr.forEach(Zg);
  }
  function nc(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Jf || (Jf = !0, u.unstable_scheduleCallback(
      u.unstable_NormalPriority,
      VS
    )));
  }
  var lc = null;
  function Kg(e) {
    lc !== e && (lc = e, u.unstable_scheduleCallback(
      u.unstable_NormalPriority,
      function() {
        lc === e && (lc = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t], l = e[t + 1], a = e[t + 2];
          if (typeof l != "function") {
            if (Kf(l || n) === null)
              continue;
            break;
          }
          var i = In(n);
          i !== null && (e.splice(t, 3), t -= 3, Cs(
            i,
            {
              pending: !0,
              data: a,
              method: n.method,
              action: l
            },
            l,
            a
          ));
        }
      }
    ));
  }
  function Ii(e) {
    function t(b) {
      return nc(b, e);
    }
    ca !== null && nc(ca, e), sa !== null && nc(sa, e), fa !== null && nc(fa, e), cr.forEach(t), sr.forEach(t);
    for (var n = 0; n < da.length; n++) {
      var l = da[n];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < da.length && (n = da[0], n.blockedOn === null); )
      Qg(n), n.blockedOn === null && da.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
      for (l = 0; l < n.length; l += 3) {
        var a = n[l], i = n[l + 1], s = a[Rt] || null;
        if (typeof i == "function")
          s || Kg(n);
        else if (s) {
          var h = null;
          if (i && i.hasAttribute("formAction")) {
            if (a = i, s = i[Rt] || null)
              h = s.formAction;
            else if (Kf(a) !== null) continue;
          } else h = s.action;
          typeof h == "function" ? n[l + 1] = h : (n.splice(l, 3), l -= 3), Kg(n);
        }
      }
  }
  function Jg() {
    function e(i) {
      i.canIntercept && i.info === "react-transition" && i.intercept({
        handler: function() {
          return new Promise(function(s) {
            return a = s;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      a !== null && (a(), a = null), l || setTimeout(n, 20);
    }
    function n() {
      if (!l && !navigation.transition) {
        var i = navigation.currentEntry;
        i && i.url != null && navigation.navigate(i.url, {
          state: i.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var l = !1, a = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
        l = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), a !== null && (a(), a = null);
      };
    }
  }
  function $f(e) {
    this._internalRoot = e;
  }
  ac.prototype.render = $f.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(c(409));
    var n = t.current, l = sn();
    Bg(n, l, e, t, null, null);
  }, ac.prototype.unmount = $f.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Bg(e.current, 2, null, e, null, null), qo(), t[Un] = null;
    }
  };
  function ac(e) {
    this._internalRoot = e;
  }
  ac.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Ur();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < da.length && t !== 0 && t < da[n].priority; n++) ;
      da.splice(n, 0, e), n === 0 && Qg(e);
    }
  };
  var $g = r.version;
  if ($g !== "19.3.0")
    throw Error(
      c(
        527,
        $g,
        "19.3.0"
      )
    );
  fe.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(c(188)) : (e = Object.keys(e).join(","), Error(c(268, e)));
    return e = x(t), e = e !== null ? A(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var XS = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: P,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ic = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ic.isDisabled && ic.supportsFiber)
      try {
        Ll = ic.inject(
          XS
        ), St = ic;
      } catch {
      }
  }
  return hr.createRoot = function(e, t) {
    if (!f(e)) throw Error(c(299));
    var n = !1, l = "", a = Hm, i = Bm, s = Gm;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (a = t.onUncaughtError), t.onCaughtError !== void 0 && (i = t.onCaughtError), t.onRecoverableError !== void 0 && (s = t.onRecoverableError)), t = Lg(
      e,
      1,
      !1,
      null,
      null,
      n,
      l,
      null,
      a,
      i,
      s,
      Jg
    ), e[Un] = t.current, Af(e), new $f(t);
  }, hr.hydrateRoot = function(e, t, n) {
    if (!f(e)) throw Error(c(299));
    var l = !1, a = "", i = Hm, s = Bm, h = Gm, b = null;
    return n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (a = n.identifierPrefix), n.onUncaughtError !== void 0 && (i = n.onUncaughtError), n.onCaughtError !== void 0 && (s = n.onCaughtError), n.onRecoverableError !== void 0 && (h = n.onRecoverableError), n.formState !== void 0 && (b = n.formState)), t = Lg(
      e,
      1,
      !0,
      t,
      n ?? null,
      l,
      a,
      b,
      i,
      s,
      h,
      Jg
    ), t.context = Hg(null), n = t.current, l = sn(), l = si(l), a = Il(l), a.callback = null, Fl(n, a, l), n = l, t.current.lanes = n, gn(t, n), ol(t), e[Un] = t.current, Af(e), new ac(t);
  }, hr.version = "19.3.0", hr;
}
var iv;
function n1() {
  if (iv) return Pf.exports;
  iv = 1;
  function u() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (r) {
        console.error(r);
      }
  }
  return u(), Pf.exports = t1(), Pf.exports;
}
var l1 = n1(), ou = Qv(), a1 = Object.defineProperty, su = (u, r) => a1(u, "name", { value: r, configurable: !0 }), Zv = !!(typeof window < "u" && window.document && window.document.createElement);
function ya(u, r, { checkForDefaultPrevented: o = !0 } = {}) {
  return /* @__PURE__ */ su(function(f) {
    if (u?.(f), o === !1 || !f || !f.defaultPrevented)
      return r?.(f);
  }, "handleEvent");
}
su(ya, "composeEventHandlers");
function i1(u) {
  if (!Zv)
    throw new Error("Cannot access window outside of the DOM");
  return u?.ownerDocument?.defaultView ?? window;
}
su(i1, "getOwnerWindow");
function pd(u) {
  if (!Zv)
    throw new Error("Cannot access document outside of the DOM");
  return u?.ownerDocument ?? document;
}
su(pd, "getOwnerDocument");
function Kv(u, r = !1) {
  const { activeElement: o } = pd(u);
  if (!o?.nodeName)
    return null;
  if (Jv(o) && o.contentDocument)
    return Kv(o.contentDocument.body, r);
  if (r) {
    const c = o.getAttribute("aria-activedescendant");
    if (c) {
      const f = pd(o).getElementById(c);
      if (f)
        return f;
    }
  }
  return o;
}
su(Kv, "getActiveElement");
function Jv(u) {
  return u.tagName === "IFRAME";
}
su(Jv, "isFrame");
var u1 = Object.defineProperty, jd = (u, r) => u1(u, "name", { value: r, configurable: !0 });
function gd(u, r) {
  if (typeof u == "function")
    return u(r);
  u != null && (u.current = r);
}
jd(gd, "setRef");
function $v(...u) {
  return (r) => {
    let o = !1;
    const c = u.map((f) => {
      const d = gd(f, r);
      return !o && typeof d == "function" && (o = !0), d;
    });
    if (o)
      return () => {
        for (let f = 0; f < c.length; f++) {
          const d = c[f];
          typeof d == "function" ? d() : gd(u[f], null);
        }
      };
  };
}
jd($v, "composeRefs");
function fu(...u) {
  return z.useCallback($v(...u), u);
}
jd(fu, "useComposedRefs");
var r1 = Object.defineProperty, Rn = (u, r) => r1(u, "name", { value: r, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function o1(u, r) {
  const o = z.createContext(r);
  o.displayName = u + "Context";
  const c = /* @__PURE__ */ Rn((d) => {
    const { children: m, ...p } = d, S = z.useMemo(() => p, Object.values(p));
    return /* @__PURE__ */ y.jsx(o.Provider, { value: S, children: m });
  }, "Provider");
  c.displayName = u + "Provider";
  function f(d, m = {}) {
    const { optional: p = !1 } = m, S = z.useContext(o);
    if (S) return S;
    if (r !== void 0) return r;
    if (!p)
      throw new Error(`\`${d}\` must be used within \`${u}\``);
  }
  return Rn(f, "useContext"), [c, f];
}
Rn(o1, "createContext");
// @__NO_SIDE_EFFECTS__
function Iv(u, r = []) {
  let o = [];
  function c(d, m) {
    const p = z.createContext(m);
    p.displayName = d + "Context";
    const S = o.length;
    o = [...o, m];
    const x = /* @__PURE__ */ Rn((v) => {
      const { scope: N, children: q, ...H } = v, B = N?.[u]?.[S] || p, j = z.useMemo(() => H, Object.values(H));
      return /* @__PURE__ */ y.jsx(B.Provider, { value: j, children: q });
    }, "Provider");
    x.displayName = d + "Provider";
    function A(v, N, q = {}) {
      const { optional: H = !1 } = q, B = N?.[u]?.[S] || p, j = z.useContext(B);
      if (j) return j;
      if (m !== void 0) return m;
      if (!H)
        throw new Error(`\`${v}\` must be used within \`${d}\``);
    }
    return Rn(A, "useContext"), [x, A];
  }
  Rn(c, "createContext");
  const f = /* @__PURE__ */ Rn(() => {
    const d = o.map((m) => z.createContext(m));
    return /* @__PURE__ */ Rn(function(p) {
      const S = p?.[u] || d;
      return z.useMemo(
        () => ({ [`__scope${u}`]: { ...p, [u]: S } }),
        [p, S]
      );
    }, "useScope");
  }, "createScope");
  return f.scopeName = u, [c, Fv(f, ...r)];
}
Rn(Iv, "createContextScope");
function Fv(...u) {
  const r = u[0];
  if (u.length === 1) return r;
  const o = /* @__PURE__ */ Rn(() => {
    const c = u.map((f) => ({
      useScope: f(),
      scopeName: f.scopeName
    }));
    return /* @__PURE__ */ Rn(function(d) {
      const m = c.reduce((p, { useScope: S, scopeName: x }) => {
        const v = S(d)[`__scope${x}`];
        return { ...p, ...v };
      }, {});
      return z.useMemo(() => ({ [`__scope${r.scopeName}`]: m }), [m]);
    }, "useComposedScopes");
  }, "createScope");
  return o.scopeName = r.scopeName, o;
}
Rn(Fv, "composeContextScopes");
var Sa = globalThis?.document ? z.useLayoutEffect : () => {
}, c1 = Object.defineProperty, s1 = (u, r) => c1(u, "name", { value: r, configurable: !0 }), f1 = xr[" useId ".trim().toString()] || (() => {
}), d1 = 0;
function mc(u) {
  const [r, o] = z.useState(f1());
  return Sa(() => {
    u || o((c) => c ?? String(d1++));
  }, [u]), u || (r ? `radix-${r}` : "");
}
s1(mc, "useId");
var h1 = Object.defineProperty, m1 = (u, r) => h1(u, "name", { value: r, configurable: !0 }), uv = xr[" useEffectEvent ".trim().toString()], rv = xr[" useInsertionEffect ".trim().toString()];
function Pv(u) {
  if (typeof uv == "function")
    return uv(u);
  const r = z.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  return typeof rv == "function" ? rv(() => {
    r.current = u;
  }) : Sa(() => {
    r.current = u;
  }), z.useMemo(() => ((...o) => r.current?.(...o)), []);
}
m1(Pv, "useEffectEvent");
var p1 = Object.defineProperty, _r = (u, r) => p1(u, "name", { value: r, configurable: !0 }), g1 = xr[" useInsertionEffect ".trim().toString()] || Sa;
function Wv({
  prop: u,
  defaultProp: r,
  onChange: o = /* @__PURE__ */ _r(() => {
  }, "onChange"),
  caller: c
}) {
  const [f, d, m] = ey({
    defaultProp: r,
    onChange: o
  }), p = u !== void 0, S = p ? u : f, x = z.useCallback(
    (A) => {
      if (p) {
        const v = ty(A) ? A(u) : A;
        v !== u && m.current?.(v);
      } else
        d(A);
    },
    [p, u, d, m]
  );
  return [S, x];
}
_r(Wv, "useControllableState");
function ey({
  defaultProp: u,
  onChange: r
}) {
  const [o, c] = z.useState(u), f = z.useRef(o), d = z.useRef(r);
  return g1(() => {
    d.current = r;
  }, [r]), z.useEffect(() => {
    f.current !== o && (d.current?.(o), f.current = o);
  }, [o, f]), [o, c, d];
}
_r(ey, "useUncontrolledState");
function ty(u) {
  return typeof u == "function";
}
_r(ty, "isFunction");
var ov = Symbol("RADIX:SYNC_STATE");
function v1(u, r, o, c) {
  const { prop: f, defaultProp: d, onChange: m, caller: p } = r, S = f !== void 0, x = Pv(m), A = [{ ...o, state: d }];
  c && A.push(c);
  const [v, N] = z.useReducer(
    (j, Q) => {
      if (Q.type === ov)
        return { ...j, state: Q.state };
      const Z = u(j, Q);
      return S && !Object.is(Z.state, j.state) && x(Z.state), Z;
    },
    ...A
  ), q = v.state, H = z.useRef(q);
  z.useEffect(() => {
    H.current !== q && (H.current = q, S || x(q));
  }, [q, H, S]);
  const B = z.useMemo(() => f !== void 0 ? { ...v, state: f } : v, [v, f]);
  return z.useEffect(() => {
    S && !Object.is(f, v.state) && N({ type: ov, state: f });
  }, [f, v.state, S]), [B, N];
}
_r(v1, "useControllableStateReducer");
var y1 = Object.defineProperty, Xn = (u, r) => y1(u, "name", { value: r, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function Ec(u) {
  const r = z.forwardRef((o, c) => {
    let { children: f, ...d } = o, m = null, p = !1;
    const S = [];
    vd(f) && typeof uc == "function" && (f = uc(f._payload)), z.Children.forEach(f, (N) => {
      if (iy(N)) {
        p = !0;
        const q = N;
        let H = "child" in q.props ? q.props.child : q.props.children;
        vd(H) && typeof uc == "function" && (H = uc(H._payload)), m = E1(q, H), S.push(m?.props?.children);
      } else
        S.push(N);
    }), m ? m = z.cloneElement(m, void 0, S) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !p && z.Children.count(f) === 1 && z.isValidElement(f) && (m = f)
    );
    const x = m ? ay(m) : void 0, A = fu(c, x);
    if (!m) {
      if (f || f === 0)
        throw new Error(
          p ? _1(u) : x1(u)
        );
      return f;
    }
    const v = ly(d, m.props ?? {});
    return m.type !== z.Fragment && (v.ref = c ? A : x), z.cloneElement(m, v);
  });
  return r.displayName = `${u}.Slot`, r;
}
Xn(Ec, "createSlot");
var b1 = /* @__PURE__ */ Ec("Slot"), ny = Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function S1(u) {
  const r = /* @__PURE__ */ Xn((o) => "child" in o ? o.children(o.child) : o.children, "Slottable");
  return r.displayName = `${u}.Slottable`, r.__radixId = ny, r;
}
Xn(S1, "createSlottable");
var E1 = /* @__PURE__ */ Xn((u, r) => {
  if ("child" in u.props) {
    const o = u.props.child;
    return z.isValidElement(o) ? z.cloneElement(o, void 0, u.props.children(o.props.children)) : null;
  }
  return z.isValidElement(r) ? r : null;
}, "getSlottableElementFromSlottable");
function ly(u, r) {
  const o = { ...r };
  for (const c in r) {
    const f = u[c], d = r[c];
    /^on[A-Z]/.test(c) ? f && d ? o[c] = (...p) => {
      const S = d(...p);
      return f(...p), S;
    } : f && (o[c] = f) : c === "style" ? o[c] = { ...f, ...d } : c === "className" && (o[c] = [f, d].filter(Boolean).join(" "));
  }
  return { ...u, ...o };
}
Xn(ly, "mergeProps");
function ay(u) {
  let r = Object.getOwnPropertyDescriptor(u.props, "ref")?.get, o = r && "isReactWarning" in r && r.isReactWarning;
  return o ? u.ref : (r = Object.getOwnPropertyDescriptor(u, "ref")?.get, o = r && "isReactWarning" in r && r.isReactWarning, o ? u.props.ref : u.props.ref || u.ref);
}
Xn(ay, "getElementRef");
function iy(u) {
  return z.isValidElement(u) && typeof u.type == "function" && "__radixId" in u.type && u.type.__radixId === ny;
}
Xn(iy, "isSlottable");
var T1 = Symbol.for("react.lazy");
function vd(u) {
  return u != null && typeof u == "object" && "$$typeof" in u && u.$$typeof === T1 && "_payload" in u && uy(u._payload);
}
Xn(vd, "isLazyComponent");
function uy(u) {
  return typeof u == "object" && u !== null && "then" in u;
}
Xn(uy, "isPromiseLike");
var x1 = /* @__PURE__ */ Xn((u) => `${u} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), _1 = /* @__PURE__ */ Xn((u) => `${u} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), uc = xr[" use ".trim().toString()], A1 = Object.defineProperty, O1 = (u, r) => A1(u, "name", { value: r, configurable: !0 }), R1 = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], Ea = R1.reduce((u, r) => {
  const o = /* @__PURE__ */ Ec(`Primitive.${r}`), c = z.forwardRef((f, d) => {
    const { asChild: m, ...p } = f, S = m ? o : r;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ y.jsx(S, { ...p, ref: d });
  });
  return c.displayName = `Primitive.${r}`, { ...u, [r]: c };
}, {});
function ry(u, r) {
  u && ou.flushSync(() => u.dispatchEvent(r));
}
O1(ry, "dispatchDiscreteCustomEvent");
var C1 = Object.defineProperty, N1 = (u, r) => C1(u, "name", { value: r, configurable: !0 });
function cu(u) {
  const r = z.useRef(u);
  return z.useEffect(() => {
    r.current = u;
  }), z.useMemo(() => ((...o) => r.current?.(...o)), []);
}
N1(cu, "useCallbackRef");
var w1 = Object.defineProperty, At = (u, r) => w1(u, "name", { value: r, configurable: !0 }), yd = "dismissableLayer.update", z1 = "dismissableLayer.pointerDownOutside", D1 = "dismissableLayer.focusOutside", cv, oy = z.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set(),
  // Outside elements that belong to a layer's own dismiss affordance (eg, a
  // dialog overlay). Pressing them should dismiss the layer regardless of
  // whether or not they stop propagation.
  //
  // See https://github.com/radix-ui/primitives/issues/3346
  dismissableSurfaces: /* @__PURE__ */ new Set()
}), M1 = /* @__PURE__ */ z.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ At(function(r, o) {
    const {
      disableOutsidePointerEvents: c = !1,
      deferPointerDownOutside: f = !1,
      onEscapeKeyDown: d,
      onPointerDownOutside: m,
      onFocusOutside: p,
      onInteractOutside: S,
      onDismiss: x,
      ...A
    } = r, v = z.useContext(oy), [N, q] = z.useState(null), H = N?.ownerDocument ?? globalThis?.document, [, B] = z.useState({}), j = fu(o, q), Q = Array.from(v.layers), [Z] = [
      ...v.layersWithOutsidePointerEventsDisabled
    ].slice(-1), ae = Z ? Q.indexOf(Z) : -1, ie = N ? Q.indexOf(N) : -1, W = v.layersWithOutsidePointerEventsDisabled.size > 0, se = ie >= ae, ee = z.useRef(!1), he = sy(
      (I) => {
        m?.(I), S?.(I), I.defaultPrevented || x?.();
      },
      {
        ownerDocument: H,
        deferPointerDownOutside: f,
        isDeferredPointerDownOutsideRef: ee,
        dismissableSurfaces: v.dismissableSurfaces,
        shouldHandlePointerDownOutside: z.useCallback(
          (I) => {
            if (!(I instanceof Node))
              return !1;
            const bt = [...v.branches].some(
              (ot) => ot.contains(I)
            );
            return se && !bt;
          },
          [v.branches, se]
        )
      }
    ), Fe = fy((I) => {
      if (f && ee.current)
        return;
      const bt = I.target;
      [...v.branches].some((Ke) => Ke.contains(bt)) || (p?.(I), S?.(I), I.defaultPrevented || x?.());
    }, H), _e = N ? ie === Q.length - 1 : !1, ze = cu((I) => {
      I.key === "Escape" && (d?.(I), !I.defaultPrevented && x && (I.preventDefault(), x()));
    });
    return z.useEffect(() => {
      if (_e)
        return H.addEventListener("keydown", ze, { capture: !0 }), () => H.removeEventListener("keydown", ze, { capture: !0 });
    }, [H, _e, ze]), z.useEffect(() => {
      if (N)
        return c && (v.layersWithOutsidePointerEventsDisabled.size === 0 && (cv = H.body.style.pointerEvents, H.body.style.pointerEvents = "none"), v.layersWithOutsidePointerEventsDisabled.add(N)), v.layers.add(N), bd(), () => {
          c && (v.layersWithOutsidePointerEventsDisabled.delete(N), v.layersWithOutsidePointerEventsDisabled.size === 0 && (H.body.style.pointerEvents = cv));
        };
    }, [N, H, c, v]), z.useEffect(() => () => {
      N && (v.layers.delete(N), v.layersWithOutsidePointerEventsDisabled.delete(N), bd());
    }, [N, v]), z.useEffect(() => {
      const I = /* @__PURE__ */ At(() => B({}), "handleUpdate");
      return document.addEventListener(yd, I), () => document.removeEventListener(yd, I);
    }, []), /* @__PURE__ */ y.jsx(
      Ea.div,
      {
        ...A,
        ref: j,
        style: {
          pointerEvents: W ? se ? "auto" : "none" : void 0,
          ...r.style
        },
        onFocusCapture: ya(r.onFocusCapture, Fe.onFocusCapture),
        onBlurCapture: ya(r.onBlurCapture, Fe.onBlurCapture),
        onPointerDownCapture: ya(
          r.onPointerDownCapture,
          he.onPointerDownCapture
        )
      }
    );
  }, "DismissableLayer")
);
function cy() {
  const u = z.useContext(oy), [r, o] = z.useState(null);
  return z.useEffect(() => {
    if (r)
      return u.dismissableSurfaces.add(r), () => {
        u.dismissableSurfaces.delete(r);
      };
  }, [r, u.dismissableSurfaces]), o;
}
At(cy, "useDismissableLayerSurface");
var j1 = /* @__PURE__ */ At(() => !0, "IS_TRUE");
function sy(u, r) {
  const {
    ownerDocument: o = globalThis?.document,
    deferPointerDownOutside: c = !1,
    isDeferredPointerDownOutsideRef: f,
    dismissableSurfaces: d,
    shouldHandlePointerDownOutside: m = j1
  } = r, p = cu(u), S = z.useRef(!1), x = z.useRef(!1), A = z.useRef(/* @__PURE__ */ new Map()), v = z.useRef(() => {
  });
  return z.useEffect(() => {
    function N() {
      x.current = !1, f.current = !1, A.current.clear();
    }
    At(N, "resetOutsideInteraction");
    function q() {
      return Array.from(A.current.values()).some(Boolean);
    }
    At(q, "isOutsideInteractionIntercepted");
    function H(ae) {
      if (!x.current)
        return;
      const ie = ae.target;
      ie instanceof Node && [...d].some((se) => se.contains(ie)) || A.current.set(ae.type, !0), ae.type === "click" && window.setTimeout(() => {
        x.current && v.current();
      }, 0);
    }
    At(H, "handleInteractionCapture");
    function B(ae) {
      x.current && A.current.set(ae.type, !1);
    }
    At(B, "handleInteractionBubble");
    const j = /* @__PURE__ */ At((ae) => {
      if (ae.target && !S.current) {
        let ie = function() {
          o.removeEventListener("click", v.current);
          const se = q();
          N(), se || Ud(
            z1,
            p,
            W,
            { discrete: !0 }
          );
        };
        if (At(ie, "handleAndDispatchPointerDownOutsideEvent"), !m(ae.target)) {
          o.removeEventListener("click", v.current), N(), S.current = !1;
          return;
        }
        const W = { originalEvent: ae };
        x.current = !0, f.current = c && ae.button === 0, A.current.clear(), !c || ae.button !== 0 ? ie() : (o.removeEventListener("click", v.current), v.current = ie, o.addEventListener("click", v.current, { once: !0 }));
      } else
        o.removeEventListener("click", v.current), N();
      S.current = !1;
    }, "handlePointerDown"), Q = [
      "pointerup",
      "mousedown",
      "mouseup",
      "touchstart",
      "touchend",
      "click"
    ];
    for (const ae of Q)
      o.addEventListener(ae, H, !0), o.addEventListener(ae, B);
    const Z = window.setTimeout(() => {
      o.addEventListener("pointerdown", j);
    }, 0);
    return () => {
      window.clearTimeout(Z), o.removeEventListener("pointerdown", j), o.removeEventListener("click", v.current);
      for (const ae of Q)
        o.removeEventListener(ae, H, !0), o.removeEventListener(ae, B);
    };
  }, [
    o,
    p,
    c,
    f,
    d,
    m
  ]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: /* @__PURE__ */ At(() => S.current = !0, "onPointerDownCapture")
  };
}
At(sy, "usePointerDownOutside");
function fy(u, r = globalThis?.document) {
  const o = cu(u), c = z.useRef(!1);
  return z.useEffect(() => {
    const f = /* @__PURE__ */ At((d) => {
      d.target && !c.current && Ud(D1, o, { originalEvent: d }, {
        discrete: !1
      });
    }, "handleFocus");
    return r.addEventListener("focusin", f), () => r.removeEventListener("focusin", f);
  }, [r, o]), {
    onFocusCapture: /* @__PURE__ */ At(() => c.current = !0, "onFocusCapture"),
    onBlurCapture: /* @__PURE__ */ At(() => c.current = !1, "onBlurCapture")
  };
}
At(fy, "useFocusOutside");
function bd() {
  const u = new CustomEvent(yd);
  document.dispatchEvent(u);
}
At(bd, "dispatchUpdate");
function Ud(u, r, o, { discrete: c }) {
  const f = o.originalEvent.target, d = new CustomEvent(u, { bubbles: !1, cancelable: !0, detail: o });
  r && f.addEventListener(u, r, { once: !0 }), c ? ry(f, d) : f.dispatchEvent(d);
}
At(Ud, "handleAndDispatchCustomEvent");
var U1 = Object.defineProperty, Qt = (u, r) => U1(u, "name", { value: r, configurable: !0 }), nd = "focusScope.autoFocusOnMount", ld = "focusScope.autoFocusOnUnmount", sv = { bubbles: !1, cancelable: !0 }, k1 = /* @__PURE__ */ z.forwardRef(
  /* @__PURE__ */ Qt(function(r, o) {
    const {
      loop: c = !1,
      trapped: f = !1,
      onMountAutoFocus: d,
      onUnmountAutoFocus: m,
      ...p
    } = r, [S, x] = z.useState(null), A = cu(d), v = cu(m), N = z.useRef(null), q = fu(o, x), H = z.useRef({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    }).current;
    z.useEffect(() => {
      if (f) {
        let j = function(ie) {
          if (H.paused || !S) return;
          const W = ie.target;
          S.contains(W) ? N.current = W : Nl(N.current, { select: !0 });
        }, Q = function(ie) {
          if (H.paused || !S) return;
          const W = ie.relatedTarget;
          W !== null && (S.contains(W) || Nl(N.current, { select: !0 }));
        }, Z = function(ie) {
          if (document.activeElement === document.body)
            for (const se of ie)
              se.removedNodes.length > 0 && Nl(S);
        };
        Qt(j, "handleFocusIn"), Qt(Q, "handleFocusOut"), Qt(Z, "handleMutations"), document.addEventListener("focusin", j), document.addEventListener("focusout", Q);
        const ae = new MutationObserver(Z);
        return S && ae.observe(S, { childList: !0, subtree: !0 }), () => {
          document.removeEventListener("focusin", j), document.removeEventListener("focusout", Q), ae.disconnect();
        };
      }
    }, [f, S, H.paused]), z.useEffect(() => {
      if (S) {
        fv.add(H);
        const j = document.activeElement;
        if (!S.contains(j)) {
          const Z = new CustomEvent(nd, sv);
          S.addEventListener(nd, A), S.dispatchEvent(Z), Z.defaultPrevented || (dy(vy(kd(S)), { select: !0 }), document.activeElement === j && Nl(S));
        }
        return () => {
          S.removeEventListener(nd, A), setTimeout(() => {
            const Z = new CustomEvent(ld, sv);
            S.addEventListener(ld, v), S.dispatchEvent(Z), Z.defaultPrevented || Nl(j ?? document.body, { select: !0 }), S.removeEventListener(ld, v), fv.remove(H);
          }, 0);
        };
      }
    }, [S, A, v, H]);
    const B = z.useCallback(
      (j) => {
        if (!c && !f || H.paused) return;
        const Q = j.key === "Tab" && !j.altKey && !j.ctrlKey && !j.metaKey, Z = document.activeElement;
        if (Q && Z) {
          const ae = j.currentTarget, [ie, W] = hy(ae);
          ie && W ? !j.shiftKey && Z === W ? (j.preventDefault(), c && Nl(ie, { select: !0 })) : j.shiftKey && Z === ie && (j.preventDefault(), c && Nl(W, { select: !0 })) : Z === ae && j.preventDefault();
        }
      },
      [c, f, H.paused]
    );
    return /* @__PURE__ */ y.jsx(Ea.div, { tabIndex: -1, ...p, ref: q, onKeyDown: B });
  }, "FocusScope")
);
function dy(u, { select: r = !1 } = {}) {
  const o = document.activeElement;
  for (const c of u)
    if (Nl(c, { select: r }), document.activeElement !== o) return;
}
Qt(dy, "focusFirst");
function hy(u) {
  const r = kd(u), o = Sd(r, u), c = Sd(r.reverse(), u);
  return [o, c];
}
Qt(hy, "getTabbableEdges");
function kd(u) {
  const r = [], o = document.createTreeWalker(u, NodeFilter.SHOW_ELEMENT, {
    acceptNode: /* @__PURE__ */ Qt((c) => {
      const f = c.tagName === "INPUT" && c.type === "hidden";
      return c.disabled || c.hidden || f ? NodeFilter.FILTER_SKIP : c.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }, "acceptNode")
  });
  for (; o.nextNode(); ) r.push(o.currentNode);
  return r;
}
Qt(kd, "getTabbableCandidates");
function Sd(u, r) {
  const o = typeof r.checkVisibility == "function" && r.checkVisibility({ checkVisibilityCSS: !0 });
  for (const c of u)
    if (!(o ? !c.checkVisibility({ checkVisibilityCSS: !0 }) : my(c, { upTo: r })))
      return c;
}
Qt(Sd, "findVisible");
function my(u, { upTo: r }) {
  if (getComputedStyle(u).visibility === "hidden") return !0;
  for (; u; ) {
    if (r !== void 0 && u === r) return !1;
    if (getComputedStyle(u).display === "none") return !0;
    u = u.parentElement;
  }
  return !1;
}
Qt(my, "isHidden");
function py(u) {
  return u instanceof HTMLInputElement && "select" in u;
}
Qt(py, "isSelectableInput");
function Nl(u, { select: r = !1 } = {}) {
  if (u && u.focus) {
    const o = document.activeElement;
    u.focus({ preventScroll: !0 }), u !== o && py(u) && r && u.select();
  }
}
Qt(Nl, "focus");
var fv = gy();
function gy() {
  let u = [];
  return {
    add(r) {
      const o = u[0];
      r !== o && o?.pause(), u = Ed(u, r), u.unshift(r);
    },
    remove(r) {
      u = Ed(u, r), u[0]?.resume();
    }
  };
}
Qt(gy, "createFocusScopesStack");
function Ed(u, r) {
  const o = [...u], c = o.indexOf(r);
  return c !== -1 && o.splice(c, 1), o;
}
Qt(Ed, "arrayRemove");
function vy(u) {
  return u.filter((r) => r.tagName !== "A");
}
Qt(vy, "removeLinks");
var L1 = Object.defineProperty, H1 = (u, r) => L1(u, "name", { value: r, configurable: !0 }), B1 = /* @__PURE__ */ z.forwardRef(
  /* @__PURE__ */ H1(function(r, o) {
    const { container: c, ...f } = r, [d, m] = z.useState(!1);
    Sa(() => m(!0), []);
    const p = c || d && globalThis?.document?.body;
    return p ? ou.createPortal(/* @__PURE__ */ y.jsx(Ea.div, { ...f, ref: o }), p) : null;
  }, "Portal")
), G1 = Object.defineProperty, zl = (u, r) => G1(u, "name", { value: r, configurable: !0 });
function yy(u, r) {
  return z.useReducer((o, c) => r[o][c] ?? o, u);
}
zl(yy, "useStateMachine");
var Ld = /* @__PURE__ */ zl((u) => {
  const { present: r, children: o } = u, c = by(r), f = typeof o == "function" ? o({ present: c.isPresent }) : z.Children.only(o), d = Sy(c.ref, Ey(f));
  return typeof o == "function" || c.isPresent ? z.cloneElement(f, { ref: d }) : null;
}, "Presence");
function by(u) {
  const [r, o] = z.useState(), c = z.useRef(null), f = z.useRef(u), d = z.useRef("none"), m = z.useRef(void 0), p = u ? "mounted" : "unmounted", [S, x] = yy(p, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return z.useEffect(() => {
    S === "mounted" ? (d.current = m.current ?? nu(c.current), m.current = void 0) : d.current = "none";
  }, [S]), Sa(() => {
    const A = c.current, v = f.current;
    if (v !== u) {
      const q = d.current, H = nu(A);
      u ? (m.current = H, x("MOUNT")) : H === "none" || A?.display === "none" ? x("UNMOUNT") : x(v && q !== H ? "ANIMATION_OUT" : "UNMOUNT"), f.current = u;
    }
  }, [u, x]), Sa(() => {
    if (r) {
      let A;
      const v = r.ownerDocument.defaultView ?? window, N = /* @__PURE__ */ zl((H) => {
        const j = nu(c.current).includes(CSS.escape(H.animationName));
        if (H.target === r && j && (x("ANIMATION_END"), !f.current)) {
          const Q = r.style.animationFillMode;
          r.style.animationFillMode = "forwards", A = v.setTimeout(() => {
            r.style.animationFillMode === "forwards" && (r.style.animationFillMode = Q);
          });
        }
      }, "handleAnimationEnd"), q = /* @__PURE__ */ zl((H) => {
        H.target === r && (d.current = nu(c.current));
      }, "handleAnimationStart");
      return r.addEventListener("animationstart", q), r.addEventListener("animationcancel", N), r.addEventListener("animationend", N), () => {
        v.clearTimeout(A), r.removeEventListener("animationstart", q), r.removeEventListener("animationcancel", N), r.removeEventListener("animationend", N);
      };
    } else
      x("ANIMATION_END");
  }, [r, x]), {
    isPresent: ["mounted", "unmountSuspended"].includes(S),
    ref: z.useCallback((A) => {
      if (A) {
        const v = getComputedStyle(A);
        c.current = v, m.current = nu(v);
      } else
        c.current = null;
      o(A);
    }, [])
  };
}
zl(by, "usePresence");
function Td(u, r) {
  if (typeof u == "function")
    return u(r);
  u != null && (u.current = r);
}
zl(Td, "setRef");
function Sy(...u) {
  const r = z.useRef(u);
  return r.current = u, z.useCallback((o) => {
    const c = r.current;
    let f = !1;
    const d = c.map((m) => {
      const p = Td(m, o);
      return !f && typeof p == "function" && (f = !0), p;
    });
    if (f)
      return () => {
        for (let m = 0; m < d.length; m++) {
          const p = d[m];
          typeof p == "function" ? p() : Td(c[m], null);
        }
      };
  }, []);
}
zl(Sy, "useStableComposedRefs");
function nu(u) {
  return u?.animationName || "none";
}
zl(nu, "getAnimationName");
function Ey(u) {
  let r = Object.getOwnPropertyDescriptor(u.props, "ref")?.get, o = r && "isReactWarning" in r && r.isReactWarning;
  return o ? u.ref : (r = Object.getOwnPropertyDescriptor(u, "ref")?.get, o = r && "isReactWarning" in r && r.isReactWarning, o ? u.props.ref : u.props.ref || u.ref);
}
zl(Ey, "getElementRef");
var Y1 = Object.defineProperty, Hd = (u, r) => Y1(u, "name", { value: r, configurable: !0 }), rc = 0, Fi = null;
function q1(u) {
  return Bd(), u.children;
}
Hd(q1, "FocusGuards");
function Bd() {
  z.useEffect(() => {
    Fi || (Fi = { start: xd(), end: xd() });
    const { start: u, end: r } = Fi;
    return document.body.firstElementChild !== u && document.body.insertAdjacentElement("afterbegin", u), document.body.lastElementChild !== r && document.body.insertAdjacentElement("beforeend", r), rc++, () => {
      rc === 1 && (Fi?.start.remove(), Fi?.end.remove(), Fi = null), rc = Math.max(0, rc - 1);
    };
  }, []);
}
Hd(Bd, "useFocusGuards");
function xd() {
  const u = document.createElement("span");
  return u.setAttribute("data-radix-focus-guard", ""), u.tabIndex = 0, u.style.outline = "none", u.style.opacity = "0", u.style.position = "fixed", u.style.pointerEvents = "none", u;
}
Hd(xd, "createFocusGuard");
var cl = function() {
  return cl = Object.assign || function(r) {
    for (var o, c = 1, f = arguments.length; c < f; c++) {
      o = arguments[c];
      for (var d in o) Object.prototype.hasOwnProperty.call(o, d) && (r[d] = o[d]);
    }
    return r;
  }, cl.apply(this, arguments);
};
function Ty(u, r) {
  var o = {};
  for (var c in u) Object.prototype.hasOwnProperty.call(u, c) && r.indexOf(c) < 0 && (o[c] = u[c]);
  if (u != null && typeof Object.getOwnPropertySymbols == "function")
    for (var f = 0, c = Object.getOwnPropertySymbols(u); f < c.length; f++)
      r.indexOf(c[f]) < 0 && Object.prototype.propertyIsEnumerable.call(u, c[f]) && (o[c[f]] = u[c[f]]);
  return o;
}
function V1(u, r, o) {
  if (o || arguments.length === 2) for (var c = 0, f = r.length, d; c < f; c++)
    (d || !(c in r)) && (d || (d = Array.prototype.slice.call(r, 0, c)), d[c] = r[c]);
  return u.concat(d || Array.prototype.slice.call(r));
}
var pc = "right-scroll-bar-position", gc = "width-before-scroll-bar", X1 = "with-scroll-bars-hidden", Q1 = "--removed-body-scroll-bar-size";
function ad(u, r) {
  return typeof u == "function" ? u(r) : u && (u.current = r), u;
}
function Z1(u, r) {
  var o = z.useState(function() {
    return {
      // value
      value: u,
      // last callback
      callback: r,
      // "memoized" public interface
      facade: {
        get current() {
          return o.value;
        },
        set current(c) {
          var f = o.value;
          f !== c && (o.value = c, o.callback(c, f));
        }
      }
    };
  })[0];
  return o.callback = r, o.facade;
}
var K1 = typeof window < "u" ? z.useLayoutEffect : z.useEffect, dv = /* @__PURE__ */ new WeakMap();
function J1(u, r) {
  var o = Z1(null, function(c) {
    return u.forEach(function(f) {
      return ad(f, c);
    });
  });
  return K1(function() {
    var c = dv.get(o);
    if (c) {
      var f = new Set(c), d = new Set(u), m = o.current;
      f.forEach(function(p) {
        d.has(p) || ad(p, null);
      }), d.forEach(function(p) {
        f.has(p) || ad(p, m);
      });
    }
    dv.set(o, u);
  }, [u]), o;
}
function $1(u) {
  return u;
}
function I1(u, r) {
  r === void 0 && (r = $1);
  var o = [], c = !1, f = {
    read: function() {
      if (c)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return o.length ? o[o.length - 1] : u;
    },
    useMedium: function(d) {
      var m = r(d, c);
      return o.push(m), function() {
        o = o.filter(function(p) {
          return p !== m;
        });
      };
    },
    assignSyncMedium: function(d) {
      for (c = !0; o.length; ) {
        var m = o;
        o = [], m.forEach(d);
      }
      o = {
        push: function(p) {
          return d(p);
        },
        filter: function() {
          return o;
        }
      };
    },
    assignMedium: function(d) {
      c = !0;
      var m = [];
      if (o.length) {
        var p = o;
        o = [], p.forEach(d), m = o;
      }
      var S = function() {
        var A = m;
        m = [], A.forEach(d);
      }, x = function() {
        return Promise.resolve().then(S);
      };
      x(), o = {
        push: function(A) {
          m.push(A), x();
        },
        filter: function(A) {
          return m = m.filter(A), o;
        }
      };
    }
  };
  return f;
}
function F1(u) {
  u === void 0 && (u = {});
  var r = I1(null);
  return r.options = cl({ async: !0, ssr: !1 }, u), r;
}
var xy = function(u) {
  var r = u.sideCar, o = Ty(u, ["sideCar"]);
  if (!r)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var c = r.read();
  if (!c)
    throw new Error("Sidecar medium not found");
  return z.createElement(c, cl({}, o));
};
xy.isSideCarExport = !0;
function P1(u, r) {
  return u.useMedium(r), xy;
}
var _y = F1(), id = function() {
}, Tc = z.forwardRef(function(u, r) {
  var o = z.useRef(null), c = z.useState({
    onScrollCapture: id,
    onWheelCapture: id,
    onTouchMoveCapture: id
  }), f = c[0], d = c[1], m = u.forwardProps, p = u.children, S = u.className, x = u.removeScrollBar, A = u.enabled, v = u.shards, N = u.sideCar, q = u.noRelative, H = u.noIsolation, B = u.inert, j = u.allowPinchZoom, Q = u.as, Z = Q === void 0 ? "div" : Q, ae = u.gapMode, ie = Ty(u, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), W = N, se = J1([o, r]), ee = cl(cl({}, ie), f);
  return z.createElement(
    z.Fragment,
    null,
    A && z.createElement(W, { sideCar: _y, removeScrollBar: x, shards: v, noRelative: q, noIsolation: H, inert: B, setCallbacks: d, allowPinchZoom: !!j, lockRef: o, gapMode: ae }),
    m ? z.cloneElement(z.Children.only(p), cl(cl({}, ee), { ref: se })) : z.createElement(Z, cl({}, ee, { className: S, ref: se }), p)
  );
});
Tc.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Tc.classNames = {
  fullWidth: gc,
  zeroRight: pc
};
var W1 = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function eE() {
  if (!document)
    return null;
  var u = document.createElement("style");
  u.type = "text/css";
  var r = W1();
  return r && u.setAttribute("nonce", r), u;
}
function tE(u, r) {
  u.styleSheet ? u.styleSheet.cssText = r : u.appendChild(document.createTextNode(r));
}
function nE(u) {
  var r = document.head || document.getElementsByTagName("head")[0];
  r.appendChild(u);
}
var lE = function() {
  var u = 0, r = null;
  return {
    add: function(o) {
      u == 0 && (r = eE()) && (tE(r, o), nE(r)), u++;
    },
    remove: function() {
      u--, !u && r && (r.parentNode && r.parentNode.removeChild(r), r = null);
    }
  };
}, aE = function() {
  var u = lE();
  return function(r, o) {
    z.useEffect(function() {
      return u.add(r), function() {
        u.remove();
      };
    }, [r && o]);
  };
}, Ay = function() {
  var u = aE(), r = function(o) {
    var c = o.styles, f = o.dynamic;
    return u(c, f), null;
  };
  return r;
}, iE = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, ud = function(u) {
  return parseInt(u || "", 10) || 0;
}, uE = function(u) {
  var r = window.getComputedStyle(document.body), o = r[u === "padding" ? "paddingLeft" : "marginLeft"], c = r[u === "padding" ? "paddingTop" : "marginTop"], f = r[u === "padding" ? "paddingRight" : "marginRight"];
  return [ud(o), ud(c), ud(f)];
}, rE = function(u) {
  if (u === void 0 && (u = "margin"), typeof window > "u")
    return iE;
  var r = uE(u), o = document.documentElement.clientWidth, c = window.innerWidth;
  return {
    left: r[0],
    top: r[1],
    right: r[2],
    gap: Math.max(0, c - o + r[2] - r[0])
  };
}, oE = Ay(), iu = "data-scroll-locked", cE = function(u, r, o, c) {
  var f = u.left, d = u.top, m = u.right, p = u.gap;
  return o === void 0 && (o = "margin"), `
  .`.concat(X1, ` {
   overflow: hidden `).concat(c, `;
   padding-right: `).concat(p, "px ").concat(c, `;
  }
  body[`).concat(iu, `] {
    overflow: hidden `).concat(c, `;
    overscroll-behavior: contain;
    `).concat([
    r && "position: relative ".concat(c, ";"),
    o === "margin" && `
    padding-left: `.concat(f, `px;
    padding-top: `).concat(d, `px;
    padding-right: `).concat(m, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(p, "px ").concat(c, `;
    `),
    o === "padding" && "padding-right: ".concat(p, "px ").concat(c, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(pc, ` {
    right: `).concat(p, "px ").concat(c, `;
  }
  
  .`).concat(gc, ` {
    margin-right: `).concat(p, "px ").concat(c, `;
  }
  
  .`).concat(pc, " .").concat(pc, ` {
    right: 0 `).concat(c, `;
  }
  
  .`).concat(gc, " .").concat(gc, ` {
    margin-right: 0 `).concat(c, `;
  }
  
  body[`).concat(iu, `] {
    `).concat(Q1, ": ").concat(p, `px;
  }
`);
}, hv = function() {
  var u = parseInt(document.body.getAttribute(iu) || "0", 10);
  return isFinite(u) ? u : 0;
}, sE = function() {
  z.useEffect(function() {
    return document.body.setAttribute(iu, (hv() + 1).toString()), function() {
      var u = hv() - 1;
      u <= 0 ? document.body.removeAttribute(iu) : document.body.setAttribute(iu, u.toString());
    };
  }, []);
}, fE = function(u) {
  var r = u.noRelative, o = u.noImportant, c = u.gapMode, f = c === void 0 ? "margin" : c;
  sE();
  var d = z.useMemo(function() {
    return rE(f);
  }, [f]);
  return z.createElement(oE, { styles: cE(d, !r, f, o ? "" : "!important") });
}, _d = !1;
if (typeof window < "u")
  try {
    var oc = Object.defineProperty({}, "passive", {
      get: function() {
        return _d = !0, !0;
      }
    });
    window.addEventListener("test", oc, oc), window.removeEventListener("test", oc, oc);
  } catch {
    _d = !1;
  }
var Pi = _d ? { passive: !1 } : !1, dE = function(u) {
  return u.tagName === "TEXTAREA";
}, Oy = function(u, r) {
  if (!(u instanceof Element))
    return !1;
  var o = window.getComputedStyle(u);
  return (
    // not-not-scrollable
    o[r] !== "hidden" && // contains scroll inside self
    !(o.overflowY === o.overflowX && !dE(u) && o[r] === "visible")
  );
}, hE = function(u) {
  return Oy(u, "overflowY");
}, mE = function(u) {
  return Oy(u, "overflowX");
}, mv = function(u, r) {
  var o = r.ownerDocument, c = r;
  do {
    typeof ShadowRoot < "u" && c instanceof ShadowRoot && (c = c.host);
    var f = Ry(u, c);
    if (f) {
      var d = Cy(u, c), m = d[1], p = d[2];
      if (m > p)
        return !0;
    }
    c = c.parentNode;
  } while (c && c !== o.body);
  return !1;
}, pE = function(u) {
  var r = u.scrollTop, o = u.scrollHeight, c = u.clientHeight;
  return [
    r,
    o,
    c
  ];
}, gE = function(u) {
  var r = u.scrollLeft, o = u.scrollWidth, c = u.clientWidth;
  return [
    r,
    o,
    c
  ];
}, Ry = function(u, r) {
  return u === "v" ? hE(r) : mE(r);
}, Cy = function(u, r) {
  return u === "v" ? pE(r) : gE(r);
}, vE = function(u, r) {
  return u === "h" && r === "rtl" ? -1 : 1;
}, yE = function(u, r, o, c, f) {
  var d = vE(u, window.getComputedStyle(r).direction), m = d * c, p = o.target, S = r.contains(p), x = !1, A = m > 0, v = 0, N = 0;
  do {
    if (!p)
      break;
    var q = Cy(u, p), H = q[0], B = q[1], j = q[2], Q = B - j - d * H;
    (H || Q) && Ry(u, p) && (v += Q, N += H);
    var Z = p.parentNode;
    p = Z && Z.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? Z.host : Z;
  } while (
    // portaled content
    !S && p !== document.body || // self content
    S && (r.contains(p) || r === p)
  );
  return (A && Math.abs(v) < 1 || !A && Math.abs(N) < 1) && (x = !0), x;
}, cc = function(u) {
  return "changedTouches" in u ? [u.changedTouches[0].clientX, u.changedTouches[0].clientY] : [0, 0];
}, pv = function(u) {
  return [u.deltaX, u.deltaY];
}, gv = function(u) {
  return u && "current" in u ? u.current : u;
}, bE = function(u, r) {
  return u[0] === r[0] && u[1] === r[1];
}, SE = function(u) {
  return `
  .block-interactivity-`.concat(u, ` {pointer-events: none;}
  .allow-interactivity-`).concat(u, ` {pointer-events: all;}
`);
}, EE = 0, Wi = [];
function TE(u) {
  var r = z.useRef([]), o = z.useRef([0, 0]), c = z.useRef(), f = z.useState(EE++)[0], d = z.useState(Ay)[0], m = z.useRef(u);
  z.useEffect(function() {
    m.current = u;
  }, [u]), z.useEffect(function() {
    if (u.inert) {
      document.body.classList.add("block-interactivity-".concat(f));
      var B = V1([u.lockRef.current], (u.shards || []).map(gv), !0).filter(Boolean);
      return B.forEach(function(j) {
        return j.classList.add("allow-interactivity-".concat(f));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(f)), B.forEach(function(j) {
          return j.classList.remove("allow-interactivity-".concat(f));
        });
      };
    }
  }, [u.inert, u.lockRef.current, u.shards]);
  var p = z.useCallback(function(B, j) {
    if ("touches" in B && B.touches.length === 2 || B.type === "wheel" && B.ctrlKey)
      return !m.current.allowPinchZoom;
    var Q = cc(B), Z = o.current, ae = "deltaX" in B ? B.deltaX : Z[0] - Q[0], ie = "deltaY" in B ? B.deltaY : Z[1] - Q[1], W, se = B.target, ee = Math.abs(ae) > Math.abs(ie) ? "h" : "v";
    if ("touches" in B && ee === "h" && se.type === "range")
      return !1;
    var he = window.getSelection(), Fe = he && he.anchorNode, _e = Fe ? Fe === se || Fe.contains(se) : !1;
    if (_e)
      return !1;
    var ze = mv(ee, se);
    if (!ze)
      return !0;
    if (ze ? W = ee : (W = ee === "v" ? "h" : "v", ze = mv(ee, se)), !ze)
      return !1;
    if (!c.current && "changedTouches" in B && (ae || ie) && (c.current = W), !W)
      return !0;
    var I = c.current || W;
    return yE(I, j, B, I === "h" ? ae : ie);
  }, []), S = z.useCallback(function(B) {
    var j = B;
    if (!(!Wi.length || Wi[Wi.length - 1] !== d)) {
      var Q = "deltaY" in j ? pv(j) : cc(j), Z = r.current.filter(function(W) {
        return W.name === j.type && (W.target === j.target || j.target === W.shadowParent) && bE(W.delta, Q);
      })[0];
      if (Z && Z.should) {
        j.cancelable && j.preventDefault();
        return;
      }
      if (!Z) {
        var ae = (m.current.shards || []).map(gv).filter(Boolean).filter(function(W) {
          return W.contains(j.target);
        }), ie = ae.length > 0 ? p(j, ae[0]) : !m.current.noIsolation;
        ie && j.cancelable && j.preventDefault();
      }
    }
  }, []), x = z.useCallback(function(B, j, Q, Z) {
    var ae = { name: B, delta: j, target: Q, should: Z, shadowParent: xE(Q) };
    r.current.push(ae), setTimeout(function() {
      r.current = r.current.filter(function(ie) {
        return ie !== ae;
      });
    }, 1);
  }, []), A = z.useCallback(function(B) {
    o.current = cc(B), c.current = void 0;
  }, []), v = z.useCallback(function(B) {
    x(B.type, pv(B), B.target, p(B, u.lockRef.current));
  }, []), N = z.useCallback(function(B) {
    x(B.type, cc(B), B.target, p(B, u.lockRef.current));
  }, []);
  z.useEffect(function() {
    return Wi.push(d), u.setCallbacks({
      onScrollCapture: v,
      onWheelCapture: v,
      onTouchMoveCapture: N
    }), document.addEventListener("wheel", S, Pi), document.addEventListener("touchmove", S, Pi), document.addEventListener("touchstart", A, Pi), function() {
      Wi = Wi.filter(function(B) {
        return B !== d;
      }), document.removeEventListener("wheel", S, Pi), document.removeEventListener("touchmove", S, Pi), document.removeEventListener("touchstart", A, Pi);
    };
  }, []);
  var q = u.removeScrollBar, H = u.inert;
  return z.createElement(
    z.Fragment,
    null,
    H ? z.createElement(d, { styles: SE(f) }) : null,
    q ? z.createElement(fE, { noRelative: u.noRelative, gapMode: u.gapMode }) : null
  );
}
function xE(u) {
  for (var r = null; u !== null; )
    u instanceof ShadowRoot && (r = u.host, u = u.host), u = u.parentNode;
  return r;
}
const _E = P1(_y, TE);
var Ny = z.forwardRef(function(u, r) {
  return z.createElement(Tc, cl({}, u, { ref: r, sideCar: _E }));
});
Ny.classNames = Tc.classNames;
var AE = function(u) {
  if (typeof document > "u")
    return null;
  var r = Array.isArray(u) ? u[0] : u;
  return r.ownerDocument.body;
}, eu = /* @__PURE__ */ new WeakMap(), sc = /* @__PURE__ */ new WeakMap(), fc = {}, rd = 0, wy = function(u) {
  return u && (u.host || wy(u.parentNode));
}, OE = function(u, r) {
  return r.map(function(o) {
    if (u.contains(o))
      return o;
    var c = wy(o);
    return c && u.contains(c) ? c : (console.error("aria-hidden", o, "in not contained inside", u, ". Doing nothing"), null);
  }).filter(function(o) {
    return !!o;
  });
}, RE = function(u, r, o, c) {
  var f = OE(r, Array.isArray(u) ? u : [u]);
  fc[o] || (fc[o] = /* @__PURE__ */ new WeakMap());
  var d = fc[o], m = [], p = /* @__PURE__ */ new Set(), S = new Set(f), x = function(v) {
    !v || p.has(v) || (p.add(v), x(v.parentNode));
  };
  f.forEach(x);
  var A = function(v) {
    !v || S.has(v) || Array.prototype.forEach.call(v.children, function(N) {
      if (p.has(N))
        A(N);
      else
        try {
          var q = N.getAttribute(c), H = q !== null && q !== "false", B = (eu.get(N) || 0) + 1, j = (d.get(N) || 0) + 1;
          eu.set(N, B), d.set(N, j), m.push(N), B === 1 && H && sc.set(N, !0), j === 1 && N.setAttribute(o, "true"), H || N.setAttribute(c, "true");
        } catch (Q) {
          console.error("aria-hidden: cannot operate on ", N, Q);
        }
    });
  };
  return A(r), p.clear(), rd++, function() {
    m.forEach(function(v) {
      var N = eu.get(v) - 1, q = d.get(v) - 1;
      eu.set(v, N), d.set(v, q), N || (sc.has(v) || v.removeAttribute(c), sc.delete(v)), q || v.removeAttribute(o);
    }), rd--, rd || (eu = /* @__PURE__ */ new WeakMap(), eu = /* @__PURE__ */ new WeakMap(), sc = /* @__PURE__ */ new WeakMap(), fc = {});
  };
}, CE = function(u, r, o) {
  o === void 0 && (o = "data-aria-hidden");
  var c = Array.from(Array.isArray(u) ? u : [u]), f = AE(u);
  return f ? (c.push.apply(c, Array.from(f.querySelectorAll("[aria-live], script"))), RE(c, f, o, "aria-hidden")) : function() {
    return null;
  };
}, NE = Object.defineProperty, Cn = (u, r) => NE(u, "name", { value: r, configurable: !0 }), Gd = "Dialog", [zy, T_] = /* @__PURE__ */ Iv(Gd), [wE, sl] = zy(Gd), zE = /* @__PURE__ */ Cn((u) => {
  const {
    __scopeDialog: r,
    children: o,
    open: c,
    defaultOpen: f,
    onOpenChange: d,
    modal: m = !0
  } = u, p = z.useRef(null), S = z.useRef(null), [x, A] = Wv({
    prop: c,
    defaultProp: f ?? !1,
    onChange: d,
    caller: Gd
  }), [v, N] = z.useState(0), [q, H] = z.useState(0);
  return /* @__PURE__ */ y.jsx(
    wE,
    {
      scope: r,
      triggerRef: p,
      contentRef: S,
      contentId: mc(),
      titleId: mc(),
      descriptionId: mc(),
      titlePresent: v > 0,
      descriptionPresent: q > 0,
      setTitleCount: N,
      setDescriptionCount: H,
      open: x,
      onOpenChange: A,
      onOpenToggle: z.useCallback(() => A((B) => !B), [A]),
      modal: m,
      children: o
    }
  );
}, "Dialog"), Dy = "DialogPortal", [DE, My] = zy(Dy, {
  forceMount: void 0
}), ME = /* @__PURE__ */ Cn((u) => {
  const { __scopeDialog: r, forceMount: o, children: c, container: f } = u, d = sl(Dy, r);
  return /* @__PURE__ */ y.jsx(DE, { scope: r, forceMount: o, children: z.Children.map(c, (m) => /* @__PURE__ */ y.jsx(Ld, { present: o || d.open, children: /* @__PURE__ */ y.jsx(B1, { asChild: !0, container: f, children: m }) })) });
}, "DialogPortal"), Ad = "DialogOverlay", jy = /* @__PURE__ */ z.forwardRef(
  /* @__PURE__ */ Cn(function(r, o) {
    const c = My(Ad, r.__scopeDialog), { forceMount: f = c.forceMount, ...d } = r, m = sl(Ad, r.__scopeDialog);
    return m.modal ? /* @__PURE__ */ y.jsx(Ld, { present: f || m.open, children: /* @__PURE__ */ y.jsx(UE, { ...d, ref: o }) }) : null;
  }, "DialogOverlay")
), jE = /* @__PURE__ */ Ec("DialogOverlay.RemoveScroll"), UE = /* @__PURE__ */ z.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Cn(function(r, o) {
    const { __scopeDialog: c, ...f } = r, d = sl(Ad, c), m = cy(), p = fu(o, m);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ y.jsx(Ny, { as: jE, allowPinchZoom: !0, shards: [d.contentRef], children: /* @__PURE__ */ y.jsx(
        Ea.div,
        {
          "data-state": Yd(d.open),
          ...f,
          ref: p,
          style: { pointerEvents: "auto", ...f.style }
        }
      ) })
    );
  }, "DialogOverlayImpl")
), Tr = "DialogContent", Uy = /* @__PURE__ */ z.forwardRef(
  /* @__PURE__ */ Cn(function(r, o) {
    const c = My(Tr, r.__scopeDialog), { forceMount: f = c.forceMount, ...d } = r, m = sl(Tr, r.__scopeDialog);
    return /* @__PURE__ */ y.jsx(Ld, { present: f || m.open, children: m.modal ? /* @__PURE__ */ y.jsx(kE, { ...d, ref: o }) : /* @__PURE__ */ y.jsx(LE, { ...d, ref: o }) });
  }, "DialogContent")
), kE = /* @__PURE__ */ z.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Cn(function(r, o) {
    const c = sl(Tr, r.__scopeDialog), f = z.useRef(null), d = fu(o, c.contentRef, f);
    return z.useEffect(() => {
      const m = f.current;
      if (m) return CE(m);
    }, []), /* @__PURE__ */ y.jsx(
      ky,
      {
        ...r,
        ref: d,
        trapFocus: c.open,
        disableOutsidePointerEvents: c.open,
        onCloseAutoFocus: ya(r.onCloseAutoFocus, (m) => {
          m.preventDefault(), c.triggerRef.current?.focus();
        }),
        onPointerDownOutside: ya(r.onPointerDownOutside, (m) => {
          const p = m.detail.originalEvent, S = p.button === 0 && p.ctrlKey === !0;
          (p.button === 2 || S) && m.preventDefault();
        }),
        onFocusOutside: ya(
          r.onFocusOutside,
          (m) => m.preventDefault()
        )
      }
    );
  }, "DialogContentModal")
), LE = /* @__PURE__ */ z.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Cn(function(r, o) {
    const c = sl(Tr, r.__scopeDialog), f = z.useRef(!1), d = z.useRef(!1);
    return /* @__PURE__ */ y.jsx(
      ky,
      {
        ...r,
        ref: o,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (m) => {
          r.onCloseAutoFocus?.(m), m.defaultPrevented || (f.current || c.triggerRef.current?.focus(), m.preventDefault()), f.current = !1, d.current = !1;
        },
        onInteractOutside: (m) => {
          r.onInteractOutside?.(m), m.defaultPrevented || (f.current = !0, m.detail.originalEvent.type === "pointerdown" && (d.current = !0));
          const p = m.target;
          c.triggerRef.current?.contains(p) && m.preventDefault(), m.detail.originalEvent.type === "focusin" && d.current && m.preventDefault();
        }
      }
    );
  }, "DialogContentNonModal")
), ky = /* @__PURE__ */ z.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Cn(function(r, o) {
    const { __scopeDialog: c, trapFocus: f, onOpenAutoFocus: d, onCloseAutoFocus: m, ...p } = r, S = sl(Tr, c);
    return Bd(), /* @__PURE__ */ y.jsx(y.Fragment, { children: /* @__PURE__ */ y.jsx(
      k1,
      {
        asChild: !0,
        loop: !0,
        trapped: f,
        onMountAutoFocus: d,
        onUnmountAutoFocus: m,
        children: /* @__PURE__ */ y.jsx(
          M1,
          {
            role: "dialog",
            id: S.contentId,
            "aria-describedby": S.descriptionPresent ? S.descriptionId : void 0,
            "aria-labelledby": S.titlePresent ? S.titleId : void 0,
            "data-state": Yd(S.open),
            ...p,
            ref: o,
            deferPointerDownOutside: !0,
            onDismiss: () => S.onOpenChange(!1)
          }
        )
      }
    ) });
  }, "DialogContentImpl")
), HE = "DialogTitle", Ly = /* @__PURE__ */ z.forwardRef(
  /* @__PURE__ */ Cn(function(r, o) {
    const { __scopeDialog: c, ...f } = r, d = sl(HE, c), { setTitleCount: m } = d;
    return Sa(() => (m((p) => p + 1), () => m((p) => p - 1)), [m]), /* @__PURE__ */ y.jsx(Ea.h2, { id: d.titleId, ...f, ref: o });
  }, "DialogTitle")
), BE = "DialogDescription", Hy = /* @__PURE__ */ z.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Cn(function(r, o) {
    const { __scopeDialog: c, ...f } = r, d = sl(BE, c), { setDescriptionCount: m } = d;
    return Sa(() => (m((p) => p + 1), () => m((p) => p - 1)), [m]), /* @__PURE__ */ y.jsx(Ea.p, { id: d.descriptionId, ...f, ref: o });
  }, "DialogDescription")
), GE = "DialogClose", YE = /* @__PURE__ */ z.forwardRef(
  /* @__PURE__ */ Cn(function(r, o) {
    const { __scopeDialog: c, ...f } = r, d = sl(GE, c);
    return /* @__PURE__ */ y.jsx(
      Ea.button,
      {
        type: "button",
        ...f,
        ref: o,
        onClick: ya(r.onClick, () => d.onOpenChange(!1))
      }
    );
  }, "DialogClose")
);
function Yd(u) {
  return u ? "open" : "closed";
}
Cn(Yd, "getState");
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qE = (u) => u.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), By = (...u) => u.filter((r, o, c) => !!r && r.trim() !== "" && c.indexOf(r) === o).join(" ").trim();
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var VE = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const XE = z.forwardRef(
  ({
    color: u = "currentColor",
    size: r = 24,
    strokeWidth: o = 2,
    absoluteStrokeWidth: c,
    className: f = "",
    children: d,
    iconNode: m,
    ...p
  }, S) => z.createElement(
    "svg",
    {
      ref: S,
      ...VE,
      width: r,
      height: r,
      stroke: u,
      strokeWidth: c ? Number(o) * 24 / Number(r) : o,
      className: By("lucide", f),
      ...p
    },
    [
      ...m.map(([x, A]) => z.createElement(x, A)),
      ...Array.isArray(d) ? d : [d]
    ]
  )
);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QE = (u, r) => {
  const o = z.forwardRef(
    ({ className: c, ...f }, d) => z.createElement(XE, {
      ref: d,
      iconNode: r,
      className: By(`lucide-${qE(u)}`, c),
      ...f
    })
  );
  return o.displayName = `${u}`, o;
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ZE = QE("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
function Gy(u) {
  var r, o, c = "";
  if (typeof u == "string" || typeof u == "number") c += u;
  else if (typeof u == "object") if (Array.isArray(u)) {
    var f = u.length;
    for (r = 0; r < f; r++) u[r] && (o = Gy(u[r])) && (c && (c += " "), c += o);
  } else for (o in u) u[o] && (c && (c += " "), c += o);
  return c;
}
function Yy() {
  for (var u, r, o = 0, c = "", f = arguments.length; o < f; o++) (u = arguments[o]) && (r = Gy(u)) && (c && (c += " "), c += r);
  return c;
}
const qd = "-", KE = (u) => {
  const r = $E(u), {
    conflictingClassGroups: o,
    conflictingClassGroupModifiers: c
  } = u;
  return {
    getClassGroupId: (m) => {
      const p = m.split(qd);
      return p[0] === "" && p.length !== 1 && p.shift(), qy(p, r) || JE(m);
    },
    getConflictingClassGroupIds: (m, p) => {
      const S = o[m] || [];
      return p && c[m] ? [...S, ...c[m]] : S;
    }
  };
}, qy = (u, r) => {
  if (u.length === 0)
    return r.classGroupId;
  const o = u[0], c = r.nextPart.get(o), f = c ? qy(u.slice(1), c) : void 0;
  if (f)
    return f;
  if (r.validators.length === 0)
    return;
  const d = u.join(qd);
  return r.validators.find(({
    validator: m
  }) => m(d))?.classGroupId;
}, vv = /^\[(.+)\]$/, JE = (u) => {
  if (vv.test(u)) {
    const r = vv.exec(u)[1], o = r?.substring(0, r.indexOf(":"));
    if (o)
      return "arbitrary.." + o;
  }
}, $E = (u) => {
  const {
    theme: r,
    prefix: o
  } = u, c = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return FE(Object.entries(u.classGroups), o).forEach(([d, m]) => {
    Od(m, c, d, r);
  }), c;
}, Od = (u, r, o, c) => {
  u.forEach((f) => {
    if (typeof f == "string") {
      const d = f === "" ? r : yv(r, f);
      d.classGroupId = o;
      return;
    }
    if (typeof f == "function") {
      if (IE(f)) {
        Od(f(c), r, o, c);
        return;
      }
      r.validators.push({
        validator: f,
        classGroupId: o
      });
      return;
    }
    Object.entries(f).forEach(([d, m]) => {
      Od(m, yv(r, d), o, c);
    });
  });
}, yv = (u, r) => {
  let o = u;
  return r.split(qd).forEach((c) => {
    o.nextPart.has(c) || o.nextPart.set(c, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), o = o.nextPart.get(c);
  }), o;
}, IE = (u) => u.isThemeGetter, FE = (u, r) => r ? u.map(([o, c]) => {
  const f = c.map((d) => typeof d == "string" ? r + d : typeof d == "object" ? Object.fromEntries(Object.entries(d).map(([m, p]) => [r + m, p])) : d);
  return [o, f];
}) : u, PE = (u) => {
  if (u < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let r = 0, o = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
  const f = (d, m) => {
    o.set(d, m), r++, r > u && (r = 0, c = o, o = /* @__PURE__ */ new Map());
  };
  return {
    get(d) {
      let m = o.get(d);
      if (m !== void 0)
        return m;
      if ((m = c.get(d)) !== void 0)
        return f(d, m), m;
    },
    set(d, m) {
      o.has(d) ? o.set(d, m) : f(d, m);
    }
  };
}, Vy = "!", WE = (u) => {
  const {
    separator: r,
    experimentalParseClassName: o
  } = u, c = r.length === 1, f = r[0], d = r.length, m = (p) => {
    const S = [];
    let x = 0, A = 0, v;
    for (let j = 0; j < p.length; j++) {
      let Q = p[j];
      if (x === 0) {
        if (Q === f && (c || p.slice(j, j + d) === r)) {
          S.push(p.slice(A, j)), A = j + d;
          continue;
        }
        if (Q === "/") {
          v = j;
          continue;
        }
      }
      Q === "[" ? x++ : Q === "]" && x--;
    }
    const N = S.length === 0 ? p : p.substring(A), q = N.startsWith(Vy), H = q ? N.substring(1) : N, B = v && v > A ? v - A : void 0;
    return {
      modifiers: S,
      hasImportantModifier: q,
      baseClassName: H,
      maybePostfixModifierPosition: B
    };
  };
  return o ? (p) => o({
    className: p,
    parseClassName: m
  }) : m;
}, eT = (u) => {
  if (u.length <= 1)
    return u;
  const r = [];
  let o = [];
  return u.forEach((c) => {
    c[0] === "[" ? (r.push(...o.sort(), c), o = []) : o.push(c);
  }), r.push(...o.sort()), r;
}, tT = (u) => ({
  cache: PE(u.cacheSize),
  parseClassName: WE(u),
  ...KE(u)
}), nT = /\s+/, lT = (u, r) => {
  const {
    parseClassName: o,
    getClassGroupId: c,
    getConflictingClassGroupIds: f
  } = r, d = [], m = u.trim().split(nT);
  let p = "";
  for (let S = m.length - 1; S >= 0; S -= 1) {
    const x = m[S], {
      modifiers: A,
      hasImportantModifier: v,
      baseClassName: N,
      maybePostfixModifierPosition: q
    } = o(x);
    let H = !!q, B = c(H ? N.substring(0, q) : N);
    if (!B) {
      if (!H) {
        p = x + (p.length > 0 ? " " + p : p);
        continue;
      }
      if (B = c(N), !B) {
        p = x + (p.length > 0 ? " " + p : p);
        continue;
      }
      H = !1;
    }
    const j = eT(A).join(":"), Q = v ? j + Vy : j, Z = Q + B;
    if (d.includes(Z))
      continue;
    d.push(Z);
    const ae = f(B, H);
    for (let ie = 0; ie < ae.length; ++ie) {
      const W = ae[ie];
      d.push(Q + W);
    }
    p = x + (p.length > 0 ? " " + p : p);
  }
  return p;
};
function aT() {
  let u = 0, r, o, c = "";
  for (; u < arguments.length; )
    (r = arguments[u++]) && (o = Xy(r)) && (c && (c += " "), c += o);
  return c;
}
const Xy = (u) => {
  if (typeof u == "string")
    return u;
  let r, o = "";
  for (let c = 0; c < u.length; c++)
    u[c] && (r = Xy(u[c])) && (o && (o += " "), o += r);
  return o;
};
function iT(u, ...r) {
  let o, c, f, d = m;
  function m(S) {
    const x = r.reduce((A, v) => v(A), u());
    return o = tT(x), c = o.cache.get, f = o.cache.set, d = p, p(S);
  }
  function p(S) {
    const x = c(S);
    if (x)
      return x;
    const A = lT(S, o);
    return f(S, A), A;
  }
  return function() {
    return d(aT.apply(null, arguments));
  };
}
const We = (u) => {
  const r = (o) => o[u] || [];
  return r.isThemeGetter = !0, r;
}, Qy = /^\[(?:([a-z-]+):)?(.+)\]$/i, uT = /^\d+\/\d+$/, rT = /* @__PURE__ */ new Set(["px", "full", "screen"]), oT = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, cT = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, sT = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, fT = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, dT = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Cl = (u) => uu(u) || rT.has(u) || uT.test(u), ma = (u) => du(u, "length", ST), uu = (u) => !!u && !Number.isNaN(Number(u)), od = (u) => du(u, "number", uu), mr = (u) => !!u && Number.isInteger(Number(u)), hT = (u) => u.endsWith("%") && uu(u.slice(0, -1)), ve = (u) => Qy.test(u), pa = (u) => oT.test(u), mT = /* @__PURE__ */ new Set(["length", "size", "percentage"]), pT = (u) => du(u, mT, Zy), gT = (u) => du(u, "position", Zy), vT = /* @__PURE__ */ new Set(["image", "url"]), yT = (u) => du(u, vT, TT), bT = (u) => du(u, "", ET), pr = () => !0, du = (u, r, o) => {
  const c = Qy.exec(u);
  return c ? c[1] ? typeof r == "string" ? c[1] === r : r.has(c[1]) : o(c[2]) : !1;
}, ST = (u) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  cT.test(u) && !sT.test(u)
), Zy = () => !1, ET = (u) => fT.test(u), TT = (u) => dT.test(u), xT = () => {
  const u = We("colors"), r = We("spacing"), o = We("blur"), c = We("brightness"), f = We("borderColor"), d = We("borderRadius"), m = We("borderSpacing"), p = We("borderWidth"), S = We("contrast"), x = We("grayscale"), A = We("hueRotate"), v = We("invert"), N = We("gap"), q = We("gradientColorStops"), H = We("gradientColorStopPositions"), B = We("inset"), j = We("margin"), Q = We("opacity"), Z = We("padding"), ae = We("saturate"), ie = We("scale"), W = We("sepia"), se = We("skew"), ee = We("space"), he = We("translate"), Fe = () => ["auto", "contain", "none"], _e = () => ["auto", "hidden", "clip", "visible", "scroll"], ze = () => ["auto", ve, r], I = () => [ve, r], bt = () => ["", Cl, ma], ot = () => ["auto", uu, ve], Ke = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], V = () => ["solid", "dashed", "dotted", "double", "none"], ue = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], re = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], Se = () => ["", "0", ve], Ee = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], et = () => [uu, ve];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [pr],
      spacing: [Cl, ma],
      blur: ["none", "", pa, ve],
      brightness: et(),
      borderColor: [u],
      borderRadius: ["none", "", "full", pa, ve],
      borderSpacing: I(),
      borderWidth: bt(),
      contrast: et(),
      grayscale: Se(),
      hueRotate: et(),
      invert: Se(),
      gap: I(),
      gradientColorStops: [u],
      gradientColorStopPositions: [hT, ma],
      inset: ze(),
      margin: ze(),
      opacity: et(),
      padding: I(),
      saturate: et(),
      scale: et(),
      sepia: Se(),
      skew: et(),
      space: I(),
      translate: I()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", ve]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [pa]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": Ee()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": Ee()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...Ke(), ve]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: _e()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": _e()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": _e()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: Fe()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": Fe()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": Fe()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [B]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [B]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [B]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [B]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [B]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [B]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [B]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [B]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [B]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", mr, ve]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: ze()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", ve]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: Se()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: Se()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", mr, ve]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [pr]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", mr, ve]
        }, ve]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": ot()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": ot()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [pr]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [mr, ve]
        }, ve]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": ot()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": ot()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", ve]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", ve]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [N]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [N]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [N]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...re()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...re(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...re(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [Z]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [Z]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [Z]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [Z]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [Z]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [Z]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [Z]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [Z]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [Z]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [j]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [j]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [j]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [j]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [j]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [j]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [j]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [j]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [j]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [ee]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [ee]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", ve, r]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [ve, r, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [ve, r, "none", "full", "min", "max", "fit", "prose", {
          screen: [pa]
        }, pa]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [ve, r, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [ve, r, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [ve, r, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [ve, r, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", pa, ma]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", od]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [pr]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", ve]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", uu, od]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", Cl, ve]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", ve]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", ve]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [u]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [Q]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [u]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [Q]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...V(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", Cl, ma]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", Cl, ve]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [u]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: I()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", ve]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", ve]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [Q]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...Ke(), gT]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", pT]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, yT]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [u]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [H]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [H]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [H]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [q]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [q]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [q]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [d]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [d]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [d]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [d]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [d]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [d]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [d]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [d]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [d]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [d]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [d]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [d]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [d]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [d]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [d]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [p]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [p]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [p]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [p]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [p]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [p]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [p]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [p]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [p]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [Q]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...V(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [p]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [p]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [Q]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: V()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [f]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [f]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [f]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [f]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [f]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [f]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [f]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [f]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [f]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [f]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...V()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [Cl, ve]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [Cl, ma]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [u]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: bt()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [u]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [Q]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [Cl, ma]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [u]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", pa, bT]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [pr]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [Q]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...ue(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": ue()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [o]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [c]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [S]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", pa, ve]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [x]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [A]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [v]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [ae]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [W]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [o]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [c]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [S]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [x]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [A]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [v]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [Q]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [ae]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [W]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [m]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [m]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [m]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", ve]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: et()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", ve]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: et()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", ve]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [ie]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [ie]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [ie]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [mr, ve]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [he]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [he]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [se]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [se]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", ve]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", u]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", ve]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [u]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": I()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": I()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": I()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": I()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": I()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": I()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": I()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": I()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": I()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": I()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": I()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": I()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": I()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": I()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": I()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": I()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": I()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": I()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", ve]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [u, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [Cl, ma, od]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [u, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, _T = /* @__PURE__ */ iT(xT);
function Dl(...u) {
  return _T(Yy(u));
}
const AT = zE, OT = ME, Ky = z.forwardRef(({ className: u, ...r }, o) => /* @__PURE__ */ y.jsx(
  jy,
  {
    ref: o,
    className: Dl(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      u
    ),
    ...r
  }
));
Ky.displayName = jy.displayName;
const Jy = z.forwardRef(({ className: u, children: r, closeLabel: o = "Close", ...c }, f) => /* @__PURE__ */ y.jsxs(OT, { children: [
  /* @__PURE__ */ y.jsx(Ky, {}),
  /* @__PURE__ */ y.jsxs(
    Uy,
    {
      ref: f,
      className: Dl(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        u
      ),
      ...c,
      children: [
        r,
        /* @__PURE__ */ y.jsxs(YE, { "aria-label": o, title: o, className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ y.jsx(ZE, { className: "h-4 w-4" }),
          /* @__PURE__ */ y.jsx("span", { className: "sr-only", children: o })
        ] })
      ]
    }
  )
] }));
Jy.displayName = Uy.displayName;
const $y = z.forwardRef(({ className: u, ...r }, o) => /* @__PURE__ */ y.jsx(
  Ly,
  {
    ref: o,
    className: Dl(
      "text-lg font-semibold leading-none tracking-tight",
      u
    ),
    ...r
  }
));
$y.displayName = Ly.displayName;
const RT = z.forwardRef(({ className: u, ...r }, o) => /* @__PURE__ */ y.jsx(
  Hy,
  {
    ref: o,
    className: Dl("text-sm text-muted-foreground", u),
    ...r
  }
));
RT.displayName = Hy.displayName;
const bv = (u) => typeof u == "boolean" ? `${u}` : u === 0 ? "0" : u, Sv = Yy, Iy = (u, r) => (o) => {
  var c;
  if (r?.variants == null) return Sv(u, o?.class, o?.className);
  const { variants: f, defaultVariants: d } = r, m = Object.keys(f).map((x) => {
    const A = o?.[x], v = d?.[x];
    if (A === null) return null;
    const N = bv(A) || bv(v);
    return f[x][N];
  }), p = o && Object.entries(o).reduce((x, A) => {
    let [v, N] = A;
    return N === void 0 || (x[v] = N), x;
  }, {}), S = r == null || (c = r.compoundVariants) === null || c === void 0 ? void 0 : c.reduce((x, A) => {
    let { class: v, className: N, ...q } = A;
    return Object.entries(q).every((H) => {
      let [B, j] = H;
      return Array.isArray(j) ? j.includes({
        ...d,
        ...p
      }[B]) : {
        ...d,
        ...p
      }[B] === j;
    }) ? [
      ...x,
      v,
      N
    ] : x;
  }, []);
  return Sv(u, m, S, o?.class, o?.className);
}, Fy = Iy(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), ke = z.forwardRef(
  ({ className: u, variant: r, size: o, asChild: c = !1, ...f }, d) => {
    const m = c ? b1 : "button";
    return /* @__PURE__ */ y.jsx(
      m,
      {
        className: Dl(Fy({ variant: r, size: o, className: u })),
        ref: d,
        ...f
      }
    );
  }
);
ke.displayName = "Button";
const ba = z.forwardRef(
  ({ className: u, type: r, ...o }, c) => /* @__PURE__ */ y.jsx(
    "input",
    {
      type: r,
      className: Dl(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        u
      ),
      ref: c,
      ...o
    }
  )
);
ba.displayName = "Input";
const CT = z.memo(function() {
  return /* @__PURE__ */ y.jsxs("div", { id: "stage", children: [
    /* @__PURE__ */ y.jsxs("div", { id: "character", children: [
      /* @__PURE__ */ y.jsx("div", { id: "scene-background", "aria-hidden": "true" }),
      /* @__PURE__ */ y.jsx("video", { id: "layer-a", className: "char-layer", autoPlay: !0, muted: !0, loop: !0, playsInline: !0 }),
      /* @__PURE__ */ y.jsx("video", { id: "layer-b", className: "char-layer", autoPlay: !0, muted: !0, loop: !0, playsInline: !0 }),
      /* @__PURE__ */ y.jsx("img", { id: "layer-img", className: "char-layer", alt: "" }),
      /* @__PURE__ */ y.jsxs("div", { id: "placeholder", className: "hidden", children: [
        /* @__PURE__ */ y.jsx("svg", { viewBox: "0 0 200 260", "aria-hidden": "true", children: /* @__PURE__ */ y.jsx("path", { d: "M100 20a52 52 0 1 1 0 104 52 52 0 0 1 0-104zM30 260c0-62 31-100 70-100s70 38 70 100z" }) }),
        /* @__PURE__ */ y.jsxs("div", { id: "placeholder-text", children: [
          "No art yet — press ",
          /* @__PURE__ */ y.jsx("b", { children: "E" }),
          " for the image prompt"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ y.jsx("div", { id: "vignette" }),
    /* @__PURE__ */ y.jsxs("header", { id: "topbar", children: [
      /* @__PURE__ */ y.jsxs("div", { id: "title", children: [
        "◇ ",
        "DSH-GAL ",
        /* @__PURE__ */ y.jsx("span", { id: "conn-dot", title: "disconnected" })
      ] }),
      /* @__PURE__ */ y.jsxs("div", { className: "app-controls", children: [
        /* @__PURE__ */ y.jsx(ke, { id: "btn-help", type: "button", "data-ui-text": "help", variant: "ghost", "data-slot": "button", children: "帮助" }),
        /* @__PURE__ */ y.jsx(ke, { type: "button", id: "btn-char", title: "Switch character (C)", variant: "ghost", "data-slot": "button", children: "CHAR" }),
        /* @__PURE__ */ y.jsx(ke, { type: "button", id: "btn-memory", title: "What I remember about you (M)", variant: "ghost", "data-slot": "button", children: "MEMORY" }),
        /* @__PURE__ */ y.jsx(ke, { type: "button", id: "btn-speech-settings", variant: "ghost", "data-slot": "button", children: "语音设置" }),
        /* @__PURE__ */ y.jsx(ke, { type: "button", id: "btn-hide", title: "Hide window (H / right-click)", variant: "ghost", "data-slot": "button", children: "HIDE" })
      ] })
    ] }),
    /* @__PURE__ */ y.jsx("div", { id: "ticker", className: "hidden", children: /* @__PURE__ */ y.jsx("span", { id: "ticker-text" }) }),
    /* @__PURE__ */ y.jsxs("div", { id: "dialogue", children: [
      /* @__PURE__ */ y.jsxs("div", { id: "msgbox", children: [
        /* @__PURE__ */ y.jsxs("div", { id: "nameplate", children: [
          /* @__PURE__ */ y.jsx("span", { id: "char-name", children: "小黑鱼" }),
          /* @__PURE__ */ y.jsx("span", { id: "emotion-tag" })
        ] }),
        /* @__PURE__ */ y.jsx("div", { id: "text-window", tabIndex: 0, children: /* @__PURE__ */ y.jsx("p", { id: "dialogue-text" }) }),
        /* @__PURE__ */ y.jsxs("div", { id: "message-tools", "aria-label": "当前消息操作", children: [
          /* @__PURE__ */ y.jsx(ke, { type: "button", id: "btn-skip", hidden: !0, variant: "ghost", "data-slot": "button", children: "回到最新" }),
          /* @__PURE__ */ y.jsx(ke, { type: "button", id: "btn-replay", disabled: !0, variant: "ghost", "data-slot": "button", children: "重读本段" }),
          /* @__PURE__ */ y.jsx(ke, { type: "button", id: "btn-stop-voice", disabled: !0, variant: "ghost", "data-slot": "button", children: "停止朗读" }),
          /* @__PURE__ */ y.jsx("div", { id: "voice-feedback", role: "status", "aria-live": "polite" })
        ] }),
        /* @__PURE__ */ y.jsxs("div", { id: "box-bottom", children: [
          /* @__PURE__ */ y.jsxs("form", { id: "input-row", autoComplete: "off", children: [
            /* @__PURE__ */ y.jsx(ba, { id: "input", type: "text", placeholder: "Say something… (/help for commands)", spellCheck: !1 }),
            /* @__PURE__ */ y.jsx(ke, { id: "btn-send", type: "submit", variant: "default", "data-slot": "button", children: "SEND" })
          ] }),
          /* @__PURE__ */ y.jsx("nav", { id: "menu-row", "aria-label": "对话与应用控制", children: /* @__PURE__ */ y.jsx("div", { className: "conversation-controls", children: /* @__PURE__ */ y.jsx(ke, { type: "button", id: "btn-history", title: "Backlog (L)", variant: "ghost", "data-slot": "button", children: "LOG" }) }) }),
          /* @__PURE__ */ y.jsx("div", { id: "ui-notice", role: "status", "aria-live": "polite" }),
          /* @__PURE__ */ y.jsx("span", { id: "language-hint", className: "sr-only" })
        ] })
      ] }),
      /* @__PURE__ */ y.jsxs("div", { id: "last-user", className: "hidden", children: [
        /* @__PURE__ */ y.jsx("span", { className: "you-label", children: "You" }),
        /* @__PURE__ */ y.jsx("span", { id: "last-user-text" })
      ] })
    ] }),
    /* @__PURE__ */ y.jsx(ke, { id: "btn-restore", type: "button", "data-ui-text": "restore", variant: "ghost", "data-slot": "button", children: "返回对话" })
  ] });
}), lu = z.forwardRef(({ className: u, ...r }, o) => /* @__PURE__ */ y.jsx(
  "textarea",
  {
    className: Dl(
      "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      u
    ),
    ref: o,
    ...r
  }
));
lu.displayName = "Textarea";
var NT = Object.defineProperty, wT = (u, r) => NT(u, "name", { value: r, configurable: !0 }), zT = /* @__PURE__ */ z.forwardRef(
  /* @__PURE__ */ wT(function(r, o) {
    return /* @__PURE__ */ y.jsx(
      Ea.label,
      {
        ...r,
        ref: o,
        onMouseDown: (c) => {
          c.target.closest("button, input, select, textarea") || (r.onMouseDown?.(c), !c.defaultPrevented && c.detail > 1 && c.preventDefault());
        }
      }
    );
  }, "Label")
), Py = zT;
const DT = Iy(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
), _t = z.forwardRef(({ className: u, ...r }, o) => /* @__PURE__ */ y.jsx(
  Py,
  {
    ref: o,
    className: Dl(DT(), u),
    ...r
  }
));
_t.displayName = Py.displayName;
const wl = z.forwardRef(({ className: u, ...r }, o) => /* @__PURE__ */ y.jsx("select", { ref: o, "data-slot": "native-select", className: Dl("flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50", u), ...r }));
wl.displayName = "NativeSelect";
const MT = z.memo(function() {
  return /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
    /* @__PURE__ */ y.jsxs("div", { className: "overlay-head", children: [
      /* @__PURE__ */ y.jsx("span", { id: "character-hub-title", "data-layout-text": "character", children: "角色" }),
      /* @__PURE__ */ y.jsx(ke, { type: "button", className: "overlay-close", "data-layout-text": "close", hidden: !0, variant: "ghost", "data-slot": "button", children: "关闭 / ESC" })
    ] }),
    /* @__PURE__ */ y.jsxs("nav", { className: "character-tabs", "aria-label": "角色管理", children: [
      /* @__PURE__ */ y.jsx(ke, { type: "button", id: "btn-character-select", "data-character-view": "char-picker", "data-layout-text": "choose", variant: "ghost", "data-slot": "button", children: "选择角色" }),
      /* @__PURE__ */ y.jsx(ke, { type: "button", id: "btn-gallery", "data-character-view": "gallery", title: "Sprites & loops (G)", variant: "ghost", "data-slot": "button", children: "GALLERY" }),
      /* @__PURE__ */ y.jsx(ke, { type: "button", id: "btn-edit", "data-character-view": "editor", title: "Persona (E)", variant: "ghost", "data-slot": "button", children: "EDIT" })
    ] }),
    /* @__PURE__ */ y.jsx("div", { className: "character-display-settings", children: /* @__PURE__ */ y.jsxs(_t, { className: "language-control", children: [
      /* @__PURE__ */ y.jsx("span", { "data-ui-text": "state", children: "表情预览" }),
      /* @__PURE__ */ y.jsxs(wl, { id: "character-state-preview", "aria-label": "state", children: [
        /* @__PURE__ */ y.jsx("option", { value: "auto", children: "跟随对话" }),
        /* @__PURE__ */ y.jsx("option", { value: "neutral", children: "待机" }),
        /* @__PURE__ */ y.jsx("option", { value: "thinking", children: "思考" }),
        /* @__PURE__ */ y.jsx("option", { value: "happy", children: "开心" }),
        /* @__PURE__ */ y.jsx("option", { value: "sad", children: "悲伤" }),
        /* @__PURE__ */ y.jsx("option", { value: "surprised", children: "惊讶" }),
        /* @__PURE__ */ y.jsx("option", { value: "excited", children: "兴奋" })
      ] })
    ] }) }),
    /* @__PURE__ */ y.jsxs("div", { id: "char-picker", className: "character-view hidden", children: [
      /* @__PURE__ */ y.jsx("div", { id: "char-picker-head", children: "Character" }),
      /* @__PURE__ */ y.jsx("div", { id: "char-list" }),
      /* @__PURE__ */ y.jsxs("div", { id: "char-picker-foot", children: [
        /* @__PURE__ */ y.jsx(ke, { type: "button", id: "btn-import", title: "Import a character pack (.zip)", "data-ui-text": "import", variant: "ghost", "data-slot": "button", children: "Import pack…" }),
        /* @__PURE__ */ y.jsx(ke, { type: "button", id: "btn-export", title: "Download the current pack as .zip (memory stays local)", "data-ui-text": "export", variant: "ghost", "data-slot": "button", children: "Export pack" }),
        /* @__PURE__ */ y.jsx("input", { id: "import-file", type: "file", accept: ".zip,application/zip", hidden: !0 })
      ] })
    ] }),
    /* @__PURE__ */ y.jsxs("div", { id: "editor", className: "character-view hidden", children: [
      /* @__PURE__ */ y.jsxs("div", { className: "overlay-head", children: [
        /* @__PURE__ */ y.jsx("span", { id: "editor-title", children: "Character" }),
        /* @__PURE__ */ y.jsx(ke, { type: "button", className: "overlay-close", "data-close": "editor", hidden: !0, variant: "ghost", "data-slot": "button", children: "Close" })
      ] }),
      /* @__PURE__ */ y.jsxs("form", { id: "editor-form", className: "overlay-body", children: [
        /* @__PURE__ */ y.jsxs(_t, { children: [
          /* @__PURE__ */ y.jsx("span", { "data-ui-text": "ed-name", children: "名字" }),
          /* @__PURE__ */ y.jsx(ba, { id: "ed-name", type: "text", spellCheck: !1 })
        ] }),
        /* @__PURE__ */ y.jsxs(_t, { children: [
          /* @__PURE__ */ y.jsx("span", { "data-ui-text": "ed-greeting", children: "开场白" }),
          /* @__PURE__ */ y.jsx(lu, { id: "ed-greeting", rows: 2 })
        ] }),
        /* @__PURE__ */ y.jsxs(_t, { children: [
          /* @__PURE__ */ y.jsx("span", { "data-ui-text": "ed-persona", children: "人设" }),
          /* @__PURE__ */ y.jsx(lu, { id: "ed-persona", rows: 8 })
        ] }),
        /* @__PURE__ */ y.jsxs("div", { id: "ed-art", className: "hidden", children: [
          /* @__PURE__ */ y.jsxs("div", { className: "ed-art-head", children: [
            "This pack has no images yet. Generate them with any image model and drop six files into ",
            /* @__PURE__ */ y.jsx("code", { id: "ed-art-dir" }),
            ": neutral, happy, thinking, surprised, sad, excited (.png), optionally .mp4 loops with the same names."
          ] }),
          /* @__PURE__ */ y.jsxs(_t, { children: [
            "Base image prompt (neutral) ",
            /* @__PURE__ */ y.jsx(lu, { id: "ed-art-base", rows: 4, readOnly: !0 })
          ] }),
          /* @__PURE__ */ y.jsxs(_t, { children: [
            "Expression deltas (edit the base image with each) ",
            /* @__PURE__ */ y.jsx(lu, { id: "ed-art-expr", rows: 5, readOnly: !0 })
          ] }),
          /* @__PURE__ */ y.jsxs(_t, { children: [
            "Motion prompt (image-to-video) ",
            /* @__PURE__ */ y.jsx(lu, { id: "ed-art-motion", rows: 2, readOnly: !0 })
          ] })
        ] }),
        /* @__PURE__ */ y.jsxs(_t, { children: [
          /* @__PURE__ */ y.jsx("span", { "data-ui-text": "ed-rate", children: "立绘动画速度" }),
          /* @__PURE__ */ y.jsx(ba, { id: "ed-rate", type: "number", min: "0.25", max: "4", step: "0.05" })
        ] }),
        /* @__PURE__ */ y.jsxs(_t, { hidden: !0, children: [
          "Voice — VOICEVOX speaker style (",
          /* @__PURE__ */ y.jsx("span", { id: "ed-voice-state", children: "checking…" }),
          ") ",
          /* @__PURE__ */ y.jsx(wl, { id: "ed-voice" })
        ] }),
        /* @__PURE__ */ y.jsxs("div", { className: "overlay-actions", children: [
          /* @__PURE__ */ y.jsx("span", { id: "ed-path", className: "dim" }),
          /* @__PURE__ */ y.jsx(ke, { type: "submit", id: "ed-save", "data-ui-text": "save", variant: "default", "data-slot": "button", children: "SAVE" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ y.jsxs("div", { id: "gallery", className: "character-view hidden", children: [
      /* @__PURE__ */ y.jsxs("div", { className: "overlay-head", children: [
        /* @__PURE__ */ y.jsx("span", { id: "gallery-title", children: "Gallery" }),
        /* @__PURE__ */ y.jsx(ke, { type: "button", className: "overlay-close", "data-close": "gallery", hidden: !0, variant: "ghost", "data-slot": "button", children: "Close" })
      ] }),
      /* @__PURE__ */ y.jsx("div", { id: "gallery-grid", className: "overlay-body" }),
      /* @__PURE__ */ y.jsx("div", { id: "gallery-hint", className: "dim", "data-ui-text": "galleryHint", children: "Click a tile to show that expression on stage. Drop a .png / .mp4 onto a tile, or use its ↑ button, to replace that expression. Files live in the pack directory shown in EDIT." }),
      /* @__PURE__ */ y.jsx("input", { id: "asset-file", type: "file", accept: ".png,.webp,.jpg,.jpeg,.mp4,.webm,image/png,image/webp,image/jpeg,video/mp4,video/webm", hidden: !0 })
    ] })
  ] });
}), jT = z.memo(function() {
  return /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
    /* @__PURE__ */ y.jsxs("div", { className: "overlay-head", children: [
      /* @__PURE__ */ y.jsx("span", { id: "speech-title", "data-speech-text": "title", children: "语音设置" }),
      /* @__PURE__ */ y.jsx(ke, { type: "button", className: "overlay-close", "data-close": "speech-panel", "data-speech-text": "cancel", hidden: !0, variant: "ghost", "data-slot": "button", children: "关闭 / ESC" })
    ] }),
    /* @__PURE__ */ y.jsxs("div", { className: "overlay-body", children: [
      /* @__PURE__ */ y.jsxs("div", { className: "general-settings", "data-section": "general", children: [
        /* @__PURE__ */ y.jsxs("div", { className: "language-settings", children: [
          /* @__PURE__ */ y.jsxs(_t, { className: "language-control", children: [
            /* @__PURE__ */ y.jsx("span", { id: "language-label", children: "界面语言" }),
            /* @__PURE__ */ y.jsxs(wl, { id: "gal-language", "aria-describedby": "language-hint", children: [
              /* @__PURE__ */ y.jsx("option", { value: "auto", children: "自动" }),
              /* @__PURE__ */ y.jsx("option", { value: "zh", children: "中文" }),
              /* @__PURE__ */ y.jsx("option", { value: "ja", children: "日本語" }),
              /* @__PURE__ */ y.jsx("option", { value: "en", children: "English" })
            ] })
          ] }),
          /* @__PURE__ */ y.jsxs(_t, { className: "language-control", children: [
            /* @__PURE__ */ y.jsx("span", { id: "speech-language-label", children: "语音语言" }),
            /* @__PURE__ */ y.jsxs(wl, { id: "gal-speech-language", "aria-describedby": "language-hint", children: [
              /* @__PURE__ */ y.jsx("option", { value: "auto", children: "自动" }),
              /* @__PURE__ */ y.jsx("option", { value: "zh", children: "中文" }),
              /* @__PURE__ */ y.jsx("option", { value: "ja", children: "日本語" }),
              /* @__PURE__ */ y.jsx("option", { value: "en", children: "English" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ y.jsx(ke, { type: "button", id: "btn-voice", title: "Voice on/off (V)", variant: "ghost", "data-slot": "button", children: "VOICE" })
      ] }),
      /* @__PURE__ */ y.jsx("p", { className: "speech-intro", "data-speech-text": "choose" }),
      /* @__PURE__ */ y.jsxs("form", { id: "speech-form", children: [
        /* @__PURE__ */ y.jsxs("div", { className: "speech-grid", children: [
          /* @__PURE__ */ y.jsxs(_t, { children: [
            /* @__PURE__ */ y.jsx("span", { "data-speech-text": "language" }),
            /* @__PURE__ */ y.jsxs(wl, { id: "speech-edit-language", children: [
              /* @__PURE__ */ y.jsx("option", { value: "zh", children: "中文" }),
              /* @__PURE__ */ y.jsx("option", { value: "en", children: "English" }),
              /* @__PURE__ */ y.jsx("option", { value: "ja", children: "日本語" })
            ] })
          ] }),
          /* @__PURE__ */ y.jsxs(_t, { children: [
            /* @__PURE__ */ y.jsx("span", { "data-speech-text": "provider" }),
            /* @__PURE__ */ y.jsx(wl, { id: "speech-provider" })
          ] }),
          /* @__PURE__ */ y.jsxs(_t, { children: [
            /* @__PURE__ */ y.jsx("span", { "data-speech-text": "model" }),
            /* @__PURE__ */ y.jsx(wl, { id: "speech-model" })
          ] }),
          /* @__PURE__ */ y.jsxs(_t, { children: [
            /* @__PURE__ */ y.jsx("span", { "data-speech-text": "voice" }),
            /* @__PURE__ */ y.jsx(ba, { id: "speech-voice", required: !0, maxLength: 160, autoComplete: "off", spellCheck: !1 }),
            /* @__PURE__ */ y.jsx(wl, { id: "speech-local-voice", hidden: !0 }),
            /* @__PURE__ */ y.jsx(ke, { id: "speech-refresh-voices", type: "button", variant: "ghost", hidden: !0, "data-speech-text": "refreshVoices" }),
            /* @__PURE__ */ y.jsx("span", { id: "speech-voices-status", role: "status", "aria-live": "polite" })
          ] })
        ] }),
        /* @__PURE__ */ y.jsx("p", { id: "speech-description" }),
        /* @__PURE__ */ y.jsx("p", { id: "speech-voice-hint", className: "speech-muted", "data-speech-text": "voiceHint" }),
        /* @__PURE__ */ y.jsx("a", { id: "speech-docs", target: "_blank", rel: "noopener noreferrer", "data-speech-text": "docs" }),
        /* @__PURE__ */ y.jsxs("div", { id: "speech-key-fields", children: [
          /* @__PURE__ */ y.jsxs(_t, { children: [
            /* @__PURE__ */ y.jsx("span", { "data-speech-text": "key" }),
            /* @__PURE__ */ y.jsx(ba, { id: "speech-key", type: "password", autoComplete: "new-password", maxLength: 4096, spellCheck: !1 })
          ] }),
          /* @__PURE__ */ y.jsx("p", { className: "speech-muted", "data-speech-text": "keyHint" }),
          /* @__PURE__ */ y.jsxs(_t, { className: "speech-checkbox", children: [
            /* @__PURE__ */ y.jsx(ba, { id: "speech-clear-key", type: "checkbox", className: "native-checkbox" }),
            /* @__PURE__ */ y.jsx("span", { "data-speech-text": "clear" })
          ] })
        ] }),
        /* @__PURE__ */ y.jsx("p", { className: "speech-muted", "data-speech-text": "discard" }),
        /* @__PURE__ */ y.jsxs("div", { className: "speech-actions", children: [
          /* @__PURE__ */ y.jsx(ke, { id: "speech-test", type: "button", "data-speech-text": "test", variant: "ghost", "data-slot": "button" }),
          /* @__PURE__ */ y.jsx(ke, { id: "speech-stop", type: "button", disabled: !0, "data-speech-text": "stop", variant: "ghost", "data-slot": "button" }),
          /* @__PURE__ */ y.jsx(ke, { id: "speech-save", type: "submit", "data-speech-text": "save", variant: "default", "data-slot": "button" })
        ] })
      ] }),
      /* @__PURE__ */ y.jsx("p", { id: "speech-status", role: "status", "aria-live": "polite" })
    ] })
  ] });
}), UT = z.memo(function() {
  return /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
    /* @__PURE__ */ y.jsxs("div", { className: "overlay-head", children: [
      /* @__PURE__ */ y.jsx("span", { id: "memory-title", "data-ui-text": "memory-title", children: "记忆" }),
      /* @__PURE__ */ y.jsx(ke, { type: "button", className: "overlay-close", "data-close": "memory-panel", hidden: !0, variant: "ghost", "data-slot": "button", children: "关闭 / ESC" })
    ] }),
    /* @__PURE__ */ y.jsxs("div", { className: "overlay-body", children: [
      /* @__PURE__ */ y.jsx("p", { id: "memory-hint", className: "dim", "data-ui-text": "memory-hint", children: "这些是关于你的笔记，所有角色共用，换角色也不会丢。" }),
      /* @__PURE__ */ y.jsx("div", { id: "mem-list" }),
      /* @__PURE__ */ y.jsx("p", { id: "mem-empty", className: "dim hidden", "data-ui-text": "memory-empty", children: "还没有记住任何事。" }),
      /* @__PURE__ */ y.jsxs("form", { id: "memory-add", className: "overlay-actions", children: [
        /* @__PURE__ */ y.jsx(ba, { id: "mem-new", type: "text", "data-ui-placeholder": "memory-add", placeholder: "记住一件事…", spellCheck: !1 }),
        /* @__PURE__ */ y.jsx(ke, { type: "submit", id: "mem-add", "data-ui-text": "memory-add-button", variant: "default", "data-slot": "button", children: "ADD" })
      ] })
    ] })
  ] });
}), kT = z.memo(function() {
  return /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
    /* @__PURE__ */ y.jsxs("div", { className: "overlay-head", children: [
      /* @__PURE__ */ y.jsx("span", { id: "help-title", children: "命令与快捷键" }),
      /* @__PURE__ */ y.jsx(ke, { type: "button", className: "overlay-close", "data-close": "help-panel", hidden: !0, variant: "ghost", "data-slot": "button", children: "关闭 / ESC" })
    ] }),
    /* @__PURE__ */ y.jsxs("div", { className: "overlay-body", children: [
      /* @__PURE__ */ y.jsx("div", { id: "help-list" }),
      /* @__PURE__ */ y.jsx("p", { id: "help-keys" })
    ] })
  ] });
}), LT = z.memo(function() {
  return /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
    /* @__PURE__ */ y.jsxs("div", { id: "history-head", children: [
      /* @__PURE__ */ y.jsx("span", { "data-ui-text": "history", children: "Backlog" }),
      /* @__PURE__ */ y.jsx(ke, { id: "btn-close-history", "data-ui-text": "close", hidden: !0, variant: "ghost", "data-slot": "button", children: "Close" })
    ] }),
    /* @__PURE__ */ y.jsx("div", { id: "history-list" })
  ] });
});
/*! @license DOMPurify 3.4.15 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.15/LICENSE */
function Ev(u, r) {
  (r == null || r > u.length) && (r = u.length);
  for (var o = 0, c = Array(r); o < r; o++) c[o] = u[o];
  return c;
}
function HT(u) {
  if (Array.isArray(u)) return u;
}
function BT(u, r) {
  var o = u == null ? null : typeof Symbol < "u" && u[Symbol.iterator] || u["@@iterator"];
  if (o != null) {
    var c, f, d, m, p = [], S = !0, x = !1;
    try {
      if (d = (o = o.call(u)).next, r !== 0) for (; !(S = (c = d.call(o)).done) && (p.push(c.value), p.length !== r); S = !0) ;
    } catch (A) {
      x = !0, f = A;
    } finally {
      try {
        if (!S && o.return != null && (m = o.return(), Object(m) !== m)) return;
      } finally {
        if (x) throw f;
      }
    }
    return p;
  }
}
function GT() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function YT(u, r) {
  return HT(u) || BT(u, r) || qT(u, r) || GT();
}
function qT(u, r) {
  if (u) {
    if (typeof u == "string") return Ev(u, r);
    var o = {}.toString.call(u).slice(8, -1);
    return o === "Object" && u.constructor && (o = u.constructor.name), o === "Map" || o === "Set" ? Array.from(u) : o === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? Ev(u, r) : void 0;
  }
}
const Wy = Object.entries, Tv = Object.setPrototypeOf, VT = Object.isFrozen, XT = Object.getPrototypeOf, QT = Object.getOwnPropertyDescriptor;
let yt = Object.freeze, Ot = Object.seal, au = Object.create, eb = typeof Reflect < "u" && Reflect, Rd = eb.apply, Cd = eb.construct;
yt || (yt = function(r) {
  return r;
});
Ot || (Ot = function(r) {
  return r;
});
Rd || (Rd = function(r, o) {
  for (var c = arguments.length, f = new Array(c > 2 ? c - 2 : 0), d = 2; d < c; d++)
    f[d - 2] = arguments[d];
  return r.apply(o, f);
});
Cd || (Cd = function(r) {
  for (var o = arguments.length, c = new Array(o > 1 ? o - 1 : 0), f = 1; f < o; f++)
    c[f - 1] = arguments[f];
  return new r(...c);
});
const Wa = gt(Array.prototype.forEach), ZT = gt(Array.prototype.lastIndexOf), xv = gt(Array.prototype.pop), gr = gt(Array.prototype.push), KT = gt(Array.prototype.splice), ru = Array.isArray, Sr = gt(String.prototype.toLowerCase), cd = gt(String.prototype.toString), _v = gt(String.prototype.match), vr = gt(String.prototype.replace), Av = gt(String.prototype.indexOf), JT = gt(String.prototype.trim), $T = gt(Number.prototype.toString), IT = gt(Boolean.prototype.toString), Ov = typeof BigInt > "u" ? null : gt(BigInt.prototype.toString), Rv = typeof Symbol > "u" ? null : gt(Symbol.prototype.toString), Wt = gt(Object.prototype.hasOwnProperty), yr = gt(Object.prototype.toString), Bt = gt(RegExp.prototype.test), Pa = FT(TypeError);
function gt(u) {
  return function(r) {
    r instanceof RegExp && (r.lastIndex = 0);
    for (var o = arguments.length, c = new Array(o > 1 ? o - 1 : 0), f = 1; f < o; f++)
      c[f - 1] = arguments[f];
    return Rd(u, r, c);
  };
}
function FT(u) {
  return function() {
    for (var r = arguments.length, o = new Array(r), c = 0; c < r; c++)
      o[c] = arguments[c];
    return Cd(u, o);
  };
}
function Me(u, r) {
  let o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Sr;
  if (Tv && Tv(u, null), !ru(r))
    return u;
  let c = r.length;
  for (; c--; ) {
    let f = r[c];
    if (typeof f == "string") {
      const d = o(f);
      d !== f && (VT(r) || (r[c] = d), f = d);
    }
    u[f] = !0;
  }
  return u;
}
function PT(u) {
  for (let r = 0; r < u.length; r++)
    Wt(u, r) || (u[r] = null);
  return u;
}
function mn(u) {
  const r = au(null);
  for (const c of Wy(u)) {
    var o = YT(c, 2);
    const f = o[0], d = o[1];
    Wt(u, f) && (ru(d) ? r[f] = PT(d) : d && typeof d == "object" && d.constructor === Object ? r[f] = mn(d) : r[f] = d);
  }
  return r;
}
function WT(u) {
  switch (typeof u) {
    case "string":
      return u;
    case "number":
      return $T(u);
    case "boolean":
      return IT(u);
    case "bigint":
      return Ov ? Ov(u) : "0";
    case "symbol":
      return Rv ? Rv(u) : "Symbol()";
    case "undefined":
      return yr(u);
    case "function":
    case "object": {
      if (u === null)
        return yr(u);
      const r = u, o = On(r, "toString");
      if (typeof o == "function") {
        const c = o(r);
        return typeof c == "string" ? c : yr(c);
      }
      return yr(u);
    }
    default:
      return yr(u);
  }
}
function On(u, r) {
  for (; u !== null; ) {
    const c = QT(u, r);
    if (c) {
      if (c.get)
        return gt(c.get);
      if (typeof c.value == "function")
        return gt(c.value);
    }
    u = XT(u);
  }
  function o() {
    return null;
  }
  return o;
}
function ex(u) {
  try {
    return Bt(u, ""), !0;
  } catch {
    return !1;
  }
}
const Cv = yt(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), sd = yt(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), fd = yt(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), tx = yt(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), dd = yt(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), nx = yt(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Nv = yt(["#text"]), wv = yt(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "command", "commandfor", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns"]), hd = yt(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dominant-baseline", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "pointer-events", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-orientation", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "vector-effect", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), zv = yt(["accent", "accentunder", "align", "bevelled", "close", "columnalign", "columnlines", "columnspacing", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lquote", "lspace", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), dc = yt(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), lx = Ot(/{{[\w\W]*|^[\w\W]*}}/g), ax = Ot(/<%[\w\W]*|^[\w\W]*%>/g), ix = Ot(/\${[\w\W]*/g), ux = Ot(/^data-[\-\w.\u00B7-\uFFFF]+$/), rx = Ot(/^aria-[\-\w]+$/), Dv = Ot(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), ox = Ot(/^(?:\w+script|data):/i), cx = Ot(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), sx = Ot(/^html$/i), fx = Ot(/^[a-z][.\w]*(-[.\w]+)+$/i), Mv = Ot(/<[/\w!]/g), jv = Ot(/<[/\w]/g), dx = Ot(/<\/no(script|embed|frames)/i), hx = Ot(/\/>/i), dn = {
  element: 1,
  attribute: 2,
  text: 3,
  cdataSection: 4,
  entityReference: 5,
  // Deprecated
  entityNode: 6,
  // Deprecated
  processingInstruction: 7,
  comment: 8,
  document: 9,
  documentType: 10,
  documentFragment: 11,
  notation: 12
  // Deprecated
}, tb = ["style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript"], mx = yt(Me({}, tb)), px = (function() {
  const u = {};
  return Wa(tb, (r) => {
    u[r] = Ot(new RegExp("</" + r + "(?=[\\t\\n\\f\\r />])", "i"));
  }), yt(u);
})(), gx = function() {
  return typeof window > "u" ? null : window;
}, vx = function(r, o) {
  if (typeof r != "object" || typeof r.createPolicy != "function")
    return null;
  let c = null;
  const f = "data-tt-policy-suffix";
  o && o.hasAttribute(f) && (c = o.getAttribute(f));
  const d = "dompurify" + (c ? "#" + c : "");
  try {
    return r.createPolicy(d, {
      createHTML(m) {
        return m;
      },
      createScriptURL(m) {
        return m;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + d + " could not be created."), null;
  }
}, Uv = function() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
}, ga = function(r, o, c, f) {
  return Wt(r, o) && ru(r[o]) ? Me(f.base ? mn(f.base) : {}, r[o], f.transform) : c;
}, md = function(r, o, c) {
  const f = Wt(r, o) ? r[o] : void 0;
  return f && typeof f == "object" ? mn(f) : c();
};
function nb() {
  let u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : gx();
  const r = (Y) => nb(Y);
  if (r.version = "3.4.15", r.removed = [], !u || !u.document || u.document.nodeType !== dn.document || !u.Element)
    return r.isSupported = !1, r;
  let o = u.document;
  const c = o, f = c.currentScript;
  u.DocumentFragment;
  const d = u.HTMLTemplateElement, m = u.Node, p = u.Element, S = u.NodeFilter, x = u.NamedNodeMap;
  x === void 0 && (u.NamedNodeMap || u.MozNamedAttrMap), u.HTMLFormElement;
  const A = u.DOMParser, v = u.trustedTypes, N = p.prototype, q = On(N, "cloneNode"), H = On(N, "remove"), B = On(N, "removeAttributeNode"), j = On(N, "nextSibling"), Q = On(N, "childNodes"), Z = On(N, "parentNode"), ae = On(N, "shadowRoot"), ie = On(N, "attributes"), W = m && m.prototype ? On(m.prototype, "nodeType") : null, se = m && m.prototype ? On(m.prototype, "nodeName") : null, ee = m && m.prototype ? On(m.prototype, "ownerDocument") : null, he = function(g) {
    return W ? W(g) : g.nodeType;
  }, Fe = function(g) {
    return se ? se(g) : g.nodeName;
  };
  if (typeof d == "function") {
    const Y = o.createElement("template");
    Y.content && Y.content.ownerDocument && (o = Y.content.ownerDocument);
  }
  let _e, ze = "", I, bt = !1, ot = 0;
  const Ke = function() {
    if (ot > 0)
      throw Pa('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.');
  }, V = function(g) {
    Ke(), ot++;
    try {
      return _e.createHTML(g);
    } finally {
      ot--;
    }
  }, ue = function(g) {
    Ke(), ot++;
    try {
      return _e.createScriptURL(g);
    } finally {
      ot--;
    }
  }, re = function() {
    return bt || (I = vx(v, f), bt = !0), I;
  }, Se = o, Ee = Se.implementation, et = Se.createNodeIterator, Nn = Se.createDocumentFragment, fl = Se.getElementsByTagName, T = c.importNode;
  let L = Uv();
  r.isSupported = typeof Wy == "function" && typeof Z == "function" && Ee && Ee.createHTMLDocument !== void 0;
  const te = lx, ne = ax, Re = ix, Ne = ux, De = rx, P = ox, fe = cx, wn = fx;
  let li = Dv, je = null;
  const Zt = Me({}, [...Cv, ...sd, ...fd, ...dd, ...Nv]);
  let me = null;
  const Le = Me({}, [...wv, ...hd, ...zv, ...dc]);
  let ct = Object.seal(au(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), zn = null, Dn = null;
  const en = Object.seal(au(null, {
    tagCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    }
  }));
  let Ta = !0, Qn = !0, ai = !1, xa = !0, pn = !1, Zn = !0, kt = !1, _a = !1, jl = null, ii = null, ui = !1, Kn = !1, Ul = !1, kl = !1, Nr = !0, wr = !1;
  const Lt = "user-content-";
  let mu = !0, ri = !1, dl = {}, Mn = null;
  const zr = Me({}, [
    "annotation-xml",
    "audio",
    "colgroup",
    "desc",
    "foreignobject",
    "head",
    "iframe",
    "math",
    "mi",
    "mn",
    "mo",
    "ms",
    "mtext",
    "noembed",
    "noframes",
    "noscript",
    "plaintext",
    "script",
    // <selectedcontent> mirrors the selected <option>'s subtree, cloned by
    // the UA (customizable <select>) — including any on* handlers — and the
    // engine re-mirrors synchronously whenever a removal changes which
    // option/selectedcontent is current, even inside DOMPurify's inert
    // DOMParser document. Hoisting its children on removal re-inserts a fresh
    // mirror target ahead of the walk, which the engine refills, looping
    // forever (DoS) and amplifying output. Dropping its content on removal
    // (rather than hoisting) breaks that cascade; the content is a duplicate
    // of the option, which is sanitized on its own. See campaign-3 F1/F6.
    "selectedcontent",
    "style",
    "svg",
    "template",
    "thead",
    "title",
    "video",
    "xmp"
  ]);
  let pu = null;
  const Dr = Me({}, ["audio", "video", "img", "source", "image", "track"]);
  let Mr = null;
  const Ll = Me({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), St = "http://www.w3.org/1998/Math/MathML", tn = "http://www.w3.org/2000/svg", tt = "http://www.w3.org/1999/xhtml";
  let Hl = tt, gu = !1, vu = null;
  const oi = Me({}, [St, tn, tt], cd), Aa = yt(["mi", "mo", "mn", "ms", "mtext"]);
  let Bl = Me({}, Aa);
  const Jn = yt(["annotation-xml"]);
  let Gl = Me({}, Jn);
  const Oa = Me({}, ["title", "style", "font", "a", "script"]);
  let Yl = null;
  const xc = ["application/xhtml+xml", "text/html"], jr = "text/html";
  let Pe = null, gn = null;
  const _c = o.createElement("form"), yu = function(g) {
    return g instanceof RegExp || g instanceof Function;
  }, ci = function() {
    let g = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (gn && gn === g)
      return;
    (!g || typeof g != "object") && (g = {}), g = mn(g), Yl = // eslint-disable-next-line unicorn/prefer-includes
    xc.indexOf(g.PARSER_MEDIA_TYPE) === -1 ? jr : g.PARSER_MEDIA_TYPE, Pe = Yl === "application/xhtml+xml" ? cd : Sr, je = ga(g, "ALLOWED_TAGS", Zt, {
      transform: Pe
    }), me = ga(g, "ALLOWED_ATTR", Le, {
      transform: Pe
    }), vu = ga(g, "ALLOWED_NAMESPACES", oi, {
      transform: cd
    }), Mr = ga(g, "ADD_URI_SAFE_ATTR", Ll, {
      transform: Pe,
      base: Ll
    }), pu = ga(g, "ADD_DATA_URI_TAGS", Dr, {
      transform: Pe,
      base: Dr
    }), Mn = ga(g, "FORBID_CONTENTS", zr, {
      transform: Pe
    }), zn = ga(g, "FORBID_TAGS", mn({}), {
      transform: Pe
    }), Dn = ga(g, "FORBID_ATTR", mn({}), {
      transform: Pe
    }), dl = Wt(g, "USE_PROFILES") ? g.USE_PROFILES && typeof g.USE_PROFILES == "object" ? mn(g.USE_PROFILES) : g.USE_PROFILES : !1, Ta = g.ALLOW_ARIA_ATTR !== !1, Qn = g.ALLOW_DATA_ATTR !== !1, ai = g.ALLOW_UNKNOWN_PROTOCOLS || !1, xa = g.ALLOW_SELF_CLOSE_IN_ATTR !== !1, pn = g.SAFE_FOR_TEMPLATES || !1, Zn = g.SAFE_FOR_XML !== !1, kt = g.WHOLE_DOCUMENT || !1, Kn = g.RETURN_DOM || !1, Ul = g.RETURN_DOM_FRAGMENT || !1, kl = g.RETURN_TRUSTED_TYPE || !1, ui = g.FORCE_BODY || !1, Nr = g.SANITIZE_DOM !== !1, wr = g.SANITIZE_NAMED_PROPS || !1, mu = g.KEEP_CONTENT !== !1, ri = g.IN_PLACE || !1, li = ex(g.ALLOWED_URI_REGEXP) ? g.ALLOWED_URI_REGEXP : Dv, Hl = typeof g.NAMESPACE == "string" ? g.NAMESPACE : tt, Bl = md(
      g,
      "MATHML_TEXT_INTEGRATION_POINTS",
      () => Me({}, Aa)
      // Default built-in map
    ), Gl = md(
      g,
      "HTML_INTEGRATION_POINTS",
      () => Me({}, Jn)
      // Default built-in map
    );
    const C = md(g, "CUSTOM_ELEMENT_HANDLING", () => au(null));
    if (ct = au(null), Wt(C, "tagNameCheck") && yu(C.tagNameCheck) && (ct.tagNameCheck = C.tagNameCheck), Wt(C, "attributeNameCheck") && yu(C.attributeNameCheck) && (ct.attributeNameCheck = C.attributeNameCheck), Wt(C, "allowCustomizedBuiltInElements") && typeof C.allowCustomizedBuiltInElements == "boolean" && (ct.allowCustomizedBuiltInElements = C.allowCustomizedBuiltInElements), Ot(ct), pn && (Qn = !1), Ul && (Kn = !0), dl && (je = Me({}, Nv), me = au(null), dl.html === !0 && (Me(je, Cv), Me(me, wv)), dl.svg === !0 && (Me(je, sd), Me(me, hd), Me(me, dc)), dl.svgFilters === !0 && (Me(je, fd), Me(me, hd), Me(me, dc)), dl.mathMl === !0 && (Me(je, dd), Me(me, zv), Me(me, dc))), en.tagCheck = null, en.attributeCheck = null, Wt(g, "ADD_TAGS") && (typeof g.ADD_TAGS == "function" ? en.tagCheck = g.ADD_TAGS : ru(g.ADD_TAGS) && (je === Zt && (je = mn(je)), Me(je, g.ADD_TAGS, Pe))), Wt(g, "ADD_ATTR") && (typeof g.ADD_ATTR == "function" ? en.attributeCheck = g.ADD_ATTR : ru(g.ADD_ATTR) && (me === Le && (me = mn(me)), Me(me, g.ADD_ATTR, Pe))), Wt(g, "ADD_FORBID_CONTENTS") && ru(g.ADD_FORBID_CONTENTS) && (Mn === zr && (Mn = mn(Mn)), Me(Mn, g.ADD_FORBID_CONTENTS, Pe)), mu && (je["#text"] = !0), kt && Me(je, ["html", "head", "body"]), je.table && (Me(je, ["tbody"]), delete zn.tbody), g.TRUSTED_TYPES_POLICY) {
      if (typeof g.TRUSTED_TYPES_POLICY.createHTML != "function")
        throw Pa('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      if (typeof g.TRUSTED_TYPES_POLICY.createScriptURL != "function")
        throw Pa('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      const G = _e;
      _e = g.TRUSTED_TYPES_POLICY;
      try {
        ze = V("");
      } catch (K) {
        throw _e = G, K;
      }
    } else g.TRUSTED_TYPES_POLICY === null ? (_e = void 0, ze = "") : (_e === void 0 && (_e = re()), _e && typeof ze == "string" && (ze = V("")));
    yt && yt(g), gn = g;
  }, bu = Me({}, [...sd, ...fd, ...tx]), si = Me({}, [...dd, ...nx]), Su = function(g, C, G) {
    return C.namespaceURI === tt ? g === "svg" : C.namespaceURI === St ? g === "svg" && (G === "annotation-xml" || Bl[G]) : !!bu[g];
  }, Ur = function(g, C, G) {
    return C.namespaceURI === tt ? g === "math" : C.namespaceURI === tn ? g === "math" && Gl[G] : !!si[g];
  }, kr = function(g, C, G) {
    return C.namespaceURI === tn && !Gl[G] || C.namespaceURI === St && !Bl[G] ? !1 : !si[g] && (Oa[g] || !bu[g]);
  }, jn = function(g) {
    let C = Z(g);
    (!C || !C.tagName) && (C = {
      namespaceURI: Hl,
      tagName: "template"
    });
    const G = Sr(g.tagName), K = Sr(C.tagName);
    return vu[g.namespaceURI] ? g.namespaceURI === tn ? Su(G, C, K) : g.namespaceURI === St ? Ur(G, C, K) : g.namespaceURI === tt ? kr(G, C, K) : !!(Yl === "application/xhtml+xml" && vu[g.namespaceURI]) : !1;
  }, Je = function(g) {
    gr(r.removed, {
      element: g
    });
    try {
      Z(g).removeChild(g);
    } catch {
      if (H(g), !Z(g))
        throw Pa("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
    }
  }, Rt = function(g, C, G) {
    try {
      B(g, C);
    } catch {
      try {
        g.removeAttribute(G);
      } catch {
      }
    }
  }, Un = function(g) {
    fi(g);
    const C = Q(g);
    if (C) {
      const K = [];
      Wa(C, (J) => {
        gr(K, J);
      }), Wa(K, (J) => {
        try {
          H(J);
        } catch {
        }
      });
    }
    const G = ie(g);
    if (G)
      for (let K = G.length - 1; K >= 0; --K) {
        const J = G[K], oe = J && J.name;
        typeof oe == "string" && Rt(g, J, oe);
      }
  }, $n = function(g, C, G) {
    if (!G)
      try {
        G = C.getAttributeNode(g);
      } catch {
        G = null;
      }
    gr(r.removed, {
      attribute: G || null,
      from: C
    });
    try {
      G ? B(C, G) : C.removeAttribute(g);
    } catch {
      try {
        C.removeAttribute(g);
      } catch {
      }
    }
    if (g === "is")
      if (Kn || Ul)
        try {
          Je(C);
        } catch {
        }
      else
        try {
          C.setAttribute(g, "");
        } catch {
        }
  }, Ac = function(g) {
    const C = ie(g);
    if (C)
      for (let G = C.length - 1; G >= 0; --G) {
        const K = C[G], J = K && K.name;
        typeof J != "string" || me[Pe(J)] || Rt(g, K, J);
      }
  }, fi = function(g) {
    const C = [g];
    for (; C.length > 0; ) {
      const G = C.pop();
      he(G) === dn.element && Ac(G);
      const J = Q(G);
      if (J)
        for (let oe = J.length - 1; oe >= 0; --oe)
          C.push(J[oe]);
    }
  }, Eu = function(g, C) {
    return Zn ? g === "patchsrc" ? !0 : g === "for" && C !== "label" && C !== "output" : !1;
  }, Ra = function(g) {
    if (!Zn)
      return;
    const C = [g];
    for (; C.length > 0; ) {
      const G = C.pop(), K = he(G);
      if (K === dn.processingInstruction || K === dn.comment && Bt(jv, G.data)) {
        try {
          H(G);
        } catch {
        }
        continue;
      }
      if (K === dn.element) {
        const oe = G, Be = Pe(Fe(G));
        try {
          oe.hasAttribute && oe.hasAttribute("patchsrc") && oe.removeAttribute("patchsrc"), oe.hasAttribute && oe.hasAttribute("for") && Eu("for", Be) && oe.removeAttribute("for");
        } catch {
        }
      }
      const J = Q(G);
      if (J)
        for (let oe = J.length - 1; oe >= 0; --oe)
          C.push(J[oe]);
    }
  }, Ca = function(g) {
    let C = null, G = null;
    if (ui)
      g = "<remove></remove>" + g;
    else {
      const oe = _v(g, /^[\r\n\t ]+/);
      G = oe && oe[0];
    }
    Yl === "application/xhtml+xml" && Hl === tt && (g = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + g + "</body></html>");
    const K = _e ? V(g) : g;
    if (Hl === tt)
      try {
        C = new A().parseFromString(K, Yl);
      } catch {
      }
    if (!C || !C.documentElement) {
      C = Ee.createDocument(Hl, "template", null);
      try {
        C.documentElement.innerHTML = gu ? ze : K;
      } catch {
      }
    }
    const J = C.body || C.documentElement;
    return g && G && J.insertBefore(o.createTextNode(G), J.childNodes[0] || null), Hl === tt ? fl.call(C, kt ? "html" : "body")[0] : kt ? C.documentElement : J;
  }, Na = function(g) {
    const C = ee ? ee(g) : g.ownerDocument;
    return et.call(
      C || g,
      g,
      // eslint-disable-next-line no-bitwise
      S.SHOW_ELEMENT | S.SHOW_COMMENT | S.SHOW_TEXT | S.SHOW_PROCESSING_INSTRUCTION | S.SHOW_CDATA_SECTION,
      null
    );
  }, vn = function(g) {
    return g = vr(g, te, " "), g = vr(g, ne, " "), g = vr(g, Re, " "), g;
  }, In = function(g) {
    var C;
    g.normalize();
    const G = ee ? ee(g) : g.ownerDocument, K = et.call(
      G || g,
      g,
      // eslint-disable-next-line no-bitwise
      S.SHOW_TEXT | S.SHOW_COMMENT | S.SHOW_CDATA_SECTION | S.SHOW_PROCESSING_INSTRUCTION,
      null
    );
    let J = K.nextNode();
    for (; J; )
      J.data = vn(J.data), J = K.nextNode();
    const oe = (C = g.querySelectorAll) === null || C === void 0 ? void 0 : C.call(g, "template");
    oe && Wa(oe, (Be) => {
      nn(Be.content) && In(Be.content);
    });
  }, Fn = function(g) {
    const C = se ? se(g) : null;
    return typeof C != "string" || Pe(C) !== "form" ? !1 : typeof g.nodeName != "string" || typeof g.textContent != "string" || typeof g.removeChild != "function" || // Realm-safe NamedNodeMap detection: equality against the cached
    // prototype getter. Clobbered .attributes (e.g. <input name="attributes">)
    // makes the direct read diverge from the cached read; a clean form
    // (same-realm OR foreign-realm) has both reads pointing at the same
    // canonical NamedNodeMap.
    g.attributes !== ie(g) || typeof g.removeAttribute != "function" || // A form descendant named "removeAttributeNode" or "getAttributeNode"
    // shadows these Attr-node methods via [LegacyOverrideBuiltIns].
    // _removeAttribute() / _stripAttributeNode() reach for
    // element.removeAttributeNode(attr) first; when it is shadowed the call
    // throws and the name-based fallback element.removeAttribute(name)
    // ASCII-lowercases its lookup key in an HTML document, silently missing
    // a case-preserved event-handler attribute (e.g. an ONANIMATIONSTART
    // that reached the sanitizer through an XML/XHTML parse). Flag the form
    // so it is removed wholesale, exactly as for the other shadowed methods.
    typeof g.removeAttributeNode != "function" || typeof g.getAttributeNode != "function" || typeof g.setAttribute != "function" || typeof g.namespaceURI != "string" || typeof g.insertBefore != "function" || typeof g.hasChildNodes != "function" || // NodeType clobbering probe. Cached Node.prototype.nodeType getter
    // returns the integer 1 for any Element regardless of realm; direct
    // read on a clobbered form (e.g. <input name="nodeType">) returns
    // the named child element. Cheap addition — nodeType is read from
    // an internal slot, no serialization cost — and removes a residual
    // clobbering surface used by several mXSS / PI / comment branches
    // in _sanitizeElements that compare currentNode.nodeType directly.
    g.nodeType !== W(g) || // HTMLFormElement has [LegacyOverrideBuiltIns]: a descendant named
    // "childNodes" shadows the prototype getter. Direct reads of
    // form.childNodes from a clobbered form return the named child
    // instead of the real NodeList, so any walk that reads it directly
    // skips the form's real children. Compare the direct read to the
    // cached Node.prototype getter — when the form's named-property
    // getter intercepts the read, the two values differ and we flag
    // the form. This catches every clobbering child type (input,
    // select, etc.) regardless of whether the named child happens to
    // carry a numeric .length, which a typeof-based probe would miss
    // (e.g. HTMLSelectElement.length is a defined unsigned-long).
    g.childNodes !== Q(g);
  }, nn = function(g) {
    if (!W || typeof g != "object" || g === null)
      return !1;
    try {
      return W(g) === dn.documentFragment;
    } catch {
      return !1;
    }
  }, nt = function(g) {
    if (!W || typeof g != "object" || g === null)
      return !1;
    try {
      return typeof W(g) == "number";
    } catch {
      return !1;
    }
  };
  function ln(Y, g, C) {
    Y.length !== 0 && Wa(Y, (G) => {
      G.call(r, g, C, gn);
    });
  }
  const Lr = function(g, C) {
    return !!(Zn && g.hasChildNodes() && !nt(g.firstElementChild) && Bt(Mv, g.textContent) && Bt(Mv, g.innerHTML) || Zn && g.namespaceURI === tt && mx[C] && (nt(g.firstElementChild) || typeof g.textContent == "string" && Bt(px[C], g.textContent)) || g.nodeType === dn.processingInstruction || Zn && g.nodeType === dn.comment && Bt(jv, g.data));
  }, wa = function(g, C) {
    if (g instanceof RegExp)
      return Bt(g, C);
    if (g instanceof Function) {
      for (var G = arguments.length, K = new Array(G > 2 ? G - 2 : 0), J = 2; J < G; J++)
        K[J - 2] = arguments[J];
      return !!g(C, ...K);
    }
    return !1;
  }, hl = function(g, C, G) {
    if (!zn[C] && Ce(C) && wa(ct.tagNameCheck, C))
      return !1;
    if (mu && !Mn[C]) {
      const K = Z(g), J = Q(g);
      if (J && K) {
        const oe = J.length;
        for (let Be = oe - 1; Be >= 0; --Be) {
          const Qe = g === G ? q(J[Be], !0) : J[Be];
          K.insertBefore(Qe, j(g));
        }
      }
    }
    return Je(g), !0;
  }, ml = function(g, C, G, K) {
    return g.length === 0 ? C : C === G || C === K ? mn(C) : C;
  }, Hr = function(g, C) {
    return g === C || Z(g) !== null ? !1 : (ri && fi(g), !0);
  }, Tu = function(g, C) {
    if (ln(L.beforeSanitizeElements, g, null), Hr(g, C))
      return !0;
    if (Fn(g))
      return Je(g), !0;
    const G = Pe(Fe(g));
    if (je = ml(L.uponSanitizeElement, je, Zt, jl), ln(L.uponSanitizeElement, g, {
      tagName: G,
      allowedTags: je
    }), Hr(g, C))
      return !0;
    if (Lr(g, G))
      return Je(g), !0;
    if (zn[G] || !(en.tagCheck instanceof Function && en.tagCheck(G)) && !je[G]) {
      const J = hl(g, G, C);
      return J === !1 && ln(L.afterSanitizeElements, g, null), J;
    }
    if (he(g) === dn.element && !jn(g) || (G === "noscript" || G === "noembed" || G === "noframes") && Bt(dx, g.innerHTML))
      return Je(g), !0;
    if (pn && g.nodeType === dn.text) {
      const J = vn(g.textContent);
      g.textContent !== J && (gr(r.removed, {
        element: g.cloneNode()
      }), g.textContent = J);
    }
    return ln(L.afterSanitizeElements, g, null), !1;
  }, xu = function(g, C, G) {
    if (Dn[C] || Eu(C, g) || Nr && (C === "id" || C === "name") && (G in o || G in _c))
      return !1;
    const K = me[C] || en.attributeCheck instanceof Function && en.attributeCheck(C, g);
    return Qn && Bt(Ne, C) || Ta && Bt(De, C) ? !0 : K ? Mr[C] || Bt(li, vr(G, fe, "")) || (C === "src" || C === "xlink:href" || C === "href") && g !== "script" && Av(G, "data:") === 0 && pu[g] || ai && !Bt(P, vr(G, fe, "")) ? !0 : !G : (
      // Condition a) covers a basically valid custom element tag name whose
      // tag passes the configured tagNameCheck and whose attribute name
      // passes the configured attributeNameCheck ...
      Ce(g) && wa(ct.tagNameCheck, g) && wa(ct.attributeNameCheck, C, g) || // Condition b) covers an `is` attribute whose value passes the
      // configured tagNameCheck while customized built-in elements are
      // allowed.
      C === "is" && ct.allowCustomizedBuiltInElements && wa(ct.tagNameCheck, G)
    );
  }, Oc = Me({}, ["annotation-xml", "color-profile", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "missing-glyph"]), Ce = function(g) {
    return !Oc[Sr(g)] && Bt(wn, g);
  }, Br = function(g, C, G, K) {
    if (_e && typeof v == "object" && typeof v.getAttributeType == "function" && !G)
      switch (v.getAttributeType(g, C)) {
        case "TrustedHTML":
          return V(K);
        case "TrustedScriptURL":
          return ue(K);
      }
    return K;
  }, di = function(g, C, G, K) {
    try {
      return G ? g.setAttributeNS(G, C, K) : g.setAttribute(C, K), Fn(g) ? (Je(g), !1) : !0;
    } catch {
      return $n(C, g), !1;
    }
  }, za = function(g) {
    ln(L.beforeSanitizeAttributes, g, null);
    const C = g.attributes;
    if (!C || Fn(g))
      return;
    me = ml(L.uponSanitizeAttribute, me, Le, ii);
    const G = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: me,
      forceKeepAttr: void 0
    };
    let K = C.length;
    const J = Pe(g.nodeName);
    for (; K--; ) {
      const oe = C[K], Be = oe.name, Qe = oe.namespaceURI, st = oe.value, Nt = Pe(Be), hi = st;
      let it = Be === "value" ? hi : JT(hi), Gr = !1;
      if (G.attrName = Nt, G.attrValue = it, G.keepAttr = !0, G.forceKeepAttr = void 0, ln(L.uponSanitizeAttribute, g, G), it = G.attrValue, wr && (Nt === "id" || Nt === "name") && Av(it, Lt) !== 0 && ($n(Be, g, oe), it = Lt + it, Gr = !0), Zn && Bt(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, it)) {
        $n(Be, g, oe);
        continue;
      }
      if (Nt === "attributename" && _v(it, "href")) {
        $n(Be, g, oe);
        continue;
      }
      if (!G.forceKeepAttr) {
        if (!G.keepAttr) {
          $n(Be, g, oe);
          continue;
        }
        if (!xa && Bt(hx, it)) {
          $n(Be, g, oe);
          continue;
        }
        if (pn && (it = vn(it)), !xu(J, Nt, it)) {
          $n(Be, g, oe);
          continue;
        }
        it = Br(J, Nt, Qe, it), it !== hi && di(g, Be, Qe, it) && Gr && xv(r.removed);
      }
    }
    ln(L.afterSanitizeAttributes, g, null);
  }, Kt = function(g) {
    let C = null;
    const G = Na(g);
    for (ln(L.beforeSanitizeShadowDOM, g, null); C = G.nextNode(); )
      if (ln(L.uponSanitizeShadowNode, C, null), Tu(C, g), za(C), nn(C.content) && Kt(C.content), he(C) === dn.element) {
        const K = ae(C);
        nn(K) && (Ct(K), Kt(K));
      }
    ln(L.afterSanitizeShadowDOM, g, null);
  }, Ct = function(g) {
    const C = [{
      node: g,
      shadow: null
    }];
    for (; C.length > 0; ) {
      const G = C.pop();
      if (G.shadow) {
        Kt(G.shadow);
        continue;
      }
      const K = G.node, oe = he(K) === dn.element, Be = Q(K);
      if (Be)
        for (let Qe = Be.length - 1; Qe >= 0; --Qe)
          C.push({
            node: Be[Qe],
            shadow: null
          });
      if (oe) {
        const Qe = se ? se(K) : null;
        if (typeof Qe == "string" && Pe(Qe) === "template") {
          const st = K.content;
          nn(st) && C.push({
            node: st,
            shadow: null
          });
        }
      }
      if (oe) {
        const Qe = ae(K);
        nn(Qe) && C.push({
          node: null,
          shadow: Qe
        }, {
          node: Qe,
          shadow: null
        });
      }
    }
  };
  return r.sanitize = function(Y) {
    let g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, C = null, G = null, K = null, J = null;
    if (gu = !Y, gu && (Y = "<!-->"), typeof Y != "string" && !nt(Y) && (Y = WT(Y), typeof Y != "string"))
      throw Pa("dirty is not a string, aborting");
    if (!r.isSupported)
      return Y;
    _a ? (je = jl, me = ii) : ci(g), (L.uponSanitizeElement.length > 0 || L.uponSanitizeAttribute.length > 0) && (je = mn(je)), L.uponSanitizeAttribute.length > 0 && (me = mn(me)), r.removed = [];
    const oe = ri && typeof Y != "string" && nt(Y);
    if (oe) {
      Ra(Y);
      const st = Fe(Y);
      if (typeof st == "string") {
        const Nt = Pe(st);
        if (!je[Nt] || zn[Nt])
          throw Un(Y), Pa("root node is forbidden and cannot be sanitized in-place");
      }
      if (Fn(Y))
        throw Un(Y), Pa("root node is clobbered and cannot be sanitized in-place");
      try {
        Ct(Y);
      } catch (Nt) {
        throw Un(Y), Nt;
      }
    } else if (nt(Y))
      C = Ca("<!---->"), G = C.ownerDocument.importNode(Y, !0), G.nodeType === dn.element && G.nodeName === "BODY" || G.nodeName === "HTML" ? C = G : C.appendChild(G), Ct(C);
    else {
      if (!Kn && !pn && !kt && // eslint-disable-next-line unicorn/prefer-includes
      Y.indexOf("<") === -1)
        return _e && kl ? V(Y) : Y;
      if (C = Ca(Y), !C)
        return Kn ? null : kl ? ze : "";
    }
    C && ui && Je(C.firstChild);
    const Be = oe ? Y : C;
    try {
      const st = Na(Be);
      for (; K = st.nextNode(); )
        Tu(K, Be), za(K), nn(K.content) && Kt(K.content);
    } catch (st) {
      throw oe && (Un(Y), Wa(r.removed, (Nt) => {
        Nt.element && fi(Nt.element);
      })), st;
    }
    if (oe)
      return Wa(r.removed, (st) => {
        st.element && fi(st.element);
      }), pn && In(Y), Y;
    if (Kn) {
      if (pn && In(C), Ul)
        for (J = Nn.call(C.ownerDocument); C.firstChild; )
          J.appendChild(C.firstChild);
      else
        J = C;
      return (me.shadowroot || me.shadowrootmode) && (J = T.call(c, J, !0)), J;
    }
    let Qe = kt ? C.outerHTML : C.innerHTML;
    return kt && je["!doctype"] && C.ownerDocument && C.ownerDocument.doctype && C.ownerDocument.doctype.name && Bt(sx, C.ownerDocument.doctype.name) && (Qe = "<!DOCTYPE " + C.ownerDocument.doctype.name + `>
` + Qe), pn && (Qe = vn(Qe)), _e && kl ? V(Qe) : Qe;
  }, r.setConfig = function() {
    let Y = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    ci(Y), _a = !0, jl = je, ii = me;
  }, r.clearConfig = function() {
    gn = null, _a = !1, jl = null, ii = null, _e = I, ze = "";
  }, r.isValidAttribute = function(Y, g, C) {
    gn || ci({});
    const G = Pe(Y), K = Pe(g);
    return xu(G, K, C);
  }, r.addHook = function(Y, g) {
    typeof g == "function" && Wt(L, Y) && gr(L[Y], g);
  }, r.removeHook = function(Y, g) {
    if (Wt(L, Y)) {
      if (g !== void 0) {
        const C = ZT(L[Y], g);
        return C === -1 ? void 0 : KT(L[Y], C, 1)[0];
      }
      return xv(L[Y]);
    }
  }, r.removeHooks = function(Y) {
    Wt(L, Y) && (L[Y] = []);
  }, r.removeAllHooks = function() {
    L = Uv();
  }, r;
}
var lb = nb();
function Vd() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var ni = Vd();
function ab(u) {
  ni = u;
}
var ei = { exec: () => null };
function tu(u) {
  let r = [];
  return (o) => {
    let c = Math.max(0, Math.min(3, o - 1)), f = r[c];
    return f || (f = u(c), r[c] = f), f;
  };
}
function ye(u, r = "") {
  let o = typeof u == "string" ? u : u.source, c = { replace: (f, d) => {
    let m = typeof d == "string" ? d : d.source;
    return m = m.replace(Gt.caret, "$1"), o = o.replace(f, m), c;
  }, getRegex: () => new RegExp(o, r) };
  return c;
}
var yx = ((u = "") => {
  try {
    return !!new RegExp("(?<=1)(?<!1)" + u);
  } catch {
    return !1;
  }
})(), Gt = { codeRemoveIndent: /^(?: {0,3}\t| {1,4})/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, endingSpaceTabChar: /[ \t]$/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (u) => new RegExp(`^( {0,3}${u})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: tu((u) => new RegExp(`^ {0,${u}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)), hrRegex: tu((u) => new RegExp(`^ {0,${u}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)), fencesBeginRegex: tu((u) => new RegExp(`^ {0,${u}}(?:\`\`\`|~~~)`)), headingBeginRegex: tu((u) => new RegExp(`^ {0,${u}}#`)), htmlBeginRegex: tu((u) => new RegExp(`^ {0,${u}}(?:</?(?:${Or})(?: +|$|/?>)|<(?:script|pre|style|textarea|!--))`, "i")), blockquoteBeginRegex: tu((u) => new RegExp(`^ {0,${u}}>`)) }, bx = /^(?:[ \t]*(?:\n|$))+/, Sx = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Ex = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Ar = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Tx = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, Xd = / {0,3}(?:[*+-]|\d{1,9}[.)])/, ib = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, ub = ye(ib).replace(/bull/g, Xd).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), xx = ye(ib).replace(/bull/g, Xd).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), Qd = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/, _x = /^[^\n]+/, Zd = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, Ax = ye(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Zd).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Ox = ye(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, Xd).getRegex(), Or = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Kd = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Rx = ye("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", Kd).replace("tag", Or).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), rb = (u) => ye(Qd).replace("hr", Ar).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", u).replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Or).getRegex(), Cx = rb(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/), Nx = rb(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/), wx = ye(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Nx).getRegex(), Jd = { blockquote: wx, code: Sx, def: Ax, fences: Ex, heading: Tx, hr: Ar, html: Rx, lheading: ub, list: Ox, newline: bx, paragraph: Cx, table: ei, text: _x }, kv = ye("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Ar).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Or).getRegex(), zx = { ...Jd, lheading: xx, table: kv, paragraph: ye(Qd).replace("hr", Ar).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", kv).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Or).getRegex() }, Dx = { ...Jd, html: ye(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", Kd).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: ei, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: ye(Qd).replace("hr", Ar).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", ub).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, Mx = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, jx = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, ob = /^( {2,}|\\)\n(?!\s*$)[ \t]*/, Ux = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Ml = /[\p{P}\p{S}]/u, hu = /[\s\p{P}\p{S}]/u, Rr = /[^\s\p{P}\p{S}]/u, kx = ye(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, hu).getRegex(), Lx = /[\p{Pi}\p{Ps}"']/u, cb = /(?!~)[\p{P}\p{S}]/u, Hx = /(?!~)[\s\p{P}\p{S}]/u, Bx = /(?:[^\s\p{P}\p{S}]|~)/u, Gx = ye(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", yx ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), sb = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/, Yx = ye(sb, "u").replace(/punct/g, Ml).getRegex(), qx = ye(sb, "u").replace(/punct/g, cb).getRegex(), Vx = /^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, Xx = ye(Vx, "u").replace(/openQuote/g, Lx).replace(/punct/g, Ml).getRegex(), fb = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Qx = ye(fb, "gu").replace(/notPunctSpace/g, Rr).replace(/punctSpace/g, hu).replace(/punct/g, Ml).getRegex(), Zx = ye(fb, "gu").replace(/notPunctSpace/g, Bx).replace(/punctSpace/g, Hx).replace(/punct/g, cb).getRegex(), Kx = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", Jx = ye(Kx, "gu").replace(/notPunctSpace/g, Rr).replace(/punctSpace/g, hu).replace(/punct/g, Ml).getRegex(), $x = ye("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Rr).replace(/punctSpace/g, hu).replace(/punct/g, Ml).getRegex(), Ix = "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", Fx = ye(Ix, "gu").replace(/notPunctSpace/g, Rr).replace(/punctSpace/g, hu).replace(/punct/g, Ml).getRegex(), Px = ye(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, Ml).getRegex(), Wx = "^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", e_ = ye(Wx, "gu").replace(/notPunctSpace/g, Rr).replace(/punctSpace/g, hu).replace(/punct/g, Ml).getRegex(), t_ = ye(/\\(punct)/, "gu").replace(/punct/g, Ml).getRegex(), n_ = ye(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), l_ = ye(Kd).replace("(?:-->|$)", "-->").getRegex(), a_ = ye("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", l_).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), db = /\[(?:\\[\s\S]|[^\[\]\\])*\]/, vc = ye(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets", db).getRegex(), i_ = ye(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", vc).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), u_ = ye(/^!?\[(label)\]\[(ref)\]/).replace("label", vc).replace("ref", Zd).getRegex(), r_ = ye(/^!?\[(ref)\](?:\[\])?/).replace("ref", Zd).getRegex(), Lv = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/, o_ = ye(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets", db).getRegex(), c_ = ye("reflink|nolink(?!\\()", "g").replace("reflink", ye(/^!?\[(label)\]\[(ref)\]/).replace("label", o_).replace("ref", Lv).getRegex()).replace("nolink", ye(/^!?\[(ref)\](?:\[\])?/).replace("ref", Lv).getRegex()).getRegex(), Hv = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, $d = { _backpedal: ei, anyPunctuation: t_, autolink: n_, blockSkip: Gx, br: ob, code: jx, del: ei, delLDelim: ei, delRDelim: ei, emStrongLDelim: Yx, emStrongRDelimAst: Qx, emStrongRDelimUnd: $x, escape: Mx, link: i_, nolink: r_, punctuation: kx, reflink: u_, reflinkSearch: c_, tag: a_, text: Ux, url: ei }, s_ = { ...$d, emStrongLDelim: Xx, emStrongRDelimAst: Jx, emStrongRDelimUnd: Fx, link: ye(/^!?\[(label)\]\((.*?)\)/).replace("label", vc).getRegex(), reflink: ye(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", vc).getRegex() }, Nd = { ...$d, emStrongRDelimAst: Zx, emStrongLDelim: qx, delLDelim: Px, delRDelim: e_, url: ye(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", Hv).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: ye(/^(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", Hv).getRegex() }, f_ = { ...Nd, br: ye(ob).replace("{2,}", "*").getRegex(), text: ye(Nd.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, hc = { normal: Jd, gfm: zx, pedantic: Dx }, br = { normal: $d, gfm: Nd, breaks: f_, pedantic: s_ }, d_ = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Bv = (u) => d_[u];
function hn(u, r) {
  if (r) {
    if (Gt.escapeTest.test(u)) return u.replace(Gt.escapeReplace, Bv);
  } else if (Gt.escapeTestNoEncode.test(u)) return u.replace(Gt.escapeReplaceNoEncode, Bv);
  return u;
}
function Gv(u) {
  try {
    u = encodeURI(u).replace(Gt.percentDecode, "%");
  } catch {
    return null;
  }
  return u;
}
function Yv(u, r) {
  let o = u.replace(Gt.findPipe, (d, m, p) => {
    let S = !1, x = m;
    for (; --x >= 0 && p[x] === "\\"; ) S = !S;
    return S ? "|" : " |";
  }), c = o.split(Gt.splitPipe), f = 0;
  if (c[0].trim() || c.shift(), c.length > 0 && !c.at(-1)?.trim() && c.pop(), r) if (c.length > r) c.splice(r);
  else for (; c.length < r; ) c.push("");
  for (; f < c.length; f++) c[f] = c[f].trim().replace(Gt.slashPipe, "|");
  return c;
}
function va(u, r, o) {
  let c = u.length;
  if (c === 0) return "";
  let f = 0;
  for (; f < c && u.charAt(c - f - 1) === r; )
    f++;
  return u.slice(0, c - f);
}
function qv(u) {
  let r = u.split(`
`), o = r.length - 1;
  for (; o >= 0 && Gt.blankLine.test(r[o]); ) o--;
  return r.length - o <= 2 ? u : r.slice(0, o + 1).join(`
`);
}
function yc(u) {
  return u.toLowerCase().toUpperCase().toLowerCase();
}
function h_(u, r) {
  if (u.indexOf(r[1]) === -1) return -1;
  let o = 0;
  for (let c = 0; c < u.length; c++) if (u[c] === "\\") c++;
  else if (u[c] === r[0]) o++;
  else if (u[c] === r[1] && (o--, o < 0)) return c;
  return o > 0 ? -2 : -1;
}
function m_(u, r = 0) {
  let o = r, c = "";
  for (let f of u) if (f === "	") {
    let d = 4 - o % 4;
    c += " ".repeat(d), o += d;
  } else c += f, o++;
  return c;
}
function Vv(u, r, o, c, f) {
  let d = r.href, m = r.title || null, p = u[1].replace(f.other.outputLinkReplace, "$1"), S = u[0].charAt(0) === "!";
  c.state.inLink = !0;
  let x = c.state.linkEmitted, A = c.state.inRawBlock;
  c.state.linkEmitted = !1;
  let v = c.inlineTokens(p), N = c.state.linkEmitted;
  if (c.state.linkEmitted = x, c.state.inLink = !1, !S) {
    if (N) {
      c.state.inRawBlock = A;
      return;
    }
    c.state.linkEmitted = !0;
  }
  return { type: S ? "image" : "link", raw: o, href: d, title: m, text: p, tokens: v };
}
function p_(u, r, o) {
  let c = u.match(o.other.indentCodeCompensation);
  if (c === null) return r;
  let f = c[1];
  return r.split(`
`).map((d) => {
    let m = d.match(o.other.beginningSpace);
    if (m === null) return d;
    let [p] = m;
    return d.slice(Math.min(p.length, f.length));
  }).join(`
`);
}
function Xv(u, r, o, c) {
  if (!r.includes("<")) return !1;
  for (let f = 0; f < r.length; f++) {
    if (r[f] === "\\") {
      f++;
      continue;
    }
    if (r[f] === "`") {
      let p = c.inline.code.exec(r.slice(f));
      if (p) {
        f += p[0].length - 1;
        continue;
      }
    }
    if (r[f] !== "<") continue;
    let d = u.slice(o + f), m = c.inline.tag.exec(d) || c.inline.autolink.exec(d);
    if (m) {
      if (m[0].length > r.length - f) return !0;
      f += m[0].length - 1;
    }
  }
  return !1;
}
var bc = class {
  options;
  rules;
  lexer;
  constructor(u) {
    this.options = u || ni;
  }
  space(u) {
    let r = this.rules.block.newline.exec(u);
    if (r && r[0].length > 0) return { type: "space", raw: r[0] };
  }
  code(u) {
    let r = this.rules.block.code.exec(u);
    if (r) {
      let o = this.options.pedantic ? r[0] : qv(r[0]), c = o.replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: o, codeBlockStyle: "indented", text: c };
    }
  }
  fences(u) {
    let r = this.rules.block.fences.exec(u);
    if (r) {
      let o = r[0], c = p_(o, r[3] || "", this.rules);
      return { type: "code", raw: o, lang: r[2] ? r[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : r[2], text: c };
    }
  }
  heading(u) {
    let r = this.rules.block.heading.exec(u);
    if (r) {
      let o = r[2].trim();
      if (this.rules.other.endingHash.test(o)) {
        let c = va(o, "#");
        (this.options.pedantic || !c || this.rules.other.endingSpaceTabChar.test(c)) && (o = c.trim());
      }
      return { type: "heading", raw: va(r[0], `
`), depth: r[1].length, text: o, tokens: this.lexer.inline(o) };
    }
  }
  hr(u) {
    let r = this.rules.block.hr.exec(u);
    if (r) return { type: "hr", raw: va(r[0], `
`) };
  }
  blockquote(u) {
    let r = this.rules.block.blockquote.exec(u);
    if (r) {
      let o = va(r[0], `
`).split(`
`), c = "", f = "", d = [];
      for (; o.length > 0; ) {
        let m = !1, p = [], S;
        for (S = 0; S < o.length; S++) if (this.rules.other.blockquoteStart.test(o[S])) p.push(o[S]), m = !0;
        else if (!m) p.push(o[S]);
        else break;
        o = o.slice(S);
        let x = p.join(`
`), A = x.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        c = c ? `${c}
${x}` : x, f = f ? `${f}
${A}` : A;
        let v = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(A, d, !0), this.lexer.state.top = v, o.length === 0) break;
        let N = d.at(-1);
        if (N?.type === "code") break;
        if (N?.type === "blockquote") {
          let q = N, H = o.join(`
`), B = q.raw + `
` + H.replace(this.rules.other.blockquoteSetextReplace2, ""), j = this.blockquote(B);
          d[d.length - 1] = j, c = `${c}
${H}`, f = f.substring(0, f.length - q.text.length) + j.text;
          break;
        } else if (N?.type === "list") {
          let q = N, H = q.raw + `
` + o.join(`
`), B = this.list(H);
          d[d.length - 1] = B, c = c.substring(0, c.length - N.raw.length) + B.raw, f = f.substring(0, f.length - q.raw.length) + B.raw, o = H.substring(d.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: c, tokens: d, text: f };
    }
  }
  list(u) {
    let r = this.rules.block.list.exec(u);
    if (r) {
      let o = r[1].trim(), c = o.length > 1, f = { type: "list", raw: "", ordered: c, start: c ? +o.slice(0, -1) : "", loose: !1, items: [] };
      o = c ? `\\d{1,9}\\${o.slice(-1)}` : `\\${o}`, this.options.pedantic && (o = c ? o : "[*+-]");
      let d = this.rules.other.listItemRegex(o), m = !1;
      for (; u; ) {
        let S = !1, x = "", A = "";
        if (!(r = d.exec(u)) || this.rules.block.hr.test(u)) break;
        x = r[0], u = u.substring(x.length);
        let v = m_(r[2].split(`
`, 1)[0], r[1].length), N = u.split(`
`, 1)[0], q = !v.trim(), H = 0;
        if (this.options.pedantic ? (H = 2, A = v.trimStart()) : q ? H = r[1].length + 1 : (H = v.search(this.rules.other.nonSpaceChar), H = H > 4 ? 1 : H, A = v.slice(H), H += r[1].length), q && this.rules.other.blankLine.test(N) && (x += N + `
`, u = u.substring(N.length + 1), S = !0), !S) {
          let B = this.rules.other.nextBulletRegex(H), j = this.rules.other.hrRegex(H), Q = this.rules.other.fencesBeginRegex(H), Z = this.rules.other.headingBeginRegex(H), ae = this.rules.other.htmlBeginRegex(H), ie = this.rules.other.blockquoteBeginRegex(H);
          for (; u; ) {
            let W = u.split(`
`, 1)[0], se;
            if (N = W, this.options.pedantic ? (N = N.replace(this.rules.other.listReplaceNesting, "  "), se = N) : se = N.replace(this.rules.other.tabCharGlobal, "    "), Q.test(N) || Z.test(N) || ae.test(N) || ie.test(N) || B.test(N) || j.test(N)) break;
            if (se.search(this.rules.other.nonSpaceChar) >= H || !N.trim()) A += `
` + se.slice(H);
            else {
              if (q || v.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || Q.test(v) || Z.test(v) || j.test(v)) break;
              A += `
` + N;
            }
            q = !N.trim(), x += W + `
`, u = u.substring(W.length + 1), v = se.slice(H);
          }
        }
        f.loose || (m ? f.loose = !0 : this.rules.other.doubleBlankLine.test(x) && (m = !0)), f.items.push({ type: "list_item", raw: x, task: !!this.options.gfm && this.rules.other.listIsTask.test(A), loose: !1, text: A, tokens: [] }), f.raw += x;
      }
      let p = f.items.at(-1);
      if (p) p.raw = p.raw.trimEnd(), p.text = p.text.trimEnd();
      else return;
      f.raw = f.raw.trimEnd();
      for (let S of f.items) if (this.lexer.state.top = !1, S.tokens = this.lexer.blockTokens(S.text, []), !f.loose) {
        let x = S.tokens.filter((v) => v.type === "space"), A = x.length > 0 && x.some((v) => this.rules.other.anyLine.test(v.raw));
        f.loose = A;
      }
      for (let S of f.items) {
        let x = S.tokens[0];
        if (S.task && (x?.type === "text" || x?.type === "paragraph")) {
          S.text = S.text.replace(this.rules.other.listReplaceTask, ""), x.raw = x.raw.replace(this.rules.other.listReplaceTask, ""), x.text = x.text.replace(this.rules.other.listReplaceTask, "");
          for (let v = this.lexer.inlineQueue.length - 1; v >= 0; v--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[v].src)) {
            this.lexer.inlineQueue[v].src = this.lexer.inlineQueue[v].src.replace(this.rules.other.listReplaceTask, "");
            break;
          }
          let A = this.rules.other.listTaskCheckbox.exec(S.raw);
          if (A) {
            let v = { type: "checkbox", raw: A[0] + " ", checked: A[0] !== "[ ]" };
            S.checked = v.checked, f.loose ? S.tokens[0] && ["paragraph", "text"].includes(S.tokens[0].type) && "tokens" in S.tokens[0] && S.tokens[0].tokens ? (S.tokens[0].raw = v.raw + S.tokens[0].raw, S.tokens[0].text = v.raw + S.tokens[0].text, S.tokens[0].tokens.unshift(v)) : S.tokens.unshift({ type: "paragraph", raw: v.raw, text: v.raw, tokens: [v] }) : S.tokens.unshift(v);
          }
        } else S.task && (S.task = !1);
      }
      if (f.loose) for (let S of f.items) {
        S.loose = !0;
        for (let x of S.tokens) x.type === "text" && (x.type = "paragraph");
      }
      return f;
    }
  }
  html(u) {
    let r = this.rules.block.html.exec(u);
    if (r) {
      let o = qv(r[0]);
      return { type: "html", block: !0, raw: o, pre: r[1] === "pre" || r[1] === "script" || r[1] === "style", text: o };
    }
  }
  def(u) {
    let r = this.rules.block.def.exec(u);
    if (r) {
      let o = yc(r[1]).replace(this.rules.other.multipleSpaceGlobal, " "), c = r[2] ? r[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", f = r[3] ? r[3].substring(1, r[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : r[3];
      return { type: "def", tag: o, raw: va(r[0], `
`), href: c, title: f };
    }
  }
  table(u) {
    let r = this.rules.block.table.exec(u);
    if (!r || !this.rules.other.tableDelimiter.test(r[2])) return;
    let o = Yv(r[1]), c = r[2].replace(this.rules.other.tableAlignChars, "").split("|"), f = r[3]?.trim() ? r[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], d = { type: "table", raw: va(r[0], `
`), header: [], align: [], rows: [] };
    if (o.length === c.length) {
      for (let m of c) this.rules.other.tableAlignRight.test(m) ? d.align.push("right") : this.rules.other.tableAlignCenter.test(m) ? d.align.push("center") : this.rules.other.tableAlignLeft.test(m) ? d.align.push("left") : d.align.push(null);
      for (let m = 0; m < o.length; m++) d.header.push({ text: o[m], tokens: this.lexer.inline(o[m]), header: !0, align: d.align[m] });
      for (let m of f) d.rows.push(Yv(m, d.header.length).map((p, S) => ({ text: p, tokens: this.lexer.inline(p), header: !1, align: d.align[S] })));
      return d;
    }
  }
  lheading(u) {
    let r = this.rules.block.lheading.exec(u);
    if (r) {
      let o = r[1].trim();
      return { type: "heading", raw: va(r[0], `
`), depth: r[2].charAt(0) === "=" ? 1 : 2, text: o, tokens: this.lexer.inline(o) };
    }
  }
  paragraph(u) {
    let r = this.rules.block.paragraph.exec(u);
    if (r) {
      let o = r[1].charAt(r[1].length - 1) === `
` ? r[1].slice(0, -1) : r[1];
      return { type: "paragraph", raw: r[0], text: o, tokens: this.lexer.inline(o) };
    }
  }
  text(u) {
    let r = this.rules.block.text.exec(u);
    if (r) return { type: "text", raw: r[0], text: r[0], tokens: this.lexer.inline(r[0]) };
  }
  escape(u) {
    let r = this.rules.inline.escape.exec(u);
    if (r) return { type: "escape", raw: r[0], text: r[1] };
  }
  tag(u) {
    let r = this.rules.inline.tag.exec(u);
    if (r) return !this.lexer.state.inLink && this.rules.other.startATag.test(r[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(r[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(r[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(r[0]) && (this.lexer.state.inRawBlock = !1), { type: "html", raw: r[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: !1, text: r[0] };
  }
  link(u) {
    let r = this.rules.inline.link.exec(u);
    if (r) {
      let o = r[0].charAt(0) === "!" ? 2 : 1;
      if (!this.options.pedantic && Xv(u, r[1], o, this.rules)) return;
      let c = r[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(c)) {
        if (!this.rules.other.endAngleBracket.test(c)) return;
        let m = va(c.slice(0, -1), "\\");
        if ((c.length - m.length) % 2 === 0) return;
      } else {
        let m = h_(r[2], "()");
        if (m === -2) return;
        if (m > -1) {
          let p = (r[0].indexOf("!") === 0 ? 5 : 4) + r[1].length + m;
          r[2] = r[2].substring(0, m), r[0] = r[0].substring(0, p).trim(), r[3] = "";
        }
      }
      let f = r[2], d = "";
      if (this.options.pedantic) {
        let m = this.rules.other.pedanticHrefTitle.exec(f);
        m && (f = m[1], d = m[3]);
      } else d = r[3] ? r[3].slice(1, -1) : "";
      return f = f.trim(), this.rules.other.startAngleBracket.test(f) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(c) ? f = f.slice(1) : f = f.slice(1, -1)), Vv(r, { href: f && f.replace(this.rules.inline.anyPunctuation, "$1"), title: d && d.replace(this.rules.inline.anyPunctuation, "$1") }, r[0], this.lexer, this.rules);
    }
  }
  reflink(u, r) {
    let o;
    if ((o = this.rules.inline.reflink.exec(u)) || (o = this.rules.inline.nolink.exec(u))) {
      let c = o[0].charAt(0) === "!" ? 2 : 1;
      if (!this.options.pedantic && Xv(u, o[1], c, this.rules)) return;
      let f = (o[2] || o[1]).replace(this.rules.other.multipleSpaceGlobal, " "), d = r[yc(f)];
      if (!d) {
        let m = o[0].charAt(0);
        return { type: "text", raw: m, text: m };
      }
      return Vv(o, d, o[0], this.lexer, this.rules);
    }
  }
  emStrong(u, r, o = "") {
    let c = this.rules.inline.emStrongLDelim.exec(u);
    if (!(!c || !c[1] && !c[2] && !c[3] && !c[4] || c[4] && o.match(this.rules.other.unicodeAlphaNumeric)) && (!(c[1] || c[3]) || !o || this.rules.inline.punctuation.exec(o))) {
      let f = [...c[0]].length - 1, d, m, p = f, S = 0, x = c[0][0], A = o === x, v = x === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (v.lastIndex = 0, r = r.slice(-1 * u.length + f); (c = v.exec(r)) !== null; ) {
        if (d = c[1] || c[2] || c[3] || c[4] || c[5] || c[6], !d) continue;
        if (m = [...d].length, c[3] || c[4]) {
          p += m;
          continue;
        } else if (c[5] || c[6]) {
          if (f % 3 && !((f + m) % 3)) {
            S += m;
            continue;
          }
          if (A) break;
        }
        if (p -= m, p > 0) continue;
        m = Math.min(m, m + p + S);
        let N = [...c[0]][0].length, q = u.slice(0, f + c.index + N + m);
        if (Math.min(f, m) % 2) {
          let B = q.slice(1, -1);
          return { type: "em", raw: q, text: B, tokens: this.lexer.inlineTokens(B) };
        }
        let H = q.slice(2, -2);
        return { type: "strong", raw: q, text: H, tokens: this.lexer.inlineTokens(H) };
      }
    }
  }
  codespan(u) {
    let r = this.rules.inline.code.exec(u);
    if (r) {
      let o = r[2].replace(this.rules.other.newLineCharGlobal, " "), c = this.rules.other.nonSpaceChar.test(o), f = this.rules.other.startingSpaceChar.test(o) && this.rules.other.endingSpaceChar.test(o);
      return c && f && (o = o.substring(1, o.length - 1)), { type: "codespan", raw: r[0], text: o };
    }
  }
  br(u) {
    let r = this.rules.inline.br.exec(u);
    if (r) return { type: "br", raw: r[0] };
  }
  del(u, r, o = "") {
    let c = this.rules.inline.delLDelim.exec(u);
    if (c && (!c[1] || !o || this.rules.inline.punctuation.exec(o))) {
      let f = [...c[0]].length - 1, d, m, p = f, S = this.rules.inline.delRDelim;
      for (S.lastIndex = 0, r = r.slice(-1 * u.length + f); (c = S.exec(r)) !== null; ) {
        if (d = c[1] || c[2] || c[3] || c[4] || c[5] || c[6], !d || (m = [...d].length, m !== f)) continue;
        if (c[3] || c[4]) {
          p += m;
          continue;
        }
        if (p -= m, p > 0) continue;
        m = Math.min(m, m + p);
        let x = [...c[0]][0].length, A = u.slice(0, f + c.index + x + m), v = A.slice(f, -f);
        return { type: "del", raw: A, text: v, tokens: this.lexer.inlineTokens(v) };
      }
    }
  }
  autolink(u) {
    let r = this.rules.inline.autolink.exec(u);
    if (r) {
      let o, c;
      return r[2] === "@" ? (o = r[1], c = "mailto:" + o) : (o = r[1], c = o), { type: "link", raw: r[0], text: o, href: c, autolink: !0, tokens: [{ type: "text", raw: o, text: o }] };
    }
  }
  url(u) {
    let r;
    if (r = this.rules.inline.url.exec(u)) {
      let o, c;
      if (r[2] === "@") o = r[0], c = "mailto:" + o;
      else {
        let f;
        do
          f = r[0], r[0] = this.rules.inline._backpedal.exec(r[0])?.[0] ?? "";
        while (f !== r[0]);
        o = r[0], r[1] === "www." ? c = "http://" + r[0] : c = r[0];
      }
      return { type: "link", raw: r[0], text: o, href: c, autolink: !0, tokens: [{ type: "text", raw: o, text: o }] };
    }
  }
  inlineText(u) {
    let r = this.rules.inline.text.exec(u);
    if (r) {
      let o = this.lexer.state.inRawBlock;
      return { type: "text", raw: r[0], text: r[0], escaped: o };
    }
  }
}, qn = class wd {
  tokens;
  options;
  state;
  inlineQueue;
  tokenizer;
  constructor(r) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = r || ni, this.options.tokenizer = this.options.tokenizer || new bc(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, linkEmitted: !1, top: !0 };
    let o = { other: Gt, block: hc.normal, inline: br.normal };
    this.options.pedantic ? (o.block = hc.pedantic, o.inline = br.pedantic) : this.options.gfm && (o.block = hc.gfm, this.options.breaks ? o.inline = br.breaks : o.inline = br.gfm), this.tokenizer.rules = o;
  }
  static get rules() {
    return { block: hc, inline: br };
  }
  static lex(r, o) {
    return new wd(o).lex(r);
  }
  static lexInline(r, o) {
    return new wd(o).inlineTokens(r);
  }
  lex(r) {
    r = r.replace(Gt.carriageReturn, `
`), this.blockTokens(r, this.tokens);
    for (let o = 0; o < this.inlineQueue.length; o++) {
      let c = this.inlineQueue[o];
      this.inlineTokens(c.src, c.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(r, o = [], c = !1) {
    this.tokenizer.lexer = this, this.options.pedantic && (r = r.replace(Gt.tabCharGlobal, "    ").replace(Gt.spaceLine, ""));
    let f = 1 / 0;
    for (; r; ) {
      if (r.length < f) f = r.length;
      else {
        this.infiniteLoopError(r.charCodeAt(0));
        break;
      }
      let d;
      if (this.options.extensions?.block?.some((p) => (d = p.call({ lexer: this }, r, o)) ? (r = r.substring(d.raw.length), o.push(d), !0) : !1)) continue;
      if (d = this.tokenizer.space(r)) {
        r = r.substring(d.raw.length);
        let p = o.at(-1);
        d.raw.length === 1 && p !== void 0 ? p.raw += `
` : o.push(d);
        continue;
      }
      if (d = this.tokenizer.code(r)) {
        r = r.substring(d.raw.length);
        let p = o.at(-1);
        p?.type === "paragraph" || p?.type === "text" ? (p.raw += (p.raw.endsWith(`
`) ? "" : `
`) + d.raw, p.text += `
` + d.text, this.inlineQueue.at(-1).src = p.text) : o.push(d);
        continue;
      }
      if (d = this.tokenizer.fences(r)) {
        r = r.substring(d.raw.length), o.push(d);
        continue;
      }
      if (d = this.tokenizer.heading(r)) {
        r = r.substring(d.raw.length), o.push(d);
        continue;
      }
      if (d = this.tokenizer.hr(r)) {
        r = r.substring(d.raw.length), o.push(d);
        continue;
      }
      if (d = this.tokenizer.blockquote(r)) {
        r = r.substring(d.raw.length), o.push(d);
        continue;
      }
      if (d = this.tokenizer.list(r)) {
        r = r.substring(d.raw.length), o.push(d);
        continue;
      }
      if (d = this.tokenizer.html(r)) {
        r = r.substring(d.raw.length), o.push(d);
        continue;
      }
      if (d = this.tokenizer.def(r)) {
        r = r.substring(d.raw.length);
        let p = o.at(-1);
        p?.type === "paragraph" || p?.type === "text" ? (p.raw += (p.raw.endsWith(`
`) ? "" : `
`) + d.raw, p.text += `
` + d.raw, this.inlineQueue.at(-1).src = p.text) : this.tokens.links[d.tag] || (this.tokens.links[d.tag] = { href: d.href, title: d.title }, o.push(d));
        continue;
      }
      if (d = this.tokenizer.table(r)) {
        r = r.substring(d.raw.length), o.push(d);
        continue;
      }
      if (d = this.tokenizer.lheading(r)) {
        r = r.substring(d.raw.length), o.push(d);
        continue;
      }
      let m = r;
      if (this.options.extensions?.startBlock) {
        let p = 1 / 0, S = r.slice(1), x;
        this.options.extensions.startBlock.forEach((A) => {
          x = A.call({ lexer: this }, S), typeof x == "number" && x >= 0 && (p = Math.min(p, x));
        }), p < 1 / 0 && p >= 0 && (m = r.substring(0, p + 1));
      }
      if (this.state.top && (d = this.tokenizer.paragraph(m))) {
        let p = o.at(-1);
        c && p?.type === "paragraph" ? (p.raw += (p.raw.endsWith(`
`) ? "" : `
`) + d.raw, p.text += `
` + d.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = p.text) : o.push(d), c = m.length !== r.length, r = r.substring(d.raw.length);
        continue;
      }
      if (d = this.tokenizer.text(r)) {
        r = r.substring(d.raw.length);
        let p = o.at(-1);
        p?.type === "text" ? (p.raw += (p.raw.endsWith(`
`) ? "" : `
`) + d.raw, p.text += `
` + d.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = p.text) : o.push(d);
        continue;
      }
      if (r) {
        this.infiniteLoopError(r.charCodeAt(0));
        break;
      }
    }
    return this.state.top = !0, o;
  }
  inline(r, o = []) {
    return this.inlineQueue.push({ src: r, tokens: o }), o;
  }
  linkInText(r) {
    if (!r.includes("[")) return !1;
    let o = this.tokenizer.rules.inline.link;
    for (let c of r.matchAll(this.tokenizer.rules.inline.blockSkip)) if (o.test(c[0]) && r.charAt(c.index - 1) !== "!") return !0;
    for (let c of r.matchAll(this.tokenizer.rules.inline.reflinkSearch)) {
      let f = c[0], d = f.lastIndexOf("[");
      if (!(f.charAt(0) === "!" || !Object.hasOwn(this.tokens.links, yc(f.slice(d + 1, -1)))) && !(d > 1 && this.linkInText(f.slice(1, d - 1)))) return !0;
    }
    return !1;
  }
  inlineTokens(r, o = []) {
    this.tokenizer.lexer = this;
    let c = r;
    if (this.tokens.links && r.includes("[")) {
      let p = this.tokenizer.rules.inline.reflinkSearch, S = (x) => {
        let A = x.lastIndexOf("[");
        if (!Object.hasOwn(this.tokens.links, yc(x.slice(A + 1, -1)))) return x;
        if (A > 1 && x.charAt(0) !== "!") {
          let v = x.slice(1, A - 1);
          if (this.linkInText(v)) return "[" + v.replace(p, S) + "][" + "a".repeat(x.length - A - 2) + "]";
        }
        return "[" + "a".repeat(x.length - 2) + "]";
      };
      c = c.replace(p, S);
    }
    c = c.replace(this.tokenizer.rules.inline.anyPunctuation, (p) => "+".repeat(p.length)), c = c.replace(this.tokenizer.rules.inline.blockSkip, (p, S, x) => {
      let A = x ? x.length : 0;
      return p.slice(0, A) + "[" + "a".repeat(p.length - A - 2) + "]";
    }), c = this.options.hooks?.emStrongMask?.call({ lexer: this }, c) ?? c;
    let f = !1, d = "", m = 1 / 0;
    for (; r; ) {
      if (r.length < m) m = r.length;
      else {
        this.infiniteLoopError(r.charCodeAt(0));
        break;
      }
      f || (d = ""), f = !1;
      let p;
      if (this.options.extensions?.inline?.some((x) => (p = x.call({ lexer: this }, r, o)) ? (r = r.substring(p.raw.length), o.push(p), !0) : !1)) continue;
      if (p = this.tokenizer.escape(r)) {
        r = r.substring(p.raw.length), o.push(p);
        continue;
      }
      if (p = this.tokenizer.tag(r)) {
        r = r.substring(p.raw.length), o.push(p);
        continue;
      }
      if (p = this.tokenizer.link(r)) {
        r = r.substring(p.raw.length), o.push(p);
        continue;
      }
      if (p = this.tokenizer.reflink(r, this.tokens.links)) {
        r = r.substring(p.raw.length);
        let x = o.at(-1);
        p.type === "text" && x?.type === "text" ? (x.raw += p.raw, x.text += p.text) : o.push(p);
        continue;
      }
      if (p = this.tokenizer.emStrong(r, c, d)) {
        r = r.substring(p.raw.length), o.push(p);
        continue;
      }
      if (p = this.tokenizer.codespan(r)) {
        r = r.substring(p.raw.length), o.push(p);
        continue;
      }
      if (p = this.tokenizer.br(r)) {
        r = r.substring(p.raw.length), o.push(p);
        continue;
      }
      if (p = this.tokenizer.del(r, c, d)) {
        r = r.substring(p.raw.length), o.push(p);
        continue;
      }
      if (p = this.tokenizer.autolink(r)) {
        r = r.substring(p.raw.length), o.push(p);
        continue;
      }
      if (!this.state.inLink && (p = this.tokenizer.url(r))) {
        r = r.substring(p.raw.length), o.push(p);
        continue;
      }
      let S = r;
      if (this.options.extensions?.startInline) {
        let x = 1 / 0, A = r.slice(1), v;
        this.options.extensions.startInline.forEach((N) => {
          v = N.call({ lexer: this }, A), typeof v == "number" && v >= 0 && (x = Math.min(x, v));
        }), x < 1 / 0 && x >= 0 && (S = r.substring(0, x + 1));
      }
      if (p = this.tokenizer.inlineText(S)) {
        r = r.substring(p.raw.length), p.raw.slice(-1) !== "_" && (d = p.raw.slice(-1)), f = !0;
        let x = o.at(-1);
        x?.type === "text" ? (x.raw += p.raw, x.text += p.text) : o.push(p);
        continue;
      }
      if (r) {
        this.infiniteLoopError(r.charCodeAt(0));
        break;
      }
    }
    return o;
  }
  infiniteLoopError(r) {
    let o = "Infinite loop on byte: " + r;
    if (this.options.silent) console.error(o);
    else throw new Error(o);
  }
}, Sc = class {
  options;
  parser;
  constructor(u) {
    this.options = u || ni;
  }
  space(u) {
    return "";
  }
  code({ text: u, lang: r, escaped: o }) {
    let c = (r || "").match(Gt.notSpaceStart)?.[0], f = u ? u.replace(Gt.endingNewline, "") + `
` : "";
    return c ? '<pre><code class="language-' + hn(c) + '">' + (o ? f : hn(f, !0)) + `</code></pre>
` : "<pre><code>" + (o ? f : hn(f, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: u }) {
    return `<blockquote>
${this.parser.parse(u)}</blockquote>
`;
  }
  html({ text: u }) {
    return u;
  }
  def(u) {
    return "";
  }
  heading({ tokens: u, depth: r }) {
    return `<h${r}>${this.parser.parseInline(u)}</h${r}>
`;
  }
  hr(u) {
    return `<hr>
`;
  }
  list(u) {
    let r = u.ordered, o = u.start, c = "";
    for (let m = 0; m < u.items.length; m++) {
      let p = u.items[m];
      c += this.listitem(p);
    }
    let f = r ? "ol" : "ul", d = r && o !== 1 ? ' start="' + o + '"' : "";
    return "<" + f + d + `>
` + c + "</" + f + `>
`;
  }
  listitem(u) {
    return `<li>${this.parser.parse(u.tokens)}</li>
`;
  }
  checkbox({ checked: u }) {
    return "<input " + (u ? 'checked="" ' : "") + 'disabled="" type="checkbox"> ';
  }
  paragraph({ tokens: u }) {
    return `<p>${this.parser.parseInline(u)}</p>
`;
  }
  table(u) {
    let r = "", o = "";
    for (let f = 0; f < u.header.length; f++) o += this.tablecell(u.header[f]);
    r += this.tablerow({ text: o });
    let c = "";
    for (let f = 0; f < u.rows.length; f++) {
      let d = u.rows[f];
      o = "";
      for (let m = 0; m < d.length; m++) o += this.tablecell(d[m]);
      c += this.tablerow({ text: o });
    }
    return c && (c = `<tbody>${c}</tbody>`), `<table>
<thead>
` + r + `</thead>
` + c + `</table>
`;
  }
  tablerow({ text: u }) {
    return `<tr>
${u}</tr>
`;
  }
  tablecell(u) {
    let r = this.parser.parseInline(u.tokens), o = u.header ? "th" : "td";
    return (u.align ? `<${o} align="${u.align}">` : `<${o}>`) + r + `</${o}>
`;
  }
  strong({ tokens: u }) {
    return `<strong>${this.parser.parseInline(u)}</strong>`;
  }
  em({ tokens: u }) {
    return `<em>${this.parser.parseInline(u)}</em>`;
  }
  codespan({ text: u }) {
    return `<code>${hn(u, !0)}</code>`;
  }
  br(u) {
    return "<br>";
  }
  del({ tokens: u }) {
    return `<del>${this.parser.parseInline(u)}</del>`;
  }
  link({ href: u, title: r, text: o, tokens: c, autolink: f }) {
    let d = f ? hn(o, !0) : this.parser.parseInline(c), m = Gv(u);
    if (m === null) return d;
    u = hn(m, f);
    let p = '<a href="' + u + '"';
    return r && (p += ' title="' + hn(r) + '"'), p += ">" + d + "</a>", p;
  }
  image({ href: u, title: r, text: o, tokens: c }) {
    c && (o = this.parser.parseInline(c, this.parser.textRenderer));
    let f = Gv(u);
    if (f === null) return hn(o);
    u = f;
    let d = `<img src="${hn(u)}" alt="${hn(o)}"`;
    return r && (d += ` title="${hn(r)}"`), d += ">", d;
  }
  text(u) {
    return "tokens" in u && u.tokens ? this.parser.parseInline(u.tokens) : "escaped" in u && u.escaped ? u.text : hn(u.text);
  }
}, Id = class {
  strong({ text: u }) {
    return u;
  }
  em({ text: u }) {
    return u;
  }
  codespan({ text: u }) {
    return u;
  }
  del({ text: u }) {
    return u;
  }
  html({ text: u }) {
    return u;
  }
  text({ text: u }) {
    return u;
  }
  link({ text: u }) {
    return "" + u;
  }
  image({ text: u }) {
    return "" + u;
  }
  br() {
    return "";
  }
  checkbox({ raw: u }) {
    return u;
  }
}, Vn = class zd {
  options;
  renderer;
  textRenderer;
  constructor(r) {
    this.options = r || ni, this.options.renderer = this.options.renderer || new Sc(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Id();
  }
  static parse(r, o) {
    return new zd(o).parse(r);
  }
  static parseInline(r, o) {
    return new zd(o).parseInline(r);
  }
  parse(r) {
    this.renderer.parser = this;
    let o = "";
    for (let c = 0; c < r.length; c++) {
      let f = r[c];
      if (this.options.extensions?.renderers?.[f.type]) {
        let m = f, p = this.options.extensions.renderers[m.type].call({ parser: this }, m);
        if (p !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "checkbox", "html", "def", "paragraph", "text"].includes(m.type)) {
          o += p || "";
          continue;
        }
      }
      let d = f;
      switch (d.type) {
        case "space": {
          o += this.renderer.space(d);
          break;
        }
        case "hr": {
          o += this.renderer.hr(d);
          break;
        }
        case "heading": {
          o += this.renderer.heading(d);
          break;
        }
        case "code": {
          o += this.renderer.code(d);
          break;
        }
        case "table": {
          o += this.renderer.table(d);
          break;
        }
        case "blockquote": {
          o += this.renderer.blockquote(d);
          break;
        }
        case "list": {
          o += this.renderer.list(d);
          break;
        }
        case "checkbox": {
          o += this.renderer.checkbox(d);
          break;
        }
        case "html": {
          o += this.renderer.html(d);
          break;
        }
        case "def": {
          o += this.renderer.def(d);
          break;
        }
        case "paragraph": {
          o += this.renderer.paragraph(d);
          break;
        }
        case "text": {
          o += this.renderer.text(d);
          break;
        }
        default: {
          let m = 'Token with "' + d.type + '" type was not found.';
          if (this.options.silent) return console.error(m), "";
          throw new Error(m);
        }
      }
    }
    return o;
  }
  parseInline(r, o = this.renderer) {
    this.renderer.parser = this;
    let c = "";
    for (let f = 0; f < r.length; f++) {
      let d = r[f];
      if (this.options.extensions?.renderers?.[d.type]) {
        let p = this.options.extensions.renderers[d.type].call({ parser: this }, d);
        if (p !== !1 || !["escape", "html", "link", "image", "checkbox", "strong", "em", "codespan", "br", "del", "text"].includes(d.type)) {
          c += p || "";
          continue;
        }
      }
      let m = d;
      switch (m.type) {
        case "escape": {
          c += o.text(m);
          break;
        }
        case "html": {
          c += o.html(m);
          break;
        }
        case "link": {
          c += o.link(m);
          break;
        }
        case "image": {
          c += o.image(m);
          break;
        }
        case "checkbox": {
          c += o.checkbox(m);
          break;
        }
        case "strong": {
          c += o.strong(m);
          break;
        }
        case "em": {
          c += o.em(m);
          break;
        }
        case "codespan": {
          c += o.codespan(m);
          break;
        }
        case "br": {
          c += o.br(m);
          break;
        }
        case "del": {
          c += o.del(m);
          break;
        }
        case "text": {
          c += o.text(m);
          break;
        }
        default: {
          let p = 'Token with "' + m.type + '" type was not found.';
          if (this.options.silent) return console.error(p), "";
          throw new Error(p);
        }
      }
    }
    return c;
  }
}, Er = class {
  options;
  block;
  constructor(u) {
    this.options = u || ni;
  }
  static passThroughHooks = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"]);
  static passThroughHooksRespectAsync = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"]);
  preprocess(u) {
    return u;
  }
  postprocess(u) {
    return u;
  }
  processAllTokens(u) {
    return u;
  }
  emStrongMask(u) {
    return u;
  }
  provideLexer(u = this.block) {
    return u ? qn.lex : qn.lexInline;
  }
  provideParser(u = this.block) {
    return u ? Vn.parse : Vn.parseInline;
  }
}, g_ = class {
  defaults = Vd();
  options = this.setOptions;
  parse = this.parseMarkdown(!0);
  parseInline = this.parseMarkdown(!1);
  Parser = Vn;
  Renderer = Sc;
  TextRenderer = Id;
  Lexer = qn;
  Tokenizer = bc;
  Hooks = Er;
  constructor(...u) {
    this.use(...u);
  }
  walkTokens(u, r) {
    let o = [];
    for (let c of u) switch (o = o.concat(r.call(this, c)), c.type) {
      case "table": {
        let f = c;
        for (let d of f.header) o = o.concat(this.walkTokens(d.tokens, r));
        for (let d of f.rows) for (let m of d) o = o.concat(this.walkTokens(m.tokens, r));
        break;
      }
      case "list": {
        let f = c;
        o = o.concat(this.walkTokens(f.items, r));
        break;
      }
      default: {
        let f = c;
        this.defaults.extensions?.childTokens?.[f.type] ? this.defaults.extensions.childTokens[f.type].forEach((d) => {
          let m = f[d].flat(1 / 0);
          o = o.concat(this.walkTokens(m, r));
        }) : f.tokens && (o = o.concat(this.walkTokens(f.tokens, r)));
      }
    }
    return o;
  }
  use(...u) {
    let r = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return u.forEach((o) => {
      let c = { ...o };
      if (c.async = this.defaults.async || c.async || !1, o.extensions && (o.extensions.forEach((f) => {
        if (!f.name) throw new Error("extension name required");
        if ("renderer" in f) {
          let d = r.renderers[f.name];
          d ? r.renderers[f.name] = function(...m) {
            let p = f.renderer.apply(this, m);
            return p === !1 && (p = d.apply(this, m)), p;
          } : r.renderers[f.name] = f.renderer;
        }
        if ("tokenizer" in f) {
          if (!f.level || f.level !== "block" && f.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let d = r[f.level];
          d ? d.unshift(f.tokenizer) : r[f.level] = [f.tokenizer], f.start && (f.level === "block" ? r.startBlock ? r.startBlock.push(f.start) : r.startBlock = [f.start] : f.level === "inline" && (r.startInline ? r.startInline.push(f.start) : r.startInline = [f.start]));
        }
        "childTokens" in f && f.childTokens && (r.childTokens[f.name] = f.childTokens);
      }), c.extensions = r), o.renderer) {
        let f = this.defaults.renderer || new Sc(this.defaults);
        for (let d in o.renderer) {
          if (!(d in f)) throw new Error(`renderer '${d}' does not exist`);
          if (["options", "parser"].includes(d)) continue;
          let m = d, p = o.renderer[m], S = f[m];
          f[m] = (...x) => {
            let A = p.apply(f, x);
            return A === !1 && (A = S.apply(f, x)), A || "";
          };
        }
        c.renderer = f;
      }
      if (o.tokenizer) {
        let f = this.defaults.tokenizer || new bc(this.defaults);
        for (let d in o.tokenizer) {
          if (!(d in f)) throw new Error(`tokenizer '${d}' does not exist`);
          if (["options", "rules", "lexer"].includes(d)) continue;
          let m = d, p = o.tokenizer[m], S = f[m];
          f[m] = (...x) => {
            let A = p.apply(f, x);
            return A === !1 && (A = S.apply(f, x)), A;
          };
        }
        c.tokenizer = f;
      }
      if (o.hooks) {
        let f = this.defaults.hooks || new Er();
        for (let d in o.hooks) {
          if (!(d in f)) throw new Error(`hook '${d}' does not exist`);
          if (["options", "block"].includes(d)) continue;
          let m = d, p = o.hooks[m], S = f[m];
          Er.passThroughHooks.has(d) ? f[m] = (x) => {
            if (this.defaults.async && Er.passThroughHooksRespectAsync.has(d)) return (async () => {
              let v = await p.call(f, x);
              return S.call(f, v);
            })();
            let A = p.call(f, x);
            return S.call(f, A);
          } : f[m] = (...x) => {
            if (this.defaults.async) return (async () => {
              let v = await p.apply(f, x);
              return v === !1 && (v = await S.apply(f, x)), v;
            })();
            let A = p.apply(f, x);
            return A === !1 && (A = S.apply(f, x)), A;
          };
        }
        c.hooks = f;
      }
      if (o.walkTokens) {
        let f = this.defaults.walkTokens, d = o.walkTokens;
        c.walkTokens = function(m) {
          let p = [];
          return p.push(d.call(this, m)), f && (p = p.concat(f.call(this, m))), p;
        };
      }
      this.defaults = { ...this.defaults, ...c };
    }), this;
  }
  setOptions(u) {
    return this.defaults = { ...this.defaults, ...u }, this;
  }
  lexer(u, r) {
    return qn.lex(u, r ?? this.defaults);
  }
  parser(u, r) {
    return Vn.parse(u, r ?? this.defaults);
  }
  parseMarkdown(u) {
    return (r, o) => {
      let c = { ...o }, f = { ...this.defaults, ...c }, d = this.onError(!!f.silent, !!f.async);
      if (this.defaults.async === !0 && c.async === !1) return d(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof r > "u" || r === null) return d(new Error("marked(): input parameter is undefined or null"));
      if (typeof r != "string") return d(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(r) + ", string expected"));
      if (f.hooks && (f.hooks.options = f, f.hooks.block = u), f.async) return (async () => {
        let m = f.hooks ? await f.hooks.preprocess(r) : r, p = await (f.hooks ? await f.hooks.provideLexer(u) : u ? qn.lex : qn.lexInline)(m, f), S = f.hooks ? await f.hooks.processAllTokens(p) : p;
        f.walkTokens && await Promise.all(this.walkTokens(S, f.walkTokens));
        let x = await (f.hooks ? await f.hooks.provideParser(u) : u ? Vn.parse : Vn.parseInline)(S, f);
        return f.hooks ? await f.hooks.postprocess(x) : x;
      })().catch(d);
      try {
        f.hooks && (r = f.hooks.preprocess(r));
        let m = (f.hooks ? f.hooks.provideLexer(u) : u ? qn.lex : qn.lexInline)(r, f);
        f.hooks && (m = f.hooks.processAllTokens(m)), f.walkTokens && this.walkTokens(m, f.walkTokens);
        let p = (f.hooks ? f.hooks.provideParser(u) : u ? Vn.parse : Vn.parseInline)(m, f);
        return f.hooks && (p = f.hooks.postprocess(p)), p;
      } catch (m) {
        return d(m);
      }
    };
  }
  onError(u, r) {
    return (o) => {
      if (o.message += `
Please report this to https://github.com/markedjs/marked.`, u) {
        let c = "<p>An error occurred:</p><pre>" + hn(o.message + "", !0) + "</pre>";
        return r ? Promise.resolve(c) : c;
      }
      if (r) return Promise.reject(o);
      throw o;
    };
  }
}, ti = new g_();
function Ve(u, r) {
  return ti.parse(u, r);
}
Ve.options = Ve.setOptions = function(u) {
  return ti.setOptions(u), Ve.defaults = ti.defaults, ab(Ve.defaults), Ve;
};
Ve.getDefaults = Vd;
Ve.defaults = ni;
function v_(...u) {
  return ti.use(...u), Ve.defaults = ti.defaults, ab(Ve.defaults), Ve;
}
Ve.use = v_;
Ve.walkTokens = function(u, r) {
  return ti.walkTokens(u, r);
};
Ve.parseInline = ti.parseInline;
Ve.Parser = Vn;
Ve.parser = Vn.parse;
Ve.Renderer = Sc;
Ve.TextRenderer = Id;
Ve.Lexer = qn;
Ve.lexer = qn.lex;
Ve.Tokenizer = bc;
Ve.Hooks = Er;
Ve.parse = Ve;
Ve.options;
Ve.setOptions;
Ve.walkTokens;
Ve.parseInline;
Vn.parse;
qn.lex;
Ve.setOptions({ breaks: !0, gfm: !0 });
lb.addHook("afterSanitizeAttributes", (u) => {
  u.tagName === "A" && u.hasAttribute("href") && (u.setAttribute("target", "_blank"), u.setAttribute("rel", "noopener noreferrer"));
});
function y_(u) {
  const r = Ve.parse(String(u ?? ""), { async: !1 });
  return lb.sanitize(r, { USE_PROFILES: { html: !0 } });
}
window.galMarkdown = { render: y_ };
const Fd = { "character-hub": MT, "memory-panel": UT, "speech-panel": jT, "help-panel": kT, history: LT }, Cr = document.createElement("div");
Cr.id = "panel-parking";
Cr.hidden = !0;
document.body.append(Cr);
const hb = Object.fromEntries(Object.keys(Fd).map((u) => {
  const r = document.createElement("div");
  return r.id = u, r.className = "gal-panel hidden", Cr.append(r), [u, r];
}));
let Dd;
const mb = {
  open(u) {
    ou.flushSync(() => Dd(u));
  },
  close() {
    ou.flushSync(() => Dd(null));
  },
  button() {
    const u = document.createElement("button");
    return u.type = "button", u.className = Fy({ variant: "ghost" }), u.dataset.slot = "button", u;
  },
  requestClose() {
    window.dispatchEvent(new Event("gal-request-close"));
  }
};
window.galUi = mb;
function b_({ id: u }) {
  const r = z.useRef(null);
  return z.useLayoutEffect(() => {
    const o = hb[u];
    return r.current.append(o), () => {
      Cr.append(o);
    };
  }, [u]), /* @__PURE__ */ y.jsx("div", { ref: r, className: "panel-mount" });
}
function S_() {
  const [u, r] = z.useState(null), [o, c] = z.useState("zh");
  Dd = r, z.useEffect(() => {
    const m = () => c(window.galVoice?.language || "zh");
    return window.addEventListener("gal-language", m), () => window.removeEventListener("gal-language", m);
  }, []);
  const f = { zh: ["角色", "记忆", "设置", "帮助与快捷键", "对话记录"], en: ["Character", "Memory", "Settings", "Help & shortcuts", "Conversation history"], ja: ["キャラクター", "記憶", "設定", "ヘルプとショートカット", "会話履歴"] }, d = u ? (f[o] || f.zh)[Object.keys(Fd).indexOf(u)] : "";
  return /* @__PURE__ */ y.jsx(AT, { open: !!u, onOpenChange: (m) => {
    m || mb.requestClose();
  }, children: /* @__PURE__ */ y.jsxs(Jy, { className: "gal-dialog", closeLabel: o === "zh" ? "关闭" : o === "ja" ? "閉じる" : "Close", "aria-describedby": void 0, onOpenAutoFocus: (m) => m.preventDefault(), onCloseAutoFocus: (m) => m.preventDefault(), onEscapeKeyDown: (m) => {
    m.isComposing && m.preventDefault();
  }, children: [
    /* @__PURE__ */ y.jsx($y, { className: "sr-only", children: d }),
    u && /* @__PURE__ */ y.jsx(b_, { id: u }, u)
  ] }) });
}
function E_() {
  return /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
    /* @__PURE__ */ y.jsx(CT, {}),
    Object.entries(Fd).map(([u, r]) => ou.createPortal(/* @__PURE__ */ y.jsx(r, {}), hb[u], u)),
    /* @__PURE__ */ y.jsx(S_, {})
  ] });
}
ou.flushSync(() => l1.createRoot(document.getElementById("root")).render(/* @__PURE__ */ y.jsx(E_, {})));
for (const u of ["voice-controls.js", "speech-settings.js", "character-state.js", "app.js", "layout-labels.js", "ui-labels.js"])
  await new Promise((r, o) => {
    const c = document.createElement("script");
    c.src = "./" + u, c.onload = () => r(), c.onerror = () => o(Error("Cannot load " + u)), document.body.append(c);
  });

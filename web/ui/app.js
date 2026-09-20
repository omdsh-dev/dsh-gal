function JS(u, r) {
  for (var c = 0; c < r.length; c++) {
    const o = r[c];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const f in o)
        if (f !== "default" && !(f in u)) {
          const d = Object.getOwnPropertyDescriptor(o, f);
          d && Object.defineProperty(u, f, d.get ? d : {
            enumerable: !0,
            get: () => o[f]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(u, Symbol.toStringTag, { value: "Module" }));
}
function $S(u) {
  return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
}
var Pf = { exports: {} }, mr = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pg;
function IS() {
  if (Pg) return mr;
  Pg = 1;
  var u = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function c(o, f, d) {
    var m = null;
    if (d !== void 0 && (m = "" + d), f.key !== void 0 && (m = "" + f.key), "key" in f) {
      d = {};
      for (var g in f)
        g !== "key" && (d[g] = f[g]);
    } else d = f;
    return f = d.ref, {
      $$typeof: u,
      type: o,
      key: m,
      ref: f !== void 0 ? f : null,
      props: d
    };
  }
  return mr.Fragment = r, mr.jsx = c, mr.jsxs = c, mr;
}
var Wg;
function FS() {
  return Wg || (Wg = 1, Pf.exports = IS()), Pf.exports;
}
var p = FS(), Wf = { exports: {} }, de = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ev;
function PS() {
  if (ev) return de;
  ev = 1;
  var u = Symbol.for("react.transitional.element"), r = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), d = Symbol.for("react.consumer"), m = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), T = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), y = Symbol.for("react.activity"), C = Symbol.for("react.view_transition"), q = Symbol.iterator;
  function H(E) {
    return E === null || typeof E != "object" ? null : (E = q && E[q] || E["@@iterator"], typeof E == "function" ? E : null);
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
  function Z(E, L, te) {
    this.props = E, this.context = L, this.refs = Q, this.updater = te || B;
  }
  Z.prototype.isReactComponent = {}, Z.prototype.setState = function(E, L) {
    if (typeof E != "object" && typeof E != "function" && E != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, E, L, "setState");
  }, Z.prototype.forceUpdate = function(E) {
    this.updater.enqueueForceUpdate(this, E, "forceUpdate");
  };
  function ae() {
  }
  ae.prototype = Z.prototype;
  function ie(E, L, te) {
    this.props = E, this.context = L, this.refs = Q, this.updater = te || B;
  }
  var W = ie.prototype = new ae();
  W.constructor = ie, j(W, Z.prototype), W.isPureReactComponent = !0;
  var se = Array.isArray;
  function ee() {
  }
  var he = { H: null, A: null, T: null, S: null }, Pe = Object.prototype.hasOwnProperty;
  function Ae(E, L, te) {
    var ne = te.ref;
    return {
      $$typeof: u,
      type: E,
      key: L,
      ref: ne !== void 0 ? ne : null,
      props: te
    };
  }
  function De(E, L) {
    return Ae(E.type, L, E.props);
  }
  function I(E) {
    return typeof E == "object" && E !== null && E.$$typeof === u;
  }
  function St(E) {
    var L = { "=": "=0", ":": "=2" };
    return "$" + E.replace(/[=:]/g, function(te) {
      return L[te];
    });
  }
  var ot = /\/+/g;
  function Je(E, L) {
    return typeof E == "object" && E !== null && E.key != null ? St("" + E.key) : L.toString(36);
  }
  function V(E) {
    switch (E.status) {
      case "fulfilled":
        return E.value;
      case "rejected":
        throw E.reason;
      default:
        switch (typeof E.status == "string" ? E.then(ee, ee) : (E.status = "pending", E.then(
          function(L) {
            E.status === "pending" && (E.status = "fulfilled", E.value = L);
          },
          function(L) {
            E.status === "pending" && (E.status = "rejected", E.reason = L);
          }
        )), E.status) {
          case "fulfilled":
            return E.value;
          case "rejected":
            throw E.reason;
        }
    }
    throw E;
  }
  function ue(E, L, te, ne, Re) {
    var we = typeof E;
    (we === "undefined" || we === "boolean") && (E = null);
    var Me = !1;
    if (E === null) Me = !0;
    else
      switch (we) {
        case "bigint":
        case "string":
        case "number":
          Me = !0;
          break;
        case "object":
          switch (E.$$typeof) {
            case u:
            case r:
              Me = !0;
              break;
            case A:
              return Me = E._init, ue(
                Me(E._payload),
                L,
                te,
                ne,
                Re
              );
          }
      }
    if (Me)
      return Re = Re(E), Me = ne === "" ? "." + Je(E, 0) : ne, se(Re) ? (te = "", Me != null && (te = Me.replace(ot, "$&/") + "/"), ue(Re, L, te, "", function(Dn) {
        return Dn;
      })) : Re != null && (I(Re) && (Re = De(
        Re,
        te + (Re.key == null || E && E.key === Re.key ? "" : ("" + Re.key).replace(
          ot,
          "$&/"
        ) + "/") + Me
      )), L.push(Re)), 1;
    Me = 0;
    var P = ne === "" ? "." : ne + ":";
    if (se(E))
      for (var fe = 0; fe < E.length; fe++)
        ne = E[fe], we = P + Je(ne, fe), Me += ue(
          ne,
          L,
          te,
          we,
          Re
        );
    else if (fe = H(E), typeof fe == "function")
      for (E = fe.call(E), fe = 0; !(ne = E.next()).done; )
        ne = ne.value, we = P + Je(ne, fe++), Me += ue(
          ne,
          L,
          te,
          we,
          Re
        );
    else if (we === "object") {
      if (typeof E.then == "function")
        return ue(
          V(E),
          L,
          te,
          ne,
          Re
        );
      throw L = String(E), Error(
        "Objects are not valid as a React child (found: " + (L === "[object Object]" ? "object with keys {" + Object.keys(E).join(", ") + "}" : L) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Me;
  }
  function re(E, L, te) {
    if (E == null) return E;
    var ne = [], Re = 0;
    return ue(E, ne, "", "", function(we) {
      return L.call(te, we, Re++);
    }), ne;
  }
  function Se(E) {
    if (E._status === -1) {
      var L = E._result, te = L();
      te.then(
        function(ne) {
          (E._status === 0 || E._status === -1) && (E._status = 1, E._result = ne, te.status === void 0 && (te.status = "fulfilled", te.value = ne));
        },
        function(ne) {
          (E._status === 0 || E._status === -1) && (E._status = 2, E._result = ne, te.status === void 0 && (te.status = "rejected", te.reason = ne));
        }
      ), E._status === -1 && (E._status = 0, E._result = te);
    }
    if (E._status === 1) return E._result.default;
    throw E._result;
  }
  var xe = typeof reportError == "function" ? reportError : function(E) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var L = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof E == "object" && E !== null && typeof E.message == "string" ? String(E.message) : String(E),
        error: E
      });
      if (!window.dispatchEvent(L)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", E);
      return;
    }
    console.error(E);
  };
  function tt(E) {
    var L = he.T, te = {};
    te.types = L !== null ? L.types : null, he.T = te;
    try {
      var ne = E(), Re = he.S;
      Re !== null && Re(te, ne), typeof ne == "object" && ne !== null && typeof ne.then == "function" && ne.then(ee, xe);
    } catch (we) {
      xe(we);
    } finally {
      L !== null && te.types !== null && (L.types = te.types), he.T = L;
    }
  }
  function zn(E) {
    var L = he.T;
    if (L !== null) {
      var te = L.types;
      te === null ? L.types = [E] : te.indexOf(E) === -1 && te.push(E);
    } else tt(zn.bind(null, E));
  }
  var ml = {
    map: re,
    forEach: function(E, L, te) {
      re(
        E,
        function() {
          L.apply(this, arguments);
        },
        te
      );
    },
    count: function(E) {
      var L = 0;
      return re(E, function() {
        L++;
      }), L;
    },
    toArray: function(E) {
      return re(E, function(L) {
        return L;
      }) || [];
    },
    only: function(E) {
      if (!I(E))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return E;
    }
  };
  return de.Activity = y, de.Children = ml, de.Component = Z, de.Fragment = c, de.Profiler = f, de.PureComponent = ie, de.StrictMode = o, de.Suspense = S, de.ViewTransition = C, de.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = he, de.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(E) {
      return he.H.useMemoCache(E);
    }
  }, de.addTransitionType = zn, de.cache = function(E) {
    return function() {
      return E.apply(null, arguments);
    };
  }, de.cacheSignal = function() {
    return null;
  }, de.cloneElement = function(E, L, te) {
    if (E == null)
      throw Error(
        "The argument must be a React element, but you passed " + E + "."
      );
    var ne = j({}, E.props), Re = E.key;
    if (L != null)
      for (we in L.key !== void 0 && (Re = "" + L.key), L)
        !Pe.call(L, we) || we === "key" || we === "__self" || we === "__source" || we === "ref" && L.ref === void 0 || (ne[we] = L[we]);
    var we = arguments.length - 2;
    if (we === 1) ne.children = te;
    else if (1 < we) {
      for (var Me = Array(we), P = 0; P < we; P++)
        Me[P] = arguments[P + 2];
      ne.children = Me;
    }
    return Ae(E.type, Re, ne);
  }, de.createContext = function(E) {
    return E = {
      $$typeof: m,
      _currentValue: E,
      _currentValue2: E,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, E.Provider = E, E.Consumer = {
      $$typeof: d,
      _context: E
    }, E;
  }, de.createElement = function(E, L, te) {
    var ne, Re = {}, we = null;
    if (L != null)
      for (ne in L.key !== void 0 && (we = "" + L.key), L)
        Pe.call(L, ne) && ne !== "key" && ne !== "__self" && ne !== "__source" && (Re[ne] = L[ne]);
    var Me = arguments.length - 2;
    if (Me === 1) Re.children = te;
    else if (1 < Me) {
      for (var P = Array(Me), fe = 0; fe < Me; fe++)
        P[fe] = arguments[fe + 2];
      Re.children = P;
    }
    if (E && E.defaultProps)
      for (ne in Me = E.defaultProps, Me)
        Re[ne] === void 0 && (Re[ne] = Me[ne]);
    return Ae(E, we, Re);
  }, de.createRef = function() {
    return { current: null };
  }, de.forwardRef = function(E) {
    return { $$typeof: g, render: E };
  }, de.isValidElement = I, de.lazy = function(E) {
    return {
      $$typeof: A,
      _payload: { _status: -1, _result: E },
      _init: Se
    };
  }, de.memo = function(E, L) {
    return {
      $$typeof: T,
      type: E,
      compare: L === void 0 ? null : L
    };
  }, de.startTransition = tt, de.unstable_useCacheRefresh = function() {
    return he.H.useCacheRefresh();
  }, de.use = function(E) {
    return he.H.use(E);
  }, de.useActionState = function(E, L, te) {
    return he.H.useActionState(E, L, te);
  }, de.useCallback = function(E, L) {
    return he.H.useCallback(E, L);
  }, de.useContext = function(E) {
    return he.H.useContext(E);
  }, de.useDebugValue = function() {
  }, de.useDeferredValue = function(E, L) {
    return he.H.useDeferredValue(E, L);
  }, de.useEffect = function(E, L) {
    return he.H.useEffect(E, L);
  }, de.useEffectEvent = function(E) {
    return he.H.useEffectEvent(E);
  }, de.useId = function() {
    return he.H.useId();
  }, de.useImperativeHandle = function(E, L, te) {
    return he.H.useImperativeHandle(E, L, te);
  }, de.useInsertionEffect = function(E, L) {
    return he.H.useInsertionEffect(E, L);
  }, de.useLayoutEffect = function(E, L) {
    return he.H.useLayoutEffect(E, L);
  }, de.useMemo = function(E, L) {
    return he.H.useMemo(E, L);
  }, de.useOptimistic = function(E, L) {
    return he.H.useOptimistic(E, L);
  }, de.useReducer = function(E, L, te) {
    return he.H.useReducer(E, L, te);
  }, de.useRef = function(E) {
    return he.H.useRef(E);
  }, de.useState = function(E) {
    return he.H.useState(E);
  }, de.useSyncExternalStore = function(E, L, te) {
    return he.H.useSyncExternalStore(
      E,
      L,
      te
    );
  }, de.useTransition = function() {
    return he.H.useTransition();
  }, de.version = "19.3.0", de;
}
var tv;
function Ud() {
  return tv || (tv = 1, Wf.exports = PS()), Wf.exports;
}
var z = Ud();
const WS = /* @__PURE__ */ $S(z), Ar = /* @__PURE__ */ JS({
  __proto__: null,
  default: WS
}, [z]);
var ed = { exports: {} }, pr = {}, td = { exports: {} }, nd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nv;
function ex() {
  return nv || (nv = 1, (function(u) {
    function r(V, ue) {
      var re = V.length;
      V.push(ue);
      e: for (; 0 < re; ) {
        var Se = re - 1 >>> 1, xe = V[Se];
        if (0 < f(xe, ue))
          V[Se] = ue, V[re] = xe, re = Se;
        else break e;
      }
    }
    function c(V) {
      return V.length === 0 ? null : V[0];
    }
    function o(V) {
      if (V.length === 0) return null;
      var ue = V[0], re = V.pop();
      if (re !== ue) {
        V[0] = re;
        e: for (var Se = 0, xe = V.length, tt = xe >>> 1; Se < tt; ) {
          var zn = 2 * (Se + 1) - 1, ml = V[zn], E = zn + 1, L = V[E];
          if (0 > f(ml, re))
            E < xe && 0 > f(L, ml) ? (V[Se] = L, V[E] = re, Se = E) : (V[Se] = ml, V[zn] = re, Se = zn);
          else if (E < xe && 0 > f(L, re))
            V[Se] = L, V[E] = re, Se = E;
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
      var m = Date, g = m.now();
      u.unstable_now = function() {
        return m.now() - g;
      };
    }
    var S = [], T = [], A = 1, y = null, C = 3, q = !1, H = !1, B = !1, j = !1, Q = typeof setTimeout == "function" ? setTimeout : null, Z = typeof clearTimeout == "function" ? clearTimeout : null, ae = typeof setImmediate < "u" ? setImmediate : null;
    function ie(V) {
      for (var ue = c(T); ue !== null; ) {
        if (ue.callback === null) o(T);
        else if (ue.startTime <= V)
          o(T), ue.sortIndex = ue.expirationTime, r(S, ue);
        else break;
        ue = c(T);
      }
    }
    function W(V) {
      if (B = !1, ie(V), !H)
        if (c(S) !== null)
          H = !0, se || (se = !0, I());
        else {
          var ue = c(T);
          ue !== null && Je(W, ue.startTime - V);
        }
    }
    var se = !1, ee = -1, he = 5, Pe = -1;
    function Ae() {
      return j ? !0 : !(u.unstable_now() - Pe < he);
    }
    function De() {
      if (j = !1, se) {
        var V = u.unstable_now();
        Pe = V;
        var ue = !0;
        try {
          e: {
            H = !1, B && (B = !1, Z(ee), ee = -1), q = !0;
            var re = C;
            try {
              t: {
                for (ie(V), y = c(S); y !== null && !(y.expirationTime > V && Ae()); ) {
                  var Se = y.callback;
                  if (typeof Se == "function") {
                    y.callback = null, C = y.priorityLevel;
                    var xe = Se(
                      y.expirationTime <= V
                    );
                    if (V = u.unstable_now(), typeof xe == "function") {
                      y.callback = xe, ie(V), ue = !0;
                      break t;
                    }
                    y === c(S) && o(S), ie(V);
                  } else o(S);
                  y = c(S);
                }
                if (y !== null) ue = !0;
                else {
                  var tt = c(T);
                  tt !== null && Je(
                    W,
                    tt.startTime - V
                  ), ue = !1;
                }
              }
              break e;
            } finally {
              y = null, C = re, q = !1;
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
        ae(De);
      };
    else if (typeof MessageChannel < "u") {
      var St = new MessageChannel(), ot = St.port2;
      St.port1.onmessage = De, I = function() {
        ot.postMessage(null);
      };
    } else
      I = function() {
        Q(De, 0);
      };
    function Je(V, ue) {
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
      return C;
    }, u.unstable_next = function(V) {
      switch (C) {
        case 1:
        case 2:
        case 3:
          var ue = 3;
          break;
        default:
          ue = C;
      }
      var re = C;
      C = ue;
      try {
        return V();
      } finally {
        C = re;
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
      var re = C;
      C = V;
      try {
        return ue();
      } finally {
        C = re;
      }
    }, u.unstable_scheduleCallback = function(V, ue, re) {
      var Se = u.unstable_now();
      switch (typeof re == "object" && re !== null ? (re = re.delay, re = typeof re == "number" && 0 < re ? Se + re : Se) : re = Se, V) {
        case 1:
          var xe = -1;
          break;
        case 2:
          xe = 250;
          break;
        case 5:
          xe = 1073741823;
          break;
        case 4:
          xe = 1e4;
          break;
        default:
          xe = 5e3;
      }
      return xe = re + xe, V = {
        id: A++,
        callback: ue,
        priorityLevel: V,
        startTime: re,
        expirationTime: xe,
        sortIndex: -1
      }, re > Se ? (V.sortIndex = re, r(T, V), c(S) === null && V === c(T) && (B ? (Z(ee), ee = -1) : B = !0, Je(W, re - Se))) : (V.sortIndex = xe, r(S, V), H || q || (H = !0, se || (se = !0, I()))), V;
    }, u.unstable_shouldYield = Ae, u.unstable_wrapCallback = function(V) {
      var ue = C;
      return function() {
        var re = C;
        C = ue;
        try {
          return V.apply(this, arguments);
        } finally {
          C = re;
        }
      };
    };
  })(nd)), nd;
}
var lv;
function tx() {
  return lv || (lv = 1, td.exports = ex()), td.exports;
}
var ld = { exports: {} }, kt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var av;
function nx() {
  if (av) return kt;
  av = 1;
  var u = Ud();
  function r(A) {
    var y = "https://react.dev/errors/" + A;
    if (1 < arguments.length) {
      y += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var C = 2; C < arguments.length; C++)
        y += "&args[]=" + encodeURIComponent(arguments[C]);
    }
    return "Minified React error #" + A + "; visit " + y + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function c() {
  }
  var o = {
    d: {
      f: c,
      r: function() {
        throw Error(r(522));
      },
      D: c,
      C: c,
      L: c,
      m: c,
      X: c,
      S: c,
      M: c
    },
    p: 0,
    findDOMNode: null
  }, f = Symbol.for("react.portal"), d = Symbol.for("react.recoverable"), m = Symbol.for("react.optimistic_key");
  function g(A, y, C) {
    var q = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: f,
      key: q == null ? null : q === m ? m : "" + q,
      children: A,
      containerInfo: y,
      implementation: C
    };
  }
  var S = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function T(A, y) {
    if (A === "font") return "";
    if (typeof y == "string")
      return y === "use-credentials" ? y : "";
  }
  return kt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, kt.browser = function(A) {
    return { $$typeof: d, _reason: A };
  }, kt.createPortal = function(A, y) {
    var C = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!y || y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)
      throw Error(r(299));
    return g(A, y, null, C);
  }, kt.flushSync = function(A) {
    var y = S.T, C = o.p;
    try {
      if (S.T = null, o.p = 2, A) return A();
    } finally {
      S.T = y, o.p = C, o.d.f();
    }
  }, kt.preconnect = function(A, y) {
    typeof A == "string" && (y ? (y = y.crossOrigin, y = typeof y == "string" ? y === "use-credentials" ? y : "" : void 0) : y = null, o.d.C(A, y));
  }, kt.prefetchDNS = function(A) {
    typeof A == "string" && o.d.D(A);
  }, kt.preinit = function(A, y) {
    if (typeof A == "string" && y && typeof y.as == "string") {
      var C = y.as, q = T(C, y.crossOrigin), H = typeof y.integrity == "string" ? y.integrity : void 0, B = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
      C === "style" ? o.d.S(
        A,
        typeof y.precedence == "string" ? y.precedence : void 0,
        {
          crossOrigin: q,
          integrity: H,
          fetchPriority: B
        }
      ) : C === "script" && o.d.X(A, {
        crossOrigin: q,
        integrity: H,
        fetchPriority: B,
        nonce: typeof y.nonce == "string" ? y.nonce : void 0
      });
    }
  }, kt.preinitModule = function(A, y) {
    if (typeof A == "string")
      if (typeof y == "object" && y !== null) {
        if (y.as == null || y.as === "script") {
          var C = T(
            y.as,
            y.crossOrigin
          );
          o.d.M(A, {
            crossOrigin: C,
            integrity: typeof y.integrity == "string" ? y.integrity : void 0,
            nonce: typeof y.nonce == "string" ? y.nonce : void 0,
            fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0
          });
        }
      } else y == null && o.d.M(A);
  }, kt.preload = function(A, y) {
    if (typeof A == "string" && typeof y == "object" && y !== null && typeof y.as == "string") {
      var C = y.as, q = T(C, y.crossOrigin);
      o.d.L(A, C, {
        crossOrigin: q,
        integrity: typeof y.integrity == "string" ? y.integrity : void 0,
        nonce: typeof y.nonce == "string" ? y.nonce : void 0,
        type: typeof y.type == "string" ? y.type : void 0,
        fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0,
        referrerPolicy: typeof y.referrerPolicy == "string" ? y.referrerPolicy : void 0,
        imageSrcSet: typeof y.imageSrcSet == "string" ? y.imageSrcSet : void 0,
        imageSizes: typeof y.imageSizes == "string" ? y.imageSizes : void 0,
        media: typeof y.media == "string" ? y.media : void 0
      });
    }
  }, kt.preloadModule = function(A, y) {
    if (typeof A == "string")
      if (y) {
        var C = T(y.as, y.crossOrigin);
        o.d.m(A, {
          as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
          crossOrigin: C,
          integrity: typeof y.integrity == "string" ? y.integrity : void 0,
          nonce: typeof y.nonce == "string" ? y.nonce : void 0,
          fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0
        });
      } else o.d.m(A);
  }, kt.requestFormReset = function(A) {
    o.d.r(A);
  }, kt.unstable_batchedUpdates = function(A, y) {
    return A(y);
  }, kt.useFormState = function(A, y, C) {
    return S.H.useFormState(A, y, C);
  }, kt.useFormStatus = function() {
    return S.H.useHostTransitionStatus();
  }, kt.version = "19.3.0", kt;
}
var iv;
function Kv() {
  if (iv) return ld.exports;
  iv = 1;
  function u() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (r) {
        console.error(r);
      }
  }
  return u(), ld.exports = nx(), ld.exports;
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
var uv;
function lx() {
  if (uv) return pr;
  uv = 1;
  var u = tx(), r = Ud(), c = Kv();
  function o(e) {
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
  function g(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function S(e) {
    if (d(e) !== e)
      throw Error(o(188));
  }
  function T(e) {
    var t = e.alternate;
    if (!t) {
      if (t = d(e), t === null) throw Error(o(188));
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
        throw Error(o(188));
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
          if (!s) throw Error(o(189));
        }
      }
      if (n.alternate !== l) throw Error(o(190));
    }
    if (n.tag !== 3) throw Error(o(188));
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
  function y(e, t, n, l, a, i) {
    for (; e !== null; ) {
      if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && n(e, l, a, i) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && y(
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
  function C(e) {
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
    var t = [null, null], n = C(e);
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
        throw Error(o(559));
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
  var ee = Object.assign, he = Symbol.for("react.element"), Pe = Symbol.for("react.transitional.element"), Ae = Symbol.for("react.portal"), De = Symbol.for("react.fragment"), I = Symbol.for("react.strict_mode"), St = Symbol.for("react.profiler"), ot = Symbol.for("react.consumer"), Je = Symbol.for("react.context"), V = Symbol.for("react.forward_ref"), ue = Symbol.for("react.suspense"), re = Symbol.for("react.suspense_list"), Se = Symbol.for("react.memo"), xe = Symbol.for("react.lazy"), tt = Symbol.for("react.activity"), zn = Symbol.for("react.legacy_hidden"), ml = Symbol.for("react.memo_cache_sentinel"), E = Symbol.for("react.view_transition"), L = Symbol.for("react.recoverable"), te = Symbol.iterator;
  function ne(e) {
    return e === null || typeof e != "object" ? null : (e = te && e[te] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Re = Symbol.for("react.client.reference");
  function we(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Re ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case De:
        return "Fragment";
      case St:
        return "Profiler";
      case I:
        return "StrictMode";
      case ue:
        return "Suspense";
      case re:
        return "SuspenseList";
      case tt:
        return "Activity";
      case E:
        return "ViewTransition";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Ae:
          return "Portal";
        case Je:
          return e.displayName || "Context";
        case ot:
          return (e._context.displayName || "Context") + ".Consumer";
        case V:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case Se:
          return t = e.displayName || null, t !== null ? t : we(e.type) || "Memo";
        case xe:
          t = e._payload, e = e._init;
          try {
            return we(e(t));
          } catch {
          }
      }
    return null;
  }
  var Me = Array.isArray, P = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, fe = c.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Dn = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ii = [], Ue = -1;
  function Jt(e) {
    return { current: e };
  }
  function me(e) {
    0 > Ue || (e.current = ii[Ue], ii[Ue] = null, Ue--);
  }
  function Le(e, t) {
    Ue++, ii[Ue] = e.current, e.current = t;
  }
  var st = Jt(null), Mn = Jt(null), jn = Jt(null), nn = Jt(null);
  function _a(e, t) {
    switch (Le(jn, t), Le(Mn, e), Le(st, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? rg(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = rg(t), e = cg(t, e);
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
    me(st), Le(st, e);
  }
  function Jn() {
    me(st), me(Mn), me(jn);
  }
  function ui(e) {
    var t = e.memoizedState;
    t !== null && (Ii._currentValue = t.memoizedState, Le(nn, e)), t = st.current;
    var n = cg(t, e.type);
    t !== n && (Le(Mn, e), Le(st, n));
  }
  function Aa(e) {
    Mn.current === e && (me(st), me(Mn)), nn.current === e && (me(nn), Ii._currentValue = Dn);
  }
  var vn, $n;
  function Lt(e) {
    if (vn === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        vn = t && t[1] || "", $n = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + vn + e + $n;
  }
  var Oa = !1;
  function kl(e, t) {
    if (!e || Oa) return "";
    Oa = !0;
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
`), N = h.split(`
`);
        for (a = l = 0; l < b.length && !b[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; a < N.length && !N[a].includes(
          "DetermineComponentFrameRoot"
        ); )
          a++;
        if (l === b.length || a === N.length)
          for (l = b.length - 1, a = N.length - 1; 1 <= l && 0 <= a && b[l] !== N[a]; )
            a--;
        for (; 1 <= l && 0 <= a; l--, a--)
          if (b[l] !== N[a]) {
            if (l !== 1 || a !== 1)
              do
                if (l--, a--, 0 > a || b[l] !== N[a]) {
                  var M = `
` + b[l].replace(" at new ", " at ");
                  return e.displayName && M.includes("<anonymous>") && (M = M.replace("<anonymous>", e.displayName)), M;
                }
              while (1 <= l && 0 <= a);
            break;
          }
      }
    } finally {
      Oa = !1, Error.prepareStackTrace = n;
    }
    return (n = e ? e.displayName || e.name : "") ? Lt(n) : "";
  }
  function ri(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Lt(e.type);
      case 16:
        return Lt("Lazy");
      case 13:
        return e.child !== t && t !== null ? Lt("Suspense Fallback") : Lt("Suspense");
      case 19:
        return Lt("SuspenseList");
      case 0:
      case 15:
        return kl(e.type, !1);
      case 11:
        return kl(e.type.render, !1);
      case 1:
        return kl(e.type, !0);
      case 31:
        return Lt("Activity");
      case 30:
        return Lt("ViewTransition");
      default:
        return "";
    }
  }
  function ci(e) {
    try {
      var t = "", n = null;
      do
        t += ri(e, n), n = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var In = Object.prototype.hasOwnProperty, Ll = u.unstable_scheduleCallback, Hl = u.unstable_cancelCallback, zr = u.unstable_shouldYield, Dr = u.unstable_requestPaint, Ht = u.unstable_now, gu = u.unstable_getCurrentPriorityLevel, oi = u.unstable_ImmediatePriority, pl = u.unstable_UserBlockingPriority, Un = u.unstable_NormalPriority, Mr = u.unstable_LowPriority, vu = u.unstable_IdlePriority, jr = u.log, Ur = u.unstable_setDisableYieldValue, Bl = null, xt = null;
  function ln(e) {
    if (typeof jr == "function" && Ur(e), xt && typeof xt.setStrictMode == "function")
      try {
        xt.setStrictMode(Bl, e);
      } catch {
      }
  }
  var nt = Math.clz32 ? Math.clz32 : bu, Gl = Math.log, yu = Math.LN2;
  function bu(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Gl(e) / yu | 0) | 0;
  }
  var si = 256, Na = 262144, Yl = 4194304;
  function Fn(e) {
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
  function ql(e, t, n) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var a = 0, i = e.suspendedLanes, s = e.pingedLanes;
    e = e.warmLanes;
    var h = l & 134217727;
    return h !== 0 ? (l = h & ~i, l !== 0 ? a = Fn(l) : (s &= h, s !== 0 ? a = Fn(s) : n || (n = h & ~e, n !== 0 && (a = Fn(n))))) : (h = l & ~i, h !== 0 ? a = Fn(h) : s !== 0 ? a = Fn(s) : n || (n = l & ~e, n !== 0 && (a = Fn(n)))), a === 0 ? 0 : t !== 0 && t !== a && (t & i) === 0 && (i = a & -a, n = t & -t, i >= n || i === 32 && (n & 4194048) !== 0) ? t : a;
  }
  function Ra(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Vl(e, t) {
    (t & 8) !== 0 && (t |= t & 32);
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var l = 31 - nt(n), a = 1 << l;
        t |= e[l], n &= ~a;
      }
    return t;
  }
  function Ao(e, t) {
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
  function kr() {
    var e = Yl;
    return Yl <<= 1, (Yl & 62914560) === 0 && (Yl = 4194304), e;
  }
  function We(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function yn(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Oo(e, t, n, l, a, i) {
    var s = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var h = e.entanglements, b = e.expirationTimes, N = e.hiddenUpdates;
    for (n = s & ~n; 0 < n; ) {
      var M = 31 - nt(n), k = 1 << M;
      h[M] = 0, b[M] = -1;
      var _ = N[M];
      if (_ !== null)
        for (N[M] = null, M = 0; M < _.length; M++) {
          var D = _[M];
          D !== null && (D.lane &= -536870913);
        }
      n &= ~k;
    }
    l !== 0 && Su(e, l, 0), i !== 0 && a === 0 && e.tag !== 0 && (e.suspendedLanes |= i & ~(s & ~t));
  }
  function Su(e, t, n) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - nt(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | n & 261930;
  }
  function fi(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var l = 31 - nt(n), a = 1 << l;
      a & t | e[l] & t && (e[l] |= t), n &= ~a;
    }
  }
  function xu(e, t) {
    var n = t & -t;
    return n = (n & 42) !== 0 ? 1 : di(n), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n;
  }
  function di(e) {
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
  function Eu(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Lr() {
    var e = fe.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Qg(e.type));
  }
  function Hr(e, t) {
    var n = fe.p;
    try {
      return fe.p = e, t();
    } finally {
      fe.p = n;
    }
  }
  var kn = Math.random().toString(36).slice(2), $e = "__reactFiber$" + kn, Rt = "__reactProps$" + kn, Ln = "__reactContainer$" + kn, Pn = "__reactEvents$" + kn, No = "__reactListeners$" + kn, hi = "__reactHandles$" + kn, Tu = "__reactResources$" + kn, Ca = "__reactMarker$" + kn, wa = "__reactLoad$" + kn;
  function za(e) {
    delete e[$e], delete e[Rt], delete e[No], delete e[hi];
  }
  function bn(e) {
    var t;
    if (t = e[$e]) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[Ln] || n[$e]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = Ag(e); e !== null; ) {
            if (n = e[$e]) return n;
            e = Ag(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function Wn(e) {
    if (e = e[$e] || e[Ln]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function el(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function an(e) {
    var t = e[Tu];
    return t || (t = e[Tu] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function lt(e) {
    e[Ca] = !0;
  }
  function un(e) {
    e[wa] = void 0;
  }
  var Br = /* @__PURE__ */ new Set(), Da = {};
  function gl(e, t) {
    vl(e, t), vl(e + "Capture", t);
  }
  function vl(e, t) {
    for (Da[e] = t, e = 0; e < t.length; e++)
      Br.add(t[e]);
  }
  var Gr = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), _u = {}, Au = {};
  function Ro(e) {
    return In.call(Au, e) ? !0 : In.call(_u, e) ? !1 : Gr.test(e) ? Au[e] = !0 : (_u[e] = !0, !1);
  }
  var Ce = !1;
  function Yr() {
    var e = Ce;
    return Ce = !1, e;
  }
  function mi(e, t, n) {
    if (Ro(t))
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
  function Ma(e, t, n) {
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
  function $t(e, t, n, l) {
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
  function v(e, t, n) {
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
  function R(e) {
    if (!e._valueTracker) {
      var t = Y(e) ? "checked" : "value";
      e._valueTracker = v(
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
  function ce(e, t, n, l, a, i, s, h) {
    e.name = "", s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.type = s : e.removeAttribute("type"), t != null ? s === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Ct(t)) : e.value !== "" + Ct(t) && (e.value = "" + Ct(t)) : s !== "submit" && s !== "reset" || e.removeAttribute("value"), t != null ? s === "number" && e.value == t ? Ze(e, Ct(e.value)) : Ze(e, Ct(t)) : n != null ? Ze(e, Ct(n)) : l != null && e.removeAttribute("value"), a == null && i != null && (e.defaultChecked = !!i), a != null && (e.checked = a && typeof a != "function" && typeof a != "symbol"), h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? e.name = "" + Ct(h) : e.removeAttribute("name");
  }
  function Be(e, t, n, l, a, i, s, h) {
    if (i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (e.type = i), t != null || n != null) {
      if (!(i !== "submit" && i !== "reset" || t != null)) {
        R(e);
        return;
      }
      n = n != null ? "" + Ct(n) : "", t = t != null ? "" + Ct(t) : n, h || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? a, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = h ? e.checked : !!l, e.defaultChecked = !!l, s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (e.name = s), R(e);
  }
  function Ze(e, t) {
    e.defaultValue !== "" + t && (e.defaultValue = "" + t);
  }
  function ft(e, t, n, l) {
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
  function wt(e, t, n) {
    if (t != null && (t = "" + Ct(t), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + Ct(n) : "";
  }
  function pi(e, t, n, l) {
    if (t == null) {
      if (l != null) {
        if (n != null) throw Error(o(92));
        if (Me(l)) {
          if (1 < l.length) throw Error(o(93));
          l = l[0];
        }
        n = l;
      }
      n == null && (n = ""), t = n;
    }
    n = Ct(t), e.defaultValue = n, l = e.textContent, l === n && l !== "" && l !== null && (e.value = l), R(e);
  }
  function ut(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var qr = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Co(e, t, n) {
    var l = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, n) : typeof n != "number" || n === 0 || qr.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function eh(e, t, n) {
    if (t != null && typeof t != "object")
      throw Error(o(62));
    if (e = e.style, n != null) {
      for (var l in n)
        !n.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "", Ce = !0);
      for (var a in t)
        l = t[a], t.hasOwnProperty(a) && n[a] !== l && (Co(e, a, l), Ce = !0);
    } else
      for (var i in t)
        t.hasOwnProperty(i) && Co(e, i, t[i]);
  }
  function wo(e) {
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
  var vb = /* @__PURE__ */ new Map([
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
  ]), yb = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Vr(e) {
    return yb.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function tl() {
  }
  var zo = null;
  function Do(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var gi = null, vi = null;
  function th(e) {
    var t = Wn(e);
    if (t && (e = t.stateNode)) {
      var n = e[Rt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (ce(
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
                if (!a) throw Error(o(90));
                ce(
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
          wt(e, n.value, n.defaultValue);
          break e;
        case "select":
          t = n.value, t != null && ft(e, !!n.multiple, t, !1);
      }
    }
  }
  var Mo = !1;
  function nh(e, t, n) {
    if (Mo) return e(t, n);
    Mo = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (Mo = !1, (gi !== null || vi !== null) && (Vc(), gi && (t = gi, e = vi, vi = gi = null, th(t), e)))
        for (t = 0; t < e.length; t++) th(e[t]);
    }
  }
  function Ou(e, t) {
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
        o(231, t, typeof n)
      );
    return n;
  }
  var yl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), jo = !1;
  if (yl)
    try {
      var Nu = {};
      Object.defineProperty(Nu, "passive", {
        get: function() {
          jo = !0;
        }
      }), window.addEventListener("test", Nu, Nu), window.removeEventListener("test", Nu, Nu);
    } catch {
      jo = !1;
    }
  var Xl = null, Uo = null, Xr = null;
  function lh() {
    if (Xr) return Xr;
    var e, t = Uo, n = t.length, l, a = "value" in Xl ? Xl.value : Xl.textContent, i = a.length;
    for (e = 0; e < n && t[e] === a[e]; e++) ;
    var s = n - e;
    for (l = 1; l <= s && t[n - l] === a[i - l]; l++) ;
    return Xr = a.slice(e, 1 < l ? 1 - l : void 0);
  }
  function Qr(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Zr() {
    return !0;
  }
  function ah() {
    return !1;
  }
  function qt(e) {
    function t(n, l, a, i, s) {
      this._reactName = n, this._targetInst = a, this.type = l, this.nativeEvent = i, this.target = s, this.currentTarget = null;
      for (var h in e)
        e.hasOwnProperty(h) && (n = e[h], this[h] = n ? n(i) : i[h]);
      return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? Zr : ah, this.isPropagationStopped = ah, this;
    }
    return ee(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Zr);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Zr);
      },
      persist: function() {
      },
      isPersistent: Zr
    }), t;
  }
  var Ql = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Kr = qt(Ql), Ru = ee({}, Ql, { view: 0, detail: 0 }), bb = qt(Ru), ko, Lo, Cu, Jr = ee({}, Ru, {
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
    getModifierState: Bo,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Cu && (Cu && e.type === "mousemove" ? (ko = e.screenX - Cu.screenX, Lo = e.screenY - Cu.screenY) : Lo = ko = 0, Cu = e), ko);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Lo;
    }
  }), ih = qt(Jr), Sb = ee({}, Jr, { dataTransfer: 0 }), xb = qt(Sb), Eb = ee({}, Ru, { relatedTarget: 0 }), Ho = qt(Eb), Tb = ee({}, Ql, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), _b = qt(Tb), Ab = ee({}, Ql, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Ob = qt(Ab), Nb = ee({}, Ql, { data: 0 }), uh = qt(Nb), Rb = {
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
  }, Cb = {
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
  }, wb = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function zb(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = wb[e]) ? !!t[e] : !1;
  }
  function Bo() {
    return zb;
  }
  var Db = ee({}, Ru, {
    key: function(e) {
      if (e.key) {
        var t = Rb[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Qr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Cb[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Bo,
    charCode: function(e) {
      return e.type === "keypress" ? Qr(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Qr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Mb = qt(Db), jb = ee({}, Jr, {
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
  }), rh = qt(jb), Ub = ee({}, Ql, { submitter: 0 }), kb = qt(Ub), Lb = ee({}, Ru, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Bo
  }), Hb = qt(Lb), Bb = ee({}, Ql, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Gb = qt(Bb), Yb = ee({}, Jr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), qb = qt(Yb), Vb = ee({}, Ql, {
    newState: 0,
    oldState: 0,
    source: 0
  }), Xb = qt(Vb), Qb = [9, 13, 27, 32], Go = yl && "CompositionEvent" in window, wu = null;
  yl && "documentMode" in document && (wu = document.documentMode);
  var Zb = yl && "TextEvent" in window && !wu, ch = yl && (!Go || wu && 8 < wu && 11 >= wu), oh = " ", sh = !1;
  function fh(e, t) {
    switch (e) {
      case "keyup":
        return Qb.indexOf(t.keyCode) !== -1;
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
  function dh(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var yi = !1;
  function Kb(e, t) {
    switch (e) {
      case "compositionend":
        return dh(t);
      case "keypress":
        return t.which !== 32 ? null : (sh = !0, oh);
      case "textInput":
        return e = t.data, e === oh && sh ? null : e;
      default:
        return null;
    }
  }
  function Jb(e, t) {
    if (yi)
      return e === "compositionend" || !Go && fh(e, t) ? (e = lh(), Xr = Uo = Xl = null, yi = !1, e) : null;
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
        return ch && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var $b = {
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
  function hh(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!$b[e.type] : t === "textarea";
  }
  function mh(e, t, n, l) {
    gi ? vi ? vi.push(l) : vi = [l] : gi = l, t = $c(t, "onChange"), 0 < t.length && (n = new Kr(
      "onChange",
      "change",
      null,
      n,
      l
    ), e.push({ event: n, listeners: t }));
  }
  var zu = null, Du = null;
  function Ib(e) {
    tg(e, 0);
  }
  function $r(e) {
    var t = el(e);
    if (G(t)) return e;
  }
  function ph(e, t) {
    if (e === "change") return t;
  }
  var gh = !1;
  if (yl) {
    var Yo;
    if (yl) {
      var qo = "oninput" in document;
      if (!qo) {
        var vh = document.createElement("div");
        vh.setAttribute("oninput", "return;"), qo = typeof vh.oninput == "function";
      }
      Yo = qo;
    } else Yo = !1;
    gh = Yo && (!document.documentMode || 9 < document.documentMode);
  }
  function yh() {
    zu && (zu.detachEvent("onpropertychange", bh), Du = zu = null);
  }
  function bh(e) {
    if (e.propertyName === "value" && $r(Du)) {
      var t = [];
      mh(
        t,
        Du,
        e,
        Do(e)
      ), nh(Ib, t);
    }
  }
  function Fb(e, t, n) {
    e === "focusin" ? (yh(), zu = t, Du = n, zu.attachEvent("onpropertychange", bh)) : e === "focusout" && yh();
  }
  function Pb(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return $r(Du);
  }
  function Wb(e, t) {
    if (e === "click") return $r(t);
  }
  function e0(e, t) {
    if (e === "input" || e === "change")
      return $r(t);
  }
  function t0(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var rn = typeof Object.is == "function" ? Object.is : t0;
  function Mu(e, t) {
    if (rn(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), l = Object.keys(t);
    if (n.length !== l.length) return !1;
    for (l = 0; l < n.length; l++) {
      var a = n[l];
      if (!In.call(t, a) || !rn(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  function Vo(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Sh(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function xh(e, t) {
    var n = Sh(e);
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
      n = Sh(n);
    }
  }
  function Eh(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Eh(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Th(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Vo(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Vo(e.document);
    }
    return t;
  }
  function Xo(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var n0 = yl && "documentMode" in document && 11 >= document.documentMode, bi = null, Qo = null, ju = null, Zo = !1;
  function _h(e, t, n) {
    var l = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Zo || bi == null || bi !== Vo(l) || (l = bi, "selectionStart" in l && Xo(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), ju && Mu(ju, l) || (ju = l, l = $c(Qo, "onSelect"), 0 < l.length && (t = new Kr(
      "onSelect",
      "select",
      null,
      t,
      n
    ), e.push({ event: t, listeners: l }), t.target = bi)));
  }
  function ja(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var Si = {
    animationend: ja("Animation", "AnimationEnd"),
    animationiteration: ja("Animation", "AnimationIteration"),
    animationstart: ja("Animation", "AnimationStart"),
    transitionrun: ja("Transition", "TransitionRun"),
    transitionstart: ja("Transition", "TransitionStart"),
    transitioncancel: ja("Transition", "TransitionCancel"),
    transitionend: ja("Transition", "TransitionEnd")
  }, Ko = {}, Ah = {};
  yl && (Ah = document.createElement("div").style, "AnimationEvent" in window || (delete Si.animationend.animation, delete Si.animationiteration.animation, delete Si.animationstart.animation), "TransitionEvent" in window || delete Si.transitionend.transition);
  function Ua(e) {
    if (Ko[e]) return Ko[e];
    if (!Si[e]) return e;
    var t = Si[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in Ah)
        return Ko[e] = t[n];
    return e;
  }
  var Oh = Ua("animationend"), Nh = Ua("animationiteration"), Rh = Ua("animationstart"), l0 = Ua("transitionrun"), a0 = Ua("transitionstart"), i0 = Ua("transitioncancel"), Ch = Ua("transitionend"), wh = /* @__PURE__ */ new Map(), Jo = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Jo.push("scrollEnd");
  function Hn(e, t) {
    wh.set(e, t), gl(t, [e]);
  }
  var u0 = 0;
  function bl(e, t) {
    if (e.name != null && e.name !== "auto") return e.name;
    if (t.autoName !== null) return t.autoName;
    e = qn.identifierPrefix;
    var n = u0++;
    return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
  }
  function zh(e) {
    if (e == null || typeof e == "string")
      return e;
    var t = null, n = Gi;
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
  function Sl(e, t) {
    return e = zh(e), t = zh(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
  }
  var Ir = typeof reportError == "function" ? reportError : function(e) {
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
  }, Sn = [], xi = 0, $o = 0;
  function Fr() {
    for (var e = xi, t = $o = xi = 0; t < e; ) {
      var n = Sn[t];
      Sn[t++] = null;
      var l = Sn[t];
      Sn[t++] = null;
      var a = Sn[t];
      Sn[t++] = null;
      var i = Sn[t];
      if (Sn[t++] = null, l !== null && a !== null) {
        var s = l.pending;
        s === null ? a.next = a : (a.next = s.next, s.next = a), l.pending = a;
      }
      i !== 0 && Dh(n, a, i);
    }
  }
  function Pr(e, t, n, l) {
    Sn[xi++] = e, Sn[xi++] = t, Sn[xi++] = n, Sn[xi++] = l, $o |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function Io(e, t, n, l) {
    return Pr(e, t, n, l), Wr(e);
  }
  function ka(e, t) {
    return Pr(e, null, null, t), Wr(e);
  }
  function Dh(e, t, n) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n);
    for (var a = !1, i = e.return; i !== null; )
      i.childLanes |= n, l = i.alternate, l !== null && (l.childLanes |= n), i.tag === 22 && (e = i.stateNode, e === null || e._visibility & 1 || (a = !0)), e = i, i = i.return;
    return e.tag === 3 ? (i = e.stateNode, a && t !== null && (a = 31 - nt(n), e = i.hiddenUpdates, l = e[a], l === null ? e[a] = [t] : l.push(t), t.lane = n | 536870912), i) : null;
  }
  function Wr(e) {
    if (50 < nr)
      throw nr = 0, qc = null, Error(o(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Ei = {};
  function r0(e, t, n, l) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function It(e, t, n, l) {
    return new r0(e, t, n, l);
  }
  function Fo(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function xl(e, t) {
    var n = e.alternate;
    return n === null ? (n = It(
      e.tag,
      t,
      e.key,
      e.mode
    ), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 1206910976, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
  }
  function Mh(e, t) {
    e.flags &= 1206910978;
    var n = e.alternate;
    return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function ec(e, t, n, l, a, i) {
    var s = 0;
    if (l = e, typeof l == "function") Fo(l) && (s = 1);
    else if (typeof l == "string")
      s = US(
        e,
        n,
        st.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (l) {
        case tt:
          return e = It(31, n, t, a), e.elementType = tt, e.lanes = i, e;
        case De:
          return La(n.children, a, i, t);
        case I:
          s = 8, a |= 24;
          break;
        case St:
          return e = It(12, n, t, a | 2), e.elementType = St, e.lanes = i, e;
        case ue:
          return e = It(13, n, t, a), e.elementType = ue, e.lanes = i, e;
        case re:
          return e = It(19, n, t, a), e.elementType = re, e.lanes = i, e;
        case zn:
        case E:
          return e = a | 32, e = It(30, n, t, e), e.elementType = E, e.lanes = i, e.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, e;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case Je:
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
              case xe:
                s = 16, l = null;
                break e;
            }
          s = 29, n = Error(
            o(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = It(s, n, t, a), t.elementType = e, t.type = l, t.lanes = i, t;
  }
  function La(e, t, n, l) {
    return e = It(7, e, l, t), e.lanes = n, e;
  }
  function Po(e, t, n) {
    return e = It(6, e, null, t), e.lanes = n, e;
  }
  function jh(e) {
    var t = It(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Wo(e, t, n) {
    return t = It(
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
  var Uh = /* @__PURE__ */ new WeakMap();
  function xn(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = Uh.get(e);
      return n !== void 0 ? n : (t = {
        value: e,
        source: t,
        stack: ci(t)
      }, Uh.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: ci(t)
    };
  }
  var Ti = [], _i = 0, tc = null, Uu = 0, En = [], Tn = 0, Zl = null, nl = 1, ll = "";
  function El(e, t) {
    Ti[_i++] = Uu, Ti[_i++] = tc, tc = e, Uu = t;
  }
  function kh(e, t, n) {
    En[Tn++] = nl, En[Tn++] = ll, En[Tn++] = Zl, Zl = e;
    var l = nl;
    e = ll;
    var a = 32 - nt(l) - 1;
    l &= ~(1 << a), n += 1;
    var i = 32 - nt(t) + a;
    if (30 < i) {
      var s = a - a % 5;
      i = (l & (1 << s) - 1).toString(32), l >>= s, a -= s, nl = 1 << 32 - nt(t) + a | n << a | l, ll = i + e;
    } else
      nl = 1 << i | n << a | l, ll = e;
  }
  function nc(e) {
    e.return !== null && (El(e, 1), kh(e, 1, 0));
  }
  function es(e) {
    for (; e === tc; )
      tc = Ti[--_i], Ti[_i] = null, Uu = Ti[--_i], Ti[_i] = null;
    for (; e === Zl; )
      Zl = En[--Tn], En[Tn] = null, ll = En[--Tn], En[Tn] = null, nl = En[--Tn], En[Tn] = null;
  }
  function Lh(e, t) {
    En[Tn++] = nl, En[Tn++] = ll, En[Tn++] = Zl, nl = t.id, ll = t.overflow, Zl = e;
  }
  var Et = null, Ie = null, be = !1, Kl = null, _n = !1, ts = Error(o(519));
  function Jl(e) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw ku(xn(t, e)), ts;
  }
  function Hh(e) {
    var t = e.stateNode, n = e.type, l = e.memoizedProps;
    switch (t[$e] = e, t[Rt] = l, n) {
      case "dialog":
        Te("cancel", t), Te("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Te("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < ar.length; n++)
          Te(ar[n], t);
        break;
      case "source":
        Te("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Te("error", t), Te("load", t);
        break;
      case "details":
        Te("toggle", t);
        break;
      case "input":
        Te("invalid", t), Be(
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
        Te("invalid", t);
        break;
      case "textarea":
        Te("invalid", t), pi(t, l.value, l.defaultValue, l.children);
    }
    n = l.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || l.suppressHydrationWarning === !0 || ig(t.textContent, n) ? (l.popover != null && (Te("beforetoggle", t), Te("toggle", t)), l.onScroll != null && Te("scroll", t), l.onScrollEnd != null && Te("scrollend", t), l.onClick != null && (t.onclick = tl), t = !0) : t = !1, t || Jl(e, !0);
  }
  function lc(e) {
    for (Et = e.return; Et; )
      switch (Et.tag) {
        case 5:
        case 31:
        case 13:
          _n = !1;
          return;
        case 27:
        case 3:
          _n = !0;
          return;
        default:
          Et = Et.return;
      }
  }
  function Ai(e) {
    if (e !== Et) return !1;
    if (!be) return lc(e), be = !0, !1;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Df(e.type, e.memoizedProps)), n = !n), n && Ie && Jl(e), lc(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      Ie = _g(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      Ie = _g(e);
    } else
      t === 27 ? (t = Ie, sa(e.type) ? (e = Yf, Yf = null, Ie = e) : Ie = t) : Ie = Et ? On(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ha() {
    Ie = Et = null, be = !1;
  }
  function ns() {
    var e = Kl;
    return e !== null && (Wt === null ? Wt = e : Wt.push.apply(
      Wt,
      e
    ), Kl = null), e;
  }
  function ku(e) {
    Kl === null ? Kl = [e] : Kl.push(e);
  }
  var ls = Jt(null), Ba = null, Tl = null;
  function $l(e, t, n) {
    Le(ls, t._currentValue), t._currentValue = n;
  }
  function _l(e) {
    e._currentValue = ls.current, me(ls);
  }
  function ac(e, t, n) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function as(e, t, n, l) {
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
              i.lanes |= n, h = i.alternate, h !== null && (h.lanes |= n), ac(
                i.return,
                n,
                e
              ), l || (s = null);
              break e;
            }
          i = h.next;
        }
      } else if (a.tag === 18) {
        if (s = a.return, s === null) throw Error(o(341));
        s.lanes |= n, i = s.alternate, i !== null && (i.lanes |= n), ac(s, n, e), s = null;
      } else
        a.tag === 13 && a.memoizedState !== null && a.memoizedState.dehydrated === null ? (a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), ac(
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
  function Ga(e, t, n, l) {
    e = null;
    for (var a = t, i = !1; a !== null; ) {
      if (!i) {
        if ((a.flags & 524288) !== 0) i = !0;
        else if ((a.flags & 262144) !== 0) break;
      }
      if (a.tag === 10) {
        var s = a.alternate;
        if (s === null) throw Error(o(387));
        if (s = s.memoizedProps, s !== null) {
          var h = a.type;
          rn(a.pendingProps.value, s.value) || (e !== null ? e.push(h) : e = [h]);
        }
      } else if (a === nn.current) {
        if (s = a.alternate, s === null) throw Error(o(387));
        s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e !== null ? e.push(Ii) : e = [Ii]);
      }
      a = a.return;
    }
    return e !== null && as(
      t,
      e,
      n,
      l
    ), t.flags |= 262144, e !== null;
  }
  function ic(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!rn(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Ya(e) {
    Ba = e, Tl = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function zt(e) {
    return Bh(Ba, e);
  }
  function uc(e, t) {
    return Ba === null && Ya(e), Bh(e, t);
  }
  function Bh(e, t) {
    var n = t._currentValue;
    if (t = { context: t, memoizedValue: n, next: null }, Tl === null) {
      if (e === null) throw Error(o(308));
      Tl = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Tl = Tl.next = t;
    return n;
  }
  var c0 = typeof AbortController < "u" ? AbortController : function() {
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
  }, o0 = u.unstable_scheduleCallback, s0 = u.unstable_NormalPriority, ht = {
    $$typeof: Je,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function is() {
    return {
      controller: new c0(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Lu(e) {
    e.refCount--, e.refCount === 0 && o0(s0, function() {
      e.controller.abort();
    });
  }
  function Gh(e, t) {
    if ((e.pendingLanes & 4194048) !== 0) {
      var n = e.transitionTypes;
      for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
        var l = t[e];
        n.indexOf(l) === -1 && n.push(l);
      }
    }
  }
  var Hu = null;
  function f0(e) {
    var t = e.transitionTypes;
    return e.transitionTypes = null, t;
  }
  var Bu = null, us = 0, qa = 0, Oi = null;
  function d0(e, t) {
    if (Bu === null) {
      var n = Bu = [];
      us = 0, qa = Tf(), Oi = {
        status: "pending",
        value: void 0,
        then: function(l) {
          n.push(l);
        }
      };
    }
    return us++, t.then(Yh, Yh), t;
  }
  function Yh() {
    if (--us === 0 && (Hu = null, Bu !== null)) {
      Oi !== null && (Oi.status = "fulfilled");
      var e = Bu;
      Bu = null, qa = 0, Oi = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function h0(e, t) {
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
  var qh = P.S;
  P.S = function(e, t) {
    if (jp = Ht(), typeof t == "object" && t !== null && typeof t.then == "function" && d0(e, t), Hu !== null)
      for (var n = Xi; n !== null; )
        Gh(n, Hu), n = n.next;
    if (n = e.types, n !== null) {
      for (var l = Xi; l !== null; )
        Gh(l, n), l = l.next;
      if (qa !== 0) {
        l = Hu, l === null && (l = Hu = []);
        for (var a = 0; a < n.length; a++) {
          var i = n[a];
          l.indexOf(i) === -1 && l.push(i);
        }
      }
    }
    qh !== null && qh(e, t);
  };
  var Va = Jt(null);
  function rs() {
    var e = Va.current;
    return e !== null ? e : Ke.pooledCache;
  }
  function rc(e, t) {
    t === null ? Le(Va, Va.current) : Le(Va, t.pool);
  }
  function Vh() {
    var e = rs();
    return e === null ? null : { parent: ht._currentValue, pool: e };
  }
  var Ni = Error(o(460)), cs = Error(o(474)), cc = Error(o(542)), oc = { then: function() {
  } };
  function Xh(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Qh(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(tl, tl), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Kh(e), e === void 0 && !("reason" in t) ? Error(o(600)) : e;
      default:
        if (typeof t.status == "string") t.then(tl, tl);
        else {
          if (e = Ke, e !== null && 100 < e.shellSuspendCounter)
            throw Error(o(482));
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
            throw e = t.reason, Kh(e), e;
        }
        throw Qa = t, Ni;
    }
  }
  function Xa(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (Qa = n, Ni) : n;
    }
  }
  var Qa = null;
  function Zh() {
    if (Qa === null) throw Error(o(459));
    var e = Qa;
    return Qa = null, e;
  }
  function Kh(e) {
    if (e === Ni || e === cc)
      throw Error(o(483));
  }
  var Ri = null, Gu = 0;
  function sc(e) {
    var t = Gu;
    return Gu += 1, Ri === null && (Ri = []), Qh(Ri, e, t);
  }
  function Il(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function fc(e, t) {
    throw t.$$typeof === he ? Error(o(525)) : (e = Object.prototype.toString.call(t), Error(
      o(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Jh(e) {
    function t(O, x) {
      if (e) {
        var w = O.deletions;
        w === null ? (O.deletions = [x], O.flags |= 16) : w.push(x);
      }
    }
    function n(O, x) {
      if (!e) return null;
      for (; x !== null; )
        t(O, x), x = x.sibling;
      return null;
    }
    function l(O) {
      for (var x = /* @__PURE__ */ new Map(); O !== null; )
        O.key === null ? x.set(O.index, O) : x.set(O.key, O), O = O.sibling;
      return x;
    }
    function a(O, x) {
      return O = xl(O, x), O.index = 0, O.sibling = null, O;
    }
    function i(O, x, w) {
      return O.index = w, e ? (w = O.alternate, w !== null ? (w = w.index, w < x ? (O.flags |= 2, x) : w) : (O.flags |= 134217730, x)) : (O.flags |= 1048576, x);
    }
    function s(O) {
      return e && O.alternate === null && (O.flags |= 134217730), O;
    }
    function h(O, x, w, U) {
      return x === null || x.tag !== 6 ? (x = Po(w, O.mode, U), x.return = O, x) : (x = a(x, w), x.return = O, x);
    }
    function b(O, x, w, U) {
      var $ = w.type;
      return $ === De ? (O = M(
        O,
        x,
        w.props.children,
        U,
        w.key
      ), Il(O, w), O) : x !== null && (x.elementType === $ || typeof $ == "object" && $ !== null && $.$$typeof === xe && Xa($) === x.type) ? (x = a(x, w.props), Il(x, w), x.return = O, x) : (x = ec(
        w.type,
        w.key,
        w.props,
        null,
        O.mode,
        U
      ), Il(x, w), x.return = O, x);
    }
    function N(O, x, w, U) {
      return x === null || x.tag !== 4 || x.stateNode.containerInfo !== w.containerInfo || x.stateNode.implementation !== w.implementation ? (x = Wo(w, O.mode, U), x.return = O, x) : (x = a(x, w.children || []), x.return = O, x);
    }
    function M(O, x, w, U, $) {
      return x === null || x.tag !== 7 ? (x = La(
        w,
        O.mode,
        U,
        $
      ), x.return = O, x) : (x = a(x, w), x.return = O, x);
    }
    function k(O, x, w) {
      if (typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint")
        return x = Po(
          "" + x,
          O.mode,
          w
        ), x.return = O, x;
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case Pe:
            return w = ec(
              x.type,
              x.key,
              x.props,
              null,
              O.mode,
              w
            ), Il(w, x), w.return = O, w;
          case Ae:
            return x = Wo(
              x,
              O.mode,
              w
            ), x.return = O, x;
          case xe:
            return x = Xa(x), k(O, x, w);
        }
        if (Me(x) || ne(x))
          return x = La(
            x,
            O.mode,
            w,
            null
          ), x.return = O, x;
        if (typeof x.then == "function")
          return k(O, sc(x), w);
        if (x.$$typeof === Je)
          return k(
            O,
            uc(O, x),
            w
          );
        fc(O, x);
      }
      return null;
    }
    function _(O, x, w, U) {
      var $ = x !== null ? x.key : null;
      if (typeof w == "string" && w !== "" || typeof w == "number" || typeof w == "bigint")
        return $ !== null ? null : h(O, x, "" + w, U);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case Pe:
            return w.key === $ ? b(O, x, w, U) : null;
          case Ae:
            return w.key === $ ? N(O, x, w, U) : null;
          case xe:
            return w = Xa(w), _(O, x, w, U);
        }
        if (Me(w) || ne(w))
          return $ !== null ? null : M(O, x, w, U, null);
        if (typeof w.then == "function")
          return _(
            O,
            x,
            sc(w),
            U
          );
        if (w.$$typeof === Je)
          return _(
            O,
            x,
            uc(O, w),
            U
          );
        fc(O, w);
      }
      return null;
    }
    function D(O, x, w, U, $) {
      if (typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint")
        return O = O.get(w) || null, h(x, O, "" + U, $);
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case Pe:
            return O = O.get(
              U.key === null ? w : U.key
            ) || null, b(x, O, U, $);
          case Ae:
            return O = O.get(
              U.key === null ? w : U.key
            ) || null, N(x, O, U, $);
          case xe:
            return U = Xa(U), D(
              O,
              x,
              w,
              U,
              $
            );
        }
        if (Me(U) || ne(U))
          return O = O.get(w) || null, M(x, O, U, $, null);
        if (typeof U.then == "function")
          return D(
            O,
            x,
            w,
            sc(U),
            $
          );
        if (U.$$typeof === Je)
          return D(
            O,
            x,
            w,
            uc(x, U),
            $
          );
        fc(x, U);
      }
      return null;
    }
    function X(O, x, w, U) {
      for (var $ = null, Ne = null, le = x, oe = x = 0, gt = null; le !== null && oe < w.length; oe++) {
        le.index > oe ? (gt = le, le = null) : gt = le.sibling;
        var ze = _(
          O,
          le,
          w[oe],
          U
        );
        if (ze === null) {
          le === null && (le = gt);
          break;
        }
        e && le && ze.alternate === null && t(O, le), x = i(ze, x, oe), Ne === null ? $ = ze : Ne.sibling = ze, Ne = ze, le = gt;
      }
      if (oe === w.length)
        return n(O, le), be && El(O, oe), $;
      if (le === null) {
        for (; oe < w.length; oe++)
          le = k(O, w[oe], U), le !== null && (x = i(
            le,
            x,
            oe
          ), Ne === null ? $ = le : Ne.sibling = le, Ne = le);
        return be && El(O, oe), $;
      }
      for (le = l(le); oe < w.length; oe++)
        gt = D(
          le,
          O,
          oe,
          w[oe],
          U
        ), gt !== null && (e && (ze = gt.alternate, ze !== null && le.delete(ze.key === null ? oe : ze.key)), x = i(
          gt,
          x,
          oe
        ), Ne === null ? $ = gt : Ne.sibling = gt, Ne = gt);
      return e && le.forEach(function(pa) {
        return t(O, pa);
      }), be && El(O, oe), $;
    }
    function F(O, x, w, U) {
      if (w == null) throw Error(o(151));
      for (var $ = null, Ne = null, le = x, oe = x = 0, gt = null, ze = w.next(); le !== null && !ze.done; oe++, ze = w.next()) {
        le.index > oe ? (gt = le, le = null) : gt = le.sibling;
        var pa = _(O, le, ze.value, U);
        if (pa === null) {
          le === null && (le = gt);
          break;
        }
        e && le && pa.alternate === null && t(O, le), x = i(pa, x, oe), Ne === null ? $ = pa : Ne.sibling = pa, Ne = pa, le = gt;
      }
      if (ze.done)
        return n(O, le), be && El(O, oe), $;
      if (le === null) {
        for (; !ze.done; oe++, ze = w.next())
          ze = k(O, ze.value, U), ze !== null && (x = i(ze, x, oe), Ne === null ? $ = ze : Ne.sibling = ze, Ne = ze);
        return be && El(O, oe), $;
      }
      for (le = l(le); !ze.done; oe++, ze = w.next())
        ze = D(le, O, oe, ze.value, U), ze !== null && (e && (gt = ze.alternate, gt !== null && le.delete(
          gt.key === null ? oe : gt.key
        )), x = i(ze, x, oe), Ne === null ? $ = ze : Ne.sibling = ze, Ne = ze);
      return e && le.forEach(function(KS) {
        return t(O, KS);
      }), be && El(O, oe), $;
    }
    function ge(O, x, w, U) {
      if (typeof w == "object" && w !== null && w.type === De && w.key === null && w.props.ref === void 0 && (w = w.props.children), typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case Pe:
            e: {
              for (var $ = w.key; x !== null; ) {
                if (x.key === $) {
                  if ($ = w.type, $ === De) {
                    if (x.tag === 7) {
                      n(
                        O,
                        x.sibling
                      ), U = a(
                        x,
                        w.props.children
                      ), Il(U, w), U.return = O, O = U;
                      break e;
                    }
                  } else if (x.elementType === $ || typeof $ == "object" && $ !== null && $.$$typeof === xe && Xa($) === x.type) {
                    n(
                      O,
                      x.sibling
                    ), U = a(x, w.props), Il(U, w), U.return = O, O = U;
                    break e;
                  }
                  n(O, x);
                  break;
                } else t(O, x);
                x = x.sibling;
              }
              w.type === De ? (U = La(
                w.props.children,
                O.mode,
                U,
                w.key
              ), Il(U, w), U.return = O, O = U) : (U = ec(
                w.type,
                w.key,
                w.props,
                null,
                O.mode,
                U
              ), Il(U, w), U.return = O, O = U);
            }
            return s(O);
          case Ae:
            e: {
              for ($ = w.key; x !== null; ) {
                if (x.key === $)
                  if (x.tag === 4 && x.stateNode.containerInfo === w.containerInfo && x.stateNode.implementation === w.implementation) {
                    n(
                      O,
                      x.sibling
                    ), U = a(x, w.children || []), U.return = O, O = U;
                    break e;
                  } else {
                    n(O, x);
                    break;
                  }
                else t(O, x);
                x = x.sibling;
              }
              U = Wo(w, O.mode, U), U.return = O, O = U;
            }
            return s(O);
          case xe:
            return w = Xa(w), ge(
              O,
              x,
              w,
              U
            );
        }
        if (Me(w))
          return X(
            O,
            x,
            w,
            U
          );
        if (ne(w)) {
          if ($ = ne(w), typeof $ != "function") throw Error(o(150));
          return w = $.call(w), F(
            O,
            x,
            w,
            U
          );
        }
        if (typeof w.then == "function")
          return ge(
            O,
            x,
            sc(w),
            U
          );
        if (w.$$typeof === Je)
          return ge(
            O,
            x,
            uc(O, w),
            U
          );
        fc(O, w);
      }
      return typeof w == "string" && w !== "" || typeof w == "number" || typeof w == "bigint" ? (w = "" + w, x !== null && x.tag === 6 ? (n(O, x.sibling), U = a(x, w), U.return = O, O = U) : (n(O, x), U = Po(w, O.mode, U), U.return = O, O = U), s(O)) : n(O, x);
    }
    return function(O, x, w, U) {
      try {
        Gu = 0;
        var $ = ge(
          O,
          x,
          w,
          U
        );
        return Ri = null, $;
      } catch (le) {
        if (le === Ni || le === cc) throw le;
        var Ne = It(29, le, null, O.mode);
        return Ne.lanes = U, Ne.return = O, Ne;
      } finally {
      }
    };
  }
  var Za = Jh(!0), $h = Jh(!1), Fl = !1;
  function os(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function ss(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Pl(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Wl(e, t, n) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (ke & 2) !== 0) {
      var a = l.pending;
      return a === null ? t.next = t : (t.next = a.next, a.next = t), l.pending = t, t = Wr(e), Dh(e, null, n), t;
    }
    return Pr(e, l, t, n), Wr(e);
  }
  function Yu(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, n |= l, t.lanes = n, fi(e, n);
    }
  }
  function fs(e, t) {
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
  var ds = !1;
  function qu() {
    if (ds) {
      var e = Oi;
      if (e !== null) throw e;
    }
  }
  function Vu(e, t, n, l) {
    ds = !1;
    var a = e.updateQueue;
    Fl = !1;
    var i = a.firstBaseUpdate, s = a.lastBaseUpdate, h = a.shared.pending;
    if (h !== null) {
      a.shared.pending = null;
      var b = h, N = b.next;
      b.next = null, s === null ? i = N : s.next = N, s = b;
      var M = e.alternate;
      M !== null && (M = M.updateQueue, h = M.lastBaseUpdate, h !== s && (h === null ? M.firstBaseUpdate = N : h.next = N, M.lastBaseUpdate = b));
    }
    if (i !== null) {
      var k = a.baseState;
      s = 0, M = N = b = null, h = i;
      do {
        var _ = h.lane & -536870913, D = _ !== h.lane;
        if (D ? (Oe & _) === _ : (l & _) === _) {
          _ !== 0 && _ === qa && (ds = !0), M !== null && (M = M.next = {
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
                Fl = !0;
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
          }, M === null ? (N = M = D, b = k) : M = M.next = D, s |= _;
        if (h = h.next, h === null) {
          if (h = a.shared.pending, h === null)
            break;
          D = h, h = D.next, D.next = null, a.lastBaseUpdate = D, a.shared.pending = null;
        }
      } while (!0);
      M === null && (b = k), a.baseState = b, a.firstBaseUpdate = N, a.lastBaseUpdate = M, i === null && (a.shared.lanes = 0), ua |= s, e.lanes = s, e.memoizedState = k;
    }
  }
  function Ih(e, t) {
    if (typeof e != "function")
      throw Error(o(191, e));
    e.call(t);
  }
  function Fh(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++)
        Ih(n[e], t);
  }
  var ea = Jt(null), dc = Jt(0);
  function Ph(e, t) {
    e = Cl, Le(dc, e), Le(ea, t), Cl = e | t.baseLanes;
  }
  function hs() {
    Le(dc, Cl), Le(ea, ea.current);
  }
  function ms() {
    Cl = dc.current, me(ea), me(dc);
  }
  var Dt = Jt(null), Bt = null;
  function ta(e) {
    var t = e.alternate;
    Le(Mt, Mt.current & 1), Le(Dt, e), Bt === null && (t === null || ea.current !== null || t.memoizedState !== null) && (Bt = e);
  }
  function ps(e) {
    Le(Mt, Mt.current), Le(Dt, e), Bt === null && (Bt = e);
  }
  function Wh(e) {
    e.tag === 22 ? (Le(Mt, Mt.current), Le(Dt, e), Bt === null && (Bt = e)) : na();
  }
  function na() {
    Le(Mt, Mt.current), Le(Dt, Dt.current);
  }
  function cn(e) {
    me(Dt), Bt === e && (Bt = null), me(Mt);
  }
  var Mt = Jt(0);
  function Xu(e, t) {
    Le(Dt, Dt.current), Le(Mt, t);
  }
  function gs(e) {
    me(Mt), me(Dt), Bt === e && (Bt = null);
  }
  function hc(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || Bf(n) || Gf(n)))
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
  var Al = 0, pe = null, Qe = null, mt = null, mc = !1, Ci = !1, Ka = !1, pc = 0, Qu = 0, wi = null, m0 = 0;
  function rt() {
    throw Error(o(321));
  }
  function vs(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!rn(e[n], t[n])) return !1;
    return !0;
  }
  function ys(e, t, n, l, a, i) {
    return Al = i, pe = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, P.H = e === null || e.memoizedState === null ? km : Lm, Ka = !1, i = n(l, a), Ka = !1, Ci && (i = tm(
      t,
      n,
      l,
      a
    )), em(e), i;
  }
  function em(e) {
    P.H = Ec;
    var t = Qe !== null && Qe.next !== null;
    if (Al = 0, mt = Qe = pe = null, mc = !1, Qu = 0, wi = null, t) throw Error(o(300));
    e === null || pt || (e = e.dependencies, e !== null && ic(e) && (pt = !0));
  }
  function tm(e, t, n, l) {
    pe = e;
    var a = 0;
    do {
      if (Ci && (wi = null), Qu = 0, Ci = !1, 25 <= a) throw Error(o(301));
      if (a += 1, mt = Qe = null, e.updateQueue != null) {
        var i = e.updateQueue;
        i.lastEffect = null, i.events = null, i.stores = null, i.memoCache != null && (i.memoCache.index = 0);
      }
      P.H = E0, i = t(n, l);
    } while (Ci);
    return i;
  }
  function p0() {
    var e = P.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Zu(t) : t, e = e.useState()[0], (Qe !== null ? Qe.memoizedState : null) !== e && (pe.flags |= 1024), t;
  }
  function bs() {
    var e = pc !== 0;
    return pc = 0, e;
  }
  function Ss(e, t, n) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
  }
  function xs(e) {
    if (mc) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      mc = !1;
    }
    Al = 0, mt = Qe = pe = null, Ci = !1, Qu = pc = 0, wi = null;
  }
  function Vt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return mt === null ? pe.memoizedState = mt = e : mt = mt.next = e, mt;
  }
  function dt() {
    if (Qe === null) {
      var e = pe.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Qe.next;
    var t = mt === null ? pe.memoizedState : mt.next;
    if (t !== null)
      mt = t, Qe = e;
    else {
      if (e === null)
        throw pe.alternate === null ? Error(o(467)) : Error(o(310));
      Qe = e, e = {
        memoizedState: Qe.memoizedState,
        baseState: Qe.baseState,
        baseQueue: Qe.baseQueue,
        queue: Qe.queue,
        next: null
      }, mt === null ? pe.memoizedState = mt = e : mt = mt.next = e;
    }
    return mt;
  }
  function gc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Zu(e) {
    var t = Qu;
    return Qu += 1, wi === null && (wi = []), e = Qh(wi, e, t), t = pe, (mt === null ? t.memoizedState : mt.next) === null && (t = t.alternate, P.H = t === null || t.memoizedState === null ? km : Lm), e;
  }
  function vc(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Zu(e);
      if (e.$$typeof === L) return;
      if (e.$$typeof === Je) return zt(e);
    }
    throw Error(o(438, String(e)));
  }
  function Es(e) {
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
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = gc(), pe.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
      for (n = t.data[t.index] = Array(e), l = 0; l < e; l++)
        n[l] = ml;
    return t.index++, n;
  }
  function Ol(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function yc(e) {
    var t = dt();
    return Ts(t, Qe, e);
  }
  function Ts(e, t, n) {
    var l = e.queue;
    if (l === null) throw Error(o(311));
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
      var h = s = null, b = null, N = t, M = !1;
      do {
        var k = N.lane & -536870913;
        if (k !== N.lane ? (Oe & k) === k : (Al & k) === k) {
          var _ = N.revertLane;
          if (_ === 0)
            b !== null && (b = b.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null
            }), k === qa && (M = !0);
          else if ((Al & _) === _) {
            N = N.next, _ === qa && (M = !0);
            continue;
          } else
            k = {
              lane: 0,
              revertLane: N.revertLane,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null
            }, b === null ? (h = b = k, s = i) : b = b.next = k, pe.lanes |= _, ua |= _;
          k = N.action, Ka && n(i, k), i = N.hasEagerState ? N.eagerState : n(i, k);
        } else
          _ = {
            lane: k,
            revertLane: N.revertLane,
            gesture: N.gesture,
            action: N.action,
            hasEagerState: N.hasEagerState,
            eagerState: N.eagerState,
            next: null
          }, b === null ? (h = b = _, s = i) : b = b.next = _, pe.lanes |= k, ua |= k;
        N = N.next;
      } while (N !== null && N !== t);
      if (b === null ? s = i : b.next = h, !rn(i, e.memoizedState) && (pt = !0, M && (n = Oi, n !== null)))
        throw n;
      e.memoizedState = i, e.baseState = s, e.baseQueue = b, l.lastRenderedState = i;
    }
    return a === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function _s(e) {
    var t = dt(), n = t.queue;
    if (n === null) throw Error(o(311));
    n.lastRenderedReducer = e;
    var l = n.dispatch, a = n.pending, i = t.memoizedState;
    if (a !== null) {
      n.pending = null;
      var s = a = a.next;
      do
        i = e(i, s.action), s = s.next;
      while (s !== a);
      rn(i, t.memoizedState) || (pt = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
    }
    return [i, l];
  }
  function nm(e, t, n) {
    var l = pe, a = dt(), i = be;
    if (i) {
      if (n === void 0) throw Error(o(407));
      n = n();
    } else n = t();
    var s = !rn(
      (Qe || a).memoizedState,
      n
    );
    if (s && (a.memoizedState = n, pt = !0), a = a.queue, Ns(im.bind(null, l, a, e), [
      e
    ]), e = a.getSnapshot !== t || s || mt !== null && (mt.memoizedState.tag & 1) !== 0, zi(
      e ? 9 : 8,
      { destroy: void 0 },
      am.bind(null, l, a, n, t),
      null
    ), e) {
      if (l.flags |= 2048, Ke === null) throw Error(o(349));
      i || (Al & 127) !== 0 || lm(l, t, n);
    }
    return n;
  }
  function lm(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = pe.updateQueue, t === null ? (t = gc(), pe.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function am(e, t, n, l) {
    t.value = n, t.getSnapshot = l, um(t) && rm(e);
  }
  function im(e, t, n) {
    return n(function() {
      um(t) && rm(e);
    });
  }
  function um(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !rn(e, n);
    } catch {
      return !0;
    }
  }
  function rm(e) {
    var t = ka(e, 2);
    t !== null && en(t, e, 2);
  }
  function As(e) {
    var t = Vt();
    if (typeof e == "function") {
      var n = e;
      if (e = n(), Ka) {
        ln(!0);
        try {
          n();
        } finally {
          ln(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ol,
      lastRenderedState: e
    }, t;
  }
  function cm(e, t, n, l) {
    return e.baseState = n, Ts(
      e,
      Qe,
      typeof l == "function" ? l : Ol
    );
  }
  function g0(e, t, n, l, a) {
    if (xc(e)) throw Error(o(485));
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
      P.T !== null ? n(!0) : i.isTransition = !1, l(i), n = t.pending, n === null ? (i.next = t.pending = i, om(t, i)) : (i.next = n.next, t.pending = n.next = i);
    }
  }
  function om(e, t) {
    var n = t.action, l = t.payload, a = e.state;
    if (t.isTransition) {
      var i = P.T, s = {};
      s.types = i !== null ? i.types : null, P.T = s;
      try {
        var h = n(a, l), b = P.S;
        b !== null && b(s, h), sm(e, t, h);
      } catch (N) {
        Os(e, t, N);
      } finally {
        i !== null && s.types !== null && (i.types = s.types), P.T = i;
      }
    } else
      try {
        i = n(a, l), sm(e, t, i);
      } catch (N) {
        Os(e, t, N);
      }
  }
  function sm(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(l) {
        fm(e, t, l);
      },
      function(l) {
        return Os(e, t, l);
      }
    ) : fm(e, t, n);
  }
  function fm(e, t, n) {
    t.status = "fulfilled", t.value = n, dm(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, om(e, n)));
  }
  function Os(e, t, n) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = n, dm(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function dm(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function hm(e, t) {
    return t;
  }
  function mm(e, t) {
    if (be) {
      var n = Ke.formState;
      if (n !== null) {
        e: {
          var l = pe;
          if (be) {
            if (Ie) {
              t: {
                for (var a = Ie, i = _n; a.nodeType !== 8; ) {
                  if (!i) {
                    a = null;
                    break t;
                  }
                  if (a = On(
                    a.nextSibling
                  ), a === null) {
                    a = null;
                    break t;
                  }
                }
                i = a.data, a = i === "F!" || i === "F" ? a : null;
              }
              if (a) {
                Ie = On(
                  a.nextSibling
                ), l = a.data === "F!";
                break e;
              }
            }
            Jl(l);
          }
          l = !1;
        }
        l && (t = n[0]);
      }
    }
    return n = Vt(), n.memoizedState = n.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: hm,
      lastRenderedState: t
    }, n.queue = l, n = Mm.bind(
      null,
      pe,
      l
    ), l.dispatch = n, l = As(!1), i = Ds.bind(
      null,
      pe,
      !1,
      l.queue
    ), l = Vt(), a = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = a, n = g0.bind(
      null,
      pe,
      a,
      i,
      n
    ), a.dispatch = n, l.memoizedState = e, [t, n, !1];
  }
  function pm(e) {
    var t = dt();
    return gm(t, Qe, e);
  }
  function gm(e, t, n) {
    if (t = Ts(
      e,
      t,
      hm
    )[0], e = yc(Ol)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = Zu(t);
      } catch (s) {
        throw s === Ni ? cc : s;
      }
    else l = t;
    t = dt();
    var a = t.queue, i = a.dispatch;
    return n !== t.memoizedState && (pe.flags |= 2048, zi(
      9,
      { destroy: void 0 },
      v0.bind(null, a, n),
      null
    )), [l, i, e];
  }
  function v0(e, t) {
    e.action = t;
  }
  function vm(e) {
    var t = dt(), n = Qe;
    if (n !== null)
      return gm(t, n, e);
    dt(), t = t.memoizedState, n = dt();
    var l = n.queue.dispatch;
    return n.memoizedState = e, [t, l, !1];
  }
  function zi(e, t, n, l) {
    return e = { tag: e, create: n, deps: l, inst: t, next: null }, t = pe.updateQueue, t === null && (t = gc(), pe.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (l = n.next, n.next = e, e.next = l, t.lastEffect = e), e;
  }
  function ym() {
    return dt().memoizedState;
  }
  function bc(e, t, n, l) {
    var a = Vt();
    pe.flags |= e, a.memoizedState = zi(
      1 | t,
      { destroy: void 0 },
      n,
      l === void 0 ? null : l
    );
  }
  function Sc(e, t, n, l) {
    var a = dt();
    l = l === void 0 ? null : l;
    var i = a.memoizedState.inst;
    Qe !== null && l !== null && vs(l, Qe.memoizedState.deps) ? a.memoizedState = zi(t, i, n, l) : (pe.flags |= e, a.memoizedState = zi(
      1 | t,
      i,
      n,
      l
    ));
  }
  function bm(e, t) {
    bc(8390656, 8, e, t);
  }
  function Ns(e, t) {
    Sc(2048, 8, e, t);
  }
  function y0(e) {
    pe.flags |= 4;
    var t = pe.updateQueue;
    if (t === null)
      t = gc(), pe.updateQueue = t, t.events = [e];
    else {
      var n = t.events;
      n === null ? t.events = [e] : n.push(e);
    }
  }
  function Sm(e) {
    var t = dt().memoizedState;
    return y0({ ref: t, nextImpl: e }), function() {
      if ((ke & 2) !== 0) throw Error(o(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function xm(e, t) {
    return Sc(4, 2, e, t);
  }
  function Em(e, t) {
    return Sc(4, 4, e, t);
  }
  function Tm(e, t) {
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
  function _m(e, t, n) {
    n = n != null ? n.concat([e]) : null, Sc(4, 4, Tm.bind(null, t, e), n);
  }
  function Rs() {
  }
  function Am(e, t) {
    var n = dt();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    return t !== null && vs(t, l[1]) ? l[0] : (n.memoizedState = [e, t], e);
  }
  function Om(e, t) {
    var n = dt();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    if (t !== null && vs(t, l[1]))
      return l[0];
    if (l = e(), Ka) {
      ln(!0);
      try {
        e();
      } finally {
        ln(!1);
      }
    }
    return n.memoizedState = [l, t], l;
  }
  function Cs(e, t, n) {
    return n === void 0 || (Al & 1073741824) !== 0 && (Oe & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = kp(), pe.lanes |= e, ua |= e, n);
  }
  function Nm(e, t, n, l) {
    return rn(n, t) ? n : ea.current !== null ? (e = Cs(e, n, l), rn(e, t) || (pt = !0), e) : (Al & 106) === 0 || (Al & 1073741824) !== 0 && (Oe & 261930) === 0 ? (pt = !0, e.memoizedState = n) : (e = kp(), pe.lanes |= e, ua |= e, t);
  }
  function Rm(e, t, n, l, a) {
    var i = fe.p;
    fe.p = i !== 0 && 8 > i ? i : 8;
    var s = P.T, h = {};
    h.types = s !== null ? s.types : null, P.T = h, Ds(e, !1, t, n);
    try {
      var b = a(), N = P.S;
      if (N !== null && N(h, b), b !== null && typeof b == "object" && typeof b.then == "function") {
        var M = h0(
          b,
          l
        );
        Ku(
          e,
          t,
          M,
          dn(e)
        );
      } else
        Ku(
          e,
          t,
          l,
          dn(e)
        );
    } catch (k) {
      Ku(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: k },
        dn()
      );
    } finally {
      fe.p = i, s !== null && h.types !== null && (s.types = h.types), P.T = s;
    }
  }
  function b0() {
  }
  function ws(e, t, n, l) {
    if (e.tag !== 5) throw Error(o(476));
    var a = Cm(e).queue;
    Rm(
      e,
      a,
      t,
      Dn,
      n === null ? b0 : function() {
        return wm(e), n(l);
      }
    );
  }
  function Cm(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: Dn,
      baseState: Dn,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ol,
        lastRenderedState: Dn
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
        lastRenderedReducer: Ol,
        lastRenderedState: n
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function wm(e) {
    var t = Cm(e);
    t.next === null && (t = e.alternate.memoizedState), Ku(
      e,
      t.next.queue,
      {},
      dn()
    );
  }
  function zs() {
    return zt(Ii);
  }
  function zm() {
    return dt().memoizedState;
  }
  function Dm() {
    return dt().memoizedState;
  }
  function S0(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = dn();
          e = Pl(n);
          var l = Wl(t, e, n);
          l !== null && (en(l, t, n), Yu(l, t, n)), t = { cache: is() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function x0(e, t, n) {
    var l = dn();
    n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, xc(e) ? jm(t, n) : (n = Io(e, t, n, l), n !== null && (en(n, e, l), Um(n, t, l)));
  }
  function Mm(e, t, n) {
    var l = dn();
    Ku(e, t, n, l);
  }
  function Ku(e, t, n, l) {
    var a = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (xc(e)) jm(t, a);
    else {
      var i = e.alternate;
      if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null))
        try {
          var s = t.lastRenderedState, h = i(s, n);
          if (a.hasEagerState = !0, a.eagerState = h, rn(h, s))
            return Pr(e, t, a, 0), Ke === null && Fr(), !1;
        } catch {
        } finally {
        }
      if (n = Io(e, t, a, l), n !== null)
        return en(n, e, l), Um(n, t, l), !0;
    }
    return !1;
  }
  function Ds(e, t, n, l) {
    if (l = {
      lane: 2,
      revertLane: Tf(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, xc(e)) {
      if (t) throw Error(o(479));
    } else
      t = Io(
        e,
        n,
        l,
        2
      ), t !== null && en(t, e, 2);
  }
  function xc(e) {
    var t = e.alternate;
    return e === pe || t !== null && t === pe;
  }
  function jm(e, t) {
    Ci = mc = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Um(e, t, n) {
    if ((n & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, n |= l, t.lanes = n, fi(e, n);
    }
  }
  var Ec = {
    readContext: zt,
    use: vc,
    useCallback: rt,
    useContext: rt,
    useEffect: rt,
    useImperativeHandle: rt,
    useLayoutEffect: rt,
    useInsertionEffect: rt,
    useMemo: rt,
    useReducer: rt,
    useRef: rt,
    useState: rt,
    useDebugValue: rt,
    useDeferredValue: rt,
    useTransition: rt,
    useSyncExternalStore: rt,
    useId: rt,
    useHostTransitionStatus: rt,
    useFormState: rt,
    useActionState: rt,
    useOptimistic: rt,
    useMemoCache: rt,
    useCacheRefresh: rt,
    useEffectEvent: rt
  }, km = {
    readContext: zt,
    use: vc,
    useCallback: function(e, t) {
      return Vt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: zt,
    useEffect: bm,
    useImperativeHandle: function(e, t, n) {
      n = n != null ? n.concat([e]) : null, bc(
        4194308,
        4,
        Tm.bind(null, t, e),
        n
      );
    },
    useLayoutEffect: function(e, t) {
      return bc(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      bc(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var n = Vt();
      t = t === void 0 ? null : t;
      var l = e();
      if (Ka) {
        ln(!0);
        try {
          e();
        } finally {
          ln(!1);
        }
      }
      return n.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, n) {
      var l = Vt();
      if (n !== void 0) {
        var a = n(t);
        if (Ka) {
          ln(!0);
          try {
            n(t);
          } finally {
            ln(!1);
          }
        }
      } else a = t;
      return l.memoizedState = l.baseState = a, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: a
      }, l.queue = e, e = e.dispatch = x0.bind(
        null,
        pe,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = Vt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = As(e);
      var t = e.queue, n = Mm.bind(null, pe, t);
      return t.dispatch = n, [e.memoizedState, n];
    },
    useDebugValue: Rs,
    useDeferredValue: function(e, t) {
      var n = Vt();
      return Cs(n, e, t);
    },
    useTransition: function() {
      var e = As(!1);
      return e = Rm.bind(
        null,
        pe,
        e.queue,
        !0,
        !1
      ), Vt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, n) {
      var l = pe, a = Vt();
      if (be) {
        if (n === void 0)
          throw Error(o(407));
        n = n();
      } else {
        if (n = t(), Ke === null)
          throw Error(o(349));
        (Oe & 127) !== 0 || lm(l, t, n);
      }
      a.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return a.queue = i, bm(im.bind(null, l, i, e), [
        e
      ]), l.flags |= 2048, zi(
        9,
        { destroy: void 0 },
        am.bind(
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
      var e = Vt(), t = Ke.identifierPrefix;
      if (be) {
        var n = ll, l = nl;
        n = (l & ~(1 << 32 - nt(l) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = pc++, 0 < n && (t += "H" + n.toString(32)), t += "_";
      } else
        n = m0++, t = "_" + t + "r_" + n.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: zs,
    useFormState: mm,
    useActionState: mm,
    useOptimistic: function(e) {
      var t = Vt();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = n, t = Ds.bind(
        null,
        pe,
        !0,
        n
      ), n.dispatch = t, [e, t];
    },
    useMemoCache: Es,
    useCacheRefresh: function() {
      return Vt().memoizedState = S0.bind(
        null,
        pe
      );
    },
    useEffectEvent: function(e) {
      var t = Vt(), n = { impl: e };
      return t.memoizedState = n, function() {
        if ((ke & 2) !== 0)
          throw Error(o(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, Lm = {
    readContext: zt,
    use: vc,
    useCallback: Am,
    useContext: zt,
    useEffect: Ns,
    useImperativeHandle: _m,
    useInsertionEffect: xm,
    useLayoutEffect: Em,
    useMemo: Om,
    useReducer: yc,
    useRef: ym,
    useState: function() {
      return yc(Ol);
    },
    useDebugValue: Rs,
    useDeferredValue: function(e, t) {
      var n = dt();
      return Nm(
        n,
        Qe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = yc(Ol)[0], t = dt().memoizedState;
      return [
        typeof e == "boolean" ? e : Zu(e),
        t
      ];
    },
    useSyncExternalStore: nm,
    useId: zm,
    useHostTransitionStatus: zs,
    useFormState: pm,
    useActionState: pm,
    useOptimistic: function(e, t) {
      var n = dt();
      return cm(n, Qe, e, t);
    },
    useMemoCache: Es,
    useCacheRefresh: Dm,
    useEffectEvent: Sm
  }, E0 = {
    readContext: zt,
    use: vc,
    useCallback: Am,
    useContext: zt,
    useEffect: Ns,
    useImperativeHandle: _m,
    useInsertionEffect: xm,
    useLayoutEffect: Em,
    useMemo: Om,
    useReducer: _s,
    useRef: ym,
    useState: function() {
      return _s(Ol);
    },
    useDebugValue: Rs,
    useDeferredValue: function(e, t) {
      var n = dt();
      return Qe === null ? Cs(n, e, t) : Nm(
        n,
        Qe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = _s(Ol)[0], t = dt().memoizedState;
      return [
        typeof e == "boolean" ? e : Zu(e),
        t
      ];
    },
    useSyncExternalStore: nm,
    useId: zm,
    useHostTransitionStatus: zs,
    useFormState: vm,
    useActionState: vm,
    useOptimistic: function(e, t) {
      var n = dt();
      return Qe !== null ? cm(n, Qe, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    },
    useMemoCache: Es,
    useCacheRefresh: Dm,
    useEffectEvent: Sm
  };
  function Ms(e, t, n, l) {
    t = e.memoizedState, n = n(l, t), n = n == null ? t : ee({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var js = {
    enqueueSetState: function(e, t, n) {
      e = e._reactInternals;
      var l = dn(), a = Pl(l);
      a.payload = t, n != null && (a.callback = n), t = Wl(e, a, l), t !== null && (en(t, e, l), Yu(t, e, l));
    },
    enqueueReplaceState: function(e, t, n) {
      e = e._reactInternals;
      var l = dn(), a = Pl(l);
      a.tag = 1, a.payload = t, n != null && (a.callback = n), t = Wl(e, a, l), t !== null && (en(t, e, l), Yu(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var n = dn(), l = Pl(n);
      l.tag = 2, t != null && (l.callback = t), t = Wl(e, l, n), t !== null && (en(t, e, n), Yu(t, e, n));
    }
  };
  function Hm(e, t, n, l, a, i, s) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, i, s) : t.prototype && t.prototype.isPureReactComponent ? !Mu(n, l) || !Mu(a, i) : !0;
  }
  function Bm(e, t, n, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, l), t.state !== e && js.enqueueReplaceState(t, t.state, null);
  }
  function Ja(e, t) {
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
  function Gm(e) {
    Ir(e);
  }
  function Ym(e) {
    console.error(e);
  }
  function qm(e) {
    Ir(e);
  }
  function Tc(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function Vm(e, t, n) {
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
  function Us(e, t, n) {
    return n = Pl(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      Tc(e, t);
    }, n;
  }
  function Xm(e) {
    return e = Pl(e), e.tag = 3, e;
  }
  function Qm(e, t, n, l) {
    var a = n.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var i = l.value;
      e.payload = function() {
        return a(i);
      }, e.callback = function() {
        Vm(t, n, l);
      };
    }
    var s = n.stateNode;
    s !== null && typeof s.componentDidCatch == "function" && (e.callback = function() {
      Vm(t, n, l), typeof a != "function" && (ra === null ? ra = /* @__PURE__ */ new Set([this]) : ra.add(this));
      var h = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: h !== null ? h : ""
      });
    });
  }
  function T0(e, t, n, l, a) {
    if (n.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = n.alternate, t !== null && Ga(
        t,
        n,
        a,
        !0
      ), n = Dt.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
          case 19:
            return Bt === null ? Xc() : n.alternate === null && ct === 0 && (ct = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, l === oc ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), Sf(e, l, a)), !1;
          case 22:
            return n.flags |= 65536, l === oc ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : n.add(l)), Sf(e, l, a)), !1;
        }
        throw Error(o(435, n.tag));
      }
      return Sf(e, l, a), Xc(), !1;
    }
    if (be)
      return t = Dt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = a, l !== ts && (e = Error(o(422), { cause: l }), ku(xn(e, n)))) : (l !== ts && (t = Error(o(423), {
        cause: l
      }), ku(
        xn(t, n)
      )), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, l = xn(l, n), a = Us(
        e.stateNode,
        l,
        a
      ), fs(e, a), ct !== 4 && (ct = 2)), !1;
    var i = Error(o(520), { cause: l });
    if (i = xn(i, n), tr === null ? tr = [i] : tr.push(i), ct !== 4 && (ct = 2), t === null) return !0;
    l = xn(l, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Us(n.stateNode, l, e), fs(n, e), !1;
        case 1:
          if (t = n.type, i = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || i !== null && typeof i.componentDidCatch == "function" && (ra === null || !ra.has(i))))
            return n.flags |= 65536, a &= -a, n.lanes |= a, a = Xm(a), Qm(
              a,
              e,
              n,
              l
            ), fs(n, a), !1;
          break;
        case 22:
          if (n.memoizedState !== null)
            return n.flags |= 65536, !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var ks = Error(o(461)), pt = !1;
  function yt(e, t, n, l) {
    t.child = e === null ? $h(t, null, n, l) : Za(
      t,
      e.child,
      n,
      l
    );
  }
  function Zm(e, t, n, l, a) {
    n = n.render;
    var i = t.ref;
    if ("ref" in l) {
      var s = {};
      for (var h in l)
        h !== "ref" && (s[h] = l[h]);
    } else s = l;
    return Ya(t), l = ys(
      e,
      t,
      n,
      s,
      i,
      a
    ), h = bs(), e !== null && !pt ? (Ss(e, t, a), Nl(e, t, a)) : (be && h && nc(t), t.flags |= 1, yt(e, t, l, a), t.child);
  }
  function Km(e, t, n, l, a) {
    if (e === null) {
      var i = n.type;
      return typeof i == "function" && !Fo(i) && i.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = i, Jm(
        e,
        t,
        i,
        l,
        a
      )) : (e = ec(
        n.type,
        null,
        l,
        t,
        t.mode,
        a
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (i = e.child, !Xs(e, a)) {
      var s = i.memoizedProps;
      if (n = n.compare, n = n !== null ? n : Mu, n(s, l) && e.ref === t.ref)
        return Nl(e, t, a);
    }
    return t.flags |= 1, e = xl(i, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Jm(e, t, n, l, a) {
    if (e !== null) {
      var i = e.memoizedProps;
      if (Mu(i, l) && e.ref === t.ref)
        if (pt = !1, t.pendingProps = l = i, Xs(e, a))
          (e.flags & 131072) !== 0 && (pt = !0);
        else
          return t.lanes = e.lanes, Nl(e, t, a);
    }
    return Ls(
      e,
      t,
      n,
      l,
      a
    );
  }
  function $m(e, t, n, l) {
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
        return Im(
          e,
          t,
          i,
          n,
          l
        );
      }
      if ((n & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && rc(
          t,
          i !== null ? i.cachePool : null
        ), i !== null ? Ph(t, i) : hs(), Wh(t);
      else
        return l = t.lanes = 536870912, Im(
          e,
          t,
          i !== null ? i.baseLanes | n : n,
          n,
          l
        );
    } else
      i !== null ? (rc(t, i.cachePool), Ph(t, i), na(), t.memoizedState = null) : (e !== null && rc(t, null), hs(), na());
    return yt(e, t, a, n), t.child;
  }
  function Ju(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Im(e, t, n, l, a) {
    var i = rs();
    return i = i === null ? null : { parent: ht._currentValue, pool: i }, t.memoizedState = {
      baseLanes: n,
      cachePool: i
    }, e !== null && rc(t, null), hs(), Wh(t), e !== null && Ga(e, t, l, !0), t.childLanes = a, null;
  }
  function _c(e, t) {
    return t = Ac(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Fm(e, t, n) {
    return Za(t, e.child, null, n), e = _c(t, t.pendingProps), e.flags |= 2, cn(t), t.memoizedState = null, e;
  }
  function _0(e, t, n) {
    var l = t.pendingProps, a = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (be) {
        if (l.mode === "hidden")
          return e = _c(t, l), t.lanes = 536870912, e.memoizedState = { baseLanes: 0, cachePool: null }, Ju(null, e);
        if (ps(t), (e = Ie) ? (e = Tg(
          e,
          _n
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Zl !== null ? { id: nl, overflow: ll } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = jh(e), n.return = t, t.child = n, Et = t, Ie = null)) : e = null, e === null) throw Jl(t);
        return t.lanes = 536870912, null;
      }
      return _c(t, l);
    }
    var i = e.memoizedState;
    if (i !== null) {
      var s = i.dehydrated;
      if (ps(t), a)
        if (t.flags & 256)
          t.flags &= -257, t = Fm(
            e,
            t,
            n
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(o(558));
      else if (pt || Ga(e, t, n, !1), a = (n & e.childLanes) !== 0, pt || a) {
        if (ea.current === null) {
          if (l = Ke, l !== null && (s = xu(l, n), s !== 0 && s !== i.retryLane))
            throw i.retryLane = s, ka(e, s), en(l, e, s), ks;
          Xc();
        }
        t = Fm(
          e,
          t,
          n
        );
      } else
        e = i.treeContext, Ie = On(s.nextSibling), Et = t, be = !0, Kl = null, _n = !1, e !== null && Lh(t, e), t = _c(t, l), t.flags |= 134221824;
      return t;
    }
    return e = xl(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Di(e, t) {
    var n = t.ref;
    if (n === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(o(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function Ls(e, t, n, l, a) {
    return Ya(t), n = ys(
      e,
      t,
      n,
      l,
      void 0,
      a
    ), l = bs(), e !== null && !pt ? (Ss(e, t, a), Nl(e, t, a)) : (be && l && nc(t), t.flags |= 1, yt(e, t, n, a), t.child);
  }
  function Pm(e, t, n, l, a, i) {
    return Ya(t), t.updateQueue = null, n = tm(
      t,
      l,
      n,
      a
    ), em(e), l = bs(), e !== null && !pt ? (Ss(e, t, i), Nl(e, t, i)) : (be && l && nc(t), t.flags |= 1, yt(e, t, n, i), t.child);
  }
  function Wm(e, t, n, l, a) {
    if (Ya(t), t.stateNode === null) {
      var i = Ei, s = n.contextType;
      typeof s == "object" && s !== null && (i = zt(s)), i = new n(l, i), t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = js, t.stateNode = i, i._reactInternals = t, i = t.stateNode, i.props = l, i.state = t.memoizedState, i.refs = {}, os(t), s = n.contextType, i.context = typeof s == "object" && s !== null ? zt(s) : Ei, i.state = t.memoizedState, s = n.getDerivedStateFromProps, typeof s == "function" && (Ms(
        t,
        n,
        s,
        l
      ), i.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (s = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), s !== i.state && js.enqueueReplaceState(i, i.state, null), Vu(t, l, i, a), qu(), i.state = t.memoizedState), typeof i.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      i = t.stateNode;
      var h = t.memoizedProps, b = Ja(n, h);
      i.props = b;
      var N = i.context, M = n.contextType;
      s = Ei, typeof M == "object" && M !== null && (s = zt(M));
      var k = n.getDerivedStateFromProps;
      M = typeof k == "function" || typeof i.getSnapshotBeforeUpdate == "function", h = t.pendingProps !== h, M || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (h || N !== s) && Bm(
        t,
        i,
        l,
        s
      ), Fl = !1;
      var _ = t.memoizedState;
      i.state = _, Vu(t, l, i, a), qu(), N = t.memoizedState, h || _ !== N || Fl ? (typeof k == "function" && (Ms(
        t,
        n,
        k,
        l
      ), N = t.memoizedState), (b = Fl || Hm(
        t,
        n,
        b,
        l,
        _,
        N,
        s
      )) ? (M || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = N), i.props = l, i.state = N, i.context = s, l = b) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      i = t.stateNode, ss(e, t), s = t.memoizedProps, M = Ja(n, s), i.props = M, k = t.pendingProps, _ = i.context, N = n.contextType, b = Ei, typeof N == "object" && N !== null && (b = zt(N)), h = n.getDerivedStateFromProps, (N = typeof h == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (s !== k || _ !== b) && Bm(
        t,
        i,
        l,
        b
      ), Fl = !1, _ = t.memoizedState, i.state = _, Vu(t, l, i, a), qu();
      var D = t.memoizedState;
      s !== k || _ !== D || Fl || e !== null && e.dependencies !== null && ic(e.dependencies) ? (typeof h == "function" && (Ms(
        t,
        n,
        h,
        l
      ), D = t.memoizedState), (M = Fl || Hm(
        t,
        n,
        M,
        l,
        _,
        D,
        b
      ) || e !== null && e.dependencies !== null && ic(e.dependencies)) ? (N || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(l, D, b), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(
        l,
        D,
        b
      )), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || s === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = D), i.props = l, i.state = D, i.context = b, l = M) : (typeof i.componentDidUpdate != "function" || s === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return i = l, Di(e, t), l = (t.flags & 128) !== 0, i || l ? (i = t.stateNode, n = l && typeof n.getDerivedStateFromError != "function" ? null : i.render(), t.flags |= 1, e !== null && l ? (t.child = Za(
      t,
      e.child,
      null,
      a
    ), t.child = Za(
      t,
      null,
      n,
      a
    )) : yt(e, t, n, a), t.memoizedState = i.state, e = t.child) : e = Nl(
      e,
      t,
      a
    ), e;
  }
  function ep(e, t, n, l) {
    return Ha(), t.flags |= 256, yt(e, t, n, l), t.child;
  }
  var Hs = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Bs(e) {
    return { baseLanes: e, cachePool: Vh() };
  }
  function Gs(e, t, n) {
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= fn), e;
  }
  function tp(e, t, n) {
    var l = t.pendingProps, a = !1, i = (t.flags & 128) !== 0, s;
    if ((s = i) || (s = e !== null && e.memoizedState === null ? !1 : (Mt.current & 2) !== 0), s && (a = !0, t.flags &= -129), s = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (be) {
        if (a ? ta(t) : na(), (e = Ie) ? (e = Tg(
          e,
          _n
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Zl !== null ? { id: nl, overflow: ll } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = jh(e), n.return = t, t.child = n, Et = t, Ie = null)) : e = null, e === null) throw Jl(t);
        return Gf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      return i = l.children, l = l.fallback, a ? (na(), a = t.mode, i = Ac(
        { mode: "hidden", children: i },
        a
      ), l = La(
        l,
        a,
        n,
        null
      ), i.return = t, l.return = t, i.sibling = l, t.child = i, l = t.child, l.memoizedState = Bs(n), l.childLanes = Gs(
        e,
        s,
        n
      ), t.memoizedState = Hs, Ju(null, l)) : (ta(t), Ys(t, i));
    }
    var h = e.memoizedState;
    if (h !== null) {
      var b = h.dehydrated;
      if (b !== null)
        return A0(
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
    return a ? (na(), a = l.fallback, i = t.mode, h = e.child, b = h.sibling, l = xl(h, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = h.subtreeFlags & 1206910976, b !== null ? a = xl(b, a) : (a = La(
      a,
      i,
      n,
      null
    ), a.flags |= 2), a.return = t, l.return = t, l.sibling = a, t.child = l, Ju(null, l), l = t.child, a = e.child.memoizedState, a === null ? a = Bs(n) : (i = a.cachePool, i !== null ? (h = ht._currentValue, i = i.parent !== h ? { parent: h, pool: h } : i) : i = Vh(), a = {
      baseLanes: a.baseLanes | n,
      cachePool: i
    }), l.memoizedState = a, l.childLanes = Gs(
      e,
      s,
      n
    ), t.memoizedState = Hs, Ju(e.child, l)) : (ta(t), n = e.child, e = n.sibling, n = xl(n, {
      mode: "visible",
      children: l.children
    }), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
  }
  function Ys(e, t) {
    return t = Ac(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Ac(e, t) {
    return e = It(22, e, null, t), e.lanes = 0, e;
  }
  function Oc(e, t, n) {
    return Za(t, e.child, null, n), e = Ys(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function A0(e, t, n, l, a, i, s, h) {
    if (n)
      return t.flags & 256 ? (ta(t), t.flags &= -257, Oc(
        e,
        t,
        h
      )) : t.memoizedState !== null ? (na(), t.child = e.child, t.flags |= 128, null) : (na(), i = a.fallback, s = t.mode, a = Ac(
        { mode: "visible", children: a.children },
        s
      ), i = La(
        i,
        s,
        h,
        null
      ), i.flags |= 2, a.return = t, i.return = t, a.sibling = i, t.child = a, Za(t, e.child, null, h), a = t.child, a.memoizedState = Bs(h), a.childLanes = Gs(
        e,
        l,
        h
      ), t.memoizedState = Hs, Ju(null, a));
    if (ta(t), Gf(i)) {
      if (l = i.nextSibling && i.nextSibling.dataset, l) var b = l.dgst;
      return l = b, l !== "" && (a = Error(o(419)), a.stack = "", a.digest = l, ku({ value: a, source: null, stack: null })), Oc(
        e,
        t,
        h
      );
    }
    if (pt || Ga(e, t, h, !1), l = (h & e.childLanes) !== 0, pt || l) {
      if (ea.current !== null)
        return Oc(
          e,
          t,
          h
        );
      if (l = Ke, l !== null && (a = xu(
        l,
        h
      ), a !== 0 && a !== s.retryLane))
        throw s.retryLane = a, ka(e, a), en(l, e, a), ks;
      return Bf(i) || Xc(), Oc(
        e,
        t,
        h
      );
    }
    return Bf(i) ? (t.flags |= 192, t.child = e.child, null) : (e = s.treeContext, Ie = On(i.nextSibling), Et = t, be = !0, Kl = null, _n = !1, e !== null && Lh(t, e), t = Ys(
      t,
      a.children
    ), t.flags |= 134221824, t);
  }
  function np(e, t, n) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), ac(e.return, t, n);
  }
  function lp(e) {
    for (var t = null; e !== null; ) {
      var n = e.alternate;
      n !== null && hc(n) === null && (t = e), e = e.sibling;
    }
    return t;
  }
  function Nc(e, t, n, l, a, i) {
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
  function qs(e) {
    var t = e.child;
    for (e.child = null; t !== null; ) {
      var n = t.sibling;
      t.sibling = e.child, e.child = t, t = n;
    }
  }
  function Vs(e, t, n) {
    var l = t.pendingProps, a = l.revealOrder, i = l.tail;
    l = l.children;
    var s = Mt.current;
    if (t.flags & 128)
      return Xu(t, s), null;
    var h = (s & 2) !== 0;
    if (h ? (s = s & 1 | 2, t.flags |= 128) : s &= 1, Xu(t, s), a === "backwards" && e !== null ? (qs(e), yt(e, t, l, n), qs(e)) : yt(e, t, l, n), l = be ? Uu : 0, !h && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && np(e, n, t);
        else if (e.tag === 19)
          np(e, n, t);
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
        n = lp(t.child), n === null ? (a = t.child, t.child = null) : (a = n.sibling, n.sibling = null, qs(t)), Nc(
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
          if (e = a.alternate, e !== null && hc(e) === null) {
            t.child = a;
            break;
          }
          e = a.sibling, a.sibling = n, n = a, a = e;
        }
        Nc(
          t,
          !0,
          n,
          null,
          i,
          l
        );
        break;
      case "together":
        Nc(
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
        n = lp(t.child), n === null ? (a = t.child, t.child = null) : (a = n.sibling, n.sibling = null), Nc(
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
  function ap(e, t, n) {
    var l = t.pendingProps;
    return $l(t, t.type, l.value), yt(e, t, l.children, n), t.child;
  }
  function Nl(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), ua |= t.lanes, (n & t.childLanes) === 0)
      if (e !== null) {
        if (Ga(
          e,
          t,
          n,
          !1
        ), (n & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(o(153));
    if (t.child !== null) {
      for (e = t.child, n = xl(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        e = e.sibling, n = n.sibling = xl(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function Xs(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && ic(e)));
  }
  function O0(e, t, n) {
    switch (t.tag) {
      case 3:
        _a(t, t.stateNode.containerInfo), $l(t, ht, e.memoizedState.cache), Ha();
        break;
      case 27:
      case 5:
        ui(t);
        break;
      case 4:
        _a(t, t.stateNode.containerInfo);
        break;
      case 10:
        $l(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, ps(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null) {
          if (l.dehydrated !== null)
            return ta(t), t.flags |= 128, null;
          l = Ga(
            e,
            t,
            n,
            !1
          );
          var a = t.child.childLanes;
          return l || (n & a) !== 0 ? tp(e, t, n) : (ta(t), e = Nl(
            e,
            t,
            n
          ), e !== null ? e.sibling : null);
        }
        ta(t);
        break;
      case 19:
        if (t.flags & 128)
          return Vs(
            e,
            t,
            n
          );
        if (a = (e.flags & 128) !== 0, l = (n & t.childLanes) !== 0, l || (Ga(
          e,
          t,
          n,
          !1
        ), l = (n & t.childLanes) !== 0), a) {
          if (l)
            return Vs(
              e,
              t,
              n
            );
          t.flags |= 128;
        }
        if (a = t.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), Xu(t, Mt.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, $m(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        $l(t, ht, e.memoizedState.cache);
    }
    return Nl(e, t, n);
  }
  function ip(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        pt = !0;
      else {
        if (!Xs(e, n) && (t.flags & 128) === 0)
          return pt = !1, O0(
            e,
            t,
            n
          );
        pt = (e.flags & 131072) !== 0;
      }
    else
      pt = !1, be && (t.flags & 1048576) !== 0 && kh(t, Uu, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = Xa(t.elementType), t.type = e, typeof e == "function")
            Fo(e) ? (l = Ja(e, l), t.tag = 1, t = Wm(
              null,
              t,
              e,
              l,
              n
            )) : (t.tag = 0, t = Ls(
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
                t.tag = 11, t = Zm(
                  null,
                  t,
                  e,
                  l,
                  n
                );
                break e;
              } else if (a === Se) {
                t.tag = 14, t = Km(
                  null,
                  t,
                  e,
                  l,
                  n
                );
                break e;
              } else if (a === Je) {
                t.tag = 10, t.type = e, t = ap(
                  null,
                  t,
                  n
                );
                break e;
              }
            }
            throw t = we(e) || e, Error(o(306, t, ""));
          }
        }
        return t;
      case 0:
        return Ls(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 1:
        return l = t.type, a = Ja(
          l,
          t.pendingProps
        ), Wm(
          e,
          t,
          l,
          a,
          n
        );
      case 3:
        e: {
          if (_a(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(o(387));
          l = t.pendingProps;
          var i = t.memoizedState;
          a = i.element, ss(e, t), Vu(t, l, null, n);
          var s = t.memoizedState;
          if (l = s.cache, $l(t, ht, l), l !== i.cache && as(
            t,
            [ht],
            n,
            !0
          ), qu(), l = s.element, i.isDehydrated)
            if (i = {
              element: l,
              isDehydrated: !1,
              cache: s.cache
            }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
              t = ep(
                e,
                t,
                l,
                n
              );
              break e;
            } else if (l !== a) {
              a = xn(
                Error(o(424)),
                t
              ), ku(a), t = ep(
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
              for (Ie = On(e.firstChild), Et = t, be = !0, Kl = null, _n = !0, n = $h(
                t,
                null,
                l,
                n
              ), t.child = n; n; )
                n.flags = n.flags & -3 | 134221824, n = n.sibling;
            }
          else {
            if (Ha(), l === a) {
              t = Nl(
                e,
                t,
                n
              );
              break e;
            }
            yt(e, t, l, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Di(e, t), e === null ? (n = wg(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = n : be || (t.stateNode = og(
          t.type,
          t.pendingProps,
          jn.current,
          t
        )) : t.memoizedState = wg(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return ui(t), e === null && be && (l = t.stateNode = Og(
          t.type,
          t.pendingProps,
          jn.current
        ), Et = t, _n = !0, a = Ie, sa(t.type) ? (Yf = a, Ie = On(l.firstChild)) : Ie = a), yt(
          e,
          t,
          t.pendingProps.children,
          n
        ), Di(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && be && ((a = l = Ie) && (l = SS(
          l,
          t.type,
          t.pendingProps,
          _n
        ), l !== null ? (t.stateNode = l, Et = t, Ie = On(l.firstChild), _n = !1, a = !0) : a = !1), a || Jl(t)), ui(t), a = t.type, i = t.pendingProps, s = e !== null ? e.memoizedProps : null, l = i.children, Df(a, i) ? l = null : s !== null && Df(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = ys(
          e,
          t,
          p0,
          null,
          null,
          n
        ), Ii._currentValue = a), Di(e, t), yt(e, t, l, n), t.child;
      case 6:
        return e === null && be && ((e = n = Ie) && (n = xS(
          n,
          t.pendingProps,
          _n
        ), n !== null ? (t.stateNode = n, Et = t, Ie = null, e = !0) : e = !1), e || Jl(t)), null;
      case 13:
        return tp(e, t, n);
      case 4:
        return _a(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = Za(
          t,
          null,
          l,
          n
        ) : yt(e, t, l, n), t.child;
      case 11:
        return Zm(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 7:
        return l = t.pendingProps, Di(e, t), yt(e, t, l, n), t.child;
      case 8:
        return yt(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 12:
        return yt(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 10:
        return ap(e, t, n);
      case 9:
        return a = t.type._context, l = t.pendingProps.children, Ya(t), a = zt(a), l = l(a), t.flags |= 1, yt(e, t, l, n), t.child;
      case 14:
        return Km(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 15:
        return Jm(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 19:
        return Vs(e, t, n);
      case 31:
        return _0(e, t, n);
      case 22:
        return $m(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        return Ya(t), l = zt(ht), e === null ? (a = rs(), a === null && (a = Ke, i = is(), a.pooledCache = i, i.refCount++, i !== null && (a.pooledCacheLanes |= n), a = i), t.memoizedState = { parent: l, cache: a }, os(t), $l(t, ht, a)) : ((e.lanes & n) !== 0 && (ss(e, t), Vu(t, null, null, n), qu()), a = e.memoizedState, i = t.memoizedState, a.parent !== l ? (a = { parent: l, cache: l }, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), $l(t, ht, l)) : (l = i.cache, $l(t, ht, l), l !== a.cache && as(
          t,
          [ht],
          n,
          !0
        ))), yt(
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
        }), l = t.pendingProps, l.name != null && l.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : be && nc(t), e !== null && e.memoizedProps.name !== l.name ? t.flags |= 4194816 : Di(e, t), yt(e, t, l.children, n), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function Rl(e) {
    e.flags |= 4;
  }
  function Qs(e, t, n, l, a) {
    var i;
    if ((i = (e.mode & 32) !== 0) && (i = n === null ? jg(t, l) : jg(t, l) && (l.src !== n.src || l.srcSet !== n.srcSet)), i) {
      if (e.flags |= 16777216, (a & 335544128) === a)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Gp()) e.flags |= 8192;
        else
          throw Qa = oc, cs;
    } else e.flags &= -16777217;
  }
  function up(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Ug(t))
      if (Gp()) e.flags |= 8192;
      else
        throw Qa = oc, cs;
  }
  function Rc(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? kr() : 536870912, e.lanes |= t, Li |= t);
  }
  function $u(e, t) {
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
  function Fe(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, l = 0;
    if (t)
      for (var a = e.child; a !== null; )
        n |= a.lanes | a.childLanes, l |= a.subtreeFlags & 1206910976, l |= a.flags & 1206910976, a.return = e, a = a.sibling;
    else
      for (a = e.child; a !== null; )
        n |= a.lanes | a.childLanes, l |= a.subtreeFlags, l |= a.flags, a.return = e, a = a.sibling;
    return e.subtreeFlags |= l, e.childLanes = n, t;
  }
  function N0(e, t, n) {
    var l = t.pendingProps;
    switch (es(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Fe(t), null;
      case 1:
        return Fe(t), null;
      case 3:
        return n = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), _l(ht), Jn(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Ai(t) ? Rl(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, ns())), Fe(t), null;
      case 26:
        var a = t.type, i = t.memoizedState;
        return e === null ? (Rl(t), i !== null ? (Fe(t), up(t, i)) : (Fe(t), Qs(
          t,
          a,
          null,
          l,
          n
        ))) : i ? i !== e.memoizedState ? (Rl(t), Fe(t), up(t, i)) : (Fe(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && Rl(t), Fe(t), Qs(
          t,
          a,
          e,
          l,
          n
        )), null;
      case 27:
        if (Aa(t), n = jn.current, a = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Rl(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Fe(t), t.subtreeFlags &= -33554433, null;
          }
          e = st.current, Ai(t) ? Hh(t) : (e = Og(a, l, n), t.stateNode = e, Rl(t));
        }
        return Fe(t), t.subtreeFlags &= -33554433, null;
      case 5:
        if (Aa(t), a = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Rl(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Fe(t), t.subtreeFlags &= -33554433, null;
          }
          if (i = st.current, Ai(t))
            Hh(t);
          else {
            var s = ur(
              jn.current
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
            i[$e] = t, i[Rt] = l;
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
            e: switch (Ut(i, a, l), a) {
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
            l && Rl(t);
          }
        }
        return Fe(t), t.subtreeFlags &= -33554433, Qs(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          n
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== l && Rl(t);
        else {
          if (typeof l != "string" && t.stateNode === null)
            throw Error(o(166));
          if (e = jn.current, Ai(t)) {
            if (e = t.stateNode, n = t.memoizedProps, l = null, a = Et, a !== null)
              switch (a.tag) {
                case 27:
                case 5:
                  l = a.memoizedProps;
              }
            e[$e] = t, e = !!(e.nodeValue === n || l !== null && l.suppressHydrationWarning === !0 || ig(e.nodeValue, n)), e || Jl(t, !0);
          } else
            e = ur(e).createTextNode(
              l
            ), e[$e] = t, t.stateNode = e;
        }
        return Fe(t), null;
      case 31:
        if (n = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = Ai(t), n !== null) {
            if (e === null) {
              if (!l) throw Error(o(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(557));
              e[$e] = t;
            } else
              Ha(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Fe(t), e = !1;
          } else
            n = ns(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
          if (!e)
            return t.flags & 256 ? (cn(t), t) : (cn(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(o(558));
        }
        return Fe(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (a = Ai(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!a) throw Error(o(318));
              if (a = t.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(o(317));
              a[$e] = t;
            } else
              Ha(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Fe(t), a = !1;
          } else
            a = ns(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
          if (!a)
            return t.flags & 256 ? (cn(t), t) : (cn(t), null);
        }
        return cn(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = l !== null, e = e !== null && e.memoizedState !== null, n && (l = t.child, a = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (a = l.alternate.memoizedState.cachePool.pool), i = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (i = l.memoizedState.cachePool.pool), i !== a && (l.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Rc(t, t.updateQueue), Fe(t), null);
      case 4:
        return Jn(), e === null && Nf(t.stateNode.containerInfo), t.flags |= 67108864, Fe(t), null;
      case 10:
        return _l(t.type), Fe(t), null;
      case 19:
        if (gs(t), l = t.memoizedState, l === null) return Fe(t), null;
        if (a = (t.flags & 128) !== 0, i = l.rendering, i === null)
          if (a) $u(l, !1);
          else {
            if (ct !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (i = hc(e), i !== null) {
                  for (t.flags |= 128, $u(l, !1), e = i.updateQueue, t.updateQueue = e, Rc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; )
                    Mh(n, e), n = n.sibling;
                  return Xu(
                    t,
                    Mt.current & 1 | 2
                  ), be && El(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && Ht() > Gc && (t.flags |= 128, a = !0, $u(l, !1), t.lanes = 4194304);
          }
        else {
          if (!a)
            if (e = hc(i), e !== null) {
              if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Rc(t, e), $u(l, !0), l.tail === null && l.tailMode !== "collapsed" && l.tailMode !== "visible" && !i.alternate && !be)
                return Fe(t), null;
            } else
              2 * Ht() - l.renderingStartTime > Gc && n !== 536870912 && (t.flags |= 128, a = !0, $u(l, !1), t.lanes = 4194304);
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
          return l.rendering = e, l.tail = e.sibling, l.renderingStartTime = Ht(), e.sibling = null, i = Mt.current, i = a ? i & 1 | 2 : i & 1, l.tailMode === "visible" || l.tailMode === "collapsed" || !n || be ? Xu(t, i) : (n = i, Le(Dt, t), Le(Mt, n), Bt === null && (Bt = t)), be && El(t, l.treeForkCount), e;
        }
        return Fe(t), null;
      case 22:
      case 23:
        return cn(t), ms(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (Fe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Fe(t), n = t.updateQueue, n !== null && Rc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== n && (t.flags |= 2048), e !== null && me(Va), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), _l(ht), Fe(t), null;
      case 25:
        return null;
      case 30:
        return t.flags |= 33554432, Fe(t), null;
    }
    throw Error(o(156, t.tag));
  }
  function R0(e, t) {
    switch (es(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return _l(ht), Jn(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Aa(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (cn(t), t.alternate === null)
            throw Error(o(340));
          Ha();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (cn(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(o(340));
          Ha();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return gs(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
      case 4:
        return Jn(), null;
      case 10:
        return _l(t.type), null;
      case 22:
      case 23:
        return cn(t), ms(), e !== null && me(Va), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return _l(ht), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function rp(e, t) {
    switch (es(t), t.tag) {
      case 3:
        _l(ht), Jn();
        break;
      case 26:
      case 27:
      case 5:
        Aa(t);
        break;
      case 4:
        Jn();
        break;
      case 31:
        t.memoizedState !== null && cn(t);
        break;
      case 13:
        cn(t);
        break;
      case 19:
        gs(t);
        break;
      case 10:
        _l(t.type);
        break;
      case 22:
      case 23:
        cn(t), ms(), e !== null && me(Va);
        break;
      case 24:
        _l(ht);
    }
  }
  function Iu(e, t) {
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
  function la(e, t, n) {
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
              var b = n, N = h;
              try {
                N();
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
  function cp(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        Fh(t, n);
      } catch (l) {
        Ye(e, e.return, l);
      }
    }
  }
  function op(e, t, n) {
    n.props = Ja(
      e.type,
      e.memoizedProps
    ), n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (l) {
      Ye(e, t, l);
    }
  }
  function al(e, t) {
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
            var a = e.stateNode, i = bl(e.memoizedProps, a);
            (a.ref === null || a.ref.name !== i) && (a.ref = gg(i)), l = a.ref;
            break;
          case 7:
            if (e.stateNode === null) {
              var s = new hn(e);
              y(
                e.child,
                !1,
                yS,
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
  function jt(e, t) {
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
  function Cc(e, t) {
    if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null)
      for (var n = 0; n < t.length; n++)
        Eg(
          e.stateNode,
          t[n]
        );
  }
  function sp(e) {
    for (var t = e.return; t !== null && (Ks(t) && Eg(e.stateNode, t.stateNode), !Zs(t)); )
      t = t.return;
  }
  function Fu(e) {
    for (var t = e.return; t !== null && (Ks(t) && bS(e.stateNode, t.stateNode), !Zs(t)); )
      t = t.return;
  }
  function Zs(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 27;
  }
  function Ks(e) {
    return e && e.tag === 7 && e.stateNode !== null;
  }
  function Js(e) {
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
  function $s(e, t, n) {
    try {
      var l = e.stateNode;
      eS(l, e.type, n, t), l[Rt] = t;
    } catch (a) {
      Ye(e, e.return, a);
    }
  }
  function fp(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && sa(e.type) || e.tag === 4;
  }
  function Is(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || fp(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && sa(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Fs(e, t, n, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      a = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(a, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(a), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = tl)), Cc(e, l), Ce = !0;
    else if (a !== 4 && (a === 27 && (Cc(e, l), l = null, sa(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null))
      for (Fs(
        e,
        t,
        n,
        l
      ), e = e.sibling; e !== null; )
        Fs(
          e,
          t,
          n,
          l
        ), e = e.sibling;
  }
  function wc(e, t, n, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      a = e.stateNode, t ? n.insertBefore(a, t) : n.appendChild(a), Cc(e, l), Ce = !0;
    else if (a !== 4 && (a === 27 && (Cc(e, l), l = null, sa(e.type) && (n = e.stateNode)), e = e.child, e !== null))
      for (wc(
        e,
        t,
        n,
        l
      ), e = e.sibling; e !== null; )
        wc(
          e,
          t,
          n,
          l
        ), e = e.sibling;
  }
  function dp(e) {
    var t = e.stateNode, n = e.memoizedProps;
    try {
      for (var l = e.type, a = t.attributes; a.length; )
        t.removeAttributeNode(a[0]);
      Ut(t, l, n), t[$e] = e, t[Rt] = n;
    } catch (i) {
      Ye(e, e.return, i);
    }
  }
  var zc = !1, on = null;
  function hp(e) {
    (e.tag === 30 || (e.subtreeFlags & 33554432) !== 0) && (zc = !0);
  }
  var il = null;
  function mp() {
    var e = il;
    return il = null, e;
  }
  var Ft = 0;
  function Mi(e, t, n, l, a) {
    return Ft = 0, pp(
      e.child,
      t,
      n,
      l,
      a
    );
  }
  function pp(e, t, n, l, a) {
    for (var i = !1; e !== null; ) {
      if (e.tag === 5) {
        var s = e.stateNode;
        if (l !== null) {
          var h = Uf(s);
          l.push(h), h.view && (i = !0);
        } else
          i || Uf(s).view && (i = !0);
        zc = !0, mg(
          s,
          Ft === 0 ? t : t + "_" + Ft,
          n
        ), Ft++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && a || pp(
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
  function ul(e, t) {
    for (; e !== null; )
      e.tag === 5 ? pg(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && t || ul(
        e.child,
        t
      )), e = e.sibling;
  }
  function Dc(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if ((e.tag !== 22 || e.memoizedState === null) && (Dc(e), e.tag === 30 && (e.flags & 18874368) !== 0 && e.stateNode.paired)) {
          var t = e.memoizedProps;
          if (t.name == null || t.name === "auto")
            throw Error(o(544));
          var n = t.name;
          t = Sl(t.default, t.share), t !== "none" && (Mi(
            e,
            n,
            t,
            null,
            !1
          ) || ul(e.child, !1));
        }
        e = e.sibling;
      }
  }
  function Ps(e, t) {
    if (e.tag === 30) {
      var n = e.stateNode, l = e.memoizedProps, a = bl(l, n), i = Sl(
        l.default,
        n.paired ? l.share : l.enter
      );
      i !== "none" ? Mi(e, a, i, null, !1) ? (Dc(e), n.paired || t || Yi(e, l.onEnter)) : ul(e.child, !1) : Dc(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        Ps(e, t), e = e.sibling;
    else Dc(e);
  }
  function Ws(e) {
    if (on !== null && on.size !== 0) {
      var t = on;
      if ((e.subtreeFlags & 18874368) !== 0)
        for (e = e.child; e !== null; ) {
          if (e.tag !== 22 || e.memoizedState === null) {
            if (e.tag === 30 && (e.flags & 18874368) !== 0) {
              var n = e.memoizedProps, l = n.name;
              if (l != null && l !== "auto") {
                var a = t.get(l);
                if (a !== void 0) {
                  var i = Sl(
                    n.default,
                    n.share
                  );
                  if (i !== "none" && (Mi(
                    e,
                    l,
                    i,
                    null,
                    !1
                  ) ? (i = e.stateNode, a.paired = i, i.paired = a, Yi(e, n.onShare)) : ul(e.child, !1)), t.delete(l), t.size === 0) break;
                }
              }
            }
            Ws(e);
          }
          e = e.sibling;
        }
    }
  }
  function ef(e) {
    if (e.tag === 30) {
      var t = e.memoizedProps, n = bl(t, e.stateNode), l = on !== null ? on.get(n) : void 0, a = Sl(
        t.default,
        l !== void 0 ? t.share : t.exit
      );
      a !== "none" && (Mi(e, n, a, null, !1) ? l !== void 0 ? (a = e.stateNode, l.paired = a, a.paired = l, on.delete(n), Yi(e, t.onShare)) : Yi(e, t.onExit) : ul(e.child, !1)), on !== null && Ws(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        ef(e), e = e.sibling;
    else
      on !== null && Ws(e);
  }
  function gp(e) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var t = e.memoizedProps, n = bl(t, e.stateNode);
        t = Sl(t.default, t.update), e.flags &= -5, t !== "none" && Mi(
          e,
          n,
          t,
          e.memoizedState = [],
          !1
        );
      } else
        (e.subtreeFlags & 33554432) !== 0 && gp(e);
      e = e.sibling;
    }
  }
  function tf(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if (e.tag !== 22 || e.memoizedState === null) {
          if (e.tag === 30 && (e.flags & 18874368) !== 0) {
            var t = e.stateNode;
            t.paired !== null && (t.paired = null, ul(e.child, !1));
          }
          tf(e);
        }
        e = e.sibling;
      }
  }
  function Mc(e) {
    if (e.tag === 30)
      e.stateNode.paired = null, ul(e.child, !1), tf(e);
    else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        Mc(e), e = e.sibling;
    else tf(e);
  }
  function vp(e) {
    for (e = e.child; e !== null; )
      e.tag === 30 ? ul(e.child, !1) : (e.subtreeFlags & 33554432) !== 0 && vp(e), e = e.sibling;
  }
  function nf(e, t, n, l, a, i, s) {
    for (var h = !1; t !== null; ) {
      if (t.tag === 5) {
        var b = t.stateNode;
        if (i !== null && Ft < i.length) {
          var N = i[Ft], M = Uf(b);
          (N.view || M.view) && (h = !0);
          var k;
          if (k = (e.flags & 4) === 0)
            if (M.clip) k = !0;
            else {
              k = N.rect;
              var _ = M.rect;
              k = k.y !== _.y || k.x !== _.x || k.height !== _.height || k.width !== _.width;
            }
          k && (e.flags |= 4), M.abs ? M = !N.abs : (N = N.rect, M = M.rect, M = N.height !== M.height || N.width !== M.width), M && (e.flags |= 32);
        } else e.flags |= 32;
        (e.flags & 4) !== 0 && mg(
          b,
          Ft === 0 ? n : n + "_" + Ft,
          a
        ), h && (e.flags & 4) !== 0 || (il === null && (il = []), il.push(
          b,
          Ft === 0 ? l : l + "_" + Ft,
          t.memoizedProps
        )), Ft++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && s ? e.flags |= t.flags & 32 : nf(
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
  function yp(e, t) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var n = e.memoizedProps, l = e.stateNode, a = bl(n, l), i = Sl(n.default, n.update), s;
        s = e.memoizedState, e.memoizedState = null, l = e;
        var h = e.child;
        Ft = 0, a = nf(
          l,
          h,
          a,
          a,
          i,
          s,
          !1
        ), (e.flags & 4) !== 0 && a && Yi(e, n.onUpdate);
      } else
        (e.subtreeFlags & 33554432) !== 0 && yp(e);
      e = e.sibling;
    }
  }
  var Tt = !1, He = !1, rl = !1, lf = !1, bp = typeof WeakSet == "function" ? WeakSet : Set, _t = null, cl = !1, Pu = !1, jc = !1, af = !1;
  function C0(e, t, n) {
    if (e = e.containerInfo, wf = Fi, e = Th(e), Xo(e)) {
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
            var h = 0, b = -1, N = -1, M = 0, k = 0, _ = e, D = null;
            t: for (; ; ) {
              for (var X; _ !== l || i !== 0 && _.nodeType !== 3 || (b = h + i), _ !== s || a !== 0 && _.nodeType !== 3 || (N = h + a), _.nodeType === 3 && (h += _.nodeValue.length), (X = _.firstChild) !== null; )
                D = _, _ = X;
              for (; ; ) {
                if (_ === e) break t;
                if (D === l && ++M === i && (b = h), D === s && ++k === a && (N = h), (X = _.nextSibling) !== null) break;
                _ = D, D = _.parentNode;
              }
              _ = X;
            }
            l = b === -1 || N === -1 ? null : { start: b, end: N };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (zf = { focusedElem: e, selectionRange: l }, Fi = !1, n = (n & 335544064) === n, _t = t, t = n ? 9270 : 1024; _t !== null; ) {
      if (e = _t, n && (l = e.deletions, l !== null))
        for (i = 0; i < l.length; i++)
          n && ef(l[i]);
      if (e.alternate === null && (e.flags & 2) !== 0)
        n && hp(e), Uc(n);
      else {
        if (e.tag === 22) {
          if (l = e.alternate, e.memoizedState !== null) {
            l !== null && l.memoizedState === null && n && ef(l), Uc(n);
            continue;
          } else if (l !== null && l.memoizedState !== null) {
            n && hp(e), Uc(n);
            continue;
          }
        }
        l = e.child, (e.subtreeFlags & t) !== 0 && l !== null ? (l.return = e, _t = l) : (n && gp(e), Uc(n));
      }
    }
    on = null;
  }
  function Uc(e) {
    for (; _t !== null; ) {
      var t = _t, n = e, l = t.alternate, a = t.flags;
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
              var s = Ja(
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
              Hf(l);
            else if (n === 1)
              switch (l.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Hf(l);
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
          n && l !== null && (n = bl(
            l.memoizedProps,
            l.stateNode
          ), a = t.memoizedProps, a = Sl(a.default, a.update), a !== "none" && Mi(
            l,
            n,
            a,
            l.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((a & 1024) !== 0) throw Error(o(163));
      }
      if (l = t.sibling, l !== null) {
        l.return = t.return, _t = l;
        break;
      }
      _t = t.return;
    }
  }
  function Sp(e, t, n) {
    var l = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        ol(e, n), l & 4 && Iu(5, n);
        break;
      case 1:
        if (ol(e, n), l & 4)
          if (e = n.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (s) {
              Ye(n, n.return, s);
            }
          else {
            var a = Ja(
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
        l & 64 && cp(n), l & 512 && al(n, n.return);
        break;
      case 3:
        if (ol(e, n), l & 64 && (e = n.updateQueue, e !== null)) {
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
            Fh(e, t);
          } catch (s) {
            Ye(n, n.return, s);
          }
        }
        break;
      case 27:
        t === null && l & 4 && dp(n);
      case 26:
      case 5:
        ol(e, n), t === null && l & 4 && Js(n), l & 512 && al(n, n.return);
        break;
      case 12:
        ol(e, n);
        break;
      case 31:
        ol(e, n), l & 4 && _p(e, n);
        break;
      case 13:
        ol(e, n), l & 4 && Ap(e, n), l & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Y0.bind(
          null,
          n
        ), ES(e, n))));
        break;
      case 22:
        if (l = n.memoizedState !== null || Tt, !l) {
          var i = t !== null && t.memoizedState !== null || He;
          t = Tt, a = He, Tt = l, (He = i) && !a ? (l = 2, (n.subtreeFlags & 8772) !== 0 && (l |= 1), Yn(
            e,
            n,
            l
          )) : ol(e, n), Tt = t, He = a;
        }
        break;
      case 30:
        ol(e, n), l & 512 && al(n, n.return);
        break;
      case 7:
        l & 512 && al(n, n.return);
      default:
        ol(e, n);
    }
  }
  function uf(e, t) {
    for (e = e.child; e !== null; )
      xp(e, t), e = e.sibling;
  }
  function xp(e, t) {
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
        rf(e, t);
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
          t ? hg(h, !0) : hg(e.stateNode, !1);
        } catch (b) {
          Ye(e, e.return, b);
        }
        break;
      case 22:
      case 23:
        e.memoizedState === null && uf(e, t);
        break;
      default:
        uf(e, t);
    }
  }
  function rf(e, t) {
    if (e.subtreeFlags & 67108864)
      for (e = e.child; e !== null; ) {
        e: {
          var n = e, l = t;
          switch (n.tag) {
            case 4:
              xp(n, l);
              break e;
            case 22:
              n.memoizedState === null && rf(n, l);
              break e;
            default:
              rf(n, l);
          }
        }
        e = e.sibling;
      }
  }
  function Ep(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Ep(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && za(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var at = null, Pt = !1;
  function Bn(e, t, n) {
    for (n = n.child; n !== null; )
      Tp(e, t, n), n = n.sibling;
  }
  function Tp(e, t, n) {
    if (xt && typeof xt.onCommitFiberUnmount == "function")
      try {
        xt.onCommitFiberUnmount(Bl, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        He || jt(n, t), Bn(
          e,
          t,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !He && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        He || jt(n, t), Fu(n);
        var l = at, a = Pt;
        sa(n.type) && (at = n.stateNode, Pt = !1), Bn(
          e,
          t,
          n
        ), Ng(
          n.stateNode,
          n.type,
          n.memoizedProps
        ), at = l, Pt = a;
        break;
      case 5:
        He || jt(n, t), Fu(n);
      case 6:
        if (n.tag === 6 && Fu(n), l = at, a = Pt, at = null, Bn(
          e,
          t,
          n
        ), at = l, Pt = a, at !== null)
          if (Pt)
            try {
              (at.nodeType === 9 ? at.body : at.nodeName === "HTML" ? at.ownerDocument.body : at).removeChild(n.stateNode), Ce = !0;
            } catch (i) {
              Ye(
                n,
                t,
                i
              );
            }
          else
            try {
              at.removeChild(n.stateNode), Ce = !0;
            } catch (i) {
              Ye(
                n,
                t,
                i
              );
            }
        break;
      case 18:
        at !== null && (Pt ? (e = at, dg(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          n.stateNode
        ), Pi(e)) : dg(at, n.stateNode));
        break;
      case 4:
        l = at, a = Pt, at = n.stateNode.containerInfo, Pt = !0, Bn(
          e,
          t,
          n
        ), at = l, Pt = a;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        la(2, n, t), He || la(4, n, t), Bn(
          e,
          t,
          n
        );
        break;
      case 1:
        He || (jt(n, t), l = n.stateNode, typeof l.componentWillUnmount == "function" && op(
          n,
          t,
          l
        )), Bn(
          e,
          t,
          n
        );
        break;
      case 21:
        Bn(
          e,
          t,
          n
        );
        break;
      case 22:
        He = (l = He) || n.memoizedState !== null, Bn(
          e,
          t,
          n
        ), He = l;
        break;
      case 30:
        jt(n, t), Bn(
          e,
          t,
          n
        );
        break;
      case 7:
        He || jt(n, t), Bn(
          e,
          t,
          n
        );
        break;
      default:
        Bn(
          e,
          t,
          n
        );
    }
  }
  function _p(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Pi(e);
      } catch (n) {
        Ye(t, t.return, n);
      }
    }
  }
  function Ap(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Pi(e);
      } catch (n) {
        Ye(t, t.return, n);
      }
  }
  function w0(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new bp()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new bp()), t;
      default:
        throw Error(o(435, e.tag));
    }
  }
  function kc(e, t) {
    var n = w0(e);
    t.forEach(function(l) {
      if (!n.has(l)) {
        n.add(l);
        var a = q0.bind(null, e, l);
        l.then(a, a);
      }
    });
  }
  function Xt(e, t, n) {
    var l = t.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var i = l[a], s = e, h = t, b = h;
        e: for (; b !== null; ) {
          switch (b.tag) {
            case 27:
              if (sa(b.type)) {
                at = b.stateNode, Pt = !1;
                break e;
              }
              break;
            case 5:
              at = b.stateNode, Pt = !1;
              break e;
            case 3:
            case 4:
              at = b.stateNode.containerInfo, Pt = !0;
              break e;
          }
          b = b.return;
        }
        if (at === null) throw Error(o(160));
        Tp(s, h, i), at = null, Pt = !1, s = i.alternate, s !== null && (s.return = null), i.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Op(t, e, n), t = t.sibling;
  }
  var Gn = null;
  function Op(e, t, n) {
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
        Xt(t, e, n), Qt(e), a & 4 && (la(3, e, e.return), Iu(3, e), la(5, e, e.return));
        break;
      case 1:
        Xt(t, e, n), Qt(e), a & 512 && (He || l === null || jt(l, l.return)), a & 64 && Tt && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
        break;
      case 26:
        if (i = Gn, Xt(t, e, n), Qt(e), a & 512 && (He || l === null || jt(l, l.return)), a & 4)
          if (a = l !== null ? l.memoizedState : null, n = e.memoizedState, l === null)
            if (n === null)
              if (e.stateNode === null)
                if (Tt)
                  e.stateNode = og(
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
                        l = a.getElementsByTagName("title")[0], (!l || l[Ca] || l[$e] || l.namespaceURI === "http://www.w3.org/2000/svg" || l.hasAttribute("itemprop")) && (l = a.createElement(t), a.head.insertBefore(
                          l,
                          a.querySelector("head > title")
                        )), Ut(l, t, n), l[$e] = e, lt(l), t = l;
                        break e;
                      case "link":
                        if (i = Mg(
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
                        l = a.createElement(t), Ut(l, t, n), a.head.appendChild(l);
                        break;
                      case "meta":
                        if (i = Mg(
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
                        l = a.createElement(t), Ut(l, t, n), a.head.appendChild(l);
                        break;
                      default:
                        throw Error(o(468, t));
                    }
                    l[$e] = e, lt(l), t = l;
                  }
                  e.stateNode = t;
                }
              else
                Tt || Qf(i, e.type, e.stateNode);
            else
              e.stateNode = Dg(
                i,
                n,
                e.memoizedProps
              );
          else
            a !== n ? (a === null ? (t = l.stateNode, t === null || He || t.parentNode.removeChild(t)) : a.count--, n === null ? Tt || Qf(i, e.type, e.stateNode) : Dg(i, n, e.memoizedProps)) : n === null && e.stateNode !== null && $s(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        break;
      case 27:
        Xt(t, e, n), Qt(e), a & 512 && (He || l === null || jt(l, l.return)), l !== null && a & 4 && $s(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (i = rl, rl = !1, Xt(t, e, n), rl = i, Qt(e), a & 512 && (He || l === null || jt(l, l.return)), e.flags & 32) {
          t = e.stateNode;
          try {
            ut(t, ""), Ce = !0;
          } catch (M) {
            Ye(e, e.return, M);
          }
        }
        a & 4 && e.stateNode != null && (t = e.memoizedProps, $s(
          e,
          t,
          l !== null ? l.memoizedProps : t
        )), a & 1024 && (lf = !0);
        break;
      case 6:
        if (Xt(t, e, n), Qt(e), a & 4) {
          if (e.stateNode === null)
            throw Error(o(162));
          t = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = t, Ce = !0;
          } catch (M) {
            Ye(e, e.return, M);
          }
        }
        break;
      case 3:
        if (Ce = !1, Fc = null, i = Gn, Gn = rr(t.containerInfo), Xt(t, e, n), Gn = i, Qt(e), a & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Pi(t.containerInfo);
          } catch (M) {
            Ye(e, e.return, M);
          }
        lf && (lf = !1, Np(e)), Ce = !1;
        break;
      case 4:
        a = rl, rl = Tt, l = Yr(), i = Gn, Gn = rr(
          e.stateNode.containerInfo
        ), Xt(t, e, n), Qt(e), Gn = i, Ce && Pu && (jc = !0), Ce = l, rl = a;
        break;
      case 12:
        Xt(t, e, n), Qt(e);
        break;
      case 31:
        Xt(t, e, n), Qt(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, kc(e, t)));
        break;
      case 13:
        Xt(t, e, n), Qt(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (Bc = Ht()), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, kc(e, t)));
        break;
      case 22:
        i = e.memoizedState !== null, s = l !== null && l.memoizedState !== null;
        var h = Tt, b = He, N = rl;
        Tt = h || i, rl = N || i, He = b || s, Xt(t, e, n), He = b, rl = N, Tt = h, Qt(e), a & 8192 && (t = e.stateNode, t._visibility = i ? t._visibility & -2 : t._visibility | 1, !i || l === null || s || Tt || He || (t = s || He, n = Tt, l = He, Tt = i || Tt, He = t, aa(e, 2), Tt = n, He = l), !i && rl || uf(e, i)), a & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, kc(e, n))));
        break;
      case 19:
        Xt(t, e, n), Qt(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, kc(e, t)));
        break;
      case 30:
        a & 512 && (He || l === null || jt(l, l.return)), a = Yr(), i = Pu, s = (n & 335544064) === n, h = e.memoizedProps, Pu = s && Sl(
          h.default,
          h.update
        ) !== "none", Xt(t, e, n), Qt(e), s && l !== null && Ce && (e.flags |= 4), Pu = i, Ce = a;
        break;
      case 21:
        break;
      case 7:
        a & 512 && (He || l === null || jt(l, l.return)), l && l.stateNode !== null && (l.stateNode._fragmentFiber = e);
      default:
        Xt(t, e, n), Qt(e);
    }
  }
  function Qt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, l = e.return; l !== null; ) {
          if (fp(l)) {
            n = l;
            break;
          }
          l = l.return;
        }
        l = null;
        for (var a = e.return; a !== null; ) {
          if (Ks(a)) {
            var i = a.stateNode;
            l === null ? l = [i] : l.push(i);
          }
          if (Zs(a)) break;
          a = a.return;
        }
        var s = l;
        if (n == null) throw Error(o(160));
        switch (n.tag) {
          case 27:
            var h = n.stateNode, b = Is(e);
            wc(
              e,
              b,
              h,
              s
            );
            break;
          case 5:
            var N = n.stateNode;
            n.flags & 32 && (ut(N, ""), n.flags &= -33);
            var M = Is(e);
            wc(
              e,
              M,
              N,
              s
            );
            break;
          case 3:
          case 4:
            var k = n.stateNode.containerInfo, _ = Is(e);
            Fs(
              e,
              _,
              k,
              s
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (D) {
        Ye(e, e.return, D);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Np(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Np(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, Fi = !0, t.reset(), Fi = !1), e = e.sibling;
      }
  }
  function ji(e, t) {
    if (t.subtreeFlags & 9270)
      for (t = t.child; t !== null; )
        Rp(t, e), t = t.sibling;
    else yp(t);
  }
  function Rp(e, t) {
    var n = e.alternate;
    if (n === null) Ps(e, !1);
    else
      switch (e.tag) {
        case 3:
          if (af = cl = !1, mp(), ji(t, e), !cl && !jc) {
            if (e = il, e !== null)
              for (var l = 0; l < e.length; l += 3) {
                n = e[l];
                var a = e[l + 1];
                pg(n, e[l + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate(
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
            )), af = !0;
          }
          il = null;
          break;
        case 5:
          ji(t, e);
          break;
        case 4:
          l = cl, cl = !1, ji(t, e), cl && (jc = !0), cl = l;
          break;
        case 22:
          e.memoizedState === null && (n.memoizedState !== null ? Ps(e, !1) : ji(t, e));
          break;
        case 30:
          l = cl, a = mp(), cl = !1, ji(t, e), cl && (e.flags |= 4);
          var i = e.memoizedProps, s = e.stateNode;
          t = bl(i, s), s = bl(n.memoizedProps, s);
          var h = Sl(i.default, i.update);
          h === "none" ? t = !1 : (i = n.memoizedState, n.memoizedState = null, n = e.child, Ft = 0, t = nf(
            e,
            n,
            t,
            s,
            h,
            i,
            !0
          ), Ft !== (i === null ? 0 : i.length) && (e.flags |= 32)), (e.flags & 4) !== 0 && t ? (Yi(
            e,
            e.memoizedProps.onUpdate
          ), il = a) : a !== null && (a.push.apply(a, il), il = a), cl = (e.flags & 32) !== 0 ? !0 : l;
          break;
        default:
          ji(t, e);
      }
  }
  function ol(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Sp(e, t.alternate, t), t = t.sibling;
  }
  function aa(e, t) {
    for (e = e.child; e !== null; ) {
      var n = e, l = t;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          la(4, n, n.return), aa(
            n,
            l
          );
          break;
        case 1:
          jt(n, n.return);
          var a = n.stateNode;
          typeof a.componentWillUnmount == "function" && op(
            n,
            n.return,
            a
          ), aa(
            n,
            l
          );
          break;
        case 27:
          (l & 2) !== 0 && Ng(
            n.stateNode,
            n.type,
            n.memoizedProps
          );
        case 5:
          jt(n, n.return), n.tag !== 5 && n.tag !== 27 || Fu(n), aa(
            n,
            l
          );
          break;
        case 6:
          Fu(n);
          break;
        case 26:
          jt(n, n.return), a = n.stateNode, n.memoizedState !== null || a === null || He || a.parentNode.removeChild(a), aa(
            n,
            l
          );
          break;
        case 22:
          n.memoizedState === null && aa(
            n,
            l
          );
          break;
        case 30:
          jt(n, n.return), aa(
            n,
            l
          );
          break;
        case 7:
          jt(n, n.return);
        default:
          aa(
            n,
            l
          );
      }
      e = e.sibling;
    }
  }
  function Yn(e, t, n) {
    for (n = (t.subtreeFlags & 8772) !== 0 ? n : n & -2, t = t.child; t !== null; ) {
      var l = t.alternate, a = e, i = t, s = i.flags, h = (n & 1) !== 0;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Yn(
            a,
            i,
            n
          ), Iu(4, i);
          break;
        case 1:
          if (Yn(
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
              var N = a.shared.hiddenCallbacks;
              if (N !== null)
                for (a.shared.hiddenCallbacks = null, a = 0; a < N.length; a++)
                  Ih(N[a], b);
            } catch (M) {
              Ye(l, l.return, M);
            }
          }
          h && s & 64 && cp(i), al(i, i.return);
          break;
        case 27:
          (n & 2) !== 0 && dp(i);
        case 5:
          i.tag !== 5 && i.tag !== 27 || sp(i), Yn(
            a,
            i,
            n
          ), h && l === null && s & 4 && Js(i), al(i, i.return);
          break;
        case 6:
          sp(i);
          break;
        case 26:
          b = i.stateNode, i.memoizedState !== null || b === null || Tt || Qf(
            rr(b.ownerDocument),
            i.type,
            b
          ), Yn(
            a,
            i,
            n
          ), h && l === null && s & 4 && Js(i), al(i, i.return);
          break;
        case 12:
          Yn(
            a,
            i,
            n
          );
          break;
        case 31:
          Yn(
            a,
            i,
            n
          ), h && s & 4 && _p(a, i);
          break;
        case 13:
          Yn(
            a,
            i,
            n
          ), h && s & 4 && Ap(a, i);
          break;
        case 22:
          i.memoizedState === null && Yn(
            a,
            i,
            n
          ), al(i, i.return);
          break;
        case 30:
          Yn(
            a,
            i,
            n
          ), al(i, i.return);
          break;
        case 7:
          al(i, i.return);
        default:
          Yn(
            a,
            i,
            n
          );
      }
      t = t.sibling;
    }
  }
  function cf(e, t) {
    var n = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Lu(n));
  }
  function of(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Lu(e));
  }
  function An(e, t, n, l) {
    var a = (n & 335544064) === n;
    if (t.subtreeFlags & (a ? 10262 : 10256))
      for (t = t.child; t !== null; )
        Cp(
          e,
          t,
          n,
          l
        ), t = t.sibling;
    else a && vp(t);
  }
  function Cp(e, t, n, l) {
    var a = (n & 335544064) === n;
    a && t.alternate === null && t.return !== null && t.return.alternate !== null && Mc(t);
    var i = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        An(
          e,
          t,
          n,
          l
        ), i & 2048 && Iu(9, t);
        break;
      case 1:
        An(
          e,
          t,
          n,
          l
        );
        break;
      case 3:
        An(
          e,
          t,
          n,
          l
        ), a && af && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), i & 2048 && (i = null, t.alternate !== null && (i = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== i && (t.refCount++, i != null && Lu(i)));
        break;
      case 12:
        if (i & 2048) {
          An(
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
          } catch (N) {
            Ye(t, t.return, N);
          }
        } else
          An(
            e,
            t,
            n,
            l
          );
        break;
      case 31:
        An(
          e,
          t,
          n,
          l
        );
        break;
      case 13:
        An(
          e,
          t,
          n,
          l
        );
        break;
      case 23:
        break;
      case 22:
        s = t.stateNode, h = t.alternate, t.memoizedState !== null ? (a && h !== null && h.memoizedState === null && Mc(h), s._visibility & 2 ? An(
          e,
          t,
          n,
          l
        ) : Wu(
          e,
          t
        )) : (a && h !== null && h.memoizedState !== null && Mc(t), s._visibility & 2 ? An(
          e,
          t,
          n,
          l
        ) : (s._visibility |= 2, Ui(
          e,
          t,
          n,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        ))), i & 2048 && cf(h, t);
        break;
      case 24:
        An(
          e,
          t,
          n,
          l
        ), i & 2048 && of(t.alternate, t);
        break;
      case 30:
        a && (i = t.alternate, i !== null && (ul(i.child, !0), ul(t.child, !0))), An(
          e,
          t,
          n,
          l
        );
        break;
      default:
        An(
          e,
          t,
          n,
          l
        );
    }
  }
  function Ui(e, t, n, l, a) {
    for (a = a && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var i = e, s = t, h = n, b = l, N = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          Ui(
            i,
            s,
            h,
            b,
            a
          ), Iu(8, s);
          break;
        case 23:
          break;
        case 22:
          var M = s.stateNode;
          s.memoizedState !== null ? M._visibility & 2 ? Ui(
            i,
            s,
            h,
            b,
            a
          ) : Wu(
            i,
            s
          ) : (M._visibility |= 2, Ui(
            i,
            s,
            h,
            b,
            a
          )), a && N & 2048 && cf(
            s.alternate,
            s
          );
          break;
        case 24:
          Ui(
            i,
            s,
            h,
            b,
            a
          ), a && N & 2048 && of(s.alternate, s);
          break;
        default:
          Ui(
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
  function Wu(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e, l = t, a = l.flags;
        switch (l.tag) {
          case 22:
            Wu(n, l), a & 2048 && cf(
              l.alternate,
              l
            );
            break;
          case 24:
            Wu(n, l), a & 2048 && of(l.alternate, l);
            break;
          default:
            Wu(n, l);
        }
        t = t.sibling;
      }
  }
  var $a = 8192;
  function Ia(e, t, n) {
    if (e.subtreeFlags & $a)
      for (e = e.child; e !== null; )
        wp(
          e,
          t,
          n
        ), e = e.sibling;
  }
  function wp(e, t, n) {
    switch (e.tag) {
      case 26:
        Ia(
          e,
          t,
          n
        ), e.flags & $a && (e.memoizedState !== null ? kS(
          n,
          Gn,
          e.memoizedState,
          e.memoizedProps
        ) : (e = e.stateNode, (t & 335544128) === t && Lg(n, e)));
        break;
      case 5:
        Ia(
          e,
          t,
          n
        ), e.flags & $a && (e = e.stateNode, (t & 335544128) === t && Lg(n, e));
        break;
      case 3:
      case 4:
        var l = Gn;
        Gn = rr(e.stateNode.containerInfo), Ia(
          e,
          t,
          n
        ), Gn = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = $a, $a = 16777216, Ia(
          e,
          t,
          n
        ), $a = l) : Ia(
          e,
          t,
          n
        ));
        break;
      case 30:
        if ((e.flags & $a) !== 0 && (l = e.memoizedProps.name, l != null && l !== "auto")) {
          var a = e.stateNode;
          a.paired = null, on === null && (on = /* @__PURE__ */ new Map()), on.set(l, a);
        }
        Ia(
          e,
          t,
          n
        );
        break;
      default:
        Ia(
          e,
          t,
          n
        );
    }
  }
  function zp(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function er(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          _t = l, Mp(
            l,
            e
          );
        }
      zp(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Dp(e), e = e.sibling;
  }
  function Dp(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        er(e), e.flags & 2048 && la(9, e, e.return);
        break;
      case 3:
        er(e);
        break;
      case 12:
        er(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Lc(e)) : er(e);
        break;
      default:
        er(e);
    }
  }
  function Lc(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          _t = l, Mp(
            l,
            e
          );
        }
      zp(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          la(8, t, t.return), Lc(t);
          break;
        case 22:
          n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Lc(t));
          break;
        default:
          Lc(t);
      }
      e = e.sibling;
    }
  }
  function Mp(e, t) {
    for (; _t !== null; ) {
      var n = _t;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          la(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var l = n.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Lu(n.memoizedState.cache);
      }
      if (l = n.child, l !== null) l.return = n, _t = l;
      else
        e: for (n = e; _t !== null; ) {
          l = _t;
          var a = l.sibling, i = l.return;
          if (Ep(l), l === n) {
            _t = null;
            break e;
          }
          if (a !== null) {
            a.return = i, _t = a;
            break e;
          }
          _t = i;
        }
    }
  }
  var z0 = {
    getCacheForType: function(e) {
      var t = zt(ht), n = t.data.get(e);
      return n === void 0 && (n = e(), t.data.set(e, n)), n;
    },
    cacheSignal: function() {
      return zt(ht).controller.signal;
    }
  }, D0 = typeof WeakMap == "function" ? WeakMap : Map, ke = 0, Ke = null, Ee = null, Oe = 0, Ge = 0, sn = null, ia = !1, ki = !1, sf = !1, Cl = 0, ct = 0, ua = 0, Fa = 0, Hc = 0, fn = 0, Li = 0, tr = null, Wt = null, ff = !1, Bc = 0, jp = 0, Gc = 1 / 0, Yc = null, ra = null, it = 0, qn = null, Pa = null, sl = 0, df = 0, hf = null, Up = null, Hi = null, Bi = null, Gi = null, nr = 0, qc = null;
  function dn() {
    return (ke & 2) !== 0 && Oe !== 0 ? Oe & -Oe : P.T !== null ? Tf() : Lr();
  }
  function kp() {
    if (fn === 0)
      if ((Oe & 536870912) === 0 || be) {
        var e = Na;
        Na <<= 1, (Na & 3932160) === 0 && (Na = 262144), fn = e;
      } else fn = 536870912;
    return e = Dt.current, e !== null && (e.flags |= 32), fn;
  }
  function Yi(e, t) {
    if (t != null) {
      var n = e.stateNode, l = n.ref;
      l === null && (l = n.ref = gg(
        bl(e.memoizedProps, n)
      )), Bi === null && (Bi = []), Bi.push(t.bind(null, l));
    }
  }
  function en(e, t, n) {
    (e === Ke && (Ge === 2 || Ge === 9) || e.cancelPendingCommit !== null) && (qi(e, 0), ca(
      e,
      Oe,
      fn,
      !1
    )), yn(e, n), ((ke & 2) === 0 || e !== Ke) && (e === Ke && ((ke & 2) === 0 && (Fa |= n), ct === 4 && ca(
      e,
      Oe,
      fn,
      !1
    )), fl(e));
  }
  function Lp(e, t, n) {
    if ((ke & 6) !== 0) throw Error(o(327));
    var l = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Ra(e, t), a = l ? U0(e, t) : pf(e, t, !0), i = l;
    do {
      if (a === 0) {
        ki && !l && ca(e, t, 0, !1);
        break;
      } else {
        if (n = e.current.alternate, i && !M0(n)) {
          a = pf(e, t, !1), i = !1;
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
              a = tr;
              var b = h.current.memoizedState.isDehydrated;
              if (b && (qi(h, s).flags |= 256), s = pf(
                h,
                s,
                !1
              ), s !== 2 && s !== 6) {
                if (sf && !b) {
                  h.errorRecoveryDisabledLanes |= i, Fa |= i, a = 4;
                  break e;
                }
                i = Wt, Wt = a, i !== null && (Wt === null ? Wt = i : Wt.push.apply(
                  Wt,
                  i
                ));
              }
              a = s;
            }
            if (i = !1, a !== 2) continue;
          }
        }
        if (a === 1) {
          qi(e, 0), ca(e, t, 0, !0);
          break;
        }
        e: {
          switch (l = e, i = a, i) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t && (t & 62914560) !== t)
                break;
            case 6:
              ca(
                l,
                t,
                fn,
                !ia
              );
              break e;
            case 2:
              Wt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && (a = Bc + 300 - Ht(), 10 < a)) {
            if (ca(
              l,
              t,
              fn,
              !ia
            ), ql(l, 0, !0) !== 0) break e;
            sl = t, l.timeoutHandle = jf(
              Hp.bind(
                null,
                l,
                n,
                Wt,
                Yc,
                ff,
                t,
                fn,
                Fa,
                Li,
                ia,
                i,
                "Throttled",
                -0,
                0
              ),
              a
            );
            break e;
          }
          Hp(
            l,
            n,
            Wt,
            Yc,
            ff,
            t,
            fn,
            Fa,
            Li,
            ia,
            i,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    fl(e);
  }
  function Hp(e, t, n, l, a, i, s, h, b, N, M, k, _, D) {
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
      unsuspend: tl
    }, on = null, wp(
      t,
      i,
      k
    ), F && (X = k, F = e.containerInfo, F = (F.nodeType === 9 ? F : F.ownerDocument).__reactViewTransition, F != null && (X.count++, X.waitingForViewTransition = !0, X = sr.bind(X), F.finished.then(X, X))), X = (i & 62914560) === i ? Bc - Ht() : (i & 4194048) === i ? jp - Ht() : 0, X = LS(
      k,
      X
    ), X !== null)) {
      sl = i, e.cancelPendingCommit = X(
        Zp.bind(
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
          N,
          M,
          k,
          null,
          _,
          D
        )
      ), ca(e, i, s, !N);
      return;
    }
    Zp(
      e,
      t,
      i,
      n,
      l,
      a,
      s,
      h,
      b,
      N,
      M,
      k
    );
  }
  function M0(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var l = 0; l < n.length; l++) {
          var a = n[l], i = a.getSnapshot;
          a = a.value;
          try {
            if (!rn(i(), a)) return !1;
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
  function ca(e, t, n, l) {
    t = Vl(e, t), t &= ~Hc, t &= ~Fa, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var a = t; 0 < a; ) {
      var i = 31 - nt(a), s = 1 << i;
      l[i] = -1, a &= ~s;
    }
    n !== 0 && Su(e, n, t);
  }
  function Vc() {
    return (ke & 6) === 0 ? (lr(0), !1) : !0;
  }
  function mf() {
    if (Ee !== null) {
      if (Ge === 0)
        var e = Ee.return;
      else
        e = Ee, Tl = Ba = null, xs(e), Ri = null, Gu = 0, e = Ee;
      for (; e !== null; )
        rp(e.alternate, e), e = e.return;
      Ee = null;
    }
  }
  function qi(e, t) {
    var n = e.timeoutHandle;
    return n !== -1 && (e.timeoutHandle = -1, lS(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), sl = 0, mf(), Ke = e, Ee = n = xl(e.current, null), Oe = t, Ge = 0, sn = null, ia = !1, ki = Ra(e, t), sf = !1, Li = fn = Hc = Fa = ua = ct = 0, Wt = tr = null, ff = !1, Cl = Vl(e, t), Fr(), n;
  }
  function Bp(e, t) {
    pe = null, P.H = Ec, t === Ni || t === cc ? (t = Zh(), Ge = 3) : t === cs ? (t = Zh(), Ge = 4) : Ge = t === ks ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, sn = t, Ee === null && (ct = 1, Tc(
      e,
      xn(t, e.current)
    ));
  }
  function Gp() {
    var e = Dt.current;
    return e === null ? !0 : (Oe & 4194048) === Oe ? Bt === null : (Oe & 62914560) === Oe || (Oe & 536870912) !== 0 ? e === Bt : !1;
  }
  function Yp() {
    var e = P.H;
    return P.H = Ec, e === null ? Ec : e;
  }
  function qp() {
    var e = P.A;
    return P.A = z0, e;
  }
  function Xc() {
    ct = 4, ia || (Oe & 4194048) !== Oe && Dt.current !== null || (ki = !0), (ua & 134217727) === 0 && (Fa & 134217727) === 0 || Ke === null || ca(
      Ke,
      Oe,
      fn,
      !1
    );
  }
  function pf(e, t, n) {
    var l = ke;
    ke |= 2;
    var a = Yp(), i = qp();
    (Ke !== e || Oe !== t) && (Yc = null, qi(e, t)), t = !1;
    var s = ct;
    e: do
      try {
        if (Ge !== 0 && Ee !== null) {
          var h = Ee, b = sn;
          switch (Ge) {
            case 8:
              mf(), s = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Dt.current === null && (t = !0);
              var N = Ge;
              if (Ge = 0, sn = null, Vi(e, h, b, N), n && ki) {
                s = 0;
                break e;
              }
              break;
            default:
              N = Ge, Ge = 0, sn = null, Vi(e, h, b, N);
          }
        }
        j0(), s = ct;
        break;
      } catch (M) {
        Bp(e, M);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Tl = Ba = null, ke = l, P.H = a, P.A = i, Ee === null && (Ke = null, Oe = 0, Fr()), s;
  }
  function j0() {
    for (; Ee !== null; ) Vp(Ee);
  }
  function U0(e, t) {
    var n = ke;
    ke |= 2;
    var l = Yp(), a = qp();
    Ke !== e || Oe !== t ? (Yc = null, Gc = Ht() + 500, qi(e, t)) : ki = Ra(
      e,
      t
    );
    e: do
      try {
        if (Ge !== 0 && Ee !== null) {
          t = Ee;
          var i = sn;
          t: switch (Ge) {
            case 1:
              Ge = 0, sn = null, Vi(e, t, i, 1);
              break;
            case 2:
            case 9:
              if (Xh(i)) {
                Ge = 0, sn = null, Xp(t);
                break;
              }
              t = function() {
                Ge !== 2 && Ge !== 9 || Ke !== e || (Ge = 7), fl(e);
              }, i.then(t, t);
              break e;
            case 3:
              Ge = 7;
              break e;
            case 4:
              Ge = 5;
              break e;
            case 7:
              Xh(i) ? (Ge = 0, sn = null, Xp(t)) : (Ge = 0, sn = null, Vi(e, t, i, 7));
              break;
            case 5:
              var s = null;
              switch (Ee.tag) {
                case 26:
                  s = Ee.memoizedState;
                case 5:
                case 27:
                  var h = Ee;
                  if (s ? Ug(s) : h.stateNode.complete) {
                    Ge = 0, sn = null;
                    var b = h.sibling;
                    if (b !== null) Ee = b;
                    else {
                      var N = h.return;
                      N !== null ? (Ee = N, Qc(N)) : Ee = null;
                    }
                    break t;
                  }
              }
              Ge = 0, sn = null, Vi(e, t, i, 5);
              break;
            case 6:
              Ge = 0, sn = null, Vi(e, t, i, 6);
              break;
            case 8:
              mf(), ct = 6;
              break e;
            default:
              throw Error(o(462));
          }
        }
        k0();
        break;
      } catch (M) {
        Bp(e, M);
      }
    while (!0);
    return Tl = Ba = null, P.H = l, P.A = a, ke = n, Ee !== null ? 0 : (Ke = null, Oe = 0, Fr(), ct);
  }
  function k0() {
    for (; Ee !== null && !zr(); )
      Vp(Ee);
  }
  function Vp(e) {
    var t = ip(e.alternate, e, Cl);
    e.memoizedProps = e.pendingProps, t === null ? Qc(e) : Ee = t;
  }
  function Xp(e) {
    var t = e, n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Pm(
          n,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Oe
        );
        break;
      case 11:
        t = Pm(
          n,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Oe
        );
        break;
      case 5:
        xs(t);
        var l = t;
        l === Et && (be ? (lc(l), l.tag === 5 && l.stateNode != null && (Ie = l.stateNode)) : (lc(l), be = !0));
      default:
        rp(n, t), t = Ee = Mh(t, Cl), t = ip(n, t, Cl);
    }
    e.memoizedProps = e.pendingProps, t === null ? Qc(e) : Ee = t;
  }
  function Vi(e, t, n, l) {
    Tl = Ba = null, xs(t), Ri = null, Gu = 0;
    var a = t.return;
    try {
      if (T0(
        e,
        a,
        t,
        n,
        Oe
      )) {
        ct = 1, Tc(
          e,
          xn(n, e.current)
        ), Ee = null;
        return;
      }
    } catch (i) {
      if (a !== null) throw Ee = a, i;
      ct = 1, Tc(
        e,
        xn(n, e.current)
      ), Ee = null;
      return;
    }
    t.flags & 32768 ? (be || l === 1 ? e = !0 : ki || (Oe & 536870912) !== 0 ? e = !1 : (ia = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = Dt.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Qp(t, e)) : Qc(t);
  }
  function Qc(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Qp(
          t,
          ia
        );
        return;
      }
      e = t.return;
      var n = N0(
        t.alternate,
        t,
        Cl
      );
      if (n !== null) {
        Ee = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        Ee = t;
        return;
      }
      Ee = t = e;
    } while (t !== null);
    ct === 0 && (ct = 5);
  }
  function Qp(e, t) {
    do {
      var n = R0(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, Ee = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        Ee = e;
        return;
      }
      Ee = e = n;
    } while (e !== null);
    ct = 6, Ee = null;
  }
  function Zp(e, t, n, l, a, i, s, h, b, N, M, k) {
    e.cancelPendingCommit = null;
    do
      Zc();
    while (it !== 0);
    if ((ke & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      e === Ke && (Ee = Ke = null, Oe = 0), Pa = t, qn = e, sl = n, hf = a, Up = l, L0(
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
  function L0(e, t, n, l, a, i, s) {
    var h = t.lanes | t.childLanes;
    if (df = h, h |= $o, Oo(
      e,
      n,
      h,
      l,
      a,
      i
    ), Bi = null, (n & 335544064) === n ? (Gi = f0(e), l = 10262) : (Gi = null, l = 10256), (t.subtreeFlags & l) !== 0 || (t.flags & l) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, V0(Un, function() {
      return bf(), null;
    })) : (e.callbackNode = null, e.callbackPriority = 0), zc = !1, l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
      l = P.T, P.T = null, a = fe.p, fe.p = 2, i = ke, ke |= 4;
      try {
        C0(e, t, n);
      } finally {
        ke = i, fe.p = a, P.T = l;
      }
    }
    it = 1, zc ? Hi = oS(
      s,
      e.containerInfo,
      Gi,
      gf,
      vf,
      B0,
      yf,
      bf,
      H0
    ) : (gf(), vf(), yf());
  }
  function H0(e) {
    if (it !== 0) {
      var t = qn.onRecoverableError;
      t(e, { componentStack: null });
    }
  }
  function B0() {
    it === 3 && (it = 0, Rp(Pa, qn), it = 4);
  }
  function gf() {
    if (it === 1) {
      it = 0;
      var e = qn, t = Pa, n = sl, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = P.T, P.T = null;
        var a = fe.p;
        fe.p = 2;
        var i = ke;
        ke |= 4;
        try {
          Pu = jc = !1, Op(t, e, n), n = zf;
          var s = Th(e.containerInfo), h = n.focusedElem, b = n.selectionRange;
          if (s !== h && h && h.ownerDocument && Eh(
            h.ownerDocument.documentElement,
            h
          )) {
            if (b !== null && Xo(h)) {
              var N = b.start, M = b.end;
              if (M === void 0 && (M = N), "selectionStart" in h)
                h.selectionStart = N, h.selectionEnd = Math.min(
                  M,
                  h.value.length
                );
              else {
                var k = h.ownerDocument || document, _ = k && k.defaultView || window;
                if (_.getSelection) {
                  var D = _.getSelection(), X = h.textContent.length, F = Math.min(b.start, X), ge = b.end === void 0 ? F : Math.min(b.end, X);
                  !D.extend && F > ge && (s = ge, ge = F, F = s);
                  var O = xh(
                    h,
                    F
                  ), x = xh(
                    h,
                    ge
                  );
                  if (O && x && (D.rangeCount !== 1 || D.anchorNode !== O.node || D.anchorOffset !== O.offset || D.focusNode !== x.node || D.focusOffset !== x.offset)) {
                    var w = k.createRange();
                    w.setStart(O.node, O.offset), D.removeAllRanges(), F > ge ? (D.addRange(w), D.extend(x.node, x.offset)) : (w.setEnd(x.node, x.offset), D.addRange(w));
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
          Fi = !!wf, zf = wf = null;
        } finally {
          ke = i, fe.p = a, P.T = l;
        }
      }
      e.current = t, it = 2;
    }
  }
  function vf() {
    if (it === 2) {
      it = 0;
      var e = qn, t = Pa, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = P.T, P.T = null;
        var l = fe.p;
        fe.p = 2;
        var a = ke;
        ke |= 4;
        try {
          Sp(e, t.alternate, t);
        } finally {
          ke = a, fe.p = l, P.T = n;
        }
      }
      it = 3;
    }
  }
  function yf() {
    if (it === 4 || it === 3) {
      it = 0;
      var e = Hi;
      Hi = null, Dr();
      var t = qn, n = Pa, l = sl, a = Up, i = (l & 335544064) === l ? 10262 : 10256;
      if ((n.subtreeFlags & i) !== 0 || (n.flags & i) !== 0 ? it = 5 : (it = 0, Pa = qn = null, Kp(t, t.pendingLanes)), i = t.pendingLanes, i === 0 && (ra = null), Eu(l), n = n.stateNode, xt && typeof xt.onCommitFiberRoot == "function")
        try {
          xt.onCommitFiberRoot(
            Bl,
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
      if (a = Bi, s = Gi, Gi = null, a !== null && (Bi = null, s === null && (s = []), e !== null))
        for (b = 0; b < a.length; b++)
          n = (0, a[b])(
            s
          ), n !== void 0 && e.finished.finally(n);
      (sl & 3) !== 0 && Zc(), fl(t), i = t.pendingLanes, (l & 261930) !== 0 && (i & 42) !== 0 ? t === qc ? nr++ : (nr = 0, qc = t) : (nr = 0, qc = null), lr(0);
    }
  }
  function Kp(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Lu(t)));
  }
  function Zc() {
    return Hi !== null && (Hi.skipTransition(), Hi = null), gf(), vf(), yf(), bf();
  }
  function bf() {
    if (it !== 5) return !1;
    var e = qn, t = df;
    df = 0;
    var n = Eu(sl), l = P.T, a = fe.p;
    try {
      fe.p = 32 > n ? 32 : n, P.T = null, n = hf, hf = null;
      var i = qn, s = sl;
      if (it = 0, Pa = qn = null, sl = 0, (ke & 6) !== 0) throw Error(o(331));
      var h = ke;
      if (ke |= 4, Dp(i.current), Cp(
        i,
        i.current,
        s,
        n
      ), ke = h, lr(0, !1), xt && typeof xt.onPostCommitFiberRoot == "function")
        try {
          xt.onPostCommitFiberRoot(Bl, i);
        } catch {
        }
      return !0;
    } finally {
      fe.p = a, P.T = l, Kp(e, t);
    }
  }
  function Jp(e, t, n) {
    t = xn(n, t), t = Us(e.stateNode, t, 2), e = Wl(e, t, 2), e !== null && (yn(e, 2), fl(e));
  }
  function Ye(e, t, n) {
    if (e.tag === 3)
      Jp(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Jp(
            t,
            e,
            n
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (ra === null || !ra.has(l))) {
            e = xn(n, e), n = Xm(2), l = Wl(t, n, 2), l !== null && (Qm(
              n,
              l,
              t,
              e
            ), yn(l, 2), fl(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function Sf(e, t, n) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new D0();
      var a = /* @__PURE__ */ new Set();
      l.set(t, a);
    } else
      a = l.get(t), a === void 0 && (a = /* @__PURE__ */ new Set(), l.set(t, a));
    a.has(n) || (sf = !0, a.add(n), e = G0.bind(null, e, t, n), t.then(e, e));
  }
  function G0(e, t, n) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Ke === e && (Oe & n) === n && ((ct === 4 || ct === 3 && (Oe & 62914560) === Oe && 300 > Ht() - Bc) && (ke & 2) === 0 ? qi(e, 0) : Hc |= n, Li === Oe && (Li = 0)), fl(e);
  }
  function $p(e, t) {
    t === 0 && (t = kr()), e = ka(e, t), e !== null && (yn(e, t), fl(e));
  }
  function Y0(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), $p(e, n);
  }
  function q0(e, t) {
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
        throw Error(o(314));
    }
    l !== null && l.delete(t), $p(e, n);
  }
  function V0(e, t) {
    return Ll(e, t);
  }
  var Xi = null, Qi = null, xf = !1, Kc = !1, Ef = !1, oa = 0;
  function fl(e) {
    e !== Qi && e.next === null && (Qi === null ? Xi = Qi = e : Qi = Qi.next = e), Kc = !0, xf || (xf = !0, Q0());
  }
  function lr(e, t) {
    if (!Ef && Kc) {
      Ef = !0;
      do
        for (var n = !1, l = Xi; l !== null; ) {
          if (e !== 0) {
            var a = l.pendingLanes;
            if (a === 0) var i = 0;
            else {
              var s = l.suspendedLanes, h = l.pingedLanes;
              i = (1 << 31 - nt(42 | e) + 1) - 1, i &= a & ~(s & ~h), i = i & 201326741 ? i & 201326741 | 1 : i ? i | 2 : 0;
            }
            i !== 0 && (n = !0, Wp(l, i));
          } else
            i = Oe, i = ql(
              l,
              l === Ke ? i : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (i & 3) === 0 || Ra(l, i) || (n = !0, Wp(l, i));
          l = l.next;
        }
      while (n);
      Ef = !1;
    }
  }
  function X0() {
    Ip();
  }
  function Ip() {
    Kc = xf = !1;
    var e = 0;
    oa !== 0 && nS() && (e = oa);
    for (var t = Ht(), n = null, l = Xi; l !== null; ) {
      var a = l.next, i = Fp(l, t);
      i === 0 ? (l.next = null, n === null ? Xi = a : n.next = a, a === null && (Qi = n)) : (n = l, (e !== 0 || (i & 3) !== 0) && (Kc = !0)), l = a;
    }
    it !== 0 && it !== 5 || lr(e), oa !== 0 && (oa = 0);
  }
  function Fp(e, t) {
    for (var n = e.suspendedLanes, l = e.pingedLanes, a = e.expirationTimes, i = e.pendingLanes & -62914561; 0 < i; ) {
      var s = 31 - nt(i), h = 1 << s, b = a[s];
      b === -1 ? ((h & n) === 0 || (h & l) !== 0) && (a[s] = Ao(h, t)) : b <= t && (e.expiredLanes |= h), i &= ~h;
    }
    if (t = Ke, n = Oe, n = ql(
      e,
      e === t ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, n === 0 || e === t && (Ge === 2 || Ge === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && Hl(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((n & 3) === 0 || Ra(e, n)) {
      if (t = n & -n, t === e.callbackPriority) return t;
      switch (l !== null && Hl(l), Eu(n)) {
        case 2:
        case 8:
          n = pl;
          break;
        case 32:
          n = Un;
          break;
        case 268435456:
          n = vu;
          break;
        default:
          n = Un;
      }
      return l = Pp.bind(null, e), n = Ll(n, l), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return l !== null && l !== null && Hl(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Pp(e, t) {
    if (it !== 0 && it !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if (Zc() && e.callbackNode !== n)
      return null;
    var l = Oe;
    return l = ql(
      e,
      e === Ke ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (Lp(e, l, t), Fp(e, Ht()), e.callbackNode != null && e.callbackNode === n ? Pp.bind(null, e) : null);
  }
  function Wp(e, t) {
    if (Zc()) return null;
    Lp(e, t, !0);
  }
  function Q0() {
    aS(function() {
      (ke & 6) !== 0 ? Ll(
        oi,
        X0
      ) : Ip();
    });
  }
  function Tf() {
    if (oa === 0) {
      var e = qa;
      e === 0 && (e = si, si <<= 1, (si & 261888) === 0 && (si = 256)), oa = e;
    }
    return oa;
  }
  function eg(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Vr(e);
  }
  function Z0(e, t, n, l, a) {
    if (t === "submit" && n && n.stateNode === a) {
      var i = eg(
        (a[Rt] || null).action
      ), s = l.submitter;
      s && (t = (t = s[Rt] || null) ? eg(t.formAction) : s.getAttribute("formAction"), t !== null && (i = t, s = null));
      var h = new Kr(
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
                if (oa !== 0) {
                  var b = new FormData(a, s);
                  ws(
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
                typeof i == "function" && (h.preventDefault(), b = new FormData(a, s), ws(
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
  for (var _f = 0; _f < Jo.length; _f++) {
    var Af = Jo[_f], K0 = Af.toLowerCase(), J0 = Af[0].toUpperCase() + Af.slice(1);
    Hn(
      K0,
      "on" + J0
    );
  }
  Hn(Oh, "onAnimationEnd"), Hn(Nh, "onAnimationIteration"), Hn(Rh, "onAnimationStart"), Hn("dblclick", "onDoubleClick"), Hn("focusin", "onFocus"), Hn("focusout", "onBlur"), Hn(l0, "onTransitionRun"), Hn(a0, "onTransitionStart"), Hn(i0, "onTransitionCancel"), Hn(Ch, "onTransitionEnd"), vl("onMouseEnter", ["mouseout", "mouseover"]), vl("onMouseLeave", ["mouseout", "mouseover"]), vl("onPointerEnter", ["pointerout", "pointerover"]), vl("onPointerLeave", ["pointerout", "pointerover"]), gl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), gl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), gl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), gl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), gl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), gl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var ar = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), $0 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ar)
  );
  function tg(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var l = e[n], a = l.event;
      l = l.listeners;
      e: {
        var i = void 0;
        if (t)
          for (var s = l.length - 1; 0 <= s; s--) {
            var h = l[s], b = h.instance, N = h.currentTarget;
            if (h = h.listener, b !== i && a.isPropagationStopped())
              break e;
            i = h, a.currentTarget = N;
            try {
              i(a);
            } catch (M) {
              Ir(M);
            }
            a.currentTarget = null, i = b;
          }
        else
          for (s = 0; s < l.length; s++) {
            if (h = l[s], b = h.instance, N = h.currentTarget, h = h.listener, b !== i && a.isPropagationStopped())
              break e;
            i = h, a.currentTarget = N;
            try {
              i(a);
            } catch (M) {
              Ir(M);
            }
            a.currentTarget = null, i = b;
          }
      }
    }
  }
  function Te(e, t) {
    var n = t[Pn];
    n === void 0 && (n = t[Pn] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    n.has(l) || (ng(t, e, 2, !1), n.add(l));
  }
  function Of(e, t, n) {
    var l = 0;
    t && (l |= 4), ng(
      n,
      e,
      l,
      t
    );
  }
  var Jc = "_reactListening" + Math.random().toString(36).slice(2);
  function Nf(e) {
    if (!e[Jc]) {
      e[Jc] = !0, Br.forEach(function(n) {
        n !== "selectionchange" && ($0.has(n) || Of(n, !1, e), Of(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Jc] || (t[Jc] = !0, Of("selectionchange", !1, t));
    }
  }
  function ng(e, t, n, l) {
    switch (Qg(t)) {
      case 2:
        var a = YS;
        break;
      case 8:
        a = qS;
        break;
      default:
        a = Kf;
    }
    n = a.bind(
      null,
      t,
      n,
      e
    ), a = void 0, !jo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (a = !0), l ? a !== void 0 ? e.addEventListener(t, n, {
      capture: !0,
      passive: a
    }) : e.addEventListener(t, n, !0) : a !== void 0 ? e.addEventListener(t, n, {
      passive: a
    }) : e.addEventListener(t, n, !1);
  }
  function Rf(e, t, n, l, a) {
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
            if (s = bn(h), s === null) return;
            if (b = s.tag, b === 5 || b === 6 || b === 26 || b === 27) {
              l = i = s;
              continue e;
            }
            h = h.parentNode;
          }
        }
        l = l.return;
      }
    nh(function() {
      var N = i, M = Do(n), k = [];
      e: {
        var _ = wh.get(e);
        if (_ !== void 0) {
          var D = Kr, X = e;
          switch (e) {
            case "keypress":
              if (Qr(n) === 0) break e;
            case "keydown":
            case "keyup":
              D = Mb;
              break;
            case "focusin":
              X = "focus", D = Ho;
              break;
            case "focusout":
              X = "blur", D = Ho;
              break;
            case "beforeblur":
            case "afterblur":
              D = Ho;
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
              D = ih;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              D = xb;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              D = Hb;
              break;
            case Oh:
            case Nh:
            case Rh:
              D = _b;
              break;
            case Ch:
              D = Gb;
              break;
            case "scroll":
            case "scrollend":
              D = bb;
              break;
            case "wheel":
              D = qb;
              break;
            case "copy":
            case "cut":
            case "paste":
              D = Ob;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              D = rh;
              break;
            case "submit":
              D = kb;
              break;
            case "toggle":
            case "beforetoggle":
              D = Xb;
          }
          var F = (t & 4) !== 0, ge = !F && (e === "scroll" || e === "scrollend"), O = F ? _ !== null ? _ + "Capture" : null : _;
          F = [];
          for (var x = N, w; x !== null; ) {
            var U = x;
            if (w = U.stateNode, U = U.tag, U !== 5 && U !== 26 && U !== 27 || w === null || O === null || (U = Ou(x, O), U != null && F.push(
              ir(x, U, w)
            )), ge) break;
            x = x.return;
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
          if (D = e === "mouseover" || e === "pointerover", _ = e === "mouseout" || e === "pointerout", D && n !== zo && (X = n.relatedTarget || n.fromElement) && (bn(X) || X[Ln]))
            break e;
          (_ || D) && (X = M.window === M ? M : (D = M.ownerDocument) ? D.defaultView || D.parentWindow : window, _ ? (D = n.relatedTarget || n.toElement, _ = N, D = D ? bn(D) : null, D !== null && (ge = d(D), F = D.tag, D !== ge || F !== 5 && F !== 27 && F !== 6) && (D = null)) : (_ = null, D = N), _ !== D && (F = ih, U = "onMouseLeave", O = "onMouseEnter", x = "mouse", (e === "pointerout" || e === "pointerover") && (F = rh, U = "onPointerLeave", O = "onPointerEnter", x = "pointer"), ge = _ == null ? X : el(_), w = D == null ? X : el(D), X = new F(
            U,
            x + "leave",
            _,
            n,
            M
          ), X.target = ge, X.relatedTarget = w, U = null, bn(M) === N && (F = new F(
            O,
            x + "enter",
            D,
            n,
            M
          ), F.target = w, F.relatedTarget = ge, U = F), ge = U, F = _ && D ? se(
            _,
            D,
            I0
          ) : null, _ !== null && lg(
            k,
            X,
            _,
            F,
            !1
          ), D !== null && ge !== null && lg(
            k,
            ge,
            D,
            F,
            !0
          )));
        }
        e: {
          if (_ = N ? el(N) : window, D = _.nodeName && _.nodeName.toLowerCase(), D === "select" || D === "input" && _.type === "file")
            var $ = ph;
          else if (hh(_))
            if (gh)
              $ = e0;
            else {
              $ = Pb;
              var Ne = Fb;
            }
          else
            D = _.nodeName, !D || D.toLowerCase() !== "input" || _.type !== "checkbox" && _.type !== "radio" ? N && wo(N.elementType) && ($ = ph) : $ = Wb;
          if ($ && ($ = $(e, N))) {
            mh(
              k,
              $,
              n,
              M
            );
            break e;
          }
          Ne && Ne(e, _, N);
        }
        switch (Ne = N ? el(N) : window, e) {
          case "focusin":
            (hh(Ne) || Ne.contentEditable === "true") && (bi = Ne, Qo = N, ju = null);
            break;
          case "focusout":
            ju = Qo = bi = null;
            break;
          case "mousedown":
            Zo = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Zo = !1, _h(k, n, M);
            break;
          case "selectionchange":
            if (n0) break;
          case "keydown":
          case "keyup":
            _h(k, n, M);
        }
        var le;
        if (Go)
          e: {
            switch (e) {
              case "compositionstart":
                var oe = "onCompositionStart";
                break e;
              case "compositionend":
                oe = "onCompositionEnd";
                break e;
              case "compositionupdate":
                oe = "onCompositionUpdate";
                break e;
            }
            oe = void 0;
          }
        else
          yi ? fh(e, n) && (oe = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (oe = "onCompositionStart");
        oe && (ch && n.locale !== "ko" && (yi || oe !== "onCompositionStart" ? oe === "onCompositionEnd" && yi && (le = lh()) : (Xl = M, Uo = "value" in Xl ? Xl.value : Xl.textContent, yi = !0)), Ne = $c(N, oe), 0 < Ne.length && (oe = new uh(
          oe,
          e,
          null,
          n,
          M
        ), k.push({ event: oe, listeners: Ne }), le ? oe.data = le : (le = dh(n), le !== null && (oe.data = le)))), (le = Zb ? Kb(e, n) : Jb(e, n)) && (oe = $c(N, "onBeforeInput"), 0 < oe.length && (Ne = new uh(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          M
        ), k.push({
          event: Ne,
          listeners: oe
        }), Ne.data = le)), Z0(
          k,
          e,
          N,
          n,
          M
        );
      }
      tg(k, t);
    });
  }
  function ir(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function $c(e, t) {
    for (var n = t + "Capture", l = []; e !== null; ) {
      var a = e, i = a.stateNode;
      if (a = a.tag, a !== 5 && a !== 26 && a !== 27 || i === null || (a = Ou(e, n), a != null && l.unshift(
        ir(e, a, i)
      ), a = Ou(e, t), a != null && l.push(
        ir(e, a, i)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function I0(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function lg(e, t, n, l, a) {
    for (var i = t._reactName, s = []; n !== null && n !== l; ) {
      var h = n, b = h.alternate, N = h.stateNode;
      if (h = h.tag, b !== null && b === l) break;
      h !== 5 && h !== 26 && h !== 27 || N === null || (b = N, a ? (N = Ou(n, i), N != null && s.unshift(
        ir(n, N, b)
      )) : a || (N = Ou(n, i), N != null && s.push(
        ir(n, N, b)
      ))), n = n.return;
    }
    s.length !== 0 && e.push({ event: t, listeners: s });
  }
  var F0 = /\r\n?/g, P0 = /\u0000|\uFFFD/g;
  function ag(e) {
    return (typeof e == "string" ? e : "" + e).replace(F0, `
`).replace(P0, "");
  }
  function ig(e, t) {
    return t = ag(t), ag(e) === t;
  }
  function qe(e, t, n, l, a, i) {
    switch (n) {
      case "children":
        if (typeof l == "string")
          t === "body" || t === "textarea" && l === "" || ut(e, l);
        else if (typeof l == "number" || typeof l == "bigint")
          t !== "body" && ut(e, "" + l);
        else return;
        break;
      case "className":
        Ma(e, "class", l);
        break;
      case "tabIndex":
        Ma(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ma(e, n, l);
        break;
      case "style":
        eh(e, l, i);
        return;
      case "data":
        if (t !== "object") {
          Ma(e, "data", l);
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
        l = Vr(l), e.setAttribute(n, l);
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
        l = Vr(l), e.setAttribute(n, l);
        break;
      case "onClick":
        l != null && (e.onclick = tl);
        return;
      case "onScroll":
        l != null && Te("scroll", e);
        return;
      case "onScrollEnd":
        l != null && Te("scrollend", e);
        return;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(o(61));
          if (n = l.__html, n != null) {
            if (a.children != null) throw Error(o(60));
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
        n = Vr(l), e.setAttributeNS(
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
        Te("beforetoggle", e), Te("toggle", e), mi(e, "popover", l);
        break;
      case "xlinkActuate":
        $t(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        $t(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        $t(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        $t(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        $t(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        $t(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        $t(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        $t(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        $t(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        mi(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N")
          n = vb.get(n) || n, mi(e, n, l);
        else return;
    }
    Ce = !0;
  }
  function Cf(e, t, n, l, a, i) {
    switch (n) {
      case "style":
        eh(e, l, i);
        return;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(o(61));
          if (n = l.__html, n != null) {
            if (a.children != null) throw Error(o(60));
            i?.__html !== n && (e.innerHTML = n);
          }
        }
        break;
      case "children":
        if (typeof l == "string") ut(e, l);
        else if (typeof l == "number" || typeof l == "bigint")
          ut(e, "" + l);
        else return;
        break;
      case "onScroll":
        l != null && Te("scroll", e);
        return;
      case "onScrollEnd":
        l != null && Te("scrollend", e);
        return;
      case "onClick":
        l != null && (e.onclick = tl);
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
        if (!Da.hasOwnProperty(n))
          e: {
            if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), i = n.slice(2, a ? n.length - 7 : void 0), t = e[Rt] || null, t = t != null ? t[n] : null, typeof t == "function" && e.removeEventListener(i, t, a), typeof l == "function")) {
              typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(i, l, a);
              break e;
            }
            Ce = !0, n in e ? e[n] = l : l === !0 ? e.setAttribute(n, "") : mi(e, n, l);
          }
        return;
    }
    Ce = !0;
  }
  function Ut(e, t, n) {
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
        Te("error", e), Te("load", e);
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
                  throw Error(o(137, t));
                default:
                  qe(e, t, i, s, n, null);
              }
          }
        a && qe(e, t, "srcSet", n.srcSet, n, null), l && qe(e, t, "src", n.src, n, null);
        return;
      case "input":
        Te("invalid", e);
        var h = i = s = a = null, b = null, N = null;
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
                  N = M;
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
                    throw Error(o(137, t));
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
          N,
          s,
          a,
          !1
        );
        return;
      case "select":
        Te("invalid", e), l = s = i = null;
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
        t = i, n = s, e.multiple = !!l, t != null ? ft(e, !!l, t, !1) : n != null && ft(e, !!l, n, !0);
        return;
      case "textarea":
        Te("invalid", e), i = a = l = null;
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
                if (h != null) throw Error(o(91));
                break;
              default:
                qe(e, t, s, h, n, null);
            }
        pi(e, l, a, i);
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
        Te("beforetoggle", e), Te("toggle", e), Te("cancel", e), Te("close", e);
        break;
      case "iframe":
      case "object":
        Te("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < ar.length; l++)
          Te(ar[l], e);
        break;
      case "image":
        Te("error", e), Te("load", e);
        break;
      case "details":
        Te("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Te("error", e), Te("load", e);
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
        for (N in n)
          if (n.hasOwnProperty(N) && (l = n[N], l != null))
            switch (N) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, t));
              default:
                qe(e, t, N, l, n, null);
            }
        return;
      default:
        if (wo(t)) {
          for (M in n)
            n.hasOwnProperty(M) && (l = n[M], l !== void 0 && Cf(
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
  var W0 = {};
  function eS(e, t, n, l) {
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
        var a = null, i = null, s = null, h = null, b = null, N = null, M = null;
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
                D !== k && (Ce = !0), N = D;
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
                  throw Error(o(137, t));
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
        ce(
          e,
          s,
          h,
          b,
          N,
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
        t = h, n = s, l = D, _ != null ? ft(e, !!n, _, !1) : !!l != !!n && (t != null ? ft(e, !!n, t, !0) : ft(e, !!n, n ? [] : "", !1));
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
                if (a != null) throw Error(o(91));
                break;
              default:
                a !== i && qe(e, t, s, a, l, i);
            }
        wt(e, _, D);
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
        for (N in l)
          if (_ = l[N], D = n[N], l.hasOwnProperty(N) && _ !== D && (_ != null || D != null))
            switch (N) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (_ != null)
                  throw Error(o(137, t));
                break;
              default:
                qe(
                  e,
                  t,
                  N,
                  _,
                  l,
                  D
                );
            }
        return;
      default:
        if (wo(t)) {
          for (var ge in n)
            _ = n[ge], n.hasOwnProperty(ge) && _ !== void 0 && !l.hasOwnProperty(ge) && Cf(
              e,
              t,
              ge,
              void 0,
              l,
              _
            );
          for (M in l)
            _ = l[M], D = n[M], !l.hasOwnProperty(M) || _ === D || _ === void 0 && D === void 0 || Cf(
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
  function ug(e) {
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
  function tS() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), l = 0; l < n.length; l++) {
        var a = n[l], i = a.transferSize, s = a.initiatorType, h = a.duration;
        if (i && h && ug(s)) {
          for (s = 0, h = a.responseEnd, l += 1; l < n.length; l++) {
            var b = n[l], N = b.startTime;
            if (N > h) break;
            var M = b.transferSize, k = b.initiatorType;
            M && ug(k) && (b = b.responseEnd, s += M * (b < h ? 1 : (h - N) / (b - N)));
          }
          if (--l, t += 8 * (i + s) / (a.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var wf = null, zf = null;
  function ur(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function rg(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function cg(e, t) {
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
  function og(e, t, n, l) {
    return n = ur(
      n
    ).createElement(e), n[$e] = l, n[Rt] = t, Ut(n, e, t), lt(n), n;
  }
  function Df(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Mf = null;
  function nS() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Mf ? !1 : (Mf = e, !0) : (Mf = null, !1);
  }
  var jf = typeof setTimeout == "function" ? setTimeout : void 0, lS = typeof clearTimeout == "function" ? clearTimeout : void 0, sg = typeof Promise == "function" ? Promise : void 0, fg = typeof requestAnimationFrame == "function" ? requestAnimationFrame : jf, aS = typeof queueMicrotask == "function" ? queueMicrotask : typeof sg < "u" ? function(e) {
    return sg.resolve(null).then(e).catch(iS);
  } : jf;
  function iS(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function sa(e) {
    return e === "head";
  }
  function dg(e, t) {
    var n = t, l = 0;
    do {
      var a = n.nextSibling;
      if (e.removeChild(n), a && a.nodeType === 8)
        if (n = a.data, n === "/$" || n === "/&") {
          if (l === 0) {
            e.removeChild(a), Pi(t);
            return;
          }
          l--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          l++;
        else if (n === "html")
          qf(
            e.ownerDocument.documentElement
          );
        else if (n === "head") {
          n = e.ownerDocument.head, qf(n);
          for (var i = n.firstChild; i; ) {
            var s = i.nextSibling, h = i.nodeName;
            i[Ca] || h === "SCRIPT" || h === "STYLE" || h === "LINK" && i.rel.toLowerCase() === "stylesheet" || n.removeChild(i), i = s;
          }
        } else
          n === "body" && qf(e.ownerDocument.body);
      n = a;
    } while (n);
    Pi(t);
  }
  function hg(e, t) {
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
  function mg(e, t, n) {
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
  function pg(e, t) {
    e = e.style, t = t.style;
    var n = t != null ? t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null : null;
    e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t != null ? t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n != null ? e.margin = n : (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t)));
  }
  function uS(e, t, n) {
    return n = n.ownerDocument.defaultView, {
      rect: e,
      abs: t.position === "absolute" || t.position === "fixed",
      clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
      view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth
    };
  }
  function Uf(e) {
    var t = e.getBoundingClientRect(), n = getComputedStyle(e);
    return uS(t, n, e);
  }
  function rS(e) {
    return e.documentElement.clientHeight;
  }
  function cS(e) {
    this.addEventListener("load", e), this.addEventListener("error", e);
  }
  function oS(e, t, n, l, a, i, s, h, b) {
    var N = t.nodeType === 9 ? t : t.ownerDocument;
    try {
      var M = N.startViewTransition({
        update: function() {
          var _ = N.defaultView, D = _.navigation && _.navigation.transition, X = N.fonts.status;
          l();
          var F = [];
          if (X === "loaded" && (rS(N), N.fonts.status === "loading" && F.push(N.fonts.ready)), X = F.length, e !== null)
            for (var ge = e.suspenseyImages, O = 0, x = 0; x < ge.length; x++) {
              var w = ge[x];
              if (!w.complete) {
                var U = w.getBoundingClientRect();
                if (0 < U.bottom && 0 < U.right && U.top < _.innerHeight && U.left < _.innerWidth) {
                  if (O += kg(w), O > Pc) {
                    F.length = X;
                    break;
                  }
                  w = new Promise(
                    cS.bind(w)
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
      N.__reactViewTransition = M;
      var k = [];
      return M.ready.then(
        function() {
          for (var _ = N.documentElement.getAnimations({
            subtree: !0
          }), D = 0; D < _.length; D++) {
            var X = _[D], F = X.effect, ge = F.pseudoElement;
            if (ge != null && ge.startsWith("::view-transition")) {
              k.push(X), X = F.getKeyframes();
              for (var O = ge = void 0, x = !0, w = 0; w < X.length; w++) {
                var U = X[w], $ = U.width;
                if (ge === void 0) ge = $;
                else if (ge !== $) {
                  x = !1;
                  break;
                }
                if ($ = U.height, O === void 0) O = $;
                else if (O !== $) {
                  x = !1;
                  break;
                }
                delete U.width, delete U.height, U.transform === "none" && delete U.transform;
              }
              x && ge !== void 0 && O !== void 0 && (F.setKeyframes(X), x = getComputedStyle(
                F.target,
                F.pseudoElement
              ), x.width !== ge || x.height !== O) && (x = X[0], x.width = ge, x.height = O, x = X[X.length - 1], x.width = ge, x.height = O, F.setKeyframes(X));
            }
          }
          s();
        },
        function(_) {
          N.__reactViewTransition === M && (N.__reactViewTransition = null);
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
        N.__reactViewTransition === M && (N.__reactViewTransition = null), h();
      }), M;
    } catch {
      return l(), a(), s(), null;
    }
  }
  function Wa(e, t) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
  }
  Wa.prototype.animate = function(e, t) {
    return t = typeof t == "number" ? { duration: t } : ee({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
  }, Wa.prototype.getAnimations = function() {
    for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), l = [], a = 0; a < n.length; a++) {
      var i = n[a].effect;
      i !== null && i.target === e && i.pseudoElement === t && l.push(n[a]);
    }
    return l;
  }, Wa.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function gg(e) {
    return {
      name: e,
      group: new Wa("group", e),
      imagePair: new Wa("image-pair", e),
      old: new Wa("old", e),
      new: new Wa("new", e)
    };
  }
  function hn(e) {
    this._fragmentFiber = e, this._observers = this._eventListeners = null;
  }
  hn.prototype.addEventListener = function(e, t, n) {
    var l = null, a = null;
    if (!(n != null && typeof n != "boolean" && (l = n.signal || null, l !== null && l.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var i = this._eventListeners;
      if (yg(i, e, t, n) === -1) {
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
        ), l.addEventListener("abort", a, { once: !0 }), a = l.removeEventListener.bind(l, "abort", a)), l = Zi(n), i.push({
          type: e,
          listener: t,
          optionsOrUseCapture: n,
          attachedListener: h,
          cleanup: a
        }), y(
          this._fragmentFiber.child,
          !1,
          sS,
          e,
          h,
          l
        );
      }
      this._eventListeners = i;
    }
  };
  function sS(e, t, n, l) {
    return j(e).addEventListener(
      t,
      n,
      l
    ), !1;
  }
  hn.prototype.removeEventListener = function(e, t, n) {
    var l = this._eventListeners;
    if (l !== null && (t = yg(
      l,
      e,
      t,
      n
    ), t !== -1)) {
      var a = l[t];
      n = a.attachedListener;
      var i = a.cleanup;
      a = Zi(a.optionsOrUseCapture), y(
        this._fragmentFiber.child,
        !1,
        fS,
        e,
        n,
        a
      ), l.splice(t, 1), i !== null && i();
    }
  };
  function fS(e, t, n, l) {
    return j(e).removeEventListener(
      t,
      n,
      l
    ), !1;
  }
  function Zi(e) {
    return e != null && typeof e != "boolean" && (e.once === !0 || e.signal instanceof AbortSignal) ? { capture: e.capture, passive: e.passive } : e;
  }
  function vg(e) {
    return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
  }
  function yg(e, t, n, l) {
    if (e.length === 0) return -1;
    l = vg(l);
    for (var a = 0; a < e.length; a++) {
      var i = e[a];
      if (i.type === t && i.listener === n && vg(i.optionsOrUseCapture) === l)
        return a;
    }
    return -1;
  }
  hn.prototype.dispatchEvent = function(e) {
    var t = C(
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
            Zi(i.optionsOrUseCapture)
          );
        }
      if (t.appendChild(l), e = l.dispatchEvent(e), n)
        for (a = 0; a < n.length; a++)
          i = n[a], l.removeEventListener(
            i.type,
            i.attachedListener,
            Zi(i.optionsOrUseCapture)
          );
      return t.removeChild(l), e;
    }
    return t.dispatchEvent(e);
  }, hn.prototype.focus = function(e) {
    y(
      this._fragmentFiber.child,
      !0,
      bg,
      e,
      void 0,
      void 0
    );
  };
  function bg(e, t) {
    return e.tag === 6 ? !1 : (e = j(e), TS(e, t));
  }
  hn.prototype.focusLast = function(e) {
    var t = [];
    y(
      this._fragmentFiber.child,
      !0,
      kf,
      t,
      void 0,
      void 0
    );
    for (var n = t.length - 1; 0 <= n && !bg(t[n], e); n--) ;
  };
  function kf(e, t) {
    return t.push(e), !1;
  }
  hn.prototype.blur = function() {
    var e = C(
      this._fragmentFiber
    );
    e !== null && (e = j(e), e = ur(e).activeElement, e !== null && y(
      this._fragmentFiber.child,
      !1,
      dS,
      e,
      void 0,
      void 0
    ));
  };
  function dS(e, t) {
    return e.tag === 6 ? !1 : (e = j(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
  }
  hn.prototype.observeUsing = function(e) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), y(
      this._fragmentFiber.child,
      !1,
      hS,
      e,
      void 0,
      void 0
    );
  };
  function hS(e, t) {
    return e.tag === 6 || (e = j(e), t.observe(e)), !1;
  }
  hn.prototype.unobserveUsing = function(e) {
    var t = this._observers;
    if (t !== null && t.has(e)) {
      t.delete(e), y(
        this._fragmentFiber.child,
        !1,
        mS,
        e,
        void 0,
        void 0
      );
      for (var n = t = 0; n < Vn.length; n++) {
        var l = Vn[n];
        l.fragmentInstance === this && l.observer === e ? e.unobserve(l.instance) : Vn[t++] = l;
      }
      Vn.length = t;
    }
  };
  function mS(e, t) {
    return e.tag === 6 || (e = j(e), t.unobserve(e)), !1;
  }
  var Vn = [], Lf = !1;
  function pS(e, t, n) {
    Vn.push({
      fragmentInstance: e,
      observer: t,
      instance: n
    }), Lf || (Lf = !0, _S(function() {
      Lf = !1;
      var l = Vn;
      Vn = [];
      for (var a = 0; a < l.length; a++) {
        var i = l[a];
        i.observer.unobserve(i.instance);
      }
    }));
  }
  hn.prototype.getClientRects = function() {
    var e = [];
    return y(
      this._fragmentFiber.child,
      !1,
      gS,
      e,
      void 0,
      void 0
    ), e;
  };
  function gS(e, t) {
    if (e.tag === 6) {
      e = e.stateNode;
      var n = e.ownerDocument.createRange();
      n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
    } else
      e = j(e), t.push.apply(t, e.getClientRects());
    return !1;
  }
  hn.prototype.getRootNode = function(e) {
    var t = C(
      this._fragmentFiber
    );
    return t === null ? this : j(t).getRootNode(e);
  }, hn.prototype.compareDocumentPosition = function(e) {
    var t = C(
      this._fragmentFiber
    );
    if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var n = [];
    y(
      this._fragmentFiber.child,
      !1,
      kf,
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
    return h = l && i && s & Node.DOCUMENT_POSITION_FOLLOWING && h & Node.DOCUMENT_POSITION_PRECEDING, t = l && t === e || i && a === e || b || h ? Node.DOCUMENT_POSITION_CONTAINED_BY : !l && t === e || !i && a === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : s, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || vS(
      t,
      this._fragmentFiber,
      n[0],
      n[n.length - 1],
      e
    ) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function vS(e, t, n, l, a) {
    var i = bn(a);
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
        for (i = t, t = C(t); i !== null; ) {
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
    ), t === null ? t = !1 : (y(
      t,
      !0,
      ae,
      i,
      n
    ), i = Q, Q = null, t = i !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!i) && !(t = i === l) && (t = se(
      l,
      i,
      W
    ), t === null ? t = !1 : (y(
      t,
      !0,
      ie,
      i,
      l
    ), i = Q, Z = Q = null, t = i !== null)), t) : !1;
  }
  function Sg(e, t) {
    var n = e.ownerDocument.createRange();
    n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(
      window.scrollX + e.left,
      t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight
    );
  }
  hn.prototype.scrollIntoView = function(e) {
    if (typeof e == "object") throw Error(o(566));
    var t = [];
    y(
      this._fragmentFiber.child,
      !1,
      kf,
      t,
      void 0,
      void 0
    );
    var n = e !== !1;
    if (t.length === 0) {
      var l = H(
        this._fragmentFiber
      );
      if (l = n ? l[1] || l[0] || C(this._fragmentFiber) : l[0] || l[1], l === null) return;
      if (l.tag === 6) {
        e = j(l), Sg(e, n);
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
      a.tag === 6 ? (a = j(a), Sg(a, n)) : j(a).scrollIntoView(e), l += n ? -1 : 1;
    }
  };
  function yS(e, t) {
    return e = j(e), xg(e, t), !1;
  }
  function xg(e, t) {
    e.reactFragments == null && (e.reactFragments = /* @__PURE__ */ new Set()), e.reactFragments.add(t);
  }
  function Eg(e, t) {
    var n = t._eventListeners;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var a = n[l];
        e.addEventListener(
          a.type,
          a.attachedListener,
          Zi(a.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(i) {
      for (var s = 0, h = 0; h < Vn.length; h++) {
        var b = Vn[h];
        (b.fragmentInstance !== t || b.observer !== i || b.instance !== e) && (Vn[s++] = b);
      }
      Vn.length = s, i.observe(e);
    }), xg(e, t));
  }
  function bS(e, t) {
    var n = t._eventListeners;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var a = n[l];
        e.removeEventListener(
          a.type,
          a.attachedListener,
          Zi(a.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(i) {
      typeof i.rootMargin == "string" ? pS(
        t,
        i,
        e
      ) : i.unobserve(e);
    }), e.reactFragments != null && e.reactFragments.delete(t));
  }
  function Hf(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (t = t.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Hf(n), za(n);
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
  function SS(e, t, n, l) {
    for (; e.nodeType === 1; ) {
      var a = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[Ca])
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
      if (e = On(e.nextSibling), e === null) break;
    }
    return null;
  }
  function xS(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = On(e.nextSibling), e === null)) return null;
    return e;
  }
  function Tg(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = On(e.nextSibling), e === null)) return null;
    return e;
  }
  function Bf(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Gf(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function ES(e, t) {
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
  function On(e) {
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
  var Yf = null;
  function _g(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0)
            return On(e.nextSibling);
          t--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Ag(e) {
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
  function TS(e, t) {
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
  function _S(e) {
    fg(function() {
      fg(function(t) {
        return e(t);
      });
    });
  }
  function Og(e, t, n) {
    switch (t = ur(n), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(o(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(o(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(o(454));
        return e;
      default:
        throw Error(o(451));
    }
  }
  function Ng(e, t, n) {
    for (var l in n) {
      var a = n[l];
      n.hasOwnProperty(l) && a != null && qe(e, t, l, null, W0, a);
    }
    n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === tl && (e.onclick = null), za(e);
  }
  function qf(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    za(e);
  }
  var Nn = /* @__PURE__ */ new Map(), Rg = /* @__PURE__ */ new Set();
  function rr(e) {
    if (typeof e.getRootNode == "function") {
      var t = e.getRootNode();
      if (t.nodeType === 9 || t.nodeType === 11) return t;
    }
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  var wl = fe.d;
  fe.d = {
    f: AS,
    r: OS,
    D: NS,
    C: RS,
    L: CS,
    m: wS,
    X: DS,
    S: zS,
    M: MS
  };
  function AS() {
    var e = wl.f(), t = Vc();
    return e || t;
  }
  function OS(e) {
    var t = Wn(e);
    t !== null && t.tag === 5 && t.type === "form" ? wm(t) : wl.r(e);
  }
  var Ki = typeof document > "u" ? null : document;
  function Cg(e, t, n) {
    var l = Ki;
    if (l && typeof t == "string" && t) {
      var a = J(t);
      a = 'link[rel="' + e + '"][href="' + a + '"]', typeof n == "string" && (a += '[crossorigin="' + n + '"]'), Rg.has(a) || (Rg.add(a), e = { rel: e, crossOrigin: n, href: t }, l.querySelector(a) === null && (t = l.createElement("link"), Ut(t, "link", e), lt(t), l.head.appendChild(t)));
    }
  }
  function NS(e) {
    wl.D(e), Cg("dns-prefetch", e, null);
  }
  function RS(e, t) {
    wl.C(e, t), Cg("preconnect", e, t);
  }
  function CS(e, t, n) {
    wl.L(e, t, n);
    var l = Ki;
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
          i = Ji(e);
          break;
        case "script":
          i = $i(e);
      }
      if (!(Nn.has(i) || (e = ee(
        {
          rel: "preload",
          href: t === "image" && n && n.imageSrcSet ? void 0 : e,
          as: t
        },
        n
      ), Nn.set(i, e), l.querySelector(a) !== null || t === "style" && l.querySelector(cr(i)) || t === "script" && l.querySelector(or(i))))) {
        var s = l.createElement("link");
        Ut(s, "link", e), t === "style" && (s[wa] = !0, s.onload = s.onerror = function() {
          un(s);
        }), lt(s), l.head.appendChild(s);
      }
    }
  }
  function wS(e, t) {
    wl.m(e, t);
    var n = Ki;
    if (n && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", a = 'link[rel="modulepreload"][as="' + J(l) + '"][href="' + J(e) + '"]', i = a;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          i = $i(e);
      }
      if (!Nn.has(i) && (e = ee({ rel: "modulepreload", href: e }, t), Nn.set(i, e), n.querySelector(a) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(or(i)))
              return;
        }
        l = n.createElement("link"), Ut(l, "link", e), lt(l), n.head.appendChild(l);
      }
    }
  }
  function zS(e, t, n) {
    wl.S(e, t, n);
    var l = Ki;
    if (l && e) {
      var a = an(l).hoistableStyles, i = Ji(e);
      t = t || "default";
      var s = a.get(i);
      if (!s) {
        var h = { loading: 0, preload: null };
        if (s = l.querySelector(
          cr(i)
        ))
          h.loading = 5;
        else {
          e = ee(
            { rel: "stylesheet", href: e, "data-precedence": t },
            n
          ), (n = Nn.get(i)) && Vf(e, n);
          var b = s = l.createElement("link");
          lt(b), Ut(b, "link", e), b._p = new Promise(function(N, M) {
            b.onload = N, b.onerror = M;
          }), b.addEventListener("load", function() {
            h.loading |= 1;
          }), b.addEventListener("error", function() {
            h.loading |= 2;
          }), h.loading |= 4, Ic(s, t, l);
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
  function DS(e, t) {
    wl.X(e, t);
    var n = Ki;
    if (n && e) {
      var l = an(n).hoistableScripts, a = $i(e), i = l.get(a);
      i || (i = n.querySelector(or(a)), i || (e = ee({ src: e, async: !0 }, t), (t = Nn.get(a)) && Xf(e, t), i = n.createElement("script"), lt(i), Ut(i, "link", e), n.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, l.set(a, i));
    }
  }
  function MS(e, t) {
    wl.M(e, t);
    var n = Ki;
    if (n && e) {
      var l = an(n).hoistableScripts, a = $i(e), i = l.get(a);
      i || (i = n.querySelector(or(a)), i || (e = ee({ src: e, async: !0, type: "module" }, t), (t = Nn.get(a)) && Xf(e, t), i = n.createElement("script"), lt(i), Ut(i, "link", e), n.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, l.set(a, i));
    }
  }
  function wg(e, t, n, l) {
    var a = (a = jn.current) ? rr(a) : null;
    if (!a) throw Error(o(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (n = Ji(n.href), t = an(
          a
        ).hoistableStyles, l = t.get(n), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, t.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          e = Ji(n.href);
          var i = an(
            a
          ).hoistableStyles, s = i.get(e);
          if (s || (a = a.ownerDocument || a, s = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, i.set(e, s), (i = a.querySelector(
            cr(e)
          )) ? i._p || (s.instance = i, s.state.loading = 5) : (i = Nn.get(e), i || (i = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, Nn.set(e, i)), jS(
            a,
            e,
            i,
            s.state
          ))), t && l === null)
            throw Error(o(528, ""));
          return s;
        }
        if (t && l !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = $i(n), t = an(
          a
        ).hoistableScripts, l = t.get(n), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, t.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, e));
    }
  }
  function Ji(e) {
    return 'href="' + J(e) + '"';
  }
  function cr(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function zg(e) {
    return ee({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function jS(e, t, n, l) {
    if (t = e.querySelector(
      'link[rel="preload"][as="style"][' + t + "]"
    )) {
      if (t[wa] !== !0) {
        l.loading = 1;
        return;
      }
    } else
      t = e.createElement("link"), t[wa] = !0, t.onload = t.onerror = un.bind(null, t), Ut(t, "link", n), lt(t), e.head.appendChild(t);
    l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    });
  }
  function $i(e) {
    return '[src="' + J(e) + '"]';
  }
  function or(e) {
    return "script[async]" + e;
  }
  function Dg(e, t, n) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + J(n.href) + '"]'
          );
          if (l)
            return t.instance = l, lt(l), l;
          var a = ee({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), lt(l), Ut(l, "style", a), Ic(l, n.precedence, e), t.instance = l;
        case "stylesheet":
          a = Ji(n.href);
          var i = e.querySelector(
            cr(a)
          );
          if (i)
            return t.state.loading |= 4, t.instance = i, lt(i), i;
          l = zg(n), (a = Nn.get(a)) && Vf(l, a), i = (e.ownerDocument || e).createElement("link"), lt(i);
          var s = i;
          return s._p = new Promise(function(h, b) {
            s.onload = h, s.onerror = b;
          }), Ut(i, "link", l), t.state.loading |= 4, Ic(i, n.precedence, e), t.instance = i;
        case "script":
          return i = $i(n.src), (a = e.querySelector(
            or(i)
          )) ? (t.instance = a, lt(a), a) : (l = n, (a = Nn.get(i)) && (l = ee({}, n), Xf(l, a)), e = e.ownerDocument || e, a = e.createElement("script"), lt(a), Ut(a, "link", l), e.head.appendChild(a), t.instance = a);
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, Ic(l, n.precedence, e));
    return t.instance;
  }
  function Ic(e, t, n) {
    for (var l = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), a = l.length ? l[l.length - 1] : null, i = a, s = 0; s < l.length; s++) {
      var h = l[s];
      if (h.dataset.precedence === t) i = h;
      else if (i !== a) break;
    }
    i ? i.parentNode.insertBefore(e, i.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function Vf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Xf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Fc = null;
  function Mg(e, t, n) {
    if (Fc === null) {
      var l = /* @__PURE__ */ new Map(), a = Fc = /* @__PURE__ */ new Map();
      a.set(n, l);
    } else
      a = Fc, l = a.get(n), l || (l = /* @__PURE__ */ new Map(), a.set(n, l));
    if (l.has(e)) return l;
    for (l.set(e, null), n = n.getElementsByTagName(e), a = 0; a < n.length; a++) {
      var i = n[a];
      if (!(i[Ca] || i[$e] || e === "link" && i.getAttribute("rel") === "stylesheet") && i.namespaceURI !== "http://www.w3.org/2000/svg") {
        var s = i.getAttribute(t) || "";
        s = e + s;
        var h = l.get(s);
        h ? h.push(i) : l.set(s, [i]);
      }
    }
    return l;
  }
  function Qf(e, t, n) {
    e = e.ownerDocument || e, e.head.insertBefore(
      n,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function US(e, t, n) {
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
  function jg(e, t) {
    return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
  }
  function Ug(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function kg(e) {
    return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function Lg(e, t) {
    typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += kg(t), e.suspenseyImages.push(t)), e = HS.bind(e), t.decode().then(e, e));
  }
  function kS(e, t, n, l) {
    if (n.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var a = Ji(l.href), i = t.querySelector(
          cr(a)
        );
        if (i) {
          t = i._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = sr.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = i, lt(i);
          return;
        }
        i = t.ownerDocument || t, l = zg(l), (a = Nn.get(a)) && Vf(l, a), i = i.createElement("link"), lt(i);
        var s = i;
        s._p = new Promise(function(h, b) {
          s.onload = h, s.onerror = b;
        }), Ut(i, "link", l), n.instance = i;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++, n = sr.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
    }
  }
  var Pc = 0;
  function LS(e, t) {
    return e.stylesheets && e.count === 0 && eo(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
      var l = setTimeout(function() {
        if (e.stylesheets && eo(e, e.stylesheets), e.unsuspend) {
          var i = e.unsuspend;
          e.unsuspend = null, i();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Pc === 0 && (Pc = 62500 * tS());
      var a = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && eo(e, e.stylesheets), e.unsuspend)) {
            var i = e.unsuspend;
            e.unsuspend = null, i();
          }
        },
        (e.imgBytes > Pc ? 50 : 800) + t
      );
      return e.unsuspend = n, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(a);
      };
    } : null;
  }
  function Hg(e) {
    if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
      if (e.stylesheets) eo(e, e.stylesheets);
      else if (e.unsuspend) {
        var t = e.unsuspend;
        e.unsuspend = null, t();
      }
    }
  }
  function sr() {
    this.count--, Hg(this);
  }
  function HS() {
    this.imgCount--, Hg(this);
  }
  var Wc = null;
  function eo(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Wc = /* @__PURE__ */ new Map(), t.forEach(BS, e), Wc = null, sr.call(e));
  }
  function BS(e, t) {
    if (!(t.state.loading & 4)) {
      var n = Wc.get(e);
      if (n) var l = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), Wc.set(e, n);
        for (var a = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), i = 0; i < a.length; i++) {
          var s = a[i];
          (s.nodeName === "LINK" || s.getAttribute("media") !== "not all") && (n.set(s.dataset.precedence, s), l = s);
        }
        l && n.set(null, l);
      }
      a = t.instance, s = a.getAttribute("data-precedence"), i = n.get(s) || l, i === l && n.set(null, a), n.set(s, a), this.count++, l = sr.bind(this), a.addEventListener("load", l), a.addEventListener("error", l), i ? i.parentNode.insertBefore(a, i.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(a, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Ii = {
    $$typeof: Je,
    Provider: null,
    Consumer: null,
    _currentValue: Dn,
    _currentValue2: Dn,
    _threadCount: 0
  };
  function GS(e, t, n, l, a, i, s, h, b) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = We(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = We(0), this.hiddenUpdates = We(null), this.identifierPrefix = l, this.onUncaughtError = a, this.onCaughtError = i, this.onRecoverableError = s, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = b, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Bg(e, t, n, l, a, i, s, h, b, N, M, k) {
    return e = new GS(
      e,
      t,
      n,
      s,
      b,
      N,
      M,
      k,
      h
    ), t = 1, i === !0 && (t |= 24), i = It(3, null, null, t), e.current = i, i.stateNode = e, t = is(), t.refCount++, e.pooledCache = t, t.refCount++, i.memoizedState = {
      element: l,
      isDehydrated: n,
      cache: t
    }, os(i), e;
  }
  function Gg(e) {
    return e ? (e = Ei, e) : Ei;
  }
  function Yg(e, t, n, l, a, i) {
    a = Gg(a), l.context === null ? l.context = a : l.pendingContext = a, l = Pl(t), l.payload = { element: n }, i = i === void 0 ? null : i, i !== null && (l.callback = i), n = Wl(e, l, t), n !== null && (en(n, e, t), Yu(n, e, t));
  }
  function qg(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Zf(e, t) {
    qg(e, t), (e = e.alternate) && qg(e, t);
  }
  function Vg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = ka(e, 67108864);
      t !== null && en(t, e, 67108864), Zf(e, 67108864);
    }
  }
  function Xg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = dn();
      t = di(t);
      var n = ka(e, t);
      n !== null && en(n, e, t), Zf(e, t);
    }
  }
  var Fi = !0;
  function YS(e, t, n, l) {
    var a = P.T;
    P.T = null;
    var i = fe.p;
    try {
      fe.p = 2, Kf(e, t, n, l);
    } finally {
      fe.p = i, P.T = a;
    }
  }
  function qS(e, t, n, l) {
    var a = P.T;
    P.T = null;
    var i = fe.p;
    try {
      fe.p = 8, Kf(e, t, n, l);
    } finally {
      fe.p = i, P.T = a;
    }
  }
  function Kf(e, t, n, l) {
    if (Fi) {
      var a = Jf(l);
      if (a === null)
        Rf(
          e,
          t,
          l,
          to,
          n
        ), Zg(e, l);
      else if (XS(
        a,
        e,
        t,
        n,
        l
      ))
        l.stopPropagation();
      else if (Zg(e, l), t & 4 && -1 < VS.indexOf(e)) {
        for (; a !== null; ) {
          var i = Wn(a);
          if (i !== null)
            switch (i.tag) {
              case 3:
                if (i = i.stateNode, i.current.memoizedState.isDehydrated) {
                  var s = Fn(i.pendingLanes);
                  if (s !== 0) {
                    var h = i;
                    for (h.pendingLanes |= 2, h.entangledLanes |= 2; s; ) {
                      var b = 1 << 31 - nt(s);
                      h.entanglements[1] |= b, s &= ~b;
                    }
                    fl(i), (ke & 6) === 0 && (Gc = Ht() + 500, lr(0));
                  }
                }
                break;
              case 31:
              case 13:
                h = ka(i, 2), h !== null && en(h, i, 2), Vc(), Zf(i, 2);
            }
          if (i = Jf(l), i === null && Rf(
            e,
            t,
            l,
            to,
            n
          ), i === a) break;
          a = i;
        }
        a !== null && l.stopPropagation();
      } else
        Rf(
          e,
          t,
          l,
          null,
          n
        );
    }
  }
  function Jf(e) {
    return e = Do(e), $f(e);
  }
  var to = null;
  function $f(e) {
    if (to = null, e = bn(e), e !== null) {
      var t = d(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (e = m(t), e !== null) return e;
          e = null;
        } else if (n === 31) {
          if (e = g(t), e !== null) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return to = e, null;
  }
  function Qg(e) {
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
        switch (gu()) {
          case oi:
            return 2;
          case pl:
            return 8;
          case Un:
          case Mr:
            return 32;
          case vu:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var If = !1, fa = null, da = null, ha = null, fr = /* @__PURE__ */ new Map(), dr = /* @__PURE__ */ new Map(), ma = [], VS = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Zg(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        fa = null;
        break;
      case "dragenter":
      case "dragleave":
        da = null;
        break;
      case "mouseover":
      case "mouseout":
        ha = null;
        break;
      case "pointerover":
      case "pointerout":
        fr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        dr.delete(t.pointerId);
    }
  }
  function hr(e, t, n, l, a, i) {
    return e === null || e.nativeEvent !== i ? (e = {
      blockedOn: t,
      domEventName: n,
      eventSystemFlags: l,
      nativeEvent: i,
      targetContainers: [a]
    }, t !== null && (t = Wn(t), t !== null && Vg(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, a !== null && t.indexOf(a) === -1 && t.push(a), e);
  }
  function XS(e, t, n, l, a) {
    switch (t) {
      case "focusin":
        return fa = hr(
          fa,
          e,
          t,
          n,
          l,
          a
        ), !0;
      case "dragenter":
        return da = hr(
          da,
          e,
          t,
          n,
          l,
          a
        ), !0;
      case "mouseover":
        return ha = hr(
          ha,
          e,
          t,
          n,
          l,
          a
        ), !0;
      case "pointerover":
        var i = a.pointerId;
        return fr.set(
          i,
          hr(
            fr.get(i) || null,
            e,
            t,
            n,
            l,
            a
          )
        ), !0;
      case "gotpointercapture":
        return i = a.pointerId, dr.set(
          i,
          hr(
            dr.get(i) || null,
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
  function Kg(e) {
    var t = bn(e.target);
    if (t !== null) {
      var n = d(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = m(n), t !== null) {
            e.blockedOn = t, Hr(e.priority, function() {
              Xg(n);
            });
            return;
          }
        } else if (t === 31) {
          if (t = g(n), t !== null) {
            e.blockedOn = t, Hr(e.priority, function() {
              Xg(n);
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
  function no(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Jf(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var l = new n.constructor(
          n.type,
          n
        );
        zo = l, n.target.dispatchEvent(l), zo = null;
      } else
        return t = Wn(n), t !== null && Vg(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function Jg(e, t, n) {
    no(e) && n.delete(t);
  }
  function QS() {
    If = !1, fa !== null && no(fa) && (fa = null), da !== null && no(da) && (da = null), ha !== null && no(ha) && (ha = null), fr.forEach(Jg), dr.forEach(Jg);
  }
  function lo(e, t) {
    e.blockedOn === t && (e.blockedOn = null, If || (If = !0, u.unstable_scheduleCallback(
      u.unstable_NormalPriority,
      QS
    )));
  }
  var ao = null;
  function $g(e) {
    ao !== e && (ao = e, u.unstable_scheduleCallback(
      u.unstable_NormalPriority,
      function() {
        ao === e && (ao = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t], l = e[t + 1], a = e[t + 2];
          if (typeof l != "function") {
            if ($f(l || n) === null)
              continue;
            break;
          }
          var i = Wn(n);
          i !== null && (e.splice(t, 3), t -= 3, ws(
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
  function Pi(e) {
    function t(b) {
      return lo(b, e);
    }
    fa !== null && lo(fa, e), da !== null && lo(da, e), ha !== null && lo(ha, e), fr.forEach(t), dr.forEach(t);
    for (var n = 0; n < ma.length; n++) {
      var l = ma[n];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < ma.length && (n = ma[0], n.blockedOn === null); )
      Kg(n), n.blockedOn === null && ma.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
      for (l = 0; l < n.length; l += 3) {
        var a = n[l], i = n[l + 1], s = a[Rt] || null;
        if (typeof i == "function")
          s || $g(n);
        else if (s) {
          var h = null;
          if (i && i.hasAttribute("formAction")) {
            if (a = i, s = i[Rt] || null)
              h = s.formAction;
            else if ($f(a) !== null) continue;
          } else h = s.action;
          typeof h == "function" ? n[l + 1] = h : (n.splice(l, 3), l -= 3), $g(n);
        }
      }
  }
  function Ig() {
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
  function Ff(e) {
    this._internalRoot = e;
  }
  io.prototype.render = Ff.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(o(409));
    var n = t.current, l = dn();
    Yg(n, l, e, t, null, null);
  }, io.prototype.unmount = Ff.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Yg(e.current, 2, null, e, null, null), Vc(), t[Ln] = null;
    }
  };
  function io(e) {
    this._internalRoot = e;
  }
  io.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Lr();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < ma.length && t !== 0 && t < ma[n].priority; n++) ;
      ma.splice(n, 0, e), n === 0 && Kg(e);
    }
  };
  var Fg = r.version;
  if (Fg !== "19.3.0")
    throw Error(
      o(
        527,
        Fg,
        "19.3.0"
      )
    );
  fe.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
    return e = T(t), e = e !== null ? A(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var ZS = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: P,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var uo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!uo.isDisabled && uo.supportsFiber)
      try {
        Bl = uo.inject(
          ZS
        ), xt = uo;
      } catch {
      }
  }
  return pr.createRoot = function(e, t) {
    if (!f(e)) throw Error(o(299));
    var n = !1, l = "", a = Gm, i = Ym, s = qm;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (a = t.onUncaughtError), t.onCaughtError !== void 0 && (i = t.onCaughtError), t.onRecoverableError !== void 0 && (s = t.onRecoverableError)), t = Bg(
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
      Ig
    ), e[Ln] = t.current, Nf(e), new Ff(t);
  }, pr.hydrateRoot = function(e, t, n) {
    if (!f(e)) throw Error(o(299));
    var l = !1, a = "", i = Gm, s = Ym, h = qm, b = null;
    return n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (a = n.identifierPrefix), n.onUncaughtError !== void 0 && (i = n.onUncaughtError), n.onCaughtError !== void 0 && (s = n.onCaughtError), n.onRecoverableError !== void 0 && (h = n.onRecoverableError), n.formState !== void 0 && (b = n.formState)), t = Bg(
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
      Ig
    ), t.context = Gg(null), n = t.current, l = dn(), l = di(l), a = Pl(l), a.callback = null, Wl(n, a, l), n = l, t.current.lanes = n, yn(t, n), fl(t), e[Ln] = t.current, Nf(e), new io(t);
  }, pr.version = "19.3.0", pr;
}
var rv;
function ax() {
  if (rv) return ed.exports;
  rv = 1;
  function u() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (r) {
        console.error(r);
      }
  }
  return u(), ed.exports = lx(), ed.exports;
}
var ix = ax(), su = Kv(), ux = Object.defineProperty, du = (u, r) => ux(u, "name", { value: r, configurable: !0 }), Jv = !!(typeof window < "u" && window.document && window.document.createElement);
function Sa(u, r, { checkForDefaultPrevented: c = !0 } = {}) {
  return /* @__PURE__ */ du(function(f) {
    if (u?.(f), c === !1 || !f || !f.defaultPrevented)
      return r?.(f);
  }, "handleEvent");
}
du(Sa, "composeEventHandlers");
function rx(u) {
  if (!Jv)
    throw new Error("Cannot access window outside of the DOM");
  return u?.ownerDocument?.defaultView ?? window;
}
du(rx, "getOwnerWindow");
function vd(u) {
  if (!Jv)
    throw new Error("Cannot access document outside of the DOM");
  return u?.ownerDocument ?? document;
}
du(vd, "getOwnerDocument");
function $v(u, r = !1) {
  const { activeElement: c } = vd(u);
  if (!c?.nodeName)
    return null;
  if (Iv(c) && c.contentDocument)
    return $v(c.contentDocument.body, r);
  if (r) {
    const o = c.getAttribute("aria-activedescendant");
    if (o) {
      const f = vd(c).getElementById(o);
      if (f)
        return f;
    }
  }
  return c;
}
du($v, "getActiveElement");
function Iv(u) {
  return u.tagName === "IFRAME";
}
du(Iv, "isFrame");
var cx = Object.defineProperty, kd = (u, r) => cx(u, "name", { value: r, configurable: !0 });
function yd(u, r) {
  if (typeof u == "function")
    return u(r);
  u != null && (u.current = r);
}
kd(yd, "setRef");
function Fv(...u) {
  return (r) => {
    let c = !1;
    const o = u.map((f) => {
      const d = yd(f, r);
      return !c && typeof d == "function" && (c = !0), d;
    });
    if (c)
      return () => {
        for (let f = 0; f < o.length; f++) {
          const d = o[f];
          typeof d == "function" ? d() : yd(u[f], null);
        }
      };
  };
}
kd(Fv, "composeRefs");
function hu(...u) {
  return z.useCallback(Fv(...u), u);
}
kd(hu, "useComposedRefs");
var ox = Object.defineProperty, Cn = (u, r) => ox(u, "name", { value: r, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function sx(u, r) {
  const c = z.createContext(r);
  c.displayName = u + "Context";
  const o = /* @__PURE__ */ Cn((d) => {
    const { children: m, ...g } = d, S = z.useMemo(() => g, Object.values(g));
    return /* @__PURE__ */ p.jsx(c.Provider, { value: S, children: m });
  }, "Provider");
  o.displayName = u + "Provider";
  function f(d, m = {}) {
    const { optional: g = !1 } = m, S = z.useContext(c);
    if (S) return S;
    if (r !== void 0) return r;
    if (!g)
      throw new Error(`\`${d}\` must be used within \`${u}\``);
  }
  return Cn(f, "useContext"), [o, f];
}
Cn(sx, "createContext");
// @__NO_SIDE_EFFECTS__
function Pv(u, r = []) {
  let c = [];
  function o(d, m) {
    const g = z.createContext(m);
    g.displayName = d + "Context";
    const S = c.length;
    c = [...c, m];
    const T = /* @__PURE__ */ Cn((y) => {
      const { scope: C, children: q, ...H } = y, B = C?.[u]?.[S] || g, j = z.useMemo(() => H, Object.values(H));
      return /* @__PURE__ */ p.jsx(B.Provider, { value: j, children: q });
    }, "Provider");
    T.displayName = d + "Provider";
    function A(y, C, q = {}) {
      const { optional: H = !1 } = q, B = C?.[u]?.[S] || g, j = z.useContext(B);
      if (j) return j;
      if (m !== void 0) return m;
      if (!H)
        throw new Error(`\`${y}\` must be used within \`${d}\``);
    }
    return Cn(A, "useContext"), [T, A];
  }
  Cn(o, "createContext");
  const f = /* @__PURE__ */ Cn(() => {
    const d = c.map((m) => z.createContext(m));
    return /* @__PURE__ */ Cn(function(g) {
      const S = g?.[u] || d;
      return z.useMemo(
        () => ({ [`__scope${u}`]: { ...g, [u]: S } }),
        [g, S]
      );
    }, "useScope");
  }, "createScope");
  return f.scopeName = u, [o, Wv(f, ...r)];
}
Cn(Pv, "createContextScope");
function Wv(...u) {
  const r = u[0];
  if (u.length === 1) return r;
  const c = /* @__PURE__ */ Cn(() => {
    const o = u.map((f) => ({
      useScope: f(),
      scopeName: f.scopeName
    }));
    return /* @__PURE__ */ Cn(function(d) {
      const m = o.reduce((g, { useScope: S, scopeName: T }) => {
        const y = S(d)[`__scope${T}`];
        return { ...g, ...y };
      }, {});
      return z.useMemo(() => ({ [`__scope${r.scopeName}`]: m }), [m]);
    }, "useComposedScopes");
  }, "createScope");
  return c.scopeName = r.scopeName, c;
}
Cn(Wv, "composeContextScopes");
var Ea = globalThis?.document ? z.useLayoutEffect : () => {
}, fx = Object.defineProperty, dx = (u, r) => fx(u, "name", { value: r, configurable: !0 }), hx = Ar[" useId ".trim().toString()] || (() => {
}), mx = 0;
function go(u) {
  const [r, c] = z.useState(hx());
  return Ea(() => {
    u || c((o) => o ?? String(mx++));
  }, [u]), u || (r ? `radix-${r}` : "");
}
dx(go, "useId");
var px = Object.defineProperty, gx = (u, r) => px(u, "name", { value: r, configurable: !0 }), cv = Ar[" useEffectEvent ".trim().toString()], ov = Ar[" useInsertionEffect ".trim().toString()];
function ey(u) {
  if (typeof cv == "function")
    return cv(u);
  const r = z.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  return typeof ov == "function" ? ov(() => {
    r.current = u;
  }) : Ea(() => {
    r.current = u;
  }), z.useMemo(() => ((...c) => r.current?.(...c)), []);
}
gx(ey, "useEffectEvent");
var vx = Object.defineProperty, Or = (u, r) => vx(u, "name", { value: r, configurable: !0 }), yx = Ar[" useInsertionEffect ".trim().toString()] || Ea;
function ty({
  prop: u,
  defaultProp: r,
  onChange: c = /* @__PURE__ */ Or(() => {
  }, "onChange"),
  caller: o
}) {
  const [f, d, m] = ny({
    defaultProp: r,
    onChange: c
  }), g = u !== void 0, S = g ? u : f, T = z.useCallback(
    (A) => {
      if (g) {
        const y = ly(A) ? A(u) : A;
        y !== u && m.current?.(y);
      } else
        d(A);
    },
    [g, u, d, m]
  );
  return [S, T];
}
Or(ty, "useControllableState");
function ny({
  defaultProp: u,
  onChange: r
}) {
  const [c, o] = z.useState(u), f = z.useRef(c), d = z.useRef(r);
  return yx(() => {
    d.current = r;
  }, [r]), z.useEffect(() => {
    f.current !== c && (d.current?.(c), f.current = c);
  }, [c, f]), [c, o, d];
}
Or(ny, "useUncontrolledState");
function ly(u) {
  return typeof u == "function";
}
Or(ly, "isFunction");
var sv = Symbol("RADIX:SYNC_STATE");
function bx(u, r, c, o) {
  const { prop: f, defaultProp: d, onChange: m, caller: g } = r, S = f !== void 0, T = ey(m), A = [{ ...c, state: d }];
  o && A.push(o);
  const [y, C] = z.useReducer(
    (j, Q) => {
      if (Q.type === sv)
        return { ...j, state: Q.state };
      const Z = u(j, Q);
      return S && !Object.is(Z.state, j.state) && T(Z.state), Z;
    },
    ...A
  ), q = y.state, H = z.useRef(q);
  z.useEffect(() => {
    H.current !== q && (H.current = q, S || T(q));
  }, [q, H, S]);
  const B = z.useMemo(() => f !== void 0 ? { ...y, state: f } : y, [y, f]);
  return z.useEffect(() => {
    S && !Object.is(f, y.state) && C({ type: sv, state: f });
  }, [f, y.state, S]), [B, C];
}
Or(bx, "useControllableStateReducer");
var Sx = Object.defineProperty, Zn = (u, r) => Sx(u, "name", { value: r, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function To(u) {
  const r = z.forwardRef((c, o) => {
    let { children: f, ...d } = c, m = null, g = !1;
    const S = [];
    bd(f) && typeof ro == "function" && (f = ro(f._payload)), z.Children.forEach(f, (C) => {
      if (ry(C)) {
        g = !0;
        const q = C;
        let H = "child" in q.props ? q.props.child : q.props.children;
        bd(H) && typeof ro == "function" && (H = ro(H._payload)), m = Tx(q, H), S.push(m?.props?.children);
      } else
        S.push(C);
    }), m ? m = z.cloneElement(m, void 0, S) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !g && z.Children.count(f) === 1 && z.isValidElement(f) && (m = f)
    );
    const T = m ? uy(m) : void 0, A = hu(o, T);
    if (!m) {
      if (f || f === 0)
        throw new Error(
          g ? Ox(u) : Ax(u)
        );
      return f;
    }
    const y = iy(d, m.props ?? {});
    return m.type !== z.Fragment && (y.ref = o ? A : T), z.cloneElement(m, y);
  });
  return r.displayName = `${u}.Slot`, r;
}
Zn(To, "createSlot");
var xx = /* @__PURE__ */ To("Slot"), ay = Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Ex(u) {
  const r = /* @__PURE__ */ Zn((c) => "child" in c ? c.children(c.child) : c.children, "Slottable");
  return r.displayName = `${u}.Slottable`, r.__radixId = ay, r;
}
Zn(Ex, "createSlottable");
var Tx = /* @__PURE__ */ Zn((u, r) => {
  if ("child" in u.props) {
    const c = u.props.child;
    return z.isValidElement(c) ? z.cloneElement(c, void 0, u.props.children(c.props.children)) : null;
  }
  return z.isValidElement(r) ? r : null;
}, "getSlottableElementFromSlottable");
function iy(u, r) {
  const c = { ...r };
  for (const o in r) {
    const f = u[o], d = r[o];
    /^on[A-Z]/.test(o) ? f && d ? c[o] = (...g) => {
      const S = d(...g);
      return f(...g), S;
    } : f && (c[o] = f) : o === "style" ? c[o] = { ...f, ...d } : o === "className" && (c[o] = [f, d].filter(Boolean).join(" "));
  }
  return { ...u, ...c };
}
Zn(iy, "mergeProps");
function uy(u) {
  let r = Object.getOwnPropertyDescriptor(u.props, "ref")?.get, c = r && "isReactWarning" in r && r.isReactWarning;
  return c ? u.ref : (r = Object.getOwnPropertyDescriptor(u, "ref")?.get, c = r && "isReactWarning" in r && r.isReactWarning, c ? u.props.ref : u.props.ref || u.ref);
}
Zn(uy, "getElementRef");
function ry(u) {
  return z.isValidElement(u) && typeof u.type == "function" && "__radixId" in u.type && u.type.__radixId === ay;
}
Zn(ry, "isSlottable");
var _x = Symbol.for("react.lazy");
function bd(u) {
  return u != null && typeof u == "object" && "$$typeof" in u && u.$$typeof === _x && "_payload" in u && cy(u._payload);
}
Zn(bd, "isLazyComponent");
function cy(u) {
  return typeof u == "object" && u !== null && "then" in u;
}
Zn(cy, "isPromiseLike");
var Ax = /* @__PURE__ */ Zn((u) => `${u} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), Ox = /* @__PURE__ */ Zn((u) => `${u} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), ro = Ar[" use ".trim().toString()], Nx = Object.defineProperty, Rx = (u, r) => Nx(u, "name", { value: r, configurable: !0 }), Cx = [
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
], Ta = Cx.reduce((u, r) => {
  const c = /* @__PURE__ */ To(`Primitive.${r}`), o = z.forwardRef((f, d) => {
    const { asChild: m, ...g } = f, S = m ? c : r;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ p.jsx(S, { ...g, ref: d });
  });
  return o.displayName = `Primitive.${r}`, { ...u, [r]: o };
}, {});
function oy(u, r) {
  u && su.flushSync(() => u.dispatchEvent(r));
}
Rx(oy, "dispatchDiscreteCustomEvent");
var wx = Object.defineProperty, zx = (u, r) => wx(u, "name", { value: r, configurable: !0 });
function fu(u) {
  const r = z.useRef(u);
  return z.useEffect(() => {
    r.current = u;
  }), z.useMemo(() => ((...c) => r.current?.(...c)), []);
}
zx(fu, "useCallbackRef");
var Dx = Object.defineProperty, Ot = (u, r) => Dx(u, "name", { value: r, configurable: !0 }), Sd = "dismissableLayer.update", Mx = "dismissableLayer.pointerDownOutside", jx = "dismissableLayer.focusOutside", fv, sy = z.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set(),
  // Outside elements that belong to a layer's own dismiss affordance (eg, a
  // dialog overlay). Pressing them should dismiss the layer regardless of
  // whether or not they stop propagation.
  //
  // See https://github.com/radix-ui/primitives/issues/3346
  dismissableSurfaces: /* @__PURE__ */ new Set()
}), Ux = /* @__PURE__ */ z.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ot(function(r, c) {
    const {
      disableOutsidePointerEvents: o = !1,
      deferPointerDownOutside: f = !1,
      onEscapeKeyDown: d,
      onPointerDownOutside: m,
      onFocusOutside: g,
      onInteractOutside: S,
      onDismiss: T,
      ...A
    } = r, y = z.useContext(sy), [C, q] = z.useState(null), H = C?.ownerDocument ?? globalThis?.document, [, B] = z.useState({}), j = hu(c, q), Q = Array.from(y.layers), [Z] = [
      ...y.layersWithOutsidePointerEventsDisabled
    ].slice(-1), ae = Z ? Q.indexOf(Z) : -1, ie = C ? Q.indexOf(C) : -1, W = y.layersWithOutsidePointerEventsDisabled.size > 0, se = ie >= ae, ee = z.useRef(!1), he = dy(
      (I) => {
        m?.(I), S?.(I), I.defaultPrevented || T?.();
      },
      {
        ownerDocument: H,
        deferPointerDownOutside: f,
        isDeferredPointerDownOutsideRef: ee,
        dismissableSurfaces: y.dismissableSurfaces,
        shouldHandlePointerDownOutside: z.useCallback(
          (I) => {
            if (!(I instanceof Node))
              return !1;
            const St = [...y.branches].some(
              (ot) => ot.contains(I)
            );
            return se && !St;
          },
          [y.branches, se]
        )
      }
    ), Pe = hy((I) => {
      if (f && ee.current)
        return;
      const St = I.target;
      [...y.branches].some((Je) => Je.contains(St)) || (g?.(I), S?.(I), I.defaultPrevented || T?.());
    }, H), Ae = C ? ie === Q.length - 1 : !1, De = fu((I) => {
      I.key === "Escape" && (d?.(I), !I.defaultPrevented && T && (I.preventDefault(), T()));
    });
    return z.useEffect(() => {
      if (Ae)
        return H.addEventListener("keydown", De, { capture: !0 }), () => H.removeEventListener("keydown", De, { capture: !0 });
    }, [H, Ae, De]), z.useEffect(() => {
      if (C)
        return o && (y.layersWithOutsidePointerEventsDisabled.size === 0 && (fv = H.body.style.pointerEvents, H.body.style.pointerEvents = "none"), y.layersWithOutsidePointerEventsDisabled.add(C)), y.layers.add(C), xd(), () => {
          o && (y.layersWithOutsidePointerEventsDisabled.delete(C), y.layersWithOutsidePointerEventsDisabled.size === 0 && (H.body.style.pointerEvents = fv));
        };
    }, [C, H, o, y]), z.useEffect(() => () => {
      C && (y.layers.delete(C), y.layersWithOutsidePointerEventsDisabled.delete(C), xd());
    }, [C, y]), z.useEffect(() => {
      const I = /* @__PURE__ */ Ot(() => B({}), "handleUpdate");
      return document.addEventListener(Sd, I), () => document.removeEventListener(Sd, I);
    }, []), /* @__PURE__ */ p.jsx(
      Ta.div,
      {
        ...A,
        ref: j,
        style: {
          pointerEvents: W ? se ? "auto" : "none" : void 0,
          ...r.style
        },
        onFocusCapture: Sa(r.onFocusCapture, Pe.onFocusCapture),
        onBlurCapture: Sa(r.onBlurCapture, Pe.onBlurCapture),
        onPointerDownCapture: Sa(
          r.onPointerDownCapture,
          he.onPointerDownCapture
        )
      }
    );
  }, "DismissableLayer")
);
function fy() {
  const u = z.useContext(sy), [r, c] = z.useState(null);
  return z.useEffect(() => {
    if (r)
      return u.dismissableSurfaces.add(r), () => {
        u.dismissableSurfaces.delete(r);
      };
  }, [r, u.dismissableSurfaces]), c;
}
Ot(fy, "useDismissableLayerSurface");
var kx = /* @__PURE__ */ Ot(() => !0, "IS_TRUE");
function dy(u, r) {
  const {
    ownerDocument: c = globalThis?.document,
    deferPointerDownOutside: o = !1,
    isDeferredPointerDownOutsideRef: f,
    dismissableSurfaces: d,
    shouldHandlePointerDownOutside: m = kx
  } = r, g = fu(u), S = z.useRef(!1), T = z.useRef(!1), A = z.useRef(/* @__PURE__ */ new Map()), y = z.useRef(() => {
  });
  return z.useEffect(() => {
    function C() {
      T.current = !1, f.current = !1, A.current.clear();
    }
    Ot(C, "resetOutsideInteraction");
    function q() {
      return Array.from(A.current.values()).some(Boolean);
    }
    Ot(q, "isOutsideInteractionIntercepted");
    function H(ae) {
      if (!T.current)
        return;
      const ie = ae.target;
      ie instanceof Node && [...d].some((se) => se.contains(ie)) || A.current.set(ae.type, !0), ae.type === "click" && window.setTimeout(() => {
        T.current && y.current();
      }, 0);
    }
    Ot(H, "handleInteractionCapture");
    function B(ae) {
      T.current && A.current.set(ae.type, !1);
    }
    Ot(B, "handleInteractionBubble");
    const j = /* @__PURE__ */ Ot((ae) => {
      if (ae.target && !S.current) {
        let ie = function() {
          c.removeEventListener("click", y.current);
          const se = q();
          C(), se || Ld(
            Mx,
            g,
            W,
            { discrete: !0 }
          );
        };
        if (Ot(ie, "handleAndDispatchPointerDownOutsideEvent"), !m(ae.target)) {
          c.removeEventListener("click", y.current), C(), S.current = !1;
          return;
        }
        const W = { originalEvent: ae };
        T.current = !0, f.current = o && ae.button === 0, A.current.clear(), !o || ae.button !== 0 ? ie() : (c.removeEventListener("click", y.current), y.current = ie, c.addEventListener("click", y.current, { once: !0 }));
      } else
        c.removeEventListener("click", y.current), C();
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
      c.addEventListener(ae, H, !0), c.addEventListener(ae, B);
    const Z = window.setTimeout(() => {
      c.addEventListener("pointerdown", j);
    }, 0);
    return () => {
      window.clearTimeout(Z), c.removeEventListener("pointerdown", j), c.removeEventListener("click", y.current);
      for (const ae of Q)
        c.removeEventListener(ae, H, !0), c.removeEventListener(ae, B);
    };
  }, [
    c,
    g,
    o,
    f,
    d,
    m
  ]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: /* @__PURE__ */ Ot(() => S.current = !0, "onPointerDownCapture")
  };
}
Ot(dy, "usePointerDownOutside");
function hy(u, r = globalThis?.document) {
  const c = fu(u), o = z.useRef(!1);
  return z.useEffect(() => {
    const f = /* @__PURE__ */ Ot((d) => {
      d.target && !o.current && Ld(jx, c, { originalEvent: d }, {
        discrete: !1
      });
    }, "handleFocus");
    return r.addEventListener("focusin", f), () => r.removeEventListener("focusin", f);
  }, [r, c]), {
    onFocusCapture: /* @__PURE__ */ Ot(() => o.current = !0, "onFocusCapture"),
    onBlurCapture: /* @__PURE__ */ Ot(() => o.current = !1, "onBlurCapture")
  };
}
Ot(hy, "useFocusOutside");
function xd() {
  const u = new CustomEvent(Sd);
  document.dispatchEvent(u);
}
Ot(xd, "dispatchUpdate");
function Ld(u, r, c, { discrete: o }) {
  const f = c.originalEvent.target, d = new CustomEvent(u, { bubbles: !1, cancelable: !0, detail: c });
  r && f.addEventListener(u, r, { once: !0 }), o ? oy(f, d) : f.dispatchEvent(d);
}
Ot(Ld, "handleAndDispatchCustomEvent");
var Lx = Object.defineProperty, Kt = (u, r) => Lx(u, "name", { value: r, configurable: !0 }), ad = "focusScope.autoFocusOnMount", id = "focusScope.autoFocusOnUnmount", dv = { bubbles: !1, cancelable: !0 }, Hx = /* @__PURE__ */ z.forwardRef(
  /* @__PURE__ */ Kt(function(r, c) {
    const {
      loop: o = !1,
      trapped: f = !1,
      onMountAutoFocus: d,
      onUnmountAutoFocus: m,
      ...g
    } = r, [S, T] = z.useState(null), A = fu(d), y = fu(m), C = z.useRef(null), q = hu(c, T), H = z.useRef({
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
          S.contains(W) ? C.current = W : Dl(C.current, { select: !0 });
        }, Q = function(ie) {
          if (H.paused || !S) return;
          const W = ie.relatedTarget;
          W !== null && (S.contains(W) || Dl(C.current, { select: !0 }));
        }, Z = function(ie) {
          if (document.activeElement === document.body)
            for (const se of ie)
              se.removedNodes.length > 0 && Dl(S);
        };
        Kt(j, "handleFocusIn"), Kt(Q, "handleFocusOut"), Kt(Z, "handleMutations"), document.addEventListener("focusin", j), document.addEventListener("focusout", Q);
        const ae = new MutationObserver(Z);
        return S && ae.observe(S, { childList: !0, subtree: !0 }), () => {
          document.removeEventListener("focusin", j), document.removeEventListener("focusout", Q), ae.disconnect();
        };
      }
    }, [f, S, H.paused]), z.useEffect(() => {
      if (S) {
        hv.add(H);
        const j = document.activeElement;
        if (!S.contains(j)) {
          const Z = new CustomEvent(ad, dv);
          S.addEventListener(ad, A), S.dispatchEvent(Z), Z.defaultPrevented || (my(by(Hd(S)), { select: !0 }), document.activeElement === j && Dl(S));
        }
        return () => {
          S.removeEventListener(ad, A), setTimeout(() => {
            const Z = new CustomEvent(id, dv);
            S.addEventListener(id, y), S.dispatchEvent(Z), Z.defaultPrevented || Dl(j ?? document.body, { select: !0 }), S.removeEventListener(id, y), hv.remove(H);
          }, 0);
        };
      }
    }, [S, A, y, H]);
    const B = z.useCallback(
      (j) => {
        if (!o && !f || H.paused) return;
        const Q = j.key === "Tab" && !j.altKey && !j.ctrlKey && !j.metaKey, Z = document.activeElement;
        if (Q && Z) {
          const ae = j.currentTarget, [ie, W] = py(ae);
          ie && W ? !j.shiftKey && Z === W ? (j.preventDefault(), o && Dl(ie, { select: !0 })) : j.shiftKey && Z === ie && (j.preventDefault(), o && Dl(W, { select: !0 })) : Z === ae && j.preventDefault();
        }
      },
      [o, f, H.paused]
    );
    return /* @__PURE__ */ p.jsx(Ta.div, { tabIndex: -1, ...g, ref: q, onKeyDown: B });
  }, "FocusScope")
);
function my(u, { select: r = !1 } = {}) {
  const c = document.activeElement;
  for (const o of u)
    if (Dl(o, { select: r }), document.activeElement !== c) return;
}
Kt(my, "focusFirst");
function py(u) {
  const r = Hd(u), c = Ed(r, u), o = Ed(r.reverse(), u);
  return [c, o];
}
Kt(py, "getTabbableEdges");
function Hd(u) {
  const r = [], c = document.createTreeWalker(u, NodeFilter.SHOW_ELEMENT, {
    acceptNode: /* @__PURE__ */ Kt((o) => {
      const f = o.tagName === "INPUT" && o.type === "hidden";
      return o.disabled || o.hidden || f ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }, "acceptNode")
  });
  for (; c.nextNode(); ) r.push(c.currentNode);
  return r;
}
Kt(Hd, "getTabbableCandidates");
function Ed(u, r) {
  const c = typeof r.checkVisibility == "function" && r.checkVisibility({ checkVisibilityCSS: !0 });
  for (const o of u)
    if (!(c ? !o.checkVisibility({ checkVisibilityCSS: !0 }) : gy(o, { upTo: r })))
      return o;
}
Kt(Ed, "findVisible");
function gy(u, { upTo: r }) {
  if (getComputedStyle(u).visibility === "hidden") return !0;
  for (; u; ) {
    if (r !== void 0 && u === r) return !1;
    if (getComputedStyle(u).display === "none") return !0;
    u = u.parentElement;
  }
  return !1;
}
Kt(gy, "isHidden");
function vy(u) {
  return u instanceof HTMLInputElement && "select" in u;
}
Kt(vy, "isSelectableInput");
function Dl(u, { select: r = !1 } = {}) {
  if (u && u.focus) {
    const c = document.activeElement;
    u.focus({ preventScroll: !0 }), u !== c && vy(u) && r && u.select();
  }
}
Kt(Dl, "focus");
var hv = yy();
function yy() {
  let u = [];
  return {
    add(r) {
      const c = u[0];
      r !== c && c?.pause(), u = Td(u, r), u.unshift(r);
    },
    remove(r) {
      u = Td(u, r), u[0]?.resume();
    }
  };
}
Kt(yy, "createFocusScopesStack");
function Td(u, r) {
  const c = [...u], o = c.indexOf(r);
  return o !== -1 && c.splice(o, 1), c;
}
Kt(Td, "arrayRemove");
function by(u) {
  return u.filter((r) => r.tagName !== "A");
}
Kt(by, "removeLinks");
var Bx = Object.defineProperty, Gx = (u, r) => Bx(u, "name", { value: r, configurable: !0 }), Yx = /* @__PURE__ */ z.forwardRef(
  /* @__PURE__ */ Gx(function(r, c) {
    const { container: o, ...f } = r, [d, m] = z.useState(!1);
    Ea(() => m(!0), []);
    const g = o || d && globalThis?.document?.body;
    return g ? su.createPortal(/* @__PURE__ */ p.jsx(Ta.div, { ...f, ref: c }), g) : null;
  }, "Portal")
), qx = Object.defineProperty, jl = (u, r) => qx(u, "name", { value: r, configurable: !0 });
function Sy(u, r) {
  return z.useReducer((c, o) => r[c][o] ?? c, u);
}
jl(Sy, "useStateMachine");
var Bd = /* @__PURE__ */ jl((u) => {
  const { present: r, children: c } = u, o = xy(r), f = typeof c == "function" ? c({ present: o.isPresent }) : z.Children.only(c), d = Ey(o.ref, Ty(f));
  return typeof c == "function" || o.isPresent ? z.cloneElement(f, { ref: d }) : null;
}, "Presence");
function xy(u) {
  const [r, c] = z.useState(), o = z.useRef(null), f = z.useRef(u), d = z.useRef("none"), m = z.useRef(void 0), g = u ? "mounted" : "unmounted", [S, T] = Sy(g, {
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
    S === "mounted" ? (d.current = m.current ?? au(o.current), m.current = void 0) : d.current = "none";
  }, [S]), Ea(() => {
    const A = o.current, y = f.current;
    if (y !== u) {
      const q = d.current, H = au(A);
      u ? (m.current = H, T("MOUNT")) : H === "none" || A?.display === "none" ? T("UNMOUNT") : T(y && q !== H ? "ANIMATION_OUT" : "UNMOUNT"), f.current = u;
    }
  }, [u, T]), Ea(() => {
    if (r) {
      let A;
      const y = r.ownerDocument.defaultView ?? window, C = /* @__PURE__ */ jl((H) => {
        const j = au(o.current).includes(CSS.escape(H.animationName));
        if (H.target === r && j && (T("ANIMATION_END"), !f.current)) {
          const Q = r.style.animationFillMode;
          r.style.animationFillMode = "forwards", A = y.setTimeout(() => {
            r.style.animationFillMode === "forwards" && (r.style.animationFillMode = Q);
          });
        }
      }, "handleAnimationEnd"), q = /* @__PURE__ */ jl((H) => {
        H.target === r && (d.current = au(o.current));
      }, "handleAnimationStart");
      return r.addEventListener("animationstart", q), r.addEventListener("animationcancel", C), r.addEventListener("animationend", C), () => {
        y.clearTimeout(A), r.removeEventListener("animationstart", q), r.removeEventListener("animationcancel", C), r.removeEventListener("animationend", C);
      };
    } else
      T("ANIMATION_END");
  }, [r, T]), {
    isPresent: ["mounted", "unmountSuspended"].includes(S),
    ref: z.useCallback((A) => {
      if (A) {
        const y = getComputedStyle(A);
        o.current = y, m.current = au(y);
      } else
        o.current = null;
      c(A);
    }, [])
  };
}
jl(xy, "usePresence");
function _d(u, r) {
  if (typeof u == "function")
    return u(r);
  u != null && (u.current = r);
}
jl(_d, "setRef");
function Ey(...u) {
  const r = z.useRef(u);
  return r.current = u, z.useCallback((c) => {
    const o = r.current;
    let f = !1;
    const d = o.map((m) => {
      const g = _d(m, c);
      return !f && typeof g == "function" && (f = !0), g;
    });
    if (f)
      return () => {
        for (let m = 0; m < d.length; m++) {
          const g = d[m];
          typeof g == "function" ? g() : _d(o[m], null);
        }
      };
  }, []);
}
jl(Ey, "useStableComposedRefs");
function au(u) {
  return u?.animationName || "none";
}
jl(au, "getAnimationName");
function Ty(u) {
  let r = Object.getOwnPropertyDescriptor(u.props, "ref")?.get, c = r && "isReactWarning" in r && r.isReactWarning;
  return c ? u.ref : (r = Object.getOwnPropertyDescriptor(u, "ref")?.get, c = r && "isReactWarning" in r && r.isReactWarning, c ? u.props.ref : u.props.ref || u.ref);
}
jl(Ty, "getElementRef");
var Vx = Object.defineProperty, Gd = (u, r) => Vx(u, "name", { value: r, configurable: !0 }), co = 0, Wi = null;
function Xx(u) {
  return Yd(), u.children;
}
Gd(Xx, "FocusGuards");
function Yd() {
  z.useEffect(() => {
    Wi || (Wi = { start: Ad(), end: Ad() });
    const { start: u, end: r } = Wi;
    return document.body.firstElementChild !== u && document.body.insertAdjacentElement("afterbegin", u), document.body.lastElementChild !== r && document.body.insertAdjacentElement("beforeend", r), co++, () => {
      co === 1 && (Wi?.start.remove(), Wi?.end.remove(), Wi = null), co = Math.max(0, co - 1);
    };
  }, []);
}
Gd(Yd, "useFocusGuards");
function Ad() {
  const u = document.createElement("span");
  return u.setAttribute("data-radix-focus-guard", ""), u.tabIndex = 0, u.style.outline = "none", u.style.opacity = "0", u.style.position = "fixed", u.style.pointerEvents = "none", u;
}
Gd(Ad, "createFocusGuard");
var dl = function() {
  return dl = Object.assign || function(r) {
    for (var c, o = 1, f = arguments.length; o < f; o++) {
      c = arguments[o];
      for (var d in c) Object.prototype.hasOwnProperty.call(c, d) && (r[d] = c[d]);
    }
    return r;
  }, dl.apply(this, arguments);
};
function _y(u, r) {
  var c = {};
  for (var o in u) Object.prototype.hasOwnProperty.call(u, o) && r.indexOf(o) < 0 && (c[o] = u[o]);
  if (u != null && typeof Object.getOwnPropertySymbols == "function")
    for (var f = 0, o = Object.getOwnPropertySymbols(u); f < o.length; f++)
      r.indexOf(o[f]) < 0 && Object.prototype.propertyIsEnumerable.call(u, o[f]) && (c[o[f]] = u[o[f]]);
  return c;
}
function Qx(u, r, c) {
  if (c || arguments.length === 2) for (var o = 0, f = r.length, d; o < f; o++)
    (d || !(o in r)) && (d || (d = Array.prototype.slice.call(r, 0, o)), d[o] = r[o]);
  return u.concat(d || Array.prototype.slice.call(r));
}
var vo = "right-scroll-bar-position", yo = "width-before-scroll-bar", Zx = "with-scroll-bars-hidden", Kx = "--removed-body-scroll-bar-size";
function ud(u, r) {
  return typeof u == "function" ? u(r) : u && (u.current = r), u;
}
function Jx(u, r) {
  var c = z.useState(function() {
    return {
      // value
      value: u,
      // last callback
      callback: r,
      // "memoized" public interface
      facade: {
        get current() {
          return c.value;
        },
        set current(o) {
          var f = c.value;
          f !== o && (c.value = o, c.callback(o, f));
        }
      }
    };
  })[0];
  return c.callback = r, c.facade;
}
var $x = typeof window < "u" ? z.useLayoutEffect : z.useEffect, mv = /* @__PURE__ */ new WeakMap();
function Ix(u, r) {
  var c = Jx(null, function(o) {
    return u.forEach(function(f) {
      return ud(f, o);
    });
  });
  return $x(function() {
    var o = mv.get(c);
    if (o) {
      var f = new Set(o), d = new Set(u), m = c.current;
      f.forEach(function(g) {
        d.has(g) || ud(g, null);
      }), d.forEach(function(g) {
        f.has(g) || ud(g, m);
      });
    }
    mv.set(c, u);
  }, [u]), c;
}
function Fx(u) {
  return u;
}
function Px(u, r) {
  r === void 0 && (r = Fx);
  var c = [], o = !1, f = {
    read: function() {
      if (o)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return c.length ? c[c.length - 1] : u;
    },
    useMedium: function(d) {
      var m = r(d, o);
      return c.push(m), function() {
        c = c.filter(function(g) {
          return g !== m;
        });
      };
    },
    assignSyncMedium: function(d) {
      for (o = !0; c.length; ) {
        var m = c;
        c = [], m.forEach(d);
      }
      c = {
        push: function(g) {
          return d(g);
        },
        filter: function() {
          return c;
        }
      };
    },
    assignMedium: function(d) {
      o = !0;
      var m = [];
      if (c.length) {
        var g = c;
        c = [], g.forEach(d), m = c;
      }
      var S = function() {
        var A = m;
        m = [], A.forEach(d);
      }, T = function() {
        return Promise.resolve().then(S);
      };
      T(), c = {
        push: function(A) {
          m.push(A), T();
        },
        filter: function(A) {
          return m = m.filter(A), c;
        }
      };
    }
  };
  return f;
}
function Wx(u) {
  u === void 0 && (u = {});
  var r = Px(null);
  return r.options = dl({ async: !0, ssr: !1 }, u), r;
}
var Ay = function(u) {
  var r = u.sideCar, c = _y(u, ["sideCar"]);
  if (!r)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var o = r.read();
  if (!o)
    throw new Error("Sidecar medium not found");
  return z.createElement(o, dl({}, c));
};
Ay.isSideCarExport = !0;
function e1(u, r) {
  return u.useMedium(r), Ay;
}
var Oy = Wx(), rd = function() {
}, _o = z.forwardRef(function(u, r) {
  var c = z.useRef(null), o = z.useState({
    onScrollCapture: rd,
    onWheelCapture: rd,
    onTouchMoveCapture: rd
  }), f = o[0], d = o[1], m = u.forwardProps, g = u.children, S = u.className, T = u.removeScrollBar, A = u.enabled, y = u.shards, C = u.sideCar, q = u.noRelative, H = u.noIsolation, B = u.inert, j = u.allowPinchZoom, Q = u.as, Z = Q === void 0 ? "div" : Q, ae = u.gapMode, ie = _y(u, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), W = C, se = Ix([c, r]), ee = dl(dl({}, ie), f);
  return z.createElement(
    z.Fragment,
    null,
    A && z.createElement(W, { sideCar: Oy, removeScrollBar: T, shards: y, noRelative: q, noIsolation: H, inert: B, setCallbacks: d, allowPinchZoom: !!j, lockRef: c, gapMode: ae }),
    m ? z.cloneElement(z.Children.only(g), dl(dl({}, ee), { ref: se })) : z.createElement(Z, dl({}, ee, { className: S, ref: se }), g)
  );
});
_o.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
_o.classNames = {
  fullWidth: yo,
  zeroRight: vo
};
var t1 = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function n1() {
  if (!document)
    return null;
  var u = document.createElement("style");
  u.type = "text/css";
  var r = t1();
  return r && u.setAttribute("nonce", r), u;
}
function l1(u, r) {
  u.styleSheet ? u.styleSheet.cssText = r : u.appendChild(document.createTextNode(r));
}
function a1(u) {
  var r = document.head || document.getElementsByTagName("head")[0];
  r.appendChild(u);
}
var i1 = function() {
  var u = 0, r = null;
  return {
    add: function(c) {
      u == 0 && (r = n1()) && (l1(r, c), a1(r)), u++;
    },
    remove: function() {
      u--, !u && r && (r.parentNode && r.parentNode.removeChild(r), r = null);
    }
  };
}, u1 = function() {
  var u = i1();
  return function(r, c) {
    z.useEffect(function() {
      return u.add(r), function() {
        u.remove();
      };
    }, [r && c]);
  };
}, Ny = function() {
  var u = u1(), r = function(c) {
    var o = c.styles, f = c.dynamic;
    return u(o, f), null;
  };
  return r;
}, r1 = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, cd = function(u) {
  return parseInt(u || "", 10) || 0;
}, c1 = function(u) {
  var r = window.getComputedStyle(document.body), c = r[u === "padding" ? "paddingLeft" : "marginLeft"], o = r[u === "padding" ? "paddingTop" : "marginTop"], f = r[u === "padding" ? "paddingRight" : "marginRight"];
  return [cd(c), cd(o), cd(f)];
}, o1 = function(u) {
  if (u === void 0 && (u = "margin"), typeof window > "u")
    return r1;
  var r = c1(u), c = document.documentElement.clientWidth, o = window.innerWidth;
  return {
    left: r[0],
    top: r[1],
    right: r[2],
    gap: Math.max(0, o - c + r[2] - r[0])
  };
}, s1 = Ny(), ru = "data-scroll-locked", f1 = function(u, r, c, o) {
  var f = u.left, d = u.top, m = u.right, g = u.gap;
  return c === void 0 && (c = "margin"), `
  .`.concat(Zx, ` {
   overflow: hidden `).concat(o, `;
   padding-right: `).concat(g, "px ").concat(o, `;
  }
  body[`).concat(ru, `] {
    overflow: hidden `).concat(o, `;
    overscroll-behavior: contain;
    `).concat([
    r && "position: relative ".concat(o, ";"),
    c === "margin" && `
    padding-left: `.concat(f, `px;
    padding-top: `).concat(d, `px;
    padding-right: `).concat(m, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(g, "px ").concat(o, `;
    `),
    c === "padding" && "padding-right: ".concat(g, "px ").concat(o, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(vo, ` {
    right: `).concat(g, "px ").concat(o, `;
  }
  
  .`).concat(yo, ` {
    margin-right: `).concat(g, "px ").concat(o, `;
  }
  
  .`).concat(vo, " .").concat(vo, ` {
    right: 0 `).concat(o, `;
  }
  
  .`).concat(yo, " .").concat(yo, ` {
    margin-right: 0 `).concat(o, `;
  }
  
  body[`).concat(ru, `] {
    `).concat(Kx, ": ").concat(g, `px;
  }
`);
}, pv = function() {
  var u = parseInt(document.body.getAttribute(ru) || "0", 10);
  return isFinite(u) ? u : 0;
}, d1 = function() {
  z.useEffect(function() {
    return document.body.setAttribute(ru, (pv() + 1).toString()), function() {
      var u = pv() - 1;
      u <= 0 ? document.body.removeAttribute(ru) : document.body.setAttribute(ru, u.toString());
    };
  }, []);
}, h1 = function(u) {
  var r = u.noRelative, c = u.noImportant, o = u.gapMode, f = o === void 0 ? "margin" : o;
  d1();
  var d = z.useMemo(function() {
    return o1(f);
  }, [f]);
  return z.createElement(s1, { styles: f1(d, !r, f, c ? "" : "!important") });
}, Od = !1;
if (typeof window < "u")
  try {
    var oo = Object.defineProperty({}, "passive", {
      get: function() {
        return Od = !0, !0;
      }
    });
    window.addEventListener("test", oo, oo), window.removeEventListener("test", oo, oo);
  } catch {
    Od = !1;
  }
var eu = Od ? { passive: !1 } : !1, m1 = function(u) {
  return u.tagName === "TEXTAREA";
}, Ry = function(u, r) {
  if (!(u instanceof Element))
    return !1;
  var c = window.getComputedStyle(u);
  return (
    // not-not-scrollable
    c[r] !== "hidden" && // contains scroll inside self
    !(c.overflowY === c.overflowX && !m1(u) && c[r] === "visible")
  );
}, p1 = function(u) {
  return Ry(u, "overflowY");
}, g1 = function(u) {
  return Ry(u, "overflowX");
}, gv = function(u, r) {
  var c = r.ownerDocument, o = r;
  do {
    typeof ShadowRoot < "u" && o instanceof ShadowRoot && (o = o.host);
    var f = Cy(u, o);
    if (f) {
      var d = wy(u, o), m = d[1], g = d[2];
      if (m > g)
        return !0;
    }
    o = o.parentNode;
  } while (o && o !== c.body);
  return !1;
}, v1 = function(u) {
  var r = u.scrollTop, c = u.scrollHeight, o = u.clientHeight;
  return [
    r,
    c,
    o
  ];
}, y1 = function(u) {
  var r = u.scrollLeft, c = u.scrollWidth, o = u.clientWidth;
  return [
    r,
    c,
    o
  ];
}, Cy = function(u, r) {
  return u === "v" ? p1(r) : g1(r);
}, wy = function(u, r) {
  return u === "v" ? v1(r) : y1(r);
}, b1 = function(u, r) {
  return u === "h" && r === "rtl" ? -1 : 1;
}, S1 = function(u, r, c, o, f) {
  var d = b1(u, window.getComputedStyle(r).direction), m = d * o, g = c.target, S = r.contains(g), T = !1, A = m > 0, y = 0, C = 0;
  do {
    if (!g)
      break;
    var q = wy(u, g), H = q[0], B = q[1], j = q[2], Q = B - j - d * H;
    (H || Q) && Cy(u, g) && (y += Q, C += H);
    var Z = g.parentNode;
    g = Z && Z.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? Z.host : Z;
  } while (
    // portaled content
    !S && g !== document.body || // self content
    S && (r.contains(g) || r === g)
  );
  return (A && Math.abs(y) < 1 || !A && Math.abs(C) < 1) && (T = !0), T;
}, so = function(u) {
  return "changedTouches" in u ? [u.changedTouches[0].clientX, u.changedTouches[0].clientY] : [0, 0];
}, vv = function(u) {
  return [u.deltaX, u.deltaY];
}, yv = function(u) {
  return u && "current" in u ? u.current : u;
}, x1 = function(u, r) {
  return u[0] === r[0] && u[1] === r[1];
}, E1 = function(u) {
  return `
  .block-interactivity-`.concat(u, ` {pointer-events: none;}
  .allow-interactivity-`).concat(u, ` {pointer-events: all;}
`);
}, T1 = 0, tu = [];
function _1(u) {
  var r = z.useRef([]), c = z.useRef([0, 0]), o = z.useRef(), f = z.useState(T1++)[0], d = z.useState(Ny)[0], m = z.useRef(u);
  z.useEffect(function() {
    m.current = u;
  }, [u]), z.useEffect(function() {
    if (u.inert) {
      document.body.classList.add("block-interactivity-".concat(f));
      var B = Qx([u.lockRef.current], (u.shards || []).map(yv), !0).filter(Boolean);
      return B.forEach(function(j) {
        return j.classList.add("allow-interactivity-".concat(f));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(f)), B.forEach(function(j) {
          return j.classList.remove("allow-interactivity-".concat(f));
        });
      };
    }
  }, [u.inert, u.lockRef.current, u.shards]);
  var g = z.useCallback(function(B, j) {
    if ("touches" in B && B.touches.length === 2 || B.type === "wheel" && B.ctrlKey)
      return !m.current.allowPinchZoom;
    var Q = so(B), Z = c.current, ae = "deltaX" in B ? B.deltaX : Z[0] - Q[0], ie = "deltaY" in B ? B.deltaY : Z[1] - Q[1], W, se = B.target, ee = Math.abs(ae) > Math.abs(ie) ? "h" : "v";
    if ("touches" in B && ee === "h" && se.type === "range")
      return !1;
    var he = window.getSelection(), Pe = he && he.anchorNode, Ae = Pe ? Pe === se || Pe.contains(se) : !1;
    if (Ae)
      return !1;
    var De = gv(ee, se);
    if (!De)
      return !0;
    if (De ? W = ee : (W = ee === "v" ? "h" : "v", De = gv(ee, se)), !De)
      return !1;
    if (!o.current && "changedTouches" in B && (ae || ie) && (o.current = W), !W)
      return !0;
    var I = o.current || W;
    return S1(I, j, B, I === "h" ? ae : ie);
  }, []), S = z.useCallback(function(B) {
    var j = B;
    if (!(!tu.length || tu[tu.length - 1] !== d)) {
      var Q = "deltaY" in j ? vv(j) : so(j), Z = r.current.filter(function(W) {
        return W.name === j.type && (W.target === j.target || j.target === W.shadowParent) && x1(W.delta, Q);
      })[0];
      if (Z && Z.should) {
        j.cancelable && j.preventDefault();
        return;
      }
      if (!Z) {
        var ae = (m.current.shards || []).map(yv).filter(Boolean).filter(function(W) {
          return W.contains(j.target);
        }), ie = ae.length > 0 ? g(j, ae[0]) : !m.current.noIsolation;
        ie && j.cancelable && j.preventDefault();
      }
    }
  }, []), T = z.useCallback(function(B, j, Q, Z) {
    var ae = { name: B, delta: j, target: Q, should: Z, shadowParent: A1(Q) };
    r.current.push(ae), setTimeout(function() {
      r.current = r.current.filter(function(ie) {
        return ie !== ae;
      });
    }, 1);
  }, []), A = z.useCallback(function(B) {
    c.current = so(B), o.current = void 0;
  }, []), y = z.useCallback(function(B) {
    T(B.type, vv(B), B.target, g(B, u.lockRef.current));
  }, []), C = z.useCallback(function(B) {
    T(B.type, so(B), B.target, g(B, u.lockRef.current));
  }, []);
  z.useEffect(function() {
    return tu.push(d), u.setCallbacks({
      onScrollCapture: y,
      onWheelCapture: y,
      onTouchMoveCapture: C
    }), document.addEventListener("wheel", S, eu), document.addEventListener("touchmove", S, eu), document.addEventListener("touchstart", A, eu), function() {
      tu = tu.filter(function(B) {
        return B !== d;
      }), document.removeEventListener("wheel", S, eu), document.removeEventListener("touchmove", S, eu), document.removeEventListener("touchstart", A, eu);
    };
  }, []);
  var q = u.removeScrollBar, H = u.inert;
  return z.createElement(
    z.Fragment,
    null,
    H ? z.createElement(d, { styles: E1(f) }) : null,
    q ? z.createElement(h1, { noRelative: u.noRelative, gapMode: u.gapMode }) : null
  );
}
function A1(u) {
  for (var r = null; u !== null; )
    u instanceof ShadowRoot && (r = u.host, u = u.host), u = u.parentNode;
  return r;
}
const O1 = e1(Oy, _1);
var zy = z.forwardRef(function(u, r) {
  return z.createElement(_o, dl({}, u, { ref: r, sideCar: O1 }));
});
zy.classNames = _o.classNames;
var N1 = function(u) {
  if (typeof document > "u")
    return null;
  var r = Array.isArray(u) ? u[0] : u;
  return r.ownerDocument.body;
}, nu = /* @__PURE__ */ new WeakMap(), fo = /* @__PURE__ */ new WeakMap(), ho = {}, od = 0, Dy = function(u) {
  return u && (u.host || Dy(u.parentNode));
}, R1 = function(u, r) {
  return r.map(function(c) {
    if (u.contains(c))
      return c;
    var o = Dy(c);
    return o && u.contains(o) ? o : (console.error("aria-hidden", c, "in not contained inside", u, ". Doing nothing"), null);
  }).filter(function(c) {
    return !!c;
  });
}, C1 = function(u, r, c, o) {
  var f = R1(r, Array.isArray(u) ? u : [u]);
  ho[c] || (ho[c] = /* @__PURE__ */ new WeakMap());
  var d = ho[c], m = [], g = /* @__PURE__ */ new Set(), S = new Set(f), T = function(y) {
    !y || g.has(y) || (g.add(y), T(y.parentNode));
  };
  f.forEach(T);
  var A = function(y) {
    !y || S.has(y) || Array.prototype.forEach.call(y.children, function(C) {
      if (g.has(C))
        A(C);
      else
        try {
          var q = C.getAttribute(o), H = q !== null && q !== "false", B = (nu.get(C) || 0) + 1, j = (d.get(C) || 0) + 1;
          nu.set(C, B), d.set(C, j), m.push(C), B === 1 && H && fo.set(C, !0), j === 1 && C.setAttribute(c, "true"), H || C.setAttribute(o, "true");
        } catch (Q) {
          console.error("aria-hidden: cannot operate on ", C, Q);
        }
    });
  };
  return A(r), g.clear(), od++, function() {
    m.forEach(function(y) {
      var C = nu.get(y) - 1, q = d.get(y) - 1;
      nu.set(y, C), d.set(y, q), C || (fo.has(y) || y.removeAttribute(o), fo.delete(y)), q || y.removeAttribute(c);
    }), od--, od || (nu = /* @__PURE__ */ new WeakMap(), nu = /* @__PURE__ */ new WeakMap(), fo = /* @__PURE__ */ new WeakMap(), ho = {});
  };
}, w1 = function(u, r, c) {
  c === void 0 && (c = "data-aria-hidden");
  var o = Array.from(Array.isArray(u) ? u : [u]), f = N1(u);
  return f ? (o.push.apply(o, Array.from(f.querySelectorAll("[aria-live], script"))), C1(o, f, c, "aria-hidden")) : function() {
    return null;
  };
}, z1 = Object.defineProperty, wn = (u, r) => z1(u, "name", { value: r, configurable: !0 }), qd = "Dialog", [My, A_] = /* @__PURE__ */ Pv(qd), [D1, hl] = My(qd), M1 = /* @__PURE__ */ wn((u) => {
  const {
    __scopeDialog: r,
    children: c,
    open: o,
    defaultOpen: f,
    onOpenChange: d,
    modal: m = !0
  } = u, g = z.useRef(null), S = z.useRef(null), [T, A] = ty({
    prop: o,
    defaultProp: f ?? !1,
    onChange: d,
    caller: qd
  }), [y, C] = z.useState(0), [q, H] = z.useState(0);
  return /* @__PURE__ */ p.jsx(
    D1,
    {
      scope: r,
      triggerRef: g,
      contentRef: S,
      contentId: go(),
      titleId: go(),
      descriptionId: go(),
      titlePresent: y > 0,
      descriptionPresent: q > 0,
      setTitleCount: C,
      setDescriptionCount: H,
      open: T,
      onOpenChange: A,
      onOpenToggle: z.useCallback(() => A((B) => !B), [A]),
      modal: m,
      children: c
    }
  );
}, "Dialog"), jy = "DialogPortal", [j1, Uy] = My(jy, {
  forceMount: void 0
}), U1 = /* @__PURE__ */ wn((u) => {
  const { __scopeDialog: r, forceMount: c, children: o, container: f } = u, d = hl(jy, r);
  return /* @__PURE__ */ p.jsx(j1, { scope: r, forceMount: c, children: z.Children.map(o, (m) => /* @__PURE__ */ p.jsx(Bd, { present: c || d.open, children: /* @__PURE__ */ p.jsx(Yx, { asChild: !0, container: f, children: m }) })) });
}, "DialogPortal"), Nd = "DialogOverlay", ky = /* @__PURE__ */ z.forwardRef(
  /* @__PURE__ */ wn(function(r, c) {
    const o = Uy(Nd, r.__scopeDialog), { forceMount: f = o.forceMount, ...d } = r, m = hl(Nd, r.__scopeDialog);
    return m.modal ? /* @__PURE__ */ p.jsx(Bd, { present: f || m.open, children: /* @__PURE__ */ p.jsx(L1, { ...d, ref: c }) }) : null;
  }, "DialogOverlay")
), k1 = /* @__PURE__ */ To("DialogOverlay.RemoveScroll"), L1 = /* @__PURE__ */ z.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ wn(function(r, c) {
    const { __scopeDialog: o, ...f } = r, d = hl(Nd, o), m = fy(), g = hu(c, m);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ p.jsx(zy, { as: k1, allowPinchZoom: !0, shards: [d.contentRef], children: /* @__PURE__ */ p.jsx(
        Ta.div,
        {
          "data-state": Vd(d.open),
          ...f,
          ref: g,
          style: { pointerEvents: "auto", ...f.style }
        }
      ) })
    );
  }, "DialogOverlayImpl")
), _r = "DialogContent", Ly = /* @__PURE__ */ z.forwardRef(
  /* @__PURE__ */ wn(function(r, c) {
    const o = Uy(_r, r.__scopeDialog), { forceMount: f = o.forceMount, ...d } = r, m = hl(_r, r.__scopeDialog);
    return /* @__PURE__ */ p.jsx(Bd, { present: f || m.open, children: m.modal ? /* @__PURE__ */ p.jsx(H1, { ...d, ref: c }) : /* @__PURE__ */ p.jsx(B1, { ...d, ref: c }) });
  }, "DialogContent")
), H1 = /* @__PURE__ */ z.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ wn(function(r, c) {
    const o = hl(_r, r.__scopeDialog), f = z.useRef(null), d = hu(c, o.contentRef, f);
    return z.useEffect(() => {
      const m = f.current;
      if (m) return w1(m);
    }, []), /* @__PURE__ */ p.jsx(
      Hy,
      {
        ...r,
        ref: d,
        trapFocus: o.open,
        disableOutsidePointerEvents: o.open,
        onCloseAutoFocus: Sa(r.onCloseAutoFocus, (m) => {
          m.preventDefault(), o.triggerRef.current?.focus();
        }),
        onPointerDownOutside: Sa(r.onPointerDownOutside, (m) => {
          const g = m.detail.originalEvent, S = g.button === 0 && g.ctrlKey === !0;
          (g.button === 2 || S) && m.preventDefault();
        }),
        onFocusOutside: Sa(
          r.onFocusOutside,
          (m) => m.preventDefault()
        )
      }
    );
  }, "DialogContentModal")
), B1 = /* @__PURE__ */ z.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ wn(function(r, c) {
    const o = hl(_r, r.__scopeDialog), f = z.useRef(!1), d = z.useRef(!1);
    return /* @__PURE__ */ p.jsx(
      Hy,
      {
        ...r,
        ref: c,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (m) => {
          r.onCloseAutoFocus?.(m), m.defaultPrevented || (f.current || o.triggerRef.current?.focus(), m.preventDefault()), f.current = !1, d.current = !1;
        },
        onInteractOutside: (m) => {
          r.onInteractOutside?.(m), m.defaultPrevented || (f.current = !0, m.detail.originalEvent.type === "pointerdown" && (d.current = !0));
          const g = m.target;
          o.triggerRef.current?.contains(g) && m.preventDefault(), m.detail.originalEvent.type === "focusin" && d.current && m.preventDefault();
        }
      }
    );
  }, "DialogContentNonModal")
), Hy = /* @__PURE__ */ z.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ wn(function(r, c) {
    const { __scopeDialog: o, trapFocus: f, onOpenAutoFocus: d, onCloseAutoFocus: m, ...g } = r, S = hl(_r, o);
    return Yd(), /* @__PURE__ */ p.jsx(p.Fragment, { children: /* @__PURE__ */ p.jsx(
      Hx,
      {
        asChild: !0,
        loop: !0,
        trapped: f,
        onMountAutoFocus: d,
        onUnmountAutoFocus: m,
        children: /* @__PURE__ */ p.jsx(
          Ux,
          {
            role: "dialog",
            id: S.contentId,
            "aria-describedby": S.descriptionPresent ? S.descriptionId : void 0,
            "aria-labelledby": S.titlePresent ? S.titleId : void 0,
            "data-state": Vd(S.open),
            ...g,
            ref: c,
            deferPointerDownOutside: !0,
            onDismiss: () => S.onOpenChange(!1)
          }
        )
      }
    ) });
  }, "DialogContentImpl")
), G1 = "DialogTitle", By = /* @__PURE__ */ z.forwardRef(
  /* @__PURE__ */ wn(function(r, c) {
    const { __scopeDialog: o, ...f } = r, d = hl(G1, o), { setTitleCount: m } = d;
    return Ea(() => (m((g) => g + 1), () => m((g) => g - 1)), [m]), /* @__PURE__ */ p.jsx(Ta.h2, { id: d.titleId, ...f, ref: c });
  }, "DialogTitle")
), Y1 = "DialogDescription", Gy = /* @__PURE__ */ z.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ wn(function(r, c) {
    const { __scopeDialog: o, ...f } = r, d = hl(Y1, o), { setDescriptionCount: m } = d;
    return Ea(() => (m((g) => g + 1), () => m((g) => g - 1)), [m]), /* @__PURE__ */ p.jsx(Ta.p, { id: d.descriptionId, ...f, ref: c });
  }, "DialogDescription")
), q1 = "DialogClose", V1 = /* @__PURE__ */ z.forwardRef(
  /* @__PURE__ */ wn(function(r, c) {
    const { __scopeDialog: o, ...f } = r, d = hl(q1, o);
    return /* @__PURE__ */ p.jsx(
      Ta.button,
      {
        type: "button",
        ...f,
        ref: c,
        onClick: Sa(r.onClick, () => d.onOpenChange(!1))
      }
    );
  }, "DialogClose")
);
function Vd(u) {
  return u ? "open" : "closed";
}
wn(Vd, "getState");
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X1 = (u) => u.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Yy = (...u) => u.filter((r, c, o) => !!r && r.trim() !== "" && o.indexOf(r) === c).join(" ").trim();
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Q1 = {
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
const Z1 = z.forwardRef(
  ({
    color: u = "currentColor",
    size: r = 24,
    strokeWidth: c = 2,
    absoluteStrokeWidth: o,
    className: f = "",
    children: d,
    iconNode: m,
    ...g
  }, S) => z.createElement(
    "svg",
    {
      ref: S,
      ...Q1,
      width: r,
      height: r,
      stroke: u,
      strokeWidth: o ? Number(c) * 24 / Number(r) : c,
      className: Yy("lucide", f),
      ...g
    },
    [
      ...m.map(([T, A]) => z.createElement(T, A)),
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
const K1 = (u, r) => {
  const c = z.forwardRef(
    ({ className: o, ...f }, d) => z.createElement(Z1, {
      ref: d,
      iconNode: r,
      className: Yy(`lucide-${X1(u)}`, o),
      ...f
    })
  );
  return c.displayName = `${u}`, c;
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J1 = K1("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
function qy(u) {
  var r, c, o = "";
  if (typeof u == "string" || typeof u == "number") o += u;
  else if (typeof u == "object") if (Array.isArray(u)) {
    var f = u.length;
    for (r = 0; r < f; r++) u[r] && (c = qy(u[r])) && (o && (o += " "), o += c);
  } else for (c in u) u[c] && (o && (o += " "), o += c);
  return o;
}
function Vy() {
  for (var u, r, c = 0, o = "", f = arguments.length; c < f; c++) (u = arguments[c]) && (r = qy(u)) && (o && (o += " "), o += r);
  return o;
}
const Xd = "-", $1 = (u) => {
  const r = F1(u), {
    conflictingClassGroups: c,
    conflictingClassGroupModifiers: o
  } = u;
  return {
    getClassGroupId: (m) => {
      const g = m.split(Xd);
      return g[0] === "" && g.length !== 1 && g.shift(), Xy(g, r) || I1(m);
    },
    getConflictingClassGroupIds: (m, g) => {
      const S = c[m] || [];
      return g && o[m] ? [...S, ...o[m]] : S;
    }
  };
}, Xy = (u, r) => {
  if (u.length === 0)
    return r.classGroupId;
  const c = u[0], o = r.nextPart.get(c), f = o ? Xy(u.slice(1), o) : void 0;
  if (f)
    return f;
  if (r.validators.length === 0)
    return;
  const d = u.join(Xd);
  return r.validators.find(({
    validator: m
  }) => m(d))?.classGroupId;
}, bv = /^\[(.+)\]$/, I1 = (u) => {
  if (bv.test(u)) {
    const r = bv.exec(u)[1], c = r?.substring(0, r.indexOf(":"));
    if (c)
      return "arbitrary.." + c;
  }
}, F1 = (u) => {
  const {
    theme: r,
    prefix: c
  } = u, o = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return W1(Object.entries(u.classGroups), c).forEach(([d, m]) => {
    Rd(m, o, d, r);
  }), o;
}, Rd = (u, r, c, o) => {
  u.forEach((f) => {
    if (typeof f == "string") {
      const d = f === "" ? r : Sv(r, f);
      d.classGroupId = c;
      return;
    }
    if (typeof f == "function") {
      if (P1(f)) {
        Rd(f(o), r, c, o);
        return;
      }
      r.validators.push({
        validator: f,
        classGroupId: c
      });
      return;
    }
    Object.entries(f).forEach(([d, m]) => {
      Rd(m, Sv(r, d), c, o);
    });
  });
}, Sv = (u, r) => {
  let c = u;
  return r.split(Xd).forEach((o) => {
    c.nextPart.has(o) || c.nextPart.set(o, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), c = c.nextPart.get(o);
  }), c;
}, P1 = (u) => u.isThemeGetter, W1 = (u, r) => r ? u.map(([c, o]) => {
  const f = o.map((d) => typeof d == "string" ? r + d : typeof d == "object" ? Object.fromEntries(Object.entries(d).map(([m, g]) => [r + m, g])) : d);
  return [c, f];
}) : u, eE = (u) => {
  if (u < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let r = 0, c = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  const f = (d, m) => {
    c.set(d, m), r++, r > u && (r = 0, o = c, c = /* @__PURE__ */ new Map());
  };
  return {
    get(d) {
      let m = c.get(d);
      if (m !== void 0)
        return m;
      if ((m = o.get(d)) !== void 0)
        return f(d, m), m;
    },
    set(d, m) {
      c.has(d) ? c.set(d, m) : f(d, m);
    }
  };
}, Qy = "!", tE = (u) => {
  const {
    separator: r,
    experimentalParseClassName: c
  } = u, o = r.length === 1, f = r[0], d = r.length, m = (g) => {
    const S = [];
    let T = 0, A = 0, y;
    for (let j = 0; j < g.length; j++) {
      let Q = g[j];
      if (T === 0) {
        if (Q === f && (o || g.slice(j, j + d) === r)) {
          S.push(g.slice(A, j)), A = j + d;
          continue;
        }
        if (Q === "/") {
          y = j;
          continue;
        }
      }
      Q === "[" ? T++ : Q === "]" && T--;
    }
    const C = S.length === 0 ? g : g.substring(A), q = C.startsWith(Qy), H = q ? C.substring(1) : C, B = y && y > A ? y - A : void 0;
    return {
      modifiers: S,
      hasImportantModifier: q,
      baseClassName: H,
      maybePostfixModifierPosition: B
    };
  };
  return c ? (g) => c({
    className: g,
    parseClassName: m
  }) : m;
}, nE = (u) => {
  if (u.length <= 1)
    return u;
  const r = [];
  let c = [];
  return u.forEach((o) => {
    o[0] === "[" ? (r.push(...c.sort(), o), c = []) : c.push(o);
  }), r.push(...c.sort()), r;
}, lE = (u) => ({
  cache: eE(u.cacheSize),
  parseClassName: tE(u),
  ...$1(u)
}), aE = /\s+/, iE = (u, r) => {
  const {
    parseClassName: c,
    getClassGroupId: o,
    getConflictingClassGroupIds: f
  } = r, d = [], m = u.trim().split(aE);
  let g = "";
  for (let S = m.length - 1; S >= 0; S -= 1) {
    const T = m[S], {
      modifiers: A,
      hasImportantModifier: y,
      baseClassName: C,
      maybePostfixModifierPosition: q
    } = c(T);
    let H = !!q, B = o(H ? C.substring(0, q) : C);
    if (!B) {
      if (!H) {
        g = T + (g.length > 0 ? " " + g : g);
        continue;
      }
      if (B = o(C), !B) {
        g = T + (g.length > 0 ? " " + g : g);
        continue;
      }
      H = !1;
    }
    const j = nE(A).join(":"), Q = y ? j + Qy : j, Z = Q + B;
    if (d.includes(Z))
      continue;
    d.push(Z);
    const ae = f(B, H);
    for (let ie = 0; ie < ae.length; ++ie) {
      const W = ae[ie];
      d.push(Q + W);
    }
    g = T + (g.length > 0 ? " " + g : g);
  }
  return g;
};
function uE() {
  let u = 0, r, c, o = "";
  for (; u < arguments.length; )
    (r = arguments[u++]) && (c = Zy(r)) && (o && (o += " "), o += c);
  return o;
}
const Zy = (u) => {
  if (typeof u == "string")
    return u;
  let r, c = "";
  for (let o = 0; o < u.length; o++)
    u[o] && (r = Zy(u[o])) && (c && (c += " "), c += r);
  return c;
};
function rE(u, ...r) {
  let c, o, f, d = m;
  function m(S) {
    const T = r.reduce((A, y) => y(A), u());
    return c = lE(T), o = c.cache.get, f = c.cache.set, d = g, g(S);
  }
  function g(S) {
    const T = o(S);
    if (T)
      return T;
    const A = iE(S, c);
    return f(S, A), A;
  }
  return function() {
    return d(uE.apply(null, arguments));
  };
}
const et = (u) => {
  const r = (c) => c[u] || [];
  return r.isThemeGetter = !0, r;
}, Ky = /^\[(?:([a-z-]+):)?(.+)\]$/i, cE = /^\d+\/\d+$/, oE = /* @__PURE__ */ new Set(["px", "full", "screen"]), sE = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, fE = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, dE = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, hE = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, mE = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, zl = (u) => cu(u) || oE.has(u) || cE.test(u), ga = (u) => mu(u, "length", EE), cu = (u) => !!u && !Number.isNaN(Number(u)), sd = (u) => mu(u, "number", cu), gr = (u) => !!u && Number.isInteger(Number(u)), pE = (u) => u.endsWith("%") && cu(u.slice(0, -1)), ve = (u) => Ky.test(u), va = (u) => sE.test(u), gE = /* @__PURE__ */ new Set(["length", "size", "percentage"]), vE = (u) => mu(u, gE, Jy), yE = (u) => mu(u, "position", Jy), bE = /* @__PURE__ */ new Set(["image", "url"]), SE = (u) => mu(u, bE, _E), xE = (u) => mu(u, "", TE), vr = () => !0, mu = (u, r, c) => {
  const o = Ky.exec(u);
  return o ? o[1] ? typeof r == "string" ? o[1] === r : r.has(o[1]) : c(o[2]) : !1;
}, EE = (u) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  fE.test(u) && !dE.test(u)
), Jy = () => !1, TE = (u) => hE.test(u), _E = (u) => mE.test(u), AE = () => {
  const u = et("colors"), r = et("spacing"), c = et("blur"), o = et("brightness"), f = et("borderColor"), d = et("borderRadius"), m = et("borderSpacing"), g = et("borderWidth"), S = et("contrast"), T = et("grayscale"), A = et("hueRotate"), y = et("invert"), C = et("gap"), q = et("gradientColorStops"), H = et("gradientColorStopPositions"), B = et("inset"), j = et("margin"), Q = et("opacity"), Z = et("padding"), ae = et("saturate"), ie = et("scale"), W = et("sepia"), se = et("skew"), ee = et("space"), he = et("translate"), Pe = () => ["auto", "contain", "none"], Ae = () => ["auto", "hidden", "clip", "visible", "scroll"], De = () => ["auto", ve, r], I = () => [ve, r], St = () => ["", zl, ga], ot = () => ["auto", cu, ve], Je = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], V = () => ["solid", "dashed", "dotted", "double", "none"], ue = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], re = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], Se = () => ["", "0", ve], xe = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], tt = () => [cu, ve];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [vr],
      spacing: [zl, ga],
      blur: ["none", "", va, ve],
      brightness: tt(),
      borderColor: [u],
      borderRadius: ["none", "", "full", va, ve],
      borderSpacing: I(),
      borderWidth: St(),
      contrast: tt(),
      grayscale: Se(),
      hueRotate: tt(),
      invert: Se(),
      gap: I(),
      gradientColorStops: [u],
      gradientColorStopPositions: [pE, ga],
      inset: De(),
      margin: De(),
      opacity: tt(),
      padding: I(),
      saturate: tt(),
      scale: tt(),
      sepia: Se(),
      skew: tt(),
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
        columns: [va]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": xe()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": xe()
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
        object: [...Je(), ve]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: Ae()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": Ae()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": Ae()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: Pe()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": Pe()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": Pe()
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
        z: ["auto", gr, ve]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: De()
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
        order: ["first", "last", "none", gr, ve]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [vr]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", gr, ve]
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
        "grid-rows": [vr]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [gr, ve]
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
        gap: [C]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [C]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [C]
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
          screen: [va]
        }, va]
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
        text: ["base", va, ga]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", sd]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [vr]
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
        "line-clamp": ["none", cu, sd]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", zl, ve]
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
        decoration: ["auto", "from-font", zl, ga]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", zl, ve]
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
        bg: [...Je(), yE]
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
        bg: ["auto", "cover", "contain", vE]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, SE]
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
        border: [g]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [g]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [g]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [g]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [g]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [g]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [g]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [g]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [g]
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
        "divide-x": [g]
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
        "divide-y": [g]
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
        "outline-offset": [zl, ve]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [zl, ga]
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
        ring: St()
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
        "ring-offset": [zl, ga]
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
        shadow: ["", "inner", "none", va, xE]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [vr]
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
        blur: [c]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [o]
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
        "drop-shadow": ["", "none", va, ve]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [T]
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
        invert: [y]
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
        "backdrop-blur": [c]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [o]
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
        "backdrop-grayscale": [T]
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
        "backdrop-invert": [y]
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
        duration: tt()
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
        delay: tt()
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
        rotate: [gr, ve]
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
        stroke: [zl, ga, sd]
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
}, OE = /* @__PURE__ */ rE(AE);
function Kn(...u) {
  return OE(Vy(u));
}
const NE = M1, RE = U1, $y = z.forwardRef(({ className: u, ...r }, c) => /* @__PURE__ */ p.jsx(
  ky,
  {
    ref: c,
    className: Kn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      u
    ),
    ...r
  }
));
$y.displayName = ky.displayName;
const Iy = z.forwardRef(({ className: u, children: r, closeLabel: c = "Close", ...o }, f) => /* @__PURE__ */ p.jsxs(RE, { children: [
  /* @__PURE__ */ p.jsx($y, {}),
  /* @__PURE__ */ p.jsxs(
    Ly,
    {
      ref: f,
      className: Kn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        u
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ p.jsxs(V1, { "aria-label": c, title: c, className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ p.jsx(J1, { className: "h-4 w-4" }),
          /* @__PURE__ */ p.jsx("span", { className: "sr-only", children: c })
        ] })
      ]
    }
  )
] }));
Iy.displayName = Ly.displayName;
const Fy = z.forwardRef(({ className: u, ...r }, c) => /* @__PURE__ */ p.jsx(
  By,
  {
    ref: c,
    className: Kn(
      "text-lg font-semibold leading-none tracking-tight",
      u
    ),
    ...r
  }
));
Fy.displayName = By.displayName;
const CE = z.forwardRef(({ className: u, ...r }, c) => /* @__PURE__ */ p.jsx(
  Gy,
  {
    ref: c,
    className: Kn("text-sm text-muted-foreground", u),
    ...r
  }
));
CE.displayName = Gy.displayName;
const xv = (u) => typeof u == "boolean" ? `${u}` : u === 0 ? "0" : u, Ev = Vy, Py = (u, r) => (c) => {
  var o;
  if (r?.variants == null) return Ev(u, c?.class, c?.className);
  const { variants: f, defaultVariants: d } = r, m = Object.keys(f).map((T) => {
    const A = c?.[T], y = d?.[T];
    if (A === null) return null;
    const C = xv(A) || xv(y);
    return f[T][C];
  }), g = c && Object.entries(c).reduce((T, A) => {
    let [y, C] = A;
    return C === void 0 || (T[y] = C), T;
  }, {}), S = r == null || (o = r.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((T, A) => {
    let { class: y, className: C, ...q } = A;
    return Object.entries(q).every((H) => {
      let [B, j] = H;
      return Array.isArray(j) ? j.includes({
        ...d,
        ...g
      }[B]) : {
        ...d,
        ...g
      }[B] === j;
    }) ? [
      ...T,
      y,
      C
    ] : T;
  }, []);
  return Ev(u, m, S, c?.class, c?.className);
}, Wy = Py(
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
), _e = z.forwardRef(
  ({ className: u, variant: r, size: c, asChild: o = !1, ...f }, d) => {
    const m = o ? xx : "button";
    return /* @__PURE__ */ p.jsx(
      m,
      {
        className: Kn(Wy({ variant: r, size: c, className: u })),
        ref: d,
        ...f
      }
    );
  }
);
_e.displayName = "Button";
const xa = z.forwardRef(
  ({ className: u, type: r, ...c }, o) => /* @__PURE__ */ p.jsx(
    "input",
    {
      type: r,
      className: Kn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        u
      ),
      ref: o,
      ...c
    }
  )
);
xa.displayName = "Input";
const wE = z.memo(function() {
  return /* @__PURE__ */ p.jsxs("div", { id: "stage", children: [
    /* @__PURE__ */ p.jsxs("div", { id: "character", children: [
      /* @__PURE__ */ p.jsx("div", { id: "scene-background", "aria-hidden": "true" }),
      /* @__PURE__ */ p.jsx("video", { id: "layer-a", className: "char-layer", autoPlay: !0, muted: !0, loop: !0, playsInline: !0 }),
      /* @__PURE__ */ p.jsx("video", { id: "layer-b", className: "char-layer", autoPlay: !0, muted: !0, loop: !0, playsInline: !0 }),
      /* @__PURE__ */ p.jsx("img", { id: "layer-img", className: "char-layer", alt: "" }),
      /* @__PURE__ */ p.jsxs("div", { id: "placeholder", className: "hidden", children: [
        /* @__PURE__ */ p.jsx("svg", { viewBox: "0 0 200 260", "aria-hidden": "true", children: /* @__PURE__ */ p.jsx("path", { d: "M100 20a52 52 0 1 1 0 104 52 52 0 0 1 0-104zM30 260c0-62 31-100 70-100s70 38 70 100z" }) }),
        /* @__PURE__ */ p.jsxs("div", { id: "placeholder-text", children: [
          "No art yet — press ",
          /* @__PURE__ */ p.jsx("b", { children: "E" }),
          " for the image prompt"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ p.jsx("div", { id: "vignette" }),
    /* @__PURE__ */ p.jsxs("header", { id: "topbar", children: [
      /* @__PURE__ */ p.jsxs("div", { id: "title", children: [
        /* @__PURE__ */ p.jsx("img", { id: "logo", src: "./assets/logo.png", alt: "", width: 22, height: 22 }),
        "AIBO ",
        /* @__PURE__ */ p.jsx("span", { id: "conn-dot", title: "disconnected" })
      ] }),
      /* @__PURE__ */ p.jsxs("div", { className: "app-controls", children: [
        /* @__PURE__ */ p.jsx(_e, { id: "btn-help", type: "button", "data-ui-text": "help", variant: "ghost", "data-slot": "button", children: "帮助" }),
        /* @__PURE__ */ p.jsx(_e, { type: "button", id: "btn-char", title: "Switch character (⌥C)", variant: "ghost", "data-slot": "button", children: "CHAR" }),
        /* @__PURE__ */ p.jsx(_e, { type: "button", id: "btn-memory", title: "What I remember about you (⌥M)", variant: "ghost", "data-slot": "button", children: "MEMORY" }),
        /* @__PURE__ */ p.jsx(_e, { type: "button", id: "btn-artifacts", title: "Files she wrote for you (⌥F)", variant: "ghost", "data-slot": "button", children: "FILES" }),
        /* @__PURE__ */ p.jsx(_e, { type: "button", id: "btn-speech-settings", variant: "ghost", "data-slot": "button", children: "语音设置" }),
        /* @__PURE__ */ p.jsx(_e, { type: "button", id: "btn-hide", title: "Hide window (⌥H / right-click)", variant: "ghost", "data-slot": "button", children: "HIDE" })
      ] })
    ] }),
    /* @__PURE__ */ p.jsx("div", { id: "ticker", className: "hidden", children: /* @__PURE__ */ p.jsx("span", { id: "ticker-text" }) }),
    /* @__PURE__ */ p.jsxs("div", { id: "dialogue", children: [
      /* @__PURE__ */ p.jsxs("div", { id: "msgbox", children: [
        /* @__PURE__ */ p.jsxs("div", { id: "nameplate", children: [
          /* @__PURE__ */ p.jsx("span", { id: "char-name", children: "小黑鱼" }),
          /* @__PURE__ */ p.jsx("span", { id: "activity-tag" })
        ] }),
        /* @__PURE__ */ p.jsx("div", { id: "text-window", tabIndex: 0, children: /* @__PURE__ */ p.jsx("p", { id: "dialogue-text" }) }),
        /* @__PURE__ */ p.jsxs("div", { id: "message-tools", "aria-label": "当前消息操作", children: [
          /* @__PURE__ */ p.jsx(_e, { type: "button", id: "btn-skip", hidden: !0, variant: "ghost", "data-slot": "button", children: "回到最新" }),
          /* @__PURE__ */ p.jsx(_e, { type: "button", id: "btn-replay", disabled: !0, variant: "ghost", "data-slot": "button", children: "重读本段" }),
          /* @__PURE__ */ p.jsx(_e, { type: "button", id: "btn-stop-voice", disabled: !0, variant: "ghost", "data-slot": "button", children: "停止朗读" }),
          /* @__PURE__ */ p.jsx("div", { id: "voice-feedback", role: "status", "aria-live": "polite" })
        ] })
      ] }),
      /* @__PURE__ */ p.jsxs("div", { id: "box-bottom", children: [
        /* @__PURE__ */ p.jsxs("form", { id: "input-row", autoComplete: "off", children: [
          /* @__PURE__ */ p.jsx(xa, { id: "input", type: "text", placeholder: "Say something… (/help for commands)", spellCheck: !1 }),
          /* @__PURE__ */ p.jsx(_e, { id: "btn-send", type: "submit", variant: "default", "data-slot": "button", children: "SEND" })
        ] }),
        /* @__PURE__ */ p.jsx("nav", { id: "menu-row", "aria-label": "对话与应用控制", children: /* @__PURE__ */ p.jsx("div", { className: "conversation-controls", children: /* @__PURE__ */ p.jsx(_e, { type: "button", id: "btn-history", title: "Backlog (⌥L)", variant: "ghost", "data-slot": "button", children: "LOG" }) }) }),
        /* @__PURE__ */ p.jsx("div", { id: "ui-notice", role: "status", "aria-live": "polite" }),
        /* @__PURE__ */ p.jsx("span", { id: "language-hint", className: "sr-only" })
      ] }),
      /* @__PURE__ */ p.jsxs("div", { id: "last-user", className: "hidden", children: [
        /* @__PURE__ */ p.jsx("span", { className: "you-label", children: "You" }),
        /* @__PURE__ */ p.jsx("span", { id: "last-user-text" })
      ] })
    ] }),
    /* @__PURE__ */ p.jsx(_e, { id: "btn-restore", type: "button", "data-ui-text": "restore", variant: "ghost", "data-slot": "button", children: "返回对话" })
  ] });
}), iu = z.forwardRef(({ className: u, ...r }, c) => /* @__PURE__ */ p.jsx(
  "textarea",
  {
    className: Kn(
      "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      u
    ),
    ref: c,
    ...r
  }
));
iu.displayName = "Textarea";
var zE = Object.defineProperty, DE = (u, r) => zE(u, "name", { value: r, configurable: !0 }), ME = /* @__PURE__ */ z.forwardRef(
  /* @__PURE__ */ DE(function(r, c) {
    return /* @__PURE__ */ p.jsx(
      Ta.label,
      {
        ...r,
        ref: c,
        onMouseDown: (o) => {
          o.target.closest("button, input, select, textarea") || (r.onMouseDown?.(o), !o.defaultPrevented && o.detail > 1 && o.preventDefault());
        }
      }
    );
  }, "Label")
), eb = ME;
const jE = Py(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
), At = z.forwardRef(({ className: u, ...r }, c) => /* @__PURE__ */ p.jsx(
  eb,
  {
    ref: c,
    className: Kn(jE(), u),
    ...r
  }
));
At.displayName = eb.displayName;
const Ml = z.forwardRef(({ className: u, ...r }, c) => /* @__PURE__ */ p.jsx("select", { ref: c, "data-slot": "native-select", className: Kn("flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50", u), ...r }));
Ml.displayName = "NativeSelect";
function Ve({ className: u, ...r }) {
  return /* @__PURE__ */ p.jsx(
    "kbd",
    {
      "data-slot": "kbd",
      className: Kn(
        "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium",
        "[&_svg:not([class*='size-'])]:size-3",
        "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        u
      ),
      ...r
    }
  );
}
function Zt({ className: u, ...r }) {
  return /* @__PURE__ */ p.jsx(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: Kn("inline-flex items-center gap-1", u),
      ...r
    }
  );
}
const UE = z.memo(function() {
  return /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsxs("div", { className: "overlay-head", children: [
      /* @__PURE__ */ p.jsx("span", { id: "character-hub-title", "data-layout-text": "character", children: "角色" }),
      /* @__PURE__ */ p.jsx(_e, { type: "button", className: "overlay-close", "data-layout-text": "close", hidden: !0, variant: "ghost", "data-slot": "button", children: "关闭 / ESC" })
    ] }),
    /* @__PURE__ */ p.jsxs("nav", { className: "character-tabs", "aria-label": "角色管理", children: [
      /* @__PURE__ */ p.jsx(_e, { type: "button", id: "btn-character-select", "data-character-view": "char-picker", "data-layout-text": "choose", variant: "ghost", "data-slot": "button", children: "选择角色" }),
      /* @__PURE__ */ p.jsx(_e, { type: "button", id: "btn-gallery", "data-character-view": "gallery", title: "Sprites & loops (⌥G)", variant: "ghost", "data-slot": "button", children: "GALLERY" }),
      /* @__PURE__ */ p.jsx(_e, { type: "button", id: "btn-edit", "data-character-view": "editor", title: "Persona (⌥E)", variant: "ghost", "data-slot": "button", children: "EDIT" })
    ] }),
    /* @__PURE__ */ p.jsx("div", { className: "character-display-settings", children: /* @__PURE__ */ p.jsxs(At, { className: "language-control", children: [
      /* @__PURE__ */ p.jsx("span", { "data-ui-text": "state", children: "表情预览" }),
      /* @__PURE__ */ p.jsxs(Ml, { id: "character-state-preview", "aria-label": "state", children: [
        /* @__PURE__ */ p.jsx("option", { value: "auto", children: "跟随对话" }),
        /* @__PURE__ */ p.jsx("option", { value: "idle", children: "待机" }),
        /* @__PURE__ */ p.jsx("option", { value: "reading", children: "在看" }),
        /* @__PURE__ */ p.jsx("option", { value: "writing", children: "在写" }),
        /* @__PURE__ */ p.jsx("option", { value: "searching", children: "在查" }),
        /* @__PURE__ */ p.jsx("option", { value: "running", children: "在跑命令" }),
        /* @__PURE__ */ p.jsx("option", { value: "waiting", children: "等你" }),
        /* @__PURE__ */ p.jsx("option", { value: "failed", children: "出错了" }),
        /* @__PURE__ */ p.jsx("option", { value: "done", children: "完成" })
      ] })
    ] }) }),
    /* @__PURE__ */ p.jsxs("div", { id: "char-picker", className: "character-view hidden", children: [
      /* @__PURE__ */ p.jsx("div", { id: "char-picker-head", children: "Character" }),
      /* @__PURE__ */ p.jsx("div", { id: "char-list" }),
      /* @__PURE__ */ p.jsxs("div", { id: "char-picker-foot", children: [
        /* @__PURE__ */ p.jsx(_e, { type: "button", id: "btn-import", title: "Import a character pack (.zip)", "data-ui-text": "import", variant: "ghost", "data-slot": "button", children: "Import pack…" }),
        /* @__PURE__ */ p.jsx(_e, { type: "button", id: "btn-export", title: "Download the current pack as .zip (memory stays local)", "data-ui-text": "export", variant: "ghost", "data-slot": "button", children: "Export pack" }),
        /* @__PURE__ */ p.jsx("input", { id: "import-file", type: "file", accept: ".zip,application/zip", hidden: !0 })
      ] })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { id: "editor", className: "character-view hidden", children: [
      /* @__PURE__ */ p.jsxs("div", { className: "overlay-head", children: [
        /* @__PURE__ */ p.jsx("span", { id: "editor-title", children: "Character" }),
        /* @__PURE__ */ p.jsx(_e, { type: "button", className: "overlay-close", "data-close": "editor", hidden: !0, variant: "ghost", "data-slot": "button", children: "Close" })
      ] }),
      /* @__PURE__ */ p.jsxs("form", { id: "editor-form", className: "overlay-body", children: [
        /* @__PURE__ */ p.jsxs(At, { children: [
          /* @__PURE__ */ p.jsx("span", { "data-ui-text": "ed-name", children: "名字" }),
          /* @__PURE__ */ p.jsx(xa, { id: "ed-name", type: "text", spellCheck: !1 })
        ] }),
        /* @__PURE__ */ p.jsxs(At, { children: [
          /* @__PURE__ */ p.jsx("span", { "data-ui-text": "ed-greeting", children: "开场白" }),
          /* @__PURE__ */ p.jsx(iu, { id: "ed-greeting", rows: 2 })
        ] }),
        /* @__PURE__ */ p.jsxs(At, { children: [
          /* @__PURE__ */ p.jsx("span", { "data-ui-text": "ed-persona", children: "人设" }),
          /* @__PURE__ */ p.jsx(iu, { id: "ed-persona", rows: 8 })
        ] }),
        /* @__PURE__ */ p.jsxs("div", { id: "ed-art", className: "hidden", children: [
          /* @__PURE__ */ p.jsxs("div", { className: "ed-art-head", children: [
            "This pack has no images yet. Generate them with any image model and drop six files into ",
            /* @__PURE__ */ p.jsx("code", { id: "ed-art-dir" }),
            ": neutral, happy, thinking, surprised, sad, excited (.png), optionally .mp4 loops with the same names."
          ] }),
          /* @__PURE__ */ p.jsxs(At, { children: [
            "Base image prompt (neutral) ",
            /* @__PURE__ */ p.jsx(iu, { id: "ed-art-base", rows: 4, readOnly: !0 })
          ] }),
          /* @__PURE__ */ p.jsxs(At, { children: [
            "Expression deltas (edit the base image with each) ",
            /* @__PURE__ */ p.jsx(iu, { id: "ed-art-expr", rows: 5, readOnly: !0 })
          ] }),
          /* @__PURE__ */ p.jsxs(At, { children: [
            "Motion prompt (image-to-video) ",
            /* @__PURE__ */ p.jsx(iu, { id: "ed-art-motion", rows: 2, readOnly: !0 })
          ] })
        ] }),
        /* @__PURE__ */ p.jsxs(At, { children: [
          /* @__PURE__ */ p.jsx("span", { "data-ui-text": "ed-rate", children: "立绘动画速度" }),
          /* @__PURE__ */ p.jsx(xa, { id: "ed-rate", type: "number", min: "0.25", max: "4", step: "0.05" })
        ] }),
        /* @__PURE__ */ p.jsxs(At, { hidden: !0, children: [
          "Voice — VOICEVOX speaker style (",
          /* @__PURE__ */ p.jsx("span", { id: "ed-voice-state", children: "checking…" }),
          ") ",
          /* @__PURE__ */ p.jsx(Ml, { id: "ed-voice" })
        ] }),
        /* @__PURE__ */ p.jsxs("div", { className: "overlay-actions", children: [
          /* @__PURE__ */ p.jsx("span", { id: "ed-path", className: "dim" }),
          /* @__PURE__ */ p.jsx(_e, { type: "submit", id: "ed-save", "data-ui-text": "save", variant: "default", "data-slot": "button", children: "SAVE" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { id: "gallery", className: "character-view hidden", children: [
      /* @__PURE__ */ p.jsxs("div", { className: "overlay-head", children: [
        /* @__PURE__ */ p.jsx("span", { id: "gallery-title", children: "Gallery" }),
        /* @__PURE__ */ p.jsx(_e, { type: "button", className: "overlay-close", "data-close": "gallery", hidden: !0, variant: "ghost", "data-slot": "button", children: "Close" })
      ] }),
      /* @__PURE__ */ p.jsx("div", { id: "gallery-grid", className: "overlay-body" }),
      /* @__PURE__ */ p.jsx("div", { id: "gallery-hint", className: "dim", "data-ui-text": "galleryHint", children: "Click a tile to show that expression on stage. Drop a .png / .mp4 onto a tile, or use its ↑ button, to replace that expression. Files live in the pack directory shown in EDIT." }),
      /* @__PURE__ */ p.jsx("input", { id: "asset-file", type: "file", accept: ".png,.webp,.jpg,.jpeg,.mp4,.webm,image/png,image/webp,image/jpeg,video/mp4,video/webm", hidden: !0 })
    ] })
  ] });
}), kE = z.memo(function() {
  return /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsxs("div", { className: "overlay-head", children: [
      /* @__PURE__ */ p.jsx("span", { id: "speech-title", "data-speech-text": "title", children: "语音设置" }),
      /* @__PURE__ */ p.jsx(_e, { type: "button", className: "overlay-close", "data-close": "speech-panel", "data-speech-text": "cancel", hidden: !0, variant: "ghost", "data-slot": "button", children: "关闭 / ESC" })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "overlay-body", children: [
      /* @__PURE__ */ p.jsxs("div", { className: "general-settings", "data-section": "general", children: [
        /* @__PURE__ */ p.jsxs("div", { className: "language-settings", children: [
          /* @__PURE__ */ p.jsxs(At, { className: "language-control", children: [
            /* @__PURE__ */ p.jsx("span", { id: "language-label", children: "界面语言" }),
            /* @__PURE__ */ p.jsxs(Ml, { id: "aibo-language", "aria-describedby": "language-hint", children: [
              /* @__PURE__ */ p.jsx("option", { value: "auto", children: "自动" }),
              /* @__PURE__ */ p.jsx("option", { value: "zh", children: "中文" }),
              /* @__PURE__ */ p.jsx("option", { value: "ja", children: "日本語" }),
              /* @__PURE__ */ p.jsx("option", { value: "en", children: "English" })
            ] })
          ] }),
          /* @__PURE__ */ p.jsxs(At, { className: "language-control", children: [
            /* @__PURE__ */ p.jsx("span", { id: "speech-language-label", children: "语音语言" }),
            /* @__PURE__ */ p.jsxs(Ml, { id: "aibo-speech-language", "aria-describedby": "language-hint", children: [
              /* @__PURE__ */ p.jsx("option", { value: "auto", children: "自动" }),
              /* @__PURE__ */ p.jsx("option", { value: "zh", children: "中文" }),
              /* @__PURE__ */ p.jsx("option", { value: "ja", children: "日本語" }),
              /* @__PURE__ */ p.jsx("option", { value: "en", children: "English" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ p.jsx(_e, { type: "button", id: "btn-voice", title: "Voice on/off (V)", variant: "ghost", "data-slot": "button", children: "VOICE" })
      ] }),
      /* @__PURE__ */ p.jsx("p", { className: "speech-intro", "data-speech-text": "choose" }),
      /* @__PURE__ */ p.jsxs("form", { id: "speech-form", children: [
        /* @__PURE__ */ p.jsxs("div", { className: "speech-grid", children: [
          /* @__PURE__ */ p.jsxs(At, { children: [
            /* @__PURE__ */ p.jsx("span", { "data-speech-text": "language" }),
            /* @__PURE__ */ p.jsxs(Ml, { id: "speech-edit-language", children: [
              /* @__PURE__ */ p.jsx("option", { value: "zh", children: "中文" }),
              /* @__PURE__ */ p.jsx("option", { value: "en", children: "English" }),
              /* @__PURE__ */ p.jsx("option", { value: "ja", children: "日本語" })
            ] })
          ] }),
          /* @__PURE__ */ p.jsxs(At, { children: [
            /* @__PURE__ */ p.jsx("span", { "data-speech-text": "provider" }),
            /* @__PURE__ */ p.jsx(Ml, { id: "speech-provider" })
          ] }),
          /* @__PURE__ */ p.jsxs(At, { children: [
            /* @__PURE__ */ p.jsx("span", { "data-speech-text": "model" }),
            /* @__PURE__ */ p.jsx(Ml, { id: "speech-model" })
          ] }),
          /* @__PURE__ */ p.jsxs(At, { children: [
            /* @__PURE__ */ p.jsx("span", { "data-speech-text": "voice" }),
            /* @__PURE__ */ p.jsx(xa, { id: "speech-voice", required: !0, maxLength: 160, autoComplete: "off", spellCheck: !1 }),
            /* @__PURE__ */ p.jsx(Ml, { id: "speech-local-voice", hidden: !0 }),
            /* @__PURE__ */ p.jsx(_e, { id: "speech-refresh-voices", type: "button", variant: "ghost", hidden: !0, "data-speech-text": "refreshVoices" }),
            /* @__PURE__ */ p.jsx("span", { id: "speech-voices-status", role: "status", "aria-live": "polite" })
          ] })
        ] }),
        /* @__PURE__ */ p.jsx("p", { id: "speech-description" }),
        /* @__PURE__ */ p.jsx("p", { id: "speech-voice-hint", className: "speech-muted", "data-speech-text": "voiceHint" }),
        /* @__PURE__ */ p.jsx("a", { id: "speech-docs", target: "_blank", rel: "noopener noreferrer", "data-speech-text": "docs" }),
        /* @__PURE__ */ p.jsxs("div", { id: "speech-key-fields", children: [
          /* @__PURE__ */ p.jsxs(At, { children: [
            /* @__PURE__ */ p.jsx("span", { "data-speech-text": "key" }),
            /* @__PURE__ */ p.jsx(xa, { id: "speech-key", type: "password", autoComplete: "new-password", maxLength: 4096, spellCheck: !1 })
          ] }),
          /* @__PURE__ */ p.jsx("p", { className: "speech-muted", "data-speech-text": "keyHint" }),
          /* @__PURE__ */ p.jsxs(At, { className: "speech-checkbox", children: [
            /* @__PURE__ */ p.jsx(xa, { id: "speech-clear-key", type: "checkbox", className: "native-checkbox" }),
            /* @__PURE__ */ p.jsx("span", { "data-speech-text": "clear" })
          ] })
        ] }),
        /* @__PURE__ */ p.jsx("p", { className: "speech-muted", "data-speech-text": "discard" }),
        /* @__PURE__ */ p.jsxs("div", { className: "speech-actions", children: [
          /* @__PURE__ */ p.jsx(_e, { id: "speech-test", type: "button", "data-speech-text": "test", variant: "ghost", "data-slot": "button" }),
          /* @__PURE__ */ p.jsx(_e, { id: "speech-stop", type: "button", disabled: !0, "data-speech-text": "stop", variant: "ghost", "data-slot": "button" }),
          /* @__PURE__ */ p.jsx(_e, { id: "speech-save", type: "submit", "data-speech-text": "save", variant: "default", "data-slot": "button" })
        ] })
      ] }),
      /* @__PURE__ */ p.jsx("p", { id: "speech-status", role: "status", "aria-live": "polite" })
    ] })
  ] });
}), LE = z.memo(function() {
  return /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsxs("div", { className: "overlay-head", children: [
      /* @__PURE__ */ p.jsx("span", { id: "memory-title", "data-ui-text": "memory-title", children: "记忆" }),
      /* @__PURE__ */ p.jsx(_e, { type: "button", className: "overlay-close", "data-close": "memory-panel", hidden: !0, variant: "ghost", "data-slot": "button", children: "关闭 / ESC" })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "overlay-body", children: [
      /* @__PURE__ */ p.jsx("p", { id: "memory-hint", className: "dim", "data-ui-text": "memory-hint", children: "这些是关于你的笔记，所有角色共用，换角色也不会丢。" }),
      /* @__PURE__ */ p.jsx("div", { id: "mem-list" }),
      /* @__PURE__ */ p.jsx("p", { id: "mem-empty", className: "dim hidden", "data-ui-text": "memory-empty", children: "还没有记住任何事。" }),
      /* @__PURE__ */ p.jsxs("form", { id: "memory-add", className: "overlay-actions", children: [
        /* @__PURE__ */ p.jsx(xa, { id: "mem-new", type: "text", "data-ui-placeholder": "memory-add", placeholder: "记住一件事…", spellCheck: !1 }),
        /* @__PURE__ */ p.jsx(_e, { type: "submit", id: "mem-add", "data-ui-text": "memory-add-button", variant: "default", "data-slot": "button", children: "ADD" })
      ] })
    ] })
  ] });
}), HE = z.memo(function() {
  return /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsxs("div", { className: "overlay-head", children: [
      /* @__PURE__ */ p.jsx("span", { id: "artifacts-title", "data-ui-text": "artifacts-title", children: "手记" }),
      /* @__PURE__ */ p.jsx(_e, { type: "button", className: "overlay-close", "data-close": "artifacts-panel", hidden: !0, variant: "ghost", "data-slot": "button", children: "关闭 / ESC" })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { id: "art-list-view", className: "overlay-body", children: [
      /* @__PURE__ */ p.jsx("p", { className: "dim", "data-ui-text": "artifacts-hint", children: "" }),
      /* @__PURE__ */ p.jsx("div", { id: "art-list" }),
      /* @__PURE__ */ p.jsx("p", { id: "art-empty", className: "dim hidden", "data-ui-text": "artifacts-empty", children: "" })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { id: "art-view", className: "overlay-body hidden", children: [
      /* @__PURE__ */ p.jsxs("div", { className: "art-view-head", children: [
        /* @__PURE__ */ p.jsx(_e, { type: "button", id: "art-back", variant: "ghost", "data-slot": "button", "data-ui-text": "artifacts-back", children: "" }),
        /* @__PURE__ */ p.jsxs("div", { className: "art-view-title", children: [
          /* @__PURE__ */ p.jsx("span", { id: "art-view-name" }),
          /* @__PURE__ */ p.jsx("span", { id: "art-view-desc", className: "dim" }),
          /* @__PURE__ */ p.jsx("span", { id: "art-view-path", className: "dim" })
        ] }),
        /* @__PURE__ */ p.jsxs("div", { className: "art-view-actions", children: [
          /* @__PURE__ */ p.jsx(_e, { type: "button", id: "art-reveal", variant: "ghost", "data-slot": "button", "data-ui-text": "artifacts-reveal", children: "" }),
          /* @__PURE__ */ p.jsx(_e, { type: "button", id: "art-copy", variant: "ghost", "data-slot": "button", "data-ui-text": "artifacts-copy", children: "" }),
          /* @__PURE__ */ p.jsx(_e, { type: "button", id: "art-forget", variant: "ghost", "data-slot": "button", "data-ui-text": "artifacts-forget", children: "" })
        ] })
      ] }),
      /* @__PURE__ */ p.jsx("span", { id: "art-status", className: "dim", role: "status", "aria-live": "polite" }),
      /* @__PURE__ */ p.jsx("div", { id: "art-body" })
    ] })
  ] });
}), BE = z.memo(function() {
  return /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsxs("div", { className: "overlay-head", children: [
      /* @__PURE__ */ p.jsx("span", { id: "help-title", children: "命令与快捷键" }),
      /* @__PURE__ */ p.jsx(_e, { type: "button", className: "overlay-close", "data-close": "help-panel", hidden: !0, variant: "ghost", "data-slot": "button", children: "关闭 / ESC" })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "overlay-body", children: [
      /* @__PURE__ */ p.jsx("h3", { className: "help-section", "data-ui-text": "help-commands", children: "" }),
      /* @__PURE__ */ p.jsx("div", { id: "help-list" }),
      /* @__PURE__ */ p.jsx("h3", { className: "help-section", "data-ui-text": "help-keys-title", children: "" }),
      /* @__PURE__ */ p.jsxs("div", { id: "help-shortcuts", children: [
        /* @__PURE__ */ p.jsxs("div", { className: "help-key", children: [
          /* @__PURE__ */ p.jsxs(Zt, { children: [
            /* @__PURE__ */ p.jsx(Ve, { children: "Space" }),
            /* @__PURE__ */ p.jsx(Ve, { children: "Enter" })
          ] }),
          /* @__PURE__ */ p.jsx("span", { "data-ui-text": "key-advance", children: "" })
        ] }),
        /* @__PURE__ */ p.jsxs("div", { className: "help-key", children: [
          /* @__PURE__ */ p.jsxs(Zt, { children: [
            /* @__PURE__ */ p.jsx(Ve, { children: "/" }),
            /* @__PURE__ */ p.jsx(Ve, { children: "、" })
          ] }),
          /* @__PURE__ */ p.jsx("span", { "data-ui-text": "key-input", children: "" })
        ] }),
        /* @__PURE__ */ p.jsxs("div", { className: "help-key", children: [
          /* @__PURE__ */ p.jsx(Zt, { children: /* @__PURE__ */ p.jsx(Ve, { children: "Esc" }) }),
          /* @__PURE__ */ p.jsx("span", { "data-ui-text": "key-blur", children: "" })
        ] }),
        /* @__PURE__ */ p.jsxs("div", { className: "help-key", children: [
          /* @__PURE__ */ p.jsxs(Zt, { children: [
            /* @__PURE__ */ p.jsx(Ve, { children: "⌥" }),
            /* @__PURE__ */ p.jsx(Ve, { children: "L" })
          ] }),
          /* @__PURE__ */ p.jsx("span", { "data-ui-text": "key-log", children: "" })
        ] }),
        /* @__PURE__ */ p.jsxs("div", { className: "help-key", children: [
          /* @__PURE__ */ p.jsxs(Zt, { children: [
            /* @__PURE__ */ p.jsx(Ve, { children: "⌥" }),
            /* @__PURE__ */ p.jsx(Ve, { children: "M" })
          ] }),
          /* @__PURE__ */ p.jsx("span", { "data-ui-text": "key-memory", children: "" })
        ] }),
        /* @__PURE__ */ p.jsxs("div", { className: "help-key", children: [
          /* @__PURE__ */ p.jsxs(Zt, { children: [
            /* @__PURE__ */ p.jsx(Ve, { children: "⌥" }),
            /* @__PURE__ */ p.jsx(Ve, { children: "F" })
          ] }),
          /* @__PURE__ */ p.jsx("span", { "data-ui-text": "key-artifacts", children: "" })
        ] }),
        /* @__PURE__ */ p.jsxs("div", { className: "help-key", children: [
          /* @__PURE__ */ p.jsxs(Zt, { children: [
            /* @__PURE__ */ p.jsx(Ve, { children: "⌥" }),
            /* @__PURE__ */ p.jsx(Ve, { children: "C" })
          ] }),
          /* @__PURE__ */ p.jsx("span", { "data-ui-text": "key-char", children: "" })
        ] }),
        /* @__PURE__ */ p.jsxs("div", { className: "help-key", children: [
          /* @__PURE__ */ p.jsxs(Zt, { children: [
            /* @__PURE__ */ p.jsx(Ve, { children: "⌥" }),
            /* @__PURE__ */ p.jsx(Ve, { children: "G" })
          ] }),
          /* @__PURE__ */ p.jsx("span", { "data-ui-text": "key-gallery", children: "" })
        ] }),
        /* @__PURE__ */ p.jsxs("div", { className: "help-key", children: [
          /* @__PURE__ */ p.jsxs(Zt, { children: [
            /* @__PURE__ */ p.jsx(Ve, { children: "⌥" }),
            /* @__PURE__ */ p.jsx(Ve, { children: "E" })
          ] }),
          /* @__PURE__ */ p.jsx("span", { "data-ui-text": "key-edit", children: "" })
        ] }),
        /* @__PURE__ */ p.jsxs("div", { className: "help-key", children: [
          /* @__PURE__ */ p.jsxs(Zt, { children: [
            /* @__PURE__ */ p.jsx(Ve, { children: "⌥" }),
            /* @__PURE__ */ p.jsx(Ve, { children: "S" })
          ] }),
          /* @__PURE__ */ p.jsx("span", { "data-ui-text": "key-settings", children: "" })
        ] }),
        /* @__PURE__ */ p.jsxs("div", { className: "help-key", children: [
          /* @__PURE__ */ p.jsxs(Zt, { children: [
            /* @__PURE__ */ p.jsx(Ve, { children: "⌥" }),
            /* @__PURE__ */ p.jsx(Ve, { children: "V" })
          ] }),
          /* @__PURE__ */ p.jsx("span", { "data-ui-text": "key-voice", children: "" })
        ] }),
        /* @__PURE__ */ p.jsxs("div", { className: "help-key", children: [
          /* @__PURE__ */ p.jsxs(Zt, { children: [
            /* @__PURE__ */ p.jsx(Ve, { children: "⌥" }),
            /* @__PURE__ */ p.jsx(Ve, { children: "R" })
          ] }),
          /* @__PURE__ */ p.jsx("span", { "data-ui-text": "key-replay", children: "" })
        ] }),
        /* @__PURE__ */ p.jsxs("div", { className: "help-key", children: [
          /* @__PURE__ */ p.jsxs(Zt, { children: [
            /* @__PURE__ */ p.jsx(Ve, { children: "⌥" }),
            /* @__PURE__ */ p.jsx(Ve, { children: "N" })
          ] }),
          /* @__PURE__ */ p.jsx("span", { "data-ui-text": "key-new", children: "" })
        ] }),
        /* @__PURE__ */ p.jsxs("div", { className: "help-key", children: [
          /* @__PURE__ */ p.jsxs(Zt, { children: [
            /* @__PURE__ */ p.jsx(Ve, { children: "⌥" }),
            /* @__PURE__ */ p.jsx(Ve, { children: "H" })
          ] }),
          /* @__PURE__ */ p.jsx("span", { "data-ui-text": "key-hide", children: "" })
        ] }),
        /* @__PURE__ */ p.jsxs("div", { className: "help-key", children: [
          /* @__PURE__ */ p.jsxs(Zt, { children: [
            /* @__PURE__ */ p.jsx(Ve, { children: "⌥" }),
            /* @__PURE__ */ p.jsx(Ve, { children: "/" })
          ] }),
          /* @__PURE__ */ p.jsx("span", { "data-ui-text": "key-help", children: "" })
        ] })
      ] }),
      /* @__PURE__ */ p.jsx("p", { id: "help-keys" })
    ] })
  ] });
}), GE = z.memo(function() {
  return /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsxs("div", { id: "history-head", children: [
      /* @__PURE__ */ p.jsx("span", { "data-ui-text": "history", children: "Backlog" }),
      /* @__PURE__ */ p.jsx(_e, { id: "btn-close-history", "data-ui-text": "close", hidden: !0, variant: "ghost", "data-slot": "button", children: "Close" })
    ] }),
    /* @__PURE__ */ p.jsx("div", { id: "history-list" })
  ] });
});
/*! @license DOMPurify 3.4.15 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.15/LICENSE */
function Tv(u, r) {
  (r == null || r > u.length) && (r = u.length);
  for (var c = 0, o = Array(r); c < r; c++) o[c] = u[c];
  return o;
}
function YE(u) {
  if (Array.isArray(u)) return u;
}
function qE(u, r) {
  var c = u == null ? null : typeof Symbol < "u" && u[Symbol.iterator] || u["@@iterator"];
  if (c != null) {
    var o, f, d, m, g = [], S = !0, T = !1;
    try {
      if (d = (c = c.call(u)).next, r !== 0) for (; !(S = (o = d.call(c)).done) && (g.push(o.value), g.length !== r); S = !0) ;
    } catch (A) {
      T = !0, f = A;
    } finally {
      try {
        if (!S && c.return != null && (m = c.return(), Object(m) !== m)) return;
      } finally {
        if (T) throw f;
      }
    }
    return g;
  }
}
function VE() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function XE(u, r) {
  return YE(u) || qE(u, r) || QE(u, r) || VE();
}
function QE(u, r) {
  if (u) {
    if (typeof u == "string") return Tv(u, r);
    var c = {}.toString.call(u).slice(8, -1);
    return c === "Object" && u.constructor && (c = u.constructor.name), c === "Map" || c === "Set" ? Array.from(u) : c === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c) ? Tv(u, r) : void 0;
  }
}
const tb = Object.entries, _v = Object.setPrototypeOf, ZE = Object.isFrozen, KE = Object.getPrototypeOf, JE = Object.getOwnPropertyDescriptor;
let bt = Object.freeze, Nt = Object.seal, uu = Object.create, nb = typeof Reflect < "u" && Reflect, Cd = nb.apply, wd = nb.construct;
bt || (bt = function(r) {
  return r;
});
Nt || (Nt = function(r) {
  return r;
});
Cd || (Cd = function(r, c) {
  for (var o = arguments.length, f = new Array(o > 2 ? o - 2 : 0), d = 2; d < o; d++)
    f[d - 2] = arguments[d];
  return r.apply(c, f);
});
wd || (wd = function(r) {
  for (var c = arguments.length, o = new Array(c > 1 ? c - 1 : 0), f = 1; f < c; f++)
    o[f - 1] = arguments[f];
  return new r(...o);
});
const ti = vt(Array.prototype.forEach), $E = vt(Array.prototype.lastIndexOf), Av = vt(Array.prototype.pop), yr = vt(Array.prototype.push), IE = vt(Array.prototype.splice), ou = Array.isArray, Er = vt(String.prototype.toLowerCase), fd = vt(String.prototype.toString), Ov = vt(String.prototype.match), br = vt(String.prototype.replace), Nv = vt(String.prototype.indexOf), FE = vt(String.prototype.trim), PE = vt(Number.prototype.toString), WE = vt(Boolean.prototype.toString), Rv = typeof BigInt > "u" ? null : vt(BigInt.prototype.toString), Cv = typeof Symbol > "u" ? null : vt(Symbol.prototype.toString), tn = vt(Object.prototype.hasOwnProperty), Sr = vt(Object.prototype.toString), Gt = vt(RegExp.prototype.test), ei = eT(TypeError);
function vt(u) {
  return function(r) {
    r instanceof RegExp && (r.lastIndex = 0);
    for (var c = arguments.length, o = new Array(c > 1 ? c - 1 : 0), f = 1; f < c; f++)
      o[f - 1] = arguments[f];
    return Cd(u, r, o);
  };
}
function eT(u) {
  return function() {
    for (var r = arguments.length, c = new Array(r), o = 0; o < r; o++)
      c[o] = arguments[o];
    return wd(u, c);
  };
}
function je(u, r) {
  let c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Er;
  if (_v && _v(u, null), !ou(r))
    return u;
  let o = r.length;
  for (; o--; ) {
    let f = r[o];
    if (typeof f == "string") {
      const d = c(f);
      d !== f && (ZE(r) || (r[o] = d), f = d);
    }
    u[f] = !0;
  }
  return u;
}
function tT(u) {
  for (let r = 0; r < u.length; r++)
    tn(u, r) || (u[r] = null);
  return u;
}
function gn(u) {
  const r = uu(null);
  for (const o of tb(u)) {
    var c = XE(o, 2);
    const f = c[0], d = c[1];
    tn(u, f) && (ou(d) ? r[f] = tT(d) : d && typeof d == "object" && d.constructor === Object ? r[f] = gn(d) : r[f] = d);
  }
  return r;
}
function nT(u) {
  switch (typeof u) {
    case "string":
      return u;
    case "number":
      return PE(u);
    case "boolean":
      return WE(u);
    case "bigint":
      return Rv ? Rv(u) : "0";
    case "symbol":
      return Cv ? Cv(u) : "Symbol()";
    case "undefined":
      return Sr(u);
    case "function":
    case "object": {
      if (u === null)
        return Sr(u);
      const r = u, c = Rn(r, "toString");
      if (typeof c == "function") {
        const o = c(r);
        return typeof o == "string" ? o : Sr(o);
      }
      return Sr(u);
    }
    default:
      return Sr(u);
  }
}
function Rn(u, r) {
  for (; u !== null; ) {
    const o = JE(u, r);
    if (o) {
      if (o.get)
        return vt(o.get);
      if (typeof o.value == "function")
        return vt(o.value);
    }
    u = KE(u);
  }
  function c() {
    return null;
  }
  return c;
}
function lT(u) {
  try {
    return Gt(u, ""), !0;
  } catch {
    return !1;
  }
}
const wv = bt(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), dd = bt(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), hd = bt(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), aT = bt(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), md = bt(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), iT = bt(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), zv = bt(["#text"]), Dv = bt(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "command", "commandfor", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns"]), pd = bt(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dominant-baseline", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "pointer-events", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-orientation", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "vector-effect", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Mv = bt(["accent", "accentunder", "align", "bevelled", "close", "columnalign", "columnlines", "columnspacing", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lquote", "lspace", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), mo = bt(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), uT = Nt(/{{[\w\W]*|^[\w\W]*}}/g), rT = Nt(/<%[\w\W]*|^[\w\W]*%>/g), cT = Nt(/\${[\w\W]*/g), oT = Nt(/^data-[\-\w.\u00B7-\uFFFF]+$/), sT = Nt(/^aria-[\-\w]+$/), jv = Nt(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), fT = Nt(/^(?:\w+script|data):/i), dT = Nt(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), hT = Nt(/^html$/i), mT = Nt(/^[a-z][.\w]*(-[.\w]+)+$/i), Uv = Nt(/<[/\w!]/g), kv = Nt(/<[/\w]/g), pT = Nt(/<\/no(script|embed|frames)/i), gT = Nt(/\/>/i), mn = {
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
}, lb = ["style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript"], vT = bt(je({}, lb)), yT = (function() {
  const u = {};
  return ti(lb, (r) => {
    u[r] = Nt(new RegExp("</" + r + "(?=[\\t\\n\\f\\r />])", "i"));
  }), bt(u);
})(), bT = function() {
  return typeof window > "u" ? null : window;
}, ST = function(r, c) {
  if (typeof r != "object" || typeof r.createPolicy != "function")
    return null;
  let o = null;
  const f = "data-tt-policy-suffix";
  c && c.hasAttribute(f) && (o = c.getAttribute(f));
  const d = "dompurify" + (o ? "#" + o : "");
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
}, Lv = function() {
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
}, ya = function(r, c, o, f) {
  return tn(r, c) && ou(r[c]) ? je(f.base ? gn(f.base) : {}, r[c], f.transform) : o;
}, gd = function(r, c, o) {
  const f = tn(r, c) ? r[c] : void 0;
  return f && typeof f == "object" ? gn(f) : o();
};
function ab() {
  let u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : bT();
  const r = (Y) => ab(Y);
  if (r.version = "3.4.15", r.removed = [], !u || !u.document || u.document.nodeType !== mn.document || !u.Element)
    return r.isSupported = !1, r;
  let c = u.document;
  const o = c, f = o.currentScript;
  u.DocumentFragment;
  const d = u.HTMLTemplateElement, m = u.Node, g = u.Element, S = u.NodeFilter, T = u.NamedNodeMap;
  T === void 0 && (u.NamedNodeMap || u.MozNamedAttrMap), u.HTMLFormElement;
  const A = u.DOMParser, y = u.trustedTypes, C = g.prototype, q = Rn(C, "cloneNode"), H = Rn(C, "remove"), B = Rn(C, "removeAttributeNode"), j = Rn(C, "nextSibling"), Q = Rn(C, "childNodes"), Z = Rn(C, "parentNode"), ae = Rn(C, "shadowRoot"), ie = Rn(C, "attributes"), W = m && m.prototype ? Rn(m.prototype, "nodeType") : null, se = m && m.prototype ? Rn(m.prototype, "nodeName") : null, ee = m && m.prototype ? Rn(m.prototype, "ownerDocument") : null, he = function(v) {
    return W ? W(v) : v.nodeType;
  }, Pe = function(v) {
    return se ? se(v) : v.nodeName;
  };
  if (typeof d == "function") {
    const Y = c.createElement("template");
    Y.content && Y.content.ownerDocument && (c = Y.content.ownerDocument);
  }
  let Ae, De = "", I, St = !1, ot = 0;
  const Je = function() {
    if (ot > 0)
      throw ei('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.');
  }, V = function(v) {
    Je(), ot++;
    try {
      return Ae.createHTML(v);
    } finally {
      ot--;
    }
  }, ue = function(v) {
    Je(), ot++;
    try {
      return Ae.createScriptURL(v);
    } finally {
      ot--;
    }
  }, re = function() {
    return St || (I = ST(y, f), St = !0), I;
  }, Se = c, xe = Se.implementation, tt = Se.createNodeIterator, zn = Se.createDocumentFragment, ml = Se.getElementsByTagName, E = o.importNode;
  let L = Lv();
  r.isSupported = typeof tb == "function" && typeof Z == "function" && xe && xe.createHTMLDocument !== void 0;
  const te = uT, ne = rT, Re = cT, we = oT, Me = sT, P = fT, fe = dT, Dn = mT;
  let ii = jv, Ue = null;
  const Jt = je({}, [...wv, ...dd, ...hd, ...md, ...zv]);
  let me = null;
  const Le = je({}, [...Dv, ...pd, ...Mv, ...mo]);
  let st = Object.seal(uu(null, {
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
  })), Mn = null, jn = null;
  const nn = Object.seal(uu(null, {
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
  let _a = !0, Jn = !0, ui = !1, Aa = !0, vn = !1, $n = !0, Lt = !1, Oa = !1, kl = null, ri = null, ci = !1, In = !1, Ll = !1, Hl = !1, zr = !0, Dr = !1;
  const Ht = "user-content-";
  let gu = !0, oi = !1, pl = {}, Un = null;
  const Mr = je({}, [
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
  let vu = null;
  const jr = je({}, ["audio", "video", "img", "source", "image", "track"]);
  let Ur = null;
  const Bl = je({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), xt = "http://www.w3.org/1998/Math/MathML", ln = "http://www.w3.org/2000/svg", nt = "http://www.w3.org/1999/xhtml";
  let Gl = nt, yu = !1, bu = null;
  const si = je({}, [xt, ln, nt], fd), Na = bt(["mi", "mo", "mn", "ms", "mtext"]);
  let Yl = je({}, Na);
  const Fn = bt(["annotation-xml"]);
  let ql = je({}, Fn);
  const Ra = je({}, ["title", "style", "font", "a", "script"]);
  let Vl = null;
  const Ao = ["application/xhtml+xml", "text/html"], kr = "text/html";
  let We = null, yn = null;
  const Oo = c.createElement("form"), Su = function(v) {
    return v instanceof RegExp || v instanceof Function;
  }, fi = function() {
    let v = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (yn && yn === v)
      return;
    (!v || typeof v != "object") && (v = {}), v = gn(v), Vl = // eslint-disable-next-line unicorn/prefer-includes
    Ao.indexOf(v.PARSER_MEDIA_TYPE) === -1 ? kr : v.PARSER_MEDIA_TYPE, We = Vl === "application/xhtml+xml" ? fd : Er, Ue = ya(v, "ALLOWED_TAGS", Jt, {
      transform: We
    }), me = ya(v, "ALLOWED_ATTR", Le, {
      transform: We
    }), bu = ya(v, "ALLOWED_NAMESPACES", si, {
      transform: fd
    }), Ur = ya(v, "ADD_URI_SAFE_ATTR", Bl, {
      transform: We,
      base: Bl
    }), vu = ya(v, "ADD_DATA_URI_TAGS", jr, {
      transform: We,
      base: jr
    }), Un = ya(v, "FORBID_CONTENTS", Mr, {
      transform: We
    }), Mn = ya(v, "FORBID_TAGS", gn({}), {
      transform: We
    }), jn = ya(v, "FORBID_ATTR", gn({}), {
      transform: We
    }), pl = tn(v, "USE_PROFILES") ? v.USE_PROFILES && typeof v.USE_PROFILES == "object" ? gn(v.USE_PROFILES) : v.USE_PROFILES : !1, _a = v.ALLOW_ARIA_ATTR !== !1, Jn = v.ALLOW_DATA_ATTR !== !1, ui = v.ALLOW_UNKNOWN_PROTOCOLS || !1, Aa = v.ALLOW_SELF_CLOSE_IN_ATTR !== !1, vn = v.SAFE_FOR_TEMPLATES || !1, $n = v.SAFE_FOR_XML !== !1, Lt = v.WHOLE_DOCUMENT || !1, In = v.RETURN_DOM || !1, Ll = v.RETURN_DOM_FRAGMENT || !1, Hl = v.RETURN_TRUSTED_TYPE || !1, ci = v.FORCE_BODY || !1, zr = v.SANITIZE_DOM !== !1, Dr = v.SANITIZE_NAMED_PROPS || !1, gu = v.KEEP_CONTENT !== !1, oi = v.IN_PLACE || !1, ii = lT(v.ALLOWED_URI_REGEXP) ? v.ALLOWED_URI_REGEXP : jv, Gl = typeof v.NAMESPACE == "string" ? v.NAMESPACE : nt, Yl = gd(
      v,
      "MATHML_TEXT_INTEGRATION_POINTS",
      () => je({}, Na)
      // Default built-in map
    ), ql = gd(
      v,
      "HTML_INTEGRATION_POINTS",
      () => je({}, Fn)
      // Default built-in map
    );
    const R = gd(v, "CUSTOM_ELEMENT_HANDLING", () => uu(null));
    if (st = uu(null), tn(R, "tagNameCheck") && Su(R.tagNameCheck) && (st.tagNameCheck = R.tagNameCheck), tn(R, "attributeNameCheck") && Su(R.attributeNameCheck) && (st.attributeNameCheck = R.attributeNameCheck), tn(R, "allowCustomizedBuiltInElements") && typeof R.allowCustomizedBuiltInElements == "boolean" && (st.allowCustomizedBuiltInElements = R.allowCustomizedBuiltInElements), Nt(st), vn && (Jn = !1), Ll && (In = !0), pl && (Ue = je({}, zv), me = uu(null), pl.html === !0 && (je(Ue, wv), je(me, Dv)), pl.svg === !0 && (je(Ue, dd), je(me, pd), je(me, mo)), pl.svgFilters === !0 && (je(Ue, hd), je(me, pd), je(me, mo)), pl.mathMl === !0 && (je(Ue, md), je(me, Mv), je(me, mo))), nn.tagCheck = null, nn.attributeCheck = null, tn(v, "ADD_TAGS") && (typeof v.ADD_TAGS == "function" ? nn.tagCheck = v.ADD_TAGS : ou(v.ADD_TAGS) && (Ue === Jt && (Ue = gn(Ue)), je(Ue, v.ADD_TAGS, We))), tn(v, "ADD_ATTR") && (typeof v.ADD_ATTR == "function" ? nn.attributeCheck = v.ADD_ATTR : ou(v.ADD_ATTR) && (me === Le && (me = gn(me)), je(me, v.ADD_ATTR, We))), tn(v, "ADD_FORBID_CONTENTS") && ou(v.ADD_FORBID_CONTENTS) && (Un === Mr && (Un = gn(Un)), je(Un, v.ADD_FORBID_CONTENTS, We)), gu && (Ue["#text"] = !0), Lt && je(Ue, ["html", "head", "body"]), Ue.table && (je(Ue, ["tbody"]), delete Mn.tbody), v.TRUSTED_TYPES_POLICY) {
      if (typeof v.TRUSTED_TYPES_POLICY.createHTML != "function")
        throw ei('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      if (typeof v.TRUSTED_TYPES_POLICY.createScriptURL != "function")
        throw ei('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      const G = Ae;
      Ae = v.TRUSTED_TYPES_POLICY;
      try {
        De = V("");
      } catch (K) {
        throw Ae = G, K;
      }
    } else v.TRUSTED_TYPES_POLICY === null ? (Ae = void 0, De = "") : (Ae === void 0 && (Ae = re()), Ae && typeof De == "string" && (De = V("")));
    bt && bt(v), yn = v;
  }, xu = je({}, [...dd, ...hd, ...aT]), di = je({}, [...md, ...iT]), Eu = function(v, R, G) {
    return R.namespaceURI === nt ? v === "svg" : R.namespaceURI === xt ? v === "svg" && (G === "annotation-xml" || Yl[G]) : !!xu[v];
  }, Lr = function(v, R, G) {
    return R.namespaceURI === nt ? v === "math" : R.namespaceURI === ln ? v === "math" && ql[G] : !!di[v];
  }, Hr = function(v, R, G) {
    return R.namespaceURI === ln && !ql[G] || R.namespaceURI === xt && !Yl[G] ? !1 : !di[v] && (Ra[v] || !xu[v]);
  }, kn = function(v) {
    let R = Z(v);
    (!R || !R.tagName) && (R = {
      namespaceURI: Gl,
      tagName: "template"
    });
    const G = Er(v.tagName), K = Er(R.tagName);
    return bu[v.namespaceURI] ? v.namespaceURI === ln ? Eu(G, R, K) : v.namespaceURI === xt ? Lr(G, R, K) : v.namespaceURI === nt ? Hr(G, R, K) : !!(Vl === "application/xhtml+xml" && bu[v.namespaceURI]) : !1;
  }, $e = function(v) {
    yr(r.removed, {
      element: v
    });
    try {
      Z(v).removeChild(v);
    } catch {
      if (H(v), !Z(v))
        throw ei("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
    }
  }, Rt = function(v, R, G) {
    try {
      B(v, R);
    } catch {
      try {
        v.removeAttribute(G);
      } catch {
      }
    }
  }, Ln = function(v) {
    hi(v);
    const R = Q(v);
    if (R) {
      const K = [];
      ti(R, (J) => {
        yr(K, J);
      }), ti(K, (J) => {
        try {
          H(J);
        } catch {
        }
      });
    }
    const G = ie(v);
    if (G)
      for (let K = G.length - 1; K >= 0; --K) {
        const J = G[K], ce = J && J.name;
        typeof ce == "string" && Rt(v, J, ce);
      }
  }, Pn = function(v, R, G) {
    if (!G)
      try {
        G = R.getAttributeNode(v);
      } catch {
        G = null;
      }
    yr(r.removed, {
      attribute: G || null,
      from: R
    });
    try {
      G ? B(R, G) : R.removeAttribute(v);
    } catch {
      try {
        R.removeAttribute(v);
      } catch {
      }
    }
    if (v === "is")
      if (In || Ll)
        try {
          $e(R);
        } catch {
        }
      else
        try {
          R.setAttribute(v, "");
        } catch {
        }
  }, No = function(v) {
    const R = ie(v);
    if (R)
      for (let G = R.length - 1; G >= 0; --G) {
        const K = R[G], J = K && K.name;
        typeof J != "string" || me[We(J)] || Rt(v, K, J);
      }
  }, hi = function(v) {
    const R = [v];
    for (; R.length > 0; ) {
      const G = R.pop();
      he(G) === mn.element && No(G);
      const J = Q(G);
      if (J)
        for (let ce = J.length - 1; ce >= 0; --ce)
          R.push(J[ce]);
    }
  }, Tu = function(v, R) {
    return $n ? v === "patchsrc" ? !0 : v === "for" && R !== "label" && R !== "output" : !1;
  }, Ca = function(v) {
    if (!$n)
      return;
    const R = [v];
    for (; R.length > 0; ) {
      const G = R.pop(), K = he(G);
      if (K === mn.processingInstruction || K === mn.comment && Gt(kv, G.data)) {
        try {
          H(G);
        } catch {
        }
        continue;
      }
      if (K === mn.element) {
        const ce = G, Be = We(Pe(G));
        try {
          ce.hasAttribute && ce.hasAttribute("patchsrc") && ce.removeAttribute("patchsrc"), ce.hasAttribute && ce.hasAttribute("for") && Tu("for", Be) && ce.removeAttribute("for");
        } catch {
        }
      }
      const J = Q(G);
      if (J)
        for (let ce = J.length - 1; ce >= 0; --ce)
          R.push(J[ce]);
    }
  }, wa = function(v) {
    let R = null, G = null;
    if (ci)
      v = "<remove></remove>" + v;
    else {
      const ce = Ov(v, /^[\r\n\t ]+/);
      G = ce && ce[0];
    }
    Vl === "application/xhtml+xml" && Gl === nt && (v = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + v + "</body></html>");
    const K = Ae ? V(v) : v;
    if (Gl === nt)
      try {
        R = new A().parseFromString(K, Vl);
      } catch {
      }
    if (!R || !R.documentElement) {
      R = xe.createDocument(Gl, "template", null);
      try {
        R.documentElement.innerHTML = yu ? De : K;
      } catch {
      }
    }
    const J = R.body || R.documentElement;
    return v && G && J.insertBefore(c.createTextNode(G), J.childNodes[0] || null), Gl === nt ? ml.call(R, Lt ? "html" : "body")[0] : Lt ? R.documentElement : J;
  }, za = function(v) {
    const R = ee ? ee(v) : v.ownerDocument;
    return tt.call(
      R || v,
      v,
      // eslint-disable-next-line no-bitwise
      S.SHOW_ELEMENT | S.SHOW_COMMENT | S.SHOW_TEXT | S.SHOW_PROCESSING_INSTRUCTION | S.SHOW_CDATA_SECTION,
      null
    );
  }, bn = function(v) {
    return v = br(v, te, " "), v = br(v, ne, " "), v = br(v, Re, " "), v;
  }, Wn = function(v) {
    var R;
    v.normalize();
    const G = ee ? ee(v) : v.ownerDocument, K = tt.call(
      G || v,
      v,
      // eslint-disable-next-line no-bitwise
      S.SHOW_TEXT | S.SHOW_COMMENT | S.SHOW_CDATA_SECTION | S.SHOW_PROCESSING_INSTRUCTION,
      null
    );
    let J = K.nextNode();
    for (; J; )
      J.data = bn(J.data), J = K.nextNode();
    const ce = (R = v.querySelectorAll) === null || R === void 0 ? void 0 : R.call(v, "template");
    ce && ti(ce, (Be) => {
      an(Be.content) && Wn(Be.content);
    });
  }, el = function(v) {
    const R = se ? se(v) : null;
    return typeof R != "string" || We(R) !== "form" ? !1 : typeof v.nodeName != "string" || typeof v.textContent != "string" || typeof v.removeChild != "function" || // Realm-safe NamedNodeMap detection: equality against the cached
    // prototype getter. Clobbered .attributes (e.g. <input name="attributes">)
    // makes the direct read diverge from the cached read; a clean form
    // (same-realm OR foreign-realm) has both reads pointing at the same
    // canonical NamedNodeMap.
    v.attributes !== ie(v) || typeof v.removeAttribute != "function" || // A form descendant named "removeAttributeNode" or "getAttributeNode"
    // shadows these Attr-node methods via [LegacyOverrideBuiltIns].
    // _removeAttribute() / _stripAttributeNode() reach for
    // element.removeAttributeNode(attr) first; when it is shadowed the call
    // throws and the name-based fallback element.removeAttribute(name)
    // ASCII-lowercases its lookup key in an HTML document, silently missing
    // a case-preserved event-handler attribute (e.g. an ONANIMATIONSTART
    // that reached the sanitizer through an XML/XHTML parse). Flag the form
    // so it is removed wholesale, exactly as for the other shadowed methods.
    typeof v.removeAttributeNode != "function" || typeof v.getAttributeNode != "function" || typeof v.setAttribute != "function" || typeof v.namespaceURI != "string" || typeof v.insertBefore != "function" || typeof v.hasChildNodes != "function" || // NodeType clobbering probe. Cached Node.prototype.nodeType getter
    // returns the integer 1 for any Element regardless of realm; direct
    // read on a clobbered form (e.g. <input name="nodeType">) returns
    // the named child element. Cheap addition — nodeType is read from
    // an internal slot, no serialization cost — and removes a residual
    // clobbering surface used by several mXSS / PI / comment branches
    // in _sanitizeElements that compare currentNode.nodeType directly.
    v.nodeType !== W(v) || // HTMLFormElement has [LegacyOverrideBuiltIns]: a descendant named
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
    v.childNodes !== Q(v);
  }, an = function(v) {
    if (!W || typeof v != "object" || v === null)
      return !1;
    try {
      return W(v) === mn.documentFragment;
    } catch {
      return !1;
    }
  }, lt = function(v) {
    if (!W || typeof v != "object" || v === null)
      return !1;
    try {
      return typeof W(v) == "number";
    } catch {
      return !1;
    }
  };
  function un(Y, v, R) {
    Y.length !== 0 && ti(Y, (G) => {
      G.call(r, v, R, yn);
    });
  }
  const Br = function(v, R) {
    return !!($n && v.hasChildNodes() && !lt(v.firstElementChild) && Gt(Uv, v.textContent) && Gt(Uv, v.innerHTML) || $n && v.namespaceURI === nt && vT[R] && (lt(v.firstElementChild) || typeof v.textContent == "string" && Gt(yT[R], v.textContent)) || v.nodeType === mn.processingInstruction || $n && v.nodeType === mn.comment && Gt(kv, v.data));
  }, Da = function(v, R) {
    if (v instanceof RegExp)
      return Gt(v, R);
    if (v instanceof Function) {
      for (var G = arguments.length, K = new Array(G > 2 ? G - 2 : 0), J = 2; J < G; J++)
        K[J - 2] = arguments[J];
      return !!v(R, ...K);
    }
    return !1;
  }, gl = function(v, R, G) {
    if (!Mn[R] && Ce(R) && Da(st.tagNameCheck, R))
      return !1;
    if (gu && !Un[R]) {
      const K = Z(v), J = Q(v);
      if (J && K) {
        const ce = J.length;
        for (let Be = ce - 1; Be >= 0; --Be) {
          const Ze = v === G ? q(J[Be], !0) : J[Be];
          K.insertBefore(Ze, j(v));
        }
      }
    }
    return $e(v), !0;
  }, vl = function(v, R, G, K) {
    return v.length === 0 ? R : R === G || R === K ? gn(R) : R;
  }, Gr = function(v, R) {
    return v === R || Z(v) !== null ? !1 : (oi && hi(v), !0);
  }, _u = function(v, R) {
    if (un(L.beforeSanitizeElements, v, null), Gr(v, R))
      return !0;
    if (el(v))
      return $e(v), !0;
    const G = We(Pe(v));
    if (Ue = vl(L.uponSanitizeElement, Ue, Jt, kl), un(L.uponSanitizeElement, v, {
      tagName: G,
      allowedTags: Ue
    }), Gr(v, R))
      return !0;
    if (Br(v, G))
      return $e(v), !0;
    if (Mn[G] || !(nn.tagCheck instanceof Function && nn.tagCheck(G)) && !Ue[G]) {
      const J = gl(v, G, R);
      return J === !1 && un(L.afterSanitizeElements, v, null), J;
    }
    if (he(v) === mn.element && !kn(v) || (G === "noscript" || G === "noembed" || G === "noframes") && Gt(pT, v.innerHTML))
      return $e(v), !0;
    if (vn && v.nodeType === mn.text) {
      const J = bn(v.textContent);
      v.textContent !== J && (yr(r.removed, {
        element: v.cloneNode()
      }), v.textContent = J);
    }
    return un(L.afterSanitizeElements, v, null), !1;
  }, Au = function(v, R, G) {
    if (jn[R] || Tu(R, v) || zr && (R === "id" || R === "name") && (G in c || G in Oo))
      return !1;
    const K = me[R] || nn.attributeCheck instanceof Function && nn.attributeCheck(R, v);
    return Jn && Gt(we, R) || _a && Gt(Me, R) ? !0 : K ? Ur[R] || Gt(ii, br(G, fe, "")) || (R === "src" || R === "xlink:href" || R === "href") && v !== "script" && Nv(G, "data:") === 0 && vu[v] || ui && !Gt(P, br(G, fe, "")) ? !0 : !G : (
      // Condition a) covers a basically valid custom element tag name whose
      // tag passes the configured tagNameCheck and whose attribute name
      // passes the configured attributeNameCheck ...
      Ce(v) && Da(st.tagNameCheck, v) && Da(st.attributeNameCheck, R, v) || // Condition b) covers an `is` attribute whose value passes the
      // configured tagNameCheck while customized built-in elements are
      // allowed.
      R === "is" && st.allowCustomizedBuiltInElements && Da(st.tagNameCheck, G)
    );
  }, Ro = je({}, ["annotation-xml", "color-profile", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "missing-glyph"]), Ce = function(v) {
    return !Ro[Er(v)] && Gt(Dn, v);
  }, Yr = function(v, R, G, K) {
    if (Ae && typeof y == "object" && typeof y.getAttributeType == "function" && !G)
      switch (y.getAttributeType(v, R)) {
        case "TrustedHTML":
          return V(K);
        case "TrustedScriptURL":
          return ue(K);
      }
    return K;
  }, mi = function(v, R, G, K) {
    try {
      return G ? v.setAttributeNS(G, R, K) : v.setAttribute(R, K), el(v) ? ($e(v), !1) : !0;
    } catch {
      return Pn(R, v), !1;
    }
  }, Ma = function(v) {
    un(L.beforeSanitizeAttributes, v, null);
    const R = v.attributes;
    if (!R || el(v))
      return;
    me = vl(L.uponSanitizeAttribute, me, Le, ri);
    const G = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: me,
      forceKeepAttr: void 0
    };
    let K = R.length;
    const J = We(v.nodeName);
    for (; K--; ) {
      const ce = R[K], Be = ce.name, Ze = ce.namespaceURI, ft = ce.value, wt = We(Be), pi = ft;
      let ut = Be === "value" ? pi : FE(pi), qr = !1;
      if (G.attrName = wt, G.attrValue = ut, G.keepAttr = !0, G.forceKeepAttr = void 0, un(L.uponSanitizeAttribute, v, G), ut = G.attrValue, Dr && (wt === "id" || wt === "name") && Nv(ut, Ht) !== 0 && (Pn(Be, v, ce), ut = Ht + ut, qr = !0), $n && Gt(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, ut)) {
        Pn(Be, v, ce);
        continue;
      }
      if (wt === "attributename" && Ov(ut, "href")) {
        Pn(Be, v, ce);
        continue;
      }
      if (!G.forceKeepAttr) {
        if (!G.keepAttr) {
          Pn(Be, v, ce);
          continue;
        }
        if (!Aa && Gt(gT, ut)) {
          Pn(Be, v, ce);
          continue;
        }
        if (vn && (ut = bn(ut)), !Au(J, wt, ut)) {
          Pn(Be, v, ce);
          continue;
        }
        ut = Yr(J, wt, Ze, ut), ut !== pi && mi(v, Be, Ze, ut) && qr && Av(r.removed);
      }
    }
    un(L.afterSanitizeAttributes, v, null);
  }, $t = function(v) {
    let R = null;
    const G = za(v);
    for (un(L.beforeSanitizeShadowDOM, v, null); R = G.nextNode(); )
      if (un(L.uponSanitizeShadowNode, R, null), _u(R, v), Ma(R), an(R.content) && $t(R.content), he(R) === mn.element) {
        const K = ae(R);
        an(K) && (Ct(K), $t(K));
      }
    un(L.afterSanitizeShadowDOM, v, null);
  }, Ct = function(v) {
    const R = [{
      node: v,
      shadow: null
    }];
    for (; R.length > 0; ) {
      const G = R.pop();
      if (G.shadow) {
        $t(G.shadow);
        continue;
      }
      const K = G.node, ce = he(K) === mn.element, Be = Q(K);
      if (Be)
        for (let Ze = Be.length - 1; Ze >= 0; --Ze)
          R.push({
            node: Be[Ze],
            shadow: null
          });
      if (ce) {
        const Ze = se ? se(K) : null;
        if (typeof Ze == "string" && We(Ze) === "template") {
          const ft = K.content;
          an(ft) && R.push({
            node: ft,
            shadow: null
          });
        }
      }
      if (ce) {
        const Ze = ae(K);
        an(Ze) && R.push({
          node: null,
          shadow: Ze
        }, {
          node: Ze,
          shadow: null
        });
      }
    }
  };
  return r.sanitize = function(Y) {
    let v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, R = null, G = null, K = null, J = null;
    if (yu = !Y, yu && (Y = "<!-->"), typeof Y != "string" && !lt(Y) && (Y = nT(Y), typeof Y != "string"))
      throw ei("dirty is not a string, aborting");
    if (!r.isSupported)
      return Y;
    Oa ? (Ue = kl, me = ri) : fi(v), (L.uponSanitizeElement.length > 0 || L.uponSanitizeAttribute.length > 0) && (Ue = gn(Ue)), L.uponSanitizeAttribute.length > 0 && (me = gn(me)), r.removed = [];
    const ce = oi && typeof Y != "string" && lt(Y);
    if (ce) {
      Ca(Y);
      const ft = Pe(Y);
      if (typeof ft == "string") {
        const wt = We(ft);
        if (!Ue[wt] || Mn[wt])
          throw Ln(Y), ei("root node is forbidden and cannot be sanitized in-place");
      }
      if (el(Y))
        throw Ln(Y), ei("root node is clobbered and cannot be sanitized in-place");
      try {
        Ct(Y);
      } catch (wt) {
        throw Ln(Y), wt;
      }
    } else if (lt(Y))
      R = wa("<!---->"), G = R.ownerDocument.importNode(Y, !0), G.nodeType === mn.element && G.nodeName === "BODY" || G.nodeName === "HTML" ? R = G : R.appendChild(G), Ct(R);
    else {
      if (!In && !vn && !Lt && // eslint-disable-next-line unicorn/prefer-includes
      Y.indexOf("<") === -1)
        return Ae && Hl ? V(Y) : Y;
      if (R = wa(Y), !R)
        return In ? null : Hl ? De : "";
    }
    R && ci && $e(R.firstChild);
    const Be = ce ? Y : R;
    try {
      const ft = za(Be);
      for (; K = ft.nextNode(); )
        _u(K, Be), Ma(K), an(K.content) && $t(K.content);
    } catch (ft) {
      throw ce && (Ln(Y), ti(r.removed, (wt) => {
        wt.element && hi(wt.element);
      })), ft;
    }
    if (ce)
      return ti(r.removed, (ft) => {
        ft.element && hi(ft.element);
      }), vn && Wn(Y), Y;
    if (In) {
      if (vn && Wn(R), Ll)
        for (J = zn.call(R.ownerDocument); R.firstChild; )
          J.appendChild(R.firstChild);
      else
        J = R;
      return (me.shadowroot || me.shadowrootmode) && (J = E.call(o, J, !0)), J;
    }
    let Ze = Lt ? R.outerHTML : R.innerHTML;
    return Lt && Ue["!doctype"] && R.ownerDocument && R.ownerDocument.doctype && R.ownerDocument.doctype.name && Gt(hT, R.ownerDocument.doctype.name) && (Ze = "<!DOCTYPE " + R.ownerDocument.doctype.name + `>
` + Ze), vn && (Ze = bn(Ze)), Ae && Hl ? V(Ze) : Ze;
  }, r.setConfig = function() {
    let Y = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    fi(Y), Oa = !0, kl = Ue, ri = me;
  }, r.clearConfig = function() {
    yn = null, Oa = !1, kl = null, ri = null, Ae = I, De = "";
  }, r.isValidAttribute = function(Y, v, R) {
    yn || fi({});
    const G = We(Y), K = We(v);
    return Au(G, K, R);
  }, r.addHook = function(Y, v) {
    typeof v == "function" && tn(L, Y) && yr(L[Y], v);
  }, r.removeHook = function(Y, v) {
    if (tn(L, Y)) {
      if (v !== void 0) {
        const R = $E(L[Y], v);
        return R === -1 ? void 0 : IE(L[Y], R, 1)[0];
      }
      return Av(L[Y]);
    }
  }, r.removeHooks = function(Y) {
    tn(L, Y) && (L[Y] = []);
  }, r.removeAllHooks = function() {
    L = Lv();
  }, r;
}
var ib = ab();
function Qd() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var ai = Qd();
function ub(u) {
  ai = u;
}
var ni = { exec: () => null };
function lu(u) {
  let r = [];
  return (c) => {
    let o = Math.max(0, Math.min(3, c - 1)), f = r[o];
    return f || (f = u(o), r[o] = f), f;
  };
}
function ye(u, r = "") {
  let c = typeof u == "string" ? u : u.source, o = { replace: (f, d) => {
    let m = typeof d == "string" ? d : d.source;
    return m = m.replace(Yt.caret, "$1"), c = c.replace(f, m), o;
  }, getRegex: () => new RegExp(c, r) };
  return o;
}
var xT = ((u = "") => {
  try {
    return !!new RegExp("(?<=1)(?<!1)" + u);
  } catch {
    return !1;
  }
})(), Yt = { codeRemoveIndent: /^(?: {0,3}\t| {1,4})/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, endingSpaceTabChar: /[ \t]$/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (u) => new RegExp(`^( {0,3}${u})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: lu((u) => new RegExp(`^ {0,${u}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)), hrRegex: lu((u) => new RegExp(`^ {0,${u}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)), fencesBeginRegex: lu((u) => new RegExp(`^ {0,${u}}(?:\`\`\`|~~~)`)), headingBeginRegex: lu((u) => new RegExp(`^ {0,${u}}#`)), htmlBeginRegex: lu((u) => new RegExp(`^ {0,${u}}(?:</?(?:${Rr})(?: +|$|/?>)|<(?:script|pre|style|textarea|!--))`, "i")), blockquoteBeginRegex: lu((u) => new RegExp(`^ {0,${u}}>`)) }, ET = /^(?:[ \t]*(?:\n|$))+/, TT = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, _T = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Nr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, AT = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, Zd = / {0,3}(?:[*+-]|\d{1,9}[.)])/, rb = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, cb = ye(rb).replace(/bull/g, Zd).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), OT = ye(rb).replace(/bull/g, Zd).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), Kd = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/, NT = /^[^\n]+/, Jd = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, RT = ye(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Jd).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), CT = ye(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, Zd).getRegex(), Rr = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", $d = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, wT = ye("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", $d).replace("tag", Rr).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), ob = (u) => ye(Kd).replace("hr", Nr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", u).replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Rr).getRegex(), zT = ob(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/), DT = ob(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/), MT = ye(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", DT).getRegex(), Id = { blockquote: MT, code: TT, def: RT, fences: _T, heading: AT, hr: Nr, html: wT, lheading: cb, list: CT, newline: ET, paragraph: zT, table: ni, text: NT }, Hv = ye("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Nr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Rr).getRegex(), jT = { ...Id, lheading: OT, table: Hv, paragraph: ye(Kd).replace("hr", Nr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Hv).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Rr).getRegex() }, UT = { ...Id, html: ye(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", $d).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: ni, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: ye(Kd).replace("hr", Nr).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", cb).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, kT = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, LT = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, sb = /^( {2,}|\\)\n(?!\s*$)[ \t]*/, HT = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Ul = /[\p{P}\p{S}]/u, pu = /[\s\p{P}\p{S}]/u, Cr = /[^\s\p{P}\p{S}]/u, BT = ye(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, pu).getRegex(), GT = /[\p{Pi}\p{Ps}"']/u, fb = /(?!~)[\p{P}\p{S}]/u, YT = /(?!~)[\s\p{P}\p{S}]/u, qT = /(?:[^\s\p{P}\p{S}]|~)/u, VT = ye(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", xT ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), db = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/, XT = ye(db, "u").replace(/punct/g, Ul).getRegex(), QT = ye(db, "u").replace(/punct/g, fb).getRegex(), ZT = /^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, KT = ye(ZT, "u").replace(/openQuote/g, GT).replace(/punct/g, Ul).getRegex(), hb = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", JT = ye(hb, "gu").replace(/notPunctSpace/g, Cr).replace(/punctSpace/g, pu).replace(/punct/g, Ul).getRegex(), $T = ye(hb, "gu").replace(/notPunctSpace/g, qT).replace(/punctSpace/g, YT).replace(/punct/g, fb).getRegex(), IT = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", FT = ye(IT, "gu").replace(/notPunctSpace/g, Cr).replace(/punctSpace/g, pu).replace(/punct/g, Ul).getRegex(), PT = ye("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Cr).replace(/punctSpace/g, pu).replace(/punct/g, Ul).getRegex(), WT = "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", e_ = ye(WT, "gu").replace(/notPunctSpace/g, Cr).replace(/punctSpace/g, pu).replace(/punct/g, Ul).getRegex(), t_ = ye(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, Ul).getRegex(), n_ = "^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", l_ = ye(n_, "gu").replace(/notPunctSpace/g, Cr).replace(/punctSpace/g, pu).replace(/punct/g, Ul).getRegex(), a_ = ye(/\\(punct)/, "gu").replace(/punct/g, Ul).getRegex(), i_ = ye(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), u_ = ye($d).replace("(?:-->|$)", "-->").getRegex(), r_ = ye("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", u_).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), mb = /\[(?:\\[\s\S]|[^\[\]\\])*\]/, bo = ye(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets", mb).getRegex(), c_ = ye(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", bo).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), o_ = ye(/^!?\[(label)\]\[(ref)\]/).replace("label", bo).replace("ref", Jd).getRegex(), s_ = ye(/^!?\[(ref)\](?:\[\])?/).replace("ref", Jd).getRegex(), Bv = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/, f_ = ye(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets", mb).getRegex(), d_ = ye("reflink|nolink(?!\\()", "g").replace("reflink", ye(/^!?\[(label)\]\[(ref)\]/).replace("label", f_).replace("ref", Bv).getRegex()).replace("nolink", ye(/^!?\[(ref)\](?:\[\])?/).replace("ref", Bv).getRegex()).getRegex(), Gv = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, Fd = { _backpedal: ni, anyPunctuation: a_, autolink: i_, blockSkip: VT, br: sb, code: LT, del: ni, delLDelim: ni, delRDelim: ni, emStrongLDelim: XT, emStrongRDelimAst: JT, emStrongRDelimUnd: PT, escape: kT, link: c_, nolink: s_, punctuation: BT, reflink: o_, reflinkSearch: d_, tag: r_, text: HT, url: ni }, h_ = { ...Fd, emStrongLDelim: KT, emStrongRDelimAst: FT, emStrongRDelimUnd: e_, link: ye(/^!?\[(label)\]\((.*?)\)/).replace("label", bo).getRegex(), reflink: ye(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", bo).getRegex() }, zd = { ...Fd, emStrongRDelimAst: $T, emStrongLDelim: QT, delLDelim: t_, delRDelim: l_, url: ye(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", Gv).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: ye(/^(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", Gv).getRegex() }, m_ = { ...zd, br: ye(sb).replace("{2,}", "*").getRegex(), text: ye(zd.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, po = { normal: Id, gfm: jT, pedantic: UT }, xr = { normal: Fd, gfm: zd, breaks: m_, pedantic: h_ }, p_ = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Yv = (u) => p_[u];
function pn(u, r) {
  if (r) {
    if (Yt.escapeTest.test(u)) return u.replace(Yt.escapeReplace, Yv);
  } else if (Yt.escapeTestNoEncode.test(u)) return u.replace(Yt.escapeReplaceNoEncode, Yv);
  return u;
}
function qv(u) {
  try {
    u = encodeURI(u).replace(Yt.percentDecode, "%");
  } catch {
    return null;
  }
  return u;
}
function Vv(u, r) {
  let c = u.replace(Yt.findPipe, (d, m, g) => {
    let S = !1, T = m;
    for (; --T >= 0 && g[T] === "\\"; ) S = !S;
    return S ? "|" : " |";
  }), o = c.split(Yt.splitPipe), f = 0;
  if (o[0].trim() || o.shift(), o.length > 0 && !o.at(-1)?.trim() && o.pop(), r) if (o.length > r) o.splice(r);
  else for (; o.length < r; ) o.push("");
  for (; f < o.length; f++) o[f] = o[f].trim().replace(Yt.slashPipe, "|");
  return o;
}
function ba(u, r, c) {
  let o = u.length;
  if (o === 0) return "";
  let f = 0;
  for (; f < o && u.charAt(o - f - 1) === r; )
    f++;
  return u.slice(0, o - f);
}
function Xv(u) {
  let r = u.split(`
`), c = r.length - 1;
  for (; c >= 0 && Yt.blankLine.test(r[c]); ) c--;
  return r.length - c <= 2 ? u : r.slice(0, c + 1).join(`
`);
}
function So(u) {
  return u.toLowerCase().toUpperCase().toLowerCase();
}
function g_(u, r) {
  if (u.indexOf(r[1]) === -1) return -1;
  let c = 0;
  for (let o = 0; o < u.length; o++) if (u[o] === "\\") o++;
  else if (u[o] === r[0]) c++;
  else if (u[o] === r[1] && (c--, c < 0)) return o;
  return c > 0 ? -2 : -1;
}
function v_(u, r = 0) {
  let c = r, o = "";
  for (let f of u) if (f === "	") {
    let d = 4 - c % 4;
    o += " ".repeat(d), c += d;
  } else o += f, c++;
  return o;
}
function Qv(u, r, c, o, f) {
  let d = r.href, m = r.title || null, g = u[1].replace(f.other.outputLinkReplace, "$1"), S = u[0].charAt(0) === "!";
  o.state.inLink = !0;
  let T = o.state.linkEmitted, A = o.state.inRawBlock;
  o.state.linkEmitted = !1;
  let y = o.inlineTokens(g), C = o.state.linkEmitted;
  if (o.state.linkEmitted = T, o.state.inLink = !1, !S) {
    if (C) {
      o.state.inRawBlock = A;
      return;
    }
    o.state.linkEmitted = !0;
  }
  return { type: S ? "image" : "link", raw: c, href: d, title: m, text: g, tokens: y };
}
function y_(u, r, c) {
  let o = u.match(c.other.indentCodeCompensation);
  if (o === null) return r;
  let f = o[1];
  return r.split(`
`).map((d) => {
    let m = d.match(c.other.beginningSpace);
    if (m === null) return d;
    let [g] = m;
    return d.slice(Math.min(g.length, f.length));
  }).join(`
`);
}
function Zv(u, r, c, o) {
  if (!r.includes("<")) return !1;
  for (let f = 0; f < r.length; f++) {
    if (r[f] === "\\") {
      f++;
      continue;
    }
    if (r[f] === "`") {
      let g = o.inline.code.exec(r.slice(f));
      if (g) {
        f += g[0].length - 1;
        continue;
      }
    }
    if (r[f] !== "<") continue;
    let d = u.slice(c + f), m = o.inline.tag.exec(d) || o.inline.autolink.exec(d);
    if (m) {
      if (m[0].length > r.length - f) return !0;
      f += m[0].length - 1;
    }
  }
  return !1;
}
var xo = class {
  options;
  rules;
  lexer;
  constructor(u) {
    this.options = u || ai;
  }
  space(u) {
    let r = this.rules.block.newline.exec(u);
    if (r && r[0].length > 0) return { type: "space", raw: r[0] };
  }
  code(u) {
    let r = this.rules.block.code.exec(u);
    if (r) {
      let c = this.options.pedantic ? r[0] : Xv(r[0]), o = c.replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: c, codeBlockStyle: "indented", text: o };
    }
  }
  fences(u) {
    let r = this.rules.block.fences.exec(u);
    if (r) {
      let c = r[0], o = y_(c, r[3] || "", this.rules);
      return { type: "code", raw: c, lang: r[2] ? r[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : r[2], text: o };
    }
  }
  heading(u) {
    let r = this.rules.block.heading.exec(u);
    if (r) {
      let c = r[2].trim();
      if (this.rules.other.endingHash.test(c)) {
        let o = ba(c, "#");
        (this.options.pedantic || !o || this.rules.other.endingSpaceTabChar.test(o)) && (c = o.trim());
      }
      return { type: "heading", raw: ba(r[0], `
`), depth: r[1].length, text: c, tokens: this.lexer.inline(c) };
    }
  }
  hr(u) {
    let r = this.rules.block.hr.exec(u);
    if (r) return { type: "hr", raw: ba(r[0], `
`) };
  }
  blockquote(u) {
    let r = this.rules.block.blockquote.exec(u);
    if (r) {
      let c = ba(r[0], `
`).split(`
`), o = "", f = "", d = [];
      for (; c.length > 0; ) {
        let m = !1, g = [], S;
        for (S = 0; S < c.length; S++) if (this.rules.other.blockquoteStart.test(c[S])) g.push(c[S]), m = !0;
        else if (!m) g.push(c[S]);
        else break;
        c = c.slice(S);
        let T = g.join(`
`), A = T.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        o = o ? `${o}
${T}` : T, f = f ? `${f}
${A}` : A;
        let y = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(A, d, !0), this.lexer.state.top = y, c.length === 0) break;
        let C = d.at(-1);
        if (C?.type === "code") break;
        if (C?.type === "blockquote") {
          let q = C, H = c.join(`
`), B = q.raw + `
` + H.replace(this.rules.other.blockquoteSetextReplace2, ""), j = this.blockquote(B);
          d[d.length - 1] = j, o = `${o}
${H}`, f = f.substring(0, f.length - q.text.length) + j.text;
          break;
        } else if (C?.type === "list") {
          let q = C, H = q.raw + `
` + c.join(`
`), B = this.list(H);
          d[d.length - 1] = B, o = o.substring(0, o.length - C.raw.length) + B.raw, f = f.substring(0, f.length - q.raw.length) + B.raw, c = H.substring(d.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: o, tokens: d, text: f };
    }
  }
  list(u) {
    let r = this.rules.block.list.exec(u);
    if (r) {
      let c = r[1].trim(), o = c.length > 1, f = { type: "list", raw: "", ordered: o, start: o ? +c.slice(0, -1) : "", loose: !1, items: [] };
      c = o ? `\\d{1,9}\\${c.slice(-1)}` : `\\${c}`, this.options.pedantic && (c = o ? c : "[*+-]");
      let d = this.rules.other.listItemRegex(c), m = !1;
      for (; u; ) {
        let S = !1, T = "", A = "";
        if (!(r = d.exec(u)) || this.rules.block.hr.test(u)) break;
        T = r[0], u = u.substring(T.length);
        let y = v_(r[2].split(`
`, 1)[0], r[1].length), C = u.split(`
`, 1)[0], q = !y.trim(), H = 0;
        if (this.options.pedantic ? (H = 2, A = y.trimStart()) : q ? H = r[1].length + 1 : (H = y.search(this.rules.other.nonSpaceChar), H = H > 4 ? 1 : H, A = y.slice(H), H += r[1].length), q && this.rules.other.blankLine.test(C) && (T += C + `
`, u = u.substring(C.length + 1), S = !0), !S) {
          let B = this.rules.other.nextBulletRegex(H), j = this.rules.other.hrRegex(H), Q = this.rules.other.fencesBeginRegex(H), Z = this.rules.other.headingBeginRegex(H), ae = this.rules.other.htmlBeginRegex(H), ie = this.rules.other.blockquoteBeginRegex(H);
          for (; u; ) {
            let W = u.split(`
`, 1)[0], se;
            if (C = W, this.options.pedantic ? (C = C.replace(this.rules.other.listReplaceNesting, "  "), se = C) : se = C.replace(this.rules.other.tabCharGlobal, "    "), Q.test(C) || Z.test(C) || ae.test(C) || ie.test(C) || B.test(C) || j.test(C)) break;
            if (se.search(this.rules.other.nonSpaceChar) >= H || !C.trim()) A += `
` + se.slice(H);
            else {
              if (q || y.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || Q.test(y) || Z.test(y) || j.test(y)) break;
              A += `
` + C;
            }
            q = !C.trim(), T += W + `
`, u = u.substring(W.length + 1), y = se.slice(H);
          }
        }
        f.loose || (m ? f.loose = !0 : this.rules.other.doubleBlankLine.test(T) && (m = !0)), f.items.push({ type: "list_item", raw: T, task: !!this.options.gfm && this.rules.other.listIsTask.test(A), loose: !1, text: A, tokens: [] }), f.raw += T;
      }
      let g = f.items.at(-1);
      if (g) g.raw = g.raw.trimEnd(), g.text = g.text.trimEnd();
      else return;
      f.raw = f.raw.trimEnd();
      for (let S of f.items) if (this.lexer.state.top = !1, S.tokens = this.lexer.blockTokens(S.text, []), !f.loose) {
        let T = S.tokens.filter((y) => y.type === "space"), A = T.length > 0 && T.some((y) => this.rules.other.anyLine.test(y.raw));
        f.loose = A;
      }
      for (let S of f.items) {
        let T = S.tokens[0];
        if (S.task && (T?.type === "text" || T?.type === "paragraph")) {
          S.text = S.text.replace(this.rules.other.listReplaceTask, ""), T.raw = T.raw.replace(this.rules.other.listReplaceTask, ""), T.text = T.text.replace(this.rules.other.listReplaceTask, "");
          for (let y = this.lexer.inlineQueue.length - 1; y >= 0; y--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[y].src)) {
            this.lexer.inlineQueue[y].src = this.lexer.inlineQueue[y].src.replace(this.rules.other.listReplaceTask, "");
            break;
          }
          let A = this.rules.other.listTaskCheckbox.exec(S.raw);
          if (A) {
            let y = { type: "checkbox", raw: A[0] + " ", checked: A[0] !== "[ ]" };
            S.checked = y.checked, f.loose ? S.tokens[0] && ["paragraph", "text"].includes(S.tokens[0].type) && "tokens" in S.tokens[0] && S.tokens[0].tokens ? (S.tokens[0].raw = y.raw + S.tokens[0].raw, S.tokens[0].text = y.raw + S.tokens[0].text, S.tokens[0].tokens.unshift(y)) : S.tokens.unshift({ type: "paragraph", raw: y.raw, text: y.raw, tokens: [y] }) : S.tokens.unshift(y);
          }
        } else S.task && (S.task = !1);
      }
      if (f.loose) for (let S of f.items) {
        S.loose = !0;
        for (let T of S.tokens) T.type === "text" && (T.type = "paragraph");
      }
      return f;
    }
  }
  html(u) {
    let r = this.rules.block.html.exec(u);
    if (r) {
      let c = Xv(r[0]);
      return { type: "html", block: !0, raw: c, pre: r[1] === "pre" || r[1] === "script" || r[1] === "style", text: c };
    }
  }
  def(u) {
    let r = this.rules.block.def.exec(u);
    if (r) {
      let c = So(r[1]).replace(this.rules.other.multipleSpaceGlobal, " "), o = r[2] ? r[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", f = r[3] ? r[3].substring(1, r[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : r[3];
      return { type: "def", tag: c, raw: ba(r[0], `
`), href: o, title: f };
    }
  }
  table(u) {
    let r = this.rules.block.table.exec(u);
    if (!r || !this.rules.other.tableDelimiter.test(r[2])) return;
    let c = Vv(r[1]), o = r[2].replace(this.rules.other.tableAlignChars, "").split("|"), f = r[3]?.trim() ? r[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], d = { type: "table", raw: ba(r[0], `
`), header: [], align: [], rows: [] };
    if (c.length === o.length) {
      for (let m of o) this.rules.other.tableAlignRight.test(m) ? d.align.push("right") : this.rules.other.tableAlignCenter.test(m) ? d.align.push("center") : this.rules.other.tableAlignLeft.test(m) ? d.align.push("left") : d.align.push(null);
      for (let m = 0; m < c.length; m++) d.header.push({ text: c[m], tokens: this.lexer.inline(c[m]), header: !0, align: d.align[m] });
      for (let m of f) d.rows.push(Vv(m, d.header.length).map((g, S) => ({ text: g, tokens: this.lexer.inline(g), header: !1, align: d.align[S] })));
      return d;
    }
  }
  lheading(u) {
    let r = this.rules.block.lheading.exec(u);
    if (r) {
      let c = r[1].trim();
      return { type: "heading", raw: ba(r[0], `
`), depth: r[2].charAt(0) === "=" ? 1 : 2, text: c, tokens: this.lexer.inline(c) };
    }
  }
  paragraph(u) {
    let r = this.rules.block.paragraph.exec(u);
    if (r) {
      let c = r[1].charAt(r[1].length - 1) === `
` ? r[1].slice(0, -1) : r[1];
      return { type: "paragraph", raw: r[0], text: c, tokens: this.lexer.inline(c) };
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
      let c = r[0].charAt(0) === "!" ? 2 : 1;
      if (!this.options.pedantic && Zv(u, r[1], c, this.rules)) return;
      let o = r[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(o)) {
        if (!this.rules.other.endAngleBracket.test(o)) return;
        let m = ba(o.slice(0, -1), "\\");
        if ((o.length - m.length) % 2 === 0) return;
      } else {
        let m = g_(r[2], "()");
        if (m === -2) return;
        if (m > -1) {
          let g = (r[0].indexOf("!") === 0 ? 5 : 4) + r[1].length + m;
          r[2] = r[2].substring(0, m), r[0] = r[0].substring(0, g).trim(), r[3] = "";
        }
      }
      let f = r[2], d = "";
      if (this.options.pedantic) {
        let m = this.rules.other.pedanticHrefTitle.exec(f);
        m && (f = m[1], d = m[3]);
      } else d = r[3] ? r[3].slice(1, -1) : "";
      return f = f.trim(), this.rules.other.startAngleBracket.test(f) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(o) ? f = f.slice(1) : f = f.slice(1, -1)), Qv(r, { href: f && f.replace(this.rules.inline.anyPunctuation, "$1"), title: d && d.replace(this.rules.inline.anyPunctuation, "$1") }, r[0], this.lexer, this.rules);
    }
  }
  reflink(u, r) {
    let c;
    if ((c = this.rules.inline.reflink.exec(u)) || (c = this.rules.inline.nolink.exec(u))) {
      let o = c[0].charAt(0) === "!" ? 2 : 1;
      if (!this.options.pedantic && Zv(u, c[1], o, this.rules)) return;
      let f = (c[2] || c[1]).replace(this.rules.other.multipleSpaceGlobal, " "), d = r[So(f)];
      if (!d) {
        let m = c[0].charAt(0);
        return { type: "text", raw: m, text: m };
      }
      return Qv(c, d, c[0], this.lexer, this.rules);
    }
  }
  emStrong(u, r, c = "") {
    let o = this.rules.inline.emStrongLDelim.exec(u);
    if (!(!o || !o[1] && !o[2] && !o[3] && !o[4] || o[4] && c.match(this.rules.other.unicodeAlphaNumeric)) && (!(o[1] || o[3]) || !c || this.rules.inline.punctuation.exec(c))) {
      let f = [...o[0]].length - 1, d, m, g = f, S = 0, T = o[0][0], A = c === T, y = T === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (y.lastIndex = 0, r = r.slice(-1 * u.length + f); (o = y.exec(r)) !== null; ) {
        if (d = o[1] || o[2] || o[3] || o[4] || o[5] || o[6], !d) continue;
        if (m = [...d].length, o[3] || o[4]) {
          g += m;
          continue;
        } else if (o[5] || o[6]) {
          if (f % 3 && !((f + m) % 3)) {
            S += m;
            continue;
          }
          if (A) break;
        }
        if (g -= m, g > 0) continue;
        m = Math.min(m, m + g + S);
        let C = [...o[0]][0].length, q = u.slice(0, f + o.index + C + m);
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
      let c = r[2].replace(this.rules.other.newLineCharGlobal, " "), o = this.rules.other.nonSpaceChar.test(c), f = this.rules.other.startingSpaceChar.test(c) && this.rules.other.endingSpaceChar.test(c);
      return o && f && (c = c.substring(1, c.length - 1)), { type: "codespan", raw: r[0], text: c };
    }
  }
  br(u) {
    let r = this.rules.inline.br.exec(u);
    if (r) return { type: "br", raw: r[0] };
  }
  del(u, r, c = "") {
    let o = this.rules.inline.delLDelim.exec(u);
    if (o && (!o[1] || !c || this.rules.inline.punctuation.exec(c))) {
      let f = [...o[0]].length - 1, d, m, g = f, S = this.rules.inline.delRDelim;
      for (S.lastIndex = 0, r = r.slice(-1 * u.length + f); (o = S.exec(r)) !== null; ) {
        if (d = o[1] || o[2] || o[3] || o[4] || o[5] || o[6], !d || (m = [...d].length, m !== f)) continue;
        if (o[3] || o[4]) {
          g += m;
          continue;
        }
        if (g -= m, g > 0) continue;
        m = Math.min(m, m + g);
        let T = [...o[0]][0].length, A = u.slice(0, f + o.index + T + m), y = A.slice(f, -f);
        return { type: "del", raw: A, text: y, tokens: this.lexer.inlineTokens(y) };
      }
    }
  }
  autolink(u) {
    let r = this.rules.inline.autolink.exec(u);
    if (r) {
      let c, o;
      return r[2] === "@" ? (c = r[1], o = "mailto:" + c) : (c = r[1], o = c), { type: "link", raw: r[0], text: c, href: o, autolink: !0, tokens: [{ type: "text", raw: c, text: c }] };
    }
  }
  url(u) {
    let r;
    if (r = this.rules.inline.url.exec(u)) {
      let c, o;
      if (r[2] === "@") c = r[0], o = "mailto:" + c;
      else {
        let f;
        do
          f = r[0], r[0] = this.rules.inline._backpedal.exec(r[0])?.[0] ?? "";
        while (f !== r[0]);
        c = r[0], r[1] === "www." ? o = "http://" + r[0] : o = r[0];
      }
      return { type: "link", raw: r[0], text: c, href: o, autolink: !0, tokens: [{ type: "text", raw: c, text: c }] };
    }
  }
  inlineText(u) {
    let r = this.rules.inline.text.exec(u);
    if (r) {
      let c = this.lexer.state.inRawBlock;
      return { type: "text", raw: r[0], text: r[0], escaped: c };
    }
  }
}, Xn = class Dd {
  tokens;
  options;
  state;
  inlineQueue;
  tokenizer;
  constructor(r) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = r || ai, this.options.tokenizer = this.options.tokenizer || new xo(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, linkEmitted: !1, top: !0 };
    let c = { other: Yt, block: po.normal, inline: xr.normal };
    this.options.pedantic ? (c.block = po.pedantic, c.inline = xr.pedantic) : this.options.gfm && (c.block = po.gfm, this.options.breaks ? c.inline = xr.breaks : c.inline = xr.gfm), this.tokenizer.rules = c;
  }
  static get rules() {
    return { block: po, inline: xr };
  }
  static lex(r, c) {
    return new Dd(c).lex(r);
  }
  static lexInline(r, c) {
    return new Dd(c).inlineTokens(r);
  }
  lex(r) {
    r = r.replace(Yt.carriageReturn, `
`), this.blockTokens(r, this.tokens);
    for (let c = 0; c < this.inlineQueue.length; c++) {
      let o = this.inlineQueue[c];
      this.inlineTokens(o.src, o.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(r, c = [], o = !1) {
    this.tokenizer.lexer = this, this.options.pedantic && (r = r.replace(Yt.tabCharGlobal, "    ").replace(Yt.spaceLine, ""));
    let f = 1 / 0;
    for (; r; ) {
      if (r.length < f) f = r.length;
      else {
        this.infiniteLoopError(r.charCodeAt(0));
        break;
      }
      let d;
      if (this.options.extensions?.block?.some((g) => (d = g.call({ lexer: this }, r, c)) ? (r = r.substring(d.raw.length), c.push(d), !0) : !1)) continue;
      if (d = this.tokenizer.space(r)) {
        r = r.substring(d.raw.length);
        let g = c.at(-1);
        d.raw.length === 1 && g !== void 0 ? g.raw += `
` : c.push(d);
        continue;
      }
      if (d = this.tokenizer.code(r)) {
        r = r.substring(d.raw.length);
        let g = c.at(-1);
        g?.type === "paragraph" || g?.type === "text" ? (g.raw += (g.raw.endsWith(`
`) ? "" : `
`) + d.raw, g.text += `
` + d.text, this.inlineQueue.at(-1).src = g.text) : c.push(d);
        continue;
      }
      if (d = this.tokenizer.fences(r)) {
        r = r.substring(d.raw.length), c.push(d);
        continue;
      }
      if (d = this.tokenizer.heading(r)) {
        r = r.substring(d.raw.length), c.push(d);
        continue;
      }
      if (d = this.tokenizer.hr(r)) {
        r = r.substring(d.raw.length), c.push(d);
        continue;
      }
      if (d = this.tokenizer.blockquote(r)) {
        r = r.substring(d.raw.length), c.push(d);
        continue;
      }
      if (d = this.tokenizer.list(r)) {
        r = r.substring(d.raw.length), c.push(d);
        continue;
      }
      if (d = this.tokenizer.html(r)) {
        r = r.substring(d.raw.length), c.push(d);
        continue;
      }
      if (d = this.tokenizer.def(r)) {
        r = r.substring(d.raw.length);
        let g = c.at(-1);
        g?.type === "paragraph" || g?.type === "text" ? (g.raw += (g.raw.endsWith(`
`) ? "" : `
`) + d.raw, g.text += `
` + d.raw, this.inlineQueue.at(-1).src = g.text) : this.tokens.links[d.tag] || (this.tokens.links[d.tag] = { href: d.href, title: d.title }, c.push(d));
        continue;
      }
      if (d = this.tokenizer.table(r)) {
        r = r.substring(d.raw.length), c.push(d);
        continue;
      }
      if (d = this.tokenizer.lheading(r)) {
        r = r.substring(d.raw.length), c.push(d);
        continue;
      }
      let m = r;
      if (this.options.extensions?.startBlock) {
        let g = 1 / 0, S = r.slice(1), T;
        this.options.extensions.startBlock.forEach((A) => {
          T = A.call({ lexer: this }, S), typeof T == "number" && T >= 0 && (g = Math.min(g, T));
        }), g < 1 / 0 && g >= 0 && (m = r.substring(0, g + 1));
      }
      if (this.state.top && (d = this.tokenizer.paragraph(m))) {
        let g = c.at(-1);
        o && g?.type === "paragraph" ? (g.raw += (g.raw.endsWith(`
`) ? "" : `
`) + d.raw, g.text += `
` + d.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = g.text) : c.push(d), o = m.length !== r.length, r = r.substring(d.raw.length);
        continue;
      }
      if (d = this.tokenizer.text(r)) {
        r = r.substring(d.raw.length);
        let g = c.at(-1);
        g?.type === "text" ? (g.raw += (g.raw.endsWith(`
`) ? "" : `
`) + d.raw, g.text += `
` + d.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = g.text) : c.push(d);
        continue;
      }
      if (r) {
        this.infiniteLoopError(r.charCodeAt(0));
        break;
      }
    }
    return this.state.top = !0, c;
  }
  inline(r, c = []) {
    return this.inlineQueue.push({ src: r, tokens: c }), c;
  }
  linkInText(r) {
    if (!r.includes("[")) return !1;
    let c = this.tokenizer.rules.inline.link;
    for (let o of r.matchAll(this.tokenizer.rules.inline.blockSkip)) if (c.test(o[0]) && r.charAt(o.index - 1) !== "!") return !0;
    for (let o of r.matchAll(this.tokenizer.rules.inline.reflinkSearch)) {
      let f = o[0], d = f.lastIndexOf("[");
      if (!(f.charAt(0) === "!" || !Object.hasOwn(this.tokens.links, So(f.slice(d + 1, -1)))) && !(d > 1 && this.linkInText(f.slice(1, d - 1)))) return !0;
    }
    return !1;
  }
  inlineTokens(r, c = []) {
    this.tokenizer.lexer = this;
    let o = r;
    if (this.tokens.links && r.includes("[")) {
      let g = this.tokenizer.rules.inline.reflinkSearch, S = (T) => {
        let A = T.lastIndexOf("[");
        if (!Object.hasOwn(this.tokens.links, So(T.slice(A + 1, -1)))) return T;
        if (A > 1 && T.charAt(0) !== "!") {
          let y = T.slice(1, A - 1);
          if (this.linkInText(y)) return "[" + y.replace(g, S) + "][" + "a".repeat(T.length - A - 2) + "]";
        }
        return "[" + "a".repeat(T.length - 2) + "]";
      };
      o = o.replace(g, S);
    }
    o = o.replace(this.tokenizer.rules.inline.anyPunctuation, (g) => "+".repeat(g.length)), o = o.replace(this.tokenizer.rules.inline.blockSkip, (g, S, T) => {
      let A = T ? T.length : 0;
      return g.slice(0, A) + "[" + "a".repeat(g.length - A - 2) + "]";
    }), o = this.options.hooks?.emStrongMask?.call({ lexer: this }, o) ?? o;
    let f = !1, d = "", m = 1 / 0;
    for (; r; ) {
      if (r.length < m) m = r.length;
      else {
        this.infiniteLoopError(r.charCodeAt(0));
        break;
      }
      f || (d = ""), f = !1;
      let g;
      if (this.options.extensions?.inline?.some((T) => (g = T.call({ lexer: this }, r, c)) ? (r = r.substring(g.raw.length), c.push(g), !0) : !1)) continue;
      if (g = this.tokenizer.escape(r)) {
        r = r.substring(g.raw.length), c.push(g);
        continue;
      }
      if (g = this.tokenizer.tag(r)) {
        r = r.substring(g.raw.length), c.push(g);
        continue;
      }
      if (g = this.tokenizer.link(r)) {
        r = r.substring(g.raw.length), c.push(g);
        continue;
      }
      if (g = this.tokenizer.reflink(r, this.tokens.links)) {
        r = r.substring(g.raw.length);
        let T = c.at(-1);
        g.type === "text" && T?.type === "text" ? (T.raw += g.raw, T.text += g.text) : c.push(g);
        continue;
      }
      if (g = this.tokenizer.emStrong(r, o, d)) {
        r = r.substring(g.raw.length), c.push(g);
        continue;
      }
      if (g = this.tokenizer.codespan(r)) {
        r = r.substring(g.raw.length), c.push(g);
        continue;
      }
      if (g = this.tokenizer.br(r)) {
        r = r.substring(g.raw.length), c.push(g);
        continue;
      }
      if (g = this.tokenizer.del(r, o, d)) {
        r = r.substring(g.raw.length), c.push(g);
        continue;
      }
      if (g = this.tokenizer.autolink(r)) {
        r = r.substring(g.raw.length), c.push(g);
        continue;
      }
      if (!this.state.inLink && (g = this.tokenizer.url(r))) {
        r = r.substring(g.raw.length), c.push(g);
        continue;
      }
      let S = r;
      if (this.options.extensions?.startInline) {
        let T = 1 / 0, A = r.slice(1), y;
        this.options.extensions.startInline.forEach((C) => {
          y = C.call({ lexer: this }, A), typeof y == "number" && y >= 0 && (T = Math.min(T, y));
        }), T < 1 / 0 && T >= 0 && (S = r.substring(0, T + 1));
      }
      if (g = this.tokenizer.inlineText(S)) {
        r = r.substring(g.raw.length), g.raw.slice(-1) !== "_" && (d = g.raw.slice(-1)), f = !0;
        let T = c.at(-1);
        T?.type === "text" ? (T.raw += g.raw, T.text += g.text) : c.push(g);
        continue;
      }
      if (r) {
        this.infiniteLoopError(r.charCodeAt(0));
        break;
      }
    }
    return c;
  }
  infiniteLoopError(r) {
    let c = "Infinite loop on byte: " + r;
    if (this.options.silent) console.error(c);
    else throw new Error(c);
  }
}, Eo = class {
  options;
  parser;
  constructor(u) {
    this.options = u || ai;
  }
  space(u) {
    return "";
  }
  code({ text: u, lang: r, escaped: c }) {
    let o = (r || "").match(Yt.notSpaceStart)?.[0], f = u ? u.replace(Yt.endingNewline, "") + `
` : "";
    return o ? '<pre><code class="language-' + pn(o) + '">' + (c ? f : pn(f, !0)) + `</code></pre>
` : "<pre><code>" + (c ? f : pn(f, !0)) + `</code></pre>
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
    let r = u.ordered, c = u.start, o = "";
    for (let m = 0; m < u.items.length; m++) {
      let g = u.items[m];
      o += this.listitem(g);
    }
    let f = r ? "ol" : "ul", d = r && c !== 1 ? ' start="' + c + '"' : "";
    return "<" + f + d + `>
` + o + "</" + f + `>
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
    let r = "", c = "";
    for (let f = 0; f < u.header.length; f++) c += this.tablecell(u.header[f]);
    r += this.tablerow({ text: c });
    let o = "";
    for (let f = 0; f < u.rows.length; f++) {
      let d = u.rows[f];
      c = "";
      for (let m = 0; m < d.length; m++) c += this.tablecell(d[m]);
      o += this.tablerow({ text: c });
    }
    return o && (o = `<tbody>${o}</tbody>`), `<table>
<thead>
` + r + `</thead>
` + o + `</table>
`;
  }
  tablerow({ text: u }) {
    return `<tr>
${u}</tr>
`;
  }
  tablecell(u) {
    let r = this.parser.parseInline(u.tokens), c = u.header ? "th" : "td";
    return (u.align ? `<${c} align="${u.align}">` : `<${c}>`) + r + `</${c}>
`;
  }
  strong({ tokens: u }) {
    return `<strong>${this.parser.parseInline(u)}</strong>`;
  }
  em({ tokens: u }) {
    return `<em>${this.parser.parseInline(u)}</em>`;
  }
  codespan({ text: u }) {
    return `<code>${pn(u, !0)}</code>`;
  }
  br(u) {
    return "<br>";
  }
  del({ tokens: u }) {
    return `<del>${this.parser.parseInline(u)}</del>`;
  }
  link({ href: u, title: r, text: c, tokens: o, autolink: f }) {
    let d = f ? pn(c, !0) : this.parser.parseInline(o), m = qv(u);
    if (m === null) return d;
    u = pn(m, f);
    let g = '<a href="' + u + '"';
    return r && (g += ' title="' + pn(r) + '"'), g += ">" + d + "</a>", g;
  }
  image({ href: u, title: r, text: c, tokens: o }) {
    o && (c = this.parser.parseInline(o, this.parser.textRenderer));
    let f = qv(u);
    if (f === null) return pn(c);
    u = f;
    let d = `<img src="${pn(u)}" alt="${pn(c)}"`;
    return r && (d += ` title="${pn(r)}"`), d += ">", d;
  }
  text(u) {
    return "tokens" in u && u.tokens ? this.parser.parseInline(u.tokens) : "escaped" in u && u.escaped ? u.text : pn(u.text);
  }
}, Pd = class {
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
}, Qn = class Md {
  options;
  renderer;
  textRenderer;
  constructor(r) {
    this.options = r || ai, this.options.renderer = this.options.renderer || new Eo(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Pd();
  }
  static parse(r, c) {
    return new Md(c).parse(r);
  }
  static parseInline(r, c) {
    return new Md(c).parseInline(r);
  }
  parse(r) {
    this.renderer.parser = this;
    let c = "";
    for (let o = 0; o < r.length; o++) {
      let f = r[o];
      if (this.options.extensions?.renderers?.[f.type]) {
        let m = f, g = this.options.extensions.renderers[m.type].call({ parser: this }, m);
        if (g !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "checkbox", "html", "def", "paragraph", "text"].includes(m.type)) {
          c += g || "";
          continue;
        }
      }
      let d = f;
      switch (d.type) {
        case "space": {
          c += this.renderer.space(d);
          break;
        }
        case "hr": {
          c += this.renderer.hr(d);
          break;
        }
        case "heading": {
          c += this.renderer.heading(d);
          break;
        }
        case "code": {
          c += this.renderer.code(d);
          break;
        }
        case "table": {
          c += this.renderer.table(d);
          break;
        }
        case "blockquote": {
          c += this.renderer.blockquote(d);
          break;
        }
        case "list": {
          c += this.renderer.list(d);
          break;
        }
        case "checkbox": {
          c += this.renderer.checkbox(d);
          break;
        }
        case "html": {
          c += this.renderer.html(d);
          break;
        }
        case "def": {
          c += this.renderer.def(d);
          break;
        }
        case "paragraph": {
          c += this.renderer.paragraph(d);
          break;
        }
        case "text": {
          c += this.renderer.text(d);
          break;
        }
        default: {
          let m = 'Token with "' + d.type + '" type was not found.';
          if (this.options.silent) return console.error(m), "";
          throw new Error(m);
        }
      }
    }
    return c;
  }
  parseInline(r, c = this.renderer) {
    this.renderer.parser = this;
    let o = "";
    for (let f = 0; f < r.length; f++) {
      let d = r[f];
      if (this.options.extensions?.renderers?.[d.type]) {
        let g = this.options.extensions.renderers[d.type].call({ parser: this }, d);
        if (g !== !1 || !["escape", "html", "link", "image", "checkbox", "strong", "em", "codespan", "br", "del", "text"].includes(d.type)) {
          o += g || "";
          continue;
        }
      }
      let m = d;
      switch (m.type) {
        case "escape": {
          o += c.text(m);
          break;
        }
        case "html": {
          o += c.html(m);
          break;
        }
        case "link": {
          o += c.link(m);
          break;
        }
        case "image": {
          o += c.image(m);
          break;
        }
        case "checkbox": {
          o += c.checkbox(m);
          break;
        }
        case "strong": {
          o += c.strong(m);
          break;
        }
        case "em": {
          o += c.em(m);
          break;
        }
        case "codespan": {
          o += c.codespan(m);
          break;
        }
        case "br": {
          o += c.br(m);
          break;
        }
        case "del": {
          o += c.del(m);
          break;
        }
        case "text": {
          o += c.text(m);
          break;
        }
        default: {
          let g = 'Token with "' + m.type + '" type was not found.';
          if (this.options.silent) return console.error(g), "";
          throw new Error(g);
        }
      }
    }
    return o;
  }
}, Tr = class {
  options;
  block;
  constructor(u) {
    this.options = u || ai;
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
    return u ? Xn.lex : Xn.lexInline;
  }
  provideParser(u = this.block) {
    return u ? Qn.parse : Qn.parseInline;
  }
}, b_ = class {
  defaults = Qd();
  options = this.setOptions;
  parse = this.parseMarkdown(!0);
  parseInline = this.parseMarkdown(!1);
  Parser = Qn;
  Renderer = Eo;
  TextRenderer = Pd;
  Lexer = Xn;
  Tokenizer = xo;
  Hooks = Tr;
  constructor(...u) {
    this.use(...u);
  }
  walkTokens(u, r) {
    let c = [];
    for (let o of u) switch (c = c.concat(r.call(this, o)), o.type) {
      case "table": {
        let f = o;
        for (let d of f.header) c = c.concat(this.walkTokens(d.tokens, r));
        for (let d of f.rows) for (let m of d) c = c.concat(this.walkTokens(m.tokens, r));
        break;
      }
      case "list": {
        let f = o;
        c = c.concat(this.walkTokens(f.items, r));
        break;
      }
      default: {
        let f = o;
        this.defaults.extensions?.childTokens?.[f.type] ? this.defaults.extensions.childTokens[f.type].forEach((d) => {
          let m = f[d].flat(1 / 0);
          c = c.concat(this.walkTokens(m, r));
        }) : f.tokens && (c = c.concat(this.walkTokens(f.tokens, r)));
      }
    }
    return c;
  }
  use(...u) {
    let r = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return u.forEach((c) => {
      let o = { ...c };
      if (o.async = this.defaults.async || o.async || !1, c.extensions && (c.extensions.forEach((f) => {
        if (!f.name) throw new Error("extension name required");
        if ("renderer" in f) {
          let d = r.renderers[f.name];
          d ? r.renderers[f.name] = function(...m) {
            let g = f.renderer.apply(this, m);
            return g === !1 && (g = d.apply(this, m)), g;
          } : r.renderers[f.name] = f.renderer;
        }
        if ("tokenizer" in f) {
          if (!f.level || f.level !== "block" && f.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let d = r[f.level];
          d ? d.unshift(f.tokenizer) : r[f.level] = [f.tokenizer], f.start && (f.level === "block" ? r.startBlock ? r.startBlock.push(f.start) : r.startBlock = [f.start] : f.level === "inline" && (r.startInline ? r.startInline.push(f.start) : r.startInline = [f.start]));
        }
        "childTokens" in f && f.childTokens && (r.childTokens[f.name] = f.childTokens);
      }), o.extensions = r), c.renderer) {
        let f = this.defaults.renderer || new Eo(this.defaults);
        for (let d in c.renderer) {
          if (!(d in f)) throw new Error(`renderer '${d}' does not exist`);
          if (["options", "parser"].includes(d)) continue;
          let m = d, g = c.renderer[m], S = f[m];
          f[m] = (...T) => {
            let A = g.apply(f, T);
            return A === !1 && (A = S.apply(f, T)), A || "";
          };
        }
        o.renderer = f;
      }
      if (c.tokenizer) {
        let f = this.defaults.tokenizer || new xo(this.defaults);
        for (let d in c.tokenizer) {
          if (!(d in f)) throw new Error(`tokenizer '${d}' does not exist`);
          if (["options", "rules", "lexer"].includes(d)) continue;
          let m = d, g = c.tokenizer[m], S = f[m];
          f[m] = (...T) => {
            let A = g.apply(f, T);
            return A === !1 && (A = S.apply(f, T)), A;
          };
        }
        o.tokenizer = f;
      }
      if (c.hooks) {
        let f = this.defaults.hooks || new Tr();
        for (let d in c.hooks) {
          if (!(d in f)) throw new Error(`hook '${d}' does not exist`);
          if (["options", "block"].includes(d)) continue;
          let m = d, g = c.hooks[m], S = f[m];
          Tr.passThroughHooks.has(d) ? f[m] = (T) => {
            if (this.defaults.async && Tr.passThroughHooksRespectAsync.has(d)) return (async () => {
              let y = await g.call(f, T);
              return S.call(f, y);
            })();
            let A = g.call(f, T);
            return S.call(f, A);
          } : f[m] = (...T) => {
            if (this.defaults.async) return (async () => {
              let y = await g.apply(f, T);
              return y === !1 && (y = await S.apply(f, T)), y;
            })();
            let A = g.apply(f, T);
            return A === !1 && (A = S.apply(f, T)), A;
          };
        }
        o.hooks = f;
      }
      if (c.walkTokens) {
        let f = this.defaults.walkTokens, d = c.walkTokens;
        o.walkTokens = function(m) {
          let g = [];
          return g.push(d.call(this, m)), f && (g = g.concat(f.call(this, m))), g;
        };
      }
      this.defaults = { ...this.defaults, ...o };
    }), this;
  }
  setOptions(u) {
    return this.defaults = { ...this.defaults, ...u }, this;
  }
  lexer(u, r) {
    return Xn.lex(u, r ?? this.defaults);
  }
  parser(u, r) {
    return Qn.parse(u, r ?? this.defaults);
  }
  parseMarkdown(u) {
    return (r, c) => {
      let o = { ...c }, f = { ...this.defaults, ...o }, d = this.onError(!!f.silent, !!f.async);
      if (this.defaults.async === !0 && o.async === !1) return d(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof r > "u" || r === null) return d(new Error("marked(): input parameter is undefined or null"));
      if (typeof r != "string") return d(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(r) + ", string expected"));
      if (f.hooks && (f.hooks.options = f, f.hooks.block = u), f.async) return (async () => {
        let m = f.hooks ? await f.hooks.preprocess(r) : r, g = await (f.hooks ? await f.hooks.provideLexer(u) : u ? Xn.lex : Xn.lexInline)(m, f), S = f.hooks ? await f.hooks.processAllTokens(g) : g;
        f.walkTokens && await Promise.all(this.walkTokens(S, f.walkTokens));
        let T = await (f.hooks ? await f.hooks.provideParser(u) : u ? Qn.parse : Qn.parseInline)(S, f);
        return f.hooks ? await f.hooks.postprocess(T) : T;
      })().catch(d);
      try {
        f.hooks && (r = f.hooks.preprocess(r));
        let m = (f.hooks ? f.hooks.provideLexer(u) : u ? Xn.lex : Xn.lexInline)(r, f);
        f.hooks && (m = f.hooks.processAllTokens(m)), f.walkTokens && this.walkTokens(m, f.walkTokens);
        let g = (f.hooks ? f.hooks.provideParser(u) : u ? Qn.parse : Qn.parseInline)(m, f);
        return f.hooks && (g = f.hooks.postprocess(g)), g;
      } catch (m) {
        return d(m);
      }
    };
  }
  onError(u, r) {
    return (c) => {
      if (c.message += `
Please report this to https://github.com/markedjs/marked.`, u) {
        let o = "<p>An error occurred:</p><pre>" + pn(c.message + "", !0) + "</pre>";
        return r ? Promise.resolve(o) : o;
      }
      if (r) return Promise.reject(c);
      throw c;
    };
  }
}, li = new b_();
function Xe(u, r) {
  return li.parse(u, r);
}
Xe.options = Xe.setOptions = function(u) {
  return li.setOptions(u), Xe.defaults = li.defaults, ub(Xe.defaults), Xe;
};
Xe.getDefaults = Qd;
Xe.defaults = ai;
function S_(...u) {
  return li.use(...u), Xe.defaults = li.defaults, ub(Xe.defaults), Xe;
}
Xe.use = S_;
Xe.walkTokens = function(u, r) {
  return li.walkTokens(u, r);
};
Xe.parseInline = li.parseInline;
Xe.Parser = Qn;
Xe.parser = Qn.parse;
Xe.Renderer = Eo;
Xe.TextRenderer = Pd;
Xe.Lexer = Xn;
Xe.lexer = Xn.lex;
Xe.Tokenizer = xo;
Xe.Hooks = Tr;
Xe.parse = Xe;
Xe.options;
Xe.setOptions;
Xe.walkTokens;
Xe.parseInline;
Qn.parse;
Xn.lex;
Xe.setOptions({ breaks: !0, gfm: !0 });
ib.addHook("afterSanitizeAttributes", (u) => {
  u.tagName === "A" && u.hasAttribute("href") && (u.setAttribute("target", "_blank"), u.setAttribute("rel", "noopener noreferrer"));
});
function x_(u) {
  const r = Xe.parse(String(u ?? ""), { async: !1 });
  return ib.sanitize(r, { USE_PROFILES: { html: !0 } });
}
window.aiboMarkdown = { render: x_ };
const Wd = { "character-hub": UE, "memory-panel": LE, "artifacts-panel": HE, "speech-panel": kE, "help-panel": BE, history: GE }, wr = document.createElement("div");
wr.id = "panel-parking";
wr.hidden = !0;
document.body.append(wr);
const pb = Object.fromEntries(Object.keys(Wd).map((u) => {
  const r = document.createElement("div");
  return r.id = u, r.className = "aibo-panel hidden", wr.append(r), [u, r];
}));
let jd;
const gb = {
  open(u) {
    su.flushSync(() => jd(u));
  },
  close() {
    su.flushSync(() => jd(null));
  },
  button() {
    const u = document.createElement("button");
    return u.type = "button", u.className = Wy({ variant: "ghost" }), u.dataset.slot = "button", u;
  },
  requestClose() {
    window.dispatchEvent(new Event("aibo-request-close"));
  }
};
window.aiboUi = gb;
function E_({ id: u }) {
  const r = z.useRef(null);
  return z.useLayoutEffect(() => {
    const c = pb[u];
    return r.current.append(c), () => {
      wr.append(c);
    };
  }, [u]), /* @__PURE__ */ p.jsx("div", { ref: r, className: "panel-mount" });
}
function T_() {
  const [u, r] = z.useState(null), [c, o] = z.useState("zh");
  jd = r, z.useEffect(() => {
    const m = () => o(window.aiboVoice?.language || "zh");
    return window.addEventListener("aibo-language", m), () => window.removeEventListener("aibo-language", m);
  }, []);
  const f = { zh: ["角色", "记忆", "手记", "设置", "帮助与快捷键", "对话记录"], en: ["Character", "Memory", "Files", "Settings", "Help & shortcuts", "Conversation history"], ja: ["キャラクター", "記憶", "手記", "設定", "ヘルプとショートカット", "会話履歴"] }, d = u ? (f[c] || f.zh)[Object.keys(Wd).indexOf(u)] : "";
  return /* @__PURE__ */ p.jsx(NE, { open: !!u, onOpenChange: (m) => {
    m || gb.requestClose();
  }, children: /* @__PURE__ */ p.jsxs(Iy, { className: "aibo-dialog", closeLabel: c === "zh" ? "关闭" : c === "ja" ? "閉じる" : "Close", "aria-describedby": void 0, onOpenAutoFocus: (m) => m.preventDefault(), onCloseAutoFocus: (m) => m.preventDefault(), onEscapeKeyDown: (m) => {
    m.isComposing && m.preventDefault();
  }, children: [
    /* @__PURE__ */ p.jsx(Fy, { className: "sr-only", children: d }),
    u && /* @__PURE__ */ p.jsx(E_, { id: u }, u)
  ] }) });
}
function __() {
  return /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsx(wE, {}),
    Object.entries(Wd).map(([u, r]) => su.createPortal(/* @__PURE__ */ p.jsx(r, {}), pb[u], u)),
    /* @__PURE__ */ p.jsx(T_, {})
  ] });
}
su.flushSync(() => ix.createRoot(document.getElementById("root")).render(/* @__PURE__ */ p.jsx(__, {})));
for (const u of ["voice-controls.js", "speech-settings.js", "character-state.js", "app.js", "layout-labels.js", "ui-labels.js"])
  await new Promise((r, c) => {
    const o = document.createElement("script");
    o.src = "./" + u, o.onload = () => r(), o.onerror = () => c(Error("Cannot load " + u)), document.body.append(o);
  });

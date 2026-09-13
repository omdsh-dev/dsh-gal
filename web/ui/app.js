function ep(i, o) {
  for (var f = 0; f < o.length; f++) {
    const r = o[f];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const d in r)
        if (d !== "default" && !(d in i)) {
          const y = Object.getOwnPropertyDescriptor(r, d);
          y && Object.defineProperty(i, d, y.get ? y : {
            enumerable: !0,
            get: () => r[d]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }));
}
function lp(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var gf = { exports: {} }, qu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oh;
function np() {
  if (Oh) return qu;
  Oh = 1;
  var i = Symbol.for("react.transitional.element"), o = Symbol.for("react.fragment");
  function f(r, d, y) {
    var b = null;
    if (y !== void 0 && (b = "" + y), d.key !== void 0 && (b = "" + d.key), "key" in d) {
      y = {};
      for (var x in d)
        x !== "key" && (y[x] = d[x]);
    } else y = d;
    return d = y.ref, {
      $$typeof: i,
      type: r,
      key: b,
      ref: d !== void 0 ? d : null,
      props: y
    };
  }
  return qu.Fragment = o, qu.jsx = f, qu.jsxs = f, qu;
}
var _h;
function ap() {
  return _h || (_h = 1, gf.exports = np()), gf.exports;
}
var v = ap(), bf = { exports: {} }, at = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Nh;
function up() {
  if (Nh) return at;
  Nh = 1;
  var i = Symbol.for("react.transitional.element"), o = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), y = Symbol.for("react.consumer"), b = Symbol.for("react.context"), x = Symbol.for("react.forward_ref"), z = Symbol.for("react.suspense"), U = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), h = Symbol.for("react.activity"), A = Symbol.for("react.view_transition"), G = Symbol.iterator;
  function B(p) {
    return p === null || typeof p != "object" ? null : (p = G && p[G] || p["@@iterator"], typeof p == "function" ? p : null);
  }
  var H = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, j = Object.assign, V = {};
  function X(p, w, F) {
    this.props = p, this.context = w, this.refs = V, this.updater = F || H;
  }
  X.prototype.isReactComponent = {}, X.prototype.setState = function(p, w) {
    if (typeof p != "object" && typeof p != "function" && p != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, p, w, "setState");
  }, X.prototype.forceUpdate = function(p) {
    this.updater.enqueueForceUpdate(this, p, "forceUpdate");
  };
  function k() {
  }
  k.prototype = X.prototype;
  function et(p, w, F) {
    this.props = p, this.context = w, this.refs = V, this.updater = F || H;
  }
  var lt = et.prototype = new k();
  lt.constructor = et, j(lt, X.prototype), lt.isPureReactComponent = !0;
  var dt = Array.isArray;
  function W() {
  }
  var ot = { H: null, A: null, T: null, S: null }, Gt = Object.prototype.hasOwnProperty;
  function Lt(p, w, F) {
    var $ = F.ref;
    return {
      $$typeof: i,
      type: p,
      key: w,
      ref: $ !== void 0 ? $ : null,
      props: F
    };
  }
  function jt(p, w) {
    return Lt(p.type, w, p.props);
  }
  function Z(p) {
    return typeof p == "object" && p !== null && p.$$typeof === i;
  }
  function fe(p) {
    var w = { "=": "=0", ":": "=2" };
    return "$" + p.replace(/[=:]/g, function(F) {
      return w[F];
    });
  }
  var se = /\/+/g;
  function Ht(p, w) {
    return typeof p == "object" && p !== null && p.key != null ? fe("" + p.key) : w.toString(36);
  }
  function q(p) {
    switch (p.status) {
      case "fulfilled":
        return p.value;
      case "rejected":
        throw p.reason;
      default:
        switch (typeof p.status == "string" ? p.then(W, W) : (p.status = "pending", p.then(
          function(w) {
            p.status === "pending" && (p.status = "fulfilled", p.value = w);
          },
          function(w) {
            p.status === "pending" && (p.status = "rejected", p.reason = w);
          }
        )), p.status) {
          case "fulfilled":
            return p.value;
          case "rejected":
            throw p.reason;
        }
    }
    throw p;
  }
  function I(p, w, F, $, bt) {
    var pt = typeof p;
    (pt === "undefined" || pt === "boolean") && (p = null);
    var Et = !1;
    if (p === null) Et = !0;
    else
      switch (pt) {
        case "bigint":
        case "string":
        case "number":
          Et = !0;
          break;
        case "object":
          switch (p.$$typeof) {
            case i:
            case o:
              Et = !0;
              break;
            case D:
              return Et = p._init, I(
                Et(p._payload),
                w,
                F,
                $,
                bt
              );
          }
      }
    if (Et)
      return bt = bt(p), Et = $ === "" ? "." + Ht(p, 0) : $, dt(bt) ? (F = "", Et != null && (F = Et.replace(se, "$&/") + "/"), I(bt, w, F, "", function(ml) {
        return ml;
      })) : bt != null && (Z(bt) && (bt = jt(
        bt,
        F + (bt.key == null || p && p.key === bt.key ? "" : ("" + bt.key).replace(
          se,
          "$&/"
        ) + "/") + Et
      )), w.push(bt)), 1;
    Et = 0;
    var K = $ === "" ? "." : $ + ":";
    if (dt(p))
      for (var nt = 0; nt < p.length; nt++)
        $ = p[nt], pt = K + Ht($, nt), Et += I(
          $,
          w,
          F,
          pt,
          bt
        );
    else if (nt = B(p), typeof nt == "function")
      for (p = nt.call(p), nt = 0; !($ = p.next()).done; )
        $ = $.value, pt = K + Ht($, nt++), Et += I(
          $,
          w,
          F,
          pt,
          bt
        );
    else if (pt === "object") {
      if (typeof p.then == "function")
        return I(
          q(p),
          w,
          F,
          $,
          bt
        );
      throw w = String(p), Error(
        "Objects are not valid as a React child (found: " + (w === "[object Object]" ? "object with keys {" + Object.keys(p).join(", ") + "}" : w) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Et;
  }
  function P(p, w, F) {
    if (p == null) return p;
    var $ = [], bt = 0;
    return I(p, $, "", "", function(pt) {
      return w.call(F, pt, bt++);
    }), $;
  }
  function yt(p) {
    if (p._status === -1) {
      var w = p._result, F = w();
      F.then(
        function($) {
          (p._status === 0 || p._status === -1) && (p._status = 1, p._result = $, F.status === void 0 && (F.status = "fulfilled", F.value = $));
        },
        function($) {
          (p._status === 0 || p._status === -1) && (p._status = 2, p._result = $, F.status === void 0 && (F.status = "rejected", F.reason = $));
        }
      ), p._status === -1 && (p._status = 0, p._result = F);
    }
    if (p._status === 1) return p._result.default;
    throw p._result;
  }
  var gt = typeof reportError == "function" ? reportError : function(p) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var w = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof p == "object" && p !== null && typeof p.message == "string" ? String(p.message) : String(p),
        error: p
      });
      if (!window.dispatchEvent(w)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", p);
      return;
    }
    console.error(p);
  };
  function Vt(p) {
    var w = ot.T, F = {};
    F.types = w !== null ? w.types : null, ot.T = F;
    try {
      var $ = p(), bt = ot.S;
      bt !== null && bt(F, $), typeof $ == "object" && $ !== null && typeof $.then == "function" && $.then(W, gt);
    } catch (pt) {
      gt(pt);
    } finally {
      w !== null && F.types !== null && (w.types = F.types), ot.T = w;
    }
  }
  function vl(p) {
    var w = ot.T;
    if (w !== null) {
      var F = w.types;
      F === null ? w.types = [p] : F.indexOf(p) === -1 && F.push(p);
    } else Vt(vl.bind(null, p));
  }
  var yn = {
    map: P,
    forEach: function(p, w, F) {
      P(
        p,
        function() {
          w.apply(this, arguments);
        },
        F
      );
    },
    count: function(p) {
      var w = 0;
      return P(p, function() {
        w++;
      }), w;
    },
    toArray: function(p) {
      return P(p, function(w) {
        return w;
      }) || [];
    },
    only: function(p) {
      if (!Z(p))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return p;
    }
  };
  return at.Activity = h, at.Children = yn, at.Component = X, at.Fragment = f, at.Profiler = d, at.PureComponent = et, at.StrictMode = r, at.Suspense = z, at.ViewTransition = A, at.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ot, at.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(p) {
      return ot.H.useMemoCache(p);
    }
  }, at.addTransitionType = vl, at.cache = function(p) {
    return function() {
      return p.apply(null, arguments);
    };
  }, at.cacheSignal = function() {
    return null;
  }, at.cloneElement = function(p, w, F) {
    if (p == null)
      throw Error(
        "The argument must be a React element, but you passed " + p + "."
      );
    var $ = j({}, p.props), bt = p.key;
    if (w != null)
      for (pt in w.key !== void 0 && (bt = "" + w.key), w)
        !Gt.call(w, pt) || pt === "key" || pt === "__self" || pt === "__source" || pt === "ref" && w.ref === void 0 || ($[pt] = w[pt]);
    var pt = arguments.length - 2;
    if (pt === 1) $.children = F;
    else if (1 < pt) {
      for (var Et = Array(pt), K = 0; K < pt; K++)
        Et[K] = arguments[K + 2];
      $.children = Et;
    }
    return Lt(p.type, bt, $);
  }, at.createContext = function(p) {
    return p = {
      $$typeof: b,
      _currentValue: p,
      _currentValue2: p,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, p.Provider = p, p.Consumer = {
      $$typeof: y,
      _context: p
    }, p;
  }, at.createElement = function(p, w, F) {
    var $, bt = {}, pt = null;
    if (w != null)
      for ($ in w.key !== void 0 && (pt = "" + w.key), w)
        Gt.call(w, $) && $ !== "key" && $ !== "__self" && $ !== "__source" && (bt[$] = w[$]);
    var Et = arguments.length - 2;
    if (Et === 1) bt.children = F;
    else if (1 < Et) {
      for (var K = Array(Et), nt = 0; nt < Et; nt++)
        K[nt] = arguments[nt + 2];
      bt.children = K;
    }
    if (p && p.defaultProps)
      for ($ in Et = p.defaultProps, Et)
        bt[$] === void 0 && (bt[$] = Et[$]);
    return Lt(p, pt, bt);
  }, at.createRef = function() {
    return { current: null };
  }, at.forwardRef = function(p) {
    return { $$typeof: x, render: p };
  }, at.isValidElement = Z, at.lazy = function(p) {
    return {
      $$typeof: D,
      _payload: { _status: -1, _result: p },
      _init: yt
    };
  }, at.memo = function(p, w) {
    return {
      $$typeof: U,
      type: p,
      compare: w === void 0 ? null : w
    };
  }, at.startTransition = Vt, at.unstable_useCacheRefresh = function() {
    return ot.H.useCacheRefresh();
  }, at.use = function(p) {
    return ot.H.use(p);
  }, at.useActionState = function(p, w, F) {
    return ot.H.useActionState(p, w, F);
  }, at.useCallback = function(p, w) {
    return ot.H.useCallback(p, w);
  }, at.useContext = function(p) {
    return ot.H.useContext(p);
  }, at.useDebugValue = function() {
  }, at.useDeferredValue = function(p, w) {
    return ot.H.useDeferredValue(p, w);
  }, at.useEffect = function(p, w) {
    return ot.H.useEffect(p, w);
  }, at.useEffectEvent = function(p) {
    return ot.H.useEffectEvent(p);
  }, at.useId = function() {
    return ot.H.useId();
  }, at.useImperativeHandle = function(p, w, F) {
    return ot.H.useImperativeHandle(p, w, F);
  }, at.useInsertionEffect = function(p, w) {
    return ot.H.useInsertionEffect(p, w);
  }, at.useLayoutEffect = function(p, w) {
    return ot.H.useLayoutEffect(p, w);
  }, at.useMemo = function(p, w) {
    return ot.H.useMemo(p, w);
  }, at.useOptimistic = function(p, w) {
    return ot.H.useOptimistic(p, w);
  }, at.useReducer = function(p, w, F) {
    return ot.H.useReducer(p, w, F);
  }, at.useRef = function(p) {
    return ot.H.useRef(p);
  }, at.useState = function(p) {
    return ot.H.useState(p);
  }, at.useSyncExternalStore = function(p, w, F) {
    return ot.H.useSyncExternalStore(
      p,
      w,
      F
    );
  }, at.useTransition = function() {
    return ot.H.useTransition();
  }, at.version = "19.3.0", at;
}
var Ch;
function Xf() {
  return Ch || (Ch = 1, bf.exports = up()), bf.exports;
}
var _ = Xf();
const ip = /* @__PURE__ */ lp(_), Qu = /* @__PURE__ */ ep({
  __proto__: null,
  default: ip
}, [_]);
var pf = { exports: {} }, Gu = {}, Sf = { exports: {} }, Ef = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zh;
function cp() {
  return zh || (zh = 1, (function(i) {
    function o(q, I) {
      var P = q.length;
      q.push(I);
      t: for (; 0 < P; ) {
        var yt = P - 1 >>> 1, gt = q[yt];
        if (0 < d(gt, I))
          q[yt] = I, q[P] = gt, P = yt;
        else break t;
      }
    }
    function f(q) {
      return q.length === 0 ? null : q[0];
    }
    function r(q) {
      if (q.length === 0) return null;
      var I = q[0], P = q.pop();
      if (P !== I) {
        q[0] = P;
        t: for (var yt = 0, gt = q.length, Vt = gt >>> 1; yt < Vt; ) {
          var vl = 2 * (yt + 1) - 1, yn = q[vl], p = vl + 1, w = q[p];
          if (0 > d(yn, P))
            p < gt && 0 > d(w, yn) ? (q[yt] = w, q[p] = P, yt = p) : (q[yt] = yn, q[vl] = P, yt = vl);
          else if (p < gt && 0 > d(w, P))
            q[yt] = w, q[p] = P, yt = p;
          else break t;
        }
      }
      return I;
    }
    function d(q, I) {
      var P = q.sortIndex - I.sortIndex;
      return P !== 0 ? P : q.id - I.id;
    }
    if (i.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var y = performance;
      i.unstable_now = function() {
        return y.now();
      };
    } else {
      var b = Date, x = b.now();
      i.unstable_now = function() {
        return b.now() - x;
      };
    }
    var z = [], U = [], D = 1, h = null, A = 3, G = !1, B = !1, H = !1, j = !1, V = typeof setTimeout == "function" ? setTimeout : null, X = typeof clearTimeout == "function" ? clearTimeout : null, k = typeof setImmediate < "u" ? setImmediate : null;
    function et(q) {
      for (var I = f(U); I !== null; ) {
        if (I.callback === null) r(U);
        else if (I.startTime <= q)
          r(U), I.sortIndex = I.expirationTime, o(z, I);
        else break;
        I = f(U);
      }
    }
    function lt(q) {
      if (H = !1, et(q), !B)
        if (f(z) !== null)
          B = !0, dt || (dt = !0, Z());
        else {
          var I = f(U);
          I !== null && Ht(lt, I.startTime - q);
        }
    }
    var dt = !1, W = -1, ot = 5, Gt = -1;
    function Lt() {
      return j ? !0 : !(i.unstable_now() - Gt < ot);
    }
    function jt() {
      if (j = !1, dt) {
        var q = i.unstable_now();
        Gt = q;
        var I = !0;
        try {
          t: {
            B = !1, H && (H = !1, X(W), W = -1), G = !0;
            var P = A;
            try {
              e: {
                for (et(q), h = f(z); h !== null && !(h.expirationTime > q && Lt()); ) {
                  var yt = h.callback;
                  if (typeof yt == "function") {
                    h.callback = null, A = h.priorityLevel;
                    var gt = yt(
                      h.expirationTime <= q
                    );
                    if (q = i.unstable_now(), typeof gt == "function") {
                      h.callback = gt, et(q), I = !0;
                      break e;
                    }
                    h === f(z) && r(z), et(q);
                  } else r(z);
                  h = f(z);
                }
                if (h !== null) I = !0;
                else {
                  var Vt = f(U);
                  Vt !== null && Ht(
                    lt,
                    Vt.startTime - q
                  ), I = !1;
                }
              }
              break t;
            } finally {
              h = null, A = P, G = !1;
            }
            I = void 0;
          }
        } finally {
          I ? Z() : dt = !1;
        }
      }
    }
    var Z;
    if (typeof k == "function")
      Z = function() {
        k(jt);
      };
    else if (typeof MessageChannel < "u") {
      var fe = new MessageChannel(), se = fe.port2;
      fe.port1.onmessage = jt, Z = function() {
        se.postMessage(null);
      };
    } else
      Z = function() {
        V(jt, 0);
      };
    function Ht(q, I) {
      W = V(function() {
        q(i.unstable_now());
      }, I);
    }
    i.unstable_IdlePriority = 5, i.unstable_ImmediatePriority = 1, i.unstable_LowPriority = 4, i.unstable_NormalPriority = 3, i.unstable_Profiling = null, i.unstable_UserBlockingPriority = 2, i.unstable_cancelCallback = function(q) {
      q.callback = null;
    }, i.unstable_forceFrameRate = function(q) {
      0 > q || 125 < q ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : ot = 0 < q ? Math.floor(1e3 / q) : 5;
    }, i.unstable_getCurrentPriorityLevel = function() {
      return A;
    }, i.unstable_next = function(q) {
      switch (A) {
        case 1:
        case 2:
        case 3:
          var I = 3;
          break;
        default:
          I = A;
      }
      var P = A;
      A = I;
      try {
        return q();
      } finally {
        A = P;
      }
    }, i.unstable_requestPaint = function() {
      j = !0;
    }, i.unstable_runWithPriority = function(q, I) {
      switch (q) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          q = 3;
      }
      var P = A;
      A = q;
      try {
        return I();
      } finally {
        A = P;
      }
    }, i.unstable_scheduleCallback = function(q, I, P) {
      var yt = i.unstable_now();
      switch (typeof P == "object" && P !== null ? (P = P.delay, P = typeof P == "number" && 0 < P ? yt + P : yt) : P = yt, q) {
        case 1:
          var gt = -1;
          break;
        case 2:
          gt = 250;
          break;
        case 5:
          gt = 1073741823;
          break;
        case 4:
          gt = 1e4;
          break;
        default:
          gt = 5e3;
      }
      return gt = P + gt, q = {
        id: D++,
        callback: I,
        priorityLevel: q,
        startTime: P,
        expirationTime: gt,
        sortIndex: -1
      }, P > yt ? (q.sortIndex = P, o(U, q), f(z) === null && q === f(U) && (H ? (X(W), W = -1) : H = !0, Ht(lt, P - yt))) : (q.sortIndex = gt, o(z, q), B || G || (B = !0, dt || (dt = !0, Z()))), q;
    }, i.unstable_shouldYield = Lt, i.unstable_wrapCallback = function(q) {
      var I = A;
      return function() {
        var P = A;
        A = I;
        try {
          return q.apply(this, arguments);
        } finally {
          A = P;
        }
      };
    };
  })(Ef)), Ef;
}
var Ah;
function op() {
  return Ah || (Ah = 1, Sf.exports = cp()), Sf.exports;
}
var Tf = { exports: {} }, oe = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Dh;
function rp() {
  if (Dh) return oe;
  Dh = 1;
  var i = Xf();
  function o(D) {
    var h = "https://react.dev/errors/" + D;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var A = 2; A < arguments.length; A++)
        h += "&args[]=" + encodeURIComponent(arguments[A]);
    }
    return "Minified React error #" + D + "; visit " + h + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function f() {
  }
  var r = {
    d: {
      f,
      r: function() {
        throw Error(o(522));
      },
      D: f,
      C: f,
      L: f,
      m: f,
      X: f,
      S: f,
      M: f
    },
    p: 0,
    findDOMNode: null
  }, d = Symbol.for("react.portal"), y = Symbol.for("react.recoverable"), b = Symbol.for("react.optimistic_key");
  function x(D, h, A) {
    var G = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: d,
      key: G == null ? null : G === b ? b : "" + G,
      children: D,
      containerInfo: h,
      implementation: A
    };
  }
  var z = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function U(D, h) {
    if (D === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return oe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, oe.browser = function(D) {
    return { $$typeof: y, _reason: D };
  }, oe.createPortal = function(D, h) {
    var A = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(o(299));
    return x(D, h, null, A);
  }, oe.flushSync = function(D) {
    var h = z.T, A = r.p;
    try {
      if (z.T = null, r.p = 2, D) return D();
    } finally {
      z.T = h, r.p = A, r.d.f();
    }
  }, oe.preconnect = function(D, h) {
    typeof D == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, r.d.C(D, h));
  }, oe.prefetchDNS = function(D) {
    typeof D == "string" && r.d.D(D);
  }, oe.preinit = function(D, h) {
    if (typeof D == "string" && h && typeof h.as == "string") {
      var A = h.as, G = U(A, h.crossOrigin), B = typeof h.integrity == "string" ? h.integrity : void 0, H = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      A === "style" ? r.d.S(
        D,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: G,
          integrity: B,
          fetchPriority: H
        }
      ) : A === "script" && r.d.X(D, {
        crossOrigin: G,
        integrity: B,
        fetchPriority: H,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, oe.preinitModule = function(D, h) {
    if (typeof D == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var A = U(
            h.as,
            h.crossOrigin
          );
          r.d.M(D, {
            crossOrigin: A,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
            nonce: typeof h.nonce == "string" ? h.nonce : void 0,
            fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0
          });
        }
      } else h == null && r.d.M(D);
  }, oe.preload = function(D, h) {
    if (typeof D == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var A = h.as, G = U(A, h.crossOrigin);
      r.d.L(D, A, {
        crossOrigin: G,
        integrity: typeof h.integrity == "string" ? h.integrity : void 0,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0,
        type: typeof h.type == "string" ? h.type : void 0,
        fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
        referrerPolicy: typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
        imageSrcSet: typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
        imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
        media: typeof h.media == "string" ? h.media : void 0
      });
    }
  }, oe.preloadModule = function(D, h) {
    if (typeof D == "string")
      if (h) {
        var A = U(h.as, h.crossOrigin);
        r.d.m(D, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: A,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0,
          nonce: typeof h.nonce == "string" ? h.nonce : void 0,
          fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0
        });
      } else r.d.m(D);
  }, oe.requestFormReset = function(D) {
    r.d.r(D);
  }, oe.unstable_batchedUpdates = function(D, h) {
    return D(h);
  }, oe.useFormState = function(D, h, A) {
    return z.H.useFormState(D, h, A);
  }, oe.useFormStatus = function() {
    return z.H.useHostTransitionStatus();
  }, oe.version = "19.3.0", oe;
}
var Rh;
function $h() {
  if (Rh) return Tf.exports;
  Rh = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (o) {
        console.error(o);
      }
  }
  return i(), Tf.exports = rp(), Tf.exports;
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
var Mh;
function fp() {
  if (Mh) return Gu;
  Mh = 1;
  var i = op(), o = Xf(), f = $h();
  function r(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        e += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function d(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function y(t) {
    for (var e = t, l = e; l && !l.alternate; )
      e = l, (e.flags & 4098) !== 0 && (t = e.return), l = e.return;
    for (; e.return; ) e = e.return;
    return e.tag === 3 ? t : null;
  }
  function b(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function x(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function z(t) {
    if (y(t) !== t)
      throw Error(r(188));
  }
  function U(t) {
    var e = t.alternate;
    if (!e) {
      if (e = y(t), e === null) throw Error(r(188));
      return e !== t ? null : t;
    }
    for (var l = t, n = e; ; ) {
      var a = l.return;
      if (a === null) break;
      var u = a.alternate;
      if (u === null) {
        if (n = a.return, n !== null) {
          l = n;
          continue;
        }
        break;
      }
      if (a.child === u.child) {
        for (u = a.child; u; ) {
          if (u === l) return z(a), t;
          if (u === n) return z(a), e;
          u = u.sibling;
        }
        throw Error(r(188));
      }
      if (l.return !== n.return) l = a, n = u;
      else {
        for (var c = !1, s = a.child; s; ) {
          if (s === l) {
            c = !0, l = a, n = u;
            break;
          }
          if (s === n) {
            c = !0, n = a, l = u;
            break;
          }
          s = s.sibling;
        }
        if (!c) {
          for (s = u.child; s; ) {
            if (s === l) {
              c = !0, l = u, n = a;
              break;
            }
            if (s === n) {
              c = !0, n = u, l = a;
              break;
            }
            s = s.sibling;
          }
          if (!c) throw Error(r(189));
        }
      }
      if (l.alternate !== n) throw Error(r(190));
    }
    if (l.tag !== 3) throw Error(r(188));
    return l.stateNode.current === l ? t : e;
  }
  function D(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = D(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  function h(t, e, l, n, a, u) {
    for (; t !== null; ) {
      if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && l(t, n, a, u) || (t.tag !== 22 || t.memoizedState === null) && (e || t.tag !== 5 && t.tag !== 27) && h(
        t.child,
        e,
        l,
        n,
        a,
        u
      ))
        return !0;
      t = t.sibling;
    }
    return !1;
  }
  function A(t) {
    for (t = t.return; t !== null; ) {
      if (t.tag === 3 || t.tag === 5 || t.tag === 27) return t;
      t = t.return;
    }
    return null;
  }
  function G(t) {
    var e = !1;
    for (t = t.return; t !== null && (t.tag === 4 && (e = !0), !(t.tag === 3 || t.tag === 5 || t.tag === 27)); )
      t = t.return;
    return e;
  }
  function B(t) {
    var e = [null, null], l = A(t);
    return l === null || H(
      e,
      t,
      l.child,
      { foundSelf: !1 }
    ), e;
  }
  function H(t, e, l, n) {
    for (; l !== null; ) {
      if (l === e) n.foundSelf = !0;
      else if (l.tag === 5 || l.tag === 27 || l.tag === 6) {
        if (n.foundSelf) return t[1] = l, !0;
        t[0] = l;
      } else if ((l.tag !== 22 || l.memoizedState === null) && H(
        t,
        e,
        l.child,
        n
      ))
        return !0;
      l = l.sibling;
    }
    return !1;
  }
  function j(t) {
    switch (t.tag) {
      case 5:
      case 27:
      case 6:
        return t.stateNode;
      case 3:
        return t.stateNode.containerInfo;
      default:
        throw Error(r(559));
    }
  }
  var V = null, X = null;
  function k(t, e, l) {
    return t === l ? !0 : t === e ? (V = t, !0) : !1;
  }
  function et(t, e, l) {
    return t === l ? (X = t, !1) : t === e ? (X !== null && (V = t), !0) : !1;
  }
  function lt(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function dt(t, e, l) {
    for (var n = 0, a = t; a; a = l(a)) n++;
    a = 0;
    for (var u = e; u; u = l(u)) a++;
    for (; 0 < n - a; ) t = l(t), n--;
    for (; 0 < a - n; ) e = l(e), a--;
    for (; n--; ) {
      if (t === e || e !== null && t === e.alternate)
        return t;
      t = l(t), e = l(e);
    }
    return null;
  }
  var W = Object.assign, ot = Symbol.for("react.element"), Gt = Symbol.for("react.transitional.element"), Lt = Symbol.for("react.portal"), jt = Symbol.for("react.fragment"), Z = Symbol.for("react.strict_mode"), fe = Symbol.for("react.profiler"), se = Symbol.for("react.consumer"), Ht = Symbol.for("react.context"), q = Symbol.for("react.forward_ref"), I = Symbol.for("react.suspense"), P = Symbol.for("react.suspense_list"), yt = Symbol.for("react.memo"), gt = Symbol.for("react.lazy"), Vt = Symbol.for("react.activity"), vl = Symbol.for("react.legacy_hidden"), yn = Symbol.for("react.memo_cache_sentinel"), p = Symbol.for("react.view_transition"), w = Symbol.for("react.recoverable"), F = Symbol.iterator;
  function $(t) {
    return t === null || typeof t != "object" ? null : (t = F && t[F] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var bt = Symbol.for("react.client.reference");
  function pt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === bt ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case jt:
        return "Fragment";
      case fe:
        return "Profiler";
      case Z:
        return "StrictMode";
      case I:
        return "Suspense";
      case P:
        return "SuspenseList";
      case Vt:
        return "Activity";
      case p:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case Lt:
          return "Portal";
        case Ht:
          return t.displayName || "Context";
        case se:
          return (t._context.displayName || "Context") + ".Consumer";
        case q:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case yt:
          return e = t.displayName || null, e !== null ? e : pt(t.type) || "Memo";
        case gt:
          e = t._payload, t = t._init;
          try {
            return pt(t(e));
          } catch {
          }
      }
    return null;
  }
  var Et = Array.isArray, K = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, nt = f.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ml = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Uc = [], Vn = -1;
  function Ie(t) {
    return { current: t };
  }
  function ee(t) {
    0 > Vn || (t.current = Uc[Vn], Uc[Vn] = null, Vn--);
  }
  function Dt(t, e) {
    Vn++, Uc[Vn] = t.current, t.current = e;
  }
  var Pe = Ie(null), Za = Ie(null), wl = Ie(null), Ju = Ie(null);
  function Fu(t, e) {
    switch (Dt(wl, e), Dt(Za, t), Dt(Pe, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? jm(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = jm(e), t = Um(e, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    ee(Pe), Dt(Pe, t);
  }
  function Xn() {
    ee(Pe), ee(Za), ee(wl);
  }
  function wc(t) {
    var e = t.memoizedState;
    e !== null && (Da._currentValue = e.memoizedState, Dt(Ju, t)), e = Pe.current;
    var l = Um(e, t.type);
    e !== l && (Dt(Za, t), Dt(Pe, l));
  }
  function $u(t) {
    Za.current === t && (ee(Pe), ee(Za)), Ju.current === t && (ee(Ju), Da._currentValue = ml);
  }
  var Hc, ts;
  function Hl(t) {
    if (Hc === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        Hc = e && e[1] || "", ts = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Hc + t + ts;
  }
  var Bc = !1;
  function Yc(t, e) {
    if (!t || Bc) return "";
    Bc = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var M = function() {
                throw Error();
              };
              if (Object.defineProperty(M.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(M, []);
                } catch (Y) {
                  var S = Y;
                }
                Reflect.construct(t, [], M);
              } else {
                try {
                  M.call();
                } catch (Y) {
                  S = Y;
                }
                M = !1;
                try {
                  var N = Object.getOwnPropertyDescriptor(
                    t.prototype,
                    "props"
                  );
                  Object.defineProperty(t.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), M = !0, new t();
                } finally {
                  M && (N !== void 0 ? Object.defineProperty(t.prototype, "props", N) : delete t.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (Y) {
                S = Y;
              }
              (M = t()) && typeof M.catch == "function" && M.catch(function() {
              });
            }
          } catch (Y) {
            if (Y && S && typeof Y.stack == "string")
              return [Y.stack, S.stack];
          }
          return [null, null];
        }
      };
      n.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var a = Object.getOwnPropertyDescriptor(
        n.DetermineComponentFrameRoot,
        "name"
      );
      a && a.configurable && Object.defineProperty(
        n.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = n.DetermineComponentFrameRoot(), c = u[0], s = u[1];
      if (c && s) {
        var m = c.split(`
`), T = s.split(`
`);
        for (a = n = 0; n < m.length && !m[n].includes("DetermineComponentFrameRoot"); )
          n++;
        for (; a < T.length && !T[a].includes(
          "DetermineComponentFrameRoot"
        ); )
          a++;
        if (n === m.length || a === T.length)
          for (n = m.length - 1, a = T.length - 1; 1 <= n && 0 <= a && m[n] !== T[a]; )
            a--;
        for (; 1 <= n && 0 <= a; n--, a--)
          if (m[n] !== T[a]) {
            if (n !== 1 || a !== 1)
              do
                if (n--, a--, 0 > a || m[n] !== T[a]) {
                  var C = `
` + m[n].replace(" at new ", " at ");
                  return t.displayName && C.includes("<anonymous>") && (C = C.replace("<anonymous>", t.displayName)), C;
                }
              while (1 <= n && 0 <= a);
            break;
          }
      }
    } finally {
      Bc = !1, Error.prepareStackTrace = l;
    }
    return (l = t ? t.displayName || t.name : "") ? Hl(l) : "";
  }
  function ug(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Hl(t.type);
      case 16:
        return Hl("Lazy");
      case 13:
        return t.child !== e && e !== null ? Hl("Suspense Fallback") : Hl("Suspense");
      case 19:
        return Hl("SuspenseList");
      case 0:
      case 15:
        return Yc(t.type, !1);
      case 11:
        return Yc(t.type.render, !1);
      case 1:
        return Yc(t.type, !0);
      case 31:
        return Hl("Activity");
      case 30:
        return Hl("ViewTransition");
      default:
        return "";
    }
  }
  function es(t) {
    try {
      var e = "", l = null;
      do
        e += ug(t, l), l = t, t = t.return;
      while (t);
      return e;
    } catch (n) {
      return `
Error generating stack: ` + n.message + `
` + n.stack;
    }
  }
  var qc = Object.prototype.hasOwnProperty, Gc = i.unstable_scheduleCallback, Lc = i.unstable_cancelCallback, ig = i.unstable_shouldYield, cg = i.unstable_requestPaint, xe = i.unstable_now, og = i.unstable_getCurrentPriorityLevel, ls = i.unstable_ImmediatePriority, ns = i.unstable_UserBlockingPriority, Wu = i.unstable_NormalPriority, rg = i.unstable_LowPriority, as = i.unstable_IdlePriority, fg = i.log, sg = i.unstable_setDisableYieldValue, Ka = null, Oe = null;
  function Bl(t) {
    if (typeof fg == "function" && sg(t), Oe && typeof Oe.setStrictMode == "function")
      try {
        Oe.setStrictMode(Ka, t);
      } catch {
      }
  }
  var _e = Math.clz32 ? Math.clz32 : mg, dg = Math.log, vg = Math.LN2;
  function mg(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (dg(t) / vg | 0) | 0;
  }
  var ku = 256, Iu = 262144, Pu = 4194304;
  function gn(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
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
        return t & -t;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
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
        return t;
    }
  }
  function ti(t, e, l) {
    var n = t.pendingLanes;
    if (n === 0) return 0;
    var a = 0, u = t.suspendedLanes, c = t.pingedLanes;
    t = t.warmLanes;
    var s = n & 134217727;
    return s !== 0 ? (n = s & ~u, n !== 0 ? a = gn(n) : (c &= s, c !== 0 ? a = gn(c) : l || (l = s & ~t, l !== 0 && (a = gn(l))))) : (s = n & ~u, s !== 0 ? a = gn(s) : c !== 0 ? a = gn(c) : l || (l = n & ~t, l !== 0 && (a = gn(l)))), a === 0 ? 0 : e !== 0 && e !== a && (e & u) === 0 && (u = a & -a, l = e & -e, u >= l || u === 32 && (l & 4194048) !== 0) ? e : a;
  }
  function Ja(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function us(t, e) {
    (e & 8) !== 0 && (e |= e & 32);
    var l = t.entangledLanes;
    if (l !== 0)
      for (t = t.entanglements, l &= e; 0 < l; ) {
        var n = 31 - _e(l), a = 1 << n;
        e |= t[n], l &= ~a;
      }
    return e;
  }
  function hg(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
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
        return e + 5e3;
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
  function is() {
    var t = Pu;
    return Pu <<= 1, (Pu & 62914560) === 0 && (Pu = 4194304), t;
  }
  function Vc(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function Fa(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function yg(t, e, l, n, a, u) {
    var c = t.pendingLanes;
    t.pendingLanes = l, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= l, t.entangledLanes &= l, t.errorRecoveryDisabledLanes &= l, t.shellSuspendCounter = 0;
    var s = t.entanglements, m = t.expirationTimes, T = t.hiddenUpdates;
    for (l = c & ~l; 0 < l; ) {
      var C = 31 - _e(l), M = 1 << C;
      s[C] = 0, m[C] = -1;
      var S = T[C];
      if (S !== null)
        for (T[C] = null, C = 0; C < S.length; C++) {
          var N = S[C];
          N !== null && (N.lane &= -536870913);
        }
      l &= ~M;
    }
    n !== 0 && cs(t, n, 0), u !== 0 && a === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(c & ~e));
  }
  function cs(t, e, l) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var n = 31 - _e(e);
    t.entangledLanes |= e, t.entanglements[n] = t.entanglements[n] | 1073741824 | l & 261930;
  }
  function os(t, e) {
    var l = t.entangledLanes |= e;
    for (t = t.entanglements; l; ) {
      var n = 31 - _e(l), a = 1 << n;
      a & e | t[n] & e && (t[n] |= e), l &= ~a;
    }
  }
  function rs(t, e) {
    var l = e & -e;
    return l = (l & 42) !== 0 ? 1 : Xc(l), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l;
  }
  function Xc(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
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
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function Qc(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function fs() {
    var t = nt.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : gh(t.type));
  }
  function ss(t, e) {
    var l = nt.p;
    try {
      return nt.p = t, e();
    } finally {
      nt.p = l;
    }
  }
  var hl = Math.random().toString(36).slice(2), le = "__reactFiber$" + hl, ge = "__reactProps$" + hl, Qn = "__reactContainer$" + hl, ds = "__reactEvents$" + hl, gg = "__reactListeners$" + hl, bg = "__reactHandles$" + hl, vs = "__reactResources$" + hl, $a = "__reactMarker$" + hl, ei = "__reactLoad$" + hl;
  function li(t) {
    delete t[le], delete t[ge], delete t[gg], delete t[bg];
  }
  function bn(t) {
    var e;
    if (e = t[le]) return e;
    for (var l = t.parentNode; l; ) {
      if (e = l[Qn] || l[le]) {
        if (l = e.alternate, e.child !== null || l !== null && l.child !== null)
          for (t = km(t); t !== null; ) {
            if (l = t[le]) return l;
            t = km(t);
          }
        return e;
      }
      t = l, l = t.parentNode;
    }
    return null;
  }
  function Zn(t) {
    if (t = t[le] || t[Qn]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function Wa(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(r(33));
  }
  function Kn(t) {
    var e = t[vs];
    return e || (e = t[vs] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function Wt(t) {
    t[$a] = !0;
  }
  function ms(t) {
    t[ei] = void 0;
  }
  var hs = /* @__PURE__ */ new Set(), ys = {};
  function pn(t, e) {
    Jn(t, e), Jn(t + "Capture", e);
  }
  function Jn(t, e) {
    for (ys[t] = e, t = 0; t < e.length; t++)
      hs.add(e[t]);
  }
  var pg = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), gs = {}, bs = {};
  function Sg(t) {
    return qc.call(bs, t) ? !0 : qc.call(gs, t) ? !1 : pg.test(t) ? bs[t] = !0 : (gs[t] = !0, !1);
  }
  var St = !1;
  function ps() {
    var t = St;
    return St = !1, t;
  }
  function ni(t, e, l) {
    if (Sg(e))
      if (l === null) t.removeAttribute(e);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var n = e.toLowerCase().slice(0, 5);
            if (n !== "data-" && n !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, l);
      }
  }
  function ai(t, e, l) {
    if (l === null) t.removeAttribute(e);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, l);
    }
  }
  function yl(t, e, l, n) {
    if (n === null) t.removeAttribute(l);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttributeNS(e, l, n);
    }
  }
  function Ne(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function Ss(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function Eg(t, e, l) {
    var n = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    );
    if (!t.hasOwnProperty(e) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var a = n.get, u = n.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return a.call(this);
        },
        set: function(c) {
          l = "" + c, u.call(this, c);
        }
      }), Object.defineProperty(t, e, {
        enumerable: n.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(c) {
          l = "" + c;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function Zc(t) {
    if (!t._valueTracker) {
      var e = Ss(t) ? "checked" : "value";
      t._valueTracker = Eg(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function Es(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(), n = "";
    return t && (n = Ss(t) ? t.checked ? "true" : "false" : t.value), t = n, t !== l ? (e.setValue(t), !0) : !1;
  }
  var Tg = /[\n"\\]/g;
  function Ue(t) {
    return t.replace(
      Tg,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Kc(t, e, l, n, a, u, c, s) {
    t.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? t.type = c : t.removeAttribute("type"), e != null ? c === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + Ne(e)) : t.value !== "" + Ne(e) && (t.value = "" + Ne(e)) : c !== "submit" && c !== "reset" || t.removeAttribute("value"), e != null ? c === "number" && t.value == e ? Jc(t, Ne(t.value)) : Jc(t, Ne(e)) : l != null ? Jc(t, Ne(l)) : n != null && t.removeAttribute("value"), a == null && u != null && (t.defaultChecked = !!u), a != null && (t.checked = a && typeof a != "function" && typeof a != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? t.name = "" + Ne(s) : t.removeAttribute("name");
  }
  function Ts(t, e, l, n, a, u, c, s) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), e != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || e != null)) {
        Zc(t);
        return;
      }
      l = l != null ? "" + Ne(l) : "", e = e != null ? "" + Ne(e) : l, s || e === t.value || (t.value = e), t.defaultValue = e;
    }
    n = n ?? a, n = typeof n != "function" && typeof n != "symbol" && !!n, t.checked = s ? t.checked : !!n, t.defaultChecked = !!n, c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (t.name = c), Zc(t);
  }
  function Jc(t, e) {
    t.defaultValue !== "" + e && (t.defaultValue = "" + e);
  }
  function Fn(t, e, l, n) {
    if (t = t.options, e) {
      e = {};
      for (var a = 0; a < l.length; a++)
        e["$" + l[a]] = !0;
      for (l = 0; l < t.length; l++)
        a = e.hasOwnProperty("$" + t[l].value), t[l].selected !== a && (t[l].selected = a), a && n && (t[l].defaultSelected = !0);
    } else {
      for (l = "" + Ne(l), e = null, a = 0; a < t.length; a++) {
        if (t[a].value === l) {
          t[a].selected = !0, n && (t[a].defaultSelected = !0);
          return;
        }
        e !== null || t[a].disabled || (e = t[a]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function xs(t, e, l) {
    if (e != null && (e = "" + Ne(e), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? "" + Ne(l) : "";
  }
  function Os(t, e, l, n) {
    if (e == null) {
      if (n != null) {
        if (l != null) throw Error(r(92));
        if (Et(n)) {
          if (1 < n.length) throw Error(r(93));
          n = n[0];
        }
        l = n;
      }
      l == null && (l = ""), e = l;
    }
    l = Ne(e), t.defaultValue = l, n = t.textContent, n === l && n !== "" && n !== null && (t.value = n), Zc(t);
  }
  function $n(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var xg = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function _s(t, e, l) {
    var n = e.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? n ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : n ? t.setProperty(e, l) : typeof l != "number" || l === 0 || xg.has(e) ? e === "float" ? t.cssFloat = l : t[e] = ("" + l).trim() : t[e] = l + "px";
  }
  function Ns(t, e, l) {
    if (e != null && typeof e != "object")
      throw Error(r(62));
    if (t = t.style, l != null) {
      for (var n in l)
        !l.hasOwnProperty(n) || e != null && e.hasOwnProperty(n) || (n.indexOf("--") === 0 ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "", St = !0);
      for (var a in e)
        n = e[a], e.hasOwnProperty(a) && l[a] !== n && (_s(t, a, n), St = !0);
    } else
      for (var u in e)
        e.hasOwnProperty(u) && _s(t, u, e[u]);
  }
  function Fc(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
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
  var Og = /* @__PURE__ */ new Map([
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
  ]), _g = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ui(t) {
    return _g.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function tl() {
  }
  var $c = null;
  function Wc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Wn = null, kn = null;
  function Cs(t) {
    var e = Zn(t);
    if (e && (t = e.stateNode)) {
      var l = t[ge] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (Kc(
            t,
            l.value,
            l.defaultValue,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name
          ), e = l.name, l.type === "radio" && e != null) {
            for (l = t; l.parentNode; ) l = l.parentNode;
            for (l = l.querySelectorAll(
              'input[name="' + Ue(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < l.length; e++) {
              var n = l[e];
              if (n !== t && n.form === t.form) {
                var a = n[ge] || null;
                if (!a) throw Error(r(90));
                Kc(
                  n,
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
            for (e = 0; e < l.length; e++)
              n = l[e], n.form === t.form && Es(n);
          }
          break t;
        case "textarea":
          xs(t, l.value, l.defaultValue);
          break t;
        case "select":
          e = l.value, e != null && Fn(t, !!l.multiple, e, !1);
      }
    }
  }
  var kc = !1;
  function zs(t, e, l) {
    if (kc) return t(e, l);
    kc = !0;
    try {
      var n = t(e);
      return n;
    } finally {
      if (kc = !1, (Wn !== null || kn !== null) && (uc(), Wn && (e = Wn, t = kn, kn = Wn = null, Cs(e), t)))
        for (e = 0; e < t.length; e++) Cs(t[e]);
    }
  }
  function ka(t, e) {
    var l = t.stateNode;
    if (l === null) return null;
    var n = l[ge] || null;
    if (n === null) return null;
    l = n[e];
    t: switch (e) {
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
        (n = !n.disabled) || (t = t.type, n = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !n;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (l && typeof l != "function")
      throw Error(
        r(231, e, typeof l)
      );
    return l;
  }
  var gl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ic = !1;
  if (gl)
    try {
      var Ia = {};
      Object.defineProperty(Ia, "passive", {
        get: function() {
          Ic = !0;
        }
      }), window.addEventListener("test", Ia, Ia), window.removeEventListener("test", Ia, Ia);
    } catch {
      Ic = !1;
    }
  var Yl = null, Pc = null, ii = null;
  function As() {
    if (ii) return ii;
    var t, e = Pc, l = e.length, n, a = "value" in Yl ? Yl.value : Yl.textContent, u = a.length;
    for (t = 0; t < l && e[t] === a[t]; t++) ;
    var c = l - t;
    for (n = 1; n <= c && e[l - n] === a[u - n]; n++) ;
    return ii = a.slice(t, 1 < n ? 1 - n : void 0);
  }
  function ci(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function oi() {
    return !0;
  }
  function Ds() {
    return !1;
  }
  function de(t) {
    function e(l, n, a, u, c) {
      this._reactName = l, this._targetInst = a, this.type = n, this.nativeEvent = u, this.target = c, this.currentTarget = null;
      for (var s in t)
        t.hasOwnProperty(s) && (l = t[s], this[s] = l ? l(u) : u[s]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? oi : Ds, this.isPropagationStopped = Ds, this;
    }
    return W(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = oi);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = oi);
      },
      persist: function() {
      },
      isPersistent: oi
    }), e;
  }
  var ql = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, ri = de(ql), Pa = W({}, ql, { view: 0, detail: 0 }), Ng = de(Pa), to, eo, tu, fi = W({}, Pa, {
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
    getModifierState: no,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== tu && (tu && t.type === "mousemove" ? (to = t.screenX - tu.screenX, eo = t.screenY - tu.screenY) : eo = to = 0, tu = t), to);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : eo;
    }
  }), Rs = de(fi), Cg = W({}, fi, { dataTransfer: 0 }), zg = de(Cg), Ag = W({}, Pa, { relatedTarget: 0 }), lo = de(Ag), Dg = W({}, ql, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Rg = de(Dg), Mg = W({}, ql, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), jg = de(Mg), Ug = W({}, ql, { data: 0 }), Ms = de(Ug), wg = {
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
  }, Hg = {
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
  }, Bg = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Yg(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = Bg[t]) ? !!e[t] : !1;
  }
  function no() {
    return Yg;
  }
  var qg = W({}, Pa, {
    key: function(t) {
      if (t.key) {
        var e = wg[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = ci(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Hg[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: no,
    charCode: function(t) {
      return t.type === "keypress" ? ci(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? ci(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Gg = de(qg), Lg = W({}, fi, {
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
  }), js = de(Lg), Vg = W({}, ql, { submitter: 0 }), Xg = de(Vg), Qg = W({}, Pa, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: no
  }), Zg = de(Qg), Kg = W({}, ql, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Jg = de(Kg), Fg = W({}, fi, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), $g = de(Fg), Wg = W({}, ql, {
    newState: 0,
    oldState: 0,
    source: 0
  }), kg = de(Wg), Ig = [9, 13, 27, 32], ao = gl && "CompositionEvent" in window, eu = null;
  gl && "documentMode" in document && (eu = document.documentMode);
  var Pg = gl && "TextEvent" in window && !eu, Us = gl && (!ao || eu && 8 < eu && 11 >= eu), ws = " ", Hs = !1;
  function Bs(t, e) {
    switch (t) {
      case "keyup":
        return Ig.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Ys(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var In = !1;
  function t0(t, e) {
    switch (t) {
      case "compositionend":
        return Ys(e);
      case "keypress":
        return e.which !== 32 ? null : (Hs = !0, ws);
      case "textInput":
        return t = e.data, t === ws && Hs ? null : t;
      default:
        return null;
    }
  }
  function e0(t, e) {
    if (In)
      return t === "compositionend" || !ao && Bs(t, e) ? (t = As(), ii = Pc = Yl = null, In = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
          if (e.char && 1 < e.char.length)
            return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return Us && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var l0 = {
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
  function qs(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!l0[t.type] : e === "textarea";
  }
  function Gs(t, e, l, n) {
    Wn ? kn ? kn.push(n) : kn = [n] : Wn = n, e = sc(e, "onChange"), 0 < e.length && (l = new ri(
      "onChange",
      "change",
      null,
      l,
      n
    ), t.push({ event: l, listeners: e }));
  }
  var lu = null, nu = null;
  function n0(t) {
    Cm(t, 0);
  }
  function si(t) {
    var e = Wa(t);
    if (Es(e)) return t;
  }
  function Ls(t, e) {
    if (t === "change") return e;
  }
  var Vs = !1;
  if (gl) {
    var uo;
    if (gl) {
      var io = "oninput" in document;
      if (!io) {
        var Xs = document.createElement("div");
        Xs.setAttribute("oninput", "return;"), io = typeof Xs.oninput == "function";
      }
      uo = io;
    } else uo = !1;
    Vs = uo && (!document.documentMode || 9 < document.documentMode);
  }
  function Qs() {
    lu && (lu.detachEvent("onpropertychange", Zs), nu = lu = null);
  }
  function Zs(t) {
    if (t.propertyName === "value" && si(nu)) {
      var e = [];
      Gs(
        e,
        nu,
        t,
        Wc(t)
      ), zs(n0, e);
    }
  }
  function a0(t, e, l) {
    t === "focusin" ? (Qs(), lu = e, nu = l, lu.attachEvent("onpropertychange", Zs)) : t === "focusout" && Qs();
  }
  function u0(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return si(nu);
  }
  function i0(t, e) {
    if (t === "click") return si(e);
  }
  function c0(t, e) {
    if (t === "input" || t === "change")
      return si(e);
  }
  function o0(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var Ce = typeof Object.is == "function" ? Object.is : o0;
  function au(t, e) {
    if (Ce(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var l = Object.keys(t), n = Object.keys(e);
    if (l.length !== n.length) return !1;
    for (n = 0; n < l.length; n++) {
      var a = l[n];
      if (!qc.call(e, a) || !Ce(t[a], e[a]))
        return !1;
    }
    return !0;
  }
  function co(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function Ks(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Js(t, e) {
    var l = Ks(t);
    t = 0;
    for (var n; l; ) {
      if (l.nodeType === 3) {
        if (n = t + l.textContent.length, t <= e && n >= e)
          return { node: l, offset: e - t };
        t = n;
      }
      t: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break t;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = Ks(l);
    }
  }
  function Fs(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Fs(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function $s(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = co(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = co(t.document);
    }
    return e;
  }
  function oo(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var r0 = gl && "documentMode" in document && 11 >= document.documentMode, Pn = null, ro = null, uu = null, fo = !1;
  function Ws(t, e, l) {
    var n = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    fo || Pn == null || Pn !== co(n) || (n = Pn, "selectionStart" in n && oo(n) ? n = { start: n.selectionStart, end: n.selectionEnd } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
      anchorNode: n.anchorNode,
      anchorOffset: n.anchorOffset,
      focusNode: n.focusNode,
      focusOffset: n.focusOffset
    }), uu && au(uu, n) || (uu = n, n = sc(ro, "onSelect"), 0 < n.length && (e = new ri(
      "onSelect",
      "select",
      null,
      e,
      l
    ), t.push({ event: e, listeners: n }), e.target = Pn)));
  }
  function Sn(t, e) {
    var l = {};
    return l[t.toLowerCase()] = e.toLowerCase(), l["Webkit" + t] = "webkit" + e, l["Moz" + t] = "moz" + e, l;
  }
  var ta = {
    animationend: Sn("Animation", "AnimationEnd"),
    animationiteration: Sn("Animation", "AnimationIteration"),
    animationstart: Sn("Animation", "AnimationStart"),
    transitionrun: Sn("Transition", "TransitionRun"),
    transitionstart: Sn("Transition", "TransitionStart"),
    transitioncancel: Sn("Transition", "TransitionCancel"),
    transitionend: Sn("Transition", "TransitionEnd")
  }, so = {}, ks = {};
  gl && (ks = document.createElement("div").style, "AnimationEvent" in window || (delete ta.animationend.animation, delete ta.animationiteration.animation, delete ta.animationstart.animation), "TransitionEvent" in window || delete ta.transitionend.transition);
  function En(t) {
    if (so[t]) return so[t];
    if (!ta[t]) return t;
    var e = ta[t], l;
    for (l in e)
      if (e.hasOwnProperty(l) && l in ks)
        return so[t] = e[l];
    return t;
  }
  var Is = En("animationend"), Ps = En("animationiteration"), td = En("animationstart"), f0 = En("transitionrun"), s0 = En("transitionstart"), d0 = En("transitioncancel"), ed = En("transitionend"), ld = /* @__PURE__ */ new Map(), vo = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  vo.push("scrollEnd");
  function Ze(t, e) {
    ld.set(t, e), pn(e, [t]);
  }
  var v0 = 0;
  function bl(t, e) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (e.autoName !== null) return e.autoName;
    t = $e.identifierPrefix;
    var l = v0++;
    return t = "_" + t + "t_" + l.toString(32) + "_", e.autoName = t;
  }
  function nd(t) {
    if (t == null || typeof t == "string")
      return t;
    var e = null, l = Sa;
    if (l !== null)
      for (var n = 0; n < l.length; n++) {
        var a = t[l[n]];
        if (a != null) {
          if (a === "none") return "none";
          e = e == null ? a : e + (" " + a);
        }
      }
    return e ?? t.default;
  }
  function pl(t, e) {
    return t = nd(t), e = nd(e), e == null ? t === "auto" ? null : t : e === "auto" ? null : e;
  }
  var di = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(e)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, we = [], ea = 0, mo = 0;
  function vi() {
    for (var t = ea, e = mo = ea = 0; e < t; ) {
      var l = we[e];
      we[e++] = null;
      var n = we[e];
      we[e++] = null;
      var a = we[e];
      we[e++] = null;
      var u = we[e];
      if (we[e++] = null, n !== null && a !== null) {
        var c = n.pending;
        c === null ? a.next = a : (a.next = c.next, c.next = a), n.pending = a;
      }
      u !== 0 && ad(l, a, u);
    }
  }
  function mi(t, e, l, n) {
    we[ea++] = t, we[ea++] = e, we[ea++] = l, we[ea++] = n, mo |= n, t.lanes |= n, t = t.alternate, t !== null && (t.lanes |= n);
  }
  function ho(t, e, l, n) {
    return mi(t, e, l, n), hi(t);
  }
  function Tn(t, e) {
    return mi(t, null, null, e), hi(t);
  }
  function ad(t, e, l) {
    t.lanes |= l;
    var n = t.alternate;
    n !== null && (n.lanes |= l);
    for (var a = !1, u = t.return; u !== null; )
      u.childLanes |= l, n = u.alternate, n !== null && (n.childLanes |= l), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (a = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, a && e !== null && (a = 31 - _e(l), t = u.hiddenUpdates, n = t[a], n === null ? t[a] = [e] : n.push(e), e.lane = l | 536870912), u) : null;
  }
  function hi(t) {
    if (50 < Cu)
      throw Cu = 0, ac = null, Error(r(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var la = {};
  function m0(t, e, l, n) {
    this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function be(t, e, l, n) {
    return new m0(t, e, l, n);
  }
  function yo(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Sl(t, e) {
    var l = t.alternate;
    return l === null ? (l = be(
      t.tag,
      e,
      t.key,
      t.mode
    ), l.elementType = t.elementType, l.type = t.type, l.stateNode = t.stateNode, l.alternate = t, t.alternate = l) : (l.pendingProps = e, l.type = t.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = t.flags & 1206910976, l.childLanes = t.childLanes, l.lanes = t.lanes, l.child = t.child, l.memoizedProps = t.memoizedProps, l.memoizedState = t.memoizedState, l.updateQueue = t.updateQueue, e = t.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, l.sibling = t.sibling, l.index = t.index, l.ref = t.ref, l.refCleanup = t.refCleanup, l;
  }
  function ud(t, e) {
    t.flags &= 1206910978;
    var l = t.alternate;
    return l === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = l.childLanes, t.lanes = l.lanes, t.child = l.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = l.memoizedProps, t.memoizedState = l.memoizedState, t.updateQueue = l.updateQueue, t.type = l.type, e = l.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function yi(t, e, l, n, a, u) {
    var c = 0;
    if (n = t, typeof n == "function") yo(n) && (c = 1);
    else if (typeof n == "string")
      c = Vb(
        t,
        l,
        Pe.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (n) {
        case Vt:
          return t = be(31, l, e, a), t.elementType = Vt, t.lanes = u, t;
        case jt:
          return xn(l.children, a, u, e);
        case Z:
          c = 8, a |= 24;
          break;
        case fe:
          return t = be(12, l, e, a | 2), t.elementType = fe, t.lanes = u, t;
        case I:
          return t = be(13, l, e, a), t.elementType = I, t.lanes = u, t;
        case P:
          return t = be(19, l, e, a), t.elementType = P, t.lanes = u, t;
        case vl:
        case p:
          return t = a | 32, t = be(30, l, e, t), t.elementType = p, t.lanes = u, t.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, t;
        default:
          if (typeof n == "object" && n !== null)
            switch (n.$$typeof) {
              case Ht:
                c = 10;
                break t;
              case se:
                c = 9;
                break t;
              case q:
                c = 11;
                break t;
              case yt:
                c = 14;
                break t;
              case gt:
                c = 16, n = null;
                break t;
            }
          c = 29, l = Error(
            r(130, t === null ? "null" : typeof t, "")
          ), n = null;
      }
    return e = be(c, l, e, a), e.elementType = t, e.type = n, e.lanes = u, e;
  }
  function xn(t, e, l, n) {
    return t = be(7, t, n, e), t.lanes = l, t;
  }
  function go(t, e, l) {
    return t = be(6, t, null, e), t.lanes = l, t;
  }
  function id(t) {
    var e = be(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function bo(t, e, l) {
    return e = be(
      4,
      t.children !== null ? t.children : [],
      t.key,
      e
    ), e.lanes = l, e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, e;
  }
  var cd = /* @__PURE__ */ new WeakMap();
  function He(t, e) {
    if (typeof t == "object" && t !== null) {
      var l = cd.get(t);
      return l !== void 0 ? l : (e = {
        value: t,
        source: e,
        stack: es(e)
      }, cd.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: es(e)
    };
  }
  var na = [], aa = 0, gi = null, iu = 0, Be = [], Ye = 0, Gl = null, el = 1, ll = "";
  function El(t, e) {
    na[aa++] = iu, na[aa++] = gi, gi = t, iu = e;
  }
  function od(t, e, l) {
    Be[Ye++] = el, Be[Ye++] = ll, Be[Ye++] = Gl, Gl = t;
    var n = el;
    t = ll;
    var a = 32 - _e(n) - 1;
    n &= ~(1 << a), l += 1;
    var u = 32 - _e(e) + a;
    if (30 < u) {
      var c = a - a % 5;
      u = (n & (1 << c) - 1).toString(32), n >>= c, a -= c, el = 1 << 32 - _e(e) + a | l << a | n, ll = u + t;
    } else
      el = 1 << u | l << a | n, ll = t;
  }
  function bi(t) {
    t.return !== null && (El(t, 1), od(t, 1, 0));
  }
  function po(t) {
    for (; t === gi; )
      gi = na[--aa], na[aa] = null, iu = na[--aa], na[aa] = null;
    for (; t === Gl; )
      Gl = Be[--Ye], Be[Ye] = null, ll = Be[--Ye], Be[Ye] = null, el = Be[--Ye], Be[Ye] = null;
  }
  function rd(t, e) {
    Be[Ye++] = el, Be[Ye++] = ll, Be[Ye++] = Gl, el = e.id, ll = e.overflow, Gl = t;
  }
  var kt = null, Rt = null, rt = !1, Ll = null, qe = !1, So = Error(r(519));
  function Vl(t) {
    var e = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw cu(He(e, t)), So;
  }
  function fd(t) {
    var e = t.stateNode, l = t.type, n = t.memoizedProps;
    switch (e[le] = t, e[ge] = n, l) {
      case "dialog":
        st("cancel", e), st("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        st("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Au.length; l++)
          st(Au[l], e);
        break;
      case "source":
        st("error", e);
        break;
      case "img":
      case "image":
      case "link":
        st("error", e), st("load", e);
        break;
      case "details":
        st("toggle", e);
        break;
      case "input":
        st("invalid", e), Ts(
          e,
          n.value,
          n.defaultValue,
          n.checked,
          n.defaultChecked,
          n.type,
          n.name,
          !0
        );
        break;
      case "select":
        st("invalid", e);
        break;
      case "textarea":
        st("invalid", e), Os(e, n.value, n.defaultValue, n.children);
    }
    l = n.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || n.suppressHydrationWarning === !0 || Rm(e.textContent, l) ? (n.popover != null && (st("beforetoggle", e), st("toggle", e)), n.onScroll != null && st("scroll", e), n.onScrollEnd != null && st("scrollend", e), n.onClick != null && (e.onclick = tl), e = !0) : e = !1, e || Vl(t, !0);
  }
  function pi(t) {
    for (kt = t.return; kt; )
      switch (kt.tag) {
        case 5:
        case 31:
        case 13:
          qe = !1;
          return;
        case 27:
        case 3:
          qe = !0;
          return;
        default:
          kt = kt.return;
      }
  }
  function ua(t) {
    if (t !== kt) return !1;
    if (!rt) return pi(t), rt = !0, !1;
    var e = t.tag, l;
    if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || Wr(t.type, t.memoizedProps)), l = !l), l && Rt && Vl(t), pi(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Rt = Wm(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Rt = Wm(t);
    } else
      e === 27 ? (e = Rt, an(t.type) ? (t = uf, uf = null, Rt = t) : Rt = e) : Rt = kt ? Le(t.stateNode.nextSibling) : null;
    return !0;
  }
  function On() {
    Rt = kt = null, rt = !1;
  }
  function Eo() {
    var t = Ll;
    return t !== null && (Ee === null ? Ee = t : Ee.push.apply(
      Ee,
      t
    ), Ll = null), t;
  }
  function cu(t) {
    Ll === null ? Ll = [t] : Ll.push(t);
  }
  var To = Ie(null), _n = null, Tl = null;
  function Xl(t, e, l) {
    Dt(To, e._currentValue), e._currentValue = l;
  }
  function xl(t) {
    t._currentValue = To.current, ee(To);
  }
  function Si(t, e, l) {
    for (; t !== null; ) {
      var n = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, n !== null && (n.childLanes |= e)) : n !== null && (n.childLanes & e) !== e && (n.childLanes |= e), t === l) break;
      t = t.return;
    }
  }
  function xo(t, e, l, n) {
    var a = t.child;
    for (a !== null && (a.return = t); a !== null; ) {
      var u = a.dependencies;
      if (u !== null) {
        var c = a.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var s = u;
          u = a;
          for (var m = 0; m < e.length; m++)
            if (s.context === e[m]) {
              u.lanes |= l, s = u.alternate, s !== null && (s.lanes |= l), Si(
                u.return,
                l,
                t
              ), n || (c = null);
              break t;
            }
          u = s.next;
        }
      } else if (a.tag === 18) {
        if (c = a.return, c === null) throw Error(r(341));
        c.lanes |= l, u = c.alternate, u !== null && (u.lanes |= l), Si(c, l, t), c = null;
      } else
        a.tag === 13 && a.memoizedState !== null && a.memoizedState.dehydrated === null ? (a.lanes |= l, c = a.alternate, c !== null && (c.lanes |= l), Si(
          a.return,
          l,
          t
        ), c = a.child, c = c !== null ? c.sibling : null) : c = a.child;
      if (c !== null) c.return = a;
      else
        for (c = a; c !== null; ) {
          if (c === t) {
            c = null;
            break;
          }
          if (a = c.sibling, a !== null) {
            a.return = c.return, c = a;
            break;
          }
          c = c.return;
        }
      a = c;
    }
  }
  function Nn(t, e, l, n) {
    t = null;
    for (var a = e, u = !1; a !== null; ) {
      if (!u) {
        if ((a.flags & 524288) !== 0) u = !0;
        else if ((a.flags & 262144) !== 0) break;
      }
      if (a.tag === 10) {
        var c = a.alternate;
        if (c === null) throw Error(r(387));
        if (c = c.memoizedProps, c !== null) {
          var s = a.type;
          Ce(a.pendingProps.value, c.value) || (t !== null ? t.push(s) : t = [s]);
        }
      } else if (a === Ju.current) {
        if (c = a.alternate, c === null) throw Error(r(387));
        c.memoizedState.memoizedState !== a.memoizedState.memoizedState && (t !== null ? t.push(Da) : t = [Da]);
      }
      a = a.return;
    }
    return t !== null && xo(
      e,
      t,
      l,
      n
    ), e.flags |= 262144, t !== null;
  }
  function Ei(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Ce(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Cn(t) {
    _n = t, Tl = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function ne(t) {
    return sd(_n, t);
  }
  function Ti(t, e) {
    return _n === null && Cn(t), sd(t, e);
  }
  function sd(t, e) {
    var l = e._currentValue;
    if (e = { context: e, memoizedValue: l, next: null }, Tl === null) {
      if (t === null) throw Error(r(308));
      Tl = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else Tl = Tl.next = e;
    return l;
  }
  var h0 = typeof AbortController < "u" ? AbortController : function() {
    var t = [], e = this.signal = {
      aborted: !1,
      addEventListener: function(l, n) {
        t.push(n);
      }
    };
    this.abort = function() {
      e.aborted = !0, t.forEach(function(l) {
        return l();
      });
    };
  }, y0 = i.unstable_scheduleCallback, g0 = i.unstable_NormalPriority, Qt = {
    $$typeof: Ht,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Oo() {
    return {
      controller: new h0(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function ou(t) {
    t.refCount--, t.refCount === 0 && y0(g0, function() {
      t.controller.abort();
    });
  }
  function dd(t, e) {
    if ((t.pendingLanes & 4194048) !== 0) {
      var l = t.transitionTypes;
      for (l === null && (l = t.transitionTypes = []), t = 0; t < e.length; t++) {
        var n = e[t];
        l.indexOf(n) === -1 && l.push(n);
      }
    }
  }
  var ru = null;
  function b0(t) {
    var e = t.transitionTypes;
    return t.transitionTypes = null, e;
  }
  var fu = null, _o = 0, zn = 0, ia = null;
  function p0(t, e) {
    if (fu === null) {
      var l = fu = [];
      _o = 0, zn = Lr(), ia = {
        status: "pending",
        value: void 0,
        then: function(n) {
          l.push(n);
        }
      };
    }
    return _o++, e.then(vd, vd), e;
  }
  function vd() {
    if (--_o === 0 && (ru = null, fu !== null)) {
      ia !== null && (ia.status = "fulfilled");
      var t = fu;
      fu = null, zn = 0, ia = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function S0(t, e) {
    var l = [], n = {
      status: "pending",
      value: null,
      reason: null,
      then: function(a) {
        l.push(a);
      }
    };
    return t.then(
      function() {
        n.status = "fulfilled", n.value = e;
        for (var a = 0; a < l.length; a++) (0, l[a])(e);
      },
      function(a) {
        for (n.status = "rejected", n.reason = a, a = 0; a < l.length; a++)
          (0, l[a])(void 0);
      }
    ), n;
  }
  var md = K.S;
  K.S = function(t, e) {
    if (im = xe(), typeof e == "object" && e !== null && typeof e.then == "function" && p0(t, e), ru !== null)
      for (var l = Oa; l !== null; )
        dd(l, ru), l = l.next;
    if (l = t.types, l !== null) {
      for (var n = Oa; n !== null; )
        dd(n, l), n = n.next;
      if (zn !== 0) {
        n = ru, n === null && (n = ru = []);
        for (var a = 0; a < l.length; a++) {
          var u = l[a];
          n.indexOf(u) === -1 && n.push(u);
        }
      }
    }
    md !== null && md(t, e);
  };
  var An = Ie(null);
  function No() {
    var t = An.current;
    return t !== null ? t : At.pooledCache;
  }
  function xi(t, e) {
    e === null ? Dt(An, An.current) : Dt(An, e.pool);
  }
  function hd() {
    var t = No();
    return t === null ? null : { parent: Qt._currentValue, pool: t };
  }
  var ca = Error(r(460)), Co = Error(r(474)), Oi = Error(r(542)), _i = { then: function() {
  } };
  function yd(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function gd(t, e, l) {
    switch (l = t[l], l === void 0 ? t.push(e) : l !== e && (e.then(tl, tl), e = l), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, pd(t), t === void 0 && !("reason" in e) ? Error(r(600)) : t;
      default:
        if (typeof e.status == "string") e.then(tl, tl);
        else {
          if (t = At, t !== null && 100 < t.shellSuspendCounter)
            throw Error(r(482));
          t = e, t.status = "pending", t.then(
            function(n) {
              if (e.status === "pending") {
                var a = e;
                a.status = "fulfilled", a.value = n;
              }
            },
            function(n) {
              if (e.status === "pending") {
                var a = e;
                a.status = "rejected", a.reason = n;
              }
            }
          );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw t = e.reason, pd(t), t;
        }
        throw Rn = e, ca;
    }
  }
  function Dn(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Rn = l, ca) : l;
    }
  }
  var Rn = null;
  function bd() {
    if (Rn === null) throw Error(r(459));
    var t = Rn;
    return Rn = null, t;
  }
  function pd(t) {
    if (t === ca || t === Oi)
      throw Error(r(483));
  }
  var oa = null, su = 0;
  function Ni(t) {
    var e = su;
    return su += 1, oa === null && (oa = []), gd(oa, t, e);
  }
  function Ql(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Ci(t, e) {
    throw e.$$typeof === ot ? Error(r(525)) : (t = Object.prototype.toString.call(e), Error(
      r(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function Sd(t) {
    function e(E, g) {
      if (t) {
        var O = E.deletions;
        O === null ? (E.deletions = [g], E.flags |= 16) : O.push(g);
      }
    }
    function l(E, g) {
      if (!t) return null;
      for (; g !== null; )
        e(E, g), g = g.sibling;
      return null;
    }
    function n(E) {
      for (var g = /* @__PURE__ */ new Map(); E !== null; )
        E.key === null ? g.set(E.index, E) : g.set(E.key, E), E = E.sibling;
      return g;
    }
    function a(E, g) {
      return E = Sl(E, g), E.index = 0, E.sibling = null, E;
    }
    function u(E, g, O) {
      return E.index = O, t ? (O = E.alternate, O !== null ? (O = O.index, O < g ? (E.flags |= 2, g) : O) : (E.flags |= 134217730, g)) : (E.flags |= 1048576, g);
    }
    function c(E) {
      return t && E.alternate === null && (E.flags |= 134217730), E;
    }
    function s(E, g, O, R) {
      return g === null || g.tag !== 6 ? (g = go(O, E.mode, R), g.return = E, g) : (g = a(g, O), g.return = E, g);
    }
    function m(E, g, O, R) {
      var L = O.type;
      return L === jt ? (E = C(
        E,
        g,
        O.props.children,
        R,
        O.key
      ), Ql(E, O), E) : g !== null && (g.elementType === L || typeof L == "object" && L !== null && L.$$typeof === gt && Dn(L) === g.type) ? (g = a(g, O.props), Ql(g, O), g.return = E, g) : (g = yi(
        O.type,
        O.key,
        O.props,
        null,
        E.mode,
        R
      ), Ql(g, O), g.return = E, g);
    }
    function T(E, g, O, R) {
      return g === null || g.tag !== 4 || g.stateNode.containerInfo !== O.containerInfo || g.stateNode.implementation !== O.implementation ? (g = bo(O, E.mode, R), g.return = E, g) : (g = a(g, O.children || []), g.return = E, g);
    }
    function C(E, g, O, R, L) {
      return g === null || g.tag !== 7 ? (g = xn(
        O,
        E.mode,
        R,
        L
      ), g.return = E, g) : (g = a(g, O), g.return = E, g);
    }
    function M(E, g, O) {
      if (typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint")
        return g = go(
          "" + g,
          E.mode,
          O
        ), g.return = E, g;
      if (typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case Gt:
            return O = yi(
              g.type,
              g.key,
              g.props,
              null,
              E.mode,
              O
            ), Ql(O, g), O.return = E, O;
          case Lt:
            return g = bo(
              g,
              E.mode,
              O
            ), g.return = E, g;
          case gt:
            return g = Dn(g), M(E, g, O);
        }
        if (Et(g) || $(g))
          return g = xn(
            g,
            E.mode,
            O,
            null
          ), g.return = E, g;
        if (typeof g.then == "function")
          return M(E, Ni(g), O);
        if (g.$$typeof === Ht)
          return M(
            E,
            Ti(E, g),
            O
          );
        Ci(E, g);
      }
      return null;
    }
    function S(E, g, O, R) {
      var L = g !== null ? g.key : null;
      if (typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint")
        return L !== null ? null : s(E, g, "" + O, R);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case Gt:
            return O.key === L ? m(E, g, O, R) : null;
          case Lt:
            return O.key === L ? T(E, g, O, R) : null;
          case gt:
            return O = Dn(O), S(E, g, O, R);
        }
        if (Et(O) || $(O))
          return L !== null ? null : C(E, g, O, R, null);
        if (typeof O.then == "function")
          return S(
            E,
            g,
            Ni(O),
            R
          );
        if (O.$$typeof === Ht)
          return S(
            E,
            g,
            Ti(E, O),
            R
          );
        Ci(E, O);
      }
      return null;
    }
    function N(E, g, O, R, L) {
      if (typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint")
        return E = E.get(O) || null, s(g, E, "" + R, L);
      if (typeof R == "object" && R !== null) {
        switch (R.$$typeof) {
          case Gt:
            return E = E.get(
              R.key === null ? O : R.key
            ) || null, m(g, E, R, L);
          case Lt:
            return E = E.get(
              R.key === null ? O : R.key
            ) || null, T(g, E, R, L);
          case gt:
            return R = Dn(R), N(
              E,
              g,
              O,
              R,
              L
            );
        }
        if (Et(R) || $(R))
          return E = E.get(O) || null, C(g, E, R, L, null);
        if (typeof R.then == "function")
          return N(
            E,
            g,
            O,
            Ni(R),
            L
          );
        if (R.$$typeof === Ht)
          return N(
            E,
            g,
            O,
            Ti(g, R),
            L
          );
        Ci(g, R);
      }
      return null;
    }
    function Y(E, g, O, R) {
      for (var L = null, mt = null, J = g, tt = g = 0, Jt = null; J !== null && tt < O.length; tt++) {
        J.index > tt ? (Jt = J, J = null) : Jt = J.sibling;
        var ht = S(
          E,
          J,
          O[tt],
          R
        );
        if (ht === null) {
          J === null && (J = Jt);
          break;
        }
        t && J && ht.alternate === null && e(E, J), g = u(ht, g, tt), mt === null ? L = ht : mt.sibling = ht, mt = ht, J = Jt;
      }
      if (tt === O.length)
        return l(E, J), rt && El(E, tt), L;
      if (J === null) {
        for (; tt < O.length; tt++)
          J = M(E, O[tt], R), J !== null && (g = u(
            J,
            g,
            tt
          ), mt === null ? L = J : mt.sibling = J, mt = J);
        return rt && El(E, tt), L;
      }
      for (J = n(J); tt < O.length; tt++)
        Jt = N(
          J,
          E,
          tt,
          O[tt],
          R
        ), Jt !== null && (t && (ht = Jt.alternate, ht !== null && J.delete(ht.key === null ? tt : ht.key)), g = u(
          Jt,
          g,
          tt
        ), mt === null ? L = Jt : mt.sibling = Jt, mt = Jt);
      return t && J.forEach(function(fn) {
        return e(E, fn);
      }), rt && El(E, tt), L;
    }
    function Q(E, g, O, R) {
      if (O == null) throw Error(r(151));
      for (var L = null, mt = null, J = g, tt = g = 0, Jt = null, ht = O.next(); J !== null && !ht.done; tt++, ht = O.next()) {
        J.index > tt ? (Jt = J, J = null) : Jt = J.sibling;
        var fn = S(E, J, ht.value, R);
        if (fn === null) {
          J === null && (J = Jt);
          break;
        }
        t && J && fn.alternate === null && e(E, J), g = u(fn, g, tt), mt === null ? L = fn : mt.sibling = fn, mt = fn, J = Jt;
      }
      if (ht.done)
        return l(E, J), rt && El(E, tt), L;
      if (J === null) {
        for (; !ht.done; tt++, ht = O.next())
          ht = M(E, ht.value, R), ht !== null && (g = u(ht, g, tt), mt === null ? L = ht : mt.sibling = ht, mt = ht);
        return rt && El(E, tt), L;
      }
      for (J = n(J); !ht.done; tt++, ht = O.next())
        ht = N(J, E, tt, ht.value, R), ht !== null && (t && (Jt = ht.alternate, Jt !== null && J.delete(
          Jt.key === null ? tt : Jt.key
        )), g = u(ht, g, tt), mt === null ? L = ht : mt.sibling = ht, mt = ht);
      return t && J.forEach(function(tp) {
        return e(E, tp);
      }), rt && El(E, tt), L;
    }
    function it(E, g, O, R) {
      if (typeof O == "object" && O !== null && O.type === jt && O.key === null && O.props.ref === void 0 && (O = O.props.children), typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case Gt:
            t: {
              for (var L = O.key; g !== null; ) {
                if (g.key === L) {
                  if (L = O.type, L === jt) {
                    if (g.tag === 7) {
                      l(
                        E,
                        g.sibling
                      ), R = a(
                        g,
                        O.props.children
                      ), Ql(R, O), R.return = E, E = R;
                      break t;
                    }
                  } else if (g.elementType === L || typeof L == "object" && L !== null && L.$$typeof === gt && Dn(L) === g.type) {
                    l(
                      E,
                      g.sibling
                    ), R = a(g, O.props), Ql(R, O), R.return = E, E = R;
                    break t;
                  }
                  l(E, g);
                  break;
                } else e(E, g);
                g = g.sibling;
              }
              O.type === jt ? (R = xn(
                O.props.children,
                E.mode,
                R,
                O.key
              ), Ql(R, O), R.return = E, E = R) : (R = yi(
                O.type,
                O.key,
                O.props,
                null,
                E.mode,
                R
              ), Ql(R, O), R.return = E, E = R);
            }
            return c(E);
          case Lt:
            t: {
              for (L = O.key; g !== null; ) {
                if (g.key === L)
                  if (g.tag === 4 && g.stateNode.containerInfo === O.containerInfo && g.stateNode.implementation === O.implementation) {
                    l(
                      E,
                      g.sibling
                    ), R = a(g, O.children || []), R.return = E, E = R;
                    break t;
                  } else {
                    l(E, g);
                    break;
                  }
                else e(E, g);
                g = g.sibling;
              }
              R = bo(O, E.mode, R), R.return = E, E = R;
            }
            return c(E);
          case gt:
            return O = Dn(O), it(
              E,
              g,
              O,
              R
            );
        }
        if (Et(O))
          return Y(
            E,
            g,
            O,
            R
          );
        if ($(O)) {
          if (L = $(O), typeof L != "function") throw Error(r(150));
          return O = L.call(O), Q(
            E,
            g,
            O,
            R
          );
        }
        if (typeof O.then == "function")
          return it(
            E,
            g,
            Ni(O),
            R
          );
        if (O.$$typeof === Ht)
          return it(
            E,
            g,
            Ti(E, O),
            R
          );
        Ci(E, O);
      }
      return typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint" ? (O = "" + O, g !== null && g.tag === 6 ? (l(E, g.sibling), R = a(g, O), R.return = E, E = R) : (l(E, g), R = go(O, E.mode, R), R.return = E, E = R), c(E)) : l(E, g);
    }
    return function(E, g, O, R) {
      try {
        su = 0;
        var L = it(
          E,
          g,
          O,
          R
        );
        return oa = null, L;
      } catch (J) {
        if (J === ca || J === Oi) throw J;
        var mt = be(29, J, null, E.mode);
        return mt.lanes = R, mt.return = E, mt;
      } finally {
      }
    };
  }
  var Mn = Sd(!0), Ed = Sd(!1), Zl = !1;
  function zo(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Ao(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Kl(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Jl(t, e, l) {
    var n = t.updateQueue;
    if (n === null) return null;
    if (n = n.shared, (Tt & 2) !== 0) {
      var a = n.pending;
      return a === null ? e.next = e : (e.next = a.next, a.next = e), n.pending = e, e = hi(t), ad(t, null, l), e;
    }
    return mi(t, n, e, l), hi(t);
  }
  function du(t, e, l) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (l & 4194048) !== 0)) {
      var n = e.lanes;
      n &= t.pendingLanes, l |= n, e.lanes = l, os(t, l);
    }
  }
  function Do(t, e) {
    var l = t.updateQueue, n = t.alternate;
    if (n !== null && (n = n.updateQueue, l === n)) {
      var a = null, u = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var c = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          u === null ? a = u = c : u = u.next = c, l = l.next;
        } while (l !== null);
        u === null ? a = u = e : u = u.next = e;
      } else a = u = e;
      l = {
        baseState: n.baseState,
        firstBaseUpdate: a,
        lastBaseUpdate: u,
        shared: n.shared,
        callbacks: n.callbacks
      }, t.updateQueue = l;
      return;
    }
    t = l.lastBaseUpdate, t === null ? l.firstBaseUpdate = e : t.next = e, l.lastBaseUpdate = e;
  }
  var Ro = !1;
  function vu() {
    if (Ro) {
      var t = ia;
      if (t !== null) throw t;
    }
  }
  function mu(t, e, l, n) {
    Ro = !1;
    var a = t.updateQueue;
    Zl = !1;
    var u = a.firstBaseUpdate, c = a.lastBaseUpdate, s = a.shared.pending;
    if (s !== null) {
      a.shared.pending = null;
      var m = s, T = m.next;
      m.next = null, c === null ? u = T : c.next = T, c = m;
      var C = t.alternate;
      C !== null && (C = C.updateQueue, s = C.lastBaseUpdate, s !== c && (s === null ? C.firstBaseUpdate = T : s.next = T, C.lastBaseUpdate = m));
    }
    if (u !== null) {
      var M = a.baseState;
      c = 0, C = T = m = null, s = u;
      do {
        var S = s.lane & -536870913, N = S !== s.lane;
        if (N ? (vt & S) === S : (n & S) === S) {
          S !== 0 && S === zn && (Ro = !0), C !== null && (C = C.next = {
            lane: 0,
            tag: s.tag,
            payload: s.payload,
            callback: null,
            next: null
          });
          t: {
            var Y = t, Q = s;
            S = e;
            var it = l;
            switch (Q.tag) {
              case 1:
                if (Y = Q.payload, typeof Y == "function") {
                  M = Y.call(it, M, S);
                  break t;
                }
                M = Y;
                break t;
              case 3:
                Y.flags = Y.flags & -65537 | 128;
              case 0:
                if (Y = Q.payload, S = typeof Y == "function" ? Y.call(it, M, S) : Y, S == null) break t;
                M = W({}, M, S);
                break t;
              case 2:
                Zl = !0;
            }
          }
          S = s.callback, S !== null && (t.flags |= 64, N && (t.flags |= 8192), N = a.callbacks, N === null ? a.callbacks = [S] : N.push(S));
        } else
          N = {
            lane: S,
            tag: s.tag,
            payload: s.payload,
            callback: s.callback,
            next: null
          }, C === null ? (T = C = N, m = M) : C = C.next = N, c |= S;
        if (s = s.next, s === null) {
          if (s = a.shared.pending, s === null)
            break;
          N = s, s = N.next, N.next = null, a.lastBaseUpdate = N, a.shared.pending = null;
        }
      } while (!0);
      C === null && (m = M), a.baseState = m, a.firstBaseUpdate = T, a.lastBaseUpdate = C, u === null && (a.shared.lanes = 0), tn |= c, t.lanes = c, t.memoizedState = M;
    }
  }
  function Td(t, e) {
    if (typeof t != "function")
      throw Error(r(191, t));
    t.call(e);
  }
  function xd(t, e) {
    var l = t.callbacks;
    if (l !== null)
      for (t.callbacks = null, t = 0; t < l.length; t++)
        Td(l[t], e);
  }
  var Fl = Ie(null), zi = Ie(0);
  function Od(t, e) {
    t = zl, Dt(zi, t), Dt(Fl, e), zl = t | e.baseLanes;
  }
  function Mo() {
    Dt(zi, zl), Dt(Fl, Fl.current);
  }
  function jo() {
    zl = zi.current, ee(Fl), ee(zi);
  }
  var ae = Ie(null), re = null;
  function $l(t) {
    var e = t.alternate;
    Dt(ue, ue.current & 1), Dt(ae, t), re === null && (e === null || Fl.current !== null || e.memoizedState !== null) && (re = t);
  }
  function Uo(t) {
    Dt(ue, ue.current), Dt(ae, t), re === null && (re = t);
  }
  function _d(t) {
    t.tag === 22 ? (Dt(ue, ue.current), Dt(ae, t), re === null && (re = t)) : Wl();
  }
  function Wl() {
    Dt(ue, ue.current), Dt(ae, ae.current);
  }
  function ze(t) {
    ee(ae), re === t && (re = null), ee(ue);
  }
  var ue = Ie(0);
  function hu(t, e) {
    Dt(ae, ae.current), Dt(ue, e);
  }
  function wo(t) {
    ee(ue), ee(ae), re === t && (re = null);
  }
  function Ai(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || nf(l) || af(l)))
          return e;
      } else if (e.tag === 19 && e.memoizedProps.revealOrder !== "independent") {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    return null;
  }
  var Ol = 0, ut = null, zt = null, Zt = null, Di = !1, ra = !1, jn = !1, Ri = 0, yu = 0, fa = null, E0 = 0;
  function Yt() {
    throw Error(r(321));
  }
  function Ho(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++)
      if (!Ce(t[l], e[l])) return !1;
    return !0;
  }
  function Bo(t, e, l, n, a, u) {
    return Ol = u, ut = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, K.H = t === null || t.memoizedState === null ? ov : rv, jn = !1, u = l(n, a), jn = !1, ra && (u = Cd(
      e,
      l,
      n,
      a
    )), Nd(t), u;
  }
  function Nd(t) {
    K.H = Yi;
    var e = zt !== null && zt.next !== null;
    if (Ol = 0, Zt = zt = ut = null, Di = !1, yu = 0, fa = null, e) throw Error(r(300));
    t === null || Kt || (t = t.dependencies, t !== null && Ei(t) && (Kt = !0));
  }
  function Cd(t, e, l, n) {
    ut = t;
    var a = 0;
    do {
      if (ra && (fa = null), yu = 0, ra = !1, 25 <= a) throw Error(r(301));
      if (a += 1, Zt = zt = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      K.H = A0, u = e(l, n);
    } while (ra);
    return u;
  }
  function T0() {
    var t = K.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? gu(e) : e, t = t.useState()[0], (zt !== null ? zt.memoizedState : null) !== t && (ut.flags |= 1024), e;
  }
  function Yo() {
    var t = Ri !== 0;
    return Ri = 0, t;
  }
  function qo(t, e, l) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~l;
  }
  function Go(t) {
    if (Di) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      Di = !1;
    }
    Ol = 0, Zt = zt = ut = null, ra = !1, yu = Ri = 0, fa = null;
  }
  function ve() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Zt === null ? ut.memoizedState = Zt = t : Zt = Zt.next = t, Zt;
  }
  function Xt() {
    if (zt === null) {
      var t = ut.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = zt.next;
    var e = Zt === null ? ut.memoizedState : Zt.next;
    if (e !== null)
      Zt = e, zt = t;
    else {
      if (t === null)
        throw ut.alternate === null ? Error(r(467)) : Error(r(310));
      zt = t, t = {
        memoizedState: zt.memoizedState,
        baseState: zt.baseState,
        baseQueue: zt.baseQueue,
        queue: zt.queue,
        next: null
      }, Zt === null ? ut.memoizedState = Zt = t : Zt = Zt.next = t;
    }
    return Zt;
  }
  function Mi() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function gu(t) {
    var e = yu;
    return yu += 1, fa === null && (fa = []), t = gd(fa, t, e), e = ut, (Zt === null ? e.memoizedState : Zt.next) === null && (e = e.alternate, K.H = e === null || e.memoizedState === null ? ov : rv), t;
  }
  function ji(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return gu(t);
      if (t.$$typeof === w) return;
      if (t.$$typeof === Ht) return ne(t);
    }
    throw Error(r(438, String(t)));
  }
  function Lo(t) {
    var e = null, l = ut.updateQueue;
    if (l !== null && (e = l.memoCache), e == null) {
      var n = ut.alternate;
      n !== null && (n = n.updateQueue, n !== null && (n = n.memoCache, n != null && (e = {
        data: n.data.map(function(a) {
          return a.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), l === null && (l = Mi(), ut.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0)
      for (l = e.data[e.index] = Array(t), n = 0; n < t; n++)
        l[n] = yn;
    return e.index++, l;
  }
  function _l(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Ui(t) {
    var e = Xt();
    return Vo(e, zt, t);
  }
  function Vo(t, e, l) {
    var n = t.queue;
    if (n === null) throw Error(r(311));
    n.lastRenderedReducer = l;
    var a = t.baseQueue, u = n.pending;
    if (u !== null) {
      if (a !== null) {
        var c = a.next;
        a.next = u.next, u.next = c;
      }
      e.baseQueue = a = u, n.pending = null;
    }
    if (u = t.baseState, a === null) t.memoizedState = u;
    else {
      e = a.next;
      var s = c = null, m = null, T = e, C = !1;
      do {
        var M = T.lane & -536870913;
        if (M !== T.lane ? (vt & M) === M : (Ol & M) === M) {
          var S = T.revertLane;
          if (S === 0)
            m !== null && (m = m.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null
            }), M === zn && (C = !0);
          else if ((Ol & S) === S) {
            T = T.next, S === zn && (C = !0);
            continue;
          } else
            M = {
              lane: 0,
              revertLane: T.revertLane,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null
            }, m === null ? (s = m = M, c = u) : m = m.next = M, ut.lanes |= S, tn |= S;
          M = T.action, jn && l(u, M), u = T.hasEagerState ? T.eagerState : l(u, M);
        } else
          S = {
            lane: M,
            revertLane: T.revertLane,
            gesture: T.gesture,
            action: T.action,
            hasEagerState: T.hasEagerState,
            eagerState: T.eagerState,
            next: null
          }, m === null ? (s = m = S, c = u) : m = m.next = S, ut.lanes |= M, tn |= M;
        T = T.next;
      } while (T !== null && T !== e);
      if (m === null ? c = u : m.next = s, !Ce(u, t.memoizedState) && (Kt = !0, C && (l = ia, l !== null)))
        throw l;
      t.memoizedState = u, t.baseState = c, t.baseQueue = m, n.lastRenderedState = u;
    }
    return a === null && (n.lanes = 0), [t.memoizedState, n.dispatch];
  }
  function Xo(t) {
    var e = Xt(), l = e.queue;
    if (l === null) throw Error(r(311));
    l.lastRenderedReducer = t;
    var n = l.dispatch, a = l.pending, u = e.memoizedState;
    if (a !== null) {
      l.pending = null;
      var c = a = a.next;
      do
        u = t(u, c.action), c = c.next;
      while (c !== a);
      Ce(u, e.memoizedState) || (Kt = !0), e.memoizedState = u, e.baseQueue === null && (e.baseState = u), l.lastRenderedState = u;
    }
    return [u, n];
  }
  function zd(t, e, l) {
    var n = ut, a = Xt(), u = rt;
    if (u) {
      if (l === void 0) throw Error(r(407));
      l = l();
    } else l = e();
    var c = !Ce(
      (zt || a).memoizedState,
      l
    );
    if (c && (a.memoizedState = l, Kt = !0), a = a.queue, Ko(Rd.bind(null, n, a, t), [
      t
    ]), t = a.getSnapshot !== e || c || Zt !== null && (Zt.memoizedState.tag & 1) !== 0, sa(
      t ? 9 : 8,
      { destroy: void 0 },
      Dd.bind(null, n, a, l, e),
      null
    ), t) {
      if (n.flags |= 2048, At === null) throw Error(r(349));
      u || (Ol & 127) !== 0 || Ad(n, e, l);
    }
    return l;
  }
  function Ad(t, e, l) {
    t.flags |= 16384, t = { getSnapshot: e, value: l }, e = ut.updateQueue, e === null ? (e = Mi(), ut.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
  }
  function Dd(t, e, l, n) {
    e.value = l, e.getSnapshot = n, Md(e) && jd(t);
  }
  function Rd(t, e, l) {
    return l(function() {
      Md(e) && jd(t);
    });
  }
  function Md(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !Ce(t, l);
    } catch {
      return !0;
    }
  }
  function jd(t) {
    var e = Tn(t, 2);
    e !== null && Te(e, t, 2);
  }
  function Qo(t) {
    var e = ve();
    if (typeof t == "function") {
      var l = t;
      if (t = l(), jn) {
        Bl(!0);
        try {
          l();
        } finally {
          Bl(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: _l,
      lastRenderedState: t
    }, e;
  }
  function Ud(t, e, l, n) {
    return t.baseState = l, Vo(
      t,
      zt,
      typeof n == "function" ? n : _l
    );
  }
  function x0(t, e, l, n, a) {
    if (Bi(t)) throw Error(r(485));
    if (t = e.action, t !== null) {
      var u = {
        payload: a,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(c) {
          u.listeners.push(c);
        }
      };
      K.T !== null ? l(!0) : u.isTransition = !1, n(u), l = e.pending, l === null ? (u.next = e.pending = u, wd(e, u)) : (u.next = l.next, e.pending = l.next = u);
    }
  }
  function wd(t, e) {
    var l = e.action, n = e.payload, a = t.state;
    if (e.isTransition) {
      var u = K.T, c = {};
      c.types = u !== null ? u.types : null, K.T = c;
      try {
        var s = l(a, n), m = K.S;
        m !== null && m(c, s), Hd(t, e, s);
      } catch (T) {
        Zo(t, e, T);
      } finally {
        u !== null && c.types !== null && (u.types = c.types), K.T = u;
      }
    } else
      try {
        u = l(a, n), Hd(t, e, u);
      } catch (T) {
        Zo(t, e, T);
      }
  }
  function Hd(t, e, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(n) {
        Bd(t, e, n);
      },
      function(n) {
        return Zo(t, e, n);
      }
    ) : Bd(t, e, l);
  }
  function Bd(t, e, l) {
    e.status = "fulfilled", e.value = l, Yd(e), t.state = l, e = t.pending, e !== null && (l = e.next, l === e ? t.pending = null : (l = l.next, e.next = l, wd(t, l)));
  }
  function Zo(t, e, l) {
    var n = t.pending;
    if (t.pending = null, n !== null) {
      n = n.next;
      do
        e.status = "rejected", e.reason = l, Yd(e), e = e.next;
      while (e !== n);
    }
    t.action = null;
  }
  function Yd(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function qd(t, e) {
    return e;
  }
  function Gd(t, e) {
    if (rt) {
      var l = At.formState;
      if (l !== null) {
        t: {
          var n = ut;
          if (rt) {
            if (Rt) {
              e: {
                for (var a = Rt, u = qe; a.nodeType !== 8; ) {
                  if (!u) {
                    a = null;
                    break e;
                  }
                  if (a = Le(
                    a.nextSibling
                  ), a === null) {
                    a = null;
                    break e;
                  }
                }
                u = a.data, a = u === "F!" || u === "F" ? a : null;
              }
              if (a) {
                Rt = Le(
                  a.nextSibling
                ), n = a.data === "F!";
                break t;
              }
            }
            Vl(n);
          }
          n = !1;
        }
        n && (e = l[0]);
      }
    }
    return l = ve(), l.memoizedState = l.baseState = e, n = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: qd,
      lastRenderedState: e
    }, l.queue = n, l = uv.bind(
      null,
      ut,
      n
    ), n.dispatch = l, n = Qo(!1), u = ko.bind(
      null,
      ut,
      !1,
      n.queue
    ), n = ve(), a = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, n.queue = a, l = x0.bind(
      null,
      ut,
      a,
      u,
      l
    ), a.dispatch = l, n.memoizedState = t, [e, l, !1];
  }
  function Ld(t) {
    var e = Xt();
    return Vd(e, zt, t);
  }
  function Vd(t, e, l) {
    if (e = Vo(
      t,
      e,
      qd
    )[0], t = Ui(_l)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var n = gu(e);
      } catch (c) {
        throw c === ca ? Oi : c;
      }
    else n = e;
    e = Xt();
    var a = e.queue, u = a.dispatch;
    return l !== e.memoizedState && (ut.flags |= 2048, sa(
      9,
      { destroy: void 0 },
      O0.bind(null, a, l),
      null
    )), [n, u, t];
  }
  function O0(t, e) {
    t.action = e;
  }
  function Xd(t) {
    var e = Xt(), l = zt;
    if (l !== null)
      return Vd(e, l, t);
    Xt(), e = e.memoizedState, l = Xt();
    var n = l.queue.dispatch;
    return l.memoizedState = t, [e, n, !1];
  }
  function sa(t, e, l, n) {
    return t = { tag: t, create: l, deps: n, inst: e, next: null }, e = ut.updateQueue, e === null && (e = Mi(), ut.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (n = l.next, l.next = t, t.next = n, e.lastEffect = t), t;
  }
  function Qd() {
    return Xt().memoizedState;
  }
  function wi(t, e, l, n) {
    var a = ve();
    ut.flags |= t, a.memoizedState = sa(
      1 | e,
      { destroy: void 0 },
      l,
      n === void 0 ? null : n
    );
  }
  function Hi(t, e, l, n) {
    var a = Xt();
    n = n === void 0 ? null : n;
    var u = a.memoizedState.inst;
    zt !== null && n !== null && Ho(n, zt.memoizedState.deps) ? a.memoizedState = sa(e, u, l, n) : (ut.flags |= t, a.memoizedState = sa(
      1 | e,
      u,
      l,
      n
    ));
  }
  function Zd(t, e) {
    wi(8390656, 8, t, e);
  }
  function Ko(t, e) {
    Hi(2048, 8, t, e);
  }
  function _0(t) {
    ut.flags |= 4;
    var e = ut.updateQueue;
    if (e === null)
      e = Mi(), ut.updateQueue = e, e.events = [t];
    else {
      var l = e.events;
      l === null ? e.events = [t] : l.push(t);
    }
  }
  function Kd(t) {
    var e = Xt().memoizedState;
    return _0({ ref: e, nextImpl: t }), function() {
      if ((Tt & 2) !== 0) throw Error(r(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function Jd(t, e) {
    return Hi(4, 2, t, e);
  }
  function Fd(t, e) {
    return Hi(4, 4, t, e);
  }
  function $d(t, e) {
    if (typeof e == "function") {
      t = t();
      var l = e(t);
      return function() {
        typeof l == "function" ? l() : e(null);
      };
    }
    if (e != null)
      return t = t(), e.current = t, function() {
        e.current = null;
      };
  }
  function Wd(t, e, l) {
    l = l != null ? l.concat([t]) : null, Hi(4, 4, $d.bind(null, e, t), l);
  }
  function Jo() {
  }
  function kd(t, e) {
    var l = Xt();
    e = e === void 0 ? null : e;
    var n = l.memoizedState;
    return e !== null && Ho(e, n[1]) ? n[0] : (l.memoizedState = [t, e], t);
  }
  function Id(t, e) {
    var l = Xt();
    e = e === void 0 ? null : e;
    var n = l.memoizedState;
    if (e !== null && Ho(e, n[1]))
      return n[0];
    if (n = t(), jn) {
      Bl(!0);
      try {
        t();
      } finally {
        Bl(!1);
      }
    }
    return l.memoizedState = [n, e], n;
  }
  function Fo(t, e, l) {
    return l === void 0 || (Ol & 1073741824) !== 0 && (vt & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = l, t = om(), ut.lanes |= t, tn |= t, l);
  }
  function Pd(t, e, l, n) {
    return Ce(l, e) ? l : Fl.current !== null ? (t = Fo(t, l, n), Ce(t, e) || (Kt = !0), t) : (Ol & 106) === 0 || (Ol & 1073741824) !== 0 && (vt & 261930) === 0 ? (Kt = !0, t.memoizedState = l) : (t = om(), ut.lanes |= t, tn |= t, e);
  }
  function tv(t, e, l, n, a) {
    var u = nt.p;
    nt.p = u !== 0 && 8 > u ? u : 8;
    var c = K.T, s = {};
    s.types = c !== null ? c.types : null, K.T = s, ko(t, !1, e, l);
    try {
      var m = a(), T = K.S;
      if (T !== null && T(s, m), m !== null && typeof m == "object" && typeof m.then == "function") {
        var C = S0(
          m,
          n
        );
        bu(
          t,
          e,
          C,
          Me(t)
        );
      } else
        bu(
          t,
          e,
          n,
          Me(t)
        );
    } catch (M) {
      bu(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: M },
        Me()
      );
    } finally {
      nt.p = u, c !== null && s.types !== null && (c.types = s.types), K.T = c;
    }
  }
  function N0() {
  }
  function $o(t, e, l, n) {
    if (t.tag !== 5) throw Error(r(476));
    var a = ev(t).queue;
    tv(
      t,
      a,
      e,
      ml,
      l === null ? N0 : function() {
        return lv(t), l(n);
      }
    );
  }
  function ev(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: ml,
      baseState: ml,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: _l,
        lastRenderedState: ml
      },
      next: null
    };
    var l = {};
    return e.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: _l,
        lastRenderedState: l
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function lv(t) {
    var e = ev(t);
    e.next === null && (e = t.alternate.memoizedState), bu(
      t,
      e.next.queue,
      {},
      Me()
    );
  }
  function Wo() {
    return ne(Da);
  }
  function nv() {
    return Xt().memoizedState;
  }
  function av() {
    return Xt().memoizedState;
  }
  function C0(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = Me();
          t = Kl(l);
          var n = Jl(e, t, l);
          n !== null && (Te(n, e, l), du(n, e, l)), e = { cache: Oo() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function z0(t, e, l) {
    var n = Me();
    l = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Bi(t) ? iv(e, l) : (l = ho(t, e, l, n), l !== null && (Te(l, t, n), cv(l, e, n)));
  }
  function uv(t, e, l) {
    var n = Me();
    bu(t, e, l, n);
  }
  function bu(t, e, l, n) {
    var a = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Bi(t)) iv(e, a);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = e.lastRenderedReducer, u !== null))
        try {
          var c = e.lastRenderedState, s = u(c, l);
          if (a.hasEagerState = !0, a.eagerState = s, Ce(s, c))
            return mi(t, e, a, 0), At === null && vi(), !1;
        } catch {
        } finally {
        }
      if (l = ho(t, e, a, n), l !== null)
        return Te(l, t, n), cv(l, e, n), !0;
    }
    return !1;
  }
  function ko(t, e, l, n) {
    if (n = {
      lane: 2,
      revertLane: Lr(),
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Bi(t)) {
      if (e) throw Error(r(479));
    } else
      e = ho(
        t,
        l,
        n,
        2
      ), e !== null && Te(e, t, 2);
  }
  function Bi(t) {
    var e = t.alternate;
    return t === ut || e !== null && e === ut;
  }
  function iv(t, e) {
    ra = Di = !0;
    var l = t.pending;
    l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
  }
  function cv(t, e, l) {
    if ((l & 4194048) !== 0) {
      var n = e.lanes;
      n &= t.pendingLanes, l |= n, e.lanes = l, os(t, l);
    }
  }
  var Yi = {
    readContext: ne,
    use: ji,
    useCallback: Yt,
    useContext: Yt,
    useEffect: Yt,
    useImperativeHandle: Yt,
    useLayoutEffect: Yt,
    useInsertionEffect: Yt,
    useMemo: Yt,
    useReducer: Yt,
    useRef: Yt,
    useState: Yt,
    useDebugValue: Yt,
    useDeferredValue: Yt,
    useTransition: Yt,
    useSyncExternalStore: Yt,
    useId: Yt,
    useHostTransitionStatus: Yt,
    useFormState: Yt,
    useActionState: Yt,
    useOptimistic: Yt,
    useMemoCache: Yt,
    useCacheRefresh: Yt,
    useEffectEvent: Yt
  }, ov = {
    readContext: ne,
    use: ji,
    useCallback: function(t, e) {
      return ve().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: ne,
    useEffect: Zd,
    useImperativeHandle: function(t, e, l) {
      l = l != null ? l.concat([t]) : null, wi(
        4194308,
        4,
        $d.bind(null, e, t),
        l
      );
    },
    useLayoutEffect: function(t, e) {
      return wi(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      wi(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var l = ve();
      e = e === void 0 ? null : e;
      var n = t();
      if (jn) {
        Bl(!0);
        try {
          t();
        } finally {
          Bl(!1);
        }
      }
      return l.memoizedState = [n, e], n;
    },
    useReducer: function(t, e, l) {
      var n = ve();
      if (l !== void 0) {
        var a = l(e);
        if (jn) {
          Bl(!0);
          try {
            l(e);
          } finally {
            Bl(!1);
          }
        }
      } else a = e;
      return n.memoizedState = n.baseState = a, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: a
      }, n.queue = t, t = t.dispatch = z0.bind(
        null,
        ut,
        t
      ), [n.memoizedState, t];
    },
    useRef: function(t) {
      var e = ve();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = Qo(t);
      var e = t.queue, l = uv.bind(null, ut, e);
      return e.dispatch = l, [t.memoizedState, l];
    },
    useDebugValue: Jo,
    useDeferredValue: function(t, e) {
      var l = ve();
      return Fo(l, t, e);
    },
    useTransition: function() {
      var t = Qo(!1);
      return t = tv.bind(
        null,
        ut,
        t.queue,
        !0,
        !1
      ), ve().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, l) {
      var n = ut, a = ve();
      if (rt) {
        if (l === void 0)
          throw Error(r(407));
        l = l();
      } else {
        if (l = e(), At === null)
          throw Error(r(349));
        (vt & 127) !== 0 || Ad(n, e, l);
      }
      a.memoizedState = l;
      var u = { value: l, getSnapshot: e };
      return a.queue = u, Zd(Rd.bind(null, n, u, t), [
        t
      ]), n.flags |= 2048, sa(
        9,
        { destroy: void 0 },
        Dd.bind(
          null,
          n,
          u,
          l,
          e
        ),
        null
      ), l;
    },
    useId: function() {
      var t = ve(), e = At.identifierPrefix;
      if (rt) {
        var l = ll, n = el;
        l = (n & ~(1 << 32 - _e(n) - 1)).toString(32) + l, e = "_" + e + "R_" + l, l = Ri++, 0 < l && (e += "H" + l.toString(32)), e += "_";
      } else
        l = E0++, e = "_" + e + "r_" + l.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: Wo,
    useFormState: Gd,
    useActionState: Gd,
    useOptimistic: function(t) {
      var e = ve();
      e.memoizedState = e.baseState = t;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = l, e = ko.bind(
        null,
        ut,
        !0,
        l
      ), l.dispatch = e, [t, e];
    },
    useMemoCache: Lo,
    useCacheRefresh: function() {
      return ve().memoizedState = C0.bind(
        null,
        ut
      );
    },
    useEffectEvent: function(t) {
      var e = ve(), l = { impl: t };
      return e.memoizedState = l, function() {
        if ((Tt & 2) !== 0)
          throw Error(r(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, rv = {
    readContext: ne,
    use: ji,
    useCallback: kd,
    useContext: ne,
    useEffect: Ko,
    useImperativeHandle: Wd,
    useInsertionEffect: Jd,
    useLayoutEffect: Fd,
    useMemo: Id,
    useReducer: Ui,
    useRef: Qd,
    useState: function() {
      return Ui(_l);
    },
    useDebugValue: Jo,
    useDeferredValue: function(t, e) {
      var l = Xt();
      return Pd(
        l,
        zt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Ui(_l)[0], e = Xt().memoizedState;
      return [
        typeof t == "boolean" ? t : gu(t),
        e
      ];
    },
    useSyncExternalStore: zd,
    useId: nv,
    useHostTransitionStatus: Wo,
    useFormState: Ld,
    useActionState: Ld,
    useOptimistic: function(t, e) {
      var l = Xt();
      return Ud(l, zt, t, e);
    },
    useMemoCache: Lo,
    useCacheRefresh: av,
    useEffectEvent: Kd
  }, A0 = {
    readContext: ne,
    use: ji,
    useCallback: kd,
    useContext: ne,
    useEffect: Ko,
    useImperativeHandle: Wd,
    useInsertionEffect: Jd,
    useLayoutEffect: Fd,
    useMemo: Id,
    useReducer: Xo,
    useRef: Qd,
    useState: function() {
      return Xo(_l);
    },
    useDebugValue: Jo,
    useDeferredValue: function(t, e) {
      var l = Xt();
      return zt === null ? Fo(l, t, e) : Pd(
        l,
        zt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Xo(_l)[0], e = Xt().memoizedState;
      return [
        typeof t == "boolean" ? t : gu(t),
        e
      ];
    },
    useSyncExternalStore: zd,
    useId: nv,
    useHostTransitionStatus: Wo,
    useFormState: Xd,
    useActionState: Xd,
    useOptimistic: function(t, e) {
      var l = Xt();
      return zt !== null ? Ud(l, zt, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
    },
    useMemoCache: Lo,
    useCacheRefresh: av,
    useEffectEvent: Kd
  };
  function Io(t, e, l, n) {
    e = t.memoizedState, l = l(n, e), l = l == null ? e : W({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
  }
  var Po = {
    enqueueSetState: function(t, e, l) {
      t = t._reactInternals;
      var n = Me(), a = Kl(n);
      a.payload = e, l != null && (a.callback = l), e = Jl(t, a, n), e !== null && (Te(e, t, n), du(e, t, n));
    },
    enqueueReplaceState: function(t, e, l) {
      t = t._reactInternals;
      var n = Me(), a = Kl(n);
      a.tag = 1, a.payload = e, l != null && (a.callback = l), e = Jl(t, a, n), e !== null && (Te(e, t, n), du(e, t, n));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var l = Me(), n = Kl(l);
      n.tag = 2, e != null && (n.callback = e), e = Jl(t, n, l), e !== null && (Te(e, t, l), du(e, t, l));
    }
  };
  function fv(t, e, l, n, a, u, c) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(n, u, c) : e.prototype && e.prototype.isPureReactComponent ? !au(l, n) || !au(a, u) : !0;
  }
  function sv(t, e, l, n) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, n), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, n), e.state !== t && Po.enqueueReplaceState(e, e.state, null);
  }
  function Un(t, e) {
    var l = e;
    if ("ref" in e) {
      l = {};
      for (var n in e)
        n !== "ref" && (l[n] = e[n]);
    }
    if (t = t.defaultProps) {
      l === e && (l = W({}, l));
      for (var a in t)
        l[a] === void 0 && (l[a] = t[a]);
    }
    return l;
  }
  function dv(t) {
    di(t);
  }
  function vv(t) {
    console.error(t);
  }
  function mv(t) {
    di(t);
  }
  function qi(t, e) {
    try {
      var l = t.onUncaughtError;
      l(e.value, { componentStack: e.stack });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function hv(t, e, l) {
    try {
      var n = t.onCaughtError;
      n(l.value, {
        componentStack: l.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function tr(t, e, l) {
    return l = Kl(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      qi(t, e);
    }, l;
  }
  function yv(t) {
    return t = Kl(t), t.tag = 3, t;
  }
  function gv(t, e, l, n) {
    var a = l.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var u = n.value;
      t.payload = function() {
        return a(u);
      }, t.callback = function() {
        hv(e, l, n);
      };
    }
    var c = l.stateNode;
    c !== null && typeof c.componentDidCatch == "function" && (t.callback = function() {
      hv(e, l, n), typeof a != "function" && (en === null ? en = /* @__PURE__ */ new Set([this]) : en.add(this));
      var s = n.stack;
      this.componentDidCatch(n.value, {
        componentStack: s !== null ? s : ""
      });
    });
  }
  function D0(t, e, l, n, a) {
    if (l.flags |= 32768, n !== null && typeof n == "object" && typeof n.then == "function") {
      if (e = l.alternate, e !== null && Nn(
        e,
        l,
        a,
        !0
      ), l = ae.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
          case 19:
            return re === null ? ic() : l.alternate === null && qt === 0 && (qt = 3), l.flags &= -257, l.flags |= 65536, l.lanes = a, n === _i ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([n]) : e.add(n), Yr(t, n, a)), !1;
          case 22:
            return l.flags |= 65536, n === _i ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([n])
            }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue = /* @__PURE__ */ new Set([n]) : l.add(n)), Yr(t, n, a)), !1;
        }
        throw Error(r(435, l.tag));
      }
      return Yr(t, n, a), ic(), !1;
    }
    if (rt)
      return e = ae.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = a, n !== So && (t = Error(r(422), { cause: n }), cu(He(t, l)))) : (n !== So && (e = Error(r(423), {
        cause: n
      }), cu(
        He(e, l)
      )), t = t.current.alternate, t.flags |= 65536, a &= -a, t.lanes |= a, n = He(n, l), a = tr(
        t.stateNode,
        n,
        a
      ), Do(t, a), qt !== 4 && (qt = 2)), !1;
    var u = Error(r(520), { cause: n });
    if (u = He(u, l), Nu === null ? Nu = [u] : Nu.push(u), qt !== 4 && (qt = 2), e === null) return !0;
    n = He(n, l), l = e;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, t = a & -a, l.lanes |= t, t = tr(l.stateNode, n, t), Do(l, t), !1;
        case 1:
          if (e = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (en === null || !en.has(u))))
            return l.flags |= 65536, a &= -a, l.lanes |= a, a = yv(a), gv(
              a,
              t,
              l,
              n
            ), Do(l, a), !1;
          break;
        case 22:
          if (l.memoizedState !== null)
            return l.flags |= 65536, !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var er = Error(r(461)), Kt = !1;
  function Ft(t, e, l, n) {
    e.child = t === null ? Ed(e, null, l, n) : Mn(
      e,
      t.child,
      l,
      n
    );
  }
  function bv(t, e, l, n, a) {
    l = l.render;
    var u = e.ref;
    if ("ref" in n) {
      var c = {};
      for (var s in n)
        s !== "ref" && (c[s] = n[s]);
    } else c = n;
    return Cn(e), n = Bo(
      t,
      e,
      l,
      c,
      u,
      a
    ), s = Yo(), t !== null && !Kt ? (qo(t, e, a), Nl(t, e, a)) : (rt && s && bi(e), e.flags |= 1, Ft(t, e, n, a), e.child);
  }
  function pv(t, e, l, n, a) {
    if (t === null) {
      var u = l.type;
      return typeof u == "function" && !yo(u) && u.defaultProps === void 0 && l.compare === null ? (e.tag = 15, e.type = u, Sv(
        t,
        e,
        u,
        n,
        a
      )) : (t = yi(
        l.type,
        null,
        n,
        e,
        e.mode,
        a
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (u = t.child, !rr(t, a)) {
      var c = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : au, l(c, n) && t.ref === e.ref)
        return Nl(t, e, a);
    }
    return e.flags |= 1, t = Sl(u, n), t.ref = e.ref, t.return = e, e.child = t;
  }
  function Sv(t, e, l, n, a) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (au(u, n) && t.ref === e.ref)
        if (Kt = !1, e.pendingProps = n = u, rr(t, a))
          (t.flags & 131072) !== 0 && (Kt = !0);
        else
          return e.lanes = t.lanes, Nl(t, e, a);
    }
    return lr(
      t,
      e,
      l,
      n,
      a
    );
  }
  function Ev(t, e, l, n) {
    var a = n.children, u = t !== null ? t.memoizedState : null;
    if (t === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | l : l, t !== null) {
          for (n = e.child = t.child, a = 0; n !== null; )
            a = a | n.lanes | n.childLanes, n = n.sibling;
          n = a & ~u;
        } else n = 0, e.child = null;
        return Tv(
          t,
          e,
          u,
          l,
          n
        );
      }
      if ((l & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && xi(
          e,
          u !== null ? u.cachePool : null
        ), u !== null ? Od(e, u) : Mo(), _d(e);
      else
        return n = e.lanes = 536870912, Tv(
          t,
          e,
          u !== null ? u.baseLanes | l : l,
          l,
          n
        );
    } else
      u !== null ? (xi(e, u.cachePool), Od(e, u), Wl(), e.memoizedState = null) : (t !== null && xi(e, null), Mo(), Wl());
    return Ft(t, e, a, l), e.child;
  }
  function pu(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function Tv(t, e, l, n, a) {
    var u = No();
    return u = u === null ? null : { parent: Qt._currentValue, pool: u }, e.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, t !== null && xi(e, null), Mo(), _d(e), t !== null && Nn(t, e, n, !0), e.childLanes = a, null;
  }
  function Gi(t, e) {
    return e = Li(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function xv(t, e, l) {
    return Mn(e, t.child, null, l), t = Gi(e, e.pendingProps), t.flags |= 2, ze(e), e.memoizedState = null, t;
  }
  function R0(t, e, l) {
    var n = e.pendingProps, a = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (rt) {
        if (n.mode === "hidden")
          return t = Gi(e, n), e.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, pu(null, t);
        if (Uo(e), (t = Rt) ? (t = $m(
          t,
          qe
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Gl !== null ? { id: el, overflow: ll } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = id(t), l.return = e, e.child = l, kt = e, Rt = null)) : t = null, t === null) throw Vl(e);
        return e.lanes = 536870912, null;
      }
      return Gi(e, n);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var c = u.dehydrated;
      if (Uo(e), a)
        if (e.flags & 256)
          e.flags &= -257, e = xv(
            t,
            e,
            l
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(r(558));
      else if (Kt || Nn(t, e, l, !1), a = (l & t.childLanes) !== 0, Kt || a) {
        if (Fl.current === null) {
          if (n = At, n !== null && (c = rs(n, l), c !== 0 && c !== u.retryLane))
            throw u.retryLane = c, Tn(t, c), Te(n, t, c), er;
          ic();
        }
        e = xv(
          t,
          e,
          l
        );
      } else
        t = u.treeContext, Rt = Le(c.nextSibling), kt = e, rt = !0, Ll = null, qe = !1, t !== null && rd(e, t), e = Gi(e, n), e.flags |= 134221824;
      return e;
    }
    return t = Sl(t.child, {
      mode: n.mode,
      children: n.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function da(t, e) {
    var l = e.ref;
    if (l === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(r(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function lr(t, e, l, n, a) {
    return Cn(e), l = Bo(
      t,
      e,
      l,
      n,
      void 0,
      a
    ), n = Yo(), t !== null && !Kt ? (qo(t, e, a), Nl(t, e, a)) : (rt && n && bi(e), e.flags |= 1, Ft(t, e, l, a), e.child);
  }
  function Ov(t, e, l, n, a, u) {
    return Cn(e), e.updateQueue = null, l = Cd(
      e,
      n,
      l,
      a
    ), Nd(t), n = Yo(), t !== null && !Kt ? (qo(t, e, u), Nl(t, e, u)) : (rt && n && bi(e), e.flags |= 1, Ft(t, e, l, u), e.child);
  }
  function _v(t, e, l, n, a) {
    if (Cn(e), e.stateNode === null) {
      var u = la, c = l.contextType;
      typeof c == "object" && c !== null && (u = ne(c)), u = new l(n, u), e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Po, e.stateNode = u, u._reactInternals = e, u = e.stateNode, u.props = n, u.state = e.memoizedState, u.refs = {}, zo(e), c = l.contextType, u.context = typeof c == "object" && c !== null ? ne(c) : la, u.state = e.memoizedState, c = l.getDerivedStateFromProps, typeof c == "function" && (Io(
        e,
        l,
        c,
        n
      ), u.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (c = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), c !== u.state && Po.enqueueReplaceState(u, u.state, null), mu(e, n, u, a), vu(), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308), n = !0;
    } else if (t === null) {
      u = e.stateNode;
      var s = e.memoizedProps, m = Un(l, s);
      u.props = m;
      var T = u.context, C = l.contextType;
      c = la, typeof C == "object" && C !== null && (c = ne(C));
      var M = l.getDerivedStateFromProps;
      C = typeof M == "function" || typeof u.getSnapshotBeforeUpdate == "function", s = e.pendingProps !== s, C || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (s || T !== c) && sv(
        e,
        u,
        n,
        c
      ), Zl = !1;
      var S = e.memoizedState;
      u.state = S, mu(e, n, u, a), vu(), T = e.memoizedState, s || S !== T || Zl ? (typeof M == "function" && (Io(
        e,
        l,
        M,
        n
      ), T = e.memoizedState), (m = Zl || fv(
        e,
        l,
        m,
        n,
        S,
        T,
        c
      )) ? (C || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = n, e.memoizedState = T), u.props = n, u.state = T, u.context = c, n = m) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), n = !1);
    } else {
      u = e.stateNode, Ao(t, e), c = e.memoizedProps, C = Un(l, c), u.props = C, M = e.pendingProps, S = u.context, T = l.contextType, m = la, typeof T == "object" && T !== null && (m = ne(T)), s = l.getDerivedStateFromProps, (T = typeof s == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (c !== M || S !== m) && sv(
        e,
        u,
        n,
        m
      ), Zl = !1, S = e.memoizedState, u.state = S, mu(e, n, u, a), vu();
      var N = e.memoizedState;
      c !== M || S !== N || Zl || t !== null && t.dependencies !== null && Ei(t.dependencies) ? (typeof s == "function" && (Io(
        e,
        l,
        s,
        n
      ), N = e.memoizedState), (C = Zl || fv(
        e,
        l,
        C,
        n,
        S,
        N,
        m
      ) || t !== null && t.dependencies !== null && Ei(t.dependencies)) ? (T || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(n, N, m), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        n,
        N,
        m
      )), typeof u.componentDidUpdate == "function" && (e.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || c === t.memoizedProps && S === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === t.memoizedProps && S === t.memoizedState || (e.flags |= 1024), e.memoizedProps = n, e.memoizedState = N), u.props = n, u.state = N, u.context = m, n = C) : (typeof u.componentDidUpdate != "function" || c === t.memoizedProps && S === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === t.memoizedProps && S === t.memoizedState || (e.flags |= 1024), n = !1);
    }
    return u = n, da(t, e), n = (e.flags & 128) !== 0, u || n ? (u = e.stateNode, l = n && typeof l.getDerivedStateFromError != "function" ? null : u.render(), e.flags |= 1, t !== null && n ? (e.child = Mn(
      e,
      t.child,
      null,
      a
    ), e.child = Mn(
      e,
      null,
      l,
      a
    )) : Ft(t, e, l, a), e.memoizedState = u.state, t = e.child) : t = Nl(
      t,
      e,
      a
    ), t;
  }
  function Nv(t, e, l, n) {
    return On(), e.flags |= 256, Ft(t, e, l, n), e.child;
  }
  var nr = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ar(t) {
    return { baseLanes: t, cachePool: hd() };
  }
  function ur(t, e, l) {
    return t = t !== null ? t.childLanes & ~l : 0, e && (t |= Re), t;
  }
  function Cv(t, e, l) {
    var n = e.pendingProps, a = !1, u = (e.flags & 128) !== 0, c;
    if ((c = u) || (c = t !== null && t.memoizedState === null ? !1 : (ue.current & 2) !== 0), c && (a = !0, e.flags &= -129), c = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (rt) {
        if (a ? $l(e) : Wl(), (t = Rt) ? (t = $m(
          t,
          qe
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Gl !== null ? { id: el, overflow: ll } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = id(t), l.return = e, e.child = l, kt = e, Rt = null)) : t = null, t === null) throw Vl(e);
        return af(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      return u = n.children, n = n.fallback, a ? (Wl(), a = e.mode, u = Li(
        { mode: "hidden", children: u },
        a
      ), n = xn(
        n,
        a,
        l,
        null
      ), u.return = e, n.return = e, u.sibling = n, e.child = u, n = e.child, n.memoizedState = ar(l), n.childLanes = ur(
        t,
        c,
        l
      ), e.memoizedState = nr, pu(null, n)) : ($l(e), ir(e, u));
    }
    var s = t.memoizedState;
    if (s !== null) {
      var m = s.dehydrated;
      if (m !== null)
        return M0(
          t,
          e,
          u,
          c,
          n,
          m,
          s,
          l
        );
    }
    return a ? (Wl(), a = n.fallback, u = e.mode, s = t.child, m = s.sibling, n = Sl(s, {
      mode: "hidden",
      children: n.children
    }), n.subtreeFlags = s.subtreeFlags & 1206910976, m !== null ? a = Sl(m, a) : (a = xn(
      a,
      u,
      l,
      null
    ), a.flags |= 2), a.return = e, n.return = e, n.sibling = a, e.child = n, pu(null, n), n = e.child, a = t.child.memoizedState, a === null ? a = ar(l) : (u = a.cachePool, u !== null ? (s = Qt._currentValue, u = u.parent !== s ? { parent: s, pool: s } : u) : u = hd(), a = {
      baseLanes: a.baseLanes | l,
      cachePool: u
    }), n.memoizedState = a, n.childLanes = ur(
      t,
      c,
      l
    ), e.memoizedState = nr, pu(t.child, n)) : ($l(e), l = t.child, t = l.sibling, l = Sl(l, {
      mode: "visible",
      children: n.children
    }), l.return = e, l.sibling = null, t !== null && (c = e.deletions, c === null ? (e.deletions = [t], e.flags |= 16) : c.push(t)), e.child = l, e.memoizedState = null, l);
  }
  function ir(t, e) {
    return e = Li(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function Li(t, e) {
    return t = be(22, t, null, e), t.lanes = 0, t;
  }
  function Vi(t, e, l) {
    return Mn(e, t.child, null, l), t = ir(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function M0(t, e, l, n, a, u, c, s) {
    if (l)
      return e.flags & 256 ? ($l(e), e.flags &= -257, Vi(
        t,
        e,
        s
      )) : e.memoizedState !== null ? (Wl(), e.child = t.child, e.flags |= 128, null) : (Wl(), u = a.fallback, c = e.mode, a = Li(
        { mode: "visible", children: a.children },
        c
      ), u = xn(
        u,
        c,
        s,
        null
      ), u.flags |= 2, a.return = e, u.return = e, a.sibling = u, e.child = a, Mn(e, t.child, null, s), a = e.child, a.memoizedState = ar(s), a.childLanes = ur(
        t,
        n,
        s
      ), e.memoizedState = nr, pu(null, a));
    if ($l(e), af(u)) {
      if (n = u.nextSibling && u.nextSibling.dataset, n) var m = n.dgst;
      return n = m, n !== "" && (a = Error(r(419)), a.stack = "", a.digest = n, cu({ value: a, source: null, stack: null })), Vi(
        t,
        e,
        s
      );
    }
    if (Kt || Nn(t, e, s, !1), n = (s & t.childLanes) !== 0, Kt || n) {
      if (Fl.current !== null)
        return Vi(
          t,
          e,
          s
        );
      if (n = At, n !== null && (a = rs(
        n,
        s
      ), a !== 0 && a !== c.retryLane))
        throw c.retryLane = a, Tn(t, a), Te(n, t, a), er;
      return nf(u) || ic(), Vi(
        t,
        e,
        s
      );
    }
    return nf(u) ? (e.flags |= 192, e.child = t.child, null) : (t = c.treeContext, Rt = Le(u.nextSibling), kt = e, rt = !0, Ll = null, qe = !1, t !== null && rd(e, t), e = ir(
      e,
      a.children
    ), e.flags |= 134221824, e);
  }
  function zv(t, e, l) {
    t.lanes |= e;
    var n = t.alternate;
    n !== null && (n.lanes |= e), Si(t.return, e, l);
  }
  function Av(t) {
    for (var e = null; t !== null; ) {
      var l = t.alternate;
      l !== null && Ai(l) === null && (e = t), t = t.sibling;
    }
    return e;
  }
  function Xi(t, e, l, n, a, u) {
    var c = t.memoizedState;
    c === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: n,
      tail: l,
      tailMode: a,
      treeForkCount: u
    } : (c.isBackwards = e, c.rendering = null, c.renderingStartTime = 0, c.last = n, c.tail = l, c.tailMode = a, c.treeForkCount = u);
  }
  function cr(t) {
    var e = t.child;
    for (t.child = null; e !== null; ) {
      var l = e.sibling;
      e.sibling = t.child, t.child = e, e = l;
    }
  }
  function or(t, e, l) {
    var n = e.pendingProps, a = n.revealOrder, u = n.tail;
    n = n.children;
    var c = ue.current;
    if (e.flags & 128)
      return hu(e, c), null;
    var s = (c & 2) !== 0;
    if (s ? (c = c & 1 | 2, e.flags |= 128) : c &= 1, hu(e, c), a === "backwards" && t !== null ? (cr(t), Ft(t, e, n, l), cr(t)) : Ft(t, e, n, l), n = rt ? iu : 0, !s && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && zv(t, l, e);
        else if (t.tag === 19)
          zv(t, l, e);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (a) {
      case "backwards":
        l = Av(e.child), l === null ? (a = e.child, e.child = null) : (a = l.sibling, l.sibling = null, cr(e)), Xi(
          e,
          !0,
          a,
          null,
          u,
          n
        );
        break;
      case "unstable_legacy-backwards":
        for (l = null, a = e.child, e.child = null; a !== null; ) {
          if (t = a.alternate, t !== null && Ai(t) === null) {
            e.child = a;
            break;
          }
          t = a.sibling, a.sibling = l, l = a, a = t;
        }
        Xi(
          e,
          !0,
          l,
          null,
          u,
          n
        );
        break;
      case "together":
        Xi(
          e,
          !1,
          null,
          null,
          void 0,
          n
        );
        break;
      case "independent":
        e.memoizedState = null;
        break;
      default:
        l = Av(e.child), l === null ? (a = e.child, e.child = null) : (a = l.sibling, l.sibling = null), Xi(
          e,
          !1,
          a,
          l,
          u,
          n
        );
    }
    return e.child;
  }
  function Dv(t, e, l) {
    var n = e.pendingProps;
    return Xl(e, e.type, n.value), Ft(t, e, n.children, l), e.child;
  }
  function Nl(t, e, l) {
    if (t !== null && (e.dependencies = t.dependencies), tn |= e.lanes, (l & e.childLanes) === 0)
      if (t !== null) {
        if (Nn(
          t,
          e,
          l,
          !1
        ), (l & e.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && e.child !== t.child)
      throw Error(r(153));
    if (e.child !== null) {
      for (t = e.child, l = Sl(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
        t = t.sibling, l = l.sibling = Sl(t, t.pendingProps), l.return = e;
      l.sibling = null;
    }
    return e.child;
  }
  function rr(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Ei(t)));
  }
  function j0(t, e, l) {
    switch (e.tag) {
      case 3:
        Fu(e, e.stateNode.containerInfo), Xl(e, Qt, t.memoizedState.cache), On();
        break;
      case 27:
      case 5:
        wc(e);
        break;
      case 4:
        Fu(e, e.stateNode.containerInfo);
        break;
      case 10:
        Xl(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, Uo(e), null;
        break;
      case 13:
        var n = e.memoizedState;
        if (n !== null) {
          if (n.dehydrated !== null)
            return $l(e), e.flags |= 128, null;
          n = Nn(
            t,
            e,
            l,
            !1
          );
          var a = e.child.childLanes;
          return n || (l & a) !== 0 ? Cv(t, e, l) : ($l(e), t = Nl(
            t,
            e,
            l
          ), t !== null ? t.sibling : null);
        }
        $l(e);
        break;
      case 19:
        if (e.flags & 128)
          return or(
            t,
            e,
            l
          );
        if (a = (t.flags & 128) !== 0, n = (l & e.childLanes) !== 0, n || (Nn(
          t,
          e,
          l,
          !1
        ), n = (l & e.childLanes) !== 0), a) {
          if (n)
            return or(
              t,
              e,
              l
            );
          e.flags |= 128;
        }
        if (a = e.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), hu(e, ue.current), n) break;
        return null;
      case 22:
        return e.lanes = 0, Ev(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        Xl(e, Qt, t.memoizedState.cache);
    }
    return Nl(t, e, l);
  }
  function Rv(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        Kt = !0;
      else {
        if (!rr(t, l) && (e.flags & 128) === 0)
          return Kt = !1, j0(
            t,
            e,
            l
          );
        Kt = (t.flags & 131072) !== 0;
      }
    else
      Kt = !1, rt && (e.flags & 1048576) !== 0 && od(e, iu, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var n = e.pendingProps;
          if (t = Dn(e.elementType), e.type = t, typeof t == "function")
            yo(t) ? (n = Un(t, n), e.tag = 1, e = _v(
              null,
              e,
              t,
              n,
              l
            )) : (e.tag = 0, e = lr(
              null,
              e,
              t,
              n,
              l
            ));
          else {
            if (t != null) {
              var a = t.$$typeof;
              if (a === q) {
                e.tag = 11, e = bv(
                  null,
                  e,
                  t,
                  n,
                  l
                );
                break t;
              } else if (a === yt) {
                e.tag = 14, e = pv(
                  null,
                  e,
                  t,
                  n,
                  l
                );
                break t;
              } else if (a === Ht) {
                e.tag = 10, e.type = t, e = Dv(
                  null,
                  e,
                  l
                );
                break t;
              }
            }
            throw e = pt(t) || t, Error(r(306, e, ""));
          }
        }
        return e;
      case 0:
        return lr(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 1:
        return n = e.type, a = Un(
          n,
          e.pendingProps
        ), _v(
          t,
          e,
          n,
          a,
          l
        );
      case 3:
        t: {
          if (Fu(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(r(387));
          n = e.pendingProps;
          var u = e.memoizedState;
          a = u.element, Ao(t, e), mu(e, n, null, l);
          var c = e.memoizedState;
          if (n = c.cache, Xl(e, Qt, n), n !== u.cache && xo(
            e,
            [Qt],
            l,
            !0
          ), vu(), n = c.element, u.isDehydrated)
            if (u = {
              element: n,
              isDehydrated: !1,
              cache: c.cache
            }, e.updateQueue.baseState = u, e.memoizedState = u, e.flags & 256) {
              e = Nv(
                t,
                e,
                n,
                l
              );
              break t;
            } else if (n !== a) {
              a = He(
                Error(r(424)),
                e
              ), cu(a), e = Nv(
                t,
                e,
                n,
                l
              );
              break t;
            } else {
              switch (t = e.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (Rt = Le(t.firstChild), kt = e, rt = !0, Ll = null, qe = !0, l = Ed(
                e,
                null,
                n,
                l
              ), e.child = l; l; )
                l.flags = l.flags & -3 | 134221824, l = l.sibling;
            }
          else {
            if (On(), n === a) {
              e = Nl(
                t,
                e,
                l
              );
              break t;
            }
            Ft(t, e, n, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return da(t, e), t === null ? (l = lh(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = l : rt || (e.stateNode = wm(
          e.type,
          e.pendingProps,
          wl.current,
          e
        )) : e.memoizedState = lh(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return wc(e), t === null && rt && (n = e.stateNode = Im(
          e.type,
          e.pendingProps,
          wl.current
        ), kt = e, qe = !0, a = Rt, an(e.type) ? (uf = a, Rt = Le(n.firstChild)) : Rt = a), Ft(
          t,
          e,
          e.pendingProps.children,
          l
        ), da(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && rt && ((a = n = Rt) && (n = Cb(
          n,
          e.type,
          e.pendingProps,
          qe
        ), n !== null ? (e.stateNode = n, kt = e, Rt = Le(n.firstChild), qe = !1, a = !0) : a = !1), a || Vl(e)), wc(e), a = e.type, u = e.pendingProps, c = t !== null ? t.memoizedProps : null, n = u.children, Wr(a, u) ? n = null : c !== null && Wr(a, c) && (e.flags |= 32), e.memoizedState !== null && (a = Bo(
          t,
          e,
          T0,
          null,
          null,
          l
        ), Da._currentValue = a), da(t, e), Ft(t, e, n, l), e.child;
      case 6:
        return t === null && rt && ((t = l = Rt) && (l = zb(
          l,
          e.pendingProps,
          qe
        ), l !== null ? (e.stateNode = l, kt = e, Rt = null, t = !0) : t = !1), t || Vl(e)), null;
      case 13:
        return Cv(t, e, l);
      case 4:
        return Fu(
          e,
          e.stateNode.containerInfo
        ), n = e.pendingProps, t === null ? e.child = Mn(
          e,
          null,
          n,
          l
        ) : Ft(t, e, n, l), e.child;
      case 11:
        return bv(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 7:
        return n = e.pendingProps, da(t, e), Ft(t, e, n, l), e.child;
      case 8:
        return Ft(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 12:
        return Ft(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 10:
        return Dv(t, e, l);
      case 9:
        return a = e.type._context, n = e.pendingProps.children, Cn(e), a = ne(a), n = n(a), e.flags |= 1, Ft(t, e, n, l), e.child;
      case 14:
        return pv(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 15:
        return Sv(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 19:
        return or(t, e, l);
      case 31:
        return R0(t, e, l);
      case 22:
        return Ev(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        return Cn(e), n = ne(Qt), t === null ? (a = No(), a === null && (a = At, u = Oo(), a.pooledCache = u, u.refCount++, u !== null && (a.pooledCacheLanes |= l), a = u), e.memoizedState = { parent: n, cache: a }, zo(e), Xl(e, Qt, a)) : ((t.lanes & l) !== 0 && (Ao(t, e), mu(e, null, null, l), vu()), a = t.memoizedState, u = e.memoizedState, a.parent !== n ? (a = { parent: n, cache: n }, e.memoizedState = a, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = a), Xl(e, Qt, n)) : (n = u.cache, Xl(e, Qt, n), n !== a.cache && xo(
          e,
          [Qt],
          l,
          !0
        ))), Ft(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 30:
        return e.stateNode === null && (e.stateNode = {
          autoName: null,
          paired: null,
          clones: null,
          ref: null
        }), n = e.pendingProps, n.name != null && n.name !== "auto" ? e.flags |= t === null ? 18882560 : 18874368 : rt && bi(e), t !== null && t.memoizedProps.name !== n.name ? e.flags |= 4194816 : da(t, e), Ft(t, e, n.children, l), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(r(156, e.tag));
  }
  function Cl(t) {
    t.flags |= 4;
  }
  function fr(t, e, l, n, a) {
    var u;
    if ((u = (t.mode & 32) !== 0) && (u = l === null ? ih(e, n) : ih(e, n) && (n.src !== l.src || n.srcSet !== l.srcSet)), u) {
      if (t.flags |= 16777216, (a & 335544128) === a)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (dm()) t.flags |= 8192;
        else
          throw Rn = _i, Co;
    } else t.flags &= -16777217;
  }
  function Mv(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !ch(e))
      if (dm()) t.flags |= 8192;
      else
        throw Rn = _i, Co;
  }
  function Qi(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? is() : 536870912, t.lanes |= e, ga |= e);
  }
  function Su(t, e) {
    if (!rt)
      switch (t.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var l = t.tail, n = null; l !== null; )
            l.alternate !== null && (n = l), l = l.sibling;
          n === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : n.sibling = null;
          break;
        default:
          for (e = t.tail, l = null; e !== null; )
            e.alternate !== null && (l = e), e = e.sibling;
          l === null ? t.tail = null : l.sibling = null;
      }
  }
  function Mt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, l = 0, n = 0;
    if (e)
      for (var a = t.child; a !== null; )
        l |= a.lanes | a.childLanes, n |= a.subtreeFlags & 1206910976, n |= a.flags & 1206910976, a.return = t, a = a.sibling;
    else
      for (a = t.child; a !== null; )
        l |= a.lanes | a.childLanes, n |= a.subtreeFlags, n |= a.flags, a.return = t, a = a.sibling;
    return t.subtreeFlags |= n, t.childLanes = l, e;
  }
  function U0(t, e, l) {
    var n = e.pendingProps;
    switch (po(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Mt(e), null;
      case 1:
        return Mt(e), null;
      case 3:
        return l = e.stateNode, n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), xl(Qt), Xn(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (ua(e) ? Cl(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, Eo())), Mt(e), null;
      case 26:
        var a = e.type, u = e.memoizedState;
        return t === null ? (Cl(e), u !== null ? (Mt(e), Mv(e, u)) : (Mt(e), fr(
          e,
          a,
          null,
          n,
          l
        ))) : u ? u !== t.memoizedState ? (Cl(e), Mt(e), Mv(e, u)) : (Mt(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== n && Cl(e), Mt(e), fr(
          e,
          a,
          t,
          n,
          l
        )), null;
      case 27:
        if ($u(e), l = wl.current, a = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== n && Cl(e);
        else {
          if (!n) {
            if (e.stateNode === null)
              throw Error(r(166));
            return Mt(e), e.subtreeFlags &= -33554433, null;
          }
          t = Pe.current, ua(e) ? fd(e) : (t = Im(a, n, l), e.stateNode = t, Cl(e));
        }
        return Mt(e), e.subtreeFlags &= -33554433, null;
      case 5:
        if ($u(e), a = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== n && Cl(e);
        else {
          if (!n) {
            if (e.stateNode === null)
              throw Error(r(166));
            return Mt(e), e.subtreeFlags &= -33554433, null;
          }
          if (u = Pe.current, ua(e))
            fd(e);
          else {
            var c = Ru(
              wl.current
            );
            switch (u) {
              case 1:
                u = c.createElementNS(
                  "http://www.w3.org/2000/svg",
                  a
                );
                break;
              case 2:
                u = c.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  a
                );
                break;
              default:
                switch (a) {
                  case "svg":
                    u = c.createElementNS(
                      "http://www.w3.org/2000/svg",
                      a
                    );
                    break;
                  case "math":
                    u = c.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      a
                    );
                    break;
                  case "script":
                    u = c.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof n.is == "string" ? c.createElement("select", {
                      is: n.is
                    }) : c.createElement("select"), n.multiple ? u.multiple = !0 : n.size && (u.size = n.size);
                    break;
                  default:
                    u = typeof n.is == "string" ? c.createElement(a, { is: n.is }) : c.createElement(a);
                }
            }
            u[le] = e, u[ge] = n;
            t: for (c = e.child; c !== null; ) {
              if (c.tag === 5 || c.tag === 6)
                u.appendChild(c.stateNode);
              else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                c.child.return = c, c = c.child;
                continue;
              }
              if (c === e) break t;
              for (; c.sibling === null; ) {
                if (c.return === null || c.return === e)
                  break t;
                c = c.return;
              }
              c.sibling.return = c.return, c = c.sibling;
            }
            e.stateNode = u;
            t: switch (ce(u, a, n), a) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                n = !!n.autoFocus;
                break t;
              case "img":
                n = !0;
                break t;
              default:
                n = !1;
            }
            n && Cl(e);
          }
        }
        return Mt(e), e.subtreeFlags &= -33554433, fr(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          l
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== n && Cl(e);
        else {
          if (typeof n != "string" && e.stateNode === null)
            throw Error(r(166));
          if (t = wl.current, ua(e)) {
            if (t = e.stateNode, l = e.memoizedProps, n = null, a = kt, a !== null)
              switch (a.tag) {
                case 27:
                case 5:
                  n = a.memoizedProps;
              }
            t[le] = e, t = !!(t.nodeValue === l || n !== null && n.suppressHydrationWarning === !0 || Rm(t.nodeValue, l)), t || Vl(e, !0);
          } else
            t = Ru(t).createTextNode(
              n
            ), t[le] = e, e.stateNode = t;
        }
        return Mt(e), null;
      case 31:
        if (l = e.memoizedState, t === null || t.memoizedState !== null) {
          if (n = ua(e), l !== null) {
            if (t === null) {
              if (!n) throw Error(r(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(557));
              t[le] = e;
            } else
              On(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Mt(e), t = !1;
          } else
            l = Eo(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l), t = !0;
          if (!t)
            return e.flags & 256 ? (ze(e), e) : (ze(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(r(558));
        }
        return Mt(e), null;
      case 13:
        if (n = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (a = ua(e), n !== null && n.dehydrated !== null) {
            if (t === null) {
              if (!a) throw Error(r(318));
              if (a = e.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(r(317));
              a[le] = e;
            } else
              On(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Mt(e), a = !1;
          } else
            a = Eo(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), a = !0;
          if (!a)
            return e.flags & 256 ? (ze(e), e) : (ze(e), null);
        }
        return ze(e), (e.flags & 128) !== 0 ? (e.lanes = l, e) : (l = n !== null, t = t !== null && t.memoizedState !== null, l && (n = e.child, a = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (a = n.alternate.memoizedState.cachePool.pool), u = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (u = n.memoizedState.cachePool.pool), u !== a && (n.flags |= 2048)), l !== t && l && (e.child.flags |= 8192), Qi(e, e.updateQueue), Mt(e), null);
      case 4:
        return Xn(), t === null && Zr(e.stateNode.containerInfo), e.flags |= 67108864, Mt(e), null;
      case 10:
        return xl(e.type), Mt(e), null;
      case 19:
        if (wo(e), n = e.memoizedState, n === null) return Mt(e), null;
        if (a = (e.flags & 128) !== 0, u = n.rendering, u === null)
          if (a) Su(n, !1);
          else {
            if (qt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (u = Ai(t), u !== null) {
                  for (e.flags |= 128, Su(n, !1), t = u.updateQueue, e.updateQueue = t, Qi(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                    ud(l, t), l = l.sibling;
                  return hu(
                    e,
                    ue.current & 1 | 2
                  ), rt && El(e, n.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            n.tail !== null && xe() > lc && (e.flags |= 128, a = !0, Su(n, !1), e.lanes = 4194304);
          }
        else {
          if (!a)
            if (t = Ai(u), t !== null) {
              if (e.flags |= 128, a = !0, t = t.updateQueue, e.updateQueue = t, Qi(e, t), Su(n, !0), n.tail === null && n.tailMode !== "collapsed" && n.tailMode !== "visible" && !u.alternate && !rt)
                return Mt(e), null;
            } else
              2 * xe() - n.renderingStartTime > lc && l !== 536870912 && (e.flags |= 128, a = !0, Su(n, !1), e.lanes = 4194304);
          n.isBackwards ? (u.sibling = e.child, e.child = u) : (t = n.last, t !== null ? t.sibling = u : e.child = u, n.last = u);
        }
        if (n.tail !== null) {
          t = n.tail;
          t: {
            for (l = t; l !== null; ) {
              if (l.alternate !== null) {
                l = !1;
                break t;
              }
              l = l.sibling;
            }
            l = !0;
          }
          return n.rendering = t, n.tail = t.sibling, n.renderingStartTime = xe(), t.sibling = null, u = ue.current, u = a ? u & 1 | 2 : u & 1, n.tailMode === "visible" || n.tailMode === "collapsed" || !l || rt ? hu(e, u) : (l = u, Dt(ae, e), Dt(ue, l), re === null && (re = e)), rt && El(e, n.treeForkCount), t;
        }
        return Mt(e), null;
      case 22:
      case 23:
        return ze(e), jo(), n = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== n && (e.flags |= 8192) : n && (e.flags |= 8192), n ? (l & 536870912) !== 0 && (e.flags & 128) === 0 && (Mt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Mt(e), l = e.updateQueue, l !== null && Qi(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), n = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), n !== l && (e.flags |= 2048), t !== null && ee(An), null;
      case 24:
        return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), xl(Qt), Mt(e), null;
      case 25:
        return null;
      case 30:
        return e.flags |= 33554432, Mt(e), null;
    }
    throw Error(r(156, e.tag));
  }
  function w0(t, e) {
    switch (po(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return xl(Qt), Xn(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return $u(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (ze(e), e.alternate === null)
            throw Error(r(340));
          On();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (ze(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(r(340));
          On();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return wo(e), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, t = e.memoizedState, t !== null && (t.rendering = null, t.tail = null), e.flags |= 4, e) : null;
      case 4:
        return Xn(), null;
      case 10:
        return xl(e.type), null;
      case 22:
      case 23:
        return ze(e), jo(), t !== null && ee(An), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return xl(Qt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function jv(t, e) {
    switch (po(e), e.tag) {
      case 3:
        xl(Qt), Xn();
        break;
      case 26:
      case 27:
      case 5:
        $u(e);
        break;
      case 4:
        Xn();
        break;
      case 31:
        e.memoizedState !== null && ze(e);
        break;
      case 13:
        ze(e);
        break;
      case 19:
        wo(e);
        break;
      case 10:
        xl(e.type);
        break;
      case 22:
      case 23:
        ze(e), jo(), t !== null && ee(An);
        break;
      case 24:
        xl(Qt);
    }
  }
  function Eu(t, e) {
    try {
      var l = e.updateQueue, n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var a = n.next;
        l = a;
        do {
          if ((l.tag & t) === t) {
            n = void 0;
            var u = l.create, c = l.inst;
            n = u(), c.destroy = n;
          }
          l = l.next;
        } while (l !== a);
      }
    } catch (s) {
      Nt(e, e.return, s);
    }
  }
  function kl(t, e, l) {
    try {
      var n = e.updateQueue, a = n !== null ? n.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        n = u;
        do {
          if ((n.tag & t) === t) {
            var c = n.inst, s = c.destroy;
            if (s !== void 0) {
              c.destroy = void 0, a = e;
              var m = l, T = s;
              try {
                T();
              } catch (C) {
                Nt(
                  a,
                  m,
                  C
                );
              }
            }
          }
          n = n.next;
        } while (n !== u);
      }
    } catch (C) {
      Nt(e, e.return, C);
    }
  }
  function Uv(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        xd(e, l);
      } catch (n) {
        Nt(t, t.return, n);
      }
    }
  }
  function wv(t, e, l) {
    l.props = Un(
      t.type,
      t.memoizedProps
    ), l.state = t.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (n) {
      Nt(t, e, n);
    }
  }
  function nl(t, e) {
    try {
      var l = t.ref;
      if (l !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var n = t.stateNode;
            break;
          case 30:
            var a = t.stateNode, u = bl(t.memoizedProps, a);
            (a.ref === null || a.ref.name !== u) && (a.ref = Vm(u)), n = a.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var c = new je(t);
              h(
                t.child,
                !1,
                _b,
                c,
                void 0,
                void 0
              ), t.stateNode = c;
            }
            n = t.stateNode;
            break;
          default:
            n = t.stateNode;
        }
        typeof l == "function" ? t.refCleanup = l(n) : l.current = n;
      }
    } catch (s) {
      Nt(t, e, s);
    }
  }
  function ie(t, e) {
    var l = t.ref, n = t.refCleanup;
    if (l !== null)
      if (typeof n == "function")
        try {
          n();
        } catch (a) {
          Nt(t, e, a);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (a) {
          Nt(t, e, a);
        }
      else l.current = null;
  }
  function Zi(t, e) {
    if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && e !== null)
      for (var l = 0; l < e.length; l++)
        Fm(
          t.stateNode,
          e[l]
        );
  }
  function Hv(t) {
    for (var e = t.return; e !== null && (dr(e) && Fm(t.stateNode, e.stateNode), !sr(e)); )
      e = e.return;
  }
  function Tu(t) {
    for (var e = t.return; e !== null && (dr(e) && Nb(t.stateNode, e.stateNode), !sr(e)); )
      e = e.return;
  }
  function sr(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 27;
  }
  function dr(t) {
    return t && t.tag === 7 && t.stateNode !== null;
  }
  function vr(t) {
    var e = t.type, l = t.memoizedProps, n = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && n.focus();
          break t;
        case "img":
          l.src ? n.src = l.src : l.srcSet && (n.srcset = l.srcSet);
      }
    } catch (a) {
      Nt(t, t.return, a);
    }
  }
  function mr(t, e, l) {
    try {
      var n = t.stateNode;
      cb(n, t.type, l, e), n[ge] = e;
    } catch (a) {
      Nt(t, t.return, a);
    }
  }
  function Bv(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && an(t.type) || t.tag === 4;
  }
  function hr(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Bv(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && an(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function yr(t, e, l, n) {
    var a = t.tag;
    if (a === 5 || a === 6)
      a = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(a, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(a), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = tl)), Zi(t, n), St = !0;
    else if (a !== 4 && (a === 27 && (Zi(t, n), n = null, an(t.type) && (l = t.stateNode, e = null)), t = t.child, t !== null))
      for (yr(
        t,
        e,
        l,
        n
      ), t = t.sibling; t !== null; )
        yr(
          t,
          e,
          l,
          n
        ), t = t.sibling;
  }
  function Ki(t, e, l, n) {
    var a = t.tag;
    if (a === 5 || a === 6)
      a = t.stateNode, e ? l.insertBefore(a, e) : l.appendChild(a), Zi(t, n), St = !0;
    else if (a !== 4 && (a === 27 && (Zi(t, n), n = null, an(t.type) && (l = t.stateNode)), t = t.child, t !== null))
      for (Ki(
        t,
        e,
        l,
        n
      ), t = t.sibling; t !== null; )
        Ki(
          t,
          e,
          l,
          n
        ), t = t.sibling;
  }
  function Yv(t) {
    var e = t.stateNode, l = t.memoizedProps;
    try {
      for (var n = t.type, a = e.attributes; a.length; )
        e.removeAttributeNode(a[0]);
      ce(e, n, l), e[le] = t, e[ge] = l;
    } catch (u) {
      Nt(t, t.return, u);
    }
  }
  var Ji = !1, Ae = null;
  function qv(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (Ji = !0);
  }
  var al = null;
  function Gv() {
    var t = al;
    return al = null, t;
  }
  var pe = 0;
  function va(t, e, l, n, a) {
    return pe = 0, Lv(
      t.child,
      e,
      l,
      n,
      a
    );
  }
  function Lv(t, e, l, n, a) {
    for (var u = !1; t !== null; ) {
      if (t.tag === 5) {
        var c = t.stateNode;
        if (n !== null) {
          var s = Pr(c);
          n.push(s), s.view && (u = !0);
        } else
          u || Pr(c).view && (u = !0);
        Ji = !0, Gm(
          c,
          pe === 0 ? e : e + "_" + pe,
          l
        ), pe++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && a || Lv(
        t.child,
        e,
        l,
        n,
        a
      ) && (u = !0));
      t = t.sibling;
    }
    return u;
  }
  function ul(t, e) {
    for (; t !== null; )
      t.tag === 5 ? Lm(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && e || ul(
        t.child,
        e
      )), t = t.sibling;
  }
  function Fi(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && (Fi(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
          var e = t.memoizedProps;
          if (e.name == null || e.name === "auto")
            throw Error(r(544));
          var l = e.name;
          e = pl(e.default, e.share), e !== "none" && (va(
            t,
            l,
            e,
            null,
            !1
          ) || ul(t.child, !1));
        }
        t = t.sibling;
      }
  }
  function gr(t, e) {
    if (t.tag === 30) {
      var l = t.stateNode, n = t.memoizedProps, a = bl(n, l), u = pl(
        n.default,
        l.paired ? n.share : n.enter
      );
      u !== "none" ? va(t, a, u, null, !1) ? (Fi(t), l.paired || e || Ea(t, n.onEnter)) : ul(t.child, !1) : Fi(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        gr(t, e), t = t.sibling;
    else Fi(t);
  }
  function br(t) {
    if (Ae !== null && Ae.size !== 0) {
      var e = Ae;
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var l = t.memoizedProps, n = l.name;
              if (n != null && n !== "auto") {
                var a = e.get(n);
                if (a !== void 0) {
                  var u = pl(
                    l.default,
                    l.share
                  );
                  if (u !== "none" && (va(
                    t,
                    n,
                    u,
                    null,
                    !1
                  ) ? (u = t.stateNode, a.paired = u, u.paired = a, Ea(t, l.onShare)) : ul(t.child, !1)), e.delete(n), e.size === 0) break;
                }
              }
            }
            br(t);
          }
          t = t.sibling;
        }
    }
  }
  function pr(t) {
    if (t.tag === 30) {
      var e = t.memoizedProps, l = bl(e, t.stateNode), n = Ae !== null ? Ae.get(l) : void 0, a = pl(
        e.default,
        n !== void 0 ? e.share : e.exit
      );
      a !== "none" && (va(t, l, a, null, !1) ? n !== void 0 ? (a = t.stateNode, n.paired = a, a.paired = n, Ae.delete(l), Ea(t, e.onShare)) : Ea(t, e.onExit) : ul(t.child, !1)), Ae !== null && br(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        pr(t), t = t.sibling;
    else
      Ae !== null && br(t);
  }
  function Vv(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var e = t.memoizedProps, l = bl(e, t.stateNode);
        e = pl(e.default, e.update), t.flags &= -5, e !== "none" && va(
          t,
          l,
          e,
          t.memoizedState = [],
          !1
        );
      } else
        (t.subtreeFlags & 33554432) !== 0 && Vv(t);
      t = t.sibling;
    }
  }
  function Sr(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var e = t.stateNode;
            e.paired !== null && (e.paired = null, ul(t.child, !1));
          }
          Sr(t);
        }
        t = t.sibling;
      }
  }
  function $i(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, ul(t.child, !1), Sr(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        $i(t), t = t.sibling;
    else Sr(t);
  }
  function Xv(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? ul(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && Xv(t), t = t.sibling;
  }
  function Er(t, e, l, n, a, u, c) {
    for (var s = !1; e !== null; ) {
      if (e.tag === 5) {
        var m = e.stateNode;
        if (u !== null && pe < u.length) {
          var T = u[pe], C = Pr(m);
          (T.view || C.view) && (s = !0);
          var M;
          if (M = (t.flags & 4) === 0)
            if (C.clip) M = !0;
            else {
              M = T.rect;
              var S = C.rect;
              M = M.y !== S.y || M.x !== S.x || M.height !== S.height || M.width !== S.width;
            }
          M && (t.flags |= 4), C.abs ? C = !T.abs : (T = T.rect, C = C.rect, C = T.height !== C.height || T.width !== C.width), C && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && Gm(
          m,
          pe === 0 ? l : l + "_" + pe,
          a
        ), s && (t.flags & 4) !== 0 || (al === null && (al = []), al.push(
          m,
          pe === 0 ? n : n + "_" + pe,
          e.memoizedProps
        )), pe++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && c ? t.flags |= e.flags & 32 : Er(
        t,
        e.child,
        l,
        n,
        a,
        u,
        c
      ) && (s = !0));
      e = e.sibling;
    }
    return s;
  }
  function Qv(t, e) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var l = t.memoizedProps, n = t.stateNode, a = bl(l, n), u = pl(l.default, l.update), c;
        c = t.memoizedState, t.memoizedState = null, n = t;
        var s = t.child;
        pe = 0, a = Er(
          n,
          s,
          a,
          a,
          u,
          c,
          !1
        ), (t.flags & 4) !== 0 && a && Ea(t, l.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && Qv(t);
      t = t.sibling;
    }
  }
  var It = !1, Ot = !1, il = !1, Tr = !1, Zv = typeof WeakSet == "function" ? WeakSet : Set, Pt = null, cl = !1, xu = !1, Wi = !1, xr = !1;
  function H0(t, e, l) {
    if (t = t.containerInfo, Fr = Ra, t = $s(t), oo(t)) {
      if ("selectionStart" in t)
        var n = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          n = (n = t.ownerDocument) && n.defaultView || window;
          var a = n.getSelection && n.getSelection();
          if (a && a.rangeCount !== 0) {
            n = a.anchorNode;
            var u = a.anchorOffset, c = a.focusNode;
            a = a.focusOffset;
            try {
              n.nodeType, c.nodeType;
            } catch {
              n = null;
              break t;
            }
            var s = 0, m = -1, T = -1, C = 0, M = 0, S = t, N = null;
            e: for (; ; ) {
              for (var Y; S !== n || u !== 0 && S.nodeType !== 3 || (m = s + u), S !== c || a !== 0 && S.nodeType !== 3 || (T = s + a), S.nodeType === 3 && (s += S.nodeValue.length), (Y = S.firstChild) !== null; )
                N = S, S = Y;
              for (; ; ) {
                if (S === t) break e;
                if (N === n && ++C === u && (m = s), N === c && ++M === a && (T = s), (Y = S.nextSibling) !== null) break;
                S = N, N = S.parentNode;
              }
              S = Y;
            }
            n = m === -1 || T === -1 ? null : { start: m, end: T };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for ($r = { focusedElem: t, selectionRange: n }, Ra = !1, l = (l & 335544064) === l, Pt = e, e = l ? 9270 : 1024; Pt !== null; ) {
      if (t = Pt, l && (n = t.deletions, n !== null))
        for (u = 0; u < n.length; u++)
          l && pr(n[u]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        l && qv(t), ki(l);
      else {
        if (t.tag === 22) {
          if (n = t.alternate, t.memoizedState !== null) {
            n !== null && n.memoizedState === null && l && pr(n), ki(l);
            continue;
          } else if (n !== null && n.memoizedState !== null) {
            l && qv(t), ki(l);
            continue;
          }
        }
        n = t.child, (t.subtreeFlags & e) !== 0 && n !== null ? (n.return = t, Pt = n) : (l && Vv(t), ki(l));
      }
    }
    Ae = null;
  }
  function ki(t) {
    for (; Pt !== null; ) {
      var e = Pt, l = t, n = e.alternate, a = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((a & 1024) !== 0 && n !== null) {
            l = void 0, a = n.memoizedProps, n = n.memoizedState;
            var u = e.stateNode;
            try {
              var c = Un(
                e.type,
                a
              );
              l = u.getSnapshotBeforeUpdate(
                c,
                n
              ), u.__reactInternalSnapshotBeforeUpdate = l;
            } catch (s) {
              Nt(e, e.return, s);
            }
          }
          break;
        case 3:
          if ((a & 1024) !== 0) {
            if (n = e.stateNode.containerInfo, l = n.nodeType, l === 9)
              lf(n);
            else if (l === 1)
              switch (n.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  lf(n);
                  break;
                default:
                  n.textContent = "";
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
          l && n !== null && (l = bl(
            n.memoizedProps,
            n.stateNode
          ), a = e.memoizedProps, a = pl(a.default, a.update), a !== "none" && va(
            n,
            l,
            a,
            n.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((a & 1024) !== 0) throw Error(r(163));
      }
      if (n = e.sibling, n !== null) {
        n.return = e.return, Pt = n;
        break;
      }
      Pt = e.return;
    }
  }
  function Kv(t, e, l) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        ol(t, l), n & 4 && Eu(5, l);
        break;
      case 1:
        if (ol(t, l), n & 4)
          if (t = l.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (c) {
              Nt(l, l.return, c);
            }
          else {
            var a = Un(
              l.type,
              e.memoizedProps
            );
            e = e.memoizedState;
            try {
              t.componentDidUpdate(
                a,
                e,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (c) {
              Nt(
                l,
                l.return,
                c
              );
            }
          }
        n & 64 && Uv(l), n & 512 && nl(l, l.return);
        break;
      case 3:
        if (ol(t, l), n & 64 && (t = l.updateQueue, t !== null)) {
          if (e = null, l.child !== null)
            switch (l.child.tag) {
              case 27:
              case 5:
                e = l.child.stateNode;
                break;
              case 1:
                e = l.child.stateNode;
            }
          try {
            xd(t, e);
          } catch (c) {
            Nt(l, l.return, c);
          }
        }
        break;
      case 27:
        e === null && n & 4 && Yv(l);
      case 26:
      case 5:
        ol(t, l), e === null && n & 4 && vr(l), n & 512 && nl(l, l.return);
        break;
      case 12:
        ol(t, l);
        break;
      case 31:
        ol(t, l), n & 4 && Wv(t, l);
        break;
      case 13:
        ol(t, l), n & 4 && kv(t, l), n & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = F0.bind(
          null,
          l
        ), Ab(t, l))));
        break;
      case 22:
        if (n = l.memoizedState !== null || It, !n) {
          var u = e !== null && e.memoizedState !== null || Ot;
          e = It, a = Ot, It = n, (Ot = u) && !a ? (n = 2, (l.subtreeFlags & 8772) !== 0 && (n |= 1), Fe(
            t,
            l,
            n
          )) : ol(t, l), It = e, Ot = a;
        }
        break;
      case 30:
        ol(t, l), n & 512 && nl(l, l.return);
        break;
      case 7:
        n & 512 && nl(l, l.return);
      default:
        ol(t, l);
    }
  }
  function Or(t, e) {
    for (t = t.child; t !== null; )
      Jv(t, e), t = t.sibling;
  }
  function Jv(t, e) {
    switch (t.tag) {
      case 5:
      case 26:
        try {
          var l = t.stateNode;
          if (e) {
            var n = l.style;
            typeof n.setProperty == "function" ? n.setProperty("display", "none", "important") : n.display = "none";
          } else {
            var a = t.stateNode, u = t.memoizedProps.style, c = u != null && u.hasOwnProperty("display") ? u.display : null;
            a.style.display = c == null || typeof c == "boolean" ? "" : ("" + c).trim();
          }
        } catch (m) {
          Nt(t, t.return, m);
        }
        _r(t, e);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = e ? "" : t.memoizedProps, St = !0;
        } catch (m) {
          Nt(t, t.return, m);
        }
        break;
      case 18:
        try {
          var s = t.stateNode;
          e ? qm(s, !0) : qm(t.stateNode, !1);
        } catch (m) {
          Nt(t, t.return, m);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && Or(t, e);
        break;
      default:
        Or(t, e);
    }
  }
  function _r(t, e) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        t: {
          var l = t, n = e;
          switch (l.tag) {
            case 4:
              Jv(l, n);
              break t;
            case 22:
              l.memoizedState === null && _r(l, n);
              break t;
            default:
              _r(l, n);
          }
        }
        t = t.sibling;
      }
  }
  function Fv(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, Fv(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && li(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var wt = null, Se = !1;
  function Ke(t, e, l) {
    for (l = l.child; l !== null; )
      $v(t, e, l), l = l.sibling;
  }
  function $v(t, e, l) {
    if (Oe && typeof Oe.onCommitFiberUnmount == "function")
      try {
        Oe.onCommitFiberUnmount(Ka, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        Ot || ie(l, e), Ke(
          t,
          e,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && !Ot && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        Ot || ie(l, e), Tu(l);
        var n = wt, a = Se;
        an(l.type) && (wt = l.stateNode, Se = !1), Ke(
          t,
          e,
          l
        ), Pm(
          l.stateNode,
          l.type,
          l.memoizedProps
        ), wt = n, Se = a;
        break;
      case 5:
        Ot || ie(l, e), Tu(l);
      case 6:
        if (l.tag === 6 && Tu(l), n = wt, a = Se, wt = null, Ke(
          t,
          e,
          l
        ), wt = n, Se = a, wt !== null)
          if (Se)
            try {
              (wt.nodeType === 9 ? wt.body : wt.nodeName === "HTML" ? wt.ownerDocument.body : wt).removeChild(l.stateNode), St = !0;
            } catch (u) {
              Nt(
                l,
                e,
                u
              );
            }
          else
            try {
              wt.removeChild(l.stateNode), St = !0;
            } catch (u) {
              Nt(
                l,
                e,
                u
              );
            }
        break;
      case 18:
        wt !== null && (Se ? (t = wt, Ym(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          l.stateNode
        ), Ma(t)) : Ym(wt, l.stateNode));
        break;
      case 4:
        n = wt, a = Se, wt = l.stateNode.containerInfo, Se = !0, Ke(
          t,
          e,
          l
        ), wt = n, Se = a;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        kl(2, l, e), Ot || kl(4, l, e), Ke(
          t,
          e,
          l
        );
        break;
      case 1:
        Ot || (ie(l, e), n = l.stateNode, typeof n.componentWillUnmount == "function" && wv(
          l,
          e,
          n
        )), Ke(
          t,
          e,
          l
        );
        break;
      case 21:
        Ke(
          t,
          e,
          l
        );
        break;
      case 22:
        Ot = (n = Ot) || l.memoizedState !== null, Ke(
          t,
          e,
          l
        ), Ot = n;
        break;
      case 30:
        ie(l, e), Ke(
          t,
          e,
          l
        );
        break;
      case 7:
        Ot || ie(l, e), Ke(
          t,
          e,
          l
        );
        break;
      default:
        Ke(
          t,
          e,
          l
        );
    }
  }
  function Wv(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Ma(t);
      } catch (l) {
        Nt(e, e.return, l);
      }
    }
  }
  function kv(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Ma(t);
      } catch (l) {
        Nt(e, e.return, l);
      }
  }
  function B0(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new Zv()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new Zv()), e;
      default:
        throw Error(r(435, t.tag));
    }
  }
  function Ii(t, e) {
    var l = B0(t);
    e.forEach(function(n) {
      if (!l.has(n)) {
        l.add(n);
        var a = $0.bind(null, t, n);
        n.then(a, a);
      }
    });
  }
  function me(t, e, l) {
    var n = e.deletions;
    if (n !== null)
      for (var a = 0; a < n.length; a++) {
        var u = n[a], c = t, s = e, m = s;
        t: for (; m !== null; ) {
          switch (m.tag) {
            case 27:
              if (an(m.type)) {
                wt = m.stateNode, Se = !1;
                break t;
              }
              break;
            case 5:
              wt = m.stateNode, Se = !1;
              break t;
            case 3:
            case 4:
              wt = m.stateNode.containerInfo, Se = !0;
              break t;
          }
          m = m.return;
        }
        if (wt === null) throw Error(r(160));
        $v(c, s, u), wt = null, Se = !1, c = u.alternate, c !== null && (c.return = null), u.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        Iv(e, t, l), e = e.sibling;
  }
  var Je = null;
  function Iv(t, e, l) {
    var n = t.alternate, a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (a & 4 && (n = t.updateQueue, n = n !== null ? n.events : null, n !== null))
          for (var u = 0; u < n.length; u++) {
            var c = n[u];
            c.ref.impl = c.nextImpl;
          }
        me(e, t, l), he(t), a & 4 && (kl(3, t, t.return), Eu(3, t), kl(5, t, t.return));
        break;
      case 1:
        me(e, t, l), he(t), a & 512 && (Ot || n === null || ie(n, n.return)), a & 64 && It && (t = t.updateQueue, t !== null && (e = t.callbacks, e !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? e : l.concat(e))));
        break;
      case 26:
        if (u = Je, me(e, t, l), he(t), a & 512 && (Ot || n === null || ie(n, n.return)), a & 4)
          if (a = n !== null ? n.memoizedState : null, l = t.memoizedState, n === null)
            if (l === null)
              if (t.stateNode === null)
                if (It)
                  t.stateNode = wm(
                    t.type,
                    t.memoizedProps,
                    e.containerInfo,
                    t
                  );
                else {
                  t: {
                    e = t.type, l = t.memoizedProps, a = u.ownerDocument || u;
                    e: switch (e) {
                      case "title":
                        n = a.getElementsByTagName("title")[0], (!n || n[$a] || n[le] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = a.createElement(e), a.head.insertBefore(
                          n,
                          a.querySelector("head > title")
                        )), ce(n, e, l), n[le] = t, Wt(n), e = n;
                        break t;
                      case "link":
                        if (u = uh(
                          "link",
                          "href",
                          a
                        ).get(e + (l.href || ""))) {
                          for (c = 0; c < u.length; c++)
                            if (n = u[c], n.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && n.getAttribute("rel") === (l.rel == null ? null : l.rel) && n.getAttribute("title") === (l.title == null ? null : l.title) && n.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                              u.splice(c, 1);
                              break e;
                            }
                        }
                        n = a.createElement(e), ce(n, e, l), a.head.appendChild(n);
                        break;
                      case "meta":
                        if (u = uh(
                          "meta",
                          "content",
                          a
                        ).get(e + (l.content || ""))) {
                          for (c = 0; c < u.length; c++)
                            if (n = u[c], n.getAttribute("content") === (l.content == null ? null : "" + l.content) && n.getAttribute("name") === (l.name == null ? null : l.name) && n.getAttribute("property") === (l.property == null ? null : l.property) && n.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && n.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                              u.splice(c, 1);
                              break e;
                            }
                        }
                        n = a.createElement(e), ce(n, e, l), a.head.appendChild(n);
                        break;
                      default:
                        throw Error(r(468, e));
                    }
                    n[le] = t, Wt(n), e = n;
                  }
                  t.stateNode = e;
                }
              else
                It || ff(u, t.type, t.stateNode);
            else
              t.stateNode = ah(
                u,
                l,
                t.memoizedProps
              );
          else
            a !== l ? (a === null ? (e = n.stateNode, e === null || Ot || e.parentNode.removeChild(e)) : a.count--, l === null ? It || ff(u, t.type, t.stateNode) : ah(u, l, t.memoizedProps)) : l === null && t.stateNode !== null && mr(
              t,
              t.memoizedProps,
              n.memoizedProps
            );
        break;
      case 27:
        me(e, t, l), he(t), a & 512 && (Ot || n === null || ie(n, n.return)), n !== null && a & 4 && mr(
          t,
          t.memoizedProps,
          n.memoizedProps
        );
        break;
      case 5:
        if (u = il, il = !1, me(e, t, l), il = u, he(t), a & 512 && (Ot || n === null || ie(n, n.return)), t.flags & 32) {
          e = t.stateNode;
          try {
            $n(e, ""), St = !0;
          } catch (C) {
            Nt(t, t.return, C);
          }
        }
        a & 4 && t.stateNode != null && (e = t.memoizedProps, mr(
          t,
          e,
          n !== null ? n.memoizedProps : e
        )), a & 1024 && (Tr = !0);
        break;
      case 6:
        if (me(e, t, l), he(t), a & 4) {
          if (t.stateNode === null)
            throw Error(r(162));
          e = t.memoizedProps, l = t.stateNode;
          try {
            l.nodeValue = e, St = !0;
          } catch (C) {
            Nt(t, t.return, C);
          }
        }
        break;
      case 3:
        if (St = !1, vc = null, u = Je, Je = Mu(e.containerInfo), me(e, t, l), Je = u, he(t), a & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            Ma(e.containerInfo);
          } catch (C) {
            Nt(t, t.return, C);
          }
        Tr && (Tr = !1, Pv(t)), St = !1;
        break;
      case 4:
        a = il, il = It, n = ps(), u = Je, Je = Mu(
          t.stateNode.containerInfo
        ), me(e, t, l), he(t), Je = u, St && xu && (Wi = !0), St = n, il = a;
        break;
      case 12:
        me(e, t, l), he(t);
        break;
      case 31:
        me(e, t, l), he(t), a & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, Ii(t, e)));
        break;
      case 13:
        me(e, t, l), he(t), t.child.flags & 8192 && t.memoizedState !== null != (n !== null && n.memoizedState !== null) && (ec = xe()), a & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, Ii(t, e)));
        break;
      case 22:
        u = t.memoizedState !== null, c = n !== null && n.memoizedState !== null;
        var s = It, m = Ot, T = il;
        It = s || u, il = T || u, Ot = m || c, me(e, t, l), Ot = m, il = T, It = s, he(t), a & 8192 && (e = t.stateNode, e._visibility = u ? e._visibility & -2 : e._visibility | 1, !u || n === null || c || It || Ot || (e = c || Ot, l = It, n = Ot, It = u || It, Ot = e, Il(t, 2), It = l, Ot = n), !u && il || Or(t, u)), a & 4 && (e = t.updateQueue, e !== null && (l = e.retryQueue, l !== null && (e.retryQueue = null, Ii(t, l))));
        break;
      case 19:
        me(e, t, l), he(t), a & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, Ii(t, e)));
        break;
      case 30:
        a & 512 && (Ot || n === null || ie(n, n.return)), a = ps(), u = xu, c = (l & 335544064) === l, s = t.memoizedProps, xu = c && pl(
          s.default,
          s.update
        ) !== "none", me(e, t, l), he(t), c && n !== null && St && (t.flags |= 4), xu = u, St = a;
        break;
      case 21:
        break;
      case 7:
        a & 512 && (Ot || n === null || ie(n, n.return)), n && n.stateNode !== null && (n.stateNode._fragmentFiber = t);
      default:
        me(e, t, l), he(t);
    }
  }
  function he(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var l, n = t.return; n !== null; ) {
          if (Bv(n)) {
            l = n;
            break;
          }
          n = n.return;
        }
        n = null;
        for (var a = t.return; a !== null; ) {
          if (dr(a)) {
            var u = a.stateNode;
            n === null ? n = [u] : n.push(u);
          }
          if (sr(a)) break;
          a = a.return;
        }
        var c = n;
        if (l == null) throw Error(r(160));
        switch (l.tag) {
          case 27:
            var s = l.stateNode, m = hr(t);
            Ki(
              t,
              m,
              s,
              c
            );
            break;
          case 5:
            var T = l.stateNode;
            l.flags & 32 && ($n(T, ""), l.flags &= -33);
            var C = hr(t);
            Ki(
              t,
              C,
              T,
              c
            );
            break;
          case 3:
          case 4:
            var M = l.stateNode.containerInfo, S = hr(t);
            yr(
              t,
              S,
              M,
              c
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (N) {
        Nt(t, t.return, N);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Pv(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Pv(e), e.tag === 5 && e.flags & 1024 && (e = e.stateNode, Ra = !0, e.reset(), Ra = !1), t = t.sibling;
      }
  }
  function ma(t, e) {
    if (e.subtreeFlags & 9270)
      for (e = e.child; e !== null; )
        tm(e, t), e = e.sibling;
    else Qv(e);
  }
  function tm(t, e) {
    var l = t.alternate;
    if (l === null) gr(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (xr = cl = !1, Gv(), ma(e, t), !cl && !Wi) {
            if (t = al, t !== null)
              for (var n = 0; n < t.length; n += 3) {
                l = t[n];
                var a = t[n + 1];
                Lm(l, t[n + 2]), l = l.ownerDocument.documentElement, l !== null && l.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + a + ")"
                  }
                );
              }
            t = e.containerInfo, t = t.nodeType === 9 ? t.documentElement : t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "" && (t.style.viewTransitionName = "none", t.animate(
              { opacity: [0, 0], pointerEvents: ["none", "none"] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition-group(root)"
              }
            ), t.animate(
              { width: [0, 0], height: [0, 0] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition"
              }
            )), xr = !0;
          }
          al = null;
          break;
        case 5:
          ma(e, t);
          break;
        case 4:
          n = cl, cl = !1, ma(e, t), cl && (Wi = !0), cl = n;
          break;
        case 22:
          t.memoizedState === null && (l.memoizedState !== null ? gr(t, !1) : ma(e, t));
          break;
        case 30:
          n = cl, a = Gv(), cl = !1, ma(e, t), cl && (t.flags |= 4);
          var u = t.memoizedProps, c = t.stateNode;
          e = bl(u, c), c = bl(l.memoizedProps, c);
          var s = pl(u.default, u.update);
          s === "none" ? e = !1 : (u = l.memoizedState, l.memoizedState = null, l = t.child, pe = 0, e = Er(
            t,
            l,
            e,
            c,
            s,
            u,
            !0
          ), pe !== (u === null ? 0 : u.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && e ? (Ea(
            t,
            t.memoizedProps.onUpdate
          ), al = a) : a !== null && (a.push.apply(a, al), al = a), cl = (t.flags & 32) !== 0 ? !0 : n;
          break;
        default:
          ma(e, t);
      }
  }
  function ol(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        Kv(t, e.alternate, e), e = e.sibling;
  }
  function Il(t, e) {
    for (t = t.child; t !== null; ) {
      var l = t, n = e;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          kl(4, l, l.return), Il(
            l,
            n
          );
          break;
        case 1:
          ie(l, l.return);
          var a = l.stateNode;
          typeof a.componentWillUnmount == "function" && wv(
            l,
            l.return,
            a
          ), Il(
            l,
            n
          );
          break;
        case 27:
          (n & 2) !== 0 && Pm(
            l.stateNode,
            l.type,
            l.memoizedProps
          );
        case 5:
          ie(l, l.return), l.tag !== 5 && l.tag !== 27 || Tu(l), Il(
            l,
            n
          );
          break;
        case 6:
          Tu(l);
          break;
        case 26:
          ie(l, l.return), a = l.stateNode, l.memoizedState !== null || a === null || Ot || a.parentNode.removeChild(a), Il(
            l,
            n
          );
          break;
        case 22:
          l.memoizedState === null && Il(
            l,
            n
          );
          break;
        case 30:
          ie(l, l.return), Il(
            l,
            n
          );
          break;
        case 7:
          ie(l, l.return);
        default:
          Il(
            l,
            n
          );
      }
      t = t.sibling;
    }
  }
  function Fe(t, e, l) {
    for (l = (e.subtreeFlags & 8772) !== 0 ? l : l & -2, e = e.child; e !== null; ) {
      var n = e.alternate, a = t, u = e, c = u.flags, s = (l & 1) !== 0;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Fe(
            a,
            u,
            l
          ), Eu(4, u);
          break;
        case 1:
          if (Fe(
            a,
            u,
            l
          ), n = u, a = n.stateNode, typeof a.componentDidMount == "function")
            try {
              a.componentDidMount();
            } catch (C) {
              Nt(n, n.return, C);
            }
          if (n = u, a = n.updateQueue, a !== null) {
            var m = n.stateNode;
            try {
              var T = a.shared.hiddenCallbacks;
              if (T !== null)
                for (a.shared.hiddenCallbacks = null, a = 0; a < T.length; a++)
                  Td(T[a], m);
            } catch (C) {
              Nt(n, n.return, C);
            }
          }
          s && c & 64 && Uv(u), nl(u, u.return);
          break;
        case 27:
          (l & 2) !== 0 && Yv(u);
        case 5:
          u.tag !== 5 && u.tag !== 27 || Hv(u), Fe(
            a,
            u,
            l
          ), s && n === null && c & 4 && vr(u), nl(u, u.return);
          break;
        case 6:
          Hv(u);
          break;
        case 26:
          m = u.stateNode, u.memoizedState !== null || m === null || It || ff(
            Mu(m.ownerDocument),
            u.type,
            m
          ), Fe(
            a,
            u,
            l
          ), s && n === null && c & 4 && vr(u), nl(u, u.return);
          break;
        case 12:
          Fe(
            a,
            u,
            l
          );
          break;
        case 31:
          Fe(
            a,
            u,
            l
          ), s && c & 4 && Wv(a, u);
          break;
        case 13:
          Fe(
            a,
            u,
            l
          ), s && c & 4 && kv(a, u);
          break;
        case 22:
          u.memoizedState === null && Fe(
            a,
            u,
            l
          ), nl(u, u.return);
          break;
        case 30:
          Fe(
            a,
            u,
            l
          ), nl(u, u.return);
          break;
        case 7:
          nl(u, u.return);
        default:
          Fe(
            a,
            u,
            l
          );
      }
      e = e.sibling;
    }
  }
  function Nr(t, e) {
    var l = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== l && (t != null && t.refCount++, l != null && ou(l));
  }
  function Cr(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && ou(t));
  }
  function Ge(t, e, l, n) {
    var a = (l & 335544064) === l;
    if (e.subtreeFlags & (a ? 10262 : 10256))
      for (e = e.child; e !== null; )
        em(
          t,
          e,
          l,
          n
        ), e = e.sibling;
    else a && Xv(e);
  }
  function em(t, e, l, n) {
    var a = (l & 335544064) === l;
    a && e.alternate === null && e.return !== null && e.return.alternate !== null && $i(e);
    var u = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Ge(
          t,
          e,
          l,
          n
        ), u & 2048 && Eu(9, e);
        break;
      case 1:
        Ge(
          t,
          e,
          l,
          n
        );
        break;
      case 3:
        Ge(
          t,
          e,
          l,
          n
        ), a && xr && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), u & 2048 && (u = null, e.alternate !== null && (u = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== u && (e.refCount++, u != null && ou(u)));
        break;
      case 12:
        if (u & 2048) {
          Ge(
            t,
            e,
            l,
            n
          ), u = e.stateNode;
          try {
            var c = e.memoizedProps, s = c.id, m = c.onPostCommit;
            typeof m == "function" && m(
              s,
              e.alternate === null ? "mount" : "update",
              u.passiveEffectDuration,
              -0
            );
          } catch (T) {
            Nt(e, e.return, T);
          }
        } else
          Ge(
            t,
            e,
            l,
            n
          );
        break;
      case 31:
        Ge(
          t,
          e,
          l,
          n
        );
        break;
      case 13:
        Ge(
          t,
          e,
          l,
          n
        );
        break;
      case 23:
        break;
      case 22:
        c = e.stateNode, s = e.alternate, e.memoizedState !== null ? (a && s !== null && s.memoizedState === null && $i(s), c._visibility & 2 ? Ge(
          t,
          e,
          l,
          n
        ) : Ou(
          t,
          e
        )) : (a && s !== null && s.memoizedState !== null && $i(e), c._visibility & 2 ? Ge(
          t,
          e,
          l,
          n
        ) : (c._visibility |= 2, ha(
          t,
          e,
          l,
          n,
          (e.subtreeFlags & 10256) !== 0 || !1
        ))), u & 2048 && Nr(s, e);
        break;
      case 24:
        Ge(
          t,
          e,
          l,
          n
        ), u & 2048 && Cr(e.alternate, e);
        break;
      case 30:
        a && (u = e.alternate, u !== null && (ul(u.child, !0), ul(e.child, !0))), Ge(
          t,
          e,
          l,
          n
        );
        break;
      default:
        Ge(
          t,
          e,
          l,
          n
        );
    }
  }
  function ha(t, e, l, n, a) {
    for (a = a && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var u = t, c = e, s = l, m = n, T = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          ha(
            u,
            c,
            s,
            m,
            a
          ), Eu(8, c);
          break;
        case 23:
          break;
        case 22:
          var C = c.stateNode;
          c.memoizedState !== null ? C._visibility & 2 ? ha(
            u,
            c,
            s,
            m,
            a
          ) : Ou(
            u,
            c
          ) : (C._visibility |= 2, ha(
            u,
            c,
            s,
            m,
            a
          )), a && T & 2048 && Nr(
            c.alternate,
            c
          );
          break;
        case 24:
          ha(
            u,
            c,
            s,
            m,
            a
          ), a && T & 2048 && Cr(c.alternate, c);
          break;
        default:
          ha(
            u,
            c,
            s,
            m,
            a
          );
      }
      e = e.sibling;
    }
  }
  function Ou(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t, n = e, a = n.flags;
        switch (n.tag) {
          case 22:
            Ou(l, n), a & 2048 && Nr(
              n.alternate,
              n
            );
            break;
          case 24:
            Ou(l, n), a & 2048 && Cr(n.alternate, n);
            break;
          default:
            Ou(l, n);
        }
        e = e.sibling;
      }
  }
  var wn = 8192;
  function Hn(t, e, l) {
    if (t.subtreeFlags & wn)
      for (t = t.child; t !== null; )
        lm(
          t,
          e,
          l
        ), t = t.sibling;
  }
  function lm(t, e, l) {
    switch (t.tag) {
      case 26:
        Hn(
          t,
          e,
          l
        ), t.flags & wn && (t.memoizedState !== null ? Xb(
          l,
          Je,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (e & 335544128) === e && rh(l, t)));
        break;
      case 5:
        Hn(
          t,
          e,
          l
        ), t.flags & wn && (t = t.stateNode, (e & 335544128) === e && rh(l, t));
        break;
      case 3:
      case 4:
        var n = Je;
        Je = Mu(t.stateNode.containerInfo), Hn(
          t,
          e,
          l
        ), Je = n;
        break;
      case 22:
        t.memoizedState === null && (n = t.alternate, n !== null && n.memoizedState !== null ? (n = wn, wn = 16777216, Hn(
          t,
          e,
          l
        ), wn = n) : Hn(
          t,
          e,
          l
        ));
        break;
      case 30:
        if ((t.flags & wn) !== 0 && (n = t.memoizedProps.name, n != null && n !== "auto")) {
          var a = t.stateNode;
          a.paired = null, Ae === null && (Ae = /* @__PURE__ */ new Map()), Ae.set(n, a);
        }
        Hn(
          t,
          e,
          l
        );
        break;
      default:
        Hn(
          t,
          e,
          l
        );
    }
  }
  function nm(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function _u(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var n = e[l];
          Pt = n, um(
            n,
            t
          );
        }
      nm(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        am(t), t = t.sibling;
  }
  function am(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        _u(t), t.flags & 2048 && kl(9, t, t.return);
        break;
      case 3:
        _u(t);
        break;
      case 12:
        _u(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, Pi(t)) : _u(t);
        break;
      default:
        _u(t);
    }
  }
  function Pi(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var n = e[l];
          Pt = n, um(
            n,
            t
          );
        }
      nm(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          kl(8, e, e.return), Pi(e);
          break;
        case 22:
          l = e.stateNode, l._visibility & 2 && (l._visibility &= -3, Pi(e));
          break;
        default:
          Pi(e);
      }
      t = t.sibling;
    }
  }
  function um(t, e) {
    for (; Pt !== null; ) {
      var l = Pt;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          kl(8, l, e);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var n = l.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          ou(l.memoizedState.cache);
      }
      if (n = l.child, n !== null) n.return = l, Pt = n;
      else
        t: for (l = t; Pt !== null; ) {
          n = Pt;
          var a = n.sibling, u = n.return;
          if (Fv(n), n === l) {
            Pt = null;
            break t;
          }
          if (a !== null) {
            a.return = u, Pt = a;
            break t;
          }
          Pt = u;
        }
    }
  }
  var Y0 = {
    getCacheForType: function(t) {
      var e = ne(Qt), l = e.data.get(t);
      return l === void 0 && (l = t(), e.data.set(t, l)), l;
    },
    cacheSignal: function() {
      return ne(Qt).controller.signal;
    }
  }, q0 = typeof WeakMap == "function" ? WeakMap : Map, Tt = 0, At = null, ft = null, vt = 0, _t = 0, De = null, Pl = !1, ya = !1, zr = !1, zl = 0, qt = 0, tn = 0, Bn = 0, tc = 0, Re = 0, ga = 0, Nu = null, Ee = null, Ar = !1, ec = 0, im = 0, lc = 1 / 0, nc = null, en = null, Bt = 0, $e = null, Yn = null, rl = 0, Dr = 0, Rr = null, cm = null, ba = null, pa = null, Sa = null, Cu = 0, ac = null;
  function Me() {
    return (Tt & 2) !== 0 && vt !== 0 ? vt & -vt : K.T !== null ? Lr() : fs();
  }
  function om() {
    if (Re === 0)
      if ((vt & 536870912) === 0 || rt) {
        var t = Iu;
        Iu <<= 1, (Iu & 3932160) === 0 && (Iu = 262144), Re = t;
      } else Re = 536870912;
    return t = ae.current, t !== null && (t.flags |= 32), Re;
  }
  function Ea(t, e) {
    if (e != null) {
      var l = t.stateNode, n = l.ref;
      n === null && (n = l.ref = Vm(
        bl(t.memoizedProps, l)
      )), pa === null && (pa = []), pa.push(e.bind(null, n));
    }
  }
  function Te(t, e, l) {
    (t === At && (_t === 2 || _t === 9) || t.cancelPendingCommit !== null) && (Ta(t, 0), ln(
      t,
      vt,
      Re,
      !1
    )), Fa(t, l), ((Tt & 2) === 0 || t !== At) && (t === At && ((Tt & 2) === 0 && (Bn |= l), qt === 4 && ln(
      t,
      vt,
      Re,
      !1
    )), fl(t));
  }
  function rm(t, e, l) {
    if ((Tt & 6) !== 0) throw Error(r(327));
    var n = !l && (e & 127) === 0 && (e & t.expiredLanes) === 0 || Ja(t, e), a = n ? V0(t, e) : jr(t, e, !0), u = n;
    do {
      if (a === 0) {
        ya && !n && ln(t, e, 0, !1);
        break;
      } else {
        if (l = t.current.alternate, u && !G0(l)) {
          a = jr(t, e, !1), u = !1;
          continue;
        }
        if (a === 2) {
          if (u = e, t.errorRecoveryDisabledLanes & u)
            var c = 0;
          else
            c = t.pendingLanes & -536870913, c = c !== 0 ? c : c & 536870912 ? 536870912 : 0;
          if (c !== 0) {
            e = c;
            t: {
              var s = t;
              a = Nu;
              var m = s.current.memoizedState.isDehydrated;
              if (m && (Ta(s, c).flags |= 256), c = jr(
                s,
                c,
                !1
              ), c !== 2 && c !== 6) {
                if (zr && !m) {
                  s.errorRecoveryDisabledLanes |= u, Bn |= u, a = 4;
                  break t;
                }
                u = Ee, Ee = a, u !== null && (Ee === null ? Ee = u : Ee.push.apply(
                  Ee,
                  u
                ));
              }
              a = c;
            }
            if (u = !1, a !== 2) continue;
          }
        }
        if (a === 1) {
          Ta(t, 0), ln(t, e, 0, !0);
          break;
        }
        t: {
          switch (n = t, u = a, u) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((e & 4194048) !== e && (e & 62914560) !== e)
                break;
            case 6:
              ln(
                n,
                e,
                Re,
                !Pl
              );
              break t;
            case 2:
              Ee = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((e & 62914560) === e && (a = ec + 300 - xe(), 10 < a)) {
            if (ln(
              n,
              e,
              Re,
              !Pl
            ), ti(n, 0, !0) !== 0) break t;
            rl = e, n.timeoutHandle = Ir(
              fm.bind(
                null,
                n,
                l,
                Ee,
                nc,
                Ar,
                e,
                Re,
                Bn,
                ga,
                Pl,
                u,
                "Throttled",
                -0,
                0
              ),
              a
            );
            break t;
          }
          fm(
            n,
            l,
            Ee,
            nc,
            Ar,
            e,
            Re,
            Bn,
            ga,
            Pl,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    fl(t);
  }
  function fm(t, e, l, n, a, u, c, s, m, T, C, M, S, N) {
    t.timeoutHandle = -1;
    var Y = e.subtreeFlags, Q = (u & 335544064) === u;
    if (M = null, (Q || Y & 8192 || (Y & 16785408) === 16785408) && (M = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: tl
    }, Ae = null, lm(
      e,
      u,
      M
    ), Q && (Y = M, Q = t.containerInfo, Q = (Q.nodeType === 9 ? Q : Q.ownerDocument).__reactViewTransition, Q != null && (Y.count++, Y.waitingForViewTransition = !0, Y = wu.bind(Y), Q.finished.then(Y, Y))), Y = (u & 62914560) === u ? ec - xe() : (u & 4194048) === u ? im - xe() : 0, Y = Qb(
      M,
      Y
    ), Y !== null)) {
      rl = u, t.cancelPendingCommit = Y(
        bm.bind(
          null,
          t,
          e,
          u,
          l,
          n,
          a,
          c,
          s,
          m,
          T,
          C,
          M,
          null,
          S,
          N
        )
      ), ln(t, u, c, !T);
      return;
    }
    bm(
      t,
      e,
      u,
      l,
      n,
      a,
      c,
      s,
      m,
      T,
      C,
      M
    );
  }
  function G0(t) {
    for (var e = t; ; ) {
      var l = e.tag;
      if ((l === 0 || l === 11 || l === 15) && e.flags & 16384 && (l = e.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var n = 0; n < l.length; n++) {
          var a = l[n], u = a.getSnapshot;
          a = a.value;
          try {
            if (!Ce(u(), a)) return !1;
          } catch {
            return !1;
          }
        }
      if (l = e.child, e.subtreeFlags & 16384 && l !== null)
        l.return = e, e = l;
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    }
    return !0;
  }
  function ln(t, e, l, n) {
    e = us(t, e), e &= ~tc, e &= ~Bn, t.suspendedLanes |= e, t.pingedLanes &= ~e, n && (t.warmLanes |= e), n = t.expirationTimes;
    for (var a = e; 0 < a; ) {
      var u = 31 - _e(a), c = 1 << u;
      n[u] = -1, a &= ~c;
    }
    l !== 0 && cs(t, l, e);
  }
  function uc() {
    return (Tt & 6) === 0 ? (zu(0), !1) : !0;
  }
  function Mr() {
    if (ft !== null) {
      if (_t === 0)
        var t = ft.return;
      else
        t = ft, Tl = _n = null, Go(t), oa = null, su = 0, t = ft;
      for (; t !== null; )
        jv(t.alternate, t), t = t.return;
      ft = null;
    }
  }
  function Ta(t, e) {
    var l = t.timeoutHandle;
    return l !== -1 && (t.timeoutHandle = -1, fb(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), rl = 0, Mr(), At = t, ft = l = Sl(t.current, null), vt = e, _t = 0, De = null, Pl = !1, ya = Ja(t, e), zr = !1, ga = Re = tc = Bn = tn = qt = 0, Ee = Nu = null, Ar = !1, zl = us(t, e), vi(), l;
  }
  function sm(t, e) {
    ut = null, K.H = Yi, e === ca || e === Oi ? (e = bd(), _t = 3) : e === Co ? (e = bd(), _t = 4) : _t = e === er ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, De = e, ft === null && (qt = 1, qi(
      t,
      He(e, t.current)
    ));
  }
  function dm() {
    var t = ae.current;
    return t === null ? !0 : (vt & 4194048) === vt ? re === null : (vt & 62914560) === vt || (vt & 536870912) !== 0 ? t === re : !1;
  }
  function vm() {
    var t = K.H;
    return K.H = Yi, t === null ? Yi : t;
  }
  function mm() {
    var t = K.A;
    return K.A = Y0, t;
  }
  function ic() {
    qt = 4, Pl || (vt & 4194048) !== vt && ae.current !== null || (ya = !0), (tn & 134217727) === 0 && (Bn & 134217727) === 0 || At === null || ln(
      At,
      vt,
      Re,
      !1
    );
  }
  function jr(t, e, l) {
    var n = Tt;
    Tt |= 2;
    var a = vm(), u = mm();
    (At !== t || vt !== e) && (nc = null, Ta(t, e)), e = !1;
    var c = qt;
    t: do
      try {
        if (_t !== 0 && ft !== null) {
          var s = ft, m = De;
          switch (_t) {
            case 8:
              Mr(), c = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              ae.current === null && (e = !0);
              var T = _t;
              if (_t = 0, De = null, xa(t, s, m, T), l && ya) {
                c = 0;
                break t;
              }
              break;
            default:
              T = _t, _t = 0, De = null, xa(t, s, m, T);
          }
        }
        L0(), c = qt;
        break;
      } catch (C) {
        sm(t, C);
      }
    while (!0);
    return e && t.shellSuspendCounter++, Tl = _n = null, Tt = n, K.H = a, K.A = u, ft === null && (At = null, vt = 0, vi()), c;
  }
  function L0() {
    for (; ft !== null; ) hm(ft);
  }
  function V0(t, e) {
    var l = Tt;
    Tt |= 2;
    var n = vm(), a = mm();
    At !== t || vt !== e ? (nc = null, lc = xe() + 500, Ta(t, e)) : ya = Ja(
      t,
      e
    );
    t: do
      try {
        if (_t !== 0 && ft !== null) {
          e = ft;
          var u = De;
          e: switch (_t) {
            case 1:
              _t = 0, De = null, xa(t, e, u, 1);
              break;
            case 2:
            case 9:
              if (yd(u)) {
                _t = 0, De = null, ym(e);
                break;
              }
              e = function() {
                _t !== 2 && _t !== 9 || At !== t || (_t = 7), fl(t);
              }, u.then(e, e);
              break t;
            case 3:
              _t = 7;
              break t;
            case 4:
              _t = 5;
              break t;
            case 7:
              yd(u) ? (_t = 0, De = null, ym(e)) : (_t = 0, De = null, xa(t, e, u, 7));
              break;
            case 5:
              var c = null;
              switch (ft.tag) {
                case 26:
                  c = ft.memoizedState;
                case 5:
                case 27:
                  var s = ft;
                  if (c ? ch(c) : s.stateNode.complete) {
                    _t = 0, De = null;
                    var m = s.sibling;
                    if (m !== null) ft = m;
                    else {
                      var T = s.return;
                      T !== null ? (ft = T, cc(T)) : ft = null;
                    }
                    break e;
                  }
              }
              _t = 0, De = null, xa(t, e, u, 5);
              break;
            case 6:
              _t = 0, De = null, xa(t, e, u, 6);
              break;
            case 8:
              Mr(), qt = 6;
              break t;
            default:
              throw Error(r(462));
          }
        }
        X0();
        break;
      } catch (C) {
        sm(t, C);
      }
    while (!0);
    return Tl = _n = null, K.H = n, K.A = a, Tt = l, ft !== null ? 0 : (At = null, vt = 0, vi(), qt);
  }
  function X0() {
    for (; ft !== null && !ig(); )
      hm(ft);
  }
  function hm(t) {
    var e = Rv(t.alternate, t, zl);
    t.memoizedProps = t.pendingProps, e === null ? cc(t) : ft = e;
  }
  function ym(t) {
    var e = t, l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Ov(
          l,
          e,
          e.pendingProps,
          e.type,
          void 0,
          vt
        );
        break;
      case 11:
        e = Ov(
          l,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          vt
        );
        break;
      case 5:
        Go(e);
        var n = e;
        n === kt && (rt ? (pi(n), n.tag === 5 && n.stateNode != null && (Rt = n.stateNode)) : (pi(n), rt = !0));
      default:
        jv(l, e), e = ft = ud(e, zl), e = Rv(l, e, zl);
    }
    t.memoizedProps = t.pendingProps, e === null ? cc(t) : ft = e;
  }
  function xa(t, e, l, n) {
    Tl = _n = null, Go(e), oa = null, su = 0;
    var a = e.return;
    try {
      if (D0(
        t,
        a,
        e,
        l,
        vt
      )) {
        qt = 1, qi(
          t,
          He(l, t.current)
        ), ft = null;
        return;
      }
    } catch (u) {
      if (a !== null) throw ft = a, u;
      qt = 1, qi(
        t,
        He(l, t.current)
      ), ft = null;
      return;
    }
    e.flags & 32768 ? (rt || n === 1 ? t = !0 : ya || (vt & 536870912) !== 0 ? t = !1 : (Pl = t = !0, (n === 2 || n === 9 || n === 3 || n === 6) && (n = ae.current, n !== null && n.tag === 13 && (n.flags |= 16384))), gm(e, t)) : cc(e);
  }
  function cc(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        gm(
          e,
          Pl
        );
        return;
      }
      t = e.return;
      var l = U0(
        e.alternate,
        e,
        zl
      );
      if (l !== null) {
        ft = l;
        return;
      }
      if (e = e.sibling, e !== null) {
        ft = e;
        return;
      }
      ft = e = t;
    } while (e !== null);
    qt === 0 && (qt = 5);
  }
  function gm(t, e) {
    do {
      var l = w0(t.alternate, t);
      if (l !== null) {
        l.flags &= 32767, ft = l;
        return;
      }
      if (l = t.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !e && (t = t.sibling, t !== null)) {
        ft = t;
        return;
      }
      ft = t = l;
    } while (t !== null);
    qt = 6, ft = null;
  }
  function bm(t, e, l, n, a, u, c, s, m, T, C, M) {
    t.cancelPendingCommit = null;
    do
      oc();
    while (Bt !== 0);
    if ((Tt & 6) !== 0) throw Error(r(327));
    if (e !== null) {
      if (e === t.current) throw Error(r(177));
      t === At && (ft = At = null, vt = 0), Yn = e, $e = t, rl = l, Rr = a, cm = n, Q0(
        t,
        e,
        l,
        c,
        s,
        m,
        M
      );
    }
  }
  function Q0(t, e, l, n, a, u, c) {
    var s = e.lanes | e.childLanes;
    if (Dr = s, s |= mo, yg(
      t,
      l,
      s,
      n,
      a,
      u
    ), pa = null, (l & 335544064) === l ? (Sa = b0(t), n = 10262) : (Sa = null, n = 10256), (e.subtreeFlags & n) !== 0 || (e.flags & n) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, W0(Wu, function() {
      return Br(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), Ji = !1, n = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || n) {
      n = K.T, K.T = null, a = nt.p, nt.p = 2, u = Tt, Tt |= 4;
      try {
        H0(t, e, l);
      } finally {
        Tt = u, nt.p = a, K.T = n;
      }
    }
    Bt = 1, Ji ? ba = yb(
      c,
      t.containerInfo,
      Sa,
      Ur,
      wr,
      K0,
      Hr,
      Br,
      Z0
    ) : (Ur(), wr(), Hr());
  }
  function Z0(t) {
    if (Bt !== 0) {
      var e = $e.onRecoverableError;
      e(t, { componentStack: null });
    }
  }
  function K0() {
    Bt === 3 && (Bt = 0, tm(Yn, $e), Bt = 4);
  }
  function Ur() {
    if (Bt === 1) {
      Bt = 0;
      var t = $e, e = Yn, l = rl, n = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || n) {
        n = K.T, K.T = null;
        var a = nt.p;
        nt.p = 2;
        var u = Tt;
        Tt |= 4;
        try {
          xu = Wi = !1, Iv(e, t, l), l = $r;
          var c = $s(t.containerInfo), s = l.focusedElem, m = l.selectionRange;
          if (c !== s && s && s.ownerDocument && Fs(
            s.ownerDocument.documentElement,
            s
          )) {
            if (m !== null && oo(s)) {
              var T = m.start, C = m.end;
              if (C === void 0 && (C = T), "selectionStart" in s)
                s.selectionStart = T, s.selectionEnd = Math.min(
                  C,
                  s.value.length
                );
              else {
                var M = s.ownerDocument || document, S = M && M.defaultView || window;
                if (S.getSelection) {
                  var N = S.getSelection(), Y = s.textContent.length, Q = Math.min(m.start, Y), it = m.end === void 0 ? Q : Math.min(m.end, Y);
                  !N.extend && Q > it && (c = it, it = Q, Q = c);
                  var E = Js(
                    s,
                    Q
                  ), g = Js(
                    s,
                    it
                  );
                  if (E && g && (N.rangeCount !== 1 || N.anchorNode !== E.node || N.anchorOffset !== E.offset || N.focusNode !== g.node || N.focusOffset !== g.offset)) {
                    var O = M.createRange();
                    O.setStart(E.node, E.offset), N.removeAllRanges(), Q > it ? (N.addRange(O), N.extend(g.node, g.offset)) : (O.setEnd(g.node, g.offset), N.addRange(O));
                  }
                }
              }
            }
            for (M = [], N = s; N = N.parentNode; )
              N.nodeType === 1 && M.push({
                element: N,
                left: N.scrollLeft,
                top: N.scrollTop
              });
            for (typeof s.focus == "function" && s.focus(), s = 0; s < M.length; s++) {
              var R = M[s];
              R.element.scrollLeft = R.left, R.element.scrollTop = R.top;
            }
          }
          Ra = !!Fr, $r = Fr = null;
        } finally {
          Tt = u, nt.p = a, K.T = n;
        }
      }
      t.current = e, Bt = 2;
    }
  }
  function wr() {
    if (Bt === 2) {
      Bt = 0;
      var t = $e, e = Yn, l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        l = K.T, K.T = null;
        var n = nt.p;
        nt.p = 2;
        var a = Tt;
        Tt |= 4;
        try {
          Kv(t, e.alternate, e);
        } finally {
          Tt = a, nt.p = n, K.T = l;
        }
      }
      Bt = 3;
    }
  }
  function Hr() {
    if (Bt === 4 || Bt === 3) {
      Bt = 0;
      var t = ba;
      ba = null, cg();
      var e = $e, l = Yn, n = rl, a = cm, u = (n & 335544064) === n ? 10262 : 10256;
      if ((l.subtreeFlags & u) !== 0 || (l.flags & u) !== 0 ? Bt = 5 : (Bt = 0, Yn = $e = null, pm(e, e.pendingLanes)), u = e.pendingLanes, u === 0 && (en = null), Qc(n), l = l.stateNode, Oe && typeof Oe.onCommitFiberRoot == "function")
        try {
          Oe.onCommitFiberRoot(
            Ka,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        l = K.T, u = nt.p, nt.p = 2, K.T = null;
        try {
          for (var c = e.onRecoverableError, s = 0; s < a.length; s++) {
            var m = a[s];
            c(m.value, {
              componentStack: m.stack
            });
          }
        } finally {
          K.T = l, nt.p = u;
        }
      }
      if (a = pa, c = Sa, Sa = null, a !== null && (pa = null, c === null && (c = []), t !== null))
        for (m = 0; m < a.length; m++)
          l = (0, a[m])(
            c
          ), l !== void 0 && t.finished.finally(l);
      (rl & 3) !== 0 && oc(), fl(e), u = e.pendingLanes, (n & 261930) !== 0 && (u & 42) !== 0 ? e === ac ? Cu++ : (Cu = 0, ac = e) : (Cu = 0, ac = null), zu(0);
    }
  }
  function pm(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, ou(e)));
  }
  function oc() {
    return ba !== null && (ba.skipTransition(), ba = null), Ur(), wr(), Hr(), Br();
  }
  function Br() {
    if (Bt !== 5) return !1;
    var t = $e, e = Dr;
    Dr = 0;
    var l = Qc(rl), n = K.T, a = nt.p;
    try {
      nt.p = 32 > l ? 32 : l, K.T = null, l = Rr, Rr = null;
      var u = $e, c = rl;
      if (Bt = 0, Yn = $e = null, rl = 0, (Tt & 6) !== 0) throw Error(r(331));
      var s = Tt;
      if (Tt |= 4, am(u.current), em(
        u,
        u.current,
        c,
        l
      ), Tt = s, zu(0, !1), Oe && typeof Oe.onPostCommitFiberRoot == "function")
        try {
          Oe.onPostCommitFiberRoot(Ka, u);
        } catch {
        }
      return !0;
    } finally {
      nt.p = a, K.T = n, pm(t, e);
    }
  }
  function Sm(t, e, l) {
    e = He(l, e), e = tr(t.stateNode, e, 2), t = Jl(t, e, 2), t !== null && (Fa(t, 2), fl(t));
  }
  function Nt(t, e, l) {
    if (t.tag === 3)
      Sm(t, t, l);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          Sm(
            e,
            t,
            l
          );
          break;
        } else if (e.tag === 1) {
          var n = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (en === null || !en.has(n))) {
            t = He(l, t), l = yv(2), n = Jl(e, l, 2), n !== null && (gv(
              l,
              n,
              e,
              t
            ), Fa(n, 2), fl(n));
            break;
          }
        }
        e = e.return;
      }
  }
  function Yr(t, e, l) {
    var n = t.pingCache;
    if (n === null) {
      n = t.pingCache = new q0();
      var a = /* @__PURE__ */ new Set();
      n.set(e, a);
    } else
      a = n.get(e), a === void 0 && (a = /* @__PURE__ */ new Set(), n.set(e, a));
    a.has(l) || (zr = !0, a.add(l), t = J0.bind(null, t, e, l), e.then(t, t));
  }
  function J0(t, e, l) {
    var n = t.pingCache;
    n !== null && n.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, At === t && (vt & l) === l && ((qt === 4 || qt === 3 && (vt & 62914560) === vt && 300 > xe() - ec) && (Tt & 2) === 0 ? Ta(t, 0) : tc |= l, ga === vt && (ga = 0)), fl(t);
  }
  function Em(t, e) {
    e === 0 && (e = is()), t = Tn(t, e), t !== null && (Fa(t, e), fl(t));
  }
  function F0(t) {
    var e = t.memoizedState, l = 0;
    e !== null && (l = e.retryLane), Em(t, l);
  }
  function $0(t, e) {
    var l = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var n = t.stateNode, a = t.memoizedState;
        a !== null && (l = a.retryLane);
        break;
      case 19:
        n = t.stateNode;
        break;
      case 22:
        n = t.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    n !== null && n.delete(e), Em(t, l);
  }
  function W0(t, e) {
    return Gc(t, e);
  }
  var Oa = null, _a = null, qr = !1, rc = !1, Gr = !1, nn = 0;
  function fl(t) {
    t !== _a && t.next === null && (_a === null ? Oa = _a = t : _a = _a.next = t), rc = !0, qr || (qr = !0, I0());
  }
  function zu(t, e) {
    if (!Gr && rc) {
      Gr = !0;
      do
        for (var l = !1, n = Oa; n !== null; ) {
          if (t !== 0) {
            var a = n.pendingLanes;
            if (a === 0) var u = 0;
            else {
              var c = n.suspendedLanes, s = n.pingedLanes;
              u = (1 << 31 - _e(42 | t) + 1) - 1, u &= a & ~(c & ~s), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, _m(n, u));
          } else
            u = vt, u = ti(
              n,
              n === At ? u : 0,
              n.cancelPendingCommit !== null || n.timeoutHandle !== -1
            ), (u & 3) === 0 || Ja(n, u) || (l = !0, _m(n, u));
          n = n.next;
        }
      while (l);
      Gr = !1;
    }
  }
  function k0() {
    Tm();
  }
  function Tm() {
    rc = qr = !1;
    var t = 0;
    nn !== 0 && rb() && (t = nn);
    for (var e = xe(), l = null, n = Oa; n !== null; ) {
      var a = n.next, u = xm(n, e);
      u === 0 ? (n.next = null, l === null ? Oa = a : l.next = a, a === null && (_a = l)) : (l = n, (t !== 0 || (u & 3) !== 0) && (rc = !0)), n = a;
    }
    Bt !== 0 && Bt !== 5 || zu(t), nn !== 0 && (nn = 0);
  }
  function xm(t, e) {
    for (var l = t.suspendedLanes, n = t.pingedLanes, a = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var c = 31 - _e(u), s = 1 << c, m = a[c];
      m === -1 ? ((s & l) === 0 || (s & n) !== 0) && (a[c] = hg(s, e)) : m <= e && (t.expiredLanes |= s), u &= ~s;
    }
    if (e = At, l = vt, l = ti(
      t,
      t === e ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n = t.callbackNode, l === 0 || t === e && (_t === 2 || _t === 9) || t.cancelPendingCommit !== null)
      return n !== null && n !== null && Lc(n), t.callbackNode = null, t.callbackPriority = 0;
    if ((l & 3) === 0 || Ja(t, l)) {
      if (e = l & -l, e === t.callbackPriority) return e;
      switch (n !== null && Lc(n), Qc(l)) {
        case 2:
        case 8:
          l = ns;
          break;
        case 32:
          l = Wu;
          break;
        case 268435456:
          l = as;
          break;
        default:
          l = Wu;
      }
      return n = Om.bind(null, t), l = Gc(l, n), t.callbackPriority = e, t.callbackNode = l, e;
    }
    return n !== null && n !== null && Lc(n), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Om(t, e) {
    if (Bt !== 0 && Bt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var l = t.callbackNode;
    if (oc() && t.callbackNode !== l)
      return null;
    var n = vt;
    return n = ti(
      t,
      t === At ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n === 0 ? null : (rm(t, n, e), xm(t, xe()), t.callbackNode != null && t.callbackNode === l ? Om.bind(null, t) : null);
  }
  function _m(t, e) {
    if (oc()) return null;
    rm(t, e, !0);
  }
  function I0() {
    sb(function() {
      (Tt & 6) !== 0 ? Gc(
        ls,
        k0
      ) : Tm();
    });
  }
  function Lr() {
    if (nn === 0) {
      var t = zn;
      t === 0 && (t = ku, ku <<= 1, (ku & 261888) === 0 && (ku = 256)), nn = t;
    }
    return nn;
  }
  function Nm(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : ui(t);
  }
  function P0(t, e, l, n, a) {
    if (e === "submit" && l && l.stateNode === a) {
      var u = Nm(
        (a[ge] || null).action
      ), c = n.submitter;
      c && (e = (e = c[ge] || null) ? Nm(e.formAction) : c.getAttribute("formAction"), e !== null && (u = e, c = null));
      var s = new ri(
        "action",
        "action",
        null,
        n,
        a
      );
      t.push({
        event: s,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (n.defaultPrevented) {
                if (nn !== 0) {
                  var m = new FormData(a, c);
                  $o(
                    l,
                    {
                      pending: !0,
                      data: m,
                      method: a.method,
                      action: u
                    },
                    null,
                    m
                  );
                }
              } else
                typeof u == "function" && (s.preventDefault(), m = new FormData(a, c), $o(
                  l,
                  {
                    pending: !0,
                    data: m,
                    method: a.method,
                    action: u
                  },
                  u,
                  m
                ));
            },
            currentTarget: a
          }
        ]
      });
    }
  }
  for (var Vr = 0; Vr < vo.length; Vr++) {
    var Xr = vo[Vr], tb = Xr.toLowerCase(), eb = Xr[0].toUpperCase() + Xr.slice(1);
    Ze(
      tb,
      "on" + eb
    );
  }
  Ze(Is, "onAnimationEnd"), Ze(Ps, "onAnimationIteration"), Ze(td, "onAnimationStart"), Ze("dblclick", "onDoubleClick"), Ze("focusin", "onFocus"), Ze("focusout", "onBlur"), Ze(f0, "onTransitionRun"), Ze(s0, "onTransitionStart"), Ze(d0, "onTransitionCancel"), Ze(ed, "onTransitionEnd"), Jn("onMouseEnter", ["mouseout", "mouseover"]), Jn("onMouseLeave", ["mouseout", "mouseover"]), Jn("onPointerEnter", ["pointerout", "pointerover"]), Jn("onPointerLeave", ["pointerout", "pointerover"]), pn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), pn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), pn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), pn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), pn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), pn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Au = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), lb = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Au)
  );
  function Cm(t, e) {
    e = (e & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var n = t[l], a = n.event;
      n = n.listeners;
      t: {
        var u = void 0;
        if (e)
          for (var c = n.length - 1; 0 <= c; c--) {
            var s = n[c], m = s.instance, T = s.currentTarget;
            if (s = s.listener, m !== u && a.isPropagationStopped())
              break t;
            u = s, a.currentTarget = T;
            try {
              u(a);
            } catch (C) {
              di(C);
            }
            a.currentTarget = null, u = m;
          }
        else
          for (c = 0; c < n.length; c++) {
            if (s = n[c], m = s.instance, T = s.currentTarget, s = s.listener, m !== u && a.isPropagationStopped())
              break t;
            u = s, a.currentTarget = T;
            try {
              u(a);
            } catch (C) {
              di(C);
            }
            a.currentTarget = null, u = m;
          }
      }
    }
  }
  function st(t, e) {
    var l = e[ds];
    l === void 0 && (l = e[ds] = /* @__PURE__ */ new Set());
    var n = t + "__bubble";
    l.has(n) || (zm(e, t, 2, !1), l.add(n));
  }
  function Qr(t, e, l) {
    var n = 0;
    e && (n |= 4), zm(
      l,
      t,
      n,
      e
    );
  }
  var fc = "_reactListening" + Math.random().toString(36).slice(2);
  function Zr(t) {
    if (!t[fc]) {
      t[fc] = !0, hs.forEach(function(l) {
        l !== "selectionchange" && (lb.has(l) || Qr(l, !1, t), Qr(l, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[fc] || (e[fc] = !0, Qr("selectionchange", !1, e));
    }
  }
  function zm(t, e, l, n) {
    switch (gh(e)) {
      case 2:
        var a = Fb;
        break;
      case 8:
        a = $b;
        break;
      default:
        a = df;
    }
    l = a.bind(
      null,
      e,
      l,
      t
    ), a = void 0, !Ic || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (a = !0), n ? a !== void 0 ? t.addEventListener(e, l, {
      capture: !0,
      passive: a
    }) : t.addEventListener(e, l, !0) : a !== void 0 ? t.addEventListener(e, l, {
      passive: a
    }) : t.addEventListener(e, l, !1);
  }
  function Kr(t, e, l, n, a) {
    var u = n;
    if ((e & 1) === 0 && (e & 2) === 0 && n !== null)
      t: for (; ; ) {
        if (n === null) return;
        var c = n.tag;
        if (c === 3 || c === 4) {
          var s = n.stateNode.containerInfo;
          if (s === a) break;
          if (c === 4)
            for (c = n.return; c !== null; ) {
              var m = c.tag;
              if ((m === 3 || m === 4) && c.stateNode.containerInfo === a)
                return;
              c = c.return;
            }
          for (; s !== null; ) {
            if (c = bn(s), c === null) return;
            if (m = c.tag, m === 5 || m === 6 || m === 26 || m === 27) {
              n = u = c;
              continue t;
            }
            s = s.parentNode;
          }
        }
        n = n.return;
      }
    zs(function() {
      var T = u, C = Wc(l), M = [];
      t: {
        var S = ld.get(t);
        if (S !== void 0) {
          var N = ri, Y = t;
          switch (t) {
            case "keypress":
              if (ci(l) === 0) break t;
            case "keydown":
            case "keyup":
              N = Gg;
              break;
            case "focusin":
              Y = "focus", N = lo;
              break;
            case "focusout":
              Y = "blur", N = lo;
              break;
            case "beforeblur":
            case "afterblur":
              N = lo;
              break;
            case "click":
              if (l.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              N = Rs;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              N = zg;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              N = Zg;
              break;
            case Is:
            case Ps:
            case td:
              N = Rg;
              break;
            case ed:
              N = Jg;
              break;
            case "scroll":
            case "scrollend":
              N = Ng;
              break;
            case "wheel":
              N = $g;
              break;
            case "copy":
            case "cut":
            case "paste":
              N = jg;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              N = js;
              break;
            case "submit":
              N = Xg;
              break;
            case "toggle":
            case "beforetoggle":
              N = kg;
          }
          var Q = (e & 4) !== 0, it = !Q && (t === "scroll" || t === "scrollend"), E = Q ? S !== null ? S + "Capture" : null : S;
          Q = [];
          for (var g = T, O; g !== null; ) {
            var R = g;
            if (O = R.stateNode, R = R.tag, R !== 5 && R !== 26 && R !== 27 || O === null || E === null || (R = ka(g, E), R != null && Q.push(
              Du(g, R, O)
            )), it) break;
            g = g.return;
          }
          0 < Q.length && (S = new N(
            S,
            Y,
            null,
            l,
            C
          ), M.push({ event: S, listeners: Q }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (N = t === "mouseover" || t === "pointerover", S = t === "mouseout" || t === "pointerout", N && l !== $c && (Y = l.relatedTarget || l.fromElement) && (bn(Y) || Y[Qn]))
            break t;
          (S || N) && (Y = C.window === C ? C : (N = C.ownerDocument) ? N.defaultView || N.parentWindow : window, S ? (N = l.relatedTarget || l.toElement, S = T, N = N ? bn(N) : null, N !== null && (it = y(N), Q = N.tag, N !== it || Q !== 5 && Q !== 27 && Q !== 6) && (N = null)) : (S = null, N = T), S !== N && (Q = Rs, R = "onMouseLeave", E = "onMouseEnter", g = "mouse", (t === "pointerout" || t === "pointerover") && (Q = js, R = "onPointerLeave", E = "onPointerEnter", g = "pointer"), it = S == null ? Y : Wa(S), O = N == null ? Y : Wa(N), Y = new Q(
            R,
            g + "leave",
            S,
            l,
            C
          ), Y.target = it, Y.relatedTarget = O, R = null, bn(C) === T && (Q = new Q(
            E,
            g + "enter",
            N,
            l,
            C
          ), Q.target = O, Q.relatedTarget = it, R = Q), it = R, Q = S && N ? dt(
            S,
            N,
            nb
          ) : null, S !== null && Am(
            M,
            Y,
            S,
            Q,
            !1
          ), N !== null && it !== null && Am(
            M,
            it,
            N,
            Q,
            !0
          )));
        }
        t: {
          if (S = T ? Wa(T) : window, N = S.nodeName && S.nodeName.toLowerCase(), N === "select" || N === "input" && S.type === "file")
            var L = Ls;
          else if (qs(S))
            if (Vs)
              L = c0;
            else {
              L = u0;
              var mt = a0;
            }
          else
            N = S.nodeName, !N || N.toLowerCase() !== "input" || S.type !== "checkbox" && S.type !== "radio" ? T && Fc(T.elementType) && (L = Ls) : L = i0;
          if (L && (L = L(t, T))) {
            Gs(
              M,
              L,
              l,
              C
            );
            break t;
          }
          mt && mt(t, S, T);
        }
        switch (mt = T ? Wa(T) : window, t) {
          case "focusin":
            (qs(mt) || mt.contentEditable === "true") && (Pn = mt, ro = T, uu = null);
            break;
          case "focusout":
            uu = ro = Pn = null;
            break;
          case "mousedown":
            fo = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            fo = !1, Ws(M, l, C);
            break;
          case "selectionchange":
            if (r0) break;
          case "keydown":
          case "keyup":
            Ws(M, l, C);
        }
        var J;
        if (ao)
          t: {
            switch (t) {
              case "compositionstart":
                var tt = "onCompositionStart";
                break t;
              case "compositionend":
                tt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                tt = "onCompositionUpdate";
                break t;
            }
            tt = void 0;
          }
        else
          In ? Bs(t, l) && (tt = "onCompositionEnd") : t === "keydown" && l.keyCode === 229 && (tt = "onCompositionStart");
        tt && (Us && l.locale !== "ko" && (In || tt !== "onCompositionStart" ? tt === "onCompositionEnd" && In && (J = As()) : (Yl = C, Pc = "value" in Yl ? Yl.value : Yl.textContent, In = !0)), mt = sc(T, tt), 0 < mt.length && (tt = new Ms(
          tt,
          t,
          null,
          l,
          C
        ), M.push({ event: tt, listeners: mt }), J ? tt.data = J : (J = Ys(l), J !== null && (tt.data = J)))), (J = Pg ? t0(t, l) : e0(t, l)) && (tt = sc(T, "onBeforeInput"), 0 < tt.length && (mt = new Ms(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          C
        ), M.push({
          event: mt,
          listeners: tt
        }), mt.data = J)), P0(
          M,
          t,
          T,
          l,
          C
        );
      }
      Cm(M, e);
    });
  }
  function Du(t, e, l) {
    return {
      instance: t,
      listener: e,
      currentTarget: l
    };
  }
  function sc(t, e) {
    for (var l = e + "Capture", n = []; t !== null; ) {
      var a = t, u = a.stateNode;
      if (a = a.tag, a !== 5 && a !== 26 && a !== 27 || u === null || (a = ka(t, l), a != null && n.unshift(
        Du(t, a, u)
      ), a = ka(t, e), a != null && n.push(
        Du(t, a, u)
      )), t.tag === 3) return n;
      t = t.return;
    }
    return [];
  }
  function nb(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Am(t, e, l, n, a) {
    for (var u = e._reactName, c = []; l !== null && l !== n; ) {
      var s = l, m = s.alternate, T = s.stateNode;
      if (s = s.tag, m !== null && m === n) break;
      s !== 5 && s !== 26 && s !== 27 || T === null || (m = T, a ? (T = ka(l, u), T != null && c.unshift(
        Du(l, T, m)
      )) : a || (T = ka(l, u), T != null && c.push(
        Du(l, T, m)
      ))), l = l.return;
    }
    c.length !== 0 && t.push({ event: e, listeners: c });
  }
  var ab = /\r\n?/g, ub = /\u0000|\uFFFD/g;
  function Dm(t) {
    return (typeof t == "string" ? t : "" + t).replace(ab, `
`).replace(ub, "");
  }
  function Rm(t, e) {
    return e = Dm(e), Dm(t) === e;
  }
  function Ct(t, e, l, n, a, u) {
    switch (l) {
      case "children":
        if (typeof n == "string")
          e === "body" || e === "textarea" && n === "" || $n(t, n);
        else if (typeof n == "number" || typeof n == "bigint")
          e !== "body" && $n(t, "" + n);
        else return;
        break;
      case "className":
        ai(t, "class", n);
        break;
      case "tabIndex":
        ai(t, "tabindex", n);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ai(t, l, n);
        break;
      case "style":
        Ns(t, n, u);
        return;
      case "data":
        if (e !== "object") {
          ai(t, "data", n);
          break;
        }
      case "src":
      case "href":
        if (n === "" && (e !== "a" || l !== "href")) {
          t.removeAttribute(l);
          break;
        }
        if (n == null || typeof n == "function" || typeof n == "symbol" || typeof n == "boolean") {
          t.removeAttribute(l);
          break;
        }
        n = ui(n), t.setAttribute(l, n);
        break;
      case "action":
      case "formAction":
        if (typeof n == "function") {
          t.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (l === "formAction" ? (e !== "input" && Ct(t, e, "name", a.name, a, null), Ct(
            t,
            e,
            "formEncType",
            a.formEncType,
            a,
            null
          ), Ct(
            t,
            e,
            "formMethod",
            a.formMethod,
            a,
            null
          ), Ct(
            t,
            e,
            "formTarget",
            a.formTarget,
            a,
            null
          )) : (Ct(t, e, "encType", a.encType, a, null), Ct(t, e, "method", a.method, a, null), Ct(t, e, "target", a.target, a, null)));
        if (n == null || typeof n == "symbol" || typeof n == "boolean") {
          t.removeAttribute(l);
          break;
        }
        n = ui(n), t.setAttribute(l, n);
        break;
      case "onClick":
        n != null && (t.onclick = tl);
        return;
      case "onScroll":
        n != null && st("scroll", t);
        return;
      case "onScrollEnd":
        n != null && st("scrollend", t);
        return;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n))
            throw Error(r(61));
          if (l = n.__html, l != null) {
            if (a.children != null) throw Error(r(60));
            u?.__html !== l && (t.innerHTML = l);
          }
        }
        break;
      case "multiple":
        t.multiple = n && typeof n != "function" && typeof n != "symbol";
        break;
      case "muted":
        t.muted = n && typeof n != "function" && typeof n != "symbol";
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
        if (n == null || typeof n == "function" || typeof n == "boolean" || typeof n == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        l = ui(n), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          l
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
        n != null && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(l, n) : t.removeAttribute(l);
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
        n && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(l, "") : t.removeAttribute(l);
        break;
      case "capture":
      case "download":
        n === !0 ? t.setAttribute(l, "") : n !== !1 && n != null && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(l, n) : t.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        n != null && typeof n != "function" && typeof n != "symbol" && !isNaN(n) && 1 <= n ? t.setAttribute(l, n) : t.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        n == null || typeof n == "function" || typeof n == "symbol" || isNaN(n) ? t.removeAttribute(l) : t.setAttribute(l, n);
        break;
      case "popover":
        st("beforetoggle", t), st("toggle", t), ni(t, "popover", n);
        break;
      case "xlinkActuate":
        yl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          n
        );
        break;
      case "xlinkArcrole":
        yl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          n
        );
        break;
      case "xlinkRole":
        yl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          n
        );
        break;
      case "xlinkShow":
        yl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          n
        );
        break;
      case "xlinkTitle":
        yl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          n
        );
        break;
      case "xlinkType":
        yl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          n
        );
        break;
      case "xmlBase":
        yl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          n
        );
        break;
      case "xmlLang":
        yl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          n
        );
        break;
      case "xmlSpace":
        yl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          n
        );
        break;
      case "is":
        ni(t, "is", n);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N")
          l = Og.get(l) || l, ni(t, l, n);
        else return;
    }
    St = !0;
  }
  function Jr(t, e, l, n, a, u) {
    switch (l) {
      case "style":
        Ns(t, n, u);
        return;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n))
            throw Error(r(61));
          if (l = n.__html, l != null) {
            if (a.children != null) throw Error(r(60));
            u?.__html !== l && (t.innerHTML = l);
          }
        }
        break;
      case "children":
        if (typeof n == "string") $n(t, n);
        else if (typeof n == "number" || typeof n == "bigint")
          $n(t, "" + n);
        else return;
        break;
      case "onScroll":
        n != null && st("scroll", t);
        return;
      case "onScrollEnd":
        n != null && st("scrollend", t);
        return;
      case "onClick":
        n != null && (t.onclick = tl);
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
        if (!ys.hasOwnProperty(l))
          t: {
            if (l[0] === "o" && l[1] === "n" && (a = l.endsWith("Capture"), u = l.slice(2, a ? l.length - 7 : void 0), e = t[ge] || null, e = e != null ? e[l] : null, typeof e == "function" && t.removeEventListener(u, e, a), typeof n == "function")) {
              typeof e != "function" && e !== null && (l in t ? t[l] = null : t.hasAttribute(l) && t.removeAttribute(l)), t.addEventListener(u, n, a);
              break t;
            }
            St = !0, l in t ? t[l] = n : n === !0 ? t.setAttribute(l, "") : ni(t, l, n);
          }
        return;
    }
    St = !0;
  }
  function ce(t, e, l) {
    switch (e) {
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
        st("error", t), st("load", t);
        var n = !1, a = !1, u;
        for (u in l)
          if (l.hasOwnProperty(u)) {
            var c = l[u];
            if (c != null)
              switch (u) {
                case "src":
                  n = !0;
                  break;
                case "srcSet":
                  a = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, e));
                default:
                  Ct(t, e, u, c, l, null);
              }
          }
        a && Ct(t, e, "srcSet", l.srcSet, l, null), n && Ct(t, e, "src", l.src, l, null);
        return;
      case "input":
        st("invalid", t);
        var s = u = c = a = null, m = null, T = null;
        for (n in l)
          if (l.hasOwnProperty(n)) {
            var C = l[n];
            if (C != null)
              switch (n) {
                case "name":
                  a = C;
                  break;
                case "type":
                  c = C;
                  break;
                case "checked":
                  m = C;
                  break;
                case "defaultChecked":
                  T = C;
                  break;
                case "value":
                  u = C;
                  break;
                case "defaultValue":
                  s = C;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (C != null)
                    throw Error(r(137, e));
                  break;
                default:
                  Ct(t, e, n, C, l, null);
              }
          }
        Ts(
          t,
          u,
          s,
          m,
          T,
          c,
          a,
          !1
        );
        return;
      case "select":
        st("invalid", t), n = c = u = null;
        for (a in l)
          if (l.hasOwnProperty(a) && (s = l[a], s != null))
            switch (a) {
              case "value":
                u = s;
                break;
              case "defaultValue":
                c = s;
                break;
              case "multiple":
                n = s;
              default:
                Ct(t, e, a, s, l, null);
            }
        e = u, l = c, t.multiple = !!n, e != null ? Fn(t, !!n, e, !1) : l != null && Fn(t, !!n, l, !0);
        return;
      case "textarea":
        st("invalid", t), u = a = n = null;
        for (c in l)
          if (l.hasOwnProperty(c) && (s = l[c], s != null))
            switch (c) {
              case "value":
                n = s;
                break;
              case "defaultValue":
                a = s;
                break;
              case "children":
                u = s;
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(r(91));
                break;
              default:
                Ct(t, e, c, s, l, null);
            }
        Os(t, n, a, u);
        return;
      case "option":
        for (m in l)
          if (l.hasOwnProperty(m) && (n = l[m], n != null))
            switch (m) {
              case "selected":
                t.selected = n && typeof n != "function" && typeof n != "symbol";
                break;
              default:
                Ct(t, e, m, n, l, null);
            }
        return;
      case "dialog":
        st("beforetoggle", t), st("toggle", t), st("cancel", t), st("close", t);
        break;
      case "iframe":
      case "object":
        st("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Au.length; n++)
          st(Au[n], t);
        break;
      case "image":
        st("error", t), st("load", t);
        break;
      case "details":
        st("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        st("error", t), st("load", t);
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
        for (T in l)
          if (l.hasOwnProperty(T) && (n = l[T], n != null))
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, e));
              default:
                Ct(t, e, T, n, l, null);
            }
        return;
      default:
        if (Fc(e)) {
          for (C in l)
            l.hasOwnProperty(C) && (n = l[C], n !== void 0 && Jr(
              t,
              e,
              C,
              n,
              l,
              void 0
            ));
          return;
        }
    }
    for (s in l)
      l.hasOwnProperty(s) && (n = l[s], n != null && Ct(t, e, s, n, l, null));
  }
  var ib = {};
  function cb(t, e, l, n) {
    switch (e) {
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
        var a = null, u = null, c = null, s = null, m = null, T = null, C = null;
        for (N in l) {
          var M = l[N];
          if (l.hasOwnProperty(N) && M != null)
            switch (N) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                m = M;
              default:
                n.hasOwnProperty(N) || Ct(t, e, N, null, n, M);
            }
        }
        for (var S in n) {
          var N = n[S];
          if (M = l[S], n.hasOwnProperty(S) && (N != null || M != null))
            switch (S) {
              case "type":
                N !== M && (St = !0), u = N;
                break;
              case "name":
                N !== M && (St = !0), a = N;
                break;
              case "checked":
                N !== M && (St = !0), T = N;
                break;
              case "defaultChecked":
                N !== M && (St = !0), C = N;
                break;
              case "value":
                N !== M && (St = !0), c = N;
                break;
              case "defaultValue":
                N !== M && (St = !0), s = N;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (N != null)
                  throw Error(r(137, e));
                break;
              default:
                N !== M && Ct(
                  t,
                  e,
                  S,
                  N,
                  n,
                  M
                );
            }
        }
        Kc(
          t,
          c,
          s,
          m,
          T,
          C,
          u,
          a
        );
        return;
      case "select":
        N = c = s = S = null;
        for (u in l)
          if (m = l[u], l.hasOwnProperty(u) && m != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                N = m;
              default:
                n.hasOwnProperty(u) || Ct(
                  t,
                  e,
                  u,
                  null,
                  n,
                  m
                );
            }
        for (a in n)
          if (u = n[a], m = l[a], n.hasOwnProperty(a) && (u != null || m != null))
            switch (a) {
              case "value":
                u !== m && (St = !0), S = u;
                break;
              case "defaultValue":
                u !== m && (St = !0), s = u;
                break;
              case "multiple":
                u !== m && (St = !0), c = u;
              default:
                u !== m && Ct(
                  t,
                  e,
                  a,
                  u,
                  n,
                  m
                );
            }
        e = s, l = c, n = N, S != null ? Fn(t, !!l, S, !1) : !!n != !!l && (e != null ? Fn(t, !!l, e, !0) : Fn(t, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        N = S = null;
        for (s in l)
          if (a = l[s], l.hasOwnProperty(s) && a != null && !n.hasOwnProperty(s))
            switch (s) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ct(t, e, s, null, n, a);
            }
        for (c in n)
          if (a = n[c], u = l[c], n.hasOwnProperty(c) && (a != null || u != null))
            switch (c) {
              case "value":
                a !== u && (St = !0), S = a;
                break;
              case "defaultValue":
                a !== u && (St = !0), N = a;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (a != null) throw Error(r(91));
                break;
              default:
                a !== u && Ct(t, e, c, a, n, u);
            }
        xs(t, S, N);
        return;
      case "option":
        for (var Y in l)
          if (S = l[Y], l.hasOwnProperty(Y) && S != null && !n.hasOwnProperty(Y))
            switch (Y) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Ct(
                  t,
                  e,
                  Y,
                  null,
                  n,
                  S
                );
            }
        for (m in n)
          if (S = n[m], N = l[m], n.hasOwnProperty(m) && S !== N && (S != null || N != null))
            switch (m) {
              case "selected":
                S !== N && (St = !0), t.selected = S && typeof S != "function" && typeof S != "symbol";
                break;
              default:
                Ct(
                  t,
                  e,
                  m,
                  S,
                  n,
                  N
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
        for (var Q in l)
          S = l[Q], l.hasOwnProperty(Q) && S != null && !n.hasOwnProperty(Q) && Ct(t, e, Q, null, n, S);
        for (T in n)
          if (S = n[T], N = l[T], n.hasOwnProperty(T) && S !== N && (S != null || N != null))
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (S != null)
                  throw Error(r(137, e));
                break;
              default:
                Ct(
                  t,
                  e,
                  T,
                  S,
                  n,
                  N
                );
            }
        return;
      default:
        if (Fc(e)) {
          for (var it in l)
            S = l[it], l.hasOwnProperty(it) && S !== void 0 && !n.hasOwnProperty(it) && Jr(
              t,
              e,
              it,
              void 0,
              n,
              S
            );
          for (C in n)
            S = n[C], N = l[C], !n.hasOwnProperty(C) || S === N || S === void 0 && N === void 0 || Jr(
              t,
              e,
              C,
              S,
              n,
              N
            );
          return;
        }
    }
    for (var E in l)
      S = l[E], l.hasOwnProperty(E) && S != null && !n.hasOwnProperty(E) && Ct(t, e, E, null, n, S);
    for (M in n)
      S = n[M], N = l[M], !n.hasOwnProperty(M) || S === N || S == null && N == null || Ct(t, e, M, S, n, N);
  }
  function Mm(t) {
    switch (t) {
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
  function ob() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, l = performance.getEntriesByType("resource"), n = 0; n < l.length; n++) {
        var a = l[n], u = a.transferSize, c = a.initiatorType, s = a.duration;
        if (u && s && Mm(c)) {
          for (c = 0, s = a.responseEnd, n += 1; n < l.length; n++) {
            var m = l[n], T = m.startTime;
            if (T > s) break;
            var C = m.transferSize, M = m.initiatorType;
            C && Mm(M) && (m = m.responseEnd, c += C * (m < s ? 1 : (s - T) / (m - T)));
          }
          if (--n, e += 8 * (u + c) / (a.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Fr = null, $r = null;
  function Ru(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function jm(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Um(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function wm(t, e, l, n) {
    return l = Ru(
      l
    ).createElement(t), l[le] = n, l[ge] = e, ce(l, t, e), Wt(l), l;
  }
  function Wr(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var kr = null;
  function rb() {
    var t = window.event;
    return t && t.type === "popstate" ? t === kr ? !1 : (kr = t, !0) : (kr = null, !1);
  }
  var Ir = typeof setTimeout == "function" ? setTimeout : void 0, fb = typeof clearTimeout == "function" ? clearTimeout : void 0, Hm = typeof Promise == "function" ? Promise : void 0, Bm = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Ir, sb = typeof queueMicrotask == "function" ? queueMicrotask : typeof Hm < "u" ? function(t) {
    return Hm.resolve(null).then(t).catch(db);
  } : Ir;
  function db(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function an(t) {
    return t === "head";
  }
  function Ym(t, e) {
    var l = e, n = 0;
    do {
      var a = l.nextSibling;
      if (t.removeChild(l), a && a.nodeType === 8)
        if (l = a.data, l === "/$" || l === "/&") {
          if (n === 0) {
            t.removeChild(a), Ma(e);
            return;
          }
          n--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          n++;
        else if (l === "html")
          cf(
            t.ownerDocument.documentElement
          );
        else if (l === "head") {
          l = t.ownerDocument.head, cf(l);
          for (var u = l.firstChild; u; ) {
            var c = u.nextSibling, s = u.nodeName;
            u[$a] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = c;
          }
        } else
          l === "body" && cf(t.ownerDocument.body);
      l = a;
    } while (l);
    Ma(e);
  }
  function qm(t, e) {
    var l = t;
    t = 0;
    do {
      var n = l.nextSibling;
      if (l.nodeType === 1 ? e ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (e ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), n && n.nodeType === 8)
        if (l = n.data, l === "/$") {
          if (t === 0) break;
          t--;
        } else
          l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || t++;
      l = n;
    } while (l);
  }
  function Gm(t, e, l) {
    if (e = CSS.escape(e) !== e ? "r-" + btoa(e).replace(/=/g, "") : e, t.style.viewTransitionName = e, l != null && (t.style.viewTransitionClass = l), l = getComputedStyle(t), l.display === "inline") {
      if (e = t.getClientRects(), e.length === 1) var n = 1;
      else
        for (var a = n = 0; a < e.length; a++) {
          var u = e[a];
          0 < u.width && 0 < u.height && n++;
        }
      n === 1 && (t = t.style, t.display = e.length === 1 ? "inline-block" : "block", t.marginTop = "-" + l.paddingTop, t.marginBottom = "-" + l.paddingBottom);
    }
  }
  function Lm(t, e) {
    t = t.style, e = e.style;
    var l = e != null ? e.hasOwnProperty("viewTransitionName") ? e.viewTransitionName : e.hasOwnProperty("view-transition-name") ? e["view-transition-name"] : null : null;
    t.viewTransitionName = l == null || typeof l == "boolean" ? "" : ("" + l).trim(), l = e != null ? e.hasOwnProperty("viewTransitionClass") ? e.viewTransitionClass : e.hasOwnProperty("view-transition-class") ? e["view-transition-class"] : null : null, t.viewTransitionClass = l == null || typeof l == "boolean" ? "" : ("" + l).trim(), t.display === "inline-block" && (e == null ? t.display = t.margin = "" : (l = e.display, t.display = l == null || typeof l == "boolean" ? "" : l, l = e.margin, l != null ? t.margin = l : (l = e.hasOwnProperty("marginTop") ? e.marginTop : e["margin-top"], t.marginTop = l == null || typeof l == "boolean" ? "" : l, e = e.hasOwnProperty("marginBottom") ? e.marginBottom : e["margin-bottom"], t.marginBottom = e == null || typeof e == "boolean" ? "" : e)));
  }
  function vb(t, e, l) {
    return l = l.ownerDocument.defaultView, {
      rect: t,
      abs: e.position === "absolute" || e.position === "fixed",
      clip: e.clipPath !== "none" || e.overflow !== "visible" || e.filter !== "none" || e.mask !== "none" || e.mask !== "none" || e.borderRadius !== "0px",
      view: 0 <= t.bottom && 0 <= t.right && t.top <= l.innerHeight && t.left <= l.innerWidth
    };
  }
  function Pr(t) {
    var e = t.getBoundingClientRect(), l = getComputedStyle(t);
    return vb(e, l, t);
  }
  function mb(t) {
    return t.documentElement.clientHeight;
  }
  function hb(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function yb(t, e, l, n, a, u, c, s, m) {
    var T = e.nodeType === 9 ? e : e.ownerDocument;
    try {
      var C = T.startViewTransition({
        update: function() {
          var S = T.defaultView, N = S.navigation && S.navigation.transition, Y = T.fonts.status;
          n();
          var Q = [];
          if (Y === "loaded" && (mb(T), T.fonts.status === "loading" && Q.push(T.fonts.ready)), Y = Q.length, t !== null)
            for (var it = t.suspenseyImages, E = 0, g = 0; g < it.length; g++) {
              var O = it[g];
              if (!O.complete) {
                var R = O.getBoundingClientRect();
                if (0 < R.bottom && 0 < R.right && R.top < S.innerHeight && R.left < S.innerWidth) {
                  if (E += oh(O), E > mc) {
                    Q.length = Y;
                    break;
                  }
                  O = new Promise(
                    hb.bind(O)
                  ), Q.push(O);
                }
              }
            }
          if (0 < Q.length)
            return S = Promise.race([
              Promise.all(Q),
              new Promise(function(L) {
                return setTimeout(L, 500);
              })
            ]).then(a, a), (N ? Promise.allSettled([N.finished, S]) : S).then(u, u);
          if (a(), N)
            return N.finished.then(
              u,
              u
            );
          u();
        },
        types: l
      });
      T.__reactViewTransition = C;
      var M = [];
      return C.ready.then(
        function() {
          for (var S = T.documentElement.getAnimations({
            subtree: !0
          }), N = 0; N < S.length; N++) {
            var Y = S[N], Q = Y.effect, it = Q.pseudoElement;
            if (it != null && it.startsWith("::view-transition")) {
              M.push(Y), Y = Q.getKeyframes();
              for (var E = it = void 0, g = !0, O = 0; O < Y.length; O++) {
                var R = Y[O], L = R.width;
                if (it === void 0) it = L;
                else if (it !== L) {
                  g = !1;
                  break;
                }
                if (L = R.height, E === void 0) E = L;
                else if (E !== L) {
                  g = !1;
                  break;
                }
                delete R.width, delete R.height, R.transform === "none" && delete R.transform;
              }
              g && it !== void 0 && E !== void 0 && (Q.setKeyframes(Y), g = getComputedStyle(
                Q.target,
                Q.pseudoElement
              ), g.width !== it || g.height !== E) && (g = Y[0], g.width = it, g.height = E, g = Y[Y.length - 1], g.width = it, g.height = E, Q.setKeyframes(Y));
            }
          }
          c();
        },
        function(S) {
          T.__reactViewTransition === C && (T.__reactViewTransition = null);
          try {
            if (typeof S == "object" && S !== null)
              switch (S.name) {
                case "InvalidStateError":
                  (S.message === "View transition was skipped because document visibility state is hidden." || S.message === "Skipping view transition because document visibility state has become hidden." || S.message === "Skipping view transition because viewport size changed." || S.message === "Transition was aborted because of invalid state") && (S = null);
              }
            S !== null && m(S);
          } finally {
            n(), a(), c();
          }
        }
      ), C.finished.finally(function() {
        for (var S = 0; S < M.length; S++)
          M[S].cancel();
        T.__reactViewTransition === C && (T.__reactViewTransition = null), s();
      }), C;
    } catch {
      return n(), a(), c(), null;
    }
  }
  function qn(t, e) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + e + ")";
  }
  qn.prototype.animate = function(t, e) {
    return e = typeof e == "number" ? { duration: e } : W({}, e), e.pseudoElement = this._selector, this._scope.animate(t, e);
  }, qn.prototype.getAnimations = function() {
    for (var t = this._scope, e = this._selector, l = t.getAnimations({ subtree: !0 }), n = [], a = 0; a < l.length; a++) {
      var u = l[a].effect;
      u !== null && u.target === t && u.pseudoElement === e && n.push(l[a]);
    }
    return n;
  }, qn.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function Vm(t) {
    return {
      name: t,
      group: new qn("group", t),
      imagePair: new qn("image-pair", t),
      old: new qn("old", t),
      new: new qn("new", t)
    };
  }
  function je(t) {
    this._fragmentFiber = t, this._observers = this._eventListeners = null;
  }
  je.prototype.addEventListener = function(t, e, l) {
    var n = null, a = null;
    if (!(l != null && typeof l != "boolean" && (n = l.signal || null, n !== null && n.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var u = this._eventListeners;
      if (Qm(u, t, e, l) === -1) {
        var c = this, s = e;
        l != null && typeof l != "boolean" && l.once === !0 && (s = function(m) {
          c.removeEventListener(
            t,
            e,
            l
          ), typeof e == "function" ? e.call(this, m) : e.handleEvent(m);
        }), n !== null && (a = c.removeEventListener.bind(
          c,
          t,
          e,
          l
        ), n.addEventListener("abort", a, { once: !0 }), a = n.removeEventListener.bind(n, "abort", a)), n = Na(l), u.push({
          type: t,
          listener: e,
          optionsOrUseCapture: l,
          attachedListener: s,
          cleanup: a
        }), h(
          this._fragmentFiber.child,
          !1,
          gb,
          t,
          s,
          n
        );
      }
      this._eventListeners = u;
    }
  };
  function gb(t, e, l, n) {
    return j(t).addEventListener(
      e,
      l,
      n
    ), !1;
  }
  je.prototype.removeEventListener = function(t, e, l) {
    var n = this._eventListeners;
    if (n !== null && (e = Qm(
      n,
      t,
      e,
      l
    ), e !== -1)) {
      var a = n[e];
      l = a.attachedListener;
      var u = a.cleanup;
      a = Na(a.optionsOrUseCapture), h(
        this._fragmentFiber.child,
        !1,
        bb,
        t,
        l,
        a
      ), n.splice(e, 1), u !== null && u();
    }
  };
  function bb(t, e, l, n) {
    return j(t).removeEventListener(
      e,
      l,
      n
    ), !1;
  }
  function Na(t) {
    return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
  }
  function Xm(t) {
    return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
  }
  function Qm(t, e, l, n) {
    if (t.length === 0) return -1;
    n = Xm(n);
    for (var a = 0; a < t.length; a++) {
      var u = t[a];
      if (u.type === e && u.listener === l && Xm(u.optionsOrUseCapture) === n)
        return a;
    }
    return -1;
  }
  je.prototype.dispatchEvent = function(t) {
    var e = A(
      this._fragmentFiber
    );
    if (e === null) return !0;
    e = j(e);
    var l = this._eventListeners;
    if (l !== null && 0 < l.length || !t.bubbles) {
      var n = e.nodeType === 9 ? e.createComment("") : document.createTextNode("");
      if (l)
        for (var a = 0; a < l.length; a++) {
          var u = l[a];
          n.addEventListener(
            u.type,
            u.attachedListener,
            Na(u.optionsOrUseCapture)
          );
        }
      if (e.appendChild(n), t = n.dispatchEvent(t), l)
        for (a = 0; a < l.length; a++)
          u = l[a], n.removeEventListener(
            u.type,
            u.attachedListener,
            Na(u.optionsOrUseCapture)
          );
      return e.removeChild(n), t;
    }
    return e.dispatchEvent(t);
  }, je.prototype.focus = function(t) {
    h(
      this._fragmentFiber.child,
      !0,
      Zm,
      t,
      void 0,
      void 0
    );
  };
  function Zm(t, e) {
    return t.tag === 6 ? !1 : (t = j(t), Db(t, e));
  }
  je.prototype.focusLast = function(t) {
    var e = [];
    h(
      this._fragmentFiber.child,
      !0,
      tf,
      e,
      void 0,
      void 0
    );
    for (var l = e.length - 1; 0 <= l && !Zm(e[l], t); l--) ;
  };
  function tf(t, e) {
    return e.push(t), !1;
  }
  je.prototype.blur = function() {
    var t = A(
      this._fragmentFiber
    );
    t !== null && (t = j(t), t = Ru(t).activeElement, t !== null && h(
      this._fragmentFiber.child,
      !1,
      pb,
      t,
      void 0,
      void 0
    ));
  };
  function pb(t, e) {
    return t.tag === 6 ? !1 : (t = j(t), t === e || t.contains(e) ? (e.blur(), !0) : !1);
  }
  je.prototype.observeUsing = function(t) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(t), h(
      this._fragmentFiber.child,
      !1,
      Sb,
      t,
      void 0,
      void 0
    );
  };
  function Sb(t, e) {
    return t.tag === 6 || (t = j(t), e.observe(t)), !1;
  }
  je.prototype.unobserveUsing = function(t) {
    var e = this._observers;
    if (e !== null && e.has(t)) {
      e.delete(t), h(
        this._fragmentFiber.child,
        !1,
        Eb,
        t,
        void 0,
        void 0
      );
      for (var l = e = 0; l < We.length; l++) {
        var n = We[l];
        n.fragmentInstance === this && n.observer === t ? t.unobserve(n.instance) : We[e++] = n;
      }
      We.length = e;
    }
  };
  function Eb(t, e) {
    return t.tag === 6 || (t = j(t), e.unobserve(t)), !1;
  }
  var We = [], ef = !1;
  function Tb(t, e, l) {
    We.push({
      fragmentInstance: t,
      observer: e,
      instance: l
    }), ef || (ef = !0, Rb(function() {
      ef = !1;
      var n = We;
      We = [];
      for (var a = 0; a < n.length; a++) {
        var u = n[a];
        u.observer.unobserve(u.instance);
      }
    }));
  }
  je.prototype.getClientRects = function() {
    var t = [];
    return h(
      this._fragmentFiber.child,
      !1,
      xb,
      t,
      void 0,
      void 0
    ), t;
  };
  function xb(t, e) {
    if (t.tag === 6) {
      t = t.stateNode;
      var l = t.ownerDocument.createRange();
      l.selectNodeContents(t), e.push.apply(e, l.getClientRects());
    } else
      t = j(t), e.push.apply(e, t.getClientRects());
    return !1;
  }
  je.prototype.getRootNode = function(t) {
    var e = A(
      this._fragmentFiber
    );
    return e === null ? this : j(e).getRootNode(t);
  }, je.prototype.compareDocumentPosition = function(t) {
    var e = A(
      this._fragmentFiber
    );
    if (e === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var l = [];
    h(
      this._fragmentFiber.child,
      !1,
      tf,
      l,
      void 0,
      void 0
    );
    var n = j(e);
    if (l.length === 0) {
      if (l = n, G(this._fragmentFiber)) {
        t: {
          for (e = this._fragmentFiber.return; e !== null; ) {
            if (e.tag === 4) {
              e = e.stateNode.containerInfo;
              break t;
            }
            if (e.tag === 3 || e.tag === 5 || e.tag === 27)
              break;
            e = e.return;
          }
          e = null;
        }
        e != null && (l = e);
      }
      e = this._fragmentFiber;
      var a = n = l.compareDocumentPosition(t);
      return l === t ? a = Node.DOCUMENT_POSITION_CONTAINS : n & Node.DOCUMENT_POSITION_CONTAINED_BY && (l = B(e)[1], l === null ? a = Node.DOCUMENT_POSITION_PRECEDING : (t = j(l).compareDocumentPosition(
        t
      ), a = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), a |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    e = j(l[0]), a = j(l[l.length - 1]);
    var u = G(this._fragmentFiber) ? e.parentElement : n;
    if (u == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    n = u.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY, u = u.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var c = e.compareDocumentPosition(t), s = a.compareDocumentPosition(t), m = c & Node.DOCUMENT_POSITION_CONTAINED_BY || s & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return s = n && u && c & Node.DOCUMENT_POSITION_FOLLOWING && s & Node.DOCUMENT_POSITION_PRECEDING, e = n && e === t || u && a === t || m || s ? Node.DOCUMENT_POSITION_CONTAINED_BY : !n && e === t || !u && a === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : c, e & Node.DOCUMENT_POSITION_DISCONNECTED || e & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Ob(
      e,
      this._fragmentFiber,
      l[0],
      l[l.length - 1],
      t
    ) ? e : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function Ob(t, e, l, n, a) {
    var u = bn(a);
    if (t & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (l = !!u)
        t: {
          for (; u !== null; ) {
            if (u.tag === 7 && (u === e || u.alternate === e)) {
              l = !0;
              break t;
            }
            u = u.return;
          }
          l = !1;
        }
      return l;
    }
    if (t & Node.DOCUMENT_POSITION_CONTAINS) {
      if (u === null)
        return u = a.ownerDocument, a === u || a === u.documentElement || a === u.body;
      t: {
        for (u = e, e = A(e); u !== null; ) {
          if (!(u.tag !== 5 && u.tag !== 3 && u.tag !== 27 || u !== e && u.alternate !== e)) {
            u = !0;
            break t;
          }
          u = u.return;
        }
        u = !1;
      }
      return u;
    }
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((e = !!u) && !(e = u === l) && (e = dt(
      l,
      u,
      lt
    ), e === null ? e = !1 : (h(
      e,
      !0,
      k,
      u,
      l
    ), u = V, V = null, e = u !== null)), e) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((e = !!u) && !(e = u === n) && (e = dt(
      n,
      u,
      lt
    ), e === null ? e = !1 : (h(
      e,
      !0,
      et,
      u,
      n
    ), u = V, X = V = null, e = u !== null)), e) : !1;
  }
  function Km(t, e) {
    var l = t.ownerDocument.createRange();
    l.selectNodeContents(t), t = l.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      e ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  je.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(r(566));
    var e = [];
    h(
      this._fragmentFiber.child,
      !1,
      tf,
      e,
      void 0,
      void 0
    );
    var l = t !== !1;
    if (e.length === 0) {
      var n = B(
        this._fragmentFiber
      );
      if (n = l ? n[1] || n[0] || A(this._fragmentFiber) : n[0] || n[1], n === null) return;
      if (n.tag === 6) {
        t = j(n), Km(t, l);
        return;
      }
      if (n = j(n), n.nodeType !== 9) {
        if (n.nodeType === 11) {
          l = "host" in n ? n.host : null, l !== null && l.scrollIntoView(t);
          return;
        }
        n.scrollIntoView(t);
      }
    }
    for (n = l ? e.length - 1 : 0; n !== (l ? -1 : e.length); ) {
      var a = e[n];
      a.tag === 6 ? (a = j(a), Km(a, l)) : j(a).scrollIntoView(t), n += l ? -1 : 1;
    }
  };
  function _b(t, e) {
    return t = j(t), Jm(t, e), !1;
  }
  function Jm(t, e) {
    t.reactFragments == null && (t.reactFragments = /* @__PURE__ */ new Set()), t.reactFragments.add(e);
  }
  function Fm(t, e) {
    var l = e._eventListeners;
    if (l !== null)
      for (var n = 0; n < l.length; n++) {
        var a = l[n];
        t.addEventListener(
          a.type,
          a.attachedListener,
          Na(a.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (l = e._observers, l !== null && l.forEach(function(u) {
      for (var c = 0, s = 0; s < We.length; s++) {
        var m = We[s];
        (m.fragmentInstance !== e || m.observer !== u || m.instance !== t) && (We[c++] = m);
      }
      We.length = c, u.observe(t);
    }), Jm(t, e));
  }
  function Nb(t, e) {
    var l = e._eventListeners;
    if (l !== null)
      for (var n = 0; n < l.length; n++) {
        var a = l[n];
        t.removeEventListener(
          a.type,
          a.attachedListener,
          Na(a.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (l = e._observers, l !== null && l.forEach(function(u) {
      typeof u.rootMargin == "string" ? Tb(
        e,
        u,
        t
      ) : u.unobserve(t);
    }), t.reactFragments != null && t.reactFragments.delete(e));
  }
  function lf(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (e = e.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          lf(l), li(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(l);
    }
  }
  function Cb(t, e, l, n) {
    for (; t.nodeType === 1; ) {
      var a = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!n && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (n) {
        if (!t[$a])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (u = t.getAttribute("rel"), u === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (u !== a.rel || t.getAttribute("href") !== (a.href == null || a.href === "" ? null : a.href) || t.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin) || t.getAttribute("title") !== (a.title == null ? null : a.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (u = t.getAttribute("src"), (u !== (a.src == null ? null : a.src) || t.getAttribute("type") !== (a.type == null ? null : a.type) || t.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin)) && u && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var u = a.name == null ? null : "" + a.name;
        if (a.type === "hidden" && t.getAttribute("name") === u)
          return t;
      } else return t;
      if (t = Le(t.nextSibling), t === null) break;
    }
    return null;
  }
  function zb(t, e, l) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = Le(t.nextSibling), t === null)) return null;
    return t;
  }
  function $m(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Le(t.nextSibling), t === null)) return null;
    return t;
  }
  function nf(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function af(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function Ab(t, e) {
    var l = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || l.readyState !== "loading")
      e();
    else {
      var n = function() {
        e(), l.removeEventListener("DOMContentLoaded", n);
      };
      l.addEventListener("DOMContentLoaded", n), t._reactRetry = n;
    }
  }
  function Le(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&" || e === "F!" || e === "F")
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var uf = null;
  function Wm(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "/$" || l === "/&") {
          if (e === 0)
            return Le(t.nextSibling);
          e--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function km(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (e === 0) return t;
          e--;
        } else l !== "/$" && l !== "/&" || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Db(t, e) {
    function l() {
      n = !0;
    }
    if (t.ownerDocument.activeElement === t) return !0;
    var n = !1;
    try {
      t.ownerDocument.addEventListener("focus", l, !0), (t.focus || HTMLElement.prototype.focus).call(t, e);
    } finally {
      t.ownerDocument.removeEventListener("focus", l, !0);
    }
    return n;
  }
  function Rb(t) {
    Bm(function() {
      Bm(function(e) {
        return t(e);
      });
    });
  }
  function Im(t, e, l) {
    switch (e = Ru(l), t) {
      case "html":
        if (t = e.documentElement, !t) throw Error(r(452));
        return t;
      case "head":
        if (t = e.head, !t) throw Error(r(453));
        return t;
      case "body":
        if (t = e.body, !t) throw Error(r(454));
        return t;
      default:
        throw Error(r(451));
    }
  }
  function Pm(t, e, l) {
    for (var n in l) {
      var a = l[n];
      l.hasOwnProperty(n) && a != null && Ct(t, e, n, null, ib, a);
    }
    l.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === tl && (t.onclick = null), li(t);
  }
  function cf(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    li(t);
  }
  var Ve = /* @__PURE__ */ new Map(), th = /* @__PURE__ */ new Set();
  function Mu(t) {
    if (typeof t.getRootNode == "function") {
      var e = t.getRootNode();
      if (e.nodeType === 9 || e.nodeType === 11) return e;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Al = nt.d;
  nt.d = {
    f: Mb,
    r: jb,
    D: Ub,
    C: wb,
    L: Hb,
    m: Bb,
    X: qb,
    S: Yb,
    M: Gb
  };
  function Mb() {
    var t = Al.f(), e = uc();
    return t || e;
  }
  function jb(t) {
    var e = Zn(t);
    e !== null && e.tag === 5 && e.type === "form" ? lv(e) : Al.r(t);
  }
  var Ca = typeof document > "u" ? null : document;
  function eh(t, e, l) {
    var n = Ca;
    if (n && typeof e == "string" && e) {
      var a = Ue(e);
      a = 'link[rel="' + t + '"][href="' + a + '"]', typeof l == "string" && (a += '[crossorigin="' + l + '"]'), th.has(a) || (th.add(a), t = { rel: t, crossOrigin: l, href: e }, n.querySelector(a) === null && (e = n.createElement("link"), ce(e, "link", t), Wt(e), n.head.appendChild(e)));
    }
  }
  function Ub(t) {
    Al.D(t), eh("dns-prefetch", t, null);
  }
  function wb(t, e) {
    Al.C(t, e), eh("preconnect", t, e);
  }
  function Hb(t, e, l) {
    Al.L(t, e, l);
    var n = Ca;
    if (n && t && e) {
      var a = 'link[rel="preload"][as="' + Ue(e) + '"]';
      e === "image" && l && l.imageSrcSet ? (a += '[imagesrcset="' + Ue(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (a += '[imagesizes="' + Ue(
        l.imageSizes
      ) + '"]')) : a += '[href="' + Ue(t) + '"]';
      var u = a;
      switch (e) {
        case "style":
          u = za(t);
          break;
        case "script":
          u = Aa(t);
      }
      if (!(Ve.has(u) || (t = W(
        {
          rel: "preload",
          href: e === "image" && l && l.imageSrcSet ? void 0 : t,
          as: e
        },
        l
      ), Ve.set(u, t), n.querySelector(a) !== null || e === "style" && n.querySelector(ju(u)) || e === "script" && n.querySelector(Uu(u))))) {
        var c = n.createElement("link");
        ce(c, "link", t), e === "style" && (c[ei] = !0, c.onload = c.onerror = function() {
          ms(c);
        }), Wt(c), n.head.appendChild(c);
      }
    }
  }
  function Bb(t, e) {
    Al.m(t, e);
    var l = Ca;
    if (l && t) {
      var n = e && typeof e.as == "string" ? e.as : "script", a = 'link[rel="modulepreload"][as="' + Ue(n) + '"][href="' + Ue(t) + '"]', u = a;
      switch (n) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Aa(t);
      }
      if (!Ve.has(u) && (t = W({ rel: "modulepreload", href: t }, e), Ve.set(u, t), l.querySelector(a) === null)) {
        switch (n) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Uu(u)))
              return;
        }
        n = l.createElement("link"), ce(n, "link", t), Wt(n), l.head.appendChild(n);
      }
    }
  }
  function Yb(t, e, l) {
    Al.S(t, e, l);
    var n = Ca;
    if (n && t) {
      var a = Kn(n).hoistableStyles, u = za(t);
      e = e || "default";
      var c = a.get(u);
      if (!c) {
        var s = { loading: 0, preload: null };
        if (c = n.querySelector(
          ju(u)
        ))
          s.loading = 5;
        else {
          t = W(
            { rel: "stylesheet", href: t, "data-precedence": e },
            l
          ), (l = Ve.get(u)) && of(t, l);
          var m = c = n.createElement("link");
          Wt(m), ce(m, "link", t), m._p = new Promise(function(T, C) {
            m.onload = T, m.onerror = C;
          }), m.addEventListener("load", function() {
            s.loading |= 1;
          }), m.addEventListener("error", function() {
            s.loading |= 2;
          }), s.loading |= 4, dc(c, e, n);
        }
        c = {
          type: "stylesheet",
          instance: c,
          count: 1,
          state: s
        }, a.set(u, c);
      }
    }
  }
  function qb(t, e) {
    Al.X(t, e);
    var l = Ca;
    if (l && t) {
      var n = Kn(l).hoistableScripts, a = Aa(t), u = n.get(a);
      u || (u = l.querySelector(Uu(a)), u || (t = W({ src: t, async: !0 }, e), (e = Ve.get(a)) && rf(t, e), u = l.createElement("script"), Wt(u), ce(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, n.set(a, u));
    }
  }
  function Gb(t, e) {
    Al.M(t, e);
    var l = Ca;
    if (l && t) {
      var n = Kn(l).hoistableScripts, a = Aa(t), u = n.get(a);
      u || (u = l.querySelector(Uu(a)), u || (t = W({ src: t, async: !0, type: "module" }, e), (e = Ve.get(a)) && rf(t, e), u = l.createElement("script"), Wt(u), ce(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, n.set(a, u));
    }
  }
  function lh(t, e, l, n) {
    var a = (a = wl.current) ? Mu(a) : null;
    if (!a) throw Error(r(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (l = za(l.href), e = Kn(
          a
        ).hoistableStyles, n = e.get(l), n || (n = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, n)), n) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          t = za(l.href);
          var u = Kn(
            a
          ).hoistableStyles, c = u.get(t);
          if (c || (a = a.ownerDocument || a, c = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, c), (u = a.querySelector(
            ju(t)
          )) ? u._p || (c.instance = u, c.state.loading = 5) : (u = Ve.get(t), u || (u = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, Ve.set(t, u)), Lb(
            a,
            t,
            u,
            c.state
          ))), e && n === null)
            throw Error(r(528, ""));
          return c;
        }
        if (e && n !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return e = l.async, l = l.src, typeof l == "string" && e && typeof e != "function" && typeof e != "symbol" ? (l = Aa(l), e = Kn(
          a
        ).hoistableScripts, n = e.get(l), n || (n = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, n)), n) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(r(444, t));
    }
  }
  function za(t) {
    return 'href="' + Ue(t) + '"';
  }
  function ju(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function nh(t) {
    return W({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function Lb(t, e, l, n) {
    if (e = t.querySelector(
      'link[rel="preload"][as="style"][' + e + "]"
    )) {
      if (e[ei] !== !0) {
        n.loading = 1;
        return;
      }
    } else
      e = t.createElement("link"), e[ei] = !0, e.onload = e.onerror = ms.bind(null, e), ce(e, "link", l), Wt(e), t.head.appendChild(e);
    n.preload = e, e.addEventListener("load", function() {
      return n.loading |= 1;
    }), e.addEventListener("error", function() {
      return n.loading |= 2;
    });
  }
  function Aa(t) {
    return '[src="' + Ue(t) + '"]';
  }
  function Uu(t) {
    return "script[async]" + t;
  }
  function ah(t, e, l) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var n = t.querySelector(
            'style[data-href~="' + Ue(l.href) + '"]'
          );
          if (n)
            return e.instance = n, Wt(n), n;
          var a = W({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return n = (t.ownerDocument || t).createElement(
            "style"
          ), Wt(n), ce(n, "style", a), dc(n, l.precedence, t), e.instance = n;
        case "stylesheet":
          a = za(l.href);
          var u = t.querySelector(
            ju(a)
          );
          if (u)
            return e.state.loading |= 4, e.instance = u, Wt(u), u;
          n = nh(l), (a = Ve.get(a)) && of(n, a), u = (t.ownerDocument || t).createElement("link"), Wt(u);
          var c = u;
          return c._p = new Promise(function(s, m) {
            c.onload = s, c.onerror = m;
          }), ce(u, "link", n), e.state.loading |= 4, dc(u, l.precedence, t), e.instance = u;
        case "script":
          return u = Aa(l.src), (a = t.querySelector(
            Uu(u)
          )) ? (e.instance = a, Wt(a), a) : (n = l, (a = Ve.get(u)) && (n = W({}, l), rf(n, a)), t = t.ownerDocument || t, a = t.createElement("script"), Wt(a), ce(a, "link", n), t.head.appendChild(a), e.instance = a);
        case "void":
          return null;
        default:
          throw Error(r(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (n = e.instance, e.state.loading |= 4, dc(n, l.precedence, t));
    return e.instance;
  }
  function dc(t, e, l) {
    for (var n = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), a = n.length ? n[n.length - 1] : null, u = a, c = 0; c < n.length; c++) {
      var s = n[c];
      if (s.dataset.precedence === e) u = s;
      else if (u !== a) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (e = l.nodeType === 9 ? l.head : l, e.insertBefore(t, e.firstChild));
  }
  function of(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function rf(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var vc = null;
  function uh(t, e, l) {
    if (vc === null) {
      var n = /* @__PURE__ */ new Map(), a = vc = /* @__PURE__ */ new Map();
      a.set(l, n);
    } else
      a = vc, n = a.get(l), n || (n = /* @__PURE__ */ new Map(), a.set(l, n));
    if (n.has(t)) return n;
    for (n.set(t, null), l = l.getElementsByTagName(t), a = 0; a < l.length; a++) {
      var u = l[a];
      if (!(u[$a] || u[le] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var c = u.getAttribute(e) || "";
        c = t + c;
        var s = n.get(c);
        s ? s.push(u) : n.set(c, [u]);
      }
    }
    return n;
  }
  function ff(t, e, l) {
    t = t.ownerDocument || t, t.head.insertBefore(
      l,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function Vb(t, e, l) {
    if (l === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "")
          break;
        return !0;
      case "link":
        if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError)
          break;
        switch (e.rel) {
          case "stylesheet":
            return t = e.disabled, typeof e.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string")
          return !0;
    }
    return !1;
  }
  function ih(t, e) {
    return t === "img" && e.src != null && e.src !== "" && e.onLoad == null && e.loading !== "lazy";
  }
  function ch(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function oh(t) {
    return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function rh(t, e) {
    typeof e.decode == "function" && (t.imgCount++, e.complete || (t.imgBytes += oh(e), t.suspenseyImages.push(e)), t = Zb.bind(t), e.decode().then(t, t));
  }
  function Xb(t, e, l, n) {
    if (l.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var a = za(n.href), u = e.querySelector(
          ju(a)
        );
        if (u) {
          e = u._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = wu.bind(t), e.then(t, t)), l.state.loading |= 4, l.instance = u, Wt(u);
          return;
        }
        u = e.ownerDocument || e, n = nh(n), (a = Ve.get(a)) && of(n, a), u = u.createElement("link"), Wt(u);
        var c = u;
        c._p = new Promise(function(s, m) {
          c.onload = s, c.onerror = m;
        }), ce(u, "link", n), l.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(l, e), (e = l.state.preload) && (l.state.loading & 3) === 0 && (t.count++, l = wu.bind(t), e.addEventListener("load", l), e.addEventListener("error", l));
    }
  }
  var mc = 0;
  function Qb(t, e) {
    return t.stylesheets && t.count === 0 && yc(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(l) {
      var n = setTimeout(function() {
        if (t.stylesheets && yc(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + e);
      0 < t.imgBytes && mc === 0 && (mc = 62500 * ob());
      var a = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && yc(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > mc ? 50 : 800) + e
      );
      return t.unsuspend = l, function() {
        t.unsuspend = null, clearTimeout(n), clearTimeout(a);
      };
    } : null;
  }
  function fh(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) yc(t, t.stylesheets);
      else if (t.unsuspend) {
        var e = t.unsuspend;
        t.unsuspend = null, e();
      }
    }
  }
  function wu() {
    this.count--, fh(this);
  }
  function Zb() {
    this.imgCount--, fh(this);
  }
  var hc = null;
  function yc(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, hc = /* @__PURE__ */ new Map(), e.forEach(Kb, t), hc = null, wu.call(t));
  }
  function Kb(t, e) {
    if (!(e.state.loading & 4)) {
      var l = hc.get(t);
      if (l) var n = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), hc.set(t, l);
        for (var a = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < a.length; u++) {
          var c = a[u];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (l.set(c.dataset.precedence, c), n = c);
        }
        n && l.set(null, n);
      }
      a = e.instance, c = a.getAttribute("data-precedence"), u = l.get(c) || n, u === n && l.set(null, a), l.set(c, a), this.count++, n = wu.bind(this), a.addEventListener("load", n), a.addEventListener("error", n), u ? u.parentNode.insertBefore(a, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(a, t.firstChild)), e.state.loading |= 4;
    }
  }
  var Da = {
    $$typeof: Ht,
    Provider: null,
    Consumer: null,
    _currentValue: ml,
    _currentValue2: ml,
    _threadCount: 0
  };
  function Jb(t, e, l, n, a, u, c, s, m) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Vc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Vc(0), this.hiddenUpdates = Vc(null), this.identifierPrefix = n, this.onUncaughtError = a, this.onCaughtError = u, this.onRecoverableError = c, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = m, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function sh(t, e, l, n, a, u, c, s, m, T, C, M) {
    return t = new Jb(
      t,
      e,
      l,
      c,
      m,
      T,
      C,
      M,
      s
    ), e = 1, u === !0 && (e |= 24), u = be(3, null, null, e), t.current = u, u.stateNode = t, e = Oo(), e.refCount++, t.pooledCache = e, e.refCount++, u.memoizedState = {
      element: n,
      isDehydrated: l,
      cache: e
    }, zo(u), t;
  }
  function dh(t) {
    return t ? (t = la, t) : la;
  }
  function vh(t, e, l, n, a, u) {
    a = dh(a), n.context === null ? n.context = a : n.pendingContext = a, n = Kl(e), n.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (n.callback = u), l = Jl(t, n, e), l !== null && (Te(l, t, e), du(l, t, e));
  }
  function mh(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function sf(t, e) {
    mh(t, e), (t = t.alternate) && mh(t, e);
  }
  function hh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Tn(t, 67108864);
      e !== null && Te(e, t, 67108864), sf(t, 67108864);
    }
  }
  function yh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Me();
      e = Xc(e);
      var l = Tn(t, e);
      l !== null && Te(l, t, e), sf(t, e);
    }
  }
  var Ra = !0;
  function Fb(t, e, l, n) {
    var a = K.T;
    K.T = null;
    var u = nt.p;
    try {
      nt.p = 2, df(t, e, l, n);
    } finally {
      nt.p = u, K.T = a;
    }
  }
  function $b(t, e, l, n) {
    var a = K.T;
    K.T = null;
    var u = nt.p;
    try {
      nt.p = 8, df(t, e, l, n);
    } finally {
      nt.p = u, K.T = a;
    }
  }
  function df(t, e, l, n) {
    if (Ra) {
      var a = vf(n);
      if (a === null)
        Kr(
          t,
          e,
          n,
          gc,
          l
        ), bh(t, n);
      else if (kb(
        a,
        t,
        e,
        l,
        n
      ))
        n.stopPropagation();
      else if (bh(t, n), e & 4 && -1 < Wb.indexOf(t)) {
        for (; a !== null; ) {
          var u = Zn(a);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var c = gn(u.pendingLanes);
                  if (c !== 0) {
                    var s = u;
                    for (s.pendingLanes |= 2, s.entangledLanes |= 2; c; ) {
                      var m = 1 << 31 - _e(c);
                      s.entanglements[1] |= m, c &= ~m;
                    }
                    fl(u), (Tt & 6) === 0 && (lc = xe() + 500, zu(0));
                  }
                }
                break;
              case 31:
              case 13:
                s = Tn(u, 2), s !== null && Te(s, u, 2), uc(), sf(u, 2);
            }
          if (u = vf(n), u === null && Kr(
            t,
            e,
            n,
            gc,
            l
          ), u === a) break;
          a = u;
        }
        a !== null && n.stopPropagation();
      } else
        Kr(
          t,
          e,
          n,
          null,
          l
        );
    }
  }
  function vf(t) {
    return t = Wc(t), mf(t);
  }
  var gc = null;
  function mf(t) {
    if (gc = null, t = bn(t), t !== null) {
      var e = y(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (t = b(e), t !== null) return t;
          t = null;
        } else if (l === 31) {
          if (t = x(e), t !== null) return t;
          t = null;
        } else if (l === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return gc = t, null;
  }
  function gh(t) {
    switch (t) {
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
        switch (og()) {
          case ls:
            return 2;
          case ns:
            return 8;
          case Wu:
          case rg:
            return 32;
          case as:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var hf = !1, un = null, cn = null, on = null, Hu = /* @__PURE__ */ new Map(), Bu = /* @__PURE__ */ new Map(), rn = [], Wb = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function bh(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        un = null;
        break;
      case "dragenter":
      case "dragleave":
        cn = null;
        break;
      case "mouseover":
      case "mouseout":
        on = null;
        break;
      case "pointerover":
      case "pointerout":
        Hu.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Bu.delete(e.pointerId);
    }
  }
  function Yu(t, e, l, n, a, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: e,
      domEventName: l,
      eventSystemFlags: n,
      nativeEvent: u,
      targetContainers: [a]
    }, e !== null && (e = Zn(e), e !== null && hh(e)), t) : (t.eventSystemFlags |= n, e = t.targetContainers, a !== null && e.indexOf(a) === -1 && e.push(a), t);
  }
  function kb(t, e, l, n, a) {
    switch (e) {
      case "focusin":
        return un = Yu(
          un,
          t,
          e,
          l,
          n,
          a
        ), !0;
      case "dragenter":
        return cn = Yu(
          cn,
          t,
          e,
          l,
          n,
          a
        ), !0;
      case "mouseover":
        return on = Yu(
          on,
          t,
          e,
          l,
          n,
          a
        ), !0;
      case "pointerover":
        var u = a.pointerId;
        return Hu.set(
          u,
          Yu(
            Hu.get(u) || null,
            t,
            e,
            l,
            n,
            a
          )
        ), !0;
      case "gotpointercapture":
        return u = a.pointerId, Bu.set(
          u,
          Yu(
            Bu.get(u) || null,
            t,
            e,
            l,
            n,
            a
          )
        ), !0;
    }
    return !1;
  }
  function ph(t) {
    var e = bn(t.target);
    if (e !== null) {
      var l = y(e);
      if (l !== null) {
        if (e = l.tag, e === 13) {
          if (e = b(l), e !== null) {
            t.blockedOn = e, ss(t.priority, function() {
              yh(l);
            });
            return;
          }
        } else if (e === 31) {
          if (e = x(l), e !== null) {
            t.blockedOn = e, ss(t.priority, function() {
              yh(l);
            });
            return;
          }
        } else if (e === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function bc(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = vf(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var n = new l.constructor(
          l.type,
          l
        );
        $c = n, l.target.dispatchEvent(n), $c = null;
      } else
        return e = Zn(l), e !== null && hh(e), t.blockedOn = l, !1;
      e.shift();
    }
    return !0;
  }
  function Sh(t, e, l) {
    bc(t) && l.delete(e);
  }
  function Ib() {
    hf = !1, un !== null && bc(un) && (un = null), cn !== null && bc(cn) && (cn = null), on !== null && bc(on) && (on = null), Hu.forEach(Sh), Bu.forEach(Sh);
  }
  function pc(t, e) {
    t.blockedOn === e && (t.blockedOn = null, hf || (hf = !0, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      Ib
    )));
  }
  var Sc = null;
  function Eh(t) {
    Sc !== t && (Sc = t, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      function() {
        Sc === t && (Sc = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e], n = t[e + 1], a = t[e + 2];
          if (typeof n != "function") {
            if (mf(n || l) === null)
              continue;
            break;
          }
          var u = Zn(l);
          u !== null && (t.splice(e, 3), e -= 3, $o(
            u,
            {
              pending: !0,
              data: a,
              method: l.method,
              action: n
            },
            n,
            a
          ));
        }
      }
    ));
  }
  function Ma(t) {
    function e(m) {
      return pc(m, t);
    }
    un !== null && pc(un, t), cn !== null && pc(cn, t), on !== null && pc(on, t), Hu.forEach(e), Bu.forEach(e);
    for (var l = 0; l < rn.length; l++) {
      var n = rn[l];
      n.blockedOn === t && (n.blockedOn = null);
    }
    for (; 0 < rn.length && (l = rn[0], l.blockedOn === null); )
      ph(l), l.blockedOn === null && rn.shift();
    if (l = (t.ownerDocument || t).$$reactFormReplay, l != null)
      for (n = 0; n < l.length; n += 3) {
        var a = l[n], u = l[n + 1], c = a[ge] || null;
        if (typeof u == "function")
          c || Eh(l);
        else if (c) {
          var s = null;
          if (u && u.hasAttribute("formAction")) {
            if (a = u, c = u[ge] || null)
              s = c.formAction;
            else if (mf(a) !== null) continue;
          } else s = c.action;
          typeof s == "function" ? l[n + 1] = s : (l.splice(n, 3), n -= 3), Eh(l);
        }
      }
  }
  function Th() {
    function t(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(c) {
            return a = c;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function e() {
      a !== null && (a(), a = null), n || setTimeout(l, 20);
    }
    function l() {
      if (!n && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var n = !1, a = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(l, 100), function() {
        n = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), a !== null && (a(), a = null);
      };
    }
  }
  function yf(t) {
    this._internalRoot = t;
  }
  Ec.prototype.render = yf.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(r(409));
    var l = e.current, n = Me();
    vh(l, n, t, e, null, null);
  }, Ec.prototype.unmount = yf.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      vh(t.current, 2, null, t, null, null), uc(), e[Qn] = null;
    }
  };
  function Ec(t) {
    this._internalRoot = t;
  }
  Ec.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = fs();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < rn.length && e !== 0 && e < rn[l].priority; l++) ;
      rn.splice(l, 0, t), l === 0 && ph(t);
    }
  };
  var xh = o.version;
  if (xh !== "19.3.0")
    throw Error(
      r(
        527,
        xh,
        "19.3.0"
      )
    );
  nt.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(r(188)) : (t = Object.keys(t).join(","), Error(r(268, t)));
    return t = U(e), t = t !== null ? D(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var Pb = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: K,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Tc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Tc.isDisabled && Tc.supportsFiber)
      try {
        Ka = Tc.inject(
          Pb
        ), Oe = Tc;
      } catch {
      }
  }
  return Gu.createRoot = function(t, e) {
    if (!d(t)) throw Error(r(299));
    var l = !1, n = "", a = dv, u = vv, c = mv;
    return e != null && (e.unstable_strictMode === !0 && (l = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (a = e.onUncaughtError), e.onCaughtError !== void 0 && (u = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError)), e = sh(
      t,
      1,
      !1,
      null,
      null,
      l,
      n,
      null,
      a,
      u,
      c,
      Th
    ), t[Qn] = e.current, Zr(t), new yf(e);
  }, Gu.hydrateRoot = function(t, e, l) {
    if (!d(t)) throw Error(r(299));
    var n = !1, a = "", u = dv, c = vv, s = mv, m = null;
    return l != null && (l.unstable_strictMode === !0 && (n = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (c = l.onCaughtError), l.onRecoverableError !== void 0 && (s = l.onRecoverableError), l.formState !== void 0 && (m = l.formState)), e = sh(
      t,
      1,
      !0,
      e,
      l ?? null,
      n,
      a,
      m,
      u,
      c,
      s,
      Th
    ), e.context = dh(null), l = e.current, n = Me(), n = Xc(n), a = Kl(n), a.callback = null, Jl(l, a, n), l = n, e.current.lanes = l, Fa(e, l), fl(e), t[Qn] = e.current, Zr(t), new Ec(e);
  }, Gu.version = "19.3.0", Gu;
}
var jh;
function sp() {
  if (jh) return pf.exports;
  jh = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (o) {
        console.error(o);
      }
  }
  return i(), pf.exports = fp(), pf.exports;
}
var dp = sp(), Ga = $h(), vp = Object.defineProperty, Va = (i, o) => vp(i, "name", { value: o, configurable: !0 }), Wh = !!(typeof window < "u" && window.document && window.document.createElement);
function vn(i, o, { checkForDefaultPrevented: f = !0 } = {}) {
  return /* @__PURE__ */ Va(function(d) {
    if (i?.(d), f === !1 || !d || !d.defaultPrevented)
      return o?.(d);
  }, "handleEvent");
}
Va(vn, "composeEventHandlers");
function mp(i) {
  if (!Wh)
    throw new Error("Cannot access window outside of the DOM");
  return i?.ownerDocument?.defaultView ?? window;
}
Va(mp, "getOwnerWindow");
function Df(i) {
  if (!Wh)
    throw new Error("Cannot access document outside of the DOM");
  return i?.ownerDocument ?? document;
}
Va(Df, "getOwnerDocument");
function kh(i, o = !1) {
  const { activeElement: f } = Df(i);
  if (!f?.nodeName)
    return null;
  if (Ih(f) && f.contentDocument)
    return kh(f.contentDocument.body, o);
  if (o) {
    const r = f.getAttribute("aria-activedescendant");
    if (r) {
      const d = Df(f).getElementById(r);
      if (d)
        return d;
    }
  }
  return f;
}
Va(kh, "getActiveElement");
function Ih(i) {
  return i.tagName === "IFRAME";
}
Va(Ih, "isFrame");
var hp = Object.defineProperty, Qf = (i, o) => hp(i, "name", { value: o, configurable: !0 });
function Rf(i, o) {
  if (typeof i == "function")
    return i(o);
  i != null && (i.current = o);
}
Qf(Rf, "setRef");
function Ph(...i) {
  return (o) => {
    let f = !1;
    const r = i.map((d) => {
      const y = Rf(d, o);
      return !f && typeof y == "function" && (f = !0), y;
    });
    if (f)
      return () => {
        for (let d = 0; d < r.length; d++) {
          const y = r[d];
          typeof y == "function" ? y() : Rf(i[d], null);
        }
      };
  };
}
Qf(Ph, "composeRefs");
function Xa(...i) {
  return _.useCallback(Ph(...i), i);
}
Qf(Xa, "useComposedRefs");
var yp = Object.defineProperty, Xe = (i, o) => yp(i, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function gp(i, o) {
  const f = _.createContext(o);
  f.displayName = i + "Context";
  const r = /* @__PURE__ */ Xe((y) => {
    const { children: b, ...x } = y, z = _.useMemo(() => x, Object.values(x));
    return /* @__PURE__ */ v.jsx(f.Provider, { value: z, children: b });
  }, "Provider");
  r.displayName = i + "Provider";
  function d(y, b = {}) {
    const { optional: x = !1 } = b, z = _.useContext(f);
    if (z) return z;
    if (o !== void 0) return o;
    if (!x)
      throw new Error(`\`${y}\` must be used within \`${i}\``);
  }
  return Xe(d, "useContext"), [r, d];
}
Xe(gp, "createContext");
// @__NO_SIDE_EFFECTS__
function ty(i, o = []) {
  let f = [];
  function r(y, b) {
    const x = _.createContext(b);
    x.displayName = y + "Context";
    const z = f.length;
    f = [...f, b];
    const U = /* @__PURE__ */ Xe((h) => {
      const { scope: A, children: G, ...B } = h, H = A?.[i]?.[z] || x, j = _.useMemo(() => B, Object.values(B));
      return /* @__PURE__ */ v.jsx(H.Provider, { value: j, children: G });
    }, "Provider");
    U.displayName = y + "Provider";
    function D(h, A, G = {}) {
      const { optional: B = !1 } = G, H = A?.[i]?.[z] || x, j = _.useContext(H);
      if (j) return j;
      if (b !== void 0) return b;
      if (!B)
        throw new Error(`\`${h}\` must be used within \`${y}\``);
    }
    return Xe(D, "useContext"), [U, D];
  }
  Xe(r, "createContext");
  const d = /* @__PURE__ */ Xe(() => {
    const y = f.map((b) => _.createContext(b));
    return /* @__PURE__ */ Xe(function(x) {
      const z = x?.[i] || y;
      return _.useMemo(
        () => ({ [`__scope${i}`]: { ...x, [i]: z } }),
        [x, z]
      );
    }, "useScope");
  }, "createScope");
  return d.scopeName = i, [r, ey(d, ...o)];
}
Xe(ty, "createContextScope");
function ey(...i) {
  const o = i[0];
  if (i.length === 1) return o;
  const f = /* @__PURE__ */ Xe(() => {
    const r = i.map((d) => ({
      useScope: d(),
      scopeName: d.scopeName
    }));
    return /* @__PURE__ */ Xe(function(y) {
      const b = r.reduce((x, { useScope: z, scopeName: U }) => {
        const h = z(y)[`__scope${U}`];
        return { ...x, ...h };
      }, {});
      return _.useMemo(() => ({ [`__scope${o.scopeName}`]: b }), [b]);
    }, "useComposedScopes");
  }, "createScope");
  return f.scopeName = o.scopeName, f;
}
Xe(ey, "composeContextScopes");
var mn = globalThis?.document ? _.useLayoutEffect : () => {
}, bp = Object.defineProperty, pp = (i, o) => bp(i, "name", { value: o, configurable: !0 }), Sp = Qu[" useId ".trim().toString()] || (() => {
}), Ep = 0;
function Ac(i) {
  const [o, f] = _.useState(Sp());
  return mn(() => {
    i || f((r) => r ?? String(Ep++));
  }, [i]), i || (o ? `radix-${o}` : "");
}
pp(Ac, "useId");
var Tp = Object.defineProperty, xp = (i, o) => Tp(i, "name", { value: o, configurable: !0 }), Uh = Qu[" useEffectEvent ".trim().toString()], wh = Qu[" useInsertionEffect ".trim().toString()];
function ly(i) {
  if (typeof Uh == "function")
    return Uh(i);
  const o = _.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  return typeof wh == "function" ? wh(() => {
    o.current = i;
  }) : mn(() => {
    o.current = i;
  }), _.useMemo(() => ((...f) => o.current?.(...f)), []);
}
xp(ly, "useEffectEvent");
var Op = Object.defineProperty, Zu = (i, o) => Op(i, "name", { value: o, configurable: !0 }), _p = Qu[" useInsertionEffect ".trim().toString()] || mn;
function ny({
  prop: i,
  defaultProp: o,
  onChange: f = /* @__PURE__ */ Zu(() => {
  }, "onChange"),
  caller: r
}) {
  const [d, y, b] = ay({
    defaultProp: o,
    onChange: f
  }), x = i !== void 0, z = x ? i : d, U = _.useCallback(
    (D) => {
      if (x) {
        const h = uy(D) ? D(i) : D;
        h !== i && b.current?.(h);
      } else
        y(D);
    },
    [x, i, y, b]
  );
  return [z, U];
}
Zu(ny, "useControllableState");
function ay({
  defaultProp: i,
  onChange: o
}) {
  const [f, r] = _.useState(i), d = _.useRef(f), y = _.useRef(o);
  return _p(() => {
    y.current = o;
  }, [o]), _.useEffect(() => {
    d.current !== f && (y.current?.(f), d.current = f);
  }, [f, d]), [f, r, y];
}
Zu(ay, "useUncontrolledState");
function uy(i) {
  return typeof i == "function";
}
Zu(uy, "isFunction");
var Hh = Symbol("RADIX:SYNC_STATE");
function Np(i, o, f, r) {
  const { prop: d, defaultProp: y, onChange: b, caller: x } = o, z = d !== void 0, U = ly(b), D = [{ ...f, state: y }];
  r && D.push(r);
  const [h, A] = _.useReducer(
    (j, V) => {
      if (V.type === Hh)
        return { ...j, state: V.state };
      const X = i(j, V);
      return z && !Object.is(X.state, j.state) && U(X.state), X;
    },
    ...D
  ), G = h.state, B = _.useRef(G);
  _.useEffect(() => {
    B.current !== G && (B.current = G, z || U(G));
  }, [G, B, z]);
  const H = _.useMemo(() => d !== void 0 ? { ...h, state: d } : h, [h, d]);
  return _.useEffect(() => {
    z && !Object.is(d, h.state) && A({ type: Hh, state: d });
  }, [d, h.state, z]), [H, A];
}
Zu(Np, "useControllableStateReducer");
var Cp = Object.defineProperty, ke = (i, o) => Cp(i, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function Mc(i) {
  const o = _.forwardRef((f, r) => {
    let { children: d, ...y } = f, b = null, x = !1;
    const z = [];
    Mf(d) && typeof xc == "function" && (d = xc(d._payload)), _.Children.forEach(d, (A) => {
      if (ry(A)) {
        x = !0;
        const G = A;
        let B = "child" in G.props ? G.props.child : G.props.children;
        Mf(B) && typeof xc == "function" && (B = xc(B._payload)), b = Dp(G, B), z.push(b?.props?.children);
      } else
        z.push(A);
    }), b ? b = _.cloneElement(b, void 0, z) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !x && _.Children.count(d) === 1 && _.isValidElement(d) && (b = d)
    );
    const U = b ? oy(b) : void 0, D = Xa(r, U);
    if (!b) {
      if (d || d === 0)
        throw new Error(
          x ? jp(i) : Mp(i)
        );
      return d;
    }
    const h = cy(y, b.props ?? {});
    return b.type !== _.Fragment && (h.ref = r ? D : U), _.cloneElement(b, h);
  });
  return o.displayName = `${i}.Slot`, o;
}
ke(Mc, "createSlot");
var zp = /* @__PURE__ */ Mc("Slot"), iy = Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Ap(i) {
  const o = /* @__PURE__ */ ke((f) => "child" in f ? f.children(f.child) : f.children, "Slottable");
  return o.displayName = `${i}.Slottable`, o.__radixId = iy, o;
}
ke(Ap, "createSlottable");
var Dp = /* @__PURE__ */ ke((i, o) => {
  if ("child" in i.props) {
    const f = i.props.child;
    return _.isValidElement(f) ? _.cloneElement(f, void 0, i.props.children(f.props.children)) : null;
  }
  return _.isValidElement(o) ? o : null;
}, "getSlottableElementFromSlottable");
function cy(i, o) {
  const f = { ...o };
  for (const r in o) {
    const d = i[r], y = o[r];
    /^on[A-Z]/.test(r) ? d && y ? f[r] = (...x) => {
      const z = y(...x);
      return d(...x), z;
    } : d && (f[r] = d) : r === "style" ? f[r] = { ...d, ...y } : r === "className" && (f[r] = [d, y].filter(Boolean).join(" "));
  }
  return { ...i, ...f };
}
ke(cy, "mergeProps");
function oy(i) {
  let o = Object.getOwnPropertyDescriptor(i.props, "ref")?.get, f = o && "isReactWarning" in o && o.isReactWarning;
  return f ? i.ref : (o = Object.getOwnPropertyDescriptor(i, "ref")?.get, f = o && "isReactWarning" in o && o.isReactWarning, f ? i.props.ref : i.props.ref || i.ref);
}
ke(oy, "getElementRef");
function ry(i) {
  return _.isValidElement(i) && typeof i.type == "function" && "__radixId" in i.type && i.type.__radixId === iy;
}
ke(ry, "isSlottable");
var Rp = Symbol.for("react.lazy");
function Mf(i) {
  return i != null && typeof i == "object" && "$$typeof" in i && i.$$typeof === Rp && "_payload" in i && fy(i._payload);
}
ke(Mf, "isLazyComponent");
function fy(i) {
  return typeof i == "object" && i !== null && "then" in i;
}
ke(fy, "isPromiseLike");
var Mp = /* @__PURE__ */ ke((i) => `${i} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), jp = /* @__PURE__ */ ke((i) => `${i} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), xc = Qu[" use ".trim().toString()], Up = Object.defineProperty, wp = (i, o) => Up(i, "name", { value: o, configurable: !0 }), Hp = [
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
], hn = Hp.reduce((i, o) => {
  const f = /* @__PURE__ */ Mc(`Primitive.${o}`), r = _.forwardRef((d, y) => {
    const { asChild: b, ...x } = d, z = b ? f : o;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ v.jsx(z, { ...x, ref: y });
  });
  return r.displayName = `Primitive.${o}`, { ...i, [o]: r };
}, {});
function sy(i, o) {
  i && Ga.flushSync(() => i.dispatchEvent(o));
}
wp(sy, "dispatchDiscreteCustomEvent");
var Bp = Object.defineProperty, Yp = (i, o) => Bp(i, "name", { value: o, configurable: !0 });
function La(i) {
  const o = _.useRef(i);
  return _.useEffect(() => {
    o.current = i;
  }), _.useMemo(() => ((...f) => o.current?.(...f)), []);
}
Yp(La, "useCallbackRef");
var qp = Object.defineProperty, te = (i, o) => qp(i, "name", { value: o, configurable: !0 }), jf = "dismissableLayer.update", Gp = "dismissableLayer.pointerDownOutside", Lp = "dismissableLayer.focusOutside", Bh, dy = _.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set(),
  // Outside elements that belong to a layer's own dismiss affordance (eg, a
  // dialog overlay). Pressing them should dismiss the layer regardless of
  // whether or not they stop propagation.
  //
  // See https://github.com/radix-ui/primitives/issues/3346
  dismissableSurfaces: /* @__PURE__ */ new Set()
}), Vp = /* @__PURE__ */ _.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ te(function(o, f) {
    const {
      disableOutsidePointerEvents: r = !1,
      deferPointerDownOutside: d = !1,
      onEscapeKeyDown: y,
      onPointerDownOutside: b,
      onFocusOutside: x,
      onInteractOutside: z,
      onDismiss: U,
      ...D
    } = o, h = _.useContext(dy), [A, G] = _.useState(null), B = A?.ownerDocument ?? globalThis?.document, [, H] = _.useState({}), j = Xa(f, G), V = Array.from(h.layers), [X] = [
      ...h.layersWithOutsidePointerEventsDisabled
    ].slice(-1), k = X ? V.indexOf(X) : -1, et = A ? V.indexOf(A) : -1, lt = h.layersWithOutsidePointerEventsDisabled.size > 0, dt = et >= k, W = _.useRef(!1), ot = my(
      (Z) => {
        b?.(Z), z?.(Z), Z.defaultPrevented || U?.();
      },
      {
        ownerDocument: B,
        deferPointerDownOutside: d,
        isDeferredPointerDownOutsideRef: W,
        dismissableSurfaces: h.dismissableSurfaces,
        shouldHandlePointerDownOutside: _.useCallback(
          (Z) => {
            if (!(Z instanceof Node))
              return !1;
            const fe = [...h.branches].some(
              (se) => se.contains(Z)
            );
            return dt && !fe;
          },
          [h.branches, dt]
        )
      }
    ), Gt = hy((Z) => {
      if (d && W.current)
        return;
      const fe = Z.target;
      [...h.branches].some((Ht) => Ht.contains(fe)) || (x?.(Z), z?.(Z), Z.defaultPrevented || U?.());
    }, B), Lt = A ? et === V.length - 1 : !1, jt = La((Z) => {
      Z.key === "Escape" && (y?.(Z), !Z.defaultPrevented && U && (Z.preventDefault(), U()));
    });
    return _.useEffect(() => {
      if (Lt)
        return B.addEventListener("keydown", jt, { capture: !0 }), () => B.removeEventListener("keydown", jt, { capture: !0 });
    }, [B, Lt, jt]), _.useEffect(() => {
      if (A)
        return r && (h.layersWithOutsidePointerEventsDisabled.size === 0 && (Bh = B.body.style.pointerEvents, B.body.style.pointerEvents = "none"), h.layersWithOutsidePointerEventsDisabled.add(A)), h.layers.add(A), Uf(), () => {
          r && (h.layersWithOutsidePointerEventsDisabled.delete(A), h.layersWithOutsidePointerEventsDisabled.size === 0 && (B.body.style.pointerEvents = Bh));
        };
    }, [A, B, r, h]), _.useEffect(() => () => {
      A && (h.layers.delete(A), h.layersWithOutsidePointerEventsDisabled.delete(A), Uf());
    }, [A, h]), _.useEffect(() => {
      const Z = /* @__PURE__ */ te(() => H({}), "handleUpdate");
      return document.addEventListener(jf, Z), () => document.removeEventListener(jf, Z);
    }, []), /* @__PURE__ */ v.jsx(
      hn.div,
      {
        ...D,
        ref: j,
        style: {
          pointerEvents: lt ? dt ? "auto" : "none" : void 0,
          ...o.style
        },
        onFocusCapture: vn(o.onFocusCapture, Gt.onFocusCapture),
        onBlurCapture: vn(o.onBlurCapture, Gt.onBlurCapture),
        onPointerDownCapture: vn(
          o.onPointerDownCapture,
          ot.onPointerDownCapture
        )
      }
    );
  }, "DismissableLayer")
);
function vy() {
  const i = _.useContext(dy), [o, f] = _.useState(null);
  return _.useEffect(() => {
    if (o)
      return i.dismissableSurfaces.add(o), () => {
        i.dismissableSurfaces.delete(o);
      };
  }, [o, i.dismissableSurfaces]), f;
}
te(vy, "useDismissableLayerSurface");
var Xp = /* @__PURE__ */ te(() => !0, "IS_TRUE");
function my(i, o) {
  const {
    ownerDocument: f = globalThis?.document,
    deferPointerDownOutside: r = !1,
    isDeferredPointerDownOutsideRef: d,
    dismissableSurfaces: y,
    shouldHandlePointerDownOutside: b = Xp
  } = o, x = La(i), z = _.useRef(!1), U = _.useRef(!1), D = _.useRef(/* @__PURE__ */ new Map()), h = _.useRef(() => {
  });
  return _.useEffect(() => {
    function A() {
      U.current = !1, d.current = !1, D.current.clear();
    }
    te(A, "resetOutsideInteraction");
    function G() {
      return Array.from(D.current.values()).some(Boolean);
    }
    te(G, "isOutsideInteractionIntercepted");
    function B(k) {
      if (!U.current)
        return;
      const et = k.target;
      et instanceof Node && [...y].some((dt) => dt.contains(et)) || D.current.set(k.type, !0), k.type === "click" && window.setTimeout(() => {
        U.current && h.current();
      }, 0);
    }
    te(B, "handleInteractionCapture");
    function H(k) {
      U.current && D.current.set(k.type, !1);
    }
    te(H, "handleInteractionBubble");
    const j = /* @__PURE__ */ te((k) => {
      if (k.target && !z.current) {
        let et = function() {
          f.removeEventListener("click", h.current);
          const dt = G();
          A(), dt || Zf(
            Gp,
            x,
            lt,
            { discrete: !0 }
          );
        };
        if (te(et, "handleAndDispatchPointerDownOutsideEvent"), !b(k.target)) {
          f.removeEventListener("click", h.current), A(), z.current = !1;
          return;
        }
        const lt = { originalEvent: k };
        U.current = !0, d.current = r && k.button === 0, D.current.clear(), !r || k.button !== 0 ? et() : (f.removeEventListener("click", h.current), h.current = et, f.addEventListener("click", h.current, { once: !0 }));
      } else
        f.removeEventListener("click", h.current), A();
      z.current = !1;
    }, "handlePointerDown"), V = [
      "pointerup",
      "mousedown",
      "mouseup",
      "touchstart",
      "touchend",
      "click"
    ];
    for (const k of V)
      f.addEventListener(k, B, !0), f.addEventListener(k, H);
    const X = window.setTimeout(() => {
      f.addEventListener("pointerdown", j);
    }, 0);
    return () => {
      window.clearTimeout(X), f.removeEventListener("pointerdown", j), f.removeEventListener("click", h.current);
      for (const k of V)
        f.removeEventListener(k, B, !0), f.removeEventListener(k, H);
    };
  }, [
    f,
    x,
    r,
    d,
    y,
    b
  ]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: /* @__PURE__ */ te(() => z.current = !0, "onPointerDownCapture")
  };
}
te(my, "usePointerDownOutside");
function hy(i, o = globalThis?.document) {
  const f = La(i), r = _.useRef(!1);
  return _.useEffect(() => {
    const d = /* @__PURE__ */ te((y) => {
      y.target && !r.current && Zf(Lp, f, { originalEvent: y }, {
        discrete: !1
      });
    }, "handleFocus");
    return o.addEventListener("focusin", d), () => o.removeEventListener("focusin", d);
  }, [o, f]), {
    onFocusCapture: /* @__PURE__ */ te(() => r.current = !0, "onFocusCapture"),
    onBlurCapture: /* @__PURE__ */ te(() => r.current = !1, "onBlurCapture")
  };
}
te(hy, "useFocusOutside");
function Uf() {
  const i = new CustomEvent(jf);
  document.dispatchEvent(i);
}
te(Uf, "dispatchUpdate");
function Zf(i, o, f, { discrete: r }) {
  const d = f.originalEvent.target, y = new CustomEvent(i, { bubbles: !1, cancelable: !0, detail: f });
  o && d.addEventListener(i, o, { once: !0 }), r ? sy(d, y) : d.dispatchEvent(y);
}
te(Zf, "handleAndDispatchCustomEvent");
var Qp = Object.defineProperty, ye = (i, o) => Qp(i, "name", { value: o, configurable: !0 }), xf = "focusScope.autoFocusOnMount", Of = "focusScope.autoFocusOnUnmount", Yh = { bubbles: !1, cancelable: !0 }, Zp = /* @__PURE__ */ _.forwardRef(
  /* @__PURE__ */ ye(function(o, f) {
    const {
      loop: r = !1,
      trapped: d = !1,
      onMountAutoFocus: y,
      onUnmountAutoFocus: b,
      ...x
    } = o, [z, U] = _.useState(null), D = La(y), h = La(b), A = _.useRef(null), G = Xa(f, U), B = _.useRef({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    }).current;
    _.useEffect(() => {
      if (d) {
        let j = function(et) {
          if (B.paused || !z) return;
          const lt = et.target;
          z.contains(lt) ? A.current = lt : Rl(A.current, { select: !0 });
        }, V = function(et) {
          if (B.paused || !z) return;
          const lt = et.relatedTarget;
          lt !== null && (z.contains(lt) || Rl(A.current, { select: !0 }));
        }, X = function(et) {
          if (document.activeElement === document.body)
            for (const dt of et)
              dt.removedNodes.length > 0 && Rl(z);
        };
        ye(j, "handleFocusIn"), ye(V, "handleFocusOut"), ye(X, "handleMutations"), document.addEventListener("focusin", j), document.addEventListener("focusout", V);
        const k = new MutationObserver(X);
        return z && k.observe(z, { childList: !0, subtree: !0 }), () => {
          document.removeEventListener("focusin", j), document.removeEventListener("focusout", V), k.disconnect();
        };
      }
    }, [d, z, B.paused]), _.useEffect(() => {
      if (z) {
        qh.add(B);
        const j = document.activeElement;
        if (!z.contains(j)) {
          const X = new CustomEvent(xf, Yh);
          z.addEventListener(xf, D), z.dispatchEvent(X), X.defaultPrevented || (yy(Ey(Kf(z)), { select: !0 }), document.activeElement === j && Rl(z));
        }
        return () => {
          z.removeEventListener(xf, D), setTimeout(() => {
            const X = new CustomEvent(Of, Yh);
            z.addEventListener(Of, h), z.dispatchEvent(X), X.defaultPrevented || Rl(j ?? document.body, { select: !0 }), z.removeEventListener(Of, h), qh.remove(B);
          }, 0);
        };
      }
    }, [z, D, h, B]);
    const H = _.useCallback(
      (j) => {
        if (!r && !d || B.paused) return;
        const V = j.key === "Tab" && !j.altKey && !j.ctrlKey && !j.metaKey, X = document.activeElement;
        if (V && X) {
          const k = j.currentTarget, [et, lt] = gy(k);
          et && lt ? !j.shiftKey && X === lt ? (j.preventDefault(), r && Rl(et, { select: !0 })) : j.shiftKey && X === et && (j.preventDefault(), r && Rl(lt, { select: !0 })) : X === k && j.preventDefault();
        }
      },
      [r, d, B.paused]
    );
    return /* @__PURE__ */ v.jsx(hn.div, { tabIndex: -1, ...x, ref: G, onKeyDown: H });
  }, "FocusScope")
);
function yy(i, { select: o = !1 } = {}) {
  const f = document.activeElement;
  for (const r of i)
    if (Rl(r, { select: o }), document.activeElement !== f) return;
}
ye(yy, "focusFirst");
function gy(i) {
  const o = Kf(i), f = wf(o, i), r = wf(o.reverse(), i);
  return [f, r];
}
ye(gy, "getTabbableEdges");
function Kf(i) {
  const o = [], f = document.createTreeWalker(i, NodeFilter.SHOW_ELEMENT, {
    acceptNode: /* @__PURE__ */ ye((r) => {
      const d = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || d ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }, "acceptNode")
  });
  for (; f.nextNode(); ) o.push(f.currentNode);
  return o;
}
ye(Kf, "getTabbableCandidates");
function wf(i, o) {
  const f = typeof o.checkVisibility == "function" && o.checkVisibility({ checkVisibilityCSS: !0 });
  for (const r of i)
    if (!(f ? !r.checkVisibility({ checkVisibilityCSS: !0 }) : by(r, { upTo: o })))
      return r;
}
ye(wf, "findVisible");
function by(i, { upTo: o }) {
  if (getComputedStyle(i).visibility === "hidden") return !0;
  for (; i; ) {
    if (o !== void 0 && i === o) return !1;
    if (getComputedStyle(i).display === "none") return !0;
    i = i.parentElement;
  }
  return !1;
}
ye(by, "isHidden");
function py(i) {
  return i instanceof HTMLInputElement && "select" in i;
}
ye(py, "isSelectableInput");
function Rl(i, { select: o = !1 } = {}) {
  if (i && i.focus) {
    const f = document.activeElement;
    i.focus({ preventScroll: !0 }), i !== f && py(i) && o && i.select();
  }
}
ye(Rl, "focus");
var qh = Sy();
function Sy() {
  let i = [];
  return {
    add(o) {
      const f = i[0];
      o !== f && f?.pause(), i = Hf(i, o), i.unshift(o);
    },
    remove(o) {
      i = Hf(i, o), i[0]?.resume();
    }
  };
}
ye(Sy, "createFocusScopesStack");
function Hf(i, o) {
  const f = [...i], r = f.indexOf(o);
  return r !== -1 && f.splice(r, 1), f;
}
ye(Hf, "arrayRemove");
function Ey(i) {
  return i.filter((o) => o.tagName !== "A");
}
ye(Ey, "removeLinks");
var Kp = Object.defineProperty, Jp = (i, o) => Kp(i, "name", { value: o, configurable: !0 }), Fp = /* @__PURE__ */ _.forwardRef(
  /* @__PURE__ */ Jp(function(o, f) {
    const { container: r, ...d } = o, [y, b] = _.useState(!1);
    mn(() => b(!0), []);
    const x = r || y && globalThis?.document?.body;
    return x ? Ga.createPortal(/* @__PURE__ */ v.jsx(hn.div, { ...d, ref: f }), x) : null;
  }, "Portal")
), $p = Object.defineProperty, jl = (i, o) => $p(i, "name", { value: o, configurable: !0 });
function Ty(i, o) {
  return _.useReducer((f, r) => o[f][r] ?? f, i);
}
jl(Ty, "useStateMachine");
var Jf = /* @__PURE__ */ jl((i) => {
  const { present: o, children: f } = i, r = xy(o), d = typeof f == "function" ? f({ present: r.isPresent }) : _.Children.only(f), y = Oy(r.ref, _y(d));
  return typeof f == "function" || r.isPresent ? _.cloneElement(d, { ref: y }) : null;
}, "Presence");
function xy(i) {
  const [o, f] = _.useState(), r = _.useRef(null), d = _.useRef(i), y = _.useRef("none"), b = _.useRef(void 0), x = i ? "mounted" : "unmounted", [z, U] = Ty(x, {
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
  return _.useEffect(() => {
    z === "mounted" ? (y.current = b.current ?? Ba(r.current), b.current = void 0) : y.current = "none";
  }, [z]), mn(() => {
    const D = r.current, h = d.current;
    if (h !== i) {
      const G = y.current, B = Ba(D);
      i ? (b.current = B, U("MOUNT")) : B === "none" || D?.display === "none" ? U("UNMOUNT") : U(h && G !== B ? "ANIMATION_OUT" : "UNMOUNT"), d.current = i;
    }
  }, [i, U]), mn(() => {
    if (o) {
      let D;
      const h = o.ownerDocument.defaultView ?? window, A = /* @__PURE__ */ jl((B) => {
        const j = Ba(r.current).includes(CSS.escape(B.animationName));
        if (B.target === o && j && (U("ANIMATION_END"), !d.current)) {
          const V = o.style.animationFillMode;
          o.style.animationFillMode = "forwards", D = h.setTimeout(() => {
            o.style.animationFillMode === "forwards" && (o.style.animationFillMode = V);
          });
        }
      }, "handleAnimationEnd"), G = /* @__PURE__ */ jl((B) => {
        B.target === o && (y.current = Ba(r.current));
      }, "handleAnimationStart");
      return o.addEventListener("animationstart", G), o.addEventListener("animationcancel", A), o.addEventListener("animationend", A), () => {
        h.clearTimeout(D), o.removeEventListener("animationstart", G), o.removeEventListener("animationcancel", A), o.removeEventListener("animationend", A);
      };
    } else
      U("ANIMATION_END");
  }, [o, U]), {
    isPresent: ["mounted", "unmountSuspended"].includes(z),
    ref: _.useCallback((D) => {
      if (D) {
        const h = getComputedStyle(D);
        r.current = h, b.current = Ba(h);
      } else
        r.current = null;
      f(D);
    }, [])
  };
}
jl(xy, "usePresence");
function Bf(i, o) {
  if (typeof i == "function")
    return i(o);
  i != null && (i.current = o);
}
jl(Bf, "setRef");
function Oy(...i) {
  const o = _.useRef(i);
  return o.current = i, _.useCallback((f) => {
    const r = o.current;
    let d = !1;
    const y = r.map((b) => {
      const x = Bf(b, f);
      return !d && typeof x == "function" && (d = !0), x;
    });
    if (d)
      return () => {
        for (let b = 0; b < y.length; b++) {
          const x = y[b];
          typeof x == "function" ? x() : Bf(r[b], null);
        }
      };
  }, []);
}
jl(Oy, "useStableComposedRefs");
function Ba(i) {
  return i?.animationName || "none";
}
jl(Ba, "getAnimationName");
function _y(i) {
  let o = Object.getOwnPropertyDescriptor(i.props, "ref")?.get, f = o && "isReactWarning" in o && o.isReactWarning;
  return f ? i.ref : (o = Object.getOwnPropertyDescriptor(i, "ref")?.get, f = o && "isReactWarning" in o && o.isReactWarning, f ? i.props.ref : i.props.ref || i.ref);
}
jl(_y, "getElementRef");
var Wp = Object.defineProperty, Ff = (i, o) => Wp(i, "name", { value: o, configurable: !0 }), Oc = 0, ja = null;
function kp(i) {
  return $f(), i.children;
}
Ff(kp, "FocusGuards");
function $f() {
  _.useEffect(() => {
    ja || (ja = { start: Yf(), end: Yf() });
    const { start: i, end: o } = ja;
    return document.body.firstElementChild !== i && document.body.insertAdjacentElement("afterbegin", i), document.body.lastElementChild !== o && document.body.insertAdjacentElement("beforeend", o), Oc++, () => {
      Oc === 1 && (ja?.start.remove(), ja?.end.remove(), ja = null), Oc = Math.max(0, Oc - 1);
    };
  }, []);
}
Ff($f, "useFocusGuards");
function Yf() {
  const i = document.createElement("span");
  return i.setAttribute("data-radix-focus-guard", ""), i.tabIndex = 0, i.style.outline = "none", i.style.opacity = "0", i.style.position = "fixed", i.style.pointerEvents = "none", i;
}
Ff(Yf, "createFocusGuard");
var sl = function() {
  return sl = Object.assign || function(o) {
    for (var f, r = 1, d = arguments.length; r < d; r++) {
      f = arguments[r];
      for (var y in f) Object.prototype.hasOwnProperty.call(f, y) && (o[y] = f[y]);
    }
    return o;
  }, sl.apply(this, arguments);
};
function Ny(i, o) {
  var f = {};
  for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && o.indexOf(r) < 0 && (f[r] = i[r]);
  if (i != null && typeof Object.getOwnPropertySymbols == "function")
    for (var d = 0, r = Object.getOwnPropertySymbols(i); d < r.length; d++)
      o.indexOf(r[d]) < 0 && Object.prototype.propertyIsEnumerable.call(i, r[d]) && (f[r[d]] = i[r[d]]);
  return f;
}
function Ip(i, o, f) {
  if (f || arguments.length === 2) for (var r = 0, d = o.length, y; r < d; r++)
    (y || !(r in o)) && (y || (y = Array.prototype.slice.call(o, 0, r)), y[r] = o[r]);
  return i.concat(y || Array.prototype.slice.call(o));
}
var Dc = "right-scroll-bar-position", Rc = "width-before-scroll-bar", Pp = "with-scroll-bars-hidden", t1 = "--removed-body-scroll-bar-size";
function _f(i, o) {
  return typeof i == "function" ? i(o) : i && (i.current = o), i;
}
function e1(i, o) {
  var f = _.useState(function() {
    return {
      // value
      value: i,
      // last callback
      callback: o,
      // "memoized" public interface
      facade: {
        get current() {
          return f.value;
        },
        set current(r) {
          var d = f.value;
          d !== r && (f.value = r, f.callback(r, d));
        }
      }
    };
  })[0];
  return f.callback = o, f.facade;
}
var l1 = typeof window < "u" ? _.useLayoutEffect : _.useEffect, Gh = /* @__PURE__ */ new WeakMap();
function n1(i, o) {
  var f = e1(null, function(r) {
    return i.forEach(function(d) {
      return _f(d, r);
    });
  });
  return l1(function() {
    var r = Gh.get(f);
    if (r) {
      var d = new Set(r), y = new Set(i), b = f.current;
      d.forEach(function(x) {
        y.has(x) || _f(x, null);
      }), y.forEach(function(x) {
        d.has(x) || _f(x, b);
      });
    }
    Gh.set(f, i);
  }, [i]), f;
}
function a1(i) {
  return i;
}
function u1(i, o) {
  o === void 0 && (o = a1);
  var f = [], r = !1, d = {
    read: function() {
      if (r)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return f.length ? f[f.length - 1] : i;
    },
    useMedium: function(y) {
      var b = o(y, r);
      return f.push(b), function() {
        f = f.filter(function(x) {
          return x !== b;
        });
      };
    },
    assignSyncMedium: function(y) {
      for (r = !0; f.length; ) {
        var b = f;
        f = [], b.forEach(y);
      }
      f = {
        push: function(x) {
          return y(x);
        },
        filter: function() {
          return f;
        }
      };
    },
    assignMedium: function(y) {
      r = !0;
      var b = [];
      if (f.length) {
        var x = f;
        f = [], x.forEach(y), b = f;
      }
      var z = function() {
        var D = b;
        b = [], D.forEach(y);
      }, U = function() {
        return Promise.resolve().then(z);
      };
      U(), f = {
        push: function(D) {
          b.push(D), U();
        },
        filter: function(D) {
          return b = b.filter(D), f;
        }
      };
    }
  };
  return d;
}
function i1(i) {
  i === void 0 && (i = {});
  var o = u1(null);
  return o.options = sl({ async: !0, ssr: !1 }, i), o;
}
var Cy = function(i) {
  var o = i.sideCar, f = Ny(i, ["sideCar"]);
  if (!o)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = o.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return _.createElement(r, sl({}, f));
};
Cy.isSideCarExport = !0;
function c1(i, o) {
  return i.useMedium(o), Cy;
}
var zy = i1(), Nf = function() {
}, jc = _.forwardRef(function(i, o) {
  var f = _.useRef(null), r = _.useState({
    onScrollCapture: Nf,
    onWheelCapture: Nf,
    onTouchMoveCapture: Nf
  }), d = r[0], y = r[1], b = i.forwardProps, x = i.children, z = i.className, U = i.removeScrollBar, D = i.enabled, h = i.shards, A = i.sideCar, G = i.noRelative, B = i.noIsolation, H = i.inert, j = i.allowPinchZoom, V = i.as, X = V === void 0 ? "div" : V, k = i.gapMode, et = Ny(i, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), lt = A, dt = n1([f, o]), W = sl(sl({}, et), d);
  return _.createElement(
    _.Fragment,
    null,
    D && _.createElement(lt, { sideCar: zy, removeScrollBar: U, shards: h, noRelative: G, noIsolation: B, inert: H, setCallbacks: y, allowPinchZoom: !!j, lockRef: f, gapMode: k }),
    b ? _.cloneElement(_.Children.only(x), sl(sl({}, W), { ref: dt })) : _.createElement(X, sl({}, W, { className: z, ref: dt }), x)
  );
});
jc.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
jc.classNames = {
  fullWidth: Rc,
  zeroRight: Dc
};
var o1 = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function r1() {
  if (!document)
    return null;
  var i = document.createElement("style");
  i.type = "text/css";
  var o = o1();
  return o && i.setAttribute("nonce", o), i;
}
function f1(i, o) {
  i.styleSheet ? i.styleSheet.cssText = o : i.appendChild(document.createTextNode(o));
}
function s1(i) {
  var o = document.head || document.getElementsByTagName("head")[0];
  o.appendChild(i);
}
var d1 = function() {
  var i = 0, o = null;
  return {
    add: function(f) {
      i == 0 && (o = r1()) && (f1(o, f), s1(o)), i++;
    },
    remove: function() {
      i--, !i && o && (o.parentNode && o.parentNode.removeChild(o), o = null);
    }
  };
}, v1 = function() {
  var i = d1();
  return function(o, f) {
    _.useEffect(function() {
      return i.add(o), function() {
        i.remove();
      };
    }, [o && f]);
  };
}, Ay = function() {
  var i = v1(), o = function(f) {
    var r = f.styles, d = f.dynamic;
    return i(r, d), null;
  };
  return o;
}, m1 = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Cf = function(i) {
  return parseInt(i || "", 10) || 0;
}, h1 = function(i) {
  var o = window.getComputedStyle(document.body), f = o[i === "padding" ? "paddingLeft" : "marginLeft"], r = o[i === "padding" ? "paddingTop" : "marginTop"], d = o[i === "padding" ? "paddingRight" : "marginRight"];
  return [Cf(f), Cf(r), Cf(d)];
}, y1 = function(i) {
  if (i === void 0 && (i = "margin"), typeof window > "u")
    return m1;
  var o = h1(i), f = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: o[0],
    top: o[1],
    right: o[2],
    gap: Math.max(0, r - f + o[2] - o[0])
  };
}, g1 = Ay(), Ya = "data-scroll-locked", b1 = function(i, o, f, r) {
  var d = i.left, y = i.top, b = i.right, x = i.gap;
  return f === void 0 && (f = "margin"), `
  .`.concat(Pp, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(x, "px ").concat(r, `;
  }
  body[`).concat(Ya, `] {
    overflow: hidden `).concat(r, `;
    overscroll-behavior: contain;
    `).concat([
    o && "position: relative ".concat(r, ";"),
    f === "margin" && `
    padding-left: `.concat(d, `px;
    padding-top: `).concat(y, `px;
    padding-right: `).concat(b, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(x, "px ").concat(r, `;
    `),
    f === "padding" && "padding-right: ".concat(x, "px ").concat(r, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(Dc, ` {
    right: `).concat(x, "px ").concat(r, `;
  }
  
  .`).concat(Rc, ` {
    margin-right: `).concat(x, "px ").concat(r, `;
  }
  
  .`).concat(Dc, " .").concat(Dc, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(Rc, " .").concat(Rc, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(Ya, `] {
    `).concat(t1, ": ").concat(x, `px;
  }
`);
}, Lh = function() {
  var i = parseInt(document.body.getAttribute(Ya) || "0", 10);
  return isFinite(i) ? i : 0;
}, p1 = function() {
  _.useEffect(function() {
    return document.body.setAttribute(Ya, (Lh() + 1).toString()), function() {
      var i = Lh() - 1;
      i <= 0 ? document.body.removeAttribute(Ya) : document.body.setAttribute(Ya, i.toString());
    };
  }, []);
}, S1 = function(i) {
  var o = i.noRelative, f = i.noImportant, r = i.gapMode, d = r === void 0 ? "margin" : r;
  p1();
  var y = _.useMemo(function() {
    return y1(d);
  }, [d]);
  return _.createElement(g1, { styles: b1(y, !o, d, f ? "" : "!important") });
}, qf = !1;
if (typeof window < "u")
  try {
    var _c = Object.defineProperty({}, "passive", {
      get: function() {
        return qf = !0, !0;
      }
    });
    window.addEventListener("test", _c, _c), window.removeEventListener("test", _c, _c);
  } catch {
    qf = !1;
  }
var Ua = qf ? { passive: !1 } : !1, E1 = function(i) {
  return i.tagName === "TEXTAREA";
}, Dy = function(i, o) {
  if (!(i instanceof Element))
    return !1;
  var f = window.getComputedStyle(i);
  return (
    // not-not-scrollable
    f[o] !== "hidden" && // contains scroll inside self
    !(f.overflowY === f.overflowX && !E1(i) && f[o] === "visible")
  );
}, T1 = function(i) {
  return Dy(i, "overflowY");
}, x1 = function(i) {
  return Dy(i, "overflowX");
}, Vh = function(i, o) {
  var f = o.ownerDocument, r = o;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var d = Ry(i, r);
    if (d) {
      var y = My(i, r), b = y[1], x = y[2];
      if (b > x)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== f.body);
  return !1;
}, O1 = function(i) {
  var o = i.scrollTop, f = i.scrollHeight, r = i.clientHeight;
  return [
    o,
    f,
    r
  ];
}, _1 = function(i) {
  var o = i.scrollLeft, f = i.scrollWidth, r = i.clientWidth;
  return [
    o,
    f,
    r
  ];
}, Ry = function(i, o) {
  return i === "v" ? T1(o) : x1(o);
}, My = function(i, o) {
  return i === "v" ? O1(o) : _1(o);
}, N1 = function(i, o) {
  return i === "h" && o === "rtl" ? -1 : 1;
}, C1 = function(i, o, f, r, d) {
  var y = N1(i, window.getComputedStyle(o).direction), b = y * r, x = f.target, z = o.contains(x), U = !1, D = b > 0, h = 0, A = 0;
  do {
    if (!x)
      break;
    var G = My(i, x), B = G[0], H = G[1], j = G[2], V = H - j - y * B;
    (B || V) && Ry(i, x) && (h += V, A += B);
    var X = x.parentNode;
    x = X && X.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? X.host : X;
  } while (
    // portaled content
    !z && x !== document.body || // self content
    z && (o.contains(x) || o === x)
  );
  return (D && Math.abs(h) < 1 || !D && Math.abs(A) < 1) && (U = !0), U;
}, Nc = function(i) {
  return "changedTouches" in i ? [i.changedTouches[0].clientX, i.changedTouches[0].clientY] : [0, 0];
}, Xh = function(i) {
  return [i.deltaX, i.deltaY];
}, Qh = function(i) {
  return i && "current" in i ? i.current : i;
}, z1 = function(i, o) {
  return i[0] === o[0] && i[1] === o[1];
}, A1 = function(i) {
  return `
  .block-interactivity-`.concat(i, ` {pointer-events: none;}
  .allow-interactivity-`).concat(i, ` {pointer-events: all;}
`);
}, D1 = 0, wa = [];
function R1(i) {
  var o = _.useRef([]), f = _.useRef([0, 0]), r = _.useRef(), d = _.useState(D1++)[0], y = _.useState(Ay)[0], b = _.useRef(i);
  _.useEffect(function() {
    b.current = i;
  }, [i]), _.useEffect(function() {
    if (i.inert) {
      document.body.classList.add("block-interactivity-".concat(d));
      var H = Ip([i.lockRef.current], (i.shards || []).map(Qh), !0).filter(Boolean);
      return H.forEach(function(j) {
        return j.classList.add("allow-interactivity-".concat(d));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(d)), H.forEach(function(j) {
          return j.classList.remove("allow-interactivity-".concat(d));
        });
      };
    }
  }, [i.inert, i.lockRef.current, i.shards]);
  var x = _.useCallback(function(H, j) {
    if ("touches" in H && H.touches.length === 2 || H.type === "wheel" && H.ctrlKey)
      return !b.current.allowPinchZoom;
    var V = Nc(H), X = f.current, k = "deltaX" in H ? H.deltaX : X[0] - V[0], et = "deltaY" in H ? H.deltaY : X[1] - V[1], lt, dt = H.target, W = Math.abs(k) > Math.abs(et) ? "h" : "v";
    if ("touches" in H && W === "h" && dt.type === "range")
      return !1;
    var ot = window.getSelection(), Gt = ot && ot.anchorNode, Lt = Gt ? Gt === dt || Gt.contains(dt) : !1;
    if (Lt)
      return !1;
    var jt = Vh(W, dt);
    if (!jt)
      return !0;
    if (jt ? lt = W : (lt = W === "v" ? "h" : "v", jt = Vh(W, dt)), !jt)
      return !1;
    if (!r.current && "changedTouches" in H && (k || et) && (r.current = lt), !lt)
      return !0;
    var Z = r.current || lt;
    return C1(Z, j, H, Z === "h" ? k : et);
  }, []), z = _.useCallback(function(H) {
    var j = H;
    if (!(!wa.length || wa[wa.length - 1] !== y)) {
      var V = "deltaY" in j ? Xh(j) : Nc(j), X = o.current.filter(function(lt) {
        return lt.name === j.type && (lt.target === j.target || j.target === lt.shadowParent) && z1(lt.delta, V);
      })[0];
      if (X && X.should) {
        j.cancelable && j.preventDefault();
        return;
      }
      if (!X) {
        var k = (b.current.shards || []).map(Qh).filter(Boolean).filter(function(lt) {
          return lt.contains(j.target);
        }), et = k.length > 0 ? x(j, k[0]) : !b.current.noIsolation;
        et && j.cancelable && j.preventDefault();
      }
    }
  }, []), U = _.useCallback(function(H, j, V, X) {
    var k = { name: H, delta: j, target: V, should: X, shadowParent: M1(V) };
    o.current.push(k), setTimeout(function() {
      o.current = o.current.filter(function(et) {
        return et !== k;
      });
    }, 1);
  }, []), D = _.useCallback(function(H) {
    f.current = Nc(H), r.current = void 0;
  }, []), h = _.useCallback(function(H) {
    U(H.type, Xh(H), H.target, x(H, i.lockRef.current));
  }, []), A = _.useCallback(function(H) {
    U(H.type, Nc(H), H.target, x(H, i.lockRef.current));
  }, []);
  _.useEffect(function() {
    return wa.push(y), i.setCallbacks({
      onScrollCapture: h,
      onWheelCapture: h,
      onTouchMoveCapture: A
    }), document.addEventListener("wheel", z, Ua), document.addEventListener("touchmove", z, Ua), document.addEventListener("touchstart", D, Ua), function() {
      wa = wa.filter(function(H) {
        return H !== y;
      }), document.removeEventListener("wheel", z, Ua), document.removeEventListener("touchmove", z, Ua), document.removeEventListener("touchstart", D, Ua);
    };
  }, []);
  var G = i.removeScrollBar, B = i.inert;
  return _.createElement(
    _.Fragment,
    null,
    B ? _.createElement(y, { styles: A1(d) }) : null,
    G ? _.createElement(S1, { noRelative: i.noRelative, gapMode: i.gapMode }) : null
  );
}
function M1(i) {
  for (var o = null; i !== null; )
    i instanceof ShadowRoot && (o = i.host, i = i.host), i = i.parentNode;
  return o;
}
const j1 = c1(zy, R1);
var jy = _.forwardRef(function(i, o) {
  return _.createElement(jc, sl({}, i, { ref: o, sideCar: j1 }));
});
jy.classNames = jc.classNames;
var U1 = function(i) {
  if (typeof document > "u")
    return null;
  var o = Array.isArray(i) ? i[0] : i;
  return o.ownerDocument.body;
}, Ha = /* @__PURE__ */ new WeakMap(), Cc = /* @__PURE__ */ new WeakMap(), zc = {}, zf = 0, Uy = function(i) {
  return i && (i.host || Uy(i.parentNode));
}, w1 = function(i, o) {
  return o.map(function(f) {
    if (i.contains(f))
      return f;
    var r = Uy(f);
    return r && i.contains(r) ? r : (console.error("aria-hidden", f, "in not contained inside", i, ". Doing nothing"), null);
  }).filter(function(f) {
    return !!f;
  });
}, H1 = function(i, o, f, r) {
  var d = w1(o, Array.isArray(i) ? i : [i]);
  zc[f] || (zc[f] = /* @__PURE__ */ new WeakMap());
  var y = zc[f], b = [], x = /* @__PURE__ */ new Set(), z = new Set(d), U = function(h) {
    !h || x.has(h) || (x.add(h), U(h.parentNode));
  };
  d.forEach(U);
  var D = function(h) {
    !h || z.has(h) || Array.prototype.forEach.call(h.children, function(A) {
      if (x.has(A))
        D(A);
      else
        try {
          var G = A.getAttribute(r), B = G !== null && G !== "false", H = (Ha.get(A) || 0) + 1, j = (y.get(A) || 0) + 1;
          Ha.set(A, H), y.set(A, j), b.push(A), H === 1 && B && Cc.set(A, !0), j === 1 && A.setAttribute(f, "true"), B || A.setAttribute(r, "true");
        } catch (V) {
          console.error("aria-hidden: cannot operate on ", A, V);
        }
    });
  };
  return D(o), x.clear(), zf++, function() {
    b.forEach(function(h) {
      var A = Ha.get(h) - 1, G = y.get(h) - 1;
      Ha.set(h, A), y.set(h, G), A || (Cc.has(h) || h.removeAttribute(r), Cc.delete(h)), G || h.removeAttribute(f);
    }), zf--, zf || (Ha = /* @__PURE__ */ new WeakMap(), Ha = /* @__PURE__ */ new WeakMap(), Cc = /* @__PURE__ */ new WeakMap(), zc = {});
  };
}, B1 = function(i, o, f) {
  f === void 0 && (f = "data-aria-hidden");
  var r = Array.from(Array.isArray(i) ? i : [i]), d = U1(i);
  return d ? (r.push.apply(r, Array.from(d.querySelectorAll("[aria-live], script"))), H1(r, d, f, "aria-hidden")) : function() {
    return null;
  };
}, Y1 = Object.defineProperty, Qe = (i, o) => Y1(i, "name", { value: o, configurable: !0 }), Wf = "Dialog", [wy, WS] = /* @__PURE__ */ ty(Wf), [q1, dl] = wy(Wf), G1 = /* @__PURE__ */ Qe((i) => {
  const {
    __scopeDialog: o,
    children: f,
    open: r,
    defaultOpen: d,
    onOpenChange: y,
    modal: b = !0
  } = i, x = _.useRef(null), z = _.useRef(null), [U, D] = ny({
    prop: r,
    defaultProp: d ?? !1,
    onChange: y,
    caller: Wf
  }), [h, A] = _.useState(0), [G, B] = _.useState(0);
  return /* @__PURE__ */ v.jsx(
    q1,
    {
      scope: o,
      triggerRef: x,
      contentRef: z,
      contentId: Ac(),
      titleId: Ac(),
      descriptionId: Ac(),
      titlePresent: h > 0,
      descriptionPresent: G > 0,
      setTitleCount: A,
      setDescriptionCount: B,
      open: U,
      onOpenChange: D,
      onOpenToggle: _.useCallback(() => D((H) => !H), [D]),
      modal: b,
      children: f
    }
  );
}, "Dialog"), Hy = "DialogPortal", [L1, By] = wy(Hy, {
  forceMount: void 0
}), V1 = /* @__PURE__ */ Qe((i) => {
  const { __scopeDialog: o, forceMount: f, children: r, container: d } = i, y = dl(Hy, o);
  return /* @__PURE__ */ v.jsx(L1, { scope: o, forceMount: f, children: _.Children.map(r, (b) => /* @__PURE__ */ v.jsx(Jf, { present: f || y.open, children: /* @__PURE__ */ v.jsx(Fp, { asChild: !0, container: d, children: b }) })) });
}, "DialogPortal"), Gf = "DialogOverlay", Yy = /* @__PURE__ */ _.forwardRef(
  /* @__PURE__ */ Qe(function(o, f) {
    const r = By(Gf, o.__scopeDialog), { forceMount: d = r.forceMount, ...y } = o, b = dl(Gf, o.__scopeDialog);
    return b.modal ? /* @__PURE__ */ v.jsx(Jf, { present: d || b.open, children: /* @__PURE__ */ v.jsx(Q1, { ...y, ref: f }) }) : null;
  }, "DialogOverlay")
), X1 = /* @__PURE__ */ Mc("DialogOverlay.RemoveScroll"), Q1 = /* @__PURE__ */ _.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Qe(function(o, f) {
    const { __scopeDialog: r, ...d } = o, y = dl(Gf, r), b = vy(), x = Xa(f, b);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ v.jsx(jy, { as: X1, allowPinchZoom: !0, shards: [y.contentRef], children: /* @__PURE__ */ v.jsx(
        hn.div,
        {
          "data-state": kf(y.open),
          ...d,
          ref: x,
          style: { pointerEvents: "auto", ...d.style }
        }
      ) })
    );
  }, "DialogOverlayImpl")
), Xu = "DialogContent", qy = /* @__PURE__ */ _.forwardRef(
  /* @__PURE__ */ Qe(function(o, f) {
    const r = By(Xu, o.__scopeDialog), { forceMount: d = r.forceMount, ...y } = o, b = dl(Xu, o.__scopeDialog);
    return /* @__PURE__ */ v.jsx(Jf, { present: d || b.open, children: b.modal ? /* @__PURE__ */ v.jsx(Z1, { ...y, ref: f }) : /* @__PURE__ */ v.jsx(K1, { ...y, ref: f }) });
  }, "DialogContent")
), Z1 = /* @__PURE__ */ _.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Qe(function(o, f) {
    const r = dl(Xu, o.__scopeDialog), d = _.useRef(null), y = Xa(f, r.contentRef, d);
    return _.useEffect(() => {
      const b = d.current;
      if (b) return B1(b);
    }, []), /* @__PURE__ */ v.jsx(
      Gy,
      {
        ...o,
        ref: y,
        trapFocus: r.open,
        disableOutsidePointerEvents: r.open,
        onCloseAutoFocus: vn(o.onCloseAutoFocus, (b) => {
          b.preventDefault(), r.triggerRef.current?.focus();
        }),
        onPointerDownOutside: vn(o.onPointerDownOutside, (b) => {
          const x = b.detail.originalEvent, z = x.button === 0 && x.ctrlKey === !0;
          (x.button === 2 || z) && b.preventDefault();
        }),
        onFocusOutside: vn(
          o.onFocusOutside,
          (b) => b.preventDefault()
        )
      }
    );
  }, "DialogContentModal")
), K1 = /* @__PURE__ */ _.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Qe(function(o, f) {
    const r = dl(Xu, o.__scopeDialog), d = _.useRef(!1), y = _.useRef(!1);
    return /* @__PURE__ */ v.jsx(
      Gy,
      {
        ...o,
        ref: f,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (b) => {
          o.onCloseAutoFocus?.(b), b.defaultPrevented || (d.current || r.triggerRef.current?.focus(), b.preventDefault()), d.current = !1, y.current = !1;
        },
        onInteractOutside: (b) => {
          o.onInteractOutside?.(b), b.defaultPrevented || (d.current = !0, b.detail.originalEvent.type === "pointerdown" && (y.current = !0));
          const x = b.target;
          r.triggerRef.current?.contains(x) && b.preventDefault(), b.detail.originalEvent.type === "focusin" && y.current && b.preventDefault();
        }
      }
    );
  }, "DialogContentNonModal")
), Gy = /* @__PURE__ */ _.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Qe(function(o, f) {
    const { __scopeDialog: r, trapFocus: d, onOpenAutoFocus: y, onCloseAutoFocus: b, ...x } = o, z = dl(Xu, r);
    return $f(), /* @__PURE__ */ v.jsx(v.Fragment, { children: /* @__PURE__ */ v.jsx(
      Zp,
      {
        asChild: !0,
        loop: !0,
        trapped: d,
        onMountAutoFocus: y,
        onUnmountAutoFocus: b,
        children: /* @__PURE__ */ v.jsx(
          Vp,
          {
            role: "dialog",
            id: z.contentId,
            "aria-describedby": z.descriptionPresent ? z.descriptionId : void 0,
            "aria-labelledby": z.titlePresent ? z.titleId : void 0,
            "data-state": kf(z.open),
            ...x,
            ref: f,
            deferPointerDownOutside: !0,
            onDismiss: () => z.onOpenChange(!1)
          }
        )
      }
    ) });
  }, "DialogContentImpl")
), J1 = "DialogTitle", Ly = /* @__PURE__ */ _.forwardRef(
  /* @__PURE__ */ Qe(function(o, f) {
    const { __scopeDialog: r, ...d } = o, y = dl(J1, r), { setTitleCount: b } = y;
    return mn(() => (b((x) => x + 1), () => b((x) => x - 1)), [b]), /* @__PURE__ */ v.jsx(hn.h2, { id: y.titleId, ...d, ref: f });
  }, "DialogTitle")
), F1 = "DialogDescription", Vy = /* @__PURE__ */ _.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Qe(function(o, f) {
    const { __scopeDialog: r, ...d } = o, y = dl(F1, r), { setDescriptionCount: b } = y;
    return mn(() => (b((x) => x + 1), () => b((x) => x - 1)), [b]), /* @__PURE__ */ v.jsx(hn.p, { id: y.descriptionId, ...d, ref: f });
  }, "DialogDescription")
), $1 = "DialogClose", W1 = /* @__PURE__ */ _.forwardRef(
  /* @__PURE__ */ Qe(function(o, f) {
    const { __scopeDialog: r, ...d } = o, y = dl($1, r);
    return /* @__PURE__ */ v.jsx(
      hn.button,
      {
        type: "button",
        ...d,
        ref: f,
        onClick: vn(o.onClick, () => y.onOpenChange(!1))
      }
    );
  }, "DialogClose")
);
function kf(i) {
  return i ? "open" : "closed";
}
Qe(kf, "getState");
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k1 = (i) => i.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Xy = (...i) => i.filter((o, f, r) => !!o && o.trim() !== "" && r.indexOf(o) === f).join(" ").trim();
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var I1 = {
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
const P1 = _.forwardRef(
  ({
    color: i = "currentColor",
    size: o = 24,
    strokeWidth: f = 2,
    absoluteStrokeWidth: r,
    className: d = "",
    children: y,
    iconNode: b,
    ...x
  }, z) => _.createElement(
    "svg",
    {
      ref: z,
      ...I1,
      width: o,
      height: o,
      stroke: i,
      strokeWidth: r ? Number(f) * 24 / Number(o) : f,
      className: Xy("lucide", d),
      ...x
    },
    [
      ...b.map(([U, D]) => _.createElement(U, D)),
      ...Array.isArray(y) ? y : [y]
    ]
  )
);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tS = (i, o) => {
  const f = _.forwardRef(
    ({ className: r, ...d }, y) => _.createElement(P1, {
      ref: y,
      iconNode: o,
      className: Xy(`lucide-${k1(i)}`, r),
      ...d
    })
  );
  return f.displayName = `${i}`, f;
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eS = tS("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
function Qy(i) {
  var o, f, r = "";
  if (typeof i == "string" || typeof i == "number") r += i;
  else if (typeof i == "object") if (Array.isArray(i)) {
    var d = i.length;
    for (o = 0; o < d; o++) i[o] && (f = Qy(i[o])) && (r && (r += " "), r += f);
  } else for (f in i) i[f] && (r && (r += " "), r += f);
  return r;
}
function Zy() {
  for (var i, o, f = 0, r = "", d = arguments.length; f < d; f++) (i = arguments[f]) && (o = Qy(i)) && (r && (r += " "), r += o);
  return r;
}
const If = "-", lS = (i) => {
  const o = aS(i), {
    conflictingClassGroups: f,
    conflictingClassGroupModifiers: r
  } = i;
  return {
    getClassGroupId: (b) => {
      const x = b.split(If);
      return x[0] === "" && x.length !== 1 && x.shift(), Ky(x, o) || nS(b);
    },
    getConflictingClassGroupIds: (b, x) => {
      const z = f[b] || [];
      return x && r[b] ? [...z, ...r[b]] : z;
    }
  };
}, Ky = (i, o) => {
  if (i.length === 0)
    return o.classGroupId;
  const f = i[0], r = o.nextPart.get(f), d = r ? Ky(i.slice(1), r) : void 0;
  if (d)
    return d;
  if (o.validators.length === 0)
    return;
  const y = i.join(If);
  return o.validators.find(({
    validator: b
  }) => b(y))?.classGroupId;
}, Zh = /^\[(.+)\]$/, nS = (i) => {
  if (Zh.test(i)) {
    const o = Zh.exec(i)[1], f = o?.substring(0, o.indexOf(":"));
    if (f)
      return "arbitrary.." + f;
  }
}, aS = (i) => {
  const {
    theme: o,
    prefix: f
  } = i, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return iS(Object.entries(i.classGroups), f).forEach(([y, b]) => {
    Lf(b, r, y, o);
  }), r;
}, Lf = (i, o, f, r) => {
  i.forEach((d) => {
    if (typeof d == "string") {
      const y = d === "" ? o : Kh(o, d);
      y.classGroupId = f;
      return;
    }
    if (typeof d == "function") {
      if (uS(d)) {
        Lf(d(r), o, f, r);
        return;
      }
      o.validators.push({
        validator: d,
        classGroupId: f
      });
      return;
    }
    Object.entries(d).forEach(([y, b]) => {
      Lf(b, Kh(o, y), f, r);
    });
  });
}, Kh = (i, o) => {
  let f = i;
  return o.split(If).forEach((r) => {
    f.nextPart.has(r) || f.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), f = f.nextPart.get(r);
  }), f;
}, uS = (i) => i.isThemeGetter, iS = (i, o) => o ? i.map(([f, r]) => {
  const d = r.map((y) => typeof y == "string" ? o + y : typeof y == "object" ? Object.fromEntries(Object.entries(y).map(([b, x]) => [o + b, x])) : y);
  return [f, d];
}) : i, cS = (i) => {
  if (i < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let o = 0, f = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const d = (y, b) => {
    f.set(y, b), o++, o > i && (o = 0, r = f, f = /* @__PURE__ */ new Map());
  };
  return {
    get(y) {
      let b = f.get(y);
      if (b !== void 0)
        return b;
      if ((b = r.get(y)) !== void 0)
        return d(y, b), b;
    },
    set(y, b) {
      f.has(y) ? f.set(y, b) : d(y, b);
    }
  };
}, Jy = "!", oS = (i) => {
  const {
    separator: o,
    experimentalParseClassName: f
  } = i, r = o.length === 1, d = o[0], y = o.length, b = (x) => {
    const z = [];
    let U = 0, D = 0, h;
    for (let j = 0; j < x.length; j++) {
      let V = x[j];
      if (U === 0) {
        if (V === d && (r || x.slice(j, j + y) === o)) {
          z.push(x.slice(D, j)), D = j + y;
          continue;
        }
        if (V === "/") {
          h = j;
          continue;
        }
      }
      V === "[" ? U++ : V === "]" && U--;
    }
    const A = z.length === 0 ? x : x.substring(D), G = A.startsWith(Jy), B = G ? A.substring(1) : A, H = h && h > D ? h - D : void 0;
    return {
      modifiers: z,
      hasImportantModifier: G,
      baseClassName: B,
      maybePostfixModifierPosition: H
    };
  };
  return f ? (x) => f({
    className: x,
    parseClassName: b
  }) : b;
}, rS = (i) => {
  if (i.length <= 1)
    return i;
  const o = [];
  let f = [];
  return i.forEach((r) => {
    r[0] === "[" ? (o.push(...f.sort(), r), f = []) : f.push(r);
  }), o.push(...f.sort()), o;
}, fS = (i) => ({
  cache: cS(i.cacheSize),
  parseClassName: oS(i),
  ...lS(i)
}), sS = /\s+/, dS = (i, o) => {
  const {
    parseClassName: f,
    getClassGroupId: r,
    getConflictingClassGroupIds: d
  } = o, y = [], b = i.trim().split(sS);
  let x = "";
  for (let z = b.length - 1; z >= 0; z -= 1) {
    const U = b[z], {
      modifiers: D,
      hasImportantModifier: h,
      baseClassName: A,
      maybePostfixModifierPosition: G
    } = f(U);
    let B = !!G, H = r(B ? A.substring(0, G) : A);
    if (!H) {
      if (!B) {
        x = U + (x.length > 0 ? " " + x : x);
        continue;
      }
      if (H = r(A), !H) {
        x = U + (x.length > 0 ? " " + x : x);
        continue;
      }
      B = !1;
    }
    const j = rS(D).join(":"), V = h ? j + Jy : j, X = V + H;
    if (y.includes(X))
      continue;
    y.push(X);
    const k = d(H, B);
    for (let et = 0; et < k.length; ++et) {
      const lt = k[et];
      y.push(V + lt);
    }
    x = U + (x.length > 0 ? " " + x : x);
  }
  return x;
};
function vS() {
  let i = 0, o, f, r = "";
  for (; i < arguments.length; )
    (o = arguments[i++]) && (f = Fy(o)) && (r && (r += " "), r += f);
  return r;
}
const Fy = (i) => {
  if (typeof i == "string")
    return i;
  let o, f = "";
  for (let r = 0; r < i.length; r++)
    i[r] && (o = Fy(i[r])) && (f && (f += " "), f += o);
  return f;
};
function mS(i, ...o) {
  let f, r, d, y = b;
  function b(z) {
    const U = o.reduce((D, h) => h(D), i());
    return f = fS(U), r = f.cache.get, d = f.cache.set, y = x, x(z);
  }
  function x(z) {
    const U = r(z);
    if (U)
      return U;
    const D = dS(z, f);
    return d(z, D), D;
  }
  return function() {
    return y(vS.apply(null, arguments));
  };
}
const Ut = (i) => {
  const o = (f) => f[i] || [];
  return o.isThemeGetter = !0, o;
}, $y = /^\[(?:([a-z-]+):)?(.+)\]$/i, hS = /^\d+\/\d+$/, yS = /* @__PURE__ */ new Set(["px", "full", "screen"]), gS = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, bS = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, pS = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, SS = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, ES = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Dl = (i) => qa(i) || yS.has(i) || hS.test(i), sn = (i) => Qa(i, "length", AS), qa = (i) => !!i && !Number.isNaN(Number(i)), Af = (i) => Qa(i, "number", qa), Lu = (i) => !!i && Number.isInteger(Number(i)), TS = (i) => i.endsWith("%") && qa(i.slice(0, -1)), ct = (i) => $y.test(i), dn = (i) => gS.test(i), xS = /* @__PURE__ */ new Set(["length", "size", "percentage"]), OS = (i) => Qa(i, xS, Wy), _S = (i) => Qa(i, "position", Wy), NS = /* @__PURE__ */ new Set(["image", "url"]), CS = (i) => Qa(i, NS, RS), zS = (i) => Qa(i, "", DS), Vu = () => !0, Qa = (i, o, f) => {
  const r = $y.exec(i);
  return r ? r[1] ? typeof o == "string" ? r[1] === o : o.has(r[1]) : f(r[2]) : !1;
}, AS = (i) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  bS.test(i) && !pS.test(i)
), Wy = () => !1, DS = (i) => SS.test(i), RS = (i) => ES.test(i), MS = () => {
  const i = Ut("colors"), o = Ut("spacing"), f = Ut("blur"), r = Ut("brightness"), d = Ut("borderColor"), y = Ut("borderRadius"), b = Ut("borderSpacing"), x = Ut("borderWidth"), z = Ut("contrast"), U = Ut("grayscale"), D = Ut("hueRotate"), h = Ut("invert"), A = Ut("gap"), G = Ut("gradientColorStops"), B = Ut("gradientColorStopPositions"), H = Ut("inset"), j = Ut("margin"), V = Ut("opacity"), X = Ut("padding"), k = Ut("saturate"), et = Ut("scale"), lt = Ut("sepia"), dt = Ut("skew"), W = Ut("space"), ot = Ut("translate"), Gt = () => ["auto", "contain", "none"], Lt = () => ["auto", "hidden", "clip", "visible", "scroll"], jt = () => ["auto", ct, o], Z = () => [ct, o], fe = () => ["", Dl, sn], se = () => ["auto", qa, ct], Ht = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], q = () => ["solid", "dashed", "dotted", "double", "none"], I = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], P = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], yt = () => ["", "0", ct], gt = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], Vt = () => [qa, ct];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Vu],
      spacing: [Dl, sn],
      blur: ["none", "", dn, ct],
      brightness: Vt(),
      borderColor: [i],
      borderRadius: ["none", "", "full", dn, ct],
      borderSpacing: Z(),
      borderWidth: fe(),
      contrast: Vt(),
      grayscale: yt(),
      hueRotate: Vt(),
      invert: yt(),
      gap: Z(),
      gradientColorStops: [i],
      gradientColorStopPositions: [TS, sn],
      inset: jt(),
      margin: jt(),
      opacity: Vt(),
      padding: Z(),
      saturate: Vt(),
      scale: Vt(),
      sepia: yt(),
      skew: Vt(),
      space: Z(),
      translate: Z()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", ct]
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
        columns: [dn]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": gt()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": gt()
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
        object: [...Ht(), ct]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: Lt()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": Lt()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": Lt()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: Gt()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": Gt()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": Gt()
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
        inset: [H]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [H]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [H]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [H]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [H]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [H]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [H]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [H]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [H]
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
        z: ["auto", Lu, ct]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: jt()
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
        flex: ["1", "auto", "initial", "none", ct]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: yt()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: yt()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", Lu, ct]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [Vu]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Lu, ct]
        }, ct]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": se()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": se()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [Vu]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Lu, ct]
        }, ct]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": se()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": se()
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
        "auto-cols": ["auto", "min", "max", "fr", ct]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", ct]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [A]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [A]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [A]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...P()]
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
        content: ["normal", ...P(), "baseline"]
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
        "place-content": [...P(), "baseline"]
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
        p: [X]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [X]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [X]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [X]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [X]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [X]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [X]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [X]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [X]
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
        "space-x": [W]
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
        "space-y": [W]
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
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", ct, o]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [ct, o, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [ct, o, "none", "full", "min", "max", "fit", "prose", {
          screen: [dn]
        }, dn]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [ct, o, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [ct, o, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [ct, o, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [ct, o, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", dn, sn]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Af]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Vu]
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
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", ct]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", qa, Af]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", Dl, ct]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", ct]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", ct]
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
        placeholder: [i]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [V]
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
        text: [i]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [V]
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
        decoration: [...q(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", Dl, sn]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", Dl, ct]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [i]
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
        indent: Z()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", ct]
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
        content: ["none", ct]
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
        "bg-opacity": [V]
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
        bg: [...Ht(), _S]
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
        bg: ["auto", "cover", "contain", OS]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, CS]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [i]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [B]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [B]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [B]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [G]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [G]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [G]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [y]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [y]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [y]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [y]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [y]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [y]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [y]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [y]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [y]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [y]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [y]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [y]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [y]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [y]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [y]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [x]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [x]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [x]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [x]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [x]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [x]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [x]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [x]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [x]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [V]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...q(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [x]
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
        "divide-y": [x]
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
        "divide-opacity": [V]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: q()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [d]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [d]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [d]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [d]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [d]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [d]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [d]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [d]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [d]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [d]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...q()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [Dl, ct]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [Dl, sn]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [i]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: fe()
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
        ring: [i]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [V]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [Dl, sn]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [i]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", dn, zS]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [Vu]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [V]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...I(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": I()
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
        blur: [f]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [r]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [z]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", dn, ct]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [U]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [D]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [h]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [k]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [lt]
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
        "backdrop-blur": [f]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [r]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [z]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [U]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [D]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [h]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [V]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [k]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [lt]
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
        "border-spacing": [b]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [b]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [b]
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
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", ct]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: Vt()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", ct]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: Vt()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", ct]
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
        scale: [et]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [et]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [et]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [Lu, ct]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [ot]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [ot]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [dt]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [dt]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", ct]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", i]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", ct]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [i]
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
        "scroll-m": Z()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": Z()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": Z()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": Z()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": Z()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": Z()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": Z()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": Z()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": Z()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": Z()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": Z()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": Z()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": Z()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": Z()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": Z()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": Z()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": Z()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": Z()
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
        "will-change": ["auto", "scroll", "contents", "transform", ct]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [i, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [Dl, sn, Af]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [i, "none"]
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
}, jS = /* @__PURE__ */ mS(MS);
function Ul(...i) {
  return jS(Zy(i));
}
const US = G1, wS = V1, ky = _.forwardRef(({ className: i, ...o }, f) => /* @__PURE__ */ v.jsx(
  Yy,
  {
    ref: f,
    className: Ul(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      i
    ),
    ...o
  }
));
ky.displayName = Yy.displayName;
const Iy = _.forwardRef(({ className: i, children: o, closeLabel: f = "Close", ...r }, d) => /* @__PURE__ */ v.jsxs(wS, { children: [
  /* @__PURE__ */ v.jsx(ky, {}),
  /* @__PURE__ */ v.jsxs(
    qy,
    {
      ref: d,
      className: Ul(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        i
      ),
      ...r,
      children: [
        o,
        /* @__PURE__ */ v.jsxs(W1, { "aria-label": f, title: f, className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ v.jsx(eS, { className: "h-4 w-4" }),
          /* @__PURE__ */ v.jsx("span", { className: "sr-only", children: f })
        ] })
      ]
    }
  )
] }));
Iy.displayName = qy.displayName;
const Py = _.forwardRef(({ className: i, ...o }, f) => /* @__PURE__ */ v.jsx(
  Ly,
  {
    ref: f,
    className: Ul(
      "text-lg font-semibold leading-none tracking-tight",
      i
    ),
    ...o
  }
));
Py.displayName = Ly.displayName;
const HS = _.forwardRef(({ className: i, ...o }, f) => /* @__PURE__ */ v.jsx(
  Vy,
  {
    ref: f,
    className: Ul("text-sm text-muted-foreground", i),
    ...o
  }
));
HS.displayName = Vy.displayName;
const Jh = (i) => typeof i == "boolean" ? `${i}` : i === 0 ? "0" : i, Fh = Zy, tg = (i, o) => (f) => {
  var r;
  if (o?.variants == null) return Fh(i, f?.class, f?.className);
  const { variants: d, defaultVariants: y } = o, b = Object.keys(d).map((U) => {
    const D = f?.[U], h = y?.[U];
    if (D === null) return null;
    const A = Jh(D) || Jh(h);
    return d[U][A];
  }), x = f && Object.entries(f).reduce((U, D) => {
    let [h, A] = D;
    return A === void 0 || (U[h] = A), U;
  }, {}), z = o == null || (r = o.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((U, D) => {
    let { class: h, className: A, ...G } = D;
    return Object.entries(G).every((B) => {
      let [H, j] = B;
      return Array.isArray(j) ? j.includes({
        ...y,
        ...x
      }[H]) : {
        ...y,
        ...x
      }[H] === j;
    }) ? [
      ...U,
      h,
      A
    ] : U;
  }, []);
  return Fh(i, b, z, f?.class, f?.className);
}, eg = tg(
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
), xt = _.forwardRef(
  ({ className: i, variant: o, size: f, asChild: r = !1, ...d }, y) => {
    const b = r ? zp : "button";
    return /* @__PURE__ */ v.jsx(
      b,
      {
        className: Ul(eg({ variant: o, size: f, className: i })),
        ref: y,
        ...d
      }
    );
  }
);
xt.displayName = "Button";
const Ln = _.forwardRef(
  ({ className: i, type: o, ...f }, r) => /* @__PURE__ */ v.jsx(
    "input",
    {
      type: o,
      className: Ul(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        i
      ),
      ref: r,
      ...f
    }
  )
);
Ln.displayName = "Input";
const BS = _.memo(function() {
  return /* @__PURE__ */ v.jsxs("div", { id: "stage", children: [
    /* @__PURE__ */ v.jsxs("div", { id: "character", children: [
      /* @__PURE__ */ v.jsx("div", { id: "scene-background", "aria-hidden": "true" }),
      /* @__PURE__ */ v.jsx("video", { id: "layer-a", className: "char-layer", autoPlay: !0, muted: !0, loop: !0, playsInline: !0 }),
      /* @__PURE__ */ v.jsx("video", { id: "layer-b", className: "char-layer", autoPlay: !0, muted: !0, loop: !0, playsInline: !0 }),
      /* @__PURE__ */ v.jsx("img", { id: "layer-img", className: "char-layer", alt: "" }),
      /* @__PURE__ */ v.jsxs("div", { id: "placeholder", className: "hidden", children: [
        /* @__PURE__ */ v.jsx("svg", { viewBox: "0 0 200 260", "aria-hidden": "true", children: /* @__PURE__ */ v.jsx("path", { d: "M100 20a52 52 0 1 1 0 104 52 52 0 0 1 0-104zM30 260c0-62 31-100 70-100s70 38 70 100z" }) }),
        /* @__PURE__ */ v.jsxs("div", { id: "placeholder-text", children: [
          "No art yet — press ",
          /* @__PURE__ */ v.jsx("b", { children: "E" }),
          " for the image prompt"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ v.jsx("div", { id: "vignette" }),
    /* @__PURE__ */ v.jsxs("header", { id: "topbar", children: [
      /* @__PURE__ */ v.jsxs("div", { id: "title", children: [
        "◇ ",
        "DSH-GAL ",
        /* @__PURE__ */ v.jsx("span", { id: "conn-dot", title: "disconnected" })
      ] }),
      /* @__PURE__ */ v.jsxs("div", { className: "app-controls", children: [
        /* @__PURE__ */ v.jsx(xt, { id: "btn-help", type: "button", "data-ui-text": "help", variant: "ghost", "data-slot": "button", children: "帮助" }),
        /* @__PURE__ */ v.jsx(xt, { type: "button", id: "btn-char", title: "Switch character (C)", variant: "ghost", "data-slot": "button", children: "CHAR" }),
        /* @__PURE__ */ v.jsx(xt, { type: "button", id: "btn-memory", title: "What I remember about you (M)", variant: "ghost", "data-slot": "button", children: "MEMORY" }),
        /* @__PURE__ */ v.jsx(xt, { type: "button", id: "btn-speech-settings", variant: "ghost", "data-slot": "button", children: "语音设置" }),
        /* @__PURE__ */ v.jsx(xt, { type: "button", id: "btn-hide", title: "Hide window (H / right-click)", variant: "ghost", "data-slot": "button", children: "HIDE" })
      ] })
    ] }),
    /* @__PURE__ */ v.jsx("div", { id: "ticker", className: "hidden", children: /* @__PURE__ */ v.jsx("span", { id: "ticker-text" }) }),
    /* @__PURE__ */ v.jsxs("div", { id: "dialogue", children: [
      /* @__PURE__ */ v.jsxs("div", { id: "msgbox", children: [
        /* @__PURE__ */ v.jsxs("div", { id: "nameplate", children: [
          /* @__PURE__ */ v.jsx("span", { id: "char-name", children: "Cetus" }),
          /* @__PURE__ */ v.jsx("span", { id: "emotion-tag" })
        ] }),
        /* @__PURE__ */ v.jsx("div", { id: "text-window", tabIndex: 0, children: /* @__PURE__ */ v.jsx("p", { id: "dialogue-text" }) }),
        /* @__PURE__ */ v.jsxs("div", { id: "message-tools", "aria-label": "当前消息操作", children: [
          /* @__PURE__ */ v.jsx(xt, { type: "button", id: "btn-skip", hidden: !0, variant: "ghost", "data-slot": "button", children: "回到最新" }),
          /* @__PURE__ */ v.jsx(xt, { type: "button", id: "btn-replay", disabled: !0, variant: "ghost", "data-slot": "button", children: "重读本段" }),
          /* @__PURE__ */ v.jsx(xt, { type: "button", id: "btn-stop-voice", disabled: !0, variant: "ghost", "data-slot": "button", children: "停止朗读" }),
          /* @__PURE__ */ v.jsx("div", { id: "voice-feedback", role: "status", "aria-live": "polite" })
        ] }),
        /* @__PURE__ */ v.jsxs("div", { id: "box-bottom", children: [
          /* @__PURE__ */ v.jsxs("form", { id: "input-row", autoComplete: "off", children: [
            /* @__PURE__ */ v.jsx(Ln, { id: "input", type: "text", placeholder: "Say something… (/help for commands)", spellCheck: !1 }),
            /* @__PURE__ */ v.jsx(xt, { id: "btn-send", type: "submit", variant: "default", "data-slot": "button", children: "SEND" })
          ] }),
          /* @__PURE__ */ v.jsx("nav", { id: "menu-row", "aria-label": "对话与应用控制", children: /* @__PURE__ */ v.jsx("div", { className: "conversation-controls", children: /* @__PURE__ */ v.jsx(xt, { type: "button", id: "btn-history", title: "Backlog (L)", variant: "ghost", "data-slot": "button", children: "LOG" }) }) }),
          /* @__PURE__ */ v.jsx("div", { id: "ui-notice", role: "status", "aria-live": "polite" }),
          /* @__PURE__ */ v.jsx("span", { id: "language-hint", className: "sr-only" })
        ] })
      ] }),
      /* @__PURE__ */ v.jsxs("div", { id: "last-user", className: "hidden", children: [
        /* @__PURE__ */ v.jsx("span", { className: "you-label", children: "You" }),
        /* @__PURE__ */ v.jsx("span", { id: "last-user-text" })
      ] })
    ] }),
    /* @__PURE__ */ v.jsx(xt, { id: "btn-restore", type: "button", "data-ui-text": "restore", variant: "ghost", "data-slot": "button", children: "返回对话" })
  ] });
}), Gn = _.forwardRef(({ className: i, ...o }, f) => /* @__PURE__ */ v.jsx(
  "textarea",
  {
    className: Ul(
      "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      i
    ),
    ref: f,
    ...o
  }
));
Gn.displayName = "Textarea";
var YS = Object.defineProperty, qS = (i, o) => YS(i, "name", { value: o, configurable: !0 }), GS = /* @__PURE__ */ _.forwardRef(
  /* @__PURE__ */ qS(function(o, f) {
    return /* @__PURE__ */ v.jsx(
      hn.label,
      {
        ...o,
        ref: f,
        onMouseDown: (r) => {
          r.target.closest("button, input, select, textarea") || (o.onMouseDown?.(r), !r.defaultPrevented && r.detail > 1 && r.preventDefault());
        }
      }
    );
  }, "Label")
), lg = GS;
const LS = tg(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
), $t = _.forwardRef(({ className: i, ...o }, f) => /* @__PURE__ */ v.jsx(
  lg,
  {
    ref: f,
    className: Ul(LS(), i),
    ...o
  }
));
$t.displayName = lg.displayName;
const Ml = _.forwardRef(({ className: i, ...o }, f) => /* @__PURE__ */ v.jsx("select", { ref: f, "data-slot": "native-select", className: Ul("flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50", i), ...o }));
Ml.displayName = "NativeSelect";
const VS = _.memo(function() {
  return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    /* @__PURE__ */ v.jsxs("div", { className: "overlay-head", children: [
      /* @__PURE__ */ v.jsx("span", { id: "character-hub-title", "data-layout-text": "character", children: "角色" }),
      /* @__PURE__ */ v.jsx(xt, { type: "button", className: "overlay-close", "data-layout-text": "close", hidden: !0, variant: "ghost", "data-slot": "button", children: "关闭 / ESC" })
    ] }),
    /* @__PURE__ */ v.jsxs("nav", { className: "character-tabs", "aria-label": "角色管理", children: [
      /* @__PURE__ */ v.jsx(xt, { type: "button", id: "btn-character-select", "data-character-view": "char-picker", "data-layout-text": "choose", variant: "ghost", "data-slot": "button", children: "选择角色" }),
      /* @__PURE__ */ v.jsx(xt, { type: "button", id: "btn-gallery", "data-character-view": "gallery", title: "Sprites & loops (G)", variant: "ghost", "data-slot": "button", children: "GALLERY" }),
      /* @__PURE__ */ v.jsx(xt, { type: "button", id: "btn-edit", "data-character-view": "editor", title: "Persona (E)", variant: "ghost", "data-slot": "button", children: "EDIT" })
    ] }),
    /* @__PURE__ */ v.jsx("div", { className: "character-display-settings", children: /* @__PURE__ */ v.jsxs($t, { className: "language-control", children: [
      /* @__PURE__ */ v.jsx("span", { "data-ui-text": "state", children: "表情预览" }),
      /* @__PURE__ */ v.jsxs(Ml, { id: "character-state-preview", "aria-label": "state", children: [
        /* @__PURE__ */ v.jsx("option", { value: "auto", children: "跟随对话" }),
        /* @__PURE__ */ v.jsx("option", { value: "neutral", children: "待机" }),
        /* @__PURE__ */ v.jsx("option", { value: "thinking", children: "思考" }),
        /* @__PURE__ */ v.jsx("option", { value: "happy", children: "开心" }),
        /* @__PURE__ */ v.jsx("option", { value: "sad", children: "悲伤" }),
        /* @__PURE__ */ v.jsx("option", { value: "surprised", children: "惊讶" }),
        /* @__PURE__ */ v.jsx("option", { value: "excited", children: "兴奋" })
      ] })
    ] }) }),
    /* @__PURE__ */ v.jsxs("div", { id: "char-picker", className: "character-view hidden", children: [
      /* @__PURE__ */ v.jsx("div", { id: "char-picker-head", children: "Character" }),
      /* @__PURE__ */ v.jsx("div", { id: "char-list" }),
      /* @__PURE__ */ v.jsxs("div", { id: "char-picker-foot", children: [
        /* @__PURE__ */ v.jsx(xt, { type: "button", id: "btn-import", title: "Import a character pack (.zip)", "data-ui-text": "import", variant: "ghost", "data-slot": "button", children: "Import pack…" }),
        /* @__PURE__ */ v.jsx(xt, { type: "button", id: "btn-export", title: "Download the current pack as .zip (memory stays local)", "data-ui-text": "export", variant: "ghost", "data-slot": "button", children: "Export pack" }),
        /* @__PURE__ */ v.jsx("input", { id: "import-file", type: "file", accept: ".zip,application/zip", hidden: !0 })
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { id: "editor", className: "character-view hidden", children: [
      /* @__PURE__ */ v.jsxs("div", { className: "overlay-head", children: [
        /* @__PURE__ */ v.jsx("span", { id: "editor-title", children: "Character" }),
        /* @__PURE__ */ v.jsx(xt, { type: "button", className: "overlay-close", "data-close": "editor", hidden: !0, variant: "ghost", "data-slot": "button", children: "Close" })
      ] }),
      /* @__PURE__ */ v.jsxs("form", { id: "editor-form", className: "overlay-body", children: [
        /* @__PURE__ */ v.jsxs($t, { children: [
          /* @__PURE__ */ v.jsx("span", { "data-ui-text": "ed-name", children: "名字" }),
          /* @__PURE__ */ v.jsx(Ln, { id: "ed-name", type: "text", spellCheck: !1 })
        ] }),
        /* @__PURE__ */ v.jsxs($t, { children: [
          /* @__PURE__ */ v.jsx("span", { "data-ui-text": "ed-greeting", children: "开场白" }),
          /* @__PURE__ */ v.jsx(Gn, { id: "ed-greeting", rows: 2 })
        ] }),
        /* @__PURE__ */ v.jsxs($t, { children: [
          /* @__PURE__ */ v.jsx("span", { "data-ui-text": "ed-persona", children: "人设" }),
          /* @__PURE__ */ v.jsx(Gn, { id: "ed-persona", rows: 8 })
        ] }),
        /* @__PURE__ */ v.jsxs("div", { id: "ed-art", className: "hidden", children: [
          /* @__PURE__ */ v.jsxs("div", { className: "ed-art-head", children: [
            "This pack has no images yet. Generate them with any image model and drop six files into ",
            /* @__PURE__ */ v.jsx("code", { id: "ed-art-dir" }),
            ": neutral, happy, thinking, surprised, sad, excited (.png), optionally .mp4 loops with the same names."
          ] }),
          /* @__PURE__ */ v.jsxs($t, { children: [
            "Base image prompt (neutral) ",
            /* @__PURE__ */ v.jsx(Gn, { id: "ed-art-base", rows: 4, readOnly: !0 })
          ] }),
          /* @__PURE__ */ v.jsxs($t, { children: [
            "Expression deltas (edit the base image with each) ",
            /* @__PURE__ */ v.jsx(Gn, { id: "ed-art-expr", rows: 5, readOnly: !0 })
          ] }),
          /* @__PURE__ */ v.jsxs($t, { children: [
            "Motion prompt (image-to-video) ",
            /* @__PURE__ */ v.jsx(Gn, { id: "ed-art-motion", rows: 2, readOnly: !0 })
          ] })
        ] }),
        /* @__PURE__ */ v.jsxs($t, { children: [
          /* @__PURE__ */ v.jsx("span", { "data-ui-text": "ed-rate", children: "立绘动画速度" }),
          /* @__PURE__ */ v.jsx(Ln, { id: "ed-rate", type: "number", min: "0.25", max: "4", step: "0.05" })
        ] }),
        /* @__PURE__ */ v.jsxs($t, { hidden: !0, children: [
          "Voice — VOICEVOX speaker style (",
          /* @__PURE__ */ v.jsx("span", { id: "ed-voice-state", children: "checking…" }),
          ") ",
          /* @__PURE__ */ v.jsx(Ml, { id: "ed-voice" })
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: "overlay-actions", children: [
          /* @__PURE__ */ v.jsx("span", { id: "ed-path", className: "dim" }),
          /* @__PURE__ */ v.jsx(xt, { type: "submit", id: "ed-save", "data-ui-text": "save", variant: "default", "data-slot": "button", children: "SAVE" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { id: "gallery", className: "character-view hidden", children: [
      /* @__PURE__ */ v.jsxs("div", { className: "overlay-head", children: [
        /* @__PURE__ */ v.jsx("span", { id: "gallery-title", children: "Gallery" }),
        /* @__PURE__ */ v.jsx(xt, { type: "button", className: "overlay-close", "data-close": "gallery", hidden: !0, variant: "ghost", "data-slot": "button", children: "Close" })
      ] }),
      /* @__PURE__ */ v.jsx("div", { id: "gallery-grid", className: "overlay-body" }),
      /* @__PURE__ */ v.jsx("div", { id: "gallery-hint", className: "dim", "data-ui-text": "galleryHint", children: "Click a tile to show that expression on stage. Drop a .png / .mp4 onto a tile, or use its ↑ button, to replace that expression. Files live in the pack directory shown in EDIT." }),
      /* @__PURE__ */ v.jsx("input", { id: "asset-file", type: "file", accept: ".png,.webp,.jpg,.jpeg,.mp4,.webm,image/png,image/webp,image/jpeg,video/mp4,video/webm", hidden: !0 })
    ] })
  ] });
}), XS = _.memo(function() {
  return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    /* @__PURE__ */ v.jsxs("div", { className: "overlay-head", children: [
      /* @__PURE__ */ v.jsx("span", { id: "speech-title", "data-speech-text": "title", children: "语音设置" }),
      /* @__PURE__ */ v.jsx(xt, { type: "button", className: "overlay-close", "data-close": "speech-panel", "data-speech-text": "cancel", hidden: !0, variant: "ghost", "data-slot": "button", children: "关闭 / ESC" })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: "overlay-body", children: [
      /* @__PURE__ */ v.jsxs("div", { className: "general-settings", "data-section": "general", children: [
        /* @__PURE__ */ v.jsxs("div", { className: "language-settings", children: [
          /* @__PURE__ */ v.jsxs($t, { className: "language-control", children: [
            /* @__PURE__ */ v.jsx("span", { id: "language-label", children: "界面语言" }),
            /* @__PURE__ */ v.jsxs(Ml, { id: "gal-language", "aria-describedby": "language-hint", children: [
              /* @__PURE__ */ v.jsx("option", { value: "auto", children: "自动" }),
              /* @__PURE__ */ v.jsx("option", { value: "zh", children: "中文" }),
              /* @__PURE__ */ v.jsx("option", { value: "ja", children: "日本語" }),
              /* @__PURE__ */ v.jsx("option", { value: "en", children: "English" })
            ] })
          ] }),
          /* @__PURE__ */ v.jsxs($t, { className: "language-control", children: [
            /* @__PURE__ */ v.jsx("span", { id: "speech-language-label", children: "语音语言" }),
            /* @__PURE__ */ v.jsxs(Ml, { id: "gal-speech-language", "aria-describedby": "language-hint", children: [
              /* @__PURE__ */ v.jsx("option", { value: "auto", children: "自动" }),
              /* @__PURE__ */ v.jsx("option", { value: "zh", children: "中文" }),
              /* @__PURE__ */ v.jsx("option", { value: "ja", children: "日本語" }),
              /* @__PURE__ */ v.jsx("option", { value: "en", children: "English" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ v.jsx(xt, { type: "button", id: "btn-voice", title: "Voice on/off (V)", variant: "ghost", "data-slot": "button", children: "VOICE" })
      ] }),
      /* @__PURE__ */ v.jsx("p", { className: "speech-intro", "data-speech-text": "choose" }),
      /* @__PURE__ */ v.jsxs("form", { id: "speech-form", children: [
        /* @__PURE__ */ v.jsxs("div", { className: "speech-grid", children: [
          /* @__PURE__ */ v.jsxs($t, { children: [
            /* @__PURE__ */ v.jsx("span", { "data-speech-text": "language" }),
            /* @__PURE__ */ v.jsxs(Ml, { id: "speech-edit-language", children: [
              /* @__PURE__ */ v.jsx("option", { value: "zh", children: "中文" }),
              /* @__PURE__ */ v.jsx("option", { value: "en", children: "English" }),
              /* @__PURE__ */ v.jsx("option", { value: "ja", children: "日本語" })
            ] })
          ] }),
          /* @__PURE__ */ v.jsxs($t, { children: [
            /* @__PURE__ */ v.jsx("span", { "data-speech-text": "provider" }),
            /* @__PURE__ */ v.jsx(Ml, { id: "speech-provider" })
          ] }),
          /* @__PURE__ */ v.jsxs($t, { children: [
            /* @__PURE__ */ v.jsx("span", { "data-speech-text": "model" }),
            /* @__PURE__ */ v.jsx(Ml, { id: "speech-model" })
          ] }),
          /* @__PURE__ */ v.jsxs($t, { children: [
            /* @__PURE__ */ v.jsx("span", { "data-speech-text": "voice" }),
            /* @__PURE__ */ v.jsx(Ln, { id: "speech-voice", required: !0, maxLength: 160, autoComplete: "off", spellCheck: !1 }),
            /* @__PURE__ */ v.jsx(Ml, { id: "speech-local-voice", hidden: !0 }),
            /* @__PURE__ */ v.jsx(xt, { id: "speech-refresh-voices", type: "button", variant: "ghost", hidden: !0, "data-speech-text": "refreshVoices" }),
            /* @__PURE__ */ v.jsx("span", { id: "speech-voices-status", role: "status", "aria-live": "polite" })
          ] })
        ] }),
        /* @__PURE__ */ v.jsx("p", { id: "speech-description" }),
        /* @__PURE__ */ v.jsx("p", { id: "speech-voice-hint", className: "speech-muted", "data-speech-text": "voiceHint" }),
        /* @__PURE__ */ v.jsx("a", { id: "speech-docs", target: "_blank", rel: "noopener noreferrer", "data-speech-text": "docs" }),
        /* @__PURE__ */ v.jsxs("div", { id: "speech-key-fields", children: [
          /* @__PURE__ */ v.jsxs($t, { children: [
            /* @__PURE__ */ v.jsx("span", { "data-speech-text": "key" }),
            /* @__PURE__ */ v.jsx(Ln, { id: "speech-key", type: "password", autoComplete: "new-password", maxLength: 4096, spellCheck: !1 })
          ] }),
          /* @__PURE__ */ v.jsx("p", { className: "speech-muted", "data-speech-text": "keyHint" }),
          /* @__PURE__ */ v.jsxs($t, { className: "speech-checkbox", children: [
            /* @__PURE__ */ v.jsx(Ln, { id: "speech-clear-key", type: "checkbox", className: "native-checkbox" }),
            /* @__PURE__ */ v.jsx("span", { "data-speech-text": "clear" })
          ] })
        ] }),
        /* @__PURE__ */ v.jsx("p", { className: "speech-muted", "data-speech-text": "discard" }),
        /* @__PURE__ */ v.jsxs("div", { className: "speech-actions", children: [
          /* @__PURE__ */ v.jsx(xt, { id: "speech-test", type: "button", "data-speech-text": "test", variant: "ghost", "data-slot": "button" }),
          /* @__PURE__ */ v.jsx(xt, { id: "speech-stop", type: "button", disabled: !0, "data-speech-text": "stop", variant: "ghost", "data-slot": "button" }),
          /* @__PURE__ */ v.jsx(xt, { id: "speech-save", type: "submit", "data-speech-text": "save", variant: "default", "data-slot": "button" })
        ] })
      ] }),
      /* @__PURE__ */ v.jsx("p", { id: "speech-status", role: "status", "aria-live": "polite" })
    ] })
  ] });
}), QS = _.memo(function() {
  return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    /* @__PURE__ */ v.jsxs("div", { className: "overlay-head", children: [
      /* @__PURE__ */ v.jsx("span", { id: "memory-title", "data-ui-text": "memory-title", children: "记忆" }),
      /* @__PURE__ */ v.jsx(xt, { type: "button", className: "overlay-close", "data-close": "memory-panel", hidden: !0, variant: "ghost", "data-slot": "button", children: "关闭 / ESC" })
    ] }),
    /* @__PURE__ */ v.jsxs("form", { id: "memory-form", className: "overlay-body", children: [
      /* @__PURE__ */ v.jsx("p", { id: "memory-hint", className: "dim", "data-ui-text": "memory-hint", children: "这些是关于你的笔记，所有角色共用，换角色也不会丢。" }),
      /* @__PURE__ */ v.jsx($t, { children: /* @__PURE__ */ v.jsx(Gn, { id: "mem-text", rows: 14, placeholder: "- 2026-09-11: …" }) }),
      /* @__PURE__ */ v.jsxs("div", { className: "overlay-actions", children: [
        /* @__PURE__ */ v.jsx("span", { id: "memory-path", className: "dim" }),
        /* @__PURE__ */ v.jsx(xt, { type: "submit", id: "mem-save", "data-ui-text": "save", variant: "default", "data-slot": "button", children: "SAVE" })
      ] })
    ] })
  ] });
}), ZS = _.memo(function() {
  return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    /* @__PURE__ */ v.jsxs("div", { className: "overlay-head", children: [
      /* @__PURE__ */ v.jsx("span", { id: "help-title", children: "命令与快捷键" }),
      /* @__PURE__ */ v.jsx(xt, { type: "button", className: "overlay-close", "data-close": "help-panel", hidden: !0, variant: "ghost", "data-slot": "button", children: "关闭 / ESC" })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: "overlay-body", children: [
      /* @__PURE__ */ v.jsx("div", { id: "help-list" }),
      /* @__PURE__ */ v.jsx("p", { id: "help-keys" })
    ] })
  ] });
}), KS = _.memo(function() {
  return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    /* @__PURE__ */ v.jsxs("div", { id: "history-head", children: [
      /* @__PURE__ */ v.jsx("span", { "data-ui-text": "history", children: "Backlog" }),
      /* @__PURE__ */ v.jsx(xt, { id: "btn-close-history", "data-ui-text": "close", hidden: !0, variant: "ghost", "data-slot": "button", children: "Close" })
    ] }),
    /* @__PURE__ */ v.jsx("div", { id: "history-list" })
  ] });
}), Pf = { "character-hub": VS, "memory-panel": QS, "speech-panel": XS, "help-panel": ZS, history: KS }, Ku = document.createElement("div");
Ku.id = "panel-parking";
Ku.hidden = !0;
document.body.append(Ku);
const ng = Object.fromEntries(Object.keys(Pf).map((i) => {
  const o = document.createElement("div");
  return o.id = i, o.className = "gal-panel hidden", Ku.append(o), [i, o];
}));
let Vf;
const ag = {
  open(i) {
    Ga.flushSync(() => Vf(i));
  },
  close() {
    Ga.flushSync(() => Vf(null));
  },
  button() {
    const i = document.createElement("button");
    return i.type = "button", i.className = eg({ variant: "ghost" }), i.dataset.slot = "button", i;
  },
  requestClose() {
    window.dispatchEvent(new Event("gal-request-close"));
  }
};
window.galUi = ag;
function JS({ id: i }) {
  const o = _.useRef(null);
  return _.useLayoutEffect(() => {
    const f = ng[i];
    return o.current.append(f), () => {
      Ku.append(f);
    };
  }, [i]), /* @__PURE__ */ v.jsx("div", { ref: o, className: "panel-mount" });
}
function FS() {
  const [i, o] = _.useState(null), [f, r] = _.useState("zh");
  Vf = o, _.useEffect(() => {
    const b = () => r(window.galVoice?.language || "zh");
    return window.addEventListener("gal-language", b), () => window.removeEventListener("gal-language", b);
  }, []);
  const d = { zh: ["角色", "记忆", "设置", "帮助与快捷键", "对话记录"], en: ["Character", "Memory", "Settings", "Help & shortcuts", "Conversation history"], ja: ["キャラクター", "記憶", "設定", "ヘルプとショートカット", "会話履歴"] }, y = i ? (d[f] || d.zh)[Object.keys(Pf).indexOf(i)] : "";
  return /* @__PURE__ */ v.jsx(US, { open: !!i, onOpenChange: (b) => {
    b || ag.requestClose();
  }, children: /* @__PURE__ */ v.jsxs(Iy, { className: "gal-dialog", closeLabel: f === "zh" ? "关闭" : f === "ja" ? "閉じる" : "Close", "aria-describedby": void 0, onOpenAutoFocus: (b) => b.preventDefault(), onCloseAutoFocus: (b) => b.preventDefault(), onEscapeKeyDown: (b) => {
    b.isComposing && b.preventDefault();
  }, children: [
    /* @__PURE__ */ v.jsx(Py, { className: "sr-only", children: y }),
    i && /* @__PURE__ */ v.jsx(JS, { id: i }, i)
  ] }) });
}
function $S() {
  return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    /* @__PURE__ */ v.jsx(BS, {}),
    Object.entries(Pf).map(([i, o]) => Ga.createPortal(/* @__PURE__ */ v.jsx(o, {}), ng[i], i)),
    /* @__PURE__ */ v.jsx(FS, {})
  ] });
}
Ga.flushSync(() => dp.createRoot(document.getElementById("root")).render(/* @__PURE__ */ v.jsx($S, {})));
for (const i of ["markdown.js", "voice-controls.js", "speech-settings.js", "character-state.js", "app.js", "layout-labels.js", "ui-labels.js"])
  await new Promise((o, f) => {
    const r = document.createElement("script");
    r.src = "./" + i, r.onload = () => o(), r.onerror = () => f(Error("Cannot load " + i)), document.body.append(r);
  });

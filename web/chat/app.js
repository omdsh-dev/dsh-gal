function Hx(a, s) {
  for (var r = 0; r < s.length; r++) {
    const o = s[r];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const f in o)
        if (f !== "default" && !(f in a)) {
          const h = Object.getOwnPropertyDescriptor(o, f);
          h && Object.defineProperty(a, f, h.get ? h : {
            enumerable: !0,
            get: () => o[f]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(a, Symbol.toStringTag, { value: "Module" }));
}
function Bx(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var rd = { exports: {} }, hc = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var T0;
function qx() {
  if (T0) return hc;
  T0 = 1;
  var a = Symbol.for("react.transitional.element"), s = Symbol.for("react.fragment");
  function r(o, f, h) {
    var m = null;
    if (h !== void 0 && (m = "" + h), f.key !== void 0 && (m = "" + f.key), "key" in f) {
      h = {};
      for (var g in f)
        g !== "key" && (h[g] = f[g]);
    } else h = f;
    return f = h.ref, {
      $$typeof: a,
      type: o,
      key: m,
      ref: f !== void 0 ? f : null,
      props: h
    };
  }
  return hc.Fragment = s, hc.jsx = r, hc.jsxs = r, hc;
}
var j0;
function $x() {
  return j0 || (j0 = 1, rd.exports = qx()), rd.exports;
}
var u = $x(), od = { exports: {} }, Se = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var w0;
function Yx() {
  if (w0) return Se;
  w0 = 1;
  var a = Symbol.for("react.transitional.element"), s = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), h = Symbol.for("react.consumer"), m = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), b = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), p = Symbol.for("react.activity"), N = Symbol.for("react.view_transition"), j = Symbol.iterator;
  function T(_) {
    return _ === null || typeof _ != "object" ? null : (_ = j && _[j] || _["@@iterator"], typeof _ == "function" ? _ : null);
  }
  var U = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, k = Object.assign, K = {};
  function X(_, B, oe) {
    this.props = _, this.context = B, this.refs = K, this.updater = oe || U;
  }
  X.prototype.isReactComponent = {}, X.prototype.setState = function(_, B) {
    if (typeof _ != "object" && typeof _ != "function" && _ != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, _, B, "setState");
  }, X.prototype.forceUpdate = function(_) {
    this.updater.enqueueForceUpdate(this, _, "forceUpdate");
  };
  function H() {
  }
  H.prototype = X.prototype;
  function F(_, B, oe) {
    this.props = _, this.context = B, this.refs = K, this.updater = oe || U;
  }
  var W = F.prototype = new H();
  W.constructor = F, k(W, X.prototype), W.isPureReactComponent = !0;
  var $ = Array.isArray;
  function V() {
  }
  var ae = { H: null, A: null, T: null, S: null }, ke = Object.prototype.hasOwnProperty;
  function xe(_, B, oe) {
    var ue = oe.ref;
    return {
      $$typeof: a,
      type: _,
      key: B,
      ref: ue !== void 0 ? ue : null,
      props: oe
    };
  }
  function Ee(_, B) {
    return xe(_.type, B, _.props);
  }
  function ve(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === a;
  }
  function at(_) {
    var B = { "=": "=0", ":": "=2" };
    return "$" + _.replace(/[=:]/g, function(oe) {
      return B[oe];
    });
  }
  var We = /\/+/g;
  function Ye(_, B) {
    return typeof _ == "object" && _ !== null && _.key != null ? at("" + _.key) : B.toString(36);
  }
  function I(_) {
    switch (_.status) {
      case "fulfilled":
        return _.value;
      case "rejected":
        throw _.reason;
      default:
        switch (typeof _.status == "string" ? _.then(V, V) : (_.status = "pending", _.then(
          function(B) {
            _.status === "pending" && (_.status = "fulfilled", _.value = B);
          },
          function(B) {
            _.status === "pending" && (_.status = "rejected", _.reason = B);
          }
        )), _.status) {
          case "fulfilled":
            return _.value;
          case "rejected":
            throw _.reason;
        }
    }
    throw _;
  }
  function me(_, B, oe, ue, Ce) {
    var _e = typeof _;
    (_e === "undefined" || _e === "boolean") && (_ = null);
    var De = !1;
    if (_ === null) De = !0;
    else
      switch (_e) {
        case "bigint":
        case "string":
        case "number":
          De = !0;
          break;
        case "object":
          switch (_.$$typeof) {
            case a:
            case s:
              De = !0;
              break;
            case v:
              return De = _._init, me(
                De(_._payload),
                B,
                oe,
                ue,
                Ce
              );
          }
      }
    if (De)
      return Ce = Ce(_), De = ue === "" ? "." + Ye(_, 0) : ue, $(Ce) ? (oe = "", De != null && (oe = De.replace(We, "$&/") + "/"), me(Ce, B, oe, "", function(it) {
        return it;
      })) : Ce != null && (ve(Ce) && (Ce = Ee(
        Ce,
        oe + (Ce.key == null || _ && _.key === Ce.key ? "" : ("" + Ce.key).replace(
          We,
          "$&/"
        ) + "/") + De
      )), B.push(Ce)), 1;
    De = 0;
    var se = ue === "" ? "." : ue + ":";
    if ($(_))
      for (var pe = 0; pe < _.length; pe++)
        ue = _[pe], _e = se + Ye(ue, pe), De += me(
          ue,
          B,
          oe,
          _e,
          Ce
        );
    else if (pe = T(_), typeof pe == "function")
      for (_ = pe.call(_), pe = 0; !(ue = _.next()).done; )
        ue = ue.value, _e = se + Ye(ue, pe++), De += me(
          ue,
          B,
          oe,
          _e,
          Ce
        );
    else if (_e === "object") {
      if (typeof _.then == "function")
        return me(
          I(_),
          B,
          oe,
          ue,
          Ce
        );
      throw B = String(_), Error(
        "Objects are not valid as a React child (found: " + (B === "[object Object]" ? "object with keys {" + Object.keys(_).join(", ") + "}" : B) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return De;
  }
  function he(_, B, oe) {
    if (_ == null) return _;
    var ue = [], Ce = 0;
    return me(_, ue, "", "", function(_e) {
      return B.call(oe, _e, Ce++);
    }), ue;
  }
  function Me(_) {
    if (_._status === -1) {
      var B = _._result, oe = B();
      oe.then(
        function(ue) {
          (_._status === 0 || _._status === -1) && (_._status = 1, _._result = ue, oe.status === void 0 && (oe.status = "fulfilled", oe.value = ue));
        },
        function(ue) {
          (_._status === 0 || _._status === -1) && (_._status = 2, _._result = ue, oe.status === void 0 && (oe.status = "rejected", oe.reason = ue));
        }
      ), _._status === -1 && (_._status = 0, _._result = oe);
    }
    if (_._status === 1) return _._result.default;
    throw _._result;
  }
  var Z = typeof reportError == "function" ? reportError : function(_) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var B = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof _ == "object" && _ !== null && typeof _.message == "string" ? String(_.message) : String(_),
        error: _
      });
      if (!window.dispatchEvent(B)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", _);
      return;
    }
    console.error(_);
  };
  function qe(_) {
    var B = ae.T, oe = {};
    oe.types = B !== null ? B.types : null, ae.T = oe;
    try {
      var ue = _(), Ce = ae.S;
      Ce !== null && Ce(oe, ue), typeof ue == "object" && ue !== null && typeof ue.then == "function" && ue.then(V, Z);
    } catch (_e) {
      Z(_e);
    } finally {
      B !== null && oe.types !== null && (B.types = oe.types), ae.T = B;
    }
  }
  function et(_) {
    var B = ae.T;
    if (B !== null) {
      var oe = B.types;
      oe === null ? B.types = [_] : oe.indexOf(_) === -1 && oe.push(_);
    } else qe(et.bind(null, _));
  }
  var en = {
    map: he,
    forEach: function(_, B, oe) {
      he(
        _,
        function() {
          B.apply(this, arguments);
        },
        oe
      );
    },
    count: function(_) {
      var B = 0;
      return he(_, function() {
        B++;
      }), B;
    },
    toArray: function(_) {
      return he(_, function(B) {
        return B;
      }) || [];
    },
    only: function(_) {
      if (!ve(_))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return _;
    }
  };
  return Se.Activity = p, Se.Children = en, Se.Component = X, Se.Fragment = r, Se.Profiler = f, Se.PureComponent = F, Se.StrictMode = o, Se.Suspense = b, Se.ViewTransition = N, Se.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ae, Se.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(_) {
      return ae.H.useMemoCache(_);
    }
  }, Se.addTransitionType = et, Se.cache = function(_) {
    return function() {
      return _.apply(null, arguments);
    };
  }, Se.cacheSignal = function() {
    return null;
  }, Se.cloneElement = function(_, B, oe) {
    if (_ == null)
      throw Error(
        "The argument must be a React element, but you passed " + _ + "."
      );
    var ue = k({}, _.props), Ce = _.key;
    if (B != null)
      for (_e in B.key !== void 0 && (Ce = "" + B.key), B)
        !ke.call(B, _e) || _e === "key" || _e === "__self" || _e === "__source" || _e === "ref" && B.ref === void 0 || (ue[_e] = B[_e]);
    var _e = arguments.length - 2;
    if (_e === 1) ue.children = oe;
    else if (1 < _e) {
      for (var De = Array(_e), se = 0; se < _e; se++)
        De[se] = arguments[se + 2];
      ue.children = De;
    }
    return xe(_.type, Ce, ue);
  }, Se.createContext = function(_) {
    return _ = {
      $$typeof: m,
      _currentValue: _,
      _currentValue2: _,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, _.Provider = _, _.Consumer = {
      $$typeof: h,
      _context: _
    }, _;
  }, Se.createElement = function(_, B, oe) {
    var ue, Ce = {}, _e = null;
    if (B != null)
      for (ue in B.key !== void 0 && (_e = "" + B.key), B)
        ke.call(B, ue) && ue !== "key" && ue !== "__self" && ue !== "__source" && (Ce[ue] = B[ue]);
    var De = arguments.length - 2;
    if (De === 1) Ce.children = oe;
    else if (1 < De) {
      for (var se = Array(De), pe = 0; pe < De; pe++)
        se[pe] = arguments[pe + 2];
      Ce.children = se;
    }
    if (_ && _.defaultProps)
      for (ue in De = _.defaultProps, De)
        Ce[ue] === void 0 && (Ce[ue] = De[ue]);
    return xe(_, _e, Ce);
  }, Se.createRef = function() {
    return { current: null };
  }, Se.forwardRef = function(_) {
    return { $$typeof: g, render: _ };
  }, Se.isValidElement = ve, Se.lazy = function(_) {
    return {
      $$typeof: v,
      _payload: { _status: -1, _result: _ },
      _init: Me
    };
  }, Se.memo = function(_, B) {
    return {
      $$typeof: x,
      type: _,
      compare: B === void 0 ? null : B
    };
  }, Se.startTransition = qe, Se.unstable_useCacheRefresh = function() {
    return ae.H.useCacheRefresh();
  }, Se.use = function(_) {
    return ae.H.use(_);
  }, Se.useActionState = function(_, B, oe) {
    return ae.H.useActionState(_, B, oe);
  }, Se.useCallback = function(_, B) {
    return ae.H.useCallback(_, B);
  }, Se.useContext = function(_) {
    return ae.H.useContext(_);
  }, Se.useDebugValue = function() {
  }, Se.useDeferredValue = function(_, B) {
    return ae.H.useDeferredValue(_, B);
  }, Se.useEffect = function(_, B) {
    return ae.H.useEffect(_, B);
  }, Se.useEffectEvent = function(_) {
    return ae.H.useEffectEvent(_);
  }, Se.useId = function() {
    return ae.H.useId();
  }, Se.useImperativeHandle = function(_, B, oe) {
    return ae.H.useImperativeHandle(_, B, oe);
  }, Se.useInsertionEffect = function(_, B) {
    return ae.H.useInsertionEffect(_, B);
  }, Se.useLayoutEffect = function(_, B) {
    return ae.H.useLayoutEffect(_, B);
  }, Se.useMemo = function(_, B) {
    return ae.H.useMemo(_, B);
  }, Se.useOptimistic = function(_, B) {
    return ae.H.useOptimistic(_, B);
  }, Se.useReducer = function(_, B, oe) {
    return ae.H.useReducer(_, B, oe);
  }, Se.useRef = function(_) {
    return ae.H.useRef(_);
  }, Se.useState = function(_) {
    return ae.H.useState(_);
  }, Se.useSyncExternalStore = function(_, B, oe) {
    return ae.H.useSyncExternalStore(
      _,
      B,
      oe
    );
  }, Se.useTransition = function() {
    return ae.H.useTransition();
  }, Se.version = "19.3.0", Se;
}
var _0;
function eh() {
  return _0 || (_0 = 1, od.exports = Yx()), od.exports;
}
var S = eh();
const Ul = /* @__PURE__ */ Bx(S), wc = /* @__PURE__ */ Hx({
  __proto__: null,
  default: Ul
}, [S]);
var fd = { exports: {} }, mc = {}, dd = { exports: {} }, hd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var A0;
function Gx() {
  return A0 || (A0 = 1, (function(a) {
    function s(I, me) {
      var he = I.length;
      I.push(me);
      e: for (; 0 < he; ) {
        var Me = he - 1 >>> 1, Z = I[Me];
        if (0 < f(Z, me))
          I[Me] = me, I[he] = Z, he = Me;
        else break e;
      }
    }
    function r(I) {
      return I.length === 0 ? null : I[0];
    }
    function o(I) {
      if (I.length === 0) return null;
      var me = I[0], he = I.pop();
      if (he !== me) {
        I[0] = he;
        e: for (var Me = 0, Z = I.length, qe = Z >>> 1; Me < qe; ) {
          var et = 2 * (Me + 1) - 1, en = I[et], _ = et + 1, B = I[_];
          if (0 > f(en, he))
            _ < Z && 0 > f(B, en) ? (I[Me] = B, I[_] = he, Me = _) : (I[Me] = en, I[et] = he, Me = et);
          else if (_ < Z && 0 > f(B, he))
            I[Me] = B, I[_] = he, Me = _;
          else break e;
        }
      }
      return me;
    }
    function f(I, me) {
      var he = I.sortIndex - me.sortIndex;
      return he !== 0 ? he : I.id - me.id;
    }
    if (a.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var h = performance;
      a.unstable_now = function() {
        return h.now();
      };
    } else {
      var m = Date, g = m.now();
      a.unstable_now = function() {
        return m.now() - g;
      };
    }
    var b = [], x = [], v = 1, p = null, N = 3, j = !1, T = !1, U = !1, k = !1, K = typeof setTimeout == "function" ? setTimeout : null, X = typeof clearTimeout == "function" ? clearTimeout : null, H = typeof setImmediate < "u" ? setImmediate : null;
    function F(I) {
      for (var me = r(x); me !== null; ) {
        if (me.callback === null) o(x);
        else if (me.startTime <= I)
          o(x), me.sortIndex = me.expirationTime, s(b, me);
        else break;
        me = r(x);
      }
    }
    function W(I) {
      if (U = !1, F(I), !T)
        if (r(b) !== null)
          T = !0, $ || ($ = !0, ve());
        else {
          var me = r(x);
          me !== null && Ye(W, me.startTime - I);
        }
    }
    var $ = !1, V = -1, ae = 5, ke = -1;
    function xe() {
      return k ? !0 : !(a.unstable_now() - ke < ae);
    }
    function Ee() {
      if (k = !1, $) {
        var I = a.unstable_now();
        ke = I;
        var me = !0;
        try {
          e: {
            T = !1, U && (U = !1, X(V), V = -1), j = !0;
            var he = N;
            try {
              t: {
                for (F(I), p = r(b); p !== null && !(p.expirationTime > I && xe()); ) {
                  var Me = p.callback;
                  if (typeof Me == "function") {
                    p.callback = null, N = p.priorityLevel;
                    var Z = Me(
                      p.expirationTime <= I
                    );
                    if (I = a.unstable_now(), typeof Z == "function") {
                      p.callback = Z, F(I), me = !0;
                      break t;
                    }
                    p === r(b) && o(b), F(I);
                  } else o(b);
                  p = r(b);
                }
                if (p !== null) me = !0;
                else {
                  var qe = r(x);
                  qe !== null && Ye(
                    W,
                    qe.startTime - I
                  ), me = !1;
                }
              }
              break e;
            } finally {
              p = null, N = he, j = !1;
            }
            me = void 0;
          }
        } finally {
          me ? ve() : $ = !1;
        }
      }
    }
    var ve;
    if (typeof H == "function")
      ve = function() {
        H(Ee);
      };
    else if (typeof MessageChannel < "u") {
      var at = new MessageChannel(), We = at.port2;
      at.port1.onmessage = Ee, ve = function() {
        We.postMessage(null);
      };
    } else
      ve = function() {
        K(Ee, 0);
      };
    function Ye(I, me) {
      V = K(function() {
        I(a.unstable_now());
      }, me);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(I) {
      I.callback = null;
    }, a.unstable_forceFrameRate = function(I) {
      0 > I || 125 < I ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : ae = 0 < I ? Math.floor(1e3 / I) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return N;
    }, a.unstable_next = function(I) {
      switch (N) {
        case 1:
        case 2:
        case 3:
          var me = 3;
          break;
        default:
          me = N;
      }
      var he = N;
      N = me;
      try {
        return I();
      } finally {
        N = he;
      }
    }, a.unstable_requestPaint = function() {
      k = !0;
    }, a.unstable_runWithPriority = function(I, me) {
      switch (I) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          I = 3;
      }
      var he = N;
      N = I;
      try {
        return me();
      } finally {
        N = he;
      }
    }, a.unstable_scheduleCallback = function(I, me, he) {
      var Me = a.unstable_now();
      switch (typeof he == "object" && he !== null ? (he = he.delay, he = typeof he == "number" && 0 < he ? Me + he : Me) : he = Me, I) {
        case 1:
          var Z = -1;
          break;
        case 2:
          Z = 250;
          break;
        case 5:
          Z = 1073741823;
          break;
        case 4:
          Z = 1e4;
          break;
        default:
          Z = 5e3;
      }
      return Z = he + Z, I = {
        id: v++,
        callback: me,
        priorityLevel: I,
        startTime: he,
        expirationTime: Z,
        sortIndex: -1
      }, he > Me ? (I.sortIndex = he, s(x, I), r(b) === null && I === r(x) && (U ? (X(V), V = -1) : U = !0, Ye(W, he - Me))) : (I.sortIndex = Z, s(b, I), T || j || (T = !0, $ || ($ = !0, ve()))), I;
    }, a.unstable_shouldYield = xe, a.unstable_wrapCallback = function(I) {
      var me = N;
      return function() {
        var he = N;
        N = me;
        try {
          return I.apply(this, arguments);
        } finally {
          N = he;
        }
      };
    };
  })(hd)), hd;
}
var k0;
function Vx() {
  return k0 || (k0 = 1, dd.exports = Gx()), dd.exports;
}
var md = { exports: {} }, $t = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var C0;
function Xx() {
  if (C0) return $t;
  C0 = 1;
  var a = eh();
  function s(v) {
    var p = "https://react.dev/errors/" + v;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var N = 2; N < arguments.length; N++)
        p += "&args[]=" + encodeURIComponent(arguments[N]);
    }
    return "Minified React error #" + v + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r() {
  }
  var o = {
    d: {
      f: r,
      r: function() {
        throw Error(s(522));
      },
      D: r,
      C: r,
      L: r,
      m: r,
      X: r,
      S: r,
      M: r
    },
    p: 0,
    findDOMNode: null
  }, f = Symbol.for("react.portal"), h = Symbol.for("react.recoverable"), m = Symbol.for("react.optimistic_key");
  function g(v, p, N) {
    var j = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: f,
      key: j == null ? null : j === m ? m : "" + j,
      children: v,
      containerInfo: p,
      implementation: N
    };
  }
  var b = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function x(v, p) {
    if (v === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return $t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, $t.browser = function(v) {
    return { $$typeof: h, _reason: v };
  }, $t.createPortal = function(v, p) {
    var N = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(s(299));
    return g(v, p, null, N);
  }, $t.flushSync = function(v) {
    var p = b.T, N = o.p;
    try {
      if (b.T = null, o.p = 2, v) return v();
    } finally {
      b.T = p, o.p = N, o.d.f();
    }
  }, $t.preconnect = function(v, p) {
    typeof v == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, o.d.C(v, p));
  }, $t.prefetchDNS = function(v) {
    typeof v == "string" && o.d.D(v);
  }, $t.preinit = function(v, p) {
    if (typeof v == "string" && p && typeof p.as == "string") {
      var N = p.as, j = x(N, p.crossOrigin), T = typeof p.integrity == "string" ? p.integrity : void 0, U = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      N === "style" ? o.d.S(
        v,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: j,
          integrity: T,
          fetchPriority: U
        }
      ) : N === "script" && o.d.X(v, {
        crossOrigin: j,
        integrity: T,
        fetchPriority: U,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, $t.preinitModule = function(v, p) {
    if (typeof v == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var N = x(
            p.as,
            p.crossOrigin
          );
          o.d.M(v, {
            crossOrigin: N,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0,
            fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0
          });
        }
      } else p == null && o.d.M(v);
  }, $t.preload = function(v, p) {
    if (typeof v == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var N = p.as, j = x(N, p.crossOrigin);
      o.d.L(v, N, {
        crossOrigin: j,
        integrity: typeof p.integrity == "string" ? p.integrity : void 0,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0,
        type: typeof p.type == "string" ? p.type : void 0,
        fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0,
        referrerPolicy: typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0,
        imageSrcSet: typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0,
        imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0,
        media: typeof p.media == "string" ? p.media : void 0
      });
    }
  }, $t.preloadModule = function(v, p) {
    if (typeof v == "string")
      if (p) {
        var N = x(p.as, p.crossOrigin);
        o.d.m(v, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: N,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0,
          nonce: typeof p.nonce == "string" ? p.nonce : void 0,
          fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0
        });
      } else o.d.m(v);
  }, $t.requestFormReset = function(v) {
    o.d.r(v);
  }, $t.unstable_batchedUpdates = function(v, p) {
    return v(p);
  }, $t.useFormState = function(v, p, N) {
    return b.H.useFormState(v, p, N);
  }, $t.useFormStatus = function() {
    return b.H.useHostTransitionStatus();
  }, $t.version = "19.3.0", $t;
}
var O0;
function zy() {
  if (O0) return md.exports;
  O0 = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (s) {
        console.error(s);
      }
  }
  return a(), md.exports = Xx(), md.exports;
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
var R0;
function Zx() {
  if (R0) return mc;
  R0 = 1;
  var a = Vx(), s = eh(), r = zy();
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
  function h(e) {
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
  function b(e) {
    if (h(e) !== e)
      throw Error(o(188));
  }
  function x(e) {
    var t = e.alternate;
    if (!t) {
      if (t = h(e), t === null) throw Error(o(188));
      return t !== e ? null : e;
    }
    for (var n = e, l = t; ; ) {
      var i = n.return;
      if (i === null) break;
      var c = i.alternate;
      if (c === null) {
        if (l = i.return, l !== null) {
          n = l;
          continue;
        }
        break;
      }
      if (i.child === c.child) {
        for (c = i.child; c; ) {
          if (c === n) return b(i), e;
          if (c === l) return b(i), t;
          c = c.sibling;
        }
        throw Error(o(188));
      }
      if (n.return !== l.return) n = i, l = c;
      else {
        for (var d = !1, y = i.child; y; ) {
          if (y === n) {
            d = !0, n = i, l = c;
            break;
          }
          if (y === l) {
            d = !0, l = i, n = c;
            break;
          }
          y = y.sibling;
        }
        if (!d) {
          for (y = c.child; y; ) {
            if (y === n) {
              d = !0, n = c, l = i;
              break;
            }
            if (y === l) {
              d = !0, l = c, n = i;
              break;
            }
            y = y.sibling;
          }
          if (!d) throw Error(o(189));
        }
      }
      if (n.alternate !== l) throw Error(o(190));
    }
    if (n.tag !== 3) throw Error(o(188));
    return n.stateNode.current === n ? e : t;
  }
  function v(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = v(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  function p(e, t, n, l, i, c) {
    for (; e !== null; ) {
      if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && n(e, l, i, c) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && p(
        e.child,
        t,
        n,
        l,
        i,
        c
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
  function j(e) {
    var t = !1;
    for (e = e.return; e !== null && (e.tag === 4 && (t = !0), !(e.tag === 3 || e.tag === 5 || e.tag === 27)); )
      e = e.return;
    return t;
  }
  function T(e) {
    var t = [null, null], n = N(e);
    return n === null || U(
      t,
      e,
      n.child,
      { foundSelf: !1 }
    ), t;
  }
  function U(e, t, n, l) {
    for (; n !== null; ) {
      if (n === t) l.foundSelf = !0;
      else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
        if (l.foundSelf) return e[1] = n, !0;
        e[0] = n;
      } else if ((n.tag !== 22 || n.memoizedState === null) && U(
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
  function k(e) {
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
  var K = null, X = null;
  function H(e, t, n) {
    return e === n ? !0 : e === t ? (K = e, !0) : !1;
  }
  function F(e, t, n) {
    return e === n ? (X = e, !1) : e === t ? (X !== null && (K = e), !0) : !1;
  }
  function W(e) {
    if (e === null) return null;
    do
      e = e === null ? null : e.return;
    while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
    return e || null;
  }
  function $(e, t, n) {
    for (var l = 0, i = e; i; i = n(i)) l++;
    i = 0;
    for (var c = t; c; c = n(c)) i++;
    for (; 0 < l - i; ) e = n(e), l--;
    for (; 0 < i - l; ) t = n(t), i--;
    for (; l--; ) {
      if (e === t || t !== null && e === t.alternate)
        return e;
      e = n(e), t = n(t);
    }
    return null;
  }
  var V = Object.assign, ae = Symbol.for("react.element"), ke = Symbol.for("react.transitional.element"), xe = Symbol.for("react.portal"), Ee = Symbol.for("react.fragment"), ve = Symbol.for("react.strict_mode"), at = Symbol.for("react.profiler"), We = Symbol.for("react.consumer"), Ye = Symbol.for("react.context"), I = Symbol.for("react.forward_ref"), me = Symbol.for("react.suspense"), he = Symbol.for("react.suspense_list"), Me = Symbol.for("react.memo"), Z = Symbol.for("react.lazy"), qe = Symbol.for("react.activity"), et = Symbol.for("react.legacy_hidden"), en = Symbol.for("react.memo_cache_sentinel"), _ = Symbol.for("react.view_transition"), B = Symbol.for("react.recoverable"), oe = Symbol.iterator;
  function ue(e) {
    return e === null || typeof e != "object" ? null : (e = oe && e[oe] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Ce = Symbol.for("react.client.reference");
  function _e(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Ce ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Ee:
        return "Fragment";
      case at:
        return "Profiler";
      case ve:
        return "StrictMode";
      case me:
        return "Suspense";
      case he:
        return "SuspenseList";
      case qe:
        return "Activity";
      case _:
        return "ViewTransition";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case xe:
          return "Portal";
        case Ye:
          return e.displayName || "Context";
        case We:
          return (e._context.displayName || "Context") + ".Consumer";
        case I:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case Me:
          return t = e.displayName || null, t !== null ? t : _e(e.type) || "Memo";
        case Z:
          t = e._payload, e = e._init;
          try {
            return _e(e(t));
          } catch {
          }
      }
    return null;
  }
  var De = Array.isArray, se = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, pe = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, it = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, vl = [], He = -1;
  function Yt(e) {
    return { current: e };
  }
  function Ne(e) {
    0 > He || (e.current = vl[He], vl[He] = null, He--);
  }
  function fe(e, t) {
    He++, vl[He] = e.current, e.current = t;
  }
  var st = Yt(null), tn = Yt(null), nn = Yt(null), Qt = Yt(null);
  function Hn(e, t) {
    switch (fe(nn, t), fe(tn, e), fe(st, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Mg(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Mg(t), e = Dg(t, e);
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
    Ne(st), fe(st, e);
  }
  function Kt() {
    Ne(st), Ne(tn), Ne(nn);
  }
  function ln(e) {
    var t = e.memoizedState;
    t !== null && (Ki._currentValue = t.memoizedState, fe(Qt, e)), t = st.current;
    var n = Dg(t, e.type);
    t !== n && (fe(tn, e), fe(st, n));
  }
  function Q(e) {
    tn.current === e && (Ne(st), Ne(tn)), Qt.current === e && (Ne(Qt), Ki._currentValue = it);
  }
  var P, be;
  function re(e) {
    if (P === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        P = t && t[1] || "", be = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + P + e + be;
  }
  var Et = !1;
  function wt(e, t) {
    if (!e || Et) return "";
    Et = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var Y = function() {
                throw Error();
              };
              if (Object.defineProperty(Y.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(Y, []);
                } catch (ee) {
                  var C = ee;
                }
                Reflect.construct(e, [], Y);
              } else {
                try {
                  Y.call();
                } catch (ee) {
                  C = ee;
                }
                Y = !1;
                try {
                  var z = Object.getOwnPropertyDescriptor(
                    e.prototype,
                    "props"
                  );
                  Object.defineProperty(e.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), Y = !0, new e();
                } finally {
                  Y && (z !== void 0 ? Object.defineProperty(e.prototype, "props", z) : delete e.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (ee) {
                C = ee;
              }
              (Y = e()) && typeof Y.catch == "function" && Y.catch(function() {
              });
            }
          } catch (ee) {
            if (ee && C && typeof ee.stack == "string")
              return [ee.stack, C.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var i = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      i && i.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var c = l.DetermineComponentFrameRoot(), d = c[0], y = c[1];
      if (d && y) {
        var w = d.split(`
`), R = y.split(`
`);
        for (i = l = 0; l < w.length && !w[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; i < R.length && !R[i].includes(
          "DetermineComponentFrameRoot"
        ); )
          i++;
        if (l === w.length || i === R.length)
          for (l = w.length - 1, i = R.length - 1; 1 <= l && 0 <= i && w[l] !== R[i]; )
            i--;
        for (; 1 <= l && 0 <= i; l--, i--)
          if (w[l] !== R[i]) {
            if (l !== 1 || i !== 1)
              do
                if (l--, i--, 0 > i || w[l] !== R[i]) {
                  var L = `
` + w[l].replace(" at new ", " at ");
                  return e.displayName && L.includes("<anonymous>") && (L = L.replace("<anonymous>", e.displayName)), L;
                }
              while (1 <= l && 0 <= i);
            break;
          }
      }
    } finally {
      Et = !1, Error.prepareStackTrace = n;
    }
    return (n = e ? e.displayName || e.name : "") ? re(n) : "";
  }
  function ii(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return re(e.type);
      case 16:
        return re("Lazy");
      case 13:
        return e.child !== t && t !== null ? re("Suspense Fallback") : re("Suspense");
      case 19:
        return re("SuspenseList");
      case 0:
      case 15:
        return wt(e.type, !1);
      case 11:
        return wt(e.type.render, !1);
      case 1:
        return wt(e.type, !0);
      case 31:
        return re("Activity");
      case 30:
        return re("ViewTransition");
      default:
        return "";
    }
  }
  function si(e) {
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
  var Pn = Object.prototype.hasOwnProperty, $l = a.unstable_scheduleCallback, Yl = a.unstable_cancelCallback, Rc = a.unstable_shouldYield, Mc = a.unstable_requestPaint, Gt = a.unstable_now, ps = a.unstable_getCurrentPriorityLevel, ci = a.unstable_ImmediatePriority, bl = a.unstable_UserBlockingPriority, Bn = a.unstable_NormalPriority, Dc = a.unstable_LowPriority, gs = a.unstable_IdlePriority, zc = a.log, Lc = a.unstable_setDisableYieldValue, Gl = null, _t = null;
  function dn(e) {
    if (typeof zc == "function" && Lc(e), _t && typeof _t.setStrictMode == "function")
      try {
        _t.setStrictMode(Gl, e);
      } catch {
      }
  }
  var ut = Math.clz32 ? Math.clz32 : vs, Vl = Math.log, ys = Math.LN2;
  function vs(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Vl(e) / ys | 0) | 0;
  }
  var ui = 256, Ea = 262144, Xl = 4194304;
  function Wn(e) {
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
  function Zl(e, t, n) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var i = 0, c = e.suspendedLanes, d = e.pingedLanes;
    e = e.warmLanes;
    var y = l & 134217727;
    return y !== 0 ? (l = y & ~c, l !== 0 ? i = Wn(l) : (d &= y, d !== 0 ? i = Wn(d) : n || (n = y & ~e, n !== 0 && (i = Wn(n))))) : (y = l & ~c, y !== 0 ? i = Wn(y) : d !== 0 ? i = Wn(d) : n || (n = l & ~e, n !== 0 && (i = Wn(n)))), i === 0 ? 0 : t !== 0 && t !== i && (t & c) === 0 && (c = i & -i, n = t & -t, c >= n || c === 32 && (n & 4194048) !== 0) ? t : i;
  }
  function Ta(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Ql(e, t) {
    (t & 8) !== 0 && (t |= t & 32);
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var l = 31 - ut(n), i = 1 << l;
        t |= e[l], n &= ~i;
      }
    return t;
  }
  function zr(e, t) {
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
  function Uc() {
    var e = Xl;
    return Xl <<= 1, (Xl & 62914560) === 0 && (Xl = 4194304), e;
  }
  function ct(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function wn(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Lr(e, t, n, l, i, c) {
    var d = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var y = e.entanglements, w = e.expirationTimes, R = e.hiddenUpdates;
    for (n = d & ~n; 0 < n; ) {
      var L = 31 - ut(n), Y = 1 << L;
      y[L] = 0, w[L] = -1;
      var C = R[L];
      if (C !== null)
        for (R[L] = null, L = 0; L < C.length; L++) {
          var z = C[L];
          z !== null && (z.lane &= -536870913);
        }
      n &= ~Y;
    }
    l !== 0 && bs(e, l, 0), c !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(d & ~t));
  }
  function bs(e, t, n) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - ut(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | n & 261930;
  }
  function ri(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var l = 31 - ut(n), i = 1 << l;
      i & t | e[l] & t && (e[l] |= t), n &= ~i;
    }
  }
  function xs(e, t) {
    var n = t & -t;
    return n = (n & 42) !== 0 ? 1 : oi(n), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n;
  }
  function oi(e) {
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
  function Ss(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Hc() {
    var e = pe.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : y0(e.type));
  }
  function Bc(e, t) {
    var n = pe.p;
    try {
      return pe.p = e, t();
    } finally {
      pe.p = n;
    }
  }
  var qn = Math.random().toString(36).slice(2), tt = "__reactFiber$" + qn, Mt = "__reactProps$" + qn, $n = "__reactContainer$" + qn, el = "__reactEvents$" + qn, Ur = "__reactListeners$" + qn, fi = "__reactHandles$" + qn, Ns = "__reactResources$" + qn, ja = "__reactMarker$" + qn, wa = "__reactLoad$" + qn;
  function _a(e) {
    delete e[tt], delete e[Mt], delete e[Ur], delete e[fi];
  }
  function _n(e) {
    var t;
    if (t = e[tt]) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[$n] || n[tt]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = Fg(e); e !== null; ) {
            if (n = e[tt]) return n;
            e = Fg(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function tl(e) {
    if (e = e[tt] || e[$n]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function nl(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function hn(e) {
    var t = e[Ns];
    return t || (t = e[Ns] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function rt(e) {
    e[ja] = !0;
  }
  function mn(e) {
    e[wa] = void 0;
  }
  var qc = /* @__PURE__ */ new Set(), Aa = {};
  function xl(e, t) {
    Sl(e, t), Sl(e + "Capture", t);
  }
  function Sl(e, t) {
    for (Aa[e] = t, e = 0; e < t.length; e++)
      qc.add(t[e]);
  }
  var $c = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Es = {}, Ts = {};
  function Hr(e) {
    return Pn.call(Ts, e) ? !0 : Pn.call(Es, e) ? !1 : $c.test(e) ? Ts[e] = !0 : (Es[e] = !0, !1);
  }
  var Ue = !1;
  function Yc() {
    var e = Ue;
    return Ue = !1, e;
  }
  function di(e, t, n) {
    if (Hr(t))
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
  function ka(e, t, n) {
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
  function an(e, t, n, l) {
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
  function Dt(e) {
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
  function J(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function E(e, t, n) {
    var l = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var i = l.get, c = l.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return i.call(this);
        },
        set: function(d) {
          n = "" + d, c.call(this, d);
        }
      }), Object.defineProperty(e, t, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return n;
        },
        setValue: function(d) {
          n = "" + d;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function M(e) {
    if (!e._valueTracker) {
      var t = J(e) ? "checked" : "value";
      e._valueTracker = E(
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
    return e && (l = J(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== n ? (t.setValue(e), !0) : !1;
  }
  var ne = /[\n"\\]/g;
  function le(e) {
    return e.replace(
      ne,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function ge(e, t, n, l, i, c, d, y) {
    e.name = "", d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? e.type = d : e.removeAttribute("type"), t != null ? d === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Dt(t)) : e.value !== "" + Dt(t) && (e.value = "" + Dt(t)) : d !== "submit" && d !== "reset" || e.removeAttribute("value"), t != null ? d === "number" && e.value == t ? Fe(e, Dt(e.value)) : Fe(e, Dt(t)) : n != null ? Fe(e, Dt(n)) : l != null && e.removeAttribute("value"), i == null && c != null && (e.defaultChecked = !!c), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? e.name = "" + Dt(y) : e.removeAttribute("name");
  }
  function Xe(e, t, n, l, i, c, d, y) {
    if (c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (e.type = c), t != null || n != null) {
      if (!(c !== "submit" && c !== "reset" || t != null)) {
        M(e);
        return;
      }
      n = n != null ? "" + Dt(n) : "", t = t != null ? "" + Dt(t) : n, y || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? i, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = y ? e.checked : !!l, e.defaultChecked = !!l, d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.name = d), M(e);
  }
  function Fe(e, t) {
    e.defaultValue !== "" + t && (e.defaultValue = "" + t);
  }
  function gt(e, t, n, l) {
    if (e = e.options, t) {
      t = {};
      for (var i = 0; i < n.length; i++)
        t["$" + n[i]] = !0;
      for (n = 0; n < e.length; n++)
        i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && l && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + Dt(n), t = null, i = 0; i < e.length; i++) {
        if (e[i].value === n) {
          e[i].selected = !0, l && (e[i].defaultSelected = !0);
          return;
        }
        t !== null || e[i].disabled || (t = e[i]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function zt(e, t, n) {
    if (t != null && (t = "" + Dt(t), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + Dt(n) : "";
  }
  function hi(e, t, n, l) {
    if (t == null) {
      if (l != null) {
        if (n != null) throw Error(o(92));
        if (De(l)) {
          if (1 < l.length) throw Error(o(93));
          l = l[0];
        }
        n = l;
      }
      n == null && (n = ""), t = n;
    }
    n = Dt(t), e.defaultValue = n, l = e.textContent, l === n && l !== "" && l !== null && (e.value = l), M(e);
  }
  function ht(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Gc = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Br(e, t, n) {
    var l = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Gc.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function wh(e, t, n) {
    if (t != null && typeof t != "object")
      throw Error(o(62));
    if (e = e.style, n != null) {
      for (var l in n)
        !n.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "", Ue = !0);
      for (var i in t)
        l = t[i], t.hasOwnProperty(i) && n[i] !== l && (Br(e, i, l), Ue = !0);
    } else
      for (var c in t)
        t.hasOwnProperty(c) && Br(e, c, t[c]);
  }
  function qr(e) {
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
  var c1 = /* @__PURE__ */ new Map([
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
  ]), u1 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Vc(e) {
    return u1.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function ll() {
  }
  var $r = null;
  function Yr(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var mi = null, pi = null;
  function _h(e) {
    var t = tl(e);
    if (t && (e = t.stateNode)) {
      var n = e[Mt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (ge(
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
              'input[name="' + le(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < n.length; t++) {
              var l = n[t];
              if (l !== e && l.form === e.form) {
                var i = l[Mt] || null;
                if (!i) throw Error(o(90));
                ge(
                  l,
                  i.value,
                  i.defaultValue,
                  i.defaultValue,
                  i.checked,
                  i.defaultChecked,
                  i.type,
                  i.name
                );
              }
            }
            for (t = 0; t < n.length; t++)
              l = n[t], l.form === e.form && G(l);
          }
          break e;
        case "textarea":
          zt(e, n.value, n.defaultValue);
          break e;
        case "select":
          t = n.value, t != null && gt(e, !!n.multiple, t, !1);
      }
    }
  }
  var Gr = !1;
  function Ah(e, t, n) {
    if (Gr) return e(t, n);
    Gr = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (Gr = !1, (mi !== null || pi !== null) && (Vu(), mi && (t = mi, e = pi, pi = mi = null, _h(t), e)))
        for (t = 0; t < e.length; t++) _h(e[t]);
    }
  }
  function js(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var l = n[Mt] || null;
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
  var Nl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Vr = !1;
  if (Nl)
    try {
      var ws = {};
      Object.defineProperty(ws, "passive", {
        get: function() {
          Vr = !0;
        }
      }), window.addEventListener("test", ws, ws), window.removeEventListener("test", ws, ws);
    } catch {
      Vr = !1;
    }
  var Kl = null, Xr = null, Xc = null;
  function kh() {
    if (Xc) return Xc;
    var e, t = Xr, n = t.length, l, i = "value" in Kl ? Kl.value : Kl.textContent, c = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++) ;
    var d = n - e;
    for (l = 1; l <= d && t[n - l] === i[c - l]; l++) ;
    return Xc = i.slice(e, 1 < l ? 1 - l : void 0);
  }
  function Zc(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Qc() {
    return !0;
  }
  function Ch() {
    return !1;
  }
  function It(e) {
    function t(n, l, i, c, d) {
      this._reactName = n, this._targetInst = i, this.type = l, this.nativeEvent = c, this.target = d, this.currentTarget = null;
      for (var y in e)
        e.hasOwnProperty(y) && (n = e[y], this[y] = n ? n(c) : c[y]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? Qc : Ch, this.isPropagationStopped = Ch, this;
    }
    return V(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Qc);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Qc);
      },
      persist: function() {
      },
      isPersistent: Qc
    }), t;
  }
  var Il = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Kc = It(Il), _s = V({}, Il, { view: 0, detail: 0 }), r1 = It(_s), Zr, Qr, As, Ic = V({}, _s, {
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
    getModifierState: Ir,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== As && (As && e.type === "mousemove" ? (Zr = e.screenX - As.screenX, Qr = e.screenY - As.screenY) : Qr = Zr = 0, As = e), Zr);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Qr;
    }
  }), Oh = It(Ic), o1 = V({}, Ic, { dataTransfer: 0 }), f1 = It(o1), d1 = V({}, _s, { relatedTarget: 0 }), Kr = It(d1), h1 = V({}, Il, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), m1 = It(h1), p1 = V({}, Il, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), g1 = It(p1), y1 = V({}, Il, { data: 0 }), Rh = It(y1), v1 = {
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
  }, b1 = {
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
  }, x1 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function S1(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = x1[e]) ? !!t[e] : !1;
  }
  function Ir() {
    return S1;
  }
  var N1 = V({}, _s, {
    key: function(e) {
      if (e.key) {
        var t = v1[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Zc(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? b1[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ir,
    charCode: function(e) {
      return e.type === "keypress" ? Zc(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Zc(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), E1 = It(N1), T1 = V({}, Ic, {
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
  }), Mh = It(T1), j1 = V({}, Il, { submitter: 0 }), w1 = It(j1), _1 = V({}, _s, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ir
  }), A1 = It(_1), k1 = V({}, Il, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), C1 = It(k1), O1 = V({}, Ic, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), R1 = It(O1), M1 = V({}, Il, {
    newState: 0,
    oldState: 0,
    source: 0
  }), D1 = It(M1), z1 = [9, 13, 27, 32], Jr = Nl && "CompositionEvent" in window, ks = null;
  Nl && "documentMode" in document && (ks = document.documentMode);
  var L1 = Nl && "TextEvent" in window && !ks, Dh = Nl && (!Jr || ks && 8 < ks && 11 >= ks), zh = " ", Lh = !1;
  function Uh(e, t) {
    switch (e) {
      case "keyup":
        return z1.indexOf(t.keyCode) !== -1;
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
  function Hh(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var gi = !1;
  function U1(e, t) {
    switch (e) {
      case "compositionend":
        return Hh(t);
      case "keypress":
        return t.which !== 32 ? null : (Lh = !0, zh);
      case "textInput":
        return e = t.data, e === zh && Lh ? null : e;
      default:
        return null;
    }
  }
  function H1(e, t) {
    if (gi)
      return e === "compositionend" || !Jr && Uh(e, t) ? (e = kh(), Xc = Xr = Kl = null, gi = !1, e) : null;
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
        return Dh && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var B1 = {
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
  function Bh(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!B1[e.type] : t === "textarea";
  }
  function qh(e, t, n, l) {
    mi ? pi ? pi.push(l) : pi = [l] : mi = l, t = Ju(t, "onChange"), 0 < t.length && (n = new Kc(
      "onChange",
      "change",
      null,
      n,
      l
    ), e.push({ event: n, listeners: t }));
  }
  var Cs = null, Os = null;
  function q1(e) {
    _g(e, 0);
  }
  function Jc(e) {
    var t = nl(e);
    if (G(t)) return e;
  }
  function $h(e, t) {
    if (e === "change") return t;
  }
  var Yh = !1;
  if (Nl) {
    var Fr;
    if (Nl) {
      var Pr = "oninput" in document;
      if (!Pr) {
        var Gh = document.createElement("div");
        Gh.setAttribute("oninput", "return;"), Pr = typeof Gh.oninput == "function";
      }
      Fr = Pr;
    } else Fr = !1;
    Yh = Fr && (!document.documentMode || 9 < document.documentMode);
  }
  function Vh() {
    Cs && (Cs.detachEvent("onpropertychange", Xh), Os = Cs = null);
  }
  function Xh(e) {
    if (e.propertyName === "value" && Jc(Os)) {
      var t = [];
      qh(
        t,
        Os,
        e,
        Yr(e)
      ), Ah(q1, t);
    }
  }
  function $1(e, t, n) {
    e === "focusin" ? (Vh(), Cs = t, Os = n, Cs.attachEvent("onpropertychange", Xh)) : e === "focusout" && Vh();
  }
  function Y1(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Jc(Os);
  }
  function G1(e, t) {
    if (e === "click") return Jc(t);
  }
  function V1(e, t) {
    if (e === "input" || e === "change")
      return Jc(t);
  }
  function X1(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var pn = typeof Object.is == "function" ? Object.is : X1;
  function Rs(e, t) {
    if (pn(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), l = Object.keys(t);
    if (n.length !== l.length) return !1;
    for (l = 0; l < n.length; l++) {
      var i = n[l];
      if (!Pn.call(t, i) || !pn(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  function Wr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Zh(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Qh(e, t) {
    var n = Zh(e);
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
      n = Zh(n);
    }
  }
  function Kh(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Kh(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Ih(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Wr(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Wr(e.document);
    }
    return t;
  }
  function eo(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Z1 = Nl && "documentMode" in document && 11 >= document.documentMode, yi = null, to = null, Ms = null, no = !1;
  function Jh(e, t, n) {
    var l = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    no || yi == null || yi !== Wr(l) || (l = yi, "selectionStart" in l && eo(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), Ms && Rs(Ms, l) || (Ms = l, l = Ju(to, "onSelect"), 0 < l.length && (t = new Kc(
      "onSelect",
      "select",
      null,
      t,
      n
    ), e.push({ event: t, listeners: l }), t.target = yi)));
  }
  function Ca(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var vi = {
    animationend: Ca("Animation", "AnimationEnd"),
    animationiteration: Ca("Animation", "AnimationIteration"),
    animationstart: Ca("Animation", "AnimationStart"),
    transitionrun: Ca("Transition", "TransitionRun"),
    transitionstart: Ca("Transition", "TransitionStart"),
    transitioncancel: Ca("Transition", "TransitionCancel"),
    transitionend: Ca("Transition", "TransitionEnd")
  }, lo = {}, Fh = {};
  Nl && (Fh = document.createElement("div").style, "AnimationEvent" in window || (delete vi.animationend.animation, delete vi.animationiteration.animation, delete vi.animationstart.animation), "TransitionEvent" in window || delete vi.transitionend.transition);
  function Oa(e) {
    if (lo[e]) return lo[e];
    if (!vi[e]) return e;
    var t = vi[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in Fh)
        return lo[e] = t[n];
    return e;
  }
  var Ph = Oa("animationend"), Wh = Oa("animationiteration"), em = Oa("animationstart"), Q1 = Oa("transitionrun"), K1 = Oa("transitionstart"), I1 = Oa("transitioncancel"), tm = Oa("transitionend"), nm = /* @__PURE__ */ new Map(), ao = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  ao.push("scrollEnd");
  function Yn(e, t) {
    nm.set(e, t), xl(t, [e]);
  }
  var J1 = 0;
  function El(e, t) {
    if (e.name != null && e.name !== "auto") return e.name;
    if (t.autoName !== null) return t.autoName;
    e = Zn.identifierPrefix;
    var n = J1++;
    return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
  }
  function lm(e) {
    if (e == null || typeof e == "string")
      return e;
    var t = null, n = Hi;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var i = e[n[l]];
        if (i != null) {
          if (i === "none") return "none";
          t = t == null ? i : t + (" " + i);
        }
      }
    return t ?? e.default;
  }
  function Tl(e, t) {
    return e = lm(e), t = lm(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
  }
  var Fc = typeof reportError == "function" ? reportError : function(e) {
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
  }, An = [], bi = 0, io = 0;
  function Pc() {
    for (var e = bi, t = io = bi = 0; t < e; ) {
      var n = An[t];
      An[t++] = null;
      var l = An[t];
      An[t++] = null;
      var i = An[t];
      An[t++] = null;
      var c = An[t];
      if (An[t++] = null, l !== null && i !== null) {
        var d = l.pending;
        d === null ? i.next = i : (i.next = d.next, d.next = i), l.pending = i;
      }
      c !== 0 && am(n, i, c);
    }
  }
  function Wc(e, t, n, l) {
    An[bi++] = e, An[bi++] = t, An[bi++] = n, An[bi++] = l, io |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function so(e, t, n, l) {
    return Wc(e, t, n, l), eu(e);
  }
  function Ra(e, t) {
    return Wc(e, null, null, t), eu(e);
  }
  function am(e, t, n) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n);
    for (var i = !1, c = e.return; c !== null; )
      c.childLanes |= n, l = c.alternate, l !== null && (l.childLanes |= n), c.tag === 22 && (e = c.stateNode, e === null || e._visibility & 1 || (i = !0)), e = c, c = c.return;
    return e.tag === 3 ? (c = e.stateNode, i && t !== null && (i = 31 - ut(n), e = c.hiddenUpdates, l = e[i], l === null ? e[i] = [t] : l.push(t), t.lane = n | 536870912), c) : null;
  }
  function eu(e) {
    if (50 < tc)
      throw tc = 0, Gu = null, Error(o(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var xi = {};
  function F1(e, t, n, l) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function sn(e, t, n, l) {
    return new F1(e, t, n, l);
  }
  function co(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function jl(e, t) {
    var n = e.alternate;
    return n === null ? (n = sn(
      e.tag,
      t,
      e.key,
      e.mode
    ), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 1206910976, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
  }
  function im(e, t) {
    e.flags &= 1206910978;
    var n = e.alternate;
    return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function tu(e, t, n, l, i, c) {
    var d = 0;
    if (l = e, typeof l == "function") co(l) && (d = 1);
    else if (typeof l == "string")
      d = jx(
        e,
        n,
        st.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (l) {
        case qe:
          return e = sn(31, n, t, i), e.elementType = qe, e.lanes = c, e;
        case Ee:
          return Ma(n.children, i, c, t);
        case ve:
          d = 8, i |= 24;
          break;
        case at:
          return e = sn(12, n, t, i | 2), e.elementType = at, e.lanes = c, e;
        case me:
          return e = sn(13, n, t, i), e.elementType = me, e.lanes = c, e;
        case he:
          return e = sn(19, n, t, i), e.elementType = he, e.lanes = c, e;
        case et:
        case _:
          return e = i | 32, e = sn(30, n, t, e), e.elementType = _, e.lanes = c, e.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, e;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case Ye:
                d = 10;
                break e;
              case We:
                d = 9;
                break e;
              case I:
                d = 11;
                break e;
              case Me:
                d = 14;
                break e;
              case Z:
                d = 16, l = null;
                break e;
            }
          d = 29, n = Error(
            o(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = sn(d, n, t, i), t.elementType = e, t.type = l, t.lanes = c, t;
  }
  function Ma(e, t, n, l) {
    return e = sn(7, e, l, t), e.lanes = n, e;
  }
  function uo(e, t, n) {
    return e = sn(6, e, null, t), e.lanes = n, e;
  }
  function sm(e) {
    var t = sn(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function ro(e, t, n) {
    return t = sn(
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
  var cm = /* @__PURE__ */ new WeakMap();
  function kn(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = cm.get(e);
      return n !== void 0 ? n : (t = {
        value: e,
        source: t,
        stack: si(t)
      }, cm.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: si(t)
    };
  }
  var Si = [], Ni = 0, nu = null, Ds = 0, Cn = [], On = 0, Jl = null, al = 1, il = "";
  function wl(e, t) {
    Si[Ni++] = Ds, Si[Ni++] = nu, nu = e, Ds = t;
  }
  function um(e, t, n) {
    Cn[On++] = al, Cn[On++] = il, Cn[On++] = Jl, Jl = e;
    var l = al;
    e = il;
    var i = 32 - ut(l) - 1;
    l &= ~(1 << i), n += 1;
    var c = 32 - ut(t) + i;
    if (30 < c) {
      var d = i - i % 5;
      c = (l & (1 << d) - 1).toString(32), l >>= d, i -= d, al = 1 << 32 - ut(t) + i | n << i | l, il = c + e;
    } else
      al = 1 << c | n << i | l, il = e;
  }
  function lu(e) {
    e.return !== null && (wl(e, 1), um(e, 1, 0));
  }
  function oo(e) {
    for (; e === nu; )
      nu = Si[--Ni], Si[Ni] = null, Ds = Si[--Ni], Si[Ni] = null;
    for (; e === Jl; )
      Jl = Cn[--On], Cn[On] = null, il = Cn[--On], Cn[On] = null, al = Cn[--On], Cn[On] = null;
  }
  function rm(e, t) {
    Cn[On++] = al, Cn[On++] = il, Cn[On++] = Jl, al = t.id, il = t.overflow, Jl = e;
  }
  var At = null, nt = null, Ae = !1, Fl = null, Rn = !1, fo = Error(o(519));
  function Pl(e) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw zs(kn(t, e)), fo;
  }
  function om(e) {
    var t = e.stateNode, n = e.type, l = e.memoizedProps;
    switch (t[tt] = e, t[Mt] = l, n) {
      case "dialog":
        Re("cancel", t), Re("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Re("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < lc.length; n++)
          Re(lc[n], t);
        break;
      case "source":
        Re("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Re("error", t), Re("load", t);
        break;
      case "details":
        Re("toggle", t);
        break;
      case "input":
        Re("invalid", t), Xe(
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
        Re("invalid", t);
        break;
      case "textarea":
        Re("invalid", t), hi(t, l.value, l.defaultValue, l.children);
    }
    n = l.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || l.suppressHydrationWarning === !0 || Og(t.textContent, n) ? (l.popover != null && (Re("beforetoggle", t), Re("toggle", t)), l.onScroll != null && Re("scroll", t), l.onScrollEnd != null && Re("scrollend", t), l.onClick != null && (t.onclick = ll), t = !0) : t = !1, t || Pl(e, !0);
  }
  function au(e) {
    for (At = e.return; At; )
      switch (At.tag) {
        case 5:
        case 31:
        case 13:
          Rn = !1;
          return;
        case 27:
        case 3:
          Rn = !0;
          return;
        default:
          At = At.return;
      }
  }
  function Ei(e) {
    if (e !== At) return !1;
    if (!Ae) return au(e), Ae = !0, !1;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Gf(e.type, e.memoizedProps)), n = !n), n && nt && Pl(e), au(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      nt = Jg(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      nt = Jg(e);
    } else
      t === 27 ? (t = nt, ma(e.type) ? (e = Pf, Pf = null, nt = e) : nt = t) : nt = At ? Dn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Da() {
    nt = At = null, Ae = !1;
  }
  function ho() {
    var e = Fl;
    return e !== null && (rn === null ? rn = e : rn.push.apply(
      rn,
      e
    ), Fl = null), e;
  }
  function zs(e) {
    Fl === null ? Fl = [e] : Fl.push(e);
  }
  var mo = Yt(null), za = null, _l = null;
  function Wl(e, t, n) {
    fe(mo, t._currentValue), t._currentValue = n;
  }
  function Al(e) {
    e._currentValue = mo.current, Ne(mo);
  }
  function iu(e, t, n) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function po(e, t, n, l) {
    var i = e.child;
    for (i !== null && (i.return = e); i !== null; ) {
      var c = i.dependencies;
      if (c !== null) {
        var d = i.child;
        c = c.firstContext;
        e: for (; c !== null; ) {
          var y = c;
          c = i;
          for (var w = 0; w < t.length; w++)
            if (y.context === t[w]) {
              c.lanes |= n, y = c.alternate, y !== null && (y.lanes |= n), iu(
                c.return,
                n,
                e
              ), l || (d = null);
              break e;
            }
          c = y.next;
        }
      } else if (i.tag === 18) {
        if (d = i.return, d === null) throw Error(o(341));
        d.lanes |= n, c = d.alternate, c !== null && (c.lanes |= n), iu(d, n, e), d = null;
      } else
        i.tag === 13 && i.memoizedState !== null && i.memoizedState.dehydrated === null ? (i.lanes |= n, d = i.alternate, d !== null && (d.lanes |= n), iu(
          i.return,
          n,
          e
        ), d = i.child, d = d !== null ? d.sibling : null) : d = i.child;
      if (d !== null) d.return = i;
      else
        for (d = i; d !== null; ) {
          if (d === e) {
            d = null;
            break;
          }
          if (i = d.sibling, i !== null) {
            i.return = d.return, d = i;
            break;
          }
          d = d.return;
        }
      i = d;
    }
  }
  function La(e, t, n, l) {
    e = null;
    for (var i = t, c = !1; i !== null; ) {
      if (!c) {
        if ((i.flags & 524288) !== 0) c = !0;
        else if ((i.flags & 262144) !== 0) break;
      }
      if (i.tag === 10) {
        var d = i.alternate;
        if (d === null) throw Error(o(387));
        if (d = d.memoizedProps, d !== null) {
          var y = i.type;
          pn(i.pendingProps.value, d.value) || (e !== null ? e.push(y) : e = [y]);
        }
      } else if (i === Qt.current) {
        if (d = i.alternate, d === null) throw Error(o(387));
        d.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e !== null ? e.push(Ki) : e = [Ki]);
      }
      i = i.return;
    }
    return e !== null && po(
      t,
      e,
      n,
      l
    ), t.flags |= 262144, e !== null;
  }
  function su(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!pn(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Ua(e) {
    za = e, _l = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Lt(e) {
    return fm(za, e);
  }
  function cu(e, t) {
    return za === null && Ua(e), fm(e, t);
  }
  function fm(e, t) {
    var n = t._currentValue;
    if (t = { context: t, memoizedValue: n, next: null }, _l === null) {
      if (e === null) throw Error(o(308));
      _l = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else _l = _l.next = t;
    return n;
  }
  var P1 = typeof AbortController < "u" ? AbortController : function() {
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
  }, W1 = a.unstable_scheduleCallback, eb = a.unstable_NormalPriority, vt = {
    $$typeof: Ye,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function go() {
    return {
      controller: new P1(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ls(e) {
    e.refCount--, e.refCount === 0 && W1(eb, function() {
      e.controller.abort();
    });
  }
  function dm(e, t) {
    if ((e.pendingLanes & 4194048) !== 0) {
      var n = e.transitionTypes;
      for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
        var l = t[e];
        n.indexOf(l) === -1 && n.push(l);
      }
    }
  }
  var Us = null;
  function tb(e) {
    var t = e.transitionTypes;
    return e.transitionTypes = null, t;
  }
  var Hs = null, yo = 0, Ha = 0, Ti = null;
  function nb(e, t) {
    if (Hs === null) {
      var n = Hs = [];
      yo = 0, Ha = Df(), Ti = {
        status: "pending",
        value: void 0,
        then: function(l) {
          n.push(l);
        }
      };
    }
    return yo++, t.then(hm, hm), t;
  }
  function hm() {
    if (--yo === 0 && (Us = null, Hs !== null)) {
      Ti !== null && (Ti.status = "fulfilled");
      var e = Hs;
      Hs = null, Ha = 0, Ti = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function lb(e, t) {
    var n = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(i) {
        n.push(i);
      }
    };
    return e.then(
      function() {
        l.status = "fulfilled", l.value = t;
        for (var i = 0; i < n.length; i++) (0, n[i])(t);
      },
      function(i) {
        for (l.status = "rejected", l.reason = i, i = 0; i < n.length; i++)
          (0, n[i])(void 0);
      }
    ), l;
  }
  var mm = se.S;
  se.S = function(e, t) {
    if (sg = Gt(), typeof t == "object" && t !== null && typeof t.then == "function" && nb(e, t), Us !== null)
      for (var n = Yi; n !== null; )
        dm(n, Us), n = n.next;
    if (n = e.types, n !== null) {
      for (var l = Yi; l !== null; )
        dm(l, n), l = l.next;
      if (Ha !== 0) {
        l = Us, l === null && (l = Us = []);
        for (var i = 0; i < n.length; i++) {
          var c = n[i];
          l.indexOf(c) === -1 && l.push(c);
        }
      }
    }
    mm !== null && mm(e, t);
  };
  var Ba = Yt(null);
  function vo() {
    var e = Ba.current;
    return e !== null ? e : Pe.pooledCache;
  }
  function uu(e, t) {
    t === null ? fe(Ba, Ba.current) : fe(Ba, t.pool);
  }
  function pm() {
    var e = vo();
    return e === null ? null : { parent: vt._currentValue, pool: e };
  }
  var ji = Error(o(460)), bo = Error(o(474)), ru = Error(o(542)), ou = { then: function() {
  } };
  function gm(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function ym(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(ll, ll), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, bm(e), e === void 0 && !("reason" in t) ? Error(o(600)) : e;
      default:
        if (typeof t.status == "string") t.then(ll, ll);
        else {
          if (e = Pe, e !== null && 100 < e.shellSuspendCounter)
            throw Error(o(482));
          e = t, e.status = "pending", e.then(
            function(l) {
              if (t.status === "pending") {
                var i = t;
                i.status = "fulfilled", i.value = l;
              }
            },
            function(l) {
              if (t.status === "pending") {
                var i = t;
                i.status = "rejected", i.reason = l;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, bm(e), e;
        }
        throw $a = t, ji;
    }
  }
  function qa(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? ($a = n, ji) : n;
    }
  }
  var $a = null;
  function vm() {
    if ($a === null) throw Error(o(459));
    var e = $a;
    return $a = null, e;
  }
  function bm(e) {
    if (e === ji || e === ru)
      throw Error(o(483));
  }
  var wi = null, Bs = 0;
  function fu(e) {
    var t = Bs;
    return Bs += 1, wi === null && (wi = []), ym(wi, e, t);
  }
  function ea(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function du(e, t) {
    throw t.$$typeof === ae ? Error(o(525)) : (e = Object.prototype.toString.call(t), Error(
      o(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function xm(e) {
    function t(O, A) {
      if (e) {
        var D = O.deletions;
        D === null ? (O.deletions = [A], O.flags |= 16) : D.push(A);
      }
    }
    function n(O, A) {
      if (!e) return null;
      for (; A !== null; )
        t(O, A), A = A.sibling;
      return null;
    }
    function l(O) {
      for (var A = /* @__PURE__ */ new Map(); O !== null; )
        O.key === null ? A.set(O.index, O) : A.set(O.key, O), O = O.sibling;
      return A;
    }
    function i(O, A) {
      return O = jl(O, A), O.index = 0, O.sibling = null, O;
    }
    function c(O, A, D) {
      return O.index = D, e ? (D = O.alternate, D !== null ? (D = D.index, D < A ? (O.flags |= 2, A) : D) : (O.flags |= 134217730, A)) : (O.flags |= 1048576, A);
    }
    function d(O) {
      return e && O.alternate === null && (O.flags |= 134217730), O;
    }
    function y(O, A, D, q) {
      return A === null || A.tag !== 6 ? (A = uo(D, O.mode, q), A.return = O, A) : (A = i(A, D), A.return = O, A);
    }
    function w(O, A, D, q) {
      var ie = D.type;
      return ie === Ee ? (O = L(
        O,
        A,
        D.props.children,
        q,
        D.key
      ), ea(O, D), O) : A !== null && (A.elementType === ie || typeof ie == "object" && ie !== null && ie.$$typeof === Z && qa(ie) === A.type) ? (A = i(A, D.props), ea(A, D), A.return = O, A) : (A = tu(
        D.type,
        D.key,
        D.props,
        null,
        O.mode,
        q
      ), ea(A, D), A.return = O, A);
    }
    function R(O, A, D, q) {
      return A === null || A.tag !== 4 || A.stateNode.containerInfo !== D.containerInfo || A.stateNode.implementation !== D.implementation ? (A = ro(D, O.mode, q), A.return = O, A) : (A = i(A, D.children || []), A.return = O, A);
    }
    function L(O, A, D, q, ie) {
      return A === null || A.tag !== 7 ? (A = Ma(
        D,
        O.mode,
        q,
        ie
      ), A.return = O, A) : (A = i(A, D), A.return = O, A);
    }
    function Y(O, A, D) {
      if (typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint")
        return A = uo(
          "" + A,
          O.mode,
          D
        ), A.return = O, A;
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case ke:
            return D = tu(
              A.type,
              A.key,
              A.props,
              null,
              O.mode,
              D
            ), ea(D, A), D.return = O, D;
          case xe:
            return A = ro(
              A,
              O.mode,
              D
            ), A.return = O, A;
          case Z:
            return A = qa(A), Y(O, A, D);
        }
        if (De(A) || ue(A))
          return A = Ma(
            A,
            O.mode,
            D,
            null
          ), A.return = O, A;
        if (typeof A.then == "function")
          return Y(O, fu(A), D);
        if (A.$$typeof === Ye)
          return Y(
            O,
            cu(O, A),
            D
          );
        du(O, A);
      }
      return null;
    }
    function C(O, A, D, q) {
      var ie = A !== null ? A.key : null;
      if (typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint")
        return ie !== null ? null : y(O, A, "" + D, q);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case ke:
            return D.key === ie ? w(O, A, D, q) : null;
          case xe:
            return D.key === ie ? R(O, A, D, q) : null;
          case Z:
            return D = qa(D), C(O, A, D, q);
        }
        if (De(D) || ue(D))
          return ie !== null ? null : L(O, A, D, q, null);
        if (typeof D.then == "function")
          return C(
            O,
            A,
            fu(D),
            q
          );
        if (D.$$typeof === Ye)
          return C(
            O,
            A,
            cu(O, D),
            q
          );
        du(O, D);
      }
      return null;
    }
    function z(O, A, D, q, ie) {
      if (typeof q == "string" && q !== "" || typeof q == "number" || typeof q == "bigint")
        return O = O.get(D) || null, y(A, O, "" + q, ie);
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case ke:
            return O = O.get(
              q.key === null ? D : q.key
            ) || null, w(A, O, q, ie);
          case xe:
            return O = O.get(
              q.key === null ? D : q.key
            ) || null, R(A, O, q, ie);
          case Z:
            return q = qa(q), z(
              O,
              A,
              D,
              q,
              ie
            );
        }
        if (De(q) || ue(q))
          return O = O.get(D) || null, L(A, O, q, ie, null);
        if (typeof q.then == "function")
          return z(
            O,
            A,
            D,
            fu(q),
            ie
          );
        if (q.$$typeof === Ye)
          return z(
            O,
            A,
            D,
            cu(A, q),
            ie
          );
        du(A, q);
      }
      return null;
    }
    function ee(O, A, D, q) {
      for (var ie = null, Le = null, de = A, ye = A = 0, St = null; de !== null && ye < D.length; ye++) {
        de.index > ye ? (St = de, de = null) : St = de.sibling;
        var Be = C(
          O,
          de,
          D[ye],
          q
        );
        if (Be === null) {
          de === null && (de = St);
          break;
        }
        e && de && Be.alternate === null && t(O, de), A = c(Be, A, ye), Le === null ? ie = Be : Le.sibling = Be, Le = Be, de = St;
      }
      if (ye === D.length)
        return n(O, de), Ae && wl(O, ye), ie;
      if (de === null) {
        for (; ye < D.length; ye++)
          de = Y(O, D[ye], q), de !== null && (A = c(
            de,
            A,
            ye
          ), Le === null ? ie = de : Le.sibling = de, Le = de);
        return Ae && wl(O, ye), ie;
      }
      for (de = l(de); ye < D.length; ye++)
        St = z(
          de,
          O,
          ye,
          D[ye],
          q
        ), St !== null && (e && (Be = St.alternate, Be !== null && de.delete(Be.key === null ? ye : Be.key)), A = c(
          St,
          A,
          ye
        ), Le === null ? ie = St : Le.sibling = St, Le = St);
      return e && de.forEach(function(ba) {
        return t(O, ba);
      }), Ae && wl(O, ye), ie;
    }
    function ce(O, A, D, q) {
      if (D == null) throw Error(o(151));
      for (var ie = null, Le = null, de = A, ye = A = 0, St = null, Be = D.next(); de !== null && !Be.done; ye++, Be = D.next()) {
        de.index > ye ? (St = de, de = null) : St = de.sibling;
        var ba = C(O, de, Be.value, q);
        if (ba === null) {
          de === null && (de = St);
          break;
        }
        e && de && ba.alternate === null && t(O, de), A = c(ba, A, ye), Le === null ? ie = ba : Le.sibling = ba, Le = ba, de = St;
      }
      if (Be.done)
        return n(O, de), Ae && wl(O, ye), ie;
      if (de === null) {
        for (; !Be.done; ye++, Be = D.next())
          Be = Y(O, Be.value, q), Be !== null && (A = c(Be, A, ye), Le === null ? ie = Be : Le.sibling = Be, Le = Be);
        return Ae && wl(O, ye), ie;
      }
      for (de = l(de); !Be.done; ye++, Be = D.next())
        Be = z(de, O, ye, Be.value, q), Be !== null && (e && (St = Be.alternate, St !== null && de.delete(
          St.key === null ? ye : St.key
        )), A = c(Be, A, ye), Le === null ? ie = Be : Le.sibling = Be, Le = Be);
      return e && de.forEach(function(Ux) {
        return t(O, Ux);
      }), Ae && wl(O, ye), ie;
    }
    function je(O, A, D, q) {
      if (typeof D == "object" && D !== null && D.type === Ee && D.key === null && D.props.ref === void 0 && (D = D.props.children), typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case ke:
            e: {
              for (var ie = D.key; A !== null; ) {
                if (A.key === ie) {
                  if (ie = D.type, ie === Ee) {
                    if (A.tag === 7) {
                      n(
                        O,
                        A.sibling
                      ), q = i(
                        A,
                        D.props.children
                      ), ea(q, D), q.return = O, O = q;
                      break e;
                    }
                  } else if (A.elementType === ie || typeof ie == "object" && ie !== null && ie.$$typeof === Z && qa(ie) === A.type) {
                    n(
                      O,
                      A.sibling
                    ), q = i(A, D.props), ea(q, D), q.return = O, O = q;
                    break e;
                  }
                  n(O, A);
                  break;
                } else t(O, A);
                A = A.sibling;
              }
              D.type === Ee ? (q = Ma(
                D.props.children,
                O.mode,
                q,
                D.key
              ), ea(q, D), q.return = O, O = q) : (q = tu(
                D.type,
                D.key,
                D.props,
                null,
                O.mode,
                q
              ), ea(q, D), q.return = O, O = q);
            }
            return d(O);
          case xe:
            e: {
              for (ie = D.key; A !== null; ) {
                if (A.key === ie)
                  if (A.tag === 4 && A.stateNode.containerInfo === D.containerInfo && A.stateNode.implementation === D.implementation) {
                    n(
                      O,
                      A.sibling
                    ), q = i(A, D.children || []), q.return = O, O = q;
                    break e;
                  } else {
                    n(O, A);
                    break;
                  }
                else t(O, A);
                A = A.sibling;
              }
              q = ro(D, O.mode, q), q.return = O, O = q;
            }
            return d(O);
          case Z:
            return D = qa(D), je(
              O,
              A,
              D,
              q
            );
        }
        if (De(D))
          return ee(
            O,
            A,
            D,
            q
          );
        if (ue(D)) {
          if (ie = ue(D), typeof ie != "function") throw Error(o(150));
          return D = ie.call(D), ce(
            O,
            A,
            D,
            q
          );
        }
        if (typeof D.then == "function")
          return je(
            O,
            A,
            fu(D),
            q
          );
        if (D.$$typeof === Ye)
          return je(
            O,
            A,
            cu(O, D),
            q
          );
        du(O, D);
      }
      return typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint" ? (D = "" + D, A !== null && A.tag === 6 ? (n(O, A.sibling), q = i(A, D), q.return = O, O = q) : (n(O, A), q = uo(D, O.mode, q), q.return = O, O = q), d(O)) : n(O, A);
    }
    return function(O, A, D, q) {
      try {
        Bs = 0;
        var ie = je(
          O,
          A,
          D,
          q
        );
        return wi = null, ie;
      } catch (de) {
        if (de === ji || de === ru) throw de;
        var Le = sn(29, de, null, O.mode);
        return Le.lanes = q, Le.return = O, Le;
      } finally {
      }
    };
  }
  var Ya = xm(!0), Sm = xm(!1), ta = !1;
  function xo(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function So(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function na(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function la(e, t, n) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (Ge & 2) !== 0) {
      var i = l.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), l.pending = t, t = eu(e), am(e, null, n), t;
    }
    return Wc(e, l, t, n), eu(e);
  }
  function qs(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, n |= l, t.lanes = n, ri(e, n);
    }
  }
  function No(e, t) {
    var n = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, n === l)) {
      var i = null, c = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var d = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          c === null ? i = c = d : c = c.next = d, n = n.next;
        } while (n !== null);
        c === null ? i = c = t : c = c.next = t;
      } else i = c = t;
      n = {
        baseState: l.baseState,
        firstBaseUpdate: i,
        lastBaseUpdate: c,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  var Eo = !1;
  function $s() {
    if (Eo) {
      var e = Ti;
      if (e !== null) throw e;
    }
  }
  function Ys(e, t, n, l) {
    Eo = !1;
    var i = e.updateQueue;
    ta = !1;
    var c = i.firstBaseUpdate, d = i.lastBaseUpdate, y = i.shared.pending;
    if (y !== null) {
      i.shared.pending = null;
      var w = y, R = w.next;
      w.next = null, d === null ? c = R : d.next = R, d = w;
      var L = e.alternate;
      L !== null && (L = L.updateQueue, y = L.lastBaseUpdate, y !== d && (y === null ? L.firstBaseUpdate = R : y.next = R, L.lastBaseUpdate = w));
    }
    if (c !== null) {
      var Y = i.baseState;
      d = 0, L = R = w = null, y = c;
      do {
        var C = y.lane & -536870913, z = C !== y.lane;
        if (z ? (ze & C) === C : (l & C) === C) {
          C !== 0 && C === Ha && (Eo = !0), L !== null && (L = L.next = {
            lane: 0,
            tag: y.tag,
            payload: y.payload,
            callback: null,
            next: null
          });
          e: {
            var ee = e, ce = y;
            C = t;
            var je = n;
            switch (ce.tag) {
              case 1:
                if (ee = ce.payload, typeof ee == "function") {
                  Y = ee.call(je, Y, C);
                  break e;
                }
                Y = ee;
                break e;
              case 3:
                ee.flags = ee.flags & -65537 | 128;
              case 0:
                if (ee = ce.payload, C = typeof ee == "function" ? ee.call(je, Y, C) : ee, C == null) break e;
                Y = V({}, Y, C);
                break e;
              case 2:
                ta = !0;
            }
          }
          C = y.callback, C !== null && (e.flags |= 64, z && (e.flags |= 8192), z = i.callbacks, z === null ? i.callbacks = [C] : z.push(C));
        } else
          z = {
            lane: C,
            tag: y.tag,
            payload: y.payload,
            callback: y.callback,
            next: null
          }, L === null ? (R = L = z, w = Y) : L = L.next = z, d |= C;
        if (y = y.next, y === null) {
          if (y = i.shared.pending, y === null)
            break;
          z = y, y = z.next, z.next = null, i.lastBaseUpdate = z, i.shared.pending = null;
        }
      } while (!0);
      L === null && (w = Y), i.baseState = w, i.firstBaseUpdate = R, i.lastBaseUpdate = L, c === null && (i.shared.lanes = 0), oa |= d, e.lanes = d, e.memoizedState = Y;
    }
  }
  function Nm(e, t) {
    if (typeof e != "function")
      throw Error(o(191, e));
    e.call(t);
  }
  function Em(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++)
        Nm(n[e], t);
  }
  var aa = Yt(null), hu = Yt(0);
  function Tm(e, t) {
    e = Ml, fe(hu, e), fe(aa, t), Ml = e | t.baseLanes;
  }
  function To() {
    fe(hu, Ml), fe(aa, aa.current);
  }
  function jo() {
    Ml = hu.current, Ne(aa), Ne(hu);
  }
  var Ut = Yt(null), Vt = null;
  function ia(e) {
    var t = e.alternate;
    fe(Ht, Ht.current & 1), fe(Ut, e), Vt === null && (t === null || aa.current !== null || t.memoizedState !== null) && (Vt = e);
  }
  function wo(e) {
    fe(Ht, Ht.current), fe(Ut, e), Vt === null && (Vt = e);
  }
  function jm(e) {
    e.tag === 22 ? (fe(Ht, Ht.current), fe(Ut, e), Vt === null && (Vt = e)) : sa();
  }
  function sa() {
    fe(Ht, Ht.current), fe(Ut, Ut.current);
  }
  function gn(e) {
    Ne(Ut), Vt === e && (Vt = null), Ne(Ht);
  }
  var Ht = Yt(0);
  function Gs(e, t) {
    fe(Ut, Ut.current), fe(Ht, t);
  }
  function _o(e) {
    Ne(Ht), Ne(Ut), Vt === e && (Vt = null);
  }
  function mu(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || Jf(n) || Ff(n)))
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
  var kl = 0, Te = null, Je = null, bt = null, pu = !1, _i = !1, Ga = !1, gu = 0, Vs = 0, Ai = null, ab = 0;
  function mt() {
    throw Error(o(321));
  }
  function Ao(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!pn(e[n], t[n])) return !1;
    return !0;
  }
  function ko(e, t, n, l, i, c) {
    return kl = c, Te = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, se.H = e === null || e.memoizedState === null ? up : rp, Ga = !1, c = n(l, i), Ga = !1, _i && (c = _m(
      t,
      n,
      l,
      i
    )), wm(e), c;
  }
  function wm(e) {
    se.H = Eu;
    var t = Je !== null && Je.next !== null;
    if (kl = 0, bt = Je = Te = null, pu = !1, Vs = 0, Ai = null, t) throw Error(o(300));
    e === null || xt || (e = e.dependencies, e !== null && su(e) && (xt = !0));
  }
  function _m(e, t, n, l) {
    Te = e;
    var i = 0;
    do {
      if (_i && (Ai = null), Vs = 0, _i = !1, 25 <= i) throw Error(o(301));
      if (i += 1, bt = Je = null, e.updateQueue != null) {
        var c = e.updateQueue;
        c.lastEffect = null, c.events = null, c.stores = null, c.memoCache != null && (c.memoCache.index = 0);
      }
      se.H = db, c = t(n, l);
    } while (_i);
    return c;
  }
  function ib() {
    var e = se.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Xs(t) : t, e = e.useState()[0], (Je !== null ? Je.memoizedState : null) !== e && (Te.flags |= 1024), t;
  }
  function Co() {
    var e = gu !== 0;
    return gu = 0, e;
  }
  function Oo(e, t, n) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
  }
  function Ro(e) {
    if (pu) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      pu = !1;
    }
    kl = 0, bt = Je = Te = null, _i = !1, Vs = gu = 0, Ai = null;
  }
  function Jt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return bt === null ? Te.memoizedState = bt = e : bt = bt.next = e, bt;
  }
  function yt() {
    if (Je === null) {
      var e = Te.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Je.next;
    var t = bt === null ? Te.memoizedState : bt.next;
    if (t !== null)
      bt = t, Je = e;
    else {
      if (e === null)
        throw Te.alternate === null ? Error(o(467)) : Error(o(310));
      Je = e, e = {
        memoizedState: Je.memoizedState,
        baseState: Je.baseState,
        baseQueue: Je.baseQueue,
        queue: Je.queue,
        next: null
      }, bt === null ? Te.memoizedState = bt = e : bt = bt.next = e;
    }
    return bt;
  }
  function yu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Xs(e) {
    var t = Vs;
    return Vs += 1, Ai === null && (Ai = []), e = ym(Ai, e, t), t = Te, (bt === null ? t.memoizedState : bt.next) === null && (t = t.alternate, se.H = t === null || t.memoizedState === null ? up : rp), e;
  }
  function vu(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Xs(e);
      if (e.$$typeof === B) return;
      if (e.$$typeof === Ye) return Lt(e);
    }
    throw Error(o(438, String(e)));
  }
  function Mo(e) {
    var t = null, n = Te.updateQueue;
    if (n !== null && (t = n.memoCache), t == null) {
      var l = Te.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(i) {
          return i.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = yu(), Te.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
      for (n = t.data[t.index] = Array(e), l = 0; l < e; l++)
        n[l] = en;
    return t.index++, n;
  }
  function Cl(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function bu(e) {
    var t = yt();
    return Do(t, Je, e);
  }
  function Do(e, t, n) {
    var l = e.queue;
    if (l === null) throw Error(o(311));
    l.lastRenderedReducer = n;
    var i = e.baseQueue, c = l.pending;
    if (c !== null) {
      if (i !== null) {
        var d = i.next;
        i.next = c.next, c.next = d;
      }
      t.baseQueue = i = c, l.pending = null;
    }
    if (c = e.baseState, i === null) e.memoizedState = c;
    else {
      t = i.next;
      var y = d = null, w = null, R = t, L = !1;
      do {
        var Y = R.lane & -536870913;
        if (Y !== R.lane ? (ze & Y) === Y : (kl & Y) === Y) {
          var C = R.revertLane;
          if (C === 0)
            w !== null && (w = w.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: R.action,
              hasEagerState: R.hasEagerState,
              eagerState: R.eagerState,
              next: null
            }), Y === Ha && (L = !0);
          else if ((kl & C) === C) {
            R = R.next, C === Ha && (L = !0);
            continue;
          } else
            Y = {
              lane: 0,
              revertLane: R.revertLane,
              gesture: null,
              action: R.action,
              hasEagerState: R.hasEagerState,
              eagerState: R.eagerState,
              next: null
            }, w === null ? (y = w = Y, d = c) : w = w.next = Y, Te.lanes |= C, oa |= C;
          Y = R.action, Ga && n(c, Y), c = R.hasEagerState ? R.eagerState : n(c, Y);
        } else
          C = {
            lane: Y,
            revertLane: R.revertLane,
            gesture: R.gesture,
            action: R.action,
            hasEagerState: R.hasEagerState,
            eagerState: R.eagerState,
            next: null
          }, w === null ? (y = w = C, d = c) : w = w.next = C, Te.lanes |= Y, oa |= Y;
        R = R.next;
      } while (R !== null && R !== t);
      if (w === null ? d = c : w.next = y, !pn(c, e.memoizedState) && (xt = !0, L && (n = Ti, n !== null)))
        throw n;
      e.memoizedState = c, e.baseState = d, e.baseQueue = w, l.lastRenderedState = c;
    }
    return i === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function zo(e) {
    var t = yt(), n = t.queue;
    if (n === null) throw Error(o(311));
    n.lastRenderedReducer = e;
    var l = n.dispatch, i = n.pending, c = t.memoizedState;
    if (i !== null) {
      n.pending = null;
      var d = i = i.next;
      do
        c = e(c, d.action), d = d.next;
      while (d !== i);
      pn(c, t.memoizedState) || (xt = !0), t.memoizedState = c, t.baseQueue === null && (t.baseState = c), n.lastRenderedState = c;
    }
    return [c, l];
  }
  function Am(e, t, n) {
    var l = Te, i = yt(), c = Ae;
    if (c) {
      if (n === void 0) throw Error(o(407));
      n = n();
    } else n = t();
    var d = !pn(
      (Je || i).memoizedState,
      n
    );
    if (d && (i.memoizedState = n, xt = !0), i = i.queue, Ho(Om.bind(null, l, i, e), [
      e
    ]), e = i.getSnapshot !== t || d || bt !== null && (bt.memoizedState.tag & 1) !== 0, ki(
      e ? 9 : 8,
      { destroy: void 0 },
      Cm.bind(null, l, i, n, t),
      null
    ), e) {
      if (l.flags |= 2048, Pe === null) throw Error(o(349));
      c || (kl & 127) !== 0 || km(l, t, n);
    }
    return n;
  }
  function km(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Te.updateQueue, t === null ? (t = yu(), Te.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function Cm(e, t, n, l) {
    t.value = n, t.getSnapshot = l, Rm(t) && Mm(e);
  }
  function Om(e, t, n) {
    return n(function() {
      Rm(t) && Mm(e);
    });
  }
  function Rm(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !pn(e, n);
    } catch {
      return !0;
    }
  }
  function Mm(e) {
    var t = Ra(e, 2);
    t !== null && on(t, e, 2);
  }
  function Lo(e) {
    var t = Jt();
    if (typeof e == "function") {
      var n = e;
      if (e = n(), Ga) {
        dn(!0);
        try {
          n();
        } finally {
          dn(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Cl,
      lastRenderedState: e
    }, t;
  }
  function Dm(e, t, n, l) {
    return e.baseState = n, Do(
      e,
      Je,
      typeof l == "function" ? l : Cl
    );
  }
  function sb(e, t, n, l, i) {
    if (Nu(e)) throw Error(o(485));
    if (e = t.action, e !== null) {
      var c = {
        payload: i,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(d) {
          c.listeners.push(d);
        }
      };
      se.T !== null ? n(!0) : c.isTransition = !1, l(c), n = t.pending, n === null ? (c.next = t.pending = c, zm(t, c)) : (c.next = n.next, t.pending = n.next = c);
    }
  }
  function zm(e, t) {
    var n = t.action, l = t.payload, i = e.state;
    if (t.isTransition) {
      var c = se.T, d = {};
      d.types = c !== null ? c.types : null, se.T = d;
      try {
        var y = n(i, l), w = se.S;
        w !== null && w(d, y), Lm(e, t, y);
      } catch (R) {
        Uo(e, t, R);
      } finally {
        c !== null && d.types !== null && (c.types = d.types), se.T = c;
      }
    } else
      try {
        c = n(i, l), Lm(e, t, c);
      } catch (R) {
        Uo(e, t, R);
      }
  }
  function Lm(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(l) {
        Um(e, t, l);
      },
      function(l) {
        return Uo(e, t, l);
      }
    ) : Um(e, t, n);
  }
  function Um(e, t, n) {
    t.status = "fulfilled", t.value = n, Hm(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, zm(e, n)));
  }
  function Uo(e, t, n) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = n, Hm(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function Hm(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Bm(e, t) {
    return t;
  }
  function qm(e, t) {
    if (Ae) {
      var n = Pe.formState;
      if (n !== null) {
        e: {
          var l = Te;
          if (Ae) {
            if (nt) {
              t: {
                for (var i = nt, c = Rn; i.nodeType !== 8; ) {
                  if (!c) {
                    i = null;
                    break t;
                  }
                  if (i = Dn(
                    i.nextSibling
                  ), i === null) {
                    i = null;
                    break t;
                  }
                }
                c = i.data, i = c === "F!" || c === "F" ? i : null;
              }
              if (i) {
                nt = Dn(
                  i.nextSibling
                ), l = i.data === "F!";
                break e;
              }
            }
            Pl(l);
          }
          l = !1;
        }
        l && (t = n[0]);
      }
    }
    return n = Jt(), n.memoizedState = n.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Bm,
      lastRenderedState: t
    }, n.queue = l, n = ip.bind(
      null,
      Te,
      l
    ), l.dispatch = n, l = Lo(!1), c = Go.bind(
      null,
      Te,
      !1,
      l.queue
    ), l = Jt(), i = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = i, n = sb.bind(
      null,
      Te,
      i,
      c,
      n
    ), i.dispatch = n, l.memoizedState = e, [t, n, !1];
  }
  function $m(e) {
    var t = yt();
    return Ym(t, Je, e);
  }
  function Ym(e, t, n) {
    if (t = Do(
      e,
      t,
      Bm
    )[0], e = bu(Cl)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = Xs(t);
      } catch (d) {
        throw d === ji ? ru : d;
      }
    else l = t;
    t = yt();
    var i = t.queue, c = i.dispatch;
    return n !== t.memoizedState && (Te.flags |= 2048, ki(
      9,
      { destroy: void 0 },
      cb.bind(null, i, n),
      null
    )), [l, c, e];
  }
  function cb(e, t) {
    e.action = t;
  }
  function Gm(e) {
    var t = yt(), n = Je;
    if (n !== null)
      return Ym(t, n, e);
    yt(), t = t.memoizedState, n = yt();
    var l = n.queue.dispatch;
    return n.memoizedState = e, [t, l, !1];
  }
  function ki(e, t, n, l) {
    return e = { tag: e, create: n, deps: l, inst: t, next: null }, t = Te.updateQueue, t === null && (t = yu(), Te.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (l = n.next, n.next = e, e.next = l, t.lastEffect = e), e;
  }
  function Vm() {
    return yt().memoizedState;
  }
  function xu(e, t, n, l) {
    var i = Jt();
    Te.flags |= e, i.memoizedState = ki(
      1 | t,
      { destroy: void 0 },
      n,
      l === void 0 ? null : l
    );
  }
  function Su(e, t, n, l) {
    var i = yt();
    l = l === void 0 ? null : l;
    var c = i.memoizedState.inst;
    Je !== null && l !== null && Ao(l, Je.memoizedState.deps) ? i.memoizedState = ki(t, c, n, l) : (Te.flags |= e, i.memoizedState = ki(
      1 | t,
      c,
      n,
      l
    ));
  }
  function Xm(e, t) {
    xu(8390656, 8, e, t);
  }
  function Ho(e, t) {
    Su(2048, 8, e, t);
  }
  function ub(e) {
    Te.flags |= 4;
    var t = Te.updateQueue;
    if (t === null)
      t = yu(), Te.updateQueue = t, t.events = [e];
    else {
      var n = t.events;
      n === null ? t.events = [e] : n.push(e);
    }
  }
  function Zm(e) {
    var t = yt().memoizedState;
    return ub({ ref: t, nextImpl: e }), function() {
      if ((Ge & 2) !== 0) throw Error(o(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Qm(e, t) {
    return Su(4, 2, e, t);
  }
  function Km(e, t) {
    return Su(4, 4, e, t);
  }
  function Im(e, t) {
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
  function Jm(e, t, n) {
    n = n != null ? n.concat([e]) : null, Su(4, 4, Im.bind(null, t, e), n);
  }
  function Bo() {
  }
  function Fm(e, t) {
    var n = yt();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    return t !== null && Ao(t, l[1]) ? l[0] : (n.memoizedState = [e, t], e);
  }
  function Pm(e, t) {
    var n = yt();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    if (t !== null && Ao(t, l[1]))
      return l[0];
    if (l = e(), Ga) {
      dn(!0);
      try {
        e();
      } finally {
        dn(!1);
      }
    }
    return n.memoizedState = [l, t], l;
  }
  function qo(e, t, n) {
    return n === void 0 || (kl & 1073741824) !== 0 && (ze & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = ug(), Te.lanes |= e, oa |= e, n);
  }
  function Wm(e, t, n, l) {
    return pn(n, t) ? n : aa.current !== null ? (e = qo(e, n, l), pn(e, t) || (xt = !0), e) : (kl & 106) === 0 || (kl & 1073741824) !== 0 && (ze & 261930) === 0 ? (xt = !0, e.memoizedState = n) : (e = ug(), Te.lanes |= e, oa |= e, t);
  }
  function ep(e, t, n, l, i) {
    var c = pe.p;
    pe.p = c !== 0 && 8 > c ? c : 8;
    var d = se.T, y = {};
    y.types = d !== null ? d.types : null, se.T = y, Go(e, !1, t, n);
    try {
      var w = i(), R = se.S;
      if (R !== null && R(y, w), w !== null && typeof w == "object" && typeof w.then == "function") {
        var L = lb(
          w,
          l
        );
        Zs(
          e,
          t,
          L,
          xn(e)
        );
      } else
        Zs(
          e,
          t,
          l,
          xn(e)
        );
    } catch (Y) {
      Zs(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: Y },
        xn()
      );
    } finally {
      pe.p = c, d !== null && y.types !== null && (d.types = y.types), se.T = d;
    }
  }
  function rb() {
  }
  function $o(e, t, n, l) {
    if (e.tag !== 5) throw Error(o(476));
    var i = tp(e).queue;
    ep(
      e,
      i,
      t,
      it,
      n === null ? rb : function() {
        return np(e), n(l);
      }
    );
  }
  function tp(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: it,
      baseState: it,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Cl,
        lastRenderedState: it
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
        lastRenderedReducer: Cl,
        lastRenderedState: n
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function np(e) {
    var t = tp(e);
    t.next === null && (t = e.alternate.memoizedState), Zs(
      e,
      t.next.queue,
      {},
      xn()
    );
  }
  function Yo() {
    return Lt(Ki);
  }
  function lp() {
    return yt().memoizedState;
  }
  function ap() {
    return yt().memoizedState;
  }
  function ob(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = xn();
          e = na(n);
          var l = la(t, e, n);
          l !== null && (on(l, t, n), qs(l, t, n)), t = { cache: go() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function fb(e, t, n) {
    var l = xn();
    n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Nu(e) ? sp(t, n) : (n = so(e, t, n, l), n !== null && (on(n, e, l), cp(n, t, l)));
  }
  function ip(e, t, n) {
    var l = xn();
    Zs(e, t, n, l);
  }
  function Zs(e, t, n, l) {
    var i = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Nu(e)) sp(t, i);
    else {
      var c = e.alternate;
      if (e.lanes === 0 && (c === null || c.lanes === 0) && (c = t.lastRenderedReducer, c !== null))
        try {
          var d = t.lastRenderedState, y = c(d, n);
          if (i.hasEagerState = !0, i.eagerState = y, pn(y, d))
            return Wc(e, t, i, 0), Pe === null && Pc(), !1;
        } catch {
        } finally {
        }
      if (n = so(e, t, i, l), n !== null)
        return on(n, e, l), cp(n, t, l), !0;
    }
    return !1;
  }
  function Go(e, t, n, l) {
    if (l = {
      lane: 2,
      revertLane: Df(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Nu(e)) {
      if (t) throw Error(o(479));
    } else
      t = so(
        e,
        n,
        l,
        2
      ), t !== null && on(t, e, 2);
  }
  function Nu(e) {
    var t = e.alternate;
    return e === Te || t !== null && t === Te;
  }
  function sp(e, t) {
    _i = pu = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function cp(e, t, n) {
    if ((n & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, n |= l, t.lanes = n, ri(e, n);
    }
  }
  var Eu = {
    readContext: Lt,
    use: vu,
    useCallback: mt,
    useContext: mt,
    useEffect: mt,
    useImperativeHandle: mt,
    useLayoutEffect: mt,
    useInsertionEffect: mt,
    useMemo: mt,
    useReducer: mt,
    useRef: mt,
    useState: mt,
    useDebugValue: mt,
    useDeferredValue: mt,
    useTransition: mt,
    useSyncExternalStore: mt,
    useId: mt,
    useHostTransitionStatus: mt,
    useFormState: mt,
    useActionState: mt,
    useOptimistic: mt,
    useMemoCache: mt,
    useCacheRefresh: mt,
    useEffectEvent: mt
  }, up = {
    readContext: Lt,
    use: vu,
    useCallback: function(e, t) {
      return Jt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Lt,
    useEffect: Xm,
    useImperativeHandle: function(e, t, n) {
      n = n != null ? n.concat([e]) : null, xu(
        4194308,
        4,
        Im.bind(null, t, e),
        n
      );
    },
    useLayoutEffect: function(e, t) {
      return xu(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      xu(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var n = Jt();
      t = t === void 0 ? null : t;
      var l = e();
      if (Ga) {
        dn(!0);
        try {
          e();
        } finally {
          dn(!1);
        }
      }
      return n.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, n) {
      var l = Jt();
      if (n !== void 0) {
        var i = n(t);
        if (Ga) {
          dn(!0);
          try {
            n(t);
          } finally {
            dn(!1);
          }
        }
      } else i = t;
      return l.memoizedState = l.baseState = i, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: i
      }, l.queue = e, e = e.dispatch = fb.bind(
        null,
        Te,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = Jt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Lo(e);
      var t = e.queue, n = ip.bind(null, Te, t);
      return t.dispatch = n, [e.memoizedState, n];
    },
    useDebugValue: Bo,
    useDeferredValue: function(e, t) {
      var n = Jt();
      return qo(n, e, t);
    },
    useTransition: function() {
      var e = Lo(!1);
      return e = ep.bind(
        null,
        Te,
        e.queue,
        !0,
        !1
      ), Jt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, n) {
      var l = Te, i = Jt();
      if (Ae) {
        if (n === void 0)
          throw Error(o(407));
        n = n();
      } else {
        if (n = t(), Pe === null)
          throw Error(o(349));
        (ze & 127) !== 0 || km(l, t, n);
      }
      i.memoizedState = n;
      var c = { value: n, getSnapshot: t };
      return i.queue = c, Xm(Om.bind(null, l, c, e), [
        e
      ]), l.flags |= 2048, ki(
        9,
        { destroy: void 0 },
        Cm.bind(
          null,
          l,
          c,
          n,
          t
        ),
        null
      ), n;
    },
    useId: function() {
      var e = Jt(), t = Pe.identifierPrefix;
      if (Ae) {
        var n = il, l = al;
        n = (l & ~(1 << 32 - ut(l) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = gu++, 0 < n && (t += "H" + n.toString(32)), t += "_";
      } else
        n = ab++, t = "_" + t + "r_" + n.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Yo,
    useFormState: qm,
    useActionState: qm,
    useOptimistic: function(e) {
      var t = Jt();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = n, t = Go.bind(
        null,
        Te,
        !0,
        n
      ), n.dispatch = t, [e, t];
    },
    useMemoCache: Mo,
    useCacheRefresh: function() {
      return Jt().memoizedState = ob.bind(
        null,
        Te
      );
    },
    useEffectEvent: function(e) {
      var t = Jt(), n = { impl: e };
      return t.memoizedState = n, function() {
        if ((Ge & 2) !== 0)
          throw Error(o(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, rp = {
    readContext: Lt,
    use: vu,
    useCallback: Fm,
    useContext: Lt,
    useEffect: Ho,
    useImperativeHandle: Jm,
    useInsertionEffect: Qm,
    useLayoutEffect: Km,
    useMemo: Pm,
    useReducer: bu,
    useRef: Vm,
    useState: function() {
      return bu(Cl);
    },
    useDebugValue: Bo,
    useDeferredValue: function(e, t) {
      var n = yt();
      return Wm(
        n,
        Je.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = bu(Cl)[0], t = yt().memoizedState;
      return [
        typeof e == "boolean" ? e : Xs(e),
        t
      ];
    },
    useSyncExternalStore: Am,
    useId: lp,
    useHostTransitionStatus: Yo,
    useFormState: $m,
    useActionState: $m,
    useOptimistic: function(e, t) {
      var n = yt();
      return Dm(n, Je, e, t);
    },
    useMemoCache: Mo,
    useCacheRefresh: ap,
    useEffectEvent: Zm
  }, db = {
    readContext: Lt,
    use: vu,
    useCallback: Fm,
    useContext: Lt,
    useEffect: Ho,
    useImperativeHandle: Jm,
    useInsertionEffect: Qm,
    useLayoutEffect: Km,
    useMemo: Pm,
    useReducer: zo,
    useRef: Vm,
    useState: function() {
      return zo(Cl);
    },
    useDebugValue: Bo,
    useDeferredValue: function(e, t) {
      var n = yt();
      return Je === null ? qo(n, e, t) : Wm(
        n,
        Je.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = zo(Cl)[0], t = yt().memoizedState;
      return [
        typeof e == "boolean" ? e : Xs(e),
        t
      ];
    },
    useSyncExternalStore: Am,
    useId: lp,
    useHostTransitionStatus: Yo,
    useFormState: Gm,
    useActionState: Gm,
    useOptimistic: function(e, t) {
      var n = yt();
      return Je !== null ? Dm(n, Je, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    },
    useMemoCache: Mo,
    useCacheRefresh: ap,
    useEffectEvent: Zm
  };
  function Vo(e, t, n, l) {
    t = e.memoizedState, n = n(l, t), n = n == null ? t : V({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var Xo = {
    enqueueSetState: function(e, t, n) {
      e = e._reactInternals;
      var l = xn(), i = na(l);
      i.payload = t, n != null && (i.callback = n), t = la(e, i, l), t !== null && (on(t, e, l), qs(t, e, l));
    },
    enqueueReplaceState: function(e, t, n) {
      e = e._reactInternals;
      var l = xn(), i = na(l);
      i.tag = 1, i.payload = t, n != null && (i.callback = n), t = la(e, i, l), t !== null && (on(t, e, l), qs(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var n = xn(), l = na(n);
      l.tag = 2, t != null && (l.callback = t), t = la(e, l, n), t !== null && (on(t, e, n), qs(t, e, n));
    }
  };
  function op(e, t, n, l, i, c, d) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, c, d) : t.prototype && t.prototype.isPureReactComponent ? !Rs(n, l) || !Rs(i, c) : !0;
  }
  function fp(e, t, n, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, l), t.state !== e && Xo.enqueueReplaceState(t, t.state, null);
  }
  function Va(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var l in t)
        l !== "ref" && (n[l] = t[l]);
    }
    if (e = e.defaultProps) {
      n === t && (n = V({}, n));
      for (var i in e)
        n[i] === void 0 && (n[i] = e[i]);
    }
    return n;
  }
  function dp(e) {
    Fc(e);
  }
  function hp(e) {
    console.error(e);
  }
  function mp(e) {
    Fc(e);
  }
  function Tu(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function pp(e, t, n) {
    try {
      var l = e.onCaughtError;
      l(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function Zo(e, t, n) {
    return n = na(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      Tu(e, t);
    }, n;
  }
  function gp(e) {
    return e = na(e), e.tag = 3, e;
  }
  function yp(e, t, n, l) {
    var i = n.type.getDerivedStateFromError;
    if (typeof i == "function") {
      var c = l.value;
      e.payload = function() {
        return i(c);
      }, e.callback = function() {
        pp(t, n, l);
      };
    }
    var d = n.stateNode;
    d !== null && typeof d.componentDidCatch == "function" && (e.callback = function() {
      pp(t, n, l), typeof i != "function" && (fa === null ? fa = /* @__PURE__ */ new Set([this]) : fa.add(this));
      var y = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: y !== null ? y : ""
      });
    });
  }
  function hb(e, t, n, l, i) {
    if (n.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = n.alternate, t !== null && La(
        t,
        n,
        i,
        !0
      ), n = Ut.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
          case 19:
            return Vt === null ? Xu() : n.alternate === null && pt === 0 && (pt = 3), n.flags &= -257, n.flags |= 65536, n.lanes = i, l === ou ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), Of(e, l, i)), !1;
          case 22:
            return n.flags |= 65536, l === ou ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : n.add(l)), Of(e, l, i)), !1;
        }
        throw Error(o(435, n.tag));
      }
      return Of(e, l, i), Xu(), !1;
    }
    if (Ae)
      return t = Ut.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = i, l !== fo && (e = Error(o(422), { cause: l }), zs(kn(e, n)))) : (l !== fo && (t = Error(o(423), {
        cause: l
      }), zs(
        kn(t, n)
      )), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, l = kn(l, n), i = Zo(
        e.stateNode,
        l,
        i
      ), No(e, i), pt !== 4 && (pt = 2)), !1;
    var c = Error(o(520), { cause: l });
    if (c = kn(c, n), ec === null ? ec = [c] : ec.push(c), pt !== 4 && (pt = 2), t === null) return !0;
    l = kn(l, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = i & -i, n.lanes |= e, e = Zo(n.stateNode, l, e), No(n, e), !1;
        case 1:
          if (t = n.type, c = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || c !== null && typeof c.componentDidCatch == "function" && (fa === null || !fa.has(c))))
            return n.flags |= 65536, i &= -i, n.lanes |= i, i = gp(i), yp(
              i,
              e,
              n,
              l
            ), No(n, i), !1;
          break;
        case 22:
          if (n.memoizedState !== null)
            return n.flags |= 65536, !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Qo = Error(o(461)), xt = !1;
  function Tt(e, t, n, l) {
    t.child = e === null ? Sm(t, null, n, l) : Ya(
      t,
      e.child,
      n,
      l
    );
  }
  function vp(e, t, n, l, i) {
    n = n.render;
    var c = t.ref;
    if ("ref" in l) {
      var d = {};
      for (var y in l)
        y !== "ref" && (d[y] = l[y]);
    } else d = l;
    return Ua(t), l = ko(
      e,
      t,
      n,
      d,
      c,
      i
    ), y = Co(), e !== null && !xt ? (Oo(e, t, i), Ol(e, t, i)) : (Ae && y && lu(t), t.flags |= 1, Tt(e, t, l, i), t.child);
  }
  function bp(e, t, n, l, i) {
    if (e === null) {
      var c = n.type;
      return typeof c == "function" && !co(c) && c.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = c, xp(
        e,
        t,
        c,
        l,
        i
      )) : (e = tu(
        n.type,
        null,
        l,
        t,
        t.mode,
        i
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (c = e.child, !tf(e, i)) {
      var d = c.memoizedProps;
      if (n = n.compare, n = n !== null ? n : Rs, n(d, l) && e.ref === t.ref)
        return Ol(e, t, i);
    }
    return t.flags |= 1, e = jl(c, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function xp(e, t, n, l, i) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (Rs(c, l) && e.ref === t.ref)
        if (xt = !1, t.pendingProps = l = c, tf(e, i))
          (e.flags & 131072) !== 0 && (xt = !0);
        else
          return t.lanes = e.lanes, Ol(e, t, i);
    }
    return Ko(
      e,
      t,
      n,
      l,
      i
    );
  }
  function Sp(e, t, n, l) {
    var i = l.children, c = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (c = c !== null ? c.baseLanes | n : n, e !== null) {
          for (l = t.child = e.child, i = 0; l !== null; )
            i = i | l.lanes | l.childLanes, l = l.sibling;
          l = i & ~c;
        } else l = 0, t.child = null;
        return Np(
          e,
          t,
          c,
          n,
          l
        );
      }
      if ((n & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && uu(
          t,
          c !== null ? c.cachePool : null
        ), c !== null ? Tm(t, c) : To(), jm(t);
      else
        return l = t.lanes = 536870912, Np(
          e,
          t,
          c !== null ? c.baseLanes | n : n,
          n,
          l
        );
    } else
      c !== null ? (uu(t, c.cachePool), Tm(t, c), sa(), t.memoizedState = null) : (e !== null && uu(t, null), To(), sa());
    return Tt(e, t, i, n), t.child;
  }
  function Qs(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Np(e, t, n, l, i) {
    var c = vo();
    return c = c === null ? null : { parent: vt._currentValue, pool: c }, t.memoizedState = {
      baseLanes: n,
      cachePool: c
    }, e !== null && uu(t, null), To(), jm(t), e !== null && La(e, t, l, !0), t.childLanes = i, null;
  }
  function ju(e, t) {
    return t = wu(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Ep(e, t, n) {
    return Ya(t, e.child, null, n), e = ju(t, t.pendingProps), e.flags |= 2, gn(t), t.memoizedState = null, e;
  }
  function mb(e, t, n) {
    var l = t.pendingProps, i = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Ae) {
        if (l.mode === "hidden")
          return e = ju(t, l), t.lanes = 536870912, e.memoizedState = { baseLanes: 0, cachePool: null }, Qs(null, e);
        if (wo(t), (e = nt) ? (e = Ig(
          e,
          Rn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Jl !== null ? { id: al, overflow: il } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = sm(e), n.return = t, t.child = n, At = t, nt = null)) : e = null, e === null) throw Pl(t);
        return t.lanes = 536870912, null;
      }
      return ju(t, l);
    }
    var c = e.memoizedState;
    if (c !== null) {
      var d = c.dehydrated;
      if (wo(t), i)
        if (t.flags & 256)
          t.flags &= -257, t = Ep(
            e,
            t,
            n
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(o(558));
      else if (xt || La(e, t, n, !1), i = (n & e.childLanes) !== 0, xt || i) {
        if (aa.current === null) {
          if (l = Pe, l !== null && (d = xs(l, n), d !== 0 && d !== c.retryLane))
            throw c.retryLane = d, Ra(e, d), on(l, e, d), Qo;
          Xu();
        }
        t = Ep(
          e,
          t,
          n
        );
      } else
        e = c.treeContext, nt = Dn(d.nextSibling), At = t, Ae = !0, Fl = null, Rn = !1, e !== null && rm(t, e), t = ju(t, l), t.flags |= 134221824;
      return t;
    }
    return e = jl(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Ci(e, t) {
    var n = t.ref;
    if (n === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(o(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function Ko(e, t, n, l, i) {
    return Ua(t), n = ko(
      e,
      t,
      n,
      l,
      void 0,
      i
    ), l = Co(), e !== null && !xt ? (Oo(e, t, i), Ol(e, t, i)) : (Ae && l && lu(t), t.flags |= 1, Tt(e, t, n, i), t.child);
  }
  function Tp(e, t, n, l, i, c) {
    return Ua(t), t.updateQueue = null, n = _m(
      t,
      l,
      n,
      i
    ), wm(e), l = Co(), e !== null && !xt ? (Oo(e, t, c), Ol(e, t, c)) : (Ae && l && lu(t), t.flags |= 1, Tt(e, t, n, c), t.child);
  }
  function jp(e, t, n, l, i) {
    if (Ua(t), t.stateNode === null) {
      var c = xi, d = n.contextType;
      typeof d == "object" && d !== null && (c = Lt(d)), c = new n(l, c), t.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, c.updater = Xo, t.stateNode = c, c._reactInternals = t, c = t.stateNode, c.props = l, c.state = t.memoizedState, c.refs = {}, xo(t), d = n.contextType, c.context = typeof d == "object" && d !== null ? Lt(d) : xi, c.state = t.memoizedState, d = n.getDerivedStateFromProps, typeof d == "function" && (Vo(
        t,
        n,
        d,
        l
      ), c.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (d = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), d !== c.state && Xo.enqueueReplaceState(c, c.state, null), Ys(t, l, c, i), $s(), c.state = t.memoizedState), typeof c.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      c = t.stateNode;
      var y = t.memoizedProps, w = Va(n, y);
      c.props = w;
      var R = c.context, L = n.contextType;
      d = xi, typeof L == "object" && L !== null && (d = Lt(L));
      var Y = n.getDerivedStateFromProps;
      L = typeof Y == "function" || typeof c.getSnapshotBeforeUpdate == "function", y = t.pendingProps !== y, L || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (y || R !== d) && fp(
        t,
        c,
        l,
        d
      ), ta = !1;
      var C = t.memoizedState;
      c.state = C, Ys(t, l, c, i), $s(), R = t.memoizedState, y || C !== R || ta ? (typeof Y == "function" && (Vo(
        t,
        n,
        Y,
        l
      ), R = t.memoizedState), (w = ta || op(
        t,
        n,
        w,
        l,
        C,
        R,
        d
      )) ? (L || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = R), c.props = l, c.state = R, c.context = d, l = w) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      c = t.stateNode, So(e, t), d = t.memoizedProps, L = Va(n, d), c.props = L, Y = t.pendingProps, C = c.context, R = n.contextType, w = xi, typeof R == "object" && R !== null && (w = Lt(R)), y = n.getDerivedStateFromProps, (R = typeof y == "function" || typeof c.getSnapshotBeforeUpdate == "function") || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (d !== Y || C !== w) && fp(
        t,
        c,
        l,
        w
      ), ta = !1, C = t.memoizedState, c.state = C, Ys(t, l, c, i), $s();
      var z = t.memoizedState;
      d !== Y || C !== z || ta || e !== null && e.dependencies !== null && su(e.dependencies) ? (typeof y == "function" && (Vo(
        t,
        n,
        y,
        l
      ), z = t.memoizedState), (L = ta || op(
        t,
        n,
        L,
        l,
        C,
        z,
        w
      ) || e !== null && e.dependencies !== null && su(e.dependencies)) ? (R || typeof c.UNSAFE_componentWillUpdate != "function" && typeof c.componentWillUpdate != "function" || (typeof c.componentWillUpdate == "function" && c.componentWillUpdate(l, z, w), typeof c.UNSAFE_componentWillUpdate == "function" && c.UNSAFE_componentWillUpdate(
        l,
        z,
        w
      )), typeof c.componentDidUpdate == "function" && (t.flags |= 4), typeof c.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof c.componentDidUpdate != "function" || d === e.memoizedProps && C === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && C === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = z), c.props = l, c.state = z, c.context = w, l = L) : (typeof c.componentDidUpdate != "function" || d === e.memoizedProps && C === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && C === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return c = l, Ci(e, t), l = (t.flags & 128) !== 0, c || l ? (c = t.stateNode, n = l && typeof n.getDerivedStateFromError != "function" ? null : c.render(), t.flags |= 1, e !== null && l ? (t.child = Ya(
      t,
      e.child,
      null,
      i
    ), t.child = Ya(
      t,
      null,
      n,
      i
    )) : Tt(e, t, n, i), t.memoizedState = c.state, e = t.child) : e = Ol(
      e,
      t,
      i
    ), e;
  }
  function wp(e, t, n, l) {
    return Da(), t.flags |= 256, Tt(e, t, n, l), t.child;
  }
  var Io = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Jo(e) {
    return { baseLanes: e, cachePool: pm() };
  }
  function Fo(e, t, n) {
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= bn), e;
  }
  function _p(e, t, n) {
    var l = t.pendingProps, i = !1, c = (t.flags & 128) !== 0, d;
    if ((d = c) || (d = e !== null && e.memoizedState === null ? !1 : (Ht.current & 2) !== 0), d && (i = !0, t.flags &= -129), d = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Ae) {
        if (i ? ia(t) : sa(), (e = nt) ? (e = Ig(
          e,
          Rn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Jl !== null ? { id: al, overflow: il } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = sm(e), n.return = t, t.child = n, At = t, nt = null)) : e = null, e === null) throw Pl(t);
        return Ff(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      return c = l.children, l = l.fallback, i ? (sa(), i = t.mode, c = wu(
        { mode: "hidden", children: c },
        i
      ), l = Ma(
        l,
        i,
        n,
        null
      ), c.return = t, l.return = t, c.sibling = l, t.child = c, l = t.child, l.memoizedState = Jo(n), l.childLanes = Fo(
        e,
        d,
        n
      ), t.memoizedState = Io, Qs(null, l)) : (ia(t), Po(t, c));
    }
    var y = e.memoizedState;
    if (y !== null) {
      var w = y.dehydrated;
      if (w !== null)
        return pb(
          e,
          t,
          c,
          d,
          l,
          w,
          y,
          n
        );
    }
    return i ? (sa(), i = l.fallback, c = t.mode, y = e.child, w = y.sibling, l = jl(y, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = y.subtreeFlags & 1206910976, w !== null ? i = jl(w, i) : (i = Ma(
      i,
      c,
      n,
      null
    ), i.flags |= 2), i.return = t, l.return = t, l.sibling = i, t.child = l, Qs(null, l), l = t.child, i = e.child.memoizedState, i === null ? i = Jo(n) : (c = i.cachePool, c !== null ? (y = vt._currentValue, c = c.parent !== y ? { parent: y, pool: y } : c) : c = pm(), i = {
      baseLanes: i.baseLanes | n,
      cachePool: c
    }), l.memoizedState = i, l.childLanes = Fo(
      e,
      d,
      n
    ), t.memoizedState = Io, Qs(e.child, l)) : (ia(t), n = e.child, e = n.sibling, n = jl(n, {
      mode: "visible",
      children: l.children
    }), n.return = t, n.sibling = null, e !== null && (d = t.deletions, d === null ? (t.deletions = [e], t.flags |= 16) : d.push(e)), t.child = n, t.memoizedState = null, n);
  }
  function Po(e, t) {
    return t = wu(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function wu(e, t) {
    return e = sn(22, e, null, t), e.lanes = 0, e;
  }
  function _u(e, t, n) {
    return Ya(t, e.child, null, n), e = Po(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function pb(e, t, n, l, i, c, d, y) {
    if (n)
      return t.flags & 256 ? (ia(t), t.flags &= -257, _u(
        e,
        t,
        y
      )) : t.memoizedState !== null ? (sa(), t.child = e.child, t.flags |= 128, null) : (sa(), c = i.fallback, d = t.mode, i = wu(
        { mode: "visible", children: i.children },
        d
      ), c = Ma(
        c,
        d,
        y,
        null
      ), c.flags |= 2, i.return = t, c.return = t, i.sibling = c, t.child = i, Ya(t, e.child, null, y), i = t.child, i.memoizedState = Jo(y), i.childLanes = Fo(
        e,
        l,
        y
      ), t.memoizedState = Io, Qs(null, i));
    if (ia(t), Ff(c)) {
      if (l = c.nextSibling && c.nextSibling.dataset, l) var w = l.dgst;
      return l = w, l !== "" && (i = Error(o(419)), i.stack = "", i.digest = l, zs({ value: i, source: null, stack: null })), _u(
        e,
        t,
        y
      );
    }
    if (xt || La(e, t, y, !1), l = (y & e.childLanes) !== 0, xt || l) {
      if (aa.current !== null)
        return _u(
          e,
          t,
          y
        );
      if (l = Pe, l !== null && (i = xs(
        l,
        y
      ), i !== 0 && i !== d.retryLane))
        throw d.retryLane = i, Ra(e, i), on(l, e, i), Qo;
      return Jf(c) || Xu(), _u(
        e,
        t,
        y
      );
    }
    return Jf(c) ? (t.flags |= 192, t.child = e.child, null) : (e = d.treeContext, nt = Dn(c.nextSibling), At = t, Ae = !0, Fl = null, Rn = !1, e !== null && rm(t, e), t = Po(
      t,
      i.children
    ), t.flags |= 134221824, t);
  }
  function Ap(e, t, n) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), iu(e.return, t, n);
  }
  function kp(e) {
    for (var t = null; e !== null; ) {
      var n = e.alternate;
      n !== null && mu(n) === null && (t = e), e = e.sibling;
    }
    return t;
  }
  function Au(e, t, n, l, i, c) {
    var d = e.memoizedState;
    d === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: n,
      tailMode: i,
      treeForkCount: c
    } : (d.isBackwards = t, d.rendering = null, d.renderingStartTime = 0, d.last = l, d.tail = n, d.tailMode = i, d.treeForkCount = c);
  }
  function Wo(e) {
    var t = e.child;
    for (e.child = null; t !== null; ) {
      var n = t.sibling;
      t.sibling = e.child, e.child = t, t = n;
    }
  }
  function ef(e, t, n) {
    var l = t.pendingProps, i = l.revealOrder, c = l.tail;
    l = l.children;
    var d = Ht.current;
    if (t.flags & 128)
      return Gs(t, d), null;
    var y = (d & 2) !== 0;
    if (y ? (d = d & 1 | 2, t.flags |= 128) : d &= 1, Gs(t, d), i === "backwards" && e !== null ? (Wo(e), Tt(e, t, l, n), Wo(e)) : Tt(e, t, l, n), l = Ae ? Ds : 0, !y && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Ap(e, n, t);
        else if (e.tag === 19)
          Ap(e, n, t);
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
    switch (i) {
      case "backwards":
        n = kp(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null, Wo(t)), Au(
          t,
          !0,
          i,
          null,
          c,
          l
        );
        break;
      case "unstable_legacy-backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (e = i.alternate, e !== null && mu(e) === null) {
            t.child = i;
            break;
          }
          e = i.sibling, i.sibling = n, n = i, i = e;
        }
        Au(
          t,
          !0,
          n,
          null,
          c,
          l
        );
        break;
      case "together":
        Au(
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
        n = kp(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Au(
          t,
          !1,
          i,
          n,
          c,
          l
        );
    }
    return t.child;
  }
  function Cp(e, t, n) {
    var l = t.pendingProps;
    return Wl(t, t.type, l.value), Tt(e, t, l.children, n), t.child;
  }
  function Ol(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), oa |= t.lanes, (n & t.childLanes) === 0)
      if (e !== null) {
        if (La(
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
      for (e = t.child, n = jl(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        e = e.sibling, n = n.sibling = jl(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function tf(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && su(e)));
  }
  function gb(e, t, n) {
    switch (t.tag) {
      case 3:
        Hn(t, t.stateNode.containerInfo), Wl(t, vt, e.memoizedState.cache), Da();
        break;
      case 27:
      case 5:
        ln(t);
        break;
      case 4:
        Hn(t, t.stateNode.containerInfo);
        break;
      case 10:
        Wl(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, wo(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null) {
          if (l.dehydrated !== null)
            return ia(t), t.flags |= 128, null;
          l = La(
            e,
            t,
            n,
            !1
          );
          var i = t.child.childLanes;
          return l || (n & i) !== 0 ? _p(e, t, n) : (ia(t), e = Ol(
            e,
            t,
            n
          ), e !== null ? e.sibling : null);
        }
        ia(t);
        break;
      case 19:
        if (t.flags & 128)
          return ef(
            e,
            t,
            n
          );
        if (i = (e.flags & 128) !== 0, l = (n & t.childLanes) !== 0, l || (La(
          e,
          t,
          n,
          !1
        ), l = (n & t.childLanes) !== 0), i) {
          if (l)
            return ef(
              e,
              t,
              n
            );
          t.flags |= 128;
        }
        if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), Gs(t, Ht.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, Sp(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        Wl(t, vt, e.memoizedState.cache);
    }
    return Ol(e, t, n);
  }
  function Op(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        xt = !0;
      else {
        if (!tf(e, n) && (t.flags & 128) === 0)
          return xt = !1, gb(
            e,
            t,
            n
          );
        xt = (e.flags & 131072) !== 0;
      }
    else
      xt = !1, Ae && (t.flags & 1048576) !== 0 && um(t, Ds, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = qa(t.elementType), t.type = e, typeof e == "function")
            co(e) ? (l = Va(e, l), t.tag = 1, t = jp(
              null,
              t,
              e,
              l,
              n
            )) : (t.tag = 0, t = Ko(
              null,
              t,
              e,
              l,
              n
            ));
          else {
            if (e != null) {
              var i = e.$$typeof;
              if (i === I) {
                t.tag = 11, t = vp(
                  null,
                  t,
                  e,
                  l,
                  n
                );
                break e;
              } else if (i === Me) {
                t.tag = 14, t = bp(
                  null,
                  t,
                  e,
                  l,
                  n
                );
                break e;
              } else if (i === Ye) {
                t.tag = 10, t.type = e, t = Cp(
                  null,
                  t,
                  n
                );
                break e;
              }
            }
            throw t = _e(e) || e, Error(o(306, t, ""));
          }
        }
        return t;
      case 0:
        return Ko(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 1:
        return l = t.type, i = Va(
          l,
          t.pendingProps
        ), jp(
          e,
          t,
          l,
          i,
          n
        );
      case 3:
        e: {
          if (Hn(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(o(387));
          l = t.pendingProps;
          var c = t.memoizedState;
          i = c.element, So(e, t), Ys(t, l, null, n);
          var d = t.memoizedState;
          if (l = d.cache, Wl(t, vt, l), l !== c.cache && po(
            t,
            [vt],
            n,
            !0
          ), $s(), l = d.element, c.isDehydrated)
            if (c = {
              element: l,
              isDehydrated: !1,
              cache: d.cache
            }, t.updateQueue.baseState = c, t.memoizedState = c, t.flags & 256) {
              t = wp(
                e,
                t,
                l,
                n
              );
              break e;
            } else if (l !== i) {
              i = kn(
                Error(o(424)),
                t
              ), zs(i), t = wp(
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
              for (nt = Dn(e.firstChild), At = t, Ae = !0, Fl = null, Rn = !0, n = Sm(
                t,
                null,
                l,
                n
              ), t.child = n; n; )
                n.flags = n.flags & -3 | 134221824, n = n.sibling;
            }
          else {
            if (Da(), l === i) {
              t = Ol(
                e,
                t,
                n
              );
              break e;
            }
            Tt(e, t, l, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Ci(e, t), e === null ? (n = n0(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = n : Ae || (t.stateNode = zg(
          t.type,
          t.pendingProps,
          nn.current,
          t
        )) : t.memoizedState = n0(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return ln(t), e === null && Ae && (l = t.stateNode = Pg(
          t.type,
          t.pendingProps,
          nn.current
        ), At = t, Rn = !0, i = nt, ma(t.type) ? (Pf = i, nt = Dn(l.firstChild)) : nt = i), Tt(
          e,
          t,
          t.pendingProps.children,
          n
        ), Ci(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Ae && ((i = l = nt) && (l = ox(
          l,
          t.type,
          t.pendingProps,
          Rn
        ), l !== null ? (t.stateNode = l, At = t, nt = Dn(l.firstChild), Rn = !1, i = !0) : i = !1), i || Pl(t)), ln(t), i = t.type, c = t.pendingProps, d = e !== null ? e.memoizedProps : null, l = c.children, Gf(i, c) ? l = null : d !== null && Gf(i, d) && (t.flags |= 32), t.memoizedState !== null && (i = ko(
          e,
          t,
          ib,
          null,
          null,
          n
        ), Ki._currentValue = i), Ci(e, t), Tt(e, t, l, n), t.child;
      case 6:
        return e === null && Ae && ((e = n = nt) && (n = fx(
          n,
          t.pendingProps,
          Rn
        ), n !== null ? (t.stateNode = n, At = t, nt = null, e = !0) : e = !1), e || Pl(t)), null;
      case 13:
        return _p(e, t, n);
      case 4:
        return Hn(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = Ya(
          t,
          null,
          l,
          n
        ) : Tt(e, t, l, n), t.child;
      case 11:
        return vp(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 7:
        return l = t.pendingProps, Ci(e, t), Tt(e, t, l, n), t.child;
      case 8:
        return Tt(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 12:
        return Tt(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 10:
        return Cp(e, t, n);
      case 9:
        return i = t.type._context, l = t.pendingProps.children, Ua(t), i = Lt(i), l = l(i), t.flags |= 1, Tt(e, t, l, n), t.child;
      case 14:
        return bp(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 15:
        return xp(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 19:
        return ef(e, t, n);
      case 31:
        return mb(e, t, n);
      case 22:
        return Sp(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        return Ua(t), l = Lt(vt), e === null ? (i = vo(), i === null && (i = Pe, c = go(), i.pooledCache = c, c.refCount++, c !== null && (i.pooledCacheLanes |= n), i = c), t.memoizedState = { parent: l, cache: i }, xo(t), Wl(t, vt, i)) : ((e.lanes & n) !== 0 && (So(e, t), Ys(t, null, null, n), $s()), i = e.memoizedState, c = t.memoizedState, i.parent !== l ? (i = { parent: l, cache: l }, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), Wl(t, vt, l)) : (l = c.cache, Wl(t, vt, l), l !== i.cache && po(
          t,
          [vt],
          n,
          !0
        ))), Tt(
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
        }), l = t.pendingProps, l.name != null && l.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : Ae && lu(t), e !== null && e.memoizedProps.name !== l.name ? t.flags |= 4194816 : Ci(e, t), Tt(e, t, l.children, n), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function Rl(e) {
    e.flags |= 4;
  }
  function nf(e, t, n, l, i) {
    var c;
    if ((c = (e.mode & 32) !== 0) && (c = n === null ? s0(t, l) : s0(t, l) && (l.src !== n.src || l.srcSet !== n.srcSet)), c) {
      if (e.flags |= 16777216, (i & 335544128) === i)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (dg()) e.flags |= 8192;
        else
          throw $a = ou, bo;
    } else e.flags &= -16777217;
  }
  function Rp(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !c0(t))
      if (dg()) e.flags |= 8192;
      else
        throw $a = ou, bo;
  }
  function ku(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Uc() : 536870912, e.lanes |= t, zi |= t);
  }
  function Ks(e, t) {
    if (!Ae)
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
  function lt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, l = 0;
    if (t)
      for (var i = e.child; i !== null; )
        n |= i.lanes | i.childLanes, l |= i.subtreeFlags & 1206910976, l |= i.flags & 1206910976, i.return = e, i = i.sibling;
    else
      for (i = e.child; i !== null; )
        n |= i.lanes | i.childLanes, l |= i.subtreeFlags, l |= i.flags, i.return = e, i = i.sibling;
    return e.subtreeFlags |= l, e.childLanes = n, t;
  }
  function yb(e, t, n) {
    var l = t.pendingProps;
    switch (oo(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return lt(t), null;
      case 1:
        return lt(t), null;
      case 3:
        return n = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), Al(vt), Kt(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Ei(t) ? Rl(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, ho())), lt(t), null;
      case 26:
        var i = t.type, c = t.memoizedState;
        return e === null ? (Rl(t), c !== null ? (lt(t), Rp(t, c)) : (lt(t), nf(
          t,
          i,
          null,
          l,
          n
        ))) : c ? c !== e.memoizedState ? (Rl(t), lt(t), Rp(t, c)) : (lt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && Rl(t), lt(t), nf(
          t,
          i,
          e,
          l,
          n
        )), null;
      case 27:
        if (Q(t), n = nn.current, i = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Rl(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(o(166));
            return lt(t), t.subtreeFlags &= -33554433, null;
          }
          e = st.current, Ei(t) ? om(t) : (e = Pg(i, l, n), t.stateNode = e, Rl(t));
        }
        return lt(t), t.subtreeFlags &= -33554433, null;
      case 5:
        if (Q(t), i = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Rl(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(o(166));
            return lt(t), t.subtreeFlags &= -33554433, null;
          }
          if (c = st.current, Ei(t))
            om(t);
          else {
            var d = ic(
              nn.current
            );
            switch (c) {
              case 1:
                c = d.createElementNS(
                  "http://www.w3.org/2000/svg",
                  i
                );
                break;
              case 2:
                c = d.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  i
                );
                break;
              default:
                switch (i) {
                  case "svg":
                    c = d.createElementNS(
                      "http://www.w3.org/2000/svg",
                      i
                    );
                    break;
                  case "math":
                    c = d.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      i
                    );
                    break;
                  case "script":
                    c = d.createElement("div"), c.innerHTML = "<script><\/script>", c = c.removeChild(
                      c.firstChild
                    );
                    break;
                  case "select":
                    c = typeof l.is == "string" ? d.createElement("select", {
                      is: l.is
                    }) : d.createElement("select"), l.multiple ? c.multiple = !0 : l.size && (c.size = l.size);
                    break;
                  default:
                    c = typeof l.is == "string" ? d.createElement(i, { is: l.is }) : d.createElement(i);
                }
            }
            c[tt] = t, c[Mt] = l;
            e: for (d = t.child; d !== null; ) {
              if (d.tag === 5 || d.tag === 6)
                c.appendChild(d.stateNode);
              else if (d.tag !== 4 && d.tag !== 27 && d.child !== null) {
                d.child.return = d, d = d.child;
                continue;
              }
              if (d === t) break e;
              for (; d.sibling === null; ) {
                if (d.return === null || d.return === t)
                  break e;
                d = d.return;
              }
              d.sibling.return = d.return, d = d.sibling;
            }
            t.stateNode = c;
            e: switch (qt(c, i, l), i) {
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
        return lt(t), t.subtreeFlags &= -33554433, nf(
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
          if (e = nn.current, Ei(t)) {
            if (e = t.stateNode, n = t.memoizedProps, l = null, i = At, i !== null)
              switch (i.tag) {
                case 27:
                case 5:
                  l = i.memoizedProps;
              }
            e[tt] = t, e = !!(e.nodeValue === n || l !== null && l.suppressHydrationWarning === !0 || Og(e.nodeValue, n)), e || Pl(t, !0);
          } else
            e = ic(e).createTextNode(
              l
            ), e[tt] = t, t.stateNode = e;
        }
        return lt(t), null;
      case 31:
        if (n = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = Ei(t), n !== null) {
            if (e === null) {
              if (!l) throw Error(o(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(557));
              e[tt] = t;
            } else
              Da(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            lt(t), e = !1;
          } else
            n = ho(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
          if (!e)
            return t.flags & 256 ? (gn(t), t) : (gn(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(o(558));
        }
        return lt(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (i = Ei(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!i) throw Error(o(318));
              if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(o(317));
              i[tt] = t;
            } else
              Da(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            lt(t), i = !1;
          } else
            i = ho(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
          if (!i)
            return t.flags & 256 ? (gn(t), t) : (gn(t), null);
        }
        return gn(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = l !== null, e = e !== null && e.memoizedState !== null, n && (l = t.child, i = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (i = l.alternate.memoizedState.cachePool.pool), c = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (c = l.memoizedState.cachePool.pool), c !== i && (l.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), ku(t, t.updateQueue), lt(t), null);
      case 4:
        return Kt(), e === null && Hf(t.stateNode.containerInfo), t.flags |= 67108864, lt(t), null;
      case 10:
        return Al(t.type), lt(t), null;
      case 19:
        if (_o(t), l = t.memoizedState, l === null) return lt(t), null;
        if (i = (t.flags & 128) !== 0, c = l.rendering, c === null)
          if (i) Ks(l, !1);
          else {
            if (pt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (c = mu(e), c !== null) {
                  for (t.flags |= 128, Ks(l, !1), e = c.updateQueue, t.updateQueue = e, ku(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; )
                    im(n, e), n = n.sibling;
                  return Gs(
                    t,
                    Ht.current & 1 | 2
                  ), Ae && wl(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && Gt() > $u && (t.flags |= 128, i = !0, Ks(l, !1), t.lanes = 4194304);
          }
        else {
          if (!i)
            if (e = mu(c), e !== null) {
              if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, ku(t, e), Ks(l, !0), l.tail === null && l.tailMode !== "collapsed" && l.tailMode !== "visible" && !c.alternate && !Ae)
                return lt(t), null;
            } else
              2 * Gt() - l.renderingStartTime > $u && n !== 536870912 && (t.flags |= 128, i = !0, Ks(l, !1), t.lanes = 4194304);
          l.isBackwards ? (c.sibling = t.child, t.child = c) : (e = l.last, e !== null ? e.sibling = c : t.child = c, l.last = c);
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
          return l.rendering = e, l.tail = e.sibling, l.renderingStartTime = Gt(), e.sibling = null, c = Ht.current, c = i ? c & 1 | 2 : c & 1, l.tailMode === "visible" || l.tailMode === "collapsed" || !n || Ae ? Gs(t, c) : (n = c, fe(Ut, t), fe(Ht, n), Vt === null && (Vt = t)), Ae && wl(t, l.treeForkCount), e;
        }
        return lt(t), null;
      case 22:
      case 23:
        return gn(t), jo(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (lt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : lt(t), n = t.updateQueue, n !== null && ku(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== n && (t.flags |= 2048), e !== null && Ne(Ba), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Al(vt), lt(t), null;
      case 25:
        return null;
      case 30:
        return t.flags |= 33554432, lt(t), null;
    }
    throw Error(o(156, t.tag));
  }
  function vb(e, t) {
    switch (oo(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Al(vt), Kt(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Q(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (gn(t), t.alternate === null)
            throw Error(o(340));
          Da();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (gn(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(o(340));
          Da();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return _o(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
      case 4:
        return Kt(), null;
      case 10:
        return Al(t.type), null;
      case 22:
      case 23:
        return gn(t), jo(), e !== null && Ne(Ba), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Al(vt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Mp(e, t) {
    switch (oo(t), t.tag) {
      case 3:
        Al(vt), Kt();
        break;
      case 26:
      case 27:
      case 5:
        Q(t);
        break;
      case 4:
        Kt();
        break;
      case 31:
        t.memoizedState !== null && gn(t);
        break;
      case 13:
        gn(t);
        break;
      case 19:
        _o(t);
        break;
      case 10:
        Al(t.type);
        break;
      case 22:
      case 23:
        gn(t), jo(), e !== null && Ne(Ba);
        break;
      case 24:
        Al(vt);
    }
  }
  function Is(e, t) {
    try {
      var n = t.updateQueue, l = n !== null ? n.lastEffect : null;
      if (l !== null) {
        var i = l.next;
        n = i;
        do {
          if ((n.tag & e) === e) {
            l = void 0;
            var c = n.create, d = n.inst;
            l = c(), d.destroy = l;
          }
          n = n.next;
        } while (n !== i);
      }
    } catch (y) {
      Qe(t, t.return, y);
    }
  }
  function ca(e, t, n) {
    try {
      var l = t.updateQueue, i = l !== null ? l.lastEffect : null;
      if (i !== null) {
        var c = i.next;
        l = c;
        do {
          if ((l.tag & e) === e) {
            var d = l.inst, y = d.destroy;
            if (y !== void 0) {
              d.destroy = void 0, i = t;
              var w = n, R = y;
              try {
                R();
              } catch (L) {
                Qe(
                  i,
                  w,
                  L
                );
              }
            }
          }
          l = l.next;
        } while (l !== c);
      }
    } catch (L) {
      Qe(t, t.return, L);
    }
  }
  function Dp(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        Em(t, n);
      } catch (l) {
        Qe(e, e.return, l);
      }
    }
  }
  function zp(e, t, n) {
    n.props = Va(
      e.type,
      e.memoizedProps
    ), n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (l) {
      Qe(e, t, l);
    }
  }
  function sl(e, t) {
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
            var i = e.stateNode, c = El(e.memoizedProps, i);
            (i.ref === null || i.ref.name !== c) && (i.ref = Yg(c)), l = i.ref;
            break;
          case 7:
            if (e.stateNode === null) {
              var d = new Sn(e);
              p(
                e.child,
                !1,
                ux,
                d,
                void 0,
                void 0
              ), e.stateNode = d;
            }
            l = e.stateNode;
            break;
          default:
            l = e.stateNode;
        }
        typeof n == "function" ? e.refCleanup = n(l) : n.current = l;
      }
    } catch (y) {
      Qe(e, t, y);
    }
  }
  function Bt(e, t) {
    var n = e.ref, l = e.refCleanup;
    if (n !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (i) {
          Qe(e, t, i);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (i) {
          Qe(e, t, i);
        }
      else n.current = null;
  }
  function Cu(e, t) {
    if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null)
      for (var n = 0; n < t.length; n++)
        Kg(
          e.stateNode,
          t[n]
        );
  }
  function Lp(e) {
    for (var t = e.return; t !== null && (af(t) && Kg(e.stateNode, t.stateNode), !lf(t)); )
      t = t.return;
  }
  function Js(e) {
    for (var t = e.return; t !== null && (af(t) && rx(e.stateNode, t.stateNode), !lf(t)); )
      t = t.return;
  }
  function lf(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 27;
  }
  function af(e) {
    return e && e.tag === 7 && e.stateNode !== null;
  }
  function sf(e) {
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
    } catch (i) {
      Qe(e, e.return, i);
    }
  }
  function cf(e, t, n) {
    try {
      var l = e.stateNode;
      Vb(l, e.type, n, t), l[Mt] = t;
    } catch (i) {
      Qe(e, e.return, i);
    }
  }
  function Up(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ma(e.type) || e.tag === 4;
  }
  function uf(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Up(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && ma(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function rf(e, t, n, l) {
    var i = e.tag;
    if (i === 5 || i === 6)
      i = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(i, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(i), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = ll)), Cu(e, l), Ue = !0;
    else if (i !== 4 && (i === 27 && (Cu(e, l), l = null, ma(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null))
      for (rf(
        e,
        t,
        n,
        l
      ), e = e.sibling; e !== null; )
        rf(
          e,
          t,
          n,
          l
        ), e = e.sibling;
  }
  function Ou(e, t, n, l) {
    var i = e.tag;
    if (i === 5 || i === 6)
      i = e.stateNode, t ? n.insertBefore(i, t) : n.appendChild(i), Cu(e, l), Ue = !0;
    else if (i !== 4 && (i === 27 && (Cu(e, l), l = null, ma(e.type) && (n = e.stateNode)), e = e.child, e !== null))
      for (Ou(
        e,
        t,
        n,
        l
      ), e = e.sibling; e !== null; )
        Ou(
          e,
          t,
          n,
          l
        ), e = e.sibling;
  }
  function Hp(e) {
    var t = e.stateNode, n = e.memoizedProps;
    try {
      for (var l = e.type, i = t.attributes; i.length; )
        t.removeAttributeNode(i[0]);
      qt(t, l, n), t[tt] = e, t[Mt] = n;
    } catch (c) {
      Qe(e, e.return, c);
    }
  }
  var Ru = !1, yn = null;
  function Bp(e) {
    (e.tag === 30 || (e.subtreeFlags & 33554432) !== 0) && (Ru = !0);
  }
  var cl = null;
  function qp() {
    var e = cl;
    return cl = null, e;
  }
  var cn = 0;
  function Oi(e, t, n, l, i) {
    return cn = 0, $p(
      e.child,
      t,
      n,
      l,
      i
    );
  }
  function $p(e, t, n, l, i) {
    for (var c = !1; e !== null; ) {
      if (e.tag === 5) {
        var d = e.stateNode;
        if (l !== null) {
          var y = Zf(d);
          l.push(y), y.view && (c = !0);
        } else
          c || Zf(d).view && (c = !0);
        Ru = !0, qg(
          d,
          cn === 0 ? t : t + "_" + cn,
          n
        ), cn++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && i || $p(
        e.child,
        t,
        n,
        l,
        i
      ) && (c = !0));
      e = e.sibling;
    }
    return c;
  }
  function ul(e, t) {
    for (; e !== null; )
      e.tag === 5 ? $g(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && t || ul(
        e.child,
        t
      )), e = e.sibling;
  }
  function Mu(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if ((e.tag !== 22 || e.memoizedState === null) && (Mu(e), e.tag === 30 && (e.flags & 18874368) !== 0 && e.stateNode.paired)) {
          var t = e.memoizedProps;
          if (t.name == null || t.name === "auto")
            throw Error(o(544));
          var n = t.name;
          t = Tl(t.default, t.share), t !== "none" && (Oi(
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
  function of(e, t) {
    if (e.tag === 30) {
      var n = e.stateNode, l = e.memoizedProps, i = El(l, n), c = Tl(
        l.default,
        n.paired ? l.share : l.enter
      );
      c !== "none" ? Oi(e, i, c, null, !1) ? (Mu(e), n.paired || t || Bi(e, l.onEnter)) : ul(e.child, !1) : Mu(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        of(e, t), e = e.sibling;
    else Mu(e);
  }
  function ff(e) {
    if (yn !== null && yn.size !== 0) {
      var t = yn;
      if ((e.subtreeFlags & 18874368) !== 0)
        for (e = e.child; e !== null; ) {
          if (e.tag !== 22 || e.memoizedState === null) {
            if (e.tag === 30 && (e.flags & 18874368) !== 0) {
              var n = e.memoizedProps, l = n.name;
              if (l != null && l !== "auto") {
                var i = t.get(l);
                if (i !== void 0) {
                  var c = Tl(
                    n.default,
                    n.share
                  );
                  if (c !== "none" && (Oi(
                    e,
                    l,
                    c,
                    null,
                    !1
                  ) ? (c = e.stateNode, i.paired = c, c.paired = i, Bi(e, n.onShare)) : ul(e.child, !1)), t.delete(l), t.size === 0) break;
                }
              }
            }
            ff(e);
          }
          e = e.sibling;
        }
    }
  }
  function df(e) {
    if (e.tag === 30) {
      var t = e.memoizedProps, n = El(t, e.stateNode), l = yn !== null ? yn.get(n) : void 0, i = Tl(
        t.default,
        l !== void 0 ? t.share : t.exit
      );
      i !== "none" && (Oi(e, n, i, null, !1) ? l !== void 0 ? (i = e.stateNode, l.paired = i, i.paired = l, yn.delete(n), Bi(e, t.onShare)) : Bi(e, t.onExit) : ul(e.child, !1)), yn !== null && ff(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        df(e), e = e.sibling;
    else
      yn !== null && ff(e);
  }
  function Yp(e) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var t = e.memoizedProps, n = El(t, e.stateNode);
        t = Tl(t.default, t.update), e.flags &= -5, t !== "none" && Oi(
          e,
          n,
          t,
          e.memoizedState = [],
          !1
        );
      } else
        (e.subtreeFlags & 33554432) !== 0 && Yp(e);
      e = e.sibling;
    }
  }
  function hf(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if (e.tag !== 22 || e.memoizedState === null) {
          if (e.tag === 30 && (e.flags & 18874368) !== 0) {
            var t = e.stateNode;
            t.paired !== null && (t.paired = null, ul(e.child, !1));
          }
          hf(e);
        }
        e = e.sibling;
      }
  }
  function Du(e) {
    if (e.tag === 30)
      e.stateNode.paired = null, ul(e.child, !1), hf(e);
    else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        Du(e), e = e.sibling;
    else hf(e);
  }
  function Gp(e) {
    for (e = e.child; e !== null; )
      e.tag === 30 ? ul(e.child, !1) : (e.subtreeFlags & 33554432) !== 0 && Gp(e), e = e.sibling;
  }
  function mf(e, t, n, l, i, c, d) {
    for (var y = !1; t !== null; ) {
      if (t.tag === 5) {
        var w = t.stateNode;
        if (c !== null && cn < c.length) {
          var R = c[cn], L = Zf(w);
          (R.view || L.view) && (y = !0);
          var Y;
          if (Y = (e.flags & 4) === 0)
            if (L.clip) Y = !0;
            else {
              Y = R.rect;
              var C = L.rect;
              Y = Y.y !== C.y || Y.x !== C.x || Y.height !== C.height || Y.width !== C.width;
            }
          Y && (e.flags |= 4), L.abs ? L = !R.abs : (R = R.rect, L = L.rect, L = R.height !== L.height || R.width !== L.width), L && (e.flags |= 32);
        } else e.flags |= 32;
        (e.flags & 4) !== 0 && qg(
          w,
          cn === 0 ? n : n + "_" + cn,
          i
        ), y && (e.flags & 4) !== 0 || (cl === null && (cl = []), cl.push(
          w,
          cn === 0 ? l : l + "_" + cn,
          t.memoizedProps
        )), cn++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && d ? e.flags |= t.flags & 32 : mf(
        e,
        t.child,
        n,
        l,
        i,
        c,
        d
      ) && (y = !0));
      t = t.sibling;
    }
    return y;
  }
  function Vp(e, t) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var n = e.memoizedProps, l = e.stateNode, i = El(n, l), c = Tl(n.default, n.update), d;
        d = e.memoizedState, e.memoizedState = null, l = e;
        var y = e.child;
        cn = 0, i = mf(
          l,
          y,
          i,
          i,
          c,
          d,
          !1
        ), (e.flags & 4) !== 0 && i && Bi(e, n.onUpdate);
      } else
        (e.subtreeFlags & 33554432) !== 0 && Vp(e);
      e = e.sibling;
    }
  }
  var kt = !1, Ve = !1, rl = !1, pf = !1, Xp = typeof WeakSet == "function" ? WeakSet : Set, Ct = null, ol = !1, Fs = !1, zu = !1, gf = !1;
  function bb(e, t, n) {
    if (e = e.containerInfo, $f = Ii, e = Ih(e), eo(e)) {
      if ("selectionStart" in e)
        var l = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          l = (l = e.ownerDocument) && l.defaultView || window;
          var i = l.getSelection && l.getSelection();
          if (i && i.rangeCount !== 0) {
            l = i.anchorNode;
            var c = i.anchorOffset, d = i.focusNode;
            i = i.focusOffset;
            try {
              l.nodeType, d.nodeType;
            } catch {
              l = null;
              break e;
            }
            var y = 0, w = -1, R = -1, L = 0, Y = 0, C = e, z = null;
            t: for (; ; ) {
              for (var ee; C !== l || c !== 0 && C.nodeType !== 3 || (w = y + c), C !== d || i !== 0 && C.nodeType !== 3 || (R = y + i), C.nodeType === 3 && (y += C.nodeValue.length), (ee = C.firstChild) !== null; )
                z = C, C = ee;
              for (; ; ) {
                if (C === e) break t;
                if (z === l && ++L === c && (w = y), z === d && ++Y === i && (R = y), (ee = C.nextSibling) !== null) break;
                C = z, z = C.parentNode;
              }
              C = ee;
            }
            l = w === -1 || R === -1 ? null : { start: w, end: R };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Yf = { focusedElem: e, selectionRange: l }, Ii = !1, n = (n & 335544064) === n, Ct = t, t = n ? 9270 : 1024; Ct !== null; ) {
      if (e = Ct, n && (l = e.deletions, l !== null))
        for (c = 0; c < l.length; c++)
          n && df(l[c]);
      if (e.alternate === null && (e.flags & 2) !== 0)
        n && Bp(e), Lu(n);
      else {
        if (e.tag === 22) {
          if (l = e.alternate, e.memoizedState !== null) {
            l !== null && l.memoizedState === null && n && df(l), Lu(n);
            continue;
          } else if (l !== null && l.memoizedState !== null) {
            n && Bp(e), Lu(n);
            continue;
          }
        }
        l = e.child, (e.subtreeFlags & t) !== 0 && l !== null ? (l.return = e, Ct = l) : (n && Yp(e), Lu(n));
      }
    }
    yn = null;
  }
  function Lu(e) {
    for (; Ct !== null; ) {
      var t = Ct, n = e, l = t.alternate, i = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((i & 1024) !== 0 && l !== null) {
            n = void 0, i = l.memoizedProps, l = l.memoizedState;
            var c = t.stateNode;
            try {
              var d = Va(
                t.type,
                i
              );
              n = c.getSnapshotBeforeUpdate(
                d,
                l
              ), c.__reactInternalSnapshotBeforeUpdate = n;
            } catch (y) {
              Qe(t, t.return, y);
            }
          }
          break;
        case 3:
          if ((i & 1024) !== 0) {
            if (l = t.stateNode.containerInfo, n = l.nodeType, n === 9)
              If(l);
            else if (n === 1)
              switch (l.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  If(l);
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
          n && l !== null && (n = El(
            l.memoizedProps,
            l.stateNode
          ), i = t.memoizedProps, i = Tl(i.default, i.update), i !== "none" && Oi(
            l,
            n,
            i,
            l.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((i & 1024) !== 0) throw Error(o(163));
      }
      if (l = t.sibling, l !== null) {
        l.return = t.return, Ct = l;
        break;
      }
      Ct = t.return;
    }
  }
  function Zp(e, t, n) {
    var l = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        fl(e, n), l & 4 && Is(5, n);
        break;
      case 1:
        if (fl(e, n), l & 4)
          if (e = n.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (d) {
              Qe(n, n.return, d);
            }
          else {
            var i = Va(
              n.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                i,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (d) {
              Qe(
                n,
                n.return,
                d
              );
            }
          }
        l & 64 && Dp(n), l & 512 && sl(n, n.return);
        break;
      case 3:
        if (fl(e, n), l & 64 && (e = n.updateQueue, e !== null)) {
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
            Em(e, t);
          } catch (d) {
            Qe(n, n.return, d);
          }
        }
        break;
      case 27:
        t === null && l & 4 && Hp(n);
      case 26:
      case 5:
        fl(e, n), t === null && l & 4 && sf(n), l & 512 && sl(n, n.return);
        break;
      case 12:
        fl(e, n);
        break;
      case 31:
        fl(e, n), l & 4 && Jp(e, n);
        break;
      case 13:
        fl(e, n), l & 4 && Fp(e, n), l & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Ob.bind(
          null,
          n
        ), dx(e, n))));
        break;
      case 22:
        if (l = n.memoizedState !== null || kt, !l) {
          var c = t !== null && t.memoizedState !== null || Ve;
          t = kt, i = Ve, kt = l, (Ve = c) && !i ? (l = 2, (n.subtreeFlags & 8772) !== 0 && (l |= 1), Xn(
            e,
            n,
            l
          )) : fl(e, n), kt = t, Ve = i;
        }
        break;
      case 30:
        fl(e, n), l & 512 && sl(n, n.return);
        break;
      case 7:
        l & 512 && sl(n, n.return);
      default:
        fl(e, n);
    }
  }
  function yf(e, t) {
    for (e = e.child; e !== null; )
      Qp(e, t), e = e.sibling;
  }
  function Qp(e, t) {
    switch (e.tag) {
      case 5:
      case 26:
        try {
          var n = e.stateNode;
          if (t) {
            var l = n.style;
            typeof l.setProperty == "function" ? l.setProperty("display", "none", "important") : l.display = "none";
          } else {
            var i = e.stateNode, c = e.memoizedProps.style, d = c != null && c.hasOwnProperty("display") ? c.display : null;
            i.style.display = d == null || typeof d == "boolean" ? "" : ("" + d).trim();
          }
        } catch (w) {
          Qe(e, e.return, w);
        }
        vf(e, t);
        break;
      case 6:
        try {
          e.stateNode.nodeValue = t ? "" : e.memoizedProps, Ue = !0;
        } catch (w) {
          Qe(e, e.return, w);
        }
        break;
      case 18:
        try {
          var y = e.stateNode;
          t ? Bg(y, !0) : Bg(e.stateNode, !1);
        } catch (w) {
          Qe(e, e.return, w);
        }
        break;
      case 22:
      case 23:
        e.memoizedState === null && yf(e, t);
        break;
      default:
        yf(e, t);
    }
  }
  function vf(e, t) {
    if (e.subtreeFlags & 67108864)
      for (e = e.child; e !== null; ) {
        e: {
          var n = e, l = t;
          switch (n.tag) {
            case 4:
              Qp(n, l);
              break e;
            case 22:
              n.memoizedState === null && vf(n, l);
              break e;
            default:
              vf(n, l);
          }
        }
        e = e.sibling;
      }
  }
  function Kp(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Kp(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && _a(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var ot = null, un = !1;
  function Gn(e, t, n) {
    for (n = n.child; n !== null; )
      Ip(e, t, n), n = n.sibling;
  }
  function Ip(e, t, n) {
    if (_t && typeof _t.onCommitFiberUnmount == "function")
      try {
        _t.onCommitFiberUnmount(Gl, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        Ve || Bt(n, t), Gn(
          e,
          t,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !Ve && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        Ve || Bt(n, t), Js(n);
        var l = ot, i = un;
        ma(n.type) && (ot = n.stateNode, un = !1), Gn(
          e,
          t,
          n
        ), Wg(
          n.stateNode,
          n.type,
          n.memoizedProps
        ), ot = l, un = i;
        break;
      case 5:
        Ve || Bt(n, t), Js(n);
      case 6:
        if (n.tag === 6 && Js(n), l = ot, i = un, ot = null, Gn(
          e,
          t,
          n
        ), ot = l, un = i, ot !== null)
          if (un)
            try {
              (ot.nodeType === 9 ? ot.body : ot.nodeName === "HTML" ? ot.ownerDocument.body : ot).removeChild(n.stateNode), Ue = !0;
            } catch (c) {
              Qe(
                n,
                t,
                c
              );
            }
          else
            try {
              ot.removeChild(n.stateNode), Ue = !0;
            } catch (c) {
              Qe(
                n,
                t,
                c
              );
            }
        break;
      case 18:
        ot !== null && (un ? (e = ot, Hg(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          n.stateNode
        ), Ji(e)) : Hg(ot, n.stateNode));
        break;
      case 4:
        l = ot, i = un, ot = n.stateNode.containerInfo, un = !0, Gn(
          e,
          t,
          n
        ), ot = l, un = i;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ca(2, n, t), Ve || ca(4, n, t), Gn(
          e,
          t,
          n
        );
        break;
      case 1:
        Ve || (Bt(n, t), l = n.stateNode, typeof l.componentWillUnmount == "function" && zp(
          n,
          t,
          l
        )), Gn(
          e,
          t,
          n
        );
        break;
      case 21:
        Gn(
          e,
          t,
          n
        );
        break;
      case 22:
        Ve = (l = Ve) || n.memoizedState !== null, Gn(
          e,
          t,
          n
        ), Ve = l;
        break;
      case 30:
        Bt(n, t), Gn(
          e,
          t,
          n
        );
        break;
      case 7:
        Ve || Bt(n, t), Gn(
          e,
          t,
          n
        );
        break;
      default:
        Gn(
          e,
          t,
          n
        );
    }
  }
  function Jp(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Ji(e);
      } catch (n) {
        Qe(t, t.return, n);
      }
    }
  }
  function Fp(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Ji(e);
      } catch (n) {
        Qe(t, t.return, n);
      }
  }
  function xb(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Xp()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Xp()), t;
      default:
        throw Error(o(435, e.tag));
    }
  }
  function Uu(e, t) {
    var n = xb(e);
    t.forEach(function(l) {
      if (!n.has(l)) {
        n.add(l);
        var i = Rb.bind(null, e, l);
        l.then(i, i);
      }
    });
  }
  function Ft(e, t, n) {
    var l = t.deletions;
    if (l !== null)
      for (var i = 0; i < l.length; i++) {
        var c = l[i], d = e, y = t, w = y;
        e: for (; w !== null; ) {
          switch (w.tag) {
            case 27:
              if (ma(w.type)) {
                ot = w.stateNode, un = !1;
                break e;
              }
              break;
            case 5:
              ot = w.stateNode, un = !1;
              break e;
            case 3:
            case 4:
              ot = w.stateNode.containerInfo, un = !0;
              break e;
          }
          w = w.return;
        }
        if (ot === null) throw Error(o(160));
        Ip(d, y, c), ot = null, un = !1, d = c.alternate, d !== null && (d.return = null), c.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Pp(t, e, n), t = t.sibling;
  }
  var Vn = null;
  function Pp(e, t, n) {
    var l = e.alternate, i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (i & 4 && (l = e.updateQueue, l = l !== null ? l.events : null, l !== null))
          for (var c = 0; c < l.length; c++) {
            var d = l[c];
            d.ref.impl = d.nextImpl;
          }
        Ft(t, e, n), Pt(e), i & 4 && (ca(3, e, e.return), Is(3, e), ca(5, e, e.return));
        break;
      case 1:
        Ft(t, e, n), Pt(e), i & 512 && (Ve || l === null || Bt(l, l.return)), i & 64 && kt && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
        break;
      case 26:
        if (c = Vn, Ft(t, e, n), Pt(e), i & 512 && (Ve || l === null || Bt(l, l.return)), i & 4)
          if (i = l !== null ? l.memoizedState : null, n = e.memoizedState, l === null)
            if (n === null)
              if (e.stateNode === null)
                if (kt)
                  e.stateNode = zg(
                    e.type,
                    e.memoizedProps,
                    t.containerInfo,
                    e
                  );
                else {
                  e: {
                    t = e.type, n = e.memoizedProps, i = c.ownerDocument || c;
                    t: switch (t) {
                      case "title":
                        l = i.getElementsByTagName("title")[0], (!l || l[ja] || l[tt] || l.namespaceURI === "http://www.w3.org/2000/svg" || l.hasAttribute("itemprop")) && (l = i.createElement(t), i.head.insertBefore(
                          l,
                          i.querySelector("head > title")
                        )), qt(l, t, n), l[tt] = e, rt(l), t = l;
                        break e;
                      case "link":
                        if (c = i0(
                          "link",
                          "href",
                          i
                        ).get(t + (n.href || ""))) {
                          for (d = 0; d < c.length; d++)
                            if (l = c[d], l.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && l.getAttribute("rel") === (n.rel == null ? null : n.rel) && l.getAttribute("title") === (n.title == null ? null : n.title) && l.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                              c.splice(d, 1);
                              break t;
                            }
                        }
                        l = i.createElement(t), qt(l, t, n), i.head.appendChild(l);
                        break;
                      case "meta":
                        if (c = i0(
                          "meta",
                          "content",
                          i
                        ).get(t + (n.content || ""))) {
                          for (d = 0; d < c.length; d++)
                            if (l = c[d], l.getAttribute("content") === (n.content == null ? null : "" + n.content) && l.getAttribute("name") === (n.name == null ? null : n.name) && l.getAttribute("property") === (n.property == null ? null : n.property) && l.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && l.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                              c.splice(d, 1);
                              break t;
                            }
                        }
                        l = i.createElement(t), qt(l, t, n), i.head.appendChild(l);
                        break;
                      default:
                        throw Error(o(468, t));
                    }
                    l[tt] = e, rt(l), t = l;
                  }
                  e.stateNode = t;
                }
              else
                kt || nd(c, e.type, e.stateNode);
            else
              e.stateNode = a0(
                c,
                n,
                e.memoizedProps
              );
          else
            i !== n ? (i === null ? (t = l.stateNode, t === null || Ve || t.parentNode.removeChild(t)) : i.count--, n === null ? kt || nd(c, e.type, e.stateNode) : a0(c, n, e.memoizedProps)) : n === null && e.stateNode !== null && cf(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        break;
      case 27:
        Ft(t, e, n), Pt(e), i & 512 && (Ve || l === null || Bt(l, l.return)), l !== null && i & 4 && cf(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (c = rl, rl = !1, Ft(t, e, n), rl = c, Pt(e), i & 512 && (Ve || l === null || Bt(l, l.return)), e.flags & 32) {
          t = e.stateNode;
          try {
            ht(t, ""), Ue = !0;
          } catch (L) {
            Qe(e, e.return, L);
          }
        }
        i & 4 && e.stateNode != null && (t = e.memoizedProps, cf(
          e,
          t,
          l !== null ? l.memoizedProps : t
        )), i & 1024 && (pf = !0);
        break;
      case 6:
        if (Ft(t, e, n), Pt(e), i & 4) {
          if (e.stateNode === null)
            throw Error(o(162));
          t = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = t, Ue = !0;
          } catch (L) {
            Qe(e, e.return, L);
          }
        }
        break;
      case 3:
        if (Ue = !1, Pu = null, c = Vn, Vn = sc(t.containerInfo), Ft(t, e, n), Vn = c, Pt(e), i & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Ji(t.containerInfo);
          } catch (L) {
            Qe(e, e.return, L);
          }
        pf && (pf = !1, Wp(e)), Ue = !1;
        break;
      case 4:
        i = rl, rl = kt, l = Yc(), c = Vn, Vn = sc(
          e.stateNode.containerInfo
        ), Ft(t, e, n), Pt(e), Vn = c, Ue && Fs && (zu = !0), Ue = l, rl = i;
        break;
      case 12:
        Ft(t, e, n), Pt(e);
        break;
      case 31:
        Ft(t, e, n), Pt(e), i & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Uu(e, t)));
        break;
      case 13:
        Ft(t, e, n), Pt(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (qu = Gt()), i & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Uu(e, t)));
        break;
      case 22:
        c = e.memoizedState !== null, d = l !== null && l.memoizedState !== null;
        var y = kt, w = Ve, R = rl;
        kt = y || c, rl = R || c, Ve = w || d, Ft(t, e, n), Ve = w, rl = R, kt = y, Pt(e), i & 8192 && (t = e.stateNode, t._visibility = c ? t._visibility & -2 : t._visibility | 1, !c || l === null || d || kt || Ve || (t = d || Ve, n = kt, l = Ve, kt = c || kt, Ve = t, ua(e, 2), kt = n, Ve = l), !c && rl || yf(e, c)), i & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, Uu(e, n))));
        break;
      case 19:
        Ft(t, e, n), Pt(e), i & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Uu(e, t)));
        break;
      case 30:
        i & 512 && (Ve || l === null || Bt(l, l.return)), i = Yc(), c = Fs, d = (n & 335544064) === n, y = e.memoizedProps, Fs = d && Tl(
          y.default,
          y.update
        ) !== "none", Ft(t, e, n), Pt(e), d && l !== null && Ue && (e.flags |= 4), Fs = c, Ue = i;
        break;
      case 21:
        break;
      case 7:
        i & 512 && (Ve || l === null || Bt(l, l.return)), l && l.stateNode !== null && (l.stateNode._fragmentFiber = e);
      default:
        Ft(t, e, n), Pt(e);
    }
  }
  function Pt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, l = e.return; l !== null; ) {
          if (Up(l)) {
            n = l;
            break;
          }
          l = l.return;
        }
        l = null;
        for (var i = e.return; i !== null; ) {
          if (af(i)) {
            var c = i.stateNode;
            l === null ? l = [c] : l.push(c);
          }
          if (lf(i)) break;
          i = i.return;
        }
        var d = l;
        if (n == null) throw Error(o(160));
        switch (n.tag) {
          case 27:
            var y = n.stateNode, w = uf(e);
            Ou(
              e,
              w,
              y,
              d
            );
            break;
          case 5:
            var R = n.stateNode;
            n.flags & 32 && (ht(R, ""), n.flags &= -33);
            var L = uf(e);
            Ou(
              e,
              L,
              R,
              d
            );
            break;
          case 3:
          case 4:
            var Y = n.stateNode.containerInfo, C = uf(e);
            rf(
              e,
              C,
              Y,
              d
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (z) {
        Qe(e, e.return, z);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Wp(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Wp(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, Ii = !0, t.reset(), Ii = !1), e = e.sibling;
      }
  }
  function Ri(e, t) {
    if (t.subtreeFlags & 9270)
      for (t = t.child; t !== null; )
        eg(t, e), t = t.sibling;
    else Vp(t);
  }
  function eg(e, t) {
    var n = e.alternate;
    if (n === null) of(e, !1);
    else
      switch (e.tag) {
        case 3:
          if (gf = ol = !1, qp(), Ri(t, e), !ol && !zu) {
            if (e = cl, e !== null)
              for (var l = 0; l < e.length; l += 3) {
                n = e[l];
                var i = e[l + 1];
                $g(n, e[l + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + i + ")"
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
            )), gf = !0;
          }
          cl = null;
          break;
        case 5:
          Ri(t, e);
          break;
        case 4:
          l = ol, ol = !1, Ri(t, e), ol && (zu = !0), ol = l;
          break;
        case 22:
          e.memoizedState === null && (n.memoizedState !== null ? of(e, !1) : Ri(t, e));
          break;
        case 30:
          l = ol, i = qp(), ol = !1, Ri(t, e), ol && (e.flags |= 4);
          var c = e.memoizedProps, d = e.stateNode;
          t = El(c, d), d = El(n.memoizedProps, d);
          var y = Tl(c.default, c.update);
          y === "none" ? t = !1 : (c = n.memoizedState, n.memoizedState = null, n = e.child, cn = 0, t = mf(
            e,
            n,
            t,
            d,
            y,
            c,
            !0
          ), cn !== (c === null ? 0 : c.length) && (e.flags |= 32)), (e.flags & 4) !== 0 && t ? (Bi(
            e,
            e.memoizedProps.onUpdate
          ), cl = i) : i !== null && (i.push.apply(i, cl), cl = i), ol = (e.flags & 32) !== 0 ? !0 : l;
          break;
        default:
          Ri(t, e);
      }
  }
  function fl(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Zp(e, t.alternate, t), t = t.sibling;
  }
  function ua(e, t) {
    for (e = e.child; e !== null; ) {
      var n = e, l = t;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ca(4, n, n.return), ua(
            n,
            l
          );
          break;
        case 1:
          Bt(n, n.return);
          var i = n.stateNode;
          typeof i.componentWillUnmount == "function" && zp(
            n,
            n.return,
            i
          ), ua(
            n,
            l
          );
          break;
        case 27:
          (l & 2) !== 0 && Wg(
            n.stateNode,
            n.type,
            n.memoizedProps
          );
        case 5:
          Bt(n, n.return), n.tag !== 5 && n.tag !== 27 || Js(n), ua(
            n,
            l
          );
          break;
        case 6:
          Js(n);
          break;
        case 26:
          Bt(n, n.return), i = n.stateNode, n.memoizedState !== null || i === null || Ve || i.parentNode.removeChild(i), ua(
            n,
            l
          );
          break;
        case 22:
          n.memoizedState === null && ua(
            n,
            l
          );
          break;
        case 30:
          Bt(n, n.return), ua(
            n,
            l
          );
          break;
        case 7:
          Bt(n, n.return);
        default:
          ua(
            n,
            l
          );
      }
      e = e.sibling;
    }
  }
  function Xn(e, t, n) {
    for (n = (t.subtreeFlags & 8772) !== 0 ? n : n & -2, t = t.child; t !== null; ) {
      var l = t.alternate, i = e, c = t, d = c.flags, y = (n & 1) !== 0;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          Xn(
            i,
            c,
            n
          ), Is(4, c);
          break;
        case 1:
          if (Xn(
            i,
            c,
            n
          ), l = c, i = l.stateNode, typeof i.componentDidMount == "function")
            try {
              i.componentDidMount();
            } catch (L) {
              Qe(l, l.return, L);
            }
          if (l = c, i = l.updateQueue, i !== null) {
            var w = l.stateNode;
            try {
              var R = i.shared.hiddenCallbacks;
              if (R !== null)
                for (i.shared.hiddenCallbacks = null, i = 0; i < R.length; i++)
                  Nm(R[i], w);
            } catch (L) {
              Qe(l, l.return, L);
            }
          }
          y && d & 64 && Dp(c), sl(c, c.return);
          break;
        case 27:
          (n & 2) !== 0 && Hp(c);
        case 5:
          c.tag !== 5 && c.tag !== 27 || Lp(c), Xn(
            i,
            c,
            n
          ), y && l === null && d & 4 && sf(c), sl(c, c.return);
          break;
        case 6:
          Lp(c);
          break;
        case 26:
          w = c.stateNode, c.memoizedState !== null || w === null || kt || nd(
            sc(w.ownerDocument),
            c.type,
            w
          ), Xn(
            i,
            c,
            n
          ), y && l === null && d & 4 && sf(c), sl(c, c.return);
          break;
        case 12:
          Xn(
            i,
            c,
            n
          );
          break;
        case 31:
          Xn(
            i,
            c,
            n
          ), y && d & 4 && Jp(i, c);
          break;
        case 13:
          Xn(
            i,
            c,
            n
          ), y && d & 4 && Fp(i, c);
          break;
        case 22:
          c.memoizedState === null && Xn(
            i,
            c,
            n
          ), sl(c, c.return);
          break;
        case 30:
          Xn(
            i,
            c,
            n
          ), sl(c, c.return);
          break;
        case 7:
          sl(c, c.return);
        default:
          Xn(
            i,
            c,
            n
          );
      }
      t = t.sibling;
    }
  }
  function bf(e, t) {
    var n = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Ls(n));
  }
  function xf(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ls(e));
  }
  function Mn(e, t, n, l) {
    var i = (n & 335544064) === n;
    if (t.subtreeFlags & (i ? 10262 : 10256))
      for (t = t.child; t !== null; )
        tg(
          e,
          t,
          n,
          l
        ), t = t.sibling;
    else i && Gp(t);
  }
  function tg(e, t, n, l) {
    var i = (n & 335544064) === n;
    i && t.alternate === null && t.return !== null && t.return.alternate !== null && Du(t);
    var c = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Mn(
          e,
          t,
          n,
          l
        ), c & 2048 && Is(9, t);
        break;
      case 1:
        Mn(
          e,
          t,
          n,
          l
        );
        break;
      case 3:
        Mn(
          e,
          t,
          n,
          l
        ), i && gf && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), c & 2048 && (c = null, t.alternate !== null && (c = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== c && (t.refCount++, c != null && Ls(c)));
        break;
      case 12:
        if (c & 2048) {
          Mn(
            e,
            t,
            n,
            l
          ), c = t.stateNode;
          try {
            var d = t.memoizedProps, y = d.id, w = d.onPostCommit;
            typeof w == "function" && w(
              y,
              t.alternate === null ? "mount" : "update",
              c.passiveEffectDuration,
              -0
            );
          } catch (R) {
            Qe(t, t.return, R);
          }
        } else
          Mn(
            e,
            t,
            n,
            l
          );
        break;
      case 31:
        Mn(
          e,
          t,
          n,
          l
        );
        break;
      case 13:
        Mn(
          e,
          t,
          n,
          l
        );
        break;
      case 23:
        break;
      case 22:
        d = t.stateNode, y = t.alternate, t.memoizedState !== null ? (i && y !== null && y.memoizedState === null && Du(y), d._visibility & 2 ? Mn(
          e,
          t,
          n,
          l
        ) : Ps(
          e,
          t
        )) : (i && y !== null && y.memoizedState !== null && Du(t), d._visibility & 2 ? Mn(
          e,
          t,
          n,
          l
        ) : (d._visibility |= 2, Mi(
          e,
          t,
          n,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        ))), c & 2048 && bf(y, t);
        break;
      case 24:
        Mn(
          e,
          t,
          n,
          l
        ), c & 2048 && xf(t.alternate, t);
        break;
      case 30:
        i && (c = t.alternate, c !== null && (ul(c.child, !0), ul(t.child, !0))), Mn(
          e,
          t,
          n,
          l
        );
        break;
      default:
        Mn(
          e,
          t,
          n,
          l
        );
    }
  }
  function Mi(e, t, n, l, i) {
    for (i = i && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var c = e, d = t, y = n, w = l, R = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          Mi(
            c,
            d,
            y,
            w,
            i
          ), Is(8, d);
          break;
        case 23:
          break;
        case 22:
          var L = d.stateNode;
          d.memoizedState !== null ? L._visibility & 2 ? Mi(
            c,
            d,
            y,
            w,
            i
          ) : Ps(
            c,
            d
          ) : (L._visibility |= 2, Mi(
            c,
            d,
            y,
            w,
            i
          )), i && R & 2048 && bf(
            d.alternate,
            d
          );
          break;
        case 24:
          Mi(
            c,
            d,
            y,
            w,
            i
          ), i && R & 2048 && xf(d.alternate, d);
          break;
        default:
          Mi(
            c,
            d,
            y,
            w,
            i
          );
      }
      t = t.sibling;
    }
  }
  function Ps(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e, l = t, i = l.flags;
        switch (l.tag) {
          case 22:
            Ps(n, l), i & 2048 && bf(
              l.alternate,
              l
            );
            break;
          case 24:
            Ps(n, l), i & 2048 && xf(l.alternate, l);
            break;
          default:
            Ps(n, l);
        }
        t = t.sibling;
      }
  }
  var Xa = 8192;
  function Za(e, t, n) {
    if (e.subtreeFlags & Xa)
      for (e = e.child; e !== null; )
        ng(
          e,
          t,
          n
        ), e = e.sibling;
  }
  function ng(e, t, n) {
    switch (e.tag) {
      case 26:
        Za(
          e,
          t,
          n
        ), e.flags & Xa && (e.memoizedState !== null ? wx(
          n,
          Vn,
          e.memoizedState,
          e.memoizedProps
        ) : (e = e.stateNode, (t & 335544128) === t && r0(n, e)));
        break;
      case 5:
        Za(
          e,
          t,
          n
        ), e.flags & Xa && (e = e.stateNode, (t & 335544128) === t && r0(n, e));
        break;
      case 3:
      case 4:
        var l = Vn;
        Vn = sc(e.stateNode.containerInfo), Za(
          e,
          t,
          n
        ), Vn = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = Xa, Xa = 16777216, Za(
          e,
          t,
          n
        ), Xa = l) : Za(
          e,
          t,
          n
        ));
        break;
      case 30:
        if ((e.flags & Xa) !== 0 && (l = e.memoizedProps.name, l != null && l !== "auto")) {
          var i = e.stateNode;
          i.paired = null, yn === null && (yn = /* @__PURE__ */ new Map()), yn.set(l, i);
        }
        Za(
          e,
          t,
          n
        );
        break;
      default:
        Za(
          e,
          t,
          n
        );
    }
  }
  function lg(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Ws(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          Ct = l, ig(
            l,
            e
          );
        }
      lg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        ag(e), e = e.sibling;
  }
  function ag(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Ws(e), e.flags & 2048 && ca(9, e, e.return);
        break;
      case 3:
        Ws(e);
        break;
      case 12:
        Ws(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Hu(e)) : Ws(e);
        break;
      default:
        Ws(e);
    }
  }
  function Hu(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          Ct = l, ig(
            l,
            e
          );
        }
      lg(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          ca(8, t, t.return), Hu(t);
          break;
        case 22:
          n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Hu(t));
          break;
        default:
          Hu(t);
      }
      e = e.sibling;
    }
  }
  function ig(e, t) {
    for (; Ct !== null; ) {
      var n = Ct;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          ca(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var l = n.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Ls(n.memoizedState.cache);
      }
      if (l = n.child, l !== null) l.return = n, Ct = l;
      else
        e: for (n = e; Ct !== null; ) {
          l = Ct;
          var i = l.sibling, c = l.return;
          if (Kp(l), l === n) {
            Ct = null;
            break e;
          }
          if (i !== null) {
            i.return = c, Ct = i;
            break e;
          }
          Ct = c;
        }
    }
  }
  var Sb = {
    getCacheForType: function(e) {
      var t = Lt(vt), n = t.data.get(e);
      return n === void 0 && (n = e(), t.data.set(e, n)), n;
    },
    cacheSignal: function() {
      return Lt(vt).controller.signal;
    }
  }, Nb = typeof WeakMap == "function" ? WeakMap : Map, Ge = 0, Pe = null, Oe = null, ze = 0, Ze = 0, vn = null, ra = !1, Di = !1, Sf = !1, Ml = 0, pt = 0, oa = 0, Qa = 0, Bu = 0, bn = 0, zi = 0, ec = null, rn = null, Nf = !1, qu = 0, sg = 0, $u = 1 / 0, Yu = null, fa = null, ft = 0, Zn = null, Ka = null, dl = 0, Ef = 0, Tf = null, cg = null, Li = null, Ui = null, Hi = null, tc = 0, Gu = null;
  function xn() {
    return (Ge & 2) !== 0 && ze !== 0 ? ze & -ze : se.T !== null ? Df() : Hc();
  }
  function ug() {
    if (bn === 0)
      if ((ze & 536870912) === 0 || Ae) {
        var e = Ea;
        Ea <<= 1, (Ea & 3932160) === 0 && (Ea = 262144), bn = e;
      } else bn = 536870912;
    return e = Ut.current, e !== null && (e.flags |= 32), bn;
  }
  function Bi(e, t) {
    if (t != null) {
      var n = e.stateNode, l = n.ref;
      l === null && (l = n.ref = Yg(
        El(e.memoizedProps, n)
      )), Ui === null && (Ui = []), Ui.push(t.bind(null, l));
    }
  }
  function on(e, t, n) {
    (e === Pe && (Ze === 2 || Ze === 9) || e.cancelPendingCommit !== null) && (qi(e, 0), da(
      e,
      ze,
      bn,
      !1
    )), wn(e, n), ((Ge & 2) === 0 || e !== Pe) && (e === Pe && ((Ge & 2) === 0 && (Qa |= n), pt === 4 && da(
      e,
      ze,
      bn,
      !1
    )), hl(e));
  }
  function rg(e, t, n) {
    if ((Ge & 6) !== 0) throw Error(o(327));
    var l = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Ta(e, t), i = l ? jb(e, t) : wf(e, t, !0), c = l;
    do {
      if (i === 0) {
        Di && !l && da(e, t, 0, !1);
        break;
      } else {
        if (n = e.current.alternate, c && !Eb(n)) {
          i = wf(e, t, !1), c = !1;
          continue;
        }
        if (i === 2) {
          if (c = t, e.errorRecoveryDisabledLanes & c)
            var d = 0;
          else
            d = e.pendingLanes & -536870913, d = d !== 0 ? d : d & 536870912 ? 536870912 : 0;
          if (d !== 0) {
            t = d;
            e: {
              var y = e;
              i = ec;
              var w = y.current.memoizedState.isDehydrated;
              if (w && (qi(y, d).flags |= 256), d = wf(
                y,
                d,
                !1
              ), d !== 2 && d !== 6) {
                if (Sf && !w) {
                  y.errorRecoveryDisabledLanes |= c, Qa |= c, i = 4;
                  break e;
                }
                c = rn, rn = i, c !== null && (rn === null ? rn = c : rn.push.apply(
                  rn,
                  c
                ));
              }
              i = d;
            }
            if (c = !1, i !== 2) continue;
          }
        }
        if (i === 1) {
          qi(e, 0), da(e, t, 0, !0);
          break;
        }
        e: {
          switch (l = e, c = i, c) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t && (t & 62914560) !== t)
                break;
            case 6:
              da(
                l,
                t,
                bn,
                !ra
              );
              break e;
            case 2:
              rn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && (i = qu + 300 - Gt(), 10 < i)) {
            if (da(
              l,
              t,
              bn,
              !ra
            ), Zl(l, 0, !0) !== 0) break e;
            dl = t, l.timeoutHandle = Xf(
              og.bind(
                null,
                l,
                n,
                rn,
                Yu,
                Nf,
                t,
                bn,
                Qa,
                zi,
                ra,
                c,
                "Throttled",
                -0,
                0
              ),
              i
            );
            break e;
          }
          og(
            l,
            n,
            rn,
            Yu,
            Nf,
            t,
            bn,
            Qa,
            zi,
            ra,
            c,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    hl(e);
  }
  function og(e, t, n, l, i, c, d, y, w, R, L, Y, C, z) {
    e.timeoutHandle = -1;
    var ee = t.subtreeFlags, ce = (c & 335544064) === c;
    if (Y = null, (ce || ee & 8192 || (ee & 16785408) === 16785408) && (Y = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: ll
    }, yn = null, ng(
      t,
      c,
      Y
    ), ce && (ee = Y, ce = e.containerInfo, ce = (ce.nodeType === 9 ? ce : ce.ownerDocument).__reactViewTransition, ce != null && (ee.count++, ee.waitingForViewTransition = !0, ee = rc.bind(ee), ce.finished.then(ee, ee))), ee = (c & 62914560) === c ? qu - Gt() : (c & 4194048) === c ? sg - Gt() : 0, ee = _x(
      Y,
      ee
    ), ee !== null)) {
      dl = c, e.cancelPendingCommit = ee(
        vg.bind(
          null,
          e,
          t,
          c,
          n,
          l,
          i,
          d,
          y,
          w,
          R,
          L,
          Y,
          null,
          C,
          z
        )
      ), da(e, c, d, !R);
      return;
    }
    vg(
      e,
      t,
      c,
      n,
      l,
      i,
      d,
      y,
      w,
      R,
      L,
      Y
    );
  }
  function Eb(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var l = 0; l < n.length; l++) {
          var i = n[l], c = i.getSnapshot;
          i = i.value;
          try {
            if (!pn(c(), i)) return !1;
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
  function da(e, t, n, l) {
    t = Ql(e, t), t &= ~Bu, t &= ~Qa, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var i = t; 0 < i; ) {
      var c = 31 - ut(i), d = 1 << c;
      l[c] = -1, i &= ~d;
    }
    n !== 0 && bs(e, n, t);
  }
  function Vu() {
    return (Ge & 6) === 0 ? (nc(0), !1) : !0;
  }
  function jf() {
    if (Oe !== null) {
      if (Ze === 0)
        var e = Oe.return;
      else
        e = Oe, _l = za = null, Ro(e), wi = null, Bs = 0, e = Oe;
      for (; e !== null; )
        Mp(e.alternate, e), e = e.return;
      Oe = null;
    }
  }
  function qi(e, t) {
    var n = e.timeoutHandle;
    return n !== -1 && (e.timeoutHandle = -1, Qb(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), dl = 0, jf(), Pe = e, Oe = n = jl(e.current, null), ze = t, Ze = 0, vn = null, ra = !1, Di = Ta(e, t), Sf = !1, zi = bn = Bu = Qa = oa = pt = 0, rn = ec = null, Nf = !1, Ml = Ql(e, t), Pc(), n;
  }
  function fg(e, t) {
    Te = null, se.H = Eu, t === ji || t === ru ? (t = vm(), Ze = 3) : t === bo ? (t = vm(), Ze = 4) : Ze = t === Qo ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, vn = t, Oe === null && (pt = 1, Tu(
      e,
      kn(t, e.current)
    ));
  }
  function dg() {
    var e = Ut.current;
    return e === null ? !0 : (ze & 4194048) === ze ? Vt === null : (ze & 62914560) === ze || (ze & 536870912) !== 0 ? e === Vt : !1;
  }
  function hg() {
    var e = se.H;
    return se.H = Eu, e === null ? Eu : e;
  }
  function mg() {
    var e = se.A;
    return se.A = Sb, e;
  }
  function Xu() {
    pt = 4, ra || (ze & 4194048) !== ze && Ut.current !== null || (Di = !0), (oa & 134217727) === 0 && (Qa & 134217727) === 0 || Pe === null || da(
      Pe,
      ze,
      bn,
      !1
    );
  }
  function wf(e, t, n) {
    var l = Ge;
    Ge |= 2;
    var i = hg(), c = mg();
    (Pe !== e || ze !== t) && (Yu = null, qi(e, t)), t = !1;
    var d = pt;
    e: do
      try {
        if (Ze !== 0 && Oe !== null) {
          var y = Oe, w = vn;
          switch (Ze) {
            case 8:
              jf(), d = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Ut.current === null && (t = !0);
              var R = Ze;
              if (Ze = 0, vn = null, $i(e, y, w, R), n && Di) {
                d = 0;
                break e;
              }
              break;
            default:
              R = Ze, Ze = 0, vn = null, $i(e, y, w, R);
          }
        }
        Tb(), d = pt;
        break;
      } catch (L) {
        fg(e, L);
      }
    while (!0);
    return t && e.shellSuspendCounter++, _l = za = null, Ge = l, se.H = i, se.A = c, Oe === null && (Pe = null, ze = 0, Pc()), d;
  }
  function Tb() {
    for (; Oe !== null; ) pg(Oe);
  }
  function jb(e, t) {
    var n = Ge;
    Ge |= 2;
    var l = hg(), i = mg();
    Pe !== e || ze !== t ? (Yu = null, $u = Gt() + 500, qi(e, t)) : Di = Ta(
      e,
      t
    );
    e: do
      try {
        if (Ze !== 0 && Oe !== null) {
          t = Oe;
          var c = vn;
          t: switch (Ze) {
            case 1:
              Ze = 0, vn = null, $i(e, t, c, 1);
              break;
            case 2:
            case 9:
              if (gm(c)) {
                Ze = 0, vn = null, gg(t);
                break;
              }
              t = function() {
                Ze !== 2 && Ze !== 9 || Pe !== e || (Ze = 7), hl(e);
              }, c.then(t, t);
              break e;
            case 3:
              Ze = 7;
              break e;
            case 4:
              Ze = 5;
              break e;
            case 7:
              gm(c) ? (Ze = 0, vn = null, gg(t)) : (Ze = 0, vn = null, $i(e, t, c, 7));
              break;
            case 5:
              var d = null;
              switch (Oe.tag) {
                case 26:
                  d = Oe.memoizedState;
                case 5:
                case 27:
                  var y = Oe;
                  if (d ? c0(d) : y.stateNode.complete) {
                    Ze = 0, vn = null;
                    var w = y.sibling;
                    if (w !== null) Oe = w;
                    else {
                      var R = y.return;
                      R !== null ? (Oe = R, Zu(R)) : Oe = null;
                    }
                    break t;
                  }
              }
              Ze = 0, vn = null, $i(e, t, c, 5);
              break;
            case 6:
              Ze = 0, vn = null, $i(e, t, c, 6);
              break;
            case 8:
              jf(), pt = 6;
              break e;
            default:
              throw Error(o(462));
          }
        }
        wb();
        break;
      } catch (L) {
        fg(e, L);
      }
    while (!0);
    return _l = za = null, se.H = l, se.A = i, Ge = n, Oe !== null ? 0 : (Pe = null, ze = 0, Pc(), pt);
  }
  function wb() {
    for (; Oe !== null && !Rc(); )
      pg(Oe);
  }
  function pg(e) {
    var t = Op(e.alternate, e, Ml);
    e.memoizedProps = e.pendingProps, t === null ? Zu(e) : Oe = t;
  }
  function gg(e) {
    var t = e, n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Tp(
          n,
          t,
          t.pendingProps,
          t.type,
          void 0,
          ze
        );
        break;
      case 11:
        t = Tp(
          n,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          ze
        );
        break;
      case 5:
        Ro(t);
        var l = t;
        l === At && (Ae ? (au(l), l.tag === 5 && l.stateNode != null && (nt = l.stateNode)) : (au(l), Ae = !0));
      default:
        Mp(n, t), t = Oe = im(t, Ml), t = Op(n, t, Ml);
    }
    e.memoizedProps = e.pendingProps, t === null ? Zu(e) : Oe = t;
  }
  function $i(e, t, n, l) {
    _l = za = null, Ro(t), wi = null, Bs = 0;
    var i = t.return;
    try {
      if (hb(
        e,
        i,
        t,
        n,
        ze
      )) {
        pt = 1, Tu(
          e,
          kn(n, e.current)
        ), Oe = null;
        return;
      }
    } catch (c) {
      if (i !== null) throw Oe = i, c;
      pt = 1, Tu(
        e,
        kn(n, e.current)
      ), Oe = null;
      return;
    }
    t.flags & 32768 ? (Ae || l === 1 ? e = !0 : Di || (ze & 536870912) !== 0 ? e = !1 : (ra = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = Ut.current, l !== null && l.tag === 13 && (l.flags |= 16384))), yg(t, e)) : Zu(t);
  }
  function Zu(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        yg(
          t,
          ra
        );
        return;
      }
      e = t.return;
      var n = yb(
        t.alternate,
        t,
        Ml
      );
      if (n !== null) {
        Oe = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        Oe = t;
        return;
      }
      Oe = t = e;
    } while (t !== null);
    pt === 0 && (pt = 5);
  }
  function yg(e, t) {
    do {
      var n = vb(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, Oe = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        Oe = e;
        return;
      }
      Oe = e = n;
    } while (e !== null);
    pt = 6, Oe = null;
  }
  function vg(e, t, n, l, i, c, d, y, w, R, L, Y) {
    e.cancelPendingCommit = null;
    do
      Qu();
    while (ft !== 0);
    if ((Ge & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      e === Pe && (Oe = Pe = null, ze = 0), Ka = t, Zn = e, dl = n, Tf = i, cg = l, _b(
        e,
        t,
        n,
        d,
        y,
        w,
        Y
      );
    }
  }
  function _b(e, t, n, l, i, c, d) {
    var y = t.lanes | t.childLanes;
    if (Ef = y, y |= io, Lr(
      e,
      n,
      y,
      l,
      i,
      c
    ), Ui = null, (n & 335544064) === n ? (Hi = tb(e), l = 10262) : (Hi = null, l = 10256), (t.subtreeFlags & l) !== 0 || (t.flags & l) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Mb(Bn, function() {
      return Cf(), null;
    })) : (e.callbackNode = null, e.callbackPriority = 0), Ru = !1, l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
      l = se.T, se.T = null, i = pe.p, pe.p = 2, c = Ge, Ge |= 4;
      try {
        bb(e, t, n);
      } finally {
        Ge = c, pe.p = i, se.T = l;
      }
    }
    ft = 1, Ru ? Li = Wb(
      d,
      e.containerInfo,
      Hi,
      _f,
      Af,
      kb,
      kf,
      Cf,
      Ab
    ) : (_f(), Af(), kf());
  }
  function Ab(e) {
    if (ft !== 0) {
      var t = Zn.onRecoverableError;
      t(e, { componentStack: null });
    }
  }
  function kb() {
    ft === 3 && (ft = 0, eg(Ka, Zn), ft = 4);
  }
  function _f() {
    if (ft === 1) {
      ft = 0;
      var e = Zn, t = Ka, n = dl, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = se.T, se.T = null;
        var i = pe.p;
        pe.p = 2;
        var c = Ge;
        Ge |= 4;
        try {
          Fs = zu = !1, Pp(t, e, n), n = Yf;
          var d = Ih(e.containerInfo), y = n.focusedElem, w = n.selectionRange;
          if (d !== y && y && y.ownerDocument && Kh(
            y.ownerDocument.documentElement,
            y
          )) {
            if (w !== null && eo(y)) {
              var R = w.start, L = w.end;
              if (L === void 0 && (L = R), "selectionStart" in y)
                y.selectionStart = R, y.selectionEnd = Math.min(
                  L,
                  y.value.length
                );
              else {
                var Y = y.ownerDocument || document, C = Y && Y.defaultView || window;
                if (C.getSelection) {
                  var z = C.getSelection(), ee = y.textContent.length, ce = Math.min(w.start, ee), je = w.end === void 0 ? ce : Math.min(w.end, ee);
                  !z.extend && ce > je && (d = je, je = ce, ce = d);
                  var O = Qh(
                    y,
                    ce
                  ), A = Qh(
                    y,
                    je
                  );
                  if (O && A && (z.rangeCount !== 1 || z.anchorNode !== O.node || z.anchorOffset !== O.offset || z.focusNode !== A.node || z.focusOffset !== A.offset)) {
                    var D = Y.createRange();
                    D.setStart(O.node, O.offset), z.removeAllRanges(), ce > je ? (z.addRange(D), z.extend(A.node, A.offset)) : (D.setEnd(A.node, A.offset), z.addRange(D));
                  }
                }
              }
            }
            for (Y = [], z = y; z = z.parentNode; )
              z.nodeType === 1 && Y.push({
                element: z,
                left: z.scrollLeft,
                top: z.scrollTop
              });
            for (typeof y.focus == "function" && y.focus(), y = 0; y < Y.length; y++) {
              var q = Y[y];
              q.element.scrollLeft = q.left, q.element.scrollTop = q.top;
            }
          }
          Ii = !!$f, Yf = $f = null;
        } finally {
          Ge = c, pe.p = i, se.T = l;
        }
      }
      e.current = t, ft = 2;
    }
  }
  function Af() {
    if (ft === 2) {
      ft = 0;
      var e = Zn, t = Ka, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = se.T, se.T = null;
        var l = pe.p;
        pe.p = 2;
        var i = Ge;
        Ge |= 4;
        try {
          Zp(e, t.alternate, t);
        } finally {
          Ge = i, pe.p = l, se.T = n;
        }
      }
      ft = 3;
    }
  }
  function kf() {
    if (ft === 4 || ft === 3) {
      ft = 0;
      var e = Li;
      Li = null, Mc();
      var t = Zn, n = Ka, l = dl, i = cg, c = (l & 335544064) === l ? 10262 : 10256;
      if ((n.subtreeFlags & c) !== 0 || (n.flags & c) !== 0 ? ft = 5 : (ft = 0, Ka = Zn = null, bg(t, t.pendingLanes)), c = t.pendingLanes, c === 0 && (fa = null), Ss(l), n = n.stateNode, _t && typeof _t.onCommitFiberRoot == "function")
        try {
          _t.onCommitFiberRoot(
            Gl,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (i !== null) {
        n = se.T, c = pe.p, pe.p = 2, se.T = null;
        try {
          for (var d = t.onRecoverableError, y = 0; y < i.length; y++) {
            var w = i[y];
            d(w.value, {
              componentStack: w.stack
            });
          }
        } finally {
          se.T = n, pe.p = c;
        }
      }
      if (i = Ui, d = Hi, Hi = null, i !== null && (Ui = null, d === null && (d = []), e !== null))
        for (w = 0; w < i.length; w++)
          n = (0, i[w])(
            d
          ), n !== void 0 && e.finished.finally(n);
      (dl & 3) !== 0 && Qu(), hl(t), c = t.pendingLanes, (l & 261930) !== 0 && (c & 42) !== 0 ? t === Gu ? tc++ : (tc = 0, Gu = t) : (tc = 0, Gu = null), nc(0);
    }
  }
  function bg(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Ls(t)));
  }
  function Qu() {
    return Li !== null && (Li.skipTransition(), Li = null), _f(), Af(), kf(), Cf();
  }
  function Cf() {
    if (ft !== 5) return !1;
    var e = Zn, t = Ef;
    Ef = 0;
    var n = Ss(dl), l = se.T, i = pe.p;
    try {
      pe.p = 32 > n ? 32 : n, se.T = null, n = Tf, Tf = null;
      var c = Zn, d = dl;
      if (ft = 0, Ka = Zn = null, dl = 0, (Ge & 6) !== 0) throw Error(o(331));
      var y = Ge;
      if (Ge |= 4, ag(c.current), tg(
        c,
        c.current,
        d,
        n
      ), Ge = y, nc(0, !1), _t && typeof _t.onPostCommitFiberRoot == "function")
        try {
          _t.onPostCommitFiberRoot(Gl, c);
        } catch {
        }
      return !0;
    } finally {
      pe.p = i, se.T = l, bg(e, t);
    }
  }
  function xg(e, t, n) {
    t = kn(n, t), t = Zo(e.stateNode, t, 2), e = la(e, t, 2), e !== null && (wn(e, 2), hl(e));
  }
  function Qe(e, t, n) {
    if (e.tag === 3)
      xg(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          xg(
            t,
            e,
            n
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (fa === null || !fa.has(l))) {
            e = kn(n, e), n = gp(2), l = la(t, n, 2), l !== null && (yp(
              n,
              l,
              t,
              e
            ), wn(l, 2), hl(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function Of(e, t, n) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new Nb();
      var i = /* @__PURE__ */ new Set();
      l.set(t, i);
    } else
      i = l.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), l.set(t, i));
    i.has(n) || (Sf = !0, i.add(n), e = Cb.bind(null, e, t, n), t.then(e, e));
  }
  function Cb(e, t, n) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Pe === e && (ze & n) === n && ((pt === 4 || pt === 3 && (ze & 62914560) === ze && 300 > Gt() - qu) && (Ge & 2) === 0 ? qi(e, 0) : Bu |= n, zi === ze && (zi = 0)), hl(e);
  }
  function Sg(e, t) {
    t === 0 && (t = Uc()), e = Ra(e, t), e !== null && (wn(e, t), hl(e));
  }
  function Ob(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), Sg(e, n);
  }
  function Rb(e, t) {
    var n = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var l = e.stateNode, i = e.memoizedState;
        i !== null && (n = i.retryLane);
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
    l !== null && l.delete(t), Sg(e, n);
  }
  function Mb(e, t) {
    return $l(e, t);
  }
  var Yi = null, Gi = null, Rf = !1, Ku = !1, Mf = !1, ha = 0;
  function hl(e) {
    e !== Gi && e.next === null && (Gi === null ? Yi = Gi = e : Gi = Gi.next = e), Ku = !0, Rf || (Rf = !0, zb());
  }
  function nc(e, t) {
    if (!Mf && Ku) {
      Mf = !0;
      do
        for (var n = !1, l = Yi; l !== null; ) {
          if (e !== 0) {
            var i = l.pendingLanes;
            if (i === 0) var c = 0;
            else {
              var d = l.suspendedLanes, y = l.pingedLanes;
              c = (1 << 31 - ut(42 | e) + 1) - 1, c &= i & ~(d & ~y), c = c & 201326741 ? c & 201326741 | 1 : c ? c | 2 : 0;
            }
            c !== 0 && (n = !0, jg(l, c));
          } else
            c = ze, c = Zl(
              l,
              l === Pe ? c : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (c & 3) === 0 || Ta(l, c) || (n = !0, jg(l, c));
          l = l.next;
        }
      while (n);
      Mf = !1;
    }
  }
  function Db() {
    Ng();
  }
  function Ng() {
    Ku = Rf = !1;
    var e = 0;
    ha !== 0 && Zb() && (e = ha);
    for (var t = Gt(), n = null, l = Yi; l !== null; ) {
      var i = l.next, c = Eg(l, t);
      c === 0 ? (l.next = null, n === null ? Yi = i : n.next = i, i === null && (Gi = n)) : (n = l, (e !== 0 || (c & 3) !== 0) && (Ku = !0)), l = i;
    }
    ft !== 0 && ft !== 5 || nc(e), ha !== 0 && (ha = 0);
  }
  function Eg(e, t) {
    for (var n = e.suspendedLanes, l = e.pingedLanes, i = e.expirationTimes, c = e.pendingLanes & -62914561; 0 < c; ) {
      var d = 31 - ut(c), y = 1 << d, w = i[d];
      w === -1 ? ((y & n) === 0 || (y & l) !== 0) && (i[d] = zr(y, t)) : w <= t && (e.expiredLanes |= y), c &= ~y;
    }
    if (t = Pe, n = ze, n = Zl(
      e,
      e === t ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, n === 0 || e === t && (Ze === 2 || Ze === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && Yl(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((n & 3) === 0 || Ta(e, n)) {
      if (t = n & -n, t === e.callbackPriority) return t;
      switch (l !== null && Yl(l), Ss(n)) {
        case 2:
        case 8:
          n = bl;
          break;
        case 32:
          n = Bn;
          break;
        case 268435456:
          n = gs;
          break;
        default:
          n = Bn;
      }
      return l = Tg.bind(null, e), n = $l(n, l), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return l !== null && l !== null && Yl(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Tg(e, t) {
    if (ft !== 0 && ft !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if (Qu() && e.callbackNode !== n)
      return null;
    var l = ze;
    return l = Zl(
      e,
      e === Pe ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (rg(e, l, t), Eg(e, Gt()), e.callbackNode != null && e.callbackNode === n ? Tg.bind(null, e) : null);
  }
  function jg(e, t) {
    if (Qu()) return null;
    rg(e, t, !0);
  }
  function zb() {
    Kb(function() {
      (Ge & 6) !== 0 ? $l(
        ci,
        Db
      ) : Ng();
    });
  }
  function Df() {
    if (ha === 0) {
      var e = Ha;
      e === 0 && (e = ui, ui <<= 1, (ui & 261888) === 0 && (ui = 256)), ha = e;
    }
    return ha;
  }
  function wg(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Vc(e);
  }
  function Lb(e, t, n, l, i) {
    if (t === "submit" && n && n.stateNode === i) {
      var c = wg(
        (i[Mt] || null).action
      ), d = l.submitter;
      d && (t = (t = d[Mt] || null) ? wg(t.formAction) : d.getAttribute("formAction"), t !== null && (c = t, d = null));
      var y = new Kc(
        "action",
        "action",
        null,
        l,
        i
      );
      e.push({
        event: y,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (ha !== 0) {
                  var w = new FormData(i, d);
                  $o(
                    n,
                    {
                      pending: !0,
                      data: w,
                      method: i.method,
                      action: c
                    },
                    null,
                    w
                  );
                }
              } else
                typeof c == "function" && (y.preventDefault(), w = new FormData(i, d), $o(
                  n,
                  {
                    pending: !0,
                    data: w,
                    method: i.method,
                    action: c
                  },
                  c,
                  w
                ));
            },
            currentTarget: i
          }
        ]
      });
    }
  }
  for (var zf = 0; zf < ao.length; zf++) {
    var Lf = ao[zf], Ub = Lf.toLowerCase(), Hb = Lf[0].toUpperCase() + Lf.slice(1);
    Yn(
      Ub,
      "on" + Hb
    );
  }
  Yn(Ph, "onAnimationEnd"), Yn(Wh, "onAnimationIteration"), Yn(em, "onAnimationStart"), Yn("dblclick", "onDoubleClick"), Yn("focusin", "onFocus"), Yn("focusout", "onBlur"), Yn(Q1, "onTransitionRun"), Yn(K1, "onTransitionStart"), Yn(I1, "onTransitionCancel"), Yn(tm, "onTransitionEnd"), Sl("onMouseEnter", ["mouseout", "mouseover"]), Sl("onMouseLeave", ["mouseout", "mouseover"]), Sl("onPointerEnter", ["pointerout", "pointerover"]), Sl("onPointerLeave", ["pointerout", "pointerover"]), xl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), xl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), xl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), xl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), xl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), xl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var lc = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Bb = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(lc)
  );
  function _g(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var l = e[n], i = l.event;
      l = l.listeners;
      e: {
        var c = void 0;
        if (t)
          for (var d = l.length - 1; 0 <= d; d--) {
            var y = l[d], w = y.instance, R = y.currentTarget;
            if (y = y.listener, w !== c && i.isPropagationStopped())
              break e;
            c = y, i.currentTarget = R;
            try {
              c(i);
            } catch (L) {
              Fc(L);
            }
            i.currentTarget = null, c = w;
          }
        else
          for (d = 0; d < l.length; d++) {
            if (y = l[d], w = y.instance, R = y.currentTarget, y = y.listener, w !== c && i.isPropagationStopped())
              break e;
            c = y, i.currentTarget = R;
            try {
              c(i);
            } catch (L) {
              Fc(L);
            }
            i.currentTarget = null, c = w;
          }
      }
    }
  }
  function Re(e, t) {
    var n = t[el];
    n === void 0 && (n = t[el] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    n.has(l) || (Ag(t, e, 2, !1), n.add(l));
  }
  function Uf(e, t, n) {
    var l = 0;
    t && (l |= 4), Ag(
      n,
      e,
      l,
      t
    );
  }
  var Iu = "_reactListening" + Math.random().toString(36).slice(2);
  function Hf(e) {
    if (!e[Iu]) {
      e[Iu] = !0, qc.forEach(function(n) {
        n !== "selectionchange" && (Bb.has(n) || Uf(n, !1, e), Uf(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Iu] || (t[Iu] = !0, Uf("selectionchange", !1, t));
    }
  }
  function Ag(e, t, n, l) {
    switch (y0(t)) {
      case 2:
        var i = Ox;
        break;
      case 8:
        i = Rx;
        break;
      default:
        i = ad;
    }
    n = i.bind(
      null,
      t,
      n,
      e
    ), i = void 0, !Vr || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), l ? i !== void 0 ? e.addEventListener(t, n, {
      capture: !0,
      passive: i
    }) : e.addEventListener(t, n, !0) : i !== void 0 ? e.addEventListener(t, n, {
      passive: i
    }) : e.addEventListener(t, n, !1);
  }
  function Bf(e, t, n, l, i) {
    var c = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var d = l.tag;
        if (d === 3 || d === 4) {
          var y = l.stateNode.containerInfo;
          if (y === i) break;
          if (d === 4)
            for (d = l.return; d !== null; ) {
              var w = d.tag;
              if ((w === 3 || w === 4) && d.stateNode.containerInfo === i)
                return;
              d = d.return;
            }
          for (; y !== null; ) {
            if (d = _n(y), d === null) return;
            if (w = d.tag, w === 5 || w === 6 || w === 26 || w === 27) {
              l = c = d;
              continue e;
            }
            y = y.parentNode;
          }
        }
        l = l.return;
      }
    Ah(function() {
      var R = c, L = Yr(n), Y = [];
      e: {
        var C = nm.get(e);
        if (C !== void 0) {
          var z = Kc, ee = e;
          switch (e) {
            case "keypress":
              if (Zc(n) === 0) break e;
            case "keydown":
            case "keyup":
              z = E1;
              break;
            case "focusin":
              ee = "focus", z = Kr;
              break;
            case "focusout":
              ee = "blur", z = Kr;
              break;
            case "beforeblur":
            case "afterblur":
              z = Kr;
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
              z = Oh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              z = f1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              z = A1;
              break;
            case Ph:
            case Wh:
            case em:
              z = m1;
              break;
            case tm:
              z = C1;
              break;
            case "scroll":
            case "scrollend":
              z = r1;
              break;
            case "wheel":
              z = R1;
              break;
            case "copy":
            case "cut":
            case "paste":
              z = g1;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              z = Mh;
              break;
            case "submit":
              z = w1;
              break;
            case "toggle":
            case "beforetoggle":
              z = D1;
          }
          var ce = (t & 4) !== 0, je = !ce && (e === "scroll" || e === "scrollend"), O = ce ? C !== null ? C + "Capture" : null : C;
          ce = [];
          for (var A = R, D; A !== null; ) {
            var q = A;
            if (D = q.stateNode, q = q.tag, q !== 5 && q !== 26 && q !== 27 || D === null || O === null || (q = js(A, O), q != null && ce.push(
              ac(A, q, D)
            )), je) break;
            A = A.return;
          }
          0 < ce.length && (C = new z(
            C,
            ee,
            null,
            n,
            L
          ), Y.push({ event: C, listeners: ce }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (z = e === "mouseover" || e === "pointerover", C = e === "mouseout" || e === "pointerout", z && n !== $r && (ee = n.relatedTarget || n.fromElement) && (_n(ee) || ee[$n]))
            break e;
          (C || z) && (ee = L.window === L ? L : (z = L.ownerDocument) ? z.defaultView || z.parentWindow : window, C ? (z = n.relatedTarget || n.toElement, C = R, z = z ? _n(z) : null, z !== null && (je = h(z), ce = z.tag, z !== je || ce !== 5 && ce !== 27 && ce !== 6) && (z = null)) : (C = null, z = R), C !== z && (ce = Oh, q = "onMouseLeave", O = "onMouseEnter", A = "mouse", (e === "pointerout" || e === "pointerover") && (ce = Mh, q = "onPointerLeave", O = "onPointerEnter", A = "pointer"), je = C == null ? ee : nl(C), D = z == null ? ee : nl(z), ee = new ce(
            q,
            A + "leave",
            C,
            n,
            L
          ), ee.target = je, ee.relatedTarget = D, q = null, _n(L) === R && (ce = new ce(
            O,
            A + "enter",
            z,
            n,
            L
          ), ce.target = D, ce.relatedTarget = je, q = ce), je = q, ce = C && z ? $(
            C,
            z,
            qb
          ) : null, C !== null && kg(
            Y,
            ee,
            C,
            ce,
            !1
          ), z !== null && je !== null && kg(
            Y,
            je,
            z,
            ce,
            !0
          )));
        }
        e: {
          if (C = R ? nl(R) : window, z = C.nodeName && C.nodeName.toLowerCase(), z === "select" || z === "input" && C.type === "file")
            var ie = $h;
          else if (Bh(C))
            if (Yh)
              ie = V1;
            else {
              ie = Y1;
              var Le = $1;
            }
          else
            z = C.nodeName, !z || z.toLowerCase() !== "input" || C.type !== "checkbox" && C.type !== "radio" ? R && qr(R.elementType) && (ie = $h) : ie = G1;
          if (ie && (ie = ie(e, R))) {
            qh(
              Y,
              ie,
              n,
              L
            );
            break e;
          }
          Le && Le(e, C, R);
        }
        switch (Le = R ? nl(R) : window, e) {
          case "focusin":
            (Bh(Le) || Le.contentEditable === "true") && (yi = Le, to = R, Ms = null);
            break;
          case "focusout":
            Ms = to = yi = null;
            break;
          case "mousedown":
            no = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            no = !1, Jh(Y, n, L);
            break;
          case "selectionchange":
            if (Z1) break;
          case "keydown":
          case "keyup":
            Jh(Y, n, L);
        }
        var de;
        if (Jr)
          e: {
            switch (e) {
              case "compositionstart":
                var ye = "onCompositionStart";
                break e;
              case "compositionend":
                ye = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ye = "onCompositionUpdate";
                break e;
            }
            ye = void 0;
          }
        else
          gi ? Uh(e, n) && (ye = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (ye = "onCompositionStart");
        ye && (Dh && n.locale !== "ko" && (gi || ye !== "onCompositionStart" ? ye === "onCompositionEnd" && gi && (de = kh()) : (Kl = L, Xr = "value" in Kl ? Kl.value : Kl.textContent, gi = !0)), Le = Ju(R, ye), 0 < Le.length && (ye = new Rh(
          ye,
          e,
          null,
          n,
          L
        ), Y.push({ event: ye, listeners: Le }), de ? ye.data = de : (de = Hh(n), de !== null && (ye.data = de)))), (de = L1 ? U1(e, n) : H1(e, n)) && (ye = Ju(R, "onBeforeInput"), 0 < ye.length && (Le = new Rh(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          L
        ), Y.push({
          event: Le,
          listeners: ye
        }), Le.data = de)), Lb(
          Y,
          e,
          R,
          n,
          L
        );
      }
      _g(Y, t);
    });
  }
  function ac(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function Ju(e, t) {
    for (var n = t + "Capture", l = []; e !== null; ) {
      var i = e, c = i.stateNode;
      if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || c === null || (i = js(e, n), i != null && l.unshift(
        ac(e, i, c)
      ), i = js(e, t), i != null && l.push(
        ac(e, i, c)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function qb(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function kg(e, t, n, l, i) {
    for (var c = t._reactName, d = []; n !== null && n !== l; ) {
      var y = n, w = y.alternate, R = y.stateNode;
      if (y = y.tag, w !== null && w === l) break;
      y !== 5 && y !== 26 && y !== 27 || R === null || (w = R, i ? (R = js(n, c), R != null && d.unshift(
        ac(n, R, w)
      )) : i || (R = js(n, c), R != null && d.push(
        ac(n, R, w)
      ))), n = n.return;
    }
    d.length !== 0 && e.push({ event: t, listeners: d });
  }
  var $b = /\r\n?/g, Yb = /\u0000|\uFFFD/g;
  function Cg(e) {
    return (typeof e == "string" ? e : "" + e).replace($b, `
`).replace(Yb, "");
  }
  function Og(e, t) {
    return t = Cg(t), Cg(e) === t;
  }
  function Ke(e, t, n, l, i, c) {
    switch (n) {
      case "children":
        if (typeof l == "string")
          t === "body" || t === "textarea" && l === "" || ht(e, l);
        else if (typeof l == "number" || typeof l == "bigint")
          t !== "body" && ht(e, "" + l);
        else return;
        break;
      case "className":
        ka(e, "class", l);
        break;
      case "tabIndex":
        ka(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ka(e, n, l);
        break;
      case "style":
        wh(e, l, c);
        return;
      case "data":
        if (t !== "object") {
          ka(e, "data", l);
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
        l = Vc(l), e.setAttribute(n, l);
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
          typeof c == "function" && (n === "formAction" ? (t !== "input" && Ke(e, t, "name", i.name, i, null), Ke(
            e,
            t,
            "formEncType",
            i.formEncType,
            i,
            null
          ), Ke(
            e,
            t,
            "formMethod",
            i.formMethod,
            i,
            null
          ), Ke(
            e,
            t,
            "formTarget",
            i.formTarget,
            i,
            null
          )) : (Ke(e, t, "encType", i.encType, i, null), Ke(e, t, "method", i.method, i, null), Ke(e, t, "target", i.target, i, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(n);
          break;
        }
        l = Vc(l), e.setAttribute(n, l);
        break;
      case "onClick":
        l != null && (e.onclick = ll);
        return;
      case "onScroll":
        l != null && Re("scroll", e);
        return;
      case "onScrollEnd":
        l != null && Re("scrollend", e);
        return;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(o(61));
          if (n = l.__html, n != null) {
            if (i.children != null) throw Error(o(60));
            c?.__html !== n && (e.innerHTML = n);
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
        n = Vc(l), e.setAttributeNS(
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
        Re("beforetoggle", e), Re("toggle", e), di(e, "popover", l);
        break;
      case "xlinkActuate":
        an(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        an(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        an(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        an(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        an(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        an(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        an(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        an(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        an(
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
          n = c1.get(n) || n, di(e, n, l);
        else return;
    }
    Ue = !0;
  }
  function qf(e, t, n, l, i, c) {
    switch (n) {
      case "style":
        wh(e, l, c);
        return;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(o(61));
          if (n = l.__html, n != null) {
            if (i.children != null) throw Error(o(60));
            c?.__html !== n && (e.innerHTML = n);
          }
        }
        break;
      case "children":
        if (typeof l == "string") ht(e, l);
        else if (typeof l == "number" || typeof l == "bigint")
          ht(e, "" + l);
        else return;
        break;
      case "onScroll":
        l != null && Re("scroll", e);
        return;
      case "onScrollEnd":
        l != null && Re("scrollend", e);
        return;
      case "onClick":
        l != null && (e.onclick = ll);
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
        if (!Aa.hasOwnProperty(n))
          e: {
            if (n[0] === "o" && n[1] === "n" && (i = n.endsWith("Capture"), c = n.slice(2, i ? n.length - 7 : void 0), t = e[Mt] || null, t = t != null ? t[n] : null, typeof t == "function" && e.removeEventListener(c, t, i), typeof l == "function")) {
              typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(c, l, i);
              break e;
            }
            Ue = !0, n in e ? e[n] = l : l === !0 ? e.setAttribute(n, "") : di(e, n, l);
          }
        return;
    }
    Ue = !0;
  }
  function qt(e, t, n) {
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
        Re("error", e), Re("load", e);
        var l = !1, i = !1, c;
        for (c in n)
          if (n.hasOwnProperty(c)) {
            var d = n[c];
            if (d != null)
              switch (c) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  i = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, t));
                default:
                  Ke(e, t, c, d, n, null);
              }
          }
        i && Ke(e, t, "srcSet", n.srcSet, n, null), l && Ke(e, t, "src", n.src, n, null);
        return;
      case "input":
        Re("invalid", e);
        var y = c = d = i = null, w = null, R = null;
        for (l in n)
          if (n.hasOwnProperty(l)) {
            var L = n[l];
            if (L != null)
              switch (l) {
                case "name":
                  i = L;
                  break;
                case "type":
                  d = L;
                  break;
                case "checked":
                  w = L;
                  break;
                case "defaultChecked":
                  R = L;
                  break;
                case "value":
                  c = L;
                  break;
                case "defaultValue":
                  y = L;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (L != null)
                    throw Error(o(137, t));
                  break;
                default:
                  Ke(e, t, l, L, n, null);
              }
          }
        Xe(
          e,
          c,
          y,
          w,
          R,
          d,
          i,
          !1
        );
        return;
      case "select":
        Re("invalid", e), l = d = c = null;
        for (i in n)
          if (n.hasOwnProperty(i) && (y = n[i], y != null))
            switch (i) {
              case "value":
                c = y;
                break;
              case "defaultValue":
                d = y;
                break;
              case "multiple":
                l = y;
              default:
                Ke(e, t, i, y, n, null);
            }
        t = c, n = d, e.multiple = !!l, t != null ? gt(e, !!l, t, !1) : n != null && gt(e, !!l, n, !0);
        return;
      case "textarea":
        Re("invalid", e), c = i = l = null;
        for (d in n)
          if (n.hasOwnProperty(d) && (y = n[d], y != null))
            switch (d) {
              case "value":
                l = y;
                break;
              case "defaultValue":
                i = y;
                break;
              case "children":
                c = y;
                break;
              case "dangerouslySetInnerHTML":
                if (y != null) throw Error(o(91));
                break;
              default:
                Ke(e, t, d, y, n, null);
            }
        hi(e, l, i, c);
        return;
      case "option":
        for (w in n)
          if (n.hasOwnProperty(w) && (l = n[w], l != null))
            switch (w) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                Ke(e, t, w, l, n, null);
            }
        return;
      case "dialog":
        Re("beforetoggle", e), Re("toggle", e), Re("cancel", e), Re("close", e);
        break;
      case "iframe":
      case "object":
        Re("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < lc.length; l++)
          Re(lc[l], e);
        break;
      case "image":
        Re("error", e), Re("load", e);
        break;
      case "details":
        Re("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Re("error", e), Re("load", e);
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
                throw Error(o(137, t));
              default:
                Ke(e, t, R, l, n, null);
            }
        return;
      default:
        if (qr(t)) {
          for (L in n)
            n.hasOwnProperty(L) && (l = n[L], l !== void 0 && qf(
              e,
              t,
              L,
              l,
              n,
              void 0
            ));
          return;
        }
    }
    for (y in n)
      n.hasOwnProperty(y) && (l = n[y], l != null && Ke(e, t, y, l, n, null));
  }
  var Gb = {};
  function Vb(e, t, n, l) {
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
        var i = null, c = null, d = null, y = null, w = null, R = null, L = null;
        for (z in n) {
          var Y = n[z];
          if (n.hasOwnProperty(z) && Y != null)
            switch (z) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                w = Y;
              default:
                l.hasOwnProperty(z) || Ke(e, t, z, null, l, Y);
            }
        }
        for (var C in l) {
          var z = l[C];
          if (Y = n[C], l.hasOwnProperty(C) && (z != null || Y != null))
            switch (C) {
              case "type":
                z !== Y && (Ue = !0), c = z;
                break;
              case "name":
                z !== Y && (Ue = !0), i = z;
                break;
              case "checked":
                z !== Y && (Ue = !0), R = z;
                break;
              case "defaultChecked":
                z !== Y && (Ue = !0), L = z;
                break;
              case "value":
                z !== Y && (Ue = !0), d = z;
                break;
              case "defaultValue":
                z !== Y && (Ue = !0), y = z;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (z != null)
                  throw Error(o(137, t));
                break;
              default:
                z !== Y && Ke(
                  e,
                  t,
                  C,
                  z,
                  l,
                  Y
                );
            }
        }
        ge(
          e,
          d,
          y,
          w,
          R,
          L,
          c,
          i
        );
        return;
      case "select":
        z = d = y = C = null;
        for (c in n)
          if (w = n[c], n.hasOwnProperty(c) && w != null)
            switch (c) {
              case "value":
                break;
              case "multiple":
                z = w;
              default:
                l.hasOwnProperty(c) || Ke(
                  e,
                  t,
                  c,
                  null,
                  l,
                  w
                );
            }
        for (i in l)
          if (c = l[i], w = n[i], l.hasOwnProperty(i) && (c != null || w != null))
            switch (i) {
              case "value":
                c !== w && (Ue = !0), C = c;
                break;
              case "defaultValue":
                c !== w && (Ue = !0), y = c;
                break;
              case "multiple":
                c !== w && (Ue = !0), d = c;
              default:
                c !== w && Ke(
                  e,
                  t,
                  i,
                  c,
                  l,
                  w
                );
            }
        t = y, n = d, l = z, C != null ? gt(e, !!n, C, !1) : !!l != !!n && (t != null ? gt(e, !!n, t, !0) : gt(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        z = C = null;
        for (y in n)
          if (i = n[y], n.hasOwnProperty(y) && i != null && !l.hasOwnProperty(y))
            switch (y) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ke(e, t, y, null, l, i);
            }
        for (d in l)
          if (i = l[d], c = n[d], l.hasOwnProperty(d) && (i != null || c != null))
            switch (d) {
              case "value":
                i !== c && (Ue = !0), C = i;
                break;
              case "defaultValue":
                i !== c && (Ue = !0), z = i;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (i != null) throw Error(o(91));
                break;
              default:
                i !== c && Ke(e, t, d, i, l, c);
            }
        zt(e, C, z);
        return;
      case "option":
        for (var ee in n)
          if (C = n[ee], n.hasOwnProperty(ee) && C != null && !l.hasOwnProperty(ee))
            switch (ee) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ke(
                  e,
                  t,
                  ee,
                  null,
                  l,
                  C
                );
            }
        for (w in l)
          if (C = l[w], z = n[w], l.hasOwnProperty(w) && C !== z && (C != null || z != null))
            switch (w) {
              case "selected":
                C !== z && (Ue = !0), e.selected = C && typeof C != "function" && typeof C != "symbol";
                break;
              default:
                Ke(
                  e,
                  t,
                  w,
                  C,
                  l,
                  z
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
        for (var ce in n)
          C = n[ce], n.hasOwnProperty(ce) && C != null && !l.hasOwnProperty(ce) && Ke(e, t, ce, null, l, C);
        for (R in l)
          if (C = l[R], z = n[R], l.hasOwnProperty(R) && C !== z && (C != null || z != null))
            switch (R) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (C != null)
                  throw Error(o(137, t));
                break;
              default:
                Ke(
                  e,
                  t,
                  R,
                  C,
                  l,
                  z
                );
            }
        return;
      default:
        if (qr(t)) {
          for (var je in n)
            C = n[je], n.hasOwnProperty(je) && C !== void 0 && !l.hasOwnProperty(je) && qf(
              e,
              t,
              je,
              void 0,
              l,
              C
            );
          for (L in l)
            C = l[L], z = n[L], !l.hasOwnProperty(L) || C === z || C === void 0 && z === void 0 || qf(
              e,
              t,
              L,
              C,
              l,
              z
            );
          return;
        }
    }
    for (var O in n)
      C = n[O], n.hasOwnProperty(O) && C != null && !l.hasOwnProperty(O) && Ke(e, t, O, null, l, C);
    for (Y in l)
      C = l[Y], z = n[Y], !l.hasOwnProperty(Y) || C === z || C == null && z == null || Ke(e, t, Y, C, l, z);
  }
  function Rg(e) {
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
  function Xb() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), l = 0; l < n.length; l++) {
        var i = n[l], c = i.transferSize, d = i.initiatorType, y = i.duration;
        if (c && y && Rg(d)) {
          for (d = 0, y = i.responseEnd, l += 1; l < n.length; l++) {
            var w = n[l], R = w.startTime;
            if (R > y) break;
            var L = w.transferSize, Y = w.initiatorType;
            L && Rg(Y) && (w = w.responseEnd, d += L * (w < y ? 1 : (y - R) / (w - R)));
          }
          if (--l, t += 8 * (c + d) / (i.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var $f = null, Yf = null;
  function ic(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Mg(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Dg(e, t) {
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
  function zg(e, t, n, l) {
    return n = ic(
      n
    ).createElement(e), n[tt] = l, n[Mt] = t, qt(n, e, t), rt(n), n;
  }
  function Gf(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Vf = null;
  function Zb() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Vf ? !1 : (Vf = e, !0) : (Vf = null, !1);
  }
  var Xf = typeof setTimeout == "function" ? setTimeout : void 0, Qb = typeof clearTimeout == "function" ? clearTimeout : void 0, Lg = typeof Promise == "function" ? Promise : void 0, Ug = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Xf, Kb = typeof queueMicrotask == "function" ? queueMicrotask : typeof Lg < "u" ? function(e) {
    return Lg.resolve(null).then(e).catch(Ib);
  } : Xf;
  function Ib(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ma(e) {
    return e === "head";
  }
  function Hg(e, t) {
    var n = t, l = 0;
    do {
      var i = n.nextSibling;
      if (e.removeChild(n), i && i.nodeType === 8)
        if (n = i.data, n === "/$" || n === "/&") {
          if (l === 0) {
            e.removeChild(i), Ji(t);
            return;
          }
          l--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          l++;
        else if (n === "html")
          Wf(
            e.ownerDocument.documentElement
          );
        else if (n === "head") {
          n = e.ownerDocument.head, Wf(n);
          for (var c = n.firstChild; c; ) {
            var d = c.nextSibling, y = c.nodeName;
            c[ja] || y === "SCRIPT" || y === "STYLE" || y === "LINK" && c.rel.toLowerCase() === "stylesheet" || n.removeChild(c), c = d;
          }
        } else
          n === "body" && Wf(e.ownerDocument.body);
      n = i;
    } while (n);
    Ji(t);
  }
  function Bg(e, t) {
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
  function qg(e, t, n) {
    if (t = CSS.escape(t) !== t ? "r-" + btoa(t).replace(/=/g, "") : t, e.style.viewTransitionName = t, n != null && (e.style.viewTransitionClass = n), n = getComputedStyle(e), n.display === "inline") {
      if (t = e.getClientRects(), t.length === 1) var l = 1;
      else
        for (var i = l = 0; i < t.length; i++) {
          var c = t[i];
          0 < c.width && 0 < c.height && l++;
        }
      l === 1 && (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + n.paddingTop, e.marginBottom = "-" + n.paddingBottom);
    }
  }
  function $g(e, t) {
    e = e.style, t = t.style;
    var n = t != null ? t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null : null;
    e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t != null ? t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n != null ? e.margin = n : (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t)));
  }
  function Jb(e, t, n) {
    return n = n.ownerDocument.defaultView, {
      rect: e,
      abs: t.position === "absolute" || t.position === "fixed",
      clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
      view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth
    };
  }
  function Zf(e) {
    var t = e.getBoundingClientRect(), n = getComputedStyle(e);
    return Jb(t, n, e);
  }
  function Fb(e) {
    return e.documentElement.clientHeight;
  }
  function Pb(e) {
    this.addEventListener("load", e), this.addEventListener("error", e);
  }
  function Wb(e, t, n, l, i, c, d, y, w) {
    var R = t.nodeType === 9 ? t : t.ownerDocument;
    try {
      var L = R.startViewTransition({
        update: function() {
          var C = R.defaultView, z = C.navigation && C.navigation.transition, ee = R.fonts.status;
          l();
          var ce = [];
          if (ee === "loaded" && (Fb(R), R.fonts.status === "loading" && ce.push(R.fonts.ready)), ee = ce.length, e !== null)
            for (var je = e.suspenseyImages, O = 0, A = 0; A < je.length; A++) {
              var D = je[A];
              if (!D.complete) {
                var q = D.getBoundingClientRect();
                if (0 < q.bottom && 0 < q.right && q.top < C.innerHeight && q.left < C.innerWidth) {
                  if (O += u0(D), O > Wu) {
                    ce.length = ee;
                    break;
                  }
                  D = new Promise(
                    Pb.bind(D)
                  ), ce.push(D);
                }
              }
            }
          if (0 < ce.length)
            return C = Promise.race([
              Promise.all(ce),
              new Promise(function(ie) {
                return setTimeout(ie, 500);
              })
            ]).then(i, i), (z ? Promise.allSettled([z.finished, C]) : C).then(c, c);
          if (i(), z)
            return z.finished.then(
              c,
              c
            );
          c();
        },
        types: n
      });
      R.__reactViewTransition = L;
      var Y = [];
      return L.ready.then(
        function() {
          for (var C = R.documentElement.getAnimations({
            subtree: !0
          }), z = 0; z < C.length; z++) {
            var ee = C[z], ce = ee.effect, je = ce.pseudoElement;
            if (je != null && je.startsWith("::view-transition")) {
              Y.push(ee), ee = ce.getKeyframes();
              for (var O = je = void 0, A = !0, D = 0; D < ee.length; D++) {
                var q = ee[D], ie = q.width;
                if (je === void 0) je = ie;
                else if (je !== ie) {
                  A = !1;
                  break;
                }
                if (ie = q.height, O === void 0) O = ie;
                else if (O !== ie) {
                  A = !1;
                  break;
                }
                delete q.width, delete q.height, q.transform === "none" && delete q.transform;
              }
              A && je !== void 0 && O !== void 0 && (ce.setKeyframes(ee), A = getComputedStyle(
                ce.target,
                ce.pseudoElement
              ), A.width !== je || A.height !== O) && (A = ee[0], A.width = je, A.height = O, A = ee[ee.length - 1], A.width = je, A.height = O, ce.setKeyframes(ee));
            }
          }
          d();
        },
        function(C) {
          R.__reactViewTransition === L && (R.__reactViewTransition = null);
          try {
            if (typeof C == "object" && C !== null)
              switch (C.name) {
                case "InvalidStateError":
                  (C.message === "View transition was skipped because document visibility state is hidden." || C.message === "Skipping view transition because document visibility state has become hidden." || C.message === "Skipping view transition because viewport size changed." || C.message === "Transition was aborted because of invalid state") && (C = null);
              }
            C !== null && w(C);
          } finally {
            l(), i(), d();
          }
        }
      ), L.finished.finally(function() {
        for (var C = 0; C < Y.length; C++)
          Y[C].cancel();
        R.__reactViewTransition === L && (R.__reactViewTransition = null), y();
      }), L;
    } catch {
      return l(), i(), d(), null;
    }
  }
  function Ia(e, t) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
  }
  Ia.prototype.animate = function(e, t) {
    return t = typeof t == "number" ? { duration: t } : V({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
  }, Ia.prototype.getAnimations = function() {
    for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), l = [], i = 0; i < n.length; i++) {
      var c = n[i].effect;
      c !== null && c.target === e && c.pseudoElement === t && l.push(n[i]);
    }
    return l;
  }, Ia.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function Yg(e) {
    return {
      name: e,
      group: new Ia("group", e),
      imagePair: new Ia("image-pair", e),
      old: new Ia("old", e),
      new: new Ia("new", e)
    };
  }
  function Sn(e) {
    this._fragmentFiber = e, this._observers = this._eventListeners = null;
  }
  Sn.prototype.addEventListener = function(e, t, n) {
    var l = null, i = null;
    if (!(n != null && typeof n != "boolean" && (l = n.signal || null, l !== null && l.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var c = this._eventListeners;
      if (Vg(c, e, t, n) === -1) {
        var d = this, y = t;
        n != null && typeof n != "boolean" && n.once === !0 && (y = function(w) {
          d.removeEventListener(
            e,
            t,
            n
          ), typeof t == "function" ? t.call(this, w) : t.handleEvent(w);
        }), l !== null && (i = d.removeEventListener.bind(
          d,
          e,
          t,
          n
        ), l.addEventListener("abort", i, { once: !0 }), i = l.removeEventListener.bind(l, "abort", i)), l = Vi(n), c.push({
          type: e,
          listener: t,
          optionsOrUseCapture: n,
          attachedListener: y,
          cleanup: i
        }), p(
          this._fragmentFiber.child,
          !1,
          ex,
          e,
          y,
          l
        );
      }
      this._eventListeners = c;
    }
  };
  function ex(e, t, n, l) {
    return k(e).addEventListener(
      t,
      n,
      l
    ), !1;
  }
  Sn.prototype.removeEventListener = function(e, t, n) {
    var l = this._eventListeners;
    if (l !== null && (t = Vg(
      l,
      e,
      t,
      n
    ), t !== -1)) {
      var i = l[t];
      n = i.attachedListener;
      var c = i.cleanup;
      i = Vi(i.optionsOrUseCapture), p(
        this._fragmentFiber.child,
        !1,
        tx,
        e,
        n,
        i
      ), l.splice(t, 1), c !== null && c();
    }
  };
  function tx(e, t, n, l) {
    return k(e).removeEventListener(
      t,
      n,
      l
    ), !1;
  }
  function Vi(e) {
    return e != null && typeof e != "boolean" && (e.once === !0 || e.signal instanceof AbortSignal) ? { capture: e.capture, passive: e.passive } : e;
  }
  function Gg(e) {
    return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
  }
  function Vg(e, t, n, l) {
    if (e.length === 0) return -1;
    l = Gg(l);
    for (var i = 0; i < e.length; i++) {
      var c = e[i];
      if (c.type === t && c.listener === n && Gg(c.optionsOrUseCapture) === l)
        return i;
    }
    return -1;
  }
  Sn.prototype.dispatchEvent = function(e) {
    var t = N(
      this._fragmentFiber
    );
    if (t === null) return !0;
    t = k(t);
    var n = this._eventListeners;
    if (n !== null && 0 < n.length || !e.bubbles) {
      var l = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
      if (n)
        for (var i = 0; i < n.length; i++) {
          var c = n[i];
          l.addEventListener(
            c.type,
            c.attachedListener,
            Vi(c.optionsOrUseCapture)
          );
        }
      if (t.appendChild(l), e = l.dispatchEvent(e), n)
        for (i = 0; i < n.length; i++)
          c = n[i], l.removeEventListener(
            c.type,
            c.attachedListener,
            Vi(c.optionsOrUseCapture)
          );
      return t.removeChild(l), e;
    }
    return t.dispatchEvent(e);
  }, Sn.prototype.focus = function(e) {
    p(
      this._fragmentFiber.child,
      !0,
      Xg,
      e,
      void 0,
      void 0
    );
  };
  function Xg(e, t) {
    return e.tag === 6 ? !1 : (e = k(e), hx(e, t));
  }
  Sn.prototype.focusLast = function(e) {
    var t = [];
    p(
      this._fragmentFiber.child,
      !0,
      Qf,
      t,
      void 0,
      void 0
    );
    for (var n = t.length - 1; 0 <= n && !Xg(t[n], e); n--) ;
  };
  function Qf(e, t) {
    return t.push(e), !1;
  }
  Sn.prototype.blur = function() {
    var e = N(
      this._fragmentFiber
    );
    e !== null && (e = k(e), e = ic(e).activeElement, e !== null && p(
      this._fragmentFiber.child,
      !1,
      nx,
      e,
      void 0,
      void 0
    ));
  };
  function nx(e, t) {
    return e.tag === 6 ? !1 : (e = k(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
  }
  Sn.prototype.observeUsing = function(e) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), p(
      this._fragmentFiber.child,
      !1,
      lx,
      e,
      void 0,
      void 0
    );
  };
  function lx(e, t) {
    return e.tag === 6 || (e = k(e), t.observe(e)), !1;
  }
  Sn.prototype.unobserveUsing = function(e) {
    var t = this._observers;
    if (t !== null && t.has(e)) {
      t.delete(e), p(
        this._fragmentFiber.child,
        !1,
        ax,
        e,
        void 0,
        void 0
      );
      for (var n = t = 0; n < Qn.length; n++) {
        var l = Qn[n];
        l.fragmentInstance === this && l.observer === e ? e.unobserve(l.instance) : Qn[t++] = l;
      }
      Qn.length = t;
    }
  };
  function ax(e, t) {
    return e.tag === 6 || (e = k(e), t.unobserve(e)), !1;
  }
  var Qn = [], Kf = !1;
  function ix(e, t, n) {
    Qn.push({
      fragmentInstance: e,
      observer: t,
      instance: n
    }), Kf || (Kf = !0, mx(function() {
      Kf = !1;
      var l = Qn;
      Qn = [];
      for (var i = 0; i < l.length; i++) {
        var c = l[i];
        c.observer.unobserve(c.instance);
      }
    }));
  }
  Sn.prototype.getClientRects = function() {
    var e = [];
    return p(
      this._fragmentFiber.child,
      !1,
      sx,
      e,
      void 0,
      void 0
    ), e;
  };
  function sx(e, t) {
    if (e.tag === 6) {
      e = e.stateNode;
      var n = e.ownerDocument.createRange();
      n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
    } else
      e = k(e), t.push.apply(t, e.getClientRects());
    return !1;
  }
  Sn.prototype.getRootNode = function(e) {
    var t = N(
      this._fragmentFiber
    );
    return t === null ? this : k(t).getRootNode(e);
  }, Sn.prototype.compareDocumentPosition = function(e) {
    var t = N(
      this._fragmentFiber
    );
    if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var n = [];
    p(
      this._fragmentFiber.child,
      !1,
      Qf,
      n,
      void 0,
      void 0
    );
    var l = k(t);
    if (n.length === 0) {
      if (n = l, j(this._fragmentFiber)) {
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
      var i = l = n.compareDocumentPosition(e);
      return n === e ? i = Node.DOCUMENT_POSITION_CONTAINS : l & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = T(t)[1], n === null ? i = Node.DOCUMENT_POSITION_PRECEDING : (e = k(n).compareDocumentPosition(
        e
      ), i = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), i |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    t = k(n[0]), i = k(n[n.length - 1]);
    var c = j(this._fragmentFiber) ? t.parentElement : l;
    if (c == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    l = c.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, c = c.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var d = t.compareDocumentPosition(e), y = i.compareDocumentPosition(e), w = d & Node.DOCUMENT_POSITION_CONTAINED_BY || y & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return y = l && c && d & Node.DOCUMENT_POSITION_FOLLOWING && y & Node.DOCUMENT_POSITION_PRECEDING, t = l && t === e || c && i === e || w || y ? Node.DOCUMENT_POSITION_CONTAINED_BY : !l && t === e || !c && i === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : d, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || cx(
      t,
      this._fragmentFiber,
      n[0],
      n[n.length - 1],
      e
    ) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function cx(e, t, n, l, i) {
    var c = _n(i);
    if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (n = !!c)
        e: {
          for (; c !== null; ) {
            if (c.tag === 7 && (c === t || c.alternate === t)) {
              n = !0;
              break e;
            }
            c = c.return;
          }
          n = !1;
        }
      return n;
    }
    if (e & Node.DOCUMENT_POSITION_CONTAINS) {
      if (c === null)
        return c = i.ownerDocument, i === c || i === c.documentElement || i === c.body;
      e: {
        for (c = t, t = N(t); c !== null; ) {
          if (!(c.tag !== 5 && c.tag !== 3 && c.tag !== 27 || c !== t && c.alternate !== t)) {
            c = !0;
            break e;
          }
          c = c.return;
        }
        c = !1;
      }
      return c;
    }
    return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!c) && !(t = c === n) && (t = $(
      n,
      c,
      W
    ), t === null ? t = !1 : (p(
      t,
      !0,
      H,
      c,
      n
    ), c = K, K = null, t = c !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!c) && !(t = c === l) && (t = $(
      l,
      c,
      W
    ), t === null ? t = !1 : (p(
      t,
      !0,
      F,
      c,
      l
    ), c = K, X = K = null, t = c !== null)), t) : !1;
  }
  function Zg(e, t) {
    var n = e.ownerDocument.createRange();
    n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(
      window.scrollX + e.left,
      t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight
    );
  }
  Sn.prototype.scrollIntoView = function(e) {
    if (typeof e == "object") throw Error(o(566));
    var t = [];
    p(
      this._fragmentFiber.child,
      !1,
      Qf,
      t,
      void 0,
      void 0
    );
    var n = e !== !1;
    if (t.length === 0) {
      var l = T(
        this._fragmentFiber
      );
      if (l = n ? l[1] || l[0] || N(this._fragmentFiber) : l[0] || l[1], l === null) return;
      if (l.tag === 6) {
        e = k(l), Zg(e, n);
        return;
      }
      if (l = k(l), l.nodeType !== 9) {
        if (l.nodeType === 11) {
          n = "host" in l ? l.host : null, n !== null && n.scrollIntoView(e);
          return;
        }
        l.scrollIntoView(e);
      }
    }
    for (l = n ? t.length - 1 : 0; l !== (n ? -1 : t.length); ) {
      var i = t[l];
      i.tag === 6 ? (i = k(i), Zg(i, n)) : k(i).scrollIntoView(e), l += n ? -1 : 1;
    }
  };
  function ux(e, t) {
    return e = k(e), Qg(e, t), !1;
  }
  function Qg(e, t) {
    e.reactFragments == null && (e.reactFragments = /* @__PURE__ */ new Set()), e.reactFragments.add(t);
  }
  function Kg(e, t) {
    var n = t._eventListeners;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var i = n[l];
        e.addEventListener(
          i.type,
          i.attachedListener,
          Vi(i.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(c) {
      for (var d = 0, y = 0; y < Qn.length; y++) {
        var w = Qn[y];
        (w.fragmentInstance !== t || w.observer !== c || w.instance !== e) && (Qn[d++] = w);
      }
      Qn.length = d, c.observe(e);
    }), Qg(e, t));
  }
  function rx(e, t) {
    var n = t._eventListeners;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var i = n[l];
        e.removeEventListener(
          i.type,
          i.attachedListener,
          Vi(i.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(c) {
      typeof c.rootMargin == "string" ? ix(
        t,
        c,
        e
      ) : c.unobserve(e);
    }), e.reactFragments != null && e.reactFragments.delete(t));
  }
  function If(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (t = t.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          If(n), _a(n);
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
  function ox(e, t, n, l) {
    for (; e.nodeType === 1; ) {
      var i = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[ja])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (c = e.getAttribute("rel"), c === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (c !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (c = e.getAttribute("src"), (c !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && c && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var c = i.name == null ? null : "" + i.name;
        if (i.type === "hidden" && e.getAttribute("name") === c)
          return e;
      } else return e;
      if (e = Dn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function fx(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Dn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Ig(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Dn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Jf(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Ff(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function dx(e, t) {
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
  function Dn(e) {
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
  var Pf = null;
  function Jg(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0)
            return Dn(e.nextSibling);
          t--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Fg(e) {
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
  function hx(e, t) {
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
  function mx(e) {
    Ug(function() {
      Ug(function(t) {
        return e(t);
      });
    });
  }
  function Pg(e, t, n) {
    switch (t = ic(n), e) {
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
  function Wg(e, t, n) {
    for (var l in n) {
      var i = n[l];
      n.hasOwnProperty(l) && i != null && Ke(e, t, l, null, Gb, i);
    }
    n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === ll && (e.onclick = null), _a(e);
  }
  function Wf(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    _a(e);
  }
  var zn = /* @__PURE__ */ new Map(), e0 = /* @__PURE__ */ new Set();
  function sc(e) {
    if (typeof e.getRootNode == "function") {
      var t = e.getRootNode();
      if (t.nodeType === 9 || t.nodeType === 11) return t;
    }
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Dl = pe.d;
  pe.d = {
    f: px,
    r: gx,
    D: yx,
    C: vx,
    L: bx,
    m: xx,
    X: Nx,
    S: Sx,
    M: Ex
  };
  function px() {
    var e = Dl.f(), t = Vu();
    return e || t;
  }
  function gx(e) {
    var t = tl(e);
    t !== null && t.tag === 5 && t.type === "form" ? np(t) : Dl.r(e);
  }
  var Xi = typeof document > "u" ? null : document;
  function t0(e, t, n) {
    var l = Xi;
    if (l && typeof t == "string" && t) {
      var i = le(t);
      i = 'link[rel="' + e + '"][href="' + i + '"]', typeof n == "string" && (i += '[crossorigin="' + n + '"]'), e0.has(i) || (e0.add(i), e = { rel: e, crossOrigin: n, href: t }, l.querySelector(i) === null && (t = l.createElement("link"), qt(t, "link", e), rt(t), l.head.appendChild(t)));
    }
  }
  function yx(e) {
    Dl.D(e), t0("dns-prefetch", e, null);
  }
  function vx(e, t) {
    Dl.C(e, t), t0("preconnect", e, t);
  }
  function bx(e, t, n) {
    Dl.L(e, t, n);
    var l = Xi;
    if (l && e && t) {
      var i = 'link[rel="preload"][as="' + le(t) + '"]';
      t === "image" && n && n.imageSrcSet ? (i += '[imagesrcset="' + le(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (i += '[imagesizes="' + le(
        n.imageSizes
      ) + '"]')) : i += '[href="' + le(e) + '"]';
      var c = i;
      switch (t) {
        case "style":
          c = Zi(e);
          break;
        case "script":
          c = Qi(e);
      }
      if (!(zn.has(c) || (e = V(
        {
          rel: "preload",
          href: t === "image" && n && n.imageSrcSet ? void 0 : e,
          as: t
        },
        n
      ), zn.set(c, e), l.querySelector(i) !== null || t === "style" && l.querySelector(cc(c)) || t === "script" && l.querySelector(uc(c))))) {
        var d = l.createElement("link");
        qt(d, "link", e), t === "style" && (d[wa] = !0, d.onload = d.onerror = function() {
          mn(d);
        }), rt(d), l.head.appendChild(d);
      }
    }
  }
  function xx(e, t) {
    Dl.m(e, t);
    var n = Xi;
    if (n && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", i = 'link[rel="modulepreload"][as="' + le(l) + '"][href="' + le(e) + '"]', c = i;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          c = Qi(e);
      }
      if (!zn.has(c) && (e = V({ rel: "modulepreload", href: e }, t), zn.set(c, e), n.querySelector(i) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(uc(c)))
              return;
        }
        l = n.createElement("link"), qt(l, "link", e), rt(l), n.head.appendChild(l);
      }
    }
  }
  function Sx(e, t, n) {
    Dl.S(e, t, n);
    var l = Xi;
    if (l && e) {
      var i = hn(l).hoistableStyles, c = Zi(e);
      t = t || "default";
      var d = i.get(c);
      if (!d) {
        var y = { loading: 0, preload: null };
        if (d = l.querySelector(
          cc(c)
        ))
          y.loading = 5;
        else {
          e = V(
            { rel: "stylesheet", href: e, "data-precedence": t },
            n
          ), (n = zn.get(c)) && ed(e, n);
          var w = d = l.createElement("link");
          rt(w), qt(w, "link", e), w._p = new Promise(function(R, L) {
            w.onload = R, w.onerror = L;
          }), w.addEventListener("load", function() {
            y.loading |= 1;
          }), w.addEventListener("error", function() {
            y.loading |= 2;
          }), y.loading |= 4, Fu(d, t, l);
        }
        d = {
          type: "stylesheet",
          instance: d,
          count: 1,
          state: y
        }, i.set(c, d);
      }
    }
  }
  function Nx(e, t) {
    Dl.X(e, t);
    var n = Xi;
    if (n && e) {
      var l = hn(n).hoistableScripts, i = Qi(e), c = l.get(i);
      c || (c = n.querySelector(uc(i)), c || (e = V({ src: e, async: !0 }, t), (t = zn.get(i)) && td(e, t), c = n.createElement("script"), rt(c), qt(c, "link", e), n.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, l.set(i, c));
    }
  }
  function Ex(e, t) {
    Dl.M(e, t);
    var n = Xi;
    if (n && e) {
      var l = hn(n).hoistableScripts, i = Qi(e), c = l.get(i);
      c || (c = n.querySelector(uc(i)), c || (e = V({ src: e, async: !0, type: "module" }, t), (t = zn.get(i)) && td(e, t), c = n.createElement("script"), rt(c), qt(c, "link", e), n.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, l.set(i, c));
    }
  }
  function n0(e, t, n, l) {
    var i = (i = nn.current) ? sc(i) : null;
    if (!i) throw Error(o(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (n = Zi(n.href), t = hn(
          i
        ).hoistableStyles, l = t.get(n), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, t.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          e = Zi(n.href);
          var c = hn(
            i
          ).hoistableStyles, d = c.get(e);
          if (d || (i = i.ownerDocument || i, d = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, c.set(e, d), (c = i.querySelector(
            cc(e)
          )) ? c._p || (d.instance = c, d.state.loading = 5) : (c = zn.get(e), c || (c = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, zn.set(e, c)), Tx(
            i,
            e,
            c,
            d.state
          ))), t && l === null)
            throw Error(o(528, ""));
          return d;
        }
        if (t && l !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Qi(n), t = hn(
          i
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
  function Zi(e) {
    return 'href="' + le(e) + '"';
  }
  function cc(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function l0(e) {
    return V({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Tx(e, t, n, l) {
    if (t = e.querySelector(
      'link[rel="preload"][as="style"][' + t + "]"
    )) {
      if (t[wa] !== !0) {
        l.loading = 1;
        return;
      }
    } else
      t = e.createElement("link"), t[wa] = !0, t.onload = t.onerror = mn.bind(null, t), qt(t, "link", n), rt(t), e.head.appendChild(t);
    l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    });
  }
  function Qi(e) {
    return '[src="' + le(e) + '"]';
  }
  function uc(e) {
    return "script[async]" + e;
  }
  function a0(e, t, n) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + le(n.href) + '"]'
          );
          if (l)
            return t.instance = l, rt(l), l;
          var i = V({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), rt(l), qt(l, "style", i), Fu(l, n.precedence, e), t.instance = l;
        case "stylesheet":
          i = Zi(n.href);
          var c = e.querySelector(
            cc(i)
          );
          if (c)
            return t.state.loading |= 4, t.instance = c, rt(c), c;
          l = l0(n), (i = zn.get(i)) && ed(l, i), c = (e.ownerDocument || e).createElement("link"), rt(c);
          var d = c;
          return d._p = new Promise(function(y, w) {
            d.onload = y, d.onerror = w;
          }), qt(c, "link", l), t.state.loading |= 4, Fu(c, n.precedence, e), t.instance = c;
        case "script":
          return c = Qi(n.src), (i = e.querySelector(
            uc(c)
          )) ? (t.instance = i, rt(i), i) : (l = n, (i = zn.get(c)) && (l = V({}, n), td(l, i)), e = e.ownerDocument || e, i = e.createElement("script"), rt(i), qt(i, "link", l), e.head.appendChild(i), t.instance = i);
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, Fu(l, n.precedence, e));
    return t.instance;
  }
  function Fu(e, t, n) {
    for (var l = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), i = l.length ? l[l.length - 1] : null, c = i, d = 0; d < l.length; d++) {
      var y = l[d];
      if (y.dataset.precedence === t) c = y;
      else if (c !== i) break;
    }
    c ? c.parentNode.insertBefore(e, c.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function ed(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function td(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Pu = null;
  function i0(e, t, n) {
    if (Pu === null) {
      var l = /* @__PURE__ */ new Map(), i = Pu = /* @__PURE__ */ new Map();
      i.set(n, l);
    } else
      i = Pu, l = i.get(n), l || (l = /* @__PURE__ */ new Map(), i.set(n, l));
    if (l.has(e)) return l;
    for (l.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
      var c = n[i];
      if (!(c[ja] || c[tt] || e === "link" && c.getAttribute("rel") === "stylesheet") && c.namespaceURI !== "http://www.w3.org/2000/svg") {
        var d = c.getAttribute(t) || "";
        d = e + d;
        var y = l.get(d);
        y ? y.push(c) : l.set(d, [c]);
      }
    }
    return l;
  }
  function nd(e, t, n) {
    e = e.ownerDocument || e, e.head.insertBefore(
      n,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function jx(e, t, n) {
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
  function s0(e, t) {
    return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
  }
  function c0(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function u0(e) {
    return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function r0(e, t) {
    typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += u0(t), e.suspenseyImages.push(t)), e = Ax.bind(e), t.decode().then(e, e));
  }
  function wx(e, t, n, l) {
    if (n.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var i = Zi(l.href), c = t.querySelector(
          cc(i)
        );
        if (c) {
          t = c._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = rc.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = c, rt(c);
          return;
        }
        c = t.ownerDocument || t, l = l0(l), (i = zn.get(i)) && ed(l, i), c = c.createElement("link"), rt(c);
        var d = c;
        d._p = new Promise(function(y, w) {
          d.onload = y, d.onerror = w;
        }), qt(c, "link", l), n.instance = c;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++, n = rc.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
    }
  }
  var Wu = 0;
  function _x(e, t) {
    return e.stylesheets && e.count === 0 && tr(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
      var l = setTimeout(function() {
        if (e.stylesheets && tr(e, e.stylesheets), e.unsuspend) {
          var c = e.unsuspend;
          e.unsuspend = null, c();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Wu === 0 && (Wu = 62500 * Xb());
      var i = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && tr(e, e.stylesheets), e.unsuspend)) {
            var c = e.unsuspend;
            e.unsuspend = null, c();
          }
        },
        (e.imgBytes > Wu ? 50 : 800) + t
      );
      return e.unsuspend = n, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(i);
      };
    } : null;
  }
  function o0(e) {
    if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
      if (e.stylesheets) tr(e, e.stylesheets);
      else if (e.unsuspend) {
        var t = e.unsuspend;
        e.unsuspend = null, t();
      }
    }
  }
  function rc() {
    this.count--, o0(this);
  }
  function Ax() {
    this.imgCount--, o0(this);
  }
  var er = null;
  function tr(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, er = /* @__PURE__ */ new Map(), t.forEach(kx, e), er = null, rc.call(e));
  }
  function kx(e, t) {
    if (!(t.state.loading & 4)) {
      var n = er.get(e);
      if (n) var l = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), er.set(e, n);
        for (var i = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), c = 0; c < i.length; c++) {
          var d = i[c];
          (d.nodeName === "LINK" || d.getAttribute("media") !== "not all") && (n.set(d.dataset.precedence, d), l = d);
        }
        l && n.set(null, l);
      }
      i = t.instance, d = i.getAttribute("data-precedence"), c = n.get(d) || l, c === l && n.set(null, i), n.set(d, i), this.count++, l = rc.bind(this), i.addEventListener("load", l), i.addEventListener("error", l), c ? c.parentNode.insertBefore(i, c.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Ki = {
    $$typeof: Ye,
    Provider: null,
    Consumer: null,
    _currentValue: it,
    _currentValue2: it,
    _threadCount: 0
  };
  function Cx(e, t, n, l, i, c, d, y, w) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ct(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ct(0), this.hiddenUpdates = ct(null), this.identifierPrefix = l, this.onUncaughtError = i, this.onCaughtError = c, this.onRecoverableError = d, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = w, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function f0(e, t, n, l, i, c, d, y, w, R, L, Y) {
    return e = new Cx(
      e,
      t,
      n,
      d,
      w,
      R,
      L,
      Y,
      y
    ), t = 1, c === !0 && (t |= 24), c = sn(3, null, null, t), e.current = c, c.stateNode = e, t = go(), t.refCount++, e.pooledCache = t, t.refCount++, c.memoizedState = {
      element: l,
      isDehydrated: n,
      cache: t
    }, xo(c), e;
  }
  function d0(e) {
    return e ? (e = xi, e) : xi;
  }
  function h0(e, t, n, l, i, c) {
    i = d0(i), l.context === null ? l.context = i : l.pendingContext = i, l = na(t), l.payload = { element: n }, c = c === void 0 ? null : c, c !== null && (l.callback = c), n = la(e, l, t), n !== null && (on(n, e, t), qs(n, e, t));
  }
  function m0(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function ld(e, t) {
    m0(e, t), (e = e.alternate) && m0(e, t);
  }
  function p0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ra(e, 67108864);
      t !== null && on(t, e, 67108864), ld(e, 67108864);
    }
  }
  function g0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = xn();
      t = oi(t);
      var n = Ra(e, t);
      n !== null && on(n, e, t), ld(e, t);
    }
  }
  var Ii = !0;
  function Ox(e, t, n, l) {
    var i = se.T;
    se.T = null;
    var c = pe.p;
    try {
      pe.p = 2, ad(e, t, n, l);
    } finally {
      pe.p = c, se.T = i;
    }
  }
  function Rx(e, t, n, l) {
    var i = se.T;
    se.T = null;
    var c = pe.p;
    try {
      pe.p = 8, ad(e, t, n, l);
    } finally {
      pe.p = c, se.T = i;
    }
  }
  function ad(e, t, n, l) {
    if (Ii) {
      var i = id(l);
      if (i === null)
        Bf(
          e,
          t,
          l,
          nr,
          n
        ), v0(e, l);
      else if (Dx(
        i,
        e,
        t,
        n,
        l
      ))
        l.stopPropagation();
      else if (v0(e, l), t & 4 && -1 < Mx.indexOf(e)) {
        for (; i !== null; ) {
          var c = tl(i);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (c = c.stateNode, c.current.memoizedState.isDehydrated) {
                  var d = Wn(c.pendingLanes);
                  if (d !== 0) {
                    var y = c;
                    for (y.pendingLanes |= 2, y.entangledLanes |= 2; d; ) {
                      var w = 1 << 31 - ut(d);
                      y.entanglements[1] |= w, d &= ~w;
                    }
                    hl(c), (Ge & 6) === 0 && ($u = Gt() + 500, nc(0));
                  }
                }
                break;
              case 31:
              case 13:
                y = Ra(c, 2), y !== null && on(y, c, 2), Vu(), ld(c, 2);
            }
          if (c = id(l), c === null && Bf(
            e,
            t,
            l,
            nr,
            n
          ), c === i) break;
          i = c;
        }
        i !== null && l.stopPropagation();
      } else
        Bf(
          e,
          t,
          l,
          null,
          n
        );
    }
  }
  function id(e) {
    return e = Yr(e), sd(e);
  }
  var nr = null;
  function sd(e) {
    if (nr = null, e = _n(e), e !== null) {
      var t = h(e);
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
    return nr = e, null;
  }
  function y0(e) {
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
        switch (ps()) {
          case ci:
            return 2;
          case bl:
            return 8;
          case Bn:
          case Dc:
            return 32;
          case gs:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var cd = !1, pa = null, ga = null, ya = null, oc = /* @__PURE__ */ new Map(), fc = /* @__PURE__ */ new Map(), va = [], Mx = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function v0(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        pa = null;
        break;
      case "dragenter":
      case "dragleave":
        ga = null;
        break;
      case "mouseover":
      case "mouseout":
        ya = null;
        break;
      case "pointerover":
      case "pointerout":
        oc.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        fc.delete(t.pointerId);
    }
  }
  function dc(e, t, n, l, i, c) {
    return e === null || e.nativeEvent !== c ? (e = {
      blockedOn: t,
      domEventName: n,
      eventSystemFlags: l,
      nativeEvent: c,
      targetContainers: [i]
    }, t !== null && (t = tl(t), t !== null && p0(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
  }
  function Dx(e, t, n, l, i) {
    switch (t) {
      case "focusin":
        return pa = dc(
          pa,
          e,
          t,
          n,
          l,
          i
        ), !0;
      case "dragenter":
        return ga = dc(
          ga,
          e,
          t,
          n,
          l,
          i
        ), !0;
      case "mouseover":
        return ya = dc(
          ya,
          e,
          t,
          n,
          l,
          i
        ), !0;
      case "pointerover":
        var c = i.pointerId;
        return oc.set(
          c,
          dc(
            oc.get(c) || null,
            e,
            t,
            n,
            l,
            i
          )
        ), !0;
      case "gotpointercapture":
        return c = i.pointerId, fc.set(
          c,
          dc(
            fc.get(c) || null,
            e,
            t,
            n,
            l,
            i
          )
        ), !0;
    }
    return !1;
  }
  function b0(e) {
    var t = _n(e.target);
    if (t !== null) {
      var n = h(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = m(n), t !== null) {
            e.blockedOn = t, Bc(e.priority, function() {
              g0(n);
            });
            return;
          }
        } else if (t === 31) {
          if (t = g(n), t !== null) {
            e.blockedOn = t, Bc(e.priority, function() {
              g0(n);
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
  function lr(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = id(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var l = new n.constructor(
          n.type,
          n
        );
        $r = l, n.target.dispatchEvent(l), $r = null;
      } else
        return t = tl(n), t !== null && p0(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function x0(e, t, n) {
    lr(e) && n.delete(t);
  }
  function zx() {
    cd = !1, pa !== null && lr(pa) && (pa = null), ga !== null && lr(ga) && (ga = null), ya !== null && lr(ya) && (ya = null), oc.forEach(x0), fc.forEach(x0);
  }
  function ar(e, t) {
    e.blockedOn === t && (e.blockedOn = null, cd || (cd = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      zx
    )));
  }
  var ir = null;
  function S0(e) {
    ir !== e && (ir = e, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        ir === e && (ir = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t], l = e[t + 1], i = e[t + 2];
          if (typeof l != "function") {
            if (sd(l || n) === null)
              continue;
            break;
          }
          var c = tl(n);
          c !== null && (e.splice(t, 3), t -= 3, $o(
            c,
            {
              pending: !0,
              data: i,
              method: n.method,
              action: l
            },
            l,
            i
          ));
        }
      }
    ));
  }
  function Ji(e) {
    function t(w) {
      return ar(w, e);
    }
    pa !== null && ar(pa, e), ga !== null && ar(ga, e), ya !== null && ar(ya, e), oc.forEach(t), fc.forEach(t);
    for (var n = 0; n < va.length; n++) {
      var l = va[n];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < va.length && (n = va[0], n.blockedOn === null); )
      b0(n), n.blockedOn === null && va.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
      for (l = 0; l < n.length; l += 3) {
        var i = n[l], c = n[l + 1], d = i[Mt] || null;
        if (typeof c == "function")
          d || S0(n);
        else if (d) {
          var y = null;
          if (c && c.hasAttribute("formAction")) {
            if (i = c, d = c[Mt] || null)
              y = d.formAction;
            else if (sd(i) !== null) continue;
          } else y = d.action;
          typeof y == "function" ? n[l + 1] = y : (n.splice(l, 3), l -= 3), S0(n);
        }
      }
  }
  function N0() {
    function e(c) {
      c.canIntercept && c.info === "react-transition" && c.intercept({
        handler: function() {
          return new Promise(function(d) {
            return i = d;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      i !== null && (i(), i = null), l || setTimeout(n, 20);
    }
    function n() {
      if (!l && !navigation.transition) {
        var c = navigation.currentEntry;
        c && c.url != null && navigation.navigate(c.url, {
          state: c.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var l = !1, i = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
        l = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
      };
    }
  }
  function ud(e) {
    this._internalRoot = e;
  }
  sr.prototype.render = ud.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(o(409));
    var n = t.current, l = xn();
    h0(n, l, e, t, null, null);
  }, sr.prototype.unmount = ud.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      h0(e.current, 2, null, e, null, null), Vu(), t[$n] = null;
    }
  };
  function sr(e) {
    this._internalRoot = e;
  }
  sr.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Hc();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < va.length && t !== 0 && t < va[n].priority; n++) ;
      va.splice(n, 0, e), n === 0 && b0(e);
    }
  };
  var E0 = s.version;
  if (E0 !== "19.3.0")
    throw Error(
      o(
        527,
        E0,
        "19.3.0"
      )
    );
  pe.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
    return e = x(t), e = e !== null ? v(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var Lx = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: se,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var cr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!cr.isDisabled && cr.supportsFiber)
      try {
        Gl = cr.inject(
          Lx
        ), _t = cr;
      } catch {
      }
  }
  return mc.createRoot = function(e, t) {
    if (!f(e)) throw Error(o(299));
    var n = !1, l = "", i = dp, c = hp, d = mp;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (c = t.onCaughtError), t.onRecoverableError !== void 0 && (d = t.onRecoverableError)), t = f0(
      e,
      1,
      !1,
      null,
      null,
      n,
      l,
      null,
      i,
      c,
      d,
      N0
    ), e[$n] = t.current, Hf(e), new ud(t);
  }, mc.hydrateRoot = function(e, t, n) {
    if (!f(e)) throw Error(o(299));
    var l = !1, i = "", c = dp, d = hp, y = mp, w = null;
    return n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onUncaughtError !== void 0 && (c = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (y = n.onRecoverableError), n.formState !== void 0 && (w = n.formState)), t = f0(
      e,
      1,
      !0,
      t,
      n ?? null,
      l,
      i,
      w,
      c,
      d,
      y,
      N0
    ), t.context = d0(null), n = t.current, l = xn(), l = oi(l), i = na(l), i.callback = null, la(n, i, l), n = l, t.current.lanes = n, wn(t, n), hl(t), e[$n] = t.current, Hf(e), new sr(t);
  }, mc.version = "19.3.0", mc;
}
var M0;
function Qx() {
  if (M0) return fd.exports;
  M0 = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (s) {
        console.error(s);
      }
  }
  return a(), fd.exports = Zx(), fd.exports;
}
var Kx = Qx();
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ix = (a) => a.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Ly = (...a) => a.filter((s, r, o) => !!s && s.trim() !== "" && o.indexOf(s) === r).join(" ").trim();
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Jx = {
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
const Fx = S.forwardRef(
  ({
    color: a = "currentColor",
    size: s = 24,
    strokeWidth: r = 2,
    absoluteStrokeWidth: o,
    className: f = "",
    children: h,
    iconNode: m,
    ...g
  }, b) => S.createElement(
    "svg",
    {
      ref: b,
      ...Jx,
      width: s,
      height: s,
      stroke: a,
      strokeWidth: o ? Number(r) * 24 / Number(s) : r,
      className: Ly("lucide", f),
      ...g
    },
    [
      ...m.map(([x, v]) => S.createElement(x, v)),
      ...Array.isArray(h) ? h : [h]
    ]
  )
);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const te = (a, s) => {
  const r = S.forwardRef(
    ({ className: o, ...f }, h) => S.createElement(Fx, {
      ref: h,
      iconNode: s,
      className: Ly(`lucide-${Ix(a)}`, o),
      ...f
    })
  );
  return r.displayName = `${a}`, r;
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Px = te("Activity", [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wx = te("ArrowLeft", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const e2 = te("ArrowUp", [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rs = te("BookOpen", [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t2 = te("Brain", [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
      key: "ep3f8r"
    }
  ],
  ["path", { d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4", key: "1p4c4q" }],
  ["path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375", key: "tmeiqw" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M19.938 10.5a4 4 0 0 1 .585.396", key: "1qfode" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M19.967 17.484A4 4 0 0 1 18 18", key: "159ez6" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const D0 = te("Cake", [
  ["path", { d: "M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8", key: "1w3rig" }],
  ["path", { d: "M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1", key: "n2jgmb" }],
  ["path", { d: "M2 21h20", key: "1nyx9w" }],
  ["path", { d: "M7 8v3", key: "1qtyvj" }],
  ["path", { d: "M12 8v3", key: "hwp4zt" }],
  ["path", { d: "M17 8v3", key: "1i6e5u" }],
  ["path", { d: "M7 4h.01", key: "1bh4kh" }],
  ["path", { d: "M12 4h.01", key: "1ujb9j" }],
  ["path", { d: "M17 4h.01", key: "1upcoc" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const n2 = te("CalendarDays", [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const os = te("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const l2 = te("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uy = te("ChevronLeft", [
  ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hy = te("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const a2 = te("CircleHelp", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i2 = te("Clapperboard", [
  [
    "path",
    { d: "M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z", key: "1tn4o7" }
  ],
  ["path", { d: "m6.2 5.3 3.1 3.9", key: "iuk76l" }],
  ["path", { d: "m12.4 3.4 3.1 4", key: "6hsd6n" }],
  ["path", { d: "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z", key: "ltgou9" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const s2 = te("CloudDrizzle", [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M8 19v1", key: "1dk2by" }],
  ["path", { d: "M8 14v1", key: "84yxot" }],
  ["path", { d: "M16 19v1", key: "v220m7" }],
  ["path", { d: "M16 14v1", key: "g12gj6" }],
  ["path", { d: "M12 21v1", key: "q8vafk" }],
  ["path", { d: "M12 16v1", key: "1mx6rx" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c2 = te("CloudFog", [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M16 17H7", key: "pygtm1" }],
  ["path", { d: "M17 21H9", key: "1u2q02" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u2 = te("CloudLightning", [
  ["path", { d: "M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973", key: "1cez44" }],
  ["path", { d: "m13 12-3 5h4l-3 5", key: "1t22er" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r2 = te("CloudRain", [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M16 14v6", key: "1j4efv" }],
  ["path", { d: "M8 14v6", key: "17c4r9" }],
  ["path", { d: "M12 16v6", key: "c8a4gj" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const o2 = te("CloudSnow", [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M8 15h.01", key: "a7atzg" }],
  ["path", { d: "M8 19h.01", key: "puxtts" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }],
  ["path", { d: "M12 21h.01", key: "h35vbk" }],
  ["path", { d: "M16 15h.01", key: "rnfrdf" }],
  ["path", { d: "M16 19h.01", key: "1vcnzz" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const By = te("CloudSun", [
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }],
  ["path", { d: "M15.947 12.65a4 4 0 0 0-5.925-4.128", key: "dpwdj0" }],
  ["path", { d: "M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z", key: "s09mg5" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cd = te("Cloud", [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const th = te("Copy", [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qy = te("Disc3", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M6 12c0-1.7.7-3.2 1.8-4.2", key: "oqkarx" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M18 12c0 1.7-.7 3.2-1.8 4.2", key: "1eah9h" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const f2 = te("Download", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d2 = te("EyeOff", [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h2 = te("Eye", [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const m2 = te("Fan", [
  [
    "path",
    {
      d: "M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z",
      key: "484a7f"
    }
  ],
  ["path", { d: "M12 12v.01", key: "u5ubse" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $y = te("FileText", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const p2 = te("FileX", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "m14.5 12.5-5 5", key: "b62r18" }],
  ["path", { d: "m9.5 12.5 5 5", key: "1rk7el" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const g2 = te("Files", [
  ["path", { d: "M20 7h-3a2 2 0 0 1-2-2V2", key: "x099mo" }],
  ["path", { d: "M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z", key: "18t6ie" }],
  ["path", { d: "M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8", key: "1nja0z" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yy = te("Film", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M7 3v18", key: "bbkbws" }],
  ["path", { d: "M3 7.5h4", key: "zfgn84" }],
  ["path", { d: "M3 12h18", key: "1i2n21" }],
  ["path", { d: "M3 16.5h4", key: "1230mu" }],
  ["path", { d: "M17 3v18", key: "in4fa5" }],
  ["path", { d: "M17 7.5h4", key: "myr1c1" }],
  ["path", { d: "M17 16.5h4", key: "go4c1d" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gy = te("FolderOpen", [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z0 = te("Folder", [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nh = te("Gauge", [
  ["path", { d: "m12 14 4-4", key: "9kzdfg" }],
  ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0", key: "19p75a" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y2 = te("Globe", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v2 = te("HeartPulse", [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ],
  ["path", { d: "M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27", key: "1uw2ng" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vy = te("Heart", [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const b2 = te("Hourglass", [
  ["path", { d: "M5 22h14", key: "ehvnwv" }],
  ["path", { d: "M5 2h14", key: "pdyrp9" }],
  [
    "path",
    {
      d: "M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22",
      key: "1d314k"
    }
  ],
  [
    "path",
    { d: "M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2", key: "1vvvr6" }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vr = te("House", [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wr = te("Image", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x2 = te("Images", [
  ["path", { d: "M18 22H4a2 2 0 0 1-2-2V6", key: "pblm9e" }],
  ["path", { d: "m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18", key: "nf6bnh" }],
  ["circle", { cx: "12", cy: "8", r: "2", key: "1822b1" }],
  ["rect", { width: "16", height: "16", x: "6", y: "2", rx: "2", key: "12espp" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S2 = te("KeyRound", [
  [
    "path",
    {
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t"
    }
  ],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N2 = te("Lightbulb", [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _c = te("ListChecks", [
  ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
  ["path", { d: "m3 7 2 2 4-4", key: "1obspn" }],
  ["path", { d: "M13 6h8", key: "15sg57" }],
  ["path", { d: "M13 12h8", key: "h98zly" }],
  ["path", { d: "M13 18h8", key: "oe0vm4" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E2 = te("LocateFixed", [
  ["line", { x1: "2", x2: "5", y1: "12", y2: "12", key: "bvdh0s" }],
  ["line", { x1: "19", x2: "22", y1: "12", y2: "12", key: "1tbv5k" }],
  ["line", { x1: "12", x2: "12", y1: "2", y2: "5", key: "11lu5j" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }],
  ["circle", { cx: "12", cy: "12", r: "7", key: "fim9np" }],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xy = te("Lock", [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Od = te("MapPin", [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T2 = te("MessageCircle", [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j2 = te("MessageSquareQuote", [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }],
  ["path", { d: "M8 12a2 2 0 0 0 2-2V8H8", key: "1jfesj" }],
  ["path", { d: "M14 12a2 2 0 0 0 2-2V8h-2", key: "1dq9mh" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w2 = te("Mic", [
  ["path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z", key: "131961" }],
  ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2", key: "1vc78b" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _2 = te("Moon", [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const A2 = te("Navigation", [
  ["polygon", { points: "3 11 22 2 13 21 11 13 3 11", key: "1ltx0t" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k2 = te("PenLine", [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rd = te("Play", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lh = te("Plug", [
  ["path", { d: "M12 22v-5", key: "1ega77" }],
  ["path", { d: "M9 8V2", key: "14iosj" }],
  ["path", { d: "M15 8V2", key: "18g5xt" }],
  ["path", { d: "M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z", key: "osxo6l" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C2 = te("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O2 = te("Power", [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Md = te("RefreshCw", [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tc = te("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R2 = te("Settings", [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M2 = te("SlidersHorizontal", [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ah = te("Sparkles", [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const D2 = te("Square", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z2 = te("Star", [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zy = te("StickyNote", [
  ["path", { d: "M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z", key: "qazsjp" }],
  ["path", { d: "M15 3v4a2 2 0 0 0 2 2h4", key: "40519r" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const L2 = te("Sun", [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U2 = te("Terminal", [
  ["polyline", { points: "4 17 10 11 4 5", key: "akl6gq" }],
  ["line", { x1: "12", x2: "20", y1: "19", y2: "19", key: "q2wloq" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H2 = te("Thermometer", [
  ["path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z", key: "17jzev" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B2 = te("ToggleLeft", [
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "6", ry: "6", key: "f2vt7d" }],
  ["circle", { cx: "8", cy: "12", r: "2", key: "1nvbw3" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qy = te("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ky = te("TriangleAlert", [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ih = te("Upload", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "17 8 12 3 7 8", key: "t8dd8p" }],
  ["line", { x1: "12", x2: "12", y1: "3", y2: "15", key: "widbto" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q2 = te("UserRound", [
  ["circle", { cx: "12", cy: "8", r: "5", key: "1hypcn" }],
  ["path", { d: "M20 21a8 8 0 0 0-16 0", key: "rfgkzh" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Iy = te("Users", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jy = te("Volume2", [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $2 = te("VolumeX", [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }],
  ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const li = te("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const L0 = te("Zap", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
]);
/*! @license DOMPurify 3.4.15 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.15/LICENSE */
function U0(a, s) {
  (s == null || s > a.length) && (s = a.length);
  for (var r = 0, o = Array(s); r < s; r++) o[r] = a[r];
  return o;
}
function Y2(a) {
  if (Array.isArray(a)) return a;
}
function G2(a, s) {
  var r = a == null ? null : typeof Symbol < "u" && a[Symbol.iterator] || a["@@iterator"];
  if (r != null) {
    var o, f, h, m, g = [], b = !0, x = !1;
    try {
      if (h = (r = r.call(a)).next, s !== 0) for (; !(b = (o = h.call(r)).done) && (g.push(o.value), g.length !== s); b = !0) ;
    } catch (v) {
      x = !0, f = v;
    } finally {
      try {
        if (!b && r.return != null && (m = r.return(), Object(m) !== m)) return;
      } finally {
        if (x) throw f;
      }
    }
    return g;
  }
}
function V2() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function X2(a, s) {
  return Y2(a) || G2(a, s) || Z2(a, s) || V2();
}
function Z2(a, s) {
  if (a) {
    if (typeof a == "string") return U0(a, s);
    var r = {}.toString.call(a).slice(8, -1);
    return r === "Object" && a.constructor && (r = a.constructor.name), r === "Map" || r === "Set" ? Array.from(a) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? U0(a, s) : void 0;
  }
}
const Fy = Object.entries, H0 = Object.setPrototypeOf, Q2 = Object.isFrozen, K2 = Object.getPrototypeOf, I2 = Object.getOwnPropertyDescriptor;
let jt = Object.freeze, Rt = Object.seal, ls = Object.create, Py = typeof Reflect < "u" && Reflect, Dd = Py.apply, zd = Py.construct;
jt || (jt = function(s) {
  return s;
});
Rt || (Rt = function(s) {
  return s;
});
Dd || (Dd = function(s, r) {
  for (var o = arguments.length, f = new Array(o > 2 ? o - 2 : 0), h = 2; h < o; h++)
    f[h - 2] = arguments[h];
  return s.apply(r, f);
});
zd || (zd = function(s) {
  for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), f = 1; f < r; f++)
    o[f - 1] = arguments[f];
  return new s(...o);
});
const Fa = Nt(Array.prototype.forEach), J2 = Nt(Array.prototype.lastIndexOf), B0 = Nt(Array.prototype.pop), pc = Nt(Array.prototype.push), F2 = Nt(Array.prototype.splice), ss = Array.isArray, Sc = Nt(String.prototype.toLowerCase), pd = Nt(String.prototype.toString), q0 = Nt(String.prototype.match), gc = Nt(String.prototype.replace), $0 = Nt(String.prototype.indexOf), P2 = Nt(String.prototype.trim), W2 = Nt(Number.prototype.toString), eS = Nt(Boolean.prototype.toString), Y0 = typeof BigInt > "u" ? null : Nt(BigInt.prototype.toString), G0 = typeof Symbol > "u" ? null : Nt(Symbol.prototype.toString), fn = Nt(Object.prototype.hasOwnProperty), yc = Nt(Object.prototype.toString), Xt = Nt(RegExp.prototype.test), Ja = tS(TypeError);
function Nt(a) {
  return function(s) {
    s instanceof RegExp && (s.lastIndex = 0);
    for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), f = 1; f < r; f++)
      o[f - 1] = arguments[f];
    return Dd(a, s, o);
  };
}
function tS(a) {
  return function() {
    for (var s = arguments.length, r = new Array(s), o = 0; o < s; o++)
      r[o] = arguments[o];
    return zd(a, r);
  };
}
function $e(a, s) {
  let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Sc;
  if (H0 && H0(a, null), !ss(s))
    return a;
  let o = s.length;
  for (; o--; ) {
    let f = s[o];
    if (typeof f == "string") {
      const h = r(f);
      h !== f && (Q2(s) || (s[o] = h), f = h);
    }
    a[f] = !0;
  }
  return a;
}
function nS(a) {
  for (let s = 0; s < a.length; s++)
    fn(a, s) || (a[s] = null);
  return a;
}
function jn(a) {
  const s = ls(null);
  for (const o of Fy(a)) {
    var r = X2(o, 2);
    const f = r[0], h = r[1];
    fn(a, f) && (ss(h) ? s[f] = nS(h) : h && typeof h == "object" && h.constructor === Object ? s[f] = jn(h) : s[f] = h);
  }
  return s;
}
function lS(a) {
  switch (typeof a) {
    case "string":
      return a;
    case "number":
      return W2(a);
    case "boolean":
      return eS(a);
    case "bigint":
      return Y0 ? Y0(a) : "0";
    case "symbol":
      return G0 ? G0(a) : "Symbol()";
    case "undefined":
      return yc(a);
    case "function":
    case "object": {
      if (a === null)
        return yc(a);
      const s = a, r = Ln(s, "toString");
      if (typeof r == "function") {
        const o = r(s);
        return typeof o == "string" ? o : yc(o);
      }
      return yc(a);
    }
    default:
      return yc(a);
  }
}
function Ln(a, s) {
  for (; a !== null; ) {
    const o = I2(a, s);
    if (o) {
      if (o.get)
        return Nt(o.get);
      if (typeof o.value == "function")
        return Nt(o.value);
    }
    a = K2(a);
  }
  function r() {
    return null;
  }
  return r;
}
function aS(a) {
  try {
    return Xt(a, ""), !0;
  } catch {
    return !1;
  }
}
const V0 = jt(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), gd = jt(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), yd = jt(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), iS = jt(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), vd = jt(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), sS = jt(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), X0 = jt(["#text"]), Z0 = jt(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "command", "commandfor", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns"]), bd = jt(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dominant-baseline", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "pointer-events", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-orientation", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "vector-effect", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Q0 = jt(["accent", "accentunder", "align", "bevelled", "close", "columnalign", "columnlines", "columnspacing", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lquote", "lspace", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), ur = jt(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), cS = Rt(/{{[\w\W]*|^[\w\W]*}}/g), uS = Rt(/<%[\w\W]*|^[\w\W]*%>/g), rS = Rt(/\${[\w\W]*/g), oS = Rt(/^data-[\-\w.\u00B7-\uFFFF]+$/), fS = Rt(/^aria-[\-\w]+$/), K0 = Rt(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), dS = Rt(/^(?:\w+script|data):/i), hS = Rt(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), mS = Rt(/^html$/i), pS = Rt(/^[a-z][.\w]*(-[.\w]+)+$/i), I0 = Rt(/<[/\w!]/g), J0 = Rt(/<[/\w]/g), gS = Rt(/<\/no(script|embed|frames)/i), yS = Rt(/\/>/i), Nn = {
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
}, Wy = ["style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript"], vS = jt($e({}, Wy)), bS = (function() {
  const a = {};
  return Fa(Wy, (s) => {
    a[s] = Rt(new RegExp("</" + s + "(?=[\\t\\n\\f\\r />])", "i"));
  }), jt(a);
})(), xS = function() {
  return typeof window > "u" ? null : window;
}, SS = function(s, r) {
  if (typeof s != "object" || typeof s.createPolicy != "function")
    return null;
  let o = null;
  const f = "data-tt-policy-suffix";
  r && r.hasAttribute(f) && (o = r.getAttribute(f));
  const h = "dompurify" + (o ? "#" + o : "");
  try {
    return s.createPolicy(h, {
      createHTML(m) {
        return m;
      },
      createScriptURL(m) {
        return m;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + h + " could not be created."), null;
  }
}, F0 = function() {
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
}, xa = function(s, r, o, f) {
  return fn(s, r) && ss(s[r]) ? $e(f.base ? jn(f.base) : {}, s[r], f.transform) : o;
}, xd = function(s, r, o) {
  const f = fn(s, r) ? s[r] : void 0;
  return f && typeof f == "object" ? jn(f) : o();
};
function ev() {
  let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : xS();
  const s = (J) => ev(J);
  if (s.version = "3.4.15", s.removed = [], !a || !a.document || a.document.nodeType !== Nn.document || !a.Element)
    return s.isSupported = !1, s;
  let r = a.document;
  const o = r, f = o.currentScript;
  a.DocumentFragment;
  const h = a.HTMLTemplateElement, m = a.Node, g = a.Element, b = a.NodeFilter, x = a.NamedNodeMap;
  x === void 0 && (a.NamedNodeMap || a.MozNamedAttrMap), a.HTMLFormElement;
  const v = a.DOMParser, p = a.trustedTypes, N = g.prototype, j = Ln(N, "cloneNode"), T = Ln(N, "remove"), U = Ln(N, "removeAttributeNode"), k = Ln(N, "nextSibling"), K = Ln(N, "childNodes"), X = Ln(N, "parentNode"), H = Ln(N, "shadowRoot"), F = Ln(N, "attributes"), W = m && m.prototype ? Ln(m.prototype, "nodeType") : null, $ = m && m.prototype ? Ln(m.prototype, "nodeName") : null, V = m && m.prototype ? Ln(m.prototype, "ownerDocument") : null, ae = function(E) {
    return W ? W(E) : E.nodeType;
  }, ke = function(E) {
    return $ ? $(E) : E.nodeName;
  };
  if (typeof h == "function") {
    const J = r.createElement("template");
    J.content && J.content.ownerDocument && (r = J.content.ownerDocument);
  }
  let xe, Ee = "", ve, at = !1, We = 0;
  const Ye = function() {
    if (We > 0)
      throw Ja('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.');
  }, I = function(E) {
    Ye(), We++;
    try {
      return xe.createHTML(E);
    } finally {
      We--;
    }
  }, me = function(E) {
    Ye(), We++;
    try {
      return xe.createScriptURL(E);
    } finally {
      We--;
    }
  }, he = function() {
    return at || (ve = SS(p, f), at = !0), ve;
  }, Me = r, Z = Me.implementation, qe = Me.createNodeIterator, et = Me.createDocumentFragment, en = Me.getElementsByTagName, _ = o.importNode;
  let B = F0();
  s.isSupported = typeof Fy == "function" && typeof X == "function" && Z && Z.createHTMLDocument !== void 0;
  const oe = cS, ue = uS, Ce = rS, _e = oS, De = fS, se = dS, pe = hS, it = pS;
  let vl = K0, He = null;
  const Yt = $e({}, [...V0, ...gd, ...yd, ...vd, ...X0]);
  let Ne = null;
  const fe = $e({}, [...Z0, ...bd, ...Q0, ...ur]);
  let st = Object.seal(ls(null, {
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
  })), tn = null, nn = null;
  const Qt = Object.seal(ls(null, {
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
  let Hn = !0, Kt = !0, ln = !1, Q = !0, P = !1, be = !0, re = !1, Et = !1, wt = null, ii = null, si = !1, Pn = !1, $l = !1, Yl = !1, Rc = !0, Mc = !1;
  const Gt = "user-content-";
  let ps = !0, ci = !1, bl = {}, Bn = null;
  const Dc = $e({}, [
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
  let gs = null;
  const zc = $e({}, ["audio", "video", "img", "source", "image", "track"]);
  let Lc = null;
  const Gl = $e({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), _t = "http://www.w3.org/1998/Math/MathML", dn = "http://www.w3.org/2000/svg", ut = "http://www.w3.org/1999/xhtml";
  let Vl = ut, ys = !1, vs = null;
  const ui = $e({}, [_t, dn, ut], pd), Ea = jt(["mi", "mo", "mn", "ms", "mtext"]);
  let Xl = $e({}, Ea);
  const Wn = jt(["annotation-xml"]);
  let Zl = $e({}, Wn);
  const Ta = $e({}, ["title", "style", "font", "a", "script"]);
  let Ql = null;
  const zr = ["application/xhtml+xml", "text/html"], Uc = "text/html";
  let ct = null, wn = null;
  const Lr = r.createElement("form"), bs = function(E) {
    return E instanceof RegExp || E instanceof Function;
  }, ri = function() {
    let E = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (wn && wn === E)
      return;
    (!E || typeof E != "object") && (E = {}), E = jn(E), Ql = // eslint-disable-next-line unicorn/prefer-includes
    zr.indexOf(E.PARSER_MEDIA_TYPE) === -1 ? Uc : E.PARSER_MEDIA_TYPE, ct = Ql === "application/xhtml+xml" ? pd : Sc, He = xa(E, "ALLOWED_TAGS", Yt, {
      transform: ct
    }), Ne = xa(E, "ALLOWED_ATTR", fe, {
      transform: ct
    }), vs = xa(E, "ALLOWED_NAMESPACES", ui, {
      transform: pd
    }), Lc = xa(E, "ADD_URI_SAFE_ATTR", Gl, {
      transform: ct,
      base: Gl
    }), gs = xa(E, "ADD_DATA_URI_TAGS", zc, {
      transform: ct,
      base: zc
    }), Bn = xa(E, "FORBID_CONTENTS", Dc, {
      transform: ct
    }), tn = xa(E, "FORBID_TAGS", jn({}), {
      transform: ct
    }), nn = xa(E, "FORBID_ATTR", jn({}), {
      transform: ct
    }), bl = fn(E, "USE_PROFILES") ? E.USE_PROFILES && typeof E.USE_PROFILES == "object" ? jn(E.USE_PROFILES) : E.USE_PROFILES : !1, Hn = E.ALLOW_ARIA_ATTR !== !1, Kt = E.ALLOW_DATA_ATTR !== !1, ln = E.ALLOW_UNKNOWN_PROTOCOLS || !1, Q = E.ALLOW_SELF_CLOSE_IN_ATTR !== !1, P = E.SAFE_FOR_TEMPLATES || !1, be = E.SAFE_FOR_XML !== !1, re = E.WHOLE_DOCUMENT || !1, Pn = E.RETURN_DOM || !1, $l = E.RETURN_DOM_FRAGMENT || !1, Yl = E.RETURN_TRUSTED_TYPE || !1, si = E.FORCE_BODY || !1, Rc = E.SANITIZE_DOM !== !1, Mc = E.SANITIZE_NAMED_PROPS || !1, ps = E.KEEP_CONTENT !== !1, ci = E.IN_PLACE || !1, vl = aS(E.ALLOWED_URI_REGEXP) ? E.ALLOWED_URI_REGEXP : K0, Vl = typeof E.NAMESPACE == "string" ? E.NAMESPACE : ut, Xl = xd(
      E,
      "MATHML_TEXT_INTEGRATION_POINTS",
      () => $e({}, Ea)
      // Default built-in map
    ), Zl = xd(
      E,
      "HTML_INTEGRATION_POINTS",
      () => $e({}, Wn)
      // Default built-in map
    );
    const M = xd(E, "CUSTOM_ELEMENT_HANDLING", () => ls(null));
    if (st = ls(null), fn(M, "tagNameCheck") && bs(M.tagNameCheck) && (st.tagNameCheck = M.tagNameCheck), fn(M, "attributeNameCheck") && bs(M.attributeNameCheck) && (st.attributeNameCheck = M.attributeNameCheck), fn(M, "allowCustomizedBuiltInElements") && typeof M.allowCustomizedBuiltInElements == "boolean" && (st.allowCustomizedBuiltInElements = M.allowCustomizedBuiltInElements), Rt(st), P && (Kt = !1), $l && (Pn = !0), bl && (He = $e({}, X0), Ne = ls(null), bl.html === !0 && ($e(He, V0), $e(Ne, Z0)), bl.svg === !0 && ($e(He, gd), $e(Ne, bd), $e(Ne, ur)), bl.svgFilters === !0 && ($e(He, yd), $e(Ne, bd), $e(Ne, ur)), bl.mathMl === !0 && ($e(He, vd), $e(Ne, Q0), $e(Ne, ur))), Qt.tagCheck = null, Qt.attributeCheck = null, fn(E, "ADD_TAGS") && (typeof E.ADD_TAGS == "function" ? Qt.tagCheck = E.ADD_TAGS : ss(E.ADD_TAGS) && (He === Yt && (He = jn(He)), $e(He, E.ADD_TAGS, ct))), fn(E, "ADD_ATTR") && (typeof E.ADD_ATTR == "function" ? Qt.attributeCheck = E.ADD_ATTR : ss(E.ADD_ATTR) && (Ne === fe && (Ne = jn(Ne)), $e(Ne, E.ADD_ATTR, ct))), fn(E, "ADD_FORBID_CONTENTS") && ss(E.ADD_FORBID_CONTENTS) && (Bn === Dc && (Bn = jn(Bn)), $e(Bn, E.ADD_FORBID_CONTENTS, ct)), ps && (He["#text"] = !0), re && $e(He, ["html", "head", "body"]), He.table && ($e(He, ["tbody"]), delete tn.tbody), E.TRUSTED_TYPES_POLICY) {
      if (typeof E.TRUSTED_TYPES_POLICY.createHTML != "function")
        throw Ja('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      if (typeof E.TRUSTED_TYPES_POLICY.createScriptURL != "function")
        throw Ja('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      const G = xe;
      xe = E.TRUSTED_TYPES_POLICY;
      try {
        Ee = I("");
      } catch (ne) {
        throw xe = G, ne;
      }
    } else E.TRUSTED_TYPES_POLICY === null ? (xe = void 0, Ee = "") : (xe === void 0 && (xe = he()), xe && typeof Ee == "string" && (Ee = I("")));
    jt && jt(E), wn = E;
  }, xs = $e({}, [...gd, ...yd, ...iS]), oi = $e({}, [...vd, ...sS]), Ss = function(E, M, G) {
    return M.namespaceURI === ut ? E === "svg" : M.namespaceURI === _t ? E === "svg" && (G === "annotation-xml" || Xl[G]) : !!xs[E];
  }, Hc = function(E, M, G) {
    return M.namespaceURI === ut ? E === "math" : M.namespaceURI === dn ? E === "math" && Zl[G] : !!oi[E];
  }, Bc = function(E, M, G) {
    return M.namespaceURI === dn && !Zl[G] || M.namespaceURI === _t && !Xl[G] ? !1 : !oi[E] && (Ta[E] || !xs[E]);
  }, qn = function(E) {
    let M = X(E);
    (!M || !M.tagName) && (M = {
      namespaceURI: Vl,
      tagName: "template"
    });
    const G = Sc(E.tagName), ne = Sc(M.tagName);
    return vs[E.namespaceURI] ? E.namespaceURI === dn ? Ss(G, M, ne) : E.namespaceURI === _t ? Hc(G, M, ne) : E.namespaceURI === ut ? Bc(G, M, ne) : !!(Ql === "application/xhtml+xml" && vs[E.namespaceURI]) : !1;
  }, tt = function(E) {
    pc(s.removed, {
      element: E
    });
    try {
      X(E).removeChild(E);
    } catch {
      if (T(E), !X(E))
        throw Ja("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
    }
  }, Mt = function(E, M, G) {
    try {
      U(E, M);
    } catch {
      try {
        E.removeAttribute(G);
      } catch {
      }
    }
  }, $n = function(E) {
    fi(E);
    const M = K(E);
    if (M) {
      const ne = [];
      Fa(M, (le) => {
        pc(ne, le);
      }), Fa(ne, (le) => {
        try {
          T(le);
        } catch {
        }
      });
    }
    const G = F(E);
    if (G)
      for (let ne = G.length - 1; ne >= 0; --ne) {
        const le = G[ne], ge = le && le.name;
        typeof ge == "string" && Mt(E, le, ge);
      }
  }, el = function(E, M, G) {
    if (!G)
      try {
        G = M.getAttributeNode(E);
      } catch {
        G = null;
      }
    pc(s.removed, {
      attribute: G || null,
      from: M
    });
    try {
      G ? U(M, G) : M.removeAttribute(E);
    } catch {
      try {
        M.removeAttribute(E);
      } catch {
      }
    }
    if (E === "is")
      if (Pn || $l)
        try {
          tt(M);
        } catch {
        }
      else
        try {
          M.setAttribute(E, "");
        } catch {
        }
  }, Ur = function(E) {
    const M = F(E);
    if (M)
      for (let G = M.length - 1; G >= 0; --G) {
        const ne = M[G], le = ne && ne.name;
        typeof le != "string" || Ne[ct(le)] || Mt(E, ne, le);
      }
  }, fi = function(E) {
    const M = [E];
    for (; M.length > 0; ) {
      const G = M.pop();
      ae(G) === Nn.element && Ur(G);
      const le = K(G);
      if (le)
        for (let ge = le.length - 1; ge >= 0; --ge)
          M.push(le[ge]);
    }
  }, Ns = function(E, M) {
    return be ? E === "patchsrc" ? !0 : E === "for" && M !== "label" && M !== "output" : !1;
  }, ja = function(E) {
    if (!be)
      return;
    const M = [E];
    for (; M.length > 0; ) {
      const G = M.pop(), ne = ae(G);
      if (ne === Nn.processingInstruction || ne === Nn.comment && Xt(J0, G.data)) {
        try {
          T(G);
        } catch {
        }
        continue;
      }
      if (ne === Nn.element) {
        const ge = G, Xe = ct(ke(G));
        try {
          ge.hasAttribute && ge.hasAttribute("patchsrc") && ge.removeAttribute("patchsrc"), ge.hasAttribute && ge.hasAttribute("for") && Ns("for", Xe) && ge.removeAttribute("for");
        } catch {
        }
      }
      const le = K(G);
      if (le)
        for (let ge = le.length - 1; ge >= 0; --ge)
          M.push(le[ge]);
    }
  }, wa = function(E) {
    let M = null, G = null;
    if (si)
      E = "<remove></remove>" + E;
    else {
      const ge = q0(E, /^[\r\n\t ]+/);
      G = ge && ge[0];
    }
    Ql === "application/xhtml+xml" && Vl === ut && (E = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + E + "</body></html>");
    const ne = xe ? I(E) : E;
    if (Vl === ut)
      try {
        M = new v().parseFromString(ne, Ql);
      } catch {
      }
    if (!M || !M.documentElement) {
      M = Z.createDocument(Vl, "template", null);
      try {
        M.documentElement.innerHTML = ys ? Ee : ne;
      } catch {
      }
    }
    const le = M.body || M.documentElement;
    return E && G && le.insertBefore(r.createTextNode(G), le.childNodes[0] || null), Vl === ut ? en.call(M, re ? "html" : "body")[0] : re ? M.documentElement : le;
  }, _a = function(E) {
    const M = V ? V(E) : E.ownerDocument;
    return qe.call(
      M || E,
      E,
      // eslint-disable-next-line no-bitwise
      b.SHOW_ELEMENT | b.SHOW_COMMENT | b.SHOW_TEXT | b.SHOW_PROCESSING_INSTRUCTION | b.SHOW_CDATA_SECTION,
      null
    );
  }, _n = function(E) {
    return E = gc(E, oe, " "), E = gc(E, ue, " "), E = gc(E, Ce, " "), E;
  }, tl = function(E) {
    var M;
    E.normalize();
    const G = V ? V(E) : E.ownerDocument, ne = qe.call(
      G || E,
      E,
      // eslint-disable-next-line no-bitwise
      b.SHOW_TEXT | b.SHOW_COMMENT | b.SHOW_CDATA_SECTION | b.SHOW_PROCESSING_INSTRUCTION,
      null
    );
    let le = ne.nextNode();
    for (; le; )
      le.data = _n(le.data), le = ne.nextNode();
    const ge = (M = E.querySelectorAll) === null || M === void 0 ? void 0 : M.call(E, "template");
    ge && Fa(ge, (Xe) => {
      hn(Xe.content) && tl(Xe.content);
    });
  }, nl = function(E) {
    const M = $ ? $(E) : null;
    return typeof M != "string" || ct(M) !== "form" ? !1 : typeof E.nodeName != "string" || typeof E.textContent != "string" || typeof E.removeChild != "function" || // Realm-safe NamedNodeMap detection: equality against the cached
    // prototype getter. Clobbered .attributes (e.g. <input name="attributes">)
    // makes the direct read diverge from the cached read; a clean form
    // (same-realm OR foreign-realm) has both reads pointing at the same
    // canonical NamedNodeMap.
    E.attributes !== F(E) || typeof E.removeAttribute != "function" || // A form descendant named "removeAttributeNode" or "getAttributeNode"
    // shadows these Attr-node methods via [LegacyOverrideBuiltIns].
    // _removeAttribute() / _stripAttributeNode() reach for
    // element.removeAttributeNode(attr) first; when it is shadowed the call
    // throws and the name-based fallback element.removeAttribute(name)
    // ASCII-lowercases its lookup key in an HTML document, silently missing
    // a case-preserved event-handler attribute (e.g. an ONANIMATIONSTART
    // that reached the sanitizer through an XML/XHTML parse). Flag the form
    // so it is removed wholesale, exactly as for the other shadowed methods.
    typeof E.removeAttributeNode != "function" || typeof E.getAttributeNode != "function" || typeof E.setAttribute != "function" || typeof E.namespaceURI != "string" || typeof E.insertBefore != "function" || typeof E.hasChildNodes != "function" || // NodeType clobbering probe. Cached Node.prototype.nodeType getter
    // returns the integer 1 for any Element regardless of realm; direct
    // read on a clobbered form (e.g. <input name="nodeType">) returns
    // the named child element. Cheap addition — nodeType is read from
    // an internal slot, no serialization cost — and removes a residual
    // clobbering surface used by several mXSS / PI / comment branches
    // in _sanitizeElements that compare currentNode.nodeType directly.
    E.nodeType !== W(E) || // HTMLFormElement has [LegacyOverrideBuiltIns]: a descendant named
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
    E.childNodes !== K(E);
  }, hn = function(E) {
    if (!W || typeof E != "object" || E === null)
      return !1;
    try {
      return W(E) === Nn.documentFragment;
    } catch {
      return !1;
    }
  }, rt = function(E) {
    if (!W || typeof E != "object" || E === null)
      return !1;
    try {
      return typeof W(E) == "number";
    } catch {
      return !1;
    }
  };
  function mn(J, E, M) {
    J.length !== 0 && Fa(J, (G) => {
      G.call(s, E, M, wn);
    });
  }
  const qc = function(E, M) {
    return !!(be && E.hasChildNodes() && !rt(E.firstElementChild) && Xt(I0, E.textContent) && Xt(I0, E.innerHTML) || be && E.namespaceURI === ut && vS[M] && (rt(E.firstElementChild) || typeof E.textContent == "string" && Xt(bS[M], E.textContent)) || E.nodeType === Nn.processingInstruction || be && E.nodeType === Nn.comment && Xt(J0, E.data));
  }, Aa = function(E, M) {
    if (E instanceof RegExp)
      return Xt(E, M);
    if (E instanceof Function) {
      for (var G = arguments.length, ne = new Array(G > 2 ? G - 2 : 0), le = 2; le < G; le++)
        ne[le - 2] = arguments[le];
      return !!E(M, ...ne);
    }
    return !1;
  }, xl = function(E, M, G) {
    if (!tn[M] && Ue(M) && Aa(st.tagNameCheck, M))
      return !1;
    if (ps && !Bn[M]) {
      const ne = X(E), le = K(E);
      if (le && ne) {
        const ge = le.length;
        for (let Xe = ge - 1; Xe >= 0; --Xe) {
          const Fe = E === G ? j(le[Xe], !0) : le[Xe];
          ne.insertBefore(Fe, k(E));
        }
      }
    }
    return tt(E), !0;
  }, Sl = function(E, M, G, ne) {
    return E.length === 0 ? M : M === G || M === ne ? jn(M) : M;
  }, $c = function(E, M) {
    return E === M || X(E) !== null ? !1 : (ci && fi(E), !0);
  }, Es = function(E, M) {
    if (mn(B.beforeSanitizeElements, E, null), $c(E, M))
      return !0;
    if (nl(E))
      return tt(E), !0;
    const G = ct(ke(E));
    if (He = Sl(B.uponSanitizeElement, He, Yt, wt), mn(B.uponSanitizeElement, E, {
      tagName: G,
      allowedTags: He
    }), $c(E, M))
      return !0;
    if (qc(E, G))
      return tt(E), !0;
    if (tn[G] || !(Qt.tagCheck instanceof Function && Qt.tagCheck(G)) && !He[G]) {
      const le = xl(E, G, M);
      return le === !1 && mn(B.afterSanitizeElements, E, null), le;
    }
    if (ae(E) === Nn.element && !qn(E) || (G === "noscript" || G === "noembed" || G === "noframes") && Xt(gS, E.innerHTML))
      return tt(E), !0;
    if (P && E.nodeType === Nn.text) {
      const le = _n(E.textContent);
      E.textContent !== le && (pc(s.removed, {
        element: E.cloneNode()
      }), E.textContent = le);
    }
    return mn(B.afterSanitizeElements, E, null), !1;
  }, Ts = function(E, M, G) {
    if (nn[M] || Ns(M, E) || Rc && (M === "id" || M === "name") && (G in r || G in Lr))
      return !1;
    const ne = Ne[M] || Qt.attributeCheck instanceof Function && Qt.attributeCheck(M, E);
    return Kt && Xt(_e, M) || Hn && Xt(De, M) ? !0 : ne ? Lc[M] || Xt(vl, gc(G, pe, "")) || (M === "src" || M === "xlink:href" || M === "href") && E !== "script" && $0(G, "data:") === 0 && gs[E] || ln && !Xt(se, gc(G, pe, "")) ? !0 : !G : (
      // Condition a) covers a basically valid custom element tag name whose
      // tag passes the configured tagNameCheck and whose attribute name
      // passes the configured attributeNameCheck ...
      Ue(E) && Aa(st.tagNameCheck, E) && Aa(st.attributeNameCheck, M, E) || // Condition b) covers an `is` attribute whose value passes the
      // configured tagNameCheck while customized built-in elements are
      // allowed.
      M === "is" && st.allowCustomizedBuiltInElements && Aa(st.tagNameCheck, G)
    );
  }, Hr = $e({}, ["annotation-xml", "color-profile", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "missing-glyph"]), Ue = function(E) {
    return !Hr[Sc(E)] && Xt(it, E);
  }, Yc = function(E, M, G, ne) {
    if (xe && typeof p == "object" && typeof p.getAttributeType == "function" && !G)
      switch (p.getAttributeType(E, M)) {
        case "TrustedHTML":
          return I(ne);
        case "TrustedScriptURL":
          return me(ne);
      }
    return ne;
  }, di = function(E, M, G, ne) {
    try {
      return G ? E.setAttributeNS(G, M, ne) : E.setAttribute(M, ne), nl(E) ? (tt(E), !1) : !0;
    } catch {
      return el(M, E), !1;
    }
  }, ka = function(E) {
    mn(B.beforeSanitizeAttributes, E, null);
    const M = E.attributes;
    if (!M || nl(E))
      return;
    Ne = Sl(B.uponSanitizeAttribute, Ne, fe, ii);
    const G = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: Ne,
      forceKeepAttr: void 0
    };
    let ne = M.length;
    const le = ct(E.nodeName);
    for (; ne--; ) {
      const ge = M[ne], Xe = ge.name, Fe = ge.namespaceURI, gt = ge.value, zt = ct(Xe), hi = gt;
      let ht = Xe === "value" ? hi : P2(hi), Gc = !1;
      if (G.attrName = zt, G.attrValue = ht, G.keepAttr = !0, G.forceKeepAttr = void 0, mn(B.uponSanitizeAttribute, E, G), ht = G.attrValue, Mc && (zt === "id" || zt === "name") && $0(ht, Gt) !== 0 && (el(Xe, E, ge), ht = Gt + ht, Gc = !0), be && Xt(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, ht)) {
        el(Xe, E, ge);
        continue;
      }
      if (zt === "attributename" && q0(ht, "href")) {
        el(Xe, E, ge);
        continue;
      }
      if (!G.forceKeepAttr) {
        if (!G.keepAttr) {
          el(Xe, E, ge);
          continue;
        }
        if (!Q && Xt(yS, ht)) {
          el(Xe, E, ge);
          continue;
        }
        if (P && (ht = _n(ht)), !Ts(le, zt, ht)) {
          el(Xe, E, ge);
          continue;
        }
        ht = Yc(le, zt, Fe, ht), ht !== hi && di(E, Xe, Fe, ht) && Gc && B0(s.removed);
      }
    }
    mn(B.afterSanitizeAttributes, E, null);
  }, an = function(E) {
    let M = null;
    const G = _a(E);
    for (mn(B.beforeSanitizeShadowDOM, E, null); M = G.nextNode(); )
      if (mn(B.uponSanitizeShadowNode, M, null), Es(M, E), ka(M), hn(M.content) && an(M.content), ae(M) === Nn.element) {
        const ne = H(M);
        hn(ne) && (Dt(ne), an(ne));
      }
    mn(B.afterSanitizeShadowDOM, E, null);
  }, Dt = function(E) {
    const M = [{
      node: E,
      shadow: null
    }];
    for (; M.length > 0; ) {
      const G = M.pop();
      if (G.shadow) {
        an(G.shadow);
        continue;
      }
      const ne = G.node, ge = ae(ne) === Nn.element, Xe = K(ne);
      if (Xe)
        for (let Fe = Xe.length - 1; Fe >= 0; --Fe)
          M.push({
            node: Xe[Fe],
            shadow: null
          });
      if (ge) {
        const Fe = $ ? $(ne) : null;
        if (typeof Fe == "string" && ct(Fe) === "template") {
          const gt = ne.content;
          hn(gt) && M.push({
            node: gt,
            shadow: null
          });
        }
      }
      if (ge) {
        const Fe = H(ne);
        hn(Fe) && M.push({
          node: null,
          shadow: Fe
        }, {
          node: Fe,
          shadow: null
        });
      }
    }
  };
  return s.sanitize = function(J) {
    let E = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, M = null, G = null, ne = null, le = null;
    if (ys = !J, ys && (J = "<!-->"), typeof J != "string" && !rt(J) && (J = lS(J), typeof J != "string"))
      throw Ja("dirty is not a string, aborting");
    if (!s.isSupported)
      return J;
    Et ? (He = wt, Ne = ii) : ri(E), (B.uponSanitizeElement.length > 0 || B.uponSanitizeAttribute.length > 0) && (He = jn(He)), B.uponSanitizeAttribute.length > 0 && (Ne = jn(Ne)), s.removed = [];
    const ge = ci && typeof J != "string" && rt(J);
    if (ge) {
      ja(J);
      const gt = ke(J);
      if (typeof gt == "string") {
        const zt = ct(gt);
        if (!He[zt] || tn[zt])
          throw $n(J), Ja("root node is forbidden and cannot be sanitized in-place");
      }
      if (nl(J))
        throw $n(J), Ja("root node is clobbered and cannot be sanitized in-place");
      try {
        Dt(J);
      } catch (zt) {
        throw $n(J), zt;
      }
    } else if (rt(J))
      M = wa("<!---->"), G = M.ownerDocument.importNode(J, !0), G.nodeType === Nn.element && G.nodeName === "BODY" || G.nodeName === "HTML" ? M = G : M.appendChild(G), Dt(M);
    else {
      if (!Pn && !P && !re && // eslint-disable-next-line unicorn/prefer-includes
      J.indexOf("<") === -1)
        return xe && Yl ? I(J) : J;
      if (M = wa(J), !M)
        return Pn ? null : Yl ? Ee : "";
    }
    M && si && tt(M.firstChild);
    const Xe = ge ? J : M;
    try {
      const gt = _a(Xe);
      for (; ne = gt.nextNode(); )
        Es(ne, Xe), ka(ne), hn(ne.content) && an(ne.content);
    } catch (gt) {
      throw ge && ($n(J), Fa(s.removed, (zt) => {
        zt.element && fi(zt.element);
      })), gt;
    }
    if (ge)
      return Fa(s.removed, (gt) => {
        gt.element && fi(gt.element);
      }), P && tl(J), J;
    if (Pn) {
      if (P && tl(M), $l)
        for (le = et.call(M.ownerDocument); M.firstChild; )
          le.appendChild(M.firstChild);
      else
        le = M;
      return (Ne.shadowroot || Ne.shadowrootmode) && (le = _.call(o, le, !0)), le;
    }
    let Fe = re ? M.outerHTML : M.innerHTML;
    return re && He["!doctype"] && M.ownerDocument && M.ownerDocument.doctype && M.ownerDocument.doctype.name && Xt(mS, M.ownerDocument.doctype.name) && (Fe = "<!DOCTYPE " + M.ownerDocument.doctype.name + `>
` + Fe), P && (Fe = _n(Fe)), xe && Yl ? I(Fe) : Fe;
  }, s.setConfig = function() {
    let J = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    ri(J), Et = !0, wt = He, ii = Ne;
  }, s.clearConfig = function() {
    wn = null, Et = !1, wt = null, ii = null, xe = ve, Ee = "";
  }, s.isValidAttribute = function(J, E, M) {
    wn || ri({});
    const G = ct(J), ne = ct(E);
    return Ts(G, ne, M);
  }, s.addHook = function(J, E) {
    typeof E == "function" && fn(B, J) && pc(B[J], E);
  }, s.removeHook = function(J, E) {
    if (fn(B, J)) {
      if (E !== void 0) {
        const M = J2(B[J], E);
        return M === -1 ? void 0 : F2(B[J], M, 1)[0];
      }
      return B0(B[J]);
    }
  }, s.removeHooks = function(J) {
    fn(B, J) && (B[J] = []);
  }, s.removeAllHooks = function() {
    B = F0();
  }, s;
}
var tv = ev();
function sh() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var ai = sh();
function nv(a) {
  ai = a;
}
var Wa = { exec: () => null };
function Fi(a) {
  let s = [];
  return (r) => {
    let o = Math.max(0, Math.min(3, r - 1)), f = s[o];
    return f || (f = a(o), s[o] = f), f;
  };
}
function we(a, s = "") {
  let r = typeof a == "string" ? a : a.source, o = { replace: (f, h) => {
    let m = typeof h == "string" ? h : h.source;
    return m = m.replace(Zt.caret, "$1"), r = r.replace(f, m), o;
  }, getRegex: () => new RegExp(r, s) };
  return o;
}
var NS = ((a = "") => {
  try {
    return !!new RegExp("(?<=1)(?<!1)" + a);
  } catch {
    return !1;
  }
})(), Zt = { codeRemoveIndent: /^(?: {0,3}\t| {1,4})/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, endingSpaceTabChar: /[ \t]$/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (a) => new RegExp(`^( {0,3}${a})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: Fi((a) => new RegExp(`^ {0,${a}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)), hrRegex: Fi((a) => new RegExp(`^ {0,${a}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)), fencesBeginRegex: Fi((a) => new RegExp(`^ {0,${a}}(?:\`\`\`|~~~)`)), headingBeginRegex: Fi((a) => new RegExp(`^ {0,${a}}#`)), htmlBeginRegex: Fi((a) => new RegExp(`^ {0,${a}}(?:</?(?:${kc})(?: +|$|/?>)|<(?:script|pre|style|textarea|!--))`, "i")), blockquoteBeginRegex: Fi((a) => new RegExp(`^ {0,${a}}>`)) }, ES = /^(?:[ \t]*(?:\n|$))+/, TS = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, jS = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Ac = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, wS = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, ch = / {0,3}(?:[*+-]|\d{1,9}[.)])/, lv = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, av = we(lv).replace(/bull/g, ch).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), _S = we(lv).replace(/bull/g, ch).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), uh = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/, AS = /^[^\n]+/, rh = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, kS = we(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", rh).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), CS = we(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, ch).getRegex(), kc = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", oh = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, OS = we("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", oh).replace("tag", kc).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), iv = (a) => we(uh).replace("hr", Ac).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", a).replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", kc).getRegex(), RS = iv(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/), MS = iv(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/), DS = we(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", MS).getRegex(), fh = { blockquote: DS, code: TS, def: kS, fences: jS, heading: wS, hr: Ac, html: OS, lheading: av, list: CS, newline: ES, paragraph: RS, table: Wa, text: AS }, P0 = we("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Ac).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", kc).getRegex(), zS = { ...fh, lheading: _S, table: P0, paragraph: we(uh).replace("hr", Ac).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", P0).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", kc).getRegex() }, LS = { ...fh, html: we(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", oh).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: Wa, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: we(uh).replace("hr", Ac).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", av).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, US = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, HS = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, sv = /^( {2,}|\\)\n(?!\s*$)[ \t]*/, BS = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Bl = /[\p{P}\p{S}]/u, fs = /[\s\p{P}\p{S}]/u, Cc = /[^\s\p{P}\p{S}]/u, qS = we(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, fs).getRegex(), $S = /[\p{Pi}\p{Ps}"']/u, cv = /(?!~)[\p{P}\p{S}]/u, YS = /(?!~)[\s\p{P}\p{S}]/u, GS = /(?:[^\s\p{P}\p{S}]|~)/u, VS = we(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", NS ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), uv = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/, XS = we(uv, "u").replace(/punct/g, Bl).getRegex(), ZS = we(uv, "u").replace(/punct/g, cv).getRegex(), QS = /^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, KS = we(QS, "u").replace(/openQuote/g, $S).replace(/punct/g, Bl).getRegex(), rv = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", IS = we(rv, "gu").replace(/notPunctSpace/g, Cc).replace(/punctSpace/g, fs).replace(/punct/g, Bl).getRegex(), JS = we(rv, "gu").replace(/notPunctSpace/g, GS).replace(/punctSpace/g, YS).replace(/punct/g, cv).getRegex(), FS = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", PS = we(FS, "gu").replace(/notPunctSpace/g, Cc).replace(/punctSpace/g, fs).replace(/punct/g, Bl).getRegex(), WS = we("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Cc).replace(/punctSpace/g, fs).replace(/punct/g, Bl).getRegex(), eN = "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", tN = we(eN, "gu").replace(/notPunctSpace/g, Cc).replace(/punctSpace/g, fs).replace(/punct/g, Bl).getRegex(), nN = we(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, Bl).getRegex(), lN = "^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", aN = we(lN, "gu").replace(/notPunctSpace/g, Cc).replace(/punctSpace/g, fs).replace(/punct/g, Bl).getRegex(), iN = we(/\\(punct)/, "gu").replace(/punct/g, Bl).getRegex(), sN = we(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), cN = we(oh).replace("(?:-->|$)", "-->").getRegex(), uN = we("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", cN).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), ov = /\[(?:\\[\s\S]|[^\[\]\\])*\]/, Nr = we(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets", ov).getRegex(), rN = we(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", Nr).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), oN = we(/^!?\[(label)\]\[(ref)\]/).replace("label", Nr).replace("ref", rh).getRegex(), fN = we(/^!?\[(ref)\](?:\[\])?/).replace("ref", rh).getRegex(), W0 = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/, dN = we(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets", ov).getRegex(), hN = we("reflink|nolink(?!\\()", "g").replace("reflink", we(/^!?\[(label)\]\[(ref)\]/).replace("label", dN).replace("ref", W0).getRegex()).replace("nolink", we(/^!?\[(ref)\](?:\[\])?/).replace("ref", W0).getRegex()).getRegex(), ey = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, dh = { _backpedal: Wa, anyPunctuation: iN, autolink: sN, blockSkip: VS, br: sv, code: HS, del: Wa, delLDelim: Wa, delRDelim: Wa, emStrongLDelim: XS, emStrongRDelimAst: IS, emStrongRDelimUnd: WS, escape: US, link: rN, nolink: fN, punctuation: qS, reflink: oN, reflinkSearch: hN, tag: uN, text: BS, url: Wa }, mN = { ...dh, emStrongLDelim: KS, emStrongRDelimAst: PS, emStrongRDelimUnd: tN, link: we(/^!?\[(label)\]\((.*?)\)/).replace("label", Nr).getRegex(), reflink: we(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Nr).getRegex() }, Ld = { ...dh, emStrongRDelimAst: JS, emStrongLDelim: ZS, delLDelim: nN, delRDelim: aN, url: we(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", ey).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: we(/^(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", ey).getRegex() }, pN = { ...Ld, br: we(sv).replace("{2,}", "*").getRegex(), text: we(Ld.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, rr = { normal: fh, gfm: zS, pedantic: LS }, vc = { normal: dh, gfm: Ld, breaks: pN, pedantic: mN }, gN = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, ty = (a) => gN[a];
function Tn(a, s) {
  if (s) {
    if (Zt.escapeTest.test(a)) return a.replace(Zt.escapeReplace, ty);
  } else if (Zt.escapeTestNoEncode.test(a)) return a.replace(Zt.escapeReplaceNoEncode, ty);
  return a;
}
function ny(a) {
  try {
    a = encodeURI(a).replace(Zt.percentDecode, "%");
  } catch {
    return null;
  }
  return a;
}
function ly(a, s) {
  let r = a.replace(Zt.findPipe, (h, m, g) => {
    let b = !1, x = m;
    for (; --x >= 0 && g[x] === "\\"; ) b = !b;
    return b ? "|" : " |";
  }), o = r.split(Zt.splitPipe), f = 0;
  if (o[0].trim() || o.shift(), o.length > 0 && !o.at(-1)?.trim() && o.pop(), s) if (o.length > s) o.splice(s);
  else for (; o.length < s; ) o.push("");
  for (; f < o.length; f++) o[f] = o[f].trim().replace(Zt.slashPipe, "|");
  return o;
}
function Sa(a, s, r) {
  let o = a.length;
  if (o === 0) return "";
  let f = 0;
  for (; f < o && a.charAt(o - f - 1) === s; )
    f++;
  return a.slice(0, o - f);
}
function ay(a) {
  let s = a.split(`
`), r = s.length - 1;
  for (; r >= 0 && Zt.blankLine.test(s[r]); ) r--;
  return s.length - r <= 2 ? a : s.slice(0, r + 1).join(`
`);
}
function Er(a) {
  return a.toLowerCase().toUpperCase().toLowerCase();
}
function yN(a, s) {
  if (a.indexOf(s[1]) === -1) return -1;
  let r = 0;
  for (let o = 0; o < a.length; o++) if (a[o] === "\\") o++;
  else if (a[o] === s[0]) r++;
  else if (a[o] === s[1] && (r--, r < 0)) return o;
  return r > 0 ? -2 : -1;
}
function vN(a, s = 0) {
  let r = s, o = "";
  for (let f of a) if (f === "	") {
    let h = 4 - r % 4;
    o += " ".repeat(h), r += h;
  } else o += f, r++;
  return o;
}
function iy(a, s, r, o, f) {
  let h = s.href, m = s.title || null, g = a[1].replace(f.other.outputLinkReplace, "$1"), b = a[0].charAt(0) === "!";
  o.state.inLink = !0;
  let x = o.state.linkEmitted, v = o.state.inRawBlock;
  o.state.linkEmitted = !1;
  let p = o.inlineTokens(g), N = o.state.linkEmitted;
  if (o.state.linkEmitted = x, o.state.inLink = !1, !b) {
    if (N) {
      o.state.inRawBlock = v;
      return;
    }
    o.state.linkEmitted = !0;
  }
  return { type: b ? "image" : "link", raw: r, href: h, title: m, text: g, tokens: p };
}
function bN(a, s, r) {
  let o = a.match(r.other.indentCodeCompensation);
  if (o === null) return s;
  let f = o[1];
  return s.split(`
`).map((h) => {
    let m = h.match(r.other.beginningSpace);
    if (m === null) return h;
    let [g] = m;
    return h.slice(Math.min(g.length, f.length));
  }).join(`
`);
}
function sy(a, s, r, o) {
  if (!s.includes("<")) return !1;
  for (let f = 0; f < s.length; f++) {
    if (s[f] === "\\") {
      f++;
      continue;
    }
    if (s[f] === "`") {
      let g = o.inline.code.exec(s.slice(f));
      if (g) {
        f += g[0].length - 1;
        continue;
      }
    }
    if (s[f] !== "<") continue;
    let h = a.slice(r + f), m = o.inline.tag.exec(h) || o.inline.autolink.exec(h);
    if (m) {
      if (m[0].length > s.length - f) return !0;
      f += m[0].length - 1;
    }
  }
  return !1;
}
var Tr = class {
  options;
  rules;
  lexer;
  constructor(a) {
    this.options = a || ai;
  }
  space(a) {
    let s = this.rules.block.newline.exec(a);
    if (s && s[0].length > 0) return { type: "space", raw: s[0] };
  }
  code(a) {
    let s = this.rules.block.code.exec(a);
    if (s) {
      let r = this.options.pedantic ? s[0] : ay(s[0]), o = r.replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: r, codeBlockStyle: "indented", text: o };
    }
  }
  fences(a) {
    let s = this.rules.block.fences.exec(a);
    if (s) {
      let r = s[0], o = bN(r, s[3] || "", this.rules);
      return { type: "code", raw: r, lang: s[2] ? s[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : s[2], text: o };
    }
  }
  heading(a) {
    let s = this.rules.block.heading.exec(a);
    if (s) {
      let r = s[2].trim();
      if (this.rules.other.endingHash.test(r)) {
        let o = Sa(r, "#");
        (this.options.pedantic || !o || this.rules.other.endingSpaceTabChar.test(o)) && (r = o.trim());
      }
      return { type: "heading", raw: Sa(s[0], `
`), depth: s[1].length, text: r, tokens: this.lexer.inline(r) };
    }
  }
  hr(a) {
    let s = this.rules.block.hr.exec(a);
    if (s) return { type: "hr", raw: Sa(s[0], `
`) };
  }
  blockquote(a) {
    let s = this.rules.block.blockquote.exec(a);
    if (s) {
      let r = Sa(s[0], `
`).split(`
`), o = "", f = "", h = [];
      for (; r.length > 0; ) {
        let m = !1, g = [], b;
        for (b = 0; b < r.length; b++) if (this.rules.other.blockquoteStart.test(r[b])) g.push(r[b]), m = !0;
        else if (!m) g.push(r[b]);
        else break;
        r = r.slice(b);
        let x = g.join(`
`), v = x.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        o = o ? `${o}
${x}` : x, f = f ? `${f}
${v}` : v;
        let p = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(v, h, !0), this.lexer.state.top = p, r.length === 0) break;
        let N = h.at(-1);
        if (N?.type === "code") break;
        if (N?.type === "blockquote") {
          let j = N, T = r.join(`
`), U = j.raw + `
` + T.replace(this.rules.other.blockquoteSetextReplace2, ""), k = this.blockquote(U);
          h[h.length - 1] = k, o = `${o}
${T}`, f = f.substring(0, f.length - j.text.length) + k.text;
          break;
        } else if (N?.type === "list") {
          let j = N, T = j.raw + `
` + r.join(`
`), U = this.list(T);
          h[h.length - 1] = U, o = o.substring(0, o.length - N.raw.length) + U.raw, f = f.substring(0, f.length - j.raw.length) + U.raw, r = T.substring(h.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: o, tokens: h, text: f };
    }
  }
  list(a) {
    let s = this.rules.block.list.exec(a);
    if (s) {
      let r = s[1].trim(), o = r.length > 1, f = { type: "list", raw: "", ordered: o, start: o ? +r.slice(0, -1) : "", loose: !1, items: [] };
      r = o ? `\\d{1,9}\\${r.slice(-1)}` : `\\${r}`, this.options.pedantic && (r = o ? r : "[*+-]");
      let h = this.rules.other.listItemRegex(r), m = !1;
      for (; a; ) {
        let b = !1, x = "", v = "";
        if (!(s = h.exec(a)) || this.rules.block.hr.test(a)) break;
        x = s[0], a = a.substring(x.length);
        let p = vN(s[2].split(`
`, 1)[0], s[1].length), N = a.split(`
`, 1)[0], j = !p.trim(), T = 0;
        if (this.options.pedantic ? (T = 2, v = p.trimStart()) : j ? T = s[1].length + 1 : (T = p.search(this.rules.other.nonSpaceChar), T = T > 4 ? 1 : T, v = p.slice(T), T += s[1].length), j && this.rules.other.blankLine.test(N) && (x += N + `
`, a = a.substring(N.length + 1), b = !0), !b) {
          let U = this.rules.other.nextBulletRegex(T), k = this.rules.other.hrRegex(T), K = this.rules.other.fencesBeginRegex(T), X = this.rules.other.headingBeginRegex(T), H = this.rules.other.htmlBeginRegex(T), F = this.rules.other.blockquoteBeginRegex(T);
          for (; a; ) {
            let W = a.split(`
`, 1)[0], $;
            if (N = W, this.options.pedantic ? (N = N.replace(this.rules.other.listReplaceNesting, "  "), $ = N) : $ = N.replace(this.rules.other.tabCharGlobal, "    "), K.test(N) || X.test(N) || H.test(N) || F.test(N) || U.test(N) || k.test(N)) break;
            if ($.search(this.rules.other.nonSpaceChar) >= T || !N.trim()) v += `
` + $.slice(T);
            else {
              if (j || p.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || K.test(p) || X.test(p) || k.test(p)) break;
              v += `
` + N;
            }
            j = !N.trim(), x += W + `
`, a = a.substring(W.length + 1), p = $.slice(T);
          }
        }
        f.loose || (m ? f.loose = !0 : this.rules.other.doubleBlankLine.test(x) && (m = !0)), f.items.push({ type: "list_item", raw: x, task: !!this.options.gfm && this.rules.other.listIsTask.test(v), loose: !1, text: v, tokens: [] }), f.raw += x;
      }
      let g = f.items.at(-1);
      if (g) g.raw = g.raw.trimEnd(), g.text = g.text.trimEnd();
      else return;
      f.raw = f.raw.trimEnd();
      for (let b of f.items) if (this.lexer.state.top = !1, b.tokens = this.lexer.blockTokens(b.text, []), !f.loose) {
        let x = b.tokens.filter((p) => p.type === "space"), v = x.length > 0 && x.some((p) => this.rules.other.anyLine.test(p.raw));
        f.loose = v;
      }
      for (let b of f.items) {
        let x = b.tokens[0];
        if (b.task && (x?.type === "text" || x?.type === "paragraph")) {
          b.text = b.text.replace(this.rules.other.listReplaceTask, ""), x.raw = x.raw.replace(this.rules.other.listReplaceTask, ""), x.text = x.text.replace(this.rules.other.listReplaceTask, "");
          for (let p = this.lexer.inlineQueue.length - 1; p >= 0; p--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)) {
            this.lexer.inlineQueue[p].src = this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask, "");
            break;
          }
          let v = this.rules.other.listTaskCheckbox.exec(b.raw);
          if (v) {
            let p = { type: "checkbox", raw: v[0] + " ", checked: v[0] !== "[ ]" };
            b.checked = p.checked, f.loose ? b.tokens[0] && ["paragraph", "text"].includes(b.tokens[0].type) && "tokens" in b.tokens[0] && b.tokens[0].tokens ? (b.tokens[0].raw = p.raw + b.tokens[0].raw, b.tokens[0].text = p.raw + b.tokens[0].text, b.tokens[0].tokens.unshift(p)) : b.tokens.unshift({ type: "paragraph", raw: p.raw, text: p.raw, tokens: [p] }) : b.tokens.unshift(p);
          }
        } else b.task && (b.task = !1);
      }
      if (f.loose) for (let b of f.items) {
        b.loose = !0;
        for (let x of b.tokens) x.type === "text" && (x.type = "paragraph");
      }
      return f;
    }
  }
  html(a) {
    let s = this.rules.block.html.exec(a);
    if (s) {
      let r = ay(s[0]);
      return { type: "html", block: !0, raw: r, pre: s[1] === "pre" || s[1] === "script" || s[1] === "style", text: r };
    }
  }
  def(a) {
    let s = this.rules.block.def.exec(a);
    if (s) {
      let r = Er(s[1]).replace(this.rules.other.multipleSpaceGlobal, " "), o = s[2] ? s[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", f = s[3] ? s[3].substring(1, s[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : s[3];
      return { type: "def", tag: r, raw: Sa(s[0], `
`), href: o, title: f };
    }
  }
  table(a) {
    let s = this.rules.block.table.exec(a);
    if (!s || !this.rules.other.tableDelimiter.test(s[2])) return;
    let r = ly(s[1]), o = s[2].replace(this.rules.other.tableAlignChars, "").split("|"), f = s[3]?.trim() ? s[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], h = { type: "table", raw: Sa(s[0], `
`), header: [], align: [], rows: [] };
    if (r.length === o.length) {
      for (let m of o) this.rules.other.tableAlignRight.test(m) ? h.align.push("right") : this.rules.other.tableAlignCenter.test(m) ? h.align.push("center") : this.rules.other.tableAlignLeft.test(m) ? h.align.push("left") : h.align.push(null);
      for (let m = 0; m < r.length; m++) h.header.push({ text: r[m], tokens: this.lexer.inline(r[m]), header: !0, align: h.align[m] });
      for (let m of f) h.rows.push(ly(m, h.header.length).map((g, b) => ({ text: g, tokens: this.lexer.inline(g), header: !1, align: h.align[b] })));
      return h;
    }
  }
  lheading(a) {
    let s = this.rules.block.lheading.exec(a);
    if (s) {
      let r = s[1].trim();
      return { type: "heading", raw: Sa(s[0], `
`), depth: s[2].charAt(0) === "=" ? 1 : 2, text: r, tokens: this.lexer.inline(r) };
    }
  }
  paragraph(a) {
    let s = this.rules.block.paragraph.exec(a);
    if (s) {
      let r = s[1].charAt(s[1].length - 1) === `
` ? s[1].slice(0, -1) : s[1];
      return { type: "paragraph", raw: s[0], text: r, tokens: this.lexer.inline(r) };
    }
  }
  text(a) {
    let s = this.rules.block.text.exec(a);
    if (s) return { type: "text", raw: s[0], text: s[0], tokens: this.lexer.inline(s[0]) };
  }
  escape(a) {
    let s = this.rules.inline.escape.exec(a);
    if (s) return { type: "escape", raw: s[0], text: s[1] };
  }
  tag(a) {
    let s = this.rules.inline.tag.exec(a);
    if (s) return !this.lexer.state.inLink && this.rules.other.startATag.test(s[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(s[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(s[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(s[0]) && (this.lexer.state.inRawBlock = !1), { type: "html", raw: s[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: !1, text: s[0] };
  }
  link(a) {
    let s = this.rules.inline.link.exec(a);
    if (s) {
      let r = s[0].charAt(0) === "!" ? 2 : 1;
      if (!this.options.pedantic && sy(a, s[1], r, this.rules)) return;
      let o = s[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(o)) {
        if (!this.rules.other.endAngleBracket.test(o)) return;
        let m = Sa(o.slice(0, -1), "\\");
        if ((o.length - m.length) % 2 === 0) return;
      } else {
        let m = yN(s[2], "()");
        if (m === -2) return;
        if (m > -1) {
          let g = (s[0].indexOf("!") === 0 ? 5 : 4) + s[1].length + m;
          s[2] = s[2].substring(0, m), s[0] = s[0].substring(0, g).trim(), s[3] = "";
        }
      }
      let f = s[2], h = "";
      if (this.options.pedantic) {
        let m = this.rules.other.pedanticHrefTitle.exec(f);
        m && (f = m[1], h = m[3]);
      } else h = s[3] ? s[3].slice(1, -1) : "";
      return f = f.trim(), this.rules.other.startAngleBracket.test(f) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(o) ? f = f.slice(1) : f = f.slice(1, -1)), iy(s, { href: f && f.replace(this.rules.inline.anyPunctuation, "$1"), title: h && h.replace(this.rules.inline.anyPunctuation, "$1") }, s[0], this.lexer, this.rules);
    }
  }
  reflink(a, s) {
    let r;
    if ((r = this.rules.inline.reflink.exec(a)) || (r = this.rules.inline.nolink.exec(a))) {
      let o = r[0].charAt(0) === "!" ? 2 : 1;
      if (!this.options.pedantic && sy(a, r[1], o, this.rules)) return;
      let f = (r[2] || r[1]).replace(this.rules.other.multipleSpaceGlobal, " "), h = s[Er(f)];
      if (!h) {
        let m = r[0].charAt(0);
        return { type: "text", raw: m, text: m };
      }
      return iy(r, h, r[0], this.lexer, this.rules);
    }
  }
  emStrong(a, s, r = "") {
    let o = this.rules.inline.emStrongLDelim.exec(a);
    if (!(!o || !o[1] && !o[2] && !o[3] && !o[4] || o[4] && r.match(this.rules.other.unicodeAlphaNumeric)) && (!(o[1] || o[3]) || !r || this.rules.inline.punctuation.exec(r))) {
      let f = [...o[0]].length - 1, h, m, g = f, b = 0, x = o[0][0], v = r === x, p = x === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (p.lastIndex = 0, s = s.slice(-1 * a.length + f); (o = p.exec(s)) !== null; ) {
        if (h = o[1] || o[2] || o[3] || o[4] || o[5] || o[6], !h) continue;
        if (m = [...h].length, o[3] || o[4]) {
          g += m;
          continue;
        } else if (o[5] || o[6]) {
          if (f % 3 && !((f + m) % 3)) {
            b += m;
            continue;
          }
          if (v) break;
        }
        if (g -= m, g > 0) continue;
        m = Math.min(m, m + g + b);
        let N = [...o[0]][0].length, j = a.slice(0, f + o.index + N + m);
        if (Math.min(f, m) % 2) {
          let U = j.slice(1, -1);
          return { type: "em", raw: j, text: U, tokens: this.lexer.inlineTokens(U) };
        }
        let T = j.slice(2, -2);
        return { type: "strong", raw: j, text: T, tokens: this.lexer.inlineTokens(T) };
      }
    }
  }
  codespan(a) {
    let s = this.rules.inline.code.exec(a);
    if (s) {
      let r = s[2].replace(this.rules.other.newLineCharGlobal, " "), o = this.rules.other.nonSpaceChar.test(r), f = this.rules.other.startingSpaceChar.test(r) && this.rules.other.endingSpaceChar.test(r);
      return o && f && (r = r.substring(1, r.length - 1)), { type: "codespan", raw: s[0], text: r };
    }
  }
  br(a) {
    let s = this.rules.inline.br.exec(a);
    if (s) return { type: "br", raw: s[0] };
  }
  del(a, s, r = "") {
    let o = this.rules.inline.delLDelim.exec(a);
    if (o && (!o[1] || !r || this.rules.inline.punctuation.exec(r))) {
      let f = [...o[0]].length - 1, h, m, g = f, b = this.rules.inline.delRDelim;
      for (b.lastIndex = 0, s = s.slice(-1 * a.length + f); (o = b.exec(s)) !== null; ) {
        if (h = o[1] || o[2] || o[3] || o[4] || o[5] || o[6], !h || (m = [...h].length, m !== f)) continue;
        if (o[3] || o[4]) {
          g += m;
          continue;
        }
        if (g -= m, g > 0) continue;
        m = Math.min(m, m + g);
        let x = [...o[0]][0].length, v = a.slice(0, f + o.index + x + m), p = v.slice(f, -f);
        return { type: "del", raw: v, text: p, tokens: this.lexer.inlineTokens(p) };
      }
    }
  }
  autolink(a) {
    let s = this.rules.inline.autolink.exec(a);
    if (s) {
      let r, o;
      return s[2] === "@" ? (r = s[1], o = "mailto:" + r) : (r = s[1], o = r), { type: "link", raw: s[0], text: r, href: o, autolink: !0, tokens: [{ type: "text", raw: r, text: r }] };
    }
  }
  url(a) {
    let s;
    if (s = this.rules.inline.url.exec(a)) {
      let r, o;
      if (s[2] === "@") r = s[0], o = "mailto:" + r;
      else {
        let f;
        do
          f = s[0], s[0] = this.rules.inline._backpedal.exec(s[0])?.[0] ?? "";
        while (f !== s[0]);
        r = s[0], s[1] === "www." ? o = "http://" + s[0] : o = s[0];
      }
      return { type: "link", raw: s[0], text: r, href: o, autolink: !0, tokens: [{ type: "text", raw: r, text: r }] };
    }
  }
  inlineText(a) {
    let s = this.rules.inline.text.exec(a);
    if (s) {
      let r = this.lexer.state.inRawBlock;
      return { type: "text", raw: s[0], text: s[0], escaped: r };
    }
  }
}, Kn = class Ud {
  tokens;
  options;
  state;
  inlineQueue;
  tokenizer;
  constructor(s) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = s || ai, this.options.tokenizer = this.options.tokenizer || new Tr(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, linkEmitted: !1, top: !0 };
    let r = { other: Zt, block: rr.normal, inline: vc.normal };
    this.options.pedantic ? (r.block = rr.pedantic, r.inline = vc.pedantic) : this.options.gfm && (r.block = rr.gfm, this.options.breaks ? r.inline = vc.breaks : r.inline = vc.gfm), this.tokenizer.rules = r;
  }
  static get rules() {
    return { block: rr, inline: vc };
  }
  static lex(s, r) {
    return new Ud(r).lex(s);
  }
  static lexInline(s, r) {
    return new Ud(r).inlineTokens(s);
  }
  lex(s) {
    s = s.replace(Zt.carriageReturn, `
`), this.blockTokens(s, this.tokens);
    for (let r = 0; r < this.inlineQueue.length; r++) {
      let o = this.inlineQueue[r];
      this.inlineTokens(o.src, o.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(s, r = [], o = !1) {
    this.tokenizer.lexer = this, this.options.pedantic && (s = s.replace(Zt.tabCharGlobal, "    ").replace(Zt.spaceLine, ""));
    let f = 1 / 0;
    for (; s; ) {
      if (s.length < f) f = s.length;
      else {
        this.infiniteLoopError(s.charCodeAt(0));
        break;
      }
      let h;
      if (this.options.extensions?.block?.some((g) => (h = g.call({ lexer: this }, s, r)) ? (s = s.substring(h.raw.length), r.push(h), !0) : !1)) continue;
      if (h = this.tokenizer.space(s)) {
        s = s.substring(h.raw.length);
        let g = r.at(-1);
        h.raw.length === 1 && g !== void 0 ? g.raw += `
` : r.push(h);
        continue;
      }
      if (h = this.tokenizer.code(s)) {
        s = s.substring(h.raw.length);
        let g = r.at(-1);
        g?.type === "paragraph" || g?.type === "text" ? (g.raw += (g.raw.endsWith(`
`) ? "" : `
`) + h.raw, g.text += `
` + h.text, this.inlineQueue.at(-1).src = g.text) : r.push(h);
        continue;
      }
      if (h = this.tokenizer.fences(s)) {
        s = s.substring(h.raw.length), r.push(h);
        continue;
      }
      if (h = this.tokenizer.heading(s)) {
        s = s.substring(h.raw.length), r.push(h);
        continue;
      }
      if (h = this.tokenizer.hr(s)) {
        s = s.substring(h.raw.length), r.push(h);
        continue;
      }
      if (h = this.tokenizer.blockquote(s)) {
        s = s.substring(h.raw.length), r.push(h);
        continue;
      }
      if (h = this.tokenizer.list(s)) {
        s = s.substring(h.raw.length), r.push(h);
        continue;
      }
      if (h = this.tokenizer.html(s)) {
        s = s.substring(h.raw.length), r.push(h);
        continue;
      }
      if (h = this.tokenizer.def(s)) {
        s = s.substring(h.raw.length);
        let g = r.at(-1);
        g?.type === "paragraph" || g?.type === "text" ? (g.raw += (g.raw.endsWith(`
`) ? "" : `
`) + h.raw, g.text += `
` + h.raw, this.inlineQueue.at(-1).src = g.text) : this.tokens.links[h.tag] || (this.tokens.links[h.tag] = { href: h.href, title: h.title }, r.push(h));
        continue;
      }
      if (h = this.tokenizer.table(s)) {
        s = s.substring(h.raw.length), r.push(h);
        continue;
      }
      if (h = this.tokenizer.lheading(s)) {
        s = s.substring(h.raw.length), r.push(h);
        continue;
      }
      let m = s;
      if (this.options.extensions?.startBlock) {
        let g = 1 / 0, b = s.slice(1), x;
        this.options.extensions.startBlock.forEach((v) => {
          x = v.call({ lexer: this }, b), typeof x == "number" && x >= 0 && (g = Math.min(g, x));
        }), g < 1 / 0 && g >= 0 && (m = s.substring(0, g + 1));
      }
      if (this.state.top && (h = this.tokenizer.paragraph(m))) {
        let g = r.at(-1);
        o && g?.type === "paragraph" ? (g.raw += (g.raw.endsWith(`
`) ? "" : `
`) + h.raw, g.text += `
` + h.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = g.text) : r.push(h), o = m.length !== s.length, s = s.substring(h.raw.length);
        continue;
      }
      if (h = this.tokenizer.text(s)) {
        s = s.substring(h.raw.length);
        let g = r.at(-1);
        g?.type === "text" ? (g.raw += (g.raw.endsWith(`
`) ? "" : `
`) + h.raw, g.text += `
` + h.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = g.text) : r.push(h);
        continue;
      }
      if (s) {
        this.infiniteLoopError(s.charCodeAt(0));
        break;
      }
    }
    return this.state.top = !0, r;
  }
  inline(s, r = []) {
    return this.inlineQueue.push({ src: s, tokens: r }), r;
  }
  linkInText(s) {
    if (!s.includes("[")) return !1;
    let r = this.tokenizer.rules.inline.link;
    for (let o of s.matchAll(this.tokenizer.rules.inline.blockSkip)) if (r.test(o[0]) && s.charAt(o.index - 1) !== "!") return !0;
    for (let o of s.matchAll(this.tokenizer.rules.inline.reflinkSearch)) {
      let f = o[0], h = f.lastIndexOf("[");
      if (!(f.charAt(0) === "!" || !Object.hasOwn(this.tokens.links, Er(f.slice(h + 1, -1)))) && !(h > 1 && this.linkInText(f.slice(1, h - 1)))) return !0;
    }
    return !1;
  }
  inlineTokens(s, r = []) {
    this.tokenizer.lexer = this;
    let o = s;
    if (this.tokens.links && s.includes("[")) {
      let g = this.tokenizer.rules.inline.reflinkSearch, b = (x) => {
        let v = x.lastIndexOf("[");
        if (!Object.hasOwn(this.tokens.links, Er(x.slice(v + 1, -1)))) return x;
        if (v > 1 && x.charAt(0) !== "!") {
          let p = x.slice(1, v - 1);
          if (this.linkInText(p)) return "[" + p.replace(g, b) + "][" + "a".repeat(x.length - v - 2) + "]";
        }
        return "[" + "a".repeat(x.length - 2) + "]";
      };
      o = o.replace(g, b);
    }
    o = o.replace(this.tokenizer.rules.inline.anyPunctuation, (g) => "+".repeat(g.length)), o = o.replace(this.tokenizer.rules.inline.blockSkip, (g, b, x) => {
      let v = x ? x.length : 0;
      return g.slice(0, v) + "[" + "a".repeat(g.length - v - 2) + "]";
    }), o = this.options.hooks?.emStrongMask?.call({ lexer: this }, o) ?? o;
    let f = !1, h = "", m = 1 / 0;
    for (; s; ) {
      if (s.length < m) m = s.length;
      else {
        this.infiniteLoopError(s.charCodeAt(0));
        break;
      }
      f || (h = ""), f = !1;
      let g;
      if (this.options.extensions?.inline?.some((x) => (g = x.call({ lexer: this }, s, r)) ? (s = s.substring(g.raw.length), r.push(g), !0) : !1)) continue;
      if (g = this.tokenizer.escape(s)) {
        s = s.substring(g.raw.length), r.push(g);
        continue;
      }
      if (g = this.tokenizer.tag(s)) {
        s = s.substring(g.raw.length), r.push(g);
        continue;
      }
      if (g = this.tokenizer.link(s)) {
        s = s.substring(g.raw.length), r.push(g);
        continue;
      }
      if (g = this.tokenizer.reflink(s, this.tokens.links)) {
        s = s.substring(g.raw.length);
        let x = r.at(-1);
        g.type === "text" && x?.type === "text" ? (x.raw += g.raw, x.text += g.text) : r.push(g);
        continue;
      }
      if (g = this.tokenizer.emStrong(s, o, h)) {
        s = s.substring(g.raw.length), r.push(g);
        continue;
      }
      if (g = this.tokenizer.codespan(s)) {
        s = s.substring(g.raw.length), r.push(g);
        continue;
      }
      if (g = this.tokenizer.br(s)) {
        s = s.substring(g.raw.length), r.push(g);
        continue;
      }
      if (g = this.tokenizer.del(s, o, h)) {
        s = s.substring(g.raw.length), r.push(g);
        continue;
      }
      if (g = this.tokenizer.autolink(s)) {
        s = s.substring(g.raw.length), r.push(g);
        continue;
      }
      if (!this.state.inLink && (g = this.tokenizer.url(s))) {
        s = s.substring(g.raw.length), r.push(g);
        continue;
      }
      let b = s;
      if (this.options.extensions?.startInline) {
        let x = 1 / 0, v = s.slice(1), p;
        this.options.extensions.startInline.forEach((N) => {
          p = N.call({ lexer: this }, v), typeof p == "number" && p >= 0 && (x = Math.min(x, p));
        }), x < 1 / 0 && x >= 0 && (b = s.substring(0, x + 1));
      }
      if (g = this.tokenizer.inlineText(b)) {
        s = s.substring(g.raw.length), g.raw.slice(-1) !== "_" && (h = g.raw.slice(-1)), f = !0;
        let x = r.at(-1);
        x?.type === "text" ? (x.raw += g.raw, x.text += g.text) : r.push(g);
        continue;
      }
      if (s) {
        this.infiniteLoopError(s.charCodeAt(0));
        break;
      }
    }
    return r;
  }
  infiniteLoopError(s) {
    let r = "Infinite loop on byte: " + s;
    if (this.options.silent) console.error(r);
    else throw new Error(r);
  }
}, jr = class {
  options;
  parser;
  constructor(a) {
    this.options = a || ai;
  }
  space(a) {
    return "";
  }
  code({ text: a, lang: s, escaped: r }) {
    let o = (s || "").match(Zt.notSpaceStart)?.[0], f = a ? a.replace(Zt.endingNewline, "") + `
` : "";
    return o ? '<pre><code class="language-' + Tn(o) + '">' + (r ? f : Tn(f, !0)) + `</code></pre>
` : "<pre><code>" + (r ? f : Tn(f, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: a }) {
    return `<blockquote>
${this.parser.parse(a)}</blockquote>
`;
  }
  html({ text: a }) {
    return a;
  }
  def(a) {
    return "";
  }
  heading({ tokens: a, depth: s }) {
    return `<h${s}>${this.parser.parseInline(a)}</h${s}>
`;
  }
  hr(a) {
    return `<hr>
`;
  }
  list(a) {
    let s = a.ordered, r = a.start, o = "";
    for (let m = 0; m < a.items.length; m++) {
      let g = a.items[m];
      o += this.listitem(g);
    }
    let f = s ? "ol" : "ul", h = s && r !== 1 ? ' start="' + r + '"' : "";
    return "<" + f + h + `>
` + o + "</" + f + `>
`;
  }
  listitem(a) {
    return `<li>${this.parser.parse(a.tokens)}</li>
`;
  }
  checkbox({ checked: a }) {
    return "<input " + (a ? 'checked="" ' : "") + 'disabled="" type="checkbox"> ';
  }
  paragraph({ tokens: a }) {
    return `<p>${this.parser.parseInline(a)}</p>
`;
  }
  table(a) {
    let s = "", r = "";
    for (let f = 0; f < a.header.length; f++) r += this.tablecell(a.header[f]);
    s += this.tablerow({ text: r });
    let o = "";
    for (let f = 0; f < a.rows.length; f++) {
      let h = a.rows[f];
      r = "";
      for (let m = 0; m < h.length; m++) r += this.tablecell(h[m]);
      o += this.tablerow({ text: r });
    }
    return o && (o = `<tbody>${o}</tbody>`), `<table>
<thead>
` + s + `</thead>
` + o + `</table>
`;
  }
  tablerow({ text: a }) {
    return `<tr>
${a}</tr>
`;
  }
  tablecell(a) {
    let s = this.parser.parseInline(a.tokens), r = a.header ? "th" : "td";
    return (a.align ? `<${r} align="${a.align}">` : `<${r}>`) + s + `</${r}>
`;
  }
  strong({ tokens: a }) {
    return `<strong>${this.parser.parseInline(a)}</strong>`;
  }
  em({ tokens: a }) {
    return `<em>${this.parser.parseInline(a)}</em>`;
  }
  codespan({ text: a }) {
    return `<code>${Tn(a, !0)}</code>`;
  }
  br(a) {
    return "<br>";
  }
  del({ tokens: a }) {
    return `<del>${this.parser.parseInline(a)}</del>`;
  }
  link({ href: a, title: s, text: r, tokens: o, autolink: f }) {
    let h = f ? Tn(r, !0) : this.parser.parseInline(o), m = ny(a);
    if (m === null) return h;
    a = Tn(m, f);
    let g = '<a href="' + a + '"';
    return s && (g += ' title="' + Tn(s) + '"'), g += ">" + h + "</a>", g;
  }
  image({ href: a, title: s, text: r, tokens: o }) {
    o && (r = this.parser.parseInline(o, this.parser.textRenderer));
    let f = ny(a);
    if (f === null) return Tn(r);
    a = f;
    let h = `<img src="${Tn(a)}" alt="${Tn(r)}"`;
    return s && (h += ` title="${Tn(s)}"`), h += ">", h;
  }
  text(a) {
    return "tokens" in a && a.tokens ? this.parser.parseInline(a.tokens) : "escaped" in a && a.escaped ? a.text : Tn(a.text);
  }
}, hh = class {
  strong({ text: a }) {
    return a;
  }
  em({ text: a }) {
    return a;
  }
  codespan({ text: a }) {
    return a;
  }
  del({ text: a }) {
    return a;
  }
  html({ text: a }) {
    return a;
  }
  text({ text: a }) {
    return a;
  }
  link({ text: a }) {
    return "" + a;
  }
  image({ text: a }) {
    return "" + a;
  }
  br() {
    return "";
  }
  checkbox({ raw: a }) {
    return a;
  }
}, In = class Hd {
  options;
  renderer;
  textRenderer;
  constructor(s) {
    this.options = s || ai, this.options.renderer = this.options.renderer || new jr(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new hh();
  }
  static parse(s, r) {
    return new Hd(r).parse(s);
  }
  static parseInline(s, r) {
    return new Hd(r).parseInline(s);
  }
  parse(s) {
    this.renderer.parser = this;
    let r = "";
    for (let o = 0; o < s.length; o++) {
      let f = s[o];
      if (this.options.extensions?.renderers?.[f.type]) {
        let m = f, g = this.options.extensions.renderers[m.type].call({ parser: this }, m);
        if (g !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "checkbox", "html", "def", "paragraph", "text"].includes(m.type)) {
          r += g || "";
          continue;
        }
      }
      let h = f;
      switch (h.type) {
        case "space": {
          r += this.renderer.space(h);
          break;
        }
        case "hr": {
          r += this.renderer.hr(h);
          break;
        }
        case "heading": {
          r += this.renderer.heading(h);
          break;
        }
        case "code": {
          r += this.renderer.code(h);
          break;
        }
        case "table": {
          r += this.renderer.table(h);
          break;
        }
        case "blockquote": {
          r += this.renderer.blockquote(h);
          break;
        }
        case "list": {
          r += this.renderer.list(h);
          break;
        }
        case "checkbox": {
          r += this.renderer.checkbox(h);
          break;
        }
        case "html": {
          r += this.renderer.html(h);
          break;
        }
        case "def": {
          r += this.renderer.def(h);
          break;
        }
        case "paragraph": {
          r += this.renderer.paragraph(h);
          break;
        }
        case "text": {
          r += this.renderer.text(h);
          break;
        }
        default: {
          let m = 'Token with "' + h.type + '" type was not found.';
          if (this.options.silent) return console.error(m), "";
          throw new Error(m);
        }
      }
    }
    return r;
  }
  parseInline(s, r = this.renderer) {
    this.renderer.parser = this;
    let o = "";
    for (let f = 0; f < s.length; f++) {
      let h = s[f];
      if (this.options.extensions?.renderers?.[h.type]) {
        let g = this.options.extensions.renderers[h.type].call({ parser: this }, h);
        if (g !== !1 || !["escape", "html", "link", "image", "checkbox", "strong", "em", "codespan", "br", "del", "text"].includes(h.type)) {
          o += g || "";
          continue;
        }
      }
      let m = h;
      switch (m.type) {
        case "escape": {
          o += r.text(m);
          break;
        }
        case "html": {
          o += r.html(m);
          break;
        }
        case "link": {
          o += r.link(m);
          break;
        }
        case "image": {
          o += r.image(m);
          break;
        }
        case "checkbox": {
          o += r.checkbox(m);
          break;
        }
        case "strong": {
          o += r.strong(m);
          break;
        }
        case "em": {
          o += r.em(m);
          break;
        }
        case "codespan": {
          o += r.codespan(m);
          break;
        }
        case "br": {
          o += r.br(m);
          break;
        }
        case "del": {
          o += r.del(m);
          break;
        }
        case "text": {
          o += r.text(m);
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
}, Nc = class {
  options;
  block;
  constructor(a) {
    this.options = a || ai;
  }
  static passThroughHooks = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"]);
  static passThroughHooksRespectAsync = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"]);
  preprocess(a) {
    return a;
  }
  postprocess(a) {
    return a;
  }
  processAllTokens(a) {
    return a;
  }
  emStrongMask(a) {
    return a;
  }
  provideLexer(a = this.block) {
    return a ? Kn.lex : Kn.lexInline;
  }
  provideParser(a = this.block) {
    return a ? In.parse : In.parseInline;
  }
}, xN = class {
  defaults = sh();
  options = this.setOptions;
  parse = this.parseMarkdown(!0);
  parseInline = this.parseMarkdown(!1);
  Parser = In;
  Renderer = jr;
  TextRenderer = hh;
  Lexer = Kn;
  Tokenizer = Tr;
  Hooks = Nc;
  constructor(...a) {
    this.use(...a);
  }
  walkTokens(a, s) {
    let r = [];
    for (let o of a) switch (r = r.concat(s.call(this, o)), o.type) {
      case "table": {
        let f = o;
        for (let h of f.header) r = r.concat(this.walkTokens(h.tokens, s));
        for (let h of f.rows) for (let m of h) r = r.concat(this.walkTokens(m.tokens, s));
        break;
      }
      case "list": {
        let f = o;
        r = r.concat(this.walkTokens(f.items, s));
        break;
      }
      default: {
        let f = o;
        this.defaults.extensions?.childTokens?.[f.type] ? this.defaults.extensions.childTokens[f.type].forEach((h) => {
          let m = f[h].flat(1 / 0);
          r = r.concat(this.walkTokens(m, s));
        }) : f.tokens && (r = r.concat(this.walkTokens(f.tokens, s)));
      }
    }
    return r;
  }
  use(...a) {
    let s = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return a.forEach((r) => {
      let o = { ...r };
      if (o.async = this.defaults.async || o.async || !1, r.extensions && (r.extensions.forEach((f) => {
        if (!f.name) throw new Error("extension name required");
        if ("renderer" in f) {
          let h = s.renderers[f.name];
          h ? s.renderers[f.name] = function(...m) {
            let g = f.renderer.apply(this, m);
            return g === !1 && (g = h.apply(this, m)), g;
          } : s.renderers[f.name] = f.renderer;
        }
        if ("tokenizer" in f) {
          if (!f.level || f.level !== "block" && f.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let h = s[f.level];
          h ? h.unshift(f.tokenizer) : s[f.level] = [f.tokenizer], f.start && (f.level === "block" ? s.startBlock ? s.startBlock.push(f.start) : s.startBlock = [f.start] : f.level === "inline" && (s.startInline ? s.startInline.push(f.start) : s.startInline = [f.start]));
        }
        "childTokens" in f && f.childTokens && (s.childTokens[f.name] = f.childTokens);
      }), o.extensions = s), r.renderer) {
        let f = this.defaults.renderer || new jr(this.defaults);
        for (let h in r.renderer) {
          if (!(h in f)) throw new Error(`renderer '${h}' does not exist`);
          if (["options", "parser"].includes(h)) continue;
          let m = h, g = r.renderer[m], b = f[m];
          f[m] = (...x) => {
            let v = g.apply(f, x);
            return v === !1 && (v = b.apply(f, x)), v || "";
          };
        }
        o.renderer = f;
      }
      if (r.tokenizer) {
        let f = this.defaults.tokenizer || new Tr(this.defaults);
        for (let h in r.tokenizer) {
          if (!(h in f)) throw new Error(`tokenizer '${h}' does not exist`);
          if (["options", "rules", "lexer"].includes(h)) continue;
          let m = h, g = r.tokenizer[m], b = f[m];
          f[m] = (...x) => {
            let v = g.apply(f, x);
            return v === !1 && (v = b.apply(f, x)), v;
          };
        }
        o.tokenizer = f;
      }
      if (r.hooks) {
        let f = this.defaults.hooks || new Nc();
        for (let h in r.hooks) {
          if (!(h in f)) throw new Error(`hook '${h}' does not exist`);
          if (["options", "block"].includes(h)) continue;
          let m = h, g = r.hooks[m], b = f[m];
          Nc.passThroughHooks.has(h) ? f[m] = (x) => {
            if (this.defaults.async && Nc.passThroughHooksRespectAsync.has(h)) return (async () => {
              let p = await g.call(f, x);
              return b.call(f, p);
            })();
            let v = g.call(f, x);
            return b.call(f, v);
          } : f[m] = (...x) => {
            if (this.defaults.async) return (async () => {
              let p = await g.apply(f, x);
              return p === !1 && (p = await b.apply(f, x)), p;
            })();
            let v = g.apply(f, x);
            return v === !1 && (v = b.apply(f, x)), v;
          };
        }
        o.hooks = f;
      }
      if (r.walkTokens) {
        let f = this.defaults.walkTokens, h = r.walkTokens;
        o.walkTokens = function(m) {
          let g = [];
          return g.push(h.call(this, m)), f && (g = g.concat(f.call(this, m))), g;
        };
      }
      this.defaults = { ...this.defaults, ...o };
    }), this;
  }
  setOptions(a) {
    return this.defaults = { ...this.defaults, ...a }, this;
  }
  lexer(a, s) {
    return Kn.lex(a, s ?? this.defaults);
  }
  parser(a, s) {
    return In.parse(a, s ?? this.defaults);
  }
  parseMarkdown(a) {
    return (s, r) => {
      let o = { ...r }, f = { ...this.defaults, ...o }, h = this.onError(!!f.silent, !!f.async);
      if (this.defaults.async === !0 && o.async === !1) return h(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof s > "u" || s === null) return h(new Error("marked(): input parameter is undefined or null"));
      if (typeof s != "string") return h(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(s) + ", string expected"));
      if (f.hooks && (f.hooks.options = f, f.hooks.block = a), f.async) return (async () => {
        let m = f.hooks ? await f.hooks.preprocess(s) : s, g = await (f.hooks ? await f.hooks.provideLexer(a) : a ? Kn.lex : Kn.lexInline)(m, f), b = f.hooks ? await f.hooks.processAllTokens(g) : g;
        f.walkTokens && await Promise.all(this.walkTokens(b, f.walkTokens));
        let x = await (f.hooks ? await f.hooks.provideParser(a) : a ? In.parse : In.parseInline)(b, f);
        return f.hooks ? await f.hooks.postprocess(x) : x;
      })().catch(h);
      try {
        f.hooks && (s = f.hooks.preprocess(s));
        let m = (f.hooks ? f.hooks.provideLexer(a) : a ? Kn.lex : Kn.lexInline)(s, f);
        f.hooks && (m = f.hooks.processAllTokens(m)), f.walkTokens && this.walkTokens(m, f.walkTokens);
        let g = (f.hooks ? f.hooks.provideParser(a) : a ? In.parse : In.parseInline)(m, f);
        return f.hooks && (g = f.hooks.postprocess(g)), g;
      } catch (m) {
        return h(m);
      }
    };
  }
  onError(a, s) {
    return (r) => {
      if (r.message += `
Please report this to https://github.com/markedjs/marked.`, a) {
        let o = "<p>An error occurred:</p><pre>" + Tn(r.message + "", !0) + "</pre>";
        return s ? Promise.resolve(o) : o;
      }
      if (s) return Promise.reject(r);
      throw r;
    };
  }
}, ti = new xN();
function Ie(a, s) {
  return ti.parse(a, s);
}
Ie.options = Ie.setOptions = function(a) {
  return ti.setOptions(a), Ie.defaults = ti.defaults, nv(Ie.defaults), Ie;
};
Ie.getDefaults = sh;
Ie.defaults = ai;
function SN(...a) {
  return ti.use(...a), Ie.defaults = ti.defaults, nv(Ie.defaults), Ie;
}
Ie.use = SN;
Ie.walkTokens = function(a, s) {
  return ti.walkTokens(a, s);
};
Ie.parseInline = ti.parseInline;
Ie.Parser = In;
Ie.parser = In.parse;
Ie.Renderer = jr;
Ie.TextRenderer = hh;
Ie.Lexer = Kn;
Ie.lexer = Kn.lex;
Ie.Tokenizer = Tr;
Ie.Hooks = Nc;
Ie.parse = Ie;
Ie.options;
Ie.setOptions;
Ie.walkTokens;
Ie.parseInline;
In.parse;
Kn.lex;
Ie.setOptions({ breaks: !0, gfm: !0 });
tv.addHook("afterSanitizeAttributes", (a) => {
  a.tagName === "A" && a.hasAttribute("href") && (a.setAttribute("target", "_blank"), a.setAttribute("rel", "noopener noreferrer"));
});
function mh(a) {
  const s = Ie.parse(String(a ?? ""), { async: !1 });
  return tv.sanitize(s, { USE_PROFILES: { html: !0 } });
}
var NN = Object.defineProperty, ds = (a, s) => NN(a, "name", { value: s, configurable: !0 }), fv = !!(typeof window < "u" && window.document && window.document.createElement);
function Na(a, s, { checkForDefaultPrevented: r = !0 } = {}) {
  return /* @__PURE__ */ ds(function(f) {
    if (a?.(f), r === !1 || !f || !f.defaultPrevented)
      return s?.(f);
  }, "handleEvent");
}
ds(Na, "composeEventHandlers");
function EN(a) {
  if (!fv)
    throw new Error("Cannot access window outside of the DOM");
  return a?.ownerDocument?.defaultView ?? window;
}
ds(EN, "getOwnerWindow");
function Bd(a) {
  if (!fv)
    throw new Error("Cannot access document outside of the DOM");
  return a?.ownerDocument ?? document;
}
ds(Bd, "getOwnerDocument");
function dv(a, s = !1) {
  const { activeElement: r } = Bd(a);
  if (!r?.nodeName)
    return null;
  if (hv(r) && r.contentDocument)
    return dv(r.contentDocument.body, s);
  if (s) {
    const o = r.getAttribute("aria-activedescendant");
    if (o) {
      const f = Bd(r).getElementById(o);
      if (f)
        return f;
    }
  }
  return r;
}
ds(dv, "getActiveElement");
function hv(a) {
  return a.tagName === "IFRAME";
}
ds(hv, "isFrame");
var TN = Object.defineProperty, ph = (a, s) => TN(a, "name", { value: s, configurable: !0 });
function qd(a, s) {
  if (typeof a == "function")
    return a(s);
  a != null && (a.current = s);
}
ph(qd, "setRef");
function mv(...a) {
  return (s) => {
    let r = !1;
    const o = a.map((f) => {
      const h = qd(f, s);
      return !r && typeof h == "function" && (r = !0), h;
    });
    if (r)
      return () => {
        for (let f = 0; f < o.length; f++) {
          const h = o[f];
          typeof h == "function" ? h() : qd(a[f], null);
        }
      };
  };
}
ph(mv, "composeRefs");
function hs(...a) {
  return S.useCallback(mv(...a), a);
}
ph(hs, "useComposedRefs");
var jN = Object.defineProperty, Un = (a, s) => jN(a, "name", { value: s, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function wN(a, s) {
  const r = S.createContext(s);
  r.displayName = a + "Context";
  const o = /* @__PURE__ */ Un((h) => {
    const { children: m, ...g } = h, b = S.useMemo(() => g, Object.values(g));
    return /* @__PURE__ */ u.jsx(r.Provider, { value: b, children: m });
  }, "Provider");
  o.displayName = a + "Provider";
  function f(h, m = {}) {
    const { optional: g = !1 } = m, b = S.useContext(r);
    if (b) return b;
    if (s !== void 0) return s;
    if (!g)
      throw new Error(`\`${h}\` must be used within \`${a}\``);
  }
  return Un(f, "useContext"), [o, f];
}
Un(wN, "createContext");
// @__NO_SIDE_EFFECTS__
function pv(a, s = []) {
  let r = [];
  function o(h, m) {
    const g = S.createContext(m);
    g.displayName = h + "Context";
    const b = r.length;
    r = [...r, m];
    const x = /* @__PURE__ */ Un((p) => {
      const { scope: N, children: j, ...T } = p, U = N?.[a]?.[b] || g, k = S.useMemo(() => T, Object.values(T));
      return /* @__PURE__ */ u.jsx(U.Provider, { value: k, children: j });
    }, "Provider");
    x.displayName = h + "Provider";
    function v(p, N, j = {}) {
      const { optional: T = !1 } = j, U = N?.[a]?.[b] || g, k = S.useContext(U);
      if (k) return k;
      if (m !== void 0) return m;
      if (!T)
        throw new Error(`\`${p}\` must be used within \`${h}\``);
    }
    return Un(v, "useContext"), [x, v];
  }
  Un(o, "createContext");
  const f = /* @__PURE__ */ Un(() => {
    const h = r.map((m) => S.createContext(m));
    return /* @__PURE__ */ Un(function(g) {
      const b = g?.[a] || h;
      return S.useMemo(
        () => ({ [`__scope${a}`]: { ...g, [a]: b } }),
        [g, b]
      );
    }, "useScope");
  }, "createScope");
  return f.scopeName = a, [o, gv(f, ...s)];
}
Un(pv, "createContextScope");
function gv(...a) {
  const s = a[0];
  if (a.length === 1) return s;
  const r = /* @__PURE__ */ Un(() => {
    const o = a.map((f) => ({
      useScope: f(),
      scopeName: f.scopeName
    }));
    return /* @__PURE__ */ Un(function(h) {
      const m = o.reduce((g, { useScope: b, scopeName: x }) => {
        const p = b(h)[`__scope${x}`];
        return { ...g, ...p };
      }, {});
      return S.useMemo(() => ({ [`__scope${s.scopeName}`]: m }), [m]);
    }, "useComposedScopes");
  }, "createScope");
  return r.scopeName = s.scopeName, r;
}
Un(gv, "composeContextScopes");
var ni = globalThis?.document ? S.useLayoutEffect : () => {
}, _N = Object.defineProperty, AN = (a, s) => _N(a, "name", { value: s, configurable: !0 }), kN = wc[" useId ".trim().toString()] || (() => {
}), CN = 0;
function br(a) {
  const [s, r] = S.useState(kN());
  return ni(() => {
    a || r((o) => o ?? String(CN++));
  }, [a]), a || (s ? `radix-${s}` : "");
}
AN(br, "useId");
var ON = Object.defineProperty, RN = (a, s) => ON(a, "name", { value: s, configurable: !0 }), cy = wc[" useEffectEvent ".trim().toString()], uy = wc[" useInsertionEffect ".trim().toString()];
function yv(a) {
  if (typeof cy == "function")
    return cy(a);
  const s = S.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  return typeof uy == "function" ? uy(() => {
    s.current = a;
  }) : ni(() => {
    s.current = a;
  }), S.useMemo(() => ((...r) => s.current?.(...r)), []);
}
RN(yv, "useEffectEvent");
var MN = Object.defineProperty, Oc = (a, s) => MN(a, "name", { value: s, configurable: !0 }), DN = wc[" useInsertionEffect ".trim().toString()] || ni;
function vv({
  prop: a,
  defaultProp: s,
  onChange: r = /* @__PURE__ */ Oc(() => {
  }, "onChange"),
  caller: o
}) {
  const [f, h, m] = bv({
    defaultProp: s,
    onChange: r
  }), g = a !== void 0, b = g ? a : f, x = S.useCallback(
    (v) => {
      if (g) {
        const p = xv(v) ? v(a) : v;
        p !== a && m.current?.(p);
      } else
        h(v);
    },
    [g, a, h, m]
  );
  return [b, x];
}
Oc(vv, "useControllableState");
function bv({
  defaultProp: a,
  onChange: s
}) {
  const [r, o] = S.useState(a), f = S.useRef(r), h = S.useRef(s);
  return DN(() => {
    h.current = s;
  }, [s]), S.useEffect(() => {
    f.current !== r && (h.current?.(r), f.current = r);
  }, [r, f]), [r, o, h];
}
Oc(bv, "useUncontrolledState");
function xv(a) {
  return typeof a == "function";
}
Oc(xv, "isFunction");
var ry = Symbol("RADIX:SYNC_STATE");
function zN(a, s, r, o) {
  const { prop: f, defaultProp: h, onChange: m, caller: g } = s, b = f !== void 0, x = yv(m), v = [{ ...r, state: h }];
  o && v.push(o);
  const [p, N] = S.useReducer(
    (k, K) => {
      if (K.type === ry)
        return { ...k, state: K.state };
      const X = a(k, K);
      return b && !Object.is(X.state, k.state) && x(X.state), X;
    },
    ...v
  ), j = p.state, T = S.useRef(j);
  S.useEffect(() => {
    T.current !== j && (T.current = j, b || x(j));
  }, [j, T, b]);
  const U = S.useMemo(() => f !== void 0 ? { ...p, state: f } : p, [p, f]);
  return S.useEffect(() => {
    b && !Object.is(f, p.state) && N({ type: ry, state: f });
  }, [f, p.state, b]), [U, N];
}
Oc(zN, "useControllableStateReducer");
var Sv = zy(), LN = Object.defineProperty, Jn = (a, s) => LN(a, "name", { value: s, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function gh(a) {
  const s = S.forwardRef((r, o) => {
    let { children: f, ...h } = r, m = null, g = !1;
    const b = [];
    $d(f) && typeof or == "function" && (f = or(f._payload)), S.Children.forEach(f, (N) => {
      if (jv(N)) {
        g = !0;
        const j = N;
        let T = "child" in j.props ? j.props.child : j.props.children;
        $d(T) && typeof or == "function" && (T = or(T._payload)), m = HN(j, T), b.push(m?.props?.children);
      } else
        b.push(N);
    }), m ? m = S.cloneElement(m, void 0, b) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !g && S.Children.count(f) === 1 && S.isValidElement(f) && (m = f)
    );
    const x = m ? Tv(m) : void 0, v = hs(o, x);
    if (!m) {
      if (f || f === 0)
        throw new Error(
          g ? $N(a) : qN(a)
        );
      return f;
    }
    const p = Ev(h, m.props ?? {});
    return m.type !== S.Fragment && (p.ref = o ? v : x), S.cloneElement(m, p);
  });
  return s.displayName = `${a}.Slot`, s;
}
Jn(gh, "createSlot");
var Nv = Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function UN(a) {
  const s = /* @__PURE__ */ Jn((r) => "child" in r ? r.children(r.child) : r.children, "Slottable");
  return s.displayName = `${a}.Slottable`, s.__radixId = Nv, s;
}
Jn(UN, "createSlottable");
var HN = /* @__PURE__ */ Jn((a, s) => {
  if ("child" in a.props) {
    const r = a.props.child;
    return S.isValidElement(r) ? S.cloneElement(r, void 0, a.props.children(r.props.children)) : null;
  }
  return S.isValidElement(s) ? s : null;
}, "getSlottableElementFromSlottable");
function Ev(a, s) {
  const r = { ...s };
  for (const o in s) {
    const f = a[o], h = s[o];
    /^on[A-Z]/.test(o) ? f && h ? r[o] = (...g) => {
      const b = h(...g);
      return f(...g), b;
    } : f && (r[o] = f) : o === "style" ? r[o] = { ...f, ...h } : o === "className" && (r[o] = [f, h].filter(Boolean).join(" "));
  }
  return { ...a, ...r };
}
Jn(Ev, "mergeProps");
function Tv(a) {
  let s = Object.getOwnPropertyDescriptor(a.props, "ref")?.get, r = s && "isReactWarning" in s && s.isReactWarning;
  return r ? a.ref : (s = Object.getOwnPropertyDescriptor(a, "ref")?.get, r = s && "isReactWarning" in s && s.isReactWarning, r ? a.props.ref : a.props.ref || a.ref);
}
Jn(Tv, "getElementRef");
function jv(a) {
  return S.isValidElement(a) && typeof a.type == "function" && "__radixId" in a.type && a.type.__radixId === Nv;
}
Jn(jv, "isSlottable");
var BN = Symbol.for("react.lazy");
function $d(a) {
  return a != null && typeof a == "object" && "$$typeof" in a && a.$$typeof === BN && "_payload" in a && wv(a._payload);
}
Jn($d, "isLazyComponent");
function wv(a) {
  return typeof a == "object" && a !== null && "then" in a;
}
Jn(wv, "isPromiseLike");
var qN = /* @__PURE__ */ Jn((a) => `${a} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), $N = /* @__PURE__ */ Jn((a) => `${a} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), or = wc[" use ".trim().toString()], YN = Object.defineProperty, GN = (a, s) => YN(a, "name", { value: s, configurable: !0 }), VN = [
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
], ms = VN.reduce((a, s) => {
  const r = /* @__PURE__ */ gh(`Primitive.${s}`), o = S.forwardRef((f, h) => {
    const { asChild: m, ...g } = f, b = m ? r : s;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u.jsx(b, { ...g, ref: h });
  });
  return o.displayName = `Primitive.${s}`, { ...a, [s]: o };
}, {});
function _v(a, s) {
  a && Sv.flushSync(() => a.dispatchEvent(s));
}
GN(_v, "dispatchDiscreteCustomEvent");
var XN = Object.defineProperty, ZN = (a, s) => XN(a, "name", { value: s, configurable: !0 });
function us(a) {
  const s = S.useRef(a);
  return S.useEffect(() => {
    s.current = a;
  }), S.useMemo(() => ((...r) => s.current?.(...r)), []);
}
ZN(us, "useCallbackRef");
var QN = Object.defineProperty, Ot = (a, s) => QN(a, "name", { value: s, configurable: !0 }), Yd = "dismissableLayer.update", KN = "dismissableLayer.pointerDownOutside", IN = "dismissableLayer.focusOutside", oy, Av = S.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set(),
  // Outside elements that belong to a layer's own dismiss affordance (eg, a
  // dialog overlay). Pressing them should dismiss the layer regardless of
  // whether or not they stop propagation.
  //
  // See https://github.com/radix-ui/primitives/issues/3346
  dismissableSurfaces: /* @__PURE__ */ new Set()
}), JN = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ot(function(s, r) {
    const {
      disableOutsidePointerEvents: o = !1,
      deferPointerDownOutside: f = !1,
      onEscapeKeyDown: h,
      onPointerDownOutside: m,
      onFocusOutside: g,
      onInteractOutside: b,
      onDismiss: x,
      ...v
    } = s, p = S.useContext(Av), [N, j] = S.useState(null), T = N?.ownerDocument ?? globalThis?.document, [, U] = S.useState({}), k = hs(r, j), K = Array.from(p.layers), [X] = [
      ...p.layersWithOutsidePointerEventsDisabled
    ].slice(-1), H = X ? K.indexOf(X) : -1, F = N ? K.indexOf(N) : -1, W = p.layersWithOutsidePointerEventsDisabled.size > 0, $ = F >= H, V = S.useRef(!1), ae = Cv(
      (ve) => {
        m?.(ve), b?.(ve), ve.defaultPrevented || x?.();
      },
      {
        ownerDocument: T,
        deferPointerDownOutside: f,
        isDeferredPointerDownOutsideRef: V,
        dismissableSurfaces: p.dismissableSurfaces,
        shouldHandlePointerDownOutside: S.useCallback(
          (ve) => {
            if (!(ve instanceof Node))
              return !1;
            const at = [...p.branches].some(
              (We) => We.contains(ve)
            );
            return $ && !at;
          },
          [p.branches, $]
        )
      }
    ), ke = Ov((ve) => {
      if (f && V.current)
        return;
      const at = ve.target;
      [...p.branches].some((Ye) => Ye.contains(at)) || (g?.(ve), b?.(ve), ve.defaultPrevented || x?.());
    }, T), xe = N ? F === K.length - 1 : !1, Ee = us((ve) => {
      ve.key === "Escape" && (h?.(ve), !ve.defaultPrevented && x && (ve.preventDefault(), x()));
    });
    return S.useEffect(() => {
      if (xe)
        return T.addEventListener("keydown", Ee, { capture: !0 }), () => T.removeEventListener("keydown", Ee, { capture: !0 });
    }, [T, xe, Ee]), S.useEffect(() => {
      if (N)
        return o && (p.layersWithOutsidePointerEventsDisabled.size === 0 && (oy = T.body.style.pointerEvents, T.body.style.pointerEvents = "none"), p.layersWithOutsidePointerEventsDisabled.add(N)), p.layers.add(N), Gd(), () => {
          o && (p.layersWithOutsidePointerEventsDisabled.delete(N), p.layersWithOutsidePointerEventsDisabled.size === 0 && (T.body.style.pointerEvents = oy));
        };
    }, [N, T, o, p]), S.useEffect(() => () => {
      N && (p.layers.delete(N), p.layersWithOutsidePointerEventsDisabled.delete(N), Gd());
    }, [N, p]), S.useEffect(() => {
      const ve = /* @__PURE__ */ Ot(() => U({}), "handleUpdate");
      return document.addEventListener(Yd, ve), () => document.removeEventListener(Yd, ve);
    }, []), /* @__PURE__ */ u.jsx(
      ms.div,
      {
        ...v,
        ref: k,
        style: {
          pointerEvents: W ? $ ? "auto" : "none" : void 0,
          ...s.style
        },
        onFocusCapture: Na(s.onFocusCapture, ke.onFocusCapture),
        onBlurCapture: Na(s.onBlurCapture, ke.onBlurCapture),
        onPointerDownCapture: Na(
          s.onPointerDownCapture,
          ae.onPointerDownCapture
        )
      }
    );
  }, "DismissableLayer")
);
function kv() {
  const a = S.useContext(Av), [s, r] = S.useState(null);
  return S.useEffect(() => {
    if (s)
      return a.dismissableSurfaces.add(s), () => {
        a.dismissableSurfaces.delete(s);
      };
  }, [s, a.dismissableSurfaces]), r;
}
Ot(kv, "useDismissableLayerSurface");
var FN = /* @__PURE__ */ Ot(() => !0, "IS_TRUE");
function Cv(a, s) {
  const {
    ownerDocument: r = globalThis?.document,
    deferPointerDownOutside: o = !1,
    isDeferredPointerDownOutsideRef: f,
    dismissableSurfaces: h,
    shouldHandlePointerDownOutside: m = FN
  } = s, g = us(a), b = S.useRef(!1), x = S.useRef(!1), v = S.useRef(/* @__PURE__ */ new Map()), p = S.useRef(() => {
  });
  return S.useEffect(() => {
    function N() {
      x.current = !1, f.current = !1, v.current.clear();
    }
    Ot(N, "resetOutsideInteraction");
    function j() {
      return Array.from(v.current.values()).some(Boolean);
    }
    Ot(j, "isOutsideInteractionIntercepted");
    function T(H) {
      if (!x.current)
        return;
      const F = H.target;
      F instanceof Node && [...h].some(($) => $.contains(F)) || v.current.set(H.type, !0), H.type === "click" && window.setTimeout(() => {
        x.current && p.current();
      }, 0);
    }
    Ot(T, "handleInteractionCapture");
    function U(H) {
      x.current && v.current.set(H.type, !1);
    }
    Ot(U, "handleInteractionBubble");
    const k = /* @__PURE__ */ Ot((H) => {
      if (H.target && !b.current) {
        let F = function() {
          r.removeEventListener("click", p.current);
          const $ = j();
          N(), $ || yh(
            KN,
            g,
            W,
            { discrete: !0 }
          );
        };
        if (Ot(F, "handleAndDispatchPointerDownOutsideEvent"), !m(H.target)) {
          r.removeEventListener("click", p.current), N(), b.current = !1;
          return;
        }
        const W = { originalEvent: H };
        x.current = !0, f.current = o && H.button === 0, v.current.clear(), !o || H.button !== 0 ? F() : (r.removeEventListener("click", p.current), p.current = F, r.addEventListener("click", p.current, { once: !0 }));
      } else
        r.removeEventListener("click", p.current), N();
      b.current = !1;
    }, "handlePointerDown"), K = [
      "pointerup",
      "mousedown",
      "mouseup",
      "touchstart",
      "touchend",
      "click"
    ];
    for (const H of K)
      r.addEventListener(H, T, !0), r.addEventListener(H, U);
    const X = window.setTimeout(() => {
      r.addEventListener("pointerdown", k);
    }, 0);
    return () => {
      window.clearTimeout(X), r.removeEventListener("pointerdown", k), r.removeEventListener("click", p.current);
      for (const H of K)
        r.removeEventListener(H, T, !0), r.removeEventListener(H, U);
    };
  }, [
    r,
    g,
    o,
    f,
    h,
    m
  ]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: /* @__PURE__ */ Ot(() => b.current = !0, "onPointerDownCapture")
  };
}
Ot(Cv, "usePointerDownOutside");
function Ov(a, s = globalThis?.document) {
  const r = us(a), o = S.useRef(!1);
  return S.useEffect(() => {
    const f = /* @__PURE__ */ Ot((h) => {
      h.target && !o.current && yh(IN, r, { originalEvent: h }, {
        discrete: !1
      });
    }, "handleFocus");
    return s.addEventListener("focusin", f), () => s.removeEventListener("focusin", f);
  }, [s, r]), {
    onFocusCapture: /* @__PURE__ */ Ot(() => o.current = !0, "onFocusCapture"),
    onBlurCapture: /* @__PURE__ */ Ot(() => o.current = !1, "onBlurCapture")
  };
}
Ot(Ov, "useFocusOutside");
function Gd() {
  const a = new CustomEvent(Yd);
  document.dispatchEvent(a);
}
Ot(Gd, "dispatchUpdate");
function yh(a, s, r, { discrete: o }) {
  const f = r.originalEvent.target, h = new CustomEvent(a, { bubbles: !1, cancelable: !0, detail: r });
  s && f.addEventListener(a, s, { once: !0 }), o ? _v(f, h) : f.dispatchEvent(h);
}
Ot(yh, "handleAndDispatchCustomEvent");
var PN = Object.defineProperty, Wt = (a, s) => PN(a, "name", { value: s, configurable: !0 }), Sd = "focusScope.autoFocusOnMount", Nd = "focusScope.autoFocusOnUnmount", fy = { bubbles: !1, cancelable: !0 }, WN = /* @__PURE__ */ S.forwardRef(
  /* @__PURE__ */ Wt(function(s, r) {
    const {
      loop: o = !1,
      trapped: f = !1,
      onMountAutoFocus: h,
      onUnmountAutoFocus: m,
      ...g
    } = s, [b, x] = S.useState(null), v = us(h), p = us(m), N = S.useRef(null), j = hs(r, x), T = S.useRef({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    }).current;
    S.useEffect(() => {
      if (f) {
        let k = function(F) {
          if (T.paused || !b) return;
          const W = F.target;
          b.contains(W) ? N.current = W : zl(N.current, { select: !0 });
        }, K = function(F) {
          if (T.paused || !b) return;
          const W = F.relatedTarget;
          W !== null && (b.contains(W) || zl(N.current, { select: !0 }));
        }, X = function(F) {
          if (document.activeElement === document.body)
            for (const $ of F)
              $.removedNodes.length > 0 && zl(b);
        };
        Wt(k, "handleFocusIn"), Wt(K, "handleFocusOut"), Wt(X, "handleMutations"), document.addEventListener("focusin", k), document.addEventListener("focusout", K);
        const H = new MutationObserver(X);
        return b && H.observe(b, { childList: !0, subtree: !0 }), () => {
          document.removeEventListener("focusin", k), document.removeEventListener("focusout", K), H.disconnect();
        };
      }
    }, [f, b, T.paused]), S.useEffect(() => {
      if (b) {
        dy.add(T);
        const k = document.activeElement;
        if (!b.contains(k)) {
          const X = new CustomEvent(Sd, fy);
          b.addEventListener(Sd, v), b.dispatchEvent(X), X.defaultPrevented || (Rv(Uv(vh(b)), { select: !0 }), document.activeElement === k && zl(b));
        }
        return () => {
          b.removeEventListener(Sd, v), setTimeout(() => {
            const X = new CustomEvent(Nd, fy);
            b.addEventListener(Nd, p), b.dispatchEvent(X), X.defaultPrevented || zl(k ?? document.body, { select: !0 }), b.removeEventListener(Nd, p), dy.remove(T);
          }, 0);
        };
      }
    }, [b, v, p, T]);
    const U = S.useCallback(
      (k) => {
        if (!o && !f || T.paused) return;
        const K = k.key === "Tab" && !k.altKey && !k.ctrlKey && !k.metaKey, X = document.activeElement;
        if (K && X) {
          const H = k.currentTarget, [F, W] = Mv(H);
          F && W ? !k.shiftKey && X === W ? (k.preventDefault(), o && zl(F, { select: !0 })) : k.shiftKey && X === F && (k.preventDefault(), o && zl(W, { select: !0 })) : X === H && k.preventDefault();
        }
      },
      [o, f, T.paused]
    );
    return /* @__PURE__ */ u.jsx(ms.div, { tabIndex: -1, ...g, ref: j, onKeyDown: U });
  }, "FocusScope")
);
function Rv(a, { select: s = !1 } = {}) {
  const r = document.activeElement;
  for (const o of a)
    if (zl(o, { select: s }), document.activeElement !== r) return;
}
Wt(Rv, "focusFirst");
function Mv(a) {
  const s = vh(a), r = Vd(s, a), o = Vd(s.reverse(), a);
  return [r, o];
}
Wt(Mv, "getTabbableEdges");
function vh(a) {
  const s = [], r = document.createTreeWalker(a, NodeFilter.SHOW_ELEMENT, {
    acceptNode: /* @__PURE__ */ Wt((o) => {
      const f = o.tagName === "INPUT" && o.type === "hidden";
      return o.disabled || o.hidden || f ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }, "acceptNode")
  });
  for (; r.nextNode(); ) s.push(r.currentNode);
  return s;
}
Wt(vh, "getTabbableCandidates");
function Vd(a, s) {
  const r = typeof s.checkVisibility == "function" && s.checkVisibility({ checkVisibilityCSS: !0 });
  for (const o of a)
    if (!(r ? !o.checkVisibility({ checkVisibilityCSS: !0 }) : Dv(o, { upTo: s })))
      return o;
}
Wt(Vd, "findVisible");
function Dv(a, { upTo: s }) {
  if (getComputedStyle(a).visibility === "hidden") return !0;
  for (; a; ) {
    if (s !== void 0 && a === s) return !1;
    if (getComputedStyle(a).display === "none") return !0;
    a = a.parentElement;
  }
  return !1;
}
Wt(Dv, "isHidden");
function zv(a) {
  return a instanceof HTMLInputElement && "select" in a;
}
Wt(zv, "isSelectableInput");
function zl(a, { select: s = !1 } = {}) {
  if (a && a.focus) {
    const r = document.activeElement;
    a.focus({ preventScroll: !0 }), a !== r && zv(a) && s && a.select();
  }
}
Wt(zl, "focus");
var dy = Lv();
function Lv() {
  let a = [];
  return {
    add(s) {
      const r = a[0];
      s !== r && r?.pause(), a = Xd(a, s), a.unshift(s);
    },
    remove(s) {
      a = Xd(a, s), a[0]?.resume();
    }
  };
}
Wt(Lv, "createFocusScopesStack");
function Xd(a, s) {
  const r = [...a], o = r.indexOf(s);
  return o !== -1 && r.splice(o, 1), r;
}
Wt(Xd, "arrayRemove");
function Uv(a) {
  return a.filter((s) => s.tagName !== "A");
}
Wt(Uv, "removeLinks");
var eE = Object.defineProperty, tE = (a, s) => eE(a, "name", { value: s, configurable: !0 }), nE = /* @__PURE__ */ S.forwardRef(
  /* @__PURE__ */ tE(function(s, r) {
    const { container: o, ...f } = s, [h, m] = S.useState(!1);
    ni(() => m(!0), []);
    const g = o || h && globalThis?.document?.body;
    return g ? Sv.createPortal(/* @__PURE__ */ u.jsx(ms.div, { ...f, ref: r }), g) : null;
  }, "Portal")
), lE = Object.defineProperty, Hl = (a, s) => lE(a, "name", { value: s, configurable: !0 });
function Hv(a, s) {
  return S.useReducer((r, o) => s[r][o] ?? r, a);
}
Hl(Hv, "useStateMachine");
var bh = /* @__PURE__ */ Hl((a) => {
  const { present: s, children: r } = a, o = Bv(s), f = typeof r == "function" ? r({ present: o.isPresent }) : S.Children.only(r), h = qv(o.ref, $v(f));
  return typeof r == "function" || o.isPresent ? S.cloneElement(f, { ref: h }) : null;
}, "Presence");
function Bv(a) {
  const [s, r] = S.useState(), o = S.useRef(null), f = S.useRef(a), h = S.useRef("none"), m = S.useRef(void 0), g = a ? "mounted" : "unmounted", [b, x] = Hv(g, {
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
  return S.useEffect(() => {
    b === "mounted" ? (h.current = m.current ?? as(o.current), m.current = void 0) : h.current = "none";
  }, [b]), ni(() => {
    const v = o.current, p = f.current;
    if (p !== a) {
      const j = h.current, T = as(v);
      a ? (m.current = T, x("MOUNT")) : T === "none" || v?.display === "none" ? x("UNMOUNT") : x(p && j !== T ? "ANIMATION_OUT" : "UNMOUNT"), f.current = a;
    }
  }, [a, x]), ni(() => {
    if (s) {
      let v;
      const p = s.ownerDocument.defaultView ?? window, N = /* @__PURE__ */ Hl((T) => {
        const k = as(o.current).includes(CSS.escape(T.animationName));
        if (T.target === s && k && (x("ANIMATION_END"), !f.current)) {
          const K = s.style.animationFillMode;
          s.style.animationFillMode = "forwards", v = p.setTimeout(() => {
            s.style.animationFillMode === "forwards" && (s.style.animationFillMode = K);
          });
        }
      }, "handleAnimationEnd"), j = /* @__PURE__ */ Hl((T) => {
        T.target === s && (h.current = as(o.current));
      }, "handleAnimationStart");
      return s.addEventListener("animationstart", j), s.addEventListener("animationcancel", N), s.addEventListener("animationend", N), () => {
        p.clearTimeout(v), s.removeEventListener("animationstart", j), s.removeEventListener("animationcancel", N), s.removeEventListener("animationend", N);
      };
    } else
      x("ANIMATION_END");
  }, [s, x]), {
    isPresent: ["mounted", "unmountSuspended"].includes(b),
    ref: S.useCallback((v) => {
      if (v) {
        const p = getComputedStyle(v);
        o.current = p, m.current = as(p);
      } else
        o.current = null;
      r(v);
    }, [])
  };
}
Hl(Bv, "usePresence");
function Zd(a, s) {
  if (typeof a == "function")
    return a(s);
  a != null && (a.current = s);
}
Hl(Zd, "setRef");
function qv(...a) {
  const s = S.useRef(a);
  return s.current = a, S.useCallback((r) => {
    const o = s.current;
    let f = !1;
    const h = o.map((m) => {
      const g = Zd(m, r);
      return !f && typeof g == "function" && (f = !0), g;
    });
    if (f)
      return () => {
        for (let m = 0; m < h.length; m++) {
          const g = h[m];
          typeof g == "function" ? g() : Zd(o[m], null);
        }
      };
  }, []);
}
Hl(qv, "useStableComposedRefs");
function as(a) {
  return a?.animationName || "none";
}
Hl(as, "getAnimationName");
function $v(a) {
  let s = Object.getOwnPropertyDescriptor(a.props, "ref")?.get, r = s && "isReactWarning" in s && s.isReactWarning;
  return r ? a.ref : (s = Object.getOwnPropertyDescriptor(a, "ref")?.get, r = s && "isReactWarning" in s && s.isReactWarning, r ? a.props.ref : a.props.ref || a.ref);
}
Hl($v, "getElementRef");
var aE = Object.defineProperty, xh = (a, s) => aE(a, "name", { value: s, configurable: !0 }), fr = 0, Pi = null;
function iE(a) {
  return Sh(), a.children;
}
xh(iE, "FocusGuards");
function Sh() {
  S.useEffect(() => {
    Pi || (Pi = { start: Qd(), end: Qd() });
    const { start: a, end: s } = Pi;
    return document.body.firstElementChild !== a && document.body.insertAdjacentElement("afterbegin", a), document.body.lastElementChild !== s && document.body.insertAdjacentElement("beforeend", s), fr++, () => {
      fr === 1 && (Pi?.start.remove(), Pi?.end.remove(), Pi = null), fr = Math.max(0, fr - 1);
    };
  }, []);
}
xh(Sh, "useFocusGuards");
function Qd() {
  const a = document.createElement("span");
  return a.setAttribute("data-radix-focus-guard", ""), a.tabIndex = 0, a.style.outline = "none", a.style.opacity = "0", a.style.position = "fixed", a.style.pointerEvents = "none", a;
}
xh(Qd, "createFocusGuard");
var pl = function() {
  return pl = Object.assign || function(s) {
    for (var r, o = 1, f = arguments.length; o < f; o++) {
      r = arguments[o];
      for (var h in r) Object.prototype.hasOwnProperty.call(r, h) && (s[h] = r[h]);
    }
    return s;
  }, pl.apply(this, arguments);
};
function Yv(a, s) {
  var r = {};
  for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && s.indexOf(o) < 0 && (r[o] = a[o]);
  if (a != null && typeof Object.getOwnPropertySymbols == "function")
    for (var f = 0, o = Object.getOwnPropertySymbols(a); f < o.length; f++)
      s.indexOf(o[f]) < 0 && Object.prototype.propertyIsEnumerable.call(a, o[f]) && (r[o[f]] = a[o[f]]);
  return r;
}
function sE(a, s, r) {
  if (r || arguments.length === 2) for (var o = 0, f = s.length, h; o < f; o++)
    (h || !(o in s)) && (h || (h = Array.prototype.slice.call(s, 0, o)), h[o] = s[o]);
  return a.concat(h || Array.prototype.slice.call(s));
}
var xr = "right-scroll-bar-position", Sr = "width-before-scroll-bar", cE = "with-scroll-bars-hidden", uE = "--removed-body-scroll-bar-size";
function Ed(a, s) {
  return typeof a == "function" ? a(s) : a && (a.current = s), a;
}
function rE(a, s) {
  var r = S.useState(function() {
    return {
      // value
      value: a,
      // last callback
      callback: s,
      // "memoized" public interface
      facade: {
        get current() {
          return r.value;
        },
        set current(o) {
          var f = r.value;
          f !== o && (r.value = o, r.callback(o, f));
        }
      }
    };
  })[0];
  return r.callback = s, r.facade;
}
var oE = typeof window < "u" ? S.useLayoutEffect : S.useEffect, hy = /* @__PURE__ */ new WeakMap();
function fE(a, s) {
  var r = rE(null, function(o) {
    return a.forEach(function(f) {
      return Ed(f, o);
    });
  });
  return oE(function() {
    var o = hy.get(r);
    if (o) {
      var f = new Set(o), h = new Set(a), m = r.current;
      f.forEach(function(g) {
        h.has(g) || Ed(g, null);
      }), h.forEach(function(g) {
        f.has(g) || Ed(g, m);
      });
    }
    hy.set(r, a);
  }, [a]), r;
}
function dE(a) {
  return a;
}
function hE(a, s) {
  s === void 0 && (s = dE);
  var r = [], o = !1, f = {
    read: function() {
      if (o)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return r.length ? r[r.length - 1] : a;
    },
    useMedium: function(h) {
      var m = s(h, o);
      return r.push(m), function() {
        r = r.filter(function(g) {
          return g !== m;
        });
      };
    },
    assignSyncMedium: function(h) {
      for (o = !0; r.length; ) {
        var m = r;
        r = [], m.forEach(h);
      }
      r = {
        push: function(g) {
          return h(g);
        },
        filter: function() {
          return r;
        }
      };
    },
    assignMedium: function(h) {
      o = !0;
      var m = [];
      if (r.length) {
        var g = r;
        r = [], g.forEach(h), m = r;
      }
      var b = function() {
        var v = m;
        m = [], v.forEach(h);
      }, x = function() {
        return Promise.resolve().then(b);
      };
      x(), r = {
        push: function(v) {
          m.push(v), x();
        },
        filter: function(v) {
          return m = m.filter(v), r;
        }
      };
    }
  };
  return f;
}
function mE(a) {
  a === void 0 && (a = {});
  var s = hE(null);
  return s.options = pl({ async: !0, ssr: !1 }, a), s;
}
var Gv = function(a) {
  var s = a.sideCar, r = Yv(a, ["sideCar"]);
  if (!s)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var o = s.read();
  if (!o)
    throw new Error("Sidecar medium not found");
  return S.createElement(o, pl({}, r));
};
Gv.isSideCarExport = !0;
function pE(a, s) {
  return a.useMedium(s), Gv;
}
var Vv = mE(), Td = function() {
}, _r = S.forwardRef(function(a, s) {
  var r = S.useRef(null), o = S.useState({
    onScrollCapture: Td,
    onWheelCapture: Td,
    onTouchMoveCapture: Td
  }), f = o[0], h = o[1], m = a.forwardProps, g = a.children, b = a.className, x = a.removeScrollBar, v = a.enabled, p = a.shards, N = a.sideCar, j = a.noRelative, T = a.noIsolation, U = a.inert, k = a.allowPinchZoom, K = a.as, X = K === void 0 ? "div" : K, H = a.gapMode, F = Yv(a, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), W = N, $ = fE([r, s]), V = pl(pl({}, F), f);
  return S.createElement(
    S.Fragment,
    null,
    v && S.createElement(W, { sideCar: Vv, removeScrollBar: x, shards: p, noRelative: j, noIsolation: T, inert: U, setCallbacks: h, allowPinchZoom: !!k, lockRef: r, gapMode: H }),
    m ? S.cloneElement(S.Children.only(g), pl(pl({}, V), { ref: $ })) : S.createElement(X, pl({}, V, { className: b, ref: $ }), g)
  );
});
_r.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
_r.classNames = {
  fullWidth: Sr,
  zeroRight: xr
};
var gE = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function yE() {
  if (!document)
    return null;
  var a = document.createElement("style");
  a.type = "text/css";
  var s = gE();
  return s && a.setAttribute("nonce", s), a;
}
function vE(a, s) {
  a.styleSheet ? a.styleSheet.cssText = s : a.appendChild(document.createTextNode(s));
}
function bE(a) {
  var s = document.head || document.getElementsByTagName("head")[0];
  s.appendChild(a);
}
var xE = function() {
  var a = 0, s = null;
  return {
    add: function(r) {
      a == 0 && (s = yE()) && (vE(s, r), bE(s)), a++;
    },
    remove: function() {
      a--, !a && s && (s.parentNode && s.parentNode.removeChild(s), s = null);
    }
  };
}, SE = function() {
  var a = xE();
  return function(s, r) {
    S.useEffect(function() {
      return a.add(s), function() {
        a.remove();
      };
    }, [s && r]);
  };
}, Xv = function() {
  var a = SE(), s = function(r) {
    var o = r.styles, f = r.dynamic;
    return a(o, f), null;
  };
  return s;
}, NE = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, jd = function(a) {
  return parseInt(a || "", 10) || 0;
}, EE = function(a) {
  var s = window.getComputedStyle(document.body), r = s[a === "padding" ? "paddingLeft" : "marginLeft"], o = s[a === "padding" ? "paddingTop" : "marginTop"], f = s[a === "padding" ? "paddingRight" : "marginRight"];
  return [jd(r), jd(o), jd(f)];
}, TE = function(a) {
  if (a === void 0 && (a = "margin"), typeof window > "u")
    return NE;
  var s = EE(a), r = document.documentElement.clientWidth, o = window.innerWidth;
  return {
    left: s[0],
    top: s[1],
    right: s[2],
    gap: Math.max(0, o - r + s[2] - s[0])
  };
}, jE = Xv(), cs = "data-scroll-locked", wE = function(a, s, r, o) {
  var f = a.left, h = a.top, m = a.right, g = a.gap;
  return r === void 0 && (r = "margin"), `
  .`.concat(cE, ` {
   overflow: hidden `).concat(o, `;
   padding-right: `).concat(g, "px ").concat(o, `;
  }
  body[`).concat(cs, `] {
    overflow: hidden `).concat(o, `;
    overscroll-behavior: contain;
    `).concat([
    s && "position: relative ".concat(o, ";"),
    r === "margin" && `
    padding-left: `.concat(f, `px;
    padding-top: `).concat(h, `px;
    padding-right: `).concat(m, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(g, "px ").concat(o, `;
    `),
    r === "padding" && "padding-right: ".concat(g, "px ").concat(o, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(xr, ` {
    right: `).concat(g, "px ").concat(o, `;
  }
  
  .`).concat(Sr, ` {
    margin-right: `).concat(g, "px ").concat(o, `;
  }
  
  .`).concat(xr, " .").concat(xr, ` {
    right: 0 `).concat(o, `;
  }
  
  .`).concat(Sr, " .").concat(Sr, ` {
    margin-right: 0 `).concat(o, `;
  }
  
  body[`).concat(cs, `] {
    `).concat(uE, ": ").concat(g, `px;
  }
`);
}, my = function() {
  var a = parseInt(document.body.getAttribute(cs) || "0", 10);
  return isFinite(a) ? a : 0;
}, _E = function() {
  S.useEffect(function() {
    return document.body.setAttribute(cs, (my() + 1).toString()), function() {
      var a = my() - 1;
      a <= 0 ? document.body.removeAttribute(cs) : document.body.setAttribute(cs, a.toString());
    };
  }, []);
}, AE = function(a) {
  var s = a.noRelative, r = a.noImportant, o = a.gapMode, f = o === void 0 ? "margin" : o;
  _E();
  var h = S.useMemo(function() {
    return TE(f);
  }, [f]);
  return S.createElement(jE, { styles: wE(h, !s, f, r ? "" : "!important") });
}, Kd = !1;
if (typeof window < "u")
  try {
    var dr = Object.defineProperty({}, "passive", {
      get: function() {
        return Kd = !0, !0;
      }
    });
    window.addEventListener("test", dr, dr), window.removeEventListener("test", dr, dr);
  } catch {
    Kd = !1;
  }
var Wi = Kd ? { passive: !1 } : !1, kE = function(a) {
  return a.tagName === "TEXTAREA";
}, Zv = function(a, s) {
  if (!(a instanceof Element))
    return !1;
  var r = window.getComputedStyle(a);
  return (
    // not-not-scrollable
    r[s] !== "hidden" && // contains scroll inside self
    !(r.overflowY === r.overflowX && !kE(a) && r[s] === "visible")
  );
}, CE = function(a) {
  return Zv(a, "overflowY");
}, OE = function(a) {
  return Zv(a, "overflowX");
}, py = function(a, s) {
  var r = s.ownerDocument, o = s;
  do {
    typeof ShadowRoot < "u" && o instanceof ShadowRoot && (o = o.host);
    var f = Qv(a, o);
    if (f) {
      var h = Kv(a, o), m = h[1], g = h[2];
      if (m > g)
        return !0;
    }
    o = o.parentNode;
  } while (o && o !== r.body);
  return !1;
}, RE = function(a) {
  var s = a.scrollTop, r = a.scrollHeight, o = a.clientHeight;
  return [
    s,
    r,
    o
  ];
}, ME = function(a) {
  var s = a.scrollLeft, r = a.scrollWidth, o = a.clientWidth;
  return [
    s,
    r,
    o
  ];
}, Qv = function(a, s) {
  return a === "v" ? CE(s) : OE(s);
}, Kv = function(a, s) {
  return a === "v" ? RE(s) : ME(s);
}, DE = function(a, s) {
  return a === "h" && s === "rtl" ? -1 : 1;
}, zE = function(a, s, r, o, f) {
  var h = DE(a, window.getComputedStyle(s).direction), m = h * o, g = r.target, b = s.contains(g), x = !1, v = m > 0, p = 0, N = 0;
  do {
    if (!g)
      break;
    var j = Kv(a, g), T = j[0], U = j[1], k = j[2], K = U - k - h * T;
    (T || K) && Qv(a, g) && (p += K, N += T);
    var X = g.parentNode;
    g = X && X.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? X.host : X;
  } while (
    // portaled content
    !b && g !== document.body || // self content
    b && (s.contains(g) || s === g)
  );
  return (v && Math.abs(p) < 1 || !v && Math.abs(N) < 1) && (x = !0), x;
}, hr = function(a) {
  return "changedTouches" in a ? [a.changedTouches[0].clientX, a.changedTouches[0].clientY] : [0, 0];
}, gy = function(a) {
  return [a.deltaX, a.deltaY];
}, yy = function(a) {
  return a && "current" in a ? a.current : a;
}, LE = function(a, s) {
  return a[0] === s[0] && a[1] === s[1];
}, UE = function(a) {
  return `
  .block-interactivity-`.concat(a, ` {pointer-events: none;}
  .allow-interactivity-`).concat(a, ` {pointer-events: all;}
`);
}, HE = 0, es = [];
function BE(a) {
  var s = S.useRef([]), r = S.useRef([0, 0]), o = S.useRef(), f = S.useState(HE++)[0], h = S.useState(Xv)[0], m = S.useRef(a);
  S.useEffect(function() {
    m.current = a;
  }, [a]), S.useEffect(function() {
    if (a.inert) {
      document.body.classList.add("block-interactivity-".concat(f));
      var U = sE([a.lockRef.current], (a.shards || []).map(yy), !0).filter(Boolean);
      return U.forEach(function(k) {
        return k.classList.add("allow-interactivity-".concat(f));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(f)), U.forEach(function(k) {
          return k.classList.remove("allow-interactivity-".concat(f));
        });
      };
    }
  }, [a.inert, a.lockRef.current, a.shards]);
  var g = S.useCallback(function(U, k) {
    if ("touches" in U && U.touches.length === 2 || U.type === "wheel" && U.ctrlKey)
      return !m.current.allowPinchZoom;
    var K = hr(U), X = r.current, H = "deltaX" in U ? U.deltaX : X[0] - K[0], F = "deltaY" in U ? U.deltaY : X[1] - K[1], W, $ = U.target, V = Math.abs(H) > Math.abs(F) ? "h" : "v";
    if ("touches" in U && V === "h" && $.type === "range")
      return !1;
    var ae = window.getSelection(), ke = ae && ae.anchorNode, xe = ke ? ke === $ || ke.contains($) : !1;
    if (xe)
      return !1;
    var Ee = py(V, $);
    if (!Ee)
      return !0;
    if (Ee ? W = V : (W = V === "v" ? "h" : "v", Ee = py(V, $)), !Ee)
      return !1;
    if (!o.current && "changedTouches" in U && (H || F) && (o.current = W), !W)
      return !0;
    var ve = o.current || W;
    return zE(ve, k, U, ve === "h" ? H : F);
  }, []), b = S.useCallback(function(U) {
    var k = U;
    if (!(!es.length || es[es.length - 1] !== h)) {
      var K = "deltaY" in k ? gy(k) : hr(k), X = s.current.filter(function(W) {
        return W.name === k.type && (W.target === k.target || k.target === W.shadowParent) && LE(W.delta, K);
      })[0];
      if (X && X.should) {
        k.cancelable && k.preventDefault();
        return;
      }
      if (!X) {
        var H = (m.current.shards || []).map(yy).filter(Boolean).filter(function(W) {
          return W.contains(k.target);
        }), F = H.length > 0 ? g(k, H[0]) : !m.current.noIsolation;
        F && k.cancelable && k.preventDefault();
      }
    }
  }, []), x = S.useCallback(function(U, k, K, X) {
    var H = { name: U, delta: k, target: K, should: X, shadowParent: qE(K) };
    s.current.push(H), setTimeout(function() {
      s.current = s.current.filter(function(F) {
        return F !== H;
      });
    }, 1);
  }, []), v = S.useCallback(function(U) {
    r.current = hr(U), o.current = void 0;
  }, []), p = S.useCallback(function(U) {
    x(U.type, gy(U), U.target, g(U, a.lockRef.current));
  }, []), N = S.useCallback(function(U) {
    x(U.type, hr(U), U.target, g(U, a.lockRef.current));
  }, []);
  S.useEffect(function() {
    return es.push(h), a.setCallbacks({
      onScrollCapture: p,
      onWheelCapture: p,
      onTouchMoveCapture: N
    }), document.addEventListener("wheel", b, Wi), document.addEventListener("touchmove", b, Wi), document.addEventListener("touchstart", v, Wi), function() {
      es = es.filter(function(U) {
        return U !== h;
      }), document.removeEventListener("wheel", b, Wi), document.removeEventListener("touchmove", b, Wi), document.removeEventListener("touchstart", v, Wi);
    };
  }, []);
  var j = a.removeScrollBar, T = a.inert;
  return S.createElement(
    S.Fragment,
    null,
    T ? S.createElement(h, { styles: UE(f) }) : null,
    j ? S.createElement(AE, { noRelative: a.noRelative, gapMode: a.gapMode }) : null
  );
}
function qE(a) {
  for (var s = null; a !== null; )
    a instanceof ShadowRoot && (s = a.host, a = a.host), a = a.parentNode;
  return s;
}
const $E = pE(Vv, BE);
var Iv = S.forwardRef(function(a, s) {
  return S.createElement(_r, pl({}, a, { ref: s, sideCar: $E }));
});
Iv.classNames = _r.classNames;
var YE = function(a) {
  if (typeof document > "u")
    return null;
  var s = Array.isArray(a) ? a[0] : a;
  return s.ownerDocument.body;
}, ts = /* @__PURE__ */ new WeakMap(), mr = /* @__PURE__ */ new WeakMap(), pr = {}, wd = 0, Jv = function(a) {
  return a && (a.host || Jv(a.parentNode));
}, GE = function(a, s) {
  return s.map(function(r) {
    if (a.contains(r))
      return r;
    var o = Jv(r);
    return o && a.contains(o) ? o : (console.error("aria-hidden", r, "in not contained inside", a, ". Doing nothing"), null);
  }).filter(function(r) {
    return !!r;
  });
}, VE = function(a, s, r, o) {
  var f = GE(s, Array.isArray(a) ? a : [a]);
  pr[r] || (pr[r] = /* @__PURE__ */ new WeakMap());
  var h = pr[r], m = [], g = /* @__PURE__ */ new Set(), b = new Set(f), x = function(p) {
    !p || g.has(p) || (g.add(p), x(p.parentNode));
  };
  f.forEach(x);
  var v = function(p) {
    !p || b.has(p) || Array.prototype.forEach.call(p.children, function(N) {
      if (g.has(N))
        v(N);
      else
        try {
          var j = N.getAttribute(o), T = j !== null && j !== "false", U = (ts.get(N) || 0) + 1, k = (h.get(N) || 0) + 1;
          ts.set(N, U), h.set(N, k), m.push(N), U === 1 && T && mr.set(N, !0), k === 1 && N.setAttribute(r, "true"), T || N.setAttribute(o, "true");
        } catch (K) {
          console.error("aria-hidden: cannot operate on ", N, K);
        }
    });
  };
  return v(s), g.clear(), wd++, function() {
    m.forEach(function(p) {
      var N = ts.get(p) - 1, j = h.get(p) - 1;
      ts.set(p, N), h.set(p, j), N || (mr.has(p) || p.removeAttribute(o), mr.delete(p)), j || p.removeAttribute(r);
    }), wd--, wd || (ts = /* @__PURE__ */ new WeakMap(), ts = /* @__PURE__ */ new WeakMap(), mr = /* @__PURE__ */ new WeakMap(), pr = {});
  };
}, XE = function(a, s, r) {
  r === void 0 && (r = "data-aria-hidden");
  var o = Array.from(Array.isArray(a) ? a : [a]), f = YE(a);
  return f ? (o.push.apply(o, Array.from(f.querySelectorAll("[aria-live], script"))), VE(o, f, r, "aria-hidden")) : function() {
    return null;
  };
}, ZE = Object.defineProperty, Fn = (a, s) => ZE(a, "name", { value: s, configurable: !0 }), Nh = "Dialog", [Fv, Uj] = /* @__PURE__ */ pv(Nh), [QE, ql] = Fv(Nh), Ar = /* @__PURE__ */ Fn((a) => {
  const {
    __scopeDialog: s,
    children: r,
    open: o,
    defaultOpen: f,
    onOpenChange: h,
    modal: m = !0
  } = a, g = S.useRef(null), b = S.useRef(null), [x, v] = vv({
    prop: o,
    defaultProp: f ?? !1,
    onChange: h,
    caller: Nh
  }), [p, N] = S.useState(0), [j, T] = S.useState(0);
  return /* @__PURE__ */ u.jsx(
    QE,
    {
      scope: s,
      triggerRef: g,
      contentRef: b,
      contentId: br(),
      titleId: br(),
      descriptionId: br(),
      titlePresent: p > 0,
      descriptionPresent: j > 0,
      setTitleCount: N,
      setDescriptionCount: T,
      open: x,
      onOpenChange: v,
      onOpenToggle: S.useCallback(() => v((U) => !U), [v]),
      modal: m,
      children: r
    }
  );
}, "Dialog"), Pv = "DialogPortal", [KE, Wv] = Fv(Pv, {
  forceMount: void 0
}), kr = /* @__PURE__ */ Fn((a) => {
  const { __scopeDialog: s, forceMount: r, children: o, container: f } = a, h = ql(Pv, s);
  return /* @__PURE__ */ u.jsx(KE, { scope: s, forceMount: r, children: S.Children.map(o, (m) => /* @__PURE__ */ u.jsx(bh, { present: r || h.open, children: /* @__PURE__ */ u.jsx(nE, { asChild: !0, container: f, children: m }) })) });
}, "DialogPortal"), Id = "DialogOverlay", Cr = /* @__PURE__ */ S.forwardRef(
  /* @__PURE__ */ Fn(function(s, r) {
    const o = Wv(Id, s.__scopeDialog), { forceMount: f = o.forceMount, ...h } = s, m = ql(Id, s.__scopeDialog);
    return m.modal ? /* @__PURE__ */ u.jsx(bh, { present: f || m.open, children: /* @__PURE__ */ u.jsx(JE, { ...h, ref: r }) }) : null;
  }, "DialogOverlay")
), IE = /* @__PURE__ */ gh("DialogOverlay.RemoveScroll"), JE = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Fn(function(s, r) {
    const { __scopeDialog: o, ...f } = s, h = ql(Id, o), m = kv(), g = hs(r, m);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ u.jsx(Iv, { as: IE, allowPinchZoom: !0, shards: [h.contentRef], children: /* @__PURE__ */ u.jsx(
        ms.div,
        {
          "data-state": Eh(h.open),
          ...f,
          ref: g,
          style: { pointerEvents: "auto", ...f.style }
        }
      ) })
    );
  }, "DialogOverlayImpl")
), jc = "DialogContent", Or = /* @__PURE__ */ S.forwardRef(
  /* @__PURE__ */ Fn(function(s, r) {
    const o = Wv(jc, s.__scopeDialog), { forceMount: f = o.forceMount, ...h } = s, m = ql(jc, s.__scopeDialog);
    return /* @__PURE__ */ u.jsx(bh, { present: f || m.open, children: m.modal ? /* @__PURE__ */ u.jsx(FE, { ...h, ref: r }) : /* @__PURE__ */ u.jsx(PE, { ...h, ref: r }) });
  }, "DialogContent")
), FE = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Fn(function(s, r) {
    const o = ql(jc, s.__scopeDialog), f = S.useRef(null), h = hs(r, o.contentRef, f);
    return S.useEffect(() => {
      const m = f.current;
      if (m) return XE(m);
    }, []), /* @__PURE__ */ u.jsx(
      e1,
      {
        ...s,
        ref: h,
        trapFocus: o.open,
        disableOutsidePointerEvents: o.open,
        onCloseAutoFocus: Na(s.onCloseAutoFocus, (m) => {
          m.preventDefault(), o.triggerRef.current?.focus();
        }),
        onPointerDownOutside: Na(s.onPointerDownOutside, (m) => {
          const g = m.detail.originalEvent, b = g.button === 0 && g.ctrlKey === !0;
          (g.button === 2 || b) && m.preventDefault();
        }),
        onFocusOutside: Na(
          s.onFocusOutside,
          (m) => m.preventDefault()
        )
      }
    );
  }, "DialogContentModal")
), PE = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Fn(function(s, r) {
    const o = ql(jc, s.__scopeDialog), f = S.useRef(!1), h = S.useRef(!1);
    return /* @__PURE__ */ u.jsx(
      e1,
      {
        ...s,
        ref: r,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (m) => {
          s.onCloseAutoFocus?.(m), m.defaultPrevented || (f.current || o.triggerRef.current?.focus(), m.preventDefault()), f.current = !1, h.current = !1;
        },
        onInteractOutside: (m) => {
          s.onInteractOutside?.(m), m.defaultPrevented || (f.current = !0, m.detail.originalEvent.type === "pointerdown" && (h.current = !0));
          const g = m.target;
          o.triggerRef.current?.contains(g) && m.preventDefault(), m.detail.originalEvent.type === "focusin" && h.current && m.preventDefault();
        }
      }
    );
  }, "DialogContentNonModal")
), e1 = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Fn(function(s, r) {
    const { __scopeDialog: o, trapFocus: f, onOpenAutoFocus: h, onCloseAutoFocus: m, ...g } = s, b = ql(jc, o);
    return Sh(), /* @__PURE__ */ u.jsx(u.Fragment, { children: /* @__PURE__ */ u.jsx(
      WN,
      {
        asChild: !0,
        loop: !0,
        trapped: f,
        onMountAutoFocus: h,
        onUnmountAutoFocus: m,
        children: /* @__PURE__ */ u.jsx(
          JN,
          {
            role: "dialog",
            id: b.contentId,
            "aria-describedby": b.descriptionPresent ? b.descriptionId : void 0,
            "aria-labelledby": b.titlePresent ? b.titleId : void 0,
            "data-state": Eh(b.open),
            ...g,
            ref: r,
            deferPointerDownOutside: !0,
            onDismiss: () => b.onOpenChange(!1)
          }
        )
      }
    ) });
  }, "DialogContentImpl")
), WE = "DialogTitle", Rr = /* @__PURE__ */ S.forwardRef(
  /* @__PURE__ */ Fn(function(s, r) {
    const { __scopeDialog: o, ...f } = s, h = ql(WE, o), { setTitleCount: m } = h;
    return ni(() => (m((g) => g + 1), () => m((g) => g - 1)), [m]), /* @__PURE__ */ u.jsx(ms.h2, { id: h.titleId, ...f, ref: r });
  }, "DialogTitle")
), eT = "DialogClose", Mr = /* @__PURE__ */ S.forwardRef(
  /* @__PURE__ */ Fn(function(s, r) {
    const { __scopeDialog: o, ...f } = s, h = ql(eT, o);
    return /* @__PURE__ */ u.jsx(
      ms.button,
      {
        type: "button",
        ...f,
        ref: r,
        onClick: Na(s.onClick, () => h.onOpenChange(!1))
      }
    );
  }, "DialogClose")
);
function Eh(a) {
  return a ? "open" : "closed";
}
Fn(Eh, "getState");
function Dr({ open: a, onOpenChange: s, title: r, subtitle: o, wide: f, children: h, footer: m }) {
  return /* @__PURE__ */ u.jsx(Ar, { open: a, onOpenChange: s, children: /* @__PURE__ */ u.jsxs(kr, { children: [
    /* @__PURE__ */ u.jsx(Cr, { className: "panel-overlay" }),
    /* @__PURE__ */ u.jsxs(
      Or,
      {
        className: `panel${f ? " wide" : ""}`,
        "aria-describedby": void 0,
        onOpenAutoFocus: (g) => g.preventDefault(),
        onEscapeKeyDown: (g) => {
          g.isComposing && g.preventDefault();
        },
        children: [
          /* @__PURE__ */ u.jsxs("header", { className: "panel-head", children: [
            /* @__PURE__ */ u.jsxs("div", { className: "panel-titles", children: [
              /* @__PURE__ */ u.jsx(Rr, { className: "panel-title", children: r }),
              o && /* @__PURE__ */ u.jsx("p", { className: "panel-subtitle", children: o })
            ] }),
            /* @__PURE__ */ u.jsx(Mr, { className: "icon-button", "aria-label": "Close", children: /* @__PURE__ */ u.jsx(li, {}) })
          ] }),
          /* @__PURE__ */ u.jsx("div", { className: "panel-body", children: h }),
          m && /* @__PURE__ */ u.jsx("footer", { className: "panel-foot", children: m })
        ]
      }
    )
  ] }) });
}
function tT({ value: a, onChange: s, items: r }) {
  return /* @__PURE__ */ u.jsx("div", { className: "tabs", role: "tablist", children: r.map((o) => /* @__PURE__ */ u.jsx("button", { type: "button", role: "tab", "aria-selected": o.id === a, className: `tab${o.id === a ? " active" : ""}`, onClick: () => s(o.id), children: o.label }, o.id)) });
}
function Pa({ label: a, hint: s, children: r }) {
  return /* @__PURE__ */ u.jsxs("label", { className: "field", children: [
    /* @__PURE__ */ u.jsx("span", { className: "field-label", children: a }),
    r,
    s && /* @__PURE__ */ u.jsx("span", { className: "field-hint", children: s })
  ] });
}
const vy = new URLSearchParams(location.search).get("token") ?? "", dt = (a) => vy ? `${a}${a.includes("?") ? "&" : "?"}token=${encodeURIComponent(vy)}` : a;
async function yl(a, s) {
  const r = await fetch(dt(a), s);
  if (!r.ok) throw new Error(await r.text() || `${r.status}`);
  return r.json();
}
const gl = (a, s) => yl(a, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(s) });
let nT = 0;
const En = () => `k${++nT}`, lT = ["idle", "reading", "writing", "searching", "running", "waiting", "failed", "done"], Ec = {
  idle: "Idle",
  reading: "Reading",
  writing: "Writing",
  searching: "Searching",
  running: "Running a command",
  waiting: "Waiting for you",
  failed: "Something went wrong",
  done: "Done",
  speaking: "Speaking"
};
function aT() {
  for (const a of navigator.languages ?? [navigator.language]) {
    const s = a.toLowerCase().split(/[-_]/)[0];
    if (s === "zh" || s === "en" || s === "ja") return s;
  }
  return "en";
}
function t1(a) {
  return a < 1024 ? `${a} B` : a < 1024 * 1024 ? `${(a / 1024).toFixed(a < 10240 ? 1 : 0)} KB` : `${(a / 1024 / 1024).toFixed(1)} MB`;
}
function n1(a) {
  if (a.kind === "markdown") return "Markdown";
  if (a.kind === "text") return "Text";
  if (a.kind === "image") return "Image";
  const s = a.name.includes(".") ? a.name.split(".").pop() ?? "" : "";
  return s !== "" && s.length <= 5 ? s.toUpperCase() : "File";
}
function iT(a) {
  const s = new Date(a);
  return Number.isNaN(s.getTime()) ? "" : s.toLocaleString(void 0, { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
}
const sT = { png: "image/png", webp: "image/webp", jpg: "image/jpeg", jpeg: "image/jpeg", mp4: "video/mp4", webm: "video/webm" };
function cT({ open: a, onOpenChange: s, tab: r, setTab: o, manifest: f, lang: h, preview: m, setPreview: g, notify: b, onManifestChange: x }) {
  const [v, p] = S.useState(null), N = S.useCallback(() => {
    yl("/character/config").then(p).catch((j) => b(`Could not load character: ${j.message}`));
  }, [b]);
  return S.useEffect(() => {
    a && N();
  }, [a, f?.characterId, N]), /* @__PURE__ */ u.jsxs(Dr, { open: a, onOpenChange: s, wide: !0, title: "Character", subtitle: v ? v.dir : void 0, children: [
    /* @__PURE__ */ u.jsx(tT, { value: r, onChange: o, items: [{ id: "pick", label: "Choose" }, { id: "art", label: "Artwork" }, { id: "persona", label: "Persona" }] }),
    r === "pick" && /* @__PURE__ */ u.jsx(uT, { manifest: f, notify: b, close: () => s(!1) }),
    r === "art" && v && f && /* @__PURE__ */ u.jsx(rT, { config: v, manifest: f, preview: m, setPreview: g, reload: N, notify: b }),
    r === "persona" && v && /* @__PURE__ */ u.jsx(oT, { config: v, lang: h, setConfig: p, notify: b, onManifestChange: x }, v.id)
  ] });
}
function uT({ manifest: a, notify: s, close: r }) {
  const o = S.useRef(null), f = async (m) => {
    if (r(), m !== a?.characterId)
      try {
        await gl("/character", { id: m });
      } catch (g) {
        s(`Could not switch: ${g.message}`);
      }
  }, h = async (m) => {
    const g = m.name.replace(/\.zip$/i, "").replace(/-pack$/i, "");
    s(`Importing ${m.name}…`);
    try {
      const b = await fetch(dt(`/character/import?id=${encodeURIComponent(g)}`), { method: "POST", headers: { "content-type": "application/zip" }, body: m });
      if (!b.ok) throw new Error(await b.text());
      const { id: x } = await b.json();
      await gl("/character", { id: x }), r();
    } catch (b) {
      s(`Import failed: ${b.message}`);
    }
  };
  return /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsx("div", { className: "char-grid", children: (a?.characters ?? []).map((m) => /* @__PURE__ */ u.jsxs("button", { type: "button", className: `char-option${m.id === a?.characterId ? " active" : ""}`, title: m.id, onClick: () => {
      f(m.id);
    }, children: [
      /* @__PURE__ */ u.jsx("span", { className: "char-option-name", children: m.name }),
      m.promptOnly && /* @__PURE__ */ u.jsx("span", { className: "badge", children: "prompt only" })
    ] }, m.id)) }),
    /* @__PURE__ */ u.jsxs("div", { className: "row end", style: { marginTop: 16 }, children: [
      /* @__PURE__ */ u.jsx("input", { ref: o, type: "file", accept: ".zip,application/zip", hidden: !0, onChange: (m) => {
        const g = m.target.files?.[0];
        m.target.value = "", g && h(g);
      } }),
      /* @__PURE__ */ u.jsxs("button", { type: "button", className: "button", onClick: () => o.current?.click(), children: [
        /* @__PURE__ */ u.jsx(ih, {}),
        "Import pack…"
      ] }),
      /* @__PURE__ */ u.jsxs("a", { className: "button", href: dt("/character/export"), download: `${a?.characterId ?? "character"}.zip`, children: [
        /* @__PURE__ */ u.jsx(f2, {}),
        "Export pack"
      ] })
    ] })
  ] });
}
function rT({ config: a, manifest: s, preview: r, setPreview: o, reload: f, notify: h }) {
  const m = S.useRef(null), g = S.useRef(""), b = async (x, v) => {
    const p = (v.name.split(".").pop() ?? "").toLowerCase(), N = sT[p] ?? v.type;
    if (!N) {
      h(`Unsupported file: ${v.name}`);
      return;
    }
    h(`Uploading ${v.name} as ${x}…`);
    try {
      const j = await fetch(dt(`/character/asset?state=${encodeURIComponent(x)}`), { method: "PUT", headers: { "content-type": N }, body: v });
      if (!j.ok) throw new Error(await j.text());
      h(`Saved ${v.name} as ${x}.`), f();
    } catch (j) {
      h(`Upload failed: ${j.message}`);
    }
  };
  return /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsx("div", { className: "row between", children: /* @__PURE__ */ u.jsx(Pa, { label: "Preview on stage", children: /* @__PURE__ */ u.jsxs("select", { className: "input", value: r ?? "auto", onChange: (x) => o(x.target.value === "auto" ? null : x.target.value), children: [
      /* @__PURE__ */ u.jsx("option", { value: "auto", children: "Follow the conversation" }),
      lT.map((x) => /* @__PURE__ */ u.jsx("option", { value: x, children: Ec[x] }, x))
    ] }) }) }),
    /* @__PURE__ */ u.jsx("div", { className: "g-grid", children: a.assets.map((x) => {
      const v = !!(x.image || x.video), p = v ? { video: x.video && dt(`/character/${encodeURIComponent(x.video)}`), image: x.image && dt(`/character/${encodeURIComponent(x.image)}`) } : { video: s.states[x.state]?.video && dt(s.states[x.state].video), image: s.states[x.state]?.image && dt(s.states[x.state].image) };
      return /* @__PURE__ */ u.jsxs(
        "div",
        {
          className: `g-tile${v ? "" : " borrowed"}${p.video || p.image ? "" : " missing"}`,
          onClick: () => {
            s.states[x.state] && o(x.state);
          },
          onDragOver: (N) => {
            N.preventDefault(), N.currentTarget.classList.add("drop");
          },
          onDragLeave: (N) => N.currentTarget.classList.remove("drop"),
          onDrop: (N) => {
            N.preventDefault(), N.currentTarget.classList.remove("drop");
            const j = N.dataTransfer.files[0];
            j && b(x.state, j);
          },
          children: [
            p.video ? /* @__PURE__ */ u.jsx("video", { src: p.video, muted: !0, loop: !0, playsInline: !0, autoPlay: !0 }) : p.image ? /* @__PURE__ */ u.jsx("img", { src: p.image, alt: "" }) : /* @__PURE__ */ u.jsx("div", { className: "g-none" }),
            /* @__PURE__ */ u.jsxs("div", { className: "g-cap", children: [
              /* @__PURE__ */ u.jsx("span", { children: Ec[x.state] }),
              /* @__PURE__ */ u.jsx("span", { className: "g-sub", children: v ? [x.video, x.image].filter(Boolean).join(" · ") : x.fallback ? `← ${Ec[x.fallback] ?? x.fallback}` : "missing" })
            ] }),
            /* @__PURE__ */ u.jsx("button", { type: "button", className: "icon-button small g-up", title: `Upload a .png or .mp4 for ${x.state}`, onClick: (N) => {
              N.stopPropagation(), g.current = x.state, m.current?.click();
            }, children: /* @__PURE__ */ u.jsx(ih, {}) })
          ]
        },
        x.state
      );
    }) }),
    /* @__PURE__ */ u.jsx("input", { ref: m, type: "file", accept: ".png,.webp,.jpg,.jpeg,.mp4,.webm", hidden: !0, onChange: (x) => {
      const v = x.target.files?.[0];
      x.target.value = "", v && b(g.current, v);
    } }),
    /* @__PURE__ */ u.jsx("p", { className: "field-hint", children: "Click a tile to show that state on stage. Drop a .png or .mp4 onto a tile, or use its upload button, to replace it. Dimmed tiles borrow another state's file." })
  ] });
}
function oT({ config: a, lang: s, setConfig: r, notify: o, onManifestChange: f }) {
  const [h, m] = S.useState(a.name), [g, b] = S.useState(a.persona), [x, v] = S.useState(String(a.playbackRate || 1)), [p, N] = S.useState(!1), j = async (T) => {
    T.preventDefault(), N(!0);
    try {
      const U = await gl("/character/config", { name: h, persona: g, playbackRate: Number(x) || 1 });
      r(U), f({ characterName: U.name, playbackRate: U.playbackRate }), o("Saved. The new persona applies from the next reply.");
    } catch (U) {
      o(`Save failed: ${U.message}`);
    } finally {
      N(!1);
    }
  };
  return /* @__PURE__ */ u.jsxs("form", { className: "form", onSubmit: (T) => {
    j(T);
  }, children: [
    /* @__PURE__ */ u.jsx(Pa, { label: "Name", children: /* @__PURE__ */ u.jsx("input", { className: "input", value: h, onChange: (T) => m(T.target.value), spellCheck: !1 }) }),
    /* @__PURE__ */ u.jsx(Pa, { label: "Persona", children: /* @__PURE__ */ u.jsx("textarea", { className: "input", rows: 10, value: g, onChange: (T) => b(T.target.value) }) }),
    /* @__PURE__ */ u.jsx(Pa, { label: "Artwork playback speed", children: /* @__PURE__ */ u.jsx("input", { className: "input narrow", type: "number", min: "0.25", max: "4", step: "0.05", value: x, onChange: (T) => v(T.target.value) }) }),
    a.promptOnly && a.art && /* @__PURE__ */ u.jsxs("details", { className: "details", children: [
      /* @__PURE__ */ u.jsx("summary", { children: "Image prompts for this pack" }),
      /* @__PURE__ */ u.jsxs("p", { className: "field-hint", children: [
        "This pack has no images yet. Generate them with any image model and drop files named after each state into ",
        /* @__PURE__ */ u.jsx("code", { children: a.userDir }),
        "."
      ] }),
      /* @__PURE__ */ u.jsx(Pa, { label: "Base image", children: /* @__PURE__ */ u.jsx("textarea", { className: "input", rows: 4, readOnly: !0, value: a.art.base ?? "" }) }),
      /* @__PURE__ */ u.jsx(Pa, { label: "State deltas", children: /* @__PURE__ */ u.jsx("textarea", { className: "input", rows: 5, readOnly: !0, value: Object.entries(a.art.expressions ?? {}).map(([T, U]) => `${T}: ${U}`).join(`
`) }) }),
      /* @__PURE__ */ u.jsx(Pa, { label: "Motion", children: /* @__PURE__ */ u.jsx("textarea", { className: "input", rows: 2, readOnly: !0, value: a.art.motion ?? "" }) })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "row between", children: [
      /* @__PURE__ */ u.jsx("span", { className: "field-hint", children: a.bundled ? `Bundled pack. Saving copies it to ${a.userDir}` : a.dir }),
      /* @__PURE__ */ u.jsx("button", { type: "submit", className: "button primary", disabled: p, children: p ? "Saving…" : "Save" })
    ] })
  ] });
}
function fT({ open: a, onOpenChange: s, entries: r, setEntries: o, notify: f }) {
  const [h, m] = S.useState(""), g = S.useRef(null);
  S.useEffect(() => {
    a && (yl("/memory").then((v) => o(v.entries)).catch((v) => f(`Could not load memory: ${v.message}`)), window.setTimeout(() => g.current?.focus(), 50));
  }, [a]);
  const b = async (v) => {
    try {
      o((await gl("/memory", { entries: v })).entries);
    } catch (p) {
      f(`Save failed: ${p.message}`);
    }
  }, x = async () => {
    const v = h.trim();
    v !== "" && (m(""), await b([...r, { date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), text: v }]));
  };
  return /* @__PURE__ */ u.jsxs(
    Dr,
    {
      open: a,
      onOpenChange: s,
      title: "Memory",
      subtitle: "Notes about you. Every character shares them, and they survive switching packs.",
      footer: /* @__PURE__ */ u.jsxs("form", { className: "row", onSubmit: (v) => {
        v.preventDefault(), v.nativeEvent.isComposing || x();
      }, children: [
        /* @__PURE__ */ u.jsx("input", { ref: g, className: "input", value: h, onChange: (v) => m(v.target.value), placeholder: "Remember something…", spellCheck: !1 }),
        /* @__PURE__ */ u.jsx("button", { type: "submit", className: "button primary", disabled: h.trim() === "", children: "Add" })
      ] }),
      children: [
        r.length === 0 && /* @__PURE__ */ u.jsx("p", { className: "empty", children: "Nothing remembered yet." }),
        /* @__PURE__ */ u.jsx("ul", { className: "mem-list", children: r.map((v, p) => /* @__PURE__ */ u.jsx(dT, { entry: v, onChange: (N) => {
          b(r.map((j, T) => T === p ? { ...j, text: N } : j));
        }, onDrop: () => {
          b(r.filter((N, j) => j !== p));
        } }, `${v.date}-${p}`)) })
      ]
    }
  );
}
function dT({ entry: a, onChange: s, onDrop: r }) {
  const [o, f] = S.useState(a.text);
  S.useEffect(() => f(a.text), [a.text]);
  const h = () => {
    const m = o.trim();
    if (m === "") {
      f(a.text);
      return;
    }
    m !== a.text && s(m);
  };
  return /* @__PURE__ */ u.jsxs("li", { className: "mem-row", children: [
    /* @__PURE__ */ u.jsx("span", { className: "mem-date", children: a.date }),
    /* @__PURE__ */ u.jsx(
      "input",
      {
        className: "mem-fact",
        value: o,
        spellCheck: !1,
        onChange: (m) => f(m.target.value),
        onBlur: h,
        onKeyDown: (m) => {
          m.key === "Enter" && (m.preventDefault(), m.target.blur()), m.key === "Escape" && (m.preventDefault(), f(a.text), m.target.blur());
        }
      }
    ),
    /* @__PURE__ */ u.jsx("button", { type: "button", className: "icon-button small", title: "Forget this", "aria-label": "Forget this", onClick: r, children: /* @__PURE__ */ u.jsx(li, {}) })
  ] });
}
function hT({ open: a, onOpenChange: s, lists: r, setLists: o, openId: f, notify: h }) {
  const [m, g] = S.useState(null), [b, x] = S.useState(!1);
  S.useEffect(() => {
    a && yl("/lists").then((j) => o(j.lists)).catch((j) => h(`Could not load lists: ${j.message}`));
  }, [a]), S.useEffect(() => {
    a && f && (g(f), x(!1));
  }, [a, f]), S.useEffect(() => {
    m !== null && r.some((j) => j.id === m) || g(r[0]?.id ?? null);
  }, [r, m]);
  const v = async (j) => {
    try {
      return o((await gl("/lists", j)).lists), !0;
    } catch (T) {
      return h(`Could not update the list: ${T.message}`), !1;
    }
  }, p = b ? null : r.find((j) => j.id === m) ?? null, N = [...r].sort((j, T) => T.updatedAt.localeCompare(j.updatedAt));
  return /* @__PURE__ */ u.jsx(Ar, { open: a, onOpenChange: s, children: /* @__PURE__ */ u.jsxs(kr, { children: [
    /* @__PURE__ */ u.jsx(Cr, { className: "panel-overlay" }),
    /* @__PURE__ */ u.jsxs(Or, { className: "panel full lists", "aria-describedby": void 0, onOpenAutoFocus: (j) => j.preventDefault(), children: [
      /* @__PURE__ */ u.jsxs("aside", { className: "src-side", children: [
        /* @__PURE__ */ u.jsxs("div", { className: "src-side-head", children: [
          /* @__PURE__ */ u.jsx(Rr, { className: "panel-title", children: "Lists" }),
          /* @__PURE__ */ u.jsx("p", { className: "panel-subtitle", children: "Things worth coming back to." })
        ] }),
        /* @__PURE__ */ u.jsxs("nav", { className: "src-nav", children: [
          N.map((j) => {
            const T = j.items.filter((U) => !U.done).length;
            return /* @__PURE__ */ u.jsxs("button", { type: "button", className: `src-item${j.id === m && !b ? " active" : ""}`, onClick: () => {
              g(j.id), x(!1);
            }, children: [
              /* @__PURE__ */ u.jsx("span", { className: "src-icon", children: /* @__PURE__ */ u.jsx(_c, {}) }),
              /* @__PURE__ */ u.jsxs("span", { className: "src-text", children: [
                /* @__PURE__ */ u.jsx("b", { children: j.title }),
                /* @__PURE__ */ u.jsx("small", { children: j.items.length === 0 ? "Empty" : T === 0 ? `All ${j.items.length} done` : `${T} open${j.items.length - T > 0 ? ` · ${j.items.length - T} done` : ""}` })
              ] })
            ] }, j.id);
          }),
          /* @__PURE__ */ u.jsxs("button", { type: "button", className: `src-item new${b ? " active" : ""}`, onClick: () => x(!0), children: [
            /* @__PURE__ */ u.jsx("span", { className: "src-icon", children: /* @__PURE__ */ u.jsx(C2, {}) }),
            /* @__PURE__ */ u.jsx("span", { className: "src-text", children: /* @__PURE__ */ u.jsx("b", { children: "New list" }) })
          ] })
        ] }),
        /* @__PURE__ */ u.jsx("p", { className: "src-side-foot", children: "She adds to these as you talk. Ask her to keep track of anything." })
      ] }),
      /* @__PURE__ */ u.jsxs("section", { className: "src-main", children: [
        /* @__PURE__ */ u.jsx(Mr, { className: "icon-button src-close", "aria-label": "Close", children: /* @__PURE__ */ u.jsx(li, {}) }),
        b || r.length === 0 ? /* @__PURE__ */ u.jsx(mT, { onCreate: async (j) => {
          await v({ action: "create", title: j }) && x(!1);
        } }) : p && /* @__PURE__ */ u.jsx(pT, { list: p, act: v, onDeleted: () => g(null) }, p.id)
      ] })
    ] })
  ] }) });
}
function mT({ onCreate: a }) {
  const [s, r] = S.useState(""), o = S.useRef(null);
  S.useEffect(() => {
    window.setTimeout(() => o.current?.focus(), 50);
  }, []);
  const f = async () => {
    const h = s.trim();
    h !== "" && (await a(h), r(""));
  };
  return /* @__PURE__ */ u.jsxs("div", { className: "src-empty", children: [
    /* @__PURE__ */ u.jsx(_c, {}),
    /* @__PURE__ */ u.jsx("p", { children: "Start a list" }),
    /* @__PURE__ */ u.jsx("p", { className: "field-hint", children: "Dramas to watch, gifts to consider, things to pack. She can add to it later." }),
    /* @__PURE__ */ u.jsxs("form", { className: "row new-list", onSubmit: (h) => {
      h.preventDefault(), h.nativeEvent.isComposing || f();
    }, children: [
      /* @__PURE__ */ u.jsx("input", { ref: o, className: "input", value: s, placeholder: "List title", spellCheck: !1, onChange: (h) => r(h.target.value) }),
      /* @__PURE__ */ u.jsx("button", { type: "submit", className: "button primary", disabled: s.trim() === "", children: "Create" })
    ] })
  ] });
}
function pT({ list: a, act: s, onDeleted: r }) {
  const [o, f] = S.useState(""), [h, m] = S.useState(!1), g = a.items.filter((p) => !p.done), b = a.items.filter((p) => p.done), x = async () => {
    const p = o.trim();
    p !== "" && (f(""), await s({ action: "add", list: a.id, text: p }) || f(p));
  }, v = async () => {
    window.confirm(`Delete "${a.title}"? This cannot be undone.`) && await s({ action: "delete", list: a.id }) && r();
  };
  return /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsxs("header", { className: "src-head", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "src-head-text", children: [
        /* @__PURE__ */ u.jsx(gT, { value: a.title, onChange: (p) => {
          s({ action: "rename", list: a.id, title: p });
        } }),
        /* @__PURE__ */ u.jsx(yT, { value: a.description ?? "", placeholder: "Add a description", onChange: (p) => {
          s({ action: "rename", list: a.id, description: p });
        } })
      ] }),
      /* @__PURE__ */ u.jsx("div", { className: "src-head-actions", children: /* @__PURE__ */ u.jsx("button", { type: "button", className: "icon-button", title: "Delete list", "aria-label": "Delete list", onClick: () => {
        v();
      }, children: /* @__PURE__ */ u.jsx(Qy, {}) }) })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "src-body", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "rem-add", children: [
        /* @__PURE__ */ u.jsx("input", { className: "input", value: o, placeholder: "Add an item…", spellCheck: !1, onChange: (p) => f(p.target.value), onKeyDown: (p) => {
          p.key === "Enter" && !p.nativeEvent.isComposing && (p.preventDefault(), x());
        } }),
        /* @__PURE__ */ u.jsx("button", { type: "button", className: "button primary", disabled: o.trim() === "", onClick: () => {
          x();
        }, children: "Add" })
      ] }),
      a.items.length === 0 && /* @__PURE__ */ u.jsx("p", { className: "rem-empty", children: "Nothing here yet." }),
      g.length > 0 && /* @__PURE__ */ u.jsx("ul", { className: "rem-list", children: g.map((p) => /* @__PURE__ */ u.jsx(by, { item: p, list: a, act: s }, p.id)) }),
      b.length > 0 && /* @__PURE__ */ u.jsxs("section", { className: "rem-group", children: [
        /* @__PURE__ */ u.jsxs("button", { type: "button", className: "text-button done-toggle", onClick: () => m((p) => !p), children: [
          h ? "Hide" : "Show",
          " ",
          b.length,
          " done"
        ] }),
        h && /* @__PURE__ */ u.jsx("ul", { className: "rem-list", children: b.map((p) => /* @__PURE__ */ u.jsx(by, { item: p, list: a, act: s }, p.id)) })
      ] })
    ] })
  ] });
}
function by({ item: a, list: s, act: r }) {
  const [o, f] = S.useState(a.text), [h, m] = S.useState(a.note ?? "");
  S.useEffect(() => {
    f(a.text), m(a.note ?? "");
  }, [a.text, a.note]);
  const g = (p) => {
    r({ action: "item", list: s.id, item: a.id, ...p });
  }, b = () => {
    const p = o.trim();
    if (p === "") {
      f(a.text);
      return;
    }
    p !== a.text && g({ text: p });
  }, x = () => {
    const p = h.trim();
    p !== (a.note ?? "") && g({ note: p });
  }, v = (p, N) => (j) => {
    j.key === "Enter" && (j.preventDefault(), j.target.blur()), j.key === "Escape" && (j.preventDefault(), N(), j.target.blur());
  };
  return /* @__PURE__ */ u.jsxs("li", { className: `rem-row list-row${a.done ? " done" : ""}`, children: [
    /* @__PURE__ */ u.jsx("button", { type: "button", className: `rem-check${a.done ? " checked" : ""}`, title: a.done ? "Mark not done" : "Mark done", onClick: () => g({ done: !a.done }), children: /* @__PURE__ */ u.jsx(os, {}) }),
    /* @__PURE__ */ u.jsxs("span", { className: "rem-text", children: [
      /* @__PURE__ */ u.jsx("input", { className: "list-text", value: o, spellCheck: !1, onChange: (p) => f(p.target.value), onBlur: b, onKeyDown: v(b, () => f(a.text)) }),
      /* @__PURE__ */ u.jsx("input", { className: "list-note", value: h, placeholder: "Note", spellCheck: !1, onChange: (p) => m(p.target.value), onBlur: x, onKeyDown: v(x, () => m(a.note ?? "")) })
    ] }),
    /* @__PURE__ */ u.jsx("button", { type: "button", className: "icon-button small list-remove", title: "Remove", "aria-label": "Remove", onClick: () => g({ remove: !0 }), children: /* @__PURE__ */ u.jsx(li, {}) })
  ] });
}
function gT({ value: a, onChange: s }) {
  const [r, o] = S.useState(a);
  S.useEffect(() => o(a), [a]);
  const f = () => {
    const h = r.trim();
    if (h === "") {
      o(a);
      return;
    }
    h !== a && s(h);
  };
  return /* @__PURE__ */ u.jsx(
    "input",
    {
      className: "list-title",
      value: r,
      spellCheck: !1,
      onChange: (h) => o(h.target.value),
      onBlur: f,
      onKeyDown: (h) => {
        h.key === "Enter" && (h.preventDefault(), h.target.blur()), h.key === "Escape" && (o(a), h.target.blur());
      }
    }
  );
}
function yT({ value: a, placeholder: s, onChange: r }) {
  const [o, f] = S.useState(a);
  S.useEffect(() => f(a), [a]);
  const h = () => {
    const m = o.trim();
    m !== a && r(m);
  };
  return /* @__PURE__ */ u.jsx(
    "input",
    {
      className: "list-desc",
      value: o,
      placeholder: s,
      spellCheck: !1,
      onChange: (m) => f(m.target.value),
      onBlur: h,
      onKeyDown: (m) => {
        m.key === "Enter" && (m.preventDefault(), m.target.blur()), m.key === "Escape" && (f(a), m.target.blur());
      }
    }
  );
}
const vT = 4096;
function bT({ open: a, onOpenChange: s, artifacts: r, setArtifacts: o, openId: f, notify: h }) {
  const [m, g] = S.useState(null);
  S.useEffect(() => {
    a && (g(f), yl("/artifacts").then((N) => o(N.artifacts)).catch((N) => h(`Could not load files: ${N.message}`)));
  }, [a, f]);
  const b = m === null ? void 0 : r.find((N) => N.id === m), x = [...r].reverse(), v = x.filter((N) => N.kind !== "other" && N.exists !== !1), p = x.filter((N) => N.kind === "other" || N.exists === !1);
  return /* @__PURE__ */ u.jsx(
    Dr,
    {
      open: a,
      onOpenChange: s,
      wide: !0,
      title: b ? /* @__PURE__ */ u.jsxs("button", { type: "button", className: "text-button back", onClick: () => g(null), children: [
        /* @__PURE__ */ u.jsx(Wx, {}),
        "All files"
      ] }) : "Files",
      subtitle: b ? void 0 : "Every file she wrote for you. The file stays where it is; this is just a way to open it.",
      children: b ? /* @__PURE__ */ u.jsx(xT, { artifact: b, onForget: async () => {
        try {
          o((await yl(`/artifact/${encodeURIComponent(b.id)}`, { method: "DELETE" })).artifacts), g(null);
        } catch (N) {
          h(`Could not remove: ${N.message}`);
        }
      }, notify: h }) : /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        r.length === 0 && /* @__PURE__ */ u.jsx("p", { className: "empty", children: "Nothing written yet." }),
        /* @__PURE__ */ u.jsxs("div", { className: "art-grid", children: [
          v.map((N) => /* @__PURE__ */ u.jsx(xy, { item: N, onOpen: () => g(N.id) }, N.id)),
          p.length > 0 && /* @__PURE__ */ u.jsx("div", { className: "art-strip", children: p.map((N) => /* @__PURE__ */ u.jsx(xy, { item: N, compact: !0, onOpen: () => g(N.id) }, N.id)) })
        ] })
      ] })
    }
  );
}
function l1(a, s = !1) {
  return [a.description ? a.name : "", n1(a), a.exists === !1 ? "missing" : typeof a.size == "number" ? t1(a.size) : "", s ? iT(a.at) : "", s && a.source === "presented" ? "delivered" : ""].filter(Boolean).join(" · ");
}
function xy({ item: a, compact: s, onOpen: r }) {
  const [o, f] = S.useState(null), h = dt(`/artifact/${encodeURIComponent(a.id)}`), m = a.kind === "markdown" || a.kind === "text";
  S.useEffect(() => {
    if (s || !m) return;
    let b = !0;
    return fetch(`${h}${h.includes("?") ? "&" : "?"}head=${vT}`).then((x) => x.ok ? x.text() : Promise.reject(new Error())).then((x) => {
      b && f(x);
    }).catch(() => {
    }), () => {
      b = !1;
    };
  }, [h, s, m]);
  const g = a.exists === !1 ? p2 : a.kind === "image" ? wr : $y;
  return /* @__PURE__ */ u.jsxs("div", { role: "button", tabIndex: 0, className: `art-card${s ? " compact" : ""}${a.exists === !1 ? " missing" : ""}`, title: a.path, onClick: r, onKeyDown: (b) => {
    (b.key === "Enter" || b.key === " ") && (b.preventDefault(), r());
  }, children: [
    /* @__PURE__ */ u.jsx("div", { className: "art-thumb", children: !s && a.kind === "image" ? /* @__PURE__ */ u.jsx("img", { src: h, alt: "", loading: "lazy" }) : !s && o !== null ? a.kind === "markdown" ? /* @__PURE__ */ u.jsx("div", { className: "art-thumb-page", dangerouslySetInnerHTML: { __html: mh(o) } }) : /* @__PURE__ */ u.jsx("div", { className: "art-thumb-page", children: /* @__PURE__ */ u.jsx("pre", { children: o }) }) : /* @__PURE__ */ u.jsx(g, { className: "art-icon" }) }),
    /* @__PURE__ */ u.jsxs("div", { className: "art-foot", children: [
      /* @__PURE__ */ u.jsx("p", { className: "art-name", children: a.description ?? a.name }),
      /* @__PURE__ */ u.jsx("p", { className: "art-meta", children: l1(a) })
    ] })
  ] });
}
function xT({ artifact: a, onForget: s, notify: r }) {
  const [o, f] = S.useState(null), [h, m] = S.useState(!1), g = dt(`/artifact/${encodeURIComponent(a.id)}`);
  S.useEffect(() => {
    if (f(null), a.kind === "image" || a.kind === "other") return;
    let v = !0;
    return fetch(g).then(async (p) => {
      if (p.status === 404) throw new Error("The file is no longer where it was.");
      if (!p.ok) throw new Error(await p.text());
      const N = await p.text();
      v && f(a.kind === "markdown" ? { html: mh(N) } : { text: N });
    }).catch((p) => {
      v && f({ error: p.message });
    }), () => {
      v = !1;
    };
  }, [g, a.kind]);
  const b = async () => {
    const v = await fetch(dt(`/artifact/${encodeURIComponent(a.id)}/reveal`), { method: "POST" });
    r(v.ok ? "Shown in Finder." : "The file is no longer where it was.");
  }, x = async () => {
    try {
      await navigator.clipboard.writeText(a.path), m(!0), window.setTimeout(() => m(!1), 1500);
    } catch {
      r(a.path);
    }
  };
  return /* @__PURE__ */ u.jsxs("div", { className: "file-view", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "file-head", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "file-titles", children: [
        /* @__PURE__ */ u.jsx("p", { className: "file-name", children: a.description ?? a.name }),
        /* @__PURE__ */ u.jsx("p", { className: "file-meta", children: l1(a, !0) }),
        /* @__PURE__ */ u.jsx("p", { className: "file-path", children: a.path })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ u.jsxs("button", { type: "button", className: "button", onClick: () => {
          b();
        }, children: [
          /* @__PURE__ */ u.jsx(Gy, {}),
          "Reveal"
        ] }),
        /* @__PURE__ */ u.jsxs("button", { type: "button", className: "button", onClick: () => {
          x();
        }, children: [
          h ? /* @__PURE__ */ u.jsx(os, {}) : /* @__PURE__ */ u.jsx(th, {}),
          h ? "Copied" : "Copy path"
        ] }),
        /* @__PURE__ */ u.jsxs("button", { type: "button", className: "button", onClick: () => {
          s();
        }, children: [
          /* @__PURE__ */ u.jsx(Qy, {}),
          "Remove"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "file-body", children: [
      a.kind === "image" && /* @__PURE__ */ u.jsx("img", { className: "file-image", src: g, alt: a.name }),
      a.kind === "other" && /* @__PURE__ */ u.jsx("p", { className: "empty", children: "This kind of file cannot be shown here. Use Reveal to find it." }),
      o?.error && /* @__PURE__ */ u.jsx("p", { className: "empty", children: o.error }),
      o?.html !== void 0 && /* @__PURE__ */ u.jsx("div", { className: "prose", dangerouslySetInnerHTML: { __html: o.html } }),
      o?.text !== void 0 && /* @__PURE__ */ u.jsx("pre", { className: "file-pre", children: o.text }),
      o === null && a.kind !== "image" && a.kind !== "other" && /* @__PURE__ */ u.jsx("p", { className: "empty", children: "Loading…" })
    ] })
  ] });
}
const ST = [
  ["/new", "Start a fresh session (the old one stays in dsh web)"],
  ["/char [id]", "Switch character, or open the picker"],
  ["/edit", "Edit persona and greeting"],
  ["/memory", "What she remembers about you"],
  ["/files", "Files she wrote for you"],
  ["/lists", "Lists she keeps for you"],
  ["/data", "Connectors: what she can see (calendar, reminders, weather, health)"],
  ["/gallery", "Browse artwork and loops"],
  ["/voice", "Toggle voice playback"],
  ["/help", "This list"]
], NT = [
  [["Enter"], "Send"],
  [["Shift", "Enter"], "New line"],
  [["/", "、"], "Focus the input"],
  [["Esc"], "Leave the input / close a panel"],
  [["⌥", "M"], "Memory"],
  [["⌥", "F"], "Files"],
  [["⌥", "L"], "Lists"],
  [["⌥", "D"], "Connectors"],
  [["⌥", "C"], "Character"],
  [["⌥", "S"], "Settings"],
  [["⌥", "V"], "Voice on / off"],
  [["⌥", "R"], "Replay the last line"],
  [["⌥", "/"], "Help"]
];
function a1() {
  return /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsx("p", { className: "field-hint", style: { marginBottom: 14 }, children: "Slash commands go in the message box. ⌥ shortcuts work anywhere, even mid-sentence." }),
    /* @__PURE__ */ u.jsx("h3", { className: "section", children: "Commands" }),
    /* @__PURE__ */ u.jsx("dl", { className: "help-list", children: ST.map(([a, s]) => /* @__PURE__ */ u.jsxs(S.Fragment, { children: [
      /* @__PURE__ */ u.jsx("dt", { children: /* @__PURE__ */ u.jsx("code", { children: a }) }),
      /* @__PURE__ */ u.jsx("dd", { children: s })
    ] }, a)) }),
    /* @__PURE__ */ u.jsx("h3", { className: "section", children: "Keyboard" }),
    /* @__PURE__ */ u.jsx("dl", { className: "help-list", children: NT.map(([a, s]) => /* @__PURE__ */ u.jsxs(S.Fragment, { children: [
      /* @__PURE__ */ u.jsx("dt", { children: a.map((r) => /* @__PURE__ */ u.jsx("kbd", { children: r }, r)) }),
      /* @__PURE__ */ u.jsx("dd", { children: s })
    ] }, s)) })
  ] });
}
function ET({ open: a, onOpenChange: s }) {
  return /* @__PURE__ */ u.jsx(Dr, { open: a, onOpenChange: s, title: "Help", children: /* @__PURE__ */ u.jsx(a1, {}) });
}
const Sy = {
  key_required: "Enter an API key first",
  voice_required: "Enter a voice ID",
  auth_error: "Invalid key or permission. Check account and region.",
  quota_error: "Quota or rate limit reached",
  network_error: "Cannot reach the provider or local engine",
  timeout: "Speech request timed out",
  local_unavailable: "Local system voice unavailable",
  invalid_text: "No speakable text, or text too long",
  invalid_settings: "Invalid voice settings",
  invalid_audio: "No valid audio returned",
  config_error: "Cannot read voice configuration",
  speech_error: "Speech failed. Please retry.",
  provider_error: "Request rejected. Check model, voice and account quota."
}, Ll = (a) => {
  const [s, r] = String(a).split(":");
  return (Sy[s] ?? Sy.speech_error) + (r ? ` (${r})` : "");
}, TT = { zh: "你好，我是小黑鱼。今天想和我聊些什么呢？", en: "Hello, I am here. What would you like to talk about today?", ja: "こんにちは。今日はどんなお話をしましょうか。" }, bc = { zh: "中文", en: "English", ja: "日本語" };
function jT({ open: a, onOpenChange: s, theme: r, setTheme: o, voiceOn: f, setVoiceOn: h, speechPref: m, setSpeechPref: g, speechLang: b, onNewSession: x, stopVoice: v }) {
  const [p, N] = S.useState("general"), j = [
    { id: "general", label: "General", hint: "Appearance and session", icon: M2 },
    { id: "voice", label: "Voice", hint: "Read aloud and the speech provider", icon: w2 },
    { id: "help", label: "Help", hint: "Commands and shortcuts", icon: a2 }
  ];
  return /* @__PURE__ */ u.jsx(Ar, { open: a, onOpenChange: s, children: /* @__PURE__ */ u.jsxs(kr, { children: [
    /* @__PURE__ */ u.jsx(Cr, { className: "panel-overlay" }),
    /* @__PURE__ */ u.jsxs(Or, { className: "panel full settings", "aria-describedby": void 0, onOpenAutoFocus: (T) => T.preventDefault(), children: [
      /* @__PURE__ */ u.jsxs("aside", { className: "src-side", children: [
        /* @__PURE__ */ u.jsxs("div", { className: "src-side-head", children: [
          /* @__PURE__ */ u.jsx(Rr, { className: "panel-title", children: "Settings" }),
          /* @__PURE__ */ u.jsx("p", { className: "panel-subtitle", children: "How the room looks and sounds." })
        ] }),
        /* @__PURE__ */ u.jsx("nav", { className: "src-nav", children: j.map((T) => {
          const U = T.icon;
          return /* @__PURE__ */ u.jsxs("button", { type: "button", className: `src-item${p === T.id ? " active" : ""}`, onClick: () => N(T.id), children: [
            /* @__PURE__ */ u.jsx("span", { className: "src-icon", children: /* @__PURE__ */ u.jsx(U, {}) }),
            /* @__PURE__ */ u.jsxs("span", { className: "src-text", children: [
              /* @__PURE__ */ u.jsx("b", { children: T.label }),
              /* @__PURE__ */ u.jsx("small", { children: T.hint })
            ] })
          ] }, T.id);
        }) })
      ] }),
      /* @__PURE__ */ u.jsxs("section", { className: "src-main", children: [
        /* @__PURE__ */ u.jsx(Mr, { className: "icon-button src-close", "aria-label": "Close", children: /* @__PURE__ */ u.jsx(li, {}) }),
        /* @__PURE__ */ u.jsx("header", { className: "src-head", children: /* @__PURE__ */ u.jsxs("div", { className: "src-titles", children: [
          /* @__PURE__ */ u.jsx("h2", { children: j.find((T) => T.id === p)?.label }),
          /* @__PURE__ */ u.jsx("p", { className: "source-summary", children: j.find((T) => T.id === p)?.hint })
        ] }) }),
        /* @__PURE__ */ u.jsxs("div", { className: "src-body", children: [
          p === "general" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
            /* @__PURE__ */ u.jsxs("div", { className: "settings-group", children: [
              /* @__PURE__ */ u.jsx("h3", { className: "section", children: "Appearance" }),
              /* @__PURE__ */ u.jsx("div", { className: "settings-rows", children: /* @__PURE__ */ u.jsxs("div", { className: "setting", children: [
                /* @__PURE__ */ u.jsxs("span", { children: [
                  /* @__PURE__ */ u.jsx("b", { children: "Theme" }),
                  /* @__PURE__ */ u.jsx("small", { children: "System follows macOS and switches with it." })
                ] }),
                /* @__PURE__ */ u.jsx("span", { className: "seg", role: "tablist", children: ["system", "light", "dark"].map((T) => /* @__PURE__ */ u.jsx("button", { type: "button", role: "tab", "aria-selected": r === T, className: r === T ? "active" : "", onClick: () => o(T), children: T === "system" ? "System" : T === "light" ? "Light" : "Dark" }, T)) })
              ] }) })
            ] }),
            /* @__PURE__ */ u.jsxs("div", { className: "settings-group", children: [
              /* @__PURE__ */ u.jsx("h3", { className: "section", children: "Session" }),
              /* @__PURE__ */ u.jsx("div", { className: "settings-rows", children: /* @__PURE__ */ u.jsxs("div", { className: "setting", children: [
                /* @__PURE__ */ u.jsxs("span", { children: [
                  /* @__PURE__ */ u.jsx("b", { children: "Start over" }),
                  /* @__PURE__ */ u.jsx("small", { children: "Opens an empty conversation. The current one stays in dsh web." })
                ] }),
                /* @__PURE__ */ u.jsx("button", { type: "button", className: "button", onClick: () => {
                  x(), s(!1);
                }, children: "New session" })
              ] }) })
            ] })
          ] }),
          p === "voice" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
            /* @__PURE__ */ u.jsxs("div", { className: "settings-group", children: [
              /* @__PURE__ */ u.jsx("h3", { className: "section", children: "Playback" }),
              /* @__PURE__ */ u.jsxs("div", { className: "settings-rows", children: [
                /* @__PURE__ */ u.jsxs("label", { className: "setting", children: [
                  /* @__PURE__ */ u.jsxs("span", { children: [
                    /* @__PURE__ */ u.jsx("b", { children: "Read replies aloud" }),
                    /* @__PURE__ */ u.jsx("small", { children: "Each reply is spoken with the provider set below." })
                  ] }),
                  /* @__PURE__ */ u.jsx("input", { type: "checkbox", className: "switch", checked: f, onChange: (T) => h(T.target.checked) })
                ] }),
                /* @__PURE__ */ u.jsxs("label", { className: "setting", children: [
                  /* @__PURE__ */ u.jsxs("span", { children: [
                    /* @__PURE__ */ u.jsx("b", { children: "Speech language" }),
                    /* @__PURE__ */ u.jsx("small", { children: "Replies are rewritten into this language before they are read." })
                  ] }),
                  /* @__PURE__ */ u.jsx("span", { className: "control", children: /* @__PURE__ */ u.jsxs("select", { className: "input short", value: m, onChange: (T) => g(T.target.value), children: [
                    /* @__PURE__ */ u.jsx("option", { value: "auto", children: "Follow the browser" }),
                    /* @__PURE__ */ u.jsx("option", { value: "zh", children: "中文" }),
                    /* @__PURE__ */ u.jsx("option", { value: "en", children: "English" }),
                    /* @__PURE__ */ u.jsx("option", { value: "ja", children: "日本語" })
                  ] }) })
                ] })
              ] })
            ] }),
            a && /* @__PURE__ */ u.jsx(wT, { speechLang: b, speechPref: m, setSpeechPref: g, stopVoice: v })
          ] }),
          p === "help" && /* @__PURE__ */ u.jsx(a1, {})
        ] })
      ] })
    ] })
  ] }) });
}
function wT({ speechLang: a, speechPref: s, setSpeechPref: r, stopVoice: o }) {
  const [f, h] = S.useState(null), [m, g] = S.useState(a);
  S.useEffect(() => g(a), [a]);
  const [b, x] = S.useState(""), [v, p] = S.useState(""), [N, j] = S.useState(""), [T, U] = S.useState(""), [k, K] = S.useState(!1), [X, H] = S.useState(null), [F, W] = S.useState(""), [$, V] = S.useState(""), ae = S.useRef(null), ke = S.useRef(null), xe = f?.catalog.find((Z) => Z.id === b), Ee = b === "local" || b === "voicevox" || b === "fish", ve = f?.catalog.filter((Z) => Z.languages.includes(m)) ?? [];
  S.useEffect(() => {
    yl("/voice/config").then(h).catch(() => V(Ll("config_error")));
  }, []), S.useEffect(() => {
    if (!f) return;
    const Z = f.profiles[m];
    x(Z.provider), p(Z.model), j(Z.voice), U(""), K(!1);
  }, [f, m]), S.useEffect(() => {
    V("");
  }, [m]);
  const at = (Z) => {
    const qe = f?.catalog.find((et) => et.id === Z);
    qe && (x(Z), p(qe.models[0]), j(qe.voices[m] ?? ""), U(""), K(!1), V(""));
  };
  S.useEffect(() => {
    if (!Ee) {
      H(null), W("");
      return;
    }
    const Z = new AbortController();
    return H(null), W(""), fetch(dt(`/voice/voices?provider=${encodeURIComponent(b)}&language=${m}`), { signal: Z.signal }).then(async (qe) => {
      if (!qe.ok) throw new Error((await qe.json()).error ?? "network_error");
      return qe.json();
    }).then((qe) => {
      H(qe.voices), j((et) => qe.voices.some((en) => en.id === et) ? et : qe.voices[0]?.id ?? "");
    }).catch((qe) => {
      Z.signal.aborted || (H([]), W(Ll(qe.message)));
    }), () => Z.abort();
  }, [b, m, Ee]);
  const We = () => ({ language: m, profile: { provider: b, model: v, voice: N.trim() }, apiKey: T.trim(), clearKey: k }), Ye = () => {
    ke.current?.abort(), ke.current = null, ae.current?.pause(), ae.current = null;
  }, I = async () => {
    Ye(), o(), V("Saving…");
    try {
      h(await gl("/voice/config", We())), V("Saved");
    } catch (Z) {
      V(Ll(Z.message));
    }
  }, me = async () => {
    if (Ye(), o(), k && T.trim() === "" && xe?.key) {
      V(Ll("key_required"));
      return;
    }
    ke.current = new AbortController(), V("Generating preview…");
    try {
      const Z = await fetch(dt("/voice/read"), { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...We(), text: TT[m] }), signal: ke.current.signal });
      if (!Z.ok) throw new Error((await Z.json()).error ?? "speech_error");
      const qe = URL.createObjectURL(await Z.blob()), et = new Audio(qe);
      ae.current = et, et.onended = () => {
        URL.revokeObjectURL(qe), V("Preview finished");
      }, et.onerror = () => V(Ll("speech_error")), await et.play(), V("Playing preview…");
    } catch (Z) {
      Z instanceof DOMException && Z.name === "AbortError" || V(Ll(Z.message));
    }
  };
  if (S.useEffect(() => Ye, []), !f) return /* @__PURE__ */ u.jsxs("div", { className: "settings-group", children: [
    /* @__PURE__ */ u.jsx("h3", { className: "section", children: "Speech provider" }),
    /* @__PURE__ */ u.jsx("p", { className: "empty", children: $ || "Loading…" })
  ] });
  const he = Ee ? !!X?.some((Z) => Z.id === N) : N.trim() !== "", Me = b === "local" ? "Uses installed Mac system voices. No key and no dialogue upload." : b === "voicevox" ? "Free local Japanese model. Start VOICEVOX on port 50021." : "Uses your own account. Preview and dialogue text go to this provider and may incur charges.";
  return /* @__PURE__ */ u.jsxs("form", { className: "settings-group", onSubmit: (Z) => {
    Z.preventDefault(), I();
  }, children: [
    /* @__PURE__ */ u.jsx("h3", { className: "section", children: "Speech provider" }),
    /* @__PURE__ */ u.jsxs("div", { className: "settings-rows", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "setting", children: [
        /* @__PURE__ */ u.jsxs("span", { children: [
          /* @__PURE__ */ u.jsx("b", { children: "Voice for" }),
          /* @__PURE__ */ u.jsxs("small", { children: [
            "Each language has its own provider and voice.",
            m === a ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
              " Replies are read in ",
              bc[a],
              s === "auto" ? " (following the browser)" : "",
              "."
            ] }) : /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
              " Replies are read in ",
              bc[a],
              ", not ",
              bc[m],
              ". ",
              /* @__PURE__ */ u.jsxs("button", { type: "button", className: "text-button inline", onClick: () => r(m), children: [
                "Read replies in ",
                bc[m]
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ u.jsx("span", { className: "seg", role: "tablist", children: ["zh", "en", "ja"].map((Z) => /* @__PURE__ */ u.jsx("button", { type: "button", role: "tab", "aria-selected": m === Z, className: m === Z ? "active" : "", onClick: () => g(Z), children: bc[Z] }, Z)) })
      ] }),
      /* @__PURE__ */ u.jsxs("label", { className: "setting", children: [
        /* @__PURE__ */ u.jsxs("span", { children: [
          /* @__PURE__ */ u.jsx("b", { children: "Provider" }),
          /* @__PURE__ */ u.jsxs("small", { children: [
            Me,
            xe?.docs ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
              " ",
              /* @__PURE__ */ u.jsx("a", { href: xe.docs, target: "_blank", rel: "noopener noreferrer", children: "Documentation" })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ u.jsx("span", { className: "control", children: /* @__PURE__ */ u.jsx("select", { className: "input", value: b, onChange: (Z) => at(Z.target.value), children: ve.map((Z) => /* @__PURE__ */ u.jsx("option", { value: Z.id, children: Z.id === "local" ? "Local system voice · free" : Z.name }, Z.id)) }) })
      ] }),
      (xe?.models.length ?? 0) > 1 && /* @__PURE__ */ u.jsxs("label", { className: "setting", children: [
        /* @__PURE__ */ u.jsx("span", { children: /* @__PURE__ */ u.jsx("b", { children: "Model" }) }),
        /* @__PURE__ */ u.jsx("span", { className: "control", children: /* @__PURE__ */ u.jsx("select", { className: "input", value: v, onChange: (Z) => p(Z.target.value), children: (xe?.models ?? []).map((Z) => /* @__PURE__ */ u.jsx("option", { value: Z, children: Z }, Z)) }) })
      ] }),
      /* @__PURE__ */ u.jsxs("label", { className: "setting", children: [
        /* @__PURE__ */ u.jsxs("span", { children: [
          /* @__PURE__ */ u.jsx("b", { children: "Voice" }),
          (F || Ee && X?.length === 0) && /* @__PURE__ */ u.jsx("small", { className: "composer-error", children: F || "No voices for this language." })
        ] }),
        /* @__PURE__ */ u.jsx("span", { className: "control", children: Ee ? /* @__PURE__ */ u.jsxs("select", { className: "input", value: N, disabled: X === null || X.length === 0, onChange: (Z) => j(Z.target.value), children: [
          X === null && /* @__PURE__ */ u.jsx("option", { value: "", children: "Loading voices…" }),
          X?.map((Z) => /* @__PURE__ */ u.jsx("option", { value: Z.id, children: b === "local" ? `${Z.name.replace(/\s+\(.*\)$/, "")} · ${Z.locale}` : Z.name }, Z.id))
        ] }) : /* @__PURE__ */ u.jsx("input", { className: "input", value: N, maxLength: 160, spellCheck: !1, onChange: (Z) => j(Z.target.value), placeholder: "Voice ID from the provider" }) })
      ] }),
      xe?.key && /* @__PURE__ */ u.jsxs("label", { className: "setting", children: [
        /* @__PURE__ */ u.jsxs("span", { children: [
          /* @__PURE__ */ u.jsx("b", { children: "API key" }),
          /* @__PURE__ */ u.jsxs("small", { children: [
            "Kept in a local config file, outside character exports.",
            f.hasKeys[b] && !k ? " A key is saved; leave blank to keep it." : ""
          ] })
        ] }),
        /* @__PURE__ */ u.jsxs("span", { className: "control", children: [
          f.hasKeys[b] && /* @__PURE__ */ u.jsx("button", { type: "button", className: `text-button${k ? " danger" : ""}`, onClick: () => {
            K((Z) => !Z), U("");
          }, children: k ? "Will delete · undo" : "Delete saved key" }),
          /* @__PURE__ */ u.jsx("input", { className: "input", type: "password", autoComplete: "new-password", value: T, disabled: k, onChange: (Z) => U(Z.target.value), placeholder: k ? "Key will be deleted on save" : f.hasKeys[b] ? "••••••••" : "Enter your API key" })
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "setting-foot", children: [
        /* @__PURE__ */ u.jsx("span", { className: "field-hint", role: "status", children: $ }),
        /* @__PURE__ */ u.jsxs("span", { className: "row", children: [
          /* @__PURE__ */ u.jsx("button", { type: "button", className: "button", disabled: !he, onClick: () => {
            me();
          }, children: "Preview" }),
          /* @__PURE__ */ u.jsx("button", { type: "submit", className: "button primary", disabled: !he, children: "Save" })
        ] })
      ] })
    ] })
  ] });
}
const i1 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function _T(a) {
  const s = a.trim().split(/\s+/).filter(Boolean);
  if (s.length === 0) return "·";
  const r = s[0], o = s.length > 1 ? s[s.length - 1] : "";
  return /[぀-ヿ㐀-鿿가-힯]/.test(r) ? r.slice(-1) : ((r[0] ?? "") + (o[0] ?? "")).toUpperCase();
}
function AT(a) {
  let s = 0;
  for (const r of a) s = s * 31 + r.codePointAt(0) >>> 0;
  return s % 360;
}
function kT(a) {
  const s = a.trim()[0] ?? "#";
  return /\p{L}/u.test(s) ? /[A-Za-zÀ-ɏ]/.test(s) ? s.normalize("NFD")[0].toUpperCase() : s : "#";
}
const CT = (a) => a.inDays === 0 ? "Today" : a.inDays === 1 ? "Tomorrow" : `${i1[Number(a.date.slice(5, 7)) - 1]} ${Number(a.date.slice(8, 10))} · in ${a.inDays} days`;
function _d({ name: a, dim: s }) {
  return /* @__PURE__ */ u.jsx("span", { className: `contacts-avatar${s ? " dim" : ""}`, style: s ? void 0 : { "--h": AT(a) }, children: s ? "" : _T(a) });
}
function OT({ data: a, placeholder: s }) {
  const [r, o] = S.useState(""), f = a?.contacts ?? [], h = (a?.birthdays ?? []).filter((v) => v.inDays <= 30), m = r.trim().toLowerCase(), g = m.replace(/\D/g, ""), b = S.useMemo(() => m === "" ? f : f.filter(
    (v) => v.name.toLowerCase().includes(m) || v.org.toLowerCase().includes(m) || v.emails.some((p) => p.toLowerCase().includes(m)) || g.length >= 3 && v.phones.some((p) => p.replace(/\D/g, "").includes(g))
  ), [f, m, g]), x = S.useMemo(() => {
    const v = /* @__PURE__ */ new Map();
    for (const p of b) {
      const N = kT(p.name);
      (v.get(N) ?? v.set(N, []).get(N)).push(p);
    }
    return [...v.entries()].sort(([p], [N]) => p === "#" ? 1 : N === "#" ? -1 : p.localeCompare(N));
  }, [b]);
  return s || !a ? /* @__PURE__ */ u.jsxs("div", { className: "contacts placeholder", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "contacts-search", children: [
      /* @__PURE__ */ u.jsx(Tc, {}),
      /* @__PURE__ */ u.jsx("input", { className: "input", placeholder: "Search by name, company, email or number", disabled: !0 })
    ] }),
    /* @__PURE__ */ u.jsx("ul", { className: "contacts-list", children: Array.from({ length: 6 }, (v, p) => /* @__PURE__ */ u.jsxs("li", { className: "contacts-row", children: [
      /* @__PURE__ */ u.jsx(_d, { name: "", dim: !0 }),
      /* @__PURE__ */ u.jsxs("span", { className: "contacts-text", children: [
        /* @__PURE__ */ u.jsx("i", { className: "contacts-skeleton", style: { width: `${38 + p * 17 % 30}%` } }),
        /* @__PURE__ */ u.jsx("i", { className: "contacts-skeleton short", style: { width: `${22 + p * 11 % 20}%` } })
      ] })
    ] }, p)) }),
    /* @__PURE__ */ u.jsx("p", { className: "rem-empty", children: "Waiting for access to Contacts" })
  ] }) : /* @__PURE__ */ u.jsxs("div", { className: "contacts", children: [
    h.length > 0 && /* @__PURE__ */ u.jsxs("section", { className: "contacts-bdays", children: [
      /* @__PURE__ */ u.jsxs("h3", { className: "section", children: [
        /* @__PURE__ */ u.jsx(D0, {}),
        " Birthdays ",
        /* @__PURE__ */ u.jsx("span", { className: "badge", children: h.length })
      ] }),
      /* @__PURE__ */ u.jsx("div", { className: "contacts-bday-strip", children: h.map((v) => /* @__PURE__ */ u.jsxs("div", { className: `contacts-bday${v.inDays === 0 ? " today" : ""}`, children: [
        /* @__PURE__ */ u.jsx(_d, { name: v.name }),
        /* @__PURE__ */ u.jsxs("span", { className: "contacts-bday-text", children: [
          /* @__PURE__ */ u.jsx("b", { children: v.name }),
          /* @__PURE__ */ u.jsx("small", { children: CT(v) })
        ] })
      ] }, v.id)) })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "contacts-search", children: [
      /* @__PURE__ */ u.jsx(Tc, {}),
      /* @__PURE__ */ u.jsx("input", { className: "input", value: r, placeholder: "Search by name, company, email or number", onChange: (v) => o(v.target.value) }),
      r !== "" && /* @__PURE__ */ u.jsx("button", { type: "button", className: "text-button", onClick: () => o(""), children: "Clear" })
    ] }),
    b.length === 0 && /* @__PURE__ */ u.jsx("p", { className: "rem-empty", children: f.length === 0 ? "The address book is empty." : `Nobody matches “${r.trim()}”.` }),
    x.map(([v, p]) => /* @__PURE__ */ u.jsxs("section", { className: "contacts-group", children: [
      /* @__PURE__ */ u.jsx("h4", { className: "contacts-letter", children: v }),
      /* @__PURE__ */ u.jsx("ul", { className: "contacts-list", children: p.map((N) => {
        const j = N.phones[0] ?? N.emails[0] ?? "";
        return /* @__PURE__ */ u.jsxs("li", { className: "contacts-row", children: [
          /* @__PURE__ */ u.jsx(_d, { name: N.name }),
          /* @__PURE__ */ u.jsxs("span", { className: "contacts-text", children: [
            /* @__PURE__ */ u.jsx("b", { children: N.name || /* @__PURE__ */ u.jsxs("span", { className: "contacts-unnamed", children: [
              /* @__PURE__ */ u.jsx(q2, {}),
              " No name"
            ] }) }),
            (N.org || j) && /* @__PURE__ */ u.jsxs("small", { children: [
              N.org,
              N.org && j ? " · " : "",
              j
            ] })
          ] }),
          N.birthday && /* @__PURE__ */ u.jsxs("small", { className: "contacts-meta", title: `Birthday ${N.birthday}`, children: [
            /* @__PURE__ */ u.jsx(D0, {}),
            i1[Number(N.birthday.slice(-5, -3)) - 1],
            " ",
            Number(N.birthday.slice(-2))
          ] })
        ] }, N.id);
      }) })
    ] }, v)),
    f.length >= 500 && m === "" && /* @__PURE__ */ u.jsx("p", { className: "field-hint contacts-foot", children: "Showing the first 500 by name. Search to find anyone else." })
  ] });
}
const RT = (a) => {
  if (!a) return "";
  const s = Math.max(0, Math.round((Date.now() - new Date(a).getTime()) / 6e4));
  if (s < 1) return "just now";
  if (s < 60) return `${s} min ago`;
  if (s < 2160) return `${Math.round(s / 60)} h ago`;
  if (s < 1440 * 14) return `${Math.round(s / 1440)} d ago`;
  const r = new Date(a);
  return r.getFullYear() === (/* @__PURE__ */ new Date()).getFullYear() ? r.toLocaleDateString(void 0, { month: "short", day: "numeric" }) : r.toLocaleDateString(void 0, { year: "numeric", month: "short", day: "numeric" });
};
function MT({ data: a, placeholder: s, busy: r, act: o }) {
  const [f, h] = S.useState(""), [m, g] = S.useState(""), b = a?.folders ?? [], x = a?.notes ?? [], v = m.trim().toLowerCase(), p = x.filter((T) => (f === "" || T.folder === f) && (v === "" || T.title.toLowerCase().includes(v) || T.preview.toLowerCase().includes(v))), N = [{ name: "", label: "All", count: x.length }, ...b.map((T) => ({ name: T.name, label: T.name, count: T.count }))], j = s && x.length === 0;
  return /* @__PURE__ */ u.jsxs("div", { className: `notes${s ? " placeholder" : ""}`, children: [
    /* @__PURE__ */ u.jsxs("div", { className: "notes-search", children: [
      /* @__PURE__ */ u.jsx(Tc, {}),
      /* @__PURE__ */ u.jsx("input", { className: "input", value: m, placeholder: "Search notes…", disabled: j, onChange: (T) => g(T.target.value) }),
      m !== "" && /* @__PURE__ */ u.jsx("button", { type: "button", className: "icon-button small notes-clear", title: "Clear", onClick: () => g(""), children: /* @__PURE__ */ u.jsx(li, {}) })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: "notes-chips", children: j ? [96, 72, 84].map((T, U) => /* @__PURE__ */ u.jsx("span", { className: "notes-chip skeleton", style: { width: T } }, U)) : N.map((T) => /* @__PURE__ */ u.jsxs("button", { type: "button", className: `notes-chip${f === T.name ? " active" : ""}`, onClick: () => h(T.name), children: [
      T.name === "" ? /* @__PURE__ */ u.jsx(Zy, {}) : /* @__PURE__ */ u.jsx(z0, {}),
      /* @__PURE__ */ u.jsx("span", { className: "notes-chip-name", children: T.label }),
      /* @__PURE__ */ u.jsx("small", { children: T.count })
    ] }, T.name)) }),
    j ? /* @__PURE__ */ u.jsx("ul", { className: "notes-list", children: [0, 1, 2, 3].map((T) => /* @__PURE__ */ u.jsxs("li", { className: "notes-card skeleton", children: [
      /* @__PURE__ */ u.jsx("span", { className: "notes-line w60" }),
      /* @__PURE__ */ u.jsx("span", { className: "notes-line w90" }),
      /* @__PURE__ */ u.jsx("span", { className: "notes-line w40" })
    ] }, T)) }) : p.length === 0 ? /* @__PURE__ */ u.jsx("p", { className: "rem-empty", children: x.length === 0 ? "No notes yet." : v ? `Nothing matches "${m}".` : "This folder is empty." }) : /* @__PURE__ */ u.jsx("ul", { className: "notes-list", children: p.map((T) => /* @__PURE__ */ u.jsxs("li", { className: "notes-card", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "notes-card-head", children: [
        /* @__PURE__ */ u.jsxs("b", { className: "notes-title", children: [
          T.locked && /* @__PURE__ */ u.jsx(Xy, { className: "notes-lock" }),
          T.title || "Untitled"
        ] }),
        /* @__PURE__ */ u.jsx("small", { className: "notes-time", children: RT(T.modified) })
      ] }),
      T.preview ? /* @__PURE__ */ u.jsx("p", { className: "notes-preview", children: T.preview }) : /* @__PURE__ */ u.jsx("p", { className: "notes-preview muted", children: T.locked ? "Locked note" : "No preview" }),
      f === "" && T.folder && /* @__PURE__ */ u.jsxs("span", { className: "notes-folder", children: [
        /* @__PURE__ */ u.jsx(z0, {}),
        T.folder
      ] })
    ] }, T.id)) }),
    !j && x.length > 0 && /* @__PURE__ */ u.jsxs("p", { className: "field-hint notes-foot", children: [
      p.length === x.length ? `${x.length} most recent notes` : `${p.length} of ${x.length} recent notes`,
      v === "" ? "" : " · search the rest through the character"
    ] })
  ] });
}
const DT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], zT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Jd = (a) => String(a).padStart(2, "0"), LT = (a) => `${Math.floor(a / 60)}:${Jd(Math.round(a % 60))}`, Fd = (a) => `${DT[(/* @__PURE__ */ new Date(`${a}T12:00:00`)).getDay()]}, ${zT[Number(a.slice(5, 7)) - 1]} ${Number(a.slice(8))}`, UT = (a) => a.slice(11, 16), Pd = /* @__PURE__ */ new Map(), Ny = /* @__PURE__ */ new Set();
function HT({ item: a, dim: s }) {
  const [r, o] = S.useState(Pd.get(a.id)), f = S.useRef(null);
  S.useEffect(() => {
    if (r || s || Ny.has(a.id) || !f.current) return;
    const m = f.current;
    let g = !1;
    const b = () => {
      BT(a.id).then((v) => {
        g || (v ? o(v) : Ny.add(a.id));
      });
    };
    if (typeof IntersectionObserver > "u") {
      b();
      return;
    }
    const x = new IntersectionObserver((v) => {
      v.some((p) => p.isIntersecting) && (x.disconnect(), b());
    }, { rootMargin: "200px" });
    return x.observe(m), () => {
      g = !0, x.disconnect();
    };
  }, [a.id, r, s]);
  const h = a.at ? `${Fd(a.at.slice(0, 10))} ${UT(a.at)}` : "";
  return /* @__PURE__ */ u.jsxs("div", { ref: f, className: `photos-tile${r ? " loaded" : ""}`, title: `${h}${a.w ? ` · ${a.w}×${a.h}` : ""}${a.hasLocation ? " · located" : ""}`, children: [
    r ? /* @__PURE__ */ u.jsx("img", { src: r, alt: "", loading: "lazy", draggable: !1 }) : /* @__PURE__ */ u.jsx("span", { className: "photos-tile-blank", children: /* @__PURE__ */ u.jsx(wr, {}) }),
    a.type === "video" && /* @__PURE__ */ u.jsxs("span", { className: "photos-video", children: [
      /* @__PURE__ */ u.jsx(Rd, {}),
      a.duration ? LT(a.duration) : ""
    ] }),
    a.fav && /* @__PURE__ */ u.jsx("span", { className: "photos-fav", children: /* @__PURE__ */ u.jsx(Vy, {}) })
  ] });
}
async function BT(a) {
  const s = Pd.get(a);
  if (s) return s;
  try {
    const r = await gl("/sources/photos/thumb", { id: a });
    return r.dataUrl && Pd.set(a, r.dataUrl), r.dataUrl;
  } catch {
    return;
  }
}
function qT({ data: a, placeholder: s, busy: r }) {
  const o = a?.days ?? Array.from({ length: 30 }, (v, p) => {
    const N = /* @__PURE__ */ new Date();
    return N.setDate(N.getDate() - (29 - p)), { day: `${N.getFullYear()}-${Jd(N.getMonth() + 1)}-${Jd(N.getDate())}`, count: 0 };
  }), f = a?.recent ?? [], h = a?.albums ?? [], m = Math.max(1, ...o.map((v) => v.count)), g = o.reduce((v, p) => v + p.count, 0), b = s || !a, x = b && f.length === 0 ? Array.from({ length: 10 }, (v, p) => ({ id: `blank-${p}`, at: null, type: "image", w: 0, h: 0, fav: !1, hasLocation: !1 })) : f;
  return /* @__PURE__ */ u.jsxs("div", { className: `photos${b ? " placeholder" : ""}`, children: [
    /* @__PURE__ */ u.jsxs("section", { className: "photos-strip", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "photos-strip-head", children: [
        /* @__PURE__ */ u.jsx("h3", { className: "section", children: "Photos per day" }),
        /* @__PURE__ */ u.jsx("small", { children: b ? "" : `${g} in 30 days` })
      ] }),
      /* @__PURE__ */ u.jsx("div", { className: "photos-bars", children: o.map((v) => /* @__PURE__ */ u.jsx("div", { className: "photos-bar-col", title: `${Fd(v.day)}: ${v.count} photo${v.count === 1 ? "" : "s"}`, children: /* @__PURE__ */ u.jsx("div", { className: `photos-bar${v.count === 0 ? " none" : ""}`, style: { height: `${v.count === 0 ? 3 : Math.max(6, v.count / m * 100)}%` } }) }, v.day)) }),
      /* @__PURE__ */ u.jsxs("div", { className: "photos-bar-axis", children: [
        /* @__PURE__ */ u.jsx("small", { children: Fd(o[0].day) }),
        /* @__PURE__ */ u.jsx("small", { children: "Today" })
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("section", { children: [
      /* @__PURE__ */ u.jsxs("h3", { className: "section", children: [
        "Recent ",
        !b && f.length > 0 && /* @__PURE__ */ u.jsx("span", { className: "badge", children: f.length })
      ] }),
      x.length === 0 ? /* @__PURE__ */ u.jsx("p", { className: "rem-empty", children: r === "refresh" ? "Loading…" : "No photos in the last 30 days." }) : /* @__PURE__ */ u.jsx("div", { className: "photos-grid", children: x.map((v) => /* @__PURE__ */ u.jsx(HT, { item: v, dim: b }, v.id)) })
    ] }),
    (h.length > 0 || b) && /* @__PURE__ */ u.jsxs("section", { children: [
      /* @__PURE__ */ u.jsx("h3", { className: "section", children: "Albums" }),
      /* @__PURE__ */ u.jsx("div", { className: "photos-albums", children: (b && h.length === 0 ? [{ title: "", count: 0 }, { title: "", count: 0 }, { title: "", count: 0 }] : h).map((v, p) => /* @__PURE__ */ u.jsxs("div", { className: "photos-album", children: [
        /* @__PURE__ */ u.jsx("span", { className: "photos-album-icon", children: v.title === "Favorites" ? /* @__PURE__ */ u.jsx(Vy, {}) : /* @__PURE__ */ u.jsx(x2, {}) }),
        /* @__PURE__ */ u.jsxs("span", { className: "photos-album-text", children: [
          /* @__PURE__ */ u.jsx("b", { children: v.title || " " }),
          /* @__PURE__ */ u.jsx("small", { children: v.title ? `${v.count} item${v.count === 1 ? "" : "s"}` : " " })
        ] })
      ] }, `${v.title}-${p}`)) })
    ] }),
    b && /* @__PURE__ */ u.jsx("p", { className: "field-hint", style: { marginTop: 12 }, children: "Thumbnails and a 30-day activity strip appear here once Photos access is granted." })
  ] });
}
const $T = /[぀-ヿ㐀-鿿가-힯]/;
function YT(a) {
  const s = a.trim();
  return !s || /^[+\d(]/.test(s) ? "#" : $T.test(s[0]) ? s[0] : s.split(/\s+/).filter(Boolean).slice(0, 2).map((o) => o[0].toUpperCase()).join("");
}
function GT(a) {
  let s = 0;
  for (let r = 0; r < a.length; r++) s = (s * 31 + a.charCodeAt(r)) % 360;
  return s;
}
function VT(a) {
  const s = Math.max(0, Math.round((Date.now() - new Date(a).getTime()) / 6e4));
  return s < 1 ? "now" : s < 60 ? `${s} min` : s < 2160 ? `${Math.round(s / 60)} h` : s < 1440 * 14 ? `${Math.round(s / 1440)} d` : a.slice(0, 10);
}
function Ey({ t: a, awaiting: s }) {
  const r = a.participants.length > 1;
  return /* @__PURE__ */ u.jsxs("li", { className: `messages-row${s ? " awaiting" : ""}`, children: [
    /* @__PURE__ */ u.jsx("span", { className: "messages-avatar", style: { "--h": GT(a.name) }, children: r ? /* @__PURE__ */ u.jsx(Iy, {}) : YT(a.name) }),
    /* @__PURE__ */ u.jsxs("span", { className: "messages-text", children: [
      /* @__PURE__ */ u.jsxs("b", { children: [
        a.name,
        r && /* @__PURE__ */ u.jsx("small", { className: "messages-count", children: a.participants.length })
      ] }),
      /* @__PURE__ */ u.jsx("small", { className: "messages-snippet", children: a.snippet ? `${a.lastFromMe ? "You: " : ""}${a.snippet}` : a.count > 0 ? `${a.count} message${a.count === 1 ? "" : "s"}` : "" })
    ] }),
    /* @__PURE__ */ u.jsx("small", { className: "messages-meta", children: VT(a.last) })
  ] });
}
function XT({ data: a, placeholder: s }) {
  const r = a?.threads ?? [], o = r.filter((m) => m.awaiting), f = r.filter((m) => !m.awaiting), h = a?.shared ?? !1;
  return /* @__PURE__ */ u.jsxs("div", { className: `messages${s ? " placeholder" : ""}`, children: [
    /* @__PURE__ */ u.jsxs("p", { className: `messages-note${h ? " on" : ""}`, children: [
      h ? /* @__PURE__ */ u.jsx(h2, {}) : /* @__PURE__ */ u.jsx(d2, {}),
      /* @__PURE__ */ u.jsx("span", { children: h ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        "She sees ",
        /* @__PURE__ */ u.jsx("b", { children: "counts and names" }),
        " of who is waiting, never a message."
      ] }) : /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsx("b", { children: "Hidden from the character." }),
        " Turn on sharing to let her see who is waiting."
      ] }) })
    ] }),
    s && /* @__PURE__ */ u.jsx("ul", { className: "messages-list messages-skeleton", "aria-hidden": !0, children: [0, 1, 2, 3].map((m) => /* @__PURE__ */ u.jsxs("li", { className: "messages-row", children: [
      /* @__PURE__ */ u.jsx("span", { className: "messages-avatar" }),
      /* @__PURE__ */ u.jsxs("span", { className: "messages-text", children: [
        /* @__PURE__ */ u.jsx("b", {}),
        /* @__PURE__ */ u.jsx("small", {})
      ] }),
      /* @__PURE__ */ u.jsx("small", { className: "messages-meta" })
    ] }, m)) }),
    !s && r.length === 0 && /* @__PURE__ */ u.jsxs("p", { className: "rem-empty", children: [
      "No conversations in the last ",
      a?.window ?? 7,
      " days."
    ] }),
    o.length > 0 && /* @__PURE__ */ u.jsxs("section", { className: "messages-group", children: [
      /* @__PURE__ */ u.jsxs("h3", { className: "section", children: [
        "Awaiting your reply ",
        /* @__PURE__ */ u.jsx("span", { className: "badge", children: o.length })
      ] }),
      /* @__PURE__ */ u.jsx("ul", { className: "messages-list", children: o.map((m) => /* @__PURE__ */ u.jsx(Ey, { t: m, awaiting: !0 }, m.id)) })
    ] }),
    f.length > 0 && /* @__PURE__ */ u.jsxs("section", { className: "messages-group", children: [
      /* @__PURE__ */ u.jsxs("h3", { className: "section", children: [
        "Recent ",
        /* @__PURE__ */ u.jsx("span", { className: "badge", children: f.length })
      ] }),
      /* @__PURE__ */ u.jsx("ul", { className: "messages-list", children: f.map((m) => /* @__PURE__ */ u.jsx(Ey, { t: m, awaiting: !1 }, m.id)) })
    ] })
  ] });
}
const ZT = (a) => Math.max(0, Math.round((Date.now() - Date.parse(a)) / 6e4)), Ty = (a) => {
  const s = ZT(a);
  return s < 1 ? "just now" : s < 60 ? `${s} min ago` : s < 2160 ? `${Math.round(s / 60)} h ago` : `${Math.round(s / 1440)} d ago`;
}, QT = (a) => a < 1 ? `${Math.round(a * 1e3)} m` : a < 10 ? `${a.toFixed(1)} km` : `${Math.round(a)} km`, jy = (a, s) => a?.subLocality || a?.name || a?.locality || `${s.lat.toFixed(4)}, ${s.lon.toFixed(4)}`, KT = (a) => a ? [a.locality || a.name, a.administrativeArea && a.administrativeArea !== a.locality ? a.administrativeArea : "", a.country].filter(Boolean).join(", ") : "";
function IT({ accuracy: a, pinned: s, idle: r }) {
  const o = Math.max(100, a * 1.4), f = a > 0 ? Math.max(6, a / o * 54) : 0, h = o >= 1e3 ? `${(o / 1e3).toFixed(o >= 1e4 ? 0 : 1)} km` : `${Math.round(o)} m`;
  return /* @__PURE__ */ u.jsxs("svg", { className: `loc-radar${r ? " idle" : ""}`, viewBox: "0 0 120 120", "aria-hidden": "true", children: [
    /* @__PURE__ */ u.jsx("circle", { className: "loc-ring", cx: "60", cy: "60", r: "54" }),
    /* @__PURE__ */ u.jsx("circle", { className: "loc-ring", cx: "60", cy: "60", r: "36" }),
    /* @__PURE__ */ u.jsx("circle", { className: "loc-ring", cx: "60", cy: "60", r: "18" }),
    /* @__PURE__ */ u.jsx("line", { className: "loc-ring", x1: "60", y1: "4", x2: "60", y2: "116" }),
    /* @__PURE__ */ u.jsx("line", { className: "loc-ring", x1: "4", y1: "60", x2: "116", y2: "60" }),
    !r && /* @__PURE__ */ u.jsx("circle", { className: "loc-sweep", cx: "60", cy: "60", r: "54" }),
    f > 0 && /* @__PURE__ */ u.jsx("circle", { className: "loc-acc", cx: "60", cy: "60", r: f }),
    !r && /* @__PURE__ */ u.jsx("circle", { className: "loc-pulse", cx: "60", cy: "60", r: "5" }),
    /* @__PURE__ */ u.jsx("circle", { className: `loc-dot${s ? " pinned" : ""}`, cx: "60", cy: "60", r: r ? 3 : 5 }),
    !r && !s && /* @__PURE__ */ u.jsx("text", { className: "loc-scale", x: "114", y: "114", textAnchor: "end", children: h })
  ] });
}
function JT({ data: a, placeholder: s, busy: r, act: o }) {
  const [f, h] = S.useState(""), m = async () => {
    const j = f.trim();
    j && await o("location", { json: { value: j } }) && h("");
  }, g = a?.current, b = !g, x = g?.place ?? null, v = x?.timeZone && a && x.timeZone !== a.systemTimeZone ? x.timeZone : "", p = a?.distanceFromHomeKm !== void 0 && a.distanceFromHomeKm <= 0.5, N = a?.history ?? [];
  return /* @__PURE__ */ u.jsxs("div", { className: `loc${s || b ? " placeholder" : ""}`, children: [
    /* @__PURE__ */ u.jsxs("div", { className: "loc-hero", children: [
      /* @__PURE__ */ u.jsx(IT, { accuracy: g?.accuracy ?? 0, pinned: g?.source === "manual", idle: b }),
      /* @__PURE__ */ u.jsxs("div", { className: "loc-where", children: [
        /* @__PURE__ */ u.jsx("div", { className: "loc-name", children: g ? jy(x, g) : "—" }),
        /* @__PURE__ */ u.jsx("div", { className: "loc-line", children: g ? KT(x) || "Somewhere on the map" : s ? "Waiting for a location fix" : "" }),
        /* @__PURE__ */ u.jsxs("div", { className: "loc-meta", children: [
          g && /* @__PURE__ */ u.jsxs("span", { children: [
            /* @__PURE__ */ u.jsx(E2, {}),
            " ",
            g.source === "manual" ? "Pinned by name" : `Updated ${Ty(g.at)}`,
            g.accuracy > 0 ? ` · ±${Math.round(g.accuracy)} m` : ""
          ] }),
          g && a?.home && /* @__PURE__ */ u.jsxs("span", { className: p ? "on" : "", children: [
            /* @__PURE__ */ u.jsx(vr, {}),
            " ",
            p ? "At home" : `${QT(a.distanceFromHomeKm ?? 0)} from ${a.home.name}`
          ] }),
          v && /* @__PURE__ */ u.jsxs("span", { children: [
            /* @__PURE__ */ u.jsx(y2, {}),
            " ",
            v
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "loc-actions", children: [
      /* @__PURE__ */ u.jsxs("button", { type: "button", className: "button", disabled: r !== "" || b, onClick: () => {
        o("setHome");
      }, children: [
        /* @__PURE__ */ u.jsx(vr, {}),
        " ",
        r === "setHome" ? "Saving…" : a?.home ? "Update home" : "Set as home"
      ] }),
      a?.manual && /* @__PURE__ */ u.jsxs("button", { type: "button", className: "text-button", disabled: r !== "", onClick: () => {
        o("location", { json: { value: "auto" } });
      }, children: [
        /* @__PURE__ */ u.jsx(A2, {}),
        " Use this Mac's location"
      ] })
    ] }),
    /* @__PURE__ */ u.jsx("h3", { className: "section", children: "Recent places" }),
    N.length === 0 ? /* @__PURE__ */ u.jsx("div", { className: "loc-chips", children: b ? [0, 1, 2].map((j) => /* @__PURE__ */ u.jsx("span", { className: "loc-chip ghost" }, j)) : /* @__PURE__ */ u.jsxs("span", { className: "loc-chip current", children: [
      /* @__PURE__ */ u.jsx(Od, {}),
      " ",
      g ? jy(x, g) : ""
    ] }) }) : /* @__PURE__ */ u.jsx("div", { className: "loc-chips", children: N.slice(0, 10).map((j, T) => /* @__PURE__ */ u.jsxs("span", { className: `loc-chip${T === 0 ? " current" : ""}${a?.home && Math.abs(j.lat - a.home.lat) < 6e-3 && Math.abs(j.lon - a.home.lon) < 6e-3 ? " home" : ""}`, title: `${j.lat.toFixed(3)}, ${j.lon.toFixed(3)} · first ${j.first.slice(0, 16).replace("T", " ")}`, children: [
      T === 0 ? /* @__PURE__ */ u.jsx(Od, {}) : /* @__PURE__ */ u.jsx(vr, {}),
      j.name,
      /* @__PURE__ */ u.jsxs("small", { children: [
        T === 0 ? "now" : Ty(j.last),
        j.visits > 1 ? ` · ${j.visits}×` : ""
      ] })
    ] }, `${j.lat},${j.lon}`)) }),
    /* @__PURE__ */ u.jsx("h3", { className: "section", children: "Use a different place" }),
    /* @__PURE__ */ u.jsxs("div", { className: "loc-pin", children: [
      /* @__PURE__ */ u.jsx("input", { className: "input", value: f, placeholder: "City or place name, e.g. Tokyo", disabled: r !== "", onChange: (j) => h(j.target.value), onKeyDown: (j) => {
        j.key === "Enter" && !j.nativeEvent.isComposing && (j.preventDefault(), m());
      } }),
      /* @__PURE__ */ u.jsx("button", { type: "button", className: "button primary", disabled: r !== "" || f.trim() === "", onClick: () => {
        m();
      }, children: r === "location" ? "Pinning…" : "Pin" })
    ] }),
    /* @__PURE__ */ u.jsx("p", { className: "field-hint", children: `Pins the place instead of asking this Mac; no permission needed. "Use this Mac's location" goes back.` })
  ] });
}
const wy = /* @__PURE__ */ new Set(["light", "switch", "fan", "input_boolean", "media_player", "humidifier"]), FT = /* @__PURE__ */ new Set(["scene", "script"]), PT = (a) => a.replace(/^get\s+/i, ""), _y = (a) => {
  const s = Math.round((Date.now() - Date.parse(a)) / 6e4);
  return Number.isFinite(s) ? s < 1 ? "just now" : s < 60 ? `${s} min ago` : s < 2160 ? `${Math.round(s / 60)} h ago` : `${Math.round(s / 1440)} d ago` : "";
}, WT = (a) => {
  if (a.startsWith("{"))
    try {
      const s = JSON.parse(a);
      if (!s || typeof s != "object" || Array.isArray(s)) return;
      const r = Object.entries(s).filter(([, o]) => o === null || ["string", "number", "boolean"].includes(typeof o));
      return r.length > 0 && r.length <= 12 ? Object.fromEntries(r.map(([o, f]) => [o, f === null ? "—" : String(f)])) : void 0;
    } catch {
      return;
    }
};
function Ay({ domain: a }) {
  const s = a === "light" ? N2 : a === "switch" || a === "input_boolean" ? O2 : a === "fan" ? m2 : a === "climate" ? H2 : a === "lock" ? Xy : a === "binary_sensor" ? Px : a === "sensor" ? nh : a === "scene" || a === "script" ? ah : B2;
  return /* @__PURE__ */ u.jsx(s, {});
}
function ej({ r: a }) {
  const s = a.error && !a.output ? void 0 : WT(a.output), r = !!s || a.output.length > 60;
  return /* @__PURE__ */ u.jsxs("div", { className: `home-reading${r ? " wide" : ""}${a.error && !a.output ? " failed" : ""}`, title: a.error ? a.error : void 0, children: [
    /* @__PURE__ */ u.jsxs("small", { children: [
      a.error ? /* @__PURE__ */ u.jsx(Ky, {}) : /* @__PURE__ */ u.jsx(nh, {}),
      PT(a.name)
    ] }),
    s ? /* @__PURE__ */ u.jsx("dl", { children: Object.entries(s).map(([o, f]) => /* @__PURE__ */ u.jsxs(Ul.Fragment, { children: [
      /* @__PURE__ */ u.jsx("dt", { children: o }),
      /* @__PURE__ */ u.jsx("dd", { children: f })
    ] }, o)) }) : a.error && !a.output ? /* @__PURE__ */ u.jsx("b", { children: a.error }) : /* @__PURE__ */ u.jsx("b", { className: a.output ? "" : "empty", children: a.output || "No output" }),
    /* @__PURE__ */ u.jsx("time", { dateTime: a.at, children: a.error && a.output ? `Last good value · ${_y(a.at)}` : `Updated ${_y(a.at)}` })
  ] });
}
function tj({ data: a, placeholder: s, busy: r, act: o }) {
  const [f, h] = Ul.useState(""), [m, g] = Ul.useState(""), [b, x] = Ul.useState({}), v = async (H) => {
    if (f) return;
    h(H), g("");
    const F = await o("run", { json: { value: H } });
    h(""), F && (g(H), window.setTimeout(() => g((W) => W === H ? "" : W), 2500));
  }, p = async (H, F) => {
    x(($) => ({ ...$, [H.id]: F })), await o("run", { json: { value: `${H.id} ${F ? "on" : "off"}` } }) ? window.setTimeout(() => x(($) => {
      const V = { ...$ };
      return delete V[H.id], V;
    }), 4e3) : x(($) => {
      const V = { ...$ };
      return delete V[H.id], V;
    });
  }, N = a?.readers ?? [], j = a?.actions ?? [], T = a?.entities ?? [], U = T.filter((H) => wy.has(H.domain) || H.domain === "climate" || H.domain === "cover" || H.domain === "lock"), k = T.filter((H) => H.domain === "sensor" || H.domain === "binary_sensor"), K = T.filter((H) => FT.has(H.domain)), X = !s && N.length + j.length + T.length === 0;
  return s || !a ? /* @__PURE__ */ u.jsxs("div", { className: "home placeholder", "aria-hidden": !0, children: [
    /* @__PURE__ */ u.jsxs("section", { className: "home-group", children: [
      /* @__PURE__ */ u.jsx("h3", { className: "section", children: "Readings" }),
      /* @__PURE__ */ u.jsx("div", { className: "home-readings", children: [0, 1].map((H) => /* @__PURE__ */ u.jsxs("div", { className: "home-reading", children: [
        /* @__PURE__ */ u.jsxs("small", { children: [
          /* @__PURE__ */ u.jsx(nh, {}),
          " "
        ] }),
        /* @__PURE__ */ u.jsx("b", { className: "empty", children: "—" }),
        /* @__PURE__ */ u.jsx("time", { children: " " })
      ] }, H)) })
    ] }),
    /* @__PURE__ */ u.jsxs("section", { className: "home-group", children: [
      /* @__PURE__ */ u.jsx("h3", { className: "section", children: "Actions" }),
      /* @__PURE__ */ u.jsx("div", { className: "home-tiles", children: [0, 1, 2].map((H) => /* @__PURE__ */ u.jsxs("div", { className: "home-tile skeleton", children: [
        /* @__PURE__ */ u.jsx("span", { className: "home-tile-icon", children: /* @__PURE__ */ u.jsx(Rd, {}) }),
        /* @__PURE__ */ u.jsx("span", {})
      ] }, H)) })
    ] })
  ] }) : /* @__PURE__ */ u.jsxs("div", { className: "home", children: [
    X && /* @__PURE__ */ u.jsxs("p", { className: "home-empty", children: [
      "Nothing in the Shortcuts folder",
      a.folder ? ` "${a.folder}"` : "",
      " yet.",
      /* @__PURE__ */ u.jsx("br", {}),
      /* @__PURE__ */ u.jsx("span", { className: "field-hint home-hint", children: 'Add "Get …" shortcuts for readings and any others as actions, then refresh.' })
    ] }),
    (N.length > 0 || k.length > 0) && /* @__PURE__ */ u.jsxs("section", { className: "home-group", children: [
      /* @__PURE__ */ u.jsxs("h3", { className: "section", children: [
        "Readings ",
        /* @__PURE__ */ u.jsx("span", { className: "badge", children: N.length + k.length })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "home-readings", children: [
        N.map((H) => /* @__PURE__ */ u.jsx(ej, { r: H }, H.name)),
        k.map((H) => /* @__PURE__ */ u.jsxs("div", { className: "home-reading", title: H.id, children: [
          /* @__PURE__ */ u.jsxs("small", { children: [
            /* @__PURE__ */ u.jsx(Ay, { domain: H.domain }),
            H.name
          ] }),
          /* @__PURE__ */ u.jsxs("b", { children: [
            H.state,
            H.unit ? /* @__PURE__ */ u.jsx("span", { style: { fontSize: 13, fontWeight: 500, color: "var(--muted-fg)", marginLeft: 3 }, children: H.unit }) : null
          ] })
        ] }, H.id))
      ] })
    ] }),
    U.length > 0 && /* @__PURE__ */ u.jsxs("section", { className: "home-group", children: [
      /* @__PURE__ */ u.jsxs("h3", { className: "section", children: [
        "Devices ",
        /* @__PURE__ */ u.jsx("span", { className: "badge", children: U.length })
      ] }),
      /* @__PURE__ */ u.jsx("ul", { className: "home-devices", children: U.map((H) => {
        const F = H.id in b ? b[H.id] : H.state === "on", W = wy.has(H.domain);
        return /* @__PURE__ */ u.jsxs("li", { className: "home-device", title: H.id, children: [
          /* @__PURE__ */ u.jsx("span", { className: `home-device-icon${F && W ? " on" : ""}`, children: /* @__PURE__ */ u.jsx(Ay, { domain: H.domain }) }),
          /* @__PURE__ */ u.jsxs("span", { className: "home-device-text", children: [
            /* @__PURE__ */ u.jsx("b", { children: H.name }),
            /* @__PURE__ */ u.jsx("small", { children: H.id })
          ] }),
          W ? /* @__PURE__ */ u.jsx("input", { type: "checkbox", className: "switch", checked: !!F, disabled: r !== "" || f !== "", onChange: ($) => {
            p(H, $.target.checked);
          } }) : /* @__PURE__ */ u.jsxs("span", { className: "home-device-state", children: [
            H.state,
            H.unit ? ` ${H.unit}` : ""
          ] })
        ] }, H.id);
      }) })
    ] }),
    (j.length > 0 || K.length > 0) && /* @__PURE__ */ u.jsxs("section", { className: "home-group", children: [
      /* @__PURE__ */ u.jsxs("h3", { className: "section", children: [
        "Actions ",
        /* @__PURE__ */ u.jsx("span", { className: "badge", children: j.length + K.length })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "home-tiles", children: [
        j.map((H) => {
          const F = f === H.name || !!H.running;
          return /* @__PURE__ */ u.jsxs("button", { type: "button", className: `home-tile${F ? " running" : ""}${m === H.name ? " done" : ""}`, disabled: r !== "" && !F || f !== "", onClick: () => {
            v(H.name);
          }, title: `Run "${H.name}"`, children: [
            /* @__PURE__ */ u.jsx("span", { className: "home-tile-icon", children: F ? /* @__PURE__ */ u.jsx(L0, {}) : /* @__PURE__ */ u.jsx(Rd, {}) }),
            /* @__PURE__ */ u.jsx("span", { children: H.name }),
            m === H.name && /* @__PURE__ */ u.jsx("span", { className: "home-tile-feedback", children: "Ran" })
          ] }, H.name);
        }),
        K.map((H) => /* @__PURE__ */ u.jsxs("button", { type: "button", className: `home-tile${f === H.id ? " running" : ""}${m === H.id ? " done" : ""}`, disabled: r !== "" || f !== "", onClick: () => {
          v(H.id);
        }, title: H.id, children: [
          /* @__PURE__ */ u.jsx("span", { className: "home-tile-icon", children: f === H.id ? /* @__PURE__ */ u.jsx(L0, {}) : /* @__PURE__ */ u.jsx(ah, {}) }),
          /* @__PURE__ */ u.jsx("span", { children: H.name }),
          m === H.id && /* @__PURE__ */ u.jsx("span", { className: "home-tile-feedback", children: "Ran" })
        ] }, H.id))
      ] })
    ] })
  ] });
}
function nj({ data: a, placeholder: s, busy: r, act: o }) {
  const [f, h] = Ul.useState(""), [m, g] = Ul.useState("all"), [b, x] = Ul.useState(""), v = a?.books ?? [], p = a?.connected ?? !1, N = v.find((k) => k.id === f), j = async () => {
    const k = b.trim();
    k && await o("cookie", { json: { value: k } }) && x("");
  };
  if (!p || a?.expired)
    return /* @__PURE__ */ u.jsxs("div", { className: `weread${s ? " placeholder" : ""}`, children: [
      /* @__PURE__ */ u.jsxs("div", { className: "weread-connect", children: [
        /* @__PURE__ */ u.jsx("div", { className: "weread-connect-icon", children: /* @__PURE__ */ u.jsx(S2, {}) }),
        /* @__PURE__ */ u.jsx("b", { children: a?.expired ? "WeRead logged you out" : "Connect WeRead" }),
        /* @__PURE__ */ u.jsx("p", { className: "field-hint", children: "Log in at weread.qq.com in a browser, copy the Cookie header from DevTools (Network → any request → Request Headers) and paste it here. It is stored locally and never shown again." }),
        /* @__PURE__ */ u.jsxs("div", { className: "weread-cookie", children: [
          /* @__PURE__ */ u.jsx("input", { className: "input", type: "password", value: b, placeholder: "wr_vid=…; wr_skey=…", autoComplete: "off", spellCheck: !1, disabled: r !== "", onChange: (k) => x(k.target.value), onKeyDown: (k) => {
            k.key === "Enter" && !k.nativeEvent.isComposing && (k.preventDefault(), j());
          } }),
          /* @__PURE__ */ u.jsx("button", { type: "button", className: "button primary", disabled: r !== "" || b.trim() === "", onClick: () => {
            j();
          }, children: r === "cookie" ? "Connecting…" : "Connect" })
        ] })
      ] }),
      /* @__PURE__ */ u.jsx("div", { className: "weread-grid", children: Array.from({ length: 5 }, (k, K) => /* @__PURE__ */ u.jsxs("div", { className: "weread-book ghost", children: [
        /* @__PURE__ */ u.jsx("div", { className: "weread-cover" }),
        /* @__PURE__ */ u.jsx("span", { className: "weread-title" })
      ] }, K)) })
    ] });
  if (N) {
    const k = a?.highlights[N.id], K = k?.chapters.reduce((H, F) => H + F.marks.length, 0) ?? 0, X = k?.chapters.reduce((H, F) => H + F.notes.length, 0) ?? 0;
    return /* @__PURE__ */ u.jsxs("div", { className: "weread", children: [
      /* @__PURE__ */ u.jsxs("button", { type: "button", className: "text-button back", onClick: () => h(""), children: [
        /* @__PURE__ */ u.jsx(Uy, {}),
        " Shelf"
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "weread-detail-head", children: [
        /* @__PURE__ */ u.jsx(ky, { book: N }),
        /* @__PURE__ */ u.jsxs("div", { className: "weread-detail-meta", children: [
          /* @__PURE__ */ u.jsx("h3", { children: N.title }),
          /* @__PURE__ */ u.jsxs("small", { children: [
            N.author,
            N.category ? ` · ${N.category}` : ""
          ] }),
          /* @__PURE__ */ u.jsx("div", { className: "weread-detail-status", children: N.finished ? /* @__PURE__ */ u.jsx("span", { className: "badge weread-finished", children: "Finished" }) : /* @__PURE__ */ u.jsx(Cy, { value: N.progress, wide: !0 }) }),
          /* @__PURE__ */ u.jsx("small", { children: k ? `${K} highlights · ${X} notes` : N.noteCount > 0 ? `${N.noteCount} notes on WeRead, not fetched yet` : "No highlights on WeRead" }),
          (N.noteCount > 0 || k) && /* @__PURE__ */ u.jsxs("button", { type: "button", className: "button", disabled: r !== "", onClick: () => {
            o("fetch", { json: { book: N.id } });
          }, children: [
            /* @__PURE__ */ u.jsx(Md, { className: r === "fetch" ? "spinning" : "" }),
            k ? "Refetch" : "Fetch highlights"
          ] })
        ] })
      ] }),
      k && k.chapters.length > 0 ? k.chapters.map((H, F) => /* @__PURE__ */ u.jsxs("section", { className: "weread-chapter", children: [
        /* @__PURE__ */ u.jsx("h3", { className: "section", children: H.title }),
        H.marks.map((W, $) => /* @__PURE__ */ u.jsx("blockquote", { className: "weread-quote", children: W.text }, `m${$}`)),
        H.notes.map((W, $) => /* @__PURE__ */ u.jsxs("div", { className: "weread-note", children: [
          /* @__PURE__ */ u.jsx(j2, {}),
          /* @__PURE__ */ u.jsx("div", { children: W.text.split(`
`).map((V, ae) => /* @__PURE__ */ u.jsx("p", { className: V.startsWith("> ") ? "weread-note-ref" : "", children: V.replace(/^> /, "") }, ae)) })
        ] }, `n${$}`))
      ] }, F)) : /* @__PURE__ */ u.jsx("p", { className: "rem-empty", children: k ? "Nothing marked in this book." : "Highlights show up here once fetched." })
    ] });
  }
  const T = v.filter((k) => m === "all" ? !0 : m === "reading" ? !k.finished : m === "finished" ? k.finished : k.noteCount > 0), U = Object.keys(a?.highlights ?? {}).length;
  return /* @__PURE__ */ u.jsxs("div", { className: `weread${s ? " placeholder" : ""}`, children: [
    /* @__PURE__ */ u.jsxs("div", { className: "weread-bar", children: [
      /* @__PURE__ */ u.jsx("div", { className: "weread-filters", children: ["all", "reading", "finished", "notes"].map((k) => /* @__PURE__ */ u.jsx("button", { type: "button", className: `weread-filter${m === k ? " active" : ""}`, onClick: () => g(k), children: k === "all" ? `All ${v.length}` : k === "reading" ? "Reading" : k === "finished" ? "Finished" : "With notes" }, k)) }),
      /* @__PURE__ */ u.jsxs("button", { type: "button", className: "button", disabled: r !== "" || s, title: `${U} books with cached highlights`, onClick: () => {
        o("sync");
      }, children: [
        /* @__PURE__ */ u.jsx(Md, { className: r === "sync" ? "spinning" : "" }),
        r === "sync" ? "Syncing…" : "Sync highlights"
      ] })
    ] }),
    T.length === 0 && /* @__PURE__ */ u.jsx("p", { className: "rem-empty", children: s ? "Waiting for the shelf" : "Nothing here." }),
    /* @__PURE__ */ u.jsx("div", { className: "weread-grid", children: T.map((k) => /* @__PURE__ */ u.jsxs("button", { type: "button", className: "weread-book", onClick: () => h(k.id), title: `${k.title}${k.author ? ` — ${k.author}` : ""}`, children: [
      /* @__PURE__ */ u.jsx(ky, { book: k }),
      /* @__PURE__ */ u.jsx("span", { className: "weread-title", children: k.title }),
      k.finished ? /* @__PURE__ */ u.jsx("span", { className: "badge weread-finished", children: "Finished" }) : /* @__PURE__ */ u.jsx(Cy, { value: k.progress })
    ] }, k.id)) })
  ] });
}
function ky({ book: a }) {
  const [s, r] = Ul.useState(!1);
  return /* @__PURE__ */ u.jsxs("div", { className: "weread-cover", children: [
    a.cover && !s ? /* @__PURE__ */ u.jsx("img", { src: a.cover, alt: "", loading: "lazy", referrerPolicy: "no-referrer", onError: () => r(!0) }) : /* @__PURE__ */ u.jsx(rs, {}),
    a.noteCount > 0 && /* @__PURE__ */ u.jsx("span", { className: "weread-count", title: `${a.noteCount} notes`, children: a.noteCount })
  ] });
}
function Cy({ value: a, wide: s }) {
  const r = a === void 0 ? 0 : Math.max(0, Math.min(100, a));
  return /* @__PURE__ */ u.jsxs("span", { className: `weread-progress${s ? " wide" : ""}`, title: a === void 0 ? "In progress" : `${r}%`, children: [
    /* @__PURE__ */ u.jsx("i", { style: { width: `${r}%` } }),
    s && /* @__PURE__ */ u.jsx("small", { children: a === void 0 ? "In progress" : `${r}% read` })
  ] });
}
const Oy = [{ id: "movie", label: "Movies", Icon: Yy }, { id: "book", label: "Books", Icon: rs }, { id: "music", label: "Music", Icon: qy }], Ry = {
  movie: { wish: "Want to watch", done: "Watched" },
  book: { wish: "Want to read", done: "Read" },
  music: { wish: "Want to listen", done: "Listened" }
}, gr = 48;
function lj({ n: a }) {
  return /* @__PURE__ */ u.jsx("span", { className: "douban-stars", "aria-label": `${a} of 5`, children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ u.jsx(z2, { className: s <= a ? "" : "off" }, s)) });
}
function aj({ item: a }) {
  const [s, r] = S.useState(!1), o = a.kind === "movie" ? i2 : a.kind === "book" ? rs : qy;
  return /* @__PURE__ */ u.jsx("div", { className: `douban-cover${a.kind === "music" ? " music" : ""}`, children: a.cover && !s ? /* @__PURE__ */ u.jsx("img", { src: a.cover, alt: "", loading: "lazy", referrerPolicy: "no-referrer", onError: () => r(!0) }) : /* @__PURE__ */ u.jsx("span", { className: "douban-blank", children: /* @__PURE__ */ u.jsx(o, {}) }) });
}
function ij({ data: a, placeholder: s }) {
  const [r, o] = S.useState("movie"), [f, h] = S.useState("wish"), [m, g] = S.useState(""), [b, x] = S.useState(gr), v = S.useMemo(() => {
    const j = m.trim().toLowerCase(), T = j ? j.split(/\s+/) : [];
    return (a?.items ?? []).filter((U) => U.kind === r && U.status === f && (T.length === 0 || T.every((k) => U.title.toLowerCase().includes(k) || (U.comment ?? "").toLowerCase().includes(k))));
  }, [a, r, f, m]);
  if (s || !a)
    return /* @__PURE__ */ u.jsxs("div", { className: "douban placeholder", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "douban-bar", children: [
        /* @__PURE__ */ u.jsx("div", { className: "douban-tabs", children: Oy.map((j) => /* @__PURE__ */ u.jsxs("span", { className: `douban-tab${j.id === "movie" ? " active" : ""}`, children: [
          /* @__PURE__ */ u.jsx(j.Icon, {}),
          j.label
        ] }, j.id)) }),
        /* @__PURE__ */ u.jsxs("span", { className: "douban-seg", children: [
          /* @__PURE__ */ u.jsx("button", { type: "button", className: "active", children: "Wish" }),
          /* @__PURE__ */ u.jsx("button", { type: "button", children: "Done" })
        ] })
      ] }),
      /* @__PURE__ */ u.jsx("div", { className: "douban-grid", children: Array.from({ length: 12 }, (j, T) => /* @__PURE__ */ u.jsxs("div", { className: "douban-tile", children: [
        /* @__PURE__ */ u.jsx("div", { className: "douban-cover" }),
        /* @__PURE__ */ u.jsx("span", { className: "douban-line" }),
        /* @__PURE__ */ u.jsx("span", { className: "douban-line short" })
      ] }, T)) })
    ] });
  const p = (j, T) => {
    o(j), h(T), x(gr);
  }, N = v.slice(0, b);
  return /* @__PURE__ */ u.jsxs("div", { className: "douban", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "douban-bar", children: [
      /* @__PURE__ */ u.jsx("div", { className: "douban-tabs", children: Oy.map((j) => /* @__PURE__ */ u.jsxs("button", { type: "button", className: `douban-tab${j.id === r ? " active" : ""}`, onClick: () => p(j.id, f), children: [
        /* @__PURE__ */ u.jsx(j.Icon, {}),
        j.label,
        /* @__PURE__ */ u.jsx("small", { children: a.counts[j.id].wish + a.counts[j.id].done })
      ] }, j.id)) }),
      /* @__PURE__ */ u.jsxs("span", { className: "douban-seg", children: [
        /* @__PURE__ */ u.jsx("button", { type: "button", className: f === "wish" ? "active" : "", onClick: () => p(r, "wish"), children: "Wish" }),
        /* @__PURE__ */ u.jsx("button", { type: "button", className: f === "done" ? "active" : "", onClick: () => p(r, "done"), children: "Done" })
      ] }),
      /* @__PURE__ */ u.jsxs("label", { className: "douban-search", children: [
        /* @__PURE__ */ u.jsx(Tc, {}),
        /* @__PURE__ */ u.jsx("input", { className: "input", value: m, placeholder: `Search ${Ry[r][f].toLowerCase()}…`, onChange: (j) => {
          g(j.target.value), x(gr);
        } })
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "douban-meta", children: [
      /* @__PURE__ */ u.jsxs("span", { children: [
        Ry[r][f],
        " · ",
        m ? `${v.length} of ${a.counts[r][f]}` : a.counts[r][f],
        !m && a.counts[r][f] > v.length ? ` (${v.length} loaded)` : ""
      ] }),
      /* @__PURE__ */ u.jsx("a", { href: `https://${r}.douban.com/people/${encodeURIComponent(a.uid)}/${f === "wish" ? "wish" : "collect"}`, target: "_blank", rel: "noreferrer", children: "Open on Douban" })
    ] }),
    v.length === 0 && /* @__PURE__ */ u.jsx("p", { className: "rem-empty", children: m ? `Nothing matching "${m}".` : "Nothing here yet." }),
    v.length > 0 && /* @__PURE__ */ u.jsx("div", { className: "douban-grid", children: N.map((j) => /* @__PURE__ */ u.jsxs("a", { className: "douban-tile", href: j.url, target: "_blank", rel: "noreferrer", title: j.comment ? `${j.title}
${j.comment}` : j.title, children: [
      /* @__PURE__ */ u.jsx(aj, { item: j }),
      /* @__PURE__ */ u.jsx("b", { children: j.title }),
      /* @__PURE__ */ u.jsxs("small", { children: [
        j.status === "done" && j.rating ? /* @__PURE__ */ u.jsx(lj, { n: j.rating }) : null,
        /* @__PURE__ */ u.jsx("span", { children: j.date })
      ] }),
      j.status === "done" && j.comment ? /* @__PURE__ */ u.jsx("span", { className: "douban-comment", children: j.comment }) : null
    ] }, `${j.kind}-${j.id}`)) }),
    v.length > b && /* @__PURE__ */ u.jsxs("button", { type: "button", className: "button douban-more", onClick: () => x((j) => j + gr), children: [
      "Show more (",
      v.length - b,
      " left)"
    ] })
  ] });
}
const sj = { health: "Health", calendar: "Calendar", tasks: "Tasks", mail: "Mail", notes: "Notes", finance: "Finance", location: "Location", media: "Media", other: "Other" }, cj = { health: v2, calendar: n2, tasks: _c, location: Od, notes: Zy, mail: T2, media: Yy }, uj = { weather: By, contacts: Iy, photos: wr, home: vr, weread: rs }, rj = { reminders: ["add"], location: ["setHome", "location"], home: ["run"], weread: ["sync", "cookie", "fetch", "disconnect"], photos: ["thumb"] };
function oj({ open: a, onOpenChange: s, version: r, notify: o }) {
  const [f, h] = S.useState(null), [m, g] = S.useState(""), [b, x] = S.useState(""), v = S.useCallback(() => {
    yl("/sources").then((j) => {
      h(j.sources), g((T) => j.sources.some((U) => U.id === T) ? T : j.sources[0]?.id ?? "");
    }).catch((j) => o(`Could not load connectors: ${j.message}`));
  }, [o]);
  S.useEffect(() => {
    a && v();
  }, [a, r, v]);
  const p = f?.find((j) => j.id === m), N = async (j, T) => {
    if (!p) return !1;
    x(j);
    try {
      const U = T?.file ? { method: "POST", headers: { "content-type": T.file.type || "application/octet-stream" }, body: T.file } : { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(T?.json ?? {}) }, k = await fetch(dt(`/sources/${encodeURIComponent(p.id)}/${encodeURIComponent(j)}`), U), K = await k.json().catch(() => ({}));
      if (!k.ok) throw new Error(K.error ?? k.statusText);
      return K.message && o(K.message), v(), !0;
    } catch (U) {
      return o(`${p.label}: ${U.message}`), !1;
    } finally {
      x("");
    }
  };
  return /* @__PURE__ */ u.jsx(Ar, { open: a, onOpenChange: s, children: /* @__PURE__ */ u.jsxs(kr, { children: [
    /* @__PURE__ */ u.jsx(Cr, { className: "panel-overlay" }),
    /* @__PURE__ */ u.jsxs(Or, { className: "panel full connectors", "aria-describedby": void 0, onOpenAutoFocus: (j) => j.preventDefault(), children: [
      /* @__PURE__ */ u.jsxs("aside", { className: "src-side", children: [
        /* @__PURE__ */ u.jsxs("div", { className: "src-side-head", children: [
          /* @__PURE__ */ u.jsx(Rr, { className: "panel-title", children: "Connectors" }),
          /* @__PURE__ */ u.jsx("p", { className: "panel-subtitle", children: "What she can see about your day." })
        ] }),
        /* @__PURE__ */ u.jsx("nav", { className: "src-nav", children: f === null ? /* @__PURE__ */ u.jsx("p", { className: "empty", children: "Loading…" }) : f.length === 0 ? /* @__PURE__ */ u.jsx("p", { className: "empty", children: "No connectors loaded." }) : f.map((j) => {
          const T = uj[j.id] ?? cj[j.category] ?? lh;
          return /* @__PURE__ */ u.jsxs("button", { type: "button", className: `src-item${j.id === m ? " active" : ""}`, onClick: () => g(j.id), children: [
            /* @__PURE__ */ u.jsx("span", { className: "src-icon", children: /* @__PURE__ */ u.jsx(T, {}) }),
            /* @__PURE__ */ u.jsxs("span", { className: "src-text", children: [
              /* @__PURE__ */ u.jsx("b", { children: j.label }),
              /* @__PURE__ */ u.jsxs("small", { children: [
                /* @__PURE__ */ u.jsx("i", { className: `dot ${j.view.status}` }),
                j.view.status === "connected" ? j.view.shared ? "Connected" : "Connected · hidden" : j.view.status === "error" ? "Needs attention" : "Not set up"
              ] })
            ] })
          ] }, j.id);
        }) }),
        /* @__PURE__ */ u.jsxs("p", { className: "src-side-foot", children: [
          "Each connector is a dsh plugin under ",
          /* @__PURE__ */ u.jsx("code", { children: "plugins/" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs("section", { className: "src-main", children: [
        /* @__PURE__ */ u.jsx(Mr, { className: "icon-button src-close", "aria-label": "Close", children: /* @__PURE__ */ u.jsx(li, {}) }),
        p ? /* @__PURE__ */ u.jsx(dj, { source: p, busy: b, act: N }, p.id) : f !== null && f.length === 0 ? /* @__PURE__ */ u.jsx(fj, {}) : null
      ] })
    ] })
  ] }) });
}
function fj() {
  return /* @__PURE__ */ u.jsxs("div", { className: "src-empty", children: [
    /* @__PURE__ */ u.jsx(lh, {}),
    /* @__PURE__ */ u.jsx("p", { children: "No connectors are loaded." }),
    /* @__PURE__ */ u.jsxs("p", { className: "field-hint", children: [
      "Mount one of the plugins under ",
      /* @__PURE__ */ u.jsx("code", { children: "plugins/" }),
      " (health, calendar, weather) in your dsh config and it appears here."
    ] })
  ] });
}
function dj({ source: a, busy: s, act: r }) {
  const o = a.view, f = (o.actions ?? []).find((x) => x.kind === "toggle"), h = (o.actions ?? []).find((x) => x.id === "refresh"), m = rj[a.id] ?? [], g = (o.actions ?? []).filter((x) => x.kind !== "toggle" && x.id !== "refresh" && !m.includes(x.id)), b = a.id === "calendar" ? /* @__PURE__ */ u.jsx(xj, { data: o.data, placeholder: o.status !== "connected" }) : a.id === "reminders" ? /* @__PURE__ */ u.jsx(Sj, { data: o.data, busy: s, act: r, placeholder: o.status !== "connected" }) : a.id === "weather" ? /* @__PURE__ */ u.jsx(Nj, { data: o.data, placeholder: o.status !== "connected" }) : a.id === "contacts" ? /* @__PURE__ */ u.jsx(OT, { data: o.data, placeholder: o.status !== "connected", busy: s, act: r }) : a.id === "notes" ? /* @__PURE__ */ u.jsx(MT, { data: o.data, placeholder: o.status !== "connected", busy: s, act: r }) : a.id === "photos" ? /* @__PURE__ */ u.jsx(qT, { data: o.data, placeholder: o.status !== "connected", busy: s, act: r }) : a.id === "messages" ? /* @__PURE__ */ u.jsx(XT, { data: o.data, placeholder: o.status !== "connected", busy: s, act: r }) : a.id === "location" ? /* @__PURE__ */ u.jsx(JT, { data: o.data, placeholder: o.status !== "connected", busy: s, act: r }) : a.id === "home" ? /* @__PURE__ */ u.jsx(tj, { data: o.data, placeholder: o.status !== "connected", busy: s, act: r }) : a.id === "weread" ? /* @__PURE__ */ u.jsx(nj, { data: o.data, placeholder: o.status !== "connected", busy: s, act: r }) : a.id === "douban" ? /* @__PURE__ */ u.jsx(ij, { data: o.data, placeholder: o.status !== "connected", busy: s, act: r }) : /* @__PURE__ */ u.jsx(mj, { view: o });
  return /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsxs("header", { className: "src-head", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "src-titles", children: [
        /* @__PURE__ */ u.jsxs("h2", { children: [
          a.label,
          " ",
          /* @__PURE__ */ u.jsx("span", { className: "badge", children: sj[a.category] ?? a.category })
        ] }),
        /* @__PURE__ */ u.jsx("p", { className: `source-summary ${o.status}`, children: o.summary })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "src-head-actions", children: [
        f && /* @__PURE__ */ u.jsxs("label", { className: "src-shared", title: f.hint, children: [
          /* @__PURE__ */ u.jsx("span", { children: f.label }),
          /* @__PURE__ */ u.jsx("input", { type: "checkbox", className: "switch", checked: !!f.value, disabled: s !== "", onChange: (x) => {
            r(f.id, { json: { value: x.target.checked } });
          } })
        ] }),
        h && /* @__PURE__ */ u.jsx("button", { type: "button", className: `icon-button${s === "refresh" ? " spinning" : ""}`, title: "Refresh", disabled: s !== "", onClick: () => {
          r("refresh");
        }, children: /* @__PURE__ */ u.jsx(Md, {}) })
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "src-body", children: [
      o.status === "error" && /* @__PURE__ */ u.jsx("div", { className: "src-error", children: o.summary }),
      b,
      o.setup?.length || g.length ? /* @__PURE__ */ u.jsxs("div", { className: "src-setup", children: [
        o.setup?.map((x) => /* @__PURE__ */ u.jsxs("details", { className: "details", open: o.status !== "connected", children: [
          /* @__PURE__ */ u.jsx("summary", { children: x.title }),
          /* @__PURE__ */ u.jsx("ol", { className: "setup-steps", children: x.steps.map((v, p) => /* @__PURE__ */ u.jsx("li", { children: v }, p)) }),
          x.fields?.map((v) => /* @__PURE__ */ u.jsx(gj, { label: v.label, value: v.value, secret: v.secret }, v.label))
        ] }, x.title)),
        g.length > 0 && /* @__PURE__ */ u.jsx(hj, { actions: g, busy: s, act: r })
      ] }) : null
    ] })
  ] });
}
function hj({ actions: a, busy: s, act: r }) {
  const o = S.useRef(null), f = S.useRef("");
  return /* @__PURE__ */ u.jsxs("div", { className: "row end", style: { marginTop: 14, flexWrap: "wrap" }, children: [
    a.map((h) => /* @__PURE__ */ u.jsxs(
      "button",
      {
        type: "button",
        className: `button${h.kind === "danger" ? " danger" : ""}`,
        disabled: s !== "",
        title: h.hint,
        onClick: () => {
          if (h.kind === "upload") {
            f.current = h.id, o.current && (o.current.accept = h.accept ?? ""), o.current?.click();
            return;
          }
          if (!(h.kind === "danger" && h.confirm && !window.confirm(h.confirm))) {
            if (h.kind === "input") {
              const m = window.prompt(h.hint ?? h.label, h.placeholder ?? "");
              if (m === null || m.trim() === "") return;
              r(h.id, { json: { value: m.trim() } });
              return;
            }
            r(h.id);
          }
        },
        children: [
          h.kind === "upload" && /* @__PURE__ */ u.jsx(ih, {}),
          s === h.id ? "Working…" : h.label
        ]
      },
      h.id
    )),
    /* @__PURE__ */ u.jsx("input", { ref: o, type: "file", hidden: !0, onChange: (h) => {
      const m = h.target.files?.[0];
      h.target.value = "", m && r(f.current, { file: m });
    } })
  ] });
}
function mj({ view: a }) {
  return /* @__PURE__ */ u.jsxs("div", { className: `source${a.placeholder ? " placeholder" : ""}`, children: [
    a.stats && a.stats.length > 0 && /* @__PURE__ */ u.jsx("div", { className: "stat-grid", children: a.stats.map((s) => /* @__PURE__ */ u.jsxs("div", { className: "stat", children: [
      /* @__PURE__ */ u.jsx("small", { children: s.label }),
      /* @__PURE__ */ u.jsx("b", { children: s.value }),
      s.delta && /* @__PURE__ */ u.jsx("span", { className: `stat-delta ${s.tone ?? "flat"}`, children: s.delta })
    ] }, s.label)) }),
    a.series?.map((s) => /* @__PURE__ */ u.jsx(pj, { series: s }, s.label)),
    a.lists?.map((s) => /* @__PURE__ */ u.jsxs("section", { children: [
      /* @__PURE__ */ u.jsx("h3", { className: "section", children: s.title }),
      /* @__PURE__ */ u.jsx("ul", { className: "source-list", children: s.items.map((r, o) => /* @__PURE__ */ u.jsxs("li", { children: [
        /* @__PURE__ */ u.jsx("span", { children: r.primary }),
        r.secondary && /* @__PURE__ */ u.jsx("small", { children: r.secondary })
      ] }, o)) })
    ] }, s.title)),
    a.placeholder && /* @__PURE__ */ u.jsx("p", { className: "field-hint", style: { marginTop: 12 }, children: "A preview of what will show up here once data arrives." })
  ] });
}
function pj({ series: a }) {
  const s = a.points.map((g) => g.value).filter((g) => g !== void 0), r = Math.max(1, ...s), o = Math.min(...s), h = s.length > 1 && o > 0 && (r - o) / r < 0.35 ? o - (r - o) * 0.5 : 0, m = (g) => Math.max(4, (g - h) / (r - h) * 100);
  return /* @__PURE__ */ u.jsxs("section", { className: "bars", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "bars-head", children: [
      /* @__PURE__ */ u.jsx("h3", { className: "section", children: a.label }),
      /* @__PURE__ */ u.jsx("small", { children: s.length === 0 ? "" : `avg ${(s.reduce((g, b) => g + b, 0) / s.length).toFixed(a.unit === "" ? 0 : 1)}${a.unit ? ` ${a.unit}` : ""}` })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: "bars-row", children: a.points.map((g) => /* @__PURE__ */ u.jsxs("div", { className: "bar-col", title: `${g.day.replace("T", " ")}: ${g.value === void 0 ? "no data" : `${g.value}${a.unit ? ` ${a.unit}` : ""}`}`, children: [
      /* @__PURE__ */ u.jsx("div", { className: `bar${g.value === void 0 ? " none" : ""}`, style: { height: `${g.value === void 0 ? 4 : m(g.value)}%` } }),
      /* @__PURE__ */ u.jsx("small", { children: g.day.includes("T") ? g.day.slice(11, 13) : g.day.slice(8) })
    ] }, g.day)) })
  ] });
}
function gj({ label: a, value: s, secret: r }) {
  const [o, f] = S.useState(!1), [h, m] = S.useState(!r);
  return /* @__PURE__ */ u.jsxs("div", { className: "copy-field", children: [
    /* @__PURE__ */ u.jsx("small", { children: a }),
    /* @__PURE__ */ u.jsx("code", { onClick: () => m(!0), title: h ? void 0 : "Click to reveal", children: h ? s : "•".repeat(Math.min(24, s.length)) }),
    /* @__PURE__ */ u.jsx("button", { type: "button", className: "icon-button small", title: "Copy", onClick: () => {
      navigator.clipboard.writeText(s).then(() => {
        f(!0), window.setTimeout(() => f(!1), 1200);
      });
    }, children: o ? /* @__PURE__ */ u.jsx(os, {}) : /* @__PURE__ */ u.jsx(th, {}) })
  ] });
}
const Wd = (a) => String(a).padStart(2, "0"), Th = (a) => `${a.getFullYear()}-${Wd(a.getMonth() + 1)}-${Wd(a.getDate())}`, ml = (a, s) => {
  const r = /* @__PURE__ */ new Date(`${a}T12:00:00`);
  return r.setDate(r.getDate() + s), Th(r);
}, is = (a) => (/* @__PURE__ */ new Date(`${a}T12:00:00`)).getDay(), jh = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], s1 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], yr = (a) => Number(a.slice(11, 13)) * 60 + Number(a.slice(14, 16)), ei = (a) => a.slice(11, 16), yj = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], vj = (a, s) => a === s ? "Today" : a === ml(s, 1) ? "Tomorrow" : `${jh[is(a)]}, ${yj[Number(a.slice(5, 7)) - 1]} ${Number(a.slice(8))}${a.slice(0, 4) === s.slice(0, 4) ? "" : ` ${a.slice(0, 4)}`}`, bj = (a, s) => a === s ? "Today" : a === ml(s, 1) ? "Tomorrow" : a === ml(s, -1) ? "Yesterday" : `${jh[is(a)]}, ${s1[Number(a.slice(5, 7)) - 1]} ${Number(a.slice(8))}`;
function xj({ data: a, placeholder: s }) {
  const r = a?.today ?? Th(/* @__PURE__ */ new Date()), o = a?.events ?? [], [f, h] = S.useState(r), [m, g] = S.useState(() => ml(r, -((is(r) + 6) % 7))), b = Array.from({ length: 7 }, ($, V) => ml(m, V)), x = ($) => o.filter((V) => V.start.slice(0, 10) === $ || V.allDay && V.start.slice(0, 10) <= $ && V.end.slice(0, 10) > $), v = ($) => $ >= ml(r, -((is(r) + 6) % 7)) && $ < ml(r, 14), p = x(f), N = p.filter(($) => !$.allDay).sort(($, V) => $.start.localeCompare(V.start)), j = p.filter(($) => $.allDay), T = ($) => $.end.slice(0, 10) > $.start.slice(0, 10) ? 1440 : yr($.end), U = N.length ? Math.min(...N.map(($) => yr($.start))) : 540, k = N.length ? Math.max(...N.map(T)) : 1080, K = Math.max(0, Math.min(8, Math.floor(U / 60) - 1)), X = Math.min(24, Math.max(19, Math.ceil(k / 60) + 1)), H = (X - K) * 60, F = S.useMemo(() => {
    const $ = [];
    let V = [], ae = [], ke = -1;
    const xe = () => {
      for (const Ee of ae) Ee.cols = V.length;
      ae = [], V = [];
    };
    for (const Ee of N) {
      const ve = yr(Ee.start), at = Math.max(ve + 15, T(Ee));
      ve >= ke && xe();
      let We = V.findIndex((I) => I <= ve);
      We === -1 ? (V.push(at), We = V.length - 1) : V[We] = at, ke = Math.max(ke, at);
      const Ye = { e: Ee, col: We, cols: 1 };
      ae.push(Ye), $.push(Ye);
    }
    return xe(), $;
  }, [N]), W = r === f ? (/* @__PURE__ */ new Date()).getHours() * 60 + (/* @__PURE__ */ new Date()).getMinutes() : -1;
  return /* @__PURE__ */ u.jsxs("div", { className: `cal${s ? " placeholder" : ""}`, children: [
    /* @__PURE__ */ u.jsxs("div", { className: "cal-week-head", children: [
      /* @__PURE__ */ u.jsx("button", { type: "button", className: "icon-button small", onClick: () => g(ml(m, -7)), "aria-label": "Previous week", children: /* @__PURE__ */ u.jsx(Uy, {}) }),
      /* @__PURE__ */ u.jsxs("b", { children: [
        s1[Number(m.slice(5, 7)) - 1],
        " ",
        m.slice(0, 4)
      ] }),
      /* @__PURE__ */ u.jsx("button", { type: "button", className: "text-button", onClick: () => {
        g(ml(r, -((is(r) + 6) % 7))), h(r);
      }, children: "Today" }),
      /* @__PURE__ */ u.jsx("button", { type: "button", className: "icon-button small", onClick: () => g(ml(m, 7)), "aria-label": "Next week", children: /* @__PURE__ */ u.jsx(Hy, {}) })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: "cal-week", children: b.map(($) => {
      const V = x($);
      return /* @__PURE__ */ u.jsxs("button", { type: "button", className: `cal-day${$ === f ? " selected" : ""}${$ === r ? " today" : ""}${v($) ? "" : " unknown"}`, onClick: () => h($), children: [
        /* @__PURE__ */ u.jsx("small", { children: jh[is($)] }),
        /* @__PURE__ */ u.jsx("b", { children: Number($.slice(8)) }),
        /* @__PURE__ */ u.jsx("span", { className: "cal-dots", children: V.slice(0, 4).map((ae) => /* @__PURE__ */ u.jsx("i", { style: { background: ae.color || "var(--brand)" } }, ae.id)) })
      ] }, $);
    }) }),
    /* @__PURE__ */ u.jsxs("div", { className: "cal-day-head", children: [
      /* @__PURE__ */ u.jsx("h3", { children: bj(f, r) }),
      /* @__PURE__ */ u.jsx("small", { children: p.length === 0 ? v(f) ? "Nothing scheduled" : "Not loaded" : `${p.length} event${p.length === 1 ? "" : "s"}` })
    ] }),
    j.length > 0 && /* @__PURE__ */ u.jsx("div", { className: "cal-allday", children: j.map(($) => /* @__PURE__ */ u.jsxs("span", { className: "cal-chip", style: { borderColor: $.color || "var(--brand)" }, children: [
      $.title,
      /* @__PURE__ */ u.jsx("small", { children: $.calendar })
    ] }, $.id)) }),
    /* @__PURE__ */ u.jsxs("div", { className: "cal-grid", style: { height: `${(X - K) * 44}px` }, children: [
      Array.from({ length: X - K }, ($, V) => /* @__PURE__ */ u.jsx("div", { className: "cal-hour", style: { top: `${V / (X - K) * 100}%` }, children: /* @__PURE__ */ u.jsxs("small", { children: [
        Wd(K + V),
        ":00"
      ] }) }, V)),
      W >= K * 60 && W <= X * 60 && /* @__PURE__ */ u.jsx("div", { className: "cal-now", style: { top: `${(W - K * 60) / H * 100}%` } }),
      F.map(({ e: $, col: V, cols: ae }) => {
        const ke = yr($.start), xe = Math.max(ke + 20, T($));
        return /* @__PURE__ */ u.jsxs(
          "div",
          {
            className: `cal-event${$.status === "canceled" ? " canceled" : ""}${xe - ke < 40 ? " short" : ""}`,
            title: `${ei($.start)}–${ei($.end)} ${$.title}${$.location ? ` @ ${$.location}` : ""}`,
            style: { top: `${(ke - K * 60) / H * 100}%`, height: `${(xe - ke) / H * 100}%`, left: `calc(52px + (100% - 60px) * ${V / ae})`, width: `calc((100% - 60px) * ${1 / ae} - 4px)`, borderLeftColor: $.color || "var(--brand)", background: `color-mix(in oklab, ${$.color || "var(--brand)"} 14%, var(--card))` },
            children: [
              /* @__PURE__ */ u.jsx("b", { children: $.title }),
              /* @__PURE__ */ u.jsxs("small", { children: [
                ei($.start),
                "–",
                ei($.end),
                $.location ? ` · ${$.location.split(`
`)[0]}` : ""
              ] })
            ]
          },
          $.id
        );
      }),
      N.length === 0 && /* @__PURE__ */ u.jsx("div", { className: "cal-free", children: s ? "Waiting for calendar access" : "Free" })
    ] })
  ] });
}
function Sj({ data: a, busy: s, act: r, placeholder: o }) {
  const f = a?.today ?? Th(/* @__PURE__ */ new Date()), [h, m] = S.useState(""), [g, b] = S.useState(/* @__PURE__ */ new Set()), x = (a?.reminders ?? []).filter((T) => !g.has(T.id)), v = [
    ["Overdue", x.filter((T) => T.due !== null && T.due.slice(0, 10) < f)],
    ["Today", x.filter((T) => T.due !== null && T.due.slice(0, 10) === f)],
    ["Coming up", x.filter((T) => T.due !== null && T.due.slice(0, 10) > f).sort((T, U) => T.due.localeCompare(U.due))],
    ["No date", x.filter((T) => T.due === null)]
  ], p = async (T) => {
    b((k) => new Set(k).add(T.id)), await r("complete", { json: { value: T.id } }) || b((k) => {
      const K = new Set(k);
      return K.delete(T.id), K;
    });
  }, N = async () => {
    const T = h.trim();
    T && await r("add", { json: { value: T } }) && m("");
  }, j = (T) => T.due === null ? "" : `${vj(T.due.slice(0, 10), f)}${T.hasTime ? ` ${ei(T.due)}` : ""}`;
  return /* @__PURE__ */ u.jsxs("div", { className: `rem${o ? " placeholder" : ""}`, children: [
    /* @__PURE__ */ u.jsxs("div", { className: "rem-add", children: [
      /* @__PURE__ */ u.jsx("input", { className: "input", value: h, placeholder: "Add a reminder… e.g. Call mum tomorrow 18:00", disabled: s !== "" || o, onChange: (T) => m(T.target.value), onKeyDown: (T) => {
        T.key === "Enter" && !T.nativeEvent.isComposing && (T.preventDefault(), N());
      } }),
      /* @__PURE__ */ u.jsx("button", { type: "button", className: "button primary", disabled: s !== "" || h.trim() === "", onClick: () => {
        N();
      }, children: s === "add" ? "Adding…" : "Add" })
    ] }),
    x.length === 0 && /* @__PURE__ */ u.jsx("p", { className: "rem-empty", children: o ? "Waiting for reminders access" : "All clear. Nothing open." }),
    v.filter(([, T]) => T.length > 0).map(([T, U]) => /* @__PURE__ */ u.jsxs("section", { className: "rem-group", children: [
      /* @__PURE__ */ u.jsxs("h3", { className: "section", children: [
        T,
        " ",
        /* @__PURE__ */ u.jsx("span", { className: "badge", children: U.length })
      ] }),
      /* @__PURE__ */ u.jsx("ul", { className: "rem-list", children: U.map((k) => /* @__PURE__ */ u.jsxs("li", { className: `rem-row${T === "Overdue" ? " overdue" : ""}`, children: [
        /* @__PURE__ */ u.jsx("button", { type: "button", className: "rem-check", title: "Mark done", disabled: s !== "", onClick: () => {
          p(k);
        }, children: /* @__PURE__ */ u.jsx(os, {}) }),
        /* @__PURE__ */ u.jsxs("span", { className: "rem-text", children: [
          /* @__PURE__ */ u.jsx("b", { children: k.title }),
          k.notes && /* @__PURE__ */ u.jsx("small", { className: "rem-notes", children: k.notes.split(`
`)[0] })
        ] }),
        /* @__PURE__ */ u.jsxs("small", { className: "rem-meta", children: [
          j(k),
          j(k) && " · ",
          k.list
        ] })
      ] }, k.id)) })
    ] }, T))
  ] });
}
function Ad({ code: a, night: s }) {
  const r = a === 0 || a === 1 ? s ? _2 : L2 : a === 2 ? By : a === 3 ? Cd : a <= 48 ? c2 : a <= 57 ? s2 : a <= 67 || a >= 80 && a <= 82 ? r2 : a <= 77 || a === 85 || a === 86 ? o2 : a >= 95 ? u2 : Cd;
  return /* @__PURE__ */ u.jsx(r, {});
}
function Nj({ data: a, placeholder: s }) {
  if (!a) return /* @__PURE__ */ u.jsx("div", { className: "wx placeholder", children: /* @__PURE__ */ u.jsxs("div", { className: "wx-hero", children: [
    /* @__PURE__ */ u.jsx("div", { className: "wx-icon", children: /* @__PURE__ */ u.jsx(Cd, {}) }),
    /* @__PURE__ */ u.jsx("div", { className: "wx-temp", children: "—" }),
    /* @__PURE__ */ u.jsx("div", { className: "wx-desc", children: /* @__PURE__ */ u.jsx("b", { children: s ? "Waiting for the forecast" : "" }) })
  ] }) });
  const r = (m) => String(Math.round(m)), o = Math.min(...a.daily.map((m) => m.min)), f = Math.max(...a.daily.map((m) => m.max)), h = Math.max(1, f - o);
  return /* @__PURE__ */ u.jsxs("div", { className: "wx", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "wx-hero", children: [
      /* @__PURE__ */ u.jsx("div", { className: "wx-icon", children: /* @__PURE__ */ u.jsx(Ad, { code: a.current.code, night: !a.current.isDay }) }),
      /* @__PURE__ */ u.jsxs("div", { className: "wx-temp", children: [
        r(a.current.temp),
        /* @__PURE__ */ u.jsx("span", { children: a.units.deg })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "wx-desc", children: [
        /* @__PURE__ */ u.jsx("b", { children: a.current.text }),
        /* @__PURE__ */ u.jsxs("small", { children: [
          "Feels like ",
          r(a.current.feels),
          a.units.deg,
          " · humidity ",
          a.current.humidity,
          "% · wind ",
          r(a.current.wind),
          " ",
          a.units.wind
        ] }),
        /* @__PURE__ */ u.jsx("small", { children: a.daily[0] ? `High ${r(a.daily[0].max)} · low ${r(a.daily[0].min)} · UV ${r(a.daily[0].uv)} · sun ${ei(a.daily[0].sunrise)}–${ei(a.daily[0].sunset)}` : "" })
      ] })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: "wx-hours", children: a.hourly.map((m, g) => /* @__PURE__ */ u.jsxs("div", { className: "wx-hour", children: [
      /* @__PURE__ */ u.jsx("small", { children: g === 0 ? "Now" : `${m.time.slice(11, 13)}h` }),
      /* @__PURE__ */ u.jsx(Ad, { code: m.code, night: Number(m.time.slice(11, 13)) < 6 || Number(m.time.slice(11, 13)) >= 19 }),
      /* @__PURE__ */ u.jsxs("b", { children: [
        r(m.temp),
        "°"
      ] }),
      /* @__PURE__ */ u.jsx("small", { className: `wx-rain${m.rain >= 30 ? " on" : ""}`, children: m.rain >= 20 ? `${m.rain}%` : "" })
    ] }, m.time)) }),
    /* @__PURE__ */ u.jsx("ul", { className: "wx-days", children: a.daily.map((m) => /* @__PURE__ */ u.jsxs("li", { children: [
      /* @__PURE__ */ u.jsx("span", { className: "wx-day", children: m.label }),
      /* @__PURE__ */ u.jsx("span", { className: "wx-day-icon", children: /* @__PURE__ */ u.jsx(Ad, { code: m.code }) }),
      /* @__PURE__ */ u.jsx("span", { className: "wx-day-text", children: m.text }),
      /* @__PURE__ */ u.jsx("span", { className: `wx-rain${m.rain >= 30 ? " on" : ""}`, children: m.rain >= 20 ? `${m.rain}%` : "" }),
      /* @__PURE__ */ u.jsxs("span", { className: "wx-lo", children: [
        r(m.min),
        "°"
      ] }),
      /* @__PURE__ */ u.jsx("span", { className: "wx-range", children: /* @__PURE__ */ u.jsx("i", { style: { left: `${(m.min - o) / h * 100}%`, width: `${Math.max(6, (m.max - m.min) / h * 100)}%` } }) }),
      /* @__PURE__ */ u.jsxs("span", { className: "wx-hi", children: [
        r(m.max),
        "°"
      ] })
    ] }, m.day)) })
  ] });
}
const Ej = {
  reading: rs,
  writing: k2,
  searching: Tc,
  running: U2,
  waiting: b2,
  failed: Ky,
  done: os,
  idle: ah
};
function Tj() {
  const [a, s] = S.useState(() => {
    const o = localStorage.getItem("gal-chat-theme");
    return o === "light" || o === "dark" ? o : "system";
  });
  return S.useEffect(() => {
    const o = matchMedia("(prefers-color-scheme: dark)"), f = () => {
      document.documentElement.classList.toggle("dark", a === "dark" || a === "system" && o.matches);
    };
    if (f(), a === "system")
      return o.addEventListener("change", f), () => o.removeEventListener("change", f);
  }, [a]), [a, (o) => {
    s(o), o === "system" ? localStorage.removeItem("gal-chat-theme") : localStorage.setItem("gal-chat-theme", o);
  }];
}
const jj = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
function wj(a, s) {
  const [r, o] = S.useState(""), [f, h] = S.useState(!1), m = S.useRef(0), g = S.useRef(null), b = S.useRef(!1), x = S.useRef(null), v = S.useRef(null), p = S.useRef(null), N = S.useRef(/* @__PURE__ */ new Map()), j = (X, H) => {
    const F = N.current;
    for (F.delete(X), F.set(X, H); F.size > 24; ) {
      const W = F.keys().next().value;
      if (W === void 0) break;
      F.delete(W);
    }
  }, T = () => {
    if (!g.current) {
      const X = new Audio();
      X.preload = "auto", g.current = X;
    }
    return g.current;
  }, U = S.useCallback(() => {
    m.current += 1, v.current?.abort(), v.current = null, x.current = null, g.current && (g.current.pause(), g.current.onended = null, g.current.onerror = null), p.current && (URL.revokeObjectURL(p.current), p.current = null), h(!1), o("");
  }, []), k = S.useCallback(async (X, H) => {
    const F = T();
    F.onended = () => {
      H === m.current && U();
    }, F.onerror = () => {
      H === m.current && (U(), o(Ll("speech_error")));
    }, F.src = X, await F.play(), H === m.current && (h(!0), o("Speaking…"));
  }, [U]), K = S.useCallback((X) => {
    if (U(), !a || X.trim() === "") return;
    const H = m.current, F = new AbortController();
    v.current = F, o("Preparing voice…"), (async () => {
      try {
        const W = `${s}
${X}`;
        let $ = N.current.get(W);
        if ($ === void 0) {
          const ae = await fetch(dt("/voice/read"), { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text: X, language: s, dub: !0 }), signal: F.signal });
          if (!ae.ok) throw new Error((await ae.json().catch(() => ({ error: "speech_error" }))).error ?? "speech_error");
          $ = await ae.blob(), j(W, $);
        }
        if (H !== m.current) return;
        const V = URL.createObjectURL($);
        p.current = V;
        try {
          await k(V, H);
        } catch (ae) {
          if (ae instanceof DOMException && ae.name === "NotAllowedError")
            x.current = V, o("Click or press a key to hear the reply");
          else throw ae;
        }
      } catch (W) {
        if (H !== m.current) return;
        U(), W instanceof DOMException && W.name === "AbortError" || o(Ll(W.message));
      }
    })();
  }, [a, s, U, k]);
  return S.useEffect(() => {
    const X = () => {
      if (x.current) {
        const F = x.current;
        x.current = null, k(F, m.current).catch(() => o(Ll("speech_error"))), b.current = !0;
        return;
      }
      if (b.current) return;
      const H = T();
      H.src = jj, H.play().then(() => {
        b.current = !0;
      }).catch(() => {
      });
    };
    return window.addEventListener("pointerdown", X, !0), window.addEventListener("keydown", X, !0), () => {
      window.removeEventListener("pointerdown", X, !0), window.removeEventListener("keydown", X, !0);
    };
  }, [k]), S.useEffect(() => (window.addEventListener("pagehide", U), () => window.removeEventListener("pagehide", U)), [U]), { speak: K, stop: U, status: r, speaking: f };
}
function _j() {
  const [a, s] = S.useState(null), [r, o] = S.useState([]), [f, h] = S.useState(!1), [m, g] = S.useState("idle"), [b, x] = S.useState(null), [v, p] = S.useState(null), [N, j] = S.useState(!1), [T, U] = S.useState(""), [k, K] = S.useState(null), [X, H] = S.useState("pick"), [F, W] = S.useState(null), [$, V] = S.useState([]), [ae, ke] = S.useState([]), [xe, Ee] = S.useState(null), [ve, at] = S.useState([]), [We, Ye] = S.useState(0), [I, me] = S.useState(() => localStorage.getItem("gal-voice") !== "off"), [he, Me] = S.useState(() => {
    const Q = localStorage.getItem("gal-speech-language");
    return Q === "zh" || Q === "en" || Q === "ja" ? Q : "auto";
  }), [Z, qe] = Tj(), et = aT(), en = he === "auto" ? et : he, _ = wj(I, en), B = S.useRef(null), oe = S.useRef(null), ue = S.useRef(""), Ce = S.useRef(null), _e = (Q) => {
    typeof Q.voice == "boolean" && (me(Q.voice), localStorage.setItem("gal-voice", Q.voice ? "on" : "off"));
    const P = Q.speechLanguage;
    (P === "auto" || P === "zh" || P === "en" || P === "ja") && (Me(P), localStorage.setItem("gal-speech-language", P));
  }, De = S.useRef(_e);
  De.current = _e, S.useEffect(() => {
    yl("/settings").then(_e).catch(() => {
    });
  }, []);
  const se = (Q) => {
    _e({ voice: Q }), Q || _.stop(), gl("/settings", { voice: Q }).catch(() => it("Could not save the voice setting"));
  }, pe = (Q) => {
    _e({ speechLanguage: Q }), _.stop(), gl("/settings", { speechLanguage: Q }).catch(() => it("Could not save the speech language"));
  }, it = S.useCallback((Q) => {
    U(Q), oe.current !== null && window.clearTimeout(oe.current), oe.current = window.setTimeout(() => U(""), 6500);
  }, []), vl = S.useRef(_.speak);
  vl.current = _.speak;
  const He = S.useRef(_.stop);
  He.current = _.stop;
  const Yt = S.useRef(et);
  Yt.current = et;
  const Ne = S.useCallback((Q) => {
    switch (Q.type) {
      case "user":
        He.current(), o((P) => [...xc(P), { kind: "msg", key: En(), role: "user", text: String(Q.text ?? ""), at: Date.now() }]), h(!0);
        break;
      case "status": {
        const P = { activity: String(Q.activity ?? "reading"), text: String(Q.tool ?? Q.text ?? ""), ...Q.command === void 0 ? {} : { command: String(Q.command) } };
        o((be) => {
          const re = be[be.length - 1], Et = re?.kind === "msg" && re.streaming && re.text === "" ? be.slice(0, -1) : be, wt = Et[Et.length - 1];
          return wt?.kind === "steps" ? [...Et.slice(0, -1), { ...wt, steps: [...wt.steps, P], live: !0 }] : [...Et, { kind: "steps", key: En(), steps: [P], live: !0 }];
        }), Q.activity && g(String(Q.activity));
        break;
      }
      case "activity":
        if (Q.beat) {
          x(String(Q.activity)), window.setTimeout(() => x(null), 2600), Q.activity === "failed" && o((P) => {
            const be = P[P.length - 1];
            if (be?.kind !== "steps" || be.steps.length === 0) return P;
            const re = [...be.steps];
            return re[re.length - 1] = { ...re[re.length - 1], failed: !0 }, [...P.slice(0, -1), { ...be, steps: re }];
          });
          break;
        }
        g(String(Q.activity)), Q.activity === "done" && (B.current !== null && window.clearTimeout(B.current), B.current = window.setTimeout(() => g((P) => P === "done" ? "idle" : P), 3e4));
        break;
      case "delta":
        if (Q.reset) {
          o((P) => [...xc(kd(P)), { kind: "msg", key: En(), role: "assistant", text: "", streaming: !0, at: Date.now() }]);
          break;
        }
        if (Q.done) break;
        typeof Q.text == "string" && o((P) => {
          const be = My(P);
          if (be === -1) return [...xc(P), { kind: "msg", key: En(), role: "assistant", text: Q.text, streaming: !0, at: Date.now() }];
          const re = P[be];
          return [...P.slice(0, be), { ...re, text: re.text + Q.text }, ...P.slice(be + 1)];
        });
        break;
      case "assistant": {
        const P = String(Q.text ?? "");
        o((be) => {
          const re = My(be), Et = { kind: "msg", key: En(), role: "assistant", text: P, at: Date.now() };
          return re === -1 ? [...xc(be), Et] : kd([...be.slice(0, re), Et, ...be.slice(re + 1)]);
        }), ue.current = P, vl.current(P);
        break;
      }
      case "busy":
        h(!!Q.value), Q.value || o((P) => xc(kd(P)));
        break;
      case "session":
        o([{ kind: "notice", key: En(), text: "New session" }]), h(!1), g("idle");
        break;
      case "manifest":
        s(Q.manifest), p(null);
        break;
      case "snapshot": {
        const P = Array.isArray(Q.entries) ? Q.entries : [], be = [];
        for (const re of P)
          if (re.role === "status") {
            const Et = { activity: String(re.activity ?? "reading"), text: String(re.tool ?? re.text ?? ""), ...re.command === void 0 ? {} : { command: String(re.command) }, ...re.failed ? { failed: !0 } : {} }, wt = be[be.length - 1];
            wt?.kind === "steps" ? wt.steps.push(Et) : be.push({ kind: "steps", key: En(), steps: [Et], live: !1 });
          } else re.role === "list" && re.list ? be.push({ kind: "list", key: En(), list: re.list }) : (re.role === "user" || re.role === "assistant") && be.push({ kind: "msg", key: En(), role: re.role, text: re.text, at: 0 });
        if (be.length > 0) {
          o(be);
          const re = be[be.length - 1];
          re.kind === "msg" && re.role === "assistant" && (ue.current = re.text);
        }
        Array.isArray(Q.artifacts) && at(Q.artifacts);
        break;
      }
      case "artifact":
        Array.isArray(Q.artifacts) && at(Q.artifacts), Q.fresh && Q.artifact && o((P) => [...P, { kind: "artifact", key: En(), artifact: Q.artifact }]);
        break;
      case "memory":
        Array.isArray(Q.entries) && V(Q.entries);
        break;
      case "sources":
        Ye((P) => P + 1);
        break;
      case "notice":
        typeof Q.text == "string" && o((P) => [...P, { kind: "notice", key: En(), text: Q.text }]);
        break;
      case "settings":
        Q.prefs && De.current(Q.prefs);
        break;
      case "lists": {
        const P = Array.isArray(Q.lists) ? Q.lists : [];
        ke(P);
        const be = typeof Q.fresh == "string" ? P.find((re) => re.id === Q.fresh) : void 0;
        be && o((re) => [...re, { kind: "list", key: En(), list: be }]);
        break;
      }
    }
  }, []);
  S.useEffect(() => {
    let Q = null;
    return yl("/manifest.json").then((P) => {
      s(P), Q = new EventSource(dt("/events")), Q.onopen = () => j(!0), Q.onerror = () => j(!1), Q.onmessage = (be) => {
        try {
          Ne(JSON.parse(be.data));
        } catch {
        }
      };
    }).catch(() => o([{ kind: "notice", key: En(), text: "Could not reach the dsh-gal server." }])), () => {
      Q?.close();
    };
  }, [Ne]), S.useEffect(() => {
    a && (document.title = `${a.characterName} · dsh-gal`);
  }, [a?.characterName]);
  const fe = S.useCallback((Q, P) => {
    P?.tab && H(P.tab), W(P?.file ?? null), K(Q);
  }, []), st = S.useCallback(async () => {
    try {
      await fetch(dt("/session/new"), { method: "POST" });
    } catch (Q) {
      it(`Could not start a session: ${Q.message}`);
    }
  }, [it]), tn = S.useCallback(() => {
    ue.current !== "" && _.speak(ue.current);
  }, [_]), nn = S.useCallback(async (Q) => {
    const [P, ...be] = Q.trim().split(/\s+/), re = be.join(" ");
    switch (P) {
      case "/new":
        await st();
        return;
      case "/char":
        if (re === "") {
          fe("character", { tab: "pick" });
          return;
        }
        try {
          await gl("/character", { id: re });
        } catch {
          it(`Unknown character "${re}"`);
        }
        return;
      case "/edit":
        fe("character", { tab: "persona" });
        return;
      case "/gallery":
        fe("character", { tab: "art" });
        return;
      case "/memory":
        fe("memory");
        return;
      case "/files":
        fe("files");
        return;
      case "/lists":
        fe("lists");
        return;
      case "/data":
        fe("data");
        return;
      case "/voice":
        se(!I), it(I ? "Voice off." : "Voice on.");
        return;
      case "/help":
        fe("help");
        return;
      default:
        it(`Unknown command ${P}. Try /help.`);
    }
  }, [st, it, fe, I]), Qt = S.useCallback(async (Q) => {
    if (Q.startsWith("/")) {
      await nn(Q);
      return;
    }
    const P = await fetch(dt("/send"), { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text: Q }) });
    if (!P.ok) throw new Error(await P.text());
  }, [nn]);
  S.useEffect(() => {
    const Q = (P) => {
      if (P.isComposing) return;
      const re = !!P.target?.closest?.("input,textarea,select,[contenteditable]");
      if (P.altKey && !P.metaKey && !P.ctrlKey) {
        const wt = {
          KeyM: () => fe("memory"),
          KeyF: () => fe("files"),
          KeyL: () => fe("lists"),
          KeyD: () => fe("data"),
          KeyC: () => fe("character"),
          KeyS: () => fe("settings"),
          KeyV: () => {
            se(!I);
          },
          KeyR: tn,
          Slash: () => fe("help")
        }[P.code];
        if (wt) {
          P.preventDefault(), wt();
          return;
        }
      }
      re || k !== null || (P.key === "/" || P.key === "、" || P.key === "／") && (P.preventDefault(), Ce.current?.focus());
    };
    return window.addEventListener("keydown", Q), () => window.removeEventListener("keydown", Q);
  }, [fe, k, tn, I]);
  const Hn = v ?? b ?? (f ? m : m === "done" ? "done" : m === "waiting" ? "waiting" : "idle"), Kt = a?.characterName ?? "…", ln = (Q) => {
    Q || K(null);
  };
  return /* @__PURE__ */ u.jsxs("div", { className: "app", children: [
    /* @__PURE__ */ u.jsxs("section", { className: "chat", children: [
      /* @__PURE__ */ u.jsxs("header", { className: "chat-header", children: [
        /* @__PURE__ */ u.jsxs("button", { type: "button", className: "who", title: "Character (⌥C)", onClick: () => fe("character"), children: [
          /* @__PURE__ */ u.jsx(Aj, { manifest: a }),
          /* @__PURE__ */ u.jsxs("div", { className: "who-text", children: [
            /* @__PURE__ */ u.jsx("span", { className: "who-name", children: Kt }),
            /* @__PURE__ */ u.jsxs("span", { className: `who-state${f || _.speaking ? " busy" : ""}${N ? "" : " off"}`, children: [
              /* @__PURE__ */ u.jsx("i", { className: "dot" }),
              N ? _.speaking && !f ? "Speaking" : Ec[Hn] ?? Hn : "Disconnected"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ u.jsxs("div", { className: "header-actions", children: [
          /* @__PURE__ */ u.jsx(ns, { title: I ? "Voice on (⌥V)" : "Voice off (⌥V)", onClick: () => se(!I), active: I, children: I ? /* @__PURE__ */ u.jsx(Jy, {}) : /* @__PURE__ */ u.jsx($2, {}) }),
          /* @__PURE__ */ u.jsx(ns, { title: "Memory (⌥M)", onClick: () => fe("memory"), children: /* @__PURE__ */ u.jsx(t2, {}) }),
          /* @__PURE__ */ u.jsx(ns, { title: "Files (⌥F)", onClick: () => fe("files"), children: /* @__PURE__ */ u.jsx(g2, {}) }),
          /* @__PURE__ */ u.jsx(ns, { title: "Lists (⌥L)", onClick: () => fe("lists"), children: /* @__PURE__ */ u.jsx(_c, {}) }),
          /* @__PURE__ */ u.jsx(ns, { title: "Connectors (⌥D)", onClick: () => fe("data"), children: /* @__PURE__ */ u.jsx(lh, {}) }),
          /* @__PURE__ */ u.jsx(ns, { title: "Settings (⌥S)", onClick: () => fe("settings"), children: /* @__PURE__ */ u.jsx(R2, {}) })
        ] })
      ] }),
      /* @__PURE__ */ u.jsx(kj, { items: r, lists: ae, name: Kt, busy: f, onReplay: (Q) => _.speak(Q), onOpenFile: (Q) => fe("files", { file: Q }), onOpenList: (Q) => {
        Ee(Q), fe("lists");
      } }),
      /* @__PURE__ */ u.jsx(zj, { ref: Ce, onSend: Qt, busy: f, name: Kt, notice: T, voiceStatus: _.speaking ? "" : _.status, speaking: _.speaking, onStopVoice: _.stop })
    ] }),
    /* @__PURE__ */ u.jsx(Lj, { manifest: a, activity: Hn, name: Kt }),
    /* @__PURE__ */ u.jsx(
      cT,
      {
        open: k === "character",
        onOpenChange: ln,
        tab: X,
        setTab: H,
        manifest: a,
        lang: et,
        preview: v,
        setPreview: p,
        notify: it,
        onManifestChange: (Q) => s((P) => P && { ...P, ...Q })
      }
    ),
    /* @__PURE__ */ u.jsx(fT, { open: k === "memory", onOpenChange: ln, entries: $, setEntries: V, notify: it }),
    /* @__PURE__ */ u.jsx(hT, { open: k === "lists", onOpenChange: ln, lists: ae, setLists: ke, openId: xe, notify: it }),
    /* @__PURE__ */ u.jsx(bT, { open: k === "files", onOpenChange: ln, artifacts: ve, setArtifacts: at, openId: F, notify: it }),
    /* @__PURE__ */ u.jsx(jT, { open: k === "settings", onOpenChange: ln, theme: Z, setTheme: qe, voiceOn: I, setVoiceOn: se, speechPref: he, setSpeechPref: pe, speechLang: en, onNewSession: () => {
      st();
    }, stopVoice: _.stop, onHelp: () => fe("help") }),
    /* @__PURE__ */ u.jsx(oj, { open: k === "data", onOpenChange: ln, version: We, notify: it }),
    /* @__PURE__ */ u.jsx(ET, { open: k === "help", onOpenChange: ln })
  ] });
}
function xc(a) {
  const s = a[a.length - 1];
  return s?.kind === "steps" && s.live ? [...a.slice(0, -1), { ...s, live: !1 }] : a;
}
function kd(a) {
  return a.filter((s) => !(s.kind === "msg" && s.streaming && s.text === "")).map((s) => s.kind === "msg" && s.streaming ? { ...s, streaming: !1 } : s);
}
function My(a) {
  for (let s = a.length - 1; s >= 0; s--) {
    const r = a[s];
    if (r.kind === "msg" && r.streaming) return s;
  }
  return -1;
}
function Aj({ manifest: a }) {
  const s = a?.states.idle?.image;
  return s ? /* @__PURE__ */ u.jsx("img", { className: "avatar", src: dt(s), alt: "" }) : /* @__PURE__ */ u.jsx("div", { className: "avatar avatar-letter", children: (a?.characterName ?? "?").slice(0, 1) });
}
function ns({ title: a, onClick: s, active: r, children: o }) {
  return /* @__PURE__ */ u.jsx("button", { type: "button", className: `icon-button${r ? " active" : ""}`, title: a, "aria-label": a, onClick: s, children: o });
}
function kj({ items: a, lists: s, name: r, busy: o, onReplay: f, onOpenFile: h, onOpenList: m }) {
  const g = S.useRef(null), b = S.useRef(!0);
  S.useLayoutEffect(() => {
    const p = g.current;
    p && b.current && (p.scrollTop = p.scrollHeight);
  });
  const x = () => {
    const p = g.current;
    p && (b.current = p.scrollHeight - p.scrollTop - p.clientHeight < 48);
  }, v = a[a.length - 1]?.kind === "steps";
  return /* @__PURE__ */ u.jsx("div", { className: "messages", ref: g, onScroll: x, children: /* @__PURE__ */ u.jsxs("div", { className: "messages-inner", children: [
    a.map((p) => {
      switch (p.kind) {
        case "msg":
          return p.role === "user" ? /* @__PURE__ */ u.jsx(Cj, { text: p.text }, p.key) : /* @__PURE__ */ u.jsx(Oj, { name: r, text: p.text, streaming: p.streaming === !0, onReplay: f }, p.key);
        case "steps":
          return /* @__PURE__ */ u.jsx(Rj, { steps: p.steps, live: p.live }, p.key);
        case "artifact":
          return /* @__PURE__ */ u.jsx(Dj, { artifact: p.artifact, onOpen: () => h(p.artifact.id) }, p.key);
        case "list":
          return /* @__PURE__ */ u.jsx(Mj, { list: s.find((N) => N.id === p.list.id) ?? p.list, onOpen: () => m(p.list.id) }, p.key);
        case "notice":
          return /* @__PURE__ */ u.jsx("div", { className: "notice", children: p.text }, p.key);
      }
    }),
    o && !v && !a.some((p) => p.kind === "msg" && p.streaming) && /* @__PURE__ */ u.jsxs("div", { className: "turn assistant", children: [
      /* @__PURE__ */ u.jsx("div", { className: "turn-label", children: r }),
      /* @__PURE__ */ u.jsx("span", { className: "shimmer", children: "Thinking…" })
    ] })
  ] }) });
}
function Cj({ text: a }) {
  return /* @__PURE__ */ u.jsx("div", { className: "turn user", children: /* @__PURE__ */ u.jsx("div", { className: "bubble", children: a }) });
}
function Oj({ name: a, text: s, streaming: r, onReplay: o }) {
  const [f, h] = S.useState(!1), m = S.useMemo(() => mh(s), [s]), g = async () => {
    try {
      await navigator.clipboard.writeText(s), h(!0), window.setTimeout(() => h(!1), 1500);
    } catch {
    }
  };
  return /* @__PURE__ */ u.jsxs("div", { className: "turn assistant", children: [
    /* @__PURE__ */ u.jsx("div", { className: "turn-label", children: a }),
    s === "" && r ? /* @__PURE__ */ u.jsx("span", { className: "shimmer", children: "Thinking…" }) : /* @__PURE__ */ u.jsx("div", { className: `prose${r ? " streaming" : ""}`, dangerouslySetInnerHTML: { __html: m } }),
    !r && s !== "" && /* @__PURE__ */ u.jsxs("div", { className: "turn-actions", children: [
      /* @__PURE__ */ u.jsxs("button", { type: "button", className: "text-button", onClick: () => {
        g();
      }, children: [
        f ? /* @__PURE__ */ u.jsx(os, {}) : /* @__PURE__ */ u.jsx(th, {}),
        f ? "Copied" : "Copy"
      ] }),
      /* @__PURE__ */ u.jsxs("button", { type: "button", className: "text-button", onClick: () => o(s), children: [
        /* @__PURE__ */ u.jsx(Jy, {}),
        "Replay"
      ] })
    ] })
  ] });
}
function Rj({ steps: a, live: s }) {
  const [r, o] = S.useState(!1), f = s || r, h = a.filter((b) => b.failed).length, m = `${a.length} step${a.length === 1 ? "" : "s"}`, g = s ? Dy(a[a.length - 1]) : h ? `Worked through ${m}, ${h} didn't go through` : `Worked through ${m}`;
  return /* @__PURE__ */ u.jsxs("div", { className: `steps${s ? " live" : ""}`, children: [
    /* @__PURE__ */ u.jsxs("button", { type: "button", className: "steps-head", onClick: () => o((b) => !b), "aria-expanded": f, children: [
      f ? /* @__PURE__ */ u.jsx(l2, { className: "chev" }) : /* @__PURE__ */ u.jsx(Hy, { className: "chev" }),
      /* @__PURE__ */ u.jsx("span", { className: s ? "shimmer" : "", children: g })
    ] }),
    f && /* @__PURE__ */ u.jsx("ol", { className: "steps-list", children: a.map((b, x) => {
      const v = Ej[b.failed ? "failed" : b.activity] ?? rs;
      return /* @__PURE__ */ u.jsxs("li", { className: b.failed ? "failed" : "", children: [
        /* @__PURE__ */ u.jsx(v, { className: "step-icon" }),
        /* @__PURE__ */ u.jsx("span", { className: "step-text", children: Dy(b) }),
        b.command && /* @__PURE__ */ u.jsx("code", { className: "step-cmd", title: b.command, children: b.command })
      ] }, x);
    }) })
  ] });
}
function Dy(a) {
  if (!a) return "";
  const s = Ec[a.activity] ?? a.activity, r = a.text.replace(/…$/, "");
  return r ? `${s} · ${r}` : s;
}
function Mj({ list: a, onOpen: s }) {
  const r = a.items.filter((o) => !o.done).length;
  return /* @__PURE__ */ u.jsx("div", { className: "turn assistant", children: /* @__PURE__ */ u.jsxs("div", { className: "artifact list-card", role: "button", tabIndex: 0, onClick: s, onKeyDown: (o) => {
    (o.key === "Enter" || o.key === " ") && (o.preventDefault(), s());
  }, children: [
    /* @__PURE__ */ u.jsx("div", { className: "artifact-thumb", children: /* @__PURE__ */ u.jsx(_c, {}) }),
    /* @__PURE__ */ u.jsxs("div", { className: "artifact-meta", children: [
      /* @__PURE__ */ u.jsx("span", { className: "artifact-name", children: a.title }),
      /* @__PURE__ */ u.jsxs("span", { className: "artifact-sub", children: [
        "List · ",
        r,
        " item",
        r === 1 ? "" : "s",
        a.items.length - r > 0 ? ` · ${a.items.length - r} done` : ""
      ] })
    ] })
  ] }) });
}
function Dj({ artifact: a, onOpen: s }) {
  const r = a.kind === "image" ? wr : $y, o = dt(`/artifact/${encodeURIComponent(a.id)}`), f = async () => {
    await fetch(dt(`/artifact/${encodeURIComponent(a.id)}/reveal`), { method: "POST" });
  };
  return /* @__PURE__ */ u.jsx("div", { className: "turn assistant", children: /* @__PURE__ */ u.jsxs("div", { className: "artifact", role: "button", tabIndex: 0, onClick: s, onKeyDown: (h) => {
    (h.key === "Enter" || h.key === " ") && (h.preventDefault(), s());
  }, children: [
    /* @__PURE__ */ u.jsx("div", { className: `artifact-thumb${a.kind === "image" ? " image" : ""}`, children: a.kind === "image" ? /* @__PURE__ */ u.jsx("img", { src: o, alt: "", loading: "lazy" }) : /* @__PURE__ */ u.jsx(r, {}) }),
    /* @__PURE__ */ u.jsxs("div", { className: "artifact-meta", children: [
      /* @__PURE__ */ u.jsx("span", { className: "artifact-name", children: a.description ?? a.name }),
      /* @__PURE__ */ u.jsxs("span", { className: "artifact-sub", children: [
        a.description ? `${a.name} · ` : "",
        n1(a),
        typeof a.size == "number" ? ` · ${t1(a.size)}` : ""
      ] })
    ] }),
    /* @__PURE__ */ u.jsx("button", { type: "button", className: "icon-button", title: "Reveal in Finder", "aria-label": "Reveal in Finder", onClick: (h) => {
      h.stopPropagation(), f();
    }, children: /* @__PURE__ */ u.jsx(Gy, {}) })
  ] }) });
}
const zj = S.forwardRef(
  function({ onSend: s, busy: r, name: o, notice: f, voiceStatus: h, speaking: m, onStopVoice: g }, b) {
    const [x, v] = S.useState(""), [p, N] = S.useState(""), j = S.useRef(null);
    S.useImperativeHandle(b, () => j.current), S.useEffect(() => {
      const k = j.current;
      k && (k.style.height = "auto", k.style.height = `${Math.min(k.scrollHeight, 240)}px`);
    }, [x]);
    const T = async () => {
      const k = x.trim();
      if (k !== "") {
        v(""), N("");
        try {
          await s(k);
        } catch (K) {
          v(k), N(K instanceof Error ? K.message : String(K));
        }
        j.current?.focus();
      }
    }, U = p ? { kind: "error", text: p } : f ? { kind: "notice", text: f } : h ? { kind: "voice", text: h } : null;
    return /* @__PURE__ */ u.jsx("div", { className: "composer-dock", children: /* @__PURE__ */ u.jsxs("div", { className: `composer${r ? " busy" : ""}`, children: [
      /* @__PURE__ */ u.jsxs("div", { className: "composer-pill", children: [
        /* @__PURE__ */ u.jsx(
          "textarea",
          {
            ref: j,
            value: x,
            rows: 1,
            placeholder: `Message ${o}`,
            spellCheck: !1,
            onChange: (k) => {
              v(k.target.value), p && N("");
            },
            onKeyDown: (k) => {
              k.key === "Enter" && !k.shiftKey && !k.nativeEvent.isComposing && (k.preventDefault(), T()), k.key === "Escape" && j.current?.blur();
            }
          }
        ),
        m && /* @__PURE__ */ u.jsx("button", { type: "button", className: "send quiet", onClick: g, title: "Stop speaking", "aria-label": "Stop speaking", children: /* @__PURE__ */ u.jsx(D2, {}) }),
        /* @__PURE__ */ u.jsx("button", { type: "button", className: "send", onClick: () => {
          T();
        }, disabled: x.trim() === "", title: "Send (Enter)", "aria-label": "Send", children: /* @__PURE__ */ u.jsx(e2, {}) })
      ] }),
      U && /* @__PURE__ */ u.jsx("div", { className: `composer-chip ${U.kind}`, role: "status", children: U.text })
    ] }) });
  }
);
function Lj({ manifest: a, activity: s, name: r }) {
  const o = S.useRef(null), f = S.useRef(null), h = S.useRef(null), m = S.useRef(null), g = S.useRef("");
  S.useEffect(() => {
    g.current = "";
  }, [a?.characterId]), S.useEffect(() => {
    if (!a) return;
    const x = a.states[s] ? s : "idle", v = a.states[x];
    if (!(!v || x === g.current))
      if (g.current = x, v.video) {
        const p = m.current === o.current ? f.current : o.current;
        if (!p) return;
        p.src = dt(v.video), p.playbackRate = a.playbackRate || 1, p.play().catch(() => {
        }), p.classList.add("visible"), m.current?.classList.remove("visible"), h.current?.classList.remove("visible"), m.current = p;
      } else v.image && h.current && (h.current.src = dt(v.image), h.current.classList.add("visible"), m.current?.classList.remove("visible"), m.current = null);
  }, [a, s]), S.useEffect(() => {
    for (const x of [o.current, f.current]) x && (x.playbackRate = a?.playbackRate || 1);
  }, [a?.playbackRate]);
  const b = !!(a && Object.keys(a.states).length > 0);
  return /* @__PURE__ */ u.jsx("aside", { className: "stage", children: b ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsx("video", { ref: o, className: "layer", muted: !0, loop: !0, playsInline: !0, preload: "auto" }),
    /* @__PURE__ */ u.jsx("video", { ref: f, className: "layer", muted: !0, loop: !0, playsInline: !0, preload: "auto" }),
    /* @__PURE__ */ u.jsx("img", { ref: h, className: "layer", alt: "" })
  ] }) : /* @__PURE__ */ u.jsxs("div", { className: "stage-empty", children: [
    /* @__PURE__ */ u.jsx("div", { className: "avatar avatar-letter big", children: r.slice(0, 1) }),
    /* @__PURE__ */ u.jsxs("p", { children: [
      r,
      " has no artwork yet."
    ] })
  ] }) });
}
Kx.createRoot(document.getElementById("root")).render(/* @__PURE__ */ u.jsx(_j, {}));

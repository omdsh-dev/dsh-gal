function Jx(a, s) {
  for (var o = 0; o < s.length; o++) {
    const u = s[o];
    if (typeof u != "string" && !Array.isArray(u)) {
      for (const f in u)
        if (f !== "default" && !(f in a)) {
          const d = Object.getOwnPropertyDescriptor(u, f);
          d && Object.defineProperty(a, f, d.get ? d : {
            enumerable: !0,
            get: () => u[f]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(a, Symbol.toStringTag, { value: "Module" }));
}
function Fx(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var md = { exports: {} }, gc = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _0;
function Px() {
  if (_0) return gc;
  _0 = 1;
  var a = Symbol.for("react.transitional.element"), s = Symbol.for("react.fragment");
  function o(u, f, d) {
    var m = null;
    if (d !== void 0 && (m = "" + d), f.key !== void 0 && (m = "" + f.key), "key" in f) {
      d = {};
      for (var g in f)
        g !== "key" && (d[g] = f[g]);
    } else d = f;
    return f = d.ref, {
      $$typeof: a,
      type: u,
      key: m,
      ref: f !== void 0 ? f : null,
      props: d
    };
  }
  return gc.Fragment = s, gc.jsx = o, gc.jsxs = o, gc;
}
var C0;
function Wx() {
  return C0 || (C0 = 1, md.exports = Px()), md.exports;
}
var c = Wx(), pd = { exports: {} }, ke = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var O0;
function e2() {
  if (O0) return ke;
  O0 = 1;
  var a = Symbol.for("react.transitional.element"), s = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), u = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), d = Symbol.for("react.consumer"), m = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), b = Symbol.for("react.suspense"), S = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), p = Symbol.for("react.activity"), N = Symbol.for("react.view_transition"), T = Symbol.iterator;
  function E(_) {
    return _ === null || typeof _ != "object" ? null : (_ = T && _[T] || _["@@iterator"], typeof _ == "function" ? _ : null);
  }
  var L = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, k = Object.assign, V = {};
  function X(_, q, fe) {
    this.props = _, this.context = q, this.refs = V, this.updater = fe || L;
  }
  X.prototype.isReactComponent = {}, X.prototype.setState = function(_, q) {
    if (typeof _ != "object" && typeof _ != "function" && _ != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, _, q, "setState");
  }, X.prototype.forceUpdate = function(_) {
    this.updater.enqueueForceUpdate(this, _, "forceUpdate");
  };
  function U() {
  }
  U.prototype = X.prototype;
  function F(_, q, fe) {
    this.props = _, this.context = q, this.refs = V, this.updater = fe || L;
  }
  var Z = F.prototype = new U();
  Z.constructor = F, k(Z, X.prototype), Z.isPureReactComponent = !0;
  var B = Array.isArray;
  function G() {
  }
  var ce = { H: null, A: null, T: null, S: null }, Te = Object.prototype.hasOwnProperty;
  function de(_, q, fe) {
    var me = fe.ref;
    return {
      $$typeof: a,
      type: _,
      key: q,
      ref: me !== void 0 ? me : null,
      props: fe
    };
  }
  function xe(_, q) {
    return de(_.type, q, _.props);
  }
  function pe(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === a;
  }
  function W(_) {
    var q = { "=": "=0", ":": "=2" };
    return "$" + _.replace(/[=:]/g, function(fe) {
      return q[fe];
    });
  }
  var we = /\/+/g;
  function he(_, q) {
    return typeof _ == "object" && _ !== null && _.key != null ? W("" + _.key) : q.toString(36);
  }
  function J(_) {
    switch (_.status) {
      case "fulfilled":
        return _.value;
      case "rejected":
        throw _.reason;
      default:
        switch (typeof _.status == "string" ? _.then(G, G) : (_.status = "pending", _.then(
          function(q) {
            _.status === "pending" && (_.status = "fulfilled", _.value = q);
          },
          function(q) {
            _.status === "pending" && (_.status = "rejected", _.reason = q);
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
  function re(_, q, fe, me, ve) {
    var Me = typeof _;
    (Me === "undefined" || Me === "boolean") && (_ = null);
    var De = !1;
    if (_ === null) De = !0;
    else
      switch (Me) {
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
              return De = _._init, re(
                De(_._payload),
                q,
                fe,
                me,
                ve
              );
          }
      }
    if (De)
      return ve = ve(_), De = me === "" ? "." + he(_, 0) : me, B(ve) ? (fe = "", De != null && (fe = De.replace(we, "$&/") + "/"), re(ve, q, fe, "", function(Dt) {
        return Dt;
      })) : ve != null && (pe(ve) && (ve = xe(
        ve,
        fe + (ve.key == null || _ && _.key === ve.key ? "" : ("" + ve.key).replace(
          we,
          "$&/"
        ) + "/") + De
      )), q.push(ve)), 1;
    De = 0;
    var ue = me === "" ? "." : me + ":";
    if (B(_))
      for (var Se = 0; Se < _.length; Se++)
        me = _[Se], Me = ue + he(me, Se), De += re(
          me,
          q,
          fe,
          Me,
          ve
        );
    else if (Se = E(_), typeof Se == "function")
      for (_ = Se.call(_), Se = 0; !(me = _.next()).done; )
        me = me.value, Me = ue + he(me, Se++), De += re(
          me,
          q,
          fe,
          Me,
          ve
        );
    else if (Me === "object") {
      if (typeof _.then == "function")
        return re(
          J(_),
          q,
          fe,
          me,
          ve
        );
      throw q = String(_), Error(
        "Objects are not valid as a React child (found: " + (q === "[object Object]" ? "object with keys {" + Object.keys(_).join(", ") + "}" : q) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return De;
  }
  function be(_, q, fe) {
    if (_ == null) return _;
    var me = [], ve = 0;
    return re(_, me, "", "", function(Me) {
      return q.call(fe, Me, ve++);
    }), me;
  }
  function Ue(_) {
    if (_._status === -1) {
      var q = _._result, fe = q();
      fe.then(
        function(me) {
          (_._status === 0 || _._status === -1) && (_._status = 1, _._result = me, fe.status === void 0 && (fe.status = "fulfilled", fe.value = me));
        },
        function(me) {
          (_._status === 0 || _._status === -1) && (_._status = 2, _._result = me, fe.status === void 0 && (fe.status = "rejected", fe.reason = me));
        }
      ), _._status === -1 && (_._status = 0, _._result = fe);
    }
    if (_._status === 1) return _._result.default;
    throw _._result;
  }
  var K = typeof reportError == "function" ? reportError : function(_) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var q = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof _ == "object" && _ !== null && typeof _.message == "string" ? String(_.message) : String(_),
        error: _
      });
      if (!window.dispatchEvent(q)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", _);
      return;
    }
    console.error(_);
  };
  function Ge(_) {
    var q = ce.T, fe = {};
    fe.types = q !== null ? q.types : null, ce.T = fe;
    try {
      var me = _(), ve = ce.S;
      ve !== null && ve(fe, me), typeof me == "object" && me !== null && typeof me.then == "function" && me.then(G, K);
    } catch (Me) {
      K(Me);
    } finally {
      q !== null && fe.types !== null && (q.types = fe.types), ce.T = q;
    }
  }
  function st(_) {
    var q = ce.T;
    if (q !== null) {
      var fe = q.types;
      fe === null ? q.types = [_] : fe.indexOf(_) === -1 && fe.push(_);
    } else Ge(st.bind(null, _));
  }
  var hn = {
    map: be,
    forEach: function(_, q, fe) {
      be(
        _,
        function() {
          q.apply(this, arguments);
        },
        fe
      );
    },
    count: function(_) {
      var q = 0;
      return be(_, function() {
        q++;
      }), q;
    },
    toArray: function(_) {
      return be(_, function(q) {
        return q;
      }) || [];
    },
    only: function(_) {
      if (!pe(_))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return _;
    }
  };
  return ke.Activity = p, ke.Children = hn, ke.Component = X, ke.Fragment = o, ke.Profiler = f, ke.PureComponent = F, ke.StrictMode = u, ke.Suspense = b, ke.ViewTransition = N, ke.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ce, ke.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(_) {
      return ce.H.useMemoCache(_);
    }
  }, ke.addTransitionType = st, ke.cache = function(_) {
    return function() {
      return _.apply(null, arguments);
    };
  }, ke.cacheSignal = function() {
    return null;
  }, ke.cloneElement = function(_, q, fe) {
    if (_ == null)
      throw Error(
        "The argument must be a React element, but you passed " + _ + "."
      );
    var me = k({}, _.props), ve = _.key;
    if (q != null)
      for (Me in q.key !== void 0 && (ve = "" + q.key), q)
        !Te.call(q, Me) || Me === "key" || Me === "__self" || Me === "__source" || Me === "ref" && q.ref === void 0 || (me[Me] = q[Me]);
    var Me = arguments.length - 2;
    if (Me === 1) me.children = fe;
    else if (1 < Me) {
      for (var De = Array(Me), ue = 0; ue < Me; ue++)
        De[ue] = arguments[ue + 2];
      me.children = De;
    }
    return de(_.type, ve, me);
  }, ke.createContext = function(_) {
    return _ = {
      $$typeof: m,
      _currentValue: _,
      _currentValue2: _,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, _.Provider = _, _.Consumer = {
      $$typeof: d,
      _context: _
    }, _;
  }, ke.createElement = function(_, q, fe) {
    var me, ve = {}, Me = null;
    if (q != null)
      for (me in q.key !== void 0 && (Me = "" + q.key), q)
        Te.call(q, me) && me !== "key" && me !== "__self" && me !== "__source" && (ve[me] = q[me]);
    var De = arguments.length - 2;
    if (De === 1) ve.children = fe;
    else if (1 < De) {
      for (var ue = Array(De), Se = 0; Se < De; Se++)
        ue[Se] = arguments[Se + 2];
      ve.children = ue;
    }
    if (_ && _.defaultProps)
      for (me in De = _.defaultProps, De)
        ve[me] === void 0 && (ve[me] = De[me]);
    return de(_, Me, ve);
  }, ke.createRef = function() {
    return { current: null };
  }, ke.forwardRef = function(_) {
    return { $$typeof: g, render: _ };
  }, ke.isValidElement = pe, ke.lazy = function(_) {
    return {
      $$typeof: v,
      _payload: { _status: -1, _result: _ },
      _init: Ue
    };
  }, ke.memo = function(_, q) {
    return {
      $$typeof: S,
      type: _,
      compare: q === void 0 ? null : q
    };
  }, ke.startTransition = Ge, ke.unstable_useCacheRefresh = function() {
    return ce.H.useCacheRefresh();
  }, ke.use = function(_) {
    return ce.H.use(_);
  }, ke.useActionState = function(_, q, fe) {
    return ce.H.useActionState(_, q, fe);
  }, ke.useCallback = function(_, q) {
    return ce.H.useCallback(_, q);
  }, ke.useContext = function(_) {
    return ce.H.useContext(_);
  }, ke.useDebugValue = function() {
  }, ke.useDeferredValue = function(_, q) {
    return ce.H.useDeferredValue(_, q);
  }, ke.useEffect = function(_, q) {
    return ce.H.useEffect(_, q);
  }, ke.useEffectEvent = function(_) {
    return ce.H.useEffectEvent(_);
  }, ke.useId = function() {
    return ce.H.useId();
  }, ke.useImperativeHandle = function(_, q, fe) {
    return ce.H.useImperativeHandle(_, q, fe);
  }, ke.useInsertionEffect = function(_, q) {
    return ce.H.useInsertionEffect(_, q);
  }, ke.useLayoutEffect = function(_, q) {
    return ce.H.useLayoutEffect(_, q);
  }, ke.useMemo = function(_, q) {
    return ce.H.useMemo(_, q);
  }, ke.useOptimistic = function(_, q) {
    return ce.H.useOptimistic(_, q);
  }, ke.useReducer = function(_, q, fe) {
    return ce.H.useReducer(_, q, fe);
  }, ke.useRef = function(_) {
    return ce.H.useRef(_);
  }, ke.useState = function(_) {
    return ce.H.useState(_);
  }, ke.useSyncExternalStore = function(_, q, fe) {
    return ce.H.useSyncExternalStore(
      _,
      q,
      fe
    );
  }, ke.useTransition = function() {
    return ce.H.useTransition();
  }, ke.version = "19.3.0", ke;
}
var R0;
function ih() {
  return R0 || (R0 = 1, pd.exports = e2()), pd.exports;
}
var x = ih();
const Yl = /* @__PURE__ */ Fx(x), Ac = /* @__PURE__ */ Jx({
  __proto__: null,
  default: Yl
}, [x]);
var gd = { exports: {} }, yc = {}, yd = { exports: {} }, vd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var M0;
function t2() {
  return M0 || (M0 = 1, (function(a) {
    function s(J, re) {
      var be = J.length;
      J.push(re);
      e: for (; 0 < be; ) {
        var Ue = be - 1 >>> 1, K = J[Ue];
        if (0 < f(K, re))
          J[Ue] = re, J[be] = K, be = Ue;
        else break e;
      }
    }
    function o(J) {
      return J.length === 0 ? null : J[0];
    }
    function u(J) {
      if (J.length === 0) return null;
      var re = J[0], be = J.pop();
      if (be !== re) {
        J[0] = be;
        e: for (var Ue = 0, K = J.length, Ge = K >>> 1; Ue < Ge; ) {
          var st = 2 * (Ue + 1) - 1, hn = J[st], _ = st + 1, q = J[_];
          if (0 > f(hn, be))
            _ < K && 0 > f(q, hn) ? (J[Ue] = q, J[_] = be, Ue = _) : (J[Ue] = hn, J[st] = be, Ue = st);
          else if (_ < K && 0 > f(q, be))
            J[Ue] = q, J[_] = be, Ue = _;
          else break e;
        }
      }
      return re;
    }
    function f(J, re) {
      var be = J.sortIndex - re.sortIndex;
      return be !== 0 ? be : J.id - re.id;
    }
    if (a.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      a.unstable_now = function() {
        return d.now();
      };
    } else {
      var m = Date, g = m.now();
      a.unstable_now = function() {
        return m.now() - g;
      };
    }
    var b = [], S = [], v = 1, p = null, N = 3, T = !1, E = !1, L = !1, k = !1, V = typeof setTimeout == "function" ? setTimeout : null, X = typeof clearTimeout == "function" ? clearTimeout : null, U = typeof setImmediate < "u" ? setImmediate : null;
    function F(J) {
      for (var re = o(S); re !== null; ) {
        if (re.callback === null) u(S);
        else if (re.startTime <= J)
          u(S), re.sortIndex = re.expirationTime, s(b, re);
        else break;
        re = o(S);
      }
    }
    function Z(J) {
      if (L = !1, F(J), !E)
        if (o(b) !== null)
          E = !0, B || (B = !0, pe());
        else {
          var re = o(S);
          re !== null && he(Z, re.startTime - J);
        }
    }
    var B = !1, G = -1, ce = 5, Te = -1;
    function de() {
      return k ? !0 : !(a.unstable_now() - Te < ce);
    }
    function xe() {
      if (k = !1, B) {
        var J = a.unstable_now();
        Te = J;
        var re = !0;
        try {
          e: {
            E = !1, L && (L = !1, X(G), G = -1), T = !0;
            var be = N;
            try {
              t: {
                for (F(J), p = o(b); p !== null && !(p.expirationTime > J && de()); ) {
                  var Ue = p.callback;
                  if (typeof Ue == "function") {
                    p.callback = null, N = p.priorityLevel;
                    var K = Ue(
                      p.expirationTime <= J
                    );
                    if (J = a.unstable_now(), typeof K == "function") {
                      p.callback = K, F(J), re = !0;
                      break t;
                    }
                    p === o(b) && u(b), F(J);
                  } else u(b);
                  p = o(b);
                }
                if (p !== null) re = !0;
                else {
                  var Ge = o(S);
                  Ge !== null && he(
                    Z,
                    Ge.startTime - J
                  ), re = !1;
                }
              }
              break e;
            } finally {
              p = null, N = be, T = !1;
            }
            re = void 0;
          }
        } finally {
          re ? pe() : B = !1;
        }
      }
    }
    var pe;
    if (typeof U == "function")
      pe = function() {
        U(xe);
      };
    else if (typeof MessageChannel < "u") {
      var W = new MessageChannel(), we = W.port2;
      W.port1.onmessage = xe, pe = function() {
        we.postMessage(null);
      };
    } else
      pe = function() {
        V(xe, 0);
      };
    function he(J, re) {
      G = V(function() {
        J(a.unstable_now());
      }, re);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(J) {
      J.callback = null;
    }, a.unstable_forceFrameRate = function(J) {
      0 > J || 125 < J ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : ce = 0 < J ? Math.floor(1e3 / J) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return N;
    }, a.unstable_next = function(J) {
      switch (N) {
        case 1:
        case 2:
        case 3:
          var re = 3;
          break;
        default:
          re = N;
      }
      var be = N;
      N = re;
      try {
        return J();
      } finally {
        N = be;
      }
    }, a.unstable_requestPaint = function() {
      k = !0;
    }, a.unstable_runWithPriority = function(J, re) {
      switch (J) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          J = 3;
      }
      var be = N;
      N = J;
      try {
        return re();
      } finally {
        N = be;
      }
    }, a.unstable_scheduleCallback = function(J, re, be) {
      var Ue = a.unstable_now();
      switch (typeof be == "object" && be !== null ? (be = be.delay, be = typeof be == "number" && 0 < be ? Ue + be : Ue) : be = Ue, J) {
        case 1:
          var K = -1;
          break;
        case 2:
          K = 250;
          break;
        case 5:
          K = 1073741823;
          break;
        case 4:
          K = 1e4;
          break;
        default:
          K = 5e3;
      }
      return K = be + K, J = {
        id: v++,
        callback: re,
        priorityLevel: J,
        startTime: be,
        expirationTime: K,
        sortIndex: -1
      }, be > Ue ? (J.sortIndex = be, s(S, J), o(b) === null && J === o(S) && (L ? (X(G), G = -1) : L = !0, he(Z, be - Ue))) : (J.sortIndex = K, s(b, J), E || T || (E = !0, B || (B = !0, pe()))), J;
    }, a.unstable_shouldYield = de, a.unstable_wrapCallback = function(J) {
      var re = N;
      return function() {
        var be = N;
        N = re;
        try {
          return J.apply(this, arguments);
        } finally {
          N = be;
        }
      };
    };
  })(vd)), vd;
}
var D0;
function n2() {
  return D0 || (D0 = 1, yd.exports = t2()), yd.exports;
}
var bd = { exports: {} }, Gt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var z0;
function l2() {
  if (z0) return Gt;
  z0 = 1;
  var a = ih();
  function s(v) {
    var p = "https://react.dev/errors/" + v;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var N = 2; N < arguments.length; N++)
        p += "&args[]=" + encodeURIComponent(arguments[N]);
    }
    return "Minified React error #" + v + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o() {
  }
  var u = {
    d: {
      f: o,
      r: function() {
        throw Error(s(522));
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
  function g(v, p, N) {
    var T = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: f,
      key: T == null ? null : T === m ? m : "" + T,
      children: v,
      containerInfo: p,
      implementation: N
    };
  }
  var b = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function S(v, p) {
    if (v === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return Gt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u, Gt.browser = function(v) {
    return { $$typeof: d, _reason: v };
  }, Gt.createPortal = function(v, p) {
    var N = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(s(299));
    return g(v, p, null, N);
  }, Gt.flushSync = function(v) {
    var p = b.T, N = u.p;
    try {
      if (b.T = null, u.p = 2, v) return v();
    } finally {
      b.T = p, u.p = N, u.d.f();
    }
  }, Gt.preconnect = function(v, p) {
    typeof v == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, u.d.C(v, p));
  }, Gt.prefetchDNS = function(v) {
    typeof v == "string" && u.d.D(v);
  }, Gt.preinit = function(v, p) {
    if (typeof v == "string" && p && typeof p.as == "string") {
      var N = p.as, T = S(N, p.crossOrigin), E = typeof p.integrity == "string" ? p.integrity : void 0, L = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      N === "style" ? u.d.S(
        v,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: T,
          integrity: E,
          fetchPriority: L
        }
      ) : N === "script" && u.d.X(v, {
        crossOrigin: T,
        integrity: E,
        fetchPriority: L,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, Gt.preinitModule = function(v, p) {
    if (typeof v == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var N = S(
            p.as,
            p.crossOrigin
          );
          u.d.M(v, {
            crossOrigin: N,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0,
            fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0
          });
        }
      } else p == null && u.d.M(v);
  }, Gt.preload = function(v, p) {
    if (typeof v == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var N = p.as, T = S(N, p.crossOrigin);
      u.d.L(v, N, {
        crossOrigin: T,
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
  }, Gt.preloadModule = function(v, p) {
    if (typeof v == "string")
      if (p) {
        var N = S(p.as, p.crossOrigin);
        u.d.m(v, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: N,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0,
          nonce: typeof p.nonce == "string" ? p.nonce : void 0,
          fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0
        });
      } else u.d.m(v);
  }, Gt.requestFormReset = function(v) {
    u.d.r(v);
  }, Gt.unstable_batchedUpdates = function(v, p) {
    return v(p);
  }, Gt.useFormState = function(v, p, N) {
    return b.H.useFormState(v, p, N);
  }, Gt.useFormStatus = function() {
    return b.H.useHostTransitionStatus();
  }, Gt.version = "19.3.0", Gt;
}
var L0;
function Zy() {
  if (L0) return bd.exports;
  L0 = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (s) {
        console.error(s);
      }
  }
  return a(), bd.exports = l2(), bd.exports;
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
var U0;
function a2() {
  if (U0) return yc;
  U0 = 1;
  var a = n2(), s = ih(), o = Zy();
  function u(e) {
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
  function b(e) {
    if (d(e) !== e)
      throw Error(u(188));
  }
  function S(e) {
    var t = e.alternate;
    if (!t) {
      if (t = d(e), t === null) throw Error(u(188));
      return t !== e ? null : e;
    }
    for (var n = e, l = t; ; ) {
      var i = n.return;
      if (i === null) break;
      var r = i.alternate;
      if (r === null) {
        if (l = i.return, l !== null) {
          n = l;
          continue;
        }
        break;
      }
      if (i.child === r.child) {
        for (r = i.child; r; ) {
          if (r === n) return b(i), e;
          if (r === l) return b(i), t;
          r = r.sibling;
        }
        throw Error(u(188));
      }
      if (n.return !== l.return) n = i, l = r;
      else {
        for (var h = !1, y = i.child; y; ) {
          if (y === n) {
            h = !0, n = i, l = r;
            break;
          }
          if (y === l) {
            h = !0, l = i, n = r;
            break;
          }
          y = y.sibling;
        }
        if (!h) {
          for (y = r.child; y; ) {
            if (y === n) {
              h = !0, n = r, l = i;
              break;
            }
            if (y === l) {
              h = !0, l = r, n = i;
              break;
            }
            y = y.sibling;
          }
          if (!h) throw Error(u(189));
        }
      }
      if (n.alternate !== l) throw Error(u(190));
    }
    if (n.tag !== 3) throw Error(u(188));
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
  function p(e, t, n, l, i, r) {
    for (; e !== null; ) {
      if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && n(e, l, i, r) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && p(
        e.child,
        t,
        n,
        l,
        i,
        r
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
  function T(e) {
    var t = !1;
    for (e = e.return; e !== null && (e.tag === 4 && (t = !0), !(e.tag === 3 || e.tag === 5 || e.tag === 27)); )
      e = e.return;
    return t;
  }
  function E(e) {
    var t = [null, null], n = N(e);
    return n === null || L(
      t,
      e,
      n.child,
      { foundSelf: !1 }
    ), t;
  }
  function L(e, t, n, l) {
    for (; n !== null; ) {
      if (n === t) l.foundSelf = !0;
      else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
        if (l.foundSelf) return e[1] = n, !0;
        e[0] = n;
      } else if ((n.tag !== 22 || n.memoizedState === null) && L(
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
        throw Error(u(559));
    }
  }
  var V = null, X = null;
  function U(e, t, n) {
    return e === n ? !0 : e === t ? (V = e, !0) : !1;
  }
  function F(e, t, n) {
    return e === n ? (X = e, !1) : e === t ? (X !== null && (V = e), !0) : !1;
  }
  function Z(e) {
    if (e === null) return null;
    do
      e = e === null ? null : e.return;
    while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
    return e || null;
  }
  function B(e, t, n) {
    for (var l = 0, i = e; i; i = n(i)) l++;
    i = 0;
    for (var r = t; r; r = n(r)) i++;
    for (; 0 < l - i; ) e = n(e), l--;
    for (; 0 < i - l; ) t = n(t), i--;
    for (; l--; ) {
      if (e === t || t !== null && e === t.alternate)
        return e;
      e = n(e), t = n(t);
    }
    return null;
  }
  var G = Object.assign, ce = Symbol.for("react.element"), Te = Symbol.for("react.transitional.element"), de = Symbol.for("react.portal"), xe = Symbol.for("react.fragment"), pe = Symbol.for("react.strict_mode"), W = Symbol.for("react.profiler"), we = Symbol.for("react.consumer"), he = Symbol.for("react.context"), J = Symbol.for("react.forward_ref"), re = Symbol.for("react.suspense"), be = Symbol.for("react.suspense_list"), Ue = Symbol.for("react.memo"), K = Symbol.for("react.lazy"), Ge = Symbol.for("react.activity"), st = Symbol.for("react.legacy_hidden"), hn = Symbol.for("react.memo_cache_sentinel"), _ = Symbol.for("react.view_transition"), q = Symbol.for("react.recoverable"), fe = Symbol.iterator;
  function me(e) {
    return e === null || typeof e != "object" ? null : (e = fe && e[fe] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var ve = Symbol.for("react.client.reference");
  function Me(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === ve ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case xe:
        return "Fragment";
      case W:
        return "Profiler";
      case pe:
        return "StrictMode";
      case re:
        return "Suspense";
      case be:
        return "SuspenseList";
      case Ge:
        return "Activity";
      case _:
        return "ViewTransition";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case de:
          return "Portal";
        case he:
          return e.displayName || "Context";
        case we:
          return (e._context.displayName || "Context") + ".Consumer";
        case J:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case Ue:
          return t = e.displayName || null, t !== null ? t : Me(e.type) || "Memo";
        case K:
          t = e._payload, e = e._init;
          try {
            return Me(e(t));
          } catch {
          }
      }
    return null;
  }
  var De = Array.isArray, ue = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Se = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Dt = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Nl = [], He = -1;
  function Vt(e) {
    return { current: e };
  }
  function ye(e) {
    0 > He || (e.current = Nl[He], Nl[He] = null, He--);
  }
  function Ve(e, t) {
    He++, Nl[He] = e.current, e.current = t;
  }
  var ut = Vt(null), mn = Vt(null), ln = Vt(null), Oe = Vt(null);
  function Yn(e, t) {
    switch (Ve(ln, t), Ve(mn, e), Ve(ut, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Hg(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Hg(t), e = Bg(t, e);
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
    ye(ut), Ve(ut, e);
  }
  function pn() {
    ye(ut), ye(mn), ye(ln);
  }
  function jl(e) {
    var t = e.memoizedState;
    t !== null && (Ii._currentValue = t.memoizedState, Ve(Oe, e)), t = ut.current;
    var n = Bg(t, e.type);
    t !== n && (Ve(mn, e), Ve(ut, n));
  }
  function El(e) {
    mn.current === e && (ye(ut), ye(mn)), Oe.current === e && (ye(Oe), Ii._currentValue = Dt);
  }
  var Jt, an;
  function vt(e) {
    if (Jt === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        Jt = t && t[1] || "", an = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Jt + e + an;
  }
  var Ft = !1;
  function Q(e, t) {
    if (!e || Ft) return "";
    Ft = !0;
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
                } catch (ne) {
                  var C = ne;
                }
                Reflect.construct(e, [], Y);
              } else {
                try {
                  Y.call();
                } catch (ne) {
                  C = ne;
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
              } catch (ne) {
                C = ne;
              }
              (Y = e()) && typeof Y.catch == "function" && Y.catch(function() {
              });
            }
          } catch (ne) {
            if (ne && C && typeof ne.stack == "string")
              return [ne.stack, C.stack];
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
      var r = l.DetermineComponentFrameRoot(), h = r[0], y = r[1];
      if (h && y) {
        var w = h.split(`
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
                  var H = `
` + w[l].replace(" at new ", " at ");
                  return e.displayName && H.includes("<anonymous>") && (H = H.replace("<anonymous>", e.displayName)), H;
                }
              while (1 <= l && 0 <= i);
            break;
          }
      }
    } finally {
      Ft = !1, Error.prepareStackTrace = n;
    }
    return (n = e ? e.displayName || e.name : "") ? vt(n) : "";
  }
  function ee(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return vt(e.type);
      case 16:
        return vt("Lazy");
      case 13:
        return e.child !== t && t !== null ? vt("Suspense Fallback") : vt("Suspense");
      case 19:
        return vt("SuspenseList");
      case 0:
      case 15:
        return Q(e.type, !1);
      case 11:
        return Q(e.type.render, !1);
      case 1:
        return Q(e.type, !0);
      case 31:
        return vt("Activity");
      case 30:
        return vt("ViewTransition");
      default:
        return "";
    }
  }
  function Ee(e) {
    try {
      var t = "", n = null;
      do
        t += ee(e, n), n = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var le = Object.prototype.hasOwnProperty, Qe = a.unstable_scheduleCallback, ot = a.unstable_cancelCallback, Dc = a.unstable_shouldYield, zc = a.unstable_requestPaint, Xt = a.unstable_now, vs = a.unstable_getCurrentPriorityLevel, ri = a.unstable_ImmediatePriority, Tl = a.unstable_UserBlockingPriority, Gn = a.unstable_NormalPriority, Lc = a.unstable_LowPriority, bs = a.unstable_IdlePriority, Uc = a.log, Hc = a.unstable_setDisableYieldValue, Zl = null, At = null;
  function gn(e) {
    if (typeof Uc == "function" && Hc(e), At && typeof At.setStrictMode == "function")
      try {
        At.setStrictMode(Zl, e);
      } catch {
      }
  }
  var ft = Math.clz32 ? Math.clz32 : Ss, Ql = Math.log, xs = Math.LN2;
  function Ss(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Ql(e) / xs | 0) | 0;
  }
  var ui = 256, wa = 262144, Kl = 4194304;
  function al(e) {
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
  function Il(e, t, n) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var i = 0, r = e.suspendedLanes, h = e.pingedLanes;
    e = e.warmLanes;
    var y = l & 134217727;
    return y !== 0 ? (l = y & ~r, l !== 0 ? i = al(l) : (h &= y, h !== 0 ? i = al(h) : n || (n = y & ~e, n !== 0 && (i = al(n))))) : (y = l & ~r, y !== 0 ? i = al(y) : h !== 0 ? i = al(h) : n || (n = l & ~e, n !== 0 && (i = al(n)))), i === 0 ? 0 : t !== 0 && t !== i && (t & r) === 0 && (r = i & -i, n = t & -t, r >= n || r === 32 && (n & 4194048) !== 0) ? t : i;
  }
  function ka(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Jl(e, t) {
    (t & 8) !== 0 && (t |= t & 32);
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var l = 31 - ft(n), i = 1 << l;
        t |= e[l], n &= ~i;
      }
    return t;
  }
  function qu(e, t) {
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
  function Bc() {
    var e = Kl;
    return Kl <<= 1, (Kl & 62914560) === 0 && (Kl = 4194304), e;
  }
  function ct(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function _n(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function $u(e, t, n, l, i, r) {
    var h = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var y = e.entanglements, w = e.expirationTimes, R = e.hiddenUpdates;
    for (n = h & ~n; 0 < n; ) {
      var H = 31 - ft(n), Y = 1 << H;
      y[H] = 0, w[H] = -1;
      var C = R[H];
      if (C !== null)
        for (R[H] = null, H = 0; H < C.length; H++) {
          var z = C[H];
          z !== null && (z.lane &= -536870913);
        }
      n &= ~Y;
    }
    l !== 0 && Ns(e, l, 0), r !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= r & ~(h & ~t));
  }
  function Ns(e, t, n) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - ft(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | n & 261930;
  }
  function oi(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var l = 31 - ft(n), i = 1 << l;
      i & t | e[l] & t && (e[l] |= t), n &= ~i;
    }
  }
  function js(e, t) {
    var n = t & -t;
    return n = (n & 42) !== 0 ? 1 : fi(n), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n;
  }
  function fi(e) {
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
  function Es(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function qc() {
    var e = Se.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : N0(e.type));
  }
  function $c(e, t) {
    var n = Se.p;
    try {
      return Se.p = e, t();
    } finally {
      Se.p = n;
    }
  }
  var Vn = Math.random().toString(36).slice(2), lt = "__reactFiber$" + Vn, zt = "__reactProps$" + Vn, Xn = "__reactContainer$" + Vn, il = "__reactEvents$" + Vn, Yu = "__reactListeners$" + Vn, di = "__reactHandles$" + Vn, Ts = "__reactResources$" + Vn, Aa = "__reactMarker$" + Vn, _a = "__reactLoad$" + Vn;
  function Ca(e) {
    delete e[lt], delete e[zt], delete e[Yu], delete e[di];
  }
  function Cn(e) {
    var t;
    if (t = e[lt]) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[Xn] || n[lt]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = n0(e); e !== null; ) {
            if (n = e[lt]) return n;
            e = n0(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function sl(e) {
    if (e = e[lt] || e[Xn]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function cl(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(u(33));
  }
  function yn(e) {
    var t = e[Ts];
    return t || (t = e[Ts] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function dt(e) {
    e[Aa] = !0;
  }
  function vn(e) {
    e[_a] = void 0;
  }
  var Yc = /* @__PURE__ */ new Set(), Oa = {};
  function wl(e, t) {
    kl(e, t), kl(e + "Capture", t);
  }
  function kl(e, t) {
    for (Oa[e] = t, e = 0; e < t.length; e++)
      Yc.add(t[e]);
  }
  var Gc = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), ws = {}, ks = {};
  function Gu(e) {
    return le.call(ks, e) ? !0 : le.call(ws, e) ? !1 : Gc.test(e) ? ks[e] = !0 : (ws[e] = !0, !1);
  }
  var $e = !1;
  function Vc() {
    var e = $e;
    return $e = !1, e;
  }
  function hi(e, t, n) {
    if (Gu(t))
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
  function Ra(e, t, n) {
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
  function sn(e, t, n, l) {
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
  function Lt(e) {
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
  function P(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function j(e, t, n) {
    var l = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var i = l.get, r = l.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return i.call(this);
        },
        set: function(h) {
          n = "" + h, r.call(this, h);
        }
      }), Object.defineProperty(e, t, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return n;
        },
        setValue: function(h) {
          n = "" + h;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function M(e) {
    if (!e._valueTracker) {
      var t = P(e) ? "checked" : "value";
      e._valueTracker = j(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function I(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), l = "";
    return e && (l = P(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== n ? (t.setValue(e), !0) : !1;
  }
  var ae = /[\n"\\]/g;
  function ie(e) {
    return e.replace(
      ae,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ne(e, t, n, l, i, r, h, y) {
    e.name = "", h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? e.type = h : e.removeAttribute("type"), t != null ? h === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Lt(t)) : e.value !== "" + Lt(t) && (e.value = "" + Lt(t)) : h !== "submit" && h !== "reset" || e.removeAttribute("value"), t != null ? h === "number" && e.value == t ? tt(e, Lt(e.value)) : tt(e, Lt(t)) : n != null ? tt(e, Lt(n)) : l != null && e.removeAttribute("value"), i == null && r != null && (e.defaultChecked = !!r), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? e.name = "" + Lt(y) : e.removeAttribute("name");
  }
  function Ie(e, t, n, l, i, r, h, y) {
    if (r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" && (e.type = r), t != null || n != null) {
      if (!(r !== "submit" && r !== "reset" || t != null)) {
        M(e);
        return;
      }
      n = n != null ? "" + Lt(n) : "", t = t != null ? "" + Lt(t) : n, y || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? i, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = y ? e.checked : !!l, e.defaultChecked = !!l, h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (e.name = h), M(e);
  }
  function tt(e, t) {
    e.defaultValue !== "" + t && (e.defaultValue = "" + t);
  }
  function bt(e, t, n, l) {
    if (e = e.options, t) {
      t = {};
      for (var i = 0; i < n.length; i++)
        t["$" + n[i]] = !0;
      for (n = 0; n < e.length; n++)
        i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && l && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + Lt(n), t = null, i = 0; i < e.length; i++) {
        if (e[i].value === n) {
          e[i].selected = !0, l && (e[i].defaultSelected = !0);
          return;
        }
        t !== null || e[i].disabled || (t = e[i]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Ut(e, t, n) {
    if (t != null && (t = "" + Lt(t), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + Lt(n) : "";
  }
  function mi(e, t, n, l) {
    if (t == null) {
      if (l != null) {
        if (n != null) throw Error(u(92));
        if (De(l)) {
          if (1 < l.length) throw Error(u(93));
          l = l[0];
        }
        n = l;
      }
      n == null && (n = ""), t = n;
    }
    n = Lt(t), e.defaultValue = n, l = e.textContent, l === n && l !== "" && l !== null && (e.value = l), M(e);
  }
  function pt(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Xc = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Vu(e, t, n) {
    var l = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Xc.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function Oh(e, t, n) {
    if (t != null && typeof t != "object")
      throw Error(u(62));
    if (e = e.style, n != null) {
      for (var l in n)
        !n.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "", $e = !0);
      for (var i in t)
        l = t[i], t.hasOwnProperty(i) && n[i] !== l && (Vu(e, i, l), $e = !0);
    } else
      for (var r in t)
        t.hasOwnProperty(r) && Vu(e, r, t[r]);
  }
  function Xu(e) {
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
  var b1 = /* @__PURE__ */ new Map([
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
  ]), x1 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Zc(e) {
    return x1.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function rl() {
  }
  var Zu = null;
  function Qu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var pi = null, gi = null;
  function Rh(e) {
    var t = sl(e);
    if (t && (e = t.stateNode)) {
      var n = e[zt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Ne(
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
              'input[name="' + ie(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < n.length; t++) {
              var l = n[t];
              if (l !== e && l.form === e.form) {
                var i = l[zt] || null;
                if (!i) throw Error(u(90));
                Ne(
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
              l = n[t], l.form === e.form && I(l);
          }
          break e;
        case "textarea":
          Ut(e, n.value, n.defaultValue);
          break e;
        case "select":
          t = n.value, t != null && bt(e, !!n.multiple, t, !1);
      }
    }
  }
  var Ku = !1;
  function Mh(e, t, n) {
    if (Ku) return e(t, n);
    Ku = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (Ku = !1, (pi !== null || gi !== null) && (Zr(), pi && (t = pi, e = gi, gi = pi = null, Rh(t), e)))
        for (t = 0; t < e.length; t++) Rh(e[t]);
    }
  }
  function As(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var l = n[zt] || null;
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
        u(231, t, typeof n)
      );
    return n;
  }
  var Al = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Iu = !1;
  if (Al)
    try {
      var _s = {};
      Object.defineProperty(_s, "passive", {
        get: function() {
          Iu = !0;
        }
      }), window.addEventListener("test", _s, _s), window.removeEventListener("test", _s, _s);
    } catch {
      Iu = !1;
    }
  var Fl = null, Ju = null, Qc = null;
  function Dh() {
    if (Qc) return Qc;
    var e, t = Ju, n = t.length, l, i = "value" in Fl ? Fl.value : Fl.textContent, r = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++) ;
    var h = n - e;
    for (l = 1; l <= h && t[n - l] === i[r - l]; l++) ;
    return Qc = i.slice(e, 1 < l ? 1 - l : void 0);
  }
  function Kc(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ic() {
    return !0;
  }
  function zh() {
    return !1;
  }
  function Pt(e) {
    function t(n, l, i, r, h) {
      this._reactName = n, this._targetInst = i, this.type = l, this.nativeEvent = r, this.target = h, this.currentTarget = null;
      for (var y in e)
        e.hasOwnProperty(y) && (n = e[y], this[y] = n ? n(r) : r[y]);
      return this.isDefaultPrevented = (r.defaultPrevented != null ? r.defaultPrevented : r.returnValue === !1) ? Ic : zh, this.isPropagationStopped = zh, this;
    }
    return G(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Ic);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Ic);
      },
      persist: function() {
      },
      isPersistent: Ic
    }), t;
  }
  var Pl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Jc = Pt(Pl), Cs = G({}, Pl, { view: 0, detail: 0 }), S1 = Pt(Cs), Fu, Pu, Os, Fc = G({}, Cs, {
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
    getModifierState: eo,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Os && (Os && e.type === "mousemove" ? (Fu = e.screenX - Os.screenX, Pu = e.screenY - Os.screenY) : Pu = Fu = 0, Os = e), Fu);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Pu;
    }
  }), Lh = Pt(Fc), N1 = G({}, Fc, { dataTransfer: 0 }), j1 = Pt(N1), E1 = G({}, Cs, { relatedTarget: 0 }), Wu = Pt(E1), T1 = G({}, Pl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), w1 = Pt(T1), k1 = G({}, Pl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), A1 = Pt(k1), _1 = G({}, Pl, { data: 0 }), Uh = Pt(_1), C1 = {
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
  }, O1 = {
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
  }, R1 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function M1(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = R1[e]) ? !!t[e] : !1;
  }
  function eo() {
    return M1;
  }
  var D1 = G({}, Cs, {
    key: function(e) {
      if (e.key) {
        var t = C1[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Kc(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? O1[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: eo,
    charCode: function(e) {
      return e.type === "keypress" ? Kc(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Kc(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), z1 = Pt(D1), L1 = G({}, Fc, {
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
  }), Hh = Pt(L1), U1 = G({}, Pl, { submitter: 0 }), H1 = Pt(U1), B1 = G({}, Cs, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: eo
  }), q1 = Pt(B1), $1 = G({}, Pl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Y1 = Pt($1), G1 = G({}, Fc, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), V1 = Pt(G1), X1 = G({}, Pl, {
    newState: 0,
    oldState: 0,
    source: 0
  }), Z1 = Pt(X1), Q1 = [9, 13, 27, 32], to = Al && "CompositionEvent" in window, Rs = null;
  Al && "documentMode" in document && (Rs = document.documentMode);
  var K1 = Al && "TextEvent" in window && !Rs, Bh = Al && (!to || Rs && 8 < Rs && 11 >= Rs), qh = " ", $h = !1;
  function Yh(e, t) {
    switch (e) {
      case "keyup":
        return Q1.indexOf(t.keyCode) !== -1;
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
  function Gh(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var yi = !1;
  function I1(e, t) {
    switch (e) {
      case "compositionend":
        return Gh(t);
      case "keypress":
        return t.which !== 32 ? null : ($h = !0, qh);
      case "textInput":
        return e = t.data, e === qh && $h ? null : e;
      default:
        return null;
    }
  }
  function J1(e, t) {
    if (yi)
      return e === "compositionend" || !to && Yh(e, t) ? (e = Dh(), Qc = Ju = Fl = null, yi = !1, e) : null;
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
        return Bh && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var F1 = {
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
  function Vh(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!F1[e.type] : t === "textarea";
  }
  function Xh(e, t, n, l) {
    pi ? gi ? gi.push(l) : gi = [l] : pi = l, t = Pr(t, "onChange"), 0 < t.length && (n = new Jc(
      "onChange",
      "change",
      null,
      n,
      l
    ), e.push({ event: n, listeners: t }));
  }
  var Ms = null, Ds = null;
  function P1(e) {
    Rg(e, 0);
  }
  function Pc(e) {
    var t = cl(e);
    if (I(t)) return e;
  }
  function Zh(e, t) {
    if (e === "change") return t;
  }
  var Qh = !1;
  if (Al) {
    var no;
    if (Al) {
      var lo = "oninput" in document;
      if (!lo) {
        var Kh = document.createElement("div");
        Kh.setAttribute("oninput", "return;"), lo = typeof Kh.oninput == "function";
      }
      no = lo;
    } else no = !1;
    Qh = no && (!document.documentMode || 9 < document.documentMode);
  }
  function Ih() {
    Ms && (Ms.detachEvent("onpropertychange", Jh), Ds = Ms = null);
  }
  function Jh(e) {
    if (e.propertyName === "value" && Pc(Ds)) {
      var t = [];
      Xh(
        t,
        Ds,
        e,
        Qu(e)
      ), Mh(P1, t);
    }
  }
  function W1(e, t, n) {
    e === "focusin" ? (Ih(), Ms = t, Ds = n, Ms.attachEvent("onpropertychange", Jh)) : e === "focusout" && Ih();
  }
  function eb(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Pc(Ds);
  }
  function tb(e, t) {
    if (e === "click") return Pc(t);
  }
  function nb(e, t) {
    if (e === "input" || e === "change")
      return Pc(t);
  }
  function lb(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var bn = typeof Object.is == "function" ? Object.is : lb;
  function zs(e, t) {
    if (bn(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), l = Object.keys(t);
    if (n.length !== l.length) return !1;
    for (l = 0; l < n.length; l++) {
      var i = n[l];
      if (!le.call(t, i) || !bn(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  function ao(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Fh(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Ph(e, t) {
    var n = Fh(e);
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
      n = Fh(n);
    }
  }
  function Wh(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Wh(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function em(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = ao(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = ao(e.document);
    }
    return t;
  }
  function io(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var ab = Al && "documentMode" in document && 11 >= document.documentMode, vi = null, so = null, Ls = null, co = !1;
  function tm(e, t, n) {
    var l = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    co || vi == null || vi !== ao(l) || (l = vi, "selectionStart" in l && io(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), Ls && zs(Ls, l) || (Ls = l, l = Pr(so, "onSelect"), 0 < l.length && (t = new Jc(
      "onSelect",
      "select",
      null,
      t,
      n
    ), e.push({ event: t, listeners: l }), t.target = vi)));
  }
  function Ma(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var bi = {
    animationend: Ma("Animation", "AnimationEnd"),
    animationiteration: Ma("Animation", "AnimationIteration"),
    animationstart: Ma("Animation", "AnimationStart"),
    transitionrun: Ma("Transition", "TransitionRun"),
    transitionstart: Ma("Transition", "TransitionStart"),
    transitioncancel: Ma("Transition", "TransitionCancel"),
    transitionend: Ma("Transition", "TransitionEnd")
  }, ro = {}, nm = {};
  Al && (nm = document.createElement("div").style, "AnimationEvent" in window || (delete bi.animationend.animation, delete bi.animationiteration.animation, delete bi.animationstart.animation), "TransitionEvent" in window || delete bi.transitionend.transition);
  function Da(e) {
    if (ro[e]) return ro[e];
    if (!bi[e]) return e;
    var t = bi[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in nm)
        return ro[e] = t[n];
    return e;
  }
  var lm = Da("animationend"), am = Da("animationiteration"), im = Da("animationstart"), ib = Da("transitionrun"), sb = Da("transitionstart"), cb = Da("transitioncancel"), sm = Da("transitionend"), cm = /* @__PURE__ */ new Map(), uo = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  uo.push("scrollEnd");
  function Zn(e, t) {
    cm.set(e, t), wl(t, [e]);
  }
  var rb = 0;
  function _l(e, t) {
    if (e.name != null && e.name !== "auto") return e.name;
    if (t.autoName !== null) return t.autoName;
    e = Jn.identifierPrefix;
    var n = rb++;
    return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
  }
  function rm(e) {
    if (e == null || typeof e == "string")
      return e;
    var t = null, n = Bi;
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
  function Cl(e, t) {
    return e = rm(e), t = rm(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
  }
  var Wc = typeof reportError == "function" ? reportError : function(e) {
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
  }, On = [], xi = 0, oo = 0;
  function er() {
    for (var e = xi, t = oo = xi = 0; t < e; ) {
      var n = On[t];
      On[t++] = null;
      var l = On[t];
      On[t++] = null;
      var i = On[t];
      On[t++] = null;
      var r = On[t];
      if (On[t++] = null, l !== null && i !== null) {
        var h = l.pending;
        h === null ? i.next = i : (i.next = h.next, h.next = i), l.pending = i;
      }
      r !== 0 && um(n, i, r);
    }
  }
  function tr(e, t, n, l) {
    On[xi++] = e, On[xi++] = t, On[xi++] = n, On[xi++] = l, oo |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function fo(e, t, n, l) {
    return tr(e, t, n, l), nr(e);
  }
  function za(e, t) {
    return tr(e, null, null, t), nr(e);
  }
  function um(e, t, n) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n);
    for (var i = !1, r = e.return; r !== null; )
      r.childLanes |= n, l = r.alternate, l !== null && (l.childLanes |= n), r.tag === 22 && (e = r.stateNode, e === null || e._visibility & 1 || (i = !0)), e = r, r = r.return;
    return e.tag === 3 ? (r = e.stateNode, i && t !== null && (i = 31 - ft(n), e = r.hiddenUpdates, l = e[i], l === null ? e[i] = [t] : l.push(t), t.lane = n | 536870912), r) : null;
  }
  function nr(e) {
    if (50 < ac)
      throw ac = 0, Xr = null, Error(u(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Si = {};
  function ub(e, t, n, l) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function cn(e, t, n, l) {
    return new ub(e, t, n, l);
  }
  function ho(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Ol(e, t) {
    var n = e.alternate;
    return n === null ? (n = cn(
      e.tag,
      t,
      e.key,
      e.mode
    ), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 1206910976, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
  }
  function om(e, t) {
    e.flags &= 1206910978;
    var n = e.alternate;
    return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function lr(e, t, n, l, i, r) {
    var h = 0;
    if (l = e, typeof l == "function") ho(l) && (h = 1);
    else if (typeof l == "string")
      h = Ux(
        e,
        n,
        ut.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (l) {
        case Ge:
          return e = cn(31, n, t, i), e.elementType = Ge, e.lanes = r, e;
        case xe:
          return La(n.children, i, r, t);
        case pe:
          h = 8, i |= 24;
          break;
        case W:
          return e = cn(12, n, t, i | 2), e.elementType = W, e.lanes = r, e;
        case re:
          return e = cn(13, n, t, i), e.elementType = re, e.lanes = r, e;
        case be:
          return e = cn(19, n, t, i), e.elementType = be, e.lanes = r, e;
        case st:
        case _:
          return e = i | 32, e = cn(30, n, t, e), e.elementType = _, e.lanes = r, e.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, e;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case he:
                h = 10;
                break e;
              case we:
                h = 9;
                break e;
              case J:
                h = 11;
                break e;
              case Ue:
                h = 14;
                break e;
              case K:
                h = 16, l = null;
                break e;
            }
          h = 29, n = Error(
            u(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = cn(h, n, t, i), t.elementType = e, t.type = l, t.lanes = r, t;
  }
  function La(e, t, n, l) {
    return e = cn(7, e, l, t), e.lanes = n, e;
  }
  function mo(e, t, n) {
    return e = cn(6, e, null, t), e.lanes = n, e;
  }
  function fm(e) {
    var t = cn(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function po(e, t, n) {
    return t = cn(
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
  var dm = /* @__PURE__ */ new WeakMap();
  function Rn(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = dm.get(e);
      return n !== void 0 ? n : (t = {
        value: e,
        source: t,
        stack: Ee(t)
      }, dm.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Ee(t)
    };
  }
  var Ni = [], ji = 0, ar = null, Us = 0, Mn = [], Dn = 0, Wl = null, ul = 1, ol = "";
  function Rl(e, t) {
    Ni[ji++] = Us, Ni[ji++] = ar, ar = e, Us = t;
  }
  function hm(e, t, n) {
    Mn[Dn++] = ul, Mn[Dn++] = ol, Mn[Dn++] = Wl, Wl = e;
    var l = ul;
    e = ol;
    var i = 32 - ft(l) - 1;
    l &= ~(1 << i), n += 1;
    var r = 32 - ft(t) + i;
    if (30 < r) {
      var h = i - i % 5;
      r = (l & (1 << h) - 1).toString(32), l >>= h, i -= h, ul = 1 << 32 - ft(t) + i | n << i | l, ol = r + e;
    } else
      ul = 1 << r | n << i | l, ol = e;
  }
  function ir(e) {
    e.return !== null && (Rl(e, 1), hm(e, 1, 0));
  }
  function go(e) {
    for (; e === ar; )
      ar = Ni[--ji], Ni[ji] = null, Us = Ni[--ji], Ni[ji] = null;
    for (; e === Wl; )
      Wl = Mn[--Dn], Mn[Dn] = null, ol = Mn[--Dn], Mn[Dn] = null, ul = Mn[--Dn], Mn[Dn] = null;
  }
  function mm(e, t) {
    Mn[Dn++] = ul, Mn[Dn++] = ol, Mn[Dn++] = Wl, ul = t.id, ol = t.overflow, Wl = e;
  }
  var _t = null, at = null, Re = !1, ea = null, zn = !1, yo = Error(u(519));
  function ta(e) {
    var t = Error(
      u(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Hs(Rn(t, e)), yo;
  }
  function pm(e) {
    var t = e.stateNode, n = e.type, l = e.memoizedProps;
    switch (t[lt] = e, t[zt] = l, n) {
      case "dialog":
        Le("cancel", t), Le("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Le("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < sc.length; n++)
          Le(sc[n], t);
        break;
      case "source":
        Le("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Le("error", t), Le("load", t);
        break;
      case "details":
        Le("toggle", t);
        break;
      case "input":
        Le("invalid", t), Ie(
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
        Le("invalid", t);
        break;
      case "textarea":
        Le("invalid", t), mi(t, l.value, l.defaultValue, l.children);
    }
    n = l.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || l.suppressHydrationWarning === !0 || Lg(t.textContent, n) ? (l.popover != null && (Le("beforetoggle", t), Le("toggle", t)), l.onScroll != null && Le("scroll", t), l.onScrollEnd != null && Le("scrollend", t), l.onClick != null && (t.onclick = rl), t = !0) : t = !1, t || ta(e, !0);
  }
  function sr(e) {
    for (_t = e.return; _t; )
      switch (_t.tag) {
        case 5:
        case 31:
        case 13:
          zn = !1;
          return;
        case 27:
        case 3:
          zn = !0;
          return;
        default:
          _t = _t.return;
      }
  }
  function Ei(e) {
    if (e !== _t) return !1;
    if (!Re) return sr(e), Re = !0, !1;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Kf(e.type, e.memoizedProps)), n = !n), n && at && ta(e), sr(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
      at = t0(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
      at = t0(e);
    } else
      t === 27 ? (t = at, ya(e.type) ? (e = ld, ld = null, at = e) : at = t) : at = _t ? Un(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ua() {
    at = _t = null, Re = !1;
  }
  function vo() {
    var e = ea;
    return e !== null && (on === null ? on = e : on.push.apply(
      on,
      e
    ), ea = null), e;
  }
  function Hs(e) {
    ea === null ? ea = [e] : ea.push(e);
  }
  var bo = Vt(null), Ha = null, Ml = null;
  function na(e, t, n) {
    Ve(bo, t._currentValue), t._currentValue = n;
  }
  function Dl(e) {
    e._currentValue = bo.current, ye(bo);
  }
  function cr(e, t, n) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function xo(e, t, n, l) {
    var i = e.child;
    for (i !== null && (i.return = e); i !== null; ) {
      var r = i.dependencies;
      if (r !== null) {
        var h = i.child;
        r = r.firstContext;
        e: for (; r !== null; ) {
          var y = r;
          r = i;
          for (var w = 0; w < t.length; w++)
            if (y.context === t[w]) {
              r.lanes |= n, y = r.alternate, y !== null && (y.lanes |= n), cr(
                r.return,
                n,
                e
              ), l || (h = null);
              break e;
            }
          r = y.next;
        }
      } else if (i.tag === 18) {
        if (h = i.return, h === null) throw Error(u(341));
        h.lanes |= n, r = h.alternate, r !== null && (r.lanes |= n), cr(h, n, e), h = null;
      } else
        i.tag === 13 && i.memoizedState !== null && i.memoizedState.dehydrated === null ? (i.lanes |= n, h = i.alternate, h !== null && (h.lanes |= n), cr(
          i.return,
          n,
          e
        ), h = i.child, h = h !== null ? h.sibling : null) : h = i.child;
      if (h !== null) h.return = i;
      else
        for (h = i; h !== null; ) {
          if (h === e) {
            h = null;
            break;
          }
          if (i = h.sibling, i !== null) {
            i.return = h.return, h = i;
            break;
          }
          h = h.return;
        }
      i = h;
    }
  }
  function Ba(e, t, n, l) {
    e = null;
    for (var i = t, r = !1; i !== null; ) {
      if (!r) {
        if ((i.flags & 524288) !== 0) r = !0;
        else if ((i.flags & 262144) !== 0) break;
      }
      if (i.tag === 10) {
        var h = i.alternate;
        if (h === null) throw Error(u(387));
        if (h = h.memoizedProps, h !== null) {
          var y = i.type;
          bn(i.pendingProps.value, h.value) || (e !== null ? e.push(y) : e = [y]);
        }
      } else if (i === Oe.current) {
        if (h = i.alternate, h === null) throw Error(u(387));
        h.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e !== null ? e.push(Ii) : e = [Ii]);
      }
      i = i.return;
    }
    return e !== null && xo(
      t,
      e,
      n,
      l
    ), t.flags |= 262144, e !== null;
  }
  function rr(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!bn(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function qa(e) {
    Ha = e, Ml = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Ht(e) {
    return gm(Ha, e);
  }
  function ur(e, t) {
    return Ha === null && qa(e), gm(e, t);
  }
  function gm(e, t) {
    var n = t._currentValue;
    if (t = { context: t, memoizedValue: n, next: null }, Ml === null) {
      if (e === null) throw Error(u(308));
      Ml = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Ml = Ml.next = t;
    return n;
  }
  var ob = typeof AbortController < "u" ? AbortController : function() {
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
  }, fb = a.unstable_scheduleCallback, db = a.unstable_NormalPriority, St = {
    $$typeof: he,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function So() {
    return {
      controller: new ob(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Bs(e) {
    e.refCount--, e.refCount === 0 && fb(db, function() {
      e.controller.abort();
    });
  }
  function ym(e, t) {
    if ((e.pendingLanes & 4194048) !== 0) {
      var n = e.transitionTypes;
      for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
        var l = t[e];
        n.indexOf(l) === -1 && n.push(l);
      }
    }
  }
  var qs = null;
  function hb(e) {
    var t = e.transitionTypes;
    return e.transitionTypes = null, t;
  }
  var $s = null, No = 0, $a = 0, Ti = null;
  function mb(e, t) {
    if ($s === null) {
      var n = $s = [];
      No = 0, $a = Bf(), Ti = {
        status: "pending",
        value: void 0,
        then: function(l) {
          n.push(l);
        }
      };
    }
    return No++, t.then(vm, vm), t;
  }
  function vm() {
    if (--No === 0 && (qs = null, $s !== null)) {
      Ti !== null && (Ti.status = "fulfilled");
      var e = $s;
      $s = null, $a = 0, Ti = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function pb(e, t) {
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
  var bm = ue.S;
  ue.S = function(e, t) {
    if (fg = Xt(), typeof t == "object" && t !== null && typeof t.then == "function" && mb(e, t), qs !== null)
      for (var n = Gi; n !== null; )
        ym(n, qs), n = n.next;
    if (n = e.types, n !== null) {
      for (var l = Gi; l !== null; )
        ym(l, n), l = l.next;
      if ($a !== 0) {
        l = qs, l === null && (l = qs = []);
        for (var i = 0; i < n.length; i++) {
          var r = n[i];
          l.indexOf(r) === -1 && l.push(r);
        }
      }
    }
    bm !== null && bm(e, t);
  };
  var Ya = Vt(null);
  function jo() {
    var e = Ya.current;
    return e !== null ? e : nt.pooledCache;
  }
  function or(e, t) {
    t === null ? Ve(Ya, Ya.current) : Ve(Ya, t.pool);
  }
  function xm() {
    var e = jo();
    return e === null ? null : { parent: St._currentValue, pool: e };
  }
  var wi = Error(u(460)), Eo = Error(u(474)), fr = Error(u(542)), dr = { then: function() {
  } };
  function Sm(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Nm(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(rl, rl), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Em(e), e === void 0 && !("reason" in t) ? Error(u(600)) : e;
      default:
        if (typeof t.status == "string") t.then(rl, rl);
        else {
          if (e = nt, e !== null && 100 < e.shellSuspendCounter)
            throw Error(u(482));
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
            throw e = t.reason, Em(e), e;
        }
        throw Va = t, wi;
    }
  }
  function Ga(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (Va = n, wi) : n;
    }
  }
  var Va = null;
  function jm() {
    if (Va === null) throw Error(u(459));
    var e = Va;
    return Va = null, e;
  }
  function Em(e) {
    if (e === wi || e === fr)
      throw Error(u(483));
  }
  var ki = null, Ys = 0;
  function hr(e) {
    var t = Ys;
    return Ys += 1, ki === null && (ki = []), Nm(ki, e, t);
  }
  function la(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function mr(e, t) {
    throw t.$$typeof === ce ? Error(u(525)) : (e = Object.prototype.toString.call(t), Error(
      u(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Tm(e) {
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
      return O = Ol(O, A), O.index = 0, O.sibling = null, O;
    }
    function r(O, A, D) {
      return O.index = D, e ? (D = O.alternate, D !== null ? (D = D.index, D < A ? (O.flags |= 2, A) : D) : (O.flags |= 134217730, A)) : (O.flags |= 1048576, A);
    }
    function h(O) {
      return e && O.alternate === null && (O.flags |= 134217730), O;
    }
    function y(O, A, D, $) {
      return A === null || A.tag !== 6 ? (A = mo(D, O.mode, $), A.return = O, A) : (A = i(A, D), A.return = O, A);
    }
    function w(O, A, D, $) {
      var se = D.type;
      return se === xe ? (O = H(
        O,
        A,
        D.props.children,
        $,
        D.key
      ), la(O, D), O) : A !== null && (A.elementType === se || typeof se == "object" && se !== null && se.$$typeof === K && Ga(se) === A.type) ? (A = i(A, D.props), la(A, D), A.return = O, A) : (A = lr(
        D.type,
        D.key,
        D.props,
        null,
        O.mode,
        $
      ), la(A, D), A.return = O, A);
    }
    function R(O, A, D, $) {
      return A === null || A.tag !== 4 || A.stateNode.containerInfo !== D.containerInfo || A.stateNode.implementation !== D.implementation ? (A = po(D, O.mode, $), A.return = O, A) : (A = i(A, D.children || []), A.return = O, A);
    }
    function H(O, A, D, $, se) {
      return A === null || A.tag !== 7 ? (A = La(
        D,
        O.mode,
        $,
        se
      ), A.return = O, A) : (A = i(A, D), A.return = O, A);
    }
    function Y(O, A, D) {
      if (typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint")
        return A = mo(
          "" + A,
          O.mode,
          D
        ), A.return = O, A;
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case Te:
            return D = lr(
              A.type,
              A.key,
              A.props,
              null,
              O.mode,
              D
            ), la(D, A), D.return = O, D;
          case de:
            return A = po(
              A,
              O.mode,
              D
            ), A.return = O, A;
          case K:
            return A = Ga(A), Y(O, A, D);
        }
        if (De(A) || me(A))
          return A = La(
            A,
            O.mode,
            D,
            null
          ), A.return = O, A;
        if (typeof A.then == "function")
          return Y(O, hr(A), D);
        if (A.$$typeof === he)
          return Y(
            O,
            ur(O, A),
            D
          );
        mr(O, A);
      }
      return null;
    }
    function C(O, A, D, $) {
      var se = A !== null ? A.key : null;
      if (typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint")
        return se !== null ? null : y(O, A, "" + D, $);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case Te:
            return D.key === se ? w(O, A, D, $) : null;
          case de:
            return D.key === se ? R(O, A, D, $) : null;
          case K:
            return D = Ga(D), C(O, A, D, $);
        }
        if (De(D) || me(D))
          return se !== null ? null : H(O, A, D, $, null);
        if (typeof D.then == "function")
          return C(
            O,
            A,
            hr(D),
            $
          );
        if (D.$$typeof === he)
          return C(
            O,
            A,
            ur(O, D),
            $
          );
        mr(O, D);
      }
      return null;
    }
    function z(O, A, D, $, se) {
      if (typeof $ == "string" && $ !== "" || typeof $ == "number" || typeof $ == "bigint")
        return O = O.get(D) || null, y(A, O, "" + $, se);
      if (typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case Te:
            return O = O.get(
              $.key === null ? D : $.key
            ) || null, w(A, O, $, se);
          case de:
            return O = O.get(
              $.key === null ? D : $.key
            ) || null, R(A, O, $, se);
          case K:
            return $ = Ga($), z(
              O,
              A,
              D,
              $,
              se
            );
        }
        if (De($) || me($))
          return O = O.get(D) || null, H(A, O, $, se, null);
        if (typeof $.then == "function")
          return z(
            O,
            A,
            D,
            hr($),
            se
          );
        if ($.$$typeof === he)
          return z(
            O,
            A,
            D,
            ur(A, $),
            se
          );
        mr(A, $);
      }
      return null;
    }
    function ne(O, A, D, $) {
      for (var se = null, qe = null, ge = A, je = A = 0, Et = null; ge !== null && je < D.length; je++) {
        ge.index > je ? (Et = ge, ge = null) : Et = ge.sibling;
        var Ye = C(
          O,
          ge,
          D[je],
          $
        );
        if (Ye === null) {
          ge === null && (ge = Et);
          break;
        }
        e && ge && Ye.alternate === null && t(O, ge), A = r(Ye, A, je), qe === null ? se = Ye : qe.sibling = Ye, qe = Ye, ge = Et;
      }
      if (je === D.length)
        return n(O, ge), Re && Rl(O, je), se;
      if (ge === null) {
        for (; je < D.length; je++)
          ge = Y(O, D[je], $), ge !== null && (A = r(
            ge,
            A,
            je
          ), qe === null ? se = ge : qe.sibling = ge, qe = ge);
        return Re && Rl(O, je), se;
      }
      for (ge = l(ge); je < D.length; je++)
        Et = z(
          ge,
          O,
          je,
          D[je],
          $
        ), Et !== null && (e && (Ye = Et.alternate, Ye !== null && ge.delete(Ye.key === null ? je : Ye.key)), A = r(
          Et,
          A,
          je
        ), qe === null ? se = Et : qe.sibling = Et, qe = Et);
      return e && ge.forEach(function(Na) {
        return t(O, Na);
      }), Re && Rl(O, je), se;
    }
    function oe(O, A, D, $) {
      if (D == null) throw Error(u(151));
      for (var se = null, qe = null, ge = A, je = A = 0, Et = null, Ye = D.next(); ge !== null && !Ye.done; je++, Ye = D.next()) {
        ge.index > je ? (Et = ge, ge = null) : Et = ge.sibling;
        var Na = C(O, ge, Ye.value, $);
        if (Na === null) {
          ge === null && (ge = Et);
          break;
        }
        e && ge && Na.alternate === null && t(O, ge), A = r(Na, A, je), qe === null ? se = Na : qe.sibling = Na, qe = Na, ge = Et;
      }
      if (Ye.done)
        return n(O, ge), Re && Rl(O, je), se;
      if (ge === null) {
        for (; !Ye.done; je++, Ye = D.next())
          Ye = Y(O, Ye.value, $), Ye !== null && (A = r(Ye, A, je), qe === null ? se = Ye : qe.sibling = Ye, qe = Ye);
        return Re && Rl(O, je), se;
      }
      for (ge = l(ge); !Ye.done; je++, Ye = D.next())
        Ye = z(ge, O, je, Ye.value, $), Ye !== null && (e && (Et = Ye.alternate, Et !== null && ge.delete(
          Et.key === null ? je : Et.key
        )), A = r(Ye, A, je), qe === null ? se = Ye : qe.sibling = Ye, qe = Ye);
      return e && ge.forEach(function(Ix) {
        return t(O, Ix);
      }), Re && Rl(O, je), se;
    }
    function _e(O, A, D, $) {
      if (typeof D == "object" && D !== null && D.type === xe && D.key === null && D.props.ref === void 0 && (D = D.props.children), typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case Te:
            e: {
              for (var se = D.key; A !== null; ) {
                if (A.key === se) {
                  if (se = D.type, se === xe) {
                    if (A.tag === 7) {
                      n(
                        O,
                        A.sibling
                      ), $ = i(
                        A,
                        D.props.children
                      ), la($, D), $.return = O, O = $;
                      break e;
                    }
                  } else if (A.elementType === se || typeof se == "object" && se !== null && se.$$typeof === K && Ga(se) === A.type) {
                    n(
                      O,
                      A.sibling
                    ), $ = i(A, D.props), la($, D), $.return = O, O = $;
                    break e;
                  }
                  n(O, A);
                  break;
                } else t(O, A);
                A = A.sibling;
              }
              D.type === xe ? ($ = La(
                D.props.children,
                O.mode,
                $,
                D.key
              ), la($, D), $.return = O, O = $) : ($ = lr(
                D.type,
                D.key,
                D.props,
                null,
                O.mode,
                $
              ), la($, D), $.return = O, O = $);
            }
            return h(O);
          case de:
            e: {
              for (se = D.key; A !== null; ) {
                if (A.key === se)
                  if (A.tag === 4 && A.stateNode.containerInfo === D.containerInfo && A.stateNode.implementation === D.implementation) {
                    n(
                      O,
                      A.sibling
                    ), $ = i(A, D.children || []), $.return = O, O = $;
                    break e;
                  } else {
                    n(O, A);
                    break;
                  }
                else t(O, A);
                A = A.sibling;
              }
              $ = po(D, O.mode, $), $.return = O, O = $;
            }
            return h(O);
          case K:
            return D = Ga(D), _e(
              O,
              A,
              D,
              $
            );
        }
        if (De(D))
          return ne(
            O,
            A,
            D,
            $
          );
        if (me(D)) {
          if (se = me(D), typeof se != "function") throw Error(u(150));
          return D = se.call(D), oe(
            O,
            A,
            D,
            $
          );
        }
        if (typeof D.then == "function")
          return _e(
            O,
            A,
            hr(D),
            $
          );
        if (D.$$typeof === he)
          return _e(
            O,
            A,
            ur(O, D),
            $
          );
        mr(O, D);
      }
      return typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint" ? (D = "" + D, A !== null && A.tag === 6 ? (n(O, A.sibling), $ = i(A, D), $.return = O, O = $) : (n(O, A), $ = mo(D, O.mode, $), $.return = O, O = $), h(O)) : n(O, A);
    }
    return function(O, A, D, $) {
      try {
        Ys = 0;
        var se = _e(
          O,
          A,
          D,
          $
        );
        return ki = null, se;
      } catch (ge) {
        if (ge === wi || ge === fr) throw ge;
        var qe = cn(29, ge, null, O.mode);
        return qe.lanes = $, qe.return = O, qe;
      } finally {
      }
    };
  }
  var Xa = Tm(!0), wm = Tm(!1), aa = !1;
  function To(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function wo(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function ia(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function sa(e, t, n) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (Ze & 2) !== 0) {
      var i = l.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), l.pending = t, t = nr(e), um(e, null, n), t;
    }
    return tr(e, l, t, n), nr(e);
  }
  function Gs(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, n |= l, t.lanes = n, oi(e, n);
    }
  }
  function ko(e, t) {
    var n = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, n === l)) {
      var i = null, r = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var h = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          r === null ? i = r = h : r = r.next = h, n = n.next;
        } while (n !== null);
        r === null ? i = r = t : r = r.next = t;
      } else i = r = t;
      n = {
        baseState: l.baseState,
        firstBaseUpdate: i,
        lastBaseUpdate: r,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  var Ao = !1;
  function Vs() {
    if (Ao) {
      var e = Ti;
      if (e !== null) throw e;
    }
  }
  function Xs(e, t, n, l) {
    Ao = !1;
    var i = e.updateQueue;
    aa = !1;
    var r = i.firstBaseUpdate, h = i.lastBaseUpdate, y = i.shared.pending;
    if (y !== null) {
      i.shared.pending = null;
      var w = y, R = w.next;
      w.next = null, h === null ? r = R : h.next = R, h = w;
      var H = e.alternate;
      H !== null && (H = H.updateQueue, y = H.lastBaseUpdate, y !== h && (y === null ? H.firstBaseUpdate = R : y.next = R, H.lastBaseUpdate = w));
    }
    if (r !== null) {
      var Y = i.baseState;
      h = 0, H = R = w = null, y = r;
      do {
        var C = y.lane & -536870913, z = C !== y.lane;
        if (z ? (Be & C) === C : (l & C) === C) {
          C !== 0 && C === $a && (Ao = !0), H !== null && (H = H.next = {
            lane: 0,
            tag: y.tag,
            payload: y.payload,
            callback: null,
            next: null
          });
          e: {
            var ne = e, oe = y;
            C = t;
            var _e = n;
            switch (oe.tag) {
              case 1:
                if (ne = oe.payload, typeof ne == "function") {
                  Y = ne.call(_e, Y, C);
                  break e;
                }
                Y = ne;
                break e;
              case 3:
                ne.flags = ne.flags & -65537 | 128;
              case 0:
                if (ne = oe.payload, C = typeof ne == "function" ? ne.call(_e, Y, C) : ne, C == null) break e;
                Y = G({}, Y, C);
                break e;
              case 2:
                aa = !0;
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
          }, H === null ? (R = H = z, w = Y) : H = H.next = z, h |= C;
        if (y = y.next, y === null) {
          if (y = i.shared.pending, y === null)
            break;
          z = y, y = z.next, z.next = null, i.lastBaseUpdate = z, i.shared.pending = null;
        }
      } while (!0);
      H === null && (w = Y), i.baseState = w, i.firstBaseUpdate = R, i.lastBaseUpdate = H, r === null && (i.shared.lanes = 0), ha |= h, e.lanes = h, e.memoizedState = Y;
    }
  }
  function km(e, t) {
    if (typeof e != "function")
      throw Error(u(191, e));
    e.call(t);
  }
  function Am(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++)
        km(n[e], t);
  }
  var ca = Vt(null), pr = Vt(0);
  function _m(e, t) {
    e = Bl, Ve(pr, e), Ve(ca, t), Bl = e | t.baseLanes;
  }
  function _o() {
    Ve(pr, Bl), Ve(ca, ca.current);
  }
  function Co() {
    Bl = pr.current, ye(ca), ye(pr);
  }
  var Bt = Vt(null), Zt = null;
  function ra(e) {
    var t = e.alternate;
    Ve(qt, qt.current & 1), Ve(Bt, e), Zt === null && (t === null || ca.current !== null || t.memoizedState !== null) && (Zt = e);
  }
  function Oo(e) {
    Ve(qt, qt.current), Ve(Bt, e), Zt === null && (Zt = e);
  }
  function Cm(e) {
    e.tag === 22 ? (Ve(qt, qt.current), Ve(Bt, e), Zt === null && (Zt = e)) : ua();
  }
  function ua() {
    Ve(qt, qt.current), Ve(Bt, Bt.current);
  }
  function xn(e) {
    ye(Bt), Zt === e && (Zt = null), ye(qt);
  }
  var qt = Vt(0);
  function Zs(e, t) {
    Ve(Bt, Bt.current), Ve(qt, t);
  }
  function Ro(e) {
    ye(qt), ye(Bt), Zt === e && (Zt = null);
  }
  function gr(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || td(n) || nd(n)))
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
  var zl = 0, Ae = null, et = null, Nt = null, yr = !1, Ai = !1, Za = !1, vr = 0, Qs = 0, _i = null, gb = 0;
  function gt() {
    throw Error(u(321));
  }
  function Mo(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!bn(e[n], t[n])) return !1;
    return !0;
  }
  function Do(e, t, n, l, i, r) {
    return zl = r, Ae = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, ue.H = e === null || e.memoizedState === null ? hp : mp, Za = !1, r = n(l, i), Za = !1, Ai && (r = Rm(
      t,
      n,
      l,
      i
    )), Om(e), r;
  }
  function Om(e) {
    ue.H = Tr;
    var t = et !== null && et.next !== null;
    if (zl = 0, Nt = et = Ae = null, yr = !1, Qs = 0, _i = null, t) throw Error(u(300));
    e === null || jt || (e = e.dependencies, e !== null && rr(e) && (jt = !0));
  }
  function Rm(e, t, n, l) {
    Ae = e;
    var i = 0;
    do {
      if (Ai && (_i = null), Qs = 0, Ai = !1, 25 <= i) throw Error(u(301));
      if (i += 1, Nt = et = null, e.updateQueue != null) {
        var r = e.updateQueue;
        r.lastEffect = null, r.events = null, r.stores = null, r.memoCache != null && (r.memoCache.index = 0);
      }
      ue.H = Eb, r = t(n, l);
    } while (Ai);
    return r;
  }
  function yb() {
    var e = ue.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Ks(t) : t, e = e.useState()[0], (et !== null ? et.memoizedState : null) !== e && (Ae.flags |= 1024), t;
  }
  function zo() {
    var e = vr !== 0;
    return vr = 0, e;
  }
  function Lo(e, t, n) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
  }
  function Uo(e) {
    if (yr) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      yr = !1;
    }
    zl = 0, Nt = et = Ae = null, Ai = !1, Qs = vr = 0, _i = null;
  }
  function Wt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Nt === null ? Ae.memoizedState = Nt = e : Nt = Nt.next = e, Nt;
  }
  function xt() {
    if (et === null) {
      var e = Ae.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = et.next;
    var t = Nt === null ? Ae.memoizedState : Nt.next;
    if (t !== null)
      Nt = t, et = e;
    else {
      if (e === null)
        throw Ae.alternate === null ? Error(u(467)) : Error(u(310));
      et = e, e = {
        memoizedState: et.memoizedState,
        baseState: et.baseState,
        baseQueue: et.baseQueue,
        queue: et.queue,
        next: null
      }, Nt === null ? Ae.memoizedState = Nt = e : Nt = Nt.next = e;
    }
    return Nt;
  }
  function br() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ks(e) {
    var t = Qs;
    return Qs += 1, _i === null && (_i = []), e = Nm(_i, e, t), t = Ae, (Nt === null ? t.memoizedState : Nt.next) === null && (t = t.alternate, ue.H = t === null || t.memoizedState === null ? hp : mp), e;
  }
  function xr(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Ks(e);
      if (e.$$typeof === q) return;
      if (e.$$typeof === he) return Ht(e);
    }
    throw Error(u(438, String(e)));
  }
  function Ho(e) {
    var t = null, n = Ae.updateQueue;
    if (n !== null && (t = n.memoCache), t == null) {
      var l = Ae.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(i) {
          return i.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = br(), Ae.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
      for (n = t.data[t.index] = Array(e), l = 0; l < e; l++)
        n[l] = hn;
    return t.index++, n;
  }
  function Ll(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Sr(e) {
    var t = xt();
    return Bo(t, et, e);
  }
  function Bo(e, t, n) {
    var l = e.queue;
    if (l === null) throw Error(u(311));
    l.lastRenderedReducer = n;
    var i = e.baseQueue, r = l.pending;
    if (r !== null) {
      if (i !== null) {
        var h = i.next;
        i.next = r.next, r.next = h;
      }
      t.baseQueue = i = r, l.pending = null;
    }
    if (r = e.baseState, i === null) e.memoizedState = r;
    else {
      t = i.next;
      var y = h = null, w = null, R = t, H = !1;
      do {
        var Y = R.lane & -536870913;
        if (Y !== R.lane ? (Be & Y) === Y : (zl & Y) === Y) {
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
            }), Y === $a && (H = !0);
          else if ((zl & C) === C) {
            R = R.next, C === $a && (H = !0);
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
            }, w === null ? (y = w = Y, h = r) : w = w.next = Y, Ae.lanes |= C, ha |= C;
          Y = R.action, Za && n(r, Y), r = R.hasEagerState ? R.eagerState : n(r, Y);
        } else
          C = {
            lane: Y,
            revertLane: R.revertLane,
            gesture: R.gesture,
            action: R.action,
            hasEagerState: R.hasEagerState,
            eagerState: R.eagerState,
            next: null
          }, w === null ? (y = w = C, h = r) : w = w.next = C, Ae.lanes |= Y, ha |= Y;
        R = R.next;
      } while (R !== null && R !== t);
      if (w === null ? h = r : w.next = y, !bn(r, e.memoizedState) && (jt = !0, H && (n = Ti, n !== null)))
        throw n;
      e.memoizedState = r, e.baseState = h, e.baseQueue = w, l.lastRenderedState = r;
    }
    return i === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function qo(e) {
    var t = xt(), n = t.queue;
    if (n === null) throw Error(u(311));
    n.lastRenderedReducer = e;
    var l = n.dispatch, i = n.pending, r = t.memoizedState;
    if (i !== null) {
      n.pending = null;
      var h = i = i.next;
      do
        r = e(r, h.action), h = h.next;
      while (h !== i);
      bn(r, t.memoizedState) || (jt = !0), t.memoizedState = r, t.baseQueue === null && (t.baseState = r), n.lastRenderedState = r;
    }
    return [r, l];
  }
  function Mm(e, t, n) {
    var l = Ae, i = xt(), r = Re;
    if (r) {
      if (n === void 0) throw Error(u(407));
      n = n();
    } else n = t();
    var h = !bn(
      (et || i).memoizedState,
      n
    );
    if (h && (i.memoizedState = n, jt = !0), i = i.queue, Go(Lm.bind(null, l, i, e), [
      e
    ]), e = i.getSnapshot !== t || h || Nt !== null && (Nt.memoizedState.tag & 1) !== 0, Ci(
      e ? 9 : 8,
      { destroy: void 0 },
      zm.bind(null, l, i, n, t),
      null
    ), e) {
      if (l.flags |= 2048, nt === null) throw Error(u(349));
      r || (zl & 127) !== 0 || Dm(l, t, n);
    }
    return n;
  }
  function Dm(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Ae.updateQueue, t === null ? (t = br(), Ae.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function zm(e, t, n, l) {
    t.value = n, t.getSnapshot = l, Um(t) && Hm(e);
  }
  function Lm(e, t, n) {
    return n(function() {
      Um(t) && Hm(e);
    });
  }
  function Um(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !bn(e, n);
    } catch {
      return !0;
    }
  }
  function Hm(e) {
    var t = za(e, 2);
    t !== null && fn(t, e, 2);
  }
  function $o(e) {
    var t = Wt();
    if (typeof e == "function") {
      var n = e;
      if (e = n(), Za) {
        gn(!0);
        try {
          n();
        } finally {
          gn(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ll,
      lastRenderedState: e
    }, t;
  }
  function Bm(e, t, n, l) {
    return e.baseState = n, Bo(
      e,
      et,
      typeof l == "function" ? l : Ll
    );
  }
  function vb(e, t, n, l, i) {
    if (Er(e)) throw Error(u(485));
    if (e = t.action, e !== null) {
      var r = {
        payload: i,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(h) {
          r.listeners.push(h);
        }
      };
      ue.T !== null ? n(!0) : r.isTransition = !1, l(r), n = t.pending, n === null ? (r.next = t.pending = r, qm(t, r)) : (r.next = n.next, t.pending = n.next = r);
    }
  }
  function qm(e, t) {
    var n = t.action, l = t.payload, i = e.state;
    if (t.isTransition) {
      var r = ue.T, h = {};
      h.types = r !== null ? r.types : null, ue.T = h;
      try {
        var y = n(i, l), w = ue.S;
        w !== null && w(h, y), $m(e, t, y);
      } catch (R) {
        Yo(e, t, R);
      } finally {
        r !== null && h.types !== null && (r.types = h.types), ue.T = r;
      }
    } else
      try {
        r = n(i, l), $m(e, t, r);
      } catch (R) {
        Yo(e, t, R);
      }
  }
  function $m(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(l) {
        Ym(e, t, l);
      },
      function(l) {
        return Yo(e, t, l);
      }
    ) : Ym(e, t, n);
  }
  function Ym(e, t, n) {
    t.status = "fulfilled", t.value = n, Gm(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, qm(e, n)));
  }
  function Yo(e, t, n) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = n, Gm(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function Gm(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Vm(e, t) {
    return t;
  }
  function Xm(e, t) {
    if (Re) {
      var n = nt.formState;
      if (n !== null) {
        e: {
          var l = Ae;
          if (Re) {
            if (at) {
              t: {
                for (var i = at, r = zn; i.nodeType !== 8; ) {
                  if (!r) {
                    i = null;
                    break t;
                  }
                  if (i = Un(
                    i.nextSibling
                  ), i === null) {
                    i = null;
                    break t;
                  }
                }
                r = i.data, i = r === "F!" || r === "F" ? i : null;
              }
              if (i) {
                at = Un(
                  i.nextSibling
                ), l = i.data === "F!";
                break e;
              }
            }
            ta(l);
          }
          l = !1;
        }
        l && (t = n[0]);
      }
    }
    return n = Wt(), n.memoizedState = n.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Vm,
      lastRenderedState: t
    }, n.queue = l, n = op.bind(
      null,
      Ae,
      l
    ), l.dispatch = n, l = $o(!1), r = Ko.bind(
      null,
      Ae,
      !1,
      l.queue
    ), l = Wt(), i = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = i, n = vb.bind(
      null,
      Ae,
      i,
      r,
      n
    ), i.dispatch = n, l.memoizedState = e, [t, n, !1];
  }
  function Zm(e) {
    var t = xt();
    return Qm(t, et, e);
  }
  function Qm(e, t, n) {
    if (t = Bo(
      e,
      t,
      Vm
    )[0], e = Sr(Ll)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = Ks(t);
      } catch (h) {
        throw h === wi ? fr : h;
      }
    else l = t;
    t = xt();
    var i = t.queue, r = i.dispatch;
    return n !== t.memoizedState && (Ae.flags |= 2048, Ci(
      9,
      { destroy: void 0 },
      bb.bind(null, i, n),
      null
    )), [l, r, e];
  }
  function bb(e, t) {
    e.action = t;
  }
  function Km(e) {
    var t = xt(), n = et;
    if (n !== null)
      return Qm(t, n, e);
    xt(), t = t.memoizedState, n = xt();
    var l = n.queue.dispatch;
    return n.memoizedState = e, [t, l, !1];
  }
  function Ci(e, t, n, l) {
    return e = { tag: e, create: n, deps: l, inst: t, next: null }, t = Ae.updateQueue, t === null && (t = br(), Ae.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (l = n.next, n.next = e, e.next = l, t.lastEffect = e), e;
  }
  function Im() {
    return xt().memoizedState;
  }
  function Nr(e, t, n, l) {
    var i = Wt();
    Ae.flags |= e, i.memoizedState = Ci(
      1 | t,
      { destroy: void 0 },
      n,
      l === void 0 ? null : l
    );
  }
  function jr(e, t, n, l) {
    var i = xt();
    l = l === void 0 ? null : l;
    var r = i.memoizedState.inst;
    et !== null && l !== null && Mo(l, et.memoizedState.deps) ? i.memoizedState = Ci(t, r, n, l) : (Ae.flags |= e, i.memoizedState = Ci(
      1 | t,
      r,
      n,
      l
    ));
  }
  function Jm(e, t) {
    Nr(8390656, 8, e, t);
  }
  function Go(e, t) {
    jr(2048, 8, e, t);
  }
  function xb(e) {
    Ae.flags |= 4;
    var t = Ae.updateQueue;
    if (t === null)
      t = br(), Ae.updateQueue = t, t.events = [e];
    else {
      var n = t.events;
      n === null ? t.events = [e] : n.push(e);
    }
  }
  function Fm(e) {
    var t = xt().memoizedState;
    return xb({ ref: t, nextImpl: e }), function() {
      if ((Ze & 2) !== 0) throw Error(u(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Pm(e, t) {
    return jr(4, 2, e, t);
  }
  function Wm(e, t) {
    return jr(4, 4, e, t);
  }
  function ep(e, t) {
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
  function tp(e, t, n) {
    n = n != null ? n.concat([e]) : null, jr(4, 4, ep.bind(null, t, e), n);
  }
  function Vo() {
  }
  function np(e, t) {
    var n = xt();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    return t !== null && Mo(t, l[1]) ? l[0] : (n.memoizedState = [e, t], e);
  }
  function lp(e, t) {
    var n = xt();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    if (t !== null && Mo(t, l[1]))
      return l[0];
    if (l = e(), Za) {
      gn(!0);
      try {
        e();
      } finally {
        gn(!1);
      }
    }
    return n.memoizedState = [l, t], l;
  }
  function Xo(e, t, n) {
    return n === void 0 || (zl & 1073741824) !== 0 && (Be & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = hg(), Ae.lanes |= e, ha |= e, n);
  }
  function ap(e, t, n, l) {
    return bn(n, t) ? n : ca.current !== null ? (e = Xo(e, n, l), bn(e, t) || (jt = !0), e) : (zl & 106) === 0 || (zl & 1073741824) !== 0 && (Be & 261930) === 0 ? (jt = !0, e.memoizedState = n) : (e = hg(), Ae.lanes |= e, ha |= e, t);
  }
  function ip(e, t, n, l, i) {
    var r = Se.p;
    Se.p = r !== 0 && 8 > r ? r : 8;
    var h = ue.T, y = {};
    y.types = h !== null ? h.types : null, ue.T = y, Ko(e, !1, t, n);
    try {
      var w = i(), R = ue.S;
      if (R !== null && R(y, w), w !== null && typeof w == "object" && typeof w.then == "function") {
        var H = pb(
          w,
          l
        );
        Is(
          e,
          t,
          H,
          En(e)
        );
      } else
        Is(
          e,
          t,
          l,
          En(e)
        );
    } catch (Y) {
      Is(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: Y },
        En()
      );
    } finally {
      Se.p = r, h !== null && y.types !== null && (h.types = y.types), ue.T = h;
    }
  }
  function Sb() {
  }
  function Zo(e, t, n, l) {
    if (e.tag !== 5) throw Error(u(476));
    var i = sp(e).queue;
    ip(
      e,
      i,
      t,
      Dt,
      n === null ? Sb : function() {
        return cp(e), n(l);
      }
    );
  }
  function sp(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: Dt,
      baseState: Dt,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ll,
        lastRenderedState: Dt
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
        lastRenderedReducer: Ll,
        lastRenderedState: n
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function cp(e) {
    var t = sp(e);
    t.next === null && (t = e.alternate.memoizedState), Is(
      e,
      t.next.queue,
      {},
      En()
    );
  }
  function Qo() {
    return Ht(Ii);
  }
  function rp() {
    return xt().memoizedState;
  }
  function up() {
    return xt().memoizedState;
  }
  function Nb(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = En();
          e = ia(n);
          var l = sa(t, e, n);
          l !== null && (fn(l, t, n), Gs(l, t, n)), t = { cache: So() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function jb(e, t, n) {
    var l = En();
    n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Er(e) ? fp(t, n) : (n = fo(e, t, n, l), n !== null && (fn(n, e, l), dp(n, t, l)));
  }
  function op(e, t, n) {
    var l = En();
    Is(e, t, n, l);
  }
  function Is(e, t, n, l) {
    var i = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Er(e)) fp(t, i);
    else {
      var r = e.alternate;
      if (e.lanes === 0 && (r === null || r.lanes === 0) && (r = t.lastRenderedReducer, r !== null))
        try {
          var h = t.lastRenderedState, y = r(h, n);
          if (i.hasEagerState = !0, i.eagerState = y, bn(y, h))
            return tr(e, t, i, 0), nt === null && er(), !1;
        } catch {
        } finally {
        }
      if (n = fo(e, t, i, l), n !== null)
        return fn(n, e, l), dp(n, t, l), !0;
    }
    return !1;
  }
  function Ko(e, t, n, l) {
    if (l = {
      lane: 2,
      revertLane: Bf(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Er(e)) {
      if (t) throw Error(u(479));
    } else
      t = fo(
        e,
        n,
        l,
        2
      ), t !== null && fn(t, e, 2);
  }
  function Er(e) {
    var t = e.alternate;
    return e === Ae || t !== null && t === Ae;
  }
  function fp(e, t) {
    Ai = yr = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function dp(e, t, n) {
    if ((n & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, n |= l, t.lanes = n, oi(e, n);
    }
  }
  var Tr = {
    readContext: Ht,
    use: xr,
    useCallback: gt,
    useContext: gt,
    useEffect: gt,
    useImperativeHandle: gt,
    useLayoutEffect: gt,
    useInsertionEffect: gt,
    useMemo: gt,
    useReducer: gt,
    useRef: gt,
    useState: gt,
    useDebugValue: gt,
    useDeferredValue: gt,
    useTransition: gt,
    useSyncExternalStore: gt,
    useId: gt,
    useHostTransitionStatus: gt,
    useFormState: gt,
    useActionState: gt,
    useOptimistic: gt,
    useMemoCache: gt,
    useCacheRefresh: gt,
    useEffectEvent: gt
  }, hp = {
    readContext: Ht,
    use: xr,
    useCallback: function(e, t) {
      return Wt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Ht,
    useEffect: Jm,
    useImperativeHandle: function(e, t, n) {
      n = n != null ? n.concat([e]) : null, Nr(
        4194308,
        4,
        ep.bind(null, t, e),
        n
      );
    },
    useLayoutEffect: function(e, t) {
      return Nr(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Nr(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var n = Wt();
      t = t === void 0 ? null : t;
      var l = e();
      if (Za) {
        gn(!0);
        try {
          e();
        } finally {
          gn(!1);
        }
      }
      return n.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, n) {
      var l = Wt();
      if (n !== void 0) {
        var i = n(t);
        if (Za) {
          gn(!0);
          try {
            n(t);
          } finally {
            gn(!1);
          }
        }
      } else i = t;
      return l.memoizedState = l.baseState = i, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: i
      }, l.queue = e, e = e.dispatch = jb.bind(
        null,
        Ae,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = Wt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = $o(e);
      var t = e.queue, n = op.bind(null, Ae, t);
      return t.dispatch = n, [e.memoizedState, n];
    },
    useDebugValue: Vo,
    useDeferredValue: function(e, t) {
      var n = Wt();
      return Xo(n, e, t);
    },
    useTransition: function() {
      var e = $o(!1);
      return e = ip.bind(
        null,
        Ae,
        e.queue,
        !0,
        !1
      ), Wt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, n) {
      var l = Ae, i = Wt();
      if (Re) {
        if (n === void 0)
          throw Error(u(407));
        n = n();
      } else {
        if (n = t(), nt === null)
          throw Error(u(349));
        (Be & 127) !== 0 || Dm(l, t, n);
      }
      i.memoizedState = n;
      var r = { value: n, getSnapshot: t };
      return i.queue = r, Jm(Lm.bind(null, l, r, e), [
        e
      ]), l.flags |= 2048, Ci(
        9,
        { destroy: void 0 },
        zm.bind(
          null,
          l,
          r,
          n,
          t
        ),
        null
      ), n;
    },
    useId: function() {
      var e = Wt(), t = nt.identifierPrefix;
      if (Re) {
        var n = ol, l = ul;
        n = (l & ~(1 << 32 - ft(l) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = vr++, 0 < n && (t += "H" + n.toString(32)), t += "_";
      } else
        n = gb++, t = "_" + t + "r_" + n.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Qo,
    useFormState: Xm,
    useActionState: Xm,
    useOptimistic: function(e) {
      var t = Wt();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = n, t = Ko.bind(
        null,
        Ae,
        !0,
        n
      ), n.dispatch = t, [e, t];
    },
    useMemoCache: Ho,
    useCacheRefresh: function() {
      return Wt().memoizedState = Nb.bind(
        null,
        Ae
      );
    },
    useEffectEvent: function(e) {
      var t = Wt(), n = { impl: e };
      return t.memoizedState = n, function() {
        if ((Ze & 2) !== 0)
          throw Error(u(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, mp = {
    readContext: Ht,
    use: xr,
    useCallback: np,
    useContext: Ht,
    useEffect: Go,
    useImperativeHandle: tp,
    useInsertionEffect: Pm,
    useLayoutEffect: Wm,
    useMemo: lp,
    useReducer: Sr,
    useRef: Im,
    useState: function() {
      return Sr(Ll);
    },
    useDebugValue: Vo,
    useDeferredValue: function(e, t) {
      var n = xt();
      return ap(
        n,
        et.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Sr(Ll)[0], t = xt().memoizedState;
      return [
        typeof e == "boolean" ? e : Ks(e),
        t
      ];
    },
    useSyncExternalStore: Mm,
    useId: rp,
    useHostTransitionStatus: Qo,
    useFormState: Zm,
    useActionState: Zm,
    useOptimistic: function(e, t) {
      var n = xt();
      return Bm(n, et, e, t);
    },
    useMemoCache: Ho,
    useCacheRefresh: up,
    useEffectEvent: Fm
  }, Eb = {
    readContext: Ht,
    use: xr,
    useCallback: np,
    useContext: Ht,
    useEffect: Go,
    useImperativeHandle: tp,
    useInsertionEffect: Pm,
    useLayoutEffect: Wm,
    useMemo: lp,
    useReducer: qo,
    useRef: Im,
    useState: function() {
      return qo(Ll);
    },
    useDebugValue: Vo,
    useDeferredValue: function(e, t) {
      var n = xt();
      return et === null ? Xo(n, e, t) : ap(
        n,
        et.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = qo(Ll)[0], t = xt().memoizedState;
      return [
        typeof e == "boolean" ? e : Ks(e),
        t
      ];
    },
    useSyncExternalStore: Mm,
    useId: rp,
    useHostTransitionStatus: Qo,
    useFormState: Km,
    useActionState: Km,
    useOptimistic: function(e, t) {
      var n = xt();
      return et !== null ? Bm(n, et, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    },
    useMemoCache: Ho,
    useCacheRefresh: up,
    useEffectEvent: Fm
  };
  function Io(e, t, n, l) {
    t = e.memoizedState, n = n(l, t), n = n == null ? t : G({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var Jo = {
    enqueueSetState: function(e, t, n) {
      e = e._reactInternals;
      var l = En(), i = ia(l);
      i.payload = t, n != null && (i.callback = n), t = sa(e, i, l), t !== null && (fn(t, e, l), Gs(t, e, l));
    },
    enqueueReplaceState: function(e, t, n) {
      e = e._reactInternals;
      var l = En(), i = ia(l);
      i.tag = 1, i.payload = t, n != null && (i.callback = n), t = sa(e, i, l), t !== null && (fn(t, e, l), Gs(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var n = En(), l = ia(n);
      l.tag = 2, t != null && (l.callback = t), t = sa(e, l, n), t !== null && (fn(t, e, n), Gs(t, e, n));
    }
  };
  function pp(e, t, n, l, i, r, h) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, r, h) : t.prototype && t.prototype.isPureReactComponent ? !zs(n, l) || !zs(i, r) : !0;
  }
  function gp(e, t, n, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, l), t.state !== e && Jo.enqueueReplaceState(t, t.state, null);
  }
  function Qa(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var l in t)
        l !== "ref" && (n[l] = t[l]);
    }
    if (e = e.defaultProps) {
      n === t && (n = G({}, n));
      for (var i in e)
        n[i] === void 0 && (n[i] = e[i]);
    }
    return n;
  }
  function yp(e) {
    Wc(e);
  }
  function vp(e) {
    console.error(e);
  }
  function bp(e) {
    Wc(e);
  }
  function wr(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function xp(e, t, n) {
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
  function Fo(e, t, n) {
    return n = ia(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      wr(e, t);
    }, n;
  }
  function Sp(e) {
    return e = ia(e), e.tag = 3, e;
  }
  function Np(e, t, n, l) {
    var i = n.type.getDerivedStateFromError;
    if (typeof i == "function") {
      var r = l.value;
      e.payload = function() {
        return i(r);
      }, e.callback = function() {
        xp(t, n, l);
      };
    }
    var h = n.stateNode;
    h !== null && typeof h.componentDidCatch == "function" && (e.callback = function() {
      xp(t, n, l), typeof i != "function" && (ma === null ? ma = /* @__PURE__ */ new Set([this]) : ma.add(this));
      var y = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: y !== null ? y : ""
      });
    });
  }
  function Tb(e, t, n, l, i) {
    if (n.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = n.alternate, t !== null && Ba(
        t,
        n,
        i,
        !0
      ), n = Bt.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
          case 19:
            return Zt === null ? Qr() : n.alternate === null && yt === 0 && (yt = 3), n.flags &= -257, n.flags |= 65536, n.lanes = i, l === dr ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), Lf(e, l, i)), !1;
          case 22:
            return n.flags |= 65536, l === dr ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : n.add(l)), Lf(e, l, i)), !1;
        }
        throw Error(u(435, n.tag));
      }
      return Lf(e, l, i), Qr(), !1;
    }
    if (Re)
      return t = Bt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = i, l !== yo && (e = Error(u(422), { cause: l }), Hs(Rn(e, n)))) : (l !== yo && (t = Error(u(423), {
        cause: l
      }), Hs(
        Rn(t, n)
      )), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, l = Rn(l, n), i = Fo(
        e.stateNode,
        l,
        i
      ), ko(e, i), yt !== 4 && (yt = 2)), !1;
    var r = Error(u(520), { cause: l });
    if (r = Rn(r, n), lc === null ? lc = [r] : lc.push(r), yt !== 4 && (yt = 2), t === null) return !0;
    l = Rn(l, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = i & -i, n.lanes |= e, e = Fo(n.stateNode, l, e), ko(n, e), !1;
        case 1:
          if (t = n.type, r = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || r !== null && typeof r.componentDidCatch == "function" && (ma === null || !ma.has(r))))
            return n.flags |= 65536, i &= -i, n.lanes |= i, i = Sp(i), Np(
              i,
              e,
              n,
              l
            ), ko(n, i), !1;
          break;
        case 22:
          if (n.memoizedState !== null)
            return n.flags |= 65536, !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Po = Error(u(461)), jt = !1;
  function wt(e, t, n, l) {
    t.child = e === null ? wm(t, null, n, l) : Xa(
      t,
      e.child,
      n,
      l
    );
  }
  function jp(e, t, n, l, i) {
    n = n.render;
    var r = t.ref;
    if ("ref" in l) {
      var h = {};
      for (var y in l)
        y !== "ref" && (h[y] = l[y]);
    } else h = l;
    return qa(t), l = Do(
      e,
      t,
      n,
      h,
      r,
      i
    ), y = zo(), e !== null && !jt ? (Lo(e, t, i), Ul(e, t, i)) : (Re && y && ir(t), t.flags |= 1, wt(e, t, l, i), t.child);
  }
  function Ep(e, t, n, l, i) {
    if (e === null) {
      var r = n.type;
      return typeof r == "function" && !ho(r) && r.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = r, Tp(
        e,
        t,
        r,
        l,
        i
      )) : (e = lr(
        n.type,
        null,
        l,
        t,
        t.mode,
        i
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (r = e.child, !cf(e, i)) {
      var h = r.memoizedProps;
      if (n = n.compare, n = n !== null ? n : zs, n(h, l) && e.ref === t.ref)
        return Ul(e, t, i);
    }
    return t.flags |= 1, e = Ol(r, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Tp(e, t, n, l, i) {
    if (e !== null) {
      var r = e.memoizedProps;
      if (zs(r, l) && e.ref === t.ref)
        if (jt = !1, t.pendingProps = l = r, cf(e, i))
          (e.flags & 131072) !== 0 && (jt = !0);
        else
          return t.lanes = e.lanes, Ul(e, t, i);
    }
    return Wo(
      e,
      t,
      n,
      l,
      i
    );
  }
  function wp(e, t, n, l) {
    var i = l.children, r = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (r = r !== null ? r.baseLanes | n : n, e !== null) {
          for (l = t.child = e.child, i = 0; l !== null; )
            i = i | l.lanes | l.childLanes, l = l.sibling;
          l = i & ~r;
        } else l = 0, t.child = null;
        return kp(
          e,
          t,
          r,
          n,
          l
        );
      }
      if ((n & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && or(
          t,
          r !== null ? r.cachePool : null
        ), r !== null ? _m(t, r) : _o(), Cm(t);
      else
        return l = t.lanes = 536870912, kp(
          e,
          t,
          r !== null ? r.baseLanes | n : n,
          n,
          l
        );
    } else
      r !== null ? (or(t, r.cachePool), _m(t, r), ua(), t.memoizedState = null) : (e !== null && or(t, null), _o(), ua());
    return wt(e, t, i, n), t.child;
  }
  function Js(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function kp(e, t, n, l, i) {
    var r = jo();
    return r = r === null ? null : { parent: St._currentValue, pool: r }, t.memoizedState = {
      baseLanes: n,
      cachePool: r
    }, e !== null && or(t, null), _o(), Cm(t), e !== null && Ba(e, t, l, !0), t.childLanes = i, null;
  }
  function kr(e, t) {
    return t = Ar(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Ap(e, t, n) {
    return Xa(t, e.child, null, n), e = kr(t, t.pendingProps), e.flags |= 2, xn(t), t.memoizedState = null, e;
  }
  function wb(e, t, n) {
    var l = t.pendingProps, i = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Re) {
        if (l.mode === "hidden")
          return e = kr(t, l), t.lanes = 536870912, e.memoizedState = { baseLanes: 0, cachePool: null }, Js(null, e);
        if (Oo(t), (e = at) ? (e = e0(
          e,
          zn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Wl !== null ? { id: ul, overflow: ol } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = fm(e), n.return = t, t.child = n, _t = t, at = null)) : e = null, e === null) throw ta(t);
        return t.lanes = 536870912, null;
      }
      return kr(t, l);
    }
    var r = e.memoizedState;
    if (r !== null) {
      var h = r.dehydrated;
      if (Oo(t), i)
        if (t.flags & 256)
          t.flags &= -257, t = Ap(
            e,
            t,
            n
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(u(558));
      else if (jt || Ba(e, t, n, !1), i = (n & e.childLanes) !== 0, jt || i) {
        if (ca.current === null) {
          if (l = nt, l !== null && (h = js(l, n), h !== 0 && h !== r.retryLane))
            throw r.retryLane = h, za(e, h), fn(l, e, h), Po;
          Qr();
        }
        t = Ap(
          e,
          t,
          n
        );
      } else
        e = r.treeContext, at = Un(h.nextSibling), _t = t, Re = !0, ea = null, zn = !1, e !== null && mm(t, e), t = kr(t, l), t.flags |= 134221824;
      return t;
    }
    return e = Ol(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Oi(e, t) {
    var n = t.ref;
    if (n === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(u(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function Wo(e, t, n, l, i) {
    return qa(t), n = Do(
      e,
      t,
      n,
      l,
      void 0,
      i
    ), l = zo(), e !== null && !jt ? (Lo(e, t, i), Ul(e, t, i)) : (Re && l && ir(t), t.flags |= 1, wt(e, t, n, i), t.child);
  }
  function _p(e, t, n, l, i, r) {
    return qa(t), t.updateQueue = null, n = Rm(
      t,
      l,
      n,
      i
    ), Om(e), l = zo(), e !== null && !jt ? (Lo(e, t, r), Ul(e, t, r)) : (Re && l && ir(t), t.flags |= 1, wt(e, t, n, r), t.child);
  }
  function Cp(e, t, n, l, i) {
    if (qa(t), t.stateNode === null) {
      var r = Si, h = n.contextType;
      typeof h == "object" && h !== null && (r = Ht(h)), r = new n(l, r), t.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = Jo, t.stateNode = r, r._reactInternals = t, r = t.stateNode, r.props = l, r.state = t.memoizedState, r.refs = {}, To(t), h = n.contextType, r.context = typeof h == "object" && h !== null ? Ht(h) : Si, r.state = t.memoizedState, h = n.getDerivedStateFromProps, typeof h == "function" && (Io(
        t,
        n,
        h,
        l
      ), r.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof r.getSnapshotBeforeUpdate == "function" || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (h = r.state, typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount(), h !== r.state && Jo.enqueueReplaceState(r, r.state, null), Xs(t, l, r, i), Vs(), r.state = t.memoizedState), typeof r.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      r = t.stateNode;
      var y = t.memoizedProps, w = Qa(n, y);
      r.props = w;
      var R = r.context, H = n.contextType;
      h = Si, typeof H == "object" && H !== null && (h = Ht(H));
      var Y = n.getDerivedStateFromProps;
      H = typeof Y == "function" || typeof r.getSnapshotBeforeUpdate == "function", y = t.pendingProps !== y, H || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (y || R !== h) && gp(
        t,
        r,
        l,
        h
      ), aa = !1;
      var C = t.memoizedState;
      r.state = C, Xs(t, l, r, i), Vs(), R = t.memoizedState, y || C !== R || aa ? (typeof Y == "function" && (Io(
        t,
        n,
        Y,
        l
      ), R = t.memoizedState), (w = aa || pp(
        t,
        n,
        w,
        l,
        C,
        R,
        h
      )) ? (H || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof r.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = R), r.props = l, r.state = R, r.context = h, l = w) : (typeof r.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      r = t.stateNode, wo(e, t), h = t.memoizedProps, H = Qa(n, h), r.props = H, Y = t.pendingProps, C = r.context, R = n.contextType, w = Si, typeof R == "object" && R !== null && (w = Ht(R)), y = n.getDerivedStateFromProps, (R = typeof y == "function" || typeof r.getSnapshotBeforeUpdate == "function") || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (h !== Y || C !== w) && gp(
        t,
        r,
        l,
        w
      ), aa = !1, C = t.memoizedState, r.state = C, Xs(t, l, r, i), Vs();
      var z = t.memoizedState;
      h !== Y || C !== z || aa || e !== null && e.dependencies !== null && rr(e.dependencies) ? (typeof y == "function" && (Io(
        t,
        n,
        y,
        l
      ), z = t.memoizedState), (H = aa || pp(
        t,
        n,
        H,
        l,
        C,
        z,
        w
      ) || e !== null && e.dependencies !== null && rr(e.dependencies)) ? (R || typeof r.UNSAFE_componentWillUpdate != "function" && typeof r.componentWillUpdate != "function" || (typeof r.componentWillUpdate == "function" && r.componentWillUpdate(l, z, w), typeof r.UNSAFE_componentWillUpdate == "function" && r.UNSAFE_componentWillUpdate(
        l,
        z,
        w
      )), typeof r.componentDidUpdate == "function" && (t.flags |= 4), typeof r.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof r.componentDidUpdate != "function" || h === e.memoizedProps && C === e.memoizedState || (t.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || h === e.memoizedProps && C === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = z), r.props = l, r.state = z, r.context = w, l = H) : (typeof r.componentDidUpdate != "function" || h === e.memoizedProps && C === e.memoizedState || (t.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || h === e.memoizedProps && C === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return r = l, Oi(e, t), l = (t.flags & 128) !== 0, r || l ? (r = t.stateNode, n = l && typeof n.getDerivedStateFromError != "function" ? null : r.render(), t.flags |= 1, e !== null && l ? (t.child = Xa(
      t,
      e.child,
      null,
      i
    ), t.child = Xa(
      t,
      null,
      n,
      i
    )) : wt(e, t, n, i), t.memoizedState = r.state, e = t.child) : e = Ul(
      e,
      t,
      i
    ), e;
  }
  function Op(e, t, n, l) {
    return Ua(), t.flags |= 256, wt(e, t, n, l), t.child;
  }
  var ef = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function tf(e) {
    return { baseLanes: e, cachePool: xm() };
  }
  function nf(e, t, n) {
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= jn), e;
  }
  function Rp(e, t, n) {
    var l = t.pendingProps, i = !1, r = (t.flags & 128) !== 0, h;
    if ((h = r) || (h = e !== null && e.memoizedState === null ? !1 : (qt.current & 2) !== 0), h && (i = !0, t.flags &= -129), h = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Re) {
        if (i ? ra(t) : ua(), (e = at) ? (e = e0(
          e,
          zn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Wl !== null ? { id: ul, overflow: ol } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = fm(e), n.return = t, t.child = n, _t = t, at = null)) : e = null, e === null) throw ta(t);
        return nd(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      return r = l.children, l = l.fallback, i ? (ua(), i = t.mode, r = Ar(
        { mode: "hidden", children: r },
        i
      ), l = La(
        l,
        i,
        n,
        null
      ), r.return = t, l.return = t, r.sibling = l, t.child = r, l = t.child, l.memoizedState = tf(n), l.childLanes = nf(
        e,
        h,
        n
      ), t.memoizedState = ef, Js(null, l)) : (ra(t), lf(t, r));
    }
    var y = e.memoizedState;
    if (y !== null) {
      var w = y.dehydrated;
      if (w !== null)
        return kb(
          e,
          t,
          r,
          h,
          l,
          w,
          y,
          n
        );
    }
    return i ? (ua(), i = l.fallback, r = t.mode, y = e.child, w = y.sibling, l = Ol(y, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = y.subtreeFlags & 1206910976, w !== null ? i = Ol(w, i) : (i = La(
      i,
      r,
      n,
      null
    ), i.flags |= 2), i.return = t, l.return = t, l.sibling = i, t.child = l, Js(null, l), l = t.child, i = e.child.memoizedState, i === null ? i = tf(n) : (r = i.cachePool, r !== null ? (y = St._currentValue, r = r.parent !== y ? { parent: y, pool: y } : r) : r = xm(), i = {
      baseLanes: i.baseLanes | n,
      cachePool: r
    }), l.memoizedState = i, l.childLanes = nf(
      e,
      h,
      n
    ), t.memoizedState = ef, Js(e.child, l)) : (ra(t), n = e.child, e = n.sibling, n = Ol(n, {
      mode: "visible",
      children: l.children
    }), n.return = t, n.sibling = null, e !== null && (h = t.deletions, h === null ? (t.deletions = [e], t.flags |= 16) : h.push(e)), t.child = n, t.memoizedState = null, n);
  }
  function lf(e, t) {
    return t = Ar(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Ar(e, t) {
    return e = cn(22, e, null, t), e.lanes = 0, e;
  }
  function _r(e, t, n) {
    return Xa(t, e.child, null, n), e = lf(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function kb(e, t, n, l, i, r, h, y) {
    if (n)
      return t.flags & 256 ? (ra(t), t.flags &= -257, _r(
        e,
        t,
        y
      )) : t.memoizedState !== null ? (ua(), t.child = e.child, t.flags |= 128, null) : (ua(), r = i.fallback, h = t.mode, i = Ar(
        { mode: "visible", children: i.children },
        h
      ), r = La(
        r,
        h,
        y,
        null
      ), r.flags |= 2, i.return = t, r.return = t, i.sibling = r, t.child = i, Xa(t, e.child, null, y), i = t.child, i.memoizedState = tf(y), i.childLanes = nf(
        e,
        l,
        y
      ), t.memoizedState = ef, Js(null, i));
    if (ra(t), nd(r)) {
      if (l = r.nextSibling && r.nextSibling.dataset, l) var w = l.dgst;
      return l = w, l !== "" && (i = Error(u(419)), i.stack = "", i.digest = l, Hs({ value: i, source: null, stack: null })), _r(
        e,
        t,
        y
      );
    }
    if (jt || Ba(e, t, y, !1), l = (y & e.childLanes) !== 0, jt || l) {
      if (ca.current !== null)
        return _r(
          e,
          t,
          y
        );
      if (l = nt, l !== null && (i = js(
        l,
        y
      ), i !== 0 && i !== h.retryLane))
        throw h.retryLane = i, za(e, i), fn(l, e, i), Po;
      return td(r) || Qr(), _r(
        e,
        t,
        y
      );
    }
    return td(r) ? (t.flags |= 192, t.child = e.child, null) : (e = h.treeContext, at = Un(r.nextSibling), _t = t, Re = !0, ea = null, zn = !1, e !== null && mm(t, e), t = lf(
      t,
      i.children
    ), t.flags |= 134221824, t);
  }
  function Mp(e, t, n) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), cr(e.return, t, n);
  }
  function Dp(e) {
    for (var t = null; e !== null; ) {
      var n = e.alternate;
      n !== null && gr(n) === null && (t = e), e = e.sibling;
    }
    return t;
  }
  function Cr(e, t, n, l, i, r) {
    var h = e.memoizedState;
    h === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: n,
      tailMode: i,
      treeForkCount: r
    } : (h.isBackwards = t, h.rendering = null, h.renderingStartTime = 0, h.last = l, h.tail = n, h.tailMode = i, h.treeForkCount = r);
  }
  function af(e) {
    var t = e.child;
    for (e.child = null; t !== null; ) {
      var n = t.sibling;
      t.sibling = e.child, e.child = t, t = n;
    }
  }
  function sf(e, t, n) {
    var l = t.pendingProps, i = l.revealOrder, r = l.tail;
    l = l.children;
    var h = qt.current;
    if (t.flags & 128)
      return Zs(t, h), null;
    var y = (h & 2) !== 0;
    if (y ? (h = h & 1 | 2, t.flags |= 128) : h &= 1, Zs(t, h), i === "backwards" && e !== null ? (af(e), wt(e, t, l, n), af(e)) : wt(e, t, l, n), l = Re ? Us : 0, !y && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Mp(e, n, t);
        else if (e.tag === 19)
          Mp(e, n, t);
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
        n = Dp(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null, af(t)), Cr(
          t,
          !0,
          i,
          null,
          r,
          l
        );
        break;
      case "unstable_legacy-backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (e = i.alternate, e !== null && gr(e) === null) {
            t.child = i;
            break;
          }
          e = i.sibling, i.sibling = n, n = i, i = e;
        }
        Cr(
          t,
          !0,
          n,
          null,
          r,
          l
        );
        break;
      case "together":
        Cr(
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
        n = Dp(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Cr(
          t,
          !1,
          i,
          n,
          r,
          l
        );
    }
    return t.child;
  }
  function zp(e, t, n) {
    var l = t.pendingProps;
    return na(t, t.type, l.value), wt(e, t, l.children, n), t.child;
  }
  function Ul(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), ha |= t.lanes, (n & t.childLanes) === 0)
      if (e !== null) {
        if (Ba(
          e,
          t,
          n,
          !1
        ), (n & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(u(153));
    if (t.child !== null) {
      for (e = t.child, n = Ol(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        e = e.sibling, n = n.sibling = Ol(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function cf(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && rr(e)));
  }
  function Ab(e, t, n) {
    switch (t.tag) {
      case 3:
        Yn(t, t.stateNode.containerInfo), na(t, St, e.memoizedState.cache), Ua();
        break;
      case 27:
      case 5:
        jl(t);
        break;
      case 4:
        Yn(t, t.stateNode.containerInfo);
        break;
      case 10:
        na(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Oo(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null) {
          if (l.dehydrated !== null)
            return ra(t), t.flags |= 128, null;
          l = Ba(
            e,
            t,
            n,
            !1
          );
          var i = t.child.childLanes;
          return l || (n & i) !== 0 ? Rp(e, t, n) : (ra(t), e = Ul(
            e,
            t,
            n
          ), e !== null ? e.sibling : null);
        }
        ra(t);
        break;
      case 19:
        if (t.flags & 128)
          return sf(
            e,
            t,
            n
          );
        if (i = (e.flags & 128) !== 0, l = (n & t.childLanes) !== 0, l || (Ba(
          e,
          t,
          n,
          !1
        ), l = (n & t.childLanes) !== 0), i) {
          if (l)
            return sf(
              e,
              t,
              n
            );
          t.flags |= 128;
        }
        if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), Zs(t, qt.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, wp(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        na(t, St, e.memoizedState.cache);
    }
    return Ul(e, t, n);
  }
  function Lp(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        jt = !0;
      else {
        if (!cf(e, n) && (t.flags & 128) === 0)
          return jt = !1, Ab(
            e,
            t,
            n
          );
        jt = (e.flags & 131072) !== 0;
      }
    else
      jt = !1, Re && (t.flags & 1048576) !== 0 && hm(t, Us, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = Ga(t.elementType), t.type = e, typeof e == "function")
            ho(e) ? (l = Qa(e, l), t.tag = 1, t = Cp(
              null,
              t,
              e,
              l,
              n
            )) : (t.tag = 0, t = Wo(
              null,
              t,
              e,
              l,
              n
            ));
          else {
            if (e != null) {
              var i = e.$$typeof;
              if (i === J) {
                t.tag = 11, t = jp(
                  null,
                  t,
                  e,
                  l,
                  n
                );
                break e;
              } else if (i === Ue) {
                t.tag = 14, t = Ep(
                  null,
                  t,
                  e,
                  l,
                  n
                );
                break e;
              } else if (i === he) {
                t.tag = 10, t.type = e, t = zp(
                  null,
                  t,
                  n
                );
                break e;
              }
            }
            throw t = Me(e) || e, Error(u(306, t, ""));
          }
        }
        return t;
      case 0:
        return Wo(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 1:
        return l = t.type, i = Qa(
          l,
          t.pendingProps
        ), Cp(
          e,
          t,
          l,
          i,
          n
        );
      case 3:
        e: {
          if (Yn(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(u(387));
          l = t.pendingProps;
          var r = t.memoizedState;
          i = r.element, wo(e, t), Xs(t, l, null, n);
          var h = t.memoizedState;
          if (l = h.cache, na(t, St, l), l !== r.cache && xo(
            t,
            [St],
            n,
            !0
          ), Vs(), l = h.element, r.isDehydrated)
            if (r = {
              element: l,
              isDehydrated: !1,
              cache: h.cache
            }, t.updateQueue.baseState = r, t.memoizedState = r, t.flags & 256) {
              t = Op(
                e,
                t,
                l,
                n
              );
              break e;
            } else if (l !== i) {
              i = Rn(
                Error(u(424)),
                t
              ), Hs(i), t = Op(
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
              for (at = Un(e.firstChild), _t = t, Re = !0, ea = null, zn = !0, n = wm(
                t,
                null,
                l,
                n
              ), t.child = n; n; )
                n.flags = n.flags & -3 | 134221824, n = n.sibling;
            }
          else {
            if (Ua(), l === i) {
              t = Ul(
                e,
                t,
                n
              );
              break e;
            }
            wt(e, t, l, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Oi(e, t), e === null ? (n = c0(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = n : Re || (t.stateNode = qg(
          t.type,
          t.pendingProps,
          ln.current,
          t
        )) : t.memoizedState = c0(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return jl(t), e === null && Re && (l = t.stateNode = l0(
          t.type,
          t.pendingProps,
          ln.current
        ), _t = t, zn = !0, i = at, ya(t.type) ? (ld = i, at = Un(l.firstChild)) : at = i), wt(
          e,
          t,
          t.pendingProps.children,
          n
        ), Oi(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Re && ((i = l = at) && (l = Nx(
          l,
          t.type,
          t.pendingProps,
          zn
        ), l !== null ? (t.stateNode = l, _t = t, at = Un(l.firstChild), zn = !1, i = !0) : i = !1), i || ta(t)), jl(t), i = t.type, r = t.pendingProps, h = e !== null ? e.memoizedProps : null, l = r.children, Kf(i, r) ? l = null : h !== null && Kf(i, h) && (t.flags |= 32), t.memoizedState !== null && (i = Do(
          e,
          t,
          yb,
          null,
          null,
          n
        ), Ii._currentValue = i), Oi(e, t), wt(e, t, l, n), t.child;
      case 6:
        return e === null && Re && ((e = n = at) && (n = jx(
          n,
          t.pendingProps,
          zn
        ), n !== null ? (t.stateNode = n, _t = t, at = null, e = !0) : e = !1), e || ta(t)), null;
      case 13:
        return Rp(e, t, n);
      case 4:
        return Yn(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = Xa(
          t,
          null,
          l,
          n
        ) : wt(e, t, l, n), t.child;
      case 11:
        return jp(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 7:
        return l = t.pendingProps, Oi(e, t), wt(e, t, l, n), t.child;
      case 8:
        return wt(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 12:
        return wt(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 10:
        return zp(e, t, n);
      case 9:
        return i = t.type._context, l = t.pendingProps.children, qa(t), i = Ht(i), l = l(i), t.flags |= 1, wt(e, t, l, n), t.child;
      case 14:
        return Ep(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 15:
        return Tp(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 19:
        return sf(e, t, n);
      case 31:
        return wb(e, t, n);
      case 22:
        return wp(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        return qa(t), l = Ht(St), e === null ? (i = jo(), i === null && (i = nt, r = So(), i.pooledCache = r, r.refCount++, r !== null && (i.pooledCacheLanes |= n), i = r), t.memoizedState = { parent: l, cache: i }, To(t), na(t, St, i)) : ((e.lanes & n) !== 0 && (wo(e, t), Xs(t, null, null, n), Vs()), i = e.memoizedState, r = t.memoizedState, i.parent !== l ? (i = { parent: l, cache: l }, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), na(t, St, l)) : (l = r.cache, na(t, St, l), l !== i.cache && xo(
          t,
          [St],
          n,
          !0
        ))), wt(
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
        }), l = t.pendingProps, l.name != null && l.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : Re && ir(t), e !== null && e.memoizedProps.name !== l.name ? t.flags |= 4194816 : Oi(e, t), wt(e, t, l.children, n), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(u(156, t.tag));
  }
  function Hl(e) {
    e.flags |= 4;
  }
  function rf(e, t, n, l, i) {
    var r;
    if ((r = (e.mode & 32) !== 0) && (r = n === null ? f0(t, l) : f0(t, l) && (l.src !== n.src || l.srcSet !== n.srcSet)), r) {
      if (e.flags |= 16777216, (i & 335544128) === i)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (yg()) e.flags |= 8192;
        else
          throw Va = dr, Eo;
    } else e.flags &= -16777217;
  }
  function Up(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !d0(t))
      if (yg()) e.flags |= 8192;
      else
        throw Va = dr, Eo;
  }
  function Or(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Bc() : 536870912, e.lanes |= t, Li |= t);
  }
  function Fs(e, t) {
    if (!Re)
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
  function it(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, l = 0;
    if (t)
      for (var i = e.child; i !== null; )
        n |= i.lanes | i.childLanes, l |= i.subtreeFlags & 1206910976, l |= i.flags & 1206910976, i.return = e, i = i.sibling;
    else
      for (i = e.child; i !== null; )
        n |= i.lanes | i.childLanes, l |= i.subtreeFlags, l |= i.flags, i.return = e, i = i.sibling;
    return e.subtreeFlags |= l, e.childLanes = n, t;
  }
  function _b(e, t, n) {
    var l = t.pendingProps;
    switch (go(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return it(t), null;
      case 1:
        return it(t), null;
      case 3:
        return n = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), Dl(St), pn(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Ei(t) ? Hl(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, vo())), it(t), null;
      case 26:
        var i = t.type, r = t.memoizedState;
        return e === null ? (Hl(t), r !== null ? (it(t), Up(t, r)) : (it(t), rf(
          t,
          i,
          null,
          l,
          n
        ))) : r ? r !== e.memoizedState ? (Hl(t), it(t), Up(t, r)) : (it(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && Hl(t), it(t), rf(
          t,
          i,
          e,
          l,
          n
        )), null;
      case 27:
        if (El(t), n = ln.current, i = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Hl(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(u(166));
            return it(t), t.subtreeFlags &= -33554433, null;
          }
          e = ut.current, Ei(t) ? pm(t) : (e = l0(i, l, n), t.stateNode = e, Hl(t));
        }
        return it(t), t.subtreeFlags &= -33554433, null;
      case 5:
        if (El(t), i = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Hl(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(u(166));
            return it(t), t.subtreeFlags &= -33554433, null;
          }
          if (r = ut.current, Ei(t))
            pm(t);
          else {
            var h = rc(
              ln.current
            );
            switch (r) {
              case 1:
                r = h.createElementNS(
                  "http://www.w3.org/2000/svg",
                  i
                );
                break;
              case 2:
                r = h.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  i
                );
                break;
              default:
                switch (i) {
                  case "svg":
                    r = h.createElementNS(
                      "http://www.w3.org/2000/svg",
                      i
                    );
                    break;
                  case "math":
                    r = h.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      i
                    );
                    break;
                  case "script":
                    r = h.createElement("div"), r.innerHTML = "<script><\/script>", r = r.removeChild(
                      r.firstChild
                    );
                    break;
                  case "select":
                    r = typeof l.is == "string" ? h.createElement("select", {
                      is: l.is
                    }) : h.createElement("select"), l.multiple ? r.multiple = !0 : l.size && (r.size = l.size);
                    break;
                  default:
                    r = typeof l.is == "string" ? h.createElement(i, { is: l.is }) : h.createElement(i);
                }
            }
            r[lt] = t, r[zt] = l;
            e: for (h = t.child; h !== null; ) {
              if (h.tag === 5 || h.tag === 6)
                r.appendChild(h.stateNode);
              else if (h.tag !== 4 && h.tag !== 27 && h.child !== null) {
                h.child.return = h, h = h.child;
                continue;
              }
              if (h === t) break e;
              for (; h.sibling === null; ) {
                if (h.return === null || h.return === t)
                  break e;
                h = h.return;
              }
              h.sibling.return = h.return, h = h.sibling;
            }
            t.stateNode = r;
            e: switch (Yt(r, i, l), i) {
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
            l && Hl(t);
          }
        }
        return it(t), t.subtreeFlags &= -33554433, rf(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          n
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== l && Hl(t);
        else {
          if (typeof l != "string" && t.stateNode === null)
            throw Error(u(166));
          if (e = ln.current, Ei(t)) {
            if (e = t.stateNode, n = t.memoizedProps, l = null, i = _t, i !== null)
              switch (i.tag) {
                case 27:
                case 5:
                  l = i.memoizedProps;
              }
            e[lt] = t, e = !!(e.nodeValue === n || l !== null && l.suppressHydrationWarning === !0 || Lg(e.nodeValue, n)), e || ta(t, !0);
          } else
            e = rc(e).createTextNode(
              l
            ), e[lt] = t, t.stateNode = e;
        }
        return it(t), null;
      case 31:
        if (n = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = Ei(t), n !== null) {
            if (e === null) {
              if (!l) throw Error(u(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(557));
              e[lt] = t;
            } else
              Ua(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            it(t), e = !1;
          } else
            n = vo(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
          if (!e)
            return t.flags & 256 ? (xn(t), t) : (xn(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(u(558));
        }
        return it(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (i = Ei(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!i) throw Error(u(318));
              if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(u(317));
              i[lt] = t;
            } else
              Ua(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            it(t), i = !1;
          } else
            i = vo(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
          if (!i)
            return t.flags & 256 ? (xn(t), t) : (xn(t), null);
        }
        return xn(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = l !== null, e = e !== null && e.memoizedState !== null, n && (l = t.child, i = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (i = l.alternate.memoizedState.cachePool.pool), r = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (r = l.memoizedState.cachePool.pool), r !== i && (l.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Or(t, t.updateQueue), it(t), null);
      case 4:
        return pn(), e === null && Gf(t.stateNode.containerInfo), t.flags |= 67108864, it(t), null;
      case 10:
        return Dl(t.type), it(t), null;
      case 19:
        if (Ro(t), l = t.memoizedState, l === null) return it(t), null;
        if (i = (t.flags & 128) !== 0, r = l.rendering, r === null)
          if (i) Fs(l, !1);
          else {
            if (yt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (r = gr(e), r !== null) {
                  for (t.flags |= 128, Fs(l, !1), e = r.updateQueue, t.updateQueue = e, Or(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; )
                    om(n, e), n = n.sibling;
                  return Zs(
                    t,
                    qt.current & 1 | 2
                  ), Re && Rl(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && Xt() > Gr && (t.flags |= 128, i = !0, Fs(l, !1), t.lanes = 4194304);
          }
        else {
          if (!i)
            if (e = gr(r), e !== null) {
              if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, Or(t, e), Fs(l, !0), l.tail === null && l.tailMode !== "collapsed" && l.tailMode !== "visible" && !r.alternate && !Re)
                return it(t), null;
            } else
              2 * Xt() - l.renderingStartTime > Gr && n !== 536870912 && (t.flags |= 128, i = !0, Fs(l, !1), t.lanes = 4194304);
          l.isBackwards ? (r.sibling = t.child, t.child = r) : (e = l.last, e !== null ? e.sibling = r : t.child = r, l.last = r);
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
          return l.rendering = e, l.tail = e.sibling, l.renderingStartTime = Xt(), e.sibling = null, r = qt.current, r = i ? r & 1 | 2 : r & 1, l.tailMode === "visible" || l.tailMode === "collapsed" || !n || Re ? Zs(t, r) : (n = r, Ve(Bt, t), Ve(qt, n), Zt === null && (Zt = t)), Re && Rl(t, l.treeForkCount), e;
        }
        return it(t), null;
      case 22:
      case 23:
        return xn(t), Co(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (it(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : it(t), n = t.updateQueue, n !== null && Or(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== n && (t.flags |= 2048), e !== null && ye(Ya), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Dl(St), it(t), null;
      case 25:
        return null;
      case 30:
        return t.flags |= 33554432, it(t), null;
    }
    throw Error(u(156, t.tag));
  }
  function Cb(e, t) {
    switch (go(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Dl(St), pn(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return El(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (xn(t), t.alternate === null)
            throw Error(u(340));
          Ua();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (xn(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(u(340));
          Ua();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Ro(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
      case 4:
        return pn(), null;
      case 10:
        return Dl(t.type), null;
      case 22:
      case 23:
        return xn(t), Co(), e !== null && ye(Ya), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Dl(St), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Hp(e, t) {
    switch (go(t), t.tag) {
      case 3:
        Dl(St), pn();
        break;
      case 26:
      case 27:
      case 5:
        El(t);
        break;
      case 4:
        pn();
        break;
      case 31:
        t.memoizedState !== null && xn(t);
        break;
      case 13:
        xn(t);
        break;
      case 19:
        Ro(t);
        break;
      case 10:
        Dl(t.type);
        break;
      case 22:
      case 23:
        xn(t), Co(), e !== null && ye(Ya);
        break;
      case 24:
        Dl(St);
    }
  }
  function Ps(e, t) {
    try {
      var n = t.updateQueue, l = n !== null ? n.lastEffect : null;
      if (l !== null) {
        var i = l.next;
        n = i;
        do {
          if ((n.tag & e) === e) {
            l = void 0;
            var r = n.create, h = n.inst;
            l = r(), h.destroy = l;
          }
          n = n.next;
        } while (n !== i);
      }
    } catch (y) {
      Fe(t, t.return, y);
    }
  }
  function oa(e, t, n) {
    try {
      var l = t.updateQueue, i = l !== null ? l.lastEffect : null;
      if (i !== null) {
        var r = i.next;
        l = r;
        do {
          if ((l.tag & e) === e) {
            var h = l.inst, y = h.destroy;
            if (y !== void 0) {
              h.destroy = void 0, i = t;
              var w = n, R = y;
              try {
                R();
              } catch (H) {
                Fe(
                  i,
                  w,
                  H
                );
              }
            }
          }
          l = l.next;
        } while (l !== r);
      }
    } catch (H) {
      Fe(t, t.return, H);
    }
  }
  function Bp(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        Am(t, n);
      } catch (l) {
        Fe(e, e.return, l);
      }
    }
  }
  function qp(e, t, n) {
    n.props = Qa(
      e.type,
      e.memoizedProps
    ), n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (l) {
      Fe(e, t, l);
    }
  }
  function fl(e, t) {
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
            var i = e.stateNode, r = _l(e.memoizedProps, i);
            (i.ref === null || i.ref.name !== r) && (i.ref = Qg(r)), l = i.ref;
            break;
          case 7:
            if (e.stateNode === null) {
              var h = new Tn(e);
              p(
                e.child,
                !1,
                xx,
                h,
                void 0,
                void 0
              ), e.stateNode = h;
            }
            l = e.stateNode;
            break;
          default:
            l = e.stateNode;
        }
        typeof n == "function" ? e.refCleanup = n(l) : n.current = l;
      }
    } catch (y) {
      Fe(e, t, y);
    }
  }
  function $t(e, t) {
    var n = e.ref, l = e.refCleanup;
    if (n !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (i) {
          Fe(e, t, i);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (i) {
          Fe(e, t, i);
        }
      else n.current = null;
  }
  function Rr(e, t) {
    if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null)
      for (var n = 0; n < t.length; n++)
        Wg(
          e.stateNode,
          t[n]
        );
  }
  function $p(e) {
    for (var t = e.return; t !== null && (of(t) && Wg(e.stateNode, t.stateNode), !uf(t)); )
      t = t.return;
  }
  function Ws(e) {
    for (var t = e.return; t !== null && (of(t) && Sx(e.stateNode, t.stateNode), !uf(t)); )
      t = t.return;
  }
  function uf(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 27;
  }
  function of(e) {
    return e && e.tag === 7 && e.stateNode !== null;
  }
  function ff(e) {
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
      Fe(e, e.return, i);
    }
  }
  function df(e, t, n) {
    try {
      var l = e.stateNode;
      nx(l, e.type, n, t), l[zt] = t;
    } catch (i) {
      Fe(e, e.return, i);
    }
  }
  function Yp(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ya(e.type) || e.tag === 4;
  }
  function hf(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Yp(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && ya(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function mf(e, t, n, l) {
    var i = e.tag;
    if (i === 5 || i === 6)
      i = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(i, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(i), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = rl)), Rr(e, l), $e = !0;
    else if (i !== 4 && (i === 27 && (Rr(e, l), l = null, ya(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null))
      for (mf(
        e,
        t,
        n,
        l
      ), e = e.sibling; e !== null; )
        mf(
          e,
          t,
          n,
          l
        ), e = e.sibling;
  }
  function Mr(e, t, n, l) {
    var i = e.tag;
    if (i === 5 || i === 6)
      i = e.stateNode, t ? n.insertBefore(i, t) : n.appendChild(i), Rr(e, l), $e = !0;
    else if (i !== 4 && (i === 27 && (Rr(e, l), l = null, ya(e.type) && (n = e.stateNode)), e = e.child, e !== null))
      for (Mr(
        e,
        t,
        n,
        l
      ), e = e.sibling; e !== null; )
        Mr(
          e,
          t,
          n,
          l
        ), e = e.sibling;
  }
  function Gp(e) {
    var t = e.stateNode, n = e.memoizedProps;
    try {
      for (var l = e.type, i = t.attributes; i.length; )
        t.removeAttributeNode(i[0]);
      Yt(t, l, n), t[lt] = e, t[zt] = n;
    } catch (r) {
      Fe(e, e.return, r);
    }
  }
  var Dr = !1, Sn = null;
  function Vp(e) {
    (e.tag === 30 || (e.subtreeFlags & 33554432) !== 0) && (Dr = !0);
  }
  var dl = null;
  function Xp() {
    var e = dl;
    return dl = null, e;
  }
  var rn = 0;
  function Ri(e, t, n, l, i) {
    return rn = 0, Zp(
      e.child,
      t,
      n,
      l,
      i
    );
  }
  function Zp(e, t, n, l, i) {
    for (var r = !1; e !== null; ) {
      if (e.tag === 5) {
        var h = e.stateNode;
        if (l !== null) {
          var y = Ff(h);
          l.push(y), y.view && (r = !0);
        } else
          r || Ff(h).view && (r = !0);
        Dr = !0, Xg(
          h,
          rn === 0 ? t : t + "_" + rn,
          n
        ), rn++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && i || Zp(
        e.child,
        t,
        n,
        l,
        i
      ) && (r = !0));
      e = e.sibling;
    }
    return r;
  }
  function hl(e, t) {
    for (; e !== null; )
      e.tag === 5 ? Zg(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && t || hl(
        e.child,
        t
      )), e = e.sibling;
  }
  function zr(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if ((e.tag !== 22 || e.memoizedState === null) && (zr(e), e.tag === 30 && (e.flags & 18874368) !== 0 && e.stateNode.paired)) {
          var t = e.memoizedProps;
          if (t.name == null || t.name === "auto")
            throw Error(u(544));
          var n = t.name;
          t = Cl(t.default, t.share), t !== "none" && (Ri(
            e,
            n,
            t,
            null,
            !1
          ) || hl(e.child, !1));
        }
        e = e.sibling;
      }
  }
  function pf(e, t) {
    if (e.tag === 30) {
      var n = e.stateNode, l = e.memoizedProps, i = _l(l, n), r = Cl(
        l.default,
        n.paired ? l.share : l.enter
      );
      r !== "none" ? Ri(e, i, r, null, !1) ? (zr(e), n.paired || t || qi(e, l.onEnter)) : hl(e.child, !1) : zr(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        pf(e, t), e = e.sibling;
    else zr(e);
  }
  function gf(e) {
    if (Sn !== null && Sn.size !== 0) {
      var t = Sn;
      if ((e.subtreeFlags & 18874368) !== 0)
        for (e = e.child; e !== null; ) {
          if (e.tag !== 22 || e.memoizedState === null) {
            if (e.tag === 30 && (e.flags & 18874368) !== 0) {
              var n = e.memoizedProps, l = n.name;
              if (l != null && l !== "auto") {
                var i = t.get(l);
                if (i !== void 0) {
                  var r = Cl(
                    n.default,
                    n.share
                  );
                  if (r !== "none" && (Ri(
                    e,
                    l,
                    r,
                    null,
                    !1
                  ) ? (r = e.stateNode, i.paired = r, r.paired = i, qi(e, n.onShare)) : hl(e.child, !1)), t.delete(l), t.size === 0) break;
                }
              }
            }
            gf(e);
          }
          e = e.sibling;
        }
    }
  }
  function yf(e) {
    if (e.tag === 30) {
      var t = e.memoizedProps, n = _l(t, e.stateNode), l = Sn !== null ? Sn.get(n) : void 0, i = Cl(
        t.default,
        l !== void 0 ? t.share : t.exit
      );
      i !== "none" && (Ri(e, n, i, null, !1) ? l !== void 0 ? (i = e.stateNode, l.paired = i, i.paired = l, Sn.delete(n), qi(e, t.onShare)) : qi(e, t.onExit) : hl(e.child, !1)), Sn !== null && gf(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        yf(e), e = e.sibling;
    else
      Sn !== null && gf(e);
  }
  function Qp(e) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var t = e.memoizedProps, n = _l(t, e.stateNode);
        t = Cl(t.default, t.update), e.flags &= -5, t !== "none" && Ri(
          e,
          n,
          t,
          e.memoizedState = [],
          !1
        );
      } else
        (e.subtreeFlags & 33554432) !== 0 && Qp(e);
      e = e.sibling;
    }
  }
  function vf(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if (e.tag !== 22 || e.memoizedState === null) {
          if (e.tag === 30 && (e.flags & 18874368) !== 0) {
            var t = e.stateNode;
            t.paired !== null && (t.paired = null, hl(e.child, !1));
          }
          vf(e);
        }
        e = e.sibling;
      }
  }
  function Lr(e) {
    if (e.tag === 30)
      e.stateNode.paired = null, hl(e.child, !1), vf(e);
    else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        Lr(e), e = e.sibling;
    else vf(e);
  }
  function Kp(e) {
    for (e = e.child; e !== null; )
      e.tag === 30 ? hl(e.child, !1) : (e.subtreeFlags & 33554432) !== 0 && Kp(e), e = e.sibling;
  }
  function bf(e, t, n, l, i, r, h) {
    for (var y = !1; t !== null; ) {
      if (t.tag === 5) {
        var w = t.stateNode;
        if (r !== null && rn < r.length) {
          var R = r[rn], H = Ff(w);
          (R.view || H.view) && (y = !0);
          var Y;
          if (Y = (e.flags & 4) === 0)
            if (H.clip) Y = !0;
            else {
              Y = R.rect;
              var C = H.rect;
              Y = Y.y !== C.y || Y.x !== C.x || Y.height !== C.height || Y.width !== C.width;
            }
          Y && (e.flags |= 4), H.abs ? H = !R.abs : (R = R.rect, H = H.rect, H = R.height !== H.height || R.width !== H.width), H && (e.flags |= 32);
        } else e.flags |= 32;
        (e.flags & 4) !== 0 && Xg(
          w,
          rn === 0 ? n : n + "_" + rn,
          i
        ), y && (e.flags & 4) !== 0 || (dl === null && (dl = []), dl.push(
          w,
          rn === 0 ? l : l + "_" + rn,
          t.memoizedProps
        )), rn++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && h ? e.flags |= t.flags & 32 : bf(
        e,
        t.child,
        n,
        l,
        i,
        r,
        h
      ) && (y = !0));
      t = t.sibling;
    }
    return y;
  }
  function Ip(e, t) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var n = e.memoizedProps, l = e.stateNode, i = _l(n, l), r = Cl(n.default, n.update), h;
        h = e.memoizedState, e.memoizedState = null, l = e;
        var y = e.child;
        rn = 0, i = bf(
          l,
          y,
          i,
          i,
          r,
          h,
          !1
        ), (e.flags & 4) !== 0 && i && qi(e, n.onUpdate);
      } else
        (e.subtreeFlags & 33554432) !== 0 && Ip(e);
      e = e.sibling;
    }
  }
  var Ct = !1, Ke = !1, ml = !1, xf = !1, Jp = typeof WeakSet == "function" ? WeakSet : Set, Ot = null, pl = !1, ec = !1, Ur = !1, Sf = !1;
  function Ob(e, t, n) {
    if (e = e.containerInfo, Zf = Ji, e = em(e), io(e)) {
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
            var r = i.anchorOffset, h = i.focusNode;
            i = i.focusOffset;
            try {
              l.nodeType, h.nodeType;
            } catch {
              l = null;
              break e;
            }
            var y = 0, w = -1, R = -1, H = 0, Y = 0, C = e, z = null;
            t: for (; ; ) {
              for (var ne; C !== l || r !== 0 && C.nodeType !== 3 || (w = y + r), C !== h || i !== 0 && C.nodeType !== 3 || (R = y + i), C.nodeType === 3 && (y += C.nodeValue.length), (ne = C.firstChild) !== null; )
                z = C, C = ne;
              for (; ; ) {
                if (C === e) break t;
                if (z === l && ++H === r && (w = y), z === h && ++Y === i && (R = y), (ne = C.nextSibling) !== null) break;
                C = z, z = C.parentNode;
              }
              C = ne;
            }
            l = w === -1 || R === -1 ? null : { start: w, end: R };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Qf = { focusedElem: e, selectionRange: l }, Ji = !1, n = (n & 335544064) === n, Ot = t, t = n ? 9270 : 1024; Ot !== null; ) {
      if (e = Ot, n && (l = e.deletions, l !== null))
        for (r = 0; r < l.length; r++)
          n && yf(l[r]);
      if (e.alternate === null && (e.flags & 2) !== 0)
        n && Vp(e), Hr(n);
      else {
        if (e.tag === 22) {
          if (l = e.alternate, e.memoizedState !== null) {
            l !== null && l.memoizedState === null && n && yf(l), Hr(n);
            continue;
          } else if (l !== null && l.memoizedState !== null) {
            n && Vp(e), Hr(n);
            continue;
          }
        }
        l = e.child, (e.subtreeFlags & t) !== 0 && l !== null ? (l.return = e, Ot = l) : (n && Qp(e), Hr(n));
      }
    }
    Sn = null;
  }
  function Hr(e) {
    for (; Ot !== null; ) {
      var t = Ot, n = e, l = t.alternate, i = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((i & 1024) !== 0 && l !== null) {
            n = void 0, i = l.memoizedProps, l = l.memoizedState;
            var r = t.stateNode;
            try {
              var h = Qa(
                t.type,
                i
              );
              n = r.getSnapshotBeforeUpdate(
                h,
                l
              ), r.__reactInternalSnapshotBeforeUpdate = n;
            } catch (y) {
              Fe(t, t.return, y);
            }
          }
          break;
        case 3:
          if ((i & 1024) !== 0) {
            if (l = t.stateNode.containerInfo, n = l.nodeType, n === 9)
              ed(l);
            else if (n === 1)
              switch (l.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  ed(l);
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
          n && l !== null && (n = _l(
            l.memoizedProps,
            l.stateNode
          ), i = t.memoizedProps, i = Cl(i.default, i.update), i !== "none" && Ri(
            l,
            n,
            i,
            l.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((i & 1024) !== 0) throw Error(u(163));
      }
      if (l = t.sibling, l !== null) {
        l.return = t.return, Ot = l;
        break;
      }
      Ot = t.return;
    }
  }
  function Fp(e, t, n) {
    var l = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        gl(e, n), l & 4 && Ps(5, n);
        break;
      case 1:
        if (gl(e, n), l & 4)
          if (e = n.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (h) {
              Fe(n, n.return, h);
            }
          else {
            var i = Qa(
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
            } catch (h) {
              Fe(
                n,
                n.return,
                h
              );
            }
          }
        l & 64 && Bp(n), l & 512 && fl(n, n.return);
        break;
      case 3:
        if (gl(e, n), l & 64 && (e = n.updateQueue, e !== null)) {
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
            Am(e, t);
          } catch (h) {
            Fe(n, n.return, h);
          }
        }
        break;
      case 27:
        t === null && l & 4 && Gp(n);
      case 26:
      case 5:
        gl(e, n), t === null && l & 4 && ff(n), l & 512 && fl(n, n.return);
        break;
      case 12:
        gl(e, n);
        break;
      case 31:
        gl(e, n), l & 4 && tg(e, n);
        break;
      case 13:
        gl(e, n), l & 4 && ng(e, n), l & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Gb.bind(
          null,
          n
        ), Ex(e, n))));
        break;
      case 22:
        if (l = n.memoizedState !== null || Ct, !l) {
          var r = t !== null && t.memoizedState !== null || Ke;
          t = Ct, i = Ke, Ct = l, (Ke = r) && !i ? (l = 2, (n.subtreeFlags & 8772) !== 0 && (l |= 1), In(
            e,
            n,
            l
          )) : gl(e, n), Ct = t, Ke = i;
        }
        break;
      case 30:
        gl(e, n), l & 512 && fl(n, n.return);
        break;
      case 7:
        l & 512 && fl(n, n.return);
      default:
        gl(e, n);
    }
  }
  function Nf(e, t) {
    for (e = e.child; e !== null; )
      Pp(e, t), e = e.sibling;
  }
  function Pp(e, t) {
    switch (e.tag) {
      case 5:
      case 26:
        try {
          var n = e.stateNode;
          if (t) {
            var l = n.style;
            typeof l.setProperty == "function" ? l.setProperty("display", "none", "important") : l.display = "none";
          } else {
            var i = e.stateNode, r = e.memoizedProps.style, h = r != null && r.hasOwnProperty("display") ? r.display : null;
            i.style.display = h == null || typeof h == "boolean" ? "" : ("" + h).trim();
          }
        } catch (w) {
          Fe(e, e.return, w);
        }
        jf(e, t);
        break;
      case 6:
        try {
          e.stateNode.nodeValue = t ? "" : e.memoizedProps, $e = !0;
        } catch (w) {
          Fe(e, e.return, w);
        }
        break;
      case 18:
        try {
          var y = e.stateNode;
          t ? Vg(y, !0) : Vg(e.stateNode, !1);
        } catch (w) {
          Fe(e, e.return, w);
        }
        break;
      case 22:
      case 23:
        e.memoizedState === null && Nf(e, t);
        break;
      default:
        Nf(e, t);
    }
  }
  function jf(e, t) {
    if (e.subtreeFlags & 67108864)
      for (e = e.child; e !== null; ) {
        e: {
          var n = e, l = t;
          switch (n.tag) {
            case 4:
              Pp(n, l);
              break e;
            case 22:
              n.memoizedState === null && jf(n, l);
              break e;
            default:
              jf(n, l);
          }
        }
        e = e.sibling;
      }
  }
  function Wp(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Wp(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Ca(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var ht = null, un = !1;
  function Qn(e, t, n) {
    for (n = n.child; n !== null; )
      eg(e, t, n), n = n.sibling;
  }
  function eg(e, t, n) {
    if (At && typeof At.onCommitFiberUnmount == "function")
      try {
        At.onCommitFiberUnmount(Zl, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        Ke || $t(n, t), Qn(
          e,
          t,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !Ke && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        Ke || $t(n, t), Ws(n);
        var l = ht, i = un;
        ya(n.type) && (ht = n.stateNode, un = !1), Qn(
          e,
          t,
          n
        ), a0(
          n.stateNode,
          n.type,
          n.memoizedProps
        ), ht = l, un = i;
        break;
      case 5:
        Ke || $t(n, t), Ws(n);
      case 6:
        if (n.tag === 6 && Ws(n), l = ht, i = un, ht = null, Qn(
          e,
          t,
          n
        ), ht = l, un = i, ht !== null)
          if (un)
            try {
              (ht.nodeType === 9 ? ht.body : ht.nodeName === "HTML" ? ht.ownerDocument.body : ht).removeChild(n.stateNode), $e = !0;
            } catch (r) {
              Fe(
                n,
                t,
                r
              );
            }
          else
            try {
              ht.removeChild(n.stateNode), $e = !0;
            } catch (r) {
              Fe(
                n,
                t,
                r
              );
            }
        break;
      case 18:
        ht !== null && (un ? (e = ht, Gg(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          n.stateNode
        ), Fi(e)) : Gg(ht, n.stateNode));
        break;
      case 4:
        l = ht, i = un, ht = n.stateNode.containerInfo, un = !0, Qn(
          e,
          t,
          n
        ), ht = l, un = i;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        oa(2, n, t), Ke || oa(4, n, t), Qn(
          e,
          t,
          n
        );
        break;
      case 1:
        Ke || ($t(n, t), l = n.stateNode, typeof l.componentWillUnmount == "function" && qp(
          n,
          t,
          l
        )), Qn(
          e,
          t,
          n
        );
        break;
      case 21:
        Qn(
          e,
          t,
          n
        );
        break;
      case 22:
        Ke = (l = Ke) || n.memoizedState !== null, Qn(
          e,
          t,
          n
        ), Ke = l;
        break;
      case 30:
        $t(n, t), Qn(
          e,
          t,
          n
        );
        break;
      case 7:
        Ke || $t(n, t), Qn(
          e,
          t,
          n
        );
        break;
      default:
        Qn(
          e,
          t,
          n
        );
    }
  }
  function tg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Fi(e);
      } catch (n) {
        Fe(t, t.return, n);
      }
    }
  }
  function ng(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Fi(e);
      } catch (n) {
        Fe(t, t.return, n);
      }
  }
  function Rb(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Jp()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Jp()), t;
      default:
        throw Error(u(435, e.tag));
    }
  }
  function Br(e, t) {
    var n = Rb(e);
    t.forEach(function(l) {
      if (!n.has(l)) {
        n.add(l);
        var i = Vb.bind(null, e, l);
        l.then(i, i);
      }
    });
  }
  function en(e, t, n) {
    var l = t.deletions;
    if (l !== null)
      for (var i = 0; i < l.length; i++) {
        var r = l[i], h = e, y = t, w = y;
        e: for (; w !== null; ) {
          switch (w.tag) {
            case 27:
              if (ya(w.type)) {
                ht = w.stateNode, un = !1;
                break e;
              }
              break;
            case 5:
              ht = w.stateNode, un = !1;
              break e;
            case 3:
            case 4:
              ht = w.stateNode.containerInfo, un = !0;
              break e;
          }
          w = w.return;
        }
        if (ht === null) throw Error(u(160));
        eg(h, y, r), ht = null, un = !1, h = r.alternate, h !== null && (h.return = null), r.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        lg(t, e, n), t = t.sibling;
  }
  var Kn = null;
  function lg(e, t, n) {
    var l = e.alternate, i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (i & 4 && (l = e.updateQueue, l = l !== null ? l.events : null, l !== null))
          for (var r = 0; r < l.length; r++) {
            var h = l[r];
            h.ref.impl = h.nextImpl;
          }
        en(t, e, n), tn(e), i & 4 && (oa(3, e, e.return), Ps(3, e), oa(5, e, e.return));
        break;
      case 1:
        en(t, e, n), tn(e), i & 512 && (Ke || l === null || $t(l, l.return)), i & 64 && Ct && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
        break;
      case 26:
        if (r = Kn, en(t, e, n), tn(e), i & 512 && (Ke || l === null || $t(l, l.return)), i & 4)
          if (i = l !== null ? l.memoizedState : null, n = e.memoizedState, l === null)
            if (n === null)
              if (e.stateNode === null)
                if (Ct)
                  e.stateNode = qg(
                    e.type,
                    e.memoizedProps,
                    t.containerInfo,
                    e
                  );
                else {
                  e: {
                    t = e.type, n = e.memoizedProps, i = r.ownerDocument || r;
                    t: switch (t) {
                      case "title":
                        l = i.getElementsByTagName("title")[0], (!l || l[Aa] || l[lt] || l.namespaceURI === "http://www.w3.org/2000/svg" || l.hasAttribute("itemprop")) && (l = i.createElement(t), i.head.insertBefore(
                          l,
                          i.querySelector("head > title")
                        )), Yt(l, t, n), l[lt] = e, dt(l), t = l;
                        break e;
                      case "link":
                        if (r = o0(
                          "link",
                          "href",
                          i
                        ).get(t + (n.href || ""))) {
                          for (h = 0; h < r.length; h++)
                            if (l = r[h], l.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && l.getAttribute("rel") === (n.rel == null ? null : n.rel) && l.getAttribute("title") === (n.title == null ? null : n.title) && l.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                              r.splice(h, 1);
                              break t;
                            }
                        }
                        l = i.createElement(t), Yt(l, t, n), i.head.appendChild(l);
                        break;
                      case "meta":
                        if (r = o0(
                          "meta",
                          "content",
                          i
                        ).get(t + (n.content || ""))) {
                          for (h = 0; h < r.length; h++)
                            if (l = r[h], l.getAttribute("content") === (n.content == null ? null : "" + n.content) && l.getAttribute("name") === (n.name == null ? null : n.name) && l.getAttribute("property") === (n.property == null ? null : n.property) && l.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && l.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                              r.splice(h, 1);
                              break t;
                            }
                        }
                        l = i.createElement(t), Yt(l, t, n), i.head.appendChild(l);
                        break;
                      default:
                        throw Error(u(468, t));
                    }
                    l[lt] = e, dt(l), t = l;
                  }
                  e.stateNode = t;
                }
              else
                Ct || cd(r, e.type, e.stateNode);
            else
              e.stateNode = u0(
                r,
                n,
                e.memoizedProps
              );
          else
            i !== n ? (i === null ? (t = l.stateNode, t === null || Ke || t.parentNode.removeChild(t)) : i.count--, n === null ? Ct || cd(r, e.type, e.stateNode) : u0(r, n, e.memoizedProps)) : n === null && e.stateNode !== null && df(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        break;
      case 27:
        en(t, e, n), tn(e), i & 512 && (Ke || l === null || $t(l, l.return)), l !== null && i & 4 && df(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (r = ml, ml = !1, en(t, e, n), ml = r, tn(e), i & 512 && (Ke || l === null || $t(l, l.return)), e.flags & 32) {
          t = e.stateNode;
          try {
            pt(t, ""), $e = !0;
          } catch (H) {
            Fe(e, e.return, H);
          }
        }
        i & 4 && e.stateNode != null && (t = e.memoizedProps, df(
          e,
          t,
          l !== null ? l.memoizedProps : t
        )), i & 1024 && (xf = !0);
        break;
      case 6:
        if (en(t, e, n), tn(e), i & 4) {
          if (e.stateNode === null)
            throw Error(u(162));
          t = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = t, $e = !0;
          } catch (H) {
            Fe(e, e.return, H);
          }
        }
        break;
      case 3:
        if ($e = !1, eu = null, r = Kn, Kn = uc(t.containerInfo), en(t, e, n), Kn = r, tn(e), i & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Fi(t.containerInfo);
          } catch (H) {
            Fe(e, e.return, H);
          }
        xf && (xf = !1, ag(e)), $e = !1;
        break;
      case 4:
        i = ml, ml = Ct, l = Vc(), r = Kn, Kn = uc(
          e.stateNode.containerInfo
        ), en(t, e, n), tn(e), Kn = r, $e && ec && (Ur = !0), $e = l, ml = i;
        break;
      case 12:
        en(t, e, n), tn(e);
        break;
      case 31:
        en(t, e, n), tn(e), i & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Br(e, t)));
        break;
      case 13:
        en(t, e, n), tn(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (Yr = Xt()), i & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Br(e, t)));
        break;
      case 22:
        r = e.memoizedState !== null, h = l !== null && l.memoizedState !== null;
        var y = Ct, w = Ke, R = ml;
        Ct = y || r, ml = R || r, Ke = w || h, en(t, e, n), Ke = w, ml = R, Ct = y, tn(e), i & 8192 && (t = e.stateNode, t._visibility = r ? t._visibility & -2 : t._visibility | 1, !r || l === null || h || Ct || Ke || (t = h || Ke, n = Ct, l = Ke, Ct = r || Ct, Ke = t, fa(e, 2), Ct = n, Ke = l), !r && ml || Nf(e, r)), i & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, Br(e, n))));
        break;
      case 19:
        en(t, e, n), tn(e), i & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Br(e, t)));
        break;
      case 30:
        i & 512 && (Ke || l === null || $t(l, l.return)), i = Vc(), r = ec, h = (n & 335544064) === n, y = e.memoizedProps, ec = h && Cl(
          y.default,
          y.update
        ) !== "none", en(t, e, n), tn(e), h && l !== null && $e && (e.flags |= 4), ec = r, $e = i;
        break;
      case 21:
        break;
      case 7:
        i & 512 && (Ke || l === null || $t(l, l.return)), l && l.stateNode !== null && (l.stateNode._fragmentFiber = e);
      default:
        en(t, e, n), tn(e);
    }
  }
  function tn(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, l = e.return; l !== null; ) {
          if (Yp(l)) {
            n = l;
            break;
          }
          l = l.return;
        }
        l = null;
        for (var i = e.return; i !== null; ) {
          if (of(i)) {
            var r = i.stateNode;
            l === null ? l = [r] : l.push(r);
          }
          if (uf(i)) break;
          i = i.return;
        }
        var h = l;
        if (n == null) throw Error(u(160));
        switch (n.tag) {
          case 27:
            var y = n.stateNode, w = hf(e);
            Mr(
              e,
              w,
              y,
              h
            );
            break;
          case 5:
            var R = n.stateNode;
            n.flags & 32 && (pt(R, ""), n.flags &= -33);
            var H = hf(e);
            Mr(
              e,
              H,
              R,
              h
            );
            break;
          case 3:
          case 4:
            var Y = n.stateNode.containerInfo, C = hf(e);
            mf(
              e,
              C,
              Y,
              h
            );
            break;
          default:
            throw Error(u(161));
        }
      } catch (z) {
        Fe(e, e.return, z);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function ag(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        ag(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, Ji = !0, t.reset(), Ji = !1), e = e.sibling;
      }
  }
  function Mi(e, t) {
    if (t.subtreeFlags & 9270)
      for (t = t.child; t !== null; )
        ig(t, e), t = t.sibling;
    else Ip(t);
  }
  function ig(e, t) {
    var n = e.alternate;
    if (n === null) pf(e, !1);
    else
      switch (e.tag) {
        case 3:
          if (Sf = pl = !1, Xp(), Mi(t, e), !pl && !Ur) {
            if (e = dl, e !== null)
              for (var l = 0; l < e.length; l += 3) {
                n = e[l];
                var i = e[l + 1];
                Zg(n, e[l + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate(
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
            )), Sf = !0;
          }
          dl = null;
          break;
        case 5:
          Mi(t, e);
          break;
        case 4:
          l = pl, pl = !1, Mi(t, e), pl && (Ur = !0), pl = l;
          break;
        case 22:
          e.memoizedState === null && (n.memoizedState !== null ? pf(e, !1) : Mi(t, e));
          break;
        case 30:
          l = pl, i = Xp(), pl = !1, Mi(t, e), pl && (e.flags |= 4);
          var r = e.memoizedProps, h = e.stateNode;
          t = _l(r, h), h = _l(n.memoizedProps, h);
          var y = Cl(r.default, r.update);
          y === "none" ? t = !1 : (r = n.memoizedState, n.memoizedState = null, n = e.child, rn = 0, t = bf(
            e,
            n,
            t,
            h,
            y,
            r,
            !0
          ), rn !== (r === null ? 0 : r.length) && (e.flags |= 32)), (e.flags & 4) !== 0 && t ? (qi(
            e,
            e.memoizedProps.onUpdate
          ), dl = i) : i !== null && (i.push.apply(i, dl), dl = i), pl = (e.flags & 32) !== 0 ? !0 : l;
          break;
        default:
          Mi(t, e);
      }
  }
  function gl(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Fp(e, t.alternate, t), t = t.sibling;
  }
  function fa(e, t) {
    for (e = e.child; e !== null; ) {
      var n = e, l = t;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          oa(4, n, n.return), fa(
            n,
            l
          );
          break;
        case 1:
          $t(n, n.return);
          var i = n.stateNode;
          typeof i.componentWillUnmount == "function" && qp(
            n,
            n.return,
            i
          ), fa(
            n,
            l
          );
          break;
        case 27:
          (l & 2) !== 0 && a0(
            n.stateNode,
            n.type,
            n.memoizedProps
          );
        case 5:
          $t(n, n.return), n.tag !== 5 && n.tag !== 27 || Ws(n), fa(
            n,
            l
          );
          break;
        case 6:
          Ws(n);
          break;
        case 26:
          $t(n, n.return), i = n.stateNode, n.memoizedState !== null || i === null || Ke || i.parentNode.removeChild(i), fa(
            n,
            l
          );
          break;
        case 22:
          n.memoizedState === null && fa(
            n,
            l
          );
          break;
        case 30:
          $t(n, n.return), fa(
            n,
            l
          );
          break;
        case 7:
          $t(n, n.return);
        default:
          fa(
            n,
            l
          );
      }
      e = e.sibling;
    }
  }
  function In(e, t, n) {
    for (n = (t.subtreeFlags & 8772) !== 0 ? n : n & -2, t = t.child; t !== null; ) {
      var l = t.alternate, i = e, r = t, h = r.flags, y = (n & 1) !== 0;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          In(
            i,
            r,
            n
          ), Ps(4, r);
          break;
        case 1:
          if (In(
            i,
            r,
            n
          ), l = r, i = l.stateNode, typeof i.componentDidMount == "function")
            try {
              i.componentDidMount();
            } catch (H) {
              Fe(l, l.return, H);
            }
          if (l = r, i = l.updateQueue, i !== null) {
            var w = l.stateNode;
            try {
              var R = i.shared.hiddenCallbacks;
              if (R !== null)
                for (i.shared.hiddenCallbacks = null, i = 0; i < R.length; i++)
                  km(R[i], w);
            } catch (H) {
              Fe(l, l.return, H);
            }
          }
          y && h & 64 && Bp(r), fl(r, r.return);
          break;
        case 27:
          (n & 2) !== 0 && Gp(r);
        case 5:
          r.tag !== 5 && r.tag !== 27 || $p(r), In(
            i,
            r,
            n
          ), y && l === null && h & 4 && ff(r), fl(r, r.return);
          break;
        case 6:
          $p(r);
          break;
        case 26:
          w = r.stateNode, r.memoizedState !== null || w === null || Ct || cd(
            uc(w.ownerDocument),
            r.type,
            w
          ), In(
            i,
            r,
            n
          ), y && l === null && h & 4 && ff(r), fl(r, r.return);
          break;
        case 12:
          In(
            i,
            r,
            n
          );
          break;
        case 31:
          In(
            i,
            r,
            n
          ), y && h & 4 && tg(i, r);
          break;
        case 13:
          In(
            i,
            r,
            n
          ), y && h & 4 && ng(i, r);
          break;
        case 22:
          r.memoizedState === null && In(
            i,
            r,
            n
          ), fl(r, r.return);
          break;
        case 30:
          In(
            i,
            r,
            n
          ), fl(r, r.return);
          break;
        case 7:
          fl(r, r.return);
        default:
          In(
            i,
            r,
            n
          );
      }
      t = t.sibling;
    }
  }
  function Ef(e, t) {
    var n = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Bs(n));
  }
  function Tf(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Bs(e));
  }
  function Ln(e, t, n, l) {
    var i = (n & 335544064) === n;
    if (t.subtreeFlags & (i ? 10262 : 10256))
      for (t = t.child; t !== null; )
        sg(
          e,
          t,
          n,
          l
        ), t = t.sibling;
    else i && Kp(t);
  }
  function sg(e, t, n, l) {
    var i = (n & 335544064) === n;
    i && t.alternate === null && t.return !== null && t.return.alternate !== null && Lr(t);
    var r = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Ln(
          e,
          t,
          n,
          l
        ), r & 2048 && Ps(9, t);
        break;
      case 1:
        Ln(
          e,
          t,
          n,
          l
        );
        break;
      case 3:
        Ln(
          e,
          t,
          n,
          l
        ), i && Sf && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), r & 2048 && (r = null, t.alternate !== null && (r = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== r && (t.refCount++, r != null && Bs(r)));
        break;
      case 12:
        if (r & 2048) {
          Ln(
            e,
            t,
            n,
            l
          ), r = t.stateNode;
          try {
            var h = t.memoizedProps, y = h.id, w = h.onPostCommit;
            typeof w == "function" && w(
              y,
              t.alternate === null ? "mount" : "update",
              r.passiveEffectDuration,
              -0
            );
          } catch (R) {
            Fe(t, t.return, R);
          }
        } else
          Ln(
            e,
            t,
            n,
            l
          );
        break;
      case 31:
        Ln(
          e,
          t,
          n,
          l
        );
        break;
      case 13:
        Ln(
          e,
          t,
          n,
          l
        );
        break;
      case 23:
        break;
      case 22:
        h = t.stateNode, y = t.alternate, t.memoizedState !== null ? (i && y !== null && y.memoizedState === null && Lr(y), h._visibility & 2 ? Ln(
          e,
          t,
          n,
          l
        ) : tc(
          e,
          t
        )) : (i && y !== null && y.memoizedState !== null && Lr(t), h._visibility & 2 ? Ln(
          e,
          t,
          n,
          l
        ) : (h._visibility |= 2, Di(
          e,
          t,
          n,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        ))), r & 2048 && Ef(y, t);
        break;
      case 24:
        Ln(
          e,
          t,
          n,
          l
        ), r & 2048 && Tf(t.alternate, t);
        break;
      case 30:
        i && (r = t.alternate, r !== null && (hl(r.child, !0), hl(t.child, !0))), Ln(
          e,
          t,
          n,
          l
        );
        break;
      default:
        Ln(
          e,
          t,
          n,
          l
        );
    }
  }
  function Di(e, t, n, l, i) {
    for (i = i && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var r = e, h = t, y = n, w = l, R = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          Di(
            r,
            h,
            y,
            w,
            i
          ), Ps(8, h);
          break;
        case 23:
          break;
        case 22:
          var H = h.stateNode;
          h.memoizedState !== null ? H._visibility & 2 ? Di(
            r,
            h,
            y,
            w,
            i
          ) : tc(
            r,
            h
          ) : (H._visibility |= 2, Di(
            r,
            h,
            y,
            w,
            i
          )), i && R & 2048 && Ef(
            h.alternate,
            h
          );
          break;
        case 24:
          Di(
            r,
            h,
            y,
            w,
            i
          ), i && R & 2048 && Tf(h.alternate, h);
          break;
        default:
          Di(
            r,
            h,
            y,
            w,
            i
          );
      }
      t = t.sibling;
    }
  }
  function tc(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e, l = t, i = l.flags;
        switch (l.tag) {
          case 22:
            tc(n, l), i & 2048 && Ef(
              l.alternate,
              l
            );
            break;
          case 24:
            tc(n, l), i & 2048 && Tf(l.alternate, l);
            break;
          default:
            tc(n, l);
        }
        t = t.sibling;
      }
  }
  var Ka = 8192;
  function Ia(e, t, n) {
    if (e.subtreeFlags & Ka)
      for (e = e.child; e !== null; )
        cg(
          e,
          t,
          n
        ), e = e.sibling;
  }
  function cg(e, t, n) {
    switch (e.tag) {
      case 26:
        Ia(
          e,
          t,
          n
        ), e.flags & Ka && (e.memoizedState !== null ? Hx(
          n,
          Kn,
          e.memoizedState,
          e.memoizedProps
        ) : (e = e.stateNode, (t & 335544128) === t && m0(n, e)));
        break;
      case 5:
        Ia(
          e,
          t,
          n
        ), e.flags & Ka && (e = e.stateNode, (t & 335544128) === t && m0(n, e));
        break;
      case 3:
      case 4:
        var l = Kn;
        Kn = uc(e.stateNode.containerInfo), Ia(
          e,
          t,
          n
        ), Kn = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = Ka, Ka = 16777216, Ia(
          e,
          t,
          n
        ), Ka = l) : Ia(
          e,
          t,
          n
        ));
        break;
      case 30:
        if ((e.flags & Ka) !== 0 && (l = e.memoizedProps.name, l != null && l !== "auto")) {
          var i = e.stateNode;
          i.paired = null, Sn === null && (Sn = /* @__PURE__ */ new Map()), Sn.set(l, i);
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
  function rg(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function nc(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          Ot = l, og(
            l,
            e
          );
        }
      rg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        ug(e), e = e.sibling;
  }
  function ug(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        nc(e), e.flags & 2048 && oa(9, e, e.return);
        break;
      case 3:
        nc(e);
        break;
      case 12:
        nc(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, qr(e)) : nc(e);
        break;
      default:
        nc(e);
    }
  }
  function qr(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          Ot = l, og(
            l,
            e
          );
        }
      rg(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          oa(8, t, t.return), qr(t);
          break;
        case 22:
          n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, qr(t));
          break;
        default:
          qr(t);
      }
      e = e.sibling;
    }
  }
  function og(e, t) {
    for (; Ot !== null; ) {
      var n = Ot;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          oa(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var l = n.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Bs(n.memoizedState.cache);
      }
      if (l = n.child, l !== null) l.return = n, Ot = l;
      else
        e: for (n = e; Ot !== null; ) {
          l = Ot;
          var i = l.sibling, r = l.return;
          if (Wp(l), l === n) {
            Ot = null;
            break e;
          }
          if (i !== null) {
            i.return = r, Ot = i;
            break e;
          }
          Ot = r;
        }
    }
  }
  var Mb = {
    getCacheForType: function(e) {
      var t = Ht(St), n = t.data.get(e);
      return n === void 0 && (n = e(), t.data.set(e, n)), n;
    },
    cacheSignal: function() {
      return Ht(St).controller.signal;
    }
  }, Db = typeof WeakMap == "function" ? WeakMap : Map, Ze = 0, nt = null, ze = null, Be = 0, Je = 0, Nn = null, da = !1, zi = !1, wf = !1, Bl = 0, yt = 0, ha = 0, Ja = 0, $r = 0, jn = 0, Li = 0, lc = null, on = null, kf = !1, Yr = 0, fg = 0, Gr = 1 / 0, Vr = null, ma = null, mt = 0, Jn = null, Fa = null, yl = 0, Af = 0, _f = null, dg = null, Ui = null, Hi = null, Bi = null, ac = 0, Xr = null;
  function En() {
    return (Ze & 2) !== 0 && Be !== 0 ? Be & -Be : ue.T !== null ? Bf() : qc();
  }
  function hg() {
    if (jn === 0)
      if ((Be & 536870912) === 0 || Re) {
        var e = wa;
        wa <<= 1, (wa & 3932160) === 0 && (wa = 262144), jn = e;
      } else jn = 536870912;
    return e = Bt.current, e !== null && (e.flags |= 32), jn;
  }
  function qi(e, t) {
    if (t != null) {
      var n = e.stateNode, l = n.ref;
      l === null && (l = n.ref = Qg(
        _l(e.memoizedProps, n)
      )), Hi === null && (Hi = []), Hi.push(t.bind(null, l));
    }
  }
  function fn(e, t, n) {
    (e === nt && (Je === 2 || Je === 9) || e.cancelPendingCommit !== null) && ($i(e, 0), pa(
      e,
      Be,
      jn,
      !1
    )), _n(e, n), ((Ze & 2) === 0 || e !== nt) && (e === nt && ((Ze & 2) === 0 && (Ja |= n), yt === 4 && pa(
      e,
      Be,
      jn,
      !1
    )), vl(e));
  }
  function mg(e, t, n) {
    if ((Ze & 6) !== 0) throw Error(u(327));
    var l = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || ka(e, t), i = l ? Ub(e, t) : Of(e, t, !0), r = l;
    do {
      if (i === 0) {
        zi && !l && pa(e, t, 0, !1);
        break;
      } else {
        if (n = e.current.alternate, r && !zb(n)) {
          i = Of(e, t, !1), r = !1;
          continue;
        }
        if (i === 2) {
          if (r = t, e.errorRecoveryDisabledLanes & r)
            var h = 0;
          else
            h = e.pendingLanes & -536870913, h = h !== 0 ? h : h & 536870912 ? 536870912 : 0;
          if (h !== 0) {
            t = h;
            e: {
              var y = e;
              i = lc;
              var w = y.current.memoizedState.isDehydrated;
              if (w && ($i(y, h).flags |= 256), h = Of(
                y,
                h,
                !1
              ), h !== 2 && h !== 6) {
                if (wf && !w) {
                  y.errorRecoveryDisabledLanes |= r, Ja |= r, i = 4;
                  break e;
                }
                r = on, on = i, r !== null && (on === null ? on = r : on.push.apply(
                  on,
                  r
                ));
              }
              i = h;
            }
            if (r = !1, i !== 2) continue;
          }
        }
        if (i === 1) {
          $i(e, 0), pa(e, t, 0, !0);
          break;
        }
        e: {
          switch (l = e, r = i, r) {
            case 0:
            case 1:
              throw Error(u(345));
            case 4:
              if ((t & 4194048) !== t && (t & 62914560) !== t)
                break;
            case 6:
              pa(
                l,
                t,
                jn,
                !da
              );
              break e;
            case 2:
              on = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(u(329));
          }
          if ((t & 62914560) === t && (i = Yr + 300 - Xt(), 10 < i)) {
            if (pa(
              l,
              t,
              jn,
              !da
            ), Il(l, 0, !0) !== 0) break e;
            yl = t, l.timeoutHandle = Jf(
              pg.bind(
                null,
                l,
                n,
                on,
                Vr,
                kf,
                t,
                jn,
                Ja,
                Li,
                da,
                r,
                "Throttled",
                -0,
                0
              ),
              i
            );
            break e;
          }
          pg(
            l,
            n,
            on,
            Vr,
            kf,
            t,
            jn,
            Ja,
            Li,
            da,
            r,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    vl(e);
  }
  function pg(e, t, n, l, i, r, h, y, w, R, H, Y, C, z) {
    e.timeoutHandle = -1;
    var ne = t.subtreeFlags, oe = (r & 335544064) === r;
    if (Y = null, (oe || ne & 8192 || (ne & 16785408) === 16785408) && (Y = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: rl
    }, Sn = null, cg(
      t,
      r,
      Y
    ), oe && (ne = Y, oe = e.containerInfo, oe = (oe.nodeType === 9 ? oe : oe.ownerDocument).__reactViewTransition, oe != null && (ne.count++, ne.waitingForViewTransition = !0, ne = dc.bind(ne), oe.finished.then(ne, ne))), ne = (r & 62914560) === r ? Yr - Xt() : (r & 4194048) === r ? fg - Xt() : 0, ne = Bx(
      Y,
      ne
    ), ne !== null)) {
      yl = r, e.cancelPendingCommit = ne(
        jg.bind(
          null,
          e,
          t,
          r,
          n,
          l,
          i,
          h,
          y,
          w,
          R,
          H,
          Y,
          null,
          C,
          z
        )
      ), pa(e, r, h, !R);
      return;
    }
    jg(
      e,
      t,
      r,
      n,
      l,
      i,
      h,
      y,
      w,
      R,
      H,
      Y
    );
  }
  function zb(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var l = 0; l < n.length; l++) {
          var i = n[l], r = i.getSnapshot;
          i = i.value;
          try {
            if (!bn(r(), i)) return !1;
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
  function pa(e, t, n, l) {
    t = Jl(e, t), t &= ~$r, t &= ~Ja, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var i = t; 0 < i; ) {
      var r = 31 - ft(i), h = 1 << r;
      l[r] = -1, i &= ~h;
    }
    n !== 0 && Ns(e, n, t);
  }
  function Zr() {
    return (Ze & 6) === 0 ? (ic(0), !1) : !0;
  }
  function Cf() {
    if (ze !== null) {
      if (Je === 0)
        var e = ze.return;
      else
        e = ze, Ml = Ha = null, Uo(e), ki = null, Ys = 0, e = ze;
      for (; e !== null; )
        Hp(e.alternate, e), e = e.return;
      ze = null;
    }
  }
  function $i(e, t) {
    var n = e.timeoutHandle;
    return n !== -1 && (e.timeoutHandle = -1, ix(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), yl = 0, Cf(), nt = e, ze = n = Ol(e.current, null), Be = t, Je = 0, Nn = null, da = !1, zi = ka(e, t), wf = !1, Li = jn = $r = Ja = ha = yt = 0, on = lc = null, kf = !1, Bl = Jl(e, t), er(), n;
  }
  function gg(e, t) {
    Ae = null, ue.H = Tr, t === wi || t === fr ? (t = jm(), Je = 3) : t === Eo ? (t = jm(), Je = 4) : Je = t === Po ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Nn = t, ze === null && (yt = 1, wr(
      e,
      Rn(t, e.current)
    ));
  }
  function yg() {
    var e = Bt.current;
    return e === null ? !0 : (Be & 4194048) === Be ? Zt === null : (Be & 62914560) === Be || (Be & 536870912) !== 0 ? e === Zt : !1;
  }
  function vg() {
    var e = ue.H;
    return ue.H = Tr, e === null ? Tr : e;
  }
  function bg() {
    var e = ue.A;
    return ue.A = Mb, e;
  }
  function Qr() {
    yt = 4, da || (Be & 4194048) !== Be && Bt.current !== null || (zi = !0), (ha & 134217727) === 0 && (Ja & 134217727) === 0 || nt === null || pa(
      nt,
      Be,
      jn,
      !1
    );
  }
  function Of(e, t, n) {
    var l = Ze;
    Ze |= 2;
    var i = vg(), r = bg();
    (nt !== e || Be !== t) && (Vr = null, $i(e, t)), t = !1;
    var h = yt;
    e: do
      try {
        if (Je !== 0 && ze !== null) {
          var y = ze, w = Nn;
          switch (Je) {
            case 8:
              Cf(), h = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Bt.current === null && (t = !0);
              var R = Je;
              if (Je = 0, Nn = null, Yi(e, y, w, R), n && zi) {
                h = 0;
                break e;
              }
              break;
            default:
              R = Je, Je = 0, Nn = null, Yi(e, y, w, R);
          }
        }
        Lb(), h = yt;
        break;
      } catch (H) {
        gg(e, H);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Ml = Ha = null, Ze = l, ue.H = i, ue.A = r, ze === null && (nt = null, Be = 0, er()), h;
  }
  function Lb() {
    for (; ze !== null; ) xg(ze);
  }
  function Ub(e, t) {
    var n = Ze;
    Ze |= 2;
    var l = vg(), i = bg();
    nt !== e || Be !== t ? (Vr = null, Gr = Xt() + 500, $i(e, t)) : zi = ka(
      e,
      t
    );
    e: do
      try {
        if (Je !== 0 && ze !== null) {
          t = ze;
          var r = Nn;
          t: switch (Je) {
            case 1:
              Je = 0, Nn = null, Yi(e, t, r, 1);
              break;
            case 2:
            case 9:
              if (Sm(r)) {
                Je = 0, Nn = null, Sg(t);
                break;
              }
              t = function() {
                Je !== 2 && Je !== 9 || nt !== e || (Je = 7), vl(e);
              }, r.then(t, t);
              break e;
            case 3:
              Je = 7;
              break e;
            case 4:
              Je = 5;
              break e;
            case 7:
              Sm(r) ? (Je = 0, Nn = null, Sg(t)) : (Je = 0, Nn = null, Yi(e, t, r, 7));
              break;
            case 5:
              var h = null;
              switch (ze.tag) {
                case 26:
                  h = ze.memoizedState;
                case 5:
                case 27:
                  var y = ze;
                  if (h ? d0(h) : y.stateNode.complete) {
                    Je = 0, Nn = null;
                    var w = y.sibling;
                    if (w !== null) ze = w;
                    else {
                      var R = y.return;
                      R !== null ? (ze = R, Kr(R)) : ze = null;
                    }
                    break t;
                  }
              }
              Je = 0, Nn = null, Yi(e, t, r, 5);
              break;
            case 6:
              Je = 0, Nn = null, Yi(e, t, r, 6);
              break;
            case 8:
              Cf(), yt = 6;
              break e;
            default:
              throw Error(u(462));
          }
        }
        Hb();
        break;
      } catch (H) {
        gg(e, H);
      }
    while (!0);
    return Ml = Ha = null, ue.H = l, ue.A = i, Ze = n, ze !== null ? 0 : (nt = null, Be = 0, er(), yt);
  }
  function Hb() {
    for (; ze !== null && !Dc(); )
      xg(ze);
  }
  function xg(e) {
    var t = Lp(e.alternate, e, Bl);
    e.memoizedProps = e.pendingProps, t === null ? Kr(e) : ze = t;
  }
  function Sg(e) {
    var t = e, n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = _p(
          n,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Be
        );
        break;
      case 11:
        t = _p(
          n,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Be
        );
        break;
      case 5:
        Uo(t);
        var l = t;
        l === _t && (Re ? (sr(l), l.tag === 5 && l.stateNode != null && (at = l.stateNode)) : (sr(l), Re = !0));
      default:
        Hp(n, t), t = ze = om(t, Bl), t = Lp(n, t, Bl);
    }
    e.memoizedProps = e.pendingProps, t === null ? Kr(e) : ze = t;
  }
  function Yi(e, t, n, l) {
    Ml = Ha = null, Uo(t), ki = null, Ys = 0;
    var i = t.return;
    try {
      if (Tb(
        e,
        i,
        t,
        n,
        Be
      )) {
        yt = 1, wr(
          e,
          Rn(n, e.current)
        ), ze = null;
        return;
      }
    } catch (r) {
      if (i !== null) throw ze = i, r;
      yt = 1, wr(
        e,
        Rn(n, e.current)
      ), ze = null;
      return;
    }
    t.flags & 32768 ? (Re || l === 1 ? e = !0 : zi || (Be & 536870912) !== 0 ? e = !1 : (da = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = Bt.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Ng(t, e)) : Kr(t);
  }
  function Kr(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Ng(
          t,
          da
        );
        return;
      }
      e = t.return;
      var n = _b(
        t.alternate,
        t,
        Bl
      );
      if (n !== null) {
        ze = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        ze = t;
        return;
      }
      ze = t = e;
    } while (t !== null);
    yt === 0 && (yt = 5);
  }
  function Ng(e, t) {
    do {
      var n = Cb(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, ze = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        ze = e;
        return;
      }
      ze = e = n;
    } while (e !== null);
    yt = 6, ze = null;
  }
  function jg(e, t, n, l, i, r, h, y, w, R, H, Y) {
    e.cancelPendingCommit = null;
    do
      Ir();
    while (mt !== 0);
    if ((Ze & 6) !== 0) throw Error(u(327));
    if (t !== null) {
      if (t === e.current) throw Error(u(177));
      e === nt && (ze = nt = null, Be = 0), Fa = t, Jn = e, yl = n, _f = i, dg = l, Bb(
        e,
        t,
        n,
        h,
        y,
        w,
        Y
      );
    }
  }
  function Bb(e, t, n, l, i, r, h) {
    var y = t.lanes | t.childLanes;
    if (Af = y, y |= oo, $u(
      e,
      n,
      y,
      l,
      i,
      r
    ), Hi = null, (n & 335544064) === n ? (Bi = hb(e), l = 10262) : (Bi = null, l = 10256), (t.subtreeFlags & l) !== 0 || (t.flags & l) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Xb(Gn, function() {
      return zf(), null;
    })) : (e.callbackNode = null, e.callbackPriority = 0), Dr = !1, l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
      l = ue.T, ue.T = null, i = Se.p, Se.p = 2, r = Ze, Ze |= 4;
      try {
        Ob(e, t, n);
      } finally {
        Ze = r, Se.p = i, ue.T = l;
      }
    }
    mt = 1, Dr ? Ui = fx(
      h,
      e.containerInfo,
      Bi,
      Rf,
      Mf,
      $b,
      Df,
      zf,
      qb
    ) : (Rf(), Mf(), Df());
  }
  function qb(e) {
    if (mt !== 0) {
      var t = Jn.onRecoverableError;
      t(e, { componentStack: null });
    }
  }
  function $b() {
    mt === 3 && (mt = 0, ig(Fa, Jn), mt = 4);
  }
  function Rf() {
    if (mt === 1) {
      mt = 0;
      var e = Jn, t = Fa, n = yl, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = ue.T, ue.T = null;
        var i = Se.p;
        Se.p = 2;
        var r = Ze;
        Ze |= 4;
        try {
          ec = Ur = !1, lg(t, e, n), n = Qf;
          var h = em(e.containerInfo), y = n.focusedElem, w = n.selectionRange;
          if (h !== y && y && y.ownerDocument && Wh(
            y.ownerDocument.documentElement,
            y
          )) {
            if (w !== null && io(y)) {
              var R = w.start, H = w.end;
              if (H === void 0 && (H = R), "selectionStart" in y)
                y.selectionStart = R, y.selectionEnd = Math.min(
                  H,
                  y.value.length
                );
              else {
                var Y = y.ownerDocument || document, C = Y && Y.defaultView || window;
                if (C.getSelection) {
                  var z = C.getSelection(), ne = y.textContent.length, oe = Math.min(w.start, ne), _e = w.end === void 0 ? oe : Math.min(w.end, ne);
                  !z.extend && oe > _e && (h = _e, _e = oe, oe = h);
                  var O = Ph(
                    y,
                    oe
                  ), A = Ph(
                    y,
                    _e
                  );
                  if (O && A && (z.rangeCount !== 1 || z.anchorNode !== O.node || z.anchorOffset !== O.offset || z.focusNode !== A.node || z.focusOffset !== A.offset)) {
                    var D = Y.createRange();
                    D.setStart(O.node, O.offset), z.removeAllRanges(), oe > _e ? (z.addRange(D), z.extend(A.node, A.offset)) : (D.setEnd(A.node, A.offset), z.addRange(D));
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
              var $ = Y[y];
              $.element.scrollLeft = $.left, $.element.scrollTop = $.top;
            }
          }
          Ji = !!Zf, Qf = Zf = null;
        } finally {
          Ze = r, Se.p = i, ue.T = l;
        }
      }
      e.current = t, mt = 2;
    }
  }
  function Mf() {
    if (mt === 2) {
      mt = 0;
      var e = Jn, t = Fa, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = ue.T, ue.T = null;
        var l = Se.p;
        Se.p = 2;
        var i = Ze;
        Ze |= 4;
        try {
          Fp(e, t.alternate, t);
        } finally {
          Ze = i, Se.p = l, ue.T = n;
        }
      }
      mt = 3;
    }
  }
  function Df() {
    if (mt === 4 || mt === 3) {
      mt = 0;
      var e = Ui;
      Ui = null, zc();
      var t = Jn, n = Fa, l = yl, i = dg, r = (l & 335544064) === l ? 10262 : 10256;
      if ((n.subtreeFlags & r) !== 0 || (n.flags & r) !== 0 ? mt = 5 : (mt = 0, Fa = Jn = null, Eg(t, t.pendingLanes)), r = t.pendingLanes, r === 0 && (ma = null), Es(l), n = n.stateNode, At && typeof At.onCommitFiberRoot == "function")
        try {
          At.onCommitFiberRoot(
            Zl,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (i !== null) {
        n = ue.T, r = Se.p, Se.p = 2, ue.T = null;
        try {
          for (var h = t.onRecoverableError, y = 0; y < i.length; y++) {
            var w = i[y];
            h(w.value, {
              componentStack: w.stack
            });
          }
        } finally {
          ue.T = n, Se.p = r;
        }
      }
      if (i = Hi, h = Bi, Bi = null, i !== null && (Hi = null, h === null && (h = []), e !== null))
        for (w = 0; w < i.length; w++)
          n = (0, i[w])(
            h
          ), n !== void 0 && e.finished.finally(n);
      (yl & 3) !== 0 && Ir(), vl(t), r = t.pendingLanes, (l & 261930) !== 0 && (r & 42) !== 0 ? t === Xr ? ac++ : (ac = 0, Xr = t) : (ac = 0, Xr = null), ic(0);
    }
  }
  function Eg(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Bs(t)));
  }
  function Ir() {
    return Ui !== null && (Ui.skipTransition(), Ui = null), Rf(), Mf(), Df(), zf();
  }
  function zf() {
    if (mt !== 5) return !1;
    var e = Jn, t = Af;
    Af = 0;
    var n = Es(yl), l = ue.T, i = Se.p;
    try {
      Se.p = 32 > n ? 32 : n, ue.T = null, n = _f, _f = null;
      var r = Jn, h = yl;
      if (mt = 0, Fa = Jn = null, yl = 0, (Ze & 6) !== 0) throw Error(u(331));
      var y = Ze;
      if (Ze |= 4, ug(r.current), sg(
        r,
        r.current,
        h,
        n
      ), Ze = y, ic(0, !1), At && typeof At.onPostCommitFiberRoot == "function")
        try {
          At.onPostCommitFiberRoot(Zl, r);
        } catch {
        }
      return !0;
    } finally {
      Se.p = i, ue.T = l, Eg(e, t);
    }
  }
  function Tg(e, t, n) {
    t = Rn(n, t), t = Fo(e.stateNode, t, 2), e = sa(e, t, 2), e !== null && (_n(e, 2), vl(e));
  }
  function Fe(e, t, n) {
    if (e.tag === 3)
      Tg(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Tg(
            t,
            e,
            n
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (ma === null || !ma.has(l))) {
            e = Rn(n, e), n = Sp(2), l = sa(t, n, 2), l !== null && (Np(
              n,
              l,
              t,
              e
            ), _n(l, 2), vl(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function Lf(e, t, n) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new Db();
      var i = /* @__PURE__ */ new Set();
      l.set(t, i);
    } else
      i = l.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), l.set(t, i));
    i.has(n) || (wf = !0, i.add(n), e = Yb.bind(null, e, t, n), t.then(e, e));
  }
  function Yb(e, t, n) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, nt === e && (Be & n) === n && ((yt === 4 || yt === 3 && (Be & 62914560) === Be && 300 > Xt() - Yr) && (Ze & 2) === 0 ? $i(e, 0) : $r |= n, Li === Be && (Li = 0)), vl(e);
  }
  function wg(e, t) {
    t === 0 && (t = Bc()), e = za(e, t), e !== null && (_n(e, t), vl(e));
  }
  function Gb(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), wg(e, n);
  }
  function Vb(e, t) {
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
        throw Error(u(314));
    }
    l !== null && l.delete(t), wg(e, n);
  }
  function Xb(e, t) {
    return Qe(e, t);
  }
  var Gi = null, Vi = null, Uf = !1, Jr = !1, Hf = !1, ga = 0;
  function vl(e) {
    e !== Vi && e.next === null && (Vi === null ? Gi = Vi = e : Vi = Vi.next = e), Jr = !0, Uf || (Uf = !0, Qb());
  }
  function ic(e, t) {
    if (!Hf && Jr) {
      Hf = !0;
      do
        for (var n = !1, l = Gi; l !== null; ) {
          if (e !== 0) {
            var i = l.pendingLanes;
            if (i === 0) var r = 0;
            else {
              var h = l.suspendedLanes, y = l.pingedLanes;
              r = (1 << 31 - ft(42 | e) + 1) - 1, r &= i & ~(h & ~y), r = r & 201326741 ? r & 201326741 | 1 : r ? r | 2 : 0;
            }
            r !== 0 && (n = !0, Cg(l, r));
          } else
            r = Be, r = Il(
              l,
              l === nt ? r : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (r & 3) === 0 || ka(l, r) || (n = !0, Cg(l, r));
          l = l.next;
        }
      while (n);
      Hf = !1;
    }
  }
  function Zb() {
    kg();
  }
  function kg() {
    Jr = Uf = !1;
    var e = 0;
    ga !== 0 && ax() && (e = ga);
    for (var t = Xt(), n = null, l = Gi; l !== null; ) {
      var i = l.next, r = Ag(l, t);
      r === 0 ? (l.next = null, n === null ? Gi = i : n.next = i, i === null && (Vi = n)) : (n = l, (e !== 0 || (r & 3) !== 0) && (Jr = !0)), l = i;
    }
    mt !== 0 && mt !== 5 || ic(e), ga !== 0 && (ga = 0);
  }
  function Ag(e, t) {
    for (var n = e.suspendedLanes, l = e.pingedLanes, i = e.expirationTimes, r = e.pendingLanes & -62914561; 0 < r; ) {
      var h = 31 - ft(r), y = 1 << h, w = i[h];
      w === -1 ? ((y & n) === 0 || (y & l) !== 0) && (i[h] = qu(y, t)) : w <= t && (e.expiredLanes |= y), r &= ~y;
    }
    if (t = nt, n = Be, n = Il(
      e,
      e === t ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, n === 0 || e === t && (Je === 2 || Je === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && ot(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((n & 3) === 0 || ka(e, n)) {
      if (t = n & -n, t === e.callbackPriority) return t;
      switch (l !== null && ot(l), Es(n)) {
        case 2:
        case 8:
          n = Tl;
          break;
        case 32:
          n = Gn;
          break;
        case 268435456:
          n = bs;
          break;
        default:
          n = Gn;
      }
      return l = _g.bind(null, e), n = Qe(n, l), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return l !== null && l !== null && ot(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function _g(e, t) {
    if (mt !== 0 && mt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if (Ir() && e.callbackNode !== n)
      return null;
    var l = Be;
    return l = Il(
      e,
      e === nt ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (mg(e, l, t), Ag(e, Xt()), e.callbackNode != null && e.callbackNode === n ? _g.bind(null, e) : null);
  }
  function Cg(e, t) {
    if (Ir()) return null;
    mg(e, t, !0);
  }
  function Qb() {
    sx(function() {
      (Ze & 6) !== 0 ? Qe(
        ri,
        Zb
      ) : kg();
    });
  }
  function Bf() {
    if (ga === 0) {
      var e = $a;
      e === 0 && (e = ui, ui <<= 1, (ui & 261888) === 0 && (ui = 256)), ga = e;
    }
    return ga;
  }
  function Og(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Zc(e);
  }
  function Kb(e, t, n, l, i) {
    if (t === "submit" && n && n.stateNode === i) {
      var r = Og(
        (i[zt] || null).action
      ), h = l.submitter;
      h && (t = (t = h[zt] || null) ? Og(t.formAction) : h.getAttribute("formAction"), t !== null && (r = t, h = null));
      var y = new Jc(
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
                if (ga !== 0) {
                  var w = new FormData(i, h);
                  Zo(
                    n,
                    {
                      pending: !0,
                      data: w,
                      method: i.method,
                      action: r
                    },
                    null,
                    w
                  );
                }
              } else
                typeof r == "function" && (y.preventDefault(), w = new FormData(i, h), Zo(
                  n,
                  {
                    pending: !0,
                    data: w,
                    method: i.method,
                    action: r
                  },
                  r,
                  w
                ));
            },
            currentTarget: i
          }
        ]
      });
    }
  }
  for (var qf = 0; qf < uo.length; qf++) {
    var $f = uo[qf], Ib = $f.toLowerCase(), Jb = $f[0].toUpperCase() + $f.slice(1);
    Zn(
      Ib,
      "on" + Jb
    );
  }
  Zn(lm, "onAnimationEnd"), Zn(am, "onAnimationIteration"), Zn(im, "onAnimationStart"), Zn("dblclick", "onDoubleClick"), Zn("focusin", "onFocus"), Zn("focusout", "onBlur"), Zn(ib, "onTransitionRun"), Zn(sb, "onTransitionStart"), Zn(cb, "onTransitionCancel"), Zn(sm, "onTransitionEnd"), kl("onMouseEnter", ["mouseout", "mouseover"]), kl("onMouseLeave", ["mouseout", "mouseover"]), kl("onPointerEnter", ["pointerout", "pointerover"]), kl("onPointerLeave", ["pointerout", "pointerover"]), wl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), wl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), wl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), wl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), wl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), wl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var sc = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Fb = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(sc)
  );
  function Rg(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var l = e[n], i = l.event;
      l = l.listeners;
      e: {
        var r = void 0;
        if (t)
          for (var h = l.length - 1; 0 <= h; h--) {
            var y = l[h], w = y.instance, R = y.currentTarget;
            if (y = y.listener, w !== r && i.isPropagationStopped())
              break e;
            r = y, i.currentTarget = R;
            try {
              r(i);
            } catch (H) {
              Wc(H);
            }
            i.currentTarget = null, r = w;
          }
        else
          for (h = 0; h < l.length; h++) {
            if (y = l[h], w = y.instance, R = y.currentTarget, y = y.listener, w !== r && i.isPropagationStopped())
              break e;
            r = y, i.currentTarget = R;
            try {
              r(i);
            } catch (H) {
              Wc(H);
            }
            i.currentTarget = null, r = w;
          }
      }
    }
  }
  function Le(e, t) {
    var n = t[il];
    n === void 0 && (n = t[il] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    n.has(l) || (Mg(t, e, 2, !1), n.add(l));
  }
  function Yf(e, t, n) {
    var l = 0;
    t && (l |= 4), Mg(
      n,
      e,
      l,
      t
    );
  }
  var Fr = "_reactListening" + Math.random().toString(36).slice(2);
  function Gf(e) {
    if (!e[Fr]) {
      e[Fr] = !0, Yc.forEach(function(n) {
        n !== "selectionchange" && (Fb.has(n) || Yf(n, !1, e), Yf(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Fr] || (t[Fr] = !0, Yf("selectionchange", !1, t));
    }
  }
  function Mg(e, t, n, l) {
    switch (N0(t)) {
      case 2:
        var i = Gx;
        break;
      case 8:
        i = Vx;
        break;
      default:
        i = ud;
    }
    n = i.bind(
      null,
      t,
      n,
      e
    ), i = void 0, !Iu || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), l ? i !== void 0 ? e.addEventListener(t, n, {
      capture: !0,
      passive: i
    }) : e.addEventListener(t, n, !0) : i !== void 0 ? e.addEventListener(t, n, {
      passive: i
    }) : e.addEventListener(t, n, !1);
  }
  function Vf(e, t, n, l, i) {
    var r = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var h = l.tag;
        if (h === 3 || h === 4) {
          var y = l.stateNode.containerInfo;
          if (y === i) break;
          if (h === 4)
            for (h = l.return; h !== null; ) {
              var w = h.tag;
              if ((w === 3 || w === 4) && h.stateNode.containerInfo === i)
                return;
              h = h.return;
            }
          for (; y !== null; ) {
            if (h = Cn(y), h === null) return;
            if (w = h.tag, w === 5 || w === 6 || w === 26 || w === 27) {
              l = r = h;
              continue e;
            }
            y = y.parentNode;
          }
        }
        l = l.return;
      }
    Mh(function() {
      var R = r, H = Qu(n), Y = [];
      e: {
        var C = cm.get(e);
        if (C !== void 0) {
          var z = Jc, ne = e;
          switch (e) {
            case "keypress":
              if (Kc(n) === 0) break e;
            case "keydown":
            case "keyup":
              z = z1;
              break;
            case "focusin":
              ne = "focus", z = Wu;
              break;
            case "focusout":
              ne = "blur", z = Wu;
              break;
            case "beforeblur":
            case "afterblur":
              z = Wu;
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
              z = Lh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              z = j1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              z = q1;
              break;
            case lm:
            case am:
            case im:
              z = w1;
              break;
            case sm:
              z = Y1;
              break;
            case "scroll":
            case "scrollend":
              z = S1;
              break;
            case "wheel":
              z = V1;
              break;
            case "copy":
            case "cut":
            case "paste":
              z = A1;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              z = Hh;
              break;
            case "submit":
              z = H1;
              break;
            case "toggle":
            case "beforetoggle":
              z = Z1;
          }
          var oe = (t & 4) !== 0, _e = !oe && (e === "scroll" || e === "scrollend"), O = oe ? C !== null ? C + "Capture" : null : C;
          oe = [];
          for (var A = R, D; A !== null; ) {
            var $ = A;
            if (D = $.stateNode, $ = $.tag, $ !== 5 && $ !== 26 && $ !== 27 || D === null || O === null || ($ = As(A, O), $ != null && oe.push(
              cc(A, $, D)
            )), _e) break;
            A = A.return;
          }
          0 < oe.length && (C = new z(
            C,
            ne,
            null,
            n,
            H
          ), Y.push({ event: C, listeners: oe }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (z = e === "mouseover" || e === "pointerover", C = e === "mouseout" || e === "pointerout", z && n !== Zu && (ne = n.relatedTarget || n.fromElement) && (Cn(ne) || ne[Xn]))
            break e;
          (C || z) && (ne = H.window === H ? H : (z = H.ownerDocument) ? z.defaultView || z.parentWindow : window, C ? (z = n.relatedTarget || n.toElement, C = R, z = z ? Cn(z) : null, z !== null && (_e = d(z), oe = z.tag, z !== _e || oe !== 5 && oe !== 27 && oe !== 6) && (z = null)) : (C = null, z = R), C !== z && (oe = Lh, $ = "onMouseLeave", O = "onMouseEnter", A = "mouse", (e === "pointerout" || e === "pointerover") && (oe = Hh, $ = "onPointerLeave", O = "onPointerEnter", A = "pointer"), _e = C == null ? ne : cl(C), D = z == null ? ne : cl(z), ne = new oe(
            $,
            A + "leave",
            C,
            n,
            H
          ), ne.target = _e, ne.relatedTarget = D, $ = null, Cn(H) === R && (oe = new oe(
            O,
            A + "enter",
            z,
            n,
            H
          ), oe.target = D, oe.relatedTarget = _e, $ = oe), _e = $, oe = C && z ? B(
            C,
            z,
            Pb
          ) : null, C !== null && Dg(
            Y,
            ne,
            C,
            oe,
            !1
          ), z !== null && _e !== null && Dg(
            Y,
            _e,
            z,
            oe,
            !0
          )));
        }
        e: {
          if (C = R ? cl(R) : window, z = C.nodeName && C.nodeName.toLowerCase(), z === "select" || z === "input" && C.type === "file")
            var se = Zh;
          else if (Vh(C))
            if (Qh)
              se = nb;
            else {
              se = eb;
              var qe = W1;
            }
          else
            z = C.nodeName, !z || z.toLowerCase() !== "input" || C.type !== "checkbox" && C.type !== "radio" ? R && Xu(R.elementType) && (se = Zh) : se = tb;
          if (se && (se = se(e, R))) {
            Xh(
              Y,
              se,
              n,
              H
            );
            break e;
          }
          qe && qe(e, C, R);
        }
        switch (qe = R ? cl(R) : window, e) {
          case "focusin":
            (Vh(qe) || qe.contentEditable === "true") && (vi = qe, so = R, Ls = null);
            break;
          case "focusout":
            Ls = so = vi = null;
            break;
          case "mousedown":
            co = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            co = !1, tm(Y, n, H);
            break;
          case "selectionchange":
            if (ab) break;
          case "keydown":
          case "keyup":
            tm(Y, n, H);
        }
        var ge;
        if (to)
          e: {
            switch (e) {
              case "compositionstart":
                var je = "onCompositionStart";
                break e;
              case "compositionend":
                je = "onCompositionEnd";
                break e;
              case "compositionupdate":
                je = "onCompositionUpdate";
                break e;
            }
            je = void 0;
          }
        else
          yi ? Yh(e, n) && (je = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (je = "onCompositionStart");
        je && (Bh && n.locale !== "ko" && (yi || je !== "onCompositionStart" ? je === "onCompositionEnd" && yi && (ge = Dh()) : (Fl = H, Ju = "value" in Fl ? Fl.value : Fl.textContent, yi = !0)), qe = Pr(R, je), 0 < qe.length && (je = new Uh(
          je,
          e,
          null,
          n,
          H
        ), Y.push({ event: je, listeners: qe }), ge ? je.data = ge : (ge = Gh(n), ge !== null && (je.data = ge)))), (ge = K1 ? I1(e, n) : J1(e, n)) && (je = Pr(R, "onBeforeInput"), 0 < je.length && (qe = new Uh(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          H
        ), Y.push({
          event: qe,
          listeners: je
        }), qe.data = ge)), Kb(
          Y,
          e,
          R,
          n,
          H
        );
      }
      Rg(Y, t);
    });
  }
  function cc(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function Pr(e, t) {
    for (var n = t + "Capture", l = []; e !== null; ) {
      var i = e, r = i.stateNode;
      if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || r === null || (i = As(e, n), i != null && l.unshift(
        cc(e, i, r)
      ), i = As(e, t), i != null && l.push(
        cc(e, i, r)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function Pb(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Dg(e, t, n, l, i) {
    for (var r = t._reactName, h = []; n !== null && n !== l; ) {
      var y = n, w = y.alternate, R = y.stateNode;
      if (y = y.tag, w !== null && w === l) break;
      y !== 5 && y !== 26 && y !== 27 || R === null || (w = R, i ? (R = As(n, r), R != null && h.unshift(
        cc(n, R, w)
      )) : i || (R = As(n, r), R != null && h.push(
        cc(n, R, w)
      ))), n = n.return;
    }
    h.length !== 0 && e.push({ event: t, listeners: h });
  }
  var Wb = /\r\n?/g, ex = /\u0000|\uFFFD/g;
  function zg(e) {
    return (typeof e == "string" ? e : "" + e).replace(Wb, `
`).replace(ex, "");
  }
  function Lg(e, t) {
    return t = zg(t), zg(e) === t;
  }
  function Pe(e, t, n, l, i, r) {
    switch (n) {
      case "children":
        if (typeof l == "string")
          t === "body" || t === "textarea" && l === "" || pt(e, l);
        else if (typeof l == "number" || typeof l == "bigint")
          t !== "body" && pt(e, "" + l);
        else return;
        break;
      case "className":
        Ra(e, "class", l);
        break;
      case "tabIndex":
        Ra(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ra(e, n, l);
        break;
      case "style":
        Oh(e, l, r);
        return;
      case "data":
        if (t !== "object") {
          Ra(e, "data", l);
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
        l = Zc(l), e.setAttribute(n, l);
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
          typeof r == "function" && (n === "formAction" ? (t !== "input" && Pe(e, t, "name", i.name, i, null), Pe(
            e,
            t,
            "formEncType",
            i.formEncType,
            i,
            null
          ), Pe(
            e,
            t,
            "formMethod",
            i.formMethod,
            i,
            null
          ), Pe(
            e,
            t,
            "formTarget",
            i.formTarget,
            i,
            null
          )) : (Pe(e, t, "encType", i.encType, i, null), Pe(e, t, "method", i.method, i, null), Pe(e, t, "target", i.target, i, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(n);
          break;
        }
        l = Zc(l), e.setAttribute(n, l);
        break;
      case "onClick":
        l != null && (e.onclick = rl);
        return;
      case "onScroll":
        l != null && Le("scroll", e);
        return;
      case "onScrollEnd":
        l != null && Le("scrollend", e);
        return;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(u(61));
          if (n = l.__html, n != null) {
            if (i.children != null) throw Error(u(60));
            r?.__html !== n && (e.innerHTML = n);
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
        n = Zc(l), e.setAttributeNS(
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
        Le("beforetoggle", e), Le("toggle", e), hi(e, "popover", l);
        break;
      case "xlinkActuate":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        sn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        sn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        sn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        hi(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N")
          n = b1.get(n) || n, hi(e, n, l);
        else return;
    }
    $e = !0;
  }
  function Xf(e, t, n, l, i, r) {
    switch (n) {
      case "style":
        Oh(e, l, r);
        return;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(u(61));
          if (n = l.__html, n != null) {
            if (i.children != null) throw Error(u(60));
            r?.__html !== n && (e.innerHTML = n);
          }
        }
        break;
      case "children":
        if (typeof l == "string") pt(e, l);
        else if (typeof l == "number" || typeof l == "bigint")
          pt(e, "" + l);
        else return;
        break;
      case "onScroll":
        l != null && Le("scroll", e);
        return;
      case "onScrollEnd":
        l != null && Le("scrollend", e);
        return;
      case "onClick":
        l != null && (e.onclick = rl);
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
        if (!Oa.hasOwnProperty(n))
          e: {
            if (n[0] === "o" && n[1] === "n" && (i = n.endsWith("Capture"), r = n.slice(2, i ? n.length - 7 : void 0), t = e[zt] || null, t = t != null ? t[n] : null, typeof t == "function" && e.removeEventListener(r, t, i), typeof l == "function")) {
              typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(r, l, i);
              break e;
            }
            $e = !0, n in e ? e[n] = l : l === !0 ? e.setAttribute(n, "") : hi(e, n, l);
          }
        return;
    }
    $e = !0;
  }
  function Yt(e, t, n) {
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
        Le("error", e), Le("load", e);
        var l = !1, i = !1, r;
        for (r in n)
          if (n.hasOwnProperty(r)) {
            var h = n[r];
            if (h != null)
              switch (r) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  i = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(u(137, t));
                default:
                  Pe(e, t, r, h, n, null);
              }
          }
        i && Pe(e, t, "srcSet", n.srcSet, n, null), l && Pe(e, t, "src", n.src, n, null);
        return;
      case "input":
        Le("invalid", e);
        var y = r = h = i = null, w = null, R = null;
        for (l in n)
          if (n.hasOwnProperty(l)) {
            var H = n[l];
            if (H != null)
              switch (l) {
                case "name":
                  i = H;
                  break;
                case "type":
                  h = H;
                  break;
                case "checked":
                  w = H;
                  break;
                case "defaultChecked":
                  R = H;
                  break;
                case "value":
                  r = H;
                  break;
                case "defaultValue":
                  y = H;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (H != null)
                    throw Error(u(137, t));
                  break;
                default:
                  Pe(e, t, l, H, n, null);
              }
          }
        Ie(
          e,
          r,
          y,
          w,
          R,
          h,
          i,
          !1
        );
        return;
      case "select":
        Le("invalid", e), l = h = r = null;
        for (i in n)
          if (n.hasOwnProperty(i) && (y = n[i], y != null))
            switch (i) {
              case "value":
                r = y;
                break;
              case "defaultValue":
                h = y;
                break;
              case "multiple":
                l = y;
              default:
                Pe(e, t, i, y, n, null);
            }
        t = r, n = h, e.multiple = !!l, t != null ? bt(e, !!l, t, !1) : n != null && bt(e, !!l, n, !0);
        return;
      case "textarea":
        Le("invalid", e), r = i = l = null;
        for (h in n)
          if (n.hasOwnProperty(h) && (y = n[h], y != null))
            switch (h) {
              case "value":
                l = y;
                break;
              case "defaultValue":
                i = y;
                break;
              case "children":
                r = y;
                break;
              case "dangerouslySetInnerHTML":
                if (y != null) throw Error(u(91));
                break;
              default:
                Pe(e, t, h, y, n, null);
            }
        mi(e, l, i, r);
        return;
      case "option":
        for (w in n)
          if (n.hasOwnProperty(w) && (l = n[w], l != null))
            switch (w) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                Pe(e, t, w, l, n, null);
            }
        return;
      case "dialog":
        Le("beforetoggle", e), Le("toggle", e), Le("cancel", e), Le("close", e);
        break;
      case "iframe":
      case "object":
        Le("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < sc.length; l++)
          Le(sc[l], e);
        break;
      case "image":
        Le("error", e), Le("load", e);
        break;
      case "details":
        Le("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Le("error", e), Le("load", e);
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
                throw Error(u(137, t));
              default:
                Pe(e, t, R, l, n, null);
            }
        return;
      default:
        if (Xu(t)) {
          for (H in n)
            n.hasOwnProperty(H) && (l = n[H], l !== void 0 && Xf(
              e,
              t,
              H,
              l,
              n,
              void 0
            ));
          return;
        }
    }
    for (y in n)
      n.hasOwnProperty(y) && (l = n[y], l != null && Pe(e, t, y, l, n, null));
  }
  var tx = {};
  function nx(e, t, n, l) {
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
        var i = null, r = null, h = null, y = null, w = null, R = null, H = null;
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
                l.hasOwnProperty(z) || Pe(e, t, z, null, l, Y);
            }
        }
        for (var C in l) {
          var z = l[C];
          if (Y = n[C], l.hasOwnProperty(C) && (z != null || Y != null))
            switch (C) {
              case "type":
                z !== Y && ($e = !0), r = z;
                break;
              case "name":
                z !== Y && ($e = !0), i = z;
                break;
              case "checked":
                z !== Y && ($e = !0), R = z;
                break;
              case "defaultChecked":
                z !== Y && ($e = !0), H = z;
                break;
              case "value":
                z !== Y && ($e = !0), h = z;
                break;
              case "defaultValue":
                z !== Y && ($e = !0), y = z;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (z != null)
                  throw Error(u(137, t));
                break;
              default:
                z !== Y && Pe(
                  e,
                  t,
                  C,
                  z,
                  l,
                  Y
                );
            }
        }
        Ne(
          e,
          h,
          y,
          w,
          R,
          H,
          r,
          i
        );
        return;
      case "select":
        z = h = y = C = null;
        for (r in n)
          if (w = n[r], n.hasOwnProperty(r) && w != null)
            switch (r) {
              case "value":
                break;
              case "multiple":
                z = w;
              default:
                l.hasOwnProperty(r) || Pe(
                  e,
                  t,
                  r,
                  null,
                  l,
                  w
                );
            }
        for (i in l)
          if (r = l[i], w = n[i], l.hasOwnProperty(i) && (r != null || w != null))
            switch (i) {
              case "value":
                r !== w && ($e = !0), C = r;
                break;
              case "defaultValue":
                r !== w && ($e = !0), y = r;
                break;
              case "multiple":
                r !== w && ($e = !0), h = r;
              default:
                r !== w && Pe(
                  e,
                  t,
                  i,
                  r,
                  l,
                  w
                );
            }
        t = y, n = h, l = z, C != null ? bt(e, !!n, C, !1) : !!l != !!n && (t != null ? bt(e, !!n, t, !0) : bt(e, !!n, n ? [] : "", !1));
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
                Pe(e, t, y, null, l, i);
            }
        for (h in l)
          if (i = l[h], r = n[h], l.hasOwnProperty(h) && (i != null || r != null))
            switch (h) {
              case "value":
                i !== r && ($e = !0), C = i;
                break;
              case "defaultValue":
                i !== r && ($e = !0), z = i;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (i != null) throw Error(u(91));
                break;
              default:
                i !== r && Pe(e, t, h, i, l, r);
            }
        Ut(e, C, z);
        return;
      case "option":
        for (var ne in n)
          if (C = n[ne], n.hasOwnProperty(ne) && C != null && !l.hasOwnProperty(ne))
            switch (ne) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Pe(
                  e,
                  t,
                  ne,
                  null,
                  l,
                  C
                );
            }
        for (w in l)
          if (C = l[w], z = n[w], l.hasOwnProperty(w) && C !== z && (C != null || z != null))
            switch (w) {
              case "selected":
                C !== z && ($e = !0), e.selected = C && typeof C != "function" && typeof C != "symbol";
                break;
              default:
                Pe(
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
        for (var oe in n)
          C = n[oe], n.hasOwnProperty(oe) && C != null && !l.hasOwnProperty(oe) && Pe(e, t, oe, null, l, C);
        for (R in l)
          if (C = l[R], z = n[R], l.hasOwnProperty(R) && C !== z && (C != null || z != null))
            switch (R) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (C != null)
                  throw Error(u(137, t));
                break;
              default:
                Pe(
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
        if (Xu(t)) {
          for (var _e in n)
            C = n[_e], n.hasOwnProperty(_e) && C !== void 0 && !l.hasOwnProperty(_e) && Xf(
              e,
              t,
              _e,
              void 0,
              l,
              C
            );
          for (H in l)
            C = l[H], z = n[H], !l.hasOwnProperty(H) || C === z || C === void 0 && z === void 0 || Xf(
              e,
              t,
              H,
              C,
              l,
              z
            );
          return;
        }
    }
    for (var O in n)
      C = n[O], n.hasOwnProperty(O) && C != null && !l.hasOwnProperty(O) && Pe(e, t, O, null, l, C);
    for (Y in l)
      C = l[Y], z = n[Y], !l.hasOwnProperty(Y) || C === z || C == null && z == null || Pe(e, t, Y, C, l, z);
  }
  function Ug(e) {
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
  function lx() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), l = 0; l < n.length; l++) {
        var i = n[l], r = i.transferSize, h = i.initiatorType, y = i.duration;
        if (r && y && Ug(h)) {
          for (h = 0, y = i.responseEnd, l += 1; l < n.length; l++) {
            var w = n[l], R = w.startTime;
            if (R > y) break;
            var H = w.transferSize, Y = w.initiatorType;
            H && Ug(Y) && (w = w.responseEnd, h += H * (w < y ? 1 : (y - R) / (w - R)));
          }
          if (--l, t += 8 * (r + h) / (i.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Zf = null, Qf = null;
  function rc(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Hg(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Bg(e, t) {
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
  function qg(e, t, n, l) {
    return n = rc(
      n
    ).createElement(e), n[lt] = l, n[zt] = t, Yt(n, e, t), dt(n), n;
  }
  function Kf(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var If = null;
  function ax() {
    var e = window.event;
    return e && e.type === "popstate" ? e === If ? !1 : (If = e, !0) : (If = null, !1);
  }
  var Jf = typeof setTimeout == "function" ? setTimeout : void 0, ix = typeof clearTimeout == "function" ? clearTimeout : void 0, $g = typeof Promise == "function" ? Promise : void 0, Yg = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Jf, sx = typeof queueMicrotask == "function" ? queueMicrotask : typeof $g < "u" ? function(e) {
    return $g.resolve(null).then(e).catch(cx);
  } : Jf;
  function cx(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ya(e) {
    return e === "head";
  }
  function Gg(e, t) {
    var n = t, l = 0;
    do {
      var i = n.nextSibling;
      if (e.removeChild(n), i && i.nodeType === 8)
        if (n = i.data, n === "/$" || n === "/&") {
          if (l === 0) {
            e.removeChild(i), Fi(t);
            return;
          }
          l--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          l++;
        else if (n === "html")
          ad(
            e.ownerDocument.documentElement
          );
        else if (n === "head") {
          n = e.ownerDocument.head, ad(n);
          for (var r = n.firstChild; r; ) {
            var h = r.nextSibling, y = r.nodeName;
            r[Aa] || y === "SCRIPT" || y === "STYLE" || y === "LINK" && r.rel.toLowerCase() === "stylesheet" || n.removeChild(r), r = h;
          }
        } else
          n === "body" && ad(e.ownerDocument.body);
      n = i;
    } while (n);
    Fi(t);
  }
  function Vg(e, t) {
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
  function Xg(e, t, n) {
    if (t = CSS.escape(t) !== t ? "r-" + btoa(t).replace(/=/g, "") : t, e.style.viewTransitionName = t, n != null && (e.style.viewTransitionClass = n), n = getComputedStyle(e), n.display === "inline") {
      if (t = e.getClientRects(), t.length === 1) var l = 1;
      else
        for (var i = l = 0; i < t.length; i++) {
          var r = t[i];
          0 < r.width && 0 < r.height && l++;
        }
      l === 1 && (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + n.paddingTop, e.marginBottom = "-" + n.paddingBottom);
    }
  }
  function Zg(e, t) {
    e = e.style, t = t.style;
    var n = t != null ? t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null : null;
    e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t != null ? t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n != null ? e.margin = n : (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t)));
  }
  function rx(e, t, n) {
    return n = n.ownerDocument.defaultView, {
      rect: e,
      abs: t.position === "absolute" || t.position === "fixed",
      clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
      view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth
    };
  }
  function Ff(e) {
    var t = e.getBoundingClientRect(), n = getComputedStyle(e);
    return rx(t, n, e);
  }
  function ux(e) {
    return e.documentElement.clientHeight;
  }
  function ox(e) {
    this.addEventListener("load", e), this.addEventListener("error", e);
  }
  function fx(e, t, n, l, i, r, h, y, w) {
    var R = t.nodeType === 9 ? t : t.ownerDocument;
    try {
      var H = R.startViewTransition({
        update: function() {
          var C = R.defaultView, z = C.navigation && C.navigation.transition, ne = R.fonts.status;
          l();
          var oe = [];
          if (ne === "loaded" && (ux(R), R.fonts.status === "loading" && oe.push(R.fonts.ready)), ne = oe.length, e !== null)
            for (var _e = e.suspenseyImages, O = 0, A = 0; A < _e.length; A++) {
              var D = _e[A];
              if (!D.complete) {
                var $ = D.getBoundingClientRect();
                if (0 < $.bottom && 0 < $.right && $.top < C.innerHeight && $.left < C.innerWidth) {
                  if (O += h0(D), O > tu) {
                    oe.length = ne;
                    break;
                  }
                  D = new Promise(
                    ox.bind(D)
                  ), oe.push(D);
                }
              }
            }
          if (0 < oe.length)
            return C = Promise.race([
              Promise.all(oe),
              new Promise(function(se) {
                return setTimeout(se, 500);
              })
            ]).then(i, i), (z ? Promise.allSettled([z.finished, C]) : C).then(r, r);
          if (i(), z)
            return z.finished.then(
              r,
              r
            );
          r();
        },
        types: n
      });
      R.__reactViewTransition = H;
      var Y = [];
      return H.ready.then(
        function() {
          for (var C = R.documentElement.getAnimations({
            subtree: !0
          }), z = 0; z < C.length; z++) {
            var ne = C[z], oe = ne.effect, _e = oe.pseudoElement;
            if (_e != null && _e.startsWith("::view-transition")) {
              Y.push(ne), ne = oe.getKeyframes();
              for (var O = _e = void 0, A = !0, D = 0; D < ne.length; D++) {
                var $ = ne[D], se = $.width;
                if (_e === void 0) _e = se;
                else if (_e !== se) {
                  A = !1;
                  break;
                }
                if (se = $.height, O === void 0) O = se;
                else if (O !== se) {
                  A = !1;
                  break;
                }
                delete $.width, delete $.height, $.transform === "none" && delete $.transform;
              }
              A && _e !== void 0 && O !== void 0 && (oe.setKeyframes(ne), A = getComputedStyle(
                oe.target,
                oe.pseudoElement
              ), A.width !== _e || A.height !== O) && (A = ne[0], A.width = _e, A.height = O, A = ne[ne.length - 1], A.width = _e, A.height = O, oe.setKeyframes(ne));
            }
          }
          h();
        },
        function(C) {
          R.__reactViewTransition === H && (R.__reactViewTransition = null);
          try {
            if (typeof C == "object" && C !== null)
              switch (C.name) {
                case "InvalidStateError":
                  (C.message === "View transition was skipped because document visibility state is hidden." || C.message === "Skipping view transition because document visibility state has become hidden." || C.message === "Skipping view transition because viewport size changed." || C.message === "Transition was aborted because of invalid state") && (C = null);
              }
            C !== null && w(C);
          } finally {
            l(), i(), h();
          }
        }
      ), H.finished.finally(function() {
        for (var C = 0; C < Y.length; C++)
          Y[C].cancel();
        R.__reactViewTransition === H && (R.__reactViewTransition = null), y();
      }), H;
    } catch {
      return l(), i(), h(), null;
    }
  }
  function Pa(e, t) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
  }
  Pa.prototype.animate = function(e, t) {
    return t = typeof t == "number" ? { duration: t } : G({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
  }, Pa.prototype.getAnimations = function() {
    for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), l = [], i = 0; i < n.length; i++) {
      var r = n[i].effect;
      r !== null && r.target === e && r.pseudoElement === t && l.push(n[i]);
    }
    return l;
  }, Pa.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function Qg(e) {
    return {
      name: e,
      group: new Pa("group", e),
      imagePair: new Pa("image-pair", e),
      old: new Pa("old", e),
      new: new Pa("new", e)
    };
  }
  function Tn(e) {
    this._fragmentFiber = e, this._observers = this._eventListeners = null;
  }
  Tn.prototype.addEventListener = function(e, t, n) {
    var l = null, i = null;
    if (!(n != null && typeof n != "boolean" && (l = n.signal || null, l !== null && l.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var r = this._eventListeners;
      if (Ig(r, e, t, n) === -1) {
        var h = this, y = t;
        n != null && typeof n != "boolean" && n.once === !0 && (y = function(w) {
          h.removeEventListener(
            e,
            t,
            n
          ), typeof t == "function" ? t.call(this, w) : t.handleEvent(w);
        }), l !== null && (i = h.removeEventListener.bind(
          h,
          e,
          t,
          n
        ), l.addEventListener("abort", i, { once: !0 }), i = l.removeEventListener.bind(l, "abort", i)), l = Xi(n), r.push({
          type: e,
          listener: t,
          optionsOrUseCapture: n,
          attachedListener: y,
          cleanup: i
        }), p(
          this._fragmentFiber.child,
          !1,
          dx,
          e,
          y,
          l
        );
      }
      this._eventListeners = r;
    }
  };
  function dx(e, t, n, l) {
    return k(e).addEventListener(
      t,
      n,
      l
    ), !1;
  }
  Tn.prototype.removeEventListener = function(e, t, n) {
    var l = this._eventListeners;
    if (l !== null && (t = Ig(
      l,
      e,
      t,
      n
    ), t !== -1)) {
      var i = l[t];
      n = i.attachedListener;
      var r = i.cleanup;
      i = Xi(i.optionsOrUseCapture), p(
        this._fragmentFiber.child,
        !1,
        hx,
        e,
        n,
        i
      ), l.splice(t, 1), r !== null && r();
    }
  };
  function hx(e, t, n, l) {
    return k(e).removeEventListener(
      t,
      n,
      l
    ), !1;
  }
  function Xi(e) {
    return e != null && typeof e != "boolean" && (e.once === !0 || e.signal instanceof AbortSignal) ? { capture: e.capture, passive: e.passive } : e;
  }
  function Kg(e) {
    return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
  }
  function Ig(e, t, n, l) {
    if (e.length === 0) return -1;
    l = Kg(l);
    for (var i = 0; i < e.length; i++) {
      var r = e[i];
      if (r.type === t && r.listener === n && Kg(r.optionsOrUseCapture) === l)
        return i;
    }
    return -1;
  }
  Tn.prototype.dispatchEvent = function(e) {
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
          var r = n[i];
          l.addEventListener(
            r.type,
            r.attachedListener,
            Xi(r.optionsOrUseCapture)
          );
        }
      if (t.appendChild(l), e = l.dispatchEvent(e), n)
        for (i = 0; i < n.length; i++)
          r = n[i], l.removeEventListener(
            r.type,
            r.attachedListener,
            Xi(r.optionsOrUseCapture)
          );
      return t.removeChild(l), e;
    }
    return t.dispatchEvent(e);
  }, Tn.prototype.focus = function(e) {
    p(
      this._fragmentFiber.child,
      !0,
      Jg,
      e,
      void 0,
      void 0
    );
  };
  function Jg(e, t) {
    return e.tag === 6 ? !1 : (e = k(e), Tx(e, t));
  }
  Tn.prototype.focusLast = function(e) {
    var t = [];
    p(
      this._fragmentFiber.child,
      !0,
      Pf,
      t,
      void 0,
      void 0
    );
    for (var n = t.length - 1; 0 <= n && !Jg(t[n], e); n--) ;
  };
  function Pf(e, t) {
    return t.push(e), !1;
  }
  Tn.prototype.blur = function() {
    var e = N(
      this._fragmentFiber
    );
    e !== null && (e = k(e), e = rc(e).activeElement, e !== null && p(
      this._fragmentFiber.child,
      !1,
      mx,
      e,
      void 0,
      void 0
    ));
  };
  function mx(e, t) {
    return e.tag === 6 ? !1 : (e = k(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
  }
  Tn.prototype.observeUsing = function(e) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), p(
      this._fragmentFiber.child,
      !1,
      px,
      e,
      void 0,
      void 0
    );
  };
  function px(e, t) {
    return e.tag === 6 || (e = k(e), t.observe(e)), !1;
  }
  Tn.prototype.unobserveUsing = function(e) {
    var t = this._observers;
    if (t !== null && t.has(e)) {
      t.delete(e), p(
        this._fragmentFiber.child,
        !1,
        gx,
        e,
        void 0,
        void 0
      );
      for (var n = t = 0; n < Fn.length; n++) {
        var l = Fn[n];
        l.fragmentInstance === this && l.observer === e ? e.unobserve(l.instance) : Fn[t++] = l;
      }
      Fn.length = t;
    }
  };
  function gx(e, t) {
    return e.tag === 6 || (e = k(e), t.unobserve(e)), !1;
  }
  var Fn = [], Wf = !1;
  function yx(e, t, n) {
    Fn.push({
      fragmentInstance: e,
      observer: t,
      instance: n
    }), Wf || (Wf = !0, wx(function() {
      Wf = !1;
      var l = Fn;
      Fn = [];
      for (var i = 0; i < l.length; i++) {
        var r = l[i];
        r.observer.unobserve(r.instance);
      }
    }));
  }
  Tn.prototype.getClientRects = function() {
    var e = [];
    return p(
      this._fragmentFiber.child,
      !1,
      vx,
      e,
      void 0,
      void 0
    ), e;
  };
  function vx(e, t) {
    if (e.tag === 6) {
      e = e.stateNode;
      var n = e.ownerDocument.createRange();
      n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
    } else
      e = k(e), t.push.apply(t, e.getClientRects());
    return !1;
  }
  Tn.prototype.getRootNode = function(e) {
    var t = N(
      this._fragmentFiber
    );
    return t === null ? this : k(t).getRootNode(e);
  }, Tn.prototype.compareDocumentPosition = function(e) {
    var t = N(
      this._fragmentFiber
    );
    if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var n = [];
    p(
      this._fragmentFiber.child,
      !1,
      Pf,
      n,
      void 0,
      void 0
    );
    var l = k(t);
    if (n.length === 0) {
      if (n = l, T(this._fragmentFiber)) {
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
      return n === e ? i = Node.DOCUMENT_POSITION_CONTAINS : l & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = E(t)[1], n === null ? i = Node.DOCUMENT_POSITION_PRECEDING : (e = k(n).compareDocumentPosition(
        e
      ), i = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), i |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    t = k(n[0]), i = k(n[n.length - 1]);
    var r = T(this._fragmentFiber) ? t.parentElement : l;
    if (r == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    l = r.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, r = r.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var h = t.compareDocumentPosition(e), y = i.compareDocumentPosition(e), w = h & Node.DOCUMENT_POSITION_CONTAINED_BY || y & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return y = l && r && h & Node.DOCUMENT_POSITION_FOLLOWING && y & Node.DOCUMENT_POSITION_PRECEDING, t = l && t === e || r && i === e || w || y ? Node.DOCUMENT_POSITION_CONTAINED_BY : !l && t === e || !r && i === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : h, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || bx(
      t,
      this._fragmentFiber,
      n[0],
      n[n.length - 1],
      e
    ) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function bx(e, t, n, l, i) {
    var r = Cn(i);
    if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (n = !!r)
        e: {
          for (; r !== null; ) {
            if (r.tag === 7 && (r === t || r.alternate === t)) {
              n = !0;
              break e;
            }
            r = r.return;
          }
          n = !1;
        }
      return n;
    }
    if (e & Node.DOCUMENT_POSITION_CONTAINS) {
      if (r === null)
        return r = i.ownerDocument, i === r || i === r.documentElement || i === r.body;
      e: {
        for (r = t, t = N(t); r !== null; ) {
          if (!(r.tag !== 5 && r.tag !== 3 && r.tag !== 27 || r !== t && r.alternate !== t)) {
            r = !0;
            break e;
          }
          r = r.return;
        }
        r = !1;
      }
      return r;
    }
    return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!r) && !(t = r === n) && (t = B(
      n,
      r,
      Z
    ), t === null ? t = !1 : (p(
      t,
      !0,
      U,
      r,
      n
    ), r = V, V = null, t = r !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!r) && !(t = r === l) && (t = B(
      l,
      r,
      Z
    ), t === null ? t = !1 : (p(
      t,
      !0,
      F,
      r,
      l
    ), r = V, X = V = null, t = r !== null)), t) : !1;
  }
  function Fg(e, t) {
    var n = e.ownerDocument.createRange();
    n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(
      window.scrollX + e.left,
      t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight
    );
  }
  Tn.prototype.scrollIntoView = function(e) {
    if (typeof e == "object") throw Error(u(566));
    var t = [];
    p(
      this._fragmentFiber.child,
      !1,
      Pf,
      t,
      void 0,
      void 0
    );
    var n = e !== !1;
    if (t.length === 0) {
      var l = E(
        this._fragmentFiber
      );
      if (l = n ? l[1] || l[0] || N(this._fragmentFiber) : l[0] || l[1], l === null) return;
      if (l.tag === 6) {
        e = k(l), Fg(e, n);
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
      i.tag === 6 ? (i = k(i), Fg(i, n)) : k(i).scrollIntoView(e), l += n ? -1 : 1;
    }
  };
  function xx(e, t) {
    return e = k(e), Pg(e, t), !1;
  }
  function Pg(e, t) {
    e.reactFragments == null && (e.reactFragments = /* @__PURE__ */ new Set()), e.reactFragments.add(t);
  }
  function Wg(e, t) {
    var n = t._eventListeners;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var i = n[l];
        e.addEventListener(
          i.type,
          i.attachedListener,
          Xi(i.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(r) {
      for (var h = 0, y = 0; y < Fn.length; y++) {
        var w = Fn[y];
        (w.fragmentInstance !== t || w.observer !== r || w.instance !== e) && (Fn[h++] = w);
      }
      Fn.length = h, r.observe(e);
    }), Pg(e, t));
  }
  function Sx(e, t) {
    var n = t._eventListeners;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var i = n[l];
        e.removeEventListener(
          i.type,
          i.attachedListener,
          Xi(i.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(r) {
      typeof r.rootMargin == "string" ? yx(
        t,
        r,
        e
      ) : r.unobserve(e);
    }), e.reactFragments != null && e.reactFragments.delete(t));
  }
  function ed(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (t = t.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          ed(n), Ca(n);
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
  function Nx(e, t, n, l) {
    for (; e.nodeType === 1; ) {
      var i = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[Aa])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (r = e.getAttribute("rel"), r === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (r !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (r = e.getAttribute("src"), (r !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && r && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var r = i.name == null ? null : "" + i.name;
        if (i.type === "hidden" && e.getAttribute("name") === r)
          return e;
      } else return e;
      if (e = Un(e.nextSibling), e === null) break;
    }
    return null;
  }
  function jx(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Un(e.nextSibling), e === null)) return null;
    return e;
  }
  function e0(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Un(e.nextSibling), e === null)) return null;
    return e;
  }
  function td(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function nd(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Ex(e, t) {
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
  function Un(e) {
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
  var ld = null;
  function t0(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0)
            return Un(e.nextSibling);
          t--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function n0(e) {
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
  function Tx(e, t) {
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
  function wx(e) {
    Yg(function() {
      Yg(function(t) {
        return e(t);
      });
    });
  }
  function l0(e, t, n) {
    switch (t = rc(n), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(u(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(u(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(u(454));
        return e;
      default:
        throw Error(u(451));
    }
  }
  function a0(e, t, n) {
    for (var l in n) {
      var i = n[l];
      n.hasOwnProperty(l) && i != null && Pe(e, t, l, null, tx, i);
    }
    n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === rl && (e.onclick = null), Ca(e);
  }
  function ad(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Ca(e);
  }
  var Hn = /* @__PURE__ */ new Map(), i0 = /* @__PURE__ */ new Set();
  function uc(e) {
    if (typeof e.getRootNode == "function") {
      var t = e.getRootNode();
      if (t.nodeType === 9 || t.nodeType === 11) return t;
    }
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  var ql = Se.d;
  Se.d = {
    f: kx,
    r: Ax,
    D: _x,
    C: Cx,
    L: Ox,
    m: Rx,
    X: Dx,
    S: Mx,
    M: zx
  };
  function kx() {
    var e = ql.f(), t = Zr();
    return e || t;
  }
  function Ax(e) {
    var t = sl(e);
    t !== null && t.tag === 5 && t.type === "form" ? cp(t) : ql.r(e);
  }
  var Zi = typeof document > "u" ? null : document;
  function s0(e, t, n) {
    var l = Zi;
    if (l && typeof t == "string" && t) {
      var i = ie(t);
      i = 'link[rel="' + e + '"][href="' + i + '"]', typeof n == "string" && (i += '[crossorigin="' + n + '"]'), i0.has(i) || (i0.add(i), e = { rel: e, crossOrigin: n, href: t }, l.querySelector(i) === null && (t = l.createElement("link"), Yt(t, "link", e), dt(t), l.head.appendChild(t)));
    }
  }
  function _x(e) {
    ql.D(e), s0("dns-prefetch", e, null);
  }
  function Cx(e, t) {
    ql.C(e, t), s0("preconnect", e, t);
  }
  function Ox(e, t, n) {
    ql.L(e, t, n);
    var l = Zi;
    if (l && e && t) {
      var i = 'link[rel="preload"][as="' + ie(t) + '"]';
      t === "image" && n && n.imageSrcSet ? (i += '[imagesrcset="' + ie(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (i += '[imagesizes="' + ie(
        n.imageSizes
      ) + '"]')) : i += '[href="' + ie(e) + '"]';
      var r = i;
      switch (t) {
        case "style":
          r = Qi(e);
          break;
        case "script":
          r = Ki(e);
      }
      if (!(Hn.has(r) || (e = G(
        {
          rel: "preload",
          href: t === "image" && n && n.imageSrcSet ? void 0 : e,
          as: t
        },
        n
      ), Hn.set(r, e), l.querySelector(i) !== null || t === "style" && l.querySelector(oc(r)) || t === "script" && l.querySelector(fc(r))))) {
        var h = l.createElement("link");
        Yt(h, "link", e), t === "style" && (h[_a] = !0, h.onload = h.onerror = function() {
          vn(h);
        }), dt(h), l.head.appendChild(h);
      }
    }
  }
  function Rx(e, t) {
    ql.m(e, t);
    var n = Zi;
    if (n && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", i = 'link[rel="modulepreload"][as="' + ie(l) + '"][href="' + ie(e) + '"]', r = i;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          r = Ki(e);
      }
      if (!Hn.has(r) && (e = G({ rel: "modulepreload", href: e }, t), Hn.set(r, e), n.querySelector(i) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(fc(r)))
              return;
        }
        l = n.createElement("link"), Yt(l, "link", e), dt(l), n.head.appendChild(l);
      }
    }
  }
  function Mx(e, t, n) {
    ql.S(e, t, n);
    var l = Zi;
    if (l && e) {
      var i = yn(l).hoistableStyles, r = Qi(e);
      t = t || "default";
      var h = i.get(r);
      if (!h) {
        var y = { loading: 0, preload: null };
        if (h = l.querySelector(
          oc(r)
        ))
          y.loading = 5;
        else {
          e = G(
            { rel: "stylesheet", href: e, "data-precedence": t },
            n
          ), (n = Hn.get(r)) && id(e, n);
          var w = h = l.createElement("link");
          dt(w), Yt(w, "link", e), w._p = new Promise(function(R, H) {
            w.onload = R, w.onerror = H;
          }), w.addEventListener("load", function() {
            y.loading |= 1;
          }), w.addEventListener("error", function() {
            y.loading |= 2;
          }), y.loading |= 4, Wr(h, t, l);
        }
        h = {
          type: "stylesheet",
          instance: h,
          count: 1,
          state: y
        }, i.set(r, h);
      }
    }
  }
  function Dx(e, t) {
    ql.X(e, t);
    var n = Zi;
    if (n && e) {
      var l = yn(n).hoistableScripts, i = Ki(e), r = l.get(i);
      r || (r = n.querySelector(fc(i)), r || (e = G({ src: e, async: !0 }, t), (t = Hn.get(i)) && sd(e, t), r = n.createElement("script"), dt(r), Yt(r, "link", e), n.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, l.set(i, r));
    }
  }
  function zx(e, t) {
    ql.M(e, t);
    var n = Zi;
    if (n && e) {
      var l = yn(n).hoistableScripts, i = Ki(e), r = l.get(i);
      r || (r = n.querySelector(fc(i)), r || (e = G({ src: e, async: !0, type: "module" }, t), (t = Hn.get(i)) && sd(e, t), r = n.createElement("script"), dt(r), Yt(r, "link", e), n.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, l.set(i, r));
    }
  }
  function c0(e, t, n, l) {
    var i = (i = ln.current) ? uc(i) : null;
    if (!i) throw Error(u(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (n = Qi(n.href), t = yn(
          i
        ).hoistableStyles, l = t.get(n), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, t.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          e = Qi(n.href);
          var r = yn(
            i
          ).hoistableStyles, h = r.get(e);
          if (h || (i = i.ownerDocument || i, h = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, r.set(e, h), (r = i.querySelector(
            oc(e)
          )) ? r._p || (h.instance = r, h.state.loading = 5) : (r = Hn.get(e), r || (r = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, Hn.set(e, r)), Lx(
            i,
            e,
            r,
            h.state
          ))), t && l === null)
            throw Error(u(528, ""));
          return h;
        }
        if (t && l !== null)
          throw Error(u(529, ""));
        return null;
      case "script":
        return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Ki(n), t = yn(
          i
        ).hoistableScripts, l = t.get(n), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, t.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(u(444, e));
    }
  }
  function Qi(e) {
    return 'href="' + ie(e) + '"';
  }
  function oc(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function r0(e) {
    return G({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Lx(e, t, n, l) {
    if (t = e.querySelector(
      'link[rel="preload"][as="style"][' + t + "]"
    )) {
      if (t[_a] !== !0) {
        l.loading = 1;
        return;
      }
    } else
      t = e.createElement("link"), t[_a] = !0, t.onload = t.onerror = vn.bind(null, t), Yt(t, "link", n), dt(t), e.head.appendChild(t);
    l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    });
  }
  function Ki(e) {
    return '[src="' + ie(e) + '"]';
  }
  function fc(e) {
    return "script[async]" + e;
  }
  function u0(e, t, n) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + ie(n.href) + '"]'
          );
          if (l)
            return t.instance = l, dt(l), l;
          var i = G({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), dt(l), Yt(l, "style", i), Wr(l, n.precedence, e), t.instance = l;
        case "stylesheet":
          i = Qi(n.href);
          var r = e.querySelector(
            oc(i)
          );
          if (r)
            return t.state.loading |= 4, t.instance = r, dt(r), r;
          l = r0(n), (i = Hn.get(i)) && id(l, i), r = (e.ownerDocument || e).createElement("link"), dt(r);
          var h = r;
          return h._p = new Promise(function(y, w) {
            h.onload = y, h.onerror = w;
          }), Yt(r, "link", l), t.state.loading |= 4, Wr(r, n.precedence, e), t.instance = r;
        case "script":
          return r = Ki(n.src), (i = e.querySelector(
            fc(r)
          )) ? (t.instance = i, dt(i), i) : (l = n, (i = Hn.get(r)) && (l = G({}, n), sd(l, i)), e = e.ownerDocument || e, i = e.createElement("script"), dt(i), Yt(i, "link", l), e.head.appendChild(i), t.instance = i);
        case "void":
          return null;
        default:
          throw Error(u(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, Wr(l, n.precedence, e));
    return t.instance;
  }
  function Wr(e, t, n) {
    for (var l = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), i = l.length ? l[l.length - 1] : null, r = i, h = 0; h < l.length; h++) {
      var y = l[h];
      if (y.dataset.precedence === t) r = y;
      else if (r !== i) break;
    }
    r ? r.parentNode.insertBefore(e, r.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function id(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function sd(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var eu = null;
  function o0(e, t, n) {
    if (eu === null) {
      var l = /* @__PURE__ */ new Map(), i = eu = /* @__PURE__ */ new Map();
      i.set(n, l);
    } else
      i = eu, l = i.get(n), l || (l = /* @__PURE__ */ new Map(), i.set(n, l));
    if (l.has(e)) return l;
    for (l.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
      var r = n[i];
      if (!(r[Aa] || r[lt] || e === "link" && r.getAttribute("rel") === "stylesheet") && r.namespaceURI !== "http://www.w3.org/2000/svg") {
        var h = r.getAttribute(t) || "";
        h = e + h;
        var y = l.get(h);
        y ? y.push(r) : l.set(h, [r]);
      }
    }
    return l;
  }
  function cd(e, t, n) {
    e = e.ownerDocument || e, e.head.insertBefore(
      n,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function Ux(e, t, n) {
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
  function f0(e, t) {
    return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
  }
  function d0(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function h0(e) {
    return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function m0(e, t) {
    typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += h0(t), e.suspenseyImages.push(t)), e = qx.bind(e), t.decode().then(e, e));
  }
  function Hx(e, t, n, l) {
    if (n.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var i = Qi(l.href), r = t.querySelector(
          oc(i)
        );
        if (r) {
          t = r._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = dc.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = r, dt(r);
          return;
        }
        r = t.ownerDocument || t, l = r0(l), (i = Hn.get(i)) && id(l, i), r = r.createElement("link"), dt(r);
        var h = r;
        h._p = new Promise(function(y, w) {
          h.onload = y, h.onerror = w;
        }), Yt(r, "link", l), n.instance = r;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++, n = dc.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
    }
  }
  var tu = 0;
  function Bx(e, t) {
    return e.stylesheets && e.count === 0 && lu(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
      var l = setTimeout(function() {
        if (e.stylesheets && lu(e, e.stylesheets), e.unsuspend) {
          var r = e.unsuspend;
          e.unsuspend = null, r();
        }
      }, 6e4 + t);
      0 < e.imgBytes && tu === 0 && (tu = 62500 * lx());
      var i = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && lu(e, e.stylesheets), e.unsuspend)) {
            var r = e.unsuspend;
            e.unsuspend = null, r();
          }
        },
        (e.imgBytes > tu ? 50 : 800) + t
      );
      return e.unsuspend = n, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(i);
      };
    } : null;
  }
  function p0(e) {
    if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
      if (e.stylesheets) lu(e, e.stylesheets);
      else if (e.unsuspend) {
        var t = e.unsuspend;
        e.unsuspend = null, t();
      }
    }
  }
  function dc() {
    this.count--, p0(this);
  }
  function qx() {
    this.imgCount--, p0(this);
  }
  var nu = null;
  function lu(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, nu = /* @__PURE__ */ new Map(), t.forEach($x, e), nu = null, dc.call(e));
  }
  function $x(e, t) {
    if (!(t.state.loading & 4)) {
      var n = nu.get(e);
      if (n) var l = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), nu.set(e, n);
        for (var i = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), r = 0; r < i.length; r++) {
          var h = i[r];
          (h.nodeName === "LINK" || h.getAttribute("media") !== "not all") && (n.set(h.dataset.precedence, h), l = h);
        }
        l && n.set(null, l);
      }
      i = t.instance, h = i.getAttribute("data-precedence"), r = n.get(h) || l, r === l && n.set(null, i), n.set(h, i), this.count++, l = dc.bind(this), i.addEventListener("load", l), i.addEventListener("error", l), r ? r.parentNode.insertBefore(i, r.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Ii = {
    $$typeof: he,
    Provider: null,
    Consumer: null,
    _currentValue: Dt,
    _currentValue2: Dt,
    _threadCount: 0
  };
  function Yx(e, t, n, l, i, r, h, y, w) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ct(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ct(0), this.hiddenUpdates = ct(null), this.identifierPrefix = l, this.onUncaughtError = i, this.onCaughtError = r, this.onRecoverableError = h, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = w, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function g0(e, t, n, l, i, r, h, y, w, R, H, Y) {
    return e = new Yx(
      e,
      t,
      n,
      h,
      w,
      R,
      H,
      Y,
      y
    ), t = 1, r === !0 && (t |= 24), r = cn(3, null, null, t), e.current = r, r.stateNode = e, t = So(), t.refCount++, e.pooledCache = t, t.refCount++, r.memoizedState = {
      element: l,
      isDehydrated: n,
      cache: t
    }, To(r), e;
  }
  function y0(e) {
    return e ? (e = Si, e) : Si;
  }
  function v0(e, t, n, l, i, r) {
    i = y0(i), l.context === null ? l.context = i : l.pendingContext = i, l = ia(t), l.payload = { element: n }, r = r === void 0 ? null : r, r !== null && (l.callback = r), n = sa(e, l, t), n !== null && (fn(n, e, t), Gs(n, e, t));
  }
  function b0(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function rd(e, t) {
    b0(e, t), (e = e.alternate) && b0(e, t);
  }
  function x0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = za(e, 67108864);
      t !== null && fn(t, e, 67108864), rd(e, 67108864);
    }
  }
  function S0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = En();
      t = fi(t);
      var n = za(e, t);
      n !== null && fn(n, e, t), rd(e, t);
    }
  }
  var Ji = !0;
  function Gx(e, t, n, l) {
    var i = ue.T;
    ue.T = null;
    var r = Se.p;
    try {
      Se.p = 2, ud(e, t, n, l);
    } finally {
      Se.p = r, ue.T = i;
    }
  }
  function Vx(e, t, n, l) {
    var i = ue.T;
    ue.T = null;
    var r = Se.p;
    try {
      Se.p = 8, ud(e, t, n, l);
    } finally {
      Se.p = r, ue.T = i;
    }
  }
  function ud(e, t, n, l) {
    if (Ji) {
      var i = od(l);
      if (i === null)
        Vf(
          e,
          t,
          l,
          au,
          n
        ), j0(e, l);
      else if (Zx(
        i,
        e,
        t,
        n,
        l
      ))
        l.stopPropagation();
      else if (j0(e, l), t & 4 && -1 < Xx.indexOf(e)) {
        for (; i !== null; ) {
          var r = sl(i);
          if (r !== null)
            switch (r.tag) {
              case 3:
                if (r = r.stateNode, r.current.memoizedState.isDehydrated) {
                  var h = al(r.pendingLanes);
                  if (h !== 0) {
                    var y = r;
                    for (y.pendingLanes |= 2, y.entangledLanes |= 2; h; ) {
                      var w = 1 << 31 - ft(h);
                      y.entanglements[1] |= w, h &= ~w;
                    }
                    vl(r), (Ze & 6) === 0 && (Gr = Xt() + 500, ic(0));
                  }
                }
                break;
              case 31:
              case 13:
                y = za(r, 2), y !== null && fn(y, r, 2), Zr(), rd(r, 2);
            }
          if (r = od(l), r === null && Vf(
            e,
            t,
            l,
            au,
            n
          ), r === i) break;
          i = r;
        }
        i !== null && l.stopPropagation();
      } else
        Vf(
          e,
          t,
          l,
          null,
          n
        );
    }
  }
  function od(e) {
    return e = Qu(e), fd(e);
  }
  var au = null;
  function fd(e) {
    if (au = null, e = Cn(e), e !== null) {
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
    return au = e, null;
  }
  function N0(e) {
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
        switch (vs()) {
          case ri:
            return 2;
          case Tl:
            return 8;
          case Gn:
          case Lc:
            return 32;
          case bs:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var dd = !1, va = null, ba = null, xa = null, hc = /* @__PURE__ */ new Map(), mc = /* @__PURE__ */ new Map(), Sa = [], Xx = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function j0(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        va = null;
        break;
      case "dragenter":
      case "dragleave":
        ba = null;
        break;
      case "mouseover":
      case "mouseout":
        xa = null;
        break;
      case "pointerover":
      case "pointerout":
        hc.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        mc.delete(t.pointerId);
    }
  }
  function pc(e, t, n, l, i, r) {
    return e === null || e.nativeEvent !== r ? (e = {
      blockedOn: t,
      domEventName: n,
      eventSystemFlags: l,
      nativeEvent: r,
      targetContainers: [i]
    }, t !== null && (t = sl(t), t !== null && x0(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
  }
  function Zx(e, t, n, l, i) {
    switch (t) {
      case "focusin":
        return va = pc(
          va,
          e,
          t,
          n,
          l,
          i
        ), !0;
      case "dragenter":
        return ba = pc(
          ba,
          e,
          t,
          n,
          l,
          i
        ), !0;
      case "mouseover":
        return xa = pc(
          xa,
          e,
          t,
          n,
          l,
          i
        ), !0;
      case "pointerover":
        var r = i.pointerId;
        return hc.set(
          r,
          pc(
            hc.get(r) || null,
            e,
            t,
            n,
            l,
            i
          )
        ), !0;
      case "gotpointercapture":
        return r = i.pointerId, mc.set(
          r,
          pc(
            mc.get(r) || null,
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
  function E0(e) {
    var t = Cn(e.target);
    if (t !== null) {
      var n = d(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = m(n), t !== null) {
            e.blockedOn = t, $c(e.priority, function() {
              S0(n);
            });
            return;
          }
        } else if (t === 31) {
          if (t = g(n), t !== null) {
            e.blockedOn = t, $c(e.priority, function() {
              S0(n);
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
  function iu(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = od(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var l = new n.constructor(
          n.type,
          n
        );
        Zu = l, n.target.dispatchEvent(l), Zu = null;
      } else
        return t = sl(n), t !== null && x0(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function T0(e, t, n) {
    iu(e) && n.delete(t);
  }
  function Qx() {
    dd = !1, va !== null && iu(va) && (va = null), ba !== null && iu(ba) && (ba = null), xa !== null && iu(xa) && (xa = null), hc.forEach(T0), mc.forEach(T0);
  }
  function su(e, t) {
    e.blockedOn === t && (e.blockedOn = null, dd || (dd = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      Qx
    )));
  }
  var cu = null;
  function w0(e) {
    cu !== e && (cu = e, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        cu === e && (cu = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t], l = e[t + 1], i = e[t + 2];
          if (typeof l != "function") {
            if (fd(l || n) === null)
              continue;
            break;
          }
          var r = sl(n);
          r !== null && (e.splice(t, 3), t -= 3, Zo(
            r,
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
  function Fi(e) {
    function t(w) {
      return su(w, e);
    }
    va !== null && su(va, e), ba !== null && su(ba, e), xa !== null && su(xa, e), hc.forEach(t), mc.forEach(t);
    for (var n = 0; n < Sa.length; n++) {
      var l = Sa[n];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < Sa.length && (n = Sa[0], n.blockedOn === null); )
      E0(n), n.blockedOn === null && Sa.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
      for (l = 0; l < n.length; l += 3) {
        var i = n[l], r = n[l + 1], h = i[zt] || null;
        if (typeof r == "function")
          h || w0(n);
        else if (h) {
          var y = null;
          if (r && r.hasAttribute("formAction")) {
            if (i = r, h = r[zt] || null)
              y = h.formAction;
            else if (fd(i) !== null) continue;
          } else y = h.action;
          typeof y == "function" ? n[l + 1] = y : (n.splice(l, 3), l -= 3), w0(n);
        }
      }
  }
  function k0() {
    function e(r) {
      r.canIntercept && r.info === "react-transition" && r.intercept({
        handler: function() {
          return new Promise(function(h) {
            return i = h;
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
        var r = navigation.currentEntry;
        r && r.url != null && navigation.navigate(r.url, {
          state: r.getState(),
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
  function hd(e) {
    this._internalRoot = e;
  }
  ru.prototype.render = hd.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(u(409));
    var n = t.current, l = En();
    v0(n, l, e, t, null, null);
  }, ru.prototype.unmount = hd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      v0(e.current, 2, null, e, null, null), Zr(), t[Xn] = null;
    }
  };
  function ru(e) {
    this._internalRoot = e;
  }
  ru.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = qc();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Sa.length && t !== 0 && t < Sa[n].priority; n++) ;
      Sa.splice(n, 0, e), n === 0 && E0(e);
    }
  };
  var A0 = s.version;
  if (A0 !== "19.3.0")
    throw Error(
      u(
        527,
        A0,
        "19.3.0"
      )
    );
  Se.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(u(188)) : (e = Object.keys(e).join(","), Error(u(268, e)));
    return e = S(t), e = e !== null ? v(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var Kx = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: ue,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var uu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!uu.isDisabled && uu.supportsFiber)
      try {
        Zl = uu.inject(
          Kx
        ), At = uu;
      } catch {
      }
  }
  return yc.createRoot = function(e, t) {
    if (!f(e)) throw Error(u(299));
    var n = !1, l = "", i = yp, r = vp, h = bp;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (r = t.onCaughtError), t.onRecoverableError !== void 0 && (h = t.onRecoverableError)), t = g0(
      e,
      1,
      !1,
      null,
      null,
      n,
      l,
      null,
      i,
      r,
      h,
      k0
    ), e[Xn] = t.current, Gf(e), new hd(t);
  }, yc.hydrateRoot = function(e, t, n) {
    if (!f(e)) throw Error(u(299));
    var l = !1, i = "", r = yp, h = vp, y = bp, w = null;
    return n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onUncaughtError !== void 0 && (r = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (y = n.onRecoverableError), n.formState !== void 0 && (w = n.formState)), t = g0(
      e,
      1,
      !0,
      t,
      n ?? null,
      l,
      i,
      w,
      r,
      h,
      y,
      k0
    ), t.context = y0(null), n = t.current, l = En(), l = fi(l), i = ia(l), i.callback = null, sa(n, i, l), n = l, t.current.lanes = n, _n(t, n), vl(t), e[Xn] = t.current, Gf(e), new ru(t);
  }, yc.version = "19.3.0", yc;
}
var H0;
function i2() {
  if (H0) return gd.exports;
  H0 = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (s) {
        console.error(s);
      }
  }
  return a(), gd.exports = a2(), gd.exports;
}
var s2 = i2();
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c2 = (a) => a.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Qy = (...a) => a.filter((s, o, u) => !!s && s.trim() !== "" && u.indexOf(s) === o).join(" ").trim();
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var r2 = {
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
const u2 = x.forwardRef(
  ({
    color: a = "currentColor",
    size: s = 24,
    strokeWidth: o = 2,
    absoluteStrokeWidth: u,
    className: f = "",
    children: d,
    iconNode: m,
    ...g
  }, b) => x.createElement(
    "svg",
    {
      ref: b,
      ...r2,
      width: s,
      height: s,
      stroke: a,
      strokeWidth: u ? Number(o) * 24 / Number(s) : o,
      className: Qy("lucide", f),
      ...g
    },
    [
      ...m.map(([S, v]) => x.createElement(S, v)),
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
const te = (a, s) => {
  const o = x.forwardRef(
    ({ className: u, ...f }, d) => x.createElement(u2, {
      ref: d,
      iconNode: s,
      className: Qy(`lucide-${c2(a)}`, u),
      ...f
    })
  );
  return o.displayName = `${a}`, o;
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const o2 = te("Activity", [
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
const f2 = te("ArrowLeft", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d2 = te("ArrowUp", [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hs = te("BookOpen", [
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
const h2 = te("Brain", [
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
const B0 = te("Cake", [
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
const m2 = te("CalendarDays", [
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
const si = te("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const p2 = te("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ky = te("ChevronLeft", [
  ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Iy = te("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const g2 = te("CircleHelp", [
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
const y2 = te("Clapperboard", [
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
const v2 = te("CloudDrizzle", [
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
const b2 = te("CloudFog", [
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
const x2 = te("CloudLightning", [
  ["path", { d: "M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973", key: "1cez44" }],
  ["path", { d: "m13 12-3 5h4l-3 5", key: "1t22er" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S2 = te("CloudRain", [
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
const N2 = te("CloudSnow", [
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
const Jy = te("CloudSun", [
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
const Md = te("Cloud", [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sh = te("Copy", [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fy = te("Disc3", [
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
const j2 = te("Download", [
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
const E2 = te("EyeOff", [
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
const T2 = te("Eye", [
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
const w2 = te("Fan", [
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
const Py = te("FileText", [
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
const k2 = te("FileX", [
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
const A2 = te("Files", [
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
const Wy = te("Film", [
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
const ev = te("FolderOpen", [
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
const q0 = te("Folder", [
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
const ch = te("Gauge", [
  ["path", { d: "m12 14 4-4", key: "9kzdfg" }],
  ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0", key: "19p75a" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _2 = te("Globe", [
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
const C2 = te("HeartPulse", [
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
const tv = te("Heart", [
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
const O2 = te("Hourglass", [
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
const ju = te("House", [
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
const Tc = te("Image", [
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
const R2 = te("Images", [
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
const M2 = te("KeyRound", [
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
const D2 = te("Lightbulb", [
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
const z2 = te("LocateFixed", [
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
const nv = te("Lock", [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lv = te("Mail", [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dd = te("MapPin", [
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
const L2 = te("MessageSquareQuote", [
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
const U2 = te("Mic", [
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
const H2 = te("Moon", [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B2 = te("Navigation", [
  ["polygon", { points: "3 11 22 2 13 21 11 13 3 11", key: "1ltx0t" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zd = te("Paperclip", [
  ["path", { d: "M13.234 20.252 21 12.3", key: "1cbrk9" }],
  [
    "path",
    {
      d: "m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486",
      key: "1pkts6"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q2 = te("PenLine", [
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
const $2 = te("PlaneLanding", [
  ["path", { d: "M2 22h20", key: "272qi7" }],
  [
    "path",
    {
      d: "M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z",
      key: "1ma21e"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y2 = te("PlaneTakeoff", [
  ["path", { d: "M2 22h20", key: "272qi7" }],
  [
    "path",
    {
      d: "M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z",
      key: "fkigj9"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rs = te("Plane", [
  [
    "path",
    {
      d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
      key: "1v9wt8"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ld = te("Play", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rh = te("Plug", [
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
const G2 = te("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V2 = te("Power", [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ud = te("RefreshCw", [
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
const wc = te("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X2 = te("Settings", [
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
const Z2 = te("SlidersHorizontal", [
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
const uh = te("Sparkles", [
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
const Q2 = te("SquareCheckBig", [
  ["path", { d: "M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5", key: "1uzm8b" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K2 = te("Square", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I2 = te("Star", [
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
const av = te("StickyNote", [
  ["path", { d: "M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z", key: "qazsjp" }],
  ["path", { d: "M15 3v4a2 2 0 0 0 2 2h4", key: "40519r" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J2 = te("Sun", [
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
const F2 = te("Terminal", [
  ["polyline", { points: "4 17 10 11 4 5", key: "akl6gq" }],
  ["line", { x1: "12", x2: "20", y1: "19", y2: "19", key: "q2wloq" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P2 = te("Thermometer", [
  ["path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z", key: "17jzev" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const W2 = te("ToggleLeft", [
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "6", ry: "6", key: "f2vt7d" }],
  ["circle", { cx: "8", cy: "12", r: "2", key: "1nvbw3" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const iv = te("Trash2", [
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
const sv = te("TriangleAlert", [
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
const oh = te("Upload", [
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
const eS = te("UserRound", [
  ["circle", { cx: "12", cy: "8", r: "5", key: "1hypcn" }],
  ["path", { d: "M20 21a8 8 0 0 0-16 0", key: "rfgkzh" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cv = te("Users", [
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
const rv = te("Volume2", [
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
const tS = te("VolumeX", [
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
const Sl = te("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $0 = te("Zap", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
]);
/*! @license DOMPurify 3.4.15 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.15/LICENSE */
function Y0(a, s) {
  (s == null || s > a.length) && (s = a.length);
  for (var o = 0, u = Array(s); o < s; o++) u[o] = a[o];
  return u;
}
function nS(a) {
  if (Array.isArray(a)) return a;
}
function lS(a, s) {
  var o = a == null ? null : typeof Symbol < "u" && a[Symbol.iterator] || a["@@iterator"];
  if (o != null) {
    var u, f, d, m, g = [], b = !0, S = !1;
    try {
      if (d = (o = o.call(a)).next, s !== 0) for (; !(b = (u = d.call(o)).done) && (g.push(u.value), g.length !== s); b = !0) ;
    } catch (v) {
      S = !0, f = v;
    } finally {
      try {
        if (!b && o.return != null && (m = o.return(), Object(m) !== m)) return;
      } finally {
        if (S) throw f;
      }
    }
    return g;
  }
}
function aS() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function iS(a, s) {
  return nS(a) || lS(a, s) || sS(a, s) || aS();
}
function sS(a, s) {
  if (a) {
    if (typeof a == "string") return Y0(a, s);
    var o = {}.toString.call(a).slice(8, -1);
    return o === "Object" && a.constructor && (o = a.constructor.name), o === "Map" || o === "Set" ? Array.from(a) : o === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? Y0(a, s) : void 0;
  }
}
const uv = Object.entries, G0 = Object.setPrototypeOf, cS = Object.isFrozen, rS = Object.getPrototypeOf, uS = Object.getOwnPropertyDescriptor;
let kt = Object.freeze, Mt = Object.seal, is = Object.create, ov = typeof Reflect < "u" && Reflect, Hd = ov.apply, Bd = ov.construct;
kt || (kt = function(s) {
  return s;
});
Mt || (Mt = function(s) {
  return s;
});
Hd || (Hd = function(s, o) {
  for (var u = arguments.length, f = new Array(u > 2 ? u - 2 : 0), d = 2; d < u; d++)
    f[d - 2] = arguments[d];
  return s.apply(o, f);
});
Bd || (Bd = function(s) {
  for (var o = arguments.length, u = new Array(o > 1 ? o - 1 : 0), f = 1; f < o; f++)
    u[f - 1] = arguments[f];
  return new s(...u);
});
const ei = Tt(Array.prototype.forEach), oS = Tt(Array.prototype.lastIndexOf), V0 = Tt(Array.prototype.pop), vc = Tt(Array.prototype.push), fS = Tt(Array.prototype.splice), us = Array.isArray, jc = Tt(String.prototype.toLowerCase), xd = Tt(String.prototype.toString), X0 = Tt(String.prototype.match), bc = Tt(String.prototype.replace), Z0 = Tt(String.prototype.indexOf), dS = Tt(String.prototype.trim), hS = Tt(Number.prototype.toString), mS = Tt(Boolean.prototype.toString), Q0 = typeof BigInt > "u" ? null : Tt(BigInt.prototype.toString), K0 = typeof Symbol > "u" ? null : Tt(Symbol.prototype.toString), dn = Tt(Object.prototype.hasOwnProperty), xc = Tt(Object.prototype.toString), Qt = Tt(RegExp.prototype.test), Wa = pS(TypeError);
function Tt(a) {
  return function(s) {
    s instanceof RegExp && (s.lastIndex = 0);
    for (var o = arguments.length, u = new Array(o > 1 ? o - 1 : 0), f = 1; f < o; f++)
      u[f - 1] = arguments[f];
    return Hd(a, s, u);
  };
}
function pS(a) {
  return function() {
    for (var s = arguments.length, o = new Array(s), u = 0; u < s; u++)
      o[u] = arguments[u];
    return Bd(a, o);
  };
}
function Xe(a, s) {
  let o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : jc;
  if (G0 && G0(a, null), !us(s))
    return a;
  let u = s.length;
  for (; u--; ) {
    let f = s[u];
    if (typeof f == "string") {
      const d = o(f);
      d !== f && (cS(s) || (s[u] = d), f = d);
    }
    a[f] = !0;
  }
  return a;
}
function gS(a) {
  for (let s = 0; s < a.length; s++)
    dn(a, s) || (a[s] = null);
  return a;
}
function An(a) {
  const s = is(null);
  for (const u of uv(a)) {
    var o = iS(u, 2);
    const f = o[0], d = o[1];
    dn(a, f) && (us(d) ? s[f] = gS(d) : d && typeof d == "object" && d.constructor === Object ? s[f] = An(d) : s[f] = d);
  }
  return s;
}
function yS(a) {
  switch (typeof a) {
    case "string":
      return a;
    case "number":
      return hS(a);
    case "boolean":
      return mS(a);
    case "bigint":
      return Q0 ? Q0(a) : "0";
    case "symbol":
      return K0 ? K0(a) : "Symbol()";
    case "undefined":
      return xc(a);
    case "function":
    case "object": {
      if (a === null)
        return xc(a);
      const s = a, o = Bn(s, "toString");
      if (typeof o == "function") {
        const u = o(s);
        return typeof u == "string" ? u : xc(u);
      }
      return xc(a);
    }
    default:
      return xc(a);
  }
}
function Bn(a, s) {
  for (; a !== null; ) {
    const u = uS(a, s);
    if (u) {
      if (u.get)
        return Tt(u.get);
      if (typeof u.value == "function")
        return Tt(u.value);
    }
    a = rS(a);
  }
  function o() {
    return null;
  }
  return o;
}
function vS(a) {
  try {
    return Qt(a, ""), !0;
  } catch {
    return !1;
  }
}
const I0 = kt(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Sd = kt(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Nd = kt(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), bS = kt(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), jd = kt(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), xS = kt(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), J0 = kt(["#text"]), F0 = kt(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "command", "commandfor", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns"]), Ed = kt(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dominant-baseline", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "pointer-events", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-orientation", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "vector-effect", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), P0 = kt(["accent", "accentunder", "align", "bevelled", "close", "columnalign", "columnlines", "columnspacing", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lquote", "lspace", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), ou = kt(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), SS = Mt(/{{[\w\W]*|^[\w\W]*}}/g), NS = Mt(/<%[\w\W]*|^[\w\W]*%>/g), jS = Mt(/\${[\w\W]*/g), ES = Mt(/^data-[\-\w.\u00B7-\uFFFF]+$/), TS = Mt(/^aria-[\-\w]+$/), W0 = Mt(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), wS = Mt(/^(?:\w+script|data):/i), kS = Mt(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), AS = Mt(/^html$/i), _S = Mt(/^[a-z][.\w]*(-[.\w]+)+$/i), ey = Mt(/<[/\w!]/g), ty = Mt(/<[/\w]/g), CS = Mt(/<\/no(script|embed|frames)/i), OS = Mt(/\/>/i), wn = {
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
}, fv = ["style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript"], RS = kt(Xe({}, fv)), MS = (function() {
  const a = {};
  return ei(fv, (s) => {
    a[s] = Mt(new RegExp("</" + s + "(?=[\\t\\n\\f\\r />])", "i"));
  }), kt(a);
})(), DS = function() {
  return typeof window > "u" ? null : window;
}, zS = function(s, o) {
  if (typeof s != "object" || typeof s.createPolicy != "function")
    return null;
  let u = null;
  const f = "data-tt-policy-suffix";
  o && o.hasAttribute(f) && (u = o.getAttribute(f));
  const d = "dompurify" + (u ? "#" + u : "");
  try {
    return s.createPolicy(d, {
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
}, ny = function() {
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
}, ja = function(s, o, u, f) {
  return dn(s, o) && us(s[o]) ? Xe(f.base ? An(f.base) : {}, s[o], f.transform) : u;
}, Td = function(s, o, u) {
  const f = dn(s, o) ? s[o] : void 0;
  return f && typeof f == "object" ? An(f) : u();
};
function dv() {
  let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : DS();
  const s = (P) => dv(P);
  if (s.version = "3.4.15", s.removed = [], !a || !a.document || a.document.nodeType !== wn.document || !a.Element)
    return s.isSupported = !1, s;
  let o = a.document;
  const u = o, f = u.currentScript;
  a.DocumentFragment;
  const d = a.HTMLTemplateElement, m = a.Node, g = a.Element, b = a.NodeFilter, S = a.NamedNodeMap;
  S === void 0 && (a.NamedNodeMap || a.MozNamedAttrMap), a.HTMLFormElement;
  const v = a.DOMParser, p = a.trustedTypes, N = g.prototype, T = Bn(N, "cloneNode"), E = Bn(N, "remove"), L = Bn(N, "removeAttributeNode"), k = Bn(N, "nextSibling"), V = Bn(N, "childNodes"), X = Bn(N, "parentNode"), U = Bn(N, "shadowRoot"), F = Bn(N, "attributes"), Z = m && m.prototype ? Bn(m.prototype, "nodeType") : null, B = m && m.prototype ? Bn(m.prototype, "nodeName") : null, G = m && m.prototype ? Bn(m.prototype, "ownerDocument") : null, ce = function(j) {
    return Z ? Z(j) : j.nodeType;
  }, Te = function(j) {
    return B ? B(j) : j.nodeName;
  };
  if (typeof d == "function") {
    const P = o.createElement("template");
    P.content && P.content.ownerDocument && (o = P.content.ownerDocument);
  }
  let de, xe = "", pe, W = !1, we = 0;
  const he = function() {
    if (we > 0)
      throw Wa('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.');
  }, J = function(j) {
    he(), we++;
    try {
      return de.createHTML(j);
    } finally {
      we--;
    }
  }, re = function(j) {
    he(), we++;
    try {
      return de.createScriptURL(j);
    } finally {
      we--;
    }
  }, be = function() {
    return W || (pe = zS(p, f), W = !0), pe;
  }, Ue = o, K = Ue.implementation, Ge = Ue.createNodeIterator, st = Ue.createDocumentFragment, hn = Ue.getElementsByTagName, _ = u.importNode;
  let q = ny();
  s.isSupported = typeof uv == "function" && typeof X == "function" && K && K.createHTMLDocument !== void 0;
  const fe = SS, me = NS, ve = jS, Me = ES, De = TS, ue = wS, Se = kS, Dt = _S;
  let Nl = W0, He = null;
  const Vt = Xe({}, [...I0, ...Sd, ...Nd, ...jd, ...J0]);
  let ye = null;
  const Ve = Xe({}, [...F0, ...Ed, ...P0, ...ou]);
  let ut = Object.seal(is(null, {
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
  })), mn = null, ln = null;
  const Oe = Object.seal(is(null, {
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
  let Yn = !0, pn = !0, jl = !1, El = !0, Jt = !1, an = !0, vt = !1, Ft = !1, Q = null, ee = null, Ee = !1, le = !1, Qe = !1, ot = !1, Dc = !0, zc = !1;
  const Xt = "user-content-";
  let vs = !0, ri = !1, Tl = {}, Gn = null;
  const Lc = Xe({}, [
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
  let bs = null;
  const Uc = Xe({}, ["audio", "video", "img", "source", "image", "track"]);
  let Hc = null;
  const Zl = Xe({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), At = "http://www.w3.org/1998/Math/MathML", gn = "http://www.w3.org/2000/svg", ft = "http://www.w3.org/1999/xhtml";
  let Ql = ft, xs = !1, Ss = null;
  const ui = Xe({}, [At, gn, ft], xd), wa = kt(["mi", "mo", "mn", "ms", "mtext"]);
  let Kl = Xe({}, wa);
  const al = kt(["annotation-xml"]);
  let Il = Xe({}, al);
  const ka = Xe({}, ["title", "style", "font", "a", "script"]);
  let Jl = null;
  const qu = ["application/xhtml+xml", "text/html"], Bc = "text/html";
  let ct = null, _n = null;
  const $u = o.createElement("form"), Ns = function(j) {
    return j instanceof RegExp || j instanceof Function;
  }, oi = function() {
    let j = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (_n && _n === j)
      return;
    (!j || typeof j != "object") && (j = {}), j = An(j), Jl = // eslint-disable-next-line unicorn/prefer-includes
    qu.indexOf(j.PARSER_MEDIA_TYPE) === -1 ? Bc : j.PARSER_MEDIA_TYPE, ct = Jl === "application/xhtml+xml" ? xd : jc, He = ja(j, "ALLOWED_TAGS", Vt, {
      transform: ct
    }), ye = ja(j, "ALLOWED_ATTR", Ve, {
      transform: ct
    }), Ss = ja(j, "ALLOWED_NAMESPACES", ui, {
      transform: xd
    }), Hc = ja(j, "ADD_URI_SAFE_ATTR", Zl, {
      transform: ct,
      base: Zl
    }), bs = ja(j, "ADD_DATA_URI_TAGS", Uc, {
      transform: ct,
      base: Uc
    }), Gn = ja(j, "FORBID_CONTENTS", Lc, {
      transform: ct
    }), mn = ja(j, "FORBID_TAGS", An({}), {
      transform: ct
    }), ln = ja(j, "FORBID_ATTR", An({}), {
      transform: ct
    }), Tl = dn(j, "USE_PROFILES") ? j.USE_PROFILES && typeof j.USE_PROFILES == "object" ? An(j.USE_PROFILES) : j.USE_PROFILES : !1, Yn = j.ALLOW_ARIA_ATTR !== !1, pn = j.ALLOW_DATA_ATTR !== !1, jl = j.ALLOW_UNKNOWN_PROTOCOLS || !1, El = j.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Jt = j.SAFE_FOR_TEMPLATES || !1, an = j.SAFE_FOR_XML !== !1, vt = j.WHOLE_DOCUMENT || !1, le = j.RETURN_DOM || !1, Qe = j.RETURN_DOM_FRAGMENT || !1, ot = j.RETURN_TRUSTED_TYPE || !1, Ee = j.FORCE_BODY || !1, Dc = j.SANITIZE_DOM !== !1, zc = j.SANITIZE_NAMED_PROPS || !1, vs = j.KEEP_CONTENT !== !1, ri = j.IN_PLACE || !1, Nl = vS(j.ALLOWED_URI_REGEXP) ? j.ALLOWED_URI_REGEXP : W0, Ql = typeof j.NAMESPACE == "string" ? j.NAMESPACE : ft, Kl = Td(
      j,
      "MATHML_TEXT_INTEGRATION_POINTS",
      () => Xe({}, wa)
      // Default built-in map
    ), Il = Td(
      j,
      "HTML_INTEGRATION_POINTS",
      () => Xe({}, al)
      // Default built-in map
    );
    const M = Td(j, "CUSTOM_ELEMENT_HANDLING", () => is(null));
    if (ut = is(null), dn(M, "tagNameCheck") && Ns(M.tagNameCheck) && (ut.tagNameCheck = M.tagNameCheck), dn(M, "attributeNameCheck") && Ns(M.attributeNameCheck) && (ut.attributeNameCheck = M.attributeNameCheck), dn(M, "allowCustomizedBuiltInElements") && typeof M.allowCustomizedBuiltInElements == "boolean" && (ut.allowCustomizedBuiltInElements = M.allowCustomizedBuiltInElements), Mt(ut), Jt && (pn = !1), Qe && (le = !0), Tl && (He = Xe({}, J0), ye = is(null), Tl.html === !0 && (Xe(He, I0), Xe(ye, F0)), Tl.svg === !0 && (Xe(He, Sd), Xe(ye, Ed), Xe(ye, ou)), Tl.svgFilters === !0 && (Xe(He, Nd), Xe(ye, Ed), Xe(ye, ou)), Tl.mathMl === !0 && (Xe(He, jd), Xe(ye, P0), Xe(ye, ou))), Oe.tagCheck = null, Oe.attributeCheck = null, dn(j, "ADD_TAGS") && (typeof j.ADD_TAGS == "function" ? Oe.tagCheck = j.ADD_TAGS : us(j.ADD_TAGS) && (He === Vt && (He = An(He)), Xe(He, j.ADD_TAGS, ct))), dn(j, "ADD_ATTR") && (typeof j.ADD_ATTR == "function" ? Oe.attributeCheck = j.ADD_ATTR : us(j.ADD_ATTR) && (ye === Ve && (ye = An(ye)), Xe(ye, j.ADD_ATTR, ct))), dn(j, "ADD_FORBID_CONTENTS") && us(j.ADD_FORBID_CONTENTS) && (Gn === Lc && (Gn = An(Gn)), Xe(Gn, j.ADD_FORBID_CONTENTS, ct)), vs && (He["#text"] = !0), vt && Xe(He, ["html", "head", "body"]), He.table && (Xe(He, ["tbody"]), delete mn.tbody), j.TRUSTED_TYPES_POLICY) {
      if (typeof j.TRUSTED_TYPES_POLICY.createHTML != "function")
        throw Wa('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      if (typeof j.TRUSTED_TYPES_POLICY.createScriptURL != "function")
        throw Wa('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      const I = de;
      de = j.TRUSTED_TYPES_POLICY;
      try {
        xe = J("");
      } catch (ae) {
        throw de = I, ae;
      }
    } else j.TRUSTED_TYPES_POLICY === null ? (de = void 0, xe = "") : (de === void 0 && (de = be()), de && typeof xe == "string" && (xe = J("")));
    kt && kt(j), _n = j;
  }, js = Xe({}, [...Sd, ...Nd, ...bS]), fi = Xe({}, [...jd, ...xS]), Es = function(j, M, I) {
    return M.namespaceURI === ft ? j === "svg" : M.namespaceURI === At ? j === "svg" && (I === "annotation-xml" || Kl[I]) : !!js[j];
  }, qc = function(j, M, I) {
    return M.namespaceURI === ft ? j === "math" : M.namespaceURI === gn ? j === "math" && Il[I] : !!fi[j];
  }, $c = function(j, M, I) {
    return M.namespaceURI === gn && !Il[I] || M.namespaceURI === At && !Kl[I] ? !1 : !fi[j] && (ka[j] || !js[j]);
  }, Vn = function(j) {
    let M = X(j);
    (!M || !M.tagName) && (M = {
      namespaceURI: Ql,
      tagName: "template"
    });
    const I = jc(j.tagName), ae = jc(M.tagName);
    return Ss[j.namespaceURI] ? j.namespaceURI === gn ? Es(I, M, ae) : j.namespaceURI === At ? qc(I, M, ae) : j.namespaceURI === ft ? $c(I, M, ae) : !!(Jl === "application/xhtml+xml" && Ss[j.namespaceURI]) : !1;
  }, lt = function(j) {
    vc(s.removed, {
      element: j
    });
    try {
      X(j).removeChild(j);
    } catch {
      if (E(j), !X(j))
        throw Wa("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
    }
  }, zt = function(j, M, I) {
    try {
      L(j, M);
    } catch {
      try {
        j.removeAttribute(I);
      } catch {
      }
    }
  }, Xn = function(j) {
    di(j);
    const M = V(j);
    if (M) {
      const ae = [];
      ei(M, (ie) => {
        vc(ae, ie);
      }), ei(ae, (ie) => {
        try {
          E(ie);
        } catch {
        }
      });
    }
    const I = F(j);
    if (I)
      for (let ae = I.length - 1; ae >= 0; --ae) {
        const ie = I[ae], Ne = ie && ie.name;
        typeof Ne == "string" && zt(j, ie, Ne);
      }
  }, il = function(j, M, I) {
    if (!I)
      try {
        I = M.getAttributeNode(j);
      } catch {
        I = null;
      }
    vc(s.removed, {
      attribute: I || null,
      from: M
    });
    try {
      I ? L(M, I) : M.removeAttribute(j);
    } catch {
      try {
        M.removeAttribute(j);
      } catch {
      }
    }
    if (j === "is")
      if (le || Qe)
        try {
          lt(M);
        } catch {
        }
      else
        try {
          M.setAttribute(j, "");
        } catch {
        }
  }, Yu = function(j) {
    const M = F(j);
    if (M)
      for (let I = M.length - 1; I >= 0; --I) {
        const ae = M[I], ie = ae && ae.name;
        typeof ie != "string" || ye[ct(ie)] || zt(j, ae, ie);
      }
  }, di = function(j) {
    const M = [j];
    for (; M.length > 0; ) {
      const I = M.pop();
      ce(I) === wn.element && Yu(I);
      const ie = V(I);
      if (ie)
        for (let Ne = ie.length - 1; Ne >= 0; --Ne)
          M.push(ie[Ne]);
    }
  }, Ts = function(j, M) {
    return an ? j === "patchsrc" ? !0 : j === "for" && M !== "label" && M !== "output" : !1;
  }, Aa = function(j) {
    if (!an)
      return;
    const M = [j];
    for (; M.length > 0; ) {
      const I = M.pop(), ae = ce(I);
      if (ae === wn.processingInstruction || ae === wn.comment && Qt(ty, I.data)) {
        try {
          E(I);
        } catch {
        }
        continue;
      }
      if (ae === wn.element) {
        const Ne = I, Ie = ct(Te(I));
        try {
          Ne.hasAttribute && Ne.hasAttribute("patchsrc") && Ne.removeAttribute("patchsrc"), Ne.hasAttribute && Ne.hasAttribute("for") && Ts("for", Ie) && Ne.removeAttribute("for");
        } catch {
        }
      }
      const ie = V(I);
      if (ie)
        for (let Ne = ie.length - 1; Ne >= 0; --Ne)
          M.push(ie[Ne]);
    }
  }, _a = function(j) {
    let M = null, I = null;
    if (Ee)
      j = "<remove></remove>" + j;
    else {
      const Ne = X0(j, /^[\r\n\t ]+/);
      I = Ne && Ne[0];
    }
    Jl === "application/xhtml+xml" && Ql === ft && (j = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + j + "</body></html>");
    const ae = de ? J(j) : j;
    if (Ql === ft)
      try {
        M = new v().parseFromString(ae, Jl);
      } catch {
      }
    if (!M || !M.documentElement) {
      M = K.createDocument(Ql, "template", null);
      try {
        M.documentElement.innerHTML = xs ? xe : ae;
      } catch {
      }
    }
    const ie = M.body || M.documentElement;
    return j && I && ie.insertBefore(o.createTextNode(I), ie.childNodes[0] || null), Ql === ft ? hn.call(M, vt ? "html" : "body")[0] : vt ? M.documentElement : ie;
  }, Ca = function(j) {
    const M = G ? G(j) : j.ownerDocument;
    return Ge.call(
      M || j,
      j,
      // eslint-disable-next-line no-bitwise
      b.SHOW_ELEMENT | b.SHOW_COMMENT | b.SHOW_TEXT | b.SHOW_PROCESSING_INSTRUCTION | b.SHOW_CDATA_SECTION,
      null
    );
  }, Cn = function(j) {
    return j = bc(j, fe, " "), j = bc(j, me, " "), j = bc(j, ve, " "), j;
  }, sl = function(j) {
    var M;
    j.normalize();
    const I = G ? G(j) : j.ownerDocument, ae = Ge.call(
      I || j,
      j,
      // eslint-disable-next-line no-bitwise
      b.SHOW_TEXT | b.SHOW_COMMENT | b.SHOW_CDATA_SECTION | b.SHOW_PROCESSING_INSTRUCTION,
      null
    );
    let ie = ae.nextNode();
    for (; ie; )
      ie.data = Cn(ie.data), ie = ae.nextNode();
    const Ne = (M = j.querySelectorAll) === null || M === void 0 ? void 0 : M.call(j, "template");
    Ne && ei(Ne, (Ie) => {
      yn(Ie.content) && sl(Ie.content);
    });
  }, cl = function(j) {
    const M = B ? B(j) : null;
    return typeof M != "string" || ct(M) !== "form" ? !1 : typeof j.nodeName != "string" || typeof j.textContent != "string" || typeof j.removeChild != "function" || // Realm-safe NamedNodeMap detection: equality against the cached
    // prototype getter. Clobbered .attributes (e.g. <input name="attributes">)
    // makes the direct read diverge from the cached read; a clean form
    // (same-realm OR foreign-realm) has both reads pointing at the same
    // canonical NamedNodeMap.
    j.attributes !== F(j) || typeof j.removeAttribute != "function" || // A form descendant named "removeAttributeNode" or "getAttributeNode"
    // shadows these Attr-node methods via [LegacyOverrideBuiltIns].
    // _removeAttribute() / _stripAttributeNode() reach for
    // element.removeAttributeNode(attr) first; when it is shadowed the call
    // throws and the name-based fallback element.removeAttribute(name)
    // ASCII-lowercases its lookup key in an HTML document, silently missing
    // a case-preserved event-handler attribute (e.g. an ONANIMATIONSTART
    // that reached the sanitizer through an XML/XHTML parse). Flag the form
    // so it is removed wholesale, exactly as for the other shadowed methods.
    typeof j.removeAttributeNode != "function" || typeof j.getAttributeNode != "function" || typeof j.setAttribute != "function" || typeof j.namespaceURI != "string" || typeof j.insertBefore != "function" || typeof j.hasChildNodes != "function" || // NodeType clobbering probe. Cached Node.prototype.nodeType getter
    // returns the integer 1 for any Element regardless of realm; direct
    // read on a clobbered form (e.g. <input name="nodeType">) returns
    // the named child element. Cheap addition — nodeType is read from
    // an internal slot, no serialization cost — and removes a residual
    // clobbering surface used by several mXSS / PI / comment branches
    // in _sanitizeElements that compare currentNode.nodeType directly.
    j.nodeType !== Z(j) || // HTMLFormElement has [LegacyOverrideBuiltIns]: a descendant named
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
    j.childNodes !== V(j);
  }, yn = function(j) {
    if (!Z || typeof j != "object" || j === null)
      return !1;
    try {
      return Z(j) === wn.documentFragment;
    } catch {
      return !1;
    }
  }, dt = function(j) {
    if (!Z || typeof j != "object" || j === null)
      return !1;
    try {
      return typeof Z(j) == "number";
    } catch {
      return !1;
    }
  };
  function vn(P, j, M) {
    P.length !== 0 && ei(P, (I) => {
      I.call(s, j, M, _n);
    });
  }
  const Yc = function(j, M) {
    return !!(an && j.hasChildNodes() && !dt(j.firstElementChild) && Qt(ey, j.textContent) && Qt(ey, j.innerHTML) || an && j.namespaceURI === ft && RS[M] && (dt(j.firstElementChild) || typeof j.textContent == "string" && Qt(MS[M], j.textContent)) || j.nodeType === wn.processingInstruction || an && j.nodeType === wn.comment && Qt(ty, j.data));
  }, Oa = function(j, M) {
    if (j instanceof RegExp)
      return Qt(j, M);
    if (j instanceof Function) {
      for (var I = arguments.length, ae = new Array(I > 2 ? I - 2 : 0), ie = 2; ie < I; ie++)
        ae[ie - 2] = arguments[ie];
      return !!j(M, ...ae);
    }
    return !1;
  }, wl = function(j, M, I) {
    if (!mn[M] && $e(M) && Oa(ut.tagNameCheck, M))
      return !1;
    if (vs && !Gn[M]) {
      const ae = X(j), ie = V(j);
      if (ie && ae) {
        const Ne = ie.length;
        for (let Ie = Ne - 1; Ie >= 0; --Ie) {
          const tt = j === I ? T(ie[Ie], !0) : ie[Ie];
          ae.insertBefore(tt, k(j));
        }
      }
    }
    return lt(j), !0;
  }, kl = function(j, M, I, ae) {
    return j.length === 0 ? M : M === I || M === ae ? An(M) : M;
  }, Gc = function(j, M) {
    return j === M || X(j) !== null ? !1 : (ri && di(j), !0);
  }, ws = function(j, M) {
    if (vn(q.beforeSanitizeElements, j, null), Gc(j, M))
      return !0;
    if (cl(j))
      return lt(j), !0;
    const I = ct(Te(j));
    if (He = kl(q.uponSanitizeElement, He, Vt, Q), vn(q.uponSanitizeElement, j, {
      tagName: I,
      allowedTags: He
    }), Gc(j, M))
      return !0;
    if (Yc(j, I))
      return lt(j), !0;
    if (mn[I] || !(Oe.tagCheck instanceof Function && Oe.tagCheck(I)) && !He[I]) {
      const ie = wl(j, I, M);
      return ie === !1 && vn(q.afterSanitizeElements, j, null), ie;
    }
    if (ce(j) === wn.element && !Vn(j) || (I === "noscript" || I === "noembed" || I === "noframes") && Qt(CS, j.innerHTML))
      return lt(j), !0;
    if (Jt && j.nodeType === wn.text) {
      const ie = Cn(j.textContent);
      j.textContent !== ie && (vc(s.removed, {
        element: j.cloneNode()
      }), j.textContent = ie);
    }
    return vn(q.afterSanitizeElements, j, null), !1;
  }, ks = function(j, M, I) {
    if (ln[M] || Ts(M, j) || Dc && (M === "id" || M === "name") && (I in o || I in $u))
      return !1;
    const ae = ye[M] || Oe.attributeCheck instanceof Function && Oe.attributeCheck(M, j);
    return pn && Qt(Me, M) || Yn && Qt(De, M) ? !0 : ae ? Hc[M] || Qt(Nl, bc(I, Se, "")) || (M === "src" || M === "xlink:href" || M === "href") && j !== "script" && Z0(I, "data:") === 0 && bs[j] || jl && !Qt(ue, bc(I, Se, "")) ? !0 : !I : (
      // Condition a) covers a basically valid custom element tag name whose
      // tag passes the configured tagNameCheck and whose attribute name
      // passes the configured attributeNameCheck ...
      $e(j) && Oa(ut.tagNameCheck, j) && Oa(ut.attributeNameCheck, M, j) || // Condition b) covers an `is` attribute whose value passes the
      // configured tagNameCheck while customized built-in elements are
      // allowed.
      M === "is" && ut.allowCustomizedBuiltInElements && Oa(ut.tagNameCheck, I)
    );
  }, Gu = Xe({}, ["annotation-xml", "color-profile", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "missing-glyph"]), $e = function(j) {
    return !Gu[jc(j)] && Qt(Dt, j);
  }, Vc = function(j, M, I, ae) {
    if (de && typeof p == "object" && typeof p.getAttributeType == "function" && !I)
      switch (p.getAttributeType(j, M)) {
        case "TrustedHTML":
          return J(ae);
        case "TrustedScriptURL":
          return re(ae);
      }
    return ae;
  }, hi = function(j, M, I, ae) {
    try {
      return I ? j.setAttributeNS(I, M, ae) : j.setAttribute(M, ae), cl(j) ? (lt(j), !1) : !0;
    } catch {
      return il(M, j), !1;
    }
  }, Ra = function(j) {
    vn(q.beforeSanitizeAttributes, j, null);
    const M = j.attributes;
    if (!M || cl(j))
      return;
    ye = kl(q.uponSanitizeAttribute, ye, Ve, ee);
    const I = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: ye,
      forceKeepAttr: void 0
    };
    let ae = M.length;
    const ie = ct(j.nodeName);
    for (; ae--; ) {
      const Ne = M[ae], Ie = Ne.name, tt = Ne.namespaceURI, bt = Ne.value, Ut = ct(Ie), mi = bt;
      let pt = Ie === "value" ? mi : dS(mi), Xc = !1;
      if (I.attrName = Ut, I.attrValue = pt, I.keepAttr = !0, I.forceKeepAttr = void 0, vn(q.uponSanitizeAttribute, j, I), pt = I.attrValue, zc && (Ut === "id" || Ut === "name") && Z0(pt, Xt) !== 0 && (il(Ie, j, Ne), pt = Xt + pt, Xc = !0), an && Qt(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, pt)) {
        il(Ie, j, Ne);
        continue;
      }
      if (Ut === "attributename" && X0(pt, "href")) {
        il(Ie, j, Ne);
        continue;
      }
      if (!I.forceKeepAttr) {
        if (!I.keepAttr) {
          il(Ie, j, Ne);
          continue;
        }
        if (!El && Qt(OS, pt)) {
          il(Ie, j, Ne);
          continue;
        }
        if (Jt && (pt = Cn(pt)), !ks(ie, Ut, pt)) {
          il(Ie, j, Ne);
          continue;
        }
        pt = Vc(ie, Ut, tt, pt), pt !== mi && hi(j, Ie, tt, pt) && Xc && V0(s.removed);
      }
    }
    vn(q.afterSanitizeAttributes, j, null);
  }, sn = function(j) {
    let M = null;
    const I = Ca(j);
    for (vn(q.beforeSanitizeShadowDOM, j, null); M = I.nextNode(); )
      if (vn(q.uponSanitizeShadowNode, M, null), ws(M, j), Ra(M), yn(M.content) && sn(M.content), ce(M) === wn.element) {
        const ae = U(M);
        yn(ae) && (Lt(ae), sn(ae));
      }
    vn(q.afterSanitizeShadowDOM, j, null);
  }, Lt = function(j) {
    const M = [{
      node: j,
      shadow: null
    }];
    for (; M.length > 0; ) {
      const I = M.pop();
      if (I.shadow) {
        sn(I.shadow);
        continue;
      }
      const ae = I.node, Ne = ce(ae) === wn.element, Ie = V(ae);
      if (Ie)
        for (let tt = Ie.length - 1; tt >= 0; --tt)
          M.push({
            node: Ie[tt],
            shadow: null
          });
      if (Ne) {
        const tt = B ? B(ae) : null;
        if (typeof tt == "string" && ct(tt) === "template") {
          const bt = ae.content;
          yn(bt) && M.push({
            node: bt,
            shadow: null
          });
        }
      }
      if (Ne) {
        const tt = U(ae);
        yn(tt) && M.push({
          node: null,
          shadow: tt
        }, {
          node: tt,
          shadow: null
        });
      }
    }
  };
  return s.sanitize = function(P) {
    let j = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, M = null, I = null, ae = null, ie = null;
    if (xs = !P, xs && (P = "<!-->"), typeof P != "string" && !dt(P) && (P = yS(P), typeof P != "string"))
      throw Wa("dirty is not a string, aborting");
    if (!s.isSupported)
      return P;
    Ft ? (He = Q, ye = ee) : oi(j), (q.uponSanitizeElement.length > 0 || q.uponSanitizeAttribute.length > 0) && (He = An(He)), q.uponSanitizeAttribute.length > 0 && (ye = An(ye)), s.removed = [];
    const Ne = ri && typeof P != "string" && dt(P);
    if (Ne) {
      Aa(P);
      const bt = Te(P);
      if (typeof bt == "string") {
        const Ut = ct(bt);
        if (!He[Ut] || mn[Ut])
          throw Xn(P), Wa("root node is forbidden and cannot be sanitized in-place");
      }
      if (cl(P))
        throw Xn(P), Wa("root node is clobbered and cannot be sanitized in-place");
      try {
        Lt(P);
      } catch (Ut) {
        throw Xn(P), Ut;
      }
    } else if (dt(P))
      M = _a("<!---->"), I = M.ownerDocument.importNode(P, !0), I.nodeType === wn.element && I.nodeName === "BODY" || I.nodeName === "HTML" ? M = I : M.appendChild(I), Lt(M);
    else {
      if (!le && !Jt && !vt && // eslint-disable-next-line unicorn/prefer-includes
      P.indexOf("<") === -1)
        return de && ot ? J(P) : P;
      if (M = _a(P), !M)
        return le ? null : ot ? xe : "";
    }
    M && Ee && lt(M.firstChild);
    const Ie = Ne ? P : M;
    try {
      const bt = Ca(Ie);
      for (; ae = bt.nextNode(); )
        ws(ae, Ie), Ra(ae), yn(ae.content) && sn(ae.content);
    } catch (bt) {
      throw Ne && (Xn(P), ei(s.removed, (Ut) => {
        Ut.element && di(Ut.element);
      })), bt;
    }
    if (Ne)
      return ei(s.removed, (bt) => {
        bt.element && di(bt.element);
      }), Jt && sl(P), P;
    if (le) {
      if (Jt && sl(M), Qe)
        for (ie = st.call(M.ownerDocument); M.firstChild; )
          ie.appendChild(M.firstChild);
      else
        ie = M;
      return (ye.shadowroot || ye.shadowrootmode) && (ie = _.call(u, ie, !0)), ie;
    }
    let tt = vt ? M.outerHTML : M.innerHTML;
    return vt && He["!doctype"] && M.ownerDocument && M.ownerDocument.doctype && M.ownerDocument.doctype.name && Qt(AS, M.ownerDocument.doctype.name) && (tt = "<!DOCTYPE " + M.ownerDocument.doctype.name + `>
` + tt), Jt && (tt = Cn(tt)), de && ot ? J(tt) : tt;
  }, s.setConfig = function() {
    let P = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    oi(P), Ft = !0, Q = He, ee = ye;
  }, s.clearConfig = function() {
    _n = null, Ft = !1, Q = null, ee = null, de = pe, xe = "";
  }, s.isValidAttribute = function(P, j, M) {
    _n || oi({});
    const I = ct(P), ae = ct(j);
    return ks(I, ae, M);
  }, s.addHook = function(P, j) {
    typeof j == "function" && dn(q, P) && vc(q[P], j);
  }, s.removeHook = function(P, j) {
    if (dn(q, P)) {
      if (j !== void 0) {
        const M = oS(q[P], j);
        return M === -1 ? void 0 : fS(q[P], M, 1)[0];
      }
      return V0(q[P]);
    }
  }, s.removeHooks = function(P) {
    dn(q, P) && (q[P] = []);
  }, s.removeAllHooks = function() {
    q = ny();
  }, s;
}
var hv = dv();
function fh() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var ci = fh();
function mv(a) {
  ci = a;
}
var ni = { exec: () => null };
function Pi(a) {
  let s = [];
  return (o) => {
    let u = Math.max(0, Math.min(3, o - 1)), f = s[u];
    return f || (f = a(u), s[u] = f), f;
  };
}
function Ce(a, s = "") {
  let o = typeof a == "string" ? a : a.source, u = { replace: (f, d) => {
    let m = typeof d == "string" ? d : d.source;
    return m = m.replace(It.caret, "$1"), o = o.replace(f, m), u;
  }, getRegex: () => new RegExp(o, s) };
  return u;
}
var LS = ((a = "") => {
  try {
    return !!new RegExp("(?<=1)(?<!1)" + a);
  } catch {
    return !1;
  }
})(), It = { codeRemoveIndent: /^(?: {0,3}\t| {1,4})/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, endingSpaceTabChar: /[ \t]$/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (a) => new RegExp(`^( {0,3}${a})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: Pi((a) => new RegExp(`^ {0,${a}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)), hrRegex: Pi((a) => new RegExp(`^ {0,${a}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)), fencesBeginRegex: Pi((a) => new RegExp(`^ {0,${a}}(?:\`\`\`|~~~)`)), headingBeginRegex: Pi((a) => new RegExp(`^ {0,${a}}#`)), htmlBeginRegex: Pi((a) => new RegExp(`^ {0,${a}}(?:</?(?:${Oc})(?: +|$|/?>)|<(?:script|pre|style|textarea|!--))`, "i")), blockquoteBeginRegex: Pi((a) => new RegExp(`^ {0,${a}}>`)) }, US = /^(?:[ \t]*(?:\n|$))+/, HS = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, BS = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Cc = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, qS = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, dh = / {0,3}(?:[*+-]|\d{1,9}[.)])/, pv = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, gv = Ce(pv).replace(/bull/g, dh).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), $S = Ce(pv).replace(/bull/g, dh).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), hh = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/, YS = /^[^\n]+/, mh = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, GS = Ce(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", mh).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), VS = Ce(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, dh).getRegex(), Oc = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", ph = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, XS = Ce("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", ph).replace("tag", Oc).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), yv = (a) => Ce(hh).replace("hr", Cc).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", a).replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Oc).getRegex(), ZS = yv(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/), QS = yv(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/), KS = Ce(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", QS).getRegex(), gh = { blockquote: KS, code: HS, def: GS, fences: BS, heading: qS, hr: Cc, html: XS, lheading: gv, list: VS, newline: US, paragraph: ZS, table: ni, text: YS }, ly = Ce("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Cc).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Oc).getRegex(), IS = { ...gh, lheading: $S, table: ly, paragraph: Ce(hh).replace("hr", Cc).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ly).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Oc).getRegex() }, JS = { ...gh, html: Ce(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", ph).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: ni, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: Ce(hh).replace("hr", Cc).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", gv).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, FS = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, PS = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, vv = /^( {2,}|\\)\n(?!\s*$)[ \t]*/, WS = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Vl = /[\p{P}\p{S}]/u, ms = /[\s\p{P}\p{S}]/u, Rc = /[^\s\p{P}\p{S}]/u, eN = Ce(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, ms).getRegex(), tN = /[\p{Pi}\p{Ps}"']/u, bv = /(?!~)[\p{P}\p{S}]/u, nN = /(?!~)[\s\p{P}\p{S}]/u, lN = /(?:[^\s\p{P}\p{S}]|~)/u, aN = Ce(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", LS ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), xv = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/, iN = Ce(xv, "u").replace(/punct/g, Vl).getRegex(), sN = Ce(xv, "u").replace(/punct/g, bv).getRegex(), cN = /^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, rN = Ce(cN, "u").replace(/openQuote/g, tN).replace(/punct/g, Vl).getRegex(), Sv = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", uN = Ce(Sv, "gu").replace(/notPunctSpace/g, Rc).replace(/punctSpace/g, ms).replace(/punct/g, Vl).getRegex(), oN = Ce(Sv, "gu").replace(/notPunctSpace/g, lN).replace(/punctSpace/g, nN).replace(/punct/g, bv).getRegex(), fN = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", dN = Ce(fN, "gu").replace(/notPunctSpace/g, Rc).replace(/punctSpace/g, ms).replace(/punct/g, Vl).getRegex(), hN = Ce("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Rc).replace(/punctSpace/g, ms).replace(/punct/g, Vl).getRegex(), mN = "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", pN = Ce(mN, "gu").replace(/notPunctSpace/g, Rc).replace(/punctSpace/g, ms).replace(/punct/g, Vl).getRegex(), gN = Ce(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, Vl).getRegex(), yN = "^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", vN = Ce(yN, "gu").replace(/notPunctSpace/g, Rc).replace(/punctSpace/g, ms).replace(/punct/g, Vl).getRegex(), bN = Ce(/\\(punct)/, "gu").replace(/punct/g, Vl).getRegex(), xN = Ce(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), SN = Ce(ph).replace("(?:-->|$)", "-->").getRegex(), NN = Ce("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", SN).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Nv = /\[(?:\\[\s\S]|[^\[\]\\])*\]/, ku = Ce(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets", Nv).getRegex(), jN = Ce(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", ku).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), EN = Ce(/^!?\[(label)\]\[(ref)\]/).replace("label", ku).replace("ref", mh).getRegex(), TN = Ce(/^!?\[(ref)\](?:\[\])?/).replace("ref", mh).getRegex(), ay = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/, wN = Ce(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets", Nv).getRegex(), kN = Ce("reflink|nolink(?!\\()", "g").replace("reflink", Ce(/^!?\[(label)\]\[(ref)\]/).replace("label", wN).replace("ref", ay).getRegex()).replace("nolink", Ce(/^!?\[(ref)\](?:\[\])?/).replace("ref", ay).getRegex()).getRegex(), iy = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, yh = { _backpedal: ni, anyPunctuation: bN, autolink: xN, blockSkip: aN, br: vv, code: PS, del: ni, delLDelim: ni, delRDelim: ni, emStrongLDelim: iN, emStrongRDelimAst: uN, emStrongRDelimUnd: hN, escape: FS, link: jN, nolink: TN, punctuation: eN, reflink: EN, reflinkSearch: kN, tag: NN, text: WS, url: ni }, AN = { ...yh, emStrongLDelim: rN, emStrongRDelimAst: dN, emStrongRDelimUnd: pN, link: Ce(/^!?\[(label)\]\((.*?)\)/).replace("label", ku).getRegex(), reflink: Ce(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", ku).getRegex() }, qd = { ...yh, emStrongRDelimAst: oN, emStrongLDelim: sN, delLDelim: gN, delRDelim: vN, url: Ce(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", iy).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: Ce(/^(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", iy).getRegex() }, _N = { ...qd, br: Ce(vv).replace("{2,}", "*").getRegex(), text: Ce(qd.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, fu = { normal: gh, gfm: IS, pedantic: JS }, Sc = { normal: yh, gfm: qd, breaks: _N, pedantic: AN }, CN = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, sy = (a) => CN[a];
function kn(a, s) {
  if (s) {
    if (It.escapeTest.test(a)) return a.replace(It.escapeReplace, sy);
  } else if (It.escapeTestNoEncode.test(a)) return a.replace(It.escapeReplaceNoEncode, sy);
  return a;
}
function cy(a) {
  try {
    a = encodeURI(a).replace(It.percentDecode, "%");
  } catch {
    return null;
  }
  return a;
}
function ry(a, s) {
  let o = a.replace(It.findPipe, (d, m, g) => {
    let b = !1, S = m;
    for (; --S >= 0 && g[S] === "\\"; ) b = !b;
    return b ? "|" : " |";
  }), u = o.split(It.splitPipe), f = 0;
  if (u[0].trim() || u.shift(), u.length > 0 && !u.at(-1)?.trim() && u.pop(), s) if (u.length > s) u.splice(s);
  else for (; u.length < s; ) u.push("");
  for (; f < u.length; f++) u[f] = u[f].trim().replace(It.slashPipe, "|");
  return u;
}
function Ea(a, s, o) {
  let u = a.length;
  if (u === 0) return "";
  let f = 0;
  for (; f < u && a.charAt(u - f - 1) === s; )
    f++;
  return a.slice(0, u - f);
}
function uy(a) {
  let s = a.split(`
`), o = s.length - 1;
  for (; o >= 0 && It.blankLine.test(s[o]); ) o--;
  return s.length - o <= 2 ? a : s.slice(0, o + 1).join(`
`);
}
function Au(a) {
  return a.toLowerCase().toUpperCase().toLowerCase();
}
function ON(a, s) {
  if (a.indexOf(s[1]) === -1) return -1;
  let o = 0;
  for (let u = 0; u < a.length; u++) if (a[u] === "\\") u++;
  else if (a[u] === s[0]) o++;
  else if (a[u] === s[1] && (o--, o < 0)) return u;
  return o > 0 ? -2 : -1;
}
function RN(a, s = 0) {
  let o = s, u = "";
  for (let f of a) if (f === "	") {
    let d = 4 - o % 4;
    u += " ".repeat(d), o += d;
  } else u += f, o++;
  return u;
}
function oy(a, s, o, u, f) {
  let d = s.href, m = s.title || null, g = a[1].replace(f.other.outputLinkReplace, "$1"), b = a[0].charAt(0) === "!";
  u.state.inLink = !0;
  let S = u.state.linkEmitted, v = u.state.inRawBlock;
  u.state.linkEmitted = !1;
  let p = u.inlineTokens(g), N = u.state.linkEmitted;
  if (u.state.linkEmitted = S, u.state.inLink = !1, !b) {
    if (N) {
      u.state.inRawBlock = v;
      return;
    }
    u.state.linkEmitted = !0;
  }
  return { type: b ? "image" : "link", raw: o, href: d, title: m, text: g, tokens: p };
}
function MN(a, s, o) {
  let u = a.match(o.other.indentCodeCompensation);
  if (u === null) return s;
  let f = u[1];
  return s.split(`
`).map((d) => {
    let m = d.match(o.other.beginningSpace);
    if (m === null) return d;
    let [g] = m;
    return d.slice(Math.min(g.length, f.length));
  }).join(`
`);
}
function fy(a, s, o, u) {
  if (!s.includes("<")) return !1;
  for (let f = 0; f < s.length; f++) {
    if (s[f] === "\\") {
      f++;
      continue;
    }
    if (s[f] === "`") {
      let g = u.inline.code.exec(s.slice(f));
      if (g) {
        f += g[0].length - 1;
        continue;
      }
    }
    if (s[f] !== "<") continue;
    let d = a.slice(o + f), m = u.inline.tag.exec(d) || u.inline.autolink.exec(d);
    if (m) {
      if (m[0].length > s.length - f) return !0;
      f += m[0].length - 1;
    }
  }
  return !1;
}
var _u = class {
  options;
  rules;
  lexer;
  constructor(a) {
    this.options = a || ci;
  }
  space(a) {
    let s = this.rules.block.newline.exec(a);
    if (s && s[0].length > 0) return { type: "space", raw: s[0] };
  }
  code(a) {
    let s = this.rules.block.code.exec(a);
    if (s) {
      let o = this.options.pedantic ? s[0] : uy(s[0]), u = o.replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: o, codeBlockStyle: "indented", text: u };
    }
  }
  fences(a) {
    let s = this.rules.block.fences.exec(a);
    if (s) {
      let o = s[0], u = MN(o, s[3] || "", this.rules);
      return { type: "code", raw: o, lang: s[2] ? s[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : s[2], text: u };
    }
  }
  heading(a) {
    let s = this.rules.block.heading.exec(a);
    if (s) {
      let o = s[2].trim();
      if (this.rules.other.endingHash.test(o)) {
        let u = Ea(o, "#");
        (this.options.pedantic || !u || this.rules.other.endingSpaceTabChar.test(u)) && (o = u.trim());
      }
      return { type: "heading", raw: Ea(s[0], `
`), depth: s[1].length, text: o, tokens: this.lexer.inline(o) };
    }
  }
  hr(a) {
    let s = this.rules.block.hr.exec(a);
    if (s) return { type: "hr", raw: Ea(s[0], `
`) };
  }
  blockquote(a) {
    let s = this.rules.block.blockquote.exec(a);
    if (s) {
      let o = Ea(s[0], `
`).split(`
`), u = "", f = "", d = [];
      for (; o.length > 0; ) {
        let m = !1, g = [], b;
        for (b = 0; b < o.length; b++) if (this.rules.other.blockquoteStart.test(o[b])) g.push(o[b]), m = !0;
        else if (!m) g.push(o[b]);
        else break;
        o = o.slice(b);
        let S = g.join(`
`), v = S.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        u = u ? `${u}
${S}` : S, f = f ? `${f}
${v}` : v;
        let p = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(v, d, !0), this.lexer.state.top = p, o.length === 0) break;
        let N = d.at(-1);
        if (N?.type === "code") break;
        if (N?.type === "blockquote") {
          let T = N, E = o.join(`
`), L = T.raw + `
` + E.replace(this.rules.other.blockquoteSetextReplace2, ""), k = this.blockquote(L);
          d[d.length - 1] = k, u = `${u}
${E}`, f = f.substring(0, f.length - T.text.length) + k.text;
          break;
        } else if (N?.type === "list") {
          let T = N, E = T.raw + `
` + o.join(`
`), L = this.list(E);
          d[d.length - 1] = L, u = u.substring(0, u.length - N.raw.length) + L.raw, f = f.substring(0, f.length - T.raw.length) + L.raw, o = E.substring(d.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: u, tokens: d, text: f };
    }
  }
  list(a) {
    let s = this.rules.block.list.exec(a);
    if (s) {
      let o = s[1].trim(), u = o.length > 1, f = { type: "list", raw: "", ordered: u, start: u ? +o.slice(0, -1) : "", loose: !1, items: [] };
      o = u ? `\\d{1,9}\\${o.slice(-1)}` : `\\${o}`, this.options.pedantic && (o = u ? o : "[*+-]");
      let d = this.rules.other.listItemRegex(o), m = !1;
      for (; a; ) {
        let b = !1, S = "", v = "";
        if (!(s = d.exec(a)) || this.rules.block.hr.test(a)) break;
        S = s[0], a = a.substring(S.length);
        let p = RN(s[2].split(`
`, 1)[0], s[1].length), N = a.split(`
`, 1)[0], T = !p.trim(), E = 0;
        if (this.options.pedantic ? (E = 2, v = p.trimStart()) : T ? E = s[1].length + 1 : (E = p.search(this.rules.other.nonSpaceChar), E = E > 4 ? 1 : E, v = p.slice(E), E += s[1].length), T && this.rules.other.blankLine.test(N) && (S += N + `
`, a = a.substring(N.length + 1), b = !0), !b) {
          let L = this.rules.other.nextBulletRegex(E), k = this.rules.other.hrRegex(E), V = this.rules.other.fencesBeginRegex(E), X = this.rules.other.headingBeginRegex(E), U = this.rules.other.htmlBeginRegex(E), F = this.rules.other.blockquoteBeginRegex(E);
          for (; a; ) {
            let Z = a.split(`
`, 1)[0], B;
            if (N = Z, this.options.pedantic ? (N = N.replace(this.rules.other.listReplaceNesting, "  "), B = N) : B = N.replace(this.rules.other.tabCharGlobal, "    "), V.test(N) || X.test(N) || U.test(N) || F.test(N) || L.test(N) || k.test(N)) break;
            if (B.search(this.rules.other.nonSpaceChar) >= E || !N.trim()) v += `
` + B.slice(E);
            else {
              if (T || p.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || V.test(p) || X.test(p) || k.test(p)) break;
              v += `
` + N;
            }
            T = !N.trim(), S += Z + `
`, a = a.substring(Z.length + 1), p = B.slice(E);
          }
        }
        f.loose || (m ? f.loose = !0 : this.rules.other.doubleBlankLine.test(S) && (m = !0)), f.items.push({ type: "list_item", raw: S, task: !!this.options.gfm && this.rules.other.listIsTask.test(v), loose: !1, text: v, tokens: [] }), f.raw += S;
      }
      let g = f.items.at(-1);
      if (g) g.raw = g.raw.trimEnd(), g.text = g.text.trimEnd();
      else return;
      f.raw = f.raw.trimEnd();
      for (let b of f.items) if (this.lexer.state.top = !1, b.tokens = this.lexer.blockTokens(b.text, []), !f.loose) {
        let S = b.tokens.filter((p) => p.type === "space"), v = S.length > 0 && S.some((p) => this.rules.other.anyLine.test(p.raw));
        f.loose = v;
      }
      for (let b of f.items) {
        let S = b.tokens[0];
        if (b.task && (S?.type === "text" || S?.type === "paragraph")) {
          b.text = b.text.replace(this.rules.other.listReplaceTask, ""), S.raw = S.raw.replace(this.rules.other.listReplaceTask, ""), S.text = S.text.replace(this.rules.other.listReplaceTask, "");
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
        for (let S of b.tokens) S.type === "text" && (S.type = "paragraph");
      }
      return f;
    }
  }
  html(a) {
    let s = this.rules.block.html.exec(a);
    if (s) {
      let o = uy(s[0]);
      return { type: "html", block: !0, raw: o, pre: s[1] === "pre" || s[1] === "script" || s[1] === "style", text: o };
    }
  }
  def(a) {
    let s = this.rules.block.def.exec(a);
    if (s) {
      let o = Au(s[1]).replace(this.rules.other.multipleSpaceGlobal, " "), u = s[2] ? s[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", f = s[3] ? s[3].substring(1, s[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : s[3];
      return { type: "def", tag: o, raw: Ea(s[0], `
`), href: u, title: f };
    }
  }
  table(a) {
    let s = this.rules.block.table.exec(a);
    if (!s || !this.rules.other.tableDelimiter.test(s[2])) return;
    let o = ry(s[1]), u = s[2].replace(this.rules.other.tableAlignChars, "").split("|"), f = s[3]?.trim() ? s[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], d = { type: "table", raw: Ea(s[0], `
`), header: [], align: [], rows: [] };
    if (o.length === u.length) {
      for (let m of u) this.rules.other.tableAlignRight.test(m) ? d.align.push("right") : this.rules.other.tableAlignCenter.test(m) ? d.align.push("center") : this.rules.other.tableAlignLeft.test(m) ? d.align.push("left") : d.align.push(null);
      for (let m = 0; m < o.length; m++) d.header.push({ text: o[m], tokens: this.lexer.inline(o[m]), header: !0, align: d.align[m] });
      for (let m of f) d.rows.push(ry(m, d.header.length).map((g, b) => ({ text: g, tokens: this.lexer.inline(g), header: !1, align: d.align[b] })));
      return d;
    }
  }
  lheading(a) {
    let s = this.rules.block.lheading.exec(a);
    if (s) {
      let o = s[1].trim();
      return { type: "heading", raw: Ea(s[0], `
`), depth: s[2].charAt(0) === "=" ? 1 : 2, text: o, tokens: this.lexer.inline(o) };
    }
  }
  paragraph(a) {
    let s = this.rules.block.paragraph.exec(a);
    if (s) {
      let o = s[1].charAt(s[1].length - 1) === `
` ? s[1].slice(0, -1) : s[1];
      return { type: "paragraph", raw: s[0], text: o, tokens: this.lexer.inline(o) };
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
      let o = s[0].charAt(0) === "!" ? 2 : 1;
      if (!this.options.pedantic && fy(a, s[1], o, this.rules)) return;
      let u = s[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(u)) {
        if (!this.rules.other.endAngleBracket.test(u)) return;
        let m = Ea(u.slice(0, -1), "\\");
        if ((u.length - m.length) % 2 === 0) return;
      } else {
        let m = ON(s[2], "()");
        if (m === -2) return;
        if (m > -1) {
          let g = (s[0].indexOf("!") === 0 ? 5 : 4) + s[1].length + m;
          s[2] = s[2].substring(0, m), s[0] = s[0].substring(0, g).trim(), s[3] = "";
        }
      }
      let f = s[2], d = "";
      if (this.options.pedantic) {
        let m = this.rules.other.pedanticHrefTitle.exec(f);
        m && (f = m[1], d = m[3]);
      } else d = s[3] ? s[3].slice(1, -1) : "";
      return f = f.trim(), this.rules.other.startAngleBracket.test(f) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(u) ? f = f.slice(1) : f = f.slice(1, -1)), oy(s, { href: f && f.replace(this.rules.inline.anyPunctuation, "$1"), title: d && d.replace(this.rules.inline.anyPunctuation, "$1") }, s[0], this.lexer, this.rules);
    }
  }
  reflink(a, s) {
    let o;
    if ((o = this.rules.inline.reflink.exec(a)) || (o = this.rules.inline.nolink.exec(a))) {
      let u = o[0].charAt(0) === "!" ? 2 : 1;
      if (!this.options.pedantic && fy(a, o[1], u, this.rules)) return;
      let f = (o[2] || o[1]).replace(this.rules.other.multipleSpaceGlobal, " "), d = s[Au(f)];
      if (!d) {
        let m = o[0].charAt(0);
        return { type: "text", raw: m, text: m };
      }
      return oy(o, d, o[0], this.lexer, this.rules);
    }
  }
  emStrong(a, s, o = "") {
    let u = this.rules.inline.emStrongLDelim.exec(a);
    if (!(!u || !u[1] && !u[2] && !u[3] && !u[4] || u[4] && o.match(this.rules.other.unicodeAlphaNumeric)) && (!(u[1] || u[3]) || !o || this.rules.inline.punctuation.exec(o))) {
      let f = [...u[0]].length - 1, d, m, g = f, b = 0, S = u[0][0], v = o === S, p = S === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (p.lastIndex = 0, s = s.slice(-1 * a.length + f); (u = p.exec(s)) !== null; ) {
        if (d = u[1] || u[2] || u[3] || u[4] || u[5] || u[6], !d) continue;
        if (m = [...d].length, u[3] || u[4]) {
          g += m;
          continue;
        } else if (u[5] || u[6]) {
          if (f % 3 && !((f + m) % 3)) {
            b += m;
            continue;
          }
          if (v) break;
        }
        if (g -= m, g > 0) continue;
        m = Math.min(m, m + g + b);
        let N = [...u[0]][0].length, T = a.slice(0, f + u.index + N + m);
        if (Math.min(f, m) % 2) {
          let L = T.slice(1, -1);
          return { type: "em", raw: T, text: L, tokens: this.lexer.inlineTokens(L) };
        }
        let E = T.slice(2, -2);
        return { type: "strong", raw: T, text: E, tokens: this.lexer.inlineTokens(E) };
      }
    }
  }
  codespan(a) {
    let s = this.rules.inline.code.exec(a);
    if (s) {
      let o = s[2].replace(this.rules.other.newLineCharGlobal, " "), u = this.rules.other.nonSpaceChar.test(o), f = this.rules.other.startingSpaceChar.test(o) && this.rules.other.endingSpaceChar.test(o);
      return u && f && (o = o.substring(1, o.length - 1)), { type: "codespan", raw: s[0], text: o };
    }
  }
  br(a) {
    let s = this.rules.inline.br.exec(a);
    if (s) return { type: "br", raw: s[0] };
  }
  del(a, s, o = "") {
    let u = this.rules.inline.delLDelim.exec(a);
    if (u && (!u[1] || !o || this.rules.inline.punctuation.exec(o))) {
      let f = [...u[0]].length - 1, d, m, g = f, b = this.rules.inline.delRDelim;
      for (b.lastIndex = 0, s = s.slice(-1 * a.length + f); (u = b.exec(s)) !== null; ) {
        if (d = u[1] || u[2] || u[3] || u[4] || u[5] || u[6], !d || (m = [...d].length, m !== f)) continue;
        if (u[3] || u[4]) {
          g += m;
          continue;
        }
        if (g -= m, g > 0) continue;
        m = Math.min(m, m + g);
        let S = [...u[0]][0].length, v = a.slice(0, f + u.index + S + m), p = v.slice(f, -f);
        return { type: "del", raw: v, text: p, tokens: this.lexer.inlineTokens(p) };
      }
    }
  }
  autolink(a) {
    let s = this.rules.inline.autolink.exec(a);
    if (s) {
      let o, u;
      return s[2] === "@" ? (o = s[1], u = "mailto:" + o) : (o = s[1], u = o), { type: "link", raw: s[0], text: o, href: u, autolink: !0, tokens: [{ type: "text", raw: o, text: o }] };
    }
  }
  url(a) {
    let s;
    if (s = this.rules.inline.url.exec(a)) {
      let o, u;
      if (s[2] === "@") o = s[0], u = "mailto:" + o;
      else {
        let f;
        do
          f = s[0], s[0] = this.rules.inline._backpedal.exec(s[0])?.[0] ?? "";
        while (f !== s[0]);
        o = s[0], s[1] === "www." ? u = "http://" + s[0] : u = s[0];
      }
      return { type: "link", raw: s[0], text: o, href: u, autolink: !0, tokens: [{ type: "text", raw: o, text: o }] };
    }
  }
  inlineText(a) {
    let s = this.rules.inline.text.exec(a);
    if (s) {
      let o = this.lexer.state.inRawBlock;
      return { type: "text", raw: s[0], text: s[0], escaped: o };
    }
  }
}, Pn = class $d {
  tokens;
  options;
  state;
  inlineQueue;
  tokenizer;
  constructor(s) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = s || ci, this.options.tokenizer = this.options.tokenizer || new _u(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, linkEmitted: !1, top: !0 };
    let o = { other: It, block: fu.normal, inline: Sc.normal };
    this.options.pedantic ? (o.block = fu.pedantic, o.inline = Sc.pedantic) : this.options.gfm && (o.block = fu.gfm, this.options.breaks ? o.inline = Sc.breaks : o.inline = Sc.gfm), this.tokenizer.rules = o;
  }
  static get rules() {
    return { block: fu, inline: Sc };
  }
  static lex(s, o) {
    return new $d(o).lex(s);
  }
  static lexInline(s, o) {
    return new $d(o).inlineTokens(s);
  }
  lex(s) {
    s = s.replace(It.carriageReturn, `
`), this.blockTokens(s, this.tokens);
    for (let o = 0; o < this.inlineQueue.length; o++) {
      let u = this.inlineQueue[o];
      this.inlineTokens(u.src, u.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(s, o = [], u = !1) {
    this.tokenizer.lexer = this, this.options.pedantic && (s = s.replace(It.tabCharGlobal, "    ").replace(It.spaceLine, ""));
    let f = 1 / 0;
    for (; s; ) {
      if (s.length < f) f = s.length;
      else {
        this.infiniteLoopError(s.charCodeAt(0));
        break;
      }
      let d;
      if (this.options.extensions?.block?.some((g) => (d = g.call({ lexer: this }, s, o)) ? (s = s.substring(d.raw.length), o.push(d), !0) : !1)) continue;
      if (d = this.tokenizer.space(s)) {
        s = s.substring(d.raw.length);
        let g = o.at(-1);
        d.raw.length === 1 && g !== void 0 ? g.raw += `
` : o.push(d);
        continue;
      }
      if (d = this.tokenizer.code(s)) {
        s = s.substring(d.raw.length);
        let g = o.at(-1);
        g?.type === "paragraph" || g?.type === "text" ? (g.raw += (g.raw.endsWith(`
`) ? "" : `
`) + d.raw, g.text += `
` + d.text, this.inlineQueue.at(-1).src = g.text) : o.push(d);
        continue;
      }
      if (d = this.tokenizer.fences(s)) {
        s = s.substring(d.raw.length), o.push(d);
        continue;
      }
      if (d = this.tokenizer.heading(s)) {
        s = s.substring(d.raw.length), o.push(d);
        continue;
      }
      if (d = this.tokenizer.hr(s)) {
        s = s.substring(d.raw.length), o.push(d);
        continue;
      }
      if (d = this.tokenizer.blockquote(s)) {
        s = s.substring(d.raw.length), o.push(d);
        continue;
      }
      if (d = this.tokenizer.list(s)) {
        s = s.substring(d.raw.length), o.push(d);
        continue;
      }
      if (d = this.tokenizer.html(s)) {
        s = s.substring(d.raw.length), o.push(d);
        continue;
      }
      if (d = this.tokenizer.def(s)) {
        s = s.substring(d.raw.length);
        let g = o.at(-1);
        g?.type === "paragraph" || g?.type === "text" ? (g.raw += (g.raw.endsWith(`
`) ? "" : `
`) + d.raw, g.text += `
` + d.raw, this.inlineQueue.at(-1).src = g.text) : this.tokens.links[d.tag] || (this.tokens.links[d.tag] = { href: d.href, title: d.title }, o.push(d));
        continue;
      }
      if (d = this.tokenizer.table(s)) {
        s = s.substring(d.raw.length), o.push(d);
        continue;
      }
      if (d = this.tokenizer.lheading(s)) {
        s = s.substring(d.raw.length), o.push(d);
        continue;
      }
      let m = s;
      if (this.options.extensions?.startBlock) {
        let g = 1 / 0, b = s.slice(1), S;
        this.options.extensions.startBlock.forEach((v) => {
          S = v.call({ lexer: this }, b), typeof S == "number" && S >= 0 && (g = Math.min(g, S));
        }), g < 1 / 0 && g >= 0 && (m = s.substring(0, g + 1));
      }
      if (this.state.top && (d = this.tokenizer.paragraph(m))) {
        let g = o.at(-1);
        u && g?.type === "paragraph" ? (g.raw += (g.raw.endsWith(`
`) ? "" : `
`) + d.raw, g.text += `
` + d.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = g.text) : o.push(d), u = m.length !== s.length, s = s.substring(d.raw.length);
        continue;
      }
      if (d = this.tokenizer.text(s)) {
        s = s.substring(d.raw.length);
        let g = o.at(-1);
        g?.type === "text" ? (g.raw += (g.raw.endsWith(`
`) ? "" : `
`) + d.raw, g.text += `
` + d.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = g.text) : o.push(d);
        continue;
      }
      if (s) {
        this.infiniteLoopError(s.charCodeAt(0));
        break;
      }
    }
    return this.state.top = !0, o;
  }
  inline(s, o = []) {
    return this.inlineQueue.push({ src: s, tokens: o }), o;
  }
  linkInText(s) {
    if (!s.includes("[")) return !1;
    let o = this.tokenizer.rules.inline.link;
    for (let u of s.matchAll(this.tokenizer.rules.inline.blockSkip)) if (o.test(u[0]) && s.charAt(u.index - 1) !== "!") return !0;
    for (let u of s.matchAll(this.tokenizer.rules.inline.reflinkSearch)) {
      let f = u[0], d = f.lastIndexOf("[");
      if (!(f.charAt(0) === "!" || !Object.hasOwn(this.tokens.links, Au(f.slice(d + 1, -1)))) && !(d > 1 && this.linkInText(f.slice(1, d - 1)))) return !0;
    }
    return !1;
  }
  inlineTokens(s, o = []) {
    this.tokenizer.lexer = this;
    let u = s;
    if (this.tokens.links && s.includes("[")) {
      let g = this.tokenizer.rules.inline.reflinkSearch, b = (S) => {
        let v = S.lastIndexOf("[");
        if (!Object.hasOwn(this.tokens.links, Au(S.slice(v + 1, -1)))) return S;
        if (v > 1 && S.charAt(0) !== "!") {
          let p = S.slice(1, v - 1);
          if (this.linkInText(p)) return "[" + p.replace(g, b) + "][" + "a".repeat(S.length - v - 2) + "]";
        }
        return "[" + "a".repeat(S.length - 2) + "]";
      };
      u = u.replace(g, b);
    }
    u = u.replace(this.tokenizer.rules.inline.anyPunctuation, (g) => "+".repeat(g.length)), u = u.replace(this.tokenizer.rules.inline.blockSkip, (g, b, S) => {
      let v = S ? S.length : 0;
      return g.slice(0, v) + "[" + "a".repeat(g.length - v - 2) + "]";
    }), u = this.options.hooks?.emStrongMask?.call({ lexer: this }, u) ?? u;
    let f = !1, d = "", m = 1 / 0;
    for (; s; ) {
      if (s.length < m) m = s.length;
      else {
        this.infiniteLoopError(s.charCodeAt(0));
        break;
      }
      f || (d = ""), f = !1;
      let g;
      if (this.options.extensions?.inline?.some((S) => (g = S.call({ lexer: this }, s, o)) ? (s = s.substring(g.raw.length), o.push(g), !0) : !1)) continue;
      if (g = this.tokenizer.escape(s)) {
        s = s.substring(g.raw.length), o.push(g);
        continue;
      }
      if (g = this.tokenizer.tag(s)) {
        s = s.substring(g.raw.length), o.push(g);
        continue;
      }
      if (g = this.tokenizer.link(s)) {
        s = s.substring(g.raw.length), o.push(g);
        continue;
      }
      if (g = this.tokenizer.reflink(s, this.tokens.links)) {
        s = s.substring(g.raw.length);
        let S = o.at(-1);
        g.type === "text" && S?.type === "text" ? (S.raw += g.raw, S.text += g.text) : o.push(g);
        continue;
      }
      if (g = this.tokenizer.emStrong(s, u, d)) {
        s = s.substring(g.raw.length), o.push(g);
        continue;
      }
      if (g = this.tokenizer.codespan(s)) {
        s = s.substring(g.raw.length), o.push(g);
        continue;
      }
      if (g = this.tokenizer.br(s)) {
        s = s.substring(g.raw.length), o.push(g);
        continue;
      }
      if (g = this.tokenizer.del(s, u, d)) {
        s = s.substring(g.raw.length), o.push(g);
        continue;
      }
      if (g = this.tokenizer.autolink(s)) {
        s = s.substring(g.raw.length), o.push(g);
        continue;
      }
      if (!this.state.inLink && (g = this.tokenizer.url(s))) {
        s = s.substring(g.raw.length), o.push(g);
        continue;
      }
      let b = s;
      if (this.options.extensions?.startInline) {
        let S = 1 / 0, v = s.slice(1), p;
        this.options.extensions.startInline.forEach((N) => {
          p = N.call({ lexer: this }, v), typeof p == "number" && p >= 0 && (S = Math.min(S, p));
        }), S < 1 / 0 && S >= 0 && (b = s.substring(0, S + 1));
      }
      if (g = this.tokenizer.inlineText(b)) {
        s = s.substring(g.raw.length), g.raw.slice(-1) !== "_" && (d = g.raw.slice(-1)), f = !0;
        let S = o.at(-1);
        S?.type === "text" ? (S.raw += g.raw, S.text += g.text) : o.push(g);
        continue;
      }
      if (s) {
        this.infiniteLoopError(s.charCodeAt(0));
        break;
      }
    }
    return o;
  }
  infiniteLoopError(s) {
    let o = "Infinite loop on byte: " + s;
    if (this.options.silent) console.error(o);
    else throw new Error(o);
  }
}, Cu = class {
  options;
  parser;
  constructor(a) {
    this.options = a || ci;
  }
  space(a) {
    return "";
  }
  code({ text: a, lang: s, escaped: o }) {
    let u = (s || "").match(It.notSpaceStart)?.[0], f = a ? a.replace(It.endingNewline, "") + `
` : "";
    return u ? '<pre><code class="language-' + kn(u) + '">' + (o ? f : kn(f, !0)) + `</code></pre>
` : "<pre><code>" + (o ? f : kn(f, !0)) + `</code></pre>
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
    let s = a.ordered, o = a.start, u = "";
    for (let m = 0; m < a.items.length; m++) {
      let g = a.items[m];
      u += this.listitem(g);
    }
    let f = s ? "ol" : "ul", d = s && o !== 1 ? ' start="' + o + '"' : "";
    return "<" + f + d + `>
` + u + "</" + f + `>
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
    let s = "", o = "";
    for (let f = 0; f < a.header.length; f++) o += this.tablecell(a.header[f]);
    s += this.tablerow({ text: o });
    let u = "";
    for (let f = 0; f < a.rows.length; f++) {
      let d = a.rows[f];
      o = "";
      for (let m = 0; m < d.length; m++) o += this.tablecell(d[m]);
      u += this.tablerow({ text: o });
    }
    return u && (u = `<tbody>${u}</tbody>`), `<table>
<thead>
` + s + `</thead>
` + u + `</table>
`;
  }
  tablerow({ text: a }) {
    return `<tr>
${a}</tr>
`;
  }
  tablecell(a) {
    let s = this.parser.parseInline(a.tokens), o = a.header ? "th" : "td";
    return (a.align ? `<${o} align="${a.align}">` : `<${o}>`) + s + `</${o}>
`;
  }
  strong({ tokens: a }) {
    return `<strong>${this.parser.parseInline(a)}</strong>`;
  }
  em({ tokens: a }) {
    return `<em>${this.parser.parseInline(a)}</em>`;
  }
  codespan({ text: a }) {
    return `<code>${kn(a, !0)}</code>`;
  }
  br(a) {
    return "<br>";
  }
  del({ tokens: a }) {
    return `<del>${this.parser.parseInline(a)}</del>`;
  }
  link({ href: a, title: s, text: o, tokens: u, autolink: f }) {
    let d = f ? kn(o, !0) : this.parser.parseInline(u), m = cy(a);
    if (m === null) return d;
    a = kn(m, f);
    let g = '<a href="' + a + '"';
    return s && (g += ' title="' + kn(s) + '"'), g += ">" + d + "</a>", g;
  }
  image({ href: a, title: s, text: o, tokens: u }) {
    u && (o = this.parser.parseInline(u, this.parser.textRenderer));
    let f = cy(a);
    if (f === null) return kn(o);
    a = f;
    let d = `<img src="${kn(a)}" alt="${kn(o)}"`;
    return s && (d += ` title="${kn(s)}"`), d += ">", d;
  }
  text(a) {
    return "tokens" in a && a.tokens ? this.parser.parseInline(a.tokens) : "escaped" in a && a.escaped ? a.text : kn(a.text);
  }
}, vh = class {
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
}, Wn = class Yd {
  options;
  renderer;
  textRenderer;
  constructor(s) {
    this.options = s || ci, this.options.renderer = this.options.renderer || new Cu(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new vh();
  }
  static parse(s, o) {
    return new Yd(o).parse(s);
  }
  static parseInline(s, o) {
    return new Yd(o).parseInline(s);
  }
  parse(s) {
    this.renderer.parser = this;
    let o = "";
    for (let u = 0; u < s.length; u++) {
      let f = s[u];
      if (this.options.extensions?.renderers?.[f.type]) {
        let m = f, g = this.options.extensions.renderers[m.type].call({ parser: this }, m);
        if (g !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "checkbox", "html", "def", "paragraph", "text"].includes(m.type)) {
          o += g || "";
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
  parseInline(s, o = this.renderer) {
    this.renderer.parser = this;
    let u = "";
    for (let f = 0; f < s.length; f++) {
      let d = s[f];
      if (this.options.extensions?.renderers?.[d.type]) {
        let g = this.options.extensions.renderers[d.type].call({ parser: this }, d);
        if (g !== !1 || !["escape", "html", "link", "image", "checkbox", "strong", "em", "codespan", "br", "del", "text"].includes(d.type)) {
          u += g || "";
          continue;
        }
      }
      let m = d;
      switch (m.type) {
        case "escape": {
          u += o.text(m);
          break;
        }
        case "html": {
          u += o.html(m);
          break;
        }
        case "link": {
          u += o.link(m);
          break;
        }
        case "image": {
          u += o.image(m);
          break;
        }
        case "checkbox": {
          u += o.checkbox(m);
          break;
        }
        case "strong": {
          u += o.strong(m);
          break;
        }
        case "em": {
          u += o.em(m);
          break;
        }
        case "codespan": {
          u += o.codespan(m);
          break;
        }
        case "br": {
          u += o.br(m);
          break;
        }
        case "del": {
          u += o.del(m);
          break;
        }
        case "text": {
          u += o.text(m);
          break;
        }
        default: {
          let g = 'Token with "' + m.type + '" type was not found.';
          if (this.options.silent) return console.error(g), "";
          throw new Error(g);
        }
      }
    }
    return u;
  }
}, Ec = class {
  options;
  block;
  constructor(a) {
    this.options = a || ci;
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
    return a ? Pn.lex : Pn.lexInline;
  }
  provideParser(a = this.block) {
    return a ? Wn.parse : Wn.parseInline;
  }
}, DN = class {
  defaults = fh();
  options = this.setOptions;
  parse = this.parseMarkdown(!0);
  parseInline = this.parseMarkdown(!1);
  Parser = Wn;
  Renderer = Cu;
  TextRenderer = vh;
  Lexer = Pn;
  Tokenizer = _u;
  Hooks = Ec;
  constructor(...a) {
    this.use(...a);
  }
  walkTokens(a, s) {
    let o = [];
    for (let u of a) switch (o = o.concat(s.call(this, u)), u.type) {
      case "table": {
        let f = u;
        for (let d of f.header) o = o.concat(this.walkTokens(d.tokens, s));
        for (let d of f.rows) for (let m of d) o = o.concat(this.walkTokens(m.tokens, s));
        break;
      }
      case "list": {
        let f = u;
        o = o.concat(this.walkTokens(f.items, s));
        break;
      }
      default: {
        let f = u;
        this.defaults.extensions?.childTokens?.[f.type] ? this.defaults.extensions.childTokens[f.type].forEach((d) => {
          let m = f[d].flat(1 / 0);
          o = o.concat(this.walkTokens(m, s));
        }) : f.tokens && (o = o.concat(this.walkTokens(f.tokens, s)));
      }
    }
    return o;
  }
  use(...a) {
    let s = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return a.forEach((o) => {
      let u = { ...o };
      if (u.async = this.defaults.async || u.async || !1, o.extensions && (o.extensions.forEach((f) => {
        if (!f.name) throw new Error("extension name required");
        if ("renderer" in f) {
          let d = s.renderers[f.name];
          d ? s.renderers[f.name] = function(...m) {
            let g = f.renderer.apply(this, m);
            return g === !1 && (g = d.apply(this, m)), g;
          } : s.renderers[f.name] = f.renderer;
        }
        if ("tokenizer" in f) {
          if (!f.level || f.level !== "block" && f.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let d = s[f.level];
          d ? d.unshift(f.tokenizer) : s[f.level] = [f.tokenizer], f.start && (f.level === "block" ? s.startBlock ? s.startBlock.push(f.start) : s.startBlock = [f.start] : f.level === "inline" && (s.startInline ? s.startInline.push(f.start) : s.startInline = [f.start]));
        }
        "childTokens" in f && f.childTokens && (s.childTokens[f.name] = f.childTokens);
      }), u.extensions = s), o.renderer) {
        let f = this.defaults.renderer || new Cu(this.defaults);
        for (let d in o.renderer) {
          if (!(d in f)) throw new Error(`renderer '${d}' does not exist`);
          if (["options", "parser"].includes(d)) continue;
          let m = d, g = o.renderer[m], b = f[m];
          f[m] = (...S) => {
            let v = g.apply(f, S);
            return v === !1 && (v = b.apply(f, S)), v || "";
          };
        }
        u.renderer = f;
      }
      if (o.tokenizer) {
        let f = this.defaults.tokenizer || new _u(this.defaults);
        for (let d in o.tokenizer) {
          if (!(d in f)) throw new Error(`tokenizer '${d}' does not exist`);
          if (["options", "rules", "lexer"].includes(d)) continue;
          let m = d, g = o.tokenizer[m], b = f[m];
          f[m] = (...S) => {
            let v = g.apply(f, S);
            return v === !1 && (v = b.apply(f, S)), v;
          };
        }
        u.tokenizer = f;
      }
      if (o.hooks) {
        let f = this.defaults.hooks || new Ec();
        for (let d in o.hooks) {
          if (!(d in f)) throw new Error(`hook '${d}' does not exist`);
          if (["options", "block"].includes(d)) continue;
          let m = d, g = o.hooks[m], b = f[m];
          Ec.passThroughHooks.has(d) ? f[m] = (S) => {
            if (this.defaults.async && Ec.passThroughHooksRespectAsync.has(d)) return (async () => {
              let p = await g.call(f, S);
              return b.call(f, p);
            })();
            let v = g.call(f, S);
            return b.call(f, v);
          } : f[m] = (...S) => {
            if (this.defaults.async) return (async () => {
              let p = await g.apply(f, S);
              return p === !1 && (p = await b.apply(f, S)), p;
            })();
            let v = g.apply(f, S);
            return v === !1 && (v = b.apply(f, S)), v;
          };
        }
        u.hooks = f;
      }
      if (o.walkTokens) {
        let f = this.defaults.walkTokens, d = o.walkTokens;
        u.walkTokens = function(m) {
          let g = [];
          return g.push(d.call(this, m)), f && (g = g.concat(f.call(this, m))), g;
        };
      }
      this.defaults = { ...this.defaults, ...u };
    }), this;
  }
  setOptions(a) {
    return this.defaults = { ...this.defaults, ...a }, this;
  }
  lexer(a, s) {
    return Pn.lex(a, s ?? this.defaults);
  }
  parser(a, s) {
    return Wn.parse(a, s ?? this.defaults);
  }
  parseMarkdown(a) {
    return (s, o) => {
      let u = { ...o }, f = { ...this.defaults, ...u }, d = this.onError(!!f.silent, !!f.async);
      if (this.defaults.async === !0 && u.async === !1) return d(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof s > "u" || s === null) return d(new Error("marked(): input parameter is undefined or null"));
      if (typeof s != "string") return d(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(s) + ", string expected"));
      if (f.hooks && (f.hooks.options = f, f.hooks.block = a), f.async) return (async () => {
        let m = f.hooks ? await f.hooks.preprocess(s) : s, g = await (f.hooks ? await f.hooks.provideLexer(a) : a ? Pn.lex : Pn.lexInline)(m, f), b = f.hooks ? await f.hooks.processAllTokens(g) : g;
        f.walkTokens && await Promise.all(this.walkTokens(b, f.walkTokens));
        let S = await (f.hooks ? await f.hooks.provideParser(a) : a ? Wn.parse : Wn.parseInline)(b, f);
        return f.hooks ? await f.hooks.postprocess(S) : S;
      })().catch(d);
      try {
        f.hooks && (s = f.hooks.preprocess(s));
        let m = (f.hooks ? f.hooks.provideLexer(a) : a ? Pn.lex : Pn.lexInline)(s, f);
        f.hooks && (m = f.hooks.processAllTokens(m)), f.walkTokens && this.walkTokens(m, f.walkTokens);
        let g = (f.hooks ? f.hooks.provideParser(a) : a ? Wn.parse : Wn.parseInline)(m, f);
        return f.hooks && (g = f.hooks.postprocess(g)), g;
      } catch (m) {
        return d(m);
      }
    };
  }
  onError(a, s) {
    return (o) => {
      if (o.message += `
Please report this to https://github.com/markedjs/marked.`, a) {
        let u = "<p>An error occurred:</p><pre>" + kn(o.message + "", !0) + "</pre>";
        return s ? Promise.resolve(u) : u;
      }
      if (s) return Promise.reject(o);
      throw o;
    };
  }
}, ai = new DN();
function We(a, s) {
  return ai.parse(a, s);
}
We.options = We.setOptions = function(a) {
  return ai.setOptions(a), We.defaults = ai.defaults, mv(We.defaults), We;
};
We.getDefaults = fh;
We.defaults = ci;
function zN(...a) {
  return ai.use(...a), We.defaults = ai.defaults, mv(We.defaults), We;
}
We.use = zN;
We.walkTokens = function(a, s) {
  return ai.walkTokens(a, s);
};
We.parseInline = ai.parseInline;
We.Parser = Wn;
We.parser = Wn.parse;
We.Renderer = Cu;
We.TextRenderer = vh;
We.Lexer = Pn;
We.lexer = Pn.lex;
We.Tokenizer = _u;
We.Hooks = Ec;
We.parse = We;
We.options;
We.setOptions;
We.walkTokens;
We.parseInline;
Wn.parse;
Pn.lex;
We.setOptions({ breaks: !0, gfm: !0 });
hv.addHook("afterSanitizeAttributes", (a) => {
  a.tagName === "A" && a.hasAttribute("href") && (a.setAttribute("target", "_blank"), a.setAttribute("rel", "noopener noreferrer"));
});
function bh(a) {
  const s = We.parse(String(a ?? ""), { async: !1 });
  return hv.sanitize(s, { USE_PROFILES: { html: !0 } });
}
var LN = Object.defineProperty, ps = (a, s) => LN(a, "name", { value: s, configurable: !0 }), jv = !!(typeof window < "u" && window.document && window.document.createElement);
function Ta(a, s, { checkForDefaultPrevented: o = !0 } = {}) {
  return /* @__PURE__ */ ps(function(f) {
    if (a?.(f), o === !1 || !f || !f.defaultPrevented)
      return s?.(f);
  }, "handleEvent");
}
ps(Ta, "composeEventHandlers");
function UN(a) {
  if (!jv)
    throw new Error("Cannot access window outside of the DOM");
  return a?.ownerDocument?.defaultView ?? window;
}
ps(UN, "getOwnerWindow");
function Gd(a) {
  if (!jv)
    throw new Error("Cannot access document outside of the DOM");
  return a?.ownerDocument ?? document;
}
ps(Gd, "getOwnerDocument");
function Ev(a, s = !1) {
  const { activeElement: o } = Gd(a);
  if (!o?.nodeName)
    return null;
  if (Tv(o) && o.contentDocument)
    return Ev(o.contentDocument.body, s);
  if (s) {
    const u = o.getAttribute("aria-activedescendant");
    if (u) {
      const f = Gd(o).getElementById(u);
      if (f)
        return f;
    }
  }
  return o;
}
ps(Ev, "getActiveElement");
function Tv(a) {
  return a.tagName === "IFRAME";
}
ps(Tv, "isFrame");
var HN = Object.defineProperty, xh = (a, s) => HN(a, "name", { value: s, configurable: !0 });
function Vd(a, s) {
  if (typeof a == "function")
    return a(s);
  a != null && (a.current = s);
}
xh(Vd, "setRef");
function wv(...a) {
  return (s) => {
    let o = !1;
    const u = a.map((f) => {
      const d = Vd(f, s);
      return !o && typeof d == "function" && (o = !0), d;
    });
    if (o)
      return () => {
        for (let f = 0; f < u.length; f++) {
          const d = u[f];
          typeof d == "function" ? d() : Vd(a[f], null);
        }
      };
  };
}
xh(wv, "composeRefs");
function gs(...a) {
  return x.useCallback(wv(...a), a);
}
xh(gs, "useComposedRefs");
var BN = Object.defineProperty, qn = (a, s) => BN(a, "name", { value: s, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function qN(a, s) {
  const o = x.createContext(s);
  o.displayName = a + "Context";
  const u = /* @__PURE__ */ qn((d) => {
    const { children: m, ...g } = d, b = x.useMemo(() => g, Object.values(g));
    return /* @__PURE__ */ c.jsx(o.Provider, { value: b, children: m });
  }, "Provider");
  u.displayName = a + "Provider";
  function f(d, m = {}) {
    const { optional: g = !1 } = m, b = x.useContext(o);
    if (b) return b;
    if (s !== void 0) return s;
    if (!g)
      throw new Error(`\`${d}\` must be used within \`${a}\``);
  }
  return qn(f, "useContext"), [u, f];
}
qn(qN, "createContext");
// @__NO_SIDE_EFFECTS__
function kv(a, s = []) {
  let o = [];
  function u(d, m) {
    const g = x.createContext(m);
    g.displayName = d + "Context";
    const b = o.length;
    o = [...o, m];
    const S = /* @__PURE__ */ qn((p) => {
      const { scope: N, children: T, ...E } = p, L = N?.[a]?.[b] || g, k = x.useMemo(() => E, Object.values(E));
      return /* @__PURE__ */ c.jsx(L.Provider, { value: k, children: T });
    }, "Provider");
    S.displayName = d + "Provider";
    function v(p, N, T = {}) {
      const { optional: E = !1 } = T, L = N?.[a]?.[b] || g, k = x.useContext(L);
      if (k) return k;
      if (m !== void 0) return m;
      if (!E)
        throw new Error(`\`${p}\` must be used within \`${d}\``);
    }
    return qn(v, "useContext"), [S, v];
  }
  qn(u, "createContext");
  const f = /* @__PURE__ */ qn(() => {
    const d = o.map((m) => x.createContext(m));
    return /* @__PURE__ */ qn(function(g) {
      const b = g?.[a] || d;
      return x.useMemo(
        () => ({ [`__scope${a}`]: { ...g, [a]: b } }),
        [g, b]
      );
    }, "useScope");
  }, "createScope");
  return f.scopeName = a, [u, Av(f, ...s)];
}
qn(kv, "createContextScope");
function Av(...a) {
  const s = a[0];
  if (a.length === 1) return s;
  const o = /* @__PURE__ */ qn(() => {
    const u = a.map((f) => ({
      useScope: f(),
      scopeName: f.scopeName
    }));
    return /* @__PURE__ */ qn(function(d) {
      const m = u.reduce((g, { useScope: b, scopeName: S }) => {
        const p = b(d)[`__scope${S}`];
        return { ...g, ...p };
      }, {});
      return x.useMemo(() => ({ [`__scope${s.scopeName}`]: m }), [m]);
    }, "useComposedScopes");
  }, "createScope");
  return o.scopeName = s.scopeName, o;
}
qn(Av, "composeContextScopes");
var ii = globalThis?.document ? x.useLayoutEffect : () => {
}, $N = Object.defineProperty, YN = (a, s) => $N(a, "name", { value: s, configurable: !0 }), GN = Ac[" useId ".trim().toString()] || (() => {
}), VN = 0;
function Eu(a) {
  const [s, o] = x.useState(GN());
  return ii(() => {
    a || o((u) => u ?? String(VN++));
  }, [a]), a || (s ? `radix-${s}` : "");
}
YN(Eu, "useId");
var XN = Object.defineProperty, ZN = (a, s) => XN(a, "name", { value: s, configurable: !0 }), dy = Ac[" useEffectEvent ".trim().toString()], hy = Ac[" useInsertionEffect ".trim().toString()];
function _v(a) {
  if (typeof dy == "function")
    return dy(a);
  const s = x.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  return typeof hy == "function" ? hy(() => {
    s.current = a;
  }) : ii(() => {
    s.current = a;
  }), x.useMemo(() => ((...o) => s.current?.(...o)), []);
}
ZN(_v, "useEffectEvent");
var QN = Object.defineProperty, Mc = (a, s) => QN(a, "name", { value: s, configurable: !0 }), KN = Ac[" useInsertionEffect ".trim().toString()] || ii;
function Cv({
  prop: a,
  defaultProp: s,
  onChange: o = /* @__PURE__ */ Mc(() => {
  }, "onChange"),
  caller: u
}) {
  const [f, d, m] = Ov({
    defaultProp: s,
    onChange: o
  }), g = a !== void 0, b = g ? a : f, S = x.useCallback(
    (v) => {
      if (g) {
        const p = Rv(v) ? v(a) : v;
        p !== a && m.current?.(p);
      } else
        d(v);
    },
    [g, a, d, m]
  );
  return [b, S];
}
Mc(Cv, "useControllableState");
function Ov({
  defaultProp: a,
  onChange: s
}) {
  const [o, u] = x.useState(a), f = x.useRef(o), d = x.useRef(s);
  return KN(() => {
    d.current = s;
  }, [s]), x.useEffect(() => {
    f.current !== o && (d.current?.(o), f.current = o);
  }, [o, f]), [o, u, d];
}
Mc(Ov, "useUncontrolledState");
function Rv(a) {
  return typeof a == "function";
}
Mc(Rv, "isFunction");
var my = Symbol("RADIX:SYNC_STATE");
function IN(a, s, o, u) {
  const { prop: f, defaultProp: d, onChange: m, caller: g } = s, b = f !== void 0, S = _v(m), v = [{ ...o, state: d }];
  u && v.push(u);
  const [p, N] = x.useReducer(
    (k, V) => {
      if (V.type === my)
        return { ...k, state: V.state };
      const X = a(k, V);
      return b && !Object.is(X.state, k.state) && S(X.state), X;
    },
    ...v
  ), T = p.state, E = x.useRef(T);
  x.useEffect(() => {
    E.current !== T && (E.current = T, b || S(T));
  }, [T, E, b]);
  const L = x.useMemo(() => f !== void 0 ? { ...p, state: f } : p, [p, f]);
  return x.useEffect(() => {
    b && !Object.is(f, p.state) && N({ type: my, state: f });
  }, [f, p.state, b]), [L, N];
}
Mc(IN, "useControllableStateReducer");
var Mv = Zy(), JN = Object.defineProperty, nl = (a, s) => JN(a, "name", { value: s, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function Sh(a) {
  const s = x.forwardRef((o, u) => {
    let { children: f, ...d } = o, m = null, g = !1;
    const b = [];
    Xd(f) && typeof du == "function" && (f = du(f._payload)), x.Children.forEach(f, (N) => {
      if (Uv(N)) {
        g = !0;
        const T = N;
        let E = "child" in T.props ? T.props.child : T.props.children;
        Xd(E) && typeof du == "function" && (E = du(E._payload)), m = PN(T, E), b.push(m?.props?.children);
      } else
        b.push(N);
    }), m ? m = x.cloneElement(m, void 0, b) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !g && x.Children.count(f) === 1 && x.isValidElement(f) && (m = f)
    );
    const S = m ? Lv(m) : void 0, v = gs(u, S);
    if (!m) {
      if (f || f === 0)
        throw new Error(
          g ? tj(a) : ej(a)
        );
      return f;
    }
    const p = zv(d, m.props ?? {});
    return m.type !== x.Fragment && (p.ref = u ? v : S), x.cloneElement(m, p);
  });
  return s.displayName = `${a}.Slot`, s;
}
nl(Sh, "createSlot");
var Dv = Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function FN(a) {
  const s = /* @__PURE__ */ nl((o) => "child" in o ? o.children(o.child) : o.children, "Slottable");
  return s.displayName = `${a}.Slottable`, s.__radixId = Dv, s;
}
nl(FN, "createSlottable");
var PN = /* @__PURE__ */ nl((a, s) => {
  if ("child" in a.props) {
    const o = a.props.child;
    return x.isValidElement(o) ? x.cloneElement(o, void 0, a.props.children(o.props.children)) : null;
  }
  return x.isValidElement(s) ? s : null;
}, "getSlottableElementFromSlottable");
function zv(a, s) {
  const o = { ...s };
  for (const u in s) {
    const f = a[u], d = s[u];
    /^on[A-Z]/.test(u) ? f && d ? o[u] = (...g) => {
      const b = d(...g);
      return f(...g), b;
    } : f && (o[u] = f) : u === "style" ? o[u] = { ...f, ...d } : u === "className" && (o[u] = [f, d].filter(Boolean).join(" "));
  }
  return { ...a, ...o };
}
nl(zv, "mergeProps");
function Lv(a) {
  let s = Object.getOwnPropertyDescriptor(a.props, "ref")?.get, o = s && "isReactWarning" in s && s.isReactWarning;
  return o ? a.ref : (s = Object.getOwnPropertyDescriptor(a, "ref")?.get, o = s && "isReactWarning" in s && s.isReactWarning, o ? a.props.ref : a.props.ref || a.ref);
}
nl(Lv, "getElementRef");
function Uv(a) {
  return x.isValidElement(a) && typeof a.type == "function" && "__radixId" in a.type && a.type.__radixId === Dv;
}
nl(Uv, "isSlottable");
var WN = Symbol.for("react.lazy");
function Xd(a) {
  return a != null && typeof a == "object" && "$$typeof" in a && a.$$typeof === WN && "_payload" in a && Hv(a._payload);
}
nl(Xd, "isLazyComponent");
function Hv(a) {
  return typeof a == "object" && a !== null && "then" in a;
}
nl(Hv, "isPromiseLike");
var ej = /* @__PURE__ */ nl((a) => `${a} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), tj = /* @__PURE__ */ nl((a) => `${a} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), du = Ac[" use ".trim().toString()], nj = Object.defineProperty, lj = (a, s) => nj(a, "name", { value: s, configurable: !0 }), aj = [
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
], ys = aj.reduce((a, s) => {
  const o = /* @__PURE__ */ Sh(`Primitive.${s}`), u = x.forwardRef((f, d) => {
    const { asChild: m, ...g } = f, b = m ? o : s;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ c.jsx(b, { ...g, ref: d });
  });
  return u.displayName = `Primitive.${s}`, { ...a, [s]: u };
}, {});
function Bv(a, s) {
  a && Mv.flushSync(() => a.dispatchEvent(s));
}
lj(Bv, "dispatchDiscreteCustomEvent");
var ij = Object.defineProperty, sj = (a, s) => ij(a, "name", { value: s, configurable: !0 });
function ds(a) {
  const s = x.useRef(a);
  return x.useEffect(() => {
    s.current = a;
  }), x.useMemo(() => ((...o) => s.current?.(...o)), []);
}
sj(ds, "useCallbackRef");
var cj = Object.defineProperty, Rt = (a, s) => cj(a, "name", { value: s, configurable: !0 }), Zd = "dismissableLayer.update", rj = "dismissableLayer.pointerDownOutside", uj = "dismissableLayer.focusOutside", py, qv = x.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set(),
  // Outside elements that belong to a layer's own dismiss affordance (eg, a
  // dialog overlay). Pressing them should dismiss the layer regardless of
  // whether or not they stop propagation.
  //
  // See https://github.com/radix-ui/primitives/issues/3346
  dismissableSurfaces: /* @__PURE__ */ new Set()
}), oj = /* @__PURE__ */ x.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Rt(function(s, o) {
    const {
      disableOutsidePointerEvents: u = !1,
      deferPointerDownOutside: f = !1,
      onEscapeKeyDown: d,
      onPointerDownOutside: m,
      onFocusOutside: g,
      onInteractOutside: b,
      onDismiss: S,
      ...v
    } = s, p = x.useContext(qv), [N, T] = x.useState(null), E = N?.ownerDocument ?? globalThis?.document, [, L] = x.useState({}), k = gs(o, T), V = Array.from(p.layers), [X] = [
      ...p.layersWithOutsidePointerEventsDisabled
    ].slice(-1), U = X ? V.indexOf(X) : -1, F = N ? V.indexOf(N) : -1, Z = p.layersWithOutsidePointerEventsDisabled.size > 0, B = F >= U, G = x.useRef(!1), ce = Yv(
      (pe) => {
        m?.(pe), b?.(pe), pe.defaultPrevented || S?.();
      },
      {
        ownerDocument: E,
        deferPointerDownOutside: f,
        isDeferredPointerDownOutsideRef: G,
        dismissableSurfaces: p.dismissableSurfaces,
        shouldHandlePointerDownOutside: x.useCallback(
          (pe) => {
            if (!(pe instanceof Node))
              return !1;
            const W = [...p.branches].some(
              (we) => we.contains(pe)
            );
            return B && !W;
          },
          [p.branches, B]
        )
      }
    ), Te = Gv((pe) => {
      if (f && G.current)
        return;
      const W = pe.target;
      [...p.branches].some((he) => he.contains(W)) || (g?.(pe), b?.(pe), pe.defaultPrevented || S?.());
    }, E), de = N ? F === V.length - 1 : !1, xe = ds((pe) => {
      pe.key === "Escape" && (d?.(pe), !pe.defaultPrevented && S && (pe.preventDefault(), S()));
    });
    return x.useEffect(() => {
      if (de)
        return E.addEventListener("keydown", xe, { capture: !0 }), () => E.removeEventListener("keydown", xe, { capture: !0 });
    }, [E, de, xe]), x.useEffect(() => {
      if (N)
        return u && (p.layersWithOutsidePointerEventsDisabled.size === 0 && (py = E.body.style.pointerEvents, E.body.style.pointerEvents = "none"), p.layersWithOutsidePointerEventsDisabled.add(N)), p.layers.add(N), Qd(), () => {
          u && (p.layersWithOutsidePointerEventsDisabled.delete(N), p.layersWithOutsidePointerEventsDisabled.size === 0 && (E.body.style.pointerEvents = py));
        };
    }, [N, E, u, p]), x.useEffect(() => () => {
      N && (p.layers.delete(N), p.layersWithOutsidePointerEventsDisabled.delete(N), Qd());
    }, [N, p]), x.useEffect(() => {
      const pe = /* @__PURE__ */ Rt(() => L({}), "handleUpdate");
      return document.addEventListener(Zd, pe), () => document.removeEventListener(Zd, pe);
    }, []), /* @__PURE__ */ c.jsx(
      ys.div,
      {
        ...v,
        ref: k,
        style: {
          pointerEvents: Z ? B ? "auto" : "none" : void 0,
          ...s.style
        },
        onFocusCapture: Ta(s.onFocusCapture, Te.onFocusCapture),
        onBlurCapture: Ta(s.onBlurCapture, Te.onBlurCapture),
        onPointerDownCapture: Ta(
          s.onPointerDownCapture,
          ce.onPointerDownCapture
        )
      }
    );
  }, "DismissableLayer")
);
function $v() {
  const a = x.useContext(qv), [s, o] = x.useState(null);
  return x.useEffect(() => {
    if (s)
      return a.dismissableSurfaces.add(s), () => {
        a.dismissableSurfaces.delete(s);
      };
  }, [s, a.dismissableSurfaces]), o;
}
Rt($v, "useDismissableLayerSurface");
var fj = /* @__PURE__ */ Rt(() => !0, "IS_TRUE");
function Yv(a, s) {
  const {
    ownerDocument: o = globalThis?.document,
    deferPointerDownOutside: u = !1,
    isDeferredPointerDownOutsideRef: f,
    dismissableSurfaces: d,
    shouldHandlePointerDownOutside: m = fj
  } = s, g = ds(a), b = x.useRef(!1), S = x.useRef(!1), v = x.useRef(/* @__PURE__ */ new Map()), p = x.useRef(() => {
  });
  return x.useEffect(() => {
    function N() {
      S.current = !1, f.current = !1, v.current.clear();
    }
    Rt(N, "resetOutsideInteraction");
    function T() {
      return Array.from(v.current.values()).some(Boolean);
    }
    Rt(T, "isOutsideInteractionIntercepted");
    function E(U) {
      if (!S.current)
        return;
      const F = U.target;
      F instanceof Node && [...d].some((B) => B.contains(F)) || v.current.set(U.type, !0), U.type === "click" && window.setTimeout(() => {
        S.current && p.current();
      }, 0);
    }
    Rt(E, "handleInteractionCapture");
    function L(U) {
      S.current && v.current.set(U.type, !1);
    }
    Rt(L, "handleInteractionBubble");
    const k = /* @__PURE__ */ Rt((U) => {
      if (U.target && !b.current) {
        let F = function() {
          o.removeEventListener("click", p.current);
          const B = T();
          N(), B || Nh(
            rj,
            g,
            Z,
            { discrete: !0 }
          );
        };
        if (Rt(F, "handleAndDispatchPointerDownOutsideEvent"), !m(U.target)) {
          o.removeEventListener("click", p.current), N(), b.current = !1;
          return;
        }
        const Z = { originalEvent: U };
        S.current = !0, f.current = u && U.button === 0, v.current.clear(), !u || U.button !== 0 ? F() : (o.removeEventListener("click", p.current), p.current = F, o.addEventListener("click", p.current, { once: !0 }));
      } else
        o.removeEventListener("click", p.current), N();
      b.current = !1;
    }, "handlePointerDown"), V = [
      "pointerup",
      "mousedown",
      "mouseup",
      "touchstart",
      "touchend",
      "click"
    ];
    for (const U of V)
      o.addEventListener(U, E, !0), o.addEventListener(U, L);
    const X = window.setTimeout(() => {
      o.addEventListener("pointerdown", k);
    }, 0);
    return () => {
      window.clearTimeout(X), o.removeEventListener("pointerdown", k), o.removeEventListener("click", p.current);
      for (const U of V)
        o.removeEventListener(U, E, !0), o.removeEventListener(U, L);
    };
  }, [
    o,
    g,
    u,
    f,
    d,
    m
  ]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: /* @__PURE__ */ Rt(() => b.current = !0, "onPointerDownCapture")
  };
}
Rt(Yv, "usePointerDownOutside");
function Gv(a, s = globalThis?.document) {
  const o = ds(a), u = x.useRef(!1);
  return x.useEffect(() => {
    const f = /* @__PURE__ */ Rt((d) => {
      d.target && !u.current && Nh(uj, o, { originalEvent: d }, {
        discrete: !1
      });
    }, "handleFocus");
    return s.addEventListener("focusin", f), () => s.removeEventListener("focusin", f);
  }, [s, o]), {
    onFocusCapture: /* @__PURE__ */ Rt(() => u.current = !0, "onFocusCapture"),
    onBlurCapture: /* @__PURE__ */ Rt(() => u.current = !1, "onBlurCapture")
  };
}
Rt(Gv, "useFocusOutside");
function Qd() {
  const a = new CustomEvent(Zd);
  document.dispatchEvent(a);
}
Rt(Qd, "dispatchUpdate");
function Nh(a, s, o, { discrete: u }) {
  const f = o.originalEvent.target, d = new CustomEvent(a, { bubbles: !1, cancelable: !0, detail: o });
  s && f.addEventListener(a, s, { once: !0 }), u ? Bv(f, d) : f.dispatchEvent(d);
}
Rt(Nh, "handleAndDispatchCustomEvent");
var dj = Object.defineProperty, nn = (a, s) => dj(a, "name", { value: s, configurable: !0 }), wd = "focusScope.autoFocusOnMount", kd = "focusScope.autoFocusOnUnmount", gy = { bubbles: !1, cancelable: !0 }, hj = /* @__PURE__ */ x.forwardRef(
  /* @__PURE__ */ nn(function(s, o) {
    const {
      loop: u = !1,
      trapped: f = !1,
      onMountAutoFocus: d,
      onUnmountAutoFocus: m,
      ...g
    } = s, [b, S] = x.useState(null), v = ds(d), p = ds(m), N = x.useRef(null), T = gs(o, S), E = x.useRef({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    }).current;
    x.useEffect(() => {
      if (f) {
        let k = function(F) {
          if (E.paused || !b) return;
          const Z = F.target;
          b.contains(Z) ? N.current = Z : $l(N.current, { select: !0 });
        }, V = function(F) {
          if (E.paused || !b) return;
          const Z = F.relatedTarget;
          Z !== null && (b.contains(Z) || $l(N.current, { select: !0 }));
        }, X = function(F) {
          if (document.activeElement === document.body)
            for (const B of F)
              B.removedNodes.length > 0 && $l(b);
        };
        nn(k, "handleFocusIn"), nn(V, "handleFocusOut"), nn(X, "handleMutations"), document.addEventListener("focusin", k), document.addEventListener("focusout", V);
        const U = new MutationObserver(X);
        return b && U.observe(b, { childList: !0, subtree: !0 }), () => {
          document.removeEventListener("focusin", k), document.removeEventListener("focusout", V), U.disconnect();
        };
      }
    }, [f, b, E.paused]), x.useEffect(() => {
      if (b) {
        yy.add(E);
        const k = document.activeElement;
        if (!b.contains(k)) {
          const X = new CustomEvent(wd, gy);
          b.addEventListener(wd, v), b.dispatchEvent(X), X.defaultPrevented || (Vv(Iv(jh(b)), { select: !0 }), document.activeElement === k && $l(b));
        }
        return () => {
          b.removeEventListener(wd, v), setTimeout(() => {
            const X = new CustomEvent(kd, gy);
            b.addEventListener(kd, p), b.dispatchEvent(X), X.defaultPrevented || $l(k ?? document.body, { select: !0 }), b.removeEventListener(kd, p), yy.remove(E);
          }, 0);
        };
      }
    }, [b, v, p, E]);
    const L = x.useCallback(
      (k) => {
        if (!u && !f || E.paused) return;
        const V = k.key === "Tab" && !k.altKey && !k.ctrlKey && !k.metaKey, X = document.activeElement;
        if (V && X) {
          const U = k.currentTarget, [F, Z] = Xv(U);
          F && Z ? !k.shiftKey && X === Z ? (k.preventDefault(), u && $l(F, { select: !0 })) : k.shiftKey && X === F && (k.preventDefault(), u && $l(Z, { select: !0 })) : X === U && k.preventDefault();
        }
      },
      [u, f, E.paused]
    );
    return /* @__PURE__ */ c.jsx(ys.div, { tabIndex: -1, ...g, ref: T, onKeyDown: L });
  }, "FocusScope")
);
function Vv(a, { select: s = !1 } = {}) {
  const o = document.activeElement;
  for (const u of a)
    if ($l(u, { select: s }), document.activeElement !== o) return;
}
nn(Vv, "focusFirst");
function Xv(a) {
  const s = jh(a), o = Kd(s, a), u = Kd(s.reverse(), a);
  return [o, u];
}
nn(Xv, "getTabbableEdges");
function jh(a) {
  const s = [], o = document.createTreeWalker(a, NodeFilter.SHOW_ELEMENT, {
    acceptNode: /* @__PURE__ */ nn((u) => {
      const f = u.tagName === "INPUT" && u.type === "hidden";
      return u.disabled || u.hidden || f ? NodeFilter.FILTER_SKIP : u.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }, "acceptNode")
  });
  for (; o.nextNode(); ) s.push(o.currentNode);
  return s;
}
nn(jh, "getTabbableCandidates");
function Kd(a, s) {
  const o = typeof s.checkVisibility == "function" && s.checkVisibility({ checkVisibilityCSS: !0 });
  for (const u of a)
    if (!(o ? !u.checkVisibility({ checkVisibilityCSS: !0 }) : Zv(u, { upTo: s })))
      return u;
}
nn(Kd, "findVisible");
function Zv(a, { upTo: s }) {
  if (getComputedStyle(a).visibility === "hidden") return !0;
  for (; a; ) {
    if (s !== void 0 && a === s) return !1;
    if (getComputedStyle(a).display === "none") return !0;
    a = a.parentElement;
  }
  return !1;
}
nn(Zv, "isHidden");
function Qv(a) {
  return a instanceof HTMLInputElement && "select" in a;
}
nn(Qv, "isSelectableInput");
function $l(a, { select: s = !1 } = {}) {
  if (a && a.focus) {
    const o = document.activeElement;
    a.focus({ preventScroll: !0 }), a !== o && Qv(a) && s && a.select();
  }
}
nn($l, "focus");
var yy = Kv();
function Kv() {
  let a = [];
  return {
    add(s) {
      const o = a[0];
      s !== o && o?.pause(), a = Id(a, s), a.unshift(s);
    },
    remove(s) {
      a = Id(a, s), a[0]?.resume();
    }
  };
}
nn(Kv, "createFocusScopesStack");
function Id(a, s) {
  const o = [...a], u = o.indexOf(s);
  return u !== -1 && o.splice(u, 1), o;
}
nn(Id, "arrayRemove");
function Iv(a) {
  return a.filter((s) => s.tagName !== "A");
}
nn(Iv, "removeLinks");
var mj = Object.defineProperty, pj = (a, s) => mj(a, "name", { value: s, configurable: !0 }), gj = /* @__PURE__ */ x.forwardRef(
  /* @__PURE__ */ pj(function(s, o) {
    const { container: u, ...f } = s, [d, m] = x.useState(!1);
    ii(() => m(!0), []);
    const g = u || d && globalThis?.document?.body;
    return g ? Mv.createPortal(/* @__PURE__ */ c.jsx(ys.div, { ...f, ref: o }), g) : null;
  }, "Portal")
), yj = Object.defineProperty, Gl = (a, s) => yj(a, "name", { value: s, configurable: !0 });
function Jv(a, s) {
  return x.useReducer((o, u) => s[o][u] ?? o, a);
}
Gl(Jv, "useStateMachine");
var Eh = /* @__PURE__ */ Gl((a) => {
  const { present: s, children: o } = a, u = Fv(s), f = typeof o == "function" ? o({ present: u.isPresent }) : x.Children.only(o), d = Pv(u.ref, Wv(f));
  return typeof o == "function" || u.isPresent ? x.cloneElement(f, { ref: d }) : null;
}, "Presence");
function Fv(a) {
  const [s, o] = x.useState(), u = x.useRef(null), f = x.useRef(a), d = x.useRef("none"), m = x.useRef(void 0), g = a ? "mounted" : "unmounted", [b, S] = Jv(g, {
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
  return x.useEffect(() => {
    b === "mounted" ? (d.current = m.current ?? ss(u.current), m.current = void 0) : d.current = "none";
  }, [b]), ii(() => {
    const v = u.current, p = f.current;
    if (p !== a) {
      const T = d.current, E = ss(v);
      a ? (m.current = E, S("MOUNT")) : E === "none" || v?.display === "none" ? S("UNMOUNT") : S(p && T !== E ? "ANIMATION_OUT" : "UNMOUNT"), f.current = a;
    }
  }, [a, S]), ii(() => {
    if (s) {
      let v;
      const p = s.ownerDocument.defaultView ?? window, N = /* @__PURE__ */ Gl((E) => {
        const k = ss(u.current).includes(CSS.escape(E.animationName));
        if (E.target === s && k && (S("ANIMATION_END"), !f.current)) {
          const V = s.style.animationFillMode;
          s.style.animationFillMode = "forwards", v = p.setTimeout(() => {
            s.style.animationFillMode === "forwards" && (s.style.animationFillMode = V);
          });
        }
      }, "handleAnimationEnd"), T = /* @__PURE__ */ Gl((E) => {
        E.target === s && (d.current = ss(u.current));
      }, "handleAnimationStart");
      return s.addEventListener("animationstart", T), s.addEventListener("animationcancel", N), s.addEventListener("animationend", N), () => {
        p.clearTimeout(v), s.removeEventListener("animationstart", T), s.removeEventListener("animationcancel", N), s.removeEventListener("animationend", N);
      };
    } else
      S("ANIMATION_END");
  }, [s, S]), {
    isPresent: ["mounted", "unmountSuspended"].includes(b),
    ref: x.useCallback((v) => {
      if (v) {
        const p = getComputedStyle(v);
        u.current = p, m.current = ss(p);
      } else
        u.current = null;
      o(v);
    }, [])
  };
}
Gl(Fv, "usePresence");
function Jd(a, s) {
  if (typeof a == "function")
    return a(s);
  a != null && (a.current = s);
}
Gl(Jd, "setRef");
function Pv(...a) {
  const s = x.useRef(a);
  return s.current = a, x.useCallback((o) => {
    const u = s.current;
    let f = !1;
    const d = u.map((m) => {
      const g = Jd(m, o);
      return !f && typeof g == "function" && (f = !0), g;
    });
    if (f)
      return () => {
        for (let m = 0; m < d.length; m++) {
          const g = d[m];
          typeof g == "function" ? g() : Jd(u[m], null);
        }
      };
  }, []);
}
Gl(Pv, "useStableComposedRefs");
function ss(a) {
  return a?.animationName || "none";
}
Gl(ss, "getAnimationName");
function Wv(a) {
  let s = Object.getOwnPropertyDescriptor(a.props, "ref")?.get, o = s && "isReactWarning" in s && s.isReactWarning;
  return o ? a.ref : (s = Object.getOwnPropertyDescriptor(a, "ref")?.get, o = s && "isReactWarning" in s && s.isReactWarning, o ? a.props.ref : a.props.ref || a.ref);
}
Gl(Wv, "getElementRef");
var vj = Object.defineProperty, Th = (a, s) => vj(a, "name", { value: s, configurable: !0 }), hu = 0, Wi = null;
function bj(a) {
  return wh(), a.children;
}
Th(bj, "FocusGuards");
function wh() {
  x.useEffect(() => {
    Wi || (Wi = { start: Fd(), end: Fd() });
    const { start: a, end: s } = Wi;
    return document.body.firstElementChild !== a && document.body.insertAdjacentElement("afterbegin", a), document.body.lastElementChild !== s && document.body.insertAdjacentElement("beforeend", s), hu++, () => {
      hu === 1 && (Wi?.start.remove(), Wi?.end.remove(), Wi = null), hu = Math.max(0, hu - 1);
    };
  }, []);
}
Th(wh, "useFocusGuards");
function Fd() {
  const a = document.createElement("span");
  return a.setAttribute("data-radix-focus-guard", ""), a.tabIndex = 0, a.style.outline = "none", a.style.opacity = "0", a.style.position = "fixed", a.style.pointerEvents = "none", a;
}
Th(Fd, "createFocusGuard");
var xl = function() {
  return xl = Object.assign || function(s) {
    for (var o, u = 1, f = arguments.length; u < f; u++) {
      o = arguments[u];
      for (var d in o) Object.prototype.hasOwnProperty.call(o, d) && (s[d] = o[d]);
    }
    return s;
  }, xl.apply(this, arguments);
};
function e1(a, s) {
  var o = {};
  for (var u in a) Object.prototype.hasOwnProperty.call(a, u) && s.indexOf(u) < 0 && (o[u] = a[u]);
  if (a != null && typeof Object.getOwnPropertySymbols == "function")
    for (var f = 0, u = Object.getOwnPropertySymbols(a); f < u.length; f++)
      s.indexOf(u[f]) < 0 && Object.prototype.propertyIsEnumerable.call(a, u[f]) && (o[u[f]] = a[u[f]]);
  return o;
}
function xj(a, s, o) {
  if (o || arguments.length === 2) for (var u = 0, f = s.length, d; u < f; u++)
    (d || !(u in s)) && (d || (d = Array.prototype.slice.call(s, 0, u)), d[u] = s[u]);
  return a.concat(d || Array.prototype.slice.call(s));
}
var Tu = "right-scroll-bar-position", wu = "width-before-scroll-bar", Sj = "with-scroll-bars-hidden", Nj = "--removed-body-scroll-bar-size";
function Ad(a, s) {
  return typeof a == "function" ? a(s) : a && (a.current = s), a;
}
function jj(a, s) {
  var o = x.useState(function() {
    return {
      // value
      value: a,
      // last callback
      callback: s,
      // "memoized" public interface
      facade: {
        get current() {
          return o.value;
        },
        set current(u) {
          var f = o.value;
          f !== u && (o.value = u, o.callback(u, f));
        }
      }
    };
  })[0];
  return o.callback = s, o.facade;
}
var Ej = typeof window < "u" ? x.useLayoutEffect : x.useEffect, vy = /* @__PURE__ */ new WeakMap();
function Tj(a, s) {
  var o = jj(null, function(u) {
    return a.forEach(function(f) {
      return Ad(f, u);
    });
  });
  return Ej(function() {
    var u = vy.get(o);
    if (u) {
      var f = new Set(u), d = new Set(a), m = o.current;
      f.forEach(function(g) {
        d.has(g) || Ad(g, null);
      }), d.forEach(function(g) {
        f.has(g) || Ad(g, m);
      });
    }
    vy.set(o, a);
  }, [a]), o;
}
function wj(a) {
  return a;
}
function kj(a, s) {
  s === void 0 && (s = wj);
  var o = [], u = !1, f = {
    read: function() {
      if (u)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return o.length ? o[o.length - 1] : a;
    },
    useMedium: function(d) {
      var m = s(d, u);
      return o.push(m), function() {
        o = o.filter(function(g) {
          return g !== m;
        });
      };
    },
    assignSyncMedium: function(d) {
      for (u = !0; o.length; ) {
        var m = o;
        o = [], m.forEach(d);
      }
      o = {
        push: function(g) {
          return d(g);
        },
        filter: function() {
          return o;
        }
      };
    },
    assignMedium: function(d) {
      u = !0;
      var m = [];
      if (o.length) {
        var g = o;
        o = [], g.forEach(d), m = o;
      }
      var b = function() {
        var v = m;
        m = [], v.forEach(d);
      }, S = function() {
        return Promise.resolve().then(b);
      };
      S(), o = {
        push: function(v) {
          m.push(v), S();
        },
        filter: function(v) {
          return m = m.filter(v), o;
        }
      };
    }
  };
  return f;
}
function Aj(a) {
  a === void 0 && (a = {});
  var s = kj(null);
  return s.options = xl({ async: !0, ssr: !1 }, a), s;
}
var t1 = function(a) {
  var s = a.sideCar, o = e1(a, ["sideCar"]);
  if (!s)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var u = s.read();
  if (!u)
    throw new Error("Sidecar medium not found");
  return x.createElement(u, xl({}, o));
};
t1.isSideCarExport = !0;
function _j(a, s) {
  return a.useMedium(s), t1;
}
var n1 = Aj(), _d = function() {
}, Ou = x.forwardRef(function(a, s) {
  var o = x.useRef(null), u = x.useState({
    onScrollCapture: _d,
    onWheelCapture: _d,
    onTouchMoveCapture: _d
  }), f = u[0], d = u[1], m = a.forwardProps, g = a.children, b = a.className, S = a.removeScrollBar, v = a.enabled, p = a.shards, N = a.sideCar, T = a.noRelative, E = a.noIsolation, L = a.inert, k = a.allowPinchZoom, V = a.as, X = V === void 0 ? "div" : V, U = a.gapMode, F = e1(a, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), Z = N, B = Tj([o, s]), G = xl(xl({}, F), f);
  return x.createElement(
    x.Fragment,
    null,
    v && x.createElement(Z, { sideCar: n1, removeScrollBar: S, shards: p, noRelative: T, noIsolation: E, inert: L, setCallbacks: d, allowPinchZoom: !!k, lockRef: o, gapMode: U }),
    m ? x.cloneElement(x.Children.only(g), xl(xl({}, G), { ref: B })) : x.createElement(X, xl({}, G, { className: b, ref: B }), g)
  );
});
Ou.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Ou.classNames = {
  fullWidth: wu,
  zeroRight: Tu
};
var Cj = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Oj() {
  if (!document)
    return null;
  var a = document.createElement("style");
  a.type = "text/css";
  var s = Cj();
  return s && a.setAttribute("nonce", s), a;
}
function Rj(a, s) {
  a.styleSheet ? a.styleSheet.cssText = s : a.appendChild(document.createTextNode(s));
}
function Mj(a) {
  var s = document.head || document.getElementsByTagName("head")[0];
  s.appendChild(a);
}
var Dj = function() {
  var a = 0, s = null;
  return {
    add: function(o) {
      a == 0 && (s = Oj()) && (Rj(s, o), Mj(s)), a++;
    },
    remove: function() {
      a--, !a && s && (s.parentNode && s.parentNode.removeChild(s), s = null);
    }
  };
}, zj = function() {
  var a = Dj();
  return function(s, o) {
    x.useEffect(function() {
      return a.add(s), function() {
        a.remove();
      };
    }, [s && o]);
  };
}, l1 = function() {
  var a = zj(), s = function(o) {
    var u = o.styles, f = o.dynamic;
    return a(u, f), null;
  };
  return s;
}, Lj = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Cd = function(a) {
  return parseInt(a || "", 10) || 0;
}, Uj = function(a) {
  var s = window.getComputedStyle(document.body), o = s[a === "padding" ? "paddingLeft" : "marginLeft"], u = s[a === "padding" ? "paddingTop" : "marginTop"], f = s[a === "padding" ? "paddingRight" : "marginRight"];
  return [Cd(o), Cd(u), Cd(f)];
}, Hj = function(a) {
  if (a === void 0 && (a = "margin"), typeof window > "u")
    return Lj;
  var s = Uj(a), o = document.documentElement.clientWidth, u = window.innerWidth;
  return {
    left: s[0],
    top: s[1],
    right: s[2],
    gap: Math.max(0, u - o + s[2] - s[0])
  };
}, Bj = l1(), os = "data-scroll-locked", qj = function(a, s, o, u) {
  var f = a.left, d = a.top, m = a.right, g = a.gap;
  return o === void 0 && (o = "margin"), `
  .`.concat(Sj, ` {
   overflow: hidden `).concat(u, `;
   padding-right: `).concat(g, "px ").concat(u, `;
  }
  body[`).concat(os, `] {
    overflow: hidden `).concat(u, `;
    overscroll-behavior: contain;
    `).concat([
    s && "position: relative ".concat(u, ";"),
    o === "margin" && `
    padding-left: `.concat(f, `px;
    padding-top: `).concat(d, `px;
    padding-right: `).concat(m, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(g, "px ").concat(u, `;
    `),
    o === "padding" && "padding-right: ".concat(g, "px ").concat(u, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(Tu, ` {
    right: `).concat(g, "px ").concat(u, `;
  }
  
  .`).concat(wu, ` {
    margin-right: `).concat(g, "px ").concat(u, `;
  }
  
  .`).concat(Tu, " .").concat(Tu, ` {
    right: 0 `).concat(u, `;
  }
  
  .`).concat(wu, " .").concat(wu, ` {
    margin-right: 0 `).concat(u, `;
  }
  
  body[`).concat(os, `] {
    `).concat(Nj, ": ").concat(g, `px;
  }
`);
}, by = function() {
  var a = parseInt(document.body.getAttribute(os) || "0", 10);
  return isFinite(a) ? a : 0;
}, $j = function() {
  x.useEffect(function() {
    return document.body.setAttribute(os, (by() + 1).toString()), function() {
      var a = by() - 1;
      a <= 0 ? document.body.removeAttribute(os) : document.body.setAttribute(os, a.toString());
    };
  }, []);
}, Yj = function(a) {
  var s = a.noRelative, o = a.noImportant, u = a.gapMode, f = u === void 0 ? "margin" : u;
  $j();
  var d = x.useMemo(function() {
    return Hj(f);
  }, [f]);
  return x.createElement(Bj, { styles: qj(d, !s, f, o ? "" : "!important") });
}, Pd = !1;
if (typeof window < "u")
  try {
    var mu = Object.defineProperty({}, "passive", {
      get: function() {
        return Pd = !0, !0;
      }
    });
    window.addEventListener("test", mu, mu), window.removeEventListener("test", mu, mu);
  } catch {
    Pd = !1;
  }
var es = Pd ? { passive: !1 } : !1, Gj = function(a) {
  return a.tagName === "TEXTAREA";
}, a1 = function(a, s) {
  if (!(a instanceof Element))
    return !1;
  var o = window.getComputedStyle(a);
  return (
    // not-not-scrollable
    o[s] !== "hidden" && // contains scroll inside self
    !(o.overflowY === o.overflowX && !Gj(a) && o[s] === "visible")
  );
}, Vj = function(a) {
  return a1(a, "overflowY");
}, Xj = function(a) {
  return a1(a, "overflowX");
}, xy = function(a, s) {
  var o = s.ownerDocument, u = s;
  do {
    typeof ShadowRoot < "u" && u instanceof ShadowRoot && (u = u.host);
    var f = i1(a, u);
    if (f) {
      var d = s1(a, u), m = d[1], g = d[2];
      if (m > g)
        return !0;
    }
    u = u.parentNode;
  } while (u && u !== o.body);
  return !1;
}, Zj = function(a) {
  var s = a.scrollTop, o = a.scrollHeight, u = a.clientHeight;
  return [
    s,
    o,
    u
  ];
}, Qj = function(a) {
  var s = a.scrollLeft, o = a.scrollWidth, u = a.clientWidth;
  return [
    s,
    o,
    u
  ];
}, i1 = function(a, s) {
  return a === "v" ? Vj(s) : Xj(s);
}, s1 = function(a, s) {
  return a === "v" ? Zj(s) : Qj(s);
}, Kj = function(a, s) {
  return a === "h" && s === "rtl" ? -1 : 1;
}, Ij = function(a, s, o, u, f) {
  var d = Kj(a, window.getComputedStyle(s).direction), m = d * u, g = o.target, b = s.contains(g), S = !1, v = m > 0, p = 0, N = 0;
  do {
    if (!g)
      break;
    var T = s1(a, g), E = T[0], L = T[1], k = T[2], V = L - k - d * E;
    (E || V) && i1(a, g) && (p += V, N += E);
    var X = g.parentNode;
    g = X && X.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? X.host : X;
  } while (
    // portaled content
    !b && g !== document.body || // self content
    b && (s.contains(g) || s === g)
  );
  return (v && Math.abs(p) < 1 || !v && Math.abs(N) < 1) && (S = !0), S;
}, pu = function(a) {
  return "changedTouches" in a ? [a.changedTouches[0].clientX, a.changedTouches[0].clientY] : [0, 0];
}, Sy = function(a) {
  return [a.deltaX, a.deltaY];
}, Ny = function(a) {
  return a && "current" in a ? a.current : a;
}, Jj = function(a, s) {
  return a[0] === s[0] && a[1] === s[1];
}, Fj = function(a) {
  return `
  .block-interactivity-`.concat(a, ` {pointer-events: none;}
  .allow-interactivity-`).concat(a, ` {pointer-events: all;}
`);
}, Pj = 0, ts = [];
function Wj(a) {
  var s = x.useRef([]), o = x.useRef([0, 0]), u = x.useRef(), f = x.useState(Pj++)[0], d = x.useState(l1)[0], m = x.useRef(a);
  x.useEffect(function() {
    m.current = a;
  }, [a]), x.useEffect(function() {
    if (a.inert) {
      document.body.classList.add("block-interactivity-".concat(f));
      var L = xj([a.lockRef.current], (a.shards || []).map(Ny), !0).filter(Boolean);
      return L.forEach(function(k) {
        return k.classList.add("allow-interactivity-".concat(f));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(f)), L.forEach(function(k) {
          return k.classList.remove("allow-interactivity-".concat(f));
        });
      };
    }
  }, [a.inert, a.lockRef.current, a.shards]);
  var g = x.useCallback(function(L, k) {
    if ("touches" in L && L.touches.length === 2 || L.type === "wheel" && L.ctrlKey)
      return !m.current.allowPinchZoom;
    var V = pu(L), X = o.current, U = "deltaX" in L ? L.deltaX : X[0] - V[0], F = "deltaY" in L ? L.deltaY : X[1] - V[1], Z, B = L.target, G = Math.abs(U) > Math.abs(F) ? "h" : "v";
    if ("touches" in L && G === "h" && B.type === "range")
      return !1;
    var ce = window.getSelection(), Te = ce && ce.anchorNode, de = Te ? Te === B || Te.contains(B) : !1;
    if (de)
      return !1;
    var xe = xy(G, B);
    if (!xe)
      return !0;
    if (xe ? Z = G : (Z = G === "v" ? "h" : "v", xe = xy(G, B)), !xe)
      return !1;
    if (!u.current && "changedTouches" in L && (U || F) && (u.current = Z), !Z)
      return !0;
    var pe = u.current || Z;
    return Ij(pe, k, L, pe === "h" ? U : F);
  }, []), b = x.useCallback(function(L) {
    var k = L;
    if (!(!ts.length || ts[ts.length - 1] !== d)) {
      var V = "deltaY" in k ? Sy(k) : pu(k), X = s.current.filter(function(Z) {
        return Z.name === k.type && (Z.target === k.target || k.target === Z.shadowParent) && Jj(Z.delta, V);
      })[0];
      if (X && X.should) {
        k.cancelable && k.preventDefault();
        return;
      }
      if (!X) {
        var U = (m.current.shards || []).map(Ny).filter(Boolean).filter(function(Z) {
          return Z.contains(k.target);
        }), F = U.length > 0 ? g(k, U[0]) : !m.current.noIsolation;
        F && k.cancelable && k.preventDefault();
      }
    }
  }, []), S = x.useCallback(function(L, k, V, X) {
    var U = { name: L, delta: k, target: V, should: X, shadowParent: eE(V) };
    s.current.push(U), setTimeout(function() {
      s.current = s.current.filter(function(F) {
        return F !== U;
      });
    }, 1);
  }, []), v = x.useCallback(function(L) {
    o.current = pu(L), u.current = void 0;
  }, []), p = x.useCallback(function(L) {
    S(L.type, Sy(L), L.target, g(L, a.lockRef.current));
  }, []), N = x.useCallback(function(L) {
    S(L.type, pu(L), L.target, g(L, a.lockRef.current));
  }, []);
  x.useEffect(function() {
    return ts.push(d), a.setCallbacks({
      onScrollCapture: p,
      onWheelCapture: p,
      onTouchMoveCapture: N
    }), document.addEventListener("wheel", b, es), document.addEventListener("touchmove", b, es), document.addEventListener("touchstart", v, es), function() {
      ts = ts.filter(function(L) {
        return L !== d;
      }), document.removeEventListener("wheel", b, es), document.removeEventListener("touchmove", b, es), document.removeEventListener("touchstart", v, es);
    };
  }, []);
  var T = a.removeScrollBar, E = a.inert;
  return x.createElement(
    x.Fragment,
    null,
    E ? x.createElement(d, { styles: Fj(f) }) : null,
    T ? x.createElement(Yj, { noRelative: a.noRelative, gapMode: a.gapMode }) : null
  );
}
function eE(a) {
  for (var s = null; a !== null; )
    a instanceof ShadowRoot && (s = a.host, a = a.host), a = a.parentNode;
  return s;
}
const tE = _j(n1, Wj);
var c1 = x.forwardRef(function(a, s) {
  return x.createElement(Ou, xl({}, a, { ref: s, sideCar: tE }));
});
c1.classNames = Ou.classNames;
var nE = function(a) {
  if (typeof document > "u")
    return null;
  var s = Array.isArray(a) ? a[0] : a;
  return s.ownerDocument.body;
}, ns = /* @__PURE__ */ new WeakMap(), gu = /* @__PURE__ */ new WeakMap(), yu = {}, Od = 0, r1 = function(a) {
  return a && (a.host || r1(a.parentNode));
}, lE = function(a, s) {
  return s.map(function(o) {
    if (a.contains(o))
      return o;
    var u = r1(o);
    return u && a.contains(u) ? u : (console.error("aria-hidden", o, "in not contained inside", a, ". Doing nothing"), null);
  }).filter(function(o) {
    return !!o;
  });
}, aE = function(a, s, o, u) {
  var f = lE(s, Array.isArray(a) ? a : [a]);
  yu[o] || (yu[o] = /* @__PURE__ */ new WeakMap());
  var d = yu[o], m = [], g = /* @__PURE__ */ new Set(), b = new Set(f), S = function(p) {
    !p || g.has(p) || (g.add(p), S(p.parentNode));
  };
  f.forEach(S);
  var v = function(p) {
    !p || b.has(p) || Array.prototype.forEach.call(p.children, function(N) {
      if (g.has(N))
        v(N);
      else
        try {
          var T = N.getAttribute(u), E = T !== null && T !== "false", L = (ns.get(N) || 0) + 1, k = (d.get(N) || 0) + 1;
          ns.set(N, L), d.set(N, k), m.push(N), L === 1 && E && gu.set(N, !0), k === 1 && N.setAttribute(o, "true"), E || N.setAttribute(u, "true");
        } catch (V) {
          console.error("aria-hidden: cannot operate on ", N, V);
        }
    });
  };
  return v(s), g.clear(), Od++, function() {
    m.forEach(function(p) {
      var N = ns.get(p) - 1, T = d.get(p) - 1;
      ns.set(p, N), d.set(p, T), N || (gu.has(p) || p.removeAttribute(u), gu.delete(p)), T || p.removeAttribute(o);
    }), Od--, Od || (ns = /* @__PURE__ */ new WeakMap(), ns = /* @__PURE__ */ new WeakMap(), gu = /* @__PURE__ */ new WeakMap(), yu = {});
  };
}, iE = function(a, s, o) {
  o === void 0 && (o = "data-aria-hidden");
  var u = Array.from(Array.isArray(a) ? a : [a]), f = nE(a);
  return f ? (u.push.apply(u, Array.from(f.querySelectorAll("[aria-live], script"))), aE(u, f, o, "aria-hidden")) : function() {
    return null;
  };
}, sE = Object.defineProperty, ll = (a, s) => sE(a, "name", { value: s, configurable: !0 }), kh = "Dialog", [u1, fw] = /* @__PURE__ */ kv(kh), [cE, Xl] = u1(kh), Ru = /* @__PURE__ */ ll((a) => {
  const {
    __scopeDialog: s,
    children: o,
    open: u,
    defaultOpen: f,
    onOpenChange: d,
    modal: m = !0
  } = a, g = x.useRef(null), b = x.useRef(null), [S, v] = Cv({
    prop: u,
    defaultProp: f ?? !1,
    onChange: d,
    caller: kh
  }), [p, N] = x.useState(0), [T, E] = x.useState(0);
  return /* @__PURE__ */ c.jsx(
    cE,
    {
      scope: s,
      triggerRef: g,
      contentRef: b,
      contentId: Eu(),
      titleId: Eu(),
      descriptionId: Eu(),
      titlePresent: p > 0,
      descriptionPresent: T > 0,
      setTitleCount: N,
      setDescriptionCount: E,
      open: S,
      onOpenChange: v,
      onOpenToggle: x.useCallback(() => v((L) => !L), [v]),
      modal: m,
      children: o
    }
  );
}, "Dialog"), o1 = "DialogPortal", [rE, f1] = u1(o1, {
  forceMount: void 0
}), Mu = /* @__PURE__ */ ll((a) => {
  const { __scopeDialog: s, forceMount: o, children: u, container: f } = a, d = Xl(o1, s);
  return /* @__PURE__ */ c.jsx(rE, { scope: s, forceMount: o, children: x.Children.map(u, (m) => /* @__PURE__ */ c.jsx(Eh, { present: o || d.open, children: /* @__PURE__ */ c.jsx(gj, { asChild: !0, container: f, children: m }) })) });
}, "DialogPortal"), Wd = "DialogOverlay", Du = /* @__PURE__ */ x.forwardRef(
  /* @__PURE__ */ ll(function(s, o) {
    const u = f1(Wd, s.__scopeDialog), { forceMount: f = u.forceMount, ...d } = s, m = Xl(Wd, s.__scopeDialog);
    return m.modal ? /* @__PURE__ */ c.jsx(Eh, { present: f || m.open, children: /* @__PURE__ */ c.jsx(oE, { ...d, ref: o }) }) : null;
  }, "DialogOverlay")
), uE = /* @__PURE__ */ Sh("DialogOverlay.RemoveScroll"), oE = /* @__PURE__ */ x.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ ll(function(s, o) {
    const { __scopeDialog: u, ...f } = s, d = Xl(Wd, u), m = $v(), g = gs(o, m);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ c.jsx(c1, { as: uE, allowPinchZoom: !0, shards: [d.contentRef], children: /* @__PURE__ */ c.jsx(
        ys.div,
        {
          "data-state": Ah(d.open),
          ...f,
          ref: g,
          style: { pointerEvents: "auto", ...f.style }
        }
      ) })
    );
  }, "DialogOverlayImpl")
), kc = "DialogContent", zu = /* @__PURE__ */ x.forwardRef(
  /* @__PURE__ */ ll(function(s, o) {
    const u = f1(kc, s.__scopeDialog), { forceMount: f = u.forceMount, ...d } = s, m = Xl(kc, s.__scopeDialog);
    return /* @__PURE__ */ c.jsx(Eh, { present: f || m.open, children: m.modal ? /* @__PURE__ */ c.jsx(fE, { ...d, ref: o }) : /* @__PURE__ */ c.jsx(dE, { ...d, ref: o }) });
  }, "DialogContent")
), fE = /* @__PURE__ */ x.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ ll(function(s, o) {
    const u = Xl(kc, s.__scopeDialog), f = x.useRef(null), d = gs(o, u.contentRef, f);
    return x.useEffect(() => {
      const m = f.current;
      if (m) return iE(m);
    }, []), /* @__PURE__ */ c.jsx(
      d1,
      {
        ...s,
        ref: d,
        trapFocus: u.open,
        disableOutsidePointerEvents: u.open,
        onCloseAutoFocus: Ta(s.onCloseAutoFocus, (m) => {
          m.preventDefault(), u.triggerRef.current?.focus();
        }),
        onPointerDownOutside: Ta(s.onPointerDownOutside, (m) => {
          const g = m.detail.originalEvent, b = g.button === 0 && g.ctrlKey === !0;
          (g.button === 2 || b) && m.preventDefault();
        }),
        onFocusOutside: Ta(
          s.onFocusOutside,
          (m) => m.preventDefault()
        )
      }
    );
  }, "DialogContentModal")
), dE = /* @__PURE__ */ x.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ ll(function(s, o) {
    const u = Xl(kc, s.__scopeDialog), f = x.useRef(!1), d = x.useRef(!1);
    return /* @__PURE__ */ c.jsx(
      d1,
      {
        ...s,
        ref: o,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (m) => {
          s.onCloseAutoFocus?.(m), m.defaultPrevented || (f.current || u.triggerRef.current?.focus(), m.preventDefault()), f.current = !1, d.current = !1;
        },
        onInteractOutside: (m) => {
          s.onInteractOutside?.(m), m.defaultPrevented || (f.current = !0, m.detail.originalEvent.type === "pointerdown" && (d.current = !0));
          const g = m.target;
          u.triggerRef.current?.contains(g) && m.preventDefault(), m.detail.originalEvent.type === "focusin" && d.current && m.preventDefault();
        }
      }
    );
  }, "DialogContentNonModal")
), d1 = /* @__PURE__ */ x.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ ll(function(s, o) {
    const { __scopeDialog: u, trapFocus: f, onOpenAutoFocus: d, onCloseAutoFocus: m, ...g } = s, b = Xl(kc, u);
    return wh(), /* @__PURE__ */ c.jsx(c.Fragment, { children: /* @__PURE__ */ c.jsx(
      hj,
      {
        asChild: !0,
        loop: !0,
        trapped: f,
        onMountAutoFocus: d,
        onUnmountAutoFocus: m,
        children: /* @__PURE__ */ c.jsx(
          oj,
          {
            role: "dialog",
            id: b.contentId,
            "aria-describedby": b.descriptionPresent ? b.descriptionId : void 0,
            "aria-labelledby": b.titlePresent ? b.titleId : void 0,
            "data-state": Ah(b.open),
            ...g,
            ref: o,
            deferPointerDownOutside: !0,
            onDismiss: () => b.onOpenChange(!1)
          }
        )
      }
    ) });
  }, "DialogContentImpl")
), hE = "DialogTitle", Lu = /* @__PURE__ */ x.forwardRef(
  /* @__PURE__ */ ll(function(s, o) {
    const { __scopeDialog: u, ...f } = s, d = Xl(hE, u), { setTitleCount: m } = d;
    return ii(() => (m((g) => g + 1), () => m((g) => g - 1)), [m]), /* @__PURE__ */ c.jsx(ys.h2, { id: d.titleId, ...f, ref: o });
  }, "DialogTitle")
), mE = "DialogClose", Uu = /* @__PURE__ */ x.forwardRef(
  /* @__PURE__ */ ll(function(s, o) {
    const { __scopeDialog: u, ...f } = s, d = Xl(mE, u);
    return /* @__PURE__ */ c.jsx(
      ys.button,
      {
        type: "button",
        ...f,
        ref: o,
        onClick: Ta(s.onClick, () => d.onOpenChange(!1))
      }
    );
  }, "DialogClose")
);
function Ah(a) {
  return a ? "open" : "closed";
}
ll(Ah, "getState");
function Hu({ open: a, onOpenChange: s, title: o, subtitle: u, wide: f, children: d, footer: m }) {
  return /* @__PURE__ */ c.jsx(Ru, { open: a, onOpenChange: s, children: /* @__PURE__ */ c.jsxs(Mu, { children: [
    /* @__PURE__ */ c.jsx(Du, { className: "panel-overlay" }),
    /* @__PURE__ */ c.jsxs(
      zu,
      {
        className: `panel${f ? " wide" : ""}`,
        "aria-describedby": void 0,
        onOpenAutoFocus: (g) => g.preventDefault(),
        onEscapeKeyDown: (g) => {
          g.isComposing && g.preventDefault();
        },
        children: [
          /* @__PURE__ */ c.jsxs("header", { className: "panel-head", children: [
            /* @__PURE__ */ c.jsxs("div", { className: "panel-titles", children: [
              /* @__PURE__ */ c.jsx(Lu, { className: "panel-title", children: o }),
              u && /* @__PURE__ */ c.jsx("p", { className: "panel-subtitle", children: u })
            ] }),
            /* @__PURE__ */ c.jsx(Uu, { className: "icon-button", "aria-label": "Close", children: /* @__PURE__ */ c.jsx(Sl, {}) })
          ] }),
          /* @__PURE__ */ c.jsx("div", { className: "panel-body", children: d }),
          m && /* @__PURE__ */ c.jsx("footer", { className: "panel-foot", children: m })
        ]
      }
    )
  ] }) });
}
function pE({ value: a, onChange: s, items: o }) {
  return /* @__PURE__ */ c.jsx("div", { className: "tabs", role: "tablist", children: o.map((u) => /* @__PURE__ */ c.jsx("button", { type: "button", role: "tab", "aria-selected": u.id === a, className: `tab${u.id === a ? " active" : ""}`, onClick: () => s(u.id), children: u.label }, u.id)) });
}
function ti({ label: a, hint: s, children: o }) {
  return /* @__PURE__ */ c.jsxs("label", { className: "field", children: [
    /* @__PURE__ */ c.jsx("span", { className: "field-label", children: a }),
    o,
    s && /* @__PURE__ */ c.jsx("span", { className: "field-hint", children: s })
  ] });
}
const jy = new URLSearchParams(location.search).get("token") ?? "", rt = (a) => jy ? `${a}${a.includes("?") ? "&" : "?"}token=${encodeURIComponent(jy)}` : a;
async function tl(a, s) {
  const o = await fetch(rt(a), s);
  if (!o.ok) throw new Error(await o.text() || `${o.status}`);
  return o.json();
}
const $n = (a, s) => tl(a, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(s) });
let gE = 0;
const Kt = () => `k${++gE}`, yE = ["idle", "reading", "writing", "searching", "running", "waiting", "failed", "done", "speaking", "listening", "sad", "excited", "surprised"], fs = {
  idle: "Idle",
  reading: "Reading",
  writing: "Writing",
  searching: "Searching",
  running: "Running a command",
  waiting: "Waiting for you",
  failed: "Something went wrong",
  done: "Done",
  speaking: "Speaking",
  listening: "Listening",
  sad: "Sad",
  excited: "Excited",
  surprised: "Surprised"
};
function vE() {
  for (const a of navigator.languages ?? [navigator.language]) {
    const s = a.toLowerCase().split(/[-_]/)[0];
    if (s === "zh" || s === "en" || s === "ja") return s;
  }
  return "en";
}
function Bu(a) {
  return a < 1024 ? `${a} B` : a < 1024 * 1024 ? `${(a / 1024).toFixed(a < 10240 ? 1 : 0)} KB` : `${(a / 1024 / 1024).toFixed(1)} MB`;
}
function h1(a) {
  if (a.kind === "markdown") return "Markdown";
  if (a.kind === "text") return "Text";
  if (a.kind === "image") return "Image";
  const s = a.name.includes(".") ? a.name.split(".").pop() ?? "" : "";
  return s !== "" && s.length <= 5 ? s.toUpperCase() : "File";
}
function bE(a) {
  const s = new Date(a);
  return Number.isNaN(s.getTime()) ? "" : s.toLocaleString(void 0, { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
}
const eh = "aibo-draft-text", xE = "aibo-draft", SE = () => {
  try {
    return localStorage.getItem(eh) ?? "";
  } catch {
    return "";
  }
}, NE = (a) => {
  try {
    a === "" ? localStorage.removeItem(eh) : localStorage.setItem(eh, a);
  } catch {
  }
};
function m1() {
  return new Promise((a, s) => {
    const o = indexedDB.open(xE, 1);
    o.onupgradeneeded = () => {
      o.result.createObjectStore("files", { keyPath: "id" });
    }, o.onsuccess = () => a(o.result), o.onerror = () => s(o.error ?? new Error("draft store unavailable"));
  });
}
async function jE(a, s) {
  const o = await m1();
  await new Promise((u, f) => {
    const d = o.transaction("files", a);
    s(d.objectStore("files")), d.oncomplete = () => u(), d.onerror = () => f(d.error ?? new Error("draft store failed")), d.onabort = () => f(d.error ?? new Error("draft store aborted"));
  }), o.close();
}
async function EE() {
  try {
    const a = await m1(), s = await new Promise((o, u) => {
      const f = a.transaction("files").objectStore("files").getAll();
      f.onsuccess = () => o(f.result), f.onerror = () => u(f.error);
    });
    return a.close(), s.filter((o) => o.blob instanceof Blob);
  } catch {
    return [];
  }
}
async function TE(a) {
  try {
    await jE("readwrite", (s) => {
      s.clear();
      for (const o of a) s.put(o);
    });
  } catch {
  }
}
const wE = { png: "image/png", webp: "image/webp", jpg: "image/jpeg", jpeg: "image/jpeg", mp4: "video/mp4", webm: "video/webm" };
function kE({ open: a, onOpenChange: s, tab: o, setTab: u, manifest: f, lang: d, preview: m, setPreview: g, notify: b, onManifestChange: S }) {
  const [v, p] = x.useState(null), N = x.useCallback(() => {
    tl("/character/config").then(p).catch((T) => b(`Could not load character: ${T.message}`));
  }, [b]);
  return x.useEffect(() => {
    a && N();
  }, [a, f?.characterId, N]), /* @__PURE__ */ c.jsxs(Hu, { open: a, onOpenChange: s, wide: !0, title: "Character", subtitle: v ? v.dir : void 0, children: [
    /* @__PURE__ */ c.jsx(pE, { value: o, onChange: u, items: [{ id: "pick", label: "Choose" }, { id: "art", label: "Artwork" }, { id: "persona", label: "Persona" }] }),
    o === "pick" && /* @__PURE__ */ c.jsx(AE, { manifest: f, notify: b, close: () => s(!1) }),
    o === "art" && v && f && /* @__PURE__ */ c.jsx(_E, { config: v, manifest: f, preview: m, setPreview: g, reload: N, notify: b }),
    o === "persona" && v && /* @__PURE__ */ c.jsx(CE, { config: v, lang: d, setConfig: p, notify: b, onManifestChange: S }, v.id)
  ] });
}
function AE({ manifest: a, notify: s, close: o }) {
  const u = x.useRef(null), f = async (m) => {
    if (o(), m !== a?.characterId)
      try {
        await $n("/character", { id: m });
      } catch (g) {
        s(`Could not switch: ${g.message}`);
      }
  }, d = async (m) => {
    const g = m.name.replace(/\.zip$/i, "").replace(/-pack$/i, "");
    s(`Importing ${m.name}…`);
    try {
      const b = await fetch(rt(`/character/import?id=${encodeURIComponent(g)}`), { method: "POST", headers: { "content-type": "application/zip" }, body: m });
      if (!b.ok) throw new Error(await b.text());
      const { id: S } = await b.json();
      await $n("/character", { id: S }), o();
    } catch (b) {
      s(`Import failed: ${b.message}`);
    }
  };
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx("div", { className: "char-grid", children: (a?.characters ?? []).map((m) => /* @__PURE__ */ c.jsxs("button", { type: "button", className: `char-option${m.id === a?.characterId ? " active" : ""}`, title: m.id, onClick: () => {
      f(m.id);
    }, children: [
      /* @__PURE__ */ c.jsx("span", { className: "char-option-name", children: m.name }),
      m.promptOnly && /* @__PURE__ */ c.jsx("span", { className: "badge", children: "prompt only" })
    ] }, m.id)) }),
    /* @__PURE__ */ c.jsxs("div", { className: "row end", style: { marginTop: 16 }, children: [
      /* @__PURE__ */ c.jsx("input", { ref: u, type: "file", accept: ".zip,application/zip", hidden: !0, onChange: (m) => {
        const g = m.target.files?.[0];
        m.target.value = "", g && d(g);
      } }),
      /* @__PURE__ */ c.jsxs("button", { type: "button", className: "button", onClick: () => u.current?.click(), children: [
        /* @__PURE__ */ c.jsx(oh, {}),
        "Import pack…"
      ] }),
      /* @__PURE__ */ c.jsxs("a", { className: "button", href: rt("/character/export"), download: `${a?.characterId ?? "character"}.zip`, children: [
        /* @__PURE__ */ c.jsx(j2, {}),
        "Export pack"
      ] })
    ] })
  ] });
}
function _E({ config: a, manifest: s, preview: o, setPreview: u, reload: f, notify: d }) {
  const m = x.useRef(null), g = x.useRef(""), b = async (S, v) => {
    const p = (v.name.split(".").pop() ?? "").toLowerCase(), N = wE[p] ?? v.type;
    if (!N) {
      d(`Unsupported file: ${v.name}`);
      return;
    }
    d(`Uploading ${v.name} as ${S}…`);
    try {
      const T = await fetch(rt(`/character/asset?state=${encodeURIComponent(S)}`), { method: "PUT", headers: { "content-type": N }, body: v });
      if (!T.ok) throw new Error(await T.text());
      d(`Saved ${v.name} as ${S}.`), f();
    } catch (T) {
      d(`Upload failed: ${T.message}`);
    }
  };
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx("div", { className: "row between", children: /* @__PURE__ */ c.jsx(ti, { label: "Preview on stage", children: /* @__PURE__ */ c.jsxs("select", { className: "input", value: o ?? "auto", onChange: (S) => u(S.target.value === "auto" ? null : S.target.value), children: [
      /* @__PURE__ */ c.jsx("option", { value: "auto", children: "Follow the conversation" }),
      yE.map((S) => /* @__PURE__ */ c.jsx("option", { value: S, children: fs[S] }, S))
    ] }) }) }),
    /* @__PURE__ */ c.jsx("div", { className: "g-grid", children: a.assets.map((S) => {
      const v = !!(S.image || S.video), p = v ? { video: S.video && rt(`/character/${encodeURIComponent(S.video)}`), image: S.image && rt(`/character/${encodeURIComponent(S.image)}`) } : { video: s.states[S.state]?.video && rt(s.states[S.state].video), image: s.states[S.state]?.image && rt(s.states[S.state].image) };
      return /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `g-tile${v ? "" : " borrowed"}${p.video || p.image ? "" : " missing"}`,
          onClick: () => {
            s.states[S.state] && u(S.state);
          },
          onDragOver: (N) => {
            N.preventDefault(), N.currentTarget.classList.add("drop");
          },
          onDragLeave: (N) => N.currentTarget.classList.remove("drop"),
          onDrop: (N) => {
            N.preventDefault(), N.currentTarget.classList.remove("drop");
            const T = N.dataTransfer.files[0];
            T && b(S.state, T);
          },
          children: [
            p.video ? /* @__PURE__ */ c.jsx("video", { src: p.video, muted: !0, loop: !0, playsInline: !0, autoPlay: !0 }) : p.image ? /* @__PURE__ */ c.jsx("img", { src: p.image, alt: "" }) : /* @__PURE__ */ c.jsx("div", { className: "g-none" }),
            /* @__PURE__ */ c.jsxs("div", { className: "g-cap", children: [
              /* @__PURE__ */ c.jsx("span", { children: fs[S.state] }),
              /* @__PURE__ */ c.jsx("span", { className: "g-sub", children: v ? [S.video, S.image].filter(Boolean).join(" · ") : S.fallback ? `← ${fs[S.fallback] ?? S.fallback}` : "missing" })
            ] }),
            /* @__PURE__ */ c.jsx("button", { type: "button", className: "icon-button small g-up", title: `Upload a .png or .mp4 for ${S.state}`, onClick: (N) => {
              N.stopPropagation(), g.current = S.state, m.current?.click();
            }, children: /* @__PURE__ */ c.jsx(oh, {}) })
          ]
        },
        S.state
      );
    }) }),
    /* @__PURE__ */ c.jsx("input", { ref: m, type: "file", accept: ".png,.webp,.jpg,.jpeg,.mp4,.webm", hidden: !0, onChange: (S) => {
      const v = S.target.files?.[0];
      S.target.value = "", v && b(g.current, v);
    } }),
    /* @__PURE__ */ c.jsx("p", { className: "field-hint", children: "Click a tile to show that state on stage. Drop a .png or .mp4 onto a tile, or use its upload button, to replace it. Dimmed tiles borrow another state's file." })
  ] });
}
function CE({ config: a, lang: s, setConfig: o, notify: u, onManifestChange: f }) {
  const [d, m] = x.useState(a.name), [g, b] = x.useState(a.persona), [S, v] = x.useState(String(a.playbackRate || 1)), [p, N] = x.useState(!1), T = async (E) => {
    E.preventDefault(), N(!0);
    try {
      const L = await $n("/character/config", { name: d, persona: g, playbackRate: Number(S) || 1 });
      o(L), f({ characterName: L.name, playbackRate: L.playbackRate }), u("Saved. The new persona applies from the next reply.");
    } catch (L) {
      u(`Save failed: ${L.message}`);
    } finally {
      N(!1);
    }
  };
  return /* @__PURE__ */ c.jsxs("form", { className: "form", onSubmit: (E) => {
    T(E);
  }, children: [
    /* @__PURE__ */ c.jsx(ti, { label: "Name", children: /* @__PURE__ */ c.jsx("input", { className: "input", value: d, onChange: (E) => m(E.target.value), spellCheck: !1 }) }),
    /* @__PURE__ */ c.jsx(ti, { label: "Persona", children: /* @__PURE__ */ c.jsx("textarea", { className: "input", rows: 10, value: g, onChange: (E) => b(E.target.value) }) }),
    /* @__PURE__ */ c.jsx(ti, { label: "Artwork playback speed", children: /* @__PURE__ */ c.jsx("input", { className: "input narrow", type: "number", min: "0.25", max: "4", step: "0.05", value: S, onChange: (E) => v(E.target.value) }) }),
    a.promptOnly && a.art && /* @__PURE__ */ c.jsxs("details", { className: "details", children: [
      /* @__PURE__ */ c.jsx("summary", { children: "Image prompts for this pack" }),
      /* @__PURE__ */ c.jsxs("p", { className: "field-hint", children: [
        "This pack has no images yet. Generate them with any image model and drop files named after each state into ",
        /* @__PURE__ */ c.jsx("code", { children: a.userDir }),
        "."
      ] }),
      /* @__PURE__ */ c.jsx(ti, { label: "Base image", children: /* @__PURE__ */ c.jsx("textarea", { className: "input", rows: 4, readOnly: !0, value: a.art.base ?? "" }) }),
      /* @__PURE__ */ c.jsx(ti, { label: "State deltas", children: /* @__PURE__ */ c.jsx("textarea", { className: "input", rows: 5, readOnly: !0, value: Object.entries(a.art.expressions ?? {}).map(([E, L]) => `${E}: ${L}`).join(`
`) }) }),
      /* @__PURE__ */ c.jsx(ti, { label: "Motion", children: /* @__PURE__ */ c.jsx("textarea", { className: "input", rows: 2, readOnly: !0, value: a.art.motion ?? "" }) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "row between", children: [
      /* @__PURE__ */ c.jsx("span", { className: "field-hint", children: a.bundled ? `Bundled pack. Saving copies it to ${a.userDir}` : a.dir }),
      /* @__PURE__ */ c.jsx("button", { type: "submit", className: "button primary", disabled: p, children: p ? "Saving…" : "Save" })
    ] })
  ] });
}
function OE({ open: a, onOpenChange: s, entries: o, setEntries: u, notify: f }) {
  const [d, m] = x.useState(""), g = x.useRef(null);
  x.useEffect(() => {
    a && (tl("/memory").then((v) => u(v.entries)).catch((v) => f(`Could not load memory: ${v.message}`)), window.setTimeout(() => g.current?.focus(), 50));
  }, [a]);
  const b = async (v) => {
    try {
      u((await $n("/memory", { entries: v })).entries);
    } catch (p) {
      f(`Save failed: ${p.message}`);
    }
  }, S = async () => {
    const v = d.trim();
    v !== "" && (m(""), await b([...o, { date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), text: v }]));
  };
  return /* @__PURE__ */ c.jsxs(
    Hu,
    {
      open: a,
      onOpenChange: s,
      title: "Memory",
      subtitle: "Notes about you. Every character shares them, and they survive switching packs.",
      footer: /* @__PURE__ */ c.jsxs("form", { className: "row", onSubmit: (v) => {
        v.preventDefault(), v.nativeEvent.isComposing || S();
      }, children: [
        /* @__PURE__ */ c.jsx("input", { ref: g, className: "input", value: d, onChange: (v) => m(v.target.value), placeholder: "Remember something…", spellCheck: !1 }),
        /* @__PURE__ */ c.jsx("button", { type: "submit", className: "button primary", disabled: d.trim() === "", children: "Add" })
      ] }),
      children: [
        o.length === 0 && /* @__PURE__ */ c.jsx("p", { className: "empty", children: "Nothing remembered yet." }),
        /* @__PURE__ */ c.jsx("ul", { className: "mem-list", children: o.map((v, p) => /* @__PURE__ */ c.jsx(RE, { entry: v, onChange: (N) => {
          b(o.map((T, E) => E === p ? { ...T, text: N } : T));
        }, onDrop: () => {
          b(o.filter((N, T) => T !== p));
        } }, `${v.date}-${p}`)) })
      ]
    }
  );
}
function RE({ entry: a, onChange: s, onDrop: o }) {
  const [u, f] = x.useState(a.text);
  x.useEffect(() => f(a.text), [a.text]);
  const d = () => {
    const m = u.trim();
    if (m === "") {
      f(a.text);
      return;
    }
    m !== a.text && s(m);
  };
  return /* @__PURE__ */ c.jsxs("li", { className: "mem-row", children: [
    /* @__PURE__ */ c.jsx("span", { className: "mem-date", children: a.date }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        className: "mem-fact",
        value: u,
        spellCheck: !1,
        onChange: (m) => f(m.target.value),
        onBlur: d,
        onKeyDown: (m) => {
          m.key === "Enter" && (m.preventDefault(), m.target.blur()), m.key === "Escape" && (m.preventDefault(), f(a.text), m.target.blur());
        }
      }
    ),
    /* @__PURE__ */ c.jsx("button", { type: "button", className: "icon-button small", title: "Forget this", "aria-label": "Forget this", onClick: o, children: /* @__PURE__ */ c.jsx(Sl, {}) })
  ] });
}
function ME({ open: a, onOpenChange: s, lists: o, setLists: u, openId: f, notify: d }) {
  const [m, g] = x.useState(null), [b, S] = x.useState(!1);
  x.useEffect(() => {
    a && tl("/lists").then((T) => u(T.lists)).catch((T) => d(`Could not load lists: ${T.message}`));
  }, [a]), x.useEffect(() => {
    a && f && (g(f), S(!1));
  }, [a, f]), x.useEffect(() => {
    m !== null && o.some((T) => T.id === m) || g(o[0]?.id ?? null);
  }, [o, m]);
  const v = async (T) => {
    try {
      return u((await $n("/lists", T)).lists), !0;
    } catch (E) {
      return d(`Could not update the list: ${E.message}`), !1;
    }
  }, p = b ? null : o.find((T) => T.id === m) ?? null, N = [...o].sort((T, E) => E.updatedAt.localeCompare(T.updatedAt));
  return /* @__PURE__ */ c.jsx(Ru, { open: a, onOpenChange: s, children: /* @__PURE__ */ c.jsxs(Mu, { children: [
    /* @__PURE__ */ c.jsx(Du, { className: "panel-overlay" }),
    /* @__PURE__ */ c.jsxs(zu, { className: "panel full lists", "aria-describedby": void 0, onOpenAutoFocus: (T) => T.preventDefault(), children: [
      /* @__PURE__ */ c.jsxs("aside", { className: "src-side", children: [
        /* @__PURE__ */ c.jsxs("div", { className: "src-side-head", children: [
          /* @__PURE__ */ c.jsx(Lu, { className: "panel-title", children: "Lists" }),
          /* @__PURE__ */ c.jsx("p", { className: "panel-subtitle", children: "Things worth coming back to." })
        ] }),
        /* @__PURE__ */ c.jsxs("nav", { className: "src-nav", children: [
          N.map((T) => {
            const E = T.items.filter((L) => !L.done).length;
            return /* @__PURE__ */ c.jsxs("button", { type: "button", className: `src-item${T.id === m && !b ? " active" : ""}`, onClick: () => {
              g(T.id), S(!1);
            }, children: [
              /* @__PURE__ */ c.jsx("span", { className: "src-icon", children: /* @__PURE__ */ c.jsx(_c, {}) }),
              /* @__PURE__ */ c.jsxs("span", { className: "src-text", children: [
                /* @__PURE__ */ c.jsx("b", { children: T.title }),
                /* @__PURE__ */ c.jsx("small", { children: T.items.length === 0 ? "Empty" : E === 0 ? `All ${T.items.length} done` : `${E} open${T.items.length - E > 0 ? ` · ${T.items.length - E} done` : ""}` })
              ] })
            ] }, T.id);
          }),
          /* @__PURE__ */ c.jsxs("button", { type: "button", className: `src-item new${b ? " active" : ""}`, onClick: () => S(!0), children: [
            /* @__PURE__ */ c.jsx("span", { className: "src-icon", children: /* @__PURE__ */ c.jsx(G2, {}) }),
            /* @__PURE__ */ c.jsx("span", { className: "src-text", children: /* @__PURE__ */ c.jsx("b", { children: "New list" }) })
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("p", { className: "src-side-foot", children: "She adds to these as you talk. Ask her to keep track of anything." })
      ] }),
      /* @__PURE__ */ c.jsxs("section", { className: "src-main", children: [
        /* @__PURE__ */ c.jsx(Uu, { className: "icon-button src-close", "aria-label": "Close", children: /* @__PURE__ */ c.jsx(Sl, {}) }),
        b || o.length === 0 ? /* @__PURE__ */ c.jsx(DE, { onCreate: async (T) => {
          await v({ action: "create", title: T }) && S(!1);
        } }) : p && /* @__PURE__ */ c.jsx(zE, { list: p, act: v, onDeleted: () => g(null) }, p.id)
      ] })
    ] })
  ] }) });
}
function DE({ onCreate: a }) {
  const [s, o] = x.useState(""), u = x.useRef(null);
  x.useEffect(() => {
    window.setTimeout(() => u.current?.focus(), 50);
  }, []);
  const f = async () => {
    const d = s.trim();
    d !== "" && (await a(d), o(""));
  };
  return /* @__PURE__ */ c.jsxs("div", { className: "src-empty", children: [
    /* @__PURE__ */ c.jsx(_c, {}),
    /* @__PURE__ */ c.jsx("p", { children: "Start a list" }),
    /* @__PURE__ */ c.jsx("p", { className: "field-hint", children: "Dramas to watch, gifts to consider, things to pack. She can add to it later." }),
    /* @__PURE__ */ c.jsxs("form", { className: "row new-list", onSubmit: (d) => {
      d.preventDefault(), d.nativeEvent.isComposing || f();
    }, children: [
      /* @__PURE__ */ c.jsx("input", { ref: u, className: "input", value: s, placeholder: "List title", spellCheck: !1, onChange: (d) => o(d.target.value) }),
      /* @__PURE__ */ c.jsx("button", { type: "submit", className: "button primary", disabled: s.trim() === "", children: "Create" })
    ] })
  ] });
}
function zE({ list: a, act: s, onDeleted: o }) {
  const [u, f] = x.useState(""), [d, m] = x.useState(!1), g = a.items.filter((p) => !p.done), b = a.items.filter((p) => p.done), S = async () => {
    const p = u.trim();
    p !== "" && (f(""), await s({ action: "add", list: a.id, text: p }) || f(p));
  }, v = async () => {
    window.confirm(`Delete "${a.title}"? This cannot be undone.`) && await s({ action: "delete", list: a.id }) && o();
  };
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsxs("header", { className: "src-head", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "src-head-text", children: [
        /* @__PURE__ */ c.jsx(LE, { value: a.title, onChange: (p) => {
          s({ action: "rename", list: a.id, title: p });
        } }),
        /* @__PURE__ */ c.jsx(UE, { value: a.description ?? "", placeholder: "Add a description", onChange: (p) => {
          s({ action: "rename", list: a.id, description: p });
        } })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: "src-head-actions", children: /* @__PURE__ */ c.jsx("button", { type: "button", className: "icon-button", title: "Delete list", "aria-label": "Delete list", onClick: () => {
        v();
      }, children: /* @__PURE__ */ c.jsx(iv, {}) }) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "src-body", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "rem-add", children: [
        /* @__PURE__ */ c.jsx("input", { className: "input", value: u, placeholder: "Add an item…", spellCheck: !1, onChange: (p) => f(p.target.value), onKeyDown: (p) => {
          p.key === "Enter" && !p.nativeEvent.isComposing && (p.preventDefault(), S());
        } }),
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "button primary", disabled: u.trim() === "", onClick: () => {
          S();
        }, children: "Add" })
      ] }),
      a.items.length === 0 && /* @__PURE__ */ c.jsx("p", { className: "rem-empty", children: "Nothing here yet." }),
      g.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: "rem-list", children: g.map((p) => /* @__PURE__ */ c.jsx(Ey, { item: p, list: a, act: s }, p.id)) }),
      b.length > 0 && /* @__PURE__ */ c.jsxs("section", { className: "rem-group", children: [
        /* @__PURE__ */ c.jsxs("button", { type: "button", className: "text-button done-toggle", onClick: () => m((p) => !p), children: [
          d ? "Hide" : "Show",
          " ",
          b.length,
          " done"
        ] }),
        d && /* @__PURE__ */ c.jsx("ul", { className: "rem-list", children: b.map((p) => /* @__PURE__ */ c.jsx(Ey, { item: p, list: a, act: s }, p.id)) })
      ] })
    ] })
  ] });
}
function Ey({ item: a, list: s, act: o }) {
  const [u, f] = x.useState(a.text), [d, m] = x.useState(a.note ?? "");
  x.useEffect(() => {
    f(a.text), m(a.note ?? "");
  }, [a.text, a.note]);
  const g = (p) => {
    o({ action: "item", list: s.id, item: a.id, ...p });
  }, b = () => {
    const p = u.trim();
    if (p === "") {
      f(a.text);
      return;
    }
    p !== a.text && g({ text: p });
  }, S = () => {
    const p = d.trim();
    p !== (a.note ?? "") && g({ note: p });
  }, v = (p, N) => (T) => {
    T.key === "Enter" && (T.preventDefault(), T.target.blur()), T.key === "Escape" && (T.preventDefault(), N(), T.target.blur());
  };
  return /* @__PURE__ */ c.jsxs("li", { className: `rem-row list-row${a.done ? " done" : ""}`, children: [
    /* @__PURE__ */ c.jsx("button", { type: "button", className: `rem-check${a.done ? " checked" : ""}`, title: a.done ? "Mark not done" : "Mark done", onClick: () => g({ done: !a.done }), children: /* @__PURE__ */ c.jsx(si, {}) }),
    /* @__PURE__ */ c.jsxs("span", { className: "rem-text", children: [
      /* @__PURE__ */ c.jsx("input", { className: "list-text", value: u, spellCheck: !1, onChange: (p) => f(p.target.value), onBlur: b, onKeyDown: v(b, () => f(a.text)) }),
      /* @__PURE__ */ c.jsx("input", { className: "list-note", value: d, placeholder: "Note", spellCheck: !1, onChange: (p) => m(p.target.value), onBlur: S, onKeyDown: v(S, () => m(a.note ?? "")) })
    ] }),
    /* @__PURE__ */ c.jsx("button", { type: "button", className: "icon-button small list-remove", title: "Remove", "aria-label": "Remove", onClick: () => g({ remove: !0 }), children: /* @__PURE__ */ c.jsx(Sl, {}) })
  ] });
}
function LE({ value: a, onChange: s }) {
  const [o, u] = x.useState(a);
  x.useEffect(() => u(a), [a]);
  const f = () => {
    const d = o.trim();
    if (d === "") {
      u(a);
      return;
    }
    d !== a && s(d);
  };
  return /* @__PURE__ */ c.jsx(
    "input",
    {
      className: "list-title",
      value: o,
      spellCheck: !1,
      onChange: (d) => u(d.target.value),
      onBlur: f,
      onKeyDown: (d) => {
        d.key === "Enter" && (d.preventDefault(), d.target.blur()), d.key === "Escape" && (u(a), d.target.blur());
      }
    }
  );
}
function UE({ value: a, placeholder: s, onChange: o }) {
  const [u, f] = x.useState(a);
  x.useEffect(() => f(a), [a]);
  const d = () => {
    const m = u.trim();
    m !== a && o(m);
  };
  return /* @__PURE__ */ c.jsx(
    "input",
    {
      className: "list-desc",
      value: u,
      placeholder: s,
      spellCheck: !1,
      onChange: (m) => f(m.target.value),
      onBlur: d,
      onKeyDown: (m) => {
        m.key === "Enter" && (m.preventDefault(), m.target.blur()), m.key === "Escape" && (f(a), m.target.blur());
      }
    }
  );
}
const HE = 4096;
function BE({ open: a, onOpenChange: s, artifacts: o, setArtifacts: u, openId: f, notify: d }) {
  const [m, g] = x.useState(null);
  x.useEffect(() => {
    a && (g(f), tl("/artifacts").then((N) => u(N.artifacts)).catch((N) => d(`Could not load files: ${N.message}`)));
  }, [a, f]);
  const b = m === null ? void 0 : o.find((N) => N.id === m), S = [...o].reverse(), v = S.filter((N) => N.kind !== "other" && N.exists !== !1), p = S.filter((N) => N.kind === "other" || N.exists === !1);
  return /* @__PURE__ */ c.jsx(
    Hu,
    {
      open: a,
      onOpenChange: s,
      wide: !0,
      title: b ? /* @__PURE__ */ c.jsxs("button", { type: "button", className: "text-button back", onClick: () => g(null), children: [
        /* @__PURE__ */ c.jsx(f2, {}),
        "All files"
      ] }) : "Files",
      subtitle: b ? void 0 : "Every file she wrote for you. The file stays where it is; this is just a way to open it.",
      children: b ? /* @__PURE__ */ c.jsx(qE, { artifact: b, onForget: async () => {
        try {
          u((await tl(`/artifact/${encodeURIComponent(b.id)}`, { method: "DELETE" })).artifacts), g(null);
        } catch (N) {
          d(`Could not remove: ${N.message}`);
        }
      }, notify: d }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        o.length === 0 && /* @__PURE__ */ c.jsx("p", { className: "empty", children: "Nothing written yet." }),
        /* @__PURE__ */ c.jsxs("div", { className: "art-grid", children: [
          v.map((N) => /* @__PURE__ */ c.jsx(Ty, { item: N, onOpen: () => g(N.id) }, N.id)),
          p.length > 0 && /* @__PURE__ */ c.jsx("div", { className: "art-strip", children: p.map((N) => /* @__PURE__ */ c.jsx(Ty, { item: N, compact: !0, onOpen: () => g(N.id) }, N.id)) })
        ] })
      ] })
    }
  );
}
function p1(a, s = !1) {
  return [a.description ? a.name : "", h1(a), a.exists === !1 ? "missing" : typeof a.size == "number" ? Bu(a.size) : "", s ? bE(a.at) : "", s && a.source === "presented" ? "delivered" : ""].filter(Boolean).join(" · ");
}
function Ty({ item: a, compact: s, onOpen: o }) {
  const [u, f] = x.useState(null), d = rt(`/artifact/${encodeURIComponent(a.id)}`), m = a.kind === "markdown" || a.kind === "text";
  x.useEffect(() => {
    if (s || !m) return;
    let b = !0;
    return fetch(`${d}${d.includes("?") ? "&" : "?"}head=${HE}`).then((S) => S.ok ? S.text() : Promise.reject(new Error())).then((S) => {
      b && f(S);
    }).catch(() => {
    }), () => {
      b = !1;
    };
  }, [d, s, m]);
  const g = a.exists === !1 ? k2 : a.kind === "image" ? Tc : Py;
  return /* @__PURE__ */ c.jsxs("div", { role: "button", tabIndex: 0, className: `art-card${s ? " compact" : ""}${a.exists === !1 ? " missing" : ""}`, title: a.path, onClick: o, onKeyDown: (b) => {
    (b.key === "Enter" || b.key === " ") && (b.preventDefault(), o());
  }, children: [
    /* @__PURE__ */ c.jsx("div", { className: "art-thumb", children: !s && a.kind === "image" ? /* @__PURE__ */ c.jsx("img", { src: d, alt: "", loading: "lazy" }) : !s && u !== null ? a.kind === "markdown" ? /* @__PURE__ */ c.jsx("div", { className: "art-thumb-page", dangerouslySetInnerHTML: { __html: bh(u) } }) : /* @__PURE__ */ c.jsx("div", { className: "art-thumb-page", children: /* @__PURE__ */ c.jsx("pre", { children: u }) }) : /* @__PURE__ */ c.jsx(g, { className: "art-icon" }) }),
    /* @__PURE__ */ c.jsxs("div", { className: "art-foot", children: [
      /* @__PURE__ */ c.jsx("p", { className: "art-name", children: a.description ?? a.name }),
      /* @__PURE__ */ c.jsx("p", { className: "art-meta", children: p1(a) })
    ] })
  ] });
}
function qE({ artifact: a, onForget: s, notify: o }) {
  const [u, f] = x.useState(null), [d, m] = x.useState(!1), g = rt(`/artifact/${encodeURIComponent(a.id)}`);
  x.useEffect(() => {
    if (f(null), a.kind === "image" || a.kind === "other") return;
    let v = !0;
    return fetch(g).then(async (p) => {
      if (p.status === 404) throw new Error("The file is no longer where it was.");
      if (!p.ok) throw new Error(await p.text());
      const N = await p.text();
      v && f(a.kind === "markdown" ? { html: bh(N) } : { text: N });
    }).catch((p) => {
      v && f({ error: p.message });
    }), () => {
      v = !1;
    };
  }, [g, a.kind]);
  const b = async () => {
    const v = await fetch(rt(`/artifact/${encodeURIComponent(a.id)}/reveal`), { method: "POST" });
    o(v.ok ? "Shown in Finder." : "The file is no longer where it was.");
  }, S = async () => {
    try {
      await navigator.clipboard.writeText(a.path), m(!0), window.setTimeout(() => m(!1), 1500);
    } catch {
      o(a.path);
    }
  };
  return /* @__PURE__ */ c.jsxs("div", { className: "file-view", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "file-head", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "file-titles", children: [
        /* @__PURE__ */ c.jsx("p", { className: "file-name", children: a.description ?? a.name }),
        /* @__PURE__ */ c.jsx("p", { className: "file-meta", children: p1(a, !0) }),
        /* @__PURE__ */ c.jsx("p", { className: "file-path", children: a.path })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ c.jsxs("button", { type: "button", className: "button", onClick: () => {
          b();
        }, children: [
          /* @__PURE__ */ c.jsx(ev, {}),
          "Reveal"
        ] }),
        /* @__PURE__ */ c.jsxs("button", { type: "button", className: "button", onClick: () => {
          S();
        }, children: [
          d ? /* @__PURE__ */ c.jsx(si, {}) : /* @__PURE__ */ c.jsx(sh, {}),
          d ? "Copied" : "Copy path"
        ] }),
        /* @__PURE__ */ c.jsxs("button", { type: "button", className: "button", onClick: () => {
          s();
        }, children: [
          /* @__PURE__ */ c.jsx(iv, {}),
          "Remove"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "file-body", children: [
      a.kind === "image" && /* @__PURE__ */ c.jsx("img", { className: "file-image", src: g, alt: a.name }),
      a.kind === "other" && /* @__PURE__ */ c.jsx("p", { className: "empty", children: "This kind of file cannot be shown here. Use Reveal to find it." }),
      u?.error && /* @__PURE__ */ c.jsx("p", { className: "empty", children: u.error }),
      u?.html !== void 0 && /* @__PURE__ */ c.jsx("div", { className: "prose", dangerouslySetInnerHTML: { __html: u.html } }),
      u?.text !== void 0 && /* @__PURE__ */ c.jsx("pre", { className: "file-pre", children: u.text }),
      u === null && a.kind !== "image" && a.kind !== "other" && /* @__PURE__ */ c.jsx("p", { className: "empty", children: "Loading…" })
    ] })
  ] });
}
const $E = [
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
], YE = [
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
function g1() {
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx("p", { className: "field-hint", style: { marginBottom: 14 }, children: "Slash commands go in the message box. ⌥ shortcuts work anywhere, even mid-sentence." }),
    /* @__PURE__ */ c.jsx("h3", { className: "section", children: "Commands" }),
    /* @__PURE__ */ c.jsx("dl", { className: "help-list", children: $E.map(([a, s]) => /* @__PURE__ */ c.jsxs(x.Fragment, { children: [
      /* @__PURE__ */ c.jsx("dt", { children: /* @__PURE__ */ c.jsx("code", { children: a }) }),
      /* @__PURE__ */ c.jsx("dd", { children: s })
    ] }, a)) }),
    /* @__PURE__ */ c.jsx("h3", { className: "section", children: "Keyboard" }),
    /* @__PURE__ */ c.jsx("dl", { className: "help-list", children: YE.map(([a, s]) => /* @__PURE__ */ c.jsxs(x.Fragment, { children: [
      /* @__PURE__ */ c.jsx("dt", { children: a.map((o) => /* @__PURE__ */ c.jsx("kbd", { children: o }, o)) }),
      /* @__PURE__ */ c.jsx("dd", { children: s })
    ] }, s)) })
  ] });
}
function GE({ open: a, onOpenChange: s }) {
  return /* @__PURE__ */ c.jsx(Hu, { open: a, onOpenChange: s, title: "Help", children: /* @__PURE__ */ c.jsx(g1, {}) });
}
const wy = {
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
}, el = (a) => {
  const [s, o] = String(a).split(":");
  return (wy[s] ?? wy.speech_error) + (o ? ` (${o})` : "");
}, VE = { zh: "你好，我是小黑鱼。今天想和我聊些什么呢？", en: "Hello, I am here. What would you like to talk about today?", ja: "こんにちは。今日はどんなお話をしましょうか。" }, Nc = { zh: "中文", en: "English", ja: "日本語" };
function XE({ open: a, onOpenChange: s, theme: o, setTheme: u, voiceOn: f, setVoiceOn: d, speechPref: m, setSpeechPref: g, speechLang: b, onNewSession: S, stopVoice: v }) {
  const [p, N] = x.useState("general"), T = [
    { id: "general", label: "General", hint: "Appearance and session", icon: Z2 },
    { id: "voice", label: "Voice", hint: "Read aloud and the speech provider", icon: U2 },
    { id: "help", label: "Help", hint: "Commands and shortcuts", icon: g2 }
  ];
  return /* @__PURE__ */ c.jsx(Ru, { open: a, onOpenChange: s, children: /* @__PURE__ */ c.jsxs(Mu, { children: [
    /* @__PURE__ */ c.jsx(Du, { className: "panel-overlay" }),
    /* @__PURE__ */ c.jsxs(zu, { className: "panel full settings", "aria-describedby": void 0, onOpenAutoFocus: (E) => E.preventDefault(), children: [
      /* @__PURE__ */ c.jsxs("aside", { className: "src-side", children: [
        /* @__PURE__ */ c.jsxs("div", { className: "src-side-head", children: [
          /* @__PURE__ */ c.jsx(Lu, { className: "panel-title", children: "Settings" }),
          /* @__PURE__ */ c.jsx("p", { className: "panel-subtitle", children: "How the room looks and sounds." })
        ] }),
        /* @__PURE__ */ c.jsx("nav", { className: "src-nav", children: T.map((E) => {
          const L = E.icon;
          return /* @__PURE__ */ c.jsxs("button", { type: "button", className: `src-item${p === E.id ? " active" : ""}`, onClick: () => N(E.id), children: [
            /* @__PURE__ */ c.jsx("span", { className: "src-icon", children: /* @__PURE__ */ c.jsx(L, {}) }),
            /* @__PURE__ */ c.jsxs("span", { className: "src-text", children: [
              /* @__PURE__ */ c.jsx("b", { children: E.label }),
              /* @__PURE__ */ c.jsx("small", { children: E.hint })
            ] })
          ] }, E.id);
        }) })
      ] }),
      /* @__PURE__ */ c.jsxs("section", { className: "src-main", children: [
        /* @__PURE__ */ c.jsx(Uu, { className: "icon-button src-close", "aria-label": "Close", children: /* @__PURE__ */ c.jsx(Sl, {}) }),
        /* @__PURE__ */ c.jsx("header", { className: "src-head", children: /* @__PURE__ */ c.jsxs("div", { className: "src-titles", children: [
          /* @__PURE__ */ c.jsx("h2", { children: T.find((E) => E.id === p)?.label }),
          /* @__PURE__ */ c.jsx("p", { className: "source-summary", children: T.find((E) => E.id === p)?.hint })
        ] }) }),
        /* @__PURE__ */ c.jsxs("div", { className: "src-body", children: [
          p === "general" && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            /* @__PURE__ */ c.jsxs("div", { className: "settings-group", children: [
              /* @__PURE__ */ c.jsx("h3", { className: "section", children: "Appearance" }),
              /* @__PURE__ */ c.jsx("div", { className: "settings-rows", children: /* @__PURE__ */ c.jsxs("div", { className: "setting", children: [
                /* @__PURE__ */ c.jsxs("span", { children: [
                  /* @__PURE__ */ c.jsx("b", { children: "Theme" }),
                  /* @__PURE__ */ c.jsx("small", { children: "System follows macOS and switches with it." })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: "seg", role: "tablist", children: ["system", "light", "dark"].map((E) => /* @__PURE__ */ c.jsx("button", { type: "button", role: "tab", "aria-selected": o === E, className: o === E ? "active" : "", onClick: () => u(E), children: E === "system" ? "System" : E === "light" ? "Light" : "Dark" }, E)) })
              ] }) })
            ] }),
            a && /* @__PURE__ */ c.jsx(ZE, {}),
            /* @__PURE__ */ c.jsxs("div", { className: "settings-group", children: [
              /* @__PURE__ */ c.jsx("h3", { className: "section", children: "Session" }),
              /* @__PURE__ */ c.jsx("div", { className: "settings-rows", children: /* @__PURE__ */ c.jsxs("div", { className: "setting", children: [
                /* @__PURE__ */ c.jsxs("span", { children: [
                  /* @__PURE__ */ c.jsx("b", { children: "Start over" }),
                  /* @__PURE__ */ c.jsx("small", { children: "Opens an empty conversation. The current one stays in dsh web." })
                ] }),
                /* @__PURE__ */ c.jsx("button", { type: "button", className: "button", onClick: () => {
                  S(), s(!1);
                }, children: "New session" })
              ] }) })
            ] })
          ] }),
          p === "voice" && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            /* @__PURE__ */ c.jsxs("div", { className: "settings-group", children: [
              /* @__PURE__ */ c.jsx("h3", { className: "section", children: "Playback" }),
              /* @__PURE__ */ c.jsxs("div", { className: "settings-rows", children: [
                /* @__PURE__ */ c.jsxs("label", { className: "setting", children: [
                  /* @__PURE__ */ c.jsxs("span", { children: [
                    /* @__PURE__ */ c.jsx("b", { children: "Read replies aloud" }),
                    /* @__PURE__ */ c.jsx("small", { children: "Each reply is spoken with the provider set below." })
                  ] }),
                  /* @__PURE__ */ c.jsx("input", { type: "checkbox", className: "switch", checked: f, onChange: (E) => d(E.target.checked) })
                ] }),
                /* @__PURE__ */ c.jsxs("label", { className: "setting", children: [
                  /* @__PURE__ */ c.jsxs("span", { children: [
                    /* @__PURE__ */ c.jsx("b", { children: "Speech language" }),
                    /* @__PURE__ */ c.jsx("small", { children: "Replies are rewritten into this language before they are read." })
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: "control", children: /* @__PURE__ */ c.jsxs("select", { className: "input short", value: m, onChange: (E) => g(E.target.value), children: [
                    /* @__PURE__ */ c.jsx("option", { value: "auto", children: "Follow the browser" }),
                    /* @__PURE__ */ c.jsx("option", { value: "zh", children: "中文" }),
                    /* @__PURE__ */ c.jsx("option", { value: "en", children: "English" }),
                    /* @__PURE__ */ c.jsx("option", { value: "ja", children: "日本語" })
                  ] }) })
                ] })
              ] })
            ] }),
            a && /* @__PURE__ */ c.jsx(QE, { speechLang: b, speechPref: m, setSpeechPref: g, stopVoice: v })
          ] }),
          p === "help" && /* @__PURE__ */ c.jsx(g1, {})
        ] })
      ] })
    ] })
  ] }) });
}
function ZE() {
  const [a, s] = x.useState(void 0), [o, u] = x.useState(""), [f, d] = x.useState(""), m = x.useCallback(() => {
    tl("/sources").then((v) => s(v.sources.find((p) => p.id === "computer-use")?.view ?? null)).catch(() => s(null));
  }, []);
  x.useEffect(() => {
    m();
  }, [m]);
  const g = async (v, p) => {
    u(v), d("");
    try {
      const N = await $n(`/sources/computer-use/${v}`, p === void 0 ? {} : { value: p });
      N.message && d(N.message), m();
    } catch (N) {
      d(N.message);
    } finally {
      u("");
    }
  }, b = (v) => a?.stats?.find((p) => p.label === v)?.value ?? "—", S = a?.actions?.find((v) => v.id === "screenshots")?.value ?? !0;
  return /* @__PURE__ */ c.jsxs("div", { className: "settings-group", children: [
    /* @__PURE__ */ c.jsx("h3", { className: "section", children: "Computer Use" }),
    /* @__PURE__ */ c.jsx("div", { className: "settings-rows", children: a === void 0 ? /* @__PURE__ */ c.jsx("p", { className: "empty", children: "Loading…" }) : a === null ? /* @__PURE__ */ c.jsx("p", { className: "empty", children: "Not available: the Computer Use plugin is not mounted in this dsh." }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsxs("label", { className: "setting", children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("b", { children: "Let her use your apps" }),
          /* @__PURE__ */ c.jsx("small", { children: a.summary })
        ] }),
        /* @__PURE__ */ c.jsx("input", { type: "checkbox", className: "switch", checked: a.shared, disabled: o !== "", onChange: (v) => {
          g("enabled", v.target.checked);
        } })
      ] }),
      /* @__PURE__ */ c.jsxs("label", { className: "setting", children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("b", { children: "Attach screenshots" }),
          /* @__PURE__ */ c.jsx("small", { children: "Off sends only the accessibility tree of the window." })
        ] }),
        /* @__PURE__ */ c.jsx("input", { type: "checkbox", className: "switch", checked: S, disabled: o !== "" || !a.shared, onChange: (v) => {
          g("screenshots", v.target.checked);
        } })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "setting", children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("b", { children: "Permissions" }),
          /* @__PURE__ */ c.jsxs("small", { children: [
            "Accessibility: ",
            b("Accessibility"),
            " · Screen Recording: ",
            b("Screen Recording"),
            ". Granted to the app Aibo was launched from."
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("span", { className: "control", children: [
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "button", disabled: o !== "", onClick: () => {
            g("request");
          }, children: "Request" }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "button", disabled: o !== "", onClick: () => {
            g("refresh");
          }, children: "Check" })
        ] })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: "setting", children: /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("b", { children: "Approvals" }),
        /* @__PURE__ */ c.jsxs("small", { children: [
          "She asks before the first action in each app. Apps allowed without asking: ",
          b("Always allowed"),
          "; manage them under Connectors › Computer Use."
        ] })
      ] }) }),
      f && /* @__PURE__ */ c.jsx("p", { className: "empty", children: f })
    ] }) })
  ] });
}
function QE({ speechLang: a, speechPref: s, setSpeechPref: o, stopVoice: u }) {
  const [f, d] = x.useState(null), [m, g] = x.useState(a);
  x.useEffect(() => g(a), [a]);
  const [b, S] = x.useState(""), [v, p] = x.useState(""), [N, T] = x.useState(""), [E, L] = x.useState(""), [k, V] = x.useState(!1), [X, U] = x.useState(null), [F, Z] = x.useState(""), [B, G] = x.useState(""), ce = x.useRef(null), Te = x.useRef(null), de = f?.catalog.find((K) => K.id === b), xe = b === "local" || b === "voicevox" || b === "fish", pe = f?.catalog.filter((K) => K.languages.includes(m)) ?? [];
  x.useEffect(() => {
    tl("/voice/config").then(d).catch(() => G(el("config_error")));
  }, []), x.useEffect(() => {
    if (!f) return;
    const K = f.profiles[m];
    S(K.provider), p(K.model), T(K.voice), L(""), V(!1);
  }, [f, m]), x.useEffect(() => {
    G("");
  }, [m]);
  const W = (K) => {
    const Ge = f?.catalog.find((st) => st.id === K);
    Ge && (S(K), p(Ge.models[0]), T(Ge.voices[m] ?? ""), L(""), V(!1), G(""));
  };
  x.useEffect(() => {
    if (!xe) {
      U(null), Z("");
      return;
    }
    const K = new AbortController();
    return U(null), Z(""), fetch(rt(`/voice/voices?provider=${encodeURIComponent(b)}&language=${m}`), { signal: K.signal }).then(async (Ge) => {
      if (!Ge.ok) throw new Error((await Ge.json()).error ?? "network_error");
      return Ge.json();
    }).then((Ge) => {
      U(Ge.voices), T((st) => Ge.voices.some((hn) => hn.id === st) ? st : Ge.voices[0]?.id ?? "");
    }).catch((Ge) => {
      K.signal.aborted || (U([]), Z(el(Ge.message)));
    }), () => K.abort();
  }, [b, m, xe]);
  const we = () => ({ language: m, profile: { provider: b, model: v, voice: N.trim() }, apiKey: E.trim(), clearKey: k }), he = () => {
    Te.current?.abort(), Te.current = null, ce.current?.pause(), ce.current = null;
  }, J = async () => {
    he(), u(), G("Saving…");
    try {
      d(await $n("/voice/config", we())), G("Saved");
    } catch (K) {
      G(el(K.message));
    }
  }, re = async () => {
    if (he(), u(), k && E.trim() === "" && de?.key) {
      G(el("key_required"));
      return;
    }
    Te.current = new AbortController(), G("Generating preview…");
    try {
      const K = await fetch(rt("/voice/read"), { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...we(), text: VE[m] }), signal: Te.current.signal });
      if (!K.ok) throw new Error((await K.json()).error ?? "speech_error");
      const Ge = URL.createObjectURL(await K.blob()), st = new Audio(Ge);
      ce.current = st, st.onended = () => {
        URL.revokeObjectURL(Ge), G("Preview finished");
      }, st.onerror = () => G(el("speech_error")), await st.play(), G("Playing preview…");
    } catch (K) {
      K instanceof DOMException && K.name === "AbortError" || G(el(K.message));
    }
  };
  if (x.useEffect(() => he, []), !f) return /* @__PURE__ */ c.jsxs("div", { className: "settings-group", children: [
    /* @__PURE__ */ c.jsx("h3", { className: "section", children: "Speech provider" }),
    /* @__PURE__ */ c.jsx("p", { className: "empty", children: B || "Loading…" })
  ] });
  const be = xe ? !!X?.some((K) => K.id === N) : N.trim() !== "", Ue = b === "local" ? "Uses installed Mac system voices. No key and no dialogue upload." : b === "voicevox" ? "Free local Japanese model. Start VOICEVOX on port 50021." : "Uses your own account. Preview and dialogue text go to this provider and may incur charges.";
  return /* @__PURE__ */ c.jsxs("form", { className: "settings-group", onSubmit: (K) => {
    K.preventDefault(), J();
  }, children: [
    /* @__PURE__ */ c.jsx("h3", { className: "section", children: "Speech provider" }),
    /* @__PURE__ */ c.jsxs("div", { className: "settings-rows", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "setting", children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("b", { children: "Voice for" }),
          /* @__PURE__ */ c.jsxs("small", { children: [
            "Each language has its own provider and voice.",
            m === a ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              " Replies are read in ",
              Nc[a],
              s === "auto" ? " (following the browser)" : "",
              "."
            ] }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              " Replies are read in ",
              Nc[a],
              ", not ",
              Nc[m],
              ". ",
              /* @__PURE__ */ c.jsxs("button", { type: "button", className: "text-button inline", onClick: () => o(m), children: [
                "Read replies in ",
                Nc[m]
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("span", { className: "seg", role: "tablist", children: ["zh", "en", "ja"].map((K) => /* @__PURE__ */ c.jsx("button", { type: "button", role: "tab", "aria-selected": m === K, className: m === K ? "active" : "", onClick: () => g(K), children: Nc[K] }, K)) })
      ] }),
      /* @__PURE__ */ c.jsxs("label", { className: "setting", children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("b", { children: "Provider" }),
          /* @__PURE__ */ c.jsxs("small", { children: [
            Ue,
            de?.docs ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              " ",
              /* @__PURE__ */ c.jsx("a", { href: de.docs, target: "_blank", rel: "noopener noreferrer", children: "Documentation" })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("span", { className: "control", children: /* @__PURE__ */ c.jsx("select", { className: "input", value: b, onChange: (K) => W(K.target.value), children: pe.map((K) => /* @__PURE__ */ c.jsx("option", { value: K.id, children: K.id === "local" ? "Local system voice · free" : K.name }, K.id)) }) })
      ] }),
      (de?.models.length ?? 0) > 1 && /* @__PURE__ */ c.jsxs("label", { className: "setting", children: [
        /* @__PURE__ */ c.jsx("span", { children: /* @__PURE__ */ c.jsx("b", { children: "Model" }) }),
        /* @__PURE__ */ c.jsx("span", { className: "control", children: /* @__PURE__ */ c.jsx("select", { className: "input", value: v, onChange: (K) => p(K.target.value), children: (de?.models ?? []).map((K) => /* @__PURE__ */ c.jsx("option", { value: K, children: K }, K)) }) })
      ] }),
      /* @__PURE__ */ c.jsxs("label", { className: "setting", children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("b", { children: "Voice" }),
          (F || xe && X?.length === 0) && /* @__PURE__ */ c.jsx("small", { className: "composer-error", children: F || "No voices for this language." })
        ] }),
        /* @__PURE__ */ c.jsx("span", { className: "control", children: xe ? /* @__PURE__ */ c.jsxs("select", { className: "input", value: N, disabled: X === null || X.length === 0, onChange: (K) => T(K.target.value), children: [
          X === null && /* @__PURE__ */ c.jsx("option", { value: "", children: "Loading voices…" }),
          X?.map((K) => /* @__PURE__ */ c.jsx("option", { value: K.id, children: b === "local" ? `${K.name.replace(/\s+\(.*\)$/, "")} · ${K.locale}` : K.name }, K.id))
        ] }) : /* @__PURE__ */ c.jsx("input", { className: "input", value: N, maxLength: 160, spellCheck: !1, onChange: (K) => T(K.target.value), placeholder: "Voice ID from the provider" }) })
      ] }),
      de?.key && /* @__PURE__ */ c.jsxs("label", { className: "setting", children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("b", { children: "API key" }),
          /* @__PURE__ */ c.jsxs("small", { children: [
            "Kept in a local config file, outside character exports.",
            f.hasKeys[b] && !k ? " A key is saved; leave blank to keep it." : ""
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("span", { className: "control", children: [
          f.hasKeys[b] && /* @__PURE__ */ c.jsx("button", { type: "button", className: `text-button${k ? " danger" : ""}`, onClick: () => {
            V((K) => !K), L("");
          }, children: k ? "Will delete · undo" : "Delete saved key" }),
          /* @__PURE__ */ c.jsx("input", { className: "input", type: "password", autoComplete: "new-password", value: E, disabled: k, onChange: (K) => L(K.target.value), placeholder: k ? "Key will be deleted on save" : f.hasKeys[b] ? "••••••••" : "Enter your API key" })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "setting-foot", children: [
        /* @__PURE__ */ c.jsx("span", { className: "field-hint", role: "status", children: B }),
        /* @__PURE__ */ c.jsxs("span", { className: "row", children: [
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "button", disabled: !be, onClick: () => {
            re();
          }, children: "Preview" }),
          /* @__PURE__ */ c.jsx("button", { type: "submit", className: "button primary", disabled: !be, children: "Save" })
        ] })
      ] })
    ] })
  ] });
}
const y1 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function KE(a) {
  const s = a.trim().split(/\s+/).filter(Boolean);
  if (s.length === 0) return "·";
  const o = s[0], u = s.length > 1 ? s[s.length - 1] : "";
  return /[぀-ヿ㐀-鿿가-힯]/.test(o) ? o.slice(-1) : ((o[0] ?? "") + (u[0] ?? "")).toUpperCase();
}
function IE(a) {
  let s = 0;
  for (const o of a) s = s * 31 + o.codePointAt(0) >>> 0;
  return s % 360;
}
function JE(a) {
  const s = a.trim()[0] ?? "#";
  return /\p{L}/u.test(s) ? /[A-Za-zÀ-ɏ]/.test(s) ? s.normalize("NFD")[0].toUpperCase() : s : "#";
}
const FE = (a) => a.inDays === 0 ? "Today" : a.inDays === 1 ? "Tomorrow" : `${y1[Number(a.date.slice(5, 7)) - 1]} ${Number(a.date.slice(8, 10))} · in ${a.inDays} days`;
function Rd({ name: a, dim: s }) {
  return /* @__PURE__ */ c.jsx("span", { className: `contacts-avatar${s ? " dim" : ""}`, style: s ? void 0 : { "--h": IE(a) }, children: s ? "" : KE(a) });
}
function PE({ data: a, placeholder: s }) {
  const [o, u] = x.useState(""), f = a?.contacts ?? [], d = (a?.birthdays ?? []).filter((v) => v.inDays <= 30), m = o.trim().toLowerCase(), g = m.replace(/\D/g, ""), b = x.useMemo(() => m === "" ? f : f.filter(
    (v) => v.name.toLowerCase().includes(m) || v.org.toLowerCase().includes(m) || v.emails.some((p) => p.toLowerCase().includes(m)) || g.length >= 3 && v.phones.some((p) => p.replace(/\D/g, "").includes(g))
  ), [f, m, g]), S = x.useMemo(() => {
    const v = /* @__PURE__ */ new Map();
    for (const p of b) {
      const N = JE(p.name);
      (v.get(N) ?? v.set(N, []).get(N)).push(p);
    }
    return [...v.entries()].sort(([p], [N]) => p === "#" ? 1 : N === "#" ? -1 : p.localeCompare(N));
  }, [b]);
  return s || !a ? /* @__PURE__ */ c.jsxs("div", { className: "contacts placeholder", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "contacts-search", children: [
      /* @__PURE__ */ c.jsx(wc, {}),
      /* @__PURE__ */ c.jsx("input", { className: "input", placeholder: "Search by name, company, email or number", disabled: !0 })
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: "contacts-list", children: Array.from({ length: 6 }, (v, p) => /* @__PURE__ */ c.jsxs("li", { className: "contacts-row", children: [
      /* @__PURE__ */ c.jsx(Rd, { name: "", dim: !0 }),
      /* @__PURE__ */ c.jsxs("span", { className: "contacts-text", children: [
        /* @__PURE__ */ c.jsx("i", { className: "contacts-skeleton", style: { width: `${38 + p * 17 % 30}%` } }),
        /* @__PURE__ */ c.jsx("i", { className: "contacts-skeleton short", style: { width: `${22 + p * 11 % 20}%` } })
      ] })
    ] }, p)) }),
    /* @__PURE__ */ c.jsx("p", { className: "rem-empty", children: "Waiting for access to Contacts" })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: "contacts", children: [
    d.length > 0 && /* @__PURE__ */ c.jsxs("section", { className: "contacts-bdays", children: [
      /* @__PURE__ */ c.jsxs("h3", { className: "section", children: [
        /* @__PURE__ */ c.jsx(B0, {}),
        " Birthdays ",
        /* @__PURE__ */ c.jsx("span", { className: "badge", children: d.length })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: "contacts-bday-strip", children: d.map((v) => /* @__PURE__ */ c.jsxs("div", { className: `contacts-bday${v.inDays === 0 ? " today" : ""}`, children: [
        /* @__PURE__ */ c.jsx(Rd, { name: v.name }),
        /* @__PURE__ */ c.jsxs("span", { className: "contacts-bday-text", children: [
          /* @__PURE__ */ c.jsx("b", { children: v.name }),
          /* @__PURE__ */ c.jsx("small", { children: FE(v) })
        ] })
      ] }, v.id)) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "contacts-search", children: [
      /* @__PURE__ */ c.jsx(wc, {}),
      /* @__PURE__ */ c.jsx("input", { className: "input", value: o, placeholder: "Search by name, company, email or number", onChange: (v) => u(v.target.value) }),
      o !== "" && /* @__PURE__ */ c.jsx("button", { type: "button", className: "text-button", onClick: () => u(""), children: "Clear" })
    ] }),
    b.length === 0 && /* @__PURE__ */ c.jsx("p", { className: "rem-empty", children: f.length === 0 ? "The address book is empty." : `Nobody matches “${o.trim()}”.` }),
    S.map(([v, p]) => /* @__PURE__ */ c.jsxs("section", { className: "contacts-group", children: [
      /* @__PURE__ */ c.jsx("h4", { className: "contacts-letter", children: v }),
      /* @__PURE__ */ c.jsx("ul", { className: "contacts-list", children: p.map((N) => {
        const T = N.phones[0] ?? N.emails[0] ?? "";
        return /* @__PURE__ */ c.jsxs("li", { className: "contacts-row", children: [
          /* @__PURE__ */ c.jsx(Rd, { name: N.name }),
          /* @__PURE__ */ c.jsxs("span", { className: "contacts-text", children: [
            /* @__PURE__ */ c.jsx("b", { children: N.name || /* @__PURE__ */ c.jsxs("span", { className: "contacts-unnamed", children: [
              /* @__PURE__ */ c.jsx(eS, {}),
              " No name"
            ] }) }),
            (N.org || T) && /* @__PURE__ */ c.jsxs("small", { children: [
              N.org,
              N.org && T ? " · " : "",
              T
            ] })
          ] }),
          N.birthday && /* @__PURE__ */ c.jsxs("small", { className: "contacts-meta", title: `Birthday ${N.birthday}`, children: [
            /* @__PURE__ */ c.jsx(B0, {}),
            y1[Number(N.birthday.slice(-5, -3)) - 1],
            " ",
            Number(N.birthday.slice(-2))
          ] })
        ] }, N.id);
      }) })
    ] }, v)),
    f.length >= 500 && m === "" && /* @__PURE__ */ c.jsx("p", { className: "field-hint contacts-foot", children: "Showing the first 500 by name. Search to find anyone else." })
  ] });
}
const WE = (a) => {
  if (!a) return "";
  const s = Math.max(0, Math.round((Date.now() - new Date(a).getTime()) / 6e4));
  if (s < 1) return "just now";
  if (s < 60) return `${s} min ago`;
  if (s < 2160) return `${Math.round(s / 60)} h ago`;
  if (s < 1440 * 14) return `${Math.round(s / 1440)} d ago`;
  const o = new Date(a);
  return o.getFullYear() === (/* @__PURE__ */ new Date()).getFullYear() ? o.toLocaleDateString(void 0, { month: "short", day: "numeric" }) : o.toLocaleDateString(void 0, { year: "numeric", month: "short", day: "numeric" });
};
function eT({ data: a, placeholder: s, busy: o, act: u }) {
  const [f, d] = x.useState(""), [m, g] = x.useState(""), b = a?.folders ?? [], S = a?.notes ?? [], v = m.trim().toLowerCase(), p = S.filter((E) => (f === "" || E.folder === f) && (v === "" || E.title.toLowerCase().includes(v) || E.preview.toLowerCase().includes(v))), N = [{ name: "", label: "All", count: S.length }, ...b.map((E) => ({ name: E.name, label: E.name, count: E.count }))], T = s && S.length === 0;
  return /* @__PURE__ */ c.jsxs("div", { className: `notes${s ? " placeholder" : ""}`, children: [
    /* @__PURE__ */ c.jsxs("div", { className: "notes-search", children: [
      /* @__PURE__ */ c.jsx(wc, {}),
      /* @__PURE__ */ c.jsx("input", { className: "input", value: m, placeholder: "Search notes…", disabled: T, onChange: (E) => g(E.target.value) }),
      m !== "" && /* @__PURE__ */ c.jsx("button", { type: "button", className: "icon-button small notes-clear", title: "Clear", onClick: () => g(""), children: /* @__PURE__ */ c.jsx(Sl, {}) })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: "notes-chips", children: T ? [96, 72, 84].map((E, L) => /* @__PURE__ */ c.jsx("span", { className: "notes-chip skeleton", style: { width: E } }, L)) : N.map((E) => /* @__PURE__ */ c.jsxs("button", { type: "button", className: `notes-chip${f === E.name ? " active" : ""}`, onClick: () => d(E.name), children: [
      E.name === "" ? /* @__PURE__ */ c.jsx(av, {}) : /* @__PURE__ */ c.jsx(q0, {}),
      /* @__PURE__ */ c.jsx("span", { className: "notes-chip-name", children: E.label }),
      /* @__PURE__ */ c.jsx("small", { children: E.count })
    ] }, E.name)) }),
    T ? /* @__PURE__ */ c.jsx("ul", { className: "notes-list", children: [0, 1, 2, 3].map((E) => /* @__PURE__ */ c.jsxs("li", { className: "notes-card skeleton", children: [
      /* @__PURE__ */ c.jsx("span", { className: "notes-line w60" }),
      /* @__PURE__ */ c.jsx("span", { className: "notes-line w90" }),
      /* @__PURE__ */ c.jsx("span", { className: "notes-line w40" })
    ] }, E)) }) : p.length === 0 ? /* @__PURE__ */ c.jsx("p", { className: "rem-empty", children: S.length === 0 ? "No notes yet." : v ? `Nothing matches "${m}".` : "This folder is empty." }) : /* @__PURE__ */ c.jsx("ul", { className: "notes-list", children: p.map((E) => /* @__PURE__ */ c.jsxs("li", { className: "notes-card", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "notes-card-head", children: [
        /* @__PURE__ */ c.jsxs("b", { className: "notes-title", children: [
          E.locked && /* @__PURE__ */ c.jsx(nv, { className: "notes-lock" }),
          E.title || "Untitled"
        ] }),
        /* @__PURE__ */ c.jsx("small", { className: "notes-time", children: WE(E.modified) })
      ] }),
      E.preview ? /* @__PURE__ */ c.jsx("p", { className: "notes-preview", children: E.preview }) : /* @__PURE__ */ c.jsx("p", { className: "notes-preview muted", children: E.locked ? "Locked note" : "No preview" }),
      f === "" && E.folder && /* @__PURE__ */ c.jsxs("span", { className: "notes-folder", children: [
        /* @__PURE__ */ c.jsx(q0, {}),
        E.folder
      ] })
    ] }, E.id)) }),
    !T && S.length > 0 && /* @__PURE__ */ c.jsxs("p", { className: "field-hint notes-foot", children: [
      p.length === S.length ? `${S.length} most recent notes` : `${p.length} of ${S.length} recent notes`,
      v === "" ? "" : " · search the rest through the character"
    ] })
  ] });
}
const tT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], nT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], th = (a) => String(a).padStart(2, "0"), lT = (a) => `${Math.floor(a / 60)}:${th(Math.round(a % 60))}`, nh = (a) => `${tT[(/* @__PURE__ */ new Date(`${a}T12:00:00`)).getDay()]}, ${nT[Number(a.slice(5, 7)) - 1]} ${Number(a.slice(8))}`, aT = (a) => a.slice(11, 16), lh = /* @__PURE__ */ new Map(), ky = /* @__PURE__ */ new Set();
function iT({ item: a, dim: s }) {
  const [o, u] = x.useState(lh.get(a.id)), f = x.useRef(null);
  x.useEffect(() => {
    if (o || s || ky.has(a.id) || !f.current) return;
    const m = f.current;
    let g = !1;
    const b = () => {
      sT(a.id).then((v) => {
        g || (v ? u(v) : ky.add(a.id));
      });
    };
    if (typeof IntersectionObserver > "u") {
      b();
      return;
    }
    const S = new IntersectionObserver((v) => {
      v.some((p) => p.isIntersecting) && (S.disconnect(), b());
    }, { rootMargin: "200px" });
    return S.observe(m), () => {
      g = !0, S.disconnect();
    };
  }, [a.id, o, s]);
  const d = a.at ? `${nh(a.at.slice(0, 10))} ${aT(a.at)}` : "";
  return /* @__PURE__ */ c.jsxs("div", { ref: f, className: `photos-tile${o ? " loaded" : ""}`, title: `${d}${a.w ? ` · ${a.w}×${a.h}` : ""}${a.hasLocation ? " · located" : ""}`, children: [
    o ? /* @__PURE__ */ c.jsx("img", { src: o, alt: "", loading: "lazy", draggable: !1 }) : /* @__PURE__ */ c.jsx("span", { className: "photos-tile-blank", children: /* @__PURE__ */ c.jsx(Tc, {}) }),
    a.type === "video" && /* @__PURE__ */ c.jsxs("span", { className: "photos-video", children: [
      /* @__PURE__ */ c.jsx(Ld, {}),
      a.duration ? lT(a.duration) : ""
    ] }),
    a.fav && /* @__PURE__ */ c.jsx("span", { className: "photos-fav", children: /* @__PURE__ */ c.jsx(tv, {}) })
  ] });
}
async function sT(a) {
  const s = lh.get(a);
  if (s) return s;
  try {
    const o = await $n("/sources/photos/thumb", { id: a });
    return o.dataUrl && lh.set(a, o.dataUrl), o.dataUrl;
  } catch {
    return;
  }
}
function cT({ data: a, placeholder: s, busy: o }) {
  const u = a?.days ?? Array.from({ length: 30 }, (v, p) => {
    const N = /* @__PURE__ */ new Date();
    return N.setDate(N.getDate() - (29 - p)), { day: `${N.getFullYear()}-${th(N.getMonth() + 1)}-${th(N.getDate())}`, count: 0 };
  }), f = a?.recent ?? [], d = a?.albums ?? [], m = Math.max(1, ...u.map((v) => v.count)), g = u.reduce((v, p) => v + p.count, 0), b = s || !a, S = b && f.length === 0 ? Array.from({ length: 10 }, (v, p) => ({ id: `blank-${p}`, at: null, type: "image", w: 0, h: 0, fav: !1, hasLocation: !1 })) : f;
  return /* @__PURE__ */ c.jsxs("div", { className: `photos${b ? " placeholder" : ""}`, children: [
    /* @__PURE__ */ c.jsxs("section", { className: "photos-strip", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "photos-strip-head", children: [
        /* @__PURE__ */ c.jsx("h3", { className: "section", children: "Photos per day" }),
        /* @__PURE__ */ c.jsx("small", { children: b ? "" : `${g} in 30 days` })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: "photos-bars", children: u.map((v) => /* @__PURE__ */ c.jsx("div", { className: "photos-bar-col", title: `${nh(v.day)}: ${v.count} photo${v.count === 1 ? "" : "s"}`, children: /* @__PURE__ */ c.jsx("div", { className: `photos-bar${v.count === 0 ? " none" : ""}`, style: { height: `${v.count === 0 ? 3 : Math.max(6, v.count / m * 100)}%` } }) }, v.day)) }),
      /* @__PURE__ */ c.jsxs("div", { className: "photos-bar-axis", children: [
        /* @__PURE__ */ c.jsx("small", { children: nh(u[0].day) }),
        /* @__PURE__ */ c.jsx("small", { children: "Today" })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { children: [
      /* @__PURE__ */ c.jsxs("h3", { className: "section", children: [
        "Recent ",
        !b && f.length > 0 && /* @__PURE__ */ c.jsx("span", { className: "badge", children: f.length })
      ] }),
      S.length === 0 ? /* @__PURE__ */ c.jsx("p", { className: "rem-empty", children: o === "refresh" ? "Loading…" : "No photos in the last 30 days." }) : /* @__PURE__ */ c.jsx("div", { className: "photos-grid", children: S.map((v) => /* @__PURE__ */ c.jsx(iT, { item: v, dim: b }, v.id)) })
    ] }),
    (d.length > 0 || b) && /* @__PURE__ */ c.jsxs("section", { children: [
      /* @__PURE__ */ c.jsx("h3", { className: "section", children: "Albums" }),
      /* @__PURE__ */ c.jsx("div", { className: "photos-albums", children: (b && d.length === 0 ? [{ title: "", count: 0 }, { title: "", count: 0 }, { title: "", count: 0 }] : d).map((v, p) => /* @__PURE__ */ c.jsxs("div", { className: "photos-album", children: [
        /* @__PURE__ */ c.jsx("span", { className: "photos-album-icon", children: v.title === "Favorites" ? /* @__PURE__ */ c.jsx(tv, {}) : /* @__PURE__ */ c.jsx(R2, {}) }),
        /* @__PURE__ */ c.jsxs("span", { className: "photos-album-text", children: [
          /* @__PURE__ */ c.jsx("b", { children: v.title || " " }),
          /* @__PURE__ */ c.jsx("small", { children: v.title ? `${v.count} item${v.count === 1 ? "" : "s"}` : " " })
        ] })
      ] }, `${v.title}-${p}`)) })
    ] }),
    b && /* @__PURE__ */ c.jsx("p", { className: "field-hint", style: { marginTop: 12 }, children: "Thumbnails and a 30-day activity strip appear here once Photos access is granted." })
  ] });
}
const rT = /[぀-ヿ㐀-鿿가-힯]/;
function uT(a) {
  const s = a.trim();
  return !s || /^[+\d(]/.test(s) ? "#" : rT.test(s[0]) ? s[0] : s.split(/\s+/).filter(Boolean).slice(0, 2).map((u) => u[0].toUpperCase()).join("");
}
function oT(a) {
  let s = 0;
  for (let o = 0; o < a.length; o++) s = (s * 31 + a.charCodeAt(o)) % 360;
  return s;
}
function fT(a) {
  const s = Math.max(0, Math.round((Date.now() - new Date(a).getTime()) / 6e4));
  return s < 1 ? "now" : s < 60 ? `${s} min` : s < 2160 ? `${Math.round(s / 60)} h` : s < 1440 * 14 ? `${Math.round(s / 1440)} d` : a.slice(0, 10);
}
function Ay({ t: a, awaiting: s }) {
  const o = a.participants.length > 1;
  return /* @__PURE__ */ c.jsxs("li", { className: `messages-row${s ? " awaiting" : ""}`, children: [
    /* @__PURE__ */ c.jsx("span", { className: "messages-avatar", style: { "--h": oT(a.name) }, children: o ? /* @__PURE__ */ c.jsx(cv, {}) : uT(a.name) }),
    /* @__PURE__ */ c.jsxs("span", { className: "messages-text", children: [
      /* @__PURE__ */ c.jsxs("b", { children: [
        a.name,
        o && /* @__PURE__ */ c.jsx("small", { className: "messages-count", children: a.participants.length })
      ] }),
      /* @__PURE__ */ c.jsx("small", { className: "messages-snippet", children: a.snippet ? `${a.lastFromMe ? "You: " : ""}${a.snippet}` : a.count > 0 ? `${a.count} message${a.count === 1 ? "" : "s"}` : "" })
    ] }),
    /* @__PURE__ */ c.jsx("small", { className: "messages-meta", children: fT(a.last) })
  ] });
}
function dT({ data: a, placeholder: s }) {
  const o = a?.threads ?? [], u = o.filter((m) => m.awaiting), f = o.filter((m) => !m.awaiting), d = a?.shared ?? !1;
  return /* @__PURE__ */ c.jsxs("div", { className: `messages${s ? " placeholder" : ""}`, children: [
    /* @__PURE__ */ c.jsxs("p", { className: `messages-note${d ? " on" : ""}`, children: [
      d ? /* @__PURE__ */ c.jsx(T2, {}) : /* @__PURE__ */ c.jsx(E2, {}),
      /* @__PURE__ */ c.jsx("span", { children: d ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        "She sees ",
        /* @__PURE__ */ c.jsx("b", { children: "counts and names" }),
        " of who is waiting, never a message."
      ] }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsx("b", { children: "Hidden from the character." }),
        " Turn on sharing to let her see who is waiting."
      ] }) })
    ] }),
    s && /* @__PURE__ */ c.jsx("ul", { className: "messages-list messages-skeleton", "aria-hidden": !0, children: [0, 1, 2, 3].map((m) => /* @__PURE__ */ c.jsxs("li", { className: "messages-row", children: [
      /* @__PURE__ */ c.jsx("span", { className: "messages-avatar" }),
      /* @__PURE__ */ c.jsxs("span", { className: "messages-text", children: [
        /* @__PURE__ */ c.jsx("b", {}),
        /* @__PURE__ */ c.jsx("small", {})
      ] }),
      /* @__PURE__ */ c.jsx("small", { className: "messages-meta" })
    ] }, m)) }),
    !s && o.length === 0 && /* @__PURE__ */ c.jsxs("p", { className: "rem-empty", children: [
      "No conversations in the last ",
      a?.window ?? 7,
      " days."
    ] }),
    u.length > 0 && /* @__PURE__ */ c.jsxs("section", { className: "messages-group", children: [
      /* @__PURE__ */ c.jsxs("h3", { className: "section", children: [
        "Awaiting your reply ",
        /* @__PURE__ */ c.jsx("span", { className: "badge", children: u.length })
      ] }),
      /* @__PURE__ */ c.jsx("ul", { className: "messages-list", children: u.map((m) => /* @__PURE__ */ c.jsx(Ay, { t: m, awaiting: !0 }, m.id)) })
    ] }),
    f.length > 0 && /* @__PURE__ */ c.jsxs("section", { className: "messages-group", children: [
      /* @__PURE__ */ c.jsxs("h3", { className: "section", children: [
        "Recent ",
        /* @__PURE__ */ c.jsx("span", { className: "badge", children: f.length })
      ] }),
      /* @__PURE__ */ c.jsx("ul", { className: "messages-list", children: f.map((m) => /* @__PURE__ */ c.jsx(Ay, { t: m, awaiting: !1 }, m.id)) })
    ] })
  ] });
}
const hT = (a) => Math.max(0, Math.round((Date.now() - Date.parse(a)) / 6e4)), _y = (a) => {
  const s = hT(a);
  return s < 1 ? "just now" : s < 60 ? `${s} min ago` : s < 2160 ? `${Math.round(s / 60)} h ago` : `${Math.round(s / 1440)} d ago`;
}, mT = (a) => a < 1 ? `${Math.round(a * 1e3)} m` : a < 10 ? `${a.toFixed(1)} km` : `${Math.round(a)} km`, Cy = (a, s) => a?.subLocality || a?.name || a?.locality || `${s.lat.toFixed(4)}, ${s.lon.toFixed(4)}`, pT = (a) => a ? [a.locality || a.name, a.administrativeArea && a.administrativeArea !== a.locality ? a.administrativeArea : "", a.country].filter(Boolean).join(", ") : "";
function gT({ accuracy: a, pinned: s, idle: o }) {
  const u = Math.max(100, a * 1.4), f = a > 0 ? Math.max(6, a / u * 54) : 0, d = u >= 1e3 ? `${(u / 1e3).toFixed(u >= 1e4 ? 0 : 1)} km` : `${Math.round(u)} m`;
  return /* @__PURE__ */ c.jsxs("svg", { className: `loc-radar${o ? " idle" : ""}`, viewBox: "0 0 120 120", "aria-hidden": "true", children: [
    /* @__PURE__ */ c.jsx("circle", { className: "loc-ring", cx: "60", cy: "60", r: "54" }),
    /* @__PURE__ */ c.jsx("circle", { className: "loc-ring", cx: "60", cy: "60", r: "36" }),
    /* @__PURE__ */ c.jsx("circle", { className: "loc-ring", cx: "60", cy: "60", r: "18" }),
    /* @__PURE__ */ c.jsx("line", { className: "loc-ring", x1: "60", y1: "4", x2: "60", y2: "116" }),
    /* @__PURE__ */ c.jsx("line", { className: "loc-ring", x1: "4", y1: "60", x2: "116", y2: "60" }),
    !o && /* @__PURE__ */ c.jsx("circle", { className: "loc-sweep", cx: "60", cy: "60", r: "54" }),
    f > 0 && /* @__PURE__ */ c.jsx("circle", { className: "loc-acc", cx: "60", cy: "60", r: f }),
    !o && /* @__PURE__ */ c.jsx("circle", { className: "loc-pulse", cx: "60", cy: "60", r: "5" }),
    /* @__PURE__ */ c.jsx("circle", { className: `loc-dot${s ? " pinned" : ""}`, cx: "60", cy: "60", r: o ? 3 : 5 }),
    !o && !s && /* @__PURE__ */ c.jsx("text", { className: "loc-scale", x: "114", y: "114", textAnchor: "end", children: d })
  ] });
}
function yT({ data: a, placeholder: s, busy: o, act: u }) {
  const [f, d] = x.useState(""), m = async () => {
    const T = f.trim();
    T && await u("location", { json: { value: T } }) && d("");
  }, g = a?.current, b = !g, S = g?.place ?? null, v = S?.timeZone && a && S.timeZone !== a.systemTimeZone ? S.timeZone : "", p = a?.distanceFromHomeKm !== void 0 && a.distanceFromHomeKm <= 0.5, N = a?.history ?? [];
  return /* @__PURE__ */ c.jsxs("div", { className: `loc${s || b ? " placeholder" : ""}`, children: [
    /* @__PURE__ */ c.jsxs("div", { className: "loc-hero", children: [
      /* @__PURE__ */ c.jsx(gT, { accuracy: g?.accuracy ?? 0, pinned: g?.source === "manual", idle: b }),
      /* @__PURE__ */ c.jsxs("div", { className: "loc-where", children: [
        /* @__PURE__ */ c.jsx("div", { className: "loc-name", children: g ? Cy(S, g) : "—" }),
        /* @__PURE__ */ c.jsx("div", { className: "loc-line", children: g ? pT(S) || "Somewhere on the map" : s ? "Waiting for a location fix" : "" }),
        /* @__PURE__ */ c.jsxs("div", { className: "loc-meta", children: [
          g && /* @__PURE__ */ c.jsxs("span", { children: [
            /* @__PURE__ */ c.jsx(z2, {}),
            " ",
            g.source === "manual" ? "Pinned by name" : `Updated ${_y(g.at)}`,
            g.accuracy > 0 ? ` · ±${Math.round(g.accuracy)} m` : ""
          ] }),
          g && a?.home && /* @__PURE__ */ c.jsxs("span", { className: p ? "on" : "", children: [
            /* @__PURE__ */ c.jsx(ju, {}),
            " ",
            p ? "At home" : `${mT(a.distanceFromHomeKm ?? 0)} from ${a.home.name}`
          ] }),
          v && /* @__PURE__ */ c.jsxs("span", { children: [
            /* @__PURE__ */ c.jsx(_2, {}),
            " ",
            v
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "loc-actions", children: [
      /* @__PURE__ */ c.jsxs("button", { type: "button", className: "button", disabled: o !== "" || b, onClick: () => {
        u("setHome");
      }, children: [
        /* @__PURE__ */ c.jsx(ju, {}),
        " ",
        o === "setHome" ? "Saving…" : a?.home ? "Update home" : "Set as home"
      ] }),
      a?.manual && /* @__PURE__ */ c.jsxs("button", { type: "button", className: "text-button", disabled: o !== "", onClick: () => {
        u("location", { json: { value: "auto" } });
      }, children: [
        /* @__PURE__ */ c.jsx(B2, {}),
        " Use this Mac's location"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("h3", { className: "section", children: "Recent places" }),
    N.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: "loc-chips", children: b ? [0, 1, 2].map((T) => /* @__PURE__ */ c.jsx("span", { className: "loc-chip ghost" }, T)) : /* @__PURE__ */ c.jsxs("span", { className: "loc-chip current", children: [
      /* @__PURE__ */ c.jsx(Dd, {}),
      " ",
      g ? Cy(S, g) : ""
    ] }) }) : /* @__PURE__ */ c.jsx("div", { className: "loc-chips", children: N.slice(0, 10).map((T, E) => /* @__PURE__ */ c.jsxs("span", { className: `loc-chip${E === 0 ? " current" : ""}${a?.home && Math.abs(T.lat - a.home.lat) < 6e-3 && Math.abs(T.lon - a.home.lon) < 6e-3 ? " home" : ""}`, title: `${T.lat.toFixed(3)}, ${T.lon.toFixed(3)} · first ${T.first.slice(0, 16).replace("T", " ")}`, children: [
      E === 0 ? /* @__PURE__ */ c.jsx(Dd, {}) : /* @__PURE__ */ c.jsx(ju, {}),
      T.name,
      /* @__PURE__ */ c.jsxs("small", { children: [
        E === 0 ? "now" : _y(T.last),
        T.visits > 1 ? ` · ${T.visits}×` : ""
      ] })
    ] }, `${T.lat},${T.lon}`)) }),
    /* @__PURE__ */ c.jsx("h3", { className: "section", children: "Use a different place" }),
    /* @__PURE__ */ c.jsxs("div", { className: "loc-pin", children: [
      /* @__PURE__ */ c.jsx("input", { className: "input", value: f, placeholder: "City or place name, e.g. Tokyo", disabled: o !== "", onChange: (T) => d(T.target.value), onKeyDown: (T) => {
        T.key === "Enter" && !T.nativeEvent.isComposing && (T.preventDefault(), m());
      } }),
      /* @__PURE__ */ c.jsx("button", { type: "button", className: "button primary", disabled: o !== "" || f.trim() === "", onClick: () => {
        m();
      }, children: o === "location" ? "Pinning…" : "Pin" })
    ] }),
    /* @__PURE__ */ c.jsx("p", { className: "field-hint", children: `Pins the place instead of asking this Mac; no permission needed. "Use this Mac's location" goes back.` })
  ] });
}
const Oy = /* @__PURE__ */ new Set(["light", "switch", "fan", "input_boolean", "media_player", "humidifier"]), vT = /* @__PURE__ */ new Set(["scene", "script"]), bT = (a) => a.replace(/^get\s+/i, ""), Ry = (a) => {
  const s = Math.round((Date.now() - Date.parse(a)) / 6e4);
  return Number.isFinite(s) ? s < 1 ? "just now" : s < 60 ? `${s} min ago` : s < 2160 ? `${Math.round(s / 60)} h ago` : `${Math.round(s / 1440)} d ago` : "";
}, xT = (a) => {
  if (a.startsWith("{"))
    try {
      const s = JSON.parse(a);
      if (!s || typeof s != "object" || Array.isArray(s)) return;
      const o = Object.entries(s).filter(([, u]) => u === null || ["string", "number", "boolean"].includes(typeof u));
      return o.length > 0 && o.length <= 12 ? Object.fromEntries(o.map(([u, f]) => [u, f === null ? "—" : String(f)])) : void 0;
    } catch {
      return;
    }
};
function My({ domain: a }) {
  const s = a === "light" ? D2 : a === "switch" || a === "input_boolean" ? V2 : a === "fan" ? w2 : a === "climate" ? P2 : a === "lock" ? nv : a === "binary_sensor" ? o2 : a === "sensor" ? ch : a === "scene" || a === "script" ? uh : W2;
  return /* @__PURE__ */ c.jsx(s, {});
}
function ST({ r: a }) {
  const s = a.error && !a.output ? void 0 : xT(a.output), o = !!s || a.output.length > 60;
  return /* @__PURE__ */ c.jsxs("div", { className: `home-reading${o ? " wide" : ""}${a.error && !a.output ? " failed" : ""}`, title: a.error ? a.error : void 0, children: [
    /* @__PURE__ */ c.jsxs("small", { children: [
      a.error ? /* @__PURE__ */ c.jsx(sv, {}) : /* @__PURE__ */ c.jsx(ch, {}),
      bT(a.name)
    ] }),
    s ? /* @__PURE__ */ c.jsx("dl", { children: Object.entries(s).map(([u, f]) => /* @__PURE__ */ c.jsxs(Yl.Fragment, { children: [
      /* @__PURE__ */ c.jsx("dt", { children: u }),
      /* @__PURE__ */ c.jsx("dd", { children: f })
    ] }, u)) }) : a.error && !a.output ? /* @__PURE__ */ c.jsx("b", { children: a.error }) : /* @__PURE__ */ c.jsx("b", { className: a.output ? "" : "empty", children: a.output || "No output" }),
    /* @__PURE__ */ c.jsx("time", { dateTime: a.at, children: a.error && a.output ? `Last good value · ${Ry(a.at)}` : `Updated ${Ry(a.at)}` })
  ] });
}
function NT({ data: a, placeholder: s, busy: o, act: u }) {
  const [f, d] = Yl.useState(""), [m, g] = Yl.useState(""), [b, S] = Yl.useState({}), v = async (U) => {
    if (f) return;
    d(U), g("");
    const F = await u("run", { json: { value: U } });
    d(""), F && (g(U), window.setTimeout(() => g((Z) => Z === U ? "" : Z), 2500));
  }, p = async (U, F) => {
    S((B) => ({ ...B, [U.id]: F })), await u("run", { json: { value: `${U.id} ${F ? "on" : "off"}` } }) ? window.setTimeout(() => S((B) => {
      const G = { ...B };
      return delete G[U.id], G;
    }), 4e3) : S((B) => {
      const G = { ...B };
      return delete G[U.id], G;
    });
  }, N = a?.readers ?? [], T = a?.actions ?? [], E = a?.entities ?? [], L = E.filter((U) => Oy.has(U.domain) || U.domain === "climate" || U.domain === "cover" || U.domain === "lock"), k = E.filter((U) => U.domain === "sensor" || U.domain === "binary_sensor"), V = E.filter((U) => vT.has(U.domain)), X = !s && N.length + T.length + E.length === 0;
  return s || !a ? /* @__PURE__ */ c.jsxs("div", { className: "home placeholder", "aria-hidden": !0, children: [
    /* @__PURE__ */ c.jsxs("section", { className: "home-group", children: [
      /* @__PURE__ */ c.jsx("h3", { className: "section", children: "Readings" }),
      /* @__PURE__ */ c.jsx("div", { className: "home-readings", children: [0, 1].map((U) => /* @__PURE__ */ c.jsxs("div", { className: "home-reading", children: [
        /* @__PURE__ */ c.jsxs("small", { children: [
          /* @__PURE__ */ c.jsx(ch, {}),
          " "
        ] }),
        /* @__PURE__ */ c.jsx("b", { className: "empty", children: "—" }),
        /* @__PURE__ */ c.jsx("time", { children: " " })
      ] }, U)) })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { className: "home-group", children: [
      /* @__PURE__ */ c.jsx("h3", { className: "section", children: "Actions" }),
      /* @__PURE__ */ c.jsx("div", { className: "home-tiles", children: [0, 1, 2].map((U) => /* @__PURE__ */ c.jsxs("div", { className: "home-tile skeleton", children: [
        /* @__PURE__ */ c.jsx("span", { className: "home-tile-icon", children: /* @__PURE__ */ c.jsx(Ld, {}) }),
        /* @__PURE__ */ c.jsx("span", {})
      ] }, U)) })
    ] })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: "home", children: [
    X && /* @__PURE__ */ c.jsxs("p", { className: "home-empty", children: [
      "Nothing in the Shortcuts folder",
      a.folder ? ` "${a.folder}"` : "",
      " yet.",
      /* @__PURE__ */ c.jsx("br", {}),
      /* @__PURE__ */ c.jsx("span", { className: "field-hint home-hint", children: 'Add "Get …" shortcuts for readings and any others as actions, then refresh.' })
    ] }),
    (N.length > 0 || k.length > 0) && /* @__PURE__ */ c.jsxs("section", { className: "home-group", children: [
      /* @__PURE__ */ c.jsxs("h3", { className: "section", children: [
        "Readings ",
        /* @__PURE__ */ c.jsx("span", { className: "badge", children: N.length + k.length })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "home-readings", children: [
        N.map((U) => /* @__PURE__ */ c.jsx(ST, { r: U }, U.name)),
        k.map((U) => /* @__PURE__ */ c.jsxs("div", { className: "home-reading", title: U.id, children: [
          /* @__PURE__ */ c.jsxs("small", { children: [
            /* @__PURE__ */ c.jsx(My, { domain: U.domain }),
            U.name
          ] }),
          /* @__PURE__ */ c.jsxs("b", { children: [
            U.state,
            U.unit ? /* @__PURE__ */ c.jsx("span", { style: { fontSize: 13, fontWeight: 500, color: "var(--muted-fg)", marginLeft: 3 }, children: U.unit }) : null
          ] })
        ] }, U.id))
      ] })
    ] }),
    L.length > 0 && /* @__PURE__ */ c.jsxs("section", { className: "home-group", children: [
      /* @__PURE__ */ c.jsxs("h3", { className: "section", children: [
        "Devices ",
        /* @__PURE__ */ c.jsx("span", { className: "badge", children: L.length })
      ] }),
      /* @__PURE__ */ c.jsx("ul", { className: "home-devices", children: L.map((U) => {
        const F = U.id in b ? b[U.id] : U.state === "on", Z = Oy.has(U.domain);
        return /* @__PURE__ */ c.jsxs("li", { className: "home-device", title: U.id, children: [
          /* @__PURE__ */ c.jsx("span", { className: `home-device-icon${F && Z ? " on" : ""}`, children: /* @__PURE__ */ c.jsx(My, { domain: U.domain }) }),
          /* @__PURE__ */ c.jsxs("span", { className: "home-device-text", children: [
            /* @__PURE__ */ c.jsx("b", { children: U.name }),
            /* @__PURE__ */ c.jsx("small", { children: U.id })
          ] }),
          Z ? /* @__PURE__ */ c.jsx("input", { type: "checkbox", className: "switch", checked: !!F, disabled: o !== "" || f !== "", onChange: (B) => {
            p(U, B.target.checked);
          } }) : /* @__PURE__ */ c.jsxs("span", { className: "home-device-state", children: [
            U.state,
            U.unit ? ` ${U.unit}` : ""
          ] })
        ] }, U.id);
      }) })
    ] }),
    (T.length > 0 || V.length > 0) && /* @__PURE__ */ c.jsxs("section", { className: "home-group", children: [
      /* @__PURE__ */ c.jsxs("h3", { className: "section", children: [
        "Actions ",
        /* @__PURE__ */ c.jsx("span", { className: "badge", children: T.length + V.length })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "home-tiles", children: [
        T.map((U) => {
          const F = f === U.name || !!U.running;
          return /* @__PURE__ */ c.jsxs("button", { type: "button", className: `home-tile${F ? " running" : ""}${m === U.name ? " done" : ""}`, disabled: o !== "" && !F || f !== "", onClick: () => {
            v(U.name);
          }, title: `Run "${U.name}"`, children: [
            /* @__PURE__ */ c.jsx("span", { className: "home-tile-icon", children: F ? /* @__PURE__ */ c.jsx($0, {}) : /* @__PURE__ */ c.jsx(Ld, {}) }),
            /* @__PURE__ */ c.jsx("span", { children: U.name }),
            m === U.name && /* @__PURE__ */ c.jsx("span", { className: "home-tile-feedback", children: "Ran" })
          ] }, U.name);
        }),
        V.map((U) => /* @__PURE__ */ c.jsxs("button", { type: "button", className: `home-tile${f === U.id ? " running" : ""}${m === U.id ? " done" : ""}`, disabled: o !== "" || f !== "", onClick: () => {
          v(U.id);
        }, title: U.id, children: [
          /* @__PURE__ */ c.jsx("span", { className: "home-tile-icon", children: f === U.id ? /* @__PURE__ */ c.jsx($0, {}) : /* @__PURE__ */ c.jsx(uh, {}) }),
          /* @__PURE__ */ c.jsx("span", { children: U.name }),
          m === U.id && /* @__PURE__ */ c.jsx("span", { className: "home-tile-feedback", children: "Ran" })
        ] }, U.id))
      ] })
    ] })
  ] });
}
function jT({ data: a, placeholder: s, busy: o, act: u }) {
  const [f, d] = Yl.useState(""), [m, g] = Yl.useState("all"), [b, S] = Yl.useState(""), v = a?.books ?? [], p = a?.connected ?? !1, N = v.find((k) => k.id === f), T = async () => {
    const k = b.trim();
    k && await u("cookie", { json: { value: k } }) && S("");
  };
  if (!p || a?.expired)
    return /* @__PURE__ */ c.jsxs("div", { className: `weread${s ? " placeholder" : ""}`, children: [
      /* @__PURE__ */ c.jsxs("div", { className: "weread-connect", children: [
        /* @__PURE__ */ c.jsx("div", { className: "weread-connect-icon", children: /* @__PURE__ */ c.jsx(M2, {}) }),
        /* @__PURE__ */ c.jsx("b", { children: a?.expired ? "WeRead logged you out" : "Connect WeRead" }),
        /* @__PURE__ */ c.jsx("p", { className: "field-hint", children: "Log in at weread.qq.com in a browser, copy the Cookie header from DevTools (Network → any request → Request Headers) and paste it here. It is stored locally and never shown again." }),
        /* @__PURE__ */ c.jsxs("div", { className: "weread-cookie", children: [
          /* @__PURE__ */ c.jsx("input", { className: "input", type: "password", value: b, placeholder: "wr_vid=…; wr_skey=…", autoComplete: "off", spellCheck: !1, disabled: o !== "", onChange: (k) => S(k.target.value), onKeyDown: (k) => {
            k.key === "Enter" && !k.nativeEvent.isComposing && (k.preventDefault(), T());
          } }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "button primary", disabled: o !== "" || b.trim() === "", onClick: () => {
            T();
          }, children: o === "cookie" ? "Connecting…" : "Connect" })
        ] })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: "weread-grid", children: Array.from({ length: 5 }, (k, V) => /* @__PURE__ */ c.jsxs("div", { className: "weread-book ghost", children: [
        /* @__PURE__ */ c.jsx("div", { className: "weread-cover" }),
        /* @__PURE__ */ c.jsx("span", { className: "weread-title" })
      ] }, V)) })
    ] });
  if (N) {
    const k = a?.highlights[N.id], V = k?.chapters.reduce((U, F) => U + F.marks.length, 0) ?? 0, X = k?.chapters.reduce((U, F) => U + F.notes.length, 0) ?? 0;
    return /* @__PURE__ */ c.jsxs("div", { className: "weread", children: [
      /* @__PURE__ */ c.jsxs("button", { type: "button", className: "text-button back", onClick: () => d(""), children: [
        /* @__PURE__ */ c.jsx(Ky, {}),
        " Shelf"
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "weread-detail-head", children: [
        /* @__PURE__ */ c.jsx(Dy, { book: N }),
        /* @__PURE__ */ c.jsxs("div", { className: "weread-detail-meta", children: [
          /* @__PURE__ */ c.jsx("h3", { children: N.title }),
          /* @__PURE__ */ c.jsxs("small", { children: [
            N.author,
            N.category ? ` · ${N.category}` : ""
          ] }),
          /* @__PURE__ */ c.jsx("div", { className: "weread-detail-status", children: N.finished ? /* @__PURE__ */ c.jsx("span", { className: "badge weread-finished", children: "Finished" }) : /* @__PURE__ */ c.jsx(zy, { value: N.progress, wide: !0 }) }),
          /* @__PURE__ */ c.jsx("small", { children: k ? `${V} highlights · ${X} notes` : N.noteCount > 0 ? `${N.noteCount} notes on WeRead, not fetched yet` : "No highlights on WeRead" }),
          (N.noteCount > 0 || k) && /* @__PURE__ */ c.jsxs("button", { type: "button", className: "button", disabled: o !== "", onClick: () => {
            u("fetch", { json: { book: N.id } });
          }, children: [
            /* @__PURE__ */ c.jsx(Ud, { className: o === "fetch" ? "spinning" : "" }),
            k ? "Refetch" : "Fetch highlights"
          ] })
        ] })
      ] }),
      k && k.chapters.length > 0 ? k.chapters.map((U, F) => /* @__PURE__ */ c.jsxs("section", { className: "weread-chapter", children: [
        /* @__PURE__ */ c.jsx("h3", { className: "section", children: U.title }),
        U.marks.map((Z, B) => /* @__PURE__ */ c.jsx("blockquote", { className: "weread-quote", children: Z.text }, `m${B}`)),
        U.notes.map((Z, B) => /* @__PURE__ */ c.jsxs("div", { className: "weread-note", children: [
          /* @__PURE__ */ c.jsx(L2, {}),
          /* @__PURE__ */ c.jsx("div", { children: Z.text.split(`
`).map((G, ce) => /* @__PURE__ */ c.jsx("p", { className: G.startsWith("> ") ? "weread-note-ref" : "", children: G.replace(/^> /, "") }, ce)) })
        ] }, `n${B}`))
      ] }, F)) : /* @__PURE__ */ c.jsx("p", { className: "rem-empty", children: k ? "Nothing marked in this book." : "Highlights show up here once fetched." })
    ] });
  }
  const E = v.filter((k) => m === "all" ? !0 : m === "reading" ? !k.finished : m === "finished" ? k.finished : k.noteCount > 0), L = Object.keys(a?.highlights ?? {}).length;
  return /* @__PURE__ */ c.jsxs("div", { className: `weread${s ? " placeholder" : ""}`, children: [
    /* @__PURE__ */ c.jsxs("div", { className: "weread-bar", children: [
      /* @__PURE__ */ c.jsx("div", { className: "weread-filters", children: ["all", "reading", "finished", "notes"].map((k) => /* @__PURE__ */ c.jsx("button", { type: "button", className: `weread-filter${m === k ? " active" : ""}`, onClick: () => g(k), children: k === "all" ? `All ${v.length}` : k === "reading" ? "Reading" : k === "finished" ? "Finished" : "With notes" }, k)) }),
      /* @__PURE__ */ c.jsxs("button", { type: "button", className: "button", disabled: o !== "" || s, title: `${L} books with cached highlights`, onClick: () => {
        u("sync");
      }, children: [
        /* @__PURE__ */ c.jsx(Ud, { className: o === "sync" ? "spinning" : "" }),
        o === "sync" ? "Syncing…" : "Sync highlights"
      ] })
    ] }),
    E.length === 0 && /* @__PURE__ */ c.jsx("p", { className: "rem-empty", children: s ? "Waiting for the shelf" : "Nothing here." }),
    /* @__PURE__ */ c.jsx("div", { className: "weread-grid", children: E.map((k) => /* @__PURE__ */ c.jsxs("button", { type: "button", className: "weread-book", onClick: () => d(k.id), title: `${k.title}${k.author ? ` — ${k.author}` : ""}`, children: [
      /* @__PURE__ */ c.jsx(Dy, { book: k }),
      /* @__PURE__ */ c.jsx("span", { className: "weread-title", children: k.title }),
      k.finished ? /* @__PURE__ */ c.jsx("span", { className: "badge weread-finished", children: "Finished" }) : /* @__PURE__ */ c.jsx(zy, { value: k.progress })
    ] }, k.id)) })
  ] });
}
function Dy({ book: a }) {
  const [s, o] = Yl.useState(!1);
  return /* @__PURE__ */ c.jsxs("div", { className: "weread-cover", children: [
    a.cover && !s ? /* @__PURE__ */ c.jsx("img", { src: a.cover, alt: "", loading: "lazy", referrerPolicy: "no-referrer", onError: () => o(!0) }) : /* @__PURE__ */ c.jsx(hs, {}),
    a.noteCount > 0 && /* @__PURE__ */ c.jsx("span", { className: "weread-count", title: `${a.noteCount} notes`, children: a.noteCount })
  ] });
}
function zy({ value: a, wide: s }) {
  const o = a === void 0 ? 0 : Math.max(0, Math.min(100, a));
  return /* @__PURE__ */ c.jsxs("span", { className: `weread-progress${s ? " wide" : ""}`, title: a === void 0 ? "In progress" : `${o}%`, children: [
    /* @__PURE__ */ c.jsx("i", { style: { width: `${o}%` } }),
    s && /* @__PURE__ */ c.jsx("small", { children: a === void 0 ? "In progress" : `${o}% read` })
  ] });
}
const Ly = [{ id: "movie", label: "Movies", Icon: Wy }, { id: "book", label: "Books", Icon: hs }, { id: "music", label: "Music", Icon: Fy }], Uy = {
  movie: { wish: "Want to watch", done: "Watched" },
  book: { wish: "Want to read", done: "Read" },
  music: { wish: "Want to listen", done: "Listened" }
}, vu = 48;
function ET({ n: a }) {
  return /* @__PURE__ */ c.jsx("span", { className: "douban-stars", "aria-label": `${a} of 5`, children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ c.jsx(I2, { className: s <= a ? "" : "off" }, s)) });
}
function TT({ item: a }) {
  const [s, o] = x.useState(!1), u = a.kind === "movie" ? y2 : a.kind === "book" ? hs : Fy;
  return /* @__PURE__ */ c.jsx("div", { className: `douban-cover${a.kind === "music" ? " music" : ""}`, children: a.cover && !s ? /* @__PURE__ */ c.jsx("img", { src: a.cover, alt: "", loading: "lazy", referrerPolicy: "no-referrer", onError: () => o(!0) }) : /* @__PURE__ */ c.jsx("span", { className: "douban-blank", children: /* @__PURE__ */ c.jsx(u, {}) }) });
}
function wT({ data: a, placeholder: s }) {
  const [o, u] = x.useState("movie"), [f, d] = x.useState("wish"), [m, g] = x.useState(""), [b, S] = x.useState(vu), v = x.useMemo(() => {
    const T = m.trim().toLowerCase(), E = T ? T.split(/\s+/) : [];
    return (a?.items ?? []).filter((L) => L.kind === o && L.status === f && (E.length === 0 || E.every((k) => L.title.toLowerCase().includes(k) || (L.comment ?? "").toLowerCase().includes(k))));
  }, [a, o, f, m]);
  if (s || !a)
    return /* @__PURE__ */ c.jsxs("div", { className: "douban placeholder", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "douban-bar", children: [
        /* @__PURE__ */ c.jsx("div", { className: "douban-tabs", children: Ly.map((T) => /* @__PURE__ */ c.jsxs("span", { className: `douban-tab${T.id === "movie" ? " active" : ""}`, children: [
          /* @__PURE__ */ c.jsx(T.Icon, {}),
          T.label
        ] }, T.id)) }),
        /* @__PURE__ */ c.jsxs("span", { className: "douban-seg", children: [
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "active", children: "Wish" }),
          /* @__PURE__ */ c.jsx("button", { type: "button", children: "Done" })
        ] })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: "douban-grid", children: Array.from({ length: 12 }, (T, E) => /* @__PURE__ */ c.jsxs("div", { className: "douban-tile", children: [
        /* @__PURE__ */ c.jsx("div", { className: "douban-cover" }),
        /* @__PURE__ */ c.jsx("span", { className: "douban-line" }),
        /* @__PURE__ */ c.jsx("span", { className: "douban-line short" })
      ] }, E)) })
    ] });
  const p = (T, E) => {
    u(T), d(E), S(vu);
  }, N = v.slice(0, b);
  return /* @__PURE__ */ c.jsxs("div", { className: "douban", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "douban-bar", children: [
      /* @__PURE__ */ c.jsx("div", { className: "douban-tabs", children: Ly.map((T) => /* @__PURE__ */ c.jsxs("button", { type: "button", className: `douban-tab${T.id === o ? " active" : ""}`, onClick: () => p(T.id, f), children: [
        /* @__PURE__ */ c.jsx(T.Icon, {}),
        T.label,
        /* @__PURE__ */ c.jsx("small", { children: a.counts[T.id].wish + a.counts[T.id].done })
      ] }, T.id)) }),
      /* @__PURE__ */ c.jsxs("span", { className: "douban-seg", children: [
        /* @__PURE__ */ c.jsx("button", { type: "button", className: f === "wish" ? "active" : "", onClick: () => p(o, "wish"), children: "Wish" }),
        /* @__PURE__ */ c.jsx("button", { type: "button", className: f === "done" ? "active" : "", onClick: () => p(o, "done"), children: "Done" })
      ] }),
      /* @__PURE__ */ c.jsxs("label", { className: "douban-search", children: [
        /* @__PURE__ */ c.jsx(wc, {}),
        /* @__PURE__ */ c.jsx("input", { className: "input", value: m, placeholder: `Search ${Uy[o][f].toLowerCase()}…`, onChange: (T) => {
          g(T.target.value), S(vu);
        } })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "douban-meta", children: [
      /* @__PURE__ */ c.jsxs("span", { children: [
        Uy[o][f],
        " · ",
        m ? `${v.length} of ${a.counts[o][f]}` : a.counts[o][f],
        !m && a.counts[o][f] > v.length ? ` (${v.length} loaded)` : ""
      ] }),
      /* @__PURE__ */ c.jsx("a", { href: `https://${o}.douban.com/people/${encodeURIComponent(a.uid)}/${f === "wish" ? "wish" : "collect"}`, target: "_blank", rel: "noreferrer", children: "Open on Douban" })
    ] }),
    v.length === 0 && /* @__PURE__ */ c.jsx("p", { className: "rem-empty", children: m ? `Nothing matching "${m}".` : "Nothing here yet." }),
    v.length > 0 && /* @__PURE__ */ c.jsx("div", { className: "douban-grid", children: N.map((T) => /* @__PURE__ */ c.jsxs("a", { className: "douban-tile", href: T.url, target: "_blank", rel: "noreferrer", title: T.comment ? `${T.title}
${T.comment}` : T.title, children: [
      /* @__PURE__ */ c.jsx(TT, { item: T }),
      /* @__PURE__ */ c.jsx("b", { children: T.title }),
      /* @__PURE__ */ c.jsxs("small", { children: [
        T.status === "done" && T.rating ? /* @__PURE__ */ c.jsx(ET, { n: T.rating }) : null,
        /* @__PURE__ */ c.jsx("span", { children: T.date })
      ] }),
      T.status === "done" && T.comment ? /* @__PURE__ */ c.jsx("span", { className: "douban-comment", children: T.comment }) : null
    ] }, `${T.kind}-${T.id}`)) }),
    v.length > b && /* @__PURE__ */ c.jsxs("button", { type: "button", className: "button douban-more", onClick: () => S((T) => T + vu), children: [
      "Show more (",
      v.length - b,
      " left)"
    ] })
  ] });
}
function Hy({ leg: a, kind: s }) {
  const o = s === "dep" ? Y2 : $2;
  if (!a) return /* @__PURE__ */ c.jsxs("div", { className: `fl-leg ${s}`, children: [
    /* @__PURE__ */ c.jsx(o, {}),
    /* @__PURE__ */ c.jsx("b", { children: "—" })
  ] });
  const u = [a.terminal ? `T${a.terminal}` : "", a.gate ? `Gate ${a.gate}` : ""].filter(Boolean).join(" · ");
  return /* @__PURE__ */ c.jsxs("div", { className: `fl-leg ${s}`, children: [
    /* @__PURE__ */ c.jsx(o, {}),
    /* @__PURE__ */ c.jsx("div", { className: "fl-code", children: a.iata }),
    /* @__PURE__ */ c.jsx("div", { className: "fl-time", children: a.revisedTime ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("s", { children: a.time }),
      " ",
      a.revisedTime
    ] }) : a.time }),
    /* @__PURE__ */ c.jsx("div", { className: "fl-city", children: a.city || a.name }),
    u && /* @__PURE__ */ c.jsx("div", { className: "fl-meta", children: u })
  ] });
}
function kT({ data: a, placeholder: s, busy: o, act: u }) {
  const f = a?.flights ?? [];
  return a?.hasKey ? f.length ? /* @__PURE__ */ c.jsx("div", { className: "fl", children: f.map((d) => /* @__PURE__ */ c.jsxs("article", { className: `fl-card ${d.tone}`, children: [
    /* @__PURE__ */ c.jsxs("header", { children: [
      /* @__PURE__ */ c.jsx("b", { children: d.number }),
      /* @__PURE__ */ c.jsxs("span", { className: "fl-airline", children: [
        d.airline,
        d.aircraft ? ` · ${d.aircraft}` : ""
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: "fl-date", children: d.dateLabel }),
      /* @__PURE__ */ c.jsx("button", { type: "button", className: "fl-x", title: "Stop following", disabled: o === "untrack", onClick: () => {
        u("untrack", { json: { value: d.id } });
      }, children: /* @__PURE__ */ c.jsx(Sl, {}) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "fl-route", children: [
      /* @__PURE__ */ c.jsx(Hy, { leg: d.dep, kind: "dep" }),
      /* @__PURE__ */ c.jsxs("div", { className: "fl-line", children: [
        /* @__PURE__ */ c.jsx("i", {}),
        /* @__PURE__ */ c.jsx(rs, {}),
        /* @__PURE__ */ c.jsx("i", {})
      ] }),
      /* @__PURE__ */ c.jsx(Hy, { leg: d.arr, kind: "arr" })
    ] }),
    /* @__PURE__ */ c.jsxs("footer", { children: [
      /* @__PURE__ */ c.jsx("span", { className: `fl-status ${d.tone}`, children: d.statusText }),
      d.error && d.dep && /* @__PURE__ */ c.jsxs("small", { className: "fl-err", children: [
        "last check failed: ",
        d.error
      ] }),
      d.at && /* @__PURE__ */ c.jsxs("small", { className: "fl-at", children: [
        "checked ",
        AT(d.at)
      ] })
    ] })
  ] }, d.id)) }) : /* @__PURE__ */ c.jsx("div", { className: "fl", children: /* @__PURE__ */ c.jsxs("div", { className: "fl-empty", children: [
    /* @__PURE__ */ c.jsx(rs, {}),
    /* @__PURE__ */ c.jsx("b", { children: "No flights tracked" }),
    /* @__PURE__ */ c.jsx("small", { children: "Add one below by number and date, or let her pick it up from a booking mail." })
  ] }) }) : /* @__PURE__ */ c.jsx("div", { className: "fl placeholder", children: /* @__PURE__ */ c.jsxs("div", { className: "fl-empty", children: [
    /* @__PURE__ */ c.jsx(rs, {}),
    /* @__PURE__ */ c.jsx("b", { children: s ? "Paste an AeroDataBox key below to start" : "No key" }),
    /* @__PURE__ */ c.jsx("small", { children: "Flights you add are checked around departure and dropped two days after they fly." })
  ] }) });
}
function AT(a) {
  const s = Math.round((Date.now() - Date.parse(a)) / 6e4);
  return s < 1 ? "just now" : s < 60 ? `${s} min ago` : s < 2160 ? `${Math.round(s / 60)} h ago` : `${Math.round(s / 1440)} d ago`;
}
const _T = { health: "Health", calendar: "Calendar", tasks: "Tasks", mail: "Mail", notes: "Notes", finance: "Finance", location: "Location", travel: "Travel", media: "Media", other: "Other" }, CT = { health: C2, calendar: m2, tasks: _c, location: Dd, notes: av, mail: lv, travel: rs, media: Wy }, OT = { weather: Jy, contacts: cv, photos: Tc, home: ju, weread: hs, gmail: lv, flights: rs, images: Tc }, RT = { reminders: ["add"], location: ["setHome", "location"], home: ["run"], weread: ["sync", "cookie", "fetch", "disconnect"], photos: ["thumb"], weather: ["untrip"], flights: ["untrack"] };
function MT({ open: a, onOpenChange: s, version: o, notify: u }) {
  const [f, d] = x.useState(null), [m, g] = x.useState(""), [b, S] = x.useState(""), v = x.useCallback(() => {
    tl("/sources").then((T) => {
      d(T.sources), g((E) => T.sources.some((L) => L.id === E) ? E : T.sources[0]?.id ?? "");
    }).catch((T) => u(`Could not load connectors: ${T.message}`));
  }, [u]);
  x.useEffect(() => {
    a && v();
  }, [a, o, v]);
  const p = f?.find((T) => T.id === m), N = async (T, E) => {
    if (!p) return !1;
    S(T);
    try {
      const L = E?.file ? { method: "POST", headers: { "content-type": E.file.type || "application/octet-stream" }, body: E.file } : { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(E?.json ?? {}) }, k = await fetch(rt(`/sources/${encodeURIComponent(p.id)}/${encodeURIComponent(T)}`), L), V = await k.json().catch(() => ({}));
      if (!k.ok) throw new Error(V.error ?? k.statusText);
      return V.message && u(V.message), v(), !0;
    } catch (L) {
      return u(`${p.label}: ${L.message}`), !1;
    } finally {
      S("");
    }
  };
  return /* @__PURE__ */ c.jsx(Ru, { open: a, onOpenChange: s, children: /* @__PURE__ */ c.jsxs(Mu, { children: [
    /* @__PURE__ */ c.jsx(Du, { className: "panel-overlay" }),
    /* @__PURE__ */ c.jsxs(zu, { className: "panel full connectors", "aria-describedby": void 0, onOpenAutoFocus: (T) => T.preventDefault(), children: [
      /* @__PURE__ */ c.jsxs("aside", { className: "src-side", children: [
        /* @__PURE__ */ c.jsxs("div", { className: "src-side-head", children: [
          /* @__PURE__ */ c.jsx(Lu, { className: "panel-title", children: "Connectors" }),
          /* @__PURE__ */ c.jsx("p", { className: "panel-subtitle", children: "What she can see about your day." })
        ] }),
        /* @__PURE__ */ c.jsx("nav", { className: "src-nav", children: f === null ? /* @__PURE__ */ c.jsx("p", { className: "empty", children: "Loading…" }) : f.length === 0 ? /* @__PURE__ */ c.jsx("p", { className: "empty", children: "No connectors loaded." }) : f.map((T) => {
          const E = OT[T.id] ?? CT[T.category] ?? rh;
          return /* @__PURE__ */ c.jsxs("button", { type: "button", className: `src-item${T.id === m ? " active" : ""}`, onClick: () => g(T.id), children: [
            /* @__PURE__ */ c.jsx("span", { className: "src-icon", children: /* @__PURE__ */ c.jsx(E, {}) }),
            /* @__PURE__ */ c.jsxs("span", { className: "src-text", children: [
              /* @__PURE__ */ c.jsx("b", { children: T.label }),
              /* @__PURE__ */ c.jsxs("small", { children: [
                /* @__PURE__ */ c.jsx("i", { className: `dot ${T.view.status}` }),
                T.view.status === "connected" ? T.view.shared ? "Connected" : "Connected · hidden" : T.view.status === "error" ? "Needs attention" : "Not set up"
              ] })
            ] })
          ] }, T.id);
        }) }),
        /* @__PURE__ */ c.jsxs("p", { className: "src-side-foot", children: [
          "Each connector is a dsh plugin under ",
          /* @__PURE__ */ c.jsx("code", { children: "plugins/" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("section", { className: "src-main", children: [
        /* @__PURE__ */ c.jsx(Uu, { className: "icon-button src-close", "aria-label": "Close", children: /* @__PURE__ */ c.jsx(Sl, {}) }),
        p ? /* @__PURE__ */ c.jsx(zT, { source: p, busy: b, act: N }, p.id) : f !== null && f.length === 0 ? /* @__PURE__ */ c.jsx(DT, {}) : null
      ] })
    ] })
  ] }) });
}
function DT() {
  return /* @__PURE__ */ c.jsxs("div", { className: "src-empty", children: [
    /* @__PURE__ */ c.jsx(rh, {}),
    /* @__PURE__ */ c.jsx("p", { children: "No connectors are loaded." }),
    /* @__PURE__ */ c.jsxs("p", { className: "field-hint", children: [
      "Mount one of the plugins under ",
      /* @__PURE__ */ c.jsx("code", { children: "plugins/" }),
      " (health, calendar, weather) in your dsh config and it appears here."
    ] })
  ] });
}
function zT({ source: a, busy: s, act: o }) {
  const u = a.view, f = (u.actions ?? []).find((S) => S.kind === "toggle"), d = (u.actions ?? []).find((S) => S.id === "refresh"), m = RT[a.id] ?? [], g = (u.actions ?? []).filter((S) => S.kind !== "toggle" && S.id !== "refresh" && !m.includes(S.id)), b = a.id === "calendar" ? /* @__PURE__ */ c.jsx(GT, { data: u.data, placeholder: u.status !== "connected" }) : a.id === "reminders" ? /* @__PURE__ */ c.jsx(VT, { data: u.data, busy: s, act: o, placeholder: u.status !== "connected" }) : a.id === "weather" ? /* @__PURE__ */ c.jsx(XT, { data: u.data, placeholder: u.status !== "connected", act: o }) : a.id === "flights" ? /* @__PURE__ */ c.jsx(kT, { data: u.data, busy: s, act: o, placeholder: u.status !== "connected" }) : a.id === "contacts" ? /* @__PURE__ */ c.jsx(PE, { data: u.data, placeholder: u.status !== "connected", busy: s, act: o }) : a.id === "notes" ? /* @__PURE__ */ c.jsx(eT, { data: u.data, placeholder: u.status !== "connected", busy: s, act: o }) : a.id === "photos" ? /* @__PURE__ */ c.jsx(cT, { data: u.data, placeholder: u.status !== "connected", busy: s, act: o }) : a.id === "messages" ? /* @__PURE__ */ c.jsx(dT, { data: u.data, placeholder: u.status !== "connected", busy: s, act: o }) : a.id === "location" ? /* @__PURE__ */ c.jsx(yT, { data: u.data, placeholder: u.status !== "connected", busy: s, act: o }) : a.id === "home" ? /* @__PURE__ */ c.jsx(NT, { data: u.data, placeholder: u.status !== "connected", busy: s, act: o }) : a.id === "weread" ? /* @__PURE__ */ c.jsx(jT, { data: u.data, placeholder: u.status !== "connected", busy: s, act: o }) : a.id === "douban" ? /* @__PURE__ */ c.jsx(wT, { data: u.data, placeholder: u.status !== "connected", busy: s, act: o }) : /* @__PURE__ */ c.jsx(UT, { view: u });
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsxs("header", { className: "src-head", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "src-titles", children: [
        /* @__PURE__ */ c.jsxs("h2", { children: [
          a.label,
          " ",
          /* @__PURE__ */ c.jsx("span", { className: "badge", children: _T[a.category] ?? a.category })
        ] }),
        /* @__PURE__ */ c.jsx("p", { className: `source-summary ${u.status}`, children: u.summary })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "src-head-actions", children: [
        f && /* @__PURE__ */ c.jsxs("label", { className: "src-shared", title: f.hint, children: [
          /* @__PURE__ */ c.jsx("span", { children: f.label }),
          /* @__PURE__ */ c.jsx("input", { type: "checkbox", className: "switch", checked: !!f.value, disabled: s !== "", onChange: (S) => {
            o(f.id, { json: { value: S.target.checked } });
          } })
        ] }),
        d && /* @__PURE__ */ c.jsx("button", { type: "button", className: `icon-button${s === "refresh" ? " spinning" : ""}`, title: "Refresh", disabled: s !== "", onClick: () => {
          o("refresh");
        }, children: /* @__PURE__ */ c.jsx(Ud, {}) })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "src-body", children: [
      u.status === "error" && /* @__PURE__ */ c.jsx("div", { className: "src-error", children: u.summary }),
      b,
      u.setup?.length || g.length ? /* @__PURE__ */ c.jsxs("div", { className: "src-setup", children: [
        u.setup?.map((S) => /* @__PURE__ */ c.jsxs("details", { className: "details", open: u.status !== "connected", children: [
          /* @__PURE__ */ c.jsx("summary", { children: S.title }),
          /* @__PURE__ */ c.jsx("ol", { className: "setup-steps", children: S.steps.map((v, p) => /* @__PURE__ */ c.jsx("li", { children: v }, p)) }),
          S.fields?.map((v) => /* @__PURE__ */ c.jsx(BT, { label: v.label, value: v.value, secret: v.secret }, v.label))
        ] }, S.title)),
        g.length > 0 && /* @__PURE__ */ c.jsx(LT, { actions: g, busy: s, act: o })
      ] }) : null
    ] })
  ] });
}
function LT({ actions: a, busy: s, act: o }) {
  const u = x.useRef(null), f = x.useRef("");
  return /* @__PURE__ */ c.jsxs("div", { className: "row end", style: { marginTop: 14, flexWrap: "wrap" }, children: [
    a.map((d) => /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: `button${d.kind === "danger" ? " danger" : ""}`,
        disabled: s !== "",
        title: d.hint,
        onClick: () => {
          if (d.kind === "upload") {
            f.current = d.id, u.current && (u.current.accept = d.accept ?? ""), u.current?.click();
            return;
          }
          if (!(d.kind === "danger" && d.confirm && !window.confirm(d.confirm))) {
            if (d.kind === "input") {
              const m = window.prompt(d.hint ?? d.label, d.placeholder ?? "");
              if (m === null || m.trim() === "") return;
              o(d.id, { json: { value: m.trim() } });
              return;
            }
            o(d.id);
          }
        },
        children: [
          d.kind === "upload" && /* @__PURE__ */ c.jsx(oh, {}),
          s === d.id ? "Working…" : d.label
        ]
      },
      d.id
    )),
    /* @__PURE__ */ c.jsx("input", { ref: u, type: "file", hidden: !0, onChange: (d) => {
      const m = d.target.files?.[0];
      d.target.value = "", m && o(f.current, { file: m });
    } })
  ] });
}
function UT({ view: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: `source${a.placeholder ? " placeholder" : ""}`, children: [
    a.stats && a.stats.length > 0 && /* @__PURE__ */ c.jsx("div", { className: "stat-grid", children: a.stats.map((s) => /* @__PURE__ */ c.jsxs("div", { className: "stat", children: [
      /* @__PURE__ */ c.jsx("small", { children: s.label }),
      /* @__PURE__ */ c.jsx("b", { children: s.value }),
      s.delta && /* @__PURE__ */ c.jsx("span", { className: `stat-delta ${s.tone ?? "flat"}`, children: s.delta })
    ] }, s.label)) }),
    a.series?.map((s) => /* @__PURE__ */ c.jsx(HT, { series: s }, s.label)),
    a.lists?.map((s) => /* @__PURE__ */ c.jsxs("section", { children: [
      /* @__PURE__ */ c.jsx("h3", { className: "section", children: s.title }),
      /* @__PURE__ */ c.jsx("ul", { className: "source-list", children: s.items.map((o, u) => /* @__PURE__ */ c.jsxs("li", { children: [
        /* @__PURE__ */ c.jsx("span", { children: o.primary }),
        o.secondary && /* @__PURE__ */ c.jsx("small", { children: o.secondary })
      ] }, u)) })
    ] }, s.title)),
    a.placeholder && /* @__PURE__ */ c.jsx("p", { className: "field-hint", style: { marginTop: 12 }, children: "A preview of what will show up here once data arrives." })
  ] });
}
function HT({ series: a }) {
  const s = a.points.map((g) => g.value).filter((g) => g !== void 0), o = Math.max(1, ...s), u = Math.min(...s), d = s.length > 1 && u > 0 && (o - u) / o < 0.35 ? u - (o - u) * 0.5 : 0, m = (g) => Math.max(4, (g - d) / (o - d) * 100);
  return /* @__PURE__ */ c.jsxs("section", { className: "bars", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "bars-head", children: [
      /* @__PURE__ */ c.jsx("h3", { className: "section", children: a.label }),
      /* @__PURE__ */ c.jsx("small", { children: s.length === 0 ? "" : `avg ${(s.reduce((g, b) => g + b, 0) / s.length).toFixed(a.unit === "" ? 0 : 1)}${a.unit ? ` ${a.unit}` : ""}` })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: "bars-row", children: a.points.map((g) => /* @__PURE__ */ c.jsxs("div", { className: "bar-col", title: `${g.day.replace("T", " ")}: ${g.value === void 0 ? "no data" : `${g.value}${a.unit ? ` ${a.unit}` : ""}`}`, children: [
      /* @__PURE__ */ c.jsx("div", { className: `bar${g.value === void 0 ? " none" : ""}`, style: { height: `${g.value === void 0 ? 4 : m(g.value)}%` } }),
      /* @__PURE__ */ c.jsx("small", { children: g.day.includes("T") ? g.day.slice(11, 13) : g.day.slice(8) })
    ] }, g.day)) })
  ] });
}
function BT({ label: a, value: s, secret: o }) {
  const [u, f] = x.useState(!1), [d, m] = x.useState(!o);
  return /* @__PURE__ */ c.jsxs("div", { className: "copy-field", children: [
    /* @__PURE__ */ c.jsx("small", { children: a }),
    /* @__PURE__ */ c.jsx("code", { onClick: () => m(!0), title: d ? void 0 : "Click to reveal", children: d ? s : "•".repeat(Math.min(24, s.length)) }),
    /* @__PURE__ */ c.jsx("button", { type: "button", className: "icon-button small", title: "Copy", onClick: () => {
      navigator.clipboard.writeText(s).then(() => {
        f(!0), window.setTimeout(() => f(!1), 1200);
      });
    }, children: u ? /* @__PURE__ */ c.jsx(si, {}) : /* @__PURE__ */ c.jsx(sh, {}) })
  ] });
}
const ah = (a) => String(a).padStart(2, "0"), _h = (a) => `${a.getFullYear()}-${ah(a.getMonth() + 1)}-${ah(a.getDate())}`, bl = (a, s) => {
  const o = /* @__PURE__ */ new Date(`${a}T12:00:00`);
  return o.setDate(o.getDate() + s), _h(o);
}, cs = (a) => (/* @__PURE__ */ new Date(`${a}T12:00:00`)).getDay(), Ch = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], v1 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], bu = (a) => Number(a.slice(11, 13)) * 60 + Number(a.slice(14, 16)), li = (a) => a.slice(11, 16), qT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], $T = (a, s) => a === s ? "Today" : a === bl(s, 1) ? "Tomorrow" : `${Ch[cs(a)]}, ${qT[Number(a.slice(5, 7)) - 1]} ${Number(a.slice(8))}${a.slice(0, 4) === s.slice(0, 4) ? "" : ` ${a.slice(0, 4)}`}`, YT = (a, s) => a === s ? "Today" : a === bl(s, 1) ? "Tomorrow" : a === bl(s, -1) ? "Yesterday" : `${Ch[cs(a)]}, ${v1[Number(a.slice(5, 7)) - 1]} ${Number(a.slice(8))}`;
function GT({ data: a, placeholder: s }) {
  const o = a?.today ?? _h(/* @__PURE__ */ new Date()), u = a?.events ?? [], [f, d] = x.useState(o), [m, g] = x.useState(() => bl(o, -((cs(o) + 6) % 7))), b = Array.from({ length: 7 }, (B, G) => bl(m, G)), S = (B) => u.filter((G) => G.start.slice(0, 10) === B || G.allDay && G.start.slice(0, 10) <= B && G.end.slice(0, 10) > B), v = (B) => B >= bl(o, -((cs(o) + 6) % 7)) && B < bl(o, 14), p = S(f), N = p.filter((B) => !B.allDay).sort((B, G) => B.start.localeCompare(G.start)), T = p.filter((B) => B.allDay), E = (B) => B.end.slice(0, 10) > B.start.slice(0, 10) ? 1440 : bu(B.end), L = N.length ? Math.min(...N.map((B) => bu(B.start))) : 540, k = N.length ? Math.max(...N.map(E)) : 1080, V = Math.max(0, Math.min(8, Math.floor(L / 60) - 1)), X = Math.min(24, Math.max(19, Math.ceil(k / 60) + 1)), U = (X - V) * 60, F = x.useMemo(() => {
    const B = [];
    let G = [], ce = [], Te = -1;
    const de = () => {
      for (const xe of ce) xe.cols = G.length;
      ce = [], G = [];
    };
    for (const xe of N) {
      const pe = bu(xe.start), W = Math.max(pe + 15, E(xe));
      pe >= Te && de();
      let we = G.findIndex((J) => J <= pe);
      we === -1 ? (G.push(W), we = G.length - 1) : G[we] = W, Te = Math.max(Te, W);
      const he = { e: xe, col: we, cols: 1 };
      ce.push(he), B.push(he);
    }
    return de(), B;
  }, [N]), Z = o === f ? (/* @__PURE__ */ new Date()).getHours() * 60 + (/* @__PURE__ */ new Date()).getMinutes() : -1;
  return /* @__PURE__ */ c.jsxs("div", { className: `cal${s ? " placeholder" : ""}`, children: [
    /* @__PURE__ */ c.jsxs("div", { className: "cal-week-head", children: [
      /* @__PURE__ */ c.jsx("button", { type: "button", className: "icon-button small", onClick: () => g(bl(m, -7)), "aria-label": "Previous week", children: /* @__PURE__ */ c.jsx(Ky, {}) }),
      /* @__PURE__ */ c.jsxs("b", { children: [
        v1[Number(m.slice(5, 7)) - 1],
        " ",
        m.slice(0, 4)
      ] }),
      /* @__PURE__ */ c.jsx("button", { type: "button", className: "text-button", onClick: () => {
        g(bl(o, -((cs(o) + 6) % 7))), d(o);
      }, children: "Today" }),
      /* @__PURE__ */ c.jsx("button", { type: "button", className: "icon-button small", onClick: () => g(bl(m, 7)), "aria-label": "Next week", children: /* @__PURE__ */ c.jsx(Iy, {}) })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: "cal-week", children: b.map((B) => {
      const G = S(B);
      return /* @__PURE__ */ c.jsxs("button", { type: "button", className: `cal-day${B === f ? " selected" : ""}${B === o ? " today" : ""}${v(B) ? "" : " unknown"}`, onClick: () => d(B), children: [
        /* @__PURE__ */ c.jsx("small", { children: Ch[cs(B)] }),
        /* @__PURE__ */ c.jsx("b", { children: Number(B.slice(8)) }),
        /* @__PURE__ */ c.jsx("span", { className: "cal-dots", children: G.slice(0, 4).map((ce) => /* @__PURE__ */ c.jsx("i", { style: { background: ce.color || "var(--brand)" } }, ce.id)) })
      ] }, B);
    }) }),
    /* @__PURE__ */ c.jsxs("div", { className: "cal-day-head", children: [
      /* @__PURE__ */ c.jsx("h3", { children: YT(f, o) }),
      /* @__PURE__ */ c.jsx("small", { children: p.length === 0 ? v(f) ? "Nothing scheduled" : "Not loaded" : `${p.length} event${p.length === 1 ? "" : "s"}` })
    ] }),
    T.length > 0 && /* @__PURE__ */ c.jsx("div", { className: "cal-allday", children: T.map((B) => /* @__PURE__ */ c.jsxs("span", { className: "cal-chip", style: { borderColor: B.color || "var(--brand)" }, children: [
      B.title,
      /* @__PURE__ */ c.jsx("small", { children: B.calendar })
    ] }, B.id)) }),
    /* @__PURE__ */ c.jsxs("div", { className: "cal-grid", style: { height: `${(X - V) * 44}px` }, children: [
      Array.from({ length: X - V }, (B, G) => /* @__PURE__ */ c.jsx("div", { className: "cal-hour", style: { top: `${G / (X - V) * 100}%` }, children: /* @__PURE__ */ c.jsxs("small", { children: [
        ah(V + G),
        ":00"
      ] }) }, G)),
      Z >= V * 60 && Z <= X * 60 && /* @__PURE__ */ c.jsx("div", { className: "cal-now", style: { top: `${(Z - V * 60) / U * 100}%` } }),
      F.map(({ e: B, col: G, cols: ce }) => {
        const Te = bu(B.start), de = Math.max(Te + 20, E(B));
        return /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: `cal-event${B.status === "canceled" ? " canceled" : ""}${de - Te < 40 ? " short" : ""}`,
            title: `${li(B.start)}–${li(B.end)} ${B.title}${B.location ? ` @ ${B.location}` : ""}`,
            style: { top: `${(Te - V * 60) / U * 100}%`, height: `${(de - Te) / U * 100}%`, left: `calc(52px + (100% - 60px) * ${G / ce})`, width: `calc((100% - 60px) * ${1 / ce} - 4px)`, borderLeftColor: B.color || "var(--brand)", background: `color-mix(in oklab, ${B.color || "var(--brand)"} 14%, var(--card))` },
            children: [
              /* @__PURE__ */ c.jsx("b", { children: B.title }),
              /* @__PURE__ */ c.jsxs("small", { children: [
                li(B.start),
                "–",
                li(B.end),
                B.location ? ` · ${B.location.split(`
`)[0]}` : ""
              ] })
            ]
          },
          B.id
        );
      }),
      N.length === 0 && /* @__PURE__ */ c.jsx("div", { className: "cal-free", children: s ? "Waiting for calendar access" : "Free" })
    ] })
  ] });
}
function VT({ data: a, busy: s, act: o, placeholder: u }) {
  const f = a?.today ?? _h(/* @__PURE__ */ new Date()), [d, m] = x.useState(""), [g, b] = x.useState(/* @__PURE__ */ new Set()), S = (a?.reminders ?? []).filter((E) => !g.has(E.id)), v = [
    ["Overdue", S.filter((E) => E.due !== null && E.due.slice(0, 10) < f)],
    ["Today", S.filter((E) => E.due !== null && E.due.slice(0, 10) === f)],
    ["Coming up", S.filter((E) => E.due !== null && E.due.slice(0, 10) > f).sort((E, L) => E.due.localeCompare(L.due))],
    ["No date", S.filter((E) => E.due === null)]
  ], p = async (E) => {
    b((k) => new Set(k).add(E.id)), await o("complete", { json: { value: E.id } }) || b((k) => {
      const V = new Set(k);
      return V.delete(E.id), V;
    });
  }, N = async () => {
    const E = d.trim();
    E && await o("add", { json: { value: E } }) && m("");
  }, T = (E) => E.due === null ? "" : `${$T(E.due.slice(0, 10), f)}${E.hasTime ? ` ${li(E.due)}` : ""}`;
  return /* @__PURE__ */ c.jsxs("div", { className: `rem${u ? " placeholder" : ""}`, children: [
    /* @__PURE__ */ c.jsxs("div", { className: "rem-add", children: [
      /* @__PURE__ */ c.jsx("input", { className: "input", value: d, placeholder: "Add a reminder… e.g. Call mum tomorrow 18:00", disabled: s !== "" || u, onChange: (E) => m(E.target.value), onKeyDown: (E) => {
        E.key === "Enter" && !E.nativeEvent.isComposing && (E.preventDefault(), N());
      } }),
      /* @__PURE__ */ c.jsx("button", { type: "button", className: "button primary", disabled: s !== "" || d.trim() === "", onClick: () => {
        N();
      }, children: s === "add" ? "Adding…" : "Add" })
    ] }),
    S.length === 0 && /* @__PURE__ */ c.jsx("p", { className: "rem-empty", children: u ? "Waiting for reminders access" : "All clear. Nothing open." }),
    v.filter(([, E]) => E.length > 0).map(([E, L]) => /* @__PURE__ */ c.jsxs("section", { className: "rem-group", children: [
      /* @__PURE__ */ c.jsxs("h3", { className: "section", children: [
        E,
        " ",
        /* @__PURE__ */ c.jsx("span", { className: "badge", children: L.length })
      ] }),
      /* @__PURE__ */ c.jsx("ul", { className: "rem-list", children: L.map((k) => /* @__PURE__ */ c.jsxs("li", { className: `rem-row${E === "Overdue" ? " overdue" : ""}`, children: [
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "rem-check", title: "Mark done", disabled: s !== "", onClick: () => {
          p(k);
        }, children: /* @__PURE__ */ c.jsx(si, {}) }),
        /* @__PURE__ */ c.jsxs("span", { className: "rem-text", children: [
          /* @__PURE__ */ c.jsx("b", { children: k.title }),
          k.notes && /* @__PURE__ */ c.jsx("small", { className: "rem-notes", children: k.notes.split(`
`)[0] })
        ] }),
        /* @__PURE__ */ c.jsxs("small", { className: "rem-meta", children: [
          T(k),
          T(k) && " · ",
          k.list
        ] })
      ] }, k.id)) })
    ] }, E))
  ] });
}
function xu({ code: a, night: s }) {
  const o = a === 0 || a === 1 ? s ? H2 : J2 : a === 2 ? Jy : a === 3 ? Md : a <= 48 ? b2 : a <= 57 ? v2 : a <= 67 || a >= 80 && a <= 82 ? S2 : a <= 77 || a === 85 || a === 86 ? N2 : a >= 95 ? x2 : Md;
  return /* @__PURE__ */ c.jsx(o, {});
}
function XT({ data: a, placeholder: s, act: o }) {
  if (!a) return /* @__PURE__ */ c.jsx("div", { className: "wx placeholder", children: /* @__PURE__ */ c.jsxs("div", { className: "wx-hero", children: [
    /* @__PURE__ */ c.jsx("div", { className: "wx-icon", children: /* @__PURE__ */ c.jsx(Md, {}) }),
    /* @__PURE__ */ c.jsx("div", { className: "wx-temp", children: "—" }),
    /* @__PURE__ */ c.jsx("div", { className: "wx-desc", children: /* @__PURE__ */ c.jsx("b", { children: s ? "Waiting for the forecast" : "" }) })
  ] }) });
  const u = (g) => String(Math.round(g)), f = Math.min(...a.daily.map((g) => g.min)), d = Math.max(...a.daily.map((g) => g.max)), m = Math.max(1, d - f);
  return /* @__PURE__ */ c.jsxs("div", { className: "wx", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "wx-hero", children: [
      /* @__PURE__ */ c.jsx("div", { className: "wx-icon", children: /* @__PURE__ */ c.jsx(xu, { code: a.current.code, night: !a.current.isDay }) }),
      /* @__PURE__ */ c.jsxs("div", { className: "wx-temp", children: [
        u(a.current.temp),
        /* @__PURE__ */ c.jsx("span", { children: a.units.deg })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "wx-desc", children: [
        /* @__PURE__ */ c.jsx("b", { children: a.current.text }),
        /* @__PURE__ */ c.jsxs("small", { children: [
          "Feels like ",
          u(a.current.feels),
          a.units.deg,
          " · humidity ",
          a.current.humidity,
          "% · wind ",
          u(a.current.wind),
          " ",
          a.units.wind
        ] }),
        /* @__PURE__ */ c.jsx("small", { children: a.daily[0] ? `High ${u(a.daily[0].max)} · low ${u(a.daily[0].min)} · UV ${u(a.daily[0].uv)} · sun ${li(a.daily[0].sunrise)}–${li(a.daily[0].sunset)}` : "" })
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: "wx-hours", children: a.hourly.map((g, b) => /* @__PURE__ */ c.jsxs("div", { className: "wx-hour", children: [
      /* @__PURE__ */ c.jsx("small", { children: b === 0 ? "Now" : `${g.time.slice(11, 13)}h` }),
      /* @__PURE__ */ c.jsx(xu, { code: g.code, night: Number(g.time.slice(11, 13)) < 6 || Number(g.time.slice(11, 13)) >= 19 }),
      /* @__PURE__ */ c.jsxs("b", { children: [
        u(g.temp),
        "°"
      ] }),
      /* @__PURE__ */ c.jsx("small", { className: `wx-rain${g.rain >= 30 ? " on" : ""}`, children: g.rain >= 20 ? `${g.rain}%` : "" })
    ] }, g.time)) }),
    /* @__PURE__ */ c.jsx("ul", { className: "wx-days", children: a.daily.map((g) => /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("span", { className: "wx-day", children: g.label }),
      /* @__PURE__ */ c.jsx("span", { className: "wx-day-icon", children: /* @__PURE__ */ c.jsx(xu, { code: g.code }) }),
      /* @__PURE__ */ c.jsx("span", { className: "wx-day-text", children: g.text }),
      /* @__PURE__ */ c.jsx("span", { className: `wx-rain${g.rain >= 30 ? " on" : ""}`, children: g.rain >= 20 ? `${g.rain}%` : "" }),
      /* @__PURE__ */ c.jsxs("span", { className: "wx-lo", children: [
        u(g.min),
        "°"
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: "wx-range", children: /* @__PURE__ */ c.jsx("i", { style: { left: `${(g.min - f) / m * 100}%`, width: `${Math.max(6, (g.max - g.min) / m * 100)}%` } }) }),
      /* @__PURE__ */ c.jsxs("span", { className: "wx-hi", children: [
        u(g.max),
        "°"
      ] })
    ] }, g.day)) }),
    (a.trips ?? []).map((g) => {
      const b = Math.min(...g.days.map((p) => p.min), f), S = Math.max(...g.days.map((p) => p.max), d), v = Math.max(1, S - b);
      return /* @__PURE__ */ c.jsxs("section", { className: "wx-trip", children: [
        /* @__PURE__ */ c.jsxs("header", { children: [
          /* @__PURE__ */ c.jsx(rs, {}),
          /* @__PURE__ */ c.jsxs("div", { children: [
            /* @__PURE__ */ c.jsxs("b", { children: [
              g.name,
              ", ",
              g.country
            ] }),
            /* @__PURE__ */ c.jsxs("small", { children: [
              g.label || "Watching",
              g.inDays !== void 0 && g.inDays > 0 ? ` · in ${g.inDays} day${g.inDays === 1 ? "" : "s"}` : g.inDays !== void 0 && g.inDays <= 0 && g.to ? " · now" : "",
              g.current ? ` · now ${u(g.current.temp)}${a.units.deg} ${g.current.text}` : ""
            ] })
          ] }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "wx-trip-x", title: "Stop following", onClick: () => {
            o("untrip", { json: { value: g.id } });
          }, children: /* @__PURE__ */ c.jsx(Sl, {}) })
        ] }),
        g.days.length ? /* @__PURE__ */ c.jsx("ul", { className: "wx-days", children: g.days.map((p) => /* @__PURE__ */ c.jsxs("li", { children: [
          /* @__PURE__ */ c.jsx("span", { className: "wx-day", children: p.label }),
          /* @__PURE__ */ c.jsx("span", { className: "wx-day-icon", children: /* @__PURE__ */ c.jsx(xu, { code: p.code }) }),
          /* @__PURE__ */ c.jsx("span", { className: "wx-day-text", children: p.text }),
          /* @__PURE__ */ c.jsx("span", { className: `wx-rain${p.rain >= 30 ? " on" : ""}`, children: p.rain >= 20 ? `${p.rain}%` : "" }),
          /* @__PURE__ */ c.jsxs("span", { className: "wx-lo", children: [
            u(p.min),
            "°"
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: "wx-range", children: /* @__PURE__ */ c.jsx("i", { style: { left: `${(p.min - b) / v * 100}%`, width: `${Math.max(6, (p.max - p.min) / v * 100)}%` } }) }),
          /* @__PURE__ */ c.jsxs("span", { className: "wx-hi", children: [
            u(p.max),
            "°"
          ] })
        ] }, p.day)) }) : /* @__PURE__ */ c.jsx("p", { className: "wx-trip-note", children: g.note || "No forecast yet" })
      ] }, g.id);
    })
  ] });
}
const ZT = {
  reading: hs,
  writing: q2,
  searching: wc,
  running: F2,
  waiting: O2,
  failed: sv,
  done: si,
  idle: uh
};
function QT() {
  const [a, s] = x.useState(() => {
    const u = localStorage.getItem("aibo-chat-theme");
    return u === "light" || u === "dark" ? u : "system";
  });
  return x.useEffect(() => {
    const u = matchMedia("(prefers-color-scheme: dark)"), f = () => {
      document.documentElement.classList.toggle("dark", a === "dark" || a === "system" && u.matches);
    };
    if (f(), a === "system")
      return u.addEventListener("change", f), () => u.removeEventListener("change", f);
  }, [a]), [a, (u) => {
    s(u), u === "system" ? localStorage.removeItem("aibo-chat-theme") : localStorage.setItem("aibo-chat-theme", u);
  }];
}
const KT = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA", By = typeof MediaSource < "u" && MediaSource.isTypeSupported("audio/mpeg");
function IT(a, s) {
  const [o, u] = x.useState(""), [f, d] = x.useState(!1), m = x.useRef(0), g = x.useRef(null), b = x.useRef(!1), S = x.useRef(null), v = x.useRef(null), p = x.useRef(null), N = x.useRef(/* @__PURE__ */ new Map()), T = (F, Z) => {
    const B = N.current;
    for (B.delete(F), B.set(F, Z); B.size > 24; ) {
      const G = B.keys().next().value;
      if (G === void 0) break;
      B.delete(G);
    }
  }, E = () => {
    if (!g.current) {
      const F = new Audio();
      F.preload = "auto", g.current = F;
    }
    return g.current;
  }, L = x.useCallback(() => {
    m.current += 1, v.current?.abort(), v.current = null, S.current = null, g.current && (g.current.pause(), g.current.onended = null, g.current.onerror = null), p.current && (URL.revokeObjectURL(p.current), p.current = null), d(!1), u("");
  }, []), k = x.useCallback(async (F, Z) => {
    const B = E();
    B.onended = () => {
      Z === m.current && L();
    }, B.onerror = () => {
      Z === m.current && (L(), u(el("speech_error")));
    }, B.src = F, await B.play(), Z === m.current && (d(!0), u("Speaking…"));
  }, [L]), V = x.useCallback(async (F, Z) => {
    try {
      await k(F, Z);
    } catch (B) {
      if (B instanceof DOMException && B.name === "NotAllowedError")
        S.current = () => k(F, Z), u("Click or press a key to hear the reply");
      else throw B;
    }
  }, [k]), X = x.useCallback(async (F, Z) => {
    const B = new MediaSource(), G = URL.createObjectURL(B);
    p.current = G;
    const ce = new Promise((W, we) => {
      B.addEventListener("sourceopen", () => {
        try {
          W(B.addSourceBuffer("audio/mpeg"));
        } catch (he) {
          we(he);
        }
      }, { once: !0 }), B.addEventListener("error", () => we(new Error("speech_error")), { once: !0 });
    }), Te = E();
    Te.onended = () => {
      Z === m.current && L();
    }, Te.onerror = () => {
      Z === m.current && (L(), u(el("speech_error")));
    }, Te.src = G, Te.play().then(
      () => {
        Z === m.current && (d(!0), u("Speaking…"));
      },
      (W) => {
        Z === m.current && (W instanceof DOMException && W.name === "NotAllowedError" ? (S.current = async () => {
          await Te.play(), Z === m.current && (d(!0), u("Speaking…"));
        }, u("Click or press a key to hear the reply")) : (L(), u(el("speech_error"))));
      }
    );
    const de = await ce, xe = [], pe = F.getReader();
    for (; ; ) {
      const { done: W, value: we } = await pe.read();
      if (Z !== m.current)
        return await pe.cancel().catch(() => {
        }), null;
      if (W) break;
      xe.push(we), de.appendBuffer(we), await new Promise((he, J) => {
        de.addEventListener("updateend", () => he(), { once: !0 }), de.addEventListener("error", () => J(new Error("speech_error")), { once: !0 });
      });
    }
    return B.readyState === "open" && B.endOfStream(), new Blob(xe, { type: "audio/mpeg" });
  }, [L]), U = x.useCallback((F) => {
    if (L(), !a || F.trim() === "") return;
    const Z = m.current, B = new AbortController();
    v.current = B, u("Preparing voice…"), (async () => {
      try {
        const G = `${s}
${F}`, ce = N.current.get(G);
        if (ce === void 0) {
          const de = await fetch(rt("/voice/read"), { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text: F, language: s, dub: !0, stream: By }), signal: B.signal });
          if (!de.ok) throw new Error((await de.json().catch(() => ({ error: "speech_error" }))).error ?? "speech_error");
          if (Z !== m.current) return;
          if (By && de.body !== null && (de.headers.get("content-type") ?? "").startsWith("audio/mpeg")) {
            const W = await X(de.body, Z);
            W !== null && Z === m.current && T(G, W);
            return;
          }
          const xe = await de.blob();
          if (T(G, xe), Z !== m.current) return;
          const pe = URL.createObjectURL(xe);
          p.current = pe, await V(pe, Z);
          return;
        }
        if (Z !== m.current) return;
        const Te = URL.createObjectURL(ce);
        p.current = Te, await V(Te, Z);
      } catch (G) {
        if (Z !== m.current) return;
        L(), G instanceof DOMException && G.name === "AbortError" || u(el(G.message));
      }
    })();
  }, [a, s, L, V, X]);
  return x.useEffect(() => {
    const F = () => {
      if (S.current) {
        const B = S.current;
        S.current = null, B().catch(() => u(el("speech_error"))), b.current = !0;
        return;
      }
      if (b.current) return;
      const Z = E();
      if (!Z.paused) {
        b.current = !0;
        return;
      }
      v.current === null && (Z.src = KT, Z.play().then(() => {
        b.current = !0;
      }).catch(() => {
      }));
    };
    return window.addEventListener("pointerdown", F, !0), window.addEventListener("keydown", F, !0), () => {
      window.removeEventListener("pointerdown", F, !0), window.removeEventListener("keydown", F, !0);
    };
  }, [k]), x.useEffect(() => (window.addEventListener("pagehide", L), () => window.removeEventListener("pagehide", L)), [L]), { speak: U, stop: L, status: o, speaking: f };
}
const JT = [
  ["excited", /耳根|脸红|红了|笑出声|眼睛(一)?亮|亮晶晶|兴奋|开心|雀跃|蹦|拍手|欢呼|哼歌|尾巴.{0,6}(甩|摇|晃|摆|勾|翘)|得意|blush|grin|excited|beam/i],
  // Comforting gestures land here too: the downcast, cooler-lit row reads as
  // sympathy when she is the one doing the consoling.
  ["sad", /眼神软|心疼|叹(了口)?气|难过|低落|失落|委屈|眼眶|鼻子一酸|垂下|耷拉|落寞|黯|放(得更|得|)轻|轻声|挨着|陪你|拍了拍|揉了揉|摸摸|温柔|sigh|sad|tear|softly|gentl/i],
  ["surprised", /愣住|愣了|一惊|瞪大|吓了一跳|惊讶|睁大|张大嘴|噎|surpris|startle|blink/i],
  ["reading", /皱眉|板起脸|沉思|想了想|思索|歪头|眯起眼|认真|盯着|frown|ponder|think/i],
  ["done", /满意|微笑|笑了笑|点头|轻笑|笑着|弯起|抿嘴笑|smile|nod|chuckle/i]
], FT = /[（(]([^（）()\n]{1,60})[）)]/g;
function qy(a) {
  let s = null;
  for (const o of a.matchAll(FT)) {
    let u = -1;
    for (const [f, d] of JT) {
      const m = o[1].search(d);
      m > u && (u = m, s = f);
    }
  }
  return s;
}
function PT() {
  const [a, s] = x.useState(null), [o, u] = x.useState([]), [f, d] = x.useState(!1), [m, g] = x.useState("idle"), [b, S] = x.useState(null), [v, p] = x.useState(null), [N, T] = x.useState(!1), [E, L] = x.useState(null), [k, V] = x.useState(!1), [X, U] = x.useState(""), [F, Z] = x.useState(null), [B, G] = x.useState("pick"), [ce, Te] = x.useState(null), [de, xe] = x.useState([]), [pe, W] = x.useState([]), [we, he] = x.useState(null), [J, re] = x.useState([]), [be, Ue] = x.useState(0), [K, Ge] = x.useState(() => localStorage.getItem("aibo-voice") !== "off"), [st, hn] = x.useState(() => {
    const Q = localStorage.getItem("aibo-speech-language");
    return Q === "zh" || Q === "en" || Q === "ja" ? Q : "auto";
  }), [_, q] = QT(), fe = vE(), me = st === "auto" ? fe : st, ve = IT(K, me), Me = x.useRef(null), De = x.useRef(null), ue = x.useRef(""), Se = x.useRef(null), Dt = (Q) => {
    typeof Q.voice == "boolean" && (Ge(Q.voice), localStorage.setItem("aibo-voice", Q.voice ? "on" : "off"));
    const ee = Q.speechLanguage;
    (ee === "auto" || ee === "zh" || ee === "en" || ee === "ja") && (hn(ee), localStorage.setItem("aibo-speech-language", ee));
  }, Nl = x.useRef(Dt);
  Nl.current = Dt, x.useEffect(() => {
    tl("/settings").then(Dt).catch(() => {
    });
  }, []);
  const He = (Q) => {
    Dt({ voice: Q }), Q || ve.stop(), $n("/settings", { voice: Q }).catch(() => ye("Could not save the voice setting"));
  }, Vt = (Q) => {
    Dt({ speechLanguage: Q }), ve.stop(), $n("/settings", { speechLanguage: Q }).catch(() => ye("Could not save the speech language"));
  }, ye = x.useCallback((Q) => {
    U(Q), De.current !== null && window.clearTimeout(De.current), De.current = window.setTimeout(() => U(""), 6500);
  }, []), Ve = x.useRef(ve.speak);
  Ve.current = ve.speak;
  const ut = x.useRef(ve.stop);
  ut.current = ve.stop;
  const mn = x.useRef(fe);
  mn.current = fe;
  const ln = x.useCallback((Q) => {
    switch (Q.type) {
      case "user":
        ut.current(), p(null), u((ee) => [...ls(ee), { kind: "msg", key: Kt(), role: "user", text: String(Q.text ?? ""), at: Date.now(), ...Array.isArray(Q.attachments) ? { attachments: Q.attachments } : {} }]), d(!0);
        break;
      case "status": {
        const ee = { activity: String(Q.activity ?? "reading"), text: String(Q.tool ?? Q.text ?? ""), ...Q.command === void 0 ? {} : { command: String(Q.command) } };
        u((Ee) => {
          const le = Ee[Ee.length - 1], Qe = le?.kind === "msg" && le.streaming && le.text === "" ? Ee.slice(0, -1) : Ee, ot = Qe[Qe.length - 1];
          return ot?.kind === "steps" ? [...Qe.slice(0, -1), { ...ot, steps: [...ot.steps, ee], live: !0 }] : [...Qe, { kind: "steps", key: Kt(), steps: [ee], live: !0 }];
        }), Q.activity && g(String(Q.activity)), p(null);
        break;
      }
      case "activity":
        if (Q.beat) {
          S(String(Q.activity)), window.setTimeout(() => S(null), 2600), Q.activity === "failed" && u((ee) => {
            const Ee = ee[ee.length - 1];
            if (Ee?.kind !== "steps" || Ee.steps.length === 0) return ee;
            const le = [...Ee.steps];
            return le[le.length - 1] = { ...le[le.length - 1], failed: !0 }, [...ee.slice(0, -1), { ...Ee, steps: le }];
          });
          break;
        }
        g(String(Q.activity)), Q.activity === "done" && (Me.current !== null && window.clearTimeout(Me.current), Me.current = window.setTimeout(() => g((ee) => ee === "done" ? "idle" : ee), 3e4));
        break;
      case "delta":
        if (Q.reset) {
          u((ee) => [...ls(Su(ee)), { kind: "msg", key: Kt(), role: "assistant", text: "", streaming: !0, at: Date.now() }]), p(null), g("writing");
          break;
        }
        if (Q.done) break;
        typeof Q.text == "string" && u((ee) => {
          const Ee = $y(ee);
          if (Ee === -1) return [...ls(ee), { kind: "msg", key: Kt(), role: "assistant", text: Q.text, streaming: !0, at: Date.now() }];
          const le = ee[Ee], Qe = le.text + Q.text, ot = qy(Qe);
          return ot && p(ot), [...ee.slice(0, Ee), { ...le, text: Qe }, ...ee.slice(Ee + 1)];
        });
        break;
      case "assistant": {
        const ee = String(Q.text ?? "");
        u((le) => {
          const Qe = $y(le), ot = { kind: "msg", key: Kt(), role: "assistant", text: ee, at: Date.now() };
          return Qe === -1 ? [...ls(le), ot] : Su([...le.slice(0, Qe), ot, ...le.slice(Qe + 1)]);
        });
        const Ee = qy(ee);
        Ee && p(Ee), ue.current = ee, Ve.current(ee);
        break;
      }
      case "busy":
        d(!!Q.value), Q.value || u((ee) => ls(Su(ee)));
        break;
      case "session":
        u([{ kind: "notice", key: Kt(), text: "New session" }]), d(!1), g("idle"), p(null);
        break;
      case "manifest":
        s(Q.manifest), L(null);
        break;
      case "snapshot": {
        const ee = Array.isArray(Q.entries) ? Q.entries : [], Ee = [];
        for (const le of ee)
          if (le.role === "status") {
            const Qe = { activity: String(le.activity ?? "reading"), text: String(le.tool ?? le.text ?? ""), ...le.command === void 0 ? {} : { command: String(le.command) }, ...le.failed ? { failed: !0 } : {} }, ot = Ee[Ee.length - 1];
            ot?.kind === "steps" ? ot.steps.push(Qe) : Ee.push({ kind: "steps", key: Kt(), steps: [Qe], live: !1 });
          } else le.role === "list" && le.list ? Ee.push({ kind: "list", key: Kt(), list: le.list }) : le.role === "question" && Array.isArray(le.questions) ? Ee.push({ kind: "question", key: Kt(), id: String(le.id ?? ""), questions: le.questions, ...Array.isArray(le.answers) ? { answers: le.answers } : {}, ...le.cancelled ? { cancelled: !0 } : {} }) : (le.role === "user" || le.role === "assistant") && Ee.push({ kind: "msg", key: Kt(), role: le.role, text: le.text, at: 0, ...Array.isArray(le.attachments) ? { attachments: le.attachments } : {} });
        if (Ee.length > 0) {
          u(Ee);
          const le = Ee[Ee.length - 1];
          le.kind === "msg" && le.role === "assistant" && (ue.current = le.text);
        }
        Array.isArray(Q.artifacts) && re(Q.artifacts);
        break;
      }
      case "artifact":
        Array.isArray(Q.artifacts) && re(Q.artifacts), Q.fresh && Q.artifact && u((ee) => [...ee, { kind: "artifact", key: Kt(), artifact: Q.artifact }]);
        break;
      case "memory":
        Array.isArray(Q.entries) && xe(Q.entries);
        break;
      case "sources":
        Ue((ee) => ee + 1);
        break;
      case "question": {
        const ee = String(Q.id ?? "");
        Array.isArray(Q.questions) ? u((Ee) => [...ls(Su(Ee)), { kind: "question", key: Kt(), id: ee, questions: Q.questions }]) : u((Ee) => Ee.map((le) => le.kind === "question" && le.id === ee ? { ...le, ...Array.isArray(Q.answers) ? { answers: Q.answers } : {}, ...Q.cancelled === !0 ? { cancelled: !0 } : {} } : le));
        break;
      }
      case "notice":
        typeof Q.text == "string" && u((ee) => [...ee, { kind: "notice", key: Kt(), text: Q.text }]);
        break;
      case "settings":
        Q.prefs && Nl.current(Q.prefs);
        break;
      case "lists": {
        const ee = Array.isArray(Q.lists) ? Q.lists : [];
        W(ee);
        const Ee = typeof Q.fresh == "string" ? ee.find((le) => le.id === Q.fresh) : void 0;
        Ee && u((le) => [...le, { kind: "list", key: Kt(), list: Ee }]);
        break;
      }
    }
  }, []);
  x.useEffect(() => {
    let Q = null;
    return tl("/manifest.json").then((ee) => {
      s(ee), Q = new EventSource(rt("/events")), Q.onopen = () => V(!0), Q.onerror = () => V(!1), Q.onmessage = (Ee) => {
        try {
          ln(JSON.parse(Ee.data));
        } catch {
        }
      };
    }).catch(() => u([{ kind: "notice", key: Kt(), text: "Could not reach the Aibo server." }])), () => {
      Q?.close();
    };
  }, [ln]), x.useEffect(() => {
    a && (document.title = `${a.characterName} · Aibo`);
  }, [a?.characterName]);
  const Oe = x.useCallback((Q, ee) => {
    ee?.tab && G(ee.tab), Te(ee?.file ?? null), Z(Q);
  }, []), Yn = x.useCallback(async () => {
    try {
      await fetch(rt("/session/new"), { method: "POST" });
    } catch (Q) {
      ye(`Could not start a session: ${Q.message}`);
    }
  }, [ye]), pn = x.useCallback(() => {
    ue.current !== "" && ve.speak(ue.current);
  }, [ve]), jl = x.useCallback(async (Q) => {
    const [ee, ...Ee] = Q.trim().split(/\s+/), le = Ee.join(" ");
    switch (ee) {
      case "/new":
        await Yn();
        return;
      case "/char":
        if (le === "") {
          Oe("character", { tab: "pick" });
          return;
        }
        try {
          await $n("/character", { id: le });
        } catch {
          ye(`Unknown character "${le}"`);
        }
        return;
      case "/edit":
        Oe("character", { tab: "persona" });
        return;
      case "/gallery":
        Oe("character", { tab: "art" });
        return;
      case "/memory":
        Oe("memory");
        return;
      case "/files":
        Oe("files");
        return;
      case "/lists":
        Oe("lists");
        return;
      case "/data":
        Oe("data");
        return;
      case "/voice":
        He(!K), ye(K ? "Voice off." : "Voice on.");
        return;
      case "/help":
        Oe("help");
        return;
      default:
        ye(`Unknown command ${ee}. Try /help.`);
    }
  }, [Yn, ye, Oe, K]), El = x.useCallback(async (Q, ee = []) => {
    if (Q.startsWith("/") && ee.length === 0) {
      await jl(Q);
      return;
    }
    const Ee = await Promise.all(ee.map(async (Qe) => ({ kind: Qe.kind, name: Qe.file.name || (Qe.kind === "image" ? "pasted.png" : "file"), mediaType: Qe.file.type || "application/octet-stream", data: await rw(Qe.file) }))), le = await fetch(rt("/send"), { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text: Q, attachments: Ee }) });
    if (!le.ok) throw new Error(await le.text());
  }, [jl]);
  x.useEffect(() => {
    const Q = (ee) => {
      if (ee.isComposing) return;
      const le = !!ee.target?.closest?.("input,textarea,select,[contenteditable]");
      if (ee.altKey && !ee.metaKey && !ee.ctrlKey) {
        const ot = {
          KeyM: () => Oe("memory"),
          KeyF: () => Oe("files"),
          KeyL: () => Oe("lists"),
          KeyD: () => Oe("data"),
          KeyC: () => Oe("character"),
          KeyS: () => Oe("settings"),
          KeyV: () => {
            He(!K);
          },
          KeyR: pn,
          Slash: () => Oe("help")
        }[ee.code];
        if (ot) {
          ee.preventDefault(), ot();
          return;
        }
      }
      le || F !== null || (ee.key === "/" || ee.key === "、" || ee.key === "／") && (ee.preventDefault(), Se.current?.focus());
    };
    return window.addEventListener("keydown", Q), () => window.removeEventListener("keydown", Q);
  }, [Oe, F, pn, K]);
  const Jt = ve.speaking || ve.status === "Preparing voice…";
  x.useEffect(() => {
    if (f || Jt || v === null) return;
    const Q = window.setTimeout(() => p(null), 6e3);
    return () => window.clearTimeout(Q);
  }, [f, Jt, v]);
  const an = E ?? b ?? (f ? m === "waiting" ? "waiting" : v ?? m : ve.speaking ? v ?? "speaking" : v ?? (m === "done" ? "done" : m === "waiting" ? "waiting" : N ? "listening" : "idle")), vt = a?.characterName ?? "…", Ft = (Q) => {
    Q || Z(null);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: `app${Yy ? " shell" : ""}`, children: [
    Yy && /* @__PURE__ */ c.jsx(WT, {}),
    /* @__PURE__ */ c.jsxs("section", { className: "chat", children: [
      /* @__PURE__ */ c.jsxs("header", { className: "chat-header", children: [
        /* @__PURE__ */ c.jsxs("button", { type: "button", className: "who", title: "Character (⌥C)", onClick: () => Oe("character"), children: [
          /* @__PURE__ */ c.jsx(ew, { manifest: a }),
          /* @__PURE__ */ c.jsxs("div", { className: "who-text", children: [
            /* @__PURE__ */ c.jsx("span", { className: "who-name", children: vt }),
            /* @__PURE__ */ c.jsxs("span", { className: `who-state${f || ve.speaking ? " busy" : ""}${k ? "" : " off"}`, children: [
              /* @__PURE__ */ c.jsx("i", { className: "dot" }),
              k ? f ? fs[m] ?? m : ve.speaking ? "Speaking" : fs[an] ?? an : "Disconnected"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: "header-actions", children: [
          /* @__PURE__ */ c.jsx(as, { title: K ? "Voice on (⌥V)" : "Voice off (⌥V)", onClick: () => He(!K), active: K, children: K ? /* @__PURE__ */ c.jsx(rv, {}) : /* @__PURE__ */ c.jsx(tS, {}) }),
          /* @__PURE__ */ c.jsx(as, { title: "Memory (⌥M)", onClick: () => Oe("memory"), children: /* @__PURE__ */ c.jsx(h2, {}) }),
          /* @__PURE__ */ c.jsx(as, { title: "Files (⌥F)", onClick: () => Oe("files"), children: /* @__PURE__ */ c.jsx(A2, {}) }),
          /* @__PURE__ */ c.jsx(as, { title: "Lists (⌥L)", onClick: () => Oe("lists"), children: /* @__PURE__ */ c.jsx(_c, {}) }),
          /* @__PURE__ */ c.jsx(as, { title: "Connectors (⌥D)", onClick: () => Oe("data"), children: /* @__PURE__ */ c.jsx(rh, {}) }),
          /* @__PURE__ */ c.jsx(as, { title: "Settings (⌥S)", onClick: () => Oe("settings"), children: /* @__PURE__ */ c.jsx(X2, {}) })
        ] })
      ] }),
      /* @__PURE__ */ c.jsx(tw, { items: o, lists: pe, name: vt, busy: f, onReplay: (Q) => ve.speak(Q), onOpenFile: (Q) => Oe("files", { file: Q }), onOpenList: (Q) => {
        he(Q), Oe("lists");
      } }),
      /* @__PURE__ */ c.jsx(uw, { ref: Se, onSend: El, busy: f, name: vt, notice: X, voiceStatus: ve.speaking ? "" : ve.status, speaking: ve.speaking, onStopVoice: ve.stop, onTyping: T })
    ] }),
    /* @__PURE__ */ c.jsx(ow, { manifest: a, activity: an, name: vt }),
    /* @__PURE__ */ c.jsx(
      kE,
      {
        open: F === "character",
        onOpenChange: Ft,
        tab: B,
        setTab: G,
        manifest: a,
        lang: fe,
        preview: E,
        setPreview: L,
        notify: ye,
        onManifestChange: (Q) => s((ee) => ee && { ...ee, ...Q })
      }
    ),
    /* @__PURE__ */ c.jsx(OE, { open: F === "memory", onOpenChange: Ft, entries: de, setEntries: xe, notify: ye }),
    /* @__PURE__ */ c.jsx(ME, { open: F === "lists", onOpenChange: Ft, lists: pe, setLists: W, openId: we, notify: ye }),
    /* @__PURE__ */ c.jsx(BE, { open: F === "files", onOpenChange: Ft, artifacts: J, setArtifacts: re, openId: ce, notify: ye }),
    /* @__PURE__ */ c.jsx(XE, { open: F === "settings", onOpenChange: Ft, theme: _, setTheme: q, voiceOn: K, setVoiceOn: He, speechPref: st, setSpeechPref: Vt, speechLang: me, onNewSession: () => {
      Yn();
    }, stopVoice: ve.stop, onHelp: () => Oe("help") }),
    /* @__PURE__ */ c.jsx(MT, { open: F === "data", onOpenChange: Ft, version: be, notify: ye }),
    /* @__PURE__ */ c.jsx(GE, { open: F === "help", onOpenChange: Ft })
  ] });
}
function ls(a) {
  const s = a[a.length - 1];
  return s?.kind === "steps" && s.live ? [...a.slice(0, -1), { ...s, live: !1 }] : a;
}
function Su(a) {
  return a.filter((s) => !(s.kind === "msg" && s.streaming && s.text === "")).map((s) => s.kind === "msg" && s.streaming ? { ...s, streaming: !1 } : s);
}
function $y(a) {
  for (let s = a.length - 1; s >= 0; s--) {
    const o = a[s];
    if (o.kind === "msg" && o.streaming) return s;
  }
  return -1;
}
const Yy = new URLSearchParams(location.search).get("shell") === "desktop";
function WT() {
  return /* @__PURE__ */ c.jsx("div", { className: "titlebar", "data-tauri-drag-region": !0 });
}
function ew({ manifest: a }) {
  const s = a?.states.idle?.image;
  return s ? /* @__PURE__ */ c.jsx("img", { className: "avatar", src: rt(s), alt: "" }) : /* @__PURE__ */ c.jsx("div", { className: "avatar avatar-letter", children: (a?.characterName ?? "?").slice(0, 1) });
}
function as({ title: a, onClick: s, active: o, children: u }) {
  return /* @__PURE__ */ c.jsx("button", { type: "button", className: `icon-button${o ? " active" : ""}`, title: a, "aria-label": a, onClick: s, children: u });
}
function tw({ items: a, lists: s, name: o, busy: u, onReplay: f, onOpenFile: d, onOpenList: m }) {
  const g = x.useRef(null), b = x.useRef(!0);
  x.useLayoutEffect(() => {
    const p = g.current;
    p && b.current && (p.scrollTop = p.scrollHeight);
  });
  const S = () => {
    const p = g.current;
    p && (b.current = p.scrollHeight - p.scrollTop - p.clientHeight < 48);
  }, v = a[a.length - 1]?.kind === "steps";
  return /* @__PURE__ */ c.jsx("div", { className: "messages", ref: g, onScroll: S, children: /* @__PURE__ */ c.jsxs("div", { className: "messages-inner", children: [
    a.map((p) => {
      switch (p.kind) {
        case "msg":
          return p.role === "user" ? /* @__PURE__ */ c.jsx(nw, { text: p.text, attachments: p.attachments }, p.key) : /* @__PURE__ */ c.jsx(lw, { name: o, text: p.text, streaming: p.streaming === !0, onReplay: f }, p.key);
        case "steps":
          return /* @__PURE__ */ c.jsx(aw, { steps: p.steps, live: p.live }, p.key);
        case "artifact":
          return /* @__PURE__ */ c.jsx(cw, { artifact: p.artifact, onOpen: () => d(p.artifact.id) }, p.key);
        case "list":
          return /* @__PURE__ */ c.jsx(sw, { list: s.find((N) => N.id === p.list.id) ?? p.list, onOpen: () => m(p.list.id) }, p.key);
        case "question":
          return /* @__PURE__ */ c.jsx(iw, { item: p, name: o }, p.key);
        case "notice":
          return /* @__PURE__ */ c.jsx("div", { className: "notice", children: p.text }, p.key);
      }
    }),
    u && !v && !a.some((p) => p.kind === "msg" && p.streaming) && /* @__PURE__ */ c.jsxs("div", { className: "turn assistant", children: [
      /* @__PURE__ */ c.jsx("div", { className: "turn-label", children: o }),
      /* @__PURE__ */ c.jsx("span", { className: "shimmer", children: "Thinking…" })
    ] })
  ] }) });
}
function nw({ text: a, attachments: s }) {
  const o = (s ?? []).filter((f) => f.kind === "image" && f.url), u = (s ?? []).filter((f) => !(f.kind === "image" && f.url));
  return /* @__PURE__ */ c.jsxs("div", { className: "turn user", children: [
    o.length > 0 && /* @__PURE__ */ c.jsx("div", { className: `bubble-images n${Math.min(o.length, 3)}`, children: o.map((f, d) => /* @__PURE__ */ c.jsx("a", { href: rt(f.url), target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ c.jsx("img", { src: rt(f.url), alt: f.name, loading: "lazy" }) }, d)) }),
    u.length > 0 && /* @__PURE__ */ c.jsx("div", { className: "bubble-files", children: u.map((f, d) => /* @__PURE__ */ c.jsxs("span", { className: "bubble-file", children: [
      /* @__PURE__ */ c.jsx(zd, {}),
      /* @__PURE__ */ c.jsx("b", { children: f.name }),
      f.bytes > 0 && /* @__PURE__ */ c.jsx("small", { children: Bu(f.bytes) })
    ] }, d)) }),
    a !== "" && /* @__PURE__ */ c.jsx("div", { className: "bubble", children: a })
  ] });
}
function lw({ name: a, text: s, streaming: o, onReplay: u }) {
  const [f, d] = x.useState(!1), m = x.useMemo(() => bh(s), [s]), g = async () => {
    try {
      await navigator.clipboard.writeText(s), d(!0), window.setTimeout(() => d(!1), 1500);
    } catch {
    }
  };
  return /* @__PURE__ */ c.jsxs("div", { className: "turn assistant", children: [
    /* @__PURE__ */ c.jsx("div", { className: "turn-label", children: a }),
    s === "" && o ? /* @__PURE__ */ c.jsx("span", { className: "shimmer", children: "Thinking…" }) : /* @__PURE__ */ c.jsx("div", { className: `prose${o ? " streaming" : ""}`, dangerouslySetInnerHTML: { __html: m } }),
    !o && s !== "" && /* @__PURE__ */ c.jsxs("div", { className: "turn-actions", children: [
      /* @__PURE__ */ c.jsxs("button", { type: "button", className: "text-button", onClick: () => {
        g();
      }, children: [
        f ? /* @__PURE__ */ c.jsx(si, {}) : /* @__PURE__ */ c.jsx(sh, {}),
        f ? "Copied" : "Copy"
      ] }),
      /* @__PURE__ */ c.jsxs("button", { type: "button", className: "text-button", onClick: () => u(s), children: [
        /* @__PURE__ */ c.jsx(rv, {}),
        "Replay"
      ] })
    ] })
  ] });
}
function aw({ steps: a, live: s }) {
  const [o, u] = x.useState(!1), f = s || o, d = a.filter((b) => b.failed).length, m = `${a.length} step${a.length === 1 ? "" : "s"}`, g = s ? Gy(a[a.length - 1]) : d ? `Worked through ${m}, ${d} didn't go through` : `Worked through ${m}`;
  return /* @__PURE__ */ c.jsxs("div", { className: `steps${s ? " live" : ""}`, children: [
    /* @__PURE__ */ c.jsxs("button", { type: "button", className: "steps-head", onClick: () => u((b) => !b), "aria-expanded": f, children: [
      f ? /* @__PURE__ */ c.jsx(p2, { className: "chev" }) : /* @__PURE__ */ c.jsx(Iy, { className: "chev" }),
      /* @__PURE__ */ c.jsx("span", { className: s ? "shimmer" : "", children: g })
    ] }),
    f && /* @__PURE__ */ c.jsx("ol", { className: "steps-list", children: a.map((b, S) => {
      const v = ZT[b.failed ? "failed" : b.activity] ?? hs;
      return /* @__PURE__ */ c.jsxs("li", { className: b.failed ? "failed" : "", children: [
        /* @__PURE__ */ c.jsx(v, { className: "step-icon" }),
        /* @__PURE__ */ c.jsx("span", { className: "step-text", children: Gy(b) }),
        b.command && /* @__PURE__ */ c.jsx("code", { className: "step-cmd", title: b.command, children: b.command })
      ] }, S);
    }) })
  ] });
}
function Gy(a) {
  if (!a) return "";
  const s = fs[a.activity] ?? a.activity, o = a.text.replace(/…$/, "");
  return o ? `${s} · ${o}` : s;
}
function iw({ item: a, name: s }) {
  const [o, u] = x.useState({}), [f, d] = x.useState({}), [m, g] = x.useState(!1), [b, S] = x.useState(""), v = a.answers !== void 0 || a.cancelled === !0, p = (k) => {
    const V = a.answers?.find((X) => X.id === k.id);
    return V ? [...V.selected, ...V.custom ? [V.custom] : []] : [];
  }, N = a.questions.every((k) => (o[k.id]?.length ?? 0) > 0 || (f[k.id]?.trim() ?? "") !== ""), T = async (k) => {
    g(!0), S("");
    try {
      await $n("/question", { id: a.id, answers: k });
    } catch (V) {
      S(V.message);
    } finally {
      g(!1);
    }
  }, E = () => a.questions.map((k) => {
    const V = f[k.id]?.trim() ?? "", X = o[k.id] ?? [];
    return { id: k.id, selected: V !== "" && k.multiSelect !== !0 ? [] : X, ...V !== "" ? { custom: V } : {} };
  }), L = (k, V) => {
    if (!(v || m)) {
      if (k.multiSelect) {
        u((X) => {
          const U = X[k.id] ?? [];
          return { ...X, [k.id]: U.includes(V) ? U.filter((F) => F !== V) : [...U, V] };
        });
        return;
      }
      u((X) => ({ ...X, [k.id]: [V] })), a.questions.length === 1 && (f[k.id]?.trim() ?? "") === "" && T([{ id: k.id, selected: [V] }]);
    }
  };
  return /* @__PURE__ */ c.jsxs("div", { className: "turn assistant", children: [
    /* @__PURE__ */ c.jsx("span", { className: "turn-label", children: s }),
    /* @__PURE__ */ c.jsxs("div", { className: `question${v ? " settled" : ""}${a.cancelled ? " cancelled" : ""}`, children: [
      a.questions.map((k) => {
        const V = v ? p(k) : o[k.id] ?? [];
        return /* @__PURE__ */ c.jsxs("section", { className: "question-item", children: [
          k.header && /* @__PURE__ */ c.jsx("span", { className: "question-header", children: k.header }),
          /* @__PURE__ */ c.jsx("p", { className: "question-text", children: k.question }),
          k.detail && /* @__PURE__ */ c.jsx("pre", { className: "question-detail", children: k.detail }),
          (k.options ?? []).length > 0 && /* @__PURE__ */ c.jsx("div", { className: "question-options", role: k.multiSelect ? "group" : "radiogroup", children: (k.options ?? []).map((X) => {
            const U = V.includes(X.label);
            return v && !U ? null : /* @__PURE__ */ c.jsxs("button", { type: "button", className: `question-option${U ? " on" : ""}`, role: k.multiSelect ? "checkbox" : "radio", "aria-checked": U, disabled: v || m, onClick: () => L(k, X.label), title: X.description, children: [
              /* @__PURE__ */ c.jsx("span", { className: "question-check", children: k.multiSelect ? /* @__PURE__ */ c.jsx(Q2, {}) : /* @__PURE__ */ c.jsx(si, {}) }),
              /* @__PURE__ */ c.jsxs("span", { className: "question-option-text", children: [
                /* @__PURE__ */ c.jsx("b", { children: X.label }),
                X.description && /* @__PURE__ */ c.jsx("small", { children: X.description })
              ] })
            ] }, X.label);
          }) }),
          v ? p(k).length === 0 ? /* @__PURE__ */ c.jsx("span", { className: "question-skipped", children: a.cancelled ? "No longer waiting" : "Skipped" }) : p(k).some((X) => !(k.options ?? []).some((U) => U.label === X)) && /* @__PURE__ */ c.jsx("p", { className: "question-custom-answer", children: p(k).filter((X) => !(k.options ?? []).some((U) => U.label === X)).join(" · ") }) : /* @__PURE__ */ c.jsx("input", { className: "input question-custom", placeholder: (k.options ?? []).length ? "Other…" : "Type your answer", value: f[k.id] ?? "", disabled: m, onChange: (X) => d((U) => ({ ...U, [k.id]: X.target.value })), onKeyDown: (X) => {
            X.key === "Enter" && N && !m && (X.preventDefault(), T(E()));
          } })
        ] }, k.id);
      }),
      !v && /* @__PURE__ */ c.jsxs("div", { className: "question-actions", children: [
        b && /* @__PURE__ */ c.jsx("span", { className: "question-error", children: b }),
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "button ghost", disabled: m, onClick: () => {
          T(a.questions.map((k) => ({ id: k.id, selected: [] })));
        }, children: "Skip" }),
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "button primary", disabled: !N || m, onClick: () => {
          T(E());
        }, children: m ? "Sending…" : "Reply" })
      ] })
    ] })
  ] });
}
function sw({ list: a, onOpen: s }) {
  const o = a.items.filter((u) => !u.done).length;
  return /* @__PURE__ */ c.jsx("div", { className: "turn assistant", children: /* @__PURE__ */ c.jsxs("div", { className: "artifact list-card", role: "button", tabIndex: 0, onClick: s, onKeyDown: (u) => {
    (u.key === "Enter" || u.key === " ") && (u.preventDefault(), s());
  }, children: [
    /* @__PURE__ */ c.jsx("div", { className: "artifact-thumb", children: /* @__PURE__ */ c.jsx(_c, {}) }),
    /* @__PURE__ */ c.jsxs("div", { className: "artifact-meta", children: [
      /* @__PURE__ */ c.jsx("span", { className: "artifact-name", children: a.title }),
      /* @__PURE__ */ c.jsxs("span", { className: "artifact-sub", children: [
        "List · ",
        o,
        " item",
        o === 1 ? "" : "s",
        a.items.length - o > 0 ? ` · ${a.items.length - o} done` : ""
      ] })
    ] })
  ] }) });
}
function cw({ artifact: a, onOpen: s }) {
  const o = a.kind === "image" ? Tc : Py, u = rt(`/artifact/${encodeURIComponent(a.id)}`), f = async () => {
    await fetch(rt(`/artifact/${encodeURIComponent(a.id)}/reveal`), { method: "POST" });
  };
  return /* @__PURE__ */ c.jsx("div", { className: "turn assistant", children: /* @__PURE__ */ c.jsxs("div", { className: "artifact", role: "button", tabIndex: 0, onClick: s, onKeyDown: (d) => {
    (d.key === "Enter" || d.key === " ") && (d.preventDefault(), s());
  }, children: [
    /* @__PURE__ */ c.jsx("div", { className: `artifact-thumb${a.kind === "image" ? " image" : ""}`, children: a.kind === "image" ? /* @__PURE__ */ c.jsx("img", { src: u, alt: "", loading: "lazy" }) : /* @__PURE__ */ c.jsx(o, {}) }),
    /* @__PURE__ */ c.jsxs("div", { className: "artifact-meta", children: [
      /* @__PURE__ */ c.jsx("span", { className: "artifact-name", children: a.description ?? a.name }),
      /* @__PURE__ */ c.jsxs("span", { className: "artifact-sub", children: [
        a.description ? `${a.name} · ` : "",
        h1(a),
        typeof a.size == "number" ? ` · ${Bu(a.size)}` : ""
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("button", { type: "button", className: "icon-button", title: "Reveal in Finder", "aria-label": "Reveal in Finder", onClick: (d) => {
      d.stopPropagation(), f();
    }, children: /* @__PURE__ */ c.jsx(ev, {}) })
  ] }) });
}
const Nu = 8, Vy = 20 * 1024 * 1024, Xy = 32 * 1024 * 1024;
function rw(a) {
  return new Promise((s, o) => {
    const u = new FileReader();
    u.onload = () => s(String(u.result).replace(/^data:[^,]*,/, "")), u.onerror = () => o(u.error ?? new Error("could not read the file")), u.readAsDataURL(a);
  });
}
const uw = x.forwardRef(
  function({ onSend: s, busy: o, name: u, notice: f, voiceStatus: d, speaking: m, onStopVoice: g, onTyping: b }, S) {
    const [v, p] = x.useState(SE), [N, T] = x.useState(!1);
    x.useEffect(() => {
      b(N && v.trim() !== "");
    }, [N, v, b]);
    const [E, L] = x.useState(""), [k, V] = x.useState([]), [X, U] = x.useState(!1), F = x.useRef(!1), Z = x.useRef(null), B = x.useRef(null);
    x.useImperativeHandle(S, () => Z.current), x.useEffect(() => {
      const W = Z.current;
      W && (W.style.height = "auto", W.style.height = `${Math.min(W.scrollHeight, 240)}px`);
    }, [v]), x.useEffect(() => {
      NE(v);
    }, [v]), x.useEffect(() => {
      let W = !0;
      return EE().then((we) => {
        if (!W) return;
        const he = we.map((J) => {
          const re = new File([J.blob], J.name, { type: J.type });
          return { id: J.id, kind: J.kind, file: re, ...J.kind === "image" ? { preview: URL.createObjectURL(re) } : {} };
        });
        he.length && V((J) => [...he, ...J].slice(0, Nu)), F.current = !0;
      }), () => {
        W = !1;
      };
    }, []), x.useEffect(() => {
      F.current && TE(k.map((W) => ({ id: W.id, kind: W.kind, name: W.file.name, type: W.file.type, blob: W.file })));
    }, [k]);
    const G = (W) => {
      const we = [];
      let he = "";
      for (const J of W) {
        const re = /^image\/(png|jpeg|webp|gif)$/.test(J.type) ? "image" : "file";
        if (J.size !== 0) {
          if (re === "image" && J.size > Vy) {
            he = `${J.name || "image"} is over ${Math.round(Vy / 1048576)} MB`;
            continue;
          }
          if (re === "file" && J.size > Xy) {
            he = `${J.name} is over ${Math.round(Xy / 1048576)} MB`;
            continue;
          }
          we.push({ id: Kt(), kind: re, file: J, ...re === "image" ? { preview: URL.createObjectURL(J) } : {} });
        }
      }
      V((J) => {
        const re = [...J, ...we];
        return re.length > Nu && (he = `At most ${Nu} attachments per message`), re.slice(0, Nu);
      }), he && L(he), Z.current?.focus();
    }, ce = (W) => V((we) => we.filter((he) => he.id !== W)), Te = (W) => {
      const we = [...W.clipboardData.items].filter((he) => he.kind === "file").map((he) => he.getAsFile()).filter((he) => he !== null);
      we.length !== 0 && (W.preventDefault(), G(we));
    }, de = (W) => {
      W.preventDefault(), U(!1), W.dataTransfer.files.length && G(W.dataTransfer.files);
    }, xe = async () => {
      const W = v.trim(), we = k;
      if (!(W === "" && we.length === 0)) {
        p(""), V([]), L("");
        try {
          await s(W, we);
          for (const he of we) he.preview && URL.revokeObjectURL(he.preview);
        } catch (he) {
          p(W), V(we), L(he instanceof Error ? he.message : String(he));
        }
        Z.current?.focus();
      }
    }, pe = E ? { kind: "error", text: E } : f ? { kind: "notice", text: f } : d ? { kind: "voice", text: d } : null;
    return /* @__PURE__ */ c.jsx("div", { className: "composer-dock", onDragOver: (W) => {
      [...W.dataTransfer.types].includes("Files") && (W.preventDefault(), U(!0));
    }, onDragLeave: () => U(!1), onDrop: de, children: /* @__PURE__ */ c.jsxs("div", { className: `composer${o ? " busy" : ""}${X ? " dragging" : ""}`, children: [
      k.length > 0 && /* @__PURE__ */ c.jsx("div", { className: "composer-attachments", children: k.map((W) => /* @__PURE__ */ c.jsxs("div", { className: `composer-attachment ${W.kind}`, title: W.file.name, children: [
        W.preview ? /* @__PURE__ */ c.jsx("img", { src: W.preview, alt: "" }) : /* @__PURE__ */ c.jsxs("span", { className: "composer-attachment-file", children: [
          /* @__PURE__ */ c.jsx(zd, {}),
          /* @__PURE__ */ c.jsx("b", { children: W.file.name }),
          /* @__PURE__ */ c.jsx("small", { children: Bu(W.file.size) })
        ] }),
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "composer-attachment-x", "aria-label": "Remove", onClick: () => ce(W.id), children: /* @__PURE__ */ c.jsx(Sl, {}) })
      ] }, W.id)) }),
      /* @__PURE__ */ c.jsxs("div", { className: "composer-pill", children: [
        /* @__PURE__ */ c.jsx("input", { ref: B, type: "file", multiple: !0, hidden: !0, onChange: (W) => {
          W.target.files && G(W.target.files), W.target.value = "";
        } }),
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "send quiet attach", onClick: () => B.current?.click(), title: "Attach a file (or paste / drop one)", "aria-label": "Attach a file", children: /* @__PURE__ */ c.jsx(zd, {}) }),
        /* @__PURE__ */ c.jsx(
          "textarea",
          {
            ref: Z,
            value: v,
            rows: 1,
            placeholder: X ? "Drop to attach" : `Message ${u}`,
            spellCheck: !1,
            onChange: (W) => {
              p(W.target.value), E && L("");
            },
            onPaste: Te,
            onFocus: () => T(!0),
            onBlur: () => T(!1),
            onKeyDown: (W) => {
              W.key === "Enter" && !W.shiftKey && !W.nativeEvent.isComposing && (W.preventDefault(), xe()), W.key === "Escape" && Z.current?.blur();
            }
          }
        ),
        m && /* @__PURE__ */ c.jsx("button", { type: "button", className: "send quiet", onClick: g, title: "Stop speaking", "aria-label": "Stop speaking", children: /* @__PURE__ */ c.jsx(K2, {}) }),
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "send", onClick: () => {
          xe();
        }, disabled: v.trim() === "" && k.length === 0, title: "Send (Enter)", "aria-label": "Send", children: /* @__PURE__ */ c.jsx(d2, {}) })
      ] }),
      pe && /* @__PURE__ */ c.jsx("div", { className: `composer-chip ${pe.kind}`, role: "status", children: pe.text })
    ] }) });
  }
);
function ow({ manifest: a, activity: s, name: o }) {
  const u = x.useRef(null), f = x.useRef(null), d = x.useRef(null), m = x.useRef(null), g = x.useRef("");
  x.useEffect(() => {
    g.current = "";
  }, [a?.characterId]), x.useEffect(() => {
    if (!a) return;
    const S = a.states[s] ? s : "idle", v = a.states[S];
    if (!(!v || S === g.current))
      if (g.current = S, v.video) {
        const p = m.current === u.current ? f.current : u.current;
        if (!p) return;
        p.src = rt(v.video), p.playbackRate = a.playbackRate || 1, p.play().catch(() => {
        }), p.classList.add("visible"), m.current?.classList.remove("visible"), d.current?.classList.remove("visible"), m.current = p;
      } else v.image && d.current && (d.current.src = rt(v.image), d.current.classList.add("visible"), m.current?.classList.remove("visible"), m.current = null);
  }, [a, s]), x.useEffect(() => {
    for (const S of [u.current, f.current]) S && (S.playbackRate = a?.playbackRate || 1);
  }, [a?.playbackRate]);
  const b = !!(a && Object.keys(a.states).length > 0);
  return /* @__PURE__ */ c.jsx("aside", { className: "stage", children: b ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx("video", { ref: u, className: "layer", muted: !0, loop: !0, playsInline: !0, preload: "auto" }),
    /* @__PURE__ */ c.jsx("video", { ref: f, className: "layer", muted: !0, loop: !0, playsInline: !0, preload: "auto" }),
    /* @__PURE__ */ c.jsx("img", { ref: d, className: "layer", alt: "" })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: "stage-empty", children: [
    /* @__PURE__ */ c.jsx("div", { className: "avatar avatar-letter big", children: o.slice(0, 1) }),
    /* @__PURE__ */ c.jsxs("p", { children: [
      o,
      " has no artwork yet."
    ] })
  ] }) });
}
s2.createRoot(document.getElementById("root")).render(/* @__PURE__ */ c.jsx(PT, {}));

function Fx(a, s) {
  for (var u = 0; u < s.length; u++) {
    const o = s[u];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const f in o)
        if (f !== "default" && !(f in a)) {
          const d = Object.getOwnPropertyDescriptor(o, f);
          d && Object.defineProperty(a, f, d.get ? d : {
            enumerable: !0,
            get: () => o[f]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(a, Symbol.toStringTag, { value: "Module" }));
}
function Jx(a) {
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
  function u(o, f, d) {
    var m = null;
    if (d !== void 0 && (m = "" + d), f.key !== void 0 && (m = "" + f.key), "key" in f) {
      d = {};
      for (var p in f)
        p !== "key" && (d[p] = f[p]);
    } else d = f;
    return f = d.ref, {
      $$typeof: a,
      type: o,
      key: m,
      ref: f !== void 0 ? f : null,
      props: d
    };
  }
  return gc.Fragment = s, gc.jsx = u, gc.jsxs = u, gc;
}
var C0;
function Wx() {
  return C0 || (C0 = 1, md.exports = Px()), md.exports;
}
var c = Wx(), pd = { exports: {} }, we = {};
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
  if (O0) return we;
  O0 = 1;
  var a = Symbol.for("react.transitional.element"), s = Symbol.for("react.portal"), u = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), d = Symbol.for("react.consumer"), m = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), b = Symbol.for("react.suspense"), S = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), g = Symbol.for("react.activity"), j = Symbol.for("react.view_transition"), T = Symbol.iterator;
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
  }, k = Object.assign, X = {};
  function Z(_, q, fe) {
    this.props = _, this.context = q, this.refs = X, this.updater = fe || L;
  }
  Z.prototype.isReactComponent = {}, Z.prototype.setState = function(_, q) {
    if (typeof _ != "object" && typeof _ != "function" && _ != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, _, q, "setState");
  }, Z.prototype.forceUpdate = function(_) {
    this.updater.enqueueForceUpdate(this, _, "forceUpdate");
  };
  function U() {
  }
  U.prototype = Z.prototype;
  function K(_, q, fe) {
    this.props = _, this.context = q, this.refs = X, this.updater = fe || L;
  }
  var J = K.prototype = new U();
  J.constructor = K, k(J, Z.prototype), J.isPureReactComponent = !0;
  var B = Array.isArray;
  function V() {
  }
  var se = { H: null, A: null, T: null, S: null }, Ee = Object.prototype.hasOwnProperty;
  function ue(_, q, fe) {
    var he = fe.ref;
    return {
      $$typeof: a,
      type: _,
      key: q,
      ref: he !== void 0 ? he : null,
      props: fe
    };
  }
  function ve(_, q) {
    return ue(_.type, q, _.props);
  }
  function me(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === a;
  }
  function Ue(_) {
    var q = { "=": "=0", ":": "=2" };
    return "$" + _.replace(/[=:]/g, function(fe) {
      return q[fe];
    });
  }
  var Ge = /\/+/g;
  function Re(_, q) {
    return typeof _ == "object" && _ !== null && _.key != null ? Ue("" + _.key) : q.toString(36);
  }
  function W(_) {
    switch (_.status) {
      case "fulfilled":
        return _.value;
      case "rejected":
        throw _.reason;
      default:
        switch (typeof _.status == "string" ? _.then(V, V) : (_.status = "pending", _.then(
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
  function de(_, q, fe, he, ye) {
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
            case y:
              return De = _._init, de(
                De(_._payload),
                q,
                fe,
                he,
                ye
              );
          }
      }
    if (De)
      return ye = ye(_), De = he === "" ? "." + Re(_, 0) : he, B(ye) ? (fe = "", De != null && (fe = De.replace(Ge, "$&/") + "/"), de(ye, q, fe, "", function(Dt) {
        return Dt;
      })) : ye != null && (me(ye) && (ye = ve(
        ye,
        fe + (ye.key == null || _ && _.key === ye.key ? "" : ("" + ye.key).replace(
          Ge,
          "$&/"
        ) + "/") + De
      )), q.push(ye)), 1;
    De = 0;
    var re = he === "" ? "." : he + ":";
    if (B(_))
      for (var xe = 0; xe < _.length; xe++)
        he = _[xe], Me = re + Re(he, xe), De += de(
          he,
          q,
          fe,
          Me,
          ye
        );
    else if (xe = E(_), typeof xe == "function")
      for (_ = xe.call(_), xe = 0; !(he = _.next()).done; )
        he = he.value, Me = re + Re(he, xe++), De += de(
          he,
          q,
          fe,
          Me,
          ye
        );
    else if (Me === "object") {
      if (typeof _.then == "function")
        return de(
          W(_),
          q,
          fe,
          he,
          ye
        );
      throw q = String(_), Error(
        "Objects are not valid as a React child (found: " + (q === "[object Object]" ? "object with keys {" + Object.keys(_).join(", ") + "}" : q) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return De;
  }
  function I(_, q, fe) {
    if (_ == null) return _;
    var he = [], ye = 0;
    return de(_, he, "", "", function(Me) {
      return q.call(fe, Me, ye++);
    }), he;
  }
  function je(_) {
    if (_._status === -1) {
      var q = _._result, fe = q();
      fe.then(
        function(he) {
          (_._status === 0 || _._status === -1) && (_._status = 1, _._result = he, fe.status === void 0 && (fe.status = "fulfilled", fe.value = he));
        },
        function(he) {
          (_._status === 0 || _._status === -1) && (_._status = 2, _._result = he, fe.status === void 0 && (fe.status = "rejected", fe.reason = he));
        }
      ), _._status === -1 && (_._status = 0, _._result = fe);
    }
    if (_._status === 1) return _._result.default;
    throw _._result;
  }
  var $ = typeof reportError == "function" ? reportError : function(_) {
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
  function be(_) {
    var q = se.T, fe = {};
    fe.types = q !== null ? q.types : null, se.T = fe;
    try {
      var he = _(), ye = se.S;
      ye !== null && ye(fe, he), typeof he == "object" && he !== null && typeof he.then == "function" && he.then(V, $);
    } catch (Me) {
      $(Me);
    } finally {
      q !== null && fe.types !== null && (q.types = fe.types), se.T = q;
    }
  }
  function He(_) {
    var q = se.T;
    if (q !== null) {
      var fe = q.types;
      fe === null ? q.types = [_] : fe.indexOf(_) === -1 && fe.push(_);
    } else be(He.bind(null, _));
  }
  var hn = {
    map: I,
    forEach: function(_, q, fe) {
      I(
        _,
        function() {
          q.apply(this, arguments);
        },
        fe
      );
    },
    count: function(_) {
      var q = 0;
      return I(_, function() {
        q++;
      }), q;
    },
    toArray: function(_) {
      return I(_, function(q) {
        return q;
      }) || [];
    },
    only: function(_) {
      if (!me(_))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return _;
    }
  };
  return we.Activity = g, we.Children = hn, we.Component = Z, we.Fragment = u, we.Profiler = f, we.PureComponent = K, we.StrictMode = o, we.Suspense = b, we.ViewTransition = j, we.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = se, we.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(_) {
      return se.H.useMemoCache(_);
    }
  }, we.addTransitionType = He, we.cache = function(_) {
    return function() {
      return _.apply(null, arguments);
    };
  }, we.cacheSignal = function() {
    return null;
  }, we.cloneElement = function(_, q, fe) {
    if (_ == null)
      throw Error(
        "The argument must be a React element, but you passed " + _ + "."
      );
    var he = k({}, _.props), ye = _.key;
    if (q != null)
      for (Me in q.key !== void 0 && (ye = "" + q.key), q)
        !Ee.call(q, Me) || Me === "key" || Me === "__self" || Me === "__source" || Me === "ref" && q.ref === void 0 || (he[Me] = q[Me]);
    var Me = arguments.length - 2;
    if (Me === 1) he.children = fe;
    else if (1 < Me) {
      for (var De = Array(Me), re = 0; re < Me; re++)
        De[re] = arguments[re + 2];
      he.children = De;
    }
    return ue(_.type, ye, he);
  }, we.createContext = function(_) {
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
  }, we.createElement = function(_, q, fe) {
    var he, ye = {}, Me = null;
    if (q != null)
      for (he in q.key !== void 0 && (Me = "" + q.key), q)
        Ee.call(q, he) && he !== "key" && he !== "__self" && he !== "__source" && (ye[he] = q[he]);
    var De = arguments.length - 2;
    if (De === 1) ye.children = fe;
    else if (1 < De) {
      for (var re = Array(De), xe = 0; xe < De; xe++)
        re[xe] = arguments[xe + 2];
      ye.children = re;
    }
    if (_ && _.defaultProps)
      for (he in De = _.defaultProps, De)
        ye[he] === void 0 && (ye[he] = De[he]);
    return ue(_, Me, ye);
  }, we.createRef = function() {
    return { current: null };
  }, we.forwardRef = function(_) {
    return { $$typeof: p, render: _ };
  }, we.isValidElement = me, we.lazy = function(_) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: _ },
      _init: je
    };
  }, we.memo = function(_, q) {
    return {
      $$typeof: S,
      type: _,
      compare: q === void 0 ? null : q
    };
  }, we.startTransition = be, we.unstable_useCacheRefresh = function() {
    return se.H.useCacheRefresh();
  }, we.use = function(_) {
    return se.H.use(_);
  }, we.useActionState = function(_, q, fe) {
    return se.H.useActionState(_, q, fe);
  }, we.useCallback = function(_, q) {
    return se.H.useCallback(_, q);
  }, we.useContext = function(_) {
    return se.H.useContext(_);
  }, we.useDebugValue = function() {
  }, we.useDeferredValue = function(_, q) {
    return se.H.useDeferredValue(_, q);
  }, we.useEffect = function(_, q) {
    return se.H.useEffect(_, q);
  }, we.useEffectEvent = function(_) {
    return se.H.useEffectEvent(_);
  }, we.useId = function() {
    return se.H.useId();
  }, we.useImperativeHandle = function(_, q, fe) {
    return se.H.useImperativeHandle(_, q, fe);
  }, we.useInsertionEffect = function(_, q) {
    return se.H.useInsertionEffect(_, q);
  }, we.useLayoutEffect = function(_, q) {
    return se.H.useLayoutEffect(_, q);
  }, we.useMemo = function(_, q) {
    return se.H.useMemo(_, q);
  }, we.useOptimistic = function(_, q) {
    return se.H.useOptimistic(_, q);
  }, we.useReducer = function(_, q, fe) {
    return se.H.useReducer(_, q, fe);
  }, we.useRef = function(_) {
    return se.H.useRef(_);
  }, we.useState = function(_) {
    return se.H.useState(_);
  }, we.useSyncExternalStore = function(_, q, fe) {
    return se.H.useSyncExternalStore(
      _,
      q,
      fe
    );
  }, we.useTransition = function() {
    return se.H.useTransition();
  }, we.version = "19.3.0", we;
}
var R0;
function ih() {
  return R0 || (R0 = 1, pd.exports = e2()), pd.exports;
}
var x = ih();
const Yl = /* @__PURE__ */ Jx(x), Ac = /* @__PURE__ */ Fx({
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
    function s(W, de) {
      var I = W.length;
      W.push(de);
      e: for (; 0 < I; ) {
        var je = I - 1 >>> 1, $ = W[je];
        if (0 < f($, de))
          W[je] = de, W[I] = $, I = je;
        else break e;
      }
    }
    function u(W) {
      return W.length === 0 ? null : W[0];
    }
    function o(W) {
      if (W.length === 0) return null;
      var de = W[0], I = W.pop();
      if (I !== de) {
        W[0] = I;
        e: for (var je = 0, $ = W.length, be = $ >>> 1; je < be; ) {
          var He = 2 * (je + 1) - 1, hn = W[He], _ = He + 1, q = W[_];
          if (0 > f(hn, I))
            _ < $ && 0 > f(q, hn) ? (W[je] = q, W[_] = I, je = _) : (W[je] = hn, W[He] = I, je = He);
          else if (_ < $ && 0 > f(q, I))
            W[je] = q, W[_] = I, je = _;
          else break e;
        }
      }
      return de;
    }
    function f(W, de) {
      var I = W.sortIndex - de.sortIndex;
      return I !== 0 ? I : W.id - de.id;
    }
    if (a.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      a.unstable_now = function() {
        return d.now();
      };
    } else {
      var m = Date, p = m.now();
      a.unstable_now = function() {
        return m.now() - p;
      };
    }
    var b = [], S = [], y = 1, g = null, j = 3, T = !1, E = !1, L = !1, k = !1, X = typeof setTimeout == "function" ? setTimeout : null, Z = typeof clearTimeout == "function" ? clearTimeout : null, U = typeof setImmediate < "u" ? setImmediate : null;
    function K(W) {
      for (var de = u(S); de !== null; ) {
        if (de.callback === null) o(S);
        else if (de.startTime <= W)
          o(S), de.sortIndex = de.expirationTime, s(b, de);
        else break;
        de = u(S);
      }
    }
    function J(W) {
      if (L = !1, K(W), !E)
        if (u(b) !== null)
          E = !0, B || (B = !0, me());
        else {
          var de = u(S);
          de !== null && Re(J, de.startTime - W);
        }
    }
    var B = !1, V = -1, se = 5, Ee = -1;
    function ue() {
      return k ? !0 : !(a.unstable_now() - Ee < se);
    }
    function ve() {
      if (k = !1, B) {
        var W = a.unstable_now();
        Ee = W;
        var de = !0;
        try {
          e: {
            E = !1, L && (L = !1, Z(V), V = -1), T = !0;
            var I = j;
            try {
              t: {
                for (K(W), g = u(b); g !== null && !(g.expirationTime > W && ue()); ) {
                  var je = g.callback;
                  if (typeof je == "function") {
                    g.callback = null, j = g.priorityLevel;
                    var $ = je(
                      g.expirationTime <= W
                    );
                    if (W = a.unstable_now(), typeof $ == "function") {
                      g.callback = $, K(W), de = !0;
                      break t;
                    }
                    g === u(b) && o(b), K(W);
                  } else o(b);
                  g = u(b);
                }
                if (g !== null) de = !0;
                else {
                  var be = u(S);
                  be !== null && Re(
                    J,
                    be.startTime - W
                  ), de = !1;
                }
              }
              break e;
            } finally {
              g = null, j = I, T = !1;
            }
            de = void 0;
          }
        } finally {
          de ? me() : B = !1;
        }
      }
    }
    var me;
    if (typeof U == "function")
      me = function() {
        U(ve);
      };
    else if (typeof MessageChannel < "u") {
      var Ue = new MessageChannel(), Ge = Ue.port2;
      Ue.port1.onmessage = ve, me = function() {
        Ge.postMessage(null);
      };
    } else
      me = function() {
        X(ve, 0);
      };
    function Re(W, de) {
      V = X(function() {
        W(a.unstable_now());
      }, de);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(W) {
      W.callback = null;
    }, a.unstable_forceFrameRate = function(W) {
      0 > W || 125 < W ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : se = 0 < W ? Math.floor(1e3 / W) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return j;
    }, a.unstable_next = function(W) {
      switch (j) {
        case 1:
        case 2:
        case 3:
          var de = 3;
          break;
        default:
          de = j;
      }
      var I = j;
      j = de;
      try {
        return W();
      } finally {
        j = I;
      }
    }, a.unstable_requestPaint = function() {
      k = !0;
    }, a.unstable_runWithPriority = function(W, de) {
      switch (W) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          W = 3;
      }
      var I = j;
      j = W;
      try {
        return de();
      } finally {
        j = I;
      }
    }, a.unstable_scheduleCallback = function(W, de, I) {
      var je = a.unstable_now();
      switch (typeof I == "object" && I !== null ? (I = I.delay, I = typeof I == "number" && 0 < I ? je + I : je) : I = je, W) {
        case 1:
          var $ = -1;
          break;
        case 2:
          $ = 250;
          break;
        case 5:
          $ = 1073741823;
          break;
        case 4:
          $ = 1e4;
          break;
        default:
          $ = 5e3;
      }
      return $ = I + $, W = {
        id: y++,
        callback: de,
        priorityLevel: W,
        startTime: I,
        expirationTime: $,
        sortIndex: -1
      }, I > je ? (W.sortIndex = I, s(S, W), u(b) === null && W === u(S) && (L ? (Z(V), V = -1) : L = !0, Re(J, I - je))) : (W.sortIndex = $, s(b, W), E || T || (E = !0, B || (B = !0, me()))), W;
    }, a.unstable_shouldYield = ue, a.unstable_wrapCallback = function(W) {
      var de = j;
      return function() {
        var I = j;
        j = de;
        try {
          return W.apply(this, arguments);
        } finally {
          j = I;
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
  function s(y) {
    var g = "https://react.dev/errors/" + y;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var j = 2; j < arguments.length; j++)
        g += "&args[]=" + encodeURIComponent(arguments[j]);
    }
    return "Minified React error #" + y + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function u() {
  }
  var o = {
    d: {
      f: u,
      r: function() {
        throw Error(s(522));
      },
      D: u,
      C: u,
      L: u,
      m: u,
      X: u,
      S: u,
      M: u
    },
    p: 0,
    findDOMNode: null
  }, f = Symbol.for("react.portal"), d = Symbol.for("react.recoverable"), m = Symbol.for("react.optimistic_key");
  function p(y, g, j) {
    var T = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: f,
      key: T == null ? null : T === m ? m : "" + T,
      children: y,
      containerInfo: g,
      implementation: j
    };
  }
  var b = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function S(y, g) {
    if (y === "font") return "";
    if (typeof g == "string")
      return g === "use-credentials" ? g : "";
  }
  return Gt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, Gt.browser = function(y) {
    return { $$typeof: d, _reason: y };
  }, Gt.createPortal = function(y, g) {
    var j = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)
      throw Error(s(299));
    return p(y, g, null, j);
  }, Gt.flushSync = function(y) {
    var g = b.T, j = o.p;
    try {
      if (b.T = null, o.p = 2, y) return y();
    } finally {
      b.T = g, o.p = j, o.d.f();
    }
  }, Gt.preconnect = function(y, g) {
    typeof y == "string" && (g ? (g = g.crossOrigin, g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null, o.d.C(y, g));
  }, Gt.prefetchDNS = function(y) {
    typeof y == "string" && o.d.D(y);
  }, Gt.preinit = function(y, g) {
    if (typeof y == "string" && g && typeof g.as == "string") {
      var j = g.as, T = S(j, g.crossOrigin), E = typeof g.integrity == "string" ? g.integrity : void 0, L = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
      j === "style" ? o.d.S(
        y,
        typeof g.precedence == "string" ? g.precedence : void 0,
        {
          crossOrigin: T,
          integrity: E,
          fetchPriority: L
        }
      ) : j === "script" && o.d.X(y, {
        crossOrigin: T,
        integrity: E,
        fetchPriority: L,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0
      });
    }
  }, Gt.preinitModule = function(y, g) {
    if (typeof y == "string")
      if (typeof g == "object" && g !== null) {
        if (g.as == null || g.as === "script") {
          var j = S(
            g.as,
            g.crossOrigin
          );
          o.d.M(y, {
            crossOrigin: j,
            integrity: typeof g.integrity == "string" ? g.integrity : void 0,
            nonce: typeof g.nonce == "string" ? g.nonce : void 0,
            fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0
          });
        }
      } else g == null && o.d.M(y);
  }, Gt.preload = function(y, g) {
    if (typeof y == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
      var j = g.as, T = S(j, g.crossOrigin);
      o.d.L(y, j, {
        crossOrigin: T,
        integrity: typeof g.integrity == "string" ? g.integrity : void 0,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0,
        type: typeof g.type == "string" ? g.type : void 0,
        fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
        referrerPolicy: typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
        imageSrcSet: typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
        imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
        media: typeof g.media == "string" ? g.media : void 0
      });
    }
  }, Gt.preloadModule = function(y, g) {
    if (typeof y == "string")
      if (g) {
        var j = S(g.as, g.crossOrigin);
        o.d.m(y, {
          as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
          crossOrigin: j,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0,
          nonce: typeof g.nonce == "string" ? g.nonce : void 0,
          fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0
        });
      } else o.d.m(y);
  }, Gt.requestFormReset = function(y) {
    o.d.r(y);
  }, Gt.unstable_batchedUpdates = function(y, g) {
    return y(g);
  }, Gt.useFormState = function(y, g, j) {
    return b.H.useFormState(y, g, j);
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
  var a = n2(), s = ih(), u = Zy();
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
  function p(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function b(e) {
    if (d(e) !== e)
      throw Error(o(188));
  }
  function S(e) {
    var t = e.alternate;
    if (!t) {
      if (t = d(e), t === null) throw Error(o(188));
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
        throw Error(o(188));
      }
      if (n.return !== l.return) n = i, l = r;
      else {
        for (var h = !1, v = i.child; v; ) {
          if (v === n) {
            h = !0, n = i, l = r;
            break;
          }
          if (v === l) {
            h = !0, l = i, n = r;
            break;
          }
          v = v.sibling;
        }
        if (!h) {
          for (v = r.child; v; ) {
            if (v === n) {
              h = !0, n = r, l = i;
              break;
            }
            if (v === l) {
              h = !0, l = r, n = i;
              break;
            }
            v = v.sibling;
          }
          if (!h) throw Error(o(189));
        }
      }
      if (n.alternate !== l) throw Error(o(190));
    }
    if (n.tag !== 3) throw Error(o(188));
    return n.stateNode.current === n ? e : t;
  }
  function y(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = y(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  function g(e, t, n, l, i, r) {
    for (; e !== null; ) {
      if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && n(e, l, i, r) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && g(
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
  function j(e) {
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
    var t = [null, null], n = j(e);
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
        throw Error(o(559));
    }
  }
  var X = null, Z = null;
  function U(e, t, n) {
    return e === n ? !0 : e === t ? (X = e, !0) : !1;
  }
  function K(e, t, n) {
    return e === n ? (Z = e, !1) : e === t ? (Z !== null && (X = e), !0) : !1;
  }
  function J(e) {
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
  var V = Object.assign, se = Symbol.for("react.element"), Ee = Symbol.for("react.transitional.element"), ue = Symbol.for("react.portal"), ve = Symbol.for("react.fragment"), me = Symbol.for("react.strict_mode"), Ue = Symbol.for("react.profiler"), Ge = Symbol.for("react.consumer"), Re = Symbol.for("react.context"), W = Symbol.for("react.forward_ref"), de = Symbol.for("react.suspense"), I = Symbol.for("react.suspense_list"), je = Symbol.for("react.memo"), $ = Symbol.for("react.lazy"), be = Symbol.for("react.activity"), He = Symbol.for("react.legacy_hidden"), hn = Symbol.for("react.memo_cache_sentinel"), _ = Symbol.for("react.view_transition"), q = Symbol.for("react.recoverable"), fe = Symbol.iterator;
  function he(e) {
    return e === null || typeof e != "object" ? null : (e = fe && e[fe] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var ye = Symbol.for("react.client.reference");
  function Me(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === ye ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case ve:
        return "Fragment";
      case Ue:
        return "Profiler";
      case me:
        return "StrictMode";
      case de:
        return "Suspense";
      case I:
        return "SuspenseList";
      case be:
        return "Activity";
      case _:
        return "ViewTransition";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case ue:
          return "Portal";
        case Re:
          return e.displayName || "Context";
        case Ge:
          return (e._context.displayName || "Context") + ".Consumer";
        case W:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case je:
          return t = e.displayName || null, t !== null ? t : Me(e.type) || "Memo";
        case $:
          t = e._payload, e = e._init;
          try {
            return Me(e(t));
          } catch {
          }
      }
    return null;
  }
  var De = Array.isArray, re = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, xe = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Dt = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, jl = [], Be = -1;
  function Vt(e) {
    return { current: e };
  }
  function ge(e) {
    0 > Be || (e.current = jl[Be], jl[Be] = null, Be--);
  }
  function Xe(e, t) {
    Be++, jl[Be] = e.current, e.current = t;
  }
  var ct = Vt(null), mn = Vt(null), ln = Vt(null), Ce = Vt(null);
  function Gn(e, t) {
    switch (Xe(ln, t), Xe(mn, e), Xe(ct, null), t.nodeType) {
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
    ge(ct), Xe(ct, e);
  }
  function pn() {
    ge(ct), ge(mn), ge(ln);
  }
  function Nl(e) {
    var t = e.memoizedState;
    t !== null && (Ii._currentValue = t.memoizedState, Xe(Ce, e)), t = ct.current;
    var n = Bg(t, e.type);
    t !== n && (Xe(mn, e), Xe(ct, n));
  }
  function El(e) {
    mn.current === e && (ge(ct), ge(mn)), Ce.current === e && (ge(Ce), Ii._currentValue = Dt);
  }
  var Ft, an;
  function vt(e) {
    if (Ft === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        Ft = t && t[1] || "", an = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ft + e + an;
  }
  var Jt = !1;
  function Q(e, t) {
    if (!e || Jt) return "";
    Jt = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var G = function() {
                throw Error();
              };
              if (Object.defineProperty(G.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(G, []);
                } catch (ne) {
                  var C = ne;
                }
                Reflect.construct(e, [], G);
              } else {
                try {
                  G.call();
                } catch (ne) {
                  C = ne;
                }
                G = !1;
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
                  }), G = !0, new e();
                } finally {
                  G && (z !== void 0 ? Object.defineProperty(e.prototype, "props", z) : delete e.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (ne) {
                C = ne;
              }
              (G = e()) && typeof G.catch == "function" && G.catch(function() {
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
      var r = l.DetermineComponentFrameRoot(), h = r[0], v = r[1];
      if (h && v) {
        var w = h.split(`
`), R = v.split(`
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
      Jt = !1, Error.prepareStackTrace = n;
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
  function Te(e) {
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
  var le = Object.prototype.hasOwnProperty, Ke = a.unstable_scheduleCallback, ot = a.unstable_cancelCallback, Dc = a.unstable_shouldYield, zc = a.unstable_requestPaint, Xt = a.unstable_now, vs = a.unstable_getCurrentPriorityLevel, ri = a.unstable_ImmediatePriority, Tl = a.unstable_UserBlockingPriority, Vn = a.unstable_NormalPriority, Lc = a.unstable_LowPriority, bs = a.unstable_IdlePriority, Uc = a.log, Hc = a.unstable_setDisableYieldValue, Zl = null, At = null;
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
    var v = l & 134217727;
    return v !== 0 ? (l = v & ~r, l !== 0 ? i = al(l) : (h &= v, h !== 0 ? i = al(h) : n || (n = v & ~e, n !== 0 && (i = al(n))))) : (v = l & ~r, v !== 0 ? i = al(v) : h !== 0 ? i = al(h) : n || (n = l & ~e, n !== 0 && (i = al(n)))), i === 0 ? 0 : t !== 0 && t !== i && (t & r) === 0 && (r = i & -i, n = t & -t, r >= n || r === 32 && (n & 4194048) !== 0) ? t : i;
  }
  function ka(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Fl(e, t) {
    (t & 8) !== 0 && (t |= t & 32);
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var l = 31 - ft(n), i = 1 << l;
        t |= e[l], n &= ~i;
      }
    return t;
  }
  function $u(e, t) {
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
  function rt(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Cn(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function qu(e, t, n, l, i, r) {
    var h = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var v = e.entanglements, w = e.expirationTimes, R = e.hiddenUpdates;
    for (n = h & ~n; 0 < n; ) {
      var H = 31 - ft(n), G = 1 << H;
      v[H] = 0, w[H] = -1;
      var C = R[H];
      if (C !== null)
        for (R[H] = null, H = 0; H < C.length; H++) {
          var z = C[H];
          z !== null && (z.lane &= -536870913);
        }
      n &= ~G;
    }
    l !== 0 && js(e, l, 0), r !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= r & ~(h & ~t));
  }
  function js(e, t, n) {
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
  function Ns(e, t) {
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
  function $c() {
    var e = xe.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : j0(e.type));
  }
  function qc(e, t) {
    var n = xe.p;
    try {
      return xe.p = e, t();
    } finally {
      xe.p = n;
    }
  }
  var Xn = Math.random().toString(36).slice(2), at = "__reactFiber$" + Xn, zt = "__reactProps$" + Xn, Zn = "__reactContainer$" + Xn, il = "__reactEvents$" + Xn, Yu = "__reactListeners$" + Xn, di = "__reactHandles$" + Xn, Ts = "__reactResources$" + Xn, Aa = "__reactMarker$" + Xn, _a = "__reactLoad$" + Xn;
  function Ca(e) {
    delete e[at], delete e[zt], delete e[Yu], delete e[di];
  }
  function On(e) {
    var t;
    if (t = e[at]) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[Zn] || n[at]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = n0(e); e !== null; ) {
            if (n = e[at]) return n;
            e = n0(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function sl(e) {
    if (e = e[at] || e[Zn]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function cl(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
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
  var Ye = !1;
  function Vc() {
    var e = Ye;
    return Ye = !1, e;
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
  function N(e, t, n) {
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
      e._valueTracker = N(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function F(e) {
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
  function Se(e, t, n, l, i, r, h, v) {
    e.name = "", h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? e.type = h : e.removeAttribute("type"), t != null ? h === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Lt(t)) : e.value !== "" + Lt(t) && (e.value = "" + Lt(t)) : h !== "submit" && h !== "reset" || e.removeAttribute("value"), t != null ? h === "number" && e.value == t ? nt(e, Lt(e.value)) : nt(e, Lt(t)) : n != null ? nt(e, Lt(n)) : l != null && e.removeAttribute("value"), i == null && r != null && (e.defaultChecked = !!r), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), v != null && typeof v != "function" && typeof v != "symbol" && typeof v != "boolean" ? e.name = "" + Lt(v) : e.removeAttribute("name");
  }
  function Fe(e, t, n, l, i, r, h, v) {
    if (r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" && (e.type = r), t != null || n != null) {
      if (!(r !== "submit" && r !== "reset" || t != null)) {
        M(e);
        return;
      }
      n = n != null ? "" + Lt(n) : "", t = t != null ? "" + Lt(t) : n, v || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? i, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = v ? e.checked : !!l, e.defaultChecked = !!l, h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (e.name = h), M(e);
  }
  function nt(e, t) {
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
        if (n != null) throw Error(o(92));
        if (De(l)) {
          if (1 < l.length) throw Error(o(93));
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
      throw Error(o(62));
    if (e = e.style, n != null) {
      for (var l in n)
        !n.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "", Ye = !0);
      for (var i in t)
        l = t[i], t.hasOwnProperty(i) && n[i] !== l && (Vu(e, i, l), Ye = !0);
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
          if (Se(
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
                if (!i) throw Error(o(90));
                Se(
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
              l = n[t], l.form === e.form && F(l);
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
        o(231, t, typeof n)
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
  var Jl = null, Fu = null, Qc = null;
  function Dh() {
    if (Qc) return Qc;
    var e, t = Fu, n = t.length, l, i = "value" in Jl ? Jl.value : Jl.textContent, r = i.length;
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
      for (var v in e)
        e.hasOwnProperty(v) && (n = e[v], this[v] = n ? n(r) : r[v]);
      return this.isDefaultPrevented = (r.defaultPrevented != null ? r.defaultPrevented : r.returnValue === !1) ? Ic : zh, this.isPropagationStopped = zh, this;
    }
    return V(t.prototype, {
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
  }, Fc = Pt(Pl), Cs = V({}, Pl, { view: 0, detail: 0 }), S1 = Pt(Cs), Ju, Pu, Os, Jc = V({}, Cs, {
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
      return "movementX" in e ? e.movementX : (e !== Os && (Os && e.type === "mousemove" ? (Ju = e.screenX - Os.screenX, Pu = e.screenY - Os.screenY) : Pu = Ju = 0, Os = e), Ju);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Pu;
    }
  }), Lh = Pt(Jc), j1 = V({}, Jc, { dataTransfer: 0 }), N1 = Pt(j1), E1 = V({}, Cs, { relatedTarget: 0 }), Wu = Pt(E1), T1 = V({}, Pl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), w1 = Pt(T1), k1 = V({}, Pl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), A1 = Pt(k1), _1 = V({}, Pl, { data: 0 }), Uh = Pt(_1), C1 = {
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
  var D1 = V({}, Cs, {
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
  }), z1 = Pt(D1), L1 = V({}, Jc, {
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
  }), Hh = Pt(L1), U1 = V({}, Pl, { submitter: 0 }), H1 = Pt(U1), B1 = V({}, Cs, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: eo
  }), $1 = Pt(B1), q1 = V({}, Pl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Y1 = Pt(q1), G1 = V({}, Jc, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), V1 = Pt(G1), X1 = V({}, Pl, {
    newState: 0,
    oldState: 0,
    source: 0
  }), Z1 = Pt(X1), Q1 = [9, 13, 27, 32], to = Al && "CompositionEvent" in window, Rs = null;
  Al && "documentMode" in document && (Rs = document.documentMode);
  var K1 = Al && "TextEvent" in window && !Rs, Bh = Al && (!to || Rs && 8 < Rs && 11 >= Rs), $h = " ", qh = !1;
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
        return t.which !== 32 ? null : (qh = !0, $h);
      case "textInput":
        return e = t.data, e === $h && qh ? null : e;
      default:
        return null;
    }
  }
  function F1(e, t) {
    if (yi)
      return e === "compositionend" || !to && Yh(e, t) ? (e = Dh(), Qc = Fu = Jl = null, yi = !1, e) : null;
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
  var J1 = {
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
    return t === "input" ? !!J1[e.type] : t === "textarea";
  }
  function Xh(e, t, n, l) {
    pi ? gi ? gi.push(l) : gi = [l] : pi = l, t = Pr(t, "onChange"), 0 < t.length && (n = new Fc(
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
    if (F(t)) return e;
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
    Ms && (Ms.detachEvent("onpropertychange", Fh), Ds = Ms = null);
  }
  function Fh(e) {
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
    e === "focusin" ? (Ih(), Ms = t, Ds = n, Ms.attachEvent("onpropertychange", Fh)) : e === "focusout" && Ih();
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
  function Jh(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Ph(e, t) {
    var n = Jh(e);
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
      n = Jh(n);
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
    }), Ls && zs(Ls, l) || (Ls = l, l = Pr(so, "onSelect"), 0 < l.length && (t = new Fc(
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
  function Qn(e, t) {
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
  }, Rn = [], xi = 0, oo = 0;
  function er() {
    for (var e = xi, t = oo = xi = 0; t < e; ) {
      var n = Rn[t];
      Rn[t++] = null;
      var l = Rn[t];
      Rn[t++] = null;
      var i = Rn[t];
      Rn[t++] = null;
      var r = Rn[t];
      if (Rn[t++] = null, l !== null && i !== null) {
        var h = l.pending;
        h === null ? i.next = i : (i.next = h.next, h.next = i), l.pending = i;
      }
      r !== 0 && um(n, i, r);
    }
  }
  function tr(e, t, n, l) {
    Rn[xi++] = e, Rn[xi++] = t, Rn[xi++] = n, Rn[xi++] = l, oo |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
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
      throw ac = 0, Xr = null, Error(o(185));
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
        ct.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (l) {
        case be:
          return e = cn(31, n, t, i), e.elementType = be, e.lanes = r, e;
        case ve:
          return La(n.children, i, r, t);
        case me:
          h = 8, i |= 24;
          break;
        case Ue:
          return e = cn(12, n, t, i | 2), e.elementType = Ue, e.lanes = r, e;
        case de:
          return e = cn(13, n, t, i), e.elementType = de, e.lanes = r, e;
        case I:
          return e = cn(19, n, t, i), e.elementType = I, e.lanes = r, e;
        case He:
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
              case Re:
                h = 10;
                break e;
              case Ge:
                h = 9;
                break e;
              case W:
                h = 11;
                break e;
              case je:
                h = 14;
                break e;
              case $:
                h = 16, l = null;
                break e;
            }
          h = 29, n = Error(
            o(130, e === null ? "null" : typeof e, "")
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
  function Mn(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = dm.get(e);
      return n !== void 0 ? n : (t = {
        value: e,
        source: t,
        stack: Te(t)
      }, dm.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Te(t)
    };
  }
  var ji = [], Ni = 0, ar = null, Us = 0, Dn = [], zn = 0, Wl = null, ul = 1, ol = "";
  function Rl(e, t) {
    ji[Ni++] = Us, ji[Ni++] = ar, ar = e, Us = t;
  }
  function hm(e, t, n) {
    Dn[zn++] = ul, Dn[zn++] = ol, Dn[zn++] = Wl, Wl = e;
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
      ar = ji[--Ni], ji[Ni] = null, Us = ji[--Ni], ji[Ni] = null;
    for (; e === Wl; )
      Wl = Dn[--zn], Dn[zn] = null, ol = Dn[--zn], Dn[zn] = null, ul = Dn[--zn], Dn[zn] = null;
  }
  function mm(e, t) {
    Dn[zn++] = ul, Dn[zn++] = ol, Dn[zn++] = Wl, ul = t.id, ol = t.overflow, Wl = e;
  }
  var _t = null, it = null, Oe = !1, ea = null, Ln = !1, yo = Error(o(519));
  function ta(e) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Hs(Mn(t, e)), yo;
  }
  function pm(e) {
    var t = e.stateNode, n = e.type, l = e.memoizedProps;
    switch (t[at] = e, t[zt] = l, n) {
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
        Le("invalid", t), Fe(
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
          Ln = !1;
          return;
        case 27:
        case 3:
          Ln = !0;
          return;
        default:
          _t = _t.return;
      }
  }
  function Ei(e) {
    if (e !== _t) return !1;
    if (!Oe) return sr(e), Oe = !0, !1;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Kf(e.type, e.memoizedProps)), n = !n), n && it && ta(e), sr(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      it = t0(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      it = t0(e);
    } else
      t === 27 ? (t = it, ya(e.type) ? (e = ld, ld = null, it = e) : it = t) : it = _t ? Hn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ua() {
    it = _t = null, Oe = !1;
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
    Xe(bo, t._currentValue), t._currentValue = n;
  }
  function Dl(e) {
    e._currentValue = bo.current, ge(bo);
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
          var v = r;
          r = i;
          for (var w = 0; w < t.length; w++)
            if (v.context === t[w]) {
              r.lanes |= n, v = r.alternate, v !== null && (v.lanes |= n), cr(
                r.return,
                n,
                e
              ), l || (h = null);
              break e;
            }
          r = v.next;
        }
      } else if (i.tag === 18) {
        if (h = i.return, h === null) throw Error(o(341));
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
        if (h === null) throw Error(o(387));
        if (h = h.memoizedProps, h !== null) {
          var v = i.type;
          bn(i.pendingProps.value, h.value) || (e !== null ? e.push(v) : e = [v]);
        }
      } else if (i === Ce.current) {
        if (h = i.alternate, h === null) throw Error(o(387));
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
  function $a(e) {
    Ha = e, Ml = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Ht(e) {
    return gm(Ha, e);
  }
  function ur(e, t) {
    return Ha === null && $a(e), gm(e, t);
  }
  function gm(e, t) {
    var n = t._currentValue;
    if (t = { context: t, memoizedValue: n, next: null }, Ml === null) {
      if (e === null) throw Error(o(308));
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
    $$typeof: Re,
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
  var $s = null;
  function hb(e) {
    var t = e.transitionTypes;
    return e.transitionTypes = null, t;
  }
  var qs = null, jo = 0, qa = 0, Ti = null;
  function mb(e, t) {
    if (qs === null) {
      var n = qs = [];
      jo = 0, qa = Bf(), Ti = {
        status: "pending",
        value: void 0,
        then: function(l) {
          n.push(l);
        }
      };
    }
    return jo++, t.then(vm, vm), t;
  }
  function vm() {
    if (--jo === 0 && ($s = null, qs !== null)) {
      Ti !== null && (Ti.status = "fulfilled");
      var e = qs;
      qs = null, qa = 0, Ti = null;
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
  var bm = re.S;
  re.S = function(e, t) {
    if (fg = Xt(), typeof t == "object" && t !== null && typeof t.then == "function" && mb(e, t), $s !== null)
      for (var n = Gi; n !== null; )
        ym(n, $s), n = n.next;
    if (n = e.types, n !== null) {
      for (var l = Gi; l !== null; )
        ym(l, n), l = l.next;
      if (qa !== 0) {
        l = $s, l === null && (l = $s = []);
        for (var i = 0; i < n.length; i++) {
          var r = n[i];
          l.indexOf(r) === -1 && l.push(r);
        }
      }
    }
    bm !== null && bm(e, t);
  };
  var Ya = Vt(null);
  function No() {
    var e = Ya.current;
    return e !== null ? e : lt.pooledCache;
  }
  function or(e, t) {
    t === null ? Xe(Ya, Ya.current) : Xe(Ya, t.pool);
  }
  function xm() {
    var e = No();
    return e === null ? null : { parent: St._currentValue, pool: e };
  }
  var wi = Error(o(460)), Eo = Error(o(474)), fr = Error(o(542)), dr = { then: function() {
  } };
  function Sm(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function jm(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(rl, rl), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Em(e), e === void 0 && !("reason" in t) ? Error(o(600)) : e;
      default:
        if (typeof t.status == "string") t.then(rl, rl);
        else {
          if (e = lt, e !== null && 100 < e.shellSuspendCounter)
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
  function Nm() {
    if (Va === null) throw Error(o(459));
    var e = Va;
    return Va = null, e;
  }
  function Em(e) {
    if (e === wi || e === fr)
      throw Error(o(483));
  }
  var ki = null, Ys = 0;
  function hr(e) {
    var t = Ys;
    return Ys += 1, ki === null && (ki = []), jm(ki, e, t);
  }
  function la(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function mr(e, t) {
    throw t.$$typeof === se ? Error(o(525)) : (e = Object.prototype.toString.call(t), Error(
      o(
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
    function v(O, A, D, Y) {
      return A === null || A.tag !== 6 ? (A = mo(D, O.mode, Y), A.return = O, A) : (A = i(A, D), A.return = O, A);
    }
    function w(O, A, D, Y) {
      var ce = D.type;
      return ce === ve ? (O = H(
        O,
        A,
        D.props.children,
        Y,
        D.key
      ), la(O, D), O) : A !== null && (A.elementType === ce || typeof ce == "object" && ce !== null && ce.$$typeof === $ && Ga(ce) === A.type) ? (A = i(A, D.props), la(A, D), A.return = O, A) : (A = lr(
        D.type,
        D.key,
        D.props,
        null,
        O.mode,
        Y
      ), la(A, D), A.return = O, A);
    }
    function R(O, A, D, Y) {
      return A === null || A.tag !== 4 || A.stateNode.containerInfo !== D.containerInfo || A.stateNode.implementation !== D.implementation ? (A = po(D, O.mode, Y), A.return = O, A) : (A = i(A, D.children || []), A.return = O, A);
    }
    function H(O, A, D, Y, ce) {
      return A === null || A.tag !== 7 ? (A = La(
        D,
        O.mode,
        Y,
        ce
      ), A.return = O, A) : (A = i(A, D), A.return = O, A);
    }
    function G(O, A, D) {
      if (typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint")
        return A = mo(
          "" + A,
          O.mode,
          D
        ), A.return = O, A;
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case Ee:
            return D = lr(
              A.type,
              A.key,
              A.props,
              null,
              O.mode,
              D
            ), la(D, A), D.return = O, D;
          case ue:
            return A = po(
              A,
              O.mode,
              D
            ), A.return = O, A;
          case $:
            return A = Ga(A), G(O, A, D);
        }
        if (De(A) || he(A))
          return A = La(
            A,
            O.mode,
            D,
            null
          ), A.return = O, A;
        if (typeof A.then == "function")
          return G(O, hr(A), D);
        if (A.$$typeof === Re)
          return G(
            O,
            ur(O, A),
            D
          );
        mr(O, A);
      }
      return null;
    }
    function C(O, A, D, Y) {
      var ce = A !== null ? A.key : null;
      if (typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint")
        return ce !== null ? null : v(O, A, "" + D, Y);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case Ee:
            return D.key === ce ? w(O, A, D, Y) : null;
          case ue:
            return D.key === ce ? R(O, A, D, Y) : null;
          case $:
            return D = Ga(D), C(O, A, D, Y);
        }
        if (De(D) || he(D))
          return ce !== null ? null : H(O, A, D, Y, null);
        if (typeof D.then == "function")
          return C(
            O,
            A,
            hr(D),
            Y
          );
        if (D.$$typeof === Re)
          return C(
            O,
            A,
            ur(O, D),
            Y
          );
        mr(O, D);
      }
      return null;
    }
    function z(O, A, D, Y, ce) {
      if (typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint")
        return O = O.get(D) || null, v(A, O, "" + Y, ce);
      if (typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case Ee:
            return O = O.get(
              Y.key === null ? D : Y.key
            ) || null, w(A, O, Y, ce);
          case ue:
            return O = O.get(
              Y.key === null ? D : Y.key
            ) || null, R(A, O, Y, ce);
          case $:
            return Y = Ga(Y), z(
              O,
              A,
              D,
              Y,
              ce
            );
        }
        if (De(Y) || he(Y))
          return O = O.get(D) || null, H(A, O, Y, ce, null);
        if (typeof Y.then == "function")
          return z(
            O,
            A,
            D,
            hr(Y),
            ce
          );
        if (Y.$$typeof === Re)
          return z(
            O,
            A,
            D,
            ur(A, Y),
            ce
          );
        mr(A, Y);
      }
      return null;
    }
    function ne(O, A, D, Y) {
      for (var ce = null, qe = null, pe = A, Ne = A = 0, Et = null; pe !== null && Ne < D.length; Ne++) {
        pe.index > Ne ? (Et = pe, pe = null) : Et = pe.sibling;
        var Ve = C(
          O,
          pe,
          D[Ne],
          Y
        );
        if (Ve === null) {
          pe === null && (pe = Et);
          break;
        }
        e && pe && Ve.alternate === null && t(O, pe), A = r(Ve, A, Ne), qe === null ? ce = Ve : qe.sibling = Ve, qe = Ve, pe = Et;
      }
      if (Ne === D.length)
        return n(O, pe), Oe && Rl(O, Ne), ce;
      if (pe === null) {
        for (; Ne < D.length; Ne++)
          pe = G(O, D[Ne], Y), pe !== null && (A = r(
            pe,
            A,
            Ne
          ), qe === null ? ce = pe : qe.sibling = pe, qe = pe);
        return Oe && Rl(O, Ne), ce;
      }
      for (pe = l(pe); Ne < D.length; Ne++)
        Et = z(
          pe,
          O,
          Ne,
          D[Ne],
          Y
        ), Et !== null && (e && (Ve = Et.alternate, Ve !== null && pe.delete(Ve.key === null ? Ne : Ve.key)), A = r(
          Et,
          A,
          Ne
        ), qe === null ? ce = Et : qe.sibling = Et, qe = Et);
      return e && pe.forEach(function(ja) {
        return t(O, ja);
      }), Oe && Rl(O, Ne), ce;
    }
    function oe(O, A, D, Y) {
      if (D == null) throw Error(o(151));
      for (var ce = null, qe = null, pe = A, Ne = A = 0, Et = null, Ve = D.next(); pe !== null && !Ve.done; Ne++, Ve = D.next()) {
        pe.index > Ne ? (Et = pe, pe = null) : Et = pe.sibling;
        var ja = C(O, pe, Ve.value, Y);
        if (ja === null) {
          pe === null && (pe = Et);
          break;
        }
        e && pe && ja.alternate === null && t(O, pe), A = r(ja, A, Ne), qe === null ? ce = ja : qe.sibling = ja, qe = ja, pe = Et;
      }
      if (Ve.done)
        return n(O, pe), Oe && Rl(O, Ne), ce;
      if (pe === null) {
        for (; !Ve.done; Ne++, Ve = D.next())
          Ve = G(O, Ve.value, Y), Ve !== null && (A = r(Ve, A, Ne), qe === null ? ce = Ve : qe.sibling = Ve, qe = Ve);
        return Oe && Rl(O, Ne), ce;
      }
      for (pe = l(pe); !Ve.done; Ne++, Ve = D.next())
        Ve = z(pe, O, Ne, Ve.value, Y), Ve !== null && (e && (Et = Ve.alternate, Et !== null && pe.delete(
          Et.key === null ? Ne : Et.key
        )), A = r(Ve, A, Ne), qe === null ? ce = Ve : qe.sibling = Ve, qe = Ve);
      return e && pe.forEach(function(Ix) {
        return t(O, Ix);
      }), Oe && Rl(O, Ne), ce;
    }
    function Ae(O, A, D, Y) {
      if (typeof D == "object" && D !== null && D.type === ve && D.key === null && D.props.ref === void 0 && (D = D.props.children), typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case Ee:
            e: {
              for (var ce = D.key; A !== null; ) {
                if (A.key === ce) {
                  if (ce = D.type, ce === ve) {
                    if (A.tag === 7) {
                      n(
                        O,
                        A.sibling
                      ), Y = i(
                        A,
                        D.props.children
                      ), la(Y, D), Y.return = O, O = Y;
                      break e;
                    }
                  } else if (A.elementType === ce || typeof ce == "object" && ce !== null && ce.$$typeof === $ && Ga(ce) === A.type) {
                    n(
                      O,
                      A.sibling
                    ), Y = i(A, D.props), la(Y, D), Y.return = O, O = Y;
                    break e;
                  }
                  n(O, A);
                  break;
                } else t(O, A);
                A = A.sibling;
              }
              D.type === ve ? (Y = La(
                D.props.children,
                O.mode,
                Y,
                D.key
              ), la(Y, D), Y.return = O, O = Y) : (Y = lr(
                D.type,
                D.key,
                D.props,
                null,
                O.mode,
                Y
              ), la(Y, D), Y.return = O, O = Y);
            }
            return h(O);
          case ue:
            e: {
              for (ce = D.key; A !== null; ) {
                if (A.key === ce)
                  if (A.tag === 4 && A.stateNode.containerInfo === D.containerInfo && A.stateNode.implementation === D.implementation) {
                    n(
                      O,
                      A.sibling
                    ), Y = i(A, D.children || []), Y.return = O, O = Y;
                    break e;
                  } else {
                    n(O, A);
                    break;
                  }
                else t(O, A);
                A = A.sibling;
              }
              Y = po(D, O.mode, Y), Y.return = O, O = Y;
            }
            return h(O);
          case $:
            return D = Ga(D), Ae(
              O,
              A,
              D,
              Y
            );
        }
        if (De(D))
          return ne(
            O,
            A,
            D,
            Y
          );
        if (he(D)) {
          if (ce = he(D), typeof ce != "function") throw Error(o(150));
          return D = ce.call(D), oe(
            O,
            A,
            D,
            Y
          );
        }
        if (typeof D.then == "function")
          return Ae(
            O,
            A,
            hr(D),
            Y
          );
        if (D.$$typeof === Re)
          return Ae(
            O,
            A,
            ur(O, D),
            Y
          );
        mr(O, D);
      }
      return typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint" ? (D = "" + D, A !== null && A.tag === 6 ? (n(O, A.sibling), Y = i(A, D), Y.return = O, O = Y) : (n(O, A), Y = mo(D, O.mode, Y), Y.return = O, O = Y), h(O)) : n(O, A);
    }
    return function(O, A, D, Y) {
      try {
        Ys = 0;
        var ce = Ae(
          O,
          A,
          D,
          Y
        );
        return ki = null, ce;
      } catch (pe) {
        if (pe === wi || pe === fr) throw pe;
        var qe = cn(29, pe, null, O.mode);
        return qe.lanes = Y, qe.return = O, qe;
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
    if (l = l.shared, (Qe & 2) !== 0) {
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
    var r = i.firstBaseUpdate, h = i.lastBaseUpdate, v = i.shared.pending;
    if (v !== null) {
      i.shared.pending = null;
      var w = v, R = w.next;
      w.next = null, h === null ? r = R : h.next = R, h = w;
      var H = e.alternate;
      H !== null && (H = H.updateQueue, v = H.lastBaseUpdate, v !== h && (v === null ? H.firstBaseUpdate = R : v.next = R, H.lastBaseUpdate = w));
    }
    if (r !== null) {
      var G = i.baseState;
      h = 0, H = R = w = null, v = r;
      do {
        var C = v.lane & -536870913, z = C !== v.lane;
        if (z ? ($e & C) === C : (l & C) === C) {
          C !== 0 && C === qa && (Ao = !0), H !== null && (H = H.next = {
            lane: 0,
            tag: v.tag,
            payload: v.payload,
            callback: null,
            next: null
          });
          e: {
            var ne = e, oe = v;
            C = t;
            var Ae = n;
            switch (oe.tag) {
              case 1:
                if (ne = oe.payload, typeof ne == "function") {
                  G = ne.call(Ae, G, C);
                  break e;
                }
                G = ne;
                break e;
              case 3:
                ne.flags = ne.flags & -65537 | 128;
              case 0:
                if (ne = oe.payload, C = typeof ne == "function" ? ne.call(Ae, G, C) : ne, C == null) break e;
                G = V({}, G, C);
                break e;
              case 2:
                aa = !0;
            }
          }
          C = v.callback, C !== null && (e.flags |= 64, z && (e.flags |= 8192), z = i.callbacks, z === null ? i.callbacks = [C] : z.push(C));
        } else
          z = {
            lane: C,
            tag: v.tag,
            payload: v.payload,
            callback: v.callback,
            next: null
          }, H === null ? (R = H = z, w = G) : H = H.next = z, h |= C;
        if (v = v.next, v === null) {
          if (v = i.shared.pending, v === null)
            break;
          z = v, v = z.next, z.next = null, i.lastBaseUpdate = z, i.shared.pending = null;
        }
      } while (!0);
      H === null && (w = G), i.baseState = w, i.firstBaseUpdate = R, i.lastBaseUpdate = H, r === null && (i.shared.lanes = 0), ha |= h, e.lanes = h, e.memoizedState = G;
    }
  }
  function km(e, t) {
    if (typeof e != "function")
      throw Error(o(191, e));
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
    e = Bl, Xe(pr, e), Xe(ca, t), Bl = e | t.baseLanes;
  }
  function _o() {
    Xe(pr, Bl), Xe(ca, ca.current);
  }
  function Co() {
    Bl = pr.current, ge(ca), ge(pr);
  }
  var Bt = Vt(null), Zt = null;
  function ra(e) {
    var t = e.alternate;
    Xe($t, $t.current & 1), Xe(Bt, e), Zt === null && (t === null || ca.current !== null || t.memoizedState !== null) && (Zt = e);
  }
  function Oo(e) {
    Xe($t, $t.current), Xe(Bt, e), Zt === null && (Zt = e);
  }
  function Cm(e) {
    e.tag === 22 ? (Xe($t, $t.current), Xe(Bt, e), Zt === null && (Zt = e)) : ua();
  }
  function ua() {
    Xe($t, $t.current), Xe(Bt, Bt.current);
  }
  function xn(e) {
    ge(Bt), Zt === e && (Zt = null), ge($t);
  }
  var $t = Vt(0);
  function Zs(e, t) {
    Xe(Bt, Bt.current), Xe($t, t);
  }
  function Ro(e) {
    ge($t), ge(Bt), Zt === e && (Zt = null);
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
  var zl = 0, ke = null, tt = null, jt = null, yr = !1, Ai = !1, Za = !1, vr = 0, Qs = 0, _i = null, gb = 0;
  function gt() {
    throw Error(o(321));
  }
  function Mo(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!bn(e[n], t[n])) return !1;
    return !0;
  }
  function Do(e, t, n, l, i, r) {
    return zl = r, ke = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, re.H = e === null || e.memoizedState === null ? hp : mp, Za = !1, r = n(l, i), Za = !1, Ai && (r = Rm(
      t,
      n,
      l,
      i
    )), Om(e), r;
  }
  function Om(e) {
    re.H = Tr;
    var t = tt !== null && tt.next !== null;
    if (zl = 0, jt = tt = ke = null, yr = !1, Qs = 0, _i = null, t) throw Error(o(300));
    e === null || Nt || (e = e.dependencies, e !== null && rr(e) && (Nt = !0));
  }
  function Rm(e, t, n, l) {
    ke = e;
    var i = 0;
    do {
      if (Ai && (_i = null), Qs = 0, Ai = !1, 25 <= i) throw Error(o(301));
      if (i += 1, jt = tt = null, e.updateQueue != null) {
        var r = e.updateQueue;
        r.lastEffect = null, r.events = null, r.stores = null, r.memoCache != null && (r.memoCache.index = 0);
      }
      re.H = Eb, r = t(n, l);
    } while (Ai);
    return r;
  }
  function yb() {
    var e = re.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Ks(t) : t, e = e.useState()[0], (tt !== null ? tt.memoizedState : null) !== e && (ke.flags |= 1024), t;
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
    zl = 0, jt = tt = ke = null, Ai = !1, Qs = vr = 0, _i = null;
  }
  function Wt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return jt === null ? ke.memoizedState = jt = e : jt = jt.next = e, jt;
  }
  function xt() {
    if (tt === null) {
      var e = ke.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = tt.next;
    var t = jt === null ? ke.memoizedState : jt.next;
    if (t !== null)
      jt = t, tt = e;
    else {
      if (e === null)
        throw ke.alternate === null ? Error(o(467)) : Error(o(310));
      tt = e, e = {
        memoizedState: tt.memoizedState,
        baseState: tt.baseState,
        baseQueue: tt.baseQueue,
        queue: tt.queue,
        next: null
      }, jt === null ? ke.memoizedState = jt = e : jt = jt.next = e;
    }
    return jt;
  }
  function br() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ks(e) {
    var t = Qs;
    return Qs += 1, _i === null && (_i = []), e = jm(_i, e, t), t = ke, (jt === null ? t.memoizedState : jt.next) === null && (t = t.alternate, re.H = t === null || t.memoizedState === null ? hp : mp), e;
  }
  function xr(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Ks(e);
      if (e.$$typeof === q) return;
      if (e.$$typeof === Re) return Ht(e);
    }
    throw Error(o(438, String(e)));
  }
  function Ho(e) {
    var t = null, n = ke.updateQueue;
    if (n !== null && (t = n.memoCache), t == null) {
      var l = ke.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(i) {
          return i.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = br(), ke.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
      for (n = t.data[t.index] = Array(e), l = 0; l < e; l++)
        n[l] = hn;
    return t.index++, n;
  }
  function Ll(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Sr(e) {
    var t = xt();
    return Bo(t, tt, e);
  }
  function Bo(e, t, n) {
    var l = e.queue;
    if (l === null) throw Error(o(311));
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
      var v = h = null, w = null, R = t, H = !1;
      do {
        var G = R.lane & -536870913;
        if (G !== R.lane ? ($e & G) === G : (zl & G) === G) {
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
            }), G === qa && (H = !0);
          else if ((zl & C) === C) {
            R = R.next, C === qa && (H = !0);
            continue;
          } else
            G = {
              lane: 0,
              revertLane: R.revertLane,
              gesture: null,
              action: R.action,
              hasEagerState: R.hasEagerState,
              eagerState: R.eagerState,
              next: null
            }, w === null ? (v = w = G, h = r) : w = w.next = G, ke.lanes |= C, ha |= C;
          G = R.action, Za && n(r, G), r = R.hasEagerState ? R.eagerState : n(r, G);
        } else
          C = {
            lane: G,
            revertLane: R.revertLane,
            gesture: R.gesture,
            action: R.action,
            hasEagerState: R.hasEagerState,
            eagerState: R.eagerState,
            next: null
          }, w === null ? (v = w = C, h = r) : w = w.next = C, ke.lanes |= G, ha |= G;
        R = R.next;
      } while (R !== null && R !== t);
      if (w === null ? h = r : w.next = v, !bn(r, e.memoizedState) && (Nt = !0, H && (n = Ti, n !== null)))
        throw n;
      e.memoizedState = r, e.baseState = h, e.baseQueue = w, l.lastRenderedState = r;
    }
    return i === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function $o(e) {
    var t = xt(), n = t.queue;
    if (n === null) throw Error(o(311));
    n.lastRenderedReducer = e;
    var l = n.dispatch, i = n.pending, r = t.memoizedState;
    if (i !== null) {
      n.pending = null;
      var h = i = i.next;
      do
        r = e(r, h.action), h = h.next;
      while (h !== i);
      bn(r, t.memoizedState) || (Nt = !0), t.memoizedState = r, t.baseQueue === null && (t.baseState = r), n.lastRenderedState = r;
    }
    return [r, l];
  }
  function Mm(e, t, n) {
    var l = ke, i = xt(), r = Oe;
    if (r) {
      if (n === void 0) throw Error(o(407));
      n = n();
    } else n = t();
    var h = !bn(
      (tt || i).memoizedState,
      n
    );
    if (h && (i.memoizedState = n, Nt = !0), i = i.queue, Go(Lm.bind(null, l, i, e), [
      e
    ]), e = i.getSnapshot !== t || h || jt !== null && (jt.memoizedState.tag & 1) !== 0, Ci(
      e ? 9 : 8,
      { destroy: void 0 },
      zm.bind(null, l, i, n, t),
      null
    ), e) {
      if (l.flags |= 2048, lt === null) throw Error(o(349));
      r || (zl & 127) !== 0 || Dm(l, t, n);
    }
    return n;
  }
  function Dm(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = ke.updateQueue, t === null ? (t = br(), ke.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
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
  function qo(e) {
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
      tt,
      typeof l == "function" ? l : Ll
    );
  }
  function vb(e, t, n, l, i) {
    if (Er(e)) throw Error(o(485));
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
      re.T !== null ? n(!0) : r.isTransition = !1, l(r), n = t.pending, n === null ? (r.next = t.pending = r, $m(t, r)) : (r.next = n.next, t.pending = n.next = r);
    }
  }
  function $m(e, t) {
    var n = t.action, l = t.payload, i = e.state;
    if (t.isTransition) {
      var r = re.T, h = {};
      h.types = r !== null ? r.types : null, re.T = h;
      try {
        var v = n(i, l), w = re.S;
        w !== null && w(h, v), qm(e, t, v);
      } catch (R) {
        Yo(e, t, R);
      } finally {
        r !== null && h.types !== null && (r.types = h.types), re.T = r;
      }
    } else
      try {
        r = n(i, l), qm(e, t, r);
      } catch (R) {
        Yo(e, t, R);
      }
  }
  function qm(e, t, n) {
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
    t.status = "fulfilled", t.value = n, Gm(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, $m(e, n)));
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
    if (Oe) {
      var n = lt.formState;
      if (n !== null) {
        e: {
          var l = ke;
          if (Oe) {
            if (it) {
              t: {
                for (var i = it, r = Ln; i.nodeType !== 8; ) {
                  if (!r) {
                    i = null;
                    break t;
                  }
                  if (i = Hn(
                    i.nextSibling
                  ), i === null) {
                    i = null;
                    break t;
                  }
                }
                r = i.data, i = r === "F!" || r === "F" ? i : null;
              }
              if (i) {
                it = Hn(
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
      ke,
      l
    ), l.dispatch = n, l = qo(!1), r = Ko.bind(
      null,
      ke,
      !1,
      l.queue
    ), l = Wt(), i = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = i, n = vb.bind(
      null,
      ke,
      i,
      r,
      n
    ), i.dispatch = n, l.memoizedState = e, [t, n, !1];
  }
  function Zm(e) {
    var t = xt();
    return Qm(t, tt, e);
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
    return n !== t.memoizedState && (ke.flags |= 2048, Ci(
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
    var t = xt(), n = tt;
    if (n !== null)
      return Qm(t, n, e);
    xt(), t = t.memoizedState, n = xt();
    var l = n.queue.dispatch;
    return n.memoizedState = e, [t, l, !1];
  }
  function Ci(e, t, n, l) {
    return e = { tag: e, create: n, deps: l, inst: t, next: null }, t = ke.updateQueue, t === null && (t = br(), ke.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (l = n.next, n.next = e, e.next = l, t.lastEffect = e), e;
  }
  function Im() {
    return xt().memoizedState;
  }
  function jr(e, t, n, l) {
    var i = Wt();
    ke.flags |= e, i.memoizedState = Ci(
      1 | t,
      { destroy: void 0 },
      n,
      l === void 0 ? null : l
    );
  }
  function Nr(e, t, n, l) {
    var i = xt();
    l = l === void 0 ? null : l;
    var r = i.memoizedState.inst;
    tt !== null && l !== null && Mo(l, tt.memoizedState.deps) ? i.memoizedState = Ci(t, r, n, l) : (ke.flags |= e, i.memoizedState = Ci(
      1 | t,
      r,
      n,
      l
    ));
  }
  function Fm(e, t) {
    jr(8390656, 8, e, t);
  }
  function Go(e, t) {
    Nr(2048, 8, e, t);
  }
  function xb(e) {
    ke.flags |= 4;
    var t = ke.updateQueue;
    if (t === null)
      t = br(), ke.updateQueue = t, t.events = [e];
    else {
      var n = t.events;
      n === null ? t.events = [e] : n.push(e);
    }
  }
  function Jm(e) {
    var t = xt().memoizedState;
    return xb({ ref: t, nextImpl: e }), function() {
      if ((Qe & 2) !== 0) throw Error(o(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Pm(e, t) {
    return Nr(4, 2, e, t);
  }
  function Wm(e, t) {
    return Nr(4, 4, e, t);
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
    n = n != null ? n.concat([e]) : null, Nr(4, 4, ep.bind(null, t, e), n);
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
    return n === void 0 || (zl & 1073741824) !== 0 && ($e & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = hg(), ke.lanes |= e, ha |= e, n);
  }
  function ap(e, t, n, l) {
    return bn(n, t) ? n : ca.current !== null ? (e = Xo(e, n, l), bn(e, t) || (Nt = !0), e) : (zl & 106) === 0 || (zl & 1073741824) !== 0 && ($e & 261930) === 0 ? (Nt = !0, e.memoizedState = n) : (e = hg(), ke.lanes |= e, ha |= e, t);
  }
  function ip(e, t, n, l, i) {
    var r = xe.p;
    xe.p = r !== 0 && 8 > r ? r : 8;
    var h = re.T, v = {};
    v.types = h !== null ? h.types : null, re.T = v, Ko(e, !1, t, n);
    try {
      var w = i(), R = re.S;
      if (R !== null && R(v, w), w !== null && typeof w == "object" && typeof w.then == "function") {
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
    } catch (G) {
      Is(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: G },
        En()
      );
    } finally {
      xe.p = r, h !== null && v.types !== null && (h.types = v.types), re.T = h;
    }
  }
  function Sb() {
  }
  function Zo(e, t, n, l) {
    if (e.tag !== 5) throw Error(o(476));
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
  function jb(e) {
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
  function Nb(e, t, n) {
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
          var h = t.lastRenderedState, v = r(h, n);
          if (i.hasEagerState = !0, i.eagerState = v, bn(v, h))
            return tr(e, t, i, 0), lt === null && er(), !1;
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
      if (t) throw Error(o(479));
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
    return e === ke || t !== null && t === ke;
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
    useEffect: Fm,
    useImperativeHandle: function(e, t, n) {
      n = n != null ? n.concat([e]) : null, jr(
        4194308,
        4,
        ep.bind(null, t, e),
        n
      );
    },
    useLayoutEffect: function(e, t) {
      return jr(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      jr(4, 2, e, t);
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
      }, l.queue = e, e = e.dispatch = Nb.bind(
        null,
        ke,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = Wt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = qo(e);
      var t = e.queue, n = op.bind(null, ke, t);
      return t.dispatch = n, [e.memoizedState, n];
    },
    useDebugValue: Vo,
    useDeferredValue: function(e, t) {
      var n = Wt();
      return Xo(n, e, t);
    },
    useTransition: function() {
      var e = qo(!1);
      return e = ip.bind(
        null,
        ke,
        e.queue,
        !0,
        !1
      ), Wt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, n) {
      var l = ke, i = Wt();
      if (Oe) {
        if (n === void 0)
          throw Error(o(407));
        n = n();
      } else {
        if (n = t(), lt === null)
          throw Error(o(349));
        ($e & 127) !== 0 || Dm(l, t, n);
      }
      i.memoizedState = n;
      var r = { value: n, getSnapshot: t };
      return i.queue = r, Fm(Lm.bind(null, l, r, e), [
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
      var e = Wt(), t = lt.identifierPrefix;
      if (Oe) {
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
        ke,
        !0,
        n
      ), n.dispatch = t, [e, t];
    },
    useMemoCache: Ho,
    useCacheRefresh: function() {
      return Wt().memoizedState = jb.bind(
        null,
        ke
      );
    },
    useEffectEvent: function(e) {
      var t = Wt(), n = { impl: e };
      return t.memoizedState = n, function() {
        if ((Qe & 2) !== 0)
          throw Error(o(440));
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
        tt.memoizedState,
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
      return Bm(n, tt, e, t);
    },
    useMemoCache: Ho,
    useCacheRefresh: up,
    useEffectEvent: Jm
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
    useReducer: $o,
    useRef: Im,
    useState: function() {
      return $o(Ll);
    },
    useDebugValue: Vo,
    useDeferredValue: function(e, t) {
      var n = xt();
      return tt === null ? Xo(n, e, t) : ap(
        n,
        tt.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = $o(Ll)[0], t = xt().memoizedState;
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
      return tt !== null ? Bm(n, tt, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    },
    useMemoCache: Ho,
    useCacheRefresh: up,
    useEffectEvent: Jm
  };
  function Io(e, t, n, l) {
    t = e.memoizedState, n = n(l, t), n = n == null ? t : V({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var Fo = {
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
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, l), t.state !== e && Fo.enqueueReplaceState(t, t.state, null);
  }
  function Qa(e, t) {
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
  function Jo(e, t, n) {
    return n = ia(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      wr(e, t);
    }, n;
  }
  function Sp(e) {
    return e = ia(e), e.tag = 3, e;
  }
  function jp(e, t, n, l) {
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
      var v = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: v !== null ? v : ""
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
        throw Error(o(435, n.tag));
      }
      return Lf(e, l, i), Qr(), !1;
    }
    if (Oe)
      return t = Bt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = i, l !== yo && (e = Error(o(422), { cause: l }), Hs(Mn(e, n)))) : (l !== yo && (t = Error(o(423), {
        cause: l
      }), Hs(
        Mn(t, n)
      )), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, l = Mn(l, n), i = Jo(
        e.stateNode,
        l,
        i
      ), ko(e, i), yt !== 4 && (yt = 2)), !1;
    var r = Error(o(520), { cause: l });
    if (r = Mn(r, n), lc === null ? lc = [r] : lc.push(r), yt !== 4 && (yt = 2), t === null) return !0;
    l = Mn(l, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = i & -i, n.lanes |= e, e = Jo(n.stateNode, l, e), ko(n, e), !1;
        case 1:
          if (t = n.type, r = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || r !== null && typeof r.componentDidCatch == "function" && (ma === null || !ma.has(r))))
            return n.flags |= 65536, i &= -i, n.lanes |= i, i = Sp(i), jp(
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
  var Po = Error(o(461)), Nt = !1;
  function wt(e, t, n, l) {
    t.child = e === null ? wm(t, null, n, l) : Xa(
      t,
      e.child,
      n,
      l
    );
  }
  function Np(e, t, n, l, i) {
    n = n.render;
    var r = t.ref;
    if ("ref" in l) {
      var h = {};
      for (var v in l)
        v !== "ref" && (h[v] = l[v]);
    } else h = l;
    return $a(t), l = Do(
      e,
      t,
      n,
      h,
      r,
      i
    ), v = zo(), e !== null && !Nt ? (Lo(e, t, i), Ul(e, t, i)) : (Oe && v && ir(t), t.flags |= 1, wt(e, t, l, i), t.child);
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
        if (Nt = !1, t.pendingProps = l = r, cf(e, i))
          (e.flags & 131072) !== 0 && (Nt = !0);
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
  function Fs(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function kp(e, t, n, l, i) {
    var r = No();
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
      if (Oe) {
        if (l.mode === "hidden")
          return e = kr(t, l), t.lanes = 536870912, e.memoizedState = { baseLanes: 0, cachePool: null }, Fs(null, e);
        if (Oo(t), (e = it) ? (e = e0(
          e,
          Ln
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Wl !== null ? { id: ul, overflow: ol } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = fm(e), n.return = t, t.child = n, _t = t, it = null)) : e = null, e === null) throw ta(t);
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
        else throw Error(o(558));
      else if (Nt || Ba(e, t, n, !1), i = (n & e.childLanes) !== 0, Nt || i) {
        if (ca.current === null) {
          if (l = lt, l !== null && (h = Ns(l, n), h !== 0 && h !== r.retryLane))
            throw r.retryLane = h, za(e, h), fn(l, e, h), Po;
          Qr();
        }
        t = Ap(
          e,
          t,
          n
        );
      } else
        e = r.treeContext, it = Hn(h.nextSibling), _t = t, Oe = !0, ea = null, Ln = !1, e !== null && mm(t, e), t = kr(t, l), t.flags |= 134221824;
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
        throw Error(o(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function Wo(e, t, n, l, i) {
    return $a(t), n = Do(
      e,
      t,
      n,
      l,
      void 0,
      i
    ), l = zo(), e !== null && !Nt ? (Lo(e, t, i), Ul(e, t, i)) : (Oe && l && ir(t), t.flags |= 1, wt(e, t, n, i), t.child);
  }
  function _p(e, t, n, l, i, r) {
    return $a(t), t.updateQueue = null, n = Rm(
      t,
      l,
      n,
      i
    ), Om(e), l = zo(), e !== null && !Nt ? (Lo(e, t, r), Ul(e, t, r)) : (Oe && l && ir(t), t.flags |= 1, wt(e, t, n, r), t.child);
  }
  function Cp(e, t, n, l, i) {
    if ($a(t), t.stateNode === null) {
      var r = Si, h = n.contextType;
      typeof h == "object" && h !== null && (r = Ht(h)), r = new n(l, r), t.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = Fo, t.stateNode = r, r._reactInternals = t, r = t.stateNode, r.props = l, r.state = t.memoizedState, r.refs = {}, To(t), h = n.contextType, r.context = typeof h == "object" && h !== null ? Ht(h) : Si, r.state = t.memoizedState, h = n.getDerivedStateFromProps, typeof h == "function" && (Io(
        t,
        n,
        h,
        l
      ), r.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof r.getSnapshotBeforeUpdate == "function" || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (h = r.state, typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount(), h !== r.state && Fo.enqueueReplaceState(r, r.state, null), Xs(t, l, r, i), Vs(), r.state = t.memoizedState), typeof r.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      r = t.stateNode;
      var v = t.memoizedProps, w = Qa(n, v);
      r.props = w;
      var R = r.context, H = n.contextType;
      h = Si, typeof H == "object" && H !== null && (h = Ht(H));
      var G = n.getDerivedStateFromProps;
      H = typeof G == "function" || typeof r.getSnapshotBeforeUpdate == "function", v = t.pendingProps !== v, H || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (v || R !== h) && gp(
        t,
        r,
        l,
        h
      ), aa = !1;
      var C = t.memoizedState;
      r.state = C, Xs(t, l, r, i), Vs(), R = t.memoizedState, v || C !== R || aa ? (typeof G == "function" && (Io(
        t,
        n,
        G,
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
      r = t.stateNode, wo(e, t), h = t.memoizedProps, H = Qa(n, h), r.props = H, G = t.pendingProps, C = r.context, R = n.contextType, w = Si, typeof R == "object" && R !== null && (w = Ht(R)), v = n.getDerivedStateFromProps, (R = typeof v == "function" || typeof r.getSnapshotBeforeUpdate == "function") || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (h !== G || C !== w) && gp(
        t,
        r,
        l,
        w
      ), aa = !1, C = t.memoizedState, r.state = C, Xs(t, l, r, i), Vs();
      var z = t.memoizedState;
      h !== G || C !== z || aa || e !== null && e.dependencies !== null && rr(e.dependencies) ? (typeof v == "function" && (Io(
        t,
        n,
        v,
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
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= Nn), e;
  }
  function Rp(e, t, n) {
    var l = t.pendingProps, i = !1, r = (t.flags & 128) !== 0, h;
    if ((h = r) || (h = e !== null && e.memoizedState === null ? !1 : ($t.current & 2) !== 0), h && (i = !0, t.flags &= -129), h = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Oe) {
        if (i ? ra(t) : ua(), (e = it) ? (e = e0(
          e,
          Ln
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Wl !== null ? { id: ul, overflow: ol } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = fm(e), n.return = t, t.child = n, _t = t, it = null)) : e = null, e === null) throw ta(t);
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
      ), t.memoizedState = ef, Fs(null, l)) : (ra(t), lf(t, r));
    }
    var v = e.memoizedState;
    if (v !== null) {
      var w = v.dehydrated;
      if (w !== null)
        return kb(
          e,
          t,
          r,
          h,
          l,
          w,
          v,
          n
        );
    }
    return i ? (ua(), i = l.fallback, r = t.mode, v = e.child, w = v.sibling, l = Ol(v, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = v.subtreeFlags & 1206910976, w !== null ? i = Ol(w, i) : (i = La(
      i,
      r,
      n,
      null
    ), i.flags |= 2), i.return = t, l.return = t, l.sibling = i, t.child = l, Fs(null, l), l = t.child, i = e.child.memoizedState, i === null ? i = tf(n) : (r = i.cachePool, r !== null ? (v = St._currentValue, r = r.parent !== v ? { parent: v, pool: v } : r) : r = xm(), i = {
      baseLanes: i.baseLanes | n,
      cachePool: r
    }), l.memoizedState = i, l.childLanes = nf(
      e,
      h,
      n
    ), t.memoizedState = ef, Fs(e.child, l)) : (ra(t), n = e.child, e = n.sibling, n = Ol(n, {
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
  function kb(e, t, n, l, i, r, h, v) {
    if (n)
      return t.flags & 256 ? (ra(t), t.flags &= -257, _r(
        e,
        t,
        v
      )) : t.memoizedState !== null ? (ua(), t.child = e.child, t.flags |= 128, null) : (ua(), r = i.fallback, h = t.mode, i = Ar(
        { mode: "visible", children: i.children },
        h
      ), r = La(
        r,
        h,
        v,
        null
      ), r.flags |= 2, i.return = t, r.return = t, i.sibling = r, t.child = i, Xa(t, e.child, null, v), i = t.child, i.memoizedState = tf(v), i.childLanes = nf(
        e,
        l,
        v
      ), t.memoizedState = ef, Fs(null, i));
    if (ra(t), nd(r)) {
      if (l = r.nextSibling && r.nextSibling.dataset, l) var w = l.dgst;
      return l = w, l !== "" && (i = Error(o(419)), i.stack = "", i.digest = l, Hs({ value: i, source: null, stack: null })), _r(
        e,
        t,
        v
      );
    }
    if (Nt || Ba(e, t, v, !1), l = (v & e.childLanes) !== 0, Nt || l) {
      if (ca.current !== null)
        return _r(
          e,
          t,
          v
        );
      if (l = lt, l !== null && (i = Ns(
        l,
        v
      ), i !== 0 && i !== h.retryLane))
        throw h.retryLane = i, za(e, i), fn(l, e, i), Po;
      return td(r) || Qr(), _r(
        e,
        t,
        v
      );
    }
    return td(r) ? (t.flags |= 192, t.child = e.child, null) : (e = h.treeContext, it = Hn(r.nextSibling), _t = t, Oe = !0, ea = null, Ln = !1, e !== null && mm(t, e), t = lf(
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
    var h = $t.current;
    if (t.flags & 128)
      return Zs(t, h), null;
    var v = (h & 2) !== 0;
    if (v ? (h = h & 1 | 2, t.flags |= 128) : h &= 1, Zs(t, h), i === "backwards" && e !== null ? (af(e), wt(e, t, l, n), af(e)) : wt(e, t, l, n), l = Oe ? Us : 0, !v && e !== null && (e.flags & 128) !== 0)
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
      throw Error(o(153));
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
        Gn(t, t.stateNode.containerInfo), na(t, St, e.memoizedState.cache), Ua();
        break;
      case 27:
      case 5:
        Nl(t);
        break;
      case 4:
        Gn(t, t.stateNode.containerInfo);
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
        if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), Zs(t, $t.current), l) break;
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
        Nt = !0;
      else {
        if (!cf(e, n) && (t.flags & 128) === 0)
          return Nt = !1, Ab(
            e,
            t,
            n
          );
        Nt = (e.flags & 131072) !== 0;
      }
    else
      Nt = !1, Oe && (t.flags & 1048576) !== 0 && hm(t, Us, t.index);
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
              if (i === W) {
                t.tag = 11, t = Np(
                  null,
                  t,
                  e,
                  l,
                  n
                );
                break e;
              } else if (i === je) {
                t.tag = 14, t = Ep(
                  null,
                  t,
                  e,
                  l,
                  n
                );
                break e;
              } else if (i === Re) {
                t.tag = 10, t.type = e, t = zp(
                  null,
                  t,
                  n
                );
                break e;
              }
            }
            throw t = Me(e) || e, Error(o(306, t, ""));
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
          if (Gn(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(o(387));
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
              i = Mn(
                Error(o(424)),
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
              for (it = Hn(e.firstChild), _t = t, Oe = !0, ea = null, Ln = !0, n = wm(
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
        )) ? t.memoizedState = n : Oe || (t.stateNode = $g(
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
        return Nl(t), e === null && Oe && (l = t.stateNode = l0(
          t.type,
          t.pendingProps,
          ln.current
        ), _t = t, Ln = !0, i = it, ya(t.type) ? (ld = i, it = Hn(l.firstChild)) : it = i), wt(
          e,
          t,
          t.pendingProps.children,
          n
        ), Oi(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Oe && ((i = l = it) && (l = jx(
          l,
          t.type,
          t.pendingProps,
          Ln
        ), l !== null ? (t.stateNode = l, _t = t, it = Hn(l.firstChild), Ln = !1, i = !0) : i = !1), i || ta(t)), Nl(t), i = t.type, r = t.pendingProps, h = e !== null ? e.memoizedProps : null, l = r.children, Kf(i, r) ? l = null : h !== null && Kf(i, h) && (t.flags |= 32), t.memoizedState !== null && (i = Do(
          e,
          t,
          yb,
          null,
          null,
          n
        ), Ii._currentValue = i), Oi(e, t), wt(e, t, l, n), t.child;
      case 6:
        return e === null && Oe && ((e = n = it) && (n = Nx(
          n,
          t.pendingProps,
          Ln
        ), n !== null ? (t.stateNode = n, _t = t, it = null, e = !0) : e = !1), e || ta(t)), null;
      case 13:
        return Rp(e, t, n);
      case 4:
        return Gn(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = Xa(
          t,
          null,
          l,
          n
        ) : wt(e, t, l, n), t.child;
      case 11:
        return Np(
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
        return i = t.type._context, l = t.pendingProps.children, $a(t), i = Ht(i), l = l(i), t.flags |= 1, wt(e, t, l, n), t.child;
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
        return $a(t), l = Ht(St), e === null ? (i = No(), i === null && (i = lt, r = So(), i.pooledCache = r, r.refCount++, r !== null && (i.pooledCacheLanes |= n), i = r), t.memoizedState = { parent: l, cache: i }, To(t), na(t, St, i)) : ((e.lanes & n) !== 0 && (wo(e, t), Xs(t, null, null, n), Vs()), i = e.memoizedState, r = t.memoizedState, i.parent !== l ? (i = { parent: l, cache: l }, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), na(t, St, l)) : (l = r.cache, na(t, St, l), l !== i.cache && xo(
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
        }), l = t.pendingProps, l.name != null && l.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : Oe && ir(t), e !== null && e.memoizedProps.name !== l.name ? t.flags |= 4194816 : Oi(e, t), wt(e, t, l.children, n), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
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
  function Js(e, t) {
    if (!Oe)
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
  function st(e) {
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
        return st(t), null;
      case 1:
        return st(t), null;
      case 3:
        return n = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), Dl(St), pn(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Ei(t) ? Hl(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, vo())), st(t), null;
      case 26:
        var i = t.type, r = t.memoizedState;
        return e === null ? (Hl(t), r !== null ? (st(t), Up(t, r)) : (st(t), rf(
          t,
          i,
          null,
          l,
          n
        ))) : r ? r !== e.memoizedState ? (Hl(t), st(t), Up(t, r)) : (st(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && Hl(t), st(t), rf(
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
              throw Error(o(166));
            return st(t), t.subtreeFlags &= -33554433, null;
          }
          e = ct.current, Ei(t) ? pm(t) : (e = l0(i, l, n), t.stateNode = e, Hl(t));
        }
        return st(t), t.subtreeFlags &= -33554433, null;
      case 5:
        if (El(t), i = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Hl(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(o(166));
            return st(t), t.subtreeFlags &= -33554433, null;
          }
          if (r = ct.current, Ei(t))
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
            r[at] = t, r[zt] = l;
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
        return st(t), t.subtreeFlags &= -33554433, rf(
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
            throw Error(o(166));
          if (e = ln.current, Ei(t)) {
            if (e = t.stateNode, n = t.memoizedProps, l = null, i = _t, i !== null)
              switch (i.tag) {
                case 27:
                case 5:
                  l = i.memoizedProps;
              }
            e[at] = t, e = !!(e.nodeValue === n || l !== null && l.suppressHydrationWarning === !0 || Lg(e.nodeValue, n)), e || ta(t, !0);
          } else
            e = rc(e).createTextNode(
              l
            ), e[at] = t, t.stateNode = e;
        }
        return st(t), null;
      case 31:
        if (n = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = Ei(t), n !== null) {
            if (e === null) {
              if (!l) throw Error(o(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(557));
              e[at] = t;
            } else
              Ua(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            st(t), e = !1;
          } else
            n = vo(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
          if (!e)
            return t.flags & 256 ? (xn(t), t) : (xn(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(o(558));
        }
        return st(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (i = Ei(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!i) throw Error(o(318));
              if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(o(317));
              i[at] = t;
            } else
              Ua(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            st(t), i = !1;
          } else
            i = vo(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
          if (!i)
            return t.flags & 256 ? (xn(t), t) : (xn(t), null);
        }
        return xn(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = l !== null, e = e !== null && e.memoizedState !== null, n && (l = t.child, i = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (i = l.alternate.memoizedState.cachePool.pool), r = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (r = l.memoizedState.cachePool.pool), r !== i && (l.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Or(t, t.updateQueue), st(t), null);
      case 4:
        return pn(), e === null && Gf(t.stateNode.containerInfo), t.flags |= 67108864, st(t), null;
      case 10:
        return Dl(t.type), st(t), null;
      case 19:
        if (Ro(t), l = t.memoizedState, l === null) return st(t), null;
        if (i = (t.flags & 128) !== 0, r = l.rendering, r === null)
          if (i) Js(l, !1);
          else {
            if (yt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (r = gr(e), r !== null) {
                  for (t.flags |= 128, Js(l, !1), e = r.updateQueue, t.updateQueue = e, Or(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; )
                    om(n, e), n = n.sibling;
                  return Zs(
                    t,
                    $t.current & 1 | 2
                  ), Oe && Rl(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && Xt() > Gr && (t.flags |= 128, i = !0, Js(l, !1), t.lanes = 4194304);
          }
        else {
          if (!i)
            if (e = gr(r), e !== null) {
              if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, Or(t, e), Js(l, !0), l.tail === null && l.tailMode !== "collapsed" && l.tailMode !== "visible" && !r.alternate && !Oe)
                return st(t), null;
            } else
              2 * Xt() - l.renderingStartTime > Gr && n !== 536870912 && (t.flags |= 128, i = !0, Js(l, !1), t.lanes = 4194304);
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
          return l.rendering = e, l.tail = e.sibling, l.renderingStartTime = Xt(), e.sibling = null, r = $t.current, r = i ? r & 1 | 2 : r & 1, l.tailMode === "visible" || l.tailMode === "collapsed" || !n || Oe ? Zs(t, r) : (n = r, Xe(Bt, t), Xe($t, n), Zt === null && (Zt = t)), Oe && Rl(t, l.treeForkCount), e;
        }
        return st(t), null;
      case 22:
      case 23:
        return xn(t), Co(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (st(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : st(t), n = t.updateQueue, n !== null && Or(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== n && (t.flags |= 2048), e !== null && ge(Ya), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Dl(St), st(t), null;
      case 25:
        return null;
      case 30:
        return t.flags |= 33554432, st(t), null;
    }
    throw Error(o(156, t.tag));
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
            throw Error(o(340));
          Ua();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (xn(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(o(340));
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
        return xn(t), Co(), e !== null && ge(Ya), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
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
        xn(t), Co(), e !== null && ge(Ya);
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
    } catch (v) {
      Pe(t, t.return, v);
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
            var h = l.inst, v = h.destroy;
            if (v !== void 0) {
              h.destroy = void 0, i = t;
              var w = n, R = v;
              try {
                R();
              } catch (H) {
                Pe(
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
      Pe(t, t.return, H);
    }
  }
  function Bp(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        Am(t, n);
      } catch (l) {
        Pe(e, e.return, l);
      }
    }
  }
  function $p(e, t, n) {
    n.props = Qa(
      e.type,
      e.memoizedProps
    ), n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (l) {
      Pe(e, t, l);
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
              g(
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
    } catch (v) {
      Pe(e, t, v);
    }
  }
  function qt(e, t) {
    var n = e.ref, l = e.refCleanup;
    if (n !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (i) {
          Pe(e, t, i);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (i) {
          Pe(e, t, i);
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
  function qp(e) {
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
      Pe(e, e.return, i);
    }
  }
  function df(e, t, n) {
    try {
      var l = e.stateNode;
      nx(l, e.type, n, t), l[zt] = t;
    } catch (i) {
      Pe(e, e.return, i);
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
      i = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(i, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(i), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = rl)), Rr(e, l), Ye = !0;
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
      i = e.stateNode, t ? n.insertBefore(i, t) : n.appendChild(i), Rr(e, l), Ye = !0;
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
      Yt(t, l, n), t[at] = e, t[zt] = n;
    } catch (r) {
      Pe(e, e.return, r);
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
          var v = Jf(h);
          l.push(v), v.view && (r = !0);
        } else
          r || Jf(h).view && (r = !0);
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
            throw Error(o(544));
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
      r !== "none" ? Ri(e, i, r, null, !1) ? (zr(e), n.paired || t || $i(e, l.onEnter)) : hl(e.child, !1) : zr(e);
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
                  ) ? (r = e.stateNode, i.paired = r, r.paired = i, $i(e, n.onShare)) : hl(e.child, !1)), t.delete(l), t.size === 0) break;
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
      i !== "none" && (Ri(e, n, i, null, !1) ? l !== void 0 ? (i = e.stateNode, l.paired = i, i.paired = l, Sn.delete(n), $i(e, t.onShare)) : $i(e, t.onExit) : hl(e.child, !1)), Sn !== null && gf(e);
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
    for (var v = !1; t !== null; ) {
      if (t.tag === 5) {
        var w = t.stateNode;
        if (r !== null && rn < r.length) {
          var R = r[rn], H = Jf(w);
          (R.view || H.view) && (v = !0);
          var G;
          if (G = (e.flags & 4) === 0)
            if (H.clip) G = !0;
            else {
              G = R.rect;
              var C = H.rect;
              G = G.y !== C.y || G.x !== C.x || G.height !== C.height || G.width !== C.width;
            }
          G && (e.flags |= 4), H.abs ? H = !R.abs : (R = R.rect, H = H.rect, H = R.height !== H.height || R.width !== H.width), H && (e.flags |= 32);
        } else e.flags |= 32;
        (e.flags & 4) !== 0 && Xg(
          w,
          rn === 0 ? n : n + "_" + rn,
          i
        ), v && (e.flags & 4) !== 0 || (dl === null && (dl = []), dl.push(
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
      ) && (v = !0));
      t = t.sibling;
    }
    return v;
  }
  function Ip(e, t) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var n = e.memoizedProps, l = e.stateNode, i = _l(n, l), r = Cl(n.default, n.update), h;
        h = e.memoizedState, e.memoizedState = null, l = e;
        var v = e.child;
        rn = 0, i = bf(
          l,
          v,
          i,
          i,
          r,
          h,
          !1
        ), (e.flags & 4) !== 0 && i && $i(e, n.onUpdate);
      } else
        (e.subtreeFlags & 33554432) !== 0 && Ip(e);
      e = e.sibling;
    }
  }
  var Ct = !1, Ie = !1, ml = !1, xf = !1, Fp = typeof WeakSet == "function" ? WeakSet : Set, Ot = null, pl = !1, ec = !1, Ur = !1, Sf = !1;
  function Ob(e, t, n) {
    if (e = e.containerInfo, Zf = Fi, e = em(e), io(e)) {
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
            var v = 0, w = -1, R = -1, H = 0, G = 0, C = e, z = null;
            t: for (; ; ) {
              for (var ne; C !== l || r !== 0 && C.nodeType !== 3 || (w = v + r), C !== h || i !== 0 && C.nodeType !== 3 || (R = v + i), C.nodeType === 3 && (v += C.nodeValue.length), (ne = C.firstChild) !== null; )
                z = C, C = ne;
              for (; ; ) {
                if (C === e) break t;
                if (z === l && ++H === r && (w = v), z === h && ++G === i && (R = v), (ne = C.nextSibling) !== null) break;
                C = z, z = C.parentNode;
              }
              C = ne;
            }
            l = w === -1 || R === -1 ? null : { start: w, end: R };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Qf = { focusedElem: e, selectionRange: l }, Fi = !1, n = (n & 335544064) === n, Ot = t, t = n ? 9270 : 1024; Ot !== null; ) {
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
            } catch (v) {
              Pe(t, t.return, v);
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
          if ((i & 1024) !== 0) throw Error(o(163));
      }
      if (l = t.sibling, l !== null) {
        l.return = t.return, Ot = l;
        break;
      }
      Ot = t.return;
    }
  }
  function Jp(e, t, n) {
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
              Pe(n, n.return, h);
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
              Pe(
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
            Pe(n, n.return, h);
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
          var r = t !== null && t.memoizedState !== null || Ie;
          t = Ct, i = Ie, Ct = l, (Ie = r) && !i ? (l = 2, (n.subtreeFlags & 8772) !== 0 && (l |= 1), Fn(
            e,
            n,
            l
          )) : gl(e, n), Ct = t, Ie = i;
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
  function jf(e, t) {
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
          Pe(e, e.return, w);
        }
        Nf(e, t);
        break;
      case 6:
        try {
          e.stateNode.nodeValue = t ? "" : e.memoizedProps, Ye = !0;
        } catch (w) {
          Pe(e, e.return, w);
        }
        break;
      case 18:
        try {
          var v = e.stateNode;
          t ? Vg(v, !0) : Vg(e.stateNode, !1);
        } catch (w) {
          Pe(e, e.return, w);
        }
        break;
      case 22:
      case 23:
        e.memoizedState === null && jf(e, t);
        break;
      default:
        jf(e, t);
    }
  }
  function Nf(e, t) {
    if (e.subtreeFlags & 67108864)
      for (e = e.child; e !== null; ) {
        e: {
          var n = e, l = t;
          switch (n.tag) {
            case 4:
              Pp(n, l);
              break e;
            case 22:
              n.memoizedState === null && Nf(n, l);
              break e;
            default:
              Nf(n, l);
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
  function Kn(e, t, n) {
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
        Ie || qt(n, t), Kn(
          e,
          t,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !Ie && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        Ie || qt(n, t), Ws(n);
        var l = ht, i = un;
        ya(n.type) && (ht = n.stateNode, un = !1), Kn(
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
        Ie || qt(n, t), Ws(n);
      case 6:
        if (n.tag === 6 && Ws(n), l = ht, i = un, ht = null, Kn(
          e,
          t,
          n
        ), ht = l, un = i, ht !== null)
          if (un)
            try {
              (ht.nodeType === 9 ? ht.body : ht.nodeName === "HTML" ? ht.ownerDocument.body : ht).removeChild(n.stateNode), Ye = !0;
            } catch (r) {
              Pe(
                n,
                t,
                r
              );
            }
          else
            try {
              ht.removeChild(n.stateNode), Ye = !0;
            } catch (r) {
              Pe(
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
        ), Ji(e)) : Gg(ht, n.stateNode));
        break;
      case 4:
        l = ht, i = un, ht = n.stateNode.containerInfo, un = !0, Kn(
          e,
          t,
          n
        ), ht = l, un = i;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        oa(2, n, t), Ie || oa(4, n, t), Kn(
          e,
          t,
          n
        );
        break;
      case 1:
        Ie || (qt(n, t), l = n.stateNode, typeof l.componentWillUnmount == "function" && $p(
          n,
          t,
          l
        )), Kn(
          e,
          t,
          n
        );
        break;
      case 21:
        Kn(
          e,
          t,
          n
        );
        break;
      case 22:
        Ie = (l = Ie) || n.memoizedState !== null, Kn(
          e,
          t,
          n
        ), Ie = l;
        break;
      case 30:
        qt(n, t), Kn(
          e,
          t,
          n
        );
        break;
      case 7:
        Ie || qt(n, t), Kn(
          e,
          t,
          n
        );
        break;
      default:
        Kn(
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
        Ji(e);
      } catch (n) {
        Pe(t, t.return, n);
      }
    }
  }
  function ng(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Ji(e);
      } catch (n) {
        Pe(t, t.return, n);
      }
  }
  function Rb(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Fp()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Fp()), t;
      default:
        throw Error(o(435, e.tag));
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
        var r = l[i], h = e, v = t, w = v;
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
        if (ht === null) throw Error(o(160));
        eg(h, v, r), ht = null, un = !1, h = r.alternate, h !== null && (h.return = null), r.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        lg(t, e, n), t = t.sibling;
  }
  var In = null;
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
        en(t, e, n), tn(e), i & 512 && (Ie || l === null || qt(l, l.return)), i & 64 && Ct && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
        break;
      case 26:
        if (r = In, en(t, e, n), tn(e), i & 512 && (Ie || l === null || qt(l, l.return)), i & 4)
          if (i = l !== null ? l.memoizedState : null, n = e.memoizedState, l === null)
            if (n === null)
              if (e.stateNode === null)
                if (Ct)
                  e.stateNode = $g(
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
                        l = i.getElementsByTagName("title")[0], (!l || l[Aa] || l[at] || l.namespaceURI === "http://www.w3.org/2000/svg" || l.hasAttribute("itemprop")) && (l = i.createElement(t), i.head.insertBefore(
                          l,
                          i.querySelector("head > title")
                        )), Yt(l, t, n), l[at] = e, dt(l), t = l;
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
                        throw Error(o(468, t));
                    }
                    l[at] = e, dt(l), t = l;
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
            i !== n ? (i === null ? (t = l.stateNode, t === null || Ie || t.parentNode.removeChild(t)) : i.count--, n === null ? Ct || cd(r, e.type, e.stateNode) : u0(r, n, e.memoizedProps)) : n === null && e.stateNode !== null && df(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        break;
      case 27:
        en(t, e, n), tn(e), i & 512 && (Ie || l === null || qt(l, l.return)), l !== null && i & 4 && df(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (r = ml, ml = !1, en(t, e, n), ml = r, tn(e), i & 512 && (Ie || l === null || qt(l, l.return)), e.flags & 32) {
          t = e.stateNode;
          try {
            pt(t, ""), Ye = !0;
          } catch (H) {
            Pe(e, e.return, H);
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
            throw Error(o(162));
          t = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = t, Ye = !0;
          } catch (H) {
            Pe(e, e.return, H);
          }
        }
        break;
      case 3:
        if (Ye = !1, eu = null, r = In, In = uc(t.containerInfo), en(t, e, n), In = r, tn(e), i & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Ji(t.containerInfo);
          } catch (H) {
            Pe(e, e.return, H);
          }
        xf && (xf = !1, ag(e)), Ye = !1;
        break;
      case 4:
        i = ml, ml = Ct, l = Vc(), r = In, In = uc(
          e.stateNode.containerInfo
        ), en(t, e, n), tn(e), In = r, Ye && ec && (Ur = !0), Ye = l, ml = i;
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
        var v = Ct, w = Ie, R = ml;
        Ct = v || r, ml = R || r, Ie = w || h, en(t, e, n), Ie = w, ml = R, Ct = v, tn(e), i & 8192 && (t = e.stateNode, t._visibility = r ? t._visibility & -2 : t._visibility | 1, !r || l === null || h || Ct || Ie || (t = h || Ie, n = Ct, l = Ie, Ct = r || Ct, Ie = t, fa(e, 2), Ct = n, Ie = l), !r && ml || jf(e, r)), i & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, Br(e, n))));
        break;
      case 19:
        en(t, e, n), tn(e), i & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Br(e, t)));
        break;
      case 30:
        i & 512 && (Ie || l === null || qt(l, l.return)), i = Vc(), r = ec, h = (n & 335544064) === n, v = e.memoizedProps, ec = h && Cl(
          v.default,
          v.update
        ) !== "none", en(t, e, n), tn(e), h && l !== null && Ye && (e.flags |= 4), ec = r, Ye = i;
        break;
      case 21:
        break;
      case 7:
        i & 512 && (Ie || l === null || qt(l, l.return)), l && l.stateNode !== null && (l.stateNode._fragmentFiber = e);
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
        if (n == null) throw Error(o(160));
        switch (n.tag) {
          case 27:
            var v = n.stateNode, w = hf(e);
            Mr(
              e,
              w,
              v,
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
            var G = n.stateNode.containerInfo, C = hf(e);
            mf(
              e,
              C,
              G,
              h
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (z) {
        Pe(e, e.return, z);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function ag(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        ag(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, Fi = !0, t.reset(), Fi = !1), e = e.sibling;
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
          var v = Cl(r.default, r.update);
          v === "none" ? t = !1 : (r = n.memoizedState, n.memoizedState = null, n = e.child, rn = 0, t = bf(
            e,
            n,
            t,
            h,
            v,
            r,
            !0
          ), rn !== (r === null ? 0 : r.length) && (e.flags |= 32)), (e.flags & 4) !== 0 && t ? ($i(
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
        Jp(e, t.alternate, t), t = t.sibling;
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
          qt(n, n.return);
          var i = n.stateNode;
          typeof i.componentWillUnmount == "function" && $p(
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
          qt(n, n.return), n.tag !== 5 && n.tag !== 27 || Ws(n), fa(
            n,
            l
          );
          break;
        case 6:
          Ws(n);
          break;
        case 26:
          qt(n, n.return), i = n.stateNode, n.memoizedState !== null || i === null || Ie || i.parentNode.removeChild(i), fa(
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
          qt(n, n.return), fa(
            n,
            l
          );
          break;
        case 7:
          qt(n, n.return);
        default:
          fa(
            n,
            l
          );
      }
      e = e.sibling;
    }
  }
  function Fn(e, t, n) {
    for (n = (t.subtreeFlags & 8772) !== 0 ? n : n & -2, t = t.child; t !== null; ) {
      var l = t.alternate, i = e, r = t, h = r.flags, v = (n & 1) !== 0;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          Fn(
            i,
            r,
            n
          ), Ps(4, r);
          break;
        case 1:
          if (Fn(
            i,
            r,
            n
          ), l = r, i = l.stateNode, typeof i.componentDidMount == "function")
            try {
              i.componentDidMount();
            } catch (H) {
              Pe(l, l.return, H);
            }
          if (l = r, i = l.updateQueue, i !== null) {
            var w = l.stateNode;
            try {
              var R = i.shared.hiddenCallbacks;
              if (R !== null)
                for (i.shared.hiddenCallbacks = null, i = 0; i < R.length; i++)
                  km(R[i], w);
            } catch (H) {
              Pe(l, l.return, H);
            }
          }
          v && h & 64 && Bp(r), fl(r, r.return);
          break;
        case 27:
          (n & 2) !== 0 && Gp(r);
        case 5:
          r.tag !== 5 && r.tag !== 27 || qp(r), Fn(
            i,
            r,
            n
          ), v && l === null && h & 4 && ff(r), fl(r, r.return);
          break;
        case 6:
          qp(r);
          break;
        case 26:
          w = r.stateNode, r.memoizedState !== null || w === null || Ct || cd(
            uc(w.ownerDocument),
            r.type,
            w
          ), Fn(
            i,
            r,
            n
          ), v && l === null && h & 4 && ff(r), fl(r, r.return);
          break;
        case 12:
          Fn(
            i,
            r,
            n
          );
          break;
        case 31:
          Fn(
            i,
            r,
            n
          ), v && h & 4 && tg(i, r);
          break;
        case 13:
          Fn(
            i,
            r,
            n
          ), v && h & 4 && ng(i, r);
          break;
        case 22:
          r.memoizedState === null && Fn(
            i,
            r,
            n
          ), fl(r, r.return);
          break;
        case 30:
          Fn(
            i,
            r,
            n
          ), fl(r, r.return);
          break;
        case 7:
          fl(r, r.return);
        default:
          Fn(
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
  function Un(e, t, n, l) {
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
        Un(
          e,
          t,
          n,
          l
        ), r & 2048 && Ps(9, t);
        break;
      case 1:
        Un(
          e,
          t,
          n,
          l
        );
        break;
      case 3:
        Un(
          e,
          t,
          n,
          l
        ), i && Sf && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), r & 2048 && (r = null, t.alternate !== null && (r = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== r && (t.refCount++, r != null && Bs(r)));
        break;
      case 12:
        if (r & 2048) {
          Un(
            e,
            t,
            n,
            l
          ), r = t.stateNode;
          try {
            var h = t.memoizedProps, v = h.id, w = h.onPostCommit;
            typeof w == "function" && w(
              v,
              t.alternate === null ? "mount" : "update",
              r.passiveEffectDuration,
              -0
            );
          } catch (R) {
            Pe(t, t.return, R);
          }
        } else
          Un(
            e,
            t,
            n,
            l
          );
        break;
      case 31:
        Un(
          e,
          t,
          n,
          l
        );
        break;
      case 13:
        Un(
          e,
          t,
          n,
          l
        );
        break;
      case 23:
        break;
      case 22:
        h = t.stateNode, v = t.alternate, t.memoizedState !== null ? (i && v !== null && v.memoizedState === null && Lr(v), h._visibility & 2 ? Un(
          e,
          t,
          n,
          l
        ) : tc(
          e,
          t
        )) : (i && v !== null && v.memoizedState !== null && Lr(t), h._visibility & 2 ? Un(
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
        ))), r & 2048 && Ef(v, t);
        break;
      case 24:
        Un(
          e,
          t,
          n,
          l
        ), r & 2048 && Tf(t.alternate, t);
        break;
      case 30:
        i && (r = t.alternate, r !== null && (hl(r.child, !0), hl(t.child, !0))), Un(
          e,
          t,
          n,
          l
        );
        break;
      default:
        Un(
          e,
          t,
          n,
          l
        );
    }
  }
  function Di(e, t, n, l, i) {
    for (i = i && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var r = e, h = t, v = n, w = l, R = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          Di(
            r,
            h,
            v,
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
            v,
            w,
            i
          ) : tc(
            r,
            h
          ) : (H._visibility |= 2, Di(
            r,
            h,
            v,
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
            v,
            w,
            i
          ), i && R & 2048 && Tf(h.alternate, h);
          break;
        default:
          Di(
            r,
            h,
            v,
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
          In,
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
        var l = In;
        In = uc(e.stateNode.containerInfo), Ia(
          e,
          t,
          n
        ), In = l;
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
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, $r(e)) : nc(e);
        break;
      default:
        nc(e);
    }
  }
  function $r(e) {
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
          oa(8, t, t.return), $r(t);
          break;
        case 22:
          n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, $r(t));
          break;
        default:
          $r(t);
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
  }, Db = typeof WeakMap == "function" ? WeakMap : Map, Qe = 0, lt = null, ze = null, $e = 0, Je = 0, jn = null, da = !1, zi = !1, wf = !1, Bl = 0, yt = 0, ha = 0, Fa = 0, qr = 0, Nn = 0, Li = 0, lc = null, on = null, kf = !1, Yr = 0, fg = 0, Gr = 1 / 0, Vr = null, ma = null, mt = 0, Jn = null, Ja = null, yl = 0, Af = 0, _f = null, dg = null, Ui = null, Hi = null, Bi = null, ac = 0, Xr = null;
  function En() {
    return (Qe & 2) !== 0 && $e !== 0 ? $e & -$e : re.T !== null ? Bf() : $c();
  }
  function hg() {
    if (Nn === 0)
      if (($e & 536870912) === 0 || Oe) {
        var e = wa;
        wa <<= 1, (wa & 3932160) === 0 && (wa = 262144), Nn = e;
      } else Nn = 536870912;
    return e = Bt.current, e !== null && (e.flags |= 32), Nn;
  }
  function $i(e, t) {
    if (t != null) {
      var n = e.stateNode, l = n.ref;
      l === null && (l = n.ref = Qg(
        _l(e.memoizedProps, n)
      )), Hi === null && (Hi = []), Hi.push(t.bind(null, l));
    }
  }
  function fn(e, t, n) {
    (e === lt && (Je === 2 || Je === 9) || e.cancelPendingCommit !== null) && (qi(e, 0), pa(
      e,
      $e,
      Nn,
      !1
    )), Cn(e, n), ((Qe & 2) === 0 || e !== lt) && (e === lt && ((Qe & 2) === 0 && (Fa |= n), yt === 4 && pa(
      e,
      $e,
      Nn,
      !1
    )), vl(e));
  }
  function mg(e, t, n) {
    if ((Qe & 6) !== 0) throw Error(o(327));
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
              var v = e;
              i = lc;
              var w = v.current.memoizedState.isDehydrated;
              if (w && (qi(v, h).flags |= 256), h = Of(
                v,
                h,
                !1
              ), h !== 2 && h !== 6) {
                if (wf && !w) {
                  v.errorRecoveryDisabledLanes |= r, Fa |= r, i = 4;
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
          qi(e, 0), pa(e, t, 0, !0);
          break;
        }
        e: {
          switch (l = e, r = i, r) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t && (t & 62914560) !== t)
                break;
            case 6:
              pa(
                l,
                t,
                Nn,
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
              throw Error(o(329));
          }
          if ((t & 62914560) === t && (i = Yr + 300 - Xt(), 10 < i)) {
            if (pa(
              l,
              t,
              Nn,
              !da
            ), Il(l, 0, !0) !== 0) break e;
            yl = t, l.timeoutHandle = Ff(
              pg.bind(
                null,
                l,
                n,
                on,
                Vr,
                kf,
                t,
                Nn,
                Fa,
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
            Nn,
            Fa,
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
  function pg(e, t, n, l, i, r, h, v, w, R, H, G, C, z) {
    e.timeoutHandle = -1;
    var ne = t.subtreeFlags, oe = (r & 335544064) === r;
    if (G = null, (oe || ne & 8192 || (ne & 16785408) === 16785408) && (G = {
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
      G
    ), oe && (ne = G, oe = e.containerInfo, oe = (oe.nodeType === 9 ? oe : oe.ownerDocument).__reactViewTransition, oe != null && (ne.count++, ne.waitingForViewTransition = !0, ne = dc.bind(ne), oe.finished.then(ne, ne))), ne = (r & 62914560) === r ? Yr - Xt() : (r & 4194048) === r ? fg - Xt() : 0, ne = Bx(
      G,
      ne
    ), ne !== null)) {
      yl = r, e.cancelPendingCommit = ne(
        Ng.bind(
          null,
          e,
          t,
          r,
          n,
          l,
          i,
          h,
          v,
          w,
          R,
          H,
          G,
          null,
          C,
          z
        )
      ), pa(e, r, h, !R);
      return;
    }
    Ng(
      e,
      t,
      r,
      n,
      l,
      i,
      h,
      v,
      w,
      R,
      H,
      G
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
    t = Fl(e, t), t &= ~qr, t &= ~Fa, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var i = t; 0 < i; ) {
      var r = 31 - ft(i), h = 1 << r;
      l[r] = -1, i &= ~h;
    }
    n !== 0 && js(e, n, t);
  }
  function Zr() {
    return (Qe & 6) === 0 ? (ic(0), !1) : !0;
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
  function qi(e, t) {
    var n = e.timeoutHandle;
    return n !== -1 && (e.timeoutHandle = -1, ix(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), yl = 0, Cf(), lt = e, ze = n = Ol(e.current, null), $e = t, Je = 0, jn = null, da = !1, zi = ka(e, t), wf = !1, Li = Nn = qr = Fa = ha = yt = 0, on = lc = null, kf = !1, Bl = Fl(e, t), er(), n;
  }
  function gg(e, t) {
    ke = null, re.H = Tr, t === wi || t === fr ? (t = Nm(), Je = 3) : t === Eo ? (t = Nm(), Je = 4) : Je = t === Po ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, jn = t, ze === null && (yt = 1, wr(
      e,
      Mn(t, e.current)
    ));
  }
  function yg() {
    var e = Bt.current;
    return e === null ? !0 : ($e & 4194048) === $e ? Zt === null : ($e & 62914560) === $e || ($e & 536870912) !== 0 ? e === Zt : !1;
  }
  function vg() {
    var e = re.H;
    return re.H = Tr, e === null ? Tr : e;
  }
  function bg() {
    var e = re.A;
    return re.A = Mb, e;
  }
  function Qr() {
    yt = 4, da || ($e & 4194048) !== $e && Bt.current !== null || (zi = !0), (ha & 134217727) === 0 && (Fa & 134217727) === 0 || lt === null || pa(
      lt,
      $e,
      Nn,
      !1
    );
  }
  function Of(e, t, n) {
    var l = Qe;
    Qe |= 2;
    var i = vg(), r = bg();
    (lt !== e || $e !== t) && (Vr = null, qi(e, t)), t = !1;
    var h = yt;
    e: do
      try {
        if (Je !== 0 && ze !== null) {
          var v = ze, w = jn;
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
              if (Je = 0, jn = null, Yi(e, v, w, R), n && zi) {
                h = 0;
                break e;
              }
              break;
            default:
              R = Je, Je = 0, jn = null, Yi(e, v, w, R);
          }
        }
        Lb(), h = yt;
        break;
      } catch (H) {
        gg(e, H);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Ml = Ha = null, Qe = l, re.H = i, re.A = r, ze === null && (lt = null, $e = 0, er()), h;
  }
  function Lb() {
    for (; ze !== null; ) xg(ze);
  }
  function Ub(e, t) {
    var n = Qe;
    Qe |= 2;
    var l = vg(), i = bg();
    lt !== e || $e !== t ? (Vr = null, Gr = Xt() + 500, qi(e, t)) : zi = ka(
      e,
      t
    );
    e: do
      try {
        if (Je !== 0 && ze !== null) {
          t = ze;
          var r = jn;
          t: switch (Je) {
            case 1:
              Je = 0, jn = null, Yi(e, t, r, 1);
              break;
            case 2:
            case 9:
              if (Sm(r)) {
                Je = 0, jn = null, Sg(t);
                break;
              }
              t = function() {
                Je !== 2 && Je !== 9 || lt !== e || (Je = 7), vl(e);
              }, r.then(t, t);
              break e;
            case 3:
              Je = 7;
              break e;
            case 4:
              Je = 5;
              break e;
            case 7:
              Sm(r) ? (Je = 0, jn = null, Sg(t)) : (Je = 0, jn = null, Yi(e, t, r, 7));
              break;
            case 5:
              var h = null;
              switch (ze.tag) {
                case 26:
                  h = ze.memoizedState;
                case 5:
                case 27:
                  var v = ze;
                  if (h ? d0(h) : v.stateNode.complete) {
                    Je = 0, jn = null;
                    var w = v.sibling;
                    if (w !== null) ze = w;
                    else {
                      var R = v.return;
                      R !== null ? (ze = R, Kr(R)) : ze = null;
                    }
                    break t;
                  }
              }
              Je = 0, jn = null, Yi(e, t, r, 5);
              break;
            case 6:
              Je = 0, jn = null, Yi(e, t, r, 6);
              break;
            case 8:
              Cf(), yt = 6;
              break e;
            default:
              throw Error(o(462));
          }
        }
        Hb();
        break;
      } catch (H) {
        gg(e, H);
      }
    while (!0);
    return Ml = Ha = null, re.H = l, re.A = i, Qe = n, ze !== null ? 0 : (lt = null, $e = 0, er(), yt);
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
          $e
        );
        break;
      case 11:
        t = _p(
          n,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          $e
        );
        break;
      case 5:
        Uo(t);
        var l = t;
        l === _t && (Oe ? (sr(l), l.tag === 5 && l.stateNode != null && (it = l.stateNode)) : (sr(l), Oe = !0));
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
        $e
      )) {
        yt = 1, wr(
          e,
          Mn(n, e.current)
        ), ze = null;
        return;
      }
    } catch (r) {
      if (i !== null) throw ze = i, r;
      yt = 1, wr(
        e,
        Mn(n, e.current)
      ), ze = null;
      return;
    }
    t.flags & 32768 ? (Oe || l === 1 ? e = !0 : zi || ($e & 536870912) !== 0 ? e = !1 : (da = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = Bt.current, l !== null && l.tag === 13 && (l.flags |= 16384))), jg(t, e)) : Kr(t);
  }
  function Kr(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        jg(
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
  function jg(e, t) {
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
  function Ng(e, t, n, l, i, r, h, v, w, R, H, G) {
    e.cancelPendingCommit = null;
    do
      Ir();
    while (mt !== 0);
    if ((Qe & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      e === lt && (ze = lt = null, $e = 0), Ja = t, Jn = e, yl = n, _f = i, dg = l, Bb(
        e,
        t,
        n,
        h,
        v,
        w,
        G
      );
    }
  }
  function Bb(e, t, n, l, i, r, h) {
    var v = t.lanes | t.childLanes;
    if (Af = v, v |= oo, qu(
      e,
      n,
      v,
      l,
      i,
      r
    ), Hi = null, (n & 335544064) === n ? (Bi = hb(e), l = 10262) : (Bi = null, l = 10256), (t.subtreeFlags & l) !== 0 || (t.flags & l) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Xb(Vn, function() {
      return zf(), null;
    })) : (e.callbackNode = null, e.callbackPriority = 0), Dr = !1, l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
      l = re.T, re.T = null, i = xe.p, xe.p = 2, r = Qe, Qe |= 4;
      try {
        Ob(e, t, n);
      } finally {
        Qe = r, xe.p = i, re.T = l;
      }
    }
    mt = 1, Dr ? Ui = fx(
      h,
      e.containerInfo,
      Bi,
      Rf,
      Mf,
      qb,
      Df,
      zf,
      $b
    ) : (Rf(), Mf(), Df());
  }
  function $b(e) {
    if (mt !== 0) {
      var t = Jn.onRecoverableError;
      t(e, { componentStack: null });
    }
  }
  function qb() {
    mt === 3 && (mt = 0, ig(Ja, Jn), mt = 4);
  }
  function Rf() {
    if (mt === 1) {
      mt = 0;
      var e = Jn, t = Ja, n = yl, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = re.T, re.T = null;
        var i = xe.p;
        xe.p = 2;
        var r = Qe;
        Qe |= 4;
        try {
          ec = Ur = !1, lg(t, e, n), n = Qf;
          var h = em(e.containerInfo), v = n.focusedElem, w = n.selectionRange;
          if (h !== v && v && v.ownerDocument && Wh(
            v.ownerDocument.documentElement,
            v
          )) {
            if (w !== null && io(v)) {
              var R = w.start, H = w.end;
              if (H === void 0 && (H = R), "selectionStart" in v)
                v.selectionStart = R, v.selectionEnd = Math.min(
                  H,
                  v.value.length
                );
              else {
                var G = v.ownerDocument || document, C = G && G.defaultView || window;
                if (C.getSelection) {
                  var z = C.getSelection(), ne = v.textContent.length, oe = Math.min(w.start, ne), Ae = w.end === void 0 ? oe : Math.min(w.end, ne);
                  !z.extend && oe > Ae && (h = Ae, Ae = oe, oe = h);
                  var O = Ph(
                    v,
                    oe
                  ), A = Ph(
                    v,
                    Ae
                  );
                  if (O && A && (z.rangeCount !== 1 || z.anchorNode !== O.node || z.anchorOffset !== O.offset || z.focusNode !== A.node || z.focusOffset !== A.offset)) {
                    var D = G.createRange();
                    D.setStart(O.node, O.offset), z.removeAllRanges(), oe > Ae ? (z.addRange(D), z.extend(A.node, A.offset)) : (D.setEnd(A.node, A.offset), z.addRange(D));
                  }
                }
              }
            }
            for (G = [], z = v; z = z.parentNode; )
              z.nodeType === 1 && G.push({
                element: z,
                left: z.scrollLeft,
                top: z.scrollTop
              });
            for (typeof v.focus == "function" && v.focus(), v = 0; v < G.length; v++) {
              var Y = G[v];
              Y.element.scrollLeft = Y.left, Y.element.scrollTop = Y.top;
            }
          }
          Fi = !!Zf, Qf = Zf = null;
        } finally {
          Qe = r, xe.p = i, re.T = l;
        }
      }
      e.current = t, mt = 2;
    }
  }
  function Mf() {
    if (mt === 2) {
      mt = 0;
      var e = Jn, t = Ja, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = re.T, re.T = null;
        var l = xe.p;
        xe.p = 2;
        var i = Qe;
        Qe |= 4;
        try {
          Jp(e, t.alternate, t);
        } finally {
          Qe = i, xe.p = l, re.T = n;
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
      var t = Jn, n = Ja, l = yl, i = dg, r = (l & 335544064) === l ? 10262 : 10256;
      if ((n.subtreeFlags & r) !== 0 || (n.flags & r) !== 0 ? mt = 5 : (mt = 0, Ja = Jn = null, Eg(t, t.pendingLanes)), r = t.pendingLanes, r === 0 && (ma = null), Es(l), n = n.stateNode, At && typeof At.onCommitFiberRoot == "function")
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
        n = re.T, r = xe.p, xe.p = 2, re.T = null;
        try {
          for (var h = t.onRecoverableError, v = 0; v < i.length; v++) {
            var w = i[v];
            h(w.value, {
              componentStack: w.stack
            });
          }
        } finally {
          re.T = n, xe.p = r;
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
    var n = Es(yl), l = re.T, i = xe.p;
    try {
      xe.p = 32 > n ? 32 : n, re.T = null, n = _f, _f = null;
      var r = Jn, h = yl;
      if (mt = 0, Ja = Jn = null, yl = 0, (Qe & 6) !== 0) throw Error(o(331));
      var v = Qe;
      if (Qe |= 4, ug(r.current), sg(
        r,
        r.current,
        h,
        n
      ), Qe = v, ic(0, !1), At && typeof At.onPostCommitFiberRoot == "function")
        try {
          At.onPostCommitFiberRoot(Zl, r);
        } catch {
        }
      return !0;
    } finally {
      xe.p = i, re.T = l, Eg(e, t);
    }
  }
  function Tg(e, t, n) {
    t = Mn(n, t), t = Jo(e.stateNode, t, 2), e = sa(e, t, 2), e !== null && (Cn(e, 2), vl(e));
  }
  function Pe(e, t, n) {
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
            e = Mn(n, e), n = Sp(2), l = sa(t, n, 2), l !== null && (jp(
              n,
              l,
              t,
              e
            ), Cn(l, 2), vl(l));
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
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, lt === e && ($e & n) === n && ((yt === 4 || yt === 3 && ($e & 62914560) === $e && 300 > Xt() - Yr) && (Qe & 2) === 0 ? qi(e, 0) : qr |= n, Li === $e && (Li = 0)), vl(e);
  }
  function wg(e, t) {
    t === 0 && (t = Bc()), e = za(e, t), e !== null && (Cn(e, t), vl(e));
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
        throw Error(o(314));
    }
    l !== null && l.delete(t), wg(e, n);
  }
  function Xb(e, t) {
    return Ke(e, t);
  }
  var Gi = null, Vi = null, Uf = !1, Fr = !1, Hf = !1, ga = 0;
  function vl(e) {
    e !== Vi && e.next === null && (Vi === null ? Gi = Vi = e : Vi = Vi.next = e), Fr = !0, Uf || (Uf = !0, Qb());
  }
  function ic(e, t) {
    if (!Hf && Fr) {
      Hf = !0;
      do
        for (var n = !1, l = Gi; l !== null; ) {
          if (e !== 0) {
            var i = l.pendingLanes;
            if (i === 0) var r = 0;
            else {
              var h = l.suspendedLanes, v = l.pingedLanes;
              r = (1 << 31 - ft(42 | e) + 1) - 1, r &= i & ~(h & ~v), r = r & 201326741 ? r & 201326741 | 1 : r ? r | 2 : 0;
            }
            r !== 0 && (n = !0, Cg(l, r));
          } else
            r = $e, r = Il(
              l,
              l === lt ? r : 0,
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
    Fr = Uf = !1;
    var e = 0;
    ga !== 0 && ax() && (e = ga);
    for (var t = Xt(), n = null, l = Gi; l !== null; ) {
      var i = l.next, r = Ag(l, t);
      r === 0 ? (l.next = null, n === null ? Gi = i : n.next = i, i === null && (Vi = n)) : (n = l, (e !== 0 || (r & 3) !== 0) && (Fr = !0)), l = i;
    }
    mt !== 0 && mt !== 5 || ic(e), ga !== 0 && (ga = 0);
  }
  function Ag(e, t) {
    for (var n = e.suspendedLanes, l = e.pingedLanes, i = e.expirationTimes, r = e.pendingLanes & -62914561; 0 < r; ) {
      var h = 31 - ft(r), v = 1 << h, w = i[h];
      w === -1 ? ((v & n) === 0 || (v & l) !== 0) && (i[h] = $u(v, t)) : w <= t && (e.expiredLanes |= v), r &= ~v;
    }
    if (t = lt, n = $e, n = Il(
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
          n = Vn;
          break;
        case 268435456:
          n = bs;
          break;
        default:
          n = Vn;
      }
      return l = _g.bind(null, e), n = Ke(n, l), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return l !== null && l !== null && ot(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function _g(e, t) {
    if (mt !== 0 && mt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if (Ir() && e.callbackNode !== n)
      return null;
    var l = $e;
    return l = Il(
      e,
      e === lt ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (mg(e, l, t), Ag(e, Xt()), e.callbackNode != null && e.callbackNode === n ? _g.bind(null, e) : null);
  }
  function Cg(e, t) {
    if (Ir()) return null;
    mg(e, t, !0);
  }
  function Qb() {
    sx(function() {
      (Qe & 6) !== 0 ? Ke(
        ri,
        Zb
      ) : kg();
    });
  }
  function Bf() {
    if (ga === 0) {
      var e = qa;
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
      var v = new Fc(
        "action",
        "action",
        null,
        l,
        i
      );
      e.push({
        event: v,
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
                typeof r == "function" && (v.preventDefault(), w = new FormData(i, h), Zo(
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
  for (var $f = 0; $f < uo.length; $f++) {
    var qf = uo[$f], Ib = qf.toLowerCase(), Fb = qf[0].toUpperCase() + qf.slice(1);
    Qn(
      Ib,
      "on" + Fb
    );
  }
  Qn(lm, "onAnimationEnd"), Qn(am, "onAnimationIteration"), Qn(im, "onAnimationStart"), Qn("dblclick", "onDoubleClick"), Qn("focusin", "onFocus"), Qn("focusout", "onBlur"), Qn(ib, "onTransitionRun"), Qn(sb, "onTransitionStart"), Qn(cb, "onTransitionCancel"), Qn(sm, "onTransitionEnd"), kl("onMouseEnter", ["mouseout", "mouseover"]), kl("onMouseLeave", ["mouseout", "mouseover"]), kl("onPointerEnter", ["pointerout", "pointerover"]), kl("onPointerLeave", ["pointerout", "pointerover"]), wl(
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
  ), Jb = new Set(
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
            var v = l[h], w = v.instance, R = v.currentTarget;
            if (v = v.listener, w !== r && i.isPropagationStopped())
              break e;
            r = v, i.currentTarget = R;
            try {
              r(i);
            } catch (H) {
              Wc(H);
            }
            i.currentTarget = null, r = w;
          }
        else
          for (h = 0; h < l.length; h++) {
            if (v = l[h], w = v.instance, R = v.currentTarget, v = v.listener, w !== r && i.isPropagationStopped())
              break e;
            r = v, i.currentTarget = R;
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
  var Jr = "_reactListening" + Math.random().toString(36).slice(2);
  function Gf(e) {
    if (!e[Jr]) {
      e[Jr] = !0, Yc.forEach(function(n) {
        n !== "selectionchange" && (Jb.has(n) || Yf(n, !1, e), Yf(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Jr] || (t[Jr] = !0, Yf("selectionchange", !1, t));
    }
  }
  function Mg(e, t, n, l) {
    switch (j0(t)) {
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
          var v = l.stateNode.containerInfo;
          if (v === i) break;
          if (h === 4)
            for (h = l.return; h !== null; ) {
              var w = h.tag;
              if ((w === 3 || w === 4) && h.stateNode.containerInfo === i)
                return;
              h = h.return;
            }
          for (; v !== null; ) {
            if (h = On(v), h === null) return;
            if (w = h.tag, w === 5 || w === 6 || w === 26 || w === 27) {
              l = r = h;
              continue e;
            }
            v = v.parentNode;
          }
        }
        l = l.return;
      }
    Mh(function() {
      var R = r, H = Qu(n), G = [];
      e: {
        var C = cm.get(e);
        if (C !== void 0) {
          var z = Fc, ne = e;
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
              z = N1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              z = $1;
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
          var oe = (t & 4) !== 0, Ae = !oe && (e === "scroll" || e === "scrollend"), O = oe ? C !== null ? C + "Capture" : null : C;
          oe = [];
          for (var A = R, D; A !== null; ) {
            var Y = A;
            if (D = Y.stateNode, Y = Y.tag, Y !== 5 && Y !== 26 && Y !== 27 || D === null || O === null || (Y = As(A, O), Y != null && oe.push(
              cc(A, Y, D)
            )), Ae) break;
            A = A.return;
          }
          0 < oe.length && (C = new z(
            C,
            ne,
            null,
            n,
            H
          ), G.push({ event: C, listeners: oe }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (z = e === "mouseover" || e === "pointerover", C = e === "mouseout" || e === "pointerout", z && n !== Zu && (ne = n.relatedTarget || n.fromElement) && (On(ne) || ne[Zn]))
            break e;
          (C || z) && (ne = H.window === H ? H : (z = H.ownerDocument) ? z.defaultView || z.parentWindow : window, C ? (z = n.relatedTarget || n.toElement, C = R, z = z ? On(z) : null, z !== null && (Ae = d(z), oe = z.tag, z !== Ae || oe !== 5 && oe !== 27 && oe !== 6) && (z = null)) : (C = null, z = R), C !== z && (oe = Lh, Y = "onMouseLeave", O = "onMouseEnter", A = "mouse", (e === "pointerout" || e === "pointerover") && (oe = Hh, Y = "onPointerLeave", O = "onPointerEnter", A = "pointer"), Ae = C == null ? ne : cl(C), D = z == null ? ne : cl(z), ne = new oe(
            Y,
            A + "leave",
            C,
            n,
            H
          ), ne.target = Ae, ne.relatedTarget = D, Y = null, On(H) === R && (oe = new oe(
            O,
            A + "enter",
            z,
            n,
            H
          ), oe.target = D, oe.relatedTarget = Ae, Y = oe), Ae = Y, oe = C && z ? B(
            C,
            z,
            Pb
          ) : null, C !== null && Dg(
            G,
            ne,
            C,
            oe,
            !1
          ), z !== null && Ae !== null && Dg(
            G,
            Ae,
            z,
            oe,
            !0
          )));
        }
        e: {
          if (C = R ? cl(R) : window, z = C.nodeName && C.nodeName.toLowerCase(), z === "select" || z === "input" && C.type === "file")
            var ce = Zh;
          else if (Vh(C))
            if (Qh)
              ce = nb;
            else {
              ce = eb;
              var qe = W1;
            }
          else
            z = C.nodeName, !z || z.toLowerCase() !== "input" || C.type !== "checkbox" && C.type !== "radio" ? R && Xu(R.elementType) && (ce = Zh) : ce = tb;
          if (ce && (ce = ce(e, R))) {
            Xh(
              G,
              ce,
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
            co = !1, tm(G, n, H);
            break;
          case "selectionchange":
            if (ab) break;
          case "keydown":
          case "keyup":
            tm(G, n, H);
        }
        var pe;
        if (to)
          e: {
            switch (e) {
              case "compositionstart":
                var Ne = "onCompositionStart";
                break e;
              case "compositionend":
                Ne = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Ne = "onCompositionUpdate";
                break e;
            }
            Ne = void 0;
          }
        else
          yi ? Yh(e, n) && (Ne = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (Ne = "onCompositionStart");
        Ne && (Bh && n.locale !== "ko" && (yi || Ne !== "onCompositionStart" ? Ne === "onCompositionEnd" && yi && (pe = Dh()) : (Jl = H, Fu = "value" in Jl ? Jl.value : Jl.textContent, yi = !0)), qe = Pr(R, Ne), 0 < qe.length && (Ne = new Uh(
          Ne,
          e,
          null,
          n,
          H
        ), G.push({ event: Ne, listeners: qe }), pe ? Ne.data = pe : (pe = Gh(n), pe !== null && (Ne.data = pe)))), (pe = K1 ? I1(e, n) : F1(e, n)) && (Ne = Pr(R, "onBeforeInput"), 0 < Ne.length && (qe = new Uh(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          H
        ), G.push({
          event: qe,
          listeners: Ne
        }), qe.data = pe)), Kb(
          G,
          e,
          R,
          n,
          H
        );
      }
      Rg(G, t);
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
      var v = n, w = v.alternate, R = v.stateNode;
      if (v = v.tag, w !== null && w === l) break;
      v !== 5 && v !== 26 && v !== 27 || R === null || (w = R, i ? (R = As(n, r), R != null && h.unshift(
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
  function We(e, t, n, l, i, r) {
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
          typeof r == "function" && (n === "formAction" ? (t !== "input" && We(e, t, "name", i.name, i, null), We(
            e,
            t,
            "formEncType",
            i.formEncType,
            i,
            null
          ), We(
            e,
            t,
            "formMethod",
            i.formMethod,
            i,
            null
          ), We(
            e,
            t,
            "formTarget",
            i.formTarget,
            i,
            null
          )) : (We(e, t, "encType", i.encType, i, null), We(e, t, "method", i.method, i, null), We(e, t, "target", i.target, i, null)));
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
            throw Error(o(61));
          if (n = l.__html, n != null) {
            if (i.children != null) throw Error(o(60));
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
    Ye = !0;
  }
  function Xf(e, t, n, l, i, r) {
    switch (n) {
      case "style":
        Oh(e, l, r);
        return;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(o(61));
          if (n = l.__html, n != null) {
            if (i.children != null) throw Error(o(60));
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
            Ye = !0, n in e ? e[n] = l : l === !0 ? e.setAttribute(n, "") : hi(e, n, l);
          }
        return;
    }
    Ye = !0;
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
                  throw Error(o(137, t));
                default:
                  We(e, t, r, h, n, null);
              }
          }
        i && We(e, t, "srcSet", n.srcSet, n, null), l && We(e, t, "src", n.src, n, null);
        return;
      case "input":
        Le("invalid", e);
        var v = r = h = i = null, w = null, R = null;
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
                  v = H;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (H != null)
                    throw Error(o(137, t));
                  break;
                default:
                  We(e, t, l, H, n, null);
              }
          }
        Fe(
          e,
          r,
          v,
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
          if (n.hasOwnProperty(i) && (v = n[i], v != null))
            switch (i) {
              case "value":
                r = v;
                break;
              case "defaultValue":
                h = v;
                break;
              case "multiple":
                l = v;
              default:
                We(e, t, i, v, n, null);
            }
        t = r, n = h, e.multiple = !!l, t != null ? bt(e, !!l, t, !1) : n != null && bt(e, !!l, n, !0);
        return;
      case "textarea":
        Le("invalid", e), r = i = l = null;
        for (h in n)
          if (n.hasOwnProperty(h) && (v = n[h], v != null))
            switch (h) {
              case "value":
                l = v;
                break;
              case "defaultValue":
                i = v;
                break;
              case "children":
                r = v;
                break;
              case "dangerouslySetInnerHTML":
                if (v != null) throw Error(o(91));
                break;
              default:
                We(e, t, h, v, n, null);
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
                We(e, t, w, l, n, null);
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
                throw Error(o(137, t));
              default:
                We(e, t, R, l, n, null);
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
    for (v in n)
      n.hasOwnProperty(v) && (l = n[v], l != null && We(e, t, v, l, n, null));
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
        var i = null, r = null, h = null, v = null, w = null, R = null, H = null;
        for (z in n) {
          var G = n[z];
          if (n.hasOwnProperty(z) && G != null)
            switch (z) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                w = G;
              default:
                l.hasOwnProperty(z) || We(e, t, z, null, l, G);
            }
        }
        for (var C in l) {
          var z = l[C];
          if (G = n[C], l.hasOwnProperty(C) && (z != null || G != null))
            switch (C) {
              case "type":
                z !== G && (Ye = !0), r = z;
                break;
              case "name":
                z !== G && (Ye = !0), i = z;
                break;
              case "checked":
                z !== G && (Ye = !0), R = z;
                break;
              case "defaultChecked":
                z !== G && (Ye = !0), H = z;
                break;
              case "value":
                z !== G && (Ye = !0), h = z;
                break;
              case "defaultValue":
                z !== G && (Ye = !0), v = z;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (z != null)
                  throw Error(o(137, t));
                break;
              default:
                z !== G && We(
                  e,
                  t,
                  C,
                  z,
                  l,
                  G
                );
            }
        }
        Se(
          e,
          h,
          v,
          w,
          R,
          H,
          r,
          i
        );
        return;
      case "select":
        z = h = v = C = null;
        for (r in n)
          if (w = n[r], n.hasOwnProperty(r) && w != null)
            switch (r) {
              case "value":
                break;
              case "multiple":
                z = w;
              default:
                l.hasOwnProperty(r) || We(
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
                r !== w && (Ye = !0), C = r;
                break;
              case "defaultValue":
                r !== w && (Ye = !0), v = r;
                break;
              case "multiple":
                r !== w && (Ye = !0), h = r;
              default:
                r !== w && We(
                  e,
                  t,
                  i,
                  r,
                  l,
                  w
                );
            }
        t = v, n = h, l = z, C != null ? bt(e, !!n, C, !1) : !!l != !!n && (t != null ? bt(e, !!n, t, !0) : bt(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        z = C = null;
        for (v in n)
          if (i = n[v], n.hasOwnProperty(v) && i != null && !l.hasOwnProperty(v))
            switch (v) {
              case "value":
                break;
              case "children":
                break;
              default:
                We(e, t, v, null, l, i);
            }
        for (h in l)
          if (i = l[h], r = n[h], l.hasOwnProperty(h) && (i != null || r != null))
            switch (h) {
              case "value":
                i !== r && (Ye = !0), C = i;
                break;
              case "defaultValue":
                i !== r && (Ye = !0), z = i;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (i != null) throw Error(o(91));
                break;
              default:
                i !== r && We(e, t, h, i, l, r);
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
                We(
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
                C !== z && (Ye = !0), e.selected = C && typeof C != "function" && typeof C != "symbol";
                break;
              default:
                We(
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
          C = n[oe], n.hasOwnProperty(oe) && C != null && !l.hasOwnProperty(oe) && We(e, t, oe, null, l, C);
        for (R in l)
          if (C = l[R], z = n[R], l.hasOwnProperty(R) && C !== z && (C != null || z != null))
            switch (R) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (C != null)
                  throw Error(o(137, t));
                break;
              default:
                We(
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
          for (var Ae in n)
            C = n[Ae], n.hasOwnProperty(Ae) && C !== void 0 && !l.hasOwnProperty(Ae) && Xf(
              e,
              t,
              Ae,
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
      C = n[O], n.hasOwnProperty(O) && C != null && !l.hasOwnProperty(O) && We(e, t, O, null, l, C);
    for (G in l)
      C = l[G], z = n[G], !l.hasOwnProperty(G) || C === z || C == null && z == null || We(e, t, G, C, l, z);
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
        var i = n[l], r = i.transferSize, h = i.initiatorType, v = i.duration;
        if (r && v && Ug(h)) {
          for (h = 0, v = i.responseEnd, l += 1; l < n.length; l++) {
            var w = n[l], R = w.startTime;
            if (R > v) break;
            var H = w.transferSize, G = w.initiatorType;
            H && Ug(G) && (w = w.responseEnd, h += H * (w < v ? 1 : (v - R) / (w - R)));
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
  function $g(e, t, n, l) {
    return n = rc(
      n
    ).createElement(e), n[at] = l, n[zt] = t, Yt(n, e, t), dt(n), n;
  }
  function Kf(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var If = null;
  function ax() {
    var e = window.event;
    return e && e.type === "popstate" ? e === If ? !1 : (If = e, !0) : (If = null, !1);
  }
  var Ff = typeof setTimeout == "function" ? setTimeout : void 0, ix = typeof clearTimeout == "function" ? clearTimeout : void 0, qg = typeof Promise == "function" ? Promise : void 0, Yg = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Ff, sx = typeof queueMicrotask == "function" ? queueMicrotask : typeof qg < "u" ? function(e) {
    return qg.resolve(null).then(e).catch(cx);
  } : Ff;
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
            e.removeChild(i), Ji(t);
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
            var h = r.nextSibling, v = r.nodeName;
            r[Aa] || v === "SCRIPT" || v === "STYLE" || v === "LINK" && r.rel.toLowerCase() === "stylesheet" || n.removeChild(r), r = h;
          }
        } else
          n === "body" && ad(e.ownerDocument.body);
      n = i;
    } while (n);
    Ji(t);
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
  function Jf(e) {
    var t = e.getBoundingClientRect(), n = getComputedStyle(e);
    return rx(t, n, e);
  }
  function ux(e) {
    return e.documentElement.clientHeight;
  }
  function ox(e) {
    this.addEventListener("load", e), this.addEventListener("error", e);
  }
  function fx(e, t, n, l, i, r, h, v, w) {
    var R = t.nodeType === 9 ? t : t.ownerDocument;
    try {
      var H = R.startViewTransition({
        update: function() {
          var C = R.defaultView, z = C.navigation && C.navigation.transition, ne = R.fonts.status;
          l();
          var oe = [];
          if (ne === "loaded" && (ux(R), R.fonts.status === "loading" && oe.push(R.fonts.ready)), ne = oe.length, e !== null)
            for (var Ae = e.suspenseyImages, O = 0, A = 0; A < Ae.length; A++) {
              var D = Ae[A];
              if (!D.complete) {
                var Y = D.getBoundingClientRect();
                if (0 < Y.bottom && 0 < Y.right && Y.top < C.innerHeight && Y.left < C.innerWidth) {
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
              new Promise(function(ce) {
                return setTimeout(ce, 500);
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
      var G = [];
      return H.ready.then(
        function() {
          for (var C = R.documentElement.getAnimations({
            subtree: !0
          }), z = 0; z < C.length; z++) {
            var ne = C[z], oe = ne.effect, Ae = oe.pseudoElement;
            if (Ae != null && Ae.startsWith("::view-transition")) {
              G.push(ne), ne = oe.getKeyframes();
              for (var O = Ae = void 0, A = !0, D = 0; D < ne.length; D++) {
                var Y = ne[D], ce = Y.width;
                if (Ae === void 0) Ae = ce;
                else if (Ae !== ce) {
                  A = !1;
                  break;
                }
                if (ce = Y.height, O === void 0) O = ce;
                else if (O !== ce) {
                  A = !1;
                  break;
                }
                delete Y.width, delete Y.height, Y.transform === "none" && delete Y.transform;
              }
              A && Ae !== void 0 && O !== void 0 && (oe.setKeyframes(ne), A = getComputedStyle(
                oe.target,
                oe.pseudoElement
              ), A.width !== Ae || A.height !== O) && (A = ne[0], A.width = Ae, A.height = O, A = ne[ne.length - 1], A.width = Ae, A.height = O, oe.setKeyframes(ne));
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
        for (var C = 0; C < G.length; C++)
          G[C].cancel();
        R.__reactViewTransition === H && (R.__reactViewTransition = null), v();
      }), H;
    } catch {
      return l(), i(), h(), null;
    }
  }
  function Pa(e, t) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
  }
  Pa.prototype.animate = function(e, t) {
    return t = typeof t == "number" ? { duration: t } : V({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
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
        var h = this, v = t;
        n != null && typeof n != "boolean" && n.once === !0 && (v = function(w) {
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
          attachedListener: v,
          cleanup: i
        }), g(
          this._fragmentFiber.child,
          !1,
          dx,
          e,
          v,
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
      i = Xi(i.optionsOrUseCapture), g(
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
    var t = j(
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
    g(
      this._fragmentFiber.child,
      !0,
      Fg,
      e,
      void 0,
      void 0
    );
  };
  function Fg(e, t) {
    return e.tag === 6 ? !1 : (e = k(e), Tx(e, t));
  }
  Tn.prototype.focusLast = function(e) {
    var t = [];
    g(
      this._fragmentFiber.child,
      !0,
      Pf,
      t,
      void 0,
      void 0
    );
    for (var n = t.length - 1; 0 <= n && !Fg(t[n], e); n--) ;
  };
  function Pf(e, t) {
    return t.push(e), !1;
  }
  Tn.prototype.blur = function() {
    var e = j(
      this._fragmentFiber
    );
    e !== null && (e = k(e), e = rc(e).activeElement, e !== null && g(
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
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), g(
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
      t.delete(e), g(
        this._fragmentFiber.child,
        !1,
        gx,
        e,
        void 0,
        void 0
      );
      for (var n = t = 0; n < Pn.length; n++) {
        var l = Pn[n];
        l.fragmentInstance === this && l.observer === e ? e.unobserve(l.instance) : Pn[t++] = l;
      }
      Pn.length = t;
    }
  };
  function gx(e, t) {
    return e.tag === 6 || (e = k(e), t.unobserve(e)), !1;
  }
  var Pn = [], Wf = !1;
  function yx(e, t, n) {
    Pn.push({
      fragmentInstance: e,
      observer: t,
      instance: n
    }), Wf || (Wf = !0, wx(function() {
      Wf = !1;
      var l = Pn;
      Pn = [];
      for (var i = 0; i < l.length; i++) {
        var r = l[i];
        r.observer.unobserve(r.instance);
      }
    }));
  }
  Tn.prototype.getClientRects = function() {
    var e = [];
    return g(
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
    var t = j(
      this._fragmentFiber
    );
    return t === null ? this : k(t).getRootNode(e);
  }, Tn.prototype.compareDocumentPosition = function(e) {
    var t = j(
      this._fragmentFiber
    );
    if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var n = [];
    g(
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
    var h = t.compareDocumentPosition(e), v = i.compareDocumentPosition(e), w = h & Node.DOCUMENT_POSITION_CONTAINED_BY || v & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return v = l && r && h & Node.DOCUMENT_POSITION_FOLLOWING && v & Node.DOCUMENT_POSITION_PRECEDING, t = l && t === e || r && i === e || w || v ? Node.DOCUMENT_POSITION_CONTAINED_BY : !l && t === e || !r && i === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : h, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || bx(
      t,
      this._fragmentFiber,
      n[0],
      n[n.length - 1],
      e
    ) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function bx(e, t, n, l, i) {
    var r = On(i);
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
        for (r = t, t = j(t); r !== null; ) {
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
      J
    ), t === null ? t = !1 : (g(
      t,
      !0,
      U,
      r,
      n
    ), r = X, X = null, t = r !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!r) && !(t = r === l) && (t = B(
      l,
      r,
      J
    ), t === null ? t = !1 : (g(
      t,
      !0,
      K,
      r,
      l
    ), r = X, Z = X = null, t = r !== null)), t) : !1;
  }
  function Jg(e, t) {
    var n = e.ownerDocument.createRange();
    n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(
      window.scrollX + e.left,
      t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight
    );
  }
  Tn.prototype.scrollIntoView = function(e) {
    if (typeof e == "object") throw Error(o(566));
    var t = [];
    g(
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
      if (l = n ? l[1] || l[0] || j(this._fragmentFiber) : l[0] || l[1], l === null) return;
      if (l.tag === 6) {
        e = k(l), Jg(e, n);
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
      i.tag === 6 ? (i = k(i), Jg(i, n)) : k(i).scrollIntoView(e), l += n ? -1 : 1;
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
      for (var h = 0, v = 0; v < Pn.length; v++) {
        var w = Pn[v];
        (w.fragmentInstance !== t || w.observer !== r || w.instance !== e) && (Pn[h++] = w);
      }
      Pn.length = h, r.observe(e);
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
  function jx(e, t, n, l) {
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
      if (e = Hn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Nx(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Hn(e.nextSibling), e === null)) return null;
    return e;
  }
  function e0(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Hn(e.nextSibling), e === null)) return null;
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
  function Hn(e) {
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
            return Hn(e.nextSibling);
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
  function a0(e, t, n) {
    for (var l in n) {
      var i = n[l];
      n.hasOwnProperty(l) && i != null && We(e, t, l, null, tx, i);
    }
    n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === rl && (e.onclick = null), Ca(e);
  }
  function ad(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Ca(e);
  }
  var Bn = /* @__PURE__ */ new Map(), i0 = /* @__PURE__ */ new Set();
  function uc(e) {
    if (typeof e.getRootNode == "function") {
      var t = e.getRootNode();
      if (t.nodeType === 9 || t.nodeType === 11) return t;
    }
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  var $l = xe.d;
  xe.d = {
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
    var e = $l.f(), t = Zr();
    return e || t;
  }
  function Ax(e) {
    var t = sl(e);
    t !== null && t.tag === 5 && t.type === "form" ? cp(t) : $l.r(e);
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
    $l.D(e), s0("dns-prefetch", e, null);
  }
  function Cx(e, t) {
    $l.C(e, t), s0("preconnect", e, t);
  }
  function Ox(e, t, n) {
    $l.L(e, t, n);
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
      if (!(Bn.has(r) || (e = V(
        {
          rel: "preload",
          href: t === "image" && n && n.imageSrcSet ? void 0 : e,
          as: t
        },
        n
      ), Bn.set(r, e), l.querySelector(i) !== null || t === "style" && l.querySelector(oc(r)) || t === "script" && l.querySelector(fc(r))))) {
        var h = l.createElement("link");
        Yt(h, "link", e), t === "style" && (h[_a] = !0, h.onload = h.onerror = function() {
          vn(h);
        }), dt(h), l.head.appendChild(h);
      }
    }
  }
  function Rx(e, t) {
    $l.m(e, t);
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
      if (!Bn.has(r) && (e = V({ rel: "modulepreload", href: e }, t), Bn.set(r, e), n.querySelector(i) === null)) {
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
    $l.S(e, t, n);
    var l = Zi;
    if (l && e) {
      var i = yn(l).hoistableStyles, r = Qi(e);
      t = t || "default";
      var h = i.get(r);
      if (!h) {
        var v = { loading: 0, preload: null };
        if (h = l.querySelector(
          oc(r)
        ))
          v.loading = 5;
        else {
          e = V(
            { rel: "stylesheet", href: e, "data-precedence": t },
            n
          ), (n = Bn.get(r)) && id(e, n);
          var w = h = l.createElement("link");
          dt(w), Yt(w, "link", e), w._p = new Promise(function(R, H) {
            w.onload = R, w.onerror = H;
          }), w.addEventListener("load", function() {
            v.loading |= 1;
          }), w.addEventListener("error", function() {
            v.loading |= 2;
          }), v.loading |= 4, Wr(h, t, l);
        }
        h = {
          type: "stylesheet",
          instance: h,
          count: 1,
          state: v
        }, i.set(r, h);
      }
    }
  }
  function Dx(e, t) {
    $l.X(e, t);
    var n = Zi;
    if (n && e) {
      var l = yn(n).hoistableScripts, i = Ki(e), r = l.get(i);
      r || (r = n.querySelector(fc(i)), r || (e = V({ src: e, async: !0 }, t), (t = Bn.get(i)) && sd(e, t), r = n.createElement("script"), dt(r), Yt(r, "link", e), n.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, l.set(i, r));
    }
  }
  function zx(e, t) {
    $l.M(e, t);
    var n = Zi;
    if (n && e) {
      var l = yn(n).hoistableScripts, i = Ki(e), r = l.get(i);
      r || (r = n.querySelector(fc(i)), r || (e = V({ src: e, async: !0, type: "module" }, t), (t = Bn.get(i)) && sd(e, t), r = n.createElement("script"), dt(r), Yt(r, "link", e), n.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, l.set(i, r));
    }
  }
  function c0(e, t, n, l) {
    var i = (i = ln.current) ? uc(i) : null;
    if (!i) throw Error(o(446));
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
          )) ? r._p || (h.instance = r, h.state.loading = 5) : (r = Bn.get(e), r || (r = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, Bn.set(e, r)), Lx(
            i,
            e,
            r,
            h.state
          ))), t && l === null)
            throw Error(o(528, ""));
          return h;
        }
        if (t && l !== null)
          throw Error(o(529, ""));
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
        throw Error(o(444, e));
    }
  }
  function Qi(e) {
    return 'href="' + ie(e) + '"';
  }
  function oc(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function r0(e) {
    return V({}, e, {
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
          var i = V({}, n, {
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
          l = r0(n), (i = Bn.get(i)) && id(l, i), r = (e.ownerDocument || e).createElement("link"), dt(r);
          var h = r;
          return h._p = new Promise(function(v, w) {
            h.onload = v, h.onerror = w;
          }), Yt(r, "link", l), t.state.loading |= 4, Wr(r, n.precedence, e), t.instance = r;
        case "script":
          return r = Ki(n.src), (i = e.querySelector(
            fc(r)
          )) ? (t.instance = i, dt(i), i) : (l = n, (i = Bn.get(r)) && (l = V({}, n), sd(l, i)), e = e.ownerDocument || e, i = e.createElement("script"), dt(i), Yt(i, "link", l), e.head.appendChild(i), t.instance = i);
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, Wr(l, n.precedence, e));
    return t.instance;
  }
  function Wr(e, t, n) {
    for (var l = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), i = l.length ? l[l.length - 1] : null, r = i, h = 0; h < l.length; h++) {
      var v = l[h];
      if (v.dataset.precedence === t) r = v;
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
      if (!(r[Aa] || r[at] || e === "link" && r.getAttribute("rel") === "stylesheet") && r.namespaceURI !== "http://www.w3.org/2000/svg") {
        var h = r.getAttribute(t) || "";
        h = e + h;
        var v = l.get(h);
        v ? v.push(r) : l.set(h, [r]);
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
    typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += h0(t), e.suspenseyImages.push(t)), e = $x.bind(e), t.decode().then(e, e));
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
        r = t.ownerDocument || t, l = r0(l), (i = Bn.get(i)) && id(l, i), r = r.createElement("link"), dt(r);
        var h = r;
        h._p = new Promise(function(v, w) {
          h.onload = v, h.onerror = w;
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
  function $x() {
    this.imgCount--, p0(this);
  }
  var nu = null;
  function lu(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, nu = /* @__PURE__ */ new Map(), t.forEach(qx, e), nu = null, dc.call(e));
  }
  function qx(e, t) {
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
    $$typeof: Re,
    Provider: null,
    Consumer: null,
    _currentValue: Dt,
    _currentValue2: Dt,
    _threadCount: 0
  };
  function Yx(e, t, n, l, i, r, h, v, w) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = rt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = rt(0), this.hiddenUpdates = rt(null), this.identifierPrefix = l, this.onUncaughtError = i, this.onCaughtError = r, this.onRecoverableError = h, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = w, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function g0(e, t, n, l, i, r, h, v, w, R, H, G) {
    return e = new Yx(
      e,
      t,
      n,
      h,
      w,
      R,
      H,
      G,
      v
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
  var Fi = !0;
  function Gx(e, t, n, l) {
    var i = re.T;
    re.T = null;
    var r = xe.p;
    try {
      xe.p = 2, ud(e, t, n, l);
    } finally {
      xe.p = r, re.T = i;
    }
  }
  function Vx(e, t, n, l) {
    var i = re.T;
    re.T = null;
    var r = xe.p;
    try {
      xe.p = 8, ud(e, t, n, l);
    } finally {
      xe.p = r, re.T = i;
    }
  }
  function ud(e, t, n, l) {
    if (Fi) {
      var i = od(l);
      if (i === null)
        Vf(
          e,
          t,
          l,
          au,
          n
        ), N0(e, l);
      else if (Zx(
        i,
        e,
        t,
        n,
        l
      ))
        l.stopPropagation();
      else if (N0(e, l), t & 4 && -1 < Xx.indexOf(e)) {
        for (; i !== null; ) {
          var r = sl(i);
          if (r !== null)
            switch (r.tag) {
              case 3:
                if (r = r.stateNode, r.current.memoizedState.isDehydrated) {
                  var h = al(r.pendingLanes);
                  if (h !== 0) {
                    var v = r;
                    for (v.pendingLanes |= 2, v.entangledLanes |= 2; h; ) {
                      var w = 1 << 31 - ft(h);
                      v.entanglements[1] |= w, h &= ~w;
                    }
                    vl(r), (Qe & 6) === 0 && (Gr = Xt() + 500, ic(0));
                  }
                }
                break;
              case 31:
              case 13:
                v = za(r, 2), v !== null && fn(v, r, 2), Zr(), rd(r, 2);
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
    if (au = null, e = On(e), e !== null) {
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
    return au = e, null;
  }
  function j0(e) {
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
          case Vn:
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
  function N0(e, t) {
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
    var t = On(e.target);
    if (t !== null) {
      var n = d(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = m(n), t !== null) {
            e.blockedOn = t, qc(e.priority, function() {
              S0(n);
            });
            return;
          }
        } else if (t === 31) {
          if (t = p(n), t !== null) {
            e.blockedOn = t, qc(e.priority, function() {
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
  function Ji(e) {
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
          var v = null;
          if (r && r.hasAttribute("formAction")) {
            if (i = r, h = r[zt] || null)
              v = h.formAction;
            else if (fd(i) !== null) continue;
          } else v = h.action;
          typeof v == "function" ? n[l + 1] = v : (n.splice(l, 3), l -= 3), w0(n);
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
    if (t === null) throw Error(o(409));
    var n = t.current, l = En();
    v0(n, l, e, t, null, null);
  }, ru.prototype.unmount = hd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      v0(e.current, 2, null, e, null, null), Zr(), t[Zn] = null;
    }
  };
  function ru(e) {
    this._internalRoot = e;
  }
  ru.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = $c();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Sa.length && t !== 0 && t < Sa[n].priority; n++) ;
      Sa.splice(n, 0, e), n === 0 && E0(e);
    }
  };
  var A0 = s.version;
  if (A0 !== "19.3.0")
    throw Error(
      o(
        527,
        A0,
        "19.3.0"
      )
    );
  xe.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
    return e = S(t), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var Kx = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: re,
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
    if (!f(e)) throw Error(o(299));
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
    ), e[Zn] = t.current, Gf(e), new hd(t);
  }, yc.hydrateRoot = function(e, t, n) {
    if (!f(e)) throw Error(o(299));
    var l = !1, i = "", r = yp, h = vp, v = bp, w = null;
    return n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onUncaughtError !== void 0 && (r = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (v = n.onRecoverableError), n.formState !== void 0 && (w = n.formState)), t = g0(
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
      v,
      k0
    ), t.context = y0(null), n = t.current, l = En(), l = fi(l), i = ia(l), i.callback = null, sa(n, i, l), n = l, t.current.lanes = n, Cn(t, n), vl(t), e[Zn] = t.current, Gf(e), new ru(t);
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
const c2 = (a) => a.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Qy = (...a) => a.filter((s, u, o) => !!s && s.trim() !== "" && o.indexOf(s) === u).join(" ").trim();
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
    strokeWidth: u = 2,
    absoluteStrokeWidth: o,
    className: f = "",
    children: d,
    iconNode: m,
    ...p
  }, b) => x.createElement(
    "svg",
    {
      ref: b,
      ...r2,
      width: s,
      height: s,
      stroke: a,
      strokeWidth: o ? Number(u) * 24 / Number(s) : u,
      className: Qy("lucide", f),
      ...p
    },
    [
      ...m.map(([S, y]) => x.createElement(S, y)),
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
  const u = x.forwardRef(
    ({ className: o, ...f }, d) => x.createElement(u2, {
      ref: d,
      iconNode: s,
      className: Qy(`lucide-${c2(a)}`, o),
      ...f
    })
  );
  return u.displayName = `${a}`, u;
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
const j2 = te("CloudSnow", [
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
const Fy = te("CloudSun", [
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
const Jy = te("Disc3", [
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
const N2 = te("Download", [
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
const $0 = te("Folder", [
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
const Nu = te("House", [
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
const $2 = te("PenLine", [
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
const q2 = te("PlaneLanding", [
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
const F2 = te("Sun", [
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
const J2 = te("Terminal", [
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
const q0 = te("Zap", [
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
  for (var u = 0, o = Array(s); u < s; u++) o[u] = a[u];
  return o;
}
function nS(a) {
  if (Array.isArray(a)) return a;
}
function lS(a, s) {
  var u = a == null ? null : typeof Symbol < "u" && a[Symbol.iterator] || a["@@iterator"];
  if (u != null) {
    var o, f, d, m, p = [], b = !0, S = !1;
    try {
      if (d = (u = u.call(a)).next, s !== 0) for (; !(b = (o = d.call(u)).done) && (p.push(o.value), p.length !== s); b = !0) ;
    } catch (y) {
      S = !0, f = y;
    } finally {
      try {
        if (!b && u.return != null && (m = u.return(), Object(m) !== m)) return;
      } finally {
        if (S) throw f;
      }
    }
    return p;
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
    var u = {}.toString.call(a).slice(8, -1);
    return u === "Object" && a.constructor && (u = a.constructor.name), u === "Map" || u === "Set" ? Array.from(a) : u === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(u) ? Y0(a, s) : void 0;
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
Hd || (Hd = function(s, u) {
  for (var o = arguments.length, f = new Array(o > 2 ? o - 2 : 0), d = 2; d < o; d++)
    f[d - 2] = arguments[d];
  return s.apply(u, f);
});
Bd || (Bd = function(s) {
  for (var u = arguments.length, o = new Array(u > 1 ? u - 1 : 0), f = 1; f < u; f++)
    o[f - 1] = arguments[f];
  return new s(...o);
});
const ei = Tt(Array.prototype.forEach), oS = Tt(Array.prototype.lastIndexOf), V0 = Tt(Array.prototype.pop), vc = Tt(Array.prototype.push), fS = Tt(Array.prototype.splice), us = Array.isArray, Nc = Tt(String.prototype.toLowerCase), xd = Tt(String.prototype.toString), X0 = Tt(String.prototype.match), bc = Tt(String.prototype.replace), Z0 = Tt(String.prototype.indexOf), dS = Tt(String.prototype.trim), hS = Tt(Number.prototype.toString), mS = Tt(Boolean.prototype.toString), Q0 = typeof BigInt > "u" ? null : Tt(BigInt.prototype.toString), K0 = typeof Symbol > "u" ? null : Tt(Symbol.prototype.toString), dn = Tt(Object.prototype.hasOwnProperty), xc = Tt(Object.prototype.toString), Qt = Tt(RegExp.prototype.test), Wa = pS(TypeError);
function Tt(a) {
  return function(s) {
    s instanceof RegExp && (s.lastIndex = 0);
    for (var u = arguments.length, o = new Array(u > 1 ? u - 1 : 0), f = 1; f < u; f++)
      o[f - 1] = arguments[f];
    return Hd(a, s, o);
  };
}
function pS(a) {
  return function() {
    for (var s = arguments.length, u = new Array(s), o = 0; o < s; o++)
      u[o] = arguments[o];
    return Bd(a, u);
  };
}
function Ze(a, s) {
  let u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Nc;
  if (G0 && G0(a, null), !us(s))
    return a;
  let o = s.length;
  for (; o--; ) {
    let f = s[o];
    if (typeof f == "string") {
      const d = u(f);
      d !== f && (cS(s) || (s[o] = d), f = d);
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
  for (const o of uv(a)) {
    var u = iS(o, 2);
    const f = u[0], d = u[1];
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
      const s = a, u = $n(s, "toString");
      if (typeof u == "function") {
        const o = u(s);
        return typeof o == "string" ? o : xc(o);
      }
      return xc(a);
    }
    default:
      return xc(a);
  }
}
function $n(a, s) {
  for (; a !== null; ) {
    const o = uS(a, s);
    if (o) {
      if (o.get)
        return Tt(o.get);
      if (typeof o.value == "function")
        return Tt(o.value);
    }
    a = rS(a);
  }
  function u() {
    return null;
  }
  return u;
}
function vS(a) {
  try {
    return Qt(a, ""), !0;
  } catch {
    return !1;
  }
}
const I0 = kt(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Sd = kt(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), jd = kt(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), bS = kt(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Nd = kt(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), xS = kt(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), F0 = kt(["#text"]), J0 = kt(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "command", "commandfor", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns"]), Ed = kt(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dominant-baseline", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "pointer-events", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-orientation", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "vector-effect", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), P0 = kt(["accent", "accentunder", "align", "bevelled", "close", "columnalign", "columnlines", "columnspacing", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lquote", "lspace", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), ou = kt(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), SS = Mt(/{{[\w\W]*|^[\w\W]*}}/g), jS = Mt(/<%[\w\W]*|^[\w\W]*%>/g), NS = Mt(/\${[\w\W]*/g), ES = Mt(/^data-[\-\w.\u00B7-\uFFFF]+$/), TS = Mt(/^aria-[\-\w]+$/), W0 = Mt(
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
}, fv = ["style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript"], RS = kt(Ze({}, fv)), MS = (function() {
  const a = {};
  return ei(fv, (s) => {
    a[s] = Mt(new RegExp("</" + s + "(?=[\\t\\n\\f\\r />])", "i"));
  }), kt(a);
})(), DS = function() {
  return typeof window > "u" ? null : window;
}, zS = function(s, u) {
  if (typeof s != "object" || typeof s.createPolicy != "function")
    return null;
  let o = null;
  const f = "data-tt-policy-suffix";
  u && u.hasAttribute(f) && (o = u.getAttribute(f));
  const d = "dompurify" + (o ? "#" + o : "");
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
}, Na = function(s, u, o, f) {
  return dn(s, u) && us(s[u]) ? Ze(f.base ? An(f.base) : {}, s[u], f.transform) : o;
}, Td = function(s, u, o) {
  const f = dn(s, u) ? s[u] : void 0;
  return f && typeof f == "object" ? An(f) : o();
};
function dv() {
  let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : DS();
  const s = (P) => dv(P);
  if (s.version = "3.4.15", s.removed = [], !a || !a.document || a.document.nodeType !== wn.document || !a.Element)
    return s.isSupported = !1, s;
  let u = a.document;
  const o = u, f = o.currentScript;
  a.DocumentFragment;
  const d = a.HTMLTemplateElement, m = a.Node, p = a.Element, b = a.NodeFilter, S = a.NamedNodeMap;
  S === void 0 && (a.NamedNodeMap || a.MozNamedAttrMap), a.HTMLFormElement;
  const y = a.DOMParser, g = a.trustedTypes, j = p.prototype, T = $n(j, "cloneNode"), E = $n(j, "remove"), L = $n(j, "removeAttributeNode"), k = $n(j, "nextSibling"), X = $n(j, "childNodes"), Z = $n(j, "parentNode"), U = $n(j, "shadowRoot"), K = $n(j, "attributes"), J = m && m.prototype ? $n(m.prototype, "nodeType") : null, B = m && m.prototype ? $n(m.prototype, "nodeName") : null, V = m && m.prototype ? $n(m.prototype, "ownerDocument") : null, se = function(N) {
    return J ? J(N) : N.nodeType;
  }, Ee = function(N) {
    return B ? B(N) : N.nodeName;
  };
  if (typeof d == "function") {
    const P = u.createElement("template");
    P.content && P.content.ownerDocument && (u = P.content.ownerDocument);
  }
  let ue, ve = "", me, Ue = !1, Ge = 0;
  const Re = function() {
    if (Ge > 0)
      throw Wa('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.');
  }, W = function(N) {
    Re(), Ge++;
    try {
      return ue.createHTML(N);
    } finally {
      Ge--;
    }
  }, de = function(N) {
    Re(), Ge++;
    try {
      return ue.createScriptURL(N);
    } finally {
      Ge--;
    }
  }, I = function() {
    return Ue || (me = zS(g, f), Ue = !0), me;
  }, je = u, $ = je.implementation, be = je.createNodeIterator, He = je.createDocumentFragment, hn = je.getElementsByTagName, _ = o.importNode;
  let q = ny();
  s.isSupported = typeof uv == "function" && typeof Z == "function" && $ && $.createHTMLDocument !== void 0;
  const fe = SS, he = jS, ye = NS, Me = ES, De = TS, re = wS, xe = kS, Dt = _S;
  let jl = W0, Be = null;
  const Vt = Ze({}, [...I0, ...Sd, ...jd, ...Nd, ...F0]);
  let ge = null;
  const Xe = Ze({}, [...J0, ...Ed, ...P0, ...ou]);
  let ct = Object.seal(is(null, {
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
  const Ce = Object.seal(is(null, {
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
  let Gn = !0, pn = !0, Nl = !1, El = !0, Ft = !1, an = !0, vt = !1, Jt = !1, Q = null, ee = null, Te = !1, le = !1, Ke = !1, ot = !1, Dc = !0, zc = !1;
  const Xt = "user-content-";
  let vs = !0, ri = !1, Tl = {}, Vn = null;
  const Lc = Ze({}, [
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
  const Uc = Ze({}, ["audio", "video", "img", "source", "image", "track"]);
  let Hc = null;
  const Zl = Ze({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), At = "http://www.w3.org/1998/Math/MathML", gn = "http://www.w3.org/2000/svg", ft = "http://www.w3.org/1999/xhtml";
  let Ql = ft, xs = !1, Ss = null;
  const ui = Ze({}, [At, gn, ft], xd), wa = kt(["mi", "mo", "mn", "ms", "mtext"]);
  let Kl = Ze({}, wa);
  const al = kt(["annotation-xml"]);
  let Il = Ze({}, al);
  const ka = Ze({}, ["title", "style", "font", "a", "script"]);
  let Fl = null;
  const $u = ["application/xhtml+xml", "text/html"], Bc = "text/html";
  let rt = null, Cn = null;
  const qu = u.createElement("form"), js = function(N) {
    return N instanceof RegExp || N instanceof Function;
  }, oi = function() {
    let N = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (Cn && Cn === N)
      return;
    (!N || typeof N != "object") && (N = {}), N = An(N), Fl = // eslint-disable-next-line unicorn/prefer-includes
    $u.indexOf(N.PARSER_MEDIA_TYPE) === -1 ? Bc : N.PARSER_MEDIA_TYPE, rt = Fl === "application/xhtml+xml" ? xd : Nc, Be = Na(N, "ALLOWED_TAGS", Vt, {
      transform: rt
    }), ge = Na(N, "ALLOWED_ATTR", Xe, {
      transform: rt
    }), Ss = Na(N, "ALLOWED_NAMESPACES", ui, {
      transform: xd
    }), Hc = Na(N, "ADD_URI_SAFE_ATTR", Zl, {
      transform: rt,
      base: Zl
    }), bs = Na(N, "ADD_DATA_URI_TAGS", Uc, {
      transform: rt,
      base: Uc
    }), Vn = Na(N, "FORBID_CONTENTS", Lc, {
      transform: rt
    }), mn = Na(N, "FORBID_TAGS", An({}), {
      transform: rt
    }), ln = Na(N, "FORBID_ATTR", An({}), {
      transform: rt
    }), Tl = dn(N, "USE_PROFILES") ? N.USE_PROFILES && typeof N.USE_PROFILES == "object" ? An(N.USE_PROFILES) : N.USE_PROFILES : !1, Gn = N.ALLOW_ARIA_ATTR !== !1, pn = N.ALLOW_DATA_ATTR !== !1, Nl = N.ALLOW_UNKNOWN_PROTOCOLS || !1, El = N.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Ft = N.SAFE_FOR_TEMPLATES || !1, an = N.SAFE_FOR_XML !== !1, vt = N.WHOLE_DOCUMENT || !1, le = N.RETURN_DOM || !1, Ke = N.RETURN_DOM_FRAGMENT || !1, ot = N.RETURN_TRUSTED_TYPE || !1, Te = N.FORCE_BODY || !1, Dc = N.SANITIZE_DOM !== !1, zc = N.SANITIZE_NAMED_PROPS || !1, vs = N.KEEP_CONTENT !== !1, ri = N.IN_PLACE || !1, jl = vS(N.ALLOWED_URI_REGEXP) ? N.ALLOWED_URI_REGEXP : W0, Ql = typeof N.NAMESPACE == "string" ? N.NAMESPACE : ft, Kl = Td(
      N,
      "MATHML_TEXT_INTEGRATION_POINTS",
      () => Ze({}, wa)
      // Default built-in map
    ), Il = Td(
      N,
      "HTML_INTEGRATION_POINTS",
      () => Ze({}, al)
      // Default built-in map
    );
    const M = Td(N, "CUSTOM_ELEMENT_HANDLING", () => is(null));
    if (ct = is(null), dn(M, "tagNameCheck") && js(M.tagNameCheck) && (ct.tagNameCheck = M.tagNameCheck), dn(M, "attributeNameCheck") && js(M.attributeNameCheck) && (ct.attributeNameCheck = M.attributeNameCheck), dn(M, "allowCustomizedBuiltInElements") && typeof M.allowCustomizedBuiltInElements == "boolean" && (ct.allowCustomizedBuiltInElements = M.allowCustomizedBuiltInElements), Mt(ct), Ft && (pn = !1), Ke && (le = !0), Tl && (Be = Ze({}, F0), ge = is(null), Tl.html === !0 && (Ze(Be, I0), Ze(ge, J0)), Tl.svg === !0 && (Ze(Be, Sd), Ze(ge, Ed), Ze(ge, ou)), Tl.svgFilters === !0 && (Ze(Be, jd), Ze(ge, Ed), Ze(ge, ou)), Tl.mathMl === !0 && (Ze(Be, Nd), Ze(ge, P0), Ze(ge, ou))), Ce.tagCheck = null, Ce.attributeCheck = null, dn(N, "ADD_TAGS") && (typeof N.ADD_TAGS == "function" ? Ce.tagCheck = N.ADD_TAGS : us(N.ADD_TAGS) && (Be === Vt && (Be = An(Be)), Ze(Be, N.ADD_TAGS, rt))), dn(N, "ADD_ATTR") && (typeof N.ADD_ATTR == "function" ? Ce.attributeCheck = N.ADD_ATTR : us(N.ADD_ATTR) && (ge === Xe && (ge = An(ge)), Ze(ge, N.ADD_ATTR, rt))), dn(N, "ADD_FORBID_CONTENTS") && us(N.ADD_FORBID_CONTENTS) && (Vn === Lc && (Vn = An(Vn)), Ze(Vn, N.ADD_FORBID_CONTENTS, rt)), vs && (Be["#text"] = !0), vt && Ze(Be, ["html", "head", "body"]), Be.table && (Ze(Be, ["tbody"]), delete mn.tbody), N.TRUSTED_TYPES_POLICY) {
      if (typeof N.TRUSTED_TYPES_POLICY.createHTML != "function")
        throw Wa('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      if (typeof N.TRUSTED_TYPES_POLICY.createScriptURL != "function")
        throw Wa('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      const F = ue;
      ue = N.TRUSTED_TYPES_POLICY;
      try {
        ve = W("");
      } catch (ae) {
        throw ue = F, ae;
      }
    } else N.TRUSTED_TYPES_POLICY === null ? (ue = void 0, ve = "") : (ue === void 0 && (ue = I()), ue && typeof ve == "string" && (ve = W("")));
    kt && kt(N), Cn = N;
  }, Ns = Ze({}, [...Sd, ...jd, ...bS]), fi = Ze({}, [...Nd, ...xS]), Es = function(N, M, F) {
    return M.namespaceURI === ft ? N === "svg" : M.namespaceURI === At ? N === "svg" && (F === "annotation-xml" || Kl[F]) : !!Ns[N];
  }, $c = function(N, M, F) {
    return M.namespaceURI === ft ? N === "math" : M.namespaceURI === gn ? N === "math" && Il[F] : !!fi[N];
  }, qc = function(N, M, F) {
    return M.namespaceURI === gn && !Il[F] || M.namespaceURI === At && !Kl[F] ? !1 : !fi[N] && (ka[N] || !Ns[N]);
  }, Xn = function(N) {
    let M = Z(N);
    (!M || !M.tagName) && (M = {
      namespaceURI: Ql,
      tagName: "template"
    });
    const F = Nc(N.tagName), ae = Nc(M.tagName);
    return Ss[N.namespaceURI] ? N.namespaceURI === gn ? Es(F, M, ae) : N.namespaceURI === At ? $c(F, M, ae) : N.namespaceURI === ft ? qc(F, M, ae) : !!(Fl === "application/xhtml+xml" && Ss[N.namespaceURI]) : !1;
  }, at = function(N) {
    vc(s.removed, {
      element: N
    });
    try {
      Z(N).removeChild(N);
    } catch {
      if (E(N), !Z(N))
        throw Wa("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
    }
  }, zt = function(N, M, F) {
    try {
      L(N, M);
    } catch {
      try {
        N.removeAttribute(F);
      } catch {
      }
    }
  }, Zn = function(N) {
    di(N);
    const M = X(N);
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
    const F = K(N);
    if (F)
      for (let ae = F.length - 1; ae >= 0; --ae) {
        const ie = F[ae], Se = ie && ie.name;
        typeof Se == "string" && zt(N, ie, Se);
      }
  }, il = function(N, M, F) {
    if (!F)
      try {
        F = M.getAttributeNode(N);
      } catch {
        F = null;
      }
    vc(s.removed, {
      attribute: F || null,
      from: M
    });
    try {
      F ? L(M, F) : M.removeAttribute(N);
    } catch {
      try {
        M.removeAttribute(N);
      } catch {
      }
    }
    if (N === "is")
      if (le || Ke)
        try {
          at(M);
        } catch {
        }
      else
        try {
          M.setAttribute(N, "");
        } catch {
        }
  }, Yu = function(N) {
    const M = K(N);
    if (M)
      for (let F = M.length - 1; F >= 0; --F) {
        const ae = M[F], ie = ae && ae.name;
        typeof ie != "string" || ge[rt(ie)] || zt(N, ae, ie);
      }
  }, di = function(N) {
    const M = [N];
    for (; M.length > 0; ) {
      const F = M.pop();
      se(F) === wn.element && Yu(F);
      const ie = X(F);
      if (ie)
        for (let Se = ie.length - 1; Se >= 0; --Se)
          M.push(ie[Se]);
    }
  }, Ts = function(N, M) {
    return an ? N === "patchsrc" ? !0 : N === "for" && M !== "label" && M !== "output" : !1;
  }, Aa = function(N) {
    if (!an)
      return;
    const M = [N];
    for (; M.length > 0; ) {
      const F = M.pop(), ae = se(F);
      if (ae === wn.processingInstruction || ae === wn.comment && Qt(ty, F.data)) {
        try {
          E(F);
        } catch {
        }
        continue;
      }
      if (ae === wn.element) {
        const Se = F, Fe = rt(Ee(F));
        try {
          Se.hasAttribute && Se.hasAttribute("patchsrc") && Se.removeAttribute("patchsrc"), Se.hasAttribute && Se.hasAttribute("for") && Ts("for", Fe) && Se.removeAttribute("for");
        } catch {
        }
      }
      const ie = X(F);
      if (ie)
        for (let Se = ie.length - 1; Se >= 0; --Se)
          M.push(ie[Se]);
    }
  }, _a = function(N) {
    let M = null, F = null;
    if (Te)
      N = "<remove></remove>" + N;
    else {
      const Se = X0(N, /^[\r\n\t ]+/);
      F = Se && Se[0];
    }
    Fl === "application/xhtml+xml" && Ql === ft && (N = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + N + "</body></html>");
    const ae = ue ? W(N) : N;
    if (Ql === ft)
      try {
        M = new y().parseFromString(ae, Fl);
      } catch {
      }
    if (!M || !M.documentElement) {
      M = $.createDocument(Ql, "template", null);
      try {
        M.documentElement.innerHTML = xs ? ve : ae;
      } catch {
      }
    }
    const ie = M.body || M.documentElement;
    return N && F && ie.insertBefore(u.createTextNode(F), ie.childNodes[0] || null), Ql === ft ? hn.call(M, vt ? "html" : "body")[0] : vt ? M.documentElement : ie;
  }, Ca = function(N) {
    const M = V ? V(N) : N.ownerDocument;
    return be.call(
      M || N,
      N,
      // eslint-disable-next-line no-bitwise
      b.SHOW_ELEMENT | b.SHOW_COMMENT | b.SHOW_TEXT | b.SHOW_PROCESSING_INSTRUCTION | b.SHOW_CDATA_SECTION,
      null
    );
  }, On = function(N) {
    return N = bc(N, fe, " "), N = bc(N, he, " "), N = bc(N, ye, " "), N;
  }, sl = function(N) {
    var M;
    N.normalize();
    const F = V ? V(N) : N.ownerDocument, ae = be.call(
      F || N,
      N,
      // eslint-disable-next-line no-bitwise
      b.SHOW_TEXT | b.SHOW_COMMENT | b.SHOW_CDATA_SECTION | b.SHOW_PROCESSING_INSTRUCTION,
      null
    );
    let ie = ae.nextNode();
    for (; ie; )
      ie.data = On(ie.data), ie = ae.nextNode();
    const Se = (M = N.querySelectorAll) === null || M === void 0 ? void 0 : M.call(N, "template");
    Se && ei(Se, (Fe) => {
      yn(Fe.content) && sl(Fe.content);
    });
  }, cl = function(N) {
    const M = B ? B(N) : null;
    return typeof M != "string" || rt(M) !== "form" ? !1 : typeof N.nodeName != "string" || typeof N.textContent != "string" || typeof N.removeChild != "function" || // Realm-safe NamedNodeMap detection: equality against the cached
    // prototype getter. Clobbered .attributes (e.g. <input name="attributes">)
    // makes the direct read diverge from the cached read; a clean form
    // (same-realm OR foreign-realm) has both reads pointing at the same
    // canonical NamedNodeMap.
    N.attributes !== K(N) || typeof N.removeAttribute != "function" || // A form descendant named "removeAttributeNode" or "getAttributeNode"
    // shadows these Attr-node methods via [LegacyOverrideBuiltIns].
    // _removeAttribute() / _stripAttributeNode() reach for
    // element.removeAttributeNode(attr) first; when it is shadowed the call
    // throws and the name-based fallback element.removeAttribute(name)
    // ASCII-lowercases its lookup key in an HTML document, silently missing
    // a case-preserved event-handler attribute (e.g. an ONANIMATIONSTART
    // that reached the sanitizer through an XML/XHTML parse). Flag the form
    // so it is removed wholesale, exactly as for the other shadowed methods.
    typeof N.removeAttributeNode != "function" || typeof N.getAttributeNode != "function" || typeof N.setAttribute != "function" || typeof N.namespaceURI != "string" || typeof N.insertBefore != "function" || typeof N.hasChildNodes != "function" || // NodeType clobbering probe. Cached Node.prototype.nodeType getter
    // returns the integer 1 for any Element regardless of realm; direct
    // read on a clobbered form (e.g. <input name="nodeType">) returns
    // the named child element. Cheap addition — nodeType is read from
    // an internal slot, no serialization cost — and removes a residual
    // clobbering surface used by several mXSS / PI / comment branches
    // in _sanitizeElements that compare currentNode.nodeType directly.
    N.nodeType !== J(N) || // HTMLFormElement has [LegacyOverrideBuiltIns]: a descendant named
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
    N.childNodes !== X(N);
  }, yn = function(N) {
    if (!J || typeof N != "object" || N === null)
      return !1;
    try {
      return J(N) === wn.documentFragment;
    } catch {
      return !1;
    }
  }, dt = function(N) {
    if (!J || typeof N != "object" || N === null)
      return !1;
    try {
      return typeof J(N) == "number";
    } catch {
      return !1;
    }
  };
  function vn(P, N, M) {
    P.length !== 0 && ei(P, (F) => {
      F.call(s, N, M, Cn);
    });
  }
  const Yc = function(N, M) {
    return !!(an && N.hasChildNodes() && !dt(N.firstElementChild) && Qt(ey, N.textContent) && Qt(ey, N.innerHTML) || an && N.namespaceURI === ft && RS[M] && (dt(N.firstElementChild) || typeof N.textContent == "string" && Qt(MS[M], N.textContent)) || N.nodeType === wn.processingInstruction || an && N.nodeType === wn.comment && Qt(ty, N.data));
  }, Oa = function(N, M) {
    if (N instanceof RegExp)
      return Qt(N, M);
    if (N instanceof Function) {
      for (var F = arguments.length, ae = new Array(F > 2 ? F - 2 : 0), ie = 2; ie < F; ie++)
        ae[ie - 2] = arguments[ie];
      return !!N(M, ...ae);
    }
    return !1;
  }, wl = function(N, M, F) {
    if (!mn[M] && Ye(M) && Oa(ct.tagNameCheck, M))
      return !1;
    if (vs && !Vn[M]) {
      const ae = Z(N), ie = X(N);
      if (ie && ae) {
        const Se = ie.length;
        for (let Fe = Se - 1; Fe >= 0; --Fe) {
          const nt = N === F ? T(ie[Fe], !0) : ie[Fe];
          ae.insertBefore(nt, k(N));
        }
      }
    }
    return at(N), !0;
  }, kl = function(N, M, F, ae) {
    return N.length === 0 ? M : M === F || M === ae ? An(M) : M;
  }, Gc = function(N, M) {
    return N === M || Z(N) !== null ? !1 : (ri && di(N), !0);
  }, ws = function(N, M) {
    if (vn(q.beforeSanitizeElements, N, null), Gc(N, M))
      return !0;
    if (cl(N))
      return at(N), !0;
    const F = rt(Ee(N));
    if (Be = kl(q.uponSanitizeElement, Be, Vt, Q), vn(q.uponSanitizeElement, N, {
      tagName: F,
      allowedTags: Be
    }), Gc(N, M))
      return !0;
    if (Yc(N, F))
      return at(N), !0;
    if (mn[F] || !(Ce.tagCheck instanceof Function && Ce.tagCheck(F)) && !Be[F]) {
      const ie = wl(N, F, M);
      return ie === !1 && vn(q.afterSanitizeElements, N, null), ie;
    }
    if (se(N) === wn.element && !Xn(N) || (F === "noscript" || F === "noembed" || F === "noframes") && Qt(CS, N.innerHTML))
      return at(N), !0;
    if (Ft && N.nodeType === wn.text) {
      const ie = On(N.textContent);
      N.textContent !== ie && (vc(s.removed, {
        element: N.cloneNode()
      }), N.textContent = ie);
    }
    return vn(q.afterSanitizeElements, N, null), !1;
  }, ks = function(N, M, F) {
    if (ln[M] || Ts(M, N) || Dc && (M === "id" || M === "name") && (F in u || F in qu))
      return !1;
    const ae = ge[M] || Ce.attributeCheck instanceof Function && Ce.attributeCheck(M, N);
    return pn && Qt(Me, M) || Gn && Qt(De, M) ? !0 : ae ? Hc[M] || Qt(jl, bc(F, xe, "")) || (M === "src" || M === "xlink:href" || M === "href") && N !== "script" && Z0(F, "data:") === 0 && bs[N] || Nl && !Qt(re, bc(F, xe, "")) ? !0 : !F : (
      // Condition a) covers a basically valid custom element tag name whose
      // tag passes the configured tagNameCheck and whose attribute name
      // passes the configured attributeNameCheck ...
      Ye(N) && Oa(ct.tagNameCheck, N) && Oa(ct.attributeNameCheck, M, N) || // Condition b) covers an `is` attribute whose value passes the
      // configured tagNameCheck while customized built-in elements are
      // allowed.
      M === "is" && ct.allowCustomizedBuiltInElements && Oa(ct.tagNameCheck, F)
    );
  }, Gu = Ze({}, ["annotation-xml", "color-profile", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "missing-glyph"]), Ye = function(N) {
    return !Gu[Nc(N)] && Qt(Dt, N);
  }, Vc = function(N, M, F, ae) {
    if (ue && typeof g == "object" && typeof g.getAttributeType == "function" && !F)
      switch (g.getAttributeType(N, M)) {
        case "TrustedHTML":
          return W(ae);
        case "TrustedScriptURL":
          return de(ae);
      }
    return ae;
  }, hi = function(N, M, F, ae) {
    try {
      return F ? N.setAttributeNS(F, M, ae) : N.setAttribute(M, ae), cl(N) ? (at(N), !1) : !0;
    } catch {
      return il(M, N), !1;
    }
  }, Ra = function(N) {
    vn(q.beforeSanitizeAttributes, N, null);
    const M = N.attributes;
    if (!M || cl(N))
      return;
    ge = kl(q.uponSanitizeAttribute, ge, Xe, ee);
    const F = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: ge,
      forceKeepAttr: void 0
    };
    let ae = M.length;
    const ie = rt(N.nodeName);
    for (; ae--; ) {
      const Se = M[ae], Fe = Se.name, nt = Se.namespaceURI, bt = Se.value, Ut = rt(Fe), mi = bt;
      let pt = Fe === "value" ? mi : dS(mi), Xc = !1;
      if (F.attrName = Ut, F.attrValue = pt, F.keepAttr = !0, F.forceKeepAttr = void 0, vn(q.uponSanitizeAttribute, N, F), pt = F.attrValue, zc && (Ut === "id" || Ut === "name") && Z0(pt, Xt) !== 0 && (il(Fe, N, Se), pt = Xt + pt, Xc = !0), an && Qt(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, pt)) {
        il(Fe, N, Se);
        continue;
      }
      if (Ut === "attributename" && X0(pt, "href")) {
        il(Fe, N, Se);
        continue;
      }
      if (!F.forceKeepAttr) {
        if (!F.keepAttr) {
          il(Fe, N, Se);
          continue;
        }
        if (!El && Qt(OS, pt)) {
          il(Fe, N, Se);
          continue;
        }
        if (Ft && (pt = On(pt)), !ks(ie, Ut, pt)) {
          il(Fe, N, Se);
          continue;
        }
        pt = Vc(ie, Ut, nt, pt), pt !== mi && hi(N, Fe, nt, pt) && Xc && V0(s.removed);
      }
    }
    vn(q.afterSanitizeAttributes, N, null);
  }, sn = function(N) {
    let M = null;
    const F = Ca(N);
    for (vn(q.beforeSanitizeShadowDOM, N, null); M = F.nextNode(); )
      if (vn(q.uponSanitizeShadowNode, M, null), ws(M, N), Ra(M), yn(M.content) && sn(M.content), se(M) === wn.element) {
        const ae = U(M);
        yn(ae) && (Lt(ae), sn(ae));
      }
    vn(q.afterSanitizeShadowDOM, N, null);
  }, Lt = function(N) {
    const M = [{
      node: N,
      shadow: null
    }];
    for (; M.length > 0; ) {
      const F = M.pop();
      if (F.shadow) {
        sn(F.shadow);
        continue;
      }
      const ae = F.node, Se = se(ae) === wn.element, Fe = X(ae);
      if (Fe)
        for (let nt = Fe.length - 1; nt >= 0; --nt)
          M.push({
            node: Fe[nt],
            shadow: null
          });
      if (Se) {
        const nt = B ? B(ae) : null;
        if (typeof nt == "string" && rt(nt) === "template") {
          const bt = ae.content;
          yn(bt) && M.push({
            node: bt,
            shadow: null
          });
        }
      }
      if (Se) {
        const nt = U(ae);
        yn(nt) && M.push({
          node: null,
          shadow: nt
        }, {
          node: nt,
          shadow: null
        });
      }
    }
  };
  return s.sanitize = function(P) {
    let N = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, M = null, F = null, ae = null, ie = null;
    if (xs = !P, xs && (P = "<!-->"), typeof P != "string" && !dt(P) && (P = yS(P), typeof P != "string"))
      throw Wa("dirty is not a string, aborting");
    if (!s.isSupported)
      return P;
    Jt ? (Be = Q, ge = ee) : oi(N), (q.uponSanitizeElement.length > 0 || q.uponSanitizeAttribute.length > 0) && (Be = An(Be)), q.uponSanitizeAttribute.length > 0 && (ge = An(ge)), s.removed = [];
    const Se = ri && typeof P != "string" && dt(P);
    if (Se) {
      Aa(P);
      const bt = Ee(P);
      if (typeof bt == "string") {
        const Ut = rt(bt);
        if (!Be[Ut] || mn[Ut])
          throw Zn(P), Wa("root node is forbidden and cannot be sanitized in-place");
      }
      if (cl(P))
        throw Zn(P), Wa("root node is clobbered and cannot be sanitized in-place");
      try {
        Lt(P);
      } catch (Ut) {
        throw Zn(P), Ut;
      }
    } else if (dt(P))
      M = _a("<!---->"), F = M.ownerDocument.importNode(P, !0), F.nodeType === wn.element && F.nodeName === "BODY" || F.nodeName === "HTML" ? M = F : M.appendChild(F), Lt(M);
    else {
      if (!le && !Ft && !vt && // eslint-disable-next-line unicorn/prefer-includes
      P.indexOf("<") === -1)
        return ue && ot ? W(P) : P;
      if (M = _a(P), !M)
        return le ? null : ot ? ve : "";
    }
    M && Te && at(M.firstChild);
    const Fe = Se ? P : M;
    try {
      const bt = Ca(Fe);
      for (; ae = bt.nextNode(); )
        ws(ae, Fe), Ra(ae), yn(ae.content) && sn(ae.content);
    } catch (bt) {
      throw Se && (Zn(P), ei(s.removed, (Ut) => {
        Ut.element && di(Ut.element);
      })), bt;
    }
    if (Se)
      return ei(s.removed, (bt) => {
        bt.element && di(bt.element);
      }), Ft && sl(P), P;
    if (le) {
      if (Ft && sl(M), Ke)
        for (ie = He.call(M.ownerDocument); M.firstChild; )
          ie.appendChild(M.firstChild);
      else
        ie = M;
      return (ge.shadowroot || ge.shadowrootmode) && (ie = _.call(o, ie, !0)), ie;
    }
    let nt = vt ? M.outerHTML : M.innerHTML;
    return vt && Be["!doctype"] && M.ownerDocument && M.ownerDocument.doctype && M.ownerDocument.doctype.name && Qt(AS, M.ownerDocument.doctype.name) && (nt = "<!DOCTYPE " + M.ownerDocument.doctype.name + `>
` + nt), Ft && (nt = On(nt)), ue && ot ? W(nt) : nt;
  }, s.setConfig = function() {
    let P = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    oi(P), Jt = !0, Q = Be, ee = ge;
  }, s.clearConfig = function() {
    Cn = null, Jt = !1, Q = null, ee = null, ue = me, ve = "";
  }, s.isValidAttribute = function(P, N, M) {
    Cn || oi({});
    const F = rt(P), ae = rt(N);
    return ks(F, ae, M);
  }, s.addHook = function(P, N) {
    typeof N == "function" && dn(q, P) && vc(q[P], N);
  }, s.removeHook = function(P, N) {
    if (dn(q, P)) {
      if (N !== void 0) {
        const M = oS(q[P], N);
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
  return (u) => {
    let o = Math.max(0, Math.min(3, u - 1)), f = s[o];
    return f || (f = a(o), s[o] = f), f;
  };
}
function _e(a, s = "") {
  let u = typeof a == "string" ? a : a.source, o = { replace: (f, d) => {
    let m = typeof d == "string" ? d : d.source;
    return m = m.replace(It.caret, "$1"), u = u.replace(f, m), o;
  }, getRegex: () => new RegExp(u, s) };
  return o;
}
var LS = ((a = "") => {
  try {
    return !!new RegExp("(?<=1)(?<!1)" + a);
  } catch {
    return !1;
  }
})(), It = { codeRemoveIndent: /^(?: {0,3}\t| {1,4})/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, endingSpaceTabChar: /[ \t]$/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (a) => new RegExp(`^( {0,3}${a})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: Pi((a) => new RegExp(`^ {0,${a}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)), hrRegex: Pi((a) => new RegExp(`^ {0,${a}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)), fencesBeginRegex: Pi((a) => new RegExp(`^ {0,${a}}(?:\`\`\`|~~~)`)), headingBeginRegex: Pi((a) => new RegExp(`^ {0,${a}}#`)), htmlBeginRegex: Pi((a) => new RegExp(`^ {0,${a}}(?:</?(?:${Oc})(?: +|$|/?>)|<(?:script|pre|style|textarea|!--))`, "i")), blockquoteBeginRegex: Pi((a) => new RegExp(`^ {0,${a}}>`)) }, US = /^(?:[ \t]*(?:\n|$))+/, HS = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, BS = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Cc = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, $S = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, dh = / {0,3}(?:[*+-]|\d{1,9}[.)])/, pv = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, gv = _e(pv).replace(/bull/g, dh).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), qS = _e(pv).replace(/bull/g, dh).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), hh = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/, YS = /^[^\n]+/, mh = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, GS = _e(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", mh).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), VS = _e(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, dh).getRegex(), Oc = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", ph = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, XS = _e("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", ph).replace("tag", Oc).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), yv = (a) => _e(hh).replace("hr", Cc).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", a).replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Oc).getRegex(), ZS = yv(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/), QS = yv(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/), KS = _e(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", QS).getRegex(), gh = { blockquote: KS, code: HS, def: GS, fences: BS, heading: $S, hr: Cc, html: XS, lheading: gv, list: VS, newline: US, paragraph: ZS, table: ni, text: YS }, ly = _e("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Cc).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Oc).getRegex(), IS = { ...gh, lheading: qS, table: ly, paragraph: _e(hh).replace("hr", Cc).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ly).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Oc).getRegex() }, FS = { ...gh, html: _e(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", ph).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: ni, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: _e(hh).replace("hr", Cc).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", gv).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, JS = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, PS = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, vv = /^( {2,}|\\)\n(?!\s*$)[ \t]*/, WS = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Vl = /[\p{P}\p{S}]/u, ms = /[\s\p{P}\p{S}]/u, Rc = /[^\s\p{P}\p{S}]/u, ej = _e(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, ms).getRegex(), tj = /[\p{Pi}\p{Ps}"']/u, bv = /(?!~)[\p{P}\p{S}]/u, nj = /(?!~)[\s\p{P}\p{S}]/u, lj = /(?:[^\s\p{P}\p{S}]|~)/u, aj = _e(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", LS ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), xv = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/, ij = _e(xv, "u").replace(/punct/g, Vl).getRegex(), sj = _e(xv, "u").replace(/punct/g, bv).getRegex(), cj = /^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, rj = _e(cj, "u").replace(/openQuote/g, tj).replace(/punct/g, Vl).getRegex(), Sv = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", uj = _e(Sv, "gu").replace(/notPunctSpace/g, Rc).replace(/punctSpace/g, ms).replace(/punct/g, Vl).getRegex(), oj = _e(Sv, "gu").replace(/notPunctSpace/g, lj).replace(/punctSpace/g, nj).replace(/punct/g, bv).getRegex(), fj = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", dj = _e(fj, "gu").replace(/notPunctSpace/g, Rc).replace(/punctSpace/g, ms).replace(/punct/g, Vl).getRegex(), hj = _e("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Rc).replace(/punctSpace/g, ms).replace(/punct/g, Vl).getRegex(), mj = "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", pj = _e(mj, "gu").replace(/notPunctSpace/g, Rc).replace(/punctSpace/g, ms).replace(/punct/g, Vl).getRegex(), gj = _e(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, Vl).getRegex(), yj = "^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", vj = _e(yj, "gu").replace(/notPunctSpace/g, Rc).replace(/punctSpace/g, ms).replace(/punct/g, Vl).getRegex(), bj = _e(/\\(punct)/, "gu").replace(/punct/g, Vl).getRegex(), xj = _e(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Sj = _e(ph).replace("(?:-->|$)", "-->").getRegex(), jj = _e("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Sj).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), jv = /\[(?:\\[\s\S]|[^\[\]\\])*\]/, ku = _e(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets", jv).getRegex(), Nj = _e(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", ku).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Ej = _e(/^!?\[(label)\]\[(ref)\]/).replace("label", ku).replace("ref", mh).getRegex(), Tj = _e(/^!?\[(ref)\](?:\[\])?/).replace("ref", mh).getRegex(), ay = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/, wj = _e(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets", jv).getRegex(), kj = _e("reflink|nolink(?!\\()", "g").replace("reflink", _e(/^!?\[(label)\]\[(ref)\]/).replace("label", wj).replace("ref", ay).getRegex()).replace("nolink", _e(/^!?\[(ref)\](?:\[\])?/).replace("ref", ay).getRegex()).getRegex(), iy = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, yh = { _backpedal: ni, anyPunctuation: bj, autolink: xj, blockSkip: aj, br: vv, code: PS, del: ni, delLDelim: ni, delRDelim: ni, emStrongLDelim: ij, emStrongRDelimAst: uj, emStrongRDelimUnd: hj, escape: JS, link: Nj, nolink: Tj, punctuation: ej, reflink: Ej, reflinkSearch: kj, tag: jj, text: WS, url: ni }, Aj = { ...yh, emStrongLDelim: rj, emStrongRDelimAst: dj, emStrongRDelimUnd: pj, link: _e(/^!?\[(label)\]\((.*?)\)/).replace("label", ku).getRegex(), reflink: _e(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", ku).getRegex() }, $d = { ...yh, emStrongRDelimAst: oj, emStrongLDelim: sj, delLDelim: gj, delRDelim: vj, url: _e(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", iy).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: _e(/^(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", iy).getRegex() }, _j = { ...$d, br: _e(vv).replace("{2,}", "*").getRegex(), text: _e($d.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, fu = { normal: gh, gfm: IS, pedantic: FS }, Sc = { normal: yh, gfm: $d, breaks: _j, pedantic: Aj }, Cj = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, sy = (a) => Cj[a];
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
  let u = a.replace(It.findPipe, (d, m, p) => {
    let b = !1, S = m;
    for (; --S >= 0 && p[S] === "\\"; ) b = !b;
    return b ? "|" : " |";
  }), o = u.split(It.splitPipe), f = 0;
  if (o[0].trim() || o.shift(), o.length > 0 && !o.at(-1)?.trim() && o.pop(), s) if (o.length > s) o.splice(s);
  else for (; o.length < s; ) o.push("");
  for (; f < o.length; f++) o[f] = o[f].trim().replace(It.slashPipe, "|");
  return o;
}
function Ea(a, s, u) {
  let o = a.length;
  if (o === 0) return "";
  let f = 0;
  for (; f < o && a.charAt(o - f - 1) === s; )
    f++;
  return a.slice(0, o - f);
}
function uy(a) {
  let s = a.split(`
`), u = s.length - 1;
  for (; u >= 0 && It.blankLine.test(s[u]); ) u--;
  return s.length - u <= 2 ? a : s.slice(0, u + 1).join(`
`);
}
function Au(a) {
  return a.toLowerCase().toUpperCase().toLowerCase();
}
function Oj(a, s) {
  if (a.indexOf(s[1]) === -1) return -1;
  let u = 0;
  for (let o = 0; o < a.length; o++) if (a[o] === "\\") o++;
  else if (a[o] === s[0]) u++;
  else if (a[o] === s[1] && (u--, u < 0)) return o;
  return u > 0 ? -2 : -1;
}
function Rj(a, s = 0) {
  let u = s, o = "";
  for (let f of a) if (f === "	") {
    let d = 4 - u % 4;
    o += " ".repeat(d), u += d;
  } else o += f, u++;
  return o;
}
function oy(a, s, u, o, f) {
  let d = s.href, m = s.title || null, p = a[1].replace(f.other.outputLinkReplace, "$1"), b = a[0].charAt(0) === "!";
  o.state.inLink = !0;
  let S = o.state.linkEmitted, y = o.state.inRawBlock;
  o.state.linkEmitted = !1;
  let g = o.inlineTokens(p), j = o.state.linkEmitted;
  if (o.state.linkEmitted = S, o.state.inLink = !1, !b) {
    if (j) {
      o.state.inRawBlock = y;
      return;
    }
    o.state.linkEmitted = !0;
  }
  return { type: b ? "image" : "link", raw: u, href: d, title: m, text: p, tokens: g };
}
function Mj(a, s, u) {
  let o = a.match(u.other.indentCodeCompensation);
  if (o === null) return s;
  let f = o[1];
  return s.split(`
`).map((d) => {
    let m = d.match(u.other.beginningSpace);
    if (m === null) return d;
    let [p] = m;
    return d.slice(Math.min(p.length, f.length));
  }).join(`
`);
}
function fy(a, s, u, o) {
  if (!s.includes("<")) return !1;
  for (let f = 0; f < s.length; f++) {
    if (s[f] === "\\") {
      f++;
      continue;
    }
    if (s[f] === "`") {
      let p = o.inline.code.exec(s.slice(f));
      if (p) {
        f += p[0].length - 1;
        continue;
      }
    }
    if (s[f] !== "<") continue;
    let d = a.slice(u + f), m = o.inline.tag.exec(d) || o.inline.autolink.exec(d);
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
      let u = this.options.pedantic ? s[0] : uy(s[0]), o = u.replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: u, codeBlockStyle: "indented", text: o };
    }
  }
  fences(a) {
    let s = this.rules.block.fences.exec(a);
    if (s) {
      let u = s[0], o = Mj(u, s[3] || "", this.rules);
      return { type: "code", raw: u, lang: s[2] ? s[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : s[2], text: o };
    }
  }
  heading(a) {
    let s = this.rules.block.heading.exec(a);
    if (s) {
      let u = s[2].trim();
      if (this.rules.other.endingHash.test(u)) {
        let o = Ea(u, "#");
        (this.options.pedantic || !o || this.rules.other.endingSpaceTabChar.test(o)) && (u = o.trim());
      }
      return { type: "heading", raw: Ea(s[0], `
`), depth: s[1].length, text: u, tokens: this.lexer.inline(u) };
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
      let u = Ea(s[0], `
`).split(`
`), o = "", f = "", d = [];
      for (; u.length > 0; ) {
        let m = !1, p = [], b;
        for (b = 0; b < u.length; b++) if (this.rules.other.blockquoteStart.test(u[b])) p.push(u[b]), m = !0;
        else if (!m) p.push(u[b]);
        else break;
        u = u.slice(b);
        let S = p.join(`
`), y = S.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        o = o ? `${o}
${S}` : S, f = f ? `${f}
${y}` : y;
        let g = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(y, d, !0), this.lexer.state.top = g, u.length === 0) break;
        let j = d.at(-1);
        if (j?.type === "code") break;
        if (j?.type === "blockquote") {
          let T = j, E = u.join(`
`), L = T.raw + `
` + E.replace(this.rules.other.blockquoteSetextReplace2, ""), k = this.blockquote(L);
          d[d.length - 1] = k, o = `${o}
${E}`, f = f.substring(0, f.length - T.text.length) + k.text;
          break;
        } else if (j?.type === "list") {
          let T = j, E = T.raw + `
` + u.join(`
`), L = this.list(E);
          d[d.length - 1] = L, o = o.substring(0, o.length - j.raw.length) + L.raw, f = f.substring(0, f.length - T.raw.length) + L.raw, u = E.substring(d.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: o, tokens: d, text: f };
    }
  }
  list(a) {
    let s = this.rules.block.list.exec(a);
    if (s) {
      let u = s[1].trim(), o = u.length > 1, f = { type: "list", raw: "", ordered: o, start: o ? +u.slice(0, -1) : "", loose: !1, items: [] };
      u = o ? `\\d{1,9}\\${u.slice(-1)}` : `\\${u}`, this.options.pedantic && (u = o ? u : "[*+-]");
      let d = this.rules.other.listItemRegex(u), m = !1;
      for (; a; ) {
        let b = !1, S = "", y = "";
        if (!(s = d.exec(a)) || this.rules.block.hr.test(a)) break;
        S = s[0], a = a.substring(S.length);
        let g = Rj(s[2].split(`
`, 1)[0], s[1].length), j = a.split(`
`, 1)[0], T = !g.trim(), E = 0;
        if (this.options.pedantic ? (E = 2, y = g.trimStart()) : T ? E = s[1].length + 1 : (E = g.search(this.rules.other.nonSpaceChar), E = E > 4 ? 1 : E, y = g.slice(E), E += s[1].length), T && this.rules.other.blankLine.test(j) && (S += j + `
`, a = a.substring(j.length + 1), b = !0), !b) {
          let L = this.rules.other.nextBulletRegex(E), k = this.rules.other.hrRegex(E), X = this.rules.other.fencesBeginRegex(E), Z = this.rules.other.headingBeginRegex(E), U = this.rules.other.htmlBeginRegex(E), K = this.rules.other.blockquoteBeginRegex(E);
          for (; a; ) {
            let J = a.split(`
`, 1)[0], B;
            if (j = J, this.options.pedantic ? (j = j.replace(this.rules.other.listReplaceNesting, "  "), B = j) : B = j.replace(this.rules.other.tabCharGlobal, "    "), X.test(j) || Z.test(j) || U.test(j) || K.test(j) || L.test(j) || k.test(j)) break;
            if (B.search(this.rules.other.nonSpaceChar) >= E || !j.trim()) y += `
` + B.slice(E);
            else {
              if (T || g.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || X.test(g) || Z.test(g) || k.test(g)) break;
              y += `
` + j;
            }
            T = !j.trim(), S += J + `
`, a = a.substring(J.length + 1), g = B.slice(E);
          }
        }
        f.loose || (m ? f.loose = !0 : this.rules.other.doubleBlankLine.test(S) && (m = !0)), f.items.push({ type: "list_item", raw: S, task: !!this.options.gfm && this.rules.other.listIsTask.test(y), loose: !1, text: y, tokens: [] }), f.raw += S;
      }
      let p = f.items.at(-1);
      if (p) p.raw = p.raw.trimEnd(), p.text = p.text.trimEnd();
      else return;
      f.raw = f.raw.trimEnd();
      for (let b of f.items) if (this.lexer.state.top = !1, b.tokens = this.lexer.blockTokens(b.text, []), !f.loose) {
        let S = b.tokens.filter((g) => g.type === "space"), y = S.length > 0 && S.some((g) => this.rules.other.anyLine.test(g.raw));
        f.loose = y;
      }
      for (let b of f.items) {
        let S = b.tokens[0];
        if (b.task && (S?.type === "text" || S?.type === "paragraph")) {
          b.text = b.text.replace(this.rules.other.listReplaceTask, ""), S.raw = S.raw.replace(this.rules.other.listReplaceTask, ""), S.text = S.text.replace(this.rules.other.listReplaceTask, "");
          for (let g = this.lexer.inlineQueue.length - 1; g >= 0; g--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[g].src)) {
            this.lexer.inlineQueue[g].src = this.lexer.inlineQueue[g].src.replace(this.rules.other.listReplaceTask, "");
            break;
          }
          let y = this.rules.other.listTaskCheckbox.exec(b.raw);
          if (y) {
            let g = { type: "checkbox", raw: y[0] + " ", checked: y[0] !== "[ ]" };
            b.checked = g.checked, f.loose ? b.tokens[0] && ["paragraph", "text"].includes(b.tokens[0].type) && "tokens" in b.tokens[0] && b.tokens[0].tokens ? (b.tokens[0].raw = g.raw + b.tokens[0].raw, b.tokens[0].text = g.raw + b.tokens[0].text, b.tokens[0].tokens.unshift(g)) : b.tokens.unshift({ type: "paragraph", raw: g.raw, text: g.raw, tokens: [g] }) : b.tokens.unshift(g);
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
      let u = uy(s[0]);
      return { type: "html", block: !0, raw: u, pre: s[1] === "pre" || s[1] === "script" || s[1] === "style", text: u };
    }
  }
  def(a) {
    let s = this.rules.block.def.exec(a);
    if (s) {
      let u = Au(s[1]).replace(this.rules.other.multipleSpaceGlobal, " "), o = s[2] ? s[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", f = s[3] ? s[3].substring(1, s[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : s[3];
      return { type: "def", tag: u, raw: Ea(s[0], `
`), href: o, title: f };
    }
  }
  table(a) {
    let s = this.rules.block.table.exec(a);
    if (!s || !this.rules.other.tableDelimiter.test(s[2])) return;
    let u = ry(s[1]), o = s[2].replace(this.rules.other.tableAlignChars, "").split("|"), f = s[3]?.trim() ? s[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], d = { type: "table", raw: Ea(s[0], `
`), header: [], align: [], rows: [] };
    if (u.length === o.length) {
      for (let m of o) this.rules.other.tableAlignRight.test(m) ? d.align.push("right") : this.rules.other.tableAlignCenter.test(m) ? d.align.push("center") : this.rules.other.tableAlignLeft.test(m) ? d.align.push("left") : d.align.push(null);
      for (let m = 0; m < u.length; m++) d.header.push({ text: u[m], tokens: this.lexer.inline(u[m]), header: !0, align: d.align[m] });
      for (let m of f) d.rows.push(ry(m, d.header.length).map((p, b) => ({ text: p, tokens: this.lexer.inline(p), header: !1, align: d.align[b] })));
      return d;
    }
  }
  lheading(a) {
    let s = this.rules.block.lheading.exec(a);
    if (s) {
      let u = s[1].trim();
      return { type: "heading", raw: Ea(s[0], `
`), depth: s[2].charAt(0) === "=" ? 1 : 2, text: u, tokens: this.lexer.inline(u) };
    }
  }
  paragraph(a) {
    let s = this.rules.block.paragraph.exec(a);
    if (s) {
      let u = s[1].charAt(s[1].length - 1) === `
` ? s[1].slice(0, -1) : s[1];
      return { type: "paragraph", raw: s[0], text: u, tokens: this.lexer.inline(u) };
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
      let u = s[0].charAt(0) === "!" ? 2 : 1;
      if (!this.options.pedantic && fy(a, s[1], u, this.rules)) return;
      let o = s[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(o)) {
        if (!this.rules.other.endAngleBracket.test(o)) return;
        let m = Ea(o.slice(0, -1), "\\");
        if ((o.length - m.length) % 2 === 0) return;
      } else {
        let m = Oj(s[2], "()");
        if (m === -2) return;
        if (m > -1) {
          let p = (s[0].indexOf("!") === 0 ? 5 : 4) + s[1].length + m;
          s[2] = s[2].substring(0, m), s[0] = s[0].substring(0, p).trim(), s[3] = "";
        }
      }
      let f = s[2], d = "";
      if (this.options.pedantic) {
        let m = this.rules.other.pedanticHrefTitle.exec(f);
        m && (f = m[1], d = m[3]);
      } else d = s[3] ? s[3].slice(1, -1) : "";
      return f = f.trim(), this.rules.other.startAngleBracket.test(f) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(o) ? f = f.slice(1) : f = f.slice(1, -1)), oy(s, { href: f && f.replace(this.rules.inline.anyPunctuation, "$1"), title: d && d.replace(this.rules.inline.anyPunctuation, "$1") }, s[0], this.lexer, this.rules);
    }
  }
  reflink(a, s) {
    let u;
    if ((u = this.rules.inline.reflink.exec(a)) || (u = this.rules.inline.nolink.exec(a))) {
      let o = u[0].charAt(0) === "!" ? 2 : 1;
      if (!this.options.pedantic && fy(a, u[1], o, this.rules)) return;
      let f = (u[2] || u[1]).replace(this.rules.other.multipleSpaceGlobal, " "), d = s[Au(f)];
      if (!d) {
        let m = u[0].charAt(0);
        return { type: "text", raw: m, text: m };
      }
      return oy(u, d, u[0], this.lexer, this.rules);
    }
  }
  emStrong(a, s, u = "") {
    let o = this.rules.inline.emStrongLDelim.exec(a);
    if (!(!o || !o[1] && !o[2] && !o[3] && !o[4] || o[4] && u.match(this.rules.other.unicodeAlphaNumeric)) && (!(o[1] || o[3]) || !u || this.rules.inline.punctuation.exec(u))) {
      let f = [...o[0]].length - 1, d, m, p = f, b = 0, S = o[0][0], y = u === S, g = S === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (g.lastIndex = 0, s = s.slice(-1 * a.length + f); (o = g.exec(s)) !== null; ) {
        if (d = o[1] || o[2] || o[3] || o[4] || o[5] || o[6], !d) continue;
        if (m = [...d].length, o[3] || o[4]) {
          p += m;
          continue;
        } else if (o[5] || o[6]) {
          if (f % 3 && !((f + m) % 3)) {
            b += m;
            continue;
          }
          if (y) break;
        }
        if (p -= m, p > 0) continue;
        m = Math.min(m, m + p + b);
        let j = [...o[0]][0].length, T = a.slice(0, f + o.index + j + m);
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
      let u = s[2].replace(this.rules.other.newLineCharGlobal, " "), o = this.rules.other.nonSpaceChar.test(u), f = this.rules.other.startingSpaceChar.test(u) && this.rules.other.endingSpaceChar.test(u);
      return o && f && (u = u.substring(1, u.length - 1)), { type: "codespan", raw: s[0], text: u };
    }
  }
  br(a) {
    let s = this.rules.inline.br.exec(a);
    if (s) return { type: "br", raw: s[0] };
  }
  del(a, s, u = "") {
    let o = this.rules.inline.delLDelim.exec(a);
    if (o && (!o[1] || !u || this.rules.inline.punctuation.exec(u))) {
      let f = [...o[0]].length - 1, d, m, p = f, b = this.rules.inline.delRDelim;
      for (b.lastIndex = 0, s = s.slice(-1 * a.length + f); (o = b.exec(s)) !== null; ) {
        if (d = o[1] || o[2] || o[3] || o[4] || o[5] || o[6], !d || (m = [...d].length, m !== f)) continue;
        if (o[3] || o[4]) {
          p += m;
          continue;
        }
        if (p -= m, p > 0) continue;
        m = Math.min(m, m + p);
        let S = [...o[0]][0].length, y = a.slice(0, f + o.index + S + m), g = y.slice(f, -f);
        return { type: "del", raw: y, text: g, tokens: this.lexer.inlineTokens(g) };
      }
    }
  }
  autolink(a) {
    let s = this.rules.inline.autolink.exec(a);
    if (s) {
      let u, o;
      return s[2] === "@" ? (u = s[1], o = "mailto:" + u) : (u = s[1], o = u), { type: "link", raw: s[0], text: u, href: o, autolink: !0, tokens: [{ type: "text", raw: u, text: u }] };
    }
  }
  url(a) {
    let s;
    if (s = this.rules.inline.url.exec(a)) {
      let u, o;
      if (s[2] === "@") u = s[0], o = "mailto:" + u;
      else {
        let f;
        do
          f = s[0], s[0] = this.rules.inline._backpedal.exec(s[0])?.[0] ?? "";
        while (f !== s[0]);
        u = s[0], s[1] === "www." ? o = "http://" + s[0] : o = s[0];
      }
      return { type: "link", raw: s[0], text: u, href: o, autolink: !0, tokens: [{ type: "text", raw: u, text: u }] };
    }
  }
  inlineText(a) {
    let s = this.rules.inline.text.exec(a);
    if (s) {
      let u = this.lexer.state.inRawBlock;
      return { type: "text", raw: s[0], text: s[0], escaped: u };
    }
  }
}, Wn = class qd {
  tokens;
  options;
  state;
  inlineQueue;
  tokenizer;
  constructor(s) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = s || ci, this.options.tokenizer = this.options.tokenizer || new _u(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, linkEmitted: !1, top: !0 };
    let u = { other: It, block: fu.normal, inline: Sc.normal };
    this.options.pedantic ? (u.block = fu.pedantic, u.inline = Sc.pedantic) : this.options.gfm && (u.block = fu.gfm, this.options.breaks ? u.inline = Sc.breaks : u.inline = Sc.gfm), this.tokenizer.rules = u;
  }
  static get rules() {
    return { block: fu, inline: Sc };
  }
  static lex(s, u) {
    return new qd(u).lex(s);
  }
  static lexInline(s, u) {
    return new qd(u).inlineTokens(s);
  }
  lex(s) {
    s = s.replace(It.carriageReturn, `
`), this.blockTokens(s, this.tokens);
    for (let u = 0; u < this.inlineQueue.length; u++) {
      let o = this.inlineQueue[u];
      this.inlineTokens(o.src, o.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(s, u = [], o = !1) {
    this.tokenizer.lexer = this, this.options.pedantic && (s = s.replace(It.tabCharGlobal, "    ").replace(It.spaceLine, ""));
    let f = 1 / 0;
    for (; s; ) {
      if (s.length < f) f = s.length;
      else {
        this.infiniteLoopError(s.charCodeAt(0));
        break;
      }
      let d;
      if (this.options.extensions?.block?.some((p) => (d = p.call({ lexer: this }, s, u)) ? (s = s.substring(d.raw.length), u.push(d), !0) : !1)) continue;
      if (d = this.tokenizer.space(s)) {
        s = s.substring(d.raw.length);
        let p = u.at(-1);
        d.raw.length === 1 && p !== void 0 ? p.raw += `
` : u.push(d);
        continue;
      }
      if (d = this.tokenizer.code(s)) {
        s = s.substring(d.raw.length);
        let p = u.at(-1);
        p?.type === "paragraph" || p?.type === "text" ? (p.raw += (p.raw.endsWith(`
`) ? "" : `
`) + d.raw, p.text += `
` + d.text, this.inlineQueue.at(-1).src = p.text) : u.push(d);
        continue;
      }
      if (d = this.tokenizer.fences(s)) {
        s = s.substring(d.raw.length), u.push(d);
        continue;
      }
      if (d = this.tokenizer.heading(s)) {
        s = s.substring(d.raw.length), u.push(d);
        continue;
      }
      if (d = this.tokenizer.hr(s)) {
        s = s.substring(d.raw.length), u.push(d);
        continue;
      }
      if (d = this.tokenizer.blockquote(s)) {
        s = s.substring(d.raw.length), u.push(d);
        continue;
      }
      if (d = this.tokenizer.list(s)) {
        s = s.substring(d.raw.length), u.push(d);
        continue;
      }
      if (d = this.tokenizer.html(s)) {
        s = s.substring(d.raw.length), u.push(d);
        continue;
      }
      if (d = this.tokenizer.def(s)) {
        s = s.substring(d.raw.length);
        let p = u.at(-1);
        p?.type === "paragraph" || p?.type === "text" ? (p.raw += (p.raw.endsWith(`
`) ? "" : `
`) + d.raw, p.text += `
` + d.raw, this.inlineQueue.at(-1).src = p.text) : this.tokens.links[d.tag] || (this.tokens.links[d.tag] = { href: d.href, title: d.title }, u.push(d));
        continue;
      }
      if (d = this.tokenizer.table(s)) {
        s = s.substring(d.raw.length), u.push(d);
        continue;
      }
      if (d = this.tokenizer.lheading(s)) {
        s = s.substring(d.raw.length), u.push(d);
        continue;
      }
      let m = s;
      if (this.options.extensions?.startBlock) {
        let p = 1 / 0, b = s.slice(1), S;
        this.options.extensions.startBlock.forEach((y) => {
          S = y.call({ lexer: this }, b), typeof S == "number" && S >= 0 && (p = Math.min(p, S));
        }), p < 1 / 0 && p >= 0 && (m = s.substring(0, p + 1));
      }
      if (this.state.top && (d = this.tokenizer.paragraph(m))) {
        let p = u.at(-1);
        o && p?.type === "paragraph" ? (p.raw += (p.raw.endsWith(`
`) ? "" : `
`) + d.raw, p.text += `
` + d.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = p.text) : u.push(d), o = m.length !== s.length, s = s.substring(d.raw.length);
        continue;
      }
      if (d = this.tokenizer.text(s)) {
        s = s.substring(d.raw.length);
        let p = u.at(-1);
        p?.type === "text" ? (p.raw += (p.raw.endsWith(`
`) ? "" : `
`) + d.raw, p.text += `
` + d.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = p.text) : u.push(d);
        continue;
      }
      if (s) {
        this.infiniteLoopError(s.charCodeAt(0));
        break;
      }
    }
    return this.state.top = !0, u;
  }
  inline(s, u = []) {
    return this.inlineQueue.push({ src: s, tokens: u }), u;
  }
  linkInText(s) {
    if (!s.includes("[")) return !1;
    let u = this.tokenizer.rules.inline.link;
    for (let o of s.matchAll(this.tokenizer.rules.inline.blockSkip)) if (u.test(o[0]) && s.charAt(o.index - 1) !== "!") return !0;
    for (let o of s.matchAll(this.tokenizer.rules.inline.reflinkSearch)) {
      let f = o[0], d = f.lastIndexOf("[");
      if (!(f.charAt(0) === "!" || !Object.hasOwn(this.tokens.links, Au(f.slice(d + 1, -1)))) && !(d > 1 && this.linkInText(f.slice(1, d - 1)))) return !0;
    }
    return !1;
  }
  inlineTokens(s, u = []) {
    this.tokenizer.lexer = this;
    let o = s;
    if (this.tokens.links && s.includes("[")) {
      let p = this.tokenizer.rules.inline.reflinkSearch, b = (S) => {
        let y = S.lastIndexOf("[");
        if (!Object.hasOwn(this.tokens.links, Au(S.slice(y + 1, -1)))) return S;
        if (y > 1 && S.charAt(0) !== "!") {
          let g = S.slice(1, y - 1);
          if (this.linkInText(g)) return "[" + g.replace(p, b) + "][" + "a".repeat(S.length - y - 2) + "]";
        }
        return "[" + "a".repeat(S.length - 2) + "]";
      };
      o = o.replace(p, b);
    }
    o = o.replace(this.tokenizer.rules.inline.anyPunctuation, (p) => "+".repeat(p.length)), o = o.replace(this.tokenizer.rules.inline.blockSkip, (p, b, S) => {
      let y = S ? S.length : 0;
      return p.slice(0, y) + "[" + "a".repeat(p.length - y - 2) + "]";
    }), o = this.options.hooks?.emStrongMask?.call({ lexer: this }, o) ?? o;
    let f = !1, d = "", m = 1 / 0;
    for (; s; ) {
      if (s.length < m) m = s.length;
      else {
        this.infiniteLoopError(s.charCodeAt(0));
        break;
      }
      f || (d = ""), f = !1;
      let p;
      if (this.options.extensions?.inline?.some((S) => (p = S.call({ lexer: this }, s, u)) ? (s = s.substring(p.raw.length), u.push(p), !0) : !1)) continue;
      if (p = this.tokenizer.escape(s)) {
        s = s.substring(p.raw.length), u.push(p);
        continue;
      }
      if (p = this.tokenizer.tag(s)) {
        s = s.substring(p.raw.length), u.push(p);
        continue;
      }
      if (p = this.tokenizer.link(s)) {
        s = s.substring(p.raw.length), u.push(p);
        continue;
      }
      if (p = this.tokenizer.reflink(s, this.tokens.links)) {
        s = s.substring(p.raw.length);
        let S = u.at(-1);
        p.type === "text" && S?.type === "text" ? (S.raw += p.raw, S.text += p.text) : u.push(p);
        continue;
      }
      if (p = this.tokenizer.emStrong(s, o, d)) {
        s = s.substring(p.raw.length), u.push(p);
        continue;
      }
      if (p = this.tokenizer.codespan(s)) {
        s = s.substring(p.raw.length), u.push(p);
        continue;
      }
      if (p = this.tokenizer.br(s)) {
        s = s.substring(p.raw.length), u.push(p);
        continue;
      }
      if (p = this.tokenizer.del(s, o, d)) {
        s = s.substring(p.raw.length), u.push(p);
        continue;
      }
      if (p = this.tokenizer.autolink(s)) {
        s = s.substring(p.raw.length), u.push(p);
        continue;
      }
      if (!this.state.inLink && (p = this.tokenizer.url(s))) {
        s = s.substring(p.raw.length), u.push(p);
        continue;
      }
      let b = s;
      if (this.options.extensions?.startInline) {
        let S = 1 / 0, y = s.slice(1), g;
        this.options.extensions.startInline.forEach((j) => {
          g = j.call({ lexer: this }, y), typeof g == "number" && g >= 0 && (S = Math.min(S, g));
        }), S < 1 / 0 && S >= 0 && (b = s.substring(0, S + 1));
      }
      if (p = this.tokenizer.inlineText(b)) {
        s = s.substring(p.raw.length), p.raw.slice(-1) !== "_" && (d = p.raw.slice(-1)), f = !0;
        let S = u.at(-1);
        S?.type === "text" ? (S.raw += p.raw, S.text += p.text) : u.push(p);
        continue;
      }
      if (s) {
        this.infiniteLoopError(s.charCodeAt(0));
        break;
      }
    }
    return u;
  }
  infiniteLoopError(s) {
    let u = "Infinite loop on byte: " + s;
    if (this.options.silent) console.error(u);
    else throw new Error(u);
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
  code({ text: a, lang: s, escaped: u }) {
    let o = (s || "").match(It.notSpaceStart)?.[0], f = a ? a.replace(It.endingNewline, "") + `
` : "";
    return o ? '<pre><code class="language-' + kn(o) + '">' + (u ? f : kn(f, !0)) + `</code></pre>
` : "<pre><code>" + (u ? f : kn(f, !0)) + `</code></pre>
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
    let s = a.ordered, u = a.start, o = "";
    for (let m = 0; m < a.items.length; m++) {
      let p = a.items[m];
      o += this.listitem(p);
    }
    let f = s ? "ol" : "ul", d = s && u !== 1 ? ' start="' + u + '"' : "";
    return "<" + f + d + `>
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
    let s = "", u = "";
    for (let f = 0; f < a.header.length; f++) u += this.tablecell(a.header[f]);
    s += this.tablerow({ text: u });
    let o = "";
    for (let f = 0; f < a.rows.length; f++) {
      let d = a.rows[f];
      u = "";
      for (let m = 0; m < d.length; m++) u += this.tablecell(d[m]);
      o += this.tablerow({ text: u });
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
    let s = this.parser.parseInline(a.tokens), u = a.header ? "th" : "td";
    return (a.align ? `<${u} align="${a.align}">` : `<${u}>`) + s + `</${u}>
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
  link({ href: a, title: s, text: u, tokens: o, autolink: f }) {
    let d = f ? kn(u, !0) : this.parser.parseInline(o), m = cy(a);
    if (m === null) return d;
    a = kn(m, f);
    let p = '<a href="' + a + '"';
    return s && (p += ' title="' + kn(s) + '"'), p += ">" + d + "</a>", p;
  }
  image({ href: a, title: s, text: u, tokens: o }) {
    o && (u = this.parser.parseInline(o, this.parser.textRenderer));
    let f = cy(a);
    if (f === null) return kn(u);
    a = f;
    let d = `<img src="${kn(a)}" alt="${kn(u)}"`;
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
}, el = class Yd {
  options;
  renderer;
  textRenderer;
  constructor(s) {
    this.options = s || ci, this.options.renderer = this.options.renderer || new Cu(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new vh();
  }
  static parse(s, u) {
    return new Yd(u).parse(s);
  }
  static parseInline(s, u) {
    return new Yd(u).parseInline(s);
  }
  parse(s) {
    this.renderer.parser = this;
    let u = "";
    for (let o = 0; o < s.length; o++) {
      let f = s[o];
      if (this.options.extensions?.renderers?.[f.type]) {
        let m = f, p = this.options.extensions.renderers[m.type].call({ parser: this }, m);
        if (p !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "checkbox", "html", "def", "paragraph", "text"].includes(m.type)) {
          u += p || "";
          continue;
        }
      }
      let d = f;
      switch (d.type) {
        case "space": {
          u += this.renderer.space(d);
          break;
        }
        case "hr": {
          u += this.renderer.hr(d);
          break;
        }
        case "heading": {
          u += this.renderer.heading(d);
          break;
        }
        case "code": {
          u += this.renderer.code(d);
          break;
        }
        case "table": {
          u += this.renderer.table(d);
          break;
        }
        case "blockquote": {
          u += this.renderer.blockquote(d);
          break;
        }
        case "list": {
          u += this.renderer.list(d);
          break;
        }
        case "checkbox": {
          u += this.renderer.checkbox(d);
          break;
        }
        case "html": {
          u += this.renderer.html(d);
          break;
        }
        case "def": {
          u += this.renderer.def(d);
          break;
        }
        case "paragraph": {
          u += this.renderer.paragraph(d);
          break;
        }
        case "text": {
          u += this.renderer.text(d);
          break;
        }
        default: {
          let m = 'Token with "' + d.type + '" type was not found.';
          if (this.options.silent) return console.error(m), "";
          throw new Error(m);
        }
      }
    }
    return u;
  }
  parseInline(s, u = this.renderer) {
    this.renderer.parser = this;
    let o = "";
    for (let f = 0; f < s.length; f++) {
      let d = s[f];
      if (this.options.extensions?.renderers?.[d.type]) {
        let p = this.options.extensions.renderers[d.type].call({ parser: this }, d);
        if (p !== !1 || !["escape", "html", "link", "image", "checkbox", "strong", "em", "codespan", "br", "del", "text"].includes(d.type)) {
          o += p || "";
          continue;
        }
      }
      let m = d;
      switch (m.type) {
        case "escape": {
          o += u.text(m);
          break;
        }
        case "html": {
          o += u.html(m);
          break;
        }
        case "link": {
          o += u.link(m);
          break;
        }
        case "image": {
          o += u.image(m);
          break;
        }
        case "checkbox": {
          o += u.checkbox(m);
          break;
        }
        case "strong": {
          o += u.strong(m);
          break;
        }
        case "em": {
          o += u.em(m);
          break;
        }
        case "codespan": {
          o += u.codespan(m);
          break;
        }
        case "br": {
          o += u.br(m);
          break;
        }
        case "del": {
          o += u.del(m);
          break;
        }
        case "text": {
          o += u.text(m);
          break;
        }
        default: {
          let p = 'Token with "' + m.type + '" type was not found.';
          if (this.options.silent) return console.error(p), "";
          throw new Error(p);
        }
      }
    }
    return o;
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
    return a ? Wn.lex : Wn.lexInline;
  }
  provideParser(a = this.block) {
    return a ? el.parse : el.parseInline;
  }
}, Dj = class {
  defaults = fh();
  options = this.setOptions;
  parse = this.parseMarkdown(!0);
  parseInline = this.parseMarkdown(!1);
  Parser = el;
  Renderer = Cu;
  TextRenderer = vh;
  Lexer = Wn;
  Tokenizer = _u;
  Hooks = Ec;
  constructor(...a) {
    this.use(...a);
  }
  walkTokens(a, s) {
    let u = [];
    for (let o of a) switch (u = u.concat(s.call(this, o)), o.type) {
      case "table": {
        let f = o;
        for (let d of f.header) u = u.concat(this.walkTokens(d.tokens, s));
        for (let d of f.rows) for (let m of d) u = u.concat(this.walkTokens(m.tokens, s));
        break;
      }
      case "list": {
        let f = o;
        u = u.concat(this.walkTokens(f.items, s));
        break;
      }
      default: {
        let f = o;
        this.defaults.extensions?.childTokens?.[f.type] ? this.defaults.extensions.childTokens[f.type].forEach((d) => {
          let m = f[d].flat(1 / 0);
          u = u.concat(this.walkTokens(m, s));
        }) : f.tokens && (u = u.concat(this.walkTokens(f.tokens, s)));
      }
    }
    return u;
  }
  use(...a) {
    let s = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return a.forEach((u) => {
      let o = { ...u };
      if (o.async = this.defaults.async || o.async || !1, u.extensions && (u.extensions.forEach((f) => {
        if (!f.name) throw new Error("extension name required");
        if ("renderer" in f) {
          let d = s.renderers[f.name];
          d ? s.renderers[f.name] = function(...m) {
            let p = f.renderer.apply(this, m);
            return p === !1 && (p = d.apply(this, m)), p;
          } : s.renderers[f.name] = f.renderer;
        }
        if ("tokenizer" in f) {
          if (!f.level || f.level !== "block" && f.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let d = s[f.level];
          d ? d.unshift(f.tokenizer) : s[f.level] = [f.tokenizer], f.start && (f.level === "block" ? s.startBlock ? s.startBlock.push(f.start) : s.startBlock = [f.start] : f.level === "inline" && (s.startInline ? s.startInline.push(f.start) : s.startInline = [f.start]));
        }
        "childTokens" in f && f.childTokens && (s.childTokens[f.name] = f.childTokens);
      }), o.extensions = s), u.renderer) {
        let f = this.defaults.renderer || new Cu(this.defaults);
        for (let d in u.renderer) {
          if (!(d in f)) throw new Error(`renderer '${d}' does not exist`);
          if (["options", "parser"].includes(d)) continue;
          let m = d, p = u.renderer[m], b = f[m];
          f[m] = (...S) => {
            let y = p.apply(f, S);
            return y === !1 && (y = b.apply(f, S)), y || "";
          };
        }
        o.renderer = f;
      }
      if (u.tokenizer) {
        let f = this.defaults.tokenizer || new _u(this.defaults);
        for (let d in u.tokenizer) {
          if (!(d in f)) throw new Error(`tokenizer '${d}' does not exist`);
          if (["options", "rules", "lexer"].includes(d)) continue;
          let m = d, p = u.tokenizer[m], b = f[m];
          f[m] = (...S) => {
            let y = p.apply(f, S);
            return y === !1 && (y = b.apply(f, S)), y;
          };
        }
        o.tokenizer = f;
      }
      if (u.hooks) {
        let f = this.defaults.hooks || new Ec();
        for (let d in u.hooks) {
          if (!(d in f)) throw new Error(`hook '${d}' does not exist`);
          if (["options", "block"].includes(d)) continue;
          let m = d, p = u.hooks[m], b = f[m];
          Ec.passThroughHooks.has(d) ? f[m] = (S) => {
            if (this.defaults.async && Ec.passThroughHooksRespectAsync.has(d)) return (async () => {
              let g = await p.call(f, S);
              return b.call(f, g);
            })();
            let y = p.call(f, S);
            return b.call(f, y);
          } : f[m] = (...S) => {
            if (this.defaults.async) return (async () => {
              let g = await p.apply(f, S);
              return g === !1 && (g = await b.apply(f, S)), g;
            })();
            let y = p.apply(f, S);
            return y === !1 && (y = b.apply(f, S)), y;
          };
        }
        o.hooks = f;
      }
      if (u.walkTokens) {
        let f = this.defaults.walkTokens, d = u.walkTokens;
        o.walkTokens = function(m) {
          let p = [];
          return p.push(d.call(this, m)), f && (p = p.concat(f.call(this, m))), p;
        };
      }
      this.defaults = { ...this.defaults, ...o };
    }), this;
  }
  setOptions(a) {
    return this.defaults = { ...this.defaults, ...a }, this;
  }
  lexer(a, s) {
    return Wn.lex(a, s ?? this.defaults);
  }
  parser(a, s) {
    return el.parse(a, s ?? this.defaults);
  }
  parseMarkdown(a) {
    return (s, u) => {
      let o = { ...u }, f = { ...this.defaults, ...o }, d = this.onError(!!f.silent, !!f.async);
      if (this.defaults.async === !0 && o.async === !1) return d(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof s > "u" || s === null) return d(new Error("marked(): input parameter is undefined or null"));
      if (typeof s != "string") return d(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(s) + ", string expected"));
      if (f.hooks && (f.hooks.options = f, f.hooks.block = a), f.async) return (async () => {
        let m = f.hooks ? await f.hooks.preprocess(s) : s, p = await (f.hooks ? await f.hooks.provideLexer(a) : a ? Wn.lex : Wn.lexInline)(m, f), b = f.hooks ? await f.hooks.processAllTokens(p) : p;
        f.walkTokens && await Promise.all(this.walkTokens(b, f.walkTokens));
        let S = await (f.hooks ? await f.hooks.provideParser(a) : a ? el.parse : el.parseInline)(b, f);
        return f.hooks ? await f.hooks.postprocess(S) : S;
      })().catch(d);
      try {
        f.hooks && (s = f.hooks.preprocess(s));
        let m = (f.hooks ? f.hooks.provideLexer(a) : a ? Wn.lex : Wn.lexInline)(s, f);
        f.hooks && (m = f.hooks.processAllTokens(m)), f.walkTokens && this.walkTokens(m, f.walkTokens);
        let p = (f.hooks ? f.hooks.provideParser(a) : a ? el.parse : el.parseInline)(m, f);
        return f.hooks && (p = f.hooks.postprocess(p)), p;
      } catch (m) {
        return d(m);
      }
    };
  }
  onError(a, s) {
    return (u) => {
      if (u.message += `
Please report this to https://github.com/markedjs/marked.`, a) {
        let o = "<p>An error occurred:</p><pre>" + kn(u.message + "", !0) + "</pre>";
        return s ? Promise.resolve(o) : o;
      }
      if (s) return Promise.reject(u);
      throw u;
    };
  }
}, ai = new Dj();
function et(a, s) {
  return ai.parse(a, s);
}
et.options = et.setOptions = function(a) {
  return ai.setOptions(a), et.defaults = ai.defaults, mv(et.defaults), et;
};
et.getDefaults = fh;
et.defaults = ci;
function zj(...a) {
  return ai.use(...a), et.defaults = ai.defaults, mv(et.defaults), et;
}
et.use = zj;
et.walkTokens = function(a, s) {
  return ai.walkTokens(a, s);
};
et.parseInline = ai.parseInline;
et.Parser = el;
et.parser = el.parse;
et.Renderer = Cu;
et.TextRenderer = vh;
et.Lexer = Wn;
et.lexer = Wn.lex;
et.Tokenizer = _u;
et.Hooks = Ec;
et.parse = et;
et.options;
et.setOptions;
et.walkTokens;
et.parseInline;
el.parse;
Wn.lex;
et.setOptions({ breaks: !0, gfm: !0 });
hv.addHook("afterSanitizeAttributes", (a) => {
  a.tagName === "A" && a.hasAttribute("href") && (a.setAttribute("target", "_blank"), a.setAttribute("rel", "noopener noreferrer"));
});
function bh(a) {
  const s = et.parse(String(a ?? ""), { async: !1 });
  return hv.sanitize(s, { USE_PROFILES: { html: !0 } });
}
var Lj = Object.defineProperty, ps = (a, s) => Lj(a, "name", { value: s, configurable: !0 }), Nv = !!(typeof window < "u" && window.document && window.document.createElement);
function Ta(a, s, { checkForDefaultPrevented: u = !0 } = {}) {
  return /* @__PURE__ */ ps(function(f) {
    if (a?.(f), u === !1 || !f || !f.defaultPrevented)
      return s?.(f);
  }, "handleEvent");
}
ps(Ta, "composeEventHandlers");
function Uj(a) {
  if (!Nv)
    throw new Error("Cannot access window outside of the DOM");
  return a?.ownerDocument?.defaultView ?? window;
}
ps(Uj, "getOwnerWindow");
function Gd(a) {
  if (!Nv)
    throw new Error("Cannot access document outside of the DOM");
  return a?.ownerDocument ?? document;
}
ps(Gd, "getOwnerDocument");
function Ev(a, s = !1) {
  const { activeElement: u } = Gd(a);
  if (!u?.nodeName)
    return null;
  if (Tv(u) && u.contentDocument)
    return Ev(u.contentDocument.body, s);
  if (s) {
    const o = u.getAttribute("aria-activedescendant");
    if (o) {
      const f = Gd(u).getElementById(o);
      if (f)
        return f;
    }
  }
  return u;
}
ps(Ev, "getActiveElement");
function Tv(a) {
  return a.tagName === "IFRAME";
}
ps(Tv, "isFrame");
var Hj = Object.defineProperty, xh = (a, s) => Hj(a, "name", { value: s, configurable: !0 });
function Vd(a, s) {
  if (typeof a == "function")
    return a(s);
  a != null && (a.current = s);
}
xh(Vd, "setRef");
function wv(...a) {
  return (s) => {
    let u = !1;
    const o = a.map((f) => {
      const d = Vd(f, s);
      return !u && typeof d == "function" && (u = !0), d;
    });
    if (u)
      return () => {
        for (let f = 0; f < o.length; f++) {
          const d = o[f];
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
var Bj = Object.defineProperty, qn = (a, s) => Bj(a, "name", { value: s, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function $j(a, s) {
  const u = x.createContext(s);
  u.displayName = a + "Context";
  const o = /* @__PURE__ */ qn((d) => {
    const { children: m, ...p } = d, b = x.useMemo(() => p, Object.values(p));
    return /* @__PURE__ */ c.jsx(u.Provider, { value: b, children: m });
  }, "Provider");
  o.displayName = a + "Provider";
  function f(d, m = {}) {
    const { optional: p = !1 } = m, b = x.useContext(u);
    if (b) return b;
    if (s !== void 0) return s;
    if (!p)
      throw new Error(`\`${d}\` must be used within \`${a}\``);
  }
  return qn(f, "useContext"), [o, f];
}
qn($j, "createContext");
// @__NO_SIDE_EFFECTS__
function kv(a, s = []) {
  let u = [];
  function o(d, m) {
    const p = x.createContext(m);
    p.displayName = d + "Context";
    const b = u.length;
    u = [...u, m];
    const S = /* @__PURE__ */ qn((g) => {
      const { scope: j, children: T, ...E } = g, L = j?.[a]?.[b] || p, k = x.useMemo(() => E, Object.values(E));
      return /* @__PURE__ */ c.jsx(L.Provider, { value: k, children: T });
    }, "Provider");
    S.displayName = d + "Provider";
    function y(g, j, T = {}) {
      const { optional: E = !1 } = T, L = j?.[a]?.[b] || p, k = x.useContext(L);
      if (k) return k;
      if (m !== void 0) return m;
      if (!E)
        throw new Error(`\`${g}\` must be used within \`${d}\``);
    }
    return qn(y, "useContext"), [S, y];
  }
  qn(o, "createContext");
  const f = /* @__PURE__ */ qn(() => {
    const d = u.map((m) => x.createContext(m));
    return /* @__PURE__ */ qn(function(p) {
      const b = p?.[a] || d;
      return x.useMemo(
        () => ({ [`__scope${a}`]: { ...p, [a]: b } }),
        [p, b]
      );
    }, "useScope");
  }, "createScope");
  return f.scopeName = a, [o, Av(f, ...s)];
}
qn(kv, "createContextScope");
function Av(...a) {
  const s = a[0];
  if (a.length === 1) return s;
  const u = /* @__PURE__ */ qn(() => {
    const o = a.map((f) => ({
      useScope: f(),
      scopeName: f.scopeName
    }));
    return /* @__PURE__ */ qn(function(d) {
      const m = o.reduce((p, { useScope: b, scopeName: S }) => {
        const g = b(d)[`__scope${S}`];
        return { ...p, ...g };
      }, {});
      return x.useMemo(() => ({ [`__scope${s.scopeName}`]: m }), [m]);
    }, "useComposedScopes");
  }, "createScope");
  return u.scopeName = s.scopeName, u;
}
qn(Av, "composeContextScopes");
var ii = globalThis?.document ? x.useLayoutEffect : () => {
}, qj = Object.defineProperty, Yj = (a, s) => qj(a, "name", { value: s, configurable: !0 }), Gj = Ac[" useId ".trim().toString()] || (() => {
}), Vj = 0;
function Eu(a) {
  const [s, u] = x.useState(Gj());
  return ii(() => {
    a || u((o) => o ?? String(Vj++));
  }, [a]), a || (s ? `radix-${s}` : "");
}
Yj(Eu, "useId");
var Xj = Object.defineProperty, Zj = (a, s) => Xj(a, "name", { value: s, configurable: !0 }), dy = Ac[" useEffectEvent ".trim().toString()], hy = Ac[" useInsertionEffect ".trim().toString()];
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
  }), x.useMemo(() => ((...u) => s.current?.(...u)), []);
}
Zj(_v, "useEffectEvent");
var Qj = Object.defineProperty, Mc = (a, s) => Qj(a, "name", { value: s, configurable: !0 }), Kj = Ac[" useInsertionEffect ".trim().toString()] || ii;
function Cv({
  prop: a,
  defaultProp: s,
  onChange: u = /* @__PURE__ */ Mc(() => {
  }, "onChange"),
  caller: o
}) {
  const [f, d, m] = Ov({
    defaultProp: s,
    onChange: u
  }), p = a !== void 0, b = p ? a : f, S = x.useCallback(
    (y) => {
      if (p) {
        const g = Rv(y) ? y(a) : y;
        g !== a && m.current?.(g);
      } else
        d(y);
    },
    [p, a, d, m]
  );
  return [b, S];
}
Mc(Cv, "useControllableState");
function Ov({
  defaultProp: a,
  onChange: s
}) {
  const [u, o] = x.useState(a), f = x.useRef(u), d = x.useRef(s);
  return Kj(() => {
    d.current = s;
  }, [s]), x.useEffect(() => {
    f.current !== u && (d.current?.(u), f.current = u);
  }, [u, f]), [u, o, d];
}
Mc(Ov, "useUncontrolledState");
function Rv(a) {
  return typeof a == "function";
}
Mc(Rv, "isFunction");
var my = Symbol("RADIX:SYNC_STATE");
function Ij(a, s, u, o) {
  const { prop: f, defaultProp: d, onChange: m, caller: p } = s, b = f !== void 0, S = _v(m), y = [{ ...u, state: d }];
  o && y.push(o);
  const [g, j] = x.useReducer(
    (k, X) => {
      if (X.type === my)
        return { ...k, state: X.state };
      const Z = a(k, X);
      return b && !Object.is(Z.state, k.state) && S(Z.state), Z;
    },
    ...y
  ), T = g.state, E = x.useRef(T);
  x.useEffect(() => {
    E.current !== T && (E.current = T, b || S(T));
  }, [T, E, b]);
  const L = x.useMemo(() => f !== void 0 ? { ...g, state: f } : g, [g, f]);
  return x.useEffect(() => {
    b && !Object.is(f, g.state) && j({ type: my, state: f });
  }, [f, g.state, b]), [L, j];
}
Mc(Ij, "useControllableStateReducer");
var Mv = Zy(), Fj = Object.defineProperty, nl = (a, s) => Fj(a, "name", { value: s, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function Sh(a) {
  const s = x.forwardRef((u, o) => {
    let { children: f, ...d } = u, m = null, p = !1;
    const b = [];
    Xd(f) && typeof du == "function" && (f = du(f._payload)), x.Children.forEach(f, (j) => {
      if (Uv(j)) {
        p = !0;
        const T = j;
        let E = "child" in T.props ? T.props.child : T.props.children;
        Xd(E) && typeof du == "function" && (E = du(E._payload)), m = Pj(T, E), b.push(m?.props?.children);
      } else
        b.push(j);
    }), m ? m = x.cloneElement(m, void 0, b) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !p && x.Children.count(f) === 1 && x.isValidElement(f) && (m = f)
    );
    const S = m ? Lv(m) : void 0, y = gs(o, S);
    if (!m) {
      if (f || f === 0)
        throw new Error(
          p ? tN(a) : eN(a)
        );
      return f;
    }
    const g = zv(d, m.props ?? {});
    return m.type !== x.Fragment && (g.ref = o ? y : S), x.cloneElement(m, g);
  });
  return s.displayName = `${a}.Slot`, s;
}
nl(Sh, "createSlot");
var Dv = Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Jj(a) {
  const s = /* @__PURE__ */ nl((u) => "child" in u ? u.children(u.child) : u.children, "Slottable");
  return s.displayName = `${a}.Slottable`, s.__radixId = Dv, s;
}
nl(Jj, "createSlottable");
var Pj = /* @__PURE__ */ nl((a, s) => {
  if ("child" in a.props) {
    const u = a.props.child;
    return x.isValidElement(u) ? x.cloneElement(u, void 0, a.props.children(u.props.children)) : null;
  }
  return x.isValidElement(s) ? s : null;
}, "getSlottableElementFromSlottable");
function zv(a, s) {
  const u = { ...s };
  for (const o in s) {
    const f = a[o], d = s[o];
    /^on[A-Z]/.test(o) ? f && d ? u[o] = (...p) => {
      const b = d(...p);
      return f(...p), b;
    } : f && (u[o] = f) : o === "style" ? u[o] = { ...f, ...d } : o === "className" && (u[o] = [f, d].filter(Boolean).join(" "));
  }
  return { ...a, ...u };
}
nl(zv, "mergeProps");
function Lv(a) {
  let s = Object.getOwnPropertyDescriptor(a.props, "ref")?.get, u = s && "isReactWarning" in s && s.isReactWarning;
  return u ? a.ref : (s = Object.getOwnPropertyDescriptor(a, "ref")?.get, u = s && "isReactWarning" in s && s.isReactWarning, u ? a.props.ref : a.props.ref || a.ref);
}
nl(Lv, "getElementRef");
function Uv(a) {
  return x.isValidElement(a) && typeof a.type == "function" && "__radixId" in a.type && a.type.__radixId === Dv;
}
nl(Uv, "isSlottable");
var Wj = Symbol.for("react.lazy");
function Xd(a) {
  return a != null && typeof a == "object" && "$$typeof" in a && a.$$typeof === Wj && "_payload" in a && Hv(a._payload);
}
nl(Xd, "isLazyComponent");
function Hv(a) {
  return typeof a == "object" && a !== null && "then" in a;
}
nl(Hv, "isPromiseLike");
var eN = /* @__PURE__ */ nl((a) => `${a} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), tN = /* @__PURE__ */ nl((a) => `${a} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), du = Ac[" use ".trim().toString()], nN = Object.defineProperty, lN = (a, s) => nN(a, "name", { value: s, configurable: !0 }), aN = [
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
], ys = aN.reduce((a, s) => {
  const u = /* @__PURE__ */ Sh(`Primitive.${s}`), o = x.forwardRef((f, d) => {
    const { asChild: m, ...p } = f, b = m ? u : s;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ c.jsx(b, { ...p, ref: d });
  });
  return o.displayName = `Primitive.${s}`, { ...a, [s]: o };
}, {});
function Bv(a, s) {
  a && Mv.flushSync(() => a.dispatchEvent(s));
}
lN(Bv, "dispatchDiscreteCustomEvent");
var iN = Object.defineProperty, sN = (a, s) => iN(a, "name", { value: s, configurable: !0 });
function ds(a) {
  const s = x.useRef(a);
  return x.useEffect(() => {
    s.current = a;
  }), x.useMemo(() => ((...u) => s.current?.(...u)), []);
}
sN(ds, "useCallbackRef");
var cN = Object.defineProperty, Rt = (a, s) => cN(a, "name", { value: s, configurable: !0 }), Zd = "dismissableLayer.update", rN = "dismissableLayer.pointerDownOutside", uN = "dismissableLayer.focusOutside", py, $v = x.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set(),
  // Outside elements that belong to a layer's own dismiss affordance (eg, a
  // dialog overlay). Pressing them should dismiss the layer regardless of
  // whether or not they stop propagation.
  //
  // See https://github.com/radix-ui/primitives/issues/3346
  dismissableSurfaces: /* @__PURE__ */ new Set()
}), oN = /* @__PURE__ */ x.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Rt(function(s, u) {
    const {
      disableOutsidePointerEvents: o = !1,
      deferPointerDownOutside: f = !1,
      onEscapeKeyDown: d,
      onPointerDownOutside: m,
      onFocusOutside: p,
      onInteractOutside: b,
      onDismiss: S,
      ...y
    } = s, g = x.useContext($v), [j, T] = x.useState(null), E = j?.ownerDocument ?? globalThis?.document, [, L] = x.useState({}), k = gs(u, T), X = Array.from(g.layers), [Z] = [
      ...g.layersWithOutsidePointerEventsDisabled
    ].slice(-1), U = Z ? X.indexOf(Z) : -1, K = j ? X.indexOf(j) : -1, J = g.layersWithOutsidePointerEventsDisabled.size > 0, B = K >= U, V = x.useRef(!1), se = Yv(
      (me) => {
        m?.(me), b?.(me), me.defaultPrevented || S?.();
      },
      {
        ownerDocument: E,
        deferPointerDownOutside: f,
        isDeferredPointerDownOutsideRef: V,
        dismissableSurfaces: g.dismissableSurfaces,
        shouldHandlePointerDownOutside: x.useCallback(
          (me) => {
            if (!(me instanceof Node))
              return !1;
            const Ue = [...g.branches].some(
              (Ge) => Ge.contains(me)
            );
            return B && !Ue;
          },
          [g.branches, B]
        )
      }
    ), Ee = Gv((me) => {
      if (f && V.current)
        return;
      const Ue = me.target;
      [...g.branches].some((Re) => Re.contains(Ue)) || (p?.(me), b?.(me), me.defaultPrevented || S?.());
    }, E), ue = j ? K === X.length - 1 : !1, ve = ds((me) => {
      me.key === "Escape" && (d?.(me), !me.defaultPrevented && S && (me.preventDefault(), S()));
    });
    return x.useEffect(() => {
      if (ue)
        return E.addEventListener("keydown", ve, { capture: !0 }), () => E.removeEventListener("keydown", ve, { capture: !0 });
    }, [E, ue, ve]), x.useEffect(() => {
      if (j)
        return o && (g.layersWithOutsidePointerEventsDisabled.size === 0 && (py = E.body.style.pointerEvents, E.body.style.pointerEvents = "none"), g.layersWithOutsidePointerEventsDisabled.add(j)), g.layers.add(j), Qd(), () => {
          o && (g.layersWithOutsidePointerEventsDisabled.delete(j), g.layersWithOutsidePointerEventsDisabled.size === 0 && (E.body.style.pointerEvents = py));
        };
    }, [j, E, o, g]), x.useEffect(() => () => {
      j && (g.layers.delete(j), g.layersWithOutsidePointerEventsDisabled.delete(j), Qd());
    }, [j, g]), x.useEffect(() => {
      const me = /* @__PURE__ */ Rt(() => L({}), "handleUpdate");
      return document.addEventListener(Zd, me), () => document.removeEventListener(Zd, me);
    }, []), /* @__PURE__ */ c.jsx(
      ys.div,
      {
        ...y,
        ref: k,
        style: {
          pointerEvents: J ? B ? "auto" : "none" : void 0,
          ...s.style
        },
        onFocusCapture: Ta(s.onFocusCapture, Ee.onFocusCapture),
        onBlurCapture: Ta(s.onBlurCapture, Ee.onBlurCapture),
        onPointerDownCapture: Ta(
          s.onPointerDownCapture,
          se.onPointerDownCapture
        )
      }
    );
  }, "DismissableLayer")
);
function qv() {
  const a = x.useContext($v), [s, u] = x.useState(null);
  return x.useEffect(() => {
    if (s)
      return a.dismissableSurfaces.add(s), () => {
        a.dismissableSurfaces.delete(s);
      };
  }, [s, a.dismissableSurfaces]), u;
}
Rt(qv, "useDismissableLayerSurface");
var fN = /* @__PURE__ */ Rt(() => !0, "IS_TRUE");
function Yv(a, s) {
  const {
    ownerDocument: u = globalThis?.document,
    deferPointerDownOutside: o = !1,
    isDeferredPointerDownOutsideRef: f,
    dismissableSurfaces: d,
    shouldHandlePointerDownOutside: m = fN
  } = s, p = ds(a), b = x.useRef(!1), S = x.useRef(!1), y = x.useRef(/* @__PURE__ */ new Map()), g = x.useRef(() => {
  });
  return x.useEffect(() => {
    function j() {
      S.current = !1, f.current = !1, y.current.clear();
    }
    Rt(j, "resetOutsideInteraction");
    function T() {
      return Array.from(y.current.values()).some(Boolean);
    }
    Rt(T, "isOutsideInteractionIntercepted");
    function E(U) {
      if (!S.current)
        return;
      const K = U.target;
      K instanceof Node && [...d].some((B) => B.contains(K)) || y.current.set(U.type, !0), U.type === "click" && window.setTimeout(() => {
        S.current && g.current();
      }, 0);
    }
    Rt(E, "handleInteractionCapture");
    function L(U) {
      S.current && y.current.set(U.type, !1);
    }
    Rt(L, "handleInteractionBubble");
    const k = /* @__PURE__ */ Rt((U) => {
      if (U.target && !b.current) {
        let K = function() {
          u.removeEventListener("click", g.current);
          const B = T();
          j(), B || jh(
            rN,
            p,
            J,
            { discrete: !0 }
          );
        };
        if (Rt(K, "handleAndDispatchPointerDownOutsideEvent"), !m(U.target)) {
          u.removeEventListener("click", g.current), j(), b.current = !1;
          return;
        }
        const J = { originalEvent: U };
        S.current = !0, f.current = o && U.button === 0, y.current.clear(), !o || U.button !== 0 ? K() : (u.removeEventListener("click", g.current), g.current = K, u.addEventListener("click", g.current, { once: !0 }));
      } else
        u.removeEventListener("click", g.current), j();
      b.current = !1;
    }, "handlePointerDown"), X = [
      "pointerup",
      "mousedown",
      "mouseup",
      "touchstart",
      "touchend",
      "click"
    ];
    for (const U of X)
      u.addEventListener(U, E, !0), u.addEventListener(U, L);
    const Z = window.setTimeout(() => {
      u.addEventListener("pointerdown", k);
    }, 0);
    return () => {
      window.clearTimeout(Z), u.removeEventListener("pointerdown", k), u.removeEventListener("click", g.current);
      for (const U of X)
        u.removeEventListener(U, E, !0), u.removeEventListener(U, L);
    };
  }, [
    u,
    p,
    o,
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
  const u = ds(a), o = x.useRef(!1);
  return x.useEffect(() => {
    const f = /* @__PURE__ */ Rt((d) => {
      d.target && !o.current && jh(uN, u, { originalEvent: d }, {
        discrete: !1
      });
    }, "handleFocus");
    return s.addEventListener("focusin", f), () => s.removeEventListener("focusin", f);
  }, [s, u]), {
    onFocusCapture: /* @__PURE__ */ Rt(() => o.current = !0, "onFocusCapture"),
    onBlurCapture: /* @__PURE__ */ Rt(() => o.current = !1, "onBlurCapture")
  };
}
Rt(Gv, "useFocusOutside");
function Qd() {
  const a = new CustomEvent(Zd);
  document.dispatchEvent(a);
}
Rt(Qd, "dispatchUpdate");
function jh(a, s, u, { discrete: o }) {
  const f = u.originalEvent.target, d = new CustomEvent(a, { bubbles: !1, cancelable: !0, detail: u });
  s && f.addEventListener(a, s, { once: !0 }), o ? Bv(f, d) : f.dispatchEvent(d);
}
Rt(jh, "handleAndDispatchCustomEvent");
var dN = Object.defineProperty, nn = (a, s) => dN(a, "name", { value: s, configurable: !0 }), wd = "focusScope.autoFocusOnMount", kd = "focusScope.autoFocusOnUnmount", gy = { bubbles: !1, cancelable: !0 }, hN = /* @__PURE__ */ x.forwardRef(
  /* @__PURE__ */ nn(function(s, u) {
    const {
      loop: o = !1,
      trapped: f = !1,
      onMountAutoFocus: d,
      onUnmountAutoFocus: m,
      ...p
    } = s, [b, S] = x.useState(null), y = ds(d), g = ds(m), j = x.useRef(null), T = gs(u, S), E = x.useRef({
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
        let k = function(K) {
          if (E.paused || !b) return;
          const J = K.target;
          b.contains(J) ? j.current = J : ql(j.current, { select: !0 });
        }, X = function(K) {
          if (E.paused || !b) return;
          const J = K.relatedTarget;
          J !== null && (b.contains(J) || ql(j.current, { select: !0 }));
        }, Z = function(K) {
          if (document.activeElement === document.body)
            for (const B of K)
              B.removedNodes.length > 0 && ql(b);
        };
        nn(k, "handleFocusIn"), nn(X, "handleFocusOut"), nn(Z, "handleMutations"), document.addEventListener("focusin", k), document.addEventListener("focusout", X);
        const U = new MutationObserver(Z);
        return b && U.observe(b, { childList: !0, subtree: !0 }), () => {
          document.removeEventListener("focusin", k), document.removeEventListener("focusout", X), U.disconnect();
        };
      }
    }, [f, b, E.paused]), x.useEffect(() => {
      if (b) {
        yy.add(E);
        const k = document.activeElement;
        if (!b.contains(k)) {
          const Z = new CustomEvent(wd, gy);
          b.addEventListener(wd, y), b.dispatchEvent(Z), Z.defaultPrevented || (Vv(Iv(Nh(b)), { select: !0 }), document.activeElement === k && ql(b));
        }
        return () => {
          b.removeEventListener(wd, y), setTimeout(() => {
            const Z = new CustomEvent(kd, gy);
            b.addEventListener(kd, g), b.dispatchEvent(Z), Z.defaultPrevented || ql(k ?? document.body, { select: !0 }), b.removeEventListener(kd, g), yy.remove(E);
          }, 0);
        };
      }
    }, [b, y, g, E]);
    const L = x.useCallback(
      (k) => {
        if (!o && !f || E.paused) return;
        const X = k.key === "Tab" && !k.altKey && !k.ctrlKey && !k.metaKey, Z = document.activeElement;
        if (X && Z) {
          const U = k.currentTarget, [K, J] = Xv(U);
          K && J ? !k.shiftKey && Z === J ? (k.preventDefault(), o && ql(K, { select: !0 })) : k.shiftKey && Z === K && (k.preventDefault(), o && ql(J, { select: !0 })) : Z === U && k.preventDefault();
        }
      },
      [o, f, E.paused]
    );
    return /* @__PURE__ */ c.jsx(ys.div, { tabIndex: -1, ...p, ref: T, onKeyDown: L });
  }, "FocusScope")
);
function Vv(a, { select: s = !1 } = {}) {
  const u = document.activeElement;
  for (const o of a)
    if (ql(o, { select: s }), document.activeElement !== u) return;
}
nn(Vv, "focusFirst");
function Xv(a) {
  const s = Nh(a), u = Kd(s, a), o = Kd(s.reverse(), a);
  return [u, o];
}
nn(Xv, "getTabbableEdges");
function Nh(a) {
  const s = [], u = document.createTreeWalker(a, NodeFilter.SHOW_ELEMENT, {
    acceptNode: /* @__PURE__ */ nn((o) => {
      const f = o.tagName === "INPUT" && o.type === "hidden";
      return o.disabled || o.hidden || f ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }, "acceptNode")
  });
  for (; u.nextNode(); ) s.push(u.currentNode);
  return s;
}
nn(Nh, "getTabbableCandidates");
function Kd(a, s) {
  const u = typeof s.checkVisibility == "function" && s.checkVisibility({ checkVisibilityCSS: !0 });
  for (const o of a)
    if (!(u ? !o.checkVisibility({ checkVisibilityCSS: !0 }) : Zv(o, { upTo: s })))
      return o;
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
function ql(a, { select: s = !1 } = {}) {
  if (a && a.focus) {
    const u = document.activeElement;
    a.focus({ preventScroll: !0 }), a !== u && Qv(a) && s && a.select();
  }
}
nn(ql, "focus");
var yy = Kv();
function Kv() {
  let a = [];
  return {
    add(s) {
      const u = a[0];
      s !== u && u?.pause(), a = Id(a, s), a.unshift(s);
    },
    remove(s) {
      a = Id(a, s), a[0]?.resume();
    }
  };
}
nn(Kv, "createFocusScopesStack");
function Id(a, s) {
  const u = [...a], o = u.indexOf(s);
  return o !== -1 && u.splice(o, 1), u;
}
nn(Id, "arrayRemove");
function Iv(a) {
  return a.filter((s) => s.tagName !== "A");
}
nn(Iv, "removeLinks");
var mN = Object.defineProperty, pN = (a, s) => mN(a, "name", { value: s, configurable: !0 }), gN = /* @__PURE__ */ x.forwardRef(
  /* @__PURE__ */ pN(function(s, u) {
    const { container: o, ...f } = s, [d, m] = x.useState(!1);
    ii(() => m(!0), []);
    const p = o || d && globalThis?.document?.body;
    return p ? Mv.createPortal(/* @__PURE__ */ c.jsx(ys.div, { ...f, ref: u }), p) : null;
  }, "Portal")
), yN = Object.defineProperty, Gl = (a, s) => yN(a, "name", { value: s, configurable: !0 });
function Fv(a, s) {
  return x.useReducer((u, o) => s[u][o] ?? u, a);
}
Gl(Fv, "useStateMachine");
var Eh = /* @__PURE__ */ Gl((a) => {
  const { present: s, children: u } = a, o = Jv(s), f = typeof u == "function" ? u({ present: o.isPresent }) : x.Children.only(u), d = Pv(o.ref, Wv(f));
  return typeof u == "function" || o.isPresent ? x.cloneElement(f, { ref: d }) : null;
}, "Presence");
function Jv(a) {
  const [s, u] = x.useState(), o = x.useRef(null), f = x.useRef(a), d = x.useRef("none"), m = x.useRef(void 0), p = a ? "mounted" : "unmounted", [b, S] = Fv(p, {
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
    b === "mounted" ? (d.current = m.current ?? ss(o.current), m.current = void 0) : d.current = "none";
  }, [b]), ii(() => {
    const y = o.current, g = f.current;
    if (g !== a) {
      const T = d.current, E = ss(y);
      a ? (m.current = E, S("MOUNT")) : E === "none" || y?.display === "none" ? S("UNMOUNT") : S(g && T !== E ? "ANIMATION_OUT" : "UNMOUNT"), f.current = a;
    }
  }, [a, S]), ii(() => {
    if (s) {
      let y;
      const g = s.ownerDocument.defaultView ?? window, j = /* @__PURE__ */ Gl((E) => {
        const k = ss(o.current).includes(CSS.escape(E.animationName));
        if (E.target === s && k && (S("ANIMATION_END"), !f.current)) {
          const X = s.style.animationFillMode;
          s.style.animationFillMode = "forwards", y = g.setTimeout(() => {
            s.style.animationFillMode === "forwards" && (s.style.animationFillMode = X);
          });
        }
      }, "handleAnimationEnd"), T = /* @__PURE__ */ Gl((E) => {
        E.target === s && (d.current = ss(o.current));
      }, "handleAnimationStart");
      return s.addEventListener("animationstart", T), s.addEventListener("animationcancel", j), s.addEventListener("animationend", j), () => {
        g.clearTimeout(y), s.removeEventListener("animationstart", T), s.removeEventListener("animationcancel", j), s.removeEventListener("animationend", j);
      };
    } else
      S("ANIMATION_END");
  }, [s, S]), {
    isPresent: ["mounted", "unmountSuspended"].includes(b),
    ref: x.useCallback((y) => {
      if (y) {
        const g = getComputedStyle(y);
        o.current = g, m.current = ss(g);
      } else
        o.current = null;
      u(y);
    }, [])
  };
}
Gl(Jv, "usePresence");
function Fd(a, s) {
  if (typeof a == "function")
    return a(s);
  a != null && (a.current = s);
}
Gl(Fd, "setRef");
function Pv(...a) {
  const s = x.useRef(a);
  return s.current = a, x.useCallback((u) => {
    const o = s.current;
    let f = !1;
    const d = o.map((m) => {
      const p = Fd(m, u);
      return !f && typeof p == "function" && (f = !0), p;
    });
    if (f)
      return () => {
        for (let m = 0; m < d.length; m++) {
          const p = d[m];
          typeof p == "function" ? p() : Fd(o[m], null);
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
  let s = Object.getOwnPropertyDescriptor(a.props, "ref")?.get, u = s && "isReactWarning" in s && s.isReactWarning;
  return u ? a.ref : (s = Object.getOwnPropertyDescriptor(a, "ref")?.get, u = s && "isReactWarning" in s && s.isReactWarning, u ? a.props.ref : a.props.ref || a.ref);
}
Gl(Wv, "getElementRef");
var vN = Object.defineProperty, Th = (a, s) => vN(a, "name", { value: s, configurable: !0 }), hu = 0, Wi = null;
function bN(a) {
  return wh(), a.children;
}
Th(bN, "FocusGuards");
function wh() {
  x.useEffect(() => {
    Wi || (Wi = { start: Jd(), end: Jd() });
    const { start: a, end: s } = Wi;
    return document.body.firstElementChild !== a && document.body.insertAdjacentElement("afterbegin", a), document.body.lastElementChild !== s && document.body.insertAdjacentElement("beforeend", s), hu++, () => {
      hu === 1 && (Wi?.start.remove(), Wi?.end.remove(), Wi = null), hu = Math.max(0, hu - 1);
    };
  }, []);
}
Th(wh, "useFocusGuards");
function Jd() {
  const a = document.createElement("span");
  return a.setAttribute("data-radix-focus-guard", ""), a.tabIndex = 0, a.style.outline = "none", a.style.opacity = "0", a.style.position = "fixed", a.style.pointerEvents = "none", a;
}
Th(Jd, "createFocusGuard");
var xl = function() {
  return xl = Object.assign || function(s) {
    for (var u, o = 1, f = arguments.length; o < f; o++) {
      u = arguments[o];
      for (var d in u) Object.prototype.hasOwnProperty.call(u, d) && (s[d] = u[d]);
    }
    return s;
  }, xl.apply(this, arguments);
};
function e1(a, s) {
  var u = {};
  for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && s.indexOf(o) < 0 && (u[o] = a[o]);
  if (a != null && typeof Object.getOwnPropertySymbols == "function")
    for (var f = 0, o = Object.getOwnPropertySymbols(a); f < o.length; f++)
      s.indexOf(o[f]) < 0 && Object.prototype.propertyIsEnumerable.call(a, o[f]) && (u[o[f]] = a[o[f]]);
  return u;
}
function xN(a, s, u) {
  if (u || arguments.length === 2) for (var o = 0, f = s.length, d; o < f; o++)
    (d || !(o in s)) && (d || (d = Array.prototype.slice.call(s, 0, o)), d[o] = s[o]);
  return a.concat(d || Array.prototype.slice.call(s));
}
var Tu = "right-scroll-bar-position", wu = "width-before-scroll-bar", SN = "with-scroll-bars-hidden", jN = "--removed-body-scroll-bar-size";
function Ad(a, s) {
  return typeof a == "function" ? a(s) : a && (a.current = s), a;
}
function NN(a, s) {
  var u = x.useState(function() {
    return {
      // value
      value: a,
      // last callback
      callback: s,
      // "memoized" public interface
      facade: {
        get current() {
          return u.value;
        },
        set current(o) {
          var f = u.value;
          f !== o && (u.value = o, u.callback(o, f));
        }
      }
    };
  })[0];
  return u.callback = s, u.facade;
}
var EN = typeof window < "u" ? x.useLayoutEffect : x.useEffect, vy = /* @__PURE__ */ new WeakMap();
function TN(a, s) {
  var u = NN(null, function(o) {
    return a.forEach(function(f) {
      return Ad(f, o);
    });
  });
  return EN(function() {
    var o = vy.get(u);
    if (o) {
      var f = new Set(o), d = new Set(a), m = u.current;
      f.forEach(function(p) {
        d.has(p) || Ad(p, null);
      }), d.forEach(function(p) {
        f.has(p) || Ad(p, m);
      });
    }
    vy.set(u, a);
  }, [a]), u;
}
function wN(a) {
  return a;
}
function kN(a, s) {
  s === void 0 && (s = wN);
  var u = [], o = !1, f = {
    read: function() {
      if (o)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return u.length ? u[u.length - 1] : a;
    },
    useMedium: function(d) {
      var m = s(d, o);
      return u.push(m), function() {
        u = u.filter(function(p) {
          return p !== m;
        });
      };
    },
    assignSyncMedium: function(d) {
      for (o = !0; u.length; ) {
        var m = u;
        u = [], m.forEach(d);
      }
      u = {
        push: function(p) {
          return d(p);
        },
        filter: function() {
          return u;
        }
      };
    },
    assignMedium: function(d) {
      o = !0;
      var m = [];
      if (u.length) {
        var p = u;
        u = [], p.forEach(d), m = u;
      }
      var b = function() {
        var y = m;
        m = [], y.forEach(d);
      }, S = function() {
        return Promise.resolve().then(b);
      };
      S(), u = {
        push: function(y) {
          m.push(y), S();
        },
        filter: function(y) {
          return m = m.filter(y), u;
        }
      };
    }
  };
  return f;
}
function AN(a) {
  a === void 0 && (a = {});
  var s = kN(null);
  return s.options = xl({ async: !0, ssr: !1 }, a), s;
}
var t1 = function(a) {
  var s = a.sideCar, u = e1(a, ["sideCar"]);
  if (!s)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var o = s.read();
  if (!o)
    throw new Error("Sidecar medium not found");
  return x.createElement(o, xl({}, u));
};
t1.isSideCarExport = !0;
function _N(a, s) {
  return a.useMedium(s), t1;
}
var n1 = AN(), _d = function() {
}, Ou = x.forwardRef(function(a, s) {
  var u = x.useRef(null), o = x.useState({
    onScrollCapture: _d,
    onWheelCapture: _d,
    onTouchMoveCapture: _d
  }), f = o[0], d = o[1], m = a.forwardProps, p = a.children, b = a.className, S = a.removeScrollBar, y = a.enabled, g = a.shards, j = a.sideCar, T = a.noRelative, E = a.noIsolation, L = a.inert, k = a.allowPinchZoom, X = a.as, Z = X === void 0 ? "div" : X, U = a.gapMode, K = e1(a, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), J = j, B = TN([u, s]), V = xl(xl({}, K), f);
  return x.createElement(
    x.Fragment,
    null,
    y && x.createElement(J, { sideCar: n1, removeScrollBar: S, shards: g, noRelative: T, noIsolation: E, inert: L, setCallbacks: d, allowPinchZoom: !!k, lockRef: u, gapMode: U }),
    m ? x.cloneElement(x.Children.only(p), xl(xl({}, V), { ref: B })) : x.createElement(Z, xl({}, V, { className: b, ref: B }), p)
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
var CN = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function ON() {
  if (!document)
    return null;
  var a = document.createElement("style");
  a.type = "text/css";
  var s = CN();
  return s && a.setAttribute("nonce", s), a;
}
function RN(a, s) {
  a.styleSheet ? a.styleSheet.cssText = s : a.appendChild(document.createTextNode(s));
}
function MN(a) {
  var s = document.head || document.getElementsByTagName("head")[0];
  s.appendChild(a);
}
var DN = function() {
  var a = 0, s = null;
  return {
    add: function(u) {
      a == 0 && (s = ON()) && (RN(s, u), MN(s)), a++;
    },
    remove: function() {
      a--, !a && s && (s.parentNode && s.parentNode.removeChild(s), s = null);
    }
  };
}, zN = function() {
  var a = DN();
  return function(s, u) {
    x.useEffect(function() {
      return a.add(s), function() {
        a.remove();
      };
    }, [s && u]);
  };
}, l1 = function() {
  var a = zN(), s = function(u) {
    var o = u.styles, f = u.dynamic;
    return a(o, f), null;
  };
  return s;
}, LN = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Cd = function(a) {
  return parseInt(a || "", 10) || 0;
}, UN = function(a) {
  var s = window.getComputedStyle(document.body), u = s[a === "padding" ? "paddingLeft" : "marginLeft"], o = s[a === "padding" ? "paddingTop" : "marginTop"], f = s[a === "padding" ? "paddingRight" : "marginRight"];
  return [Cd(u), Cd(o), Cd(f)];
}, HN = function(a) {
  if (a === void 0 && (a = "margin"), typeof window > "u")
    return LN;
  var s = UN(a), u = document.documentElement.clientWidth, o = window.innerWidth;
  return {
    left: s[0],
    top: s[1],
    right: s[2],
    gap: Math.max(0, o - u + s[2] - s[0])
  };
}, BN = l1(), os = "data-scroll-locked", $N = function(a, s, u, o) {
  var f = a.left, d = a.top, m = a.right, p = a.gap;
  return u === void 0 && (u = "margin"), `
  .`.concat(SN, ` {
   overflow: hidden `).concat(o, `;
   padding-right: `).concat(p, "px ").concat(o, `;
  }
  body[`).concat(os, `] {
    overflow: hidden `).concat(o, `;
    overscroll-behavior: contain;
    `).concat([
    s && "position: relative ".concat(o, ";"),
    u === "margin" && `
    padding-left: `.concat(f, `px;
    padding-top: `).concat(d, `px;
    padding-right: `).concat(m, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(p, "px ").concat(o, `;
    `),
    u === "padding" && "padding-right: ".concat(p, "px ").concat(o, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(Tu, ` {
    right: `).concat(p, "px ").concat(o, `;
  }
  
  .`).concat(wu, ` {
    margin-right: `).concat(p, "px ").concat(o, `;
  }
  
  .`).concat(Tu, " .").concat(Tu, ` {
    right: 0 `).concat(o, `;
  }
  
  .`).concat(wu, " .").concat(wu, ` {
    margin-right: 0 `).concat(o, `;
  }
  
  body[`).concat(os, `] {
    `).concat(jN, ": ").concat(p, `px;
  }
`);
}, by = function() {
  var a = parseInt(document.body.getAttribute(os) || "0", 10);
  return isFinite(a) ? a : 0;
}, qN = function() {
  x.useEffect(function() {
    return document.body.setAttribute(os, (by() + 1).toString()), function() {
      var a = by() - 1;
      a <= 0 ? document.body.removeAttribute(os) : document.body.setAttribute(os, a.toString());
    };
  }, []);
}, YN = function(a) {
  var s = a.noRelative, u = a.noImportant, o = a.gapMode, f = o === void 0 ? "margin" : o;
  qN();
  var d = x.useMemo(function() {
    return HN(f);
  }, [f]);
  return x.createElement(BN, { styles: $N(d, !s, f, u ? "" : "!important") });
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
var es = Pd ? { passive: !1 } : !1, GN = function(a) {
  return a.tagName === "TEXTAREA";
}, a1 = function(a, s) {
  if (!(a instanceof Element))
    return !1;
  var u = window.getComputedStyle(a);
  return (
    // not-not-scrollable
    u[s] !== "hidden" && // contains scroll inside self
    !(u.overflowY === u.overflowX && !GN(a) && u[s] === "visible")
  );
}, VN = function(a) {
  return a1(a, "overflowY");
}, XN = function(a) {
  return a1(a, "overflowX");
}, xy = function(a, s) {
  var u = s.ownerDocument, o = s;
  do {
    typeof ShadowRoot < "u" && o instanceof ShadowRoot && (o = o.host);
    var f = i1(a, o);
    if (f) {
      var d = s1(a, o), m = d[1], p = d[2];
      if (m > p)
        return !0;
    }
    o = o.parentNode;
  } while (o && o !== u.body);
  return !1;
}, ZN = function(a) {
  var s = a.scrollTop, u = a.scrollHeight, o = a.clientHeight;
  return [
    s,
    u,
    o
  ];
}, QN = function(a) {
  var s = a.scrollLeft, u = a.scrollWidth, o = a.clientWidth;
  return [
    s,
    u,
    o
  ];
}, i1 = function(a, s) {
  return a === "v" ? VN(s) : XN(s);
}, s1 = function(a, s) {
  return a === "v" ? ZN(s) : QN(s);
}, KN = function(a, s) {
  return a === "h" && s === "rtl" ? -1 : 1;
}, IN = function(a, s, u, o, f) {
  var d = KN(a, window.getComputedStyle(s).direction), m = d * o, p = u.target, b = s.contains(p), S = !1, y = m > 0, g = 0, j = 0;
  do {
    if (!p)
      break;
    var T = s1(a, p), E = T[0], L = T[1], k = T[2], X = L - k - d * E;
    (E || X) && i1(a, p) && (g += X, j += E);
    var Z = p.parentNode;
    p = Z && Z.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? Z.host : Z;
  } while (
    // portaled content
    !b && p !== document.body || // self content
    b && (s.contains(p) || s === p)
  );
  return (y && Math.abs(g) < 1 || !y && Math.abs(j) < 1) && (S = !0), S;
}, pu = function(a) {
  return "changedTouches" in a ? [a.changedTouches[0].clientX, a.changedTouches[0].clientY] : [0, 0];
}, Sy = function(a) {
  return [a.deltaX, a.deltaY];
}, jy = function(a) {
  return a && "current" in a ? a.current : a;
}, FN = function(a, s) {
  return a[0] === s[0] && a[1] === s[1];
}, JN = function(a) {
  return `
  .block-interactivity-`.concat(a, ` {pointer-events: none;}
  .allow-interactivity-`).concat(a, ` {pointer-events: all;}
`);
}, PN = 0, ts = [];
function WN(a) {
  var s = x.useRef([]), u = x.useRef([0, 0]), o = x.useRef(), f = x.useState(PN++)[0], d = x.useState(l1)[0], m = x.useRef(a);
  x.useEffect(function() {
    m.current = a;
  }, [a]), x.useEffect(function() {
    if (a.inert) {
      document.body.classList.add("block-interactivity-".concat(f));
      var L = xN([a.lockRef.current], (a.shards || []).map(jy), !0).filter(Boolean);
      return L.forEach(function(k) {
        return k.classList.add("allow-interactivity-".concat(f));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(f)), L.forEach(function(k) {
          return k.classList.remove("allow-interactivity-".concat(f));
        });
      };
    }
  }, [a.inert, a.lockRef.current, a.shards]);
  var p = x.useCallback(function(L, k) {
    if ("touches" in L && L.touches.length === 2 || L.type === "wheel" && L.ctrlKey)
      return !m.current.allowPinchZoom;
    var X = pu(L), Z = u.current, U = "deltaX" in L ? L.deltaX : Z[0] - X[0], K = "deltaY" in L ? L.deltaY : Z[1] - X[1], J, B = L.target, V = Math.abs(U) > Math.abs(K) ? "h" : "v";
    if ("touches" in L && V === "h" && B.type === "range")
      return !1;
    var se = window.getSelection(), Ee = se && se.anchorNode, ue = Ee ? Ee === B || Ee.contains(B) : !1;
    if (ue)
      return !1;
    var ve = xy(V, B);
    if (!ve)
      return !0;
    if (ve ? J = V : (J = V === "v" ? "h" : "v", ve = xy(V, B)), !ve)
      return !1;
    if (!o.current && "changedTouches" in L && (U || K) && (o.current = J), !J)
      return !0;
    var me = o.current || J;
    return IN(me, k, L, me === "h" ? U : K);
  }, []), b = x.useCallback(function(L) {
    var k = L;
    if (!(!ts.length || ts[ts.length - 1] !== d)) {
      var X = "deltaY" in k ? Sy(k) : pu(k), Z = s.current.filter(function(J) {
        return J.name === k.type && (J.target === k.target || k.target === J.shadowParent) && FN(J.delta, X);
      })[0];
      if (Z && Z.should) {
        k.cancelable && k.preventDefault();
        return;
      }
      if (!Z) {
        var U = (m.current.shards || []).map(jy).filter(Boolean).filter(function(J) {
          return J.contains(k.target);
        }), K = U.length > 0 ? p(k, U[0]) : !m.current.noIsolation;
        K && k.cancelable && k.preventDefault();
      }
    }
  }, []), S = x.useCallback(function(L, k, X, Z) {
    var U = { name: L, delta: k, target: X, should: Z, shadowParent: eE(X) };
    s.current.push(U), setTimeout(function() {
      s.current = s.current.filter(function(K) {
        return K !== U;
      });
    }, 1);
  }, []), y = x.useCallback(function(L) {
    u.current = pu(L), o.current = void 0;
  }, []), g = x.useCallback(function(L) {
    S(L.type, Sy(L), L.target, p(L, a.lockRef.current));
  }, []), j = x.useCallback(function(L) {
    S(L.type, pu(L), L.target, p(L, a.lockRef.current));
  }, []);
  x.useEffect(function() {
    return ts.push(d), a.setCallbacks({
      onScrollCapture: g,
      onWheelCapture: g,
      onTouchMoveCapture: j
    }), document.addEventListener("wheel", b, es), document.addEventListener("touchmove", b, es), document.addEventListener("touchstart", y, es), function() {
      ts = ts.filter(function(L) {
        return L !== d;
      }), document.removeEventListener("wheel", b, es), document.removeEventListener("touchmove", b, es), document.removeEventListener("touchstart", y, es);
    };
  }, []);
  var T = a.removeScrollBar, E = a.inert;
  return x.createElement(
    x.Fragment,
    null,
    E ? x.createElement(d, { styles: JN(f) }) : null,
    T ? x.createElement(YN, { noRelative: a.noRelative, gapMode: a.gapMode }) : null
  );
}
function eE(a) {
  for (var s = null; a !== null; )
    a instanceof ShadowRoot && (s = a.host, a = a.host), a = a.parentNode;
  return s;
}
const tE = _N(n1, WN);
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
  return s.map(function(u) {
    if (a.contains(u))
      return u;
    var o = r1(u);
    return o && a.contains(o) ? o : (console.error("aria-hidden", u, "in not contained inside", a, ". Doing nothing"), null);
  }).filter(function(u) {
    return !!u;
  });
}, aE = function(a, s, u, o) {
  var f = lE(s, Array.isArray(a) ? a : [a]);
  yu[u] || (yu[u] = /* @__PURE__ */ new WeakMap());
  var d = yu[u], m = [], p = /* @__PURE__ */ new Set(), b = new Set(f), S = function(g) {
    !g || p.has(g) || (p.add(g), S(g.parentNode));
  };
  f.forEach(S);
  var y = function(g) {
    !g || b.has(g) || Array.prototype.forEach.call(g.children, function(j) {
      if (p.has(j))
        y(j);
      else
        try {
          var T = j.getAttribute(o), E = T !== null && T !== "false", L = (ns.get(j) || 0) + 1, k = (d.get(j) || 0) + 1;
          ns.set(j, L), d.set(j, k), m.push(j), L === 1 && E && gu.set(j, !0), k === 1 && j.setAttribute(u, "true"), E || j.setAttribute(o, "true");
        } catch (X) {
          console.error("aria-hidden: cannot operate on ", j, X);
        }
    });
  };
  return y(s), p.clear(), Od++, function() {
    m.forEach(function(g) {
      var j = ns.get(g) - 1, T = d.get(g) - 1;
      ns.set(g, j), d.set(g, T), j || (gu.has(g) || g.removeAttribute(o), gu.delete(g)), T || g.removeAttribute(u);
    }), Od--, Od || (ns = /* @__PURE__ */ new WeakMap(), ns = /* @__PURE__ */ new WeakMap(), gu = /* @__PURE__ */ new WeakMap(), yu = {});
  };
}, iE = function(a, s, u) {
  u === void 0 && (u = "data-aria-hidden");
  var o = Array.from(Array.isArray(a) ? a : [a]), f = nE(a);
  return f ? (o.push.apply(o, Array.from(f.querySelectorAll("[aria-live], script"))), aE(o, f, u, "aria-hidden")) : function() {
    return null;
  };
}, sE = Object.defineProperty, ll = (a, s) => sE(a, "name", { value: s, configurable: !0 }), kh = "Dialog", [u1, hw] = /* @__PURE__ */ kv(kh), [cE, Xl] = u1(kh), Ru = /* @__PURE__ */ ll((a) => {
  const {
    __scopeDialog: s,
    children: u,
    open: o,
    defaultOpen: f,
    onOpenChange: d,
    modal: m = !0
  } = a, p = x.useRef(null), b = x.useRef(null), [S, y] = Cv({
    prop: o,
    defaultProp: f ?? !1,
    onChange: d,
    caller: kh
  }), [g, j] = x.useState(0), [T, E] = x.useState(0);
  return /* @__PURE__ */ c.jsx(
    cE,
    {
      scope: s,
      triggerRef: p,
      contentRef: b,
      contentId: Eu(),
      titleId: Eu(),
      descriptionId: Eu(),
      titlePresent: g > 0,
      descriptionPresent: T > 0,
      setTitleCount: j,
      setDescriptionCount: E,
      open: S,
      onOpenChange: y,
      onOpenToggle: x.useCallback(() => y((L) => !L), [y]),
      modal: m,
      children: u
    }
  );
}, "Dialog"), o1 = "DialogPortal", [rE, f1] = u1(o1, {
  forceMount: void 0
}), Mu = /* @__PURE__ */ ll((a) => {
  const { __scopeDialog: s, forceMount: u, children: o, container: f } = a, d = Xl(o1, s);
  return /* @__PURE__ */ c.jsx(rE, { scope: s, forceMount: u, children: x.Children.map(o, (m) => /* @__PURE__ */ c.jsx(Eh, { present: u || d.open, children: /* @__PURE__ */ c.jsx(gN, { asChild: !0, container: f, children: m }) })) });
}, "DialogPortal"), Wd = "DialogOverlay", Du = /* @__PURE__ */ x.forwardRef(
  /* @__PURE__ */ ll(function(s, u) {
    const o = f1(Wd, s.__scopeDialog), { forceMount: f = o.forceMount, ...d } = s, m = Xl(Wd, s.__scopeDialog);
    return m.modal ? /* @__PURE__ */ c.jsx(Eh, { present: f || m.open, children: /* @__PURE__ */ c.jsx(oE, { ...d, ref: u }) }) : null;
  }, "DialogOverlay")
), uE = /* @__PURE__ */ Sh("DialogOverlay.RemoveScroll"), oE = /* @__PURE__ */ x.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ ll(function(s, u) {
    const { __scopeDialog: o, ...f } = s, d = Xl(Wd, o), m = qv(), p = gs(u, m);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ c.jsx(c1, { as: uE, allowPinchZoom: !0, shards: [d.contentRef], children: /* @__PURE__ */ c.jsx(
        ys.div,
        {
          "data-state": Ah(d.open),
          ...f,
          ref: p,
          style: { pointerEvents: "auto", ...f.style }
        }
      ) })
    );
  }, "DialogOverlayImpl")
), kc = "DialogContent", zu = /* @__PURE__ */ x.forwardRef(
  /* @__PURE__ */ ll(function(s, u) {
    const o = f1(kc, s.__scopeDialog), { forceMount: f = o.forceMount, ...d } = s, m = Xl(kc, s.__scopeDialog);
    return /* @__PURE__ */ c.jsx(Eh, { present: f || m.open, children: m.modal ? /* @__PURE__ */ c.jsx(fE, { ...d, ref: u }) : /* @__PURE__ */ c.jsx(dE, { ...d, ref: u }) });
  }, "DialogContent")
), fE = /* @__PURE__ */ x.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ ll(function(s, u) {
    const o = Xl(kc, s.__scopeDialog), f = x.useRef(null), d = gs(u, o.contentRef, f);
    return x.useEffect(() => {
      const m = f.current;
      if (m) return iE(m);
    }, []), /* @__PURE__ */ c.jsx(
      d1,
      {
        ...s,
        ref: d,
        trapFocus: o.open,
        disableOutsidePointerEvents: o.open,
        onCloseAutoFocus: Ta(s.onCloseAutoFocus, (m) => {
          m.preventDefault(), o.triggerRef.current?.focus();
        }),
        onPointerDownOutside: Ta(s.onPointerDownOutside, (m) => {
          const p = m.detail.originalEvent, b = p.button === 0 && p.ctrlKey === !0;
          (p.button === 2 || b) && m.preventDefault();
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
  /* @__PURE__ */ ll(function(s, u) {
    const o = Xl(kc, s.__scopeDialog), f = x.useRef(!1), d = x.useRef(!1);
    return /* @__PURE__ */ c.jsx(
      d1,
      {
        ...s,
        ref: u,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (m) => {
          s.onCloseAutoFocus?.(m), m.defaultPrevented || (f.current || o.triggerRef.current?.focus(), m.preventDefault()), f.current = !1, d.current = !1;
        },
        onInteractOutside: (m) => {
          s.onInteractOutside?.(m), m.defaultPrevented || (f.current = !0, m.detail.originalEvent.type === "pointerdown" && (d.current = !0));
          const p = m.target;
          o.triggerRef.current?.contains(p) && m.preventDefault(), m.detail.originalEvent.type === "focusin" && d.current && m.preventDefault();
        }
      }
    );
  }, "DialogContentNonModal")
), d1 = /* @__PURE__ */ x.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ ll(function(s, u) {
    const { __scopeDialog: o, trapFocus: f, onOpenAutoFocus: d, onCloseAutoFocus: m, ...p } = s, b = Xl(kc, o);
    return wh(), /* @__PURE__ */ c.jsx(c.Fragment, { children: /* @__PURE__ */ c.jsx(
      hN,
      {
        asChild: !0,
        loop: !0,
        trapped: f,
        onMountAutoFocus: d,
        onUnmountAutoFocus: m,
        children: /* @__PURE__ */ c.jsx(
          oN,
          {
            role: "dialog",
            id: b.contentId,
            "aria-describedby": b.descriptionPresent ? b.descriptionId : void 0,
            "aria-labelledby": b.titlePresent ? b.titleId : void 0,
            "data-state": Ah(b.open),
            ...p,
            ref: u,
            deferPointerDownOutside: !0,
            onDismiss: () => b.onOpenChange(!1)
          }
        )
      }
    ) });
  }, "DialogContentImpl")
), hE = "DialogTitle", Lu = /* @__PURE__ */ x.forwardRef(
  /* @__PURE__ */ ll(function(s, u) {
    const { __scopeDialog: o, ...f } = s, d = Xl(hE, o), { setTitleCount: m } = d;
    return ii(() => (m((p) => p + 1), () => m((p) => p - 1)), [m]), /* @__PURE__ */ c.jsx(ys.h2, { id: d.titleId, ...f, ref: u });
  }, "DialogTitle")
), mE = "DialogClose", Uu = /* @__PURE__ */ x.forwardRef(
  /* @__PURE__ */ ll(function(s, u) {
    const { __scopeDialog: o, ...f } = s, d = Xl(mE, o);
    return /* @__PURE__ */ c.jsx(
      ys.button,
      {
        type: "button",
        ...f,
        ref: u,
        onClick: Ta(s.onClick, () => d.onOpenChange(!1))
      }
    );
  }, "DialogClose")
);
function Ah(a) {
  return a ? "open" : "closed";
}
ll(Ah, "getState");
function Hu({ open: a, onOpenChange: s, title: u, subtitle: o, wide: f, children: d, footer: m }) {
  return /* @__PURE__ */ c.jsx(Ru, { open: a, onOpenChange: s, children: /* @__PURE__ */ c.jsxs(Mu, { children: [
    /* @__PURE__ */ c.jsx(Du, { className: "panel-overlay" }),
    /* @__PURE__ */ c.jsxs(
      zu,
      {
        className: `panel${f ? " wide" : ""}`,
        "aria-describedby": void 0,
        onOpenAutoFocus: (p) => p.preventDefault(),
        onEscapeKeyDown: (p) => {
          p.isComposing && p.preventDefault();
        },
        children: [
          /* @__PURE__ */ c.jsxs("header", { className: "panel-head", children: [
            /* @__PURE__ */ c.jsxs("div", { className: "panel-titles", children: [
              /* @__PURE__ */ c.jsx(Lu, { className: "panel-title", children: u }),
              o && /* @__PURE__ */ c.jsx("p", { className: "panel-subtitle", children: o })
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
function pE({ value: a, onChange: s, items: u }) {
  return /* @__PURE__ */ c.jsx("div", { className: "tabs", role: "tablist", children: u.map((o) => /* @__PURE__ */ c.jsx("button", { type: "button", role: "tab", "aria-selected": o.id === a, className: `tab${o.id === a ? " active" : ""}`, onClick: () => s(o.id), children: o.label }, o.id)) });
}
function ti({ label: a, hint: s, children: u }) {
  return /* @__PURE__ */ c.jsxs("label", { className: "field", children: [
    /* @__PURE__ */ c.jsx("span", { className: "field-label", children: a }),
    u,
    s && /* @__PURE__ */ c.jsx("span", { className: "field-hint", children: s })
  ] });
}
const Ny = new URLSearchParams(location.search).get("token") ?? "", ut = (a) => Ny ? `${a}${a.includes("?") ? "&" : "?"}token=${encodeURIComponent(Ny)}` : a;
async function Yn(a, s) {
  const u = await fetch(ut(a), s);
  if (!u.ok) throw new Error(await u.text() || `${u.status}`);
  return u.json();
}
const _n = (a, s) => Yn(a, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(s) });
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
}, jE = (a) => {
  try {
    a === "" ? localStorage.removeItem(eh) : localStorage.setItem(eh, a);
  } catch {
  }
};
function m1() {
  return new Promise((a, s) => {
    const u = indexedDB.open(xE, 1);
    u.onupgradeneeded = () => {
      u.result.createObjectStore("files", { keyPath: "id" });
    }, u.onsuccess = () => a(u.result), u.onerror = () => s(u.error ?? new Error("draft store unavailable"));
  });
}
async function NE(a, s) {
  const u = await m1();
  await new Promise((o, f) => {
    const d = u.transaction("files", a);
    s(d.objectStore("files")), d.oncomplete = () => o(), d.onerror = () => f(d.error ?? new Error("draft store failed")), d.onabort = () => f(d.error ?? new Error("draft store aborted"));
  }), u.close();
}
async function EE() {
  try {
    const a = await m1(), s = await new Promise((u, o) => {
      const f = a.transaction("files").objectStore("files").getAll();
      f.onsuccess = () => u(f.result), f.onerror = () => o(f.error);
    });
    return a.close(), s.filter((u) => u.blob instanceof Blob);
  } catch {
    return [];
  }
}
async function TE(a) {
  try {
    await NE("readwrite", (s) => {
      s.clear();
      for (const u of a) s.put(u);
    });
  } catch {
  }
}
const wE = { png: "image/png", webp: "image/webp", jpg: "image/jpeg", jpeg: "image/jpeg", mp4: "video/mp4", webm: "video/webm" };
function kE({ open: a, onOpenChange: s, tab: u, setTab: o, manifest: f, lang: d, preview: m, setPreview: p, notify: b, onManifestChange: S }) {
  const [y, g] = x.useState(null), j = x.useCallback(() => {
    Yn("/character/config").then(g).catch((T) => b(`Could not load character: ${T.message}`));
  }, [b]);
  return x.useEffect(() => {
    a && j();
  }, [a, f?.characterId, j]), /* @__PURE__ */ c.jsxs(Hu, { open: a, onOpenChange: s, wide: !0, title: "Character", subtitle: y ? y.dir : void 0, children: [
    /* @__PURE__ */ c.jsx(pE, { value: u, onChange: o, items: [{ id: "pick", label: "Choose" }, { id: "art", label: "Artwork" }, { id: "persona", label: "Persona" }] }),
    u === "pick" && /* @__PURE__ */ c.jsx(AE, { manifest: f, notify: b, close: () => s(!1) }),
    u === "art" && y && f && /* @__PURE__ */ c.jsx(_E, { config: y, manifest: f, preview: m, setPreview: p, reload: j, notify: b }),
    u === "persona" && y && /* @__PURE__ */ c.jsx(CE, { config: y, lang: d, setConfig: g, notify: b, onManifestChange: S }, y.id)
  ] });
}
function AE({ manifest: a, notify: s, close: u }) {
  const o = x.useRef(null), f = async (m) => {
    if (u(), m !== a?.characterId)
      try {
        await _n("/character", { id: m });
      } catch (p) {
        s(`Could not switch: ${p.message}`);
      }
  }, d = async (m) => {
    const p = m.name.replace(/\.zip$/i, "").replace(/-pack$/i, "");
    s(`Importing ${m.name}…`);
    try {
      const b = await fetch(ut(`/character/import?id=${encodeURIComponent(p)}`), { method: "POST", headers: { "content-type": "application/zip" }, body: m });
      if (!b.ok) throw new Error(await b.text());
      const { id: S } = await b.json();
      await _n("/character", { id: S }), u();
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
      /* @__PURE__ */ c.jsx("input", { ref: o, type: "file", accept: ".zip,application/zip", hidden: !0, onChange: (m) => {
        const p = m.target.files?.[0];
        m.target.value = "", p && d(p);
      } }),
      /* @__PURE__ */ c.jsxs("button", { type: "button", className: "button", onClick: () => o.current?.click(), children: [
        /* @__PURE__ */ c.jsx(oh, {}),
        "Import pack…"
      ] }),
      /* @__PURE__ */ c.jsxs("a", { className: "button", href: ut("/character/export"), download: `${a?.characterId ?? "character"}.zip`, children: [
        /* @__PURE__ */ c.jsx(N2, {}),
        "Export pack"
      ] })
    ] })
  ] });
}
function _E({ config: a, manifest: s, preview: u, setPreview: o, reload: f, notify: d }) {
  const m = x.useRef(null), p = x.useRef(""), b = async (S, y) => {
    const g = (y.name.split(".").pop() ?? "").toLowerCase(), j = wE[g] ?? y.type;
    if (!j) {
      d(`Unsupported file: ${y.name}`);
      return;
    }
    d(`Uploading ${y.name} as ${S}…`);
    try {
      const T = await fetch(ut(`/character/asset?state=${encodeURIComponent(S)}`), { method: "PUT", headers: { "content-type": j }, body: y });
      if (!T.ok) throw new Error(await T.text());
      d(`Saved ${y.name} as ${S}.`), f();
    } catch (T) {
      d(`Upload failed: ${T.message}`);
    }
  };
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx("div", { className: "row between", children: /* @__PURE__ */ c.jsx(ti, { label: "Preview on stage", children: /* @__PURE__ */ c.jsxs("select", { className: "input", value: u ?? "auto", onChange: (S) => o(S.target.value === "auto" ? null : S.target.value), children: [
      /* @__PURE__ */ c.jsx("option", { value: "auto", children: "Follow the conversation" }),
      yE.map((S) => /* @__PURE__ */ c.jsx("option", { value: S, children: fs[S] }, S))
    ] }) }) }),
    /* @__PURE__ */ c.jsx("div", { className: "g-grid", children: a.assets.map((S) => {
      const y = !!(S.image || S.video), g = y ? { video: S.video && ut(`/character/${encodeURIComponent(S.video)}`), image: S.image && ut(`/character/${encodeURIComponent(S.image)}`) } : { video: s.states[S.state]?.video && ut(s.states[S.state].video), image: s.states[S.state]?.image && ut(s.states[S.state].image) };
      return /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `g-tile${y ? "" : " borrowed"}${g.video || g.image ? "" : " missing"}`,
          onClick: () => {
            s.states[S.state] && o(S.state);
          },
          onDragOver: (j) => {
            j.preventDefault(), j.currentTarget.classList.add("drop");
          },
          onDragLeave: (j) => j.currentTarget.classList.remove("drop"),
          onDrop: (j) => {
            j.preventDefault(), j.currentTarget.classList.remove("drop");
            const T = j.dataTransfer.files[0];
            T && b(S.state, T);
          },
          children: [
            g.video ? /* @__PURE__ */ c.jsx("video", { src: g.video, muted: !0, loop: !0, playsInline: !0, autoPlay: !0 }) : g.image ? /* @__PURE__ */ c.jsx("img", { src: g.image, alt: "" }) : /* @__PURE__ */ c.jsx("div", { className: "g-none" }),
            /* @__PURE__ */ c.jsxs("div", { className: "g-cap", children: [
              /* @__PURE__ */ c.jsx("span", { children: fs[S.state] }),
              /* @__PURE__ */ c.jsx("span", { className: "g-sub", children: y ? [S.video, S.image].filter(Boolean).join(" · ") : S.fallback ? `← ${fs[S.fallback] ?? S.fallback}` : "missing" })
            ] }),
            /* @__PURE__ */ c.jsx("button", { type: "button", className: "icon-button small g-up", title: `Upload a .png or .mp4 for ${S.state}`, onClick: (j) => {
              j.stopPropagation(), p.current = S.state, m.current?.click();
            }, children: /* @__PURE__ */ c.jsx(oh, {}) })
          ]
        },
        S.state
      );
    }) }),
    /* @__PURE__ */ c.jsx("input", { ref: m, type: "file", accept: ".png,.webp,.jpg,.jpeg,.mp4,.webm", hidden: !0, onChange: (S) => {
      const y = S.target.files?.[0];
      S.target.value = "", y && b(p.current, y);
    } }),
    /* @__PURE__ */ c.jsx("p", { className: "field-hint", children: "Click a tile to show that state on stage. Drop a .png or .mp4 onto a tile, or use its upload button, to replace it. Dimmed tiles borrow another state's file." })
  ] });
}
function CE({ config: a, lang: s, setConfig: u, notify: o, onManifestChange: f }) {
  const [d, m] = x.useState(a.name), [p, b] = x.useState(a.persona), [S, y] = x.useState(String(a.playbackRate || 1)), [g, j] = x.useState(!1), T = async (E) => {
    E.preventDefault(), j(!0);
    try {
      const L = await _n("/character/config", { name: d, persona: p, playbackRate: Number(S) || 1 });
      u(L), f({ characterName: L.name, playbackRate: L.playbackRate }), o("Saved. The new persona applies from the next reply.");
    } catch (L) {
      o(`Save failed: ${L.message}`);
    } finally {
      j(!1);
    }
  };
  return /* @__PURE__ */ c.jsxs("form", { className: "form", onSubmit: (E) => {
    T(E);
  }, children: [
    /* @__PURE__ */ c.jsx(ti, { label: "Name", children: /* @__PURE__ */ c.jsx("input", { className: "input", value: d, onChange: (E) => m(E.target.value), spellCheck: !1 }) }),
    /* @__PURE__ */ c.jsx(ti, { label: "Persona", children: /* @__PURE__ */ c.jsx("textarea", { className: "input", rows: 10, value: p, onChange: (E) => b(E.target.value) }) }),
    /* @__PURE__ */ c.jsx(ti, { label: "Artwork playback speed", children: /* @__PURE__ */ c.jsx("input", { className: "input narrow", type: "number", min: "0.25", max: "4", step: "0.05", value: S, onChange: (E) => y(E.target.value) }) }),
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
      /* @__PURE__ */ c.jsx("button", { type: "submit", className: "button primary", disabled: g, children: g ? "Saving…" : "Save" })
    ] })
  ] });
}
function OE({ open: a, onOpenChange: s, entries: u, setEntries: o, notify: f }) {
  const [d, m] = x.useState(""), p = x.useRef(null);
  x.useEffect(() => {
    a && (Yn("/memory").then((y) => o(y.entries)).catch((y) => f(`Could not load memory: ${y.message}`)), window.setTimeout(() => p.current?.focus(), 50));
  }, [a]);
  const b = async (y) => {
    try {
      o((await _n("/memory", { entries: y })).entries);
    } catch (g) {
      f(`Save failed: ${g.message}`);
    }
  }, S = async () => {
    const y = d.trim();
    y !== "" && (m(""), await b([...u, { date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), text: y }]));
  };
  return /* @__PURE__ */ c.jsxs(
    Hu,
    {
      open: a,
      onOpenChange: s,
      title: "Memory",
      subtitle: "Notes about you. Every character shares them, and they survive switching packs.",
      footer: /* @__PURE__ */ c.jsxs("form", { className: "row", onSubmit: (y) => {
        y.preventDefault(), y.nativeEvent.isComposing || S();
      }, children: [
        /* @__PURE__ */ c.jsx("input", { ref: p, className: "input", value: d, onChange: (y) => m(y.target.value), placeholder: "Remember something…", spellCheck: !1 }),
        /* @__PURE__ */ c.jsx("button", { type: "submit", className: "button primary", disabled: d.trim() === "", children: "Add" })
      ] }),
      children: [
        u.length === 0 && /* @__PURE__ */ c.jsx("p", { className: "empty", children: "Nothing remembered yet." }),
        /* @__PURE__ */ c.jsx("ul", { className: "mem-list", children: u.map((y, g) => /* @__PURE__ */ c.jsx(RE, { entry: y, onChange: (j) => {
          b(u.map((T, E) => E === g ? { ...T, text: j } : T));
        }, onDrop: () => {
          b(u.filter((j, T) => T !== g));
        } }, `${y.date}-${g}`)) })
      ]
    }
  );
}
function RE({ entry: a, onChange: s, onDrop: u }) {
  const [o, f] = x.useState(a.text);
  x.useEffect(() => f(a.text), [a.text]);
  const d = () => {
    const m = o.trim();
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
        value: o,
        spellCheck: !1,
        onChange: (m) => f(m.target.value),
        onBlur: d,
        onKeyDown: (m) => {
          m.key === "Enter" && (m.preventDefault(), m.target.blur()), m.key === "Escape" && (m.preventDefault(), f(a.text), m.target.blur());
        }
      }
    ),
    /* @__PURE__ */ c.jsx("button", { type: "button", className: "icon-button small", title: "Forget this", "aria-label": "Forget this", onClick: u, children: /* @__PURE__ */ c.jsx(Sl, {}) })
  ] });
}
function ME({ open: a, onOpenChange: s, lists: u, setLists: o, openId: f, notify: d }) {
  const [m, p] = x.useState(null), [b, S] = x.useState(!1);
  x.useEffect(() => {
    a && Yn("/lists").then((T) => o(T.lists)).catch((T) => d(`Could not load lists: ${T.message}`));
  }, [a]), x.useEffect(() => {
    a && f && (p(f), S(!1));
  }, [a, f]), x.useEffect(() => {
    m !== null && u.some((T) => T.id === m) || p(u[0]?.id ?? null);
  }, [u, m]);
  const y = async (T) => {
    try {
      return o((await _n("/lists", T)).lists), !0;
    } catch (E) {
      return d(`Could not update the list: ${E.message}`), !1;
    }
  }, g = b ? null : u.find((T) => T.id === m) ?? null, j = [...u].sort((T, E) => E.updatedAt.localeCompare(T.updatedAt));
  return /* @__PURE__ */ c.jsx(Ru, { open: a, onOpenChange: s, children: /* @__PURE__ */ c.jsxs(Mu, { children: [
    /* @__PURE__ */ c.jsx(Du, { className: "panel-overlay" }),
    /* @__PURE__ */ c.jsxs(zu, { className: "panel full lists", "aria-describedby": void 0, onOpenAutoFocus: (T) => T.preventDefault(), children: [
      /* @__PURE__ */ c.jsxs("aside", { className: "src-side", children: [
        /* @__PURE__ */ c.jsxs("div", { className: "src-side-head", children: [
          /* @__PURE__ */ c.jsx(Lu, { className: "panel-title", children: "Lists" }),
          /* @__PURE__ */ c.jsx("p", { className: "panel-subtitle", children: "Things worth coming back to." })
        ] }),
        /* @__PURE__ */ c.jsxs("nav", { className: "src-nav", children: [
          j.map((T) => {
            const E = T.items.filter((L) => !L.done).length;
            return /* @__PURE__ */ c.jsxs("button", { type: "button", className: `src-item${T.id === m && !b ? " active" : ""}`, onClick: () => {
              p(T.id), S(!1);
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
        b || u.length === 0 ? /* @__PURE__ */ c.jsx(DE, { onCreate: async (T) => {
          await y({ action: "create", title: T }) && S(!1);
        } }) : g && /* @__PURE__ */ c.jsx(zE, { list: g, act: y, onDeleted: () => p(null) }, g.id)
      ] })
    ] })
  ] }) });
}
function DE({ onCreate: a }) {
  const [s, u] = x.useState(""), o = x.useRef(null);
  x.useEffect(() => {
    window.setTimeout(() => o.current?.focus(), 50);
  }, []);
  const f = async () => {
    const d = s.trim();
    d !== "" && (await a(d), u(""));
  };
  return /* @__PURE__ */ c.jsxs("div", { className: "src-empty", children: [
    /* @__PURE__ */ c.jsx(_c, {}),
    /* @__PURE__ */ c.jsx("p", { children: "Start a list" }),
    /* @__PURE__ */ c.jsx("p", { className: "field-hint", children: "Dramas to watch, gifts to consider, things to pack. She can add to it later." }),
    /* @__PURE__ */ c.jsxs("form", { className: "row new-list", onSubmit: (d) => {
      d.preventDefault(), d.nativeEvent.isComposing || f();
    }, children: [
      /* @__PURE__ */ c.jsx("input", { ref: o, className: "input", value: s, placeholder: "List title", spellCheck: !1, onChange: (d) => u(d.target.value) }),
      /* @__PURE__ */ c.jsx("button", { type: "submit", className: "button primary", disabled: s.trim() === "", children: "Create" })
    ] })
  ] });
}
function zE({ list: a, act: s, onDeleted: u }) {
  const [o, f] = x.useState(""), [d, m] = x.useState(!1), p = a.items.filter((g) => !g.done), b = a.items.filter((g) => g.done), S = async () => {
    const g = o.trim();
    g !== "" && (f(""), await s({ action: "add", list: a.id, text: g }) || f(g));
  }, y = async () => {
    window.confirm(`Delete "${a.title}"? This cannot be undone.`) && await s({ action: "delete", list: a.id }) && u();
  };
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsxs("header", { className: "src-head", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "src-head-text", children: [
        /* @__PURE__ */ c.jsx(LE, { value: a.title, onChange: (g) => {
          s({ action: "rename", list: a.id, title: g });
        } }),
        /* @__PURE__ */ c.jsx(UE, { value: a.description ?? "", placeholder: "Add a description", onChange: (g) => {
          s({ action: "rename", list: a.id, description: g });
        } })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: "src-head-actions", children: /* @__PURE__ */ c.jsx("button", { type: "button", className: "icon-button", title: "Delete list", "aria-label": "Delete list", onClick: () => {
        y();
      }, children: /* @__PURE__ */ c.jsx(iv, {}) }) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "src-body", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "rem-add", children: [
        /* @__PURE__ */ c.jsx("input", { className: "input", value: o, placeholder: "Add an item…", spellCheck: !1, onChange: (g) => f(g.target.value), onKeyDown: (g) => {
          g.key === "Enter" && !g.nativeEvent.isComposing && (g.preventDefault(), S());
        } }),
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "button primary", disabled: o.trim() === "", onClick: () => {
          S();
        }, children: "Add" })
      ] }),
      a.items.length === 0 && /* @__PURE__ */ c.jsx("p", { className: "rem-empty", children: "Nothing here yet." }),
      p.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: "rem-list", children: p.map((g) => /* @__PURE__ */ c.jsx(Ey, { item: g, list: a, act: s }, g.id)) }),
      b.length > 0 && /* @__PURE__ */ c.jsxs("section", { className: "rem-group", children: [
        /* @__PURE__ */ c.jsxs("button", { type: "button", className: "text-button done-toggle", onClick: () => m((g) => !g), children: [
          d ? "Hide" : "Show",
          " ",
          b.length,
          " done"
        ] }),
        d && /* @__PURE__ */ c.jsx("ul", { className: "rem-list", children: b.map((g) => /* @__PURE__ */ c.jsx(Ey, { item: g, list: a, act: s }, g.id)) })
      ] })
    ] })
  ] });
}
function Ey({ item: a, list: s, act: u }) {
  const [o, f] = x.useState(a.text), [d, m] = x.useState(a.note ?? "");
  x.useEffect(() => {
    f(a.text), m(a.note ?? "");
  }, [a.text, a.note]);
  const p = (g) => {
    u({ action: "item", list: s.id, item: a.id, ...g });
  }, b = () => {
    const g = o.trim();
    if (g === "") {
      f(a.text);
      return;
    }
    g !== a.text && p({ text: g });
  }, S = () => {
    const g = d.trim();
    g !== (a.note ?? "") && p({ note: g });
  }, y = (g, j) => (T) => {
    T.key === "Enter" && (T.preventDefault(), T.target.blur()), T.key === "Escape" && (T.preventDefault(), j(), T.target.blur());
  };
  return /* @__PURE__ */ c.jsxs("li", { className: `rem-row list-row${a.done ? " done" : ""}`, children: [
    /* @__PURE__ */ c.jsx("button", { type: "button", className: `rem-check${a.done ? " checked" : ""}`, title: a.done ? "Mark not done" : "Mark done", onClick: () => p({ done: !a.done }), children: /* @__PURE__ */ c.jsx(si, {}) }),
    /* @__PURE__ */ c.jsxs("span", { className: "rem-text", children: [
      /* @__PURE__ */ c.jsx("input", { className: "list-text", value: o, spellCheck: !1, onChange: (g) => f(g.target.value), onBlur: b, onKeyDown: y(b, () => f(a.text)) }),
      /* @__PURE__ */ c.jsx("input", { className: "list-note", value: d, placeholder: "Note", spellCheck: !1, onChange: (g) => m(g.target.value), onBlur: S, onKeyDown: y(S, () => m(a.note ?? "")) })
    ] }),
    /* @__PURE__ */ c.jsx("button", { type: "button", className: "icon-button small list-remove", title: "Remove", "aria-label": "Remove", onClick: () => p({ remove: !0 }), children: /* @__PURE__ */ c.jsx(Sl, {}) })
  ] });
}
function LE({ value: a, onChange: s }) {
  const [u, o] = x.useState(a);
  x.useEffect(() => o(a), [a]);
  const f = () => {
    const d = u.trim();
    if (d === "") {
      o(a);
      return;
    }
    d !== a && s(d);
  };
  return /* @__PURE__ */ c.jsx(
    "input",
    {
      className: "list-title",
      value: u,
      spellCheck: !1,
      onChange: (d) => o(d.target.value),
      onBlur: f,
      onKeyDown: (d) => {
        d.key === "Enter" && (d.preventDefault(), d.target.blur()), d.key === "Escape" && (o(a), d.target.blur());
      }
    }
  );
}
function UE({ value: a, placeholder: s, onChange: u }) {
  const [o, f] = x.useState(a);
  x.useEffect(() => f(a), [a]);
  const d = () => {
    const m = o.trim();
    m !== a && u(m);
  };
  return /* @__PURE__ */ c.jsx(
    "input",
    {
      className: "list-desc",
      value: o,
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
function BE({ open: a, onOpenChange: s, artifacts: u, setArtifacts: o, openId: f, notify: d }) {
  const [m, p] = x.useState(null);
  x.useEffect(() => {
    a && (p(f), Yn("/artifacts").then((j) => o(j.artifacts)).catch((j) => d(`Could not load files: ${j.message}`)));
  }, [a, f]);
  const b = m === null ? void 0 : u.find((j) => j.id === m), S = [...u].reverse(), y = S.filter((j) => j.kind !== "other" && j.exists !== !1), g = S.filter((j) => j.kind === "other" || j.exists === !1);
  return /* @__PURE__ */ c.jsx(
    Hu,
    {
      open: a,
      onOpenChange: s,
      wide: !0,
      title: b ? /* @__PURE__ */ c.jsxs("button", { type: "button", className: "text-button back", onClick: () => p(null), children: [
        /* @__PURE__ */ c.jsx(f2, {}),
        "All files"
      ] }) : "Files",
      subtitle: b ? void 0 : "Every file she wrote for you. The file stays where it is; this is just a way to open it.",
      children: b ? /* @__PURE__ */ c.jsx($E, { artifact: b, onForget: async () => {
        try {
          o((await Yn(`/artifact/${encodeURIComponent(b.id)}`, { method: "DELETE" })).artifacts), p(null);
        } catch (j) {
          d(`Could not remove: ${j.message}`);
        }
      }, notify: d }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        u.length === 0 && /* @__PURE__ */ c.jsx("p", { className: "empty", children: "Nothing written yet." }),
        /* @__PURE__ */ c.jsxs("div", { className: "art-grid", children: [
          y.map((j) => /* @__PURE__ */ c.jsx(Ty, { item: j, onOpen: () => p(j.id) }, j.id)),
          g.length > 0 && /* @__PURE__ */ c.jsx("div", { className: "art-strip", children: g.map((j) => /* @__PURE__ */ c.jsx(Ty, { item: j, compact: !0, onOpen: () => p(j.id) }, j.id)) })
        ] })
      ] })
    }
  );
}
function p1(a, s = !1) {
  return [a.description ? a.name : "", h1(a), a.exists === !1 ? "missing" : typeof a.size == "number" ? Bu(a.size) : "", s ? bE(a.at) : "", s && a.source === "presented" ? "delivered" : ""].filter(Boolean).join(" · ");
}
function Ty({ item: a, compact: s, onOpen: u }) {
  const [o, f] = x.useState(null), d = ut(`/artifact/${encodeURIComponent(a.id)}`), m = a.kind === "markdown" || a.kind === "text";
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
  const p = a.exists === !1 ? k2 : a.kind === "image" ? Tc : Py;
  return /* @__PURE__ */ c.jsxs("div", { role: "button", tabIndex: 0, className: `art-card${s ? " compact" : ""}${a.exists === !1 ? " missing" : ""}`, title: a.path, onClick: u, onKeyDown: (b) => {
    (b.key === "Enter" || b.key === " ") && (b.preventDefault(), u());
  }, children: [
    /* @__PURE__ */ c.jsx("div", { className: "art-thumb", children: !s && a.kind === "image" ? /* @__PURE__ */ c.jsx("img", { src: d, alt: "", loading: "lazy" }) : !s && o !== null ? a.kind === "markdown" ? /* @__PURE__ */ c.jsx("div", { className: "art-thumb-page", dangerouslySetInnerHTML: { __html: bh(o) } }) : /* @__PURE__ */ c.jsx("div", { className: "art-thumb-page", children: /* @__PURE__ */ c.jsx("pre", { children: o }) }) : /* @__PURE__ */ c.jsx(p, { className: "art-icon" }) }),
    /* @__PURE__ */ c.jsxs("div", { className: "art-foot", children: [
      /* @__PURE__ */ c.jsx("p", { className: "art-name", children: a.description ?? a.name }),
      /* @__PURE__ */ c.jsx("p", { className: "art-meta", children: p1(a) })
    ] })
  ] });
}
function $E({ artifact: a, onForget: s, notify: u }) {
  const [o, f] = x.useState(null), [d, m] = x.useState(!1), p = ut(`/artifact/${encodeURIComponent(a.id)}`);
  x.useEffect(() => {
    if (f(null), a.kind === "image" || a.kind === "other") return;
    let y = !0;
    return fetch(p).then(async (g) => {
      if (g.status === 404) throw new Error("The file is no longer where it was.");
      if (!g.ok) throw new Error(await g.text());
      const j = await g.text();
      y && f(a.kind === "markdown" ? { html: bh(j) } : { text: j });
    }).catch((g) => {
      y && f({ error: g.message });
    }), () => {
      y = !1;
    };
  }, [p, a.kind]);
  const b = async () => {
    const y = await fetch(ut(`/artifact/${encodeURIComponent(a.id)}/reveal`), { method: "POST" });
    u(y.ok ? "Shown in Finder." : "The file is no longer where it was.");
  }, S = async () => {
    try {
      await navigator.clipboard.writeText(a.path), m(!0), window.setTimeout(() => m(!1), 1500);
    } catch {
      u(a.path);
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
      a.kind === "image" && /* @__PURE__ */ c.jsx("img", { className: "file-image", src: p, alt: a.name }),
      a.kind === "other" && /* @__PURE__ */ c.jsx("p", { className: "empty", children: "This kind of file cannot be shown here. Use Reveal to find it." }),
      o?.error && /* @__PURE__ */ c.jsx("p", { className: "empty", children: o.error }),
      o?.html !== void 0 && /* @__PURE__ */ c.jsx("div", { className: "prose", dangerouslySetInnerHTML: { __html: o.html } }),
      o?.text !== void 0 && /* @__PURE__ */ c.jsx("pre", { className: "file-pre", children: o.text }),
      o === null && a.kind !== "image" && a.kind !== "other" && /* @__PURE__ */ c.jsx("p", { className: "empty", children: "Loading…" })
    ] })
  ] });
}
const qE = [
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
    /* @__PURE__ */ c.jsx("dl", { className: "help-list", children: qE.map(([a, s]) => /* @__PURE__ */ c.jsxs(x.Fragment, { children: [
      /* @__PURE__ */ c.jsx("dt", { children: /* @__PURE__ */ c.jsx("code", { children: a }) }),
      /* @__PURE__ */ c.jsx("dd", { children: s })
    ] }, a)) }),
    /* @__PURE__ */ c.jsx("h3", { className: "section", children: "Keyboard" }),
    /* @__PURE__ */ c.jsx("dl", { className: "help-list", children: YE.map(([a, s]) => /* @__PURE__ */ c.jsxs(x.Fragment, { children: [
      /* @__PURE__ */ c.jsx("dt", { children: a.map((u) => /* @__PURE__ */ c.jsx("kbd", { children: u }, u)) }),
      /* @__PURE__ */ c.jsx("dd", { children: s })
    ] }, s)) })
  ] });
}
function GE({ open: a, onOpenChange: s }) {
  return /* @__PURE__ */ c.jsx(Hu, { open: a, onOpenChange: s, title: "Help", children: /* @__PURE__ */ c.jsx(g1, {}) });
}
const wy = {
  translation_error: "Could not translate this reply for speech. Replay to retry.",
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
}, tl = (a) => {
  const [s, u] = String(a).split(":");
  return (wy[s] ?? wy.speech_error) + (u ? ` (${u})` : "");
}, VE = { zh: "你好，我是小黑鱼。今天想和我聊些什么呢？", en: "Hello, I am here. What would you like to talk about today?", ja: "こんにちは。今日はどんなお話をしましょうか。" }, jc = { zh: "中文", en: "English", ja: "日本語" };
function XE({ open: a, onOpenChange: s, theme: u, setTheme: o, voiceOn: f, setVoiceOn: d, speechPref: m, setSpeechPref: p, speechLang: b, onNewSession: S, stopVoice: y }) {
  const [g, j] = x.useState("general"), T = [
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
          return /* @__PURE__ */ c.jsxs("button", { type: "button", className: `src-item${g === E.id ? " active" : ""}`, onClick: () => j(E.id), children: [
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
          /* @__PURE__ */ c.jsx("h2", { children: T.find((E) => E.id === g)?.label }),
          /* @__PURE__ */ c.jsx("p", { className: "source-summary", children: T.find((E) => E.id === g)?.hint })
        ] }) }),
        /* @__PURE__ */ c.jsxs("div", { className: "src-body", children: [
          g === "general" && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            /* @__PURE__ */ c.jsxs("div", { className: "settings-group", children: [
              /* @__PURE__ */ c.jsx("h3", { className: "section", children: "Appearance" }),
              /* @__PURE__ */ c.jsx("div", { className: "settings-rows", children: /* @__PURE__ */ c.jsxs("div", { className: "setting", children: [
                /* @__PURE__ */ c.jsxs("span", { children: [
                  /* @__PURE__ */ c.jsx("b", { children: "Theme" }),
                  /* @__PURE__ */ c.jsx("small", { children: "System follows macOS and switches with it." })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: "seg", role: "tablist", children: ["system", "light", "dark"].map((E) => /* @__PURE__ */ c.jsx("button", { type: "button", role: "tab", "aria-selected": u === E, className: u === E ? "active" : "", onClick: () => o(E), children: E === "system" ? "System" : E === "light" ? "Light" : "Dark" }, E)) })
              ] }) })
            ] }),
            a && /* @__PURE__ */ c.jsx(ZE, {}),
            a && /* @__PURE__ */ c.jsx(KE, {}),
            a && /* @__PURE__ */ c.jsx(QE, {}),
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
          g === "voice" && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
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
                  /* @__PURE__ */ c.jsx("span", { className: "control", children: /* @__PURE__ */ c.jsxs("select", { className: "input short", value: m, onChange: (E) => p(E.target.value), children: [
                    /* @__PURE__ */ c.jsx("option", { value: "auto", children: "Follow the browser" }),
                    /* @__PURE__ */ c.jsx("option", { value: "zh", children: "中文" }),
                    /* @__PURE__ */ c.jsx("option", { value: "en", children: "English" }),
                    /* @__PURE__ */ c.jsx("option", { value: "ja", children: "日本語" })
                  ] }) })
                ] })
              ] })
            ] }),
            a && /* @__PURE__ */ c.jsx(IE, { speechLang: b, speechPref: m, setSpeechPref: p, stopVoice: y })
          ] }),
          g === "help" && /* @__PURE__ */ c.jsx(g1, {})
        ] })
      ] })
    ] })
  ] }) });
}
function ZE() {
  const [a, s] = x.useState(null), [u, o] = x.useState(!1), [f, d] = x.useState("");
  x.useEffect(() => {
    let p = !0;
    return Yn("/thinking").then((b) => {
      p && s(b);
    }).catch(() => {
      p && d("Could not load thinking settings. Reopen Settings to retry.");
    }), () => {
      p = !1;
    };
  }, []);
  const m = async (p) => {
    o(!0), d("");
    try {
      s(await _n("/thinking", { effort: p }));
    } catch {
      d("Could not save thinking level. Please retry.");
    } finally {
      o(!1);
    }
  };
  return /* @__PURE__ */ c.jsxs("div", { className: "settings-group", children: [
    /* @__PURE__ */ c.jsx("h3", { className: "section", children: "Thinking" }),
    /* @__PURE__ */ c.jsx("div", { className: "settings-rows", children: /* @__PURE__ */ c.jsxs("label", { className: "setting", children: [
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("b", { children: "Thinking level" }),
        /* @__PURE__ */ c.jsx("small", { children: a ? `${a.model} · Applies from the next model request. Higher levels can take longer.` : "Loading…" })
      ] }),
      a && /* @__PURE__ */ c.jsxs("select", { className: "input", "aria-label": "Thinking level", value: a.selected, disabled: u || a.efforts.length === 0, onChange: (p) => void m(p.target.value), children: [
        /* @__PURE__ */ c.jsxs("option", { value: "default", children: [
          "Model default",
          a.selected === "default" && a.effective ? ` (${a.effective})` : ""
        ] }),
        a.efforts.map((p) => /* @__PURE__ */ c.jsx("option", { value: p.id, children: p.name }, p.id))
      ] })
    ] }) }),
    f && /* @__PURE__ */ c.jsx("p", { role: "alert", children: f })
  ] });
}
function QE() {
  const a = window.__TAURI__, [s, u] = x.useState(null), [o, f] = x.useState(!1), [d, m] = x.useState("");
  if (x.useEffect(() => {
    if (!a) return;
    let b = !0;
    a.core.invoke("get_pet_preferences").then((y) => {
      b && u(y);
    }).catch(() => {
      b && m("Could not load desktop pet settings.");
    });
    const S = a.event.listen("aibo://pet-preferences", ({ payload: y }) => {
      b && u(y);
    });
    return () => {
      b = !1, S.then((y) => y()).catch(console.error);
    };
  }, []), !a) return null;
  const p = async (b) => {
    if (s) {
      f(!0), m("");
      try {
        u(await a.core.invoke("set_pet_preferences", { ...s, ...b }));
      } catch {
        m("Could not save. Please try again.");
      } finally {
        f(!1);
      }
    }
  };
  return /* @__PURE__ */ c.jsxs("div", { className: "settings-group", children: [
    /* @__PURE__ */ c.jsx("h3", { className: "section", children: "Desktop pet" }),
    /* @__PURE__ */ c.jsxs("div", { className: "settings-rows", children: [
      s && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsxs("label", { className: "setting", children: [
          /* @__PURE__ */ c.jsxs("span", { children: [
            /* @__PURE__ */ c.jsx("b", { children: "Keep Xiaoheiyu on the desktop" }),
            /* @__PURE__ */ c.jsx("small", { children: "She stays when you close (⌘W) or hide (⌘H) the window. Quit (⌘Q) exits everything." })
          ] }),
          /* @__PURE__ */ c.jsx("input", { className: "switch", type: "checkbox", checked: s.enabled, disabled: o, onChange: (b) => void p({ enabled: b.target.checked }) })
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: "setting", children: [
          /* @__PURE__ */ c.jsxs("span", { children: [
            /* @__PURE__ */ c.jsx("b", { children: "Also show with the main window" }),
            /* @__PURE__ */ c.jsx("small", { children: "Off keeps her on the desktop only while the main window is tucked away." })
          ] }),
          /* @__PURE__ */ c.jsx("input", { className: "switch", type: "checkbox", checked: s.showWithMain, disabled: o || !s.enabled, onChange: (b) => void p({ showWithMain: b.target.checked }) })
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: "setting", children: [
          /* @__PURE__ */ c.jsxs("span", { children: [
            /* @__PURE__ */ c.jsx("b", { children: "Pet size" }),
            /* @__PURE__ */ c.jsx("small", { children: "Drag her to move. Click a bubble to open the conversation." })
          ] }),
          /* @__PURE__ */ c.jsx("select", { className: "input", "aria-label": "Pet size", value: s.size, disabled: o || !s.enabled, onChange: (b) => void p({ size: Number(b.target.value) }), children: Array.from({ length: 15 }, (b, S) => 120 + S * 10).map((b) => /* @__PURE__ */ c.jsxs("option", { value: b, children: [
            b,
            " px"
          ] }, b)) })
        ] })
      ] }),
      d && /* @__PURE__ */ c.jsx("p", { className: "empty", role: "status", children: d })
    ] })
  ] });
}
function KE() {
  const [a, s] = x.useState(void 0), [u, o] = x.useState(""), [f, d] = x.useState(""), m = x.useCallback(() => {
    Yn("/sources").then((y) => s(y.sources.find((g) => g.id === "computer-use")?.view ?? null)).catch(() => s(null));
  }, []);
  x.useEffect(() => {
    m();
  }, [m]);
  const p = async (y, g) => {
    o(y), d("");
    try {
      const j = await _n(`/sources/computer-use/${y}`, g === void 0 ? {} : { value: g });
      j.message && d(j.message), m();
    } catch (j) {
      d(j.message);
    } finally {
      o("");
    }
  }, b = (y) => a?.stats?.find((g) => g.label === y)?.value ?? "—", S = a?.actions?.find((y) => y.id === "screenshots")?.value ?? !0;
  return /* @__PURE__ */ c.jsxs("div", { className: "settings-group", children: [
    /* @__PURE__ */ c.jsx("h3", { className: "section", children: "Computer Use" }),
    /* @__PURE__ */ c.jsx("div", { className: "settings-rows", children: a === void 0 ? /* @__PURE__ */ c.jsx("p", { className: "empty", children: "Loading…" }) : a === null ? /* @__PURE__ */ c.jsx("p", { className: "empty", children: "Not available: the Computer Use plugin is not mounted in this dsh." }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsxs("label", { className: "setting", children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("b", { children: "Let her use your apps" }),
          /* @__PURE__ */ c.jsx("small", { children: a.summary })
        ] }),
        /* @__PURE__ */ c.jsx("input", { type: "checkbox", className: "switch", checked: a.shared, disabled: u !== "", onChange: (y) => {
          p("enabled", y.target.checked);
        } })
      ] }),
      /* @__PURE__ */ c.jsxs("label", { className: "setting", children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("b", { children: "Attach screenshots" }),
          /* @__PURE__ */ c.jsx("small", { children: "Off sends only the accessibility tree of the window." })
        ] }),
        /* @__PURE__ */ c.jsx("input", { type: "checkbox", className: "switch", checked: S, disabled: u !== "" || !a.shared, onChange: (y) => {
          p("screenshots", y.target.checked);
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
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "button", disabled: u !== "", onClick: () => {
            p("request");
          }, children: "Request" }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "button", disabled: u !== "", onClick: () => {
            p("refresh");
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
function IE({ speechLang: a, speechPref: s, setSpeechPref: u, stopVoice: o }) {
  const [f, d] = x.useState(null), [m, p] = x.useState(a);
  x.useEffect(() => p(a), [a]);
  const [b, S] = x.useState(""), [y, g] = x.useState(""), [j, T] = x.useState(""), [E, L] = x.useState(""), [k, X] = x.useState(!1), [Z, U] = x.useState(null), [K, J] = x.useState(""), [B, V] = x.useState(""), se = x.useRef(null), Ee = x.useRef(null), ue = f?.catalog.find(($) => $.id === b), ve = b === "local" || b === "voicevox" || b === "fish", me = f?.catalog.filter(($) => $.languages.includes(m)) ?? [];
  x.useEffect(() => {
    Yn("/voice/config").then(d).catch(() => V(tl("config_error")));
  }, []), x.useEffect(() => {
    if (!f) return;
    const $ = f.profiles[m];
    S($.provider), g($.model), T($.voice), L(""), X(!1);
  }, [f, m]), x.useEffect(() => {
    V("");
  }, [m]);
  const Ue = ($) => {
    const be = f?.catalog.find((He) => He.id === $);
    be && (S($), g(be.models[0]), T(be.voices[m] ?? ""), L(""), X(!1), V(""));
  };
  x.useEffect(() => {
    if (!ve) {
      U(null), J("");
      return;
    }
    const $ = new AbortController();
    return U(null), J(""), fetch(ut(`/voice/voices?provider=${encodeURIComponent(b)}&language=${m}`), { signal: $.signal }).then(async (be) => {
      if (!be.ok) throw new Error((await be.json()).error ?? "network_error");
      return be.json();
    }).then((be) => {
      U(be.voices), T((He) => be.voices.some((hn) => hn.id === He) ? He : be.voices[0]?.id ?? "");
    }).catch((be) => {
      $.signal.aborted || (U([]), J(tl(be.message)));
    }), () => $.abort();
  }, [b, m, ve]);
  const Ge = () => ({ language: m, profile: { provider: b, model: y, voice: j.trim() }, apiKey: E.trim(), clearKey: k }), Re = () => {
    Ee.current?.abort(), Ee.current = null, se.current?.pause(), se.current = null;
  }, W = async () => {
    Re(), o(), V("Saving…");
    try {
      d(await _n("/voice/config", Ge())), V("Saved");
    } catch ($) {
      V(tl($.message));
    }
  }, de = async () => {
    if (Re(), o(), k && E.trim() === "" && ue?.key) {
      V(tl("key_required"));
      return;
    }
    Ee.current = new AbortController(), V("Generating preview…");
    try {
      const $ = await fetch(ut("/voice/read"), { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...Ge(), text: VE[m] }), signal: Ee.current.signal });
      if (!$.ok) throw new Error((await $.json()).error ?? "speech_error");
      const be = URL.createObjectURL(await $.blob()), He = new Audio(be);
      se.current = He, He.onended = () => {
        URL.revokeObjectURL(be), V("Preview finished");
      }, He.onerror = () => V(tl("speech_error")), await He.play(), V("Playing preview…");
    } catch ($) {
      $ instanceof DOMException && $.name === "AbortError" || V(tl($.message));
    }
  };
  if (x.useEffect(() => Re, []), !f) return /* @__PURE__ */ c.jsxs("div", { className: "settings-group", children: [
    /* @__PURE__ */ c.jsx("h3", { className: "section", children: "Speech provider" }),
    /* @__PURE__ */ c.jsx("p", { className: "empty", children: B || "Loading…" })
  ] });
  const I = ve ? !!Z?.some(($) => $.id === j) : j.trim() !== "", je = b === "local" ? "Uses installed Mac system voices. No key and no dialogue upload." : b === "voicevox" ? "Free local Japanese model. Start VOICEVOX on port 50021." : "Uses your own account. Preview and dialogue text go to this provider and may incur charges.";
  return /* @__PURE__ */ c.jsxs("form", { className: "settings-group", onSubmit: ($) => {
    $.preventDefault(), W();
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
              jc[a],
              s === "auto" ? " (following the browser)" : "",
              "."
            ] }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              " Replies are read in ",
              jc[a],
              ", not ",
              jc[m],
              ". ",
              /* @__PURE__ */ c.jsxs("button", { type: "button", className: "text-button inline", onClick: () => u(m), children: [
                "Read replies in ",
                jc[m]
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("span", { className: "seg", role: "tablist", children: ["zh", "en", "ja"].map(($) => /* @__PURE__ */ c.jsx("button", { type: "button", role: "tab", "aria-selected": m === $, className: m === $ ? "active" : "", onClick: () => p($), children: jc[$] }, $)) })
      ] }),
      /* @__PURE__ */ c.jsxs("label", { className: "setting", children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("b", { children: "Provider" }),
          /* @__PURE__ */ c.jsxs("small", { children: [
            je,
            ue?.docs ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              " ",
              /* @__PURE__ */ c.jsx("a", { href: ue.docs, target: "_blank", rel: "noopener noreferrer", children: "Documentation" })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("span", { className: "control", children: /* @__PURE__ */ c.jsx("select", { className: "input", value: b, onChange: ($) => Ue($.target.value), children: me.map(($) => /* @__PURE__ */ c.jsx("option", { value: $.id, children: $.id === "local" ? "Local system voice · free" : $.name }, $.id)) }) })
      ] }),
      (ue?.models.length ?? 0) > 1 && /* @__PURE__ */ c.jsxs("label", { className: "setting", children: [
        /* @__PURE__ */ c.jsx("span", { children: /* @__PURE__ */ c.jsx("b", { children: "Model" }) }),
        /* @__PURE__ */ c.jsx("span", { className: "control", children: /* @__PURE__ */ c.jsx("select", { className: "input", value: y, onChange: ($) => g($.target.value), children: (ue?.models ?? []).map(($) => /* @__PURE__ */ c.jsx("option", { value: $, children: $ }, $)) }) })
      ] }),
      /* @__PURE__ */ c.jsxs("label", { className: "setting", children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("b", { children: "Voice" }),
          (K || ve && Z?.length === 0) && /* @__PURE__ */ c.jsx("small", { className: "composer-error", children: K || "No voices for this language." })
        ] }),
        /* @__PURE__ */ c.jsx("span", { className: "control", children: ve ? /* @__PURE__ */ c.jsxs("select", { className: "input", value: j, disabled: Z === null || Z.length === 0, onChange: ($) => T($.target.value), children: [
          Z === null && /* @__PURE__ */ c.jsx("option", { value: "", children: "Loading voices…" }),
          Z?.map(($) => /* @__PURE__ */ c.jsx("option", { value: $.id, children: b === "local" ? `${$.name.replace(/\s+\(.*\)$/, "")} · ${$.locale}` : $.name }, $.id))
        ] }) : /* @__PURE__ */ c.jsx("input", { className: "input", value: j, maxLength: 160, spellCheck: !1, onChange: ($) => T($.target.value), placeholder: "Voice ID from the provider" }) })
      ] }),
      ue?.key && /* @__PURE__ */ c.jsxs("label", { className: "setting", children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("b", { children: "API key" }),
          /* @__PURE__ */ c.jsxs("small", { children: [
            "Kept in a local config file, outside character exports.",
            f.hasKeys[b] && !k ? " A key is saved; leave blank to keep it." : ""
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("span", { className: "control", children: [
          f.hasKeys[b] && /* @__PURE__ */ c.jsx("button", { type: "button", className: `text-button${k ? " danger" : ""}`, onClick: () => {
            X(($) => !$), L("");
          }, children: k ? "Will delete · undo" : "Delete saved key" }),
          /* @__PURE__ */ c.jsx("input", { className: "input", type: "password", autoComplete: "new-password", value: E, disabled: k, onChange: ($) => L($.target.value), placeholder: k ? "Key will be deleted on save" : f.hasKeys[b] ? "••••••••" : "Enter your API key" })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "setting-foot", children: [
        /* @__PURE__ */ c.jsx("span", { className: "field-hint", role: "status", children: B }),
        /* @__PURE__ */ c.jsxs("span", { className: "row", children: [
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "button", disabled: !I, onClick: () => {
            de();
          }, children: "Preview" }),
          /* @__PURE__ */ c.jsx("button", { type: "submit", className: "button primary", disabled: !I, children: "Save" })
        ] })
      ] })
    ] })
  ] });
}
const y1 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function FE(a) {
  const s = a.trim().split(/\s+/).filter(Boolean);
  if (s.length === 0) return "·";
  const u = s[0], o = s.length > 1 ? s[s.length - 1] : "";
  return /[぀-ヿ㐀-鿿가-힯]/.test(u) ? u.slice(-1) : ((u[0] ?? "") + (o[0] ?? "")).toUpperCase();
}
function JE(a) {
  let s = 0;
  for (const u of a) s = s * 31 + u.codePointAt(0) >>> 0;
  return s % 360;
}
function PE(a) {
  const s = a.trim()[0] ?? "#";
  return /\p{L}/u.test(s) ? /[A-Za-zÀ-ɏ]/.test(s) ? s.normalize("NFD")[0].toUpperCase() : s : "#";
}
const WE = (a) => a.inDays === 0 ? "Today" : a.inDays === 1 ? "Tomorrow" : `${y1[Number(a.date.slice(5, 7)) - 1]} ${Number(a.date.slice(8, 10))} · in ${a.inDays} days`;
function Rd({ name: a, dim: s }) {
  return /* @__PURE__ */ c.jsx("span", { className: `contacts-avatar${s ? " dim" : ""}`, style: s ? void 0 : { "--h": JE(a) }, children: s ? "" : FE(a) });
}
function eT({ data: a, placeholder: s }) {
  const [u, o] = x.useState(""), f = a?.contacts ?? [], d = (a?.birthdays ?? []).filter((y) => y.inDays <= 30), m = u.trim().toLowerCase(), p = m.replace(/\D/g, ""), b = x.useMemo(() => m === "" ? f : f.filter(
    (y) => y.name.toLowerCase().includes(m) || y.org.toLowerCase().includes(m) || y.emails.some((g) => g.toLowerCase().includes(m)) || p.length >= 3 && y.phones.some((g) => g.replace(/\D/g, "").includes(p))
  ), [f, m, p]), S = x.useMemo(() => {
    const y = /* @__PURE__ */ new Map();
    for (const g of b) {
      const j = PE(g.name);
      (y.get(j) ?? y.set(j, []).get(j)).push(g);
    }
    return [...y.entries()].sort(([g], [j]) => g === "#" ? 1 : j === "#" ? -1 : g.localeCompare(j));
  }, [b]);
  return s || !a ? /* @__PURE__ */ c.jsxs("div", { className: "contacts placeholder", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "contacts-search", children: [
      /* @__PURE__ */ c.jsx(wc, {}),
      /* @__PURE__ */ c.jsx("input", { className: "input", placeholder: "Search by name, company, email or number", disabled: !0 })
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: "contacts-list", children: Array.from({ length: 6 }, (y, g) => /* @__PURE__ */ c.jsxs("li", { className: "contacts-row", children: [
      /* @__PURE__ */ c.jsx(Rd, { name: "", dim: !0 }),
      /* @__PURE__ */ c.jsxs("span", { className: "contacts-text", children: [
        /* @__PURE__ */ c.jsx("i", { className: "contacts-skeleton", style: { width: `${38 + g * 17 % 30}%` } }),
        /* @__PURE__ */ c.jsx("i", { className: "contacts-skeleton short", style: { width: `${22 + g * 11 % 20}%` } })
      ] })
    ] }, g)) }),
    /* @__PURE__ */ c.jsx("p", { className: "rem-empty", children: "Waiting for access to Contacts" })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: "contacts", children: [
    d.length > 0 && /* @__PURE__ */ c.jsxs("section", { className: "contacts-bdays", children: [
      /* @__PURE__ */ c.jsxs("h3", { className: "section", children: [
        /* @__PURE__ */ c.jsx(B0, {}),
        " Birthdays ",
        /* @__PURE__ */ c.jsx("span", { className: "badge", children: d.length })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: "contacts-bday-strip", children: d.map((y) => /* @__PURE__ */ c.jsxs("div", { className: `contacts-bday${y.inDays === 0 ? " today" : ""}`, children: [
        /* @__PURE__ */ c.jsx(Rd, { name: y.name }),
        /* @__PURE__ */ c.jsxs("span", { className: "contacts-bday-text", children: [
          /* @__PURE__ */ c.jsx("b", { children: y.name }),
          /* @__PURE__ */ c.jsx("small", { children: WE(y) })
        ] })
      ] }, y.id)) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "contacts-search", children: [
      /* @__PURE__ */ c.jsx(wc, {}),
      /* @__PURE__ */ c.jsx("input", { className: "input", value: u, placeholder: "Search by name, company, email or number", onChange: (y) => o(y.target.value) }),
      u !== "" && /* @__PURE__ */ c.jsx("button", { type: "button", className: "text-button", onClick: () => o(""), children: "Clear" })
    ] }),
    b.length === 0 && /* @__PURE__ */ c.jsx("p", { className: "rem-empty", children: f.length === 0 ? "The address book is empty." : `Nobody matches “${u.trim()}”.` }),
    S.map(([y, g]) => /* @__PURE__ */ c.jsxs("section", { className: "contacts-group", children: [
      /* @__PURE__ */ c.jsx("h4", { className: "contacts-letter", children: y }),
      /* @__PURE__ */ c.jsx("ul", { className: "contacts-list", children: g.map((j) => {
        const T = j.phones[0] ?? j.emails[0] ?? "";
        return /* @__PURE__ */ c.jsxs("li", { className: "contacts-row", children: [
          /* @__PURE__ */ c.jsx(Rd, { name: j.name }),
          /* @__PURE__ */ c.jsxs("span", { className: "contacts-text", children: [
            /* @__PURE__ */ c.jsx("b", { children: j.name || /* @__PURE__ */ c.jsxs("span", { className: "contacts-unnamed", children: [
              /* @__PURE__ */ c.jsx(eS, {}),
              " No name"
            ] }) }),
            (j.org || T) && /* @__PURE__ */ c.jsxs("small", { children: [
              j.org,
              j.org && T ? " · " : "",
              T
            ] })
          ] }),
          j.birthday && /* @__PURE__ */ c.jsxs("small", { className: "contacts-meta", title: `Birthday ${j.birthday}`, children: [
            /* @__PURE__ */ c.jsx(B0, {}),
            y1[Number(j.birthday.slice(-5, -3)) - 1],
            " ",
            Number(j.birthday.slice(-2))
          ] })
        ] }, j.id);
      }) })
    ] }, y)),
    f.length >= 500 && m === "" && /* @__PURE__ */ c.jsx("p", { className: "field-hint contacts-foot", children: "Showing the first 500 by name. Search to find anyone else." })
  ] });
}
const tT = (a) => {
  if (!a) return "";
  const s = Math.max(0, Math.round((Date.now() - new Date(a).getTime()) / 6e4));
  if (s < 1) return "just now";
  if (s < 60) return `${s} min ago`;
  if (s < 2160) return `${Math.round(s / 60)} h ago`;
  if (s < 1440 * 14) return `${Math.round(s / 1440)} d ago`;
  const u = new Date(a);
  return u.getFullYear() === (/* @__PURE__ */ new Date()).getFullYear() ? u.toLocaleDateString(void 0, { month: "short", day: "numeric" }) : u.toLocaleDateString(void 0, { year: "numeric", month: "short", day: "numeric" });
};
function nT({ data: a, placeholder: s, busy: u, act: o }) {
  const [f, d] = x.useState(""), [m, p] = x.useState(""), b = a?.folders ?? [], S = a?.notes ?? [], y = m.trim().toLowerCase(), g = S.filter((E) => (f === "" || E.folder === f) && (y === "" || E.title.toLowerCase().includes(y) || E.preview.toLowerCase().includes(y))), j = [{ name: "", label: "All", count: S.length }, ...b.map((E) => ({ name: E.name, label: E.name, count: E.count }))], T = s && S.length === 0;
  return /* @__PURE__ */ c.jsxs("div", { className: `notes${s ? " placeholder" : ""}`, children: [
    /* @__PURE__ */ c.jsxs("div", { className: "notes-search", children: [
      /* @__PURE__ */ c.jsx(wc, {}),
      /* @__PURE__ */ c.jsx("input", { className: "input", value: m, placeholder: "Search notes…", disabled: T, onChange: (E) => p(E.target.value) }),
      m !== "" && /* @__PURE__ */ c.jsx("button", { type: "button", className: "icon-button small notes-clear", title: "Clear", onClick: () => p(""), children: /* @__PURE__ */ c.jsx(Sl, {}) })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: "notes-chips", children: T ? [96, 72, 84].map((E, L) => /* @__PURE__ */ c.jsx("span", { className: "notes-chip skeleton", style: { width: E } }, L)) : j.map((E) => /* @__PURE__ */ c.jsxs("button", { type: "button", className: `notes-chip${f === E.name ? " active" : ""}`, onClick: () => d(E.name), children: [
      E.name === "" ? /* @__PURE__ */ c.jsx(av, {}) : /* @__PURE__ */ c.jsx($0, {}),
      /* @__PURE__ */ c.jsx("span", { className: "notes-chip-name", children: E.label }),
      /* @__PURE__ */ c.jsx("small", { children: E.count })
    ] }, E.name)) }),
    T ? /* @__PURE__ */ c.jsx("ul", { className: "notes-list", children: [0, 1, 2, 3].map((E) => /* @__PURE__ */ c.jsxs("li", { className: "notes-card skeleton", children: [
      /* @__PURE__ */ c.jsx("span", { className: "notes-line w60" }),
      /* @__PURE__ */ c.jsx("span", { className: "notes-line w90" }),
      /* @__PURE__ */ c.jsx("span", { className: "notes-line w40" })
    ] }, E)) }) : g.length === 0 ? /* @__PURE__ */ c.jsx("p", { className: "rem-empty", children: S.length === 0 ? "No notes yet." : y ? `Nothing matches "${m}".` : "This folder is empty." }) : /* @__PURE__ */ c.jsx("ul", { className: "notes-list", children: g.map((E) => /* @__PURE__ */ c.jsxs("li", { className: "notes-card", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "notes-card-head", children: [
        /* @__PURE__ */ c.jsxs("b", { className: "notes-title", children: [
          E.locked && /* @__PURE__ */ c.jsx(nv, { className: "notes-lock" }),
          E.title || "Untitled"
        ] }),
        /* @__PURE__ */ c.jsx("small", { className: "notes-time", children: tT(E.modified) })
      ] }),
      E.preview ? /* @__PURE__ */ c.jsx("p", { className: "notes-preview", children: E.preview }) : /* @__PURE__ */ c.jsx("p", { className: "notes-preview muted", children: E.locked ? "Locked note" : "No preview" }),
      f === "" && E.folder && /* @__PURE__ */ c.jsxs("span", { className: "notes-folder", children: [
        /* @__PURE__ */ c.jsx($0, {}),
        E.folder
      ] })
    ] }, E.id)) }),
    !T && S.length > 0 && /* @__PURE__ */ c.jsxs("p", { className: "field-hint notes-foot", children: [
      g.length === S.length ? `${S.length} most recent notes` : `${g.length} of ${S.length} recent notes`,
      y === "" ? "" : " · search the rest through the character"
    ] })
  ] });
}
const lT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], aT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], th = (a) => String(a).padStart(2, "0"), iT = (a) => `${Math.floor(a / 60)}:${th(Math.round(a % 60))}`, nh = (a) => `${lT[(/* @__PURE__ */ new Date(`${a}T12:00:00`)).getDay()]}, ${aT[Number(a.slice(5, 7)) - 1]} ${Number(a.slice(8))}`, sT = (a) => a.slice(11, 16), lh = /* @__PURE__ */ new Map(), ky = /* @__PURE__ */ new Set();
function cT({ item: a, dim: s }) {
  const [u, o] = x.useState(lh.get(a.id)), f = x.useRef(null);
  x.useEffect(() => {
    if (u || s || ky.has(a.id) || !f.current) return;
    const m = f.current;
    let p = !1;
    const b = () => {
      rT(a.id).then((y) => {
        p || (y ? o(y) : ky.add(a.id));
      });
    };
    if (typeof IntersectionObserver > "u") {
      b();
      return;
    }
    const S = new IntersectionObserver((y) => {
      y.some((g) => g.isIntersecting) && (S.disconnect(), b());
    }, { rootMargin: "200px" });
    return S.observe(m), () => {
      p = !0, S.disconnect();
    };
  }, [a.id, u, s]);
  const d = a.at ? `${nh(a.at.slice(0, 10))} ${sT(a.at)}` : "";
  return /* @__PURE__ */ c.jsxs("div", { ref: f, className: `photos-tile${u ? " loaded" : ""}`, title: `${d}${a.w ? ` · ${a.w}×${a.h}` : ""}${a.hasLocation ? " · located" : ""}`, children: [
    u ? /* @__PURE__ */ c.jsx("img", { src: u, alt: "", loading: "lazy", draggable: !1 }) : /* @__PURE__ */ c.jsx("span", { className: "photos-tile-blank", children: /* @__PURE__ */ c.jsx(Tc, {}) }),
    a.type === "video" && /* @__PURE__ */ c.jsxs("span", { className: "photos-video", children: [
      /* @__PURE__ */ c.jsx(Ld, {}),
      a.duration ? iT(a.duration) : ""
    ] }),
    a.fav && /* @__PURE__ */ c.jsx("span", { className: "photos-fav", children: /* @__PURE__ */ c.jsx(tv, {}) })
  ] });
}
async function rT(a) {
  const s = lh.get(a);
  if (s) return s;
  try {
    const u = await _n("/sources/photos/thumb", { id: a });
    return u.dataUrl && lh.set(a, u.dataUrl), u.dataUrl;
  } catch {
    return;
  }
}
function uT({ data: a, placeholder: s, busy: u }) {
  const o = a?.days ?? Array.from({ length: 30 }, (y, g) => {
    const j = /* @__PURE__ */ new Date();
    return j.setDate(j.getDate() - (29 - g)), { day: `${j.getFullYear()}-${th(j.getMonth() + 1)}-${th(j.getDate())}`, count: 0 };
  }), f = a?.recent ?? [], d = a?.albums ?? [], m = Math.max(1, ...o.map((y) => y.count)), p = o.reduce((y, g) => y + g.count, 0), b = s || !a, S = b && f.length === 0 ? Array.from({ length: 10 }, (y, g) => ({ id: `blank-${g}`, at: null, type: "image", w: 0, h: 0, fav: !1, hasLocation: !1 })) : f;
  return /* @__PURE__ */ c.jsxs("div", { className: `photos${b ? " placeholder" : ""}`, children: [
    /* @__PURE__ */ c.jsxs("section", { className: "photos-strip", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "photos-strip-head", children: [
        /* @__PURE__ */ c.jsx("h3", { className: "section", children: "Photos per day" }),
        /* @__PURE__ */ c.jsx("small", { children: b ? "" : `${p} in 30 days` })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: "photos-bars", children: o.map((y) => /* @__PURE__ */ c.jsx("div", { className: "photos-bar-col", title: `${nh(y.day)}: ${y.count} photo${y.count === 1 ? "" : "s"}`, children: /* @__PURE__ */ c.jsx("div", { className: `photos-bar${y.count === 0 ? " none" : ""}`, style: { height: `${y.count === 0 ? 3 : Math.max(6, y.count / m * 100)}%` } }) }, y.day)) }),
      /* @__PURE__ */ c.jsxs("div", { className: "photos-bar-axis", children: [
        /* @__PURE__ */ c.jsx("small", { children: nh(o[0].day) }),
        /* @__PURE__ */ c.jsx("small", { children: "Today" })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { children: [
      /* @__PURE__ */ c.jsxs("h3", { className: "section", children: [
        "Recent ",
        !b && f.length > 0 && /* @__PURE__ */ c.jsx("span", { className: "badge", children: f.length })
      ] }),
      S.length === 0 ? /* @__PURE__ */ c.jsx("p", { className: "rem-empty", children: u === "refresh" ? "Loading…" : "No photos in the last 30 days." }) : /* @__PURE__ */ c.jsx("div", { className: "photos-grid", children: S.map((y) => /* @__PURE__ */ c.jsx(cT, { item: y, dim: b }, y.id)) })
    ] }),
    (d.length > 0 || b) && /* @__PURE__ */ c.jsxs("section", { children: [
      /* @__PURE__ */ c.jsx("h3", { className: "section", children: "Albums" }),
      /* @__PURE__ */ c.jsx("div", { className: "photos-albums", children: (b && d.length === 0 ? [{ title: "", count: 0 }, { title: "", count: 0 }, { title: "", count: 0 }] : d).map((y, g) => /* @__PURE__ */ c.jsxs("div", { className: "photos-album", children: [
        /* @__PURE__ */ c.jsx("span", { className: "photos-album-icon", children: y.title === "Favorites" ? /* @__PURE__ */ c.jsx(tv, {}) : /* @__PURE__ */ c.jsx(R2, {}) }),
        /* @__PURE__ */ c.jsxs("span", { className: "photos-album-text", children: [
          /* @__PURE__ */ c.jsx("b", { children: y.title || " " }),
          /* @__PURE__ */ c.jsx("small", { children: y.title ? `${y.count} item${y.count === 1 ? "" : "s"}` : " " })
        ] })
      ] }, `${y.title}-${g}`)) })
    ] }),
    b && /* @__PURE__ */ c.jsx("p", { className: "field-hint", style: { marginTop: 12 }, children: "Thumbnails and a 30-day activity strip appear here once Photos access is granted." })
  ] });
}
const oT = /[぀-ヿ㐀-鿿가-힯]/;
function fT(a) {
  const s = a.trim();
  return !s || /^[+\d(]/.test(s) ? "#" : oT.test(s[0]) ? s[0] : s.split(/\s+/).filter(Boolean).slice(0, 2).map((o) => o[0].toUpperCase()).join("");
}
function dT(a) {
  let s = 0;
  for (let u = 0; u < a.length; u++) s = (s * 31 + a.charCodeAt(u)) % 360;
  return s;
}
function hT(a) {
  const s = Math.max(0, Math.round((Date.now() - new Date(a).getTime()) / 6e4));
  return s < 1 ? "now" : s < 60 ? `${s} min` : s < 2160 ? `${Math.round(s / 60)} h` : s < 1440 * 14 ? `${Math.round(s / 1440)} d` : a.slice(0, 10);
}
function Ay({ t: a, awaiting: s }) {
  const u = a.participants.length > 1;
  return /* @__PURE__ */ c.jsxs("li", { className: `messages-row${s ? " awaiting" : ""}`, children: [
    /* @__PURE__ */ c.jsx("span", { className: "messages-avatar", style: { "--h": dT(a.name) }, children: u ? /* @__PURE__ */ c.jsx(cv, {}) : fT(a.name) }),
    /* @__PURE__ */ c.jsxs("span", { className: "messages-text", children: [
      /* @__PURE__ */ c.jsxs("b", { children: [
        a.name,
        u && /* @__PURE__ */ c.jsx("small", { className: "messages-count", children: a.participants.length })
      ] }),
      /* @__PURE__ */ c.jsx("small", { className: "messages-snippet", children: a.snippet ? `${a.lastFromMe ? "You: " : ""}${a.snippet}` : a.count > 0 ? `${a.count} message${a.count === 1 ? "" : "s"}` : "" })
    ] }),
    /* @__PURE__ */ c.jsx("small", { className: "messages-meta", children: hT(a.last) })
  ] });
}
function mT({ data: a, placeholder: s }) {
  const u = a?.threads ?? [], o = u.filter((m) => m.awaiting), f = u.filter((m) => !m.awaiting), d = a?.shared ?? !1;
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
    !s && u.length === 0 && /* @__PURE__ */ c.jsxs("p", { className: "rem-empty", children: [
      "No conversations in the last ",
      a?.window ?? 7,
      " days."
    ] }),
    o.length > 0 && /* @__PURE__ */ c.jsxs("section", { className: "messages-group", children: [
      /* @__PURE__ */ c.jsxs("h3", { className: "section", children: [
        "Awaiting your reply ",
        /* @__PURE__ */ c.jsx("span", { className: "badge", children: o.length })
      ] }),
      /* @__PURE__ */ c.jsx("ul", { className: "messages-list", children: o.map((m) => /* @__PURE__ */ c.jsx(Ay, { t: m, awaiting: !0 }, m.id)) })
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
const pT = (a) => Math.max(0, Math.round((Date.now() - Date.parse(a)) / 6e4)), _y = (a) => {
  const s = pT(a);
  return s < 1 ? "just now" : s < 60 ? `${s} min ago` : s < 2160 ? `${Math.round(s / 60)} h ago` : `${Math.round(s / 1440)} d ago`;
}, gT = (a) => a < 1 ? `${Math.round(a * 1e3)} m` : a < 10 ? `${a.toFixed(1)} km` : `${Math.round(a)} km`, Cy = (a, s) => a?.subLocality || a?.name || a?.locality || `${s.lat.toFixed(4)}, ${s.lon.toFixed(4)}`, yT = (a) => a ? [a.locality || a.name, a.administrativeArea && a.administrativeArea !== a.locality ? a.administrativeArea : "", a.country].filter(Boolean).join(", ") : "";
function vT({ accuracy: a, pinned: s, idle: u }) {
  const o = Math.max(100, a * 1.4), f = a > 0 ? Math.max(6, a / o * 54) : 0, d = o >= 1e3 ? `${(o / 1e3).toFixed(o >= 1e4 ? 0 : 1)} km` : `${Math.round(o)} m`;
  return /* @__PURE__ */ c.jsxs("svg", { className: `loc-radar${u ? " idle" : ""}`, viewBox: "0 0 120 120", "aria-hidden": "true", children: [
    /* @__PURE__ */ c.jsx("circle", { className: "loc-ring", cx: "60", cy: "60", r: "54" }),
    /* @__PURE__ */ c.jsx("circle", { className: "loc-ring", cx: "60", cy: "60", r: "36" }),
    /* @__PURE__ */ c.jsx("circle", { className: "loc-ring", cx: "60", cy: "60", r: "18" }),
    /* @__PURE__ */ c.jsx("line", { className: "loc-ring", x1: "60", y1: "4", x2: "60", y2: "116" }),
    /* @__PURE__ */ c.jsx("line", { className: "loc-ring", x1: "4", y1: "60", x2: "116", y2: "60" }),
    !u && /* @__PURE__ */ c.jsx("circle", { className: "loc-sweep", cx: "60", cy: "60", r: "54" }),
    f > 0 && /* @__PURE__ */ c.jsx("circle", { className: "loc-acc", cx: "60", cy: "60", r: f }),
    !u && /* @__PURE__ */ c.jsx("circle", { className: "loc-pulse", cx: "60", cy: "60", r: "5" }),
    /* @__PURE__ */ c.jsx("circle", { className: `loc-dot${s ? " pinned" : ""}`, cx: "60", cy: "60", r: u ? 3 : 5 }),
    !u && !s && /* @__PURE__ */ c.jsx("text", { className: "loc-scale", x: "114", y: "114", textAnchor: "end", children: d })
  ] });
}
function bT({ data: a, placeholder: s, busy: u, act: o }) {
  const [f, d] = x.useState(""), m = async () => {
    const T = f.trim();
    T && await o("location", { json: { value: T } }) && d("");
  }, p = a?.current, b = !p, S = p?.place ?? null, y = S?.timeZone && a && S.timeZone !== a.systemTimeZone ? S.timeZone : "", g = a?.distanceFromHomeKm !== void 0 && a.distanceFromHomeKm <= 0.5, j = a?.history ?? [];
  return /* @__PURE__ */ c.jsxs("div", { className: `loc${s || b ? " placeholder" : ""}`, children: [
    /* @__PURE__ */ c.jsxs("div", { className: "loc-hero", children: [
      /* @__PURE__ */ c.jsx(vT, { accuracy: p?.accuracy ?? 0, pinned: p?.source === "manual", idle: b }),
      /* @__PURE__ */ c.jsxs("div", { className: "loc-where", children: [
        /* @__PURE__ */ c.jsx("div", { className: "loc-name", children: p ? Cy(S, p) : "—" }),
        /* @__PURE__ */ c.jsx("div", { className: "loc-line", children: p ? yT(S) || "Somewhere on the map" : s ? "Waiting for a location fix" : "" }),
        /* @__PURE__ */ c.jsxs("div", { className: "loc-meta", children: [
          p && /* @__PURE__ */ c.jsxs("span", { children: [
            /* @__PURE__ */ c.jsx(z2, {}),
            " ",
            p.source === "manual" ? "Pinned by name" : `Updated ${_y(p.at)}`,
            p.accuracy > 0 ? ` · ±${Math.round(p.accuracy)} m` : ""
          ] }),
          p && a?.home && /* @__PURE__ */ c.jsxs("span", { className: g ? "on" : "", children: [
            /* @__PURE__ */ c.jsx(Nu, {}),
            " ",
            g ? "At home" : `${gT(a.distanceFromHomeKm ?? 0)} from ${a.home.name}`
          ] }),
          y && /* @__PURE__ */ c.jsxs("span", { children: [
            /* @__PURE__ */ c.jsx(_2, {}),
            " ",
            y
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "loc-actions", children: [
      /* @__PURE__ */ c.jsxs("button", { type: "button", className: "button", disabled: u !== "" || b, onClick: () => {
        o("setHome");
      }, children: [
        /* @__PURE__ */ c.jsx(Nu, {}),
        " ",
        u === "setHome" ? "Saving…" : a?.home ? "Update home" : "Set as home"
      ] }),
      a?.manual && /* @__PURE__ */ c.jsxs("button", { type: "button", className: "text-button", disabled: u !== "", onClick: () => {
        o("location", { json: { value: "auto" } });
      }, children: [
        /* @__PURE__ */ c.jsx(B2, {}),
        " Use this Mac's location"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("h3", { className: "section", children: "Recent places" }),
    j.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: "loc-chips", children: b ? [0, 1, 2].map((T) => /* @__PURE__ */ c.jsx("span", { className: "loc-chip ghost" }, T)) : /* @__PURE__ */ c.jsxs("span", { className: "loc-chip current", children: [
      /* @__PURE__ */ c.jsx(Dd, {}),
      " ",
      p ? Cy(S, p) : ""
    ] }) }) : /* @__PURE__ */ c.jsx("div", { className: "loc-chips", children: j.slice(0, 10).map((T, E) => /* @__PURE__ */ c.jsxs("span", { className: `loc-chip${E === 0 ? " current" : ""}${a?.home && Math.abs(T.lat - a.home.lat) < 6e-3 && Math.abs(T.lon - a.home.lon) < 6e-3 ? " home" : ""}`, title: `${T.lat.toFixed(3)}, ${T.lon.toFixed(3)} · first ${T.first.slice(0, 16).replace("T", " ")}`, children: [
      E === 0 ? /* @__PURE__ */ c.jsx(Dd, {}) : /* @__PURE__ */ c.jsx(Nu, {}),
      T.name,
      /* @__PURE__ */ c.jsxs("small", { children: [
        E === 0 ? "now" : _y(T.last),
        T.visits > 1 ? ` · ${T.visits}×` : ""
      ] })
    ] }, `${T.lat},${T.lon}`)) }),
    /* @__PURE__ */ c.jsx("h3", { className: "section", children: "Use a different place" }),
    /* @__PURE__ */ c.jsxs("div", { className: "loc-pin", children: [
      /* @__PURE__ */ c.jsx("input", { className: "input", value: f, placeholder: "City or place name, e.g. Tokyo", disabled: u !== "", onChange: (T) => d(T.target.value), onKeyDown: (T) => {
        T.key === "Enter" && !T.nativeEvent.isComposing && (T.preventDefault(), m());
      } }),
      /* @__PURE__ */ c.jsx("button", { type: "button", className: "button primary", disabled: u !== "" || f.trim() === "", onClick: () => {
        m();
      }, children: u === "location" ? "Pinning…" : "Pin" })
    ] }),
    /* @__PURE__ */ c.jsx("p", { className: "field-hint", children: `Pins the place instead of asking this Mac; no permission needed. "Use this Mac's location" goes back.` })
  ] });
}
const Oy = /* @__PURE__ */ new Set(["light", "switch", "fan", "input_boolean", "media_player", "humidifier"]), xT = /* @__PURE__ */ new Set(["scene", "script"]), ST = (a) => a.replace(/^get\s+/i, ""), Ry = (a) => {
  const s = Math.round((Date.now() - Date.parse(a)) / 6e4);
  return Number.isFinite(s) ? s < 1 ? "just now" : s < 60 ? `${s} min ago` : s < 2160 ? `${Math.round(s / 60)} h ago` : `${Math.round(s / 1440)} d ago` : "";
}, jT = (a) => {
  if (a.startsWith("{"))
    try {
      const s = JSON.parse(a);
      if (!s || typeof s != "object" || Array.isArray(s)) return;
      const u = Object.entries(s).filter(([, o]) => o === null || ["string", "number", "boolean"].includes(typeof o));
      return u.length > 0 && u.length <= 12 ? Object.fromEntries(u.map(([o, f]) => [o, f === null ? "—" : String(f)])) : void 0;
    } catch {
      return;
    }
};
function My({ domain: a }) {
  const s = a === "light" ? D2 : a === "switch" || a === "input_boolean" ? V2 : a === "fan" ? w2 : a === "climate" ? P2 : a === "lock" ? nv : a === "binary_sensor" ? o2 : a === "sensor" ? ch : a === "scene" || a === "script" ? uh : W2;
  return /* @__PURE__ */ c.jsx(s, {});
}
function NT({ r: a }) {
  const s = a.error && !a.output ? void 0 : jT(a.output), u = !!s || a.output.length > 60;
  return /* @__PURE__ */ c.jsxs("div", { className: `home-reading${u ? " wide" : ""}${a.error && !a.output ? " failed" : ""}`, title: a.error ? a.error : void 0, children: [
    /* @__PURE__ */ c.jsxs("small", { children: [
      a.error ? /* @__PURE__ */ c.jsx(sv, {}) : /* @__PURE__ */ c.jsx(ch, {}),
      ST(a.name)
    ] }),
    s ? /* @__PURE__ */ c.jsx("dl", { children: Object.entries(s).map(([o, f]) => /* @__PURE__ */ c.jsxs(Yl.Fragment, { children: [
      /* @__PURE__ */ c.jsx("dt", { children: o }),
      /* @__PURE__ */ c.jsx("dd", { children: f })
    ] }, o)) }) : a.error && !a.output ? /* @__PURE__ */ c.jsx("b", { children: a.error }) : /* @__PURE__ */ c.jsx("b", { className: a.output ? "" : "empty", children: a.output || "No output" }),
    /* @__PURE__ */ c.jsx("time", { dateTime: a.at, children: a.error && a.output ? `Last good value · ${Ry(a.at)}` : `Updated ${Ry(a.at)}` })
  ] });
}
function ET({ data: a, placeholder: s, busy: u, act: o }) {
  const [f, d] = Yl.useState(""), [m, p] = Yl.useState(""), [b, S] = Yl.useState({}), y = async (U) => {
    if (f) return;
    d(U), p("");
    const K = await o("run", { json: { value: U } });
    d(""), K && (p(U), window.setTimeout(() => p((J) => J === U ? "" : J), 2500));
  }, g = async (U, K) => {
    S((B) => ({ ...B, [U.id]: K })), await o("run", { json: { value: `${U.id} ${K ? "on" : "off"}` } }) ? window.setTimeout(() => S((B) => {
      const V = { ...B };
      return delete V[U.id], V;
    }), 4e3) : S((B) => {
      const V = { ...B };
      return delete V[U.id], V;
    });
  }, j = a?.readers ?? [], T = a?.actions ?? [], E = a?.entities ?? [], L = E.filter((U) => Oy.has(U.domain) || U.domain === "climate" || U.domain === "cover" || U.domain === "lock"), k = E.filter((U) => U.domain === "sensor" || U.domain === "binary_sensor"), X = E.filter((U) => xT.has(U.domain)), Z = !s && j.length + T.length + E.length === 0;
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
    Z && /* @__PURE__ */ c.jsxs("p", { className: "home-empty", children: [
      "Nothing in the Shortcuts folder",
      a.folder ? ` "${a.folder}"` : "",
      " yet.",
      /* @__PURE__ */ c.jsx("br", {}),
      /* @__PURE__ */ c.jsx("span", { className: "field-hint home-hint", children: 'Add "Get …" shortcuts for readings and any others as actions, then refresh.' })
    ] }),
    (j.length > 0 || k.length > 0) && /* @__PURE__ */ c.jsxs("section", { className: "home-group", children: [
      /* @__PURE__ */ c.jsxs("h3", { className: "section", children: [
        "Readings ",
        /* @__PURE__ */ c.jsx("span", { className: "badge", children: j.length + k.length })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "home-readings", children: [
        j.map((U) => /* @__PURE__ */ c.jsx(NT, { r: U }, U.name)),
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
        const K = U.id in b ? b[U.id] : U.state === "on", J = Oy.has(U.domain);
        return /* @__PURE__ */ c.jsxs("li", { className: "home-device", title: U.id, children: [
          /* @__PURE__ */ c.jsx("span", { className: `home-device-icon${K && J ? " on" : ""}`, children: /* @__PURE__ */ c.jsx(My, { domain: U.domain }) }),
          /* @__PURE__ */ c.jsxs("span", { className: "home-device-text", children: [
            /* @__PURE__ */ c.jsx("b", { children: U.name }),
            /* @__PURE__ */ c.jsx("small", { children: U.id })
          ] }),
          J ? /* @__PURE__ */ c.jsx("input", { type: "checkbox", className: "switch", checked: !!K, disabled: u !== "" || f !== "", onChange: (B) => {
            g(U, B.target.checked);
          } }) : /* @__PURE__ */ c.jsxs("span", { className: "home-device-state", children: [
            U.state,
            U.unit ? ` ${U.unit}` : ""
          ] })
        ] }, U.id);
      }) })
    ] }),
    (T.length > 0 || X.length > 0) && /* @__PURE__ */ c.jsxs("section", { className: "home-group", children: [
      /* @__PURE__ */ c.jsxs("h3", { className: "section", children: [
        "Actions ",
        /* @__PURE__ */ c.jsx("span", { className: "badge", children: T.length + X.length })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "home-tiles", children: [
        T.map((U) => {
          const K = f === U.name || !!U.running;
          return /* @__PURE__ */ c.jsxs("button", { type: "button", className: `home-tile${K ? " running" : ""}${m === U.name ? " done" : ""}`, disabled: u !== "" && !K || f !== "", onClick: () => {
            y(U.name);
          }, title: `Run "${U.name}"`, children: [
            /* @__PURE__ */ c.jsx("span", { className: "home-tile-icon", children: K ? /* @__PURE__ */ c.jsx(q0, {}) : /* @__PURE__ */ c.jsx(Ld, {}) }),
            /* @__PURE__ */ c.jsx("span", { children: U.name }),
            m === U.name && /* @__PURE__ */ c.jsx("span", { className: "home-tile-feedback", children: "Ran" })
          ] }, U.name);
        }),
        X.map((U) => /* @__PURE__ */ c.jsxs("button", { type: "button", className: `home-tile${f === U.id ? " running" : ""}${m === U.id ? " done" : ""}`, disabled: u !== "" || f !== "", onClick: () => {
          y(U.id);
        }, title: U.id, children: [
          /* @__PURE__ */ c.jsx("span", { className: "home-tile-icon", children: f === U.id ? /* @__PURE__ */ c.jsx(q0, {}) : /* @__PURE__ */ c.jsx(uh, {}) }),
          /* @__PURE__ */ c.jsx("span", { children: U.name }),
          m === U.id && /* @__PURE__ */ c.jsx("span", { className: "home-tile-feedback", children: "Ran" })
        ] }, U.id))
      ] })
    ] })
  ] });
}
function TT({ data: a, placeholder: s, busy: u, act: o }) {
  const [f, d] = Yl.useState(""), [m, p] = Yl.useState("all"), [b, S] = Yl.useState(""), y = a?.books ?? [], g = a?.connected ?? !1, j = y.find((k) => k.id === f), T = async () => {
    const k = b.trim();
    k && await o("cookie", { json: { value: k } }) && S("");
  };
  if (!g || a?.expired)
    return /* @__PURE__ */ c.jsxs("div", { className: `weread${s ? " placeholder" : ""}`, children: [
      /* @__PURE__ */ c.jsxs("div", { className: "weread-connect", children: [
        /* @__PURE__ */ c.jsx("div", { className: "weread-connect-icon", children: /* @__PURE__ */ c.jsx(M2, {}) }),
        /* @__PURE__ */ c.jsx("b", { children: a?.expired ? "WeRead logged you out" : "Connect WeRead" }),
        /* @__PURE__ */ c.jsx("p", { className: "field-hint", children: "Log in at weread.qq.com in a browser, copy the Cookie header from DevTools (Network → any request → Request Headers) and paste it here. It is stored locally and never shown again." }),
        /* @__PURE__ */ c.jsxs("div", { className: "weread-cookie", children: [
          /* @__PURE__ */ c.jsx("input", { className: "input", type: "password", value: b, placeholder: "wr_vid=…; wr_skey=…", autoComplete: "off", spellCheck: !1, disabled: u !== "", onChange: (k) => S(k.target.value), onKeyDown: (k) => {
            k.key === "Enter" && !k.nativeEvent.isComposing && (k.preventDefault(), T());
          } }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "button primary", disabled: u !== "" || b.trim() === "", onClick: () => {
            T();
          }, children: u === "cookie" ? "Connecting…" : "Connect" })
        ] })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: "weread-grid", children: Array.from({ length: 5 }, (k, X) => /* @__PURE__ */ c.jsxs("div", { className: "weread-book ghost", children: [
        /* @__PURE__ */ c.jsx("div", { className: "weread-cover" }),
        /* @__PURE__ */ c.jsx("span", { className: "weread-title" })
      ] }, X)) })
    ] });
  if (j) {
    const k = a?.highlights[j.id], X = k?.chapters.reduce((U, K) => U + K.marks.length, 0) ?? 0, Z = k?.chapters.reduce((U, K) => U + K.notes.length, 0) ?? 0;
    return /* @__PURE__ */ c.jsxs("div", { className: "weread", children: [
      /* @__PURE__ */ c.jsxs("button", { type: "button", className: "text-button back", onClick: () => d(""), children: [
        /* @__PURE__ */ c.jsx(Ky, {}),
        " Shelf"
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "weread-detail-head", children: [
        /* @__PURE__ */ c.jsx(Dy, { book: j }),
        /* @__PURE__ */ c.jsxs("div", { className: "weread-detail-meta", children: [
          /* @__PURE__ */ c.jsx("h3", { children: j.title }),
          /* @__PURE__ */ c.jsxs("small", { children: [
            j.author,
            j.category ? ` · ${j.category}` : ""
          ] }),
          /* @__PURE__ */ c.jsx("div", { className: "weread-detail-status", children: j.finished ? /* @__PURE__ */ c.jsx("span", { className: "badge weread-finished", children: "Finished" }) : /* @__PURE__ */ c.jsx(zy, { value: j.progress, wide: !0 }) }),
          /* @__PURE__ */ c.jsx("small", { children: k ? `${X} highlights · ${Z} notes` : j.noteCount > 0 ? `${j.noteCount} notes on WeRead, not fetched yet` : "No highlights on WeRead" }),
          (j.noteCount > 0 || k) && /* @__PURE__ */ c.jsxs("button", { type: "button", className: "button", disabled: u !== "", onClick: () => {
            o("fetch", { json: { book: j.id } });
          }, children: [
            /* @__PURE__ */ c.jsx(Ud, { className: u === "fetch" ? "spinning" : "" }),
            k ? "Refetch" : "Fetch highlights"
          ] })
        ] })
      ] }),
      k && k.chapters.length > 0 ? k.chapters.map((U, K) => /* @__PURE__ */ c.jsxs("section", { className: "weread-chapter", children: [
        /* @__PURE__ */ c.jsx("h3", { className: "section", children: U.title }),
        U.marks.map((J, B) => /* @__PURE__ */ c.jsx("blockquote", { className: "weread-quote", children: J.text }, `m${B}`)),
        U.notes.map((J, B) => /* @__PURE__ */ c.jsxs("div", { className: "weread-note", children: [
          /* @__PURE__ */ c.jsx(L2, {}),
          /* @__PURE__ */ c.jsx("div", { children: J.text.split(`
`).map((V, se) => /* @__PURE__ */ c.jsx("p", { className: V.startsWith("> ") ? "weread-note-ref" : "", children: V.replace(/^> /, "") }, se)) })
        ] }, `n${B}`))
      ] }, K)) : /* @__PURE__ */ c.jsx("p", { className: "rem-empty", children: k ? "Nothing marked in this book." : "Highlights show up here once fetched." })
    ] });
  }
  const E = y.filter((k) => m === "all" ? !0 : m === "reading" ? !k.finished : m === "finished" ? k.finished : k.noteCount > 0), L = Object.keys(a?.highlights ?? {}).length;
  return /* @__PURE__ */ c.jsxs("div", { className: `weread${s ? " placeholder" : ""}`, children: [
    /* @__PURE__ */ c.jsxs("div", { className: "weread-bar", children: [
      /* @__PURE__ */ c.jsx("div", { className: "weread-filters", children: ["all", "reading", "finished", "notes"].map((k) => /* @__PURE__ */ c.jsx("button", { type: "button", className: `weread-filter${m === k ? " active" : ""}`, onClick: () => p(k), children: k === "all" ? `All ${y.length}` : k === "reading" ? "Reading" : k === "finished" ? "Finished" : "With notes" }, k)) }),
      /* @__PURE__ */ c.jsxs("button", { type: "button", className: "button", disabled: u !== "" || s, title: `${L} books with cached highlights`, onClick: () => {
        o("sync");
      }, children: [
        /* @__PURE__ */ c.jsx(Ud, { className: u === "sync" ? "spinning" : "" }),
        u === "sync" ? "Syncing…" : "Sync highlights"
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
  const [s, u] = Yl.useState(!1);
  return /* @__PURE__ */ c.jsxs("div", { className: "weread-cover", children: [
    a.cover && !s ? /* @__PURE__ */ c.jsx("img", { src: a.cover, alt: "", loading: "lazy", referrerPolicy: "no-referrer", onError: () => u(!0) }) : /* @__PURE__ */ c.jsx(hs, {}),
    a.noteCount > 0 && /* @__PURE__ */ c.jsx("span", { className: "weread-count", title: `${a.noteCount} notes`, children: a.noteCount })
  ] });
}
function zy({ value: a, wide: s }) {
  const u = a === void 0 ? 0 : Math.max(0, Math.min(100, a));
  return /* @__PURE__ */ c.jsxs("span", { className: `weread-progress${s ? " wide" : ""}`, title: a === void 0 ? "In progress" : `${u}%`, children: [
    /* @__PURE__ */ c.jsx("i", { style: { width: `${u}%` } }),
    s && /* @__PURE__ */ c.jsx("small", { children: a === void 0 ? "In progress" : `${u}% read` })
  ] });
}
const Ly = [{ id: "movie", label: "Movies", Icon: Wy }, { id: "book", label: "Books", Icon: hs }, { id: "music", label: "Music", Icon: Jy }], Uy = {
  movie: { wish: "Want to watch", done: "Watched" },
  book: { wish: "Want to read", done: "Read" },
  music: { wish: "Want to listen", done: "Listened" }
}, vu = 48;
function wT({ n: a }) {
  return /* @__PURE__ */ c.jsx("span", { className: "douban-stars", "aria-label": `${a} of 5`, children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ c.jsx(I2, { className: s <= a ? "" : "off" }, s)) });
}
function kT({ item: a }) {
  const [s, u] = x.useState(!1), o = a.kind === "movie" ? y2 : a.kind === "book" ? hs : Jy;
  return /* @__PURE__ */ c.jsx("div", { className: `douban-cover${a.kind === "music" ? " music" : ""}`, children: a.cover && !s ? /* @__PURE__ */ c.jsx("img", { src: a.cover, alt: "", loading: "lazy", referrerPolicy: "no-referrer", onError: () => u(!0) }) : /* @__PURE__ */ c.jsx("span", { className: "douban-blank", children: /* @__PURE__ */ c.jsx(o, {}) }) });
}
function AT({ data: a, placeholder: s }) {
  const [u, o] = x.useState("movie"), [f, d] = x.useState("wish"), [m, p] = x.useState(""), [b, S] = x.useState(vu), y = x.useMemo(() => {
    const T = m.trim().toLowerCase(), E = T ? T.split(/\s+/) : [];
    return (a?.items ?? []).filter((L) => L.kind === u && L.status === f && (E.length === 0 || E.every((k) => L.title.toLowerCase().includes(k) || (L.comment ?? "").toLowerCase().includes(k))));
  }, [a, u, f, m]);
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
  const g = (T, E) => {
    o(T), d(E), S(vu);
  }, j = y.slice(0, b);
  return /* @__PURE__ */ c.jsxs("div", { className: "douban", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "douban-bar", children: [
      /* @__PURE__ */ c.jsx("div", { className: "douban-tabs", children: Ly.map((T) => /* @__PURE__ */ c.jsxs("button", { type: "button", className: `douban-tab${T.id === u ? " active" : ""}`, onClick: () => g(T.id, f), children: [
        /* @__PURE__ */ c.jsx(T.Icon, {}),
        T.label,
        /* @__PURE__ */ c.jsx("small", { children: a.counts[T.id].wish + a.counts[T.id].done })
      ] }, T.id)) }),
      /* @__PURE__ */ c.jsxs("span", { className: "douban-seg", children: [
        /* @__PURE__ */ c.jsx("button", { type: "button", className: f === "wish" ? "active" : "", onClick: () => g(u, "wish"), children: "Wish" }),
        /* @__PURE__ */ c.jsx("button", { type: "button", className: f === "done" ? "active" : "", onClick: () => g(u, "done"), children: "Done" })
      ] }),
      /* @__PURE__ */ c.jsxs("label", { className: "douban-search", children: [
        /* @__PURE__ */ c.jsx(wc, {}),
        /* @__PURE__ */ c.jsx("input", { className: "input", value: m, placeholder: `Search ${Uy[u][f].toLowerCase()}…`, onChange: (T) => {
          p(T.target.value), S(vu);
        } })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "douban-meta", children: [
      /* @__PURE__ */ c.jsxs("span", { children: [
        Uy[u][f],
        " · ",
        m ? `${y.length} of ${a.counts[u][f]}` : a.counts[u][f],
        !m && a.counts[u][f] > y.length ? ` (${y.length} loaded)` : ""
      ] }),
      /* @__PURE__ */ c.jsx("a", { href: `https://${u}.douban.com/people/${encodeURIComponent(a.uid)}/${f === "wish" ? "wish" : "collect"}`, target: "_blank", rel: "noreferrer", children: "Open on Douban" })
    ] }),
    y.length === 0 && /* @__PURE__ */ c.jsx("p", { className: "rem-empty", children: m ? `Nothing matching "${m}".` : "Nothing here yet." }),
    y.length > 0 && /* @__PURE__ */ c.jsx("div", { className: "douban-grid", children: j.map((T) => /* @__PURE__ */ c.jsxs("a", { className: "douban-tile", href: T.url, target: "_blank", rel: "noreferrer", title: T.comment ? `${T.title}
${T.comment}` : T.title, children: [
      /* @__PURE__ */ c.jsx(kT, { item: T }),
      /* @__PURE__ */ c.jsx("b", { children: T.title }),
      /* @__PURE__ */ c.jsxs("small", { children: [
        T.status === "done" && T.rating ? /* @__PURE__ */ c.jsx(wT, { n: T.rating }) : null,
        /* @__PURE__ */ c.jsx("span", { children: T.date })
      ] }),
      T.status === "done" && T.comment ? /* @__PURE__ */ c.jsx("span", { className: "douban-comment", children: T.comment }) : null
    ] }, `${T.kind}-${T.id}`)) }),
    y.length > b && /* @__PURE__ */ c.jsxs("button", { type: "button", className: "button douban-more", onClick: () => S((T) => T + vu), children: [
      "Show more (",
      y.length - b,
      " left)"
    ] })
  ] });
}
function Hy({ leg: a, kind: s }) {
  const u = s === "dep" ? Y2 : q2;
  if (!a) return /* @__PURE__ */ c.jsxs("div", { className: `fl-leg ${s}`, children: [
    /* @__PURE__ */ c.jsx(u, {}),
    /* @__PURE__ */ c.jsx("b", { children: "—" })
  ] });
  const o = [a.terminal ? `T${a.terminal}` : "", a.gate ? `Gate ${a.gate}` : ""].filter(Boolean).join(" · ");
  return /* @__PURE__ */ c.jsxs("div", { className: `fl-leg ${s}`, children: [
    /* @__PURE__ */ c.jsx(u, {}),
    /* @__PURE__ */ c.jsx("div", { className: "fl-code", children: a.iata }),
    /* @__PURE__ */ c.jsx("div", { className: "fl-time", children: a.revisedTime ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("s", { children: a.time }),
      " ",
      a.revisedTime
    ] }) : a.time }),
    /* @__PURE__ */ c.jsx("div", { className: "fl-city", children: a.city || a.name }),
    o && /* @__PURE__ */ c.jsx("div", { className: "fl-meta", children: o })
  ] });
}
function _T({ data: a, placeholder: s, busy: u, act: o }) {
  const f = a?.flights ?? [];
  return a?.hasKey ? f.length ? /* @__PURE__ */ c.jsx("div", { className: "fl", children: f.map((d) => /* @__PURE__ */ c.jsxs("article", { className: `fl-card ${d.tone}`, children: [
    /* @__PURE__ */ c.jsxs("header", { children: [
      /* @__PURE__ */ c.jsx("b", { children: d.number }),
      /* @__PURE__ */ c.jsxs("span", { className: "fl-airline", children: [
        d.airline,
        d.aircraft ? ` · ${d.aircraft}` : ""
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: "fl-date", children: d.dateLabel }),
      /* @__PURE__ */ c.jsx("button", { type: "button", className: "fl-x", title: "Stop following", disabled: u === "untrack", onClick: () => {
        o("untrack", { json: { value: d.id } });
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
        CT(d.at)
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
function CT(a) {
  const s = Math.round((Date.now() - Date.parse(a)) / 6e4);
  return s < 1 ? "just now" : s < 60 ? `${s} min ago` : s < 2160 ? `${Math.round(s / 60)} h ago` : `${Math.round(s / 1440)} d ago`;
}
const OT = { health: "Health", calendar: "Calendar", tasks: "Tasks", mail: "Mail", notes: "Notes", finance: "Finance", location: "Location", travel: "Travel", media: "Media", other: "Other" }, RT = { health: C2, calendar: m2, tasks: _c, location: Dd, notes: av, mail: lv, travel: rs, media: Wy }, MT = { weather: Fy, contacts: cv, photos: Tc, home: Nu, weread: hs, gmail: lv, flights: rs, images: Tc }, DT = { reminders: ["add"], location: ["setHome", "location"], home: ["run"], weread: ["sync", "cookie", "fetch", "disconnect"], photos: ["thumb"], weather: ["untrip"], flights: ["untrack"] };
function zT({ open: a, onOpenChange: s, version: u, notify: o }) {
  const [f, d] = x.useState(null), [m, p] = x.useState(""), [b, S] = x.useState(""), y = x.useCallback(() => {
    Yn("/sources").then((T) => {
      d(T.sources), p((E) => T.sources.some((L) => L.id === E) ? E : T.sources[0]?.id ?? "");
    }).catch((T) => o(`Could not load connectors: ${T.message}`));
  }, [o]);
  x.useEffect(() => {
    a && y();
  }, [a, u, y]);
  const g = f?.find((T) => T.id === m), j = async (T, E) => {
    if (!g) return !1;
    S(T);
    try {
      const L = E?.file ? { method: "POST", headers: { "content-type": E.file.type || "application/octet-stream" }, body: E.file } : { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(E?.json ?? {}) }, k = await fetch(ut(`/sources/${encodeURIComponent(g.id)}/${encodeURIComponent(T)}`), L), X = await k.json().catch(() => ({}));
      if (!k.ok) throw new Error(X.error ?? k.statusText);
      return X.message && o(X.message), y(), !0;
    } catch (L) {
      return o(`${g.label}: ${L.message}`), !1;
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
          const E = MT[T.id] ?? RT[T.category] ?? rh;
          return /* @__PURE__ */ c.jsxs("button", { type: "button", className: `src-item${T.id === m ? " active" : ""}`, onClick: () => p(T.id), children: [
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
        g ? /* @__PURE__ */ c.jsx(UT, { source: g, busy: b, act: j }, g.id) : f !== null && f.length === 0 ? /* @__PURE__ */ c.jsx(LT, {}) : null
      ] })
    ] })
  ] }) });
}
function LT() {
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
function UT({ source: a, busy: s, act: u }) {
  const o = a.view, f = (o.actions ?? []).find((S) => S.kind === "toggle"), d = (o.actions ?? []).find((S) => S.id === "refresh"), m = DT[a.id] ?? [], p = (o.actions ?? []).filter((S) => S.kind !== "toggle" && S.id !== "refresh" && !m.includes(S.id)), b = a.id === "calendar" ? /* @__PURE__ */ c.jsx(XT, { data: o.data, placeholder: o.status !== "connected" }) : a.id === "reminders" ? /* @__PURE__ */ c.jsx(ZT, { data: o.data, busy: s, act: u, placeholder: o.status !== "connected" }) : a.id === "weather" ? /* @__PURE__ */ c.jsx(QT, { data: o.data, placeholder: o.status !== "connected", act: u }) : a.id === "flights" ? /* @__PURE__ */ c.jsx(_T, { data: o.data, busy: s, act: u, placeholder: o.status !== "connected" }) : a.id === "contacts" ? /* @__PURE__ */ c.jsx(eT, { data: o.data, placeholder: o.status !== "connected", busy: s, act: u }) : a.id === "notes" ? /* @__PURE__ */ c.jsx(nT, { data: o.data, placeholder: o.status !== "connected", busy: s, act: u }) : a.id === "photos" ? /* @__PURE__ */ c.jsx(uT, { data: o.data, placeholder: o.status !== "connected", busy: s, act: u }) : a.id === "messages" ? /* @__PURE__ */ c.jsx(mT, { data: o.data, placeholder: o.status !== "connected", busy: s, act: u }) : a.id === "location" ? /* @__PURE__ */ c.jsx(bT, { data: o.data, placeholder: o.status !== "connected", busy: s, act: u }) : a.id === "home" ? /* @__PURE__ */ c.jsx(ET, { data: o.data, placeholder: o.status !== "connected", busy: s, act: u }) : a.id === "weread" ? /* @__PURE__ */ c.jsx(TT, { data: o.data, placeholder: o.status !== "connected", busy: s, act: u }) : a.id === "douban" ? /* @__PURE__ */ c.jsx(AT, { data: o.data, placeholder: o.status !== "connected", busy: s, act: u }) : /* @__PURE__ */ c.jsx(BT, { view: o });
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsxs("header", { className: "src-head", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "src-titles", children: [
        /* @__PURE__ */ c.jsxs("h2", { children: [
          a.label,
          " ",
          /* @__PURE__ */ c.jsx("span", { className: "badge", children: OT[a.category] ?? a.category })
        ] }),
        /* @__PURE__ */ c.jsx("p", { className: `source-summary ${o.status}`, children: o.summary })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "src-head-actions", children: [
        f && /* @__PURE__ */ c.jsxs("label", { className: "src-shared", title: f.hint, children: [
          /* @__PURE__ */ c.jsx("span", { children: f.label }),
          /* @__PURE__ */ c.jsx("input", { type: "checkbox", className: "switch", checked: !!f.value, disabled: s !== "", onChange: (S) => {
            u(f.id, { json: { value: S.target.checked } });
          } })
        ] }),
        d && /* @__PURE__ */ c.jsx("button", { type: "button", className: `icon-button${s === "refresh" ? " spinning" : ""}`, title: "Refresh", disabled: s !== "", onClick: () => {
          u("refresh");
        }, children: /* @__PURE__ */ c.jsx(Ud, {}) })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "src-body", children: [
      o.status === "error" && /* @__PURE__ */ c.jsx("div", { className: "src-error", children: o.summary }),
      b,
      o.setup?.length || p.length ? /* @__PURE__ */ c.jsxs("div", { className: "src-setup", children: [
        o.setup?.map((S) => /* @__PURE__ */ c.jsxs("details", { className: "details", open: o.status !== "connected", children: [
          /* @__PURE__ */ c.jsx("summary", { children: S.title }),
          /* @__PURE__ */ c.jsx("ol", { className: "setup-steps", children: S.steps.map((y, g) => /* @__PURE__ */ c.jsx("li", { children: y }, g)) }),
          S.fields?.map((y) => /* @__PURE__ */ c.jsx(qT, { label: y.label, value: y.value, secret: y.secret }, y.label))
        ] }, S.title)),
        p.length > 0 && /* @__PURE__ */ c.jsx(HT, { actions: p, busy: s, act: u })
      ] }) : null
    ] })
  ] });
}
function HT({ actions: a, busy: s, act: u }) {
  const o = x.useRef(null), f = x.useRef("");
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
            f.current = d.id, o.current && (o.current.accept = d.accept ?? ""), o.current?.click();
            return;
          }
          if (!(d.kind === "danger" && d.confirm && !window.confirm(d.confirm))) {
            if (d.kind === "input") {
              const m = window.prompt(d.hint ?? d.label, d.placeholder ?? "");
              if (m === null || m.trim() === "") return;
              u(d.id, { json: { value: m.trim() } });
              return;
            }
            u(d.id);
          }
        },
        children: [
          d.kind === "upload" && /* @__PURE__ */ c.jsx(oh, {}),
          s === d.id ? "Working…" : d.label
        ]
      },
      d.id
    )),
    /* @__PURE__ */ c.jsx("input", { ref: o, type: "file", hidden: !0, onChange: (d) => {
      const m = d.target.files?.[0];
      d.target.value = "", m && u(f.current, { file: m });
    } })
  ] });
}
function BT({ view: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: `source${a.placeholder ? " placeholder" : ""}`, children: [
    a.stats && a.stats.length > 0 && /* @__PURE__ */ c.jsx("div", { className: "stat-grid", children: a.stats.map((s) => /* @__PURE__ */ c.jsxs("div", { className: "stat", children: [
      /* @__PURE__ */ c.jsx("small", { children: s.label }),
      /* @__PURE__ */ c.jsx("b", { children: s.value }),
      s.delta && /* @__PURE__ */ c.jsx("span", { className: `stat-delta ${s.tone ?? "flat"}`, children: s.delta })
    ] }, s.label)) }),
    a.series?.map((s) => /* @__PURE__ */ c.jsx($T, { series: s }, s.label)),
    a.lists?.map((s) => /* @__PURE__ */ c.jsxs("section", { children: [
      /* @__PURE__ */ c.jsx("h3", { className: "section", children: s.title }),
      /* @__PURE__ */ c.jsx("ul", { className: "source-list", children: s.items.map((u, o) => /* @__PURE__ */ c.jsxs("li", { children: [
        /* @__PURE__ */ c.jsx("span", { children: u.primary }),
        u.secondary && /* @__PURE__ */ c.jsx("small", { children: u.secondary })
      ] }, o)) })
    ] }, s.title)),
    a.placeholder && /* @__PURE__ */ c.jsx("p", { className: "field-hint", style: { marginTop: 12 }, children: "A preview of what will show up here once data arrives." })
  ] });
}
function $T({ series: a }) {
  const s = a.points.map((p) => p.value).filter((p) => p !== void 0), u = Math.max(1, ...s), o = Math.min(...s), d = s.length > 1 && o > 0 && (u - o) / u < 0.35 ? o - (u - o) * 0.5 : 0, m = (p) => Math.max(4, (p - d) / (u - d) * 100);
  return /* @__PURE__ */ c.jsxs("section", { className: "bars", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "bars-head", children: [
      /* @__PURE__ */ c.jsx("h3", { className: "section", children: a.label }),
      /* @__PURE__ */ c.jsx("small", { children: s.length === 0 ? "" : `avg ${(s.reduce((p, b) => p + b, 0) / s.length).toFixed(a.unit === "" ? 0 : 1)}${a.unit ? ` ${a.unit}` : ""}` })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: "bars-row", children: a.points.map((p) => /* @__PURE__ */ c.jsxs("div", { className: "bar-col", title: `${p.day.replace("T", " ")}: ${p.value === void 0 ? "no data" : `${p.value}${a.unit ? ` ${a.unit}` : ""}`}`, children: [
      /* @__PURE__ */ c.jsx("div", { className: `bar${p.value === void 0 ? " none" : ""}`, style: { height: `${p.value === void 0 ? 4 : m(p.value)}%` } }),
      /* @__PURE__ */ c.jsx("small", { children: p.day.includes("T") ? p.day.slice(11, 13) : p.day.slice(8) })
    ] }, p.day)) })
  ] });
}
function qT({ label: a, value: s, secret: u }) {
  const [o, f] = x.useState(!1), [d, m] = x.useState(!u);
  return /* @__PURE__ */ c.jsxs("div", { className: "copy-field", children: [
    /* @__PURE__ */ c.jsx("small", { children: a }),
    /* @__PURE__ */ c.jsx("code", { onClick: () => m(!0), title: d ? void 0 : "Click to reveal", children: d ? s : "•".repeat(Math.min(24, s.length)) }),
    /* @__PURE__ */ c.jsx("button", { type: "button", className: "icon-button small", title: "Copy", onClick: () => {
      navigator.clipboard.writeText(s).then(() => {
        f(!0), window.setTimeout(() => f(!1), 1200);
      });
    }, children: o ? /* @__PURE__ */ c.jsx(si, {}) : /* @__PURE__ */ c.jsx(sh, {}) })
  ] });
}
const ah = (a) => String(a).padStart(2, "0"), _h = (a) => `${a.getFullYear()}-${ah(a.getMonth() + 1)}-${ah(a.getDate())}`, bl = (a, s) => {
  const u = /* @__PURE__ */ new Date(`${a}T12:00:00`);
  return u.setDate(u.getDate() + s), _h(u);
}, cs = (a) => (/* @__PURE__ */ new Date(`${a}T12:00:00`)).getDay(), Ch = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], v1 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], bu = (a) => Number(a.slice(11, 13)) * 60 + Number(a.slice(14, 16)), li = (a) => a.slice(11, 16), YT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], GT = (a, s) => a === s ? "Today" : a === bl(s, 1) ? "Tomorrow" : `${Ch[cs(a)]}, ${YT[Number(a.slice(5, 7)) - 1]} ${Number(a.slice(8))}${a.slice(0, 4) === s.slice(0, 4) ? "" : ` ${a.slice(0, 4)}`}`, VT = (a, s) => a === s ? "Today" : a === bl(s, 1) ? "Tomorrow" : a === bl(s, -1) ? "Yesterday" : `${Ch[cs(a)]}, ${v1[Number(a.slice(5, 7)) - 1]} ${Number(a.slice(8))}`;
function XT({ data: a, placeholder: s }) {
  const u = a?.today ?? _h(/* @__PURE__ */ new Date()), o = a?.events ?? [], [f, d] = x.useState(u), [m, p] = x.useState(() => bl(u, -((cs(u) + 6) % 7))), b = Array.from({ length: 7 }, (B, V) => bl(m, V)), S = (B) => o.filter((V) => V.start.slice(0, 10) === B || V.allDay && V.start.slice(0, 10) <= B && V.end.slice(0, 10) > B), y = (B) => B >= bl(u, -((cs(u) + 6) % 7)) && B < bl(u, 14), g = S(f), j = g.filter((B) => !B.allDay).sort((B, V) => B.start.localeCompare(V.start)), T = g.filter((B) => B.allDay), E = (B) => B.end.slice(0, 10) > B.start.slice(0, 10) ? 1440 : bu(B.end), L = j.length ? Math.min(...j.map((B) => bu(B.start))) : 540, k = j.length ? Math.max(...j.map(E)) : 1080, X = Math.max(0, Math.min(8, Math.floor(L / 60) - 1)), Z = Math.min(24, Math.max(19, Math.ceil(k / 60) + 1)), U = (Z - X) * 60, K = x.useMemo(() => {
    const B = [];
    let V = [], se = [], Ee = -1;
    const ue = () => {
      for (const ve of se) ve.cols = V.length;
      se = [], V = [];
    };
    for (const ve of j) {
      const me = bu(ve.start), Ue = Math.max(me + 15, E(ve));
      me >= Ee && ue();
      let Ge = V.findIndex((W) => W <= me);
      Ge === -1 ? (V.push(Ue), Ge = V.length - 1) : V[Ge] = Ue, Ee = Math.max(Ee, Ue);
      const Re = { e: ve, col: Ge, cols: 1 };
      se.push(Re), B.push(Re);
    }
    return ue(), B;
  }, [j]), J = u === f ? (/* @__PURE__ */ new Date()).getHours() * 60 + (/* @__PURE__ */ new Date()).getMinutes() : -1;
  return /* @__PURE__ */ c.jsxs("div", { className: `cal${s ? " placeholder" : ""}`, children: [
    /* @__PURE__ */ c.jsxs("div", { className: "cal-week-head", children: [
      /* @__PURE__ */ c.jsx("button", { type: "button", className: "icon-button small", onClick: () => p(bl(m, -7)), "aria-label": "Previous week", children: /* @__PURE__ */ c.jsx(Ky, {}) }),
      /* @__PURE__ */ c.jsxs("b", { children: [
        v1[Number(m.slice(5, 7)) - 1],
        " ",
        m.slice(0, 4)
      ] }),
      /* @__PURE__ */ c.jsx("button", { type: "button", className: "text-button", onClick: () => {
        p(bl(u, -((cs(u) + 6) % 7))), d(u);
      }, children: "Today" }),
      /* @__PURE__ */ c.jsx("button", { type: "button", className: "icon-button small", onClick: () => p(bl(m, 7)), "aria-label": "Next week", children: /* @__PURE__ */ c.jsx(Iy, {}) })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: "cal-week", children: b.map((B) => {
      const V = S(B);
      return /* @__PURE__ */ c.jsxs("button", { type: "button", className: `cal-day${B === f ? " selected" : ""}${B === u ? " today" : ""}${y(B) ? "" : " unknown"}`, onClick: () => d(B), children: [
        /* @__PURE__ */ c.jsx("small", { children: Ch[cs(B)] }),
        /* @__PURE__ */ c.jsx("b", { children: Number(B.slice(8)) }),
        /* @__PURE__ */ c.jsx("span", { className: "cal-dots", children: V.slice(0, 4).map((se) => /* @__PURE__ */ c.jsx("i", { style: { background: se.color || "var(--brand)" } }, se.id)) })
      ] }, B);
    }) }),
    /* @__PURE__ */ c.jsxs("div", { className: "cal-day-head", children: [
      /* @__PURE__ */ c.jsx("h3", { children: VT(f, u) }),
      /* @__PURE__ */ c.jsx("small", { children: g.length === 0 ? y(f) ? "Nothing scheduled" : "Not loaded" : `${g.length} event${g.length === 1 ? "" : "s"}` })
    ] }),
    T.length > 0 && /* @__PURE__ */ c.jsx("div", { className: "cal-allday", children: T.map((B) => /* @__PURE__ */ c.jsxs("span", { className: "cal-chip", style: { borderColor: B.color || "var(--brand)" }, children: [
      B.title,
      /* @__PURE__ */ c.jsx("small", { children: B.calendar })
    ] }, B.id)) }),
    /* @__PURE__ */ c.jsxs("div", { className: "cal-grid", style: { height: `${(Z - X) * 44}px` }, children: [
      Array.from({ length: Z - X }, (B, V) => /* @__PURE__ */ c.jsx("div", { className: "cal-hour", style: { top: `${V / (Z - X) * 100}%` }, children: /* @__PURE__ */ c.jsxs("small", { children: [
        ah(X + V),
        ":00"
      ] }) }, V)),
      J >= X * 60 && J <= Z * 60 && /* @__PURE__ */ c.jsx("div", { className: "cal-now", style: { top: `${(J - X * 60) / U * 100}%` } }),
      K.map(({ e: B, col: V, cols: se }) => {
        const Ee = bu(B.start), ue = Math.max(Ee + 20, E(B));
        return /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: `cal-event${B.status === "canceled" ? " canceled" : ""}${ue - Ee < 40 ? " short" : ""}`,
            title: `${li(B.start)}–${li(B.end)} ${B.title}${B.location ? ` @ ${B.location}` : ""}`,
            style: { top: `${(Ee - X * 60) / U * 100}%`, height: `${(ue - Ee) / U * 100}%`, left: `calc(52px + (100% - 60px) * ${V / se})`, width: `calc((100% - 60px) * ${1 / se} - 4px)`, borderLeftColor: B.color || "var(--brand)", background: `color-mix(in oklab, ${B.color || "var(--brand)"} 14%, var(--card))` },
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
      j.length === 0 && /* @__PURE__ */ c.jsx("div", { className: "cal-free", children: s ? "Waiting for calendar access" : "Free" })
    ] })
  ] });
}
function ZT({ data: a, busy: s, act: u, placeholder: o }) {
  const f = a?.today ?? _h(/* @__PURE__ */ new Date()), [d, m] = x.useState(""), [p, b] = x.useState(/* @__PURE__ */ new Set()), S = (a?.reminders ?? []).filter((E) => !p.has(E.id)), y = [
    ["Overdue", S.filter((E) => E.due !== null && E.due.slice(0, 10) < f)],
    ["Today", S.filter((E) => E.due !== null && E.due.slice(0, 10) === f)],
    ["Coming up", S.filter((E) => E.due !== null && E.due.slice(0, 10) > f).sort((E, L) => E.due.localeCompare(L.due))],
    ["No date", S.filter((E) => E.due === null)]
  ], g = async (E) => {
    b((k) => new Set(k).add(E.id)), await u("complete", { json: { value: E.id } }) || b((k) => {
      const X = new Set(k);
      return X.delete(E.id), X;
    });
  }, j = async () => {
    const E = d.trim();
    E && await u("add", { json: { value: E } }) && m("");
  }, T = (E) => E.due === null ? "" : `${GT(E.due.slice(0, 10), f)}${E.hasTime ? ` ${li(E.due)}` : ""}`;
  return /* @__PURE__ */ c.jsxs("div", { className: `rem${o ? " placeholder" : ""}`, children: [
    /* @__PURE__ */ c.jsxs("div", { className: "rem-add", children: [
      /* @__PURE__ */ c.jsx("input", { className: "input", value: d, placeholder: "Add a reminder… e.g. Call mum tomorrow 18:00", disabled: s !== "" || o, onChange: (E) => m(E.target.value), onKeyDown: (E) => {
        E.key === "Enter" && !E.nativeEvent.isComposing && (E.preventDefault(), j());
      } }),
      /* @__PURE__ */ c.jsx("button", { type: "button", className: "button primary", disabled: s !== "" || d.trim() === "", onClick: () => {
        j();
      }, children: s === "add" ? "Adding…" : "Add" })
    ] }),
    S.length === 0 && /* @__PURE__ */ c.jsx("p", { className: "rem-empty", children: o ? "Waiting for reminders access" : "All clear. Nothing open." }),
    y.filter(([, E]) => E.length > 0).map(([E, L]) => /* @__PURE__ */ c.jsxs("section", { className: "rem-group", children: [
      /* @__PURE__ */ c.jsxs("h3", { className: "section", children: [
        E,
        " ",
        /* @__PURE__ */ c.jsx("span", { className: "badge", children: L.length })
      ] }),
      /* @__PURE__ */ c.jsx("ul", { className: "rem-list", children: L.map((k) => /* @__PURE__ */ c.jsxs("li", { className: `rem-row${E === "Overdue" ? " overdue" : ""}`, children: [
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "rem-check", title: "Mark done", disabled: s !== "", onClick: () => {
          g(k);
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
  const u = a === 0 || a === 1 ? s ? H2 : F2 : a === 2 ? Fy : a === 3 ? Md : a <= 48 ? b2 : a <= 57 ? v2 : a <= 67 || a >= 80 && a <= 82 ? S2 : a <= 77 || a === 85 || a === 86 ? j2 : a >= 95 ? x2 : Md;
  return /* @__PURE__ */ c.jsx(u, {});
}
function QT({ data: a, placeholder: s, act: u }) {
  if (!a) return /* @__PURE__ */ c.jsx("div", { className: "wx placeholder", children: /* @__PURE__ */ c.jsxs("div", { className: "wx-hero", children: [
    /* @__PURE__ */ c.jsx("div", { className: "wx-icon", children: /* @__PURE__ */ c.jsx(Md, {}) }),
    /* @__PURE__ */ c.jsx("div", { className: "wx-temp", children: "—" }),
    /* @__PURE__ */ c.jsx("div", { className: "wx-desc", children: /* @__PURE__ */ c.jsx("b", { children: s ? "Waiting for the forecast" : "" }) })
  ] }) });
  const o = (p) => String(Math.round(p)), f = Math.min(...a.daily.map((p) => p.min)), d = Math.max(...a.daily.map((p) => p.max)), m = Math.max(1, d - f);
  return /* @__PURE__ */ c.jsxs("div", { className: "wx", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "wx-hero", children: [
      /* @__PURE__ */ c.jsx("div", { className: "wx-icon", children: /* @__PURE__ */ c.jsx(xu, { code: a.current.code, night: !a.current.isDay }) }),
      /* @__PURE__ */ c.jsxs("div", { className: "wx-temp", children: [
        o(a.current.temp),
        /* @__PURE__ */ c.jsx("span", { children: a.units.deg })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "wx-desc", children: [
        /* @__PURE__ */ c.jsx("b", { children: a.current.text }),
        /* @__PURE__ */ c.jsxs("small", { children: [
          "Feels like ",
          o(a.current.feels),
          a.units.deg,
          " · humidity ",
          a.current.humidity,
          "% · wind ",
          o(a.current.wind),
          " ",
          a.units.wind
        ] }),
        /* @__PURE__ */ c.jsx("small", { children: a.daily[0] ? `High ${o(a.daily[0].max)} · low ${o(a.daily[0].min)} · UV ${o(a.daily[0].uv)} · sun ${li(a.daily[0].sunrise)}–${li(a.daily[0].sunset)}` : "" })
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: "wx-hours", children: a.hourly.map((p, b) => /* @__PURE__ */ c.jsxs("div", { className: "wx-hour", children: [
      /* @__PURE__ */ c.jsx("small", { children: b === 0 ? "Now" : `${p.time.slice(11, 13)}h` }),
      /* @__PURE__ */ c.jsx(xu, { code: p.code, night: Number(p.time.slice(11, 13)) < 6 || Number(p.time.slice(11, 13)) >= 19 }),
      /* @__PURE__ */ c.jsxs("b", { children: [
        o(p.temp),
        "°"
      ] }),
      /* @__PURE__ */ c.jsx("small", { className: `wx-rain${p.rain >= 30 ? " on" : ""}`, children: p.rain >= 20 ? `${p.rain}%` : "" })
    ] }, p.time)) }),
    /* @__PURE__ */ c.jsx("ul", { className: "wx-days", children: a.daily.map((p) => /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("span", { className: "wx-day", children: p.label }),
      /* @__PURE__ */ c.jsx("span", { className: "wx-day-icon", children: /* @__PURE__ */ c.jsx(xu, { code: p.code }) }),
      /* @__PURE__ */ c.jsx("span", { className: "wx-day-text", children: p.text }),
      /* @__PURE__ */ c.jsx("span", { className: `wx-rain${p.rain >= 30 ? " on" : ""}`, children: p.rain >= 20 ? `${p.rain}%` : "" }),
      /* @__PURE__ */ c.jsxs("span", { className: "wx-lo", children: [
        o(p.min),
        "°"
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: "wx-range", children: /* @__PURE__ */ c.jsx("i", { style: { left: `${(p.min - f) / m * 100}%`, width: `${Math.max(6, (p.max - p.min) / m * 100)}%` } }) }),
      /* @__PURE__ */ c.jsxs("span", { className: "wx-hi", children: [
        o(p.max),
        "°"
      ] })
    ] }, p.day)) }),
    (a.trips ?? []).map((p) => {
      const b = Math.min(...p.days.map((g) => g.min), f), S = Math.max(...p.days.map((g) => g.max), d), y = Math.max(1, S - b);
      return /* @__PURE__ */ c.jsxs("section", { className: "wx-trip", children: [
        /* @__PURE__ */ c.jsxs("header", { children: [
          /* @__PURE__ */ c.jsx(rs, {}),
          /* @__PURE__ */ c.jsxs("div", { children: [
            /* @__PURE__ */ c.jsxs("b", { children: [
              p.name,
              ", ",
              p.country
            ] }),
            /* @__PURE__ */ c.jsxs("small", { children: [
              p.label || "Watching",
              p.inDays !== void 0 && p.inDays > 0 ? ` · in ${p.inDays} day${p.inDays === 1 ? "" : "s"}` : p.inDays !== void 0 && p.inDays <= 0 && p.to ? " · now" : "",
              p.current ? ` · now ${o(p.current.temp)}${a.units.deg} ${p.current.text}` : ""
            ] })
          ] }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "wx-trip-x", title: "Stop following", onClick: () => {
            u("untrip", { json: { value: p.id } });
          }, children: /* @__PURE__ */ c.jsx(Sl, {}) })
        ] }),
        p.days.length ? /* @__PURE__ */ c.jsx("ul", { className: "wx-days", children: p.days.map((g) => /* @__PURE__ */ c.jsxs("li", { children: [
          /* @__PURE__ */ c.jsx("span", { className: "wx-day", children: g.label }),
          /* @__PURE__ */ c.jsx("span", { className: "wx-day-icon", children: /* @__PURE__ */ c.jsx(xu, { code: g.code }) }),
          /* @__PURE__ */ c.jsx("span", { className: "wx-day-text", children: g.text }),
          /* @__PURE__ */ c.jsx("span", { className: `wx-rain${g.rain >= 30 ? " on" : ""}`, children: g.rain >= 20 ? `${g.rain}%` : "" }),
          /* @__PURE__ */ c.jsxs("span", { className: "wx-lo", children: [
            o(g.min),
            "°"
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: "wx-range", children: /* @__PURE__ */ c.jsx("i", { style: { left: `${(g.min - b) / y * 100}%`, width: `${Math.max(6, (g.max - g.min) / y * 100)}%` } }) }),
          /* @__PURE__ */ c.jsxs("span", { className: "wx-hi", children: [
            o(g.max),
            "°"
          ] })
        ] }, g.day)) }) : /* @__PURE__ */ c.jsx("p", { className: "wx-trip-note", children: p.note || "No forecast yet" })
      ] }, p.id);
    })
  ] });
}
const KT = {
  reading: hs,
  writing: $2,
  searching: wc,
  running: J2,
  waiting: O2,
  failed: sv,
  done: si,
  idle: uh
};
function IT() {
  const [a, s] = x.useState(() => {
    const o = localStorage.getItem("aibo-chat-theme");
    return o === "light" || o === "dark" ? o : "system";
  });
  return x.useEffect(() => {
    const o = matchMedia("(prefers-color-scheme: dark)"), f = () => {
      document.documentElement.classList.toggle("dark", a === "dark" || a === "system" && o.matches);
    };
    if (f(), a === "system")
      return o.addEventListener("change", f), () => o.removeEventListener("change", f);
  }, [a]), [a, (o) => {
    s(o), o === "system" ? localStorage.removeItem("aibo-chat-theme") : localStorage.setItem("aibo-chat-theme", o);
  }];
}
const FT = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA", By = typeof MediaSource < "u" && MediaSource.isTypeSupported("audio/mpeg");
function JT(a, s) {
  const [u, o] = x.useState(""), [f, d] = x.useState(!1), m = x.useRef(0), p = x.useRef(null), b = x.useRef(!1), S = x.useRef(null), y = x.useRef(null), g = x.useRef(null), j = x.useRef(/* @__PURE__ */ new Map()), T = (K, J) => {
    const B = j.current;
    for (B.delete(K), B.set(K, J); B.size > 24; ) {
      const V = B.keys().next().value;
      if (V === void 0) break;
      B.delete(V);
    }
  }, E = () => {
    if (!p.current) {
      const K = new Audio();
      K.preload = "auto", p.current = K;
    }
    return p.current;
  }, L = x.useCallback(() => {
    m.current += 1, y.current?.abort(), y.current = null, S.current = null, p.current && (p.current.pause(), p.current.onended = null, p.current.onerror = null), g.current && (URL.revokeObjectURL(g.current), g.current = null), d(!1), o("");
  }, []), k = x.useCallback(async (K, J) => {
    const B = E();
    B.onended = () => {
      J === m.current && L();
    }, B.onerror = () => {
      J === m.current && (L(), o(tl("speech_error")));
    }, B.src = K, await B.play(), J === m.current && (d(!0), o("Speaking…"));
  }, [L]), X = x.useCallback(async (K, J) => {
    try {
      await k(K, J);
    } catch (B) {
      if (B instanceof DOMException && B.name === "NotAllowedError")
        S.current = () => k(K, J), o("Click or press a key to hear the reply");
      else throw B;
    }
  }, [k]), Z = x.useCallback(async (K, J) => {
    const B = new MediaSource(), V = URL.createObjectURL(B);
    g.current = V;
    const se = new Promise((Ue, Ge) => {
      B.addEventListener("sourceopen", () => {
        try {
          Ue(B.addSourceBuffer("audio/mpeg"));
        } catch (Re) {
          Ge(Re);
        }
      }, { once: !0 }), B.addEventListener("error", () => Ge(new Error("speech_error")), { once: !0 });
    }), Ee = E();
    Ee.onended = () => {
      J === m.current && L();
    }, Ee.onerror = () => {
      J === m.current && (L(), o(tl("speech_error")));
    }, Ee.src = V, Ee.play().then(
      () => {
        J === m.current && (d(!0), o("Speaking…"));
      },
      (Ue) => {
        J === m.current && (Ue instanceof DOMException && Ue.name === "NotAllowedError" ? (S.current = async () => {
          await Ee.play(), J === m.current && (d(!0), o("Speaking…"));
        }, o("Click or press a key to hear the reply")) : (L(), o(tl("speech_error"))));
      }
    );
    const ue = await se, ve = [], me = K.getReader();
    for (; ; ) {
      const { done: Ue, value: Ge } = await me.read();
      if (J !== m.current)
        return await me.cancel().catch(() => {
        }), null;
      if (Ue) break;
      ve.push(Ge), ue.appendBuffer(Ge), await new Promise((Re, W) => {
        ue.addEventListener("updateend", () => Re(), { once: !0 }), ue.addEventListener("error", () => W(new Error("speech_error")), { once: !0 });
      });
    }
    return B.readyState === "open" && B.endOfStream(), new Blob(ve, { type: "audio/mpeg" });
  }, [L]), U = x.useCallback((K) => {
    if (L(), !a || K.trim() === "") return;
    const J = m.current, B = new AbortController();
    y.current = B, o("Preparing voice…"), (async () => {
      try {
        const V = `${s}
${K}`, se = j.current.get(V);
        if (se === void 0) {
          const ue = await fetch(ut("/voice/read"), { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text: K, language: s, dub: !0, stream: By }), signal: B.signal });
          if (!ue.ok) throw new Error((await ue.json().catch(() => ({ error: "speech_error" }))).error ?? "speech_error");
          if (J !== m.current) return;
          if (By && ue.body !== null && (ue.headers.get("content-type") ?? "").startsWith("audio/mpeg")) {
            const Ue = await Z(ue.body, J);
            Ue !== null && J === m.current && T(V, Ue);
            return;
          }
          const ve = await ue.blob();
          if (T(V, ve), J !== m.current) return;
          const me = URL.createObjectURL(ve);
          g.current = me, await X(me, J);
          return;
        }
        if (J !== m.current) return;
        const Ee = URL.createObjectURL(se);
        g.current = Ee, await X(Ee, J);
      } catch (V) {
        if (J !== m.current) return;
        L(), V instanceof DOMException && V.name === "AbortError" || o(tl(V.message));
      }
    })();
  }, [a, s, L, X, Z]);
  return x.useEffect(() => {
    const K = () => {
      if (S.current) {
        const B = S.current;
        S.current = null, B().catch(() => o(tl("speech_error"))), b.current = !0;
        return;
      }
      if (b.current) return;
      const J = E();
      if (!J.paused) {
        b.current = !0;
        return;
      }
      y.current === null && (J.src = FT, J.play().then(() => {
        b.current = !0;
      }).catch(() => {
      }));
    };
    return window.addEventListener("pointerdown", K, !0), window.addEventListener("keydown", K, !0), () => {
      window.removeEventListener("pointerdown", K, !0), window.removeEventListener("keydown", K, !0);
    };
  }, [k]), x.useEffect(() => (window.addEventListener("pagehide", L), () => window.removeEventListener("pagehide", L)), [L]), { speak: U, stop: L, status: u, speaking: f };
}
const PT = [
  ["excited", /耳根|脸红|红了|笑出声|眼睛(一)?亮|亮晶晶|兴奋|开心|雀跃|蹦|拍手|欢呼|哼歌|尾巴.{0,6}(甩|摇|晃|摆|勾|翘)|得意|blush|grin|excited|beam/i],
  // Comforting gestures land here too: the downcast, cooler-lit row reads as
  // sympathy when she is the one doing the consoling.
  ["sad", /眼神软|心疼|叹(了口)?气|难过|低落|失落|委屈|眼眶|鼻子一酸|垂下|耷拉|落寞|黯|放(得更|得|)轻|轻声|挨着|陪你|拍了拍|揉了揉|摸摸|温柔|sigh|sad|tear|softly|gentl/i],
  ["surprised", /愣住|愣了|一惊|瞪大|吓了一跳|惊讶|睁大|张大嘴|噎|surpris|startle|blink/i],
  ["reading", /皱眉|板起脸|沉思|想了想|思索|歪头|眯起眼|认真|盯着|frown|ponder|think/i],
  ["done", /满意|微笑|笑了笑|点头|轻笑|笑着|弯起|抿嘴笑|smile|nod|chuckle/i]
], WT = /[（(]([^（）()\n]{1,60})[）)]/g;
function $y(a) {
  let s = null;
  for (const u of a.matchAll(WT)) {
    let o = -1;
    for (const [f, d] of PT) {
      const m = u[1].search(d);
      m > o && (o = m, s = f);
    }
  }
  return s;
}
function ew() {
  const [a, s] = x.useState(null), [u, o] = x.useState([]), [f, d] = x.useState(!1), [m, p] = x.useState("idle"), [b, S] = x.useState(null), [y, g] = x.useState(null), [j, T] = x.useState(!1), [E, L] = x.useState(null), [k, X] = x.useState(!1), [Z, U] = x.useState(""), [K, J] = x.useState(null), [B, V] = x.useState("pick"), [se, Ee] = x.useState(null), [ue, ve] = x.useState([]), [me, Ue] = x.useState([]), [Ge, Re] = x.useState(null), [W, de] = x.useState([]), [I, je] = x.useState(0), [$, be] = x.useState(() => localStorage.getItem("aibo-voice") !== "off"), [He, hn] = x.useState(() => {
    const Q = localStorage.getItem("aibo-speech-language");
    return Q === "zh" || Q === "en" || Q === "ja" ? Q : "auto";
  }), [_, q] = IT(), fe = vE(), he = He === "auto" ? fe : He, ye = JT($, he), Me = x.useRef(null), De = x.useRef(null), re = x.useRef(""), xe = x.useRef(null), Dt = (Q) => {
    typeof Q.voice == "boolean" && (be(Q.voice), localStorage.setItem("aibo-voice", Q.voice ? "on" : "off"));
    const ee = Q.speechLanguage;
    (ee === "auto" || ee === "zh" || ee === "en" || ee === "ja") && (hn(ee), localStorage.setItem("aibo-speech-language", ee));
  }, jl = x.useRef(Dt);
  jl.current = Dt, x.useEffect(() => {
    Yn("/settings").then(Dt).catch(() => {
    });
  }, []);
  const Be = (Q) => {
    Dt({ voice: Q }), Q || ye.stop(), _n("/settings", { voice: Q }).catch(() => ge("Could not save the voice setting"));
  }, Vt = (Q) => {
    Dt({ speechLanguage: Q }), ye.stop(), _n("/settings", { speechLanguage: Q }).catch(() => ge("Could not save the speech language"));
  }, ge = x.useCallback((Q) => {
    U(Q), De.current !== null && window.clearTimeout(De.current), De.current = window.setTimeout(() => U(""), 6500);
  }, []), Xe = x.useRef(ye.speak);
  Xe.current = ye.speak;
  const ct = x.useRef(ye.stop);
  ct.current = ye.stop;
  const mn = x.useRef(fe);
  mn.current = fe;
  const ln = x.useCallback((Q) => {
    switch (Q.type) {
      case "user":
        ct.current(), g(null), o((ee) => [...ls(ee), { kind: "msg", key: Kt(), role: "user", text: String(Q.text ?? ""), at: Date.now(), ...Array.isArray(Q.attachments) ? { attachments: Q.attachments } : {} }]), d(!0);
        break;
      case "status": {
        const ee = { activity: String(Q.activity ?? "reading"), text: String(Q.tool ?? Q.text ?? ""), ...Q.command === void 0 ? {} : { command: String(Q.command) } };
        o((Te) => {
          const le = Te[Te.length - 1], Ke = le?.kind === "msg" && le.streaming && le.text === "" ? Te.slice(0, -1) : Te, ot = Ke[Ke.length - 1];
          return ot?.kind === "steps" ? [...Ke.slice(0, -1), { ...ot, steps: [...ot.steps, ee], live: !0 }] : [...Ke, { kind: "steps", key: Kt(), steps: [ee], live: !0 }];
        }), Q.activity && p(String(Q.activity)), g(null);
        break;
      }
      case "activity":
        if (Q.beat) {
          S(String(Q.activity)), window.setTimeout(() => S(null), 2600), Q.activity === "failed" && o((ee) => {
            const Te = ee[ee.length - 1];
            if (Te?.kind !== "steps" || Te.steps.length === 0) return ee;
            const le = [...Te.steps];
            return le[le.length - 1] = { ...le[le.length - 1], failed: !0 }, [...ee.slice(0, -1), { ...Te, steps: le }];
          });
          break;
        }
        p(String(Q.activity)), Q.activity === "done" && (Me.current !== null && window.clearTimeout(Me.current), Me.current = window.setTimeout(() => p((ee) => ee === "done" ? "idle" : ee), 3e4));
        break;
      case "delta":
        if (Q.reset) {
          o((ee) => [...ls(Su(ee)), { kind: "msg", key: Kt(), role: "assistant", text: "", streaming: !0, at: Date.now() }]), g(null), p("writing");
          break;
        }
        if (Q.done) break;
        typeof Q.text == "string" && o((ee) => {
          const Te = qy(ee);
          if (Te === -1) return [...ls(ee), { kind: "msg", key: Kt(), role: "assistant", text: Q.text, streaming: !0, at: Date.now() }];
          const le = ee[Te], Ke = le.text + Q.text, ot = $y(Ke);
          return ot && g(ot), [...ee.slice(0, Te), { ...le, text: Ke }, ...ee.slice(Te + 1)];
        });
        break;
      case "assistant": {
        const ee = String(Q.text ?? "");
        o((le) => {
          const Ke = qy(le), ot = { kind: "msg", key: Kt(), role: "assistant", text: ee, at: Date.now() };
          return Ke === -1 ? [...ls(le), ot] : Su([...le.slice(0, Ke), ot, ...le.slice(Ke + 1)]);
        });
        const Te = $y(ee);
        Te && g(Te), re.current = ee, Q.interrupted || Xe.current(ee);
        break;
      }
      case "busy":
        d(!!Q.value), Q.value || o((ee) => ls(Su(ee)));
        break;
      case "session":
        o([{ kind: "notice", key: Kt(), text: "New session" }]), d(!1), p("idle"), g(null);
        break;
      case "manifest":
        s(Q.manifest), L(null);
        break;
      case "snapshot": {
        const ee = Array.isArray(Q.entries) ? Q.entries : [], Te = [];
        for (const le of ee)
          if (le.role === "status") {
            const Ke = { activity: String(le.activity ?? "reading"), text: String(le.tool ?? le.text ?? ""), ...le.command === void 0 ? {} : { command: String(le.command) }, ...le.failed ? { failed: !0 } : {} }, ot = Te[Te.length - 1];
            ot?.kind === "steps" ? ot.steps.push(Ke) : Te.push({ kind: "steps", key: Kt(), steps: [Ke], live: !1 });
          } else le.role === "list" && le.list ? Te.push({ kind: "list", key: Kt(), list: le.list }) : le.role === "question" && Array.isArray(le.questions) ? Te.push({ kind: "question", key: Kt(), id: String(le.id ?? ""), questions: le.questions, ...Array.isArray(le.answers) ? { answers: le.answers } : {}, ...le.cancelled ? { cancelled: !0 } : {} }) : (le.role === "user" || le.role === "assistant") && Te.push({ kind: "msg", key: Kt(), role: le.role, text: le.text, at: 0, ...Array.isArray(le.attachments) ? { attachments: le.attachments } : {} });
        if (Te.length > 0) {
          o(Te);
          const le = Te[Te.length - 1];
          le.kind === "msg" && le.role === "assistant" && (re.current = le.text);
        }
        Array.isArray(Q.artifacts) && de(Q.artifacts);
        break;
      }
      case "artifact":
        Array.isArray(Q.artifacts) && de(Q.artifacts), Q.fresh && Q.artifact && o((ee) => [...ee, { kind: "artifact", key: Kt(), artifact: Q.artifact }]);
        break;
      case "memory":
        Array.isArray(Q.entries) && ve(Q.entries);
        break;
      case "sources":
        je((ee) => ee + 1);
        break;
      case "question": {
        const ee = String(Q.id ?? "");
        Array.isArray(Q.questions) ? o((Te) => [...ls(Su(Te)), { kind: "question", key: Kt(), id: ee, questions: Q.questions }]) : o((Te) => Te.map((le) => le.kind === "question" && le.id === ee ? { ...le, ...Array.isArray(Q.answers) ? { answers: Q.answers } : {}, ...Q.cancelled === !0 ? { cancelled: !0 } : {} } : le));
        break;
      }
      case "notice":
        typeof Q.text == "string" && o((ee) => [...ee, { kind: "notice", key: Kt(), text: Q.text }]);
        break;
      case "settings":
        Q.prefs && jl.current(Q.prefs);
        break;
      case "lists": {
        const ee = Array.isArray(Q.lists) ? Q.lists : [];
        Ue(ee);
        const Te = typeof Q.fresh == "string" ? ee.find((le) => le.id === Q.fresh) : void 0;
        Te && o((le) => [...le, { kind: "list", key: Kt(), list: Te }]);
        break;
      }
    }
  }, []);
  x.useEffect(() => {
    let Q = null;
    return Yn("/manifest.json").then((ee) => {
      s(ee), Q = new EventSource(ut("/events")), Q.onopen = () => X(!0), Q.onerror = () => X(!1), Q.onmessage = (Te) => {
        try {
          ln(JSON.parse(Te.data));
        } catch {
        }
      };
    }).catch(() => o([{ kind: "notice", key: Kt(), text: "Could not reach the Aibo server." }])), () => {
      Q?.close();
    };
  }, [ln]), x.useEffect(() => {
    a && (document.title = `${a.characterName} · Aibo`);
  }, [a?.characterName]);
  const Ce = x.useCallback((Q, ee) => {
    ee?.tab && V(ee.tab), Ee(ee?.file ?? null), J(Q);
  }, []), Gn = x.useCallback(async () => {
    try {
      await fetch(ut("/session/new"), { method: "POST" });
    } catch (Q) {
      ge(`Could not start a session: ${Q.message}`);
    }
  }, [ge]), pn = x.useCallback(() => {
    re.current !== "" && ye.speak(re.current);
  }, [ye]), Nl = x.useCallback(async (Q) => {
    const [ee, ...Te] = Q.trim().split(/\s+/), le = Te.join(" ");
    switch (ee) {
      case "/new":
        await Gn();
        return;
      case "/char":
        if (le === "") {
          Ce("character", { tab: "pick" });
          return;
        }
        try {
          await _n("/character", { id: le });
        } catch {
          ge(`Unknown character "${le}"`);
        }
        return;
      case "/edit":
        Ce("character", { tab: "persona" });
        return;
      case "/gallery":
        Ce("character", { tab: "art" });
        return;
      case "/memory":
        Ce("memory");
        return;
      case "/files":
        Ce("files");
        return;
      case "/lists":
        Ce("lists");
        return;
      case "/data":
        Ce("data");
        return;
      case "/voice":
        Be(!$), ge($ ? "Voice off." : "Voice on.");
        return;
      case "/help":
        Ce("help");
        return;
      default:
        ge(`Unknown command ${ee}. Try /help.`);
    }
  }, [Gn, ge, Ce, $]), El = x.useCallback(async (Q, ee = []) => {
    if (Q.startsWith("/") && ee.length === 0) {
      await Nl(Q);
      return;
    }
    ct.current();
    const Te = await Promise.all(ee.map(async (Ke) => ({ kind: Ke.kind, name: Ke.file.name || (Ke.kind === "image" ? "pasted.png" : "file"), mediaType: Ke.file.type || "application/octet-stream", data: await ow(Ke.file) }))), le = await fetch(ut("/send"), { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text: Q, attachments: Te }) });
    if (!le.ok) throw new Error(await le.text());
  }, [Nl]);
  x.useEffect(() => {
    const Q = (ee) => {
      if (ee.isComposing) return;
      const le = !!ee.target?.closest?.("input,textarea,select,[contenteditable]");
      if (ee.altKey && !ee.metaKey && !ee.ctrlKey) {
        const ot = {
          KeyM: () => Ce("memory"),
          KeyF: () => Ce("files"),
          KeyL: () => Ce("lists"),
          KeyD: () => Ce("data"),
          KeyC: () => Ce("character"),
          KeyS: () => Ce("settings"),
          KeyV: () => {
            Be(!$);
          },
          KeyR: pn,
          Slash: () => Ce("help")
        }[ee.code];
        if (ot) {
          ee.preventDefault(), ot();
          return;
        }
      }
      le || K !== null || (ee.key === "/" || ee.key === "、" || ee.key === "／") && (ee.preventDefault(), xe.current?.focus());
    };
    return window.addEventListener("keydown", Q), () => window.removeEventListener("keydown", Q);
  }, [Ce, K, pn, $]);
  const Ft = ye.speaking || ye.status === "Preparing voice…";
  x.useEffect(() => {
    if (f || Ft || y === null) return;
    const Q = window.setTimeout(() => g(null), 6e3);
    return () => window.clearTimeout(Q);
  }, [f, Ft, y]);
  const an = E ?? b ?? (f ? m === "waiting" ? "waiting" : y ?? m : ye.speaking ? y ?? "speaking" : y ?? (m === "done" ? "done" : m === "waiting" ? "waiting" : j ? "listening" : "idle")), vt = a?.characterName ?? "…", Jt = (Q) => {
    Q || J(null);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: `app${Yy ? " shell" : ""}`, children: [
    Yy && /* @__PURE__ */ c.jsx(tw, {}),
    /* @__PURE__ */ c.jsxs("section", { className: "chat", children: [
      /* @__PURE__ */ c.jsxs("header", { className: "chat-header", children: [
        /* @__PURE__ */ c.jsxs("button", { type: "button", className: "who", title: "Character (⌥C)", onClick: () => Ce("character"), children: [
          /* @__PURE__ */ c.jsx(nw, { manifest: a }),
          /* @__PURE__ */ c.jsxs("div", { className: "who-text", children: [
            /* @__PURE__ */ c.jsx("span", { className: "who-name", children: vt }),
            /* @__PURE__ */ c.jsxs("span", { className: `who-state${f || ye.speaking ? " busy" : ""}${k ? "" : " off"}`, children: [
              /* @__PURE__ */ c.jsx("i", { className: "dot" }),
              k ? f ? fs[m] ?? m : ye.speaking ? "Speaking" : fs[an] ?? an : "Disconnected"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: "header-actions", children: [
          /* @__PURE__ */ c.jsx(as, { title: $ ? "Voice on (⌥V)" : "Voice off (⌥V)", onClick: () => Be(!$), active: $, children: $ ? /* @__PURE__ */ c.jsx(rv, {}) : /* @__PURE__ */ c.jsx(tS, {}) }),
          /* @__PURE__ */ c.jsx(as, { title: "Memory (⌥M)", onClick: () => Ce("memory"), children: /* @__PURE__ */ c.jsx(h2, {}) }),
          /* @__PURE__ */ c.jsx(as, { title: "Files (⌥F)", onClick: () => Ce("files"), children: /* @__PURE__ */ c.jsx(A2, {}) }),
          /* @__PURE__ */ c.jsx(as, { title: "Lists (⌥L)", onClick: () => Ce("lists"), children: /* @__PURE__ */ c.jsx(_c, {}) }),
          /* @__PURE__ */ c.jsx(as, { title: "Connectors (⌥D)", onClick: () => Ce("data"), children: /* @__PURE__ */ c.jsx(rh, {}) }),
          /* @__PURE__ */ c.jsx(as, { title: "Settings (⌥S)", onClick: () => Ce("settings"), children: /* @__PURE__ */ c.jsx(X2, {}) })
        ] })
      ] }),
      /* @__PURE__ */ c.jsx(lw, { items: u, lists: me, name: vt, busy: f, onReplay: (Q) => ye.speak(Q), onOpenFile: (Q) => Ce("files", { file: Q }), onOpenList: (Q) => {
        Re(Q), Ce("lists");
      } }),
      /* @__PURE__ */ c.jsx(fw, { ref: xe, onSend: El, busy: f, name: vt, notice: Z, voiceStatus: ye.speaking ? "" : ye.status, speaking: ye.speaking, onStopVoice: ye.stop, onTyping: T })
    ] }),
    /* @__PURE__ */ c.jsx(dw, { manifest: a, activity: an, name: vt }),
    /* @__PURE__ */ c.jsx(
      kE,
      {
        open: K === "character",
        onOpenChange: Jt,
        tab: B,
        setTab: V,
        manifest: a,
        lang: fe,
        preview: E,
        setPreview: L,
        notify: ge,
        onManifestChange: (Q) => s((ee) => ee && { ...ee, ...Q })
      }
    ),
    /* @__PURE__ */ c.jsx(OE, { open: K === "memory", onOpenChange: Jt, entries: ue, setEntries: ve, notify: ge }),
    /* @__PURE__ */ c.jsx(ME, { open: K === "lists", onOpenChange: Jt, lists: me, setLists: Ue, openId: Ge, notify: ge }),
    /* @__PURE__ */ c.jsx(BE, { open: K === "files", onOpenChange: Jt, artifacts: W, setArtifacts: de, openId: se, notify: ge }),
    /* @__PURE__ */ c.jsx(XE, { open: K === "settings", onOpenChange: Jt, theme: _, setTheme: q, voiceOn: $, setVoiceOn: Be, speechPref: He, setSpeechPref: Vt, speechLang: he, onNewSession: () => {
      Gn();
    }, stopVoice: ye.stop, onHelp: () => Ce("help") }),
    /* @__PURE__ */ c.jsx(zT, { open: K === "data", onOpenChange: Jt, version: I, notify: ge }),
    /* @__PURE__ */ c.jsx(GE, { open: K === "help", onOpenChange: Jt })
  ] });
}
function ls(a) {
  const s = a[a.length - 1];
  return s?.kind === "steps" && s.live ? [...a.slice(0, -1), { ...s, live: !1 }] : a;
}
function Su(a) {
  return a.filter((s) => !(s.kind === "msg" && s.streaming && s.text === "")).map((s) => s.kind === "msg" && s.streaming ? { ...s, streaming: !1 } : s);
}
function qy(a) {
  for (let s = a.length - 1; s >= 0; s--) {
    const u = a[s];
    if (u.kind === "msg" && u.streaming) return s;
  }
  return -1;
}
const Yy = new URLSearchParams(location.search).get("shell") === "desktop";
function tw() {
  return /* @__PURE__ */ c.jsx("div", { className: "titlebar", "data-tauri-drag-region": !0 });
}
function nw({ manifest: a }) {
  const s = a?.avatar, u = s ?? a?.states.idle?.image;
  return u ? /* @__PURE__ */ c.jsx("img", { className: `avatar${s === void 0 ? "" : " avatar-portrait"}`, src: ut(u), alt: "" }) : /* @__PURE__ */ c.jsx("div", { className: "avatar avatar-letter", children: (a?.characterName ?? "?").slice(0, 1) });
}
function as({ title: a, onClick: s, active: u, children: o }) {
  return /* @__PURE__ */ c.jsx("button", { type: "button", className: `icon-button${u ? " active" : ""}`, title: a, "aria-label": a, onClick: s, children: o });
}
function lw({ items: a, lists: s, name: u, busy: o, onReplay: f, onOpenFile: d, onOpenList: m }) {
  const p = x.useRef(null), b = x.useRef(!0);
  x.useLayoutEffect(() => {
    const g = p.current;
    g && b.current && (g.scrollTop = g.scrollHeight);
  });
  const S = () => {
    const g = p.current;
    g && (b.current = g.scrollHeight - g.scrollTop - g.clientHeight < 48);
  }, y = a[a.length - 1]?.kind === "steps";
  return /* @__PURE__ */ c.jsx("div", { className: "messages", ref: p, onScroll: S, children: /* @__PURE__ */ c.jsxs("div", { className: "messages-inner", children: [
    a.map((g) => {
      switch (g.kind) {
        case "msg":
          return g.role === "user" ? /* @__PURE__ */ c.jsx(aw, { text: g.text, attachments: g.attachments }, g.key) : /* @__PURE__ */ c.jsx(iw, { name: u, text: g.text, streaming: g.streaming === !0, onReplay: f }, g.key);
        case "steps":
          return /* @__PURE__ */ c.jsx(sw, { steps: g.steps, live: g.live }, g.key);
        case "artifact":
          return /* @__PURE__ */ c.jsx(uw, { artifact: g.artifact, onOpen: () => d(g.artifact.id) }, g.key);
        case "list":
          return /* @__PURE__ */ c.jsx(rw, { list: s.find((j) => j.id === g.list.id) ?? g.list, onOpen: () => m(g.list.id) }, g.key);
        case "question":
          return /* @__PURE__ */ c.jsx(cw, { item: g, name: u }, g.key);
        case "notice":
          return /* @__PURE__ */ c.jsx("div", { className: "notice", children: g.text }, g.key);
      }
    }),
    o && !y && !a.some((g) => g.kind === "msg" && g.streaming) && /* @__PURE__ */ c.jsxs("div", { className: "turn assistant", children: [
      /* @__PURE__ */ c.jsx("div", { className: "turn-label", children: u }),
      /* @__PURE__ */ c.jsx("span", { className: "shimmer", children: "Thinking…" })
    ] })
  ] }) });
}
function aw({ text: a, attachments: s }) {
  const u = (s ?? []).filter((f) => f.kind === "image" && f.url), o = (s ?? []).filter((f) => !(f.kind === "image" && f.url));
  return /* @__PURE__ */ c.jsxs("div", { className: "turn user", children: [
    u.length > 0 && /* @__PURE__ */ c.jsx("div", { className: `bubble-images n${Math.min(u.length, 3)}`, children: u.map((f, d) => /* @__PURE__ */ c.jsx("a", { href: ut(f.url), target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ c.jsx("img", { src: ut(f.url), alt: f.name, loading: "lazy" }) }, d)) }),
    o.length > 0 && /* @__PURE__ */ c.jsx("div", { className: "bubble-files", children: o.map((f, d) => /* @__PURE__ */ c.jsxs("span", { className: "bubble-file", children: [
      /* @__PURE__ */ c.jsx(zd, {}),
      /* @__PURE__ */ c.jsx("b", { children: f.name }),
      f.bytes > 0 && /* @__PURE__ */ c.jsx("small", { children: Bu(f.bytes) })
    ] }, d)) }),
    a !== "" && /* @__PURE__ */ c.jsx("div", { className: "bubble", children: a })
  ] });
}
function iw({ name: a, text: s, streaming: u, onReplay: o }) {
  const [f, d] = x.useState(!1), m = x.useMemo(() => bh(s), [s]), p = async () => {
    try {
      await navigator.clipboard.writeText(s), d(!0), window.setTimeout(() => d(!1), 1500);
    } catch {
    }
  };
  return /* @__PURE__ */ c.jsxs("div", { className: "turn assistant", children: [
    /* @__PURE__ */ c.jsx("div", { className: "turn-label", children: a }),
    s === "" && u ? /* @__PURE__ */ c.jsx("span", { className: "shimmer", children: "Thinking…" }) : /* @__PURE__ */ c.jsx("div", { className: `prose${u ? " streaming" : ""}`, dangerouslySetInnerHTML: { __html: m } }),
    !u && s !== "" && /* @__PURE__ */ c.jsxs("div", { className: "turn-actions", children: [
      /* @__PURE__ */ c.jsxs("button", { type: "button", className: "text-button", onClick: () => {
        p();
      }, children: [
        f ? /* @__PURE__ */ c.jsx(si, {}) : /* @__PURE__ */ c.jsx(sh, {}),
        f ? "Copied" : "Copy"
      ] }),
      /* @__PURE__ */ c.jsxs("button", { type: "button", className: "text-button", onClick: () => o(s), children: [
        /* @__PURE__ */ c.jsx(rv, {}),
        "Replay"
      ] })
    ] })
  ] });
}
function sw({ steps: a, live: s }) {
  const [u, o] = x.useState(!1), f = s || u, d = a.filter((b) => b.failed).length, m = `${a.length} step${a.length === 1 ? "" : "s"}`, p = s ? Gy(a[a.length - 1]) : d ? `Worked through ${m}, ${d} didn't go through` : `Worked through ${m}`;
  return /* @__PURE__ */ c.jsxs("div", { className: `steps${s ? " live" : ""}`, children: [
    /* @__PURE__ */ c.jsxs("button", { type: "button", className: "steps-head", onClick: () => o((b) => !b), "aria-expanded": f, children: [
      f ? /* @__PURE__ */ c.jsx(p2, { className: "chev" }) : /* @__PURE__ */ c.jsx(Iy, { className: "chev" }),
      /* @__PURE__ */ c.jsx("span", { className: s ? "shimmer" : "", children: p })
    ] }),
    f && /* @__PURE__ */ c.jsx("ol", { className: "steps-list", children: a.map((b, S) => {
      const y = KT[b.failed ? "failed" : b.activity] ?? hs;
      return /* @__PURE__ */ c.jsxs("li", { className: b.failed ? "failed" : "", children: [
        /* @__PURE__ */ c.jsx(y, { className: "step-icon" }),
        /* @__PURE__ */ c.jsx("span", { className: "step-text", children: Gy(b) }),
        b.command && /* @__PURE__ */ c.jsx("code", { className: "step-cmd", title: b.command, children: b.command })
      ] }, S);
    }) })
  ] });
}
function Gy(a) {
  if (!a) return "";
  const s = fs[a.activity] ?? a.activity, u = a.text.replace(/…$/, "");
  return u ? `${s} · ${u}` : s;
}
function cw({ item: a, name: s }) {
  const [u, o] = x.useState({}), [f, d] = x.useState({}), [m, p] = x.useState(!1), [b, S] = x.useState(""), y = a.answers !== void 0 || a.cancelled === !0, g = (k) => {
    const X = a.answers?.find((Z) => Z.id === k.id);
    return X ? [...X.selected, ...X.custom ? [X.custom] : []] : [];
  }, j = a.questions.every((k) => (u[k.id]?.length ?? 0) > 0 || (f[k.id]?.trim() ?? "") !== ""), T = async (k) => {
    p(!0), S("");
    try {
      await _n("/question", { id: a.id, answers: k });
    } catch (X) {
      S(X.message);
    } finally {
      p(!1);
    }
  }, E = () => a.questions.map((k) => {
    const X = f[k.id]?.trim() ?? "", Z = u[k.id] ?? [];
    return { id: k.id, selected: X !== "" && k.multiSelect !== !0 ? [] : Z, ...X !== "" ? { custom: X } : {} };
  }), L = (k, X) => {
    if (!(y || m)) {
      if (k.multiSelect) {
        o((Z) => {
          const U = Z[k.id] ?? [];
          return { ...Z, [k.id]: U.includes(X) ? U.filter((K) => K !== X) : [...U, X] };
        });
        return;
      }
      o((Z) => ({ ...Z, [k.id]: [X] })), a.questions.length === 1 && (f[k.id]?.trim() ?? "") === "" && T([{ id: k.id, selected: [X] }]);
    }
  };
  return /* @__PURE__ */ c.jsxs("div", { className: "turn assistant", children: [
    /* @__PURE__ */ c.jsx("span", { className: "turn-label", children: s }),
    /* @__PURE__ */ c.jsxs("div", { className: `question${y ? " settled" : ""}${a.cancelled ? " cancelled" : ""}`, children: [
      a.questions.map((k) => {
        const X = y ? g(k) : u[k.id] ?? [];
        return /* @__PURE__ */ c.jsxs("section", { className: "question-item", children: [
          k.header && /* @__PURE__ */ c.jsx("span", { className: "question-header", children: k.header }),
          /* @__PURE__ */ c.jsx("p", { className: "question-text", children: k.question }),
          k.detail && /* @__PURE__ */ c.jsx("pre", { className: "question-detail", children: k.detail }),
          (k.options ?? []).length > 0 && /* @__PURE__ */ c.jsx("div", { className: "question-options", role: k.multiSelect ? "group" : "radiogroup", children: (k.options ?? []).map((Z) => {
            const U = X.includes(Z.label);
            return y && !U ? null : /* @__PURE__ */ c.jsxs("button", { type: "button", className: `question-option${U ? " on" : ""}`, role: k.multiSelect ? "checkbox" : "radio", "aria-checked": U, disabled: y || m, onClick: () => L(k, Z.label), title: Z.description, children: [
              /* @__PURE__ */ c.jsx("span", { className: "question-check", children: k.multiSelect ? /* @__PURE__ */ c.jsx(Q2, {}) : /* @__PURE__ */ c.jsx(si, {}) }),
              /* @__PURE__ */ c.jsxs("span", { className: "question-option-text", children: [
                /* @__PURE__ */ c.jsx("b", { children: Z.label }),
                Z.description && /* @__PURE__ */ c.jsx("small", { children: Z.description })
              ] })
            ] }, Z.label);
          }) }),
          y ? g(k).length === 0 ? /* @__PURE__ */ c.jsx("span", { className: "question-skipped", children: a.cancelled ? "No longer waiting" : "Skipped" }) : g(k).some((Z) => !(k.options ?? []).some((U) => U.label === Z)) && /* @__PURE__ */ c.jsx("p", { className: "question-custom-answer", children: g(k).filter((Z) => !(k.options ?? []).some((U) => U.label === Z)).join(" · ") }) : /* @__PURE__ */ c.jsx("input", { className: "input question-custom", placeholder: (k.options ?? []).length ? "Other…" : "Type your answer", value: f[k.id] ?? "", disabled: m, onChange: (Z) => d((U) => ({ ...U, [k.id]: Z.target.value })), onKeyDown: (Z) => {
            Z.key === "Enter" && j && !m && (Z.preventDefault(), T(E()));
          } })
        ] }, k.id);
      }),
      !y && /* @__PURE__ */ c.jsxs("div", { className: "question-actions", children: [
        b && /* @__PURE__ */ c.jsx("span", { className: "question-error", children: b }),
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "button ghost", disabled: m, onClick: () => {
          T(a.questions.map((k) => ({ id: k.id, selected: [] })));
        }, children: "Skip" }),
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "button primary", disabled: !j || m, onClick: () => {
          T(E());
        }, children: m ? "Sending…" : "Reply" })
      ] })
    ] })
  ] });
}
function rw({ list: a, onOpen: s }) {
  const u = a.items.filter((o) => !o.done).length;
  return /* @__PURE__ */ c.jsx("div", { className: "turn assistant", children: /* @__PURE__ */ c.jsxs("div", { className: "artifact list-card", role: "button", tabIndex: 0, onClick: s, onKeyDown: (o) => {
    (o.key === "Enter" || o.key === " ") && (o.preventDefault(), s());
  }, children: [
    /* @__PURE__ */ c.jsx("div", { className: "artifact-thumb", children: /* @__PURE__ */ c.jsx(_c, {}) }),
    /* @__PURE__ */ c.jsxs("div", { className: "artifact-meta", children: [
      /* @__PURE__ */ c.jsx("span", { className: "artifact-name", children: a.title }),
      /* @__PURE__ */ c.jsxs("span", { className: "artifact-sub", children: [
        "List · ",
        u,
        " item",
        u === 1 ? "" : "s",
        a.items.length - u > 0 ? ` · ${a.items.length - u} done` : ""
      ] })
    ] })
  ] }) });
}
function uw({ artifact: a, onOpen: s }) {
  const u = a.kind === "image" ? Tc : Py, o = ut(`/artifact/${encodeURIComponent(a.id)}`), f = async () => {
    await fetch(ut(`/artifact/${encodeURIComponent(a.id)}/reveal`), { method: "POST" });
  };
  return /* @__PURE__ */ c.jsx("div", { className: "turn assistant", children: /* @__PURE__ */ c.jsxs("div", { className: "artifact", role: "button", tabIndex: 0, onClick: s, onKeyDown: (d) => {
    (d.key === "Enter" || d.key === " ") && (d.preventDefault(), s());
  }, children: [
    /* @__PURE__ */ c.jsx("div", { className: `artifact-thumb${a.kind === "image" ? " image" : ""}`, children: a.kind === "image" ? /* @__PURE__ */ c.jsx("img", { src: o, alt: "", loading: "lazy" }) : /* @__PURE__ */ c.jsx(u, {}) }),
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
const ju = 8, Vy = 20 * 1024 * 1024, Xy = 32 * 1024 * 1024;
function ow(a) {
  return new Promise((s, u) => {
    const o = new FileReader();
    o.onload = () => s(String(o.result).replace(/^data:[^,]*,/, "")), o.onerror = () => u(o.error ?? new Error("could not read the file")), o.readAsDataURL(a);
  });
}
const fw = x.forwardRef(
  function({ onSend: s, busy: u, name: o, notice: f, voiceStatus: d, speaking: m, onStopVoice: p, onTyping: b }, S) {
    const [y, g] = x.useState(SE), [j, T] = x.useState(!1);
    x.useEffect(() => {
      b(j && y.trim() !== "");
    }, [j, y, b]);
    const [E, L] = x.useState(""), [k, X] = x.useState([]), [Z, U] = x.useState(!1), K = x.useRef(!1), J = x.useRef(-1 / 0), B = x.useRef(!1), [V, se] = x.useState(!1), Ee = x.useRef(!1), ue = x.useRef(null), ve = x.useRef(null);
    x.useImperativeHandle(S, () => ue.current), x.useEffect(() => {
      const I = ue.current;
      I && (I.style.height = "auto", I.style.height = `${Math.min(I.scrollHeight, 240)}px`);
    }, [y]), x.useEffect(() => {
      jE(y);
    }, [y]), x.useEffect(() => {
      let I = !0;
      return EE().then((je) => {
        if (!I) return;
        const $ = je.map((be) => {
          const He = new File([be.blob], be.name, { type: be.type });
          return { id: be.id, kind: be.kind, file: He, ...be.kind === "image" ? { preview: URL.createObjectURL(He) } : {} };
        });
        $.length && X((be) => [...$, ...be].slice(0, ju)), Ee.current = !0;
      }), () => {
        I = !1;
      };
    }, []), x.useEffect(() => {
      Ee.current && TE(k.map((I) => ({ id: I.id, kind: I.kind, name: I.file.name, type: I.file.type, blob: I.file })));
    }, [k]);
    const me = (I) => {
      if (B.current) return;
      const je = [];
      let $ = "";
      for (const be of I) {
        const He = /^image\/(png|jpeg|webp|gif)$/.test(be.type) ? "image" : "file";
        if (be.size !== 0) {
          if (He === "image" && be.size > Vy) {
            $ = `${be.name || "image"} is over ${Math.round(Vy / 1048576)} MB`;
            continue;
          }
          if (He === "file" && be.size > Xy) {
            $ = `${be.name} is over ${Math.round(Xy / 1048576)} MB`;
            continue;
          }
          je.push({ id: Kt(), kind: He, file: be, ...He === "image" ? { preview: URL.createObjectURL(be) } : {} });
        }
      }
      X((be) => {
        const He = [...be, ...je];
        return He.length > ju && ($ = `At most ${ju} attachments per message`), He.slice(0, ju);
      }), $ && L($), ue.current?.focus();
    }, Ue = (I) => {
      B.current || X((je) => je.filter(($) => $.id !== I));
    }, Ge = (I) => {
      const je = [...I.clipboardData.items].filter(($) => $.kind === "file").map(($) => $.getAsFile()).filter(($) => $ !== null);
      je.length !== 0 && (I.preventDefault(), me(je));
    }, Re = (I) => {
      I.preventDefault(), U(!1), I.dataTransfer.files.length && me(I.dataTransfer.files);
    }, W = async () => {
      const I = y.trim(), je = k;
      if (!(B.current || K.current || I === "" && je.length === 0)) {
        B.current = !0, se(!0), L("");
        try {
          await s(I, je), g(""), X([]);
          for (const $ of je) $.preview && URL.revokeObjectURL($.preview);
        } catch ($) {
          L($ instanceof Error ? $.message : String($));
        } finally {
          B.current = !1, se(!1);
        }
        ue.current?.focus();
      }
    }, de = E ? { kind: "error", text: E } : f ? { kind: "notice", text: f } : d ? { kind: "voice", text: d } : null;
    return /* @__PURE__ */ c.jsx("div", { className: "composer-dock", onDragOver: (I) => {
      [...I.dataTransfer.types].includes("Files") && (I.preventDefault(), U(!0));
    }, onDragLeave: () => U(!1), onDrop: Re, children: /* @__PURE__ */ c.jsxs("div", { className: `composer${u ? " busy" : ""}${Z ? " dragging" : ""}`, children: [
      k.length > 0 && /* @__PURE__ */ c.jsx("div", { className: "composer-attachments", children: k.map((I) => /* @__PURE__ */ c.jsxs("div", { className: `composer-attachment ${I.kind}`, title: I.file.name, children: [
        I.preview ? /* @__PURE__ */ c.jsx("img", { src: I.preview, alt: "" }) : /* @__PURE__ */ c.jsxs("span", { className: "composer-attachment-file", children: [
          /* @__PURE__ */ c.jsx(zd, {}),
          /* @__PURE__ */ c.jsx("b", { children: I.file.name }),
          /* @__PURE__ */ c.jsx("small", { children: Bu(I.file.size) })
        ] }),
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "composer-attachment-x", "aria-label": "Remove", onClick: () => Ue(I.id), children: /* @__PURE__ */ c.jsx(Sl, {}) })
      ] }, I.id)) }),
      /* @__PURE__ */ c.jsxs("div", { className: "composer-pill", children: [
        /* @__PURE__ */ c.jsx("input", { ref: ve, type: "file", multiple: !0, hidden: !0, onChange: (I) => {
          I.target.files && me(I.target.files), I.target.value = "";
        } }),
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "send quiet attach", onClick: () => ve.current?.click(), title: "Attach a file (or paste / drop one)", "aria-label": "Attach a file", children: /* @__PURE__ */ c.jsx(zd, {}) }),
        /* @__PURE__ */ c.jsx(
          "textarea",
          {
            ref: ue,
            readOnly: V,
            value: y,
            rows: 1,
            placeholder: Z ? "Drop to attach" : `Message ${o}`,
            spellCheck: !1,
            onChange: (I) => {
              g(I.target.value), E && L("");
            },
            onPaste: Ge,
            onFocus: () => T(!0),
            onBlur: () => T(!1),
            onCompositionStart: () => {
              K.current = !0;
            },
            onCompositionEnd: () => {
              K.current = !1, J.current = performance.now();
            },
            onKeyDown: (I) => {
              K.current || I.nativeEvent.isComposing || I.nativeEvent.keyCode === 229 || performance.now() - J.current < 50 || (I.key === "Enter" && !I.shiftKey && !I.nativeEvent.isComposing && (I.preventDefault(), W()), I.key === "Escape" && ue.current?.blur());
            }
          }
        ),
        m && /* @__PURE__ */ c.jsx("button", { type: "button", className: "send quiet", onClick: p, title: "Stop speaking", "aria-label": "Stop speaking", children: /* @__PURE__ */ c.jsx(K2, {}) }),
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "send", onClick: () => {
          W();
        }, disabled: V || y.trim() === "" && k.length === 0, title: u ? "Interrupt and send (Enter)" : "Send (Enter)", "aria-label": u ? "Interrupt and send" : "Send", children: /* @__PURE__ */ c.jsx(d2, {}) })
      ] }),
      de && /* @__PURE__ */ c.jsx("div", { className: `composer-chip ${de.kind}`, role: "status", children: de.text })
    ] }) });
  }
);
function dw({ manifest: a, activity: s, name: u }) {
  const o = x.useRef(null), f = x.useRef(null), d = x.useRef(null), m = x.useRef(null), p = x.useRef("");
  x.useEffect(() => {
    p.current = "";
  }, [a?.characterId]), x.useEffect(() => {
    if (!a) return;
    const S = a.states[s] ? s : "idle", y = a.states[S];
    if (!(!y || S === p.current))
      if (p.current = S, y.video) {
        const g = m.current === o.current ? f.current : o.current;
        if (!g) return;
        g.src = ut(y.video), g.playbackRate = a.playbackRate || 1, g.play().catch(() => {
        }), g.classList.add("visible"), m.current?.classList.remove("visible"), d.current?.classList.remove("visible"), m.current = g;
      } else y.image && d.current && (d.current.src = ut(y.image), d.current.classList.add("visible"), m.current?.classList.remove("visible"), m.current = null);
  }, [a, s]), x.useEffect(() => {
    for (const S of [o.current, f.current]) S && (S.playbackRate = a?.playbackRate || 1);
  }, [a?.playbackRate]);
  const b = !!(a && Object.keys(a.states).length > 0);
  return /* @__PURE__ */ c.jsx("aside", { className: "stage", children: b ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx("video", { ref: o, className: "layer", muted: !0, loop: !0, playsInline: !0, preload: "auto" }),
    /* @__PURE__ */ c.jsx("video", { ref: f, className: "layer", muted: !0, loop: !0, playsInline: !0, preload: "auto" }),
    /* @__PURE__ */ c.jsx("img", { ref: d, className: "layer", alt: "" })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: "stage-empty", children: [
    /* @__PURE__ */ c.jsx("div", { className: "avatar avatar-letter big", children: u.slice(0, 1) }),
    /* @__PURE__ */ c.jsxs("p", { children: [
      u,
      " has no artwork yet."
    ] })
  ] }) });
}
s2.createRoot(document.getElementById("root")).render(/* @__PURE__ */ c.jsx(ew, {}));

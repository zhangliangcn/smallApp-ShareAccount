"use strict";
var TYPE_ARRAY = "[object Array]",
  TYPE_OBJECT = "[object Object]",
  _typeOf = function(e) {
    return Object.prototype.toString.call(e)
  },
  _deepClone = function(e) {
    return JSON.parse(JSON.stringify(e))
  },
  diff = function(e, t) {
    var n = 0 < arguments.length && void 0 !== e ? e : {},
      r = 1 < arguments.length && void 0 !== t ? t : {},
      o = {};
    return updateDiff(n, r, "", o), nullDiff(n, r, "", o), o
  },
  updateDiff = function o(e, t, n, r) {
    var a = 0 < arguments.length && void 0 !== e ? e : {},
      i = 1 < arguments.length && void 0 !== t ? t : {},
      s = 2 < arguments.length && void 0 !== n ? n : "",
      l = 3 < arguments.length && void 0 !== r ? r : {};
    if (_typeOf(a) !== TYPE_ARRAY || (_typeOf(i) !== TYPE_ARRAY || a.length === i.length) && _typeOf(i) === TYPE_ARRAY) return Object.entries(a).forEach(function(e) {
      var t = e[0],
        n = e[1],
        r = "" === s ? t : s + "." + t;
      _typeOf(a) === TYPE_ARRAY && (r = "" === s ? t : s + "[" + t + "]"), i.hasOwnProperty(t) ? _typeOf(i[t]) === TYPE_OBJECT && _typeOf(a[t]) === TYPE_OBJECT || _typeOf(i[t]) === TYPE_ARRAY && _typeOf(a[t]) === TYPE_ARRAY ? o(a[t], i[t], r, l) : i[t] !== a[t] && (l[r] = n) : l[r] = n
    }), l;
    l[s] = a
  },
  nullDiff = function r(e, t, n, o) {
    var a = 0 < arguments.length && void 0 !== e ? e : {},
      i = 1 < arguments.length && void 0 !== t ? t : {},
      s = 2 < arguments.length && void 0 !== n ? n : "",
      l = 3 < arguments.length && void 0 !== o ? o : {};
    if (_typeOf(a) !== TYPE_ARRAY || (_typeOf(i) !== TYPE_ARRAY || a.length === i.length) && _typeOf(i) === TYPE_ARRAY) return Object.entries(i).forEach(function(e) {
      var t = e[0],
        n = "" === s ? t : s + "." + t;
      _typeOf(a) === TYPE_ARRAY && (n = "" === s ? t : s + "[" + t + "]"), a.hasOwnProperty(t) ? (_typeOf(i[t]) === TYPE_OBJECT && _typeOf(a[t]) === TYPE_OBJECT || _typeOf(i[t]) === TYPE_ARRAY && _typeOf(a[t]) === TYPE_ARRAY) && r(a[t], i[t], n, l) : l[n] = null
    }), l
  },
  name = "wxministore",
  version = "1.2.81",
  description = "小程序全局状态管理工具",
  main = "./lib/store.js",
  repository = {
    type: "git",
    url: "git+https://github.com/yx675258207/wxMiniStore.git"
  },
  scripts = {
    start: "rollup -c -w",
    build: "rollup -c",
    test: "mocha --require babel-core/register ./test/diff.test.js"
  },
  files = ["lib"],
  keywords = ["store", "wxstore", "wxministore"],
  author = "Leisure",
  license = "MIT",
  bugs = {
    url: "https://github.com/yx675258207/wxMiniStore/issues"
  },
  homepage = "https://github.com/yx675258207/wxMiniStore#readme",
  devDependencies = {
    "@rollup/plugin-json": "^4.0.0",
    "babel-core": "^6.26.3",
    "babel-plugin-external-helpers": "^6.22.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    chai: "^4.2.0",
    mocha: "^6.2.2",
    rollup: "^1.27.5",
    "rollup-plugin-babel": "^3.0.7",
    "rollup-plugin-commonjs": "^10.1.0",
    "rollup-plugin-node-resolve": "^5.2.0",
    "rollup-plugin-uglify": "^6.0.3"
  },
  pkg = {
    name: name,
    version: version,
    description: description,
    main: main,
    repository: repository,
    scripts: scripts,
    files: files,
    keywords: keywords,
    author: author,
    license: license,
    bugs: bugs,
    homepage: homepage,
    devDependencies: devDependencies
  },
  classCallCheck = function(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  },
  createClass = function() {
    function r(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
      }
    }
    return function(e, t, n) {
      return t && r(e.prototype, t), n && r(e, n), e
    }
  }(),
  toConsumableArray = function(e) {
    if (Array.isArray(e)) {
      for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
      return n
    }
    return Array.from(e)
  },
  Version = pkg.version;
// console.log("当前wxministore版本：" + Version);
var Store = function() {
    function c(e) {
      classCallCheck(this, c), this.version = Version, this.$state = {}, this.$r = [];
      var t = e.openPart,
        n = void 0 !== t && t,
        f = e.behavior,
        r = e.methods,
        u = void 0 === r ? {} : r,
        o = e.pageLisener,
        i = void 0 === o ? {} : o,
        a = e.nonWritable,
        s = void 0 !== a && a;
      this.$state = {}, _typeOf(e.state) === TYPE_OBJECT && (this.$state = Object.assign({}, _deepClone(e.state))), this.$r = [];

      function p(e, t) {
        var n = 1 < arguments.length && void 0 !== t ? t : {};
        e.$store = {};
        var r = n.useProp;
        n.hasOwnProperty("useProp") && (r && "string" == typeof r || _typeOf(r) === TYPE_ARRAY ? e.$store.useProp = [].concat(r) : e.$store.useProp = []), e.$store.useStore = g(n), g(n) && (d.$r.push(e), e.$store.useProp ? e.setData({
          $state: _filterKey(d.$state, e.$store.useProp, function(e, t) {
            return e === t
          })
        }) : e.setData({
          $state: d.$state
        }))
      }

      function h(t) {
        var e = d.$r.findIndex(function(e) {
          return e === t
        }); - 1 < e && d.$r.splice(e, 1)
      }
      this.$openPart = n;
      var d = this,
        y = ["data", "onLoad", "onShow", "onReady", "onHide", "onUnload", "onPullDownRefresh", "onReachBottom", "onShareAppMessage", "onPageScroll", "onTabItemTap"],
        g = function(e) {
          return !0 === n && !0 === (0 < arguments.length && void 0 !== e ? e : {}).useStore || !n
        },
        l = Page,
        v = Component;
      if (App.Page = function() {
          for (var e = arguments.length, t = Array(1 < e ? e - 1 : 0), n = 1; n < e; n++) t[n - 1] = arguments[n];
          var r = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
          g(r) && (r.data = Object.assign(r.data || {}, {
            $state: d.$state
          })), Object.keys(u).forEach(function(t) {
            "function" != typeof u[t] || y.some(function(e) {
              return e === t
            }) || (r[t] = u[t])
          });
          var o = r.onLoad;
          r.onLoad = function() {
            p(this, r), o && o.apply(this, arguments)
          };
          var a = r.onUnload;
          r.onUnload = function() {
            h(this), a && a.apply(this, arguments)
          }, Object.keys(i).forEach(function(t) {
            if ("function" == typeof i[t] && y.some(function(e) {
                return e === t
              })) {
              var e = r[t];
              r[t] = function() {
                i[t].apply(this, arguments), e && e.apply(this, arguments)
              }
            }
          }), l.apply(void 0, [r].concat(t))
        }, !s) try {
        Page = App.Page
      } catch (e) {}
      if (App.Component = function() {
          for (var e = arguments.length, t = Array(1 < e ? e - 1 : 0), n = 1; n < e; n++) t[n - 1] = arguments[n];
          var r = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
          g(r) && (r.data = Object.assign(r.data || {}, {
            $state: d.$state
          })), Object.keys(u).forEach(function(t) {
            "function" != typeof u[t] || y.some(function(e) {
              return e === t
            }) || (r.methods || (r.methods = {}), r.methods[t] = u[t])
          }), f && (r.behaviors = [f].concat(toConsumableArray(r.behaviors || [])));

          function o() {
            p(this, r), l && l.apply(this, arguments)
          }

          function a() {
            h(this), c && c.apply(this, arguments)
          }
          var i = r.lifetimes,
            s = void 0 === i ? {} : i,
            l = s.attached || r.attached,
            c = s.detached || r.detached;
          _typeOf(r.lifetimes) === TYPE_OBJECT ? (r.lifetimes.attached = o, r.lifetimes.detached = a) : (r.attached = o, r.detached = a), v.apply(void 0, [r].concat(t))
        }, !s) try {
        Component = App.Component
      } catch (e) {}
    }
    return createClass(c, [{
      key: "setState",
      value: function(e, t) {
        var n = 1 < arguments.length && void 0 !== t ? t : function() {};
        if (_typeOf(e) !== TYPE_OBJECT) throw new Error("setState的第一个参数须为object!");
        console.time && console.time("setState");
        var r = this.$state,
          o = setData(e, r);
        if (this.$state = o, 0 < this.$r.length) {
          var a = diff(o, r);
          // console.log("diff后实际设置的值：", _deepClone(a));
          var i = Object.keys(a);
          if (0 < i.length) {
            var s = {};
            i.forEach(function(e) {
              s["$state." + e] = a[e]
            });
            var l = this.$r.map(function(t) {
              if (t.$store.hasOwnProperty("useProp")) {
                var n = _filterKey(s, t.$store.useProp, function(e, t) {
                  return e === "$state." + t || !!e.match(new RegExp("^[$]state." + t + "[.|[]", "g"))
                });
                return 0 < Object.keys(n).length ? new Promise(function(e) {
                  t.setData(n, e)
                }) : Promise.resolve()
              }
              return new Promise(function(e) {
                t.setData(s, e)
              })
            });
            Promise.all(l).then(n)
          } else n()
        } else n();
        // console.timeEnd && console.timeEnd("setState")
      }
    }, {
      key: "getState",
      value: function() {
        return _deepClone(this.$state)
      }
    }]), c
  }(),
  _filterKey = function(t, e, n) {
    var r = 1 < arguments.length && void 0 !== e ? e : [],
      o = n,
      a = {};
    return Object.keys(t).filter(function(t) {
      return r.some(function(e) {
        return o(t, e)
      })
    }).forEach(function(e) {
      a[e] = t[e]
    }), a
  },
  setData = function(e, t) {
    var n = _deepClone(t),
      r = _deepClone(e);
    return Object.keys(r).forEach(function(e) {
      dataHandler(e, r[e], n)
    }), n
  },
  dataHandler = function(e, t, n) {
    for (var r = pathHandler(e), o = n, a = 0; a < r.length - 1; a++) keyToData(r[a], r[a + 1], o), o = o[r[a]];
    o[r[r.length - 1]] = t
  },
  pathHandler = function(e) {
    for (var t = "", n = [], r = 0, o = e.length; r < o; r++) {
      if ("[" === e[0]) throw new Error("key值不能以[]开头");
      e[r].match(/\.|\[/g) && (cleanAndPush(t, n), t = ""), t += e[r]
    }
    return cleanAndPush(t, n), n
  },
  cleanAndPush = function(e, t) {
    var n = cleanKey(e);
    "" !== n && t.push(n)
  },
  keyToData = function(e, t, n) {
    if ("" !== e) {
      var r = _typeOf(n[e]);
      "number" == typeof t && r !== TYPE_ARRAY ? n[e] = [] : "string" == typeof t && r !== TYPE_OBJECT && (n[e] = {})
    }
  },
  cleanKey = function(e) {
    if (e.match(/\[\S+\]/g)) {
      var t = e.replace(/\[|\]/g, "");
      if (Number.isNaN(parseInt(t))) throw new Error("[]中必须为数字");
      return +t
    }
    return e.replace(/\[|\.|\]| /g, "")
  };
module.exports = Store;
//# sourceMappingURL=store.js.map
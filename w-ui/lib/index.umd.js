!function (e, o) {
    "object" == typeof exports && "object" == typeof module ? module.exports = o(require("vue")) : "function" == typeof define && define.amd ? define([], o) : "object" == typeof exports ? exports["w-ui"] = o(require("vue")) : e["w-ui"] = o(e.Vue)
}(self, (function (e) {
    return (() => {
        "use strict";
        var o = {
            452: o => {
                o.exports = e
            }
        }, t = {};

        function n(e) {
            var r = t[e];
            if (void 0 !== r) return r.exports;
            var c = t[e] = {exports: {}};
            return o[e](c, c.exports, n), c.exports
        }

        n.d = (e, o) => {
            for (var t in o) n.o(o, t) && !n.o(e, t) && Object.defineProperty(e, t, {enumerable: !0, get: o[t]})
        }, n.o = (e, o) => Object.prototype.hasOwnProperty.call(e, o), n.r = e => {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
        };
        var r = {};
        return (() => {
            n.r(r), n.d(r, {default: () => p});
            var e = n(452), o = (0, e.withScopeId)("data-v-4a9765f2")((function (o, t, n, r, c, a) {
                return (0, e.openBlock)(), (0, e.createBlock)("div", null, " button")
            }));
            const t = (0, e.defineComponent)({name: "WButton"});
            t.render = o, t.__scopeId = "data-v-4a9765f2";
            const c = t;
            c.install = function (e) {
                e.component(c.name, c)
            };
            const a = c;
            var i = (0, e.withScopeId)("data-v-2e21910b")((function (o, t, n, r, c, a) {
                return (0, e.openBlock)(), (0, e.createBlock)("div", null, " icon ")
            }));
            const u = (0, e.defineComponent)({name: "WIcon"});
            u.render = i, u.__scopeId = "data-v-2e21910b";
            const d = u;
            d.install = function (e) {
                e.component(d.name, d)
            };
            var f = [a, d];
            const p = {
                install: function (e) {
                    f.forEach((function (o) {
                        e.component(o.name, o)
                    }))
                }
            }
        })(), r
    })()
}));
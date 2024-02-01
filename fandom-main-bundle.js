/*! For license information please see main.bundle.js.LICENSE.txt */
(() => {
    var e,
        t,
        i = {
            4492: (e) => {
                function t(e, t) {
                    return (
                        Object.keys(t).forEach(function (i) {
                            "default" === i ||
                                "__esModule" === i ||
                                e.hasOwnProperty(i) ||
                                Object.defineProperty(e, i, {
                                    enumerable: !0,
                                    get: function () {
                                        return t[i];
                                    },
                                });
                        }),
                        e
                    );
                }
                function i(e, t, i, n) {
                    Object.defineProperty(e, t, { get: i, set: n, enumerable: !0, configurable: !0 });
                }
                i(e.exports, "utils", () => n);
                var n = {},
                    s = {};
                function o(e) {
                    return new Promise((t) => setTimeout(() => t(), e));
                }
                i(s, "delay", () => o);
                var r = {};
                function a() {
                    const e = new URLSearchParams(window.location.search.substring(1));
                    return Boolean(e.get("adengine_debug")) ? e.get("adengine_debug") : e.get("identity_debug");
                }
                i(r, "getDebugGroup", () => a);
                var d = {};
                i(d, "localStorageHelper", () => l);
                class l {
                    constructor(e, t = 6e4) {
                        (this.key = e), (this.ttlInMilliseconds = t);
                        let i = !1;
                        try {
                            (i = void 0 !== window.localStorage && null !== window.localStorage), i && (window.localStorage.setItem("__test__", "test"), window.localStorage.removeItem("__test__"));
                        } catch (e) {
                            i = !1;
                        }
                        const n = (e) => window?.instantConfigCache?.[e] ?? null,
                            s = (e, t) => {
                                void 0 === window.instantConfigCache && (window.instantConfigCache = {}), (window.instantConfigCache[e] = t);
                            };
                        this.storageAdapter = {
                            getItem: (e) => {
                                try {
                                    return i ? window.localStorage.getItem(e) ?? n(e) : n(e);
                                } catch (t) {
                                    return n(e);
                                }
                            },
                            setItem: (e, t) => {
                                try {
                                    if (i) return localStorage.setItem(e, t);
                                    s(e, t);
                                } catch (i) {
                                    s(e, t);
                                }
                            },
                        };
                    }
                    set(e) {
                        const t = this.getObjectToStore(e);
                        this.storageAdapter.setItem(this.key, JSON.stringify(t));
                    }
                    get() {
                        const e = this.storageAdapter.getItem(this.key);
                        return e ? this.parseStoredValue(JSON.parse(e)) : null;
                    }
                    expired(e) {
                        return !e || e < Date.now();
                    }
                    getObjectToStore(e) {
                        return { data: e, ttl: Date.now() + this.ttlInMilliseconds };
                    }
                    parseStoredValue(e) {
                        return this.expired(e?.ttl) ? null : e.data;
                    }
                }
                var c = {};
                i(c, "lock", () => p), i(c, "release", () => h);
                const u = new l("instant-config-lock", 1e3);
                function p() {
                    return "lock" === u.get() || (u.set("lock"), !1);
                }
                function h() {
                    u.set(null);
                }
                var g = {};
                i(g, "getTimeDelta", () => b), i(g, "logger", () => y), i(g, "warner", () => _);
                const m = a() || "",
                    f = m.split(","),
                    v = Date.now();
                function b() {
                    return ((Date.now() - (window.performance?.timeOrigin ?? v)) / 1e3).toFixed(4);
                }
                function y(e, ...t) {
                    "" !== m && (("1" !== m && -1 === f.indexOf(e)) || window.console.info(`${b()}s\t\t ${e}`, t));
                }
                function _(e, ...t) {
                    "" !== m && (("1" !== m && -1 === f.indexOf(e)) || window.console.warn(e, t));
                }
                t(n, r), t(n, d), t(n, g), t(n, s), t(n, c);
                var S = {},
                    E = {};
                i(E, "EmptyInstantConfigCacheStorage", () => w);
                class w {
                    get(e) {}
                    set(e) {}
                    remove(e) {}
                }
                var A = {};
                i(A, "InstantConfigInterpreter", () => W);
                var T = {},
                    I = {};
                i(I, "BrowserMatcher", () => M);
                var C = {};
                i(C, "extractNegation", () => V);
                var N = {},
                    O = {};
                function P(e) {
                    return Array.isArray(e) && e.length > 0 && "object" == typeof e[0];
                }
                i(O, "shouldBeListOfConfigGroups", () => P);
                var D = {};
                i(D, "negativePrefix", () => L), i(D, "cacheSuffix", () => k), i(D, "samplingSeparator", () => R), i(D, "worldWide", () => x), i(D, "precision", () => U);
                const L = "non-",
                    k = "-cached",
                    R = "/",
                    x = "XX",
                    U = 10 ** 6;
                function V(e) {
                    return e.startsWith(L) ? { value: e.replace(L, ""), negated: !0 } : { value: e, negated: !1 };
                }
                t(N, {}), t(N, {}), t(N, {}), t(N, O), t(N, {}), t(N, {}), t(N, {}), t(N, {}), t(N, {}), t(N, D);
                class M {
                    constructor(e) {
                        this.currentBrowser = e?.toLowerCase();
                    }
                    isValid(e = []) {
                        const t = e.map((e) => e.toLowerCase()).map((e) => V(e));
                        return 0 === e.length || !this.currentBrowser || (!this.isCurrentNegated(this.currentBrowser, t) && t.some((e) => this.currentBrowser.includes(e.value) !== e.negated));
                    }
                    isCurrentNegated(e, t) {
                        return t.some((t) => e.includes(t.value) && t.negated);
                    }
                }
                var j = {};
                i(j, "DeviceMatcher", () => B);
                class B {
                    constructor(e) {
                        this.currentDevice = e;
                    }
                    isValid(e = []) {
                        const t = e.map((e) => e.toLowerCase()).map((e) => V(e));
                        return 0 === t.length || !this.currentDevice || (!this.isCurrentNegated(this.currentDevice, t) && t.some((e) => (e.value === this.currentDevice) !== e.negated));
                    }
                    isCurrentNegated(e, t) {
                        return t.some((t) => e.includes(t.value) && t.negated);
                    }
                }
                var z = {};
                i(z, "DomainMatcher", () => G);
                class G {
                    isValid(e = []) {
                        return 0 === e.length || e.some((e) => window.location.hostname.includes(e));
                    }
                }
                var F = {};
                i(F, "RegionMatcher", () => $);
                class $ {
                    constructor(e) {
                        this.geo = e;
                    }
                    isValid(e = [], t) {
                        const i = this.filterOutInvalidRegions(e);
                        return t ? t(i) : this.isProperGeo(i);
                    }
                    getCountryCode() {
                        return this.geo?.country;
                    }
                    getRegionCode() {
                        return this.geo?.region;
                    }
                    getContinentCode() {
                        return this.geo?.continent;
                    }
                    isProperGeo(e = []) {
                        return !(!e || !e.indexOf || this.isGeoExcluded(e) || !(this.isProperContinent(e) || this.isProperCountry(e) || this.isProperRegion(e)));
                    }
                    filterOutInvalidRegions(e) {
                        return e.filter((e) => !e.includes(R)).filter((e) => !e.includes(k));
                    }
                    isProperCountry(e) {
                        return !!(e && e.indexOf && (e.indexOf(this.getCountryCode()) > -1 || this.isSampledForGeo(e, this.getCountryCode())));
                    }
                    isProperRegion(e) {
                        const t = `${this.getCountryCode()}-${this.getRegionCode()}`;
                        return !!(e && e.indexOf && (e.indexOf(t) > -1 || this.isSampledForGeo(e, t)));
                    }
                    containsContinent(e) {
                        const t = `${x}-${this.getContinentCode()}`;
                        return e.indexOf(t) > -1 || this.isSampledForGeo(e, t);
                    }
                    containsWorldWide(e) {
                        return e.indexOf(x) > -1 || this.isSampledForGeo(e, x);
                    }
                    isProperContinent(e) {
                        return !(!e || !e.indexOf || (!this.containsWorldWide(e) && !this.containsContinent(e)));
                    }
                    isGeoExcluded(e) {
                        return !!(e.indexOf(`${L}${this.getCountryCode()}`) > -1 || e.indexOf(`${L}${this.getCountryCode()}-${this.getRegionCode()}`) > -1 || e.indexOf(`${L}${x}-${this.getContinentCode()}`) > -1);
                    }
                    hasSampling(e) {
                        return (t) => 0 !== t.indexOf(L) && t.indexOf(e + R) > -1;
                    }
                    getSamplingLimits(e) {
                        let [, t] = e.split(R);
                        return (t = t.replace(k, "")), Math.round(parseFloat(t) * U) || 0;
                    }
                    isSampledForGeo(e, t) {
                        const i = e.filter(this.hasSampling(t));
                        if (0 === i.length) return !1;
                        const n = Math.round(Math.random() * (100 * U)) || 0;
                        return i.map((e) => this.getSamplingLimits(e)).some((e) => n < e);
                    }
                }
                var H = {};
                i(H, "SamplingCacheManager", () => q);
                class q {
                    constructor(e) {
                        (this.cacheStorage = e), (this.precision = 10 ** 6);
                    }
                    apply(e, t, i) {
                        const n = this.cacheStorage.get(e);
                        if (void 0 !== n) {
                            if (this.isCachedValueValid(n, t)) return n.result;
                            this.cacheStorage.remove(e);
                        }
                        const s = i();
                        if ("number" != typeof t.sampling || !1 === s) return s;
                        const o = this.getSamplingResult(t.sampling),
                            r = { name: e, result: o, withCookie: Boolean(t.samplingCache), group: o ? "B" : "A", limit: this.getLimit(o, t.sampling) };
                        return this.cacheStorage.set(r), o;
                    }
                    getSamplingResult(e) {
                        const t = Math.round(100 * Math.random() * this.precision);
                        return Math.round(e * this.precision) > t;
                    }
                    isCachedValueValid(e, t) {
                        return t.samplingCache && "number" == typeof t.sampling && e.limit == this.getLimit(e.result, t.sampling);
                    }
                    getLimit(e, t) {
                        return +(e ? t : 100 - t).toFixed(6);
                    }
                }
                t(T, I), t(T, j), t(T, z), t(T, C), t(T, F), t(T, H);
                class W {
                    constructor(e = new M(), t = new B(), i = new G(), n = new $(), s = new w()) {
                        (this.browserMatcher = e), (this.deviceMatcher = t), (this.domainMatcher = i), (this.regionMatcher = n), (this.logGroup = "instant-config-interpreter"), (this.configResponse = {}), (this.samplingCache = new q(s));
                    }
                    init(e, t = {}, i) {
                        return (this.configResponse = { ...t, ...e }), (this.regionValidationPredicate = i), this;
                    }
                    getValues() {
                        return (
                            n.logger(this.logGroup, "get values called with", this.configResponse),
                            Object.keys(this.configResponse)
                                .map((e) => ({ key: e, value: this.configResponse[e] }))
                                .map(({ key: e, value: t }) => (P(t) ? { key: e, value: this.getValue(e, t) } : { key: e, value: t }))
                                .reduce((e, t) => ({ ...e, [t.key]: t.value }), {})
                        );
                    }
                    getValue(e, t) {
                        const i = t.find((t, i) => this.samplingCache.apply(`${e}-${i}`, t, this.getPredicate(t)));
                        if (void 0 !== i) return i.value;
                    }
                    getPredicate(e) {
                        return () => this.browserMatcher.isValid(e.browsers) && this.deviceMatcher.isValid(e.devices) && this.domainMatcher.isValid(e.domains) && this.regionMatcher.isValid(e.regions, this.regionValidationPredicate);
                    }
                }
                var K = {};
                async function Y(e, t = 2e3) {
                    const i = new AbortController(),
                        n = setTimeout(() => i.abort(), t),
                        s = await fetch(e, { signal: i.signal });
                    return clearTimeout(n), s;
                }
                i(K, "InstantConfigLoader", () => J);
                const Q = "instant-config-loader",
                    X = { b: "browsers", d: "devices", s: "sampling", c: "samplingCache", r: "regions", v: "value" };
                class J {
                    constructor(e, t = window) {
                        (this.params = e), (this.configPromise = null), (this.storage = new n.localStorageHelper(`instant-config-${e.appName}`, 6e4)), (this.instantConfig = this.fromContainer(t));
                    }
                    async getConfig() {
                        return this.instantConfig ? this.instantConfig : (this.configPromise || (this.configPromise = this.fetchInstantConfig().then((e) => e ?? this.fetchFallbackConfig())), this.configPromise.then((e) => e));
                    }
                    async fetchInstantConfig(e = !1) {
                        if (n.lock() && !e) return await o(500), this.fetchInstantConfig(!0);
                        const t = `${this.params.instantConfigEndpoint ?? "https://services.fandom.com"}/${this.params.instantConfigVariant ?? "icbm"}/api/config?app=${this.params.appName}`;
                        try {
                            const e = this.storage.get();
                            if (e) return n.logger(Q, "instant config pulled from local storage", e), JSON.parse(e);
                            const i = await Y(t, this.params.requestTimeout);
                            if (!i.ok) return;
                            const s = await i.json();
                            return this.storage.set(JSON.stringify(s)), n.release(), n.logger(Q, "instant config fetched", s), s;
                        } catch (e) {
                            return n.warner(Q, "could not fetch instant config", e), void n.release();
                        }
                    }
                    async fetchFallbackConfig() {
                        n.logger(Q, "Fetching fallback config");
                        const e = this.params.instantConfigFallbackEndpoint;
                        if (void 0 === e) return {};
                        try {
                            n.logger(Q, e);
                            const t = await Y(e, this.params.requestTimeout);
                            if (!t.ok) return {};
                            const i = await t.json();
                            return n.logger(Q, "fallback config fetched", i), i;
                        } catch (e) {
                            return n.warner(Q, "could not fetch fallback config", e), {};
                        }
                    }
                    fromContainer(e) {
                        let t = e.instantConfig;
                        return (
                            "object" != typeof t ||
                                t._ready ||
                                (Object.keys(t).forEach((e) => {
                                    const i = t[e];
                                    P(i) && (t[e] = i.map((e) => Object.fromEntries(Object.entries(e).map(([e, t]) => [X[e] ? X[e] : e, t]))));
                                }),
                                (t._ready = !0),
                                (e.instantConfig = t)),
                            t
                        );
                    }
                }
                var Z = {};
                i(Z, "InstantConfigOverrider", () => te);
                const ee = ["InstantGlobals", "icbm"];
                class te {
                    override(e, t) {
                        return [...e.keys()]
                            .filter((e) => {
                                return (t = e), ee.some((e) => t.startsWith(`${e}.`) || t.startsWith(`${e}__`));
                                var t;
                            })
                            .map((e) => {
                                const [, t] = e
                                    .split(".")
                                    .map((e) => e.split("__"))
                                    .flat();
                                return { paramKey: e, key: t };
                            })
                            .map(({ paramKey: t, key: i }) => ({ key: i, value: this.parseValue(e.get(t)) }))
                            .reduce((e, { key: t, value: i }) => ({ ...e, [t]: i }), t);
                    }
                    parseValue(e) {
                        if ("true" === e || "false" === e) return "true" === e;
                        const t = parseInt(e, 10);
                        if (e === `${t}`) return t;
                        try {
                            return JSON.parse(e);
                        } catch (t) {
                            return e || null;
                        }
                    }
                }
                t(S, E), t(S, A), t(S, K), t(S, Z), t(S, T), t(e.exports, S), t(e.exports, N);
            },
            5787: () => {
                !(function (e) {
                    var t = function (t) {
                        (this._options = {
                            checkOnLoad: !1,
                            resetOnEnd: !1,
                            loopCheckTime: 50,
                            loopMaxNumber: 5,
                            baitClass: "pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links",
                            baitStyle: "width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;",
                            debug: !1,
                        }),
                            (this._var = { version: "3.2.1", bait: null, checking: !1, loop: null, loopNumber: 0, event: { detected: [], notDetected: [] } }),
                            void 0 !== t && this.setOption(t);
                        var i = this,
                            n = function () {
                                setTimeout(function () {
                                    !0 === i._options.checkOnLoad &&
                                        (!0 === i._options.debug && i._log("onload->eventCallback", "A check loading is launched"),
                                        null === i._var.bait && i._creatBait(),
                                        setTimeout(function () {
                                            i.check();
                                        }, 1));
                                }, 1);
                            };
                        void 0 !== e.addEventListener ? e.addEventListener("load", n, !1) : e.attachEvent("onload", n);
                    };
                    (t.prototype._options = null),
                        (t.prototype._var = null),
                        (t.prototype._bait = null),
                        (t.prototype._log = function (e, t) {
                            console.log("[BlockAdBlock][" + e + "] " + t);
                        }),
                        (t.prototype.setOption = function (e, t) {
                            if (void 0 !== t) {
                                var i = e;
                                (e = {})[i] = t;
                            }
                            for (var n in e) (this._options[n] = e[n]), !0 === this._options.debug && this._log("setOption", 'The option "' + n + '" he was assigned to "' + e[n] + '"');
                            return this;
                        }),
                        (t.prototype._creatBait = function () {
                            var t = document.createElement("div");
                            t.setAttribute("class", this._options.baitClass),
                                t.setAttribute("style", this._options.baitStyle),
                                (this._var.bait = e.document.body.appendChild(t)),
                                this._var.bait.offsetParent,
                                this._var.bait.offsetHeight,
                                this._var.bait.offsetLeft,
                                this._var.bait.offsetTop,
                                this._var.bait.offsetWidth,
                                this._var.bait.clientHeight,
                                this._var.bait.clientWidth,
                                !0 === this._options.debug && this._log("_creatBait", "Bait has been created");
                        }),
                        (t.prototype._destroyBait = function () {
                            e.document.body.removeChild(this._var.bait), (this._var.bait = null), !0 === this._options.debug && this._log("_destroyBait", "Bait has been removed");
                        }),
                        (t.prototype.check = function (e) {
                            if ((void 0 === e && (e = !0), !0 === this._options.debug && this._log("check", "An audit was requested " + (!0 === e ? "with a" : "without") + " loop"), !0 === this._var.checking))
                                return !0 === this._options.debug && this._log("check", "A check was canceled because there is already an ongoing"), !1;
                            (this._var.checking = !0), null === this._var.bait && this._creatBait();
                            var t = this;
                            return (
                                (this._var.loopNumber = 0),
                                !0 === e &&
                                    (this._var.loop = setInterval(function () {
                                        t._checkBait(e);
                                    }, this._options.loopCheckTime)),
                                setTimeout(function () {
                                    t._checkBait(e);
                                }, 1),
                                !0 === this._options.debug && this._log("check", "A check is in progress ..."),
                                !0
                            );
                        }),
                        (t.prototype._checkBait = function (t) {
                            var i = !1;
                            if (
                                (null === this._var.bait && this._creatBait(),
                                (null === e.document.body.getAttribute("abp") &&
                                    null !== this._var.bait.offsetParent &&
                                    0 != this._var.bait.offsetHeight &&
                                    0 != this._var.bait.offsetLeft &&
                                    0 != this._var.bait.offsetTop &&
                                    0 != this._var.bait.offsetWidth &&
                                    0 != this._var.bait.clientHeight &&
                                    0 != this._var.bait.clientWidth) ||
                                    (i = !0),
                                void 0 !== e.getComputedStyle)
                            ) {
                                var n = e.getComputedStyle(this._var.bait, null);
                                !n || ("none" != n.getPropertyValue("display") && "hidden" != n.getPropertyValue("visibility")) || (i = !0);
                            }
                            !0 === this._options.debug &&
                                this._log(
                                    "_checkBait",
                                    "A check (" +
                                        (this._var.loopNumber + 1) +
                                        "/" +
                                        this._options.loopMaxNumber +
                                        " ~" +
                                        (1 + this._var.loopNumber * this._options.loopCheckTime) +
                                        "ms) was conducted and detection is " +
                                        (!0 === i ? "positive" : "negative")
                                ),
                                !0 === t && (this._var.loopNumber++, this._var.loopNumber >= this._options.loopMaxNumber && this._stopLoop()),
                                !0 === i
                                    ? (this._stopLoop(), this._destroyBait(), this.emitEvent(!0), !0 === t && (this._var.checking = !1))
                                    : (null !== this._var.loop && !1 !== t) || (this._destroyBait(), this.emitEvent(!1), !0 === t && (this._var.checking = !1));
                        }),
                        (t.prototype._stopLoop = function (e) {
                            clearInterval(this._var.loop), (this._var.loop = null), (this._var.loopNumber = 0), !0 === this._options.debug && this._log("_stopLoop", "A loop has been stopped");
                        }),
                        (t.prototype.emitEvent = function (e) {
                            !0 === this._options.debug && this._log("emitEvent", "An event with a " + (!0 === e ? "positive" : "negative") + " detection was called");
                            var t = this._var.event[!0 === e ? "detected" : "notDetected"];
                            for (var i in t) !0 === this._options.debug && this._log("emitEvent", "Call function " + (parseInt(i) + 1) + "/" + t.length), t.hasOwnProperty(i) && t[i]();
                            return !0 === this._options.resetOnEnd && this.clearEvent(), this;
                        }),
                        (t.prototype.clearEvent = function () {
                            (this._var.event.detected = []), (this._var.event.notDetected = []), !0 === this._options.debug && this._log("clearEvent", "The event list has been cleared");
                        }),
                        (t.prototype.on = function (e, t) {
                            return this._var.event[!0 === e ? "detected" : "notDetected"].push(t), !0 === this._options.debug && this._log("on", 'A type of event "' + (!0 === e ? "detected" : "notDetected") + '" was added'), this;
                        }),
                        (t.prototype.onDetected = function (e) {
                            return this.on(!0, e);
                        }),
                        (t.prototype.onNotDetected = function (e) {
                            return this.on(!1, e);
                        }),
                        (e.BlockAdBlock = t),
                        void 0 === e.blockAdBlock && (e.blockAdBlock = new t({ checkOnLoad: !0, resetOnEnd: !0 }));
                })(window);
            },
            4155: (e) => {
                var t,
                    i,
                    n = (e.exports = {});
                function s() {
                    throw new Error("setTimeout has not been defined");
                }
                function o() {
                    throw new Error("clearTimeout has not been defined");
                }
                function r(e) {
                    if (t === setTimeout) return setTimeout(e, 0);
                    if ((t === s || !t) && setTimeout) return (t = setTimeout), setTimeout(e, 0);
                    try {
                        return t(e, 0);
                    } catch (i) {
                        try {
                            return t.call(null, e, 0);
                        } catch (i) {
                            return t.call(this, e, 0);
                        }
                    }
                }
                !(function () {
                    try {
                        t = "function" == typeof setTimeout ? setTimeout : s;
                    } catch (e) {
                        t = s;
                    }
                    try {
                        i = "function" == typeof clearTimeout ? clearTimeout : o;
                    } catch (e) {
                        i = o;
                    }
                })();
                var a,
                    d = [],
                    l = !1,
                    c = -1;
                function u() {
                    l && a && ((l = !1), a.length ? (d = a.concat(d)) : (c = -1), d.length && p());
                }
                function p() {
                    if (!l) {
                        var e = r(u);
                        l = !0;
                        for (var t = d.length; t; ) {
                            for (a = d, d = []; ++c < t; ) a && a[c].run();
                            (c = -1), (t = d.length);
                        }
                        (a = null),
                            (l = !1),
                            (function (e) {
                                if (i === clearTimeout) return clearTimeout(e);
                                if ((i === o || !i) && clearTimeout) return (i = clearTimeout), clearTimeout(e);
                                try {
                                    i(e);
                                } catch (t) {
                                    try {
                                        return i.call(null, e);
                                    } catch (t) {
                                        return i.call(this, e);
                                    }
                                }
                            })(e);
                    }
                }
                function h(e, t) {
                    (this.fun = e), (this.array = t);
                }
                function g() {}
                (n.nextTick = function (e) {
                    var t = new Array(arguments.length - 1);
                    if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
                    d.push(new h(e, t)), 1 !== d.length || l || r(p);
                }),
                    (h.prototype.run = function () {
                        this.fun.apply(null, this.array);
                    }),
                    (n.title = "browser"),
                    (n.browser = !0),
                    (n.env = {}),
                    (n.argv = []),
                    (n.version = ""),
                    (n.versions = {}),
                    (n.on = g),
                    (n.addListener = g),
                    (n.once = g),
                    (n.off = g),
                    (n.removeListener = g),
                    (n.removeAllListeners = g),
                    (n.emit = g),
                    (n.prependListener = g),
                    (n.prependOnceListener = g),
                    (n.listeners = function (e) {
                        return [];
                    }),
                    (n.binding = function (e) {
                        throw new Error("process.binding is not supported");
                    }),
                    (n.cwd = function () {
                        return "/";
                    }),
                    (n.chdir = function (e) {
                        throw new Error("process.chdir is not supported");
                    }),
                    (n.umask = function () {
                        return 0;
                    });
            },
            8660: (e, t, i) => {
                var n,
                    s = i(4155);
                !(function (e) {
                    !(function (t) {
                        var n = "object" == typeof i.g ? i.g : "object" == typeof self ? self : "object" == typeof this ? this : Function("return this;")(),
                            o = r(e);
                        function r(e, t) {
                            return function (i, n) {
                                "function" != typeof e[i] && Object.defineProperty(e, i, { configurable: !0, writable: !0, value: n }), t && t(i, n);
                            };
                        }
                        void 0 === n.Reflect ? (n.Reflect = e) : (o = r(n.Reflect, o)),
                            (function (e) {
                                var t = Object.prototype.hasOwnProperty,
                                    i = "function" == typeof Symbol,
                                    n = i && void 0 !== Symbol.toPrimitive ? Symbol.toPrimitive : "@@toPrimitive",
                                    o = i && void 0 !== Symbol.iterator ? Symbol.iterator : "@@iterator",
                                    r = "function" == typeof Object.create,
                                    a = { __proto__: [] } instanceof Array,
                                    d = !r && !a,
                                    l = {
                                        create: r
                                            ? function () {
                                                  return U(Object.create(null));
                                              }
                                            : a
                                            ? function () {
                                                  return U({ __proto__: null });
                                              }
                                            : function () {
                                                  return U({});
                                              },
                                        has: d
                                            ? function (e, i) {
                                                  return t.call(e, i);
                                              }
                                            : function (e, t) {
                                                  return t in e;
                                              },
                                        get: d
                                            ? function (e, i) {
                                                  return t.call(e, i) ? e[i] : void 0;
                                              }
                                            : function (e, t) {
                                                  return e[t];
                                              },
                                    },
                                    c = Object.getPrototypeOf(Function),
                                    u = "object" == typeof s && s.env && "true" === s.env.REFLECT_METADATA_USE_MAP_POLYFILL,
                                    p =
                                        u || "function" != typeof Map || "function" != typeof Map.prototype.entries
                                            ? (function () {
                                                  var e = {},
                                                      t = [],
                                                      i = (function () {
                                                          function e(e, t, i) {
                                                              (this._index = 0), (this._keys = e), (this._values = t), (this._selector = i);
                                                          }
                                                          return (
                                                              (e.prototype["@@iterator"] = function () {
                                                                  return this;
                                                              }),
                                                              (e.prototype[o] = function () {
                                                                  return this;
                                                              }),
                                                              (e.prototype.next = function () {
                                                                  var e = this._index;
                                                                  if (e >= 0 && e < this._keys.length) {
                                                                      var i = this._selector(this._keys[e], this._values[e]);
                                                                      return e + 1 >= this._keys.length ? ((this._index = -1), (this._keys = t), (this._values = t)) : this._index++, { value: i, done: !1 };
                                                                  }
                                                                  return { value: void 0, done: !0 };
                                                              }),
                                                              (e.prototype.throw = function (e) {
                                                                  throw (this._index >= 0 && ((this._index = -1), (this._keys = t), (this._values = t)), e);
                                                              }),
                                                              (e.prototype.return = function (e) {
                                                                  return this._index >= 0 && ((this._index = -1), (this._keys = t), (this._values = t)), { value: e, done: !0 };
                                                              }),
                                                              e
                                                          );
                                                      })();
                                                  return (function () {
                                                      function t() {
                                                          (this._keys = []), (this._values = []), (this._cacheKey = e), (this._cacheIndex = -2);
                                                      }
                                                      return (
                                                          Object.defineProperty(t.prototype, "size", {
                                                              get: function () {
                                                                  return this._keys.length;
                                                              },
                                                              enumerable: !0,
                                                              configurable: !0,
                                                          }),
                                                          (t.prototype.has = function (e) {
                                                              return this._find(e, !1) >= 0;
                                                          }),
                                                          (t.prototype.get = function (e) {
                                                              var t = this._find(e, !1);
                                                              return t >= 0 ? this._values[t] : void 0;
                                                          }),
                                                          (t.prototype.set = function (e, t) {
                                                              var i = this._find(e, !0);
                                                              return (this._values[i] = t), this;
                                                          }),
                                                          (t.prototype.delete = function (t) {
                                                              var i = this._find(t, !1);
                                                              if (i >= 0) {
                                                                  for (var n = this._keys.length, s = i + 1; s < n; s++) (this._keys[s - 1] = this._keys[s]), (this._values[s - 1] = this._values[s]);
                                                                  return this._keys.length--, this._values.length--, t === this._cacheKey && ((this._cacheKey = e), (this._cacheIndex = -2)), !0;
                                                              }
                                                              return !1;
                                                          }),
                                                          (t.prototype.clear = function () {
                                                              (this._keys.length = 0), (this._values.length = 0), (this._cacheKey = e), (this._cacheIndex = -2);
                                                          }),
                                                          (t.prototype.keys = function () {
                                                              return new i(this._keys, this._values, n);
                                                          }),
                                                          (t.prototype.values = function () {
                                                              return new i(this._keys, this._values, s);
                                                          }),
                                                          (t.prototype.entries = function () {
                                                              return new i(this._keys, this._values, r);
                                                          }),
                                                          (t.prototype["@@iterator"] = function () {
                                                              return this.entries();
                                                          }),
                                                          (t.prototype[o] = function () {
                                                              return this.entries();
                                                          }),
                                                          (t.prototype._find = function (e, t) {
                                                              return (
                                                                  this._cacheKey !== e && (this._cacheIndex = this._keys.indexOf((this._cacheKey = e))),
                                                                  this._cacheIndex < 0 && t && ((this._cacheIndex = this._keys.length), this._keys.push(e), this._values.push(void 0)),
                                                                  this._cacheIndex
                                                              );
                                                          }),
                                                          t
                                                      );
                                                  })();
                                                  function n(e, t) {
                                                      return e;
                                                  }
                                                  function s(e, t) {
                                                      return t;
                                                  }
                                                  function r(e, t) {
                                                      return [e, t];
                                                  }
                                              })()
                                            : Map,
                                    h =
                                        u || "function" != typeof Set || "function" != typeof Set.prototype.entries
                                            ? (function () {
                                                  function e() {
                                                      this._map = new p();
                                                  }
                                                  return (
                                                      Object.defineProperty(e.prototype, "size", {
                                                          get: function () {
                                                              return this._map.size;
                                                          },
                                                          enumerable: !0,
                                                          configurable: !0,
                                                      }),
                                                      (e.prototype.has = function (e) {
                                                          return this._map.has(e);
                                                      }),
                                                      (e.prototype.add = function (e) {
                                                          return this._map.set(e, e), this;
                                                      }),
                                                      (e.prototype.delete = function (e) {
                                                          return this._map.delete(e);
                                                      }),
                                                      (e.prototype.clear = function () {
                                                          this._map.clear();
                                                      }),
                                                      (e.prototype.keys = function () {
                                                          return this._map.keys();
                                                      }),
                                                      (e.prototype.values = function () {
                                                          return this._map.values();
                                                      }),
                                                      (e.prototype.entries = function () {
                                                          return this._map.entries();
                                                      }),
                                                      (e.prototype["@@iterator"] = function () {
                                                          return this.keys();
                                                      }),
                                                      (e.prototype[o] = function () {
                                                          return this.keys();
                                                      }),
                                                      e
                                                  );
                                              })()
                                            : Set,
                                    g = new (u || "function" != typeof WeakMap
                                        ? (function () {
                                              var e = l.create(),
                                                  i = n();
                                              return (function () {
                                                  function e() {
                                                      this._key = n();
                                                  }
                                                  return (
                                                      (e.prototype.has = function (e) {
                                                          var t = s(e, !1);
                                                          return void 0 !== t && l.has(t, this._key);
                                                      }),
                                                      (e.prototype.get = function (e) {
                                                          var t = s(e, !1);
                                                          return void 0 !== t ? l.get(t, this._key) : void 0;
                                                      }),
                                                      (e.prototype.set = function (e, t) {
                                                          return (s(e, !0)[this._key] = t), this;
                                                      }),
                                                      (e.prototype.delete = function (e) {
                                                          var t = s(e, !1);
                                                          return void 0 !== t && delete t[this._key];
                                                      }),
                                                      (e.prototype.clear = function () {
                                                          this._key = n();
                                                      }),
                                                      e
                                                  );
                                              })();
                                              function n() {
                                                  var t;
                                                  do {
                                                      t = "@@WeakMap@@" + r();
                                                  } while (l.has(e, t));
                                                  return (e[t] = !0), t;
                                              }
                                              function s(e, n) {
                                                  if (!t.call(e, i)) {
                                                      if (!n) return;
                                                      Object.defineProperty(e, i, { value: l.create() });
                                                  }
                                                  return e[i];
                                              }
                                              function o(e, t) {
                                                  for (var i = 0; i < t; ++i) e[i] = (255 * Math.random()) | 0;
                                                  return e;
                                              }
                                              function r() {
                                                  var e,
                                                      t =
                                                          ((e = 16),
                                                          "function" == typeof Uint8Array
                                                              ? "undefined" != typeof crypto
                                                                  ? crypto.getRandomValues(new Uint8Array(e))
                                                                  : "undefined" != typeof msCrypto
                                                                  ? msCrypto.getRandomValues(new Uint8Array(e))
                                                                  : o(new Uint8Array(e), e)
                                                              : o(new Array(e), e));
                                                  (t[6] = (79 & t[6]) | 64), (t[8] = (191 & t[8]) | 128);
                                                  for (var i = "", n = 0; n < 16; ++n) {
                                                      var s = t[n];
                                                      (4 !== n && 6 !== n && 8 !== n) || (i += "-"), s < 16 && (i += "0"), (i += s.toString(16).toLowerCase());
                                                  }
                                                  return i;
                                              }
                                          })()
                                        : WeakMap)();
                                function m(e, t, i) {
                                    var n = g.get(e);
                                    if (A(n)) {
                                        if (!i) return;
                                        (n = new p()), g.set(e, n);
                                    }
                                    var s = n.get(t);
                                    if (A(s)) {
                                        if (!i) return;
                                        (s = new p()), n.set(t, s);
                                    }
                                    return s;
                                }
                                function f(e, t, i) {
                                    if (v(e, t, i)) return !0;
                                    var n = x(t);
                                    return !T(n) && f(e, n, i);
                                }
                                function v(e, t, i) {
                                    var n = m(t, i, !1);
                                    return !A(n) && !!n.has(e);
                                }
                                function b(e, t, i) {
                                    if (v(e, t, i)) return y(e, t, i);
                                    var n = x(t);
                                    return T(n) ? void 0 : b(e, n, i);
                                }
                                function y(e, t, i) {
                                    var n = m(t, i, !1);
                                    if (!A(n)) return n.get(e);
                                }
                                function _(e, t, i, n) {
                                    m(i, n, !0).set(e, t);
                                }
                                function S(e, t) {
                                    var i = E(e, t),
                                        n = x(e);
                                    if (null === n) return i;
                                    var s = S(n, t);
                                    if (s.length <= 0) return i;
                                    if (i.length <= 0) return s;
                                    for (var o = new h(), r = [], a = 0, d = i; a < d.length; a++) {
                                        var l = d[a];
                                        o.has(l) || (o.add(l), r.push(l));
                                    }
                                    for (var c = 0, u = s; c < u.length; c++) (l = u[c]), o.has(l) || (o.add(l), r.push(l));
                                    return r;
                                }
                                function E(e, t) {
                                    var i = [],
                                        n = m(e, t, !1);
                                    if (A(n)) return i;
                                    for (
                                        var s = (function (e) {
                                                var t = L(e, o);
                                                if (!P(t)) throw new TypeError();
                                                var i = t.call(e);
                                                if (!I(i)) throw new TypeError();
                                                return i;
                                            })(n.keys()),
                                            r = 0;
                                        ;

                                    ) {
                                        var a = k(s);
                                        if (!a) return (i.length = r), i;
                                        var d = a.value;
                                        try {
                                            i[r] = d;
                                        } catch (e) {
                                            try {
                                                R(s);
                                            } finally {
                                                throw e;
                                            }
                                        }
                                        r++;
                                    }
                                }
                                function w(e) {
                                    if (null === e) return 1;
                                    switch (typeof e) {
                                        case "undefined":
                                            return 0;
                                        case "boolean":
                                            return 2;
                                        case "string":
                                            return 3;
                                        case "symbol":
                                            return 4;
                                        case "number":
                                            return 5;
                                        case "object":
                                            return null === e ? 1 : 6;
                                        default:
                                            return 6;
                                    }
                                }
                                function A(e) {
                                    return void 0 === e;
                                }
                                function T(e) {
                                    return null === e;
                                }
                                function I(e) {
                                    return "object" == typeof e ? null !== e : "function" == typeof e;
                                }
                                function C(e, t) {
                                    switch (w(e)) {
                                        case 0:
                                        case 1:
                                        case 2:
                                        case 3:
                                        case 4:
                                        case 5:
                                            return e;
                                    }
                                    var i = 3 === t ? "string" : 5 === t ? "number" : "default",
                                        s = L(e, n);
                                    if (void 0 !== s) {
                                        var o = s.call(e, i);
                                        if (I(o)) throw new TypeError();
                                        return o;
                                    }
                                    return (function (e, t) {
                                        if ("string" === t) {
                                            var i = e.toString;
                                            if (P(i) && !I((s = i.call(e)))) return s;
                                            if (P((n = e.valueOf)) && !I((s = n.call(e)))) return s;
                                        } else {
                                            var n;
                                            if (P((n = e.valueOf)) && !I((s = n.call(e)))) return s;
                                            var s,
                                                o = e.toString;
                                            if (P(o) && !I((s = o.call(e)))) return s;
                                        }
                                        throw new TypeError();
                                    })(e, "default" === i ? "number" : i);
                                }
                                function N(e) {
                                    var t = C(e, 3);
                                    return "symbol" == typeof t
                                        ? t
                                        : (function (e) {
                                              return "" + e;
                                          })(t);
                                }
                                function O(e) {
                                    return Array.isArray ? Array.isArray(e) : e instanceof Object ? e instanceof Array : "[object Array]" === Object.prototype.toString.call(e);
                                }
                                function P(e) {
                                    return "function" == typeof e;
                                }
                                function D(e) {
                                    return "function" == typeof e;
                                }
                                function L(e, t) {
                                    var i = e[t];
                                    if (null != i) {
                                        if (!P(i)) throw new TypeError();
                                        return i;
                                    }
                                }
                                function k(e) {
                                    var t = e.next();
                                    return !t.done && t;
                                }
                                function R(e) {
                                    var t = e.return;
                                    t && t.call(e);
                                }
                                function x(e) {
                                    var t = Object.getPrototypeOf(e);
                                    if ("function" != typeof e || e === c) return t;
                                    if (t !== c) return t;
                                    var i = e.prototype,
                                        n = i && Object.getPrototypeOf(i);
                                    if (null == n || n === Object.prototype) return t;
                                    var s = n.constructor;
                                    return "function" != typeof s || s === e ? t : s;
                                }
                                function U(e) {
                                    return (e.__ = void 0), delete e.__, e;
                                }
                                e("decorate", function (e, t, i, n) {
                                    if (A(i)) {
                                        if (!O(e)) throw new TypeError();
                                        if (!D(t)) throw new TypeError();
                                        return (function (e, t) {
                                            for (var i = e.length - 1; i >= 0; --i) {
                                                var n = (0, e[i])(t);
                                                if (!A(n) && !T(n)) {
                                                    if (!D(n)) throw new TypeError();
                                                    t = n;
                                                }
                                            }
                                            return t;
                                        })(e, t);
                                    }
                                    if (!O(e)) throw new TypeError();
                                    if (!I(t)) throw new TypeError();
                                    if (!I(n) && !A(n) && !T(n)) throw new TypeError();
                                    return (
                                        T(n) && (n = void 0),
                                        (function (e, t, i, n) {
                                            for (var s = e.length - 1; s >= 0; --s) {
                                                var o = (0, e[s])(t, i, n);
                                                if (!A(o) && !T(o)) {
                                                    if (!I(o)) throw new TypeError();
                                                    n = o;
                                                }
                                            }
                                            return n;
                                        })(e, t, (i = N(i)), n)
                                    );
                                }),
                                    e("metadata", function (e, t) {
                                        return function (i, n) {
                                            if (!I(i)) throw new TypeError();
                                            if (
                                                !A(n) &&
                                                !(function (e) {
                                                    switch (w(e)) {
                                                        case 3:
                                                        case 4:
                                                            return !0;
                                                        default:
                                                            return !1;
                                                    }
                                                })(n)
                                            )
                                                throw new TypeError();
                                            _(e, t, i, n);
                                        };
                                    }),
                                    e("defineMetadata", function (e, t, i, n) {
                                        if (!I(i)) throw new TypeError();
                                        return A(n) || (n = N(n)), _(e, t, i, n);
                                    }),
                                    e("hasMetadata", function (e, t, i) {
                                        if (!I(t)) throw new TypeError();
                                        return A(i) || (i = N(i)), f(e, t, i);
                                    }),
                                    e("hasOwnMetadata", function (e, t, i) {
                                        if (!I(t)) throw new TypeError();
                                        return A(i) || (i = N(i)), v(e, t, i);
                                    }),
                                    e("getMetadata", function (e, t, i) {
                                        if (!I(t)) throw new TypeError();
                                        return A(i) || (i = N(i)), b(e, t, i);
                                    }),
                                    e("getOwnMetadata", function (e, t, i) {
                                        if (!I(t)) throw new TypeError();
                                        return A(i) || (i = N(i)), y(e, t, i);
                                    }),
                                    e("getMetadataKeys", function (e, t) {
                                        if (!I(e)) throw new TypeError();
                                        return A(t) || (t = N(t)), S(e, t);
                                    }),
                                    e("getOwnMetadataKeys", function (e, t) {
                                        if (!I(e)) throw new TypeError();
                                        return A(t) || (t = N(t)), E(e, t);
                                    }),
                                    e("deleteMetadata", function (e, t, i) {
                                        if (!I(t)) throw new TypeError();
                                        A(i) || (i = N(i));
                                        var n = m(t, i, !1);
                                        if (A(n)) return !1;
                                        if (!n.delete(e)) return !1;
                                        if (n.size > 0) return !0;
                                        var s = g.get(t);
                                        return s.delete(i), s.size > 0 || g.delete(t), !0;
                                    });
                            })(o);
                    })();
                })(n || (n = {}));
            },
        },
        n = {};
    function s(e) {
        var t = n[e];
        if (void 0 !== t) return t.exports;
        var o = (n[e] = { exports: {} });
        return i[e](o, o.exports, s), o.exports;
    }
    (t = Object.getPrototypeOf ? (e) => Object.getPrototypeOf(e) : (e) => e.__proto__),
        (s.t = function (i, n) {
            if ((1 & n && (i = this(i)), 8 & n)) return i;
            if ("object" == typeof i && i) {
                if (4 & n && i.__esModule) return i;
                if (16 & n && "function" == typeof i.then) return i;
            }
            var o = Object.create(null);
            s.r(o);
            var r = {};
            e = e || [null, t({}), t([]), t(t)];
            for (var a = 2 & n && i; "object" == typeof a && !~e.indexOf(a); a = t(a)) Object.getOwnPropertyNames(a).forEach((e) => (r[e] = () => i[e]));
            return (r.default = () => i), s.d(o, r), o;
        }),
        (s.d = (e, t) => {
            for (var i in t) s.o(t, i) && !s.o(e, i) && Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
        }),
        (s.g = (function () {
            if ("object" == typeof globalThis) return globalThis;
            try {
                return this || new Function("return this")();
            } catch (e) {
                if ("object" == typeof window) return window;
            }
        })()),
        (s.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
        (s.r = (e) => {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (() => {
            "use strict";
            var e = {};
            s.r(e),
                s.d(e, {
                    AD_LABEL_CLASS: () => Ln,
                    Document: () => Fi,
                    FetchTimeout: () => ms,
                    GlobalTimeout: () => vs,
                    IframeBuilder: () => Kn,
                    LazyQueue: () => tn,
                    ScriptLoader: () => Ri,
                    WaitFor: () => Vi,
                    assetLoader: () => gs,
                    buildPromisedTimeout: () => Ss,
                    buildTaglessRequestUrl: () => Ns,
                    buildVastUrl: () => Cs,
                    client: () => pi,
                    createExtendedPromise: () => un,
                    createWithTimeout: () => cn,
                    decorate: () => mn,
                    defer: () => an,
                    generateUniqueId: () => Bi,
                    geoService: () => Ci,
                    getCustomParameters: () => Ts,
                    getElementOffset: () => Un,
                    getGlobalValue: () => fs,
                    getHeight: () => xn,
                    getLeftOffset: () => Mn,
                    getServicesBaseURL: () => ws,
                    getTimeDelta: () => vi,
                    getTimeDeltaFixed: () => bi,
                    getTimeOrigin: () => fi,
                    getTopOffset: () => Vn,
                    getTranslation: () => ys,
                    getViewportHeight: () => jn,
                    getViewportWidth: () => Bn,
                    getWidth: () => Rn,
                    isCoppaSubject: () => gn,
                    isIframe: () => zi,
                    isInTheSameViewport: () => Gn,
                    isInViewport: () => zn,
                    logger: () => yi,
                    makeLazyQueue: () => en,
                    once: () => dn,
                    outboundTrafficRestrict: () => is,
                    pageInIframe: () => Gi,
                    queryString: () => U,
                    sampler: () => Es,
                    scriptLoader: () => xi,
                    stringBuilder: () => Dn,
                    targeting: () => Ps,
                    timedPartnerScriptLoader: () => Ds,
                    timeoutReject: () => ln,
                    translateLabels: () => _s,
                    tryProperty: () => ks,
                    uuid: () => Bs,
                    viewportObserver: () => zs,
                    wait: () => rn,
                    warner: () => _i,
                    whichProperty: () => Ls,
                });
            var t = {};
            s.r(t),
                s.d(t, {
                    BFAA_UNSTICK_DELAY: () => Zo,
                    CSS_TIMING_EASE_IN_CUBIC: () => Wo,
                    DEFAULT_UAP_ID: () => Yo,
                    DEFAULT_UAP_TYPE: () => Qo,
                    FAN_TAKEOVER_TYPES: () => Xo,
                    SLIDE_OUT_TIME: () => Ko,
                    SLOT_FORCE_UNSTICK: () => tr,
                    SLOT_STICKED_STATE: () => nr,
                    SLOT_STICKINESS_DISABLED: () => rr,
                    SLOT_STICKY_READY_STATE: () => sr,
                    SLOT_STICKY_STATE_SKIPPED: () => or,
                    SLOT_UNSTICKED_STATE: () => ir,
                    SLOT_VIDEO_DONE: () => ar,
                    SPECIAL_VIDEO_AD_UNIT: () => Jo,
                    TLB_UNSTICK_DELAY: () => er,
                    UAP_ADDITIONAL_SIZES: () => dr,
                });
            var i = {};
            s.r(i), s.d(i, { B: () => Lp });
            var n = {};
            s.r(n);
            var o = {};
            s.r(o);
            var r = {};
            s.r(r);
            var a = function (e, t) {
                return (
                    (a =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (e, t) {
                                e.__proto__ = t;
                            }) ||
                        function (e, t) {
                            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                        }),
                    a(e, t)
                );
            };
            function d(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
                function i() {
                    this.constructor = e;
                }
                a(e, t), (e.prototype = null === t ? Object.create(t) : ((i.prototype = t.prototype), new i()));
            }
            function l(e, t, i, n) {
                var s,
                    o = arguments.length,
                    r = o < 3 ? t : null === n ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, n);
                else for (var a = e.length - 1; a >= 0; a--) (s = e[a]) && (r = (o < 3 ? s(r) : o > 3 ? s(t, i, r) : s(t, i)) || r);
                return o > 3 && r && Object.defineProperty(t, i, r), r;
            }
            function c(e, t) {
                return function (i, n) {
                    t(i, n, e);
                };
            }
            function u(e, t) {
                if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
            }
            function p(e, t, i, n) {
                return new (i || (i = Promise))(function (s, o) {
                    function r(e) {
                        try {
                            d(n.next(e));
                        } catch (e) {
                            o(e);
                        }
                    }
                    function a(e) {
                        try {
                            d(n.throw(e));
                        } catch (e) {
                            o(e);
                        }
                    }
                    function d(e) {
                        var t;
                        e.done
                            ? s(e.value)
                            : ((t = e.value),
                              t instanceof i
                                  ? t
                                  : new i(function (e) {
                                        e(t);
                                    })).then(r, a);
                    }
                    d((n = n.apply(e, t || [])).next());
                });
            }
            function h(e, t) {
                var i,
                    n,
                    s,
                    o,
                    r = {
                        label: 0,
                        sent: function () {
                            if (1 & s[0]) throw s[1];
                            return s[1];
                        },
                        trys: [],
                        ops: [],
                    };
                return (
                    (o = { next: a(0), throw: a(1), return: a(2) }),
                    "function" == typeof Symbol &&
                        (o[Symbol.iterator] = function () {
                            return this;
                        }),
                    o
                );
                function a(a) {
                    return function (d) {
                        return (function (a) {
                            if (i) throw new TypeError("Generator is already executing.");
                            for (; o && ((o = 0), a[0] && (r = 0)), r; )
                                try {
                                    if (((i = 1), n && (s = 2 & a[0] ? n.return : a[0] ? n.throw || ((s = n.return) && s.call(n), 0) : n.next) && !(s = s.call(n, a[1])).done)) return s;
                                    switch (((n = 0), s && (a = [2 & a[0], s.value]), a[0])) {
                                        case 0:
                                        case 1:
                                            s = a;
                                            break;
                                        case 4:
                                            return r.label++, { value: a[1], done: !1 };
                                        case 5:
                                            r.label++, (n = a[1]), (a = [0]);
                                            continue;
                                        case 7:
                                            (a = r.ops.pop()), r.trys.pop();
                                            continue;
                                        default:
                                            if (!((s = (s = r.trys).length > 0 && s[s.length - 1]) || (6 !== a[0] && 2 !== a[0]))) {
                                                r = 0;
                                                continue;
                                            }
                                            if (3 === a[0] && (!s || (a[1] > s[0] && a[1] < s[3]))) {
                                                r.label = a[1];
                                                break;
                                            }
                                            if (6 === a[0] && r.label < s[1]) {
                                                (r.label = s[1]), (s = a);
                                                break;
                                            }
                                            if (s && r.label < s[2]) {
                                                (r.label = s[2]), r.ops.push(a);
                                                break;
                                            }
                                            s[2] && r.ops.pop(), r.trys.pop();
                                            continue;
                                    }
                                    a = t.call(e, r);
                                } catch (e) {
                                    (a = [6, e]), (n = 0);
                                } finally {
                                    i = s = 0;
                                }
                            if (5 & a[0]) throw a[1];
                            return { value: a[0] ? a[1] : void 0, done: !0 };
                        })([a, d]);
                    };
                }
            }
            function g(e) {
                var t = "function" == typeof Symbol && Symbol.iterator,
                    i = t && e[t],
                    n = 0;
                if (i) return i.call(e);
                if (e && "number" == typeof e.length)
                    return {
                        next: function () {
                            return e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e };
                        },
                    };
                throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
            }
            function m(e, t) {
                var i = "function" == typeof Symbol && e[Symbol.iterator];
                if (!i) return e;
                var n,
                    s,
                    o = i.call(e),
                    r = [];
                try {
                    for (; (void 0 === t || t-- > 0) && !(n = o.next()).done; ) r.push(n.value);
                } catch (e) {
                    s = { error: e };
                } finally {
                    try {
                        n && !n.done && (i = o.return) && i.call(o);
                    } finally {
                        if (s) throw s.error;
                    }
                }
                return r;
            }
            function f(e, t, i) {
                if (i || 2 === arguments.length) for (var n, s = 0, o = t.length; s < o; s++) (!n && s in t) || (n || (n = Array.prototype.slice.call(t, 0, s)), (n[s] = t[s]));
                return e.concat(n || Array.prototype.slice.call(t));
            }
            function v(e) {
                return this instanceof v ? ((this.v = e), this) : new v(e);
            }
            function b(e, t, i) {
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var n,
                    s = i.apply(e, t || []),
                    o = [];
                return (
                    (n = {}),
                    r("next"),
                    r("throw"),
                    r("return"),
                    (n[Symbol.asyncIterator] = function () {
                        return this;
                    }),
                    n
                );
                function r(e) {
                    s[e] &&
                        (n[e] = function (t) {
                            return new Promise(function (i, n) {
                                o.push([e, t, i, n]) > 1 || a(e, t);
                            });
                        });
                }
                function a(e, t) {
                    try {
                        (i = s[e](t)).value instanceof v ? Promise.resolve(i.value.v).then(d, l) : c(o[0][2], i);
                    } catch (e) {
                        c(o[0][3], e);
                    }
                    var i;
                }
                function d(e) {
                    a("next", e);
                }
                function l(e) {
                    a("throw", e);
                }
                function c(e, t) {
                    e(t), o.shift(), o.length && a(o[0][0], o[0][1]);
                }
            }
            Object.create, Object.create;
            var y = (function () {
                    var e = function (t, i) {
                        return (
                            (e =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (e, t) {
                                        e.__proto__ = t;
                                    }) ||
                                function (e, t) {
                                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                                }),
                            e(t, i)
                        );
                    };
                    return function (t, i) {
                        function n() {
                            this.constructor = t;
                        }
                        e(t, i), (t.prototype = null === i ? Object.create(i) : ((n.prototype = i.prototype), new n()));
                    };
                })(),
                _ = "Singleton",
                S = (function () {
                    function e() {}
                    return (e.prototype.reset = function (e) {}), e;
                })(),
                E = (function (e) {
                    function t() {
                        return (null !== e && e.apply(this, arguments)) || this;
                    }
                    return (
                        y(t, e),
                        (t.prototype.resolve = function (e, t) {
                            return e();
                        }),
                        t
                    );
                })(S),
                w = (function (e) {
                    function t() {
                        var t = (null !== e && e.apply(this, arguments)) || this;
                        return (t.instances = new Map()), t;
                    }
                    return (
                        y(t, e),
                        (t.prototype.resolve = function (e, t) {
                            var i = this.instances.get(t);
                            return i || ((i = e()), this.instances.set(t, i)), i;
                        }),
                        (t.prototype.reset = function (e) {
                            this.instances.delete(e);
                        }),
                        t
                    );
                })(S),
                A = "wikia-ioc:paramtypes",
                T = "wikia-ioc:taggedtypes",
                I = "wikia-ioc:autobind",
                C = "wikia-ioc:scope";
            function N(e) {
                return (
                    void 0 === e && (e = {}),
                    function (t) {
                        if (Reflect.hasOwnMetadata(A, t)) throw new Error("Cannot apply @Injectable decorator multiple times.");
                        var i = Reflect.getMetadata("design:paramtypes", t) || [];
                        return Reflect.defineMetadata(A, i, t), "boolean" == typeof e.autobind && Reflect.defineMetadata(I, e.autobind, t), "string" == typeof e.scope && Reflect.defineMetadata(C, e.scope, t), t;
                    }
                );
            }
            function O(e) {
                return function (t, i, n) {
                    if (i || "number" != typeof n) throw new Error("Cannot apply @Inject decorator to a property.");
                    var s = Reflect.getMetadata(T, t) || {};
                    if (s[n.toString()]) throw new Error("Cannot apply @Inject decorator multiple times on the same parameter.");
                    return (s[n.toString()] = e), Reflect.defineMetadata(T, s, t), t;
                };
            }
            function P(e, t) {
                return "value" in t ? e.value(t.value) : "to" in t ? e.to(t.to) : "provider" in t ? e.provider(t.provider) : e;
            }
            function D(e) {
                var t = typeof e;
                return L(e) || "symbol" === t || "string" === t;
            }
            function L(e) {
                return "function" == typeof e;
            }
            s(8660);
            var k = (function () {
                    function e(e, t, i, n) {
                        var s, o;
                        if (((this.sourceType = e), (this.container = t), (this.scopes = i), (this.paramTypes = []), !L(this.sourceType))) return this.scope(n.defaultScope);
                        this.scope(null !== (s = Reflect.getMetadata(C, this.sourceType)) && void 0 !== s ? s : n.defaultScope),
                            (null !== (o = Reflect.getMetadata(I, this.sourceType)) && void 0 !== o ? o : n.defaultAutobind) && this.to(this.sourceType);
                    }
                    return (
                        (e.prototype.to = function (e) {
                            return (
                                (function (e) {
                                    if (!L(e)) throw new TypeError("Invalid type requested to IoC container. Type must be Class.");
                                })(e),
                                (this.targetType = e),
                                (this.paramTypes = this.getMetadataParamTypes()),
                                this.sourceType === this.targetType ? this.provideSourceType(e) : this.provideTargetType(e),
                                this
                            );
                        }),
                        (e.prototype.getMetadataParamTypes = function () {
                            var e = Reflect.getMetadata(A, this.targetType) || [],
                                t = Reflect.getMetadata(T, this.targetType) || {};
                            return e.map(function (e, i) {
                                return t[i] || e;
                            });
                        }),
                        (e.prototype.provideSourceType = function (e) {
                            var t = this;
                            this.provider(function () {
                                var i = t.getParameters();
                                return new (e.bind.apply(
                                    e,
                                    (function () {
                                        for (var e = 0, t = 0, i = arguments.length; t < i; t++) e += arguments[t].length;
                                        var n = Array(e),
                                            s = 0;
                                        for (t = 0; t < i; t++) for (var o = arguments[t], r = 0, a = o.length; r < a; r++, s++) n[s] = o[r];
                                        return n;
                                    })([void 0], i)
                                ))();
                            });
                        }),
                        (e.prototype.getParameters = function () {
                            var e = this;
                            return this.paramTypes.map(function (t) {
                                return e.container.get(t);
                            });
                        }),
                        (e.prototype.provideTargetType = function (e) {
                            var t = this;
                            this.provider(function () {
                                return t.container.get(e);
                            });
                        }),
                        (e.prototype.value = function (e) {
                            return this.provider(function () {
                                return e;
                            });
                        }),
                        (e.prototype.provider = function (e) {
                            return (this._provider = e), this._scope.reset(this.sourceType), this;
                        }),
                        (e.prototype.scope = function (e) {
                            return (this._scope = this.scopes[e]), this._scope.reset(this.sourceType), this;
                        }),
                        (e.prototype.withParams = function () {
                            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                            return (this.paramTypes = e), this;
                        }),
                        (e.prototype.getInstance = function () {
                            var e = this;
                            if (!this._provider) throw new Error(this.sourceType.toString() + " is not bound to anything.");
                            return this._scope.resolve(function () {
                                return e._provider(e.container);
                            }, this.sourceType);
                        }),
                        (e.prototype.getType = function () {
                            return this.targetType;
                        }),
                        e
                    );
                })(),
                R = function () {
                    return (
                        (R =
                            Object.assign ||
                            function (e) {
                                for (var t, i = 1, n = arguments.length; i < n; i++) for (var s in (t = arguments[i])) Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
                                return e;
                            }),
                        R.apply(this, arguments)
                    );
                },
                x = (function () {
                    function e(t) {
                        void 0 === t && (t = {}),
                            (this.bindings = new Map()),
                            (this.scopes = { Singleton: new w(), Transient: new E() }),
                            (this.containerOptions = R({ defaultScope: _, defaultAutobind: !0 }, t)),
                            this.bind(e).scope(_).value(this);
                    }
                    return (
                        (e.prototype.bind = function (e) {
                            var t = D(e) ? e : null == e ? void 0 : e.bind;
                            return this.bindings.has(t) ? this.bindings.get(t) : L(e) ? P(this.ensureBinding(t), { bind: e, to: e }) : D(e) ? this.ensureBinding(t) : P(this.ensureBinding(t), e);
                        }),
                        (e.prototype.unbind = function (e) {
                            var t = D(e) ? e : null == e ? void 0 : e.bind;
                            this.bindings.delete(t);
                        }),
                        (e.prototype.get = function (e) {
                            return this.ensureBinding(e).getInstance();
                        }),
                        (e.prototype.getType = function (e) {
                            return this.ensureBinding(e).getType();
                        }),
                        (e.prototype.ensureBinding = function (e) {
                            !(function (e) {
                                if (!D(e)) throw new TypeError("Invalid type requested to IoC container. TypeKey must be Class, symbol or string.");
                            })(e);
                            var t = this.bindings.get(e);
                            return t || ((t = new k(e, this, this.scopes, this.containerOptions)), this.bindings.set(e, t)), t;
                        }),
                        e
                    );
                })();
            const U = new (class {
                getValues(e) {
                    const t = (e || window.location.search.substring(1)).split("&"),
                        i = {};
                    return (
                        t.forEach((e) => {
                            const [t, n] = e.split("=");
                            n && (i[t] = decodeURIComponent(n.replace(/\+/g, " ")));
                        }),
                        i
                    );
                }
                getURLSearchParams(e) {
                    const t = e || window.location.search.substring(1);
                    return new URLSearchParams(t);
                }
                get(e) {
                    return this.getValues()[e];
                }
                isUrlParamSet(e) {
                    return !!parseInt(this.get(e), 10);
                }
                parseValue(e) {
                    if ("true" === e || "false" === e) return "true" === e;
                    const t = parseInt(e, 10);
                    if (e === `${t}`) return t;
                    try {
                        return JSON.parse(e);
                    } catch (t) {
                        return e || null;
                    }
                }
                stringify(e) {
                    const t = new URLSearchParams(e);
                    return t.sort(), t.toString();
                }
            })();
            function V(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = arguments[t];
                    for (var n in i) e[n] = i[n];
                }
                return e;
            }
            var M = (function e(t, i) {
                function n(e, n, s) {
                    if ("undefined" != typeof document) {
                        "number" == typeof (s = V({}, i, s)).expires && (s.expires = new Date(Date.now() + 864e5 * s.expires)),
                            s.expires && (s.expires = s.expires.toUTCString()),
                            (e = encodeURIComponent(e)
                                .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
                                .replace(/[()]/g, escape));
                        var o = "";
                        for (var r in s) s[r] && ((o += "; " + r), !0 !== s[r] && (o += "=" + s[r].split(";")[0]));
                        return (document.cookie = e + "=" + t.write(n, e) + o);
                    }
                }
                return Object.create(
                    {
                        set: n,
                        get: function (e) {
                            if ("undefined" != typeof document && (!arguments.length || e)) {
                                for (var i = document.cookie ? document.cookie.split("; ") : [], n = {}, s = 0; s < i.length; s++) {
                                    var o = i[s].split("="),
                                        r = o.slice(1).join("=");
                                    try {
                                        var a = decodeURIComponent(o[0]);
                                        if (((n[a] = t.read(r, a)), e === a)) break;
                                    } catch (e) {}
                                }
                                return e ? n[e] : n;
                            }
                        },
                        remove: function (e, t) {
                            n(e, "", V({}, t, { expires: -1 }));
                        },
                        withAttributes: function (t) {
                            return e(this.converter, V({}, this.attributes, t));
                        },
                        withConverter: function (t) {
                            return e(V({}, this.converter, t), this.attributes);
                        },
                    },
                    { attributes: { value: Object.freeze(i) }, converter: { value: Object.freeze(t) } }
                );
            })(
                {
                    read: function (e) {
                        return '"' === e[0] && (e = e.slice(1, -1)), e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
                    },
                    write: function (e) {
                        return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
                    },
                },
                { path: "/" }
            );
            const j = M;
            class B {
                constructor() {
                    (this.cacheMaxAge = 18e5), (this.keysSeen = new Set());
                }
                getItem(e) {
                    return j.get(e);
                }
                setItem(e, t, i) {
                    const n = i || this.cacheMaxAge,
                        s = { expires: new Date(new Date().getTime() + n), path: "/", domain: this.getCookieDomain(), overwrite: !0 };
                    this.keysSeen.add(e), j.set(e, t, s);
                }
                removeItem(e) {
                    this.keysSeen.delete(e), j.remove(e, { path: "/", domain: this.getCookieDomain() });
                }
                clear() {
                    this.keysSeen.forEach((e) => {
                        this.removeItem(e);
                    });
                }
                getCookieDomain() {
                    const e = window.location.hostname.split(".");
                    return e.length > 1 ? `.${e[e.length - 2]}.${e[e.length - 1]}` : void 0;
                }
            }
            const z = new B();
            function G() {
                return U.get("adengine_debug") || z.getItem("adengine_debug");
            }
            function F(e) {
                null !== e ? z.setItem("adengine_debug", e || "1") : z.removeItem("adengine_debug");
            }
            const $ = {
                isDebugMode: function () {
                    return Boolean(G());
                },
                getDebugGroup: G,
                setDebugMode: F,
            };
            (window.ads = window.ads || {}), (window.ads.debug = F);
            const H = {
                    adUnitId: "",
                    bidders: { enabled: !1, timeout: 2e3, a9: { enabled: !1, videoEnabled: !1, amazonId: "3115", bidsRefreshing: { slots: [] } }, prebid: { enabled: !1, bidsRefreshing: { slots: [] } } },
                    events: {},
                    listeners: { porvata: [] },
                    options: { customAdLoader: { globalMethodName: "loadCustomAd" }, maxDelayTimeout: 2e3, optOutSale: !1, trackingOptIn: !1, isSubjectToCcpa: !1 },
                    services: {},
                    slots: {},
                    src: ["gpt"],
                    state: { adStack: [], isMobile: !1 },
                    targeting: {},
                    vast: { size: [640, 480], adUnitId: "" },
                },
                q = {};
            function W(e, t, i) {
                let n = "";
                t.forEach((t) => {
                    (n += ("" === n ? "" : ".") + t),
                        (function (e, t, i) {
                            q[e] &&
                                q[e].forEach((e) => {
                                    e(t, i);
                                });
                        })(n, e, i);
                });
            }
            function K(e, t, i = !1) {
                const n = e.split("."),
                    s = n.length;
                let o = H,
                    r = null;
                for (let e = 0; e < s; e += 1) (r = n[e]), e < s - 1 && ((o[r] = o[r] || {}), (o = o[r]));
                return i ? (delete o[r], W(e, n, null), null) : (void 0 !== t && ((o[r] = t), W(e, n, t)), o[r]);
            }
            const Y = new (class {
                constructor() {
                    (window.ads = window.ads || {}), (window.ads.adContext = $.isDebugMode() ? H : {});
                }
                extend(e) {
                    Object.assign(H, e);
                }
                set(e, t) {
                    K(e, t);
                }
                get(e) {
                    return K(e);
                }
                remove(e) {
                    K(e, null, !0);
                }
                push(e, t) {
                    const i = K(e);
                    i && i.push(t);
                }
                onChange(e, t) {
                    (q[e] = q[e] || []), q[e].push(t);
                }
                removeListeners(e) {
                    Object.keys(q).forEach((t) => {
                        (t !== e && 0 !== t.indexOf(`${e}.`)) || delete q[t];
                    });
                }
            })();
            class Q {
                execute() {
                    const e = Object.assign(Object.assign({}, window.mw && window.mw.config ? window.mw.config.values : {}), window.ads ? window.ads.context : {});
                    Y.set("wiki", Object.assign(e, Y.get("wiki")));
                }
            }
            function X(e) {
                Y.set("geo.region", e.region), Y.set("geo.country", e.country), Y.set("geo.continent", e.continent);
            }
            var J = function () {
                return (
                    (J =
                        Object.assign ||
                        function (e) {
                            for (var t, i = 1, n = arguments.length; i < n; i++) for (var s in (t = arguments[i])) Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
                            return e;
                        }),
                    J.apply(this, arguments)
                );
            };
            function Z(e, t) {
                return Object.defineProperty(t, "type", { value: e, writable: !1 });
            }
            function ee(e) {
                return !0 === e.__global;
            }
            function te(e, t) {
                const i = (function (e, t) {
                        if ("function" == typeof t)
                            return Z(e, function () {
                                for (var i = [], n = 0; n < arguments.length; n++) i[n] = arguments[n];
                                return J(J({}, t.apply(void 0, i)), { type: e });
                            });
                        switch (t ? t._as : "empty") {
                            case "empty":
                                return Z(e, function () {
                                    return { type: e };
                                });
                            case "fsa":
                                return Z(e, function (t, i) {
                                    return t instanceof Error ? { error: !0, meta: i, payload: t, type: e } : { error: !1, meta: i, payload: t, type: e };
                                });
                            case "payload":
                                return Z(e, function (t) {
                                    return { payload: t, type: e };
                                });
                            case "props":
                                return Z(e, function (t) {
                                    return J(J({}, t), { type: e });
                                });
                            default:
                                throw new Error("Unexpected config.");
                        }
                    })(e, t),
                    n = (...e) => {
                        const t = i(...e);
                        return Object.assign(Object.assign({}, t), { __global: !0 });
                    };
                return Object.defineProperty(n, "type", { value: e, writable: !1 }), Object.defineProperty(n, "__global", { value: !0, writable: !1 }), n;
            }
            var ie = function () {
                    return (
                        (ie =
                            Object.assign ||
                            function (e) {
                                for (var t, i = 1, n = arguments.length; i < n; i++) for (var s in (t = arguments[i])) Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
                                return e;
                            }),
                        ie.apply(this, arguments)
                    );
                },
                ne = { channelId: "default", host: window, coordinatorHost: window.top },
                se = { connect: "connect", connected: "connected" },
                oe = "@wikia/post-quecast";
            function re(e) {
                return (
                    e.channelId &&
                    e.libId === oe &&
                    e.action &&
                    (function (e) {
                        return "string" == typeof e.type && "number" == typeof e.timestamp;
                    })(e.action)
                );
            }
            function ae(e) {
                return !e.data.private;
            }
            function de(e, t) {
                return e.data.channelId === t;
            }
            function le(e) {
                return e.data.action;
            }
            var ce = (function () {
                    function e() {}
                    return (
                        (e.make = function (e) {
                            return (function (e) {
                                var t;
                                return e.host === e.coordinatorHost && !!(null === (t = e.coordinatorHost[oe]) || void 0 === t ? void 0 : t.callbackConnector);
                            })(e)
                                ? e.coordinatorHost[oe].callbackConnector
                                : new pe({ senderHost: e.coordinatorHost, listenerHost: e.host });
                        }),
                        e
                    );
                })(),
                ue = (function () {
                    function e(e) {
                        (this.coordinatorHost = e), (this.callbacks = []);
                    }
                    return (
                        (e.prototype.dispatch = function (e) {
                            var t = this;
                            if (!re(e)) throw new Error("Incorrect object type. Expected PostMessageData, but got " + e);
                            this.callbacks.forEach(function (i) {
                                return i({ data: e, source: t.coordinatorHost });
                            });
                        }),
                        (e.prototype.addListener = function (e) {
                            this.callbacks.push(e);
                        }),
                        (e.prototype.removeListener = function (e) {
                            this.callbacks = this.callbacks.filter(function (t) {
                                return t !== e;
                            });
                        }),
                        e
                    );
                })(),
                pe = (function () {
                    function e(e) {
                        (this.options = e), (this.map = new Map());
                    }
                    return (
                        (e.prototype.dispatch = function (e) {
                            if (!re(e)) throw new Error("Incorrect object type. Expected PostMessageData, but got " + e);
                            this.options.senderHost.postMessage(e, "*");
                        }),
                        (e.prototype.addListener = function (e) {
                            var t = function (t) {
                                var i;
                                (i = t) && i.source && i.data && re(i.data) && e(t);
                            };
                            this.map.set(e, t), this.options.listenerHost.addEventListener("message", t);
                        }),
                        (e.prototype.removeListener = function (e) {
                            var t = this.map.get(e);
                            this.options.listenerHost.removeEventListener("message", t), this.map.delete(e);
                        }),
                        e
                    );
                })(),
                he = (function () {
                    function e(e) {
                        (this.callbacks = []), (this.history = []), (this.channelId = e.channelId), (this.connector = ce.make(e)), this.setupActions(), this.setupConnection();
                    }
                    return (
                        (e.prototype.setupActions = function () {
                            this.getHistory(), this.listenEvent();
                        }),
                        (e.prototype.getHistory = function () {
                            var e = this,
                                t = function (i) {
                                    if (
                                        de(i, e.channelId) &&
                                        (function (e) {
                                            return !!e.data.private;
                                        })(i)
                                    ) {
                                        var n = le(i);
                                        (function (e) {
                                            for (var t = [], i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
                                            return t.some(function (t) {
                                                return e.type === t;
                                            });
                                        })(n, se.connected) && (e.connector.removeListener(t), e.handleActions.apply(e, n.history));
                                    }
                                };
                            this.connector.addListener(t);
                        }),
                        (e.prototype.listenEvent = function () {
                            var e = this;
                            this.connector.addListener(function (t) {
                                if (de(t, e.channelId) && ae(t)) {
                                    var i = le(t);
                                    e.handleActions(i);
                                }
                            });
                        }),
                        (e.prototype.handleActions = function () {
                            for (var e, t = this, i = [], n = 0; n < arguments.length; n++) i[n] = arguments[n];
                            (e = this.history).push.apply(e, i),
                                i.forEach(function (e) {
                                    return t.callbacks.forEach(function (t) {
                                        return t(e);
                                    });
                                });
                        }),
                        (e.prototype.setupConnection = function () {
                            this.connector.dispatch({ action: { type: se.connect, timestamp: Date.now() }, channelId: this.channelId, private: !0, libId: oe });
                        }),
                        (e.prototype.addListener = function (e) {
                            this.history.forEach(function (t) {
                                return e(t);
                            }),
                                this.callbacks.push(e);
                        }),
                        (e.prototype.removeListener = function (e) {
                            this.callbacks = this.callbacks.filter(function (t) {
                                return t !== e;
                            });
                        }),
                        e
                    );
                })(),
                ge = (function () {
                    function e(e) {
                        void 0 === e && (e = {});
                        var t = ie(ie({}, ne), e);
                        (this.channelId = t.channelId), (this.connector = ce.make(t));
                    }
                    return (
                        (e.prototype.dispatch = function (e) {
                            this.connector.dispatch({ action: ie(ie({}, e), { timestamp: Date.now() }), channelId: this.channelId, private: !0, libId: oe });
                        }),
                        e
                    );
                })(),
                me = (function () {
                    function e(e) {
                        void 0 === e && (e = {});
                        var t = ie(ie({}, ne), e);
                        (this.transmitter = new ge(t)), (this.receiver = new he(t));
                    }
                    return (
                        (e.prototype.dispatch = function (e) {
                            this.transmitter.dispatch(e);
                        }),
                        (e.prototype.addListener = function (e) {
                            this.receiver.addListener(e);
                        }),
                        (e.prototype.removeListener = function (e) {
                            this.receiver.removeListener(e);
                        }),
                        e
                    );
                })(),
                fe = (function () {
                    function e(e, t) {
                        (this.channelId = e), (this.connectors = new Map()), (this.history = []), this.connectors.set(t, t[oe].callbackConnector);
                    }
                    return (
                        (e.prototype.addConnection = function (e) {
                            this.ensureConnector(e).dispatch({ action: this.createConnectedAction(), private: !0, channelId: this.channelId, libId: oe });
                        }),
                        (e.prototype.createConnectedAction = function () {
                            return { type: se.connected, history: this.history, timestamp: Date.now() };
                        }),
                        (e.prototype.broadcast = function (e) {
                            var t = this;
                            this.history.push(e),
                                this.connectors.forEach(function (i) {
                                    i.dispatch({ action: e, channelId: t.channelId, libId: oe });
                                });
                        }),
                        (e.prototype.ensureConnector = function (e) {
                            return this.connectors.has(e) || this.connectors.set(e, new pe({ senderHost: e, listenerHost: e })), this.connectors.get(e);
                        }),
                        e
                    );
                })(),
                ve = (function () {
                    function e(e) {
                        (this.coordinatorHost = e), (this.channels = new Map()), (this.callbackConnector = new ue(e)), (this.postMessageConnector = new pe({ senderHost: e, listenerHost: e }));
                    }
                    return (
                        (e.prototype.init = function () {
                            var e = this,
                                t = function (t) {
                                    ae(t) || (e.handleConnect(t), e.handleBroadcast(t));
                                };
                            this.callbackConnector.addListener(t), this.postMessageConnector.addListener(t);
                        }),
                        (e.prototype.handleConnect = function (e) {
                            (function (e) {
                                for (var t = [], i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
                                return t.some(function (t) {
                                    return e.data.action.type === t;
                                });
                            })(e, se.connect) && this.ensureChannel(e.data.channelId).addConnection(e.source);
                        }),
                        (e.prototype.handleBroadcast = function (e) {
                            (function (e) {
                                return !Object.values(se).some(function (t) {
                                    return e.data.action.type === t;
                                });
                            })(e) && this.ensureChannel(e.data.channelId).broadcast(e.data.action);
                        }),
                        (e.prototype.ensureChannel = function (e) {
                            return this.channels.has(e) || this.channels.set(e, new fe(e, this.coordinatorHost)), this.channels.get(e);
                        }),
                        e
                    );
                })();
            function be(e) {
                return "function" == typeof e;
            }
            function ye(e) {
                var t = e(function (e) {
                    Error.call(e), (e.stack = new Error().stack);
                });
                return (t.prototype = Object.create(Error.prototype)), (t.prototype.constructor = t), t;
            }
            var _e = ye(function (e) {
                return function (t) {
                    e(this),
                        (this.message = t
                            ? t.length +
                              " errors occurred during unsubscription:\n" +
                              t
                                  .map(function (e, t) {
                                      return t + 1 + ") " + e.toString();
                                  })
                                  .join("\n  ")
                            : ""),
                        (this.name = "UnsubscriptionError"),
                        (this.errors = t);
                };
            });
            function Se(e, t) {
                if (e) {
                    var i = e.indexOf(t);
                    0 <= i && e.splice(i, 1);
                }
            }
            var Ee = (function () {
                    function e(e) {
                        (this.initialTeardown = e), (this.closed = !1), (this._parentage = null), (this._finalizers = null);
                    }
                    return (
                        (e.prototype.unsubscribe = function () {
                            var e, t, i, n, s;
                            if (!this.closed) {
                                this.closed = !0;
                                var o = this._parentage;
                                if (o)
                                    if (((this._parentage = null), Array.isArray(o)))
                                        try {
                                            for (var r = g(o), a = r.next(); !a.done; a = r.next()) a.value.remove(this);
                                        } catch (t) {
                                            e = { error: t };
                                        } finally {
                                            try {
                                                a && !a.done && (t = r.return) && t.call(r);
                                            } finally {
                                                if (e) throw e.error;
                                            }
                                        }
                                    else o.remove(this);
                                var d = this.initialTeardown;
                                if (be(d))
                                    try {
                                        d();
                                    } catch (e) {
                                        s = e instanceof _e ? e.errors : [e];
                                    }
                                var l = this._finalizers;
                                if (l) {
                                    this._finalizers = null;
                                    try {
                                        for (var c = g(l), u = c.next(); !u.done; u = c.next()) {
                                            var p = u.value;
                                            try {
                                                Te(p);
                                            } catch (e) {
                                                (s = null != s ? s : []), e instanceof _e ? (s = f(f([], m(s)), m(e.errors))) : s.push(e);
                                            }
                                        }
                                    } catch (e) {
                                        i = { error: e };
                                    } finally {
                                        try {
                                            u && !u.done && (n = c.return) && n.call(c);
                                        } finally {
                                            if (i) throw i.error;
                                        }
                                    }
                                }
                                if (s) throw new _e(s);
                            }
                        }),
                        (e.prototype.add = function (t) {
                            var i;
                            if (t && t !== this)
                                if (this.closed) Te(t);
                                else {
                                    if (t instanceof e) {
                                        if (t.closed || t._hasParent(this)) return;
                                        t._addParent(this);
                                    }
                                    (this._finalizers = null !== (i = this._finalizers) && void 0 !== i ? i : []).push(t);
                                }
                        }),
                        (e.prototype._hasParent = function (e) {
                            var t = this._parentage;
                            return t === e || (Array.isArray(t) && t.includes(e));
                        }),
                        (e.prototype._addParent = function (e) {
                            var t = this._parentage;
                            this._parentage = Array.isArray(t) ? (t.push(e), t) : t ? [t, e] : e;
                        }),
                        (e.prototype._removeParent = function (e) {
                            var t = this._parentage;
                            t === e ? (this._parentage = null) : Array.isArray(t) && Se(t, e);
                        }),
                        (e.prototype.remove = function (t) {
                            var i = this._finalizers;
                            i && Se(i, t), t instanceof e && t._removeParent(this);
                        }),
                        (e.EMPTY = (((t = new e()).closed = !0), t)),
                        e
                    );
                    var t;
                })(),
                we = Ee.EMPTY;
            function Ae(e) {
                return e instanceof Ee || (e && "closed" in e && be(e.remove) && be(e.add) && be(e.unsubscribe));
            }
            function Te(e) {
                be(e) ? e() : e.unsubscribe();
            }
            var Ie = null,
                Ce = null,
                Ne = void 0,
                Oe = !1,
                Pe = !1,
                De = {
                    setTimeout: function (e, t) {
                        for (var i = [], n = 2; n < arguments.length; n++) i[n - 2] = arguments[n];
                        var s = De.delegate;
                        return (null == s ? void 0 : s.setTimeout) ? s.setTimeout.apply(s, f([e, t], m(i))) : setTimeout.apply(void 0, f([e, t], m(i)));
                    },
                    clearTimeout: function (e) {
                        var t = De.delegate;
                        return ((null == t ? void 0 : t.clearTimeout) || clearTimeout)(e);
                    },
                    delegate: void 0,
                };
            function Le(e) {
                De.setTimeout(function () {
                    if (!Ie) throw e;
                    Ie(e);
                });
            }
            function ke() {}
            var Re = xe("C", void 0, void 0);
            function xe(e, t, i) {
                return { kind: e, value: t, error: i };
            }
            var Ue = null;
            function Ve(e) {
                if (Oe) {
                    var t = !Ue;
                    if ((t && (Ue = { errorThrown: !1, error: null }), e(), t)) {
                        var i = Ue,
                            n = i.errorThrown,
                            s = i.error;
                        if (((Ue = null), n)) throw s;
                    }
                } else e();
            }
            var Me = (function (e) {
                    function t(t) {
                        var i = e.call(this) || this;
                        return (i.isStopped = !1), t ? ((i.destination = t), Ae(t) && t.add(i)) : (i.destination = He), i;
                    }
                    return (
                        d(t, e),
                        (t.create = function (e, t, i) {
                            return new Ge(e, t, i);
                        }),
                        (t.prototype.next = function (e) {
                            this.isStopped
                                ? $e(
                                      (function (e) {
                                          return xe("N", e, void 0);
                                      })(e),
                                      this
                                  )
                                : this._next(e);
                        }),
                        (t.prototype.error = function (e) {
                            this.isStopped ? $e(xe("E", void 0, e), this) : ((this.isStopped = !0), this._error(e));
                        }),
                        (t.prototype.complete = function () {
                            this.isStopped ? $e(Re, this) : ((this.isStopped = !0), this._complete());
                        }),
                        (t.prototype.unsubscribe = function () {
                            this.closed || ((this.isStopped = !0), e.prototype.unsubscribe.call(this), (this.destination = null));
                        }),
                        (t.prototype._next = function (e) {
                            this.destination.next(e);
                        }),
                        (t.prototype._error = function (e) {
                            try {
                                this.destination.error(e);
                            } finally {
                                this.unsubscribe();
                            }
                        }),
                        (t.prototype._complete = function () {
                            try {
                                this.destination.complete();
                            } finally {
                                this.unsubscribe();
                            }
                        }),
                        t
                    );
                })(Ee),
                je = Function.prototype.bind;
            function Be(e, t) {
                return je.call(e, t);
            }
            var ze = (function () {
                    function e(e) {
                        this.partialObserver = e;
                    }
                    return (
                        (e.prototype.next = function (e) {
                            var t = this.partialObserver;
                            if (t.next)
                                try {
                                    t.next(e);
                                } catch (e) {
                                    Fe(e);
                                }
                        }),
                        (e.prototype.error = function (e) {
                            var t = this.partialObserver;
                            if (t.error)
                                try {
                                    t.error(e);
                                } catch (e) {
                                    Fe(e);
                                }
                            else Fe(e);
                        }),
                        (e.prototype.complete = function () {
                            var e = this.partialObserver;
                            if (e.complete)
                                try {
                                    e.complete();
                                } catch (e) {
                                    Fe(e);
                                }
                        }),
                        e
                    );
                })(),
                Ge = (function (e) {
                    function t(t, i, n) {
                        var s,
                            o,
                            r = e.call(this) || this;
                        return (
                            be(t) || !t
                                ? (s = { next: null != t ? t : void 0, error: null != i ? i : void 0, complete: null != n ? n : void 0 })
                                : r && Pe
                                ? (((o = Object.create(t)).unsubscribe = function () {
                                      return r.unsubscribe();
                                  }),
                                  (s = { next: t.next && Be(t.next, o), error: t.error && Be(t.error, o), complete: t.complete && Be(t.complete, o) }))
                                : (s = t),
                            (r.destination = new ze(s)),
                            r
                        );
                    }
                    return d(t, e), t;
                })(Me);
            function Fe(e) {
                var t;
                Oe ? ((t = e), Oe && Ue && ((Ue.errorThrown = !0), (Ue.error = t))) : Le(e);
            }
            function $e(e, t) {
                var i = Ce;
                i &&
                    De.setTimeout(function () {
                        return i(e, t);
                    });
            }
            var He = {
                    closed: !0,
                    next: ke,
                    error: function (e) {
                        throw e;
                    },
                    complete: ke,
                },
                qe = ("function" == typeof Symbol && Symbol.observable) || "@@observable";
            function We(e) {
                return e;
            }
            function Ke(e) {
                return 0 === e.length
                    ? We
                    : 1 === e.length
                    ? e[0]
                    : function (t) {
                          return e.reduce(function (e, t) {
                              return t(e);
                          }, t);
                      };
            }
            var Ye = (function () {
                function e(e) {
                    e && (this._subscribe = e);
                }
                return (
                    (e.prototype.lift = function (t) {
                        var i = new e();
                        return (i.source = this), (i.operator = t), i;
                    }),
                    (e.prototype.subscribe = function (e, t, i) {
                        var n,
                            s = this,
                            o =
                                ((n = e) && n instanceof Me) ||
                                ((function (e) {
                                    return e && be(e.next) && be(e.error) && be(e.complete);
                                })(n) &&
                                    Ae(n))
                                    ? e
                                    : new Ge(e, t, i);
                        return (
                            Ve(function () {
                                var e = s,
                                    t = e.operator,
                                    i = e.source;
                                o.add(t ? t.call(o, i) : i ? s._subscribe(o) : s._trySubscribe(o));
                            }),
                            o
                        );
                    }),
                    (e.prototype._trySubscribe = function (e) {
                        try {
                            return this._subscribe(e);
                        } catch (t) {
                            e.error(t);
                        }
                    }),
                    (e.prototype.forEach = function (e, t) {
                        var i = this;
                        return new (t = Qe(t))(function (t, n) {
                            var s = new Ge({
                                next: function (t) {
                                    try {
                                        e(t);
                                    } catch (e) {
                                        n(e), s.unsubscribe();
                                    }
                                },
                                error: n,
                                complete: t,
                            });
                            i.subscribe(s);
                        });
                    }),
                    (e.prototype._subscribe = function (e) {
                        var t;
                        return null === (t = this.source) || void 0 === t ? void 0 : t.subscribe(e);
                    }),
                    (e.prototype[qe] = function () {
                        return this;
                    }),
                    (e.prototype.pipe = function () {
                        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                        return Ke(e)(this);
                    }),
                    (e.prototype.toPromise = function (e) {
                        var t = this;
                        return new (e = Qe(e))(function (e, i) {
                            var n;
                            t.subscribe(
                                function (e) {
                                    return (n = e);
                                },
                                function (e) {
                                    return i(e);
                                },
                                function () {
                                    return e(n);
                                }
                            );
                        });
                    }),
                    (e.create = function (t) {
                        return new e(t);
                    }),
                    e
                );
            })();
            function Qe(e) {
                var t;
                return null !== (t = null != e ? e : Ne) && void 0 !== t ? t : Promise;
            }
            function Xe(e) {
                return be(null == e ? void 0 : e.lift);
            }
            function Je(e) {
                return function (t) {
                    if (Xe(t))
                        return t.lift(function (t) {
                            try {
                                return e(t, this);
                            } catch (e) {
                                this.error(e);
                            }
                        });
                    throw new TypeError("Unable to lift unknown Observable type");
                };
            }
            function Ze(e, t, i, n, s) {
                return new et(e, t, i, n, s);
            }
            var et = (function (e) {
                function t(t, i, n, s, o, r) {
                    var a = e.call(this, t) || this;
                    return (
                        (a.onFinalize = o),
                        (a.shouldUnsubscribe = r),
                        (a._next = i
                            ? function (e) {
                                  try {
                                      i(e);
                                  } catch (e) {
                                      t.error(e);
                                  }
                              }
                            : e.prototype._next),
                        (a._error = s
                            ? function (e) {
                                  try {
                                      s(e);
                                  } catch (e) {
                                      t.error(e);
                                  } finally {
                                      this.unsubscribe();
                                  }
                              }
                            : e.prototype._error),
                        (a._complete = n
                            ? function () {
                                  try {
                                      n();
                                  } catch (e) {
                                      t.error(e);
                                  } finally {
                                      this.unsubscribe();
                                  }
                              }
                            : e.prototype._complete),
                        a
                    );
                }
                return (
                    d(t, e),
                    (t.prototype.unsubscribe = function () {
                        var t;
                        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                            var i = this.closed;
                            e.prototype.unsubscribe.call(this), !i && (null === (t = this.onFinalize) || void 0 === t || t.call(this));
                        }
                    }),
                    t
                );
            })(Me);
            function tt(e, t) {
                return Je(function (i, n) {
                    var s = 0;
                    i.subscribe(
                        Ze(n, function (i) {
                            n.next(e.call(t, i, s++));
                        })
                    );
                });
            }
            var it = Array.isArray;
            function nt(e) {
                return tt(function (t) {
                    return (function (e, t) {
                        return it(t) ? e.apply(void 0, f([], m(t))) : e(t);
                    })(e, t);
                });
            }
            function st(e, t, i) {
                return i
                    ? st(e, t).pipe(nt(i))
                    : new Ye(function (i) {
                          var n = function () {
                                  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                  return i.next(1 === e.length ? e[0] : e);
                              },
                              s = e(n);
                          return be(t)
                              ? function () {
                                    return t(n, s);
                                }
                              : void 0;
                      });
            }
            var ot = ye(function (e) {
                    return function () {
                        e(this), (this.name = "ObjectUnsubscribedError"), (this.message = "object unsubscribed");
                    };
                }),
                rt = (function (e) {
                    function t() {
                        var t = e.call(this) || this;
                        return (t.closed = !1), (t.currentObservers = null), (t.observers = []), (t.isStopped = !1), (t.hasError = !1), (t.thrownError = null), t;
                    }
                    return (
                        d(t, e),
                        (t.prototype.lift = function (e) {
                            var t = new at(this, this);
                            return (t.operator = e), t;
                        }),
                        (t.prototype._throwIfClosed = function () {
                            if (this.closed) throw new ot();
                        }),
                        (t.prototype.next = function (e) {
                            var t = this;
                            Ve(function () {
                                var i, n;
                                if ((t._throwIfClosed(), !t.isStopped)) {
                                    t.currentObservers || (t.currentObservers = Array.from(t.observers));
                                    try {
                                        for (var s = g(t.currentObservers), o = s.next(); !o.done; o = s.next()) o.value.next(e);
                                    } catch (e) {
                                        i = { error: e };
                                    } finally {
                                        try {
                                            o && !o.done && (n = s.return) && n.call(s);
                                        } finally {
                                            if (i) throw i.error;
                                        }
                                    }
                                }
                            });
                        }),
                        (t.prototype.error = function (e) {
                            var t = this;
                            Ve(function () {
                                if ((t._throwIfClosed(), !t.isStopped)) {
                                    (t.hasError = t.isStopped = !0), (t.thrownError = e);
                                    for (var i = t.observers; i.length; ) i.shift().error(e);
                                }
                            });
                        }),
                        (t.prototype.complete = function () {
                            var e = this;
                            Ve(function () {
                                if ((e._throwIfClosed(), !e.isStopped)) {
                                    e.isStopped = !0;
                                    for (var t = e.observers; t.length; ) t.shift().complete();
                                }
                            });
                        }),
                        (t.prototype.unsubscribe = function () {
                            (this.isStopped = this.closed = !0), (this.observers = this.currentObservers = null);
                        }),
                        Object.defineProperty(t.prototype, "observed", {
                            get: function () {
                                var e;
                                return (null === (e = this.observers) || void 0 === e ? void 0 : e.length) > 0;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        (t.prototype._trySubscribe = function (t) {
                            return this._throwIfClosed(), e.prototype._trySubscribe.call(this, t);
                        }),
                        (t.prototype._subscribe = function (e) {
                            return this._throwIfClosed(), this._checkFinalizedStatuses(e), this._innerSubscribe(e);
                        }),
                        (t.prototype._innerSubscribe = function (e) {
                            var t = this,
                                i = this,
                                n = i.hasError,
                                s = i.isStopped,
                                o = i.observers;
                            return n || s
                                ? we
                                : ((this.currentObservers = null),
                                  o.push(e),
                                  new Ee(function () {
                                      (t.currentObservers = null), Se(o, e);
                                  }));
                        }),
                        (t.prototype._checkFinalizedStatuses = function (e) {
                            var t = this,
                                i = t.hasError,
                                n = t.thrownError,
                                s = t.isStopped;
                            i ? e.error(n) : s && e.complete();
                        }),
                        (t.prototype.asObservable = function () {
                            var e = new Ye();
                            return (e.source = this), e;
                        }),
                        (t.create = function (e, t) {
                            return new at(e, t);
                        }),
                        t
                    );
                })(Ye),
                at = (function (e) {
                    function t(t, i) {
                        var n = e.call(this) || this;
                        return (n.destination = t), (n.source = i), n;
                    }
                    return (
                        d(t, e),
                        (t.prototype.next = function (e) {
                            var t, i;
                            null === (i = null === (t = this.destination) || void 0 === t ? void 0 : t.next) || void 0 === i || i.call(t, e);
                        }),
                        (t.prototype.error = function (e) {
                            var t, i;
                            null === (i = null === (t = this.destination) || void 0 === t ? void 0 : t.error) || void 0 === i || i.call(t, e);
                        }),
                        (t.prototype.complete = function () {
                            var e, t;
                            null === (t = null === (e = this.destination) || void 0 === e ? void 0 : e.complete) || void 0 === t || t.call(e);
                        }),
                        (t.prototype._subscribe = function (e) {
                            var t, i;
                            return null !== (i = null === (t = this.source) || void 0 === t ? void 0 : t.subscribe(e)) && void 0 !== i ? i : we;
                        }),
                        t
                    );
                })(rt),
                dt = function (e) {
                    return e && "number" == typeof e.length && "function" != typeof e;
                };
            function lt(e) {
                return be(null == e ? void 0 : e.then);
            }
            function ct(e) {
                return be(e[qe]);
            }
            function ut(e) {
                return Symbol.asyncIterator && be(null == e ? void 0 : e[Symbol.asyncIterator]);
            }
            function pt(e) {
                return new TypeError(
                    "You provided " + (null !== e && "object" == typeof e ? "an invalid object" : "'" + e + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable."
                );
            }
            var ht = "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator";
            function gt(e) {
                return be(null == e ? void 0 : e[ht]);
            }
            function mt(e) {
                return b(this, arguments, function () {
                    var t, i, n;
                    return h(this, function (s) {
                        switch (s.label) {
                            case 0:
                                (t = e.getReader()), (s.label = 1);
                            case 1:
                                s.trys.push([1, , 9, 10]), (s.label = 2);
                            case 2:
                                return [4, v(t.read())];
                            case 3:
                                return (i = s.sent()), (n = i.value), i.done ? [4, v(void 0)] : [3, 5];
                            case 4:
                                return [2, s.sent()];
                            case 5:
                                return [4, v(n)];
                            case 6:
                                return [4, s.sent()];
                            case 7:
                                return s.sent(), [3, 2];
                            case 8:
                                return [3, 10];
                            case 9:
                                return t.releaseLock(), [7];
                            case 10:
                                return [2];
                        }
                    });
                });
            }
            function ft(e) {
                return be(null == e ? void 0 : e.getReader);
            }
            function vt(e) {
                if (e instanceof Ye) return e;
                if (null != e) {
                    if (ct(e))
                        return (
                            (s = e),
                            new Ye(function (e) {
                                var t = s[qe]();
                                if (be(t.subscribe)) return t.subscribe(e);
                                throw new TypeError("Provided object does not correctly implement Symbol.observable");
                            })
                        );
                    if (dt(e))
                        return (
                            (n = e),
                            new Ye(function (e) {
                                for (var t = 0; t < n.length && !e.closed; t++) e.next(n[t]);
                                e.complete();
                            })
                        );
                    if (lt(e))
                        return (
                            (i = e),
                            new Ye(function (e) {
                                i.then(
                                    function (t) {
                                        e.closed || (e.next(t), e.complete());
                                    },
                                    function (t) {
                                        return e.error(t);
                                    }
                                ).then(null, Le);
                            })
                        );
                    if (ut(e)) return bt(e);
                    if (gt(e))
                        return (
                            (t = e),
                            new Ye(function (e) {
                                var i, n;
                                try {
                                    for (var s = g(t), o = s.next(); !o.done; o = s.next()) {
                                        var r = o.value;
                                        if ((e.next(r), e.closed)) return;
                                    }
                                } catch (e) {
                                    i = { error: e };
                                } finally {
                                    try {
                                        o && !o.done && (n = s.return) && n.call(s);
                                    } finally {
                                        if (i) throw i.error;
                                    }
                                }
                                e.complete();
                            })
                        );
                    if (ft(e)) return bt(mt(e));
                }
                var t, i, n, s;
                throw pt(e);
            }
            function bt(e) {
                return new Ye(function (t) {
                    (function (e, t) {
                        var i, n, s, o;
                        return p(this, void 0, void 0, function () {
                            var r, a;
                            return h(this, function (d) {
                                switch (d.label) {
                                    case 0:
                                        d.trys.push([0, 5, 6, 11]),
                                            (i = (function (e) {
                                                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                                                var t,
                                                    i = e[Symbol.asyncIterator];
                                                return i
                                                    ? i.call(e)
                                                    : ((e = g(e)),
                                                      (t = {}),
                                                      n("next"),
                                                      n("throw"),
                                                      n("return"),
                                                      (t[Symbol.asyncIterator] = function () {
                                                          return this;
                                                      }),
                                                      t);
                                                function n(i) {
                                                    t[i] =
                                                        e[i] &&
                                                        function (t) {
                                                            return new Promise(function (n, s) {
                                                                !(function (e, t, i, n) {
                                                                    Promise.resolve(n).then(function (t) {
                                                                        e({ value: t, done: i });
                                                                    }, t);
                                                                })(n, s, (t = e[i](t)).done, t.value);
                                                            });
                                                        };
                                                }
                                            })(e)),
                                            (d.label = 1);
                                    case 1:
                                        return [4, i.next()];
                                    case 2:
                                        if ((n = d.sent()).done) return [3, 4];
                                        if (((r = n.value), t.next(r), t.closed)) return [2];
                                        d.label = 3;
                                    case 3:
                                        return [3, 1];
                                    case 4:
                                        return [3, 11];
                                    case 5:
                                        return (a = d.sent()), (s = { error: a }), [3, 11];
                                    case 6:
                                        return d.trys.push([6, , 9, 10]), n && !n.done && (o = i.return) ? [4, o.call(i)] : [3, 8];
                                    case 7:
                                        d.sent(), (d.label = 8);
                                    case 8:
                                        return [3, 10];
                                    case 9:
                                        if (s) throw s.error;
                                        return [7];
                                    case 10:
                                        return [7];
                                    case 11:
                                        return t.complete(), [2];
                                }
                            });
                        });
                    })(e, t).catch(function (e) {
                        return t.error(e);
                    });
                });
            }
            function yt(e, t, i, n, s) {
                void 0 === n && (n = 0), void 0 === s && (s = !1);
                var o = t.schedule(function () {
                    i(), s ? e.add(this.schedule(null, n)) : this.unsubscribe();
                }, n);
                if ((e.add(o), !s)) return o;
            }
            function _t(e, t, i) {
                return (
                    void 0 === i && (i = 1 / 0),
                    be(t)
                        ? _t(function (i, n) {
                              return tt(function (e, s) {
                                  return t(i, e, n, s);
                              })(vt(e(i, n)));
                          }, i)
                        : ("number" == typeof t && (i = t),
                          Je(function (t, n) {
                              return (function (e, t, i, n, s, o, r, a) {
                                  var d = [],
                                      l = 0,
                                      c = 0,
                                      u = !1,
                                      p = function () {
                                          !u || d.length || l || t.complete();
                                      },
                                      h = function (e) {
                                          return l < n ? g(e) : d.push(e);
                                      },
                                      g = function (e) {
                                          l++;
                                          var s = !1;
                                          vt(i(e, c++)).subscribe(
                                              Ze(
                                                  t,
                                                  function (e) {
                                                      t.next(e);
                                                  },
                                                  function () {
                                                      s = !0;
                                                  },
                                                  void 0,
                                                  function () {
                                                      if (s)
                                                          try {
                                                              l--;
                                                              for (; d.length && l < n; ) (e = void 0), (e = d.shift()), g(e);
                                                              p();
                                                          } catch (e) {
                                                              t.error(e);
                                                          }
                                                      var e;
                                                  }
                                              )
                                          );
                                      };
                                  return (
                                      e.subscribe(
                                          Ze(t, h, function () {
                                              (u = !0), p();
                                          })
                                      ),
                                      function () {}
                                  );
                              })(t, n, e, i);
                          }))
                );
            }
            function St(e) {
                return void 0 === e && (e = 1 / 0), _t(We, e);
            }
            var Et = new Ye(function (e) {
                return e.complete();
            });
            function wt(e) {
                return e && be(e.schedule);
            }
            function At(e) {
                return e[e.length - 1];
            }
            function Tt(e) {
                return be(At(e)) ? e.pop() : void 0;
            }
            function It(e) {
                return wt(At(e)) ? e.pop() : void 0;
            }
            function Ct(e, t) {
                return "number" == typeof At(e) ? e.pop() : t;
            }
            function Nt(e, t) {
                return (
                    void 0 === t && (t = 0),
                    Je(function (i, n) {
                        i.subscribe(
                            Ze(
                                n,
                                function (i) {
                                    return yt(
                                        n,
                                        e,
                                        function () {
                                            return n.next(i);
                                        },
                                        t
                                    );
                                },
                                function () {
                                    return yt(
                                        n,
                                        e,
                                        function () {
                                            return n.complete();
                                        },
                                        t
                                    );
                                },
                                function (i) {
                                    return yt(
                                        n,
                                        e,
                                        function () {
                                            return n.error(i);
                                        },
                                        t
                                    );
                                }
                            )
                        );
                    })
                );
            }
            function Ot(e, t) {
                return (
                    void 0 === t && (t = 0),
                    Je(function (i, n) {
                        n.add(
                            e.schedule(function () {
                                return i.subscribe(n);
                            }, t)
                        );
                    })
                );
            }
            function Pt(e, t) {
                if (!e) throw new Error("Iterable cannot be null");
                return new Ye(function (i) {
                    yt(i, t, function () {
                        var n = e[Symbol.asyncIterator]();
                        yt(
                            i,
                            t,
                            function () {
                                n.next().then(function (e) {
                                    e.done ? i.complete() : i.next(e.value);
                                });
                            },
                            0,
                            !0
                        );
                    });
                });
            }
            function Dt(e, t) {
                return t
                    ? (function (e, t) {
                          if (null != e) {
                              if (ct(e))
                                  return (function (e, t) {
                                      return vt(e).pipe(Ot(t), Nt(t));
                                  })(e, t);
                              if (dt(e))
                                  return (function (e, t) {
                                      return new Ye(function (i) {
                                          var n = 0;
                                          return t.schedule(function () {
                                              n === e.length ? i.complete() : (i.next(e[n++]), i.closed || this.schedule());
                                          });
                                      });
                                  })(e, t);
                              if (lt(e))
                                  return (function (e, t) {
                                      return vt(e).pipe(Ot(t), Nt(t));
                                  })(e, t);
                              if (ut(e)) return Pt(e, t);
                              if (gt(e))
                                  return (function (e, t) {
                                      return new Ye(function (i) {
                                          var n;
                                          return (
                                              yt(i, t, function () {
                                                  (n = e[ht]()),
                                                      yt(
                                                          i,
                                                          t,
                                                          function () {
                                                              var e, t, s;
                                                              try {
                                                                  (t = (e = n.next()).value), (s = e.done);
                                                              } catch (e) {
                                                                  return void i.error(e);
                                                              }
                                                              s ? i.complete() : i.next(t);
                                                          },
                                                          0,
                                                          !0
                                                      );
                                              }),
                                              function () {
                                                  return be(null == n ? void 0 : n.return) && n.return();
                                              }
                                          );
                                      });
                                  })(e, t);
                              if (ft(e))
                                  return (function (e, t) {
                                      return Pt(mt(e), t);
                                  })(e, t);
                          }
                          throw pt(e);
                      })(e, t)
                    : vt(e);
            }
            function Lt() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                var i = It(e),
                    n = Ct(e, 1 / 0),
                    s = e;
                return s.length ? (1 === s.length ? vt(s[0]) : St(n)(Dt(s, i))) : Et;
            }
            var kt = {
                    now: function () {
                        return (kt.delegate || Date).now();
                    },
                    delegate: void 0,
                },
                Rt = (function (e) {
                    function t(t, i, n) {
                        void 0 === t && (t = 1 / 0), void 0 === i && (i = 1 / 0), void 0 === n && (n = kt);
                        var s = e.call(this) || this;
                        return (
                            (s._bufferSize = t),
                            (s._windowTime = i),
                            (s._timestampProvider = n),
                            (s._buffer = []),
                            (s._infiniteTimeWindow = !0),
                            (s._infiniteTimeWindow = i === 1 / 0),
                            (s._bufferSize = Math.max(1, t)),
                            (s._windowTime = Math.max(1, i)),
                            s
                        );
                    }
                    return (
                        d(t, e),
                        (t.prototype.next = function (t) {
                            var i = this,
                                n = i.isStopped,
                                s = i._buffer,
                                o = i._infiniteTimeWindow,
                                r = i._timestampProvider,
                                a = i._windowTime;
                            n || (s.push(t), !o && s.push(r.now() + a)), this._trimBuffer(), e.prototype.next.call(this, t);
                        }),
                        (t.prototype._subscribe = function (e) {
                            this._throwIfClosed(), this._trimBuffer();
                            for (var t = this._innerSubscribe(e), i = this._infiniteTimeWindow, n = this._buffer.slice(), s = 0; s < n.length && !e.closed; s += i ? 1 : 2) e.next(n[s]);
                            return this._checkFinalizedStatuses(e), t;
                        }),
                        (t.prototype._trimBuffer = function () {
                            var e = this,
                                t = e._bufferSize,
                                i = e._timestampProvider,
                                n = e._buffer,
                                s = e._infiniteTimeWindow,
                                o = (s ? 1 : 2) * t;
                            if ((t < 1 / 0 && o < n.length && n.splice(0, n.length - o), !s)) {
                                for (var r = i.now(), a = 0, d = 1; d < n.length && n[d] <= r; d += 2) a = d;
                                a && n.splice(0, a + 1);
                            }
                        }),
                        t
                    );
                })(rt);
            function xt(e, t) {
                for (var i = [], n = 2; n < arguments.length; n++) i[n - 2] = arguments[n];
                if (!0 !== t) {
                    if (!1 !== t) {
                        var s = new Ge({
                            next: function () {
                                s.unsubscribe(), e();
                            },
                        });
                        return vt(t.apply(void 0, f([], m(i)))).subscribe(s);
                    }
                } else e();
            }
            function Ut(e, t, i) {
                var n,
                    s,
                    o,
                    r,
                    a = !1;
                return (
                    e && "object" == typeof e
                        ? ((n = e.bufferSize), (r = void 0 === n ? 1 / 0 : n), (s = e.windowTime), (t = void 0 === s ? 1 / 0 : s), (a = void 0 !== (o = e.refCount) && o), (i = e.scheduler))
                        : (r = null != e ? e : 1 / 0),
                    (function (e) {
                        void 0 === e && (e = {});
                        var t = e.connector,
                            i =
                                void 0 === t
                                    ? function () {
                                          return new rt();
                                      }
                                    : t,
                            n = e.resetOnError,
                            s = void 0 === n || n,
                            o = e.resetOnComplete,
                            r = void 0 === o || o,
                            a = e.resetOnRefCountZero,
                            d = void 0 === a || a;
                        return function (e) {
                            var t,
                                n,
                                o,
                                a = 0,
                                l = !1,
                                c = !1,
                                u = function () {
                                    null == n || n.unsubscribe(), (n = void 0);
                                },
                                p = function () {
                                    u(), (t = o = void 0), (l = c = !1);
                                },
                                h = function () {
                                    var e = t;
                                    p(), null == e || e.unsubscribe();
                                };
                            return Je(function (e, g) {
                                a++, c || l || u();
                                var m = (o = null != o ? o : i());
                                g.add(function () {
                                    0 != --a || c || l || (n = xt(h, d));
                                }),
                                    m.subscribe(g),
                                    !t &&
                                        a > 0 &&
                                        ((t = new Ge({
                                            next: function (e) {
                                                return m.next(e);
                                            },
                                            error: function (e) {
                                                (c = !0), u(), (n = xt(p, s, e)), m.error(e);
                                            },
                                            complete: function () {
                                                (l = !0), u(), (n = xt(p, r)), m.complete();
                                            },
                                        })),
                                        vt(e).subscribe(t));
                            })(e);
                        };
                    })({
                        connector: function () {
                            return new Rt(r, t, i);
                        },
                        resetOnError: !0,
                        resetOnComplete: !1,
                        resetOnRefCountZero: a,
                    })
                );
            }
            function Vt(e, t) {
                return Je(function (i, n) {
                    var s = 0;
                    i.subscribe(
                        Ze(n, function (i) {
                            return e.call(t, i, s++) && n.next(i);
                        })
                    );
                });
            }
            function Mt(e) {
                return e <= 0
                    ? function () {
                          return Et;
                      }
                    : Je(function (t, i) {
                          var n = 0;
                          t.subscribe(
                              Ze(i, function (t) {
                                  ++n <= e && (i.next(t), e <= n && i.complete());
                              })
                          );
                      });
            }
            function jt(e) {
                return Vt(function (t, i) {
                    return e <= i;
                });
            }
            const Bt = {
                AD_ENGINE_BAB_DETECTION: { category: "[Ad Engine]", name: "BAB detection finished", payload: { _as: "props", _p: void 0 } },
                AD_ENGINE_CONFIGURED: { name: "Configured" },
                AD_ENGINE_CONSENT_READY: { category: "[AdEngine OptIn]", name: "set opt in", payload: { _as: "props", _p: void 0 } },
                AD_ENGINE_CONSENT_UPDATE: { category: "[AdEngine OptIn]", name: "update opt in", payload: { _as: "props", _p: void 0 } },
                AD_ENGINE_GPT_READY: { name: "GPT Ready" },
                AD_ENGINE_INSTANT_CONFIG_CACHE_RESET: { name: "Instant Config cache reset" },
                AD_ENGINE_INSTANT_CONFIG_CACHE_READY: { name: "Instant Config cache ready" },
                AD_ENGINE_INTERSTITIAL_DISPLAYED: { name: "Interstitial displayed" },
                AD_ENGINE_LOAD_TIME_INIT: { name: "Ad engine load time init" },
                AD_ENGINE_MESSAGE_BOX_EVENT: { name: "MessageBox event", payload: { _as: "props", _p: void 0 } },
                AD_ENGINE_PARTNERS_READY: { name: "Partners Ready" },
                AD_ENGINE_STACK_START: { name: "Ad Stack started" },
                AD_ENGINE_STACK_COMPLETED: { name: "Ad Stack completed" },
                AD_ENGINE_TEMPLATE_LOADED: { name: "Template loaded", payload: { _as: "props", _p: void 0 } },
                AD_ENGINE_UAP_DOM_CHANGED: { name: "UAP DOM changed", payload: { _as: "props", _p: void 0 } },
                AD_ENGINE_UAP_LOAD_STATUS: { name: "UAP Load status", payload: { _as: "props", _p: void 0 } },
                AD_ENGINE_UAP_NTC_LOADED: { name: "UAP NTC loaded" },
                AD_ENGINE_INVALIDATE_SLOT_TARGETING: { name: "Invalidate slot targeting", payload: { _as: "props", _p: void 0 } },
                AD_ENGINE_VIDEO_OVERLAY_CLICKED: { name: "Video overlay added", payload: { _as: "props", _p: void 0 } },
                AD_ENGINE_VIDEO_TOGGLE_UI_OVERLAY_CLICKED: { name: "Video toggle ui overlay clicked", payload: { _as: "props", _p: void 0 } },
                AD_ENGINE_VIDEO_LEARN_MORE_CLICKED: { name: "Video learn more displayed", payload: { _as: "props", _p: void 0 } },
                AD_ENGINE_SLOT_ADDED: { name: "Ad Slot added", payload: { _as: "props", _p: void 0 } },
                AD_ENGINE_SLOT_EVENT: { name: "Ad Slot event", payload: { _as: "props", _p: void 0 } },
                AD_ENGINE_SLOT_LOADED: { name: "Ad Slot loaded", payload: { _as: "props", _p: void 0 } },
                AD_ENGINE_AD_RESIZED: { name: "Ad slot resized", payload: { _as: "props", _p: void 0 } },
                AD_ENGINE_AD_CLICKED: { name: "Ad clicked", payload: { _as: "props", _p: void 0 } },
                IDENTITY_PARTNER_DATA_OBTAINED: { name: "Identity partner data obtained", payload: { _as: "payload", _p: void 0 } },
                PARTNER_LOAD_STATUS: { name: "Partner load status", payload: { _as: "props", _p: void 0 } },
                ANYCLIP_READY: { name: "Anyclip ready" },
                ANYCLIP_START: { name: "Anyclip start" },
                ANYCLIP_LATE_INJECT: { name: "Anyclip late inject" },
                SYSTEM1_STARTED: { name: "System1 started" },
                NO_NATIVE_PREBID_AD: { name: "No native prebid ad", payload: { _as: "props", _p: void 0 } },
                CONNATIX_LATE_INJECT: { name: "Connatix late inject" },
                CONNATIX_READY: { name: "Connatix ready" },
                NO_NATIVO_AD: { name: "No nativo ad", payload: { _as: "props", _p: void 0 } },
                LIVE_CONNECT_STARTED: { name: "LiveConnect started" },
                LIVE_CONNECT_CACHED: { name: "LiveConnect data cached" },
                LIVE_CONNECT_RESPONDED_UUID: { name: "LiveConnect responded with UUID" },
                YAHOO_LOADED: { name: "Yahoo loaded" },
                IDENTITY_ENGINE_READY: { category: "[IdentityEngine]", name: "Identity ready" },
                BINGEBOT_AD_SLOT_INJECTED: { category: "[BingeBot]", name: "ad slot injected", payload: { _as: "props", _p: void 0 } },
                BINGEBOT_BEFORE_VIEW_CHANGE: { category: "[BingeBot]", name: "before view change" },
                BINGEBOT_DESTROY_AD_SLOT: { category: "[BingeBot]", name: "destroy ad slot", payload: { _as: "props", _p: void 0 } },
                BINGEBOT_VIEW_RENDERED: { category: "[BingeBot]", name: "view rendered", payload: { _as: "props", _p: void 0 } },
                F2_HIDE_SMART_BANNER: { category: "[AdEngine F2 Templates]", name: "hide smart banner" },
                FAN_FEED_READY: { category: "[FanFeed]", name: "Ready" },
                QUIZ_AD_INJECTED: { category: "[quizConsumption]", name: "ad slot injected", payload: { _as: "props", _p: void 0 } },
                PLATFORM_BEFORE_PAGE_CHANGE: { category: "[Platform]", name: "Before page change" },
                PLATFORM_PAGE_CHANGED: { category: "[Platform]", name: "Page changed" },
                PLATFORM_PAGE_EXTENDED: { category: "[Platform]", name: "Page extended" },
                PLATFORM_AD_PLACEMENT_READY: { category: "[Platform]", name: "Ad placement ready", payload: { _as: "props", _p: void 0 } },
                PLATFORM_LIGHTBOX_READY: { category: "[Platform]", name: "Lightbox ready", payload: { _as: "props", _p: void 0 } },
                PLATFORM_LIGHTBOX_CLOSED: { category: "[Platform]", name: "Lightbox closed", payload: { _as: "props", _p: void 0 } },
                PLATFORM_LIGHTBOX_IMAGE_CHANGE: { category: "[Platform]", name: "Lightbox image change", payload: { _as: "props", _p: void 0 } },
                RAIL_READY: { category: "[Rail]", name: "Ready" },
                A9_WITHOUT_CONSENTS: { name: "A9 without consents" },
                A9_APSTAG_HEM_SENT: { name: "A9 Apstag HEM sent" },
                BIDDERS_BIDDING_DONE: { category: "[Prebid]", name: "Bidding done", payload: { _as: "props", _p: void 0 } },
                BIDDERS_BIDS_CALLED: { category: "[Prebid]", name: "Bids called" },
                BIDDERS_BIDS_REFRESH: { category: "[Prebid]", name: "Bids refresh", payload: { _as: "props", _p: void 0 } },
                BIDDERS_BIDS_RESPONSE: { category: "[Prebid]", name: "Bids response", payload: { _as: "props", _p: void 0 } },
                BIDDERS_AUCTION_DONE: { category: "[Prebid]", name: "Auction done" },
                BIDDERS_CALL_PER_GROUP: { category: "[Prebid]", name: "Call per group", payload: { _as: "props", _p: void 0 } },
                VIDEO_SETUP: { category: "[Video]", name: "Setup done", payload: { _as: "props", _p: void 0 } },
                VIDEO_EVENT: { category: "[Video]", name: "Video event", payload: { _as: "props", _p: void 0 } },
                VIDEO_PLAYER_TRACKING: { category: "[Video]", name: "Video player tracking", payload: { _as: "props", _p: void 0 } },
                VIDEO_PLAYER_RENDERED: { category: "[Video]", name: "Player rendered", payload: { _as: "props", _p: void 0 } },
                GAM_AD_INTERVENTION: { category: "[GAM iframe]", name: "Ad intervention", payload: { _as: "props", _p: void 0 } },
                GAM_AD_DELAYED_COLLAPSE: { category: "[GAM iframe]", name: "Delayed collapse", payload: { _as: "props", _p: void 0 } },
                GAM_INTERSTITIAL_LOADED: { category: "[GAM iframe]", name: "Interstitial loaded" },
                GAM_LOAD_TEMPLATE: { category: "[GAM iframe]", name: "Load template", payload: { _as: "payload", _p: void 0 } },
            };
            function zt(...e) {
                return (t) =>
                    t.pipe(
                        (function () {
                            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                            return Vt(function (t) {
                                var i = t.type;
                                return e.some(function (e) {
                                    return e.type === i;
                                });
                            });
                        })(...e),
                        Vt((t) => e.some((e) => (!0 === e.__global ? ee(t) : !ee(t))))
                    );
            }
            const Gt = new (class {
                constructor() {
                    const { channelId: e, coordinatorName: t, reduxDevtoolsName: i } = this.getSettings();
                    !(function (e) {
                        if ((void 0 === e && (e = window), !e[oe])) {
                            var t = new ve(e);
                            t.init(), (e[oe] = t);
                        }
                    })(),
                        (this.communicator = new me({ channelId: e || "default", coordinatorHost: window[t] || top }));
                    const n = st(
                        (e) => this.communicator.addListener(e),
                        (e) => this.communicator.removeListener(e)
                    ).pipe(Ut({ refCount: !0 }));
                    (this.subject = new rt()), (this.action$ = Lt(n.pipe(Vt((e) => ee(e))), this.subject.asObservable().pipe(Vt((e) => !ee(e))))), this.connectReduxDevtools(i);
                }
                emit(e, t) {
                    this.dispatch(this.getGlobalAction(e)(t));
                }
                on(e, t, i = !0) {
                    this.action$.pipe(zt(this.getGlobalAction(e)), i ? Mt(1) : jt(0)).subscribe(t);
                }
                onSlotEvent(e, t, i = "", n = !1) {
                    this.action$
                        .pipe(
                            zt(this.getGlobalAction(Bt.AD_ENGINE_SLOT_EVENT)),
                            Vt((t) => t.event === e.toString() && (!i || t.adSlotName === i)),
                            n ? Mt(1) : jt(0)
                        )
                        .subscribe(t);
                }
                dispatch(e) {
                    ee(e) ? this.communicator.dispatch(e) : this.subject.next(e);
                }
                getGlobalAction(e) {
                    return e.action || (e.action = e.payload ? te(`${e.category || "[AdEngine]"} ${e.name}`, e.payload) : te(`${e.category || "[AdEngine]"} ${e.name}`)), e.action;
                }
                getSettings() {
                    return window["@wikia/post-quecast-settings"] || {};
                }
                connectReduxDevtools(e) {
                    const t = class {
                        static connect(e = "AdEngine") {
                            if (this.devtools) throw new Error("Trying to initialize ReduxDevtools second time");
                            const t = window.__REDUX_DEVTOOLS_EXTENSION__;
                            if (t) return (this.devtools = t.connect({ name: e }));
                        }
                    }.connect(e);
                    t &&
                        (t.subscribe((e) => {
                            try {
                                if ("@devtools-extension" === e.source && "ACTION" === e.type) {
                                    const t = new Function(`return ${e.payload}`)();
                                    this.dispatch(t);
                                }
                            } catch (e) {
                                t.error(e.message);
                            }
                        }),
                        this.action$.subscribe((e) => t.send(e, {})));
                }
            })();
            var Ft = s(4492),
                $t =
                    (s(5787),
                    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                        ? function (e) {
                              return typeof e;
                          }
                        : function (e) {
                              return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                          }),
                Ht = window.device,
                qt = {},
                Wt = [];
            window.device = qt;
            var Kt = window.document.documentElement,
                Yt = window.navigator.userAgent.toLowerCase(),
                Qt = ["googletv", "viera", "smarttv", "internet.tv", "netcast", "nettv", "appletv", "boxee", "kylo", "roku", "dlnadoc", "pov_tv", "hbbtv", "ce-html"];
            function Xt(e, t) {
                return -1 !== e.indexOf(t);
            }
            function Jt(e) {
                return Xt(Yt, e);
            }
            function Zt(e) {
                return Kt.className.match(new RegExp(e, "i"));
            }
            function ei(e) {
                var t = null;
                Zt(e) || ((t = Kt.className.replace(/^\s+|\s+$/g, "")), (Kt.className = t + " " + e));
            }
            function ti(e) {
                Zt(e) && (Kt.className = Kt.className.replace(" " + e, ""));
            }
            function ii() {
                qt.landscape() ? (ti("portrait"), ei("landscape"), ni("landscape")) : (ti("landscape"), ei("portrait"), ni("portrait")), ri();
            }
            function ni(e) {
                for (var t = 0; t < Wt.length; t++) Wt[t](e);
            }
            (qt.macos = function () {
                return Jt("mac");
            }),
                (qt.ios = function () {
                    return qt.iphone() || qt.ipod() || qt.ipad();
                }),
                (qt.iphone = function () {
                    return !qt.windows() && Jt("iphone");
                }),
                (qt.ipod = function () {
                    return Jt("ipod");
                }),
                (qt.ipad = function () {
                    var e = "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1;
                    return Jt("ipad") || e;
                }),
                (qt.android = function () {
                    return !qt.windows() && Jt("android");
                }),
                (qt.androidPhone = function () {
                    return qt.android() && Jt("mobile");
                }),
                (qt.androidTablet = function () {
                    return qt.android() && !Jt("mobile");
                }),
                (qt.blackberry = function () {
                    return Jt("blackberry") || Jt("bb10");
                }),
                (qt.blackberryPhone = function () {
                    return qt.blackberry() && !Jt("tablet");
                }),
                (qt.blackberryTablet = function () {
                    return qt.blackberry() && Jt("tablet");
                }),
                (qt.windows = function () {
                    return Jt("windows");
                }),
                (qt.windowsPhone = function () {
                    return qt.windows() && Jt("phone");
                }),
                (qt.windowsTablet = function () {
                    return qt.windows() && Jt("touch") && !qt.windowsPhone();
                }),
                (qt.fxos = function () {
                    return (Jt("(mobile") || Jt("(tablet")) && Jt(" rv:");
                }),
                (qt.fxosPhone = function () {
                    return qt.fxos() && Jt("mobile");
                }),
                (qt.fxosTablet = function () {
                    return qt.fxos() && Jt("tablet");
                }),
                (qt.meego = function () {
                    return Jt("meego");
                }),
                (qt.cordova = function () {
                    return window.cordova && "file:" === location.protocol;
                }),
                (qt.nodeWebkit = function () {
                    return "object" === $t(window.process);
                }),
                (qt.mobile = function () {
                    return qt.androidPhone() || qt.iphone() || qt.ipod() || qt.windowsPhone() || qt.blackberryPhone() || qt.fxosPhone() || qt.meego();
                }),
                (qt.tablet = function () {
                    return qt.ipad() || qt.androidTablet() || qt.blackberryTablet() || qt.windowsTablet() || qt.fxosTablet();
                }),
                (qt.desktop = function () {
                    return !qt.tablet() && !qt.mobile();
                }),
                (qt.television = function () {
                    for (var e = 0; e < Qt.length; ) {
                        if (Jt(Qt[e])) return !0;
                        e++;
                    }
                    return !1;
                }),
                (qt.portrait = function () {
                    return screen.orientation && Object.prototype.hasOwnProperty.call(window, "onorientationchange")
                        ? Xt(screen.orientation.type, "portrait")
                        : qt.ios() && Object.prototype.hasOwnProperty.call(window, "orientation")
                        ? 90 !== Math.abs(window.orientation)
                        : window.innerHeight / window.innerWidth > 1;
                }),
                (qt.landscape = function () {
                    return screen.orientation && Object.prototype.hasOwnProperty.call(window, "onorientationchange")
                        ? Xt(screen.orientation.type, "landscape")
                        : qt.ios() && Object.prototype.hasOwnProperty.call(window, "orientation")
                        ? 90 === Math.abs(window.orientation)
                        : window.innerHeight / window.innerWidth < 1;
                }),
                (qt.noConflict = function () {
                    return (window.device = Ht), this;
                }),
                qt.ios()
                    ? qt.ipad()
                        ? ei("ios ipad tablet")
                        : qt.iphone()
                        ? ei("ios iphone mobile")
                        : qt.ipod() && ei("ios ipod mobile")
                    : qt.macos()
                    ? ei("macos desktop")
                    : qt.android()
                    ? qt.androidTablet()
                        ? ei("android tablet")
                        : ei("android mobile")
                    : qt.blackberry()
                    ? qt.blackberryTablet()
                        ? ei("blackberry tablet")
                        : ei("blackberry mobile")
                    : qt.windows()
                    ? qt.windowsTablet()
                        ? ei("windows tablet")
                        : qt.windowsPhone()
                        ? ei("windows mobile")
                        : ei("windows desktop")
                    : qt.fxos()
                    ? qt.fxosTablet()
                        ? ei("fxos tablet")
                        : ei("fxos mobile")
                    : qt.meego()
                    ? ei("meego mobile")
                    : qt.nodeWebkit()
                    ? ei("node-webkit")
                    : qt.television()
                    ? ei("television")
                    : qt.desktop() && ei("desktop"),
                qt.cordova() && ei("cordova"),
                (qt.onChangeOrientation = function (e) {
                    "function" == typeof e && Wt.push(e);
                });
            var si = "resize";
            function oi(e) {
                for (var t = 0; t < e.length; t++) if (qt[e[t]]()) return e[t];
                return "unknown";
            }
            function ri() {
                qt.orientation = oi(["portrait", "landscape"]);
            }
            Object.prototype.hasOwnProperty.call(window, "onorientationchange") && (si = "orientationchange"),
                window.addEventListener ? window.addEventListener(si, ii, !1) : window.attachEvent ? window.attachEvent(si, ii) : (window[si] = ii),
                ii(),
                (qt.type = oi(["mobile", "tablet", "desktop"])),
                (qt.os = oi(["ios", "iphone", "ipad", "ipod", "android", "blackberry", "macos", "windows", "fxos", "meego", "television"])),
                ri();
            const ai = qt;
            let di,
                li = null,
                ci = !1,
                ui = null;
            const pi = new (class {
                    isSmartphone() {
                        return ai.mobile();
                    }
                    isTablet() {
                        return ai.tablet();
                    }
                    isDesktop() {
                        return !this.isSmartphone() && !this.isTablet();
                    }
                    checkBlocking(e = () => {}, t = () => {}) {
                        return new Promise((e) => {
                            if (!ci) {
                                if ("undefined" == typeof BlockAdBlock) return void e(!0);
                                (di = new BlockAdBlock({ checkOnLoad: !1, resetOnEnd: !0, loopCheckTime: 50, loopMaxNumber: 5 })), (ci = !0);
                            }
                            di.onDetected(() => e(!0)), di.onNotDetected(() => e(!1)), di.check(!0);
                        }).then((i) => (i ? e() : t(), i));
                    }
                    getDeviceType() {
                        return this.isTablet() ? "tablet" : this.isSmartphone() ? "smartphone" : "desktop";
                    }
                    getDeviceMode() {
                        return window.matchMedia("(max-width: 840px)").matches ? "mobile" : "desktop";
                    }
                    getOperatingSystem() {
                        if (null !== ui) return ui;
                        const { userAgent: e } = window.navigator;
                        return (
                            (ui = "unknown"),
                            -1 !== e.indexOf("Win") && (ui = "Windows"),
                            -1 !== e.indexOf("Mac") && (ui = "OSX"),
                            -1 !== e.indexOf("Linux") && (ui = "Linux"),
                            -1 !== e.indexOf("Android") && (ui = "Android"),
                            -1 !== e.indexOf("like Mac") && (ui = "iOS"),
                            ui
                        );
                    }
                    getBrowser() {
                        if (null !== li) return li;
                        const { appName: e, appVersion: t, userAgent: i } = window.navigator;
                        let n,
                            s = i.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                        return /trident/i.test(s[1])
                            ? ((n = /\brv[ :]+(\d+)/g.exec(i) || [""]), (li = `IE ${n[1] || ""}`), li)
                            : "Chrome" === s[1] && ((n = i.match(/\b(OPR|Edge)\/(\d+)/)), null !== n)
                            ? ((li = n.slice(1).join(" ").replace("OPR", "Opera")), li)
                            : ((s = s[2] ? [s[1], s[2]] : [e, t, "-?"]), (n = i.match(/version\/(\d+)/i)), null !== n && s.splice(1, 1, n[1]), (li = s.join(" ")), li);
                    }
                    isSteamPlatform() {
                        const { userAgent: e } = window.navigator;
                        return e.toLowerCase().indexOf("steam") > -1;
                    }
                })(),
                hi = $.getDebugGroup() || "",
                gi = hi.split(",");
            "" !== hi && window.console.info("AdEngine debug mode - groups:", "1" === hi ? "all" : gi);
            const mi = Date.now();
            function fi() {
                var e, t;
                return null !== (t = null === (e = window.performance) || void 0 === e ? void 0 : e.timeOrigin) && void 0 !== t ? t : mi;
            }
            function vi() {
                return Date.now() - fi();
            }
            function bi() {
                return (vi() / 1e3).toFixed(4);
            }
            function yi(e, ...t) {
                "" !== hi && (("1" !== hi && -1 === gi.indexOf(e)) || window.console.info(`${bi()}s\t\t [AE] ${e}`, t));
            }
            function _i(e, ...t) {
                "" !== hi && (("1" !== hi && -1 === gi.indexOf(e)) || window.console.warn(`${bi()}s\t\t [AE] ${e}`, t));
            }
            const Si = "universal-storage";
            class Ei {
                constructor() {
                    this.storage = {};
                }
                clear() {
                    this.storage = {};
                }
                getItem(e) {
                    return this.storage[e];
                }
                removeItem(e) {
                    delete this.storage[e];
                }
                setItem(e, t) {
                    this.storage[e] = t;
                }
            }
            class wi {
                constructor(e = () => window.localStorage) {
                    this.fallbackStorage = new Ei();
                    try {
                        (this.provider = e()), this.isAvailable() || (yi(Si, "StorageProvider doesn't work, fallback to the InMemoryProvider"), (this.provider = this.fallbackStorage));
                    } catch (e) {
                        yi(Si, "StorageProvider doesn't work, fallback to the InMemoryProvider"), (this.provider = this.fallbackStorage);
                    }
                }
                isAvailable() {
                    try {
                        return this.provider.setItem("ae3-provider-storage-test", "1"), this.provider.getItem("ae3-provider-storage-test"), this.provider.removeItem("ae3-provider-storage-test"), !0;
                    } catch (e) {
                        return !1;
                    }
                }
                getItem(e, t = !1) {
                    try {
                        let i = this.provider.getItem(e);
                        if (t) return i;
                        try {
                            i = JSON.parse(i);
                        } catch (e) {
                            return i;
                        }
                        return i;
                    } catch (t) {
                        return this.fallbackStorage.getItem(e);
                    }
                }
                setItem(e, t, i) {
                    const n = t instanceof Object ? JSON.stringify(t) : t;
                    try {
                        this.provider.setItem(e, n, i);
                    } catch (t) {
                        yi(Si, `Item ${e} wasn't set in the storage`, t), this.fallbackStorage.setItem(e, n);
                    }
                    return !0;
                }
                removeItem(e) {
                    try {
                        return this.provider.removeItem(e);
                    } catch (t) {
                        this.fallbackStorage.removeItem(e);
                    }
                }
                clear() {
                    try {
                        this.provider.clear();
                    } catch (e) {
                        this.fallbackStorage.clear();
                    }
                }
            }
            class Ai {
                static make() {
                    return Ai.instance || (Ai.instance = new Ai()), Ai.instance;
                }
                constructor() {
                    (this.cookieStorage = new wi(() => new B())),
                        (this.cacheStorage = {}),
                        (this.cacheKey = "basset"),
                        this.initCacheFromCookie(),
                        Gt.on(Bt.AD_ENGINE_INSTANT_CONFIG_CACHE_READY, () => {
                            this.resetCache();
                        });
                }
                resetCache() {
                    this.initCacheFromCookie(), Gt.emit(Bt.AD_ENGINE_INSTANT_CONFIG_CACHE_RESET);
                }
                get(e) {
                    return this.cacheStorage[e];
                }
                set(e) {
                    this.cacheStorage[e.name] = e;
                }
                remove(e) {
                    delete this.cacheStorage[e];
                }
                mapSamplingResults(e = []) {
                    if (!e || !e.length) return [];
                    const t = this.getSamplingResults();
                    return e
                        .map((e) => e.split(":"))
                        .filter(([e]) => t.includes(e))
                        .map(([, e]) => e);
                }
                getSamplingResults() {
                    return Object.keys(this.cacheStorage).map((e) => this.getResultLog(e));
                }
                getResultLog(e) {
                    const t = this.cacheStorage[e];
                    return `${this.removeIndexSuffix(t.name)}_${t.group}_${t.limit}`;
                }
                removeIndexSuffix(e) {
                    const t = e.lastIndexOf("-");
                    return -1 !== t ? e.substring(0, t) : e;
                }
                initCacheFromCookie() {
                    const e = this.cookieStorage.getItem(this.cacheKey) || "";
                    var t;
                    (this.cacheStorage =
                        "" === (t = e) || "string" != typeof t
                            ? {}
                            : t.split("|").reduce(
                                  (e, t) =>
                                      Object.assign(
                                          Object.assign({}, e),
                                          (function (e) {
                                              const [t, i] = e.split(":"),
                                                  n = "true" === i,
                                                  [s, o, r] = t.split("_");
                                              return { [s]: { name: s, group: o, limit: parseFloat(r) || void 0, result: n, withCookie: !0 } };
                                          })(t)
                                      ),
                                  {}
                              )),
                        yi("instant-config-service", "initialized cache storage", this.cacheStorage);
                }
            }
            const Ti = "-cached",
                Ii = Math.pow(10, 6),
                Ci = {
                    isProperContinent: function (e = [], t) {
                        return !(
                            !e ||
                            !e.indexOf ||
                            (!(function (e, t) {
                                return e.indexOf("XX") > -1 || Oi(e, "XX", t);
                            })(e, t) &&
                                !(function (e = [], t) {
                                    const i = `XX-${Ci.getContinentCode()}`;
                                    return e.indexOf(i) > -1 || Oi(e, i, t);
                                })(e, t))
                        );
                    },
                    isProperCountry: function (e = [], t) {
                        return !!(e && e.indexOf && (e.indexOf(Ci.getCountryCode()) > -1 || Oi(e, Ci.getCountryCode(), t)));
                    },
                    isProperRegion: function (e = [], t) {
                        const i = `${Ci.getCountryCode()}-${Ci.getRegionCode()}`;
                        return !!(e && e.indexOf && (e.indexOf(i) > -1 || Oi(e, i, t)));
                    },
                    getContinentCode: function () {
                        return Y.get("geo.continent");
                    },
                    getCountryCode: function () {
                        return Y.get("geo.country");
                    },
                    getRegionCode: function () {
                        return Y.get("geo.region");
                    },
                    isProperGeo: function (e = [], t) {
                        const i = Ai.make();
                        return void 0 !== t && void 0 !== i.get(t)
                            ? i.get(t).result
                            : !(
                                  !e ||
                                  !e.indexOf ||
                                  (function (e = []) {
                                      return !!(e.indexOf(`non-${Ci.getCountryCode()}`) > -1 || e.indexOf(`non-${Ci.getCountryCode()}-${Ci.getRegionCode()}`) > -1 || e.indexOf(`non-XX-${Ci.getContinentCode()}`) > -1);
                                  })(e) ||
                                  !(Ci.isProperContinent(e, t) || Ci.isProperCountry(e, t) || Ci.isProperRegion(e, t))
                              );
                    },
                };
            function Ni(e) {
                let [, t] = e.split("/");
                return (t = t.replace(Ti, "")), Math.round(parseFloat(t) * Ii) || 0;
            }
            function Oi(e, t, i) {
                const n = e.filter(
                        (function (e) {
                            return (t) => 0 !== t.indexOf("non-") && t.indexOf(e + "/") > -1;
                        })(t)
                    ),
                    s = (function (e) {
                        return e.some((e) => -1 !== e.indexOf(Ti));
                    })(e);
                return (
                    0 !== n.length &&
                    (function (e, t, i) {
                        const n = Math.round(Math.random() * (100 * Ii)) || 0,
                            s = e.some((e) => n < e);
                        return (
                            t &&
                                (function (e, t, i, n) {
                                    const s = Ai.make(),
                                        [o] = i,
                                        r = { name: e, result: t, withCookie: n, group: t ? "B" : "A", limit: (t ? o : 100 * Ii - o) / Ii };
                                    s.set(r);
                                })(t, s, e, i),
                            s
                        );
                    })(n.map(Ni), i, s)
                );
            }
            class Pi {
                constructor(e) {
                    this.params = e;
                }
                init(e = {}) {
                    return p(this, void 0, void 0, function* () {
                        const t = new Ft.InstantConfigLoader(this.params),
                            i = new Ft.InstantConfigInterpreter(new Ft.BrowserMatcher(pi.getBrowser()), new Ft.DeviceMatcher(pi.getDeviceType()), new Ft.DomainMatcher(), new Ft.RegionMatcher(), Ai.make());
                        return (
                            (this.interpreter = yield t
                                .getConfig()
                                .then((e) => new Ft.InstantConfigOverrider().override(U.getURLSearchParams(), e))
                                .then((t) => i.init(t, e, Ci.isProperGeo))),
                            (this.repository = this.interpreter.getValues()),
                            yi("instant-config-service", "instantiated with", this.repository),
                            Gt.on(
                                Bt.AD_ENGINE_INSTANT_CONFIG_CACHE_RESET,
                                () => {
                                    this.repository = this.interpreter.getValues();
                                },
                                !1
                            ),
                            this
                        );
                    });
                }
                get(e, t) {
                    try {
                        return e in this.repository && void 0 !== this.repository[e] ? this.repository[e] : t;
                    } catch (e) {
                        return t;
                    }
                }
            }
            var Di;
            const Li = te("[AdEngine] set InstantConfig", { _as: "props", _p: void 0 });
            let ki = class {
                constructor(e) {
                    this.container = e;
                }
                execute() {
                    return p(this, void 0, void 0, function* () {
                        const { app: e, env: t, platform: i } = window.ads.context,
                            n = null != i ? i : e,
                            s = "dev" === t ? "https://services.fandom-dev.pl" : "https://services.fandom.com",
                            o = `https://script.wikia.nocookie.net/fandom-ae-assets/icbm/${null != t ? t : "prod"}/icbm_state_${n}.json`,
                            r = yield new Pi({ appName: n, instantConfigEndpoint: s, instantConfigFallbackEndpoint: o, instantConfigVariant: Y.get("wiki.services_instantConfig_variant") }).init();
                        Y.set("services.instantConfig.appName", n), this.container.bind(Pi).value(r), this.container.bind(Ai).value(Ai.make()), Gt.dispatch(Li({ instantConfig: r }));
                    });
                }
            };
            ki = l([N(), u("design:paramtypes", ["function" == typeof (Di = void 0 !== x && x) ? Di : Object])], ki);
            class Ri {
                createScript(e, t = !0, i = null, n = {}, s = {}) {
                    const o = document.createElement("script");
                    if (
                        ((o.async = t),
                        (o.defer = !t),
                        (o.src = e),
                        Object.keys(n).forEach((e) => {
                            o.setAttribute(e, n[e]);
                        }),
                        Object.keys(s).forEach((e) => {
                            o.dataset[e] = s[e];
                        }),
                        "string" == typeof i)
                    ) {
                        const e = document.getElementsByTagName("script")[0];
                        e.parentNode.insertBefore(o, e);
                    } else (i || document.body).appendChild(o);
                    return o;
                }
                loadScript(e, t = !0, i = null, n = {}, s = {}) {
                    return new Promise((o, r) => {
                        const a = this.createScript(e, t, i, n, s);
                        (a.onload = o), (a.onerror = r);
                    });
                }
                loadAsset(e, t = "json") {
                    const i = new XMLHttpRequest();
                    return (
                        i.open("GET", e, !0),
                        (i.responseType = t),
                        new Promise((e) => {
                            i.addEventListener("timeout", () => {
                                e(null);
                            }),
                                i.addEventListener("error", () => {
                                    e(null);
                                }),
                                (i.onreadystatechange = function () {
                                    this.readyState === this.DONE && (200 === this.status ? e(this.response) : e(null));
                                }),
                                i.send();
                        })
                    );
                }
                loadSync(e) {
                    try {
                        const t = new XMLHttpRequest();
                        return t.open("GET", e, !1), t.send(null), 200 === t.status && 0 !== t.responseText.length && t.responseText;
                    } catch (e) {
                        return !1;
                    }
                }
            }
            const xi = new Ri();
            (window.pbjs = window.pbjs || {}), (window.pbjs.que = window.pbjs.que || []);
            const Ui = new (class {
                init() {
                    if (!this.instancePromise) {
                        const e = Y.get("bidders.prebid.libraryUrl");
                        xi.loadScript(e, !0, "first"),
                            (this.instancePromise = new Promise((e) =>
                                window.pbjs.que.push(() => {
                                    yi("pbjs-factory", "Prebid library loaded"), e(window.pbjs);
                                })
                            ));
                    }
                    return this.instancePromise;
                }
            })();
            class Vi {
                constructor(e, t = 100, i = 0, n = 0) {
                    (this.condition = e), (this.noTries = t), (this.growingTimeout = i), (this.fixedTimeout = n);
                }
                until() {
                    return p(this, void 0, void 0, function* () {
                        let e = 0,
                            t = this.growingTimeout || this.fixedTimeout,
                            i = this.condition();
                        for (; !i && e < this.noTries; ) yield this.delay(t), (i = this.condition()), this.growingTimeout && (t *= 2), e++;
                        return Promise.resolve(i);
                    });
                }
                delay(e) {
                    return new Promise((t) => {
                        this.timeoutId = setTimeout(t, e);
                    });
                }
                reset() {
                    this.timeoutId && window.clearTimeout(this.timeoutId);
                }
            }
            var Mi;
            !(function (e) {
                (e.CUSTOM_EVENT = "customEvent"),
                    (e.SLOT_ADDED_EVENT = "slotAdded"),
                    (e.SLOT_REQUESTED_EVENT = "slotRequested"),
                    (e.SLOT_LOADED_EVENT = "slotLoaded"),
                    (e.SLOT_VIEWED_EVENT = "slotViewed"),
                    (e.SLOT_RENDERED_EVENT = "slotRendered"),
                    (e.SLOT_VISIBILITY_CHANGED = "slotVisibilityChanged"),
                    (e.SLOT_BACK_TO_VIEWPORT = "slotBackToViewport"),
                    (e.SLOT_LEFT_VIEWPORT = "slotLeftViewport"),
                    (e.SLOT_STATUS_CHANGED = "slotStatusChanged"),
                    (e.DESTROYED_EVENT = "slotDestroyed"),
                    (e.DESTROY_EVENT = "slotDestroy"),
                    (e.HIDDEN_EVENT = "slotHidden"),
                    (e.SHOWED_EVENT = "slotShowed"),
                    (e.VIDEO_VIEWED_EVENT = "videoViewed"),
                    (e.VIDEO_AD_REQUESTED = "videoAdRequested"),
                    (e.VIDEO_AD_ERROR = "videoAdError"),
                    (e.VIDEO_AD_IMPRESSION = "videoAdImpression"),
                    (e.VIDEO_AD_USED = "videoAdUsed"),
                    (e.TEMPLATES_LOADED = "Templates Loaded");
            })(Mi || (Mi = {}));
            const ji = new (class {
                constructor() {
                    (this.adTargeting = {}), (this.onChangeCallbacks = []), (this.pageTargetingGroupName = "PAGE_TARGETING"), $.isDebugMode() && (window.ads.adTargeting = this.adTargeting);
                }
                clear(e = null) {
                    const t = e || this.pageTargetingGroupName;
                    this.adTargeting[t] = {};
                }
                extend(e, t = null) {
                    const i = t || this.pageTargetingGroupName;
                    (this.adTargeting[i] = this.adTargeting[i] || {}), (this.adTargeting[i] = Object.assign(this.adTargeting[i], e));
                }
                dump(e = null) {
                    const t = e || this.pageTargetingGroupName;
                    return (this.adTargeting[t] = this.adTargeting[t] || {}), this.adTargeting[t];
                }
                get(e, t = null) {
                    const i = t || this.pageTargetingGroupName;
                    if (this.adTargeting[i]) return this.adTargeting[i][e];
                }
                set(e, t, i = null) {
                    if (void 0 !== t) {
                        const n = i || this.pageTargetingGroupName;
                        (this.adTargeting[n] = this.adTargeting[n] || {}), (this.adTargeting[n][e] = t), n === this.pageTargetingGroupName && this.triggerOnChange(e, t);
                    }
                }
                remove(e, t = null) {
                    const i = t || this.pageTargetingGroupName;
                    this.adTargeting[i] && this.adTargeting[i][e] && (delete this.adTargeting[i][e], i === this.pageTargetingGroupName && this.triggerOnChange(e, null));
                }
                onChange(e) {
                    (this.onChangeCallbacks = this.onChangeCallbacks || []), this.onChangeCallbacks.push(e);
                }
                removeListeners() {
                    this.onChangeCallbacks = [];
                }
                triggerOnChange(e, t) {
                    this.onChangeCallbacks.forEach((i) => {
                        i(e, t);
                    });
                }
            })();
            function Bi() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
                    const t = (16 * Math.random()) | 0;
                    return ("x" === e ? t : (3 & t) | 8).toString(16);
                });
            }
            function zi(e) {
                return "IFRAME" === e.tagName;
            }
            function Gi() {
                try {
                    return window.self !== window.top;
                } catch (e) {
                    return !0;
                }
            }
            class Fi {
                static getFirstElementChild(e) {
                    return e.firstElementChild;
                }
            }
            const $i = "message-bus",
                Hi = new (class {
                    constructor(e = window) {
                        (this.source = e), (this.isInitialized = !1), (this.callbacks = []);
                    }
                    init() {
                        this.isInitialized || (yi($i, "Register message listener"), this.source.addEventListener("message", (e) => this.onMessage(e), !1), (this.isInitialized = !0));
                    }
                    register(e, t) {
                        this.init(), this.callbacks.push({ match: e, fn: t });
                    }
                    onMessage(e) {
                        let t,
                            i = 0;
                        if (this.isAdEngineMessage(e))
                            for (yi($i, "Message received", e), i = 0; i < this.callbacks.length; i += 1)
                                if (((t = this.callbacks[i]), this.messageMatch(t.match, e))) return yi($i, "Matching message", e, t), t.fn(this.getDataFromMessage(e).AdEngine), void (t.match.infinite || this.callbacks.splice(i, 1));
                    }
                    isAdEngineMessage(e) {
                        const t = this.getDataFromMessage(e);
                        return !!t && !!t.AdEngine;
                    }
                    messageMatch(e, t) {
                        let i = !0;
                        if (e.origin && !e.origin.includes(t.origin)) return !1;
                        if (e.keys) {
                            const n = this.getDataFromMessage(t).AdEngine;
                            e.keys.forEach((e) => {
                                i = i && n[e];
                            });
                        }
                        return i;
                    }
                    getDataFromMessage(e) {
                        if ("string" == typeof e.data)
                            try {
                                return JSON.parse(e.data);
                            } catch (e) {
                                return;
                            }
                        return e.data;
                    }
                })(),
                qi = "slot-tweaker";
            class Wi {
                forceRepaint(e) {
                    return e.offsetWidth;
                }
                addDefaultClasses(e) {
                    const t = e.getElement(),
                        i = e.getConfigProperty("defaultClasses") || [];
                    t && i.length && i.forEach((e) => t.classList.add(e));
                }
                collapse(e) {
                    const t = e.getElement();
                    (t.style.maxHeight = `${t.scrollHeight}px`), this.forceRepaint(t), t.classList.add("slot-animation"), (t.style.maxHeight = "0");
                }
                expand(e) {
                    const t = e.getElement();
                    (t.style.maxHeight = `${t.offsetHeight}px`), t.classList.remove(kn.HIDDEN_AD_CLASS), t.classList.add("slot-animation"), (t.style.maxHeight = `${t.scrollHeight}px`);
                }
                makeResponsive(e, t = null, i = !0) {
                    return p(this, void 0, void 0, function* () {
                        e.addClass("slot-responsive"), yi(qi, "make responsive", e.getSlotName());
                        const n = yield this.onReady(e);
                        return this.setPaddingBottom(n, t, i), n;
                    });
                }
                setPaddingBottom(e, t, i = !0) {
                    let n,
                        s = t;
                    if (zi(e)) {
                        if (!t) {
                            const t = e.contentWindow.document.body.scrollHeight;
                            s = e.contentWindow.document.body.scrollWidth / t;
                        }
                        n = e.parentElement;
                    } else n = e;
                    i && (n.style.paddingBottom = 100 / s + "%");
                }
                onReady(e) {
                    function t() {
                        const t = e.getIframe();
                        if (!t) throw new Error("Cannot find iframe element");
                        return t;
                    }
                    return e.getConfigProperty("useGptOnloadEvent")
                        ? e.loaded.then(t)
                        : new Promise((i) => {
                              const n = t();
                              let s = null;
                              try {
                                  s = n.contentWindow.document;
                              } catch (t) {
                                  yi(qi, e.getSlotName(), "loaded through SafeFrame");
                              }
                              s && "complete" === s.readyState ? i(n) : n.addEventListener("load", () => i(n));
                          });
                }
                adjustIframeByContentSize(e) {
                    return p(this, void 0, void 0, function* () {
                        const t = yield this.onReady(e);
                        if (zi(t)) {
                            const i = t.contentWindow.document.body.scrollHeight,
                                n = t.contentWindow.document.body.scrollWidth;
                            (t.width = n.toString()), (t.height = i.toString()), yi(qi, "adjust size", e.getSlotName(), n, i);
                        }
                        return t;
                    });
                }
                registerMessageListener(e) {
                    Hi.register({ keys: ["action", "slotName"], infinite: !0 }, (t) => {
                        if (!t.slotName) return void yi(qi, "Missing slot name");
                        const i = e(t.slotName);
                        switch (t.action) {
                            case "expand":
                                this.expand(i);
                                break;
                            case "collapse":
                                this.collapse(i);
                                break;
                            case kn.HIDDEN_AD_CLASS:
                                i.hide();
                                break;
                            case "show":
                                i.show();
                                break;
                            case "make-responsive":
                                this.makeResponsive(i, t.aspectRatio);
                                break;
                            default:
                                yi(qi, "Unknown action", t.action);
                        }
                    });
                }
                setDataParam(e, t, i) {
                    const n = e.getElement();
                    n && (n.dataset[t] = "string" == typeof i ? i : JSON.stringify(i));
                }
            }
            Wi.SLOT_CLOSE_IMMEDIATELY = "force-close";
            const Ki = new Wi();
            var Yi;
            !(function (e) {
                (e.STATUS_BLOCKED = "blocked"),
                    (e.STATUS_COLLAPSE = "collapse"),
                    (e.STATUS_DISABLED = "disabled"),
                    (e.STATUS_FORCED_COLLAPSE = "forced_collapse"),
                    (e.STATUS_FORCED_SUCCESS = "forced_success"),
                    (e.STATUS_SKIP_TEMPLATE = "skip_template"),
                    (e.STATUS_MANUAL = "manual"),
                    (e.STATUS_REQUESTED = "requested"),
                    (e.STATUS_ERROR = "error"),
                    (e.STATUS_SUCCESS = "success"),
                    (e.STATUS_CLICKED = "clicked"),
                    (e.STATUS_VIEWPORT_CONFLICT = "viewport-conflict"),
                    (e.STATUS_HIVI_COLLAPSE = "hivi-collapse"),
                    (e.STATUS_HEAVY_AD_INTERVENTION = "heavy-ad-intervention"),
                    (e.STATUS_UNKNOWN_INTERVENTION = "unknown-intervention");
            })(Yi || (Yi = {}));
            const Qi = "true" === U.get("tracking-opt-in-status"),
                Xi = "true" === U.get("opt-out-sale-status"),
                Ji = function (e) {
                    return Qi || !!(null != e ? e : Y.get("options.trackingOptIn"));
                },
                Zi = function (e) {
                    return !!Y.get("options.isSubjectToCcpa") || Xi || !!(null != e ? e : Y.get("options.optOutSale"));
                };
            function en(e, t) {
                if ("function" != typeof t) throw new Error("LazyQueue used with callback not being a function");
                if (!(e instanceof Array)) throw new Error("LazyQueue requires an array as the first parameter");
                e.start = () => {
                    for (; e.length > 0; ) t(e.shift());
                    e.push = (e) => {
                        t(e);
                    };
                };
            }
            class tn {
                get length() {
                    return this.items.length;
                }
                constructor(...e) {
                    (this.itemFlushCallbacks = []), (this.items = []), (this.items = [...e]), this.setPreFlushPush();
                }
                flush() {
                    for (; this.items.length > 0; ) this.emit(this.items.shift());
                    this.setPostFlushPush();
                }
                push(...e) {
                    this.pushCommand(...e);
                }
                onItemFlush(e) {
                    if ("function" != typeof e) throw new Error("onItemFlush used with callback not being a function");
                    this.itemFlushCallbacks.push(e);
                }
                setPreFlushPush() {
                    this.pushCommand = (...e) => {
                        this.items.push(...e);
                    };
                }
                setPostFlushPush() {
                    this.pushCommand = (...e) => {
                        e.forEach((e) => {
                            this.emit(e);
                        });
                    };
                }
                emit(e) {
                    this.itemFlushCallbacks.forEach((t) => {
                        t(e);
                    });
                }
            }
            const nn = "btf-blocker",
                sn = new (class {
                    constructor() {
                        (this.firstCallEnded = !1), (this.unblockedSlotNames = []), this.resetState();
                    }
                    resetState() {
                        (this.firstCallEnded = !1),
                            (this.unblockedSlotNames = []),
                            (this.slotsQueue = new tn()),
                            this.slotsQueue.onItemFlush(({ adSlot: e, fillInCallback: t }) => {
                                yi(nn, e.getSlotName(), "Filling delayed second call slot"), this.disableAdSlotIfHasConflict(e), this.fillInSlotIfEnabled(e, t);
                            }),
                            window.ads && window.ads.runtime && ((window.ads.runtime.disableBtf = !1), (window.ads.runtime.disableSecondCall = !1));
                    }
                    init() {
                        Gt.onSlotEvent(Mi.SLOT_RENDERED_EVENT, ({ slot: e }) => {
                            yi(nn, e.getSlotName(), "Slot rendered"), !this.firstCallEnded && e.isFirstCall() && this.finishFirstCall();
                        }),
                            0 === $n.getFirstCallSlotNames().filter((e) => $n.getEnabledSlotNames().includes(e)).length && this.finishFirstCall();
                    }
                    finishFirstCall() {
                        (this.firstCallEnded = !0),
                            yi(nn, "first call queue finished"),
                            window.ads.runtime.disableSecondCall ? this.disableSecondCall([]) : window.ads.runtime.disableBtf && this.disableSecondCall([...this.unblockedSlotNames]),
                            Gt.on(Bt.AD_ENGINE_UAP_LOAD_STATUS, () => {
                                this.slotsQueue.flush();
                            });
                    }
                    disableSecondCall(e) {
                        const t = Y.get("slots") || {};
                        yi(nn, "second call queue disabled"),
                            Object.keys(t).forEach((i) => {
                                t[i].firstCall || -1 !== e.indexOf(i) || $n.disable(i, Yi.STATUS_BLOCKED);
                            });
                    }
                    push(e, t) {
                        if (!this.firstCallEnded && !e.isFirstCall()) return this.slotsQueue.push({ adSlot: e, fillInCallback: t }), void yi(nn, e.getSlotName(), "second call slot pushed to queue");
                        this.disableAdSlotIfHasConflict(e), this.fillInSlotIfEnabled(e, t);
                    }
                    disableAdSlotIfHasConflict(e) {
                        $n.hasViewportConflict(e) && $n.disable(e.getSlotName(), Yi.STATUS_VIEWPORT_CONFLICT);
                    }
                    fillInSlotIfEnabled(e, t) {
                        e.isEnabled() ? (yi(nn, e.getSlotName(), "Filling in slot"), t(e)) : yi(nn, e.getSlotName(), "Slot blocked", e.getStatus());
                    }
                    unblock(e) {
                        yi(nn, e, "Unblocking slot"), this.unblockedSlotNames.push(e), $n.enable(e);
                    }
                })(),
                on = new (class {
                    updateOnCreate(e) {
                        Ki.setDataParam(e, "gptPageParams", ji.dump()), Ki.setDataParam(e, "gptSlotParams", e.getTargeting());
                    }
                    updateOnRenderEnd(e) {
                        !(function (e) {
                            const t = "top_leaderboard" == e.getSlotName(),
                                i = void 0 !== window.smTracking && "function" == typeof window.smTracking.recordRenderedAd;
                            t && i && window.smTracking.recordRenderedAd(e), delete window.smTracking;
                        })(e),
                            Ki.setDataParam(e, "gptAdvertiserId", e.advertiserId),
                            Ki.setDataParam(e, "gptOrderId", e.orderId),
                            Ki.setDataParam(e, "gptCreativeId", e.creativeId),
                            Ki.setDataParam(e, "gptLineItemId", e.lineItemId),
                            Ki.setDataParam(e, "gptCreativeSize", e.creativeSize);
                    }
                })(),
                rn = (e = 0) =>
                    new Promise((t, i) => {
                        "number" == typeof e ? setTimeout(t, e) : i(new Error("Delay value must be a number."));
                    });
            function an(e, ...t) {
                return new Promise((i, n) => {
                    "function" == typeof e ? setTimeout(() => i(e(...t)), 0) : n(new Error("Expected a function."));
                });
            }
            function dn(e, t, i = {}) {
                const n = "object" == typeof e && "function" == typeof e.addEventListener,
                    s = "boolean" == typeof i ? { capture: i } : Object.assign({}, i);
                return new Promise((i, o) => {
                    n ? e.addEventListener(t, i, Object.assign(Object.assign({}, s), { once: !0 })) : o(new Error("Emitter does not have `addEventListener` nor `once` method."));
                });
            }
            function ln(e) {
                return new Promise((t, i) => {
                    setTimeout(i, e);
                });
            }
            function cn(e, t = 2e3) {
                return Promise.race([new Promise(e), ln(t)]);
            }
            function un() {
                let e, t;
                const i = new Promise((i, n) => {
                    (e = i), (t = n);
                });
                return (i.resolve = e), (i.reject = t), i;
            }
            var pn;
            !(function (e) {
                (e.site = "site"), (e.page = "page"), (e.tracking = "tracking"), (e.targeting = "targeting"), (e.partners = "partners");
            })(pn || (pn = {}));
            const hn = new (class {
                constructor() {
                    (this.logGroup = "GlobalContextService"), window.fandomContext || this.createEmptyContext();
                }
                createEmptyContext() {
                    yi(this.logGroup, "Creating empty fandomContext"), (window.fandomContext = { site: {}, page: {}, tracking: {}, partners: {}, targeting: {} });
                }
                isObject(e) {
                    return "object" == typeof e && !Array.isArray(e);
                }
                merge(e, t) {
                    const i = (i) => this.isObject(t[i]) && Object.prototype.hasOwnProperty.call(e, i) && this.isObject(e[i]),
                        n = Object.getOwnPropertyNames(t)
                            .map((n) => ({ [n]: i(n) ? this.merge(e[n], t[n]) : t[n] }))
                            .reduce((e, t) => Object.assign(Object.assign({}, e), t), {});
                    return Object.assign(Object.assign({}, e), n);
                }
                setValue(e, t) {
                    window.fandomContext || this.createEmptyContext(), window.fandomContext[e] || (window.fandomContext[e] = {}), (window.fandomContext[e] = this.merge(window.fandomContext[e], t));
                }
                getValue(e, t) {
                    if (!window.fandomContext) return;
                    const i = window.fandomContext[e];
                    if (i) return i[t];
                    yi(this.logGroup, "Attempting to retrieve invalid category in context!");
                }
                hasBundle(e) {
                    var t, i, n, s;
                    return null === (s = null === (n = null === (i = null === (t = window.fandomContext) || void 0 === t ? void 0 : t.site) || void 0 === i ? void 0 : i.tags) || void 0 === n ? void 0 : n.bundles) || void 0 === s
                        ? void 0
                        : s.includes(e);
                }
            })();
            function gn() {
                return hn.getValue(pn.partners, "directedAtChildren");
            }
            function mn(e) {
                return function (t, i, n) {
                    const s = n.value;
                    return (n.value = e.call(this, s)), n;
                };
            }
            const fn = "gpt-size-map";
            class vn {
                constructor(e = []) {
                    (this.sizeMap = e), yi(fn, this.sizeMap, "creating new size map");
                }
                addSize(e, t) {
                    yi(fn, e, t, "adding new size mapping"), this.sizeMap.push({ viewportSize: e, sizes: t });
                }
                build() {
                    yi(fn, this.sizeMap, "creating GPT size mapping builder");
                    const e = window.googletag && window.googletag.sizeMapping();
                    return e
                        ? (this.sizeMap.forEach(({ viewportSize: t, sizes: i }) => {
                              e.addSize(t, i);
                          }),
                          e.build())
                        : (yi(fn, "cannot create GPT size mapping builder"), null);
                }
                isEmpty() {
                    return !this.sizeMap.length;
                }
                mapAllSizes(e) {
                    return new vn(
                        this.sizeMap.map(({ viewportSize: t, sizes: i }, n) => {
                            const s = e(i, t, n);
                            return yi(fn, t, i, s, "mapping viewport sizes"), { viewportSize: t, sizes: s };
                        })
                    );
                }
                toString() {
                    yi(fn, this.sizeMap, "casting to string");
                    const e = {};
                    return (
                        this.sizeMap.forEach(({ viewportSize: t, sizes: i }) => {
                            e[t.join("x")] = i;
                        }),
                        JSON.stringify(e)
                    );
                }
            }
            function bn(e, t) {
                const i = window.googletag.pubads();
                null == t ? i.clearTargeting(e) : "function" == typeof t ? i.setTargeting(e, t()) : i.setTargeting(e, t);
            }
            var yn;
            const _n = "gpt-provider",
                Sn = "AdX",
                En = ["https://tpc.googlesyndication.com", "https://googleads.g.doubleclick.net"],
                wn = [0, 0];
            function An(e) {
                return function (...t) {
                    setTimeout(() => ((window.googletag = window.googletag || {}), (window.googletag.cmd = window.googletag.cmd || []), window.googletag.cmd.push(() => e.apply(this, t))));
                };
            }
            let Tn = [],
                In = !1;
            function Cn(e) {
                const t = e.slot.getSlotElementId();
                return $n.get(t);
            }
            class Nn {
                constructor() {
                    (window.googletag = window.googletag || {}), (window.googletag.cmd = window.googletag.cmd || []), this.init();
                }
                isInitialized() {
                    return In;
                }
                init() {
                    this.isInitialized() ||
                        ((function () {
                            const e = ji.dump() || {};
                            Object.keys(e).forEach((t) => {
                                bn(t, e[t]);
                            });
                        })(),
                        ji.onChange((e, t) => {
                            null === e
                                ? Object.keys(t).forEach((e) => {
                                      bn(e, t[e]);
                                  })
                                : bn(e, t);
                        }),
                        (function () {
                            const e = window.googletag.pubads();
                            e.disableInitialLoad(),
                                e.addEventListener("slotRequested", (e) => {
                                    const t = Cn(e);
                                    t.setStatus(Yi.STATUS_REQUESTED), t.emit(Mi.SLOT_REQUESTED_EVENT);
                                }),
                                e.addEventListener("slotOnload", (e) => {
                                    Cn(e).emit(Mi.SLOT_LOADED_EVENT);
                                }),
                                e.addEventListener("slotRenderEnded", (e) => {
                                    an(() => {
                                        const t = Cn(e),
                                            i = (function (e, t) {
                                                let i = !1;
                                                if (e.isEmpty) return Yi.STATUS_COLLAPSE;
                                                try {
                                                    i = !!t.contentWindow.document.querySelector;
                                                } catch (e) {
                                                    yi(_n, "getAdType", "iframe is not accessible");
                                                }
                                                return i && t.contentWindow.AdEngine_adType ? t.contentWindow.AdEngine_adType : Yi.STATUS_SUCCESS;
                                            })(e, t.getIframe());
                                        return (
                                            (function (e) {
                                                const t = Y.get("templates.sizeOverwritingMap"),
                                                    i = e.getIframe();
                                                if (!t || !i) return;
                                                const n = `${i.width}x${i.height}`;
                                                t[n] && ((i.width = t[n].originalSize[0].toString()), (i.height = t[n].originalSize[1].toString()));
                                            })(t),
                                            t.emit(Mi.SLOT_RENDERED_EVENT, { event: e, adType: i }, !1)
                                        );
                                    });
                                }),
                                e.addEventListener("impressionViewable", (e) => {
                                    Cn(e).emit(Mi.SLOT_VIEWED_EVENT);
                                }),
                                e.addEventListener("slotVisibilityChanged", function (e) {
                                    const t = Cn(e);
                                    return (
                                        null == t || t.emit(Mi.SLOT_VISIBILITY_CHANGED, e),
                                        e.inViewPercentage > 50 ? (null == t ? void 0 : t.emit(Mi.SLOT_BACK_TO_VIEWPORT, e)) : e.inViewPercentage < 50 ? (null == t ? void 0 : t.emit(Mi.SLOT_LEFT_VIEWPORT, e)) : void 0
                                    );
                                }),
                                window.googletag.enableServices();
                        })(),
                        this.setupRestrictDataProcessing(),
                        this.setPPID(),
                        Gt.on(Bt.PLATFORM_BEFORE_PAGE_CHANGE, () => this.updateCorrelator(), !1),
                        Gt.onSlotEvent(Mi.DESTROY_EVENT, ({ slot: e }) => {
                            this.destroySlot(e.getSlotName()), e.emit(Mi.DESTROYED_EVENT);
                        }),
                        (In = !0));
                }
                setupRestrictDataProcessing() {
                    const e = window.googletag.pubads(),
                        t = { restrictDataProcessing: Zi() };
                    gn() && (t.childDirectedTreatment = !0), e.setPrivacySettings(t);
                }
                setPPID() {
                    const e = ji.get("intent_iq_ppid", "intent_iq");
                    e || null === ji.get("intent_iq_ppid", "intent_iq") || Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: "intentiq_ppid_not_set_on_time" });
                    const t = Y.get("services.intentIq.ppid.enabled") ? e : ji.get("ppid");
                    t && window.googletag.pubads().setPublisherProvidedId(t);
                }
                fillIn(e) {
                    const t = es() || [];
                    sn.push(e, (...e) => {
                        this.fillInCallback(...e);
                    }),
                        0 === t.length && this.flush();
                }
                fillInCallback(e) {
                    const t = e.getSlotName(),
                        i = e.getTargeting(),
                        n = new vn(e.getSizes()),
                        s = this.createGptSlot(e, n);
                    s.addService(window.googletag.pubads()).setCollapseEmptyDiv(!0),
                        this.applyTargetingParams(s, i),
                        on.updateOnCreate(e),
                        e.updateWinningPbBidderDetails(),
                        window.googletag.display(t),
                        Tn.push(s),
                        e.isFirstCall() || this.flush(),
                        yi(_n, t, "slot added");
                }
                createGptSlot(e, t) {
                    return e.isOutOfPage()
                        ? e.getConfigProperty("outOfPageFormat")
                            ? window.googletag.defineOutOfPageSlot(e.getAdUnit(), window.googletag.enums.OutOfPageFormat[e.getConfigProperty("outOfPageFormat")])
                            : window.googletag.defineOutOfPageSlot(e.getAdUnit(), e.getSlotName())
                        : window.googletag.defineSlot(e.getAdUnit(), e.getDefaultSizes(), e.getSlotName()).defineSizeMapping(t.build());
                }
                applyTargetingParams(e, t) {
                    !(function (e) {
                        const t = (e.pos.constructor == Array && "top_leaderboard" == e.pos[0]) || "top_leaderboard" == e.pos,
                            i = void 0 !== window.smTracking && window.smTracking.recordRequestTargeting;
                        t && i && window.smTracking.recordRequestTargeting(e);
                    })(t),
                        Object.keys(t).forEach((i) => {
                            let n = t[i];
                            (n = Array.isArray(n) ? n.map((e) => e.toString()) : n.toString()), e.setTargeting(i, n);
                        });
                }
                updateCorrelator() {
                    window.googletag.pubads().updateCorrelator();
                }
                flush() {
                    Tn.length && (window.googletag.pubads().refresh(Tn, { changeCorrelator: !1 }), (Tn = []));
                }
                destroySlot(e) {
                    const t = window.googletag
                        .pubads()
                        .getSlots()
                        .find((t) => e === t.getSlotElementId());
                    return t ? (this.destroyGptSlot(t), !0) : (yi(_n, "destroySlot", "slot doesn't return element id", e), !1);
                }
                destroyGptSlot(e) {
                    yi(_n, "destroySlot", e), window.googletag.destroySlots([e]) || yi(_n, "destroySlot", e, "failed");
                }
                static refreshSlot(e) {
                    const t = window.googletag
                        .pubads()
                        .getSlots()
                        .find((t) => t.getSlotElementId() === e.getSlotName());
                    t.clearTargeting();
                    const i = window.googletag.sizeMapping().addSize(wn, e.getCreativeSizeAsArray()).build();
                    t.defineSizeMapping(i), window.googletag.pubads().refresh([t]);
                }
            }
            function On(e, t, i) {
                var n = be(e) || t || i ? { next: e, error: t, complete: i } : e;
                return n
                    ? Je(function (e, t) {
                          var i;
                          null === (i = n.subscribe) || void 0 === i || i.call(n);
                          var s = !0;
                          e.subscribe(
                              Ze(
                                  t,
                                  function (e) {
                                      var i;
                                      null === (i = n.next) || void 0 === i || i.call(n, e), t.next(e);
                                  },
                                  function () {
                                      var e;
                                      (s = !1), null === (e = n.complete) || void 0 === e || e.call(n), t.complete();
                                  },
                                  function (e) {
                                      var i;
                                      (s = !1), null === (i = n.error) || void 0 === i || i.call(n, e), t.error(e);
                                  },
                                  function () {
                                      var e, t;
                                      s && (null === (e = n.unsubscribe) || void 0 === e || e.call(n)), null === (t = n.finalize) || void 0 === t || t.call(n);
                                  }
                              )
                          );
                      })
                    : We;
            }
            l([mn(An), u("design:type", Function), u("design:paramtypes", []), u("design:returntype", void 0)], Nn.prototype, "init", null),
                l([mn(An), u("design:type", Function), u("design:paramtypes", [Object]), u("design:returntype", void 0)], Nn.prototype, "fillIn", null),
                l([mn(An), u("design:type", Function), u("design:paramtypes", []), u("design:returntype", void 0)], Nn.prototype, "updateCorrelator", null),
                l(
                    [mn(An), u("design:type", Function), u("design:paramtypes", ["function" == typeof (yn = "undefined" != typeof googletag && googletag.Slot) ? yn : Object]), u("design:returntype", void 0)],
                    Nn.prototype,
                    "destroyGptSlot",
                    null
                );
            const Pn = new (class {
                    constructor() {
                        this.templates = {};
                    }
                    setInitializer(e) {
                        this.initializer = e;
                    }
                    register(e, t = null) {
                        if ("function" != typeof e.getName) throw new Error("Template does not implement getName method.");
                        const i = e.getName();
                        let n = Y.get(`templates.${i}`) || {};
                        "function" == typeof e.getDefaultConfig && (n = Object.assign(Object.assign({}, e.getDefaultConfig()), n)), t && (n = Object.assign(Object.assign({}, n), t)), Y.set(`templates.${i}`, n), (this.templates[i] = e);
                    }
                    init(e, t = null, i = {}) {
                        var n;
                        if (null === (n = this.initializer) || void 0 === n ? void 0 : n.has(e)) return this.initializer.init(e, t, i);
                        if ((yi("template-service", "Load template", e, t, i), !this.templates[e])) throw new Error(`Template ${e} does not exist.`);
                        return i && ("string" == typeof i.slotName || i.slotName instanceof String) && (i.slotName = i.slotName.split(",").shift()), new this.templates[e](t).init(i);
                    }
                    subscribeCommunicator() {
                        Gt.action$
                            .pipe(
                                zt(Gt.getGlobalAction(Bt.GAM_LOAD_TEMPLATE)),
                                On(({ payload: e }) => {
                                    const t = $n.get(e.slotName);
                                    this.init(e.type, t, e);
                                })
                            )
                            .subscribe();
                    }
                })(),
                Dn = new (class {
                    build(e, t = {}) {
                        const i = e.match(/{(.+?)}/g);
                        let n = e;
                        return (
                            i &&
                                i.forEach((e) => {
                                    const i = e.replace("{", "").replace("}", ""),
                                        s = Y.get(i),
                                        o = i.split(".");
                                    let r,
                                        a,
                                        d = t[o[0]];
                                    if (d)
                                        for (r = 1; r < o.length; r += 1) {
                                            if (((a = o[r]), void 0 === d[a])) {
                                                d = void 0;
                                                break;
                                            }
                                            d = d[a];
                                        }
                                    void 0 === d && i.startsWith("targeting.") && (d = ji.get(i.replace("targeting.", ""))), void 0 === d && (d = s), void 0 !== d && (n = n.replace(e, d));
                                }),
                            n
                        );
                    }
                })(),
                Ln = "ae-translatable-label";
            class kn {
                constructor(e) {
                    (this.customIframe = null),
                        (this.element = null),
                        (this.status = null),
                        (this.isEmpty = !0),
                        (this.advertiserId = null),
                        (this.orderId = null),
                        (this.creativeId = null),
                        (this.creativeSize = null),
                        (this.lineItemId = null),
                        (this.winningBidderDetails = null),
                        (this.trackStatusAfterRendered = !1),
                        (this.slotViewed = !1),
                        (this.requested = null),
                        (this.loaded = null),
                        (this.rendered = null),
                        (this.viewed = null),
                        (this.logger = (...e) => yi(kn.LOG_GROUP, ...e)),
                        (this.config = Y.get(`slots.${e.id}`) || {}),
                        (this.enabled = !this.config.disabled),
                        this.config.uid || Y.set(`slots.${e.id}.uid`, Bi()),
                        (this.config.slotName = this.config.slotName || e.id),
                        (this.config.slotNameSuffix = this.config.slotNameSuffix || ""),
                        this.setUpSlotTargeting(),
                        delete this.config.targeting,
                        (this.requested = new Promise((e) => {
                            Gt.onSlotEvent(
                                Mi.SLOT_REQUESTED_EVENT,
                                () => {
                                    (this.pushTime = new Date().getTime()), e();
                                },
                                this.getSlotName()
                            );
                        })),
                        (this.loaded = new Promise((e) => {
                            Gt.onSlotEvent(
                                Mi.SLOT_LOADED_EVENT,
                                () => {
                                    Ki.setDataParam(this, "slotLoaded", !0), e();
                                },
                                this.getSlotName()
                            );
                        })),
                        (this.rendered = new Promise((e) => {
                            Gt.onSlotEvent(
                                Mi.SLOT_RENDERED_EVENT,
                                ({ payload: t }) => {
                                    const { event: i, adType: n } = t;
                                    this.setupSizesTracking(n), this.updateOnRenderEnd(i, n), e();
                                },
                                this.getSlotName()
                            );
                        })),
                        (this.viewed = new Promise((e) => {
                            Gt.onSlotEvent(
                                Mi.SLOT_VIEWED_EVENT,
                                () => {
                                    Ki.setDataParam(this, "slotViewed", !0), e();
                                },
                                this.getSlotName()
                            );
                        }).then(() => {
                            this.slotViewed = !0;
                        })),
                        this.addClass(kn.AD_CLASS),
                        this.enabled || this.hide();
                }
                setUpSlotTargeting() {
                    const e = this.config.targeting || {};
                    (e.src = e.src || Y.get("src")), (e.pos = e.pos || this.getSlotName()), (e.rv = e.rv || "1"), ji.extend(e, this.getSlotName());
                }
                getAdUnit() {
                    return this.adUnit || (this.adUnit = Dn.build(this.config.adUnit || Y.get("adUnitId"), { slotConfig: this.config })), this.adUnit;
                }
                getVideoAdUnit() {
                    return Dn.build(this.config.videoAdUnit || Y.get("vast.adUnitId"), { slotConfig: this.config });
                }
                getElement() {
                    return this.element || (this.element = document.getElementById(this.getSlotName())), this.element;
                }
                getPlaceholder() {
                    var e;
                    const t = null === (e = this.getElement()) || void 0 === e ? void 0 : e.parentElement;
                    return (null == t ? void 0 : t.classList.contains(kn.AD_SLOT_PLACEHOLDER_CLASS)) ? t : null;
                }
                getAdLabel(e) {
                    var t;
                    if (e) {
                        const t = document.querySelector(e);
                        return null == t ? void 0 : t.querySelector(`.${Ln}`);
                    }
                    return null === (t = this.getPlaceholder()) || void 0 === t ? void 0 : t.querySelector(`.${Ln}`);
                }
                getAdContainer() {
                    const e = this.getElement();
                    return e ? e.querySelector('div[id*="_container_"]') : null;
                }
                getIframe() {
                    const e = this.getElement();
                    return e ? (this.customIframe ? this.customIframe : e.querySelector('div[id*="_container_"] iframe')) : null;
                }
                overrideIframe(e) {
                    this.customIframe = e;
                }
                getFrameType() {
                    const e = this.getIframe();
                    return e ? ("true" === e.dataset.isSafeframe ? "safe" : "regular") : null;
                }
                getCreativeSize() {
                    return Array.isArray(this.creativeSize) ? this.creativeSize.join("x") : this.creativeSize;
                }
                getCreativeSizeAsArray() {
                    if (!this.creativeSize) return null;
                    const e = Array.isArray(this.creativeSize) ? this.creativeSize : this.creativeSize.split("x").map(Number);
                    return [e[0], e[1]];
                }
                getMainPositionName() {
                    const { pos: e = "" } = ji.dump(this.getSlotName());
                    return (Array.isArray(e) ? e : e.split(","))[0].toLowerCase();
                }
                getUid() {
                    return this.config.uid;
                }
                getSlotName() {
                    return this.config.slotName;
                }
                getSizes() {
                    return this.config.sizes;
                }
                get targeting() {
                    return ji.dump(this.getSlotName());
                }
                getTargeting() {
                    return this.parseTargetingParams(ji.dump(this.getSlotName()));
                }
                parseTargetingParams(e) {
                    const t = {};
                    return (
                        Object.keys(e).forEach((i) => {
                            let n = e[i];
                            "function" == typeof n && (n = n()), null !== n && (t[i] = n);
                        }),
                        t
                    );
                }
                getDefaultSizes() {
                    return this.config.defaultSizes;
                }
                getVideoSizes() {
                    return this.config.videoSizes;
                }
                getViewportConflicts() {
                    return this.config.viewportConflicts || [];
                }
                hasDefinedViewportConflicts() {
                    return this.getViewportConflicts().length > 0;
                }
                getStatus() {
                    return this.status;
                }
                getPushTime() {
                    return this.pushTime;
                }
                setStatus(e = null) {
                    (this.status = e), null !== e && (this.emit(e), Ki.setDataParam(this, "slotResult", this.getStatus()), this.emit(Mi.SLOT_STATUS_CHANGED));
                }
                isEnabled() {
                    return this.enabled;
                }
                isFirstCall() {
                    return !!this.config.firstCall;
                }
                isViewed() {
                    return this.slotViewed;
                }
                isOutOfPage() {
                    return !!this.config.outOfPage;
                }
                isVideo() {
                    return !!this.config.isVideo;
                }
                getCopy() {
                    return JSON.parse(JSON.stringify(this.config));
                }
                getTopOffset() {
                    const e = this.getElement();
                    return e ? Vn(e) : null;
                }
                enable() {
                    this.enabled = !0;
                }
                disable(e = null) {
                    (this.enabled = !1), this.setStatus(e), this.hide();
                }
                destroy() {
                    this.disable(), this.emit(Mi.DESTROY_EVENT);
                }
                getConfigProperty(e) {
                    return Y.get(`slots.${this.config.slotName}.${e}`);
                }
                getTargetingProperty(e) {
                    return ji.get(e, this.getSlotName());
                }
                setConfigProperty(e, t) {
                    Y.set(`slots.${this.config.slotName}.${e}`, t);
                }
                setTargetingConfigProperty(e, t) {
                    ji.set(e, t, this.config.slotName);
                }
                success(e = Yi.STATUS_SUCCESS) {
                    this.getConfigProperty("showManually") || this.show(), this.setStatus(e);
                    const t = this.getConfigProperty("skipTemplates") ? [] : this.getConfigProperty("defaultTemplates") || [];
                    t && t.length && t.forEach((e) => Pn.init(e, this)), this.emit(Mi.TEMPLATES_LOADED, t), Gt.emit(Bt.AD_ENGINE_SLOT_LOADED, { name: this.getSlotName(), state: Yi.STATUS_SUCCESS }), this.setupDelayedCollapse();
                }
                setupDelayedCollapse() {
                    Gt.on(
                        Bt.GAM_AD_DELAYED_COLLAPSE,
                        (e) => {
                            e.source.includes(this.getSlotName()) && this.collapse();
                        },
                        !1
                    );
                }
                collapse(e = Yi.STATUS_COLLAPSE) {
                    Gt.emit(Bt.AD_ENGINE_SLOT_LOADED, { name: this.getSlotName(), state: Yi.STATUS_COLLAPSE }), this.hide(), this.setStatus(e);
                }
                updateWinningPbBidderDetails() {
                    this.getTargetingProperty("hb_bidder") && this.getTargetingProperty("hb_pb")
                        ? (this.winningBidderDetails = { name: this.getTargetingProperty("hb_bidder"), price: this.getTargetingProperty("hb_pb") })
                        : (this.winningBidderDetails = null);
                }
                updateWinningA9BidderDetails() {
                    this.getTargetingProperty("amznbid") ? (this.winningBidderDetails = { name: "a9", price: this.getTargetingProperty("amznbid") }) : (this.winningBidderDetails = null);
                }
                updateOnRenderEnd(e, t) {
                    if (!e) return;
                    let i = e.creativeId,
                        n = e.lineItemId;
                    if (((this.isEmpty = e.isEmpty), !e.isEmpty && e.slot)) {
                        const t = e.slot.getResponseInformation();
                        t &&
                            ((this.orderId = t.campaignId),
                            (this.advertiserId = t.advertiserId),
                            e.sourceAgnosticCreativeId && e.sourceAgnosticLineItemId
                                ? (this.logger("set line item and creative id to source agnostic values"), (i = e.sourceAgnosticCreativeId), (n = e.sourceAgnosticLineItemId))
                                : null === t.creativeId && null === t.lineItemId && ((i = Sn), (n = Sn)));
                    }
                    switch (((this.creativeId = i), (this.lineItemId = n), (this.creativeSize = this.isOutOfPage() ? "out-of-page" : e.size), on.updateOnRenderEnd(this), t)) {
                        case Yi.STATUS_COLLAPSE:
                        case Yi.STATUS_FORCED_COLLAPSE:
                            this.collapse(t);
                            break;
                        case Yi.STATUS_MANUAL:
                            this.setStatus(t);
                            break;
                        case Yi.STATUS_SKIP_TEMPLATE:
                            this.setConfigProperty("skipTemplates", !0), this.success();
                            break;
                        default:
                            this.success();
                    }
                }
                addClass(e) {
                    const t = this.getElement();
                    return !!t && (t.classList.add(e), !0);
                }
                removeClass(e) {
                    const t = this.getElement();
                    return !!t && (t.classList.remove(e), !0);
                }
                hide() {
                    this.addClass(kn.HIDDEN_AD_CLASS) && this.emit(Mi.HIDDEN_EVENT);
                }
                show() {
                    this.removeClass(kn.HIDDEN_AD_CLASS) && this.emit(Mi.SHOWED_EVENT);
                }
                emit(e, t = {}, i = !0) {
                    Gt.emit(Bt.AD_ENGINE_SLOT_EVENT, { event: e.toString(), slot: this, adSlotName: this.getSlotName(), payload: i ? JSON.parse(JSON.stringify(t)) : t }), this.logger(this.getSlotName(), e, t);
                }
                emitEvent(e = null) {
                    null !== e && this.emit(Mi.CUSTOM_EVENT, { status: e });
                }
                setupSizesTracking(e) {
                    const t = this.getIframe();
                    if (t && e.includes("success") && window.ResizeObserver) {
                        const e = new ResizeObserver((t) => {
                            for (const i of t) {
                                const t = Math.floor(i.target.clientWidth),
                                    n = Math.floor(i.target.clientHeight);
                                t > 0 && n > 0 && (1 != t || 1 != n) && (Gt.emit(Bt.AD_ENGINE_AD_RESIZED, { slot: this, sizes: { width: t, height: n } }), e.unobserve(i.target));
                            }
                        });
                        e.observe(t);
                    }
                }
            }
            function Rn(e) {
                return e ? parseFloat(getComputedStyle(e, null).width.replace("px", "")) : 0;
            }
            function xn(e) {
                return e ? parseFloat(getComputedStyle(e, null).height.replace("px", "")) : 0;
            }
            function Un(e) {
                let t = !1;
                const i = { display: "", height: "" };
                e.classList.contains(kn.HIDDEN_AD_CLASS) && ((t = !0), (i.display = e.style.display), (i.height = e.style.height), e.classList.remove(kn.HIDDEN_AD_CLASS), (e.style.display = "block"), (e.style.height = "1px"));
                const n = (function (e) {
                    const t = e.getBoundingClientRect(),
                        i = window.pageXOffset || document.documentElement.scrollLeft,
                        n = window.pageYOffset || document.documentElement.scrollTop;
                    return { top: t.top + n, left: t.left + i };
                })(e);
                return t && (e.classList.add(kn.HIDDEN_AD_CLASS), (e.style.display = i.display), (e.style.height = i.height)), n;
            }
            function Vn(e) {
                return Un(e).top;
            }
            function Mn(e) {
                return Un(e).left;
            }
            function jn() {
                return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            }
            function Bn() {
                return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            }
            function zn(e, { topOffset: t = 0, bottomOffset: i = 0, areaThreshold: n = 0.5 } = {}) {
                const s = window.getComputedStyle(e).position;
                if (["fixed", "sticky"].includes(s)) return !0;
                const o = e.offsetHeight,
                    r = Vn(e),
                    a = r + o,
                    d = window.scrollY,
                    l = jn(),
                    c = n * o;
                return r >= t + d - c && a <= i + d + l + c;
            }
            function Gn(e, t = []) {
                if (null === e.offsetParent) return !1;
                const i = e.offsetHeight,
                    n = Vn(e),
                    s = jn();
                return t.some((t) => {
                    if ((e.previousSibling && e.previousSibling.isSameNode(t)) || (e.nextSibling && e.nextSibling.isSameNode(t))) return !0;
                    const o = t.offsetHeight,
                        r = Vn(t);
                    return (r < n ? n - r - o : r - n - i) < s;
                });
            }
            (kn.LOG_GROUP = "AdSlot"), (kn.AD_CLASS = "gpt-ad"), (kn.AD_SLOT_PLACEHOLDER_CLASS = "ad-slot-placeholder"), (kn.HIDDEN_AD_CLASS = "hidead");
            const Fn = "slot-service",
                $n = new (class {
                    constructor() {
                        (this.slotStatuses = {}), (this.slotStates = {}), (this.slots = {});
                    }
                    add(e) {
                        const t = e.getSlotName();
                        (this.slots[t] = e),
                            !1 === this.slotStates[t] && e.disable(this.slotStatuses[t]),
                            !0 === this.slotStates[t] && e.enable(),
                            Ki.addDefaultClasses(e),
                            Gt.emit(Bt.AD_ENGINE_SLOT_ADDED, { name: t, slot: e, state: Mi.SLOT_ADDED_EVENT });
                    }
                    removeAll() {
                        Object.values(this.slots).forEach((e) => this.remove(e));
                    }
                    remove(e) {
                        const t = e.getSlotName();
                        Y.removeListeners(`slots.${t}`), e.destroy(), delete this.slots[t], delete this.slotStates[t], delete this.slotStatuses[t];
                    }
                    get(e) {
                        if (e.includes("gpt_unit_")) {
                            const t = this.getGptAdSlot(e);
                            return this.setGptAdSlotInsertId(t, e), t;
                        }
                        const [t] = e.split(",");
                        if (this.slots[t]) return this.slots[t];
                        let i = null;
                        return (
                            this.forEach((e) => {
                                if (null !== i) return;
                                const n = ji.get("pos", e.getSlotName()) || [];
                                (n !== t && n[0] !== t) || (i = e);
                            }),
                            i
                        );
                    }
                    getSlotId(e) {
                        let t = Y.get(`slots.${e}.uid`);
                        return t || ((t = Bi()), Y.set(`slots.${e}.uid`, t)), t;
                    }
                    forEach(e) {
                        Object.keys(this.slots).forEach((t) => {
                            e(this.slots[t]);
                        });
                    }
                    enable(e) {
                        this.setState(e, !0);
                    }
                    disable(e, t = null) {
                        this.setState(e, !1, t);
                    }
                    getState(e) {
                        return !1 !== this.slotStates[e];
                    }
                    setState(e, t, i = null) {
                        const n = this.get(e);
                        (this.slotStates[e] = t), (this.slotStatuses[e] = i), n ? (n.setStatus(i), t ? n.enable() : n.disable()) : t ? Y.set(`slots.${e}.disabled`, !1) : Y.set(`slots.${e}.disabled`, !0), yi(Fn, "set state", e, t);
                    }
                    hasViewportConflict(e) {
                        if (!e.hasDefinedViewportConflicts() || null === e.getElement()) return !1;
                        const t = e.getElement().offsetHeight,
                            i = Vn(e.getElement()),
                            n = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
                            s = e.getViewportConflicts().some((e) =>
                                (function (e, t, i, n) {
                                    const s = document.getElementById(n);
                                    if (null === s.offsetParent) return !1;
                                    const o = s.offsetHeight,
                                        r = Vn(s);
                                    return (r < t ? t - r - o : r - t - e) < i;
                                })(t, i, n, e)
                            );
                        return yi(Fn, "hasViewportConflict", e.getSlotName(), s), s;
                    }
                    get slotConfigsMap() {
                        return Y.get("slots") || {};
                    }
                    getFirstCallSlotNames() {
                        return Object.entries(this.slotConfigsMap)
                            .filter(([, e]) => !!e.firstCall)
                            .map(([e]) => e);
                    }
                    getNonFirstCallSlotNames() {
                        return Object.entries(this.slotConfigsMap)
                            .filter(([, e]) => !e.firstCall)
                            .map(([e]) => e);
                    }
                    getEnabledSlotNames() {
                        return Object.entries(this.slotConfigsMap)
                            .filter(([, e]) => !e.disabled)
                            .map(([e]) => e);
                    }
                    pushSlot(e) {
                        const t = es();
                        t ? (yi(Fn, `Push slot ${e.id} to adStack.`), t.push({ id: e.id })) : yi(Fn, `Could not push slot ${e.id} because adStack is not present.`);
                    }
                    getGptAdSlot(e) {
                        const t = Y.get("custom.serverPrefix"),
                            i = new RegExp(`/${t ? `${t}.` : ""}[A-Z]+/(?<slotName>[a-z_]+)/`),
                            n = e.match(i);
                        try {
                            return this.slots[n.groups.slotName];
                        } catch (e) {
                            throw new Error("Unsupported GPT Template slot id format");
                        }
                    }
                    setGptAdSlotInsertId(e, t) {
                        e.setConfigProperty("insertId", t);
                    }
                })(),
                Hn = new (class {
                    constructor() {
                        (this.serviceName = "scroll-listener"), (this.callbacks = {});
                    }
                    init() {
                        let e = !1;
                        document.addEventListener("scroll", (t) => {
                            e ||
                                (window.requestAnimationFrame(() => {
                                    (e = !1),
                                        Object.keys(this.callbacks).forEach((e) => {
                                            "function" == typeof this.callbacks[e] && this.callbacks[e](t.type, e);
                                        });
                                }),
                                (e = !0));
                        }),
                            yi(this.serviceName, "Service initialised.");
                    }
                    addSlot(e, { threshold: t, distanceFromTop: i } = {}) {
                        const n = document.getElementById(e);
                        n
                            ? void 0 !== t || void 0 !== i
                                ? void 0 === t || void 0 === i
                                    ? (yi(this.serviceName, `Add slot ${e}.`),
                                      this.addCallback((e, s) => {
                                          const o = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
                                          if (void 0 !== t) {
                                              const e = Vn(n);
                                              o + jn() > e - t && (this.removeCallback(s), $n.pushSlot(n));
                                          } else o > i && (this.removeCallback(s), $n.pushSlot(n));
                                      }))
                                    : yi(this.serviceName, "either threshold or distanceFromTop can be initialised, not both")
                                : yi(this.serviceName, "either threshold or distanceFromTop must be initialised")
                            : yi(this.serviceName, `Node with id ${e} not found.`);
                    }
                    addCallback(e) {
                        const t = this.getUniqueId();
                        return (this.callbacks[t] = e), t;
                    }
                    removeCallback(e) {
                        delete this.callbacks[e];
                    }
                    getUniqueId() {
                        return (16777216 * (1 + Math.random())).toString(16).substring(1);
                    }
                })(),
                qn = "nativo";
            class Wn {
                constructor(e) {
                    this.context = e;
                }
                isEnabled() {
                    const e = this.context.get("services.nativo.enabled") && this.context.get("wiki.opts.enableNativeAds");
                    return Wn.log("Is Nativo enabled?", e), e;
                }
                load() {
                    Wn.log("Loading Nativo API..."),
                        xi.loadScript("//s.ntv.io/serve/load.js", !0, null, {}, { ntvSetNoAutoStart: "" }).then(() => {
                            Wn.log("Nativo API loaded."), this.watchNtvEvents(), this.watchPrebidNativeEvents();
                        });
                }
                scrollTriggerCallback(e, t) {
                    if (e.isLoaded) Wn.log(qn, "Fan Takeover on the page");
                    else {
                        if (!1 !== e.isLoaded || "ruap" !== e.adProduct || !this.context.get("custom.hasFeaturedVideo"))
                            return this.isDisabledInNoAdsExperiment(t)
                                ? (Wn.log(qn, `Slot disabled due to the experiment: ${t}`),
                                  void ("ucp_mobile" !== ji.get("skin") && document.getElementById(t) ? (document.getElementById(t).id = "") : document.getElementById(t) && document.getElementById(t).remove()))
                                : void this.context.push("state.adStack", { id: t });
                        Wn.log(qn, '"Fan Takeover" on the featured page');
                    }
                }
                replaceAndShowSponsoredFanAd() {
                    const e = document.getElementById(Wn.FEED_AD_SLOT_NAME),
                        t = document.querySelector(".recirculation-prefooter__item.is-sponsored.can-nativo-replace");
                    e && t ? (t.replaceWith(e), Wn.log("Replacing sponsored element with Nativo feed ad")) : Wn.log("Could not replace sponsored element with Nativo feed ad");
                }
                static log(...e) {
                    yi(qn, ...e);
                }
                replaceWithAffiliateUnit() {
                    this.sendNativoStatus(Yi.STATUS_DISABLED);
                }
                sendNativoStatus(e) {
                    const t = { event: e, adSlotName: "", payload: { adLocation: "", provider: "nativo" } };
                    Gt.dispatch(Gt.getGlobalAction(Bt.AD_ENGINE_SLOT_EVENT)(t));
                }
                isDisabledInNoAdsExperiment(e) {
                    return this.context.get("state.noAdsExperiment.unitName") === e;
                }
                watchNtvEvents() {
                    var e, t, i, n;
                    null === (t = null === (e = window.ntv.Events) || void 0 === e ? void 0 : e.PubSub) ||
                        void 0 === t ||
                        t.subscribe("noad", (e) => {
                            const t = Wn.AD_SLOT_MAP[e.data[0].id];
                            this.handleNtvNativeEvent(e, t, Yi.STATUS_COLLAPSE), t == Wn.INCONTENT_AD_SLOT_NAME && Gt.emit(Bt.NO_NATIVO_AD, { slotName: t });
                        }),
                        null === (n = null === (i = window.ntv.Events) || void 0 === i ? void 0 : i.PubSub) ||
                            void 0 === n ||
                            n.subscribe("adRenderingComplete", (e) => {
                                const t = Wn.extractSlotIdFromNativoCompleteEventData(e);
                                this.handleNtvNativeEvent(e, t, Yi.STATUS_SUCCESS);
                            });
                }
                watchPrebidNativeEvents() {
                    Gt.on(Bt.NO_NATIVE_PREBID_AD, (e) => {
                        e.slotName == Wn.INCONTENT_AD_SLOT_NAME && this.replaceWithAffiliateUnit();
                    });
                }
                static extractSlotIdFromNativoNoAdEventData(e) {
                    var t;
                    return (null === (t = e.data[0]) || void 0 === t ? void 0 : t.adLocation) ? e.data[0].adLocation.substring(1) : Wn.AD_SLOT_MAP[e.data[0].id];
                }
                static extractSlotIdFromNativoCompleteEventData(e) {
                    return e.data.placement ? Wn.AD_SLOT_MAP[e.data.placement] : Wn.AD_SLOT_MAP[e.data.id];
                }
                handleNtvNativeEvent(e, t, i) {
                    if ((Wn.log("Nativo native event fired", e, t, i), !t)) return;
                    const n = $n.get(t);
                    Wn.log("Handling Nativo native event", t, n),
                        n &&
                            n.getSlotName() === t &&
                            (i === Yi.STATUS_COLLAPSE && (n.hide(), t === Wn.INCONTENT_AD_SLOT_NAME && this.replaceWithAffiliateUnit()),
                            i === Yi.STATUS_SUCCESS && t === Wn.FEED_AD_SLOT_NAME && this.replaceAndShowSponsoredFanAd(),
                            n.getStatus() !== i ? n.setStatus(i) : Wn.log("Slot status already tracked", n.getSlotName(), i));
                }
            }
            (Wn.INCONTENT_AD_SLOT_NAME = "ntv_ad"),
                (Wn.FEED_AD_SLOT_NAME = "ntv_feed_ad"),
                (Wn.AD_SLOT_MAP = { 1139703: Wn.INCONTENT_AD_SLOT_NAME, 1142863: Wn.INCONTENT_AD_SLOT_NAME, 1142668: Wn.FEED_AD_SLOT_NAME, 1142669: Wn.FEED_AD_SLOT_NAME, 456441: Wn.FEED_AD_SLOT_NAME });
            class Kn {
                create(e, t) {
                    const i = this.createEmptyIframe();
                    return e.appendChild(i), t && (i.contentWindow.document.open(), i.contentWindow.document.write(t), i.contentWindow.document.close()), i;
                }
                createEmptyIframe() {
                    const e = document.createElement("iframe");
                    return (
                        (e.height = "0"),
                        (e.width = "0"),
                        (e.border = "0px"),
                        (e.hspace = "0"),
                        (e.vspace = "0"),
                        (e.marginWidth = "0"),
                        (e.marginHeight = "0"),
                        (e.style.border = "0"),
                        (e.scrolling = "no"),
                        (e.frameBorder = "0"),
                        (e.src = "about:blank"),
                        (e.style.display = "inline"),
                        (e.style.overflow = "hidden"),
                        e
                    );
                }
            }
            class Yn {
                constructor() {
                    this.iframeBuilder = new Kn();
                }
                fillIn(e) {
                    return p(this, void 0, void 0, function* () {
                        const t = yield Ui.init();
                        Gt.action$
                            .pipe(
                                zt(Gt.getGlobalAction(Bt.BIDDERS_BIDDING_DONE)),
                                Vt((t) => "prebid" === t.provider && t.slotName === e.getSlotName()),
                                Mt(1)
                            )
                            .subscribe(() => {
                                var i, n;
                                const s = this.getIframeDoc(e),
                                    o = this.getAdId(e);
                                s &&
                                    o &&
                                    (t.renderAd(s, o),
                                    null === (n = null === (i = e.getElement()) || void 0 === i ? void 0 : i.classList) || void 0 === n || n.remove(kn.HIDDEN_AD_CLASS),
                                    e.success(),
                                    yi("prebidium-provider", e.getSlotName(), "slot added"));
                            });
                    });
                }
                getIframeDoc(e) {
                    return this.iframeBuilder.create(e.getElement()).contentWindow.document;
                }
                getAdId(e) {
                    return ji.get("hb_adid", e.getSlotName());
                }
            }
            class Qn {
                constructor(e) {
                    (this.ntvApi = e || {}), (this.ntvApi.cmd = this.ntvApi.cmd || []);
                }
                fillIn(e) {
                    return (
                        yi("nativo", `Filling ${e.getSlotName()} by pushing Nativo's command queue`),
                        this.getQueue().push(() => {
                            window.PostRelease.Start();
                        }),
                        !0
                    );
                }
                getQueue() {
                    return this.ntvApi.cmd;
                }
            }
            const Xn = "slot-refresher",
                Jn = { timeoutMS: 3e4, slots: [] },
                Zn = new (class {
                    constructor() {
                        this.slotsInTheViewport = [];
                    }
                    log(...e) {
                        yi(Xn, ...e);
                    }
                    refreshSlot(e) {
                        this.config.slots.includes(e.getSlotName()) &&
                            setTimeout(() => {
                                if (e.isEnabled()) {
                                    if ((this.log(`${e.getSlotName()} will be refreshed.`), this.slotsInTheViewport.includes(e.getSlotName()))) return this.log(`refreshing ${e.getSlotName()}`), void Nn.refreshSlot(e);
                                    this.log(`${e.getSlotName()} waiting for being in viewport.`),
                                        (function (e) {
                                            window.googletag.pubads().addEventListener("slotVisibilityChanged", function t(i) {
                                                i.slot.getSlotElementId() === e.getSlotName() &&
                                                    (yi(Xn, `${e.getSlotName()} back in the viewport, refreshing.`, i), Nn.refreshSlot(e), window.googletag.pubads().removeEventListener("slotVisibilityChanged", t));
                                            });
                                        })(e);
                                }
                            }, this.config.timeoutMS);
                    }
                    setupSlotRefresher(e, t, i) {
                        (this.config = Object.assign(Object.assign({}, Jn), e)),
                            this.config.slots.length < 1 || t
                                ? i("disabled")
                                : (Gt.onSlotEvent(Mi.SLOT_VIEWED_EVENT, ({ adSlotName: e, slot: t }) => {
                                      i(`${e} viewed`), this.refreshSlot(t);
                                  }),
                                  Gt.onSlotEvent(Mi.SLOT_BACK_TO_VIEWPORT, ({ adSlotName: e }) => {
                                      this.slotsInTheViewport.push(e);
                                  }),
                                  Gt.onSlotEvent(Mi.SLOT_LEFT_VIEWPORT, ({ adSlotName: e }) => {
                                      this.slotsInTheViewport = this.slotsInTheViewport.filter((t) => t !== e);
                                  }),
                                  i("enabled", this.config));
                    }
                    init() {
                        return p(this, void 0, void 0, function* () {
                            this.setupSlotRefresher(
                                Y.get("services.slotRefresher.config"),
                                yield (function () {
                                    return p(this, void 0, void 0, function* () {
                                        return new Promise((e) => {
                                            Gt.on(Bt.AD_ENGINE_UAP_LOAD_STATUS, (t) => {
                                                const i = t.isLoaded || "ruap" === t.adProduct;
                                                e(i);
                                            });
                                        });
                                    });
                                })(),
                                this.log
                            );
                        });
                    }
                })();
            function es() {
                const e = Y.get("state.adStack");
                return yi("ad-engine", "getting adStack: ", ...e), e;
            }
            class ts {
                constructor(e = null) {
                    (this.started = !1),
                        Y.extend(e),
                        (window.ads = window.ads || {}),
                        (window.ads.runtime = window.ads.runtime || {}),
                        Gt.on(
                            Bt.PLATFORM_BEFORE_PAGE_CHANGE,
                            () => {
                                $n.removeAll();
                            },
                            !1
                        );
                }
                init() {
                    return p(this, void 0, void 0, function* () {
                        var e;
                        this.setupProviders(),
                            this.setupAdStack(),
                            sn.init(),
                            (e = Y.get("options.customAdLoader.globalMethodName")) &&
                                (window[e] = (e) => {
                                    const t = e.slotName ? $n.get(e.slotName) : null;
                                    Pn.init(e.type, t, e);
                                }),
                            Hi.init(),
                            Pn.subscribeCommunicator(),
                            Ki.registerMessageListener($n.get.bind($n)),
                            this.runAdQueue(),
                            Hn.init(),
                            Zn.init(),
                            this.setupPushOnScrollQueue();
                    });
                }
                setupProviders() {
                    const e = Y.get("state.provider");
                    this.defaultProvider = this.createProvider(e);
                    const t = new Wn(Y);
                    t.isEnabled() ? t.load() : t.replaceWithAffiliateUnit();
                }
                setupAdStack() {
                    (this.adStack = es()),
                        this.adStack.start ||
                            en(this.adStack, (e) => {
                                const t = new kn(e);
                                this.pushSlot(t);
                            });
                }
                pushSlot(e) {
                    const t = Y.get(`slots.${e.getSlotName()}.providers`) || [];
                    if (($n.add(e), t.length > 0)) {
                        const i = t.shift();
                        this.createProvider(i).fillIn(e);
                    } else this.defaultProvider.fillIn(e);
                }
                createProvider(e) {
                    switch (e) {
                        case "prebidium":
                            return new Yn();
                        case "nativo":
                            return new Qn(window.ntv);
                        default:
                            return new Nn();
                    }
                }
                setupPushOnScrollQueue() {
                    if (Y.get("events.pushOnScroll")) {
                        const e = Y.get("events.pushOnScroll.ids") || [],
                            t = new tn(...e);
                        t.onItemFlush((e) => {
                            Hn.addSlot(e, { threshold: Y.get("events.pushOnScroll.threshold") || 0 });
                        }),
                            Y.set("events.pushOnScroll.ids", t),
                            t.flush();
                    }
                }
                runAdQueue() {
                    Gt.on(Bt.AD_ENGINE_PARTNERS_READY, () => {
                        this.started || (Gt.emit(Bt.AD_ENGINE_STACK_START), (this.started = !0), this.adStack.start(), Gt.emit(Bt.AD_ENGINE_STACK_COMPLETED));
                    });
                }
            }
            const is = new (class {
                    constructor() {
                        (this.MAX = 100), (this.ALWAYS_ALLOWED_THRESHOLD = 100);
                    }
                    isOutboundTrafficAllowed(e = "default") {
                        const t = Y.get(`services.${e}.allowed`);
                        if ("boolean" == typeof t) return t;
                        const i = Y.get(`services.${e}.threshold`),
                            n = i >= 0 && i <= 100 ? i : this.ALWAYS_ALLOWED_THRESHOLD;
                        let s = !0;
                        return (
                            n !== this.ALWAYS_ALLOWED_THRESHOLD && (s = this.getSeed() < n),
                            n < 1 && (s = !1),
                            yi("outbound-traffic-restrict", `Outbound traffic for: "${e}" is allowed: ${s}`, `Threshold: ${n}`),
                            Y.set(`services.${e}.allowed`, s),
                            s
                        );
                    }
                    getSeed() {
                        return Math.random() * this.MAX;
                    }
                })(),
                ns = new (class {
                    constructor() {
                        Y.get("services.externalLogger.threshold") || Y.set("services.externalLogger.threshold", 1), (this.isActive = is.isOutboundTrafficAllowed("externalLogger"));
                    }
                    log(e, t = {}) {
                        if (!this.isActive) return;
                        const i = Y.get("services.externalLogger.endpoint");
                        if (!i) return;
                        const n = new FormData();
                        n.set("message", e),
                            Object.keys(t).forEach((e) => {
                                n.set(e, t[e]);
                            });
                        const s = new XMLHttpRequest();
                        s.open("POST", i, !0), s.send(n);
                    }
                })(),
                ss = "IntentIQ",
                os = new (class {
                    constructor() {
                        (this.loaded = !1), (this.fandomId = 1187275693), (this.intentIQScriptUrl = "//script.wikia.nocookie.net/fandom-ae-assets/intentiq/5.4/IIQUniversalID.js");
                    }
                    preloadScript() {
                        if (this.isEnabled())
                            return this.loadPromise
                                ? this.loadPromise
                                : void (this.loadPromise = xi.loadScript(this.intentIQScriptUrl, !0, "first").then(() => {
                                      (this.loaded = !0), yi(ss, "loaded");
                                  }));
                    }
                    initialize(e) {
                        return p(this, void 0, void 0, function* () {
                            if (this.isEnabled()) {
                                if (
                                    (Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: "intentiq_ppid_not_set_on_time" }),
                                    this.loaded || (yield this.preloadScript(), yield new Vi(() => void 0 !== window.IntentIqObject, 10, 10).until()),
                                    !this.intentIqObject)
                                ) {
                                    const t = window.location.hostname.includes(".fandom.com") ? "fandom.com" : window.location.hostname;
                                    return new Promise((i) => {
                                        (this.intentIqObject = new window.IntentIqObject({
                                            partner: this.fandomId,
                                            pbjs: e,
                                            timeoutInMillis: 2e3,
                                            ABTestingConfigurationSource: "percentage",
                                            abPercentage: 97,
                                            manualWinReportEnabled: !0,
                                            browserBlackList: "Chrome",
                                            domainName: t,
                                            callback: (e) => {
                                                yi(ss, "got data", e), i(), this.setupPpid(e);
                                            },
                                        })),
                                            ji.set("intent_iq_group", this.intentIqObject.intentIqConfig.abTesting.currentTestGroup || "U"),
                                            Y.get("services.intentIq.ppid.enabled") && ji.set("intent_iq_ppid_group", this.intentIqObject.intentIqConfig.abTesting.currentTestGroup || "U"),
                                            Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: "intentiq_done" });
                                    });
                                }
                            } else yi(ss, "disabled");
                        });
                    }
                    reportPrebidWin(e) {
                        return p(this, void 0, void 0, function* () {
                            if (!this.isEnabled() || !this.intentIqObject) return;
                            const t = {
                                biddingPlatformId: 1,
                                bidderCode: e.bidderCode,
                                prebidAuctionId: e.auctionId,
                                cpm: e.cpm,
                                currency: e.currency,
                                originalCpm: e.originalCpm,
                                originalCurrency: e.originalCurrency,
                                status: e.status,
                                placementId: e.adUnitCode,
                            };
                            yi(ss, "reporting prebid win", t), this.intentIqObject.reportExternalWin(t), ns.log("intentiq report", { report: JSON.stringify(t) });
                        });
                    }
                    setupPpid(e) {
                        if (!this.isEnabled()) return;
                        if (
                            !(function (e) {
                                return !!e && void 0 !== e.eids;
                            })(e)
                        )
                            return void yi(ss, "no data received");
                        const t = this.getPpid(e);
                        yi(ss, "ppid", t), Y.get("services.intentIq.ppid.enabled") && this.setPpid(t), Y.get("services.intentIq.ppid.tracking.enabled") && this.trackPpid(t);
                    }
                    isEnabled() {
                        return Y.get("bidders.prebid.intentIQ") && Y.get("options.trackingOptIn") && !Y.get("options.optOutSale") && !gn();
                    }
                    getPpid(e) {
                        try {
                            return this.extractId(e);
                        } catch (e) {
                            return _i(ss, "error setting ppid", e), null;
                        }
                    }
                    setPpid(e) {
                        ji.set("intent_iq_ppid", e, "intent_iq"), yi(ss, "set ppid ", e);
                    }
                    extractId(e) {
                        var t, i;
                        return null !== (i = null === (t = e.eids.filter((e) => "intentiq.com" === e.source).map((e) => e.uids.find((e) => "ppuid" === e.ext.stype))[0]) || void 0 === t ? void 0 : t.id) && void 0 !== i ? i : null;
                    }
                    trackPpid(e) {
                        e && (Gt.emit(Bt.IDENTITY_PARTNER_DATA_OBTAINED, { partnerName: "intentiq", partnerIdentityId: e }), yi(ss, "track ppid"));
                    }
                })(),
                rs = "not-defined";
            function as(e, t) {
                const i = Y.get(`slots.${e}`);
                return (t && (null == i ? void 0 : i.a9Alias)) || (null == i ? void 0 : i.bidderAlias);
            }
            function ds(e, t) {
                return as(e, t) || e;
            }
            function ls(e, t) {
                return 0 !== Object.entries(Y.get(`slots.${e}`) || {}).length ? e : ps(e, t).shift() || "";
            }
            function cs(e, t, i) {
                let n = us(e);
                if (n === rs) {
                    const t = ps(e, i).shift();
                    n = t ? us(t) : n;
                }
                return n === t;
            }
            function us(e) {
                return Y.get(`slots.${e}.bidGroup`) || rs;
            }
            function ps(e, t) {
                return Object.entries($n.slotConfigsMap)
                    .filter(([, i]) => i.bidderAlias === e || (t && i.a9Alias === e))
                    .map(([e]) => e);
            }
            class hs {
                constructor(e, t, i = 2e3) {
                    (this.name = e), (this.bidderConfig = t), (this.timeout = i), (this.called = !1), (this.response = !1), (this.logGroup = `${e}-bidder`), this.resetState(), yi(this.logGroup, "created");
                }
                resetState() {
                    (this.called = !1),
                        (this.response = !1),
                        (this.onResponseCallbacks = new tn()),
                        this.onResponseCallbacks.onItemFlush((e) => {
                            e(this.name);
                        });
                }
                call() {
                    (this.response = !1), (this.called = !0), this.callBids(() => this.onBidResponse()), yi(this.logGroup, "called");
                }
                onBidResponse() {
                    (this.response = !0), this.calculatePrices(), this.onResponseCallbacks.flush(), yi(this.logGroup, "respond");
                }
                getSlotBestPrice(e) {
                    return this.getBestPrice(e);
                }
                getSlotTargetingParams(e) {
                    return this.called && this.isSlotSupported(e) ? this.getTargetingParams(e) : Promise.resolve({});
                }
                isSlotSupported(e) {
                    return this.isSupported(e);
                }
                waitForResponse() {
                    return cn((e) => {
                        this.hasResponse() ? e() : this.addResponseListener(e);
                    }, this.timeout);
                }
                hasResponse() {
                    return this.response;
                }
                addResponseListener(e) {
                    this.onResponseCallbacks.push(e);
                }
                wasCalled() {
                    return this.called;
                }
            }
            const gs = new (class {
                loadPixel(e) {
                    const t = document.createElement("img");
                    (t.src = e), document.body.appendChild(t);
                }
            })();
            class ms {
                fetch(e, t = 2e3, i) {
                    return p(this, void 0, void 0, function* () {
                        const n = new AbortController(),
                            s = setTimeout(() => n.abort(), t),
                            o = yield fetch(e, Object.assign({ signal: n.signal }, i));
                        return clearTimeout(s), o;
                    });
                }
            }
            function fs(e) {
                const t = ("undefined" != typeof window && window) || ("undefined" != typeof globalThis && globalThis) || ("undefined" != typeof self && self) || (void 0 !== s.g && s.g) || void 0;
                let i;
                return void 0 !== t && (i = t[e]), i;
            }
            let vs = class {
                constructor() {
                    this.timeouts = {};
                }
                get(e) {
                    return yi("global-timeout", `Getting timeout ${e}`), this.timeouts[e];
                }
                set(e, t) {
                    return this.timeouts[e]
                        ? (yi("global-timeout", `Timeout ${e} already set`), this.timeouts[e])
                        : (yi("global-timeout", `Setting timeout ${e} for ${t}ms`),
                          (this.timeouts[e] = new Promise((e) => {
                              setTimeout(() => {
                                  e();
                              }, t);
                          })),
                          this.timeouts[e]);
                }
            };
            vs = l([N({ scope: "Singleton" })], vs);
            const bs = {
                en: { advertisement: "Advertisement", "learn-more": "Learn More" },
                ar: { advertisement: "Ø¥Ø¹Ù„Ø§Ù†" },
                bn: { advertisement: "à¦¬à¦¿à¦œà§à¦žà¦¾à¦ªà¦¨" },
                br: { advertisement: "Bomm bruderezh" },
                ca: { advertisement: "Anunci" },
                cs: { advertisement: "Reklama" },
                de: { advertisement: "Anzeige", "learn-more": "Erfahre mehr" },
                es: { advertisement: "Anuncio", "learn-more": "Conoce mÃ¡s" },
                eu: { advertisement: "Iragarkia" },
                fa: { advertisement: "ØªØ¨Ù„ÛŒØºØ§Øª" },
                fo: { advertisement: "LÃ½sing" },
                fr: { advertisement: "PublicitÃ©", "learn-more": "En savoir plus" },
                fy: { advertisement: "Advertinsje" },
                gl: { advertisement: "Anuncio" },
                gv: { advertisement: "Soilsheen" },
                he: { advertisement: "×¤×¨×¡×•×ž×ª" },
                hu: { advertisement: "HirdetÃ©s" },
                id: { advertisement: "Iklan", "learn-more": "Baca Selengkapnya" },
                inh: { advertisement: "Ð´ÐµÐ±Ð°Ñ‚" },
                it: { advertisement: "PubblicitÃ ", "learn-more": "Ulteriori informazioni" },
                ja: { advertisement: "åºƒå‘Š", "learn-more": "ã‚‚ã£ã¨è¦‹ã‚‹" },
                ko: { advertisement: "ê´‘ê³ " },
                krc: { advertisement: "PÐµÐºÐ»Ð°Ð¼Ð°" },
                lb: { advertisement: "Reklamm" },
                mk: { advertisement: "PÐµÐºÐ»Ð°Ð¼Ð°" },
                mr: { advertisement: "à¤œà¤¾à¤¹à¤¿à¤°à¤¾à¤¤" },
                ms: { advertisement: "Iklan" },
                nl: { advertisement: "Advertentie", "learn-more": "Meer te weten komen" },
                no: { advertisement: "Reklame" },
                pl: { advertisement: "Reklama", "learn-more": "Czytaj wiÄ™cej" },
                ps: { advertisement: "Ø®Ø¨Ø±ØªÙŠØ§" },
                pt: { advertisement: "AnÃºncio", "learn-more": "Saiba Mais" },
                "roa-tara": { advertisement: "PubblecetÃ " },
                ru: { advertisement: "PÐµÐºÐ»Ð°Ð¼Ð°", "learn-more": "Ð£Ð·Ð½Ð°Ñ‚ÑŒ Ð±Ð¾Ð»ÑŒÑˆÐµ" },
                si: { advertisement: "à¶´à·Šâ€à¶»à¶ à·à¶»à¶š à¶¯à·à¶±à·Šà·€à·“à¶¸" },
                sl: { advertisement: "Oglas" },
                "sr-ec": { advertisement: "PÐµÐºÐ»Ð°Ð¼Ð°" },
                sv: { advertisement: "Annons" },
                te: { advertisement: "à°µà°¾à°£à°¿à°œà±à°¯ à°ªà±à°°à°•à°Ÿà°¨" },
                th: { advertisement: "à¸à¸²à¸£à¹‚à¸†à¸©à¸“à¸²" },
                tr: { advertisement: "Reklam" },
                "tt-cyrl": { advertisement: "PÐµÐºÐ»Ð°Ð¼Ð°" },
                uk: { advertisement: "PÐµÐºÐ»Ð°Ð¼Ð°" },
                vi: { advertisement: "Quáº£ng cÃ¡o" },
                "zh-hans": { advertisement: "å¹¿å‘Š", "learn-more": "äº†è§£æ›´å¤š" },
                "zh-hant": { advertisement: "å»£å‘Š", "learn-more": "é–±è®€æ›´å¤š" },
            };
            function ys(e) {
                const t = Y.get("wiki.targeting.wikiLanguage");
                return bs[t && void 0 !== bs[t] ? t : "en"][e] || bs.en[e];
            }
            function _s() {
                document.querySelectorAll(".ae-translatable-label").forEach((e) => {
                    const t = ys(e.dataset.key);
                    t && (e.innerText = t);
                });
            }
            function Ss(e) {
                let t;
                return {
                    cancel() {
                        clearTimeout(t);
                    },
                    promise: new Promise((i) => {
                        t = setTimeout(() => i(e), e);
                    }),
                };
            }
            const Es = new (class {
                sample(e, t, i = 100) {
                    return (
                        !!(function (e) {
                            return -1 !== (U.get("ignored_samplers") || "").split(",").indexOf(e);
                        })(e) ||
                        (function (e, t) {
                            return Math.floor(Math.random() * (t - 0)) + 0;
                        })(0, i) < t
                    );
                }
            })();
            function ws() {
                return ["fandom.com", "tvguide.com", "metacritic.com", "gamespot.com", "giantbomb.com", "muthead.com", "futhead.com", "fandom-ae-assets.s3.amazonaws.com", "fanatical.com"].find((e) => window.location.hostname.includes(e))
                    ? "https://services.fandom.com/"
                    : "https://services.fandom-dev." + (location.hostname.match(/(?!\.)(pl|us)$/) || ["us"])[0] + "/";
            }
            const As = ["preroll", "midroll", "postroll"];
            function Ts(e, t = {}, i = !0) {
                const n = ji.dump() || {},
                    s = {};
                Object.keys(n).forEach((e) => {
                    !(function (e, t) {
                        "function" == typeof t ? (s[e] = t()) : "undefined" !== t && null !== t && (s[e] = t);
                    })(e, n[e]);
                }),
                    Gt.emit(Bt.AD_ENGINE_INVALIDATE_SLOT_TARGETING, { slot: e });
                const o = Object.assign(Object.assign(Object.assign({}, s), e.getTargeting()), t),
                    r = Object.keys(o)
                        .filter((e) => o[e])
                        .map((e) => `${e}=${o[e]}`)
                        .join("&");
                return i ? encodeURIComponent(r) : r;
            }
            function Is() {
                return Math.round(1e10 * Math.random());
            }
            function Cs(e, t, i = {}) {
                const n = [
                        "output=xml_vast4",
                        "env=vp",
                        "gdfp_req=1",
                        "impl=s",
                        "unviewed_position_start=1",
                        `url=${encodeURIComponent(window.location.href)}`,
                        `description_url=${encodeURIComponent(window.location.href)}`,
                        `correlator=${Is()}`,
                    ],
                    s = $n.get(t),
                    o = ji.get("ppid"),
                    r = ji.get("over18");
                if ((r && n.push(`over_18=${r}`), o && n.push(`ppid=${o}`), gn() && n.push("tfcd=1"), s))
                    n.push(`iu=${s.getVideoAdUnit()}`),
                        n.push(
                            `sz=${(function (e) {
                                const t = e.getVideoSizes();
                                return t ? t.map((e) => e.join("x")).join("|") : "640x480";
                            })(s)}`
                        ),
                        n.push(`cust_params=${Ts(s, i.targeting)}`);
                else {
                    if (!i.videoAdUnitId || !i.customParams) throw Error("Slot does not exist!");
                    n.push(`iu=${i.videoAdUnitId}`), n.push("sz=640x480"), n.push(`cust_params=${encodeURIComponent(i.customParams)}`);
                }
                return (
                    i.contentSourceId && i.videoId && (n.push(`cmsid=${i.contentSourceId}`), n.push(`vid=${i.videoId}`)),
                    i.vpos && As.indexOf(i.vpos) > -1 && n.push(`vpos=${i.vpos}`),
                    void 0 !== i.numberOfAds && n.push(`pmad=${i.numberOfAds}`),
                    n.push("rdp=" + (Zi() ? 1 : 0)),
                    "https://pubads.g.doubleclick.net/gampad/ads?" + n.join("&")
                );
            }
            function Ns(e = {}) {
                const t = ji.get("ppid"),
                    i = ji.get("over18"),
                    n = [`c=${Is()}`, "tile=1", "d_imp=1"];
                return (
                    n.push(`iu=${e.adUnit}`),
                    n.push(`sz=${e.size}`),
                    i && n.push(`over_18=${i}`),
                    t && n.push(`ppid=${t}`),
                    gn() && n.push("tfcd=1"),
                    e.targeting &&
                        n.push(
                            `t=${encodeURIComponent(
                                Object.keys(e.targeting)
                                    .filter((t) => e.targeting[t])
                                    .map((t) => `${t}=${e.targeting[t]}`)
                                    .join("&")
                            )}`
                        ),
                    n.push("rdp=" + (Zi() ? 1 : 0)),
                    "https://securepubads.g.doubleclick.net/gampad/adx?" + n.join("&")
                );
            }
            class Os {
                static containsValue(e, t) {
                    const i = t.toUpperCase();
                    return e.some((e) => e.toUpperCase() === i);
                }
                getHostnamePrefix() {
                    const e = window.location.hostname.toLowerCase(),
                        t = /(^|.)(showcase|externaltest|preview|verify|stable|sandbox-[^.]+)\./.exec(e);
                    if (t && t.length > 2) return t[2];
                    const i = e.split(".");
                    return i.length ? i[0] : void 0;
                }
                getRawDbName(e) {
                    return `_${e || "wikia"}`.replace("/[^0-9A-Z_a-z]/", "_");
                }
                getTargetingBundles(e) {
                    const t = ji.get("bundles") || [];
                    try {
                        const i = [];
                        Object.keys(e).forEach((t) => {
                            this.matchesTargetingBundle(e[t]) && i.push(t);
                        }),
                            i.forEach((e) => {
                                Os.containsValue(t, e) || t.push(e);
                            });
                    } catch (e) {
                        yi("targeting-bundles", "Invalid input data!");
                    }
                    return this.applyCodeLevelBundles(t);
                }
                applyCodeLevelBundles(e) {
                    new B().getItem("_ae_intrsttl_imp") && e.push("interstitial_disabled");
                    const t = ji.get("skin");
                    t && t.includes("ucp_") && !Os.containsValue(e, "VIDEO_TIER_1_AND_2_BUNDLE") && e.push("VIDEO_TIER_3_BUNDLE");
                    const i = ji.get("word_count") || -1;
                    return i > -1 && i <= 100 && (e.push("short_page"), Y.set("custom.short_page", !0)), e;
                }
                matchesTargetingBundle(e) {
                    return !Object.keys(e).some((t) => {
                        const i = ji.get(t);
                        if (!i) return !0;
                        if (Array.isArray(i)) {
                            if (!e[t].some((e) => i.includes(e))) return !0;
                        } else if (!e[t].includes(i)) return !0;
                        return !1;
                    });
                }
            }
            const Ps = new Os(),
                Ds = new (class extends Ri {
                    loadScriptWithStatus(e, t, i = !0, n = null, s = {}, o = {}) {
                        const r = Object.create(null, { loadScript: { get: () => super.loadScript } });
                        return p(this, void 0, void 0, function* () {
                            yi(t, "loading"), Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: t + "_started" });
                            const a = yield r.loadScript.call(this, e, i, n, s, o);
                            return Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: t + "_loaded" }), yi(t, "ready"), a;
                        });
                    }
                })();
            function Ls(e = {}, t = []) {
                if (e)
                    return t.find((t) => {
                        if ("string" != typeof t) throw new Error("property name must be a string");
                        return t in e;
                    });
            }
            function ks(e, t = []) {
                const i = Ls(e, t);
                if (i) {
                    const t = e[i];
                    return "function" == typeof t ? t.bind(e) : t;
                }
            }
            const Rs = { randomUUID: "undefined" != typeof crypto && crypto.randomUUID && crypto.randomUUID.bind(crypto) };
            let xs;
            const Us = new Uint8Array(16);
            function Vs() {
                if (!xs && ((xs = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)), !xs))
                    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
                return xs(Us);
            }
            const Ms = [];
            for (let e = 0; e < 256; ++e) Ms.push((e + 256).toString(16).slice(1));
            const js = function (e, t, i) {
                    if (Rs.randomUUID && !t && !e) return Rs.randomUUID();
                    const n = (e = e || {}).random || (e.rng || Vs)();
                    if (((n[6] = (15 & n[6]) | 64), (n[8] = (63 & n[8]) | 128), t)) {
                        i = i || 0;
                        for (let e = 0; e < 16; ++e) t[i + e] = n[e];
                        return t;
                    }
                    return (function (e, t = 0) {
                        return (
                            Ms[e[t + 0]] +
                            Ms[e[t + 1]] +
                            Ms[e[t + 2]] +
                            Ms[e[t + 3]] +
                            "-" +
                            Ms[e[t + 4]] +
                            Ms[e[t + 5]] +
                            "-" +
                            Ms[e[t + 6]] +
                            Ms[e[t + 7]] +
                            "-" +
                            Ms[e[t + 8]] +
                            Ms[e[t + 9]] +
                            "-" +
                            Ms[e[t + 10]] +
                            Ms[e[t + 11]] +
                            Ms[e[t + 12]] +
                            Ms[e[t + 13]] +
                            Ms[e[t + 14]] +
                            Ms[e[t + 15]]
                        ).toLowerCase();
                    })(n);
                },
                Bs = new (class {
                    v4() {
                        return js();
                    }
                })(),
                zs = {
                    addListener: function (e, t, i = {}) {
                        const n = { element: e, callback: t, offsetTop: i.offsetTop || 0, offsetBottom: i.offsetBottom || 0, areaThreshold: i.areaThreshold, inViewport: !1 },
                            s = () => {
                                !(function (e) {
                                    const t = zn(e.element, { topOffset: e.offsetTop, bottomOffset: e.offsetBottom, areaThreshold: e.areaThreshold });
                                    t !== e.inViewport && (e.callback(t), (e.inViewport = t));
                                })(n);
                            };
                        return (n.id = Hn.addCallback(s)), s(), n.id;
                    },
                    removeListener: function (e) {
                        Hn.removeCallback(e);
                    },
                },
                Gs = new (class {
                    get exists() {
                        return !!window.__uspapi;
                    }
                    getSignalData(e) {
                        return new Promise((t) => {
                            window.__uspapi("getUSPData", e, (e) => t(e));
                        });
                    }
                    override(e) {
                        window.__uspapi = e;
                    }
                })(),
                Fs = "a9-apstag";
            class $s {
                static make() {
                    return $s.instance || $s.reset(), $s.instance;
                }
                static reset() {
                    return ($s.instance = new $s()), $s.instance;
                }
                constructor() {
                    (this.renderImpEndCallbacks = []), (this.utils = e), (this.usp = Gs), (this.storage = new wi()), this.insertScript(), this.configure(), this.addRenderImpHook();
                }
                insertScript() {
                    this.script = xi.loadScript("//c.amazon-adsystem.com/aax2/apstag.js", !0, "first");
                }
                hasRecord() {
                    return !!this.storage.getItem("apstagRecord");
                }
                getRecord() {
                    return this.storage.getItem("apstagRecord");
                }
                sendMediaWikiHEM() {
                    const e = Y.get("wiki.opts.userEmailHashes");
                    if (!Array.isArray(e) || 3 !== (null == e ? void 0 : e.length)) return;
                    const t = e[2];
                    this.sendHEM(t);
                }
                sendHEM(e, t) {
                    return p(this, void 0, void 0, function* () {
                        if (e) {
                            if (!Y.get("bidders.a9.hem.cleanup") && Y.get("bidders.a9.hem.enabled"))
                                try {
                                    yield this.script;
                                    const i = !Ji(null == t ? void 0 : t.gdprConsent) || Zi(null == t ? void 0 : t.ccpaSignal),
                                        n = i ? "1" : "0",
                                        s = !!this.storage.getItem("apstagHEMsent", !0),
                                        o = s && this.storage.getItem("apstagHEMsent", !0) < Date.now().toString(),
                                        r = this.storage.getItem("apstagHEMoptOut", !0) && n !== this.storage.getItem("apstagHEMoptOut", !0),
                                        a = { hashedRecords: [{ type: "email", record: e }], optOut: i };
                                    r ? (yi(Fs, "Updating user consents", a, "optOut", i), window.apstag.upa(a)) : (s && !o) || (yi(Fs, "Sending HEM to apstag", a, "optOut", i), window.apstag.rpa(a)),
                                        this.storage.setItem("apstagRecord", e),
                                        this.storage.setItem("apstagHEMsent", (Date.now() + $s.AMAZON_TOKEN_TTL).toString()),
                                        this.storage.setItem("apstagHEMoptOut", n),
                                        Gt.emit(Bt.A9_APSTAG_HEM_SENT);
                                } catch (e) {
                                    yi(Fs, "Error sending HEM to apstag", e);
                                }
                        } else _i(Fs, "Trying to send HEM without source record");
                    });
                }
                configure() {
                    (window.apstag = window.apstag || { _Q: [] }),
                        void 0 === window.apstag.init &&
                            (window.apstag.init = (...e) => {
                                this.configureCommand("i", e);
                            }),
                        void 0 === window.apstag.fetchBids &&
                            (window.apstag.fetchBids = (...e) => {
                                this.configureCommand("f", e);
                            });
                }
                addRenderImpHook() {
                    return p(this, void 0, void 0, function* () {
                        yield this.script;
                        const e = window.apstag.renderImp;
                        window.apstag.renderImp = (...t) => {
                            e(...t);
                            const [i, n] = t;
                            this.renderImpEndCallbacks.forEach((e) => e(i, n));
                        };
                    });
                }
                configureCommand(e, t) {
                    window.apstag._Q.push([e, t]);
                }
                init() {
                    return p(this, void 0, void 0, function* () {
                        let e = null;
                        this.usp.exists && (e = yield this.usp.getSignalData());
                        const t = this.getApstagConfig(e);
                        if ((yield this.script, window.apstag.init(t), Y.get("bidders.a9.hem.cleanup"))) {
                            if (j.get("AMZN-Token") || this.storage.getItem("apstagRecord"))
                                return (
                                    yi(Fs, "Cleaning Amazon Token..."),
                                    window.apstag.dpa(),
                                    this.storage.removeItem("apstagRecord"),
                                    this.storage.removeItem("apstagHEMsent"),
                                    this.storage.removeItem("apstagHEMoptOut"),
                                    void j.remove("AMZN-Token", { path: "/" })
                                );
                            yi(Fs, "Amazon Token already cleaned");
                        }
                        this.hasRecord() && this.sendHEM(this.getRecord()), this.sendMediaWikiHEM();
                    });
                }
                fetchBids(e) {
                    return p(this, void 0, void 0, function* () {
                        return (
                            yield this.script,
                            new Promise((t) => {
                                window.apstag.fetchBids(e, (e) => t(e));
                            })
                        );
                    });
                }
                targetingKeys() {
                    return p(this, void 0, void 0, function* () {
                        return yield this.script, window.apstag.targetingKeys();
                    });
                }
                enableDebug() {
                    return p(this, void 0, void 0, function* () {
                        yield this.script, window.apstag.debug("enable");
                    });
                }
                disableDebug() {
                    return p(this, void 0, void 0, function* () {
                        yield this.script, window.apstag.debug("disable");
                    });
                }
                onRenderImpEnd(e) {
                    return p(this, void 0, void 0, function* () {
                        if ("function" != typeof e) throw new Error("onRenderImpEnd used with callback not being a function");
                        this.renderImpEndCallbacks.push(e);
                    });
                }
                getApstagConfig(e) {
                    var t;
                    const i = Y.get("bidders.a9.amazonId"),
                        n = null !== (t = ji.get("openrtb2", "openrtb2")) && void 0 !== t ? t : {};
                    return ns.log("openrtb2 signals", { signals: JSON.stringify(n) }), Object.assign(Object.assign({ pubID: i, videoAdServer: "DFP", deals: !0 }, $s.getCcpaIfApplicable(e)), { signals: { ortb2: n } });
                }
                static getCcpaIfApplicable(e) {
                    return e && e.uspString ? { params: { us_privacy: e.uspString } } : {};
                }
            }
            $s.AMAZON_TOKEN_TTL = 12096e5;
            const Hs = "A9Provider";
            class qs extends hs {
                static mapResponseToTrackingBidDefinition(e, t, i, n) {
                    return { responseTimestamp: i, timeToRespond: n, bidderName: "a9", buyerId: t.amznp, price: t.amznbid, size: t.amznsz, slotName: ls(e, !0) };
                }
                static isEnabled() {
                    return Y.get("bidders.a9.enabled") && !gn();
                }
                static initApstag() {
                    $s.make();
                }
                constructor(e, t = 2e3, i = "not-defined") {
                    super("a9", e, t),
                        (this.bidderConfig = e),
                        (this.timeout = t),
                        (this.bidGroup = i),
                        (this.loaded = !1),
                        (this.apstag = $s.make()),
                        (this.bids = {}),
                        (this.priceMap = {}),
                        (this.targetingKeys = []),
                        (this.amazonId = this.bidderConfig.amazonId),
                        (this.slots = this.bidderConfig.slots),
                        (this.slotsNames = Object.keys(this.slots)),
                        (this.bidsRefreshing = Y.get("bidders.a9.bidsRefreshing") || {});
                }
                getTargetingKeys() {
                    return this.targetingKeys;
                }
                initIfNotLoaded() {
                    return p(this, void 0, void 0, function* () {
                        this.loaded ||
                            (Y.get("custom.hasFeaturedVideo") &&
                                (Gt.onSlotEvent(Mi.VIDEO_AD_IMPRESSION, ({ slot: e }) => this.removeBids(e)),
                                Gt.onSlotEvent(Mi.VIDEO_AD_ERROR, ({ slot: e }) => this.removeBids(e)),
                                Gt.on(Bt.AD_ENGINE_INVALIDATE_SLOT_TARGETING, ({ slot: e }) => this.invalidateSlotTargeting(e), !1)),
                            yield this.apstag.init(),
                            Gt.on(Bt.AD_ENGINE_CONSENT_UPDATE, (e) => this.apstag.sendHEM(this.apstag.getRecord(), e), !1),
                            Gt.on(
                                Bt.AD_ENGINE_CONSENT_READY,
                                (e) => {
                                    const t = this.apstag.getRecord();
                                    t && this.apstag.sendHEM(t, e);
                                },
                                !1
                            ),
                            (Ji() && !Zi()) || (yi(Hs, "A9 was initialized without consents"), Gt.emit(Bt.A9_WITHOUT_CONSENTS)),
                            (this.loaded = !0));
                    });
                }
                removeBids(e) {
                    const t = ds(e.getSlotName(), !0);
                    delete this.bids[t], e.isVideo() && e.emit(Mi.VIDEO_AD_USED);
                }
                invalidateSlotTargeting(e) {
                    if (Date.parse(ji.get("amznExpirationDate", e.getSlotName())) < new Date().getTime()) {
                        const t = ds(e.getSlotName(), !0);
                        delete this.bids[t],
                            this.targetingKeys.forEach((t) => {
                                ji.remove(t, e.getSlotName());
                            });
                    }
                }
                getA9SlotsDefinitions(e) {
                    return e
                        .filter((e) => cs(e, this.bidGroup, !0))
                        .map((e) => ds(e, !0))
                        .filter((e) => this.isSlotEnabled(e))
                        .map((e) => this.createSlotDefinition(e))
                        .filter((e) => null !== e);
                }
                fetchBids(e, t = !1) {
                    return p(this, void 0, void 0, function* () {
                        if ((yi(Hs, "fetching bids for slots", e), !e || 0 === e.length)) return void yi(Hs, "there is no slots to fetch bids");
                        const i = new Date().getTime(),
                            n = yield this.apstag.fetchBids({ slots: e, timeout: this.timeout }),
                            s = new Date().getTime(),
                            o = new Date(s + qs.VIDEO_TTL);
                        if (
                            (yi(Hs, "bids fetched for slots", e, "bids", n),
                            this.configureApstagOnce(),
                            yield Promise.all(
                                n.map((e) =>
                                    p(this, void 0, void 0, function* () {
                                        const t = e.slotID,
                                            { keys: n, bidTargeting: r } = yield this.getBidTargetingWithKeys(e);
                                        this.updateBidSlot(t, n, r, o), Gt.emit(Bt.BIDDERS_BIDS_RESPONSE, { bidResponse: qs.mapResponseToTrackingBidDefinition(e.slotID, r, s, s - i) });
                                    })
                                )
                            ),
                            this.onBidResponse(),
                            t)
                        ) {
                            const t = e.map((e) => e.slotName);
                            Gt.emit(Bt.BIDDERS_BIDS_REFRESH, { refreshedSlotNames: t });
                        }
                    });
                }
                configureApstagOnce() {
                    qs.isApstagConfigured || ((qs.isApstagConfigured = !0), this.addApstagRenderImpHook(), this.registerVideoBidsRefreshing());
                }
                addApstagRenderImpHook() {
                    yi(Hs, "overwriting window.apstag.renderImp"),
                        this.apstag.onRenderImpEnd((e, t) => {
                            if (!t) return void yi(Hs, "apstag.renderImp() called with 1 argument only");
                            const i = this.getRenderedSlot(t),
                                n = i.getSlotName();
                            i.addClass(qs.A9_CLASS), yi(Hs, `bid used for slot ${n}`), delete this.bids[ds(n, !0)], this.refreshBid(i), i.updateWinningA9BidderDetails();
                        });
                }
                getRenderedSlot(e) {
                    return Object.values($n.slots).filter((t) => t.getTargeting().amzniid === e)[0];
                }
                refreshBid(e) {
                    if (!this.shouldRefreshSlot(e)) return;
                    const t = this.createSlotDefinition(ds(e.getSlotName(), !0));
                    t && (yi(Hs, "refresh bids for slot", t), this.fetchBids([t], !0));
                }
                shouldRefreshSlot(e) {
                    return this.bidsRefreshing.slots.includes(ds(e.getSlotName(), !0));
                }
                createSlotDefinition(e) {
                    const t = this.slots[e],
                        i = { slotName: e, slotID: e };
                    return !t || (!this.bidderConfig.videoEnabled && "video" === t.type) ? null : ("video" === t.type ? (i.mediaType = "video") : (i.sizes = t.sizes), i);
                }
                registerVideoBidsRefreshing() {
                    Gt.onSlotEvent(Mi.VIDEO_AD_IMPRESSION, ({ slot: e }) => this.refreshVideoBids(e)), Gt.onSlotEvent(Mi.VIDEO_AD_ERROR, ({ slot: e }) => this.refreshVideoBids(e));
                }
                refreshVideoBids(e) {
                    this.shouldRefreshSlot(e) && (this.removeBids(e), this.refreshBid(e));
                }
                getBidTargetingWithKeys(e) {
                    return p(this, void 0, void 0, function* () {
                        return yield this.apstag.targetingKeys(), { keys: e.helpers.targetingKeys, bidTargeting: e.targeting };
                    });
                }
                updateBidSlot(e, t, i, n) {
                    (this.bids[e] = {}),
                        t.forEach((t) => {
                            -1 === this.targetingKeys.indexOf(t) && this.targetingKeys.push(t), (this.bids[e][t] = i[t]);
                        }),
                        Y.get(`slots.${e}.isVideo`) && ((this.bids[e].amznExpirationDate = n.toString()), this.targetingKeys.push("amznExpirationDate"));
                }
                callBids() {
                    (this.bids = {}), (this.priceMap = {});
                    const e = this.getA9SlotsDefinitions(this.slotsNames);
                    this.initIfNotLoaded().then(() => this.fetchBids(e));
                }
                calculatePrices() {
                    Object.keys(this.bids).forEach((e) => {
                        this.priceMap[e] = this.bids[e].amznbid;
                    });
                }
                getBestPrice(e) {
                    return p(this, void 0, void 0, function* () {
                        const t = ds(e, !0);
                        return this.priceMap[t] ? { a9: this.priceMap[t] } : {};
                    });
                }
                getTargetingParams(e) {
                    return p(this, void 0, void 0, function* () {
                        return this.bids[ds(e, !0)] || {};
                    });
                }
                isSupported(e) {
                    return !!this.slots[ds(e, !0)];
                }
                isSlotEnabled(e) {
                    const t = Object.keys(Y.get("slots")).some((t) => as(t, !0) === e && $n.getState(t)),
                        i = Y.get(`slots.${e}`);
                    return i && Object.keys(i).length > 0 ? $n.getState(e) : t;
                }
            }
            var Ws, Ks;
            (qs.A9_CLASS = "a9-ad"), (qs.VIDEO_TTL = 6e5), (qs.isApstagConfigured = !1);
            let Ys = class {
                constructor(e = null, t = null) {
                    (this.instantConfig = e), (this.globalTimeout = t), this.resetInitialized();
                }
                isEnabled(e, t = !0) {
                    const i = "string" == typeof e && e.startsWith("ic") ? this.instantConfig.get(e) : this.getContextVariablesValue(e);
                    return t ? i && Y.get("options.trackingOptIn") && !Y.get("options.optOutSale") && !gn() : i;
                }
                setOptions(e) {
                    return (this.options = e), this;
                }
                setInitialized() {
                    this.resolve();
                }
                resetInitialized() {
                    this.initialized = new Promise((e) => {
                        this.resolve = e;
                    });
                }
                call() {}
                execute() {
                    var e;
                    return p(this, void 0, void 0, function* () {
                        (this.initializationTimeout = this.getTimeoutPromise()),
                            this.initializationTimeout.then(() => {
                                this.setInitialized(), this.initialized || yi("base-service-setup", "timeout reached");
                            }),
                            (null === (e = this.options) || void 0 === e ? void 0 : e.dependencies) && (yield Promise.all(this.options.dependencies)),
                            yield this.call(),
                            this.setInitialized();
                    });
                }
                getContextVariablesValue(e) {
                    return "string" == typeof e ? Y.get(e) : e.map((e) => Y.get(e)).reduce((e, t) => e && t, !0);
                }
                getTimeoutPromise() {
                    var e;
                    return (null === (e = this.options) || void 0 === e ? void 0 : e.timeout)
                        ? new Promise((e) => {
                              setTimeout(e, this.options.timeout);
                          })
                        : new Vi(() => !!this.globalTimeout).until().then(() => {
                              var e, t;
                              return (
                                  (null === (t = null === (e = this.globalTimeout) || void 0 === e ? void 0 : e.get) || void 0 === t ? void 0 : t.call(e, "partner-pipeline")) || this.globalTimeout["partner-pipeline"] || Promise.resolve()
                              );
                          });
                }
            };
            Ys = l([N(), u("design:paramtypes", ["function" == typeof (Ws = void 0 !== Pi && Pi) ? Ws : Object, "function" == typeof (Ks = void 0 !== vs && vs) ? Ks : Object])], Ys);
            const Qs = "audigent",
                Xs = () => void 0 !== window.au_seg;
            window.au = window.au || [];
            class Js extends Ys {
                constructor() {
                    super(...arguments), (this.isLoaded = !1);
                }
                static loadSegmentLibrary() {
                    Js.segmentsScriptLoader = xi.loadScript("https://seg.ad.gt/api/v1/s/158", !0, "first").then(() => {
                        Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: "audigent_segment_library_loaded" });
                    });
                }
                loadMatchesLibrary() {
                    this.matchesTagScriptLoader = xi.loadScript("https://a.ad.gt/api/v1/u/matches/158", !0, "first").then(() => {
                        Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: "audigent_matches_library_loaded" });
                    });
                }
                call() {
                    return p(this, void 0, void 0, function* () {
                        this.isEnabled("icAudigent")
                            ? (ji.set("AU_SEG", "-1"),
                              (Js.sampling = this.instantConfig.get("icAudigentTrackingSampling")),
                              (Js.segmentLimit = this.instantConfig.get("icAudigentSegmentLimit")),
                              !Js.segmentsScriptLoader && Js.loadSegmentLibrary(),
                              !this.matchesTagScriptLoader && this.loadMatchesLibrary(),
                              this.setupSegmentsListener(),
                              this.isLoaded ||
                                  (yi(Qs, "loading..."),
                                  this.matchesTagScriptLoader.then(() => {
                                      yi(Qs, "audience tag script loaded");
                                  }),
                                  Js.segmentsScriptLoader.then(() => {
                                      yi(Qs, "segment tag script loaded"), this.setup();
                                  }),
                                  (this.isLoaded = !0)),
                              yield this.waitForAuSegGlobalSet().then((e) => {
                                  yi(Qs, "Audigent global variable set", e, window.au_seg), this.setup();
                              }))
                            : yi(Qs, "disabled");
                    });
                }
                setup() {
                    Xs() && Js.sliceAndSetSegmentsInTargeting();
                }
                setupSegmentsListener() {
                    yi(Qs, "setting up auSegReady event listener"),
                        document.addEventListener("auSegReady", function (e) {
                            yi(Qs, "auSegReady event received", e), Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: "audigent_segments_ready" }), Js.sliceAndSetSegmentsInTargeting();
                        });
                }
                static sliceAndSetSegmentsInTargeting() {
                    const e = Js.sliceSegments();
                    Js.trackWithExternalLoggerIfEnabled(e), Js.setSegmentsInTargeting(e);
                }
                resetLoadedState() {
                    (this.isLoaded = !1), (this.matchesTagScriptLoader = null), (Js.segmentsScriptLoader = null);
                }
                static sliceSegments() {
                    const e = window.au_seg.segments || [],
                        t = Js.segmentLimit || 0;
                    let i = e.length ? e : "no_segments";
                    return Js.canSliceSegments(i, t) && (i = i.slice(0, t)), yi(Qs, "Sliced segments", i, t, e), i;
                }
                static setSegmentsInTargeting(e) {
                    yi(Qs, "Setting segments in the targeting", e), ji.set("AU_SEG", e);
                }
                static canSliceSegments(e, t) {
                    return t > 0 && "string" != typeof e;
                }
                static trackWithExternalLoggerIfEnabled(e) {
                    const t = 100 * Math.random(),
                        i = Js.sampling || 0;
                    i > 0 && t <= i && "string" != typeof e && ns.log("Audigent segments", { segmentsNo: e.length, segments: e });
                }
                waitForAuSegGlobalSet(e = 5) {
                    const t = Y.get("services.audigent.numberOfTries") || e;
                    return new Vi(Xs, t, 250).until();
                }
            }
            class Zs extends Ys {
                constructor() {
                    super(...arguments), (this.options = { timeout: 1e4 });
                }
                call() {
                    return (
                        this.loadPromise ||
                            (yi("gpt-provider", "loading GPT..."),
                            (this.loadPromise = xi.loadScript("https://securepubads.g.doubleclick.net/tag/js/gpt.js").then(() => {
                                yi("gpt-provider", "ready"), Gt.emit(Bt.AD_ENGINE_GPT_READY, { time: vi() });
                            }))),
                        this.loadPromise
                    );
                }
            }
            var eo, to;
            const io = "//static.wikia.nocookie.net/fandom-ae-assets/prebid.js/",
                no = new RegExp(`^(${io.replaceAll(".", "\\.")})?[^/]+/[^/]+$`);
            let so = class {
                constructor(e, t) {
                    (this.instantConfig = e), (this.gptSetup = t), (this.options = Y.get("options.preload"));
                }
                execute() {
                    var e;
                    return p(this, void 0, void 0, function* () {
                        return Y.set("bidders.prebid.libraryUrl", this.getPrebidLibraryUrl()), this.preloadLibraries(), (null === (e = this.options) || void 0 === e ? void 0 : e.gpt) ? this.gptSetup.call() : Promise.resolve();
                    });
                }
                preloadLibraries() {
                    var e, t, i;
                    (null === (e = this.options) || void 0 === e ? void 0 : e.prebid) &&
                        this.instantConfig.get("icPrebid") &&
                        Ui.init().then(() => {
                            var e;
                            if ((null === (e = this.options) || void 0 === e ? void 0 : e.intentIq) && this.instantConfig.get("icPrebidIntentIQ")) return os.preloadScript();
                        }),
                        (null === (t = this.options) || void 0 === t ? void 0 : t.apstag) && this.instantConfig.get("icA9Bidder") && qs.initApstag(),
                        (null === (i = this.options) || void 0 === i ? void 0 : i.audigent) && this.instantConfig.get("icAudigent") && Js.loadSegmentLibrary();
                }
                getPrebidLibraryUrl() {
                    let e = this.instantConfig.get("icPrebidVersion", "latest/min.js");
                    return no.test(e) || (e = "latest/min.js"), e.startsWith(io) || (e = io + e), e.replaceAll("..", "");
                }
            };
            so = l([N(), u("design:paramtypes", ["function" == typeof (eo = void 0 !== Pi && Pi) ? eo : Object, "function" == typeof (to = void 0 !== Zs && Zs) ? to : Object])], so);
            const oo = "tracking-opt-in-wrapper";
            let ro = class {
                constructor() {
                    (window.ads = window.ads || {}), this.installConsentQueue();
                }
                execute() {
                    return p(this, void 0, void 0, function* () {
                        return new Promise((e) => {
                            yi(oo, "Waiting for consents"),
                                Gt.on(Bt.AD_ENGINE_CONSENT_READY, (t) => {
                                    this.setConsents(t), e();
                                });
                        });
                    });
                }
                setConsents(e) {
                    yi(oo, "TrackingOptIn consents", e),
                        Y.set("options.trackingOptIn", e.gdprConsent),
                        Y.set("options.geoRequiresConsent", e.geoRequiresConsent),
                        Y.set("options.optOutSale", e.ccpaSignal),
                        Y.set("options.geoRequiresSignal", e.geoRequiresSignal);
                }
                installConsentQueue() {
                    (window.ads.consentQueue = new tn(...(window.ads.consentQueue || []))),
                        (window.ads.pushToConsentQueue =
                            window.ads.pushToConsentQueue ||
                            ((e) => {
                                window.ads.consentQueue.push(e);
                            })),
                        Gt.on(Bt.AD_ENGINE_CONSENT_READY, (e) => {
                            window.ads.consentQueue.onItemFlush((t) => {
                                console.warn('[AdEngine] You are using deprecated API to get consent.\nPlease use PostQuecast action "[AdEngine OptIn] set opt in" instead.'), t(e);
                            }),
                                window.ads.consentQueue.flush();
                        });
                }
            };
            function ao(e) {
                return window.mw && window.mw.config ? window.mw.config.get(e) : null;
            }
            ro = l([N(), u("design:paramtypes", [])], ro);
            const lo = {
                AD_ENG_LOAD_TIMES: { name: "AdEngLoadTimes", icbmName: "loadTimes", url: "https://beacon.wikia-services.com/__track/special/adengloadtimes", allowed: { sampling: !0, aggregation: !0, aggregationLimit: 5 } },
                AD_ENG_BIDDERS: { name: "AdEngBidders", icbmName: "bidders", url: "https://beacon.wikia-services.com/__track/special/adengbidders", allowed: { sampling: !1, aggregation: !1 } },
                AD_ENG_VIEWABILITY: { name: "AdEngViewability", icbmName: "viewability", url: "https://beacon.wikia-services.com/__track/special/adengviewability", allowed: { sampling: !1, aggregation: !1 } },
                AD_ENG_PLAYER_INFO: { name: "AdEngPlayerInfo", icbmName: "playerInfo", url: "https://beacon.wikia-services.com/__track/special/adengplayerinfo", allowed: { sampling: !1, aggregation: !1 } },
                KEY_VALS: { name: "KeyVals", icbmName: "kvs", url: "https://beacon.wikia-services.com/__track/special/keyvals", allowed: { sampling: !1, aggregation: !1 } },
                TOPICS: { name: "GoogleTopics", icbmName: "topics", url: "https://beacon.wikia-services.com/__track/special/topics", allowed: { sampling: !1, aggregation: !1 } },
                AD_ENG_AD_SIZE_INFO: { name: "AdEngAdSizeInfo", icbmName: "adSizeInfo", url: "https://beacon.wikia-services.com/__track/special/adengadsizeinfo", allowed: { sampling: !1, aggregation: !1 } },
                AD_ENG_LABRADOR_INFO: { name: "AdEngLabradorInfo", icbmName: "labrador", url: "https://beacon.wikia-services.com/__track/special/adenglabradorinfo", allowed: { sampling: !1, aggregation: !1 } },
                AD_ENG_AD_INFO: { name: "AdEngAdInfo", icbmName: "adInfo", url: "https://beacon.wikia-services.com/__track/special/adengadinfo", allowed: { sampling: !1, aggregation: !1 } },
                IDENTITY_INFO: { name: "IdentityInfo", icbmName: "idInfo", url: "https://beacon.wikia-services.com/__track/special/identityinfo", allowed: { sampling: !1, aggregation: !1 } },
                TRACKING_EVENT: { name: "TrackingEvent", icbmName: "trackingEvent", url: "https://beacon.wikia-services.com/__track/special/trackingevent", allowed: { sampling: !1, aggregation: !1 } },
                VIDEO_PLAYER_EVENT: { name: "VideoPlayerEvent", icbmName: "videoPlayerEvent", url: "https://beacon.wikia-services.com/__track/special/videoplayerevent", allowed: { sampling: !1, aggregation: !1 } },
            };
            var co;
            let uo = class {
                constructor(e) {
                    this.instantConfig = e;
                }
                getPvUniqueId() {
                    return ao("pvUID") || window.pvUID || window.fandomContext.tracking.pvUID;
                }
                getLegacyTrackingParameters() {
                    const e = j.get();
                    return {
                        beaconId: ao("beaconId") || window.beaconId || window.beacon_id || e.wikia_beacon_id,
                        pvNumber: ao("pvNumber") || window.pvNumber || e.pv_number,
                        pvNumberGlobal: ao("pvNumberGlobal") || window.pvNumberGlobal || e.pv_number_global,
                        pvUID: this.getPvUniqueId(),
                        sessionId: ao("sessionId") || window.sessionId || window.session_id || e.tracking_session_id,
                    };
                }
                getNewTrackingParameters() {
                    return p(this, void 0, void 0, function* () {
                        return (
                            yield new Vi(
                                () => {
                                    var e;
                                    return !!(null === (e = window.fandomContext) || void 0 === e ? void 0 : e.tracking);
                                },
                                10,
                                100
                            ).until(),
                            Object.assign({}, window.fandomContext.tracking)
                        );
                    });
                }
                getTrackingParameters(e) {
                    return p(this, void 0, void 0, function* () {
                        return e ? this.getLegacyTrackingParameters() : yield this.getNewTrackingParameters();
                    });
                }
                setTrackingParameters() {
                    return p(this, void 0, void 0, function* () {
                        const e = !this.instantConfig.get("icDisableLegacyTrackingParameters", !1),
                            t = yield this.getTrackingParameters(e);
                        Y.set("wiki", Object.assign(Object.assign({}, Y.get("wiki")), t));
                    });
                }
                execute() {
                    return p(this, void 0, void 0, function* () {
                        yield this.setTrackingParameters(),
                            Y.set("services.dw-tracker.compression", this.instantConfig.get("dwTrafficCompression", !1)),
                            Object.values(lo).forEach((e) => {
                                var t, i;
                                const n = e.name.toLowerCase();
                                e.allowed.sampling && Y.set(`services.dw-tracker-${n}.threshold`, null === (t = this.instantConfig.get("dwTrafficLimits", {})[e.icbmName]) || void 0 === t ? void 0 : t.sample),
                                    Y.set(`services.dw-tracker-${n}.aggregate`, !!e.allowed.aggregation && (null === (i = this.instantConfig.get("dwTrafficLimits", {})[e.icbmName]) || void 0 === i ? void 0 : i.agg));
                            });
                    });
                }
            };
            uo = l([N(), u("design:paramtypes", ["function" == typeof (co = void 0 !== Pi && Pi) ? co : Object])], uo);
            const po = { stateMetric: ["top_leaderboard"], timingMetric: ["top_leaderboard"] };
            class ho {
                constructor(e) {
                    (this.sender = e), (this.isActive = is.isOutboundTrafficAllowed("monitoring-default"));
                }
                initialise() {
                    this.isActive && (this.trackLibInitialization(), this.trackGptLibReady(), this.trackGamSlotRequest(), this.trackGamSlotRendered());
                }
                trackLibInitialization() {
                    this.sender.sendToMeteringSystem({ action: "init", duration: Math.round(vi()) });
                }
                trackGptLibReady() {
                    Gt.on(Bt.AD_ENGINE_GPT_READY, () => {
                        this.sender.sendToMeteringSystem({ action: "gpt-ready", duration: Math.round(vi()) });
                    });
                }
                trackGamSlotRequest() {
                    Gt.onSlotEvent(Mi.SLOT_REQUESTED_EVENT, ({ slot: e }) => {
                        this.sendSlotInfoToMeteringSystem(e, "request");
                    });
                }
                trackGamSlotRendered() {
                    Gt.onSlotEvent(Mi.SLOT_RENDERED_EVENT, ({ slot: e }) => {
                        this.sendSlotInfoToMeteringSystem(e, "render");
                    });
                }
                sendSlotInfoToMeteringSystem(e, t) {
                    po.stateMetric.includes(e.getSlotName()) && this.sender.sendToMeteringSystem({ action: `${t}_${e.getSlotName()}`, duration: Math.round(vi()) });
                }
            }
            const go = new (class {
                constructor(e = !1) {
                    this.isActive = e;
                }
                activate() {
                    this.isActive = !0;
                }
                sendToMeteringSystem(e) {
                    if (!this.isActive) return;
                    const t = this.getEndpointInfoFromContext(),
                        i = this.getEndpointUrlFor("time", t),
                        n = [];
                    Object.entries(e).forEach(([e, t]) => {
                        n.push(`${e}=${encodeURIComponent(t)}`);
                    }),
                        new ms().fetch(`${i}?app=${t.appName}&${n.join("&")}`, 2e3, { mode: "no-cors" });
                }
                getEndpointInfoFromContext() {
                    return { baseUrl: Y.get("services.monitoring.endpoint"), service: Y.get("services.monitoring.service"), appName: Y.get("services.instantConfig.appName") };
                }
                getEndpointUrlFor(e, { baseUrl: t, service: i }) {
                    return [t, i, "api", "adengine", "meter", e].filter((e) => !!e).join("/");
                }
            })();
            var mo;
            let fo = class {
                constructor(e) {
                    this.instantConfig = e;
                }
                execute() {
                    return p(this, void 0, void 0, function* () {
                        const e = ws() || "";
                        Y.set("services.monitoring.endpoint", e.replace(/\/+$/, "")), Y.set("services.monitoring.service", "adeng");
                        const t = this.instantConfig.get("icMonitorTrafficThreshold", { default: 0 }),
                            i = "number" == typeof t ? { default: t } : t;
                        Object.keys(i).forEach((e) => {
                            Y.set(`services.monitoring-${e}.threshold`, i[e]);
                        }),
                            is.isOutboundTrafficAllowed("monitoring-default") && go.activate(),
                            new ho(go).initialise();
                    });
                }
            };
            fo = l([N(), u("design:paramtypes", ["function" == typeof (mo = void 0 !== Pi && Pi) ? mo : Object])], fo);
            class vo {
                constructor(e, t, i = {}, n = {}) {
                    (this.site = e), (this.page = t), (this.tracking = i), (this.partners = n);
                }
            }
            class bo {
                constructor(e, t, i, n, s, o) {
                    (this.categories = "object" == typeof e ? e : null),
                        (this.directedAtChildren = "boolean" == typeof t ? t : null),
                        (this.siteName = "string" == typeof i ? i : null),
                        (this.top1000 = "boolean" == typeof n ? n : null),
                        (this.tags = "object" == typeof s ? s : null),
                        (this.taxonomy = Array.isArray(o) ? o : null);
                }
            }
            class yo {
                constructor(e, t, i, n, s, o, r) {
                    (this.articleId = "number" == typeof e ? e : null),
                        (this.lang = "string" == typeof t ? t : null),
                        (this.pageId = "number" == typeof i ? i : null),
                        (this.pageName = "string" == typeof n ? n : null),
                        (this.pageType = "string" == typeof s ? s : null),
                        (this.tags = "object" == typeof o ? o : null),
                        (this.wordCount = "number" == typeof r ? r : -1);
                }
            }
            var _o;
            !(function (e) {
                (e.BOOKS = "IAB1-1"), (e.MOVIES = "IAB1-5"), (e.MUSIC = "IAB1-6"), (e.TV = "IAB1-7"), (e.CARD_GAMES = "IAB9-7"), (e.COMIC_BOOKS = "IAB9-11"), (e.GAMES = "IAB9-30");
            })(_o || (_o = {}));
            const So = { books: _o.BOOKS, cards: _o.CARD_GAMES, movie: _o.MOVIES, movies: _o.MOVIES, music: _o.MUSIC, comics: _o.COMIC_BOOKS, tv: _o.TV, games: _o.GAMES, gaming: _o.GAMES, videogames: _o.GAMES };
            class Eo {
                constructor(e) {
                    (this.fandomContext = e), (this.categories = new Set());
                }
                get() {
                    var e;
                    const { page: t, site: i } = this.fandomContext,
                        n = this.getCategories(i),
                        s = this.getKeywords(i);
                    return {
                        site: {
                            id: null === (e = t.pageId) || void 0 === e ? void 0 : e.toString(),
                            name: t.pageName,
                            domain: window.location.hostname,
                            cat: n,
                            mobile: "mobile" === pi.getDeviceMode() ? 1 : 0,
                            content: { language: t.lang, context: 5 },
                            keywords: s,
                        },
                        user: {},
                    };
                }
                getCategories(e) {
                    var t;
                    const i = [...e.categories, ...e.taxonomy];
                    return (
                        i.forEach((e) => this.addCategory(e)),
                        i.includes("ent") && (null === (t = null == e ? void 0 : e.tags) || void 0 === t ? void 0 : t.media) && e.tags.media.forEach((e) => this.addCategory(e)),
                        [...this.categories].sort()
                    );
                }
                addCategory(e) {
                    const t = So[e];
                    t && this.categories.add(t);
                }
                getKeywords(e) {
                    var t, i, n, s;
                    return (null == e ? void 0 : e.tags)
                        ? [
                              ...new Set([
                                  ...(null !== (t = e.tags.gnre) && void 0 !== t ? t : []),
                                  ...(null !== (i = e.tags.media) && void 0 !== i ? i : []),
                                  ...(null !== (n = e.tags.theme) && void 0 !== n ? n : []),
                                  ...(null !== (s = e.tags.tv) && void 0 !== s ? s : []),
                              ]),
                          ]
                              .filter(Boolean)
                              .sort()
                              .join(",")
                        : "";
                }
            }
            var wo;
            !(function (e) {
                (e.SITE_CONTEXT = "siteContext"), (e.PAGE_CONTEXT = "pageContext"), (e.COMBINED = "combined");
            })(wo || (wo = {}));
            class Ao {
                constructor(e) {
                    this.fandomContext = e;
                }
                get() {
                    return this.getCommonParams();
                }
                getCommonParams() {
                    var e, t, i, n, s, o;
                    const r = (function () {
                            const e = window.location.hostname
                                    .toLowerCase()
                                    .split(".")
                                    .filter((e) => "www" !== e),
                                t = e.length;
                            return { base: e.slice("co" === e[t - 2] ? -3 : -2).join(""), name: e.slice(0, -1).join(""), tld: e.slice(-1).join("") };
                        })(),
                        a = Y.get("wiki"),
                        d = Y.get("state.isMobile"),
                        l = {
                            ar: window.innerWidth > window.innerHeight ? "4:3" : "3:4",
                            dmn: r.base,
                            geo: Ci.getCountryCode() || "none",
                            hostpre: Ps.getHostnamePrefix(),
                            original_host: (null === (e = a.opts) || void 0 === e ? void 0 : e.isGamepedia) ? "gamepedia" : "fandom",
                            skin: d ? "ucp_mobile" : "ucp_desktop",
                            uap: "none",
                            uap_c: "none",
                            is_mobile: d ? "1" : "0",
                        },
                        c = {
                            artid: (null === (t = this.fandomContext.page.articleId) || void 0 === t ? void 0 : t.toString()) || "",
                            kid_wiki: this.fandomContext.site.directedAtChildren ? "1" : "0",
                            lang: this.fandomContext.page.lang || "unknown",
                            s0: null === (i = this.fandomContext.site.taxonomy) || void 0 === i ? void 0 : i[0],
                            s0c: this.fandomContext.site.categories,
                            s0v: (null === (n = this.fandomContext.site.taxonomy) || void 0 === n ? void 0 : n[1]) || a.targeting.wikiVertical,
                            s1: Ps.getRawDbName(this.fandomContext.site.siteName),
                            s2: this.getAdLayout(this.fandomContext.page.pageType || "article"),
                            wpage: null === (s = this.fandomContext.page.pageName) || void 0 === s ? void 0 : s.toLowerCase(),
                            word_count: (null === (o = this.fandomContext.page.wordCount) || void 0 === o ? void 0 : o.toString()) || "",
                        };
                    return Object.assign(Object.assign(Object.assign({}, l), c), this.getOptionalKeyVals());
                }
                getAdLayout(e) {
                    const t = this.getVideoStatus(),
                        i = !!t.hasVideoOnPage,
                        n = !i && !!document.querySelector(Y.get("templates.incontentAnchorSelector"));
                    return this.updateVideoContext(i, n), "article" !== e ? e : i ? `${t.isDedicatedForArticle ? "fv" : "wv"}-${e}` : n ? `${e}-ic` : e;
                }
                getVideoStatus() {
                    const e = ao("wgArticleFeaturedVideo");
                    return e ? { isDedicatedForArticle: !1 !== e.isDedicatedForArticle, hasVideoOnPage: null === window || void 0 === window ? void 0 : window.canPlayVideo() } : {};
                }
                updateVideoContext(e, t) {
                    Y.set("custom.hasFeaturedVideo", e), Y.set("custom.hasIncontentPlayer", t);
                }
                getOptionalKeyVals() {
                    var e, t, i, n, s, o, r, a;
                    const d = {},
                        l = { cid: U.get("cid"), pv: Y.get("wiki.pvNumber"), pvg: Y.get("wiki.pvNumberGlobal") };
                    return (
                        Object.keys(l).forEach((e) => {
                            l[e] && (d[e] = l[e].toString());
                        }),
                        ((null === (t = null === (e = this.fandomContext.site) || void 0 === e ? void 0 : e.tags) || void 0 === t ? void 0 : t.esrb) ||
                            (null === (n = null === (i = this.fandomContext.site) || void 0 === i ? void 0 : i.tags) || void 0 === n ? void 0 : n.mpa)) &&
                            (d.rating = this.createRatingTag(
                                null === (o = null === (s = this.fandomContext.site) || void 0 === s ? void 0 : s.tags) || void 0 === o ? void 0 : o.esrb,
                                null === (a = null === (r = this.fandomContext.site) || void 0 === r ? void 0 : r.tags) || void 0 === a ? void 0 : a.mpa
                            )),
                        this.fandomContext.site.top1000 && (d.top = "1k"),
                        d
                    );
                }
                createRatingTag(e, t) {
                    const i = [];
                    return e && i.push(...e.map((e) => "esrb:" + e)), t && i.push(...t.map((e) => "mpa:" + e)), i.join(",");
                }
            }
            class To {
                constructor(e) {
                    this.fandomContext = e;
                }
                get() {
                    return this.fandomContext.page.tags;
                }
            }
            class Io {
                constructor(e) {
                    this.fandomContext = e;
                }
                get() {
                    return this.fandomContext.site.tags;
                }
            }
            class Co {
                constructor(e) {
                    (this.tagsToDecorate = e), (this.tagsToAddPrefix = ["gnre", "media", "pform", "pub", "theme", "tv"]);
                }
                get() {
                    return this.addPagePrefixToValues(this.tagsToDecorate.get());
                }
                addPagePrefixToValues(e) {
                    if (!e) return null;
                    const t = {};
                    for (const [i, n] of Object.entries(e))
                        this.tagsToAddPrefix.includes(i)
                            ? ((t[i] = []),
                              n.forEach((e) => {
                                  t[i].push("p_" + e);
                              }))
                            : (t[i] = n);
                    return t;
                }
            }
            class No {
                constructor(e) {
                    this.tagsToCombine = e;
                }
                get() {
                    const e = {};
                    return (
                        this.tagsToCombine.forEach((t) => {
                            this.combineTags(e, t.get());
                        }),
                        e
                    );
                }
                combineTags(e, t) {
                    if (!t) return null;
                    for (const [i, n] of Object.entries(t))
                        this.isRatingTag(i) ||
                            (i in e
                                ? n.forEach((t) => {
                                      e[i].includes(t) || e[i].push(t);
                                  })
                                : (e[i] = Array.from(n)));
                    return e;
                }
                isRatingTag(e) {
                    return ["esrb", "mpa"].includes(e);
                }
            }
            class Oo {
                constructor(e) {
                    this.tagsToSum = e;
                }
                get() {
                    let e = {};
                    return (
                        this.tagsToSum.map((t) => {
                            e = Object.assign(e, t.get());
                        }),
                        e
                    );
                }
            }
            const Po = "Targeting";
            var Do;
            let Lo = class {
                constructor(e) {
                    this.instantConfig = e;
                }
                execute() {
                    const e = (function (e) {
                        var t, i, n, s, o, r, a, d, l, c, u, p, h;
                        return new vo(
                            new bo(
                                null === (t = null == e ? void 0 : e.site) || void 0 === t ? void 0 : t.categories,
                                null === (i = null == e ? void 0 : e.site) || void 0 === i ? void 0 : i.directedAtChildren,
                                null === (n = null == e ? void 0 : e.site) || void 0 === n ? void 0 : n.siteName,
                                null === (s = null == e ? void 0 : e.site) || void 0 === s ? void 0 : s.top1000,
                                null === (o = null == e ? void 0 : e.site) || void 0 === o ? void 0 : o.tags,
                                null === (r = null == e ? void 0 : e.site) || void 0 === r ? void 0 : r.taxonomy
                            ),
                            new yo(
                                null === (a = null == e ? void 0 : e.page) || void 0 === a ? void 0 : a.articleId,
                                null === (d = null == e ? void 0 : e.page) || void 0 === d ? void 0 : d.lang,
                                null === (l = null == e ? void 0 : e.page) || void 0 === l ? void 0 : l.pageId,
                                null === (c = null == e ? void 0 : e.page) || void 0 === c ? void 0 : c.pageName,
                                null === (u = null == e ? void 0 : e.page) || void 0 === u ? void 0 : u.pageType,
                                null === (p = null == e ? void 0 : e.page) || void 0 === p ? void 0 : p.tags,
                                null === (h = null == e ? void 0 : e.page) || void 0 === h ? void 0 : h.wordCount
                            )
                        );
                    })(window.fandomContext);
                    ji.extend(Object.assign(Object.assign({}, ji.dump()), this.getPageLevelTargeting(e))),
                        Y.get("wiki.opts.isAdTestWiki") && Y.get("wiki.targeting.testSrc") ? Y.set("src", [Y.get("wiki.targeting.testSrc")]) : Y.get("wiki.opts.isAdTestWiki") && Y.set("src", ["test"]),
                        Y.get("options.uapExtendedSrcTargeting") &&
                            Gt.on(Bt.AD_ENGINE_UAP_LOAD_STATUS, (e) => {
                                (e.isLoaded || "ruap" === e.adProduct) && Y.push("src", "uap");
                            }),
                        Y.get("wiki.targeting.wikiIsTop1000") && (Y.set("custom.wikiIdentifier", "_top1k_wiki"), Y.set("custom.dbNameForAdUnit", ji.get("s1"))),
                        ji.set("bundles", Ps.getTargetingBundles(this.instantConfig.get("icTargetingBundles")));
                    const t = (() => {
                        var e;
                        const t =
                            null !==
                                (e = (() => {
                                    var e, t;
                                    return null === (t = null === (e = window.optimizely) || void 0 === e ? void 0 : e.get) || void 0 === t ? void 0 : t.call(e, "state").getVariationMap();
                                })()) && void 0 !== e
                                ? e
                                : {};
                        return Object.keys(t).map((e) => `${e}_${t[e].id}`);
                    })();
                    t.length && ji.set("optimizely", t),
                        this.instantConfig.get("icOpenRtb2Context") &&
                            ji.set(
                                "openrtb2",
                                (function (e) {
                                    return new Eo(e).get();
                                })(e),
                                "openrtb2"
                            );
                }
                getPageLevelTargeting(e) {
                    const t = this.instantConfig.get("icTargetingStrategy");
                    return (
                        yi("Targeting", `Selected targeting priority strategy: ${t}`),
                        (function (e, t) {
                            switch (e) {
                                case wo.SITE_CONTEXT:
                                    return yi(Po, "Executing SiteContext strategy..."), new Oo([new Ao(t), new Io(t)]);
                                case wo.PAGE_CONTEXT:
                                    return yi(Po, "Executing PageContext strategy..."), new Oo([new Ao(t), new Co(new To(t))]);
                                case wo.COMBINED:
                                default:
                                    return yi(Po, "Executing Combined strategy..."), new Oo([new Ao(t), new No([new Io(t), new Co(new To(t))])]);
                            }
                        })(t, e).get()
                    );
                }
            };
            Lo = l([N(), u("design:paramtypes", ["function" == typeof (Do = void 0 !== Pi && Pi) ? Do : Object])], Lo);
            class ko {
                afterDocumentCompleted() {
                    return p(this, void 0, void 0, function* () {
                        return new Promise((e, t) => {
                            "complete" === document.readyState ? e() : t();
                        });
                    });
                }
            }
            class Ro {
                constructor(e, t, i) {
                    (this.tasksList = e), (this.batchSize = t), (this.delay = i), (this.batchedTasks = []), this.batchTasks();
                }
                batchTasks() {
                    this.batchedTasks = [...this.tasksList].reduce((e, t, i) => {
                        const n = Math.floor(i / this.batchSize);
                        return e[n] || (e[n] = []), e[n].push(t), e;
                    }, []);
                }
                dispatchEventsWithTimeout(e) {
                    const t = setInterval(() => {
                        this.batchedTasks.length <= 0 ? clearInterval(t) : this.batchedTasks.shift().forEach((t) => e(t));
                    }, this.delay);
                }
            }
            class xo {
                constructor() {
                    this.contentEncoding = "gzip";
                }
                compressionSupported() {
                    return (
                        void 0 !== this.browserSupportsCompression ||
                            ((this.browserSupportsCompression = "function" == typeof fs("CompressionStream") && "function" == typeof fs("TextEncoder")),
                            this.browserSupportsCompression || yi("dw_gzip_compressor_debug", "DwAggregatedDataGzipCompressor", "Compression API not supported")),
                        this.browserSupportsCompression
                    );
                }
                compress(e) {
                    return p(this, void 0, void 0, function* () {
                        try {
                            if (!this.compressionSupported()) return { compressed: e };
                            const t = this.buildStream(e),
                                i = this.gzipStream(t),
                                n = yield this.readStream(i);
                            return yi("dw_gzip_compressor_debug", "DwAggregatedDataGzipCompressor", { uncompressedStringLen: e.length, compressedBytesLen: n.byteLength }), { compressed: n, contentEncoding: this.contentEncoding };
                        } catch (t) {
                            return yi("dw_gzip_compressor_debug", "DwAggregatedDataGzipCompressor", "Error while compressing data, returning uncompressed data instead.", { error: t }), { compressed: e };
                        }
                    });
                }
                buildStream(e) {
                    const t = new TextEncoder().encode(e);
                    return new ReadableStream({
                        start(e) {
                            e.enqueue(t), e.close();
                        },
                    });
                }
                gzipStream(e) {
                    return e.pipeThrough(new CompressionStream("gzip"));
                }
                readStream(e) {
                    return p(this, void 0, void 0, function* () {
                        const t = [],
                            i = e.getReader();
                        let n;
                        for (; !n; ) {
                            const { done: e, value: s } = yield i.read();
                            e || t.push(s), (n = e);
                        }
                        const s = new Uint8Array(t.reduce((e, t) => e + t.byteLength, 0));
                        let o = 0;
                        for (const e of t) s.set(new Uint8Array(e.buffer), o), (o += e.byteLength);
                        return s;
                    });
                }
            }
            const Uo = "dw-track-sender";
            class Vo {
                constructor(e = new xo()) {
                    this.dataCompressor = e;
                }
                sendTrackData(e, t) {
                    const i = `${e}_v2`;
                    this.isCompressionEnabled()
                        ? this.dataCompressor.compress(JSON.stringify(t)).then((e) => {
                              this.sendRequest(i + e.contentEncoding || "", e.compressed);
                          })
                        : this.sendRequest(i, JSON.stringify(t));
                }
                isCompressionEnabled() {
                    return Y.get("services.dw-tracker.compression") && this.dataCompressor.compressionSupported();
                }
                sendRequest(e, t) {
                    fetch(e, { method: "POST", body: t }).then((t) => {
                        200 === t.status ? yi(Uo, { status: "success", url: e }) : yi(Uo, { status: "failed", url: e });
                    });
                }
            }
            const Mo = new (class {
                    constructor() {
                        (this.AGGREGATION_SECONDS_OFF = 5), (this.SEND_DATA_INTERVAL = 1e3), (this.AGGREGATION_LIMIT_PER_TRACK = 5), (this.sender = new Vo()), (this.tracksQueues = {}), (this.enabled = !0), (this.count = 0), this.start();
                    }
                    isAggregatorActive() {
                        return this.enabled;
                    }
                    push(e, t) {
                        this.tracksQueues[e.name] || (this.tracksQueues[e.name] = { track: e, params: [] }),
                            this.tracksQueues[e.name].params.push(t),
                            this.tracksQueues[e.name].params.length >= this.getAggregationLimit(e) && this.fireAggregatedQueueByTrack(e);
                    }
                    getAggregationLimit(e) {
                        var t;
                        return null !== (t = e.allowed.aggregationLimit) && void 0 !== t ? t : this.AGGREGATION_LIMIT_PER_TRACK;
                    }
                    fireAggregatedQueue() {
                        Object.keys(this.tracksQueues).forEach((e) => {
                            this.fireAggregatedQueueByTrack(this.tracksQueues[e].track);
                        });
                    }
                    fireAggregatedQueueByTrack(e) {
                        var t, i;
                        const n = [];
                        null === (i = null === (t = this.tracksQueues[e.name]) || void 0 === t ? void 0 : t.params) || void 0 === i || i.forEach((e) => n.push(e)),
                            0 !== n.length && (this.sender.sendTrackData(this.tracksQueues[e.name].track.url, n), (this.tracksQueues[e.name] = { track: e, params: [] }));
                    }
                    start() {
                        const e = setInterval(() => {
                            this.fireAggregatedQueue(), this.count++, this.count >= this.AGGREGATION_SECONDS_OFF && ((this.enabled = !1), clearInterval(e));
                        }, this.SEND_DATA_INTERVAL);
                        window.addEventListener("visibilitychange", () => {
                            document.hidden && this.fireAggregatedQueue();
                        });
                    }
                })(),
                jo = lo.TRACKING_EVENT.url,
                Bo = lo.VIDEO_PLAYER_EVENT.url;
            let zo = class {
                constructor() {
                    (this.eventsArray = []), (this.adEngineStageSetup = new ko()), this.init();
                }
                init() {
                    Y.get("options.delayEvents.enabled") &&
                        document.addEventListener("readystatechange", () => {
                            "complete" === document.readyState && this.dispatchAndEmptyEventArray();
                        });
                }
                track(e, t) {
                    if (t && !is.isOutboundTrafficAllowed(`dw-tracker-${t.name.toLowerCase()}`)) return;
                    const i = Object.assign(Object.assign({}, this.getDataWarehouseParams()), e);
                    t ? this.sendCustomEvent(i, t) : this.sendTrackEvent(i);
                }
                getDataWarehouseParams() {
                    return {
                        session_id: Y.get("wiki.sessionId") || "unknown",
                        pv_number: Y.get("wiki.pvNumber"),
                        pv_number_global: Y.get("wiki.pvNumberGlobal"),
                        pv_unique_id: Y.get("wiki.pvUID"),
                        beacon: Y.get("wiki.beaconId") || "unknown",
                        c: Y.get("wiki.wgCityId") || "unknown",
                        ck: Y.get("wiki.dsSiteKey") || "unknown",
                        lc: Y.get("wiki.wgUserLanguage") || "unknown",
                        s: ji.get("skin") || "unknown",
                        ua: window.navigator.userAgent,
                        u: Ji() ? Y.get("options.userId") || 0 : -1,
                        a: parseInt(ji.get("artid") || -1),
                        x: Y.get("wiki.wgDBname") || "unknown",
                        n: Y.get("wiki.wgNamespaceNumber") || -1,
                    };
                }
                sendCustomEvent(e, t) {
                    const i = Object.assign(Object.assign({}, e), this.getTimeBasedParams());
                    Y.get(`services.dw-tracker-${t.name.toLowerCase()}.aggregate`) && Mo.isAggregatorActive() && Mo.push(t, i);
                    const n = this.buildDataWarehouseUrl(i, t.url);
                    this.handleDwEvent(n, i);
                }
                sendTrackEvent(e, t = "Event") {
                    const i = Object.assign(Object.assign({}, e), this.getTimeBasedParams());
                    (i.ga_category = i.category || ""), (i.ga_label = i.label || ""), (i.ga_action = i.action || ""), (i.ga_value = i.value || ""), delete i.category, delete i.label, delete i.action, delete i.value;
                    let n = this.buildDataWarehouseUrl(i, jo);
                    this.handleDwEvent(n, i, t), "videoplayerevent" === i.eventName && ((n = this.buildDataWarehouseUrl(i, Bo)), this.handleDwEvent(n, i, t));
                }
                dispatchAndEmptyEventArray() {
                    const { batchSize: e, delay: t } = Y.get("options.delayEvents");
                    new Ro(this.eventsArray, e, t).dispatchEventsWithTimeout(this.sendRequest), (this.eventsArray = []);
                }
                getTimeBasedParams() {
                    return { cb: Math.floor(99999 * Math.random()), url: document.URL };
                }
                buildDataWarehouseUrl(e, t) {
                    if (!t) {
                        const e = "Error building DW tracking URL";
                        throw (yi("data-warehouse-trackingParams", e), new Error(e));
                    }
                    return `${t}?${U.stringify(e)}`;
                }
                handleDwEvent(e, t, i = "Event") {
                    const n = { url: e, params: t, type: i };
                    Y.get("options.delayEvents.enabled")
                        ? this.adEngineStageSetup
                              .afterDocumentCompleted()
                              .then(() => {
                                  this.sendRequest(n);
                              })
                              .catch(() => {
                                  this.eventsArray.push(n);
                              })
                        : this.sendRequest(n);
                }
                sendRequest({ url: e, params: t, type: i = "Event" }) {
                    const n = new XMLHttpRequest();
                    n.open("GET", e, !0),
                        (n.responseType = "json"),
                        n.addEventListener("load", () => yi(`DW - Track ${i} Success`, { url: e, params: t })),
                        n.addEventListener("error", (n) => yi(`DW - Track ${i} Failed`, { url: e, params: t, err: n })),
                        n.send();
                }
            };
            zo = l([N(), u("design:paramtypes", [])], zo);
            const Go = {
                ad_engine_configured: Bt.AD_ENGINE_CONFIGURED,
                ad_engine_stack_start: Bt.AD_ENGINE_STACK_START,
                prebid_auction_started: Bt.BIDDERS_BIDS_CALLED,
                prebid_auction_ended: Bt.BIDDERS_AUCTION_DONE,
                live_connect_cached: Bt.LIVE_CONNECT_CACHED,
                live_connect_started: Bt.LIVE_CONNECT_STARTED,
                live_connect_responded_uuid: Bt.LIVE_CONNECT_RESPONDED_UUID,
                a9_without_consents: Bt.A9_WITHOUT_CONSENTS,
                a9_apstag_hem_sent: Bt.A9_APSTAG_HEM_SENT,
                yahoo_loaded: Bt.YAHOO_LOADED,
            };
            class Fo {
                constructor() {
                    (this.dataWarehouseTracker = new zo()), this.initStartTime(), this.initLoadTimesTracker();
                }
                static make() {
                    return Fo.instance || (Fo.instance = new Fo()), Fo.instance;
                }
                initStartTime() {
                    const e = new Date();
                    this.startTime || ((this.startTime = fi()), (this.tzOffset = e.getTimezoneOffset())), Gt.emit(Bt.AD_ENGINE_LOAD_TIME_INIT, { timestamp: this.startTime });
                }
                getStartTime() {
                    return this.startTime;
                }
                getTimezoneOffset() {
                    return this.tzOffset;
                }
                initLoadTimesTracker() {
                    Gt.on(Bt.AD_ENGINE_LOAD_TIME_INIT, (e) => {
                        this.trackLoadTime("load_time_init", e.timestamp);
                    }),
                        Object.keys(Go).forEach((e) => {
                            Gt.on(Go[e], () => {
                                this.trackLoadTime(e, Date.now());
                            });
                        }),
                        Gt.on(Bt.AD_ENGINE_SLOT_LOADED, (e) => {
                            "top_leaderboard" == e.name && this.trackLoadTime("top_leaderboard_loaded", Date.now());
                        }),
                        Gt.on(
                            Bt.PARTNER_LOAD_STATUS,
                            ({ status: e }) => {
                                this.trackLoadTime(e, Date.now());
                            },
                            !1
                        );
                }
                trackLoadTime(e, t) {
                    this.dataWarehouseTracker.track({ event_name: e, browser_ts: t, load_time: t - this.getStartTime(), tz_offset: this.getTimezoneOffset(), country: Ci.getCountryCode() || "" }, lo.AD_ENG_LOAD_TIMES);
                }
            }
            let $o = class {
                execute() {
                    Fo.make();
                }
            };
            $o = l([N()], $o);
            const Ho = new (class {
                    constructor() {
                        this.storage = new wi();
                    }
                    isAvailable() {
                        return this.storage.isAvailable();
                    }
                    getItem(e) {
                        const t = this.storage.getItem(e);
                        return !(!t || "string" == typeof t) && (this.isExpired(t) ? (this.delete(e), !1) : t.data);
                    }
                    setItem(e, t, i) {
                        if (!this.isStorable(t)) return !1;
                        const n = { data: t, expires: i ? 1e3 * i + Date.now() : void 0 };
                        return this.storage.setItem(e, n), !0;
                    }
                    delete(e) {
                        this.storage.removeItem(e);
                    }
                    isStorable(e) {
                        const t = !["function", "number", "undefined"].some((t) => typeof e === t),
                            i = !("number" == typeof e && isNaN(e));
                        return t && i;
                    }
                    isExpired(e) {
                        return !!e.expires && e.expires && Date.now() >= e.expires;
                    }
                })(),
                qo = new (class {
                    addVariable(e, t) {
                        (window.ads.runtime = window.ads.runtime || {}), (window.ads.runtime[e] = t);
                    }
                })(),
                Wo = "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
                Ko = 600,
                Yo = "none",
                Qo = "none",
                Xo = ["uap", "vuap"],
                Jo = "/5441/uap",
                Zo = 3e3,
                er = 2e3,
                tr = "force-unstick",
                ir = "unsticked",
                nr = "sticked",
                sr = "sticky-ready",
                or = "sticky-skipped",
                rr = "stickiness-disabled",
                ar = "video-done",
                dr = { bfaSize: { desktop: [3, 3], mobile: [2, 2], unified: [2, 3] }, companionSizes: { "4x4": { size: [4, 4], originalSize: [300, 250] }, "5x5": { size: [5, 5], originalSize: [300, 600] } } };
            let lr = Yo,
                cr = Yo,
                ur = Qo;
            function pr() {
                return cr;
            }
            function hr(e, t) {
                (cr = e || Yo), (lr = t || Yo), fr(cr, lr);
            }
            function gr() {
                return ur;
            }
            function mr(e) {
                ur = e;
            }
            function fr(e, t) {
                const i = Y.get("slots") || {};
                Object.keys(i).forEach((i) => {
                    ji.set("uap", e, i), ji.set("uap_c", t, i);
                });
            }
            const vr = Object.assign(Object.assign({}, t), {
                init(e, t = [], i = []) {
                    qo.addVariable("disableBtf", !0);
                    let n = "uap";
                    this.isVideoEnabled(e) && (n = "vuap"),
                        (e.adProduct = e.adProduct || n),
                        hr(e.lineItemId || e.uap, e.creativeId),
                        (function (e) {
                            e.forEach((e) => {
                                $n.disable(e);
                            });
                        })(i),
                        (function (e) {
                            e.forEach((e) => {
                                sn.unblock(e);
                            });
                        })(t),
                        mr(e.adProduct),
                        e.slotName &&
                            (function (e) {
                                const t = $n.get(e.slotName);
                                (e.container = t.getElement()),
                                    e.isDarkTheme && e.container.classList.add("is-dark"),
                                    e.isMobile && e.container.classList.add("is-mobile-layout"),
                                    (pi.isSmartphone() || pi.isTablet()) && e.container.classList.add("is-mobile-device"),
                                    e.useVideoSpecialAdUnit && t.setConfigProperty("videoAdUnit", Jo);
                            })(e);
                },
                isFanTakeoverLoaded: function () {
                    return pr() !== Yo && -1 !== Xo.indexOf(gr());
                },
                getType: gr,
                getUapId: pr,
                isVideoEnabled: (e) => e.thumbnail,
                reset: function () {
                    mr(Qo), hr(Yo, Yo);
                },
                updateSlotsTargeting: fr,
            });
            Gt.action$
                .pipe(
                    zt(Gt.getGlobalAction(Bt.AD_ENGINE_SLOT_EVENT)),
                    Vt((e) => !!Y.get(`slots.${e.adSlotName}.firstCall`) && [Mi.TEMPLATES_LOADED, Yi.STATUS_COLLAPSE, Yi.STATUS_FORCED_COLLAPSE].map((t) => e.event === t).some((e) => !!e)),
                    Mt(1)
                )
                .subscribe(() => {
                    Gt.emit(Bt.AD_ENGINE_UAP_LOAD_STATUS, { isLoaded: vr.isFanTakeoverLoaded(), adProduct: vr.getType() });
                });
            const br = new Date();
            function yr() {
                return `adEngine_resolvedStateCounter_${vr.getUapId()}`;
            }
            const _r = function () {
                    Ho.setItem(yr(), { adId: vr.getUapId(), lastSeenDate: br.getTime() }, 86400);
                },
                Sr = function () {
                    const e = Ho.getItem(yr());
                    return !!e && br.getTime() !== e.lastSeenDate;
                };
            let Er = !1;
            function wr() {
                return U.get("resolved_state");
            }
            const Ar = function (e) {
                    let t = !1;
                    if (
                        (function (e) {
                            return !(!e.image1 || !e.image1.resolvedStateSrc) || "vuap" === e.adProduct;
                        })(e)
                    ) {
                        const e = !([!1, "blocked", "false", "0"].indexOf(wr()) > -1);
                        let i = !0;
                        e && (i = Sr() || [!0, "true", "1"].indexOf(wr()) > -1 || Er), (t = e && i);
                    }
                    return t;
                },
                Tr = () => {
                    _r();
                },
                Ir = function () {
                    Er = !0;
                };
            function Cr(e) {
                return (
                    (function (e) {
                        const t = Y.get("slotGroups") || {},
                            i = Object.keys(t).filter((i) => -1 !== t[i].indexOf(e));
                        return 1 === i.length ? i[0] : null;
                    })(e.toUpperCase()) || "OTHER"
                );
            }
            function Nr(e, t) {
                return Dn.build(Y.get(`slots.${e}.videoAdUnit`) || Y.get("vast.adUnitId"), { slotConfig: t });
            }
            const Or = new (class {
                addSlotSize(e, t) {
                    if (!Y.get(`slots.${e}`)) throw new Error(`Requested ad slot is not defined in the ad context (${e})`);
                    Y.push(`slots.${e}.defaultSizes`, t);
                    const i = Y.get(`slots.${e}.sizes`);
                    i &&
                        i.forEach((e) => {
                            e.sizes.push(t);
                        });
                }
                removeSlotSize(e, t) {
                    if (!Y.get(`slots.${e}`)) throw new Error("Requested ad slot is not defined in the ad context");
                    const i = Y.get(`slots.${e}.defaultSizes`).filter((e) => e != t),
                        n = Y.get(`slots.${e}.sizes`).map((e) => e.sizes.filter((e) => e != t));
                    Y.set(`slots.${e}.defaultSizes`, i), Y.set(`slots.${e}.sizes`, n);
                }
                setSlotSize(e, t) {
                    if (!Y.get(`slots.${e}`)) throw new Error("Requested ad slot is not defined in the ad context");
                    Y.set(`slots.${e}.sizes`, []), Y.set(`slots.${e}.defaultSizes`, [t]);
                }
                setupSlotVideoContext() {
                    Gt.on(
                        Bt.AD_ENGINE_SLOT_ADDED,
                        ({ slot: e }) => {
                            Y.onChange(`slots.${e.getSlotName()}.audio`, () => this.setupSlotParameters(e)), Y.onChange(`slots.${e.getSlotName()}.videoDepth`, () => this.setupSlotParameters(e));
                        },
                        !1
                    );
                }
                setupCustomPlayerAdUnit(e = "incontent_player") {
                    Gt.on(Bt.AD_ENGINE_STACK_START, () => {
                        const t = Nr(e, { group: "VIDEO", adProduct: "incontent_video", slotNameSuffix: "" });
                        qo.addVariable("video", { adUnit: t });
                    });
                }
                setupSlotVideoAdUnit(e, t) {
                    const i = (function (e, t, i) {
                            let n = e;
                            return Xo.includes(i) && (n = `UAP_${t.toUpperCase()}`), { adGroup: Cr(n), adProduct: n.toLowerCase() };
                        })(e.getSlotName(), t.type, t.adProduct),
                        n = { group: i.adGroup, adProduct: i.adProduct },
                        s = Nr(e.getSlotName(), n);
                    Y.set(`slots.${e.getSlotName()}.videoAdUnit`, s);
                }
                setState(e, t, i) {
                    const n = document.getElementById(e);
                    $n.setState(e, !!n && t, i);
                }
                setupSlotParameters(e) {
                    const t = !0 === e.config.audio ? "-audio" : "",
                        i = !0 === e.config.autoplay || e.config.videoDepth > 1 ? "" : "-ctp";
                    e.setConfigProperty("slotNameSuffix", i || t || ""), e.setTargetingConfigProperty("audio", t ? "yes" : "no"), e.setTargetingConfigProperty("ctp", i ? "yes" : "no");
                }
            })();
            class Pr {
                constructor(e, t, i, n) {
                    (this.userStateStore = e), (this.targetingManager = t), (this.onIntermediateStepLoad = i), (this.pageWithFeaturedVideo = n);
                }
                handleOngoingSequence() {
                    const e = this.userStateStore.get();
                    if (null != e)
                        for (const t of Object.keys(e)) {
                            if (this.isUapSequenceOnFeaturedVideo(e[t])) continue;
                            e[t].stepNo++;
                            const i = e[t];
                            this.targetingManager.setTargeting(t, i),
                                this.onIntermediateStepLoad((i) => {
                                    i === e[t].stepNo ? this.userStateStore.set(e) : console.log("[SM] Invalid step loaded by the Provider!");
                                });
                        }
                }
                isUapSequenceOnFeaturedVideo(e) {
                    return e.isUap() && this.pageWithFeaturedVideo;
                }
            }
            class Dr {
                constructor(e) {
                    this.userStateStore = e;
                }
                endSequence() {
                    this.userStateStore.delete();
                }
            }
            class Lr {
                constructor(e, t, i, n = !1) {
                    (this.stepNo = e), (this.width = t), (this.height = i), (this.uap = n);
                }
                isUap() {
                    return this.uap;
                }
            }
            class kr {
                constructor(e) {
                    this.stateStore = e;
                }
                startSequence(e, t, i, n) {
                    const s = {};
                    (s[e] = new Lr(1, t, i, n)), this.stateStore.set(s);
                }
            }
            class Rr {
                constructor(e, t, i, n, s) {
                    (this.context = e), (this.slotsContext = t), (this.targetingService = i), (this.baseTargetingSize = n), (this.forceUapResolveState = s);
                }
                setTargeting(e, t) {
                    const i = this.baseTargetingSize + t.stepNo;
                    this.slotsContext.setSlotSize("top_leaderboard", [i, i]),
                        this.context.set("templates.sizeOverwritingMap", this.generateSizeMapping(t.width, t.height)),
                        this.targetingService.set("sequential", e, "top_leaderboard"),
                        t.isUap() && this.forceUapResolveState();
                }
                generateSizeMapping(e, t) {
                    return { "12x12": { originalSize: [e, t] }, "13x13": { originalSize: [e, t] }, "14x14": { originalSize: [e, t] } };
                }
            }
            class xr {}
            (xr.SEQUENTIAL_MESSAGING_STARTED = { category: "[iframe]", name: "Sequential messaging started", payload: { _as: "props", _p: void 0 } }),
                (xr.SEQUENTIAL_MESSAGING_INTERMEDIATE = { category: "[iframe]", name: "Sequential messaging intermediate step", payload: { _as: "props", _p: void 0 } }),
                (xr.SEQUENTIAL_MESSAGING_END = { category: "[iframe]", name: "Sequential messaging end", payload: { _as: "props", _p: void 0 } });
            class Ur {
                constructor(e) {
                    (this.cookies = e), (this.cookieDaysToLive = 7);
                }
                set(e) {
                    const t = {};
                    for (const i of Object.keys(e)) t[i] = { stepNo: e[i].stepNo, width: e[i].width, height: e[i].height, uap: e[i].uap };
                    this.cookies.set(Ur.cookieName, JSON.stringify(t), { domain: Ur.cookieDomain, expires: this.cookieDaysToLive });
                }
                get() {
                    const e = this.cookies.get(Ur.cookieName);
                    if (null == e) return;
                    const t = JSON.parse(e),
                        i = {};
                    for (const e of Object.keys(t)) i[e] = new Lr(t[e].stepNo, t[e].width, t[e].height, t[e].uap);
                    return i;
                }
                delete() {
                    this.cookies.remove(Ur.cookieName, { domain: Ur.cookieDomain });
                }
            }
            (Ur.cookieName = "sequential_messaging"), (Ur.cookieDomain = "fandom.com");
            const Vr = j.get();
            class Mr {
                constructor() {
                    (this.logEntry = {}), (this.logEntry.smLogId = ao("beaconId") || window.beaconId || window.beacon_id || Vr.wikia_beacon_id);
                }
                recordRequestTargeting(e) {
                    this.logEntry.smTarSequential = void 0 !== e.sequential ? e.sequential : "";
                }
                recordGAMCreativePayload(e) {
                    (this.logEntry.smGamHeight = void 0 !== e.height ? e.height : ""), (this.logEntry.smGamLineItemId = void 0 !== e.lineItemId ? e.lineItemId : ""), (this.logEntry.smGamWidth = void 0 !== e.width ? e.width : "");
                }
                recordRenderedAd(e) {
                    (this.logEntry.smRenCreativeId = e.creativeId),
                        (this.logEntry.smRenLineItemId = e.lineItemId),
                        (this.logEntry.smRenSlotName = e.getSlotName()),
                        void 0 !== this.logEntry.smTarSequential && (this.logEntry.smOK = this.logEntry.smTarSequential == this.logEntry.smRenLineItemId.toString()),
                        ns.log("sequential messaging", this.logEntry),
                        delete window.smTracking;
                }
            }
            function jr(e) {
                null == window.smTracking &&
                    (Y.get("services.externalLogger.endpoint") || Y.set("services.externalLogger.endpoint", "https://community.fandom.com/wikia.php?controller=AdEngine&method=postLog"), (window.smTracking = new Mr())),
                    window.smTracking.recordGAMCreativePayload(e);
            }
            class Br {
                constructor() {
                    this.userStateStore = new Ur(j);
                }
                execute() {
                    return p(this, void 0, void 0, function* () {
                        null != this.userStateStore.get() ? (this.handleOngoingSequence(), this.handleSequenceEnd()) : this.handleSequenceStart();
                    });
                }
                handleSequenceStart() {
                    Gt.on(xr.SEQUENTIAL_MESSAGING_STARTED, (e) => {
                        const t = e.lineItemId,
                            i = e.width,
                            n = e.height,
                            s = void 0 !== e.uap && e.uap;
                        null != t && null != i && null != n && (s && Ir(), new kr(this.userStateStore).startSequence(t, i, n, s), jr(e));
                    });
                }
                handleOngoingSequence() {
                    const e = new Rr(Y, Or, ji, Br.baseTargetingSize, Ir);
                    new Pr(this.userStateStore, e, this.onIntermediateStepLoad, Y.get("custom.hasFeaturedVideo")).handleOngoingSequence();
                }
                handleSequenceEnd() {
                    Gt.on(xr.SEQUENTIAL_MESSAGING_END, (e) => {
                        new Dr(this.userStateStore).endSequence(), jr(e);
                    });
                }
                onIntermediateStepLoad(e) {
                    Gt.on(xr.SEQUENTIAL_MESSAGING_INTERMEDIATE, (t) => {
                        if (!t.height || 12 > t.height || t.height > 14) return yi("SM", "Invalid Creative configuration. Creative size ot ouf bounds."), !1;
                        const i = t.height - Br.baseTargetingSize;
                        e(i), jr(t);
                    });
                }
            }
            var zr;
            Br.baseTargetingSize = 10;
            let Gr = class {
                constructor(e) {
                    (this.instantConfig = e),
                        (this.prebidBidders = {
                            appnexus: "icPrebidAppNexus",
                            appnexusAst: "icPrebidAppNexusAst",
                            appnexusNative: "icPrebidAppNexusNative",
                            criteo: "icPrebidCriteo",
                            freewheel: "icPrebidFreewheel",
                            gumgum: "icPrebidGumGum",
                            indexExchange: "icPrebidIndexExchange",
                            kargo: "icPrebidKargo",
                            medianet: "icPrebidMedianet",
                            mgnipbs: "icPrebidMagniteS2s",
                            nobid: "icPrebidNobid",
                            ogury: "icPrebidOgury",
                            ozone: "icPrebidOzone",
                            openx: "icPrebidOpenX",
                            pubmatic: "icPrebidPubmatic",
                            relevantdigital: "icPrebidWebAds",
                            rubicon_display: "icPrebidRubiconDisplay",
                            roundel: "icPrebidRoundel",
                            rubicon: "icPrebidRubicon",
                            seedtag: "icPrebidSeedtag",
                            triplelift: "icPrebidTriplelift",
                            verizon: "icPrebidVerizon",
                            yahoossp: "icPrebidYahooSsp",
                            yahooConnectId: "icPrebidYahooConnectId",
                        }),
                        (this.notCoppaCompliantBidders = ["kargo", "verizon"]),
                        (this.selectedBidder = U.get("select_bidder") || "");
                }
                execute() {
                    this.setupBidders();
                }
                setupBidders() {
                    const e = Y.get("custom.hasFeaturedVideo");
                    if ((this.instantConfig.get("icA9Bidder") && (Y.set("bidders.a9.enabled", !0), Y.set("bidders.a9.videoEnabled", this.instantConfig.get("icA9VideoBidder") && e)), this.instantConfig.get("icPrebid"))) {
                        Y.set("bidders.prebid.enabled", !0);
                        for (const [e, t] of Object.entries(this.prebidBidders)) this.enableIfApplicable(e, t);
                        const e = this.instantConfig.get("icPrebidTestBidder");
                        e && (Y.set("bidders.prebid.testBidder", { name: e.name, slots: e.slots }), this.enableIfApplicable("testBidder", "icPrebidTestBidder")),
                            Y.set("bidders.prebid.auctionDelay", this.instantConfig.get("icPrebidAuctionDelay", 50)),
                            Y.set("bidders.prebid.intentIQ", this.instantConfig.get("icPrebidIntentIQ", !1)),
                            Y.set("bidders.prebid.id5", this.instantConfig.get("icPrebidId5", !1)),
                            Y.set("bidders.prebid.id5Analytics.enabled", this.instantConfig.get("icPrebidId5Analytics", !1)),
                            Y.set("bidders.prebid.id5AbValue", this.instantConfig.get("icPrebidId5AB", 0));
                    }
                    Y.set("bidders.enabled", Y.get("bidders.prebid.enabled") || Y.get("bidders.a9.enabled"));
                }
                enableIfApplicable(e, t) {
                    this.selectedBidder && e !== this.selectedBidder
                        ? Y.set(`bidders.prebid.${e}.enabled`, !1)
                        : !gn() || this.isBidderCoppaCompliant(e)
                        ? Y.set(`bidders.prebid.${e}.enabled`, !!this.instantConfig.get(t))
                        : Y.set(`bidders.prebid.${e}.enabled`, !1);
                }
                isBidderCoppaCompliant(e) {
                    return !this.notCoppaCompliantBidders.includes(e);
                }
            };
            Gr = l([N(), u("design:paramtypes", ["function" == typeof (zr = void 0 !== Pi && Pi) ? zr : Object])], Gr);
            const Fr = new (class {
                constructor() {
                    this.defaultVersion = 2;
                }
                get exists() {
                    return !!window.__tcfapi;
                }
                getTCData(e) {
                    return new Promise((t) => {
                        window.__tcfapi("addEventListener", e || this.defaultVersion, (e) => t(e));
                    });
                }
                override(e) {
                    window.__tcfapi = e;
                }
            })();
            class $r {
                static getPrebidNativeMediaTypes(e) {
                    return {
                        sendTargetingKeys: !1,
                        adTemplate: $r.getPrebidNativeTemplate(),
                        title: { required: !0, len: $r.getMaxTitleLength(e) },
                        body: { required: !0, len: $r.getMaxBodyLength(e) },
                        clickUrl: { required: !0 },
                        displayUrl: { required: !1 },
                        image: { required: !1, aspect_ratios: [{ min_width: $r.getMinImageSize(e), min_height: $r.getMinImageSize(e), ratio_width: 1, ratio_height: 1 }] },
                    };
                }
                static getPrebidNativeTemplate() {
                    return '<div id="native-prebid-ad" class="ntv-ad">\n\t\t\t\t\t<div class="ntv-wrapper">\n\t\t\t\t\t\t<a href="##hb_native_linkurl##" class="ntv-link" style="flex-shrink: 0;">\n\t\t\t\t\t\t\t<img src="##hb_native_image##" id="ntv-img" class="ntv-img">\n\t\t\t\t\t\t</a>\n\t\t\t\t\t\t<div class="ntv-content">\n\t\t\t\t\t\t\t<p class="ntv-ad-label">Ad</p>\n\t\t\t\t\t\t\t<a href="##hb_native_linkurl##" class="ntv-link">\n\t\t\t\t\t\t\t\t<p class="ntv-ad-title ntv-headline">##hb_native_title##</p>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<p class="ntv-ad-offer">##hb_native_body##</p>\n\t\t\t\t\t\t\t<a href="##hb_native_linkurl##" class="ntv-link">\n\t\t\t\t\t\t\t\t<button class="ntv-ad-button">##hb_native_displayUrl##</button>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>';
                }
                static getMinImageSize(e) {
                    return "mobile" == e ? (Bn() <= 320 ? 90 : 120) : 126;
                }
                static getMaxTitleLength(e) {
                    return "mobile" == e ? 40 : 60;
                }
                static getMaxBodyLength(e) {
                    return "mobile" == e ? 30 : 120;
                }
            }
            $r.assetsMap = { title: "hb_native_title", body: "hb_native_body", image: "hb_native_image", clickUrl: "hb_native_linkurl", displayUrl: "hb_native_displayUrl" };
            class Hr {
                constructor({ enabled: e, slots: t }) {
                    (this.isCustomBidAdapter = !1),
                        (this.enabled = e),
                        (this.slots = t),
                        (this.pageTargeting = Object.assign({}, ji.dump() || {})),
                        Object.keys(this.pageTargeting).forEach((e) => {
                            Array.isArray(this.pageTargeting[e]) || (this.pageTargeting[e] = [this.pageTargeting[e]]);
                        });
                }
                prepareAdUnits() {
                    return Object.keys(this.slots).map((e) => this.prepareConfigForAdUnit(e, this.slots[e]));
                }
                getTargeting(e, t = {}) {
                    return Object.assign(Object.assign(Object.assign({}, this.pageTargeting), { src: Y.get("src") || [""], pos: [e] }), t);
                }
                getOrtb2Imp(e) {
                    return { ext: { gpid: this.getGPIDValue(e) } };
                }
                getGPIDValue(e) {
                    return Dn.build(Y.get("adUnitId"), { slotConfig: { adProduct: e, group: "PB", slotNameSuffix: "" } });
                }
            }
            class qr extends Hr {
                constructor(e) {
                    super(e), (this.bidderSettings = { storageAllowed: !0 }), (this.placements = e.placements);
                }
                get bidderName() {
                    return qr.bidderName;
                }
                isNativeModeOn() {
                    return Y.get("bidders.prebid.appnexusNative.enabled");
                }
                prepareConfigForAdUnit(e, { sizes: t, placementId: i, position: n = "mobile" }) {
                    return Y.get(`slots.${e}.isNative`) && Y.get("bidders.prebid.native.enabled") && this.isNativeModeOn()
                        ? this.prepareNativeConfig(e, { sizes: t, placementId: i, position: n })
                        : this.prepareStandardConfig(e, { sizes: t, placementId: i, position: n });
                }
                prepareStandardConfig(e, { sizes: t, placementId: i, position: n }) {
                    return { code: e, mediaTypes: { banner: { sizes: t } }, bids: this.getBids(e, { sizes: t, placementId: i, position: n }) };
                }
                prepareNativeConfig(e, { sizes: t, placementId: i, position: n }) {
                    return { code: e, mediaTypes: { native: $r.getPrebidNativeMediaTypes(n) }, bids: this.getBids(e, { sizes: t, placementId: i, position: n }) };
                }
                getBids(e, { placementId: t, position: i = "mobile" }) {
                    return Array.isArray(t) && t.length > 0
                        ? t.map((t) => ({ bidder: this.bidderName, params: { placementId: t, keywords: Object.assign({}, this.getTargeting(e)) } }))
                        : [{ bidder: this.bidderName, params: { placementId: t || this.getPlacement(i), keywords: Object.assign({}, this.getTargeting(e)) } }];
                }
                getPlacement(e) {
                    let t = e;
                    if ("mobile" === e) {
                        const e = ji.get("mappedVerticalName");
                        t = e && this.placements[e] ? e : "other";
                    }
                    return this.placements[t];
                }
            }
            var Wr, Kr;
            (qr.bidderName = "appnexus"),
                (function (e) {
                    (e[(e.IN_STREAM = 1)] = "IN_STREAM"), (e[(e.IN_BANNER = 2)] = "IN_BANNER"), (e[(e.IN_ARTICLE = 3)] = "IN_ARTICLE"), (e[(e.IN_FEED = 4)] = "IN_FEED"), (e[(e.FLOATING = 5)] = "FLOATING");
                })(Wr || (Wr = {})),
                (function (e) {
                    (e[(e.IN_STREAM = 1)] = "IN_STREAM"), (e[(e.ACCOMPANYING_CONTENT = 2)] = "ACCOMPANYING_CONTENT"), (e[(e.INTERSTITIAL = 3)] = "INTERSTITIAL"), (e[(e.STANDALONE = 4)] = "STANDALONE");
                })(Kr || (Kr = {}));
            class Yr extends Hr {
                constructor(e) {
                    super(e), (this.aliases = { appnexus: [Yr.bidderName] }), (this.bidderSettings = { storageAllowed: !0 }), (this.debugPlacementId = e.debugPlacementId), (this.isDebugMode = "1" === U.get("appnexusast_debug_mode"));
                }
                get bidderName() {
                    return Yr.bidderName;
                }
                prepareConfigForAdUnit(e, { placementId: t }) {
                    return {
                        code: e,
                        mediaTypes: { video: { context: "instream", playerSize: [640, 480] } },
                        bids: [
                            {
                                bidder: this.bidderName,
                                params: {
                                    placementId: this.isDebugMode ? this.debugPlacementId : t,
                                    keywords: Object.assign({}, this.getTargeting(e)),
                                    video: { skippable: !1, playback_method: ["auto_play_sound_off"], placement: Wr.IN_ARTICLE, plcmt: Kr.ACCOMPANYING_CONTENT },
                                },
                            },
                        ],
                    };
                }
            }
            Yr.bidderName = "appnexusAst";
            class Qr extends Hr {
                constructor(e) {
                    super(e), (this.networkId = e.networkId);
                }
                get bidderName() {
                    return Qr.bidderName;
                }
                prepareConfigForAdUnit(e, { sizes: t }) {
                    return this.getStandardConfig(e, t);
                }
                getStandardConfig(e, t) {
                    return { code: e, mediaTypes: { banner: { sizes: t } }, ortb2Imp: this.getOrtb2Imp(e), bids: [{ bidder: this.bidderName, params: { networkId: this.networkId } }] };
                }
            }
            Qr.bidderName = "criteo";
            class Xr extends Hr {
                constructor(e) {
                    super(e), (this.aliases = { "freewheel-ssp": [Xr.bidderName] });
                }
                get bidderName() {
                    return Xr.bidderName;
                }
                prepareConfigForAdUnit(e, { zoneId: t }) {
                    return {
                        code: e,
                        mediaTypes: { video: { playerSize: [640, 480], placement: Wr.IN_ARTICLE, plcmt: Kr.ACCOMPANYING_CONTENT } },
                        bids: [{ bidder: this.bidderName, params: { format: "instream", zoneId: t, vastUrlParams: { protocolVersion: "4.2" } } }],
                    };
                }
            }
            Xr.bidderName = "freewheel";
            class Jr extends Hr {
                constructor(e) {
                    super(e);
                }
                get bidderName() {
                    return Jr.bidderName;
                }
                prepareConfigForAdUnit(e, { sizes: t, inScreen: i }) {
                    return { code: e, mediaTypes: { banner: { sizes: t } }, bids: [{ bidder: this.bidderName, params: { inScreen: i } }] };
                }
            }
            Jr.bidderName = "gumgum";
            class Zr extends Hr {
                constructor(e) {
                    super(e), (this.aliases = { ix: [Zr.bidderName] }), (this.bidderSettings = { storageAllowed: !0 });
                }
                get bidderName() {
                    return Zr.bidderName;
                }
                prepareConfigForAdUnit(e, { sizes: t, siteId: i }) {
                    return Y.get(`slots.${e}.isVideo`) ? this.getVideoConfig(e, i) : this.getStandardConfig(e, { sizes: t, siteId: i });
                }
                getVideoConfig(e, t) {
                    return {
                        code: e,
                        mediaTypes: { video: { context: "instream", placement: Wr.IN_ARTICLE, playerSize: [640, 480], plcmt: [Kr.ACCOMPANYING_CONTENT] } },
                        ortb2Imp: this.extendOrtbWithJwpRtdDataWhenStrategyRulesEnabled(this.getOrtb2Imp(e)),
                        bids: [
                            {
                                bidder: this.bidderName,
                                params: {
                                    siteId: t,
                                    size: [640, 480],
                                    video: {
                                        context: "instream",
                                        playerSize: [640, 480],
                                        mimes: ["video/mp4", "video/x-flv", "video/webm", "video/ogg", "application/javascript"],
                                        minduration: 1,
                                        maxduration: 30,
                                        protocols: [2, 3, 5, 6],
                                        api: [2],
                                        w: 640,
                                        h: 480,
                                    },
                                },
                            },
                        ],
                    };
                }
                getStandardConfig(e, { sizes: t, siteId: i }) {
                    return { code: e, mediaTypes: { banner: { sizes: t } }, ortb2Imp: this.getOrtb2Imp(e), bids: this.getBids(t, i) };
                }
                getBids(e, t) {
                    return Array.isArray(t) && t.length > 0 ? this.getBidsForMultipleSiteIds(e, t) : e.map((e) => ({ bidder: this.bidderName, params: { siteId: t, size: e } }));
                }
                getBidsForMultipleSiteIds(e, t) {
                    return t.map((t, i) => ({ bidder: this.bidderName, params: { size: e[i], siteId: t } }));
                }
                extendOrtbWithJwpRtdDataWhenStrategyRulesEnabled(e) {
                    const t = Y.get("options.video.enableStrategyRules"),
                        i = Y.get("options.video.jwplayer.initialMediaId");
                    return t ? { ext: Object.assign(Object.assign({}, e.ext), { data: { jwTargeting: { mediaID: i } } }) } : e;
                }
            }
            Zr.bidderName = "indexExchange";
            class ea extends Hr {
                constructor(e) {
                    super(e), (this.bidderSettings = { storageAllowed: !0 });
                }
                get bidderName() {
                    return ea.bidderName;
                }
                prepareConfigForAdUnit(e, { sizes: t, placementId: i }) {
                    return { code: e, mediaTypes: { banner: { sizes: t } }, bids: this.getBids(i) };
                }
                getBids(e) {
                    return Array.isArray(e) && e.length > 0 ? e.map((e) => ({ bidder: this.bidderName, params: { placementId: e } })) : [{ bidder: this.bidderName, params: { placementId: e } }];
                }
            }
            ea.bidderName = "kargo";
            class ta extends Hr {
                constructor(e) {
                    super(e), (this.accountId = e.accountId);
                }
                get bidderName() {
                    return ta.bidderName;
                }
                prepareConfigForAdUnit(e, { sizes: t }) {
                    let i = { banner: { sizes: t } };
                    return (
                        "featured" === e &&
                            (i = {
                                video: {
                                    playerSize: t[0],
                                    context: "instream",
                                    api: [2],
                                    linearity: 1,
                                    mimes: ["video/mp4", "video/x-flv", "video/webm", "video/ogg"],
                                    maxduration: 30,
                                    minduration: 1,
                                    protocols: [2, 3, 5, 6],
                                    placement: Wr.IN_ARTICLE,
                                    plcmt: Kr.ACCOMPANYING_CONTENT,
                                },
                            }),
                        { code: e, mediaTypes: i, ortb2Imp: this.getOrtb2Imp(e), bids: [{ bidder: this.bidderName, params: {} }] }
                    );
                }
            }
            ta.bidderName = "mgnipbs";
            class ia extends Hr {
                constructor(e) {
                    super(e);
                }
                get bidderName() {
                    return ia.bidderName;
                }
                prepareConfigForAdUnit(e, { sizes: t, cid: i, crid: n }) {
                    return Y.get(`slots.${e}.isVideo`) ? this.getVideoConfig(e, i, n) : this.getStandardConfig(e, t, i, n);
                }
                getVideoConfig(e, t, i) {
                    return {
                        code: e,
                        mediaTypes: {
                            video: {
                                playerSize: [640, 480],
                                context: "instream",
                                api: [2],
                                linearity: 1,
                                mimes: ["video/mp4", "video/x-flv", "video/webm", "video/ogg"],
                                maxduration: 30,
                                protocols: [2, 3, 5, 6],
                                playbackmethod: [2, 3],
                                placement: Wr.IN_ARTICLE,
                                plcmt: Kr.ACCOMPANYING_CONTENT,
                            },
                        },
                        ortb2Imp: this.getOrtb2Imp(e),
                        bids: [
                            {
                                bidder: this.bidderName,
                                params: { cid: t, crid: i, video: { w: "640", h: "480", mimes: ["video/mp4", "video/x-flv", "video/webm", "video/ogg"], playbackmethod: [2, 3], maxduration: 30, minduration: 1, startdelay: 0 } },
                            },
                        ],
                    };
                }
                getStandardConfig(e, t, i, n) {
                    return { code: e, mediaTypes: { banner: { sizes: t } }, ortb2Imp: this.getOrtb2Imp(e), bids: [{ bidder: this.bidderName, params: { cid: i, crid: n } }] };
                }
            }
            ia.bidderName = "medianet";
            class na extends Hr {
                constructor(e) {
                    super(e), (this.bidderSettings = { storageAllowed: !0 });
                }
                get bidderName() {
                    return na.bidderName;
                }
                prepareConfigForAdUnit(e, { sizes: t, siteId: i }) {
                    return { code: e, mediaTypes: { banner: { sizes: t } }, bids: [{ bidder: this.bidderName, params: { siteId: i } }] };
                }
            }
            na.bidderName = "nobid";
            class sa extends Hr {
                constructor(e) {
                    super(e);
                }
                get bidderName() {
                    return sa.bidderName;
                }
                prepareConfigForAdUnit(e, { adUnitId: t, assetKey: i, sizes: n }) {
                    return { code: e, mediaTypes: { banner: { sizes: n } }, bids: [{ bidder: this.bidderName, params: { assetKey: i, adUnitId: t, skipSizeCheck: !0 } }] };
                }
            }
            sa.bidderName = "ogury";
            class oa extends Hr {
                constructor(e) {
                    super(e), (this.delDomain = e.delDomain);
                }
                get bidderName() {
                    return oa.bidderName;
                }
                prepareConfigForAdUnit(e, { sizes: t, unit: i }) {
                    return Y.get(`slots.${e}.isVideo`) ? this.getVideoConfig(e, i) : this.getStandardConfig(e, t, i);
                }
                getVideoConfig(e, t) {
                    return {
                        code: e,
                        mediaTypes: { video: { context: "instream", mimes: ["video/mp4", "video/x-flv"], playerSize: [640, 480], placement: Wr.IN_ARTICLE, plcmt: Kr.ACCOMPANYING_CONTENT } },
                        ortb2Imp: this.getOrtb2Imp(e),
                        bids: [{ bidder: this.bidderName, params: { unit: t, delDomain: this.delDomain } }],
                    };
                }
                getStandardConfig(e, t, i) {
                    return { code: e, mediaTypes: { banner: { sizes: t } }, ortb2Imp: this.getOrtb2Imp(e), bids: [{ bidder: this.bidderName, params: { unit: i, delDomain: this.delDomain } }] };
                }
            }
            oa.bidderName = "openx";
            class ra extends Hr {
                constructor(e) {
                    super(e),
                        (this.testGroup = Math.floor(100 * Math.random()).toString()),
                        (this.customTargeting = { s1: [Y.get("wiki.targeting.wikiIsTop1000") ? ji.get("s1") || "" : "not a top1k wiki"], lang: [ji.get("wikiLanguage") || ji.get("lang") || "en"], testgroup: this.testGroup }),
                        (this.dcn = e.dcn),
                        this.enabled && this.setTargeting();
                }
                get bidderName() {
                    return ra.bidderName;
                }
                setTargeting() {
                    const e = Y.get("bidders.prebid.ozone");
                    e &&
                        e.slots &&
                        Object.keys(e.slots).forEach((e) => {
                            ji.set("testgroup", this.testGroup, e);
                        });
                }
                prepareConfigForAdUnit(e, { sizes: t, pos: i, placementId: n }) {
                    return {
                        code: e,
                        mediaTypes: { banner: { sizes: t } },
                        bids: [
                            {
                                bidder: "ozone",
                                params: { publisherId: "OZONEFAN0001", siteId: "1500000156", placementId: n, pos: i, customData: [{ settings: {}, targeting: Object.assign({}, this.getTargeting(e, this.customTargeting)) }] },
                            },
                        ],
                    };
                }
            }
            ra.bidderName = "ozone";
            class aa extends Hr {
                constructor(e) {
                    super(e), (this.publisherId = e.publisherId);
                }
                get bidderName() {
                    return aa.bidderName;
                }
                prepareConfigForAdUnit(e, { sizes: t, ids: i }) {
                    return Y.get(`slots.${e}.isVideo`) ? this.getVideoConfig(e, i) : this.getStandardConfig(e, t, i);
                }
                getVideoConfig(e, t) {
                    const i = {
                        video: {
                            mimes: ["video/mp4", "video/x-flv", "video/webm", "video/ogg"],
                            skippable: !0,
                            minduration: 1,
                            maxduration: 30,
                            startdelay: 0,
                            playbackmethod: [2, 3],
                            api: [2],
                            protocols: [2, 3, 5, 6],
                            linearity: 1,
                            placement: Wr.IN_ARTICLE,
                            plcmt: Kr.ACCOMPANYING_CONTENT,
                        },
                    };
                    return { code: e, mediaTypes: { video: { playerSize: [640, 480], context: "instream", placement: Wr.IN_ARTICLE } }, bids: this.getBids(t, i) };
                }
                getStandardConfig(e, t, i) {
                    return { code: e, mediaTypes: { banner: { sizes: t } }, bids: this.getBids(i) };
                }
                getBids(e, t = {}) {
                    return e.map((e) => ({ bidder: this.bidderName, params: Object.assign({ adSlot: e, publisherId: this.publisherId }, t) }));
                }
            }
            aa.bidderName = "pubmatic";
            class da extends Hr {
                constructor(e) {
                    super(e), (this.aliases = { ix: [da.bidderName] }), (this.bidderSettings = { storageAllowed: !0 });
                }
                get bidderName() {
                    return da.bidderName;
                }
                prepareConfigForAdUnit(e, { sizes: t, siteId: i }) {
                    return Y.get(`slots.${e}.isVideo`) ? this.getVideoConfig(e, i) : this.getStandardConfig(e, { sizes: t, siteId: i });
                }
                getVideoConfig(e, t) {
                    return {
                        code: e,
                        mediaTypes: { video: { context: "instream", placement: Wr.IN_ARTICLE, playerSize: [640, 480], plcmt: Kr.ACCOMPANYING_CONTENT } },
                        ortb2Imp: this.getOrtb2Imp(e),
                        bids: [
                            {
                                bidder: this.bidderName,
                                params: {
                                    siteId: t,
                                    size: [640, 480],
                                    video: { mimes: ["video/mp4", "video/x-flv", "video/webm", "video/ogg", "application/javascript"], minduration: 1, maxduration: 30, protocols: [2, 3, 5, 6], api: [2] },
                                },
                            },
                        ],
                    };
                }
                getStandardConfig(e, { sizes: t, siteId: i }) {
                    return { code: e, mediaTypes: { banner: { sizes: t } }, ortb2Imp: this.getOrtb2Imp(e), bids: t.map((e) => ({ bidder: this.bidderName, params: { siteId: i, size: e } })) };
                }
            }
            da.bidderName = "roundel";
            class la extends Hr {
                constructor(e) {
                    super(e), (this.accountId = e.accountId), (this.customTargeting = { s1: [Y.get("wiki.targeting.wikiIsTop1000") ? ji.get("s1") || "" : "not a top1k wiki"], lang: [ji.get("wikiLanguage") || ji.get("lang") || "en"] });
                }
                get bidderName() {
                    return la.bidderName;
                }
                prepareConfigForAdUnit(e, { siteId: t, zoneId: i, sizeId: n, position: s }) {
                    return "featured" !== e || Y.get("custom.hasFeaturedVideo")
                        ? {
                              code: e,
                              mediaTypes: {
                                  video: {
                                      playerSize: [640, 480],
                                      context: "instream",
                                      api: [2],
                                      linearity: 1,
                                      mimes: ["video/mp4", "video/x-flv", "video/webm", "video/ogg"],
                                      maxduration: 30,
                                      protocols: [2, 3, 5, 6],
                                      placement: Wr.IN_ARTICLE,
                                      plcmt: Kr.ACCOMPANYING_CONTENT,
                                  },
                              },
                              ortb2Imp: this.getOrtb2Imp(e),
                              bids: [
                                  {
                                      bidder: this.bidderName,
                                      params: {
                                          position: s,
                                          siteId: t,
                                          zoneId: i,
                                          accountId: this.accountId,
                                          name: e,
                                          inventory: Object.assign({}, this.getTargeting(e, this.customTargeting)),
                                          video: { playerWidth: "640", playerHeight: "480", size_id: n, language: this.customTargeting.lang[0] },
                                      },
                                  },
                              ],
                          }
                        : null;
                }
            }
            la.bidderName = "rubicon";
            class ca extends Hr {
                constructor(e) {
                    super(e),
                        (this.aliases = { rubicon: [ca.bidderName] }),
                        (this.accountId = e.accountId),
                        (this.customTargeting = { s1: [Y.get("wiki.targeting.wikiIsTop1000") ? ji.get("s1") || "" : "not a top1k wiki"], lang: [ji.get("wikiLanguage") || ji.get("lang") || "en"] });
                }
                get bidderName() {
                    return ca.bidderName;
                }
                prepareConfigForAdUnit(e, { siteId: t, zoneId: i, sizes: n, position: s, targeting: o }) {
                    return { code: e, mediaTypes: { banner: { sizes: n } }, ortb2Imp: this.getOrtb2Imp(e), bids: this.getBids(e, s, t, i, o) };
                }
                getBids(e, t, i, n, s) {
                    return Array.isArray(n) && n.length > 0
                        ? n.map((n) => ({
                              bidder: this.bidderName,
                              params: {
                                  position: t,
                                  siteId: i,
                                  zoneId: n,
                                  accountId: this.accountId,
                                  name: e,
                                  keywords: ["rp.fastlane"],
                                  inventory: Object.assign({}, this.getTargeting(e, Object.assign(Object.assign({}, s || {}), this.customTargeting))),
                              },
                          }))
                        : [
                              {
                                  bidder: this.bidderName,
                                  params: {
                                      position: t,
                                      siteId: i,
                                      zoneId: n,
                                      accountId: this.accountId,
                                      name: e,
                                      keywords: ["rp.fastlane"],
                                      inventory: Object.assign({}, this.getTargeting(e, Object.assign(Object.assign({}, s || {}), this.customTargeting))),
                                  },
                              },
                          ];
                }
            }
            ca.bidderName = "rubicon_display";
            class ua extends Hr {
                constructor(e) {
                    super(e);
                }
                get bidderName() {
                    return ua.bidderName;
                }
                prepareConfigForAdUnit(e, { sizes: t, publisherId: i, adUnitId: n, placement: s = "inBanner" }) {
                    return Y.get(`slots.${e}.isVideo`) ? this.getVideoConfig(e, i, n) : { code: e, mediaTypes: { banner: { sizes: t } }, bids: [{ bidder: this.bidderName, params: { publisherId: i, adUnitId: n, placement: s } }] };
                }
                getVideoConfig(e, t, i) {
                    return {
                        code: e,
                        mediaTypes: {
                            video: {
                                playerSize: [640, 480],
                                context: "instream",
                                mimes: ["video/mp4", "video/x-flv", "video/webm", "video/ogg"],
                                skip: 1,
                                minduration: 1,
                                maxduration: 30,
                                startdelay: 0,
                                playbackmethod: [2, 3],
                                linearity: 1,
                                placement: Wr.IN_ARTICLE,
                                plcmt: Kr.ACCOMPANYING_CONTENT,
                            },
                        },
                        bids: [{ bidder: this.bidderName, params: { publisherId: t, adUnitId: i, placement: "inStream" } }],
                    };
                }
            }
            ua.bidderName = "seedtag";
            class pa extends Hr {
                constructor(e) {
                    super(e), (this.aliases = {}), (this.aliases[Y.get("bidders.prebid.testBidder.name")] = [pa.bidderName]);
                }
                get bidderName() {
                    return pa.bidderName;
                }
                prepareConfigForAdUnit(e, { sizes: t, parameters: i }) {
                    return Y.get(`slots.${e}.isVideo`) ? this.getVideoConfig(e, i) : this.getStandardConfig(e, { sizes: t, parameters: i });
                }
                getVideoConfig(e, t) {
                    return { code: e, mediaTypes: { video: { context: "instream", playerSize: [640, 480] } }, ortb2Imp: this.getOrtb2Imp(e), bids: [{ bidder: this.bidderName, params: Object.assign({}, t) }] };
                }
                getStandardConfig(e, { sizes: t, parameters: i }) {
                    return { code: e, mediaTypes: { banner: { sizes: t } }, ortb2Imp: this.getOrtb2Imp(e), bids: [{ bidder: this.bidderName, params: Object.assign({}, i) }] };
                }
            }
            pa.bidderName = "testBidder";
            class ha extends Hr {
                constructor(e) {
                    super(e), (this.bidderSettings = { storageAllowed: !0 });
                }
                get bidderName() {
                    return ha.bidderName;
                }
                prepareConfigForAdUnit(e, { sizes: t, inventoryCodes: i }) {
                    return { code: e, mediaTypes: { banner: { sizes: t } }, ortb2Imp: this.getOrtb2Imp(e), bids: i.map((e) => ({ bidder: this.bidderName, params: { inventoryCode: e } })) };
                }
            }
            ha.bidderName = "triplelift";
            class ga extends Hr {
                constructor(e) {
                    super(e), (this.dcn = e.dcn);
                }
                get bidderName() {
                    return ga.bidderName;
                }
                prepareConfigForAdUnit(e, { sizes: t, pos: i }) {
                    return { code: e, mediaTypes: { banner: { sizes: t } }, bids: [{ bidder: this.bidderName, params: { pos: i, dcn: this.dcn } }] };
                }
            }
            ga.bidderName = "verizon";
            class ma extends Hr {
                constructor(e) {
                    super(e), (this.accountId = "647765b7705d4fca3b3e1d58"), (this.bidderSettings = { storageAllowed: !0 });
                }
                get bidderName() {
                    return ma.bidderName;
                }
                prepareConfigForAdUnit(e, { sizes: t, placementId: i }) {
                    return {
                        code: e,
                        mediaTypes: { banner: { sizes: t } },
                        ortb2Imp: this.getOrtb2Imp(e),
                        bids: [{ bidder: this.bidderName, params: { placementId: i, accountId: this.accountId, pbsHost: "webads-pbs.relevant-digital.com" } }],
                    };
                }
            }
            ma.bidderName = "relevantdigital";
            const fa = U.get("wikia_adapter"),
                va = parseInt(U.get("wikia_adapter_limit"), 10) || 99,
                ba = parseInt(U.get("wikia_adapter_timeout"), 10) || 100,
                ya = "1" === U.get("wikia_adapter_random");
            class _a extends Hr {
                constructor(e) {
                    super(e), (this.enabled = !!fa), (this.limit = va), (this.timeout = ba), (this.useRandomPrice = ya), (this.isCustomBidAdapter = !0);
                }
                static getCreative(e, t) {
                    const i = document.createElement("div");
                    (i.style.background = "#00b7e0"), (i.style.color = "#fff"), (i.style.fontFamily = "sans-serif"), (i.style.width = `${e[0]}px`), (i.style.height = `${e[1]}px`), (i.style.textAlign = "center");
                    const n = document.createElement("p");
                    (n.innerText = "Wikia Creative"), (n.style.fontWeight = "bold"), (n.style.margin = "0"), (n.style.paddingTop = "10px");
                    const s = document.createElement("small");
                    return (s.innerText = `cpm: ${t}, size: ${e.join("x")}`), i.appendChild(n), i.appendChild(s), i.outerHTML;
                }
                get bidderName() {
                    return _a.bidderName;
                }
                prepareConfigForAdUnit(e, { sizes: t }) {
                    return Y.get(`slots.${e}.isNative`) ? this.prepareNativeConfig($r.getPrebidNativeTemplate(), e) : this.prepareStandardConfig(e, { sizes: t });
                }
                prepareNativeConfig(e, t) {
                    return {
                        code: t,
                        mediaTypes: {
                            native: {
                                sendTargetingKeys: !1,
                                adTemplate: e,
                                title: { required: !0 },
                                body: { required: !0 },
                                clickUrl: { required: !0 },
                                displayUrl: { required: !1 },
                                image: { required: !1, aspect_ratios: [{ min_width: 100, min_height: 100, ratio_width: 1, ratio_height: 1 }] },
                            },
                        },
                        ortb2Imp: this.getOrtb2Imp(t),
                        bids: [{ bidder: this.bidderName, params: {} }],
                    };
                }
                prepareStandardConfig(e, { sizes: t }) {
                    return { code: e, mediaTypes: { banner: { sizes: t } }, ortb2Imp: this.getOrtb2Imp(e), bids: [{ bidder: this.bidderName, params: {} }] };
                }
                getSpec() {
                    return { code: this.bidderName, supportedMediaTypes: ["banner", "native"] };
                }
                getPrice() {
                    return this.useRandomPrice ? Math.floor(2e3 * Math.random()) / 100 : parseInt(fa, 10) / 100;
                }
                callBids(e, t, i) {
                    this.addBids(e, t, i);
                }
                addBids(e, t, i) {
                    setTimeout(
                        () =>
                            p(this, void 0, void 0, function* () {
                                const n = yield Ui.init();
                                e.bids.map((i) => {
                                    0 !== this.limit && (t(i.adUnitCode, i.mediaTypes.native ? this.createNativeBidResponse(n, i, e) : this.createStandardBidResponse(n, i, e)), (this.limit -= 1));
                                }),
                                    i();
                            }),
                        this.timeout
                    );
                }
                createNativeBidResponse(e, t, i) {
                    const n = e.createBid(1),
                        s = this.getPrice();
                    return (
                        (n.auctionId = i.auctionId),
                        (n.bidderCode = i.bidderCode),
                        (n.bidderRequestId = i.bidderRequestId),
                        (n.transactionId = t.transactionId),
                        (n.cpm = s),
                        (n.ttl = 300),
                        (n.mediaType = "native"),
                        (n.native = {
                            body: "Wikia is an old name of Fandom. Haven't heard of Fandom?",
                            clickTrackers: ["https://track-click.url"],
                            clickUrl: "https://fandom.com",
                            url: "https://fandom.com",
                            image: { url: "https://placekitten.com/100/100", height: 100, width: 100 },
                            impressionTrackers: ["https://track-impression.url"],
                            title: "Wikia Native Creative",
                        }),
                        n
                    );
                }
                createStandardBidResponse(e, t, i) {
                    const n = e.createBid(1),
                        [s, o] = t.sizes[0],
                        r = this.getPrice();
                    return (
                        (n.ad = _a.getCreative(t.sizes[0], r)),
                        (n.auctionId = i.auctionId),
                        (n.bidderCode = i.bidderCode),
                        (n.bidderRequestId = i.bidderRequestId),
                        (n.transactionId = t.transactionId),
                        (n.cpm = r),
                        (n.ttl = 300),
                        (n.mediaType = "banner"),
                        (n.width = s),
                        (n.height = o),
                        n
                    );
                }
            }
            _a.bidderName = "wikia";
            const Sa = U.get("wikia_video_adapter"),
                Ea = parseInt(U.get("wikia_adapter_limit"), 10) || 99,
                wa = parseInt(U.get("wikia_adapter_timeout"), 10) || 100,
                Aa = "1" === U.get("wikia_adapter_random");
            class Ta extends Hr {
                constructor(e) {
                    super(e), (this.enabled = !!Sa), (this.limit = Ea), (this.timeout = wa), (this.useRandomPrice = Aa), (this.isCustomBidAdapter = !0);
                }
                static getVastUrl(e, t, i) {
                    return Cs(0, i, { videoAdUnitId: Y.get(`bidders.prebid.wikiaVideo.slots.${i}.videoAdUnitId`), customParams: Y.get(`bidders.prebid.wikiaVideo.slots.${i}.customParams`) });
                }
                get bidderName() {
                    return Ta.bidderName;
                }
                prepareConfigForAdUnit(e) {
                    return { code: e, mediaTypes: { video: { context: "outstream", playerSize: [640, 480] } }, ortb2Imp: this.getOrtb2Imp(e), bids: [{ bidder: this.bidderName, params: {} }] };
                }
                getSpec() {
                    return { code: this.bidderName, supportedMediaTypes: ["video"] };
                }
                getPrice() {
                    return this.useRandomPrice ? Math.floor(20 * Math.random()) : parseInt(Sa, 10) / 100;
                }
                callBids(e, t, i) {
                    this.addBids(e, t, i);
                }
                addBids(e, t, i) {
                    setTimeout(
                        () =>
                            p(this, void 0, void 0, function* () {
                                const n = yield Ui.init();
                                e.bids.forEach((i) => {
                                    if (0 === this.limit) return;
                                    const s = n.createBid(1),
                                        [o, r] = i.sizes[0],
                                        a = i.adUnitCode;
                                    (s.auctionId = e.auctionId),
                                        (s.bidderCode = e.bidderCode),
                                        (s.bidderRequestId = e.bidderRequestId),
                                        (s.cpm = this.getPrice()),
                                        (s.creativeId = "foo123_wikiaVideoCreativeId"),
                                        (s.ttl = 300),
                                        (s.mediaType = "video"),
                                        (s.width = o),
                                        (s.height = r),
                                        (s.transactionId = i.transactionId),
                                        (s.vastUrl = Ta.getVastUrl(o, r, a)),
                                        (s.videoCacheKey = "123foo_wikiaVideoCacheKey"),
                                        t(i.adUnitCode, s),
                                        (this.limit -= 1);
                                }),
                                    i();
                            }),
                        this.timeout
                    );
                }
            }
            Ta.bidderName = "wikiaVideo";
            class Ia extends Hr {
                constructor(e) {
                    super(e);
                }
                get bidderName() {
                    return Ia.bidderName;
                }
                prepareConfigForAdUnit(e, { sizes: t, pubId: i }) {
                    return this.getStandardConfig(e, t, i);
                }
                getStandardConfig(e, t, i) {
                    return { code: e, mediaTypes: { banner: { sizes: t } }, ortb2Imp: this.getOrtb2Imp(e), bids: this.getBids(i) };
                }
                getBids(e) {
                    return e.map((e) => ({ bidder: this.bidderName, params: { pubId: e } }));
                }
            }
            function Ca(e, t = null) {
                return p(this, void 0, void 0, function* () {
                    let i = {};
                    const n = Y.get("bidders.prebid.priceFloor"),
                        s = yield (function (e) {
                            return p(this, void 0, void 0, function* () {
                                return ((yield Ui.init()).getBidResponsesForAdUnitCode(e).bids || []).filter(
                                    (e) =>
                                        (function (e) {
                                            return e.getStatusCode && 1 === e.getStatusCode();
                                        })(e) && "rendered" !== e.status
                                );
                            });
                        })(e);
                    if (s.length) {
                        let e = null;
                        s.forEach((i) => {
                            (t && t !== i.bidderCode) ||
                                (n && "object" == typeof n && n[`${i.width}x${i.height}`] && i.cpm < parseFloat(n[`${i.width}x${i.height}`])) ||
                                (e = e ? (e.cpm === i.cpm ? (e.timeToRespond > i.timeToRespond ? i : e) : e.cpm < i.cpm ? i : e) : i);
                        }),
                            e && (i = e.adserverTargeting);
                    }
                    const { hb_adid: o } = i;
                    if (o) {
                        const t = yield (function (e, t) {
                            return p(this, void 0, void 0, function* () {
                                const i = yield (function (e, t) {
                                    return p(this, void 0, void 0, function* () {
                                        const i = yield Ui.init(),
                                            { bids: n } = i.getBidResponsesForAdUnitCode(e),
                                            s = n.filter((e) => t === e.adId);
                                        return s.length ? s[0] : null;
                                    });
                                })(e, t);
                                return i && "video" === i.mediaType ? i.videoCacheKey : "disabled";
                            });
                        })(e, o);
                        t && (i.hb_uuid = t);
                    }
                    return i || {};
                });
            }
            Ia.bidderName = "yahoossp";
            const Na = new (class {
                    constructor() {
                        (this.adapters = new Map()), (this.availableAdapters = [qr, Yr, Qr, Xr, Jr, Zr, ea, ta, ia, na, sa, oa, ra, aa, da, la, ca, ua, pa, ha, ga, ma, _a, Ta, Ia]);
                    }
                    getAdapter(e) {
                        return this.getAdapters().get(e);
                    }
                    getAdapters() {
                        if (!this.adapters.size) {
                            const e = Y.get("bidders.prebid");
                            this.availableAdapters.forEach((t) => {
                                const i = e[t.bidderName];
                                (function (e) {
                                    if ("object" != typeof e) return !1;
                                    const t = "boolean" == typeof e.enabled,
                                        i = "object" == typeof e.slots;
                                    return t && i;
                                })(i) && this.adapters.set(t.bidderName, new t(i));
                            });
                        }
                        return this.adapters;
                    }
                    configureAdapters() {
                        this.getAdapters().forEach((e) => {
                            const t = e.aliases;
                            t && this.configureAliases(t), e.isCustomBidAdapter && this.configureCustomAdapter(e.bidderName, e);
                        });
                    }
                    setupAdUnits(e) {
                        const t = [];
                        return (
                            Na.getAdapters().forEach((i) => {
                                i &&
                                    i.enabled &&
                                    i.prepareAdUnits().forEach((i) => {
                                        i &&
                                            (function (e) {
                                                const t = Y.get(`slots.${e}`)
                                                    ? $n.getState(e)
                                                    : (function (e, t) {
                                                          return Object.keys(Y.get("slots")).some((t) => as(t, void 0) === e && $n.getState(t));
                                                      })(e);
                                                return ("static" !== Y.get("bidders.prebid.filter") || e.includes("video") || null !== document.querySelector(`div[id="${e}"]`)) && t;
                                            })(i.code) &&
                                            cs(i.code, e) &&
                                            t.push(i);
                                    });
                            }),
                            t
                        );
                    }
                    configureAliases(e) {
                        return p(this, void 0, void 0, function* () {
                            const t = yield Ui.init();
                            Object.keys(e).forEach((i) => e[i].forEach((e) => t.aliasBidder(i, e)));
                        });
                    }
                    configureCustomAdapter(e, t) {
                        return p(this, void 0, void 0, function* () {
                            return (yield Ui.init()).registerBidAdapter(() => t, e);
                        });
                    }
                })(),
                Oa = "Id5",
                Pa = new (class {
                    constructor() {
                        (this.partnerId = 1139), (this.id5GroupKey = "id5_group");
                    }
                    isEnabled() {
                        return Y.get("bidders.prebid.id5") && !Y.get("options.optOutSale") && !gn();
                    }
                    getConfig() {
                        if (!this.isEnabled()) return void yi(Oa, "disabled");
                        yi(Oa, "enabled"), Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: "id5_start" });
                        const e = Y.get("bidders.prebid.id5AbValue");
                        e ? yi(Oa, "A/B testing enabled", "value=", e) : yi(Oa, "A/B testing disabled");
                        const t = { name: "id5Id", params: { partner: this.partnerId, abTesting: { enabled: void 0 !== e, controlGroupPct: e } }, storage: { type: "html5", name: "id5id", expires: 90, refreshInSeconds: 28800 } };
                        return yi(Oa, "config", t), t;
                    }
                    getPartnerId() {
                        return this.partnerId;
                    }
                    trackControlGroup(e) {
                        return p(this, void 0, void 0, function* () {
                            const t = yield this.getControlGroup(e);
                            yi(Oa, "Control group", t), this.setTargeting(this.id5GroupKey, t);
                        });
                    }
                    getControlGroup(e) {
                        var t, i, n;
                        return p(this, void 0, void 0, function* () {
                            yield new Vi(
                                () => {
                                    var t, i, n;
                                    return void 0 !== (null === (n = null === (i = null === (t = e.getUserIds()) || void 0 === t ? void 0 : t.id5id) || void 0 === i ? void 0 : i.ext) || void 0 === n ? void 0 : n.abTestingControlGroup);
                                },
                                10,
                                20
                            ).until();
                            const s = null === (n = null === (i = null === (t = e.getUserIds()) || void 0 === t ? void 0 : t.id5id) || void 0 === i ? void 0 : i.ext) || void 0 === n ? void 0 : n.abTestingControlGroup;
                            return void 0 === s ? "U" : !0 === s ? "B" : "A";
                        });
                    }
                    setTargeting(e, t) {
                        ji.set(e, t), yi(Oa, "set targeting", e, t);
                    }
                    enableAnalytics(e) {
                        Y.get("bidders.prebid.id5Analytics.enabled") && (yi(Oa, "enabling ID5 Analytics"), e.enableAnalytics({ provider: "id5Analytics", options: { partnerId: this.partnerId } }));
                    }
                })(),
                Da = "LiveRamp";
            class La {}
            (La.PLACEMENT_ID = "2161"), (La.ENVELOPE_STORAGE_NAME = "idl_env");
            const ka = new (class {
                getConfig() {
                    if (this.isEnabled()) return yi(Da, "enabled"), { name: "identityLink", params: { pid: La.PLACEMENT_ID }, storage: { type: "html5", name: La.ENVELOPE_STORAGE_NAME, expires: 1, refreshInSeconds: 1800 } };
                    yi(Da, "disabled");
                }
                isEnabled() {
                    return Y.get("bidders.liveRampId.enabled") && !Y.get("options.optOutSale") && !gn();
                }
            })();
            function Ra(e) {
                return 0 === e ? 0 : e < 1 ? 1 : Math.floor(e);
            }
            function xa(e) {
                return e ? parseFloat(e).toFixed(2) : "";
            }
            const Ua = "YahooConnectId",
                Va = new (class {
                    constructor() {
                        this.pixelId = "58833";
                    }
                    getConfig() {
                        if (!Y.get("bidders.prebid.yahooConnectId.enabled")) return void yi(Ua, "disabled");
                        yi(Ua, "enabled");
                        const e = { name: "connectId", params: { pixelId: this.pixelId, puid: ji.get("ppid") || "0" }, storage: { type: "html5", name: "connectId", expires: 15 } };
                        return yi(Ua, "config", e), e;
                    }
                })(),
                Ma = "prebid",
                ja = {
                    buckets: [
                        { max: 5, increment: 0.01 },
                        { max: 10, increment: 0.1 },
                        { max: 20, increment: 0.5 },
                        { max: 50, increment: 1 },
                    ],
                },
                Ba = {
                    buckets: [
                        { max: 10, increment: 0.01 },
                        { max: 20, increment: 0.5 },
                        { max: 50, increment: 1 },
                    ],
                };
            function za(e) {
                return p(this, void 0, void 0, function* () {
                    const t = ji.get("hb_adid", e.getSlotName());
                    if (t) {
                        const i = yield Ui.init();
                        yi(Ma, "marking video bid as used", e.getSlotName(), t), i.markWinningBidAsUsed({ adId: t }), e.emit(Mi.VIDEO_AD_USED);
                    }
                });
            }
            Gt.onSlotEvent(Mi.VIDEO_AD_IMPRESSION, ({ slot: e }) => za(e)), Gt.onSlotEvent(Mi.VIDEO_AD_ERROR, ({ slot: e }) => za(e));
            class Ga extends hs {
                constructor(e, t = 2e3, i = "not-defined") {
                    super("prebid", e, t),
                        (this.bidderConfig = e),
                        (this.timeout = t),
                        (this.bidGroup = i),
                        (this.tcf = Fr),
                        Na.configureAdapters(),
                        (this.adUnits = Na.setupAdUnits(this.bidGroup)),
                        (this.bidsRefreshing = Y.get("bidders.prebid.bidsRefreshing") || {}),
                        (this.prebidConfig = {
                            enableTIDs: !0,
                            bidderSequence: "random",
                            bidderTimeout: this.timeout,
                            cache: { url: "https://prebid.adnxs.com/pbc/v1/cache" },
                            debug: ["1", "true"].includes(U.get("pbjs_debug")),
                            cpmRoundingFunction: Ra,
                            mediaTypePriceGranularity: { banner: ja, video: Ba, "video-outstream": Ba },
                            ozone: { enhancedAdserverTargeting: !1, oz_whitelist_adserver_keys: [] },
                            rubicon: { singleRequest: !0 },
                            userSync: {
                                filterSettings: { iframe: { bidders: "*", filter: "include" }, image: { bidders: "*", filter: "include" } },
                                userIds: [],
                                auctionDelay: Y.get("bidders.prebid.auctionDelay") || 50,
                                syncsPerBidder: 3,
                                syncDelay: 6e3,
                            },
                        }),
                        gn() && (this.prebidConfig.coppa = !0),
                        (this.prebidConfig = Object.assign(
                            Object.assign(Object.assign(Object.assign(Object.assign({}, this.prebidConfig), this.configureTargeting()), this.configureTCF()), this.configureS2sBidding()),
                            this.configureJwpRtd()
                        )),
                        this.configureUserSync(),
                        this.configureSChain(),
                        this.applyConfig(this.prebidConfig),
                        this.configureAdUnits(),
                        this.registerBidsRefreshing(),
                        this.registerBidsTracking(),
                        this.enableATSAnalytics(),
                        yi(Ma, "prebid created", this.prebidConfig);
                }
                configureTargeting() {
                    return Y.get("bidders.prebid.disableSendAllBids")
                        ? { enableSendAllBids: !1, targetingControls: { alwaysIncludeDeals: !0, allowTargetingKeys: ["AD_ID", "BIDDER", "DEAL", "PRICE_BUCKET", "SIZE", "UUID", "CACHE_HOST"] } }
                        : {
                              enableSendAllBids: !0,
                              sendBidsControl: { bidLimit: 2, dealPrioritization: !0 },
                              targetingControls: {
                                  alwaysIncludeDeals: !0,
                                  allowTargetingKeys: ["AD_ID", "BIDDER", "PRICE_BUCKET", "UUID", "SIZE", "DEAL", "CACHE_HOST"],
                                  allowSendAllBidsTargetingKeys: ["AD_ID", "PRICE_BUCKET", "UUID", "SIZE", "DEAL"],
                              },
                          };
                }
                configureUserSync() {
                    this.configureOzone(), this.configureId5(), this.configureLiveRamp(), this.configureYahooConnectId();
                }
                configureLiveRamp() {
                    const e = ka.getConfig();
                    void 0 !== e && (this.prebidConfig.userSync.userIds.push(e), (this.prebidConfig.userSync.syncDelay = 3e3));
                }
                configureOzone() {
                    Y.get("bidders.prebid.ozone") && this.prebidConfig.userSync.userIds.push({ name: "pubCommonId", storage: { type: "cookie", name: "_pubcid", expires: 365 } });
                }
                configureId5() {
                    return p(this, void 0, void 0, function* () {
                        const e = Pa.getConfig();
                        if (!e) return;
                        this.prebidConfig.userSync.userIds.push(e);
                        const t = yield Ui.init();
                        e.params.abTesting.enabled && Pa.trackControlGroup(t), Pa.enableAnalytics(t), Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: "id5_done" });
                    });
                }
                configureYahooConnectId() {
                    const e = Va.getConfig();
                    e && (Gt.emit(Bt.YAHOO_LOADED), this.prebidConfig.userSync.userIds.push(e));
                }
                configureSChain() {
                    this.configureWebAdsSChain();
                }
                configureWebAdsSChain() {
                    return p(this, void 0, void 0, function* () {
                        (yield Ui.init()).setBidderConfig({ bidders: ["relevantdigital"], config: { schain: { validation: "strict", config: { ver: "1.0", complete: 1, nodes: [{ asi: "http://webads.eu", sid: "310035", hp: 1 }] } } } });
                    });
                }
                enableATSAnalytics() {
                    Y.get("bidders.liveRampATSAnalytics.enabled") &&
                        Y.get("bidders.liveRampId.enabled") &&
                        (yi(Ma, "prebid enabling ATS Analytics"),
                        window.pbjs.que.push(() => {
                            window.pbjs.enableAnalytics([{ provider: "atsAnalytics", options: { pid: La.PLACEMENT_ID } }]);
                        }));
                }
                configureTCF() {
                    return this.tcf.exists ? { consentManagement: { gdpr: { cmpApi: "iab", timeout: this.timeout, allowAuctionWithoutConsent: !1, defaultGdprScope: !1 }, usp: { cmpApi: "iab", timeout: 100 } } } : {};
                }
                configureS2sBidding() {
                    if (!Y.get("bidders.s2s.enabled")) return;
                    const e = Y.get("bidders.s2s.bidders") || [];
                    return (
                        yi(Ma, "Prebid s2s enabled", e),
                        {
                            cache: { url: "https://prebid-server.rubiconproject.com/cache", ignoreBidderCacheKey: !0 },
                            s2sConfig: [
                                {
                                    accountId: 7450,
                                    bidders: e,
                                    defaultVendor: "rubicon",
                                    coopSync: !0,
                                    userSyncLimit: 8,
                                    allowUnknownBidderCodes: !0,
                                    extPrebid: { cache: { vastxml: { returnCreative: !1 } }, bidders: this.prepareExtPrebidBiders(e) },
                                },
                            ],
                        }
                    );
                }
                configureJwpRtd() {
                    if (Y.get("custom.hasFeaturedVideo") && Y.get("options.video.enableStrategyRules")) {
                        const e = Y.get("options.video.jwplayer.initialMediaId");
                        return { realTimeData: { auctionDelay: 100, dataProviders: [{ name: "jwplayer", waitForIt: !0, params: { mediaIDs: e ? [e] : [] } }] } };
                    }
                    return {};
                }
                prepareExtPrebidBiders(e) {
                    const t = {};
                    return (
                        e.forEach((e) => {
                            t[e] = { wrappername: "7450_Web_Server" };
                        }),
                        t
                    );
                }
                configureAdUnits(e = []) {
                    return p(this, void 0, void 0, function* () {
                        yield Ui.init(), e.length ? (this.adUnits = e) : this.adUnits || (this.adUnits = Na.setupAdUnits(this.bidGroup));
                    });
                }
                applyConfig(e) {
                    return p(this, void 0, void 0, function* () {
                        return (yield Ui.init()).setConfig(e);
                    });
                }
                applySettings() {
                    return p(this, void 0, void 0, function* () {
                        (yield Ui.init()).bidderSettings = Object.assign(
                            { standard: { suppressEmptyKeys: !0, allowZeroCpmBids: !0 } },
                            (function (e) {
                                const t = {};
                                return (
                                    e.forEach(({ bidderName: e, bidderSettings: i, aliases: n }) => {
                                        if (!e) return;
                                        let s = { adserverTargeting: [{ key: `hb_deal_${e}`, val: ({ dealId: e }) => e }], suppressEmptyKeys: !0, allowZeroCpmBids: !0 };
                                        i && (s = Object.assign(Object.assign({}, s), i)),
                                            (t[e] = s),
                                            "object" == typeof n &&
                                                Object.keys(n)
                                                    .filter((e) => !t[e])
                                                    .forEach((e) => (t[e] = s));
                                    }),
                                    t
                                );
                            })(Na.getAdapters())
                        );
                    });
                }
                callBids(e) {
                    this.adUnits || (this.adUnits = Na.setupAdUnits(this.bidGroup)),
                        0 !== this.adUnits.length &&
                            (this.applySettings(),
                            this.removeAdUnits(),
                            this.requestBids(this.adUnits, () => {
                                e(), Gt.emit(Bt.BIDDERS_AUCTION_DONE);
                            }),
                            Gt.emit(Bt.BIDDERS_BIDS_CALLED));
                }
                removeAdUnits() {
                    return p(this, void 0, void 0, function* () {
                        const e = yield Ui.init();
                        (e.adUnits || []).forEach((t) => e.removeAdUnit(t.code));
                    });
                }
                getBestPrice(e) {
                    return (function (e) {
                        return p(this, void 0, void 0, function* () {
                            const t = {},
                                i = Na.getAdapters();
                            for (const n of Array.from(i.entries())) {
                                const i = yield Ca(e, n[1].bidderName),
                                    { hb_pb: s } = i;
                                t[n[1].bidderName] = xa(s);
                            }
                            return t;
                        });
                    })(ds(e));
                }
                getTargetingKeys(e) {
                    return Object.keys(ji.dump(e) || {}).filter((e) => 0 === e.indexOf("hb_"));
                }
                getTargetingParams(e) {
                    return p(this, void 0, void 0, function* () {
                        return (yield Ui.init()).getAdserverTargeting()[ds(e)];
                    });
                }
                isSupported(e) {
                    const t = ds(e);
                    return this.adUnits && this.adUnits.some((e) => e.code === t);
                }
                registerBidsRefreshing() {
                    return p(this, void 0, void 0, function* () {
                        const e = yield Ui.init();
                        (this.bidsRefreshing = Y.get("bidders.prebid.bidsRefreshing") || {}),
                            e.onEvent("bidWon", (e) => {
                                if (-1 !== this.bidsRefreshing.slots.indexOf(e.adUnitCode)) {
                                    Gt.emit(Bt.BIDDERS_BIDS_REFRESH, { refreshedSlotNames: [e.adUnitCode] });
                                    const t = this.adUnits.filter((t) => t.code === e.adUnitCode && t.bids && t.bids[0] && t.bids[0].bidder === e.bidderCode);
                                    this.requestBids(t, this.bidsRefreshing.bidsBackHandler);
                                }
                            });
                    });
                }
                registerBidsTracking() {
                    return p(this, void 0, void 0, function* () {
                        const e = yield Ui.init();
                        e.onEvent("bidResponse", (e) => {
                            Gt.emit(Bt.BIDDERS_BIDS_RESPONSE, { bidResponse: this.mapResponseToTrackingBidDefinition(e) });
                        }),
                            e.onEvent("adRenderSucceeded", (e) => os.reportPrebidWin(e.bid));
                    });
                }
                mapResponseToTrackingBidDefinition(e) {
                    return { bidderName: e.bidderCode, price: e.cpm.toString(), responseTimestamp: e.responseTimestamp, slotName: ls(e.adUnitCode), size: e.size, timeToRespond: e.timeToRespond };
                }
                requestBids(e, t, i = this.timeout) {
                    return p(this, void 0, void 0, function* () {
                        const n = yield Ui.init();
                        yield os.initialize(n), n.requestBids({ adUnits: e, bidsBackHandler: t, timeout: i });
                    });
                }
                calculatePrices() {}
            }
            const Fa = "bidders";
            class $a extends Ys {
                constructor(e, t) {
                    super(e, t),
                        (this.instantConfig = e),
                        (this.globalTimeout = t),
                        (this.biddersProviders = {}),
                        (this.realSlotPrices = {}),
                        Gt.onSlotEvent(Mi.VIDEO_AD_REQUESTED, ({ slot: e }) => {
                            e.updateWinningPbBidderDetails();
                        }),
                        Gt.onSlotEvent(Mi.VIDEO_AD_USED, ({ slot: e }) => {
                            this.updateSlotTargeting(e.getSlotName());
                        }),
                        Gt.on(
                            Bt.BIDDERS_BIDS_REFRESH,
                            ({ refreshedSlotNames: e }) => {
                                e.forEach((e) => this.updateSlotTargeting(e));
                            },
                            !1
                        ),
                        Gt.on(
                            Bt.BIDDERS_CALL_PER_GROUP,
                            ({ group: e, callback: t }) => {
                                this.callByBidGroup(e).then(() => {
                                    yi(Fa, `${e} - callback`), t();
                                });
                            },
                            !1
                        );
                }
                getName() {
                    return "bidders";
                }
                isEnabled() {
                    return Y.get("bidders.prebid.enabled") || Y.get("bidders.a9.enabled");
                }
                applyTargetingParams(e, t) {
                    Object.keys(t).forEach((i) => ji.set(i, t[i], e));
                }
                getBidParameters(e) {
                    return p(this, void 0, void 0, function* () {
                        const t = {},
                            i = us(e);
                        return (
                            yield Promise.all(
                                this.getBiddersProviders(i).map((i) =>
                                    p(this, void 0, void 0, function* () {
                                        if (i && i.wasCalled()) {
                                            const n = yield i.getSlotTargetingParams(e);
                                            Object.assign(t, n);
                                        }
                                    })
                                )
                            ),
                            t
                        );
                    });
                }
                getCurrentSlotPrices(e) {
                    return p(this, void 0, void 0, function* () {
                        const t = {},
                            i = us(e);
                        return (
                            yield Promise.all(
                                this.getBiddersProviders(i).map((i) =>
                                    p(this, void 0, void 0, function* () {
                                        if (i && i.isSlotSupported(e)) {
                                            const n = yield i.getSlotBestPrice(e);
                                            Object.keys(n).forEach((e) => {
                                                t[e] = n[e];
                                            });
                                        }
                                    })
                                )
                            ),
                            t
                        );
                    });
                }
                getDfpSlotPrices(e) {
                    return this.realSlotPrices[e] || {};
                }
                resetTargetingKeys(e) {
                    const t = us(e);
                    this.getBiddersProviders(t).forEach((t) => {
                        t.getTargetingKeys(e).forEach((t) => {
                            ji.remove(t, e);
                        });
                    }),
                        yi(Fa, "resetTargetingKeys", e);
                }
                call() {
                    return this.callByBidGroup(rs);
                }
                callByBidGroup(e) {
                    const t = Y.get("bidders") || {},
                        i = un();
                    return (
                        (this.biddersProviders[e] = this.biddersProviders[e] || {}),
                        t.prebid && t.prebid.enabled && (this.biddersProviders[e].prebid = new Ga(t.prebid, t.timeout, e)),
                        qs.isEnabled() ? (this.biddersProviders[e].a9 = new qs(t.a9, t.timeout, e)) : yi(Fa, `Group: ${e} - A9 has been disabled`),
                        this.getBiddersProviders(e).length
                            ? (this.getBiddersProviders(e).forEach((t) => {
                                  t.addResponseListener(() => {
                                      this.hasAllResponses(e) && (yi(Fa, `Group: ${e} - ${t.name} - resolving call() promise because of having all responses`), i.resolve(null));
                                  }),
                                      t.call();
                              }),
                              yi(Fa, `Group: ${e} - returning call() promise`),
                              i)
                            : (yi(Fa, `Group: ${e} - resolving call() promise because of no bidder providers`), Promise.resolve())
                    );
                }
                storeRealSlotPrices(e) {
                    return p(this, void 0, void 0, function* () {
                        this.realSlotPrices[e] = yield this.getCurrentSlotPrices(e);
                    });
                }
                updateSlotTargeting(e) {
                    return p(this, void 0, void 0, function* () {
                        const t = yield this.getBidParameters(e);
                        return yield this.storeRealSlotPrices(e), this.resetTargetingKeys(e), this.applyTargetingParams(e, t), yi(Fa, "updateSlotTargeting", e, t), Gt.emit(Bt.BIDDERS_BIDDING_DONE, { slotName: e, provider: "prebid" }), t;
                    });
                }
                hasAllResponses(e) {
                    return (
                        0 ===
                        Object.keys(this.getBidderProviders(e)).filter((t) => {
                            const i = this.getBidderProviders(e)[t];
                            return !!i && !i.hasResponse();
                        }).length
                    );
                }
                getBiddersProviders(e) {
                    return Object.values(this.biddersProviders[e] || {});
                }
                getBidderProviders(e) {
                    return this.biddersProviders[e] || {};
                }
            }
            var Ha;
            let qa = class {
                constructor(e) {
                    this.bidders = e;
                }
                execute() {
                    Gt.on(
                        Bt.AD_ENGINE_SLOT_ADDED,
                        ({ slot: e }) => {
                            yi("ad-engine", `Added ad slot ${e.getSlotName()}`), this.bidders.updateSlotTargeting(e.getSlotName());
                        },
                        !1
                    );
                }
            };
            var Wa;
            qa = l([N(), u("design:paramtypes", ["function" == typeof (Ha = void 0 !== $a && $a) ? Ha : Object])], qa);
            let Ka = class {
                constructor(e) {
                    this.instantConfig = e;
                }
                execute() {
                    const e = Ai.make();
                    ji.set("labrador", e.mapSamplingResults(this.instantConfig.get("icLABradorGamKeyValues")));
                }
            };
            Ka = l([N(), u("design:paramtypes", ["function" == typeof (Wa = void 0 !== Pi && Pi) ? Wa : Object])], Ka);
            const Ya = te("[JWPlayer] Player Ready", { _as: "props", _p: void 0 }),
                Qa = te("[Ad Engine] Setup JWPlayer", { _as: "props", _p: void 0 });
            var Xa;
            let Ja = class {
                constructor(e) {
                    (this.globalTimeout = e), (this.steps = []), this.globalTimeout.set("partner-pipeline", Y.get("options.maxDelayTimeout"));
                }
                add(...e) {
                    return (this.steps = e), this;
                }
                execute(e = []) {
                    return (
                        this.steps.forEach((t) => {
                            if ("function" == typeof t) {
                                const i = t({});
                                i.execute(), e.push(i.initialized);
                            } else t.execute(), e.push(t.initialized);
                        }),
                        Promise.all(e)
                    );
                }
            };
            Ja = l([N({ scope: "Transient" }), u("design:paramtypes", ["function" == typeof (Xa = void 0 !== vs && vs) ? Xa : Object])], Ja);
            const Za = "ATS";
            class ed extends Ys {
                constructor() {
                    super(...arguments),
                        (this.isLoaded = !1),
                        (this.launchpadScriptUrl = "https://launchpad-wrapper.privacymanager.io/2f928425-1fbe-4680-b67a-c5f5ad831378/launchpad-liveramp.js"),
                        (this.launchpadBundleScriptUrl = "https://launchpad.privacymanager.io/latest/launchpad.bundle.js");
                }
                call() {
                    if (!this.isEnabled("bidders.liveRampATS.enabled")) return void yi(Za, "disabled");
                    if ((yi(Za, "enabled"), Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: "ats_start" }), this.isLoaded)) return void yi(Za, "not loaded");
                    const e = Y.get("wiki.opts.userEmailHashes");
                    if (!Array.isArray(e) || 3 !== (null == e ? void 0 : e.length)) return void yi(Za, "no hashes");
                    const [t, i, n] = e,
                        s = xi.loadScript(this.launchpadScriptUrl),
                        o = xi.loadScript(this.launchpadBundleScriptUrl);
                    return Promise.all([s, o]).then(() => {
                        const e = Y.get("options.geoRequiresConsent") ? "gdpr" : "ccpa",
                            s = "gdpr" === e ? j.get("euconsent-v2") : j.get("usprivacy");
                        window.ats.setAdditionalData({ consentType: e, consentString: s, type: "emailHashes", id: [i, n, t] }), yi(Za, "additional data set"), (this.isLoaded = !0), Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: "ats_done" });
                    });
                }
            }
            const td = "eyeota";
            class id extends Ys {
                constructor(e, t = null) {
                    super(e, t), (this.instantConfig = e), (this.globalTimeout = t);
                }
                call() {
                    return p(this, void 0, void 0, function* () {
                        return this.isEnabled("icEyeota")
                            ? (yi(td, "loading"),
                              xi
                                  .loadScript(yield this.createScriptSource())
                                  .then(() => {
                                      Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: "eyeota_started" }), yi(td, "ready");
                                  })
                                  .catch(() => {
                                      throw (Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: "eyeota_failed" }), new Error("Error occurred while loading eyeota"));
                                  }))
                            : (yi(td, "disabled"), Promise.resolve());
                    });
                }
                createScriptSource() {
                    var e, t;
                    return p(this, void 0, void 0, function* () {
                        const i = yield Fr.getTCData(),
                            n = ji.get("s0v"),
                            s = new URL("https://ps.eyeota.net/pixel");
                        s.searchParams.append("pid", "r8rcb20"), s.searchParams.append("sid", "fandom"), s.searchParams.append("t", "ajs"), s.searchParams.append("s0v", n);
                        let o = "";
                        if (null === (t = null === (e = window.fandomContext) || void 0 === e ? void 0 : e.site) || void 0 === t ? void 0 : t.tags) {
                            const { gnre: e, media: t, pform: i, pub: n, theme: s, tv: r } = window.fandomContext.site.tags;
                            o = (function (e) {
                                let t = "";
                                return Object.keys(e).forEach((i) => (e[i] || []).forEach((e) => (t += `&${i}=${encodeURI(e)}`))), t;
                            })({ gnre: e, media: t, pform: i, pub: n, theme: s, tv: r });
                        }
                        return i.gdprApplies && (s.searchParams.append("gdpr", "1"), s.searchParams.append("gdpr_consent", i.tcString)), s.toString() + o;
                    });
                }
            }
            const nd = "liveConnect",
                sd = nd,
                od = [
                    { id: "unifiedId", name: "liveConnect-unifiedId" },
                    { id: "sha2", name: nd },
                    { id: "md5", name: "liveConnect-md5" },
                    { id: "sha1", name: "liveConnect-sha1" },
                ];
            class rd extends Ys {
                constructor() {
                    super(...arguments), (this.fallbackQf = "0.3");
                }
                call() {
                    this.isEnabled("icLiveConnect") && this.isEnabled("icLiveConnectCachingStrategy") && !this.isEnabled("icIdentityPartners", !1)
                        ? (this.setupStorage(),
                          this.shouldLoadScript()
                              ? (yi(sd, "loading"),
                                Gt.emit(Bt.LIVE_CONNECT_STARTED),
                                xi.loadScript("https://b-code.liadm.com/a-07ev.min.js", !0, "first").then(() => {
                                    yi(sd, "loaded"), this.resolveAndTrackIds();
                                }))
                              : (Gt.emit(Bt.LIVE_CONNECT_CACHED), yi(sd, `already loaded and available in ${this.storageConfig.type}Storage`)))
                        : yi(sd, "disabled");
                }
                resolveAndTrackIds() {
                    var e;
                    if (!window.liQ) return void _i(sd, "window.liQ not available for tracking");
                    const t = null === (e = this.instantConfig.get("icLiveConnectQf")) || void 0 === e ? void 0 : e.toString();
                    window.liQ.resolve(
                        (e) => {
                            this.trackIds(e);
                        },
                        (e) => {
                            console.error(e);
                        },
                        { qf: t || this.fallbackQf, resolve: od.map((e) => e.id) }
                    );
                }
                trackIds(e) {
                    yi(sd, "resolve response:", e),
                        Object.keys(e).forEach((t) => {
                            const i = this.getTrackingKeyName(t);
                            if (this.isAvailableInStorage(i)) return;
                            "unifiedId" === t && Gt.emit(Bt.LIVE_CONNECT_RESPONDED_UUID);
                            const n = e[t];
                            yi(sd, `${t}: ${n}`), n && (this.storage.setItem(i, n, this.storageConfig.ttl), Gt.emit(Bt.IDENTITY_PARTNER_DATA_OBTAINED, { partnerName: i, partnerIdentityId: n }));
                        });
                }
                getTrackingKeyName(e) {
                    var t;
                    return null === (t = od.find((t) => t.id === e)) || void 0 === t ? void 0 : t.name;
                }
                setupStorage() {
                    (this.storageConfig = this.instantConfig.get("icLiveConnectCachingStrategy")), "local" === this.storageConfig.type ? (this.storage = Ho) : (this.storage = new wi(() => window.sessionStorage));
                }
                shouldLoadScript() {
                    var e;
                    if (!this.storageConfig) return !0;
                    let t = !1;
                    for (const i of this.storageConfig.mandatoryParams) {
                        const n = null === (e = od.find((e) => e.id === i)) || void 0 === e ? void 0 : e.name;
                        if (!this.isAvailableInStorage(n)) {
                            t = !0;
                            break;
                        }
                    }
                    return t;
                }
                isAvailableInStorage(e) {
                    return !!this.storage.getItem(e);
                }
            }
            class ad extends Ys {
                constructor() {
                    super(...arguments), (this.PARTNER_ID = 3442), (this.PARTNER_URL_CORE = "https://services.fandom.com/identity-storage/external/experian/receiveid"), (this.EXPERIAN_URL = "https://pixel.tapad.com/idsync/ex/receive");
                }
                call() {
                    this.isEnabled("icExperian") ? this.insertExperianPixel() : yi("experian", "disabled");
                }
                getExperianPixelUrl() {
                    const e = ji.get("ppid"),
                        t = Y.get("wiki.pvUID"),
                        i = `${this.PARTNER_URL_CORE}/${t}?id=\${TA_DEVICE_ID}\n\t\t\t&partner=TAPAD`;
                    return `${this.EXPERIAN_URL}?partner_id=${this.PARTNER_ID}\n\t\t&partner_device_id=${e}&partner_url=${i}`;
                }
                insertExperianPixel() {
                    Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: "experian_started" }), gs.loadPixel(this.getExperianPixelUrl());
                }
            }
            class dd extends Ys {
                constructor() {
                    super(...arguments), (this.PIXEL_ID = 712315), (this.logGroup = "LiveRamp pixel"), (this.PIXEL_URL = `https://idsync.rlcdn.com/${this.PIXEL_ID}.gif?partner_uid=`);
                }
                insertLiveRampPixel(e) {
                    const t = this.PIXEL_URL + e;
                    gs.loadPixel(t);
                }
                call() {
                    return p(this, void 0, void 0, function* () {
                        this.isEnabled("icLiveRampPixel")
                            ? Gt.on(Bt.IDENTITY_PARTNER_DATA_OBTAINED, (e) => {
                                  "Google" === e.payload.partnerName && this.insertLiveRampPixel(e.payload.partnerIdentityId);
                              })
                            : yi(this.logGroup, "pixel disabled");
                    });
                }
            }
            let ld = class {
                constructor() {
                    this.reasons = [];
                }
                isAdsMode() {
                    return !this.reasons.length;
                }
                getReasons() {
                    return [...this.reasons];
                }
                addReason(e) {
                    this.reasons.unshift(e);
                }
                addReasons(e) {
                    e && this.reasons.push(...e);
                }
                reset() {
                    this.reasons = [];
                }
            };
            var cd, ud, pd, hd, gd, md, fd, vd;
            ld = l([N()], ld);
            let bd = class {
                constructor(e, t, i, n, s, o, r, a) {
                    (this.pipeline = e), (this.noAdsDetector = t), (this.ats = i), (this.audigent = n), (this.eyeota = s), (this.liveConnect = o), (this.experian = r), (this.liveRampPixel = a);
                }
                execute() {
                    if ((this.removeAdSlotsPlaceholders(), this.noAdsDetector.addReasons(window.ads.context.opts.noAdsReasons), this.dispatchJWPlayerSetupAction(), this.dispatchVideoSetupAction(), Y.get("state.isLogged"))) {
                        const e = $s.make();
                        e.init().then(() => Gt.on(Bt.AD_ENGINE_CONSENT_UPDATE, (t) => e.sendHEM(e.getRecord(), t), !1));
                    }
                    this.pipeline
                        .add(this.liveRampPixel, this.ats, this.audigent, this.eyeota, this.liveConnect, this.experian)
                        .execute()
                        .then(() => {
                            Gt.emit(Bt.AD_ENGINE_PARTNERS_READY), Gt.emit(Bt.AD_ENGINE_STACK_START);
                        });
                }
                removeAdSlotsPlaceholders() {
                    document.querySelectorAll(".top-ads-container, .ad-slot-placeholder, .bottom-ads-container").forEach((e) => {
                        e.remove();
                    });
                }
                dispatchJWPlayerSetupAction() {
                    Gt.dispatch(Qa({ showAds: !1, autoplayDisabled: !1 }));
                }
                dispatchVideoSetupAction() {
                    Gt.emit(Bt.VIDEO_SETUP, { showAds: !1, autoplayDisabled: !1 });
                }
            };
            bd = l(
                [
                    N(),
                    u("design:paramtypes", [
                        "function" == typeof (cd = void 0 !== Ja && Ja) ? cd : Object,
                        "function" == typeof (ud = void 0 !== ld && ld) ? ud : Object,
                        "function" == typeof (pd = void 0 !== ed && ed) ? pd : Object,
                        "function" == typeof (hd = void 0 !== Js && Js) ? hd : Object,
                        "function" == typeof (gd = void 0 !== id && id) ? gd : Object,
                        "function" == typeof (md = void 0 !== rd && rd) ? md : Object,
                        "function" == typeof (fd = void 0 !== ad && ad) ? fd : Object,
                        "function" == typeof (vd = void 0 !== dd && dd) ? vd : Object,
                    ]),
                ],
                bd
            );
            class yd {
                static getEventData(e) {
                    const t = new Date();
                    return {
                        ad_error_code: e.ad_error_code,
                        ad_product: e.ad_product,
                        audio: e.audio ? 1 : 0,
                        browser: `${pi.getOperatingSystem()} ${pi.getBrowser()}`,
                        content_type: e.content_type || "",
                        country: Ci.getCountryCode() || "",
                        creative_id: e.creative_id || "",
                        ctp: e.ctp ? 1 : 0,
                        event_name: e.event_name,
                        line_item_id: e.line_item_id || "",
                        player: e.player,
                        position: e.position || "",
                        pv_number: Y.get("wiki.pvNumber"),
                        rv: ji.get("rv", e.position) || "",
                        skin: ji.get("skin") || "",
                        timestamp: t.getTime(),
                        tz_offset: t.getTimezoneOffset(),
                        user_block_autoplay: e.user_block_autoplay,
                        video_id: e.video_id || "",
                        video_number: e.video_number || "",
                    };
                }
                static emit(e) {
                    e.ad_product && e.player && e.event_name && Gt.emit(Bt.VIDEO_PLAYER_TRACKING, { eventInfo: e });
                }
                static emitVideoEvent(e) {
                    Gt.emit(Bt.VIDEO_EVENT, { videoEvent: e });
                }
            }
            const _d = new (class {
                register() {
                    const e = {
                        onEvent(e, t, i) {
                            const n = yd.getEventData(i);
                            yd.emit(n);
                        },
                    };
                    Y.push("listeners.porvata", e);
                }
            })();
            class Sd {
                constructor() {
                    (this.disabled = !1), (this.compilers = []);
                }
                disable() {
                    this.disabled = !0;
                }
                addCompiler(e) {
                    this.compilers.push(e);
                }
                compileData(e = null, t = null, i = {}) {
                    let n = { bid: t, slot: e, data: i };
                    return (
                        this.compilers.forEach((e) => {
                            n = e(n);
                        }),
                        n
                    );
                }
            }
            const Ed = ({ data: e, slot: t }) => ({
                    slot: t,
                    data: Object.assign(Object.assign({}, e), {
                        ad_status: e.ad_status || t.getStatus(),
                        advertiser_id: t.advertiserId || "",
                        creative_id: t.creativeId || "",
                        kv_pos: t.getMainPositionName(),
                        kv_rv: t.getTargetingProperty("rv") || "",
                        order_id: t.orderId || "",
                        product_lineitem_id: t.lineItemId || "",
                        slot_id: t.getUid() || "",
                        slot_size: t.getCreativeSize() || "",
                    }),
                }),
                wd = ({ data: e, slot: t }) => {
                    const i = Ai.make(),
                        n = new Date(),
                        s = n.getTime(),
                        o = t.getTargetingProperty("uap") && "none" !== t.getTargetingProperty("uap"),
                        r = ji.dump(),
                        a = (null == r ? void 0 : r.experiment_groups) || [];
                    return {
                        slot: t,
                        data: Object.assign(Object.assign({}, e), {
                            timestamp: s,
                            browser: `${pi.getOperatingSystem()} ${pi.getBrowser()}`,
                            country: (Ci.getCountryCode() || "").toUpperCase(),
                            device: pi.getDeviceType(),
                            is_uap: o ? 1 : 0,
                            kv_ah: window.document.body.scrollHeight,
                            kv_lang: r.lang || "",
                            kv_s0v: r.s0v || "",
                            kv_s1: r.s1 || "",
                            kv_s2: r.s2 || "",
                            kv_skin: r.skin || "",
                            labrador: [...i.getSamplingResults(), ...a].join(";"),
                            opt_in: Y.get("options.geoRequiresConsent") ? (Y.get("options.trackingOptIn") ? "yes" : "no") : "",
                            opt_out_sale: Y.get("options.geoRequiresSignal") ? (Y.get("options.optOutSale") ? "yes" : "no") : "",
                            page_width: (window.document.body.scrollWidth && window.document.body.scrollWidth.toString()) || "",
                            ppid: r.ppid,
                            pv: Y.get("wiki.pvNumber") || window.pvNumber || "",
                            pv_unique_id: Y.get("wiki.pvUID") || window.pvUID || "",
                            scroll_y: window.scrollY || window.pageYOffset,
                            tz_offset: n.getTimezoneOffset(),
                            viewport_height: window.innerHeight || 0,
                        }),
                    };
                },
                Ad = ({ data: e, slot: t }) => {
                    var i;
                    return { slot: t, data: Object.assign(Object.assign({}, e), { word_count: ji.get("word_count") || -1, short_page: null !== (i = Y.get("custom.short_page")) && void 0 !== i && i }) };
                };
            function Td(e, t) {
                return p(this, void 0, void 0, function* () {
                    const i = t.getDfpSlotPrices(e),
                        n = yield t.getCurrentSlotPrices(e);
                    function s(e) {
                        return i && i[e] ? i[e] : n && n[e] ? `${n[e]}not_used` : "";
                    }
                    return {
                        bidder_0: s("wikia"),
                        bidder_1: s("indexExchange"),
                        bidder_2: s("appnexus"),
                        bidder_4: s("rubicon"),
                        bidder_8: s("wikiaVideo"),
                        bidder_9: s("openx"),
                        bidder_10: s("appnexusAst"),
                        bidder_11: s("rubicon_display"),
                        bidder_12: s("a9"),
                        bidder_14: s("pubmatic"),
                        bidder_17: s("kargo"),
                        bidder_19: s("gumgum"),
                        bidder_21: s("triplelift"),
                        bidder_25: s("nobid"),
                        bidder_28: s("verizon"),
                        bidder_30: s("medianet"),
                        bidder_31: s("roundel"),
                        bidder_32: s("ogury"),
                        bidder_33: s("criteo"),
                        bidder_34: s("yahoossp"),
                        bidder_35: s("freewheel"),
                        bidder_37: s("webAds"),
                        bidder_38: s("seedtag"),
                    };
                });
            }
            const Id = ({ data: e, slot: t }, i) =>
                    p(void 0, void 0, void 0, function* () {
                        return i
                            ? {
                                  slot: t,
                                  data: Object.assign(
                                      Object.assign(Object.assign({}, e), { bidder_won: t.winningBidderDetails ? t.winningBidderDetails.name : "", bidder_won_price: t.winningBidderDetails ? t.winningBidderDetails.price : "" }),
                                      yield Td(t.getSlotName(), i)
                                  ),
                              }
                            : { slot: t, data: e };
                    }),
                Cd = new (class extends Sd {
                    constructor() {
                        super(...arguments),
                            (this.onRenderEndedStatusToTrack = [Yi.STATUS_COLLAPSE, Yi.STATUS_FORCED_COLLAPSE, Yi.STATUS_MANUAL, Yi.STATUS_SUCCESS]),
                            (this.onChangeStatusToTrack = [
                                Yi.STATUS_BLOCKED,
                                Yi.STATUS_REQUESTED,
                                Yi.STATUS_CLICKED,
                                Yi.STATUS_ERROR,
                                Yi.STATUS_VIEWPORT_CONFLICT,
                                Yi.STATUS_HIVI_COLLAPSE,
                                Yi.STATUS_HEAVY_AD_INTERVENTION,
                                Yi.STATUS_UNKNOWN_INTERVENTION,
                            ]),
                            (this.compilers = [Ed, wd, Ad]);
                    }
                    isEnabled() {
                        return !0;
                    }
                    register(e, { bidders: t }) {
                        this.isEnabled() &&
                            (Gt.onSlotEvent(Mi.SLOT_RENDERED_EVENT, ({ slot: e }) => {
                                e.trackStatusAfterRendered = !0;
                            }),
                            Gt.onSlotEvent(Mi.SLOT_STATUS_CHANGED, ({ slot: i }) =>
                                p(this, void 0, void 0, function* () {
                                    const n = i.getStatus();
                                    ((i.trackStatusAfterRendered && (delete i.trackStatusAfterRendered, this.onRenderEndedStatusToTrack.includes(n) || i.getConfigProperty("trackEachStatus"))) ||
                                        this.onChangeStatusToTrack.includes(n) ||
                                        i.getConfigProperty("trackEachStatus")) &&
                                        e(yield Id(this.compileData(i), t));
                                })
                            ),
                            Gt.onSlotEvent(Mi.CUSTOM_EVENT, ({ slot: i, payload: n }) =>
                                p(this, void 0, void 0, function* () {
                                    e(yield Id(this.compileData(i, null, { ad_status: null == n ? void 0 : n.status }), t));
                                })
                            ));
                    }
                })(),
                Nd = ({ data: e, slot: t }) => {
                    const i = new Date();
                    return { slot: t, data: Object.assign(Object.assign({}, e), { timestamp: i.getTime(), tz_offset: i.getTimezoneOffset() }) };
                },
                Od = ({ data: e, slot: t }) => ({
                    slot: t,
                    data: Object.assign(Object.assign({}, e), { creative_id: t.creativeId || "", line_item_id: t.lineItemId || "", rv: t.getTargetingProperty("rv") || "", slot_id: t.getUid() || "" }),
                }),
                Pd = new (class extends Sd {
                    constructor() {
                        super(...arguments), (this.compilers = [Nd, Od]);
                    }
                    isEnabled() {
                        return !0;
                    }
                    register(e) {
                        this.isEnabled() &&
                            Gt.onSlotEvent(Mi.SLOT_VIEWED_EVENT, ({ slot: t }) => {
                                e(this.compileData(t));
                            });
                    }
                })(),
                Dd = new (class extends Sd {
                    constructor() {
                        super(...arguments), (this.compilers = [wd]);
                    }
                    register(e) {
                        Gt.on(
                            Bt.AD_ENGINE_MESSAGE_BOX_EVENT,
                            ({ adSlotName: t, ad_status: i }) => {
                                e(this.compileData($n.get(t), null, { ad_status: i }));
                            },
                            !1
                        );
                    }
                })(),
                Ld = new (class extends Sd {
                    constructor() {
                        super(...arguments), (this.eventsToRegister = [Bt.AD_ENGINE_VIDEO_LEARN_MORE_CLICKED, Bt.AD_ENGINE_VIDEO_OVERLAY_CLICKED, Bt.AD_ENGINE_VIDEO_TOGGLE_UI_OVERLAY_CLICKED]), (this.compilers = [wd, Ed]);
                    }
                    register(e) {
                        Gt.onSlotEvent(Mi.SLOT_RENDERED_EVENT, ({ adSlotName: t }) => {
                            this.addClickTrackingListeners(e, t);
                        }),
                            this.eventsToRegister.map((t) => this.addToTracking(t, e));
                    }
                    addToTracking(e, t) {
                        Gt.on(
                            e,
                            ({ adSlotName: e, ad_status: i }) => {
                                t(this.compileData($n.get(e), null, { ad_status: i }));
                            },
                            !1
                        );
                    }
                    addClickTrackingListeners(e, t) {
                        this.clickDetection(t, e);
                    }
                    clickDetection(e, t) {
                        window.addEventListener("blur", () => {
                            const i = document.activeElement;
                            if (!i) return;
                            if (null === i.closest(`div#${e}`)) return;
                            yi("ad-click-tracker", `Click! on slot='${e}' is detected.`);
                            const n = $n.get(e);
                            this.handleClickEvent(t, n),
                                setTimeout(() => {
                                    document.activeElement.blur();
                                }, 100);
                        });
                    }
                    handleClickEvent(e, t) {
                        const i = { ad_status: Yi.STATUS_CLICKED };
                        e(this.compileData(t, null, i));
                    }
                })();
            function kd(e, t) {
                const i = $n.get(e);
                return !i || !i.getPushTime() || i.getPushTime() > t;
            }
            const Rd = ({ bid: e, data: t }) => {
                    const i = new Date().getTime(),
                        n = $n.getSlotId(e.slotName),
                        s = [];
                    return (
                        e.buyerId && s.push(`buyer_id=${e.buyerId}`),
                        {
                            bid: e,
                            data: Object.assign(Object.assign({}, t), {
                                timestamp: i,
                                slot_id: n,
                                name: e.bidderName,
                                size: e.size,
                                price: e.price,
                                response_time: e.timeToRespond,
                                status: kd(e.slotName, e.responseTimestamp) ? "on_time" : "too_late",
                                additional_flags: s.join(";"),
                            }),
                        }
                    );
                },
                xd = new (class extends Sd {
                    constructor() {
                        super(...arguments), (this.compilers = [Rd]);
                    }
                    isEnabled() {
                        return !0;
                    }
                    register(e) {
                        this.isEnabled() &&
                            Gt.on(
                                Bt.BIDDERS_BIDS_RESPONSE,
                                ({ bidResponse: t }) => {
                                    e(this.compileData(null, t));
                                },
                                !1
                            );
                    }
                })();
            class Ud {
                constructor(e) {
                    (this.adapter = e), (this.steps = []);
                }
                add(...e) {
                    return this.steps.push(...e), this;
                }
                execute(e, t) {
                    const i = this.createFinalNext(t);
                    return this.createExecutor(i)(e);
                }
                createFinalNext(e) {
                    return e
                        ? (t) => this.adapter.execute(e, t)
                        : (e) =>
                              p(this, void 0, void 0, function* () {
                                  return e;
                              });
                }
                createExecutor(e) {
                    return this.steps.reduceRight((e, t) => (i) => this.adapter.execute(t, i, e), e);
                }
            }
            class Vd {
                execute(e, t, i) {
                    return p(this, void 0, void 0, function* () {
                        return e(t, i);
                    });
                }
            }
            class Md extends Ud {
                constructor() {
                    super(new Vd());
                }
            }
            const jd = { DataWarehouse: "DW", GoogleAnalytics: "GA" },
                Bd = (e, t) => {
                    if (Object.values(jd).includes(e.target) && e.payload) return t({ payload: e.payload, target: e.target });
                };
            class zd {
                constructor(e) {
                    (this.requiredKeys = e), (this.pipeline = new Md()), this.pipeline.add(Bd);
                }
                register(e, t) {
                    if (this.isEnabled())
                        return (
                            Hi.register({ origin: t, keys: this.requiredKeys, infinite: !0 }, (t) => {
                                this.pipeline.execute(Object.assign({}, t), e);
                            }),
                            this
                        );
                }
                isEnabled() {
                    return !0;
                }
            }
            const Gd = "intervention-tracker",
                Fd = new (class {
                    register() {
                        Y.get("services.interventionTracker.enabled")
                            ? Gt.action$
                                  .pipe(
                                      zt(Gt.getGlobalAction(Bt.GAM_AD_INTERVENTION)),
                                      On((e) => this.handleIntervention(e))
                                  )
                                  .subscribe()
                            : yi(Gd, "Intervention tracker is disabled");
                    }
                    handleIntervention(e) {
                        const t = $n.get(e.slotName);
                        yi(Gd, e), t && (t.setStatus(this.getInterventionStatus(e.id)), ns.log("Ad intervention", { interventionId: e.id, interventionMessage: e.message, lineItemId: t.lineItemId, slotName: e.slotName }));
                    }
                    getInterventionStatus(e) {
                        return "HeavyAdIntervention" === e ? Yi.STATUS_HEAVY_AD_INTERVENTION : Yi.STATUS_UNKNOWN_INTERVENTION;
                    }
                })();
            var $d;
            let Hd = class {
                constructor(e) {
                    this.dwTracker = e;
                }
                init() {
                    Gt.on(
                        Bt.AD_ENGINE_AD_RESIZED,
                        ({ slot: e, sizes: t }) => {
                            this.track(e, t.width, t.height);
                        },
                        !1
                    );
                }
                track(e, t, i) {
                    this.dwTracker.track(
                        {
                            ad_width: t,
                            ad_height: i,
                            slot_id: e.getUid() || "",
                            creative_id: e.creativeId || "",
                            line_item_id: e.lineItemId || "",
                            rv: e.getTargetingProperty("rv") || "",
                            position: e.getMainPositionName(),
                            slot_size: e.getCreativeSize() || "",
                        },
                        lo.AD_ENG_AD_SIZE_INFO
                    );
                }
            };
            var qd;
            Hd = l([N(), u("design:paramtypes", ["function" == typeof ($d = void 0 !== zo && zo) ? $d : Object])], Hd);
            let Wd = class {
                constructor(e) {
                    this.dwTracker = e;
                }
                track(e) {
                    const t = new Date();
                    this.dwTracker.track({ prop_value: e, timestamp: t.getTime(), tz_offset: t.getTimezoneOffset() }, lo.AD_ENG_LABRADOR_INFO);
                }
            };
            var Kd, Yd, Qd, Xd, Jd;
            Wd = l([N(), u("design:paramtypes", ["function" == typeof (qd = void 0 !== zo && zo) ? qd : Object])], Wd);
            const Zd = te("[AdEngine] Ad clicked", { _as: "props", _p: void 0 });
            let el = class {
                constructor(e, t, i, n, s = null) {
                    (this.labradorTracker = e), (this.adSizeTracker = t), (this.dwTracker = i), (this.bidders = n), (this.instantConfig = s);
                }
                execute() {
                    this.porvataTracker(),
                        this.slotTracker(),
                        this.viewabilityTracker(),
                        this.bidderTracker(),
                        this.postmessageTrackingTracker(),
                        this.experimentGroupsTracker(),
                        this.interventionTracker(),
                        this.adClickTracker(),
                        this.ctaTracker(),
                        this.identityTracker(),
                        this.keyValsTracker(),
                        this.googleTopicsTracker(),
                        this.adSizeTracker.init();
                }
                identityTracker() {
                    this.instantConfig.get("icIdentityPartners", !1) ||
                        Gt.on(
                            Bt.IDENTITY_PARTNER_DATA_OBTAINED,
                            (e) => {
                                const { partnerName: t, partnerIdentityId: i } = e.payload;
                                if ((this.dwTracker.track({ partner_name: t, partner_identity_id: i }, lo.IDENTITY_INFO), ["liveConnect", "MediaWiki-sha256"].includes(t))) {
                                    const e = $s.make();
                                    e.init().then(() => e.sendHEM(i));
                                }
                            },
                            !1
                        );
                }
                porvataTracker() {
                    Gt.on(
                        Bt.VIDEO_PLAYER_TRACKING,
                        ({ eventInfo: e }) => {
                            this.dwTracker.track(e, lo.AD_ENG_PLAYER_INFO);
                        },
                        !1
                    ),
                        _d.register();
                }
                slotTracker() {
                    let e = null;
                    (Y.get("bidders.prebid.enabled") || Y.get("bidders.a9.enabled")) && (e = this.bidders),
                        Cd.onChangeStatusToTrack.push("top-conflict"),
                        Cd.register(
                            ({ data: e }) => {
                                this.dwTracker.track(e, lo.AD_ENG_AD_INFO);
                            },
                            { bidders: e }
                        );
                }
                viewabilityTracker() {
                    Pd.register(({ data: e }) => (this.dwTracker.track(e, lo.AD_ENG_VIEWABILITY), e));
                }
                ctaTracker() {
                    Dd.register(({ data: e }) => {
                        this.dwTracker.track(e, lo.AD_ENG_AD_INFO);
                    });
                }
                adClickTracker() {
                    Ld.register(({ data: e }) => {
                        Gt.dispatch(Zd(e)), this.dwTracker.track(e, lo.AD_ENG_AD_INFO);
                    });
                }
                bidderTracker() {
                    (Y.get("bidders.prebid.enabled") || Y.get("bidders.a9.enabled")) &&
                        xd.register(({ data: e }) => {
                            this.dwTracker.track(e, lo.AD_ENG_BIDDERS);
                        });
                }
                postmessageTrackingTracker() {
                    new zd(["payload", "target"]).register(
                        (e) =>
                            p(this, void 0, void 0, function* () {
                                const { target: t, payload: i } = e;
                                switch (t) {
                                    case jd.GoogleAnalytics:
                                        window.ga("tracker1.send", "event", i.category, i.action, i.label, "number" == typeof i.value ? i.value.toString() : i.value);
                                        break;
                                    case jd.DataWarehouse:
                                        this.dwTracker.track(i);
                                }
                                return e;
                            }),
                        [window.origin, ...En]
                    );
                }
                experimentGroupsTracker() {
                    const e = [...Ai.make().getSamplingResults(), ...(ji.get("experiment_groups") || [])].join(";");
                    e && this.labradorTracker.track(e);
                }
                interventionTracker() {
                    Fd.register();
                }
                keyValsTracker() {
                    const e = Object.assign({}, ji.dump());
                    delete e.AU_SEG, this.dwTracker.track({ keyvals: JSON.stringify(e) }, lo.KEY_VALS);
                }
                googleTopicsTracker() {
                    return p(this, void 0, void 0, function* () {
                        if (!("browsingTopics" in document && "featurePolicy" in document && document.featurePolicy.allowsFeature("browsing-topics"))) return;
                        const e = yield document.browsingTopics({ skipObservation: !0 });
                        this.dwTracker.track({ ppid: ji.get("ppid"), topic: JSON.stringify(e) }, lo.TOPICS);
                    });
                }
            };
            el = l(
                [
                    N(),
                    u("design:paramtypes", [
                        "function" == typeof (Kd = void 0 !== Wd && Wd) ? Kd : Object,
                        "function" == typeof (Yd = void 0 !== Hd && Hd) ? Yd : Object,
                        "function" == typeof (Qd = void 0 !== zo && zo) ? Qd : Object,
                        "function" == typeof (Xd = void 0 !== $a && $a) ? Xd : Object,
                        "function" == typeof (Jd = void 0 !== Pi && Pi) ? Jd : Object,
                    ]),
                ],
                el
            );
            const tl = "brand-metrics";
            class il extends Ys {
                call() {
                    this.instantConfig.get("icBrandMetrics") ? Gt.on(Bt.AD_ENGINE_SLOT_LOADED, this.loadScript, !0) : yi(tl, "disabled");
                }
                loadScript() {
                    const e = "//cdn.brandmetrics.com/tag/9097a5369e204e6eac53b45c7dde13c5/fandom.com_au.js";
                    yi(tl, "loading", e),
                        Ds.loadScriptWithStatus(e, tl).then(() => {
                            yi(tl, "ready");
                        });
                }
            }
            const nl = "captify";
            class sl extends Ys {
                constructor() {
                    super(...arguments), (this.propertyId = 12974);
                }
                call() {
                    return p(this, void 0, void 0, function* () {
                        return this.isEnabled("icCaptify") ? (this.overwritePropertyIdIfPresent(), this.createCaptifyWindowObject(), this.createAndInsertScript(), Promise.resolve()) : (yi(nl, "disabled"), Promise.resolve());
                    });
                }
                overwritePropertyIdIfPresent() {
                    const e = Y.get("services.captify.propertyId");
                    this.propertyId = e || this.propertyId;
                }
                createCaptifyWindowObject() {
                    window[`captify_kw_query_${this.propertyId}`] = "";
                }
                createAndInsertScript() {
                    const e = `https://p.cpx.to/p/${this.propertyId}/px.js`,
                        t = document.getElementsByTagName("script")[0];
                    xi.createScript(e, !1, t).onload = () => {
                        Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: "captify_loaded" }), yi(nl, "loaded");
                    };
                }
            }
            const ol = "nielsen-dcr",
                rl = {};
            class al extends Ys {
                constructor() {
                    super(...arguments), (this.nlsnInstance = null);
                }
                call() {
                    const e = ji.dump(),
                        t = Y.get("services.nielsen.customSection") || e.s0v,
                        i = e.post_id || e.artid;
                    if (!this.isEnabled("icNielsen", !1)) return yi(ol, "disabled"), null;
                    this.nlsnInstance ||
                        (this.nlsnInstance = (function (e) {
                            var t, i;
                            return (
                                yi(ol, "loading"),
                                ((t = window)[(i = "NOLBUNDLE")] = t[i] || {
                                    nlsQ: function (e, n, s, o, r, a) {
                                        return (
                                            ((o = (r = t.document).createElement("script")).defer = 1),
                                            (o.src = ("http:" === t.location.protocol ? "http:" : "https:") + "//cdn-gl.imrworldwide.com/conf/" + e + ".js#name=" + n + "&ns=" + i),
                                            (a = r.getElementsByTagName("script")[0]).parentNode.insertBefore(o, a),
                                            (t[i][n] = t[i][n] || {
                                                g: s || {},
                                                ggPM: function (e, s, o, r, a) {
                                                    (t[i][n].q = t[i][n].q || []).push([e, s, o, r, a]);
                                                },
                                            }),
                                            t[i][n]
                                        );
                                    },
                                }),
                                "1" === U.get("nielsen-dcr-debug") && (rl.nol_sdkDebug = "debug"),
                                window.NOLBUNDLE.nlsQ(e, "nlsnInstance", rl)
                            );
                        })("P26086A07-C7FB-4124-A679-8AC404198BA7")),
                        yi(ol, "ready");
                    const n = { type: "static", assetid: `fandom.com/${t}/${e.s1}/${i}`, section: `FANDOM ${t.replaceAll("_", " ").toUpperCase()} NETWORK` };
                    return this.nlsnInstance.ggPM("static", n), yi(ol, "called", n), this.nlsnInstance;
                }
            }
            const dl = ["gnre", "media", "pform", "pub", "theme", "tv"];
            class ll extends Ys {
                constructor() {
                    super(...arguments), (this.CLIENT_ID = 17364), (this.logGroup = "Lotame"), (this.PIXEL_URL = `https://tags.crwdcntrl.net/lt/c/${this.CLIENT_ID}/lt.min.js`);
                }
                call() {
                    var e, t;
                    return p(this, void 0, void 0, function* () {
                        if (!this.isEnabled("icLotame")) return void yi(this.logGroup, "pixel disabled");
                        const i = {
                                data: {
                                    behaviors: {
                                        med: (function (e = {}) {
                                            return Object.entries(e)
                                                .filter(([e]) => dl.includes(e))
                                                .flatMap(([e, t]) => t.map((t) => `${e}: ${t}`));
                                        })(null === (t = null === (e = window.fandomContext) || void 0 === e ? void 0 : e.site) || void 0 === t ? void 0 : t.tags),
                                    },
                                },
                                config: { clientId: this.CLIENT_ID, onTagReady: () => Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: "lotame_ready" }) },
                            },
                            n = i.config || {},
                            s = (window["lotame_" + this.CLIENT_ID] = {});
                        (s.config = n), (s.data = i.data || {}), (s.cmd = s.cmd || []), yi(this.logGroup, "pixel enabled"), yield xi.loadScript(this.PIXEL_URL), Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: "lotame_loaded" });
                    });
                }
            }
            var cl, ul, pl, hl, gl, ml, fl, vl, bl;
            let yl = class {
                constructor(e, t, i, n, s, o, r, a, d) {
                    (this.pipeline = e),
                        (this.brandMetrics = t),
                        (this.captify = i),
                        (this.eyeota = n),
                        (this.experian = s),
                        (this.liveRampPixel = o),
                        (this.nielsen = r),
                        (this.lotame = a),
                        (this.liveConnect = d),
                        (this.firstCallSlotName = "top_leaderboard"),
                        (this.safeTimeout = 5e3),
                        (this.fired = !1),
                        (this.logGroup = "ad-stack-partners");
                }
                execute() {
                    yi(this.logGroup, "waiting ..."),
                        setTimeout(() => {
                            this.pipelineExecute();
                        }, this.safeTimeout),
                        Gt.onSlotEvent(
                            Mi.SLOT_RENDERED_EVENT,
                            () => {
                                yi(this.logGroup, "starting"), this.pipelineExecute();
                            },
                            this.firstCallSlotName
                        );
                }
                pipelineExecute() {
                    this.fired ||
                        ((this.fired = !0),
                        this.pipeline
                            .add(this.lotame, this.liveConnect, this.liveRampPixel, this.brandMetrics, this.eyeota, this.experian, this.captify, this.nielsen)
                            .execute()
                            .then(() => {
                                yi(this.logGroup, "finished");
                            }));
                }
            };
            var _l, Sl;
            yl = l(
                [
                    N(),
                    u("design:paramtypes", [
                        "function" == typeof (cl = void 0 !== Ja && Ja) ? cl : Object,
                        "function" == typeof (ul = void 0 !== il && il) ? ul : Object,
                        "function" == typeof (pl = void 0 !== sl && sl) ? pl : Object,
                        "function" == typeof (hl = void 0 !== id && id) ? hl : Object,
                        "function" == typeof (gl = void 0 !== ad && ad) ? gl : Object,
                        "function" == typeof (ml = void 0 !== dd && dd) ? ml : Object,
                        "function" == typeof (fl = void 0 !== al && al) ? fl : Object,
                        "function" == typeof (vl = void 0 !== ll && ll) ? vl : Object,
                        "function" == typeof (bl = void 0 !== rd && rd) ? bl : Object,
                    ]),
                ],
                yl
            );
            let El = class {
                constructor(e) {
                    this.container = e;
                }
                execute(e, t, i) {
                    return p(this, void 0, void 0, function* () {
                        if (this.isCompoundProcessStep(e)) {
                            const t = this.container.get(e.process);
                            return yield t.execute(e.payload), i();
                        }
                        if (this.isDiProcess(e)) {
                            const t = this.container.get(e);
                            return yield t.execute(), i();
                        }
                        return yield e(), i();
                    });
                }
                isCompoundProcessStep(e) {
                    return "object" == typeof e && "process" in e && "function" == typeof e.process.prototype.execute;
                }
                isDiProcess(e) {
                    var t;
                    return "function" == typeof (null === (t = e.prototype) || void 0 === t ? void 0 : t.execute);
                }
            };
            El = l([N({ scope: "Transient" }), u("design:paramtypes", ["function" == typeof (_l = void 0 !== x && x) ? _l : Object])], El);
            let wl = class extends Ud {
                constructor(e) {
                    super(e.get(El));
                }
            };
            var Al;
            wl = l([N({ scope: "Transient" }), u("design:paramtypes", ["function" == typeof (Sl = void 0 !== x && x) ? Sl : Object])], wl);
            let Tl = class {
                constructor(e) {
                    this.container = e;
                }
                execute(e) {
                    return Promise.all(e.map((e) => this.container.get(wl).add(e).execute())).then();
                }
            };
            var Il;
            Tl = l([N({ scope: "Transient" }), u("design:paramtypes", ["function" == typeof (Al = void 0 !== x && x) ? Al : Object])], Tl);
            let Cl = class {
                constructor(e) {
                    this.container = e;
                }
                execute(e) {
                    return this.container
                        .get(wl)
                        .add(...e)
                        .execute();
                }
            };
            Cl = l([N({ scope: "Transient" }), u("design:paramtypes", ["function" == typeof (Il = void 0 !== x && x) ? Il : Object])], Cl);
            class Nl {
                constructor() {
                    this.logGroup = "identity-setup";
                }
                execute() {
                    return p(this, void 0, void 0, function* () {
                        return yi(this.logGroup, "initialized"), yield this.identityEngineReady(), this.setupOver18Targeting(), Promise.resolve();
                    });
                }
                identityEngineReady() {
                    return p(this, void 0, void 0, function* () {
                        return new Promise((e) => {
                            Gt.on(Bt.IDENTITY_ENGINE_READY, () => {
                                const t = hn.getValue("tracking", "ppid");
                                t && !Y.get("services.intentIq.ppid.enabled") && ji.set("ppid", t), ji.set("browser", hn.getValue(pn.targeting, "browser"));
                                const i = hn.getValue(pn.targeting, "adGroup");
                                if ((ji.set("adGroup", (null == i ? void 0 : i.split(",")) || []), Y.get("services.identityPartners"))) {
                                    const e = hn.getValue(pn.targeting, "AU_SEG");
                                    ji.set("AU_SEG", e);
                                }
                                hn.getValue(pn.site, "directedAtChildren") && ji.set("monetization", gn() ? "restricted" : "regular"), yi(this.logGroup, "ready"), e();
                            });
                        });
                    });
                }
                setupOver18Targeting() {
                    Gt.on(Bt.IDENTITY_PARTNER_DATA_OBTAINED, () => {
                        const e = window.fandomContext.tracking.over_18;
                        e && ji.set("over_18", e);
                    });
                }
            }
            var Ol;
            let Pl = class {
                constructor(e) {
                    this.container = e;
                }
                execute(e) {
                    return p(this, void 0, void 0, function* () {
                        const t = (yield this.getResult(e.condition)) ? e.yesStep : e.noStep;
                        if (t) return this.container.get(wl).add(t).execute();
                    });
                }
                getResult(e) {
                    return this.isDiCondition(e) ? this.container.get(e).execute() : e();
                }
                isDiCondition(e) {
                    var t;
                    return "function" == typeof (null === (t = e.prototype) || void 0 === t ? void 0 : t.execute);
                }
            };
            Pl = l([N({ scope: "Transient" }), u("design:paramtypes", ["function" == typeof (Ol = void 0 !== x && x) ? Ol : Object])], Pl);
            const Dl = {
                adUnitId:
                    "/{custom.dfpId}/{custom.serverPrefix}.{slotConfig.group}/{slotConfig.adProduct}{slotConfig.slotNameSuffix}/{state.deviceType}/{targeting.skin}-{targeting.original_host}-{targeting.s2}/{custom.wikiIdentifier}-{targeting.s0}",
                bidders: {
                    enabled: !1,
                    timeout: 2e3,
                    a9: { enabled: !1, videoEnabled: !1, amazonId: "3115", bidsRefreshing: { slots: ["featured", "gallery_leaderboard", "incontent_boxad_1", "incontent_leaderboard"] } },
                    prebid: { enabled: !1, bidsRefreshing: { slots: ["gallery_leaderboard", "incontent_boxad_1", "incontent_leaderboard", "incontent_player"] } },
                },
                custom: { dbNameForAdUnit: "_not_a_top1k_wiki", dfpId: "5441", serverPrefix: "wka1b", wikiIdentifier: "_not_a_top1k_wiki" },
                events: { pushOnScroll: { ids: [], threshold: 100, nativoThreshold: 200 } },
                slots: {},
                vast: {
                    adUnitId:
                        "/{custom.dfpId}/{custom.serverPrefix}.{slotConfig.group}/{slotConfig.adProduct}{slotConfig.slotNameSuffix}/{state.deviceType}/{targeting.skin}-{targeting.original_host}-{targeting.s2}/{custom.wikiIdentifier}-{targeting.s0}",
                    adUnitIdWithDbName:
                        "/{custom.dfpId}/{custom.serverPrefix}.{slotConfig.group}/{slotConfig.adProduct}{slotConfig.slotNameSuffix}/{state.deviceType}/{targeting.skin}-{targeting.original_host}-{targeting.s2}/{custom.dbNameForAdUnit}-{targeting.s0}",
                },
                templates: { ignoreNavbarHeight: !0, incontentAnchorSelector: ".mw-parser-output > h2,.mw-parser-output > h3,.mw-parser-output > h4,.mw-parser-output > h5" },
                services: {
                    anyclip: { pubname: "fandomcom", widgetname: { anime: "001w000001Y8ud2AAB_M8447", games: "001w000001Y8ud2AAB_M8446" }, libraryUrl: "https://player.anyclip.com/anyclip-widget/lre-widget/prod/v1/src/lre.js" },
                    doubleVerify: { slots: ["top_leaderboard", "top_boxad", "incontent_boxad_1", "incontent_leaderboard", "gallery_leaderboard", "bottom_leaderboard", "featured", "incontent_player"] },
                    durationMedia: { libraryUrl: "//tag.durationmedia.net/sites/10651/dm.js" },
                    connatix: { cid: "016551d5-7095-47c0-a46b-fd0cb9bf4c72", playerId: "96b46997-3bf8-4c9d-9761-c06758f44607", renderId: "858c22ce64e241d5acc77c4f6ed56d2d" },
                    iasPublisherOptimization: { slots: ["top_leaderboard", "top_boxad", "incontent_boxad_1", "incontent_leaderboard", "gallery_leaderboard", "bottom_leaderboard", "featured", "incontent_player"] },
                    externalLogger: { endpoint: "/wikia.php?controller=AdEngine&method=postLog" },
                    openWeb: { placementSelector: "#WikiaAdInContentPlaceHolder" },
                },
                slotGroups: { VIDEO: ["FEATURED", "OUTSTREAM", "UAP_BFAA", "UAP_BFAB", "VIDEO"] },
                src: ["gpt"],
                options: {
                    customAdLoader: { globalMethodName: "loadCustomAd" },
                    video: { iasTracking: { enabled: !1, config: { anId: "930616", campId: "640x480" } } },
                    wad: { enabled: !1, blocking: !1, btRec: { enabled: !1 } },
                    preload: { gpt: !1, audigent: !0, prebid: !0, apstag: !1, intentIq: !0 },
                },
            };
            let Ll;
            class kl extends Ys {
                call() {
                    return (
                        Gt.onSlotEvent(Mi.SLOT_RENDERED_EVENT, ({ slot: e }) => {
                            e.removeClass("default-height");
                        }),
                        (Ll = new ts()),
                        Ll.init()
                    );
                }
            }
            const Rl = "optimizely";
            let xl = class {
                constructor() {
                    this.targetingValues = {};
                }
                getVariant(e) {
                    const t = this.getForcedValue(e.EXPERIMENT_VARIANT);
                    if (t) return yi(Rl, `Experiment ${e.EXPERIMENT_ENABLED} - forced value`), t;
                    if (!this.getOptimizelyValue(e.EXPERIMENT_ENABLED)) return void yi(Rl, `Experiment ${e.EXPERIMENT_ENABLED} is disabled`);
                    const i = this.getOptimizelyValue(e.EXPERIMENT_VARIANT);
                    if ((yi(Rl, `Variant name: ${e.EXPERIMENT_VARIANT}`), void 0 !== i)) return yi(Rl, `Experiment ${e.EXPERIMENT_VARIANT} variant: ${i}`), i.toString();
                    yi(Rl, `Experiment ${e.EXPERIMENT_VARIANT} has undefined value`);
                }
                addVariantToTargeting(e, t) {
                    (this.targetingValues[e.EXPERIMENT_ENABLED] = t), ji.set("experiment_groups", Object.values(this.targetingValues));
                }
                getOptimizelyValue(e) {
                    var t;
                    return (window.adsExperiments = window.adsExperiments || {}), null !== (t = window.adsExperiments[e]) && void 0 !== t ? t : void 0;
                }
                getForcedValue(e) {
                    return U.get(`optimizely_${e}`);
                }
            };
            var Ul, Vl, Ml;
            xl = l([N()], xl);
            const jl = { EXPERIMENT_ENABLED: "strategy_rules", EXPERIMENT_VARIANT: "strategy_rules_variant" };
            let Bl = class extends Ys {
                constructor(e, t, i) {
                    super(e, t), (this.instantConfig = e), (this.globalTimeout = t), (this.optimizely = i);
                }
                call() {
                    this.setupOptimizelyExperiment(), this.addMediaIdToContextWhenStrategyRulesEnabled();
                }
                setupOptimizelyExperiment() {
                    this.optimizely.addVariantToTargeting(jl, "strategy_rules_undefined");
                    const e = this.optimizely.getVariant(jl);
                    e && (this.optimizely.addVariantToTargeting(jl, e), Y.set("options.video.enableStrategyRules", "strategy_rules_enabled" === e));
                }
                addMediaIdToContextWhenStrategyRulesEnabled() {
                    var e, t, i;
                    Y.get("options.video.enableStrategyRules") &&
                        Y.set(
                            "options.video.jwplayer.initialMediaId",
                            null === (i = null === (t = null === (e = null === window || void 0 === window ? void 0 : window.mw) || void 0 === e ? void 0 : e.config) || void 0 === t ? void 0 : t.get("wgArticleFeaturedVideo")) ||
                                void 0 === i
                                ? void 0
                                : i.mediaId
                        );
                }
            };
            function zl(e, t, i) {
                return (n) =>
                    Lt(
                        n.pipe(
                            Mt(1),
                            On(e, t, i),
                            Vt(() => !1)
                        ),
                        n
                    );
            }
            Bl = l(
                [N(), u("design:paramtypes", ["function" == typeof (Ul = void 0 !== Pi && Pi) ? Ul : Object, "function" == typeof (Vl = void 0 !== e && vs) ? Vl : Object, "function" == typeof (Ml = void 0 !== xl && xl) ? Ml : Object])],
                Bl
            );
            const Gl = new (class {
                isEnabled(e) {
                    return e.isIasTrackingEnabled();
                }
                load() {
                    return this.scriptPromise || (this.scriptPromise = xi.loadScript("//static.adsafeprotected.com/vans-adapter-google-ima.js", !0, "first")), this.scriptPromise;
                }
                init(e, t) {
                    return (
                        Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: "ias_start" }),
                        this.load().then(() => {
                            const i = Y.get("options.video.iasTracking.config"),
                                n = t.getSlotName(),
                                { src: s, pos: o, loc: r } = $n.get(n).getTargeting();
                            (i.custom = s),
                                (i.custom2 = o),
                                (i.custom3 = r),
                                yi("ias-video-tracking", "ready"),
                                window.googleImaVansAdapter.init(window.google, e.getAdsManager(), e.dom.getVideoContainer(), i),
                                Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: "ias_done" });
                        })
                    );
                }
            })();
            function Fl() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                var i = Tt(e);
                return Je(function (t, n) {
                    for (
                        var s = e.length,
                            o = new Array(s),
                            r = e.map(function () {
                                return !1;
                            }),
                            a = !1,
                            d = function (t) {
                                vt(e[t]).subscribe(
                                    Ze(
                                        n,
                                        function (e) {
                                            (o[t] = e), a || r[t] || ((r[t] = !0), (a = r.every(We)) && (r = null));
                                        },
                                        ke
                                    )
                                );
                            },
                            l = 0;
                        l < s;
                        l++
                    )
                        d(l);
                    t.subscribe(
                        Ze(n, function (e) {
                            if (a) {
                                var t = f([e], m(o));
                                n.next(i ? i.apply(void 0, f([], m(t))) : t);
                            }
                        })
                    );
                });
            }
            const $l = new (class {
                getLastNumber(e) {
                    let t = "";
                    return (
                        e.forEach((e) => {
                            isNaN(parseInt(e, 10)) || (t = e);
                        }),
                        t
                    );
                }
                getAdInfo(e) {
                    const t = { lineItemId: void 0, creativeId: void 0, contentType: void 0 };
                    if (!e) return t;
                    (t.lineItemId = e.getAdId()), (t.creativeId = e.getCreativeId()), (t.contentType = e.getContentType());
                    const i = e.getWrapperAdIds() || [];
                    i && i.length && (t.lineItemId = this.getLastNumber(i));
                    const n = e.getWrapperCreativeIds() || [];
                    n && n.length && (t.creativeId = this.getLastNumber(n));
                    const s = e.getWrapperAdSystems() || [];
                    return s && -1 !== s.indexOf("AdSense/AdX") && ((t.lineItemId = Sn), (t.creativeId = Sn)), t;
                }
                parse(e, t = {}) {
                    let i, n, s;
                    const o = U.getValues(e ? e.substr(1 + e.indexOf("?")) : "?"),
                        r = U.getValues(encodeURI(o.cust_params));
                    if (t.imaAd) {
                        const e = this.getAdInfo(t.imaAd);
                        (i = e.contentType), (n = e.creativeId), (s = e.lineItemId);
                    }
                    return { contentType: i, creativeId: n, customParams: r, lineItemId: s, position: o.vpos, size: o.sz };
                }
            })();
            var Hl = Array.isArray,
                ql = Object.getPrototypeOf,
                Wl = Object.prototype,
                Kl = Object.keys;
            function Yl(e) {
                if (1 === e.length) {
                    var t = e[0];
                    if (Hl(t)) return { args: t, keys: null };
                    if ((n = t) && "object" == typeof n && ql(n) === Wl) {
                        var i = Kl(t);
                        return {
                            args: i.map(function (e) {
                                return t[e];
                            }),
                            keys: i,
                        };
                    }
                }
                var n;
                return { args: e, keys: null };
            }
            function Ql(e, t) {
                return e.reduce(function (e, i, n) {
                    return (e[i] = t[n]), e;
                }, {});
            }
            function Xl() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                var i = It(e),
                    n = Tt(e),
                    s = Yl(e),
                    o = s.args,
                    r = s.keys;
                if (0 === o.length) return Dt([], i);
                var a = new Ye(
                    Jl(
                        o,
                        i,
                        r
                            ? function (e) {
                                  return Ql(r, e);
                              }
                            : We
                    )
                );
                return n ? a.pipe(nt(n)) : a;
            }
            function Jl(e, t, i) {
                return (
                    void 0 === i && (i = We),
                    function (n) {
                        Zl(
                            t,
                            function () {
                                for (
                                    var s = e.length,
                                        o = new Array(s),
                                        r = s,
                                        a = s,
                                        d = function (s) {
                                            Zl(
                                                t,
                                                function () {
                                                    var d = Dt(e[s], t),
                                                        l = !1;
                                                    d.subscribe(
                                                        Ze(
                                                            n,
                                                            function (e) {
                                                                (o[s] = e), l || ((l = !0), a--), a || n.next(i(o.slice()));
                                                            },
                                                            function () {
                                                                --r || n.complete();
                                                            }
                                                        )
                                                    );
                                                },
                                                n
                                            );
                                        },
                                        l = 0;
                                    l < s;
                                    l++
                                )
                                    d(l);
                            },
                            n
                        );
                    }
                );
            }
            function Zl(e, t, i) {
                e ? yt(i, e, t) : t();
            }
            function ec() {
                return St(1);
            }
            function tc() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return ec()(Dt(e, It(e)));
            }
            function ic() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                var i = It(e);
                return Je(function (t, n) {
                    (i ? tc(e, t, i) : tc(e, t)).subscribe(n);
                });
            }
            function nc(e, t, i, n, s) {
                return function (o, r) {
                    var a = i,
                        d = t,
                        l = 0;
                    o.subscribe(
                        Ze(
                            r,
                            function (t) {
                                var i = l++;
                                (d = a ? e(d, t, i) : ((a = !0), t)), n && r.next(d);
                            },
                            s &&
                                function () {
                                    a && r.next(d), r.complete();
                                }
                        )
                    );
                };
            }
            function sc(e, t) {
                return Je(nc(e, t, arguments.length >= 2, !0));
            }
            function oc() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                var i = It(e);
                return Dt(e, i);
            }
            function rc() {
                return Je(function (e, t) {
                    var i = null;
                    e._refCount++;
                    var n = Ze(t, void 0, void 0, void 0, function () {
                        if (!e || e._refCount <= 0 || 0 < --e._refCount) i = null;
                        else {
                            var n = e._connection,
                                s = i;
                            (i = null), !n || (s && n !== s) || n.unsubscribe(), t.unsubscribe();
                        }
                    });
                    e.subscribe(n), n.closed || (i = e.connect());
                });
            }
            var ac = (function (e) {
                    function t(t, i) {
                        var n = e.call(this) || this;
                        return (n.source = t), (n.subjectFactory = i), (n._subject = null), (n._refCount = 0), (n._connection = null), Xe(t) && (n.lift = t.lift), n;
                    }
                    return (
                        d(t, e),
                        (t.prototype._subscribe = function (e) {
                            return this.getSubject().subscribe(e);
                        }),
                        (t.prototype.getSubject = function () {
                            var e = this._subject;
                            return (e && !e.isStopped) || (this._subject = this.subjectFactory()), this._subject;
                        }),
                        (t.prototype._teardown = function () {
                            this._refCount = 0;
                            var e = this._connection;
                            (this._subject = this._connection = null), null == e || e.unsubscribe();
                        }),
                        (t.prototype.connect = function () {
                            var e = this,
                                t = this._connection;
                            if (!t) {
                                t = this._connection = new Ee();
                                var i = this.getSubject();
                                t.add(
                                    this.source.subscribe(
                                        Ze(
                                            i,
                                            void 0,
                                            function () {
                                                e._teardown(), i.complete();
                                            },
                                            function (t) {
                                                e._teardown(), i.error(t);
                                            },
                                            function () {
                                                return e._teardown();
                                            }
                                        )
                                    )
                                ),
                                    t.closed && ((this._connection = null), (t = Ee.EMPTY));
                            }
                            return t;
                        }),
                        (t.prototype.refCount = function () {
                            return rc()(this);
                        }),
                        t
                    );
                })(Ye),
                dc = {
                    connector: function () {
                        return new rt();
                    },
                };
            function lc(e, t) {
                void 0 === t && (t = dc);
                var i = t.connector;
                return Je(function (t, n) {
                    var s,
                        o = i();
                    vt(
                        e(
                            ((s = o),
                            new Ye(function (e) {
                                return s.subscribe(e);
                            }))
                        )
                    ).subscribe(n),
                        n.add(t.subscribe(o));
                });
            }
            function cc(e) {
                return e
                    ? function (t) {
                          return lc(e)(t);
                      }
                    : function (e) {
                          return (function (e, t) {
                              var i = be(e)
                                  ? e
                                  : function () {
                                        return e;
                                    };
                              return be(t)
                                  ? lc(t, { connector: i })
                                  : function (e) {
                                        return new ac(e, i);
                                    };
                          })(new rt())(e);
                      };
            }
            function uc(e, t) {
                return e === t;
            }
            function pc(...e) {
                return (t) => t.pipe(Vt(({ name: t }) => e.includes(t)));
            }
            function hc(e, t) {
                return new Ye((i) => {
                    e.on(t, (e) => {
                        i.next({ name: t, payload: e });
                    });
                }).pipe(cc(), rc());
            }
            function gc(e) {
                return (t) => {
                    return t.pipe(
                        tt((t) => ({ event: t, playlistItem: e.getPlaylistItem() || {} })),
                        (void 0 === n && (n = We),
                        (i = null != (i = (e, t) => e.playlistItem.mediaid === t.playlistItem.mediaid) ? i : uc),
                        Je(function (e, t) {
                            var s,
                                o = !0;
                            e.subscribe(
                                Ze(t, function (e) {
                                    var r = n(e);
                                    (!o && i(s, r)) || ((o = !1), (s = r), t.next(e));
                                })
                            );
                        })),
                        tt(({ event: e }) => e)
                    );
                    var i, n;
                };
            }
            function mc(...e) {
                return (t) => t.pipe(Vt(({ name: t }) => e.includes(t)));
            }
            let fc = class {
                handle({ stream$: e }) {
                    return this.isEnabled()
                        ? e.pipe(
                              mc("adStarted"),
                              Vt(({ state: e }) => "preroll" === e.adInVideo),
                              On(() => {
                                  this.track({ c1: "1", c2: 6177433, c5: "09" });
                              })
                          )
                        : Et;
                }
                isEnabled() {
                    return !!Y.get("options.video.comscoreJwpTracking") && (Y.get("options.geoRequiresConsent") ? Y.get("options.trackingOptIn") : !Y.get("options.geoRequiresSignal") || Y.get("options.optOutSale"));
                }
                track(e) {
                    var t;
                    null === (t = window.COMSCORE) || void 0 === t || t.beacon(e);
                }
            };
            fc = l([N({ scope: "Transient" })], fc);
            const vc = new (class {
                getVastAttributesFromVastParams(e, t) {
                    const i = t.customParams,
                        n = {};
                    return (
                        Object.keys(i).forEach((e) => {
                            let t = i[e];
                            if ("string" == typeof t) {
                                const e = t.split(",");
                                e.length > 1 && (t = e);
                            }
                            n[e] = t;
                        }),
                        {
                            "data-vast-content-type": t.contentType,
                            "data-vast-creative-id": t.creativeId,
                            "data-vast-line-item-id": t.lineItemId,
                            "data-vast-position": t.position,
                            "data-vast-size": t.size,
                            "data-vast-status": e,
                            "data-vast-params": JSON.stringify(n),
                        }
                    );
                }
                getVastAttributes(e, t, i) {
                    const n = $l.parse(e, { imaAd: i });
                    return this.getVastAttributesFromVastParams(t, n);
                }
            })();
            class bc {
                constructor() {
                    this.vastRequestedBeforePlayer = !1;
                }
                hasFeaturedVideo() {
                    return !!Y.get("custom.hasFeaturedVideo");
                }
                getVideoSyncedWithDisplayLines() {
                    return Y.get("options.video.uapJWPLineItemIds") || [];
                }
                getSyncTimeout() {
                    return Y.get("options.jwpMaxDelayTimeout");
                }
                isTaglessRequestEnabled() {
                    return Y.get("options.video.displayAndVideoAdsSyncEnabled");
                }
                wasVastRequestedBeforePlayer() {
                    return this.vastRequestedBeforePlayer;
                }
                clearVideoSyncStatus() {
                    this.vastRequestedBeforePlayer = !1;
                }
                setVastRequestedBeforePlayer() {
                    this.vastRequestedBeforePlayer = !0;
                }
                isSyncEnabled() {
                    return this.hasFeaturedVideo() && this.getSyncTimeout() && this.getVideoSyncedWithDisplayLines().length > 0 && this.isEnabledByConfig();
                }
                isEnabledByConfig() {
                    const e = Y.get("options.video.syncWithDisplay");
                    return "string" == typeof e ? bc.hasBundleOrTag(e) : Array.isArray(e) ? e.some((e) => bc.hasBundleOrTag(e)) : !!e;
                }
                static hasBundleOrTag(e) {
                    const t = e.split("=");
                    if (2 == t.length) {
                        const e = ji.get(t[0]);
                        return Array.isArray(e) ? e.includes(t[1]) : e === t[1];
                    }
                    return hn.hasBundle(e);
                }
            }
            const yc = new bc();
            class _c {
                constructor(e, t, i) {
                    (this.adSlot = e), (this.jwplayer = t), (this.targeting = i), (this.calledOnce = !1);
                }
                awaitIasTracking(e) {
                    return p(this, void 0, void 0, function* () {
                        if (!this.isIasTrackingEnabled()) return e;
                        try {
                            yield Gl.load();
                        } catch (e) {
                            console.error(e);
                        }
                        return e;
                    });
                }
                isIasTrackingEnabled() {
                    return Y.get("options.video.iasTracking.enabled");
                }
                initIasVideoTracking({ adsManager: e, videoElement: t }) {
                    const i = Y.get("options.video.iasTracking.config");
                    window.googleImaVansAdapter.init(google, e, t, i);
                }
                setSlotParams(e) {
                    (this.adSlot.lineItemId = e.lineItemId), (this.adSlot.creativeId = e.creativeId), (this.adSlot.creativeSize = e.size);
                }
                setSlotElementAttributes(e, t) {
                    const i = vc.getVastAttributesFromVastParams(e, t),
                        n = this.adSlot.element;
                    Object.keys(i).forEach((e) => n.setAttribute(e, i[e]));
                }
                emitVideoAdError(e) {
                    21009 === e ? this.adSlot.setStatus(Yi.STATUS_COLLAPSE) : this.adSlot.setStatus(Yi.STATUS_ERROR), this.adSlot.emit(Mi.VIDEO_AD_ERROR);
                }
                emitVideoAdRequest() {
                    this.adSlot.emit(Mi.VIDEO_AD_REQUESTED);
                }
                emitVideoAdImpression() {
                    this.adSlot.setStatus(Yi.STATUS_SUCCESS), this.adSlot.emit(Mi.VIDEO_AD_IMPRESSION);
                }
                updateVideoProperties(e) {
                    this.adSlot.setConfigProperty("videoDepth", e.depth), this.adSlot.setTargetingConfigProperty("rv", e.rv);
                }
                shouldPlayPreroll(e, t = null) {
                    return this.canAdBePlayed(e, t);
                }
                shouldPlayMidroll(e, t = null) {
                    return Y.get("options.video.isMidrollEnabled") && this.canAdBePlayed(e, t);
                }
                shouldPlayPostroll(e, t = null) {
                    return Y.get("options.video.isPostrollEnabled") && this.canAdBePlayed(e, t);
                }
                canAdBePlayed(e, t = null) {
                    const i = e > 1;
                    return this.adSlot.isEnabled() && (!i || (i && this.shouldPlayAdOnNextVideo(e, t)));
                }
                shouldPlayAdOnNextVideo(e, t = null) {
                    const i = Y.get("options.video.adsOnNextVideoFrequency");
                    return yi(_c.LOG_GROUP_NAME, e, t), Y.get("options.video.playAdsOnNextVideo") && i > 0 && (e - 1) % i == 0;
                }
                playVideoAd(e, t) {
                    if (yc.wasVastRequestedBeforePlayer()) yc.clearVideoSyncStatus();
                    else {
                        this.adSlot.setConfigProperty("audio", !t.mute);
                        const i = this.getVastUrl(e, t);
                        this.jwplayer.playAd(i);
                    }
                }
                getVastUrl(e, t) {
                    return (
                        this.calledOnce ? (t.rv++, this.updateVideoProperties(t)) : (this.calledOnce = !0),
                        Cs(0, this.adSlot.getSlotName(), { correlator: t.correlator, vpos: e, targeting: Object.assign({ rv: this.getRvKeyVal(t.rv), v1: t.playlistItem.mediaid || "" }, this.targeting) })
                    );
                }
                getRvKeyVal(e) {
                    return 1 === e ? "1" : [e.toString(), "2+"];
                }
            }
            _c.LOG_GROUP_NAME = "jwplayer-helper";
            class Sc extends _c {
                constructor(e, t, i, n = window.sponsoredVideos) {
                    super(e, t, i), (this.adSlot = e), (this.jwplayer = t), (this.targeting = i), (this.sponsoredVideos = n);
                }
                shouldPlayPreroll(e, t) {
                    return this.canAdBePlayed(e, t);
                }
                shouldPlayMidroll(e, t) {
                    return Y.get("options.video.isMidrollEnabled") && this.canAdBePlayed(e, t);
                }
                shouldPlayPostroll(e, t) {
                    return Y.get("options.video.isPostrollEnabled") && this.canAdBePlayed(e, t);
                }
                canAdBePlayed(e, t) {
                    return this.adSlot.isEnabled() && this.shouldPlayAdOnNextVideo(e, t);
                }
                shouldPlayAdOnNextVideo(e, t) {
                    yi(_c.LOG_GROUP_NAME, e, t, this.sponsoredVideos);
                    const i = U.get("force_sponsored_video");
                    if ((i && ((this.sponsoredVideos = [i]), this.log("Overwritting window.sponsoredVideo!", this.sponsoredVideos)), !Array.isArray(this.sponsoredVideos))) {
                        this.log("Incorrect window.sponsoredVideos, using fallback to Pandora!", this.sponsoredVideos);
                        const e = ws() + "article-video/jw-platform-api/get-sponsored-videos";
                        this.sponsoredVideos = JSON.parse(xi.loadSync(e));
                    }
                    return this.sponsoredVideos ? Y.get("options.video.playAdsOnNextVideo") && -1 === this.sponsoredVideos.indexOf(t) : (ns.log("JWPlayer - no sponsored videos", { currentMediaId: t, videoPlaysCounter: e }), !1);
                }
                log(e, t) {
                    yi(_c.LOG_GROUP_NAME, e, t);
                }
            }
            const Ec = new (class {
                constructor() {
                    (this.logGroup = "video-display-takeover-sync"), (this.initialized = un());
                }
                isEnabled() {
                    return yc.isSyncEnabled();
                }
                get() {
                    return this.isEnabled() || this.initialized.resolve(null), this.initialized;
                }
                isRequiredToRun() {
                    return this.isEnabled();
                }
                getDelayTimeoutInMs() {
                    return this.isEnabled() ? yc.getSyncTimeout() : 0;
                }
                resolve(e = null, t = null) {
                    this.isEnabled()
                        ? (e && t && yc.getVideoSyncedWithDisplayLines().includes(e)
                              ? (vr.updateSlotsTargeting(e, t), yi(this.logGroup, "video ad is from UAP:JWP campaign - updating key-vals"))
                              : yi(this.logGroup, "video ad is not from UAP:JWP campaign"),
                          this.initialized.resolve(null))
                        : yi(this.logGroup, "is disabled");
                }
            })();
            let wc = class {
                handle({ jwplayer: e, adSlot: t, targeting: i, stream$: n }) {
                    return (this.stream$ = n), (this.helper = new Sc(t, e, i)), Lt(this.adError(), this.adRequest(), this.adImpression(), this.adsManager(), this.beforePlay(), this.videoMidPoint(), this.beforeComplete());
                }
                adRequest() {
                    return this.stream$.pipe(
                        mc("adRequest"),
                        On(({ state: e }) => {
                            this.helper.emitVideoAdRequest(), this.helper.updateVideoProperties(e);
                        })
                    );
                }
                adImpression() {
                    return this.stream$.pipe(
                        mc("adImpression"),
                        On(({ state: e }) => {
                            this.helper.setSlotParams(e.vastParams), this.helper.setSlotElementAttributes("success", e.vastParams), this.helper.emitVideoAdImpression(), Ec.resolve(e.vastParams.lineItemId, e.vastParams.creativeId);
                        })
                    );
                }
                adError() {
                    return this.stream$.pipe(
                        mc("adError"),
                        On(({ payload: e, state: t }) => {
                            ((...e) => {
                                yi("jwplayer-ads-factory", ...e);
                            })(`ad error message: ${e.message}`),
                                this.helper.setSlotParams(t.vastParams),
                                this.helper.setSlotElementAttributes("error", t.vastParams),
                                this.helper.emitVideoAdError(e.adErrorCode),
                                Ec.resolve();
                        })
                    );
                }
                adsManager() {
                    return this.stream$.pipe(
                        mc("adsManager"),
                        Vt(() => this.helper.isIasTrackingEnabled()),
                        On(({ payload: e }) => this.helper.initIasVideoTracking(e))
                    );
                }
                beforePlay() {
                    return this.stream$.pipe(
                        mc("beforePlay"),
                        On(({ state: e }) => this.helper.updateVideoProperties(e)),
                        Vt(({ state: e }) => {
                            var t;
                            const i = this.helper.shouldPlayPreroll(e.depth, null === (t = null == e ? void 0 : e.playlistItem) || void 0 === t ? void 0 : t.mediaid);
                            return i || Ec.resolve(), i;
                        }),
                        _t((e) => this.helper.awaitIasTracking(e)),
                        On(({ state: e }) => this.helper.playVideoAd("preroll", e))
                    );
                }
                videoMidPoint() {
                    return this.stream$.pipe(
                        mc("videoMidPoint"),
                        Vt(({ state: e }) => {
                            var t;
                            return this.helper.shouldPlayMidroll(e.depth, null === (t = null == e ? void 0 : e.playlistItem) || void 0 === t ? void 0 : t.mediaid);
                        }),
                        On(({ state: e }) => this.helper.playVideoAd("midroll", e))
                    );
                }
                beforeComplete() {
                    return this.stream$.pipe(
                        mc("beforeComplete"),
                        Vt(({ state: e }) => {
                            var t;
                            return this.helper.shouldPlayPostroll(e.depth, null === (t = null == e ? void 0 : e.playlistItem) || void 0 === t ? void 0 : t.mediaid);
                        }),
                        On(({ state: e }) => this.helper.playVideoAd("postroll", e))
                    );
                }
            };
            wc = l([N({ scope: "Transient" })], wc);
            const Ac = {
                init: "init",
                lateReady: "late_ready",
                ready: "ready",
                adBlock: "blocked",
                adClick: "clicked",
                adRequest: "loaded",
                adError: "error",
                adImpression: "impression",
                adStarted: "started",
                adViewableImpression: "viewable_impression",
                adFirstQuartile: "first_quartile",
                adMidPoint: "midpoint",
                adThirdQuartile: "third_quartile",
                adComplete: "completed",
                adSkipped: "skipped",
                videoStart: "content_started",
                complete: "content_completed",
                error: "content_error",
            };
            let Tc = class {
                constructor() {
                    this.lastKnownAdData = { contentType: "", creativeId: "", lineItemId: "" };
                }
                handle({ adSlot: e, stream$: t }) {
                    return (
                        (this.adSlot = e),
                        t.pipe(
                            Vt((e) => this.isTrackingEvent(e)),
                            On((e) => this.track(e))
                        )
                    );
                }
                track(e) {
                    const t = this.getVideoData(e),
                        i = yd.getEventData(t);
                    yd.emit(i), yd.emitVideoEvent(e);
                }
                isTrackingEvent(e) {
                    return Object.keys(Ac).includes(e.name);
                }
                getVideoData(e) {
                    return (
                        (this.lastKnownAdData.contentType = e.state.vastParams.contentType || this.lastKnownAdData.contentType),
                        (this.lastKnownAdData.creativeId = e.state.vastParams.creativeId || this.lastKnownAdData.creativeId),
                        (this.lastKnownAdData.lineItemId = e.state.vastParams.lineItemId || this.lastKnownAdData.lineItemId),
                        {
                            ad_error_code: this.getErrorCode(e),
                            ad_product: this.getAdProduct(e),
                            audio: e.state.mute ? 0 : 1,
                            ctp: this.getCtp(e),
                            content_type: this.lastKnownAdData.contentType,
                            creative_id: this.lastKnownAdData.creativeId,
                            line_item_id: this.lastKnownAdData.lineItemId,
                            event_name: Ac[e.name],
                            player: "jwplayer",
                            position: this.adSlot.config.slotName,
                            user_block_autoplay: this.getUserBlockAutoplay(),
                            video_id: e.state.playlistItem.mediaid || "",
                            video_number: e.state.depth || "",
                        }
                    );
                }
                getErrorCode(e) {
                    return ["adError", "error"].includes(e.name) ? e.payload && e.payload.code : 0;
                }
                getAdProduct(e) {
                    switch (e.state.adInVideo) {
                        case "none":
                            return this.adSlot.config.slotName;
                        case "midroll":
                        case "postroll":
                        case "preroll":
                            return `${this.adSlot.config.trackingKey}-${e.state.adInVideo}`;
                        default:
                            return this.adSlot.config.trackingKey;
                    }
                }
                getCtp(e) {
                    return e.state.depth > 1 || e.state.config.autostart ? 0 : 1;
                }
                getUserBlockAutoplay() {
                    switch (j.get("featuredVideoAutoplay") || "-1") {
                        case "1":
                            return 1;
                        case "0":
                            return 0;
                        default:
                            return -1;
                    }
                }
            };
            Tc = l([N({ scope: "Transient" })], Tc);
            let Ic = class {
                manage() {
                    this.onPlayerReady()
                        .pipe(_t((e) => Lt(new wc().handle(e), new Tc().handle(e), new fc().handle(e))))
                        .subscribe();
                }
                onPlayerReady() {
                    return Gt.action$.pipe(
                        zt(Ya),
                        zl(() => {
                            this.loadIasTrackerIfEnabled();
                        }),
                        tt(({ options: e, targeting: t, playerKey: i }) => {
                            const n = window[i],
                                s = this.createAdSlot(e, n),
                                o = (function (e) {
                                    const t = (function (e) {
                                            const t = oc({ name: "init", payload: void 0 }),
                                                i = (function (e) {
                                                    return e.getConfig().itemReady ? oc({ name: "lateReady", payload: void 0 }) : oc();
                                                })(e),
                                                n = hc(e, "adRequest"),
                                                s = hc(e, "adError").pipe(
                                                    gc(e),
                                                    (function (e) {
                                                        const t = Lt(oc({ payload: { tag: null } }), e.pipe(tt((e) => e.payload)));
                                                        return (e) =>
                                                            e.pipe(
                                                                Fl(t),
                                                                tt(([e, t]) =>
                                                                    Object.assign(
                                                                        {},
                                                                        t,
                                                                        ((e) => {
                                                                            for (const t in e) void 0 === e[t] && delete e[t];
                                                                            return e;
                                                                        })(e)
                                                                    )
                                                                )
                                                            );
                                                    })(n)
                                                );
                                            return Lt(
                                                t,
                                                i,
                                                s,
                                                n,
                                                hc(e, "adImpression"),
                                                hc(e, "adBlock"),
                                                hc(e, "adsManager"),
                                                hc(e, "beforePlay").pipe(gc(e)),
                                                hc(e, "videoMidPoint"),
                                                hc(e, "beforeComplete"),
                                                hc(e, "complete"),
                                                hc(e, "ready"),
                                                hc(e, "adClick"),
                                                hc(e, "adStarted"),
                                                hc(e, "adViewableImpression"),
                                                hc(e, "adFirstQuartile"),
                                                hc(e, "adMidPoint"),
                                                hc(e, "adThirdQuartile"),
                                                hc(e, "adComplete"),
                                                hc(e, "adSkipped"),
                                                hc(e, "videoStart"),
                                                hc(e, "error")
                                            );
                                        })(e),
                                        i = (function (e, t) {
                                            const i = e.pipe(pc("beforePlay"), (e) => e.pipe(sc((e) => ({ correlator: Math.round(1e10 * Math.random()), depth: e.depth + 1 }), { correlator: 0, depth: 0 })), ic({ depth: 0, correlator: 0 })),
                                                n = Lt(e.pipe(pc("adRequest"), (e) => e.pipe(sc((e) => e + 1, 0)), ic(1))),
                                                s = e.pipe(pc("adRequest", "adError", "adImpression"), (e) => e.pipe(tt((e) => $l.parse(e.payload.tag, { imaAd: e.payload.ima && e.payload.ima.ad }))), ic($l.parse(null))),
                                                o = Lt(
                                                    e.pipe(
                                                        pc("beforePlay"),
                                                        tt(() => "preroll")
                                                    ),
                                                    e.pipe(
                                                        pc("videoMidPoint"),
                                                        tt(() => "midroll")
                                                    ),
                                                    e.pipe(
                                                        pc("beforeComplete"),
                                                        tt(() => "postroll")
                                                    )
                                                );
                                            return Xl([
                                                i,
                                                n,
                                                s,
                                                Lt(
                                                    e.pipe(
                                                        pc("adStarted"),
                                                        Fl(o),
                                                        tt(([, e]) => e)
                                                    ),
                                                    e.pipe(
                                                        pc("complete"),
                                                        tt(() => "none"),
                                                        ic("bootstrap")
                                                    )
                                                ),
                                                e.pipe(tt(() => ({ playlistItem: t.getPlaylistItem() || { sources: [], tracks: [], variations: [], images: [], allSources: [] }, config: t.getConfig(), mute: t.getMute() }))),
                                            ]).pipe(
                                                tt(([e, t, i, n, s]) => Object.assign(Object.assign(Object.assign({}, s), e), { vastParams: i, adInVideo: n, rv: t })),
                                                Ut(1)
                                            );
                                        })(t, e);
                                    return t.pipe(
                                        Fl(i),
                                        tt(([e, t]) => Object.assign(Object.assign({}, e), { state: t }))
                                    );
                                })(n);
                            return { jwplayer: n, adSlot: s, targeting: t, stream$: o };
                        })
                    );
                }
                createAdSlot(e, t) {
                    const i = e.slotName || (e.featured ? "featured" : "video"),
                        n = $n.get(i) || new kn({ id: i }),
                        s = t && t.getContainer && t.getContainer();
                    return (n.element = s && s.parentNode), n.setConfigProperty("audio", !t.getMute()), n.setConfigProperty("autoplay", t.getConfig().autostart), $n.get(i) || $n.add(n), n;
                }
                loadIasTrackerIfEnabled() {
                    Y.get("options.video.iasTracking.enabled") && Gl.load();
                }
            };
            var Cc, Nc, Oc;
            Ic = l([N()], Ic);
            let Pc = class {
                constructor(e, t, i) {
                    (this.fetchTimeout = e), (this.bidders = i), (this.logGroup = "display-and-video-ads-sync"), (this.timeout = t.get("icVastRequestTimeout", 500));
                }
                buildTaglessVideoRequest() {
                    return p(this, void 0, void 0, function* () {
                        const e = "featured",
                            t = $n.get(e) || new kn({ id: e });
                        return $n.get(e) || $n.add(t), Cs(0, e, { vpos: "preroll", targeting: yield this.bidders.getBidParameters(e) });
                    });
                }
                getVast() {
                    return p(this, void 0, void 0, function* () {
                        const e = yield this.buildTaglessVideoRequest();
                        return (
                            yi(this.logGroup, "Sending a tagless request: ", e),
                            this.fetchTimeout
                                .fetch(e, this.timeout)
                                .then((e) => e.text())
                                .then((e) => this.handleTaglessResponse(e))
                                .catch(() => {
                                    yi(this.logGroup, "Fetching error occurred");
                                })
                        );
                    });
                }
                handleTaglessResponse(e) {
                    try {
                        const t = this.getFirstAdFromTaglessResponse(e);
                        return yi(this.logGroup, "Ad received: ", null == t ? void 0 : t.lineItemId), Ec.resolve(null == t ? void 0 : t.lineItemId, null == t ? void 0 : t.creativeId), t;
                    } catch (e) {
                        yi(this.logGroup, "No XML available - not a VAST response from the ad server?");
                    }
                }
                getFirstAdFromTaglessResponse(e) {
                    var t, i;
                    const n = new DOMParser().parseFromString(e, "text/xml"),
                        s = n.getElementsByTagName("Ad"),
                        o = n.getElementsByTagName("Creative");
                    return { xml: e, lineItemId: null === (t = s[0]) || void 0 === t ? void 0 : t.id, creativeId: null === (i = o[0]) || void 0 === i ? void 0 : i.id };
                }
            };
            var Dc, Lc, kc, Rc, xc;
            Pc = l(
                [N(), u("design:paramtypes", ["function" == typeof (Cc = void 0 !== e && ms) ? Cc : Object, "function" == typeof (Nc = void 0 !== Pi && Pi) ? Nc : Object, "function" == typeof (Oc = void 0 !== $a && $a) ? Oc : Object])],
                Pc
            );
            const Uc = "player-setup";
            let Vc = (Dc = class extends Ys {
                constructor(e, t, i, n) {
                    super(e, t), (this.instantConfig = e), (this.globalTimeout = t), (this.jwpManager = i), (this.vastTaglessRequest = n), (this.jwpManager = i || new Ic());
                }
                call() {
                    return p(this, void 0, void 0, function* () {
                        Gt.on(Bt.VIDEO_PLAYER_RENDERED, () => {
                            this.loadIasTrackerIfEnabled();
                        });
                        const e = !Y.get("options.wad.blocking"),
                            t = e && yc.isSyncEnabled() && yc.isTaglessRequestEnabled() ? yield this.vastTaglessRequest.getVast() : void 0;
                        this.instantConfig.get("icConnatixInstream") ? Dc.initConnatixPlayer(e, t) : yield this.initJWPlayer(e, t);
                    });
                }
                initJWPlayer(e, t) {
                    return p(this, void 0, void 0, function* () {
                        yi(Uc, "JWP with ads controlled by AdEngine enabled");
                        const i = Y.get("options.video.enableStrategyRules");
                        (null == t ? void 0 : t.xml) && (yc.setVastRequestedBeforePlayer(), yi(Uc, "display and video sync response available")),
                            this.jwpManager.manage(),
                            e && !i
                                ? Gt.dispatch(Qa({ showAds: e, autoplayDisabled: !1, vastXml: null == t ? void 0 : t.xml }))
                                : i
                                ? (yi(Uc, "JWP Strategy Rules enabled - AdEngine does not control ads in JWP anymore"),
                                  this.jwpManager.manage(),
                                  Gt.dispatch(Qa({ showAds: e, autoplayDisabled: !1, vastUrl: yield this.vastTaglessRequest.buildTaglessVideoRequest(), strategyRulesEnabled: i })))
                                : (yi(Uc, "ad block detected, without ads"), Gt.dispatch(Qa({ showAds: e, autoplayDisabled: !1 })));
                    });
                }
                loadIasTrackerIfEnabled() {
                    Y.get("options.video.iasTracking.enabled") && (yi(Uc, "Loading IAS tracker for video player"), Gl.load());
                }
                static initConnatixPlayer(e, t) {
                    yi(Uc, "Connatix with ads not controlled by AdEngine enabled");
                    const i = "featured",
                        n = $n.get(i) || new kn({ id: i });
                    $n.get(i) || $n.add(n),
                        (null == t ? void 0 : t.xml) && (yc.setVastRequestedBeforePlayer(), yi(Uc, "display and video sync response available")),
                        Gt.on(Bt.VIDEO_EVENT, (e) => {
                            const { name: t, state: i } = e.videoEvent;
                            "adImpression" === t
                                ? (Ec.resolve(i.vastParams.lineItemId, i.vastParams.creativeId), n.setStatus(Yi.STATUS_SUCCESS), n.emit(Mi.VIDEO_AD_IMPRESSION))
                                : ["adError", "play", "playError"].includes(t) && Ec.resolve();
                        }),
                        Gt.on(Bt.BIDDERS_BIDDING_DONE, ({ slotName: s }) => {
                            s === i && Dc.emitVideoSetupEvent(e, n, t);
                        });
                }
                static emitVideoSetupEvent(e, t, i) {
                    Gt.emit(Bt.VIDEO_SETUP, { showAds: e, autoplayDisabled: !1, videoAdUnitPath: t.getVideoAdUnit(), targetingParams: Ts(t, {}, !1), vastXml: null == i ? void 0 : i.xml });
                }
            });
            function Mc(e, t) {
                new zo().track({ category: "ads-babdetector-detection", action: "impression", label: e ? "Yes" : "No", value: t });
            }
            Vc = Dc = l(
                [
                    N(),
                    u("design:paramtypes", [
                        "function" == typeof (Lc = void 0 !== Pi && Pi) ? Lc : Object,
                        "function" == typeof (kc = void 0 !== e && vs) ? kc : Object,
                        "function" == typeof (Rc = void 0 !== Ic && Ic) ? Rc : Object,
                        "function" == typeof (xc = void 0 !== Pc && Pc) ? xc : Object,
                    ]),
                ],
                Vc
            );
            const jc = "bt-loader",
                Bc = new (class {
                    run() {
                        return p(this, void 0, void 0, function* () {
                            if (!this.isEnabled()) return yi(jc, "disabled"), Promise.resolve();
                            this.btDetectionEvents(), this.insertSideUnits(), yi(jc, "loading"), yield this.loadScript();
                        });
                    }
                    isEnabled() {
                        return Y.get("options.wad.btRec.enabled") && Y.get("options.wad.blocking");
                    }
                    btDetectionEvents() {
                        const e = (t) => {
                            t.detail.ab ? (yi(jc, "BTAADetection - AdBlock detected"), Mc(!0, "wad-runner-bt")) : Mc(!1, "wad-runner-bt"), window.removeEventListener("BTAADetection", e);
                        };
                        window.addEventListener("BTAADetection", e);
                        const t = (e) => {
                            e.detail && yi(jc, "AcceptableAdsInit"), window.removeEventListener("AcceptableAdsInit", t);
                        };
                        window.addEventListener("AcceptableAdsInit", t);
                    }
                    loadScript() {
                        const e = Y.get("options.wad.btRec.loaderUrl") || "//btloader.com/tag?h=wikia-inc-com&upapi=true";
                        return Ds.loadScriptWithStatus(e, jc, !0, "first");
                    }
                    insertSideUnits() {
                        if (Y.get("state.isMobile") || !Y.get("options.wad.btRec.sideUnits") || document.body.classList.contains("is-content-expanded") || document.documentElement.classList.contains("is-content-expanded")) return;
                        const e = document.querySelector(".page.has-right-rail, .mainpage .page");
                        if (!e || (window.document.body.scrollWidth || 0) < 1542) return;
                        const t = document.createElement("div"),
                            i = document.createElement("div");
                        (t.className = "side-bt-container left"), (i.className = "side-bt-container right"), e.prepend(t, i);
                        const n = document.createElement("div"),
                            s = document.createElement("div");
                        (n.id = "btbgleft"), (s.id = "btbgright"), t.append(n), i.append(s);
                    }
                })(),
                zc = "bab-detection";
            let Gc,
                Fc = !1;
            const $c = new (class {
                    getName() {
                        return zc;
                    }
                    isEnabled() {
                        return Y.get("options.wad.enabled");
                    }
                    isBlocking() {
                        return Y.get("options.wad.blocking");
                    }
                    run() {
                        return p(this, void 0, void 0, function* () {
                            let e = yield this.checkBlocking();
                            return (
                                yi(zc, "BAB detection, AB detected:", e),
                                e || ((e = yield this.checkDomainBlocking()), yi(zc, "GAM domain blocking detection - detected:", e)),
                                this.setBodyClass(e),
                                this.setRuntimeParams(e),
                                this.updateSrcParameter(e),
                                this.dispatchDetectionEvents(e),
                                e
                            );
                        });
                    }
                    checkBlocking(e = () => {}, t = () => {}) {
                        return new Promise((e) => {
                            if (!Fc) {
                                if (!this.blockAdBlockExists()) return void e(!0);
                                this.setupBab();
                            }
                            Gc.onDetected(() => e(!0)), Gc.onNotDetected(() => e(!1)), Gc.check(!0);
                        }).then((i) => (i ? e() : t(), i));
                    }
                    blockAdBlockExists() {
                        return "undefined" != typeof BlockAdBlock;
                    }
                    checkDomainBlocking() {
                        return p(this, void 0, void 0, function* () {
                            let e = !1;
                            try {
                                yield fetch("https://www.doubleclick.net", { method: "HEAD", mode: "no-cors", cache: "no-store" });
                            } catch (t) {
                                e = !0;
                            }
                            return e;
                        });
                    }
                    setupBab() {
                        (Gc = this.createBlockAdBlock()), (Fc = !0);
                    }
                    createBlockAdBlock() {
                        return new BlockAdBlock({ checkOnLoad: !1, resetOnEnd: !0, loopCheckTime: 50, loopMaxNumber: 5, debug: !!U.get("bt_rec_debug") || !1 });
                    }
                    setRuntimeParams(e) {
                        (window.ads.runtime = window.ads.runtime || {}), (window.ads.runtime.bab = window.ads.runtime.bab || {}), (window.ads.runtime.bab.blocking = e), Y.set("options.wad.blocking", e);
                    }
                    updateSrcParameter(e) {
                        const t = Y.get("options.wad.blockingSrc");
                        e && t && Y.set("src", t);
                    }
                    dispatchDetectionEvents(e) {
                        const t = document.createEvent("Event"),
                            i = e ? "bab.blocking" : "bab.not_blocking";
                        t.initEvent(i, !0, !1), document.dispatchEvent(t), Gt.emit(Bt.AD_ENGINE_BAB_DETECTION, { detected: e });
                    }
                    setBodyClass(e) {
                        e && document.body.classList.add("bab-detected");
                    }
                })(),
                Hc = "bt-force-loader",
                qc = new (class {
                    run() {
                        return p(this, void 0, void 0, function* () {
                            if (!this.isEnabled()) return yi(Hc, "disabled"), Promise.resolve();
                            this.btDetectionEvents(), this.insertSideUnits(), yi(Hc, "loading"), yield this.loadScript();
                        });
                    }
                    btDetectionEvents() {
                        const e = (t) => {
                            t.detail.ab ? (yi(Hc, "BTAADetection - AdBlock detected"), Mc(!0, "bt")) : Mc(!1, "bt"), window.removeEventListener("BTAADetection", e);
                        };
                        window.addEventListener("BTAADetection", e);
                        const t = (e) => {
                            e.detail && yi(Hc, "AcceptableAdsInit"), window.removeEventListener("AcceptableAdsInit", t);
                        };
                        window.addEventListener("AcceptableAdsInit", t);
                    }
                    isEnabled() {
                        return Y.get("options.wad.btForce");
                    }
                    loadScript() {
                        return Ds.loadScriptWithStatus("https://btloader.com/tag?o=5199505043488768&upapi=true", Hc, !0, "first");
                    }
                    insertSideUnits() {
                        if (Y.get("state.isMobile") || document.body.classList.contains("is-content-expanded") || document.documentElement.classList.contains("is-content-expanded")) return;
                        const e = document.querySelector(".page.has-right-rail, .mainpage .page");
                        if (!e || (window.document.body.scrollWidth || 0) < 1542) return;
                        const t = document.createElement("div"),
                            i = document.createElement("div");
                        (t.className = "side-bt-container left"), (i.className = "side-bt-container right"), e.prepend(t, i);
                        const n = document.createElement("div"),
                            s = document.createElement("div");
                        (n.id = "btbgleft"), (s.id = "btbgright"), t.append(n), i.append(s);
                    }
                })(),
                Wc = () => {
                    sn.finishFirstCall(), Bc.run();
                };
            class Kc extends Ys {
                constructor() {
                    super(...arguments), (this.detector = $c), (this.onDetected = Wc);
                }
                call() {
                    return p(this, void 0, void 0, function* () {
                        if ((this.instantConfig.get("icBTForce") && Y.set("options.wad.btForce", !0), Y.get("options.wad.btForce"))) return qc.run();
                        if (!this.detector.isEnabled()) return Promise.resolve();
                        const e = yield this.detector.run();
                        Y.set("options.wad.blocking", e), Mc(e, "wad-runner"), e && this.onDetected();
                    });
                }
            }
            const Yc = "27342680309",
                Qc = "27359980218",
                Xc = "27295370448",
                Jc = "27266830455";
            function Zc() {
                var e, t, i, n, s;
                const o = Y.get("state.isMobile"),
                    r = null === (i = null === (t = null === (e = window.optimizely) || void 0 === e ? void 0 : e.get) || void 0 === t ? void 0 : t.call(e, "state")) || void 0 === i ? void 0 : i.getVariationMap(),
                    a = (null === (n = null == r ? void 0 : r[Xc]) || void 0 === n ? void 0 : n.id) === Jc && !o,
                    d = (null === (s = null == r ? void 0 : r[Yc]) || void 0 === s ? void 0 : s.id) === Qc && o;
                return a || d;
            }
            const eu = "Anyclip";
            class tu {
                constructor(e) {
                    this.subscribeFuncName = e;
                }
                trySubscribingBidRefreshing() {
                    const e = window[this.subscribeFuncName];
                    "function" == typeof e ? e(() => this.onAdImpressionHandler(), "adImpression") : yi(eu, "No Anyclip subscribe function available (lreSubscribe does not exist?)...");
                }
                onAdImpressionHandler() {
                    yi(eu, "AnyclipBidsRefresher: ad impression in Anyclip detected - refreshing");
                    const e = "incontent_player",
                        t = $n.get(e);
                    this.sendSignalToRemoveBids(t), Ki.setDataParam(t, "gptSlotParams", ji.dump(e));
                }
                sendSignalToRemoveBids(e) {
                    e.emit(Mi.VIDEO_AD_IMPRESSION);
                }
            }
            const iu = "Anyclip";
            class nu {
                constructor(e) {
                    (this.subscribeFuncName = e),
                        (this.trackingEvents = {
                            init: "init",
                            eligible: "eligible",
                            WidgetLoad: "ready",
                            adImpression: "impression",
                            adSkipped: "skipped",
                            adFirstQuartile: "first_quartile",
                            adMidpoint: "midpoint",
                            adThirdQuartile: "third_quartile",
                            adComplete: "completed",
                            adClick: "clicked",
                        });
                }
                register() {
                    this.setupAnyclipListeners();
                }
                setupAnyclipListeners() {
                    const e = window[this.subscribeFuncName];
                    "function" == typeof e
                        ? (yi(iu, "Subscribing to Anyclip events..."),
                          Object.keys(this.trackingEvents).map((t) => {
                              e((e) => this.track(t, e), t);
                          }))
                        : yi(iu, "Given subscribe function is not a function", this.subscribeFuncName, e);
                }
                trackInit() {
                    const e = "init";
                    this.track(e, yd.getEventData(this.getVideoData(e)));
                }
                trackEligible() {
                    const e = "eligible";
                    this.track(e, yd.getEventData(this.getVideoData(e)));
                }
                track(e, t) {
                    const i = yd.getEventData(this.getVideoData(e));
                    yi(iu, `Anyclip ${e} event data: `, t, this.getVideoData(e), i), yd.emit(i), yd.emitVideoEvent(i);
                }
                getVideoData(e) {
                    return { ad_error_code: 0, event_name: this.trackingEvents[e], player: "anyclip", ad_product: "outstream", position: "incontent_player", line_item_id: "unknown", creative_id: "unknown" };
                }
            }
            const su = "Anyclip",
                ou = "001w000001Y8ud2_19593",
                ru = "lreSubscribe",
                au = () => void 0 !== window.lreSubscribe,
                du = (e = "incontent_player") => {
                    const t = $n.get(e),
                        i = !!document.getElementById(e);
                    return yi(su, `Waiting for player ad slot (${e}) ready`, i, t), i && null !== t;
                };
            class lu extends Ys {
                get pubname() {
                    return Y.get("services.anyclip.pubname") || "fandomcom";
                }
                get widgetname() {
                    const e = Y.get("services.anyclip.widgetname");
                    return ["string", "undefined"].includes(typeof e) ? e || ou : ("object" == typeof e && (e[ji.get("s0v")] || e.default)) || ou;
                }
                get libraryUrl() {
                    return Y.get("services.anyclip.libraryUrl") || "//player.anyclip.com/anyclip-widget/lre-widget/prod/v1/src/lre.js";
                }
                static isApplicable() {
                    const e = Y.get("services.anyclip.isApplicable");
                    return "function" != typeof e || e();
                }
                call() {
                    this.isEnabled("services.anyclip.enabled", !1)
                        ? Zc() ||
                          (yi(su, "initialized", this.pubname, this.widgetname, this.libraryUrl),
                          Gt.emit(Bt.ANYCLIP_START),
                          (this.tracker = new nu(ru)),
                          (this.bidRefresher = new tu(ru)),
                          Y.get("services.anyclip.loadWithoutAnchor")
                              ? Gt.on(Bt.AD_ENGINE_UAP_LOAD_STATUS, (e) => {
                                    e.isLoaded || this.loadPlayerAsset();
                                })
                              : Y.get("custom.hasIncontentPlayer") && Gt.on(Bt.AD_ENGINE_UAP_LOAD_STATUS, this.loadOnUapStatus.bind(this)))
                        : yi(su, "disabled");
                }
                reset() {
                    var e, t;
                    yi(su, "Destroying Anyclip widgets"),
                        null === (t = null === (e = null === window || void 0 === window ? void 0 : window.anyclip) || void 0 === e ? void 0 : e.widgets) || void 0 === t || t.forEach((e) => (null == e ? void 0 : e.destroy()));
                }
                enableFloating() {
                    var e, t;
                    yi(su, "enabling Anyclip floating feature "),
                        null === (t = null === (e = null === window || void 0 === window ? void 0 : window.anyclip) || void 0 === e ? void 0 : e.getWidget()) || void 0 === t || t.floatingModeToggle(!0);
                }
                disableFloating() {
                    var e, t;
                    yi(su, "disabling Anyclip floating feature "),
                        null === (t = null === (e = null === window || void 0 === window ? void 0 : window.anyclip) || void 0 === e ? void 0 : e.getWidget()) || void 0 === t || t.floatingModeToggle(!1);
                }
                get params() {
                    return { pubname: this.pubname, widgetname: this.widgetname };
                }
                loadPlayerAsset(e = null) {
                    if (lu.isApplicable())
                        return (
                            yi(su, "loading Anyclip asset", this.libraryUrl),
                            xi.loadScript(this.libraryUrl, !0, e, this.params).then(() => {
                                null == e || e.classList.remove(kn.HIDDEN_AD_CLASS),
                                    yi(su, "ready"),
                                    this.waitForSubscribeReady().then((e) => {
                                        Gt.emit(Bt.ANYCLIP_READY),
                                            yi(su, "Anyclip global subscribe function set", e, window.lreSubscribe),
                                            this.waitForPlayerAdSlot().then(() => {
                                                this.tracker.trackInit(), this.bidRefresher.trySubscribingBidRefreshing();
                                            }),
                                            e ? this.tracker.register() : yi(su, "Anyclip global subscribe function not set");
                                    });
                            })
                        );
                    yi(su, "not applicable - aborting");
                }
                loadOnUapStatus({ isLoaded: e, adProduct: t }) {
                    if ((this.tracker.trackEligible(), e || "ruap" === t)) yi(su, "Anyclip blocked because of Fan Takeover");
                    else {
                        if (!Y.get("services.anyclip.latePageInject")) return yi(su, "No need to wait for ANYCLIP_LATE_INJECT"), void this.initIncontentPlayer();
                        Gt.on(Bt.ANYCLIP_LATE_INJECT, () => {
                            yi(su, "ANYCLIP_LATE_INJECT emitted"), this.initIncontentPlayer();
                        });
                    }
                }
                initIncontentPlayer() {
                    const e = $n.get("incontent_player"),
                        t = Y.get("services.anyclip.playerElementId");
                    e || t
                        ? t
                            ? this.waitForPlayerAdSlot(t).then(() => {
                                  if (!du()) return void yi(su, "No incontent player - aborting");
                                  const e = document.getElementById(t);
                                  this.loadPlayerAsset(e), (e.dataset.slotLoaded = "true");
                              })
                            : (on.updateOnCreate(e), this.loadPlayerAsset(e.getElement()))
                        : yi(su, "No incontent player - aborting");
                }
                waitForSubscribeReady() {
                    return new Vi(au, 4, 250).until();
                }
                waitForPlayerAdSlot(e = "incontent_player") {
                    return new Vi(() => du(e), 4, 250).until();
                }
            }
            const cu = "confiant";
            function uu(e, t, i, n, s, o) {
                if (o && o.dfp) {
                    const t = o.dfp.s,
                        i = $n.get(t);
                    i && i.emitEvent(`confiant-${e}`);
                }
            }
            class pu extends Ys {
                constructor() {
                    super(...arguments), (this.scriptDomain = "cdn.confiant-integrations.net"), (this.propertyId = "d-aIf3ibf0cYxCLB1HTWfBQOFEA");
                }
                call() {
                    return this.isEnabled("icConfiant", !1)
                        ? (this.overwritePropertyIdIfPresent(),
                          yi(cu, "loading"),
                          (window.confiant = window.confiant || {}),
                          (window.confiant.callback = uu),
                          this.loadScript().then(() => {
                              yi(cu, "ready");
                          }))
                        : (yi(cu, "disabled"), Promise.resolve());
                }
                overwritePropertyIdIfPresent() {
                    const e = Y.get("services.confiant.propertyId");
                    this.propertyId = e || this.propertyId;
                }
                loadScript() {
                    const e = `//${this.scriptDomain}/${this.propertyId}/gpt_and_prebid/config.js`;
                    return Ds.loadScriptWithStatus(e, cu, !0, "first");
                }
            }
            const hu = "connatix";
            class gu {
                constructor(e) {
                    this.playerApi = e;
                }
                registerBidRefreshing() {
                    "object" == typeof this.playerApi ? this.playerApi.on("adImpression", () => this.onAdImpressionHandler()) : yi(hu, "No Connatix player API available...");
                }
                onAdImpressionHandler() {
                    yi(hu, "ConnatixBidsRefresher: ad impression in Connatix detected - refreshing");
                    const e = "incontent_player",
                        t = $n.get(e);
                    this.sendSignalToRemoveBids(t), Ki.setDataParam(t, "gptSlotParams", ji.dump(e));
                }
                sendSignalToRemoveBids(e) {
                    e.emit(Mi.VIDEO_AD_IMPRESSION);
                }
            }
            var mu;
            !(function (e) {
                (e[(e.OutStream = 0)] = "OutStream"), (e[(e.InStream = 1)] = "InStream");
            })(mu || (mu = {}));
            class fu {
                get(e, t, i) {
                    return window.cnx.cmd.push(() => {
                        window.cnx({ playerId: e }).render(t, i);
                    });
                }
            }
            const vu = "connatix";
            class bu {
                constructor() {
                    this.trackingEvents = {
                        init: "init",
                        ready: "ready",
                        adImpression: "impression",
                        adSkipped: "skipped",
                        adCompleted25: "first_quartile",
                        adCompleted50: "midpoint",
                        adCompleted75: "third_quartile",
                        adCompleted100: "completed",
                        adClick: "clicked",
                    };
                }
                register() {
                    this.setupListeners();
                }
                setPlayerApi(e) {
                    this.playerApi = e;
                }
                setupListeners() {
                    "object" == typeof this.playerApi
                        ? (yi(vu, "Subscribing to Connatix events..."),
                          Object.keys(this.trackingEvents).map((e) => {
                              this.playerApi.on(e, (t) => this.track(e, t));
                          }))
                        : yi(vu, "Given playerApi is not an object", this.playerApi);
                }
                trackInit() {
                    const e = "init";
                    this.track(e, yd.getEventData(this.getVideoData(e)));
                }
                trackReady() {
                    const e = "ready";
                    this.track(e, yd.getEventData(this.getVideoData(e)));
                }
                track(e, t) {
                    const i = yd.getEventData(this.getVideoData(e));
                    yi(vu, `Connatix ${e} event data: `, t, this.getVideoData(e), i), yd.emit(i), yd.emitVideoEvent(i);
                }
                getVideoData(e) {
                    var t;
                    return {
                        ad_error_code: 0,
                        event_name: this.trackingEvents[e],
                        player: "connatix",
                        ad_product: (null === (t = null == this ? void 0 : this.playerApi) || void 0 === t ? void 0 : t.getPlayerType()) === mu.InStream ? "instream" : "outstream",
                        position: "incontent_player",
                        line_item_id: "unknown",
                        creative_id: "unknown",
                    };
                }
            }
            class yu {
                get playerId() {
                    return Y.get("services.connatix.playerId");
                }
                get renderId() {
                    return Y.get("services.connatix.renderId");
                }
                constructor(e) {
                    this.connatixPlayer = e;
                }
                insertPlayerContainer(e, t) {
                    yi(_u, "inserting Connatix player to the page");
                    const i = this.createPlayerTags(e, t),
                        n = document.getElementById("incontent_player");
                    n.appendChild(i), n.classList.remove(kn.HIDDEN_AD_CLASS);
                }
                createPlayerTags(e, t) {
                    const i = document.createElement("script");
                    i.setAttribute("id", this.renderId);
                    const n = document.createElement("img");
                    return n.setAttribute("src", `https://capi.connatix.com/tr/si?token=${this.playerId}&cid=${e}`), (n.innerHTML = this.connatixPlayer.get(this.playerId, this.renderId, t)), i.appendChild(n), i;
                }
            }
            const _u = "connatix";
            class Su extends Ys {
                get playerInstance() {
                    return Y.get("services.connatix.playerInstance");
                }
                get cid() {
                    return Y.get("services.connatix.cid");
                }
                isEnabled() {
                    return !!Y.get("services.connatix.enabled") && !!this.cid;
                }
                enableFloating() {
                    var e;
                    yi(_u, "enabling Connatix floating feature"), null === (e = this.playerInstance) || void 0 === e || e.enableFloatingMode();
                }
                disableFloating() {
                    var e;
                    yi(_u, "disabling Connatix floating feature"), null === (e = this.playerInstance) || void 0 === e || e.disableFloatingMode();
                }
                constructor(e, t, i, n) {
                    super(), (this.instantConfig = e), (this.globalTimeout = t), (this.playerInjector = i), (this.tracker = n);
                    const s = new fu();
                    (this.playerInjector = i || new yu(s)), (this.tracker = n || new bu());
                }
                call() {
                    return p(this, void 0, void 0, function* () {
                        this.isEnabled() ? Zc() || (yi(_u, "initialized", this.cid), Gt.on(Bt.AD_ENGINE_UAP_LOAD_STATUS, this.loadOnUapStatus.bind(this))) : yi(_u, "Connatix player is disabled");
                    });
                }
                loadOnUapStatus({ isLoaded: e, adProduct: t }) {
                    if (e || "ruap" === t) yi(_u, "Connatix blocked because of Fan Takeover");
                    else {
                        const e = Y.get("services.connatix.latePageInject");
                        if ((yi(_u, "No Fan Takeover loaded - injecting Connatix player"), !e))
                            return yi(_u, "No need to wait for CONNATIX_LATE_INJECT"), this.loadInitScript(), void this.playerInjector.insertPlayerContainer(this.cid, this.renderCallback.bind(this));
                        Gt.on(Bt.CONNATIX_LATE_INJECT, () => {
                            yi(_u, "CONNATIX_LATE_INJECT emitted"), this.loadInitScript(), this.playerInjector.insertPlayerContainer(this.cid, this.renderCallback.bind(this));
                        });
                    }
                }
                loadInitScript() {
                    var e;
                    (e = this.cid),
                        (function (t) {
                            if (!window.cnx) {
                                (window.cnx = {}), (window.cnx.cmd = []);
                                var i = t.createElement("iframe");
                                (i.src = "javascript:false"),
                                    (i.display = "none"),
                                    (i.onload = function () {
                                        var t = i.contentWindow.document,
                                            n = t.createElement("script");
                                        (n.src = `//cd.connatix.com/connatix.player.js?cid=${e}`), n.setAttribute("async", "1"), n.setAttribute("type", "text/javascript"), t.body.appendChild(n);
                                    }),
                                    t.head.appendChild(i);
                            }
                        })(document),
                        this.tracker.trackInit(),
                        yi(_u, "Connatix head script is ready");
                }
                renderCallback(e, t) {
                    e
                        ? yi(_u, "Connatix encountered an error while loading", e)
                        : (Y.set("services.connatix.playerInstance", t), yi(_u, "ready"), Gt.emit(Bt.CONNATIX_READY), this.tracker.setPlayerApi(t), this.tracker.trackReady(), this.tracker.register(), new gu(t).registerBidRefreshing());
                }
            }
            const Eu = "double-verify",
                wu = window.location.href;
            class Au extends Ys {
                constructor() {
                    super(...arguments), (this.isLoaded = !1), (this.slots = []), (this.adUnits = []);
                }
                call() {
                    return p(this, void 0, void 0, function* () {
                        if (!this.isLoaded)
                            if (this.isEnabled("icDoubleVerify"))
                                if (((this.slots = Y.get("services.doubleVerify.slots")), this.slots)) {
                                    this.setInitialTargeting();
                                    try {
                                        const e = this.prepareRequestURL(),
                                            t = this.getRequestHeaders(),
                                            i = yield fetch(e.href, { headers: t });
                                        if (!i.ok) throw new Error("Error fetching signals");
                                        const n = yield i.json();
                                        (this.isLoaded = !0), this.setTargeting(n);
                                    } catch (e) {
                                        yi(Eu, "Error fetching signals", e);
                                    }
                                } else yi(Eu, "Empty slots configuration");
                            else yi(Eu, "disabled");
                    });
                }
                setInitialTargeting() {
                    ji.set("ids", "-1"),
                        ji.set("bsc", "-1"),
                        ji.set("abs", "-1"),
                        this.slots.forEach((e) => {
                            ji.set("tvp", "-1", e), ji.set("vlp", "-1", e);
                        });
                }
                setTargeting(e) {
                    var t, i;
                    yi(Eu, "Setting targeting", e),
                        ji.set("ids", null === (t = e.IDS) || void 0 === t ? void 0 : t.toString()),
                        ji.set("bsc", e.BSC),
                        ji.set("abs", null === (i = e.ABS) || void 0 === i ? void 0 : i.toString()),
                        this.addToSlotsTargeting(e.TVP, "tvp"),
                        this.addToSlotsTargeting(e.VLP, "vlp");
                }
                addToSlotsTargeting(e, t) {
                    "object" == typeof e &&
                        Object.entries(e).forEach(([e, i]) => {
                            var n;
                            const s = this.adUnits.find((t) => t.path === e),
                                o = null !== (n = null == s ? void 0 : s.slotName) && void 0 !== n ? n : "";
                            ji.set(t, i[""], o);
                        });
                }
                getRequestHeaders() {
                    return { referer: wu, "user-agent": window.navigator.userAgent };
                }
                prepareRequestURL() {
                    const e = new URLSearchParams({ ctx: "28150781", cmp: "DV1001654", url: encodeURIComponent(wu) });
                    (this.adUnits = this.getAdUnitsForRequest()),
                        Object.values(this.adUnits).forEach(({ path: t }) => {
                            e.append(`adunits[${t}][]`, "");
                        });
                    const t = new URL("https://pub.doubleverify.com/signals/pub.json");
                    return (t.search = e.toString()), t;
                }
                getAdUnitsForRequest() {
                    return this.slots.map((e) => {
                        const t = Object.assign({}, Y.get(`slots.${e}`));
                        return (t.slotNameSuffix = t.slotNameSuffix || ""), { slotName: e, path: Dn.build(t.adUnit || Y.get("adUnitId"), { slotConfig: t }) };
                    });
                }
            }
            const Tu = "duration-media";
            class Iu extends Ys {
                call() {
                    const e = Y.get("services.durationMedia.libraryUrl");
                    return (
                        this.isEnabled("icDurationMedia", !1) && e
                            ? (yi(Tu, "loading", e),
                              Ds.loadScriptWithStatus(e, Tu, !1, null, { id: "dm-script" }).then(() => {
                                  yi(Tu, "ready");
                              }))
                            : yi(Tu, "disabled"),
                        Promise.resolve()
                    );
                }
            }
            const Cu = "ias-publisher-optimization",
                Nu = ["adt", "alc", "dlm", "drg", "hat", "off", "vio"],
                Ou = { veryLow: 1, low: 2, medium: 3, high: 4 };
            class Pu extends Ys {
                constructor() {
                    super(...arguments), (this.isLoaded = !1), (this.slotList = []);
                }
                call() {
                    return this.isEnabled("icIASPublisherOptimization")
                        ? this.isLoaded
                            ? void 0
                            : (yi(Cu, "loading..."),
                              (this.isLoaded = !0),
                              xi.loadScript("//cdn.adsafeprotected.com/iasPET.1.js", !0, "first").then(() => {
                                  yi(Cu, "asset loaded"), this.setup();
                              }))
                        : (yi(Cu, "disabled"), Promise.resolve());
                }
                setup() {
                    const e = [];
                    (this.slotList = Y.get("services.iasPublisherOptimization.slots")),
                        this.setInitialTargeting(),
                        this.slotList.forEach((t) => {
                            const i = Y.get(`slots.${t}`),
                                n = { adUnitPath: Dn.build(i.adUnit || Y.get("adUnitId"), { slotConfig: i }), adSlotId: t, size: this.getSlotSize(i) };
                            i.isVideo && (n.type = "video"), e.push(n);
                        }),
                        (window.__iasPET = window.__iasPET || {}),
                        (window.__iasPET.queue = window.__iasPET.queue || []),
                        (window.__iasPET.pubId = "930616"),
                        window.__iasPET.queue.push({ adSlots: e, dataHandler: this.iasDataHandler.bind(this) });
                }
                getSlotSize(e) {
                    return e.isVideo ? [1, 1] : e.sizes && e.sizes.length ? e.sizes[0].sizes : e.defaultSizes;
                }
                setInitialTargeting() {
                    yi(Cu, "setting initial targeting..."),
                        ji.set("fr", "-1"),
                        ji.set("b_ias", "-1"),
                        ji.set("ias-kw", "-1"),
                        Nu.forEach((e) => {
                            ji.set(e, "-1");
                        }),
                        this.slotList.forEach((e) => {
                            ji.set("vw", "-1", e);
                        });
                }
                iasDataHandler(e) {
                    yi(Cu, "handling IAS response...");
                    const t = JSON.parse(e);
                    ji.set("fr", t.fr), Pu.setBrandSafetyKeyValuesInTargeting(t.brandSafety), Pu.setCustomKeyValuesInTargeting(t.custom);
                    for (const [e, i] of Object.entries(t.slots)) ji.set("vw", i.vw || i.vw_vv, e);
                    yi(Cu, "Done.", this);
                }
                static setBrandSafetyKeyValuesInTargeting(e) {
                    if (!e) return void yi(Cu, "no brand safety data");
                    let t = "-1";
                    Nu.forEach((i) => {
                        e[i] && (ji.set(i, e[i]), ("-1" === t || Ou[t] < Ou[e[i]]) && (t = e[i]));
                    }),
                        ji.set("b_ias", t);
                }
                static setCustomKeyValuesInTargeting(e) {
                    e["ias-kw"] ? ji.set("ias-kw", e["ias-kw"]) : yi(Cu, "no custom data");
                }
            }
            class Du {
                buildReactionDivModule(e) {
                    const t = document.createElement("div");
                    return (t.dataset.spotimApp = "reactions"), (t.dataset.postId = e), (t.dataset.vertivalView = "true"), t;
                }
                buildStandaloneAdUnit() {
                    const e = document.createElement("div");
                    return (e.dataset.openwebAd = ""), (e.dataset.row = "1"), (e.dataset.column = "1"), e.classList.add("openweb-ad-unit"), e;
                }
            }
            var Lu;
            let ku = class {
                constructor(e) {
                    this.placementBuilder = e;
                }
                init() {
                    const e = Y.get("services.openWeb.placementSelector");
                    this.anchor = document.querySelector(e);
                }
                isDone() {
                    return null !== this.anchor;
                }
                build(e) {
                    if ((this.init(), !this.isDone())) return;
                    const t = this.anchor.parentNode,
                        i = this.getOpenWebWrapper(e);
                    null == t || t.insertBefore(i, this.anchor);
                }
                getOpenWebWrapper(e) {
                    const t = this.placementBuilder.buildReactionDivModule(e),
                        i = this.placementBuilder.buildStandaloneAdUnit(),
                        n = document.createElement("div");
                    return n.classList.add("open-web-wrapper"), n.prepend(i), n.prepend(t), n;
                }
            };
            var Ru, xu, Uu;
            ku = l([N(), u("design:paramtypes", ["function" == typeof (Lu = void 0 !== Du && Du) ? Lu : Object])], ku);
            const Vu = "open-web";
            let Mu = class extends Ys {
                constructor(e, t = null, i = null) {
                    super(e, t), (this.instantConfig = e), (this.globalTimeout = t), (this.placementsHandler = i), this.readConfig(e);
                }
                call() {
                    if (Y.get("state.isLogged")) return void yi(Vu, "disabled - user is logged");
                    if (!this.isActive()) return void yi(Vu, "disabled - not activated");
                    const e = ji.get("post_id") || ji.get("artid"),
                        t = ji.get("s1");
                    Gt.on(Bt.AD_ENGINE_UAP_LOAD_STATUS, (i) => {
                        if (i.isLoaded) return void yi(Vu, "disabled - UAP is loaded");
                        const n = `wk_${t}_${e}`;
                        if ((this.placementsHandler.build(n), this.placementsHandler.isDone())) {
                            const e = window.location.origin + window.location.pathname,
                                t = ji.get("wpage") || "";
                            this.loadScript(this.config.spotId, n, e, t);
                        } else yi(Vu, "disabled - builder failed");
                    });
                }
                isActive() {
                    var e;
                    return this.config || this.readConfig(this.instantConfig), (null === (e = this.config) || void 0 === e ? void 0 : e.isActive) || !1;
                }
                readConfig(e) {
                    this.config = e.get("icOpenWeb", { isActive: !1, spotId: "n-a" });
                }
                loadScript(e, t, i, n) {
                    const s = `//launcher.spot.im/spot/${e}`;
                    yi(Vu, "loading", s),
                        xi.loadScript(s, !0, null, {}, { spotimModule: "spotim-launcher", spotimAutorun: "false", postId: t, postUrl: i, articleTags: n }).then(() => {
                            yi(Vu, "ready"), Y.get("state.isMobile") || setTimeout(() => this.moveAfterViewability(), 7e3);
                        });
                }
                moveAfterViewability() {
                    const e = "sticky-modules-wrapper",
                        t = document.querySelector(".sticky-modules-wrapper"),
                        i = document.getElementById("WikiaAdInContentPlaceHolder");
                    null == t || t.classList.remove(e), null == t || t.classList.add("replaced-rail-modules-wrapper"), null == i || i.classList.add(e), yi(Vu, "move after viewability");
                }
            };
            (Mu.MOBILE_REPLACE_REPEAT_SLOT_IDX = 2),
                (Mu = l(
                    [N(), u("design:paramtypes", ["function" == typeof (Ru = void 0 !== Pi && Pi) ? Ru : Object, "function" == typeof (xu = void 0 !== e && vs) ? xu : Object, "function" == typeof (Uu = void 0 !== ku && ku) ? Uu : Object])],
                    Mu
                ));
            class ju {
                static triggerPixel(e, t, i) {
                    const n = new Image();
                    t && ju.isFunction(t) && ju.waitForElementToLoad(n, i).then(t), (n.src = e), document.body.appendChild(n);
                }
                static isFunction(e) {
                    return "[object 'Function']" === toString.call(e);
                }
                static waitForElementToLoad(e, t) {
                    let i = null;
                    return new Promise((n) => {
                        const s = () => {
                            e.removeEventListener("load", s), e.removeEventListener("error", s), null != i && window.clearTimeout(i), n();
                        };
                        e.addEventListener("load", s), e.addEventListener("error", s), null != t && (i = window.setTimeout(s, t));
                    });
                }
            }
            class Bu extends Ys {
                call() {
                    this.isEnabled("bidders.prebid.native.enabled", !1)
                        ? Gt.on(Bt.NO_NATIVO_AD, (e) => {
                              const t = window.pbjs.getHighestUnusedBidResponseForAdUnitCode(e.slotName);
                              t.native ? this.renderPrebidNativeAd(e.slotName, t.native) : Gt.emit(Bt.NO_NATIVE_PREBID_AD, { slotName: e.slotName });
                          })
                        : yi("prebid-native-provider", "disabled");
                }
                renderPrebidNativeAd(e, t) {
                    const i = $n.get(e);
                    i.getElement().insertAdjacentHTML("afterend", this.getNativeAdTemplate(t)), this.fireNativeTrackers(Bu.ACTION_IMPRESSION, t), this.addClickTrackers(t);
                    const n = i.getTargetingProperty("rv") || 1;
                    i.setTargetingConfigProperty("rv", n + 1), i.setStatus(Yi.STATUS_SUCCESS);
                }
                getNativeAdTemplate(e) {
                    const t = $r.getPrebidNativeTemplate();
                    return this.replaceAssetPlaceholdersWithData(t, e);
                }
                replaceAssetPlaceholdersWithData(e, t) {
                    for (const i in t)
                        if ($r.assetsMap[i]) {
                            const n = this.getAssetValue(i, t);
                            e = e.split("##" + $r.assetsMap[i] + "##").join(n);
                        }
                    return e.includes("##hb_native_image##") && (e = this.removeImgFromTemplate(e)), e.includes("##hb_native_displayUrl##") && (e = this.replaceDisplayUrlWithDefaultText(e)), e;
                }
                removeImgFromTemplate(e) {
                    return e.split(/<img [^>]*src="##hb_native_image##"[^>]*>/gm).join("");
                }
                replaceDisplayUrlWithDefaultText(e) {
                    return e.split("##hb_native_displayUrl##").join("See more");
                }
                getAssetValue(e, t) {
                    return "icon" == e || "image" == e ? t[e].url : t[e];
                }
                fireNativeTrackers(e, t) {
                    let i;
                    e === Bu.ACTION_CLICK && (i = t && t.clickTrackers), e === Bu.ACTION_IMPRESSION && (i = t && t.impressionTrackers), (i || []).forEach(ju.triggerPixel);
                }
                addClickTrackers(e) {
                    const t = document.getElementById("native-prebid-ad").getElementsByClassName("ntv-link");
                    [].slice.call(t).forEach((t) => {
                        t.addEventListener("click", () => {
                            this.fireNativeTrackers(Bu.ACTION_CLICK, e);
                        });
                    });
                }
            }
            (Bu.ACTION_CLICK = "click"), (Bu.ACTION_IMPRESSION = "impression");
            const zu = "stroer";
            class Gu extends Ys {
                call() {
                    if (!this.isEnabled("icStroer", !1)) return yi(zu, "disabled"), Promise.resolve();
                    const e = "//js.adscale.de/map.js";
                    return (
                        yi(zu, "loading", e),
                        xi.loadScript(e, !1).then(() => {
                            yi(zu, "ready");
                        })
                    );
                }
            }
            const Fu = "system1",
                $u = "dark",
                Hu = "adEngine_system1",
                qu = ["(former https://www.admantx.com + https://integralads.com/about-ias/)", "(https://gumgum.com/verity; verity-support@gumgum.com", "peer39_crawler/1.0"],
                Wu = ["sensitive", "disabled_search_ads"];
            class Ku extends Ys {
                constructor() {
                    super(...arguments), (this.isLoaded = !1);
                }
                call() {
                    return this.isSearchPage()
                        ? this.isEnabled()
                            ? this.isLoaded
                                ? void 0
                                : (yi(Fu, "loading..."),
                                  (this.isLoaded = !0),
                                  xi.loadScript("//s.flocdn.com/@s1/embedded-search/embedded-search.js").then(() => {
                                      yi(Fu, "asset loaded"), this.setup();
                                  }))
                            : (yi(Fu, "disabled"), Promise.resolve())
                        : (yi(Fu, "disabled - it is not search page"), Promise.resolve());
                }
                isEnabled() {
                    return super.isEnabled("icSystem1", !1) && !gn() && !this.isBot() && !this.isExcludedByBundleTag();
                }
                setup() {
                    window.s1search =
                        window.s1search ||
                        ((...e) => {
                            (window.s1search.q = window.s1search.q || []).push(e);
                        });
                    const e = this.getConfig();
                    yi(Fu, "Config", e), window.s1search("config", e);
                }
                getConfig() {
                    return {
                        category: this.getCategory(),
                        domain: this.getHostname(),
                        isTest: !1,
                        newSession: this.isThemeChanged(),
                        onComplete: this.onSetupResolve,
                        onError: this.onSetupRejected,
                        partnerId: "42232",
                        segment: this.getSegment(),
                        signature: this.getSearchSignature(),
                        subId: this.getSubId(),
                        query: this.getSearchQuery(),
                    };
                }
                getCategory() {
                    switch (Y.get("wiki.search_filter") || "") {
                        case "videoOnly":
                            return "video";
                        case "imageOnly":
                            return "image";
                        default:
                            return "web";
                    }
                }
                getSubId() {
                    const e = `${window.location.protocol}//${this.getHostname()}`,
                        t = this.getHostname().split(".")[0];
                    return `${e}?serp=${this.getSearchQuery()}&segment=${this.getSegment()}&domain=${t}`;
                }
                getHostname() {
                    return window.location.hostname.toLowerCase();
                }
                getSegment() {
                    return this.getTheme() === $u ? "fandomdark" : Y.get("state.isMobile") ? "fanmob00" : "fan00";
                }
                getSearchQuery() {
                    return Y.get("wiki.search_term_for_html") || "";
                }
                getSearchSignature() {
                    return Y.get("wiki.search_system1_signature") || "";
                }
                isSearchPage() {
                    return "search" == (Y.get("wiki.opts.pageType") || "");
                }
                getTheme() {
                    var e, t;
                    return (null === (t = null === (e = window.mw) || void 0 === e ? void 0 : e.config) || void 0 === t ? void 0 : t.get("isDarkTheme")) ? $u : "light";
                }
                isThemeChanged() {
                    const e = Ho.getItem(Hu);
                    return !((e && e === this.getTheme()) || (Ho.setItem(Hu, this.getTheme(), 86400), yi(Fu, "Theme changed"), 0));
                }
                onSetupResolve() {
                    yi(Fu, "completed"), Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: "system1_loaded" });
                }
                onSetupRejected(e) {
                    yi(Fu, "Error: " + e), Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: "system1_failed" });
                }
                isBot() {
                    const { userAgent: e } = window.navigator;
                    return qu.some((t) => e.includes(t));
                }
                isExcludedByBundleTag() {
                    for (const e of Wu) if (hn.hasBundle(e)) return yi(Fu, `community excluded by tag bundle=${e}`), !0;
                    return !1;
                }
            }
            const Yu = "wunderkind";
            class Qu extends Ys {
                call() {
                    Y.get("state.isLogged")
                        ? yi(Yu, "disabled - user is logged")
                        : this.instantConfig.get("icWunderkind")
                        ? Gt.on(Bt.AD_ENGINE_UAP_LOAD_STATUS, (e) => {
                              e.isLoaded ? yi(Yu, "disabled - UAP is loaded") : this.loadScript();
                          })
                        : yi(Yu, "disabled");
                }
                loadScript() {
                    const e = "//tag.wknd.ai/5047/i.js";
                    yi(Yu, "loading", e),
                        xi.loadScript(e).then(() => {
                            yi(Yu, "ready");
                        });
                }
            }
            var Xu, Ju, Zu, ep, tp, ip, np, sp, op, rp, ap, dp, lp, cp, up, pp, hp, gp, mp, fp;
            let vp = class {
                constructor(e, t, i, n, s, o, r, a, d, l, c, u, p, h, g, m, f, v, b, y) {
                    (this.pipeline = e),
                        (this.adEngineStackSetup = t),
                        (this.anyclip = i),
                        (this.ats = n),
                        (this.audigent = s),
                        (this.bidders = o),
                        (this.confiant = r),
                        (this.connatix = a),
                        (this.doubleVerify = d),
                        (this.durationMedia = l),
                        (this.gptSetup = c),
                        (this.iasPublisherOptimization = u),
                        (this.jwpStrategyRules = p),
                        (this.openWeb = h),
                        (this.playerSetup = g),
                        (this.prebidNativeProvider = m),
                        (this.stroer = f),
                        (this.system1 = v),
                        (this.wadRunner = b),
                        (this.wunderkind = y);
                }
                execute() {
                    yi("partners-pipeline", "starting"),
                        this.pipeline
                            .add(
                                this.jwpStrategyRules,
                                this.anyclip,
                                this.ats,
                                this.audigent,
                                this.bidders,
                                this.connatix,
                                this.wadRunner,
                                this.iasPublisherOptimization,
                                this.confiant,
                                this.durationMedia,
                                this.stroer,
                                this.prebidNativeProvider,
                                this.wunderkind,
                                this.openWeb,
                                this.system1,
                                this.playerSetup.setOptions({ dependencies: [this.bidders.initialized, this.wadRunner.initialized] }),
                                this.gptSetup,
                                this.doubleVerify,
                                this.adEngineStackSetup.setOptions({
                                    dependencies: [this.bidders.initialized, this.wadRunner.initialized, this.gptSetup.initialized, Ec.isRequiredToRun() ? Ec.initialized : Promise.resolve()],
                                    timeout: Ec.isRequiredToRun() ? Ec.getDelayTimeoutInMs() : null,
                                })
                            )
                            .execute()
                            .then(() => {
                                Gt.emit(Bt.AD_ENGINE_PARTNERS_READY), yi("partners-pipeline", "finished");
                            });
                }
            };
            vp = l(
                [
                    N(),
                    u("design:paramtypes", [
                        "function" == typeof (Xu = void 0 !== Ja && Ja) ? Xu : Object,
                        "function" == typeof (Ju = void 0 !== kl && kl) ? Ju : Object,
                        "function" == typeof (Zu = void 0 !== lu && lu) ? Zu : Object,
                        "function" == typeof (ep = void 0 !== ed && ed) ? ep : Object,
                        "function" == typeof (tp = void 0 !== Js && Js) ? tp : Object,
                        "function" == typeof (ip = void 0 !== $a && $a) ? ip : Object,
                        "function" == typeof (np = void 0 !== pu && pu) ? np : Object,
                        "function" == typeof (sp = void 0 !== Su && Su) ? sp : Object,
                        "function" == typeof (op = void 0 !== Au && Au) ? op : Object,
                        "function" == typeof (rp = void 0 !== Iu && Iu) ? rp : Object,
                        "function" == typeof (ap = void 0 !== Zs && Zs) ? ap : Object,
                        "function" == typeof (dp = void 0 !== Pu && Pu) ? dp : Object,
                        "function" == typeof (lp = void 0 !== Bl && Bl) ? lp : Object,
                        "function" == typeof (cp = void 0 !== Mu && Mu) ? cp : Object,
                        "function" == typeof (up = void 0 !== Vc && Vc) ? up : Object,
                        "function" == typeof (pp = void 0 !== Bu && Bu) ? pp : Object,
                        "function" == typeof (hp = void 0 !== Gu && Gu) ? hp : Object,
                        "function" == typeof (gp = void 0 !== Ku && Ku) ? gp : Object,
                        "function" == typeof (mp = void 0 !== Kc && Kc) ? mp : Object,
                        "function" == typeof (fp = void 0 !== Qu && Qu) ? fp : Object,
                    ]),
                ],
                vp
            );
            let bp = class {
                execute() {
                    Y.set("bidders.a9.slots", this.getA9Context());
                }
                getA9Context() {
                    return {
                        top_leaderboard: {
                            sizes: [
                                [728, 90],
                                [970, 250],
                            ],
                        },
                        top_boxad: {
                            sizes: [
                                [300, 250],
                                [300, 600],
                            ],
                        },
                        incontent_leaderboard: { sizes: [[728, 90]] },
                        gallery_leaderboard: { sizes: [[728, 90]] },
                        incontent_boxad_1: {
                            sizes: [
                                [300, 250],
                                [300, 600],
                            ],
                        },
                        bottom_leaderboard: {
                            sizes: [
                                [728, 90],
                                [970, 250],
                            ],
                        },
                        featured: { type: "video" },
                    };
                }
            };
            var yp, _p;
            bp = l([N()], bp);
            let Sp = class {
                constructor(e, t) {
                    (this.instantConfig = e), (this.noAdsDetector = t);
                }
                execute() {
                    this.setBaseState(),
                        this.setOptionsContext(),
                        this.setServicesContext(),
                        this.setMiscContext(),
                        this.setupStickySlotContext(),
                        (function () {
                            const e = Ji() ? 0 : 1;
                            ji.set("npa", e.toString());
                        })(),
                        (function () {
                            const e = Zi() ? 1 : 0;
                            ji.set("rdp", e.toString());
                        })();
                }
                setBaseState() {
                    if ((Gi() && this.noAdsDetector.addReason("in_iframe"), pi.isSteamPlatform())) {
                        this.noAdsDetector.addReason("steam_browser");
                        const e = document.querySelector(".top-leaderboard");
                        null == e || e.classList.remove("is-loading");
                        const t = document.querySelector(".bottom-leaderboard");
                        null == t || t.classList.remove("is-loading");
                    }
                    U.get("noexternals") && this.noAdsDetector.addReason("noexternals_querystring"),
                        U.get("noads") && this.noAdsDetector.addReason("noads_querystring"),
                        Y.set("state.showAds", this.noAdsDetector.isAdsMode()),
                        Y.set("state.deviceType", pi.getDeviceType()),
                        Y.set("state.isLogged", !!Y.get("wiki.wgUserId")),
                        this.instantConfig.get("icPrebidium") && (Y.set("state.provider", "prebidium"), Gt.emit(Bt.AD_ENGINE_UAP_LOAD_STATUS, { isLoaded: !1, adProduct: vr.DEFAULT_UAP_TYPE }));
                }
                setOptionsContext() {
                    this.setInContentExperiment(),
                        Y.set("options.performanceAds", this.instantConfig.get("icPerformanceAds")),
                        Y.set("options.stickyTbExperiment", this.instantConfig.get("icStickyTbExperiment")),
                        Y.set("options.uapExtendedSrcTargeting", this.instantConfig.get("icUAPExtendendSrcTargeting")),
                        Y.set("options.floorAdhesionNumberOfViewportsFromTopToPush", this.instantConfig.get("icFloorAdhesionViewportsToStart")),
                        Y.set("options.rotatorDelay", this.instantConfig.get("icRotatorDelay", {})),
                        Y.set("options.maxDelayTimeout", this.instantConfig.get("icAdEngineDelay", 2e3)),
                        Y.set("options.delayEvents", this.instantConfig.get("icDelayEvents")),
                        this.setupVideo(),
                        this.setWadContext();
                }
                setupVideo() {
                    Y.set("options.video.playAdsOnNextVideo", !!this.instantConfig.get("icFeaturedVideoAdsFrequency")),
                        Y.set("options.video.adsOnNextVideoFrequency", this.instantConfig.get("icFeaturedVideoAdsFrequency", 3)),
                        Y.set("options.video.isMidrollEnabled", this.instantConfig.get("icFeaturedVideoMidroll")),
                        Y.set("options.video.isPostrollEnabled", this.instantConfig.get("icFeaturedVideoPostroll")),
                        Y.set("options.jwpMaxDelayTimeout", this.instantConfig.get("icUAPJWPlayerDelay", 0)),
                        Y.set("options.video.iasTracking.enabled", this.instantConfig.get("icIASVideoTracking")),
                        Y.set("options.video.syncWithDisplay", this.instantConfig.get("icUAPJWPlayer")),
                        Y.set("options.video.displayAndVideoAdsSyncEnabled", this.instantConfig.get("icDisplayAndVideoAdsSyncEnabled")),
                        Y.set("options.video.uapJWPLineItemIds", this.instantConfig.get("icUAPJWPlayerLineItemIds")),
                        Y.set("options.video.comscoreJwpTracking", this.instantConfig.get("icComscoreJwpTracking")),
                        Y.set("services.anyclip.enabled", this.instantConfig.get("icAnyclipPlayer")),
                        Y.set("services.anyclip.isApplicable", () => !Y.get("custom.hasFeaturedVideo") && !this.instantConfig.get("icConnatixPlayer")),
                        Y.set("services.connatix.enabled", this.instantConfig.get("icConnatixPlayer"));
                }
                setInContentExperiment() {
                    const e = hn.hasBundle("sensitive"),
                        t = Y.get("state.isMobile");
                    !this.instantConfig.get("icExperiments", []).includes("incontentHeaders") || e || t ? Y.set("templates.incontentAnchorSelector", ".mw-parser-output > h2") : Y.set("templates.incontentHeadersExperiment", !0);
                }
                setWadContext() {
                    const e = this.instantConfig.get("icBabDetection");
                    Y.set("options.wad.enabled", e),
                        e && !Y.get("state.isLogged") && Y.get("state.showAds") && (Y.set("options.wad.btRec.enabled", this.instantConfig.get("icBTRec")), Y.set("options.wad.btRec.sideUnits", this.instantConfig.get("icBTRecSideUnits")));
                }
                setServicesContext() {
                    Y.set("services.interventionTracker.enabled", this.instantConfig.get("icInterventionTracking")),
                        Y.set("services.nativo.enabled", this.instantConfig.get("icNativo")),
                        Y.set("services.ppid.enabled", this.instantConfig.get("icPpid")),
                        Y.set("services.ppidRepository", this.instantConfig.get("icPpidRepository")),
                        Y.set("services.identityTtl", this.instantConfig.get("icIdentityTtl")),
                        Y.set("services.identityPartners", this.instantConfig.get("icIdentityPartners")),
                        Y.set("services.intentIq.ppid.enabled", this.instantConfig.get("icIntentIqPpid", !1)),
                        Y.set("services.intentIq.ppid.tracking.enabled", this.instantConfig.get("icIntentIqPpidTracking", !1)),
                        Y.set("services.messageBox.enabled", this.instantConfig.get("icAdCollapsedMessageBox", !1)),
                        Y.set("services.slotRefresher.config", !this.instantConfig.get("icDurationMedia") && this.instantConfig.get("icSlotRefresher"));
                }
                setMiscContext() {
                    this.instantConfig.get("icLABradorTest");
                    const e = this.instantConfig.get("icPrebidSizePriceFloorRule");
                    Y.set("bidders.prebid.priceFloor", e || null),
                        Y.set("bidders.prebid.disableSendAllBids", this.instantConfig.get("icPrebidDisableSendAllBids")),
                        Y.set("bidders.prebid.native.enabled", this.instantConfig.get("icPrebidNative")),
                        Y.set("templates.sizeOverwritingMap", vr.UAP_ADDITIONAL_SIZES.companionSizes),
                        Y.set("bidders.s2s.bidders", this.instantConfig.get("icPrebidS2sBidders", [])),
                        Y.set("bidders.s2s.enabled", this.instantConfig.get("icPrebidS2sBidders", []).length > 0),
                        Y.set("bidders.a9.hem.enabled", this.instantConfig.get("icA9HEM", !1)),
                        Y.set("bidders.a9.hem.cleanup", this.instantConfig.get("icA9CleanHEM", !1)),
                        Y.set("bidders.liveRampId.enabled", this.instantConfig.get("icLiveRampId")),
                        Y.set("bidders.liveRampATS.enabled", this.instantConfig.get("icLiveRampATS")),
                        Y.set("bidders.liveRampATSAnalytics.enabled", this.instantConfig.get("icLiveRampATSAnalytics"));
                }
                setupStickySlotContext() {
                    Y.set("templates.stickyTlb.forced", this.instantConfig.get("icForceStickyTlb")), Y.set("templates.stickyTlb.withFV", this.instantConfig.get("icStickyTlbWithFV"));
                    const e = this.instantConfig.get("icStickySlotLineItemIds");
                    e && e.length && Y.set("templates.stickyTlb.lineItemIds", e);
                }
            };
            Sp = l([N(), u("design:paramtypes", ["function" == typeof (yp = void 0 !== Pi && Pi) ? yp : Object, "function" == typeof (_p = void 0 !== ld && ld) ? _p : Object])], Sp);
            let Ep = class extends Sp {
                execute() {
                    super.execute(), Y.set("options.floatingMedrecDestroyable", this.instantConfig.get("icFloatingMedrecDestroyable")), Y.set("options.userId", window.mw.config.get("wgTrackID") || window.mw.config.get("wgUserId"));
                }
            };
            function wp(e) {
                const t = Y.get("custom.hasFeaturedVideo"),
                    i = Object.keys(e.slots),
                    n = e.slots && i.includes("featured"),
                    s = e.slots && i.includes("incontent_player"),
                    o = Object.assign({}, e.slots);
                return t && s ? delete o.incontent_player : !t && n && delete o.featured, Object.assign(Object.assign({}, e), { slots: o });
            }
            var Ap;
            Ep = l([N()], Ep);
            let Tp = class {
                constructor(e) {
                    this.instantConfig = e;
                }
                execute() {
                    const e = !!this.instantConfig.get("icMagniteS2sVideo");
                    Y.set(
                        "bidders.prebid.appnexus",
                        wp({
                            enabled: !1,
                            slots: {
                                top_leaderboard: {
                                    sizes: [
                                        [728, 90],
                                        [970, 250],
                                    ],
                                    position: "atf",
                                },
                                top_boxad: {
                                    sizes: [
                                        [300, 250],
                                        [300, 600],
                                    ],
                                    position: "atf",
                                },
                                incontent_boxad_1: {
                                    sizes: [
                                        [160, 600],
                                        [300, 600],
                                        [300, 250],
                                    ],
                                    position: "hivi",
                                },
                                bottom_leaderboard: {
                                    sizes: [
                                        [728, 90],
                                        [970, 250],
                                    ],
                                    position: "btf",
                                },
                                ntv_ad: { sizes: [[1, 1]], position: "native" },
                                fandom_dt_galleries: { sizes: [[728, 90]], position: "gallery" },
                            },
                            placements: { atf: "11977073", btf: "11977096", hivi: "11977016", gallery: "31721311", native: "25450069", other: "11969927" },
                        })
                    ),
                        Y.set("bidders.prebid.appnexusAst", wp({ enabled: !1, debugPlacementId: "5768085", slots: { featured: { placementId: "13684967" }, incontent_player: { placementId: "11543172" } } })),
                        Y.set(
                            "bidders.prebid.indexExchange",
                            wp({
                                enabled: !1,
                                slots: {
                                    top_leaderboard: {
                                        sizes: [
                                            [728, 90],
                                            [970, 250],
                                        ],
                                        siteId: "183423",
                                    },
                                    top_boxad: {
                                        sizes: [
                                            [300, 250],
                                            [300, 600],
                                        ],
                                        siteId: "183567",
                                    },
                                    incontent_boxad_1: {
                                        sizes: [
                                            [160, 600],
                                            [300, 600],
                                            [300, 250],
                                        ],
                                        siteId: "185049",
                                    },
                                    incontent_leaderboard: { sizes: [[728, 90]], siteId: "1019179" },
                                    bottom_leaderboard: {
                                        sizes: [
                                            [728, 90],
                                            [970, 250],
                                        ],
                                        siteId: "209250",
                                    },
                                    featured: { siteId: "437502" },
                                    fandom_dt_galleries: { sizes: [[728, 90]], siteId: "1001381" },
                                },
                            })
                        ),
                        Y.set("bidders.prebid.freewheel", wp({ enabled: !1, slots: { featured: { zoneId: "32563810" } } })),
                        Y.set("bidders.prebid.kargo", wp({ enabled: !1, slots: { fandom_dt_galleries: { sizes: [[728, 90]], placementId: "_iZy3mUblxi" } } })),
                        Y.set(
                            "bidders.prebid.medianet",
                            wp({
                                enabled: !1,
                                slots: {
                                    featured: { cid: "8CU5JOKX4", crid: "475658876" },
                                    top_leaderboard: {
                                        sizes: [
                                            [728, 90],
                                            [970, 90],
                                            [970, 250],
                                        ],
                                        cid: "8CU5JOKX4",
                                        crid: "648224147",
                                    },
                                    top_boxad: {
                                        sizes: [
                                            [300, 250],
                                            [300, 600],
                                        ],
                                        cid: "8CU5JOKX4",
                                        crid: "307922149",
                                    },
                                    incontent_boxad_1: {
                                        sizes: [
                                            [300, 250],
                                            [300, 600],
                                        ],
                                        cid: "8CU5JOKX4",
                                        crid: "210414245",
                                    },
                                    bottom_leaderboard: {
                                        sizes: [
                                            [728, 90],
                                            [970, 90],
                                            [970, 250],
                                        ],
                                        cid: "8CU5JOKX4",
                                        crid: "550202278",
                                    },
                                },
                            })
                        ),
                        Y.set(
                            "bidders.prebid.mgnipbs",
                            wp(
                                (function (e = !1) {
                                    const t = {
                                        enabled: !1,
                                        accountId: 7450,
                                        slots: {
                                            top_leaderboard: {
                                                sizes: [
                                                    [728, 90],
                                                    [970, 250],
                                                ],
                                            },
                                            top_boxad: {
                                                sizes: [
                                                    [300, 250],
                                                    [300, 600],
                                                ],
                                            },
                                            incontent_leaderboard: { sizes: [[728, 90]] },
                                            incontent_boxad_1: {
                                                sizes: [
                                                    [160, 600],
                                                    [300, 600],
                                                    [300, 250],
                                                ],
                                            },
                                            bottom_leaderboard: {
                                                sizes: [
                                                    [728, 90],
                                                    [970, 250],
                                                ],
                                            },
                                            featured: { sizes: [[640, 480]] },
                                            fandom_dt_galleries: { sizes: [[728, 90]] },
                                        },
                                    };
                                    return e || delete t.slots.featured, t;
                                })(e)
                            )
                        ),
                        Y.set(
                            "bidders.prebid.nobid",
                            wp({
                                enabled: !1,
                                slots: {
                                    top_leaderboard: {
                                        sizes: [
                                            [728, 90],
                                            [970, 250],
                                        ],
                                        siteId: 21872987104,
                                    },
                                    top_boxad: {
                                        sizes: [
                                            [300, 250],
                                            [300, 600],
                                        ],
                                        siteId: 21872987104,
                                    },
                                    incontent_boxad_1: {
                                        sizes: [
                                            [300, 250],
                                            [300, 600],
                                            [160, 600],
                                        ],
                                        siteId: 21872987104,
                                    },
                                    bottom_leaderboard: {
                                        sizes: [
                                            [728, 90],
                                            [970, 250],
                                        ],
                                        siteId: 21872987104,
                                    },
                                },
                            })
                        ),
                        Y.set("bidders.prebid.openx", wp({ enabled: !1, delDomain: "wikia-d.openx.net", slots: { featured: { unit: "559098632" } } })),
                        Y.set(
                            "bidders.prebid.ozone",
                            wp({
                                enabled: !1,
                                slots: {
                                    top_leaderboard: {
                                        sizes: [
                                            [728, 90],
                                            [970, 250],
                                        ],
                                        pos: "OZ_top_leaderboard",
                                        placementId: "3500013043",
                                    },
                                    top_boxad: {
                                        sizes: [
                                            [300, 250],
                                            [300, 600],
                                        ],
                                        pos: "OZ_top_boxad",
                                        placementId: "3500013044",
                                    },
                                    incontent_leaderboard: { sizes: [[728, 90]], pos: "OZ_incontent_leaderboard", placementId: "3500013047" },
                                    fandom_dt_galleries: { sizes: [[728, 90]], pos: "OZ_fandom_dt_galleries", placementId: "3500013051" },
                                    incontent_boxad_1: { sizes: [[300, 250]], pos: "OZ_incontent_boxad", placementId: "3500013048" },
                                    bottom_leaderboard: {
                                        sizes: [
                                            [728, 90],
                                            [970, 250],
                                        ],
                                        pos: "OZ_bottom_leaderboard",
                                        placementId: "3500013050",
                                    },
                                },
                            })
                        ),
                        Y.set(
                            "bidders.prebid.pubmatic",
                            wp({
                                enabled: !1,
                                publisherId: "156260",
                                slots: {
                                    featured: { sizes: [[0, 0]], ids: ["1636185@0x0"] },
                                    incontent_player: { sizes: [[0, 0]], ids: ["1636186@0x0"] },
                                    top_leaderboard: {
                                        sizes: [
                                            [728, 90],
                                            [970, 250],
                                        ],
                                        ids: ["/5441/TOP_LEADERBOARD_728x90@728x90", "/5441/TOP_LEADERBOARD_970x250@970x250"],
                                    },
                                    top_boxad: {
                                        sizes: [
                                            [300, 250],
                                            [300, 600],
                                        ],
                                        ids: ["/5441/TOP_RIGHT_BOXAD_300x250@300x250", "/5441/TOP_RIGHT_BOXAD_300x600@300x600"],
                                    },
                                    incontent_boxad_1: {
                                        sizes: [
                                            [160, 600],
                                            [300, 600],
                                            [300, 250],
                                        ],
                                        ids: ["/5441/INCONTENT_BOXAD_1_160x600@160x600", "/5441/INCONTENT_BOXAD_1_300x250@300x250", "/5441/INCONTENT_BOXAD_1_300x600@300x600"],
                                    },
                                    incontent_leaderboard: { sizes: [[728, 90]], ids: ["5315748@728x90"] },
                                    bottom_leaderboard: {
                                        sizes: [
                                            [728, 90],
                                            [970, 250],
                                        ],
                                        ids: ["/5441/BOTTOM_LEADERBOARD_728x90@728x90", "/5441/BOTTOM_LEADERBOARD_970x250@970x250"],
                                    },
                                    fandom_dt_galleries: { sizes: [[728, 90]], ids: ["/5441/FANDOM_DT_GALLERIES_728x90@728x90", "5244133"] },
                                },
                            })
                        ),
                        Y.set(
                            "bidders.prebid.roundel",
                            wp({
                                enabled: !1,
                                slots: {
                                    top_leaderboard: {
                                        sizes: [
                                            [728, 90],
                                            [970, 250],
                                        ],
                                        siteId: "824040",
                                    },
                                    top_boxad: {
                                        sizes: [
                                            [300, 250],
                                            [300, 600],
                                        ],
                                        siteId: "820933",
                                    },
                                    incontent_boxad_1: {
                                        sizes: [
                                            [160, 600],
                                            [300, 600],
                                            [300, 250],
                                        ],
                                        siteId: "820933",
                                    },
                                    bottom_leaderboard: {
                                        sizes: [
                                            [728, 90],
                                            [970, 250],
                                        ],
                                        siteId: "824040",
                                    },
                                    featured: { siteId: "820935" },
                                    incontent_player: { siteId: "820935" },
                                },
                            })
                        ),
                        Y.set("bidders.prebid.rubicon", wp({ enabled: !1, accountId: 7450, slots: { featured: { siteId: "147980", sizeId: 201, zoneId: "699374" } } })),
                        Y.set(
                            "bidders.prebid.rubicon_display",
                            wp({
                                enabled: !1,
                                accountId: 7450,
                                slots: {
                                    top_leaderboard: {
                                        sizes: [
                                            [728, 90],
                                            [970, 250],
                                        ],
                                        targeting: { loc: ["top"] },
                                        position: "atf",
                                        siteId: "148804",
                                        zoneId: "704672",
                                    },
                                    top_boxad: {
                                        sizes: [
                                            [300, 250],
                                            [300, 600],
                                        ],
                                        targeting: { loc: ["top"] },
                                        position: "atf",
                                        siteId: "148804",
                                        zoneId: "704672",
                                    },
                                    incontent_boxad_1: {
                                        sizes: [
                                            [160, 600],
                                            [300, 600],
                                            [300, 250],
                                        ],
                                        targeting: { loc: ["hivi"] },
                                        siteId: "148804",
                                        zoneId: "704676",
                                    },
                                    bottom_leaderboard: {
                                        sizes: [
                                            [728, 90],
                                            [970, 250],
                                        ],
                                        targeting: { loc: ["footer"] },
                                        siteId: "148804",
                                        zoneId: "704674",
                                    },
                                    fandom_dt_galleries: { sizes: [[728, 90]], siteId: "494482", zoneId: "2942280", targeting: { loc: ["gallery"] } },
                                },
                            })
                        ),
                        Y.set(
                            "bidders.prebid.seedtag",
                            wp({
                                enabled: !1,
                                slots: {
                                    top_leaderboard: {
                                        sizes: [
                                            [728, 90],
                                            [970, 250],
                                        ],
                                        publisherId: "7908-0833-01",
                                        adUnitId: "29832730",
                                        placement: "inBanner",
                                    },
                                    top_boxad: {
                                        sizes: [
                                            [300, 250],
                                            [300, 600],
                                        ],
                                        publisherId: "7908-0833-01",
                                        adUnitId: "29832737",
                                        placement: "inBanner",
                                    },
                                    incontent_leaderboard: { sizes: [[728, 90]], publisherId: "7908-0833-01", adUnitId: "29832784", placement: "inBanner" },
                                    incontent_boxad: { sizes: [[300, 250]], publisherId: "7908-0833-01", adUnitId: "29832792", placement: "inArticle" },
                                    bottom_leaderboard: {
                                        sizes: [
                                            [728, 90],
                                            [970, 250],
                                        ],
                                        publisherId: "7908-0833-01",
                                        adUnitId: "29832715",
                                        placement: "inScreen",
                                    },
                                    featured: { sizes: [[0, 0]], publisherId: "7908-0833-01", adUnitId: "29832808" },
                                },
                            })
                        ),
                        Y.set(
                            "bidders.prebid.triplelift",
                            wp({
                                enabled: !1,
                                slots: {
                                    top_leaderboard: {
                                        sizes: [
                                            [728, 90],
                                            [970, 250],
                                        ],
                                        inventoryCodes: ["Fandom_DT_LB_728x90_hdx_prebid", "Fandom_DT_LB_970x250_hdx_prebid"],
                                    },
                                    top_boxad: {
                                        sizes: [
                                            [300, 250],
                                            [300, 600],
                                        ],
                                        inventoryCodes: ["Fandom_DT_MR_300x250_prebid", "Fandom_DT_MR_300x600_prebid"],
                                    },
                                    incontent_boxad_1: {
                                        sizes: [
                                            [160, 600],
                                            [300, 600],
                                            [300, 250],
                                        ],
                                        inventoryCodes: ["Fandom_DT_FMR_160x600_hdx_prebid", "Fandom_DT_FMR_300x250_hdx_prebid", "Fandom_DT_FMR_300x600_hdx_prebid"],
                                    },
                                    incontent_leaderboard: { sizes: [[728, 90]], inventoryCodes: ["fandom_incontent_leaderboard"] },
                                    bottom_leaderboard: {
                                        sizes: [
                                            [728, 90],
                                            [970, 250],
                                        ],
                                        inventoryCodes: ["Fandom_DT_BLB_728x90_hdx_prebid", "Fandom_DT_BLB_970x250_hdx_prebid"],
                                    },
                                },
                            })
                        ),
                        Y.set(
                            "bidders.prebid.verizon",
                            wp({
                                enabled: !1,
                                dcn: "8a96945901757509a7551e039e180357",
                                slots: {
                                    top_leaderboard: { sizes: [[728, 90]], pos: "top_leaderboard" },
                                    top_boxad: { sizes: [[300, 250]], pos: "top_boxad" },
                                    incontent_boxad_1: { sizes: [[300, 250]], pos: "incontent_boxad_1" },
                                    bottom_leaderboard: { sizes: [[728, 90]], pos: "bottom_leaderboard" },
                                },
                            })
                        ),
                        Y.set(
                            "bidders.prebid.relevantdigital",
                            wp({
                                enabled: !1,
                                slots: {
                                    top_leaderboard: {
                                        sizes: [
                                            [728, 90],
                                            [970, 250],
                                        ],
                                        placementId: "648079843898112402b6dfdc_64776650c7fa31d6c63e1d5f",
                                    },
                                    top_boxad: {
                                        sizes: [
                                            [300, 250],
                                            [300, 600],
                                        ],
                                        placementId: "648079843898112402b6dfdc_647766563ab5cfa9ef3e1d60",
                                    },
                                    incontent_leaderboard: { sizes: [[728, 90]], placementId: "648079843898112402b6dfdc_6477665d2f9119a5bd3e1d61" },
                                    incontent_boxad: { sizes: [[300, 250]], placementId: "648079843898112402b6dfdc_6477666a1996aa19643e1d62" },
                                    bottom_leaderboard: {
                                        sizes: [
                                            [728, 90],
                                            [970, 250],
                                        ],
                                        placementId: "648079843898112402b6dfdc_647766799d24213a613e1d64",
                                    },
                                    featured: { placementId: "648079843898112402b6dfdc_6477667219823c5f0b3e1d63" },
                                },
                            })
                        ),
                        Y.set(
                            "bidders.prebid.wikia",
                            wp({
                                enabled: !1,
                                slots: {
                                    top_leaderboard: { sizes: [[728, 90]] },
                                    top_boxad: { sizes: [[300, 250]] },
                                    incontent_boxad_1: { sizes: [[300, 250]] },
                                    incontent_leaderboard: { sizes: [[728, 90]] },
                                    bottom_leaderboard: { sizes: [[970, 250]] },
                                    ntv_ad: { sizes: [[1, 1]], position: "native" },
                                    fandom_dt_galleries: { sizes: [[728, 90]] },
                                },
                            })
                        ),
                        Y.set(
                            "bidders.prebid.wikiaVideo",
                            wp({
                                enabled: !1,
                                slots: {
                                    featured: { videoAdUnitId: "/5441/wka.life/_project43//article/test/outstream", customParams: "s1=_project43&artid=402&src=test&pos=outstream" },
                                    incontent_player: { videoAdUnitId: "/5441/wka.life/_project43//article/test/outstream", customParams: "s1=_project43&artid=402&src=test&pos=outstream" },
                                },
                            })
                        );
                }
            };
            Tp = l([N(), u("design:paramtypes", ["function" == typeof (Ap = void 0 !== Pi && Pi) ? Ap : Object])], Tp);
            let Ip = class {
                execute() {
                    Or.setupSlotVideoContext(),
                        Or.setupCustomPlayerAdUnit(),
                        Y.set("slots", {
                            top_leaderboard: {
                                firstCall: !0,
                                adProduct: "top_leaderboard",
                                group: "LB",
                                sizes: [
                                    {
                                        viewportSize: [1024, 0],
                                        sizes: [
                                            [728, 90],
                                            [970, 66],
                                            [970, 90],
                                            [970, 150],
                                            [970, 180],
                                            [970, 250],
                                            [970, 365],
                                            [1024, 416],
                                            [1030, 65],
                                            [1030, 130],
                                            [1030, 250],
                                        ],
                                    },
                                ],
                                defaultSizes: [[728, 90]],
                                defaultTemplates: [],
                                targeting: { loc: "top", pos: ["top_leaderboard", "hivi_leaderboard"] },
                                placeholder: { createLabel: !1, adLabelParent: ".top-ads-container" },
                            },
                            top_boxad: {
                                adProduct: "top_boxad",
                                group: "MR",
                                defaultSizes: [
                                    [300, 250],
                                    [300, 600],
                                    [300, 1050],
                                ],
                                targeting: { loc: "top" },
                            },
                            incontent_leaderboard: { adProduct: "incontent_leaderboard", bidderAlias: "incontent_leaderboard", group: "ILB", defaultSizes: [[728, 90]], targeting: { loc: "middle" } },
                            incontent_boxad_1: {
                                adProduct: "incontent_boxad_1",
                                group: "HiVi",
                                recirculationElementSelector: "#recirculation-rail",
                                sizes: [],
                                defaultSizes: [
                                    [120, 600],
                                    [160, 600],
                                    [300, 250],
                                    [300, 600],
                                ],
                                targeting: { loc: "hivi" },
                            },
                            bottom_leaderboard: {
                                adProduct: "bottom_leaderboard",
                                group: "PF",
                                sizes: [
                                    {
                                        viewportSize: [1024, 0],
                                        sizes: [
                                            [728, 90],
                                            [970, 66],
                                            [970, 90],
                                            [970, 150],
                                            [970, 180],
                                            [970, 250],
                                            [970, 365],
                                            [1024, 416],
                                            [1030, 65],
                                            [1030, 130],
                                            [1030, 250],
                                        ],
                                    },
                                ],
                                defaultSizes: [[728, 90]],
                                targeting: { loc: "footer" },
                                placeholder: { createLabel: !1, adLabelParent: ".bottom-ads-container" },
                            },
                            incontent_player: { adProduct: "incontent_player", disabled: !0, isVideo: !0, trackEachStatus: !0, group: "HiVi", defaultSizes: [[1, 1]], targeting: { loc: "middle", pos: ["outstream"] } },
                            floor_adhesion: { adProduct: "floor_adhesion", disabled: !0, group: "PF", targeting: { loc: "footer" }, defaultTemplates: ["floorAdhesion"], defaultSizes: [[728, 90]] },
                            featured: { adProduct: "featured", isVideo: !0, group: "VIDEO", videoSizes: [[640, 480]], trackEachStatus: !0, trackingKey: "featured-video" },
                            ntv_feed_ad: { providers: ["nativo"], trackEachStatus: !0, isNative: !0 },
                            quiz_leaderboard_start: {
                                adProduct: "quiz_leaderboard_start",
                                defaultSizes: [
                                    [728, 90],
                                    [728, 150],
                                ],
                                group: "quiz",
                            },
                            quiz_leaderboard_questions: {
                                adProduct: "quiz_leaderboard_questions",
                                defaultSizes: [
                                    [728, 90],
                                    [728, 150],
                                ],
                                group: "quiz",
                            },
                            quiz_leaderboard_finish: {
                                adProduct: "quiz_leaderboard_finish",
                                defaultSizes: [
                                    [728, 90],
                                    [728, 150],
                                ],
                                group: "quiz",
                            },
                            quiz_incontent: { adProduct: "quiz_incontent", defaultSizes: [[300, 250]], group: "quiz" },
                            gallery_leaderboard: {
                                adProduct: "gallery_leaderboard",
                                bidderAlias: "fandom_dt_galleries",
                                a9Alias: "gallery_leaderboard",
                                group: "IG",
                                defaultSizes: [[728, 90]],
                                targeting: { loc: "gallery" },
                                placeholder: { createLabel: !0, adLabelParent: ".ad-slot-placeholder.gallery-leaderboard" },
                                bidGroup: "gallery",
                            },
                        }),
                        Y.set("slots.featured.videoAdUnit", Y.get("vast.adUnitIdWithDbName")),
                        Y.set("slots.incontent_player.videoAdUnit", Y.get("vast.adUnitIdWithDbName"));
                }
            };
            Ip = l([N()], Ip);
            const Cp = "slot-repeater";
            class Np {
                repeatSlot(e, t) {
                    const i = e.getCopy(),
                        n = Dn.build(t.slotNamePattern, { slotConfig: Object.assign(Object.assign({}, i), { repeat: t }) });
                    if (((i.slotName = n), null !== t.limit && t.index > t.limit)) yi(Cp, `Limit reached for ${n}`);
                    else {
                        if (!Y.get(`slots.${n}.uid`)) return Y.set(`slots.${n}`, i), Y.set(`slots.${n}.uid`, Bi()), this.updateProperties(t, i), n;
                        yi(Cp, `Slot already repeated: ${n}`);
                    }
                }
                updateProperties(e, t) {
                    e.updateProperties &&
                        Object.keys(e.updateProperties).forEach((i) => {
                            let n = e.updateProperties[i];
                            "string" == typeof n && (n = Dn.build(n, { slotConfig: Object.assign(Object.assign({}, t), { repeat: e }) })),
                                Y.set(`slots.${t.slotName}.${i}`, n),
                                i.startsWith("targeting.") && ji.set(i.replace("targeting.", ""), n, t.slotName);
                        });
                }
            }
            const Op = "slot-creator";
            let Pp = class {
                constructor(e = new Np()) {
                    this.slotRepeater = e;
                }
                createSlot(e, t) {
                    var i;
                    if (!e) return null;
                    yi(Op, `Creating: ${e.slotName}`, e, t);
                    const n = this.fillSlotConfig(e),
                        s = this.makeSlot(n, e.anchorElement);
                    if ((n.repeat && this.setupSlotRepeat(n), "alter" === e.insertMethod)) return s;
                    const o = this.wrapSlot(s, t);
                    return this.getAnchorElement(n)[n.insertMethod](o), (null === (i = n.placeholderConfig) || void 0 === i ? void 0 : i.createLabel) && this.addAdLabel(s.parentElement, n.slotName), s;
                }
                fillSlotConfig(e) {
                    var t;
                    return Object.assign(Object.assign({}, e), {
                        anchorElement: e.anchorElement || null,
                        anchorPosition: null !== (t = e.anchorPosition) && void 0 !== t ? t : "firstViable",
                        avoidConflictWith: e.avoidConflictWith || [],
                        classList: e.classList || [],
                        repeat: e.repeat,
                        placeholderConfig: e.placeholderConfig,
                    });
                }
                getAnchorElement(e) {
                    const t = this.getAnchorElements(e),
                        i = this.getConflictElements(e),
                        n = t.find((e) => !Gn(e, i));
                    return n || this.throwNoPlaceToInsertError(e.slotName), yi(Op, "getAnchorElement() called", e, n), n;
                }
                getAnchorElements(e) {
                    const t = Array.from(document.querySelectorAll(e.anchorSelector));
                    switch (e.anchorPosition) {
                        case "belowFirstViewport":
                            return t.filter((e) => Vn(e) > jn());
                        case "belowScrollPosition":
                            return t.filter((e) => Vn(e) > window.scrollY);
                        case "firstViable":
                            return t;
                        default: {
                            const i = t[e.anchorPosition];
                            return i || this.throwNoPlaceToInsertError(e.slotName), [i];
                        }
                    }
                }
                getConflictElements(e) {
                    const t = [];
                    return (
                        e.avoidConflictWith.forEach((e) => {
                            const i = Array.from(document.querySelectorAll(e));
                            t.push(...i);
                        }),
                        t
                    );
                }
                makeSlot(e, t = null) {
                    const i = t || document.createElement("div");
                    if (i) return (i.id = e.slotName), i.classList.add("gpt-ad", ...e.classList), i;
                }
                wrapSlot(e, t) {
                    if (!t) return e;
                    const i = document.createElement("div");
                    return t.classList && i.classList.add(...t.classList), t.id && (i.id = t.id), i.append(e), i;
                }
                addAdLabel(e, t) {
                    const i = document.createElement("div");
                    (i.className = Ln), (i.innerText = ys("advertisement")), (i.dataset.slotName = t), e.appendChild(i);
                }
                setupSlotRepeat(e) {
                    Gt.onSlotEvent(
                        Mi.SLOT_RENDERED_EVENT,
                        ({ slot: t }) => {
                            if (!t.isEnabled()) return;
                            yi(Op, `Repeating: ${e.slotName}`), (e.repeat.index += 1);
                            const i = this.slotRepeater.repeatSlot(t, e.repeat);
                            if (!i) return;
                            const n = Object.assign(Object.assign(Object.assign({}, e), e.repeat.updateCreator || {}), { slotName: i });
                            try {
                                this.createSlot(n);
                            } catch (e) {
                                return void yi(Op, `There is not enough space for ${i}`);
                            }
                            yi(Op, "Injecting slot:", i), !0 !== e.repeat.disablePushOnScroll && Y.push("events.pushOnScroll.ids", i);
                        },
                        e.slotName
                    );
                }
                throwNoPlaceToInsertError(e) {
                    throw new Error(`No place to insert slot ${e}.`);
                }
            };
            Pp = l([N(), u("design:paramtypes", [Object])], Pp);
            const Dp = new Pp();
            function Lp(e) {
                e.filter((e) => !!e).forEach(({ slotCreatorConfig: e, slotCreatorWrapperConfig: t, activator: i }) => {
                    try {
                        Dp.createSlot(e, t), i && i();
                    } catch (t) {
                        yi("insert-slot", t.message), (null == e ? void 0 : e.slotName) && Or.setState(e.slotName, !1);
                    }
                });
            }
            class kp {
                constructor() {
                    (this.statusesToStopLoadingSlot = [Mi.SLOT_RENDERED_EVENT, Yi.STATUS_SUCCESS, Mi.HIDDEN_EVENT]),
                        (this.statusesToCollapse = [Mi.HIDDEN_EVENT, Yi.STATUS_BLOCKED, Yi.STATUS_COLLAPSE]),
                        (this.statusToHide = Yi.STATUS_FORCED_COLLAPSE),
                        (this.statusToUndoCollapse = Mi.SLOT_RENDERED_EVENT),
                        (this.isLoadingOrCollapsed = (e) => this.statusesToStopLoadingSlot.includes(e.event) || this.statusesToCollapse.includes(e.event) || this.statusToUndoCollapse === e.event),
                        (this.displayPlaceholder = (e) => {
                            e.classList.remove(kn.HIDDEN_AD_CLASS);
                        }),
                        (this.shouldKeepPlaceholder = (e, t) => e === this.statusToUndoCollapse && t === Yi.STATUS_FORCED_SUCCESS),
                        (this.stopLoading = (e, t) => {
                            this.shouldStopLoading(e, t) && t.classList.remove("is-loading");
                        }),
                        (this.shouldStopLoading = (e, t) => this.statusesToStopLoadingSlot.includes(e) && t.classList.contains("is-loading")),
                        (this.hidePlaceholder = (e) => {
                            this.shouldHidePlaceholder && (e.classList.add(kn.HIDDEN_AD_CLASS), this.hideWrapperIfExists(e));
                        }),
                        (this.hideWrapperIfExists = (e) => {
                            var t;
                            (null === (t = null == e ? void 0 : e.parentElement) || void 0 === t ? void 0 : t.className.includes("-ads-container")) && e.parentElement.classList.add(kn.HIDDEN_AD_CLASS);
                        }),
                        (this.shouldHidePlaceholder = (e) => !e.classList.contains(kn.HIDDEN_AD_CLASS)),
                        (this.hideAdLabel = (e) => {
                            this.shouldHideAdLabel && e.classList.add(kn.HIDDEN_AD_CLASS);
                        }),
                        (this.shouldHideAdLabel = (e) => !e.classList.contains(kn.HIDDEN_AD_CLASS));
                }
            }
            class Rp {
                constructor(e = null) {
                    (this.messageBoxService = e), (this.placeholderHelper = new kp());
                }
                init() {
                    this.registerUapChecker(), this.start();
                }
                start() {
                    Gt.action$
                        .pipe(
                            zt(Gt.getGlobalAction(Bt.AD_ENGINE_SLOT_EVENT)),
                            Vt((e) => this.placeholderHelper.isLoadingOrCollapsed(e))
                        )
                        .subscribe((e) => {
                            var t, i, n;
                            const s = $n.get(e.adSlotName);
                            if (!s) return;
                            const o = s.getPlaceholder();
                            if (!o) return;
                            const r = null === (t = s.getConfigProperty("placeholder")) || void 0 === t ? void 0 : t.adLabelParent;
                            if ((this.placeholderHelper.stopLoading(e.event, o), this.placeholderHelper.shouldKeepPlaceholder(e.event, null === (i = e.payload) || void 0 === i ? void 0 : i.adType)))
                                this.placeholderHelper.displayPlaceholder(o);
                            else if (this.placeholderHelper.statusToHide === (null === (n = e.payload) || void 0 === n ? void 0 : n.adType)) s.disable(), this.placeholderHelper.hidePlaceholder(o);
                            else if (this.placeholderHelper.statusesToCollapse.includes(e.event))
                                if (this.isUapLoaded) this.placeholderHelper.hidePlaceholder(o);
                                else {
                                    const t = s.getAdLabel(r);
                                    t && this.placeholderHelper.hideAdLabel(t), this.messageBoxService && this.messageBoxService.shouldAddMessageBox(e.event, o) && this.messageBoxService.addMessageBox(s);
                                }
                        });
                }
                registerUapChecker() {
                    Gt.on(Bt.AD_ENGINE_UAP_LOAD_STATUS, (e) => {
                        this.isUapLoaded = e.isLoaded;
                    });
                }
            }
            var xp;
            let Up = class {
                constructor(e) {
                    (this.slotsDefinitionRepository = e), (this.slotName = "gallery_leaderboard"), (this.logGroup = "gallery-lightbox-handler"), (this.refreshLock = !1), (this.isActive = !0);
                }
                handle() {
                    Gt.on(Bt.AD_ENGINE_STACK_START, () => {
                        this.handleOnLoadNoAd(), this.handleOnLoad(), this.handleOnChange(), this.handleOnClose();
                    });
                }
                handleOnLoadNoAd() {
                    Gt.onSlotEvent(
                        Yi.STATUS_COLLAPSE,
                        () => {
                            this.refreshLock = !0;
                        },
                        this.slotName
                    );
                }
                handleOnLoad() {
                    Gt.on(
                        Bt.PLATFORM_LIGHTBOX_READY,
                        ({ placementId: e }) => {
                            e === this.slotName &&
                                (this.callPrebidBidders(() => Lp([this.slotsDefinitionRepository.getGalleryLeaderboardConfig()])),
                                this.lockForFewSeconds(),
                                (this.isActive = !0),
                                this.hideFloorAdhesion(),
                                this.showMobileGalleryAdPlaceholder(),
                                yi(this.logGroup, "Ad placement on Lightbox ready", e));
                        },
                        !1
                    );
                }
                handleOnChange() {
                    Gt.on(
                        Bt.PLATFORM_LIGHTBOX_IMAGE_CHANGE,
                        ({ placementId: e }) => {
                            if ((yi(this.logGroup, "Ad placement on Lightbox is going to be refreshed", e), e !== this.slotName || this.refreshLock || !this.isActive)) return;
                            const t = $n.get(e);
                            if (!t) return;
                            t.destroy(), t.getElement().remove();
                            const i = document.querySelector(`.ae-translatable-label[data-slot-name="${this.slotName}"]`);
                            i && i.remove(), this.callPrebidBidders(() => Lp([this.slotsDefinitionRepository.getGalleryLeaderboardConfig()])), this.lockForFewSeconds();
                        },
                        !1
                    );
                }
                handleOnClose() {
                    Gt.on(
                        Bt.PLATFORM_LIGHTBOX_CLOSED,
                        ({ placementId: e }) => {
                            if (e !== this.slotName) return;
                            const t = $n.get(this.slotName);
                            t && (t.destroy(), yi(this.logGroup, "Ad placement on Lightbox destroy", e), (this.isActive = !1), this.showFloorAdhesion());
                        },
                        !1
                    );
                }
                lockForFewSeconds() {
                    (this.refreshLock = !0),
                        setTimeout(() => {
                            this.refreshLock = !1;
                        }, 2e3);
                }
                showMobileGalleryAdPlaceholder() {
                    var e, t, i;
                    const n = null === document || void 0 === document ? void 0 : document.getElementsByClassName("lightbox-wrapper-inner")[0];
                    null === (e = null == n ? void 0 : n.classList) || void 0 === e || e.add("with-ad");
                    const s = null === (t = document.getElementsByClassName("gallery-leaderboard")) || void 0 === t ? void 0 : t[0];
                    null === (i = null == s ? void 0 : s.classList) || void 0 === i || i.remove("hide");
                }
                hideFloorAdhesion() {
                    setTimeout(() => {
                        var e;
                        const t = null === document || void 0 === document ? void 0 : document.getElementById("floor_adhesion_anchor");
                        null === (e = null == t ? void 0 : t.classList) || void 0 === e || e.add("hide-under-lightbox");
                    }, 100);
                }
                showFloorAdhesion() {
                    var e;
                    const t = null === document || void 0 === document ? void 0 : document.getElementById("floor_adhesion_anchor");
                    null === (e = null == t ? void 0 : t.classList) || void 0 === e || e.remove("hide-under-lightbox");
                }
                callPrebidBidders(e) {
                    Gt.emit(Bt.BIDDERS_CALL_PER_GROUP, { group: "gallery", callback: e });
                }
            };
            Up = l([N(), u("design:paramtypes", ["function" == typeof (xp = void 0 !== i.SlotsDefinitionRepository && i.SlotsDefinitionRepository) ? xp : Object])], Up);
            const Vp = new (class {
                scrollTrigger(e, t, i, n) {
                    i.scroll$
                        .pipe(
                            Vt(() => this.isThresholdExceeded(e, t)),
                            Mt(1),
                            On(n)
                        )
                        .subscribe();
                }
                isThresholdExceeded(e, t) {
                    const i = window.scrollY || window.pageYOffset || document.documentElement.scrollTop,
                        n = Vn(document.getElementById(e)),
                        s = jn();
                    return yi("nativo-lazy-loader", "Checking scroll threshold", e, i, s, n, t), i + s > n - t;
                }
            })();
            var Mp = ["addListener", "removeListener"],
                jp = ["addEventListener", "removeEventListener"],
                Bp = ["on", "off"];
            function zp(e, t, i, n) {
                if ((be(i) && ((n = i), (i = void 0)), n)) return zp(e, t, i).pipe(nt(n));
                var s = m(
                        (function (e) {
                            return be(e.addEventListener) && be(e.removeEventListener);
                        })(e)
                            ? jp.map(function (n) {
                                  return function (s) {
                                      return e[n](t, s, i);
                                  };
                              })
                            : (function (e) {
                                  return be(e.addListener) && be(e.removeListener);
                              })(e)
                            ? Mp.map(Gp(e, t))
                            : (function (e) {
                                  return be(e.on) && be(e.off);
                              })(e)
                            ? Bp.map(Gp(e, t))
                            : [],
                        2
                    ),
                    o = s[0],
                    r = s[1];
                if (!o && dt(e))
                    return _t(function (e) {
                        return zp(e, t, i);
                    })(vt(e));
                if (!o) throw new TypeError("Invalid event target");
                return new Ye(function (e) {
                    var t = function () {
                        for (var t = [], i = 0; i < arguments.length; i++) t[i] = arguments[i];
                        return e.next(1 < t.length ? t : t[0]);
                    };
                    return (
                        o(t),
                        function () {
                            return r(t);
                        }
                    );
                });
            }
            function Gp(e, t) {
                return function (i) {
                    return function (n) {
                        return e[i](t, n);
                    };
                };
            }
            var Fp = (function (e) {
                    function t(t, i) {
                        return e.call(this) || this;
                    }
                    return (
                        d(t, e),
                        (t.prototype.schedule = function (e, t) {
                            return void 0 === t && (t = 0), this;
                        }),
                        t
                    );
                })(Ee),
                $p = {
                    setInterval: function (e, t) {
                        for (var i = [], n = 2; n < arguments.length; n++) i[n - 2] = arguments[n];
                        var s = $p.delegate;
                        return (null == s ? void 0 : s.setInterval) ? s.setInterval.apply(s, f([e, t], m(i))) : setInterval.apply(void 0, f([e, t], m(i)));
                    },
                    clearInterval: function (e) {
                        var t = $p.delegate;
                        return ((null == t ? void 0 : t.clearInterval) || clearInterval)(e);
                    },
                    delegate: void 0,
                },
                Hp = (function (e) {
                    function t(t, i) {
                        var n = e.call(this, t, i) || this;
                        return (n.scheduler = t), (n.work = i), (n.pending = !1), n;
                    }
                    return (
                        d(t, e),
                        (t.prototype.schedule = function (e, t) {
                            var i;
                            if ((void 0 === t && (t = 0), this.closed)) return this;
                            this.state = e;
                            var n = this.id,
                                s = this.scheduler;
                            return null != n && (this.id = this.recycleAsyncId(s, n, t)), (this.pending = !0), (this.delay = t), (this.id = null !== (i = this.id) && void 0 !== i ? i : this.requestAsyncId(s, this.id, t)), this;
                        }),
                        (t.prototype.requestAsyncId = function (e, t, i) {
                            return void 0 === i && (i = 0), $p.setInterval(e.flush.bind(e, this), i);
                        }),
                        (t.prototype.recycleAsyncId = function (e, t, i) {
                            if ((void 0 === i && (i = 0), null != i && this.delay === i && !1 === this.pending)) return t;
                            null != t && $p.clearInterval(t);
                        }),
                        (t.prototype.execute = function (e, t) {
                            if (this.closed) return new Error("executing a cancelled action");
                            this.pending = !1;
                            var i = this._execute(e, t);
                            if (i) return i;
                            !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
                        }),
                        (t.prototype._execute = function (e, t) {
                            var i,
                                n = !1;
                            try {
                                this.work(e);
                            } catch (e) {
                                (n = !0), (i = e || new Error("Scheduled action threw falsy error"));
                            }
                            if (n) return this.unsubscribe(), i;
                        }),
                        (t.prototype.unsubscribe = function () {
                            if (!this.closed) {
                                var t = this.id,
                                    i = this.scheduler,
                                    n = i.actions;
                                (this.work = this.state = this.scheduler = null), (this.pending = !1), Se(n, this), null != t && (this.id = this.recycleAsyncId(i, t, null)), (this.delay = null), e.prototype.unsubscribe.call(this);
                            }
                        }),
                        t
                    );
                })(Fp),
                qp = {
                    schedule: function (e) {
                        var t = requestAnimationFrame,
                            i = cancelAnimationFrame,
                            n = qp.delegate;
                        n && ((t = n.requestAnimationFrame), (i = n.cancelAnimationFrame));
                        var s = t(function (t) {
                            (i = void 0), e(t);
                        });
                        return new Ee(function () {
                            return null == i ? void 0 : i(s);
                        });
                    },
                    requestAnimationFrame: function () {
                        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                        var i = qp.delegate;
                        return ((null == i ? void 0 : i.requestAnimationFrame) || requestAnimationFrame).apply(void 0, f([], m(e)));
                    },
                    cancelAnimationFrame: function () {
                        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                        var i = qp.delegate;
                        return ((null == i ? void 0 : i.cancelAnimationFrame) || cancelAnimationFrame).apply(void 0, f([], m(e)));
                    },
                    delegate: void 0,
                },
                Wp = (function (e) {
                    function t(t, i) {
                        var n = e.call(this, t, i) || this;
                        return (n.scheduler = t), (n.work = i), n;
                    }
                    return (
                        d(t, e),
                        (t.prototype.requestAsyncId = function (t, i, n) {
                            return (
                                void 0 === n && (n = 0),
                                null !== n && n > 0
                                    ? e.prototype.requestAsyncId.call(this, t, i, n)
                                    : (t.actions.push(this),
                                      t._scheduled ||
                                          (t._scheduled = qp.requestAnimationFrame(function () {
                                              return t.flush(void 0);
                                          })))
                            );
                        }),
                        (t.prototype.recycleAsyncId = function (t, i, n) {
                            var s;
                            if ((void 0 === n && (n = 0), null != n ? n > 0 : this.delay > 0)) return e.prototype.recycleAsyncId.call(this, t, i, n);
                            var o = t.actions;
                            null != i && (null === (s = o[o.length - 1]) || void 0 === s ? void 0 : s.id) !== i && (qp.cancelAnimationFrame(i), (t._scheduled = void 0));
                        }),
                        t
                    );
                })(Hp),
                Kp = (function () {
                    function e(t, i) {
                        void 0 === i && (i = e.now), (this.schedulerActionCtor = t), (this.now = i);
                    }
                    return (
                        (e.prototype.schedule = function (e, t, i) {
                            return void 0 === t && (t = 0), new this.schedulerActionCtor(this, e).schedule(i, t);
                        }),
                        (e.now = kt.now),
                        e
                    );
                })(),
                Yp = (function (e) {
                    function t(t, i) {
                        void 0 === i && (i = Kp.now);
                        var n = e.call(this, t, i) || this;
                        return (n.actions = []), (n._active = !1), n;
                    }
                    return (
                        d(t, e),
                        (t.prototype.flush = function (e) {
                            var t = this.actions;
                            if (this._active) t.push(e);
                            else {
                                var i;
                                this._active = !0;
                                do {
                                    if ((i = e.execute(e.state, e.delay))) break;
                                } while ((e = t.shift()));
                                if (((this._active = !1), i)) {
                                    for (; (e = t.shift()); ) e.unsubscribe();
                                    throw i;
                                }
                            }
                        }),
                        t
                    );
                })(Kp),
                Qp = new ((function (e) {
                    function t() {
                        return (null !== e && e.apply(this, arguments)) || this;
                    }
                    return (
                        d(t, e),
                        (t.prototype.flush = function (e) {
                            this._active = !0;
                            var t = this._scheduled;
                            this._scheduled = void 0;
                            var i,
                                n = this.actions;
                            e = e || n.shift();
                            do {
                                if ((i = e.execute(e.state, e.delay))) break;
                            } while ((e = n[0]) && e.id === t && n.shift());
                            if (((this._active = !1), i)) {
                                for (; (e = n[0]) && e.id === t && n.shift(); ) e.unsubscribe();
                                throw i;
                            }
                        }),
                        t
                    );
                })(Yp))(Wp);
            let Xp = class {
                constructor() {
                    (this.scroll$ = this.createSource(document, "scroll")), (this.resize$ = this.createSource(window, "resize"));
                }
                createSource(e, t) {
                    return zp(e, t).pipe(Nt(Qp), cc(), rc());
                }
            };
            var Jp;
            Xp = l([N()], Xp);
            let Zp = class {
                constructor(e) {
                    (this.domListener = e), (this.nativo = new Wn(Y));
                }
                onAdEngineUapLoaded(e, t, i) {
                    Vp.scrollTrigger(t, i, this.domListener, () => this.nativo.scrollTriggerCallback(e, t));
                }
                getNativoIncontentAdConfig(e) {
                    if (this.nativo.isEnabled())
                        return {
                            slotCreatorConfig: { slotName: Wn.INCONTENT_AD_SLOT_NAME, anchorSelector: `.mw-parser-output > h2:nth-of-type(${e})`, insertMethod: "before", classList: ["ntv-ad", "ad-slot"] },
                            activator: () => {
                                const e = Y.get("events.pushOnScroll.nativoThreshold");
                                Gt.on(Bt.AD_ENGINE_UAP_LOAD_STATUS, (t) => this.onAdEngineUapLoaded(t, Wn.INCONTENT_AD_SLOT_NAME, e));
                            },
                        };
                }
                getNativoFeedAdConfig(e = null) {
                    if (this.nativo.isEnabled())
                        return {
                            slotCreatorConfig: e,
                            activator: () => {
                                var e;
                                (e = (e) => {
                                    this.nativo.scrollTriggerCallback(e, Wn.FEED_AD_SLOT_NAME);
                                }),
                                    Xl([
                                        Gt.action$.pipe(
                                            zt(Gt.getGlobalAction(Bt.AD_ENGINE_UAP_LOAD_STATUS)),
                                            tt(({ isLoaded: e, adProduct: t }) => ({ isLoaded: e, adProduct: t }))
                                        ),
                                        Gt.action$.pipe(
                                            zt(Gt.getGlobalAction(Bt.FAN_FEED_READY)),
                                            tt(() => !0)
                                        ),
                                    ])
                                        .pipe(tt(([e, t]) => ({ uapLoadStatusAction: e, shouldRenderNativeAd: !(e.isLoaded && t) })))
                                        .subscribe((t) => {
                                            t.shouldRenderNativeAd && e(t.uapLoadStatusAction);
                                        });
                            },
                        };
                }
            };
            Zp = l([N(), u("design:paramtypes", ["function" == typeof (Jp = void 0 !== Xp && Xp) ? Jp : Object])], Zp);
            let eh = class {
                getQuizAdConfig(e) {
                    return {
                        activator: () => {
                            const t = $n.get(e);
                            t && $n.remove(t), Y.push("state.adStack", { id: e });
                        },
                    };
                }
            };
            var th;
            eh = l([N()], eh);
            const ih = ".render-wiki-recommendations-right-rail .related-content-items-wrapper > a:first-of-type",
                nh = "performance-ads";
            let sh = class {
                constructor(e) {
                    (this.dwTracker = e), (this.widgetData = null), (this.taglessRequestParams = { adUnit: "/5441/wka1b.ICW/incontent_widget/", size: "1x1", targeting: { loc: "middle", pos: "incontent_widget", src: Y.get("src") } });
                }
                setup() {
                    return p(this, void 0, void 0, function* () {
                        Y.get("options.performanceAds")
                            ? ((this.popularPagesElement = document.querySelector("#recirculation-rail .rail-module__list .popular-pages__item a.sponsored-content")),
                              (this.taglessRequestParams.targeting = Object.assign(Object.assign({}, this.taglessRequestParams.targeting), ji.dump())),
                              this.popularPagesElement && (yield this.getDataFromAdServer(), this.fillPerformanceWidget("popularPages"), this.trackElementVisibility(this.popularPagesElement, "popularPages")),
                              new Vi(() => !!document.querySelector(ih), 50, 0, 250).until().then(() =>
                                  p(this, void 0, void 0, function* () {
                                      (this.othersLikeYouElement = document.querySelector(ih)),
                                          this.othersLikeYouElement && (yield this.getDataFromAdServer(), this.fillPerformanceWidget("othersLikeYou"), this.trackElementVisibility(this.othersLikeYouElement, "othersLikeYou"));
                                  })
                              ))
                            : yi(nh, "Performance Ads disabled");
                    });
                }
                getDataFromAdServer() {
                    return p(this, void 0, void 0, function* () {
                        if (this.widgetData) return Promise.resolve();
                        const e = Ns(this.taglessRequestParams);
                        return (
                            yi(nh, "Tagless Request URL built", e),
                            yield xi.loadAsset(e, "text").then((e) => {
                                if (e)
                                    try {
                                        (this.widgetData = JSON.parse(e) || {}), yi(nh, "Widget payload received", this.widgetData);
                                    } catch (e) {
                                        return void (this.widgetData = {});
                                    }
                                else this.widgetData = {};
                            }),
                            (this.widgetData = this.widgetData || {}),
                            Promise.resolve()
                        );
                    });
                }
                fillPerformanceWidget(e) {
                    if (this.widgetData.type && this.widgetData.type.includes(e))
                        switch (this.widgetData.type) {
                            case "popularPages":
                                this.fillPopularPages();
                                break;
                            case "othersLikeYou":
                                this.fillOthersLikeYou();
                                break;
                            case "othersLikeYouWide":
                                this.fillOthersLikeYou(!0);
                        }
                }
                fillPopularPages() {
                    yi(nh, "Filling popularPages");
                    const e = this.popularPagesElement.querySelector("img"),
                        t = this.popularPagesElement.querySelector(".sponsored-content__title"),
                        i = this.popularPagesElement.querySelector(".sponsored-content__attribution");
                    this.popularPagesElement.setAttribute("href", this.widgetData.data.clickthrough),
                        this.popularPagesElement.setAttribute("title", this.widgetData.data.title),
                        this.popularPagesElement.setAttribute("target", "_blank"),
                        e.setAttribute("src", this.widgetData.data.image),
                        e.setAttribute("alt", this.widgetData.data.title),
                        (t.innerHTML = this.widgetData.data.title),
                        (i.innerHTML = this.widgetData.data.description || "Sponsored"),
                        this.triggerImpressionPixels();
                }
                fillOthersLikeYou(e = !1) {
                    var t, i;
                    yi(nh, "Filling othersLikeYou");
                    const n = this.othersLikeYouElement.querySelector("div:not(.recommendations__article-title)"),
                        s = this.othersLikeYouElement.querySelector(".recommendations__article-title");
                    this.othersLikeYouElement.setAttribute("href", this.widgetData.data.clickthrough),
                        this.othersLikeYouElement.setAttribute("target", "_blank"),
                        this.othersLikeYouElement.classList.add("performance-ad"),
                        null === (t = n.querySelector("img")) || void 0 === t || t.setAttribute("src", this.widgetData.data.image),
                        (s.innerHTML = this.widgetData.data.title),
                        e && (null === (i = this.othersLikeYouElement.nextSibling) || void 0 === i || i.remove(), this.othersLikeYouElement.setAttribute("style", "width: 200px;"), n.setAttribute("style", "width: 200px;")),
                        this.triggerImpressionPixels();
                }
                triggerImpressionPixels() {
                    xi.loadAsset(this.widgetData.data.impression, "blob");
                }
                trackElementVisibility(e, t) {
                    this.widgetData.type &&
                        this.widgetData.type.includes(t) &&
                        new IntersectionObserver(
                            (e, t) => {
                                e.forEach((e) => {
                                    e.intersectionRatio > 0.5 && e.time > 500 && (this.viewabilityCallToDW(), t.disconnect());
                                });
                            },
                            { threshold: 0.5 }
                        ).observe(e);
                }
                viewabilityCallToDW() {
                    const e = new Date();
                    this.dwTracker.track({ creative_id: this.widgetData.data.creativeId, line_item_id: this.widgetData.data.lineItemId, timestamp: e.getTime(), tz_offset: e.getTimezoneOffset() }, lo.AD_ENG_VIEWABILITY);
                }
            };
            sh = l([N(), u("design:paramtypes", ["function" == typeof (th = void 0 !== zo && zo) ? th : Object])], sh);
            const oh = new (class {
                injectAndRepeat(e, t) {
                    if (e.repeatStart > e.repeatLimit) return null;
                    let i = e.repeatStart;
                    for (; i <= e.repeatLimit; ) {
                        if (!this.inject(this.placeholderConfigRepeatException(e, i))) return this.getLastPlaceholderNumber(i);
                        yi("slot-placeholder-injector", `Placeholder for ${t} number ${i} injected`), i++;
                    }
                    return this.getLastPlaceholderNumber(i);
                }
                placeholderConfigRepeatException(e, t) {
                    if (!e.repeatExceptions) return e;
                    let i = [];
                    return (
                        e.repeatExceptions.forEach((e) => {
                            i.push(e(t));
                        }),
                        (i = i.filter((e) => e)),
                        i.length ? Object.assign(Object.assign({}, e), i[0]) : e
                    );
                }
                inject(e) {
                    const t = this.createPlaceholder(e.classList);
                    e.noLabel || this.addAdLabel(t);
                    const i = this.findAnchorElement(e.anchorSelector, e.avoidConflictWith);
                    return i ? (i[e.insertMethod](t), t) : null;
                }
                createPlaceholder(e) {
                    const t = document.createElement("div");
                    return t.classList.add(...e), t;
                }
                addAdLabel(e) {
                    const t = document.createElement("div");
                    (t.className = Ln), (t.innerText = ys("advertisement")), (t.dataset.slotName = "incontent-boxad"), e.appendChild(t);
                }
                findAnchorElement(e, t = []) {
                    const i = this.getAnchorElements(e);
                    if (0 === t.length) return 0 === i.length ? null : i[0];
                    const n = this.getConflictingElements(t);
                    return i.find((e) => !Gn(e, n)) || null;
                }
                getAnchorElements(e) {
                    return Array.from(document.querySelectorAll(e)).filter((e) => Vn(e) > window.scrollY);
                }
                getConflictingElements(e) {
                    const t = [];
                    return (
                        e.forEach((e) => {
                            const i = Array.from(document.querySelectorAll(e));
                            t.push(...i);
                        }),
                        t
                    );
                }
                getLastPlaceholderNumber(e) {
                    return e - 1;
                }
            })();
            class rh {
                constructor(e, t, i) {
                    (this.slotName = e),
                        (this.slotNamePrefix = t),
                        (this.config = i),
                        (this.logGroup = "basic-rotator"),
                        (this.refreshInfo = { recSlotViewed: 2e3, refreshDelay: U.isUrlParamSet("fmr-debug") ? 2e3 : 1e4, startPosition: 0, positionTopToViewport: void 0, repeatIndex: 1, repeatLimit: 20, refreshInterval: 3e4 }),
                        (this.currentSlotName = ""),
                        (this.slotContainer = document.querySelector(`#${this.slotName}`)),
                        yi(this.logGroup, "initialized");
                }
                rotateSlot() {
                    Gt.on(
                        Bt.AD_ENGINE_SLOT_ADDED,
                        ({ slot: e }) => {
                            e.getSlotName().substring(0, this.slotNamePrefix.length) === this.slotNamePrefix &&
                                (vr.isFanTakeoverLoaded()
                                    ? yi(this.logGroup, "fan takeover loaded ", "rotator stopped")
                                    : (Gt.onSlotEvent(
                                          Yi.STATUS_SUCCESS,
                                          () => {
                                              yi(this.logGroup, "success detected", e.getSlotName()), this.rotationCallbackAction(e);
                                          },
                                          e.getSlotName(),
                                          !0
                                      ),
                                      Gt.onSlotEvent(
                                          Yi.STATUS_COLLAPSE,
                                          () => {
                                              yi(this.logGroup, "collapse detected", e.getSlotName()), this.rotationCallbackAction(e);
                                          },
                                          e.getSlotName(),
                                          !0
                                      )));
                        },
                        !1
                    ),
                        this.startFirstRotation();
                }
                rotationCallbackAction(e) {
                    this.currentSlotName !== e.getSlotName() &&
                        (this.isRotationFinished()
                            ? yi(this.logGroup, "rotation finished")
                            : (yi(this.logGroup, "rotation scheduled", `${this.slotNamePrefix}${this.refreshInfo.repeatIndex}`),
                              (this.currentSlotName = e.getSlotName()),
                              setTimeout(() => {
                                  e.destroy(), e.getElement().remove(), this.pushNextSlot();
                              }, this.refreshInfo.refreshInterval)));
                }
                startFirstRotation() {
                    this.runNowOrOnScroll(() => this.isInViewport() && this.isCorrectPositionReached(), this.pushNextSlot.bind(this));
                }
                runNowOrOnScroll(e, t) {
                    e() ? (this.removeScrollListener(), t()) : this.rotatorListener || (this.rotatorListener = Hn.addCallback(() => this.runNowOrOnScroll(e.bind(this), t.bind(this))));
                }
                isCorrectPositionReached() {
                    return (
                        (() => this.refreshInfo.startPosition <= window.scrollY)() ||
                        (() => !(!this.refreshInfo.positionTopToViewport || !this.config.topPositionToRun) && this.refreshInfo.positionTopToViewport < this.config.topPositionToRun)()
                    );
                }
                isInViewport() {
                    return zn(this.slotContainer);
                }
                removeScrollListener() {
                    this.rotatorListener && (Hn.removeCallback(this.rotatorListener), (this.rotatorListener = null));
                }
                isRotationFinished() {
                    return !Y.get(`slots.${this.slotNamePrefix}${this.refreshInfo.repeatIndex}`) || vr.isFanTakeoverLoaded();
                }
                pushNextSlot() {
                    Y.push("state.adStack", { id: `${this.slotNamePrefix}${this.refreshInfo.repeatIndex}` }), this.refreshInfo.repeatIndex++;
                }
            }
            class ah {
                constructor(e, t, i, n) {
                    (this.slotName = e),
                        (this.fmrPrefix = t),
                        (this.btRec = i),
                        (this.config = n),
                        (this.refreshInfo = { recSlotViewed: 2e3, refreshDelay: U.isUrlParamSet("fmr-debug") ? 2e3 : 1e4, startPosition: 0, positionTopToViewport: void 0, repeatIndex: 1, repeatLimit: 20 });
                }
                rotateSlot() {
                    var e;
                    (this.nextSlotName = this.slotName),
                        (this.recirculationElement = document.querySelector(Y.get(`slots.${this.slotName}.recirculationElementSelector`))),
                        (null === (e = this.btRec) || void 0 === e ? void 0 : e.isEnabled()) ? this.initializeBTRotation() : this.initializeStandardRotation();
                }
                initializeStandardRotation() {
                    Gt.on(
                        Bt.AD_ENGINE_SLOT_ADDED,
                        ({ slot: e }) => {
                            if (e.getSlotName().substring(0, this.fmrPrefix.length) === this.fmrPrefix) {
                                if (vr.isFanTakeoverLoaded() || "prebidium" === Y.get("state.provider"))
                                    return void Gt.onSlotEvent(
                                        Yi.STATUS_SUCCESS,
                                        () => {
                                            this.swapRecirculation(!1);
                                        },
                                        e.getSlotName(),
                                        !0
                                    );
                                Gt.onSlotEvent(
                                    Yi.STATUS_SUCCESS,
                                    () => {
                                        this.slotStatusChanged(Yi.STATUS_SUCCESS),
                                            Gt.onSlotEvent(
                                                Mi.SLOT_VIEWED_EVENT,
                                                () => {
                                                    const t = Y.get("options.rotatorDelay");
                                                    setTimeout(() => {
                                                        this.hideSlot();
                                                    }, t[e.lineItemId] || this.refreshInfo.refreshDelay);
                                                },
                                                e.getSlotName(),
                                                !0
                                            );
                                    },
                                    e.getSlotName(),
                                    !0
                                ),
                                    Gt.onSlotEvent(
                                        Yi.STATUS_COLLAPSE,
                                        () => {
                                            this.slotStatusChanged(Yi.STATUS_COLLAPSE), this.scheduleNextSlotPush();
                                        },
                                        e.getSlotName(),
                                        !0
                                    );
                            }
                        },
                        !1
                    ),
                        setTimeout(() => {
                            var e, t, i;
                            (this.refreshInfo.startPosition = Vn(this.recirculationElement) - ((null === (e = document.querySelector(".fandom-sticky-header")) || void 0 === e ? void 0 : e.clientHeight) || 0)),
                                (this.refreshInfo.positionTopToViewport = null === (i = null === (t = this.recirculationElement) || void 0 === t ? void 0 : t.getBoundingClientRect()) || void 0 === i ? void 0 : i.top),
                                this.startFirstRotation();
                        }, this.refreshInfo.refreshDelay);
                }
                initializeBTRotation() {
                    this.pushNextSlot();
                    let e = !1;
                    setInterval(() => {
                        this.swapRecirculation(e), (e = !e);
                    }, this.refreshInfo.refreshDelay + this.refreshInfo.recSlotViewed);
                }
                startFirstRotation() {
                    this.runNowOrOnScroll(() => this.isInViewport() && this.isCorrectPositionReached(), this.pushNextSlot.bind(this));
                }
                runNowOrOnScroll(e, t) {
                    e() ? (this.removeScrollListener(), t()) : this.rotatorListener || (this.rotatorListener = Hn.addCallback(() => this.runNowOrOnScroll(e.bind(this), t.bind(this))));
                }
                removeScrollListener() {
                    this.rotatorListener && (Hn.removeCallback(this.rotatorListener), (this.rotatorListener = null));
                }
                isInViewport() {
                    const e = zn(this.recirculationElement),
                        t = this.currentAdSlot && this.currentAdSlot.getElement() && zn(this.currentAdSlot.getElement());
                    return e || t;
                }
                isCorrectPositionReached() {
                    return (
                        (() => this.refreshInfo.startPosition <= window.scrollY)() ||
                        (() => !(!this.refreshInfo.positionTopToViewport || !this.config.topPositionToRun) && this.refreshInfo.positionTopToViewport < this.config.topPositionToRun)()
                    );
                }
                pushNextSlot() {
                    Y.push("state.adStack", { id: this.nextSlotName }), this.refreshInfo.repeatIndex++;
                }
                hideSlot() {
                    Y.get("options.floatingMedrecDestroyable") ? $n.remove(this.currentAdSlot) : this.currentAdSlot.hide(), this.swapRecirculation(!0), this.scheduleNextSlotPush();
                }
                slotStatusChanged(e) {
                    (this.currentAdSlot = $n.get(this.nextSlotName)), (this.nextSlotName = this.fmrPrefix + this.refreshInfo.repeatIndex), e === Yi.STATUS_SUCCESS && this.swapRecirculation(!1);
                }
                swapRecirculation(e) {
                    this.recirculationElement.style.display = e ? "block" : "none";
                }
                scheduleNextSlotPush() {
                    this.isRefreshLimitAvailable() &&
                        setTimeout(() => {
                            this.tryPushNextSlot();
                        }, this.refreshInfo.refreshDelay);
                }
                isRefreshLimitAvailable() {
                    return this.refreshInfo.repeatIndex <= this.refreshInfo.repeatLimit;
                }
                tryPushNextSlot() {
                    this.runNowOrOnScroll(this.isInViewport.bind(this), this.pushNextSlot.bind(this));
                }
            }
            var dh, lh;
            const ch = { EXPERIMENT_ENABLED: "anyclip_placement", EXPERIMENT_VARIANT: "anyclip_placement_variant" };
            let uh = class {
                constructor(e, t) {
                    (this.instantConfig = e), (this.optimizely = t);
                }
                getTopLeaderboardConfig() {
                    const e = "top_leaderboard",
                        t = Y.get(`slots.${e}.placeholder`);
                    return {
                        slotCreatorConfig: { slotName: e, placeholderConfig: t, anchorSelector: ".top-leaderboard", insertMethod: "prepend", classList: [kn.HIDDEN_AD_CLASS, "ad-slot"] },
                        activator: () => {
                            Y.push("state.adStack", { id: e });
                        },
                    };
                }
                getGalleryLeaderboardConfig() {
                    const e = "gallery_leaderboard",
                        t = Y.get(`slots.${e}.placeholder`);
                    return {
                        slotCreatorConfig: { slotName: e, placeholderConfig: t, anchorSelector: ".gallery-leaderboard", insertMethod: "prepend", classList: ["ad-slot"] },
                        activator: () => {
                            Y.push("state.adStack", { id: e });
                        },
                    };
                }
                getTopBoxadConfig() {
                    if (!this.isRightRailApplicable()) return;
                    const e = "top_boxad";
                    return {
                        slotCreatorConfig: { slotName: e, anchorSelector: ".main-page-tag-rcs, #rail-boxad-wrapper", insertMethod: "prepend", classList: [kn.HIDDEN_AD_CLASS, "ad-slot"] },
                        activator: () => {
                            Y.push("state.adStack", { id: e });
                        },
                    };
                }
                isIncontentLeaderboardApplicable() {
                    return Rn(document.querySelector("main.page__main #content")) >= 768;
                }
                getIncontentLeaderboardConfig() {
                    if (!this.isIncontentLeaderboardApplicable()) return;
                    const e = "incontent_leaderboard",
                        t = this.isIncontentPlayerApplicable() ? Y.get("templates.incontentAnchorSelector").replace(/h([2-5])/gi, "h$1:nth-of-type(2)") : Y.get("templates.incontentAnchorSelector"),
                        i = {
                            slotCreatorConfig: {
                                slotName: e,
                                placeholderConfig: { createLabel: !0 },
                                anchorSelector: t,
                                anchorPosition: "belowFirstViewport",
                                avoidConflictWith: [".ad-slot-icl"],
                                insertMethod: "before",
                                classList: [kn.HIDDEN_AD_CLASS, "ad-slot", "ad-slot-icl"],
                            },
                            slotCreatorWrapperConfig: { classList: ["ad-slot-placeholder", "incontent-leaderboard", "is-loading"] },
                            activator: () => {
                                Gt.on(Bt.AD_ENGINE_UAP_LOAD_STATUS, () => {
                                    Y.push("events.pushOnScroll.ids", e);
                                });
                            },
                        };
                    return (
                        Y.get("templates.incontentHeadersExperiment") &&
                            ((i.slotCreatorConfig.repeat = {
                                index: 1,
                                limit: 20,
                                slotNamePattern: `${e}_{slotConfig.repeat.index}`,
                                updateProperties: { adProduct: "{slotConfig.slotName}", "targeting.rv": "{slotConfig.repeat.index}", "targeting.pos": [e] },
                                updateCreator: { anchorSelector: ".incontent-leaderboard", avoidConflictWith: [".ad-slot-icl", "#incontent_player"], insertMethod: "append", placeholderConfig: { createLabel: !1 } },
                            }),
                            (i.activator = () => {
                                Gt.on(Bt.AD_ENGINE_UAP_LOAD_STATUS, (t) => {
                                    Y.push("events.pushOnScroll.ids", e), t.isLoaded || this.injectIncontentAdsPlaceholders();
                                });
                            })),
                        i
                    );
                }
                injectIncontentAdsPlaceholders() {
                    const e = {
                        classList: ["ad-slot-placeholder", "incontent-leaderboard", "is-loading"],
                        anchorSelector: Y.get("templates.incontentAnchorSelector"),
                        avoidConflictWith: [".ad-slot-placeholder", ".incontent-leaderboard", "#incontent_player"],
                        insertMethod: "before",
                        repeatStart: 1,
                        repeatLimit: 19,
                    };
                    oh.injectAndRepeat(e, "incontent");
                }
                getIncontentBoxadConfig() {
                    if (!this.isRightRailApplicable()) return;
                    const e = "incontent_boxad_",
                        t = "incontent_boxad_1";
                    return {
                        slotCreatorConfig: {
                            slotName: t,
                            anchorSelector: "#WikiaAdInContentPlaceHolder",
                            insertMethod: "append",
                            classList: [kn.HIDDEN_AD_CLASS, "ad-slot"],
                            repeat: {
                                index: 1,
                                limit: 20,
                                slotNamePattern: "incontent_boxad_{slotConfig.repeat.index}",
                                updateProperties: { adProduct: "{slotConfig.slotName}", "targeting.rv": "{slotConfig.repeat.index}", "targeting.pos": ["incontent_boxad"] },
                                disablePushOnScroll: !0,
                            },
                        },
                        activator: () => {
                            Gt.on(Bt.AD_ENGINE_STACK_START, () => {
                                this.isFmrApplicable(t) ? new ah(t, e, Bc, { topPositionToRun: 65 }).rotateSlot() : new rh(t, e, { topPositionToRun: 65 }).rotateSlot();
                            });
                        },
                    };
                }
                isFmrApplicable(e) {
                    const t = document.querySelector(Y.get(`slots.${e}.recirculationElementSelector`));
                    return null !== t && "none" !== window.getComputedStyle(t, null).display;
                }
                isRightRailApplicable(e = 1024) {
                    return Bn() >= e;
                }
                getBottomLeaderboardConfig() {
                    const e = "bottom_leaderboard",
                        t = Y.get(`slots.${e}.placeholder`);
                    return {
                        slotCreatorConfig: { slotName: e, placeholderConfig: t, anchorSelector: ".bottom-leaderboard", insertMethod: "prepend", classList: ["ad-slot"] },
                        activator: () => {
                            Y.push("events.pushOnScroll.ids", e);
                        },
                    };
                }
                getIncontentPlayerConfig() {
                    const e = "incontent_player";
                    if (!this.isIncontentPlayerApplicable()) return;
                    this.optimizely.addVariantToTargeting(ch, "anyclip_placement_undefined");
                    const t = this.optimizely.getVariant(ch);
                    return (
                        t && this.optimizely.addVariantToTargeting(ch, t),
                        {
                            slotCreatorConfig:
                                "anyclip_placement_featured_video" === t
                                    ? { slotName: e, anchorSelector: ".page-content", avoidConflictWith: [".incontent-leaderboard"], insertMethod: "before", classList: ["anyclip-experiment"] }
                                    : { slotName: e, anchorSelector: Y.get("templates.incontentAnchorSelector"), anchorPosition: "belowFirstViewport", avoidConflictWith: [".incontent-leaderboard"], insertMethod: "before" },
                            activator: () => {
                                Y.push("state.adStack", { id: e });
                            },
                        }
                    );
                }
                isIncontentPlayerApplicable() {
                    return Y.get("custom.hasIncontentPlayer");
                }
                getFloorAdhesionConfig() {
                    if (!this.isFloorAdhesionApplicable()) return;
                    const e = "floor_adhesion",
                        t = () => {
                            const t = this.instantConfig.get("icFloorAdhesionViewportsToStart") || 0;
                            if (-1 === t) Y.push("state.adStack", { id: e });
                            else {
                                const i = t * jn();
                                Hn.addSlot(e, { distanceFromTop: i });
                            }
                        };
                    return {
                        slotCreatorConfig: { slotName: e, anchorSelector: ".page", insertMethod: "before", classList: [kn.HIDDEN_AD_CLASS, "ad-slot"] },
                        activator: () =>
                            (function (e, t = !0) {
                                const i = "top_leaderboard";
                                Gt.on(Bt.AD_ENGINE_UAP_LOAD_STATUS, (n) => {
                                    if (n.isLoaded)
                                        Gt.onSlotEvent(
                                            Mi.CUSTOM_EVENT,
                                            ({ payload: t }) => {
                                                [vr.SLOT_UNSTICKED_STATE, vr.SLOT_FORCE_UNSTICK, vr.SLOT_STICKY_STATE_SKIPPED, vr.SLOT_VIDEO_DONE].includes(t.status) && setTimeout(() => e(), vr.SLIDE_OUT_TIME);
                                            },
                                            i
                                        );
                                    else if (!t) {
                                        if (!Y.get("state.topLeaderboardExists") || !Y.get("slots.top_leaderboard.defaultTemplates").includes("stickyTlb")) return void e();
                                        Gt.onSlotEvent(
                                            Mi.CUSTOM_EVENT,
                                            ({ payload: t }) => {
                                                t.status !== vr.SLOT_STICKINESS_DISABLED ? [vr.SLOT_UNSTICKED_STATE, vr.SLOT_FORCE_UNSTICK].includes(t.status) && setTimeout(() => e(), vr.SLIDE_OUT_TIME) : e();
                                            },
                                            i
                                        );
                                    }
                                });
                            })(t, !Y.get("options.isFloorAdhesionNonUapApplicable")),
                    };
                }
                isFloorAdhesionApplicable() {
                    return !Y.get("custom.hasFeaturedVideo");
                }
            };
            var ph, hh, gh, mh, fh;
            uh = l([N(), u("design:paramtypes", ["function" == typeof (dh = void 0 !== Pi && Pi) ? dh : Object, "function" == typeof (lh = void 0 !== xl && xl) ? lh : Object])], uh);
            let vh = class {
                constructor(e, t, i, n, s) {
                    (this.slotsDefinitionRepository = e), (this.nativoSlotDefinitionRepository = t), (this.performanceAdsDefinitionRepository = i), (this.quizSlotsDefinitionRepository = n), (this.galleryLightbox = s);
                }
                execute() {
                    this.injectSlots(), this.configureTopLeaderboardAndCompanions(), this.configureFloorAdhesionCodePriority(), this.registerAdPlaceholderService(), this.handleGalleryLightboxAdsSlots();
                }
                injectSlots() {
                    Lp([
                        this.nativoSlotDefinitionRepository.getNativoFeedAdConfig(),
                        this.slotsDefinitionRepository.getTopLeaderboardConfig(),
                        this.slotsDefinitionRepository.getTopBoxadConfig(),
                        this.slotsDefinitionRepository.getIncontentPlayerConfig(),
                        this.slotsDefinitionRepository.getIncontentLeaderboardConfig(),
                        this.slotsDefinitionRepository.getBottomLeaderboardConfig(),
                    ]),
                        Y.get("options.isFloorAdhesionNonUapApplicable")
                            ? (Lp([this.slotsDefinitionRepository.getFloorAdhesionConfig()]), $n.enable("floor_adhesion"))
                            : Gt.on(Bt.AD_ENGINE_UAP_NTC_LOADED, () => Lp([this.slotsDefinitionRepository.getFloorAdhesionConfig()])),
                        Gt.on(Bt.RAIL_READY, () => {
                            Lp([this.slotsDefinitionRepository.getIncontentBoxadConfig()]),
                                Gt.on(Bt.AD_ENGINE_STACK_START, () => {
                                    this.performanceAdsDefinitionRepository.setup();
                                });
                        }),
                        Gt.on(
                            Bt.QUIZ_AD_INJECTED,
                            ({ slotId: e }) => {
                                Lp([this.quizSlotsDefinitionRepository.getQuizAdConfig(e)]);
                            },
                            !1
                        );
                }
                configureTopLeaderboardAndCompanions() {
                    const e = "top_leaderboard";
                    Or.addSlotSize("top_boxad", vr.UAP_ADDITIONAL_SIZES.companionSizes["5x5"].size),
                        (Y.get("custom.hasFeaturedVideo") && !Y.get("templates.stickyTlb.withFV")) || Y.push(`slots.${e}.defaultTemplates`, "stickyTlb"),
                        Y.get("custom.hasFeaturedVideo")
                            ? (Y.set(`slots.${e}.sizes`, [
                                  {
                                      viewportSize: [1024, 0],
                                      sizes: [
                                          [728, 90],
                                          [970, 66],
                                          [970, 90],
                                          [970, 150],
                                          [970, 180],
                                          [970, 250],
                                      ],
                                  },
                              ]),
                              Y.set("slots.incontent_boxad_1.defaultSizes", [[300, 250]]),
                              Or.addSlotSize("incontent_boxad_1", vr.UAP_ADDITIONAL_SIZES.companionSizes["4x4"].size))
                            : ("special" !== Y.get("wiki.targeting.pageType") && (Or.addSlotSize(e, vr.UAP_ADDITIONAL_SIZES.bfaSize.desktop), Or.addSlotSize(e, vr.UAP_ADDITIONAL_SIZES.bfaSize.unified)),
                              Or.addSlotSize("incontent_boxad_1", vr.UAP_ADDITIONAL_SIZES.companionSizes["5x5"].size));
                }
                configureFloorAdhesionCodePriority() {
                    const e = "floor_adhesion";
                    let t = !1;
                    Gt.onSlotEvent(
                        Yi.STATUS_SUCCESS,
                        () => {
                            (t = !0),
                                Gt.on(Bt.AD_ENGINE_UAP_LOAD_STATUS, (i) => {
                                    (i.isLoaded && "ruap" !== i.adProduct) ||
                                        Gt.onSlotEvent(Mi.VIDEO_AD_IMPRESSION, () => {
                                            t && ((t = !1), $n.disable(e));
                                        });
                                });
                        },
                        e
                    ),
                        Gt.onSlotEvent(
                            Mi.HIDDEN_EVENT,
                            () => {
                                t = !1;
                            },
                            e
                        );
                }
                registerAdPlaceholderService() {
                    new Rp().init();
                }
                handleGalleryLightboxAdsSlots() {
                    this.galleryLightbox.initialized || ((this.galleryLightbox.handler = new Up(this.slotsDefinitionRepository)), (this.galleryLightbox.initialized = !0)), this.galleryLightbox.handler.handle();
                }
            };
            var bh;
            vh = l(
                [
                    N(),
                    u("design:paramtypes", [
                        "function" == typeof (ph = void 0 !== uh && uh) ? ph : Object,
                        "function" == typeof (hh = void 0 !== Zp && Zp) ? hh : Object,
                        "function" == typeof (gh = void 0 !== sh && sh) ? gh : Object,
                        "function" == typeof (mh = void 0 !== eh && eh) ? mh : Object,
                        "function" == typeof (fh = void 0 !== n.GalleryLightboxAds && n.GalleryLightboxAds) ? fh : Object,
                    ]),
                ],
                vh
            );
            const yh = { EXPERIMENT_ENABLED: "performance_ads", EXPERIMENT_VARIANT: "performance_ads_variant" },
                _h = { EXPERIMENT_ENABLED: "unified_takeover_ntc20", EXPERIMENT_VARIANT: "unified_takeover_ntc20_variant" },
                Sh = { EXPERIMENT_ENABLED: "desktop_adhesion", EXPERIMENT_VARIANT: "desktop_adhesion_variant" };
            let Eh = class {
                constructor(e) {
                    this.optimizely = e;
                }
                execute() {
                    this.configurePerformanceAdsExperiment(), this.configureFloorAdhesionExperiment(), this.configureFloorAdhesionNonUapExperiment();
                }
                configurePerformanceAdsExperiment() {
                    const e = this.optimizely.getVariant(yh);
                    e && this.optimizely.addVariantToTargeting(yh, e);
                }
                configureFloorAdhesionExperiment() {
                    this.optimizely.addVariantToTargeting(_h, "ntc20_adhesion_undefined");
                    const e = this.optimizely.getVariant(_h);
                    if (e) {
                        let t = e;
                        const i = "ntc20_adhesion_enabled" === e;
                        i && (t += window.mw.config.get("isDarkTheme") ? "_dark" : "_light"), Y.set("options.ntc.floorEnabled", i), this.optimizely.addVariantToTargeting(_h, t);
                    }
                }
                configureFloorAdhesionNonUapExperiment() {
                    this.optimizely.addVariantToTargeting(Sh, "desktop_adhesion_show_undefined");
                    const e = this.optimizely.getVariant(Sh);
                    e && (Y.set("options.isFloorAdhesionNonUapApplicable", "desktop_adhesion_show_adhesion" === e), this.optimizely.addVariantToTargeting(Sh, e));
                }
            };
            Eh = l([N(), u("design:paramtypes", ["function" == typeof (bh = void 0 !== xl && xl) ? bh : Object])], Eh);
            class wh {
                constructor(e = {}) {
                    this.props = e;
                }
                render() {
                    return document.createDocumentFragment();
                }
                getClassNames() {
                    return this.props.classNames || [];
                }
            }
            class Ah extends wh {
                render() {
                    const e = document.createElement("div");
                    return (e.innerText = ys("advertisement")), (e.className = "advertisement-label"), e;
                }
            }
            const Th = { SLOT: Symbol("template ad slot"), NAME: Symbol("template name"), PARAMS: Symbol("template params") };
            var Ih;
            let Ch = class {
                constructor(e) {
                    this.adSlot = e;
                }
                onEnter() {
                    return p(this, void 0, void 0, function* () {
                        const e = this.adSlot.getElement();
                        if (e.querySelector(".advertisement-label")) return;
                        const t = new Ah();
                        e.appendChild(t.render());
                    });
                }
            };
            Ch = l([N({ autobind: !1 }), c(0, O(Th.SLOT)), u("design:paramtypes", ["function" == typeof (Ih = void 0 !== kn && kn) ? Ih : Object])], Ch);
            class Nh extends wh {
                render() {
                    const e = document.createElement("button");
                    return this.getClassNames().forEach((t) => e.classList.add(t)), e.addEventListener("click", (e) => this.onClick(e)), e;
                }
                getClassNames() {
                    return ["button-control", ...super.getClassNames()];
                }
                onClick(e) {
                    const { onClick: t } = this.props;
                    "function" == typeof t && t(e);
                }
            }
            const Oh = JSON.parse(
                '{"CROSS":"<svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path d=\\"M19.707 4.293a.999.999 0 0 0-1.414 0L12 10.586 5.707 4.293a.999.999 0 1 0-1.414 1.414L10.586 12l-6.293 6.293a.999.999 0 1 0 1.414 1.414L12 13.414l6.293 6.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L13.414 12l6.293-6.293a.999.999 0 0 0 0-1.414\\" fill-rule=\\"evenodd\\"/></svg>","LEARN_MORE":"<svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\"><g stroke=\\"none\\" stroke-width=\\"1\\" fill-rule=\\"evenodd\\"><g transform=\\"translate(-753.000000, -1764.000000)\\" fill-rule=\\"nonzero\\"><g transform=\\"translate(153.000000, 1746.000000)\\"><g transform=\\"translate(5.000000, 0.000000)\\"><g transform=\\"translate(459.000000, 0.000000)\\"><g transform=\\"translate(136.000000, 18.000000)\\"><polygon points=\\"24 0 15 0 18.4395 3.4395 9.033 12.846 11.154 14.967 20.5605 5.5605 24 9\\"></polygon><path d=\\"M19.5,24 L1.5,24 C0.672,24 0,23.328 0,22.5 L0,4.5 C0,3.672 0.672,3 1.5,3 L10.5,3 L10.5,6 L3,6 L3,21 L18,21 L18,13.5 L21,13.5 L21,22.5 C21,23.328 20.328,24 19.5,24 Z\\"></path></g></g></g></g></g></g></svg>","PAUSE":"<svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\"><g fill-rule=\\"evenodd\\"><rect width=\\"7\\" height=\\"22\\" rx=\\"1\\" x=\\"3\\" y=\\"1\\"></rect><rect x=\\"14\\" width=\\"7\\" height=\\"22\\" rx=\\"1\\" y=\\"1\\"></rect></g></svg>","PLAY":"<svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path d=\\"M19.69 12.6L5.143 22.867a.722.722 0 0 1-.753.05.733.733 0 0 1-.391-.65V1.733c0-.274.15-.524.391-.65a.724.724 0 0 1 .753.05l14.545 10.266a.734.734 0 0 1 0 1.201z\\" fill-rule=\\"evenodd\\"></path></svg>","REPLAY":"<svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path d=\\"M12 23c6.065 0 11-4.863 11-10.84a.992.992 0 0 0-1-.985c-.553 0-1 .44-1 .986 0 4.89-4.037 8.868-9 8.868s-9-3.978-9-8.868c0-4.89 4.037-8.869 9-8.869a8.991 8.991 0 0 1 6.975 3.292l-3.794-.501a.996.996 0 0 0-1.124.845.987.987 0 0 0 .858 1.108l5.946.785a.996.996 0 0 0 1.124-.845l.797-5.86a.987.987 0 0 0-.858-1.107.994.994 0 0 0-1.124.846l-.446 3.28A10.997 10.997 0 0 0 12 1.322c-6.065 0-11 4.862-11 10.839C1 18.137 5.935 23 12 23\\" fill-rule=\\"evenodd\\"/></svg>","FULLSCREEN_OFF":"<svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path d=\\"M5.5 9H8V2H5v4H1v3h4.5zm13 0H16V2h3v4h4v3h-4.5zm-13 6H8v7H5v-4H1v-3h4.5zm13 0H16v7h3v-4h4v-3h-4.5z\\" fill-rule=\\"evenodd\\"/></svg>","FULLSCREEN_ON":"<svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path d=\\"M21.5 22H23v-7h-3v4h-4v3h5.5zM23 3.5V9h-3V5h-4V2h7v1.5zm-22 17V15h3v4h4v3H1v-1.5zM2.5 2H1v7h3V5h4V2H2.5z\\" fill-rule=\\"evenodd\\"/></svg>","VOLUME_OFF":"<svg viewBox=\\"0 0 28 28\\" xmlns=\\"http://www.w3.org/2000/svg\\"><defs><style>.cls-1{fill:#fff;opacity:0.4;}.cls-2{fill:#231f20;}</style></defs><title>sound_off_button</title><circle class=\\"cls-1\\" cx=\\"14.06\\" cy=\\"13.96\\" r=\\"13.74\\"/><path class=\\"cls-2\\" d=\\"M16,2.93A13.07,13.07,0,1,1,2.93,16,13.08,13.08,0,0,1,16,2.93M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Z\\" transform=\\"translate(-2 -2)\\"/><g id=\\"Page-1\\"><g id=\\"Video-Player-Skin\\"><g id=\\"Video-Copy\\"><g id=\\"volume-off\\"><path id=\\"Shape\\" class=\\"cls-2\\" d=\\"M14.25,9.17l-3.79,4.11H6.84c-.78,0-1,.46-1,.89V17.7a1,1,0,0,0,1,1h3.65l3.79,4.18a1.09,1.09,0,0,0,.53.14,1,1,0,0,0,.5-.14,1,1,0,0,0,.5-.9V10a1,1,0,0,0-.5-.9,1.06,1.06,0,0,0-1,.05Z\\" transform=\\"translate(-2 -2)\\"/><path id=\\"Fill-1\\" class=\\"cls-2\\" d=\\"M22.91,16.21l3-3a.92.92,0,1,0-1.3-1.3l-3,3-3-3a.92.92,0,1,0-1.3,1.3l3,3-3,3a.92.92,0,1,0,1.3,1.3l3-3,3,3a.92.92,0,1,0,1.3-1.3Z\\" transform=\\"translate(-2 -2)\\"/></g></g></g></g></svg>","VOLUME_ON":"<svg viewBox=\\"0 0 28 28\\" xmlns=\\"http://www.w3.org/2000/svg\\"><defs><style>.cls-1{fill:#fff;opacity:0.4;}.cls-2{fill:#231f20;}</style></defs><title>sound_on_button</title><circle class=\\"cls-1\\" cx=\\"13.96\\" cy=\\"14.06\\" r=\\"13.74\\"/><path class=\\"cls-2\\" d=\\"M16,2.93A13.07,13.07,0,1,1,2.93,16,13.08,13.08,0,0,1,16,2.93M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Z\\" transform=\\"translate(-2 -2)\\"/><g id=\\"Page-1\\"><g id=\\"Video-Player-Skin\\"><g id=\\"Video-Copy\\"><g id=\\"volume\\"><path id=\\"Shape\\" class=\\"cls-2\\" d=\\"M14.24,9.17l-3.79,4.11H6.82c-.78,0-1,.46-1,.89V17.7a1,1,0,0,0,1,1h3.65l3.79,4.18a1.09,1.09,0,0,0,.53.14,1,1,0,0,0,.5-.14,1,1,0,0,0,.5-.9V10a1,1,0,0,0-.5-.9,1.06,1.06,0,0,0-1,.05Z\\" transform=\\"translate(-2 -2)\\"/><path id=\\"Shape-2\\" data-name=\\"Shape\\" class=\\"cls-2\\" d=\\"M19.18,19.33a4.39,4.39,0,0,0,0-6.19.71.71,0,0,0-1,1,3,3,0,0,1,0,4.19.71.71,0,0,0,1,1Z\\" transform=\\"translate(-2 -2)\\"/><path id=\\"Shape-3\\" data-name=\\"Shape\\" class=\\"cls-2\\" d=\\"M23.3,16.23a6.19,6.19,0,0,0-1.81-4.39.71.71,0,1,0-1,1,4.81,4.81,0,0,1,0,6.79.71.71,0,1,0,1,1,6.19,6.19,0,0,0,1.81-4.39Z\\" transform=\\"translate(-2 -2)\\"/></g></g></g></g></svg>","HIVI_VOLUME_OFF":"<svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path d=\\"M6 8.007H1.347C.333 8.007 0 8.769 0 9.391v5.032C0 15.045.333 16 1.347 16H6l5.007 5.796c.215.132.454.205.693.205.24 0 .436-.063.65-.196.429-.265.65-.75.65-1.28V3.447c0-.53-.221-1.02-.65-1.284-.429-.265-.935-.187-1.365.078L6 8.007zM20.305 12l2.425-2.425a.922.922 0 1 0-1.306-1.305l-2.425 2.424-2.423-2.424a.923.923 0 0 0-1.306 1.305L17.695 12l-2.425 2.425a.922.922 0 1 0 1.306 1.304L19 13.306l2.425 2.423a.92.92 0 0 0 1.306 0 .922.922 0 0 0 0-1.304L20.305 12z\\" fill-rule=\\"evenodd\\"></path></svg>","HIVI_VOLUME_ON":"<svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\"><g fill-rule=\\"evenodd\\"><path d=\\"M6 8.007H1.347C.333 8.007 0 8.769 0 9.391v5.032C0 15.045.333 16 1.347 16H6l5.007 5.796c.215.132.454.205.693.205.24 0 .436-.063.65-.196.429-.265.65-.75.65-1.28V3.447c0-.53-.221-1.02-.65-1.284-.429-.265-.935-.187-1.365.078L6 8.007zm11.612 8.524a5.858 5.858 0 0 0 0-8.253.944.944 0 0 0-1.337 1.332 3.97 3.97 0 0 1 0 5.59.943.943 0 1 0 1.337 1.331z\\"></path><path d=\\"M23.03 12.135c0-2.21-.859-4.292-2.418-5.857a.943.943 0 1 0-1.337 1.332 6.37 6.37 0 0 1 1.868 4.525 6.37 6.37 0 0 1-1.868 4.525.943.943 0 1 0 1.338 1.332 8.249 8.249 0 0 0 2.418-5.857z\\"></path></g></svg>"}'
            );
            var Ph = s.t(Oh, 2);
            const Dh = new window.DOMParser();
            function Lh(e, t = []) {
                if (Ph[e]) {
                    const i = Dh.parseFromString(Ph[e], "image/svg+xml").documentElement;
                    return i.setAttribute("class", t.join(" ")), i;
                }
                return null;
            }
            const kh = Object.keys(Ph).reduce((e, t) => ((e[t] = t), e), {});
            class Rh extends wh {
                render() {
                    const { onClick: e } = this.props,
                        t = new Nh({ onClick: e, classNames: this.getClassNames() }).render(),
                        i = Lh(kh.CROSS, ["icon"]);
                    return t.appendChild(i), t;
                }
                getClassNames() {
                    return ["button-close", ...super.getClassNames()];
                }
            }
            var xh;
            let Uh = class {
                constructor(e) {
                    this.adSlot = e;
                }
                onEnter(e) {
                    return p(this, void 0, void 0, function* () {
                        (this.button = new Rh({
                            onClick: () => {
                                this.adSlot.emitEvent(Wi.SLOT_CLOSE_IMMEDIATELY), e("hidden");
                            },
                        }).render()),
                            setTimeout(() => {
                                this.adSlot.getElement().appendChild(this.button);
                            }, 0);
                    });
                }
                onLeave() {
                    return p(this, void 0, void 0, function* () {
                        this.button.remove();
                    });
                }
            };
            Uh = l([N({ autobind: !1 }), c(0, O(Th.SLOT)), u("design:paramtypes", ["function" == typeof (xh = void 0 !== kn && kn) ? xh : Object])], Uh);
            let Vh = class {
                constructor(e) {
                    this.name = e;
                }
                onEnter(e) {
                    return p(this, void 0, void 0, function* () {
                        (window.ads.transitions = window.ads.transitions || {}), (window.ads.transitions[this.name] = (t) => e(t, { allowMulticast: !0 }));
                    });
                }
                onDestroy() {
                    return p(this, void 0, void 0, function* () {
                        delete window.ads.transitions[this.name];
                    });
                }
            };
            var Mh;
            Vh = l([N({ autobind: !1 }), c(0, O(Th.NAME)), u("design:paramtypes", [String])], Vh);
            let jh = class {
                constructor(e) {
                    (this.element = e), (this.stylesBackup = {});
                }
                setProperty(e, t) {
                    return this.saveProperty(e), (this.element.style[e] = t), this;
                }
                saveProperty(e) {
                    void 0 === this.stylesBackup[e] && (this.stylesBackup[e] = this.element.style[e]);
                }
                addClass(...e) {
                    return this.saveClasses(), this.element.classList.add(...e), this;
                }
                removeClass(...e) {
                    return this.saveClasses(), this.element.classList.remove(...e), this;
                }
                saveClasses() {
                    this.classesBackup || (this.classesBackup = this.element.classList.value);
                }
                restore() {
                    for (const [e, t] of Object.entries(this.stylesBackup)) this.element.style[e] = t;
                    this.classesBackup && (this.element.classList.value = this.classesBackup), (this.stylesBackup = {}), (this.classesBackup = void 0);
                }
            };
            jh = l([N({ autobind: !1 }), u("design:paramtypes", ["function" == typeof (Mh = "undefined" != typeof HTMLElement && HTMLElement) ? Mh : Object])], jh);
            let Bh = class {
                constructor() {
                    this.elements = new Map();
                }
                element(e) {
                    return this.elements.has(e) || this.elements.set(e, new jh(e)), this.elements.get(e);
                }
                restore() {
                    this.elements.forEach((e) => e.restore()), this.elements.clear();
                }
            };
            var zh;
            Bh = l([N({ autobind: !1 })], Bh);
            let Gh = class {
                constructor(e) {
                    this.manipulator = e;
                }
                onEnter() {
                    return p(this, void 0, void 0, function* () {});
                }
                onLeave() {
                    return p(this, void 0, void 0, function* () {
                        this.manipulator.restore();
                    });
                }
            };
            var Fh;
            Gh = l([N({ autobind: !1 }), u("design:paramtypes", ["function" == typeof (zh = void 0 !== Bh && Bh) ? zh : Object])], Gh);
            let $h = class {
                constructor(e) {
                    this.adSlot = e;
                }
                onEnter(e) {
                    return p(this, void 0, void 0, function* () {
                        this.adSlot.setConfigProperty("showManually", !0),
                            this.adSlot.addClass("interstitial"),
                            this.adSlot.addClass("out-of-page-template"),
                            this.adSlot.isOutOfPage() && (yield Ki.adjustIframeByContentSize(this.adSlot)),
                            (window.ads.runtime.interstitial = window.ads.runtime.interstitial || {}),
                            (window.ads.runtime.interstitial.available = !0),
                            e("display");
                    });
                }
                onLeave() {
                    return p(this, void 0, void 0, function* () {
                        Gt.emit(Bt.AD_ENGINE_INTERSTITIAL_DISPLAYED), this.adSlot.show(), (window.ads.runtime.interstitial.visible = !0);
                    });
                }
            };
            var Hh;
            $h = l([N({ autobind: !1 }), c(0, O(Th.SLOT)), u("design:paramtypes", ["function" == typeof (Fh = void 0 !== kn && kn) ? Fh : Object])], $h);
            let qh = class {
                constructor(e) {
                    this.manipulator = e;
                }
                onEnter() {
                    return p(this, void 0, void 0, function* () {
                        this.manipulator.element(document.documentElement).setProperty("overflow", "hidden");
                    });
                }
            };
            var Wh, Kh;
            qh = l([N({ autobind: !1 }), u("design:paramtypes", ["function" == typeof (Hh = void 0 !== Bh && Bh) ? Hh : Object])], qh);
            let Yh = class {
                constructor(e, t) {
                    (this.adSlot = e), (this.manipulator = t);
                }
                onEnter() {
                    return p(this, void 0, void 0, function* () {
                        this.manipulator.element(this.adSlot.element).addClass(kn.HIDDEN_AD_CLASS), document.body.classList.remove("has-sticky-tlb"), this.adSlot.emitEvent(Mi.HIDDEN_EVENT);
                    });
                }
            };
            Yh = l([N({ autobind: !1 }), c(0, O(Th.SLOT)), u("design:paramtypes", ["function" == typeof (Wh = void 0 !== kn && kn) ? Wh : Object, "function" == typeof (Kh = void 0 !== Bh && Bh) ? Kh : Object])], Yh);
            let Qh = class {
                initialize(e) {
                    e.slotName && ((this.configuration = e), (this.railElement = document.querySelectorAll(this.configuration.railSelector)[0]), this.railElement && this.enableSticking());
                }
                enableSticking() {
                    Y.get("options.stickyTbExperiment") ? this.registerSuccessListener() : Gt.on(Bt.AD_ENGINE_UAP_NTC_LOADED, this.registerSuccessListener.bind(this));
                }
                registerSuccessListener() {
                    Gt.onSlotEvent(
                        Yi.STATUS_SUCCESS,
                        () => {
                            this.registerPusherListener(), this.registerViewedListener();
                        },
                        this.configuration.slotName,
                        !0
                    );
                }
                registerPusherListener() {
                    Gt.onSlotEvent(
                        Mi.CUSTOM_EVENT,
                        ({ payload: e }) => {
                            var t;
                            if (e.status === vr.SLOT_STICKED_STATE) {
                                const e = (null === (t = document.getElementById(this.configuration.pusherSlotName)) || void 0 === t ? void 0 : t.offsetHeight) || 36;
                                this.railElement.style.top = `${e}px`;
                            }
                        },
                        this.configuration.pusherSlotName
                    );
                }
                registerViewedListener() {
                    const e = document.querySelector(this.configuration.pageSelector);
                    e &&
                        (Gt.onSlotEvent(
                            Mi.SLOT_VIEWED_EVENT,
                            () => {
                                setTimeout(() => {
                                    e.classList.add("companion-viewed"), e.classList.remove("companion-stick");
                                }, 500);
                            },
                            this.configuration.slotName,
                            !0
                        ),
                        e.classList.add("companion-stick"));
                }
            };
            var Xh;
            Qh = l([N()], Qh);
            let Jh = class {
                constructor(e) {
                    this.container = e;
                }
                provideDependencies(e, t, i, n) {
                    this.container.bind(Th.NAME).value(e), this.container.bind(Th.SLOT).value(t), this.container.bind(Th.PARAMS).value(i), n.forEach((e) => this.container.bind(e));
                }
                resetDependencies(e) {
                    this.container.unbind(Th.PARAMS), this.container.unbind(Th.SLOT), this.container.unbind(Th.NAME), e.forEach((e) => this.container.unbind(e));
                }
            };
            Jh = l([N(), u("design:paramtypes", ["function" == typeof (Xh = void 0 !== x && x) ? Xh : Object])], Jh);
            class Zh {
                get currentState() {
                    if (!this.states.has(this.currentStateKey)) throw new Error(`Template ${this.templateName} - state (${this.currentStateKey}) does not exist.`);
                    return this.states.get(this.currentStateKey);
                }
                constructor(e, t, i, n) {
                    (this.templateName = e),
                        (this.states = t),
                        (this.currentStateKey = i),
                        (this.emitter$ = n),
                        (this.transition = (e) =>
                            p(this, void 0, void 0, function* () {
                                if (this.currentStateKey === e) throw new Error(`Template ${this.templateName} - already is in ${this.currentStateKey} state`);
                                this.emit("leaving"), yield this.currentState.leave(), this.emit("left"), (this.currentStateKey = e), this.emit("entering"), yield this.currentState.enter(this.transition), this.emit("entered");
                            }));
                }
                init() {
                    return p(this, void 0, void 0, function* () {
                        this.emit("initialising"), yield this.currentState.enter(this.transition), this.emit("initialised");
                    });
                }
                destroy() {
                    return p(this, void 0, void 0, function* () {
                        this.emit("destroying"), yield this.currentState.leave(), yield Promise.all(Array.from(this.states.values()).map((e) => e.destroy())), this.emit("destroyed");
                    });
                }
                emit(e) {
                    this.emitter$.next({ type: e, templateName: this.templateName, stateName: this.currentStateKey });
                }
            }
            class eg {
                constructor(e, t) {
                    (this.name = e), (this.handlers = t);
                }
                enter(e) {
                    return p(this, void 0, void 0, function* () {
                        const t = un(),
                            i = this.useTransition(e, t);
                        yield Promise.all(
                            this.handlers.map((e) =>
                                p(this, void 0, void 0, function* () {
                                    return e.onEnter(i);
                                })
                            )
                        ),
                            t.resolve(null);
                    });
                }
                leave() {
                    return p(this, void 0, void 0, function* () {
                        yield Promise.all(
                            this.handlers
                                .filter((e) => "onLeave" in e)
                                .map((e) =>
                                    p(this, void 0, void 0, function* () {
                                        return e.onLeave();
                                    })
                                )
                        );
                    });
                }
                destroy() {
                    return p(this, void 0, void 0, function* () {
                        yield Promise.all(
                            this.handlers
                                .filter((e) => "onDestroy" in e)
                                .map((e) =>
                                    p(this, void 0, void 0, function* () {
                                        return e.onDestroy();
                                    })
                                )
                        );
                    });
                }
                useTransition(e, t) {
                    let i = !1;
                    return (n, { allowMulticast: s = !1 } = {}) =>
                        p(this, void 0, void 0, function* () {
                            if ((yield t, i && !s))
                                throw new Error(
                                    `Error thrown while attempting to transition to "${n}" state. Attempting to call transition from "${this.name}" state a second time.\nThis may be caused by:\n- not cleaning up in an "onLeave" method,\n- calling transition in a different handler at the same time.\nYou may suppress this error by setting allowMulticast to true.\n`
                                );
                            return (i = !0), e(n, { allowMulticast: s });
                        });
                }
            }
            var tg, ig;
            let ng = class {
                constructor(e, t) {
                    (this.container = e), (this.dependenciesManager = t), (this.settings = new Map()), (this.machines = new Map());
                }
                has(e) {
                    return this.settings.has(e);
                }
                register(e, t, i, n = []) {
                    const s = new rt();
                    return this.settings.set(e, { StateHandlerTypesDict: t, initialStateKey: i, emitter$: s, templateDependencies: n.flat(1 / 0) }), s.asObservable();
                }
                destroy(e) {
                    return p(this, void 0, void 0, function* () {
                        const t = Array.from(this.machines.get(e) || []);
                        yield Promise.all(t.map((e) => e.destroy())), this.machines.delete(e);
                    });
                }
                destroyAll() {
                    return p(this, void 0, void 0, function* () {
                        yield Promise.all(Array.from(this.machines.values()).map((e) => Promise.all(Array.from(e.values()).map((e) => e.destroy())))), this.machines.clear();
                    });
                }
                init(e, t, i = {}) {
                    if (!this.settings.has(e)) throw new Error(`Template ${e} was not registered`);
                    Gt.emit(Bt.AD_ENGINE_TEMPLATE_LOADED, { name: e, state: t ? t.getSlotName() : "" });
                    const { StateHandlerTypesDict: n, initialStateKey: s, emitter$: o, templateDependencies: r } = this.settings.get(e);
                    this.dependenciesManager.provideDependencies(e, t, i, r);
                    const a = this.createTemplateStateMap(n);
                    this.dependenciesManager.resetDependencies(r);
                    const d = new Zh(e, a, s, o);
                    d.init(), this.saveMachine(t, d);
                }
                saveMachine(e, t) {
                    var i, n;
                    const s = this.machines.get(null !== (i = null == e ? void 0 : e.getSlotName()) && void 0 !== i ? i : "__default__") || new Set();
                    s.add(t), this.machines.set(null !== (n = null == e ? void 0 : e.getSlotName()) && void 0 !== n ? n : "__default__", s);
                }
                createTemplateStateMap(e) {
                    const t = Object.keys(e).map((t) => [t, this.createTemplateState(e, t)]);
                    return new Map(t);
                }
                createTemplateState(e, t) {
                    const i = e[t].map((e) => this.createStateHandler(e));
                    return new eg(t, i);
                }
                createStateHandler(e) {
                    return this.container.bind(e).scope("Transient"), this.container.get(e);
                }
            };
            var sg, og;
            ng = l([N(), u("design:paramtypes", ["function" == typeof (tg = void 0 !== x && x) ? tg : Object, "function" == typeof (ig = void 0 !== Jh && Jh) ? ig : Object])], ng);
            let rg = class {
                constructor(e, t) {
                    (this.adSlot = e), (this.params = t);
                }
                onEnter(e) {
                    return p(this, void 0, void 0, function* () {
                        this.adSlot.setConfigProperty("showManually", !0),
                            this.adSlot.addClass("expanded-slot"),
                            this.adSlot.addClass("bfaa-template"),
                            this.adSlot.addClass("slot-responsive"),
                            this.adSlot.addClass("theme-hivi"),
                            this.adSlot.getAdContainer().classList.add("iframe-container"),
                            yield Ki.onReady(this.adSlot),
                            yield this.awaitVisibleDOM(),
                            Ar(this.params) ? e("sticky") : (Tr(), e("impact"));
                    });
                }
                awaitVisibleDOM() {
                    return p(this, void 0, void 0, function* () {
                        document.hidden && (yield dn(window, "visibilitychange"));
                    });
                }
                onLeave() {
                    return p(this, void 0, void 0, function* () {
                        this.adSlot.show(), document.body.classList.add("has-uap");
                    });
                }
                onDestroy() {
                    return p(this, void 0, void 0, function* () {
                        document.body.classList.remove("has-uap");
                    });
                }
            };
            rg = l(
                [
                    N({ autobind: !1 }),
                    c(0, O(Th.SLOT)),
                    c(1, O(Th.PARAMS)),
                    u("design:paramtypes", ["function" == typeof (sg = void 0 !== kn && kn) ? sg : Object, "function" == typeof (og = void 0 !== o.UapParams && o.UapParams) ? og : Object]),
                ],
                rg
            );
            class ag {
                constructor(e, t) {
                    (this.className = e), (this.uiElements = t), (this.panelContainer = null);
                }
                add(e, t, i) {
                    (this.panelContainer = document.createElement("div")),
                        (this.panelContainer.className = this.className),
                        this.uiElements.forEach((t) => {
                            t && t.add(e, this.panelContainer, i);
                        }),
                        t.appendChild(this.panelContainer);
                }
            }
            class dg {
                static add(e, t) {
                    const i = document.createElement("div"),
                        n = Lh(kh.PAUSE, ["play-off-icon", "porvata-icon", "porvata-off-icon"]),
                        s = Lh(kh.PLAY, ["play-on-icon", "porvata-icon", "porvata-on-icon"]);
                    i.appendChild(s),
                        i.appendChild(n),
                        (i.className = "play-pause-button porvata-switchable-icon"),
                        i.addEventListener("click", () => {
                            e.isPaused() ? e.resume() : e.pause();
                        }),
                        e.addEventListener("pause", () => {
                            i.classList.remove("is-on");
                        }),
                        e.addEventListener("resume", () => {
                            i.classList.add("is-on");
                        }),
                        e.addEventListener("start", () => {
                            i.classList.add("is-on");
                        }),
                        t.appendChild(i);
                }
            }
            class lg {
                static add(e, t) {
                    const i = document.createElement("div"),
                        n = Lh(kh.FULLSCREEN_OFF, ["fullscreen-off-icon", "porvata-icon", "porvata-off-icon"]),
                        s = Lh(kh.FULLSCREEN_ON, ["fullscreen-on-icon", "porvata-icon", "porvata-on-icon"]);
                    i.appendChild(n),
                        i.appendChild(s),
                        (i.className = "toggle-fullscreen-button porvata-switchable-icon"),
                        i.addEventListener("click", () => {
                            e.toggleFullscreen();
                        }),
                        e.addEventListener("wikiaFullscreenChange", () => {
                            e.isFullscreen() ? i.classList.add("is-on") : i.classList.remove("is-on");
                        }),
                        e.addEventListener("wikiaAdStop", () => {
                            e.isFullscreen() && e.toggleFullscreen();
                        }),
                        t.appendChild(i);
                }
            }
            function cg(e, t) {
                e.isMuted() ? t.classList.add("is-on") : t.classList.remove("is-on");
            }
            class ug {
                static add(e, t) {
                    const i = (function () {
                        const e = document.createElement("div"),
                            t = Lh(kh.HIVI_VOLUME_OFF, ["volume-off-icon", "porvata-icon", "porvata-off-icon"]),
                            i = Lh(kh.HIVI_VOLUME_ON, ["volume-on-icon", "porvata-icon", "porvata-on-icon"]);
                        return (e.className = "volume-button porvata-switchable-icon"), e.appendChild(t), e.appendChild(i), e;
                    })();
                    e.addEventListener("wikiaVolumeChange", () => {
                        cg(e, i);
                    }),
                        e.addEventListener("wikiaAdStarted", () => {
                            cg(e, i);
                        }),
                        i.addEventListener("click", (t) => {
                            e.toggleVolume(), t.preventDefault();
                        }),
                        t.appendChild(i);
                }
            }
            function pg(e) {
                e.style.display = "none";
                const t = e.offsetWidth;
                return (e.style.display = ""), t;
            }
            function hg(e, t) {
                t.container.classList.contains("theme-hivi") ||
                    (e.style.width =
                        e.style.width ||
                        (function (e) {
                            const t = e.container.offsetWidth;
                            return (100 * e.hideWhenPlaying.offsetWidth) / t + "%";
                        })(t)),
                    (e.style.display = "block");
            }
            function gg(e) {
                return Je(function (t, i) {
                    vt(e).subscribe(
                        Ze(
                            i,
                            function () {
                                return i.complete();
                            },
                            ke
                        )
                    ),
                        !i.closed && t.subscribe(i);
                });
            }
            var mg = new Yp(Hp),
                fg = mg;
            class vg {
                static createDisplayContainer(e, t = null) {
                    const i = new window.google.ima.AdDisplayContainer(e),
                        n = e.querySelector("div > iframe");
                    return (
                        t &&
                            (Gt.onSlotEvent(
                                Mi.DESTROY_EVENT,
                                () => {
                                    vg.activeContainers.includes(t.getUid()) && (i.destroy(), (vg.activeContainers = vg.activeContainers.filter((e) => e !== t.getUid())));
                                },
                                t.getSlotName(),
                                !0
                            ),
                            vg.activeContainers.push(t.getUid())),
                        vg.reloadIframeOnNavigation(n),
                        i
                    );
                }
                static reloadIframeOnNavigation(e) {
                    window.performance && window.performance.navigation && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD && (e.contentWindow.location.href = e.src);
                }
                static createAdsLoader(e, t) {
                    const i = new window.google.ima.AdsLoader(e);
                    return i.getSettings().setVpaidMode(t.getVpaidMode()), i;
                }
                static createAdsRequest(e) {
                    const t = new window.google.ima.AdsRequest(),
                        i = e.getWidth(),
                        n = e.getHeight();
                    return (
                        (t.adTagUrl = e.getVastUrl() || Cs(0, e.getSlotName(), { targeting: e.getVastTargeting() })),
                        (t.linearAdSlotWidth = i),
                        (t.linearAdSlotHeight = n),
                        t.setAdWillAutoPlay(e.isAutoPlay()),
                        t.setAdWillPlayMuted(e.isAutoPlay()),
                        t
                    );
                }
                static getRenderingSettings() {
                    const e = new window.google.ima.AdsRenderingSettings();
                    return Y.get("state.isMobile") || (e.bitrate = 68e3), (e.loadVideoTimeout = 15e3), (e.enablePreloading = !0), (e.uiElements = []), e;
                }
            }
            vg.activeContainers = [];
            class bg {
                constructor(e) {
                    (this.fullscreen = !1),
                        (this.enter = ks(e, bg.enterEvents)),
                        (this.exit = ks(e, bg.exitEvents) || ks(document, bg.exitEvents)),
                        (this.fullscreenChangeEvent = (Ls(e, bg.changeEvents) || "").replace(/^on/, "").replace("msfullscreenchange", "MSFullscreenChange")),
                        this.isSupported() &&
                            this.addChangeListener(() => {
                                this.fullscreen = !this.fullscreen;
                            });
                }
                addChangeListener(e) {
                    document.addEventListener(this.fullscreenChangeEvent, e);
                }
                removeChangeListener(e) {
                    document.removeEventListener(this.fullscreenChangeEvent, e);
                }
                toggle() {
                    this.isSupported() && (this.isFullscreen() ? this.exit() : this.enter());
                }
                isFullscreen() {
                    return this.fullscreen;
                }
                isSupported() {
                    return Boolean(this.enter && this.exit);
                }
            }
            (bg.enterEvents = ["webkitRequestFullscreen", "webkitEnterFullscreen", "mozRequestFullScreen", "msRequestFullscreen", "requestFullscreen"]),
                (bg.exitEvents = ["webkitExitFullscreen", "mozCancelFullScreen", "msExitFullscreen", "exitFullscreen"]),
                (bg.changeEvents = ["onwebkitfullscreenchange", "onmozfullscreenchange", "onmsfullscreenchange", "onfullscreenchange"]);
            class yg {
                constructor(e) {
                    var t;
                    (this.playerContainer = e),
                        (this.videoContainer = e.querySelector("div")),
                        (this.videoElement = this.videoContainer.querySelector("video")),
                        (this.interfaceContainer = document.createElement("div")),
                        this.playerContainer.classList.add("porvata", "porvata-container"),
                        this.videoContainer.classList.add("video-player", "porvata-player", kn.HIDDEN_AD_CLASS),
                        null === (t = this.videoElement) || void 0 === t || t.classList.add("porvata-video"),
                        this.interfaceContainer.classList.add("porvata-interface", kn.HIDDEN_AD_CLASS),
                        this.playerContainer.appendChild(this.interfaceContainer);
                }
                getInterfaceContainer() {
                    return this.interfaceContainer;
                }
                getPlayerContainer() {
                    return this.playerContainer;
                }
                getVideoContainer() {
                    return this.videoContainer;
                }
                getVideoElement() {
                    return this.videoElement;
                }
                setAttribute(e, t) {
                    this.playerContainer.setAttribute(e, t);
                }
                setVastAttributes(e, t, i) {
                    const n = vc.getVastAttributes(e, t, i);
                    Object.keys(n).forEach((e) => this.setAttribute(e, n[e]));
                }
                setAutoPlayOnVideoElement(e) {
                    this.videoElement && ((this.videoElement.autoplay = e), (this.videoElement.muted = e));
                }
                setAudioOnVideoElement(e) {
                    this.videoElement && ((this.videoElement.muted = 0 === e), (this.videoElement.volume = e));
                }
            }
            const _g = "video-player-fullscreen",
                Sg = "stop-scrolling";
            class Eg {
                constructor(e, t, i, n) {
                    (this.adDisplayContainer = e), (this.adsLoader = t), (this.adsRequest = i), (this.settings = n), (this.state = null), (this.adsManager = null), (this.eventListeners = {}), (this.destroyCallbacks = new tn());
                    const s = n.getPlayerContainer();
                    (this.playCounter = 0), (this.dom = new yg(s)), (this.container = s);
                    const o = s.querySelector("video");
                    (this.nativeFullscreen = new bg(o)),
                        this.registerStateListeners(),
                        this.settings.isAutoPlay() && (this.setAutoPlay(!0), this.updatePlayCounter()),
                        this.destroyCallbacks.onItemFlush((e) => e()),
                        this.nativeFullscreen.isSupported() && this.nativeFullscreen.addChangeListener(() => this.onFullscreenChange());
                }
                registerStateListeners() {
                    this.addEventListener(window.google.ima.AdEvent.Type.LOADED, (e) => this.setAdStatus(Yi.STATUS_SUCCESS, e.getAd())),
                        this.addEventListener(window.google.ima.AdErrorEvent.Type.AD_ERROR, () => this.setAdStatus(Yi.STATUS_ERROR)),
                        this.addEventListener("resume", () => this.setState("playing")),
                        this.addEventListener("start", () => this.setState("playing")),
                        this.addEventListener("pause", () => this.setState("paused")),
                        this.addEventListener("wikiaAdStop", () => this.setState("stopped")),
                        this.addEventListener("allAdsCompleted", () => this.setState("stopped")),
                        this.addEventListener("adCanPlay", () => this.dom.getInterfaceContainer().classList.remove(kn.HIDDEN_AD_CLASS)),
                        this.addEventListener("wikiaAdCompleted", () => this.dom.getInterfaceContainer().classList.add(kn.HIDDEN_AD_CLASS));
                }
                getAdsManager() {
                    return this.adsManager;
                }
                setAdsManager(e) {
                    this.adsManager = e;
                }
                addEventListener(e, t) {
                    if (-1 !== e.indexOf("wikia")) return (this.eventListeners[e] = this.eventListeners[e] || []), void this.eventListeners[e].push(t);
                    null !== this.adsManager ? this.adsManager.addEventListener(e, t) : this.addEventListener("wikiaAdsManagerLoaded", () => this.adsManager.addEventListener(e, t));
                }
                removeEventListener(e, t) {}
                dispatchEvent(e) {
                    this.eventListeners[e] &&
                        this.eventListeners[e].length > 0 &&
                        this.eventListeners[e].forEach((e) => {
                            e({});
                        });
                }
                setAutoPlay(e) {
                    this.dom.setAutoPlayOnVideoElement(e), this.settings.setAutoPlay(e);
                }
                setAdStatus(e, t) {
                    this.dom.setVastAttributes(this.adsRequest.adTagUrl, e, t);
                }
                requestAds() {
                    this.adsLoader.requestAds(this.adsRequest);
                }
                play(e, t) {
                    void 0 !== e && void 0 !== t && (this.settings.setHeight(t), this.settings.setWidth(e)),
                        (this.settings.getWidth() && this.settings.getHeight() && !this.isFullscreen()) ||
                            (this.settings.setHeight(this.dom.getPlayerContainer().offsetHeight), this.settings.setWidth(this.dom.getPlayerContainer().offsetWidth)),
                        this.dispatchEvent("wikiaAdPlayTriggered"),
                        this.adDisplayContainer.initialize(),
                        this.adsManager.init(Math.round(this.settings.getWidth()), Math.round(this.settings.getHeight()), window.google.ima.ViewMode.NORMAL),
                        this.adsManager.start(),
                        this.updatePlayCounter();
                }
                reload() {
                    const e = vg.createAdsRequest(this.settings);
                    this.adsManager.destroy(), this.adsLoader.contentComplete(), this.adsLoader.requestAds(e);
                }
                resize(e, t) {
                    const i = window.google.ima.ViewMode;
                    isFinite(e) && isFinite(t) && (this.settings.setHeight(t), this.settings.setWidth(e)),
                        this.adsManager &&
                            (this.isFullscreen() ? this.adsManager.resize(window.innerWidth, window.innerHeight, i.FULLSCREEN) : this.adsManager.resize(Math.round(this.settings.getWidth()), Math.round(this.settings.getHeight()), i.NORMAL));
                }
                getRemainingTime() {
                    return this.adsManager.getRemainingTime();
                }
                setState(e) {
                    this.state = e;
                }
                getState() {
                    return this.state;
                }
                getPlayCounter() {
                    return this.playCounter;
                }
                updatePlayCounter() {
                    this.playCounter++;
                }
                isPaused() {
                    return "paused" === this.getState();
                }
                isPlaying() {
                    return "playing" === this.getState();
                }
                resume() {
                    this.adsManager.resume();
                }
                pause() {
                    this.adsManager.pause();
                }
                stop() {
                    this.adsManager.stop(), this.dispatchEvent("wikiaAdStop");
                }
                toggleVolume() {
                    this.isMuted() ? (this.unmute(), this.dispatchEvent("wikiaAdUnmute")) : (this.mute(), this.dispatchEvent("wikiaAdMute"));
                }
                isMuted() {
                    return 0 === this.adsManager.getVolume();
                }
                mute() {
                    this.setVolume(0);
                }
                unmute() {
                    this.setVolume(0.75);
                }
                setVolume(e) {
                    this.dom.setAudioOnVideoElement(e), this.adsManager.setVolume(e), this.dispatchEvent("wikiaVolumeChange");
                }
                toggleFullscreen() {
                    (this.fullscreenMuteProtect = !0), this.nativeFullscreen.isSupported() ? this.nativeFullscreen.toggle() : this.onFullscreenChange();
                }
                onFullscreenChange() {
                    this.isFullscreen()
                        ? (this.dom.getPlayerContainer().classList.add(_g), document.documentElement.classList.add(Sg))
                        : (this.dom.getPlayerContainer().classList.remove(_g),
                          document.documentElement.classList.remove(Sg),
                          this.fullscreenMuteProtect ? (this.fullscreenMuteProtect = !1) : this.isPlaying() && !this.isMuted() && this.mute()),
                        this.resize(),
                        this.dispatchEvent("wikiaFullscreenChange");
                }
                isFullscreen() {
                    return this.nativeFullscreen.isFullscreen();
                }
                addOnDestroyCallback(e) {
                    this.destroyCallbacks.push(e);
                }
                destroy() {
                    this.destroyCallbacks.flush();
                }
            }
            class wg {
                static create(e) {
                    return p(this, void 0, void 0, function* () {
                        Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: "porvata_start" }), (e.getPlayerContainer().style.opacity = "0"), yield wg.load();
                        const t = e.getSlotName(),
                            i = $n.get(t);
                        !(function (e, t) {
                            e.setConfigProperty("autoplay", t.isAutoPlay()),
                                e.setConfigProperty("audio", !t.isAutoPlay()),
                                e.setTargetingConfigProperty("autoplay", t.isAutoPlay() ? "yes" : "no"),
                                e.setTargetingConfigProperty("audio", t.isAutoPlay() ? "no" : "yes");
                        })(i, e);
                        const n = vg.createDisplayContainer(e.getPlayerContainer(), i),
                            s = vg.createAdsLoader(n, e),
                            o = vg.createAdsRequest(e),
                            r = (function (e) {
                                return [Gl].filter((t) => t.isEnabled(e));
                            })(e),
                            a = new Eg(n, s, o, e);
                        return (
                            r.forEach((e) => e.load()),
                            this.registerAdsLoaderListeners(s, a, e, r),
                            Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: "porvata_ready" }),
                            yield a.requestAds(),
                            Gt.emit(Bt.PARTNER_LOAD_STATUS, { status: "porvata_done" }),
                            a
                        );
                    });
                }
                static load() {
                    return p(this, void 0, void 0, function* () {
                        return wg.loadSdkPromise || (wg.loadSdkPromise = window.google && window.google.ima ? new Promise((e) => e()) : xi.loadScript("//imasdk.googleapis.com/js/sdkloader/ima3.js")), wg.loadSdkPromise;
                    });
                }
                static registerAdsLoaderListeners(e, t, i, n) {
                    e.addEventListener(
                        window.google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
                        (e) => {
                            const s = vg.getRenderingSettings(),
                                o = e.getAdsManager(
                                    (function () {
                                        const e = document.createElement("video");
                                        return e.setAttribute("preload", "none"), e;
                                    })(),
                                    s
                                );
                            t.setAdsManager(o),
                                Promise.all(n.map((e) => e.init(t, i))).then(() => {
                                    t.dispatchEvent("wikiaAdsManagerLoaded"), (i.getPlayerContainer().style.opacity = "1");
                                });
                        },
                        !1
                    ),
                        e.addEventListener(window.google.ima.AdErrorEvent.Type.AD_ERROR, (e) => {
                            const i = window.google.ima.AdError.ErrorCode.VAST_EMPTY_RESPONSE;
                            "function" == typeof e.getError && e.getError().getErrorCode() === i && t.dispatchEvent("wikiaEmptyAd"), t.setAdStatus(Yi.STATUS_ERROR);
                        });
                }
            }
            class Ag {
                constructor(e) {
                    (this.params = e),
                        (this.lastKnownAdData = { contentType: "", creativeId: "", lineItemId: "" }),
                        (this.logger = (...e) => yi(Ag.LOG_GROUP, ...e)),
                        (this.listeners = (Y.get("listeners.porvata") || []).filter((e) => !e.isEnabled || e.isEnabled()));
                }
                init() {
                    this.dispatch("init");
                }
                registerVideoEvents(e) {
                    (this.video = e),
                        this.dispatch("ready"),
                        Object.keys(Ag.EVENTS).forEach((t) => {
                            e.addEventListener(t, (e) => {
                                let i, n;
                                e.getError && (i = e.getError().getErrorCode()), e.getAd && (n = e.getAd()), this.dispatch(Ag.EVENTS[t], i, n);
                            });
                        });
                }
                dispatch(e, t = 0, i) {
                    const n = this.getVideoData(e, t, i);
                    this.logger(e, n),
                        this.listeners.forEach((t) => {
                            t.onEvent(e, this.params, n);
                        }),
                        this.params.position && e === Ag.EVENTS.viewable_impression
                            ? $n.get(this.params.position).emit(Mi.VIDEO_VIEWED_EVENT)
                            : this.params.position && e === Ag.EVENTS.wikiaXClick && $n.get(this.params.position).emit(Ag.EVENTS.wikiaXClick);
                }
                getVideoData(e, t, i) {
                    let n, s, o;
                    if (i) {
                        const e = $l.getAdInfo(i);
                        (n = e.contentType), (s = e.creativeId), (o = e.lineItemId);
                    } else
                        this.video &&
                            this.video.container &&
                            ((n = this.video.container.getAttribute("data-vast-content-type")), (s = this.video.container.getAttribute("data-vast-creative-id")), (o = this.video.container.getAttribute("data-vast-line-item-id")));
                    return (
                        (this.lastKnownAdData.contentType = n || this.lastKnownAdData.contentType),
                        (this.lastKnownAdData.creativeId = s || this.lastKnownAdData.creativeId),
                        (this.lastKnownAdData.lineItemId = o || this.lastKnownAdData.lineItemId),
                        {
                            ad_error_code: t,
                            ad_product: this.params.adProduct,
                            audio: this.params.withAudio ? 1 : 0,
                            content_type: this.lastKnownAdData.contentType || "(none)",
                            creative_id: this.lastKnownAdData.creativeId || "",
                            ctp: this.params.withCtp ? 1 : 0,
                            event_name: e,
                            line_item_id: this.lastKnownAdData.lineItemId || "",
                            player: Ag.PLAYER_NAME,
                            position: this.params.position ? this.params.position.toLowerCase() : "(none)",
                        }
                    );
                }
            }
            var Tg, Ig, Cg;
            (Ag.EVENTS = {
                adCanPlay: "ad_can_play",
                complete: "completed",
                click: "clicked",
                firstquartile: "first_quartile",
                impression: "impression",
                loaded: "loaded",
                midpoint: "midpoint",
                pause: "paused",
                resume: "resumed",
                start: "started",
                thirdquartile: "third_quartile",
                viewable_impression: "viewable_impression",
                adError: "error",
                wikiaAdPlayTriggered: "play_triggered",
                wikiaAdStop: "closed",
                wikiaAdMute: "mute",
                wikiaAdUnmute: "unmute",
                wikiaXClick: "force_close",
                wikiaInViewportWithOffer: "in_viewport_with_offer",
                wikiaInViewportWithoutOffer: "in_viewport_without_offer",
                wikiaFullscreenChange: "fullscreen_change",
            }),
                (Ag.LOG_GROUP = "porvata-listener"),
                (Ag.PLAYER_NAME = "porvata"),
                (function (e) {
                    (e[(e.DISABLED = 0)] = "DISABLED"), (e[(e.ENABLED = 1)] = "ENABLED"), (e[(e.INSECURE = 2)] = "INSECURE");
                })(Tg || (Tg = {}));
            class Ng {
                constructor(e) {
                    (this.params = e),
                        (this.adProduct = e.adProduct),
                        (this.autoPlay = !!e.autoPlay),
                        (this.height = e.height),
                        (this.iasTracking = (function (e) {
                            return "boolean" == typeof e.iasTracking ? e.iasTracking : !!Y.get("options.video.iasTracking.enabled");
                        })(e)),
                        (this.playerContainer = e.container),
                        (this.slotName = e.slotName),
                        (this.src = e.src),
                        (this.width = e.width),
                        (this.vastUrl = e.vastUrl),
                        (this.vastTargeting = e.vastTargeting),
                        (this.vpaidMode = e.vpaidMode || Tg.ENABLED);
                }
                getAdProduct() {
                    return this.adProduct;
                }
                getParams() {
                    return this.params;
                }
                getPlayerContainer() {
                    return this.playerContainer;
                }
                getSlotName() {
                    return this.slotName;
                }
                getSrc() {
                    return this.src;
                }
                getVpaidMode() {
                    return this.vpaidMode;
                }
                getHeight() {
                    return this.height;
                }
                setHeight(e) {
                    this.height = e;
                }
                getWidth() {
                    return this.width;
                }
                setWidth(e) {
                    this.width = e;
                }
                isIasTrackingEnabled() {
                    return this.iasTracking;
                }
                isAutoPlay() {
                    return this.autoPlay;
                }
                setAutoPlay(e) {
                    this.autoPlay = e;
                }
                getVastTargeting() {
                    return this.vastTargeting;
                }
                getVastUrl() {
                    return this.vastUrl;
                }
            }
            class Og {
                static addOnViewportChangeListener(e, t) {
                    return zs.addListener(e.viewportHookElement || e.container, t, { offsetTop: e.viewportOffsetTop || 0, offsetBottom: e.viewportOffsetBottom || 0 });
                }
                static createVideoContainer(e) {
                    const t = document.createElement("div"),
                        i = document.createElement("div");
                    return t.classList.add("video-overlay"), i.classList.add("video-display-wrapper"), t.appendChild(i), e.appendChild(t), i;
                }
                static inject(e) {
                    const t = new Ag({ adProduct: e.adProduct, position: e.slotName, src: e.src, withAudio: !e.autoPlay, withCtp: !e.autoPlay });
                    let i = !0,
                        n = !1,
                        s = null;
                    e.vastTargeting = e.vastTargeting || {};
                    const o = new Ng(e);
                    return (
                        t.init(),
                        wg.create(o).then((o) => {
                            function r(t) {
                                t && !n && e.autoPlay && (o.dispatchEvent("wikiaFirstTimeInViewport"), o.play(), (n = !0));
                            }
                            function a() {
                                e.startInViewportOnly || !e.autoPlay || n ? (s = Og.addOnViewportChangeListener(e, r)) : ((n = !0), o.play());
                            }
                            var d;
                            return (
                                t.registerVideoEvents(o),
                                o.addEventListener("adCanPlay", () => {
                                    var t;
                                    o.dispatchEvent("wikiaAdStarted"), null === (t = $n.get(e.slotName)) || void 0 === t || t.emit(Mi.VIDEO_AD_IMPRESSION);
                                }),
                                o.addEventListener("allAdsCompleted", () => {
                                    o.isFullscreen() && o.toggleFullscreen(), o.setAutoPlay(!1), o.dispatchEvent("wikiaAdCompleted"), s && (zs.removeListener(s), (s = null)), (i = !1), (t.params.withAudio = !0), (t.params.withCtp = !0);
                                }),
                                o.addEventListener("wikiaAdRestart", () => {
                                    i = !1;
                                }),
                                o.addEventListener("start", () => {
                                    o.dispatchEvent("wikiaAdPlay"), s || n || a();
                                }),
                                o.addEventListener("resume", () => {
                                    o.dispatchEvent("wikiaAdPlay");
                                }),
                                o.addEventListener("pause", () => {
                                    o.dispatchEvent("wikiaAdPause");
                                }),
                                o.addOnDestroyCallback(() => {
                                    s && (zs.removeListener(s), (s = null));
                                }),
                                e.autoPlay &&
                                    (d = o).addEventListener("wikiaAdsManagerLoaded", () => {
                                        i && d.mute();
                                    }),
                                e.onReady && e.onReady(o),
                                o.addEventListener("wikiaAdsManagerLoaded", () => {
                                    a();
                                }),
                                o.addEventListener("wikiaEmptyAd", () => {
                                    s = Og.addOnViewportChangeListener(e, () => {
                                        o.dispatchEvent("wikiaFirstTimeInViewport"), zs.removeListener(s);
                                    });
                                }),
                                o
                            );
                        })
                    );
                }
            }
            let Pg = class {
                constructor(e, t) {
                    (this.adSlot = e), (this.params = t), (this.state$ = new Rt(1)), (this.video$ = this.state$.asObservable());
                }
                register() {
                    const e = this.getPlayerParams();
                    this.setCtpTargeting(e.autoPlay), Og.inject(e).then((t) => this.state$.next({ player: t, params: e }));
                }
                getPlayerParams() {
                    return Object.assign(Object.assign({}, this.params), { vastTargeting: {}, autoPlay: this.isAutoPlayEnabled(), container: this.createPlayerContainer(), hideWhenPlaying: this.params.thumbnail });
                }
                createPlayerContainer() {
                    const e = Og.createVideoContainer(this.adSlot.getElement());
                    return e.parentElement.classList.add(kn.HIDDEN_AD_CLASS), e;
                }
                isAutoPlayEnabled() {
                    const e = !Ar(this.params),
                        t = this.params.autoPlay && !e,
                        i = this.params.autoPlay && e;
                    return Boolean(t || i);
                }
                setCtpTargeting(e) {
                    const t = e ? "" : "-audio",
                        i = e ? "" : "-ctp";
                    this.adSlot.setConfigProperty("slotNameSuffix", i || t || ""), this.adSlot.setTargetingConfigProperty("audio", t ? "yes" : "no"), this.adSlot.setTargetingConfigProperty("ctp", i ? "yes" : "no");
                }
                discard() {
                    this.state$.complete();
                }
            };
            var Dg, Lg, kg, Rg;
            Pg = l(
                [
                    N({ autobind: !1 }),
                    c(0, O(Th.SLOT)),
                    c(1, O(Th.PARAMS)),
                    u("design:paramtypes", ["function" == typeof (Ig = void 0 !== kn && kn) ? Ig : Object, "function" == typeof (Cg = void 0 !== o.UapParams && o.UapParams) ? Cg : Object]),
                ],
                Pg
            );
            let xg = (Dg = class {
                constructor(e, t, i) {
                    (this.adSlot = e), (this.params = t), (this.playerRegistry = i), (this.destroy$ = new rt());
                }
                onEnter() {
                    return p(this, void 0, void 0, function* () {
                        if (!vr.isVideoEnabled(this.params)) return this.playerRegistry.discard();
                        Or.setupSlotVideoAdUnit(this.adSlot, this.params),
                            this.playerRegistry.register(),
                            this.playerRegistry.video$
                                .pipe(
                                    Mt(1),
                                    On(({ player: e, params: t }) => this.adjustUI(e, t)),
                                    _t(({ player: e }) => this.handleEvents(e)),
                                    gg(this.destroy$)
                                )
                                .subscribe();
                    });
                }
                handleEvents(e) {
                    return Lt(
                        zp(e, "adCanPlay").pipe(On(() => e.dom.getVideoContainer().classList.remove(kn.HIDDEN_AD_CLASS))),
                        zp(e, "wikiaAdStarted").pipe(
                            _t(() => zp(e, "wikiaAdCompleted")),
                            ((t = Dg.DEBOUNCE_TIME),
                            void 0 === i && (i = mg),
                            Je(function (e, n) {
                                var s = null,
                                    o = null,
                                    r = null,
                                    a = function () {
                                        if (s) {
                                            s.unsubscribe(), (s = null);
                                            var e = o;
                                            (o = null), n.next(e);
                                        }
                                    };
                                function d() {
                                    var e = r + t,
                                        o = i.now();
                                    if (o < e) return (s = this.schedule(void 0, e - o)), void n.add(s);
                                    a();
                                }
                                e.subscribe(
                                    Ze(
                                        n,
                                        function (e) {
                                            (o = e), (r = i.now()), s || ((s = i.schedule(d, t)), n.add(s));
                                        },
                                        function () {
                                            a(), n.complete();
                                        },
                                        void 0,
                                        function () {
                                            o = s = null;
                                        }
                                    )
                                );
                            })),
                            On(() => e.reload())
                        ),
                        Gt.action$.pipe(
                            zt(Gt.getGlobalAction(Bt.AD_ENGINE_SLOT_EVENT)),
                            Vt((e) => {
                                var t;
                                return e.event === Mi.CUSTOM_EVENT && e.adSlotName === this.adSlot.getSlotName() && (null === (t = e.payload) || void 0 === t ? void 0 : t.status) === vr.SLOT_FORCE_UNSTICK;
                            }),
                            On(() => e.stop())
                        )
                    );
                    var t, i;
                }
                adjustUI(e, t) {
                    (class {
                        static add(e, t) {
                            const i = document.createElement("div"),
                                n = document.createElement("div");
                            i.classList.add("progress-bar"),
                                n.classList.add("current-time"),
                                i.appendChild(n),
                                (i.pause = () => {
                                    n.style.width = (n.offsetWidth / i.offsetWidth) * 100 + "%";
                                }),
                                (i.reset = () => {
                                    (n.style.transitionDuration = ""), (n.style.width = "0");
                                }),
                                (i.rewind = () => {
                                    const e = n.style.transitionDuration;
                                    i.reset(), Ki.forceRepaint(n), (n.style.transitionDuration = e);
                                }),
                                (i.start = () => {
                                    const t = e.getRemainingTime();
                                    t ? (t > 0 && (n.style.transitionDuration = `${t}s`), Ki.forceRepaint(n), (n.style.width = "100%")) : (n.style.width = "0");
                                }),
                                e.addEventListener("wikiaAdPlay", i.start),
                                e.addEventListener("wikiaAdCompleted", i.reset),
                                e.addEventListener("wikiaAdRestart", i.rewind),
                                e.addEventListener("wikiaAdPause", i.pause),
                                t.appendChild(i);
                        }
                    }.add(e, e.dom.getInterfaceContainer()),
                        new ag("bottom-panel dynamic-panel", [dg, ug, lg]).add(e, e.dom.getInterfaceContainer(), t),
                        class {
                            static add(e, t, i) {
                                let n, s;
                                const o = pi.isSmartphone() || pi.isTablet(),
                                    r = document.createElement("div"),
                                    a = t.querySelector(".dynamic-panel");
                                function d() {
                                    (s = window.setTimeout(() => {
                                        r.classList.add("fading"), a.classList.add("fading");
                                    }, 3e3)),
                                        (n = window.setTimeout(() => {
                                            t.classList.remove("ui-visible");
                                        }, 4e3));
                                }
                                function l() {
                                    clearTimeout(n), clearTimeout(s), r.classList.remove("fading"), a.classList.remove("fading");
                                }
                                r.classList.add("toggle-ui-overlay"),
                                    e.addEventListener("start", () => {
                                        t.classList.add("ui-visible"), l(), d();
                                    }),
                                    o
                                        ? (r.addEventListener("click", () => {
                                              t.classList.toggle("ui-visible"), l(), e.isPlaying() && d();
                                          }),
                                          e.addEventListener("resume", d),
                                          e.addEventListener("pause", l))
                                        : (t.addEventListener("mouseenter", () => {
                                              t.classList.add("ui-visible"), l();
                                          }),
                                          t.addEventListener("mouseleave", () => {
                                              d();
                                          }),
                                          r.addEventListener("click", () => {
                                              top.open(i.clickThroughURL, "_blank"), Gt.emit(Bt.AD_ENGINE_VIDEO_TOGGLE_UI_OVERLAY_CLICKED, { adSlotName: e.settings.getSlotName(), ad_status: "video-click" });
                                          })),
                                    t.appendChild(r);
                            }
                        }.add(e, e.dom.getInterfaceContainer(), t),
                        class {
                            static add(e, t) {
                                e.addEventListener("wikiaAdStarted", () => {
                                    t.classList.remove(kn.HIDDEN_AD_CLASS);
                                }),
                                    e.addEventListener("wikiaAdCompleted", () => {
                                        t.classList.add(kn.HIDDEN_AD_CLASS);
                                    });
                            }
                        }.add(e, t.container.parentElement),
                        class {
                            static add(e, t, i) {
                                e.addEventListener("wikiaAdStarted", () => {
                                    i.thumbnail.classList.add("hidden-state");
                                }),
                                    e.addEventListener("wikiaAdCompleted", () => {
                                        i.thumbnail.classList.remove("hidden-state");
                                    });
                            }
                        }.add(e, void 0, t),
                        class {
                            static add(e, t, i) {
                                const n = document.createElement("div");
                                n.classList.add("player-overlay"),
                                    n.classList.add("replay-overlay"),
                                    n.addEventListener("click", () => {
                                        !(function (e, t, i) {
                                            e.play(), e.getPlayCounter() > 1 && t.emit(i, { adSlotName: e.settings.getSlotName(), ad_status: "replay-click" });
                                        })(e, Gt, Bt.AD_ENGINE_VIDEO_OVERLAY_CLICKED);
                                    }),
                                    i.autoPlay || hg(n, i),
                                    e.addEventListener("wikiaAdCompleted", () => {
                                        hg(n, i), pg(t);
                                    });
                                const s = (function (e) {
                                    const t = Lh(kh.REPLAY, ["replay-icon", "overlay-icon"]);
                                    return e.appendChild(t), t;
                                })(n);
                                if (!i.autoPlay) {
                                    const t = (function (e) {
                                        const t = Lh(kh.PLAY, ["play-icon", "overlay-icon"]);
                                        return e.appendChild(t), t;
                                    })(n);
                                    (s.style.display = "none"),
                                        e.addEventListener("start", () => {
                                            (s.style.display = ""), (t.style.display = "none");
                                        });
                                }
                                const o = e.params && e.params.thumbnail ? e.params.thumbnail : i.thumbnail;
                                o.appendChild(n), pg(o), pg(t);
                            }
                        }.add(e, e.dom.getPlayerContainer(), t),
                        class {
                            static add(e, t, i) {
                                const n = document.createElement("div"),
                                    s = Lh(kh.LEARN_MORE, ["learn-more-icon", "porvata-icon"]),
                                    o = document.createElement("div");
                                (o.innerText = ys("learn-more")),
                                    n.appendChild(o),
                                    n.appendChild(s),
                                    n.classList.add("learn-more"),
                                    n.addEventListener("click", () => {
                                        top.open(i.clickThroughURL, "_blank"), Gt.emit(Bt.AD_ENGINE_VIDEO_LEARN_MORE_CLICKED, { adSlotName: e.settings.getSlotName(), ad_status: "learn-more-click" });
                                    }),
                                    t.appendChild(n);
                            }
                        }.add(e, e.dom.getPlayerContainer(), t));
                }
                onDestroy() {
                    return p(this, void 0, void 0, function* () {
                        this.destroy$.next(), this.destroy$.complete(), this.playerRegistry.discard();
                    });
                }
            });
            function Ug(e, t) {
                return Je(function (i, n) {
                    var s = null,
                        o = 0,
                        r = !1,
                        a = function () {
                            return r && !s && n.complete();
                        };
                    i.subscribe(
                        Ze(
                            n,
                            function (i) {
                                null == s || s.unsubscribe();
                                var r = 0,
                                    d = o++;
                                vt(e(i, d)).subscribe(
                                    (s = Ze(
                                        n,
                                        function (e) {
                                            return n.next(t ? t(i, e, d, r++) : e);
                                        },
                                        function () {
                                            (s = null), a();
                                        }
                                    ))
                                );
                            },
                            function () {
                                (r = !0), a();
                            }
                        )
                    );
                });
            }
            var Vg;
            (xg.DEBOUNCE_TIME = 10),
                (xg = Dg = l(
                    [
                        N({ autobind: !1 }),
                        c(0, O(Th.SLOT)),
                        c(1, O(Th.PARAMS)),
                        u("design:paramtypes", [
                            "function" == typeof (Lg = void 0 !== kn && kn) ? Lg : Object,
                            "function" == typeof (kg = void 0 !== o.UapParams && o.UapParams) ? kg : Object,
                            "function" == typeof (Rg = void 0 !== Pg && Pg) ? Rg : Object,
                        ]),
                    ],
                    xg
                ));
            let Mg = class {
                constructor(e) {
                    (this.playerRegistry = e), (this.destroy$ = new rt());
                }
                onEnter(e) {
                    return p(this, void 0, void 0, function* () {
                        this.playerRegistry.video$
                            .pipe(
                                Mt(1),
                                Vt(({ params: e }) => !e.autoPlay),
                                Ug(({ player: e }) => zp(e, "wikiaAdStarted").pipe(Mt(1))),
                                On(() => e("impact", { allowMulticast: !0 })),
                                gg(this.destroy$)
                            )
                            .subscribe();
                    });
                }
                onDestroy() {
                    return p(this, void 0, void 0, function* () {
                        this.destroy$.next(), this.destroy$.complete();
                    });
                }
            };
            var jg;
            Mg = l([N({ autobind: !1 }), u("design:paramtypes", ["function" == typeof (Vg = void 0 !== Pg && Pg) ? Vg : Object])], Mg);
            let Bg = class {
                constructor(e) {
                    (this.playerRegistry = e), (this.destroy$ = new rt());
                }
                onEnter(e) {
                    return p(this, void 0, void 0, function* () {
                        this.playerRegistry.video$
                            .pipe(
                                Mt(1),
                                Ug(({ player: e }) => zp(e, "wikiaAdStarted").pipe(jt(1))),
                                On(() => e("impact", { allowMulticast: !0 })),
                                gg(this.destroy$)
                            )
                            .subscribe();
                    });
                }
                onDestroy() {
                    return p(this, void 0, void 0, function* () {
                        this.destroy$.next(), this.destroy$.complete();
                    });
                }
            };
            Bg = l([N({ autobind: !1 }), u("design:paramtypes", ["function" == typeof (jg = void 0 !== Pg && Pg) ? jg : Object])], Bg);
            const zg = Symbol("navbar"),
                Gg = Symbol("page"),
                Fg = Symbol("footer");
            var $g, Hg, qg;
            let Wg = class {
                constructor(e, t, i) {
                    (this.params = e), (this.adSlot = t), (this.navbar = i);
                }
                getPageOffsetImpact() {
                    return this.getSlotHeightImpact() + (Y.get("templates.ignoreNavbarHeight") ? 0 : this.navbar.offsetHeight);
                }
                getPageOffsetResolved() {
                    return this.getSlotHeightResolved() + (Y.get("templates.ignoreNavbarHeight") ? 0 : this.navbar.offsetHeight);
                }
                getNavbarOffsetImpactToResolved() {
                    return this.getSlotHeightImpactToResolved();
                }
                getNavbarOffsetResolvedToNone() {
                    const e = this.getNavbarOffsetResolved() - window.scrollY;
                    return e <= 0 ? 0 : e;
                }
                getNavbarOffsetResolved() {
                    return this.getSlotHeightResolved();
                }
                getSlotOffsetResolvedToNone() {
                    return this.getNavbarOffsetResolvedToNone() - this.getSlotHeightResolved();
                }
                getSlotHeightImpactToResolved() {
                    const e = this.getSlotHeightResolved(),
                        t = this.getSlotHeightImpact();
                    return t - (t - e) * this.getProgressImpactToResolved();
                }
                getProgressImpactToResolved() {
                    const e = this.getSlotHeightResolved(),
                        t = this.getSlotHeightImpact(),
                        i = window.scrollY / (t - e);
                    return i >= 1 ? 1 : i;
                }
                getSlotHeightImpact() {
                    var e, t, i;
                    return void 0 === (null === (i = null === (t = null === (e = this.params) || void 0 === e ? void 0 : e.config) || void 0 === t ? void 0 : t.aspectRatio) || void 0 === i ? void 0 : i.default)
                        ? this.adSlot.element.offsetHeight
                        : this.calculateSlotHeight(this.params.config.aspectRatio.default);
                }
                getSlotHeightResolved() {
                    var e, t, i;
                    return void 0 === (null === (i = null === (t = null === (e = this.params) || void 0 === e ? void 0 : e.config) || void 0 === t ? void 0 : t.aspectRatio) || void 0 === i ? void 0 : i.resolved)
                        ? this.adSlot.element.offsetHeight
                        : this.calculateSlotHeight(this.params.config.aspectRatio.resolved);
                }
                calculateSlotHeight(e) {
                    return (1 / e) * this.adSlot.element.offsetWidth;
                }
                getSlotHeightClipping() {
                    const e = window.scrollY;
                    return !e || e <= 0 ? "unset" : e >= this.adSlot.element.offsetHeight ? "rect(0, 0, 0, 0)" : `rect(0 ${this.adSlot.element.offsetWidth}px ${this.adSlot.element.offsetHeight - e}px 0)`;
                }
            };
            var Kg, Yg, Qg, Xg, Jg;
            Wg = l(
                [
                    N({ autobind: !1 }),
                    c(0, O(Th.PARAMS)),
                    c(1, O(Th.SLOT)),
                    c(2, O(zg)),
                    u("design:paramtypes", [
                        "function" == typeof ($g = void 0 !== o.UapParams && o.UapParams) ? $g : Object,
                        "function" == typeof (Hg = void 0 !== kn && kn) ? Hg : Object,
                        "function" == typeof (qg = "undefined" != typeof HTMLElement && HTMLElement) ? qg : Object,
                    ]),
                ],
                Wg
            );
            let Zg = class {
                constructor(e, t, i, n, s) {
                    (this.params = e), (this.adSlot = t), (this.page = i), (this.manipulator = n), (this.reader = s);
                }
                addClassToPage(e) {
                    this.manipulator.element(this.page).addClass(e);
                }
                setPageOffsetImpact() {
                    this.setPageOffset(this.reader.getPageOffsetImpact());
                }
                setPageOffset(e) {
                    this.manipulator.element(this.page).setProperty("marginTop", `${e}px`);
                }
                setSlotOffsetResolvedToNone() {
                    this.setSlotOffset(this.reader.getSlotOffsetResolvedToNone());
                }
                setSlotOffset(e) {
                    this.manipulator.element(this.adSlot.getElement()).setProperty("top", `${e}px`);
                }
                setSlotHeightImpactToResolved() {
                    this.setSlotHeight(`${this.reader.getSlotHeightImpactToResolved()}px`);
                }
                setSlotHeightResolved() {
                    this.setSlotHeight(`${this.reader.getSlotHeightResolved()}px`);
                }
                setSlotHeightImpact() {
                    this.setSlotHeight(`${this.reader.getSlotHeightImpact()}px`);
                }
                setSlotHeight(e) {
                    this.manipulator.element(this.adSlot.getElement()).setProperty("height", e);
                }
                setSlotHeightClipping() {
                    this.manipulator.element(this.adSlot.getElement()).setProperty("clip", this.reader.getSlotHeightClipping());
                }
                setPlaceholderHeightResolved() {
                    this.setPlaceholderHeight(`${this.reader.getSlotHeightResolved()}px`);
                }
                setPlaceholderHeightImpact() {
                    this.setPlaceholderHeight(`${this.reader.getSlotHeightImpact()}px`);
                }
                setPlaceholderHeight(e) {
                    let t = this.adSlot.getElement().parentElement;
                    t.classList.contains("ad-slot-placeholder") && (t = t.parentElement), this.manipulator.element(t).setProperty("height", e), Gt.emit(Bt.AD_ENGINE_UAP_DOM_CHANGED, { element: "placeholder", size: e });
                }
                setResolvedImage() {
                    this.params.image2 && this.params.image2.background
                        ? (this.manipulator.element(this.params.image1.element).addClass("hidden-state"), this.manipulator.element(this.params.image2.element).removeClass("hidden-state"))
                        : this.params.image1 && this.manipulator.element(this.params.image1.element).removeClass("hidden-state");
                }
                setImpactImage() {
                    this.params.image1 && this.manipulator.element(this.params.image1.element).removeClass("hidden-state");
                }
            };
            var em, tm, im;
            Zg = l(
                [
                    N({ autobind: !1 }),
                    c(0, O(Th.PARAMS)),
                    c(1, O(Th.SLOT)),
                    c(2, O(Gg)),
                    u("design:paramtypes", [
                        "function" == typeof (Kg = void 0 !== o.UapParams && o.UapParams) ? Kg : Object,
                        "function" == typeof (Yg = void 0 !== kn && kn) ? Yg : Object,
                        "function" == typeof (Qg = "undefined" != typeof HTMLElement && HTMLElement) ? Qg : Object,
                        "function" == typeof (Xg = void 0 !== Bh && Bh) ? Xg : Object,
                        "function" == typeof (Jg = void 0 !== Wg && Wg) ? Jg : Object,
                    ]),
                ],
                Zg
            );
            let nm = class {
                constructor(e, t, i) {
                    (this.params = e), (this.domListener = t), (this.manager = i), (this.unsubscribe$ = new rt());
                }
                onEnter() {
                    return p(this, void 0, void 0, function* () {
                        Y.get("state.isMobile") && this.params.thumbnail ? this.setImpactSizeOnScroll() : this.manager.setImpactImage(),
                            this.domListener.resize$
                                .pipe(
                                    ic({}),
                                    On(() => {
                                        this.manager.setSlotHeightImpact(), this.manager.setPlaceholderHeightImpact();
                                    }),
                                    gg(this.unsubscribe$)
                                )
                                .subscribe();
                    });
                }
                onLeave() {
                    return p(this, void 0, void 0, function* () {
                        this.unsubscribe$.next();
                    });
                }
                setImpactSizeOnScroll() {
                    this.domListener.scroll$
                        .pipe(
                            zl(() => {
                                this.manager.setImpactImage();
                            }),
                            gg(this.unsubscribe$)
                        )
                        .subscribe();
                }
            };
            var sm;
            nm = l(
                [
                    N({ autobind: !1 }),
                    c(0, O(Th.PARAMS)),
                    u("design:paramtypes", [
                        "function" == typeof (em = void 0 !== o.UapParams && o.UapParams) ? em : Object,
                        "function" == typeof (tm = void 0 !== Xp && Xp) ? tm : Object,
                        "function" == typeof (im = void 0 !== Zg && Zg) ? im : Object,
                    ]),
                ],
                nm
            );
            let om = class {
                constructor(e) {
                    this.footer = e;
                }
                useScrollCorrection() {
                    const e = window.scrollY;
                    return () => window.scrollBy(0, e - window.scrollY);
                }
                usePositionCorrection(e = this.footer) {
                    const t = e.getBoundingClientRect().top;
                    return () => window.scrollBy(0, e.getBoundingClientRect().top - t);
                }
            };
            var rm, am, dm;
            om = l([N({ autobind: !1 }), c(0, O(Fg)), u("design:paramtypes", ["function" == typeof (sm = "undefined" != typeof HTMLElement && HTMLElement) ? sm : Object])], om);
            let lm = (rm = class {
                static provide(e) {
                    return { bind: rm, provider: (t) => new rm(t.get(Th.SLOT), t.get(Th.PARAMS), e) };
                }
                constructor(e, t, i) {
                    (this.adSlot = e), (this.fallbackTimeout = i);
                }
                isViewedAndDelayed() {
                    return Lt(oc(!1), Dt(this.adSlot.loaded.then(() => rn(this.fallbackTimeout))).pipe(tt(() => !0)));
                }
            });
            var cm, um, pm, hm, gm;
            lm = rm = l(
                [
                    N({ autobind: !1 }),
                    c(0, O(Th.SLOT)),
                    c(1, O(Th.PARAMS)),
                    u("design:paramtypes", ["function" == typeof (am = void 0 !== kn && kn) ? am : Object, "function" == typeof (dm = void 0 !== o.UapParams && o.UapParams) ? dm : Object, Number]),
                ],
                lm
            );
            let mm = class {
                constructor(e, t, i, n, s) {
                    (this.adSlot = e), (this.domListener = t), (this.scrollCorrector = i), (this.reader = n), (this.timeout = s), (this.unsubscribe$ = new rt());
                }
                onEnter(e) {
                    return p(this, void 0, void 0, function* () {
                        this.domListener.scroll$
                            .pipe(
                                ic({}),
                                Fl(this.timeout.isViewedAndDelayed()),
                                Vt(() => this.reachedResolvedSize()),
                                On(([, t]) => {
                                    const i = this.scrollCorrector.usePositionCorrection();
                                    t ? (this.adSlot.emitEvent(vr.SLOT_STICKY_STATE_SKIPPED), e("transition").then(i)) : e("sticky").then(i);
                                }),
                                gg(this.unsubscribe$)
                            )
                            .subscribe();
                    });
                }
                reachedResolvedSize() {
                    return 1 === this.reader.getProgressImpactToResolved();
                }
                onLeave() {
                    return p(this, void 0, void 0, function* () {
                        this.unsubscribe$.next();
                    });
                }
            };
            var fm, vm;
            mm = l(
                [
                    N({ autobind: !1 }),
                    c(0, O(Th.SLOT)),
                    u("design:paramtypes", [
                        "function" == typeof (cm = void 0 !== kn && kn) ? cm : Object,
                        "function" == typeof (um = void 0 !== Xp && Xp) ? um : Object,
                        "function" == typeof (pm = void 0 !== om && om) ? pm : Object,
                        "function" == typeof (hm = void 0 !== Wg && Wg) ? hm : Object,
                        "function" == typeof (gm = void 0 !== lm && lm) ? gm : Object,
                    ]),
                ],
                mm
            );
            let bm = class {
                constructor(e, t) {
                    (this.domListener = e), (this.manager = t), (this.unsubscribe$ = new rt());
                }
                onEnter() {
                    return p(this, void 0, void 0, function* () {
                        Lt(this.domListener.resize$, this.domListener.scroll$)
                            .pipe(
                                ic({}),
                                On(() => this.manager.setSlotHeightClipping()),
                                gg(this.unsubscribe$)
                            )
                            .subscribe();
                    });
                }
                onLeave() {
                    return p(this, void 0, void 0, function* () {
                        this.unsubscribe$.next();
                    });
                }
            };
            function ym(...e) {
                return (function (...e) {
                    return (t) => t.pipe(Ug((t) => Lt(...e).pipe(tt(() => t))));
                })(...e, oc({}));
            }
            var _m, Sm;
            bm = l([N({ autobind: !1 }), u("design:paramtypes", ["function" == typeof (fm = void 0 !== Xp && Xp) ? fm : Object, "function" == typeof (vm = void 0 !== Zg && Zg) ? vm : Object])], bm);
            let Em = class {
                constructor(e, t) {
                    (this.params = e), (this.reader = t);
                }
                getVideoSizeImpact() {
                    return this.calculateVideoSize(this.reader.getSlotHeightImpact(), 0);
                }
                getVideoSizeResolved() {
                    return this.calculateVideoSize(this.reader.getSlotHeightResolved(), 1);
                }
                getVideoSizeImpactToResolved() {
                    return this.calculateVideoSize(this.reader.getSlotHeightImpactToResolved(), this.reader.getProgressImpactToResolved());
                }
                calculateVideoSize(e, t) {
                    if (!this.params.config) return;
                    const { height: i, width: n } = this.getSize(e, t);
                    return {
                        top: this.getPercentage(t, this.params.config.state.top),
                        right: this.getPercentage(t, this.params.config.state.right),
                        bottom: this.getPercentage(t, this.params.config.state.bottom),
                        height: Math.ceil(i),
                        width: Math.ceil(n),
                    };
                }
                getSize(e, t) {
                    if (!this.params.config) return;
                    const i = e * (this.getPercentage(t, this.params.config.state.height) / 100);
                    return { height: i, width: i * (16 / 9) };
                }
                getPercentage(e, t) {
                    if (!t) return;
                    const { default: i, resolved: n } = t;
                    return i - (i - n) * e;
                }
            };
            var wm, Am, Tm;
            Em = l([N({ autobind: !1 }), c(0, O(Th.PARAMS)), u("design:paramtypes", ["function" == typeof (_m = void 0 !== o.UapParams && o.UapParams) ? _m : Object, "function" == typeof (Sm = void 0 !== Wg && Wg) ? Sm : Object])], Em);
            let Im = class {
                constructor(e, t, i) {
                    (this.manipulator = e), (this.reader = t), (this.params = i);
                }
                setVideoSizeResolved(e) {
                    if (!e.isFullscreen()) return this.setVideoSize(e, this.reader.getVideoSizeResolved());
                }
                setVideoSizeImpact(e) {
                    if (!e.isFullscreen()) return this.setVideoSize(e, this.reader.getVideoSizeImpact());
                }
                setVideoSizeImpactToResolved(e) {
                    if (!e.isFullscreen()) return this.setVideoSize(e, this.reader.getVideoSizeImpactToResolved());
                }
                setVideoSize(e, t) {
                    e.resize(t.width, t.height);
                    const i = e.dom.getPlayerContainer().parentElement,
                        n = this.params.thumbnail;
                    this.setProperties(i, t), this.setProperties(n, t);
                }
                setProperties(e, { width: t, height: i, top: n, right: s, bottom: o }) {
                    this.manipulator.element(e).setProperty("width", `${t}px`),
                        this.manipulator.element(e).setProperty("height", `${i}px`),
                        "number" == typeof n && this.manipulator.element(e).setProperty("top", `${n}%`),
                        "number" == typeof s && this.manipulator.element(e).setProperty("right", `${s}%`),
                        "number" == typeof o && this.manipulator.element(e).setProperty("bottom", `${o}%`);
                }
            };
            var Cm, Nm, Om;
            Im = l(
                [
                    N({ autobind: !1 }),
                    c(2, O(Th.PARAMS)),
                    u("design:paramtypes", [
                        "function" == typeof (wm = void 0 !== Bh && Bh) ? wm : Object,
                        "function" == typeof (Am = void 0 !== Em && Em) ? Am : Object,
                        "function" == typeof (Tm = void 0 !== o.UapParams && o.UapParams) ? Tm : Object,
                    ]),
                ],
                Im
            );
            let Pm = class {
                constructor(e, t, i) {
                    (this.playerRegistry = e), (this.domListener = t), (this.manager = i), (this.unsubscribe$ = new rt());
                }
                onEnter() {
                    return p(this, void 0, void 0, function* () {
                        this.playerRegistry.video$
                            .pipe(
                                ym(this.domListener.scroll$, this.domListener.resize$),
                                On(({ player: e }) => this.manager.setVideoSizeImpactToResolved(e)),
                                gg(this.unsubscribe$)
                            )
                            .subscribe();
                    });
                }
                onLeave() {
                    return p(this, void 0, void 0, function* () {
                        this.unsubscribe$.next();
                    });
                }
            };
            var Dm, Lm;
            Pm = l(
                [
                    N({ autobind: !1 }),
                    u("design:paramtypes", ["function" == typeof (Cm = void 0 !== Pg && Pg) ? Cm : Object, "function" == typeof (Nm = void 0 !== Xp && Xp) ? Nm : Object, "function" == typeof (Om = void 0 !== Im && Im) ? Om : Object]),
                ],
                Pm
            );
            let km = class {
                constructor(e, t) {
                    (this.adSlot = e), (this.playerRegistry = t), (this.unsubscribe$ = new rt());
                }
                onEnter(e) {
                    return p(this, void 0, void 0, function* () {
                        this.playerRegistry.video$
                            .pipe(
                                Ug(({ player: e }) => zp(e, "wikiaAdCompleted")),
                                On(() => {
                                    this.adSlot.emitEvent(vr.SLOT_VIDEO_DONE), e("resolved");
                                }),
                                gg(this.unsubscribe$)
                            )
                            .subscribe();
                    });
                }
                onLeave() {
                    return p(this, void 0, void 0, function* () {
                        this.unsubscribe$.next();
                    });
                }
            };
            var Rm, xm;
            km = l([N({ autobind: !1 }), c(0, O(Th.SLOT)), u("design:paramtypes", ["function" == typeof (Dm = void 0 !== kn && kn) ? Dm : Object, "function" == typeof (Lm = void 0 !== Pg && Pg) ? Lm : Object])], km);
            let Um = class {
                constructor(e, t) {
                    (this.domListener = e), (this.manager = t), (this.unsubscribe$ = new rt());
                }
                onEnter() {
                    return p(this, void 0, void 0, function* () {
                        this.manager.setResolvedImage(),
                            this.domListener.resize$
                                .pipe(
                                    ic({}),
                                    On(() => {
                                        this.manager.setSlotHeightResolved(), this.manager.setPlaceholderHeightResolved();
                                    }),
                                    gg(this.unsubscribe$)
                                )
                                .subscribe();
                    });
                }
                onLeave() {
                    return p(this, void 0, void 0, function* () {
                        this.unsubscribe$.next();
                    });
                }
            };
            var Vm, Mm, jm;
            Um = l([N({ autobind: !1 }), u("design:paramtypes", ["function" == typeof (Rm = void 0 !== Xp && Xp) ? Rm : Object, "function" == typeof (xm = void 0 !== Zg && Zg) ? xm : Object])], Um);
            let Bm = class {
                constructor(e, t, i) {
                    (this.adSlot = e), (this.domListener = t), (this.timeout = i), (this.unsubscribe$ = new rt());
                }
                onEnter(e) {
                    return p(this, void 0, void 0, function* () {
                        this.adSlot.emitEvent(vr.SLOT_STICKED_STATE),
                            this.timeout
                                .isViewedAndDelayed()
                                .pipe(
                                    Vt((e) => e),
                                    Ug(() => this.domListener.scroll$.pipe(Mt(1))),
                                    On(() => {
                                        this.adSlot.emitEvent(vr.SLOT_UNSTICKED_STATE), e("transition");
                                    }),
                                    gg(this.unsubscribe$)
                                )
                                .subscribe();
                    });
                }
                onLeave() {
                    return p(this, void 0, void 0, function* () {
                        this.unsubscribe$.next();
                    });
                }
            };
            var zm, Gm;
            Bm = l(
                [
                    N({ autobind: !1 }),
                    c(0, O(Th.SLOT)),
                    u("design:paramtypes", ["function" == typeof (Vm = void 0 !== kn && kn) ? Vm : Object, "function" == typeof (Mm = void 0 !== Xp && Xp) ? Mm : Object, "function" == typeof (jm = void 0 !== lm && lm) ? jm : Object]),
                ],
                Bm
            );
            let Fm = class {
                constructor(e, t) {
                    (this.adSlot = e), (this.manager = t), (this.unsubscribe$ = new rt());
                }
                onEnter() {
                    return p(this, void 0, void 0, function* () {
                        this.manager.addClassToPage("uap-sticked"), this.adSlot.addClass("uap-toc-pusher");
                    });
                }
                onLeave() {
                    return p(this, void 0, void 0, function* () {
                        this.unsubscribe$.next();
                    });
                }
            };
            var $m, Hm;
            Fm = l([N({ autobind: !1 }), c(0, O(Th.SLOT)), u("design:paramtypes", ["function" == typeof (zm = void 0 !== kn && kn) ? zm : Object, "function" == typeof (Gm = void 0 !== Zg && Zg) ? Gm : Object])], Fm);
            let qm = class {
                constructor(e, t) {
                    (this.adSlot = e), (this.domListener = t);
                }
                appendOnViewed(e) {
                    return Dt(this.adSlot.viewed).pipe(
                        ic({}),
                        Mt(1),
                        On(() => this.adSlot.getElement().appendChild(e))
                    );
                }
                appendOnScroll(e) {
                    return this.domListener.scroll$.pipe(
                        ic({}),
                        Vt(() => window.scrollY > 0),
                        Mt(1),
                        On(() => this.adSlot.getElement().appendChild(e))
                    );
                }
            };
            var Wm, Km;
            qm = l([N({ autobind: !1 }), c(0, O(Th.SLOT)), u("design:paramtypes", ["function" == typeof ($m = void 0 !== kn && kn) ? $m : Object, "function" == typeof (Hm = void 0 !== Xp && Xp) ? Hm : Object])], qm);
            let Ym = class {
                constructor(e, t) {
                    (this.adSlot = e), (this.helper = t), (this.unsubscribe$ = new rt());
                }
                onEnter(e) {
                    return p(this, void 0, void 0, function* () {
                        (this.button = new Rh({
                            onClick: () => {
                                this.adSlot.emitEvent(vr.SLOT_FORCE_UNSTICK), e("transition");
                            },
                        }).render()),
                            this.helper.appendOnScroll(this.button).pipe(gg(this.unsubscribe$)).subscribe();
                    });
                }
                onLeave() {
                    return p(this, void 0, void 0, function* () {
                        this.unsubscribe$.next(), this.button.remove();
                    });
                }
            };
            var Qm, Xm, Jm;
            Ym = l([N({ autobind: !1 }), c(0, O(Th.SLOT)), u("design:paramtypes", ["function" == typeof (Wm = void 0 !== kn && kn) ? Wm : Object, "function" == typeof (Km = void 0 !== qm && qm) ? Km : Object])], Ym);
            let Zm = class {
                constructor(e, t, i) {
                    (this.playerRegistry = e), (this.domListener = t), (this.manager = i), (this.unsubscribe$ = new rt());
                }
                onEnter() {
                    return p(this, void 0, void 0, function* () {
                        this.playerRegistry.video$
                            .pipe(
                                ym(this.domListener.resize$),
                                On(({ player: e }) => this.manager.setVideoSizeResolved(e)),
                                gg(this.unsubscribe$)
                            )
                            .subscribe();
                    });
                }
                onLeave() {
                    return p(this, void 0, void 0, function* () {
                        this.unsubscribe$.next();
                    });
                }
            };
            var ef, tf, nf, sf;
            Zm = l(
                [
                    N({ autobind: !1 }),
                    u("design:paramtypes", ["function" == typeof (Qm = void 0 !== Pg && Pg) ? Qm : Object, "function" == typeof (Xm = void 0 !== Xp && Xp) ? Xm : Object, "function" == typeof (Jm = void 0 !== Im && Im) ? Jm : Object]),
                ],
                Zm
            );
            let of = class {
                constructor(e, t, i, n) {
                    (this.adSlot = e), (this.scrollCorrector = t), (this.manipulator = i), (this.reader = n), (this.unsubscribe$ = new rt());
                }
                onEnter(e) {
                    return p(this, void 0, void 0, function* () {
                        this.animate()
                            .pipe(
                                On(() => {
                                    const t = this.scrollCorrector.useScrollCorrection();
                                    this.adSlot.removeClass("uap-toc-pusher"), e("resolved").then(t);
                                }),
                                gg(this.unsubscribe$)
                            )
                            .subscribe();
                    });
                }
                animate() {
                    const e = vr.SLIDE_OUT_TIME;
                    return this.manipulator.element(this.adSlot.getElement()).setProperty("transition", `top ${e}ms ${vr.CSS_TIMING_EASE_IN_CUBIC}`).setProperty("top", `${this.reader.getSlotOffsetResolvedToNone()}px`), Dt(rn(e));
                }
                onLeave() {
                    return p(this, void 0, void 0, function* () {
                        this.unsubscribe$.next();
                    });
                }
            };
            function rf() {
                return [
                    { bind: zg, value: document.querySelector(".fandom-sticky-header") },
                    { bind: Gg, value: document.body },
                    { bind: Fg, value: document.querySelector(".global-footer") },
                ];
            }
            var af;
            of = l(
                [
                    N({ autobind: !1 }),
                    c(0, O(Th.SLOT)),
                    u("design:paramtypes", [
                        "function" == typeof (ef = void 0 !== kn && kn) ? ef : Object,
                        "function" == typeof (tf = void 0 !== om && om) ? tf : Object,
                        "function" == typeof (nf = void 0 !== Bh && Bh) ? nf : Object,
                        "function" == typeof (sf = void 0 !== Wg && Wg) ? sf : Object,
                    ]),
                ],
                of
            );
            let df = class {
                constructor(e) {
                    (this.params = e), (this.enabledSlots = ["top_boxad", "incontent_boxad_1", "bottom_leaderboard", "gallery_leaderboard", "fandom_dt_galleries"]);
                }
                onEnter() {
                    return p(this, void 0, void 0, function* () {
                        this.configureFloorAdhesionExperiment(),
                            this.params.newTakeoverConfig && Gt.emit(Bt.AD_ENGINE_UAP_NTC_LOADED),
                            vr.init(
                                this.params,
                                this.enabledSlots,
                                Object.keys(Y.get("slots") || []).filter((e) => !this.enabledSlots.includes(e))
                            ),
                            Y.set("slots.bottom_leaderboard.viewportConflicts", []),
                            Or.setSlotSize("bottom_leaderboard", vr.UAP_ADDITIONAL_SIZES.bfaSize.desktop),
                            Or.addSlotSize("bottom_leaderboard", vr.UAP_ADDITIONAL_SIZES.bfaSize.unified);
                    });
                }
                configureFloorAdhesionExperiment() {
                    Y.get("options.ntc.floorEnabled") && ((this.enabledSlots = ["top_boxad", "incontent_boxad_1", "bottom_leaderboard", "floor_adhesion"]), document.body.classList.add("floor-adhesion-experiment"));
                }
            };
            var lf, cf, uf;
            df = l([N({ autobind: !1 }), c(0, O(Th.PARAMS)), u("design:paramtypes", ["function" == typeof (af = void 0 !== o.UapParams && o.UapParams) ? af : Object])], df);
            let pf = (lf = class {
                constructor(e, t) {
                    (this.adSlot = e), (this.params = t), (this.logger = (...e) => yi(lf.LOG_GROUP, ...e));
                }
                onEnter(e) {
                    return p(this, void 0, void 0, function* () {
                        this.logger("onEnter", this.params),
                            this.adSlot.setConfigProperty("showManually", !0),
                            this.adSlot.addClass("expanded-slot"),
                            this.adSlot.addClass("bfab-template"),
                            this.adSlot.getAdContainer().classList.add("iframe-container"),
                            this.ensureImage(),
                            yield Ki.onReady(this.adSlot),
                            yield this.awaitVisibleDOM(),
                            Ar(this.params) ? e("resolved") : (Tr(), e("impact"));
                    });
                }
                ensureImage() {
                    this.logger("ensureImage", this.params.image1, this.params.image2), (this.params.image2 && this.params.image2.background) || this.params.image1.element.classList.remove("hidden-state");
                }
                awaitVisibleDOM() {
                    return p(this, void 0, void 0, function* () {
                        document.hidden && (yield dn(window, "visibilitychange"));
                    });
                }
                onLeave() {
                    return p(this, void 0, void 0, function* () {
                        this.adSlot.show();
                    });
                }
            });
            var hf, gf;
            (pf.LOG_GROUP = "BfabBootstrapHandler"),
                (pf = lf = l(
                    [
                        N({ autobind: !1 }),
                        c(0, O(Th.SLOT)),
                        c(1, O(Th.PARAMS)),
                        u("design:paramtypes", ["function" == typeof (cf = void 0 !== kn && kn) ? cf : Object, "function" == typeof (uf = void 0 !== o.UapParams && o.UapParams) ? uf : Object]),
                    ],
                    pf
                ));
            let mf = class {
                constructor(e, t) {
                    (this.domListener = e), (this.manager = t), (this.unsubscribe$ = new rt());
                }
                onEnter() {
                    return p(this, void 0, void 0, function* () {
                        this.manager.setImpactImage(),
                            this.domListener.resize$
                                .pipe(
                                    ic({}),
                                    On(() => an(() => this.manager.setSlotHeightImpact())),
                                    gg(this.unsubscribe$)
                                )
                                .subscribe();
                    });
                }
                onLeave() {
                    return p(this, void 0, void 0, function* () {
                        this.unsubscribe$.next();
                    });
                }
            };
            var ff, vf, bf;
            mf = l([N({ autobind: !1 }), u("design:paramtypes", ["function" == typeof (hf = void 0 !== Xp && Xp) ? hf : Object, "function" == typeof (gf = void 0 !== Zg && Zg) ? gf : Object])], mf);
            let yf = class {
                constructor(e, t, i) {
                    (this.playerRegistry = e), (this.domListener = t), (this.manager = i), (this.unsubscribe$ = new rt());
                }
                onEnter() {
                    return p(this, void 0, void 0, function* () {
                        this.playerRegistry.video$
                            .pipe(
                                ym(this.domListener.resize$),
                                On(({ player: e }) => an(() => this.manager.setVideoSizeImpact(e))),
                                gg(this.unsubscribe$)
                            )
                            .subscribe();
                    });
                }
                onLeave() {
                    return p(this, void 0, void 0, function* () {
                        this.unsubscribe$.next();
                    });
                }
            };
            var _f, Sf;
            yf = l(
                [
                    N({ autobind: !1 }),
                    u("design:paramtypes", ["function" == typeof (ff = void 0 !== Pg && Pg) ? ff : Object, "function" == typeof (vf = void 0 !== Xp && Xp) ? vf : Object, "function" == typeof (bf = void 0 !== Im && Im) ? bf : Object]),
                ],
                yf
            );
            let Ef = class {
                constructor(e, t) {
                    (this.domListener = e), (this.manager = t), (this.unsubscribe$ = new rt());
                }
                onEnter() {
                    return p(this, void 0, void 0, function* () {
                        this.manager.setResolvedImage(),
                            this.domListener.resize$
                                .pipe(
                                    ic({}),
                                    On(() => {
                                        this.manager.setSlotHeightResolved();
                                    }),
                                    gg(this.unsubscribe$)
                                )
                                .subscribe();
                    });
                }
                onLeave() {
                    return p(this, void 0, void 0, function* () {
                        this.unsubscribe$.next();
                    });
                }
            };
            Ef = l([N({ autobind: !1 }), u("design:paramtypes", ["function" == typeof (_f = void 0 !== Xp && Xp) ? _f : Object, "function" == typeof (Sf = void 0 !== Zg && Zg) ? Sf : Object])], Ef);
            var wf,
                Af,
                Tf = new Ye(ke);
            function If(e, t, i) {
                void 0 === e && (e = 0), void 0 === i && (i = fg);
                var n = -1;
                return (
                    null != t && (wt(t) ? (i = t) : (n = t)),
                    new Ye(function (t) {
                        var s,
                            o = (s = e) instanceof Date && !isNaN(s) ? +e - i.now() : e;
                        o < 0 && (o = 0);
                        var r = 0;
                        return i.schedule(function () {
                            t.closed || (t.next(r++), 0 <= n ? this.schedule(void 0, n) : t.complete());
                        }, o);
                    })
                );
            }
            let Cf = class {
                constructor(e, t) {
                    (this.adSlot = e), (this.unsubscribe$ = new rt()), (this.additionalHideTime = t.get("icFloorAdhesionDelay")), (this.timeoutHideTime = t.get("icFloorAdhesionTimeout"));
                }
                onEnter(e) {
                    return p(this, void 0, void 0, function* () {
                        Lt(this.getViewabilityStream(), this.getTimeoutStream())
                            .pipe(
                                Mt(1),
                                On(() => e("transition")),
                                gg(this.unsubscribe$)
                            )
                            .subscribe();
                    });
                }
                getViewabilityStream() {
                    return -1 === this.additionalHideTime ? Tf : Dt(this.adSlot.viewed).pipe(_t(() => If(this.additionalHideTime)));
                }
                getTimeoutStream() {
                    return this.timeoutHideTime ? If(this.timeoutHideTime) : Et;
                }
                onLeave() {
                    return p(this, void 0, void 0, function* () {
                        this.unsubscribe$.next();
                    });
                }
            };
            var Nf, Of;
            Cf = l([N({ autobind: !1 }), c(0, O(Th.SLOT)), u("design:paramtypes", ["function" == typeof (wf = void 0 !== kn && kn) ? wf : Object, "function" == typeof (Af = void 0 !== Pi && Pi) ? Af : Object])], Cf);
            let Pf = class {
                constructor(e, t) {
                    (this.adSlot = e), (this.manipulator = t), (this.unsubscribe$ = new rt());
                }
                onEnter(e) {
                    return p(this, void 0, void 0, function* () {
                        this.animate()
                            .pipe(
                                On(() => {
                                    e("hidden");
                                }),
                                gg(this.unsubscribe$)
                            )
                            .subscribe();
                    });
                }
                animate() {
                    const e = this.adSlot.getElement().offsetHeight;
                    return (
                        this.manipulator
                            .element(this.adSlot.getElement())
                            .setProperty("transition", `bottom 600ms ${vr.CSS_TIMING_EASE_IN_CUBIC}, opacity 400ms ${vr.CSS_TIMING_EASE_IN_CUBIC}`)
                            .setProperty("opacity", "0")
                            .setProperty("bottom", `-${e}px`),
                        If(1e3)
                    );
                }
                onLeave() {
                    return p(this, void 0, void 0, function* () {
                        this.unsubscribe$.next();
                    });
                }
            };
            var Df;
            Pf = l([N({ autobind: !1 }), c(0, O(Th.SLOT)), u("design:paramtypes", ["function" == typeof (Nf = void 0 !== kn && kn) ? Nf : Object, "function" == typeof (Of = void 0 !== Bh && Bh) ? Of : Object])], Pf);
            let Lf = class {
                constructor(e) {
                    this.adSlot = e;
                }
                onEnter(e) {
                    return p(this, void 0, void 0, function* () {
                        this.adSlot.setConfigProperty("showManually", !0),
                            this.adSlot.addClass(kn.HIDDEN_AD_CLASS),
                            this.adSlot.addClass("floor-adhesion"),
                            this.adSlot.addClass("out-of-page-template"),
                            this.adSlot.isOutOfPage() && (yield Ki.adjustIframeByContentSize(this.adSlot)),
                            e("display");
                    });
                }
                onLeave() {
                    return p(this, void 0, void 0, function* () {
                        this.adSlot.show();
                    });
                }
            };
            var kf;
            Lf = l([N({ autobind: !1 }), c(0, O(Th.SLOT)), u("design:paramtypes", ["function" == typeof (Df = void 0 !== kn && kn) ? Df : Object])], Lf);
            const Rf = Symbol("Roadblock Config");
            let xf = class {
                static config(e) {
                    return { bind: Rf, value: e };
                }
                constructor(e, t) {
                    (this.params = e), (this.config = t);
                }
                onEnter() {
                    return p(this, void 0, void 0, function* () {
                        (this.params.adProduct = "ruap"),
                            this.params.newTakeoverConfig && (Y.get("state.isMobile") && this.config.enabledSlots.push("floor_adhesion"), Gt.emit(Bt.AD_ENGINE_UAP_NTC_LOADED)),
                            this.params.stickedTlb && Y.set("templates.stickyTlb.forced", !0),
                            vr.init(this.params, this.config.enabledSlots, this.config.disableSlots);
                    });
                }
            };
            var Uf, Vf;
            xf = l([N({ autobind: !1 }), c(0, O(Th.PARAMS)), c(1, O(Rf)), u("design:paramtypes", ["function" == typeof (kf = void 0 !== r.RoadblockParams && r.RoadblockParams) ? kf : Object, Object])], xf);
            let Mf = (Uf = class {
                constructor(e) {
                    this.adSlot = e;
                }
                onEnter(e) {
                    return p(this, void 0, void 0, function* () {
                        (yield this.isUAP())
                            ? this.blockStickyTLB("UAP")
                            : this.isStickyTlbForced() || this.enabledByLine() || this.enabledByOrder()
                            ? $c.isBlocking()
                                ? this.blockStickyTLB("AdBlock")
                                : e("initial")
                            : this.blockStickyTLB(`Line item ID ${this.adSlot.lineItemId}`);
                    });
                }
                blockStickyTLB(e) {
                    this.adSlot.emitEvent(vr.SLOT_STICKINESS_DISABLED), this.logger(`Template 'stickyTlb' could not be applied for ${e}`);
                }
                enabledByLine() {
                    const e = Y.get("templates.stickyTlb.lineItemIds") || [];
                    return this.checkRolloutVariable(this.adSlot.lineItemId, e);
                }
                enabledByOrder() {
                    const e = Y.get("templates.stickyTlb.ordersIds") || [];
                    return this.checkRolloutVariable(this.adSlot.orderId, e);
                }
                checkRolloutVariable(e, t) {
                    return !!(e && t && Array.isArray(t)) && t.some((t) => t.toString() === e.toString());
                }
                isUAP() {
                    return p(this, void 0, void 0, function* () {
                        return new Promise((e) => {
                            Gt.on(Bt.AD_ENGINE_UAP_LOAD_STATUS, (t) => {
                                e(t.isLoaded);
                            });
                        });
                    });
                }
                isStickyTlbForced() {
                    return Y.get("templates.stickyTlb.forced");
                }
                logger(...e) {
                    yi(Uf.LOG_GROUP, ...e);
                }
            });
            var jf;
            (Mf.LOG_GROUP = "sticky-tlb"), (Mf = Uf = l([N({ autobind: !1 }), c(0, O(Th.SLOT)), u("design:paramtypes", ["function" == typeof (Vf = void 0 !== kn && kn) ? Vf : Object])], Mf));
            let Bf = class {
                constructor(e) {
                    this.adSlot = e;
                }
                onEnter(e) {
                    return p(this, void 0, void 0, function* () {
                        yield Ki.onReady(this.adSlot), yield this.awaitVisibleDOM(), e("sticky");
                    });
                }
                awaitVisibleDOM() {
                    return p(this, void 0, void 0, function* () {
                        document.hidden && (yield dn(window, "visibilitychange"));
                    });
                }
            };
            var zf;
            Bf = l([N({ autobind: !1 }), c(0, O(Th.SLOT)), u("design:paramtypes", ["function" == typeof (jf = void 0 !== kn && kn) ? jf : Object])], Bf);
            let Gf = class {
                constructor(e) {
                    this.adSlot = e;
                }
                onEnter() {
                    return p(this, void 0, void 0, function* () {
                        this.adSlot.setConfigProperty("showManually", !0),
                            this.adSlot.addClass("expanded-slot"),
                            this.adSlot.addClass("sticky-tlb"),
                            this.adSlot.setConfigProperty("useGptOnloadEvent", !0),
                            this.adSlot.loaded.then(() => {
                                this.adSlot.emitEvent(vr.SLOT_STICKY_READY_STATE);
                            });
                    });
                }
                onLeave() {
                    return p(this, void 0, void 0, function* () {
                        this.adSlot.show(), document.body.classList.add("has-uap"), document.body.classList.add("has-sticky-tlb");
                    });
                }
                onDestroy() {
                    return p(this, void 0, void 0, function* () {
                        document.body.classList.remove("has-uap"), document.body.classList.remove("has-sticky-tlb");
                    });
                }
            };
            var Ff, $f;
            Gf = l([N({ autobind: !1 }), c(0, O(Th.SLOT)), u("design:paramtypes", ["function" == typeof (zf = void 0 !== kn && kn) ? zf : Object])], Gf);
            let Hf = class {
                constructor(e, t) {
                    (this.adSlot = e), (this.helper = t), (this.unsubscribe$ = new rt());
                }
                onEnter(e) {
                    return p(this, void 0, void 0, function* () {
                        (this.button = new Rh({
                            onClick: () => {
                                this.adSlot.emitEvent(vr.SLOT_FORCE_UNSTICK), e("hidden");
                            },
                        }).render()),
                            this.helper.appendOnScroll(this.button).pipe(gg(this.unsubscribe$)).subscribe();
                    });
                }
                onLeave() {
                    return p(this, void 0, void 0, function* () {
                        this.unsubscribe$.next(), this.button.remove();
                    });
                }
            };
            var qf, Wf;
            Hf = l([N({ autobind: !1 }), c(0, O(Th.SLOT)), u("design:paramtypes", ["function" == typeof (Ff = void 0 !== kn && kn) ? Ff : Object, "function" == typeof ($f = void 0 !== qm && qm) ? $f : Object])], Hf);
            let Kf = class {
                constructor(e, t) {
                    (this.registry = e), (this.stickedBoxadHelper = t), Pn.setInitializer(this.registry);
                }
                execute() {
                    const e = this.registry.register(
                            "bfaa",
                            { initial: [df, rg, xg, Mg, Bg, Ch, Vh], impact: [nm, mm, bm, Pm, km, Gh], sticky: [Um, Bm, Fm, Ym, Zm, Gh], transition: [Um, Fm, of, Zm, Gh], resolved: [Um, bm, Zm, Gh] },
                            "initial",
                            [om, Pg, Bh, Zg, Wg, Em, Im, qm, lm.provide(vr.BFAA_UNSTICK_DELAY), rf()]
                        ),
                        t = this.registry.register("bfab", { initial: [pf, xg, Ch, Vh], impact: [mf, yf, km, Gh], resolved: [Ef, Zm, Gh] }, "initial", [Pg, Bh, Zg, Wg, Em, Im, rf()]),
                        i = (function (e) {
                            return e.register("stickyTlb", { blocking: [Mf], initial: [Bf, Gf, Ch, Vh], sticky: [Um, Bm, Hf, Gh, Fm], transition: [Um, of, Gh, Fm], resolved: [Um, bm, Gh], hidden: [Yh, Gh] }, "blocking", [
                                Bh,
                                Zg,
                                Wg,
                                om,
                                qm,
                                lm.provide(vr.TLB_UNSTICK_DELAY),
                                rf(),
                            ]);
                        })(this.registry),
                        n = (function (e) {
                            return e.register("roadblock", { initial: [xf] }, "initial", [xf.config({ enabledSlots: ["top_boxad"], disableSlots: ["floor_adhesion"] })]);
                        })(this.registry),
                        s = (function (e) {
                            return e.register("floorAdhesion", { initial: [Lf, Vh], display: [Cf, Uh, Gh], transition: [Pf, Gh], hidden: [Yh, Gh] }, "initial", [Bh]);
                        })(this.registry),
                        o = (function (e) {
                            return e.register("interstitial", { initial: [$h, Ch, Vh], display: [Uh, qh, Gh], hidden: [Yh, Gh] }, "initial", [Bh]);
                        })(this.registry);
                    Lt(e, t, i, n, s, o).subscribe((e) => {
                        yi(`TemplateLogger - ${e.templateName}\n`, `StateName: ${e.stateName}, Type: ${e.type}`);
                    }),
                        this.stickedBoxadHelper.initialize({ slotName: "top_boxad", pusherSlotName: "top_leaderboard", pageSelector: ".page", railSelector: ".main-page-tag-rcs #top_boxad, #rail-boxad-wrapper" });
                }
            };
            var Yf, Qf;
            Kf = l([N(), u("design:paramtypes", ["function" == typeof (qf = void 0 !== ng && ng) ? qf : Object, "function" == typeof (Wf = void 0 !== Qh && Qh) ? Wf : Object])], Kf);
            let Xf = class {
                constructor(e, t) {
                    (this.pipeline = e), (this.noAdsDetector = t);
                }
                execute() {
                    var e;
                    window.ads.adEngineVersion && window.console.warn("Multiple <?= PACKAGE(name) ?> initializations. This may cause issues."),
                        (window.ads.adEngineVersion = "v146.8.12"),
                        yi("ad-engine", window.ads.adEngineVersion),
                        Y.extend(Dl),
                        this.pipeline.add(
                            Q,
                            () =>
                                p(this, void 0, void 0, function* () {
                                    return yield (function () {
                                        return p(this, void 0, void 0, function* () {
                                            const e = new B(),
                                                t = e.getItem("Geo");
                                            if (!t)
                                                try {
                                                    return new Promise((e, t) => {
                                                        try {
                                                            const i = new XMLHttpRequest();
                                                            i.open("GET", "https://services.fandom.com/geoip/location", !0),
                                                                i.setRequestHeader("Content-type", "application/json"),
                                                                (i.timeout = 2e3),
                                                                (i.withCredentials = !0),
                                                                (i.onload = () => {
                                                                    if (i.status < 200 || i.status >= 300) t();
                                                                    else {
                                                                        const t = JSON.parse(i.responseText);
                                                                        e({ continent: t.continent_code, country: t.country_code, region: t.region, city: t.city, country_name: t.country_name });
                                                                    }
                                                                }),
                                                                (i.onerror = () => {
                                                                    t();
                                                                }),
                                                                i.send();
                                                        } catch (e) {
                                                            t();
                                                        }
                                                    }).then((t) => {
                                                        e.setItem("Geo", encodeURIComponent(JSON.stringify(t))), X(t);
                                                    });
                                                } catch (e) {}
                                            try {
                                                X(JSON.parse(decodeURIComponent(t)) || {});
                                            } catch (e) {
                                                throw new Error("Invalid JSON in the cookie");
                                            }
                                        });
                                    })();
                                }),
                            (function (...e) {
                                return { process: Tl, payload: e };
                            })(
                                (function (...e) {
                                    return { process: Cl, payload: e };
                                })(ki, so),
                                ro
                            ),
                            uo,
                            fo,
                            Ep,
                            Ip,
                            Nl,
                            Lo,
                            $o,
                            Tp,
                            bp,
                            Eh,
                            vh,
                            Kf,
                            Br,
                            Gr,
                            qa,
                            Ka,
                            { process: Pl, payload: { condition: () => this.noAdsDetector.isAdsMode(), yesStep: (e = { yes: vp, no: bd }).yes, noStep: e.no } },
                            el,
                            () => Gt.emit(Bt.AD_ENGINE_CONFIGURED),
                            yl
                        ),
                        this.pipeline.execute();
                }
            };
            (Xf = l([N(), u("design:paramtypes", ["function" == typeof (Yf = void 0 !== wl && wl) ? Yf : Object, "function" == typeof (Qf = void 0 !== ld && ld) ? Qf : Object])], Xf)),
                (window.RLQ = window.RLQ || []),
                window.RLQ.push(() =>
                    p(void 0, void 0, void 0, function* () {
                        new x().get(Xf).execute();
                    })
                );
        })();
})();
//# sourceMappingURL=main.bundle.js.map

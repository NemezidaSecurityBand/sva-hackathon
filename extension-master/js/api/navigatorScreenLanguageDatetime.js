// (function() {
//     'use strict';

var scriptCode = '(' + function (navigatorScreenLanguageDatetime) {

    console.log("[INFO] Injected Navigator&Screen&Language&Datetime API ...");

//navigator
    let userUgent = "Fucked user agent";
    let platform = "iPhone";
    let productSub = "20030107";
    let hardwareConcurrency = 2;
    let oscpu = "undef";
    let vendor = "Apple Computer, Inc";
    let vendorSub = "";
    let appVersion = "";
    let buildID = "undef";
//screen
    let innerWidth = 2560;
    let innerHeight = 1600;
    let outerWidth = 2560;
    let outerHeight = 1600;
    let availWidth = 2560;
    let availHeight = 1600;
    let top = 0;
    let left = 0;
    let availTop = 0;
    let availLeft = 0;
    let width = 2560;
    let height = 1600;
    let colorDepth = 24;
    let pixelDepth = 24;
    let clientWidth = 2560;
    let clientHeight = 1600;
//language
    let language = "ka";
    let languages = ["ka", "ka-GE", "en"];
//datetime
    let gmtNumber = "+12";
    let gmtRegion = "Pacific/Kwajalein";
//navigatorNetwork
    let downlinkConst = 1.7;
    let effectiveTypeConst = "3g";
    let onchangeConnectConst = null;
    let rttConst = 100;
    let saveDataConst = true;
//rects
    let rectConst = 1337
    let rectMod = 0.00000001


    const availablePlugins = {
        "Chrome PDF Plugin": {
            0: {
                description: "Portable Document Format",
                enabledPlugin: {},
                sufixes: "pdf",
                type: 'application/x-google-chrome-pdf',
            },
            description: "Portable Document Format",
            filename: "internal-pdf-viewer",
            lenght: 1,
            name: "Chrome PDF Plugin",
        }
    };


    let plugins = [
        availablePlugins["Chrome PDF Plugin"]
    ];


//strangeSeting
    let windowName = "_0.hi874421qug";

    var properties = {
        "nav": [
            {"obj": "window.navigator", "prop": "userAgent", "value": userUgent},
            {"obj": "window.navigator", "prop": "platform", "value": platform},
            {"obj": "window.navigator", "prop": "productSub", "value": productSub},
            {"obj": "window.navigator", "prop": "hardwareConcurrency", "value": hardwareConcurrency},
            {"obj": "window.navigator", "prop": "oscpu", "value": oscpu},
            {"obj": "window.navigator", "prop": "vendor", "value": vendor},
            {"obj": "window.navigator", "prop": "vendorSub", "value": vendorSub},
            {"obj": "window.navigator", "prop": "appVersion"},
            {"obj": "window.navigator", "prop": "buildID", "value": buildID},
            {"obj": "window.navigator", "prop": "plugins", "value": plugins}
        ],
        "screen": [
            {"obj": "window", "prop": "innerWidth", "value": innerWidth},
            {"obj": "window", "prop": "innerHeight", "value": innerHeight},
            {"obj": "window", "prop": "outerWidth", "value": outerWidth},
            {"obj": "window", "prop": "outerHeight", "value": outerHeight},
            {"obj": "window.screen", "prop": "availWidth", "value": availWidth},
            {"obj": "window.screen", "prop": "availHeight", "value": availHeight},
            {"obj": "window.screen", "prop": "top", "value": top},
            {"obj": "window.screen", "prop": "left", "value": left},
            {"obj": "window.screen", "prop": "availTop", "value": availTop},
            {"obj": "window.screen", "prop": "availLeft", "value": availLeft},
            {"obj": "window.screen", "prop": "width", "value": width},
            {"obj": "window.screen", "prop": "height", "value": height},
            {"obj": "window.screen", "prop": "colorDepth", "value": colorDepth},
            {"obj": "window.screen", "prop": "pixelDepth", "value": pixelDepth},
            {"obj": "window.document.documentElement", "prop": "clientWidth", "value": clientWidth},
            {"obj": "window.document.documentElement", "prop": "clientHeight", "value": clientHeight}
        ],
        "lang": [
            {"obj": "window.navigator", "prop": "language", "value": language},
            {"obj": "window.navigator", "prop": "languages", "value": languages}
        ]
    };


    // check if older firefox for time spoof
    var _oldFF = false;
    if (properties.nav) {
        var navUA = properties.nav.find(p => p.prop == "userAgent");
        if (navUA) {
            _oldFF = /60.0/.test(navUA.value);
        }
    } else {
        _oldFF = /60.0/.test(navigator.userAgent);
    }

    //Поехали
    (function (props) {
        let override = ((window, injection) => {


//Дата и Время						
            var spoofedTimezone = 0 - 720;
            var tzAbbr = gmtNumber;
            var tzName = gmtRegion;
            var _originalTZ = new Intl.DateTimeFormat('en-US', {
                timeZoneName: 'long'
            }).format(new Date()).split(', ')[1];

            var tz = new Intl.DateTimeFormat('en', {
                timeZone: tzName, timeZoneName: _oldFF ? 'short' : 'long'
            }).format(new Date()).split(', ')[1];

            const timezoneOffset = new window.Date().getTimezoneOffset();
            const clean = str => {
                const toGMT = offset => {
                    const z = n => (n < 10 ? '0' : '') + n;
                    const sign = offset <= 0 ? '+' : '-';
                    offset = Math.abs(offset);
                    return "GMT" + sign + z(offset / 60 | 0) + z(offset % 60);
                };
                str = str.replace(/(GMT[\+|\-]?\d+)/g, toGMT(spoofedTimezone));
                return str.replace(_originalTZ, tz);
            }

            let _d = window.Date;

            const {
                getDate, getDay, getFullYear, getHours, getMilliseconds, getMinutes, getMonth, getSeconds, getYear,
                toLocaleString, toLocaleDateString, toLocaleTimeString, toDateString, toTimeString
            } = _d.prototype;
            Date = function (...args) {
                let originalDate = new _d(...args);

                if (args.length == 0) {
                    originalDate[windowName] = (timezoneOffset - spoofedTimezone) * 60000;
                    if (this instanceof Date) return originalDate;

                    return originalDate.toString();
                }

                originalDate[windowName] = 0;

                if (this instanceof Date) return originalDate;

                return originalDate.toString();
            };
            Date.prototype = _d.prototype;
            Date.UTC = _d.UTC;
            Date.now = _d.now;
            Date.parse = _d.parse;
            Date.prototype.getDate = function () {
                if (!this[windowName]) return getDate.apply(this);
                var tmp = new _d(this.getTime() + this[windowName]);
                return getDate.apply(tmp);
            }
            Date.prototype.getDay = function () {
                if (!this[windowName]) return getDay.apply(this);
                var tmp = new _d(this.getTime() + this[windowName]);
                return getDay.apply(tmp);
            }
            Date.prototype.getFullYear = function () {
                if (!this[windowName]) return getFullYear.apply(this);
                var tmp = new _d(this.getTime() + this[windowName]);
                return getFullYear.apply(tmp);
            }
            Date.prototype.getHours = function () {
                if (!this[windowName]) return getHours.apply(this);
                var tmp = new _d(this.getTime() + this[windowName]);
                return getHours.apply(tmp);
            }
            Date.prototype.getMilliseconds = function () {
                if (!this[windowName]) return getMilliseconds.apply(this);
                var tmp = new _d(this.getTime() + this[windowName]);
                return getMilliseconds.apply(tmp);
            }
            Date.prototype.getMinutes = function () {
                if (!this[windowName]) return getMinutes.apply(this);
                var tmp = new _d(this.getTime() + this[windowName]);
                return getMinutes.apply(tmp);
            }
            Date.prototype.getMonth = function () {
                if (!this[windowName]) return getMonth.apply(this);
                var tmp = new _d(this.getTime() + this[windowName]);
                return getMonth.apply(tmp);
            }
            Date.prototype.getSeconds = function () {
                if (!this[windowName]) return getSeconds.apply(this);
                var tmp = new _d(this.getTime() + this[windowName]);
                return getSeconds.apply(tmp);
            }
            Date.prototype.getYear = function () {
                if (!this[windowName]) return getYear.apply(this);
                var tmp = new _d(this.getTime() + this[windowName]);
                return getYear.apply(tmp);
            }
            Date.prototype.toString = function () {
                var tmp = new _d(this.getTime() + this[windowName]);
                return clean(toDateString.apply(tmp) + " " + toTimeString.apply(tmp));
            }
            Date.prototype.toLocaleString = function (...args) {
                var tmp = new _d(this.getTime() + this[windowName]);
                return clean(toLocaleString.apply(tmp, args));
            }
            Date.prototype.toLocaleDateString = function (...args) {
                var tmp = new _d(this.getTime() + this[windowName]);
                return clean(toLocaleDateString.apply(tmp, args));
            }
            Date.prototype.toLocaleTimeString = function (...args) {
                var tmp = new _d(this.getTime() + this[windowName]);
                return clean(toLocaleTimeString.apply(tmp, args));
            }
            Date.prototype.toTimeString = function () {
                var tmp = new _d(this.getTime() + this[windowName]);
                return clean(toTimeString.apply(tmp));
            }
            Date.prototype.getTimezoneOffset = function () {
                if (!this[windowName]) return timezoneOffset;
                return spoofedTimezone;
            }
            Date.prototype.getTimezoneOffset = function () {
                if (!this[windowName]) return timezoneOffset;
                return spoofedTimezone;
            }

            document.addEventListener('DOMContentLoaded', function () {
                Element.prototype.appendChild = function (oAppend, topDate) {
                    return function () {
                        var tmp = oAppend.apply(this, arguments);
                        if (arguments[0].nodeName == "IFRAME" && arguments[0].contentWindow != null) {
                            const intlIframe = arguments[0].contentWindow.Intl.DateTimeFormat.prototype.resolvedOptions;
                            arguments[0].contentWindow.Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
                                return Object.assign(intlIframe.apply(this, args), {
                                    timeZone: tzName
                                });
                            };

                            arguments[0].contentWindow.Date = topDate;
                        }

                        return tmp;
                    }
                }(Element.prototype.appendChild, Date);
            });
//конец спуфинга даты и времени


//Client Rects spoofing
            var _getBoundingClientRect = window.Element.prototype.getBoundingClientRect;
            var _rgetBoundingClientRect = window.Range.prototype.getBoundingClientRect;

            if (!window.parent[windowName]) {
                // window[windowName] = Math.random() * 0.00000001;
                window[windowName] = rectConst * rectMod;
            }

            let _fuzzer = (val) => {
                return Number.isInteger(val) ? val : val + (!window.parent[windowName] ? window[windowName] : window.parent[windowName]);
            };

            window.Element.prototype.getBoundingClientRect = function (...args) {
                let c = _getBoundingClientRect.apply(this, args);

                c.x = c.left = _fuzzer(c.x);
                c.y = c.top = _fuzzer(c.y);
                c.width = _fuzzer(c.width);
                c.height = _fuzzer(c.height);
                c.right = c.x + c.width;
                c.bottom = c.y + c.height;

                return c;
            }

            window.Element.prototype.getClientRects = function () {
                return [this.getBoundingClientRect()];
            }

            window.Range.prototype.getBoundingClientRect = function (...args) {
                let r = _rgetBoundingClientRect.apply(this, args);

                r.x = r.left = _fuzzer(r.x);
                r.y = r.top = _fuzzer(r.y);
                r.width = _fuzzer(r.width);
                r.height = _fuzzer(r.height);
                r.right = r.x + r.width;
                r.bottom = r.y + r.height;

                return r;
            }

            window.Range.prototype.getClientRects = function () {
                return [this.getBoundingClientRect()];
            }


            Object.defineProperty(window.Element.prototype.getClientRects, "name", {value: "getClientRects"});
            Object.defineProperty(window.Element.prototype.getBoundingClientRect, "name", {value: "getBoundingClientRect"});

            window.Element.prototype.getClientRects.toString =
                window.Element.prototype.getClientRects.toSource =
                    window.Element.prototype.getClientRects.toLocaleString =
                        window.Range.prototype.getClientRects.toString =
                            window.Range.prototype.getClientRects.toSource =
                                window.Range.prototype.getClientRects.toLocaleString = function () {
                                    return `function getClientRects() {
    [native code]
}`;
                                };

            window.Element.prototype.getBoundingClientRect.toString =
                window.Element.prototype.getBoundingClientRect.toSource =
                    window.Element.prototype.getBoundingClientRect.toLocaleString =
                        window.Range.prototype.getBoundingClientRect.toString =
                            window.Range.prototype.getBoundingClientRect.toSource =
                                window.Range.prototype.getBoundingClientRect.toLocaleString = function () {
                                    return `function getBoundingClientRect() {
    [native code]
}`;
                                };
            //end rects spoofing

            for (var k in injection) {
                injection[k].forEach(i => {
                    if (i.obj == "window") {
                        window[i.prop] = i.value;
                    } else {
                        if (i.value == "undef") {
                            i.value = undefined;
                        }

                        Object.defineProperty(i.obj.split('.').reduce((p, c) => p && p[c] || null, window), i.prop, {
                            configurable: true,
                            value: i.value
                        });
                    }
                });
            }
        });

        // fix window.name issues
        let {name, ...bypassProps} = props;

        // remove options


        // Override window properties
        override(window, props);

        // Prevent leakage through properties of trusted iframes
        let observer = new MutationObserver((mutations) => {
            for (let mutation of mutations) {
                for (let node of mutation.addedNodes) {
                    if (typeof (node.contentWindow) !== "undefined"
                        && node.contentWindow !== null
                        && typeof (node.contentWindow.navigator) !== "undefined") {
                        override(node.contentWindow, props);
                    }
                }
            }
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    })(properties);


} + ')();';

//Инжект кода в document.head
var script = document.createElement('script');
script.textContent = scriptCode;
(document.head || document.documentElement).appendChild(script);
script.remove(); 
this["XHRShaper"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// See https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

var XMLHttpRequest = window.XMLHttpRequest;

var XHRProxy = function () {
    function XHRProxy() {
        _classCallCheck(this, XHRProxy);

        this._xhr = new XMLHttpRequest();
    }

    // methods

    _createClass(XHRProxy, [{
        key: "abort",
        value: function abort() {
            return this._xhr.abort();
        }
    }, {
        key: "open",
        value: function open(method, url, async, user, password) {
            return this._xhr.open(method, url, async, user, password);
        }
    }, {
        key: "send",
        value: function send(data) {
            return this._xhr.send(data);
        }
    }, {
        key: "setRequestHeader",
        value: function setRequestHeader(header, value) {
            return this._xhr.setRequestHeader(header, value);
        }
    }, {
        key: "getResponseHeader",
        value: function getResponseHeader(header) {
            return this._xhr.getResponseHeader(header);
        }
    }, {
        key: "overrideMimeType",
        value: function overrideMimeType(mimeType) {
            return this._xhr.overrideMimeType(mimeType);
        }
    }, {
        key: "getAllResponseHeaders",
        value: function getAllResponseHeaders() {
            return this._xhr.getAllResponseHeaders();
        }
    }, {
        key: "dispatchEvent",
        value: function dispatchEvent(type) {
            return this._xhr.dispatchEvent(type);
        }
    }, {
        key: "addEventListener",
        value: function addEventListener(type, handler) {
            return this._xhr.addEventListener(type, handler);
        }
    }, {
        key: "removeEventListener",
        value: function removeEventListener(type, handler) {
            return this._xhr.removeEventListener(type, handler);
        }

        // Read-only properties

    }, {
        key: "readyState",
        get: function get() {
            return this._xhr.readyState;
        }
    }, {
        key: "response",
        get: function get() {
            return this._xhr.response;
        }
    }, {
        key: "responseText",
        get: function get() {
            return this._xhr.responseText;
        }
    }, {
        key: "responseXML",
        get: function get() {
            return this._xhr.responseXML;
        }
    }, {
        key: "responseURL",
        get: function get() {
            return this._xhr.responseURL;
        }
    }, {
        key: "status",
        get: function get() {
            return this._xhr.status;
        }
    }, {
        key: "statusText",
        get: function get() {
            return this._xhr.statusText;
        }
    }, {
        key: "upload",
        get: function get() {
            return this._xhr.upload;
        }

        // R & W properties

    }, {
        key: "withCredentials",
        set: function set(enabled) {
            this._xhr.withCredentials = enabled;
        },
        get: function get() {
            return this._xhr.withCredentials;
        }
    }, {
        key: "responseType",
        set: function set(responseType) {
            this._xhr.responseType = responseType;
        },
        get: function get() {
            return this._xhr.responseType;
        }
    }, {
        key: "timeout",
        set: function set(timeout) {
            this._xhr.timeout = timeout;
        },
        get: function get() {
            return this._xhr.timeout;
        }
    }, {
        key: "onload",
        set: function set(fn) {
            this._xhr.onload = fn;
        },
        get: function get() {
            return this._xhr.onload;
        }
    }, {
        key: "onloadstart",
        set: function set(fn) {
            this._xhr.onloadstart = fn;
        },
        get: function get() {
            return this._xhr.onloadstart;
        }
    }, {
        key: "onloadend",
        set: function set(fn) {
            this._xhr.onloadend = fn;
        },
        get: function get() {
            return this._xhr.onloadend;
        }
    }, {
        key: "onabort",
        set: function set(fn) {
            this._xhr.onabort = fn;
        },
        get: function get() {
            return this._xhr.onabort;
        }
    }, {
        key: "onerror",
        set: function set(fn) {
            this._xhr.onerror = fn;
        },
        get: function get() {
            return this._xhr.onerror;
        }
    }, {
        key: "onprogress",
        set: function set(fn) {
            this._xhr.onprogress = fn;
        },
        get: function get() {
            return this._xhr.onprogress;
        }
    }, {
        key: "ontimeout",
        set: function set(fn) {
            this._xhr.ontimeout = fn;
        },
        get: function get() {
            return this._xhr.ontimeout;
        }
    }, {
        key: "onreadystatechange",
        set: function set(fn) {
            this._xhr.onreadystatechange = fn;
        },
        get: function get() {
            return this._xhr.onreadystatechange;
        }
    }]);

    return XHRProxy;
}();

exports.default = XHRProxy;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xhr = __webpack_require__(0);

var _xhr2 = _interopRequireDefault(_xhr);

var _shaper = __webpack_require__(4);

var _shaper2 = _interopRequireDefault(_shaper);

var _initThrottledXhr = __webpack_require__(3);

var _initThrottledXhr2 = _interopRequireDefault(_initThrottledXhr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ThrottledXHR = function (_XHRProxy) {
    _inherits(ThrottledXHR, _XHRProxy);

    _createClass(ThrottledXHR, null, [{
        key: 'Shaper',
        get: function get() {
            return _shaper2.default;
        }
    }]);

    function ThrottledXHR() {
        _classCallCheck(this, ThrottledXHR);

        var _this = _possibleConstructorReturn(this, (ThrottledXHR.__proto__ || Object.getPrototypeOf(ThrottledXHR)).call(this));

        _this._shaper = new _shaper2.default();

        (0, _initThrottledXhr2.default)(_this._xhr, _this);
        return _this;
    }

    _createClass(ThrottledXHR, [{
        key: 'addEventListener',
        value: function addEventListener() {
            throw new Error('EventTarget API not implemented');
        }
    }, {
        key: 'removeEventListener',
        value: function removeEventListener() {
            throw new Error('EventTarget API not implemented');
        }
    }, {
        key: 'dispatchEvent',
        value: function dispatchEvent() {
            throw new Error('EventTarget API not implemented');
        }
    }, {
        key: 'shaper',
        get: function get() {
            return this._shaper;
        }
    }, {
        key: 'onloadend',
        set: function set(fn) {
            this._onloadend = fn;
        },
        get: function get() {
            return this._onloadend;
        }
    }, {
        key: 'onload',
        set: function set(fn) {
            this._onload = fn;
        },
        get: function get() {
            return this._onload;
        }
    }, {
        key: 'onreadystatechange',
        set: function set(fn) {
            this._onreadystatechange = fn;
        },
        get: function get() {
            return this._onreadystatechange;
        }
    }, {
        key: 'onprogress',
        set: function set(fn) {
            this._onprogress = fn;
        },
        get: function get() {
            return this._onprogress;
        }
    }]);

    return ThrottledXHR;
}(_xhr2.default);

exports.default = ThrottledXHR;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _xhr = __webpack_require__(0);

var _xhr2 = _interopRequireDefault(_xhr);

var _throttledXhr = __webpack_require__(1);

var _throttledXhr2 = _interopRequireDefault(_throttledXhr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useGlobal() {
    // Shim window/global XHR
    var global = window || global;
    // Overload native window constructor
    global.XMLHttpRequest = _throttledXhr2.default;
}

module.exports = {
    XHRProxy: _xhr2.default,
    useGlobal: useGlobal
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function initThrottledXhr(xhr, xhrProxy) {
    var shaper = xhrProxy.shaper,
        _onload = xhrProxy._onload,
        _onloadend = xhrProxy._onloadend,
        _onreadystatechange = xhrProxy._onreadystatechange,
        _onprogress = xhrProxy._onprogress;


    var openedTs = void 0,
        headersTs = void 0,
        loadingTs = void 0,
        doneTs = void 0;
    var loaded = 0,
        total = void 0;
    var currentBitrateKpbs = void 0;
    var progressEvents = [];
    var progressTimer = void 0;
    var lastProgressEvent = false;
    var loadEndEvent = void 0;
    var loadEvent = void 0;
    var done = false;

    xhr.onloadend = function (event) {
        var shaper = xhrProxy.shaper,
            _onload = xhrProxy._onload,
            _onloadend = xhrProxy._onloadend,
            _onreadystatechange = xhrProxy._onreadystatechange,
            _onprogress = xhrProxy._onprogress;

        //console.log('native loadend');

        loadEndEvent = event;
        if (done && _onloadend) {
            _onloadend(event);
        }
    };

    xhr.onload = function (event) {
        var shaper = xhrProxy.shaper,
            _onload = xhrProxy._onload,
            _onloadend = xhrProxy._onloadend,
            _onreadystatechange = xhrProxy._onreadystatechange,
            _onprogress = xhrProxy._onprogress;

        //console.log('native load');

        loadEvent = event;
        if (done && _onload && xhr.readyState === 4) {
            _onload(event);
        }
    };

    xhr.onreadystatechange = function (event) {
        var shaper = xhrProxy.shaper,
            _onload = xhrProxy._onload,
            _onloadend = xhrProxy._onloadend,
            _onreadystatechange = xhrProxy._onreadystatechange,
            _onprogress = xhrProxy._onprogress;


        function triggerStateChange(e) {
            if (_onreadystatechange) {
                _onreadystatechange(e);
            }
        }

        switch (xhr.readyState) {
            case 0:
                // UNSENT
                triggerStateChange(event);
                break;
            case 1:
                // OPENED
                openedTs = Date.now();
                triggerStateChange(event);
                break;
            case 2:
                // HEADERS_RECEIVE
                headersTs = Date.now();
                triggerStateChange(event);
                break;
            case 3:
                // LOADING
                loadingTs = Date.now();
                triggerStateChange(event);
                break;
            case 4:
                // DONE
                var delay1 = 0,
                    delay2 = 0;
                doneTs = Date.now();
                var latency = doneTs - openedTs;
                if (latency < shaper.minLatency) {
                    delay1 = shaper.minLatency - latency;
                }
                if (currentBitrateKpbs > shaper.maxBandwidth) {
                    delay2 = currentBitrateKpbs / shaper.maxBandwidth * latency - latency;
                }
                if (delay1 || delay2) {
                    setTimeout(function () {

                        if (loaded === total && !lastProgressEvent) {
                            clearTimeout(progressTimer);
                            _onprogress(progressEvents[progressEvents.length - 1]);
                        }

                        triggerStateChange(event);

                        done = true;

                        if (loadEvent && _onload) {
                            _onload(loadEvent);
                            loadEvent = null;
                        }

                        if (loadEndEvent && _onloadend) {
                            _onloadend(loadEndEvent);
                            loadEndEvent = null;
                        }
                    }, Math.max(delay1, delay2));
                } else {
                    //console.log('done, not delaying');
                    done = true;
                    triggerStateChange(event);
                }
                break;
        }
    };

    xhr.onprogress = function (event) {
        var shaper = xhrProxy.shaper,
            _onload = xhrProxy._onload,
            _onloadend = xhrProxy._onloadend,
            _onreadystatechange = xhrProxy._onreadystatechange,
            _onprogress = xhrProxy._onprogress;


        function triggerProgress(e) {

            if (loaded === total) {
                lastProgressEvent = true;
            }

            if (_onprogress) {
                _onprogress(e);
            }
        }

        var now = Date.now();
        var duration = now - openedTs;
        var delay = void 0;

        loaded = event.loaded;
        total = event.total;
        currentBitrateKpbs = 8 * loaded / duration; // kbps

        // console.log('current bitrate: ' + Math.round(currentBitrateKpbs) + ' kbps');

        if (currentBitrateKpbs > shaper.maxBandwidth) {
            delay = currentBitrateKpbs / shaper.maxBandwidth * duration - duration;
            progressEvents.push(event);
            // console.log('delaying progress event by ' + Math.round(delay) + ' ms');
            progressTimer = setTimeout(function () {
                triggerProgress(event);
            }, delay);
            return;
        }

        triggerProgress(event);
    };

    var id = Math.round(Math.random() * 1e6);

    xhr.__throttledId = id;
    xhrProxy.__throttledId = id;
}

exports.default = initThrottledXhr;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Shaper = function Shaper() {
    var _maxBandwidth = Infinity;
    var _minLatency = 0;
    var _minProgressEvents = 0;
    var _randomness = 0;

    Object.defineProperty(this, "maxBandwidth", {
        get: function get() {
            return Math.min(_maxBandwidth, Shaper.maxBandwidth);
        },
        set: function set(val) {
            _maxBandwidth = val;
        }
    });
    Object.defineProperty(this, "minLatency", {
        get: function get() {
            return Math.max(_minLatency, Shaper.minLatency);
        },
        set: function set(val) {
            _minLatency = val;
        }
    });
    Object.defineProperty(this, "minProgressEvents", {
        get: function get() {
            return Math.max(_minProgressEvents, Shaper.minProgressEvents);
        },
        set: function set(val) {
            _minProgressEvents = val;
        }
    });
    Object.defineProperty(this, "randomness", {
        get: function get() {
            return Math.max(_randomness, Shaper.randomness);
        },
        set: function set(val) {
            _randomness = val;
        }
    });
};

Shaper.maxBandwidth = Infinity;
Shaper.minLatency = 0;
Shaper.minProgressEvents = 0;
Shaper.randomness = 0;

module.exports = Shaper;

/***/ })
/******/ ]);
//# sourceMappingURL=XHRShaper.this.js.map
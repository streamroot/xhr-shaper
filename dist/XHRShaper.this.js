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
        key: "addEventListener",
        value: function addEventListener(type, listener, optionsOrUseCapture, wantsUntrusted) {
            return this._xhr.addEventListener(type, listener, optionsOrUseCapture, wantsUntrusted);
        }
    }, {
        key: "removeEventListener",
        value: function removeEventListener(type, listener, optionsOrUseCapture) {
            return this._xhr.removeEventListener(type, listener, optionsOrUseCapture);
        }
    }, {
        key: "dispatchEvent",
        value: function dispatchEvent(event) {
            return this._xhr.dispatchEvent(event);
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

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xhrProxy = __webpack_require__(0);

var _xhrProxy2 = _interopRequireDefault(_xhrProxy);

var _shaper = __webpack_require__(6);

var _shaper2 = _interopRequireDefault(_shaper);

var _setupThrottledXhr = __webpack_require__(5);

var _setupThrottledXhr2 = _interopRequireDefault(_setupThrottledXhr);

var _setupCachedXhr = __webpack_require__(4);

var _setupCachedXhr2 = _interopRequireDefault(_setupCachedXhr);

var _cache = __webpack_require__(3);

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEBUG = false;

var PASSTHROUGH_EVENTS = ['loadstart', 'timeout', 'abort', 'error'];

var createListenerWrapper = function createListenerWrapper(type, listener, dispatchedEventsList) {
    return function (event) {
        dispatchedEventsList.push({ type: type, listener: listener, event: event, propagated: false });
    };
};

var XHR = function (_XHRProxy) {
    _inherits(XHR, _XHRProxy);

    _createClass(XHR, null, [{
        key: 'Shaper',
        get: function get() {
            return _shaper2.default;
        }
    }, {
        key: 'cache',
        get: function get() {
            return _cache2.default;
        }
    }]);

    function XHR() {
        _classCallCheck(this, XHR);

        var _this = _possibleConstructorReturn(this, (XHR.__proto__ || Object.getPrototypeOf(XHR)).call(this));

        _this._cacheInstance = _cache2.default.instance;
        _this._shaper = new _shaper2.default();
        _this._listenersMap = new Map();
        _this._dispatchedEventsList = [];
        _this._response = null;
        _this._responseText = null;
        _this._responseXML = null;
        _this._headers = null;
        _this._readyState = 0;
        _this._caching = false;
        _this._cacheHit = false;
        _this._cacheWrite = true;
        _this._onSend = null;

        _this.addEventListener('loadend', function () {
            if (_this._caching && _this._cacheWrite) {
                DEBUG && console.log('CACHE WRITE:', _this._xhr.responseURL);
                _this._cacheInstance.put(_this._xhr.responseURL, _this._response, _this._responseText, _this._responseXML, null, _this._xhr.getAllResponseHeaders());
            }
        });

        (0, _setupThrottledXhr2.default)(_this._xhr, _this);
        return _this;
    }

    _createClass(XHR, [{
        key: '_dispatchWrappedEventType',
        value: function _dispatchWrappedEventType(type) {
            var _this2 = this;

            // it needs to run on the next tick since this is actually
            // triggered from our throttler listeners on the proxy's inner XHR 
            setTimeout(function () {
                _this2._dispatchedEventsList.filter(function (dispatchedEvent) {
                    return dispatchedEvent.type === type && !dispatchedEvent.propagated;
                }).forEach(function (dispatchedEvent) {
                    dispatchedEvent.propagated = true;
                    dispatchedEvent.listener(dispatchedEvent.event);
                });
            }, 0);
        }
    }, {
        key: '_handleCacheHitOnSend',
        value: function _handleCacheHitOnSend(cachedResource) {
            var _this3 = this;

            this._readyState = 1;
            this._cacheHit = true;

            var onSend = function onSend() {
                setTimeout(function () {
                    _this3._readyState = 2;
                    _this3.onreadystatechange && _this3.onreadystatechange();
                    _this3._dispatchWrappedEventType('readystatechange');
                    _this3._readyState = 3;
                    _this3.onreadystatechange && _this3.onreadystatechange();
                    _this3._dispatchWrappedEventType('readystatechange');
                    _this3.onloadstart && _this3.onloadstart();
                    _this3._dispatchWrappedEventType('loadstart');
                    _this3._response = cachedResource.data;
                    _this3._responseText = cachedResource.dataText;
                    _this3._responseXML = cachedResource.dataXML;
                    _this3._headersAll = cachedResource.headers;
                    _this3._readyState = 4;
                    _this3.onreadystatechange && _this3.onreadystatechange();
                    _this3._dispatchWrappedEventType('readystatechange');
                    _this3.onreadystatechange && _this3.onreadystatechange();
                    _this3._dispatchWrappedEventType('readystatechange');
                    _this3.onload && _this3.onload();
                    _this3._dispatchWrappedEventType('load');
                    _this3.onloadend && _this3.onloadend();
                    _this3._dispatchWrappedEventType('loadend');
                }, 0);
            };
            this._onSend = onSend;
        }
    }, {
        key: '_setupWrappedResponseData',
        value: function _setupWrappedResponseData() {
            try {
                this._response = this._xhr.response;
            } catch (e) {
                DEBUG && console.warn(e);
            }
            try {
                this._responseText = this._xhr.responseText;
            } catch (e) {
                DEBUG && console.warn(e);
            }
            try {
                this._responseXML = this._xhr.responseXML;
            } catch (e) {
                DEBUG && console.warn(e);
            }
        }
    }, {
        key: '_setupWrappedHeaders',
        value: function _setupWrappedHeaders() {
            try {
                this._headersAll = this._xhr.getAllResponseHeaders();
            } catch (e) {}
        }
    }, {
        key: 'addEventListener',
        value: function addEventListener(type, listener, optionsOrUseCapture, wantsUntrusted) {

            if (PASSTHROUGH_EVENTS.includes(type)) {
                return _get(XHR.prototype.__proto__ || Object.getPrototypeOf(XHR.prototype), 'addEventListener', this).call(this, type, listener, optionsOrUseCapture, wantsUntrusted);
            }

            var listenerWrapper = createListenerWrapper(type, listener, this._dispatchedEventsList);
            this._listenersMap.set(listener, listenerWrapper);
            return _get(XHR.prototype.__proto__ || Object.getPrototypeOf(XHR.prototype), 'addEventListener', this).call(this, type, listenerWrapper, optionsOrUseCapture, wantsUntrusted);
        }
    }, {
        key: 'removeEventListener',
        value: function removeEventListener(type, listener, optionsOrUseCapture) {

            if (PASSTHROUGH_EVENTS.includes(type)) {
                return _get(XHR.prototype.__proto__ || Object.getPrototypeOf(XHR.prototype), 'removeEventListener', this).call(this, type, listener, optionsOrUseCapture);
            }

            var listenerWrapper = this._listenersMap.get(listener);
            if (!listenerWrapper) {
                return;
            }
            this._listenersMap.delete(listener);
            return _get(XHR.prototype.__proto__ || Object.getPrototypeOf(XHR.prototype), 'removeEventListener', this).call(this, type, listenerWrapper, optionsOrUseCapture);
        }
    }, {
        key: 'open',
        value: function open(method, url, async, user, password) {

            if (this._caching) {
                if (!this._cacheInstance) {
                    throw new Error('no cache setup');
                }
                DEBUG && console.log('CACHE GET:', url);
                var cachedResource = this._cacheInstance.get(url, false);
                if (cachedResource) {

                    DEBUG && console.log('CACHE HIT');

                    this._handleCacheHitOnSend(cachedResource);
                }
            }

            return _get(XHR.prototype.__proto__ || Object.getPrototypeOf(XHR.prototype), 'open', this).call(this, method, url, async, user, password);
        }
    }, {
        key: 'send',
        value: function send(data) {
            if (this._caching && this._cacheHit && this._onSend) {
                return this._onSend();
            }

            return _get(XHR.prototype.__proto__ || Object.getPrototypeOf(XHR.prototype), 'send', this).call(this, data);
        }
    }, {
        key: 'getAllResponseHeaders',
        value: function getAllResponseHeaders() {
            return this._headersAll;
        }
    }, {
        key: 'caching',
        get: function get() {
            return this._caching;
        },
        set: function set(enabled) {
            this._caching = enabled;
        }
    }, {
        key: 'cacheInstance',
        set: function set(instance) {
            this._cacheInstance = instance;
        },
        get: function get() {
            return this._cacheInstance;
        }
    }, {
        key: 'isCacheHit',
        get: function get() {
            return this._cacheHit;
        }
    }, {
        key: 'cacheWriteEnabled',
        set: function set(enable) {
            this._cacheWrite = enable;
        }
    }, {
        key: 'enableCacheWrite',
        get: function get() {
            return this._cacheWrite;
        }
    }, {
        key: 'shaper',
        get: function get() {
            return this._shaper;
        }
    }, {
        key: 'readyState',
        get: function get() {
            if (typeof this._readyState === 'number') {
                return this._readyState;
            }
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
    }, {
        key: 'response',
        get: function get() {
            return this._response;
        }
    }, {
        key: 'responseText',
        get: function get() {
            return this._responseText;
        }
    }, {
        key: 'responseXML',
        get: function get() {
            return this._responseXML;
        }
    }]);

    return XHR;
}(_xhrProxy2.default);

exports.default = XHR;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _xhrProxy = __webpack_require__(0);

var _xhrProxy2 = _interopRequireDefault(_xhrProxy);

var _xhr = __webpack_require__(1);

var _xhr2 = _interopRequireDefault(_xhr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useGlobal() {
    // Shim window/global XHR
    var global = window || global;
    // Overload native window constructor
    global.XMLHttpRequest = _xhr2.default;
}

module.exports = {
    XMLHttpRequest: _xhr2.default,
    XHRProxy: _xhrProxy2.default,
    useGlobal: useGlobal
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var DEFAULT_ALLOW_UPDATES = false;
var MAX_CACHE_SIZE_BYTES = 1024 * 1e6; // 1024 Mbytes

var cache = new Map();

var bytesRead = 0;
var bytesWritten = 0;
var misses = 0;
var hits = 0;

var instance = {
  allowUpdates: DEFAULT_ALLOW_UPDATES,
  errorOnOverflow: false,
  get: function get(uri) {
    var onlyData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var resource = void 0;
    if (!cache.has(uri)) {
      misses++;
      return null;
    }
    hits++;
    resource = cache.get(uri);
    resource.accessedAt = Date.now();
    if (typeof resource.data.byteLength === 'number') {
      bytesRead += resource.data.byteLength;
    }
    if (onlyData) {
      return resource.data;
    } else {
      return resource;
    }
  },
  put: function put(uri, data, dataText, dataXML, headers, headersAll) {
    if (!instance.allowUpdates && cache.has(uri)) {
      throw new Error('Cache updates not allowed. Purge first! URI:', uri);
    }
    var createdAt = Date.now();
    var accessedAt = null;
    var resource = {
      uri: uri,
      data: data,
      dataText: dataText,
      dataXML: dataXML,
      headers: headers,
      headersAll: headersAll,
      createdAt: createdAt,
      accessedAt: accessedAt
    };
    cache.set(uri, resource);
    if (typeof resource.data.byteLength === 'number') {
      bytesWritten += resource.data.byteLength;
    }
    var totalSize = instance.countBytes();
    if (totalSize > MAX_CACHE_SIZE_BYTES) {
      if (instance.errorOnOverflow) throw new Error('Cache exceeds max size, has', totalSize, 'bytes');
      instance.purgeOldest();
    }
    return instance;
  },
  purgeByUri: function purgeByUri(uri) {
    return cache.delete(uri);
  },
  purgeAll: function purgeAll() {
    cache.clear();
  },
  purgeNotAccessedSince: function purgeNotAccessedSince(timeMillisSince) {
    var now = Date.now();
    cache.forEach(function (resource, uri) {
      if (!resource.accessedAt // never accessed
      || resource.accessedAt < now - timeMillisSince) cache.delete(uri);
    });
  },
  purgeCreatedBefore: function purgeCreatedBefore(timestamp) {
    cache.forEach(function (resource, uri) {
      if (createdAt < timestamp) cache.delete(uri);
    });
  },
  purgeOldest: function purgeOldest() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'accessed';
    var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    var prop = type + 'At';

    var _loop = function _loop(i) {
      var oldest = null;
      cache.forEach(function (resource) {
        if (!oldest || resource[prop] < oldest[prop]) {
          oldest = resource;
        }
      });
      cache.delete(oldest.uri);
    };

    for (var i = 0; i < count; i++) {
      _loop(i);
    }
  },
  reduce: function reduce(reduceFn) {
    var accuInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var accu = accuInit;
    cache.forEach(function (resource, uri) {
      accu = reduceFn.bind(undefined)(accu, resource);
    });
    return accu;
  },
  sumDataProperty: function sumDataProperty(field) {
    return instance.reduce(function (accu, resource) {
      return accu + resource.data[field];
    });
  },
  countBytes: function countBytes() {
    return instance.sumDataProperty('byteLength');
  }
};

var getInfo = function getInfo() {
  return {
    bytesRead: bytesRead,
    bytesWritten: bytesWritten,
    hits: hits,
    misses: misses
  };
};

exports.default = {
  getInfo: getInfo,
  instance: instance
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function setupCachedXhr(xhr, xhrProxy, cacheInstance) {
    xhrProxy._cacheInstance = cacheInstance;
}

exports.default = setupCachedXhr;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var XHRReadyStates = {
    UNSENT: 0,
    OPENED: 1,
    HEADERS_RECEIVED: 2,
    LOADING: 3,
    DONE: 4
};

function setupThrottledXhr(xhr, xhrProxy) {
    var shaper = xhrProxy.shaper;


    var openedTs = void 0,
        headersTs = void 0,
        loadingTs = void 0,
        doneTs = void 0;
    var loaded = 0;
    var total = 0;
    var currentBitrateKpbs = void 0;
    var progressEvents = [];
    var progressTimer = null;
    var lastProgressEvent = false;
    var loadEndEvent = null;
    var loadEvent = null;
    var done = false;

    xhr.onloadend = function (event) {
        var _onloadend = xhrProxy._onloadend;


        loadEndEvent = event;
        if (done) {
            _onloadend && _onloadend(event);
            xhrProxy._dispatchWrappedEventType('loadend');
        }
    };

    xhr.onload = function (event) {
        var _onload = xhrProxy._onload;

        //console.log('native load');

        loadEvent = event;
        if (done && xhr.readyState === XHRReadyStates.DONE) {
            xhrProxy._setupWrappedResponseData();
            _onload && _onload(event);
            xhrProxy._dispatchWrappedEventType('load');
        }
    };

    xhr.onreadystatechange = function (event) {
        var now = Date.now();
        var _onreadystatechange = xhrProxy._onreadystatechange,
            _onprogress = xhrProxy._onprogress,
            _onload = xhrProxy._onload,
            _onloadend = xhrProxy._onloadend;

        var triggerStateChange = function triggerStateChange(e, readyState) {
            if (typeof readyState !== 'number') {
                throw new Error('readyState should be a number');
            }

            xhrProxy._readyState = readyState;
            _onreadystatechange && _onreadystatechange(e);
            xhrProxy._dispatchWrappedEventType('readystatechange');
        };

        var latency = void 0;
        var delay1 = 0;
        var delay2 = 0;

        switch (xhr.readyState) {
            case 0:
                // UNSENT
                triggerStateChange(event, XHRReadyStates.UNSENT);
                break;
            case 1:
                // OPENED
                openedTs = now;
                triggerStateChange(event, XHRReadyStates.OPENED);
                break;
            case 2:
                // HEADERS_RECEIVED
                headersTs = now;
                xhrProxy._setupWrappedHeaders();
                triggerStateChange(event, XHRReadyStates.HEADERS_RECEIVED);
                break;
            case 3:
                // LOADING
                loadingTs = now;
                triggerStateChange(event, XHRReadyStates.LOADING);
                break;
            case 4:
                // DONE
                doneTs = now;
                latency = doneTs - openedTs;
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
                            _onprogress && _onprogress(progressEvents[progressEvents.length - 1]);
                            xhrProxy._dispatchWrappedEventType('progress');
                        }

                        triggerStateChange(event, XHRReadyStates.DONE);

                        done = true;

                        if (loadEvent) {
                            xhrProxy._setupWrappedResponseData();
                            _onload && _onload(loadEvent);
                            xhrProxy._dispatchWrappedEventType('load');
                            loadEvent = null;
                        }

                        if (loadEndEvent) {
                            _onloadend && _onloadend(loadEndEvent);
                            xhrProxy._dispatchWrappedEventType('loadend');
                            loadEndEvent = null;
                        }
                    }, Math.max(delay1, delay2));
                } else {
                    //console.log('done, not delaying');
                    done = true;
                    xhrProxy._setupWrappedResponseData();
                    triggerStateChange(event, XHRReadyStates.DONE);
                }
                break;
        }
    };

    xhr.onprogress = function (event) {
        var now = Date.now();
        var _onprogress = xhrProxy._onprogress;

        var triggerProgress = function triggerProgress(e) {
            if (loaded === total) {
                lastProgressEvent = true;
            }

            _onprogress && _onprogress(e);
            xhrProxy._dispatchWrappedEventType('progress');
        };

        var duration = now - openedTs;
        var delay = void 0;

        loaded = event.loaded;
        total = event.total;
        currentBitrateKpbs = 8 * loaded / duration; // kbps

        if (currentBitrateKpbs > shaper.maxBandwidth) {
            delay = currentBitrateKpbs / shaper.maxBandwidth * duration - duration;
            progressEvents.push(event);
            progressTimer = setTimeout(function () {
                triggerProgress(event);
            }, delay);
            return;
        }

        triggerProgress(event);
    };
}

exports.default = setupThrottledXhr;

/***/ }),
/* 6 */
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
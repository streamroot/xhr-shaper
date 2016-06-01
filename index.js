'use strict';

// This will shim the XHR object in your window and add some custom functionnality on top in the Shaper object

var XHRShaper = function() {
    var _maxBandwidth = Infinity;
    var _minLatency = 0;
    var _minProgressEvents = 0;
    var _randomness = 0;

    Object.defineProperty(this, "maxBandwidth", {
        get: function() {
            return Math.min(_maxBandwidth, XHRShaper.maxBandwidth);
        },
        set: function(val) { _maxBandwidth = val }
    });
    Object.defineProperty(this, "minLatency", {
        get: function() {
            return Math.max(_minLatency, XHRShaper.minLatency);
        },
        set: function(val) { _minLatency = val }
    });
    Object.defineProperty(this, "minProgressEvents", {
        get: function() {
            return Math.max(_minProgressEvents, XHRShaper.minProgressEvents);
        },
        set: function(val) { _minProgressEvents = val }
    });
    Object.defineProperty(this, "randomness", {
        get: function() {
            return Math.max(_randomness, XHRShaper.randomness);
        },
        set: function(val) { _randomness = val }
    });
};

XHRShaper.maxBandwidth = Infinity;
XHRShaper.minLatency = 0;
XHRShaper.minProgressEvents = 0;
XHRShaper.randomness = 0;

var WindowXHR = window.XMLHttpRequest;

function mirrorReadOnlyProp(target, source, prop) {
    Object.defineProperty(target, prop, {
        get: function() {
            return source[prop];
        }
    });
}

function mirrorRwProp(target, source, prop) {
    Object.defineProperty(target, prop, {
        get: function() {
            return source[prop];
        },
        set: function(val) {
            source[prop] = val;
        }
    });
}

function mirrorFunc(target, source, func) {
    //if (!source[func]) return; // in case someone doesn't implement the full standard bind() will fail here
    target[func] = source[func].bind(source);
}

var XMLHttpRequest = function() {
    var xhr = new WindowXHR();
    var shaper = new XHRShaper();
    var _onreadystatechange, _onprogress, _onloadend;
    var _this = {
        shaper: shaper
    };

    var openedTs, headersTs, loadingTs, doneTs;
    var loaded = 0, total;
    var currentBitrateKpbs;
    var progressEvents = [];
    var progressTimer;
    var lastProgressEvent = false;
    var loadEndEvent;

    xhr.onloadend = function(event) {
        loadEndEvent = event;

        if (_onloadend && xhr.readyState === 4) {
            _onloadend(event);
        }
    };

    xhr.onreadystatechange = function(event) {

        function triggerStateChange(e) {
            if (_onreadystatechange) {
                _onreadystatechange(e);
            }
        }

        switch (xhr.readyState) {
        case 0: // UNSENT
            triggerStateChange(event);
            break;
        case 1: // OPENED
            openedTs = Date.now();
            triggerStateChange(event);
            break;
        case 2: // HEADERS_RECEIVE
            headersTs = Date.now();
            triggerStateChange(event);
            break;
        case 3: // LOADING
            loadingTs = Date.now();
            triggerStateChange(event);
            break;
        case 4: // DONE
            var delay1 = 0, delay2 = 0;
            doneTs = Date.now();
            var latency = doneTs - openedTs;
            if (latency < shaper.minLatency) {
                delay1 = shaper.minLatency - latency;
            }
            if (currentBitrateKpbs > shaper.maxBandwidth) {
                delay2 = (currentBitrateKpbs / shaper.maxBandwidth) * latency - latency;
            }
            if (delay1 || delay2) {
                setTimeout(function() {

                    if (loaded === total && !lastProgressEvent) {
                        clearTimeout(progressTimer);
                        _onprogress(progressEvents[progressEvents.length-1]);
                    }

                    triggerStateChange(event);

                    if (loadEndEvent && _onloadend) {
                        _onloadend(loadEndEvent);
                    }

                }, Math.max(delay1, delay2));
                break;
            }

            triggerStateChange(event);

            break;
        }

    };

    xhr.onprogress = function(event) {

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
        var delay;

        loaded = event.loaded;
        total = event.total;
        currentBitrateKpbs = 8 * loaded / duration; // kbps

        //console.log('current bitrate: ' + Math.round(currentBitrateKpbs) + ' kbps');

        if (currentBitrateKpbs > shaper.maxBandwidth) {
            delay = (currentBitrateKpbs / shaper.maxBandwidth) * duration - duration;
            progressEvents.push(event);
            //console.log('delaying progress event by ' + Math.round(delay) + ' ms');
            progressTimer = setTimeout(function() {
                triggerProgress(event);
            }, delay);
            return;
        }

        triggerProgress(event);
    };

    Object.defineProperty(_this, "onreadystatechange", {
        get: function() {
            return xhr.onreadystatechange;
        },
        set: function(handler) {
            _onreadystatechange = handler;
        }
    });

    Object.defineProperty(_this, "onprogress", {
        get: function() {
            return xhr.onprogress;
        },
        set: function(handler) {
            _onprogress = handler;
        }
    });

    Object.defineProperty(_this, "onloadend", {
        get: function() {
            return xhr.onloadend;
        },
        set: function(handler) {
            _onloadend = handler;
        }
    });

    mirrorRwProp(_this, xhr, "responseType");
    mirrorRwProp(_this, xhr, "timeout");
    mirrorRwProp(_this, xhr, "withCredentials");

    mirrorReadOnlyProp(_this, xhr, "readyState");
    mirrorReadOnlyProp(_this, xhr, "response");
    mirrorReadOnlyProp(_this, xhr, "responseText");
    mirrorReadOnlyProp(_this, xhr, "responseURL");
    mirrorReadOnlyProp(_this, xhr, "responseXML");
    mirrorReadOnlyProp(_this, xhr, "status");
    mirrorReadOnlyProp(_this, xhr, "statusText");
    mirrorReadOnlyProp(_this, xhr, "upload");

    mirrorFunc(_this, xhr, "abort");
    mirrorFunc(_this, xhr, "open");
    mirrorFunc(_this, xhr, "send");
    mirrorFunc(_this, xhr, "setRequestHeader");
    mirrorFunc(_this, xhr, "getResponseHeader");
    mirrorFunc(_this, xhr, "overrideMimeType");
    mirrorFunc(_this, xhr, "getAllResponseHeaders");

    return _this;
};

XMLHttpRequest.Shaper = XHRShaper;

// Export our XMLHttpRequest mirror constructor as module
if (typeof module !== 'undefined') {
    module.exports = XMLHttpRequest;
}

// Overload native window constructor
window.XMLHttpRequest = XMLHttpRequest;


var XHRShaper = function() {
    var _maxBandwidth = Infinity;
    var _minLatency = 0;
    var _minProgressEvents = 0;
    var _randomness = 0;

    Object.defineProperty(this, "maxBandwidth", {
        get: function() {
            return Math.min(_maxBandwidth, XHRShaper.maxBandwidth);
        },
        set: function(val) { _maxBandwidth = val; }
    });
    Object.defineProperty(this, "minLatency", {
        get: function() {
            return Math.max(_minLatency, XHRShaper.minLatency);
        },
        set: function(val) { _minLatency = val; }
    });
    Object.defineProperty(this, "minProgressEvents", {
        get: function() {
            return Math.max(_minProgressEvents, XHRShaper.minProgressEvents);
        },
        set: function(val) { _minProgressEvents = val; }
    });
    Object.defineProperty(this, "randomness", {
        get: function() {
            return Math.max(_randomness, XHRShaper.randomness);
        },
        set: function(val) { _randomness = val; }
    });
};

XHRShaper.maxBandwidth = Infinity;
XHRShaper.minLatency = 0;
XHRShaper.minProgressEvents = 0;
XHRShaper.randomness = 0;

module.exports = XHRShaper;
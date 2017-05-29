var Shaper = function() {
    var _maxBandwidth = Infinity;
    var _minLatency = 0;
    var _minProgressEvents = 0;
    var _randomness = 0;

    Object.defineProperty(this, "maxBandwidth", {
        get: function() {
            return Math.min(_maxBandwidth, Shaper.maxBandwidth);
        },
        set: function(val) { _maxBandwidth = val; }
    });
    Object.defineProperty(this, "minLatency", {
        get: function() {
            return Math.max(_minLatency, Shaper.minLatency);
        },
        set: function(val) { _minLatency = val; }
    });
    Object.defineProperty(this, "minProgressEvents", {
        get: function() {
            return Math.max(_minProgressEvents, Shaper.minProgressEvents);
        },
        set: function(val) { _minProgressEvents = val; }
    });
    Object.defineProperty(this, "randomness", {
        get: function() {
            return Math.max(_randomness, Shaper.randomness);
        },
        set: function(val) { _randomness = val; }
    });
};

Shaper.maxBandwidth = Infinity;
Shaper.minLatency = 0;
Shaper.minProgressEvents = 0;
Shaper.randomness = 0;

module.exports = Shaper;
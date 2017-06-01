// This will shim the XHR object in your window and add some custom functionnality on top in the Shaper object

import XHRProxy from './xhr';
import Shaper from './shaper';

function bootstrapXhr(xhr, xhrProxy) {

    var {
        shaper,
        _onload, 
        _onloadend, 
        _onreadystatechange, 
        _onprogress
    } = xhrProxy;

    var openedTs, headersTs, loadingTs, doneTs;
    var loaded = 0, total;
    var currentBitrateKpbs;
    var progressEvents = [];
    var progressTimer;
    var lastProgressEvent = false;
    var loadEndEvent;
    var loadEvent;
    var done = false;

    xhr.onloadend = function(event) {

        var {
            shaper,
            _onload, 
            _onloadend, 
            _onreadystatechange, 
            _onprogress
        } = xhrProxy;

        console.log('native loadend');
        loadEndEvent = event;
        if (done && _onloadend) {
            _onloadend(event);
        }
    };

    xhr.onload = function(event) {

        var {
            shaper,
            _onload, 
            _onloadend, 
            _onreadystatechange, 
            _onprogress
        } = xhrProxy;

        console.log('native load');
        loadEvent = event;
        if (done && _onload && xhr.readyState === 4) {
            _onload(event);
        }
    };

    xhr.onreadystatechange = function(event) {

        var {
            shaper,
            _onload, 
            _onloadend, 
            _onreadystatechange, 
            _onprogress
        } = xhrProxy;

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
                    console.log('done, not delaying');
                    done = true;
                    triggerStateChange(event);
                }
                break;
        }
    };

    xhr.onprogress = function(event) {

        var {
            shaper,
            _onload, 
            _onloadend, 
            _onreadystatechange, 
            _onprogress
        } = xhrProxy;

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

        // console.log('current bitrate: ' + Math.round(currentBitrateKpbs) + ' kbps');

        if (currentBitrateKpbs > shaper.maxBandwidth) {
            delay = (currentBitrateKpbs / shaper.maxBandwidth) * duration - duration;
            progressEvents.push(event);
            // console.log('delaying progress event by ' + Math.round(delay) + ' ms');
            progressTimer = setTimeout(function() {
                triggerProgress(event);
            }, delay);
            return;
        }

        triggerProgress(event);
    };

    var id = Math.round(Math.random() * 1e6);

    xhr.id = id;
}

class XHR extends XHRProxy {

    static get Shaper() {
        return Shaper;
    }

    constructor() {
        super();
        this._shaper = new Shaper();

        bootstrapXhr(this._xhr, this);
    }

    addEventListener() {
        throw new Error('EventTarget API not implemented');
    }

    removeEventListener() {
        throw new Error('EventTarget API not implemented');
    }

    dispatchEvent() {
        throw new Error('EventTarget API not implemented');
    }

    get shaper() {
        return this._shaper;
    }

    set onloadend(fn) {
        this._onloadend = fn;
    }

    get onloadend() {
        return this._onloadend;
    }

    set onload(fn) {
        this._onload = fn;
    }

    get onload() {
        return this._onload;
    }

    set onreadystatechange(fn) {
        this._onreadystatechange = fn;
    }

    get onreadystatechange() {
        return this._onreadystatechange;
    }

    set onprogress(fn) {
        this._onprogress = fn;
    }

    get onprogress() {
        return this._onprogress;
    }
}

export default XHR;
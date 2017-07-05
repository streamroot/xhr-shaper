var XHRReadyStates = {
    UNSENT: 0,
    OPENED: 1,
    HEADERS_RECEIVED: 2,
    LOADING: 3,
    DONE: 4
};

function setupThrottledXhr(xhr, xhrProxy) {

    let {
        shaper
    } = xhrProxy;

    let openedTs, headersTs, loadingTs, doneTs;
    let loaded = 0;
    let total = 0;
    let currentBitrateKpbs;
    let progressEvents = [];
    let progressTimer = null;
    let lastProgressEvent = false;
    let loadEndEvent = null;
    let loadEvent = null;
    let done = false;

    xhr.onloadend = function(event) {

        let {
            _onloadend
        } = xhrProxy;

        loadEndEvent = event;
        if (done) {
            _onloadend && _onloadend(event);
            xhrProxy._dispatchWrappedEventType('loadend');
        }
    };

    xhr.onload = function(event) {

        let {
            _onload 
        } = xhrProxy;

        //console.log('native load');
        loadEvent = event;
        if (done && xhr.readyState === XHRReadyStates.DONE) {
            xhrProxy._setupWrappedResponseData();
            _onload && _onload(event);
            xhrProxy._dispatchWrappedEventType('load');
        }
    };

    xhr.onreadystatechange = function(event) {
        const now = Date.now();
        const {
            _onreadystatechange,
            _onprogress,
            _onload,
            _onloadend
        } = xhrProxy;
        const triggerStateChange = function(e, readyState) {
            if (typeof readyState !== 'number') {
                throw new Error('readyState should be a number');
            }

            xhrProxy._readyState = readyState;
            _onreadystatechange && _onreadystatechange(e);
            xhrProxy._dispatchWrappedEventType('readystatechange');
        }

        let latency;
        let delay1 = 0; 
        let delay2 = 0;

        switch (xhr.readyState) {
            case 0: // UNSENT
                triggerStateChange(event, XHRReadyStates.UNSENT);
                break;
            case 1: // OPENED
                openedTs = now;
                triggerStateChange(event, XHRReadyStates.OPENED);
                break;
            case 2: // HEADERS_RECEIVED
                headersTs = now;
                xhrProxy._setupWrappedHeaders();
                triggerStateChange(event, XHRReadyStates.HEADERS_RECEIVED);
                break;
            case 3: // LOADING
                loadingTs = now;
                triggerStateChange(event, XHRReadyStates.LOADING);
                break;
            case 4: // DONE
                doneTs = now;
                latency = doneTs - openedTs;
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

    xhr.onprogress = function(event) {
        const now = Date.now();
        const {
            _onprogress
        } = xhrProxy;
        const triggerProgress = function(e) {
            if (loaded === total) {
                lastProgressEvent = true;
            }

            _onprogress && _onprogress(e);
            xhrProxy._dispatchWrappedEventType('progress');
        }

        let duration = now - openedTs;
        let delay;

        loaded = event.loaded;
        total = event.total;
        currentBitrateKpbs = 8 * loaded / duration; // kbps

        if (currentBitrateKpbs > shaper.maxBandwidth) {
            delay = (currentBitrateKpbs / shaper.maxBandwidth) * duration - duration;
            progressEvents.push(event);
            progressTimer = setTimeout(function() {
                triggerProgress(event);
            }, delay);
            return;
        }

        triggerProgress(event);
    };
}

export default setupThrottledXhr;
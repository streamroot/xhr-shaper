function setupThrottledXhr(xhr, xhrProxy) {

    let {
        shaper
    } = xhrProxy;

    let openedTs, headersTs, loadingTs, doneTs;
    let loaded = 0, total;
    let currentBitrateKpbs;
    let progressEvents = [];
    let progressTimer;
    let lastProgressEvent = false;
    let loadEndEvent;
    let loadEvent;
    let done = false;

    xhr.onloadend = function(event) {

        let {
            _onloadend
        } = xhrProxy;

        //console.log('native loadend');
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
        if (done && xhr.readyState === 4) {
            xhrProxy._setupWrappedResponseData();
            _onload && _onload(event);
            xhrProxy._dispatchWrappedEventType('load');
        }
    };

    xhr.onreadystatechange = function(event) {

        let {
            _onreadystatechange,
            _onprogress,
            _onload,
            _onloadend
        } = xhrProxy;

        function triggerStateChange(e, readyState) {
            if (typeof readyState !== 'number') {
                throw new Error('readyState should be a number');
            }

            xhrProxy._readyState = readyState;
            _onreadystatechange && _onreadystatechange(e);
            xhrProxy._dispatchWrappedEventType('readystatechange');
        }

        switch (xhr.readyState) {
            case 0: // UNSENT
                triggerStateChange(event, 0);
                break;
            case 1: // OPENED
                openedTs = Date.now();
                triggerStateChange(event, 1);
                break;
            case 2: // HEADERS_RECEIVE
                headersTs = Date.now();
                xhrProxy._setupWrappedHeaders();
                triggerStateChange(event, 2);
                break;
            case 3: // LOADING
                loadingTs = Date.now();
                triggerStateChange(event, 3);
                break;
            case 4: // DONE
                let delay1 = 0, delay2 = 0;
                doneTs = Date.now();
                let latency = doneTs - openedTs;
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

                        triggerStateChange(event, 4);

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
                    triggerStateChange(event, 4);
                }
                break;
        }
    };

    xhr.onprogress = function(event) {

        let {
            _onprogress
        } = xhrProxy;

        function triggerProgress(e) {

            if (loaded === total) {
                lastProgressEvent = true;
            }

            _onprogress && _onprogress(e);
            xhrProxy._dispatchWrappedEventType('progress');
        }

        let now = Date.now();
        let duration = now - openedTs;
        let delay;

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

    let id = Math.round(Math.random() * 1e6);

    xhr.__throttledId = id;
    xhrProxy.__throttledId = id;
}

export default setupThrottledXhr;
function initThrottledXhr(xhr, xhrProxy) {

    let {
        shaper,
        _onload, 
        _onloadend, 
        _onreadystatechange, 
        _onprogress
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
            shaper,
            _onload, 
            _onloadend, 
            _onreadystatechange, 
            _onprogress
        } = xhrProxy;

        //console.log('native loadend');
        loadEndEvent = event;
        if (done && _onloadend) {
            _onloadend(event);
        }
    };

    xhr.onload = function(event) {

        let {
            shaper,
            _onload, 
            _onloadend, 
            _onreadystatechange, 
            _onprogress
        } = xhrProxy;

        //console.log('native load');
        loadEvent = event;
        if (done && _onload && xhr.readyState === 4) {
            _onload(event);
        }
    };

    xhr.onreadystatechange = function(event) {

        let {
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

    xhr.onprogress = function(event) {

        let {
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

export default initThrottledXhr;
import XHRProxy from './xhr';
import Shaper from './shaper';
import setupThrottledXhr from './setup-throttled-xhr';

const PASSTHROUGH_EVENTS = ['loadstart', 'timeout', 'abort', 'error'];

const createListenerWrapper = (type, listener, dispatchedEventsList) => {
    return (event) => {
        dispatchedEventsList.push({type, listener, event, propagated: false});
    };
}

class ThrottledXHR extends XHRProxy {

    static get Shaper() {
        return Shaper;
    }

    constructor() {
        super();
        this._shaper = new Shaper();
        this._listenersMap = new Map();
        this._dispatchedEventsList = [];

        setupThrottledXhr(this._xhr, this);
    }

    _dispatchWrappedEventType(type) {
        // it needs to run on the next tick since this is actually
        // triggered from our throttler listeners on the proxy's inner XHR 
        setTimeout(() => {
            this._dispatchedEventsList
                .filter((dispatchedEvent) => (dispatchedEvent.type === type && !dispatchedEvent.propagated))
                .forEach((dispatchedEvent) => {
                    dispatchedEvent.propagated = true;
                    dispatchedEvent.listener(dispatchedEvent.event);
                });            
        }, 0);
    }

    addEventListener(type, listener, optionsOrUseCapture, wantsUntrusted) {

        if (PASSTHROUGH_EVENTS.includes(type)) {
            return super.addEventListener(type, listener, optionsOrUseCapture, wantsUntrusted);
        }

        const listenerWrapper = createListenerWrapper(type, listener, this._dispatchedEventsList);
        this._listenersMap.set(listener, listenerWrapper);
        return super.addEventListener(type, listenerWrapper, optionsOrUseCapture, wantsUntrusted);
    }
    removeEventListener(type, listener, optionsOrUseCapture) {

        if (PASSTHROUGH_EVENTS.includes(type)) {
            return super.removeEventListener(type, listener, optionsOrUseCapture)
        }

        const listenerWrapper = this._listenersMap.get(listener);
        if (!listenerWrapper) {
            return;
        }
        this._listenersMap.delete(listener);
        return super.removeEventListener(type, listenerWrapper, optionsOrUseCapture);
    }
    dispatchEvent(event) {
        return super.dispatchEvent(event);
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

export default ThrottledXHR;
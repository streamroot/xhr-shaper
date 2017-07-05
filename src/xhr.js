import XHRProxy from './xhr-proxy';
import Shaper from './shaper';
import setupThrottledXhr from './setup-throttled-xhr';
import setupCachedXhr from './setup-cached-xhr';
import cache from './cache';

const DEBUG = false;

const PASSTHROUGH_EVENTS = ['loadstart', 'timeout', 'abort', 'error'];

const createListenerWrapper = (type, listener, dispatchedEventsList) => {
    return (event) => {
        dispatchedEventsList.push({type, listener, event, propagated: false});
    };
}

class XHR extends XHRProxy {

    static get Shaper() {
        return Shaper;
    }

    static get cache() {
        return cache;
    }

    constructor() {
        super();

        this._cacheInstance = cache.instance;
        this._shaper = new Shaper();
        this._listenersMap = new Map();
        this._dispatchedEventsList = [];
        this._response = null;
        this._responseText = null;
        this._responseXML = null;
        this._headers = null;
        this._readyState = 0;
        this._caching = false;
        this._cacheHit = false;
        this._cacheWrite = true;
        this._onSend = null;

        this.addEventListener('loadend', () => {
            if (this._caching && this._cacheWrite) {
                DEBUG && console.log('CACHE WRITE:', this._xhr.responseURL);
                this._cacheInstance.put(
                    this._xhr.responseURL, 
                    this._response, 
                    this._responseText,
                    this._responseXML,
                    null,
                    this._xhr.getAllResponseHeaders()
                );
            }
        });

        setupThrottledXhr(this._xhr, this);
    }

    get caching() {
       return this._caching;
    }

    set caching(enabled) {
        this._caching = enabled;
    }

    set cacheInstance(instance) {
        this._cacheInstance = instance;
    }

    get cacheInstance() {
        return this._cacheInstance;
    }

    get isCacheHit() {
        return this._cacheHit;
    }

    set cacheWriteEnabled(enable) {
        this._cacheWrite = enable;
    }

    get enableCacheWrite() {
        return this._cacheWrite;
    }

    get shaper() {
        return this._shaper;
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

    _handleCacheHitOnSend(cachedResource) {
        this._readyState = 1;
        this._cacheHit = true;

        const onSend = () => {
            setTimeout(() => {
                this._readyState = 2;
                this.onreadystatechange && this.onreadystatechange();
                this._dispatchWrappedEventType('readystatechange');
                this._readyState = 3;
                this.onreadystatechange && this.onreadystatechange();
                this._dispatchWrappedEventType('readystatechange');
                this.onloadstart && this.onloadstart();
                this._dispatchWrappedEventType('loadstart');
                this._response = cachedResource.data;
                this._responseText = cachedResource.dataText;
                this._responseXML = cachedResource.dataXML;
                this._headersAll = cachedResource.headers;
                this._readyState = 4;
                this.onreadystatechange && this.onreadystatechange();
                this._dispatchWrappedEventType('readystatechange');
                this.onreadystatechange && this.onreadystatechange();
                this._dispatchWrappedEventType('readystatechange');
                this.onload && this.onload();
                this._dispatchWrappedEventType('load');
                this.onloadend && this.onloadend();
                this._dispatchWrappedEventType('loadend');
            }, 0);            
        };
        this._onSend = onSend;
    }

    _setupWrappedResponseData() {
        try { 
            this._response = this._xhr.response; 
        } catch(e) {
            DEBUG && console.warn(e)
        }
        try { 
            this._responseText = this._xhr.responseText; 
        } catch(e) {
            DEBUG && console.warn(e)
        }
        try { 
            this._responseXML = this._xhr.responseXML; 
        } catch(e) {
            DEBUG && console.warn(e)
        }
    }

    _setupWrappedHeaders() {
        try { this._headersAll = this._xhr.getAllResponseHeaders(); } catch(e) {}
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

    open(method, url, async, user, password) {

        if (this._caching) {
            if (!this._cacheInstance) {
                throw new Error('no cache setup');
            }
            DEBUG && console.log('CACHE GET:', url);
            const cachedResource = this._cacheInstance.get(url, false);
            if (cachedResource) {

                DEBUG && console.log('CACHE HIT');

                this._handleCacheHitOnSend(cachedResource);
            }
        }

        return super.open(method, url, async, user, password); 
    }

    send(data) {
        if (this._caching && this._cacheHit && this._onSend) {
            return this._onSend();
        }

        return super.send(data); 
    }

    getAllResponseHeaders() {
        return this._headersAll;
    }

    get readyState() {
        if (typeof this._readyState === 'number') {
            return this._readyState;
        }
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

    get response() {
        return this._response;
    }
    get responseText() {
        return this._responseText;
    }
    get responseXML() {
        return this._responseXML;
    }
}

export default XHR;
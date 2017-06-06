// See https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

const XMLHttpRequest = window.XMLHttpRequest;

class XHRProxy {

    constructor() {
        this._xhr = new XMLHttpRequest();
    }

    // methods

    abort() {
        return this._xhr.abort();
    }
    open(method, url, async, user, password) {
        return this._xhr.open(method, url, async, user, password); 
    }
    send(data) {
        return this._xhr.send(data);   
    }
    setRequestHeader(header, value) {
        return this._xhr.setRequestHeader(header, value);
    }
    getResponseHeader(header) {
        return this._xhr.getResponseHeader(header);
    }
    overrideMimeType(mimeType) {
        return this._xhr.overrideMimeType(mimeType);
    }
    getAllResponseHeaders() {
        return this._xhr.getAllResponseHeaders();
    }

    addEventListener(type, listener, optionsOrUseCapture, wantsUntrusted) {
        return this._xhr.addEventListener(type, listener, optionsOrUseCapture, wantsUntrusted);
    }
    removeEventListener(type, listener, optionsOrUseCapture) {
        return this._xhr.removeEventListener(type, listener, optionsOrUseCapture);
    }
    dispatchEvent(event) {
        return this._xhr.dispatchEvent(event);
    }

    // Read-only properties

    get readyState() {
        return this._xhr.readyState;
    }
    get response() {
        return this._xhr.response;
    }
    get responseText() {
        return this._xhr.responseText;   
    }
    get responseXML() {
        return this._xhr.responseXML;
    }
    get responseURL() {
        return this._xhr.responseURL;
    }
    get status() {
        return this._xhr.status;
    }
    get statusText() {
        return this._xhr.statusText;
    }
    get upload() {
        return this._xhr.upload;
    }
    
    // R & W properties

    set withCredentials(enabled) {
        this._xhr.withCredentials = enabled;
    }
    get withCredentials() {
        return this._xhr.withCredentials;
    }

    set responseType(responseType) {
        this._xhr.responseType = responseType;
    }
    get responseType() {
        return this._xhr.responseType;
    }

    set timeout(timeout) {
        this._xhr.timeout = timeout;
    }
    get timeout() {
        return this._xhr.timeout;
    }

    set onload(fn) {
        this._xhr.onload = fn;
    }
    get onload() {
        return this._xhr.onload;
    }

    set onloadstart(fn) {
        this._xhr.onloadstart = fn;
    }
    get onloadstart() {
        return this._xhr.onloadstart;
    }    

    set onloadend(fn) {
        this._xhr.onloadend = fn;
    }
    get onloadend() {
        return this._xhr.onloadend;
    }

    set onabort(fn) {
        this._xhr.onabort = fn;
    }
    get onabort() {
        return this._xhr.onabort;
    }

    set onerror(fn) {
        this._xhr.onerror = fn;
    }
    get onerror() {
        return this._xhr.onerror;
    }

    set onprogress(fn) {
        this._xhr.onprogress = fn;
    }
    get onprogress() {
        return this._xhr.onprogress;
    }

    set ontimeout(fn) {
        this._xhr.ontimeout = fn;
    }
    get ontimeout() {
        return this._xhr.ontimeout;
    }

    set onreadystatechange(fn) {
        this._xhr.onreadystatechange = fn;
    }
    get onreadystatechange() {
        return this._xhr.onreadystatechange;
    } 
}

export default XHRProxy;
import XHRProxy from './xhr';
import Shaper from './shaper';
import initThrottledXhr from './init-throttled-xhr';

class ThrottledXHR extends XHRProxy {

    static get Shaper() {
        return Shaper;
    }

    constructor() {
        super();
        this._shaper = new Shaper();

        initThrottledXhr(this._xhr, this);
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

export default ThrottledXHR;
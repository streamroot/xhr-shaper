'use strict';

var BaseXHR = require('./src/base-xhr');
var objectMirrors = require('./src/object-mirrors');
var XMLHttpRequestShim = require('./src/shim');

// Export all our stuff via module if we are one
if (typeof module !== 'undefined') {
    module.exports = {
        BaseXHR: BaseXHR,
        XMLHttpRequest: XMLHttpRequestShim,
        useGlobal: useGlobal,
        objectMirrors: objectMirrors
    };
}

function useGlobal() {
    // Shim window/global XHR
    var global = window || global;
    if (typeof global !== 'undefined') {
        // Overload native window constructor
        global.XMLHttpRequest = XMLHttpRequestShim;
    }
}





'use strict';

var BaseXHR = require('./src/base-xhr');
var objectMirrors = require('./src/object-mirrors');
var XMLHttpRequestShim = require('./src/shim');

function useGlobal() {
    // Shim window/global XHR
    var global = window || global;
    // Overload native window constructor
    global.XMLHttpRequest = XMLHttpRequestShim;
}

module.exports = {
    BaseXHR: BaseXHR,
    XMLHttpRequest: XMLHttpRequestShim,
    useGlobal: useGlobal,
    objectMirrors: objectMirrors
};

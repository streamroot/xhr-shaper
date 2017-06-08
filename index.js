import XHRProxy from './src/xhr-proxy';
import XHR from './src/xhr';

function useGlobal() {
    // Shim window/global XHR
    var global = window || global;
    // Overload native window constructor
    global.XMLHttpRequest = XHR;
}

module.exports = {
    XMLHttpRequest: XHR,
    XHRProxy,
    useGlobal
};

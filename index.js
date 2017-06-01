import XHRProxy from './src/xhr';
import XHR from './src/shim';

function useGlobal() {
    // Shim window/global XHR
    var global = window || global;
    // Overload native window constructor
    global.XMLHttpRequest = XHR;
}

module.exports = {
    XHRProxy,
    XHR,
    useGlobal
};

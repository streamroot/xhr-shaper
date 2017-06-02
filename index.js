import XHRProxy from './src/xhr';
import ThrottledXHR from './src/throttled-xhr';

function useGlobal() {
    // Shim window/global XHR
    var global = window || global;
    // Overload native window constructor
    global.XMLHttpRequest = ThrottledXHR;
}

module.exports = {
    XHRProxy,
    useGlobal
};

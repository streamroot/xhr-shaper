'use strict';

var objectMirrors = require('./object-mirrors');

var BaseXHR = function(xhrImpl, onreadystatechange, onprogress, onloadend) {

    var instance = {};
    var xhr = xhrImpl || {};

    var _onreadystatechange = onreadystatechange || function() {};
    var _onprogress = onprogress || function() {};
    var _onloadend = onloadend || function() {};

    Object.defineProperty(instance, "onreadystatechange", {
        get: function() {
            return xhr.onreadystatechange;
        },
        set: function(handler) {
            _onreadystatechange(handler);
        }
    });

    Object.defineProperty(instance, "onprogress", {
        get: function() {
            return xhr.onprogress;
        },
        set: function(handler) {
            _onprogress(handler);
        }
    });

    Object.defineProperty(instance, "onloadend", {
        get: function() {
            return xhr.onloadend;
        },
        set: function(handler) {
            _onloadend(handler);
        }
    });

    objectMirrors.mirrorRwProp(instance, xhr, "responseType");
    objectMirrors.mirrorRwProp(instance, xhr, "timeout");
    objectMirrors.mirrorRwProp(instance, xhr, "withCredentials");

    objectMirrors.mirrorReadOnlyProp(instance, xhr, "readyState");
    objectMirrors.mirrorReadOnlyProp(instance, xhr, "response");
    objectMirrors.mirrorReadOnlyProp(instance, xhr, "responseText");
    objectMirrors.mirrorReadOnlyProp(instance, xhr, "responseURL");
    objectMirrors.mirrorReadOnlyProp(instance, xhr, "responseXML");
    objectMirrors.mirrorReadOnlyProp(instance, xhr, "status");
    objectMirrors.mirrorReadOnlyProp(instance, xhr, "statusText");
    objectMirrors.mirrorReadOnlyProp(instance, xhr, "upload");

    objectMirrors.mirrorFunc(instance, xhr, "abort");
    objectMirrors.mirrorFunc(instance, xhr, "open");
    objectMirrors.mirrorFunc(instance, xhr, "send");
    objectMirrors.mirrorFunc(instance, xhr, "setRequestHeader");
    objectMirrors.mirrorFunc(instance, xhr, "getResponseHeader");
    objectMirrors.mirrorFunc(instance, xhr, "overrideMimeType");
    objectMirrors.mirrorFunc(instance, xhr, "getAllResponseHeaders");

    return instance;
};

module.exports = BaseXHR;
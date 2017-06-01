'use strict';

var objectMirrors = require('./object-mirrors');

var BaseXHR = function(xhrImpl) {

    var instance = {};
    var xhr = xhrImpl || {};

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

    // EventTarget iface
    objectMirrors.mirrorFunc(instance, xhr, "addEventListener");
    objectMirrors.mirrorFunc(instance, xhr, "removeEventListener");

    // All events as in https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    objectMirrors.mirrorRwProp(instance, xhr, "onload");
    objectMirrors.mirrorRwProp(instance, xhr, "onloadstart");
    objectMirrors.mirrorRwProp(instance, xhr, "onloadend");
    objectMirrors.mirrorRwProp(instance, xhr, "onabort");
    objectMirrors.mirrorRwProp(instance, xhr, "onerror");
    objectMirrors.mirrorRwProp(instance, xhr, "onprogress");
    objectMirrors.mirrorRwProp(instance, xhr, "ontimeout");
    objectMirrors.mirrorRwProp(instance, xhr, "onreadystatechange");

    return instance;
};

module.exports = BaseXHR;
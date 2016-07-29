'use strict';

var ERROR_SOURCE_PROPERTY_NOT_IMPLEMENTED = 'Requiring undefined property on source object';

function checkProperty(source, prop) {
    if (typeof source[prop] === 'undefined') {
        throw new Error(ERROR_SOURCE_PROPERTY_NOT_IMPLEMENTED + ': ' + prop);
    }
}

function readProperty(target, source, prop, getterHook) {
    if (getterHook) {
        var result = getterHook(target, source, prop);
        if (result.override) {
            return result.value;
        }
    }
    checkProperty(source, prop);
    return source[prop];
}

function writeProperty(val, target, source, prop, setterHook) {
    if (setterHook) {
        var result = setterHook(val, target, source, prop);
        if (result.override) {
            return;
        }
    }
    checkProperty(source, prop);
    source[prop] = val;
}

function mirrorReadOnlyProp(target, source, prop, getterHook) {
    Object.defineProperty(target, prop, {
        get: function() {
            return readProperty(target, source, prop, getterHook);
        },
        configurable: true
    });
}

function mirrorRwProp(target, source, prop, setterHook, getterHook) {
    Object.defineProperty(target, prop, {
        get: function() {
            return readProperty(target, source, prop, getterHook);
        },
        set: function(val) {
            return writeProperty(val, target, source, prop, setterHook);
        },
        configurable: true
    });
}

function mirrorFunc(target, source, func) {
    target[func] = function() {
        checkProperty(source, func);
        return source[func].apply(source, arguments);
    };
}

module.exports = {
    mirrorFunc: mirrorFunc,
    mirrorRwProp: mirrorRwProp,
    mirrorReadOnlyProp: mirrorReadOnlyProp
};
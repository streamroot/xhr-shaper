'use strict';

var ERROR_SOURCE_PROPERTY_NOT_IMPLEMENTED = 'Requiring undefined property on source object';

function checkProperty(source, prop) {
	if (typeof source[prop] === 'undefined') {
		throw new Error(ERROR_SOURCE_PROPERTY_NOT_IMPLEMENTED);
	}
}

function mirrorReadOnlyProp(target, source, prop) {
    Object.defineProperty(target, prop, {
        get: function() {
        	checkProperty(source, prop);
            return source[prop];
        }
    });
}

function mirrorRwProp(target, source, prop) {
    Object.defineProperty(target, prop, {
        get: function() {
        	checkProperty(source, prop);
            return source[prop];
        },
        set: function(val) {
        	checkProperty(source, prop);
            source[prop] = val;
        }
    });
}

function mirrorFunc(target, source, func) {
	if (typeof source[func] === 'undefined'){
		target[func] = function() {
			throw new Error(ERROR_SOURCE_FUNCTION_NOT_IMPLEMENTED);
		}
		return;
	}
    target[func] = function() {
    	checkProperty(source, func);
    	source[func].apply(source, arguments);
    }
}


module.exports = {
	mirrorFunc: mirrorFunc,
	mirrorRwProp: mirrorRwProp,
	mirrorReadOnlyProp: mirrorReadOnlyProp
};
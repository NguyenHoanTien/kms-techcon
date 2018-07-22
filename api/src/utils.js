/**
 * Lib imports
 */
const {curry} = require('ramda');
const BPromise = require('bluebird');
const debug = require('debug');

/**
 * Project imports
 */
const {APP_NAMESPACE} = require('./configs');

function constant(v) {
    return function value() {
        return v;
    };
}

function _trace(logFunc, msg, value) {
    if (value) {
        logFunc(msg, value);
    } else {
        logFunc(msg);
    }
    return value;
}

function _createDebugLogger(namespace, msg, value) {
    return _trace(debug(`${APP_NAMESPACE}:${namespace}`), msg, value);
}

function _createDebugLoggerP(namespace, msg, value) {
    return BPromise.resolve(_createDebugLogger(namespace, msg, value));
}

const createDebugLogger = curry(_createDebugLogger);
const createDebugLoggerP = curry(_createDebugLoggerP);

module.exports = {
    constant,
    createDebugLogger,
    createDebugLoggerP,
};

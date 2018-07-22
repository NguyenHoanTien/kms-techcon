/**
 * Lib imports
 */
const http = require('http');
const BPromise = require('bluebird');
const {prop} = require('ramda');

/**
 * Project imports
 */
const app = require('./app');
const {PORT} = require('./configs');
const db = require('./db');
const {createDebugLoggerP, constant} = require('./utils');

const logP = createDebugLoggerP('index');

function startServerP(app, port) {
    const server = http.createServer(app);
    return BPromise.promisify(server.listen.bind(server))(port)
        .then(constant('OK'))
        .catch(prop('message'));
}

function establishDBConnectionP() {
    return db.sequelize.authenticate()
        .then(constant('OK'))
        .catch(prop('message'));
}

function createStartupTasks() {
    return establishDBConnectionP()
        .then(logP('DB Status:'))
        .then(() => startServerP(app, PORT))
        .then(logP('HTTP Server Status:'));
}

createStartupTasks()
    .then(() => logP('API has been started.', null));



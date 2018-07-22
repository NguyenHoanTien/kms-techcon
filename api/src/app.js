/**
 * Lib imports
 */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fetch = require('node-fetch');

/**
 * Project imports
 */
const routes = require('./routes');
const {sequelizeErrorHandler} = require('./middleware');
const {MONITOR_HTTP_URL, POD_ID} = require('./configs');
const {createDebugLogger} = require('./utils');

const log = createDebugLogger('app');

function monitor() {
    return (request, response, next) => {
        fetch(`${MONITOR_HTTP_URL}/hit/${POD_ID}`)
            .then(() => next())
            .catch((error) => {
                log('Failed to hit monitor. Ignoring', error);
                next();
            });
    };
}

function createExpressApp() {
    return express()
        .use(cors())
        .use(morgan('common'))
        .use(bodyParser.json())
        .use(monitor())
        .use(routes)
        .use(sequelizeErrorHandler);
}

module.exports = createExpressApp();

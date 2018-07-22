/**
 * Lib imports
 */
const {
    BAD_REQUEST,
} = require('http-status-codes');

/**
 * Project imports
 */
const {createDebugLogger} = require('./utils');

// eslint-disable-next-line no-unused-vars
const log = createDebugLogger('middlewares');

function sequelizeErrorHandler(error, request, response, next) {
    if (/^Sequelize/.test(error.name)) {
        let message = error.message;
        if (error.name === 'SequelizeUniqueConstraintError') {
            message = `${error.errors[0].path} already exists`;
        }
        response.status(BAD_REQUEST).send(message);
    } else {
        next(error);
    }
}

module.exports = {
    sequelizeErrorHandler,
};

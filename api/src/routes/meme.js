/**
 * Lib imports
 */
const router = require('express').Router();
const {CREATED} = require('http-status-codes');

/**
 * Project imports
 */
const {createDebugLogger} = require('../../src/utils');
const db = require('../db');

// eslint-disable-next-line no-unused-vars
const log = createDebugLogger('routes:consumer');

router.get('/', (request, response, next) => {
    db.Meme.findAll({
        include: [{model: db.Image, as: 'image'}],
        order: [['createdAt', 'ASC']],
    })
        .then((data) => response.send(data)).catch(next);
});

router.post('/', (request, response, next) => {
    const {imageId, userId, topText, bottomText} = request.body;
    db.Meme.create({imageId, userId, topText, bottomText})
        .then((data) => response.status(CREATED).send(data))
        .catch(next);
});

module.exports = {
    path: '/memes',
    router,
};

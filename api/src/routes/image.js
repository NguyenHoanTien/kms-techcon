/**
 * Lib imports
 */
const router = require('express').Router();
const serveStatic = require('express').static;
const {CREATED} = require('http-status-codes');
const multer = require('multer');

/**
 * Project imports
 */
const {createDebugLogger} = require('../../src/utils');
const {IMAGES_DIR} = require('../configs');
const db = require('../db');

// eslint-disable-next-line no-unused-vars
const log = createDebugLogger('routes:consumer');
const upload = multer({dest: IMAGES_DIR});

router.get('/', (request, response) =>
    db.Image.findAll({order: [['createdAt', 'ASC']]})
        .then((data) => response.send(data)));

router.post('/', upload.single('image'), (request, response, next) =>
    db.Image.create({name: request.file.filename})
        .then((data) => response.status(CREATED).send(data))
        .catch(next));

router.use('/download', serveStatic(IMAGES_DIR));

module.exports = {
    path: '/images',
    router,
};

/*
API --HTTP--> Monitor --WS--> frontend
 */

/**
 * Lib imports
 */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const SocketIO = require('socket.io');

/**
 * Project imports
 */
const {MONITOR_HTTP_PORT, MONITOR_WS_PORT} = require('./configs');
const Pods = require('./pods');

const app = express()
    .use(cors())
    .use(morgan('common'));

const httpServer = http.createServer(app);
const io = SocketIO(MONITOR_WS_PORT);

app.get('/up/:podId', (request, response) => {
    Pods.add(request.params.podId);
    io.emit('pods', JSON.stringify(Pods.pods));
    response.send('OK');
});

app.get('/down/:podId', (request, response) => {
    Pods.remove(request.params.podId);
    io.emit('pods', JSON.stringify(Pods.pods));
    response.send('OK');
});

app.get('/hit/:podId', (request, response) => {
    io.emit('hit', JSON.stringify({podId: request.params.podId}));
    response.send('OK');
});

app.get('/', (request, response) => {
    response.send(Pods.pods);
});

io.on('connection', function (socket) {
    console.log('WS connection established.');
    io.emit('pods', JSON.stringify(Pods.pods));
    socket.on('disconnect', function () {
        console.log('WS disconnect.');
    });
});

httpServer.listen(MONITOR_HTTP_PORT, () => {
    console.log(`Monitor HTTP is listening on port ${MONITOR_HTTP_PORT}`);
});


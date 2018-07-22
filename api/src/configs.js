const homeDir = require('os').homedir();
const {join} = require('path');

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: Number(process.env.MEGE_TRACKER_PORT) || 3001,
    DB_DIALECT: 'postgres',
    APP_NAMESPACE: process.env.MEGE_APP_NAMESPACE || 'mege',
    POD_ID: process.env.HOSTNAME || 'HOSTNAME',
    DB_USERNAME: process.env.MEGE_DB_USERNAME || 'hungnvu',
    DB_PASSWORD: process.env.MEGE_DB_PASSWORD || null,
    DB_HOST: process.env.MEGE_DB_HOST || 'localhost',
    DB_PORT: Number(process.env.MEGE_DB_PORT) || 5432,
    DB_NAME: process.env.MEGE_DB_NAME || 'mege',
    IMAGES_DIR: process.env.MEGE_IMAGES_DIR || join(homeDir, '.mege', 'images'),
    MONITOR_HTTP_URL: process.env.MEGE_MONITOR_HTTP_URL || 'http://localhost:3002',
};

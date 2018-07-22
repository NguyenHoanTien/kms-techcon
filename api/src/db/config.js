// eslint-disable-next-line max-len
const {DB_USERNAME, DB_PASSWORD, DB_DIALECT, DB_NAME, DB_HOST, DB_PORT} = require('../configs');

const config = {
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: false,
    migrationStorage: 'sequelize',
    seederStorage: 'sequelize',
};

module.exports = {
    ...config,
    development: config,
    testing: config,
    production: config,
};

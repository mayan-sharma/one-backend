const { Sequelize } = require('sequelize');

const config = require('./config');

const db = new Sequelize(config.DATABASE_NAME, config.DATABASE_USER, config.DATABASE_PASSWORD, {
    host: config.DATABASE_HOST,
    dialect: 'postgres'
});

module.exports = db;
const { DataTypes } = require('sequelize');

const db = require('../config/postgres');

const Category = db.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        unique: true
    }
});

module.exports = Category;
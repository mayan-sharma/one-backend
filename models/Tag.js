const { DataTypes } = require('sequelize');

const db = require('../config/postgres');

const Tag = db.define('Tag', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        unique: true
    }
});

module.exports = Tag;
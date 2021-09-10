const { DataTypes } = require('sequelize');

const db = require('../config/postgres');

db.Blog = require('./Blog')(db, DataTypes);
db.Category = require('./Category')(db, DataTypes);
db.Tag = require('./Tag')(db, DataTypes);
db.User = require('./User')(db, DataTypes);

db.User.hasMany(db.Blog);

db.Blog.belongsTo(db.User);

db.Blog.belongsToMany(db.Category, {
    through: 'BlogCategory'
});

db.Category.belongsToMany(db.Blog, {
    through: 'BlogCategory'
});

module.exports = db;
const { DataTypes } = require('sequelize');

const db = require('../config/postgres');

db.Blog = require('./Blog')(db, DataTypes);
db.Photo = require('./Photo')(db, DataTypes);
db.Category = require('./Category')(db, DataTypes);
db.Tag = require('./Tag')(db, DataTypes);
db.User = require('./User')(db, DataTypes);

db.User.hasMany(db.Blog);
db.Blog.belongsTo(db.User);

db.User.hasOne(db.Photo);
db.Photo.belongsTo(db.User);

db.Blog.hasOne(db.Photo);
db.Photo.belongsTo(db.Blog);

db.Blog.belongsToMany(db.Category, {
    through: 'BlogCategory'
});

db.Category.belongsToMany(db.Blog, {
    through: 'BlogCategory'
});

db.Blog.belongsToMany(db.Tag, {
    through: 'BlogTag'
});

db.Tag.belongsToMany(db.Blog, {
    through: 'BlogTag'
});

module.exports = db;
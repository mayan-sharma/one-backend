const DataTypes = require('sequelize').DataTypes

const _tag = require('./Tag')
const _user = require('./User')
const _blog = require('./Blog')
const _photo = require('./Photo')
const _category = require('./Category')

/**
 * Initializes Sequelize Models
 * @param {Object} sequelize Initialized Sequelize object
 * @returns {Object} Initialized Models
 */
const initModels = sequelize => {
    const tag = _tag(sequelize, DataTypes)
    const user = _user(sequelize, DataTypes)
    const blog = _blog(sequelize, DataTypes)
    const photo = _photo(sequelize, DataTypes)
    const category = _category(sequelize, DataTypes)

    user.hasMany(blog)
    blog.belongsTo(user)

    user.hasOne(photo)
    photo.belongsTo(user)

    blog.hasOne(photo)
    photo.belongsTo(blog)

    blog.belongsToMany(category, {
        through: 'BlogCategory'
    })

    category.belongsToMany(blog, {
        through: 'BlogCategory'
    })

    blog.belongsToMany(tag, {
        through: 'BlogTag'
    })

    tag.belongsToMany(blog, {
        through: 'BlogTag'
    })

    return {
        tag,
        user,
        blog,
        photo,
        category
    }
}

module.exports = { initModels }
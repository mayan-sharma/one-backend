module.exports = function(db, DataTypes) {
    const Blog = db.define('Blog', {
        title: {
            type: DataTypes.STRING,
            validate: {
                min: 3,
                max: 120
            },
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            validate: {
                min: 200,
                max: 2000000
            },
            allowNull: false
        },
        excerpt: {
            type: DataTypes.STRING,
            validate: {
                max: 1000
            },
            allowNull: true
        },
        metaTitle: {
            type: DataTypes.STRING
        },
        metaDesc: {
            type: DataTypes.STRING
        },
        photo: {
            type: DataTypes.BLOB
        }
    });

    return Blog;
}
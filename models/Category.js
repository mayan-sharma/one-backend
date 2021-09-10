module.exports = function(db, DataTypes) {
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

    return Category;
}
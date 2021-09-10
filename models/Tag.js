module.exports = function(db, DataTypes) {
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

    return Tag;
}
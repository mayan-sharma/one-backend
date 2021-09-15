module.exports = function(db, DataTypes) {
    const Photo = db.define('Photo', {
        data: {
            type: DataTypes.BLOB
        },
        contentType: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Photo;
}
const bcrypt = require('bcrypt');

module.exports = function(db, DataTypes) {
    const User = db.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo: {
            type: DataTypes.BLOB,
            allowNull: true
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });
    
    User.prototype.comparePassword = async function(password) {
        try {
            const isValid = await bcrypt.compare(password, this.password);
            return isValid;
    
        } catch(err) {
            console.error(err);
        }
    }
    
    User.beforeSave(async user => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;
    
        } catch (err) {
            console.error(err);
        }
    });

    return User;
}
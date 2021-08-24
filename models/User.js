const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const db = require('../config/postgres');

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
        type: DataTypes.NUMBER,
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING,
    }
});

User.genSalt = () => Math.round(new Date().valueOf() * Math.random()) + '';

User.prototype.hashPassword = async password => {
    try {
        const hashedPassword = await bcrypt.hash(password, this.salt);
        return hashedPassword;

    } catch (err) {
        console.error(err);
    }
} 

User.prototype.comparePassword = async password => {
    try {
        const hashedPassword = await hashPassword(password, this.salt);
        return hashedPassword === this.password;
    
    } catch(err) {
        console.error(err);
    }
}

User.beforeSave(async user => {
    try {
        const salt = user.genSalt();
        const hashedPassword = await user.hashPassword(user.password, salt);
        user.salt = salt;
        user.password = hashedPassword;

    } catch (err) {
        console.error(err);
    }
});

module.exports = User;
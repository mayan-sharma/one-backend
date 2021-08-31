const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const User = require('../models/User');
const config = require('../config/config');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });

        if (user) {
            return res.status(400).json({
                message: 'User already exists!'
            })
        }

        const username = shortId.generate();
        const role = 1;

        await User.create({
            name, email, password, username, role
        });

        res.status(200).json({
            message: 'User successfully registered!',
            user: { username, name, email }
        })

    } catch (err) {
        console.error(err);
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or password!'
            });
        }
       
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'Invalid email or password!'
            });
        }

        const token = jwt.sign({ id: user.id }, config.JWT_SECRET);
 
        res.cookie('token', token);
        res.status(200).json({
            message: 'User logged in successfully!',
            user: { id: user.id, username: user.username, email: user.email },
            token
        })

    } catch (err) {

    }
}

exports.logout = () => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Logged out successfully!'
    })
}
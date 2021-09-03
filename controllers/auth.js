const shortId = require('shortid');
const jwt = require('jsonwebtoken');

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

        await User.create({
            name, email, password, username
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
            user: { id: user.id, username: user.username, email: user.email, role: user.role },
            token
        })

    } catch (err) {
        console.error(err);
    }
}

exports.logout = () => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Logged out successfully!'
    });
}

exports.getUser = (req, res) => {
    return res.status(200).json({
        message: 'User fetched successfully!',
        user: req.user
    })
}

exports.isAuth = async (req, res, next) => {
    try {
        let token = null;
        const authHeader = req.header('Authorization');
        if (authHeader?.startsWith('Bearer')) {
            token = authHeader.substring(7, authHeader.length);
        }

        if (!token) return res.status(401).json({
            message: 'Access Denied!'
        });

        const payload = jwt.verify(token, config.JWT_SECRET);

        const user = await User.findOne({ where: { id: payload.id } }); 

        if (!user) return res.status(400).json({
            message: 'Invalid token!'
        });

        req.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        };
        next();

    } catch (err) {
        console.error(err);
    }
}

exports.isAdmin = async (req, res, next) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 1) {
            return res.status(403).json({
                message: 'Forbidden!'
            });
        }
        next();

    } catch (err) {
        console.error(err);
    }
}
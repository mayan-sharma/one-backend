const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

const db = require('../models');
const config = require('../config/config');
const errorHandler = require('../lib/errorHandler');
const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = require('../config/config');

sgMail.setApiKey(SENDGRID_API_KEY);

const User = db.User;
const Blog = db.Blog;
const Category = db.Category;
const Tag = db.Tag;
const Photo = db.Photo;

exports.preRegister = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });

        if (user) {
            return res.status(400).json({
                message: 'User already exists!'
            });
        }

        const token = jwt.sign({ name, email, password }, config.JWT_PRE_REGISTER_SECRET, { expiresIn: '1d' });

        const emailData = {
            to: email,
            from: config.EMAIL_FROM,
            subject: `Account activation link | one`,
            html: `
                <h4>Please use the following link to activate your account</h4>
                <p>${config.CLIENT_URL}/auth/activate/${token}</p>
            `
        }

        await sgMail.send(emailData);

        return res.status(200).json({
            message: 'Account activation link has been sent to email!'
        });

    } catch (err) {
        errorHandler(res, err);
    }
}

exports.register = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                message: 'Token required to register user!'
            });
        }

        const { name, email, password } = jwt.verify(token, config.JWT_PRE_REGISTER_SECRET);

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
        errorHandler(res, err);
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
        errorHandler(res, err);
    }
}

exports.logout = (req, res) => {
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

exports.getPublicProfile = async (req, res) => {
    try {
        const username = req.params.username;
        
        let user = await User.findOne({
            where: { username },
            attributes: ['id', 'username', 'name', 'email']
        });
        
        if (!user) return res.status(404).json({
            message: 'User not found!'
        });
        
        const blogs = await Blog.findAll({
            include: [
                { model: User, where: { id: user.id } },
                { model: Category },
                { model: Tag }
            ]
        });

        return res.status(200).json({
            message: 'Public profile fetched successfully!',
            user,
            blogs
        });

    } catch (err) {
        errorHandler(res, err);
    }
}

exports.update = async (req, res) => {
    console.log(req.user);
    try {
        let form = new formidable.IncomingForm();
        const { fields, files } = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ fields, files });
            });
        });

        let user = await User.findOne({ where: { id: req.user.id } });
        user = _.merge(user, fields);
        
        let photo = {};
        if (files.photo) {
            // 1mb
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    message: 'Image should be less than 1mb'
                });
            }
            photo.data = fs.readFileSync(files.photo.path);
            photo.contentType = files.photo.type;
        }

        await db.transaction(async transaction => {
            try {
                await user.save({ transaction });
                if (photo.data) {
                    if (user.getPhoto()) {
                        const photoInstance = await Photo.build(photo, { transaction });
                        await user.setPhoto(photoInstance, { transaction });
                    }
                    else {
                        await user.createPhoto(photo, { transaction });
                    }
                }

            } catch (err) {
                errorHandler(res, err);
            }
        });

        return res.status(200).json({
            message: 'User updated successfully!'
        });

    } catch (err) {
        errorHandler(res, err);
    } 
}

exports.photo = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ where: { username } });

        if (!user) return res.status(404).json({
            message: 'No user found!'
        });

        const photo = await Photo.findOne({ where: { UserId: user.id } });

        if (!photo) return res.status(404).json({
            message: 'Photo not found!'
        });

        res.set('Content-Type', photo.contentType)
        return res.send(photo.data);

    } catch (err) {
        errorHandler(res, err);
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(404).json({
            message: 'No user with this email!'
        });

        const token = jwt.sign({ id: user.id }, config.JWT_PASSWORD_RESET_SECRET, { expiresIn: '10m' });

        const emailData = {
            to: email,
            from: config.EMAIL_FROM,
            subject: `Password Reset Link - one`,
            html: `
                <h4>Please use the following link to reset your account's password</h4>
                <p>${config.CLIENT_URL}/auth/password/reset/${token}</p>
            `
        }

        await sgMail.send(emailData);

        return res.status(200).json({
            message: 'Reset password link sent to mail!'
        });

    } catch (err) {
        errorHandler(res, err);
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        const payload = jwt.verify(token, config.JWT_PASSWORD_RESET_SECRET);
        
        let user = await User.findOne({ where: { id: payload.id } });

        if (!user) return errorHandler(res, err);
        user = _.extend(user, { password });

        await user.save();

        return res.status(200).json({
            message: 'Password updated successfully!'
        });

    } catch (err) {
        errorHandler(res, err);
    }
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
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role
        };
        next();

    } catch (err) {
        errorHandler(res, err);
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
        errorHandler(res, err);
    }
}
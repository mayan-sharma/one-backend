const { check } = require('express-validator');

exports.userRegisterValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required!'),
    check('email')
        .isEmail()
        .withMessage('Invalid email!'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be atleast 6 characters long!')
];

exports.userLoginValidator = [
    check('email')
        .isEmail()
        .withMessage('Invalid email!'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be atleast 6 characters long!')
];

exports.forgotPasswordValidator = [
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Invalid email!'),
];

exports.resetPasswordValidator = [
    check('password')
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must be atleast 6 characters long!')
];
const express = require('express');

const authController = require('../controllers/auth');
const { runValidation } = require('../validators');
const { userRegisterValidator, userLoginValidator, forgotPasswordValidator, resetPasswordValidator } = require('../validators/auth');

const router = express.Router();    

router.post('/register', userRegisterValidator, runValidation, authController.register);
router.post('/login', userLoginValidator, runValidation, authController.login);

router.get('/logout', authController.logout);
router.get('/:username', authController.getPublicProfile);
router.get('/photo/:username', authController.photo);
router.get('/', authController.isAuth, authController.getUser);

router.put('/update', authController.isAuth, authController.update);
router.put('/forgot-password', forgotPasswordValidator, runValidation, authController.forgotPassword);
router.put('/reset-password', resetPasswordValidator, runValidation, authController.resetPassword);

module.exports = router;    
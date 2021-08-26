const express = require('express');

const authController = require('../controllers/auth');
const { runValidation } = require('../validators');
const { userRegisterValidator, userLoginValidator } = require('../validators/auth');

const router = express.Router();    

router.post('/register', userRegisterValidator, runValidation, authController.register);
router.post('/login', userLoginValidator, runValidation, authController.login);
router.get('/logout', authController.logout);

module.exports = router;
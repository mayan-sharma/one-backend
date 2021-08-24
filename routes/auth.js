const express = require('express');

const authController = require('../controllers/auth');
const { runValidation } = require('../validators');
const { userRegisterValidator } = require('../validators/auth');

const router = express.Router();    

router.get('/register', userRegisterValidator, runValidation, authController.register);

module.exports = router;
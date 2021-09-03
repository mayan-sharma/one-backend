const express = require('express');

const categoryController = require('../controllers/category');
const { isAuth, isAdmin } = require('../controllers/auth');
const { runValidation } = require('../validators');
const { categoryCreateValidator } = require('../validators/category');

const router = express.Router();    

router.post('/', categoryCreateValidator, runValidation, isAuth, isAdmin, categoryController.create);

module.exports = router;
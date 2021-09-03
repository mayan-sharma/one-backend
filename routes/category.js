const express = require('express');

const categoryController = require('../controllers/category');
const { isAuth, isAdmin } = require('../controllers/auth');
const { runValidation } = require('../validators');
const { categoryCreateValidator } = require('../validators/category');

const router = express.Router();    

router.post('/', categoryCreateValidator, runValidation, isAuth, isAdmin, categoryController.create);
router.get('/', categoryController.getAll);
router.get('/:slug', categoryController.getBySlug);
router.delete('/:slug', isAuth, isAdmin, categoryController.remove);

module.exports = router;
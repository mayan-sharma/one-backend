const express = require('express');

const tagController = require('../controllers/tag');
const { isAuth, isAdmin } = require('../controllers/auth');
const { runValidation } = require('../validators');
const { tagCreateValidator } = require('../validators/tag');

const router = express.Router();    

router.post('/', tagCreateValidator, runValidation, isAuth, isAdmin, tagController.create);
router.get('/', tagController.getAll);
router.get('/:slug', tagController.getBySlug);
router.delete('/:slug', isAuth, isAdmin, tagController.remove);

module.exports = router;
const express = require('express');

const blogController = require('../controllers/blog');
const { isAuth, isAdmin } = require('../controllers/auth');

const router = express.Router();    

router.post('/', isAuth, blogController.create);
router.get('/', blogController.getAll);
router.get('/:slug', blogController.getBySlug);
router.delete('/:slug', isAuth, isAdmin, blogController.remove);
router.put('/:slug', isAuth, isAdmin, blogController.update);
router.get('/photo/:slug', blogController.photo);

module.exports = router;
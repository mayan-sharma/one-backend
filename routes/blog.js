const express = require('express');

const blogController = require('../controllers/blog');
const { isAuth, isAdmin } = require('../controllers/auth');

const router = express.Router();    

router.get('/blogs-categories-tags', blogController.getAllWithCategoriesAndTags);
router.get('/photo/:slug', blogController.photo);
router.get('/search/:term', blogController.search);
router.get('/related/:slug', blogController.getRelated);
router.get('/:slug', blogController.getBySlug);
router.get('/user/:username', blogController.getBlogsOfUser);
router.get('/', blogController.getAll);

router.post('/', isAuth, blogController.create);

// for admin
router.delete('/:slug', isAuth, isAdmin, blogController.remove);
router.put('/:slug', isAuth, isAdmin, blogController.update);

module.exports = router;
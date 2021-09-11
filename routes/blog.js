const express = require('express');

const blogController = require('../controllers/blog');
const { isAuth } = require('../controllers/auth');

const router = express.Router();    

router.post('/', isAuth, blogController.create);

module.exports = router;
const express = require('express');

const blogRouter = require('./blog');
const authRouter = require('./auth');
const categoryRouter = require('./category');

const router = express.Router();

router.use('/blog', blogRouter);
router.use('/auth', authRouter);
router.use('/category', categoryRouter);

module.exports = router;
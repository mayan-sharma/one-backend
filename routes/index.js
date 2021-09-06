const express = require('express');

const blogRouter = require('./blog');
const authRouter = require('./auth');
const categoryRouter = require('./category');
const tagRouter = require('./tag');

const router = express.Router();

router.use('/blog', blogRouter);
router.use('/auth', authRouter);
router.use('/category', categoryRouter);
router.use('/tag', tagRouter);

module.exports = router;
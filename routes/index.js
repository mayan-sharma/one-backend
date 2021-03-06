const express = require('express');

const blogRouter = require('./blog');
const authRouter = require('./auth');
const categoryRouter = require('./category');
const tagRouter = require('./tag');
const formRouter = require('./form');

const router = express.Router();

router.use('/blogs', blogRouter);
router.use('/auth', authRouter);
router.use('/categories', categoryRouter);
router.use('/tags', tagRouter);
router.use('/contact', formRouter);

module.exports = router;
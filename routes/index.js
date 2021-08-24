const express = require('express');

const blogRouter = require('./blog');
const authRouter = require('./auth');

const router = express.Router();

router.use('/blog', blogRouter);
router.use('/auth', authRouter);

module.exports = router;
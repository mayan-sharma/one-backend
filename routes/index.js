const express = require('express');

const blogRouter = require('./blog');
const userRouter = require('./user');

const router = express.Router();

router.use('/blog', blogRouter);
router.use('/user', userRouter);

module.exports = router;
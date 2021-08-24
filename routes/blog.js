const express = require('express');

const testRoute = require('../controllers/blog');

const router = express.Router();    

router.get('/', testRoute);

module.exports = router;
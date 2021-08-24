const express = require('express');

const testRoute = require('../controllers/user');

const router = express.Router();    

router.get('/', testRoute);

module.exports = router;
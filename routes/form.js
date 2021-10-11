const express = require('express');

const formController = require('../controllers/form');
const { runValidation } = require('../validators');
const { contactFormValidator } = require('../validators/form');

const router = express.Router();    

router.post('/', contactFormValidator, runValidation, formController.contact);

module.exports = router;

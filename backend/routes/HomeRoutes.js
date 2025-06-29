const express = require('express');
const bodyParser = require('body-parser');
const HomeController = require('../controllers/HomeController'); // Adjust the path as necessary

const router = express.Router();

router.get('/', HomeController.SayHello);

module.exports = router;
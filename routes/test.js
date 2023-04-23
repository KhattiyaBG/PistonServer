const express = require('express');

const router = express.Router();
const testContollers = require('../controllers/test');

router.get('/', testContollers.getTest);

module.exports = router;
const express = require('express');

const router = express.Router();
const { summaryHandler } = require('./summaryhandler');

/* summary api. */
router.get('/', summaryHandler);

module.exports = router;

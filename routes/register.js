const express = require('express');
const { registerHandler } = require('./registerhandler');

const router = express.Router();

/* Registration api. */
router.post('/', registerHandler);

module.exports = router;

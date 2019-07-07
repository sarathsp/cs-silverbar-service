const express = require('express');

const { cancelHandler } = require('./cancelhandler');

const router = express.Router();

/* cancel api. */
router.post('/', cancelHandler);

module.exports = router;

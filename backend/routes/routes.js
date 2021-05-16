const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

// router.get('/list/:id', controllers.getListForId);
router.get('/test', controllers.getTest);

module.exports = router;

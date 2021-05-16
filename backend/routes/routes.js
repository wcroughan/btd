module.exports = function (db) {
    const express = require('express');
    const router = express.Router();
    const controllers = require('./../controllers/controllers')(db);

    router.get('/list/:id', controllers.getListsForId);
    router.get('/test', controllers.getTest);

    return router;

}

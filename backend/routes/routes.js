module.exports = function (db) {
    const express = require('express');
    const router = express.Router();
    const controllers = require('./../controllers/controllers')(db);

    router.get('/test', controllers.getTest);
    router.get('/list/:id', controllers.getListsForId);
    router.put('/list/:id', controllers.pushListToServer);

    return router;
}

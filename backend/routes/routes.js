module.exports = function (db) {
    const express = require('express');
    const router = express.Router();
    const controllers = require('./../controllers/controllers')(db);

    router.get('/test', controllers.getTest);
    router.get('/daysinfo', controllers.getDaysInfo);
    router.get('/streaklength', controllers.getStreakLength);

    router.get('/items', controllers.getItems);
    router.get('/pastitems', controllers.getPastItems);
    router.put('/item', controllers.pushItemToServer);
    router.delete('/item/:id', controllers.deleteItemFromServer);

    return router;
}

module.exports = function (db) {
    const express = require('express');
    const router = express.Router();
    const controllers = require('./../controllers/controllers')(db);

    router.get('/test', controllers.getTest);
    router.get('/daysinfo', controllers.getDaysInfo);

    router.get('/items', controllers.getItems);
    router.get('/pastitems', controllers.getPastItems);
    router.get('/streak', controllers.getStreakInfo);
    router.put('/item', controllers.pushItemToServer);
    router.put('/item/:id', controllers.updateItem);
    router.put('/itemorder', controllers.pushOrderToServer);
    router.delete('/item/:id', controllers.deleteItemFromServer);

    return router;
}

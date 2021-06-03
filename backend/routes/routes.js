module.exports = function (db) {
    const express = require('express');
    const router = express.Router();
    const controllers = require('./../controllers/controllers')(db);

    router.get('/test', controllers.getTest);
    router.get('/list/:id', controllers.getListsForId);
    router.get('/list/default/:id', controllers.getDefaultList);
    router.get('/daysinfo', controllers.getDaysInfo);
    router.get('/streaklength', controllers.getStreakLength);
    router.put('/list/:id', controllers.pushListToServer);
    router.put('/list/append_item/:id', controllers.appendItem);
    router.delete('/list/:id', controllers.deleteListFromServer);

    router.get('/items', controllers.getItems);
    router.put('/item', controllers.pushItemToServer);
    router.delete('/item/:id', controllers.deleteItemFromServer);

    return router;
}

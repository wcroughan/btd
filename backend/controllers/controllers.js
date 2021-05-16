const date_util = require('./../../client/src/utility/date_util.js');

module.exports = function (db) {
    return {
        getTest(req, res, next) {
            res.status(200).json({
                body: "Becca is great!!!"
            })
        },
        getListsForId(req, res, next) {
            console.log(req.params);
            const id1 = "day_" + req.params.id;
            // const id2 = "week_" + req.params.id;

            const filterDetail = {
                id: id1
            };
            db.collection("days_info").findOne(filterDetail, (err, item) => {
                if (err) {
                    console.log("Couldn't get item from mongo");
                    console.log(err);
                    res.send({ 'error': "error occured" });
                } else {
                    console.log("got item from mongo", item);
                    res.status(200).json(item);
                }
            })
        }
    }

}
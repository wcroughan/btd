const date_util = require('./../../client/src/utility/date_util.js');

module.exports = function (db) {
    return {
        getTest(req, res, next) {
            res.status(200).json({
                body: "Becca is great!!!"
            })
        },
        async getListsForId(req, res, next) {
            // console.log(req.params);
            const id1 = "day_" + req.params.id;
            const id2 = "week_" + date_util.apiDateStr(date_util.getMonday(date_util.getDateFromIdStr(req.params.id)));
            // console.log("searching for ", id1, id2)

            const filterDetail = {
                id: {
                    $in: [id1, id2]
                }
            };

            const cursor = await db.collection("lists").find(filterDetail).sort({ id: 1 });
            const results = await cursor.toArray();
            // console.log("got from mongo: ", results);
            res.status(200).json(results);
        },
        async pushListToServer(req, res, next) {
            console.log(req.params, req.body);

            const entryVar = req.body;
            delete entryVar._id;
            const entry = {
                $set: {
                    ...entryVar
                }
            }
            const options = {
                upsert: true
            }
            await db.collection("lists").updateOne(req.params, entry, options)

            res.status(200).json({ success: true });
        }
    }

}
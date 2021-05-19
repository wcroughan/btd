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
            console.log(results);

            if (results.length === 2) {
                console.log("got both lists, returning the following:", results);
                res.status(200).json(results);
                return;
            }
            const needIds = [];
            if (!results.some((r) => r.id.includes("week_")))
                needIds.push("week_default");
            if (!results.some((r) => r.id.includes("day_")))
                needIds.push("day_default");
            const defaultDetail = {
                id: {
                    $in: needIds
                }
            };

            const day_start = date_util.getDateFromIdStr(req.params.id);
            const day_end = date_util.tomorrow(day_start);
            const week_start = date_util.getMonday(day_start);
            const week_end = date_util.plusOneWeek(week_start);

            const defaultcursor = await db.collection("lists").find(defaultDetail);
            const defaultresults = await defaultcursor.toArray();
            defaultresults.forEach(element => {
                if (element.id.includes("day_")) {
                    element.start = day_start;
                    element.end = day_end;
                    delete element._id;
                    element.id = id1;
                } else if (element.id.includes("week_")) {
                    element.start = week_start;
                    element.end = week_end;
                    delete element._id;
                    element.id = id2;
                }
            });
            const resArray = defaultresults.concat(results).sort((a, b) => (a.id > b.id) ? 1 : -1);
            console.log("got default lists, returning the following:", resArray);
            res.status(200).json(resArray);

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
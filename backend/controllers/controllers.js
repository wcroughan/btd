const date_util = require('./../../client/src/utility/date_util.js');
const _ = require('underscore')
const misc_util = require('./../../client/src/utility/misc_util.js')

module.exports = function (db) {
    isSkippedByDefault = function (date) {
        return date.getDay() === 6 || date.getDay() === 0;
    };

    getDefaultListInternal = async function (userid, listid, callback) {
        // console.log("looking for default list for userid", userid, ", listid", listid, "and callback", callback);
        const datestr = listid.split("_")[1];
        const type = listid.split("_")[0];

        const detail = {
            id: type + "_default",
            userid
        };
        let start;
        let end;
        if (type === "day") {
            start = date_util.getDateFromIdStr(datestr);
            end = date_util.tomorrow(start);
        } else if (type === "week") {
            start = date_util.getMonday(date_util.getDateFromIdStr(datestr));
            end = date_util.plusOneWeek(start);
        } else {
            console.log("unknown type", type);
            return;
        }

        if (callback === undefined) {
            let item = await db.collection("lists").findOne(detail);
            if (item === null) {
                item = {
                    items: [],
                }
            }
            delete item._id;
            item.id = listid;
            item.start = start;
            item.end = end;
            item.userid = userid;
            item.isDone = item.items.length === 0;
            item.isSkipped = isSkippedByDefault(start);
            // console.log("returning default item:", item)
            return item;
        } else {
            db.collection("lists").findOne(detail, (err, item) => {
                if (err) {
                    console.log(err);
                    callback(err, { 'error': "error occured" });
                } else {
                    if (item === null) {
                        item = {
                            items: [],
                        }
                    }
                    delete item._id;
                    item.id = listid;
                    item.start = start;
                    item.end = end;
                    item.userid = userid;
                    item.isDone = item.items.length === 0;
                    item.isSkipped = isSkippedByDefault(start);
                    // console.log("running callback with default item:", item)
                    callback(false, item);
                }
            });
        }
    };

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
                },
                userid: req.uid
            };

            const cursor = await db.collection("lists").find(filterDetail).sort({ id: 1 });
            const results = await cursor.toArray();
            // console.log(results);

            if (results.length === 2) {
                // console.log("got both lists, returning the following:", results);
                res.status(200).json(results);
                return;
            }
            const needIds = [];
            // console.log("initial results:", results);
            if (!results.some((r) => r.id.includes("week_"))) {
                const weekList = await getDefaultListInternal(req.uid, id2);
                results.push(weekList);
            }
            if (!results.some((r) => r.id.includes("day_"))) {
                const dayList = await getDefaultListInternal(req.uid, id1);
                results.push(dayList);
            }

            const resArray = results.sort((a, b) => (a.id > b.id) ? 1 : -1);
            // console.log("got default lists, returning the following:", resArray);
            res.status(200).json(resArray);
        },
        async pushListToServer(req, res, next) {
            // console.log(req.params, req.body);

            const entryVar = req.body;
            delete entryVar._id;
            entryVar.userid = req.uid;
            entryVar.start = new Date(entryVar.start)
            entryVar.end = new Date(entryVar.end)
            const entry = {
                $set: {
                    ...entryVar
                }
            }
            const options = {
                upsert: true,
            }
            await db.collection("lists").findOneAndUpdate(req.params, entry, options)

            res.status(200).json({ success: true });
        },
        async appendItem(req, res, next) {
            // console.log("append item", req.params, req.body);
            const id = req.params.id;
            const userid = req.uid;

            let updatedlist = await db.collection("lists").findOne({ id, userid });
            if (updatedlist === null) {
                //Inserting into new list, initialize with default
                updatedlist = await this.getDefaultListInternal(req.uid, id);
            }

            const newitem = req.body;
            newitem.id = misc_util.getUniqueItemId(updatedlist.items);
            updatedlist.items.push(newitem);
            delete updatedlist._id;
            updatedlist.start = new Date(updatedlist.start)
            updatedlist.end = new Date(updatedlist.end)
            const entry = {
                $set: {
                    ...updatedlist
                }
            }
            const config = {
                upsert: true
            }

            // console.log("entry", entry, "id:", id);
            const r = await db.collection("lists").updateOne({ id, userid }, entry, config);
            // console.log(r);
            res.status(200).json({ success: true });
        },
        getDefaultList(req, res, next) {
            this.getDefaultListInternal(req.uid, req.params.id, (err, item) => {
                if (err) {
                    console.log(err);
                    res.send({ 'error': "db error occured" });
                } else {
                    res.status(200).json(item)
                }
            });
        },
        deleteListFromServer(req, res, next) {
            if (req.params.id.includes("default")) {
                console.log("Won't delete default list even when asked");
                res.send({ 'error': "db error occured" });
                return;
            }
            const detail = {
                id: req.params.id,
                userid: req.uid
            }

            db.collection("lists").deleteOne(detail);

        },
        async getDaysInfo(req, res, next) {
            const projection = {
                isDone: 1,
                isSkipped: 1,
                id: 1,
                _id: 0
            }
            console.log(req.query)
            const detail = {
                userid: req.uid,
                start: {
                    $lte: new Date(req.query.d2),
                    $gte: new Date(req.query.d1)
                },
            }
            const dbres = await db.collection("lists").find(detail).project(projection);
            const resArray = await dbres.toArray();
            console.log(resArray);
            res.status(200).json(resArray)
        },
        async getStreakLength(req, res, next) {
            const batch_size = 30;

            const d = new Date(req.query.date);
            d.setHours(0, 0, 0, 0);
            const projection = {
                isDone: 1,
                isSkipped: 1,
                end: 1,
                id: 1,
                _id: 0
            }

            const d1 = new Date(d);
            let d2 = new Date(d);
            d2.setDate(d2.getDate() - batch_size)
            let resArray;
            let len = 0;
            let todayGood;

            const todayDetail = {
                userid: req.uid,
                start: d
            }
            const today = await db.collection("lists").findOne(todayDetail);
            if (today === null) {
                todayGood = isSkippedByDefault(d);
            } else {
                todayGood = today.isDone || today.isSkipped;
                if (!today.isSkipped && today.isDone) len++;
            }

            const weekstart = date_util.getMonday(d);
            const weekend = date_util.plusOneWeek(weekstart);
            const thisweekDetail = {
                userid: req.uid,
                start: weekstart,
                end: weekend
            }
            const thisweek = await db.collection("lists").findOne(thisweekDetail);
            if (thisweek !== null && thisweek.isDone) {
                len++;
            }

            let cd = new Date(d1);
            let rai = undefined;
            let detail = {
                userid: req.uid,
                end: {
                    $lte: d1,
                    $gt: d2
                },
            }
            // console.log("detail", detail)
            let dbres = await db.collection("lists").find(detail).project(projection).sort({ start: -1 });
            resArray = await dbres.toArray();
            // console.log("resarray", resArray)
            let raidx = 0;
            while (true) {
                // console.log("cd", cd)
                if (cd.getTime() <= d2.getTime()) {
                    d2.setDate(d2.getDate() - batch_size)
                    d1.setDate(d1.getDate() - batch_size)
                    detail = {
                        userid: req.uid,
                        end: {
                            $lte: d1,
                            $gt: d2
                        },
                    }
                    // console.log(detail)
                    dbres = await db.collection("lists").find(detail).project(projection).sort({ start: -1 });
                    resArray = await dbres.toArray();
                    // console.log("resArray", resArray)
                    raidx = 0;
                }
                rai = resArray[raidx];
                if (rai !== undefined && rai.end.getTime() === cd.getTime()) {
                    raidx++;
                    if (rai.isSkipped) {
                        // console.log("Found and skipped")
                    } else if (rai.isDone) {
                        // console.log("Found and done")
                        len++;
                    } else {
                        // console.log("found and streak done")
                        break;
                    }
                } else {
                    const cd_start = new Date(cd);
                    cd_start.setDate(cd.getDate() - 1);
                    if (isSkippedByDefault(cd_start)) {
                        // console.log("not found, skipped")
                    } else {
                        // console.log("not found, not skipped")
                        break;
                    }
                }
                cd.setDate(cd.getDate() - 1);
            }

            res.status(200).json({ len, todayGood })
        }


    }


}
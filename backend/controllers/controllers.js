const date_util = require('./../../client/src/utility/date_util.js');
const _ = require('underscore')
const { convertTimesToDates } = require('./../../client/src/utility/misc_util.js')
var ObjectID = require('mongodb').ObjectID;

Object.defineProperty(global, '__stack', {
    get: function () {
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function (_, stack) { return stack; };
        var err = new Error;
        Error.captureStackTrace(err, arguments.callee);
        var stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    }
});
Object.defineProperty(global, '__line', {
    get: function () {
        return __stack[1].getLineNumber();
    }
});


module.exports = function (db) {
    return {
        async getItems(req, res, next) {
            const detail = {
                userid: req.uid,
                $or: [
                    {
                        isDone: true,
                        doneDate: { $gte: date_util.getToday() }
                    },
                    {
                        isDone: false,
                        displayDate: { $lte: new Date() }
                    }
                ]
            }
            // console.log(__line, detail.$or[1].displayDate.$lte)
            const cursor = await db.collection("items").find(detail).sort({ dueDate: 1 })
            const results = await cursor.toArray();
            // console.log(__line, results);
            // console.log(__line, results[0].displayDate, typeof results[0].displayDate)
            res.status(200).json(results)
        },
        async getPastItems(req, res, next) {
            const detail = {
                userid: req.uid,
                isDone: true,
                doneDate: { $lt: date_util.getToday() }
            }
            // console.log(__line, detail.$or[1].displayDate.$lte.getTime())
            const cursor = await db.collection("items").find(detail).sort({ dueDate: 1 })
            const results = await cursor.toArray();
            console.log(__line, results);
            res.status(200).json(results)
        },
        async getUpcomingItems(req, res, next) {
            const detail = {
                userid: req.uid,
                isDone: false,
                doneDate: { $gt: new Date() }
            }
            // console.log(__line, detail.$or[1].displayDate.$lte.getTime())
            const cursor = await db.collection("items").find(detail).sort({ dueDate: 1 })
            const results = await cursor.toArray();
            console.log(__line, results);
            res.status(200).json(results)
        },
        async pushItemToServer(req, res, next) {
            console.log(__line, "push req body:", req.body)
            if (req.body._id !== undefined) {
                //updating an existing item, just delete it first
                const deldetail = {
                    userid: req.uid,
                    _id: ObjectID(req.body._id)
                }
                const delresult = await db.collection("items").deleteOne(deldetail);
                console.log(__line, "deleted", delresult.deletedCount)
            }
            const entryVar = req.body;
            entryVar.userid = req.uid;
            convertTimesToDates(entryVar);
            if (entryVar._id !== undefined) entryVar._id = ObjectID(entryVar._id)
            console.log("adding ", entryVar._id)
            const result = await db.collection("items").insertOne(entryVar);
            console.log(result.insertedId);
            const retid = result.insertedId || "tmpval";

            res.status(200).json({ id: retid });
        },
        async deleteItemFromServer(req, res, next) {
            const detail = {
                _id: ObjectID(req.params.id),
                userid: ObjectID(req.uid)
            }

            const result = await db.collection("items").deleteOne(detail);
            console.log(__line, result)
            console.log(detail)

            res.status(200).json({ success: true });
        },
        async getStreakInfo(req, res, next) {
            const overdueDetail = {
                userid: ObjectID(req.uid),
                isDone: false,
                dueDate: {
                    $lt: new Date()
                }
            }
            const overdueCount = await db.collection("items").countDocuments(overdueDetail);
            console.log(__line, overdueCount);
            if (overdueCount > 0) {
                res.status(200).json({
                    todayGood: false,
                    len: 0
                });
                return;
            }

            const streakInfo = {
                todayGood: true,
                len: 2
            }

            const pipeline = [
                {
                    $match: {
                        userid: ObjectID(req.uid),
                    }
                }, {
                    $project:
                    {
                        doneDate: 1,
                        wasOverdue: {
                            $cmp: [
                                "$doneDate",
                                "$dueDate"
                            ]
                        }
                    }
                }, {
                    $match: {
                        wasOverdue: 1
                    }
                }, {
                    $sort: {
                        'dueDate': -1
                    }
                }, {
                    $limit: 1
                }
            ]
            const result = await db.collection("items").aggregate(pipeline)
            // const resarray = await result.toArray();
            // console.log(__line, resarray)
            const mostRecent = await result.next();
            console.log(__line, mostRecent)
            let t1;
            if (mostRecent === null) {
                //never anything overdue
                const firstItemPipeline = [
                    {
                        $match: {
                            userid: ObjectID(req.uid),
                        }
                    }, {
                        $sort: {
                            doneDate: 1
                        }
                    }, {
                        $limit: 1
                    }
                ]
                const result = await db.collection("items").aggregate(firstItemPipeline)
                const firstItem = await result.next();
                if (firstItem === null) {
                    //edge case of no items
                    streakInfo.len = 0;
                    streakInfo.todayGood = 0;
                    res.status(200).json(streakInfo);
                    return;
                }

                streakInfo.len = date_util.daysBetween(date_util.startOfDay(firstItem.doneDate), date_util.getToday());
            } else {
                streakInfo.len = date_util.daysBetween(date_util.startOfDay(mostRecent.doneDate), date_util.getToday());
            }

            //finally, see if there's anything left to do today
            const todayDetail = {
                userid: ObjectID(req.uid),
                isDone: false,
                dueDate: {
                    $lte: date_util.getTomorrow()
                }
            }
            const todayCount = await db.collection("items").countDocuments(todayDetail);
            console.log(__line, todayCount);
            if (todayCount > 0) {
                streakInfo.todayGood = false;
            } else {
                streakInfo.todayGood = true;
                streakInfo.len++;
            }

            res.status(200).json(streakInfo)
        },
        getTest(req, res, next) {
            res.status(200).json({
                body: "Becca is great!!!"
            })
        },
        async getDaysInfo(req, res, next) {
            // console.log(__line, req.query);
            const projection = {
                isDone: 1,
                isSkipped: 1,
                id: 1,
                _id: 0
            }
            const detail = {
                userid: req.uid,
                start: {
                    $lte: new Date(req.query.d2),
                    $gte: new Date(req.query.d1)
                },
            }
            const dbres = await db.collection("lists").find(detail).project(projection);
            const resArray = await dbres.toArray();
            // console.log(__line, resArray);
            res.status(200).json(resArray)
        },
    }
}
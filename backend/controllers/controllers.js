const date_util = require('./../../client/src/utility/date_util.js');
const _ = require('underscore')
const { convertTimesToDates } = require('./../../client/src/utility/misc_util.js')
var ObjectID = require('mongodb').ObjectID;
const clone = require('just-clone')

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

const REPEAT_ADD_BATCH_SIZE = 20;


module.exports = function (db) {
    getItems = async function (req, res, next) {
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
    }
    getPastItems = async function (req, res, next) {
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
    }
    getUpcomingItems = async function (req, res, next) {
        const detail = {
            userid: req.uid,
            isDone: false,
            displayDate: { $gt: new Date() }
        }
        // console.log(__line, detail.$or[1].displayDate.$lte.getTime())
        const cursor = await db.collection("items").find(detail).sort({ dueDate: 1 })
        const results = await cursor.toArray();
        console.log(__line, results);
        res.status(200).json(results)
    }

    nextItemInRepeatChain = function (item) {
        const ret = clone(item);
        ret.repeatN++;

        if (item.repeatInfo.repeatMode === "everyx") {
            ret.dueDate = date_util.offsetByUnits(item.dueDate, item.repeatInfo.everyx.frequency, item.repeatInfo.everyx.unit);
        } else if (item.repeatInfo.repeatMode === "reponxweekday") {
            ret.dueDate.setDate(1);
            ret.dueDate.setMonth(ret.dueDate.getMonth() + 1);
            const m = ret.dueDate.getMonth();
            const d = date_util.getWeekdayNumber(ret.repeatInfo.xweekday.weekday);
            ret.dueDate.setDay(d)
            if (m !== ret.dueDate.getMonth()) {
                ret.dueDate.setDate(ret.dueDate.getDate() + 7);
            }
            //should now be on first specified weekday of the month after item
            if (ret.repeatInfo.xweekday.x === "2nd")
                ret.dueDate.setDate(ret.dueDate.getDate() + 7);
            else if (ret.repeatInfo.xweekday.x === "3rd")
                ret.dueDate.setDate(ret.dueDate.getDate() + 14);
            else if (ret.repeatInfo.xweekday.x === "4th")
                ret.dueDate.setDate(ret.dueDate.getDate() + 21);
            else if (ret.repeatInfo.xweekday.x === "last") {
                while (ret.dueDate.getMonth() === m)
                    ret.dueDate.setDate(ret.dueDate.getDate() + 7);
                ret.dueDate.setDate(ret.dueDate.getDate() - 7);
            }
        }

        //now set displayDate
        if (ret.repeatInfo.show.showMode === "xunits") {
            ret.displayDate = date_util.offsetByUnits(ret.dueDate, -1 * ret.repeatInfo.show.xunits.x, ret.repeatInfo.show.xunits.unit)
        } else {
            ret.displayDate = new Date(ret.dueDate);
            ret.displayDate.setDay(date_util.getWeekdayNumber(ret.repeatInfo.show.weekday));
            if (ret.displayDate.getTime() > ret.dueDate.getTime())
                ret.displayDate.setDate(ret.displayDate.getDate() - 7);
        }

        return ret;
    }
    pushRepeatingItemToServer = async function (item) {
        //At this point, all update-related things are taken care of. Can just assume I'm adding a new item

        //first upload first item so I have the _id
        const result = await db.collection("items").insertOne(item);
        console.log("repeating root id:", result.insertedId);
        const rootid = result.insertedId;

        const rootUpdateFilter = {
            _id: rootid
        }
        const rootUpdateOperation = {
            $set: {
                repeatRoodId: rootid,
                repeatN: 1
            }
        }
        await db.collection("items").updateOne(rootUpdateFilter, rootUpdateOperation);

        const allUploadItems = [];

        let newItem = clone(item);
        delete newItem._id;
        newItem.repeatRootId = rootid;
        newItem.repeatN = 1;
        let completedChain = false;

        while (true) {
            if (item.repeatInfo.end.endMode === "endafterx" && item.repeatInfo.end.endafterx === newItem.repeatN) {
                completedChain = true;
                break;
            }

            if (allUploadItems.length >= REPEAT_ADD_BATCH_SIZE) {
                break;
            }

            newItem = this.nextItemInRepeatChain(newItem);

            if (item.repeatInfo.end.endMode === "endon" && item.repeatInfo.end.endon.getTime() < newItem.dueDate.getTime()) {
                completedChain = true;
                break;
            }

            allUploadItems.push(newItem);
        }

        //now update server.
        //first update unfinished chain info if needed
        const chainFilter = {
            _id: item.userid
        }
        const chainPushOperation = {
            $push: {
                unfinishedChains: {
                    rootId: rootid,
                    lastCreatedItem: allUploadItems[allUploadItems.length - 1]
                }
            }
        }
        await db.collection("users").updateOne(chainFilter, chainPushOperation);

        //then upload all the created items
        const insertResult = await db.collection("items").insertMany(allUploadItems);
        console.log(insertResult)

        //then return the uploaded ids
        return insertResult.insertedIds;
    }
    pushItemToServer = async function (req, res, next) {
        console.log(__line, "push req body:", req.body)


        if (req.body._id !== undefined) {
            //updating an existing item, delete it first
            const deldetail = {
                userid: req.uid,
                _id: ObjectID(req.body._id)
            }

            // let repeatRootItem = null;
            if (req.body.repeats && req.body.repeatUpdateType === "future") {
                delete deldetail._id;
                deldetail.repeatRootId = req.body.repeatRootId;
                deldetail.repeatIndex = {
                    $gte: req.body.repeatIndex
                }

                const rootDetail = {
                    userid: req.uid,
                    _id: ObjectID(req.body.repeatRootId)
                }
                // repeatRootItem = await db.collection("items").findOne(rootDetail);
                // } else if (req.body.repeats && req.body.repeatUpdateType === "all") {
                //     delete deldetail._id;
                //     deldetail.repeatRootId = req.body.repeatRootId;

                //     const rootDetail = {
                //         userid: req.uid,
                //         _id: ObjectID(req.body.repeatRootId)
                //     }
                //     repeatRootItem = await db.collection("items").findOne(rootDetail);
            }

            const delresult = await db.collection("items").deleteMany(deldetail);
            console.log(__line, "deleted", delresult.deletedCount)

        }

        const entryVar = req.body;
        delete entryVar.repeatUpdateType;
        entryVar.userid = req.uid;
        convertTimesToDates(entryVar);
        if (entryVar._id !== undefined) entryVar._id = ObjectID(entryVar._id)

        if (!req.body.repeats || req.body.repeatUpdateType === "single") {
            console.log("adding ", entryVar._id)
            const result = await db.collection("items").insertOne(entryVar);
            console.log(result.insertedId);
            const retid = result.insertedId || "tmpval";

            res.status(200).json({ id: retid, singleId: true });
            return;
        }

        if (req.body._id === undefined) {
            //adding a new repeating item
            const insertedIds = await this.pushRepeatingItemToServer(entryVar);
            res.status(200).json({ ids: insertedIds, singleId: false });
            return;
        }

        //If this was in unfinished chain, will be replaced if necessary. Delete
        const chainFilter = {
            _id: req.uid
        }
        const chainPullOperation = {
            $pull: {
                unfinishedChains: {
                    rootId: req.body.repeatRoodId
                }
            }
        }
        await db.collection("users").updateOne(chainFilter, chainPullOperation);

        if (req.body.repeatUpdateType === "future") {
            const insertedIds = await this.pushRepeatingItemToServer(entryVar);
            res.status(200).json({ ids: insertedIds, singleId: false });
            return;
        }

        console.log(__line, "couldn't parse item update correctly, nothing was uploaded but some stuff may have been deleted")
        res.status(200).json({ success: false });
    }
    pushOrderToServer = async function (req, res, next) {
        const updateFilter = {
            userid: req.uid,
            _id: req.body._id,
        }
        const updateOperation = {
            $set: {
                displayOrder: req.body.displayOrder
            }
        }

        await db.collection("items").updateOne(updateFilter, updateOperation);

        res.status(200).json({ success: true });
    }
    deleteItemFromServer = async function (req, res, next) {
        const detail = {
            _id: ObjectID(req.params.id),
            userid: ObjectID(req.uid)
        }

        const result = await db.collection("items").deleteOne(detail);
        console.log(__line, result)
        console.log(detail)

        res.status(200).json({ success: true });
    }
    getStreakInfo = async function (req, res, next) {
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
    }
    getTest = function (req, res, next) {
        res.status(200).json({
            body: "Becca is great!!!"
        })
    }
    getDaysInfo = async function (req, res, next) {
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
    }
    return {
        getItems,
        getPastItems,
        getUpcomingItems,
        pushItemToServer,
        pushOrderToServer,
        deleteItemFromServer,
        getStreakInfo,
        getTest,
        getDaysInfo
    };

}
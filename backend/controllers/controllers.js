const date_util = require('./../../client/src/utility/date_util.js');
const _ = require('underscore')
const { convertTimesToDates } = require('./../../client/src/utility/misc_util.js')
var ObjectID = require('mongodb').ObjectID;
const clone = require('just-clone');
const { updateDateFromTimeInputStr } = require('./../../client/src/utility/date_util.js');

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
        console.log(__line, item);
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
                repeatRootId: rootid,
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
        console.log(__line, "adding new item:", req.body);

        if (req.body._id !== undefined) {
            console.log(__line, "_id Shouldn't be defined here!")
            return;
        }

        const entryVar = req.body;
        entryVar.userid = req.uid;
        convertTimesToDates(entryVar);

        if (!req.body.repeats) {
            const result = await db.collection("items").insertOne(entryVar);
            console.log(result.insertedId);
            const retid = result.insertedId || "tmpval";

            res.status(200).json({ id: retid, singleId: true });
            return;
        }

        //adding a new repeating item
        const insertedIds = await this.pushRepeatingItemToServer(entryVar);
        res.status(200).json({ ids: insertedIds, singleId: false });
    }
    extendChain = async function (id) {
        //first get the item with _id === id
        //Use repeatN+1 from that item as a starting point, generate future items and add them all. Then update chain if unfinished
    }
    updateItem = async function (req, res, next) {
        const runSimpleSingleUpdate = function () {
            const singleFilt = {
                _id: ObjectID(req.query.id),
                userid: ObjectID(req.uid)
            }
            const entryVar = {
                $set: {
                    ...req.body
                }
            }

            delete entryVar.$set._id;
            delete entryVar.$set.repeatUpdateType;
            delete entryVar.$set.userid;
            delete entryVar.$set.updateType;

            const rssupres = await db.collection("items").updateOne(singleFilt, entryVar);
            console.log(__line, rssupres)
        }

        if (req.body.updateType === "isdone" || req.body.updateType === "snooze" || req.body.repeatUpdateType === "single") {
            runSimpleSingleUpdate();
            res.status(200).json({ success: true });
            return;
        }

        console.log("TODO: replace this with internal getter for items which fills in gaps based on repeatroot info")
        const item = await db.collection("items").findOne({ _id: ObjectID(req.query.id), userid: ObjectID(req.uid) });
        console.log(__line, item)
        if (!item.repeats && req.body.repeats !== true) {
            runSimpleSingleUpdate();
            res.status(200).json({ success: true });
            return;
        }

        const updateRootToEndHere = function () {
            const rootfilt = {
                _id: ObjectID(item.repeatRootId),
                userid: ObjectID(req.uid),
            }

            const newRepeatInfo = item.repeatInfo;
            if (item.repeatInfo.end.endMode === "endnever") {
                newRepeatInfo.end.endMode = "endon";
            }

            if (newRepeatInfo.end.endMode === "endafterx") {
                newRepeatInfo.end.endafterx = item.repeatN;
            } else if (newRepeatInfo.end.endMode === "endon") {
                newRepeatInfo.end.endon = item.dueDate;
            }
            const rootUpdateOp = {
                repeatInfo: newRepeatInfo
            }

            const rootres = await db.collection("items").updateOne(rootfilt, rootUpdateOp);
            console.log(__line, rootres)
        }

        if (item.repeats && req.body.repeats === false) {
            //cancelling repeat
            let rootid = req.query.id;
            if (item.repeatN !== 1) {
                //cancelling from partway down the chain. Update root to end here
                updateRootToEndHere();
                rootid = item.repeatRootId;

                //now pass through rest of update, but take out things that are taken care of by the root update
                delete req.body.repeatInfo;
                delete req.body.repeats;
            }

            runSimpleSingleUpdate();

            //now delete all future items
            const delfilt = {
                repeatRootId: ObjectID(rootid),
                userid: ObjectID(req.uid),
                repeatN: {
                    $gt: item.repeatN
                }
            }
            const delres = await db.collection("items").deleteMany(delfilt)
            console.log(__line, delres)

            //also check unfinished chains
            const chainFilter = { _id: ObjectID(item.userid) }
            const chainPushOperation = {
                $pull: {
                    unfinishedChains: { rootId: ObjectID(item.repeatRootId), }
                }
            }
            const chainres = await db.collection("users").updateOne(chainFilter, chainPushOperation);
            console.log(__line, chainres)

            res.status(200).json({ success: true });
            return;
        }

        if (req.body.repeats === true && !item.repeats) {
            runSimpleSingleUpdate();
            extendChain(item._id);

            res.status(200).json({ success: true });
            return;
        }

        //If you've made it this far, batman, you know the update applies to all future items, and it was and is still a repeating item
        let rootid = req.query.id;
        if (item.repeatN !== 1) {
            updateRootToEndHere();
            rootid = item.repeatRootId;
        }

        //check if chain was unfinished, if so get last item's repeatN
        const userFilter = { _id: ObjectID(item.userid) }
        const user = await db.collection("users").findOne(userFilter);
        const thisChain = user.unfinishedChains.find(c => c.rootId === rootid);
        let ufcLastItemN;
        if (thisChain !== undefined) ufcLastItemN = thisChain.lastCreatedItem.repeatN;

        //now loop through items starting with this one, update each
        allUpdatePromises = []
        let newN = 1;
        let oldN = item.repeatN;
        while (true) {
            //update
            const updateFilt = {
                userid: ObjectID(req.uid),
                repeatRootId: ObjectID(rootid),
                repeatN: oldN,
            }
            const updateOp = {

            }
            console.log("TODO: populate op, run update, check other possible ending conditions (endon, endafterx)")

            //check end conditions
            if (oldN === ufcLastItemN)
                break;

            newN++;
            oldN++;
        }

        if (ufcLastItemN !== undefined) {
            //update last item in chain
            //(can add this to promise array)
        }

        //collect all promises and resolve them
        const allUpdateRes = await Promise.all(allUpdatePromises);
        console.log(__line, allUpdateRes)

        //and we're done!
        res.status(200).json({ success: true });
        return;
    }
    updateItemField = async function (updateField, fullBody, item) {
        const singleFilt = {
            userid: ObjectID(item.userid),
            _id: ObjectID(fullBody._id)
        }

        const futureFilt = {
            userid: ObjectID(item.userid),
            repeatRootId: item.repeatRootId,
            repeatN: {
                $gte: item.repeatN
            }
        }

        const allFilt = {
            userid: ObjectID(item.userid),
            repeatRootId: item.repeatRootId,
        }

        if (updateField === "isDone") {
            const res = await db.collection("items").updateOne(singleFilt, { isDone: fullBody.isDone })
            return "";
        }
        if (updateField === "doneDate") {
            const res = await db.collection("items").updateOne(singleFilt, { doneDate: (new Date(fullBody.doneDate)).getTime() })
            return "";
        }
        if (updateField === "snoozedOnDate") {
            const res = await db.collection("items").updateOne(singleFilt, { snoozedOnDate: fullBody.snoozedOnDate.getTime() })
            return "";
        }

        if (updateField === "dueDateMode") {
            let f = singleFilt;
            if (fullBody.repeatUpdateType === "future") f = futureFilt;
            if (fullBody.repeatUpdateType === "all") f = allFilt;
            const res = await db.collection("items").updateMany(f, { dueDateMode: fullBody.dueDateMode })
            return "";
        }
        if (updateField === "text") {
            let f = singleFilt;
            if (fullBody.repeatUpdateType === "future") f = futureFilt;
            if (fullBody.repeatUpdateType === "all") f = allFilt;
            const res = await db.collection("items").updateMany(f, { text: fullBody.text })
            return "";
        }

        if (updateField === "dueDate") {
            const diff = (new Date(fullBody.dueDate)).getTime() - (new Date(item.dueDate)).getTime();
            let f = singleFilt;
            if (fullBody.repeatUpdateType === "future") f = futureFilt;
            if (fullBody.repeatUpdateType === "all") f = allFilt;
            const res = await db.collection("items").updateMany(f, { dueDate: { $inc: diff } })
            return "";
        }

        if (updateField === "displayDate") {
            console.log(__line, "UNIMPLEMENTED")
            return "";
        }
        if (updateField === "createdDate") {
            console.log(__line, "UNIMPLEMENTED")
            return "";
        }
        if (updateField === "userid") {
            console.log(__line, "UNIMPLEMENTED")
            return "";
        }
        if (updateField === "repeatRootId") {
            console.log(__line, "UNIMPLEMENTED")
            return "";
        }
        if (updateField === "repeatN") {
            console.log(__line, "UNIMPLEMENTED")
            return "";
        }
        if (updateField === "overrideRepeat") {
            console.log(__line, "UNIMPLEMENTED")
            return "";
        }

        if (updateField === "repeats") {
            if (item.repeats === true && fullBody.repeats === false) {
                const res = await db.collection("items").updateOne(singleFilt, { repeats: false })
                const f = futureFilt;
                f.repeatN++;
                const r2 = await db.collection("items").deleteMany(f);

                //if was unfinished chain, remove
                const chainFilter = { _id: ObjectID(item.userid) }
                const chainPushOperation = {
                    $pull: {
                        unfinishedChains: { rootId: ObjectID(item.repeatRootId), }
                    }
                }
                const chainres = await db.collection("users").updateOne(chainFilter, chainPushOperation);

                return "";
            } else if (item.repeats === false && fullBody.repeats === true) {
                return "extendChain";
            }
        }

        if (updateField === "repeatInfo") {
            console.log("UNIMPLEMENTED")
            return "";
        }

        console.log(__line, "UNKNOWN Update field: ", updateField)
        return "";

    }
    updateItemUnfinishedv2 = async function (req, res, next) {
        //In this version, trying to specify how each field's update should function and handle them individually
        const updateFields = [];
        for (const key in req.body) {
            if (!(["_id", "repeatUpdateType"].includes(key))) {
                if (key === "repeatInfo")
                    updateFields.push(key)
                else
                    updateFields.unshift(key)
            }
        }

        console.log(__line, "updating document(s) with body", req.body)
        const item = await db.collection("items").findOne({ _id: ObjectID(req.body._id), userid: ObjectID(req.uid) });
        console.log(__line, item)

        const postactions = [];
        for (let uf of updateFields) {
            const uifres = await updateItemField(uf, req.body, item)
            if (uifres !== "")
                postactions.push(uifres);
        }

    }
    updateItemOld = async function (req, res, next) {
        if (req.body.repeatUpdateType === "future") {
            console.log(__line, "updating many documents with body", req.body)
            const item = await db.collection("items").findOne({ _id: ObjectID(req.body._id), userid: ObjectID(req.uid) });
            console.log(__line, item)
            //If future chain exists, save that item as the endpoint condition, and then delete the chain
            const chainFilter = {
                _id: ObjectID(item.userid)
            }
            const chainPushOperation = {
                $pull: {
                    unfinishedChains: {
                        rootId: ObjectID(item.repeatRootId),
                    }
                }
            }
            const chainres = await db.collection("users").findOneAndUpdate(chainFilter, chainPushOperation);
            console.log(__line, chainres)
            let oldLastItem = undefined;
            if (chainres.value === null) {
                console.log(__line, "Couldn't find relevant user??")
                res.status(200).json({ success: false });
                return;
            }
            if (chainres.value !== null) {
                const thischain = chainres.value.unfinishedChains.find(i => i.rootId === item.repeatRootId)
                if (thischain !== undefined)
                    oldLastItem = thischain.lastCreatedItem;
            }

            //update the root repeat to stop now at this item
            console.log(__line, item.repeatRootId)
            const oldRoot = await db.collection("items").findOne({ _id: ObjectID(item.repeatRootId) });
            console.log(__line, oldRoot)
            if (oldRoot.repeatInfo.end.endMode === "endon") {
                const origRootUpdateFilt = {
                    _id: ObjectID(item.repeatRootId)
                }
                const origRootUpdateOp = {
                    $set: {
                        "repeatInfo.end.endon": new Date((new Date(item.dueDate)).getTime() - 1)
                    }
                }
                const rr = await db.collection("items").updateOne(origRootUpdateFilt, origRootUpdateOp);
                console.log(__line, rr)
            } else if (oldRoot.repeatInfo.end.endMode === "endafterx" || oldRoot.repeatInfo.end.endMode === "never") {
                const origRootUpdateFilt = {
                    _id: ObjectID(item.repeatRootId)
                }
                const origRootUpdateOp = {
                    $set: {
                        "repeatInfo.end.endafterx": item.repeatN - 1,
                        "repeatInfo.end.endMode": "endafterx"
                    }
                }
                const rr = await db.collection("items").updateOne(origRootUpdateFilt, origRootUpdateOp);
                console.log(__line, rr)
            } else {
                console.log("Unknown endmode", oldRoot.repeatInfo.end.endMode)
            }

            //Run update on the current item, then get next item and iterate
            const firstFilt = {
                userid: ObjectID(req.uid),
                _id: ObjectID(req.body._id)
            }
            const firstOp = {
                $set: {
                    ...req.body,
                    repeatN: 1,
                    repeatRootId: ObjectID(req.body._id)
                }
            }
            const firstConfig = {
                returnOriginal: false
            }
            delete firstOp.$set._id;
            delete firstOp.$set.repeatUpdateType;
            delete firstOp.$set.userid;
            convertTimesToDates(firstOp.$set);

            if (oldRoot.repeatInfo.end.endMode === "endafterx" && item.repeatInfo.end.endMode === "endafterx") {
                if (firstOp.$set.repeatInfo === undefined) firstOp.$set.repeatInfo = {};
                if (firstOp.$set.repeatInfo.end === undefined) firstOp.$set.repeatInfo.end = {};
                firstOp.$set.repeatInfo.end.endafterx = oldRoot.repeatInfo.end.endafterx - item.repeatN + 1;
            }

            console.log(__line, firstFilt, firstOp.$set.repeatInfo.end)
            const newRoot = await db.collection("items").findOneAndUpdate(firstFilt, firstOp, firstConfig)
            console.log(__line, newRoot, newRoot.value.repeatInfo.end)

            const updateFields = ["repeatRootId", "repeatN", "dueDate", "displayDate"];
            for (const key in req.body) {
                if (!(["_id", "repeatUpdateType"].includes(key))) {
                    updateFields.push(key)
                }
            }

            let nextItem = newRoot.value;
            let oldn = item.repeatN + 1;
            let chainIsComplete = false;
            let lastCreatedItem = newRoot.value;
            while (true) {
                nextItem = nextItemInRepeatChain(nextItem);

                if (nextItem.repeatInfo.end.endMode === "endon" && nextItem.dueDate.getTime() > nextItem.repeatInfo.end.endon.getTime()) {
                    console.log(__line)
                    chainIsComplete = true;
                    break;
                }

                if (nextItem.repeatInfo.end.endMode === "endafterx" && nextItem.repeatN > nextItem.repeatInfo.end.endafterx) {
                    console.log(__line)
                    chainIsComplete = true;
                    break;
                }

                if (nextItem.repeatN > REPEAT_ADD_BATCH_SIZE) {
                    console.log(__line)
                    break;
                }

                if (oldLastItem !== undefined && oldn > oldLastItem.repeatN) {
                    console.log(__line)
                    break;
                }

                const updateOps = {};
                updateFields.forEach(k => {
                    updateOps[k] = nextItem[k]
                })
                const nextItemFilt = {
                    userid: ObjectID(req.uid),
                    repeatN: oldn,
                    repeatRootId: ObjectID(item.repeatRootId),
                    $or: [{
                        overrideRepeat: {
                            $exists: false
                        }
                    }, {
                        overrideRepeat: true
                    }]
                }
                const nextItemOp = {
                    $set: {
                        ...updateOps,
                    }
                }
                const nextItemConfig = {
                    returnNewDocument: true
                }
                console.log(__line, nextItemFilt, nextItemOp)

                const rfu = await db.collection("items").findOneAndUpdate(nextItemFilt, nextItemOp, nextItemConfig);
                console.log(__line, rfu)

                oldn++;
            }

            if (!chainIsComplete) {
                const chainFilter = {
                    _id: ObjectId(item.userid)
                }
                const chainPushOperation = {
                    $push: {
                        unfinishedChains: {
                            rootId: ObjectID(item._id),
                            lastCreatedItem
                        }
                    }
                }
                const ruo = await db.collection("users").updateOne(chainFilter, chainPushOperation);
                console.log(__line, ruo)
            }

            res.status(200).json({ success: true });
            return;

        }

        const updateFilter = {
            _id: ObjectID(req.body._id),
            userid: ObjectID(req.uid)
        }
        const updateOperation = {
            $set: {
                ...req.body
            }
        }

        delete updateOperation.$set._id;
        delete updateOperation.$set.repeatUpdateType;
        delete updateOperation.$set.userid;
        if (updateOperation.$set.repeatRootId !== undefined) updateOperation.$set.repeatRootId = ObjectID(updateOperation.$set.repeatRootId)
        convertTimesToDates(updateOperation.$set);
        if (req.body.repeatUpdateType === "single") {
            updateOperation.$set.overrideRepeat = true;
        }
        console.log(__line, "Updating with updateOperation:", updateOperation)

        await db.collection("items").updateOne(updateFilter, updateOperation)
        // console.log(result)
        res.status(200).json({ success: true });
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
        updateItem,
        pushOrderToServer,
        deleteItemFromServer,
        getStreakInfo,
        getTest,
        getDaysInfo
    };

}
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
    recursiveFillRepeatingItem = function (item, allitems) {
        // console.log(__line)
        if (item.repeatRootId === undefined || "" + item.repeatRootId === "" + item._id) {
            // console.log(__line, item)
            return item;
        }
        const parent = recursiveFillRepeatingItem(allitems.find(i => "" + i._id === "" + item.repeatRootId), allitems)
        const res = {
            ...parent,
            ...item
        }
        // console.log(__line, res)
        return res;
    }
    constructRepeatedItems = async function (items) {
        const allitems = clone(items);
        let i = 0;
        while (true) {
            const rootIds = new Set();
            allitems.forEach(i => {
                if (i.repeatRootId !== undefined && !allitems.some(ai => "" + ai._id === "" + i.repeatRootId))
                    rootIds.add(ObjectID(i.repeatRootId));
            })
            if (rootIds.size === 0) {
                // console.log(__line, items)
                break;
            }

            const filt = {
                _id: {
                    $in: [...rootIds]
                }
            }
            // console.log(__line, i, [...rootIds].map(v => "" + v))
            const cursor = await db.collection("items").find(filt)
            const results = await cursor.toArray();
            // console.log(__line, results)
            allitems.push(...results);

            // console.log(__line, i, allitems.map(v => "" + v._id))

            i++;
            if (i > 100) {
                console.log(__line, "asdfsadfsadf")
                return;
            }
        }

        _.range(0, items.length).forEach(i => {
            // console.log(__line, i, items[i])
            items[i] = recursiveFillRepeatingItem(items[i], allitems)
        })
        // items.forEach(console.log)
        // console.log(__line, items)
    }
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
        console.log(__line, detail.$or[1].displayDate.$lte)
        const cursor = await db.collection("items").find(detail).sort({ dueDate: 1 })
        const results = await cursor.toArray();
        // console.log(__line, results);
        await constructRepeatedItems(results);
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
        await constructRepeatedItems(results);
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
        await constructRepeatedItems(results);
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
                repeatN: 0
            }
        }
        await db.collection("items").updateOne(rootUpdateFilter, rootUpdateOperation);

        const allUploadItems = [];

        let newItem = clone(item);
        delete newItem._id;
        newItem.repeatRootId = rootid;
        newItem.repeatN = 0;
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
    getRepeatDates = function (firstDueDate, repeatInfo, n) {
        console.log(__line, repeatInfo, n);
        const ret = {
            dueDate: null,
            displayDate: null
        }

        if (repeatInfo.repeatMode === "everyx") {
            ret.dueDate = date_util.offsetByUnits(firstDueDate, repeatInfo.everyx.frequency * n, repeatInfo.everyx.unit);
        } else if (repeatInfo.repeatMode === "reponxweekday") {
            ret.dueDate = new Date(firstDueDate)
            ret.dueDate.setMonth(ret.dueDate.getMonth() + n);
            const m = ret.dueDate.getMonth();
            const d = date_util.getWeekdayNumber(repeatInfo.xweekday.weekday);
            ret.dueDate.setDay(d)
            if (m !== ret.dueDate.getMonth()) {
                ret.dueDate.setDate(ret.dueDate.getDate() + 7);
            }
            //should now be on first specified weekday of the month after item
            if (repeatInfo.xweekday.x === "2nd")
                ret.dueDate.setDate(ret.dueDate.getDate() + 7);
            else if (repeatInfo.xweekday.x === "3rd")
                ret.dueDate.setDate(ret.dueDate.getDate() + 14);
            else if (repeatInfo.xweekday.x === "4th")
                ret.dueDate.setDate(ret.dueDate.getDate() + 21);
            else if (repeatInfo.xweekday.x === "last") {
                while (ret.dueDate.getMonth() === m)
                    ret.dueDate.setDate(ret.dueDate.getDate() + 7);
                ret.dueDate.setDate(ret.dueDate.getDate() - 7);
            }
        }

        //now set displayDate
        ret.displayDate = getDisplayDate(repeatInfo, ret.dueDate);

        return ret;
    }
    extendChain = async function (reprootId, n) {
        //first get the item with _id === id
        const filt = {
            _id: ObjectID(reprootId)
        }
        const reproot = await db.collection("reproots").findOne(filt)
        console.log(__line, reprootId, reproot)
        const repeatInfo = reproot.repeatInfo;
        const firstDueDate = reproot.firstDueDate;

        //Use repeatN+1 from that item as a starting point, generate future items and add them all. Then update chain if unfinished
        let nextN = n;
        let i = 0;
        let chainFinished = false;
        const allItems = [];
        while (i < REPEAT_ADD_BATCH_SIZE) {
            const newDates = getRepeatDates(firstDueDate, repeatInfo, nextN)
            const nextDueDate = newDates.dueDate;
            const nextDisplayDate = newDates.displayDate;

            if (repeatInfo.end.endMode === "endon" && nextDueDate.getTime() > (new Date(repeatInfo.end.endon)).getTime()) {
                chainFinished = true;
                break;
            }

            const newItem = {
                isDone: false,
                repeatN: nextN,
                dueDate: nextDueDate,
                displayDate: nextDisplayDate,
                userid: ObjectID(item.userid),
                reprootId: ObjectID(reprootId)
            }
            allItems.push(newItem)

            nextN++;
            i++;

            if (repeatInfo.end.endMode === "endafterx" && nextN >= repeatInfo.end.endafterx) {
                chainFinished = true;
                break;
            }
        }

        const inres = await db.collection("items").insertMany(allItems);
        console.log(__line, inres)

        const finishedOp = {
            $set: {
                chainFinished,
                lastN: allItems[allItems.length - 1].repeatN
            }
        }
        const upres = await db.collection("reproots").updateOne(filt, finishedOp)

        return inres.insertedIds;
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
        delete entryVar.repeatInfo;

        if (!req.body.repeats) {
            const result = await db.collection("items").insertOne(entryVar);
            console.log(__line, result.insertedId);
            const retid = result.insertedId || "tmpval";

            res.status(200).json({ id: retid, singleId: true });
            return;
        }

        entryVar.repeatInfo = req.body.repeatInfo;
        entryVar.firstDueDate = new Date(req.body.dueDate);
        delete entryVar.isDone;
        delete entryVar.dueDate;
        delete entryVar.displayDate;

        const reprootRes = await db.collection("reproots").insertOne(entryVar);
        console.log(__line, reprootRes);
        const reprootId = reprootRes.insertedId;

        //adding a new repeating item
        const insertedIds = await extendChain(reprootId, 0);
        res.status(200).json({ ids: insertedIds, singleId: false });
    }
    getDisplayDate = function (repeatInfo, dueDate) {
        if (repeatInfo.show.showMode === "xunits")
            return date_util.offsetByUnits(dueDate, -1 * repeatInfo.show.xunits.x, repeatInfo.show.xunits.unit)

        const ret = new Date(dueDate);
        ret.setDay(date_util.getWeekdayNumber(repeatInfo.show.weekday));
        if (ret.getTime() > dueDate.getTime())
            ret.setDate(ret.getDate() - 7);

        return ret;
    }
    splitRepeatChain = async function (reprootId, n) {
        if (n === 0)
            return;

        const reproot = await db.collection("reproots").findOne({ _id: ObjectID(reprootId) });
        // const firstItem = await db.collection("items").findOne({ reprootId: ObjectID(reprootId), repeatN: n });
        const newrr = {
            parent: ObjectID(repeatRootId),
            firstDueDate: getRepeatDates(reproot.firstDueDate, reproot.repeatInfo, n).dueDate,
            repeatInfo: reproot.repeatInfo,
            repeatNOffset: n + (reproot.repeatNOffset || 0),
        }
        const inres = await db.collection("reproots").insertOne(newrr);
        const newReprootId = inres.insertedId;

        const upfilt = {
            reprootId: ObjectID(reprootId),
            repeatN: {
                $gte: n
            }
        }
        const upop = {
            $set: {
                reprootId: ObjectID(newReprootId)
            },
            $inc: {
                repeatN: -n
            }
        }

        const repupfilt = {
            parent: ObjectID(reprootId),
            _id: {
                $not: ObjectID(newReprootId)
            }
        }
        const repupop = {
            $set: {
                parent: ObjectID(newReprootId)
            }
        }

        const upres = await Promise.all([
            db.collection("items").updateMany(upfilt, upop),
            db.collection("reproots").updateOne(repupfilt, repupop)
        ])
        console.log(__line, upres)

        return newReprootId;
    }
    applyUpdateToReproot = async function (reproot, updateBody) {

    }
    recalculateRepeatingDates = async function (reproot) {

    }
    updateItem = async function (req, res, next) {
        console.log(__line, req.body);

        const runSimpleSingleUpdate = async function () {
            console.log(__line, req.params, req.uid)
            const singleFilt = {
                _id: ObjectID(req.params.id),
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
            delete entryVar.$set.repeatInfo;

            convertTimesToDates(entryVar.$set);

            const rssupres = await db.collection("items").updateOne(singleFilt, entryVar);
            console.log(__line, rssupres)
        }

        if (req.body.updateType === "itemOrder") {
            console.log(__line, "unimplemented");
            status(200).json({ success: false })
            return;
        }

        if (["isDone", "snooze", "overrideOverdue"].includes(req.body.updateType)) {
            await runSimpleSingleUpdate();
            res.status(200).json({ success: true });
            return;
        }

        const itemarr = [];
        itemarr.push(await db.collection("items").findOne({ _id: ObjectID(req.params.id), userid: ObjectID(req.uid) }));
        await constructRepeatedItems(itemarr)
        const item = itemarr[0];

        console.log(__line, item)
        if (!item.repeats && req.body.repeats !== true) {
            await runSimpleSingleUpdate();
            res.status(200).json({ success: true });
            return;
        }

        const updateRootToEndHere = async function (repeatInfo) {
            const rootfilt = {
                _id: ObjectID(item.reprootId),
                userid: ObjectID(req.uid),
            }

            const newRepeatInfo = clone(repeatInfo);
            if (repeatInfo.end.endMode === "endnever") {
                newRepeatInfo.end.endMode = "endon";
            }

            if (newRepeatInfo.end.endMode === "endafterx") {
                newRepeatInfo.end.endafterx = item.repeatN + 1;
            } else if (newRepeatInfo.end.endMode === "endon") {
                newRepeatInfo.end.endon = item.dueDate;
            }
            const rootUpdateOp = {
                $set: {
                    repeatInfo: newRepeatInfo
                }
            }
            convertTimesToDates(rootUpdateOp.$set)

            const rootres = await db.collection("reproots").updateOne(rootfilt, rootUpdateOp);
            console.log(__line, rootres)
        }


        if (item.repeats && req.body.repeats === false) {
            //cancelling repeat
            const reproot = await db.collection("reproots").findOne({ _id: ObjectID(item.reprootId) });
            if (item.repeatN !== 0 || (reproot.parent !== null && reproot.parent !== undefined)) {
                //cancelling from partway down the chain. Update root to end here
                await updateRootToEndHere(reproot.repeatInfo);

                //now pass through rest of update, but take out things that are taken care of by the root update
                delete req.body.repeatInfo;
                delete req.body.repeats;
            } else {
                //Starting at the beginning, need to convert repeating item into a true single item
                //update item based on reproot
                const upop = {
                    $set: {
                        ...reproot,
                        dueDate: new Date(reproot.firstDueDate),
                        displayDate: new Date(),
                        isDone: item.isDone,
                    }
                }
                delete upop.$set._id;
                delete upop.$set.parent;
                delete upop.$set.repeatInfo;
                delete upop.$set.firstDueDate;
                convertTimesToDates(upop.$set)
                await db.collection("items").updateOne({ _id: ObjectID(item._id) }, upop);

                //delete reproot
                await db.collection("reproots").deleteOne({ _id: ObjectID(reproot._id) });

                delete req.body.repeatInfo;
                delete req.body.repeats;
            }

            await runSimpleSingleUpdate();

            //now delete all future items
            const delfilt = {
                reprootId: ObjectID(item.reprootId),
                userid: ObjectID(req.uid),
                repeatN: {
                    $gt: item.repeatN
                }
            }
            const delres = await db.collection("items").deleteMany(delfilt)
            console.log(__line, delres)

            let child = await db.collection("reproots").findOne({ parentId: ObjectID(item.reprootId) });
            if (child !== null)
                deleteReproot(child._id, req.uid)

            //also check unfinished chains
            const finishedFilt = { _id: ObjectID(item.reprootId) };
            const finishedOp = {
                $set: {
                    chainFinished: true,
                    lastN: item.repeatN
                }
            }
            const upres = await db.collection("reproots").updateOne(finishedFilt, finishedOp)
            console.log(__line, upres)

            res.status(200).json({ success: true });
            return;
        }

        if (req.body.repeats === true && !item.repeats) {
            await runSimpleSingleUpdate();

            //create a new reproot
            const newReproot = clone(item);
            delete newReproot.isDone;
            delete newReproot.dueDate;
            delete newReproot.displayDate;
            delete newReproot._id;
            newReproot.repeatInfo = req.body.repeatInfo;
            newReproot.firstDueDate = item.dueDate;
            const reprootRes = await db.collection("reproots").insertOne(newReproot)
            const reprootId = reprootRes.insertedId;
            console.log(__line, reprootId)

            //delete a bunch of fields in the single entry and have it point to new reproot
            const upop = {
                $set: {
                    repeatN: 0,
                    reprootId,
                },
                $unset: {
                    text: "",
                    dueDateMode: "",
                    createdDate: "",
                    repeats: "",
                }
            }

            const upres = await db.collection("items").updateOne({ _id: ObjectID(item._id) }, upop)
            console.log(__line, upres)

            //extend chain to generate more items
            extendChain(reprootId, 1);

            res.status(200).json({ success: true });
            return;
        }

        //ok item was and is repeating. 
        if (req.body.repeatUpdateType === "single") {
            if (req.body.repeatInfo !== undefined) {
                const singleFilt = {
                    _id: ObjectID(req.params.id),
                    userid: ObjectID(req.uid)
                }
                const dd = new Date(req.body.dueDate || item.dueDate)
                const entryVar = {
                    $set: {
                        displayDate: getDisplayDate(req.body.repeatInfo, dd)
                    }
                }

                const upres = await db.collection("items").updateOne(singleFilt, entryVar);
                console.log(__line, upres)
            }

            await runSimpleSingleUpdate();
            res.status(200).json({ success: true });
            return;
        }

        //If you've made it this far, batman, you know the update applies to all future items, and it was and is still a repeating item
        let newReproot = item.reprootId;
        if (item.repeatN !== 0)
            newReproot = splitRepeatChain(item.reprootId, item.repeatN)

        applyUpdateToReproot(newReproot, req.body);
        recalculateRepeatingDates(newReproot);





        let rootid = req.params.id;
        if (item.repeatN !== 0) {
            await updateRootToEndHere();
            rootid = item.repeatRootId;
        }

        //check if chain was unfinished, if so get last item's repeatN
        const userFilter = { _id: ObjectID(item.userid) }
        const user = await db.collection("users").findOne(userFilter);
        const thisChain = user.unfinishedChains.find(c => c.rootId === rootid);
        let ufcLastItemN;
        if (thisChain !== undefined) ufcLastItemN = thisChain.lastCreatedItem.repeatN;

        //now loop through items starting with this one, update each
        let newRepeatInfo = item.repeatInfo;
        if (req.body.repeatInfo !== undefined) {
            newRepeatInfo = req.body.repeatInfo;
        }
        let firstDueDate = item.dueDate;
        if (req.body.dueDate !== undefined) {
            firstDueDate = req.body.dueDate;
        }

        allUpdatePromises = []
        let newN = 0;
        let oldN = item.repeatN;
        let chainFinished = false;
        while (true) {
            //update
            const updateFilt = {
                userid: ObjectID(req.uid),
                repeatRootId: ObjectID(rootid),
                repeatN: oldN,
            }

            const newDates = getRepeatDates(firstDueDate, newRepeatInfo, newN)
            const newDueDate = newDates.dueDate;
            const newDisplayDate = newDates.displayDate;

            if (newRepeatInfo.end.endMode === "endon" && newDueDate.getTime() > newRepeatInfo.end.endon.getTime()) {
                chainFinished = true;
                break;
            }


            const updateOp = {
                $set: {
                    ...req.body,
                    dueDate: newDueDate,
                    displayDate: newDisplayDate,
                    repeatN: newN
                }
            }
            delete updateOp.$set._id;
            delete updateOp.$set.repeatUpdateType;
            delete updateOp.$set.userid;
            delete updateOp.$set.updateType;
            convertTimesToDates(updateOp.$set);

            allUpdatePromises.push(db.collection("items").updateOne(updateFilt, updateOp));

            if (newRepeatInfo.end.endMode === "endafterx" && newN >= newRepeatInfo.end.endafterx) {
                chainFinished = true;
                break;
            }

            if (oldN === ufcLastItemN)
                break;

            newN++;
            oldN++;
        }

        if (ufcLastItemN !== undefined) {
            //update last item in chain
            //(can add this to promise array)
            if (chainFinished) {
                //pull
                const chainFilter = { _id: ObjectID(item.userid) }
                const chainPullOperation = {
                    $pull: {
                        unfinishedChains: { rootId: ObjectID(item.repeatRootId), }
                    }
                }
                allUpdatePromises.push(db.collection("users").updateOne(chainFilter, chainPullOperation));
            } else {
                //update
                const chainFilter = {
                    _id: ObjectID(item.userid),
                    "unfinishedChains.rootId": ObjectID(item.repeatRootId)
                }
                const lastCreatedItemResult = await allUpdatePromises[allUpdatePromises.length - 1];
                console.log(__line, lastCreatedItemResult)
                console.log(__line, "TODO")

                const lastCreatedItem = undefined;
                convertTimesToDates(lastCreatedItem);
                const chainUpdateOp = {
                    $set: {
                        "unfinishedChains.$.rootId": ObjectID(item._id),
                        "unfinishedChains.$.lastCreatedItem": lastCreatedItem
                    }
                }
                console.log(__line, "TODO")
                allUpdatePromises.push(db.collection("users").updateOne(chainFilter, chainUpdateOp))
            }
        } else if (!chainFinished) {
            //push new chain
            const chainFilter = { _id: ObjectID(item.userid) }
            const lastCreatedItemResult = await allUpdatePromises[allUpdatePromises.length - 1];
            console.log(__line, lastCreatedItemResult)
            console.log(__line, "TODO")
            const lastCreatedItem = undefined;
            convertTimesToDates(lastCreatedItem);
            const chainPushOperation = {
                $push: {
                    unfinishedChains: {
                        rootId: ObjectID(item._id),
                        lastCreatedItem
                    }
                }
            }
            allUpdatePromises.push(db.collection("users").updateOne(chainFilter, chainPushOperation));
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
                    repeatN: 0,
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
                    _id: ObjectID(item.userid)
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
            _id: ObjectID(req.body._id),
        }
        const updateOperation = {
            $set: {
                displayOrder: req.body.displayOrder
            }
        }

        const orderres = await db.collection("items").updateOne(updateFilter, updateOperation);
        // console.log(__line, orderres)

        res.status(200).json({ success: true });
    }
    deleteReproot = async function (reprootId, userid) {
        const detail = {
            userid: ObjectID(userid),
            reprootId: ObjectID(reprootId),
        }
        const result = await db.collection("items").deleteMany(detail);
        console.log(__line, result)

        child = await db.collection("reproots").findOne({ parentId: ObjectID(reprootId) });
        if (child !== null)
            deleteReproot(child._id, userid)

    }
    updateReprootEnd = async function (reprootId, n) {
        const rootfilt = { _id: ObjectID(reprootId) }
        const reproot = await db.collection("reproots").findOne(rootfilt);
        console.log(__line, reproot)

        let updateOp = {};
        if (reproot.repeatInfo.end.endMode === "endafterx") {
            updateOp = {
                $set: {
                    "repeatInfo.end.endafterx": n
                }
            }
        } else if (reproot.repeatInfo.end.endMode === "endon") {
            const newEndDate = getRepeatDates(reproot.firstDueDate, reproot.repeatInfo, n - 1).dueDate
            updateOp = {
                $set: {
                    "repeatInfo.end.endon": newEndDate
                }
            }
        } else if (reproot.repeatInfo.end.endMode === "endnever") {
            updateOp = {
                $set: {
                    "repeatInfo.end.endMode": "endafterx",
                    "repeatInfo.end.endafterx": n
                }
            }
        } else {
            console.log(__line, "unknown end mode!")
        }
        const upres = await db.collection("reproots").updateOne(rootfilt, updateOp)
        console.log(__line, upres);
    }
    deleteItemFromServer = async function (req, res, next) {
        if (req.query.repeatUpdateType === "future") {
            const filt = {
                _id: ObjectID(req.params.id),
                userid: ObjectID(req.uid)
            }
            const item = await db.collection("items").findOne(filt)
            if (item.repeatN === 0) {
                deleteReproot(item.reprootId, req.uid);
                res.status(200).json({ success: true })
                return;
            }

            const detail = {
                userid: ObjectID(req.uid),
                reprootId: ObjectID(item.reprootId),
                repeatN: { $gte: item.repeatN }
            }
            const result = await db.collection("items").deleteMany(detail);
            console.log(__line, result)

            updateReprootEnd(item.reprootId, item.repeatN)

            let child = await db.collection("reproots").findOne({ parentId: ObjectID(item.reprootId) });
            if (child !== null)
                deleteReproot(child._id, req.uid)

            res.status(200).json({ success: true })
            return;
        }

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
        // console.log(__line, overdueCount);
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
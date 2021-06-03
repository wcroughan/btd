const _ = require('underscore');
const bson = require('bson')

module.exports = {

    getUniqueItemId(items) {
        if (items.length === 0) return 0;
        const ids = items.map(v => v.id);
        return _.range(0, items.length + 1).find(v => !ids.some(i => i === v));
    },
    async getHash(str) {
        const sdat = new TextEncoder().encode(str);
        const hs = await crypto.subtle.digest("SHA-256", sdat);
        // console.log(hs)
        return bson.Binary(hs)
    },
    convertTimesToDates(item) {
        if (item.displayDate !== undefined) item.displayDate = new Date(item.displayDate)
        if (item.dueDate !== undefined) item.dueDate = new Date(item.dueDate)
        if (item.createdDate !== undefined) item.createdDate = new Date(item.createdDate)
        if (item.doneDate !== undefined) item.doneDate = new Date(item.doneDate)
        if (item.snoozedOnDate !== undefined) item.snoozedOnDate = new Date(item.snoozedOnDate)
    },
    convertDatesToTimes(item) {
        if (item.displayDate !== undefined) item.displayDate = item.displayDate.getTime();
        if (item.dueDate !== undefined) item.dueDate = item.dueDate.getTime();
        if (item.createdDate !== undefined) item.createdDate = item.createdDate.getTime();
        if (item.doneDate !== undefined) item.doneDate = item.doneDate.getTime();
        if (item.snoozedOnDate !== undefined) item.snoozedOnDate = item.snoozedOnDate.getTime();
    }

}
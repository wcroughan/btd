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
}
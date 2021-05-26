const _ = require('underscore');

module.exports = {

    getUniqueItemId(items) {
        if (items.length === 0) return 0;
        const ids = items.map(v => v.id);
        return _.range(0, items.length + 1).find(v => !ids.some(i => i === v));
    }
}
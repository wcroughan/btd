const axios = require('axios');
const api_root = "/api/v1/";
const date_util = require('./date_util');


module.exports = {
    getListsForDate(date, callback) {
        const req = api_root + "/list/" + date_util.apiDateStr(date);
        // console.log(req);
        axios.get(req).then((res) => {
            callback(res);
        });
    },
    pushListToServer(list) {
        const req = api_root + "/list/" + list.id;
        // console.log(req);
        axios.put(req, list);
    }
}
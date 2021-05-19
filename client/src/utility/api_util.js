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
    },
    getDefaultList(id, callback) {
        const req = api_root + "/list/default/" + id;
        axios.get(req).then((res) => {
            callback(res);
        });
    },
    deleteListFromServer(id) {
        const req = api_root + "/list/" + id;
        axios.delete(req);
    },
    siblingListId(id, moveAmt) {
        const type = id.split("_")[0];
        const jump = (type === "week") ? 7 : 1;
        const cd = date_util.getDateFromIdStr(id.split("_")[1]);
        const retDate = new Date(cd);
        retDate.setDate(retDate.getDate() + moveAmt * jump);
        console.log(id, moveAmt, retDate);
        return type + "_" + date_util.apiDateStr(retDate);
    },
    addItemToList(item, id) {
        const req = api_root + "/list/append_item/" + id;
        console.log("frontend sending:", req, item);
        axios.put(req, item);
    }
}
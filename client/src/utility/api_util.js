const axios = require('axios');
const api_root = "/api/v1/";
const date_util = require('./date_util');
const bson = require('bson')


module.exports = {
    getListsForDate(auth_token, date, callback) {
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "/list/" + date_util.apiDateStr(date) + `?${params}`;
        // console.log(req);
        axios.get(req).then((res) => {
            callback(res);
        });
    },
    pushListToServer(auth_token, list) {
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "/list/" + list.id + `?${params}`;
        // console.log(req);
        axios.put(req, list);
    },
    getDefaultList(auth_token, id, callback) {
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "/list/default/" + id + `?${params}`;
        axios.get(req).then((res) => {
            callback(res);
        });
    },
    deleteListFromServer(auth_token, id) {
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "/list/" + id + `?${params}`;
        axios.delete(req);
    },
    siblingListId(id, moveAmt) {
        const type = id.split("_")[0];
        const jump = (type === "week") ? 7 : 1;
        const cd = date_util.getDateFromIdStr(id.split("_")[1]);
        const retDate = new Date(cd);
        retDate.setDate(retDate.getDate() + moveAmt * jump);
        // console.log(id, moveAmt, retDate);
        return type + "_" + date_util.apiDateStr(retDate);
    },
    addItemToList(auth_token, item, id) {
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "/list/append_item/" + id + `?${params}`;
        // console.log("frontend sending:", req, item);
        axios.put(req, item);
    },
    createAccount(email, hpw, callback) {
        const reqParamObj = { email, hpw };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "/createUser" + `?${params}`;
        axios.get(req).then(callback);
    },
    login(email, hpw, callback) {
        const reqParamObj = { email, hpw };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "/login" + `?${params}`;
        axios.get(req).then(callback);
    },
    async getHash(str) {
        const sdat = new TextEncoder().encode(str);
        const hs = await crypto.subtle.digest("SHA-256", sdat);
        // console.log(hs)
        return bson.Binary(hs)
    }
}
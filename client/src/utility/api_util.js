const axios = require('axios');
const api_root = "/api/v1/";
const date_util = require('./date_util');
// const bson = require('bson')


module.exports = {
    getListsForDate(auth_token, date, callback) {
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "list/" + date_util.apiDateStr(date) + `?${params}`;
        // console.log(req);
        axios.get(req).then((res) => {
            callback(res);
        });
    },
    pushListToServer(auth_token, list) {
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "list/" + list.id + `?${params}`;
        // console.log(req);
        axios.put(req, list);
    },
    getDefaultList(auth_token, id, callback) {
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "list/default/" + id + `?${params}`;
        axios.get(req).then((res) => {
            callback(res);
        });
    },
    deleteListFromServer(auth_token, id) {
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "list/" + id + `?${params}`;
        axios.delete(req);
    },
    siblingListId(id, moveAmt) {
        // console.log(id, moveAmt)
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
        const req = api_root + "list/append_item/" + id + `?${params}`;
        // console.log("frontend sending:", req, item);
        axios.put(req, item);
    },
    createAccount(email, hpw, callback) {
        const reqParamObj = { email, hpw };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "createUser" + `?${params}`;
        axios.get(req).then(callback);
    },
    login(email, hpw, callback) {
        const reqParamObj = { email, hpw };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "login" + `?${params}`;
        axios.get(req).then(callback);
    },
    async getHash(str) {
        const sdat = new TextEncoder().encode(str);
        const hs = await crypto.subtle.digest("SHA-256", sdat);
        // console.log(hs)
        return bson.Binary(hs)
        //Above code commented because I need a paid heroku to get https which is the only way crypto subtle will work.
        //And in general sounds like there's more concerns here so in long run would be better just to use an outside library like 0auth

        // return str;
    },
    async checkAuthToken(tkn, callback) {
        const reqParamObj = { tkn };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "checktkn" + `?${params}`;
        if (callback !== undefined) {
            axios.get(req).then(callback);
        }
        else {
            const ret = await axios.get(req);
            return ret;
        }
    },
    async getDaysInfo(auth_token, d1, d2, callback) {
        const reqParamObj = { auth_token, d1: date_util.apiDateStr(d1), d2: date_util.apiDateStr(d2) };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "daysinfo/" + `?${params}`;
        // console.log(req);
        if (callback !== undefined) {
            axios.get(req).then((res) => {
                callback(res);
            });
        } else {
            const ret = await axios.get(req);
            return ret;
        }
    },
    async getStreakLength(auth_token, date, callback) {
        const reqParamObj = { auth_token, date: date_util.apiDateStr(date) };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "streaklength/" + `?${params}`;
        // console.log(req);
        if (callback !== undefined) {
            axios.get(req).then((res) => {
                callback(res);
            });
        } else {
            const ret = await axios.get(req);
            return ret;
        }
    }
}
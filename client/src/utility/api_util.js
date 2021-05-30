const axios = require('axios');
const api_root = "/api/v1/";
const date_util = require('./date_util');
const store = require('../store/index.js')


module.exports = {
    getItems(callback) {
        const auth_token = store.default.getters.token;
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "items" + `?${params}`;
        // console.log(req);
        axios.get(req).then((res) => {
            callback(res);
        });
    },
    getPastItems(callback) {
        const auth_token = store.default.getters.token;
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "pastitems" + `?${params}`;
        // console.log(req);
        axios.get(req).then((res) => {
            callback(res);
        });
    },
    pushItemToServer(item) {
        const auth_token = store.default.getters.token;
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "item/" + item.id + `?${params}`;
        // console.log(req);
        axios.put(req, item);
    },
    deleteItem(id) {
        const auth_token = store.default.getters.token;
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "item/" + id + `?${params}`;
        axios.delete(req);
    },
    getListsForDate(date, callback) {
        const auth_token = store.default.getters.token;
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "list/" + date_util.apiDateStr(date) + `?${params}`;
        // console.log(req);
        axios.get(req).then((res) => {
            callback(res);
        });
    },
    pushListToServer(list) {
        const auth_token = store.default.getters.token;
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "list/" + list.id + `?${params}`;
        // console.log(req);
        axios.put(req, list);
    },
    getDefaultList(id, callback) {
        const auth_token = store.default.getters.token;
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "list/default/" + id + `?${params}`;
        axios.get(req).then((res) => {
            callback(res);
        });
    },
    deleteListFromServer(id) {
        const auth_token = store.default.getters.token;
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
    addItemToList(item, id) {
        const auth_token = store.default.getters.token;
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
    loginRequestToServer(email, hpw, callback) {
        console.log("api util loggin in with ", email, hpw, callback)
        const reqParamObj = { email, hpw };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "login" + `?${params}`;
        console.log("axios sending ", req)
        axios.get(req).then(callback);
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
    async getDaysInfo(d1, d2, callback) {
        const auth_token = store.default.getters.token;
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
    async getStreakLength(date, callback) {
        const auth_token = store.default.getters.token;
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
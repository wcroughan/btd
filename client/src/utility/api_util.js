const axios = require('axios');
const api_root = "/api/v1/";
const date_util = require('./date_util');


module.exports = {
    async getItems(auth_token, callback) {
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "items" + `?${params}`;
        console.log(req);
        if (callback !== undefined) {
            axios.get(req).then((res) => {
                res.data.forEach(v => {
                    if (v.displayDate !== undefined) v.displayDate = new Date(v.displayDate)
                    if (v.dueDate !== undefined) v.dueDate = new Date(v.dueDate)
                })
                callback(res);
            });
        } else {
            const ret = await axios.get(req);
            ret.data.forEach(v => {
                if (v.displayDate !== undefined) v.displayDate = new Date(v.displayDate)
                if (v.dueDate !== undefined) v.dueDate = new Date(v.dueDate)
            })
            return ret;
        }
    },
    getPastItems(auth_token, callback) {
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "pastitems" + `?${params}`;
        // console.log(req);
        axios.get(req).then((res) => {
            callback(res);
        });
    },
    async pushItemToServer(auth_token, item, callback) {
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "item/" + `?${params}`;
        // console.log(req);
        if (callback !== undefined) {
            axios.put(req, item).then(callback);
        } else {
            const ret = await axios.put(req, item);
            return ret;
        }
    },
    deleteItem(auth_token, id) {
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "item/" + id + `?${params}`;
        axios.delete(req);
    },
    createAccount(email, hpw, callback) {
        const reqParamObj = { email, hpw };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "createUser" + `?${params}`;
        axios.get(req).then(callback);
    },
    login(email, hpw, callback) {
        // console.log("api util loggin in with ", email, hpw, callback)
        const reqParamObj = { email, hpw };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "login" + `?${params}`;
        // console.log("axios sending ", req)
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
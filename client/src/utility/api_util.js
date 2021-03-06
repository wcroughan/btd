const axios = require('axios');
const api_root = "/api/v1/";
const date_util = require('./date_util');
const { convertTimesToDates } = require('./misc_util')

module.exports = {
    async getItems(auth_token, callback) {
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "items" + `?${params}`;
        // console.log(req);
        if (callback !== undefined) {
            axios.get(req).then((res) => {
                res.data.forEach(convertTimesToDates)
                callback(res);
            });
        } else {
            const ret = await axios.get(req);
            ret.data.forEach(convertTimesToDates)
            return ret;
        }
    },
    async getPastItems(auth_token, callback) {
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "pastitems" + `?${params}`;
        // console.log(req);
        if (callback !== undefined) {
            axios.get(req).then((res) => {
                res.data.forEach(convertTimesToDates)
                callback(res);
            });
        } else {
            const ret = await axios.get(req);
            ret.data.forEach(convertTimesToDates)
            return ret;
        }
    },
    async getUpcomingItems(auth_token, callback) {
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "upcomingitems" + `?${params}`;
        // console.log(req);
        if (callback !== undefined) {
            axios.get(req).then((res) => {
                res.data.forEach(convertTimesToDates)
                callback(res);
            });
        } else {
            const ret = await axios.get(req);
            ret.data.forEach(convertTimesToDates)
            return ret;
        }
    },
    async pushItemToServer(auth_token, item, callback) {
        console.log("pushing", item)
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
    async pushUpdateToServer(auth_token, update, callback) {
        console.log("updating", update)
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + `item/${update._id}?${params}`;
        console.log(req);
        if (callback !== undefined) {
            axios.put(req, update).then(callback);
        } else {
            const ret = await axios.put(req, update);
            return ret;
        }
    },
    async updateItemOrder(auth_token, item, callback) {
        console.log("pushing order", item)
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "itemorder/" + `?${params}`;
        const body = {
            _id: item._id,
            displayOrder: item.displayOrder
        }
        // console.log(body);
        if (callback !== undefined) {
            axios.put(req, body).then(callback);
        } else {
            const ret = await axios.put(req, body);
            return ret;
        }
    },
    async deleteItem(auth_token, id, callback) {
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "item/" + id + `?${params}`;
        if (callback !== undefined) {
            axios.delete(req).then(callback);
        } else {
            const ret = await axios.delete(req);
            return ret;
        }
    },
    async getStreakInfo(auth_token, id, callback) {
        const reqParamObj = { auth_token };
        const params = new URLSearchParams(reqParamObj);
        const req = api_root + "streak" + `?${params}`;
        if (callback !== undefined) {
            axios.get(req).then(callback);
        } else {
            const ret = await axios.get(req);
            return ret;
        }

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
}
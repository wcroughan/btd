// import axios from "axios";
const axios = require('axios');
const api_root = "/api/v1/";

const api_datestr = function (date) {
    return date.getFullYear() +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        ("0" + date.getDate()).slice(-2)
}

module.exports = {
    getListsForDate(date, callback) {
        const req = api_root + "/list/" + api_datestr(date);
        // console.log(req);
        axios.get(req).then((res) => {
            callback(res);
        });
    }
}